import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';

const project = new URL('../', import.meta.url);
const dist = new URL('../dist/', import.meta.url);
const routes = [
  'about-us', 'solutions', 'pricing', 'contact', 'our-team', 'blog', 'faq', 'gallery',
  'solutions/precision-farming', 'solutions/sustainable-irrigation',
  'solutions/supply-chain-support', 'solutions/climate-resilient-program',
  'solutions/technology-integration', 'solutions/organic-practices',
];

await rm(new URL('assets/', project), { recursive: true, force: true });
await rm(new URL('images/', project), { recursive: true, force: true });
await mkdir(new URL('assets/', project), { recursive: true });
await mkdir(new URL('images/', project), { recursive: true });
await cp(new URL('assets/', dist), new URL('assets/', project), { recursive: true });
await cp(new URL('images/', dist), new URL('images/', project), { recursive: true });

let appHtml = await readFile(new URL('app.html', dist), 'utf8');
const scriptMatch = appHtml.match(/<script type="module" crossorigin src="[^"]*\/assets\/([^"]+)"><\/script>/);
const styleMatch = appHtml.match(/<link rel="stylesheet" crossorigin href="[^"]*\/assets\/([^"]+)">/);
if (!scriptMatch || !styleMatch) throw new Error('Unable to locate the generated Day 78 assets.');

const script = (await readFile(new URL(`assets/${scriptMatch[1]}`, dist), 'utf8'))
  .replace(/\n?\/\/# sourceMappingURL=.*$/m, '');
const scriptBase64 = Buffer.from(script).toString('base64');
const scriptLoader = `(()=>{const bytes=Uint8Array.from(atob('${scriptBase64}'),c=>c.charCodeAt(0));(0,eval)(new TextDecoder().decode(bytes))})()`;
const style = await readFile(new URL(`assets/${styleMatch[1]}`, dist), 'utf8');
appHtml = appHtml
  .replace(scriptMatch[0], '')
  .replace(styleMatch[0], `<style>${style}</style>`)
  .replace('</body>', `<script>${scriptLoader}</script></body>`)
  .replace(/[ \t]+\n/g, '\n');

await writeFile(new URL('index.html', project), appHtml);
for (const route of routes) {
  const routeDirectory = new URL(`${route}/`, project);
  await mkdir(routeDirectory, { recursive: true });
  await writeFile(new URL('index.html', routeDirectory), appHtml);
}

console.log(`Published the Day 78 GitHub Pages bundle and ${routes.length} route fallbacks.`);
