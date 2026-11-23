export const asset = (name) => `${import.meta.env.BASE_URL}assets/${name}`

export const heroVideo = 'https://framerusercontent.com/assets/tOAt7OT4gybm6iDaGLGgDiOzvyk.mp4'
export const processVideo = 'https://framerusercontent.com/assets/NVT2kPFmyCsujwFdVZOuG2AmP0.mp4'

export const disciplines = [
  ['01', 'Brand Systems', 'Identity, voice, guidelines'],
  ['02', 'Product Design', 'UX, UI, design systems'],
  ['03', 'Web Experiences', 'Narrative, motion, craft'],
  ['04', 'Design Engineering', 'Front end, prototypes, handoff'],
  ['05', 'Art Direction', 'Image, tone, taste'],
]

export const processSteps = [
  ['01', 'Listen', 'Two weeks of questions before a single answer. Interviews, audits, and everything you have already written.'],
  ['02', 'Reduce', 'We remove early, while removing is still cheap. One sentence has to survive the cut.'],
  ['03', 'Shape', 'Form arrives once the thinking is honest. Type, grid, colour and motion are chosen together, never in sequence.'],
  ['04', 'Build', 'Design and code grow in the same week. You review real screens on real devices, not pictures of screens.'],
  ['05', 'Release', 'We hand it over and stay close for one season. Then we let go, because the work belongs to you now.'],
]

export const projects = [
  {
    slug: 'solace', number: '01', title: 'Solace', year: '2025', cover: 'solace-cover.avif',
    summary: 'A care platform that had to feel calm at three in the morning.', disciplines: 'Product design, front end',
    client: 'Solace Health', sector: 'Healthcare', launched: 'Mar 18, 2025',
    intro: 'Solace is used most at the hours when nobody is at their best. The brief was never to add features. It was to remove every decision a tired person should not have to make.',
    heading: 'What we changed',
    body: 'One task per screen, a palette that holds up on a dimmed display, and a rhythm of confirmations that never asks for a second look. Everything else moved behind a single quiet menu.',
    close: 'The result is a product that does less on purpose, and does it at three in the morning.',
    result: 'Night shift task completion rose 34 percent in the first quarter.',
    images: ['solace-01.webp', 'solace-02.webp', 'solace-03.jpg'],
    alts: ['Low light interior of a quiet care room', 'Hands resting in soft lamplight', 'A hand resting on dark textile'],
  },
  {
    slug: 'roasters', number: '02', title: 'Roasters', year: '2025', cover: 'roasters-cover.avif',
    summary: 'Transforming a simple cup of coffee into a brand experience.', disciplines: 'Design system, product',
    client: 'Terra Nova Coffee', sector: 'Hospitality', launched: 'Sep 2, 2025',
    intro: 'Terra Nova Coffee Roasters was created to reposition an artisanal coffee brand with a premium identity that blends craftsmanship, authenticity, and modern design.',
    heading: 'From bean to ritual',
    body: 'The project included brand strategy, visual identity, packaging design, environmental graphics, and creative direction across physical and digital touchpoints.',
    close: 'Every element communicates quality, warmth and authenticity while establishing a distinctive presence in a crowded specialty coffee market.',
    result: 'One system, forty two screens, no one off components.',
    images: ['roasters-01.avif', 'roasters-02.jpg', 'roasters-03.jpeg'],
    alts: ['Coffee on a dark wooden table', 'Premium coffee packaging', 'Hands preparing coffee'],
  },
  {
    slug: 'slowroom', number: '03', title: 'Slowroom', year: '2024', cover: 'slowroom-cover.avif',
    summary: 'Furniture commerce with one product per page and nothing competing with it.', disciplines: 'Art direction, web',
    client: 'Slowroom', sector: 'Commerce', launched: 'Nov 7, 2024',
    intro: 'Slowroom sells fewer things than everyone it competes with, and wanted the site to say so without saying so.',
    heading: 'One product, one page',
    body: 'No grids of thumbnails, no related items, no urgency banners. A single object photographed the way it sits in a real room, and a paragraph about what it is made of and who made it.',
    close: 'People stayed longer and sent less back.',
    result: 'Time spent on a product page tripled. Returns fell.',
    images: ['slowroom-01.webp', 'slowroom-02.webp', 'slowroom-03.webp'],
    alts: ['Single chair in a dark studio', 'Minimal furniture against a shadowed wall', 'Wooden surface in raking light'],
  },
  {
    slug: 'vessel', number: '04', title: 'Vessel', year: '2024', cover: 'vessel-cover.avif',
    summary: 'Banking for people who dislike banking apps. A tone of voice that never raises itself.', disciplines: 'Brand, product, voice',
    client: 'Vessel', sector: 'Fintech', launched: 'May 21, 2024',
    intro: 'Vessel is a bank for people who have deleted at least one banking app in anger.',
    heading: 'A voice that stays level',
    body: 'We wrote the interface before we designed it. No exclamation marks, no congratulation screens, no red unless something is genuinely wrong. Balances are set in tabular figures so a number never jitters while it updates.',
    close: 'Half of all support tickets used to be about wording. Now they are not.',
    result: 'Support tickets about wording dropped by half.',
    images: ['vessel-01.webp', 'vessel-02.webp', 'vessel-03.webp'],
    alts: ['Concrete facade in flat evening light', 'Quiet architectural corner in shadow', 'Minimal interior with a long dark line'],
  },
]
