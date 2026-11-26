import { access, readFile } from 'node:fs/promises';
import { join } from 'node:path';

const root = new URL('..', import.meta.url).pathname;
const required = [
  'index.html', 'collection/index.html', 'legal/privacy-policy/index.html',
  'legal/terms-of-service/index.html', 'legal/cookie-policy/index.html',
  'assets/css/style.css', 'assets/js/app.js', 'assets/fonts/pangolin.woff2',
  'assets/fonts/montserrat-regular.woff2', 'assets/images/hero.webp'
];
for (const file of required) await access(join(root, file));
const html = await readFile(join(root, 'index.html'), 'utf8');
const js = await readFile(join(root, 'assets/js/app.js'), 'utf8');
if (!html.includes('/thecore-100-days-web/phase-3-complete-websites/site/day-88-minicrochet/')) throw new Error('Incorrect GitHub Pages base path');
if (!js.includes('renderCollection') || !js.includes('renderLegal')) throw new Error('Page renderers missing');
console.log(`Build verified: ${required.length} required files, 5 routes, GitHub Pages base path configured.`);
