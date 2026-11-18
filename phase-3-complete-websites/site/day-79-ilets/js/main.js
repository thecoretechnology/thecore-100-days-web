(() => {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const header = document.querySelector(".site-header");
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".primary-nav");
  const backToTop = document.querySelector(".back-to-top");

  // Header state and back-to-top visibility share one passive scroll listener.
  let scrollTicking = false;
  const updateScrollUI = () => {
    if (scrollTicking) return;
    scrollTicking = true;
    requestAnimationFrame(() => {
      const y = window.scrollY || document.documentElement.scrollTop;
      header?.classList.toggle("is-scrolled", y > 24);
      backToTop?.classList.toggle("visible", y > 500);
      scrollTicking = false;
    });
  };
  window.addEventListener("scroll", updateScrollUI, { passive: true });
  updateScrollUI();

  // Animated, accessible mobile navigation.
  const closeMenu = (returnFocus = false) => {
    if (!nav || !menuToggle) return;
    nav.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
    if (returnFocus) menuToggle.focus();
  };
  menuToggle?.addEventListener("click", () => {
    const opening = menuToggle.getAttribute("aria-expanded") !== "true";
    menuToggle.setAttribute("aria-expanded", String(opening));
    menuToggle.setAttribute("aria-label", opening ? "Close navigation" : "Open navigation");
    nav?.classList.toggle("is-open", opening);
  });
  nav?.querySelectorAll("a").forEach(link => link.addEventListener("click", () => closeMenu()));
  document.addEventListener("pointerdown", event => {
    if (nav?.classList.contains("is-open") && !nav.contains(event.target) && !menuToggle?.contains(event.target)) closeMenu();
  });

  // Page-to-page fade transition. Hash links and external destinations remain native.
  if (!reduceMotion) {
    document.querySelectorAll('a[href]').forEach(link => {
      link.addEventListener("click", event => {
        if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        if (link.target || link.hasAttribute("download")) return;
        const destination = new URL(link.href, window.location.href);
        if (destination.origin !== window.location.origin || destination.pathname === window.location.pathname && destination.hash) return;
        if (!/\.html?$/.test(destination.pathname) && destination.pathname !== window.location.pathname) return;
        event.preventDefault();
        document.body.classList.add("page-leaving");
        window.setTimeout(() => { window.location.href = destination.href; }, 220);
      });
    });
    window.addEventListener("pageshow", () => document.body.classList.remove("page-leaving"));
  }

  // Resilient image handling: keep the layout polished if an external photo is unavailable.
  // The main classroom collage image was corrected to a source already confirmed visible
  // in the supplied browser screenshot; this local SVG is a final safety net.
  document.querySelectorAll("img").forEach(img => {
    img.addEventListener("error", () => {
      if (img.dataset.fallbackApplied === "true") return;
      img.dataset.fallbackApplied = "true";
      img.src = "assets/images/image-fallback.svg";
      img.classList.add("image-fallback-active");
    }, { once: true });
  });

  // Scroll reveals and image reveals use one observer to minimize overhead.
  const revealItems = document.querySelectorAll(".reveal");
  const imageItems = document.querySelectorAll("img:not(.hero-student)");
  imageItems.forEach(img => img.closest("figure, .detail-course-card, .course-image, .story-image, .trainer-card, .results-quote, .hero-city")?.classList.add("image-reveal"));
  if ("IntersectionObserver" in window && !reduceMotion) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add(entry.target.matches("img") ? "is-image-visible" : "is-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -36px 0px" });
    revealItems.forEach(item => revealObserver.observe(item));
    document.querySelectorAll(".image-reveal").forEach(item => revealObserver.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add("is-visible"));
    document.querySelectorAll(".image-reveal").forEach(item => item.classList.add("is-image-visible"));
  }

  // Animate statistics once when they enter the viewport.
  const counters = document.querySelectorAll("[data-count]");
  const animateCounter = element => {
    const target = Number(element.dataset.count);
    if (!Number.isFinite(target)) return;
    const suffix = element.dataset.suffix || "";
    const duration = reduceMotion ? 0 : 1350;
    const start = performance.now();
    const tick = now => {
      const progress = duration === 0 ? 1 : Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      element.textContent = `${Math.round(target * eased)}${suffix}`;
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  if ("IntersectionObserver" in window && !reduceMotion) {
    const counterObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.55 });
    counters.forEach(counter => counterObserver.observe(counter));
  } else counters.forEach(animateCounter);

  // Lightweight testimonial carousel with correct bounds at every breakpoint.
  const track = document.querySelector(".testimonial-track");
  const cards = Array.from(document.querySelectorAll(".testimonial-card"));
  const dots = Array.from(document.querySelectorAll(".slider-dot"));
  let slideIndex = 0;
  const visibleCards = () => window.matchMedia("(max-width: 760px)").matches ? 1 : 2;
  const maxIndex = () => Math.max(0, cards.length - visibleCards());
  const goToSlide = index => {
    if (!track || !cards.length) return;
    slideIndex = Math.max(0, Math.min(index, maxIndex()));
    const width = cards[0].getBoundingClientRect().width;
    const gap = parseFloat(getComputedStyle(track).gap) || 0;
    track.style.transform = `translate3d(-${slideIndex * (width + gap)}px,0,0)`;
    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === slideIndex);
      dot.setAttribute("aria-current", i === slideIndex ? "true" : "false");
    });
  };
  document.querySelector("[data-testimonial-prev]")?.addEventListener("click", () => goToSlide(slideIndex - 1));
  document.querySelector("[data-testimonial-next]")?.addEventListener("click", () => goToSlide(slideIndex >= maxIndex() ? 0 : slideIndex + 1));
  dots.forEach((dot, index) => dot.addEventListener("click", () => goToSlide(index)));
  let resizeTimer;
  window.addEventListener("resize", () => {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(() => goToSlide(slideIndex), 100);
  }, { passive: true });
  goToSlide(0);

  // Accessible video modal. The existing modal content is retained as the intro placeholder.
  const modal = document.querySelector("[data-video-modal]");
  const openVideo = document.querySelector("[data-open-video]");
  const closeVideoButtons = document.querySelectorAll("[data-close-video]");
  let previousFocus = null;
  const showModal = () => {
    if (!modal) return;
    previousFocus = document.activeElement;
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    modal.querySelector(".modal-close")?.focus();
  };
  const hideModal = () => {
    if (!modal) return;
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    previousFocus?.focus();
  };
  openVideo?.addEventListener("click", showModal);
  closeVideoButtons.forEach(button => button.addEventListener("click", hideModal));
  modal?.addEventListener("click", event => { if (event.target === modal) hideModal(); });
  document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      closeMenu();
      if (modal?.classList.contains("open")) hideModal();
    }
  });

  // Contact form: client-side validation only; no submission is claimed without a backend.
  const form = document.querySelector("[data-contact-form]");
  if (form) {
    const status = form.querySelector(".form-status");
    const fields = Array.from(form.querySelectorAll("input, select, textarea"));
    const validateField = field => {
      const error = field.parentElement.querySelector(".field-error");
      let message = "";
      if (field.validity.valueMissing) message = "Please complete this field.";
      else if (field.validity.typeMismatch) message = "Please enter a valid email address.";
      else if (field.validity.tooShort) message = `Please enter at least ${field.minLength} characters.`;
      else if (field.validity.patternMismatch) message = "Please enter a valid phone number.";
      field.setAttribute("aria-invalid", String(Boolean(message)));
      if (error) error.textContent = message;
      return !message;
    };
    fields.forEach(field => {
      field.addEventListener("blur", () => validateField(field));
      field.addEventListener("input", () => {
        if (field.hasAttribute("aria-invalid")) validateField(field);
        if (status) status.textContent = "";
      });
      field.addEventListener("change", () => validateField(field));
    });
    form.addEventListener("submit", event => {
      event.preventDefault();
      const valid = fields.map(validateField).every(Boolean);
      if (!valid) {
        status.textContent = "Please review the highlighted fields and try again.";
        form.querySelector('[aria-invalid="true"]')?.focus();
        return;
      }
      status.textContent = "Your details are valid. This demo form is not connected to an inbox yet; connect a form service to receive enquiries.";
    });
  }

  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();
