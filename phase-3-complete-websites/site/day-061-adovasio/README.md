# Adovasio — Wedding Photography Website Recreation

A responsive React + Vite multi-page recreation inspired by the public Adovasio website. Includes Home, Portfolio, About and Contact routes, an animated full-screen navigation, editorial portfolio layouts, GSAP/ScrollTrigger reveals, Lenis smooth scrolling and a validated frontend enquiry form.

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

## Notes

- Photography currently loads from Unsplash image CDN URLs; an internet connection is required to display images. The source site could not be downloaded directly in this environment, so original proprietary image files and exact animation timelines are not bundled.
- The enquiry form performs browser-side required-field and email validation and displays a success state. To receive real enquiries, connect it to a backend or form provider.
- Routes are `/`, `/portfolio`, `/about`, and `/contact`.
- Typography uses Google Fonts (Italiana, Playfair Display and DM Sans).

## Updated navigation and motion
- ADOVASIO wordmark and MENU control remain visible in a fixed, high-contrast header on every route.
- Menu includes Home, Portfolio, About, Contact, Instagram, Pinterest and Check Availability.
- Menu links animate on opening; Escape closes the menu.
- GSAP ScrollTrigger continues to animate text and image reveals throughout the multi-page site.
