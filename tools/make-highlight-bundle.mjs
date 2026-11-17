/**
 * Generate vendor/highlight.bundle.js from the installed highlight.js package.
 *
 * The browser build has to be a single global-free script: the Client module is
 * one file loaded by the Harness module loader. This packs the CommonJS core plus
 * the languages a code note realistically uses into one IIFE that ends with
 * `var highlightjs = ...`.
 *
 *   node tools/make-highlight-bundle.mjs [path-to-highlight.js/lib]
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const outFile = join(here, '..', 'vendor', 'highlight.bundle.js')
const libRoot = process.argv[2] ?? 'node_modules/highlight.js/lib'

const LANGUAGES = [
  'csharp', 'javascript', 'typescript', 'json', 'bash', 'python', 'sql',
  'cpp', 'c', 'xml', 'css', 'markdown', 'yaml', 'diff', 'ini', 'powershell',
]

const entryKey = './entry'
const modules = new Map()

/** Load one module by its key (e.g. './core') and follow relative requires. */
async function load(key) {
  if (modules.has(key)) return
  const file = join(libRoot, `${key.replace(/^\.\//, '')}.js`)
  const source = await readFile(file, 'utf8')
  modules.set(key, source)
  const requires = [...source.matchAll(/require\(\s*(['"])([^'"]+)\1\s*\)/g)].map((match) => match[2])
  for (const spec of requires) {
    if (!spec.startsWith('.')) throw new Error(`unexpected external require "${spec}" in ${key}`)
    await load(spec)
  }
}

const entry = [
  "var hljs = require('./core')",
  ...LANGUAGES.map((id) => `hljs.registerLanguage('${id}', require('./languages/${id}'))`),
  'module.exports = hljs',
].join('\n')
modules.set(entryKey, entry)
for (const spec of LANGUAGES.map((id) => `./languages/${id}`)) await load(spec)
await load('./core')

const parts = ['var highlightjs = (function () {', '  var modules = {']
for (const [key, source] of modules) {
  if (key === entryKey) continue
  parts.push(`    ${JSON.stringify(key)}: function (module, exports, require) {`)
  parts.push(source)
  parts.push('    },')
}
parts.push('    "./entry": function (module, exports, require) {')
parts.push(entry)
parts.push('    },')
parts.push('  }')
parts.push('  var cache = {}')
parts.push('  function load(id) {')
parts.push('    if (cache[id] !== undefined) return cache[id].exports')
parts.push('    var mod = { exports: {} }')
parts.push('    cache[id] = mod')
parts.push('    modules[id](mod, mod.exports, load)')
parts.push('    return mod.exports')
parts.push('  }')
parts.push('  return load("./entry")')
parts.push('})()')

await mkdir(dirname(outFile), { recursive: true })
const output = `${parts.join('\n')}\n`
await writeFile(outFile, output, 'utf8')
console.log(`vendor/highlight.bundle.js written: ${Math.round(output.length / 1024)} KB, ${modules.size} modules`)
