# CuteAIStudio — Multi-page React + Vite website

## Pages
- Home (`#/`) — full landing page and all homepage sections
- Agents (`#/agents`) — agent team, live demo and how-it-works
- Pricing (`#/pricing`) — plans, FAQ and waitlist
- Changelog (`#/changelog`) — product update timeline
- About (`#/about`) — studio introduction, process, integrations and testimonials

Navigation uses hash-based routing so it works on static hosting (including GitHub Pages) without server rewrite configuration.

## Run locally
```bash
npm install
npm run dev
```

## Production build
```bash
npm run build
npm run preview
```

The robot illustrations, integration logos and testimonial portraits currently use the reference Framer CDN URLs, so a network connection is required for those images. The live demo and waitlist are front-end demonstrations and do not call an AI or mailing-list backend.
