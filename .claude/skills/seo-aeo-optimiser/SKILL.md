---
name: seo-aeo-optimiser
description: Own the organic growth of alevelaccelerators.com | take a fresh visibility snapshot (Search Console, live SERP spot checks, AI answer probes), keep the SEO and AEO roadmap current, and carry out the next approved batch of on-site work on a branch for Waleed to sign off. Runs weekly via the scheduled task seo-aeo-optimiser-weekly, or on demand ("run the SEO optimiser", "how are my rankings", "SEO sweep", "what should we ship next for SEO"). Nothing goes live without Waleed's approval.
---

# The SEO and AEO optimiser

This routine owns organic growth for alevelaccelerators.com on two fronts: classic search (Google, Bing) and answer engines (ChatGPT, Perplexity, Google AI Overviews, Claude, Copilot). It measures where the site actually stands, keeps the plan honest and current, and does the next piece of work itself, on a branch, so Waleed only has to say yes.

The two working documents, both surfaced on the HQ Playbooks panel:

- `content/seo/2026-07-17-seo-aeo-assessment-and-roadmap.md` | the strategy: where we stand, the keyword map, the ranked backlog. The backlog section is the optimiser's queue; item statuses live there.
- `content/seo/visibility-log.md` | the dated measurement log. Every run appends one entry. This is the only place ranking numbers are recorded, so trends are provable.

Read both before doing anything.

## The hard rules (never break these)

1. **Waleed signs off before anything goes live.** All site changes happen on a branch named `claude/seo-optimiser-<yyyy-mm-dd>`, never on `main`. The batch is done when it is committed, build-checked and reported to him. Merging to main happens only when he approves, in his words, in a session. Never push to main, never merge, never deploy.
2. **One batch in flight at a time.** If a previous optimiser branch is still unmerged and awaiting his decision, do not start another site-changing batch. Measure, update the docs, draft content in `content/seo/drafts/` if useful, and stop.
3. **Never invent a number.** Search Console is ground truth. WebSearch result ordering is an estimate and is always labelled "estimate" in the log. If a check fails, log the failure, not a guess. A missing number beats a fake one.
4. **Respect the standing site rules** (CLAUDE.md is the source of truth): do not change the homepage meta title, meta description or H1; do not touch Stripe payment links or any MailerLite group id or form call; do not rename or delete page URLs; do not add app/api routes (static export); do not publish the legal drafts. Any of those ideas go on the backlog as "needs Waleed's explicit instruction", not into a batch.
5. **Content rules are mandatory** for anything written: Waleed's voice per `.claude/skills/content-studio/`, British English, zero em or en dashes, no AI-tell vocabulary, no invented statistics, no grade-outcome claims before August 2026 results exist. Run `python3 scripts/compliance-scan.py` on every content file touched. New blog posts follow the full pipeline rules in `content/blog-pipeline/2026-07-16-seo-aeo-content-pipeline.md`: registry entry in `lib/posts.ts`, staggered publish dates, backlink twin, wave-style approval.
6. **Off-site actions are draft-only.** Never create accounts, submit directory listings, send outreach, or post anywhere. Where the plan needs an off-site step (Bing Webmaster Tools verification, a directory listing, a partnership link), write Waleed exact instructions or a draft and flag it in the report.
7. **Leave other sessions' work alone.** Untracked files and dirs you did not create (draft blog folders, tools in progress) are another session's work in progress. Never commit, edit or delete them.

## The weekly run

### Step 1: measure

Take the visibility snapshot. Three sources, in this order:

1. **Google Search Console** (ground truth). Use Claude in Chrome against Waleed's logged-in Google account, read-only. Property `sc-domain:alevelaccelerators.com`. Pull from the Performance report (last 28 days once enough history exists; the property only has data since 7 July 2026): total clicks, total impressions, average position, and the query table sorted by impressions (rows-per-page 100). Also note indexed page count from the Page indexing report, and whether the Links report has data yet. URL pattern that works: `https://search.google.com/search-console/performance/search-analytics?resource_id=sc-domain:alevelaccelerators.com&num_of_months=3&metrics=CLICKS,IMPRESSIONS,CTR,POSITION&breakdown=query` (and `breakdown=page`). If Chrome is closed or logged out, record "GSC: unavailable this run" and move on.
2. **SERP spot checks** (estimates). WebSearch the tracked basket in the roadmap doc's "Tracked keyword basket" section. Record whether alevelaccelerators.com appears and roughly where, and who holds the top 3. These are US-skewed result lists, not literal UK SERPs: always label them "estimate".
3. **AEO spot probes** (estimates). Run 3 to 5 of the roadmap's answer-engine probe questions through WebSearch and record which domains dominate the grounding results and whether the site appears. Once a quarter, also re-check Bing indexation (`https://www.bing.com/search?q=site%3Aalevelaccelerators.com` via WebFetch).

Append one dated entry to `content/seo/visibility-log.md` in the existing format. Compare against the previous entry and name the movers in plain language.

### Step 2: groom the backlog

Update the roadmap doc:

- Mark shipped items done (with the date and commit), note anything blocked.
- Re-rank the backlog if the data changed the picture (a query cluster suddenly getting impressions moves its item up; GSC positions 8 to 20 are the fastest wins and stay at the top).
- Add new opportunities the measurement surfaced, each with the evidence line that justifies it.
- Never delete a backlog item silently; mark it "retired" with a reason.

### Step 3: do the next batch

If no optimiser branch is awaiting approval, take the top unblocked backlog item (or a coherent group of small ones) and build it:

1. `git fetch origin` and branch from `origin/main`: `git checkout -b claude/seo-optimiser-<date> origin/main`.
2. Make the change. Technical and schema work happens directly; content work follows the content rules above.
3. Check it: `npm run build` must pass clean; run the compliance scan on touched content; if the change is visible, verify it in the browser via the dev server (`next-dev` in `.claude/launch.json`).
4. Commit with a message that says what the batch does and which backlog items it covers. Do not merge.
5. Mark the items "awaiting approval" in the roadmap doc (that edit rides on the same branch).

What a batch may contain without asking first (approval still gates going live): metadata and schema improvements, internal linking fixes, llms.txt updates, image alt text, sitemap improvements, new blog post drafts written to pipeline rules, improvements to existing blog posts (freshness passes, better answers, internal links). What a batch may never contain: anything on the hard-rules list, page deletions or renames, new public pages that change what the business claims to offer (draft those and ask).

### Step 4: report

End with a plain-language summary for Waleed: what moved since last week (or "quiet week, nothing moved"), what was shipped to the branch and what it should do, what is awaiting his approval and how to approve it ("say: merge the SEO branch"), and anything that needs him personally (off-site steps, decisions). If the run produced something that needs his action, send ONE PushNotification under 200 characters saying exactly what. A quiet week sends nothing.

## Approving a batch (for the session Waleed says yes in)

When Waleed approves: `git fetch origin`, merge the optimiser branch into `main` (fold in any newer main first), push, confirm the Vercel deploy went green, spot-check the live pages, then mark the items done in the roadmap doc and delete the merged branch. That follows the repo's standing session-branch rule: approved work never stays stranded on a branch.

After a confirmed deploy, ping IndexNow so Bing (which feeds ChatGPT and Copilot) picks the changes up fast. The key is the hex filename of the key file in `public/` (currently `88b3db4a3bda12ba58be7c939b415877`). One POST covers all changed URLs:

```
curl -s -X POST "https://api.indexnow.org/indexnow" -H "Content-Type: application/json" \
  -d '{"host":"alevelaccelerators.com","key":"88b3db4a3bda12ba58be7c939b415877","keyLocation":"https://alevelaccelerators.com/88b3db4a3bda12ba58be7c939b415877.txt","urlList":["https://alevelaccelerators.com/CHANGED-PAGE/"]}'
```

A 200 or 202 response means accepted; log the response code in the run summary.

## Quarterly deep pass

Roughly every 12 weeks (or when Waleed asks), re-run the full audit that produced the assessment doc: full SERP sweep across all clusters, competitor re-check (PMT, Save My Exams, MyTutor, MyEdSpace, Seneca, Up Learn and any new entrant), AEO surface re-probe, technical crawl. Rewrite the assessment sections of the roadmap doc with the new picture and re-rank everything. The multi-agent workflow pattern from the 17 July 2026 build is the template.

## Failure honesty

If a run cannot measure (Chrome closed, searches failing), it says so in the log and the report, and does not guess. If a build fails, the batch is not reported as ready; fix it or park it with the error in the report. If a ranking fell, the report says it fell. The optimiser's value is that Waleed can trust every number in it.
