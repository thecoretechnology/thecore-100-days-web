# Handsel Studio — React/Vite recreation

A multi-page, responsive React recreation of the Handsel craft-studio reference. The original homepage component is retained, with independent route templates for classes, disciplines, schedule, studio experiences, editorial content and legal information.

## Requirements

- Node.js 18.18+ (Node.js 20 LTS recommended)
- npm 9+

## Install and run

```bash
npm install
npm run dev
```

Vite prints the local development URL (normally `http://localhost:5173`).

## Production build

```bash
npm run build
npm run preview
```

The production output is written to `dist/`.

## Routes

| Page | URL |
|---|---|
| Home | `/` |
| All Classes | `/classes` |
| Ceramics | `/classes/ceramics` |
| Printmaking | `/classes/printmaking` |
| Textiles | `/classes/textiles` |
| Jewellery | `/classes/jewellery` |
| Class details | `/class/:slug` |
| Legacy class detail aliases | `/classes/:slug` |
| Class Schedule | `/schedule` |
| Open Studio | `/open-studio` |
| Membership | `/membership` |
| Private Groups | `/private-groups` |
| Gift Cards | `/gift-cards` |
| About the Studio | `/about` |
| Our Team | `/team` |
| Journal | `/journal` |
| Journal articles | `/journal/:slug` |
| Contact / Visit | `/visit` |
| FAQ | `/faq` |
| Privacy Policy | `/privacy` |
| Terms & Conditions | `/terms` |

Discipline aliases under `/disciplines/:slug` are also supported for existing links. Unknown paths display a branded not-found page.

## Project structure

```text
src/
  components/  Shared navigation, footer, UI, galleries and scroll behavior
  data/        Class, discipline, schedule, tutor and journal content
  pages/       Homepage and reusable secondary-page route template
  App.jsx      React Router route table and shared layout
  main.jsx     React entry point and global stylesheet
public/images/ Local photography and craft imagery
```

## Notes and production limitations

- This is a visual and interaction-focused recreation, not the original Framer source project.
- Local images are supplied in `public/images`. The exact original font files were not provided; typography uses the included CSS/font loading strategy and may require a licensed local font to achieve a closer match.
- Forms currently validate locally and display confirmation feedback. They do not send email, store submissions, issue gift cards or process payments.
- Class dates, pricing, tutors, reviews and editorial copy are sample content and must be checked against the real studio before launch.
- Live booking availability, payment processing, newsletter delivery, analytics and backend persistence require service integrations.
- Privacy and terms copy is a starter template and should be reviewed by qualified counsel before publication.
- Use a static-hosting rewrite/fallback to `index.html` for direct deep-link refreshes when deploying the SPA.

## Release QA record

### Static checks performed

Run `npm run qa:static` to verify the declared application routes, local relative imports, referenced image assets, class-detail data coverage, schedule references and required dependencies. The static audit passed in the release workspace: 21 route declarations (including aliases), 12 classes, 16 schedule dates, 7 journal stories, 4 tutors and 8 referenced local images.

The homepage stylesheet received a small-screen overflow safeguard and the desktop header's Browse Classes CTA was restored to visibility to match the supplied reference screenshot. Home discipline links now use the canonical `/classes/:discipline` routes, and the homepage next-class card opens the corresponding class detail route. Unused imports and an unused image helper were removed.

### Build and browser verification limitation

`npm install --no-audit --no-fund` was attempted but could not reach `registry.npmjs.org` because DNS resolution failed (`EAI_AGAIN`). An offline install also confirmed that the required packages are not present in the local npm cache. Consequently `npm run build` could not run (`vite: not found`), and a real React browser session and the five requested viewport tests could not be completed in this environment. Do not treat this archive as production-build-verified until the install and build steps succeed on a machine with registry access.

The source audit does not replace browser QA. See [RELEASE-QA.md](./RELEASE-QA.md) for the complete verification record and remaining limitations. Before production release, run the installation/build commands, open all listed routes directly, and inspect the layouts at 1440px, 1280px, 768px, 390px and 360px.

## Photography and image assets

The visual asset set has been refreshed with distinct, photorealistic craft scenes for ceramics, printmaking, textiles, jewellery and the shared studio. Class cards, discipline panels, tutor craft imagery, journal cards and galleries use separate subject-specific images rather than recycling one thumbnail throughout the site. Class detail and journal article pages also use a different secondary image from their hero image.

The new craft/studio photographs are AI-generated photorealistic stand-ins created for this replica; they are not represented as documentary photographs of the actual Handsel studio or its named tutors. Replace them with approved original studio photography if/when those assets become available.
