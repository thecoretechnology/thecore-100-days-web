import { Link } from 'react-router-dom'
import Layout from '../components/Layout'
export default function NotFound(){return <Layout><section className="not-found section"><span>404</span><h1 className="display">This flower has closed.</h1><p>The page you are looking for is no longer open.</p><Link className="text-link" to="/">Return to Anthesis</Link></section></Layout>}
