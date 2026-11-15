# NOCTURNE — Day 73

A responsive, multi-page NOCTURNE cocktail bar and nightlife website. Built with HTML, CSS and vanilla JavaScript. GSAP + ScrollTrigger power the cinematic home hero and scroll reveals as progressive enhancements.

## Run locally

From this directory:

```bash
python3 -m http.server 8000
```

Open <http://localhost:8000>.

## GitHub Pages deployment

This project is framework-free and does not require a build step. `index.html` is at the repository root and all local assets use relative paths.

1. Push the complete `day-73-nocturne` directory to a GitHub repository.
2. Open **Settings → Pages**.
3. Choose **GitHub Actions** as the deployment source.
4. The included `.github/workflows/pages.yml` publishes the repository root.

The page does not depend on JavaScript modules or a bundler. If GSAP or Google Fonts cannot load, the content remains visible and navigable; the hero still renders without the scroll animation. Reduced-motion preferences are respected.

## Features

- Cinematic hero with oversized split wordmark, arched cocktail image and burgundy lighting.
- Pinned GSAP/ScrollTrigger transition that separates the wordmark while expanding the central image.
- House introduction, signature cocktail menu, room story, event programme, press quote, private hire and contact/reservation sections.
- Dedicated pages: `food.html` (20 food dishes across four sections), `menu.html` (six signature cocktails), `about.html`, `gallery.html`, `experience.html`, `nights.html`, `private-hire.html` and `contact.html`.
- Expanded global navigation with direct links to Food, Cocktails, The Room, Nights, Our Story, Gallery, Private Hire and Contact.
- Food menu includes small plates, sharing dishes, mains and desserts, with prices, descriptions, category jump links and reservation calls to action.
- New editorial Story and Gallery pages extend the venue experience without changing the original NOCTURNE visual identity.
- Food photography is loaded from Unsplash image URLs; the original bar, room and cocktail photography remains bundled locally.
- Six individual cocktail detail pages in `drink/`, each with its own locally stored cocktail photograph.
- All gallery, menu, lounge, club and private-hire image panels use bundled local WebP assets; there are no hotlinked photo dependencies.
- Responsive navigation and mobile menu with Escape-to-close support.
- Reservation enquiry form that validates details and prepares an email to `hello@nocturne.bar`.
- Newsletter interaction with local browser confirmation (not connected to a mailing-list provider).
- Local AVIF hero image with WebP fallback.

## Assets and fidelity notes

`assets/images/nocturne-hero.avif` and `nocturne-hero.webp` are genuine conversions of the generated cocktail photograph. They are actual AVIF/WebP files, not renamed PNGs. The supplied screenshots guide the hero layout and scroll transformation. The reference site's exact proprietary photography and backend booking/newsletter services are not bundled; the local image is an original visual substitute and enquiry submission opens the visitor's email client.

## Browser support

Modern evergreen browsers. GSAP and Google Fonts are loaded from CDNs as optional enhancements; local HTML/CSS/JS and images are the essential runtime.

## Image assets

The hero still is a locally generated 2:3 cinematic martini photograph (single olive, dark green curtain, stone tabletop). It is stored as genuine AVIF and WebP encodings at 480px, 720px and 900px widths. The hero `<picture>` uses AVIF first, WebP fallback, responsive `srcset`/`sizes`, explicit intrinsic dimensions, eager loading and high fetch priority.

The site includes a set of original, locally bundled editorial photographs for the bar interior, listening lounge, cocktails, martini and club room. Each visible image has descriptive alternative text. The CSS gradients remain as graceful background colors beneath the images, not as substitutes for missing photos.

## Production build and deployment verification

The repository is named `day-73-nocturne`, so GitHub Pages serves it below `/day-73-nocturne/`. This is a framework-free static site: use **relative** references (`css/...`, `js/...`, `assets/...`, and `../` from `drink/`) rather than root-absolute paths. Relative references automatically resolve beneath the repository subpath; no hard-coded hostname or build-time URL rewrite is required.

```bash
npm run build
npm run test:deploy
```

`npm run build` creates `dist/` and copies only the deployable site files, including `.nojekyll`. `npm run test:deploy` checks every generated HTML page for missing local `href` and `src` targets, plus every image source and descriptive alt attribute. The GitHub Actions workflow builds and audits the site, then publishes **`dist/`** with the official Pages artifact/deploy actions. In GitHub, set **Settings → Pages → Build and deployment → Source: GitHub Actions**.

The production artifact was served under `/day-73-nocturne/` and its discovered local HTML/CSS/JS/image/navigation requests returned HTTP success. JavaScript syntax was checked with Node. A real browser automation runtime was not available in this environment, so interactive visual behavior and browser-console runtime errors are not claimed as browser-verified.
