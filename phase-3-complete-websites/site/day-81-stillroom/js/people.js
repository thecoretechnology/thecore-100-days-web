<<<<<<< ours
document.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await fetch('data/practitioners.json');
    if (!response.ok) throw new Error(`Unable to load practitioners: ${response.status}`);

    const people = await response.json();
    const target = document.querySelector('#home-people');

    if (target) {
      target.innerHTML = people.map((person) => `
        <article class="person reveal">
          <a href="practitioners/${person.slug}.html"><img src="${person.image}" alt="${person.name}"></a>
          <h3><a href="practitioners/${person.slug}.html">${person.name}</a></h3>
          <div class="role">${person.role}</div>
          <p>${person.bio}</p>
          <span class="small">${person.focus}</span>
          <p class="small">${person.days}</p>
          <a class="text-link" href="practitioners/${person.slug}.html">Read profile ↗</a>
        </article>
      `).join('');

      const cards = [...target.querySelectorAll('.person')];
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (!reduceMotion && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          });
        }, { threshold: 0.08, rootMargin: '0px 0px 80px 0px' });

        cards.forEach((card, index) => {
          card.style.transitionDelay = `${Math.min(index % 4, 3) * 80}ms`;
          observer.observe(card);
        });
      } else {
        cards.forEach((card) => card.classList.add('visible'));
      }
    }

    document.querySelectorAll('[data-match]').forEach((button) => {
      button.addEventListener('click', () => {
        document.querySelectorAll('[data-match]').forEach((item) => {
          item.classList.toggle('active', item === button);
        });
        const found = people.filter((person) => person.category.includes(button.dataset.match)).slice(0, 2);
        document.querySelector('#match-result').textContent = `We’d probably suggest ${found.map((person) => person.name).join(' or ')}. A free call helps us understand what feels right.`;
      });
    });
  } catch (error) {
    console.warn('Unable to load the practitioner directory.', error);
  }
});
=======
document.addEventListener('DOMContentLoaded',async()=>{try{let people=await(await fetch('data/practitioners.json')).json(),target=document.querySelector('#home-people');if(target)target.innerHTML=people.map(p=>`<article class="person reveal"><a href="practitioners/${p.slug}.html"><img src="${p.image}" alt="${p.name}"></a><h3><a href="practitioners/${p.slug}.html">${p.name}</a></h3><div class="role">${p.role}</div><p>${p.bio}</p><span class="small">${p.focus}</span><p class="small">${p.days}</p><a class="text-link" href="practitioners/${p.slug}.html">Read profile ↗</a></article>`).join('');document.querySelectorAll('[data-match]').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('[data-match]').forEach(x=>x.classList.toggle('active',x===b));let found=people.filter(p=>p.category.includes(b.dataset.match)).slice(0,2);document.querySelector('#match-result').textContent='We’d probably suggest '+found.map(p=>p.name).join(' or ')+'. A free call helps us understand what feels right.'}))}catch(e){console.warn('Start a local server to load the practitioner JSON')}});
>>>>>>> theirs
