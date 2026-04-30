'use strict';

// ============================================================================
//  Standalone scheduler test.  Mirrors the algorithm we will embed in the app.
//  Run with: node scheduler-test.js
// ============================================================================

const DAYS = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
const PRIORITY_WEIGHT = { high:3, medium:2, low:1 };

// Session durations (minutes)
const DEEP_MIN   = 90;
const RECALL_MIN = 45;
const REVIEW_MIN = 30;
const BREAK_MIN  = 15;
const MEAL_MIN   = 30;

// Day-level caps (study minutes only — meals + breaks on top)
const DAY_CAP_STUDY      = 480;  // 8 h hard cap on pure study time
const MAX_DEEP_PER_DAY   = 2;
const MIN_DAILY_LOAD     = 90;   // backfill target so no day is empty

function toMinutes(hhmm){
  const [h,m] = hhmm.split(':').map(n=>parseInt(n,10));
  return h*60 + m;
}
function toHHMM(mins){
  const h = Math.floor(mins/60), m = mins%60;
  return String(h).padStart(2,'0') + ':' + String(m).padStart(2,'0');
}
function fmt(a,b){ return toHHMM(a) + '–' + toHHMM(b); }

// --- Pass 1: build the topic ledger -----------------------------------------
function buildTopicLedger(subjects){
  const items = [];
  for (const s of subjects){
    const tt = (s.topics ? s.topics.split('|') : []).map(t=>t.trim()).filter(Boolean);
    const w = PRIORITY_WEIGHT[s.priority] * (6 - s.confidence);
    if (tt.length === 0){
      items.push({ subject:s.name, topic:'General revision', weight:w });
    } else {
      for (const t of tt) items.push({ subject:s.name, topic:t, weight:w });
    }
  }
  // Sort by weight desc; tiebreak by subject so stable
  items.sort((a,b)=> b.weight - a.weight || a.subject.localeCompare(b.subject));
  return items;
}

// --- Pass 2: place sessions onto days (no time-of-day yet) ------------------
function planWeek(ledger){
  const days   = [[],[],[],[],[],[],[]];
  const dMin   = [0,0,0,0,0,0,0];
  const dDeep  = [0,0,0,0,0,0,0];
  const dSubjDeep = [{},{},{},{},{},{},{}];

  function fits(d, type, dur, subject){
    if (d < 0 || d > 6) return false;
    if (dMin[d] + dur > DAY_CAP_STUDY) return false;
    if (type === 'deep'){
      if (dDeep[d] >= MAX_DEEP_PER_DAY) return false;
      if ((dSubjDeep[d][subject] || 0) >= 1) return false; // no two DWs of same subj on same day
    }
    return true;
  }
  function place(d, ev){
    days[d].push(ev);
    dMin[d] += ev.dur;
    if (ev.type === 'deep'){
      dDeep[d]++;
      dSubjDeep[d][ev.subject] = (dSubjDeep[d][ev.subject] || 0) + 1;
    }
    return d;
  }

  // PASS A — every topic gets a Deep Work slot, biased to earliest fit
  for (const t of ledger){
    let placed = -1;
    for (let d = 0; d < 7 && placed < 0; d++){
      if (fits(d, 'deep', DEEP_MIN, t.subject)){
        placed = place(d, { type:'deep', subject:t.subject, topic:t.topic, dur:DEEP_MIN });
      }
    }
    // Relax subject-dup rule if needed
    if (placed < 0){
      for (let d = 0; d < 7 && placed < 0; d++){
        if (dMin[d] + DEEP_MIN <= DAY_CAP_STUDY && dDeep[d] < MAX_DEEP_PER_DAY){
          placed = place(d, { type:'deep', subject:t.subject, topic:t.topic, dur:DEEP_MIN });
        }
      }
    }
    // Last resort: cheapest day, ignore caps
    if (placed < 0){
      let m = 0;
      for (let d = 1; d < 7; d++) if (dMin[d] < dMin[m]) m = d;
      placed = place(m, { type:'deep', subject:t.subject, topic:t.topic, dur:DEEP_MIN });
    }
    t.dwDay = placed;
  }

  // PASS B — Active Recall on day d+1 (try +1, +2, +3)
  for (const t of ledger){
    if (t.dwDay === undefined) continue;
    for (const off of [1,2,3]){
      const d = t.dwDay + off;
      if (d > 6) break;
      if (dMin[d] + RECALL_MIN <= DAY_CAP_STUDY){
        place(d, { type:'recall', subject:t.subject, topic:t.topic, dur:RECALL_MIN });
        t.arDay = d;
        break;
      }
    }
  }

  // PASS C — Light Revision on day d+3 (try +3, +4, +5, +6, +2)
  for (const t of ledger){
    if (t.dwDay === undefined) continue;
    for (const off of [3,4,5,6,2]){
      const d = t.dwDay + off;
      if (d < 0 || d > 6) continue;
      if (dMin[d] + REVIEW_MIN <= DAY_CAP_STUDY){
        place(d, { type:'review', subject:t.subject, topic:t.topic, dur:REVIEW_MIN });
        t.lrDay = d;
        break;
      }
    }
  }

  // PASS D — backfill light days so no day is left blank
  for (let d = 0; d < 7; d++){
    let safety = 20;
    while (dMin[d] < MIN_DAILY_LOAD && safety-- > 0){
      const subjsHere = new Set(days[d].map(e => e.subject));
      let cand =
        ledger.find(t => t.dwDay !== undefined && t.dwDay <= d
          && !days[d].some(e => e.topic===t.topic && e.subject===t.subject)
          && !subjsHere.has(t.subject))
        ||
        ledger.find(t => t.dwDay !== undefined && t.dwDay <= d
          && !days[d].some(e => e.topic===t.topic && e.subject===t.subject));
      if (!cand) break;
      if (dMin[d] + REVIEW_MIN > DAY_CAP_STUDY) break;
      place(d, { type:'review', subject:cand.subject, topic:cand.topic, dur:REVIEW_MIN });
    }
  }

  return { days, dMin };
}

// --- Pass 3: place each day's planned events onto a wake→sleep timeline -----
function buildDaySlots(dayIndex, plannedEvents, state){
  const dayName = DAYS[dayIndex];
  const wakeMin      = toMinutes(state.wakeTime);
  const sleepMin     = toMinutes(state.sleepTime);
  const breakfastMin = toMinutes(state.breakfastTime);
  const lunchMin     = toMinutes(state.lunchTime);
  const dinnerMin    = toMinutes(state.dinnerTime);

  // Fixed timeline: meals + commitments
  const fixed = [];
  fixed.push({ startMin:breakfastMin, endMin:breakfastMin+MEAL_MIN, type:'break', label:'Breakfast', sub:'Fuel up' });
  fixed.push({ startMin:lunchMin,     endMin:lunchMin+MEAL_MIN,     type:'lunch', label:'Lunch',     sub:'Step away' });
  fixed.push({ startMin:dinnerMin,    endMin:dinnerMin+MEAL_MIN,    type:'lunch', label:'Dinner',    sub:'Rest' });
  (state.commitments || []).filter(c => c.day === dayName).forEach(c => {
    fixed.push({ startMin:c.startMin, endMin:c.endMin, type:'fixed', label:c.label, sub:'' });
  });
  fixed.sort((a,b) => a.startMin - b.startMin);

  // Drop meal blocks that collide with commitments
  const resolved = [];
  for (const f of fixed){
    const clash = resolved.find(r => f.startMin < r.endMin && f.endMin > r.startMin);
    if (!clash) resolved.push(f);
  }

  // Three queues by event type
  const queues = { deep:[], recall:[], review:[] };
  for (const e of plannedEvents) queues[e.type].push(e);

  const cutoff = (sleepMin > wakeMin ? sleepMin : 1440) - 30; // 30-min wind-down

  const slots = [];
  let cursor = wakeMin;
  let lastSubj = null;
  let sameSubjStreak = 0;

  function pickEvent(now, remaining){
    let order;
    if (now < lunchMin)         order = ['deep','recall','review'];
    else if (now < dinnerMin)   order = ['recall','deep','review'];
    else                        order = ['review']; // evening: light only

    for (const tt of order){
      const q = queues[tt];
      if (!q.length) continue;
      const dur = tt==='deep' ? DEEP_MIN : tt==='recall' ? RECALL_MIN : REVIEW_MIN;
      if (dur > remaining) continue;

      // Subject interleaving: forbid third same-subject in a row
      const mustDiffer = sameSubjStreak >= 2 && lastSubj !== null;
      let idx = q.findIndex(e => e.subject !== lastSubj);
      if (mustDiffer){
        if (idx < 0) continue; // try next type
      } else {
        if (idx < 0) idx = 0;
      }
      return q.splice(idx, 1)[0];
    }
    return null;
  }

  let safety = 200;
  while (cursor < cutoff && safety-- > 0){
    // Inside a fixed block?
    const inside = resolved.find(f => f.startMin <= cursor && f.endMin > cursor);
    if (inside){
      slots.push({ type:inside.type, time:fmt(inside.startMin, inside.endMin),
                   label:inside.label, sub:inside.sub, colorClass:'' });
      cursor = inside.endMin;
      continue;
    }

    const next = resolved.find(f => f.startMin >= cursor);
    const limit = Math.min(next ? next.startMin : cutoff, cutoff);
    if (limit <= cursor){ cursor = limit; continue; }

    const ev = pickEvent(cursor, limit - cursor);
    if (!ev){
      // No event fits — emit a labelled free/buffer slot rather than blank
      if (limit - cursor >= 15){
        slots.push({ type:'free', time:fmt(cursor, limit),
                     label:'Break / Free Time', sub:'Rest, hydrate, move', colorClass:'' });
      }
      cursor = limit;
      continue;
    }

    slots.push({
      type: ev.type,
      time: fmt(cursor, cursor + ev.dur),
      label: ev.type==='deep' ? ev.subject
           : ev.type==='recall' ? 'Active Recall: ' + ev.subject
           : 'Light Review: ' + ev.subject,
      sub: ev.topic,
      colorClass: subjColorClass(ev.subject)
    });

    if (ev.subject === lastSubj) sameSubjStreak++;
    else sameSubjStreak = 1;
    lastSubj = ev.subject;
    cursor += ev.dur;

    // Short break after a work block, only if the next fixed/cutoff is far enough
    const next2 = resolved.find(f => f.startMin >= cursor);
    const limit2 = Math.min(next2 ? next2.startMin : cutoff, cutoff);
    if (limit2 - cursor >= BREAK_MIN + 15){
      slots.push({ type:'break', time:fmt(cursor, cursor + BREAK_MIN),
                   label:'Short Break', sub:'Hydrate · move', colorClass:'' });
      cursor += BREAK_MIN;
    }
  }

  if (!slots.length){
    slots.push({ type:'none', time:'', label:'No study slots',
                 sub:'Check your wake and sleep times', colorClass:'' });
  }
  return slots;
}

function subjColorClass(name){
  const l = name.toLowerCase();
  if (l.includes('math'))    return 'subj-maths';
  if (l.includes('biol'))    return 'subj-biology';
  if (l.includes('chem'))    return 'subj-chemistry';
  if (l.includes('phys'))    return 'subj-physics';
  if (l.includes('english')) return 'subj-english';
  if (l.includes('history')) return 'subj-history';
  return '';
}

// --- Top-level entry --------------------------------------------------------
function generatePlan(state){
  const ledger = buildTopicLedger(state.subjects);
  const { days, dMin } = planWeek(ledger);
  const week = [];
  for (let i = 0; i < 7; i++){
    week.push({
      dayName: DAYS[i],
      slots: buildDaySlots(i, days[i], state),
      planned: days[i],
      studyMin: dMin[i]
    });
  }
  return { week, ledger };
}

// ============================================================================
//  Test case from the brief
// ============================================================================
const state = {
  wakeTime:'07:00', breakfastTime:'07:30', lunchTime:'12:00',
  dinnerTime:'18:00', sleepTime:'23:00',
  subjects: [
    { name:'Maths',     topics:'Differentiation|Integration|Vectors',           priority:'medium', confidence:3 },
    { name:'Chemistry', topics:'Organic mechanisms|Electrochemistry',           priority:'medium', confidence:3 },
    { name:'Biology',   topics:'Cardiac cycle|Photosynthesis|Cell division',    priority:'medium', confidence:3 },
    { name:'History',   topics:'Causes of WWII|Cold War origins',               priority:'medium', confidence:3 }
  ],
  commitments: []
};

const { week, ledger } = generatePlan(state);

console.log('\n=== TIMETABLE ===\n');
for (const day of week){
  const studyH = (day.studyMin/60).toFixed(1);
  console.log(day.dayName + '   (' + day.studyMin + ' min study = ' + studyH + ' h)');
  for (const s of day.slots){
    const t = s.time ? s.time.padEnd(13,' ') : '             ';
    const tag = ('['+s.type+']').padEnd(10,' ');
    console.log('   ' + t + ' ' + tag + ' ' + s.label + (s.sub ? '  —  ' + s.sub : ''));
  }
  console.log('');
}

// --- Verification matrix ---------------------------------------------------
console.log('=== VERIFICATION ===\n');

// 1. Every topic has at least one DW
const topicsByKey = new Map(ledger.map(t => [t.subject + '|' + t.topic, { ...t, dwCount:0, arCount:0, lrCount:0 }]));
for (const day of week){
  for (const ev of day.planned){
    const k = ev.subject + '|' + ev.topic;
    if (!topicsByKey.has(k)) topicsByKey.set(k, { subject:ev.subject, topic:ev.topic, dwCount:0, arCount:0, lrCount:0 });
    const e = topicsByKey.get(k);
    if (ev.type === 'deep')   e.dwCount++;
    if (ev.type === 'recall') e.arCount++;
    if (ev.type === 'review') e.lrCount++;
  }
}
let allDW = true, mostAR = 0;
for (const [k, e] of topicsByKey){
  if (e.dwCount < 1) { allDW = false; console.log('   MISSING DW: ' + k); }
  if (e.arCount >= 1) mostAR++;
}
console.log('1. All topics have ≥1 Deep Work session: ' + (allDW ? 'PASS' : 'FAIL'));
console.log('2. Topics with ≥1 Active Recall: ' + mostAR + ' / ' + topicsByKey.size +
            (mostAR >= Math.ceil(topicsByKey.size * 0.7) ? '  (PASS)' : '  (FAIL)'));

// 3. No two consecutive sessions share a subject (within a day)
let consecOK = true;
for (const day of week){
  const work = day.slots.filter(s => s.type==='deep' || s.type==='recall' || s.type==='review');
  for (let i = 2; i < work.length; i++){
    const a = work[i-2].label.replace(/^Active Recall: |^Light Review: /, '');
    const b = work[i-1].label.replace(/^Active Recall: |^Light Review: /, '');
    const c = work[i].label.replace(/^Active Recall: |^Light Review: /, '');
    if (a === b && b === c){
      consecOK = false;
      console.log('   3+ consecutive same-subject on ' + day.dayName + ': ' + a);
    }
  }
}
console.log('3. No 3+ consecutive same-subject sessions: ' + (consecOK ? 'PASS' : 'FAIL'));

// 4. All 7 days have at least one work session
let allDays = true;
for (const day of week){
  const has = day.slots.some(s => s.type==='deep' || s.type==='recall' || s.type==='review');
  if (!has){ allDays = false; console.log('   Empty day: ' + day.dayName); }
}
console.log('4. All 7 days have study sessions: ' + (allDays ? 'PASS' : 'FAIL'));

// 5. No day exceeds 9h study
let underCap = true;
for (const day of week){
  if (day.studyMin > 540){ underCap = false; console.log('   ' + day.dayName + ' = ' + (day.studyMin/60).toFixed(1) + 'h'); }
}
console.log('5. No day exceeds 9 h study: ' + (underCap ? 'PASS' : 'FAIL'));

console.log('');
