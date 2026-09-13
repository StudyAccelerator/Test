# Meta ads: snapshot, history, funnel drop-off and the plan (13 September 2026)

Every number below was read live on 13 September 2026 from Ads Manager
(account 980086329528962), the GA4 funnel exploration (property 538386511)
and MailerLite. Nothing is estimated unless it says so.

## 1. Snapshot: where the ads are right now

The August campaign "Revision Diag Aug 11th" never actually died. It went
quiet for a fortnight after its 20 August end date, then picked back up from
6 September. Last 7 days (6 to 12 September):

- **16 website leads at £4.37 per lead**, about £70 spent (roughly £10 a day
  against its £20 daily budget, so Meta is pacing well under budget)
- Reach 5,241, frequency 1.34
- Waleed's own read of 43p per landing page view stands: that makes it about
  160 landing page views for 16 leads, a landing-page-view-to-lead rate of
  roughly 10%

MailerLite agrees: 10 parent and 9 student diagnostic signups since 30
August, almost all from 6 September onwards, plus one callback request on 12
September. Before 6 September the account was effectively dark (about £5 spent
in the week to 5 September).

Housekeeping still outstanding in the account: 31 pending draft edits in
Review and publish, including a duplicated "Revision Diag Aug 11th - Copy"
campaign sitting in draft.

## 2. History: every diagnostic ad to date

| Flight | Spend | Leads | CPL | What it proved |
|---|---|---|---|---|
| July face test (28 Jul to 3 Aug) | £70.17 | 2 | £35.09 | First creative, paused correctly |
| July profiles test | £43.32 | 7 | £6.19 | Profiles angle converts cheaply |
| August callout test (13 to 20 Aug, 10 creatives) | £354.98 | 36 | £9.86 | Doctor image wins decisively (30 of 36 leads at £7.26); "struggling" pain callouts beat "studying" two to one; mums 45 to 54 are the buyer |
| Same campaign, tail to 12 Sep | about £178 | 34 | about £5.20 | The winner keeps improving as Meta learns |
| **Lifetime, that campaign** | **about £533** | **70** | **£7.61** | Reach 28,455, frequency 1.88 |

All diagnostic spend since July: roughly £646 for 79 Meta-attributed leads,
about £8.18 blended. Against the education benchmark of about £16 to £17 per
lead, the account has run at half the going rate throughout.

## 3. Where parents and students drop off (GA4, 16 Aug to 12 Sep)

The funnel exploration "Diagnostic funnel (drop-off)" now has data. Because
`diagnostic_start` only fires since the 26 August fix, and because ad blockers
suppress some GA traffic, these are directional numbers on a small sample (41
starts), not a census. The shape is clear all the same.

| Step | Users | Reached from previous step | Dropped |
|---|---|---|---|
| 1. Started the quiz | 41 | | |
| 2. Reached halfway | 33 | 80% | 20% |
| 3. Answered all 20 | 28 | 85% | 15% |
| 4. Gave their details (the gate) | 20 | 71% | **29%** (mobile 32%, desktop 20%) |
| 5. Read their report | 20 | 100% | 0% |
| 6. Clicked a programme or call | 8 | 40% | **60%** (mobile 67%, desktop 50%) |

And the step the funnel cannot see, from Meta's own numbers: about 160
landing page views produced 16 leads (10%), while GA4 says half of everyone
who starts becomes a lead (20 of 41). Put together, **roughly four in five
parents who land on the page never answer question one.** That is the biggest
leak by a distance, bigger than the gate and the report combined.

So the three leaks, in order of size:

1. **Arrival to first answer, about 80% lost.** The landing page is doing the
   work of a sales page for traffic that has already been sold by the ad.
2. **The gate, 29% lost, worse on mobile.** The phone field is the friction;
   the gold "free strategy plan" card went live on 5 September and this sample
   mostly predates it, so this number should already be improving.
3. **Report to action, 60% lost, two thirds on mobile.** People read the
   report and leave without clicking a programme or the call.

Quiz-middle drop (20% then 15%) is normal for a 20-question tool and not
worth optimising yet.

### What to change on the diagnostic page (recommendations, not yet built)

- **Skip the intro for paid traffic.** When the URL carries `?for=parents` and
  `utm_source=facebook`, land straight on question one with the parent path
  already chosen, and echo the ad's hook above it ("Let's find out why the
  grade is stuck"). The ad already did the selling; the page should start the
  quiz. This targets the 80% leak and is a small code change.
- **Two-step gate on mobile.** Ask name, child's name and email first, show
  the report, then ask for the phone as the "one last thing" before the plan,
  with the gold card as it is now. Splitting the decision usually lifts
  completion; the diagnostic would still never show the plan without the
  number. Run as an A/B against the current single gate.
- **Report: a sticky "Book my call" bar on mobile** and the two-grade proof
  line on the route card. Two thirds of mobile readers leave without a click;
  the CTA is below a long report on a phone.
- Say the word and the first one ships today; the other two are a day each.

## 4. Return on ad spend, with the mentorship in the picture

The Top 1% Mentorship is now £300 a month (his ruling, 6 September; the
£2,000 a year figure is retired). One student has signed up and a few more
are interested. Two things follow for the ads:

- **The mentorship changes the economics completely.** A Subject Accelerator
  double at £629 carries £1,000 a subject of tutor cost; the mentorship is
  Waleed's own time, so nearly every pound is margin, and it recurs. Over
  three months one mentorship student is worth £900, over six months £1,800.
- **Against the ad spend to date:** all diagnostic ads ever have cost about
  £646. One mentorship student at £300 a month covers that in just over two
  months of retention, if that student came through the ads. Whether they
  did is the question only Waleed can answer (which lead, which source), and
  the CRM card should say so from now on.

Break-even framing for scaling, stated as scenarios rather than predictions:

| Leads per mentorship sale | CAC at £7.61 per lead | 3-month revenue | 3-month return |
|---|---|---|---|
| 1 in 10 | £76 | £900 | 11.8x |
| 1 in 20 | £152 | £900 | 5.9x |
| 1 in 50 | £380 | £900 | 2.4x |
| 1 in 100 | £761 | £900 | 1.2x |

Even at one sale per hundred leads the ads pay for themselves within a
quarter. The real constraint is not the ad maths; it is call capacity
(Waleed's evenings around hospital shifts) and the share of leads who become
a booked call. That is why the call funnel and the proof ads are the next
tests, not a bigger budget on the same ad.

## 5. Scalability: how far and how fast

- **Rule:** raise a campaign's daily budget by 20 to 25% every three days
  while blended CPL stays under £10 and calls are being booked. Hold when CPL
  runs over £12 for three consecutive days, or when the week's call slots are
  full.
- **Ladder:** £20 a day now (the old campaign alone), £40 to £45 a day today
  once the new campaigns are live, £60 a day in week three if CPL holds, £100
  a day in month two only once a mentorship sale is attributed to the ads.
- **Watch frequency.** Lifetime 1.88 on the old campaign and 1.34 last week:
  fine, but the same doctor image has run since 13 August, so creative fatigue
  is the next thing that will push CPL up. The proof round exists to refresh
  it before that happens.
- **Term-time expectation:** a CPL of £8 to £12 in October is normal, not a
  failure; results week was the cheap season.

## 6. Ideas worth testing (his list, plus mine)

1. **Book a call direct, with a Meta Instant Form (yes).** Build it as the
   Leads objective with an Instant Form ("higher intent" form type, fields
   Name, Phone, best time to call, subjects). Meta can optimise for it
   properly, the lead lands in the same call-first motion, and it costs less
   per lead than sending people to the Zoom scheduler cold. Run the scheduler
   version beside it and judge on booked calls, not form fills. The copy is
   in the round 2 pack (CALL-1 to CALL-4).
2. **Proof ads (built today).** Sarah's C to A*, the two-grade average, the
   96% first-choice offers, and a testimonial card. Copy pack beside the
   images.
3. **Click-to-WhatsApp ads.** Meta's Messages objective can open a WhatsApp
   chat with him from the ad. It fits the texting workflow he already runs
   with opt-outs, and a parent's first message is a warmer lead than a form.
4. **Retargeting with the proof ads.** The pixel has 28,000 reached and a few
   hundred site visitors; a £5 a day retargeting ad set showing the proof
   creatives to people who visited the diagnostic but never converted is the
   cheapest sale in the account. Small audience, so it stays a side layer.
5. **A talking-head video.** Still the biggest untested format; the video
   script skill can produce a 20 second script from any of these hooks.
6. **Lookalike of the 79 leads** once the count passes 100; too small before.

## 7. Today's build, in order

1. **Discard the 31 drafts** in Review and publish (including the "- Copy"
   campaign) so the account is clean.
2. **Leave "Revision Diag Aug 11th" running exactly as it is.** It is the
   evergreen: £4.37 a lead last week is the best the account has ever done.
   Do not edit it (edits reset learning).
3. **New campaign "Proof test | Sep 2026", £10 a day**, Leads objective,
   one Advantage+ ad set (UK, Facebook and Instagram, broad), four ads from
   the proof pack: r1, r2, r6 and r3 with their paired texts.
4. **New campaign "Book a call | Sep 2026", £10 a day**, two ad sets:
   Instant Form (Leads objective) and scheduler (Traffic, landing page views),
   creatives c1 to c4 from the round 2 pack with CALL-1 to CALL-4.
5. Optional: the paid-programme probe at £5 a day (p1 and p2 from round 2).
6. Total £40 to £45 a day. Kill rules: any creative over £30 a lead after £25
   of spend dies; a call ad with no bookings or form leads after £70 dies.
7. Tell me when it is published and I repoint the daily monitor at the new
   structure; and tell me which lead the mentorship student was, so the ROAS
   in the CRM is real rather than assumed.
