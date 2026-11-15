import { cp, mkdir, rm, copyFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';

const output = new URL('./dist/', import.meta.url);
const root = new URL('./', import.meta.url);
await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
for (const entry of ['index.html', 'menu.html', 'food.html', 'about.html', 'gallery.html', 'experience.html', 'nights.html', 'private-hire.html', 'contact.html', 'css', 'js', 'assets', 'drink']) {
  const source = new URL(entry, root);
  if (!existsSync(source)) throw new Error(`Required production entry is missing: ${entry}`);
  await cp(source, new URL(`${entry}${entry.includes('.') ? '' : '/'}`, output), { recursive: true });
}
await writeFile(new URL('.nojekyll', output), '');
console.log('Production site built in dist/');
