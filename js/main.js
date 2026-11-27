{
const m=document.querySelector('.menu'),l=document.querySelector('.links');
if(m)m.addEventListener('click',()=>{const o=l.classList.toggle('open');m.setAttribute('aria-expanded',o)});
const els=document.querySelectorAll('.reveal');
if('IntersectionObserver' in window){const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.1});els.forEach(e=>io.observe(e))}else els.forEach(e=>e.classList.add('in'));
const fb=document.querySelectorAll('.filters button');
fb.forEach(b=>b.addEventListener('click',()=>{fb.forEach(x=>x.setAttribute('aria-pressed',x===b));const f=b.dataset.f;document.querySelectorAll('#work > a').forEach(p=>{p.style.display=(f==='all'||p.dataset.cat===f)?'':'none'})}));
const tabs=[...document.querySelectorAll('[role=tab]')];
const sel=t=>{tabs.forEach(x=>{const on=x===t;x.setAttribute('aria-selected',on);x.tabIndex=on?0:-1;document.getElementById(x.getAttribute('aria-controls')).hidden=!on});t.focus()};
tabs.forEach((t,i)=>{t.addEventListener('click',()=>sel(t));t.addEventListener('keydown',e=>{if(e.key==='ArrowRight')sel(tabs[(i+1)%tabs.length]);if(e.key==='ArrowLeft')sel(tabs[(i-1+tabs.length)%tabs.length])})});
const cf=document.getElementById('cf');
if(cf)cf.addEventListener('submit',e=>{e.preventDefault();if(!cf.reportValidity())return;document.getElementById('ok').style.display='block'});
const fail=i=>{const fb=i.dataset.fallback;if(fb&&!i.dataset.used){i.dataset.used=1;i.src=fb;return}if(i.closest('.ph')){i.remove();return}if(i.dataset.ph)return;i.dataset.ph=1;const t=(i.alt||'Photo').replace(/[<&>"]/g,'');const svg=`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 900' preserveAspectRatio='xMidYMid slice'><defs><radialGradient id='g' cx='.85' cy='0' r='.9'><stop offset='0' stop-color='#ff6a00' stop-opacity='.32'/><stop offset='.6' stop-color='#ff6a00' stop-opacity='0'/></radialGradient><pattern id='p' width='48' height='48' patternUnits='userSpaceOnUse'><path d='M48 0H0V48' fill='none' stroke='#fff' stroke-opacity='.04'/></pattern></defs><rect width='1200' height='900' fill='#121212'/><rect width='1200' height='900' fill='url(#p)'/><rect width='1200' height='900' fill='url(#g)'/><g transform='translate(576 380)' fill='none' stroke='#ff6a00' stroke-width='3' stroke-opacity='.85'><path d='M4 14h12l8-10h24l8 10h12v42H4z'/><circle cx='36' cy='34' r='12'/></g><text x='600' y='500' fill='#8a8a84' font-family='Inter,Arial,sans-serif' font-size='30' text-anchor='middle'>${t}</text></svg>`;i.src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svg);i.style.filter='none'};
document.querySelectorAll('img').forEach(i=>{i.addEventListener('error',()=>fail(i));if(i.complete&&i.getAttribute('src')&&!i.naturalWidth)fail(i)});
}
