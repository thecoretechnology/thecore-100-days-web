(() => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce || !window.gsap) return;
  document.documentElement.classList.add('js-motion');
  if (window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);

  gsap.from('.hero-copy .eyebrow, .hero-copy h1, .hero-copy>p, .hero-actions, .hero-proof', {
    y: 30, opacity: 0, duration: .85, stagger: .12, ease: 'power3.out', delay: .12
  });
  gsap.from('.hero-photo-main', {scale: .9, opacity: 0, rotate: 3, duration: 1.1, ease: 'power3.out', delay: .18});
  gsap.from('.hero-photo-left,.hero-photo-right', {y: 35, opacity: 0, duration: .9, stagger: .12, ease: 'power3.out', delay: .35});
  gsap.to('.hero-sticker', {y: -10, rotation: 13, duration: 2.4, repeat: -1, yoyo: true, ease: 'sine.inOut'});
  gsap.to('.hero-sun', {rotation: 360, duration: 32, repeat: -1, ease: 'none'});
  gsap.utils.toArray('.reveal').forEach((el) => gsap.to(el, {
    y: 0, opacity: 1, duration: .8, ease: 'power2.out',
    scrollTrigger: {trigger: el, start: 'top 88%', once: true}
  }));
  gsap.utils.toArray('.progress-track i').forEach((bar) => {
    const width = bar.style.width; bar.style.width = '0%';
    gsap.to(bar, {width, duration: 1.2, ease: 'power2.out', scrollTrigger: {trigger: bar, start: 'top 90%', once: true}});
  });
  gsap.to('.cta-orbit', {scale: 1.12, duration: 5, repeat: -1, yoyo: true, ease: 'sine.inOut'});
})();
