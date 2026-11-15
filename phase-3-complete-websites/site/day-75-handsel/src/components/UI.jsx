import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
export function PillButton({children, href='#', dark=false, external=false, onClick}) { const content=<><span>{children}</span><i>{external?<ArrowUpRight size={17}/>:<ArrowRight size={17}/>}</i></>; const cls=`pill-button ${dark?'pill-dark':''}`; return href.startsWith('/')&&!external?<Link className={cls} to={href} onClick={onClick}>{content}</Link>:<a className={cls} href={href} onClick={onClick}>{content}</a> }
export function Eyebrow({children, light=false}) { return <div className={`eyebrow ${light?'eyebrow-light':''}`}><span/>{children}</div> }
export function SectionTitle({eyebrow, children, light=false, className=''}) { return <div className={`section-title ${className}`}><Eyebrow light={light}>{eyebrow}</Eyebrow><h2>{children}</h2></div> }
export function ImageFrame({src, alt='', className=''}) { return <div className={`image-frame ${className}`}><img src={src} alt={alt}/></div> }
