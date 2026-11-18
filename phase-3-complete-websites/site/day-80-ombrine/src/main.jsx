import React, { useEffect, useMemo, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'

const marker = '/day-80-ombrine'
const markerIndex = location.pathname.indexOf(marker)
const BASE = markerIndex >= 0 ? location.pathname.slice(0, markerIndex) + marker : ''
const A = `${BASE}/assets/`
const currentRoute = () => location.pathname.slice(BASE.length) || '/'

const looks = [
  ['L01','Camel Hour','K3N2vsc2M9svXYhadXbsXiTHibk.png','Wrap coat, ivory wool, tan slingbacks','€4,500','women'],
  ['L02','Brun','uZxWHEraAfYOtmjNLCoPQtLVSY.png','Suede overshirt, pleated wool, penny loafers','€3,760','men'],
  ['L03','Oxblood','YnjLoU5eu2ISm7Ha5DrswOQwZHY.png','Silk bow blouse, bias satin, kitten heels','€2,860','women'],
  ['L04','North Cable','VaNLR4zQRHOO1ZAFdyrzkJRsxk.png','Cable cashmere, olive wool, suede derbies','€2,950','men'],
  ['L05','Slate','PQpeM5T2NBw10nVhjvrnzqnquY4.png','Slate twill blazer and wide trouser','€3,250','women'],
  ['L06','Trench Weather','dDy7GCPXTbkJzgZkBW74ETxeXoA.png','Cream gabardine over chocolate rib','€3,980','women'],
  ['L07','Navy Hours','m1X7Ysfnj1Bx8VGzNG15eSOKCM.png','Overcoat, flannel, chelsea boots','€4,860','men'],
  ['L08','Butter','KBdiQH5v8QurjTCHsRCuPLk7u98.png','Butter cashmere and ecru silk','€2,740','women'],
  ['L09','Tobacco','6lUQitXPYhGxfm85DrhM8iTykI.png','Tobacco corduroy and cream wool','€3,190','men'],
  ['L10','Velours','Ye7TT2G9up0XJI7VrvFQ03DFikM.png','Bottle-green velvet, evening quietly','€3,880','women'],
  ['L11','Nappa','UKXImPsGD5va733WHf1uayASPk.png','Black lamb nappa over ecru wool','€4,240','men'],
  ['L12','Dove','AWkKT97RJ6trbUGg72nt5daxncA.png','Pure cashmere in dove grey','€3,540','women'],
  ['L13','Rose Hour','Ct6xE0HcfG5wQvbLpMg1vJGSr1Q.png','Blush silk cut on the bias','€2,960','women'],
  ['L14','Ballet','9SaEc03lfHmfucMtxaQOmtPZk.png','Pale pink bouclé finished with a bow','€3,020','women'],
  ['L15','Soirée','1hmvfBjiRmFwO1YrrAQCr8GXoA.png','Black velvet to the floor','€4,100','women'],
  ['L16','Ivory Lace','wdHaHym0XOlY0n0x5evRA6qjN4.png','Ivory lace and camel cashmere','€4,320','women'],
  ['L17','Cherry','i8IkDvEYOgnIhP7vsvWtAGs2zjw.png','Cherry satin, black wool bolero','€3,260','women'],
  ['L18','Powder','XiCuS9FRftviMzOvIUl6EVeHZxw.png','Ivory silk and powder-blue pleats','€2,890','women'],
  ['L19','Champagne','lgAFlaPo3nSlCkidpDFPvXw8aY.png','Champagne satin and cream shearling','€4,490','women'],
  ['L20','Polka','qYSt2wdN6hZni2pFqNVpJx8WGWU.png','Navy silk with white dots','€2,760','women'],
  ['L21','Midnight','GKC8pjg50uWiltFNPh7usB1Ftw.png','Midnight velvet tuxedo, softened','€3,930','men'],
  ['L22','Stone','67BYP5s91sPpO4HZpas6Dlyj0ss.png','Stone twill, pleated trousers','€3,640','men'],
  ['L23','Russet','TupU1dwP2faa4Tq2FEwNJFxUJaM.png','Rust suede over cream wool','€3,510','men'],
  ['L24','Ash','A3B9fJtpkoN5KHIPPcGbmFfalY.png','Ash-grey cashmere and pleated wool','€2,980','men'],
].map(([code,name,image,desc,price,gender]) => ({code,name,image,desc,price,gender}))

const products = [
  ['Double-face wrap coat','€2,890','icB0zt4YVXb4xTKIQKM2aGLFkcg.png','Outerwear'],
  ['Silk bow blouse','€1,190','RYjc3iMkhN71MvKTvWnOY6H4uk.png','Tailoring'],
  ['Cable cashmere crewneck','€1,450','kgz6Jv8uETTKZkmT0DqJxgQ0.png','Knitwear'],
  ['Bias satin skirt','€980','YqYdmfhzRmyo5EF3Rl6xVxr1Kc.png','Trousers and skirts'],
  ['Suede slingback','€720','zgvf8WQgUHyOUBLJc8clT83phfY.png','Shoes'],
  ['Double-breasted overcoat','€3,100','0OEie26vuZu55fNOU25qiBhypko.png','Outerwear'],
  ['Emerald velvet jacket','€2,350','icB0zt4YVXb4xTKIQKM2aGLFkcg.png','Tailoring'],
  ['Olive wool trouser','€1,020','YqYdmfhzRmyo5EF3Rl6xVxr1Kc.png','Trousers and skirts'],
].map(([name,price,image,category]) => ({name,price,image,category}))

function navigate(path) {
  const target = `${BASE}${path}`
  if (location.pathname !== target) history.pushState({}, '', target)
  window.dispatchEvent(new PopStateEvent('popstate'))
  window.scrollTo({top: 0, behavior: 'smooth'})
}

function Header({dark,setDark,onSearch,onBag}) {
  const [menu,setMenu] = useState(false)
  const [lang,setLang] = useState('EN')
  const links = [['Collection','/collection'],['Looks','/looks'],['Atelier','/atelier'],['Journal','/journal']]
  return <header className="header">
    <button className="mobile-menu" aria-label="Toggle menu" onClick={()=>setMenu(!menu)}>{menu?'×':'☰'}</button>
    <nav className={'nav-left '+(menu?'open':'')}>{links.map(([label,path])=><button key={path} onClick={()=>{navigate(path);setMenu(false)}}>{label}</button>)}</nav>
    <button className="wordmark" onClick={()=>navigate('/')}>Ombrine</button>
    <nav className="nav-right">
      <button onClick={onSearch}>Search</button>
      <button className="language" onClick={()=>setLang(lang==='EN'?'FR':'EN')}>{lang}⌄</button>
      <button className="theme" aria-label="Toggle appearance" onClick={()=>setDark(!dark)}><span>☼</span><b>{dark?'◔':'☾'}</b></button>
      <button onClick={onBag}>Bag <span className="bag-count">{Number(localStorage.getItem('ombrine-bag')||0)}</span></button>
    </nav>
  </header>
}

function Home({openLook}) {
  const canvas = useRef(null)
  const drag = useRef({active:false,x:0,offset:0,moved:false,captured:false,pointerId:null,lastX:0,lastTime:0,velocity:0})
  const targetOffset = useRef(0)
  const currentOffset = useRef(0)
  const pointerTarget = useRef({fx:0,fy:0,bx:0,by:0})
  const pointerCurrent = useRef({fx:0,fy:0,bx:0,by:0})
  const animationFrame = useRef(0)
  const [offset,setOffset] = useState(0)
  const [active,setActive] = useState(2)
  const [entered,setEntered] = useState(false)
  const display = looks.slice(0,12)

  useEffect(() => {
    document.body.classList.add('home-route')
    const entrance = requestAnimationFrame(() => requestAnimationFrame(() => setEntered(true)))
    const footer = document.querySelector('footer')
    const observer = new IntersectionObserver(([entry]) => footer?.classList.toggle('in-view', entry.isIntersecting), {threshold:.12})
    if (footer) observer.observe(footer)
    return () => {
      cancelAnimationFrame(entrance)
      cancelAnimationFrame(animationFrame.current)
      observer.disconnect()
      document.body.classList.remove('home-route')
      footer?.classList.remove('in-view')
    }
  }, [])

  const animateToTarget = () => {
    if (animationFrame.current) return
    const tick = () => {
      const distance = targetOffset.current - currentOffset.current
      currentOffset.current += distance * .11
      if (Math.abs(distance) < .18) currentOffset.current = targetOffset.current
      const pointer = pointerCurrent.current
      const target = pointerTarget.current
      let pointerDistance = 0
      for (const key of ['fx','fy','bx','by']) {
        const delta = target[key]-pointer[key]
        pointer[key] += delta*.12
        if (Math.abs(delta)<.05) pointer[key]=target[key]
        pointerDistance = Math.max(pointerDistance,Math.abs(delta))
      }
      if (canvas.current) {
        canvas.current.style.setProperty('--front-parallax-x',`${pointer.fx}px`)
        canvas.current.style.setProperty('--front-parallax-y',`${pointer.fy}px`)
        canvas.current.style.setProperty('--back-parallax-x',`${pointer.bx}px`)
        canvas.current.style.setProperty('--back-parallax-y',`${pointer.by}px`)
      }
      setOffset(currentOffset.current)
      if (currentOffset.current !== targetOffset.current || pointerDistance>=.05) animationFrame.current = requestAnimationFrame(tick)
      else animationFrame.current = 0
    }
    animationFrame.current = requestAnimationFrame(tick)
  }

  const updateTarget = value => {
    targetOffset.current = Math.max(-720,Math.min(360,value))
    animateToTarget()
  }

  const move = x => {
    if(!drag.current.active) return
    const next = drag.current.offset + x-drag.current.x
    const distance = Math.abs(x-drag.current.x)
    if (!drag.current.moved && distance>10) {
      drag.current.moved=true
      canvas.current?.setPointerCapture(drag.current.pointerId)
      drag.current.captured=true
    }
    const now=performance.now()
    const elapsed=Math.max(12,now-drag.current.lastTime)
    drag.current.velocity=(x-drag.current.lastX)/elapsed
    drag.current.lastX=x
    drag.current.lastTime=now
    updateTarget(next)
  }
  const parallax = e => {
    if (drag.current.active || !canvas.current) return
    const rect = canvas.current.getBoundingClientRect()
    const x = (e.clientX-rect.left)/rect.width-.5
    const y = (e.clientY-rect.top)/rect.height-.5
    pointerTarget.current={fx:x*-12,fy:y*-7,bx:x*18,by:y*10}
    animateToTarget()
  }
  const down = e => {drag.current={active:true,x:e.clientX,offset:targetOffset.current,moved:false,captured:false,pointerId:e.pointerId,lastX:e.clientX,lastTime:performance.now(),velocity:0}}
  const up = e => {
    if (drag.current.moved) updateTarget(targetOffset.current+drag.current.velocity*170)
    drag.current.active=false
    if (drag.current.captured && canvas.current?.hasPointerCapture(e.pointerId)) canvas.current.releasePointerCapture(e.pointerId)
  }
  const wheel = e => updateTarget(targetOffset.current-e.deltaY*.72-e.deltaX*.45)
  return <main className={'salon '+(entered?'is-entered':'')} ref={canvas} onPointerDown={down} onPointerMove={e=>{move(e.clientX);parallax(e)}} onPointerLeave={()=>{pointerTarget.current={fx:0,fy:0,bx:0,by:0};animateToTarget()}} onPointerUp={up} onPointerCancel={up} onWheel={wheel}>
    <div className="salon-glow" />
    <h1 className="hero-word">Ombrine</h1>
    <div className="salon-track back" style={{transform:`translate3d(calc(${offset*.45}px + var(--back-parallax-x, 0px)),var(--back-parallax-y, 0px),0)`}}>{display.slice(5).concat(display.slice(0,2)).map((look,i)=><img key={look.code} src={A+look.image} alt="" style={{left:`${i*18+1}%`,'--i':i}} />)}</div>
    <div className="salon-track front" style={{transform:`translate3d(calc(${offset}px + var(--front-parallax-x, 0px)),var(--front-parallax-y, 0px),0)`}}>{display.slice(0,7).map((look,i)=><button type="button" aria-label={`View ${look.name}`} key={look.code} className={active===i?'active':''} style={{left:`${i*19-4}%`,'--i':i}} onMouseEnter={()=>setActive(i)} onFocus={()=>setActive(i)} onClick={()=>{if(!drag.current.moved)openLook(look)}}><img src={A+look.image} alt={look.name}/><span aria-hidden="true">View</span></button>)}</div>
    <div className="salon-caption"><em>{display[active].name}</em><span>{display[active].code.replace('L','Look ')} · {display[active].price}</span></div>
    <button className="how" onClick={()=>navigate('/looks')}>How to use this salon</button>
    <p className="salon-help">Drag to wander&nbsp; · &nbsp;Click a look to step closer</p>
  </main>
}

function PageIntro({title,meta,sub}) { return <section className="page-intro reveal"><h1>{title}</h1><div><em>{meta}</em><p>{sub}</p></div></section> }

function Collection({addBag,openProduct}) {
  const [filter,setFilter] = useState('All')
  const [sort,setSort] = useState('Featured')
  const cats = ['All','Outerwear','Knitwear','Tailoring','Trousers and skirts','Shoes','Dresses','Bags']
  let list = filter==='All'?products:products.filter(p=>p.category===filter)
  if(sort==='Price low') list=[...list].sort((a,b)=>+a.price.replace(/\D/g,'')-+b.price.replace(/\D/g,''))
  return <main>
    <PageIntro title="The collection" meta="Autumn–Winter 2026" sub="72 pieces, 24 looks" />
    <div className="filterbar"><div>{cats.map(c=><button className={filter===c?'active':''} onClick={()=>setFilter(c)} key={c}>{c}</button>)}</div><button onClick={()=>setSort(sort==='Featured'?'Price low':'Featured')}>Sort&nbsp; {sort}</button></div>
    <div className="product-grid">{list.map((p,i)=><article className="product-card reveal" key={p.name+i} onClick={()=>openProduct(p)}>
      <div className="product-image"><img src={A+p.image} alt={p.name}/><button className="quick" onClick={e=>{e.stopPropagation();addBag()}}>Quick add <span>36&nbsp;&nbsp; 37&nbsp;&nbsp; 38&nbsp;&nbsp; 39&nbsp;&nbsp; 40</span></button></div>
      <div className="product-info"><h2>{p.name}</h2><span>{p.price}</span></div>
    </article>)}</div>
    <section className="feature-look"><div><span>Look, three pieces</span><h2>Navy Hours</h2><p>Overcoat, flannel, chelsea boots</p><button onClick={()=>navigate('/looks')}>Shop the look&nbsp; →</button></div><img src={A+looks[6].image} alt="Navy Hours" /></section>
  </main>
}

function Looks({openLook}) {
  const [filter,setFilter] = useState('all')
  const list=filter==='all'?looks:looks.filter(l=>l.gender===filter)
  return <main>
    <PageIntro title="The looks" meta="Autumn–Winter 2026" sub="Twenty-four looks, seventy-two pieces" />
    <div className="look-filter"><div>{['all','women','men'].map(x=><button className={filter===x?'active':''} onClick={()=>setFilter(x)} key={x}>{x[0].toUpperCase()+x.slice(1)}</button>)}</div><span>{list.length} looks</span></div>
    <div className="looks-grid">{list.map(look=><article className="look-card reveal" key={look.code} onClick={()=>openLook(look)}><div><img src={A+look.image} alt={look.name}/><span>View</span></div><header><h2>{look.name}</h2><small>{look.code}</small></header><p>{look.desc}</p><strong>{look.price} <i>· three pieces</i></strong></article>)}</div>
  </main>
}

function Atelier() { return <main className="editorial"><PageIntro title="The atelier" meta="Biella — Milano" sub="Made slowly, worn for years"/><section className="editorial-hero"><img src={A+looks[0].image}/><div><span>01 — The cloth</span><h2>Made by hands that know the material.</h2><p>Our wool begins in Biella, where water, patience and generations of knowledge give cloth its quiet depth. Every piece is cut in Milan and finished by hand.</p></div></section><section className="manifesto"><em>“Clothes should feel inevitable.”</em><p>We work with natural fibres, precise proportions and a palette drawn from winter light. Nothing is rushed; nothing is added without purpose.</p></section></main> }

function Journal() { const posts=[['The quiet architecture of a coat',looks[6]],['A study in oxblood',looks[2]],['Twenty-four ways into winter',looks[11]]]; return <main><PageIntro title="The journal" meta="Notes from the maison" sub="Cloth, craft and the art of getting dressed"/><div className="journal-grid">{posts.map(([title,l],i)=><article key={title}><div><img src={A+l.image}/></div><small>Journal 0{i+1} · October 2026</small><h2>{title}</h2><p>{l.desc}. A conversation about proportion, texture and the rituals that make a wardrobe personal.</p><button>Read story&nbsp; →</button></article>)}</div></main> }

function SearchOverlay({close,openLook}) { const [q,setQ]=useState(''); const found=useMemo(()=>[...looks,...products].filter(x=>x.name.toLowerCase().includes(q.toLowerCase())).slice(0,6),[q]); return <div className="overlay search-overlay"><button className="close" onClick={close}>×</button><label>Search Ombrine<input autoFocus value={q} onChange={e=>setQ(e.target.value)} placeholder="Type a colour, piece or look"/></label>{q&&<div className="search-results">{found.map((x,i)=><button key={x.name+i} onClick={()=>{'code'in x&&openLook(x);close()}}><img src={A+x.image}/><span>{x.name}<small>{x.price}</small></span></button>)}</div>}</div> }

function Detail({item,close,addBag}) { return <div className="overlay detail"><button className="close" onClick={close}>×</button><div className="detail-image"><img src={A+item.image}/></div><div className="detail-copy"><small>{item.code||'Ombrine collection'}</small><h2>{item.name}</h2><p>{item.desc||'Cut in Italy from exceptional cloth, with a precise, unforced silhouette.'}</p><strong>{item.price}</strong><div className="sizes"><span>Select size</span>{['36','38','40','42'].map(s=><button key={s}>{s}</button>)}</div><button className="add" onClick={addBag}>Add to bag</button></div></div> }

function Bag({close,count}) { return <div className="overlay bag-drawer"><button className="close" onClick={close}>×</button><h2>Your bag</h2>{count?<><p>{count} {count===1?'piece':'pieces'} reserved in your salon.</p><div className="bag-line"><span>Estimated total</span><strong>€{(count*1190).toLocaleString()}</strong></div><button className="add" onClick={()=>alert('Thank you — checkout is ready for your appointment.')}>Continue to checkout</button></>:<p>Your bag is empty. Discover the collection and choose a piece.</p>}</div> }

function App() {
  const [path,setPath]=useState(currentRoute())
  const [dark,setDark]=useState(localStorage.getItem('ombrine-theme')!=='light')
  const [search,setSearch]=useState(false)
  const [detail,setDetail]=useState(null)
  const [bag,setBag]=useState(false)
  const [count,setCount]=useState(Number(localStorage.getItem('ombrine-bag')||0))
  useEffect(()=>{const fn=()=>setPath(currentRoute());addEventListener('popstate',fn);return()=>removeEventListener('popstate',fn)},[])
  useEffect(()=>{document.documentElement.dataset.theme=dark?'dark':'light';localStorage.setItem('ombrine-theme',dark?'dark':'light')},[dark])
  const addBag=()=>{const n=count+1;setCount(n);localStorage.setItem('ombrine-bag',String(n));setDetail(null);setBag(true)}
  let page = path.startsWith('/collection')?<Collection addBag={addBag} openProduct={setDetail}/>:path.startsWith('/looks')?<Looks openLook={setDetail}/>:path.startsWith('/atelier')?<Atelier/>:path.startsWith('/journal')?<Journal/>:<Home openLook={setDetail}/>
  return <><Header dark={dark} setDark={setDark} onSearch={()=>setSearch(true)} onBag={()=>setBag(true)}/>{page}<footer><button className="wordmark" onClick={()=>navigate('/')}>Ombrine</button><p>Autumn–Winter 2026<br/>Designed in Paris. Made in Italy.</p><nav><button onClick={()=>navigate('/collection')}>Collection</button><button onClick={()=>navigate('/looks')}>Looks</button><button onClick={()=>navigate('/atelier')}>Atelier</button></nav><small>© 2026 Ombrine</small></footer>{search&&<SearchOverlay close={()=>setSearch(false)} openLook={setDetail}/>} {detail&&<Detail item={detail} close={()=>setDetail(null)} addBag={addBag}/>} {bag&&<Bag close={()=>setBag(false)} count={count}/>}</>
}

createRoot(document.getElementById('root')).render(<App />)
