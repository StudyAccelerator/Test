# Round 4 build sheet: what to click, in order (2 October 2026)

Budget sized for £1,500 to £2,000 over four weeks, per Waleed's steer. Nothing
here publishes itself; every step is his click.

## Why one ad set per angle

Five ads inside one ad set never get a fair test: Meta pours the budget into
whichever ad wins the first few conversions and starves the rest, and the test
you wanted (does THIS angle reach new people?) never happens. One ad set per
angle gives each angle its own £8 to £10 a day and its own learning. It costs a
little efficiency; it buys an honest answer.

## Before you start

1. Pull the Custom Audience campaign back to £10 a day (if not already) or
   switch it off: it is the spent audience this round replaces.
2. Keep Doctor pen running in the RD2 test campaign at £10 a day as the control.
   Do not edit it.
3. Discard the pending drafts so the account is clean.

## Build: one campaign, six ad sets

**Campaign** "R4 Angle Test | Oct 2026", objective Leads, conversion event Lead
on the website pixel, campaign budget OFF (budgets sit on the ad sets).

**Ad sets** (all identical settings except name and the ad inside): Advantage+
audience, United Kingdom, age 18+, placements Advantage+, daily budget per the
scenario below.

| Ad set | Ad inside (image, headline A, primary text from COPY-PACK) | utm_content |
|---|---|---|
| A1 Medics | a1-future-medics, "Parents of future doctors: read this" | a1-medic (+ `h=medic`) |
| A2 Wording | a2-mark-scheme, "Knows it. Loses the mark anyway." | a2-wording |
| A3 Hard work | a3-working-hard, "Working hard. Grades not moving?" | a3-hardwork |
| A4 Forgets | a4-forgets, "Learns fast, forgets faster?" | a4-forgets |
| A5 Tutor | a5-tutor, "Tutors teach content. This fixes the rest." | a5-tutor |
| LAL (week 2) | the week-one winner, same copy | add `-lal` |

Upload the 4:5 and 9:16 versions of each image (Meta places the 4:5 in feed
and the 9:16 in stories and reels); add the 1:1 if it asks for one.

## Budget scenarios

**£1,500 over four weeks (about £53 a day):**
- Weeks 1 to 2: five angle ad sets at £8 a day (£560) plus the pen control at
  £10 (£140). Each angle reaches the £25 judging line by day 3 or 4.
- End of week 2: kill the two or three weakest angles.
- Weeks 3 to 4: the two winners at £15 a day each (£420), the lookalike ad set
  at £10 (£140), the control at £10 (£140), plus headline B duplicates inside
  the winners (no extra budget; they share the ad set's).
- Total about £1,400.

**£2,000 over four weeks (about £70 a day):**
- Weeks 1 to 2: five angles at £10 a day (£700) plus control £10 (£140).
- Weeks 3 to 4: three winners at £15 (£630), lookalike £15 (£210), control £10
  (£140), and the Year 13 UCAT twin (a1b) as a second ad inside A1 if medics won.
- Total about £1,800.

Either way, spend lands where the answer is, not evenly.

## The lookalike (add in week 2)

Audiences > Create > Custom Audience > Customer list: export the diagnostic
leads from MailerLite (both master groups, email and phone, now 150+), upload,
then Lookalike 1% UK from that list. Put the week-one winning ad in its own ad
set against that audience. Lookalikes of real leads usually beat broad for a
few weeks, then need the same refresh as everything else.

## Rules

- **Judge on cost per lead at £25 spent per ad set, never earlier and never
  on click-through rate.** CTR tells you attention; the page-view-to-lead rate
  tells you whether the angle reached the right people, and that is the number
  that has been failing. Read both.
- Any ad set over £30 a lead after £25 dies. Anything under £10 a lead gets
  its budget raised 20 to 25% every three days while it holds.
- **Refresh before decay:** every two to three weeks, move the winning angle
  into a fresh ad set with a different image (there are two or three per angle
  across rounds 2 to 4) BEFORE its conversion rate drops. Waiting for the CPL to
  tell you is what happened in September.
- Never touch a winning ad set's targeting or creative once it is converting;
  duplicate instead.
- Leads are only "real" in MailerLite; Meta's count can double-count anyone who
  also grabs the Parents' Guide or newsletter.

## What to watch, and what I report

Daily: MailerLite signups, and per ad set spend, leads, CPL, CTR and
page-view-to-lead rate. In GA4: funnel events split by `utm_content` and by
`hero` (default versus medic landing headline). I will keep the log in
`dashboard/data/meta-ads-log.jsonl` and give you the first verdict when every
angle has spent £25.

## Kill list from previous rounds (so nothing is accidentally revived)

Doctor desk, Graduation, Med student (five-way test losers); both Instant Form
ads; the Custom Audience ad above £10 a day; the August callout images except
the Doctor image itself.
