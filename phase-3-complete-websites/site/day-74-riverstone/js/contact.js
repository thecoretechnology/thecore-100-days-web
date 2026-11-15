(() => {
  'use strict';

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const setError = (field, message) => {
    const error = document.getElementById(`${field.id.replace('contact', '').replace(/^./, c => c.toLowerCase())}Error`);
    field.setAttribute('aria-invalid', message ? 'true' : 'false');
    if (error) error.textContent = message;
    return !message;
  };

  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    const fields = {
      contactName: value => value.trim().length >= 2 ? '' : 'Please enter your full name (at least 2 characters).',
      contactEmail: value => emailPattern.test(value.trim()) ? '' : 'Please enter a valid email address.',
      contactSubject: value => value.trim().length >= 3 ? '' : 'Please add a short subject (at least 3 characters).',
      contactMessage: value => value.trim().length >= 10 ? '' : 'Please write a message of at least 10 characters.'
    };
    Object.keys(fields).forEach(id => {
      const field = document.getElementById(id);
      field.addEventListener('blur', () => setError(field, fields[id](field.value)));
      field.addEventListener('input', () => {
        if (field.getAttribute('aria-invalid') === 'true') setError(field, fields[id](field.value));
      });
    });

    contactForm.addEventListener('submit', event => {
      event.preventDefault();
      const status = document.getElementById('contactFormStatus');
      let valid = true;
      let firstInvalid = null;
      Object.entries(fields).forEach(([id, validate]) => {
        const field = document.getElementById(id);
        const fieldValid = setError(field, validate(field.value));
        if (!fieldValid) { valid = false; firstInvalid ||= field; }
      });
      if (!valid) {
        status.textContent = 'A few details need your attention. Please check the highlighted fields.';
        status.classList.remove('is-success');
        firstInvalid?.focus();
        return;
      }

      const name = document.getElementById('contactName').value.trim();
      status.textContent = `Thank you, ${name}. Your enquiry has passed validation and is ready for the RIVERSTONE management inbox. This preview does not send or store messages; connect a form endpoint to enable delivery.`;
      status.classList.add('is-success');
      contactForm.classList.add('is-submitted');
      contactForm.reset();
      Object.keys(fields).forEach(id => {
        const field = document.getElementById(id);
        field.setAttribute('aria-invalid', 'false');
      });
    });
  }

  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    const email = document.getElementById('newsletterEmail');
    const status = document.getElementById('newsletterStatus');
    newsletterForm.addEventListener('submit', event => {
      event.preventDefault();
      if (!emailPattern.test(email.value.trim())) {
        email.setAttribute('aria-invalid', 'true');
        status.textContent = 'Please enter a valid email address to continue.';
        status.classList.remove('is-success');
        email.focus();
        return;
      }
      email.setAttribute('aria-invalid', 'false');
      status.textContent = 'You’re on the list in this preview. Connect a newsletter provider to save subscriptions.';
      status.classList.add('is-success');
      newsletterForm.reset();
    });
    email.addEventListener('input', () => {
      if (email.getAttribute('aria-invalid') === 'true') {
        email.setAttribute('aria-invalid', 'false');
        status.textContent = '';
      }
    });
  }
})();
