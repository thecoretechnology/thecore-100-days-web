import { referenceAssets, categories, products, blogs } from '../src/data/store.js';

const urls = new Set();
function collect(value) {
  if (typeof value === 'string' && /^https?:\/\//i.test(value)) urls.add(value);
  else if (Array.isArray(value)) value.forEach(collect);
  else if (value && typeof value === 'object') Object.values(value).forEach(collect);
}
collect(referenceAssets);
collect(categories);
collect(products);
collect(blogs);

console.log(`Checking ${urls.size} unique remote assets...`);
const results = await Promise.all([...urls].map(async (url) => {
  try {
    const response = await fetch(url, { method: 'HEAD', signal: AbortSignal.timeout(4000) });
    return { url, ok: response.ok, detail: String(response.status) };
  } catch (error) {
    return { url, ok: false, detail: error.cause?.code || error.name };
  }
}));
for (const result of results) console.log(`${result.ok ? 'OK ' : 'FAIL'} ${result.detail} ${result.url}`);
const passed = results.filter((result) => result.ok).length;
console.log(`\nAsset check: ${passed}/${results.length} reachable`);
if (passed !== results.length) process.exitCode = 1;
