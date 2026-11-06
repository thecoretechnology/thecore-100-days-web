
const menu=document.querySelector('.menu'); if(menu) menu.addEventListener('click',()=>{const links=document.querySelector('.navlinks');links.style.display=links.style.display==='flex'?'none':'flex';links.style.flexDirection='column';links.style.position='absolute';links.style.right='5vw';links.style.top='65px';links.style.background='var(--paper)';links.style.padding='20px';links.style.border='1px solid var(--line)'});
const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}}),{threshold:.12});document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
document.querySelectorAll('form').forEach(f=>f.addEventListener('submit',e=>{e.preventDefault();let msg=f.querySelector('.form-msg');if(msg)msg.textContent='Thanks for your note. This static demo does not send messages; please email hello@visoraa.example to reach the gallery.';f.reset()}));

// Refined motion and gallery interactions (dependency-free, reduced-motion aware)
(()=>{
 const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 const header=document.querySelector('.nav');
 const scrollState=()=>header?.classList.toggle('scrolled',window.scrollY>24);
 scrollState();window.addEventListener('scroll',scrollState,{passive:true});
 // Cinematic entrance sequence: hero eyebrow, headline and foot copy cascade.
 if(!reduce){document.querySelectorAll('.hero .reveal').forEach((el,i)=>{el.style.transitionDelay=(i*.11)+'s';});}
 // Subtle pointer-driven depth on artwork cards.
 if(!reduce && matchMedia('(pointer:fine)').matches){document.querySelectorAll('.tile').forEach(card=>{
  card.addEventListener('pointermove',e=>{const r=card.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;card.style.transform=`rotateY(${x*3}deg) rotateX(${-y*3}deg)`;});
  card.addEventListener('pointerleave',()=>card.style.transform='');
 });}
 // Artwork images remain inline; no unsolicited modal/lightbox popups.
 document.querySelectorAll('.tile img, .detail-image, .split img').forEach(img=>{
   img.removeAttribute('tabindex'); img.removeAttribute('role'); img.removeAttribute('aria-label');
 });
 // Collection listing filter controls based on available card labels.
 const grid=document.querySelector('#collection .grid');if(grid&&grid.querySelectorAll('.tile').length>2){const bar=document.createElement('div');bar.className='filterbar';bar.setAttribute('aria-label','Filter gallery items');bar.innerHTML='<button class="active" data-filter="all">All works</button><button data-filter="on view">On view</button><button data-filter="upcoming">Upcoming</button><button data-filter="artist">Artists</button>';grid.parentElement.insertBefore(bar,grid);bar.querySelectorAll('button').forEach(btn=>btn.addEventListener('click',()=>{bar.querySelectorAll('button').forEach(b=>b.classList.toggle('active',b===btn));const term=btn.dataset.filter;grid.querySelectorAll('.tile').forEach(tile=>{const text=tile.textContent.toLowerCase();tile.classList.toggle('filtered-out',term!=='all'&&!text.includes(term));});}));}
})();

