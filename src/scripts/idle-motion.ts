import {createIdleGate} from './idle-gate';
import type {gsap as GSAP} from 'gsap';

// All content is visible without JavaScript. GSAP is loaded only after input settles.
export function startIdleMotion(selector:string, drawingSelector:string, strokeSelector:string){
 const root=document.documentElement;
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const abort=new AbortController();const {signal}=abort;
 const pending=new Set<Element>();const seen=new WeakSet<Element>();
 const active=new Map<{kill:()=>unknown},()=>void>();
 let paused=false;let engine:typeof GSAP|undefined;
 let loading:Promise<typeof GSAP>|undefined;
 const clear=()=>{active.forEach((restore,animation)=>{animation.kill();restore();});active.clear();};
 const gate=createIdleGate(()=>{void flush();},clear);
 const observer=new IntersectionObserver(entries=>{
  for(const entry of entries){
   if(entry.isIntersecting&&!seen.has(entry.target))pending.add(entry.target);
   else pending.delete(entry.target);
  }
  if(pending.size)gate.request();
 },{threshold:0});
 async function flush(){
  if(paused||reduced.matches||document.hidden||!pending.size)return;
  const token=gate.token();
  try{engine=await (loading??=import('gsap').then(module=>module.gsap));}
  catch{pending.clear();return;}
  if(!gate.valid(token)||paused||reduced.matches||document.hidden)return;
  for(const target of pending){
   pending.delete(target);seen.add(target);observer.unobserve(target);
   if(target.matches(drawingSelector)){
    const strokes=Array.from(target.querySelectorAll<SVGGeometryElement>(strokeSelector));
    const restore=()=>strokes.forEach(stroke=>{stroke.style.removeProperty('stroke-dasharray');stroke.style.removeProperty('stroke-dashoffset');});
    const timeline=engine.timeline({onComplete:()=>{restore();active.delete(timeline);}});
    active.set(timeline,restore);
    strokes.forEach((stroke,index)=>{
     const length=stroke.getTotalLength();
     timeline.fromTo(stroke,{strokeDasharray:length,strokeDashoffset:length},{strokeDashoffset:0,duration:.35,ease:'power1.out'},Math.min(index*.025,.1));
    });
   }else{
    // No translation: copy stays in its actual position throughout the page.
    const element=target as HTMLElement;
    const restore=()=>element.style.removeProperty('opacity');
    const tween=engine.fromTo(element,{opacity:.9},{opacity:1,duration:.18,ease:'power1.out',onComplete:()=>{restore();active.delete(tween);}});
    active.set(tween,restore);
   }
  }
 }
 const input=()=>gate.input();
 window.addEventListener('wheel',input,{passive:true,signal});
 window.addEventListener('touchmove',input,{passive:true,signal});
 window.addEventListener('scroll',input,{passive:true,signal});
 document.addEventListener('keydown',event=>{
  if(['ArrowDown','ArrowUp','PageDown','PageUp','Home','End',' '].includes(event.key)&&!(event.target as Element)?.closest('input,textarea,select,[contenteditable]'))input();
 },{signal});
 const sync=()=>{
  clear();root.dataset.motion=reduced.matches?'reduced':paused?'paused':'idle-entrances';
  if(!paused&&!reduced.matches)gate.request();
 };
 const controls=Array.from(document.querySelectorAll<HTMLButtonElement>('.motion-control'));
 const updateControls=()=>controls.forEach(button=>{
  button.disabled=reduced.matches;button.setAttribute('aria-pressed',String(paused));
  button.textContent=paused?'Reanudar entradas':'Pausar entradas';
 });
 controls.forEach(button=>button.addEventListener('click',()=>{paused=!paused;sync();updateControls();},{signal}));
 reduced.addEventListener('change',()=>{paused=false;sync();updateControls();},{signal});
 document.addEventListener('visibilitychange',()=>{if(document.hidden)clear();else gate.request();},{signal});
 document.querySelectorAll(selector).forEach(element=>observer.observe(element));
 sync();updateControls();
 window.addEventListener('pagehide',()=>{abort.abort();observer.disconnect();gate.dispose();pending.clear();},{once:true});
}
