# Zeneth production handoff — QA report

**Prepared:** 10 November 2026

## Checks completed

- React JSX and JavaScript source syntax parsed successfully.
- `scripts/qa.mjs` passed: required project files, 14 route patterns, all 61 referenced asset keys, detail-page slugs, form endpoint wiring, responsive CSS and reduced-motion support.
- Stylesheet parsed successfully: 672 top-level CSS rules and zero parser errors.
- `scripts/qa.mjs` and `scripts/download-assets.mjs` passed Node syntax checks.
- ZIP archive integrity is checked after packaging.

## Runtime checks not completed

The package registry could not be resolved from this environment (`EAI_AGAIN registry.npmjs.org`). Dependencies therefore could not be installed, and the following have **not** been represented as passed:

- `npm run build`
- Running the Vite development server with the installed React dependencies
- Browser-based route-by-route, interaction and responsive screenshot testing
- Live image/CDN availability checks
- End-to-end form submission against a real endpoint

Run `npm install`, `npm run check`, and `npm run build` on a network-enabled machine before deployment.

## External configuration still required

- Original photographs and graphics are referenced from the Zeneth Webflow CDN. The source binaries are not included in this archive. Run `npm run assets:download` on a network-enabled machine to download the exact originals and switch the manifest to local files.
- Configure `VITE_FORM_ENDPOINT` in `.env.local` for contact and newsletter delivery. Forms do not display a false success state when no endpoint is configured.
- Configure password protection at the hosting layer for `/401`; a client-side password would not be secure.
- Original licensed Merchant and Google Sans font files were not supplied. DM Sans is used as the web fallback.

This report distinguishes completed static checks from runtime/browser checks that still require an installed dependency tree and deployment configuration.
