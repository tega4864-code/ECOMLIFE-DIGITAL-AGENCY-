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
document.querySelectorAll('.ph img').forEach(i=>{const k=()=>i.remove();if(i.complete&&!i.naturalWidth)k();else i.addEventListener('error',k)});
}
