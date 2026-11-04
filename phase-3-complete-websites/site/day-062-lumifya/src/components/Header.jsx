import React,{useEffect,useState}from'react';
import{Link,useLocation}from'react-router-dom';
import{ArrowUpRight,Menu,X,ShoppingCart}from'lucide-react';

const logo='https://cdn.prod.website-files.com/69d62bbcbf9a56f0284fdb53/69d73be95a0b872ddf88c4ab_11a4e2b73a5f4244b3fdad264a4774f1_Header-Logo.svg';
const items=[['Home','/','01'],['About','/about','02'],['Services','/services','03'],['Projects','/projects','04'],['Blogs','/blogs','05'],['Contact','/contact','06'],['Pricing','/pricing','07']];

export default function Header(){
  const[open,setOpen]=useState(false);
  const[cartOpen,setCartOpen]=useState(false);
  const location=useLocation();
  useEffect(()=>{setOpen(false);setCartOpen(false)},[location.pathname]);
  useEffect(()=>{document.body.style.overflow=open||cartOpen?'hidden':'';return()=>{document.body.style.overflow=''}},[open,cartOpen]);
  return <>
    <header className={`site-header ${location.pathname==='/'?'is-home':''}`} id="top">
      <Link to="/" className="brand" aria-label="Lumifya home"><img src={logo} alt="Lumifya"/></Link>
      <div className="header-actions">
        <button className="cart-trigger" onClick={()=>setCartOpen(true)} aria-label="Open cart"><ShoppingCart/><span>0</span></button>
        <button className="menu-toggle" onClick={()=>setOpen(true)} aria-label="Open navigation" aria-expanded={open}><Menu/></button>
      </div>
    </header>
    {open&&<div className="nav-overlay" role="dialog" aria-modal="true" aria-label="Site navigation">
      <div className="overlay-top"><Link to="/" className="brand"><img src={logo} alt="Lumifya"/></Link><button onClick={()=>setOpen(false)} aria-label="Close navigation"><X/> CLOSE</button></div>
      <nav className="overlay-nav">{items.map(([label,path,num])=><Link key={path} to={path} aria-current={location.pathname===path?'page':undefined}><span>({num})</span>{label}<ArrowUpRight/></Link>)}</nav>
      <div className="overlay-meta"><div><span>START A CONVERSATION</span><a href="mailto:lumifya@gmail.com">lumifya@gmail.com</a></div><div><span>FOLLOW</span><a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a><a href="https://linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a></div></div>
    </div>}
    {cartOpen&&<div className="cart-drawer-backdrop" onClick={()=>setCartOpen(false)}><aside className="cart-drawer" onClick={e=>e.stopPropagation()} aria-label="Shopping cart"><div><span>YOUR CART</span><button onClick={()=>setCartOpen(false)} aria-label="Close cart"><X/></button></div><p>Your cart is currently empty.</p><Link to="/projects" className="pill-link">Explore our work <ArrowUpRight/></Link></aside></div>}
  </>
}
