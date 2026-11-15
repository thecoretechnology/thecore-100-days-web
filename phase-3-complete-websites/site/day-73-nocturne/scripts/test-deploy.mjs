import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'dist');
const failures = [];
const htmlFiles = [];
const cssFiles = [];
async function walk(dir) {
  for (const item of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, item.name);
    if (item.isDirectory()) await walk(full);
    else {
      if (item.name.endsWith('.html')) htmlFiles.push(full);
      if (item.name.endsWith('.css')) cssFiles.push(full);
    }
  }
}
await walk(root);
if (!htmlFiles.length) throw new Error('No HTML pages found in dist');
const checkLocal = async (owner, ref) => {
  if (/^(?:https?:|mailto:|tel:|data:|#|javascript:|%23)/i.test(ref)) return;
  const clean = decodeURIComponent(ref.split(/[?#]/)[0]);
  const target = path.resolve(path.dirname(owner), clean);
  if (!target.startsWith(root + path.sep) && target !== path.join(root, 'index.html')) {
    failures.push(`${path.relative(root, owner)}: path escapes dist: ${ref}`); return;
  }
  try { await stat(target); } catch { failures.push(`${path.relative(root, owner)}: missing ${ref}`); }
};
for (const file of htmlFiles) {
  const html = await readFile(file, 'utf8');
  const ids = new Set([...html.matchAll(/\bid=["']([^"']+)["']/gi)].map(m => m[1]));
  const refs = [...html.matchAll(/(?:src|href|poster)=["']([^"']+)["']/gi)].map(m => m[1]);
  for (const ref of refs) {
    if (ref.startsWith('#') && ref.length > 1 && !ids.has(decodeURIComponent(ref.slice(1)))) failures.push(`${path.relative(root, file)}: missing in-page anchor ${ref}`);
    else await checkLocal(file, ref);
  }
  if (/<script[^>]+type=["']module/i.test(html)) failures.push(`${path.relative(root, file)}: module script found; static deploy expects classic scripts`);
}
for (const file of cssFiles) {
  const css = await readFile(file, 'utf8');
  const refs = [...css.matchAll(/url\(["']?([^"')]+)["']?\)/gi)].map(m => m[1].trim());
  for (const ref of refs) await checkLocal(file, ref);
}
const hero = path.join(root, 'assets/images/nocturne-hero.avif');
try { await stat(hero); } catch { failures.push('Required hero AVIF missing from production output'); }
if (failures.length) {
  console.error('Deployment asset audit failed:\n' + failures.map(x => ` - ${x}`).join('\n'));
  process.exit(1);
}
// Additional visual-asset checks: every img must have alt text and a real local source.
for (const file of htmlFiles) {
  const html = await readFile(file, 'utf8');
  for (const match of html.matchAll(/<img\b([^>]*)>/gi)) {
    const attrs = match[1];
    const src = attrs.match(/\bsrc=["']([^"']+)["']/i)?.[1];
    const alt = attrs.match(/\balt=["']([^"']*)["']/i)?.[1];
    if (!src) failures.push(`${path.relative(root, file)}: image has no src`);
    else await checkLocal(file, src);
    if (alt === undefined || !alt.trim()) failures.push(`${path.relative(root, file)}: image is missing descriptive alt text`);
  }
}
if (failures.length) {
  console.error('Deployment asset audit failed:\n' + failures.map(x => ` - ${x}`).join('\n'));
  process.exit(1);
}

console.log(`Deployment asset audit passed: ${htmlFiles.length} HTML pages, ${cssFiles.length} CSS files, local links and image assets verified; every image has descriptive alt text.`);
