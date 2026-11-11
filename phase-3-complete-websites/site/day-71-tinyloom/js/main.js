(() => {
  document.querySelectorAll('[data-count]').forEach(el => {
    if (!el.dataset.target) el.dataset.target = el.dataset.count;
  });
})();
