# Release QA report — 10 November 2026

## Source-level corrections made in this release candidate

- Product cards only display the sale badge when an original price exists.
- Unknown routes now show a 404 page instead of silently rendering the homepage.
- Unknown product IDs, blog IDs and category slugs now show the 404 page instead of silently displaying unrelated content.
- The category "Newest Arrivals" sort preserves the source catalogue order; alphabetical sorting remains available.
- Added `npm run check:assets` to test referenced remote image URLs.
- Pinned dependency major versions and moved Vite/React plugin into development dependencies.
- Updated README with setup, build, asset hosting and demo checkout limitations.

## Verification status

| Check | Result | Notes |
|---|---|---|
| Source files and import paths | PASS (manual inventory) | React source, styles, data, pages and components are included. |
| `package.json` syntax | PASS | Parsed successfully as JSON. |
| Plain JavaScript syntax | PASS | `src/data/store.js` and `scripts/check-assets.mjs` passed `node --check`. |
| npm dependency installation | BLOCKED | `npm install --no-audit --no-fund` timed out in this environment. |
| Vite production build | NOT RUN | Cannot run without installed dependencies. |
| Browser route/interaction tests | NOT RUN | No installed browser automation runtime is available. |
| Console error inspection | NOT RUN | Requires running the app in a browser. |
| 1440 / 1280 / 768 / 390 / 360 responsive screenshots | NOT RUN | Requires a running browser. |
| Remote image availability | BLOCKED | DNS lookup for `cdn.prod.website-files.com` failed / timed out in this environment. |

## Release decision

**NOT CLEARED FOR PRODUCTION.** The source package is prepared, but this environment could not reach the npm registry or the Webflow CDN. Consequently, a successful install, production build, runtime QA, responsive browser test, and image reachability check cannot honestly be certified here.

The website references Webflow-hosted images and Google Fonts; these are not bundled locally. Full offline/self-hosted deployment requires downloading and licensing those assets and updating the asset paths.

Run the following from a network-enabled machine before deployment:

```bash
npm install
npm run check:assets
npm run build
npm run preview
```

Then perform browser QA at 1440px, 1280px, 768px, 390px and 360px, including cart persistence, form validation, navigation, carousel controls and product routes.
