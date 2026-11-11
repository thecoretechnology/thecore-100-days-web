/* Tinyloom — restrained, responsive GSAP motion system */
(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const gsapReady = !!window.gsap;
  if (!gsapReady || reduceMotion) {
    document.documentElement.classList.add('motion-ready');
    document.querySelectorAll('.reveal, .mask-reveal').forEach(el => el.classList.add('motion-visible'));
    return;
  }

  const gsap = window.gsap;
  if (window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);
  document.documentElement.classList.add('motion-ready');
  gsap.config({ nullTargetWarn: false });

  const mm = gsap.matchMedia();
  const isHome = !!document.querySelector('.hero');
  const hero = document.querySelector('.hero, .inner-hero, .not-found');
  const heroCopy = hero?.querySelector('.hero-copy, .inner-hero-grid > div:first-child, .not-found-copy');
  const heroMedia = hero?.querySelector('.hero-visual, .inner-hero-art, .not-found-art');

  // Page entrance: content stays in normal flow; only transform and opacity animate.
  gsap.fromTo('main', { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: .55, ease: 'power2.out', clearProps: 'opacity,visibility,transform' });

  // Hero text and photography arrive as one coordinated composition.
  if (heroCopy) {
    const textBits = heroCopy.querySelectorAll('.eyebrow, h1, h2, p, .btn, .hero-actions, .hero-proof, .text-link');
    gsap.from(textBits, { y: 22, autoAlpha: 0, duration: .72, stagger: .085, ease: 'power3.out', delay: .08, clearProps: 'all' });
  }
  if (heroMedia) {
    const photos = heroMedia.querySelectorAll('img, .hero-photo, .not-found-art img');
    gsap.from(photos, { y: 24, scale: .96, autoAlpha: 0, duration: .95, stagger: .11, ease: 'power3.out', delay: .16, clearProps: 'all' });
  }

  // Small decorative details drift gently, never competing with the content.
  mm.add('(min-width: 761px)', () => {
    const floaters = gsap.utils.toArray('.hero-sticker, .lost-sticker, .cta-flower, .cta-star, .hero-doodle, .art-sun, .art-spark, .art-flower, .art-heart');
    floaters.forEach((el, i) => gsap.to(el, { y: i % 2 ? -7 : 8, rotation: i % 2 ? 4 : -4, duration: 3.8 + i * .35, repeat: -1, yoyo: true, ease: 'sine.inOut' }));
    gsap.to('.hero-sun, .footer-sun', { rotation: 360, duration: 48, repeat: -1, ease: 'none' });
    gsap.to('.hero-photo-left', { y: -9, duration: 4.5, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    gsap.to('.hero-photo-right', { y: 8, duration: 5.2, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    gsap.to('.cta-orbit', { scale: 1.08, duration: 5.5, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    return () => gsap.killTweensOf('.hero-sticker, .lost-sticker, .cta-flower, .cta-star, .hero-doodle, .art-sun, .art-spark, .art-flower, .art-heart, .hero-sun, .footer-sun, .hero-photo-left, .hero-photo-right, .cta-orbit');
  });

  if (window.ScrollTrigger) {
    // Scroll reveals: use one reveal per meaningful block to avoid over-animating paragraphs.
    const revealTargets = gsap.utils.toArray('.reveal, .section-heading, .split-story > div, .belief-grid article, .team-grid article, .price-card, .program-card, .activity-grid article, .journal-card, .detail-card, .faq-list details, .program-note, .footer-cta-inner');
    revealTargets.forEach((el, i) => {
      if (el.closest('.hero, .inner-hero, .not-found')) return;
      gsap.fromTo(el, { y: 24, autoAlpha: 0 }, {
        y: 0, autoAlpha: 1, duration: .72, ease: 'power2.out', delay: (i % 3) * .035,
        clearProps: 'transform,opacity,visibility',
        scrollTrigger: { trigger: el, start: 'top 88%', once: true, fastScrollEnd: true }
      });
    });

    // Image mask reveals are applied to the image itself, not the layout wrapper.
    gsap.utils.toArray('.learning-photo img, .choose-photo img, .journey-image img, .activity-photo img, .program-image img, .split-photo img, .blog-image img').forEach(img => {
      gsap.fromTo(img, { clipPath: 'inset(0 0 100% 0 round 18px)' }, {
        clipPath: 'inset(0 0 0% 0 round 18px)', duration: 1.05, ease: 'power3.inOut', clearProps: 'clipPath',
        scrollTrigger: { trigger: img, start: 'top 88%', once: true }
      });
    });

    // Gentle parallax is limited to large visual elements and disabled on touch-sized layouts.
    mm.add('(min-width: 900px)', () => {
      gsap.utils.toArray('.learning-photo, .choose-photo, .inner-hero-art, .not-found-art').forEach(el => {
        gsap.to(el, { yPercent: -5, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: .7 } });
      });
    });

    // Count-up stats preserve their suffixes and original final values.
    gsap.utils.toArray('.learning-stats strong, [data-count]').forEach(el => {
      if (el.dataset.counted === 'true') return;
      const raw = el.dataset.count || el.textContent.trim();
      const match = raw.match(/^([\d,.]+)(.*)$/);
      if (!match) return;
      const target = Number(match[1].replace(/,/g, ''));
      if (!Number.isFinite(target)) return;
      const suffix = match[2];
      const counter = { value: 0 };
      el.dataset.counted = 'true';
      gsap.to(counter, { value: target, duration: 1.65, ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 90%', once: true },
        onUpdate: () => { el.textContent = `${Math.round(counter.value)}${suffix}`; },
        onComplete: () => { el.textContent = `${match[1]}${suffix}`; }
      });
    });

    // Animate progress fills from zero while keeping their track dimensions fixed.
    gsap.utils.toArray('.progress-track i').forEach(bar => {
      const targetWidth = bar.style.width || getComputedStyle(bar).width;
      gsap.fromTo(bar, { scaleX: 0, transformOrigin: 'left center' }, {
        scaleX: 1, duration: 1.15, ease: 'power2.out',
        scrollTrigger: { trigger: bar, start: 'top 90%', once: true }
      });
    });
  }

  // Tactile hover: small lift, subtle tilt, and image zoom; no JS pointer loop.
  mm.add('(hover: hover) and (pointer: fine)', () => {
    const cards = gsap.utils.toArray('.value-card, .journey-card, .testimonial-card, .belief-grid article, .price-card, .program-card, .journal-card, .team-grid article, .activity-grid article');
    cards.forEach(card => {
      const image = card.querySelector('img');
      const enter = () => gsap.to(card, { y: -5, duration: .28, ease: 'power2.out', transformPerspective: 900 });
      const move = event => {
        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - .5;
        const y = (event.clientY - rect.top) / rect.height - .5;
        gsap.to(card, { rotateY: x * 2.2, rotateX: y * -2.2, duration: .3, ease: 'power2.out', overwrite: true });
      };
      const leave = () => gsap.to(card, { y: 0, rotateX: 0, rotateY: 0, duration: .38, ease: 'power2.out' });
      card.addEventListener('mouseenter', enter);
      card.addEventListener('mousemove', move);
      card.addEventListener('mouseleave', leave);
      card.addEventListener('focusin', enter);
      card.addEventListener('focusout', leave);
      if (image) {
        card.addEventListener('mouseenter', () => gsap.to(image, { scale: 1.045, duration: .55, ease: 'power2.out' }));
        card.addEventListener('mouseleave', () => gsap.to(image, { scale: 1, duration: .55, ease: 'power2.out' }));
      }
    });

    gsap.utils.toArray('.value-art, .cta-decoration, .hero-doodle').forEach(art => {
      art.addEventListener('mouseenter', () => gsap.to(art, { rotation: '+=8', scale: 1.06, duration: .3, ease: 'back.out(1.7)' }));
      art.addEventListener('mouseleave', () => gsap.to(art, { rotation: 0, scale: 1, duration: .4, ease: 'power2.out' }));
    });

    gsap.utils.toArray('.btn').forEach(btn => {
      const arrow = btn.querySelector('span');
      btn.addEventListener('mouseenter', () => {
        gsap.to(btn, { y: -2, duration: .22, ease: 'power2.out' });
        if (arrow) gsap.to(arrow, { x: 3, duration: .22, ease: 'power2.out' });
      });
      btn.addEventListener('mouseleave', () => {
        gsap.to(btn, { y: 0, duration: .28, ease: 'power2.out' });
        if (arrow) gsap.to(arrow, { x: 0, duration: .28, ease: 'power2.out' });
      });
    });
  });

  // Nav underline uses a lightweight CSS pseudo-element; focus gets the same treatment.
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('mouseenter', () => link.classList.add('nav-hovered'));
    link.addEventListener('mouseleave', () => link.classList.remove('nav-hovered'));
  });

  // Testimonial slider: let Swiper handle motion; add a restrained content fade per change.
  const slider = document.querySelector('.testimonial-swiper');
  if (slider) slider.addEventListener('transitionend', event => {
    if (!event.target.classList.contains('swiper-wrapper')) return;
    gsap.fromTo(slider.querySelectorAll('.swiper-slide-active, .swiper-slide-next'), { autoAlpha: .78, y: 5 }, { autoAlpha: 1, y: 0, duration: .32, stagger: .04, overwrite: true });
  });

  // Soft page-to-page transition. Same-page anchors, downloads and external links remain native.
  const overlay = document.createElement('div');
  overlay.className = 'page-transition';
  overlay.setAttribute('aria-hidden', 'true');
  document.body.appendChild(overlay);
  gsap.set(overlay, { scaleY: 0, transformOrigin: 'bottom' });
  document.addEventListener('click', event => {
    const link = event.target.closest('a[href]');
    if (!link || event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const href = link.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || link.target === '_blank' || link.hasAttribute('download')) return;
    const url = new URL(href, location.href);
    if (url.origin !== location.origin || (url.pathname === location.pathname && url.hash)) return;
    if (!/\.html?$/.test(url.pathname) && url.pathname !== location.pathname) return;
    event.preventDefault();
    gsap.to(overlay, { scaleY: 1, transformOrigin: 'bottom', duration: .34, ease: 'power3.inOut', onComplete: () => { location.href = url.href; } });
  });

  // Clean up scroll measurements after fonts and images settle to prevent late layout jumps.
  window.addEventListener('load', () => { if (window.ScrollTrigger) ScrollTrigger.refresh(); }, { once: true });
})();
