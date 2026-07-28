# Visibility log

One dated entry per optimiser run, newest first. Search Console numbers are ground truth; SERP and AEO checks from web search are estimates and say so. Never edit an old entry; the point of this file is that the trend is provable.

Format per entry: GSC totals, top movers, SERP spot checks, AEO probes, indexation, notes.

---

## 2026-07-28 (weekly run 3)

**Google Search Console: pulled successfully** (property sc-domain:alevelaccelerators.com, data window 7 to 26 July 2026, the property's full history). Chrome was connected this week, so this entry has ground truth. The 24 July gap is not recoverable and stays a gap.

- Totals: **32 clicks, 1,550 impressions, average CTR 2.1%, average position 14.4**, across **93 queries** and **42 URLs**.
- Against the 17 July baseline (7 to 15 July: 22 clicks, 1,090 impressions, CTR 2%, position 15.2, 80 queries): clicks +10, impressions +460, average position improved by 0.8, queries +13.
- **The rate slowed, and that matters more than the totals.** The first 9 days produced about 121 impressions a day. The 11 days since (16 to 26 July) produced about 42 a day, roughly a third of the earlier rate. This is a difference of two cumulative windows, not two independent measurements, so treat it as a direction rather than a precise figure. The daily chart agrees: impressions peak between 11 and 17 July and sit visibly lower from 18 July on. Two honest caveats: the last two or three days of any GSC window are usually incomplete, and this is the school summer holiday, when student search falls.
- Indexation: **29 indexed** (was 25), **24 not indexed** (was 18). Reasons: page with redirect 13 (was 5), alternate page with proper canonical 10 (was 7), discovered and not indexed 1 (was 4), crawled and not indexed 0 (was 2). Four more pages indexed is real progress; the redirect bucket nearly tripling is the trailing-slash and www problem showing up in Google's own numbers.
- Links report: still "processing data, please check again in a day or so", three weeks after verification. Google has recorded no backlink data at all. Treat external links as effectively zero.

**Top pages by impressions** (same window):

| Page | Clicks | Impressions | Position |
|---|---|---|---|
| /blog/resitting-a-levels/ | 1 | 414 | 20.9 |
| /blog/year-12-summer-revision/ | 5 | 304 | 6.2 |
| /blog/how-to-improve-predicted-grades/ | 9 | 254 | 7.5 |
| **www**.alevelaccelerators.com/blog/how-to-make-a-revision-timetable/ | 0 | 144 | 25.7 |
| /blog/how-many-hours-revision-a-level/ | 0 | 86 | 15.1 |
| / (homepage) | 13 | 70 | 2.6 |
| /blog/one-to-one-a-level-tutoring/ | 1 | 74 | 17.8 |

**Near-miss queries, positions 8 to 20** (the fastest wins, unchanged in shape from the baseline): a level retake cost 8.0, can you resit a levels at any age 8.0, how many hours should an a level student study per day 8.0, can your predicted grades change in year 13 9.0, how much does it cost to resit an a level 9.0, when does a level results come out 2026 9.0, **a level results day 2026 9.8 (6 impressions)**, **jcq embargo 2026 10.0 (9 impressions)**, can you retake a levels at any age 10.0, how much to retake a levels 10.0, blurting 10.0, blurting revision 10.0, when are predicted grades finalised a level 11.0, when are a level resits 11.8, revision tracker 13.0, do you have to pay to resit a levels 14.2, a level predictions 15.1 (7 impressions), one on one a-level tutoring 15.7, blurting method 17.0, how much does it cost to retake an a level 18.0, a level resits cost 18.0, **one on one a level tutoring 18.5 (67 impressions)**, resit a levels 20.0, how much revision for a levels per day 20.0, how much does it cost to resit a levels 20.2.

**Three findings from the page table that were not visible before:**

1. **Duplicate URL variants are splitting impressions, and the wrong variant often ranks better.** Fourteen of the 42 URLs are www or missing-slash duplicates. The clearest case: `/revision-tracker/` gets 32 impressions at position 22.3 while the slashless `/revision-tracker` gets 8 impressions at position **9.5**, and the www slashless version gets 10 at position **4.3**. The same split hits /summer-accelerators, /study-systems, /subject-accelerators, /revision-diagnostic, /faqs and four blog posts. Verified by direct fetch that this is a **two-hop redirect chain**: `www.alevelaccelerators.com/revision-tracker` 308s to `alevelaccelerators.com/revision-tracker`, which 308s again to `alevelaccelerators.com/revision-tracker/`. This is exactly what the unmerged 17 July batch (backlog 1 and 2) was built to fix, and it is now measurable in Google's own data rather than argued from first principles.
2. **The retired workshop is still live and still ranking.** `https://workshop.alevelaccelerators.com/` returns **HTTP 200**, serves a page titled "Free A-Level Skills Workshop", carries no noindex tag, and collected **19 impressions at position 4.6** in this window. The `/workshop/` path redirect works correctly (308 to the homepage), so the retirement was only ever half done: the subdomain was never taken down. A page advertising a workshop Waleed does not run is one of the better-ranking things on the property. Added as backlog 30, needs Waleed (hosting and DNS, outside what a batch may touch).
3. **The results-day cluster has started earning impressions**, three weeks before the day itself: "a level results day 2026" at 9.8, "jcq embargo 2026" at 10.0, "when does a level results come out 2026" at 9.0, plus /blog/a-level-appeals-2026/ (39 impressions) and /blog/a-level-results-day-parents-guide/ (18). Backlog 12 was queued for early August; the data says the season has already begun.

**SERP spot checks** (WebSearch, 28 July 2026, **estimates**, US-skewed index, ordering indicative only):

| Query | Site present? | Who holds the top results |
|---|---|---|
| a level results day 2026 | no | Complete University Guide, UCAS, The Uni Guide, **Save My Exams**, CXK |
| how much does it cost to resit an a level | no | ICS Learn, Tutorful, Student Room, TeachTutti, a-level-retakes.com |
| how to revise for a level biology | no | Oxford Learning College, Immerse Education, biologyeducation.co.uk, TutorsPlus |
| how to help my child revise for a levels | no | **Save My Exams (parents hub)**, Oxford Revise, Good Schools Guide, Birmingham City University |
| a level revision timetable | no | Pinterest, **Save My Exams**, Higherin, Ivy Education, Dukes Plus |

**AEO probes** (WebSearch groundings, **estimates**, 3 of the 7 rotated, none repeated from last week):

- "is a level tutoring worth the money": site absent. Groundings: Higher Education Review, a-levelmathstutor.co.uk, TutorChase, Mumsnet, sktutoring.
- "what is the blurting method revision": site absent. Groundings: NCC, Birmingham City University, Online Learning College, Medium, **Save My Exams**, NetMock.
- "best online a level revision resources": site absent. Groundings: GoStudent, TutorChase, **Save My Exams**, Thomas Keith School, Revision World.

**Bing indexation: not measured, second week running.** `bing.com/search?q=site:alevelaccelerators.com` returned a bot challenge again. No attempt was made to solve it. This stays unmeasurable from here and is the reason backlog 9 (Waleed verifying Bing Webmaster Tools, about 10 minutes) is worth more than it looks: it is the only way to get a real Bing number.

**What this run changes in the picture:**

1. **Save My Exams is not entering our territory one page at a time, it has already built the whole hub.** Across this run and last, its `/learning-hub/` appeared holding top results for A-level resit dates, blurting method, results day, helping your child revise, revision timetables and best revision websites: six distinct sections, every one of them a cluster in section 5 of the roadmap. The 17 July audit's read that "no giant owns method queries" is now wrong rather than weakened, and the parents cluster is contested too. This does not change what to build, but it does change the honest expectation: these are fights against an established hub, not open ground, and the pages that win them will be the ones answering a specific question better, not broader guides.
2. **The strongest argument for merging the 17 July batch is now a measured one.** Impressions split across duplicate URLs, the slashless variants outranking the canonical ones, and Google's own "page with redirect" count rising from 5 to 13 are three independent signs of the same fault, and the fix has been sitting on a branch for 11 days.
3. **Growth has slowed to about a third of the early rate.** Holidays and reporting lag explain part of it and neither is worth panicking about, but with results day on 13 August the useful conclusion is that the season, not the summer, is where the next move is.

**Notes:** no site-changing batch was built this run. The 17 July batch is still unmerged and awaiting Waleed's decision, so the skill's one-batch-in-flight rule applied: measure, groom the backlog, stop. Backlog 30 added; backlog 12 moved up on the evidence above.

---

## 2026-07-24 (weekly run 2)

**Google Search Console: unavailable this run.** Claude in Chrome was not connected (extension not reachable, retried once), so no ground-truth numbers were pulled. Nothing in this entry is a substitute for them: there are no GSC figures for 16 to 24 July and this run cannot say whether clicks, impressions or positions moved. Next run should pull the 28-day window, which by then covers almost the whole property history.

**Live site checks** (direct fetch, facts not estimates):

- `https://alevelaccelerators.com/error-log/` returns **HTTP 404**. The Error Log tool is not live. It sits unmerged on `claude/error-log-tool` along with the whole 17 July SEO batch.
- Sitemap serves 27 URLs: 10 static pages plus 17 blog posts. The 10 static pages still carry no lastmod (backlog 15 confirmed open). No `/error-log/` entry, consistent with the tool not being live.

**SERP spot checks** (WebSearch, 24 July 2026, **estimates**, US-skewed index, ordering is indicative only):

| Query | Site present? | Who holds the top results |
|---|---|---|
| how to improve predicted grades a level | yes, listed last of nine | UCL, Atom Learning, Avalon, A Level Revision UK, Student Room, PMT |
| year 12 summer revision what to do | yes, listed eighth of nine | Student Room threads, InsideUni, Atomi, Ealing Independent College |
| resit a levels how much does it cost | no | Tutorful, ICS Learn, Student Beans, TeachTutti, Superprof |
| when are a level resits 2027 dates | no | Tutorful, GCSE Tutoring Academy, **Save My Exams (dedicated resit dates page)**, RS Remote Tutoring |
| a level revision planner | no | Amazon, Revision Hub, Pinterest, timetablemaker.net, Get Revising |
| blurting method revision | no | NCC, Birmingham City University, Online Learning College, **Save My Exams**, NetMock |
| how many hours a day should i revise for a levels | no | Think Student, Manning's, Student Room, Seneca, Edumentors |
| is a level tutoring worth it | no | a-levelmathstutor.co.uk, a 2017 Student Room thread, Vocal Media, sktutoring, Out-Class |
| how much does a level tutoring cost per hour uk | no | Edumentors, FindTutors, Tutorful, TutorCruncher, Mumsnet, The Degree Gap |
| one to one a level tutoring online | no | Bucksmore, MyTutor, LevelUp Tutors, Dukes Tutoring |

**AEO probes** (WebSearch groundings, **estimates**, 3 of the 7 rotated):

- "best a level tutoring uk": site absent. Groundings: TutorChase, Study Mind, Varsity Tutors, Tutorful, Avalon Education, The Profs, Keystone.
- "best a level revision websites 2026": site absent. Groundings: MasteryMind, SimpleStudy, TutorChase, Save My Exams, Revision World, Thomas Keith School.
- "how should i revise for my a levels effectively": site absent. Groundings: Nottingham Trent, WhatUni, learndirect, CloudLearn, U2 Tuition, Newcastle University.

**Bing indexation: not measured.** `bing.com/search?q=site:alevelaccelerators.com` returned a bot challenge page instead of results. No attempt was made to work around it. Still outstanding, and still gated on backlog 9 (Waleed verifying Bing Webmaster Tools).

**What this run changes in the picture:**

1. **Save My Exams has entered two SERPs the audit recorded as giant-free.** It now holds a dedicated A-level resit dates page and a blurting method page. The 17 July read that "no giant owns method queries" and that resits have "no marketplace presence" is now weaker on both counts. This raises urgency on backlog 3 rather than changing its direction: the resit hub is still the biggest near-term win, but the window is narrowing.
2. **A second listicle lane exists that the backlog did not name.** "Best revision websites" roundups (MasteryMind, TutorChase, Revision World, plus Save My Exams' own list) are a separate family from the "best tutoring" roundups in backlog 22, and they list free tools rather than tutors. The diagnostic, tracker and error log are exactly that shape. Added as backlog 28.
3. **University domains dominate the generic revision-advice groundings** (Nottingham Trent, Newcastle, Birmingham City). That lane is an authority fight, not a content-quality fight, and is not worth attacking directly.

**Notes:** no site-changing batch was built this run. The 17 July batch is still unmerged and awaiting Waleed's decision, so the skill's one-batch-in-flight rule applied: measure, groom the backlog, stop.

---

## 2026-07-17 (baseline, first full audit)

**Google Search Console** (property sc-domain:alevelaccelerators.com, data window 7 to 15 July 2026, the property's full history: verified about 7 July):

- Totals: 22 clicks, 1,090 impressions, average CTR 2%, average position 15.2. 80 queries with impressions. Impressions trend rising day over day since 9 July.
- Indexation: 25 pages indexed, 18 not indexed (7 "alternate page with proper canonical" = www variants, 5 "page with redirect" = http/www redirects, 4 "discovered, currently not indexed", 2 "crawled, currently not indexed"). All four reasons are normal for a three-week-old content site; nothing is blocked.
- Links report: still "processing data", no backlink data recorded by Google yet.
- Page-1 pages already: /blog/how-to-improve-predicted-grades/ (position 7.4, 225 impressions, 8 clicks), /blog/year-12-summer-revision/ (position 6.3, 236 impressions, 5 clicks), homepage position 3.2 on brand-adjacent queries (41 impressions, 8 clicks).
- Biggest impression clusters not yet converting: resits/retakes (357 impressions on /blog/resitting-a-levels/ at average position 21.3, plus 40+ resit query variants at positions 8 to 46), "a level revision planner" (88 impressions, position 32.5), revision timetable queries (positions 26 to 69), blurting queries (positions 10 to 58), "one on one a level tutoring" (14 impressions, position 14.9).
- Near-miss queries at positions 8 to 20 (fastest wins): "can your predicted grades change in year 13" (9.0), "how much does it cost to resit an a level" (9.0), "can you retake a levels at any age" (10.0), "when are predicted grades finalised a level" (11.0), "when are a level resits" (11.8), "do you have to pay to resit a levels" (14.2), "one on one a level tutoring" (14.9), "blurting" (10.0), "a level retake cost" (8.0), "how many hours should an a level student study per day" (8.0).
- www URLs (www.alevelaccelerators.com) collected impressions for two posts before canonicalisation settled; Google reports them under "alternate page with proper canonical", so no action needed beyond the internal-link consistency fix.

**Notes:** this entry is the baseline from the 17 July full audit (assessment doc in this folder). SERP sweep and AEO probe results from that audit are recorded in the assessment doc rather than duplicated here; future entries record their spot checks inline.
