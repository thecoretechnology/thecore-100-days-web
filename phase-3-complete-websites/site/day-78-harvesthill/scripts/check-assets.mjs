import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
const files=[];
function walk(dir){for(const name of readdirSync(dir,{withFileTypes:true})){const path=join(dir,name.name);if(name.isDirectory())walk(path);else if(/\.(js|jsx|css)$/.test(name.name))files.push(path)}}
walk('src');
const refs=new Set();
for(const file of files){const text=readFileSync(file,'utf8');for(const match of text.matchAll(/['"`]?(\/images\/[\w.-]+)['"`]?/g))refs.add(match[1]);}
const missing=[...refs].filter(ref=>!existsSync(join('public',ref.slice(1))));
if(missing.length){console.error('Missing local images:',missing.join(', '));process.exit(1)}
console.log(`Asset check passed: ${refs.size} local image references found.`);
