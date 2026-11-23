import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Brand from './Brand'
import Footer from './Footer'

gsap.registerPlugin(ScrollTrigger)

export default function Layout({ children, minimal = false }) {
  const root = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set('.reveal', { y: 44, opacity: 0 })
      ScrollTrigger.batch('.reveal', {
        start: 'top 88%',
        once: true,
        onEnter: (els) => gsap.to(els, { y: 0, opacity: 1, duration: 1.05, stagger: 0.08, ease: 'power3.out' }),
      })
      gsap.utils.toArray('[data-parallax]').forEach((el) => {
        gsap.fromTo(el, { yPercent: -5 }, { yPercent: 5, ease: 'none', scrollTrigger: { trigger: el, scrub: 1.2 } })
      })
    }, root.current)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={root} className="site-shell">
      <div className="noise" aria-hidden="true" />
      <header className="topbar"><Brand /></header>
      <main>{children}</main>
      {!minimal && <Footer />}
    </div>
  )
}
