document.addEventListener('DOMContentLoaded',()=>{
  document.querySelectorAll('.tour-expand').forEach(button=>button.addEventListener('click',()=>{
    const event=button.closest('.tour-event');const open=event.classList.toggle('is-expanded');
    const detailId=button.getAttribute('aria-controls');const detail=detailId?document.getElementById(detailId):null;
    button.setAttribute('aria-expanded',String(open));button.querySelector('span').textContent=open?'−':'＋';
    if(detail){detail.setAttribute('aria-hidden',String(!open));detail.inert=!open;}
  }));
  const format=ms=>{if(ms<=0)return 'SHOWTIME IS HERE';const s=Math.floor(ms/1000),d=Math.floor(s/86400),h=Math.floor((s%86400)/3600),m=Math.floor((s%3600)/60);return `${d}D  ${String(h).padStart(2,'0')}H  ${String(m).padStart(2,'0')}M`;};
  const update=()=>document.querySelectorAll('.tour-event[data-event-date]').forEach(card=>{const target=Date.parse(card.dataset.eventDate);const label=card.querySelector('.countdown-value');if(label&&Number.isFinite(target))label.textContent=format(target-Date.now());});
  update();window.setInterval(update,60000);
});
