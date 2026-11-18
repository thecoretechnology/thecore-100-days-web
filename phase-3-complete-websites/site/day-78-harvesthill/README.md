# HARVESTHILL — Day 78

A multi-page React + Vite implementation of the Harvesthill Framer reference, with responsive page layouts, route handling, navigation interactions and motion effects.

## Included routes
- `/` — Home
- `/about-us` — About Us
- `/solutions` — Solutions overview
- `/solutions/:slug` — Individual solution details (six solutions)
- `/pricing` — Starter, Growth and Enterprise plans
- `/contact` — Contact enquiry form
- `/our-team`, `/blog`, `/faq`, `/gallery` — Additional information pages
- Unknown paths render a not-found page.

## Stack
- React 18, Vite 6, React Router 6
- Framer Motion
- Lucide React
- CSS Grid, Flexbox and responsive media queries

## Install and run
Requires Node.js 18 or newer.

```bash
npm install
npm run dev
```

Vite prints the local development URL (normally `http://localhost:5173`).

## Production

```bash
npm run build
npm run preview
```

The production output is written to `dist/`.

## Assets
The `public/images/` directory contains locally bundled crops extracted from the three user-provided Harvesthill reference screenshots. The supplied screenshots are used for the homepage hero, sustainability farmer image, Why Choose Us aerial image and four feature thumbnails. This keeps those key reference visuals available offline. The project does not depend on external stock-photo URLs.

## Responsive targets
CSS breakpoints cover desktop (1440px / 1280px), tablet (1024px / 768px), and mobile (430px / 390px / 375px / 360px). Sections are retained and reflowed rather than removed. Mobile navigation includes route-change dismissal, Escape dismissal and body-scroll locking. Pricing cards stack on narrow screens; testimonial controls are touch-friendly.

## Functionality
- Main navigation and All Pages dropdown
- Mobile menu
- Solution detail routes
- Pricing CTA carries selected plan to the contact form
- Contact form client-side validation and visible confirmation state
- Testimonial previous/next controls and pagination dots
- Browser history and scroll-to-top on route changes
- Unknown-route fallback
- Reduced-motion CSS support

## Visual QA notes
The visual implementation is based on the three supplied desktop screenshots. Those screenshots cover the home hero, sustainability panel and Why Choose Us section only. The other page layouts follow the approved project brief and the previously captured page structure; exact pixel comparison for those pages requires corresponding reference screenshots. The contact form is frontend-only and does not transmit data to a server.
