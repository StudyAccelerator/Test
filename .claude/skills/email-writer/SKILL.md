---
name: email-writer
description: Write, review and load any email that goes out under Dr Waleed Ahmad's name for A-Level Accelerators | the Sunday Session newsletter, automation sequence emails, daily broadcasts, one-off announcements and their parent twins. Use whenever the user asks to "write an email", "draft the newsletter", "write the Sunday Session", "rewrite this automation", "fix this email's voice", "optimise the subject line", or to load or test-send email copy in MailerLite. Owns the framework, the voice checklist, subject lines, readability, the parent version, the review route and the loading commands.
---

# Email writer | A-Level Accelerators

Every email under Waleed's name is written the same way, from the same framework, and checked the same way before anyone sees it. This skill is that framework. It was built on 13 September 2026 from the emails Waleed approved after rewriting the session's drafts himself (the 6 September call email, the 12 September E0, the 13 September Sunday Session), so the rules below are his, not a copywriter's.

Read these before writing a word:

1. `../content-studio/references/email-style-waleed.md` | the voice, learned edit by edit from his own rewrites. The authority on how he sounds.
2. `references/framework.md` | the eight-part structure every email follows, with the approved 13 September Sunday Session as the worked example.
3. `references/subject-lines.md` | how to write the subject line and preview text (Ian Stanley's formulas plus Waleed's own edits).
4. `references/plain-english.md` | the readability bar, the idiom swap list, and the parent-twin rules.
5. `../content-studio/references/audience-and-offers.md` | prices, links, approved proof points, the seasonal calendar. Never invent a number.

Copy lives in the repo and is loaded by script, never pasted into MailerLite by hand: `content/email-newsletter/` (the Sunday Session, one file per issue plus the parent twin, `manifest.json` maps files to campaigns), `content/email-broadcasts/<arc>/` (dailies), `content/email-sequences/<entry point>/` (automations, mapped in `scripts/email-engine/manifest.json`). The engine is `scripts/email-engine/engine.py`.

## The job, in order

1. **Decide the audience.** Students (16 to 18) or parents (40 to 55). Never both in one email. Anything sent to "the whole list" is two emails: the student version and the parent twin (see `references/plain-english.md`).
2. **Decide the one idea and the one action.** One teach, one CTA. If there are two ideas, that is two emails. The CTA is almost always the free academic strategy call; the link is `https://scheduler.zoom.us/dr-waleed-ahmad/academic-strategy-call`.
3. **Never name a cohort start date.** Emails are evergreen (Waleed, 14 September 2026): dates change, so they live on the site only. Write "the next start date is on the page" and link the programme page. Seasonal arguments (autumn predicted grades, mock season) are fine.
4. **Place it in the calendar.** The opening timestamps the email in the A-level year (first tests, predicted grades, mocks, results day) and says why this matters now. Check dates against `audience-and-offers.md` and the site.
5. **Write to the framework** (`references/framework.md`). Warm opener, why it matters now, the problem, the medical comparison if it helps, the teach in numbered bold steps, "tonight, try this", the bridge to the offer, the offer as a reward, the proof line, the named link, sign-off, PS with the link again.
6. **Write the subject lines and preview text** (`references/subject-lines.md`). Two subjects (A and B) and a preheader that adds a second hook rather than repeating the subject.
7. **Run the three checks** (below). Fix everything they name before anyone reads it.
8. **Review copy goes through MailerLite, never Gmail.** Load the file into the REVIEW HARNESS automation and trigger a test send to waleed@alevelaccelerators.com, so he sees exactly what subscribers get (photo signature, direct links). The Gmail connector strips images and wraps links in Google redirect notices, which he has already mistaken for bugs once. Command: `python3 scripts/email-engine/engine.py harness <file> <audience>` (audience: students or parents), then the MailerLite connector's `send_test_automation` on automation `198499107557345247`. That automation is OFF, its trigger group `198499089874159320` is empty, and both stay that way.
9. **Load only on his go.** Campaigns: `engine.py campaigns <dir> --live` creates drafts (`--update` rewrites existing drafts); scheduling is a separate step and never happens without his explicit go in this conversation. Automations: `engine.py load <key> --live` then `engine.py verify <key>`, and only after checking he has not edited the live email in the MailerLite builder (see CLAUDE.md, "never load over Waleed's builder edits"). MailerLite refuses content edits on an ACTIVE automation, so switching off is his step, not the session's.

## The three checks

**1. Voice** (the checklist at the end of `email-style-waleed.md`): Hi/Hey plus "it's Dr Waleed" on first contact; complete joined sentences, no fragment pairs; no defensive line anywhere; the free thing is a reward for the reader's action; the call is named ("free academic strategy call", "custom academic strategy plan"), never "a chat"; the PS restates the one action with his real life in it; one smiley at most; proof in his order (two grades on average, real quotes, the satisfaction guarantee, the 1,000 students / 6 years line).

**2. Readability** (`scripts/readability.py <file>`): every paragraph one to three sentences (average 23 words or fewer, none over 45); average sentence 13 words or fewer; no sentence over 30 words; Flesch reading ease 85 or above (reading age about 9). Bold step headings sit on their own line. Waleed's words on why: Hormozi and Suby write in short paragraphs because a wall of text on a phone "feels like a commitment", and many of the parents he speaks to don't have English as a first language.

**3. Links and mechanics:** every call CTA is the booking link as named text (`[Click here to book your free academic strategy call](url)`, or a `[LINK: ... -> url]` line, or a `[BUTTON: ... -> url]`), never a bare URL and never "reply with a couple of days that suit"; the link appears twice at most (body and PS); no Stripe links, ever; `{$name}` is the only merge field in newsletters and broadcasts (sequence emails may use the `diag_*` fields with defaults); the header block has Subject A, Subject B, Preheader, Goal and Links; the compliance scan passes (`python3 scripts/compliance-scan.py <file>`: no dashes, no curly quotes, no banned words, no hyphen ranges; Waleed's own "20-30 minutes" and "when it comes to" in his verbatim emails are accepted flags).

## What never changes

- Waleed's own verbatim emails (the 6 September day 1 call email, the 12 September E0 and P0, his builder edits to the 6 hour follow-ups) are never "improved": spelling fixes and the booking-link rule only.
- Nothing sends to a subscriber until he has reviewed it and said go. Review sends go to his own address only.
- No invented numbers, no "we don't promise grades" lines, no confidence statistic, no urgency that isn't the real calendar.
- Students only ever get student-voiced emails; parents only ever get the parent twin.
