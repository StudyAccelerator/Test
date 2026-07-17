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
- **Commercial queries are a different world:** for "a level tutor", "a level tutoring", "best a level tutoring uk" and every variant, the site is absent and the winners are marketplaces (MyTutor, Tutorful, Superprof, Preply) plus niche specialist sites. Verified by both the sweep and an adversarial re-check.

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

*(Being filled from the competitor teardown running today; the verified summary lands here.)*

## 5. Keyword opportunity map

*(Being filled from today's synthesis; the map lives here.)*

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
| 17 | dateModified discipline: bump only when a post genuinely changes, which freshness passes do | Forfeited freshness signal today (every post shows dateModified = datePublished) | standing rule from batch 3 on |

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

- 2026-07-17: document created from the first full audit (this session). First technical batch built and awaiting approval. Optimiser skill + weekly Monday scheduled task live. Sections 4 and 5 land the same day from the competitor teardown and synthesis.
