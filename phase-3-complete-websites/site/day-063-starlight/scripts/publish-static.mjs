import { cp, readdir, rm } from 'node:fs/promises';
import { join } from 'node:path';

const root = new URL('../', import.meta.url);
const dist = new URL('../dist/', import.meta.url);
const keep = new Set(['src', 'public', 'scripts', 'dist', 'package.json', 'astro.config.mjs', 'README.md']);

for (const entry of await readdir(root, { withFileTypes: true })) {
  if (!keep.has(entry.name)) await rm(join(root.pathname, entry.name), { recursive: true, force: true });
}

for (const entry of await readdir(dist)) {
  await cp(new URL(entry, dist), new URL(entry, root), { recursive: true, force: true });
}

console.log('Published Day 63 static pages to the project root.');
