# Jewelleryz — React + Vite recreation

A responsive multi-page React recreation of the Jewelleryz Webflow reference.

## Requirements

- Node.js 18 or newer
- npm 9 or newer
- Internet access to install npm packages and load the original Webflow-hosted image assets/fonts

## Run locally

The Vite configuration enables React’s automatic JSX runtime. JSX components therefore do not depend on a global `React` variable, preventing the `React is not defined` runtime error seen in classic JSX transform setups.

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

## Asset availability check

```bash
npm run check:assets
```

The site currently references original image assets hosted on the Webflow CDN rather than bundling those image files locally. The asset checker tests whether all referenced image URLs are reachable from your network. A successful asset check requires internet/DNS access to `cdn.prod.website-files.com`.

## Included pages

- Home (`/`)
- About (`/about`)
- Category listings (`/category/rings`, `/category/ear-rings`, `/category/necklace`, `/category/bracelets`)
- Product details (`/product/:id`)
- Contact (`/contact`)
- Blog listing (`/blog`)
- Blog article (`/post/:id`)
- Checkout demo (`/checkout`)

## Features

- Responsive navigation and animated mobile menu
- Hero slider, product carousels, collection tabs and image comparison slider
- Product detail gallery, filtering and sorting
- Cart drawer with quantity controls and localStorage persistence
- Contact and newsletter form validation
- Browser-only demo checkout (no real payment processor or order backend)
- Framer Motion section reveals and page transitions

## Important production notes

- Cart, contact messages, newsletter signups and demo orders are stored in the visitor's browser. They are not synchronized to a server.
- Checkout is a demonstration only. Do not accept real payments with this project until a secure payment provider and backend are integrated.
- The current image assets are remote references; they are not included in the ZIP. For fully offline/self-hosted production, download and license the assets, place them under `public/assets`, and update `src/data/store.js`.
- Run `npm run build` and `npm run check:assets` in an environment with npm registry and Webflow CDN access before deployment.

## Additional pages

The storefront includes these additional information pages:

- `/faq` — frequently asked questions (expandable answers)
- `/shipping-returns` — delivery and return information
- `/jewellery-care` — jewellery care guide
- `/size-guide` — ring, bracelet and necklace sizing tips
- `/privacy` — demonstration privacy information
- `/terms` — demonstration terms and conditions

They are linked from the footer. The information and policies are demonstration copy and should be reviewed before a real commercial launch.

## Browser Back / Forward scroll restoration

Navigation now distinguishes new navigation from browser history navigation. New pages open at the top, hash links scroll to their section, and Back/Forward navigation restores the saved scroll position for that history entry.
