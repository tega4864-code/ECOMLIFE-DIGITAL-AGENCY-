{
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;

/* profit health check quiz */
const q=$('#quiz');
if(q){const qs=$$('.qq',q),bar=$('.qbar i',q),back=$('#qback'),cnt=$('.qcount',q),res=$('.qres',q);let i=0;const max=qs.length*3;
  const show=n=>{i=n;qs.forEach((f,j)=>f.hidden=j!==n);back.hidden=n===0;bar.style.width=(n/qs.length*100)+'%';cnt.textContent=(n+1)+' of '+qs.length;res.hidden=true;$('.qnav',q).hidden=false};
  const finish=()=>{qs.forEach(f=>f.hidden=true);$('.qnav',q).hidden=true;bar.style.width='100%';res.hidden=false;
    const total=qs.reduce((s,f)=>{const c=f.querySelector('input:checked');return s+(c?+c.value:0)},0),pct=Math.round(total/max*100);
    const bands=[[75,'Strong foundations','Your business is in good shape. The opportunity now is to scale what works without losing margin.','Scale Partnership'],[45,'Room to grow','Some solid pieces are in place, but a few gaps are holding back profit. Fixing them first will make growth much easier.','Business Audit'],[0,'Fix the foundations first','Right now the business depends heavily on you and the numbers are unclear. Setting the foundations will pay back quickly.','Launch Programme or Business Audit']];
    const [,t,x,p]=bands.find(b=>pct>=b[0]);$('#qtitle').textContent=t;$('#qtext').textContent=x;$('#qpkg').textContent=p;
    const arc=$('.qarc',q),L=2*Math.PI*52;arc.style.strokeDasharray=L;arc.style.strokeDashoffset=L;
    const t0=performance.now(),d=RM?0:1200;const f=now=>{const k=d?Math.min(1,(now-t0)/d):1,e=1-Math.pow(1-k,3);$('#qnum').textContent=Math.round(pct*e);arc.style.strokeDashoffset=L*(1-pct/100*e);if(k<1)requestAnimationFrame(f)};requestAnimationFrame(f);
    res.scrollIntoView({behavior:RM?'auto':'smooth',block:'center'})};
  q.addEventListener('change',e=>{if(!e.target.matches('input[type=radio]'))return;setTimeout(()=>{i<qs.length-1?show(i+1):finish()},RM?0:280)});
  back.addEventListener('click',()=>show(Math.max(0,i-1)));
  $('#qagain').addEventListener('click',()=>{q.reset();show(0)});show(0)}

/* booking calendar preview */
const bk=$('#bookcal');
if(bk){const days=$('.bk-days',bk),times=$('.bk-times',bk),sel=$('.bk-sel',bk),go=$('#bk-go');let day=null,time=null;
  const fmt=new Intl.DateTimeFormat('en-GB',{weekday:'short',day:'numeric',month:'short'});
  const d=new Date();let n=0;while(n<10){d.setDate(d.getDate()+1);if(d.getDay()===0||d.getDay()===6)continue;n++;const b=document.createElement('button');b.type='button';b.setAttribute('role','option');const p=fmt.formatToParts(d);const g=k=>(p.find(x=>x.type===k)||{}).value||'';b.innerHTML='<small></small><b></b><small></small>';b.children[0].textContent=g('weekday');b.children[1].textContent=g('day');b.children[2].textContent=g('month');b.dataset.label=fmt.format(d);days.appendChild(b)}
  ['9:00','10:30','12:00','14:00','15:30','17:00'].forEach(t=>{const b=document.createElement('button');b.type='button';b.setAttribute('role','option');b.textContent=t;b.disabled=true;times.appendChild(b)});
  const upd=()=>{sel.textContent=day&&time?`${day} at ${time}`:day?`${day}: now pick a time`:'Choose a day, then a time.';go.disabled=!(day&&time)};
  days.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;$$('button',days).forEach(x=>x.setAttribute('aria-selected',x===b));day=b.dataset.label;time=null;$$('button',times).forEach(x=>{x.disabled=false;x.setAttribute('aria-selected',false)});upd()});
  times.addEventListener('click',e=>{const b=e.target.closest('button');if(!b||b.disabled)return;$$('button',times).forEach(x=>x.setAttribute('aria-selected',x===b));time=b.textContent;upd()});
  go.addEventListener('click',()=>{const m=document.querySelector('#ms textarea[name=msg]');if(m){m.value=(m.value?m.value+'\n':'')+'Preferred call time: '+day+' at '+time}const f=$('#ms');if(f)f.scrollIntoView({behavior:RM?'auto':'smooth',block:'start'});sel.textContent='Added to your message. Fill in the form to send it.'})}
}
