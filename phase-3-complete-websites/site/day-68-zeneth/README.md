# Zeneth — multi-page React + Vite website

A responsive React recreation of the accessible pages and navigation structure of the Zeneth financial consulting Webflow site.

## Requirements

- Node.js 20 or newer
- npm 10 or newer
- Internet access for the original Webflow CDN images and Google Fonts
- A form endpoint for live contact/newsletter delivery

## Run locally

```bash
npm install
npm run check
npm run dev
```

Open the local URL printed by Vite, normally `http://localhost:5173`.

Create a production build with:

```bash
npm run build
npm run preview
```

## Pages and routes

### Main navigation

- `/` — Home
- `/about` — About
- `/service` — Service overview
- `/pricing` — Pricing
- `/contact` — Contact

### Service details

- `/service/cash-flow-management-service`
- `/service/corporate-finance-consulting-service`
- `/service/retirement-planning-service`
- `/service/strategic-financial-planning-service`
- `/service/tax-planning-advisory-service`
- `/service/wealth-management-service`

### Case studies

- `/case-study-details/business-growth-strategy`
- `/case-study-details/manufacturing-firm-retirement-rollout`

### Utility pages

- `/style-guide`
- `/licenses`
- `/instructions`
- `/changelog`
- `/404`
- `/401` — password-protected page presentation
- Unknown paths render the 404 page.

## Functionality

- React Router navigation for all listed routes
- Shared navigation, menu overlay, footer and page transitions
- Mobile menu supports Escape to close
- GSAP / ScrollTrigger reveal and image transitions
- Lenis smooth scrolling, with reduced-motion support
- Home-page approach and testimonial sliders
- Expandable FAQ items and tabs
- Pricing billing-period toggle
- Contact and newsletter forms validate input and submit to a configurable JSON endpoint
- Buttons and service/case-study cards navigate to their corresponding pages

## Configure form delivery

The site intentionally does not pretend that a form was submitted when no backend is configured.

1. Copy `.env.example` to `.env.local`.
2. Set `VITE_FORM_ENDPOINT` to your own HTTPS endpoint (for example, a Formspree endpoint).
3. The endpoint must accept a JSON `POST`, allow browser CORS from your deployed domain, and return a 2xx response on success.
4. Rebuild/restart Vite after changing environment variables.

The contact form sends `name`, `email`, `phone`, `address`, `subject`, and `form_type`. Newsletter forms send `email` and `form_type`.

No contact email or form provider was supplied, so no third-party account or destination has been invented.

## Password-protected route

`/401` reproduces the password-protected page presentation. Secure password verification must be configured at the hosting/platform layer. A password embedded in a client-side React bundle would be publicly readable and is deliberately not used.

## Images and fonts

The `src/assets.js` manifest points to the original Zeneth Webflow CDN image assets. The binary image files are **not embedded in this ZIP** because the source CDN could not be downloaded from this environment. An internet connection is therefore required for those images to render.

To self-host the exact original images on a network-enabled machine, run:

```bash
npm run assets:download
```

This downloads every referenced image to `public/assets/` and switches `src/assets.js` to local paths only if every download succeeds. If any download fails, the original CDN manifest remains unchanged.

The original template identifies Merchant and Google Sans as its typefaces. Those licensed font files were not supplied; the project retains its existing DM Sans web fallback. The page also loads DM Sans from Google Fonts.

## Quality checks performed in this environment

- `node scripts/qa.mjs` — project files, declared routes, navigation route exposure, referenced asset keys, form endpoint handling, responsive CSS and reduced-motion checks
- TypeScript JSX parser — syntax validation for the React source files
- PostCSS-compatible CSS parser — stylesheet syntax check
- ZIP archive integrity check

## Checks not claimed as passed

This environment could not resolve `registry.npmjs.org` (`EAI_AGAIN`), so `npm install`, `npm run build`, and a real browser run of the React application could not be completed here. As a result, rendered page screenshots, live CDN image responses, and real endpoint submissions have not been verified. Run the commands above on a network-enabled machine before deploying.

## Project structure

```text
zeneth-homepage/
├── index.html
├── package.json
├── vite.config.js
├── .env.example
├── README.md
├── QA-REPORT.md
├── scripts/
│   ├── qa.mjs
│   └── download-assets.mjs
└── src/
    ├── App.jsx
    ├── assets.js
    ├── data.js
    ├── main.jsx
    └── styles.css
```
