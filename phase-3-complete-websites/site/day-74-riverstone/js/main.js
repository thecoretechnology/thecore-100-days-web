document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('is-ready');

  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  if (toggle && nav) {
    const closeMenu = (restoreFocus = false) => {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open navigation');
      toggle.textContent = '☰';
      if (restoreFocus) toggle.focus();
    };
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
      toggle.textContent = open ? '×' : '☰';
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => closeMenu()));
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && nav.classList.contains('open')) closeMenu(true);
    });
  }

  // The homepage has its own two-sided record panel; keep it in sync with ARIA.
  const homeTabs = [...document.querySelectorAll('.rs-track-tabs [role="tab"]')];
  const homePanels = {
    a: document.getElementById('side-a'),
    b: document.getElementById('side-b')
  };
  if (homeTabs.length && homePanels.a && homePanels.b) {
    const activateHomeSide = side => {
      homeTabs.forEach(tab => {
        const active = tab.id === `side-${side}-tab`;
        tab.classList.toggle('is-active', active);
        tab.setAttribute('aria-selected', String(active));
        tab.tabIndex = active ? 0 : -1;
      });
      Object.entries(homePanels).forEach(([key, panel]) => { panel.hidden = key !== side; });
    };
    homeTabs.forEach((tab, index) => {
      tab.addEventListener('click', () => activateHomeSide(tab.id === 'side-b-tab' ? 'b' : 'a'));
      tab.addEventListener('keydown', event => {
        if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
        event.preventDefault();
        const nextIndex = event.key === 'Home' ? 0 : event.key === 'End' ? homeTabs.length - 1 : (index + (event.key === 'ArrowRight' ? 1 : -1) + homeTabs.length) % homeTabs.length;
        homeTabs[nextIndex].focus();
        activateHomeSide(nextIndex === 1 ? 'b' : 'a');
      });
    });
    activateHomeSide('a');
  }

  const current = location.pathname.split('/').pop().replace('.html', '') || 'index';
  document.querySelectorAll('.nav a').forEach(link => {
    if (link.dataset.page === current) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });
});
