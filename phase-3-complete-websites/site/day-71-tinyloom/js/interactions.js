
(() => {
  // Fees: monthly/yearly switch updates each plan's displayed tuition.
  const billingButtons = document.querySelectorAll('[data-billing]');
  billingButtons.forEach(button => button.addEventListener('click', () => {
    billingButtons.forEach(b => b.classList.toggle('is-selected', b === button));
    const period = button.dataset.billing;
    document.querySelectorAll('.price strong[data-monthly]').forEach(price => {
      price.textContent = '$' + price.dataset[period];
    });
    document.querySelectorAll('.billing-note').forEach(note => {
      note.textContent = period === 'yearly' ? 'Per month · billed annually' : 'Billed monthly';
    });
  }));

  // Program rows support both pointer and keyboard activation.
  document.querySelectorAll('.program-row').forEach(row => {
    const activate = () => {
      document.querySelectorAll('.program-row').forEach(item => item.classList.toggle('is-active', item === row));
    };
    row.addEventListener('mouseenter', activate);
    row.addEventListener('focus', activate);
    row.addEventListener('click', activate);
  });

})();
