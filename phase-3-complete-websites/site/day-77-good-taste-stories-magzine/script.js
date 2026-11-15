(() => {
  'use strict';

  const body = document.body;
  const themeToggle = document.querySelector('.theme-toggle');
  const menuToggle = document.querySelector('.mobile-menu-toggle');
  const mobileNav = document.querySelector('#mobile-nav');
  const searchInput = document.querySelector('#story-search');
  const categoryFilter = document.querySelector('#category-filter');
  const cards = [...document.querySelectorAll('.story-card')];
  const emptyState = document.querySelector('#empty-state');
  const loadMoreButton = document.querySelector('#load-more');
  const loadMoreMessage = document.querySelector('#load-more-message');
  const themeColor = document.querySelector('meta[name="theme-color"]');

  // Restore the optional color preference without making storage a requirement.
  try {
    if (localStorage.getItem('good-taste-theme') === 'dark') body.classList.add('dark-theme');
  } catch (_) { /* Private browsing can block storage. */ }
  updateThemeControl();

  function updateThemeControl() {
    const dark = body.classList.contains('dark-theme');
    themeToggle?.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
    themeToggle?.setAttribute('title', dark ? 'Switch to light theme' : 'Switch to dark theme');
    themeToggle?.setAttribute('aria-pressed', String(dark));
    if (themeToggle) {
      themeToggle.innerHTML = dark
        ? '<svg class="moon-icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"></path></svg>'
        : '<svg class="moon-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.4 15.1A8.3 8.3 0 0 1 8.9 3.6 8.4 8.4 0 1 0 20.4 15.1Z"></path></svg>';
    }
    if (themeColor) themeColor.content = dark ? '#171715' : '#f2f0ea';
  }

  themeToggle?.addEventListener('click', () => {
    body.classList.toggle('dark-theme');
    updateThemeControl();
    try { localStorage.setItem('good-taste-theme', body.classList.contains('dark-theme') ? 'dark' : 'light'); } catch (_) { /* Ignore storage errors. */ }
  });

  function setMenuOpen(open) {
    if (!menuToggle || !mobileNav) return;
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    mobileNav.hidden = !open;
  }

  menuToggle?.addEventListener('click', () => {
    setMenuOpen(menuToggle.getAttribute('aria-expanded') !== 'true');
  });
  mobileNav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenuOpen(false)));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menuToggle?.getAttribute('aria-expanded') === 'true') {
      setMenuOpen(false);
      menuToggle.focus();
    }
  });
  document.addEventListener('click', event => {
    if (menuToggle?.getAttribute('aria-expanded') !== 'true') return;
    if (!mobileNav?.contains(event.target) && !menuToggle.contains(event.target)) setMenuOpen(false);
  });
  const desktopQuery = window.matchMedia('(min-width: 601px)');
  desktopQuery.addEventListener?.('change', event => { if (event.matches) setMenuOpen(false); });

  function filterStories() {
    const query = (searchInput?.value || '').trim().toLocaleLowerCase();
    const category = categoryFilter?.value || 'all';
    let visibleCount = 0;

    cards.forEach(card => {
      const categoryMatch = category === 'all' || card.dataset.category === category;
      const haystack = `${card.dataset.search || ''} ${card.textContent || ''}`.toLocaleLowerCase();
      const searchMatch = !query || haystack.includes(query);
      const visible = categoryMatch && searchMatch;
      card.hidden = !visible;
      if (visible) visibleCount += 1;
    });

    if (emptyState) emptyState.hidden = visibleCount > 0;
    if (loadMoreButton) loadMoreButton.hidden = Boolean(query || category !== 'all');
    if (loadMoreMessage) loadMoreMessage.hidden = true;
  }
  searchInput?.addEventListener('input', filterStories);
  categoryFilter?.addEventListener('change', filterStories);

  // The reference archive currently contains six published stories. Keep the
  // visible Load More affordance useful without inventing additional articles.
  loadMoreButton?.addEventListener('click', () => {
    if (loadMoreMessage) loadMoreMessage.hidden = false;
    loadMoreButton.setAttribute('aria-expanded', 'true');
  });

  // If a remote editorial image is unavailable, use the supplied local crop
  // where one exists; otherwise leave a deliberate paper-colored media frame.
  document.querySelectorAll('.image-frame img').forEach(image => {
    image.addEventListener('error', () => {
      const fallback = image.dataset.fallback;
      if (fallback && image.src !== new URL(fallback, document.baseURI).href) {
        image.src = fallback;
      } else {
        image.hidden = true;
        image.closest('.image-frame')?.classList.add('image-unavailable');
      }
    }, { once: true });
  });
})();
