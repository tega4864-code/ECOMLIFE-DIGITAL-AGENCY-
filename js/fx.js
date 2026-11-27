{
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches, FINE=matchMedia('(pointer:fine)').matches;
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
let ss=null;try{ss=sessionStorage}catch(e){}

document.body.classList.add('ready');
/* scroll progress */
const bar=document.createElement('div');bar.className='sprog';document.body.appendChild(bar);

/* split headings into words */
if(!RM)$$('h1,h2,.big,.big2').forEach(h=>{if(h.closest('.ph,form'))return;const w=document.createTreeWalker(h,NodeFilter.SHOW_TEXT);const nodes=[];while(w.nextNode())nodes.push(w.currentNode);let i=0;
  nodes.forEach(t=>{const f=document.createDocumentFragment();t.textContent.split(/(\s+)/).forEach(p=>{if(!p)return;if(/^\s+$/.test(p)){f.appendChild(document.createTextNode(p));return}const o=document.createElement('span');o.className='w';const n=document.createElement('span');n.className='wi';n.style.transitionDelay=(i++*40)+'ms';n.textContent=p;o.appendChild(n);f.appendChild(o)});t.replaceWith(f)});h.classList.add('splitted')});
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.15});
$$('.splitted,.bar70,.lines').forEach(e=>io.observe(e));

/* button text roll + magnetic */
$$('.btn').forEach(b=>{if(b.children.length)return;const t=b.textContent;b.textContent='';const r=document.createElement('span');r.className='roll';const a=document.createElement('span');a.textContent=t;const c=document.createElement('span');c.textContent=t;c.setAttribute('aria-hidden','true');r.append(a,c);b.appendChild(r)});
if(FINE&&!RM)$$('.btn.p,.btn.k').forEach(b=>{b.addEventListener('mousemove',e=>{const r=b.getBoundingClientRect();b.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.2}px,${(e.clientY-r.top-r.height/2)*.3}px)`});b.addEventListener('mouseleave',()=>{b.style.transform=''})});

/* cursor */
if(false){const c=document.createElement('div');c.className='cur';document.body.appendChild(c);let x=-50,y=-50,cx=x,cy=y;
  addEventListener('mousemove',e=>{x=e.clientX;y=e.clientY});
  document.addEventListener('mouseover',e=>{c.classList.toggle('big',!!e.target.closest('a,button,label,summary,input,select,textarea'))});
  const loop=()=>{cx+=(x-cx)*.2;cy+=(y-cy)*.2;c.style.transform=`translate(${cx}px,${cy}px)`;requestAnimationFrame(loop)};loop()}

/* counters */
const cio=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;cio.unobserve(e.target);const el=e.target,m=el.dataset.raw.match(/^([^\d]*)(\d+(?:\.\d+)?)(.*)$/);if(!m)return;const end=parseFloat(m[2]),dec=(m[2].split('.')[1]||'').length,t0=performance.now(),d=1400;
  const f=t=>{const p=Math.min(1,(t-t0)/d),v=end*(1-Math.pow(1-p,3));el.textContent=m[1]+v.toFixed(dec)+m[3];if(p<1)requestAnimationFrame(f)};requestAnimationFrame(f)}),{threshold:.4});
$$('.hx-stats dd,.statband b,.rh-stats b,.ccard b,.count').forEach(el=>{el.dataset.raw=el.textContent.trim();if(!RM&&/^\D*\d/.test(el.dataset.raw)&&!/:/.test(el.dataset.raw))cio.observe(el)});

/* scroll-driven: progress, parallax, velocity marquee */
const par=$$('.ph img,.rh-bg,.cb-bg,.par');const vm=$$('.vmarq .track');let last=scrollY,vel=0,off=0;
const onScroll=()=>{const h=document.documentElement.scrollHeight-innerHeight;bar.style.transform=`scaleX(${h>0?scrollY/h:0})`};
addEventListener('scroll',onScroll,{passive:true});onScroll();
const frame=()=>{const d=scrollY-last;last=scrollY;vel+=(d-vel)*.1;
  if(!RM){const vh=innerHeight;par.forEach(i=>{const p=i.parentElement;if(!p)return;const r=p.getBoundingClientRect();if(r.bottom<0||r.top>vh)return;const k=((r.top+r.height/2)-vh/2)/vh;i.style.transform=`translateY(${k*-6}%) scale(1.14)`});
    off+=.6+Math.abs(vel)*.35;vm.forEach((t,ix)=>{const w=t.scrollWidth/2;if(!w)return;const o=off%w;t.style.transform=`translateX(${ix%2?(o-w):-o}px)`})}
  requestAnimationFrame(frame)};requestAnimationFrame(frame);

/* hover image list */
$$('.hlist').forEach(l=>{const box=$('.hl-float',l);if(!box||!FINE)return;let x=0,y=0,bx=0,by=0;
  l.addEventListener('mousemove',e=>{const r=l.getBoundingClientRect();x=e.clientX-r.left;y=e.clientY-r.top});
  $$('.hl-row',l).forEach((row,i)=>{row.addEventListener('mouseenter',()=>{box.classList.add('on');$$('img',box).forEach((im,j)=>im.classList.toggle('on',i===j))})});
  l.addEventListener('mouseleave',()=>{box.classList.remove('on')});
  const lp=()=>{bx+=(x-bx)*.15;by+=(y-by)*.15;box.style.transform=`translate(${bx}px,${by}px) translate(-50%,-50%) rotate(${(x-bx)*.04}deg)`;requestAnimationFrame(lp)};lp()});

/* carousels */
$$('.car').forEach(c=>{const tr=$('.car-track',c),items=$$('.car-track > *',c),num=$('.car-num',c);if(!items.length)return;const step=()=>items[0].getBoundingClientRect().width+20;const go=d=>tr.scrollBy({left:d*step(),behavior:RM?'auto':'smooth'});
  $('.car-prev',c).addEventListener('click',()=>go(-1));$('.car-next',c).addEventListener('click',()=>go(1));
  c.addEventListener('keydown',e=>{if(e.key==='ArrowRight')go(1);if(e.key==='ArrowLeft')go(-1)});
  const upd=()=>{const i=Math.min(items.length,Math.round(tr.scrollLeft/step())+1);if(num)num.textContent=i+' of '+items.length};tr.addEventListener('scroll',upd,{passive:true});upd()});

/* sticky process steps */
$$('.sticky-steps').forEach(s=>{const vis=$$('.ss-vis > figure',s),steps=$$('.ss-step',s);const sio=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){const i=steps.indexOf(e.target);steps.forEach((x,j)=>x.classList.toggle('on',i===j));vis.forEach((x,j)=>x.classList.toggle('on',i===j))}}),{rootMargin:'-45% 0px -45% 0px'});steps.forEach(x=>sio.observe(x))});

/* profit calculator */
const calc=$('#calc');
if(calc){const F=n=>calc.querySelector('[name='+n+']');let st=null;try{st=localStorage}catch(e){}
  const keys=['vis','cr','aov','mg','ads','cur'];try{if(st)keys.forEach(k=>{const v=st.getItem('calc-'+k);if(v!==null&&F(k))F(k).value=v})}catch(e){}
  const fmt=(v,c)=>c+Math.round(v).toLocaleString('en-GB');
  const run=()=>{const vis=+F('vis').value||0,cr=(+F('cr').value||0)/100,aov=+F('aov').value||0,mg=(+F('mg').value||0)/100,ads=+F('ads').value||0,c=F('cur').value;
    const rev=vis*cr*aov,net=rev*mg-ads,rev2=vis*(cr+.005)*(aov*1.1),net2=rev2*mg-ads;
    $('#c-rev').textContent=fmt(rev,c);$('#c-net').textContent=(net<0?'-':'')+fmt(Math.abs(net),c);$('#c-net').classList.toggle('neg',net<0);
    $('#c-up').textContent='+'+fmt(Math.max(0,net2-net),c);$('#c-orders').textContent=Math.round(vis*cr).toLocaleString('en-GB');
    $('#c-mg').textContent=rev>0?(net/rev*100).toFixed(1)+'%':'0%';
    try{if(st)keys.forEach(k=>st.setItem('calc-'+k,F(k).value))}catch(e){}};
  calc.addEventListener('input',run);run();
  $('#c-reset').addEventListener('click',()=>{[['vis',20000],['cr',1.5],['aov',45],['mg',55],['ads',4000]].forEach(([k,v])=>F(k).value=v);run()})}

/* multi-step form */
const ms=$('#ms');
if(ms){const steps=$$('.ms-step',ms),prog=$('.ms-bar i',ms),lab=$('.ms-lab',ms);let i=0;
  const show=n=>{i=n;steps.forEach((s,j)=>s.hidden=j!==n);prog.style.width=((n+1)/steps.length*100)+'%';lab.textContent='Step '+(n+1)+' of '+steps.length;if(n){const f=steps[n].querySelector('input:not([type=radio]):not([type=checkbox]),textarea');if(f)f.focus()}};
  const valid=()=>[...steps[i].querySelectorAll('input,textarea,select')].every(x=>x.reportValidity());
  $$('.ms-next',ms).forEach(b=>b.addEventListener('click',()=>{if(valid())show(i+1)}));
  $$('.ms-back',ms).forEach(b=>b.addEventListener('click',()=>show(i-1)));
  ms.addEventListener('submit',e=>{e.preventDefault();if(!valid())return;steps.forEach(s=>s.hidden=true);$('.ms-head',ms).hidden=true;$('.ms-done',ms).hidden=false});show(0)}

/* lead magnet */
const lm=$('#lm');if(lm)lm.addEventListener('submit',e=>{e.preventDefault();if(!lm.reportValidity())return;$('#lm-ok').hidden=false});
}
