import Layout from '../components/Layout'
import ProjectCard from '../components/ProjectCard'
import { projects } from '../data'

export default function WorkArchive() {
  return <Layout><section className="archive section"><div className="archive-head"><h1 className="display reveal">Four, fully open.</h1><p className="reveal">Twenty one projects have passed through the studio since 2019. These four are the ones we can show.</p></div><div className="project-grid">{projects.map(p=><ProjectCard project={p} key={p.slug}/>)}</div></section></Layout>
}
