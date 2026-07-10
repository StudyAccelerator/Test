---
name: cowork-briefing
description: Generate an up-to-date briefing prompt for Waleed's Claude Cowork business HQ, so it can write goal-based briefs (not step-by-step instructions) for Claude Code sessions. Use when Waleed asks for "a prompt for Cowork", "update my HQ", or anything about how Cowork should delegate tasks to Claude Code.
---

# Cowork briefing generator

Waleed runs a separate Claude instance ("Claude Cowork business HQ") that plans business work and writes prompts he pastes into Claude Code sessions like this one. Cowork's natural failure mode is writing rigid step-by-step instructions, which constrains the (smarter, deeply contextualised) Claude Code model to Cowork's weaker plan.

When Waleed asks for a Cowork prompt, produce a single copy-paste block with two sections, in this order.

## Section 1: current state update

A dated snapshot of where the business and codebase actually are, so Cowork stops planning from stale information. Build it fresh every time from:

- `CLAUDE.md` at the repo root (project brief, standing rules)
- The memory files (deployment, blog/SEO, content marketing status)
- `git log --oneline -15` for anything shipped since the memories were written
- Anything Waleed said in the current conversation

Cover: what is live on the site, what marketing assets exist, upcoming dates (Summer Accelerator launch early August, results day 14 August), and the standing content rules IN SUMMARY ONLY, framed as "already enforced automatically, do not restate them in prompts".

Keep it under ~250 words. Cowork needs orientation, not the full detail.

## Section 2: the brief format (include verbatim every time)

Instruct Cowork that every prompt it writes for a Claude Code session must contain exactly four parts and nothing else:

1. **GOAL**: the business outcome in one or two sentences. What should be true when finished?
2. **CONTEXT**: anything only Waleed/Cowork knows that the session cannot (conversations, feedback, deadline changes, strategy shifts).
3. **CONSTRAINTS**: hard limits only (budget, deadline, do-not-touch items, required approvals before going live).
4. **DEFINITION OF DONE**: how Waleed will judge the result.

Explicitly banned from Cowork's prompts: implementation steps, file names, technical approach, tool choices, content structure, and restatements of the standing voice/content rules. Include the litmus test: "would the business fail if Claude Code did this differently? If no, leave it out."

Include one worked example in the four-part format so Cowork has a template to copy.

## Style rules for the generated prompt

- Written TO Cowork in second person ("you"), plain language, no jargon.
- Follows the voice hard bans from `references/../../content-studio/references/brand-voice.md` scope: no em or en dashes anywhere, no curly quotes.
- End by asking Cowork to confirm it absorbed both updates and to rewrite any pending task prompts in the new format.
- Deliver as one fenced code block so Waleed can copy it in one click.

## Keeping it current

This skill generates the prompt dynamically; there is no canonical stored prompt to get stale. If Waleed says Cowork is still micromanaging after an update, tighten Section 2 (for example, add examples of bad vs good prompts using the specific offending prompt he shows you) and update this file with what worked.
