const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

const menuButton = $('.menu-button');
const mobileNav = $('.mobile-nav');
menuButton?.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  mobileNav.classList.toggle('is-open', open);
  document.body.classList.toggle('menu-open', open);
});
$$('.mobile-nav a').forEach((link) => link.addEventListener('click', () => {
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open menu');
  mobileNav.classList.remove('is-open');
  document.body.classList.remove('menu-open');
}));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px' });
$$('.reveal').forEach((element) => revealObserver.observe(element));

const demos = {
  writer: {
    name: 'Writer', image: 'assets/writer.webp', prompt: 'Can you turn these meeting notes into a launch post?',
    reply: 'Done. Three versions: punchy, friendly and formal. The friendly one opens with your customer’s quote.',
    responses: ['I turned that into a crisp draft in your voice. Want a shorter version too?', 'Drafted. I also made a punchier option for social.', 'Done — clear, warm and ready for your review.']
  },
  helper: {
    name: 'Helper', image: 'assets/helper.webp', prompt: 'A customer says their invoice is wrong.',
    reply: 'Found it. They were billed twice on May 3. I’ve drafted a refund and a short apology for you to approve.',
    responses: ['I found the issue and drafted a kind reply. Nothing will be sent until you approve it.', 'Sorted. I’ve prepared the answer and flagged the account for review.', 'I can help with that. Here’s a calm, useful response for your approval.']
  },
  analyst: {
    name: 'Analyst', image: 'assets/analyst.webp', prompt: 'Why did sign-ups dip last week?',
    reply: 'Most of the drop came from mobile traffic after the campaign ended. Returning visitors stayed steady.',
    responses: ['The biggest change is mobile conversion. I’ve highlighted the likely cause and next check.', 'I compared the trend with the previous four weeks and found one clear outlier.', 'The short answer: traffic held up, conversion fell. I can break it down by channel.']
  }
};
let activeAgent = 'writer';
const messages = $('#chat-messages');
const input = $('#chat-input');
const mascot = $('#demo-mascot');

function renderDemo(agentKey) {
  if (!messages || !input || !mascot || !demos[agentKey]) return;
  activeAgent = agentKey;
  const demo = demos[agentKey];
  messages.innerHTML = `<p class="message user">${demo.prompt}</p><p class="message agent">${demo.reply}</p>`;
  input.placeholder = `Ask ${demo.name} anything…`;
  mascot.src = demo.image;
  mascot.alt = `${demo.name} robot`;
  $$('.chat-tab').forEach((tab) => {
    const selected = tab.dataset.agent === agentKey;
    tab.classList.toggle('is-active', selected);
    tab.setAttribute('aria-selected', String(selected));
  });
}
$$('.chat-tab').forEach((tab) => tab.addEventListener('click', () => renderDemo(tab.dataset.agent)));
if (messages && input && mascot) renderDemo(activeAgent);

$('#chat-form')?.addEventListener('submit', (event) => {
  event.preventDefault();
  const text = input.value.trim();
  if (!text) {
    input.focus();
    return;
  }
  const userMessage = document.createElement('p');
  userMessage.className = 'message user';
  userMessage.textContent = text;
  messages.append(userMessage);
  input.value = '';
  const thinking = document.createElement('p');
  thinking.className = 'message agent thinking';
  thinking.textContent = `${demos[activeAgent].name} is thinking…`;
  messages.append(thinking);
  messages.scrollTop = messages.scrollHeight;
  window.setTimeout(() => {
    const options = demos[activeAgent].responses;
    thinking.textContent = options[Math.floor(Math.random() * options.length)];
    thinking.classList.remove('thinking');
    messages.scrollTop = messages.scrollHeight;
  }, 650);
});

$$('.billing button').forEach((button) => button.addEventListener('click', () => {
  const annual = button.dataset.period === 'annual';
  $$('.billing button').forEach((item) => {
    const selected = item === button;
    item.classList.toggle('is-active', selected);
    item.setAttribute('aria-checked', String(selected));
  });
  $$('[data-monthly]').forEach((price) => {
    price.animate([{ opacity: 0.2, transform: 'translateY(5px)' }, { opacity: 1, transform: 'none' }], { duration: 240 });
    price.textContent = annual ? price.dataset.annual : price.dataset.monthly;
  });
  $$('[data-billing-label]').forEach((label) => { label.textContent = annual ? 'Billed annually' : 'Billed monthly'; });
}));

const steps = $$('.step');
const journeyRobot = $('.journey-robot');
const journeyStops = $$('.journey-stop');
const processSection = $('.process');
let currentJourneyStep = 0;
let journeyScrollLockedUntil = 0;
const journeyScrollReadyAt = Date.now() + 1000;

function setJourneyStep(index) {
  const next = Math.max(0, Math.min(steps.length - 1, index));
  currentJourneyStep = next;
  steps.forEach((item, itemIndex) => {
    const selected = itemIndex === next;
    item.classList.toggle('is-active', selected);
    item.setAttribute('aria-pressed', String(selected));
  });
  journeyStops.forEach((stop, stopIndex) => stop.classList.toggle('is-active', stopIndex === next));
  if (journeyRobot) journeyRobot.className = `journey-robot is-step-${next + 1}`;
}

steps.forEach((step) => {
  step.tabIndex = 0;
  step.setAttribute('role', 'button');
  const selectStep = () => setJourneyStep(Number(step.dataset.step));
  step.addEventListener('click', selectStep);
  step.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      selectStep();
    }
  });
});
setJourneyStep(0);

let journeyFrame = 0;
function syncJourneyToScroll() {
  journeyFrame = 0;
  if (!processSection || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (Date.now() < journeyScrollReadyAt) return;
  const rect = processSection.getBoundingClientRect();
  const travel = Math.max(rect.height - window.innerHeight * 0.35, 1);
  const progress = Math.max(0, Math.min(1, (window.innerHeight * 0.52 - rect.top) / travel));
  const target = progress < 0.55 ? 0 : progress < 0.87 ? 1 : 2;
  if (target === currentJourneyStep || Date.now() < journeyScrollLockedUntil) return;
  journeyScrollLockedUntil = Date.now() + 800;
  setJourneyStep(currentJourneyStep + Math.sign(target - currentJourneyStep));
}
window.addEventListener('scroll', () => {
  if (!journeyFrame) journeyFrame = window.requestAnimationFrame(syncJourneyToScroll);
}, { passive: true });

$$('.faq-list details').forEach((detail) => detail.addEventListener('toggle', () => {
  if (!detail.open) return;
  $$('.faq-list details').forEach((other) => { if (other !== detail) other.open = false; });
}));

const waitlist = $('#waitlist-form');
waitlist?.addEventListener('submit', (event) => {
  event.preventDefault();
  const status = $('.form-status', waitlist);
  const name = waitlist.elements.name;
  const email = waitlist.elements.email;
  let valid = true;
  [[name, 'Please enter your name.'], [email, 'Enter a valid work email.']].forEach(([field, message]) => {
    const isValid = field === email ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value.trim()) : field.value.trim().length >= 2;
    field.setAttribute('aria-invalid', String(!isValid));
    field.nextElementSibling.textContent = isValid ? '' : message;
    valid &&= isValid;
  });
  if (!valid) {
    status.textContent = 'Please check the highlighted fields.';
    status.className = 'form-status error';
    $('[aria-invalid="true"]', waitlist)?.focus();
    return;
  }
  status.textContent = 'You’re on the demo waitlist — no data was sent anywhere.';
  status.className = 'form-status success';
  waitlist.reset();
  $$('input', waitlist).forEach((field) => field.removeAttribute('aria-invalid'));
});

$$('.waitlist-form input').forEach((field) => field.addEventListener('input', () => {
  field.removeAttribute('aria-invalid');
  if (field.nextElementSibling) field.nextElementSibling.textContent = '';
}));
