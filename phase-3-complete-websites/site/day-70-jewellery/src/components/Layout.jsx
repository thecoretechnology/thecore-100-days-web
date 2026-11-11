import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, ShoppingBag, ChevronDown, ArrowUpRight, Plus, Minus, Trash2, Instagram, Facebook } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { money, referenceAssets } from '../data/store';

export function Announcement() {
  const message = <><span>Flat 30 % Sale Going On Selected Products.</span><Link to="/#signature">View Products <ArrowUpRight size={12}/></Link></>;
  return <div className="announcement" aria-label="Flat 30 percent sale on selected products"><div className="announcement-track" aria-hidden="true">{Array.from({length:5},(_,i)=><div className="announcement-item" key={i}>{message}</div>)}</div><div className="sr-only">Flat 30 % Sale Going On Selected Products. <Link to="/#signature">View Products</Link></div></div>;
}

export function Header() {
  const [menu, setMenu] = useState(false);
  const [drop, setDrop] = useState(false);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 760);
  const cart = useCart();
  const location = useLocation();

  useEffect(() => { setMenu(false); setDrop(false); }, [location.pathname, location.hash]);
  useEffect(() => { const resize = () => setIsMobile(window.innerWidth <= 760); window.addEventListener('resize', resize); return () => window.removeEventListener('resize', resize); }, []);
  useEffect(() => {
    if (!menu) return undefined;
    const closeOnEscape = (event) => { if (event.key === 'Escape') setMenu(false); };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [menu]);

  const closeMenu = () => { setMenu(false); setDrop(false); };
  return <>
    <header className="header">
      <Link to="/" className="brand" aria-label="Jewelleryz home">jewellery<span>z.</span></Link>
      <motion.nav className={menu ? 'nav nav-open' : 'nav'} initial={false}
        animate={menu ? 'open' : 'closed'}
        variants={{ open: { opacity: 1, y: 0, height: 'auto', transition: { duration: .32, ease: [.22, 1, .36, 1], staggerChildren: .035, delayChildren: .025 } }, closed: { opacity: 0, y: -8, height: 0, transition: { duration: .22 } } }}
        aria-label="Main navigation" aria-hidden={isMobile && !menu} inert={isMobile && !menu}>
        <NavLink to="/" onClick={closeMenu}>Home</NavLink>
        <div className="nav-dropdown" onMouseEnter={() => { if (window.innerWidth > 760) setDrop(true); }} onMouseLeave={() => { if (window.innerWidth > 760) setDrop(false); }}>
          <button type="button" aria-expanded={drop} onClick={() => setDrop((value) => !value)}>Collections <ChevronDown size={13}/></button>
          <AnimatePresence>
            {drop && <motion.div className="dropdown" initial={{ opacity: 0, y: 8, scale: .98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 6, scale: .98 }} transition={{ duration: .22 }}>
              {['Wedding Style', 'Casual Collection', 'Essential Style'].map((name) => <Link key={name} to="/#collections" onClick={closeMenu}>{name}</Link>)}
            </motion.div>}
          </AnimatePresence>
        </div>
        {['Rings', 'Ear Rings', 'Necklace', 'Bracelets'].map((name) => <NavLink key={name} to={'/category/' + name.toLowerCase().replace(' ', '-')} onClick={closeMenu}>{name}</NavLink>)}
        <NavLink to="/contact" onClick={closeMenu}>Contact Us</NavLink>
      </motion.nav>
      <div className="head-actions">
        <button className="cart-trigger" type="button" onClick={() => cart.setOpen(true)} aria-label={`Open cart, ${cart.count} items`}>
          <ShoppingBag size={19}/><span aria-live="polite">{cart.count}</span>
        </button>
        <button className="menu-trigger" type="button" onClick={() => setMenu((value) => !value)} aria-label={menu ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={menu}>{menu ? <X/> : <Menu/>}</button>
      </div>
    </header>
    <CartDrawer/>
  </>;
}

export function CartDrawer() {
  const cart = useCart();
  useEffect(() => {
    if (!cart.open) return undefined;
    const onKeyDown = (event) => { if (event.key === 'Escape') cart.setOpen(false); };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [cart.open, cart.setOpen]);

  return <AnimatePresence>
    {cart.open && <>
      <motion.button type="button" className="scrim" aria-label="Close cart" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => cart.setOpen(false)}/>
      <motion.aside className="cart-drawer" role="dialog" aria-modal="true" aria-label="Shopping cart" initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 28, stiffness: 260 }}>
        <div className="drawer-head"><div><small>YOUR BAG</small><h3>Your Cart <span>({cart.count})</span></h3></div><button className="icon-btn" type="button" onClick={() => cart.setOpen(false)} aria-label="Close cart"><X/></button></div>
        <div className="drawer-items">
          {cart.items.length === 0 ? <div className="empty-cart"><ShoppingBag size={30}/><p>Your bag is currently empty.</p><button className="button button-dark" type="button" onClick={() => cart.setOpen(false)}>Continue shopping</button></div> : cart.items.map((item) => <div className="cart-line" key={item.id}>
            <Link to={'/product/' + item.id} onClick={() => cart.setOpen(false)}><img src={item.image} alt={item.alt || item.name}/></Link>
            <div className="cart-line-info"><Link to={'/product/' + item.id} onClick={() => cart.setOpen(false)}><b>{item.name}</b></Link><span>{money(item.price)}</span>
              <div className="qty-control"><button type="button" aria-label={`Decrease ${item.name} quantity`} onClick={() => cart.update(item.id, item.qty - 1)}><Minus size={12}/></button><span aria-live="polite">{item.qty}</span><button type="button" aria-label={`Increase ${item.name} quantity`} onClick={() => cart.update(item.id, item.qty + 1)}><Plus size={12}/></button><button className="remove" type="button" aria-label={`Remove ${item.name}`} onClick={() => cart.remove(item.id)}><Trash2 size={14}/></button></div>
            </div>
          </div>)}
        </div>
        {cart.items.length > 0 && <div className="drawer-bottom"><div className="subtotal"><span>Subtotal</span><b>{money(cart.subtotal)} USD</b></div><p>Shipping and taxes calculated at checkout.</p><Link className="button button-dark full" to="/checkout" onClick={() => cart.setOpen(false)}>Continue to Checkout <ArrowUpRight size={15}/></Link><button className="drawer-continue" type="button" onClick={() => cart.setOpen(false)}>Continue shopping</button></div>}
      </motion.aside>
    </>}
  </AnimatePresence>;
}

function NewsletterForm() {
  const [status, setStatus] = useState('');
  const [email, setEmail] = useState('');
  const submit = (event) => {
    event.preventDefault();
    if (!event.currentTarget.reportValidity()) return;
    try {
      const subscribers = JSON.parse(localStorage.getItem('jz-newsletter') || '[]');
      if (subscribers.includes(email.trim().toLowerCase())) { setStatus('You are already on our list.'); return; }
      localStorage.setItem('jz-newsletter', JSON.stringify([...subscribers, email.trim().toLowerCase()]));
      setStatus('Thank you for subscribing.');
      setEmail('');
    } catch { setStatus('Subscription could not be saved in this browser. Please try again.'); }
  };
  return <form className="newsletter-form" onSubmit={submit}>
    <label htmlFor="newsletter-email">Join our newsletter</label>
    <div><input id="newsletter-email" type="email" required maxLength="254" autoComplete="email" placeholder="Your email address" value={email} onChange={(event) => { setEmail(event.target.value); setStatus(''); }}/><button type="submit" aria-label="Subscribe to newsletter"><ArrowUpRight size={16}/></button></div>
    {status && <p className="newsletter-status" role="status">{status}</p>}
  </form>;
}

export function Footer() {
  return <footer className="footer"><div className="footer-gallery" aria-label="Jewellery editorial gallery">{referenceAssets.footerGallery.map((image,index)=><img src={image} alt="Jewellery editorial" loading="lazy" key={image}/>)}</div><div className="footer-top">
    <div className="footer-brand"><Link to="/" className="brand brand-light">jewellery<span>z.</span></Link><p>Everyday elegance, made unforgettable. Discover considered pieces designed to be treasured.</p><div className="socials"><a href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram size={16}/></a><a href="https://www.pinterest.com/" target="_blank" rel="noreferrer" aria-label="Pinterest">P</a><a href="https://www.facebook.com/" target="_blank" rel="noreferrer" aria-label="Facebook"><Facebook size={16}/></a></div></div>
    <div><h4>Explore</h4><Link to="/">Home</Link><Link to="/#collections">Collections</Link><Link to="/about">Our Story</Link><Link to="/blog">Journal</Link><Link to="/faq">FAQs</Link><Link to="/size-guide">Size Guide</Link></div>
    <div><h4>Shop</h4><Link to="/category/rings">Rings</Link><Link to="/category/ear-rings">Ear Rings</Link><Link to="/category/necklace">Necklace</Link><Link to="/category/bracelets">Bracelets</Link><Link to="/jewellery-care">Jewellery Care</Link><Link to="/shipping-returns">Shipping & Returns</Link></div>
    <div><h4>Get In Touch</h4><span className="footer-label">Mail Us</span><a href="mailto:jewelleryz@nexoy.com">jewelleryz@nexoy.com</a><span className="footer-label">Call Us</span><a href="tel:+14155550022">(415) 555-0XX2</a><span className="footer-label">Address</span><span>North Carolina, USA</span><NewsletterForm/></div>
  </div><div className="footer-bottom"><span>© Jewelleryz. All rights reserved.</span><span>Designed with intention · <Link to="/privacy">Privacy</Link> · <Link to="/terms">Terms</Link></span></div></footer>;
}

export function SiteLayout({ children }) { return <><Announcement/><Header/>{children}<Footer/></>; }
