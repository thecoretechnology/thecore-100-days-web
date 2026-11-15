# Day 076 — Shelf of Books

An immersive, responsive reading shelf inspired by the physical presence of a personal library. The interface recreates a wall-to-wall row of tactile book spines, with collection filters and detailed book cards revealed through hover, focus, or tap.

## Run locally

No installation or build step is required. Open `index.html` directly in a browser, or serve the folder with any static file server.

```bash
python3 -m http.server 8000
```

Then visit:

```text
http://localhost:8000/phase-3-complete-websites/site/day-076-shelf-of-books/
```

## Features

- Full-viewport interactive bookshelf
- Nine filterable reading collections
- Book details on pointer hover, keyboard focus, or touch
- Locally rendered book artwork and texture assets
- Keyboard-accessible controls and reduced-motion support
- Responsive desktop, tablet, and mobile layouts
- Relative paths for nested GitHub Pages deployment

## Project files

- `index.html` — semantic page structure
- `styles.css` — layout, book art, transitions, and responsive styles
- `script.js` — book data, shelf rendering, filters, and interactions
- `assets/` — local favicon and paper texture

## Deployment

The project uses only relative asset paths and can be published directly from the repository on GitHub Pages. No npm packages, frameworks, or external runtime assets are required.
