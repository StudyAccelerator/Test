# A-Level Accelerators: the 16 July reaudit and the road to £1 million a year

Written 16 July 2026, three days after the full audit (`2026-07-13-business-audit-and-growth-plan.md`). This document does two jobs: it re-measures the whole business against live data pulled today, and it lays out a staged path from where you are to £1 million a year in revenue. It is written to be blunt, because that is what you asked for.

A visual version of this document exists as a private Claude artifact for reading on your phone. This file is the source of truth.

## 0. What this is based on

Every number traces to one of these, all pulled or read on 16 July 2026 unless dated otherwise:

- The live MailerLite account (subscribers, groups, campaigns, automations), pulled today.
- The live site, fetched page by page today, including raw HTML for the analytics and og:image checks.
- Ahrefs' free domain rating endpoint today (the paid API and the Search Console endpoints refused: "Insufficient plan").
- The repo at origin/main commit `a294e68`, including the Stripe account truth recorded 13 to 14 July (the connector is on your Mac, not in this remote session, so that snapshot is the latest verified revenue data).
- Companies House filings, read in full from the filed PDFs today: MyTutor, MyEdSpace, Up Learn, PMT Education, Justin Craig, Seneca, Save My Exams, Tailored Tutors, Explore Learning.

Where a plan needs a number that does not exist, it says so and asks you for it. Every calculation is labelled as arithmetic. There are no projections, no assumed conversion rates, and no invented figures anywhere in this document. This draft was then adversarially fact-checked by three independent review passes before you read it.

## 1. The verdict

**The 13 July audit said: the machine is built, turn it on. Three days later the machine is bigger and it is still off.**

Since that audit landed, 76 commits have shipped: six new blog articles (11 to 17), a 22-post content pack, a Facebook ads runbook with rendered creatives, a Reddit plan, Facebook groups research plus an own-group launch plan, the diagnostic's parent fork, seven newsletter issues loaded into MailerLite as complete drafts, and the HQ dashboard became a phone app. In any other month that build rate would be admirable. This month it is the problem itself: the audit you commissioned said the next win was a send button, and 76 commits later that button still has not been pressed.

The live account shows nothing has been sent since 6 May. Not the re-opening email. Not a Sunday Session (the welcome automation is switched off and SS1 sits unscheduled three days before its send date). Nothing is queued. The newest subscriber in the entire account joined 6 June. The last sale was 6 May, the same day as the last broadcast.

**The counters (pulled live today, except the two Stripe rows, recorded 13 to 14 July):**

| Counter | Value | Source |
| --- | --- | --- |
| Days since the last email broadcast | 71 (6 May) | MailerLite, live |
| Days since the last sale | 71 (6 May) | Stripe truth, recorded 13 to 14 July |
| Days since the last new lead | 40 (6 June) | MailerLite, live |
| Active subscribers | 444 (533 total: 444 active, 76 unsubscribed, 13 bounced) | MailerLite, live |
| Lifetime revenue, net of refunds, before fees | £5,573 (18 payments, 20 Feb to 6 May) | Stripe truth, recorded 13 to 14 July |
| Sales at any currently published price | 0 | Stripe truth |
| Domain Rating | 0 (unchanged) | Ahrefs free endpoint, today |

One real change since the 13 July audit deserves naming, because it is the first distribution act in ten weeks: you have been active in Facebook groups this week. The own-group roadmap (16 July) records, from inside your logged-in account, a conversation post in A-Level Tuition collecting likes within hours, a diagnostic-first comment in GCSE and A-Level UK tutoring, memberships dating back to 4 March, and a plan to open your own parents' group this weekend. That is the right direction. It is also, so far, the only channel moving, and no lead from it has yet reached MailerLite.

**The £1 million frame, stated honestly:** £1 million a year is about £2,740 every day of the year. It is about 180 times your verified lifetime revenue. Nobody should pretend that is a marketing tweak away. It is a different company, one this company can become in stages, and each stage has a gate you can only pass by selling, not by building. The rest of this document is those stages.

## 2. The execution scoreboard: 13 July plays versus 16 July reality

| Play (13 July) | What happened by 16 July | Verdict |
| --- | --- | --- |
| Play 1: cohort sprint (email the list, run the live event, fill the cohort) | Cohort moved to 8 August (window now 23 days, good). Zero broadcasts sent, none scheduled. SS1 loaded but not scheduled; its automation is off. The workshop was retired without a successor live event. | Not started where it counts |
| Play 2: results-week machine | Four results-window articles shipped, SSX results-morning draft loaded, Reddit AMA plan written around the r/alevel moderator relationship. No approvals, no dates set. | Assets grew, no decisions |
| Play 3: parent channel | Real movement: groups activity started, own-group launch planned, ads runbook and three creatives built, GA4 and Meta pixel verified live in production HTML. Legal pages drafted, then parked on your details (15 July), which blocks paid spend and leaves the live forms collecting minors' data with no privacy notice. | Best progress of the five, one serious catch |
| Play 4: partnerships | PMT dossier merged to main. The improved outreach email (v2 and v3 rewrites) is stranded on the partnership branch, unmerged. Nothing sent. | Stalled at the send button |
| Play 5: SEO (park or place) | Parked as recommended, except six more articles and six more twins were written anyway (17 and 17 now). DR still 0; zero twins placed; the pack still has no target list. | Parked, with scope creep |
| Hygiene batch | Done: og:image and both analytics IDs verified in the live HTML today; blog CTA default, title dedupe and British spelling verified in code. Still open: the MailerLite key in the client bundle, the parent delivery email's old Drive link, stale remote branches. | Executed well, three leftovers |

The pattern across all six rows is one sentence: **everything that could be finished at a keyboard got finished; everything that needed you to press send, set a date, or answer a number did not happen.** The bottleneck is not assets, energy or ideas. It is the approval gate, and you are the gate.

## 3. What is genuinely working (keep and feed these)

1. **The list.** 444 active subscribers. The 18 lifetime broadcasts with recorded stats opened at 46 to 84 percent. Every pound the business has ever made arrived while this list was being emailed. It is the single proven asset.
2. **The email plus live event mechanic.** All 18 payments landed between 20 February and 6 May, inside the workshop-and-follow-up cycles. The mechanic is proven; only the workshop product was retired. The mechanic needs a successor (call it an open evening, a masterclass, anything), and the diagnostic gives it a stronger hook than February had.
3. **The diagnostic.** Still the only assessment-style capture tool in the nine-competitor set, now with the student/parent fork and parent-voiced automations. The route groups hold two student records and one parent record, likely including your own test runs. It is a loaded weapon that has never been aimed at traffic.
4. **The content estate.** 17 articles, 17 backlink twins, a 22-post pack for this exact fortnight, 16 student and 13 parent sequence emails, 7 newsletter issues loaded as complete drafts. Months of distribution ammunition already written.
5. **The wiring.** GA4 and the Meta pixel verified in the live HTML today, lead events on all four capture forms, og:image live, clean funnel paths, 14 automations on. One known defect remains inside it: the parent nurture's first email still links the old Google Drive guide, not your PDF (fix written since 13 July, five minutes in MailerLite, still not applied).
6. **The Facebook beachhead.** Group memberships with real tenure (since 4 March), first posts performing, a ranked target list, an own-group plan for the results-day wave. This is the buyer-side channel the 13 July audit said was empty, starting to exist.
7. **The positioning.** An NHS doctor teaching diagnosis-first study systems, with a medicine-leaning audience gravity your own signup data proves. Nobody in the competitor set can copy it.
8. **The delivery design points the right way, but the bench is unverified.** Your summer page says specialist tutors teach the subject sessions and you teach the final ones. That design, tutors delivering while you own the method and the brand, is exactly the shape the £1 million evidence rewards. What the repo cannot show is whether the bench exists: no tutor names, costs or confirmations appear anywhere, and the cohort is 23 days out. Right design, unproven cast.

## 4. Where you are going wrong (ranked by cost)

1. **Ten weeks of silence to a warm list, through your best selling window.** The evidence could not be cleaner: the last sale happened the day of the last broadcast. Every day without a send is a day the only proven engine is off. Nothing else on this list matters until this changes.
2. **You are the bottleneck, and the queue is growing.** Seven newsletter issues, 22 pack posts, three ad creatives, one outreach email, all waiting on one person's yes. Building more assets makes this worse, not better: the queue lengthens while the gate stays shut. The fix is not working harder, it is a standing decision rhythm: one approval sitting per week that clears the week's queue in one go. Stage 0 starts by booking it.
3. **The proven conversion mechanic was retired without a successor.** Retiring the workshop as a product was fine. But the funnel now has no live conversion event at all: the on-ramp is a free 30-minute call, which has never sold a place at any price. Before 8 August you need one dated live event that ends with the offer, whatever you call it.
4. **The business has no size, and the one sizing question you did touch, you answered sideways.** No capacity number, no group-size cap, no session length for the £499 tier, no tutor cost, and no honest weekly-hours figure exist anywhere in the repo. The 13 July audit asked for capacity (ask 1) and hours (ask 4). On 14 July you decided the cohort number would not be published, which is fine, but the number itself was never written down. Deciding how to display a figure you have not produced is the approval-gate pattern in miniature. Thirty minutes with a notepad closes all five numbers.
5. **Minors' data is being collected with no privacy notice, today.** All four capture forms are live and firing; /privacy/ and /terms/ still 404. UK GDPR requires privacy information at the point of collection, and the ICO fee likely applies. This exposure exists whether or not you ever run an ad. The pages were drafted on 14 July and parked on 15 July awaiting only your entity details: the approval-gate pattern at its most expensive. An hour closes it.
6. **The public MailerLite key is still in every visitor's browser.** Full-account key, hardcoded in the client bundle: anyone with dev tools can export all 533 subscriber records, most of them minors, or send email as you. Flagged 13 July with a boundary of "not into September"; unchanged since. The fix is a half day (hosted form endpoints plus a small key-holding function, then rotate the key). Schedule it for the week after stage 0's gate, and do not carry it past 1 September.
7. **Sales history is unexamined.** 4 of your 18 payments were later half-refunded, £870 of £6,443 gross, about 13.5 percent returned (arithmetic on the recorded Stripe figures). Why? Wrong students, wrong promise, wrong format? Whoever those four people are, their reason is the cheapest product research you will ever get. Similarly, ask 3 (what did the 8 Buyers actually buy?) is still open.
8. **A public price promise is live with nothing behind it.** The summer page still tells every visitor the September cohorts open at a higher price. Either the September pages honour that in writing, or the line comes down. A screenshot of a broken price promise in a parents' Facebook group would cost more than the line ever earned.
9. **Scope creep against your own plan.** The 13 July do-not-do list said no new articles and no new dashboard features in July. Since then: six articles with their twins (four were results-window pieces, Play 2 work done early; two were pure creep), and the HQ became a phone app with a home-screen widget. Each is good work. Together they are three more days of comfortable building in the exact window the audit said pays selling at a multiple of building.
10. **The two-numbers problem.** Marketing says 1,000+ students worked with; Stripe says 18 payments ever. Both can be true (free workshops, lectures, the tutoring years). But the roadmap must be built from 18, and you should hold the 1,000+ claim to the "worked with" wording it is approved for, nothing stronger, until August results data arrives.

## 5. What the market verifiably pays (the Companies House evidence)

Most UK tutoring companies legally hide their revenue (small-company and micro-entity filings omit turnover). Today's pull read every relevant filed PDF. Three companies in or near this market file real revenue, and one of them is the map.

| Company | Model | Verified revenue | Verified profit | Team |
| --- | --- | --- | --- | --- |
| **Justin Craig Education** | Small-group A-level/GCSE revision courses, avg 5 per class, tickets £250 to £1,595 | **£1,355,832 (FY2025), £1,262,610 (FY2024), filed and audited** | Operating profit £129,385 (FY2025); 44% gross margin | **13 admin staff; tutors not on payroll** |
| MyTutor | 1:1 marketplace plus schools contracts | £17.5m (FY2024), £23.2m (FY2023), £27.0m (FY2022), filed | Operating LOSS £5.0m (FY2024); £36.4m accumulated deficit; sold to IXL May 2025 | 192 avg (2024) |
| Explore Learning | Group tuition membership at national scale (ages 4 to 16) | £42.1m (FY2024), filed | 3.6% operating margin | 5,000+ tutors, centres |

And the ones that hide their numbers, with what IS filed: **MyEdSpace** (huge-cohort live classes at about £5/hour): no turnover filed ever; £11.2m Series A (share issues February 2025, verified in the share capital note); accumulated deficit widened by about £6.0m during 2025 (arithmetic on filed reserves); 35 staff; £6.9m cash. Investor-funded, not verifiably revenue-funded. **Up Learn** (self-study courses £319.99 to £419.99 per subject): no turnover filed in ten years; net liabilities £2.9m; 42 staff. **Seneca**: no turnover filed; retained earnings improved £951k in 2025 (arithmetic on filed reserves), 26 staff, owned by GoStudent. **Save My Exams**: no turnover filed; 73 staff; the small-company thresholds it claims cap its turnover at £10.2m (statutory inference, not a filed figure). **PMT**: a 5-employee micro-entity; its money is invisible. **Tailored Tutors**: net assets £26.6k, 4 staff, verifiably tiny.

**What this means for you, plainly:**

1. **Your exact model shape is the one with the verified profitable £1m+ example.** Justin Craig runs premium small-group courses, tutors off payroll, a small core team, and files £1.36m turnover with a real profit. That is your structure, forty years older. The path exists and it is not a venture-capital path.
2. **The subscription and platform shapes need millions of users or millions of investor pounds.** The companies underpricing you (MyEdSpace at about £5/hour, Seneca free) are burning raised money or riding school contracts. Do not fight them on price; they are not playing your game.
3. **The marketplace shape loses money at 17 to 27 times your target.** MyTutor never filed a profit at £17.5m to £27.0m revenue. Volume 1:1 is a treadmill; you already know this, it is in your own sales copy.
4. **Scale for the winning shape, as arithmetic on their filings and price list:** at £675 (their published price for a standard A-level 3-day online course), £1.36m is about 2,000 course places a year, about 39 a week across a year (arithmetic; their real course mix is not published). Classes averaging 5, contracted tutors, about 13 people coordinating. Hold that picture; it is what £1m+ physically looks like in your market.

## 6. The £1 million arithmetic (pure division, no forecasts)

What £1,000,000 a year means in units, at prices actually published on your site today:

| Average sale | Sales needed per year | Per week (divided by 52) |
| --- | --- | --- |
| £289 (one summer subject) | about 3,460 | about 67 |
| £499 (Study Accelerator) | about 2,004 | about 39 |
| £539 (two summer subjects) | about 1,855 | about 36 |
| £739 (three summer subjects) | about 1,353 | about 26 |
| £849 (top tier, either programme) | about 1,178 | about 23 |
| £2,000 (mentorship, annual) | 500 | about 10 |

**Calibration, from the recorded Stripe history:** every payment this business has ever taken was between £189 and £479, and 4 of the 18 were later half-refunded. Demand at every row of that table above £479 is untested. Stage 0 is the first test.

Three structural facts fall straight out of the table:

1. **The mentorship cannot carry the goal as published.** £2,000 times its stated cap of 5 spaces is £10,000 a year: 1 percent of the target from your highest-priced product. Either that cap rises by an order of magnitude over time (with delivery redesigned so it is not 24/7 access to you), or the mentorship stays a premium halo product and the volume lives elsewhere.
2. **£1 million is a volume business or a high-ticket business, and your published ladder can grow both ways.** Roughly 2,000 places at a £500 average (the Justin Craig shape, multi-cohort, year-round, tutor-delivered), or 500 to about 670 families a year at £1,500 to £2,000 (an annual programme; for scale, three Up Learn subjects pass £950 a year at published prices, and one Justin Craig summer school is £955 to £1,595, so four-figure yearly spend per student already happens in this market), or a blend.
3. **Either way, it is not a solo teaching diary.** There is no version of the table a single person teaches alone. Your summer page already made the right design move (specialist tutors deliver, you direct). The £1 million question is never "can I teach more hours"; it is "can I fill classes and staff them".

And the honest timeline evidence: Justin Craig took decades to sit at £1.36m. MyEdSpace has burned through a £9.5m accumulated deficit getting to an undisclosed revenue in four years. Nothing verified in this market went from a £5.6k lifetime base to £1m a year in a year or two. Plan in stages and years, not quarters.

## 7. The road: four stages, each with a gate

No stage has a date attached to its revenue, because dated revenue targets from a base of zero current sales would be invented numbers. Each stage instead has a gate: hard evidence that the stage's question is answered. You move when the gate opens, not when the calendar says so. The year markers on stages 2 and 3 are orientation only, the earliest plausible window if every prior gate opens promptly; they are not forecasts.

### Stage 0: Prove the machine sells. (Now to 8 August)

**The question:** will anyone pay a currently published price?
**The work:** all approval-and-send, almost nothing to build.

1. Book the standing approval sitting: 30 minutes, same time every week, starting this week. Items 2 to 8 are the first sitting's agenda.
2. Schedule SS1 (drafted, loaded, dated Sunday 19 July) and switch its welcome automation on. The "one email a week" promise your own sequences make starts being true.
3. Approve the re-opening broadcast to all 444. Where you have been, what you built for them (the diagnostic), and one date that matters (see 4). I can draft it the moment you say yes.
4. Name the successor live event and date it in the week of 27 July to 3 August. The mechanic that produced every sale you have ever made was: broadcast, live teaching session, follow-up arc, offer. Rebuild it around the diagnostic ("bring your diagnostic report; I will show you what it means for your summer") with the 8 August cohort as the offer. Your February and May sends hit 47 to 84 percent opens; clone the templates.
5. Confirm the tutor bench in writing: who teaches each summer subject, what they cost, and that they are available from 8 August. The page has promised specialist tutors since it went live; the repo contains no names, costs or confirmations, and selling hard into an unstaffed cohort is the one way this stage can go genuinely wrong.
6. Apply the parent delivery email fix in MailerLite (five minutes, copy written since 13 July) before the parents' group launch sends anyone into that funnel.
7. Post the pack daily (it is written through 26 July), launch the parents' group per the own-group roadmap, keep the groups activity going.
8. Answer the five size numbers and put the legal pages live (section 9). Under an hour, total.
9. Merge the stranded partnership branch and send the PMT email; September inventory gets committed in July.
10. Book the 8 August flip now: the day the cohort starts, the summer page pivots to waitlist or September, the diagnostic's Year 12 routing switches, and the summer sequence retargets. One session, scheduled before results-week traffic arrives, so August visitors never land on a course that has already begun.

**The gate:** first Stripe payments at current prices before 8 August, a confirmed tutor bench, and a capacity number you actually believe. If the cohort sells zero at £289 to £849 after a real send-and-event cycle, that is not failure, it is the pricing data the whole roadmap needs, and stage 1 starts with a pricing decision instead.

### Stage 1: Prove repeatable acquisition. (August to December 2026)

**The question:** can the business create buyers on a schedule, without a warm list to burn?

- Results week is the year's free traffic spike: SSX on the morning of 13 August, the four results-window articles, the Reddit plan through the r/alevel relationship, GCSE day (20 August) aimed at parents of the next cohort.
- The parent channel goes properly live: your group, the page cadence, and, with the legal pages up, the first small paid test at the budget you set. The pixel and lead events are already live and verified.
- September cohorts (13 and 16 September) get their own sell cycle with the same mechanic as stage 0. Honour or remove the price-rise line before then.
- August results data arrives: collect it deliberately (the before/after confidence system already exists) and put real outcome numbers on the money pages for the first time.
- The weekly rhythm becomes the operating system: the approval sitting, one newsletter, daily posts from the pack routine, one live event per selling window.

**The gate, countable in tools you already have:** MailerLite shows new subscribers in at least four of the last six weeks, attributable to at least two unpaid channels (its source fields plus the UTM data GA4 already collects), at a weekly number you set in writing before results week; plus a second sold cohort; plus results proof live on the pages. You now have a funnel, not a launch.

### Stage 2: Prove the year-round machine. (2027, orientation only)

**The question:** does the calendar fill itself four times a year, and does delivery scale past your diary?

- The programme calendar becomes annual: autumn 12-week cohorts, a January mocks-response cycle, Easter crash courses (PMT sells Easter courses at £95 to £345; Justin Craig's short revision courses run £250 to £775; the market slot is proven), the summer accelerator, results week. Every cycle reuses the same mechanic.
- The tutor bench becomes permanent: named specialists with agreed economics delivering the subject teaching across cohorts, you teaching the system layer and quality-controlling everything.
- First operational help: the approval queue, scheduling, parent comms and admin stop being founder work (Justin Craig runs the whole thing on 13 core staff; you need one person first).
- Prices get tested upward with results proof behind them, and the annual high-ticket product (system plus subjects plus accountability for the whole year) gets designed and piloted against the term-by-term ladder.

**The gate:** two consecutive cohort cycles that sold out at capacity numbers you set, delivered to quality (measured by your own confidence data and refund rate) with under half the teaching hours yours. For scale only, labelled arithmetic, not a target: 300 places in a year at a £600 average ticket is £180,000.

### Stage 3: Choose the £1 million shape and staff it. (2027 to 2029, orientation only)

**The question:** which verified shape carries the last multiple?

- **Shape A, the Justin Craig clone:** multi-cohort, multi-level (A-level plus GCSE feeder), year-round small-group courses, about 2,000 places a year at about a £500 average, a tutor bench of subject specialists, and a core team of roughly a dozen (Justin Craig files 13). Verified profitable at £1.36m with 44 percent gross margin.
- **Shape B, the premium annual:** 500 to about 670 families a year in a £1,500 to £2,000 annual programme (subjects plus system plus mentorship-lite), fewer, deeper relationships, results proof doing the selling. No direct filed comparator at exactly this shape, so treat it as the riskier, higher-margin variant and pilot it inside stage 2 before betting on it.
- **Shape C, the blend with B2B:** either shape plus schools work (Seneca's filed trade debtors of £1.0m point at real schools invoicing; MyTutor's schools revenue was real but its economics were not). Only worth exploring once the consumer engine runs without you.

**How the choice gets made:** by stage 2's own numbers. If the shape B pilot fills at £1,500 or more with refund rates at or below your cohort products, B leads. If it does not fill, A is the default, because it is the only shape in this market with filed, audited, profitable accounts at the target.

**The gate is the goal itself:** a trailing-twelve-month revenue at £1 million with a gross margin that survives tutor costs, which is why the tutor-economics number in section 9 matters from stage 0 onward.

**A structural note on all four stages:** every shape runs on the same four assets: the doctor brand, the diagnostic funnel, the method layer, and a tutor-delivered classroom. Three of the four exist today in v1. The fourth is currently a design on a sales page plus an unanswered question, and it becomes real in stage 0 or the whole ladder wobbles.

## 8. Keep, double down, drop

**Double down:** the list and the weekly send; the live-event mechanic under a new name; the diagnostic as the front door of everything; the parents' group launch this weekend and the groups playbook; the tutor-delivered classroom design, once the bench is confirmed; results-week ownership; the HQ dashboard as-is (it is done; use it, stop extending it).

**Keep, unchanged:** the honesty rule; the voice rules; the site (feature-complete; three known exceptions: the price-promise line, the client-bundle key, and the 8 August flip); the automations; the analytics wiring; the newsletter cadence once started; the partnership process (send PMT, then two more).

**Drop, park, or stop:**

- Stop building until stage 0's gate is passed: no new articles, no new tools, no new dashboard features, no new research documents. The queue at your approval gate is the constraint; do not lengthen it.
- One named exception: Results Day Rescue. If stage 0's gate looks passable by 4 August, ship it small as the roadmap already intends (one page, one capture, one booked-call CTA) by Wednesday 12 August. If stage 0 is still open on 4 August, it is cancelled for this year and the four results-window articles plus SSX are the results-week offer. Decide by the calendar, not in the moment.
- Park SEO placement until September, as already agreed; the 17 twins keep their September value.
- Delete or archive `content/week-1-optimized.md`: its run window ended today, it is superseded by the pack, and it still contains a workshop lead-magnet post that contradicts the retirement. Decision needed; my recommendation is delete.
- Park the UCAT group and automation (off, 2 members) until a deliberate UCAT decision exists.
- The stale remote branches (two workshop landing pages, tender-knuth, the old Vercel analytics branch) still need your GitHub UI deletions; the partnership branch is the one that needs a merge, not a deletion.
- Retire the September price-rise line OR schedule the September pages to honour it. One or the other, this month.

## 9. The numbers only you can supply (30 minutes, one sitting)

Rolled forward from 13 July where still open, plus new ones this reaudit exposed. Nothing in stages 1 to 3 can be sized without the first five.

1. **Hours:** your honest teaching-capable hours per week, now and from August, given the rota.
2. **Capacity:** the group size you can deliver well per class, and the cohort cap you would actually enforce (you decided on 14 July not to publish one; the private number still does not exist anywhere).
3. **The £499 tier's session length** (the page says 12 weekly sessions but never says how long each is), and the mentorship call length.
4. **Tutor economics:** who the summer "expert tutors" are, what they cost per hour or per cohort, and whether they are confirmed for 8 August. This one blocks stage 0's gate as well as the long-range maths.
5. **The refund story:** who were the 4 half-refunds, and why? And ask 3 from 13 July: what did the 8 Buyers actually buy?
6. **Channel truth:** did the pack's 16 July posts go out on LinkedIn and Facebook? Page admin state? (I cannot see either platform from here.)
7. **Paid budget:** the number you are comfortable losing on the first parent-ads test once legal pages are live. Zero is a valid answer.
8. **Legal entity details** for the drafted privacy and terms pages, and confirmation of your ICO registration position. This closes a live exposure (section 4.5), and it also happens to open the ads lane.
9. **The successor live event:** its name and its date. I can build everything else around it.

## 10. What I could not assess, and why

- **Site traffic.** GA4 went live 15 July and this session has no reporting access; Ahrefs' paid endpoints and its Search Console tools refused ("Insufficient plan"). So I cannot tell you visits, sources or conversion rates. The wiring to answer this next time is live and verified.
- **Backlinks and referring domains.** Same Ahrefs refusal; only the DR (0) is observable.
- **Fresh Stripe.** The connector lives on your Mac. The 13 to 14 July recorded truth is the latest verified revenue picture; nothing in today's data suggests it changed, but I did not observe the account today.
- **LinkedIn and Facebook reality.** No account access from this remote session. The own-group roadmap's inside-the-account observations from earlier today are quoted as that document's claims, not re-verified here.
- **Most competitors' true revenue.** Legally hidden by filleted and micro accounts; I reported exactly what is filed and refused third-party estimates.
- **The rendered content of the live automation emails.** Structure verified today (14 on, step counts). The three Study System route pitch emails were checked against their live rendered versions earlier today and reconciled in the repo (noted in their file headers); the other routes' rendered emails, and the parent delivery email's live state, were not re-verified in this pass.

## 11. If you take one page from this document

The 13 July audit ended: "The machine is good. Turn it on." That sentence survives this reaudit completely intact, with three days more evidence behind it and one correction of scope:

**Stage 0 is blocked by two clicks (schedule SS1, approve the re-opening email), one calendar entry (the live event), one written confirmation (the tutors), and five numbers only you know. £1 million is blocked by the four gates after that, and every one of them is passed by selling, not building.**

The first £5,573 came from eleven weeks of emailing and teaching live. The next stage starts the same way.
