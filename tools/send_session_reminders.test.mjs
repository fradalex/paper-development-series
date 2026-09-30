import test from 'node:test';
import assert from 'node:assert/strict';
import { planReminders, tenInRome, runReminders } from './send_session_reminders.mjs';
const now = new Date('2026-09-28T09:30:00Z');
const seminar = { date:'2026-09-28',time:'14:30 CEST',speaker:'Alice',title:'AI and jobs',description:'Test',location:'Online',link:'https://example.org/meeting' };
const next = {...seminar,date:'2026-10-05',speaker:'Alice and Bob',title:'Idea incubation'};
function apiMock(records=[]) {
  const writes=[];
  globalThis.fetch=async (url,{method,body})=>{
    const path=new URL(url).pathname;
    let result;
    if(method==='GET'&&path.endsWith('/broadcasts')) result={broadcasts:structuredClone(records)};
    else {
      const data=JSON.parse(body);writes.push({method,path,data});
      if(method==='POST') {const row={id:records.length+100,...data,status:'scheduled'};records.push(row);result={broadcast:row};}
      else if(method==='PUT') {const row=records.find(r=>r.id===Number(path.split('/').at(-1)));assert.ok(row);Object.assign(row,data,{status:data.send_at===null?'draft':'scheduled'});result={broadcast:row};}
      else throw new Error(`Unexpected API call ${method} ${path}`);
    }
    return {ok:true,json:async()=>structuredClone(result)};
  };
  process.env.KIT_API_KEY='mock';
  return {records,writes};
}
test('Italy 10:00 follows DST on the sending date',()=>{
  assert.equal(tenInRome('2026-09-28'),'2026-09-28T08:00:00.000Z');
  assert.equal(tenInRome('2026-10-25'),'2026-10-25T09:00:00.000Z');
  assert.equal(tenInRome('2027-03-28'),'2027-03-28T08:00:00.000Z');
});
test('today has two due messages plus Oct 5 booked ahead; past reminders excluded',()=>{
  const {candidates}=planReminders([seminar,next],now);
  assert.equal(candidates.length,3);
  assert.equal(candidates.filter(r=>r.date==='2026-09-28').length,2);
  assert.equal(candidates.find(r=>r.date==='2026-10-05').sendAt,'2026-10-05T08:00:00.000Z');
  assert.equal(planReminders([{...seminar,reminders:false},{...next,title:'TBD'}],now).candidates.length,0);
});
test('live scheduling catches up today, books ahead, and does not duplicate on retry',async()=>{
  const api=apiMock();
  await runReminders([seminar,next],now,true);
  assert.equal(api.writes.length,3);
  assert.equal(api.records.filter(r=>r.send_at==='2026-09-28T09:40:00.000Z').length,2);
  assert.equal(api.records.filter(r=>r.send_at==='2026-10-05T08:00:00.000Z').length,1);
  await runReminders([seminar,next],now,true);
  assert.equal(api.writes.length,3);
  assert.deepEqual(api.records[0].subscriber_filter,[]);
});
test('future content edits update the existing broadcast without shifting its time',async()=>{
  const api=apiMock();await runReminders([next],now,true);
  const id=api.records.find(r=>r.description.endsWith('today')).id;
  await runReminders([{...next,title:'Revised title',link:'https://example.org/new'}],now,true);
  const updated=api.records.find(r=>r.id===id);
  assert.match(updated.subject,/Revised title/);assert.match(updated.content,/example.org\/new/);
  assert.equal(updated.send_at,'2026-10-05T08:00:00.000Z');
  assert.equal(api.records.length,2);
});
test('removing a session unschedules only its pending reminders and retains drafts',async()=>{
  const other={id:9,description:'Unrelated newsletter',status:'scheduled',send_at:'2026-10-05T08:00:00Z'};
  const api=apiMock([other]);await runReminders([next],now,true);
  await runReminders([],now,true);
  assert.equal(api.records[0].status,'scheduled');
  assert.ok(api.records.slice(1).every(r=>r.status==='draft'&&r.send_at===null&&r.description.startsWith('PDS cancelled |')));
});
test('sent reminders are preserved and never resent',async()=>{
  const api=apiMock();await runReminders([seminar],now,true);api.records[0].status='completed';
  await runReminders([seminar],now,true);assert.equal(api.writes.length,1);
  await runReminders([],now,true);assert.equal(api.records[0].status,'completed');
});
test('pending pilot broadcasts migrate to all subscribers without changing the send time',async()=>{
  const api=apiMock();await runReminders([next],now,true);
  const prior=api.records.find(r=>r.description.endsWith('today'));
  prior.subscriber_filter=[{all:[{type:'tag',ids:[1]}]}];
  const originalTime=prior.send_at;
  await runReminders([next],now,true);
  assert.deepEqual(prior.subscriber_filter,[]);
  assert.equal(prior.send_at,originalTime);
  assert.equal(api.records.length,2);
});
test('dry run makes no API calls',async()=>{
  globalThis.fetch=()=>{throw new Error('Network prohibited');};
  await runReminders([seminar,next],now,false);
});
