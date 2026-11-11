
(() => {
  if (!window.Swiper) return;
  const el = document.querySelector('.testimonial-swiper');
  if (!el) return;
  new Swiper(el, {
    slidesPerView: 1,
    spaceBetween: 18,
    speed: 650,
    navigation: {nextEl: '.swiper-next', prevEl: '.swiper-prev'},
    breakpoints: {760: {slidesPerView: 2}, 1100: {slidesPerView: 3}}
  });
})();
