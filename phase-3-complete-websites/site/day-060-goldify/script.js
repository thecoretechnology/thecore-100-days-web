(() => {
  'use strict';

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const qs = (selector, scope = document) => scope.querySelector(selector);
  const qsa = (selector, scope = document) => scope ? [...scope.querySelectorAll(selector)] : [];

  // Responsive navigation
  const menuButton = qs('.menu-toggle');
  const navLinks = qs('.nav-links');
  const closeMenu = () => {
    navLinks?.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
  };
  menuButton?.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(open));
  });
  qsa('.nav-links a').forEach((link) => link.addEventListener('click', closeMenu));
  document.addEventListener('click', (event) => {
    if (!event.target.closest('.nav-shell')) closeMenu();
  });

  // Reveal only when content enters the viewport.
  const revealItems = qsa('.reveal');
  if (reducedMotion || !('IntersectionObserver' in window)) {
    revealItems.forEach((item) => item.classList.add('visible'));
  } else {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const delay = Number(entry.target.dataset.delay || 0) * 90;
        window.setTimeout(() => entry.target.classList.add('visible'), delay);
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -55px' });
    revealItems.forEach((item) => revealObserver.observe(item));
  }

  // Lightweight perspective tilt; disabled for touch/reduced-motion users.
  if (!reducedMotion && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    qsa('[data-tilt]').forEach((card) => {
      card.addEventListener('pointermove', (event) => {
        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `perspective(900px) rotateX(${-y * 5}deg) rotateY(${x * 7}deg) translateZ(0)`;
      });
      card.addEventListener('pointerleave', () => { card.style.transform = ''; });
    });

    qsa('[data-cursor-light]').forEach((area) => {
      area.addEventListener('pointermove', (event) => {
        const rect = area.getBoundingClientRect();
        area.style.setProperty('--mx', `${((event.clientX - rect.left) / rect.width) * 100}%`);
        area.style.setProperty('--my', `${((event.clientY - rect.top) / rect.height) * 100}%`);
      });
    });
  }

  // Pricing period toggle.
  qsa('[data-billing]').forEach((button) => {
    button.addEventListener('click', () => {
      qsa('[data-billing]').forEach((item) => item.classList.toggle('active', item === button));
      const period = button.dataset.billing;
      qsa('.price b[data-monthly]').forEach((price) => {
        price.animate([{ opacity: 0.25, transform: 'translateY(5px)' }, { opacity: 1, transform: 'none' }], { duration: 280 });
        price.textContent = price.dataset[period];
      });
    });
  });

  // Accessible testimonial carousel.
  const testimonials = qsa('.testimonial');
  const dotsHost = qs('.slider-dots');
  let testimonialIndex = 0;
  const showTestimonial = (index) => {
    testimonialIndex = (index + testimonials.length) % testimonials.length;
    testimonials.forEach((item, itemIndex) => item.classList.toggle('active', itemIndex === testimonialIndex));
    qsa('button', dotsHost).forEach((dot, dotIndex) => {
      dot.classList.toggle('active', dotIndex === testimonialIndex);
      dot.setAttribute('aria-current', dotIndex === testimonialIndex ? 'true' : 'false');
    });
  };
  testimonials.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.setAttribute('aria-label', `Show experience note ${index + 1}`);
    dot.addEventListener('click', () => showTestimonial(index));
    dotsHost?.append(dot);
  });
  qs('.slider-button.prev')?.addEventListener('click', () => showTestimonial(testimonialIndex - 1));
  qs('.slider-button.next')?.addEventListener('click', () => showTestimonial(testimonialIndex + 1));
  if (testimonials.length) showTestimonial(0);

  // Keep just one FAQ answer open at a time.
  qsa('.faq-list details').forEach((detail) => {
    detail.addEventListener('toggle', () => {
      if (!detail.open) return;
      qsa('.faq-list details').forEach((other) => { if (other !== detail) other.open = false; });
    });
  });

  // Honest, frontend-only forms.
  const toast = qs('.toast');
  let toastTimer;
  const showToast = (message) => {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove('show'), 3400);
  };

  const newsletter = qs('.newsletter');
  newsletter?.addEventListener('submit', (event) => {
    event.preventDefault();
    const input = qs('input', newsletter);
    const status = qs('small', newsletter);
    if (!input.validity.valid) {
      status.textContent = 'Enter a valid email address.';
      input.focus();
      return;
    }
    status.textContent = 'Demo only — connect an email service to accept subscriptions.';
    showToast('Email validated. No subscription was sent.');
  });

  qs('.contact-page-form')?.addEventListener('submit', (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const status = qs('.form-status', form);
    if (!form.checkValidity()) {
      status.textContent = 'Please complete the required fields with a valid email address.';
      form.reportValidity();
      return;
    }
    status.textContent = 'Validated successfully. No data was sent because this demonstration has no backend.';
    showToast('Enquiry validated — no data was transmitted.');
  });

  const requestedPlan = new URLSearchParams(window.location.search).get('plan');
  if (requestedPlan) {
    const contactForm = qs('.contact-page-form');
    const planSelect = contactForm ? qs('[name="interest"]', contactForm) : null;
    const matchingOption = planSelect ? qsa('option', planSelect).find((option) => option.value === requestedPlan) : null;
    if (matchingOption && planSelect) planSelect.value = requestedPlan;
  }

  // Back-to-top state.
  const backToTop = qs('.back-to-top');
  const updateScrollUI = () => backToTop?.classList.toggle('visible', window.scrollY > 700);
  window.addEventListener('scroll', updateScrollUI, { passive: true });
  backToTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' }));
  updateScrollUI();

  // Small canvas dust field adds depth without a 3D dependency.
  const canvas = qs('#gold-particles');
  if (canvas && !reducedMotion) {
    const context = canvas.getContext('2d');
    let width = 0;
    let height = 0;
    let frame = 0;
    const particles = Array.from({ length: 58 }, () => ({
      x: Math.random(), y: Math.random(), r: 0.35 + Math.random() * 1.1,
      speed: 0.00005 + Math.random() * 0.00014, drift: (Math.random() - 0.5) * 0.00005,
      alpha: 0.12 + Math.random() * 0.38
    }));
    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };
    const draw = () => {
      context.clearRect(0, 0, width, height);
      particles.forEach((particle) => {
        particle.y -= particle.speed;
        particle.x += particle.drift;
        if (particle.y < -0.02) particle.y = 1.02;
        if (particle.x < -0.02) particle.x = 1.02;
        if (particle.x > 1.02) particle.x = -0.02;
        context.beginPath();
        context.fillStyle = `rgba(241,202,77,${particle.alpha})`;
        context.arc(particle.x * width, particle.y * height, particle.r, 0, Math.PI * 2);
        context.fill();
      });
      frame = window.requestAnimationFrame(draw);
    };
    resize();
    draw();
    window.addEventListener('resize', resize, { passive: true });
    window.addEventListener('pagehide', () => window.cancelAnimationFrame(frame), { once: true });
  }
})();
