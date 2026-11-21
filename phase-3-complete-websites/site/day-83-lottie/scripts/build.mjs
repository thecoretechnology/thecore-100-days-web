import { cp, mkdir, readdir, rm } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const dist = resolve(root, "dist");
await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });
const htmlPages = (await readdir(root)).filter((file) => file.endsWith(".html"));
await Promise.all(
  [...htmlPages, "styles.css", "script.js", "components.js"].map((file) =>
    cp(resolve(root, file), resolve(dist, file)),
  ),
);
await cp(resolve(root, "assets"), resolve(dist, "assets"), {
  recursive: true,
});
console.log("Built static site in dist/");
