---
name: weekly-content-pack
description: Produce the full following week of LinkedIn (students) and Facebook (parents) posts for A-Level Accelerators, with visuals made or fully briefed, driven by a fresh snapshot of where the business is that week. Runs every Friday via the scheduled task weekly-content-pack-friday, or on demand ("build next week's content pack"). Nothing it produces is ever scheduled or posted; Waleed approves every pack.
---

# Weekly content pack | the Friday routine

You are producing a complete, ready-to-approve week of social content for A-Level Accelerators. The deliverable Waleed expects: every post for the following Monday to Sunday, each built for its platform and audience, varied in angle across the days, visuals attached or fully briefed, good enough to post close to as-is. He approves the pack before anything goes anywhere; this routine NEVER schedules or publishes.

Read `content/social/README.md` for folder conventions, and the MOST RECENT previous pack (`content/social/<latest date>/pack.md` and its `research-notes.md`) so the new week builds on what ran, rather than repeating it.

## Hard rules (inherited, non-negotiable)

- All copy through the `content-studio` skill rules: Waleed's voice, zero em or en dashes, no banned AI vocabulary, no invented statistics, British English, approved proof points only. Run the compliance scan before finishing (dash/curly-quote/banned-word scan over the pack file).
- LinkedIn is the STUDENT channel, Facebook the PARENT channel. Never mix audiences in one post.
- Links never go in post bodies; always first comments.
- No grade-outcome claims until Waleed has results data (August 2026 at the earliest; check whether that has changed).
- The honesty rule: if a number cannot be traced to a real source that week, it does not appear.

## Step 1: fresh snapshot (never skip, never assume)

The week's direction comes from where the business ACTUALLY is that Friday, not from a hardcoded priority. Gather, in parallel where possible:

1. `git fetch` and fast-forward main; note anything new that changes offers, dates or pages.
2. Waleed's brief: if his request names a push, that wins. Otherwise infer from the snapshot and say so in the pack.
3. MailerLite live: group counts (the API key is in `lib/mailerlite.ts`; GET https://connect.mailerlite.com/api/groups). Compare against the previous pack's baselines to see what moved.
4. The live site's money pages: cohort start dates on /summer-accelerators and /subject-accelerators, anything time-sensitive. Flag any date that contradicts the repo brief as a DECISION for Waleed.
5. The calendar: distance to results day (Thu 13 Aug 2026), term dates, UCAS milestones. These set urgency and topic.
6. Last week's performance: whatever Waleed replied with, plus `dashboard/data/linkedin.json` if fresh. Double down on what won.
7. Idempotency: if `content/social/<next Monday>/pack.md` already exists and is complete, do NOT rebuild it. Report that it is ready, list its decision points, and stop.

## Step 2: light research refresh

The deep baseline lives in the latest `research-notes.md` (first compiled 15 July 2026: niche profiles Henry Li, James Chen, Rumi Abukar, James Rutland; algorithm mechanics for both platforms). Weekly, do a LIGHT refresh: if Chrome tools are available, glance at what the named profiles posted this week and what won; run one or two web searches only if something looks changed. Monthly (or when a week's numbers land far off expectations), re-run the full research pass with background agents and rewrite the baseline. Copy the baseline notes forward into the new week's folder, appending the delta and its date.

## Step 3: structure the week

Default engine (adjust from evidence, not habit):

- **LinkedIn, ONE post EVERY day (Mon to Sun) at 4:30pm UK** (Waleed's standing instruction, 15 July 2026): weekly mix of 2 to 3 story/confession, 3 to 4 value (at most one de-branded document carousel, 8 to 9 slides), exactly 1 lead-magnet/harvest post, and lighter reflective posts at the weekend. The week should be one argument told from seven angles, each post standing alone. Hooks under 12 words, one sentence per line, specific numbers over adjectives, zero hashtags, a genuine question or promise-to-reply as the close. Never two posts in one day.
- **LinkedIn visuals (Waleed's correction, 16 July 2026): real photos of him from the repo `Photos ` folder, 4:5 crops, matched to each post's story, with at most one line of light shadow-text on a minority and NO branded cards ever.** Product screenshots and the de-branded carousel are the only designed exceptions. Provide the bare photo alongside any text version.
- **Facebook, ONE PAGE post EVERY day at 9:30am, conversation-first (Waleed's correction, 16 July 2026):** every post is a conversation starter ending in a genuine question a parent can answer (advice-asks, normalisation asks, this-or-that, confessions, kitchen-table photo asks). Broadcast "here's a fact" posts are banned. Text-only by default; real phone photos only. Under 130 words. Parent diagnostic links use `/revision-diagnostic/?for=parents`, first comment only.
- **Facebook GROUPS are the real engine:** every pack includes a groups playbook section (model: the 2026-07-20 pack section 7): per-day group actions, unique post drafts per group honouring the rules in `content/facebook-groups/2026-07-15-facebook-groups-and-parent-competitors.md`, comment-first sequencing for anywhere Waleed is new, evening timing (7:30 to 8:30pm), the 80/20 rule, and the three sanctioned routes for the diagnostic (requested answer, admin-sanctioned AMA, open-promo groups). Waleed executes group actions personally; nothing is ever posted for him.
- Include one optional 30 to 60 second face-to-camera video script per week (Reels reach non-followers; it is the zero-follower page's only organic discovery surface).
- Seasonal arcs override defaults: results-day week (13 Aug) and the run-up get support-led content pre-written days early; launch weeks get honest launch posts with a swap-in variant if a date is uncertain.

## Step 4: write, then scan

Write every post ready-to-paste: full copy, first-comment text, posting time, visual reference. Provide swap-in variants for any decision Waleed has not made yet, clearly boxed. Then run the compliance scan (the previous packs contain the python one-liner) and fix anything it catches.

## Step 5: visuals, made not promised

- Brand cards and carousels: HTML sources in `content/graphics-src/week-<date>/` following the existing card CSS (purple #2E2557, gold #C9A96E, cream #FBF8F3, Georgia serif), rendered to `content/graphics/week-<date>/` with headless Chrome (`--screenshot` at 1080x1350 or 1080x1080, `--print-to-pdf` for carousels with @page size). VISUALLY CHECK every render (Read the PNGs) for overflow before calling it done.
- Real product screenshots beat cards with students: capture the live site with puppeteer-core (pattern in the 2026-07-20 scratchpad script: mobile 390-wide viewport, wait ~5s for entrance animations, exact-ratio viewports for square shots). Never complete the email gate or write test data into MailerLite while capturing.
- Posts that need Waleed's face get a precise photo brief (setting, framing, what it must show) AND an always-available rendered fallback card. A brief with no fallback is not done.

## Step 6: assemble and hand over

1. `content/social/<next Monday>/pack.md`: snapshot, decisions needed, week table with rationale, posting mechanics, every post day by day, variants, measurement list for next week.
2. Publish an HTML artifact preview of the week (one section per day, copy plus visuals inline) so Waleed can review from his phone. Reuse the same artifact URL week to week if updating an existing one.
3. Commit to main and push (content only; never touches site pages).
4. Final summary to Waleed: lead with where the pack is and the decisions only he can make; list what each day does in one line each; remind him nothing is scheduled and what to log after the week runs.
5. Automatic upkeep per CLAUDE.md: if any business fact changed, update the brief, memory and the Cowork skill zip in the same pass.
