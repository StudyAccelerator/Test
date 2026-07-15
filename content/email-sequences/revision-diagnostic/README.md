# Revision Diagnostic follow-up sequence

Written 11 July 2026. This folder is the complete post-diagnostic email sequence: the back half of the Revision Diagnostic. Waleed reviews every email before anything is switched on.

## The shape of it

One shared email the moment someone finishes the diagnostic, then five emails over eleven days, in one of three variants chosen by what their report found. After email five, everyone drops to the normal weekly email. Nobody gets two variants. Nobody gets a pitch before they've received two genuinely useful emails first.

| Day | Everyone | Summer variant | Study System variant | Subject variant |
|-----|----------|----------------|----------------------|-----------------|
| 0 (instant) | E0 Your report | | | |
| 1 | | S1 The Year 12 autopsy | Y1 The blurting protocol | B1 Marking like an examiner |
| 3 | | S2 The 90 minute summer day | Y2 The calendar that remembers | B2 The examiner's dictionary |
| 6 | | S3 The pitch | Y3 The pitch (workshop first) | B3 The pitch (September cohort) |
| 8 | | S4 Questions + parent section | Y4 Questions + parent section | B4 Questions + parent section |
| 11 | | S5 The door | Y5 The compounding window | B5 September is a decision |

Value first, conversion throughout: the pitch emails only ask for the sale after the sequence has taught the audit, the method and the drills in full, each pitch is built from the student's own diagnostic fields, and every pitch contains an explicit "who shouldn't join" section, because the brand is the person who tells the truth about revision.

The three variants make three different cases on purpose:

- **Summer** (Year 12s in the launch window): urgency is structural, the summer itself is shrinking. Pitch day 6, door day 11. No fake deadlines: the copy is written to stay honest even if read in August ("the cohort will already be moving, recordings catch you up").
- **Study System** (method-side diagnoses): the free workshop is the primary CTA, tiers second. Lowest-friction route because these students need to experience the method working before they'll buy structure.
- **Subject** (exam-craft diagnoses in Biology, Chemistry or Maths): the September 13th cohort is the moment, the summer bridge plan keeps them engaged until then, and the predicted-grades calendar is the honest urgency.

## Building it in MailerLite (step by step)

1. **Built 12 July 2026 as four linear automations instead of one branched workflow.** The route decision happens on the website, not in MailerLite: `lib/mailerlite.ts` adds every completion to the "Revision Diagnostic" group AND one of three route groups (Diagnostic Route: Summer Accelerator `192802205272639254`, Diagnostic Route: Subject Accelerator `192802207993693338`, Diagnostic Route: Study System `192802211655321354`), using the same Summer-first / contains-Subject / else-System logic this guide specified for condition steps. Four automations exist in the account, all created disabled with subjects, delays and full body copy loaded:
   - "Revision Diagnostic: instant report email (E0)" `192802303922669455`, trigger = joins "Revision Diagnostic".
   - "Revision Diagnostic: Summer Accelerator route" `192802413740033360`, trigger = joins the summer route group.
   - "Revision Diagnostic: Subject Accelerator route" `192802636764808949`, trigger = joins the subject route group.
   - "Revision Diagnostic: Study System route" `192802538796352885`, trigger = joins the study system route group.
   Each route runs delay 1 day, email 1, delay 2 days, email 2, delay 3 days, email 3, delay 2 days, email 4, delay 3 days, email 5 (days 1, 3, 6, 8, 11). The older empty shell "Revision Diagnostic follow-up (build per repo guide)" `192745483429479786` is superseded and can be deleted.
2. **Waleed's switch-on checklist, in the dashboard:** review each email's copy and styling in the editor (bodies are loaded as text; apply the template spec below), confirm sender name and reply-to on every email, turn OFF re-entry on all four automations (a retaker should not restart), then enable all four together. The route automations must not go live without E0, or students get teaching emails with no report email first.
3. The route logic in `lib/mailerlite.ts` is the source of truth for which sequence a student receives. If route names ever change in `lib/diagnostic.ts`, update `routeGroupId()` in the same commit.
4. Every email: From name **Dr Waleed | A-Level Accelerators**, from and reply-to **Waleed@alevelaccelerators.com**. Same identity on every send, forever. Replies must land somewhere Waleed actually reads, because the sequence asks students to reply on purpose.
   **Timing note:** the diagnostic went live (12 July) before this automation was switched on, and the "joins a group" trigger only fires on the join event. Anyone who completed the diagnostic before the automation is live will NOT receive the sequence automatically. Fix when switching on: in the Revision Diagnostic group, remove those early subscribers from the group and re-add them (a fresh join event fires the trigger), or send them E0 manually as a one-off campaign.
5. Send times are in each file's header (5pm UK for the teaching emails, 11am for the pitch and door emails). In MailerLite, set the delays so sends land near those times rather than exactly 24 hours after signup.
6. After the last email in each branch, no further emails, one group action: **"Copy to group: Sunday Session"**. That group is the send list core for The Sunday Session weekly newsletter (see `content/email-newsletter/README.md`), so nobody receives weekly campaigns while the eleven-day sequence is still teaching them. Do not add them to any other automation from here.

### Merge fields used (all already exist in the account)

`{$name}`, `{$diag_archetype}`, `{$diag_bottleneck}`, `{$diag_worry_subject}`, `{$diag_current_grade}`, `{$diag_target_grade}`, `{$diag_hours_per_week}`, `{$diag_low_yield_hours}`, `{$diag_scores}`, `{$diag_route}`.

Every use in these emails carries a fallback, written as `{$field|default('...')}`, and the copy is worded so the fallback reads naturally. One quirk to know: when a student answers "Not sure" to the worry-subject question, the site now stores the field as **empty** (deliberately), so the `default('your weakest subject')` fallback fires and the grammar survives. An empty `diag_worry_subject` in the CRM therefore means "student wasn't sure", not missing data.

Two later additions (14 July 2026), not yet used in these emails: the gate now also captures an optional **phone** (built-in field) and **`diag_taker`** ("student" or "parent", empty when not answered). Both are only sent when given, so blanks never overwrite stored values. `diag_taker` matters for the future: these 16 emails are written to the student, and a parent-taker variant is a known gap. Until one exists, parents receive the student-addressed emails, which the site warns them about at the gate ("read it together"). Phone numbers are for call follow-up, and the gate promises "used for that, nothing else": no SMS marketing against this field without changing that promise first.

### Two placeholders to check at send time

- Summer copy references the live cohort without hard dates except where the site itself does. If the sales page dates change, S3/S5 stay true as written.
- B3/B4/B5 name **Sunday 13th September** (moved from 6th on 15 July 2026 so the Subject cohort starts the day after the Summer Accelerator's last session) and the session times (Maths Sat 1pm to 3pm, Biology Sun 10am to 12pm, Chemistry Sun 1pm to 3pm), matching the subject-accelerators page today. If the cohort or times move, update these three emails with the page AND in the live MailerLite automation, which is switched on.
- No email links to Stripe. All CTAs go to site pages or the call scheduler, so payment links can never go stale inside a sent email.

## Deliverability: the actual plan

The goal is the Primary tab of a 17 year old's Gmail, which is won or lost on three fronts.

**1. Infrastructure (do once, before the first send)**

- In MailerLite: Account, Domains, authenticate **alevelaccelerators.com**. Add the DKIM and SPF records it gives you at the DNS host, and wait for the green ticks. Without this, everything below is decoration.
- Add a DMARC record if none exists (start at `p=none` with a reporting address; tighten later). Gmail and Yahoo now expect DKIM plus SPF plus DMARC from bulk senders.
- Send from `Waleed@alevelaccelerators.com` with the same from-name every time. Never a no-reply address: the sequence explicitly invites replies.

**2. Format (what keeps these out of Promotions)**

Promotions-tab classification feeds on heavy HTML, image stacks, many links and shouting. These emails are built against that, and the build must keep them that way:

- Text-first layout, one column, max 600px. No hero images, no image-based buttons, no GIFs. Zero images is the default (an email that looks like a person wrote it, because one did).
- At most two or three links per email (each file's header lists them). No link shorteners, no linking the same URL five times, no linked images.
- Buttons are bordered text links, not image buttons. The `[BUTTON: label -> url]` markers in the files map to MailerLite's plain button block, styled per the template spec below.
- Subject lines: sentence case, specific, no ALL CAPS, no exclamation stacks, no "FREE!!!", no emoji. Personalisation is fine and used.
- Review the auto-generated plain-text version of each email in MailerLite before sending (it exists, and spam filters read it).

**3. Behaviour (the compounding part)**

- E0 asks every reader to reply and to drag the email to Primary. Replies are the single strongest "this is correspondence, not marketing" signal a mailbox provider can see. When students reply, answer, even one line.
- The instant send matters: E0 arrives while the student is still on the report page, which is when opens and replies are most likely, and early engagement teaches Gmail where to file everything after.
- Steady cadence, then quiet: five emails in eleven days during a launch is assertive but bounded, and the sequence explicitly hands off to one email a week. No surprise re-activation blasts later.
- List quality is structurally good (every address came through a 20 question diagnostic minutes earlier), single opt-in is the right trade for this funnel. Housekeeping rule: twice a year, unsubscribe anyone who hasn't opened in six months.

**4. Test before switching on**

- Send each variant's emails to seed addresses on Gmail, Outlook and iCloud. Check: Primary vs Promotions, merge fields rendering (use a real test subscriber created through the live diagnostic, then delete it), links, and how it reads on a phone.
- Run one email through mail-tester.com once the domain is authenticated; anything below 9/10, fix what it names.
- The Gmail seed test is the real exam: if E0 lands in Promotions on a fresh Gmail account, strip the email further (fewer links, plainer button) and retest before launch.

## Template spec (premium, but Primary-safe)

The premium feel comes from restraint and typography, not decoration:

- Width 600px, white background, generous padding (24px sides minimum).
- Body: system sans stack, 16 to 17px, line height 1.6, colour #1a1535.
- One serif accent: the opening line or single heading in Georgia, brand purple #2E2557.
- Gold #C9A96E for exactly two things: a thin 2px divider above the footer, and link colour.
- The E0 "From your report" box: 1px solid #C9A96E border, 12px padding, monospace labels. It's the one designed element in the sequence and it earns its place by being personal data, not decoration.
- Buttons: white background, 2px solid #2E2557 border, purple text, 14px vertical padding. No fills, no shadows, no images.
- Footer: plain text. "Dr Waleed Ahmad, MBBS · A-Level Accelerators · alevelaccelerators.com", the required address line, and MailerLite's unsubscribe link. Never hide the unsubscribe: an easy unsubscribe is cheaper than a spam complaint in every currency that matters.

## Measurement

Watch, per variant: open rate on E0 (deliverability check, expect high), reply count on E0 (the health metric that predicts everything else), click-through on the day 6 pitch, and bookings/enrolments tagged back to `diag_route` in MailerLite. If a variant's pitch email clicks well but converts nothing, the page is the problem; if it doesn't click, the pitch is.
