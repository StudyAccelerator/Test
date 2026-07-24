# Visibility log

One dated entry per optimiser run, newest first. Search Console numbers are ground truth; SERP and AEO checks from web search are estimates and say so. Never edit an old entry; the point of this file is that the trend is provable.

Format per entry: GSC totals, top movers, SERP spot checks, AEO probes, indexation, notes.

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
