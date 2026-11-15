# Release QA report

## Release artifact

- Archive: `handsel-website-replica.zip`
- Application: React 18 + Vite 5 + React Router 6
- Source: JavaScript / JSX
- Local imagery: `public/images/`
- Dependencies: pinned in `package.json`

## Changes made during final audit

- Restored the desktop `Browse classes` header CTA to visibility, matching the supplied homepage screenshot.
- Normalized homepage discipline links to the canonical `/classes/:discipline` routes.
- Changed the homepage next-class card to open the Screen Printing I detail route.
- Replaced stale class records with the 12 classes currently listed by the reference site, including their names, durations and prices.
- Replaced stale schedule content with the 16 current schedule dates and class references.
- Updated tutor names, journal story titles and the seven FAQ entries to match current reference content.
- Updated studio contact details to the current reference address and email.
- Fixed duplicate React keys for schedule dates where the same class appears on more than one date.
- Added defensive overflow rules for narrow phone widths.
- Removed unused imports, an unused helper and standalone preview files from the release archive.
- Added `npm run qa:static` for repeatable source/asset/route checks.

## Checks that passed

- Static route declarations: 21 (19 requested page types plus discipline/class aliases).
- Class records: 12.
- Schedule date records: 16; every date points to an existing class.
- Journal stories: 7.
- Tutor records: 4.
- Referenced local images: 8; all references resolve to files in `public/images/`.
- Relative JavaScript/JSX imports: all resolve.
- JSX/JavaScript syntax parse: 12 files, zero syntax diagnostics using the installed TypeScript parser.
- CSS parse: zero stylesheet parse errors using `tinycss2`.
- `npm run qa:static`: passed.
- ZIP integrity: `unzip -t` passed; archive contains source, assets, package configuration and README; no `node_modules` or `dist` directory included.

## Checks blocked by the execution environment

- `npm install --no-audit --no-fund` was attempted but DNS resolution for `registry.npmjs.org` failed (`EAI_AGAIN`). An offline install also failed because the dependencies were not cached.
- `npm run build` was attempted but could not start because Vite is not installed (`vite: not found`).
- The local browser automation environment blocked navigation to both localhost and file URLs, so full React runtime inspection, console monitoring, direct-route browser testing and measured five-viewport overflow testing could not be completed.

These checks are **not** marked as passed. The project should not be considered production-build-verified until dependencies install and `npm run build` succeeds on a machine with npm registry access.

## Known functional limitations

- Contact, private-group, gift-card and newsletter forms validate locally and show confirmation feedback; they do not send messages or persist submissions.
- Class booking, payment processing, gift-card issuance, waitlists and live availability require backend/service integrations.
- The original licensed font files were not supplied. The design uses the CSS font stack and Google Fonts imports, with system fallbacks.
- The project is an independent visual recreation, not the original Framer source.

## Run release checks locally

```bash
npm install
npm run qa:static
npm run build
npm run dev
```

Test the app at 1440px, 1280px, 768px, 390px and 360px, and open each requested route directly before production deployment.
