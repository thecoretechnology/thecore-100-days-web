import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import {
  ArrowLeft, ArrowRight, ArrowUpRight, Award, BriefcaseBusiness, Check,
  Facebook, Gavel, HeartPulse, House, Instagram, Landmark, Mail, Menu,
  Phone, Scale, ShieldCheck, ShoppingCart, Star, Trophy, Users, X,
} from 'lucide-react';
import { lawyers, practiceAreas, testimonials, caseStudies, articles } from './data/content';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
const practiceIcons = { 'briefcase-business': BriefcaseBusiness, 'heart-pulse': HeartPulse, landmark: Landmark, users: Users, house: House, scale: Scale };
const navLinks = [['Home', '/'], ['About', '/about'], ['Lawyers', '/lawyers'], ['Practice Areas', '/practice-areas'], ['Case Studies', '/case-studies'], ['Blog', '/blog'], ['Contact', '/contact']];

function CourthouseMark({ size = 34 }) {
  return <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden="true" className="courthouse-mark"><path d="M4 11.5 20 3l16 8.5H4Z" fill="currentColor"/><path d="M8 14.5v18M16 14.5v18M24 14.5v18M32 14.5v18M4 35h32" stroke="currentColor" strokeWidth="1.45"/></svg>;
}
function Eyebrow({ children }) { return <div className="eyebrow">{children}</div>; }
function OutlineButton({ children, href = '#contact', onClick, type = 'button' }) {
  if (onClick) return <button type={type} className="outline-button" onClick={onClick}>{children}</button>;
  return <a className="outline-button" href={href}>{children}</a>;
}
function Header({ onCart }) {
  const [open, setOpen] = useState(false);
  const overlayRef = useRef(null);
  const menuItemsRef = useRef(null);
  useEffect(() => {
    document.body.classList.toggle('menu-open', open);
    if (open && overlayRef.current) {
      const items = menuItemsRef.current?.querySelectorAll('a');
      gsap.fromTo(overlayRef.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: .38, ease: 'power2.out' });
      gsap.fromTo(items, { y: 22, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: .62, stagger: .075, delay: .12, ease: 'power3.out' });
    }
    return () => document.body.classList.remove('menu-open');
  }, [open]);
  useEffect(() => {
    if (!open) return;
    const onKey = e => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);
  return <>
    <header className="site-header">
      <a href="/" className="brand-mark" aria-label="Lawyer Firm home"><CourthouseMark size={36}/></a>
      <div className="header-actions">
        <button className="icon-button cart-trigger" onClick={onCart} aria-label="Open cart"><ShoppingCart size={19} strokeWidth={2.1}/></button>
        <button className="icon-button menu-trigger" onClick={() => setOpen(true)} aria-label="Open navigation" aria-expanded={open}><Menu size={23} strokeWidth={1.8}/></button>
      </div>
    </header>
    {open && <div ref={overlayRef} className="menu-overlay" role="dialog" aria-modal="true" aria-label="Main navigation" onMouseDown={e => { if (e.target === e.currentTarget) setOpen(false); }}>
      <button className="close-menu" onClick={() => setOpen(false)} aria-label="Close navigation"><X size={25}/></button>
      <nav className="menu-inner" ref={menuItemsRef}><Eyebrow>Navigation</Eyebrow>{navLinks.map(([label, href], i) => <a key={href} href={href} onClick={() => setOpen(false)}><span>0{i + 1}</span>{label}<ArrowUpRight/></a>)}</nav>
    </div>}
  </>;
}
function Hero() {
  return <section className="hero" id="top"><div className="hero-visual"><img src="/assets/hero/lady-justice-reference.jpg" alt="Golden Lady Justice statue holding the scales of justice" fetchPriority="high"/><div className="hero-fade"/></div><div className="hero-copy"><div className="hero-emblem"><Gavel size={31} strokeWidth={1.5}/></div><Eyebrow>Law Firm</Eyebrow><h1 className="hero-title"><span>Expert Legal</span><span>Solutions</span></h1><p>We are committed to excellence and have a deep understanding of the law. Our aim is to provide you with real world solutions.</p><OutlineButton href="#about">Learn More</OutlineButton></div></section>;
}
function Awards() {
  const data = [[Award, <>Thomas Jefferson<br/>Foundation</>], [ShieldCheck, <>Gruber Prize for<br/>Justice</>], [Trophy, <>American Bar<br/>Association</>]];
  return <section className="awards" aria-label="Awards and recognition">{data.map(([Icon, label], i) => <div className="award" key={i}><div className="award-icon"><Icon size={25} strokeWidth={1.35}/></div><div className="eyebrow">{label}</div></div>)}</section>;
}
function About() {
  const values = [['Loyal', 'We stand beside our clients with commitment.', Scale], ['Trust', 'Built through clear advice and honest action.', ShieldCheck], ['Integrity', 'Principled counsel in every matter.', Check], ['Honesty', 'Straight answers and transparent guidance.', Landmark]];
  return <section className="about section-pad" id="about"><div className="about-heading reveal"><Eyebrow>Legal Advisors</Eyebrow><h2>Who We Are</h2><span className="gold-rule"/><p>Law Office is your reliable partner on the path to legal success. Whether you require assistance with business law, family law, estate planning, or any other legal matter.</p></div><div className="about-grid"><div className="values-grid">{values.map(([title, desc, Icon]) => <div className="value reveal" key={title}><div className="value-icon"><Icon size={22} strokeWidth={1.3}/></div><div><Eyebrow>{title}</Eyebrow><p>{desc}</p></div></div>)}<div className="founder-sign reveal"><Eyebrow>Founder</Eyebrow><div className="signature">Howard Marshall</div></div></div><div className="founder-image reveal"><img src="/assets/about/founder-reference.jpg" alt="Founder Howard Marshall seated in his law office" loading="lazy"/></div></div></section>;
}
function DetailDialog({ item, type, onClose }) {
  const closeButtonRef = useRef(null);
  useEffect(() => {
    if (!item) return;
    const previousFocus = document.activeElement;
    const onKey = e => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Tab') {
        const dialog = closeButtonRef.current?.closest('.detail-dialog');
        const focusable = dialog?.querySelectorAll('a[href],button:not([disabled]),input,textarea,[tabindex]:not([tabindex="-1"])');
        if (!focusable?.length) return;
        const first = focusable[0], last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.body.classList.add('dialog-open');
    window.addEventListener('keydown', onKey);
    requestAnimationFrame(() => closeButtonRef.current?.focus());
    return () => {
      document.body.classList.remove('dialog-open');
      window.removeEventListener('keydown', onKey);
      if (previousFocus && typeof previousFocus.focus === 'function') previousFocus.focus();
    };
  }, [item, onClose]);
  if (!item) return null;
  const isLawyer = type === 'lawyer';
  const image = item.image;
  return <div className="detail-backdrop" role="presentation" onMouseDown={e => { if (e.target === e.currentTarget) onClose(); }}><section className="detail-dialog" role="dialog" aria-modal="true" aria-label={`${item.title || item.name} details`}><button ref={closeButtonRef} className="detail-close icon-button" onClick={onClose} aria-label="Close details"><X/></button>{image && <div className="detail-image"><img src={image} alt=""/></div>}<div className="detail-copy"><Eyebrow>{isLawyer ? item.role : item.tag || type}</Eyebrow><h2>{item.title || item.name}</h2><p>{isLawyer ? (item.fullText || item.bio || `${item.name} is part of our experienced legal team, providing thoughtful advice, clear communication and focused representation for every client.`) : item.fullText || item.text || item.excerpt}</p>{isLawyer && <a className="text-link" href={`mailto:${item.email}`}>Email {item.name.split(' ')[0]} <span/></a>}{!isLawyer && <a className="text-link" href="#contact" onClick={onClose}>Discuss a similar matter <span/></a>}</div></section></div>;
}
function Lawyers({ onSelect }) {
  return <section className="lawyers section-pad" id="lawyers"><div className="section-title center reveal"><Eyebrow>Qualified Experts</Eyebrow><h2>Meet Our Lawyers</h2><p>Our attorneys combine deep legal knowledge with a practical, client-first approach.</p><OutlineButton href="#lawyer-grid">View All</OutlineButton></div><div className="lawyer-grid" id="lawyer-grid">{lawyers.map(person => <article className="lawyer-card reveal" key={person.name}><button className="lawyer-card-button" onClick={() => onSelect(person, 'lawyer')} aria-label={`View ${person.name}'s profile`}><div className="lawyer-photo"><img src={person.image} alt={person.name} loading="lazy"/></div><div className="lawyer-info"><h3>{person.name}</h3><Eyebrow>{person.role}</Eyebrow></div></button><a className="lawyer-email" href={`mailto:${person.email}`}>{person.email}</a><a className="profile-route-link" href={`/lawyers/${person.name.toLowerCase().replaceAll(' ', '-')}`}>Full profile <ArrowUpRight size={14}/></a><div className="socials"><a href="https://x.com/" target="_blank" rel="noreferrer" aria-label={`${person.name} on X`}>𝕏</a><a href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram size={16}/></a><a href="https://www.facebook.com/" target="_blank" rel="noreferrer" aria-label="Facebook"><Facebook size={16}/></a></div></article>)}</div></section>;
}
function Practice({ onSelect }) {
  const [active, setActive] = useState(1);
  const trackRef = useRef(null);
  const windowRef = useRef(null);
  const moveTo = index => setActive(Math.max(0, Math.min(practiceAreas.length - 1, index)));
  const positionTrack = (animate = true) => {
    const track = trackRef.current, viewport = windowRef.current;
    if (!track || !viewport) return;
    const slide = track.children[active];
    const maxX = Math.max(0, track.scrollWidth - viewport.clientWidth);
    const targetX = Math.min(slide?.offsetLeft || 0, maxX);
    if (animate && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.to(track, { x: -targetX, duration: .72, ease: 'power3.inOut', overwrite: true });
    } else {
      gsap.set(track, { x: -targetX });
    }
  };
  useEffect(() => { positionTrack(true); }, [active]);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => positionTrack(false));
    };
    window.addEventListener('resize', update, { passive: true });
    return () => { cancelAnimationFrame(frame); window.removeEventListener('resize', update); };
  }, [active]);
  return <section className="practice section-pad" id="practice"><div className="practice-head"><div className="section-title reveal"><Eyebrow>Services</Eyebrow><h2>Our Practice Areas</h2><p>We provide focused legal counsel across a range of personal and business matters.</p><OutlineButton href="#practice-list">View All</OutlineButton></div><div className="slider-controls"><button onClick={() => moveTo(active - 1)} aria-label="Previous practice area" disabled={active === 0}><ArrowLeft/></button><button onClick={() => moveTo(active + 1)} aria-label="Next practice area" disabled={active === practiceAreas.length - 1}><ArrowRight/></button></div></div><div className="practice-window" id="practice-list" ref={windowRef}><div className="practice-track" ref={trackRef}>{practiceAreas.map(([name, desc, icon]) => { const Icon = practiceIcons[icon] || Scale; return <article className="practice-card" key={name}><div className="practice-icon"><Icon size={29} strokeWidth={1.25}/></div><h3>{name}</h3><p>{desc}</p><a className="text-link" href={`/practice-areas/${name.toLowerCase().replaceAll(' ', '-')}`}>Learn More <span/></a></article>; })}</div></div><div className="slider-dots">{practiceAreas.map(([name], i) => <button key={name} className={active === i ? 'active' : ''} onClick={() => moveTo(i)} aria-label={`Show ${name}`} aria-pressed={active === i}/>)}</div></section>;
}
function CaseStudies({ onSelect }) {
  return <section className="cases section-pad" id="cases"><div className="section-title reveal"><Eyebrow>Success Stories</Eyebrow><h2>Our Case Studies</h2><p>Explore the strategy, dedication and outcomes behind our work for clients.</p><OutlineButton href="#case-grid">View All</OutlineButton></div><div className="case-grid" id="case-grid">{caseStudies.map((item, i) => <article className={`case-card case-${i + 1} reveal`} key={item.title}><div className="case-image"><img src={item.image} alt={item.title}/></div><div className="case-panel"><div className="case-tag">{item.tag}</div><div className="case-copy"><h3>{item.title}</h3><p>{item.text}</p><a className="text-link" href={`/case-studies/${i === 0 ? 'lawsuit-to-resolution' : 'corporate-compliance'}`}>Learn More <span/></a></div></div></article>)}</div></section>;
}
function Testimonials() {
  const [active, setActive] = useState(0);
  const item = testimonials[active];
  const testimonialRef = useRef(null);
  const [paused, setPaused] = useState(false);
  useEffect(() => { if (testimonialRef.current) gsap.fromTo(testimonialRef.current, { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: .55, ease: 'power2.out' }); }, [active]);
  useEffect(() => { if (paused) return; const timer = window.setInterval(() => setActive(v => (v + 1) % testimonials.length), 6500); return () => window.clearInterval(timer); }, [paused]);
  const choose = index => { setActive(index); setPaused(true); };
  return <section className="testimonials" aria-label="Client testimonials"><div className="testimonial-bg"/><div className="testimonial-content" ref={testimonialRef} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}><Eyebrow>Testimonials</Eyebrow><h2>Client Experiences</h2><p className="testimonial-quote">{item.quote}</p><div className="client"><img src={item.image} alt={item.name} loading="lazy"/><div><div className="stars">{[1,2,3,4,5].map(n => <Star key={n} size={16} fill="currentColor" strokeWidth={0}/>)}</div><Eyebrow>{item.name}</Eyebrow></div></div><div className="testimonial-controls">{testimonials.map((t, i) => <button key={t.name} onClick={() => choose(i)} className={active === i ? 'active' : ''} aria-label={`Show ${t.name} testimonial`} aria-pressed={active === i}/>)}</div></div></section>;
}
function Blog({ onSelect }) {
  return <section className="blog section-pad" id="blog"><div className="section-title reveal"><Eyebrow>Blog</Eyebrow><h2>Resources & Articles</h2><p>Read practical guidance and perspectives on the legal issues that matter.</p></div><div className="blog-grid" id="blog-grid">{articles.map((article, i) => <article className="blog-card reveal" key={article.title}><button className="blog-image" onClick={() => onSelect(article, 'article')} aria-label={`Read ${article.title}`}><img src={article.image} alt={article.title} loading="lazy"/></button><div className="blog-meta"><Eyebrow>{article.tag}</Eyebrow><span>{i === 0 ? 'Estate Planning' : 'Articles'}</span></div><button className="blog-title-button" onClick={() => onSelect(article, 'article')}><h3>{article.title}</h3></button><p>{article.excerpt}</p><div className="blog-bottom"><span>by {article.author}</span><a className="text-link" href={`/blog/${i === 0 ? 'estate-planning-for-small-business-owners' : 'importance-of-having-a-will'}`}>Read More <span/></a></div></article>)}</div></section>;
}
function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const update = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  const submit = e => {
    e.preventDefault(); setError(''); setSubmitted(false);
    if (!form.name.trim() || !form.email.trim() || !/^\S+@\S+\.\S+$/.test(form.email)) { setError('Please enter your name and a valid email address.'); return; }
    const subject = encodeURIComponent(`Consultation request from ${form.name}`);
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone || 'Not provided'}\n\nMessage:\n${form.message || 'I would like to request a consultation.'}`);
    window.location.href = `mailto:hello@lawyerfirm.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };
  return <section className="contact section-pad" id="contact"><div className="contact-inner"><div className="contact-copy reveal"><Eyebrow>Get In Touch</Eyebrow><h2>Request A Free Consultation</h2><p>We are committed to excellence and have a deep understanding of the law. Our aim is to provide you with real world solutions.</p><div className="contact-direct"><a href="tel:+123456789"><Phone size={15}/> +123 456789</a><a href="mailto:hello@lawyerfirm.com"><Mail size={15}/> hello@lawyerfirm.com</a></div></div><form className="contact-form reveal" onSubmit={submit} noValidate><label htmlFor="consult-name">Name</label><input id="consult-name" name="name" aria-invalid={Boolean(error && !form.name.trim())} value={form.name} onChange={update} placeholder="Your name" autoComplete="name" required/><label htmlFor="consult-email">Email</label><input id="consult-email" name="email" type="email" aria-invalid={Boolean(error && !/^\S+@\S+\.\S+$/.test(form.email))} value={form.email} onChange={update} placeholder="Your email address" autoComplete="email" required/><label htmlFor="consult-phone">Phone (optional)</label><input id="consult-phone" name="phone" type="tel" value={form.phone} onChange={update} placeholder="Your phone number" autoComplete="tel"/><label htmlFor="consult-message">How can we help? (optional)</label><textarea id="consult-message" name="message" value={form.message} onChange={update} placeholder="Tell us briefly about your matter" rows="3"/><button type="submit" aria-label="Send consultation request"><span>Send Request</span><ArrowUpRight size={20}/></button>{error && <p className="form-error" role="alert">{error}</p>}{submitted && <p className="form-success" role="status">Your email app should open with your consultation request ready to send.</p>}</form></div></section>;
}
function Footer() {
  return <footer className="footer"><div className="footer-top"><div className="footer-brand"><a href="/" className="brand-mark" aria-label="Back to home"><CourthouseMark size={36}/></a><h3>Lawyer Firm</h3><p>Your trusted legal partner, resolving complex matters with expertise and care.</p></div><div className="footer-col"><Eyebrow>Explore</Eyebrow><a href="/">Home</a><a href="/about">About</a><a href="/lawyers">Lawyers</a><a href="/practice-areas">Practice Areas</a><a href="/contact">Contact</a></div><div className="footer-col"><Eyebrow>More Pages</Eyebrow><a href="/practice-areas">Practice Areas</a><a href="/case-studies">Case Studies</a><a href="/blog">Blog</a><a href="/terms">Terms & Conditions</a><a href="/privacy">Privacy Policy</a></div><div className="footer-col"><Eyebrow>Utilities</Eyebrow><a href="/about">Our Firm</a><a href="/lawyers">Our Team</a><a href="/practice-areas">Services</a><a href="/case-studies">Results</a><a href="/contact">Get In Touch</a></div><div className="footer-col footer-contact"><Eyebrow>Contact</Eyebrow><p>XYZ Times Sq, New York,<br/>10036, United States</p><a href="tel:+123456789"><Phone size={14}/> +123 456789</a><a href="mailto:hello@lawyerfirm.com"><Mail size={14}/> hello@lawyerfirm.com</a></div></div><div className="footer-bottom"><span>© Lawyer Firm. All Rights Reserved.</span><span>Independent legal counsel</span><span>Designed with care</span></div></footer>;
}
function CartDrawer({ open, onClose }) {
  const drawerRef = useRef(null);
  useEffect(() => { if (open && drawerRef.current) { gsap.fromTo(drawerRef.current, { x: '100%' }, { x: '0%', duration: .55, ease: 'power3.out' }); gsap.fromTo('.drawer-backdrop', { autoAlpha: 0 }, { autoAlpha: 1, duration: .3 }); } }, [open]);
  useEffect(() => { if (!open) return; const onKey = e => { if (e.key === 'Escape') onClose(); }; document.body.classList.add('drawer-open'); window.addEventListener('keydown', onKey); return () => { document.body.classList.remove('drawer-open'); window.removeEventListener('keydown', onKey); }; }, [open, onClose]);
  if (!open) return null;
  return <div className="drawer-backdrop" onMouseDown={e => { if (e.target === e.currentTarget) onClose(); }}><aside ref={drawerRef} className="cart-drawer" aria-label="Your cart" role="dialog" aria-modal="true"><div className="drawer-head"><Eyebrow>Your Cart</Eyebrow><button className="icon-button" onClick={onClose} aria-label="Close cart"><X/></button></div><div className="empty-cart"><div className="empty-cart-icon"><ShoppingCart size={27}/></div><h4>No items found.</h4><p>Your cart is currently empty.</p><button className="outline-button" onClick={onClose}>Continue Browsing</button></div><div className="drawer-foot"><span>Subtotal</span><strong>$0.00</strong></div></aside></div>;
}

function PageIntro({ eyebrow, title, description }) {
  return <section className="inner-page-intro"><Eyebrow>{eyebrow}</Eyebrow><h1>{title}</h1><p>{description}</p><span className="gold-rule"/></section>;
}
function RoutePage({ path, onSelect }) {
  const pageMap = {
    '/about': { eyebrow: 'Legal Advisors', title: 'A Firm Built On Trust', description: 'Thoughtful counsel, principled advocacy and practical solutions for the matters that matter most.' },
    '/lawyers': { eyebrow: 'Qualified Experts', title: 'Meet Our Lawyers', description: 'Get to know the attorneys who bring experience, integrity and focus to every client relationship.' },
    '/practice-areas': { eyebrow: 'Our Services', title: 'Practice Areas', description: 'Focused legal guidance for individuals, families, healthcare professionals and businesses.' },
    '/case-studies': { eyebrow: 'Success Stories', title: 'Our Case Studies', description: 'A closer look at the challenges, strategies and thoughtful work behind representative matters.' },
    '/blog': { eyebrow: 'Legal Insights', title: 'Resources & Articles', description: 'Clear, practical perspectives to help you make informed decisions.' },
    '/contact': { eyebrow: 'Get In Touch', title: 'Let’s Discuss Your Matter', description: 'Tell us what you are navigating. Our team will help you understand the next steps.' },
    '/terms': { eyebrow: 'Information', title: 'Terms & Conditions', description: 'Please contact our office if you have questions about using this website.' },
    '/privacy': { eyebrow: 'Information', title: 'Privacy Policy', description: 'We respect your privacy. Contact our office for information about how inquiries are handled.' },
  };
  const page = pageMap[path];
  if (page) return <><PageIntro {...page}/>{path === '/about' && <><Awards/><About/></>}{path === '/lawyers' && <Lawyers onSelect={onSelect}/ >}{path === '/practice-areas' && <Practice onSelect={onSelect}/ >}{path === '/case-studies' && <CaseStudies onSelect={onSelect}/ >}{path === '/blog' && <Blog onSelect={onSelect}/ >}{path === '/contact' && <Contact/>}{(path === '/terms' || path === '/privacy') && <section className="section-pad legal-note"><h2>Important Notice</h2><p>This website provides general information and does not create an attorney-client relationship. Please do not send confidential information until an engagement has been agreed in writing.</p><a className="text-link" href="/contact">Contact the firm <span/></a></section>}</>;
  const detailRoutes = [
    ...lawyers.map((x,i)=>({path:`/lawyers/${['steve-edwards','john-smith','mary-johnson'][i]}`,item:x,type:'lawyer'})),
    ...practiceAreas.map(([title,text],i)=>({path:`/practice-areas/${['business-law','healthcare-law','corporate-law','family-law','real-estate-law','criminal-defense'][i]}`,item:{title,tag:'Practice Area',text},type:'practice area'})),
    ...caseStudies.map((x,i)=>({path:`/case-studies/${['lawsuit-to-resolution','corporate-compliance'][i]}`,item:x,type:'case study'})),
    ...articles.map((x,i)=>({path:`/blog/${['estate-planning-for-small-business-owners','importance-of-having-a-will'][i]}`,item:x,type:'article'})),
  ];
  const detail = detailRoutes.find(x=>x.path===path);
  if (detail) return <><PageIntro eyebrow={detail.type} title={detail.item.title || detail.item.name} description={detail.item.bio || detail.item.text || detail.item.excerpt || detail.item.fullText}/><section className="section-pad route-detail"><div className="route-detail-image">{detail.item.image && <img src={detail.item.image} alt={detail.item.title || detail.item.name}/>}</div><div><Eyebrow>{detail.item.role || detail.item.tag || 'Law Firm'}</Eyebrow><h2>{detail.item.title || detail.item.name}</h2><p>{detail.item.fullText || detail.item.bio || detail.item.text || detail.item.excerpt}</p>{detail.item.email && <a className="text-link" href={`mailto:${detail.item.email}`}>Email {detail.item.name} <span/></a>}<a className="outline-button route-cta" href="/contact">Request a Consultation</a></div></section></>;
  return <PageIntro eyebrow="404" title="Page Not Found" description="The page you are looking for may have moved. Explore the firm’s services or return to the homepage."/>;
}

export default function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const [pathname, setPathname] = useState(window.location.pathname.replace(/\/$/, '') || '/');
  const [loading, setLoading] = useState(true);
  const [detail, setDetail] = useState(null);
  const appRef = useRef(null);
  const loaderRef = useRef(null);
  const openDetail = (item, type) => setDetail({ item, type });
  const closeDetail = React.useCallback(() => setDetail(null), []);
  useEffect(() => { const sync = () => setPathname(window.location.pathname.replace(/\/$/, '') || '/'); window.addEventListener('popstate', sync); return () => window.removeEventListener('popstate', sync); }, []);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) { setLoading(false); return; }
    const tl = gsap.timeline({ onComplete: () => setLoading(false) });
    tl.fromTo('.loader-mark', { y: 12, autoAlpha: 0, scale: .94 }, { y: 0, autoAlpha: 1, scale: 1, duration: .65, ease: 'power3.out' }).fromTo('.loader-line span', { scaleX: 0 }, { scaleX: 1, duration: .8, ease: 'power2.inOut' }, '-=.2').to(loaderRef.current, { autoAlpha: 0, duration: .65, ease: 'power2.inOut' }, '+=.12');
    return () => tl.kill();
  }, []);
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const onAnchorClick = event => {
      const anchor = event.target.closest('a[href^="#"]');
      if (!anchor) return;
      const href = anchor.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      event.preventDefault();
      if (reduced) target.scrollIntoView({ behavior: 'auto', block: 'start' });
      else gsap.to(window, { duration: 1.05, scrollTo: { y: target, offsetY: 72, autoKill: true }, ease: 'power2.inOut', overwrite: 'auto' });
    };
    document.addEventListener('click', onAnchorClick);
    return () => document.removeEventListener('click', onAnchorClick);
  }, []);
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;
    const ctx = gsap.context(() => {
      const intro = gsap.timeline({ defaults: { ease: 'power3.out' }, delay: loading ? .15 : 0 });
      intro.fromTo('.hero-visual', { clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)', duration: 1.2 }).fromTo('.hero-visual img', { scale: 1.075, y: 18 }, { scale: 1, y: 0, duration: 1.45 }, '-=1.0').fromTo('.hero-emblem, .hero-copy > .eyebrow', { y: 18, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: .65, stagger: .12 }, '-=.72').fromTo('.hero-title span', { yPercent: 110, autoAlpha: 0, rotateX: -8 }, { yPercent: 0, autoAlpha: 1, rotateX: 0, duration: .82, stagger: .14, ease: 'power4.out' }, '-=.42').fromTo('.hero-copy > p', { y: 18, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: .72 }, '-=.38').fromTo('.hero-copy .outline-button', { y: 12, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: .6 }, '-=.32');
      gsap.utils.toArray('.reveal:not(.lawyer-card):not(.value)').forEach(el => gsap.fromTo(el, { y: 30, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: .85, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 87%', once: true } }));
      gsap.utils.toArray('.lawyer-card').forEach((el, i) => gsap.fromTo(el, { y: 42, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: .85, delay: i * .12, ease: 'power3.out', scrollTrigger: { trigger: el.parentElement, start: 'top 82%', once: true } }));
      gsap.utils.toArray('.founder-image, .lawyer-photo, .case-image, .blog-image').forEach(el => gsap.fromTo(el, { clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)', duration: 1.05, ease: 'power3.inOut', scrollTrigger: { trigger: el, start: 'top 88%', once: true } }));
      gsap.utils.toArray('.award, .value, .practice-card').forEach(el => gsap.fromTo(el, { y: 20, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: .7, ease: 'power2.out', scrollTrigger: { trigger: el.parentElement, start: 'top 88%', once: true }, delay: gsap.utils.toArray(el.parentElement.children).indexOf(el) * .07 }));
      gsap.fromTo('.testimonial-bg', { yPercent: -4, scale: 1.06 }, { yPercent: 4, scale: 1.06, ease: 'none', scrollTrigger: { trigger: '.testimonials', start: 'top bottom', end: 'bottom top', scrub: .7 } });
      gsap.fromTo('.footer-top > *', { y: 24, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: .75, stagger: .09, ease: 'power2.out', scrollTrigger: { trigger: '.footer', start: 'top 88%', once: true } });
    }, appRef);
    return () => ctx.revert();
  }, [loading]);
  return <div ref={appRef}>
    {loading && <div className="cinematic-loader" ref={loaderRef} aria-label="Loading Law Firm website"><div className="loader-mark"><CourthouseMark size={45}/><span>LAW FIRM</span></div><div className="loader-line"><span/></div></div>}
    <Header onCart={() => setCartOpen(true)}/><main>{pathname === '/' ? <><Hero/><Awards/><About/><Lawyers onSelect={openDetail}/><Practice onSelect={openDetail}/><CaseStudies onSelect={openDetail}/><Testimonials/><Blog onSelect={openDetail}/><Contact/></> : <RoutePage path={pathname} onSelect={openDetail}/>}</main><Footer/><CartDrawer open={cartOpen} onClose={() => setCartOpen(false)}/><DetailDialog item={detail?.item} type={detail?.type} onClose={closeDetail}/>
  </div>;
}
