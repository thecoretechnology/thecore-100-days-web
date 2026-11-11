# NOIRÉA — The Art of Fragrance

A six-page luxury fragrance brand showcase inspired by the supplied editorial reference. This is a brand storytelling website, not an ecommerce store.

## Pages
- `index.html` — Home
- `story.html` — Our Story
- `fragrance.html` — Fragrance collection showcase
- `philosophy.html` — Brand philosophy
- `journal.html` — Editorial journal
- `contact.html` — Contact

## Run locally
Open `index.html` in a modern browser, or run a local static server from this directory:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Features
- Shared responsive navigation and footer
- Six dedicated pages
- Editorial serif/sans-serif typography
- Ivory, champagne and burgundy palette
- Scroll reveal and image hover motion
- Search overlay that links to site pages
- Fragrance and journal detail dialogs
- Contact form validation with an email-client handoff

## Notes
- Typography is loaded from Google Fonts.
- Photography is loaded from curated Unsplash image URLs and therefore requires an internet connection.
- The contact form validates the fields and opens the visitor's configured email application. To receive submissions directly on a server, connect it to a form backend and replace the `mailto` handoff in `script.js`.
- Replace `bonjour@noirea.example` with the brand's real contact address before launch.
- This project intentionally contains no cart, checkout, pricing or payment functionality.


## Motion upgrade
- Cinematic NOIRÉA wordmark intro on page load
- GSAP + ScrollTrigger progressive enhancement (CDN-loaded)
- Hero image mask reveal and word-by-word headline entrance
- Scroll-triggered fade/blur reveals, staggered cards and image masks
- Restrained editorial parallax
- Desktop-only 3D image tilt and subtle magnetic CTAs
- Decorative slow drifting rose petals on hero/editorial hero
- Internal page transition curtain
- Animated modal and contact feedback
- `prefers-reduced-motion` support and CSS/IntersectionObserver fallbacks

GSAP is loaded from Cloudflare CDN. If the CDN is unavailable, the site retains a lightweight CSS/IntersectionObserver fallback.


## Visual campaign refresh
The site now uses a cohesive set of locally bundled NOIRÉA campaign image assets:
- Amber-glass fragrance and ivory marble hero still life
- Classical sculpture and sunlit architectural details
- Deep burgundy rose macro photography
- Editorial beauty portrait for the Journal
- Floral architecture and contact-page imagery

Images are locally served, WebP-optimized, graded consistently, and use responsive object-fit framing. Non-hero imagery loads lazily; the homepage hero is prioritized. No remote stock-image dependency remains in the page image tags or contact background.
