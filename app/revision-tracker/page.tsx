'use client'

import { useEffect } from 'react'
import Header from '@/components/header'

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
*{margin:0;padding:0;box-sizing:border-box}html{scroll-behavior:smooth}
body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;background:var(--cream);color:var(--text);min-height:100vh;line-height:1.5}
h1,h2,h3,.serif{font-family:Georgia,"Times New Roman",serif;font-weight:normal}
.logo{height:45px;width:auto;margin-bottom:1rem}
.badge{display:inline-block;font-size:0.65rem;letter-spacing:0.22em;text-transform:uppercase;border:1px solid var(--gold);color:var(--gold);padding:0.3rem 0.9rem;border-radius:20px;margin-bottom:0.9rem}
.container{max-width:940px;margin:0 auto;padding:2rem 1.2rem 3rem}
.container--wide{max-width:1400px}
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
.sleep-error{display:none;background:#fee2e2;color:#991b1b;font-size:0.78rem;padding:0.5rem 0.75rem;border-radius:5px;margin-top:-0.5rem;margin-bottom:0.8rem;border-left:3px solid #ef4444}
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
.generate-btn:hover:not(:disabled){background:var(--purple-light)}
.generate-btn:active:not(:disabled){transform:translateY(1px)}
.generate-btn:disabled{opacity:0.5;cursor:not-allowed}
#timetable-section{display:none}
.tt-header{background:var(--purple);color:var(--cream);border-radius:10px 10px 0 0;padding:1.5rem 1.5rem 1.3rem;text-align:center}
.tt-header h2{font-size:1.6rem;margin-bottom:0.35rem}
.tt-header p{font-size:0.8rem;opacity:0.7;font-style:italic}
#pdf-logo{display:none;height:55px;width:auto;margin-bottom:0.6rem}
.week-wrap{background:#fff;border-radius:0 0 10px 10px;padding:0.4rem;box-shadow:0 1px 8px rgba(46,37,87,0.08);overflow-x:auto}
.week-grid{display:block;min-width:720px}
.tt-header-row{display:flex;border-bottom:2px solid var(--cream-dark);position:sticky;top:0;z-index:5;background:#fff}
.tt-axis-spacer{width:52px;flex-shrink:0;border-right:1px solid var(--cream-dark);background:#fff}
.tt-day-head{flex:1;background:var(--purple);color:var(--cream);text-align:center;padding:0.5rem 0.3rem;font-size:0.72rem;font-weight:bold;letter-spacing:0.08em;text-transform:uppercase;font-family:Georgia,serif;min-width:88px;margin:0 1px;border-radius:5px 5px 0 0}
.tt-body-row{display:flex;align-items:flex-start}
.tt-axis{width:52px;flex-shrink:0;position:relative;border-right:1px solid var(--cream-dark);background:#fff}
.tt-hour-label{position:absolute;right:6px;font-size:0.58rem;color:var(--muted);white-space:nowrap;transform:translateY(-50%);font-variant-numeric:tabular-nums;line-height:1}
.tt-day-col{flex:1;position:relative;min-width:88px;background:#fbfaf6;border-right:1px solid rgba(200,200,200,0.3);margin:0 1px}
.tt-day-col:last-child{border-right:none}
.tt-hour-line{position:absolute;left:0;right:0;height:1px;background:rgba(190,190,190,0.45);pointer-events:none;z-index:0}
.tt-slot{position:absolute;left:2px;right:2px;border-radius:3px;padding:2px 3px;overflow:hidden;box-sizing:border-box;z-index:1;min-height:14px;line-height:1.2;word-break:break-word}
.tt-slot-time{font-size:0.48rem;opacity:0.75;display:block;font-weight:500;letter-spacing:0em}
.tt-slot-label{font-weight:bold;display:block;font-size:0.60rem;border-left:2px solid transparent;padding-left:3px;margin-top:0.5px}
.tt-slot-sub{font-size:0.50rem;opacity:0.8;font-style:italic;display:block;margin-top:0.5px}
.tt-slot--deep{background:#1E40AF;color:#fff}
.tt-slot--recall{background:#15803D;color:#fff}
.tt-slot--review{background:#B45309;color:#fff}
.tt-slot--break{background:var(--cream-dark);color:#5a5a5a}
.tt-slot--lunch{background:var(--cream-warm);color:#5a5a5a;border:1px solid #d4c5a0}
.tt-slot--fixed{background:var(--slate);color:#fff}
.tt-slot--free{background:#f5f5f5;color:#999;font-style:italic;border:1px dashed #ddd}
.tt-slot-label.subj-maths{border-left-color:var(--color-maths)}
.tt-slot-label.subj-biology{border-left-color:var(--color-biology)}
.tt-slot-label.subj-chemistry{border-left-color:var(--color-chemistry)}
.tt-slot-label.subj-physics{border-left-color:var(--color-physics)}
.tt-slot-label.subj-english{border-left-color:var(--color-english)}
.tt-slot-label.subj-history{border-left-color:var(--color-history)}
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
  #pdf-logo{display:block !important}
  .week-wrap{box-shadow:none;padding:0.3rem;overflow:visible}
  .week-grid{min-width:0}
  .tt-header-row{position:static}
  .tt-day-head{font-size:0.6rem;padding:0.3rem 0.15rem;min-width:0}
  .tt-day-col{min-width:0}
  .tt-slot{padding:2px 3px}
  .tt-slot-time{font-size:0.46rem}
  .tt-slot-label{font-size:0.56rem}
  .tt-slot-sub{font-size:0.48rem}
  @page{size:A4 landscape;margin:0.8cm}
}
@media (max-width:640px){
  .two-col{grid-template-columns:1fr}
  .commit-grid{grid-template-columns:1fr 1fr;gap:0.6rem}
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
  function toHHMM(mins){const norm=((mins%1440)+1440)%1440;const h=Math.floor(norm/60),m=norm%60;return String(h).padStart(2,'0')+':'+String(m).padStart(2,'0')}
  function fmtTimeRange(a,b){return toHHMM(a)+' – '+toHHMM(b)}

  function validateSleep(){
    const w=toMinutes(document.getElementById('wake-time').value||'');
    const s=toMinutes(document.getElementById('sleep-time').value||'');
    const errEl=document.getElementById('sleep-time-error');
    const btn=document.getElementById('generate-btn');
    if(isNaN(w)||isNaN(s)){if(errEl)errEl.style.display='none';return true}
    const sleepDur=s<=w?(w-s):((1440-s)+w);
    if(sleepDur<480){
      if(errEl){errEl.textContent='You need at least 8 hours of sleep. Current sleep duration: '+Math.floor(sleepDur/60)+'h '+String(sleepDur%60).padStart(2,'0')+'m';errEl.style.display='block'}
      if(btn){btn.disabled=true;btn.style.opacity='0.5';btn.style.cursor='not-allowed'}
      return false
    }
    if(errEl)errEl.style.display='none';
    if(btn){btn.disabled=false;btn.style.opacity='1';btn.style.cursor='pointer'}
    return true
  }

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
    const breakfastTime=document.getElementById('breakfast-time').value||'07:30';
    const lunchTime=document.getElementById('lunch-time').value||'12:00';
    const dinnerTime=document.getElementById('dinner-time').value||'18:00';
    const sleepTime=document.getElementById('sleep-time').value||'23:00';
    const wakeMin=toMinutes(wakeTime);const sleepMin=toMinutes(sleepTime);
    if(isNaN(wakeMin)||isNaN(sleepMin)){alert('Please set valid wake and sleep times.');return null}
    const sleepDur=sleepMin<=wakeMin?(wakeMin-sleepMin):((1440-sleepMin)+wakeMin);
    if(sleepDur<480){alert('You need at least 8 hours of sleep. Current sleep duration: '+Math.floor(sleepDur/60)+'h '+String(sleepDur%60).padStart(2,'0')+'m');return null}
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
    const hasSchool=document.getElementById('has-school').checked;
    let schoolDays=[];let schoolStart=toMinutes('08:30'),schoolEnd=toMinutes('16:00');
    if(hasSchool){document.querySelectorAll('.school-day:checked').forEach(cb=>{schoolDays.push(cb.value)});schoolStart=toMinutes(document.getElementById('school-start').value);schoolEnd=toMinutes(document.getElementById('school-end').value);if(schoolDays.length>0&&schoolStart<schoolEnd){schoolDays.forEach(day=>{commitments.push({day:day,startMin:schoolStart,endMin:schoolEnd,label:'School'})})}}
    return {name,wakeTime,breakfastTime,lunchTime,dinnerTime,sleepTime,subjects,commitments};
  }

  // ---- New scheduling algorithm: spaced repetition + interleaving ----------
  // Each topic follows: Deep Work → Active Recall (d+1) → Light Review (d+3/4)
  // Daily cap: 8 h pure study time, max 2 deep-work blocks per day.
  // Subjects are interleaved so no 3+ same-subject sessions land in a row.
  const DEEP_DUR=90, RECALL_DUR=45, REVIEW_DUR=30, BRK_DUR=15, MEAL_DUR=30;
  const DAY_CAP_STUDY=480;     // 8 h hard cap (study time only)
  const MAX_DEEP_PER_DAY=3;

  function buildTopicLedger(subjects){
    const items=[];
    subjects.forEach(function(s){
      const tt=(s.topics?s.topics.split('|'):[]).map(function(t){return t.trim()}).filter(Boolean);
      const w=PRIORITY_WEIGHT[s.priority]*s.confidence;
      if(tt.length===0){
        items.push({subject:s.name,topic:'General revision',weight:w});
      }else{
        tt.forEach(function(t){items.push({subject:s.name,topic:t,weight:w})});
      }
    });
    items.sort(function(a,b){return b.weight-a.weight||a.subject.localeCompare(b.subject)});
    return items;
  }

  function planWeek(subjects){
    const ledger=buildTopicLedger(subjects);

    // Assign dwCount per topic (1–3 based on weight), then scale to fit slot budget
    // New weight scale: max=15 (high priority × 5 exam focus). >=12→3DW, >=6→2DW, else 1DW
    ledger.forEach(function(t){t.dwCount=t.weight>=12?3:t.weight>=6?2:1;});
    const MAX_DW_SLOTS=7*MAX_DEEP_PER_DAY;
    let rawDW=ledger.reduce(function(s,t){return s+t.dwCount;},0);
    if(rawDW>MAX_DW_SLOTS){
      const sc=MAX_DW_SLOTS/rawDW;
      ledger.forEach(function(t){t.dwCount=Math.max(1,Math.round(t.dwCount*sc));});
      let over=ledger.reduce(function(s,t){return s+t.dwCount;},0)-MAX_DW_SLOTS;
      for(let i=ledger.length-1;i>=0&&over>0;i--){if(ledger[i].dwCount>1){ledger[i].dwCount--;over--;}}
    }

    const days=[[],[],[],[],[],[],[]];
    const dMin=[0,0,0,0,0,0,0];
    const dDeep=[0,0,0,0,0,0,0];
    const dSD=[{},{},{},{},{},{},{}];  // subject DW count per day

    function fits(d,type,dur,subj){
      if(d<0||d>6)return false;
      if(dMin[d]+dur>DAY_CAP_STUDY)return false;
      if(type==='deep'){if(dDeep[d]>=MAX_DEEP_PER_DAY||(dSD[d][subj]||0)>=1)return false;}
      return true;
    }
    function place(d,ev){
      days[d].push(ev);dMin[d]+=ev.dur;
      if(ev.type==='deep'){dDeep[d]++;dSD[d][ev.subject]=(dSD[d][ev.subject]||0)+1;}
      return d;
    }

    // PASS A — Deep Work: schedule dwCount sessions per topic, ≥2 days apart
    ledger.forEach(function(t){
      t.dwDays=[];
      for(let pass=0;pass<t.dwCount;pass++){
        const minD=t.dwDays.length>0?t.dwDays[t.dwDays.length-1]+2:0;
        let placed=-1;
        // Try from minD with full constraints
        for(let d=minD;d<=6&&placed<0;d++){if(fits(d,'deep',DEEP_DUR,t.subject)){placed=place(d,{type:'deep',subject:t.subject,topic:t.topic,dur:DEEP_DUR,colorClass:getSubjColorClass(t.subject)});t.dwDays.push(placed);}}
        // Relax minD gap constraint
        if(placed<0){for(let d=0;d<=6&&placed<0;d++){if(fits(d,'deep',DEEP_DUR,t.subject)){placed=place(d,{type:'deep',subject:t.subject,topic:t.topic,dur:DEEP_DUR,colorClass:getSubjColorClass(t.subject)});t.dwDays.push(placed);}}}
        // Last resort: ignore per-subject-per-day limit
        if(placed<0){for(let d=0;d<=6&&placed<0;d++){if(dMin[d]+DEEP_DUR<=DAY_CAP_STUDY&&dDeep[d]<MAX_DEEP_PER_DAY){placed=place(d,{type:'deep',subject:t.subject,topic:t.topic,dur:DEEP_DUR,colorClass:getSubjColorClass(t.subject)});t.dwDays.push(placed);}}}
        if(placed<0)break;
      }
      t.dwDay=t.dwDays.length>0?t.dwDays[0]:undefined;
    });

    // PASS B — Active Recall: 1 AR per DW session (d+1, +2, or +3)
    ledger.forEach(function(t){
      if(!t.dwDays)return;
      t.dwDays.forEach(function(dwD){
        [1,2,3].some(function(off){
          const d=dwD+off;if(d>6)return true;
          if(dMin[d]+RECALL_DUR<=DAY_CAP_STUDY){place(d,{type:'recall',subject:t.subject,topic:t.topic,dur:RECALL_DUR,colorClass:getSubjColorClass(t.subject)});return true;}
          return false;
        });
      });
    });

    // PASS C — Light Revision: 1 LR per DW session (d+3, +4, +5, +6, or +2)
    ledger.forEach(function(t){
      if(!t.dwDays)return;
      t.dwDays.forEach(function(dwD){
        [3,4,5,6,2].some(function(off){
          const d=dwD+off;if(d<0||d>6)return false;
          if(dMin[d]+REVIEW_DUR<=DAY_CAP_STUDY){place(d,{type:'review',subject:t.subject,topic:t.topic,dur:REVIEW_DUR,colorClass:getSubjColorClass(t.subject)});return true;}
          return false;
        });
      });
    });

    // PASS D — aggressively fill remaining capacity with AR/LR cycling by topic weight
    // Target: fill each day to within 30 min of the 8 h cap (≈450 min pure study)
    const FILL_TO=DAY_CAP_STUDY-30;
    for(let d=0;d<7;d++){
      if(dMin[d]>=FILL_TO)continue;
      // Topics already introduced (DW on or before today), sorted heaviest first
      const avail=ledger.filter(function(t){return t.dwDay!==undefined&&t.dwDay<=d;}).sort(function(a,b){return b.weight-a.weight;});
      if(!avail.length)continue;
      let rr=0,safety=200;
      while(dMin[d]<FILL_TO&&safety-->0){
        const t=avail[rr%avail.length];rr++;
        const tAR=days[d].filter(function(e){return e.type==='recall'&&e.topic===t.topic;}).length;
        const tLR=days[d].filter(function(e){return e.type==='review'&&e.topic===t.topic;}).length;
        // High-weight topics get more filler passes; lower-weight get fewer
        const maxAR=t.weight>=12?3:t.weight>=6?2:1;
        const maxLR=t.weight>=12?4:t.weight>=6?3:2;
        if(tAR<maxAR&&dMin[d]+RECALL_DUR<=FILL_TO){
          place(d,{type:'recall',subject:t.subject,topic:t.topic,dur:RECALL_DUR,colorClass:getSubjColorClass(t.subject)});
        }else if(tLR<maxLR&&dMin[d]+REVIEW_DUR<=FILL_TO){
          place(d,{type:'review',subject:t.subject,topic:t.topic,dur:REVIEW_DUR,colorClass:getSubjColorClass(t.subject)});
        }
        // After a full rotation check if anything can still be placed
        if(rr%avail.length===0){
          const anyFits=avail.some(function(t){
            const ar=days[d].filter(function(e){return e.type==='recall'&&e.topic===t.topic;}).length;
            const lr=days[d].filter(function(e){return e.type==='review'&&e.topic===t.topic;}).length;
            const mAR=t.weight>=12?3:t.weight>=6?2:1;
            const mLR=t.weight>=12?4:t.weight>=6?3:2;
            return(ar<mAR&&dMin[d]+RECALL_DUR<=FILL_TO)||(lr<mLR&&dMin[d]+REVIEW_DUR<=FILL_TO);
          });
          if(!anyFits)break;
        }
      }
    }

    return days;
  }

  // Place each day's planned sessions onto the wake→sleep timeline,
  // respecting meals + commitments and interleaving subjects.
  function buildDayEvents(dayIndex,state,plannedSessions){
    const wakeMin=toMinutes(state.wakeTime);
    const sleepMin=toMinutes(state.sleepTime);
    const rawCutoff=sleepMin>wakeMin?sleepMin:sleepMin+1440;
    const CUTOFF=rawCutoff-30;  // 30-min wind-down buffer before bed
    const breakfastMin=toMinutes(state.breakfastTime);
    const lunchMin=toMinutes(state.lunchTime);
    const dinnerMin=toMinutes(state.dinnerTime);
    const dayName=DAYS[dayIndex];

    const blockers=[];
    [{startMin:breakfastMin,endMin:breakfastMin+MEAL_DUR,type:'break',label:'Breakfast',sub:'Fuel up'},
     {startMin:lunchMin,endMin:lunchMin+MEAL_DUR,type:'lunch',label:'Lunch',sub:'Step away'},
     {startMin:dinnerMin,endMin:dinnerMin+MEAL_DUR,type:'break',label:'Dinner',sub:'Rest'}
    ].forEach(function(m){if(m.startMin>=wakeMin&&m.startMin<CUTOFF)blockers.push(m)});
    state.commitments.filter(function(c){return c.day===dayName}).forEach(function(c){
      blockers.push({startMin:c.startMin,endMin:c.endMin,type:'fixed',label:c.label,sub:''});
    });
    blockers.sort(function(a,b){return a.startMin-b.startMin});

    // Drop meal blocks that overlap commitments (commitments win)
    const resolved=[];
    blockers.forEach(function(b){
      const clash=resolved.find(function(r){return b.startMin<r.endMin&&b.endMin>r.startMin});
      if(!clash)resolved.push(b);
    });

    const queues={deep:[],recall:[],review:[]};
    plannedSessions.forEach(function(s){if(queues[s.type])queues[s.type].push(s)});

    const events=[];
    let cursor=wakeMin;
    let lastSubj=null;
    let streak=0;

    function pickEvent(now,remaining){
      // Time-of-day preference:
      //   Morning (before lunch): Deep Work, then Active Recall (no Light Review here)
      //   Afternoon (lunch–dinner): Active Recall, then Deep Work, then Light Review
      //   Evening (after dinner): Light Review only — no heavy new content
      let order;
      if(now<lunchMin)        order=['deep','recall','review'];
      else if(now<dinnerMin)  order=['recall','deep','review'];
      else                    order=['review'];
      for(let oi=0;oi<order.length;oi++){
        const tt=order[oi];const q=queues[tt];
        if(!q.length)continue;
        const dur=tt==='deep'?DEEP_DUR:tt==='recall'?RECALL_DUR:REVIEW_DUR;
        if(dur>remaining)continue;
        const mustDiffer=streak>=2&&lastSubj!==null;
        let idx=q.findIndex(function(e){return e.subject!==lastSubj});
        if(mustDiffer){if(idx<0)continue}
        else{if(idx<0)idx=0}
        return q.splice(idx,1)[0];
      }
      return null;
    }

    let safety=300;
    while(cursor<CUTOFF&&safety-->0){
      const inside=resolved.find(function(f){return f.startMin<=cursor&&f.endMin>cursor});
      if(inside){
        events.push({startMin:inside.startMin,endMin:Math.min(inside.endMin,CUTOFF),type:inside.type,subject:'',topic:'',label:inside.label,sub:inside.sub,colorClass:''});
        cursor=inside.endMin;
        continue;
      }
      const next=resolved.find(function(f){return f.startMin>=cursor});
      const limit=Math.min(next?next.startMin:CUTOFF,CUTOFF);
      if(limit<=cursor){cursor=limit;continue}

      const ev=pickEvent(cursor,limit-cursor);
      if(!ev){
        if(limit-cursor>=15){
          events.push({startMin:cursor,endMin:limit,type:'free',subject:'',topic:'',label:'Free',sub:'',colorClass:''});
        }
        cursor=limit;
        continue;
      }

      events.push({startMin:cursor,endMin:cursor+ev.dur,type:ev.type,subject:ev.subject,topic:ev.topic,label:'',sub:'',colorClass:ev.colorClass});
      if(ev.subject===lastSubj)streak++;else streak=1;
      lastSubj=ev.subject;
      cursor+=ev.dur;

      // Short break if there's room before the next fixed block / cutoff
      const next2=resolved.find(function(f){return f.startMin>=cursor});
      const limit2=Math.min(next2?next2.startMin:CUTOFF,CUTOFF);
      if(limit2-cursor>=BRK_DUR+15){
        events.push({startMin:cursor,endMin:cursor+BRK_DUR,type:'break',subject:'',topic:'',label:'Break',sub:'Hydrate · move',colorClass:''});
        cursor+=BRK_DUR;
      }
    }
    return events;
  }

  function generatePlan(state){
    const days=planWeek(state.subjects);
    const week=[];
    for(let i=0;i<7;i++){
      week.push({dayName:DAYS[i],events:buildDayEvents(i,state,days[i])});
    }
    return week;
  }

  function renderTimetable(week,state,name){
    const PX_PER_MIN=1.2;
    document.getElementById('tt-heading').textContent=name?(name+"'s Week"):'Your Week';
    const wakeMin=toMinutes(state.wakeTime);
    const sleepMin=toMinutes(state.sleepTime);
    const CUTOFF=sleepMin>wakeMin?sleepMin:sleepMin+1440;
    const totalMins=CUTOFF-wakeMin;
    const totalH=Math.round(totalMins*PX_PER_MIN);
    const grid=document.getElementById('week-grid');grid.innerHTML='';

    const hrow=document.createElement('div');hrow.className='tt-header-row';
    const spacer=document.createElement('div');spacer.className='tt-axis-spacer';hrow.appendChild(spacer);
    week.forEach(function(day){
      const h=document.createElement('div');h.className='tt-day-head';h.textContent=DAY_SHORT[day.dayName];hrow.appendChild(h);
    });
    grid.appendChild(hrow);

    const bodyRow=document.createElement('div');bodyRow.className='tt-body-row';

    const axis=document.createElement('div');axis.className='tt-axis';axis.style.height=totalH+'px';
    const startHour=Math.ceil(wakeMin/60);
    const endHour=Math.floor(CUTOFF/60);
    for(let h=startHour;h<=endHour;h++){
      const topPx=Math.round((h*60-wakeMin)*PX_PER_MIN);
      const lbl=document.createElement('div');lbl.className='tt-hour-label';lbl.style.top=topPx+'px';
      lbl.textContent=String(((h%24)+24)%24).padStart(2,'0')+':00';
      axis.appendChild(lbl);
    }
    bodyRow.appendChild(axis);

    week.forEach(function(day){
      const col=document.createElement('div');col.className='tt-day-col';col.style.height=totalH+'px';
      for(let hh=startHour;hh<=endHour;hh++){
        const ltp=Math.round((hh*60-wakeMin)*PX_PER_MIN);
        const line=document.createElement('div');line.className='tt-hour-line';line.style.top=ltp+'px';
        col.appendChild(line);
      }
      day.events.forEach(function(evt){
        const top=Math.round((evt.startMin-wakeMin)*PX_PER_MIN);
        const height=Math.max(16,Math.round((evt.endMin-evt.startMin)*PX_PER_MIN));
        const slot=document.createElement('div');
        slot.className='tt-slot tt-slot--'+evt.type;
        slot.style.top=top+'px';slot.style.height=height+'px';

        let displayLabel='';
        if(evt.type==='deep')displayLabel=evt.subject;
        else if(evt.type==='recall')displayLabel='Recall: '+evt.subject;
        else if(evt.type==='review')displayLabel='Review: '+evt.subject;
        else displayLabel=evt.label||evt.subject||'';

        const labelClass=evt.colorClass?'tt-slot-label '+evt.colorClass:'tt-slot-label';
        let html='';
        if(height>=30)html+='<span class="tt-slot-time">'+escapeHTML(fmtTimeRange(evt.startMin,evt.endMin))+'</span>';
        html+='<span class="'+labelClass+'">'+escapeHTML(displayLabel)+'</span>';
        const sub=evt.topic||evt.sub||'';
        if(sub&&height>=45)html+='<span class="tt-slot-sub">'+escapeHTML(sub)+'</span>';
        slot.innerHTML=html;col.appendChild(slot);
      });
      bodyRow.appendChild(col);
    });

    grid.appendChild(bodyRow);
  }

  function showTimetable(){document.getElementById('questionnaire-section').style.display='none';document.getElementById('timetable-section').style.display='block';document.querySelector('.container').classList.add('container--wide');window.scrollTo({top:0,behavior:'smooth'})}
  function showQuestionnaire(){document.getElementById('timetable-section').style.display='none';document.getElementById('questionnaire-section').style.display='block';document.querySelector('.container').classList.remove('container--wide');window.scrollTo({top:0,behavior:'smooth'})}

  document.getElementById('wake-time').addEventListener('change',validateSleep);
  document.getElementById('sleep-time').addEventListener('change',validateSleep);
  document.getElementById('add-subject-btn').addEventListener('click',()=>addSubjectRow());
  document.getElementById('add-commit-btn').addEventListener('click',()=>addCommitmentRow());
  document.getElementById('has-school').addEventListener('change',()=>{document.getElementById('school-section').style.display=document.getElementById('has-school').checked?'block':'none'});
  document.getElementById('generate-btn').addEventListener('click',()=>{const state=collectState();if(!state)return;const week=generatePlan(state);renderTimetable(week,state,state.name);showTimetable()});
  document.getElementById('edit-btn').addEventListener('click',showQuestionnaire);

  document.getElementById('print-btn').addEventListener('click',function(){
    if(typeof html2pdf==='undefined'){alert('PDF library not loaded. Please try again.');return}
    const element=document.getElementById('timetable-section');
    const name=document.getElementById('student-name').value.trim()||'revision-timetable';
    const pdfLogo=document.getElementById('pdf-logo');
    const weekWrap=document.querySelector('.week-wrap');
    const grid=document.getElementById('week-grid');
    const prevOverflow=weekWrap?weekWrap.style.overflow:'';
    if(pdfLogo)pdfLogo.style.display='block';
    if(weekWrap)weekWrap.style.overflow='visible';
    window.scrollTo(0,0);
    // Zoom grid down so it fits on one A4 landscape page (~760px content height)
    const gridH=grid?grid.scrollHeight:0;
    const zoomVal=(gridH>760&&grid)?(760/gridH).toFixed(3):'1';
    if(grid&&parseFloat(zoomVal)<1)grid.style.zoom=zoomVal;
    setTimeout(function(){
      html2pdf().set({
        margin:[6,4,6,4],
        filename:name+'-revision-plan.pdf',
        image:{type:'jpeg',quality:0.95},
        html2canvas:{scale:2,useCORS:true,logging:false,scrollX:0,scrollY:0,windowWidth:1400,allowTaint:true},
        jsPDF:{orientation:'landscape',unit:'mm',format:'a4'}
      }).from(element).save().then(function(){
        if(pdfLogo)pdfLogo.style.display='none';
        if(weekWrap)weekWrap.style.overflow=prevOverflow;
        if(grid)grid.style.zoom='';
      });
    },150);
  });
})();
`

export default function RevisionTrackerPage() {
  useEffect(() => {
    const html2pdfScript = document.createElement('script')
    html2pdfScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js'
    html2pdfScript.onload = () => {
      const appScript = document.createElement('script')
      appScript.textContent = js
      document.body.appendChild(appScript)
    }
    document.body.appendChild(html2pdfScript)
    return () => {
      if (document.body.contains(html2pdfScript)) {
        document.body.removeChild(html2pdfScript)
      }
    }
  }, [])

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />

      <Header />

      <div className="container">
        <section id="questionnaire-section">
          <div className="intro">
            <strong>How this works</strong>
            Tell us your subjects, the topics you want to prioritise this week, your confidence in each, and anything fixed in your schedule. We'll build a timetable with 90-minute deep-work blocks with your hardest material scheduled at your peak energy times.
          </div>

          <div className="card">
            <div className="card-num">1</div>
            <h2 className="card-title">About You</h2>
            <p className="card-subtitle">Just the basics. Used to shape your day.</p>
            <label htmlFor="student-name">First name (optional)</label>
            <input type="text" id="student-name" placeholder="e.g. Aisha" maxLength={30} />
            <label htmlFor="wake-time">Wake-up time</label>
            <input type="time" id="wake-time" defaultValue="07:00" />
            <label htmlFor="breakfast-time">Breakfast time</label>
            <input type="time" id="breakfast-time" defaultValue="07:30" />
            <label htmlFor="lunch-time">Lunch time</label>
            <input type="time" id="lunch-time" defaultValue="12:00" />
            <label htmlFor="dinner-time">Dinner time</label>
            <input type="time" id="dinner-time" defaultValue="18:00" />
            <label htmlFor="sleep-time">Sleep time (target bedtime)</label>
            <input type="time" id="sleep-time" defaultValue="23:00" />
            <div id="sleep-time-error" className="sleep-error"></div>
            <div className="info-line">Sleep is part of the system. Your wake time and sleep time must be at least <strong>8 hours apart</strong>. This is non-negotiable and ensures you're getting the rest you need to perform at your best.</div>
          </div>

          <div className="card">
            <div className="card-num">1b</div>
            <h2 className="card-title">School This Week</h2>
            <p className="card-subtitle">Do you have school this week? If yes, select which days and the hours (including commuting).</p>
            <label style={{marginBottom:'0.5rem'}}>
              <input type="checkbox" id="has-school" style={{marginRight:'0.5rem'}} />
              <span style={{fontSize:'0.9rem'}}>I have school this week</span>
            </label>
            <div id="school-section" style={{display:'none'}}>
              <p style={{fontSize:'0.85rem',color:'var(--muted)',marginBottom:'0.8rem'}}>Select which days you have school and enter your hours (include commuting time):</p>
              <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(120px,1fr))',gap:'0.6rem',marginBottom:'1rem'}}>
                <label style={{display:'flex',alignItems:'center',marginBottom:0,fontSize:'0.9rem'}}>
                  <input type="checkbox" className="school-day" value="Monday" style={{marginRight:'0.4rem'}} />
                  Monday
                </label>
                <label style={{display:'flex',alignItems:'center',marginBottom:0,fontSize:'0.9rem'}}>
                  <input type="checkbox" className="school-day" value="Tuesday" style={{marginRight:'0.4rem'}} />
                  Tuesday
                </label>
                <label style={{display:'flex',alignItems:'center',marginBottom:0,fontSize:'0.9rem'}}>
                  <input type="checkbox" className="school-day" value="Wednesday" style={{marginRight:'0.4rem'}} />
                  Wednesday
                </label>
                <label style={{display:'flex',alignItems:'center',marginBottom:0,fontSize:'0.9rem'}}>
                  <input type="checkbox" className="school-day" value="Thursday" style={{marginRight:'0.4rem'}} />
                  Thursday
                </label>
                <label style={{display:'flex',alignItems:'center',marginBottom:0,fontSize:'0.9rem'}}>
                  <input type="checkbox" className="school-day" value="Friday" style={{marginRight:'0.4rem'}} />
                  Friday
                </label>
              </div>
              <div className="two-col">
                <div>
                  <label htmlFor="school-start">School start time</label>
                  <input type="time" id="school-start" defaultValue="08:30" />
                </div>
                <div>
                  <label htmlFor="school-end">School end time (+ commute)</label>
                  <input type="time" id="school-end" defaultValue="16:00" />
                </div>
              </div>
            </div>
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
            <img id="pdf-logo" src="/logo-header.png" alt="A-Level Accelerators" crossOrigin="anonymous" />
            <div className="badge">Your Personal Plan</div>
            <h2 id="tt-heading">Your Week</h2>
            <p>Deep Work · Active Recall · Light Review · Breaks</p>
          </div>

          <div className="week-wrap">
            <div className="week-grid" id="week-grid"></div>
          </div>

          <div className="legend-wrap">
            <div className="legend">
              <div className="legend-item"><span className="legend-dot" style={{ background: '#1E40AF' }}></span><span><strong>Deep Work</strong> — new material, full focus (90 min)</span></div>
              <div className="legend-item"><span className="legend-dot" style={{ background: '#15803D' }}></span><span><strong>Active Recall</strong> — test yourself: past papers, blurting, Anki (45 min)</span></div>
              <div className="legend-item"><span className="legend-dot" style={{ background: '#B45309' }}></span><span><strong>Light Revision</strong> — quick revisit, consolidate notes (30 min)</span></div>
              <div className="legend-item"><span className="legend-dot" style={{ background: '#E8D9BF' }}></span> Break / Meal</div>
              <div className="legend-item"><span className="legend-dot" style={{ background: '#A0A0B8' }}></span> Fixed Commitment</div>
              <div className="legend-item"><span className="legend-dot" style={{ background: '#f5f5f5', border:'1px dashed #ddd' }}></span> Free / Buffer</div>
            </div>
          </div>

          <div className="tips">
            <strong>How to use this plan</strong>
            Deep Work slots are for your hardest, highest-priority topics. Phone in another room, no distractions. Active Recall slots are for past papers, blurting, and Anki. Light Review is for consolidating notes. Always take your breaks as they're part of the system, not a reward.
          </div>

          <div className="action-row">
            <button type="button" className="btn-outline" id="edit-btn">← Edit My Answers</button>
            <button type="button" className="btn-solid" id="print-btn">Save as PDF</button>
          </div>
          <div className="tips" style={{marginTop:'1rem', background: 'var(--cream)', color: 'var(--text)', borderLeft: '4px solid var(--gold)'}}>
            <strong style={{color: 'var(--gold)'}}>Tip:</strong> After saving, open the PDF and print it to stick on your wall — that's the most effective way to use this plan. Print it out and put it somewhere you'll see it every day!
          </div>
        </section>
      </div>
    </>
  )
}
