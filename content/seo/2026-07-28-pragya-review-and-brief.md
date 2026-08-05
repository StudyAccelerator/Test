# Pragya's reports: evaluation and brief

**28 July 2026.** Waleed's SEO contractor (Pragya) sent ten documents on 20 July. This is the standing record of what each contained, what was adopted, what was declined and why, plus the brief Waleed can send her. Future optimiser runs treat her weekly reports the same way: evaluate against the roadmap, adopt what survives the honesty and voice rules, record the rest here.

## Document verdicts

| Document | What it is | Verdict |
|---|---|---|
| Overview PDF (Ahrefs site audit, 17 Jul) | Health score 100/100, 0 errors, 141 warnings | Confirms our own audit. Its top warnings (redirect-hop links, OG gaps, IndexNow) were fixed in the 17 July batch, live since 28 July |
| Ahrefs Report xlsx | Crawl detail behind the overview | Same. The four single-inlink pages drove the related-posts and blog-footer fixes in batch 2 |
| Weekly work reports x2 (20 Jul) | 28 to 31 links built: directories, social profiles, Crunchbase, Skool, Goodreads, Behance reposts | Mixed. Crunchbase, Product Hunt and Skool profiles are keepers. Most of the rest is low-value, several placements are junk, and nearly all point at the www domain. Brief below redirects the effort |
| Schema Suggestion for all Pages | Per-page WebSite schema with a SearchAction | Declined. The site has no /search page (fake SearchAction is a known bad practice), the @ids mix www and non-www, and the premise that pages lack structured data is wrong |
| Schema Suggestion for Non Target Pages | Replace existing schema with WebPage + bare Organization | Partly adopted. WebPage blocks added to /parents/, /faqs/ and /newsletter/ in batch 2. Replacing EducationalOrganization with plain Organization declined: it is a downgrade |
| Meta Suggestion (target pages) | New homepage title/H1, study-systems title | Declined. Built on a stale crawl (lists the pre-redesign homepage), and the homepage title and H1 are protected: "Top grades are a system, not a talent" is the brand, and "Expert Online A-Level Tutors in UK" reframes us as a tutor listing. Study-systems copy rewrite stays on the backlog, in our voice |
| Meta Suggestion (non-target pages) | Diagnostic title, parents H1 | Declined as written. Her diagnostic title drops the hook. Parents H1 change rejected by Waleed (28 Jul). Her general instinct (question-form parent titles) is already how the page works |
| Non Target Pages Optimization | FAQ topic lists for /faqs, /revision-diagnostic, /parents | The most useful document. Several topics adopted in batch 2, written from scratch in Waleed's voice. Topics that assume features we do not offer (parent progress dashboards, instalment plans) were skipped |
| llms (1).txt | Her proposed llms.txt | Declined. The live one is richer, and hers has a bug (the Newsletter line points at the diagnostic URL) |

**Alt text note:** her audit flags 27 images missing alt text. Checked the source on 28 July: every content image carries a descriptive alt; the flagged instances are decorative images with deliberately empty alt (correct accessibility practice). No action, by design.

**Link risk note:** the current link mix (nofollow UGC profiles, obscure directories) is near-zero value rather than dangerous at this volume. The waste is the hours. If the volume of junk-directory placements grows month over month, revisit this call.

## The brief for Pragya (Waleed sends this, edited as he likes)

Subject: Link building: three changes from this week

Hi Pragya,

Thanks for the reports and the weekly work log. Three changes to how we do links from here, and a note on the on-site suggestions.

1. Every link should point at https://alevelaccelerators.com/ (no www). The www links in this week's report all pass through a redirect before they reach the site.

2. Please stop the generic directory and profile placements (the ceramics studio profile, rpgmaker, coub and similar). They add nothing for an A-level tutoring brand and at volume they look spammy. Crunchbase, Product Hunt and Skool are fine, keep those maintained.

3. Point the effort at placements that actually move this market instead: features or guest contributions on UK education and parenting blogs; getting A-Level Accelerators included in the "best A-level tutoring UK" roundup articles (Avalon Education and TutorChase both publish these); UK education directories with editorial standards; and school or teacher resource pages linking our free tools (the Revision Diagnostic and Revision Tracker are genuinely useful free tools, which is the honest pitch). Quality over count: I would rather have 2 real placements a week than 30 profiles.

In the weekly report, please mark each link dofollow or nofollow and whether the page is indexed.

On the on-site suggestions: useful direction, and I have taken several of the FAQ topics. The site's schema, metadata and llms.txt are managed in code and most of what the audits flagged is already implemented, so please keep on-site items as suggestions rather than files to upload. Two specifics: we will not add WebSite schema with a SearchAction (the site has no search page), and the homepage title and H1 stay as they are.

Thanks,
Waleed

## Standing rules for future Pragya reports

1. Links point at the non-www domain; flag any report that does not.
2. Her crawls lag the site: verify any "missing" item against the live site before acting.
3. On-site changes never come from her files directly; they go through the optimiser and the voice rules.
4. Her FAQ and content-topic suggestions are the valuable part; her schema and meta rewrites mostly are not.
5. Never hand over Search Console, GA or repo access; she works from public crawls and reports.

## Round 2: the 1 August delivery (14 files)

Her reply to the brief was constructive: non-www links from now on (verified: the 1 August work report points links at the non-www domain, several deep-linking to /subject-accelerators/ and the predicted-grades post), dofollow/nofollow column promised, on-site items now understood as suggestions.

**Resends, byte-identical to 20 July (no new information):** both Schema Suggestion docs, the Ahrefs Overview PDF, Non Target Pages Optimization, Meta Suggestion for non-target pages. Their "pending" items are pending because they were evaluated and declined, with reasons, in round 1 above.

**Resends with trivial changes (same stale 17 July crawl underneath):** the target-pages Meta Suggestion (still lists the pre-redesign homepage as "existing", still pushes the protected homepage title/H1 change: declined again), the AI SEO Audit (still 10/100, still claims WebSite and EducationalOrganization schema are missing: false since 10 July), the Ahrefs detail xlsx. None of her crawls postdate the 28 July deploys.

**New documents and verdicts:**

| Document | Verdict |
|---|---|
| Weekly work report 1 Aug (31 links) | Behaviour genuinely improved: non-www targets, deep links, and the predicted-grades backlink twin syndicated across Medium, Blogspot, WordPress, Notion and similar (exactly what the twins exist for). Quality still mixed (driving-schools.com and a nurses forum profile are noise). PRIVACY FLAG: at least one directory listing (bizify) publishes the SM7 1NQ home postcode Waleed asked to keep private; ask her to remove or genericise any listing carrying the full address or postcode |
| New Pages Suggestion (10 pages) | Her best document. Converges with our own backlog: About (our backlog 13), success stories and reviews pages (our backlog 26 and the Trustpilot plan, post results day), privacy and terms (drafts exist in content/legal-drafts, Waleed's gate, now more pressing with Meta ads live). Contact page and pricing page are genuine new candidates for Waleed's yes/no. Declined: "Our Teaching Method" page (duplicates /study-systems) and "Our Results" before real results data exists (honesty rule). "Meet Our Team" waits for the Physics hire and tutor consent |
| Home Page Optimization | Declined: same protected title/H1 push (and a GCSE FAQ for a product that does not exist). Notably her own heading-structure analysis of the homepage found nothing to change |
| Heading Structure Optimization | Declined in substance: proposes replacing strong in-voice H1s with generic SEO strings. One trivial point (cohort-date heading level on /study-systems) noted |
| FAQ Suggestion for Pages | Partly adopt: usable new FAQ topics for /subject-accelerators (time commitment, materials, multi-subject enrolment) and /study-systems (personalisation, vs a normal timetable, time management). Queue for batch 4, written in Waleed's voice, truthful answers only |
| Competitor Analysis (SEMrush) | Confirms direction, adds little: StudyMind 203K organic visits, PMT 84K, Tutorful 55K vs our ~0 in SEMrush's index. Their "0 traffic, 0 keywords" for us contradicts GSC ground truth (32 clicks, 1,550 impressions, 93 queries to 26 July): third-party indexes lag tiny sites badly. DA 1 and 14 backlinks recorded; the strategic picture stays the one in the verified 17 July teardown |


## Round 3: the 3 August weekly report (26 links)

Both instructions from the brief landed this week: every link targets the non-www domain, and the promised dofollow/nofollow column is in the report (14 dofollow, 12 nofollow). Article and web 2.0 syndication (13 links) all push the year-12-summer backlink twin, which is the right page at the right time (our number 2 ranking page, in season). Volume fell from 31 to 26 with the paid-guest-post categories gone, consistent with her note that quality placements mostly cost money.

Still unresolved, chase again: the bizify listing still publishes the home address and postcode in its structured data (verified live 3 August). This is the priority ask in the next message to her, above anything link-related.

Quality gap unchanged: zero real placements yet (education blogs, listicle inclusions, school resource pages); the one audience-relevant domain this week is a UK parenting blog profile. Decision recorded: the high-value outreach lane (the "best A-level tutoring" and "best revision websites" roundups, backlog items 22 and 28) moves in-house via the partnership-outreach skill, drafts for Waleed to send; Pragya gets a concrete target list rather than another abstract steer, and next week's syndication should switch to the results-day twins ahead of 13 August.
