// Entrances yield immediately to native input. No wheel delta is altered.
export function createIdleGate(run:()=>void, cancel:()=>void, clock={
 set:(fn:()=>void,ms:number)=>setTimeout(fn,ms),
 clear:(id:ReturnType<typeof setTimeout>)=>clearTimeout(id),
}){
 let timer:ReturnType<typeof setTimeout>|undefined;
 let busy=false;let disposed=false;let version=0;
 const schedule=()=>{
  if(disposed)return;
  if(timer!==undefined)clock.clear(timer);
  timer=clock.set(()=>{timer=undefined;busy=false;run();},160);
 };
 return {
  request:schedule,
  input(){if(disposed)return;version++;busy=true;cancel();schedule();},
  token:()=>version,
  valid:(token:number)=>!disposed&&!busy&&token===version,
  dispose(){disposed=true;version++;if(timer!==undefined)clock.clear(timer);cancel();},
 };
}
