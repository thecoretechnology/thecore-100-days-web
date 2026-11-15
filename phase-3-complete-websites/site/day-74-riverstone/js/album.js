document.addEventListener('DOMContentLoaded',()=>{
  const tabs=[...document.querySelectorAll('.album-track-tabs [data-side]')];
  const panels={a:document.getElementById('album-side-a'),b:document.getElementById('album-side-b')};
  function activate(side){tabs.forEach(tab=>{const active=tab.dataset.side===side;tab.classList.toggle('is-active',active);tab.setAttribute('aria-selected',String(active));tab.tabIndex=active?0:-1;});Object.entries(panels).forEach(([key,panel])=>{if(panel)panel.hidden=key!==side;});}
  tabs.forEach((tab,index)=>{tab.addEventListener('click',()=>activate(tab.dataset.side));tab.addEventListener('keydown',event=>{if(event.key==='ArrowRight'||event.key==='ArrowLeft'){event.preventDefault();const next=tabs[(index+(event.key==='ArrowRight'?1:-1)+tabs.length)%tabs.length];next.focus();activate(next.dataset.side);}});});
  activate('a');
});
