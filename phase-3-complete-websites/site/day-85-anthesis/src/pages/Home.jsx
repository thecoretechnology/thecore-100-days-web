import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Layout from '../components/Layout'
import ProjectCard from '../components/ProjectCard'
import { asset, disciplines, heroVideo, processSteps, processVideo, projects } from '../data'

gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  const page = useRef(null)
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.to('.loader-line', { scaleX: 1, duration: .9 }).to('.loader', { yPercent: -100, duration: .9 }, '-=.05')
        .from('.hero-copy > *', { y: 38, opacity: 0, duration: 1, stagger: .1 }, '-=.45')
      gsap.to('.hero-media', { scale: 1.08, opacity: .48, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 } })
      ScrollTrigger.matchMedia({
        '(min-width: 900px)': () => gsap.to('.process-media', { scrollTrigger: { trigger: '.process-grid', start: 'top 12%', end: 'bottom 88%', pin: true, pinSpacing: false } }),
      })
    }, page.current)
    return () => ctx.revert()
  }, [])

  return (
    <Layout>
      <div ref={page}>
        <div className="loader" aria-hidden="true"><span>Anthesis</span><i><b className="loader-line" /></i></div>
        <section className="hero">
          <video className="hero-media" autoPlay muted loop playsInline poster={asset('solace-cover.avif')}><source src={heroVideo} type="video/mp4" /></video>
          <div className="hero-vignette" />
          <div className="night-clock" aria-hidden="true"><span><b>20:00</b>Dusk</span><span><b>20:40</b>Why the dark</span><span><b>21:30</b>The wait</span></div>
          <div className="hero-copy"><h1>It only opens once,<br /><em>and only in the dark.</em></h1><p>A design studio for brands that would rather be inevitable than loud.</p></div>
          <a className="scroll-cue" href="#manifesto">One night. One bloom. Scroll to begin.</a>
        </section>

        <section className="manifesto section" id="manifesto">
          <div className="section-kicker">Why the dark</div>
          <h2 className="display reveal">Daylight is crowded.</h2>
          <div className="manifesto-grid"><p className="reveal">Everything bright is competing. Every brand is reacting to the brand beside it, in the same light, at the same volume, in the same hour.</p><p className="reveal">We work in the other half of the day. Nothing to answer, nobody to imitate, no reason to hurry.</p></div>
          <blockquote className="reveal">The dark is not the absence of the work.<br /><em>It is the condition for it.</em></blockquote>
        </section>

        <section className="wait-section section">
          <div className="section-kicker">The wait</div><h2 className="display reveal">A bud is not a delay.</h2>
          <p className="lead reveal">Cereus spends eleven months building structure for eight hours of proof. Almost nothing you admire was fast.</p>
          <div className="principles"><article className="reveal"><span>01</span><h3>Patience</h3><p>Depth before surface. One honest idea late is worth four safe ones early.</p></article><article className="reveal"><span>02</span><h3>Pressure</h3><p>Nothing opens without it. The constraint is usually the best part of the brief.</p></article><article className="reveal"><span>03</span><h3>Timing</h3><p>Right idea, wrong hour, no bloom.</p></article></div>
        </section>

        <section className="disciplines section">
          <div className="section-intro"><h2 className="display reveal">5 disciplines,<br />one climate.</h2><p className="reveal">We do not sell them separately, because they do not work separately.</p></div>
          <div className="discipline-list">{disciplines.map(([n,t,d])=><article className="reveal" key={t}><span>{n}</span><h3>{t}</h3><p>{d}</p></article>)}</div>
        </section>

        <section className="process section" id="process">
          <div className="process-intro"><div><div className="section-kicker">Our process</div><h2 className="display reveal"><em>Anthesis.</em></h2></div><p className="reveal">The botanical word for the hours a flower is open and doing its job. Ours takes five movements, always in this order, because the flower does not skip steps either.</p></div>
          <div className="process-grid"><div className="process-media"><video autoPlay muted loop playsInline><source src={processVideo} type="video/mp4" /></video><div className="process-orbit" /></div><div className="process-steps">{processSteps.map(([n,t,d])=><article className="reveal" key={t}><span>{n}</span><h3>{t}</h3><p>{d}</p></article>)}</div></div>
        </section>

        <section className="work section" id="work">
          <div className="section-intro"><h2 className="display reveal">Fully open.</h2><p className="reveal">Four of twenty one. The rest bloomed privately.</p><Link className="text-link reveal" to="/work">View all work</Link></div>
          <div className="project-grid">{projects.map(p=><ProjectCard project={p} key={p.slug}/>)}</div>
        </section>

        <section className="proof section" id="proof">
          <h2 className="display reveal">The night is short.<br /><em>What it leaves is not.</em></h2>
          <div className="stats"><article className="reveal"><strong>+84%</strong><span>qualified demand within 6 months</span></article><article className="reveal"><strong>96%</strong><span>client satisfaction</span></article><article className="reveal"><strong>21</strong><span>brands, nine countries</span></article><article className="reveal"><strong>$18M</strong><span>revenue influenced by our work</span></article></div>
          <div className="quotes"><blockquote className="reveal">“They spent two weeks asking questions before showing anything. It was uncomfortable and it was correct.”<cite>Marina Okafor, Founder, Solace</cite></blockquote><blockquote className="reveal">“We had eleven opinions and no decision. They left with one sentence and the whole company agreed with it.”<cite>Tomas Berg, Head of Product, Meridian</cite></blockquote></div>
        </section>

        <section className="studio section" id="studio">
          <div className="studio-copy"><h2 className="display reveal">6 people,<br />no layers.</h2><p className="reveal">Nobody here manages the person doing the work. The person doing the work is in the room with you, on the first call and on the last one.</p><p className="reveal">We started in 2019 with one rule we have not broken: never take a project we would not want to look at in five years.</p></div>
          <div className="studio-image reveal"><img src={asset('studio-team.avif')} alt="Anthesis studio team" loading="lazy" data-parallax /></div>
          <div className="people">{[['A. Ruela','Direction'],['N. Holm','Brand'],['J. Abreu','Product'],['S. Moreau','Engineering'],['K. Ito','Motion'],['R. Vale','Writing']].map(([n,r])=><div className="reveal" key={n}><b>{n}</b><span>{r}</span></div>)}</div>
        </section>

        <section className="contact section" id="contact"><div className="contact-glow"/><h2 className="display reveal">By morning the flower is gone.<br /><em>The seed is not.</em></h2><p className="reveal">We leave with the season. What we build keeps opening long after we are out of the room.</p><a className="contact-link reveal" href="mailto:hello@anthesis.studio"><span>Plant it now. It opens later.</span><strong>Start a project</strong></a><div className="contact-meta reveal"><span>hello@anthesis.studio</span><span>Next opening, October. Two places.</span></div></section>
      </div>
    </Layout>
  )
}
