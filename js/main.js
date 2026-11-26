{
const m=document.querySelector('.menu'),l=document.querySelector('.links');
if(m)m.addEventListener('click',()=>{const o=l.classList.toggle('open');m.setAttribute('aria-expanded',o)});
const els=document.querySelectorAll('.reveal');
if('IntersectionObserver' in window){const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});els.forEach(e=>io.observe(e))}else els.forEach(e=>e.classList.add('in'));
const fb=document.querySelectorAll('.filters button');
fb.forEach(b=>b.addEventListener('click',()=>{fb.forEach(x=>x.setAttribute('aria-pressed',x===b));const f=b.dataset.f;document.querySelectorAll('#work .proj').forEach(p=>{p.style.display=(f==='all'||p.dataset.cat===f)?'':'none'})}));
const cf=document.getElementById('cf');
if(cf)cf.addEventListener('submit',e=>{e.preventDefault();if(!cf.reportValidity())return;document.getElementById('ok').style.display='block'});
}
