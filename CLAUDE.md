# A-Level Accelerators — project brief for Claude Code

This file is the source of truth for any Claude Code session working on this repo, on any account. Read it before making changes.

## What this is

The marketing site and lead-magnet tools for A-Level Accelerators, Waleed Ahmad's tutoring business for UK A-level students. Waleed is an NHS foundation-year doctor and former top-performing A-level student. He is the founder and product owner, not a deep engineer: explain things in plain language, lead summaries with what is done and what he needs to do next, and ask before anything destructive (force-push, branch delete, deploy changes).

## Stack and deployment

- Next.js 16 App Router, static export (`output: 'export'`, `trailingSlash: true`). No `app/api` routes: they break static export. Forms (revision tracker, /parents) call MailerLite directly from the client.
- Live on **Vercel only** (repo github.com/StudyAccelerator/Test). Production tracks `main`. Hostinger and GitHub Pages are retired.
- Node v24 and npm are installed on Waleed's Mac (since July 2026) and `node_modules` is installed. Run the dev server via `.claude/launch.json` (`next-dev`, port 3000) and verify changes visually in the browser before pushing; a static scan (grep, python) is still a good second check.
- Always `git fetch` and check you are on the current `main` lineage before building on top of anything. Waleed works across multiple Claude Code accounts, so new work may have landed from another session.

## Key pages

- `/` homepage, redesigned July 2026 as a programme hub: H1 "Top grades are a system, not a talent.", hero graphic cluster (grade climb + offer card + graduation photo), three programme cards, method sections, founder story, testimonial wall, dark final CTA. No prices on the homepage. BOOK_A_CALL_LINK constant: do not break it. Do not change the homepage meta title, meta description, or H1 without being asked.
- `/summer-accelerators` the full Summer Accelerator sales page (former homepage): live Stripe payment links live HERE now, pricing, 13 FAQs + FAQ JSON-LD, sticky mobile buy bar. Do not break the Stripe links.
- Testimonials are one shared system: quotes in `lib/testimonials.ts`, section component `components/home/testimonial-wall.tsx` (used on homepage and /study-systems). Edit quotes once there.
- `/revision-diagnostic` the flagship lead magnet (July 2026): 20-question study diagnostic. Engine and all copy in `lib/diagnostic.ts` (five system scores, seven archetypes, hours-leak maths, programme routing rules), UI in `components/diagnostic/`. Email-gated report; every completion writes the `diag_*` custom fields to MailerLite group "Revision Diagnostic" (constants in `lib/mailerlite.ts`) so leads can be segmented by bottleneck, grades, subjects and recommended route. Keep the routing honest to the diagnosis: never hard-wire every student to one programme. Free-tool suite roadmap: `content/lead-magnet-roadmap.md`. The post-diagnostic email sequence (16 emails, three variants branched on `diag_route`, plus the MailerLite build and deliverability guide) lives in `content/email-sequences/revision-diagnostic/`; edit copy there, not in MailerLite alone, so the repo stays the source of truth.
- `/revision-tracker` the second lead magnet, rebuilt July 2026 as a topic audit + week builder; cross-links both ways with the diagnostic. Scheduling engine is pure TypeScript in `lib/tracker/` (per-topic Struggling/Shaky/Solid ratings; weakest topics get the most sessions; hard weekly capacity cap with topics "parked for next week", never crammed; 6h free-day and 2.5h school-day study ceilings, consistent with the hours blog post; free days fill properly before anything parks: up to 3 deep blocks a day, late-week "starter cycles" (blurt + next-day recall, review carries to next week), and spare hours become bounded extra work for the weakest topics, including a second Blurt and Fix at least 2 days after the first (one blurt per topic per week is a soft rule, max two); every deep block keeps retrieval follow-up or the topic is parked). Sessions are Blurt and Fix (90 min), Active Recall (45), Spaced Review (30), plus one Timed Paper (60) per subject per week once its topics are introduced, defined once in `lib/tracker/techniques.ts` (labels, colours, how-to copy). UI in `components/tracker/`. The MailerLite signup (hardcoded key + group 187183128836573106 in `components/tracker/tracker-app.tsx`, fields name + year_group) must never change: the tracker email automation hangs off it. Lunch and dinner are hour-long anchors; sessions spread across morning/afternoon/evening in proportion (no cram-then-empty days); working days get one optional 60-min "Open Hour" block (student's choice: light work or a break) that sits on top of the 6h cap, is excluded from focused-study counts, and has its own explainer card in the method section. PNG poster download + print sheet + localStorage weekly carry-over.
- `/parents` lead capture, `/faqs`, `/blog` (11 articles), `/subject-accelerators`, `/study-systems`, `/workshop`
- Canonical domain everywhere: https://alevelaccelerators.com (non-www)

## Content rules (MANDATORY, no exceptions)

All written content (blog, social, PDFs, page copy) follows `.claude/skills/content-studio/` — use that skill for any content request. The non-negotiables:

- Written in Waleed's spoken voice (direct address, short emphatic sentences, contractions, personal confessions, medical framing like high-yield/low-yield and "diagnose before you treat", British English).
- **Zero em dashes or en dashes, ever.** Write "4 to 6 hours", never "4-6" with a dash character. No curly quotes in code strings.
- No AI-tell vocabulary (delve, crucial, robust, landscape, leverage, moreover, furthermore, comprehensive, seamless, unlock, elevate...), no "not just X, but Y", no rule-of-three padding. Reference: Wikipedia "Signs of AI writing".
- No invented statistics. Approved proof points only (see `.claude/skills/content-studio/references/audience-and-offers.md`). No grade-outcome claims yet: Waleed has no results data until August 2026.
- No "we match you with a tutor" marketplace framing. Waleed teaches; it is his method.
- Every blog article is written twice: the website version (repo) plus a fully rewritten backlink twin (`content/backlink-articles/`, never published on the site). Rules in `.claude/skills/content-studio/references/blog-dual-versions.md`.

## How to add a blog post

1. Add an entry to the top of the array in `lib/posts.ts`.
2. Create `app/blog/<slug>/page.tsx` copying an existing article's structure (metadata with canonical, faqs array, ArticleLayout from `components/blog/article-kit.tsx`).
3. `/blog` index and `app/sitemap.ts` pick it up automatically.
4. Run the compliance scan (dashes, curly quotes, banned words) before committing.
5. Write the backlink twin.

## The weekly newsletter (The Sunday Session)

The recurring student newsletter lives in `content/email-newsletter/`: README (cadence, format, MailerLite build guide, deliverability), dated issue files ready to paste into MailerLite, and the topic bank for future issues. Cadence is every Sunday 5pm UK, students only (parents group always excluded), sent from Waleed@alevelaccelerators.com. It is the "one email a week" the post-diagnostic sequence promises, so its existence is a commitment: sessions that change offers, dates or pages should check whether a drafted issue mentions them. Waleed approves every issue before it sends. Key date fact: A-level results day 2026 is Thursday 13 August (JCQ), not 14 August as some older docs said.

## Automatic upkeep (standing rule, applies to every session)

Waleed prefers automatic updates to memory, skills, and features over being asked to maintain them. Concretely:

1. **Cowork skill auto-refresh.** The file `cowork-skill/code-session-briefs/SKILL.md` contains a dated business snapshot used by Waleed's Claude Cowork HQ. (The skill is named code-session-briefs because Cowork rejects skill names containing the reserved word "claude".) If your session changes any business fact (new pages or offers, changed dates or prices, new marketing assets, results data arriving, changed standing rules), you MUST before ending the task: update the snapshot section and its date, re-zip it (`cd cowork-skill && zip -qr ~/Downloads/code-session-briefs-skill.zip code-session-briefs`), commit, and tell Waleed in your final summary that a refreshed skill zip is in his Downloads ready to re-upload to Cowork. Do this without being asked.
2. **Memory upkeep.** Update the persistent memory files in the same pass as the work, not when asked. Stale descriptions and index lines get corrected on sight.
3. **This file.** Treat CLAUDE.md the same way: if a session changes how the project works, update this brief as part of the change.

## Audiences and channels

LinkedIn is student-facing (his followers are Year 12/13 students). Facebook is parent-facing and the priority buyer channel. Never mix the two audiences in one post. A-level results day (mid-August) is the biggest brand moment of the year.
