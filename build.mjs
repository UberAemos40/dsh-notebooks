/**
 * Build step for dsh-notebooks: inlines the vendored markdown-it UMD build into
 * the Client module, because the Harness module loader takes exactly one file per
 * plugin and this plugin has no bundler dependency of its own.
 *
 *   node build.mjs      # src/client.js + vendor/ -> client.bundle.js
 */
import { readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const here = dirname(fileURLToPath(import.meta.url))
const marker = '    // @vendor-markdown-it'
const markerHighlight = '    // @vendor-highlight'

const source = await readFile(join(here, 'src/client.js'), 'utf8')
if (!source.includes(marker)) throw new Error(`src/client.js lost its vendor marker (${marker})`)

const vendor = await readFile(join(here, 'vendor/markdown-it.umd.min.js'), 'utf8')
const highlight = await readFile(join(here, 'vendor/highlight.bundle.js'), 'utf8')

const block = [
  '    // Vendored markdown-it (MIT): see vendor/LICENSE.markdown-it. The UMD build',
  '    // is evaluated in a local CommonJS shim so the module gets it as a value,',
  '    // not through a global and not through eval.',
  '    const mdModule = { exports: {} }',
  '    ;(function (module, exports) {',
  vendor,
  '    })(mdModule, mdModule.exports)',
  '    const markdownit = mdModule.exports.markdownit ?? mdModule.exports',
].join('\n')

const highlightBlock = [
  '    // Vendored highlight.js (BSD-3-Clause) core plus a language subset.',
  highlight,
].join('\n')

let built = source.replace(marker, () => block)
if (built.includes(markerHighlight)) built = built.replace(markerHighlight, () => highlightBlock)
await writeFile(join(here, 'client.bundle.js'), built, 'utf8')
console.log(`client.bundle.js written (${Math.round(built.length / 1024)} KB)`)
