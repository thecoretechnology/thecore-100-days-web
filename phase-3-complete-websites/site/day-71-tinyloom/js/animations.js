
(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!window.gsap || reduced) {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible'));
    return;
  }
  if (window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);
  gsap.from('.hero-copy .eyebrow, .hero-copy h1, .hero-copy>p, .hero-actions, .hero-proof', {
    y: 28, opacity: 0, duration: .8, stagger: .12, ease: 'power2.out', delay: .12
  });
  gsap.from('.hero-photo', {scale: .94, opacity: 0, rotate: 5, duration: 1.1, ease: 'power3.out', delay: .2});
  gsap.to('.hero-sticker', {y: -12, rotation: -7, duration: 2.4, yoyo: true, repeat: -1, ease: 'sine.inOut'});
  gsap.to('.footer-sun', {rotation: 360, duration: 35, repeat: -1, ease: 'none'});
  if (window.ScrollTrigger) {
    gsap.utils.toArray('.reveal').forEach((el) => {
      gsap.fromTo(el, {y: 32, opacity: 0}, {
        y: 0, opacity: 1, duration: .8, ease: 'power2.out',
        scrollTrigger: {trigger: el, start: 'top 86%', once: true}
      });
    });
    gsap.utils.toArray('[data-count]').forEach(el => {
      const target = Number(el.dataset.count);
      const counter = {value: 0};
      gsap.to(counter, {value: target, duration: 2, ease: 'power1.out',
        scrollTrigger: {trigger: el, start: 'top 85%', once: true},
        onUpdate: () => el.textContent = Math.round(counter.value)
      });
    });
    gsap.utils.toArray('.journey-step').forEach((el,i) => {
      gsap.from(el, {x: 25, opacity: 0, duration: .65, delay: i*.06,
        scrollTrigger: {trigger: el, start: 'top 88%', once: true}});
    });
  } else {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible'));
  }
})();
