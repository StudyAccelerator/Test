# KCL work experience workshop (The Medic Life), Saturday 24 October 2026

What this folder is: everything for the free workshop funnel Waleed pitches from the stage at KCL, built 23 October 2026. Three documents, one QR code, and a runbook.

- `TALK-TRANSITION.md`: how to move from the F2 talk to the free workshop, and how to get the room to sign up. Read this first.
- `GROUP-PROGRAMME.md`: the group programme on Waleed's decisions (two live sessions a week, £100 founding then £150 a month, the clinic), the cold Facebook-ads funnel that replaces sales calls, the revenue maths, and the WhatsApp community rules.
- `qr-alevelaccelerators-kcl.png` and `.svg`: the QR code for the slide. It points at `alevelaccelerators.com/kcl`.

## What is already built

- **The sign-up page** at `/free-workshop/` (short link `/kcl`, which tags sign-ups as KCL in MailerLite). Collects first name, email, year group, subjects, and an optional phone number that only appears when the student ticks the WhatsApp community box. Deliberately a plain form (Waleed sells the workshop from the stage, 23 October). Thank-you state shows the date, calendar buttons (Google, Apple/Outlook), the Zoom link once it exists, the WhatsApp card once its link exists, a copy-the-link share button, and the diagnostic. Code: `app/free-workshop/page.tsx`, `components/workshop/workshop-form.tsx`, `lib/workshop.ts` (every date and link in one file), `subscribeWorkshop()` in `lib/mailerlite.ts`.
- **MailerLite group** "Free Workshop: Year 12 Head Start (Nov 2026)", id `202138192036496596`, and two new fields `workshop_source` and `workshop_whatsapp`. The group is deliberately NOT watched by the lead-alert webhook (350 sign-ups must not ring the phone 350 times).
- **Four emails** in `content/email-sequences/free-workshop/`: W0 instant confirmation (Zoom link, one reply ask, WhatsApp link), W1 the day before, W2 one hour before, W3 the replay plus the programme offer. W1 and W2 are loaded as DRAFT campaigns (ids `202139174270141495` and `202139177244951666`), unscheduled. W0 needs its automation skeleton (step 6 below). W3 waits for the programme decision.
- The page is on the session branch `claude/kcl-workshop-sales-funnel-fizwlg`, built and verified. It is NOT live until that branch is merged into `main` (step 2).

## The runbook, in order

**Before the talk (tonight or tomorrow morning)**

1. **Confirm the date and time.** The page says Saturday 31 October, 1pm to 2:30pm UK (Waleed's date, 23 October). To change it, edit the five date values at the top of `lib/workshop.ts` (dateISO, startTime, endTime, dateLabel, timeLabel) and the dates in the four email files, then re-run step 7.
2. **Make the page live.** Tell any Claude Code session "merge claude/kcl-workshop-sales-funnel-fizwlg into main and push", or do it yourself. Vercel deploys in about two minutes; then `alevelaccelerators.com/kcl` works. Until then the short link lands on the homepage, so do the merge before the QR code goes on a screen.
3. **The Zoom meeting exists** (Waleed created it, 23 October; the link is in `lib/workshop.ts` and all four emails). Still worth checking: cloud recording ON (the replay is the W3 email and the no-show safety net) and the participant cap on the plan (a Pro plan holds 100). If the meeting ever changes, the old instructions were: Topic "Academic Accelerator Workshop", Sunday 1 November 6pm, 90 minutes, mute on entry, allow join before host (10 minutes), waiting room off, cloud recording ON (the replay is the W3 email and the no-show safety net). Check the participant cap on your plan: a Pro plan holds 100, and 200 sign-ups would need the Large Meeting add-on or a webinar licence. Then paste the join link into `lib/workshop.ts` (`zoomUrl`) and the emails with one command from the repo root:

   ```bash
   grep -rl 'ZOOM-LINK-TBC' lib content/email-sequences/free-workshop | xargs sed -i 's#https://ZOOM-LINK-TBC#PASTE_THE_ZOOM_LINK_HERE#g'
   ```

   Commit, push, merge, and re-run step 7 so the drafts carry the real link.
4. **Create the WhatsApp community** (optional, recommended: rules in GROUP-PROGRAMME.md section 6). Paste the invite link into `lib/workshop.ts` (`whatsappUrl`) and into the W0 email in place of `https://WHATSAPP-LINK-TBC`. Until this is done the page hides the WhatsApp card, which is fine.
5. **Put the QR slide in your deck** (spec at the end of TALK-TRANSITION.md). Make it the last slide. Ask The Medic Life host to show it again at the break.

**Before Sunday**

6. **Create the W0 automation skeleton in MailerLite** (3 clicks, the API cannot do this): Automations, Create, trigger "When subscriber joins a group", group "Free Workshop: Year 12 Head Start (Nov 2026)", add one Email step, name the automation "Workshop: instant confirmation (W0)", save as OFF. Copy the automation id from the URL into `scripts/email-engine/manifest.json` under key `workshop-e0`, then from the repo root:

   ```bash
   python3 scripts/email-engine/engine.py load workshop-e0 --live
   python3 scripts/email-engine/engine.py verify workshop-e0
   ```

   Switch the automation ON in MailerLite. Anyone who signs up after that gets the Zoom link instantly. Everyone who signed up before it was on is covered by W1 the day before.
7. **Refresh and schedule the reminders** once the Zoom link is in the files:

   ```bash
   python3 scripts/email-engine/engine.py campaigns content/email-sequences/free-workshop --live --update
   python3 scripts/email-engine/engine.py schedule 202139174270141495 2026-10-30 18:00 --live
   python3 scripts/email-engine/engine.py schedule 202139177244951666 2026-10-31 12:00 --live
   ```

   Review copies: `python3 scripts/email-engine/engine.py harness content/email-sequences/free-workshop/00-youre-in.md students --send` sends a test to waleed@alevelaccelerators.com.
8. **Build the workshop itself**: 60 minutes of teaching (priority map, 80/20, the week, the method; students do the priority map live), 10 minute pitch, Q&A. The run of show is in GROUP-PROGRAMME.md section 5.

**After Sunday**

9. Upload the recording (Zoom cloud link or YouTube unlisted), replace `https://REPLAY-LINK-TBC` in W3.
10. Confirm the programme name (price and shape are decided: two sessions a week, £100 founding then £150), have a session build the programme page and Stripe link, replace `https://PROGRAMME-PAGE-TBC`, load W3 as a draft and schedule it for 9am Sunday 1 November, with a "Questions?" email on Monday and a final-day email on Tuesday.
11. Record the real numbers (sign-ups from `/kcl`, attendance, sales) in this README so the next workshop is planned from data rather than the assumptions above.

## Numbers to record after the day

| Measure | Value |
|---|---|
| In the room | 350 (The Medic Life's figure) |
| Signed up via /kcl (MailerLite workshop_source = kcl) | |
| Signed up another way | |
| Ticked WhatsApp | |
| Attended live | |
| Watched the replay | |
| Bought the programme | |
