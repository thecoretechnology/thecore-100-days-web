import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ArrowUp } from 'lucide-react';

export default function ScrollEnhancements() {
  const { pathname } = useLocation();
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const nodes = [...document.querySelectorAll('main section, .route-page > section, .site-footer .newsletter-strip')];
    if (reduced || !('IntersectionObserver' in window)) {
      nodes.forEach(node => node.classList.add('is-visible'));
      return;
    }
    document.body.classList.add('motion-enabled');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -5% 0px' });
    nodes.forEach((node, index) => {
      node.classList.add('reveal-section');
      node.style.setProperty('--reveal-delay', `${Math.min(index % 4, 3) * 65}ms`);
      observer.observe(node);
    });
    return () => observer.disconnect();
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 650);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onAnchor = event => {
      const anchor = event.target.closest('a[href^="#"]');
      if (!anchor) return;
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        event.preventDefault();
        target.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
      }
    };
    document.addEventListener('click', onAnchor);
    return () => document.removeEventListener('click', onAnchor);
  }, []);

  return showTop ? <button className="back-to-top" aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })}><ArrowUp size={17}/><span>Back to top</span></button> : null;
}
