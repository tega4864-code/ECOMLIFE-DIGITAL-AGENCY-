(()=>{
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
const FINE=matchMedia('(pointer: fine)').matches;
const clamp=(v,a,b)=>Math.min(b,Math.max(a,v));
document.body.classList.add('ready');

/* desktop smooth wheel scrolling (native scroll underneath, so sticky and anchors still work) */
if(FINE&&!RM){
  const root=document.documentElement;let target=scrollY,cur=scrollY,run=false;
  const max=()=>root.scrollHeight-innerHeight;
  const own=(el,dy)=>{while(el&&el!==document.body&&el!==root){const s=getComputedStyle(el);if(/(auto|scroll)/.test(s.overflowY)&&el.scrollHeight>el.clientHeight+1){const top=el.scrollTop<=0,bot=el.scrollTop+el.clientHeight>=el.scrollHeight-1;if((dy<0&&!top)||(dy>0&&!bot))return true}el=el.parentElement}return false};
  const tick=()=>{cur+=(target-cur)*.11;if(Math.abs(target-cur)<.5){cur=target;run=false}root.style.scrollBehavior='auto';scrollTo(0,cur);if(run)requestAnimationFrame(tick)};
  addEventListener('wheel',e=>{if(e.ctrlKey||e.defaultPrevented||own(e.target,e.deltaY)||document.body.classList.contains('menu-open'))return;
    e.preventDefault();if(!run)target=cur=scrollY;const d=e.deltaMode===1?e.deltaY*32:e.deltaY;target=clamp(target+d,0,max());if(!run){run=true;requestAnimationFrame(tick)}},{passive:false});
  addEventListener('scroll',()=>{if(!run){target=cur=scrollY}},{passive:true});
  ['keydown','mousedown','touchstart'].forEach(ev=>addEventListener(ev,()=>{run=false;target=cur=scrollY},{passive:true}));
}

/* reveal for home blocks */
const rv=$$('.s8-head,.pain,.sc8,.ba,.ba-notes,.lv8-c,.fo8-ph,.fo8-f,.fq,.hc8,.prob-ph');
rv.forEach(e=>e.classList.add('rv8'));
if('IntersectionObserver' in window&&!RM){const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){const sib=[...e.target.parentElement.children].filter(x=>x.classList.contains('rv8'));e.target.style.transitionDelay=Math.min(sib.indexOf(e.target),5)*80+'ms';e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12,rootMargin:'0px 0px -6% 0px'});rv.forEach(e=>io.observe(e))}else rv.forEach(e=>e.classList.add('in'));

/* words that light up as you read */
const lites=$$('.lite');
lites.forEach(p=>{const walk=n=>{[...n.childNodes].forEach(c=>{if(c.nodeType===3){const f=document.createDocumentFragment();c.textContent.split(/(\s+)/).forEach(w=>{if(!w)return;if(/^\s+$/.test(w))f.appendChild(document.createTextNode(w));else{const s=document.createElement('span');s.className='lw';s.textContent=w;f.appendChild(s)}});c.replaceWith(f)}else walk(c)})};walk(p);p._w=$$('.lw',p)});

/* before / after slider */
$$('.ba').forEach(ba=>{const r=$('.ba-r',ba),v=$('.ba-view',ba);const set=p=>{ba.style.setProperty('--p',p+'%');r.value=p};
  r.addEventListener('input',()=>set(r.value));
  r.addEventListener('pointerdown',()=>ba.classList.add('drag'));addEventListener('pointerup',()=>ba.classList.remove('drag'));
  if(!RM){let done=false;const io=new IntersectionObserver(es=>{if(es[0].isIntersecting&&!done){done=true;let t0=null;const an=t=>{if(!t0)t0=t;const k=(t-t0)/1600;if(k>=1){set(50);return}set(Math.round(50+Math.sin(k*Math.PI*2)*22));requestAnimationFrame(an)};requestAnimationFrame(an)}},{threshold:.5});io.observe(v)}
});

/* results: sideways while you scroll (desktop), swipe on mobile */
const hr=$('.hr8'),track=hr&&$('.hr8-track',hr),prog=hr&&$('.hr8-prog i',hr);
let dist=0;
const layout=()=>{if(!hr)return;const wide=innerWidth>1000&&!RM;hr.classList.toggle('pinned',wide);track.style.transform='';
  if(wide){dist=Math.max(0,track.scrollWidth-innerWidth);hr.style.height=(innerHeight+dist)+'px'}else{hr.style.height='';dist=0}};
if(hr){layout();addEventListener('resize',layout);addEventListener('load',layout);
  if(!hr.classList.contains('pinned'))track.addEventListener('scroll',()=>{const m=track.scrollWidth-track.clientWidth;prog.style.transform=`scaleX(${m?track.scrollLeft/m:0})`},{passive:true})}

/* process line */
const pl=$('.pr8-list'),stp=$$('.st8');

/* launch vs scale toggle */
const tog=$('.lv8-tog');
if(tog){const bs=$$('button',tog),pill=$('.lv8-pill',tog),cards=$$('.lv8-c');
  const sel=b=>{bs.forEach(x=>x.setAttribute('aria-selected',x===b));pill.style.width=b.offsetWidth+'px';pill.style.transform=`translateX(${b.offsetLeft-5}px)`;cards.forEach(c=>c.classList.toggle('on',c.dataset.l===b.dataset.l))};
  bs.forEach(b=>b.addEventListener('click',()=>sel(b)));cards.forEach(c=>c.addEventListener('mouseenter',()=>{if(innerWidth>640)sel(bs.find(b=>b.dataset.l===c.dataset.l))}));
  const init=()=>sel(bs.find(b=>b.getAttribute('aria-selected')==='true'));init();addEventListener('resize',init);document.fonts&&document.fonts.ready.then(init)}

/* spotlight that follows the cursor on cards */
if(FINE)[].forEach(c=>c.addEventListener('pointermove',e=>{const r=c.getBoundingClientRect();c.style.setProperty('--mx',e.clientX-r.left+'px');c.style.setProperty('--my',e.clientY-r.top+'px')}));

/* hero mock-up: gentle depth on mouse move */
const mk=$('.mk');
if(mk&&FINE&&!RM){const h=$('.h8');let tx=0,ty=0,cx=0,cy=0;h.addEventListener('pointermove',e=>{tx=(e.clientX/innerWidth-.5);ty=(e.clientY/innerHeight-.5)});
  const lap=$('.mk-lap',mk),ph=$('.mk-phone',mk),chips=$$('.mchip',mk);
  const loop=()=>{cx+=(tx-cx)*.06;cy+=(ty-cy)*.06;lap.style.transform=`translate(${cx*-10}px,${cy*-8}px)`;ph.style.transform=`translate(${cx*18}px,${cy*14}px)`;chips.forEach((c,i)=>c.style.transform=`translate(${cx*(26+i*10)}px,${cy*(20+i*8)}px)`);requestAnimationFrame(loop)};loop()}

/* one scroll loop for everything that follows the scroll position */
let ticking=false;
const onScroll=()=>{ticking=false;const vh=innerHeight;
  lites.forEach(p=>{const r=p.getBoundingClientRect();const k=clamp((vh*.85-r.top)/(r.height+vh*.35),0,1);const n=Math.round(k*p._w.length);p._w.forEach((w,i)=>w.classList.toggle('on',RM||i<n))});
  if(hr&&hr.classList.contains('pinned')){const r=hr.getBoundingClientRect();const k=clamp(-r.top/Math.max(1,dist),0,1);track.style.transform=`translate3d(${-k*dist}px,0,0)`;prog.style.transform=`scaleX(${k})`}
  if(pl){const r=pl.getBoundingClientRect();const k=clamp((vh*.6-r.top)/r.height,0,1);pl.style.setProperty('--pl',k);$('.pr8-line i',pl)&&($('.pr8-line i',pl).style.transform=`scaleY(${k})`);stp.forEach(s=>{const d=$('.st8-d',s).getBoundingClientRect();s.classList.toggle('on',d.top<vh*.6)})}
};
addEventListener('scroll',()=>{if(!ticking){ticking=true;requestAnimationFrame(onScroll)}},{passive:true});
addEventListener('resize',onScroll);onScroll();
})();
(()=>{const w=document.querySelector('.hd-word'),p=document.querySelector('.hd-por');if(!w||matchMedia('(prefers-reduced-motion: reduce)').matches||innerWidth<900)return;let t=false;
addEventListener('scroll',()=>{if(t)return;t=true;requestAnimationFrame(()=>{t=false;const y=Math.min(scrollY,innerHeight);w.style.translate=`0 ${y*-.12}px`;p.style.translate=`0 ${y*.08}px`})},{passive:true})})();

(()=>{const b=document.getElementById('fab-b'),p=document.getElementById('fab-p');if(!b)return;
const set=o=>{p.hidden=!o;b.setAttribute('aria-expanded',o)};
b.addEventListener('click',e=>{e.stopPropagation();set(p.hidden)});
document.addEventListener('click',e=>{if(!p.hidden&&!e.target.closest('#fab'))set(false)});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!p.hidden){set(false);b.focus()}})})();
