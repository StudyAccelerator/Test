# The SEO and AEO content pipeline (16 July 2026)

The plan for a competitor-informed batch of roughly 24 new blog posts, delivered in reviewable waves, time-sensitive first. Written 16 July 2026 from a four-agent research pass: a Save My Exams and PMT teardown, a parent-facing competitor teardown (MyTutor, MyEdSpace, Up Learn, Seneca, Tutorful), a 25-query live SERP sweep, and an authoritative fact-verification pack. Waleed reviews every wave before it merges; nothing in this plan publishes itself.

## Standing rules for every wave

1. **Nothing goes live without Waleed's review.** Each wave is built on its own branch (`claude/seo-blog-wave-<n>`). Approval means merging to `main`; until then the site is untouched.
2. **All content rules apply in full**: Waleed's voice, zero em or en dashes, no AI-tell vocabulary, no invented statistics, approved proof points only, no grade-outcome claims before August 2026. Every post runs the compliance scan (`scripts/compliance-scan.py`) before it reaches review.
3. **Every post is written twice**: website version plus a fully rewritten backlink twin in `content/backlink-articles/` (per the dual-version rule in content-studio).
4. **Facts carry sources.** Dates, deadlines, processes and statistics in the results-day and UCAS posts come from the verification pack (JCQ, UCAS, Ofqual, gov.uk, exam boards), cited in a short references section at the end of each post. If a fact could not be verified, it is not in the post.
5. **Honesty about ranking.** The domain is DR 0 (13 July audit). New posts will not beat UCAS or Save My Exams for head terms in August. The realistic wins are: long-tail and question queries where forums and micro-sites currently rank, AEO citations (AI assistants cite well-structured pages from small domains), and immediate reuse as email and social material. The topic choices below follow that logic; anything needing head-term authority is explicitly out.

## What the research found (16 July 2026 snapshot)

- **The benchmark players refresh, not re-create.** Save My Exams (DR 63, a 62-post results-day cluster) and PMT (DR 63, 201 blog posts) both run evergreen URLs with the year in the title, re-swept each May and June. PMT's entire results/UCAS cluster was re-stamped between 13 May and 10 June 2026. Their format: 1,500 to 2,000+ words, key-takeaways box first, question-led H2s, an FAQ section, named bylines, references, and roughly ten internal links within the cluster.
- **The winnable SERPs are the panic long-tails.** Google currently ranks forum threads (The Student Room, Mumsnet, Quora) and tiny college blogs for: "what to do if you fail your a levels", "missed my university offer by one grade", "can a level grades go down on appeal", "year 12 mock results bad", "retaking year 12", "how to prepare for year 13" (the weakest SERP of the 25 checked). These are judgement calls from a live sweep, not measured difficulty scores.
- **The parent A-level lane is nearly empty among tutoring brands.** MyTutor's parent hub is stale (clearing guide still cites 2024) with no FAQ blocks or bylines; MyEdSpace, Up Learn and Seneca have effectively no A-level parent advice content. Only PMT and Save My Exams run real parent hubs. Nobody owns: the post-results tutoring decision, parent-voiced predicted grades, "is my child revising properly", or honest cost content (Tutorful aside).
- **Head terms to leave alone**: "clearing how does it work" (UCAS holds three of the top slots), grade boundaries (exam boards plus SME's year-stamped hub pages), "ucas points table" (UCAS and Wikipedia), "best a level tutors uk" (marketplaces; also off-brand to write).

## The cluster and format standard for every post

- Evergreen slug, year in the title only (the SME/PMT pattern), so authority accumulates on one URL that gets re-stamped each cycle.
- QuickAnswer box up top (the featured-snippet and AI-answer lift), KeyTakeaways, question-led H2s that match real query phrasings, FAQ block with FAQPage schema, a short references list linking to JCQ/UCAS/gov.uk sources, and 5 to 10 internal links within the topic cluster.
- Written and signed by Dr Waleed Ahmad, MBBS. In a results-week SERP full of "SEO Lead" bylines, a doctor byline is the E-E-A-T edge; the medical triage framing is the voice edge.
- Word count 1,400 to 2,200. Vary structure post to post (triage tree, scripts, process explainer, checklist, parent letter) so the set does not read like one template stamped 24 times.
- Each post states its lead path: which free tool or page it routes to and why that routing is honest for that reader.

## Wave 1: the results-day and UCAS window (BUILT THIS SESSION, review pending)

Live target: this week, so pages have four weeks to index before Thursday 13 August. All six are built on `claude/seo-blog-wave-1`.

| # | Slug | Working title | Audience / category | Target query cluster | Why we can win | Lead path |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | `didnt-get-the-grades-a-level-results` | Didn't Get the Grades? The A-Level Results Day Triage (2026) | Students, Results & Clearing | what to do if you fail your a levels; bad a level grades what next | SERP is small college blogs; SME's page is a list, not a decision framework | Book a call; resits post; diagnostic for the resit year |
| 2 | `missed-university-offer-by-one-grade` | Missed Your University Offer by One Grade? Exactly What Happens Now | Students, Results & Clearing | missed offer by one grade; will my firm still take me; firm vs insurance | Two stale forum threads on page 1 of the most-asked results-morning panic query; includes the word-for-word clearing call script | Newsletter; parents guide cross-link |
| 3 | `a-level-appeals-2026` | A-Level Appeals 2026: How They Work, How Long They Take, and Whether Grades Can Go Down | Both, Results & Clearing | a level appeals how long; can grades go down on appeal; priority appeal deadline | Stalest SERP of the sweep (a 2021 gov blog, Quora, a law firm); precise 2026 dates win it | Newsletter; triage post |
| 4 | `a-level-results-day-parents-guide` | A-Level Results Day 2026: A Parent's Guide From a Doctor | Parents, For Parents | a level results day advice for parents; clearing advice for parents | Universities dominate with a conflict of interest (they want your child in clearing); tutoring brands are stale or absent; first For Parents post on the blog | Parents guide PDF; diagnostic parent path (`?for=parents`) |
| 5 | `how-to-prepare-for-year-13` | How to Prepare for Year 13: The Six-Week Plan That Sets Your Predicted Grades | Students, Study Planning | how to prepare for year 13; get ahead for year 13; summer before year 13 | Weakest SERP of all 25 (a Hong Kong blog, YouTube, 2017 forum threads) and peak search is right now | Diagnostic; Summer Accelerator; predicted-grades post |
| 6 | `bad-year-12-results-what-now` | Bad Year 12 Results? What They Actually Mean for UCAS (and How to Fix Them by September) | Students, Predicted Grades & UCAS | year 12 mocks went badly; how important are year 12 mocks; end of year 12 exams bad | Google ranks seven forum threads because no real article exists; this is the exact ICP | Diagnostic; improve-predicted-grades post; Summer Accelerator |

Cluster wiring: 1 links to 2, 3, the existing resits post and 4; 2 links to 1 and 3; 4 links to 1, 2, 3 and the parents guide; 5 links to 6, the existing year-12-summer and predicted-grades posts; 6 links to 5 and predicted grades. The existing resits article gets one added link out to post 1 (its natural parent) when the wave merges.

Explicitly absorbed rather than standalone: the results-morning timeline and "what to bring" (H2s inside post 1), the clearing phone script (H2 inside post 2, echoed for parents in 4), "universities that accept lower grades" honesty (H2 inside post 2), "is a remark worth the risk to my uni place" (H2 inside post 3).

## Wave 2: pre-results and the GCSE window (build ~28 to 31 July, live by 8 August)

| # | Slug (provisional) | Working title | Audience | Target cluster | Evidence |
| --- | --- | --- | --- | --- | --- |
| 7 | `after-bad-a-level-results-parents` | After Bad A-Level Results: A Parent's Decision Guide (Resit, Clearing, Gap Year or Regroup) | Parents | my child failed a levels; resit or clearing decision | Nobody owns the post-results tutoring decision (SME/PMT teardown, gap 1); spikes 13 August onward |
| 8 | `choosing-a-levels-after-gcse-results` | Choosing A-Levels After GCSE Results: The Decision That Actually Matters | Both | how to choose a levels after gcse results; gcse results day what next | Mid-authority SERP, no forum gap but small tutoring sites rank; GCSE day 20 August is the acquisition day for next year's cohort |
| 9 | `retaking-year-12` | Retaking Year 12: Who Should, Who Shouldn't, and How It Works | Both | retaking year 12; repeating year 12 sixth form | Near-empty four-result SERP topped by Mumsnet; decision peaks late August |
| 10 | `ucas-personal-statement-three-questions` | The New UCAS Personal Statement: How to Answer the Three Questions | Students | new ucas personal statement three questions | Only PMT has a dedicated piece and it did not surface in checks; every Year 13 hits this August to October |
| 11 | `is-a-level-tutoring-worth-it` | Is A-Level Tutoring Worth It? An Honest Answer From a Doctor Who Tutors | Parents | is a level tutoring worth it | Weakest parent SERP checked (Mumsnet and micro-tutors); the honest "when tutoring is NOT worth it" angle is the only credible differentiator; must not cannibalise the existing one-to-one post (different query intent: worth-it vs does-1:1-work) |

## Wave 3: September, predictions and UCAS deadlines (build late August)

Provisional, re-scored against fresh SERPs and the first Search Console data before building: predicted grades lower than expected (student); predicted grades explained for parents (no live competitor piece among the five); my child is failing A-levels (highest buyer-intent gap in the sweep); what A-level tutoring costs in 2026 (honest pricing, one incumbent); the GCSE to A-level jump for parents; how important are Year 12 mocks (autumn refresh companion to post 6).

## Wave 4: October onward, mocks and method (build mid-September)

Provisional: Year 13 mocks plan; is my child revising properly (the parent diagnostic wrapper); spaced repetition for A-levels; how to use past papers properly; UCAS deadlines 2027 timeline for parents; working hard but grades not moving (brand core, AEO play); medicine resit policies (only if Waleed wants the medic lane; per-school policies churn yearly so it carries a maintenance cost).

## The refresh calendar (the lesson from PMT)

The results/UCAS cluster gets re-stamped every May to June (dates, deadlines, year in titles); the predictions cluster every September. Wave 1 posts are written with 2026 facts and evergreen slugs so the 2027 refresh is an edit, not a rewrite. Owner: any session, on Waleed's word, roughly 90 minutes per sweep.

## Review workflow per wave

1. Session builds the wave on its branch: posts, twins, compliance scan, local build check, llms.txt entries.
2. Waleed gets a review summary: each post's angle, target queries, lead path, and anything needing his judgement.
3. He reviews on the branch (or asks for a Vercel preview), requests edits, then says "make it live"; the session merges to main, pushes, and confirms the live URLs.
4. Backlink twins go to the pack only after the site version is approved.

## What this pipeline does not do

No posts written to hit a number: every topic above traces to observed demand (a SERP gap, a competitor's yearly refresh, or a funnel moment). No invented statistics in any post. No head-term chasing at DR 0. No grade-outcome claims for our own students before August results. And no auto-publishing: the waves exist so review is real.
