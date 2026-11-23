import { Link } from 'react-router-dom'
import Brand from './Brand'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div><Brand /><p>Design studio for the quiet hours.</p></div>
        <nav aria-label="Footer navigation">
          <a href={`${import.meta.env.BASE_URL}#manifesto`}>Manifesto</a>
          <a href={`${import.meta.env.BASE_URL}#process`}>Process</a>
          <Link to="/work">Work</Link>
        </nav>
        <nav aria-label="Studio navigation">
          <a href={`${import.meta.env.BASE_URL}#proof`}>Proof</a>
          <a href={`${import.meta.env.BASE_URL}#studio`}>Studio</a>
          <a href="mailto:hello@anthesis.studio">Contact</a>
        </nav>
        <nav aria-label="Social links"><a href="https://instagram.com">Instagram</a><a href="https://linkedin.com">LinkedIn</a><a href="https://x.com">X</a></nav>
      </div>
      <div className="footer-contact"><span>Lisbon, São Paulo, remote</span><a href="mailto:hello@anthesis.studio">hello@anthesis.studio</a></div>
      <div className="footer-bottom"><strong>Made in the dark.</strong><span>© 2026 Anthesis</span><span>Independent studio</span></div>
    </footer>
  )
}
