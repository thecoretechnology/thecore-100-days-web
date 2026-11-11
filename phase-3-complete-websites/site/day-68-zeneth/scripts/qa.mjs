import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'

const root = process.cwd()
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8')
const required = [
  'index.html','package.json','vite.config.js','src/main.jsx','src/App.jsx',
  'src/assets.js','src/data.js','src/styles.css','README.md','QA-REPORT.md','.env.example','scripts/download-assets.mjs'
]
const missing = required.filter((file) => !fs.existsSync(path.join(root, file)))
if (missing.length) throw new Error(`Missing project files: ${missing.join(', ')}`)

const app = read('src/App.jsx')
const data = read('src/data.js')
const assets = read('src/assets.js')
const css = read('src/styles.css')
const pkg = JSON.parse(read('package.json'))
const assetKeys = new Set([...assets.matchAll(/^\s*([A-Za-z0-9_]+):/gm)].map((m) => m[1]))
const assetRefs = new Set([...`${app}\n${data}`.matchAll(/assets\.([A-Za-z0-9_]+)/g)].map((m) => m[1]))
const missingAssets = [...assetRefs].filter((key) => !assetKeys.has(key))
if (missingAssets.length) throw new Error(`Missing asset keys: ${missingAssets.join(', ')}`)

const routes = [...app.matchAll(/<Route\s+path="([^"]+)"/g)].map((m) => m[1])
for (const route of ['/', '/about', '/service', '/pricing', '/contact', '/style-guide', '/licenses', '/instructions', '/changelog', '/404', '/401', '/service/:slug', '/case-study-details/:slug', '*']) {
  if (!routes.includes(route)) throw new Error(`Missing route: ${route}`)
}
for (const slug of [
  'cash-flow-management-service','corporate-finance-consulting-service','retirement-planning-service',
  'strategic-financial-planning-service','tax-planning-advisory-service','wealth-management-service',
  'business-growth-strategy','manufacturing-firm-retirement-rollout'
]) {
  if (!app.includes(slug)) throw new Error(`Missing detail content for ${slug}`)
}
for (const route of ['/about','/service','/pricing','/contact']) {
  if (!app.includes(`'${route.slice(1).charAt(0).toUpperCase()+route.slice(2)}','${route}'`) && !app.includes(`to="${route}"`)) {
    throw new Error(`Main navigation does not expose ${route}`)
  }
}
for (const route of ['/style-guide','/licenses','/instructions','/changelog','/404','/401']) {
  if (!app.includes(`to="${route}"`)) throw new Error(`Utility navigation does not expose ${route}`)
}
if (!pkg.scripts?.dev || !pkg.scripts?.build || !pkg.scripts?.check || !pkg.scripts?.['assets:download']) throw new Error('Missing required npm scripts')
if (!app.includes('VITE_FORM_ENDPOINT') || !app.includes('submitLeadForm')) throw new Error('Lead forms are missing endpoint-based submission handling')
if (app.includes('connect a form endpoint to deliver submissions')) throw new Error('Found fake form-success copy')
if (!css.includes('@media') || !css.includes('prefers-reduced-motion')) throw new Error('Responsive or reduced-motion CSS is missing')
if (app.includes('href="#footer"')) throw new Error('Found a social icon pointing to a non-functional self-link')
const cdnConfigured = assets.includes('https://cdn.prod.website-files.com/')
console.log(`Project structure: OK (${required.length} required files)`)
console.log(`Routes: OK (${routes.length} route patterns)`)
console.log(`Asset references: OK (${assetRefs.size} referenced keys; original CDN base ${cdnConfigured ? 'configured' : 'missing'})`)
console.log('Forms: endpoint-backed; set VITE_FORM_ENDPOINT before accepting submissions')
console.log('Responsive CSS and reduced-motion support: OK')
