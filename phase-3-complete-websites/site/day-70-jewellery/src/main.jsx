import React,{useEffect,useLayoutEffect,useRef}from'react';import{createRoot}from'react-dom/client';import{BrowserRouter,Routes,Route,useLocation,useNavigationType}from'react-router-dom';import{AnimatePresence,motion}from'framer-motion';import{CartProvider}from'./context/CartContext';import{SiteLayout}from'./components/Layout';import{Hero,Categories,SaleShowcase,Story,Signature,Offer,Features,Collections,ClientStrip,ProductRibbon,BeforeAfter,BlogPreview,Benefits,OfferProducts}from'./components/Sections';import{AboutPage,CategoryPage,ProductPage,ContactPage,BlogPage,BlogDetail,CheckoutPage,InfoPage,NotFoundPage}from'./pages/Pages';import'./styles.css';
function Home(){return <><Hero/><Categories/><SaleShowcase/><Story/><Signature/><Offer/><OfferProducts/><Features/><Collections/><ClientStrip/><ProductRibbon/><BeforeAfter/><BlogPreview/><Benefits/></>}
function AnimatedPages(){
 const location=useLocation();
 const navigationType=useNavigationType();
 const scrollPositions=useRef(new Map());
 const currentLocation=useRef(location);
 currentLocation.current=location;
 useEffect(()=>{
   const previous=window.history.scrollRestoration;
   window.history.scrollRestoration='manual';
   const save=()=>scrollPositions.current.set(currentLocation.current.key,window.scrollY);
   window.addEventListener('scroll',save,{passive:true});
   window.addEventListener('pagehide',save);
   return()=>{window.removeEventListener('scroll',save);window.removeEventListener('pagehide',save);window.history.scrollRestoration=previous||'auto';};
 },[]);
 useLayoutEffect(()=>{
   const timer=window.setTimeout(()=>{
     if(location.hash){
       const target=document.getElementById(decodeURIComponent(location.hash.slice(1)));
       if(target)target.scrollIntoView({behavior:'smooth',block:'start'});
       else window.scrollTo({top:0,behavior:'auto'});
       return;
     }
     if(navigationType==='POP'){
       const saved=scrollPositions.current.get(location.key);
       window.scrollTo({top:typeof saved==='number'?saved:0,behavior:'auto'});
     }else window.scrollTo({top:0,behavior:'auto'});
   },420);
   return()=>window.clearTimeout(timer);
 },[location.key,location.pathname,location.hash,navigationType]);
 return <AnimatePresence mode="wait" initial={false}><motion.div key={location.pathname+location.search+location.hash} className="page-transition" initial={{opacity:0,y:9}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-6}} transition={{duration:.38,ease:[.22,1,.36,1]}}><Routes location={location}><Route path="/" element={<Home/>}/><Route path="/about" element={<AboutPage/>}/><Route path="/category/:slug" element={<CategoryPage/>}/><Route path="/product/:id" element={<ProductPage/>}/><Route path="/contact" element={<ContactPage/>}/><Route path="/blog" element={<BlogPage/>}/><Route path="/post/:id" element={<BlogDetail/>}/><Route path="/checkout" element={<CheckoutPage/>}/><Route path="/faq" element={<InfoPage type="faq"/>}/><Route path="/shipping-returns" element={<InfoPage type="shipping"/>}/><Route path="/jewellery-care" element={<InfoPage type="care"/>}/><Route path="/size-guide" element={<InfoPage type="size"/>}/><Route path="/privacy" element={<InfoPage type="privacy"/>}/><Route path="/terms" element={<InfoPage type="terms"/>}/><Route path="*" element={<NotFoundPage/>}/></Routes></motion.div></AnimatePresence>
}
function App(){return <BrowserRouter><CartProvider><SiteLayout><AnimatedPages/></SiteLayout></CartProvider></BrowserRouter>}

createRoot(document.getElementById('root')).render(<React.StrictMode><App/></React.StrictMode>);
