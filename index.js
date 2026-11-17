/**
 * Host half of `dsh-notebooks`.
 *
 * Owns one local directory of Markdown notes and the three things that reach it:
 * the JSON routes the Client half calls (`/notebooks/api/*`), the agent tools
 * (`notebook_save`, `notebook_list`, `notebook_read`), and the prompt line that
 * tells the model those tools exist. Notes are plain `.md` files with a small
 * front-matter header, so the library survives a Harness upgrade, opens in any
 * editor, and can be read outside DSH.
 *
 * @module dsh-notebooks
 */
import { copyFile, mkdir, readdir, readFile, unlink, writeFile } from 'node:fs/promises'
import { readFileSync } from 'node:fs'
import { homedir } from 'node:os'
import { basename, isAbsolute, join, resolve } from 'node:path'

/** Locale-independent identity of the plugin's Client half. */
const NS = 'dsh-notebooks'

/** A note id is a file name stem: fixed shape, so a request cannot escape the directory. */
const NOTE_ID = /^nb-[a-z0-9][a-z0-9-]{4,40}$/

/** Requests are small JSON documents; anything larger is refused before parsing. */
const MAX_BODY_BYTES = 4 * 1024 * 1024

/** Upper bound on one note, matching the editor's own capability. */
const MAX_NOTE_BYTES = 2 * 1024 * 1024

/** Title length accepted from the UI and from tools. */
const MAX_TITLE = 200

/** Where the user's own choice is remembered; the row config stays the fallback. */
const CHOICE_FILE = typeof process.env.DSH_NOTEBOOKS_CHOICE === 'string' && process.env.DSH_NOTEBOOKS_CHOICE !== ''
  ? process.env.DSH_NOTEBOOKS_CHOICE
  : join(homedir(), '.dsh', 'notebooks.json')

/**
 * Read the remembered directory, if the user ever picked one.
 * @returns the absolute path, or undefined when the row config decides.
 */
function readChoice() {
  try {
    const value = JSON.parse(readFileSync(CHOICE_FILE, 'utf8'))
    return value !== null && typeof value === 'object' && typeof value.directory === 'string' && value.directory !== ''
      ? value.directory
      : undefined
  } catch {
    return undefined
  }
}

/** The directory notes live in when the row declares no `directory`. */
function defaultDirectory() {
  return join(homedir(), '.dsh', 'notebooks')
}

/** Today, as the front-matter timestamp both the UI and tools write. */
function now() {
  return new Date().toISOString()
}

/** A fresh, collision-resistant note id: time-ordered and readable in a listing. */
function newId() {
  const time = Date.now().toString(36)
  const salt = Math.random().toString(36).slice(2, 6).padEnd(4, '0')
  return `nb-${time}-${salt}`
}

/** Trim a title to the stored bounds; an empty title becomes "Без названия". */
function normalizeTitle(value) {
  const text = typeof value === 'string' ? value.replace(/\s+/g, ' ').trim() : ''
  return (text === '' ? 'Без названия' : text).slice(0, MAX_TITLE)
}

/**
 * Split one stored note into its header and body.
 *
 * The header is deliberately not a YAML parser: two keys matter to the library
 * (`title` and `updated`), they are written by this plugin, and a malformed
 * header must never lose the body of someone's note.
 *
 * @param raw - the whole file.
 * @returns the parsed header fields and the Markdown body.
 */
function splitNote(raw) {
  if (!raw.startsWith('---\n')) return { meta: {}, body: raw }
  const end = raw.indexOf('\n---\n', 4)
  if (end === -1) return { meta: {}, body: raw }
  const meta = {}
  for (const line of raw.slice(4, end).split('\n')) {
    const at = line.indexOf(':')
    if (at <= 0) continue
    const key = line.slice(0, at).trim()
    let value = line.slice(at + 1).trim()
    if (value.startsWith('"')) {
      try {
        value = JSON.parse(value.endsWith('"') ? value : `${value}"`)
      } catch {
        value = value.replace(/^"|"$/g, '')
      }
    }
    meta[key] = value
  }
  return { meta, body: raw.slice(end + 5).replace(/^\n+/, '') }
}

/**
 * Render one note file.
 * @param meta - header fields already normalized by the caller.
 * @param body - the Markdown body.
 * @returns the file content.
 */
function joinNote(meta, body) {
  const header = [
    '---',
    `title: ${JSON.stringify(meta.title)}`,
    `created: ${meta.created}`,
    `updated: ${meta.updated}`,
  ]
  if (meta.source !== undefined) header.push(`source: ${JSON.stringify(meta.source)}`)
  if (meta.pinned === true || meta.pinned === 'true') header.push('pinned: true')
  header.push('---', '')
  return `${header.join('\n')}${body}`
}

/**
 * A one-paragraph plain-text preview of a note body, for the library cards.
 * Markdown markers are dropped so the card reads like the document's opening.
 * @param body - the Markdown body.
 * @returns at most 220 characters of running text.
 */
function previewOf(body) {
  const text = body
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/^\s*[-*+]\s+/gm, '')
    .replace(/^\s*>\s?/gm, '')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/[*_`]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
  return text.length > 220 ? `${text.slice(0, 220)}…` : text
}

/** The note as the Client half and the tools see it, without its body. */
function summaryOf(id, meta, body, path) {
  const title = typeof meta.title === 'string' && meta.title.trim() !== ''
    ? meta.title
    : firstHeading(body) ?? 'Без названия'
  return {
    id,
    title,
    createdAt: typeof meta.created === 'string' ? meta.created : '',
    updatedAt: typeof meta.updated === 'string' ? meta.updated : (typeof meta.created === 'string' ? meta.created : ''),
    bytes: Buffer.byteLength(body, 'utf8'),
    preview: previewOf(body),
    pinned: meta.pinned === 'true' || meta.pinned === true,
    path,
  }
}

/** The first Markdown heading of a body, used when a note carries no title. */
function firstHeading(body) {
  const match = /^#{1,6}\s+(\S[^\r\n]*)/m.exec(body)
  return match === null ? undefined : match[1].trim()
}

/**
 * One JSON error the routes report; the Client half shows `message` verbatim.
 */
class NotebookError extends Error {
  /**
   * @param code - stable machine code (`invalid`, `not-found`, `io`, `too-large`).
   * @param message - the reader-facing reason.
   * @param status - HTTP status carrying it.
   */
  constructor(code, message, status = 400) {
    super(message)
    this.code = code
    this.status = status
  }
}

/** Write one JSON envelope; every route answers in the same shape. */
function send(res, status, payload) {
  const body = Buffer.from(JSON.stringify(payload), 'utf8')
  res.writeHead(status, {
    'content-type': 'application/json; charset=utf-8',
    'content-length': String(body.length),
    'cache-control': 'no-store',
  })
  res.end(body)
}

/** Read a JSON request body, refusing anything over the documented bound. */
async function readBody(req, limit = MAX_BODY_BYTES) {
  const chunks = []
  let total = 0
  for await (const chunk of req) {
    total += chunk.length
    if (total > limit) throw new NotebookError('too-large', 'the request body is too large', 413)
    chunks.push(chunk)
  }
  if (total === 0) return {}
  try {
    const value = JSON.parse(Buffer.concat(chunks).toString('utf8'))
    return value !== null && typeof value === 'object' && !Array.isArray(value) ? value : {}
  } catch {
    throw new NotebookError('invalid', 'the request body is not valid JSON')
  }
}

/**
 * The notes directory as an object the routes and the tools share.
 *
 * Every write goes through here, so the UI and the agent cannot drift apart in
 * file format or in title handling.
 *
 * @param ctx - the plugin context (used for logging only).
 * @param config - the loader row's config.
 * @returns the store face.
 */
function createStore(ctx, config) {
  const declared = typeof config?.directory === 'string' ? config.directory.trim() : ''
  const configured = declared === ''
    ? defaultDirectory()
    : (isAbsolute(declared) ? declared : resolve(declared))
  let root = readChoice() ?? configured

  /** Create the directory on first use; the plugin mounts before anyone writes. */
  async function ensure() {
    await mkdir(root, { recursive: true })
  }

  /** The absolute path of one note file. */
  function pathOf(id) {
    if (!NOTE_ID.test(id)) throw new NotebookError('invalid', 'that note id is not valid')
    return join(root, `${id}.md`)
  }

  /** Load one note, or report it as missing. */
  async function load(id) {
    const path = pathOf(id)
    let raw
    try {
      raw = await readFile(path, 'utf8')
    } catch (error) {
      if (error?.code === 'ENOENT') throw new NotebookError('not-found', 'that note no longer exists', 404)
      throw new NotebookError('io', `cannot read the note: ${error instanceof Error ? error.message : String(error)}`, 500)
    }
    const { meta, body } = splitNote(raw)
    return { id, meta, body, path }
  }

  /** Read every note in the directory, newest first. */
  async function list() {
    await ensure()
    let names
    try {
      names = await readdir(root)
    } catch (error) {
      throw new NotebookError('io', `cannot read the notes directory: ${error instanceof Error ? error.message : String(error)}`, 500)
    }
    const notes = []
    for (const name of names) {
      if (!name.endsWith('.md')) continue
      const id = basename(name, '.md')
      if (!NOTE_ID.test(id)) continue
      const path = join(root, name)
      let raw
      try {
        raw = await readFile(path, 'utf8')
      } catch {
        continue
      }
      const { meta, body } = splitNote(raw)
      notes.push(summaryOf(id, meta, body, path))
    }
    notes.sort((left, right) => {
      if (left.pinned !== right.pinned) return left.pinned ? -1 : 1
      return (right.updatedAt ?? '').localeCompare(left.updatedAt ?? '')
    })
    return notes
  }

  /** Create one note and return its view. */
  async function create(input) {
    await ensure()
    const body = typeof input?.content === 'string' ? input.content : ''
    if (Buffer.byteLength(body, 'utf8') > MAX_NOTE_BYTES) throw new NotebookError('too-large', 'the note is too large', 413)
    const title = normalizeTitle(input?.title !== undefined && input.title !== '' ? input.title : firstHeading(body))
    const id = newId()
    const stamp = now()
    const meta = {
      title,
      created: stamp,
      updated: stamp,
      ...(typeof input?.source === 'string' && input.source !== '' ? { source: input.source } : {}),
    }
    const path = pathOf(id)
    await writeFile(path, joinNote(meta, body), 'utf8')
    return { ...summaryOf(id, meta, body, path), content: body }
  }

  /** Save new content (and optionally a new title) into an existing note. */
  async function save(id, input) {
    const current = await load(id)
    const body = typeof input?.content === 'string' ? input.content : current.body
    if (Buffer.byteLength(body, 'utf8') > MAX_NOTE_BYTES) throw new NotebookError('too-large', 'the note is too large', 413)
    const meta = {
      ...current.meta,
      title: normalizeTitle(typeof input?.title === 'string' ? input.title : current.meta.title),
      created: typeof current.meta.created === 'string' ? current.meta.created : now(),
      updated: now(),
    }
    await writeFile(current.path, joinNote(meta, body), 'utf8')
    return { ...summaryOf(id, meta, body, current.path), content: body }
  }

  /** Remove one note. */
  async function remove(id) {
    const path = pathOf(id)
    try {
      await unlink(path)
    } catch (error) {
      if (error?.code === 'ENOENT') throw new NotebookError('not-found', 'that note no longer exists', 404)
      throw new NotebookError('io', `cannot delete the note: ${error instanceof Error ? error.message : String(error)}`, 500)
    }
    return { id }
  }

  /** Pin or unpin one note; pinned notes sort first in the library. */
  async function pin(id, pinned) {
    const current = await load(id)
    const meta = {
      ...current.meta,
      title: normalizeTitle(current.meta.title),
      created: typeof current.meta.created === 'string' ? current.meta.created : now(),
      updated: typeof current.meta.updated === 'string' ? current.meta.updated : now(),
      pinned: pinned === true,
    }
    await writeFile(current.path, joinNote(meta, current.body), 'utf8')
    return summaryOf(id, meta, current.body, current.path)
  }

  /** Read one note in full. */
  async function read(id) {
    const note = await load(id)
    return { ...summaryOf(id, note.meta, note.body, note.path), content: note.body }
  }

  /** Resolve a note by id, or by an exact (case-insensitive) title. */
  async function resolveNote(reference) {
    const text = typeof reference === 'string' ? reference.trim() : ''
    if (text === '') throw new NotebookError('invalid', 'a note id or title is required')
    if (NOTE_ID.test(text)) return read(text)
    const notes = await list()
    const hit = notes.find((note) => note.title.toLowerCase() === text.toLowerCase())
      ?? notes.find((note) => note.title.toLowerCase().includes(text.toLowerCase()))
    if (hit === undefined) throw new NotebookError('not-found', `no note matches "${text}"`, 404)
    return read(hit.id)
  }

  /** The directory in force right now. */
  function directory() {
    return root
  }

  /**
   * Move the library to another directory.
   *
   * The choice is remembered outside the loader row, so it survives restarts and
   * upgrades. With `move`, existing notes are copied to the new folder first and
   * only then removed from the old one, so an interrupted move never loses one.
   *
   * @param target - the directory the user picked.
   * @param options - `{ move }`: carry the notes over.
   * @returns the new directory and how many notes moved.
   */
  async function relocate(target, options) {
    const next = resolve(String(target ?? ''))
    if (typeof target !== 'string' || target.trim() === '') throw new NotebookError('invalid', 'a directory is required')
    await mkdir(next, { recursive: true })
    let moved = 0
    if (options?.move === true && next !== root) {
      let names = []
      try {
        names = await readdir(root)
      } catch {
        names = []
      }
      for (const name of names) {
        if (!name.endsWith('.md')) continue
        const id = name.slice(0, -3)
        if (!NOTE_ID.test(id)) continue
        await copyFile(join(root, name), join(next, name))
        await unlink(join(root, name))
        moved += 1
      }
    }
    root = next
    await mkdir(join(homedir(), '.dsh'), { recursive: true })
    await writeFile(CHOICE_FILE, `${JSON.stringify({ directory: next }, null, 2)}\n`, 'utf8')
    return { directory: root, moved }
  }

  /** Forget the user's choice and fall back to the row config / profile folder. */
  async function resetDirectory() {
    root = configured
    try {
      await unlink(CHOICE_FILE)
    } catch {
      // No remembered choice: nothing to clear.
    }
    return { directory: root }
  }

  return { list, create, save, remove, read, pin, resolveNote, directory, relocate, resetDirectory }
}

/**
 * The instruction `/notebook save` sends: keep the substance, drop the noise, save
 * with the tool. Written for the model, not the user.
 */
const SAVE_PROMPT = [
  'Собери конспект по этой переписке и сохрани его в блокнот.',
  'Убери служебный шум: пути к файлам и номера строк, идентификаторы, метки времени, вывод инструментов, служебные пометки и служебные рассуждения, повторы, вступления вида «Вот конспект».',
  'Оставь только суть: определения, правила и ограничения, ключевые шаги, важные примеры кода, выводы. Формат — Markdown с короткими разделами.',
  'Заголовок — короткий, по теме материала.',
  'Сохрани результат инструментом notebook_save (title и content). Ничего не уточняй у пользователя и не отвечай текстом вместо сохранения.',
].join('\n')

/** The tool text that teaches the model when the library exists. */
const GUIDANCE = [
  '## Блокноты (локальная библиотека заметок)',
  'В этом профиле есть папка с Markdown-заметками; к ней подключены инструменты `notebook_save`, `notebook_list` и `notebook_read`.',
  'Когда пользователь просит «сделай конспект и сохрани в блокнот(ах)», «сохрани это в заметки», «запиши в блокнот» — напиши конспект сам и вызови `notebook_save` с коротким заголовком и готовым Markdown-текстом. Не спрашивай путь: папку выбирает плагин.',
  'Перед сохранением нового раздела одной темы полезно вызвать `notebook_list`, чтобы переиспользовать существующий заголовок и дописать заметку через `notebook_save` с тем же названием темы в заголовке.',
].join('\n')

/**
 * Every tool answers with one rendered text block.
 *
 * The registry refuses a definition without an `output` contract, so the schema
 * and the renderer live here once instead of per tool.
 */
const TOOL_OUTPUT = {
  schema: {
    type: 'object',
    additionalProperties: false,
    required: ['text'],
    properties: {
      text: { type: 'string', description: 'Human-readable result shown in the conversation.' },
    },
  },
  render: (args, value) => {
    const result = value === undefined ? args : value
    const text = result !== null && typeof result === 'object' && typeof result.text === 'string'
      ? result.text
      : (result === undefined ? '' : String(result))
    return [{ type: 'text', text }]
  },
}

/**
 * Register the agent tools over one store.
 * @param ctx - plugin context with `tools`.
 * @param store - the notes store.
 * @returns one disposer per tool.
 */
function registerTools(ctx, store) {
  const disposers = []
  disposers.push(ctx.tools.register({
    name: 'notebook_save',
    description: 'Save a Markdown note into the user\'s local notebooks library (the folder DSH keeps the notebooks in; the user cannot see the path in advance). Use it when the user says, in any wording, "сделай конспект и сохрани в блокнотах", "сохрани это в заметки", "запиши в блокнот", "save this to my notes" or asks for a summary to keep. Write the whole note yourself — a short title (one line, no path) and a self-contained Markdown body with headings, bullets and code fences where useful. Returns the saved note id, title and absolute file path.',
    parameters: {
      type: 'object',
      properties: {
        title: {
          type: 'string',
          description: 'Short human title of the note, used as its file header and in the library list. Do not include a path or a file extension.',
        },
        content: {
          type: 'string',
          description: 'The note body as Markdown. Must be self-contained: the reader sees only this text, not the chat.',
        },
      },
      required: ['title', 'content'],
    },
    output: TOOL_OUTPUT,
    execute: async (args) => {
      const note = await store.create({ title: args?.title, content: args?.content, source: 'agent' })
      return { text: `Saved notebook note "${note.title}" (${note.id}) to ${note.path}` }
    },
  }))
  disposers.push(ctx.tools.register({
    name: 'notebook_list',
    description: 'List the notes in the user\'s local notebooks library, newest first, with ids, titles, update times and file sizes. Use it before saving when the request refers to an existing topic, and to answer "что у меня в блокнотах".',
    parameters: { type: 'object', properties: {} },
    output: TOOL_OUTPUT,
    execute: async () => {
      const notes = await store.list()
      if (notes.length === 0) return { text: 'The notebooks library is empty.' }
      return {
        text: notes
          .map((note) => `- ${note.title} (id ${note.id}, updated ${note.updatedAt || 'unknown'}, ${note.bytes} bytes)`)
          .join('\n'),
      }
    },
  }))
  disposers.push(ctx.tools.register({
    name: 'notebook_read',
    description: 'Read one note from the user\'s local notebooks library in full, by note id (from notebook_list) or by its exact title. Returns the Markdown body.',
    parameters: {
      type: 'object',
      properties: {
        note: {
          type: 'string',
          description: 'Note id (nb-…) or exact note title.',
        },
      },
      required: ['note'],
    },
    output: TOOL_OUTPUT,
    execute: async (args) => {
      const note = await store.resolveNote(args?.note)
      return { text: `# ${note.title} (${note.id})\n\n${note.content}` }
    },
  }))
  return disposers
}

/** Services this row cannot run without: the route table and its peer fence. */
export const inject = ['webServer', 'connection', 'tools', 'commands']

/**
 * The host plugin entry point.
 * @param ctx - the loader row's context.
 * @param config - `{ directory?: string }`; anything else is ignored.
 */
export function apply(ctx, config) {
  const store = createStore(ctx, config)

  ctx.effect(() => {
    const fence = (req) => {
      try {
        return ctx.connection.requestRejection(req) === undefined
      } catch {
        return true
      }
    }
    return ctx.webServer.register({
      kind: 'prefix',
      path: '/notebooks/api',
      handler: async (req, res) => {
        if (!fence(req)) {
          send(res, 403, { ok: false, error: { code: 'forbidden', message: 'forbidden' } })
          return
        }
        if (req.method !== 'POST') {
          send(res, 405, { ok: false, error: { code: 'method', message: 'POST only' } })
          return
        }
        const pathname = new URL(req.url ?? '/', 'http://dsh.internal').pathname
        const method = pathname.startsWith('/notebooks/api/') ? pathname.slice('/notebooks/api/'.length) : ''
        if (method === '' || method.includes('/')) {
          send(res, 404, { ok: false, error: { code: 'not-found', message: `unknown notebooks method "${method}"` } })
          return
        }
        try {
          const payload = await readBody(req)
          let value
          switch (method) {
            case 'list':
              value = { notes: await store.list(), directory: store.directory(), chosen: readChoice() !== undefined }
              break
            case 'read':
              value = await store.read(String(payload.id ?? ''))
              break
            case 'create':
              value = await store.create({ title: payload.title, content: payload.content })
              break
            case 'save':
              value = await store.save(String(payload.id ?? ''), { title: payload.title, content: payload.content })
              break
            case 'delete':
              value = await store.remove(String(payload.id ?? ''))
              break
            case 'pin':
              value = await store.pin(String(payload.id ?? ''), payload.pinned === true)
              break
            case 'info':
              value = { directory: store.directory(), chosen: readChoice() !== undefined }
              break
            case 'relocate':
              value = await store.relocate(payload.directory, { move: payload.move !== false })
              break
            case 'reset-directory':
              value = await store.resetDirectory()
              break
            default:
              throw new NotebookError('not-found', `unknown notebooks method "${method}"`, 404)
          }
          send(res, 200, { ok: true, value })
        } catch (error) {
          const failure = error instanceof NotebookError
            ? error
            : new NotebookError('exception', error instanceof Error ? error.message : String(error), 500)
          if (failure.code === 'exception') ctx.logger?.warn?.(`${NS}: ${failure.message}`)
          send(res, failure.status ?? 500, { ok: false, error: { code: failure.code, message: failure.message } })
        }
      },
    })
  }, 'dsh-notebooks: /notebooks/api routes')

  ctx.effect(() => {
    const disposers = registerTools(ctx, store)
    return () => {
      for (const dispose of disposers.reverse()) {
        try {
          dispose()
        } catch {
          // A failing disposer must not strand the other two tools.
        }
      }
    }
  }, 'dsh-notebooks: agent tools')

  ctx.effect(() => ctx.commands.register({
    name: 'notebook',
    description: 'Собрать конспект из этого чата, убрать служебный мусор и сохранить в блокнот. Пример: /notebook save',
    input: { hint: 'save — ИИ очистит материал и сохранит его в блокнот' },
    handler: async (invocation) => {
      const raw = typeof invocation.rawInput === 'string' ? invocation.rawInput.trim() : ''
      const [sub = '', ...rest] = raw.split(/\s+/)
      if (sub !== '' && sub.toLowerCase() !== 'save') {
        return { kind: 'error', text: 'Поддерживается только /notebook save' }
      }
      const material = rest.join(' ').trim()
      const controller = ctx.get('sessionController')
      if (controller === undefined || controller === null || typeof controller.prompt !== 'function') {
        return { kind: 'error', text: 'Этот профиль не отдаёт Session-контроллер, команда недоступна.' }
      }
      const text = material === '' ? SAVE_PROMPT : `${SAVE_PROMPT}\n\nМатериал для конспекта:\n\n${material}`
      try {
        await controller.prompt({
          requestId: `notebook-${Date.now().toString(36)}`,
          sessionId: invocation.agent.id,
          mode: 'queue',
          content: [{ type: 'text', text }],
        }, invocation.signal)
      } catch (error) {
        return { kind: 'error', text: `Не удалось отправить запрос: ${error instanceof Error ? error.message : String(error)}` }
      }
      return { kind: 'success', text: 'Отправил запрос: ИИ соберёт конспект, уберёт служебный мусор и сохранит его в блокнот.' }
    },
  }), 'dsh-notebooks: /notebook command')

  ctx.inject(['systemPrompt'], (inner) => {
    inner.effect(() => inner.systemPrompt.section({
      name: 'dsh-notebooks',
      order: 500,
      interpolate: false,
      text: () => GUIDANCE,
    }), 'dsh-notebooks: prompt guidance')
  })
}

export { defaultDirectory, splitNote, joinNote, firstHeading }
