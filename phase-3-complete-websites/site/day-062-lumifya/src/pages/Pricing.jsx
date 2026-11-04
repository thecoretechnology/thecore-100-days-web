import React from 'react';
import {Link} from 'react-router-dom';
import {ArrowUpRight,Check} from 'lucide-react';

const plans=[
  {name:'Brand Foundation',price:'From $2.5K',copy:'A focused identity sprint for new ideas ready to become unmistakable.',items:['Brand direction','Core visual identity','Essential launch assets']},
  {name:'Digital Experience',price:'From $6K',copy:'A complete strategy, interface and website system built to move your brand forward.',items:['Experience strategy','Responsive UI/UX','Development and launch'],featured:true},
  {name:'Ongoing Partnership',price:'Let’s talk',copy:'Embedded creative support for teams that need consistent senior design direction.',items:['Flexible monthly scope','Priority creative support','Continuous optimisation']}
];

export default function Pricing(){return <>
  <section className="page-hero"><p className="eyebrow">WAYS TO WORK TOGETHER</p><h1>Clear scope.<br/><em>Serious ambition.</em></h1><p className="page-lede">Every engagement is shaped around the work. These starting points make the first conversation easier.</p></section>
  <section className="pricing-grid section-pad">{plans.map(plan=><article className={plan.featured?'pricing-card featured':'pricing-card'} key={plan.name}>{plan.featured&&<span className="pricing-badge">MOST REQUESTED</span>}<p className="eyebrow">{plan.name}</p><h2>{plan.price}</h2><p>{plan.copy}</p><ul>{plan.items.map(item=><li key={item}><Check size={15}/>{item}</li>)}</ul><Link className="pill-link" to="/contact">Start a conversation <ArrowUpRight/></Link></article>)}</section>
  <section className="pricing-note"><p>Final scope and fees are confirmed after a project conversation. No payment is collected through this concept website.</p></section>
  </>}
