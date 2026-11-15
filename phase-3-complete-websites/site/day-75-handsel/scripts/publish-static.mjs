import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';

const project = new URL('../', import.meta.url);
const dist = new URL('../dist/', import.meta.url);
const routes = [
  'classes', 'classes/ceramics', 'classes/printmaking', 'classes/textiles', 'classes/jewellery',
  'class/wheel-throwing-i', 'class/wheel-throwing-ii', 'class/mugs-on-the-wheel',
  'class/introduction-to-linocut', 'class/screen-printing-i', 'class/botanical-lino-prints',
  'class/natural-dyeing', 'class/indigo-shibori', 'class/frame-loom-weaving',
  'class/silver-ring-making', 'class/stone-setting', 'class/hammered-stacking-rings',
  'disciplines/ceramics', 'disciplines/printmaking', 'disciplines/textiles', 'disciplines/jewellery',
  'schedule', 'open-studio', 'membership', 'private-groups', 'gift-cards',
  'about', 'team', 'journal', 'visit', 'faq', 'privacy', 'terms',
  'journal/what-happens-to-your-pot-after-you-leave',
  'journal/how-to-make-a-ring-that-actually-fits',
  'journal/open-evenings-are-back-for-autumn',
  'journal/five-things-before-your-first-linocut',
  'journal/a-year-in-the-dye-garden', 'journal/forty-years-at-the-bench',
  'journal/how-to-choose-your-first-class'
];

await rm(new URL('assets/', project), { recursive: true, force: true });
await rm(new URL('images/', project), { recursive: true, force: true });
await mkdir(new URL('assets/', project), { recursive: true });
await mkdir(new URL('images/', project), { recursive: true });
await cp(new URL('assets/', dist), new URL('assets/', project), { recursive: true });
await cp(new URL('images/', dist), new URL('images/', project), { recursive: true });
const appHtml = await readFile(new URL('app.html', dist));
await writeFile(new URL('index.html', project), appHtml);
await writeFile(new URL('404.html', project), await readFile(new URL('404.html', dist)));
for (const route of routes) {
  const routeDirectory = new URL(`${route}/`, project);
  await mkdir(routeDirectory, { recursive: true });
  await writeFile(new URL('index.html', routeDirectory), appHtml);
}

console.log(`Published the GitHub Pages bundle and ${routes.length} route fallbacks to the Day 75 project root.`);
