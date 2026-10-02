# Meta ads action plan, 2 October 2026

Every number read live from Ads Manager (export 17 September to 2 October 2026),
GA4 and MailerLite on 2 October. Work through the numbered list in order; each
step says exactly what to click. Nothing here publishes itself: every change is
yours.

## Where the account stands

| Ad (17 Sep to 2 Oct) | Status | Spend | Leads | CPL | CTR |
|---|---|---|---|---|---|
| Doctor image (Custom Audience campaign) | ACTIVE | £212.46 | 14 | £15.18 | 2.16% |
| Doctor pen (RD2 test) | ACTIVE | £28.28 | 4 | £7.07 | 2.17% |
| Doctor GP (RD2 test) | ACTIVE | £29.02 | 2 | £14.51 | 1.57% |
| Med student (RD2 test) | off (your click) | £27.17 | 2 | £13.59 | 1.87% |
| Graduation (RD2 test) | off (your click) | £27.72 | 0 | never | 1.56% |
| Doctor desk (RD2 test) | off (your click) | £25.40 | 0 | never | 1.47% |
| Doctor image (evergreen Aug 11th) | off (your click) | £74.14 | 4 | £18.54 | 2.09% |
| Both form ads | off (your click) | £57.97 | 1 | £57.97 | 1.50% |

The one problem that outranks everything else: **the Custom Audience campaign
kept its raised budget**. Since 24 September it has spent £161.21 for 4 leads,
about £40 each, at roughly £18 a day. The same ad did £5.12 a lead at £10 a day.
The audience is a small warm pool; the extra money is buying the same people
over and over (frequency climbing, 1.72 and rising) and real signups in
MailerLite have halved. Clicks still look fine (CTR 2.1%), which is exactly the
signature of a tired audience rather than a tired creative.

MailerLite real diagnostic signups per day: 5 to 6 a day on 19 to 23 September;
since the restructure: 2, 2, 0, 0, 1, 3, 2, 0. The account is spending more and
converting less. The steps below fix that.

## The changes, in order

### 1. Custom Audience campaign: budget down to £10 a day

Campaigns tab, "Revision Diagnostic 2 Custom Audience", hover Budget, edit to
£10, publish. Do not touch anything else inside it (targeting, creative or
placements edits reset its learning). At £10 a day it earned £5 leads; above
that it burns.

### 2. RD2 test campaign: switch off Doctor GP

Ads tab inside the "Revision Diagnostic 2" test campaign (the one dated 18/09):
toggle off Doctor GP. Its £29
bought 2 leads at £14.51 with the weakest CTR still running (1.57%). Doctor pen
stays on: 4 leads at £7.07 and 2.17% CTR, the only ad in the account beating
your lifetime average.

### 3. Add the two rotation proof ads to the RD2 campaign

The images are already rendered in
`content/meta-ads/2026-09-13-round-3-proof-ads/final/` (use the 4x5 for feed,
9x16 for stories, or let Advantage+ take the 1x1):

**Ad A: r4-next-story** ("Could your child be our next C to A* story?")
- Primary text: PROOF-1 from the round 3 copy pack (Sarah's story, starts
  "Sarah was on a C in A-level Biology. She finished on an A* and is now
  studying Veterinary Science at Bristol, her first choice.")
- Headline: From C to A*: the revision method
- Description: 20 questions, 4 minutes, instant report. Button: Learn More.

**Ad B: r5-the-method** ("Learn the method that took our students from C to A*")
- Primary text: PROOF-2 from the same pack (starts "On average, our students
  jump two grades in about 3 months.")
- Headline: From C to A*: the revision method
- Description and button as above.

Destination URL for both:
`https://alevelaccelerators.com/revision-diagnostic/?for=parents&utm_source=facebook&utm_medium=paid-social&utm_campaign=parents-proof-r3-2026-09`

### 4. Headline test on the winner

Duplicate the Doctor pen ad inside the same ad set, change ONLY the headline to
**"On average, our students jump two grades"**, publish. Same image, same
primary text, same URL. If the duplicate beats the original over the next £25
of spend, the proof-led headline becomes the default on future ads.

### 5. The landing page split test (?start=1)

Duplicate Doctor pen once more and change ONLY the destination URL by adding
`&start=1` to the end. That version skips the landing page and opens on
question one. GA4 says only about 1 in 9 visitors ever starts the quiz, the
single biggest leak in the funnel, and this is the cleanest way to test the
fix: same ad, two URLs, judge on cost per lead after £25 each.

### 6. RD2 budget up to £15 a day

Once steps 2 to 5 are published the campaign holds: pen (control), pen with
the new headline, pen direct-to-question-one, r4 and r5. Raise the campaign
budget to £15 a day so five ads get fed. Total account spend: about £25 a day.

### 7. Housekeeping

Discard the 34 pending drafts (Discard Drafts button, top bar). They are old
edits, not live ads, and they make every review harder.

## Kill rules (unchanged)

- Any ad over £30 a lead after £25 of spend dies.
- Judge nothing before £25 of spend; attention (CTR) shows early, leads do not.
- Hold any budget rise to 20 to 25% every 3 days, and only while blended CPL
  is under £10.

## What to watch after publishing

Tell me when it is live and I will repoint the daily monitor. The two numbers
that decide the next move: MailerLite signups per day back above 4, and the
Custom Audience CPL back under £8 at £10 a day. If the warm audience does not
recover in a week, it is spent; we retire the campaign and let the proof ads
carry the account.
