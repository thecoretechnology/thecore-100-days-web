import { useEffect, useRef, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ArrowUpRight, X, ChevronDown } from 'lucide-react';
import { PillButton } from './UI';

const groups = [
  { title: 'Explore', links: [['The studio','/about'],['All classes','/classes'],['Class schedule','/schedule'],['Open studio','/open-studio']] },
  { title: 'Four crafts', links: [['Ceramics','/classes/ceramics'],['Printmaking','/classes/printmaking'],['Textiles','/classes/textiles'],['Jewellery','/classes/jewellery']] },
  { title: 'More from Handsel', links: [['Membership','/membership'],['Private groups','/private-groups'],['Gift cards','/gift-cards'],['Our team','/team'],['Journal','/journal'],['Visit','/visit'],['FAQs','/faq']] }
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [craftsOpen, setCraftsOpen] = useState(false);
  const triggerRef = useRef(null);
  useEffect(() => {
    document.body.classList.toggle('menu-open', open);
    if (!open) setCraftsOpen(false);
    return () => document.body.classList.remove('menu-open');
  }, [open]);
  useEffect(() => {
    if (!open) return;
    const onKey = event => { if (event.key === 'Escape') { setOpen(false); triggerRef.current?.focus(); } };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);
  const close = () => setOpen(false);

  return <>
    <header className="site-header">
      <button ref={triggerRef} className="menu-trigger" onClick={() => setOpen(true)} aria-label="Open navigation menu" aria-expanded={open} aria-controls="site-navigation"><span className="menu-lines"><i/><i/></span><span>MENU</span></button>
      <Link to="/" className="brand-mark" aria-label="Handsel home"><span className="brand-orbit">◉</span></Link>
      <div className="header-actions">
        <div className="header-dropdown">
          <button className="header-dropdown-trigger" aria-expanded={craftsOpen} onClick={() => setCraftsOpen(value => !value)}>Disciplines <ChevronDown size={13}/></button>
          {craftsOpen && <nav className="header-dropdown-menu" aria-label="Craft disciplines">{groups[1].links.map(([label,to]) => <NavLink key={to} to={to} onClick={() => setCraftsOpen(false)}>{label}<ArrowUpRight size={13}/></NavLink>)}</nav>}
        </div>
        <PillButton href="/classes">Browse classes</PillButton>
      </div>
    </header>
    {open && <div className="menu-overlay" id="site-navigation" role="dialog" aria-modal="true" aria-label="Site navigation">
      <div className="menu-top"><button className="menu-trigger" onClick={close} aria-label="Close navigation menu"><X size={19}/> CLOSE</button><Link to="/" onClick={close} className="brand-orbit" aria-label="Handsel home">◉</Link><span className="menu-location">BRISTOL · SINCE 2014</span></div>
      <div className="menu-content"><div className="menu-index">Explore Handsel</div>
        <nav className="menu-groups">{groups.map((group,index) => <div className="menu-group" key={group.title}><small className="menu-group-title">0{index+1} / {group.title}</small>{group.links.map(([label,to],i) => <NavLink key={to} to={to} onClick={close}><span>{label}</span><ArrowUpRight className="menu-arrow" size={15}/></NavLink>)}</div>)}</nav>
        <div className="menu-bottom"><span>Made by hand, four ways.</span><span><a href="https://instagram.com/handsel.studio" target="_blank" rel="noreferrer">Instagram ↗</a> &nbsp; hello@handsel.studio</span></div>
      </div>
    </div>}
  </>;
}
