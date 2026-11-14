import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const sourceRoots = ['src', 'index.html'];
const files = [];
function walk(target) {
  if (!fs.existsSync(target)) return;
  const stat = fs.statSync(target);
  if (stat.isDirectory()) {
    for (const entry of fs.readdirSync(target)) walk(path.join(target, entry));
  } else if (/\.(jsx?|css|html)$/.test(target)) files.push(target);
}
for (const entry of sourceRoots) walk(path.join(root, entry));
const refs = new Map();
for (const file of files) {
  const text = fs.readFileSync(file, 'utf8');
  for (const match of text.matchAll(/(\/assets\/[A-Za-z0-9_./-]+)/g)) {
    refs.set(match[1], file);
  }
}
const missing = [];
for (const [ref, source] of refs) {
  const target = path.join(root, 'public', ref.replace(/^\//, ''));
  if (!fs.existsSync(target) || !fs.statSync(target).isFile() || fs.statSync(target).size === 0) {
    missing.push({ ref, source });
  }
}
if (missing.length) {
  console.error('Missing local assets:');
  for (const item of missing) console.error(`- ${item.ref} (referenced in ${path.relative(root, item.source)})`);
  process.exitCode = 1;
} else {
  console.log(`PASS: ${refs.size} unique local asset references resolve to non-empty files.`);
}
