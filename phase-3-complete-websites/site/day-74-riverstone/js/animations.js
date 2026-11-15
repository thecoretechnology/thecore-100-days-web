document.addEventListener('DOMContentLoaded',()=>{
  if(!document.body.classList.contains('home-page'))return;
  const revealAll=()=>{
    document.querySelectorAll('.reveal,.hero-reveal').forEach(el=>{el.style.opacity='1';el.style.transform='none';});
    document.querySelectorAll('.rs-single-photo img,.rs-hero-image img').forEach(el=>{el.style.clipPath='inset(0 0 0 0)';});
  };
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches || !window.gsap || !window.ScrollTrigger){revealAll();return;}
  document.body.classList.add('motion-ready');
  gsap.registerPlugin(ScrollTrigger);
  const hero=gsap.timeline({defaults:{ease:'power4.out'}});
  hero.from('.rs-hero-hat',{y:-35,rotation:-18,opacity:0,duration:1})
    .from('.rs-hero-kicker',{y:24,opacity:0,duration:.65},'-=.45')
    .from('.rs-wordmark',{yPercent:55,opacity:0,clipPath:'inset(0 0 100% 0)',duration:1.15},'-=.35')
    .from('.rs-hero-line,.rs-hero-cta,.rs-stream-links',{y:22,opacity:0,stagger:.12,duration:.7},'-=.55');
  gsap.from('.rs-hero-image img',{scale:1.15,duration:2.1,ease:'power2.out'});
  gsap.utils.toArray('.reveal').forEach(el=>{
    gsap.fromTo(el,{y:42,opacity:0},{y:0,opacity:1,duration:1,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 86%',once:true}});
  });
  gsap.utils.toArray('.rs-single-photo,.rs-intro-mark').forEach(el=>{
    const image=el.querySelector('img');
    if(image)gsap.fromTo(image,{clipPath:'inset(0 0 100% 0)'},{clipPath:'inset(0 0 0% 0)',duration:1.2,ease:'power3.inOut',scrollTrigger:{trigger:el,start:'top 82%',once:true}});
  });
  const heroImage=document.querySelector('.rs-hero-image img');
  if(heroImage)gsap.to(heroImage,{yPercent:12,ease:'none',scrollTrigger:{trigger:'.rs-hero',start:'top top',end:'bottom top',scrub:true}});
  gsap.from('.rs-promo-ornament',{rotation:100,scale:.4,opacity:0,duration:1.2,ease:'back.out(1.8)',scrollTrigger:{trigger:'.rs-promo',start:'top 75%',once:true}});
});

// Album and tour page motion system
document.addEventListener('DOMContentLoaded',()=>{
  const safeReveal=()=>document.querySelectorAll('.album-page .reveal,.tour-page-rs .reveal').forEach(el=>{el.style.opacity='1';el.style.transform='none';});
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches || !window.gsap || !window.ScrollTrigger){safeReveal();return;}
  document.body.classList.add('motion-ready');
  gsap.registerPlugin(ScrollTrigger);
  if(document.body.classList.contains('album-page')){
    const intro=gsap.timeline({defaults:{ease:'power4.out'}});
    intro.from('.album-hat',{y:-25,rotation:-18,opacity:0,duration:.8}).from('.album-masthead-content .rs-eyebrow,.album-wordmark,.album-masthead-line,.album-outline-link',{y:28,opacity:0,stagger:.12,duration:.75},'-=.35');
    const heroImg=document.querySelector('.album-masthead-image img');if(heroImg)gsap.to(heroImg,{yPercent:12,ease:'none',scrollTrigger:{trigger:'.album-masthead',start:'top top',end:'bottom top',scrub:true}});
    gsap.utils.toArray('.album-page .reveal').forEach(el=>gsap.fromTo(el,{y:42,opacity:0},{y:0,opacity:1,duration:1,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 86%',once:true}}));
    gsap.utils.toArray('.album-intro-art,.album-single-image').forEach(el=>{const img=el.querySelector('img');if(img)gsap.fromTo(img,{clipPath:'inset(0 0 100% 0)'},{clipPath:'inset(0 0 0 0)',duration:1.25,ease:'power3.inOut',scrollTrigger:{trigger:el,start:'top 82%',once:true}})});
    gsap.from('.album-promo-ornament',{rotation:120,scale:.4,opacity:0,duration:1.1,ease:'back.out(1.8)',scrollTrigger:{trigger:'.album-final-promo',start:'top 75%',once:true}});
  }
  if(document.body.classList.contains('tour-page-rs')){
    gsap.from('.tour-heading-hat',{y:-24,rotation:-22,opacity:0,duration:1,ease:'back.out(1.6)'});
    gsap.from('.tour-heading-kicker,.tour-heading h1,.tour-heading-subtitle,.tour-heading-rule',{y:24,opacity:0,stagger:.12,duration:.8,ease:'power3.out',delay:.15});
    gsap.utils.toArray('.tour-event').forEach((el,i)=>gsap.fromTo(el,{y:35,opacity:0},{y:0,opacity:1,duration:.8,delay:(i%2)*.06,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 91%',once:true}}));
    gsap.from('.tour-closing-ornament',{rotation:120,scale:.4,opacity:0,duration:1.1,ease:'back.out(1.8)',scrollTrigger:{trigger:'.tour-closing',start:'top 78%',once:true}});
  }
});

// Contact page motion: same understated reveal language as the album and tour.
document.addEventListener('DOMContentLoaded', () => {
  if (!document.body.classList.contains('contact-page-rs')) return;
  const revealFallback = () => document.querySelectorAll('.contact-page-rs .reveal').forEach(el => {
    el.style.opacity = '1';
    el.style.transform = 'none';
  });
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !window.gsap || !window.ScrollTrigger) {
    revealFallback();
    return;
  }
  document.body.classList.add('motion-ready');
  gsap.registerPlugin(ScrollTrigger);
  gsap.timeline({ defaults: { ease: 'power4.out' } })
    .from('.contact-hat', { y: -24, rotation: -18, opacity: 0, duration: .85 })
    .from('.contact-masthead-content .rs-eyebrow, .contact-masthead h1, .contact-masthead-sub, .contact-scroll-link', { y: 26, opacity: 0, stagger: .12, duration: .75 }, '-=.35');
  gsap.utils.toArray('.contact-page-rs .reveal').forEach(el => {
    gsap.fromTo(el, { y: 42, opacity: 0 }, {
      y: 0, opacity: 1, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 86%', once: true }
    });
  });
  const photo = document.querySelector('.contact-intro-photo img');
  if (photo) gsap.fromTo(photo, { clipPath: 'inset(0 0 100% 0)' }, {
    clipPath: 'inset(0 0 0 0)', duration: 1.25, ease: 'power3.inOut',
    scrollTrigger: { trigger: '.contact-intro-photo', start: 'top 82%', once: true }
  });
  gsap.to('.contact-intro-photo img', {
    yPercent: 8, ease: 'none',
    scrollTrigger: { trigger: '.contact-introduction', start: 'top bottom', end: 'bottom top', scrub: true }
  });
  gsap.from('.contact-newsletter-ornament', {
    rotation: 100, scale: .5, opacity: 0, duration: 1.2, ease: 'back.out(1.7)',
    scrollTrigger: { trigger: '.contact-newsletter', start: 'top 78%', once: true }
  });
});
