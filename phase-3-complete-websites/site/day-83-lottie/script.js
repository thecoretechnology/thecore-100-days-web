const qs=(s,r=document)=>r.querySelector(s);const qsa=(s,r=document)=>[...r.querySelectorAll(s)];
const menuButton=qs('.menu-button'),menu=qs('.site-menu');
const closeMenu=()=>{menu.classList.remove('open');menuButton.setAttribute('aria-expanded','false');menuButton.setAttribute('aria-label','Open navigation')};
menuButton.addEventListener('click',()=>{const open=!menu.classList.contains('open');menu.classList.toggle('open',open);menuButton.setAttribute('aria-expanded',String(open));menuButton.setAttribute('aria-label',open?'Close navigation':'Open navigation')});
menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));document.addEventListener('click',e=>{if(!e.target.closest('.site-header'))closeMenu()});document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu()});

const hero=qs('.hero'),heroPhoto=qs('.hero-photo');const portraits=qsa('.portrait-thumb');const portraitUrls=portraits.map(b=>b.querySelector('img').src);
portraits.forEach((button,index)=>button.addEventListener('click',()=>{portraits.forEach(b=>b.classList.remove('active'));button.classList.add('active');heroPhoto.style.backgroundImage=`url("${portraitUrls[index]}")`;hero.classList.add('photo-active')}));
hero.addEventListener('pointermove',e=>{if(innerWidth<901)return;const r=hero.getBoundingClientRect();hero.style.setProperty('--mx',`${(e.clientX-r.left)/r.width}`);if(!hero.classList.contains('photo-active'))hero.classList.add('photo-active')});
hero.addEventListener('pointerleave',()=>hero.classList.remove('photo-active'));

const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;const reveals=qsa('.reveal');if(!reduce&&'IntersectionObserver'in window){const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in-view');io.unobserve(e.target)}}),{threshold:.12,rootMargin:'0px 0px -5%'});reveals.forEach(el=>io.observe(el))}else reveals.forEach(el=>el.classList.add('in-view'));

const services=qs('.services'),morph=qs('.morph'),notes=qsa('.service-note');let frame=0;
function updateScroll(){frame=0;if(!services||reduce)return;const r=services.getBoundingClientRect(),range=Math.max(1,services.offsetHeight-innerHeight),p=Math.max(0,Math.min(1,-r.top/range));morph.style.transform=`translate(-50%,-50%) rotate(${p*320}deg) scale(${.82+Math.sin(p*Math.PI)*.25})`;morph.style.borderRadius=`${45+p*15}% ${55-p*12}% ${52+p*10}% ${48-p*9}% / ${55-p*10}% ${42+p*14}% ${58-p*12}% ${45+p*9}%`;notes.forEach((n,i)=>{const start=i*.115,end=start+.35,local=Math.max(0,Math.min(1,(p-start)/(end-start))),from=(i%2?1:-1)*(innerWidth*.75),x=from*(1-local),y=(1-local)*120;n.style.opacity=String(Math.min(1,local*2.2));n.style.translate=`${x}px ${y}px`})}
function requestScroll(){if(!frame)frame=requestAnimationFrame(updateScroll)}window.addEventListener('scroll',requestScroll,{passive:true});window.addEventListener('resize',requestScroll,{passive:true});updateScroll();

qsa('.archive-collage figure').forEach((figure,i)=>figure.style.setProperty('--delay',`${i*60}ms`));
const form=qs('.contact-form'),status=qs('.form-status');form.addEventListener('submit',e=>{e.preventDefault();if(!form.reportValidity())return;status.textContent='Thank you — your project details are ready to send.';form.reset()});
