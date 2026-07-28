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

**Status of the 17 July batch, checked 24 July 2026: still not live, still awaiting Waleed's approval.** Verified this run rather than assumed: `content/seo/` does not exist on `origin/main` at all, the IndexNow key file and the llms.txt Error Log line are absent from `main`, and `https://alevelaccelerators.com/error-log/` returns a 404. Everything below, plus the Error Log tool itself, sits on the unmerged branch `claude/error-log-tool`. One week of crawl benefit has been lost to the wait. See section 10, item 1.

**Fixed in the 17 July batch (built 17 July, awaiting Waleed's approval to go live):**

- 29 internal links missing trailing slashes across 20 files (each cost a 308 redirect hop on every click and crawl).
- FAQ answers on /faqs/ and /summer-accelerators/ existed only in JSON-LD, not in the rendered HTML: AI crawlers and Google's no-JS view never saw them. The shared accordion now renders every answer in the HTML.
- Blog articles had no og:image (Facebook and WhatsApp shares got no card image); all 17 articles and the blog index now send og-default.
- og:url on /parents/, /revision-diagnostic/ and /summer-accelerators/ pointed at the homepage; each now declares its own URL (these are the three pages parents actually share).
- Article schema had no image and the author Person pointed at a non-existent anchor; both fixed, with the founder entity now one linked identity (author, org founder, homepage #founder section, LinkedIn sameAs).
- AuthorBio image was a 762 KB original rendered at 96px; now a 35 KB derivative.
- IndexNow key file added (public/88b3db4a3bda12ba58be7c939b415877.txt) so Bing gets pinged on every approved deploy from now on.
- Late on 17 July, once the error-log session had committed its files: the remaining 22 slashless links in the header, footer, error-log and tracker pages fixed too (the built site now has zero slashless internal links anywhere), and llms.txt gained the Error Log line. Backlog items 2 and 16 folded into this same batch.

**Known and queued (see backlog):** header and footer trailing slashes (those files were mid-edit by another session on 17 July), Course schema on programme pages, "revision planner" wording on /revision-tracker/, og blocks on the remaining inner pages, page-specific Twitter cards, title-length trims, sitemap lastmod for static pages, /study-systems/ and /subject-accelerators/ description rewrites, /subject-accelerators/ thin content (673 words on the page every blog CTA points at), and the subjects inconsistency (site-wide copy says Biology, Chemistry, Maths and Physics; the Subject Accelerators page sells three of the four: needs Waleed's answer, see section 10).

## 4. What the winners do that we do not

Eight teardowns on 17 July 2026 (PMT, Save My Exams, MyTutor, Kumon UK, Seneca, MyEdSpace, Up Learn, Tutorful with Superprof), each grounded in their live sitemaps, robots.txt, llms.txt and schema plus verified sample searches. Four adversarial re-checks all came back CONFIRMED. The full agent transcripts are in the 17 July workflow journal; this is the distilled read.

**The shared engine: one intent, one URL, mirrored to the spec.** Every winner runs a strict, predictable URL hierarchy that matches how students phrase queries: Save My Exams runs tens of thousands of spec-mirrored note pages (291 leaves counted on a single subject and board hub), PMT roughly 5,400 pages plus a decade of PDFs, MyEdSpace 964 resource pages, Seneca board-and-tier hubs, Up Learn 148 per-topic lesson pages, MyTutor 768 programmatic money pages, Tutorful 56,315 subject-by-town pages. None of that raw scale is copyable and none of it should be chased. What IS copyable: MyEdSpace proves the small operator's version works. They build ONE exam board deep per subject instead of all boards shallow, and their AQA-only Biology hub outranked both Save My Exams and PMT in our verified check of "aqa a level biology revision notes". Depth in one lane beats breadth.

**E-E-A-T is the giants' shared soft spot.** PMT's page-level author is literally "admin" and its blog is unbylined. Kumon's 448 blog posts are anonymous. MyTutor's blog author schema points at a Gravatar and, on Tutorful, at a dead author page. Seneca's notes are authored by "Seneca Learning". Up Learn has two author archives and names no founder on its about page. The only one doing it properly is Save My Exams: written-by plus reviewed-by named humans with Person schema and credentials on every note. A practising doctor with MBBS on every byline, a real author entity and an author page competes on the axis all of them except SME have ceded.

**AEO plumbing: we are already ahead of seven of the eight.** Fetched on 17 July 2026: PMT, MyTutor, Kumon, Seneca, MyEdSpace, Up Learn and Tutorful ALL have no llms.txt (404s across the board) and no AI-crawler rules of any kind; they are visible to AI by default, not by design. Save My Exams is the exception and the model: a real, hand-curated llms.txt, explicit AI-crawler allowances, LearningResource schema, visible "last updated" dates. alevelaccelerators.com already has the llms.txt, the named AI-crawler robots policy, and the author schema. The plumbing gap to SME that remains: visible last-reviewed dates with honest dateModified, and their glossary-style question-shaped leaf pages.

**Reviews are the citation currency of "best" queries.** MyTutor's roughly 3,900 Trustpilot reviews and MyEdSpace's four-figure count are what the "best A-level tutoring UK" listicles (Avalon, TutorChase and peers) and, through them, AI answers actually cite. We have zero review presence on any platform. The listicles themselves are a second route: being featured in them puts the brand on SERPs it cannot yet rank for directly.

**The lanes the giants abandoned are our fastest lanes.** Verified: MyTutor's blog has had nothing modified since October 2025 and has no 2026 exam-dates content; Seneca runs almost no dated content; the marketplaces are entirely absent from the method, timetable and resit SERPs we checked. Meanwhile Up Learn takes two top-10 slots on resit queries with a dated-plus-evergreen page pair, which is precisely the shape our resitting post (357 impressions, position 21) should grow into. And the "is a level tutoring worth it" SERP is the weakest commercial-adjacent SERP we found anywhere: a solo tutor's blog, a Pakistani ed blog, a UGC piece and a 2017 forum thread. Fresh, honest, doctor-bylined answers walk into these SERPs.

**Subject-level commercial queries are winnable by small specialists.** Verified: solo sites with exact-match domains hold the number one estimated positions for "a level biology tutor" (alevelbiologytutor.com) and "a level maths tutor" (thealevelmathstutor.co.uk), ahead of every marketplace. Generic "a level tutor" belongs to marketplaces and is not worth attacking head-on; "[subject] a level tutor" responds to dedicated subject landing pages, which we do not have.

*Updated 28 July 2026 (estimates, from two weeks of spot checks):* **Save My Exams has built an advice hub across almost every cluster in section 5, and the 17 July read of the competitive picture needs correcting on this one point.** Its `/learning-hub/` has now appeared holding top estimated results for A-level resit dates, blurting method, results day, helping your child revise, revision timetables and best revision websites: six distinct sections, matching six of our clusters. The lanes above are still worth taking, and the reasons they are winnable (thin generic incumbents, no named author, no dated freshness on most of them) still hold for everyone except SME. What changes is the honest expectation: on the method, planning, parents and results clusters we are now competing against an established hub rather than walking into empty SERPs, so the pages that win will be the ones that answer one specific question better than a hub page does, not broader guides. Section 4's E-E-A-T read is unaffected and matters more than before: SME is the one competitor doing authorship properly, so the doctor byline is the axis that still separates us from them.

**What we deliberately do not copy:** resource-hosting at PMT scale, past-paper libraries, programmatic town pages, tutor-inventory marketplaces, Kumon's 750 physical-centre pages, paid-ads-driven volume. Wrong fights for a one-doctor brand.

## 5. Keyword opportunity map

Current state sources: GSC = Search Console position (ground truth, 7 to 15 July); sweep = 17 July SERP estimate; absent = not found in either. Difficulty is judged from who verifiably holds the SERP today. Opportunity weighs demand signals, winnability and business value together.

**Cluster P1: resits and retakes (fastest real traffic).** Winners today: Save My Exams, StudentCrowd, distance-learning colleges (ICS Learn, CloudLearn, Oxbridge Home Learning), Up Learn's dated pair. We already have impressions on 40+ variants.

*Updated 24 July 2026 (estimate):* the "no marketplace presence" reading no longer holds. Tutorful now takes the top estimated slot on both the resit cost query and the 2027 resit dates query, and Save My Exams has published a dedicated A-level resit dates page covering 2026 and 2027. The lane is still winnable (the incumbents are thin and generic) but it is filling up. Backlog 3 gets more urgent, not less.

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

**Cluster P2: methods (blurting is still ours to take, but a giant has arrived).** Winners: Birmingham City University, NCC, Online Learning College, small tutor blogs.

*Updated 24 July 2026 (estimate):* Save My Exams now ranks a blurting page in this SERP, so "no giant owns method queries" is out of date. The rest of the cluster (active recall, revision techniques, per-subject method guides) is still held by small sites, and the printable blurting template remains a linkable asset none of the incumbents have.

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
| 1 | Trailing slashes + FAQ HTML + og fixes + schema entity + IndexNow key (the 17 July batch) | Removes crawl drag and makes FAQ answers visible to AI crawlers. **28 July: the case is now measured, not argued.** GSC shows impressions split across 14 duplicate www and slashless URLs, the slashless variants often ranking better than the canonical ones (/revision-tracker 9.5 against /revision-tracker/ 22.3), and Google's "page with redirect" count up from 5 to 13. Direct fetch confirms a two-hop 308 chain | **live 28 July 2026** (merged, deployed, IndexNow pinged for all 28 URLs, HTTP 202) |
| 2 | Header + footer trailing slashes (unblocked once the error-log session committed) | The two site-wide offenders | **live 28 July 2026** |
| 3 | Freshness and answer pass on /blog/resitting-a-levels/ (dates table for 2026 and 2027, cost table, direct answers to the near-miss cost and date queries) | 357 impressions at position 21; the single biggest near-term traffic win. **24 July: Tutorful and Save My Exams now hold the cost and dates queries (estimate), so the window is closing** | queued, top of the queue for the next batch |
| 4 | "Revision planner" wording into /revision-tracker/ title, description and body | 88 impressions at position 32 for a query the page never says | **live 28 July 2026** (batch 2: title, description, og and WebApplication name) |
| 5 | Freshness pass on predicted-grades and year-12-summer posts (already page 1; push to top 5) | Positions 6 to 7 with real impressions | queued |
| 6 | Course + CourseInstance schema on /summer-accelerators/ and /subject-accelerators/ | Live courses with zero Course markup; rich-result eligibility | queued |
| 7 | Subject revision guide posts: biology, chemistry, maths, physics ("how to revise for a level X") | Winners are small sites; we have zero subject-specific pages; feeds Subject Accelerators | queued (wave rules apply) |
| 8 | og blocks for remaining inner pages + page-specific Twitter cards | Complete the share-card fix | partly live 28 July (tracker and newsletter og shipped in batch 2); Twitter cards and study-systems/subject-accelerators og still queued |
| 9 | Bing Webmaster Tools verification + sitemap submission | Bing barely indexes the site; Bing feeds ChatGPT and Copilot | in progress 28 July: import attempted via his Chrome, stopped at the Google password screen (credentials are his alone). One password entry away; the tab flow is bing.com/webmasters, Sign in with Google, Import from Search Console |
| 10 | Trustpilot (or Google Business Profile) decision and first reviews | Review platforms are what AI recommendations cite for "best tutoring" questions | needs Waleed |
| 11 | /subject-accelerators/ content deepening (673 words on the default CTA target) + description rewrite | Thin money page | queued (copy needs his sign-off anyway) |
| 12 | Results-day cluster freshness for 13 August (dates, Clearing hours, appeal deadlines verified) | The biggest search moment of the year. **28 July: the season has already started.** GSC shows "a level results day 2026" at position 9.8, "jcq embargo 2026" at 10.0 with 9 impressions, "when does a level results come out 2026" at 9.0, plus 39 impressions on /blog/a-level-appeals-2026/ and 18 on /blog/a-level-results-day-parents-guide/, all of it three weeks before the day | **queued, joint top of the queue with item 3** (moved up 28 July on the evidence above) |
| 13 | /about/ founder page (the entity page for Dr Waleed: credentials, method, press-ready bio) | E-E-A-T anchor for every author byline; AI engines resolve the person | queued (new page, needs his approval of the copy) |
| 14 | Title-length trims on the five over-60-char titles (not the homepage) | Truncated titles in results | queued |
| 15 | Sitemap lastmod for static pages, honest dates only | Minor crawl signal | queued |
| 16 | llms.txt upkeep line for the error-log tool | Keep the AI map current | retired 28 July: the Error Log was pulled from the site the same day it went live (Waleed: it returns as a PAID add-on); its llms.txt line, nav links, sitemap entry and page were all removed, /error-log/ redirects to the tracker |
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
| 28 | Get the three free tools into the "best revision websites" roundups (MasteryMind, TutorChase, Revision World, and Save My Exams' own list): drafts via the partnership-outreach skill | Verified 24 July: these roundups are what the "best a level revision websites 2026" answer groundings run on, they list free tools rather than tutors, and the diagnostic and tracker are exactly that shape (the error log left the free tier on 28 July). A separate lane from item 22, which targets the tutoring roundups | queued (draft-only, he sends) |
| 29 | After the merge: IndexNow ping for /error-log/ and the changed pages, then confirm the tool actually indexes | The page, its sitemap entry and its llms.txt line are all built and correct on the branch; they simply are not in production, so the tool earns nothing and 404s to anyone who finds it | overtaken 28 July: item 1 merged, but the Error Log was removed the same day (paid add-on decision), so the ping covered its removal instead; all 28 sitemap URLs submitted to IndexNow |
| 30 | Take down or noindex `workshop.alevelaccelerators.com` | Verified 28 July: the subdomain returns HTTP 200, serves a page titled "Free A-Level Skills Workshop" with no noindex tag, and collected 19 impressions at position 4.6 in the 7 to 26 July window. The `/workshop/` path redirect works (308 to the homepage), so the July retirement was only half done and the subdomain was never taken down. The site is ranking well for a product that does not exist | **needs Waleed** (hosting and DNS, outside what a batch may touch) |

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

1. **Approve the 17 July batch. This is now the one thing blocking everything else.** Verified again 28 July: still unmerged, none of it live, and the optimiser cannot start a second batch while it waits. Eleven days. Search Console has now put numbers on what the batch fixes: impressions split across 14 duplicate URLs, slashless variants outranking the canonical ones, and the redirect bucket up from 5 pages to 13. Merging it also takes the **Error Log tool** live, which is stacked on the same branch and currently 404s in production. Two decisions in one: say "merge the SEO branch" if you want both, or say which of the two you want held back and a session will split them.
2. **The workshop subdomain is still live, and it ranks.** `workshop.alevelaccelerators.com` returns a working page titled "Free A-Level Skills Workshop", with no noindex, sitting at position 4.6 in Google with 19 impressions in the last three weeks. The `/workshop/` path on the main site redirects correctly, so this is the leftover half of the retirement. It needs taking down or pointing at the homepage wherever that subdomain is hosted, which only you can do. Until then the best-positioned thing on the property advertises something you do not run.
3. **Bing Webmaster Tools, about 10 minutes:** go to bing.com/webmasters, sign in (Google sign-in works), choose "Import from Google Search Console", approve, and the site plus sitemap import automatically. This is the single cheapest AI-visibility action available: ChatGPT and Copilot read Bing's index.
4. **Reviews decision:** Trustpilot free profile, Google Business Profile, or neither. "Best tutoring" AI answers cite review platforms constantly; we currently have zero review presence anywhere. Recommendation: Trustpilot free, ask the March cohort parents for honest reviews after results day.
5. **Subjects question:** the Subject Accelerators page sells Biology, Chemistry and Maths; the rest of the site says Biology, Chemistry, Maths and Physics. Which is right? One answer, then everything aligns in one batch.
6. **The /about/ page (backlog 13):** worth a yes in principle now; copy comes to you for sign-off before it ships.

## 11. Change log

- 2026-07-28: THE BATCH WENT LIVE. Waleed approved; the 17 July batch, the optimiser docs and two measurement runs merged to main and deployed; IndexNow pinged all 28 URLs (202). Side effect caught and fixed the same evening: the branch carried the Error Log tool, which Waleed had since decided is a paid add-on, so it briefly went live and was removed within the hour (page, nav, sitemap, llms.txt, FAQ mention, MailerLite wiring; /error-log/ now redirects to the tracker). A stale-branch check rule was added to CLAUDE.md and the skill. Batch 2 then shipped on claude/seo-optimiser-2026-07-28 and merged the same evening on his instruction: three new /faqs questions (founder, UK-wide, parent hours) plus the subjects answer corrected to his ruling (Subject Accelerators = Biology, Chemistry, Maths; Physics is Summer only for now), two new diagnostic FAQs, a four-question FAQ section with FAQPage and WebPage schema on /parents/, WebPage schema on /faqs/ and /newsletter/, "revision planner" targeting on the tracker (item 4), blog index description trim, diagnostic title trimmed to 68 chars via absolute title, CourseCTA subjects fixed, the blog footer gained a Parents' Guide link, and related-posts became category-aware to spread internal links to the starved posts. Pragya's ten documents were evaluated (verdicts and her brief: 2026-07-28-pragya-review-and-brief.md); her alt-text flags confirmed as deliberate decorative empties, no action.

- 2026-07-17: document created from the first full audit (this session). First technical batch built and awaiting approval. Optimiser skill + weekly Monday scheduled task live. Sections 4 and 5 filled the same day from the verified competitor teardown; backlog extended to 27 items.
- 2026-07-28: weekly run 3. Search Console pulled successfully (7 to 26 July: 32 clicks, 1,550 impressions, position 14.4, 93 queries, 29 pages indexed, links report still processing). Growth is real but the rate has slowed to about a third of the first nine days, with holidays and reporting lag as honest caveats. Three new facts from the page table: duplicate www and slashless URLs are splitting impressions with the slashless variants often ranking better (a measured case for merging the 17 July batch), `workshop.alevelaccelerators.com` is still live at HTTP 200 and ranking at position 4.6 for a retired product, and the results-day cluster is already earning impressions three weeks early. Five SERP checks and three answer-engine probes run as estimates; Bing still unmeasurable behind a bot challenge. Recorded that Save My Exams' learning hub now holds top results across six of our clusters, which retires the audit's "no giant owns method queries" read. Backlog 30 added (workshop subdomain, needs Waleed), backlog 12 moved to joint top of the queue; no site-changing batch built, per the one-batch-in-flight rule.
- 2026-07-24: weekly run 2. Search Console unavailable (Chrome not connected), so no ground-truth numbers this week and none invented. Ten SERP spot checks and three answer-engine probes run as estimates; log entry in `visibility-log.md`. Confirmed by direct fetch that the 17 July batch is still not on main and that /error-log/ 404s in production. Two competitive changes recorded: Save My Exams has entered both the resit-dates and blurting SERPs, and Tutorful now leads the resit cost query. Backlog items 28 (revision-website roundups) and 29 (post-merge IndexNow for the error log) added; no site-changing batch built, per the one-batch-in-flight rule.
