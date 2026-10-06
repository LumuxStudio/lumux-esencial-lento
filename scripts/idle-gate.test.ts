import {test} from 'node:test';
import assert from 'node:assert/strict';
import {createIdleGate} from '../src/scripts/idle-gate';
function setup(){
 let now=0;let next=0;let runs=0;let cancels=0;
 const tasks=new Map<number,{at:number,fn:()=>void}>();
 const clock={set:(fn:()=>void,ms:number)=>{const id=++next;tasks.set(id,{at:now+ms,fn});return id as unknown as ReturnType<typeof setTimeout>;},clear:(id:ReturnType<typeof setTimeout>)=>{tasks.delete(id as unknown as number);}};
 const gate=createIdleGate(()=>runs++,()=>cancels++,clock);
 return {gate,runs:()=>runs,cancels:()=>cancels,advance:(ms:number)=>{now+=ms;for(const [id,task] of tasks)if(task.at<=now){tasks.delete(id);task.fn();}}};
}
test('continuous input delays entrances until the final input settles',()=>{
 const s=setup();s.gate.request();
 for(let i=0;i<12;i++){s.advance(80);s.gate.input();assert.equal(s.runs(),0);}
 s.advance(159);assert.equal(s.runs(),0);s.advance(1);assert.equal(s.runs(),1);
});
test('new input cancels motion and invalidates an asynchronous import',()=>{
 const s=setup();s.gate.request();s.advance(160);const token=s.gate.token();
 assert.equal(s.gate.valid(token),true);s.gate.input();
 assert.equal(s.cancels(),1);assert.equal(s.gate.valid(token),false);
 s.advance(160);assert.equal(s.gate.valid(token),false);
 assert.equal(s.gate.valid(s.gate.token()),true);
});
test('disposing clears pending work and prevents later entrances',()=>{
 const s=setup();s.gate.request();const token=s.gate.token();s.gate.dispose();
 s.advance(500);s.gate.input();s.gate.request();s.advance(500);
 assert.equal(s.runs(),0);assert.equal(s.gate.valid(token),false);
});
