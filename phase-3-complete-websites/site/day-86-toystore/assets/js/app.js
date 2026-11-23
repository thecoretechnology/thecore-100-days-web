/* ToyStore interactions: catalog, product pages, cart, forms and navigation. */
(() => {
  'use strict';
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const toys = Array.isArray(window.TOYS) ? window.TOYS : [];
  const STORAGE_KEY = 'toystore-cart';
  const money = value => `$${Number(value).toFixed(2)}`;
  const safeQty = value => Number.isFinite(Number(value)) ? Math.min(99, Math.max(1, Math.floor(Number(value)))) : 1;
  const productBySlug = slug => toys.find(product => product.slug === slug);
  const imageMarkup = (product, className = '') => product.image
    ? `<img class="${className}" src="${product.image}" alt="${product.name}" loading="lazy" decoding="async">`
    : `<span class="missing" role="img" aria-label="Image unavailable">Image unavailable</span>`;

  function productCard(product) {
    return `<a class="product-card" href="/product/${product.slug}/" aria-label="View ${product.name}, ${money(product.price)}">
      <div class="product-image">${imageMarkup(product)}</div>
      <div class="product-info"><h3>${product.name}</h3><div class="price">${money(product.price)}</div></div>
    </a>`;
  }
  function renderGrid(selector, products) {
    const element = $(selector);
    if (element) element.innerHTML = products.map(productCard).join('');
  }

  renderGrid('[data-products="stuffed"]', toys.filter(p => p.category === 'Stuffed Animals').slice(0, 4));
  renderGrid('[data-products="wooden"]', toys.filter(p => p.category === 'Wooden Toys').slice(0, 4));
  renderGrid('[data-products="all"]', toys);
  const categoryGrid = $('[data-products="category"]');
  if (categoryGrid) renderGrid('[data-products="category"]', toys.filter(p => p.category === categoryGrid.dataset.category));

  // Populate the shared product detail template from the single product catalogue.
  const currentSlug = location.pathname.split('/').filter(Boolean).pop();
  const currentProduct = productBySlug(currentSlug);
  const detail = $('.product-detail');
  if (detail && currentProduct) {
    detail.innerHTML = `<div class="detail-image">${imageMarkup(currentProduct)}</div>
      <div class="detail-copy"><div class="eyebrow">${currentProduct.category}</div>
        <h1>${currentProduct.name}</h1>
        <p>A lovely toy from the ToyStore collection. A simple, colorful choice for playtime and thoughtful gifting.</p>
        <div class="price detail-price">${money(currentProduct.price)} USD</div>
        <div class="buy-row"><label class="sr-only" for="product-quantity">Quantity</label>
          <input id="product-quantity" class="qty" type="number" min="1" max="99" step="1" value="1" inputmode="numeric">
          <button class="btn add-cart" type="button" data-add="${currentProduct.slug}">Add to Cart</button></div>
        <p class="muted">SKU: ${currentProduct.sku}</p></div>`;
    const sku = $('.specs');
    if (sku) sku.innerHTML = `<span>SKU: ${currentProduct.sku}</span><span>Category: ${currentProduct.category}</span>`;
    renderGrid('[data-products="related"]', toys.filter(p => p.slug !== currentProduct.slug && p.category === currentProduct.category).slice(0, 4));
    document.title = `${currentProduct.name} — ToyStore`;
  } else if (detail) {
    detail.innerHTML = '<div class="page-content"><h1>Product not found</h1><p><a class="btn" href="/catalog/">Return to Catalog</a></p></div>';
  }

  // Restore only valid cart records. Invalid/corrupt localStorage is safely ignored.
  function readCart() {
    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      if (!Array.isArray(stored)) return [];
      return stored.map(item => ({ slug: String(item.slug || ''), qty: safeQty(item.qty) }))
        .filter(item => productBySlug(item.slug));
    } catch (_) { return []; }
  }
  let cart = readCart();
  const panel = $('.cart-panel');
  const overlay = $('.overlay');
  const cartItems = $('.cart-items');
  const subtotalElement = $('[data-subtotal]');

  function cartCount() { return cart.reduce((sum, item) => sum + item.qty, 0); }
  function cartSubtotal() {
    return cart.reduce((sum, item) => sum + productBySlug(item.slug).price * item.qty, 0);
  }
  function persistCart() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(cart)); }
    catch (_) { showCartMessage('Your browser could not save the cart. Check available storage space.'); }
    renderCart();
  }
  function showCartMessage(message) {
    let notice = $('.cart-notice');
    if (!notice && panel) {
      notice = document.createElement('p');
      notice.className = 'cart-notice';
      notice.setAttribute('role', 'status');
      panel.insertBefore(notice, $('.cart-total'));
    }
    if (notice) notice.textContent = message;
  }
  function renderCart() {
    $$('[data-cart-count]').forEach(node => { node.textContent = cartCount(); });
    if (cartItems) {
      if (!cart.length) {
        cartItems.innerHTML = '<div class="cart-empty"><p>Your cart is empty.</p><a class="btn" href="/catalog/">Continue Shopping</a></div>';
      } else {
        cartItems.innerHTML = cart.map(item => {
          const product = productBySlug(item.slug);
          return `<div class="cart-item" data-cart-item="${product.slug}">
            ${product.image ? `<img src="${product.image}" alt="${product.name}" loading="lazy">` : '<div class="cart-image-fallback" aria-hidden="true">Toy</div>'}
            <div class="cart-item-copy"><b>${product.name}</b><small>${money(product.price)} each</small>
              <div class="cart-quantity" aria-label="Quantity controls for ${product.name}">
                <button type="button" data-qty-change="-1" data-slug="${product.slug}" aria-label="Decrease ${product.name} quantity">−</button>
                <span>${item.qty}</span>
                <button type="button" data-qty-change="1" data-slug="${product.slug}" aria-label="Increase ${product.name} quantity">+</button>
              </div></div>
            <div class="cart-item-actions"><strong>${money(product.price * item.qty)}</strong>
              <button type="button" class="remove-item" data-remove="${product.slug}">Remove</button></div>
          </div>`;
        }).join('');
      }
    }
    if (subtotalElement) subtotalElement.textContent = `${money(cartSubtotal())} USD`;
    const checkout = $('[data-checkout]');
    if (checkout) checkout.disabled = cart.length === 0;
  }
  function openCart() {
    if (!panel || !overlay) return;
    panel.classList.add('open'); overlay.classList.add('show');
    panel.setAttribute('aria-hidden', 'false');
    document.body.classList.add('cart-open');
    $('[data-close-cart]', panel)?.focus();
  }
  function closeCart() {
    panel?.classList.remove('open'); overlay?.classList.remove('show');
    panel?.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('cart-open');
  }
  function addToCart(slug, quantity) {
    const product = productBySlug(slug);
    if (!product) return;
    const qtyInput = $('.qty');
    const raw = quantity ?? (qtyInput ? qtyInput.value : 1);
    if (!Number.isInteger(Number(raw)) || Number(raw) < 1 || Number(raw) > 99) {
      showCartMessage('Please choose a quantity between 1 and 99.');
      qtyInput?.focus();
      return;
    }
    const qty = safeQty(raw);
    const existing = cart.find(item => item.slug === slug);
    if (existing) existing.qty = Math.min(99, existing.qty + qty);
    else cart.push({ slug, qty });
    persistCart();
    showCartMessage(`${product.name} added to your cart.`);
    openCart();
  }

  renderCart();
  panel?.setAttribute('aria-hidden', 'true');
  document.addEventListener('click', event => {
    const addButton = event.target.closest('[data-add]');
    if (addButton) { addToCart(addButton.dataset.add); return; }
    if (event.target.closest('[data-open-cart]')) { openCart(); return; }
    if (event.target.closest('[data-close-cart]') || event.target === overlay) { closeCart(); return; }
    const removeButton = event.target.closest('[data-remove]');
    if (removeButton) {
      cart = cart.filter(item => item.slug !== removeButton.dataset.remove);
      persistCart();
      showCartMessage('Item removed from your cart.');
      return;
    }
    const quantityButton = event.target.closest('[data-qty-change]');
    if (quantityButton) {
      const item = cart.find(entry => entry.slug === quantityButton.dataset.slug);
      if (!item) return;
      const next = item.qty + Number(quantityButton.dataset.qtyChange);
      if (next < 1) cart = cart.filter(entry => entry.slug !== item.slug);
      else item.qty = Math.min(99, next);
      persistCart();
      return;
    }
    if (event.target.closest('[data-checkout]')) {
      if (cart.length) showCartMessage('Checkout is a demonstration only. No order or payment has been submitted.');
      return;
    }
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeCart();
  });

  // Accessible mobile navigation.
  const menuButton = $('.menu-toggle');
  const navLinks = $('.navlinks');
  menuButton?.addEventListener('click', () => {
    const isOpen = navLinks?.classList.toggle('open') || false;
    menuButton.setAttribute('aria-expanded', String(isOpen));
  });
  $$('.navlinks a').forEach(link => link.addEventListener('click', () => {
    navLinks?.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
  }));

  // Local-only form validation: never imply that data reached a server.
  $$('.contact-form, .newsletter-form').forEach(form => {
    form.addEventListener('submit', event => {
      event.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      let notice = $('.notice', form) || form.querySelector('[data-form-notice]');
      if (!notice) {
        notice = document.createElement('p');
        notice.className = 'notice';
        notice.setAttribute('role', 'status');
        form.appendChild(notice);
      }
      notice.textContent = 'Thank you! Your form is valid. This demo does not send or store submissions.';
      notice.style.display = 'block';
      form.reset();
    });
  });

  // Graceful fallback for unavailable external image assets.
  document.addEventListener('error', event => {
    if (event.target instanceof HTMLImageElement) {
      event.target.classList.add('image-failed');
      const fallback = document.createElement('span');
      fallback.className = 'image-fallback';
      fallback.setAttribute('role', 'img');
      fallback.textContent = event.target.alt || 'Toy image unavailable';
      event.target.insertAdjacentElement('afterend', fallback);
    }
  }, true);

  // Respect reduced-motion preferences and gracefully work without CDN access.
  const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  if (!reduceMotion && window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
    gsap.utils.toArray('.reveal').forEach(element => {
      gsap.fromTo(element, { y: 22, opacity: 0 }, {
        y: 0, opacity: 1, duration: .65, ease: 'power2.out',
        scrollTrigger: { trigger: element, start: 'top 90%', once: true }
      });
    });
  } else {
    $$('.reveal').forEach(element => element.classList.add('visible'));
  }
})();
