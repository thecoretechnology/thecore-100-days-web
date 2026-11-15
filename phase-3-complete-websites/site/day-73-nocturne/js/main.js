(() => {
  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  const closeMenu = () => {
    if (!mobileMenu || !toggle) return;
    mobileMenu.classList.remove('open');
    mobileMenu.setAttribute('aria-hidden', 'true');
    mobileMenu.setAttribute('inert', '');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open navigation');
    document.body.classList.remove('menu-open');
  };
  if (toggle && mobileMenu) {
    toggle.addEventListener('click', () => {
      const open = !mobileMenu.classList.contains('open');
      mobileMenu.classList.toggle('open', open);
      mobileMenu.setAttribute('aria-hidden', String(!open));
      if (open) mobileMenu.removeAttribute('inert'); else mobileMenu.setAttribute('inert', '');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
      document.body.classList.toggle('menu-open', open);
    });
    mobileMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
  }

  const newsletter = document.getElementById('newsletterForm');
  if (newsletter) newsletter.addEventListener('submit', event => {
    event.preventDefault();
    const email = document.getElementById('email');
    const message = newsletter.querySelector('.form-message');
    if (!email || !email.checkValidity()) { email?.reportValidity(); return; }
    try { localStorage.setItem('nocturne-newsletter-email', email.value.trim()); } catch (_) {}
    message.textContent = 'You’re on the list. First invitations arrive before the next full moon.';
    email.value = '';
  });

  const bookingForm = document.getElementById('bookingForm');
  if (bookingForm) bookingForm.addEventListener('submit', event => {
    event.preventDefault();
    if (!bookingForm.reportValidity()) return;
    const data = new FormData(bookingForm);
    const subject = encodeURIComponent(`Nocturne enquiry — ${data.get('enquiry')}`);
    const body = encodeURIComponent([
      `Enquiry: ${data.get('enquiry')}`,
      `Name: ${data.get('name')}`,
      `Email: ${data.get('email')}`,
      `Date: ${data.get('date') || 'Flexible'}`,
      `Guests: ${data.get('guests')}`,
      `Message: ${data.get('message') || '—'}`
    ].join('\n'));
    document.getElementById('bookingStatus').textContent = 'Your email app is opening with the enquiry details. Please send the prepared message to complete your request.';
    window.location.href = `mailto:hello@nocturne.bar?subject=${subject}&body=${body}`;
  });

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hasGSAP = typeof window.gsap !== 'undefined' && typeof window.ScrollTrigger !== 'undefined';

  if (!reducedMotion && hasGSAP) {
    gsap.registerPlugin(ScrollTrigger);
    gsap.config({ nullTargetWarn: false });

    // A deliberately layered entrance: navigation stays calm while the image
    // and monumental type arrive as two separate visual planes.
    const intro = gsap.timeline({ defaults: { ease: 'power3.out' } });
    intro
      .from('.brand, .desktop-nav a, .reserve-pill', {
        y: -12, autoAlpha: 0, duration: .85, stagger: .055, clearProps: 'transform'
      }, 0)
      .from('.coordinates span', { y: 10, autoAlpha: 0, duration: .65, stagger: .12 }, .18)
      .from('.arch-frame', {
        y: 34, scale: .9, autoAlpha: 0, duration: 1.15,
        transformOrigin: '50% 50%', ease: 'power4.out'
      }, .22)
      .from('.hero-wordmark', {
        y: 18, scale: .97, autoAlpha: 0, duration: 1.25, ease: 'power4.out'
      }, .34)
      .from('.hero-tagline', { y: 16, autoAlpha: 0, duration: .8 }, .92)
      .from('.hero-bottom span, .hero-bottom a', {
        y: 8, autoAlpha: 0, duration: .55, stagger: .07
      }, .9);

    // The signature NOCTURNE transition. The hero is pinned while the image
    // grows from its small arch into a tall, dominant portal and the two halves
    // of the wordmark travel beyond opposite viewport edges.
    const desktopMotion = gsap.matchMedia();
    desktopMotion.add('(min-width: 761px)', () => {
      const motion = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: '.hero', start: 'top top', end: '+=155%',
          scrub: .8, pin: true, anticipatePin: 1, invalidateOnRefresh: true
        }
      });
      motion
        .to('.word-left', { x: () => `-${Math.max(42, window.innerWidth * .43)}px` }, 0)
        .to('.word-right', { x: () => `${Math.max(42, window.innerWidth * .43)}px` }, 0)
        .to('.arch-frame', {
          width: 'min(34vw, 520px)', height: '80vh', maxHeight: 'none',
          minHeight: 0, y: '-7vh', borderRadius: '50% 50% 0 0',
          scale: 1.015, ease: 'power1.inOut'
        }, 0)
        .to('.arch-frame img', { scale: 1.12, yPercent: -2 }, 0)
        .to('.hero-tagline', { y: 34, autoAlpha: 0, duration: .3 }, 0)
        .to('.coordinates, .hero-bottom', { autoAlpha: 0, duration: .2 }, 0)
        .to('.hero-glow', { scale: 1.35, autoAlpha: .8 }, 0);
      return () => motion.scrollTrigger && motion.scrollTrigger.kill();
    });

    // Smaller screens keep the composition intact and use a shorter, lighter
    // transform rather than pinning a narrow viewport for a long distance.
    desktopMotion.add('(max-width: 760px)', () => {
      gsap.fromTo('.arch-frame', { scale: .96 }, {
        scale: 1.035, ease: 'none', scrollTrigger: {
          trigger: '.hero', start: 'top top', end: 'bottom top', scrub: .7
        }
      });
      gsap.to('.hero-wordmark', {
        x: -18, ease: 'none', scrollTrigger: {
          trigger: '.hero', start: 'top top', end: 'bottom top', scrub: .7
        }
      });
    });

    // Atmospheric image drift and restrained reveals across the editorial pages.
    gsap.utils.toArray('.house-images figure img, .room-gallery figure img').forEach(img => {
      gsap.fromTo(img, { yPercent: -3 }, {
        yPercent: 3, ease: 'none', scrollTrigger: {
          trigger: img.closest('figure'), start: 'top bottom', end: 'bottom top', scrub: .65
        }
      });
    });
    gsap.utils.toArray('.section-kicker, .house-grid, .house-images figure, .section-heading, .cocktail-card, .room-heading, .stats-row, .room-gallery figure, .event-row, .quote-section blockquote, .private-grid, .contact-layout, .contact-details').forEach(el => {
      gsap.from(el, {
        y: 28, autoAlpha: 0, duration: .85, ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 88%', once: true }
      });
    });
  } else if (!reducedMotion) {
    // CDN/network failure must never leave content hidden or break the page.
    document.documentElement.classList.add('motion-fallback');
  }
  if (header) window.addEventListener('scroll', () => header.classList.toggle('scrolled', window.scrollY > 60), { passive: true });
})();
