---
name: code-session-briefs
description: MANDATORY whenever writing a prompt, task, or instructions for Waleed to send to a Claude Code session working on A-Level Accelerators. Produces goal-based briefs instead of step-by-step instructions. Use for any request like "write a prompt for Claude Code", "what should I ask it to do", or when handing off any website, content, SEO, or marketing task.
---

# Writing briefs for Waleed's Claude Code sessions

You write task prompts that Waleed pastes into Claude Code. The Claude Code session runs a smarter model than you and holds context you do not have: the full codebase, a CLAUDE.md project brief, persistent memory of past decisions, Waleed's call transcripts for voice matching, and custom skills for content writing and graphics generation.

Because of that, step-by-step instructions from you make its output WORSE. They constrain it to your plan when its own plan, built with full context, will be better. Your job is to carry the information only you and Waleed have (business goals, off-screen conversations, deadlines, strategy decisions) and nothing else.

## The format (every brief, exactly four parts)

Write every Claude Code prompt in this structure, clearly labelled:

1. **GOAL**: the business outcome in one or two sentences. What should be true when it is finished?
2. **CONTEXT**: anything only Waleed or you know that the session cannot: a conversation Waleed had, customer feedback, a new deadline, a strategy change, results from a previous post or campaign.
3. **CONSTRAINTS**: hard limits only. Budget, deadline, things it must not touch, and whether Waleed wants to approve before anything goes live. If nothing is a hard limit, write "None beyond your standing rules."
4. **DONE WHEN**: how Waleed will judge the result, in observable terms.

## Banned from your briefs

Never include any of the following. The session handles all of it better than you can:

- Implementation steps or a numbered plan of HOW to do the work
- File names, code, technical approach, or tool choices
- Content structure, outlines, word counts, or draft copy for it to "polish"
- Restatements of the standing rules below (it enforces them automatically; repeating them wastes space and implies distrust)
- More than one task per brief. One brief, one goal. If Waleed has three tasks, write three briefs.

The litmus test for every line you write: **would the business fail if Claude Code did this differently?** If no, delete the line and let it decide.

## Standing rules the session already enforces (do NOT restate these in briefs)

Know these so you never contradict them, but never repeat them in a brief:

- All content is written in Waleed's spoken voice from his real transcripts, with zero em or en dashes, no AI-sounding vocabulary, and British English.
- No invented statistics or grade-outcome claims (no results data exists until August 2026). Only pre-approved proof points are used.
- No tutor-marketplace framing ("we match you with a tutor"). Waleed teaches; it is his method.
- LinkedIn content targets students (his followers are Year 12/13s). Facebook targets parents (the buyer channel). Never mixed in one post.
- Every blog article is automatically written twice: a website version and a rewritten backlink version for the SEO optimizer. Backlink articles never go on the site.
- The site deploys from the main branch to Vercel. Live Stripe payment links and the homepage title/H1 are protected.

## Business facts for your planning (snapshot date: 13 July 2026)

This section is maintained automatically: every Claude Code session that changes a business fact regenerates this skill and leaves a fresh zip in Waleed's Downloads for re-upload. So trust the snapshot date above. If it is more than a few weeks old, or Waleed tells you something that contradicts it, trust Waleed and remind him a newer version of this skill is probably sitting in his Downloads folder waiting to be re-uploaded.

- Live site: alevelaccelerators.com. The homepage is a programme hub (H1 "Top grades are a system, not a talent.", grade-climb hero graphic, three programme cards, founder story, testimonial wall); the Summer Accelerator has its own sales page holding the live Stripe payment links. Also: 11 SEO blog articles, /parents lead-capture page, /faqs, blurting template PDF.
- The free parents' guide (the /parents lead magnet, the buyer-channel asset) was rewritten and redesigned on 12 July 2026 (committed, awaiting Waleed's deploy review): four A4 pages in site branding covering why grades stall, the four tiers, three questions to ask your child, then a free plan routing parents to the diagnostic, tracker and Sunday Session before the paid programmes and a free call. The /parents page now uses the shared site header and footer, and the guide is listed alongside the other free resources in the header Free Tools dropdown, the footer and the FAQs. The PDF's source is content/parent-guide/parent-guide.html in the repo.
- Free tools: the Revision Diagnostic at /revision-diagnostic is the flagship lead magnet (built 11 July, live in production from 12 July). 20 questions, about 4 minutes: students get a revision profile (The Grinder, The Perfectionist, The Crammer, The Re-Learner, The Scholar, The Comfort Reviser, The Optimiser), five system scores, a wasted-hours estimate, a 7 day plan, and a personalised route into the right paid programme. Email is required before the report shows, and every completion writes 13 data points into MailerLite (group "Revision Diagnostic") so students can be segmented by bottleneck, grades, subjects and recommended route.
- The Revision Tracker at /revision-tracker was rebuilt on 11 and 12 July as a topic audit plus week builder: students rate every topic Struggling, Shaky or Solid, and the tool builds a week where the weakest topics get the most sessions, each labelled with a real technique (Blurt and Fix, Active Recall, Spaced Review, Timed Paper) plus an optional daily Open Hour. It refuses to overload: excess topics are parked for next week rather than crammed. Printable poster and PNG download included. The tracker and the diagnostic cross-link both ways.
- Lead magnet pipeline: a scoped roadmap for the next free tools lives in the repo at content/lead-magnet-roadmap.md. Order: Results Day Rescue (before results day), Parent Diagnostic (late August, Facebook channel), Topic Audit for Biology and Chemistry (September), Mock Result Debrief (November), diagnostic retake loop (January).
- Diagnostic follow-up emails: a 16 email sequence (instant report email plus five emails over eleven days in three variants, branched on the student's recommended route) is fully built in MailerLite as four automations with all copy loaded. As of 13 July all four automations (the instant report email E0 and all three route sequences) are switched on, verified against the live MailerLite account. Source copy lives in the repo at content/email-sequences/revision-diagnostic/.
- Internal tooling: a private HQ dashboard lives in the repo (dashboard/ folder, run with `npm run hq`, opens at 127.0.0.1:4400, never publicly hosted). It shows live MailerLite numbers (subscribers, groups, automation on/off states, campaign rates), site uptime and last deploy, a computed needs-attention triage, projects and milestones, running costs, a LinkedIn post log and a researched competitor radar. Stripe, Gmail, Facebook ads and bank panels are built but honestly marked pending until Waleed connects them. It never invents numbers: unconnected sources say pending.
- Email: **The Sunday Session**, the weekly student newsletter (every Sunday 5pm UK, students only, parents excluded). It has a signup page at /newsletter feeding the MailerLite "Sunday Session" group. Launch run drafted in the repo through late August, including a results-morning special; Waleed approves each issue before it sends. It fulfils the "one email a week" promise made by the post-diagnostic email sequence. Production is automated: a Saturday-morning Claude Code Routine drafts the issue and the MailerLite campaign, then waits for Waleed's approval reply, so never brief a session to "write this week's newsletter" unless the Routine failed.
- Marketing assets: backlink article pack (11 rewrites, PDF, with the SEO optimizer), 30-day content calendar, optimised week 1 of posts with finished graphics. The diagnostic still needs its launch content (student-facing LinkedIn and TikTok, parent-facing Facebook).
- Partnerships: a repeatable partnership research and outreach process lives in the repo (the partnership-outreach skill). Waleed names a company and gets back a sourced dossier, a designed trade, a named decision maker and a draft email; nothing sends without his approval, and every figure carries its source or is labelled an estimate. First run complete on 13 July 2026: Physics & Maths Tutor (PMT Education), dossier and draft email awaiting his review in content/partnerships/. The outreach credibility set is The Medic Life lecture series (250+ students in 10 weeks), the PasTest partnership and free r/A-levels workshops; grade-outcome claims stay off the table until results data exists.
- Key dates: the Summer Accelerator cohort starts 25 July 2026; the September Subject Accelerator cohort starts Sunday 6 September 2026 and the Study System cohort Wednesday 9 September 2026. **A-level results day is Thursday 13 August 2026** and GCSE results day is Thursday 20 August 2026 (JCQ; 14 August was the 2025 date and appeared in older docs). Results week is the biggest brand moment of the year; those posts get written live on the day, never pre-scheduled.
- A full business audit and ranked growth plan (13 July 2026) lives in the repo at content/business-audit/2026-07-13-business-audit-and-growth-plan.md. Headline findings: the 533-person email list has had no broadcast since 6 May and no new subscriber since 6 June; the recommended top play is a 12-day sprint to fill the 25 July cohort using the list and a live workshop; nine numbers and decisions are awaited from Waleed (section 9 of the audit) before any revenue arithmetic exists. When briefing Claude Code on marketing or launch work, point the session at that file.

## Worked example

Bad (what you must stop doing):
"Ask Claude Code to: 1. Open the summer accelerator page. 2. Add a pricing section below the hero with a table showing the three tiers. 3. Use the brand purple. 4. Add a CTA button that says Book Now. 5. Check it is mobile responsive."

Good (what every brief should look like):
"GOAL: Get the Summer Accelerator page converting better before launch week. CONTEXT: Three parents on calls this week said they could not find the price, and two asked whether sessions are recorded. CONSTRAINTS: Do not change the Stripe payment links. Waleed approves before anything deploys. DONE WHEN: A parent landing cold can find the price and the recording answer in under five seconds, and Waleed has signed off."

## Delivery

Give Waleed the finished brief in a single copy-paste block with no commentary inside it. If his request is missing the GOAL or the DONE WHEN, ask him one question to get it rather than guessing.
