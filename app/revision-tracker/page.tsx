'use client'

import { useEffect } from 'react'

const css = `
:root{
  --purple:#2E2557;
  --purple-light:#3d3370;
  --purple-mid:#7B6FA0;
  --purple-soft:#9E8BC0;
  --cream:#F3EBD8;
  --cream-dark:#E8D9BF;
  --cream-warm:#f0e8d5;
  --gold:#C9A96E;
  --slate:#A0A0B8;
  --text:#1a1535;
  --muted:#777;
  --color-maths:#D4573E;
  --color-biology:#2E7D32;
  --color-chemistry:#1565C0;
  --color-physics:#6A3D6A;
  --color-english:#8B4513;
  --color-history:#C4622D;
}
*{margin:0;padding:0;box-sizing:border-box}
html{scroll-behavior:smooth}
body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;background:var(--cream);color:var(--text);min-height:100vh;line-height:1.5}
h1,h2,h3,.serif{font-family:Georgia,"Times New Roman",serif;font-weight:normal}
.logo{height:45px;width:auto;margin-bottom:1rem}
.site-header{background:var(--purple);color:var(--cream);padding:2.5rem 1.5rem 2rem;text-align:center}
.badge{display:inline-block;font-size:0.65rem;letter-spacing:0.22em;text-transform:uppercase;border:1px solid var(--gold);color:var(--gold);padding:0.3rem 0.9rem;border-radius:20px;margin-bottom:0.9rem}
.site-header h1{font-size:2rem;letter-spacing:0.03em;margin-bottom:0.5rem}
.site-header p{font-size:0.9rem;opacity:0.75;font-style:italic}
.container{max-width:940px;margin:0 auto;padding:2rem 1.2rem 3rem}
.intro{background:var(--purple);color:var(--cream);border-radius:10px;padding:1.1rem 1.3rem;margin-bottom:1.5rem;font-size:0.9rem;line-height:1.65}
.intro strong{display:block;margin-bottom:0.35rem;font-size:1rem;color:var(--gold)}
.card{background:#fff;border-radius:10px;padding:1.5rem;margin-bottom:1.3rem;box-shadow:0 1px 8px rgba(46,37,87,0.08);border-left:4px solid var(--purple);position:relative}
.card-title{font-size:1.15rem;color:var(--purple);font-weight:bold;margin-bottom:0.35rem;padding-bottom:0.65rem;border-bottom:2px solid var(--cream)}
.card-subtitle{font-size:0.82rem;color:var(--muted);margin-bottom:1.1rem;font-style:italic}
.card-num{position:absolute;top:-12px;left:-12px;width:28px;height:28px;background:var(--gold);color:var(--purple);border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:Georgia,serif;font-weight:bold;font-size:0.95rem;box-shadow:0 2px 4px rgba(0,0,0,0.1)}
label{display:block;font-size:0.8rem;font-weight:600;color:var(--purple);margin-bottom:0.3rem;letter-spacing:0.02em}
input[type="text"],input[type="time"],select{width:100%;padding:0.6rem 0.75rem;border:1.5px solid var(--cream-dark);border-radius:6px;font-family:inherit;font-size:0.92rem;background:var(--cream);color:var(--text);margin-bottom:0.9rem;transition:border-color 0.2s,background 0.2s;-webkit-appearance:none;appearance:none}
select{background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'><path fill='%232E2557' d='M0 0l5 6 5-6z'/></svg>");background-repeat:no-repeat;background-position:right 0.75rem center;padding-right:2rem}
input:focus,select:focus{outline:none;border-color:var(--purple);background:#fff}
.two-col{display:grid;grid-template-columns:1fr 1fr;gap:1rem}
.help-text{font-size:0.78rem;color:var(--muted);font-style:italic;margin-top:-0.4rem;margin-bottom:0.8rem}
.info-line{font-size:0.82rem;color:var(--purple);background:var(--cream);padding:0.6rem 0.9rem;border-radius:6px;border-left:3px solid var(--gold);margin-top:0.3rem}
.item-row{background:var(--cream);border:1px solid var(--cream-dark);border-radius:8px;padding:1rem 2.6rem 1rem 1rem;margin-bottom:0.75rem;position:relative}
.remove-btn{position:absolute;top:0.75rem;right:0.75rem;width:24px;height:24px;border-radius:50%;border:none;background:rgba(46,37,87,0.1);color:var(--purple);font-size:1rem;cursor:pointer;display:flex;align-items:center;justify-content:center;line-height:1;transition:background 0.2s,color 0.2s}
.remove-btn:hover{background:#cc3333;color:#fff}
.slider-wrap{margin-bottom:0.5rem}
.slider-head{display:flex;justify-content:space-between;align-items:center;margin-bottom:0.3rem}
.slider-head label{margin:0}
.conf-badge{background:var(--purple);color:var(--cream);font-size:0.7rem;padding:0.15rem 0.55rem;border-radius:10px;min-width:2.5rem;text-align:center;font-weight:bold}
input[type="range"]{-webkit-appearance:none;appearance:none;width:100%;height:5px;background:var(--cream-dark);border-radius:3px;padding:0;margin-bottom:0.2rem;cursor:pointer}
input[type="range"]::-webkit-slider-thumb{-webkit-appearance:none;width:18px;height:18px;background:var(--purple);border-radius:50%;cursor:pointer;border:2px solid #fff;box-shadow:0 1px 3px rgba(0,0,0,0.2)}
input[type="range"]::-moz-range-thumb{width:18px;height:18px;background:var(--purple);border-radius:50%;cursor:pointer;border:2px solid #fff}
.slider-labels{display:flex;justify-content:space-between;font-size:0.65rem;color:#aaa;margin-top:0.2rem}
.commit-grid{display:grid;grid-template-columns:1.3fr 0.8fr 0.8fr 1.5fr;gap:0.5rem}
.topics-list{display:flex;flex-wrap:wrap;gap:0.6rem;margin-bottom:0.75rem}
.topic-tag{display:inline-flex;align-items:center;gap:0.4rem;background:var(--purple);color:var(--cream);padding:0.4rem 0.8rem;border-radius:20px;font-size:0.8rem;font-weight:500}
.topic-tag button{background:transparent;border:none;color:var(--cream);cursor:pointer;font-size:1rem;padding:0;line-height:1}
.topic-tag button:hover{color:#ff6b6b}
.add-topic-inline{display:inline-flex;gap:0.4rem;margin-bottom:0.75rem}
.add-topic-inline input{flex:1;min-width:150px;padding:0.5rem 0.6rem;border:1.5px solid var(--cream-dark);border-radius:5px;font-size:0.85rem}
.add-topic-inline button{padding:0.5rem 0.9rem;background:var(--purple);color:var(--cream);border:none;border-radius:5px;cursor:pointer;font-size:0.8rem;font-weight:600;transition:background 0.2s}
.add-topic-inline button:hover{background:var(--purple-light)}
.help-text-topics{font-size:0.75rem;color:var(--muted);font-style:italic;margin-top:-0.5rem;margin-bottom:0.8rem}
.add-btn{width:100%;padding:0.7rem 1rem;border:2px dashed rgba(46,37,87,0.3);background:transparent;color:var(--purple);border-radius:7px;font-family:inherit;font-size:0.88rem;font-weight:600;cursor:pointer;transition:all 0.2s}
.add-btn:hover{border-color:var(--purple);background:var(--purple);color:var(--cream)}
.generate-btn{width:100%;padding:1.05rem;background:var(--purple);color:var(--cream);border:none;border-radius:8px;font-family:Georgia,serif;font-size:1.08rem;letter-spacing:0.05em;cursor:pointer;transition:background 0.2s,transform 0.1s;margin-top:0.5rem;box-shadow:0 2px 8px rgba(46,37,87,0.2)}
.generate-btn:hover{background:var(--purple-light)}
.generate-btn:active{transform:translateY(1px)}
#timetable-section{display:none}
.tt-header{background:var(--purple);color:var(--cream);border-radius:10px 10px 0 0;padding:1.5rem 1.5rem 1.3rem;text-align:center}
.tt-header h2{font-size:1.6rem;margin-bottom:0.35rem}
.tt-header p{font-size:0.8rem;opacity:0.7;font-style:italic}
.week-wrap{background:#fff;border-radius:0 0 10px 10px;padding:1rem;box-shadow:0 1px 8px rgba(46,37,87,0.08);overflow-x:auto}
.week-grid{display:grid;grid-template-columns:repeat(7,minmax(125px,1fr));gap:0.45rem;min-width:max-content}
.day-col{display:flex;flex-direction:column;gap:0.3rem;min-width:0}
.day-head{background:var(--purple);color:var(--cream);text-align:center;padding:0.5rem 0.3rem;border-radius:5px;font-size:0.72rem;font-weight:bold;letter-spacing:0.08em;text-transform:uppercase;font-family:Georgia,serif}
.slot{border-radius:5px;padding:0.45rem 0.5rem;font-size:0.68rem;line-height:1.35;word-break:break-word}
.slot-time{font-size:0.58rem;opacity:0.75;margin-bottom:0.15rem;display:block;font-weight:500}
.slot-label{font-weight:bold;display:block;font-size:0.72rem}
.slot-sub{font-size:0.6rem;opacity:0.8;font-style:italic;display:block;margin-top:0.18rem}
.slot--deep{background:var(--purple);color:var(--cream)}
.slot--recall{background:var(--purple-mid);color:#fff}
.slot--review{background:var(--purple-soft);color:#fff}
.slot--break{background:var(--cream-dark);color:#666}
.slot--lunch{background:var(--cream-warm);color:#666}
.slot--fixed{background:var(--slate);color:#fff}
.slot--free{background:#f5f5f5;color:#bbb;text-align:center;font-size:0.6rem}
.slot--none{background:#fafafa;color:#aaa;text-align:center;padding:1rem 0.5rem;border:1px dashed #ddd;font-style:italic;font-size:0.65rem}
.slot-label{border-left:3px solid transparent;padding-left:0.3rem}
.slot-label.subj-maths{border-left-color:var(--color-maths);color:var(--color-maths)}
.slot-label.subj-biology{border-left-color:var(--color-biology);color:var(--color-biology)}
.slot-label.subj-chemistry{border-left-color:var(--color-chemistry);color:var(--color-chemistry)}
.slot-label.subj-physics{border-left-color:var(--color-physics);color:var(--color-physics)}
.slot-label.subj-english{border-left-color:var(--color-english);color:var(--color-english)}
.slot-label.subj-history{border-left-color:var(--color-history);color:var(--color-history)}
.legend-wrap{margin-top:0.9rem;background:#fff;border-radius:8px;padding:0.9rem 1.1rem;box-shadow:0 1px 4px rgba(46,37,87,0.06)}
.legend{display:flex;flex-wrap:wrap;gap:0.7rem 1.4rem}
.legend-item{display:flex;align-items:center;gap:0.4rem;font-size:0.78rem;color:#555}
.legend-dot{width:12px;height:12px;border-radius:3px;flex-shrink:0}
.tips{background:var(--purple);color:var(--cream);border-radius:8px;padding:1.1rem 1.3rem;margin-top:1rem;font-size:0.85rem;line-height:1.7}
.tips strong{display:block;margin-bottom:0.35rem;color:var(--gold);font-size:0.95rem}
.action-row{display:flex;gap:0.9rem;margin-top:1.3rem}
.btn-outline,.btn-solid{flex:1;padding:0.85rem 1rem;border-radius:7px;font-family:inherit;font-size:0.92rem;font-weight:600;cursor:pointer;transition:all 0.2s}
.btn-outline{background:transparent;border:2px solid var(--purple);color:var(--purple)}
.btn-outline:hover{background:var(--purple);color:var(--cream)}
.btn-solid{background:var(--purple);color:var(--cream);border:none}
.btn-solid:hover{background:var(--purple-light)}
@media print{
  body{background:#fff}
  .site-header,#questionnaire-section,.action-row,.tips,.legend-wrap{display:none !important}
  #timetable-section{display:block !important}
  .container{padding:0.5rem;max-width:100%}
  .tt-header{border-radius:0;padding:0.8rem}
  .tt-header h2{font-size:1.2rem}
  .tt-header p{font-size:0.7rem}
  .week-wrap{box-shadow:none;padding:0.3rem;overflow:visible}
  .week-grid{grid-template-columns:repeat(7,1fr);gap:0.2rem;min-width:0}
  .slot{font-size:0.55rem;padding:0.25rem 0.3rem}
  .slot-time{font-size:0.48rem}
  .slot-label{font-size:0.58rem}
  .slot-sub{font-size:0.5rem}
  .day-head{font-size:0.6rem;padding:0.3rem 0.15rem}
  @page{size:A4 landscape;margin:0.8cm}
}
@media (max-width:640px){
  .two-col{grid-template-columns:1fr}
  .commit-grid{grid-template-columns:1fr 1fr;gap:0.6rem}
  .site-header h1{font-size:1.55rem}
  .container{padding:1.5rem 1rem 2rem}
  .card{padding:1.2rem}
}
`

const js = `
(function(){
  'use strict';
  const DAYS=['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
  const DAY_SHORT={Monday:'Mon',Tuesday:'Tue',Wednesday:'Wed',Thursday:'Thu',Friday:'Fri',Saturday:'Sat',Sunday:'Sun'};
  const PRIORITY_WEIGHT={high:3,medium:2,low:1};
  function escapeHTML(s){return String(s||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
  function toMinutes(hhmm){if(!hhmm||typeof hhmm!=='string')return NaN;const parts=hhmm.split(':');if(parts.length!==2)return NaN;const h=parseInt(parts[0],10),m=parseInt(parts[1],10);if(isNaN(h)||isNaN(m))return NaN;return h*60+m}
  function toHHMM(mins){const h=Math.floor(mins/60),m=mins%60;return String(h).padStart(2,'0')+':'+String(m).padStart(2,'0')}
  function fmtTimeRange(a,b){return toHHMM(a)+' – '+toHHMM(b)}
  let subjectCounter=0;
  const topicPlaceholders={'Mathematics':'Differentiation, Integration','Biology':'Cardiac cycle, Photosynthesis','Chemistry':'Organic mechanisms, Electrochemistry','Physics':'Forces, Energy, Waves','English':'Themes, Character analysis','History':'Key dates, Causes and effects','Economics':'Supply and demand, GDP','Geography':'Physical processes, Human impact'};
  function getSubjColorClass(name){const lower=name.toLowerCase();if(lower.includes('math'))return 'subj-maths';if(lower.includes('biol'))return 'subj-biology';if(lower.includes('chem'))return 'subj-chemistry';if(lower.includes('phys'))return 'subj-physics';if(lower.includes('english'))return 'subj-english';if(lower.includes('history'))return 'subj-history';return ''}
  function addSubjectRow(name='',topics='',priority='medium',confidence=3){
    subjectCounter++;const id='subject-'+subjectCounter;const el=document.createElement('div');el.className='item-row subject-row';el.id=id;
    const topicsArray=topics?topics.split('|').filter(t=>t.trim()):[];let topicsHtml='<div class="topics-list">';topicsArray.forEach(topic=>{topicsHtml+='<span class="topic-tag">'+escapeHTML(topic)+'<button type="button" aria-label="Remove topic">×</button></span>'});topicsHtml+='</div>';
    const placeholder=topicPlaceholders[name]||'e.g. Topic 1, Topic 2';
    el.innerHTML='<button type="button" class="remove-btn" aria-label="Remove" title="Remove">×</button>'+'<label>Subject name</label>'+'<input type="text" class="subject-name" placeholder="e.g. Mathematics" value="'+escapeHTML(name)+'" maxlength="40">'+'<label>Topics to prioritise this week</label>'+topicsHtml+'<div class="add-topic-inline">'+'<input type="text" class="subject-topic-input" placeholder="'+placeholder+'" maxlength="50">'+'<button type="button">Add</button>'+'</div>'+'<p class="help-text-topics">Limit to 5 topics. Click Add after each one.</p>'+'<label>Priority level</label>'+'<select class="subject-priority">'+'<option value="high"'+(priority==='high'?' selected':'')+'>High — Really struggling with it</option>'+'<option value="medium"'+(priority==='medium'?' selected':'')+'>Medium — Important, manageable</option>'+'<option value="low"'+(priority==='low'?' selected':'')+'>Low — Fairly confident</option>'+'</select>'+'<div class="slider-wrap">'+'<div class="slider-head"><label>Exam focus</label><span class="conf-badge">'+confidence+'/5</span></div>'+'<input type="range" class="subject-confidence" min="1" max="5" value="'+confidence+'">'+'<div class="slider-labels"><span>1 · low priority</span><span>3 · medium</span><span>5 · high priority</span></div>'+'</div>';
    document.getElementById('subjects-list').appendChild(el);
    const topicInput=el.querySelector('.subject-topic-input');const addTopicBtn=el.querySelector('.add-topic-inline button');const topicsList=el.querySelector('.topics-list');
    function renderTopics(){const topics=[];el.querySelectorAll('.topic-tag').forEach(tag=>{const text=tag.textContent.trim().slice(0,-1);if(text)topics.push(text)});return topics}
    function updateTopicsList(){const topics=renderTopics();topicsList.innerHTML='';topics.forEach(topic=>{const tag=document.createElement('span');tag.className='topic-tag';tag.innerHTML=''+escapeHTML(topic)+'<button type="button" aria-label="Remove topic">×</button>';tag.querySelector('button').addEventListener('click',()=>{tag.remove();updateTopicInput()});topicsList.appendChild(tag)});updateTopicInput()}
    function updateTopicInput(){const topics=renderTopics();topicInput.disabled=topics.length>=5;addTopicBtn.disabled=topics.length>=5;if(topics.length>=5)topicInput.placeholder='Max 5 topics reached'}
    addTopicBtn.addEventListener('click',()=>{const topic=topicInput.value.trim();if(topic&&renderTopics().length<5){const tag=document.createElement('span');tag.className='topic-tag';tag.innerHTML=''+escapeHTML(topic)+'<button type="button" aria-label="Remove topic">×</button>';tag.querySelector('button').addEventListener('click',()=>{tag.remove();updateTopicInput()});topicsList.appendChild(tag);topicInput.value='';updateTopicInput()}});
    topicInput.addEventListener('keypress',e=>{if(e.key==='Enter'){addTopicBtn.click();e.preventDefault()}});
    updateTopicInput();
    const range=el.querySelector('.subject-confidence');const badge=el.querySelector('.conf-badge');range.addEventListener('input',()=>{badge.textContent=range.value+'/5'});
    el.querySelector('.remove-btn').addEventListener('click',()=>el.remove());
  }
  let commitCounter=0;
  function addCommitmentRow(day='Monday',start='17:00',end='18:30',label=''){
    commitCounter++;const id='commit-'+commitCounter;const el=document.createElement('div');el.className='item-row commit-row';el.id=id;
    const dayOpts=DAYS.map(d=>'<option value="'+d+'"'+(d===day?' selected':'')+'>'+d+'</option>').join('');
    el.innerHTML='<button type="button" class="remove-btn" aria-label="Remove" title="Remove">×</button>'+'<div class="commit-grid">'+'<div><label>Day</label><select class="commit-day">'+dayOpts+'</select></div>'+'<div><label>Start</label><input type="time" class="commit-start" value="'+escapeHTML(start)+'"></div>'+'<div><label>End</label><input type="time" class="commit-end" value="'+escapeHTML(end)+'"></div>'+'<div><label>What is it?</label><input type="text" class="commit-label" placeholder="e.g. Football" value="'+escapeHTML(label)+'" maxlength="40"></div>'+'</div>';
    document.getElementById('commitments-list').appendChild(el);
    el.querySelector('.remove-btn').addEventListener('click',()=>el.remove());
  }
  function collectState(){
    const name=document.getElementById('student-name').value.trim();
    const wakeTime=document.getElementById('wake-time').value||'07:00';
    const sleepTime=document.getElementById('sleep-time').value||'23:00';
    const wakeMin=toMinutes(wakeTime);const sleepMin=toMinutes(sleepTime);
    if(isNaN(wakeMin)||isNaN(sleepMin)){alert('Please set valid wake and sleep times.');return null}
    let gap;if(sleepMin>wakeMin){gap=sleepMin-wakeMin}else{gap=(1440-wakeMin)+sleepMin}
    if(gap<480){alert('You need at least 8 hours between wake time and sleep time to ensure sufficient rest. Current gap: '+Math.floor(gap/60)+'h '+String(gap%60).padStart(2,'0')+'m');return null}
    const subjects=[];
    document.querySelectorAll('.subject-row').forEach(row=>{
      const sname=row.querySelector('.subject-name').value.trim();if(!sname)return;
      const topicTags=[];row.querySelectorAll('.topic-tag').forEach(tag=>{const text=tag.textContent.trim().slice(0,-1);if(text)topicTags.push(text)});
      subjects.push({name:sname,topics:topicTags.join('|'),priority:row.querySelector('.subject-priority').value,confidence:parseInt(row.querySelector('.subject-confidence').value,10)||3});
    });
    if(subjects.length===0){alert('Please add at least one subject before generating your plan.');return null}
    const commitments=[];
    document.querySelectorAll('.commit-row').forEach(row=>{
      const lbl=row.querySelector('.commit-label').value.trim();const start=row.querySelector('.commit-start').value;const end=row.querySelector('.commit-end').value;
      if(!lbl||!start||!end)return;const sMin=toMinutes(start),eMin=toMinutes(end);if(isNaN(sMin)||isNaN(eMin)||eMin<=sMin)return;
      commitments.push({day:row.querySelector('.commit-day').value,startMin:sMin,endMin:eMin,label:lbl});
    });
    return {name,wakeTime,sleepTime,subjects,commitments};
  }
  function buildDaySlots(dayIndex,state,sortedSubjects){
    const DEEP=90,RECALL=60,REVIEW=50,BRK=15,LUNCH=60;
    const sleepMin=toMinutes(state.sleepTime);const wakeMin=toMinutes(state.wakeTime);
    let CUTOFF;if(sleepMin>wakeMin){CUTOFF=sleepMin-30}else{CUTOFF=(1440-wakeMin)+sleepMin-30}
    const EVENING=toMinutes('18:00');const LUNCH_START=toMinutes('12:00');
    const slots=[];const dayName=DAYS[dayIndex];
    const todayCommits=state.commitments.filter(c=>c.day===dayName).sort((a,b)=>a.startMin-b.startMin);
    let current=wakeMin+60;if(isNaN(current))current=toMinutes('08:00');
    let lunchTaken=false,deepCount=0,recallCount=0,reviewCount=0,eveningDone=false;
    const added=new Set();let guard=0;
    function nextSubj(offset){const n=sortedSubjects.length;return sortedSubjects[(dayIndex+offset)%n]}
    function subjSub(s){const topics=s.topics?s.topics.split('|'):[];return topics.length>0?topics.slice(0,2).join(', '):'Deep focus — no distractions'}
    function recallSub(s){const topics=s.topics?s.topics.split('|'):[];return topics.length>0?'Past papers: '+topics.slice(0,2).join(', '):'Past papers · blurting · Anki'}
    function getSubjColor(name){return getSubjColorClass(name)}
    while(current<CUTOFF&&guard<60){
      guard++;
      const active=todayCommits.find(c=>c.startMin<=current&&c.endMin>current&&!added.has(c));
      if(active){slots.push({type:'fixed',time:fmtTimeRange(active.startMin,active.endMin),label:active.label,sub:'',colorClass:''});added.add(active);current=active.endMin;continue}
      const pastActive=todayCommits.find(c=>c.startMin<=current&&c.endMin>current&&added.has(c));
      if(pastActive){current=pastActive.endMin;continue}
      const upcoming=todayCommits.find(c=>c.startMin>current&&c.startMin<current+DEEP&&!added.has(c));
      if(upcoming){if(upcoming.startMin-current>=20){slots.push({type:'free',time:fmtTimeRange(current,upcoming.startMin),label:'Free / Buffer',sub:'',colorClass:''})}current=upcoming.startMin;continue}
      if(!lunchTaken&&current>=LUNCH_START&&current<EVENING){const lunchEnd=current+LUNCH;const conflict=todayCommits.find(c=>c.startMin<lunchEnd&&c.endMin>current);if(!conflict){slots.push({type:'lunch',time:fmtTimeRange(current,lunchEnd),label:'Lunch Break',sub:'Step away from the desk',colorClass:''});current=lunchEnd;lunchTaken=true;continue}else{lunchTaken=true}}
      if(current+DEEP>CUTOFF)break;
      if(current>=EVENING){if(eveningDone)break;const subj=nextSubj(0);const dur=REVIEW;slots.push({type:'review',time:fmtTimeRange(current,current+dur),label:'Light Review: '+subj.name,sub:'Consolidate notes',colorClass:getSubjColor(subj.name)});current+=dur;reviewCount++;eveningDone=true;continue}
      if(deepCount<2){const subj=nextSubj(deepCount);slots.push({type:'deep',time:fmtTimeRange(current,current+DEEP),label:subj.name,sub:subjSub(subj),colorClass:getSubjColor(subj.name)});current+=DEEP;deepCount++}else{const subj=nextSubj(deepCount+recallCount);slots.push({type:'recall',time:fmtTimeRange(current,current+RECALL),label:'Active Recall: '+subj.name,sub:recallSub(subj),colorClass:getSubjColor(subj.name)});current+=RECALL;recallCount++}
      if(current+BRK<CUTOFF&&current+BRK<=CUTOFF){const brkEnd=current+BRK;const conflict=todayCommits.find(c=>c.startMin<brkEnd&&c.endMin>current&&!added.has(c));if(!conflict){slots.push({type:'break',time:fmtTimeRange(current,brkEnd),label:'Short Break',sub:'Hydrate · move',colorClass:''});current=brkEnd}}
    }
    todayCommits.forEach(c=>{if(!added.has(c)){slots.push({type:'fixed',time:fmtTimeRange(c.startMin,c.endMin),label:c.label,sub:'',colorClass:'',_sortKey:c.startMin})}});
    if(slots.length===0){slots.push({type:'none',time:'',label:'No study slots',sub:'Check your wake time or commitments',colorClass:''})}
    return slots;
  }
  function generatePlan(state){
    const sorted=[...state.subjects].sort((a,b)=>(PRIORITY_WEIGHT[b.priority]*(6-b.confidence))-(PRIORITY_WEIGHT[a.priority]*(6-a.confidence)));
    const week=[];for(let i=0;i<7;i++){week.push({dayName:DAYS[i],slots:buildDaySlots(i,state,sorted)})}
    return week;
  }
  function renderTimetable(week,name){
    document.getElementById('tt-heading').textContent=name?(name+"'s Week"):'Your Week';
    const grid=document.getElementById('week-grid');grid.innerHTML='';
    week.forEach(day=>{
      const col=document.createElement('div');col.className='day-col';
      const head=document.createElement('div');head.className='day-head';head.innerHTML=DAY_SHORT[day.dayName];col.appendChild(head);
      day.slots.forEach(slot=>{
        const s=document.createElement('div');s.className='slot slot--'+slot.type;
        let html='';if(slot.time)html+='<span class="slot-time">'+escapeHTML(slot.time)+'</span>';
        const labelClass=slot.colorClass?'slot-label '+slot.colorClass:'slot-label';
        html+='<span class="'+labelClass+'">'+escapeHTML(slot.label)+'</span>';
        if(slot.sub)html+='<span class="slot-sub">'+escapeHTML(slot.sub)+'</span>';
        s.innerHTML=html;col.appendChild(s);
      });
      grid.appendChild(col);
    });
  }
  function showTimetable(){document.getElementById('questionnaire-section').style.display='none';document.getElementById('timetable-section').style.display='block';window.scrollTo({top:0,behavior:'smooth'})}
  function showQuestionnaire(){document.getElementById('timetable-section').style.display='none';document.getElementById('questionnaire-section').style.display='block';window.scrollTo({top:0,behavior:'smooth'})}
  document.getElementById('add-subject-btn').addEventListener('click',()=>addSubjectRow());
  document.getElementById('add-commit-btn').addEventListener('click',()=>addCommitmentRow());
  document.getElementById('generate-btn').addEventListener('click',()=>{const state=collectState();if(!state)return;const week=generatePlan(state);renderTimetable(week,state.name);showTimetable()});
  document.getElementById('edit-btn').addEventListener('click',showQuestionnaire);
  document.getElementById('print-btn').addEventListener('click',()=>window.print());
})();
`

export default function RevisionTrackerPage() {
  useEffect(() => {
    const script = document.createElement('script')
    script.textContent = js
    document.body.appendChild(script)
    return () => {
      document.body.removeChild(script)
    }
  }, [])

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />

      <header className="site-header">
        <div className="badge">Free Workshop Gift</div>
        <h1>Your A-Level Revision Tracker</h1>
        <p>Answer a few questions. Get your personalised weekly plan.</p>
      </header>

      <div className="container">
        <section id="questionnaire-section">
          <div className="intro">
            <strong>How this works</strong>
            Tell us your subjects, the topics you want to prioritise this week, your confidence in each, and anything fixed in your schedule. We'll build a timetable with 90-minute deep-work blocks — your hardest material scheduled at your peak energy times.
          </div>

          <div className="card">
            <div className="card-num">1</div>
            <h2 className="card-title">About You</h2>
            <p className="card-subtitle">Just the basics. Used to shape your day.</p>
            <label htmlFor="student-name">First name (optional)</label>
            <input type="text" id="student-name" placeholder="e.g. Aisha" maxLength={30} />
            <label htmlFor="wake-time">Wake-up time</label>
            <input type="time" id="wake-time" defaultValue="07:00" />
            <label htmlFor="sleep-time">Sleep time (target bedtime)</label>
            <input type="time" id="sleep-time" defaultValue="23:00" />
            <div className="info-line">Sleep is part of the system. Your wake time and sleep time must be at least <strong>8 hours apart</strong> — non-negotiable. This ensures you're getting the rest you need to perform at your best.</div>
          </div>

          <div className="card">
            <div className="card-num">2</div>
            <h2 className="card-title">Your Subjects</h2>
            <p className="card-subtitle">Add each A-Level. Rate your confidence honestly — this decides when each subject gets scheduled.</p>
            <div id="subjects-list"></div>
            <button type="button" className="add-btn" id="add-subject-btn">+ Add Subject</button>
          </div>

          <div className="card">
            <div className="card-num">3</div>
            <h2 className="card-title">Fixed Commitments</h2>
            <p className="card-subtitle">Anything you can't move — school, job, sport, family, rest. These get blocked out automatically.</p>
            <div id="commitments-list"></div>
            <button type="button" className="add-btn" id="add-commit-btn">+ Add Commitment</button>
          </div>

          <button type="button" className="generate-btn" id="generate-btn">Generate My Revision Plan →</button>
        </section>

        <section id="timetable-section">
          <div className="tt-header">
            <div className="badge">Your Personal Plan</div>
            <h2 id="tt-heading">Your Week</h2>
            <p>Deep Work · Active Recall · Light Review · Breaks</p>
          </div>

          <div className="week-wrap">
            <div className="week-grid" id="week-grid"></div>
          </div>

          <div className="legend-wrap">
            <div className="legend">
              <div className="legend-item"><span className="legend-dot" style={{ background: '#2E2557' }}></span> Deep Work</div>
              <div className="legend-item"><span className="legend-dot" style={{ background: '#7B6FA0' }}></span> Active Recall</div>
              <div className="legend-item"><span className="legend-dot" style={{ background: '#9E8BC0' }}></span> Light Review</div>
              <div className="legend-item"><span className="legend-dot" style={{ background: '#E8D9BF' }}></span> Break</div>
              <div className="legend-item"><span className="legend-dot" style={{ background: '#f0e8d5' }}></span> Lunch</div>
              <div className="legend-item"><span className="legend-dot" style={{ background: '#A0A0B8' }}></span> Fixed Commitment</div>
            </div>
          </div>

          <div className="tips">
            <strong>How to use this plan</strong>
            Deep Work slots are for your hardest, highest-priority topics — phone in another room, no distractions. Active Recall slots are for past papers, blurting, and Anki. Light Review is for consolidating notes. Always take your breaks — they're part of the system, not a reward.
          </div>

          <div className="action-row">
            <button type="button" className="btn-outline" id="edit-btn">← Edit My Answers</button>
            <button type="button" className="btn-solid" id="print-btn">Save as PDF</button>
          </div>
          <div className="tips" style={{marginTop:'1rem', background: 'var(--cream)', color: 'var(--text)', borderLeft: '4px solid var(--gold)'}}>
            <strong style={{color: 'var(--gold)'}}>Tip:</strong> After saving, you can open the PDF and print it to stick on your wall — that's the most effective way to use this plan. Print it out and put it somewhere you'll see it every day!
          </div>
        </section>
      </div>
    </>
  )
}
