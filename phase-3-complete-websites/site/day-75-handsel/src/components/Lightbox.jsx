import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

export default function Lightbox({ images, label = 'Studio gallery' }) {
  const [active, setActive] = useState(-1);
  const close = () => setActive(-1);
  const move = direction => setActive(current => (current + direction + images.length) % images.length);
  useEffect(() => {
    if (active < 0) return;
    const onKey = event => {
      if (event.key === 'Escape') close();
      if (event.key === 'ArrowRight') move(1);
      if (event.key === 'ArrowLeft') move(-1);
    };
    document.body.classList.add('lightbox-open');
    document.addEventListener('keydown', onKey);
    return () => { document.body.classList.remove('lightbox-open'); document.removeEventListener('keydown', onKey); };
  }, [active, images.length]);
  return <>
    <div className="lightbox-grid" aria-label={label}>
      {images.map((image, index) => <button className="lightbox-thumb" key={`${image.src}-${index}`} onClick={() => setActive(index)} aria-label={`Open image ${index + 1}: ${image.alt}`}><img src={image.src} alt={image.alt} loading="lazy"/><span>View image ↗</span></button>)}
    </div>
    {active >= 0 && <div className="lightbox" role="dialog" aria-modal="true" aria-label={label} onMouseDown={event => { if (event.target === event.currentTarget) close(); }}>
      <button className="lightbox-close" onClick={close} aria-label="Close gallery"><X/></button>
      <button className="lightbox-prev" onClick={() => move(-1)} aria-label="Previous image"><ChevronLeft/></button>
      <figure><img src={images[active].src} alt={images[active].alt}/><figcaption>{images[active].alt} <small>{active + 1} / {images.length}</small></figcaption></figure>
      <button className="lightbox-next" onClick={() => move(1)} aria-label="Next image"><ChevronRight/></button>
    </div>}
  </>;
}
