# AUREVÉ — Interior Design Studio

A responsive, multi-page editorial website for AUREVÉ, an interior design studio.

## Pages
- `index.html` — Home
- `about.html` — Studio story, philosophy and process
- `services.html` — Six design services
- `projects.html` — Portfolio overview
- `project-detail.html` — Featured project case study
- `journal.html` — Editorial article listing
- `article.html` — Individual journal article
- `contact.html` — Enquiry form and contact details

## Run locally
No build step or package installation is required.

1. Unzip the project.
2. Open the project folder.
3. Double-click `index.html`, or serve the folder with a local server:

   ```bash
   python3 -m http.server 8000
   ```

4. Visit `http://localhost:8000`.

## Assets and fonts
The website uses Google Fonts (Italiana and DM Sans) and photography hosted by Unsplash. An internet connection is required for those remote assets to load. Replace image URLs in the HTML with your own licensed photography when preparing the production site.

## Contact form
The contact form includes required-field and email validation plus on-page submission feedback. It is front-end only and does not send or store enquiries. Connect it to your preferred form backend or email service before launch.

## Customization
- Global styling: `assets/styles.css`
- Navigation, footer, reveal animations, counters and form feedback: `assets/script.js`
- Page content: the individual HTML files

## Notes
Project names, locations, statistics and studio contact details are sample brand content for the AUREVÉ concept and should be reviewed before publishing.


## Homepage update
The homepage hero has been updated with an Eliras-inspired full-screen composition: darkened interior image, AUREVÉ headline, entrance animation, animated project/client counters, and a floating featured-project card. The other pages and shared navigation remain in place. Replace the Unsplash image URLs in `index.html` if you have licensed project photography to use. The reference is recreated in the same visual direction; it is not a copy of Webflow's proprietary source code or assets.

## Animation enhancement
The shared motion layer adds editorial rise reveals, clipped image reveals, staggered navigation and content entrances, refined link/button micro-interactions, subtle desktop image drift, portfolio hover movement, and progressive page transitions where supported by the browser. It uses CSS, Intersection Observer, requestAnimationFrame, and the browser's View Transitions API where available; no animation dependency or build step is required. Motion is reduced or removed when `prefers-reduced-motion` is enabled, and the effects adapt for smaller screens. The reference site was reviewed for its full-bleed hero, staged content, image-led sections, and restrained premium motion direction; AUREVÉ's existing visual identity and content remain intact.
