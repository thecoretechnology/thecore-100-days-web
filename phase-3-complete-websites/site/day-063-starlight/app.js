(() => {
  const menuButton = document.querySelector('[data-menu-toggle]');
  const menu = document.querySelector('[data-mobile-menu]');
  const closeMenu = () => {
    menu?.classList.remove('open');
    document.body.classList.remove('menu-open');
    menuButton?.setAttribute('aria-expanded', 'false');
  };
  menuButton?.addEventListener('click', () => {
    const open = !menu?.classList.contains('open');
    menu?.classList.toggle('open', open);
    document.body.classList.toggle('menu-open', open);
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  });
  menu?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeMenu(); });

  const progress = document.querySelector('[data-progress]');
  const updateProgress = () => {
    const available = document.documentElement.scrollHeight - innerHeight;
    if (progress) progress.style.width = `${available > 0 ? (scrollY / available) * 100 : 0}%`;
  };
  addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();

  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const reveals = document.querySelectorAll('.reveal');
  if (reducedMotion || !('IntersectionObserver' in window)) {
    reveals.forEach((item) => item.classList.add('is-visible'));
  } else {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: .12, rootMargin: '0px 0px -35px' });
    reveals.forEach((item) => observer.observe(item));
  }

  if (!reducedMotion) {
    const parallaxItems = [...document.querySelectorAll('.parallax')];
    let ticking = false;
    const moveParallax = () => {
      parallaxItems.forEach((item, index) => {
        const rect = item.getBoundingClientRect();
        const shift = (rect.top + rect.height / 2 - innerHeight / 2) * (index % 2 ? -.025 : .025);
        item.style.translate = `0 ${shift}px`;
      });
      ticking = false;
    };
    addEventListener('scroll', () => {
      if (!ticking) { requestAnimationFrame(moveParallax); ticking = true; }
    }, { passive: true });
  }

  document.querySelectorAll('[data-newsletter]').forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const email = form.querySelector('input[type="email"]');
      const status = form.querySelector('.form-status');
      if (!email?.checkValidity()) {
        if (status) status.textContent = 'Enter a valid email address.';
        email?.focus();
        return;
      }
      if (status) status.textContent = 'Your address is valid. Connect a newsletter service to complete signup.';
    });
  });

  document.querySelector('[data-contact-form]')?.addEventListener('submit', (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const status = form.querySelector('.form-status');
    if (!form.checkValidity()) {
      form.reportValidity();
      if (status) status.textContent = 'Please complete each required field.';
      return;
    }
    if (status) status.textContent = 'Your enquiry is ready. Connect a secure form endpoint to send it.';
  });

  const lightbox = document.querySelector('[data-lightbox]');
  const lightboxImage = lightbox?.querySelector('img');
  document.querySelectorAll('[data-gallery-item]').forEach((item) => {
    item.addEventListener('click', () => {
      if (!lightbox || !lightboxImage) return;
      lightboxImage.src = item.dataset.src;
      lightbox.showModal();
    });
  });
  lightbox?.querySelector('[data-lightbox-close]')?.addEventListener('click', () => lightbox.close());
  lightbox?.addEventListener('click', (event) => { if (event.target === lightbox) lightbox.close(); });
})();
