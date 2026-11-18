import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'

const dist = new URL('../dist/', import.meta.url)
const shell = await readFile(new URL('index.html', dist), 'utf8')

for (const route of ['collection', 'looks', 'atelier', 'journal']) {
  const directory = new URL(`${route}/`, dist)
  await mkdir(directory, { recursive: true })
  const nestedShell = shell.replaceAll('./assets/', '../assets/')
  await writeFile(join(directory.pathname, 'index.html'), nestedShell)
}
