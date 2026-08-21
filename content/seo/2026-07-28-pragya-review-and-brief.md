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

## Round 4: the 10 August weekly report (70 links, evaluated 11 August)

Volume jumped from 26 to 70 links, but the report is a regression on two standing rules and repeats the privacy problem, so the reply to Pragya is firmer this round.

**Kept from the brief:** the dofollow/nofollow column is present throughout (a rough count gives 38 dofollow, 32 nofollow). Article Submission (10 links) and Web 2.0 (8 links) target the non-www domain and push real content (the blurting post syndicated to Medium, Blogspot, WordPress, Notion, HackMD and similar, which is what the twins exist for). A branded Substack now exists (alevelaccelerators.substack.com) carrying the year-12-summer piece.

**Problem 1, privacy (the priority):** instead of removing the address, this week ADDS listings carrying it. The ZeeMaps listing has the home postcode in the listing itself (SM7 1NQ, Banstead is visible in the URL), and the YPlocal listing files the business under Banstead. The bizify listing flagged on 1 and 3 August was still live at last check. The reply makes address removal a stop-work condition on new listings.

**Problem 2, www regression:** five of the nine categories (Local Work, Social Profiles, Social Bookmarking, Business Listings, Thematics: 39 links) point at https://www.alevelaccelerators.com/ again, undoing the fix she held for two weeks. Deep links also drop the trailing slash (/study-systems, /subject-accelerators), adding a second redirect hop.

**Problem 3, padding:** the webmastersun profile is counted in both Social Profiles (as nofollow) and Social Bookmarking (as dofollow); the same Diigo note pattern appears twice. The Web 2.0 sheet lists blurting-article posts but records the target as the year-12-summer URL, so the labelling cannot be trusted without opening the links. The Syndication sheet is mostly tier-2 links pointing at her own placements (Buzzbii posts linking to the Medium article), not at the site.

**Quality mix unchanged:** "Local Work" and "Thematics" are generic profile pages on unrelated sites (a car show site, a therapy directory, a weather research forum, a design school), the pattern the 28 July brief asked her to stop. Zero real placements again.

Reply drafted 11 August (supersedes the 8 August draft; the two were merged): address removal first and confirmed before any new listings, non-www restated with trailing-slash examples, double-counting flagged, quality-over-count restated, and next week's articles switch to the results-day pieces before Thursday 13 August.

## Round 5: the Google Drive on-page folder (reviewed 12 August)

Pragya consolidated her on-page suggestion documents into one Drive folder (13 files, same titles as the 20 July and 1 August deliveries) and asked whether the changes have been made. Full read of every suggestion document on 12 August. Verdict: **nothing in the folder requires a site change.** Everything valid was already shipped, everything else was declined with recorded reasons in rounds 1 and 2.

**Partially refreshed:** the Home Page Optimization doc, Heading Structure doc, Non Target Pages doc and AI SEO Audit now describe the CURRENT site (post 2 August deploys: correct homepage meta, September 9 cohort date, current diagnostic copy), the first time her documents have worked from the real pages. Her own heading analysis now concludes the homepage and subject-accelerators H1s need no changes.

**Still stale:** the target-pages Meta xlsx quotes the pre-redesign homepage; the New Pages doc still proposes contact, pricing, privacy and terms pages that have been live since 2 August; the tracker "missing H1" and "wrong meta description" findings and the /faqs/ doubled title were all checked against the live site on 12 August and are already correct (single H1, planner description, clean title). Standing rule 2 (her crawls lag; verify before acting) held again.

**Still declined, same reasons:** homepage title/H1 replacement (protected brand copy); WebSite schema with SearchAction (no /search page exists; her suggested code even targets a nonexistent https://www.alevelaccelerators.com/search URL and mixes www @ids); downgrading EducationalOrganization to bare Organization; generic-SEO H1 rewrites on study-systems; trimming existing FAQ sections down to 6 to 8 questions (the 12-FAQ pages are deliberate); the GCSE FAQ (no GCSE product); her shorter diagnostic meta title (drops the hook).

**Already implemented before this folder existed:** FAQ additions from her topic lists (batches 2 and 4), WebPage schema on /parents/, /faqs/ and /newsletter/ (batch 2), contact and pricing pages (live 2 August), privacy and terms (live 2 August), FAQ answers rendered in static HTML.

Her AI audit still reports "10/100, never cited by AI platforms", which is contradicted by measured ground truth (107 Copilot citations, 63.64% citation share on "best ways to revise for A Level", GA4 AI Assistant channel recording sessions). Treat that scoring as her tool's sales template, not measurement.

## Round 6: the Upwork chat sweep, 13 August (first run of the pragya-upwork-review skill)

Her three messages of 13 August, worked through with every file opened and every claim verified:

**1. Address removals: genuinely underway, one miss.** She reported removing the address-carrying backlinks and sent six proof screenshots. Independently verified the same day: the ZeeMaps marker is deleted (the map group's marker API returns empty), the YPlocal listing is deactivated ("not Public or Active"), and the bizify listing appears gone (direct URL 404, site search finds nothing). Still live at verification time: **VyMaps (https://vymaps.com/GB/a-level-accelerators-vn162948/) shows SM7 1NQ and Banstead four times** even though it sat in her own 10 August report. Chase in the reply; per skill rules, no removal is confirmed until seen clean.

**2. alevelaccelerators.zip (7 MB): the same 13 suggestion documents with the URLs de-www'd, no new substance.** Verified by parsing every file: visible text now uses the non-www domain (a few leftover www strings sit in embedded hyperlink targets and in the Ahrefs/Competitor crawl data). The target-pages Meta xlsx STILL quotes the pre-July homepage as "existing" despite her 12 August promise to re-crawl. Nothing in the zip changes any round 1 to 5 verdict; nothing to implement.

**3. Her two clarifications, answered.** The subject-accelerators and study-systems FAQs differing from her exact suggestions is intentional and standing policy: her topic lists are direction, all copy is written in Waleed's voice with truthful answers, and suggested topics assuming features that do not exist are skipped. Her claim that she "never suggested search box schema" is contradicted by her own corrected files sent the same day: both the Home Page Optimization doc and the Schema Suggestion for all Pages doc contain WebSite schema with a potentialAction SearchAction targeting a /search?q= URL that does not exist on the site (and still on the www domain). The declined verdict stands; the rest of her page schema is already implemented in code or is a downgrade.

Operational note: the `pragya-upwork-review` skill (`.claude/skills/pragya-upwork-review/SKILL.md`) now owns this routine end to end: read the chat via Claude in Chrome (read-only), open everything, verify claims against live pages, append the round here, draft the reply. Upwork attachments download via the attachment URL in the message (a plain click on the chip does not download).

## Round 7: the 18 August weekly report (reviewed 21 August)

Chat check first: **the round 6 reply drafted on 13 August was never sent.** The chat shows nothing from Waleed between 12 August and his 21 August "I will review today and update you on the FAQs". Consequences: Pragya was never told about VyMaps, her FAQ and schema clarifications sat unanswered (she chased on 21 August), and no confirmation of the address cleanup reached her. The 21 August reply draft merges everything owed.

**The report (31 links): her most compliant week yet on format.** Every single link target is the non-www domain, blog targets carry trailing slashes, deep pages too (/study-systems/, /subject-accelerators/): the first fully clean week since the rule was set. The dofollow/nofollow column is complete (rough count 22 dofollow). And there are NO listing or local-work categories at all: she genuinely paused new listings as instructed on 12 August.

**The big miss: the results-week pack went unused.** All 17 article and web 2.0 placements push the how-many-hours post; not one of the four results-day articles she was sent on 12 August (and acknowledged) was placed, despite "make these articles the whole of this week's work". The results wave (13 to 20 August) is now over; the moment is gone. The reply names this plainly and redirects September syndication to the predictions-season articles (predicted-grades twin, plus the choose-a-tutor and one-to-one-worth-it twins as buying-decision season starts).

**Address status at 21 August:** ZeeMaps clean, YPlocal deactivated, bizify gone (302s away). **VyMaps still publishes SM7 1NQ and Banstead** (verified live 21 August), unsurprising since the flag never reached her. It is the priority ask again, with the note that listings can resume once it is clean.

**Minor accuracy notes:** one Notion link in the web 2.0 sheet is actually the Year 12 summer twin but is labelled with the hours-post URL; sitelike.org is recounted from the 10 August report. Quality mix otherwise still profile-heavy (a rationality forum, a screen-sharing app, a 3D-model host); italki is at least education-adjacent; still zero real education/parenting placements, the standing gap that the in-house listicle outreach now covers.
