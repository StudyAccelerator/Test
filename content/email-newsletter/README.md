# The Sunday Session: the weekly newsletter

Written 11 July 2026. This folder is the recurring newsletter for the student email list: the "one email a week" that the post-diagnostic sequence promises in four separate emails. Waleed reviews every issue before anything sends. Nothing in this folder is live until he switches it on in MailerLite.

**Correction baked into everything here: A-level results day 2026 is Thursday 13 August, not 14 August.** 14 August was the 2025 date and it survived in older planning docs. JCQ and AQA confirm results release to students at 8am on Thursday 13 August 2026 (GCSE follows on Thursday 20 August). The content calendar has been corrected on this branch; the lead magnet roadmap on the diagnostic branch still says 14 August and "ship Results Day Rescue by Tuesday 12 August", which conveniently still works (it becomes the day before).

## The proposal: cadence and format, and why

### Cadence: weekly, Sunday, 5pm UK

1. **Weekly is already promised.** E0 and all three route-closing emails in the diagnostic sequence tell every subscriber "after this, one email a week". The cadence was sold before the newsletter existed. Anything less breaks the first promise the brand made; anything more turns the quiet-down promise into noise.
2. **Sunday is already installed.** All three sequence routes give students the same weekly ritual: retest the error log on Sundays. Sunday evening is also when a student faces the week and decides what it will look like. The Session lands at the moment of highest planning intent, right before the week it's meant to shape.
3. **5pm matches the sequence's teaching slot.** Teaching emails in the sequence send at 5pm UK. Same sender, same day, same hour, every week: that's how both Gmail and a 17 year old learn the pattern. Open-on-sight is a habit, and habits are built on fixed anchors.
4. **Weekly survives the gap; more wouldn't survive Waleed.** The gap between finishing the diagnostic and a buying moment (results day, the September cohort, mocks) runs six to ten weeks. Fortnightly means three to five touches across it, too thin to hold warmth. Weekly with substance is the balance, and this repo carries the production load (bank, drafts, checklist) so one issue costs Waleed a review, not a writing day.

### Format: a named ritual around one teach

The masthead is **The Sunday Session**. A session is what students book with Waleed and what revision happens in; on Sundays they get one in their inbox. Subject lines carry the prefix "Sunday Session:" so recognition happens in the inbox list, before the open.

The editorial promise is the exact sentence the sequence used: **one thing school never taught you, usable that evening.** One teach per issue, taught fully, not a links roundup. Roundups train skimming; a single substantial teach trains reading, and prolonged exposure to Waleed's thinking is the point.

Fixed running order, every week, so the issue is a place, not a message:

1. **The opening** (no heading): two or three sentences that timestamp the issue in the A-level year. Countdown-aware, live, never evergreen filler.
2. **The teach** (no heading, it IS the email): 400 to 600 words. A named method wherever possible, concrete steps, and a "tonight, do this" close.
3. **The clinic** (heading): one student question, answered straight, sourced from replies as they accumulate. Ends with the reply invitation. This section turns replies into content, and replies are the deliverability engine: nothing tells Gmail "correspondence, not marketing" like a reply thread.
4. **High-yield / low-yield** (heading): two one-liners. One thing worth this week's hours, one thing to stop doing. The screenshot-able bit.
5. **The door** (heading): the conversion slot, two to five sentences, one or two links. Seasonal, honest, and openly labelled, exactly like the sequence's pitch emails. Some weeks the door is free (diagnostic, tracker, a call); results week it's nothing at all. The deeper conversion isn't the door anyway: each teach demonstrates the method the programmes install, so the substance makes the case and the door just names it.
6. **Sign-off**: "Keep going!", Waleed, credentials. Then one PS that rotates: a reply prompt, a forward-to-a-mate line, or a free tool.

Body length 700 to 900 words. Total links per issue: three maximum, including buttons and the PS (the results-morning special runs shorter and can run zero).

### Audience

Students only. The parents group never receives it. A parent-facing digest is a separate, later product (monthly, after the Parent Diagnostic ships per the roadmap); do not blend the voices.

No `diag_*` merge fields in newsletter copy except `{$name}`: the send list includes tracker and workshop subscribers who never took the diagnostic, and a fallback-riddled email reads like one. Where an issue touches the diagnostic, it invites non-takers to take it, which deepens the data instead of exposing its absence.

## The launch run (all drafted, awaiting Waleed's review)

| # | File | Send | Teach | The door |
|---|------|------|-------|----------|
| SS1 | `2026-07-19-the-four-tiers.md` | Sun 19 Jul, 5pm | The four tiers and the ten minute audit | Revision Diagnostic (free) |
| SS2 | `2026-07-26-learn-it-backwards.md` | Sun 26 Jul, 5pm | Question-first learning for new topics | Summer Accelerator |
| SS3 | `2026-08-02-ugly-notes.md` | Sun 2 Aug, 5pm | What notes are for; blurting as the proof | Summer Accelerator + playbook trailer |
| SS4 | `2026-08-09-the-results-day-playbook.md` | Sun 9 Aug, 5pm | The full results day playbook | None. Deliberately. |
| SSX | `2026-08-13-results-morning.md` | **Thu 13 Aug, 7am** | Short, calm, condensed moves | None (Rescue tool link if live) |
| SS5 | `2026-08-16-read-it-like-a-doctor.md` | Sun 16 Aug, 5pm | Result triage: classify before you fix | September Subject Accelerator |
| SS6 | `2026-08-23-the-prediction-window.md` | Sun 23 Aug, 5pm | How predicted grades get set; the evidence plan | September Subject Accelerator |

From 30 August onward, write weekly from `topic-bank.md` using the production checklist below.

## Building it in MailerLite (one-time setup)

1. **Create a group** called **Sunday Session**. This is the send list's core.
2. **Amend the diagnostic automation** (one step per branch): after the last email in each of the three route branches, add an action step, **"Copy to group: Sunday Session"**. This is the graduation mechanism: nobody gets weekly campaigns while the eleven-day sequence is still teaching them. The sequence README's line "after the last email, no further steps" becomes "no further emails, one group action"; update that README when the diagnostic branch merges.
3. **Backfill once:** copy into Sunday Session any current member of the Revision Diagnostic group who joined more than 12 days ago (they graduated before the group existed).
4. **Existing student lists join from issue one.** The tracker signups group (ID `187183128836573106`) and the workshop form's group (the form at `/workshop` posts to MailerLite form `184389361466344885`; its group is visible in the account) were never in the sequence, so they receive the newsletter immediately.
5. **Exclusions on every send:** the parents group (ID `188021995515937985`), and any other parent-sourced group that exists later.
6. **Build the reusable template** once, named "Sunday Session", to the sequence's template spec (600px, white, system sans 16 to 17px, #1a1535, buttons as bordered text links, gold #C9A96E only for links and the thin footer divider, plain-text footer with address and visible unsubscribe). Two newsletter-specific additions: the masthead is the one serif accent, "The Sunday Session" in Georgia, brand purple #2E2557, with one small grey line beneath it ("One thing school never taught you. Every Sunday, 5pm."); and section headings inside the body are bold body text, not styled heading blocks. No images, ever. The premium feel is restraint and typography, same as the sequence.

### Per-issue send checklist

1. Duplicate the "Sunday Session" template into a regular campaign.
2. Paste the issue body; set subject (pick A or B), preheader, and the `[BUTTON: label -> url]` markers as plain button blocks.
3. From name **Dr Waleed | A-Level Accelerators**, from and reply-to **Waleed@alevelaccelerators.com**. Identical to the sequence, forever.
4. Recipients: the send list in the "Direct MailerLite control" section below.
5. Check the auto-generated plain-text version reads sanely.
6. Schedule for Sunday 17:00 UK (the special: Thursday 13 August 07:00 UK).
7. First two sends only: seed-test to Gmail, Outlook and iCloud first. If Gmail files it under Promotions, cut a link and plain the layout further, then retest. The sequence's domain authentication work (DKIM, SPF, DMARC) must be green before issue one; it's the same domain, so if the sequence sends are landing Primary, the Session inherits that standing.

## Content rules for every issue

- Everything in `.claude/skills/content-studio/` applies: Waleed's spoken voice, zero em or en dashes, no banned vocabulary, British English, no invented statistics, approved proof points only.
- **Never a Stripe link.** All CTAs go to site pages or the call scheduler, so a sent email can never hold a stale payment link. Inherited from the sequence and non-negotiable.
- **No fake urgency.** Deadlines in the door must be structural (the calendar, cohort caps, the prediction window), exactly like the sequence's pitch rules. Every hard pitch carries an honest "who this isn't for".
- **Don't re-teach the sequence.** The sequence owns: the Year 12 autopsy, the 90 minute day, the blurting protocol (as a full teach), the calendar returns (day 2 / day 5), the K R W T letters drill, the examiner's dictionary, marking your own paper meanly. The newsletter may reference these by name as shared vocabulary, and may re-frame one deliberately (SS3 does this with blurting, and says so in the copy), but a graduate should never feel sent the same email twice.
- **The clinic must stay honest.** Until real replies accumulate, clinic questions are drawn from the questions students genuinely ask on calls and in replies, framed as exactly that ("a question I keep getting"). Never invent a named student. As real replies arrive, quote them anonymously ("a Year 12 replied...") and answer those.
- **Facts to re-check whenever an issue mentions them:** results day (Thu 13 Aug 2026, 8am), Subject Accelerator September cohort (starts Sunday 13th September, moved from the 6th on 15 July; Maths Sat 1 to 3pm, Biology Sun 10am to 12pm, Chemistry Sun 1 to 3pm), Study System cohort (starts Wednesday 16th September, moved from the 9th), Summer Accelerator (starts Saturday 8th August 2026, six weeks, first session risk-free; date moved from 25 July on 15 July, so its last session is Saturday 12 September and the September cohorts deliberately start after it), the diagnostic's own claim ("20 questions. About 4 minutes."), and the UCAS phone number in SS4/SSX. The workshop page still shows "Saturday 2nd May", so no issue doors to `/workshop/` until that page is updated.
- The diagnostic page (`/revision-diagnostic`) must be live before SS1 sends; it's SS1's door.

## Producing the next issue (the weekly loop)

1. Pick the premise from `topic-bank.md` matching the date (or bump it for something live: a results-week news event, a reader reply worth a whole teach).
2. Write to the running order above, in the file convention below, dated filename `YYYY-MM-DD-slug.md`.
3. Run the compliance scan from the repo root and fix anything it names:
   `python3 -c "import re,glob;bad=[chr(8212),chr(8211),chr(8216),chr(8217),chr(8220),chr(8221)];words=['delve','crucial','robust','landscape','leverage','moreover','furthermore','comprehensive','seamless','unlock','elevate','tapestry','pivotal','testament','underscore','foster','garner','vibrant','meticulous'];[print(f,i+1,repr(l.strip()[:80])) for f in glob.glob('content/email-newsletter/2*.md')+['content/email-newsletter/topic-bank.md'] for i,l in enumerate(open(f)) if any(c in l for c in bad) or any(re.search(r'\b'+w+r'\b',l,re.I) for w in words)]"`
4. Waleed reviews, then schedules per the send checklist. He approves every issue before it sends; nothing is automated end to end on purpose.

### Issue file convention

Each issue file starts with a header block: issue code and title, send datetime, audience line, Subject A, Subject B, Preheader, Goal, Links (count and list), plus any send-time checks. Then `---`, then the body exactly as it goes into MailerLite, using `{$name}` and `[BUTTON: label -> url]` markers, same conventions as the sequence files.

## Direct MailerLite control from Claude Code (added 11 July 2026, evening)

Verified against the live account via API. Sessions can read the account today; write access (create groups, draft campaigns, schedule sends) goes through either of two channels Waleed controls:

1. **The official MailerLite connector** on Waleed's claude.ai account. It is already installed; it needs authorising once (claude.ai, Settings, Connectors, MailerLite). After that, sessions create and schedule campaigns through normal tool permissions.
2. **A dedicated API token** stored as `MAILERLITE_API_TOKEN` in the Claude Code environment settings (for scheduled sessions, where connectors may not attach). Generate it in MailerLite under Integrations, API. Do not commit it; the full-access key already committed for the site forms should eventually be replaced with something scoped, since anything in the repo or the client bundle is public.

What the API cannot do, in any mode: build or edit automation workflows (read-only endpoints). The diagnostic sequence and its "copy to group: Sunday Session" graduation step are a one-time build in the MailerLite editor. As of 11 July no diagnostic automation exists in the account yet.

**The send list** (verified group names and IDs; MailerLite dedupes across groups at send):

Include: Sunday Session (create on first use), Revision Tracker Users `187183128836573106`, Revision Diagnostic `192687508025247162` (swap this one for graduates-only via the Sunday Session group once the automation's graduation step exists), Lecture Series Students `179596195547580232`, Lecture Series Students (New Group) `185843873480705989`, Top 1% Study Systems Workshop `184392744125334599`, Workshop `179320609561380062`, Workshop Atendees `186350189379847805`, Re-invite Workshop `185844353497826496`, Study Series Free Workshop `186744403779388652`, Newsletter Signups `181053980331214369` (legacy, currently empty).

Never include: Parent Leads `188021995515937985`, Buyers, UCAT group, 1:1 Calls.

Warmth evidence for launching to the full student list: the account's last blasts (early May 2026) reached roughly 400 subscribers at 47 to 52% opens. Two months quiet is fine; SS1 opens by re-introducing itself.

**The weekly Routine.** A scheduled Claude Code Routine ("Sunday Session weekly producer") fires every Saturday morning: it loads or writes the next issue, re-verifies facts and links, runs the compliance scan, prepares the MailerLite draft campaign when write access exists (paste-ready copy when it doesn't), and messages Waleed for approval. His approval reply in that conversation is what schedules the Sunday 5pm send. No approval, no send. Pause or delete the Routine any time by asking a session, or from the Claude Code Routines list.

### Loaded state (14 July 2026, evening)

- The MailerLite connector is authorised on Waleed's Claude account; sessions write to MailerLite through it. The plan upgrade unlocked HTML content via API.
- Group **Sunday Session** exists: `192801700892903405`. The old empty "Newsletter Signups" group was deleted in Waleed's cleanup.
- All seven launch-run issues are loaded as **complete draft campaigns**, body included: SS1 `192994960222455505`, SS2 `192995021984630278`, SS3 `192995063859512942`, SS4 `192995126128149523`, SSX `192995149318457076`, SS5 `192995206891570252`, SS6 `192995249653548380`. Each has subject, sender ("Dr Waleed | A-Level Accelerators", waleed@alevelaccelerators.com), preheader (hidden div in the HTML) and the ten-group send list (~423 recipients). None is scheduled: Waleed reviews and schedules each, which is the approval gate.
- **Gotchas learned the hard way:** `update_campaign` with new content silently resets the recipient filter to "all active subscribers" (which would include parents), so never content-patch an existing campaign; delete and recreate with `create_campaign` passing groups and content together. And the MCP's `list_automations` without `enabled_only: true` returns only disabled automations, so always pass the flag when checking live state.
- `build-email-html.py` converts every issue file to a final email HTML **body fragment** (masthead, template styles, preheader as hidden div, footer with unsubscribe; no doctype/head wrapper, which MailerLite mangles). Output dir is its first argument.
- The four diagnostic automations are live (built 12 July as E0 plus one linear automation per route group). Still pending: the "copy to group: Sunday Session" graduation action at the end of each of the three route automations (a UI-only step), after which the Revision Diagnostic group should be swapped out of the campaign send lists so mid-sequence students stop overlapping with the weekly.
- A twice-daily Routine ("Diagnostic completions: personal follow-up alert", about 9am and 7pm UK) reads the Revision Diagnostic group and notifies Waleed of each new completion with the student's full diag_* answers, so he can send a personal message. Read-only by design.

## Measurement (check after each send, judge monthly)

- **Open rate trend** across issues, per source group. Falling opens on a fixed slot means subjects or substance, not timing.
- **Replies per issue.** The health metric. A newsletter nobody replies to is drifting toward Promotions; the clinic exists to prevent exactly that.
- **Door clicks** against the season: pitch doors should climb into buying windows (early September, mock season). If a door clicks but the page doesn't convert, the page is the problem; if it doesn't click, the door is.
- **Unsubscribes per send** above roughly 0.5% two issues running means the substance bar slipped; fix the teach before touching anything else.
- **Enrolments and call bookings** that arrive with a diagnostic on file, tagged by `diag_route`, once September buying starts.

## What this is not

- Not a blog distribution channel. Issues may point at an article at the door when it genuinely serves, but the teach is written for the inbox, complete in itself.
- Not a parents channel. Ever.
- Not a daily or launch-blast list. The sequence made a promise; the Session is the promise kept.
