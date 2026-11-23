import { Link } from 'react-router-dom'
import { asset } from '../data'

export default function ProjectCard({ project }) {
  return (
    <Link className="project-card reveal" to={`/work/${project.slug}`}>
      <div className="project-image-wrap"><img src={asset(project.cover)} alt="" loading="lazy" /><span>{project.number}</span></div>
      <div className="project-copy">
        <h3>{project.title}</h3><p>{project.summary}</p>
        <div><span>{project.disciplines}</span><span>{project.year}</span></div>
      </div>
    </Link>
  )
}
