# Call-offer emails (added 15 August 2026, Waleed's instruction)

The nurture sequences never offered the free 30 minute call, which is Waleed's best
converter. These two emails fix that. Placement: in the E0 (student) and P0 (parent)
automations, ONE DAY after the instant report email, so every diagnostic taker gets it
regardless of route. Sender: Waleed@alevelaccelerators.com, from name "Dr Waleed Ahmad".

---

## STUDENT version (into "Revision Diagnostic: instant report email (E0)" automation, +1 day)

Subject A: want to talk your report through?
Subject B: your revision profile, out loud
Preheader: 30 minutes, free, no pitch. Bring the report.

Hi {$name},

Waleed here. You took my revision diagnostic yesterday, so by now you know your profile
and where your study hours are leaking.

A report is a good start. A conversation is better, because your subjects, your school
and your term dates change what I'd actually do first.

So here's the offer: I keep a few free 30 minute calls each week for students who've
taken the diagnostic. We go through your report together, I tell you what I'd change
first and why, and you leave with a plan for the next two weeks. That's it. No cost,
and I'm not going to spend the call selling to you.

If you want one, just reply to this email with the days that work and we'll sort a time.

Waleed

Dr Waleed Ahmad, MBBS
Founder, A-Level Accelerators

---

## PARENT version (into "Parent diagnostic: instant report email (P0)" automation, +1 day)

Subject A: happy to talk {$diag_child_name|default('your child')}'s report through
Subject B: the report, explained out loud
Preheader: A free 30 minute call with Dr Waleed. Bring your questions.

Hi {$name},

Waleed here. Yesterday you got {$diag_child_name|default('your child')}'s revision
diagnosis, and if you're anything like most parents I speak to, it named something
you'd already sensed but couldn't quite pin down.

Reports are useful. Conversations are better. Every family's situation is a little
different, and what I'd change first for {$diag_child_name|default('your child')}
depends on things no questionnaire fully captures.

So here's a standing offer: I keep a few free 30 minute calls each week for parents
whose children have taken the diagnostic. We go through the report together, I give
you my honest read as a doctor and a teacher, and you leave knowing exactly what to
do next, whether or not that ever involves my programmes.

If you'd like one, just reply to this email with a couple of days that suit and we'll
work out a time.

Best wishes,

Dr Waleed Ahmad
Founder of A-Level Accelerators
alevelaccelerators.com

---

## September repoints (same pass)

The summer-route sequences pitch the Summer Accelerator, whose final cohort starts
22 August. From 23 August those emails sell a course that has already started. The
fix applied to the two pitch emails (student "Revision Diagnostic: Summer Accelerator
route" email 2, parent PS2 "the summer decision"):

- Replace cohort-start urgency with September framing: the new school year is the
  reset moment, places in the September programmes (Subject Accelerators for Biology,
  Chemistry and Maths; Top 1% Study System for method) are limited, and the students
  who pull ahead are the ones who fix the system in week one, not after the first
  mock disappointment.
- Never state a cohort date that has passed. Link targets switch from
  /summer-accelerators/ to /subject-accelerators/ and /study-systems.

## Also in this pass

- Enable the dormant "Sunday Session: welcome (SS1)" automation so newsletter
  signups get their welcome immediately instead of silence until Sunday.
