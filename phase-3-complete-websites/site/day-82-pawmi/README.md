# Pawmi — Final audited static website replica

A 13-page Pawmi-inspired website built with **HTML5, CSS3 and vanilla JavaScript**. No framework, package install, or build step is required.

## Run locally

From this folder, run:

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000>.

## Pages

- `index.html` — Home
- `about.html` — About
- `services.html` — Services
- `service-details.html` — Service details
- `products.html` — Products
- `product-details.html` — Product details
- `team.html` — Team
- `pricing.html` — Pricing
- `blog.html` — Blog
- `blog-details.html` — Blog details
- `appointment.html` — Appointment
- `contact.html` — Contact and FAQ
- `404.html` — Not found

## Project structure

```text
pawmi-replica/
├── index.html
├── about.html
├── services.html
├── service-details.html
├── products.html
├── product-details.html
├── team.html
├── pricing.html
├── blog.html
├── blog-details.html
├── appointment.html
├── contact.html
├── 404.html
├── css/
│   ├── style.css
│   └── responsive.css
├── js/
│   ├── data.js
│   └── main.js
├── assets/
│   └── images/
│       └── image-fallback.svg
├── QA_REPORT.md
└── README.md
```

## Functionality

- Shared header/footer and local navigation between all 13 pages
- Responsive mobile navigation, dropdown, click-outside close and Escape-key close
- FAQ accordion on the Contact page
- Monthly/yearly pricing selector
- Testimonial previous/next controls
- Appointment and contact form validation with clear demo feedback
- Newsletter form validation and demo feedback
- Scroll reveal, hover transitions, smooth scrolling and reduced-motion support
- Lazy loading and async decoding for non-hero images; hero media is prioritized
- Local SVG fallback if a remote photo fails to load

## Assets and service notes

The original Framer/Unsplash photographs and Nunito font are referenced from their hosted URLs, so an internet connection is required for the intended photography and web font. The project includes a local SVG fallback for failed image requests. The photographs are not bundled as local originals.

Appointment, contact and newsletter forms currently validate in the browser and display preview feedback. They do **not** transmit or store submissions. Connect a backend or form service before using this site for real bookings or messages.

## QA status

See [QA_REPORT.md](QA_REPORT.md) for the checks performed, viewport sizes, interaction tests and remaining release limitations. The site is a carefully refined static reconstruction, not the original Framer source and not a certified pixel-diff clone.
