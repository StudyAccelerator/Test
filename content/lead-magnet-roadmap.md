# Lead magnet roadmap: from one diagnostic to a suite

Written 11 July 2026, alongside the launch of the Revision Diagnostic. This is the plan for the free tools that come next, in order, tied to the school year. Each one deepens the same funnel: free tool captures the email plus diagnostic data, the data routes the student (or parent) to the right paid programme, and every tool cross-links the others.

## Where we are now

Two live tools, one system:

- **Revision Diagnostic** (`/revision-diagnostic`), launched today. The qualifier. 20 questions, five system scores, a revision profile, an hours-leak estimate, a 7 day plan, and a programme recommendation with reasons. Captures 13 data points per student into MailerLite (group "Revision Diagnostic", the `diag_*` fields): year group, subjects, worry subject, current and target grade, weekly hours, wasted hours, profile, bottleneck, all five scores, and the route we recommended. This is the front door.
- **Revision Tracker** (`/revision-tracker`). The planner. Captures interest but tells us little about the person. Now cross-linked both ways with the diagnostic: the diagnostic's 7 day plan sends students to the tracker to build their week, and the tracker's results page sends students to the diagnostic to fix the method.
- **The follow-up sequence** (`content/email-sequences/revision-diagnostic/`). The diagnostic's back half: an instant report email plus five long-form emails over eleven days, in three variants branched on the student's `diag_route`, each teaching the fixes for that diagnosis and making the earned case for the one matching programme. Includes the MailerLite build guide and deliverability plan. Every later tool on this roadmap should plug into this same pattern: capture structured data, then follow up with a sequence keyed to it.

The rule for everything below: a new tool earns its place only if it either (a) captures a segment the diagnostic misses, (b) deepens the data on someone we already have, or (c) owns a seasonal moment.

## The suite, in build order

### 1. Results Day Rescue (ship by Tuesday 12 August)

- **What:** A calm, fast decision tool for the morning of results day (Thursday 14 August, then GCSE results the week after). The student enters what they got against what they needed, subject by subject, and it walks them to their actual options: firm choice confirmed, insurance, clearing, appeal or remark, resit, gap year. Output is a one-page action plan for the next 48 hours, in priority order, with the honest trade-offs of each route.
- **Why:** Results day is the single biggest brand moment of the year and the one day students and parents search in a panic. Nobody sells anything that morning; the brand that helps calmly wins the autumn.
- **Routes to:** resitters go to Subject Accelerators (September cohort starts the 6th), incoming Year 13s who scraped through AS content go to Study System or Subject Accelerators. But the CTA that morning is soft: the plan itself plus "book a free call when the dust settles".
- **Data captured:** results vs needed grades per subject, chosen route, resit intent. A resit-intent flag in July-August is the warmest Subject Accelerator lead that exists.
- **Effort:** medium. One to two sessions. No new engine needed, it is a decision tree plus the report shell we already have. The report visual style is already built.
- **Also:** have the content-studio posts pre-written (the seasonal calendar already says this).

### 2. Parent Diagnostic (ship late August, before school starts)

- **What:** The Revision Diagnostic's twin for the buyer. "Is your child revising effectively? 12 questions, 3 minutes." Parent answers about what they observe: hours, behaviours, mood, results pattern. Report is parent-framed: what is actually happening, what it costs, what to say and what not to say at the kitchen table, and which programme fixes it. Same engine, reworded questions and report, parent voice throughout (calm, doctor-led, reassuring).
- **Why:** Parents sign off the purchase and live on Facebook, and right now the only parent asset is the static guide on `/parents`. A diagnostic gives them something the guide cannot: their own child's specific picture. This is the highest-conversion tool on this list because it produces qualified, motivated buyers, not just users.
- **Routes to:** book a free call as the primary CTA (parents convert on calls), programme pages secondary.
- **Data captured:** child's year group and subjects, observed bottleneck, parent concern level, plus the same route field. Lands in its own MailerLite group so parent emails never mix with student emails.
- **Effort:** medium. The scoring engine, wizard, gate and report components are all reusable; the work is the copy and a handful of parent-specific questions.

### 3. Topic Audit (ship September to early October, Biology and Chemistry first)

- **What:** The diagnostic finds the broken system; the Topic Audit finds the broken topics. Student picks subject and exam board, gets the real specification topic list, rates each topic for closed-book confidence, and receives a priority matrix: the avoid-list ranked by mark weight, a first-fortnight attack order, and a one-click handoff of those topics into the Revision Tracker. The diagnostic's own 7 day plan already tells every student to "run the topic audit" by hand. This makes it a product.
- **Why:** This is the deepest qualification possible: topic-level weakness data per student. It is also the natural bridge into the Subject Accelerators ("you are weak in exactly the topics week 3 covers") and the perfect retargeting content (emails per weak topic).
- **Routes to:** Subject Accelerators for Biology and Chemistry (and Maths later), Study System when the audit shows shallow-everywhere rather than deep gaps.
- **Data captured:** subject, board, per-topic confidence, top three weakest topics as a field.
- **Effort:** large. The engine is simple but the content is real: accurate spec topic lists for AQA, Edexcel and OCR in two subjects to start. Waleed should sanity-check the topic lists; that is his home turf. Build Biology and Chemistry first to match the Accelerators, add Maths and Physics after.
- **Timing logic:** September and October is the predicted-grades anxiety window, and the September Accelerator cohort needs feeding.

### 4. Mock Result Debrief (ship early November, before mock season)

- **What:** Post-mortem tool for a mock result. Student enters the subject, the score, and where it went wrong question by question (ran out of time, blanked, wording, misread, never learned it). It classifies the lost marks into knowledge vs retrieval vs technique vs timing, produces the fix plan, and updates their diagnostic picture ("your Exam Craft score was 40 in July; your mock says it still is").
- **Why:** November to December is mock season, the second biggest anxiety spike of the year, and the moment parents decide on tutoring for the spring. A mock debrief is exactly the "diagnose before you treat" brand promise applied to real evidence.
- **Routes to:** Subject Accelerators (spring cohorts) and Study System.
- **Data captured:** mock grades per subject, loss classification, gap to target. Second data point over time per student, which is when the CRM starts showing trajectories.
- **Effort:** medium. Reuses the report shell and the exam-craft logic.

### 5. Diagnostic retakes and progress reports (January, exam season prep)

- **What:** Not a new tool, a loop. A retake invitation email each half term ("your last diagnostic said Method 31, see what six weeks changed"), a before-and-after view in the report, and a downloadable progress card. Add exam-countdown planning to the tracker at the same time (enter real exam dates, it reverse-plans the final term).
- **Why:** Retakes turn a one-shot lead magnet into a relationship, keep the list warm through the long revision grind, and generate the strongest possible marketing asset later: real, consented before-and-after system scores across a cohort (still not grade claims, so it stays inside the proof rules until August 2026 results data exists).
- **Effort:** small to medium, mostly email automations in MailerLite plus a compare view.

## What I deliberately left off

- **UCAT or admissions tools.** The MailerLite account shows old UCAT fields, but the brand is A-level performance now; an admissions sidetrack dilutes the diagnosis-to-programme story.
- **A generic "study tips quiz".** Fun, viral, and it qualifies nobody. Every tool above changes what we know or when we show up.
- **An AI chat tutor.** Wrong economics for a lead magnet, wrong brand promise (the brand is Waleed's method, no marketplace framing and no bot pretending to be him).

## How the suite compounds

Every tool writes to the same MailerLite contact: the diagnostic sets the baseline, the audit adds topic depth, the debrief adds trajectory, results day adds intent. By spring, a segment like "Year 13, Chemistry, Exam Craft bottleneck, resit-risk, parent engaged" is a filter, not a guess. That is what "the captured data needs to be useful later" looks like in practice: the email list becomes a diagnosis ledger, and every paid-programme launch gets sent to exactly the people whose reports already recommended it.

## Measurement (check monthly)

- Diagnostic completions vs starts (the wizard stores progress, so drop-off point is visible in analytics if we add events later; for now, group growth is the number).
- "Revision Diagnostic" MailerLite group size, split by `diag_route`.
- Free-call bookings that mention the report (ask on the call, tag in MailerLite).
- Summer Accelerator and Subject Accelerator enrolments arriving with a diagnostic on file.
