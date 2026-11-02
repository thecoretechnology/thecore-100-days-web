window.addEventListener('DOMContentLoaded',()=>{requestAnimationFrame(()=>document.body.classList.add('is-loaded'));});
const header = `
<header class="site-header"><a class="brand" href="index.html" aria-label="AUREVÉ home"><span>AUREVÉ</span><small>INTERIOR DESIGN STUDIO</small></a>
<button class="menu-toggle" aria-label="Open menu" aria-expanded="false"><i></i><i></i></button>
<nav class="main-nav"><a href="about.html">Studio</a><a href="services.html">Services</a><a href="projects.html">Projects</a><a href="journal.html">Journal</a><a class="nav-contact" href="contact.html">Let's talk <span>↗</span></a></nav></header>`;
const footer = `<footer class="site-footer"><div class="footer-main"><div><a class="brand footer-brand" href="index.html"><span>AUREVÉ</span><small>INTERIOR DESIGN STUDIO</small></a><p>Spaces that tell your story.</p></div><div class="footer-col"><span>EXPLORE</span><a href="about.html">Studio</a><a href="services.html">Services</a><a href="projects.html">Projects</a><a href="journal.html">Journal</a></div><div class="footer-col"><span>GET IN TOUCH</span><a href="mailto:hello@aureve.studio">hello@aureve.studio</a><a href="contact.html">Start a project ↗</a><p>Chandigarh · India</p></div></div><div class="footer-bottom"><span>© 2026 AUREVÉ STUDIO made by thecoretechnology</span><span>MADE WITH INTENTION</span><a href="#top" class="back-top">BACK TO TOP ↑</a></div></footer>`;
document.querySelector("#site-header").innerHTML = header;
document.querySelector("#site-footer").innerHTML = footer;
const page = document.body.dataset.page;
document.querySelectorAll(".main-nav a").forEach(a=>{if(a.getAttribute("href")===({home:"index.html",project:"projects.html",article:"journal.html"}[page]||page+".html"))a.classList.add("active")});
const toggle=document.querySelector(".menu-toggle"), nav=document.querySelector(".main-nav");
toggle.addEventListener("click",()=>{const open=toggle.getAttribute("aria-expanded")==="true";toggle.setAttribute("aria-expanded",String(!open));nav.classList.toggle("is-open",!open);document.body.classList.toggle("menu-open",!open)});
nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{nav.classList.remove("is-open");toggle.setAttribute("aria-expanded","false");document.body.classList.remove("menu-open")}));
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("is-visible");observer.unobserve(entry.target)}}),{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));
document.querySelectorAll("[data-count]").forEach(el=>{const target=Number(el.dataset.count);let started=false;const countObserver=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting&&!started){started=true;let start=0;const duration=1000;const tick=t=>{if(!start)start=t;const p=Math.min((t-start)/duration,1);el.textContent=String(Math.round(target*(1-Math.pow(1-p,3)))).padStart(2,"0");if(p<1)requestAnimationFrame(tick)};requestAnimationFrame(tick);countObserver.disconnect()}}));countObserver.observe(el)});
const form=document.querySelector("#enquiry-form");if(form){form.addEventListener("submit",e=>{e.preventDefault();if(!form.reportValidity())return;document.querySelector("#form-note").textContent="Thank you — your enquiry has been prepared. Connect a form endpoint to receive it by email.";form.reset();form.querySelector("button").textContent="Enquiry noted ✓";});}
document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener("click",e=>{const target=document.querySelector(a.getAttribute("href"));if(target){e.preventDefault();target.scrollIntoView({behavior:"smooth"})}}));
/* AUREVÉ motion system — restrained, editorial, and progressively enhanced. */
(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const addReveal = (selector, variant = 'rise', stagger = false) => {
    document.querySelectorAll(selector).forEach((el, index) => {
      if (el.closest('.hero-eliras')) return;
      el.classList.add('reveal');
      el.dataset.reveal = variant;
      if (stagger) el.style.setProperty('--reveal-delay', `${Math.min(index % 6, 5) * 85}ms`);
    });
  };

  addReveal('.page-hero > .section-kicker, .page-hero > h1, .page-hero > .page-lede, .contact-heading > *, .article-body > *', 'rise');
  addReveal('.value-card, .service-compact-grid article, .process-list > div, .footer-col, .footer-main > div:first-child', 'rise', true);
  addReveal('.service-detail, .split-section > *, .journal-feature > *, .project-overview > *, .project-gallery img', 'rise', true);
  addReveal('.page-hero-img, .service-detail-image, .portfolio-card img, .journal-card img, .journal-feature img, .article-body img, .project-detail-hero, .article-hero, .image-quote', 'image');
  addReveal('.contact-band > *, .manifesto-copy > *, .project-title > *, .article-hero > div > *', 'rise', true);

  document.querySelectorAll('.main-nav a').forEach((link, index) => {
    link.style.setProperty('--nav-delay', `${index * 65}ms`);
  });
  document.querySelectorAll('.project-card, .portfolio-card, .journal-card, .value-card, .service-compact-grid article').forEach(card => {
    card.addEventListener('pointermove', event => {
      if (reduceMotion || event.pointerType === 'touch') return;
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - .5;
      const y = (event.clientY - rect.top) / rect.height - .5;
      card.style.setProperty('--hover-x', `${x * 3}px`);
      card.style.setProperty('--hover-y', `${y * 3}px`);
    });
    card.addEventListener('pointerleave', () => {
      card.style.setProperty('--hover-x', '0px');
      card.style.setProperty('--hover-y', '0px');
    });
  });

  if (!reduceMotion && 'IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    }), { threshold: .12, rootMargin: '0px 0px -35px 0px' });
    document.querySelectorAll('.reveal:not(.is-visible)').forEach(el => revealObserver.observe(el));
  } else {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible'));
  }

  // Optional gentle image drift on desktop; transform-only to avoid layout work.
  const parallaxTargets = [...document.querySelectorAll('.intro-img-large, .manifesto-image img, .page-hero-img')];
  if (!reduceMotion && window.matchMedia('(min-width: 761px)').matches && parallaxTargets.length) {
    let scheduled = false;
    const updateParallax = () => {
      const vh = window.innerHeight;
      parallaxTargets.forEach(img => {
        const rect = img.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > vh) return;
        const progress = (rect.top + rect.height / 2 - vh / 2) / vh;
        img.style.setProperty('--parallax-y', `${Math.max(-10, Math.min(10, progress * -10))}px`);
      });
      scheduled = false;
    };
    window.addEventListener('scroll', () => {
      if (!scheduled) { scheduled = true; requestAnimationFrame(updateParallax); }
    }, { passive: true });
    updateParallax();
  }
})();
