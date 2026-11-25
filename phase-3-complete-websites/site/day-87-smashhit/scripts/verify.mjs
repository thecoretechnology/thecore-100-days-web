import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const pages = [
  "index.html", "story/index.html", "programs/index.html", "schedule/index.html",
  "get-in-touch/index.html", "blog/index.html",
  "blog/train-like-a-professional-tennis-player/index.html",
  "blog/ball-trace-putting-your-own-stamp-on-your-tennis-balls/index.html",
  "blog/revealed-radical-auxetic-tennis-racket/index.html",
  "blog/the-health-benefits-of-playing-tennis/index.html",
  "blog/the-difference-between-a-cheap-and-an-expensive-racket/index.html",
  "blog/best-new-year-resolutions-for-authentic-tennis-lovers/index.html",
  "404.html"
];
const assets = ["assets/css/style.css", "assets/js/app.js", "assets/images/hero.jpg", "assets/fonts/satoshi-regular.woff2"];
const missing = [...pages, ...assets].filter((path) => !existsSync(join(root, path)));
if (missing.length) throw new Error(`Missing required files:\n${missing.join("\n")}`);
for (const page of pages) {
  const source = readFileSync(join(root, page), "utf8");
  if (!source.includes("/thecore-100-days-web/phase-3-complete-websites/site/day-87-smashhit/")) {
    throw new Error(`${page} is missing the GitHub Pages base path`);
  }
}
console.log(`Verified ${pages.length} pages and shared deployment assets.`);
