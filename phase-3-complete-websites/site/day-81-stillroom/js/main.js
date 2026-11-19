const links=[['Therapy','therapy.html'],['Practitioners','practitioners.html'],['Fees','fees.html'],['The house','the-house.html']];
function head(){let cur=location.pathname.split('/').pop()||'index.html';let prefix=location.pathname.includes('/practitioners/')?'../':'';return `<header class="site-header"><div class="container header-inner"><a class="logo" href="${prefix}index.html">Stillroom</a><button class="menu-toggle" aria-label="Toggle navigation">☰</button><nav class="nav">${links.map(([n,u])=>`<a href="${prefix+u}" ${cur===u?'aria-current="page"':''}>${n}</a>`).join('')}<a class="btn dark" href="${prefix}book.html">Book a free call ↗</a></nav></div></header>`}
function foot(){let p=location.pathname.includes('/practitioners/')?'../':'';return `<section class="container newsletter"><div><span class="eyebrow">A quiet house in Stockbridge</span><h2>A minute of calm,<br>once a month.</h2><p>One short practice and one note from the house. No offers.</p></div><form class="newsletter-form" data-local><input type="email" placeholder="you@example.com" required aria-label="Email"><button class="text-link">Subscribe ↗</button><span class="small feedback"></span></form></section><footer class="site-footer"><div class="container"><div class="footer-grid"><div><a class="logo" href="${p}index.html">Stillroom</a><p>Therapy and wellbeing since 2016.<br>A Georgian house in Stockbridge, Edinburgh.</p></div><div><h4>Visit</h4><p>9 Malta Gardens<br>Stockbridge, Edinburgh EH3<br>Step-free room on ground floor</p></div><div><h4>Hours</h4><p>Monday–Thursday · 8am–8pm<br>Friday · 8am–5pm<br>Saturday · 9am–1pm</p></div><div><h4>Talk to us</h4><a href="tel:+441314960742">0131 496 0742</a><a href="mailto:hello@stillroomtherapy.co.uk">hello@stillroomtherapy.co.uk</a><h4>Pages</h4>${links.map(([n,u])=>`<a href="${p+u}">${n}</a>`).join('')}<a href="${p}book.html">Book a free call</a></div></div><div class="footer-bottom"><span>© 2026 Stillroom. Therapy and wellbeing since 2016.</span><span><a href="${p}privacy.html">Privacy</a>　<a href="${p}terms.html">Terms</a>　<a href="#" id="top">Back to top ↑</a></span></div></div></footer>`}
document.addEventListener('DOMContentLoaded',()=>{document.querySelector('#site-header')?.insertAdjacentHTML('afterbegin',head());document.querySelector('#site-footer')?.insertAdjacentHTML('beforeend',foot());document.querySelector('#top')?.addEventListener('click',e=>{e.preventDefault();scrollTo({top:0,behavior:'smooth'})});document.querySelectorAll('[data-local]').forEach(f=>f.addEventListener('submit',e=>{e.preventDefault();f.querySelector('.feedback').textContent='Thank you. This demo does not send subscriptions.';f.reset()}));document.querySelectorAll('.reveal').forEach(el=>{if(!('IntersectionObserver'in window)){el.classList.add('visible');return}new IntersectionObserver(es=>es.forEach(x=>{if(x.isIntersecting)x.target.classList.add('visible')}),{threshold:.1}).observe(el)})});

/* Image loading and motion enhancements */
document.addEventListener('DOMContentLoaded',()=>{
  const header=document.querySelector('.site-header');
  const updateHeader=()=>header?.classList.toggle('is-scrolled',window.scrollY>12);
  updateHeader();window.addEventListener('scroll',updateHeader,{passive:true});
  const images=[...document.querySelectorAll('main img')];
  images.forEach((img,index)=>{
    img.decoding='async';
    if(index>0 && !img.hasAttribute('loading')) img.loading='lazy';
    if(index===0) img.fetchPriority='high';
    if(!img.complete) img.classList.add('image-reveal');
    img.addEventListener('load',()=>img.classList.add('visible'),{once:true});
    img.addEventListener('error',()=>{
      img.classList.add('image-unavailable');
      img.alt=img.alt||'Stillroom photography';
    },{once:true});
  });
  const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(!reduce && 'IntersectionObserver' in window){
    const io=new IntersectionObserver(entries=>entries.forEach(entry=>{
      if(entry.isIntersecting){entry.target.classList.add('visible');io.unobserve(entry.target)}
    }),{threshold:.12,rootMargin:'0px 0px -40px 0px'});
    document.querySelectorAll('.reveal,.image-reveal').forEach(el=>io.observe(el));
  }else{
    document.querySelectorAll('.reveal,.image-reveal').forEach(el=>el.classList.add('visible'));
  }
  const toggle=document.querySelector('.menu-toggle'),nav=document.querySelector('.nav');
  if(toggle&&nav){
    toggle.setAttribute('aria-expanded','false');
    toggle.addEventListener('click',()=>{
      const open=nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded',String(open));
      toggle.setAttribute('aria-label',open?'Close navigation':'Open navigation');
      toggle.textContent=open?'×':'☰';
    });
    nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
      nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');toggle.textContent='☰';
    }));
  }
  const hero=document.querySelector('.hero-media');
  if(hero&&!reduce&&window.matchMedia('(min-width: 901px)').matches){
    let raf=0;
    window.addEventListener('scroll',()=>{
      if(raf)return;
      raf=requestAnimationFrame(()=>{
        const rect=hero.getBoundingClientRect();
        if(rect.bottom>0&&rect.top<innerHeight){
          const offset=Math.max(-12,Math.min(12,(innerHeight/2-(rect.top+rect.height/2))*.018));
          hero.style.translate=`0 ${offset}px`;
        }
        raf=0;
      });
    },{passive:true});
  }
});


// Ensure directory cards never remain invisible if an observer is delayed or unavailable.
document.addEventListener('DOMContentLoaded',()=>{
  if(document.querySelector('.practitioners-page')){
    document.querySelectorAll('.practitioners-page .people-grid .person').forEach(card=>{
      card.classList.add('visible');
      card.style.setProperty('opacity','1','important');
      card.style.setProperty('transform','none','important');
      card.style.setProperty('visibility','visible','important');
    });
  }
});
