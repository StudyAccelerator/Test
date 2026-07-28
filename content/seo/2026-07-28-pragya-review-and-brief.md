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
