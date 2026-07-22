# SEO and AEO: assessment and roadmap

**Date: 17 July 2026. Owner: the seo-aeo-optimiser skill (weekly, Mondays). Status of every backlog item lives in this file.**

This is the standing plan for organic growth on two fronts: classic search (Google, Bing) and answer engines (ChatGPT, Perplexity, Google AI Overviews, Copilot, Claude). It was built from a fresh, first-hand audit on 17 July 2026: real Search Console data pulled from Waleed's account, an independent sweep of 42 live search queries, seven answer-engine probes, technical audits of the live site and the codebase, a backlink and mention sweep, and a teardown of the competitors who currently win this space, with an adversarial verification pass on the load-bearing claims. Every number in this document is sourced or labelled an estimate. Nothing is invented.

## 1. How this was measured, and what it could not measure

- **Search Console is ground truth.** Property `sc-domain:alevelaccelerators.com`, read directly from Waleed's logged-in account. Its data starts 7 July 2026 (when the property was verified), so "all time" here means nine days. That is enough to see real queries and real positions, not enough for trends.
- **SERP positions from web search are estimates.** The sweep used a US-based search index; UK results will differ somewhat. Where Search Console and the sweep agree (they did, on every overlapping query), confidence is high.
- **Answer engines cannot be queried directly from here.** The probes measure which domains dominate the search groundings that AI assistants cite, which is the best available proxy. A direct "ask ChatGPT and see" check is a manual step Waleed can do any time.
- **No third-party SEO tool data** (Ahrefs, Semrush) was used: the point of this audit was an independent read, and those tools' figures for a three-week-old site are mostly noise anyway.

## 2. Where the site stands today: the honest read

The one-line answer: **the site is three weeks old in Google's eyes, already has three page-one rankings and 80 queries with impressions, is rising day over day, and has effectively zero authority: no backlinks, no reviews, no mentions, no AI citations.** The engine is running; nothing is pushing it yet.

The numbers behind that (Search Console, 7 to 15 July 2026):

- 22 clicks, 1,090 impressions, average CTR 2%, average position 15.2, 80 distinct queries.
- **Already on page 1:** /blog/how-to-improve-predicted-grades/ (position 7.4, 225 impressions), /blog/year-12-summer-revision/ (position 6.3, 236 impressions), and the homepage at 3.2 on brand-adjacent queries. The independent SERP sweep confirmed all three from outside.
- **The resit cluster is the sleeping giant:** /blog/resitting-a-levels/ has 357 impressions at average position 21.3 across 40+ resit and retake query variants. Positions 20 to 40 on a three-week-old post means Google likes the page but does not yet trust the site.
- **Near-miss queries sitting at positions 8 to 20** (one push from real traffic): "can your predicted grades change in year 13" (9.0), "how much does it cost to resit an a level" (9.0), "can you retake a levels at any age" (10.0), "blurting" (10.0), "when are predicted grades finalised a level" (11.0), "when are a level resits" (11.8), "do you have to pay to resit a levels" (14.2), "one on one a level tutoring" (14.9), "a level retake cost" (8.0), "how many hours should an a level student study per day" (8.0).
- **Indexation is healthy:** 25 pages indexed; the 18 "not indexed" are canonicalised www variants, redirects, and Google's normal new-site crawl queue. Nothing is blocked.
- **Authority is zero, measured three ways:** Google's Links report has no data; a nine-search mention sweep found no third-party links, no directory listings, no forum threads, no press, nothing beyond the site's own LinkedIn and Facebook profiles; and the site never appears in any of the seven answer-engine probe groundings.
- **Bing barely knows the site exists:** roughly 10 pages indexed (estimate), with stale titles. Bing feeds ChatGPT and Copilot, so this directly caps AI visibility.
- **Commercial queries are a different world:** for "a level tutor", "a level tutoring", "best a level tutoring uk" and every variant, the site is absent and the winners are marketplaces (MyTutor, Tutorful, Preply and peers; Superprof shows on subject and city variants) plus niche specialist sites. Verified by both the sweep and an adversarial re-check.

### What the uploaded reports said, and where they were wrong

The agency reports Waleed uploaded (dated 9 July 2026) said: no robots.txt, no llms.txt, thin schema, AI visibility 10 out of 100, "no organic keyword rankings recorded", DA 4, 15 referring domains. Three problems with leaning on them:

1. **They describe a site that no longer exists.** robots.txt (with every major AI crawler explicitly allowed), llms.txt, WebSite, EducationalOrganization, Article, BreadcrumbList and FAQPage schema all shipped in-repo on 10 to 16 July. Their headline fixes are already done, some of them possibly the day after the report was written.
2. **"No organic rankings" is now false.** 80 queries with impressions, three page-one positions, and clicks, all visible in Search Console. The report predates the blog getting traction by days, which is exactly why point-in-time audits of a brand-new site mislead.
3. **Their prescriptions had errors.** They recommended www URLs (the site's canonical is non-www), suggested cutting FAQ counts, and their "15 referring domains" is not corroborated by Google or by direct searching.

The fair reading: the reports were roughly right that the site was young and unknown, wrong or stale on most specifics, and their remaining useful ideas (trailing-slash internal links, more FAQ coverage on key pages) are folded into the backlog below.

## 3. Technical and on-page state

The foundation is genuinely strong, which the audit confirmed from outside and inside: clean single-308 www canonicalisation, correct 404 behaviour, complete and accurate sitemap with staggered lastmod, deliberate AI-crawler robots policy, WebSite + EducationalOrganization + founder Person schema, Article + BreadcrumbList + FAQPage on every post from one shared layout, QuickAnswer and KeyTakeaways blocks (the answer-engine shape), 1,600 to 1,900 word articles fully server-rendered, unique titles and descriptions, en-GB, one H1 per page, deliberate alt text.

**Fixed in the 17 July batch (this session, awaiting Waleed's approval to go live):**

- 29 internal links missing trailing slashes across 20 files (each cost a 308 redirect hop on every click and crawl).
- FAQ answers on /faqs/ and /summer-accelerators/ existed only in JSON-LD, not in the rendered HTML: AI crawlers and Google's no-JS view never saw them. The shared accordion now renders every answer in the HTML.
- Blog articles had no og:image (Facebook and WhatsApp shares got no card image); all 17 articles and the blog index now send og-default.
- og:url on /parents/, /revision-diagnostic/ and /summer-accelerators/ pointed at the homepage; each now declares its own URL (these are the three pages parents actually share).
- Article schema had no image and the author Person pointed at a non-existent anchor; both fixed, with the founder entity now one linked identity (author, org founder, homepage #founder section, LinkedIn sameAs).
- AuthorBio image was a 762 KB original rendered at 96px; now a 35 KB derivative.
- IndexNow key file added (public/88b3db4a3bda12ba58be7c939b415877.txt) so Bing gets pinged on every approved deploy from now on.

**Known and queued (see backlog):** header and footer trailing slashes (those files were mid-edit by another session on 17 July), Course schema on programme pages, "revision planner" wording on /revision-tracker/, og blocks on the remaining inner pages, page-specific Twitter cards, title-length trims, sitemap lastmod for static pages, /study-systems/ and /subject-accelerators/ description rewrites, /subject-accelerators/ thin content (673 words on the page every blog CTA points at), and the subjects inconsistency (site-wide copy says Biology, Chemistry, Maths and Physics; the Subject Accelerators page sells three of the four: needs Waleed's answer, see section 10).

## 4. What the winners do that we do not

Eight teardowns on 17 July 2026 (PMT, Save My Exams, MyTutor, Kumon UK, Seneca, MyEdSpace, Up Learn, Tutorful with Superprof), each grounded in their live sitemaps, robots.txt, llms.txt and schema plus verified sample searches. Four adversarial re-checks all came back CONFIRMED. The full agent transcripts are in the 17 July workflow journal; this is the distilled read.

**The shared engine: one intent, one URL, mirrored to the spec.** Every winner runs a strict, predictable URL hierarchy that matches how students phrase queries: Save My Exams runs tens of thousands of spec-mirrored note pages (291 leaves counted on a single subject and board hub), PMT roughly 5,400 pages plus a decade of PDFs, MyEdSpace 964 resource pages, Seneca board-and-tier hubs, Up Learn 148 per-topic lesson pages, MyTutor 768 programmatic money pages, Tutorful 56,315 subject-by-town pages. None of that raw scale is copyable and none of it should be chased. What IS copyable: MyEdSpace proves the small operator's version works. They build ONE exam board deep per subject instead of all boards shallow, and their AQA-only Biology hub outranked both Save My Exams and PMT in our verified check of "aqa a level biology revision notes". Depth in one lane beats breadth.

**E-E-A-T is the giants' shared soft spot.** PMT's page-level author is literally "admin" and its blog is unbylined. Kumon's 448 blog posts are anonymous. MyTutor's blog author schema points at a Gravatar and, on Tutorful, at a dead author page. Seneca's notes are authored by "Seneca Learning". Up Learn has two author archives and names no founder on its about page. The only one doing it properly is Save My Exams: written-by plus reviewed-by named humans with Person schema and credentials on every note. A practising doctor with MBBS on every byline, a real author entity and an author page competes on the axis all of them except SME have ceded.

**AEO plumbing: we are already ahead of seven of the eight.** Fetched on 17 July 2026: PMT, MyTutor, Kumon, Seneca, MyEdSpace, Up Learn and Tutorful ALL have no llms.txt (404s across the board) and no AI-crawler rules of any kind; they are visible to AI by default, not by design. Save My Exams is the exception and the model: a real, hand-curated llms.txt, explicit AI-crawler allowances, LearningResource schema, visible "last updated" dates. alevelaccelerators.com already has the llms.txt, the named AI-crawler robots policy, and the author schema. The plumbing gap to SME that remains: visible last-reviewed dates with honest dateModified, and their glossary-style question-shaped leaf pages.

**Reviews are the citation currency of "best" queries.** MyTutor's roughly 3,900 Trustpilot reviews and MyEdSpace's four-figure count are what the "best A-level tutoring UK" listicles (Avalon, TutorChase and peers) and, through them, AI answers actually cite. We have zero review presence on any platform. The listicles themselves are a second route: being featured in them puts the brand on SERPs it cannot yet rank for directly.

**The lanes the giants abandoned are our fastest lanes.** Verified: MyTutor's blog has had nothing modified since October 2025 and has no 2026 exam-dates content; Seneca runs almost no dated content; the marketplaces are entirely absent from the method, timetable and resit SERPs we checked. Meanwhile Up Learn takes two top-10 slots on resit queries with a dated-plus-evergreen page pair, which is precisely the shape our resitting post (357 impressions, position 21) should grow into. And the "is a level tutoring worth it" SERP is the weakest commercial-adjacent SERP we found anywhere: a solo tutor's blog, a Pakistani ed blog, a UGC piece and a 2017 forum thread. Fresh, honest, doctor-bylined answers walk into these SERPs.

**Subject-level commercial queries are winnable by small specialists.** Verified: solo sites with exact-match domains hold the number one estimated positions for "a level biology tutor" (alevelbiologytutor.com) and "a level maths tutor" (thealevelmathstutor.co.uk), ahead of every marketplace. Generic "a level tutor" belongs to marketplaces and is not worth attacking head-on; "[subject] a level tutor" responds to dedicated subject landing pages, which we do not have.

**What we deliberately do not copy:** resource-hosting at PMT scale, past-paper libraries, programmatic town pages, tutor-inventory marketplaces, Kumon's 750 physical-centre pages, paid-ads-driven volume. Wrong fights for a one-doctor brand.

## 5. Keyword opportunity map

Current state sources: GSC = Search Console position (ground truth, 7 to 15 July); sweep = 17 July SERP estimate; absent = not found in either. Difficulty is judged from who verifiably holds the SERP today. Opportunity weighs demand signals, winnability and business value together.

**Cluster P1: resits and retakes (fastest real traffic).** Winners today: Save My Exams, StudentCrowd, distance-learning colleges (ICS Learn, CloudLearn, Oxbridge Home Learning), Up Learn's dated pair. No marketplace presence. We already have impressions on 40+ variants.

| Keyword | Intent | Difficulty | Opportunity | Current state | Action |
|---|---|---|---|---|---|
| resit a levels / a level resits | informational-commercial | moderate | high | GSC 20 to 31 | Backlog 3: grow the post into the dated resit hub |
| how much does it cost to resit an a level | informational | easy | high | GSC 9.0 | Direct cost table + answer paragraph |
| a level resit dates 2026 (and 2027) | informational | easy | high | absent | Dated section inside the hub |
| when are a level resits | informational | easy | high | GSC 11.8 | Same dated section |
| can you retake a levels at any age | informational | easy | medium | GSC 10.0 | FAQ entry with direct answer |
| do you have to pay to resit a levels | informational | easy | medium | GSC 14.2 | Cost section |

**Cluster P1: predicted grades (already page 1, push to top).** Winners: UCAS, Save My Exams, small edu blogs; our post is position 4 to 7.

| Keyword | Intent | Difficulty | Opportunity | Current state | Action |
|---|---|---|---|---|---|
| how to improve predicted grades | informational | easy | high | GSC 7.4, sweep 4 | Backlog 5: freshness pass, tighten the quick answer |
| can your predicted grades change in year 13 | informational | easy | high | GSC 9.0 | Direct answer block |
| when are predicted grades finalised | informational | easy | high | GSC 11.0, sweep 7 | Direct answer block |
| what to do if predicted grades are too low | informational | easy | medium | GSC 21.0 | Section + internal link from diagnostic |

**Cluster P1: revision planning and the tracker.** Winners: CGP, Get Revising, timetable-maker tools, Canva. Tool pages rank here, and we have a better tool than any of them.

| Keyword | Intent | Difficulty | Opportunity | Current state | Action |
|---|---|---|---|---|---|
| a level revision planner | informational-tool | moderate | high | GSC 32.5 (88 impressions) | Backlog 4: the page never says "planner" |
| a level revision timetable | informational-tool | moderate | high | GSC 31.5 | Tracker page + timetable post pair |
| revision timetable maker | tool | moderate | high | GSC 66 | Tracker page wording + named-asset play (backlog 21) |
| how many hours a day should i revise for a levels | informational | easy | high | GSC 8.0 to 22 | Freshness pass on the hours post |
| year 12 summer revision | informational | easy | high | GSC 6.3, sweep 2 | Hold and strengthen; internal links each August |

**Cluster P2: methods (blurting is ours to take).** Winners: Birmingham City University, NCC, small tutor blogs. No giant owns method queries.

| Keyword | Intent | Difficulty | Opportunity | Current state | Action |
|---|---|---|---|---|---|
| blurting / blurting method / what is blurting | informational | easy | high | GSC 10 to 58 | Freshness + the printable template as the linkable hook |
| best way to revise for a levels | informational | moderate | high | GSC absent, sweep absent | Strengthen existing post; QuickAnswer rewrite |
| a level revision techniques | informational | moderate | medium | absent | Same post family, internal links |
| active recall revision a level | informational | easy | medium | absent | New post in a methods wave |
| how to revise for a level biology / chemistry / maths / physics | informational | moderate | high | absent | Backlog 7: four subject guides; winners are small sites |

**Cluster P2: tutoring decision (the buyer-adjacent lane).** Winners on "worth it": one-person blogs and a 2017 forum thread. Winners on "[subject] tutor": exact-match solo specialists ahead of marketplaces.

| Keyword | Intent | Difficulty | Opportunity | Current state | Action |
|---|---|---|---|---|---|
| is a level tutoring worth it | commercial-informational | easy | high | absent (weakest SERP found) | Draft exists in the wave pipeline; ship in next wave |
| one to one a level tutoring | commercial-informational | moderate | high | GSC 14.9 | Freshness pass on the existing post |
| how much does a level tutoring cost | commercial-informational | easy | high | absent | Backlog 19: honest cost post |
| a level biology tutor (and per subject) | commercial | moderate | medium-high | absent | Backlog 20: subject landing pages, needs Waleed |
| best a level tutoring uk | commercial | hard directly | medium via listicles | absent | Backlog 22: get INTO the roundups |

**Cluster P2: results season (13 August).** Winners: UCAS, universities, The Uni Guide; the wave 1 posts are indexed and ready to catch the surge. Action: backlog 12 freshness pass in early August; every hour of that week matters.

**Cluster P3 (watch, do not chase yet):** "a level courses online" (verified intent mismatch: distance-learning qualification providers, not revision courses), generic "a level tutor" (marketplace wall), parent long-tails ("how to help my child revise for a levels": currently won by Save My Exams and school sites; our parent lane posts in the wave pipeline will be measured here before more is built).

## 6. The strategy

Three moves, in order of speed to payoff:

1. **Win the queries Google already half-trusts us for.** Positions 8 to 35 on resits, predicted grades, blurting, revision hours and revision planning are the cheapest traffic available: strengthen those pages (freshness, better answers, internal links from new related posts), fix the redirect-hop drag, and let the site's rising trust do the rest. This costs nothing but batches.
2. **Build the clusters the audience actually searches.** The blog pipeline's waves 2 to 4 already point at the right territory (parents, tutoring-worth-it, UCAS); the audit adds subject-specific revision guides ("how to revise for a level biology/chemistry/maths/physics") where the current winners are small sites, and a results-season push timed for 13 August. Every cluster page links to the diagnostic or tracker, which are the conversion machines.
3. **Earn the citations answer engines run on.** AI recommendations quote Reddit threads, review platforms, comparison listicles and specific answer-shaped pages, not homepages. That means: Trustpilot or Google reviews existence (Waleed's decision), the already-planned Reddit answer lanes, the free tools as linkable assets, and Bing Webmaster Tools + IndexNow so the half of the AI world that reads Bing can see the site at all.

## 7. The backlog (the optimiser's queue)

Statuses: **queued**, **in batch (awaiting approval)**, **live**, **blocked**, **needs Waleed**. The weekly run works from the top of each priority band.

| # | Item | Why | Status |
|---|------|-----|--------|
| 1 | Trailing slashes + FAQ HTML + og fixes + schema entity + IndexNow key (the 17 July batch) | Removes crawl drag and makes FAQ answers visible to AI crawlers | in batch (awaiting approval) |
| 2 | Header + footer trailing slashes (blocked 17 Jul by the error-log session's open edits) | The two site-wide offenders left | queued |
| 3 | Freshness and answer pass on /blog/resitting-a-levels/ (dates table for 2026 and 2027, cost table, direct answers to the near-miss cost and date queries) | 357 impressions at position 21; the single biggest near-term traffic win | queued |
| 4 | "Revision planner" wording into /revision-tracker/ title, description and body | 88 impressions at position 32 for a query the page never says | queued |
| 5 | Freshness pass on predicted-grades and year-12-summer posts (already page 1; push to top 5) | Positions 6 to 7 with real impressions | queued |
| 6 | Course + CourseInstance schema on /summer-accelerators/ and /subject-accelerators/ | Live courses with zero Course markup; rich-result eligibility | queued |
| 7 | Subject revision guide posts: biology, chemistry, maths, physics ("how to revise for a level X") | Winners are small sites; we have zero subject-specific pages; feeds Subject Accelerators | queued (wave rules apply) |
| 8 | og blocks for remaining inner pages + page-specific Twitter cards | Complete the share-card fix | queued |
| 9 | Bing Webmaster Tools verification + sitemap submission | Bing barely indexes the site; Bing feeds ChatGPT and Copilot | needs Waleed (10 minutes, instructions in section 10) |
| 10 | Trustpilot (or Google Business Profile) decision and first reviews | Review platforms are what AI recommendations cite for "best tutoring" questions | needs Waleed |
| 11 | /subject-accelerators/ content deepening (673 words on the default CTA target) + description rewrite | Thin money page | queued (copy needs his sign-off anyway) |
| 12 | Results-day cluster freshness for 13 August (dates, Clearing hours, appeal deadlines verified) | The biggest search moment of the year | queued for early August |
| 13 | /about/ founder page (the entity page for Dr Waleed: credentials, method, press-ready bio) | E-E-A-T anchor for every author byline; AI engines resolve the person | queued (new page, needs his approval of the copy) |
| 14 | Title-length trims on the five over-60-char titles (not the homepage) | Truncated titles in results | queued |
| 15 | Sitemap lastmod for static pages, honest dates only | Minor crawl signal | queued |
| 16 | llms.txt upkeep line for the error-log tool once that branch merges | Keep the AI map current | blocked (waits on that merge) |
| 17 | dateModified discipline plus a visible "Last reviewed" line on posts | Save My Exams' freshness pattern; every post currently shows dateModified = datePublished | standing rule from batch 3 on |
| 18 | Retrofit the extractable-answer pattern across all 17 posts (question-form titles where honest, direct first-40-words answers) | Verified as what gets pages lifted into AI search groundings | queued |
| 19 | "How much does A-level tutoring cost in 2026?" post with an honest rates table | Tutorful and MyTutor rank with pricing pages; half the near-miss resit queries are cost queries; feeds the same buyers | queued (needs his price sign-off) |
| 20 | Per-subject tutoring landing pages (Biology, Chemistry, Maths, Physics) | Verified: solo exact-match specialists outrank marketplaces on "[subject] a level tutor"; we route everything to one generic page | needs Waleed (new public pages) |
| 21 | Name the tracker as a searchable product and title its page for "revision planner / timetable maker" | PMT proves named assets convert brand searches into rankings; pairs with backlog 4 | needs Waleed (naming decision) |
| 22 | Get INTO the "best A-level tutoring UK" listicles (Avalon, TutorChase and peers): drafts via the partnership-outreach skill | The AI-answer groundings for "best" queries flow through those third-party roundups; drafts only, he sends | queued (draft-only) |
| 23 | Honest comparison and alternatives posts (how we differ from Save My Exams, Seneca, MyEdSpace and tutoring marketplaces) | MyEdSpace ships vs-posts weekly; nobody has written ours yet; own the comparison before someone else frames it | queued (copy needs his sign-off) |
| 24 | Glossary experiment: a small set of definition pages for A-level Biology and Chemistry terms with schema | Seneca's tiny definition pages rank and get AI-cited; cheap test of the question-shaped leaf pattern | queued (after wave 2) |
| 25 | Single-board-deep notes hub experiment (one subject, one board, 20 to 30 real pages) | MyEdSpace's AQA-only Biology hub verifiably outranks Save My Exams and PMT; the one scale play that works small | strategic, gated on waves 2 to 4 shipping first |
| 26 | Success-story page template, filled after results day with named, consented student outcomes | Kumon's 28 story pages rank for commercial queries; becomes possible the week real results exist | queued for August (needs consent process) |
| 27 | GCSE-to-A-level transition hub with PDF for late August (GCSE results 20 August) | Up Learn verifiably owns this family with a guide-plus-download pair; fits the GCSE secondary-tier rule | queued (needs his nod on audience stretch) |

## 8. Tracked keyword basket (weekly spot checks)

Commercial: a level tutor, a level tutoring, online a level tutor uk, best a level tutoring uk, a level biology tutor, a level chemistry tutor, a level maths tutor, is a level tutoring worth it.
Resits: resit a levels, a level resits, how much does it cost to resit a levels, retaking a levels, when are a level resits.
Methods: best way to revise for a levels, blurting method, a level revision techniques, how to revise for a level biology, how to revise for a level chemistry, how to revise for a level maths.
Planning: a level revision timetable, a level revision planner, revision timetable maker, how many hours a day should i revise for a levels, year 12 summer revision, how to prepare for year 13.
Results and UCAS: a level results day 2026, how to improve predicted grades, when are predicted grades finalised, a level appeals 2026, what to do if you fail a levels.
Parents: how to help my child revise for a levels, my child is failing a levels what can i do, a level tutor for my child.

## 9. Answer-engine probe questions (weekly, rotate 3 to 5)

- best a level tutoring uk
- best online a level revision resources
- how should i revise for my a levels
- is a level tutoring worth the money
- best a level revision websites 2026
- what is the blurting method revision
- best way to prepare for a level exams

Baseline 17 July 2026: the site appears in none of them. Winners per probe are recorded in section 4's teardown; the pattern is that small, specific, answer-shaped pages and review platforms get cited, not big homepages, which is exactly the kind of content this site already writes.

## 10. What needs Waleed personally

1. **Approve the 17 July batch** (say the word and a session merges it; nothing deploys until then).
2. **Bing Webmaster Tools, about 10 minutes:** go to bing.com/webmasters, sign in (Google sign-in works), choose "Import from Google Search Console", approve, and the site plus sitemap import automatically. This is the single cheapest AI-visibility action available: ChatGPT and Copilot read Bing's index.
3. **Reviews decision:** Trustpilot free profile, Google Business Profile, or neither. "Best tutoring" AI answers cite review platforms constantly; we currently have zero review presence anywhere. Recommendation: Trustpilot free, ask the March cohort parents for honest reviews after results day.
4. **Subjects question:** the Subject Accelerators page sells Biology, Chemistry and Maths; the rest of the site says Biology, Chemistry, Maths and Physics. Which is right? One answer, then everything aligns in one batch.
5. **The /about/ page (backlog 13):** worth a yes in principle now; copy comes to you for sign-off before it ships.

## 11. Change log

- 2026-07-17: document created from the first full audit (this session). First technical batch built and awaiting approval. Optimiser skill + weekly Monday scheduled task live. Sections 4 and 5 filled the same day from the verified competitor teardown; backlog extended to 27 items.
