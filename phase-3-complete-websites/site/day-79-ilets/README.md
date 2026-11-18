# IELTS Institute — Updated Website

A five-page responsive IELTS Institute website built with HTML5, CSS3 and Vanilla JavaScript.

## Pages
- `index.html` — Homepage
- `courses.html` — IELTS courses
- `about.html` — Institute story and trainers
- `results.html` — Student score profiles and testimonials
- `contact.html` — Contact details and enquiry form

## Project structure
```text
ielts-institute/
├── index.html
├── courses.html
├── about.html
├── results.html
├── contact.html
├── css/
│   └── style.css
├── js/
│   └── main.js
├── assets/
│   ├── images/
│   │   └── image-fallback.svg
│   └── icons/
└── README.md
```

## Run locally
1. Extract the ZIP archive.
2. Open the extracted `ielts-institute` folder.
3. Double-click `index.html` to open the website in a browser.

For a local static server, run this command from the project folder:
```bash
python3 -m http.server 8000
```
Then open `http://localhost:8000`.

## Image repair
The homepage About collage had an unavailable Unsplash image URL. It has been replaced with the classroom image URL already visible in the supplied browser screenshot. A local SVG fallback is also wired into the shared JavaScript so a failed external image does not leave a broken-image icon or empty image box.

## Included functionality
- Shared responsive navigation across all pages
- Animated mobile menu and active-page navigation
- Page transitions and scroll reveal animations
- Image reveal and hover zoom effects
- Animated statistics counters
- Testimonial carousel controls on the homepage
- Accessible video-intro modal placeholder
- Contact form client-side validation
- Back-to-top control
- Reduced-motion support
- Lazy loading and async decoding for content images

## Before publishing
- Replace sample phone, email, address and social links with real institute details.
- Update the Google Maps embed to the institute's real location.
- The contact form validates in the browser but needs a form provider/backend to deliver messages.
- Add the institute's actual video to the video modal.
- Student results and testimonials are illustrative and must be replaced with verified outcomes.
- Main photography and Google Fonts use external providers; an internet connection is required for those assets. The new local fallback prevents broken-image icons if an external photo fails.
