# Good Taste — local website recreation

A responsive, static recreation of the Good Taste editorial website using only HTML5, CSS3, and vanilla JavaScript.

## Pages

- `index.html` — homepage / The Appetite Issue landing page. This is the default page when the project is opened or hosted.
- `stories.html` — searchable and filterable Stories archive.

## Run locally

You can open `index.html` directly in a modern browser. For a local server, run this command from the project directory:

```bash
python3 -m http.server 8000
```

Then visit http://localhost:8000.

## Project structure

```text
project/
├── index.html
├── stories.html
├── styles.css
├── script.js
├── assets/
│   ├── images/
│   └── fonts/
└── README.md
```

## Notes

- The homepage is the default landing page and matches the supplied homepage screenshot: issue metadata, oversized Good Taste masthead, Appetite Issue strapline, and two featured editorial images.
- The Stories navigation item opens the local `stories.html` archive.
- The color theme toggle and mobile navigation are powered by `script.js`.
- Google Fonts are loaded remotely when an internet connection is available; system fallbacks are provided.
- The featured homepage photographs and three archive fallback images are included locally in `assets/images/`.
- Some article, subscription, and About destinations link to the original reference website because their full page content is outside this local two-page recreation.
