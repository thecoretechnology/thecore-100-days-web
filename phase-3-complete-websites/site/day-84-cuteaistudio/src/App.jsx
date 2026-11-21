import React, { useEffect, useState } from "react";
import { ArrowRight, Menu, X, Check, Plus, Send } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const robots = {
  Scout: "https://framerusercontent.com/images/bUDcjYZ9uScb6NSEly6GUpVraO8.webp",
  Helper: "https://framerusercontent.com/images/xWj3QCLXqGzHPYrsYH72jS5SEg.webp",
  Writer: "https://framerusercontent.com/images/DqiYwaMGJ5ha9NtRxlZKqcrjoyY.webp",
  Builder: "https://framerusercontent.com/images/t6FeflBAYLXXHsJWxSVm8lUPfT8.webp",
  Analyst: "https://framerusercontent.com/images/Zf1IV3rYYXU80KtPnTuc6c00l1o.webp",
  Tidy: "https://framerusercontent.com/images/acdUkGuOhG3vwDPchHyhdMSsUo.webp"
};

const agents = [
  {name:"Scout", type:"Research", desc:"Watches the web and flags what matters.", quote:"Track what competitors ship.", color:"mint"},
  {name:"Helper", type:"Support", desc:"Answers customers kindly, any hour.", quote:"Sort out this invoice question.", color:"pink"},
  {name:"Writer", type:"Content", desc:"Drafts posts, emails and replies in your voice.", quote:"Turn these notes into a launch post.", color:"lilac"},
  {name:"Builder", type:"Automations", desc:"Wires your tools into tidy workflows.", quote:"When a deal closes, start onboarding.", color:"yellow"},
  {name:"Analyst", type:"Reports", desc:"Reads the numbers and tells you why.", quote:"Why did sign-ups dip last week?", color:"blue"},
  {name:"Tidy", type:"Clean-up", desc:"Sweeps inboxes, CRMs and messy data.", quote:"Merge the duplicate contacts.", color:"peach"}
];
const teamOrder = ["Writer", "Helper", "Tidy", "Analyst", "Scout", "Builder"];
const byName = Object.fromEntries(agents.map(agent => [agent.name, agent]));

const faqs = [
  ["Do I need to code?","No. Tell your agent what you need in plain words. It handles the busywork and checks in when it needs your input."],
  ["Will an agent send anything without me?","No. Your agents ask before sending or taking an external action. You stay in control."],
  ["Which tools does it work with?","CuteAIStudio connects with everyday tools including Gmail, Notion, Google Drive, HubSpot, Shopify, Zendesk and more."],
  ["Can I change plans later?","Yes. You can move between plans as your team and workload change."],
  ["Who can see my data?","Your workspace data is private to your team and handled according to your workspace permissions."]
];

function Button({children, href="#/pricing?section=waitlist", className=""}){return <a className={`button ${className}`} href={href}>{children}<ArrowRight size={17}/></a>}

function Navbar(){
  const [open,setOpen]=useState(false);
  const [route,setRoute]=useState(window.location.hash.replace(/^#/,"") || "/");
  useEffect(()=>{const update=()=>setRoute(window.location.hash.replace(/^#/,"") || "/");window.addEventListener("hashchange",update);return()=>window.removeEventListener("hashchange",update)},[]);
  const links=[["Agents","/agents"],["Pricing","/pricing"],["Changelog","/changelog"],["About","/about"]];
  return <header className="navbar">
    <a className="brand" href="#/" aria-label="CuteAIStudio home"><span className="brand-mark"><i/><i/></span><span>CuteAIStudio</span></a>
    <nav className={open?"nav-links open":"nav-links"}>
      {links.map(([label,path])=><a className={route.split("?")[0]===path?"active":""} href={`#${path}`} onClick={()=>setOpen(false)} key={path}>{label}</a>)}
    </nav>
    <a className="button nav-cta" href="#/pricing">Start free <ArrowRight size={17}/></a>
    <button className="menu-toggle" onClick={()=>setOpen(!open)} aria-label="Toggle menu">{open?<X/>:<Menu/>}</button>
  </header>
}

function RobotPodium({name,hero=false}){
  function followPointer(event){
    if(!hero || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect=event.currentTarget.getBoundingClientRect();
    const x=(event.clientX-rect.left)/rect.width-.5;
    const y=(event.clientY-rect.top)/rect.height-.5;
    event.currentTarget.style.setProperty("--lean-x",`${(x*5).toFixed(2)}deg`);
    event.currentTarget.style.setProperty("--lean-y",`${(-y*3).toFixed(2)}deg`);
  }
  function resetPointer(event){event.currentTarget.style.setProperty("--lean-x","0deg");event.currentTarget.style.setProperty("--lean-y","0deg")}
  return <div className={`robot-podium ${hero?"hero-podium":""} ${byName[name].color}`} onPointerMove={followPointer} onPointerLeave={resetPointer}>
    <img src={robots[name]} alt={`${name} robot`} />
    <span className="agent-pill">{name.toUpperCase()}</span>
  </div>
}

function Hero(){
  return <section className="hero section-wrap" id="top">
    <div className="eyebrow status"><span/> SIX AGENTS, READY TODAY</div>
    <h1>Cute agents.<br/><em>Serious</em> work.</h1>
    <p className="hero-copy">AI agents that write, tidy, answer and build, so your people don’t have to.</p>
    <Button className="hero-button">Hire your first agent</Button>
    <div className="hero-robots">
      {["Scout","Helper","Writer","Builder","Analyst","Tidy"].map(name=><RobotPodium key={name} name={name} hero/>)}
    </div>
  </section>
}

function Intro(){
  return <section className="intro section-wrap" id="about">
    <div className="eyebrow">SAY HELLO</div>
    <h2>Hello. We’re your<br/><em>new team.</em></h2>
    <p>Six agents that never sleep, never sulk and always ask before sending.</p>
    <div className="intro-orbit"><span className="orbit-dot">✦</span><span className="orbit-label">A LITTLE HELP GOES A LONG WAY</span></div>
  </section>
}

function AgentShowcase(){
  return <section className="agents-section section-wrap" id="agents">
    <div className="section-heading">
      <div><div className="eyebrow">THE TEAM</div><h2>Six agents. One tidy team.</h2></div>
      <a className="text-link" href="#/agents">Meet all agents <ArrowRight size={16}/></a>
    </div>
    <div className="agent-grid">
      {teamOrder.map(name=>byName[name]).map((a,i)=><article className={`agent-card ${a.color}`} key={a.name}>
        <div className="agent-visual"><img src={robots[a.name]} alt={`${a.name} AI agent`}/></div>
        <div className="agent-card-body"><span className="eyebrow">{a.type}</span><h3>{a.name}</h3><p>{a.desc}</p><span className="agent-quote">“{a.quote}”</span></div>
      </article>)}
    </div>
  </section>
}

function LiveDemo(){
  const [active,setActive]=useState("Writer");
  const [sent,setSent]=useState(false);
  const [message,setMessage]=useState("");
  const [reply,setReply]=useState("");
  const prompts={Writer:"Can you turn these meeting notes into a launch post?",Helper:"Can you help me answer a customer question?",Analyst:"Can you explain why sign-ups dipped last week?"};
  const responses={Writer:"I’ve shaped that into a concise, friendly draft with a clear opening and a simple call to action. Want a punchier version too?",Helper:"I can help with that. I’ve drafted a clear, friendly reply and kept the tone warm. Please review it before sending.",Analyst:"I’d start by comparing traffic sources, landing-page conversion and the signup flow. The biggest change appears to be in completion rate."};
  function sendMessage(event){
    event.preventDefault();
    const value=message.trim();
    if(!value) return;
    setReply(value);
    setSent(true);
    setMessage("");
  }
  return <section className="demo-section section-wrap" id="demo">
    <div className="section-heading"><div><div className="eyebrow">LIVE DEMO</div><h2>Watch them work.</h2><p>Pick an agent and see how it handles a real request.</p></div></div>
    <div className="demo-shell">
      <aside className="demo-sidebar">{["Writer","Helper","Analyst"].map(n=><button className={active===n?"selected":""} onClick={()=>{setActive(n);setSent(false);setReply("");setMessage("")}} key={n}><img src={robots[n]} alt=""/><span>{n}</span><span className="online-dot"/></button>)}</aside>
      <div className="chat-window">
        <div className="chat-top"><div className="mini-avatar"><img src={robots[active]} alt=""/></div><div><b>{active}</b><small>Ready to help · Online</small></div><span className="live-badge">LIVE DEMO</span></div>
        <div className="chat-body">
          <div className="chat-date">TODAY, 9:41 AM</div>
          <div className="bubble user-bubble">{prompts[active]}</div>
          <div className="agent-reply"><img src={robots[active]} alt=""/><div className="bubble bot-bubble">{sent?responses[active]:active==="Writer"?"Done. Three versions: punchy, friendly and formal. The friendly one opens with your customer’s quote.":active==="Helper"?"Of course. I found the order details and drafted a kind, clear reply for your customer.":"I found three likely causes. Traffic stayed steady, but the signup completion rate fell."}</div></div>
          <div className="bubble user-bubble followup">{sent?reply:"Friendly one. Make it shorter."}</div>
          <div className="agent-reply"><img src={robots[active]} alt=""/><div className="bubble bot-bubble">{sent?"Here’s a first-pass response based on your request. Please review details before using it.":"Trimmed to 80 words, with a link to the waitlist. Shall I schedule it for 9am?"}</div></div>
        </div>
        <form className="chat-input" onSubmit={sendMessage}><input aria-label="Demo message" value={message} onChange={e=>setMessage(e.target.value)} placeholder={`Ask ${active} anything…`}/><button aria-label="Send demo message" type="submit" disabled={!message.trim()}><Send size={17}/></button></form>
      </div>
    </div>
  </section>
}

function HowItWorks(){
  const [step,setStep]=useState(0);
  const steps=[["Pick an agent","Choose Writer, Helper or any of the six."],["Give it a job","Describe the task in plain words, once."],["Get it done","It works, checks in and reports back."]];
  return <section className="how-section section-wrap">
    <div className="eyebrow">HOW IT WORKS</div><h2>Three steps. Zero fuss.</h2>
    <div className="steps-grid">{steps.map((s,i)=><button key={s[0]} className={`step-card ${step===i?"active":""}`} onClick={()=>setStep(i)}><span className="eyebrow">STEP {i+1}</span><h3>{s[0]}</h3><p>{s[1]}</p></button>)}</div>
    <div className="step-illustration">
      <svg className="dotted-path" viewBox="0 0 1000 220" preserveAspectRatio="none" aria-hidden="true"><path d="M 20 185 C 210 185 250 55 500 85 S 790 185 980 185"/></svg>
      <div className="step-robot"><img src={robots.Builder} alt="Builder robot"/><span>1</span></div>
      <button data-number="2" aria-label="Step 2" className={`step-node node-two ${step===1?"chosen":""}`} onClick={()=>setStep(1)}>2</button>
      <button data-number="3" aria-label="Step 3" className={`step-node node-three ${step===2?"chosen":""}`} onClick={()=>setStep(2)}>3</button>
    </div>
  </section>
}

function Integrations(){
  const names=["Gmail","Notion","Google Drive","HubSpot","Shopify","Zendesk","Linear","GitHub","Figma","Stripe","Intercom","Airtable","Trello","Dropbox","Asana","Jira"];
  const logos=["DNsrnTe9Vs3INOIv7PwqY9MisE","rheSTSrhQnPi9Fmtlv7DL7KfQK8","EJKuifNs8QZE2TgQuIF8bp4N87Q","5KPZOkiR0PavEfqOs8YLKNB63c","vm4SYtfVOODyNgekTG0DvC5dlk","kC7xBJYflqqYXeYhbwYEhUpQoyc","vTpAp6tHcm411YsGkhI0GV5Bzc","XkirtgsWG0weAfR0PYybMRZcU","omEDVdnhS0V8dlF65G0GOBNExmU","UmD05ZcbGXFkoVDYg4I3RXC1Co","SWE9rcypgteo7FThtTdYZqS3T6w","dciVbHdh0VGDmCSPiF03ohPPV0","A4xcbMp6BHeh3o0wlmF9HlIppY","IASOGadPO6yZJCxq1HhViuIOD28","7cKMiuAn55dTNWVxkpT0uoOiFpk","dkYO6XtocsNb2AcnBid9HpepWzc"];
  return <section className="integrations section-wrap">
    <div className="integration-art"><img src={robots.Tidy} alt="Tidy robot"/></div>
    <div><div className="eyebrow">WORKS WITH</div><h2>Plugs into the tools<br/>you already use.</h2><p>All your favourite tools, playing nicely together.</p></div>
    <div className="integration-belt" aria-label="Supported integrations">
      <div className="integration-track">
        {[...names,...names].map((n,i)=><span key={`${n}-${i}`}><img src={`https://framerusercontent.com/images/${logos[i%logos.length]}.webp?height=160&width=160`} alt="" loading="lazy"/>{n}</span>)}
      </div>
    </div>
  </section>
}

function Pricing(){
  const [annual,setAnnual]=useState(false);
  const plans=[
    {name:"Solo",desc:"One agent for one busy person.",price:"$0",annual:"$0",note:"Free forever",items:["1 agent of your choice","100 tasks a month","Email help"],robots:["Writer"]},
    {name:"Team",desc:"Three agents that share one inbox.",price:"$29",annual:"$24",note:"Billed monthly",items:["3 agents","2,000 tasks a month","Shared team inbox"],robots:["Helper","Builder","Scout"],popular:true},
    {name:"Studio",desc:"All six agents, working together.",price:"$79",annual:"$65",note:"Billed monthly",items:["All 6 agents","Unlimited tasks","Priority help"],robots:["Tidy","Analyst","Writer","Helper","Builder","Scout"]}
  ];
  return <section className="pricing-section section-wrap" id="pricing">
    <div className="pricing-heading"><div className="eyebrow">PRICING</div><h2>Simple plans. Friendly<br/>robots.</h2><p>Start free with one agent. Add the rest when you’re ready.</p>
      <div className="billing-control"><div className="billing-switch"><button className={!annual?"active":""} onClick={()=>setAnnual(false)}>Monthly</button><button className={annual?"active":""} onClick={()=>setAnnual(true)}>Annual</button></div><span>2 MONTHS FREE</span></div>
    </div>
    <div className="pricing-grid">{plans.map((p,i)=><article className={`price-card price-${i}`} key={p.name}>
      <div className="price-robots">{p.robots.map(n=><img key={n} src={robots[n]} alt={`${n} robot`}/>)}</div>
      <div className="price-card-content">{p.popular&&<span className="popular">MOST HIRED</span>}<h3>{p.name}</h3><p>{p.desc}</p><div className="price"><strong>{annual?p.annual:p.price}</strong><span>/ mo</span></div><small>{p.note}</small><ul>{p.items.map(x=><li key={x}><Check size={16}/>{x}</li>)}</ul><Button className="price-button">{i===0?"Start free":i===1?"Hire the team":"Get Studio"}</Button></div>
    </article>)}</div>
  </section>
}

function Testimonials(){
  const quotes=[
    ["“Helper answers our customers at 3am and still sounds like us.”","Maya Ortiz","Founder, online plant shop","https://framerusercontent.com/images/fwHrn6foDYhA5mUEgVFdRkebHs.webp?height=640&width=640"],
    ["“Tidy merged four thousand duplicate contacts before my coffee went cold.”","Daniel Reyes","Sales lead, design agency","https://framerusercontent.com/images/fyEqf98M7wRuJGYicTKOjcI.webp?height=640&width=640"],
    ["“Writer drafts our Monday update. I just press send.”","Kai Nguyen","Operations, bakery chain","https://framerusercontent.com/images/Rxc9ZyJmE47tatlyGzxzhPJaKVk.webp?height=640&width=640"]
  ];
  return <section className="testimonials section-wrap" id="testimonials"><div className="eyebrow">KIND WORDS</div><h2>People like having them around.</h2><p>Small teams, big sighs of relief.</p><div className="quote-grid">{quotes.map((q,i)=><article className="quote-card" key={q[1]}><span className="quote-mark">“</span><h3>{q[0]}</h3><div className="person"><img className={`person-avatar avatar-${i}`} src={q[3]} alt={q[1]} loading="lazy"/><div><b>{q[1]}</b><small>{q[2]}</small></div></div></article>)}</div></section>
}

function FAQ(){
  const [active,setActive]=useState(-1);
  return <section className="faq-section section-wrap"><div className="faq-art"><img src={robots.Helper} alt="Helper robot"/><span className="eyebrow">ASK ME</span></div><div className="faq-content"><div className="eyebrow">FAQ</div><h2>Questions, answered.</h2><div className="faq-list">{faqs.map((f,i)=><div className={`faq-item ${active===i?"expanded":""}`} key={f[0]}><button onClick={()=>setActive(active===i?-1:i)}><span>{f[0]}</span>{active===i?<X size={18}/>:<Plus size={18}/>}</button>{active===i&&<p>{f[1]}</p>}</div>)}</div></div></section>
}

function Waitlist(){
  const [submitted,setSubmitted]=useState(false);
  return <section className="waitlist section-wrap" id="waitlist"><div className="waitlist-copy"><div className="eyebrow">GET STARTED</div><h2>Hire your<br/><em>first agent.</em></h2><p>Join the waitlist and we’ll set you up this week.</p><div className="waitlist-robot"><img src={robots.Writer} alt="Writer robot"/></div></div>
    <form className="waitlist-form" onSubmit={e=>{e.preventDefault();setSubmitted(true)}}><label>Your name<input required placeholder="Sam Rivera"/></label><label>Work email<input required type="email" placeholder="sam@company.com"/></label><label>Team size<select defaultValue=""><option value="" disabled>Select team size</option><option>Just me</option><option>2–5 people</option><option>6–20 people</option><option>21–50 people</option><option>50+ people</option></select></label><button className="button submit-button">{submitted?"You're on the list!":"Join the waitlist"}<ArrowRight size={17}/></button><small>{submitted?"Thanks — this demo form has recorded your submission locally.":"No spam. Just a little help getting started."}</small></form>
  </section>
}

function Footer(){
  return <footer className="footer section-wrap" id="footer"><div className="footer-top"><div className="footer-brand"><a className="brand" href="#/" aria-label="CuteAIStudio home"><span className="brand-mark"><i/><i/></span><span>CuteAIStudio</span></a><p>Friendly AI agents for small teams that would rather do the fun part.</p><a href="mailto:hello@cuteaistudio.com">hello@cuteaistudio.com</a></div><div className="footer-links"><div><b>Product</b><a href="#/agents">Agents</a><a href="#/pricing">Pricing</a><a href="#/changelog">Changelog</a></div><div><b>Company</b><a href="#/about">About</a><a href="#/about">Contact</a><a href="#/about">Privacy</a></div></div><div className="footer-bots">{["Writer","Builder","Scout","Helper","Tidy","Analyst"].map(n=><img key={n} src={robots[n]} alt={`${n} robot`} loading="lazy"/>)}</div></div><div className="footer-bottom"><span>© 2026 CuteAIStudio</span><span>Made by humans, tidied by robots ✦</span></div></footer>
}

function PageIntro({eyebrow,title,copy}){
  return <section className="inner-page-hero section-wrap"><div className="eyebrow">{eyebrow}</div><h1>{title}</h1><p>{copy}</p></section>
}

function HomePage(){return <><Hero/><Intro/><AgentShowcase/><LiveDemo/><HowItWorks/><Integrations/><Pricing/><Testimonials/><FAQ/><Waitlist/></>}
function AgentsPage(){return <><PageIntro eyebrow="MEET YOUR TEAM" title={<>Six agents. One tidy team.</>} copy="A little help for the work that keeps your people from doing their best work."/><AgentShowcase/><LiveDemo/><HowItWorks/><section className="section-wrap agents-cta"><h2>Ready to meet your first agent?</h2><p>Start with one. Add the rest when you need them.</p><a className="button" href="#/pricing">Explore plans <ArrowRight size={17}/></a></section></>}
function PricingPage(){return <><Pricing/><section className="section-wrap pricing-extra"><div className="eyebrow">NOT SURE YET?</div><h2>Start small. Grow when you’re ready.</h2><p>Try one agent first, then bring more of your team into the studio.</p></section><FAQ/><Waitlist/></>}
function ChangelogPage(){const updates=[{version:"01",title:"A team of six, ready to help",date:"PRODUCT UPDATE",copy:"Meet Scout, Helper, Writer, Builder, Analyst and Tidy — six focused agents for the work that fills your day."},{version:"02",title:"Your tools, together",date:"INTEGRATIONS",copy:"Bring your everyday workspace tools into one connected flow, so hand-offs feel a little less like hand-offs."},{version:"03",title:"Plans that grow with you",date:"PRICING UPDATE",copy:"Start with one agent and add more as your team and workload grow."}];return <><PageIntro eyebrow="CHANGELOG" title={<>Little updates.<br/>More good work.</>} copy="A running note of what’s new around the studio."/><section className="changelog-list section-wrap">{updates.map(u=><article className="changelog-item" key={u.version}><span className="changelog-number">{u.version}</span><div><div className="eyebrow">{u.date}</div><h2>{u.title}</h2><p>{u.copy}</p></div><span className="changelog-spark">✦</span></article>)}</section><section className="section-wrap changelog-bottom"><h2>More helpful things are on the way.</h2><a className="button" href="#/agents">Meet the agents <ArrowRight size={17}/></a></section></>}
function AboutPage(){return <><PageIntro eyebrow="ABOUT CUTEAISTUDIO" title={<>Small team.<br/>Extra hands.</>} copy="We think the best technology gives people more room to do the work only people can do."/><Intro/><HowItWorks/><Integrations/><Testimonials/><Waitlist/></>}

export default function App(){
  const [route,setRoute]=useState(window.location.hash.replace(/^#/,"") || "/");
  useEffect(()=>{const update=()=>{setRoute(window.location.hash.replace(/^#/,"") || "/");window.scrollTo({top:0,behavior:"auto"})};window.addEventListener("hashchange",update);return()=>window.removeEventListener("hashchange",update)},[]);
  useEffect(()=>{if(route.includes("section=waitlist"))document.getElementById("waitlist")?.scrollIntoView({behavior:"smooth",block:"start"})},[route]);
  useEffect(()=>{
    gsap.registerPlugin(ScrollTrigger);
    const reduceMotion=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if(reduceMotion) return;
    const ctx=gsap.context(()=>{
      const hero=gsap.timeline({defaults:{ease:"power3.out"}});
      if(document.querySelector(".hero")) hero.from(".hero .status",{y:12,autoAlpha:0,duration:.55}).from(".hero h1",{y:42,autoAlpha:0,duration:.8},"-=.25").from(".hero-copy",{y:16,autoAlpha:0,duration:.55},"-=.38").from(".hero-button",{y:12,scale:.96,autoAlpha:0,duration:.45},"-=.28").from(".hero-podium",{y:48,autoAlpha:0,stagger:.09,duration:.75,ease:"back.out(1.35)"},"-=.12");
      gsap.utils.toArray("main section:not(.hero), .footer").forEach(section=>{const targets=section.querySelectorAll(".eyebrow, h2, .section-heading, .agent-card, .step-card, .price-card, .quote-card, .faq-item, .waitlist-form");if(targets.length)gsap.from(targets,{y:20,autoAlpha:0,duration:.65,stagger:.055,ease:"power2.out",clearProps:"transform",scrollTrigger:{trigger:section,start:"top 82%",once:true}})});
      gsap.utils.toArray(".hero-podium img, .price-robots img, .step-robot img, .integration-art img, .faq-art img, .waitlist-robot img").forEach((robot,i)=>gsap.to(robot,{y:i%2?-5:-8,duration:2.8+(i%3)*.4,repeat:-1,yoyo:true,ease:"sine.inOut",delay:(i%4)*.16}));
      gsap.from(".navbar .brand, .navbar .nav-links, .navbar .nav-cta",{y:-10,autoAlpha:0,duration:.5,stagger:.07,ease:"power2.out"});
      if(document.querySelector(".step-illustration"))gsap.fromTo(".dotted-path",{scaleX:0,transformOrigin:"left center"},{scaleX:1,duration:1,ease:"power2.out",scrollTrigger:{trigger:".step-illustration",start:"top 75%",once:true}});
    });
    return ()=>ctx.revert();
  },[route]);
  let page;
  switch(route.split("?")[0]){
    case "/agents": page=<AgentsPage/>; break;
    case "/pricing": page=<PricingPage/>; break;
    case "/changelog": page=<ChangelogPage/>; break;
    case "/about": page=<AboutPage/>; break;
    default: page=<HomePage/>;
  }
  return <><Navbar/><main key={route}>{page}</main><Footer/></>;
}
