import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { classes as classData } from '../src/data/site.js';
import { scheduleDates, articles, tutors } from '../src/data/pages.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');
const walk = (dir) => fs.readdirSync(path.join(root, dir), { withFileTypes: true }).flatMap((entry) => {
  const relative = path.join(dir, entry.name);
  return entry.isDirectory() ? walk(relative) : [relative];
});
const sourceFiles = walk('src').filter((file) => /\.(jsx?|css)$/.test(file));
const source = sourceFiles.map(read).join('\n');
const errors = [];
const requiredRoutes = [
  '/', '/classes', '/classes/ceramics', '/classes/printmaking', '/classes/textiles',
  '/classes/jewellery', '/class/:slug', '/schedule', '/open-studio', '/membership',
  '/private-groups', '/gift-cards', '/about', '/team', '/journal', '/journal/:slug',
  '/visit', '/faq', '/privacy', '/terms', '/disciplines/:slug',
];
const app = read('src/App.jsx');
for (const route of requiredRoutes) {
  if (!app.includes(`path="${route}"`)) errors.push(`Missing route declaration: ${route}`);
}

const assetRefs = new Set([
  ...[...source.matchAll(/['"](\/images\/[^'"]+)['"]/g)].map((match) => match[1]),
  ...[...source.matchAll(/url\(['"]?(\/images\/[^)'\"]+)/g)].map((match) => match[1]),
]);
for (const asset of assetRefs) {
  if (!fs.existsSync(path.join(root, 'public', asset.slice(1)))) errors.push(`Missing image asset: ${asset}`);
}

for (const file of sourceFiles.filter((item) => /\.jsx?$/.test(item))) {
  const code = read(file);
  for (const match of code.matchAll(/from\s+['"](\.[^'"]+)['"]/g)) {
    const base = path.resolve(root, path.dirname(file), match[1]);
    const candidates = [base, `${base}.js`, `${base}.jsx`, path.join(base, 'index.js'), path.join(base, 'index.jsx')];
    if (!candidates.some((candidate) => fs.existsSync(candidate))) errors.push(`Unresolved import in ${file}: ${match[1]}`);
  }
}

const packageJson = JSON.parse(read('package.json'));
for (const dependency of ['react', 'react-dom', 'react-router-dom', 'lucide-react']) {
  if (!packageJson.dependencies?.[dependency]) errors.push(`Missing runtime dependency: ${dependency}`);
}
for (const dependency of ['vite', '@vitejs/plugin-react']) {
  if (!packageJson.devDependencies?.[dependency]) errors.push(`Missing build dependency: ${dependency}`);
}

const routePage = read('src/pages/RoutePage.jsx');
const slugs = classData.map((item) => item.slug);
const missingClassDetails = slugs.filter((slug) => !routePage.includes(`'${slug}'`));
if (missingClassDetails.length) errors.push(`Class details missing: ${missingClassDetails.join(', ')}`);
const missingScheduleClasses = scheduleDates.filter((date) => !slugs.includes(date.classSlug));
if (missingScheduleClasses.length) errors.push(`Schedule references missing classes: ${missingScheduleClasses.map((date) => date.classSlug).join(', ')}`);
if (classData.length !== 12) errors.push(`Expected 12 class records, found ${classData.length}`);
if (scheduleDates.length !== 16) errors.push(`Expected 16 schedule dates, found ${scheduleDates.length}`);
if (articles.length !== 7) errors.push(`Expected 7 journal stories, found ${articles.length}`);
if (tutors.length !== 4) errors.push(`Expected 4 tutor profiles, found ${tutors.length}`);

console.log(`Static QA: ${sourceFiles.length} source files, ${assetRefs.size} referenced images, ${requiredRoutes.length} routes, ${classData.length} classes, ${scheduleDates.length} schedule dates.`);
if (errors.length) {
  console.error(`FAIL (${errors.length})`);
  for (const error of errors) console.error(` - ${error}`);
  process.exitCode = 1;
} else {
  console.log('PASS: route declarations, local imports, image references, class detail data and required dependencies.');
}
