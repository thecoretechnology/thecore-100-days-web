import { Link } from 'react-router-dom'

export default function Brand() {
  return (
    <Link className="brand" to="/" aria-label="Anthesis home">
      <svg viewBox="0 0 34 34" aria-hidden="true"><path d="M17 2c4 5 5 9 3 12 4-1 7 1 9 5-6 0-10 2-12 7-2-5-6-7-12-7 2-4 5-6 9-5-2-3-1-7 3-12Z"/><circle cx="17" cy="19" r="2.4"/></svg>
      <span>Anthesis</span>
    </Link>
  )
}
