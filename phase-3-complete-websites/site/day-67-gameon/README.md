# GAMEON — Day 67

A neon-inspired gaming showcase with four browser-playable arcade games.

## Requirements

- Node.js 20.19+ (or a compatible newer LTS release)
- npm

## Run locally

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

## Included games

- Neon Rift — arena shooter with collectible energy shards
- Void Runner — three-lane endless runner
- Pixel War — brick-breaker arcade game
- Shadow Protocol — stealth collection challenge

Personal-best scores are stored locally in the browser. The project uses React, React Router, Vite, and GSAP.

## Recent maintenance

- GSAP page animations now check for matching elements before animating, preventing missing-target warnings on routes without those elements.
- Animation tweens are cleaned up when navigating between routes.
- Added a project favicon and linked it from `index.html`.
- The source archive intentionally excludes `node_modules`; run `npm install` after extracting.
