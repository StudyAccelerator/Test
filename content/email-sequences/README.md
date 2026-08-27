# The email engine: every entry point, every sequence

Built 27 August 2026. This file is the master map of every way a lead enters A-Level Accelerators and the email sequence that fires behind it. The copy lives in this folder tree (the repo is the source of truth); the automations live in MailerLite, built and loaded programmatically by `scripts/email-engine/engine.py`. **Everything new is built SWITCHED OFF and sends to nobody until Waleed reviews and flips it on** (runbook at the bottom).

The design rules, set by Waleed:

1. **Near-daily while intent is hot, then taper.** Every sequence is front-loaded: daily or near-daily for the first week, spacing out to day 14 (day 7 for programme interest), then handing off to the weekly rhythm or going quiet honestly.
2. **Every email ends with exactly one clear next action.** One primary CTA per email (a button, a reply ask, or a tonight-task). Secondary pointers only ever appear as inline text or a PS, never as a second button.
3. **The instant email is warm and useful, not just a delivery note.** Every entry point's first email arrives within a minute and tells the reader exactly what to do tonight.
4. **No dead ends.** Every sequence's last email says what happens next (weekly email, door stays open, reply any time). Nobody just stops hearing from us unexplained.
5. **Primary-tab format.** Text-first 600px layout, one to two links, bordered text buttons, no image stacks, real plain-text part, visible unsubscribe, sender always Dr Waleed Ahmad <waleed@alevelaccelerators.com>.

## The map

| Entry point | Trigger group | Automation (new) | Replaces (switch OFF at flip) | Emails | Days |
|---|---|---|---|---|---|
| Diagnostic, student | Revision Diagnostic `192687508025247162` | V2 · Diagnostic: instant report (E0) | Revision Diagnostic: instant report email (E0) | 1 | instant |
| Diagnostic, student, subject route | Diagnostic Route: Subject Accelerator `192802207993693338` | V2 · Diagnostic: Subject route (14 days) | Revision Diagnostic: Subject Accelerator route | 10 | 1,2,3,4,5,6,8,10,12,14 |
| Diagnostic, student, system route | Diagnostic Route: Study System `192802211655321354` | V2 · Diagnostic: Study System route (14 days) | Revision Diagnostic: Study System route | 10 | 1,2,3,4,5,6,8,10,12,14 |
| Diagnostic, parent | Revision Diagnostic Parents `193102828818925394` | V2 · Parent diagnostic: instant report (P0) | Parent diagnostic: instant report email (P0) | 1 | instant |
| Diagnostic, parent, subject route | Diag Parents Subject Route `193102829598016991` | V2 · Parent diagnostic: Subject route (14 days) | Parent diagnostic: Subject route (PB1 to PB4) | 10 | 1,2,3,4,5,7,8,10,12,14 |
| Diagnostic, parent, system route | Diag Parents System Route `193102829963970408` | V2 · Parent diagnostic: System route (14 days) | Parent diagnostic: System route (PY1 to PY4) | 10 | 1,2,3,4,5,7,8,10,12,14 |
| Revision Tracker | Revision Tracker Users `187183128836573106` | V2 · Revision Tracker (14 days) | Revision Tracker (May 2026 copy) | 9 | 0,1,2,3,5,7,9,11,14 |
| Parents' Guide | Parent Leads `188021995515937985` | V2 · Parents' Guide (14 days) | Parent Leads Nurture Sequence (May 2026 copy) | 9 | 0,1,2,3,5,7,9,11,14 |
| Sunday Session signup | Sunday Session `192801700892903405` | V2 · Sunday Session welcome | Sunday Session: welcome (SS1) (was OFF, never sent) | 2 | 0,2 |
| Callback request (report card) | Callback requested `196438369449805734` | Callback requested: confirmation + safety net | nothing existed | 2 | 0,2 |
| Call booked (Zoom Scheduler) | Call booked (new group) | Call booked: prep + follow-through | nothing existed | 2 | 0,2 |
| Programme interest | Programme interest (new group) | Programme interest: the full picture (7 days) | nothing existed | 5 | 0,1,2,4,6 |

The two summer-route automations stay PAUSED (cohort started 22 August; the diagnostic no longer routes anyone to summer). They were deliberately not rebuilt; when a new summer cohort exists, add a summer entry to `scripts/email-engine/manifest.json` and rebuild.

Per-lead reality check: a student who takes the diagnostic now gets 11 emails in 14 days (was 6 in 11), a parent gets 11 in 14 (was 5 in 11), a tracker user 9 in 14 (was 8 in 10 of May-era copy), a guide parent 9 in 14 (was 7 in 10 of May-era copy), and callback/call/programme leads go from zero emails to full coverage.

### The two manually fed groups

**Call booked** and **Programme interest** have no automatic feed (Zoom Scheduler doesn't talk to MailerLite). Waleed adds people himself, which takes ten seconds: MailerLite → Subscribers → find or add the person → Groups → tick the group. Do it when a call gets booked, or when anyone asks about programmes in a DM, a reply or a call. The automations do the rest. (A future automation could add Zoom bookings via the HQ; manual is the honest v1.)

## Copy folders

- `revision-diagnostic/` student E0 + call offer + subject and system routes (summer folder is legacy, paused)
- `revision-diagnostic-parents/` parent P0 + call offer + subject and system routes (summer legacy, paused)
- `revision-tracker/` 9 emails, fresh 27 Aug 2026 (replaces May-era copy that only lived in MailerLite)
- `parent-guide/` 9 emails, fresh 27 Aug 2026 (same)
- `sunday-welcome/`, `callback/`, `call-booked/`, `programme-interest/`

Every email file: header (Send day, Subject A, Preheader, Goal, Links) then the body in markdown with `[BUTTON: label -> url]` markers. Edit copy here, re-run the engine, and MailerLite matches the repo. Never edit only in MailerLite.

## The engine (how the copy gets into MailerLite)

`scripts/email-engine/engine.py`, run from the repo root:

- `render` builds every email to HTML + plain text in `scripts/email-engine/build/` (gitignored).
- `skeletons` prints the create payloads for any automation missing an id (creation goes through the MailerLite connector's create_automation tool in a Claude session; the public API has no create endpoint).
- `load <key> --live` writes subject, HTML body, plain text and sender name into the live automation's email steps, in manifest order.
- `verify` re-fetches everything and asserts step order, delays, designed status and sender. Run it after any load.

Content goes through `PUT /api/automations/{id}/emails/{id}/content`, which registers link tracking properly (verified 27 Aug 2026; the July 2026 "automation email HTML is API-unsettable" finding is obsolete, the account's plan now accepts it). Preheaders are baked into the HTML as hidden preview text because the API ignores the preheader field. What the API cannot do, and stays manual at switch-on: re-entry OFF, and any "copy to group" action steps.

## Deliverability (checked 27 August 2026)

The EasyDMARC "0 percent compliance" alarm is a reporting artefact, not a fault. Verified against live DNS:

- **DMARC exists and is strict**: `v=DMARC1; p=quarantine; adkim=r; aspf=r; rua=mailto:dmarc_rua@onsecureserver.net`. EasyDMARC shows nothing because the aggregate reports go to that registrar default address, so it has no data, which its UI renders as "0 percent".
- **SPF covers both senders**: the root SPF delegates to two includes that expand to `include:_spf.google.com` and `a mx include:_spf.mlsend.com`.
- **DKIM aligned for MailerLite**: `litesrv._domainkey.alevelaccelerators.com` CNAMEs to MailerLite's key, so bulk sends sign as the domain and pass DMARC by aligned DKIM. Google's own selector is present for 1:1 mail.

So volume is safe to scale on this domain. One optional improvement, DNS-only and Waleed's to make: change the DMARC `rua` to an address he can read (or an EasyDMARC address) to get visibility into who else sends as the domain. Not blocking.

**End-to-end proof, 27 August 2026:** a live test send of the new E0 from MailerLite was inspected at Gmail's own headers: `dkim=pass header.i=@alevelaccelerators.com header.s=litesrv`, `spf=pass`, `dmarc=pass (p=QUARANTINE)`, delivered to the Inbox and marked Important, not Promotions. The infrastructure question is settled.

The Promotions-tab fight is won by format and behaviour, not DNS: these sequences are text-first with one to two links, every early email asks for a reply (replies are the strongest Primary-tab signal there is), and E0 asks for the Primary drag explicitly.

## Switch-on runbook (Waleed, ~20 minutes)

Nothing sends until this is done, and it's deliberately all-or-nothing per entry point:

1. **Review the copy** in this folder tree (or the review page the session handed over). Edit anything that isn't your voice, then have a session re-run `load` so MailerLite matches.
2. **Per new automation in MailerLite** (they all start disabled): open it, confirm the trigger group is right, set **re-entry OFF** (Settings; a retaker must not restart the sequence), and glance at one email to check the design looks right.
3. **Flip each pair in one sitting**: switch the old automation OFF and its V2 ON together, so new joiners get exactly one sequence. Mid-queue subscribers on the old ones will stop where they are (at 27 Aug: subject 10 queued, system 11, parent subject 12, parent system 8, tracker 5, parent nurture 1). They already received the early emails; accept the cut.
4. **Optional, 2 clicks each**: after the final email of the two student route V2s and the tracker V2, add an action step "Copy to group: Sunday Session", so finishers feed the weekly list. The API cannot create action steps.
5. **Callback, Call booked, Programme interest**: just switch ON. Then feed the two manual groups as leads appear.
6. **The Sunday Session itself**: the welcome promises "every Sunday at 5pm". SS5 and SS6 were drafted but never sent (nothing has gone out since 13 August). Resume the weekly send, or soften the welcome's promise before enabling it.

## Measurement

Watch in MailerLite per automation: E0/P0 open rate (deliverability), reply volume (the health metric), click-through on the day 5 and day 6 emails, and bookings. The HQ dashboard's Lead CRM already counts emails sent/opened/clicked per lead. Open rates on this list run 42 to 72 percent; if a sequence's opens sit under 30 percent, suspect Promotions-tab placement and strip links before touching copy.
