const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');

const root = path.resolve(__dirname, '..');
const failures = [];
const walk = dir => fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
  const full = path.join(dir, entry.name);
  return entry.isDirectory() ? walk(full) : [full];
});
const files = walk(root);
const htmlFiles = files.filter(file => file.endsWith('.html'));
const productPages = htmlFiles.filter(file => file.includes(`${path.sep}product${path.sep}`));

if (!fs.existsSync(path.join(root, 'index.html'))) failures.push('Missing homepage index.html');
if (htmlFiles.length !== 25) failures.push(`Expected 25 HTML pages, found ${htmlFiles.length}`);
if (productPages.length !== 16) failures.push(`Expected 16 product pages, found ${productPages.length}`);

for (const file of files.filter(file => file.endsWith('.js'))) {
  const check = spawnSync(process.execPath, ['--check', file], { encoding: 'utf8' });
  if (check.status !== 0) failures.push(`JavaScript syntax error in ${path.relative(root, file)}: ${check.stderr}`);
}

for (const file of htmlFiles) {
  const html = fs.readFileSync(file, 'utf8');
  const baseHref = html.match(/<base\s+href=["']([^"']+)["']/i)?.[1] || '';
  const baseDir = path.resolve(path.dirname(file), decodeURIComponent(baseHref));
  const documentWithoutBase = html.replace(/<base\s+href=["'][^"']+["']\s*\/?\s*>/i, '');
  const refs = [...documentWithoutBase.matchAll(/(?:href|src)=["']([^"']+)["']/g)].map(match => match[1]);
  for (const ref of refs) {
    if (/^(?:[a-z]+:|\/\/|#)/i.test(ref)) continue;
    const cleanRef = decodeURIComponent(ref.split(/[?#]/)[0]);
    let local = path.resolve(baseDir, cleanRef);
    if (cleanRef.endsWith('/')) local = path.join(local, 'index.html');
    if (local !== root && !local.startsWith(`${root}${path.sep}`)) {
      failures.push(`Local reference escapes the site root in ${path.relative(root, file)}: ${ref}`);
      continue;
    }
    if (!fs.existsSync(local)) failures.push(`Broken local reference in ${path.relative(root, file)}: ${ref}`);
  }
}

const productsFile = path.join(root, 'assets', 'js', 'products.js');
if (!fs.existsSync(productsFile)) failures.push('Missing central product catalogue');
else {
  const source = fs.readFileSync(productsFile, 'utf8');
  const slugs = [...source.matchAll(/"slug":\s*"([^"]+)"/g)].map(match => match[1]);
  const imagePaths = [...source.matchAll(/\"image\":\s*\"([^\"]+)\"/g)].map(match => match[1]);
  for (const imagePath of imagePaths) {
    if (imagePath.startsWith('/')) failures.push(`Product image must use a site-relative local path: ${imagePath}`);
    else if (!fs.existsSync(path.join(root, imagePath))) failures.push(`Missing bundled product image: ${imagePath}`);
  }
  if (imagePaths.length !== 16) failures.push(`Expected 16 product image paths, found ${imagePaths.length}`);
  for (const slug of slugs) {
    if (!fs.existsSync(path.join(root, 'product', slug, 'index.html'))) failures.push(`Missing product route: ${slug}`);
  }
  if (slugs.length !== 16) failures.push(`Expected 16 product records, found ${slugs.length}`);
}

if (failures.length) {
  console.error('ToyStore verification FAILED');
  failures.forEach(item => console.error(` - ${item}`));
  process.exit(1);
}
console.log('ToyStore verification PASSED');
console.log(` - ${htmlFiles.length} HTML pages found`);
console.log(` - ${productPages.length} product detail pages found`);
console.log(' - All JavaScript files pass node --check');
console.log(' - All site-relative local links and asset references resolve');
console.log(' - All 16 product records have matching detail routes');
