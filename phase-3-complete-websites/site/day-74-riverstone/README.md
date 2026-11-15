# DAY 73 — RIVERSTONE

A responsive four-page country music artist website inspired by the Wix **Country Album Landing Page (Earthy)** reference. The implementation preserves the dusty-pink, dark chocolate-brown and warm-cream palette, Western display typography, oversized editorial layouts, horse-and-vinyl artwork and vintage Western ornaments.

## Pages
- `index.html` — cinematic artist homepage, introduction, rotating vinyl, accessible SIDE A / SIDE B tracklist, featured single and promotional finale.
- `album.html` — album cover story, large vinyl record, interactive track sides, featured single and streaming search links.
- `tour.html` — Western event-list layout, five demo tour dates, live countdowns, expandable event details and Ticketmaster search links.
- `contact.html` — artist introduction, booking enquiry form, management information, social links and newsletter signup.

## Run locally
From this folder, run:

```bash
python3 -m http.server 8000
```

Open http://localhost:8000. No npm install is required.

## Technology and assets
- HTML5, CSS3 and vanilla JavaScript
- GSAP 3.12.5 and ScrollTrigger loaded from CDN when internet is available
- Original locally stored WebP photography in `assets/images/`
- Local SVG Western ornaments and illustrations
- Responsive styles in `css/responsive.css`
- Reduced-motion support and progressive reveal fallbacks

## Functionality
- Shared navigation, active-page indication, mobile menu and Escape-to-close support
- Homepage and album SIDE A / SIDE B tabs with keyboard navigation and ARIA state
- CSS vinyl rotation with reduced-motion handling
- Expandable tour details with accessible hidden/inert state
- Timezone-aware event countdowns
- Ticketmaster search links for demo tour listings
- Spotify, Apple Music and YouTube Music search links for RIVERSTONE / Golden Hour Drifter
- Contact and newsletter email validation with clear status messages

## Publishing notes
- The five tour listings are illustrative demo events, not confirmed real-world bookings. Ticket buttons open Ticketmaster searches and do not claim that inventory is available. Replace the demo dates and links with confirmed event/ticket URLs before publishing.
- Streaming buttons open platform search results. Replace these with the artist's official release URLs when available. Social links currently open platform destinations until official artist profile URLs are supplied.
- Contact and newsletter forms validate in the browser and display confirmation/status messages. They do not transmit or store submissions; connect a form endpoint and newsletter provider before launch.
- GSAP and Google Fonts are remote CDN resources. The site retains content visibility and system-font fallbacks if those services are unavailable.
