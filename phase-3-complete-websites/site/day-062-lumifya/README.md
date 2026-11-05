# Lumifya Recreation

A React + Vite multi-page recreation of the Lumifya website.

## Pages

- `/` — Home
- `/about` — About
- `/services` — Services
- `/projects` — Projects
- `/projects/:slug` — Project details
- `/blogs` — Blogs (legacy `/journal` redirects here)
- `/contact` — Contact

The navigation uses real client-side routes (not same-page section anchors). Navbar labels are plain text: Home, About, Services, Projects, Blogs and Contact; the numbered prefixes have been removed.

## Run locally

```bash
npm install
npm run dev
```

Vite opens the source application at `/app.html`. The project root also contains
the compiled `index.html` used by GitHub Pages.

## Production build

```bash
npm run build
npm run preview
```

`npm run build` also publishes the compiled bundle to `index.html` and `assets/`
so the Day 62 folder works directly on GitHub Pages without a separate build
workflow.

Images are referenced from the public Lumifya/Webflow CDN and require an internet connection.
