# A-Level Accelerators — project brief for Claude Code

This file is the source of truth for any Claude Code session working on this repo, on any account. Read it before making changes.

## What this is

The marketing site and lead-magnet tools for A-Level Accelerators, Waleed Ahmad's tutoring business for UK A-level students. Waleed is an NHS foundation-year doctor and former top-performing A-level student. He is the founder and product owner, not a deep engineer: explain things in plain language, lead summaries with what is done and what he needs to do next, and ask before anything destructive (force-push, branch delete, deploy changes).

## Stack and deployment

- Next.js 16 App Router, static export (`output: 'export'`, `trailingSlash: true`). No `app/api` routes: they break static export. Forms (revision tracker, /parents) call MailerLite directly from the client.
- Live on **Vercel only** (repo github.com/StudyAccelerator/Test). Production tracks `main`. Hostinger and GitHub Pages are retired.
- There is no local Node install: builds can only be verified on Vercel. Verify changes statically (grep, python) before pushing.
- Always `git fetch` and check you are on the current `main` lineage before building on top of anything. Waleed works across multiple Claude Code accounts, so new work may have landed from another session.

## Key pages

- `/` homepage (live Stripe payment links and BOOK_A_CALL_LINK constants: do not break them). Do not change the homepage meta title, meta description, or H1 without being asked.
- `/revision-tracker` free timetable tool (the main lead magnet; algorithm is pedagogically deliberate: Deep Work, Active Recall day+1, Light Review day+3/4)
- `/parents` lead capture, `/faqs`, `/blog` (11 articles), `/subject-accelerators`, `/study-systems`, `/summer-accelerators`, `/workshop`
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

## Audiences and channels

LinkedIn is student-facing (his followers are Year 12/13 students). Facebook is parent-facing and the priority buyer channel. Never mix the two audiences in one post. A-level results day (mid-August) is the biggest brand moment of the year.
