# DAY 86 — ToyStore

A multi-page static recreation of the publicly accessible ToyStore Webflow ecommerce template by Elastic Themes.

## Requirements

- Python 3 (for the local static server)
- Node.js 18+ and npm (for the verification/build check)
- No npm runtime dependencies are required.

## Install and run

```bash
npm install
npm run dev
```

Then open http://localhost:8000.

Alternatively, run `python3 -m http.server 8000` from this folder.

## Build / verification

```bash
npm run build
```

The build command validates the page inventory, product routes, JavaScript syntax and root-relative local links/assets. This is a static HTML/CSS/JavaScript project, so no bundling step is required.

## Pages

- Homepage
- All Toys catalog
- Wooden Toys and Stuffed Animals category pages
- 16 individual product pages
- Delivery
- About
- Contacts
- Style Guide
- Licensing

## Functionality

- Shared responsive header, navigation, cart drawer and footer.
- Product cards generated from one central catalogue (`assets/js/products.js`).
- Individual product pages populated from the product slug.
- Add products to cart with quantity validation (1–99).
- Increase/decrease cart quantities and remove products.
- Live cart count and subtotal.
- Cart persistence in localStorage with invalid stored records discarded safely.
- Empty cart state and cart status messages.
- Accessible mobile menu with expanded state and Escape-to-close cart behavior.
- Contact form browser validation and a local-only success message.
- GSAP/ScrollTrigger section reveals when CDN libraries are available; reduced-motion preferences are respected.

## Known limitations

- This is a front-end demonstration. Checkout does not process payments, and contact form submissions are not sent to a backend.
- All 16 product images, five Instagram tiles, and the promotional collage are bundled locally under `assets/images/`; the site no longer relies on external image-CDN URLs.
- Because the original Webflow CDN could not be reached from the build environment, these are newly generated replacement toy visuals, not the original copyrighted Webflow photographs. Their mapping follows the 16 product names in the catalogue.
- Product descriptions are concise demonstration copy, not verified original long-form descriptions for every SKU.
- The catalog uses the reference's two category pages; no extra search/sort interface has been invented.
- Exact computed CSS/font measurements and a full live-vs-local visual browser comparison remain unverified.
