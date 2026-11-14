# DAY 72 — Law Firm Website

A multi-page React + Vite law firm website using the original dark charcoal, champagne-gold and ivory design language. Built with GSAP/ScrollTrigger and Lucide icons.

## Pages

- `/` — Full homepage with hero, awards, firm introduction, lawyers, practice areas, case studies, testimonials, articles and consultation form.
- `/about` — Firm introduction, awards and values.
- `/lawyers` — Attorney directory.
- `/lawyers/steve-edwards`, `/lawyers/john-smith`, `/lawyers/mary-johnson` — Attorney profile pages.
- `/practice-areas` — Practice area directory.
- `/practice-areas/business-law`, `/practice-areas/healthcare-law`, `/practice-areas/corporate-law`, `/practice-areas/family-law`, `/practice-areas/real-estate-law`, `/practice-areas/criminal-defense` — Service detail pages.
- `/case-studies` — Case study directory.
- `/case-studies/lawsuit-to-resolution`, `/case-studies/corporate-compliance` — Case study detail pages.
- `/blog` — Legal insights and articles.
- `/blog/estate-planning-for-small-business-owners`, `/blog/importance-of-having-a-will` — Article detail pages.
- `/contact` — Consultation form and contact details.
- `/terms`, `/privacy` — Informational pages.

The shared header, animated navigation, cart drawer and footer are retained across all local pages. Detail dialogs remain available where they were part of the homepage interactions.

## Requirements

- Node.js 18+ (Node 20 LTS recommended)
- npm 9+

## Install and run

```bash
npm install
npm run dev
```

Vite prints the local development URL, usually `http://localhost:5173`.

## Production build

```bash
npm run build
npm run preview
```

## Notes

- All website images and font files used by this build are bundled under `public/assets`.
- Contact form validation is client-side and opens a prefilled email through the visitor's email application. A server endpoint is required for direct message storage/delivery.
- The cart drawer starts empty, matching the reference template's initial cart state.
- If npm reports `vite: command not found`, run `rm -rf node_modules package-lock.json && npm install` from this project directory while connected to the npm registry, then run `npm run dev`.
