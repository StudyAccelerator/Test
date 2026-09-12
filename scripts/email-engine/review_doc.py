#!/usr/bin/env python3
"""Build the Word review pack for an outside reviewer: business summary, the task brief,
the automation map, and the full text of every distinct email in the engine.

Usage (needs python-docx):  python3 scripts/email-engine/review_doc.py <out.docx>
Reads scripts/email-engine/manifest.json and the markdown in content/email-sequences/,
so it stays current: edit the copy, re-run this, and the pack matches the repo.
Email numbering matches the order a subscriber receives them; shared emails print once.
Written 12 September 2026 to hand the 89 emails to a reviewer before switch-on."""
import json, re, sys, pathlib
sys.path.insert(0, str(pathlib.Path(__file__).resolve().parent))
import engine
from docx import Document
from docx.shared import Pt, RGBColor, Inches
from docx.enum.text import WD_ALIGN_PARAGRAPH, WD_BREAK
from docx.enum.style import WD_STYLE_TYPE

ROOT = pathlib.Path(__file__).resolve().parents[2]
PURPLE = RGBColor(0x2E, 0x25, 0x57)
GOLD = RGBColor(0xA8, 0x82, 0x3C)
GREY = RGBColor(0x66, 0x66, 0x66)

SAMPLE = {
    'name': 'Sam', 'diag_child_name': 'Maya', 'diag_archetype': 'The Perfectionist',
    'diag_bottleneck': 'Exam Craft', 'diag_hours_per_week': '12', 'diag_low_yield_hours': '7',
    'diag_scores': 'Method 6, Retention 5, Exam Craft 3, Targeting 7, Consistency 6',
    'diag_route': 'Subject Accelerator', 'diag_worry_subject': 'Chemistry',
    'diag_current_grade': 'C', 'diag_target_grade': 'A', 'diag_call_time': 'this evening',
}

POLISH = [
    (r'the Ian Stanley six hour follow-up', 'the six hour follow-up'),
    (r' \(the one every sequence should carry, per the playbook\)', ' (every sequence carries one)'),
    (r"Waleed's own E0 \(12 September 2026\)", "Waleed's own student report email"),
    (r'the topic they blurted after Y1', 'the topic they blurted after the previous email'),
    (r'the PY1 dinner question', 'the dinner question from the previous email'),
    (r"protect the engine's input quality\.", 'protect the quality of the ratings the tracker is built from.'),
    (r'the door email', 'the decision email'),
    (r'hand off to the daily email', 'hand over to the regular daily emails'),
    (r'hand off to the weekly email', 'hand over to the regular emails'),
    (r'\bDeposit with', 'Builds goodwill, with'),
    (r'\bDeposit;', 'Builds goodwill;'),
    (r'Replies build deliverability and', 'Replies help the emails keep landing in the inbox, and they'),
    (r'^the door\.', 'the decision email.'),
]

def polish(t):
    for pat, rep in POLISH:
        t = re.sub(pat, rep, t)
    return t[0].upper() + t[1:] if t else t

def sub(t):
    t = re.sub(r"\{\$(\w+)\|default\('([^']*)'\)\}", lambda m: SAMPLE.get(m.group(1), m.group(2)), t)
    return re.sub(r"\{\$(\w+)\}", lambda m: SAMPLE.get(m.group(1), '{$' + m.group(1) + '}'), t)

ORDER = ['diag-e0', 'diag-6h', 'diag-subject', 'diag-system', 'parent-p0', 'parent-6h',
         'parent-subject', 'parent-system', 'tracker', 'parent-guide', 'sunday-welcome',
         'callback', 'call-booked', 'programme-interest']

AUTO = {
'diag-e0': dict(title='Revision Diagnostic: the instant report (STUDENTS)', short='Student instant report',
  who='A student, normally Year 12 or 13, who has just finished the free 20 question Revision Diagnostic on the website and chosen "I am the student" at the start. They are self-motivated enough to have measured their own revision, which is rare, and they have just read a report telling them exactly where their study hours are leaking.',
  join='Automatically, the moment they submit the diagnostic. The website adds them to the MailerLite group "Revision Diagnostic".',
  aim='Deliver the report AND sell the free Academic Strategy Call as the reward for taking control of their grades. This email was written by Waleed himself.'),
'diag-6h': dict(title='Revision Diagnostic: 6 hour follow-up (STUDENTS)', short='Student 6 hour follow-up',
  who='The same student as above, six hours later. They have had time to read the report and the first excitement has worn off.',
  join='Same group as the instant report, on a six hour delay.',
  aim='One short nudge while the report is still fresh. The single call to action is booking the free Academic Strategy Call.'),
'diag-subject': dict(title='Diagnostic follow-up: SUBJECT ACCELERATOR route (students)', short='Student Subject route',
  who='A student whose diagnostic result pointed at EXAM SKILLS rather than knowledge: they broadly know the content but lose marks on wording, timing and misreading questions. Usually in Biology, Chemistry or Maths.',
  join='Automatically alongside the instant report. The website scores the diagnostic and adds them to "Diagnostic Route: Subject Accelerator".',
  aim='Fourteen days, one email a day, teaching the exam skills fix in full and earning the sale of the Subject Accelerator (£339 a subject) or a free call along the way.'),
'diag-system': dict(title='Diagnostic follow-up: STUDY SYSTEM route (students)', short='Student Study System route',
  who='A student whose diagnostic result pointed at the METHOD itself: they revise by re-reading and note-making, topics fade, and the problem shows up across every subject rather than one.',
  join='Automatically alongside the instant report, into "Diagnostic Route: Study System".',
  aim='Fourteen days, one email a day, teaching the complete revision method and earning the sale of the Top 1% Study System (£119 or £499) or a free call.'),
'parent-p0': dict(title='Revision Diagnostic: the instant report (PARENTS)', short='Parent instant report',
  who='A parent, typically 40 to 55, who filled in the diagnostic ABOUT their child after choosing "I am a parent". They are the buyer. They are usually worried, often already paying for a tutor, and they have just been told the problem is not effort or ability.',
  join='Automatically on submitting the parent path, into "Revision Diagnostic Parents". Parents never receive the student emails.',
  aim='The parent twin of Waleed\'s own student email: deliver the child\'s report and sell the free Academic Strategy Call.'),
'parent-6h': dict(title='Revision Diagnostic: 6 hour follow-up (PARENTS)', short='Parent 6 hour follow-up',
  who='The same parent, six hours later.',
  join='Same group, six hour delay.',
  aim='One short nudge, one call to action: book the free Academic Strategy Call.'),
'parent-subject': dict(title='Diagnostic follow-up: SUBJECT ACCELERATOR route (parents)', short='Parent Subject route',
  who='A parent whose child\'s diagnosis pointed at exam skills. They tend to say things like "the school says she is capable, so why are the grades like this?"',
  join='Automatically alongside the parent report, into "Diag Parents Subject Route".',
  aim='Fourteen days, one email a day: explain the diagnosis in plain English, arm the conversation at home, and earn the sale of the Subject Accelerator or the free call.'),
'parent-system': dict(title='Diagnostic follow-up: STUDY SYSTEM route (parents)', short='Parent System route',
  who='A parent whose child\'s diagnosis pointed at the method. These families have often tried tutoring already and watched nothing change.',
  join='Automatically alongside the parent report, into "Diag Parents System Route".',
  aim='Fourteen days, one email a day, building the case for fixing the method (Study System, £119 or £499) or the free call.'),
'tracker': dict(title='Revision Tracker users', short='Revision Tracker',
  who='A student who used the free Revision Tracker: they listed their topics, rated each one Struggling, Shaky or Solid, gave their real weekly availability, and got a full study timetable built for them. They are organised but may not know their revision method is the problem.',
  join='Automatically when they sign up inside the tracker, into "Revision Tracker Users".',
  aim='Fifteen days, one email a day, teaching them how to run each session type properly, bridging them to the diagnostic, and offering the free call.'),
'parent-guide': dict(title='Parents\' Guide downloads', short='Parents\' Guide',
  who='A parent who downloaded the free A-Level Parents\' Guide PDF from the /parents page. Cooler than a diagnostic parent, because they have given no information about their child yet.',
  join='Automatically on the download form, into "Parent Leads".',
  aim='Fifteen days, one email a day, warming them up, bridging them to the parent diagnostic, and offering the free call.'),
'sunday-welcome': dict(title='The Sunday Session newsletter signup', short='Sunday Session welcome',
  who='Anyone, usually a student, who signed up to the weekly newsletter without taking any of the tools.',
  join='Automatically from the newsletter form, into "Sunday Session".',
  aim='Two emails: welcome them and set the weekly ritual, then bridge them to the free diagnostic.'),
'callback': dict(title='Callback requested', short='Callback requested',
  who='A student or parent who tapped the callback card inside their diagnostic report, asking Dr Waleed to ring them. The warmest lead in the whole system.',
  join='Automatically, into "Callback requested". It also pushes an alert to Waleed\'s phone within a second.',
  aim='Confirm the request instantly so they are not left in silence, and convert phone tag into a booked slot if calls keep missing.'),
'call-booked': dict(title='Call booked', short='Call booked',
  who='Anyone who has booked an Academic Strategy Call with Waleed.',
  join='MANUALLY. Zoom Scheduler does not talk to MailerLite, so Waleed ticks them into "Call booked" when a booking lands.',
  aim='Raise the show-up rate with a two minute prep email, then anchor the plan afterwards or recover a no-show.'),
'programme-interest': dict(title='Programme interest', short='Programme interest',
  who='Anyone, student or parent, who has asked about the paid programmes in a DM, a reply, or on a call.',
  join='MANUALLY. Waleed ticks them into "Programme interest".',
  aim='Seven days, one email a day, answering everything a buyer needs and closing on either the programme page or the free call.'),
}

doc = Document()
st = doc.styles['Normal']
st.font.name = 'Calibri'
st.font.size = Pt(11)
st.paragraph_format.space_after = Pt(8)
for nm, sz in (('Heading 1', 20), ('Heading 2', 15), ('Heading 3', 12.5)):
    h = doc.styles[nm]
    h.font.name = 'Calibri'
    h.font.size = Pt(sz)
    h.font.color.rgb = PURPLE
    h.font.bold = True

def para(text='', bold=False, italic=False, size=None, colour=None, space=8, indent=0):
    p = doc.add_paragraph()
    p.paragraph_format.space_after = Pt(space)
    if indent:
        p.paragraph_format.left_indent = Inches(indent)
    add_rich(p, text, bold=bold, italic=italic, size=size, colour=colour)
    return p

def add_rich(p, text, bold=False, italic=False, size=None, colour=None):
    for i, chunk in enumerate(re.split(r'\*\*(.+?)\*\*', text, flags=re.S)):
        if not chunk:
            continue
        r = p.add_run(chunk)
        r.bold = bold or (i % 2 == 1)
        r.italic = italic
        if size:
            r.font.size = Pt(size)
        if colour:
            r.font.color.rgb = colour
    return p

def meta(label, text):
    p = doc.add_paragraph()
    p.paragraph_format.space_after = Pt(3)
    r = p.add_run(label + ' ')
    r.bold = True
    r.font.size = Pt(9.5)
    r.font.color.rgb = GOLD
    r2 = p.add_run(text)
    r2.font.size = Pt(9.5)
    r2.font.color.rgb = GREY
    return p

def rule():
    p = doc.add_paragraph()
    p.paragraph_format.space_after = Pt(10)
    r = p.add_run('_' * 68)
    r.font.color.rgb = RGBColor(0xCC, 0xC4, 0xB4)
    r.font.size = Pt(8)

def body_blocks(md):
    for block in re.split(r'\n\s*\n', md.strip()):
        b = block.strip()
        if not b:
            continue
        m = re.match(r'^\[BUTTON: (.+?) -> (\S+?)\]$', b)
        if m:
            p = doc.add_paragraph()
            p.paragraph_format.space_after = Pt(10)
            p.paragraph_format.left_indent = Inches(0.25)
            r = p.add_run('[ ' + m.group(1) + ' ]')
            r.bold = True
            r.font.color.rgb = PURPLE
            r2 = p.add_run('   ' + m.group(2).rstrip(']'))
            r2.font.size = Pt(8.5)
            r2.font.color.rgb = GREY
            continue
        m = re.match(r'^\[LINK: (.+?) -> (\S+?)\]$', b)
        if m:
            p = doc.add_paragraph()
            p.paragraph_format.space_after = Pt(10)
            r = p.add_run(m.group(1))
            r.bold = True
            r.font.color.rgb = PURPLE
            r2 = p.add_run('   ' + m.group(2).rstrip(']'))
            r2.font.size = Pt(8.5)
            r2.font.color.rgb = GREY
            continue
        if b.startswith('[BOX START'):
            lines = [l for l in b.split('\n')[1:] if not l.startswith('[BOX END')]
            p = doc.add_paragraph()
            p.paragraph_format.left_indent = Inches(0.3)
            p.paragraph_format.space_after = Pt(10)
            r = p.add_run('FROM YOUR REPORT\n')
            r.bold = True
            r.font.size = Pt(9)
            r.font.color.rgb = GOLD
            r2 = p.add_run('\n'.join(l for l in lines if l.strip()))
            r2.font.size = Pt(10)
            r2.font.name = 'Consolas'
            continue
        p = doc.add_paragraph()
        p.paragraph_format.space_after = Pt(8)
        add_rich(p, b.replace('\n', '\n'))

# ---------------------------------------------------------------- cover
t = doc.add_paragraph()
t.paragraph_format.space_after = Pt(4)
r = t.add_run('A-Level Accelerators')
r.bold = True
r.font.size = Pt(12)
r.font.color.rgb = GOLD
h = doc.add_paragraph()
h.paragraph_format.space_after = Pt(6)
r = h.add_run('The email engine: 89 emails for review')
r.bold = True
r.font.size = Pt(26)
r.font.color.rgb = PURPLE
para('Fourteen automated email sequences, 103 scheduled sends, 89 distinct emails. '
     'Nothing is switched on: every email in this document is waiting for review before a single one reaches a real student or parent.',
     size=11.5)
meta('Prepared', '12 September 2026, for review before launch')
meta('Reviewer task', 'See page 2. In short: read all 89, make them convert, make them sound human and warm.')
doc.add_paragraph().add_run().add_break(WD_BREAK.PAGE)

manifest = engine.load_manifest()
by = {a['key']: a for a in manifest['automations']}

# ---------------------------------------------------------------- part 1
doc.add_heading('Part 1  ·  What this is, and who it goes to', 1)

doc.add_heading('The business', 2)
para('A-Level Accelerators is a UK A-level tuition company founded by **Dr Waleed Ahmad (MBBS)**, an NHS '
     'foundation-year doctor and former top-performing A-level student. He has worked with over 1,000 A-level '
     'students across six years. His whole positioning rests on one idea: schools teach you WHAT to learn, but '
     'nobody teaches you HOW to perform in an exam, and that is a trainable skill.')
para('**What is sold:**')
para('• **Subject Accelerators** (Biology, Chemistry or Maths). Twelve weeks of live weekend group sessions built '
     'on real exam questions and mark schemes. £339 for one subject, £629 for two, £849 for three.', indent=0.2, space=4)
para('• **The Top 1% Study System.** The revision method itself. Study Series £119 (four live sessions, taught), '
     'Study Accelerator £499 (twelve sessions plus weekly accountability).', indent=0.2, space=4)
para('• Everything carries a **satisfaction guarantee**: join the first session, and if you are not completely '
     'satisfied you get your money back, no questions asked.', indent=0.2)
para('**What is free** (and is what brings people in): the Revision Diagnostic, the Revision Tracker, the Parents\' '
     'Guide PDF, and a weekly newsletter called The Sunday Session.')

doc.add_heading('The one thing every email is trying to do', 2)
para('Get the reader onto a **free 30 minute Academic Strategy Call with Dr Waleed.** On that call he goes through '
     'their result, tells them what is holding them back, and builds a personalised revision plan with them. It is '
     'genuinely free and genuinely useful, and it is also where the programmes get sold. It is offered as a reward '
     'for taking action rather than as a sales call.')
para('Secondary actions, in order of value: replying to the email (which Waleed answers personally), clicking '
     'through to a programme page, and doing the small task the email sets for that evening.')

doc.add_heading('What a "subscriber" is, and how they end up in a sequence', 2)
para('A subscriber is simply someone who has given their email address on the website, always in exchange for '
     'something free. Every subscriber sits in one or more **groups** in MailerLite (the email platform). '
     '**Joining a group is what triggers an automation.** That is the whole mechanism: no group, no emails.')
para('Because the diagnostic sorts people by their result, two students who fill in the same form can land in '
     'completely different sequences. That is deliberate: the emails they get are the treatment for the problem '
     'they actually have.')
para('**What happens when a sequence ends.** Nobody falls off a cliff. When the fourteen days are up, the reader '
     'joins the ongoing list and hears from Waleed most days with one short, useful email. Several of the emails '
     'here promise exactly that, and it is true, so the promise should stay.')

doc.add_heading('What they actually fill in', 2)
para('**The Revision Diagnostic** is the main entry point and the source of most of the personalisation. Twenty '
     'questions, about five minutes. The very first choice is a fork: **"I am the student"** or **"I am a parent"**, '
     'and the parent version asks every question about their child instead.')
para('It asks: which subjects they take, their current and target grade in each, how many hours a week they study, '
     'what they actually do in those hours, how they check something has stuck, what happens to them in exams, '
     'whether they already have a tutor, and finally what they would most benefit from right now. At the end they '
     'give their name, email and phone number, and can pick a preferred time for a call. Parents also give their '
     'child\'s first name.')
para('**Out of it comes a report** containing: a named profile (one of seven, for example "The Perfectionist" or '
     '"The Crammer"), the biggest leak in their system (one of five: Method, Retention, Exam Craft, Targeting, '
     'Consistency), an estimate of how many of their weekly study hours are going into low-yield work, five scores, '
     'and a recommended route. **That recommended route decides which follow-up sequence they receive.**')
para('The other entry points are simpler. The **Revision Tracker** asks them to list their topics, rate each one '
     'Struggling, Shaky or Solid, and give their real availability, then builds them a weekly timetable. The '
     '**Parents\' Guide** and **The Sunday Session** just take a name and an email. **Callback requested** means '
     'they tapped a card on their report asking Waleed to ring them. **Call booked** and **Programme interest** are '
     'added by Waleed himself when someone books a call or asks about the programmes.')

doc.add_heading('Reading the emails in this document', 2)
para('**Personalisation is filled in with a sample lead** so the emails read naturally. Wherever you see these, '
     'the real email would show that reader\'s own data:')
para('Sam = the subscriber\'s first name  ·  Maya = their child\'s first name (parent emails)  ·  Chemistry = the '
     'subject they are most worried about  ·  C and A = their current and target grade  ·  The Perfectionist = '
     'their profile  ·  Exam Craft = their biggest leak  ·  12 hours a week, 7 of them low-yield.', indent=0.2)
para('**[ Text in square brackets ]** is a button in the real email, with its destination link beside it in grey.')
para('**Shared emails appear once.** A few emails are used in more than one sequence (Waleed\'s origin story, for '
     'example). They are printed at their first appearance and noted where else they run.')

doc.add_paragraph().add_run().add_break(WD_BREAK.PAGE)

# ---------------------------------------------------------------- part 2
doc.add_heading('Part 2  ·  The task', 1)
para('**Go through all 89 emails and make them as good as they can be on two axes at once: conversion, and voice.**')

doc.add_heading('1. Optimise for conversion', 2)
para('• Does the subject line earn the open? It should combine curiosity with a benefit, stay in sentence case, '
     'and be honest about what is inside.', indent=0.2, space=4)
para('• Does the first line earn the second? Most of these are read on a phone.', indent=0.2, space=4)
para('• Is there exactly **one** clear action, and is it obvious? One primary call to action per email, at the end. '
     'Anything secondary belongs in the PS as text, never as a second button.', indent=0.2, space=4)
para('• Is the value delivered before the ask? Every email should be worth reading even if the reader never buys.', indent=0.2, space=4)
para('• Is the reason to act now real? Urgency only ever comes from the actual calendar (a cohort date, the autumn '
     'term), never from invented scarcity or countdowns.', indent=0.2, space=4)
para('• Does the PS work hard? It is the second most-read line after the subject. It should restate the action and '
     'carry some personality.', indent=0.2)

doc.add_heading('2. Make it sound human, natural and warm', 2)
para('These emails are signed by a real doctor who answers every reply himself, so they have to sound like him '
     'rather than like marketing. The test for every sentence is simple: **would he say this out loud to a student '
     'or a parent?**')
para('What that means in practice:')
para('• Complete, connected sentences joined with and, but, so, because. Not punchy two-beat fragments '
     '("Reports are useful. Conversations are better.").', indent=0.2, space=4)
para('• Everyday words, contractions everywhere, British English. Around 12 words a sentence on average.', indent=0.2, space=4)
para('• Warm markers are welcome and deliberate: an exclamation mark, an occasional "haha", at most one smiley '
     'per email, "I promise", "to be honest", "bear with me".', indent=0.2, space=4)
para('• He is a full time doctor and that shows up honestly: shifts, on-call, nights, reading replies between '
     'patients. It is credibility and character in one line.', indent=0.2, space=4)
para('• **Confidence, never defensiveness.** No "no pitch", no "who should not join", no "I cannot show you '
     'results", no apologising for selling. Never name what the business does not offer.', indent=0.2, space=4)
para('• **No em dashes or en dashes anywhere.** Ranges are written "4 to 6 hours", never with a dash.', indent=0.2, space=4)
para('• Avoid AI-sounding vocabulary: delve, crucial, robust, landscape, leverage, moreover, furthermore, '
     'comprehensive, seamless, unlock, elevate, "not just X but Y".', indent=0.2)

doc.add_heading('3. Things that must not change', 2)
para('• **Emails 1 and 3, and their parent twins (emails 28 and 30), were written by Waleed himself.** They are the '
     'voice benchmark for everything else. Please do not rewrite them. If anything, use them as the yardstick.', indent=0.2, space=4)
para('• **No invented numbers or results.** The only outcome claim used is "on average, our students jump two '
     'grades". The testimonial quotes are real students and must be quoted exactly.', indent=0.2, space=4)
para('• Prices, session times, the satisfaction guarantee and the free call are all real and must stay accurate: '
     '£339 / £629 / £849 for subjects, £119 / £499 for the Study System.', indent=0.2, space=4)
para('• The business never says "we match you with a tutor". Waleed and his specialists teach; it is his method.', indent=0.2)

doc.add_heading('How to give the feedback', 2)
para('Every email is numbered (1 to 89) and labelled with its sequence and the day it sends. Working directly in '
     'this document is ideal: rewrite in place, or comment. Where a whole email feels wrong rather than a line, '
     'say so and say why. Flagging anything that reads as generic marketing is exactly the kind of note that helps '
     'most.')
para('One live detail worth knowing: nine emails name the cohort start date **"Sunday 13th September"**, which is '
     'about to pass. Those dates will be replaced before launch, so there is no need to flag them.')

doc.add_paragraph().add_run().add_break(WD_BREAK.PAGE)

# ---------------------------------------------------------------- part 3: map
doc.add_heading('Part 3  ·  The fourteen automations at a glance', 1)
para('The numbers in brackets are the email numbers used in Part 4, where the full text of each one appears.')

n = 0
index = []
seen_files = {}
for i, key in enumerate(ORDER, 1):
    a = by[key]
    info = AUTO[key]
    emails = []
    day = 0
    hrs = 0
    for s in a['steps']:
        if 'delay_days' in s:
            day += s['delay_days']; continue
        if 'delay_hours' in s:
            hrs += s['delay_hours']; continue
        when = f'+{hrs} hours' if hrs else (f'day {day}' if day else 'instant')
        path = s['email']
        if path in seen_files:
            emails.append((when, seen_files[path], None, True))
            continue
        n += 1
        seen_files[path] = n
        m = engine.parse_email(path)
        emails.append((when, n, m, False))
    index.append((i, key, info, emails))

def collapse(nums):
    nums = sorted(set(nums))
    out, i = [], 0
    while i < len(nums):
        j = i
        while j + 1 < len(nums) and nums[j + 1] == nums[j] + 1:
            j += 1
        out.append(str(nums[i]) if j == i else f'{nums[i]} to {nums[j]}')
        i = j + 1
    return ', '.join(out)

for i, key, info, emails in index:
    doc.add_heading(f'{i}. {info["title"]}', 3)
    nums = [e[1] for e in emails]
    word = 'email' if len(emails) == 1 else 'emails'
    meta('Sends:', f'{len(emails)} ({word} {collapse(nums)})')
    meta('Who they are:', info['who'])
    meta('How they join:', info['join'])
    meta('What the sequence is for:', info['aim'])
    doc.add_paragraph().paragraph_format.space_after = Pt(2)

doc.add_paragraph().add_run().add_break(WD_BREAK.PAGE)

# ---------------------------------------------------------------- part 4: emails
doc.add_heading('Part 4  ·  The 89 emails', 1)
para('In the order a subscriber would receive them, sequence by sequence.')

for i, key, info, emails in index:
    doc.add_paragraph().add_run().add_break(WD_BREAK.PAGE)
    doc.add_heading(f'Sequence {i}  ·  {info["title"]}', 2)
    meta('Who is in it:', info['who'])
    meta('How they join:', info['join'])
    meta('Purpose:', info['aim'])
    rule()
    for when, num, m, shared in emails:
        if shared:
            p = doc.add_paragraph()
            p.paragraph_format.space_after = Pt(10)
            r = p.add_run(f'{when.upper()}  ·  see email {num}, which also runs in this sequence.')
            r.italic = True
            r.font.size = Pt(10)
            r.font.color.rgb = GREY
            continue
        hdr = (ROOT / m['path']).read_text().split('\n---\n')[0]
        goal = re.search(r'^Goal: (.+)$', hdr, re.M)
        src = re.search(r'^Source: (.+)$', hdr, re.M)
        also = [f'{AUTO[k]["short"]}' for j, k, inf, es in index
                for w, nn, mm, sh in es if nn == num and k != key]
        doc.add_heading(f'Email {num}  ·  {when}', 3)
        meta('Subject line:', sub(m['subject']))
        meta('Preheader:', sub(m['preheader']))
        if goal:
            meta('Purpose:', polish(goal.group(1)))
        if also:
            meta('Also sent in:', ', '.join(dict.fromkeys(also)))
        if src and 'WALEED' in src.group(1).upper():
            p = doc.add_paragraph()
            p.paragraph_format.space_after = Pt(6)
            r = p.add_run('WRITTEN BY WALEED HIMSELF. Please do not rewrite: this is the voice benchmark.')
            r.bold = True
            r.font.size = Pt(9.5)
            r.font.color.rgb = GOLD
        doc.add_paragraph().paragraph_format.space_after = Pt(2)
        body_blocks(sub(m['body']))
        p = doc.add_paragraph()
        p.paragraph_format.space_after = Pt(4)
        r = p.add_run('Dr Waleed Ahmad, MBBS  ·  Founder, A-Level Accelerators  [photo signature]')
        r.font.size = Pt(9)
        r.font.color.rgb = GREY
        rule()

out = sys.argv[1] if len(sys.argv) > 1 else '/tmp/emails.docx'
doc.save(out)
print('emails written:', n)
print('saved:', out)
