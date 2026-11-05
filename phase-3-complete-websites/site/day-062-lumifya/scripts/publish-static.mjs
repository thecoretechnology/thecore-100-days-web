import { copyFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const distRoot = resolve(projectRoot, 'dist');
const publishedAssets = resolve(projectRoot, 'assets');

mkdirSync(publishedAssets, { recursive: true });
copyFileSync(resolve(distRoot, 'app.html'), resolve(projectRoot, 'index.html'));
copyFileSync(resolve(distRoot, 'assets/app.js'), resolve(publishedAssets, 'app.js'));
copyFileSync(resolve(distRoot, 'assets/app.css'), resolve(publishedAssets, 'app.css'));

console.log('Published the GitHub Pages bundle to index.html and assets/.');
