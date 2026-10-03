# Round 4: the angle test (2 October 2026)

Five angles, each with its own headline, image, primary text and landing
headline, built from the September sales calls (23 real calls, mined on 2
October; the private report is `dashboard/data/sales-calls/pain-points-2026-10-02.md`,
never in the repo). The point of the round, in one line: **every ad since 13
August has carried the same primary text and the same headline, and the "fatigue"
was the conversion rate after the click collapsing as that one message
harvested its audience. A new angle reaches new people; a new photo does not.**

Images are in `final/` (six concepts x 1:1, 4:5, 9:16, 1.91:1), rendered by
`src/gen.py` from the approved studio stills. Proof figures are Waleed's own:
"on average, our students jump two grades in about 3 months" (the public line
since 6 September; he said "4 months" on 2 October, so if 4 is right change the
one word everywhere) and "96% of our students get their first-choice
university offer" (substantiation risk raised once in the round 3 pack).

## Settings shared by every ad

- Campaign: Leads objective, one campaign, one ad set PER ANGLE (see
  BUILD-SHEET.md for why), Advantage+ audience, UK, 18+ with Meta's parent
  skew left to the algorithm, Facebook and Instagram.
- Display link: alevelaccelerators.com. Button: Learn More.
- Description (all ads): 20 questions, 4 minutes, instant report.
- Destination: the DIRECT entry (skips the landing page, opens on the
  one-screen mini landing, then the student/parent choice, then question one).
  Each angle has its own `utm_content` so GA4 can split them, and angle 1 adds
  `h=medic` so its landing headline matches the ad.

Base URL (replace `ANGLE`):
`https://alevelaccelerators.com/revision-diagnostic/?for=parents&utm_source=facebook&utm_medium=paid-social&utm_campaign=r4-angles-2026-10&utm_content=ANGLE&start=1`

## Angle 1: Future medics (image a1-future-medics; Year 13 twin a1b-ucat)

Why: 15 of the 23 September callers were aiming at medicine or dentistry, 17
at healthcare. Nobody said they clicked because of the doctor image, but the
medical identity landed on every call. Naming the room should pull more of it.

- URL: base with `utm_content=a1-medic&h=medic`
- Headline A: Parents of future doctors: read this
- Headline B: Is their revision good enough for medicine?
- Primary text:

> Parents of future doctors: medicine wants A*AA, and the UCAT only gets your child to the door. The A-level grades decide whether it opens.
>
> I'm Dr Waleed Ahmad, an NHS doctor. Over 6 years I've worked with more than 1,000 A-level students, and most of the families I speak to are aiming at medicine, dentistry or healthcare. Nearly every one of them is working hard. The grade is still a B.
>
> Here's what I see on almost every call: the knowledge is there. What's missing is the system around it. Which topics to prioritise this week, how to stop forgetting Year 12 while learning Year 13, and how to write the answer the way the mark scheme wants, because "I knew it, I wrote it, they didn't give me the mark" is the most common sentence I hear.
>
> On average, our students jump two grades in about 3 months, and 96% of our students get their first-choice university offer.
>
> If your child is aiming at medicine and the grades aren't where the application needs them yet, start with my free Revision Diagnostic: 20 questions about how they actually revise, about 4 minutes, and an instant report showing exactly where the marks are leaking and what I'd change first.
>
> Tap Learn More. Then, if you want, I'll build the plan with you on a free call.

- Year 13 twin (image a1b-ucat, same URL with `utm_content=a1b-ucat`). Swap the first paragraph for:

> Weak UCAT? Then every A-level grade now has to carry the application, and there are about seven months to move them.

## Angle 2: The mark scheme (image a2-mark-scheme)

Why: the most consistent student self-diagnosis, 16 of 23 calls unprompted.
Two students came asking for exactly this. Nobody else in the market says it.

- URL: base with `utm_content=a2-wording`
- Headline A: Knows it. Loses the mark anyway.
- Headline B: Right answer, wrong words, no mark
- Primary text:

> "Everything makes sense, but it's not word-specific, so they won't give her a mark."
>
> A parent said that to me last week, and I hear a version of it on almost every call. The child understands the topic. They write an answer that is correct in their own words. The examiner is looking for one word, "rate" or "specific" or "net", and it isn't there, so the mark goes.
>
> I'm Dr Waleed Ahmad, an NHS doctor who has worked with over 1,000 A-level students. When I ask them if anyone has ever taught them how a mark scheme actually works, almost every one says no. School teaches the content. Nobody teaches how the marks are given.
>
> That is the gap between a B and an A*, and it is fixable in weeks, not years. On average, our students jump two grades in about 3 months.
>
> My free Revision Diagnostic finds out whether this is your child's leak, or one of the four others: 20 questions about how they actually revise, about 4 minutes, instant report, and the first thing I'd change.
>
> Tap Learn More to find out where their marks are going.

## Angle 3: Working hard, grades not moving (image a3-working-hard)

Why: 11 calls raised it unprompted, 7 of them a parent describing a daughter.
This is the parent's own sentence, so the ad opens with it.

- URL: base with `utm_content=a3-hardwork`
- Headline A: Working hard. Grades not moving?
- Headline B: It's the method, not the effort
- Primary text:

> "She's working hard, she's studying, but not getting the marks. I don't understand."
>
> If that's your child, this is for you. I'm Dr Waleed Ahmad, an NHS doctor, and I've worked with over 1,000 A-level students. The hardworking ones are the ones I worry about most, because effort hides the problem: when the hours are going in, everyone assumes the method must be fine. It usually isn't.
>
> Rereading notes feels productive and keeps almost nothing. Highlighting is reading with a pen. Practising past papers without ever learning how the mark scheme scores them is practising the wrong thing. None of this is their fault. Nobody taught them a better way.
>
> When the method changes, the same hours produce a different grade. On average, our students jump two grades in about 3 months, and 96% of our students get their first-choice university offer.
>
> My free Revision Diagnostic shows you in about 4 minutes which part of their method is leaking marks: 20 questions, instant report, and what I'd change first.
>
> Tap Learn More and find out what's actually going on.

## Angle 4: Learns it fast, forgets it faster (image a4-forgets)

Why: 13 calls, 8 of them boys, nearly every Year 13. Parents of boys say "guide
him" and "he doesn't know what to prioritise"; boys say "lost" and "consistency".

- URL: base with `utm_content=a4-forgets`
- Headline A: Learns fast, forgets faster?
- Headline B: He needs a system, not more hours
- Primary text:

> "He learns quickly, but he forgets quickly as well."
>
> I'm Dr Waleed Ahmad, an NHS doctor who has worked with over 1,000 A-level students, and a parent said that to me last week about their Year 13 son. It is one of the most common things I hear, and it is not a memory problem. It is a system problem.
>
> A bright student who revises by rereading, learns a topic, feels confident, and three weeks later it's gone. Then Year 13 content arrives on top of Year 12 and he's "lost on what to study", so he does whatever feels most urgent, which is usually the wrong thing. No plan, no spaced review, no way of knowing what's actually stuck. More hours just means forgetting more things.
>
> The fix is structure: a weekly plan that tells him exactly what to do, built around retrieval instead of rereading, so what he learns stays learned. On average, our students jump two grades in about 3 months.
>
> My free Revision Diagnostic finds out in about 4 minutes where his revision is leaking: 20 questions, instant report, and the first thing I'd change.
>
> Tap Learn More. If he'd rather do it himself, send him the link; it works either way.

## Angle 5: If one-to-one tuition was the answer (image a5-tutor)

Why: 8 calls said tutoring didn't fix it ("it feels like just another school",
"they were uni students, not proper tutors", "it was only for the knowledge"),
and 5 families were paying for a tutor while on the call. This is also the
doctor-coach offer in Waleed's own framing.

- URL: base with `utm_content=a5-tutor`
- Headline A: Tutors teach content. This fixes the rest.
- Headline B: A doctor working with your child all month
- Primary text:

> If one-to-one tuition was the answer, every student with a tutor would be getting A*s. They aren't.
>
> I'm Dr Waleed Ahmad, an NHS doctor, and I've worked with over 1,000 A-level students. Many of them had a tutor before they came to me. The tutor was good. The grade still didn't move, because a tutor sits with your child for an hour or two a week and teaches content, and the grade is decided in the other 166 hours: what they revise, in what order, how they practise, and whether they can turn what they know into marks under exam conditions.
>
> That is what I do. I work directly with each student across the whole month on the whole system, not one subject for one hour, and the results are the proof: on average, our students jump two grades in about 3 months, and 96% of our students get their first-choice university offer.
>
> It starts with a free Revision Diagnostic: 20 questions about how your child actually revises, about 4 minutes, and an instant report showing where the marks are leaking. Then, if you want it, a free call where I build the plan with you.
>
> Tap Learn More and see what a tutor can't show you.

## Pairing table

| Angle | Image | Headline A (default) | Landing headline |
|---|---|---|---|
| 1 Future medics | a1-future-medics (Y13: a1b-ucat) | Parents of future doctors: read this | medic (`h=medic`) |
| 2 Mark scheme | a2-mark-scheme | Knows it. Loses the mark anyway. | default |
| 3 Working hard | a3-working-hard | Working hard. Grades not moving? | default |
| 4 Forgets | a4-forgets | Learns fast, forgets faster? | default |
| 5 Tutor | a5-tutor | Tutors teach content. This fixes the rest. | default |
| Control | Doctor pen (already live) | How to get an A* at A-levels in 4 minutes | default |

Headline B is the second-round swap for each angle: once an angle has spent
£25, duplicate its ad with headline B and let the two run side by side.

## Landing headlines (live on the site since 2 October)

The direct entry reads a `h` parameter:

- (none): Find out what's holding you back from A* grades in 4 minutes
- `h=medic`: Is your child's revision good enough for medicine? Find out in 4 minutes
- `h=stuck`: Find out why the grade is stuck, in 4 minutes

Run two at a time (default plus medic in round one). Every funnel event in GA4
carries `hero` so the two can be compared on starts and leads.

## Honesty checks

- Every quoted line is a real parent or student sentence from a September call,
  anonymised; none is invented.
- Proof stated in Waleed's order: the two-grade average, then the offers
  figure. No defensive lines, no "we can't promise".
- "A*AA" is the typical medicine offer; the ad does not promise it.
- No marketplace framing, no tutor-matching language, no prices.
- Headlines kept to about 40 characters so they do not truncate on mobile.

## Addendum, 3 October 2026: the fixed-creative version (Waleed's call)

Waleed's steer: hold the creatives to proven performers and let the MESSAGE be
the variable, rather than testing new images, headlines and bodies at once.
The four-ad set, each in its own ad set as before:

| Ad | Creative | Message |
|---|---|---|
| 1 | Original Doctor image (reuse from Ads Manager, untouched) | Working hard (angle 3) |
| 2 | Doctor pen image (reuse from Ads Manager, untouched) | Mark scheme (angle 2) |
| 3 | t1-tutor-pen (pen photo, tutor line on the card) | Tutor comparison (angle 5) |
| 4 | t2-tutor-original (original photo, tutor line on the card) | Tutor comparison (angle 5, SAME copy as ad 3) |

Ads 3 and 4 share identical copy, so they are a pure creative A/B; ads 1 to 3
compare messages on proven creatives. The paste-ready bodies with the tick and
cross lists were delivered in chat on 3 October; they are the angle bodies
with a ❌/✅ block added in the style of the August ad. t1/t2 renders are in
`final/` (four ratios each) from `src/gen-tutor-variants.py`; the pen photo is
the 600px Ad Library copy because the full-resolution unmasked pen original
was not in Waleed's Photos folder (IMG_1447.HEIC's primary frame is the masked
cannula shot), so swap in the original and re-render if he finds it.
