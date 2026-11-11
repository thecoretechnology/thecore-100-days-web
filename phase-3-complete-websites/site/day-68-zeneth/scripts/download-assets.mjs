import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { assets } from '../src/assets.js'

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const outputDir = path.join(projectRoot, 'public', 'assets')
const entries = Object.entries(assets)
const urlToFile = new Map()
const failures = []

await fs.mkdir(outputDir, { recursive: true })

for (const [key, url] of entries) {
  if (urlToFile.has(url)) continue
  const extension = path.extname(new URL(url).pathname) || '.bin'
  const filename = `${key}${extension}`
  try {
    const response = await fetch(url)
    if (!response.ok) throw new Error(`HTTP ${response.status}`)
    const bytes = new Uint8Array(await response.arrayBuffer())
    if (!bytes.byteLength) throw new Error('Empty response')
    await fs.writeFile(path.join(outputDir, filename), bytes)
    urlToFile.set(url, `/assets/${filename}`)
    console.log(`Downloaded ${key} (${Math.round(bytes.byteLength / 1024)} KB)`)
  } catch (error) {
    failures.push(`${key}: ${error.message}`)
  }
}

if (failures.length) {
  console.error('\nSome original images could not be downloaded. The CDN manifest was not changed.')
  for (const failure of failures) console.error(`- ${failure}`)
  process.exitCode = 1
} else {
  const lines = entries.map(([key, url]) => `  ${JSON.stringify(key)}: ${JSON.stringify(urlToFile.get(url))},`)
  const manifest = `// Local copies of the original Zeneth Webflow assets.\nexport const assets = {\n${lines.join('\n')}\n}\n`
  await fs.writeFile(path.join(projectRoot, 'src', 'assets.js'), manifest)
  console.log(`\nAll ${entries.length} asset references are now self-hosted under public/assets/.`)
}
