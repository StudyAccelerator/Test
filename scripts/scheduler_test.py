#!/usr/bin/env python3
"""
Standalone Python port of the new revision-tracker scheduling algorithm.
Used to verify the algorithm against the brief's test case before porting
it into app/revision-tracker/page.tsx.
"""

DAYS = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']
PRIORITY_WEIGHT = {'high':3, 'medium':2, 'low':1}

DEEP_MIN, RECALL_MIN, REVIEW_MIN = 90, 45, 30
BREAK_MIN, MEAL_MIN = 15, 30
DAY_CAP_STUDY  = 480
MAX_DEEP_PER_DAY = 2
MIN_DAILY_LOAD = 90

def to_min(hhmm):
    h,m = hhmm.split(':')
    return int(h)*60 + int(m)
def to_hhmm(mins):
    return f'{mins//60:02d}:{mins%60:02d}'
def fmt(a,b):
    return f'{to_hhmm(a)}–{to_hhmm(b)}'

# ---- Pass 1: ledger --------------------------------------------------------
def build_ledger(subjects):
    items = []
    for s in subjects:
        tt = [t.strip() for t in (s.get('topics','') or '').split('|') if t.strip()]
        w  = PRIORITY_WEIGHT[s['priority']] * (6 - s['confidence'])
        if not tt:
            items.append({'subject':s['name'], 'topic':'General revision', 'weight':w})
        else:
            for t in tt:
                items.append({'subject':s['name'], 'topic':t, 'weight':w})
    items.sort(key=lambda i: (-i['weight'], i['subject']))
    return items

# ---- Pass 2: distribute sessions across days -------------------------------
def plan_week(ledger):
    days   = [[] for _ in range(7)]
    d_min  = [0]*7
    d_deep = [0]*7
    d_subj_deep = [{} for _ in range(7)]

    def fits(d, type_, dur, subject):
        if d < 0 or d > 6: return False
        if d_min[d] + dur > DAY_CAP_STUDY: return False
        if type_ == 'deep':
            if d_deep[d] >= MAX_DEEP_PER_DAY: return False
            if d_subj_deep[d].get(subject, 0) >= 1: return False
        return True

    def place(d, ev):
        days[d].append(ev)
        d_min[d] += ev['dur']
        if ev['type'] == 'deep':
            d_deep[d] += 1
            d_subj_deep[d][ev['subject']] = d_subj_deep[d].get(ev['subject'], 0) + 1
        return d

    # PASS A — DW for every topic
    for t in ledger:
        placed = -1
        for d in range(7):
            if fits(d, 'deep', DEEP_MIN, t['subject']):
                placed = place(d, {'type':'deep','subject':t['subject'],'topic':t['topic'],'dur':DEEP_MIN}); break
        if placed < 0:
            for d in range(7):
                if d_min[d] + DEEP_MIN <= DAY_CAP_STUDY and d_deep[d] < MAX_DEEP_PER_DAY:
                    placed = place(d, {'type':'deep','subject':t['subject'],'topic':t['topic'],'dur':DEEP_MIN}); break
        if placed < 0:
            placed = place(min(range(7), key=lambda d: d_min[d]),
                           {'type':'deep','subject':t['subject'],'topic':t['topic'],'dur':DEEP_MIN})
        t['dwDay'] = placed

    # PASS B — AR on day d+1
    for t in ledger:
        for off in (1,2,3):
            d = t['dwDay'] + off
            if d > 6: break
            if d_min[d] + RECALL_MIN <= DAY_CAP_STUDY:
                place(d, {'type':'recall','subject':t['subject'],'topic':t['topic'],'dur':RECALL_MIN})
                t['arDay'] = d; break

    # PASS C — LR on day d+3 (preferring +3,+4,+5,+6,+2)
    for t in ledger:
        for off in (3,4,5,6,2):
            d = t['dwDay'] + off
            if d < 0 or d > 6: continue
            if d_min[d] + REVIEW_MIN <= DAY_CAP_STUDY:
                place(d, {'type':'review','subject':t['subject'],'topic':t['topic'],'dur':REVIEW_MIN})
                t['lrDay'] = d; break

    # PASS D — backfill light days
    for d in range(7):
        safety = 20
        while d_min[d] < MIN_DAILY_LOAD and safety > 0:
            safety -= 1
            subjs_here = {e['subject'] for e in days[d]}
            cand = next((t for t in ledger
                         if t.get('dwDay') is not None and t['dwDay'] <= d
                         and not any(e['topic']==t['topic'] and e['subject']==t['subject'] for e in days[d])
                         and t['subject'] not in subjs_here), None)
            if cand is None:
                cand = next((t for t in ledger
                             if t.get('dwDay') is not None and t['dwDay'] <= d
                             and not any(e['topic']==t['topic'] and e['subject']==t['subject'] for e in days[d])), None)
            if cand is None: break
            if d_min[d] + REVIEW_MIN > DAY_CAP_STUDY: break
            place(d, {'type':'review','subject':cand['subject'],'topic':cand['topic'],'dur':REVIEW_MIN})
    return days, d_min

# ---- Pass 3: place each day's events on a wake→sleep timeline --------------
def build_day_slots(day_index, planned, state):
    day_name = DAYS[day_index]
    wake  = to_min(state['wakeTime'])
    sleep = to_min(state['sleepTime'])
    bf    = to_min(state['breakfastTime'])
    lu    = to_min(state['lunchTime'])
    dn    = to_min(state['dinnerTime'])

    fixed = [
        {'startMin':bf, 'endMin':bf+MEAL_MIN, 'type':'break', 'label':'Breakfast', 'sub':'Fuel up'},
        {'startMin':lu, 'endMin':lu+MEAL_MIN, 'type':'lunch', 'label':'Lunch',     'sub':'Step away'},
        {'startMin':dn, 'endMin':dn+MEAL_MIN, 'type':'lunch', 'label':'Dinner',    'sub':'Rest'},
    ]
    for c in (state.get('commitments') or []):
        if c['day'] == day_name:
            fixed.append({'startMin':c['startMin'], 'endMin':c['endMin'], 'type':'fixed', 'label':c['label'], 'sub':''})
    fixed.sort(key=lambda f: f['startMin'])

    resolved = []
    for f in fixed:
        clash = next((r for r in resolved if f['startMin'] < r['endMin'] and f['endMin'] > r['startMin']), None)
        if not clash: resolved.append(f)

    queues = {'deep':[], 'recall':[], 'review':[]}
    for e in planned: queues[e['type']].append(e)

    cutoff = (sleep if sleep > wake else 1440) - 30

    slots = []
    cursor = wake
    last_subj = None
    streak = 0

    def pick(now, remaining):
        nonlocal streak
        # Morning: DW + AR only (no Light Review — that's reserved for evenings,
        # and otherwise spills into a 30-min pre-breakfast slot which looks wrong).
        # Afternoon: AR-led mix. Evening: LR only.
        if now < lu:        order = ['deep','recall']
        elif now < dn:      order = ['recall','deep','review']
        else:               order = ['review']
        for tt in order:
            q = queues[tt]
            if not q: continue
            dur = DEEP_MIN if tt=='deep' else (RECALL_MIN if tt=='recall' else REVIEW_MIN)
            if dur > remaining: continue
            must_differ = streak >= 2 and last_subj is not None
            idx = next((i for i,e in enumerate(q) if e['subject'] != last_subj), -1)
            if must_differ and idx < 0: continue
            if idx < 0: idx = 0
            return q.pop(idx)
        return None

    safety = 200
    while cursor < cutoff and safety > 0:
        safety -= 1
        inside = next((f for f in resolved if f['startMin'] <= cursor < f['endMin']), None)
        if inside:
            slots.append({'type':inside['type'], 'time':fmt(inside['startMin'], inside['endMin']),
                          'label':inside['label'], 'sub':inside['sub']})
            cursor = inside['endMin']; continue
        nxt = next((f for f in resolved if f['startMin'] >= cursor), None)
        limit = min(nxt['startMin'] if nxt else cutoff, cutoff)
        if limit <= cursor: cursor = limit; continue
        ev = pick(cursor, limit - cursor)
        if ev is None:
            if limit - cursor >= 15:
                slots.append({'type':'free', 'time':fmt(cursor, limit),
                              'label':'Break / Free Time', 'sub':'Rest, hydrate, move'})
            cursor = limit; continue
        slots.append({
            'type':ev['type'], 'time':fmt(cursor, cursor+ev['dur']),
            'label': ev['subject'] if ev['type']=='deep'
                     else f"Active Recall: {ev['subject']}" if ev['type']=='recall'
                     else f"Light Review: {ev['subject']}",
            'sub':ev['topic']
        })
        if ev['subject'] == last_subj: streak += 1
        else: streak = 1
        last_subj = ev['subject']
        cursor += ev['dur']

        nxt2 = next((f for f in resolved if f['startMin'] >= cursor), None)
        limit2 = min(nxt2['startMin'] if nxt2 else cutoff, cutoff)
        if limit2 - cursor >= BREAK_MIN + 15:
            slots.append({'type':'break', 'time':fmt(cursor, cursor+BREAK_MIN),
                          'label':'Short Break', 'sub':'Hydrate · move'})
            cursor += BREAK_MIN

    if not slots:
        slots.append({'type':'none','time':'','label':'No study slots','sub':'Check wake/sleep'})
    return slots

# ---- Top-level + verification ----------------------------------------------
def generate(state):
    ledger = build_ledger(state['subjects'])
    days, d_min = plan_week(ledger)
    week = []
    for i in range(7):
        week.append({'dayName':DAYS[i], 'slots':build_day_slots(i, days[i], state),
                     'planned':days[i], 'studyMin':d_min[i]})
    return week, ledger

state = {
    'wakeTime':'07:00', 'breakfastTime':'07:30', 'lunchTime':'12:00',
    'dinnerTime':'18:00', 'sleepTime':'23:00',
    'subjects': [
        {'name':'Maths',     'topics':'Differentiation|Integration|Vectors',           'priority':'medium', 'confidence':3},
        {'name':'Chemistry', 'topics':'Organic mechanisms|Electrochemistry',           'priority':'medium', 'confidence':3},
        {'name':'Biology',   'topics':'Cardiac cycle|Photosynthesis|Cell division',    'priority':'medium', 'confidence':3},
        {'name':'History',   'topics':'Causes of WWII|Cold War origins',               'priority':'medium', 'confidence':3},
    ],
    'commitments': []
}

week, ledger = generate(state)

print('\n=== TIMETABLE ===\n')
for day in week:
    print(f"{day['dayName']}   ({day['studyMin']} min study = {day['studyMin']/60:.1f} h)")
    for s in day['slots']:
        t = (s['time'] or '').ljust(13)
        tag = f"[{s['type']}]".ljust(10)
        line = f"   {t} {tag} {s['label']}"
        if s.get('sub'): line += f"  —  {s['sub']}"
        print(line)
    print()

print('=== VERIFICATION ===\n')

topics_seen = {}
for day in week:
    for ev in day['planned']:
        k = ev['subject'] + '|' + ev['topic']
        e = topics_seen.setdefault(k, {'subject':ev['subject'],'topic':ev['topic'],'dw':0,'ar':0,'lr':0})
        if ev['type']=='deep':   e['dw']+=1
        if ev['type']=='recall': e['ar']+=1
        if ev['type']=='review': e['lr']+=1

all_dw = all(e['dw'] >= 1 for e in topics_seen.values())
ar_count = sum(1 for e in topics_seen.values() if e['ar'] >= 1)
print(f"1. All {len(topics_seen)} topics have ≥1 Deep Work session: {'PASS' if all_dw else 'FAIL'}")
for k,e in topics_seen.items():
    if e['dw'] < 1: print(f"   MISSING DW: {k}")
print(f"2. Topics with ≥1 Active Recall: {ar_count}/{len(topics_seen)}  "
      f"({'PASS' if ar_count >= int(len(topics_seen)*0.7) else 'FAIL'})")

consec_ok = True
for day in week:
    work = [s for s in day['slots'] if s['type'] in ('deep','recall','review')]
    def subj(label):
        return label.replace('Active Recall: ','').replace('Light Review: ','')
    for i in range(2, len(work)):
        a,b,c = subj(work[i-2]['label']), subj(work[i-1]['label']), subj(work[i]['label'])
        if a == b == c:
            consec_ok = False
            print(f"   3+ consecutive {a} on {day['dayName']}")
print(f"3. No 3+ consecutive same-subject sessions: {'PASS' if consec_ok else 'FAIL'}")

all_days = all(any(s['type'] in ('deep','recall','review') for s in d['slots']) for d in week)
print(f"4. All 7 days have study sessions: {'PASS' if all_days else 'FAIL'}")
for d in week:
    if not any(s['type'] in ('deep','recall','review') for s in d['slots']):
        print(f"   Empty day: {d['dayName']}")

over = [d for d in week if d['studyMin'] > 540]
print(f"5. No day exceeds 9 h study: {'PASS' if not over else 'FAIL'}")
for d in over: print(f"   {d['dayName']} = {d['studyMin']/60:.1f}h")

print()
