(() => {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const header = document.querySelector('.site-header');
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  const searchPanel = document.querySelector('.search-panel');
  const searchInput = searchPanel?.querySelector('input');
  const searchResults = searchPanel?.querySelector('.search-results');
  const pages = [
    ['Home','index.html','home'],['Our Story','story.html','story'],['Fragrance','fragrance.html','fragrance'],
    ['Philosophy','philosophy.html','philosophy'],['Journal','journal.html','journal'],['Contact','contact.html','contact']
  ];
  document.querySelectorAll('.year').forEach(el => el.textContent = new Date().getFullYear());
  const current = document.body.dataset.page;
  document.querySelectorAll('.nav a').forEach(a => { if(a.dataset.page === current) a.setAttribute('aria-current','page'); });

  // Header scroll state remains visually identical; motion is refined rather than redesigned.
  const updateHeader = () => header?.classList.toggle('scrolled', window.scrollY > 35);
  window.addEventListener('scroll', updateHeader, {passive:true}); updateHeader();
  menuToggle?.addEventListener('click', () => {
    const open = header.classList.toggle('menu-open');
    document.body.classList.toggle('menu-open', open);
    menuToggle.setAttribute('aria-expanded', String(open));
  });
  nav?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    header.classList.remove('menu-open'); document.body.classList.remove('menu-open');
  }));

  // Search overlay and page search.
  const openSearch = () => { searchPanel?.classList.add('open'); searchPanel?.setAttribute('aria-hidden','false'); setTimeout(()=>searchInput?.focus(),50); };
  const closeSearch = () => { searchPanel?.classList.remove('open'); searchPanel?.setAttribute('aria-hidden','true'); };
  document.querySelectorAll('.search-open').forEach(b => b.addEventListener('click', openSearch));
  document.querySelector('.search-close')?.addEventListener('click', closeSearch);
  searchPanel?.addEventListener('click', e => { if(e.target === searchPanel) closeSearch(); });
  searchInput?.addEventListener('input', () => {
    const q = searchInput.value.trim().toLowerCase();
    if (!searchResults) return;
    searchResults.innerHTML = '';
    pages.filter(p => !q || p[0].toLowerCase().includes(q)).forEach(p => {
      const a = document.createElement('a'); a.href=p[1]; a.textContent=p[0]+' ↗'; searchResults.appendChild(a);
    });
  });
  searchInput?.dispatchEvent(new Event('input'));

  // Dialogs used by fragrance and journal interactions.
  const modal = document.querySelector('.modal');
  const modalTitle = modal?.querySelector('#modal-title');
  const modalCopy = modal?.querySelector('.modal-copy');
  const showModal = (title, copy) => {
    if(!modal) return;
    modalTitle.textContent=title; modalCopy.textContent=copy;
    modal.classList.add('open');
    if (!prefersReduced && window.gsap) window.gsap.fromTo('.modal-card',{y:24,opacity:0,filter:'blur(5px)'},{y:0,opacity:1,filter:'blur(0px)',duration:.55,ease:'power3.out'});
    modal.querySelector('.modal-close').focus();
  };
  document.querySelectorAll('[data-modal-title],[data-article-title]').forEach(el => el.addEventListener('click', e => {
    e.preventDefault(); showModal(el.dataset.modalTitle || el.dataset.articleTitle, el.dataset.modalCopy || el.dataset.articleCopy);
  }));
  modal?.querySelector('.modal-close')?.addEventListener('click',()=>modal.classList.remove('open'));
  modal?.addEventListener('click',e=>{if(e.target===modal)modal.classList.remove('open');});

  // Contact form keeps its mailto handoff, with animated feedback.
  document.querySelectorAll('[data-contact-form]').forEach(form => form.addEventListener('submit', e => {
    e.preventDefault();
    if(!form.reportValidity()) return;
    const data = new FormData(form);
    const subject = encodeURIComponent('NOIRÉA website enquiry from '+data.get('name'));
    const body = encodeURIComponent('Name: '+data.get('name')+'\nEmail: '+data.get('email')+'\n\n'+data.get('message'));
    const status = form.querySelector('.form-status');
    form.classList.add('is-sending');
    if (status) status.textContent = 'Preparing your message…';
    if (!prefersReduced && window.gsap) {
      window.gsap.fromTo(form.querySelector('.submit-button'),{scale:1},{scale:.985,duration:.16,yoyo:true,repeat:1,ease:'power1.inOut'});
    }
    window.setTimeout(() => {
      form.classList.remove('is-sending');
      form.classList.add('is-success');
      if (status) status.textContent = 'Your email application is opening with your enquiry ready to send.';
      window.location.href = 'mailto:noirea@gmail.com?subject='+subject+'&body='+body;
    }, prefersReduced ? 0 : 260);
  }));

  // Accessibility: close overlays on Escape.
  document.addEventListener('keydown', e => {
    if(e.key === 'Escape'){
      closeSearch(); modal?.classList.remove('open');
      header?.classList.remove('menu-open'); document.body.classList.remove('menu-open');
    }
  });

  if (prefersReduced) {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
    return;
  }

  // Progressive enhancement: GSAP is used when available; native CSS reveal remains fallback.
  const gsapReady = !!(window.gsap && window.ScrollTrigger);
  if (gsapReady) {
    gsap.registerPlugin(ScrollTrigger);
    gsap.config({nullTargetWarn:false});
  }

  // Keep the cinematic wordmark intro on the home page only. Inner pages open directly.
  if (current === 'home') {
    const intro = document.createElement('div');
    intro.className = 'noirea-intro';
    intro.innerHTML = '<div><div class="noirea-intro__wordmark">NOIRÉA</div><div class="noirea-intro__rule"></div></div>';
    document.body.appendChild(intro);
    if (gsapReady) {
      gsap.timeline({defaults:{ease:'power3.out'}, onComplete:()=>intro.remove()})
        .to('.noirea-intro__wordmark',{opacity:1,filter:'blur(0px)',y:0,duration:.85})
        .to('.noirea-intro__rule',{width:74,duration:.5,ease:'power2.inOut'},'-=.28')
        .to(intro,{yPercent:-100,duration:.85,ease:'power4.inOut'},'+=.28');
    } else {
      intro.querySelector('.noirea-intro__wordmark').style.cssText='opacity:1;filter:none;transform:none;transition:all .7s ease';
      setTimeout(()=>{intro.style.transition='transform .8s cubic-bezier(.76,0,.24,1)';intro.style.transform='translateY(-100%)';setTimeout(()=>intro.remove(),850)},900);
    }
  }

  // Hero word reveal without changing the actual copy or typography.
  const heroHeading = document.querySelector('.hero-copy .display');
  if (heroHeading) {
    const lines = [...heroHeading.childNodes];
    heroHeading.innerHTML = lines.map(node => {
      if (node.nodeType === Node.TEXT_NODE) return node.textContent.split(/(\s+)/).map(part => /^\s+$/.test(part) ? part : `<span class="hero-word"><span>${part}</span></span>`).join('');
      if (node.nodeName === 'BR') return '<br>';
      return node.textContent || '';
    }).join('');
    const words = heroHeading.querySelectorAll('.hero-word > span');
    if (gsapReady) {
      gsap.set(words,{yPercent:115,opacity:0,filter:'blur(7px)'});
      gsap.set('.hero-image',{clipPath:'inset(0 0 0 100%)'});
      gsap.set('.hero-copy .italic,.hero-copy .hero-rule,.hero-copy .small-link,.hero-scroll',{opacity:0,y:18});
      const tl = gsap.timeline({delay:.65});
      tl.to('.hero-image',{clipPath:'inset(0 0 0 0)',duration:1.6,ease:'power4.inOut'})
        .to(words,{yPercent:0,opacity:1,filter:'blur(0px)',duration:.95,stagger:.105,ease:'power4.out'},'-=1.0')
        .to('.hero-copy .italic',{opacity:1,y:0,duration:.65},'-=.25')
        .to('.hero-copy .hero-rule',{opacity:1,scaleX:1,duration:.5,transformOrigin:'left'},'-=.25')
        .to('.hero-copy .small-link,.hero-scroll',{opacity:1,y:0,duration:.65,stagger:.12},'-=.2');
      gsap.to('.hero-image img',{scale:1.075,duration:15,ease:'none',repeat:-1,yoyo:true});
    } else {
      words.forEach((w,i)=>{w.style.cssText=`opacity:1;transform:none;filter:none;transition:all .7s ease ${i*.08}s`});
    }
  }

  // Floating rose petals: small decorative accents, no new imagery or layout blocks.
  const petalHost = document.querySelector('.hero') || document.querySelector('.philosophy-hero');
  if (petalHost) {
    const layer = document.createElement('div'); layer.className='rose-petal-layer'; layer.setAttribute('aria-hidden','true');
    const count = window.innerWidth < 650 ? 5 : 9;
    for(let i=0;i<count;i++){
      const petal=document.createElement('i'); petal.className='rose-petal';
      const left=Math.random()*100, duration=17+Math.random()*18, delay=Math.random()*-24;
      petal.style.left=left+'%'; petal.style.setProperty('--petal-drift',(Math.random()*130-65)+'px');
      petal.style.setProperty('--petal-spin',(220+Math.random()*420)+'deg');
      petal.style.setProperty('--petal-opacity',(0.18+Math.random()*.2).toFixed(2));
      petal.style.animation=`petalFall ${duration}s linear ${delay}s infinite`;
      layer.appendChild(petal);
    }
    petalHost.appendChild(layer);
  }

  // GSAP scroll reveals with stagger and clip-mask image entrances.
  if (gsapReady) {
    document.querySelectorAll('.reveal').forEach((el,i)=>{
      gsap.fromTo(el,{y:30,opacity:0,filter:'blur(3px)'},{
        y:0,opacity:1,filter:'blur(0px)',duration:1.05,ease:'power3.out',
        scrollTrigger:{trigger:el,start:'top 88%',once:true}
      });
    });
    document.querySelectorAll('.image-frame').forEach(el=>{
      if(el.closest('.hero')) return;
      const img=el.querySelector('img');
      if(!img) return;
      gsap.fromTo(el,{clipPath:'inset(0 0 100% 0)'},{
        clipPath:'inset(0 0 0% 0)',duration:1.15,ease:'power3.inOut',
        scrollTrigger:{trigger:el,start:'top 88%',once:true}
      });
      gsap.fromTo(img,{scale:1.13},{scale:1,duration:1.6,ease:'power3.out',
        scrollTrigger:{trigger:el,start:'top 88%',once:true}});
    });
    document.querySelectorAll('.fragrance-card,.journal-card').forEach((card,i)=>{
      gsap.fromTo(card,{y:42,opacity:0},{y:0,opacity:1,duration:.9,delay:(i%3)*.11,ease:'power3.out',
        scrollTrigger:{trigger:card,start:'top 90%',once:true}});
    });
    // Restrained parallax on large editorial images only.
    if (window.innerWidth > 900) {
      document.querySelectorAll('.story-visual .main-photo img,.philosophy-band .photo img,.philosophy-hero > img').forEach(img=>{
        gsap.to(img,{yPercent:7,ease:'none',scrollTrigger:{trigger:img.parentElement,start:'top bottom',end:'bottom top',scrub:.7}});
      });
    }
  } else {
    // CSS/IntersectionObserver fallback when CDN libraries are unavailable.
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}
    }), {threshold:.12});
    document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
  }

  // Desktop-only subtle 3D tilt, with gentle reset and no touch-device interference.
  if (finePointer) {
    document.querySelectorAll('.fragrance-card .image-frame,.journal-card .image-frame,.story-visual .image-frame,.fragrance-feature .image-frame').forEach(frame=>{
      let bounds;
      frame.addEventListener('pointerenter',()=>{bounds=frame.getBoundingClientRect();});
      frame.addEventListener('pointermove',e=>{
        if(!bounds) bounds=frame.getBoundingClientRect();
        const x=(e.clientX-bounds.left)/bounds.width-.5;
        const y=(e.clientY-bounds.top)/bounds.height-.5;
        frame.style.transition='transform .12s ease-out';
        frame.style.transform=`perspective(900px) rotateX(${(-y*5).toFixed(2)}deg) rotateY(${(x*6).toFixed(2)}deg) translateZ(4px)`;
      });
      frame.addEventListener('pointerleave',()=>{
        frame.style.transition='transform .65s cubic-bezier(.2,.7,.2,1)';
        frame.style.transform='perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0)';
        bounds=null;
      });
    });
    // Small magnetic response, limited to CTA links.
    document.querySelectorAll('.hero-copy .small-link,.submit-button').forEach(btn=>{
      btn.addEventListener('pointermove',e=>{
        const r=btn.getBoundingClientRect(), dx=e.clientX-r.left-r.width/2, dy=e.clientY-r.top-r.height/2;
        btn.style.transform=`translate(${dx*.045}px,${dy*.045}px)`;
      });
      btn.addEventListener('pointerleave',()=>{btn.style.transition='transform .45s ease';btn.style.transform='';setTimeout(()=>btn.style.transition='',450);});
    });
  }

  // Use normal browser navigation for internal pages; no repeated red curtain transition.

})();
