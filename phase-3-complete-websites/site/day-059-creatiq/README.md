# Creatiq — Premium Creative Agency Website

A responsive multi-page React + Vite creative agency website using the Crimson Red / Midnight Black design system.

## Run locally

Requirements: Node.js 18+ and npm.

```bash
npm install
npm run dev
```

Create a production build with:

```bash
npm run build
npm run preview
```

## Pages

- `/` — Home
- `/about` — Studio story, values and team
- `/services` — Seven service disciplines
- `/work` — Filterable project gallery
- `/work/nova`, `/work/maison`, `/work/form`, `/work/sonora`, `/work/noise` — Reusable project case studies
- `/process` — Seven-step agency workflow
- `/contact` — Validated enquiry form

## Design system

- Crimson Red: `#DC143C`
- Midnight Black: `#080808`
- Deep Charcoal: `#151515`
- White: `#FFFFFF`
- Muted Gray: `#A1A1A1`

## Notes

- Built with React, Vite, Framer Motion and Lucide icons.
- Contact form validates input and opens the visitor's configured email app with a prefilled message; connect a form service/backend for server-side submission.
- Project artwork is created with CSS and HTML shapes, so no external image assets are required.
- Animations respect `prefers-reduced-motion`.
