import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import RoutePage from './pages/RoutePage';
import ScrollEnhancements from './components/ScrollEnhancements';

function RouteEffects() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
    document.body.classList.toggle('is-subpage', pathname !== '/');
    return () => document.body.classList.remove('is-subpage');
  }, [pathname]);
  return null;
}

function Layout() {
  const location = useLocation();
  return <>
    <RouteEffects/>
    <Header/>
    <div className="route-transition" key={location.pathname}>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/classes" element={<RoutePage kind="/classes"/>}/>
        <Route path="/classes/ceramics" element={<RoutePage kind="discipline"/>}/>
        <Route path="/classes/printmaking" element={<RoutePage kind="discipline"/>}/>
        <Route path="/classes/textiles" element={<RoutePage kind="discipline"/>}/>
        <Route path="/classes/jewellery" element={<RoutePage kind="discipline"/>}/>
        <Route path="/class/:slug" element={<RoutePage kind="class-detail"/>}/>
        <Route path="/classes/:slug" element={<RoutePage kind="class-detail"/>}/>
        <Route path="/disciplines/:slug" element={<RoutePage kind="discipline"/>}/>
        <Route path="/schedule" element={<RoutePage kind="/schedule"/>}/>
        <Route path="/open-studio" element={<RoutePage kind="/open-studio"/>}/>
        <Route path="/membership" element={<RoutePage kind="/membership"/>}/>
        <Route path="/private-groups" element={<RoutePage kind="/private-groups"/>}/>
        <Route path="/gift-cards" element={<RoutePage kind="/gift-cards"/>}/>
        <Route path="/about" element={<RoutePage kind="/about"/>}/>
        <Route path="/team" element={<RoutePage kind="/team"/>}/>
        <Route path="/journal" element={<RoutePage kind="/journal"/>}/>
        <Route path="/journal/:slug" element={<RoutePage kind="journal-detail"/>}/>
        <Route path="/visit" element={<RoutePage kind="/visit"/>}/>
        <Route path="/faq" element={<RoutePage kind="/faq"/>}/>
        <Route path="/privacy" element={<RoutePage kind="/privacy"/>}/>
        <Route path="/terms" element={<RoutePage kind="/terms"/>}/>
        <Route path="*" element={<RoutePage kind="/not-found"/>}/>
      </Routes>
    </div>
    <Footer/>
    <ScrollEnhancements/>
  </>;
}

export default function App() { return <BrowserRouter basename={import.meta.env.BASE_URL}><Layout/></BrowserRouter>; }
