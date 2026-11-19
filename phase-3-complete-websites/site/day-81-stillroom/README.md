# Stillroom website recreation
Pure HTML5, CSS3 and vanilla JavaScript. No frameworks and no build step.

## Run
Extract the ZIP, open Terminal in the extracted `stillroom-replica` folder (the folder containing `index.html`), then run:
`python3 -m http.server 3000`
Open `http://127.0.0.1:3000/`.

**Important:** start the server from the folder containing `index.html`, not its parent folder. The ZIP is arranged with `index.html` at its root so practitioner links resolve correctly.

## Pages
- index.html — homepage
- therapy.html — five service detail sections
- practitioners.html — filters and matching helper
- practitioners/*.html — eight profile pages
- fees.html — fees and monthly cost calculator
- the-house.html — house, rooms and directions
- book.html — three-step booking interface
- privacy.html, terms.html, 404.html

## Functionality
Responsive navigation, scroll reveals, FAQ accordion, breathing timer, practitioner filtering/matching, pricing calculator and multi-step booking UI.

## Demo limitations
No backend is included. Booking and newsletter forms do not send or store data. The booking form is a visual/frontend demonstration only; do not enter sensitive information.

## Assets
Where direct public original Framer CDN image URLs were identifiable, they are referenced in the pages and data. Photography now uses individually mapped, verified image assets from the original Stillroom Framer CDN, including distinct room, garden, therapy, lifestyle and practitioner portraits. Image downloads to the local project were attempted but the execution environment did not permit reliable remote file transfer, so the source images remain remotely hosted. Playfair Display and DM Sans are loaded from Google Fonts.


## Visual enhancement pass
- Replaced uncertain/placeholder image references with image assets verified against the live reference.
- Assigned distinct reference portraits to all eight practitioner profiles.
- Added lazy image decoding/loading, hero image priority, image reveal, scroll reveal, gentle image hover zoom, subtle desktop hero parallax, sticky-header state and animated mobile navigation.
- Added reduced-motion handling and avoided animation libraries.
- Preserved the existing page structure, palette and editorial layout.


## Updated replica pass
- Rebuilt the homepage opening as a full-viewport image hero matching the supplied reference screenshots: oversized “breathe” wordmark, bottom-left headline and booking CTA, and right-aligned location copy.
- Added the full-screen one-minute breathing overlay opened from the hero play control, with four-second inhale / six-second exhale pacing and Escape/Stop close controls.
- Flattened the ZIP so `index.html` is at the extraction root. This fixes the common blank/404 local page caused by launching the server one directory above the website.


## Landing page adjustment
- Removed the breathing-exercise popup/modal and its play control from the homepage. The hero image, headline, booking call-to-action, and location text remain.
