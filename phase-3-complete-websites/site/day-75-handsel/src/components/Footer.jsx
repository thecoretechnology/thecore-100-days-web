import { Link } from 'react-router-dom';
import { useState } from 'react';
import { ArrowUpRight, Instagram } from 'lucide-react';

export default function Footer() {
  return <footer className="site-footer">
    <div className="footer-top">
      <div><div className="footer-wordmark">Handsel<span>®</span></div><p>A working craft studio in Bristol.<br/>18 Kiln Yard, Stokes Croft.<br/>Come for an afternoon, stay for a season.</p></div>
      <div className="footer-links">
        <div><small>EXPLORE</small><Link to="/classes">Classes</Link><Link to="/schedule">Schedule</Link><Link to="/open-studio">Open studio</Link><Link to="/membership">Membership</Link><Link to="/gift-cards">Gift cards</Link></div>
        <div><small>THE STUDIO</small><Link to="/about">About</Link><Link to="/team">Our team</Link><Link to="/private-groups">Private groups</Link><Link to="/journal">Journal</Link><Link to="/visit">Visit us</Link></div>
        <div><small>SAY HELLO</small><a href="mailto:hello@handsel.studio">hello@handsel.studio <ArrowUpRight size={13}/></a><a href="https://instagram.com/handsel.studio" target="_blank" rel="noreferrer">Instagram <Instagram size={13}/></a><Link to="/faq">FAQs</Link></div>
      </div>
    </div>
    <div className="newsletter-strip"><div><small>A NOTE FROM THE STUDIO</small><h3>Good things, made slowly.</h3><p>Occasional notes on classes, makers and what’s happening at the bench.</p></div><Newsletter/></div>
    <div className="footer-bottom"><span>© 2026 Handsel Studio · Bristol, UK</span><span><Link to="/privacy">Privacy</Link><Link to="/terms">Terms</Link></span><span>Made with care <b>↗</b></span></div>
  </footer>;
}

function Newsletter() {
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const submit = event => {
    event.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError('Please enter a valid email address.'); return; }
    setError(''); setSubscribed(true); setEmail('');
  };
  return <div className="newsletter-wrap">
    <form className="newsletter" onSubmit={submit} noValidate>
      <label className="sr-only" htmlFor="newsletter-email">Email address</label>
      <input id="newsletter-email" name="email" type="email" autoComplete="email" required value={email} onChange={event => { setEmail(event.target.value); setError(''); }} placeholder="Your email address" aria-invalid={Boolean(error)} aria-describedby="newsletter-feedback"/>
      <button type="submit" aria-label="Subscribe to studio newsletter"><ArrowUpRight/></button>
    </form>
    <p id="newsletter-feedback" className="newsletter-success" role="status" aria-live="polite">{error || (subscribed ? 'Thank you — you’re on the list.' : '')}</p>
    <small className="newsletter-disclaimer">Studio notes only. Unsubscribe whenever you like.</small>
  </div>;
}
