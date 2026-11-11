/* Tinyloom site functionality — accessible vanilla JavaScript, no framework. */
(() => {
  'use strict';

  const ready = (callback) => {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', callback, { once: true });
    else callback();
  };

  ready(() => {
    const header = document.querySelector('.site-header');
    const menuButton = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.main-nav');
    const mobileQuery = window.matchMedia('(max-width: 900px)');

    // Navigation: one source of truth for desktop/mobile active states and menu state.
    const currentFile = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
    document.querySelectorAll('.main-nav .nav-link').forEach((link) => {
      const href = (link.getAttribute('href') || '').split('#')[0].toLowerCase();
      const isCurrent = href === currentFile || (currentFile === 'blog-post.html' && href === 'blog.html');
      link.classList.toggle('is-active', isCurrent);
      if (isCurrent) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });

    const setMenu = (open) => {
      if (!menuButton || !nav) return;
      const shouldOpen = Boolean(open && mobileQuery.matches);
      nav.classList.toggle('is-open', shouldOpen);
      nav.setAttribute('aria-hidden', String(!shouldOpen && mobileQuery.matches));
      if ('inert' in nav) nav.inert = !shouldOpen && mobileQuery.matches;
      menuButton.setAttribute('aria-expanded', String(shouldOpen));
      menuButton.setAttribute('aria-label', shouldOpen ? 'Close navigation' : 'Open navigation');
      document.body.classList.toggle('menu-open', shouldOpen);
    };

    if (menuButton && nav) {
      menuButton.addEventListener('click', () => setMenu(menuButton.getAttribute('aria-expanded') !== 'true'));
      nav.querySelectorAll('a[href]').forEach((link) => link.addEventListener('click', () => setMenu(false)));
      document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
          setMenu(false);
          menuButton.focus();
        }
      });
      document.addEventListener('click', (event) => {
        if (menuButton.getAttribute('aria-expanded') !== 'true') return;
        if (!nav.contains(event.target) && !menuButton.contains(event.target)) setMenu(false);
      });
      const onBreakpointChange = () => {
        setMenu(false);
        nav.removeAttribute('aria-hidden');
        if ('inert' in nav) nav.inert = false;
      };
      if (mobileQuery.matches) { nav.setAttribute('aria-hidden', 'true'); if ('inert' in nav) nav.inert = true; }
      if (mobileQuery.addEventListener) mobileQuery.addEventListener('change', onBreakpointChange);
      else mobileQuery.addListener(onBreakpointChange);
    }

    // Smooth in-page navigation, with reduced-motion support and sticky-header offset.
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
      const hash = link.getAttribute('href');
      if (!hash || hash === '#') return;
      const target = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (!target) return;
      link.addEventListener('click', (event) => {
        event.preventDefault();
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const top = target.getBoundingClientRect().top + window.scrollY - (header?.offsetHeight || 0) - 10;
        window.scrollTo({ top, behavior: reduced ? 'auto' : 'smooth' });
        history.replaceState(null, '', hash);
        setMenu(false);
      });
    });

    // Blog category filters; hidden cards are removed from both layout and keyboard navigation.
    const filterButtons = [...document.querySelectorAll('.filter-btn[data-filter]')];
    const journalCards = [...document.querySelectorAll('.journal-card[data-category]')];
    const emptyMessage = document.querySelector('.empty-filter');
    if (filterButtons.length && journalCards.length) {
      const applyFilter = (filter) => {
        let visible = 0;
        journalCards.forEach((card) => {
          const show = filter === 'all' || card.dataset.category === filter;
          card.hidden = !show;
          if (show) visible += 1;
        });
        filterButtons.forEach((button) => {
          const active = button.dataset.filter === filter;
          button.classList.toggle('active', active);
          button.setAttribute('aria-pressed', String(active));
        });
        if (emptyMessage) emptyMessage.hidden = visible > 0;
      };
      filterButtons.forEach((button) => button.addEventListener('click', () => applyFilter(button.dataset.filter)));
      applyFilter(document.querySelector('.filter-btn.active')?.dataset.filter || 'all');
    }

    // FAQ accordion: native <details> semantics, with one answer open at a time.
    const faqItems = [...document.querySelectorAll('.faq-list details')];
    faqItems.forEach((item) => item.addEventListener('toggle', () => {
      if (item.open) faqItems.forEach((other) => { if (other !== item) other.open = false; });
    }));

    // Contact form: client-side demo only. No message is sent or stored remotely.
    const form = document.getElementById('enquiryForm');
    if (form) {
      const feedback = document.getElementById('formFeedback');
      form.setAttribute('novalidate', '');
      form.addEventListener('submit', (event) => {
        event.preventDefault();
        if (!form.checkValidity()) {
          form.classList.add('was-validated');
          const firstInvalid = form.querySelector(':invalid');
          firstInvalid?.focus();
          firstInvalid?.reportValidity();
          if (feedback) {
            feedback.textContent = 'Please complete the required fields and enter a valid email address.';
            feedback.classList.remove('form-success');
            feedback.classList.add('form-error');
          }
          return;
        }
        if (feedback) {
          feedback.textContent = 'Thank you! Your enquiry has been submitted in this demo. No email has been sent and no information has been stored.';
          feedback.classList.remove('form-error');
          feedback.classList.add('form-success');
        }
        form.reset();
        form.classList.remove('was-validated');
        feedback?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'nearest' });
      });
      form.querySelectorAll('input, select, textarea').forEach((field) => {
        field.addEventListener('input', () => {
          if (feedback?.classList.contains('form-error')) {
            feedback.textContent = '';
            feedback.classList.remove('form-error');
          }
        });
      });
    }

    // Testimonial navigation: Swiper when available; a native horizontal fallback otherwise.
    const slider = document.querySelector('.testimonial-swiper');
    const previous = document.querySelector('.swiper-prev');
    const next = document.querySelector('.swiper-next');
    if (slider && previous && next) {
      const swiper = slider.swiper || null;
      if (!swiper) {
        slider.classList.add('is-native-slider');
        const wrapper = slider.querySelector('.swiper-wrapper');
        const slides = [...slider.querySelectorAll('.swiper-slide')];
        const updateControls = () => {
          if (!wrapper) return;
          const end = wrapper.scrollWidth - wrapper.clientWidth - 2;
          previous.disabled = wrapper.scrollLeft <= 2;
          next.disabled = wrapper.scrollLeft >= end;
        };
        const move = (direction) => {
          if (!wrapper || !slides.length) return;
          const first = slides[0];
          const distance = first.getBoundingClientRect().width + 18;
          wrapper.scrollBy({ left: direction * distance, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
        };
        previous.addEventListener('click', () => move(-1));
        next.addEventListener('click', () => move(1));
        wrapper?.addEventListener('scroll', updateControls, { passive: true });
        window.addEventListener('resize', updateControls);
        updateControls();
      }
    }

    // Program cards act as clear enrolment shortcuts and remain keyboard accessible.
    document.querySelectorAll('.program-card').forEach((card) => {
      card.setAttribute('tabindex', '0');
      card.setAttribute('role', 'link');
      card.setAttribute('aria-label', `${card.querySelector('h3')?.textContent.trim() || 'Program'} — enquire about enrolment`);
      const goToEnrolment = () => { location.href = 'contact.html#enroll'; };
      card.addEventListener('click', (event) => {
        if (event.target.closest('a, button, input, select, textarea')) return;
        goToEnrolment();
      });
      card.addEventListener('keydown', (event) => {
        if (event.target !== card || !['Enter', ' '].includes(event.key)) return;
        event.preventDefault();
        goToEnrolment();
      });
    });

    // Back-to-top control is created only when needed and uses the site's existing button styles.
    const backToTop = document.createElement('button');
    backToTop.type = 'button';
    backToTop.className = 'back-to-top';
    backToTop.setAttribute('aria-label', 'Back to top');
    backToTop.title = 'Back to top';
    backToTop.innerHTML = '<span aria-hidden="true">↑</span>';
    document.body.appendChild(backToTop);
    const updateBackToTop = () => backToTop.classList.toggle('is-visible', window.scrollY > 520);
    window.addEventListener('scroll', updateBackToTop, { passive: true });
    updateBackToTop();
    backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' }));

    // Keep focus visible for keyboard users on interactive content cards.
    document.querySelectorAll('.program-card, .filter-btn, .menu-toggle, .swiper-prev, .swiper-next').forEach((el) => {
      el.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && el.classList.contains('program-card')) el.blur();
      });
    });
  });
})();
