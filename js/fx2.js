{
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches, FINE=matchMedia('(pointer:fine)').matches, MOB=()=>innerWidth<=700;
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];

/* nav: sliding underline indicator */
const links=$('.links');
if(links){const nl=document.createElement('span');nl.className='nl';links.appendChild(nl);
  const items=$$('a:not(.btn)',links),cur=links.querySelector('[aria-current]');
  const to=a=>{if(!a||innerWidth<=900){nl.style.opacity=0;return}nl.style.opacity=1;nl.style.width=a.offsetWidth-24+'px';nl.style.transform=`translateX(${a.offsetLeft+12}px)`};
  items.forEach(a=>a.addEventListener('mouseenter',()=>to(a)));links.addEventListener('mouseleave',()=>to(cur));
  addEventListener('resize',()=>to(cur));addEventListener('load',()=>to(cur));setTimeout(()=>to(cur),60);setTimeout(()=>to(cur),800);if(document.fonts)document.fonts.ready.then(()=>to(cur))}

/* header hide on scroll down, show on up */
const nav=$('.nav');let ly=scrollY;
addEventListener('scroll',()=>{const y=scrollY;nav.classList.toggle('scrolled',y>40);if(!document.querySelector('.links.open'))nav.classList.toggle('hide',y>ly&&y>300);ly=y},{passive:true});

/* mobile menu: full screen with staggered links */
const mb=$('.menu');
if(mb&&links){$$('a',links).forEach((a,i)=>a.style.setProperty('--i',i));
  mb.addEventListener('click',()=>{const o=links.classList.contains('open');mb.classList.toggle('x',o);document.body.classList.toggle('lock',o)});
  links.addEventListener('click',e=>{if(e.target.closest('a')){links.classList.remove('open');mb.classList.remove('x');mb.setAttribute('aria-expanded',false);document.body.classList.remove('lock')}})}

/* generic scroll reveals with stagger */
const rvSel='.band p:not(.note),.band li,.proj,.lane,.svc,.zz,.vals2>div,.d90>div,.inc>div,.why1>div,.band details,.tools span,.chips span,.metrics div,.case-cols>div,.hl-row,.aud>div,.jr>div,.tpanel,.cmp,.calc,.lead-m,.bcard,.hx-stats>div,.statband .wrap>div,.vals>div,.cinfo>div,.ways>*,.next li,.fgrid>div';
if(!RM){const els=$$(rvSel).filter(e=>!e.closest('.reveal,.rv,.ss-step,.calc-out,form,.hx-in .pill')&&!e.classList.contains('reveal'));
  els.forEach(e=>{e.classList.add('rv');const sib=[...e.parentElement.children].filter(x=>x.classList.contains('rv'));e.style.setProperty('--d',Math.min(sib.indexOf(e),6)*80+'ms')});
  $$('.ph,.zz-img,.case-img,.ah-photo,.gal img,.showcase').forEach(e=>e.classList.add('imgrv'));
  const ro=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');ro.unobserve(e.target)}}),{threshold:.12,rootMargin:'0px 0px -6% 0px'});
  $$('.rv,.imgrv').forEach(e=>ro.observe(e))}

/* 3D tilt + spotlight on cards (mouse) */
if(FINE&&!RM){$$('.proj,.lane,.svc,.vals2>div,.d90>div,.bcard,.aud>div').forEach(c=>{c.classList.add('tilt');
    c.addEventListener('mousemove',e=>{const r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;c.style.transform=`perspective(900px) rotateX(${-y*5}deg) rotateY(${x*6}deg) translateY(-4px)`;c.style.setProperty('--mx',(x+.5)*100+'%');c.style.setProperty('--my',(y+.5)*100+'%')});
    c.addEventListener('mouseleave',()=>{c.style.transform=''})});
  $$('.inc>div,.lane.hot,.calc-out,.tpanel,.lead-m,.hx,.ph-hero,.sh,.ct-l').forEach(c=>{c.classList.add('spot');c.addEventListener('mousemove',e=>{const r=c.getBoundingClientRect();c.style.setProperty('--sx',e.clientX-r.left+'px');c.style.setProperty('--sy',e.clientY-r.top+'px')})});
  const g=$('.hx-glow');const hx=$('.hx');if(g&&hx)hx.addEventListener('mousemove',e=>{const r=hx.getBoundingClientRect();g.style.transform=`translate(calc(-50% + ${(e.clientX-r.left-r.width/2)*.15}px),${(e.clientY-r.top-r.height/2)*.15}px)`})}

/* mobile swipe rows with dots */
const swSel='.work,.sgrid,.why1,.vals2,.inc,.d90,.aud,.bento,.lanes,.pgrid,.vals,.metrics';
$$(swSel).forEach(w=>{if(w.closest('.car'))return;w.classList.add('swipe');const kids=[...w.children];if(kids.length<2)return;
  const dots=document.createElement('div');dots.className='dots';dots.setAttribute('aria-hidden','true');kids.forEach((k,i)=>{const d=document.createElement('button');d.tabIndex=-1;d.addEventListener('click',()=>w.scrollTo({left:k.offsetLeft-w.offsetLeft,behavior:'smooth'}));dots.appendChild(d)});w.after(dots);
  const upd=()=>{const vis=kids.filter(k=>k.style.display!=='none');let best=0,bd=1e9;vis.forEach((k,i)=>{const d=Math.abs(k.getBoundingClientRect().left-w.getBoundingClientRect().left);if(d<bd){bd=d;best=kids.indexOf(k)}});[...dots.children].forEach((d,i)=>{d.classList.toggle('on',i===best);d.style.display=kids[i].style.display==='none'?'none':''})};
  w.addEventListener('scroll',upd,{passive:true});addEventListener('resize',upd);upd();w._upd=upd});
$$('.filters button').forEach(b=>b.addEventListener('click',()=>setTimeout(()=>{$$('.swipe').forEach(w=>{w.scrollLeft=0;w._upd&&w._upd()})},0)));

/* mobile bottom action bar + back to top ring */
const bar=document.createElement('div');bar.className='mbar';bar.innerHTML='<a class="btn p" href="contact.html">Book a free call</a><a class="mwa" href="https://wa.me/" aria-label="Chat on WhatsApp"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20l1.3-4A8 8 0 1 1 8 18.8z"/><path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.5-2-1-1 .8c-1-.4-1.9-1.3-2.3-2.3l.8-1-1-2z"/></svg></a>';
if(!location.pathname.endsWith('contact.html'))document.body.appendChild(bar);
const top=document.createElement('button');top.className='totop';top.setAttribute('aria-label','Back to top');top.innerHTML='<svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="21"/><circle class="pr" cx="24" cy="24" r="21"/><path d="M24 31V17M18 23l6-6 6 6"/></svg>';document.body.appendChild(top);
top.addEventListener('click',()=>scrollTo({top:0,behavior:RM?'auto':'smooth'}));
const pr=$('.pr',top),L=2*Math.PI*21;pr.style.strokeDasharray=L;
const tick=()=>{const h=document.documentElement.scrollHeight-innerHeight,p=h>0?scrollY/h:0;pr.style.strokeDashoffset=L*(1-p);top.classList.toggle('on',scrollY>600);bar.classList.toggle('on',scrollY>400)};
addEventListener('scroll',tick,{passive:true});tick();

/* tap ripple on touch */
if(!FINE)document.addEventListener('pointerdown',e=>{const t=e.target.closest('.btn,.chip span,.proj,.hl-row,.tabs button,.filters button,.car-ctrl button,summary');if(!t)return;const r=t.getBoundingClientRect(),s=document.createElement('span');s.className='rip';s.style.left=e.clientX-r.left+'px';s.style.top=e.clientY-r.top+'px';if(getComputedStyle(t).position==='static')t.style.position='relative';t.style.overflow='hidden';t.appendChild(s);setTimeout(()=>s.remove(),600)});

/* mobile: services list rows open an inline photo when tapped into view */
if(!FINE){const hl=$('.hlist');if(hl){const imgs=$$('.hl-float img',hl);$$('.hl-row',hl).forEach((r,i)=>{const im=imgs[i];if(!im)return;const c=im.cloneNode();c.className='hl-thumb';c.removeAttribute('loading');c.addEventListener('error',()=>{if(c.dataset.fallback&&!c.dataset.used){c.dataset.used=1;c.src=c.dataset.fallback}});r.prepend(c)})}}
}
