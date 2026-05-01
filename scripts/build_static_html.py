#!/usr/bin/env python3
"""
Generate the standalone revision-tracker.html files from app/revision-tracker/page.tsx.
The Next.js page is the canonical source; this just mirrors its CSS+JS into
two static HTML copies (root + /public) so they stay in sync.
"""
import re, pathlib

ROOT = pathlib.Path(__file__).parent.parent
src  = (ROOT / 'app/revision-tracker/page.tsx').read_text()

def extract(name):
    # Match: const <name> = `...`  (greedy until matching closing backtick on its own line)
    m = re.search(r"const\s+" + name + r"\s*=\s*`(.*?)`\n", src, re.S)
    if not m:
        raise SystemExit(f'could not extract {name}')
    return m.group(1)

css = extract('css')
js  = extract('js')

html = f'''<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Revision Tracker — A-Level Accelerators</title>
<link rel="icon" href="/favicon.png">
<style>{css}</style>
</head>
<body>

<header style="background:var(--cream);border-bottom:1px solid var(--cream-dark);padding:0.7rem 1.2rem">
  <a href="/" style="display:inline-block">
    <img src="/logo-header.png" alt="A-Level Accelerators" style="height:38px;width:auto;display:block">
  </a>
</header>

<div class="container">

  <section id="questionnaire-section">
    <div class="intro">
      <strong>How this works</strong>
      Tell us your subjects, the topics you want to prioritise this week, your confidence in each, and anything fixed in your schedule. We'll build a timetable with 90-minute deep-work blocks with your hardest material scheduled at your peak energy times.
    </div>

    <div class="card">
      <div class="card-num">1</div>
      <h2 class="card-title">About You</h2>
      <p class="card-subtitle">Just the basics. Used to shape your day.</p>
      <label for="student-name">First name (optional)</label>
      <input type="text" id="student-name" placeholder="e.g. Aisha" maxlength="30">
      <label for="wake-time">Wake-up time</label>
      <input type="time" id="wake-time" value="07:00">
      <label for="breakfast-time">Breakfast time</label>
      <input type="time" id="breakfast-time" value="07:30">
      <label for="lunch-time">Lunch time</label>
      <input type="time" id="lunch-time" value="12:00">
      <label for="dinner-time">Dinner time</label>
      <input type="time" id="dinner-time" value="18:00">
      <label for="sleep-time">Sleep time (target bedtime)</label>
      <input type="time" id="sleep-time" value="23:00">
      <div id="sleep-time-error" class="sleep-error"></div>
      <div class="info-line">Sleep is part of the system. Your wake time and sleep time must be at least <strong>8 hours apart</strong>. This is non-negotiable and ensures you're getting the rest you need to perform at your best.</div>
    </div>

    <div class="card">
      <div class="card-num">1b</div>
      <h2 class="card-title">School This Week</h2>
      <p class="card-subtitle">Do you have school this week? If yes, select which days and the hours (including commuting).</p>
      <label style="margin-bottom:0.5rem">
        <input type="checkbox" id="has-school" style="margin-right:0.5rem">
        <span style="font-size:0.9rem">I have school this week</span>
      </label>
      <div id="school-section" style="display:none">
        <p style="font-size:0.85rem;color:var(--muted);margin-bottom:0.8rem">Select which days you have school and enter your hours (include commuting time):</p>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(120px,1fr));gap:0.6rem;margin-bottom:1rem">
          <label style="display:flex;align-items:center;margin-bottom:0;font-size:0.9rem"><input type="checkbox" class="school-day" value="Monday" style="margin-right:0.4rem">Monday</label>
          <label style="display:flex;align-items:center;margin-bottom:0;font-size:0.9rem"><input type="checkbox" class="school-day" value="Tuesday" style="margin-right:0.4rem">Tuesday</label>
          <label style="display:flex;align-items:center;margin-bottom:0;font-size:0.9rem"><input type="checkbox" class="school-day" value="Wednesday" style="margin-right:0.4rem">Wednesday</label>
          <label style="display:flex;align-items:center;margin-bottom:0;font-size:0.9rem"><input type="checkbox" class="school-day" value="Thursday" style="margin-right:0.4rem">Thursday</label>
          <label style="display:flex;align-items:center;margin-bottom:0;font-size:0.9rem"><input type="checkbox" class="school-day" value="Friday" style="margin-right:0.4rem">Friday</label>
        </div>
        <div class="two-col">
          <div><label for="school-start">School start time</label><input type="time" id="school-start" value="08:30"></div>
          <div><label for="school-end">School end time (+ commute)</label><input type="time" id="school-end" value="16:00"></div>
        </div>
      </div>
    </div>

    <div class="card">
      <div class="card-num">2</div>
      <h2 class="card-title">Your Subjects</h2>
      <p class="card-subtitle">Add each A-Level. Rate your confidence honestly — this decides when each subject gets scheduled.</p>
      <div id="subjects-list"></div>
      <button type="button" class="add-btn" id="add-subject-btn">+ Add Subject</button>
    </div>

    <div class="card">
      <div class="card-num">3</div>
      <h2 class="card-title">Fixed Commitments</h2>
      <p class="card-subtitle">Anything you can't move — school, job, sport, family, rest. These get blocked out automatically.</p>
      <div id="commitments-list"></div>
      <button type="button" class="add-btn" id="add-commit-btn">+ Add Commitment</button>
    </div>

    <button type="button" class="generate-btn" id="generate-btn">Generate My Revision Plan →</button>
  </section>

  <section id="timetable-section">
    <div class="tt-header">
      <img id="pdf-logo" src="/logo-header.png" alt="A-Level Accelerators" crossorigin="anonymous">
      <div class="badge">Your Personal Plan</div>
      <h2 id="tt-heading">Your Week</h2>
      <p>Deep Work · Active Recall · Light Review · Breaks</p>
    </div>

    <div class="week-wrap">
      <div class="week-grid" id="week-grid"></div>
    </div>

    <div class="legend-wrap">
      <div class="legend">
        <div class="legend-item"><span class="legend-dot" style="background:#1E40AF"></span><span><strong>Deep Work</strong> — new material, full focus (90 min)</span></div>
        <div class="legend-item"><span class="legend-dot" style="background:#15803D"></span><span><strong>Active Recall</strong> — test yourself: past papers, blurting, Anki (45 min)</span></div>
        <div class="legend-item"><span class="legend-dot" style="background:#B45309"></span><span><strong>Light Revision</strong> — quick revisit, consolidate notes (30 min)</span></div>
        <div class="legend-item"><span class="legend-dot" style="background:#E8D9BF"></span> Break / Meal</div>
        <div class="legend-item"><span class="legend-dot" style="background:#A0A0B8"></span> Fixed Commitment</div>
        <div class="legend-item"><span class="legend-dot" style="background:#f5f5f5;border:1px dashed #ddd"></span> Free / Buffer</div>
      </div>
    </div>

    <div class="tips">
      <strong>How to use this plan</strong>
      Deep Work slots are for your hardest, highest-priority topics. Phone in another room, no distractions. Active Recall slots are for past papers, blurting, and Anki. Light Revision is for consolidating notes. Always take your breaks as they're part of the system, not a reward.
    </div>

    <div class="action-row">
      <button type="button" class="btn-outline" id="edit-btn">← Edit My Answers</button>
      <button type="button" class="btn-solid" id="print-btn">Download as Image</button>
    </div>
    <div class="tips" style="margin-top:1rem;background:var(--cream);color:var(--text);border-left:4px solid var(--gold)">
      <strong style="color:var(--gold)">Tip:</strong> After saving, you can open the PDF and print it to stick on your wall — that's the most effective way to use this plan. Print it out and put it somewhere you'll see it every day!
    </div>
  </section>

</div>

<script>{js}</script>

</body>
</html>
'''

(ROOT / 'revision-tracker.html').write_text(html)
(ROOT / 'public/revision-tracker.html').write_text(html)
print(f'wrote revision-tracker.html ({len(html)} bytes)')
print(f'wrote public/revision-tracker.html ({len(html)} bytes)')
