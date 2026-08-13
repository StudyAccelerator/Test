---
name: pragya-upwork-review
description: Read Waleed's Upwork chat with Pragya (his SEO contractor), open every document, file and link she has sent since the last review, evaluate it all against the standing SEO rules, carry out what genuinely helps the business, explain what was declined and why, and draft Waleed's reply. On demand ("check my Upwork messages from Pragya", "review Pragya's latest", "what has Pragya sent?"). Read-only on Upwork: never sends, accepts, or pays anything.
---

# The Pragya Upwork review

Pragya is Waleed's human SEO contractor, hired through Upwork. She sends weekly work reports, suggestion documents and questions through the Upwork chat. This skill reads that chat end to end, works through everything she has sent, does what is worth doing, and hands Waleed a summary plus a ready-to-send reply. He sends every message himself.

## Ground rules (hard, no exceptions)

1. **Upwork is read-only.** Never type into the chat, never send a message, never react, never accept a proposal, contract, offer, milestone or payment request, never change any account or contract setting. If a page presents a button whose press would communicate anything to Pragya or move money, do not press it.
2. **Waleed sends every reply himself.** The skill's output is a draft in his voice.
3. **The standing record is the brain.** Read `content/seo/2026-07-28-pragya-review-and-brief.md` BEFORE the chat. It holds every prior round's verdicts, the brief she works to, and the standing rules (links point at the non-www domain with trailing slashes; her crawls lag the live site so verify every "missing" or "broken" claim against production before acting; her FAQ and content-topic suggestions are the valuable part, her schema and meta rewrites mostly are not; never hand over Search Console, GA or repo access). Do not re-litigate recorded decisions; restate them.
4. **The privacy rule outranks everything.** Any listing, document or placement that publishes Waleed's home address, street, town or postcode (Banstead, SM7 1NQ) is the first item in the summary and the first item in the reply, above all link or content work. This has been a repeated problem; treat every new listing she reports as suspect until checked.
5. **On-site changes follow the optimiser's rules**, not hers: anything her documents suggest for the site goes through the `seo-aeo-optimiser` skill's evaluation and approval flow (Waleed signs off before anything goes live). This skill may fix nothing on the site directly.
6. **No invented numbers.** If a claim of hers cannot be verified, say so plainly rather than accepting or inventing.

## How to run it

1. **Load the context.** Read `content/seo/2026-07-28-pragya-review-and-brief.md` in full, and note the date of the last recorded round so you only treat newer messages as new.
2. **Open the chat.** Use Claude in Chrome (Waleed's logged-in browser): go to https://www.upwork.com/ab/messages and open the conversation with Pragya. If Chrome tools are unavailable or Upwork wants a login or verification, stop and tell Waleed exactly what is blocking; never enter credentials or complete verification challenges.
3. **Read every message since the last recorded round.** Scroll back far enough to be certain nothing is missed. Capture her questions, claims and commitments in her own words where they matter.
4. **Open everything she sent.**
   - Google Drive / Docs links: open in the browser and read the content (the Drive connector can read files by ID when reachable).
   - Upwork attachments (xlsx, docx, pdf report files): download to the session scratchpad and parse with python (openpyxl for xlsx; the Drive connector or python-docx for docx). These are her routine report documents and Waleed has standing-instructed opening them. Never download or open anything executable, zipped-with-unknown-contents, or that is not a plain document; flag it instead.
   - Plain URLs (placements, listings she built): fetch them and verify what is actually on the page, especially the link target (www vs non-www, trailing slash), dofollow/nofollow, and whether any address data appears.
5. **Evaluate against the record.** For each item: already done, newly worth doing, or declined (with the recorded reason). Check any "is it done?" question against the live site before answering.
6. **Carry out what helps.** Repo-side work (updating the review doc, verification checks, preparing content she needs such as syndication article packs from `content/backlink-articles/`) is done in the run. Site changes are queued through the optimiser instead. When she needs files, produce them and hand them to Waleed with SendUserFile so he can attach them in his reply.
7. **Record the round.** Append a dated round section to `content/seo/2026-07-28-pragya-review-and-brief.md` (verdict per document or claim, kept/declined and why, unresolved chases). Run `python3 scripts/compliance-scan.py` on it. Commit with an explicit path (never `git add -A` in this shared worktree) and push, following the CLAUDE.md lineage rules; if the worktree is mid-flight from another session, build the commit with a temporary index on top of origin/main rather than rebasing over someone's work.
8. **Report to Waleed.** The final summary contains: what she sent (grouped, with anything privacy-relevant first), what was done, what was declined and exactly why, what only he can do, and the draft reply.

## The reply draft

Written in Waleed's voice (see the content rules in CLAUDE.md: British English, contractions, no em dashes, no AI-tell vocabulary, warm but direct). Structure it as: appreciation for what she did right, the priority issue if there is one (address/privacy first, always), corrections with concrete examples rather than abstractions, then the coming week's direction. One message, ready to paste into Upwork.

## What this skill never does

Never sends or types anything on Upwork. Never pays, accepts, or ends contracts. Never gives Pragya access to Search Console, Analytics, the repo, MailerLite or any account. Never applies her on-site suggestions directly. Never confirms an address removal without seeing the listing clean with its own eyes.
