import { Link, Navigate, useParams } from 'react-router-dom'
import Layout from '../components/Layout'
import { asset, projects } from '../data'

export default function ProjectDetail() {
  const { slug } = useParams(); const index = projects.findIndex(p => p.slug === slug); const p = projects[index]
  if (!p) return <Navigate to="/work" replace />
  const prev = projects[index - 1], next = projects[index + 1]
  return <Layout><article className="case section"><Link className="back-link" to="/work">← Back to Works</Link><header className="case-head reveal"><span>{p.number}</span><h1 className="display">{p.title}</h1><p>{p.summary}</p></header><div className="case-cover reveal"><img src={asset(p.cover)} alt={p.title} /></div><dl className="case-meta reveal"><div><dt>Client</dt><dd>{p.client}</dd></div><div><dt>Sector</dt><dd>{p.sector}</dd></div><div><dt>Disciplines</dt><dd>{p.disciplines}</dd></div><div><dt>Year</dt><dd>{p.year}</dd></div><div><dt>Launched</dt><dd>{p.launched}</dd></div></dl><div className="case-story"><p className="case-intro reveal">{p.intro}</p><div className="case-copy reveal"><h2>{p.heading}</h2><p>{p.body}</p><p>{p.close}</p></div></div><div className="case-gallery"><img className="wide reveal" src={asset(p.images[0])} alt={p.alts[0]} loading="lazy"/><img className="reveal" src={asset(p.images[1])} alt={p.alts[1]} loading="lazy"/><img className="reveal" src={asset(p.images[2])} alt={p.alts[2]} loading="lazy"/></div><div className="case-result reveal"><span>What held</span><p>{p.result}</p></div><nav className="case-nav">{prev ? <Link to={`/work/${prev.slug}`}>← Previous — {prev.title}</Link> : <span/>}<Link to="/work">All work</Link>{next ? <Link to={`/work/${next.slug}`}>{next.title} — Next →</Link> : <span/>}</nav></article></Layout>
}
