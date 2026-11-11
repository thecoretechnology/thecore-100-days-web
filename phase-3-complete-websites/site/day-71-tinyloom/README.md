# Tinyloom — multi-page static recreation

A responsive, multi-page preschool website recreation built with HTML5, CSS3 and vanilla JavaScript. GSAP + ScrollTrigger power scroll reveals and counters; Swiper powers the parent testimonial carousel.

## Run locally

No build step or package installation is required.

```bash
cd tinyloom-replica
python3 -m http.server 8000
```

Open http://localhost:8000

You can also use VS Code Live Server.

## Pages

- `index.html` — Home
- `about.html` — About and educator profiles
- `fees.html` — Pricing cards, monthly/yearly toggle and FAQ
- `programs.html` — Six learning programs
- `blog.html` — Journal listing and sample article sections
- `contact.html` — Contact details and enquiry form
- `404.html` — Custom not-found page

## Project structure

```text
tinyloom-replica/
├── index.html
├── about.html
├── fees.html
├── programs.html
├── blog.html
├── contact.html
├── 404.html
├── css/
│   ├── style.css
│   ├── responsive.css
│   └── animations.css
├── js/
│   ├── main.js
│   ├── animations.js
│   ├── slider.js
│   └── interactions.js
├── images/       # Reserved for locally supplied photography
├── assets/       # Bundled SVG decorative assets
└── README.md
```

## Design system

- Display/body font: Parkinsans
- Decorative accent: Dancing Script
- Core ink: `#232C24`
- Paper: `#FFFDF9`
- Rose: `#E85D7A`
- Mint: `#E9FFF2`
- Peach: `#FFDFCF`
- Yellow: `#F4F5C7`
- Blue: `#E2F8FF`
- Lavender: `#DADAF0`

The palette and typography follow the prior Tinyloom reference analysis. Layout, copy and photography are recreated as a fresh implementation, not copied Webflow source.

## Libraries

- GSAP 3.15.0 + ScrollTrigger via jsDelivr CDN
- Swiper 11 via jsDelivr CDN
- Google Fonts (Parkinsans and Dancing Script)

An internet connection is required for CDN libraries, Google Fonts and remote Unsplash photography.

## Images and content

Photography uses remote Unsplash image URLs as replaceable editorial placeholders. The `images/` directory is intentionally provided for replacing these with licensed/local Tinyloom reference assets. The bundled `assets/` folder contains original SVG decorative illustrations.

Replace the demo contact details, tuition amounts, testimonials, names and address with approved real information before publishing. The contact form is front-end only and does not transmit data; connect Formspree, Netlify Forms or a backend endpoint to receive enquiries.

## Accessibility and responsiveness

- Semantic landmarks and form labels
- Keyboard-focusable program rows
- Mobile navigation with `aria-expanded`
- Reduced-motion fallback
- Responsive layouts for desktop, tablet and mobile

## Notes

This is a static website project. For production deployment, configure the host's 404 document to use `404.html`, add a real form handler, optimise/download licensed images locally, and test all links and content.


## Multi-page build

Pages: Home, About, Fees, Programs, Blog, Blog article template (`blog-post.html`), Contact and custom 404. Shared inner-page styles live in `css/inner-pages.css` and `css/inner-pages-responsive.css`; interactions live in `js/inner-pages.js`. Fee figures and contact details are demo placeholders and must be confirmed/replaced before launch. The enquiry form validates and shows an on-page demo success message; it does not send or store submissions. Connect a backend or form provider for production enquiries.


## Premium GSAP motion layer

The project now includes a shared `js/premium-animations.js` motion system and `css/premium-animations.css` across all pages. GSAP 3.12.5 and ScrollTrigger are loaded from the jsDelivr CDN before the shared animation script.

Included motion: coordinated hero text/photo entrances, gentle decorative floating, one-time scroll reveals, image clip-path reveals, desktop-only parallax, count-up learning stats, progress-bar fills, subtle pointer-based 3D card tilt, image hover zoom, CTA micro-interactions, navigation underline feedback, a refined Swiper testimonial transition, and a short same-site page transition.

Motion is disabled when `prefers-reduced-motion: reduce` is enabled. Parallax and pointer-based card movement are limited to desktop/fine-pointer devices; mobile layouts keep the content static and readable. The animations use transforms and opacity rather than changing layout dimensions.


## Site functionality layer

`js/site-functionality.js` provides the shared vanilla-JavaScript interactions without changing the established page design: desktop/mobile navigation state, mobile menu dismissal (link, outside click, Escape and breakpoint change), active navigation highlighting, in-page smooth scrolling, one-at-a-time FAQ accordion behaviour, blog category filters, client-side contact form validation and demo confirmation, program-card enrolment shortcuts, testimonial slider fallback controls, and a back-to-top button. `css/site-functionality.css` styles only the controls and accessibility states.

All local page links and fragment targets were audited. Placeholder `href="#"` social links were replaced with non-clickable labels because no official social profile URLs were supplied. Replace those labels with verified profile links when available.
