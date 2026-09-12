# Scalability: the ads, the funnel, the churn, and the road to £10k a month

*Written 12 September 2026, the day after the first mentorship sale. What could be verified from a remote session is labelled; the Ads Manager figures are Waleed's own from 11 September (the daily ad log lives on his Mac, not in the repo). Every projection below is arithmetic on stated assumptions, not a forecast, and the assumptions are the thing to argue with.*

## What the data actually says

**Recorded (repo, August round 1):** best creative £7 to £8 per lead; blended £14.79 per genuine parent lead; "struggling" and pain phrasing beat neutral phrasing two to one on CPL. Round 2 was planned at £15 a day evergreen with a kill rule at £30 per lead.

**Stated (Waleed, 11 September):** about £20 a day on one ad; £70 over the last three to four days; 16 leads, so roughly £4.40 to £7 per lead; five of the 16 interested; one paid, one paying tomorrow, one starting 24 September, one 50/50 on Monday, one after the UCAT on Tuesday.

**Verified (Ads Manager screenshot, 12 September, last 7 days):** campaign "Revision Diag Aug 11th", Leads objective, one ad set live, £20 daily budget. £67.96 spent, 16 website leads, £4.25 per website lead, reach 5,150, impressions 6,722. Two readings from those numbers: the ad only ran about three and a half of the seven days (£68 at £20 a day), and it is cheap and unsaturated (about £10 per thousand impressions, frequency 1.3), so there is headroom before the audience tires.

**Verified (MailerLite, 12 September):** 18 diagnostic leads since 1 September, 10 parents and 8 students, and about 10 of those in the five days the ad has been running. The gap between Meta's 16 and MailerLite's 10 is not a fault. "Website leads" is the pixel's Lead event, and the site fires that same event on every capture point (diagnostic, parents' guide, newsletter, tracker), counted within Meta's attribution window, which also credits people who saw the ad and converted later on their own. So the true cost per diagnostic lead is about £68 divided by 10, roughly £6.80, which is the base case below almost exactly. Two things the September leads say: four of the eight students declined a call while the parents mostly chose Evening, and the buying signal across them is exam technique, a better method and a custom plan, which is the mentorship's exact pitch.

One fix worth ten minutes in Events Manager, no code: create a custom conversion from the Lead event filtered to URLs containing /revision-diagnostic, and optimise the ad set for that instead of the bare Lead event. Meta then chases the lead that actually converts to a call, and the Ads Manager number matches MailerLite.

**Not seen from here:** Stripe, and the Ads Manager totals since the relaunch. Both are on the Mac.

## Unit economics, three ways

| | This week's numbers | Base case (what to plan on) | Stress case |
|---|---|---|---|
| Cost per lead | £4.40 to £7 | £6 | £12 |
| Lead to paying student | 5 of 16 interested, about 3 to 4 likely to pay: 20 percent | 8 percent | 4 percent |
| Cost per student (CAC) | about £30 | £75 | £300 |
| Minimum revenue per student (4 months) | £1,200 | £1,200 | £1,200 |
| Realistic revenue per student (7 months) | £2,100 | £2,100 | £2,100 |
| Return on ad spend, minimum term | about 40x | 16x | 4x |

The base case is deliberately far below this week, because 16 leads and one payment is not a conversion rate, it is a good week. Even the stress case returns four times the spend on the minimum term alone. The conclusion does not depend on which column is right: **the ads are not the constraint at any plausible number.** Waleed's time is.

The pipeline also has a cheaper source than any ad: the 40-plus August leads and the 18 September ones already paid for. A call to the CRM list has a CAC of zero.

## How much to put into the ads

The budget should be set by how many new students can be onboarded a month, not by the return. A student's first four weeks are the expensive part (four weekly hours plus setup), and every lead has to be rung within a day or it cools.

| Daily budget | Monthly spend | Leads a month at £6 | Students a month at 8 percent | Students a month at 4 percent |
|---|---|---|---|---|
| £20 (now) | £600 | about 100 | 8 | 4 |
| £30 | £900 | about 150 | 12 | 6 |
| £40 | £1,200 | about 200 | 16 | 8 |
| £60 | £1,800 | about 300 | 24 | 12 |

A full-time doctor can onboard about four to six new students a month under the delivery shape below. £20 to £30 a day already produces that many at the base case. More budget today buys leads that go uncalled, which is worse than not buying them: a parent who fills in a diagnostic and hears nothing is a lost referral as well as a lost sale.

**The rules, decided now rather than in the moment:**

1. Hold at £20 to £30 a day until the room is open (six students) or a coach is hired. Then step up 20 percent every three days, never doubling, so the ad set does not leave Meta's learning phase.
2. Scale only while the blended cost per lead stays under £10 and every lead is called within 24 hours. If the uncalled queue passes ten, hold the budget, not the calls.
3. Any ad set over £18 per lead after £50 of spend is switched off. That number is the stress-case CAC divided by the stress-case conversion, so it is the point where a lead stops paying for itself in month one.
4. Expect term-time CPL to run 20 to 40 percent above what a good week shows. A £9 week in October is not a broken ad.
5. Keep the diagnostic as the destination for the main spend, and judge it on MailerLite's diagnostic count, not Meta's website-lead count, until the custom conversion is in.

## The number that actually decides £10k a month

Ten thousand pounds a month is 33 students paying at once. It is not 33 sign-ups a month. With a four-month minimum and realistic tenure, the arithmetic is:

- Students who start and pass the risk-free session: about 90 percent.
- Minimum four months, then about 12 percent leave each month, and every Year 13 and resit student leaves after their exams in June whatever happens.
- Average paid months per student, for a September start: about 7 (Year 13 and resit) and up to 20 (a Year 12 who stays into Year 13). Call it 7 to plan on.

So the active count settles at roughly **new students a month, times 7, times 0.9**:

| New students a month, sustained | Students at steady state | Monthly revenue |
|---|---|---|
| 3 | about 19 | £5,700 |
| 5 | about 31 | £9,500 |
| 8 | about 50 | £15,000 |
| 15 | about 95 | £28,500 |

**£10k a month is five new students a month, sustained, with seven-month retention.** That is the first milestone repeated every month, not a different business. And 100 students is about 15 new a month, which is a different business.

The lever most people miss: one extra month of average tenure at five new students a month is worth about £1,500 a month at steady state. Retention is worth more than any ad budget change, which is why the scorecard, the month-one review page and the parent update exist.

## The timeline, month by month (base case)

Assumes four new students a month this autumn rising to five from January, 8 percent lead-to-sale, £6 CPL, the delivery shape below, a coach from fifteen students, and the June cliff.

| Month | New | Active (approx) | Monthly revenue | What has to be true |
|---|---|---|---|---|
| Sep 2026 | 4 | 4 | £1,200 | The one paid, the one paying tomorrow, 24 September, and one of the two maybes |
| Oct | 4 | 7 | £2,100 | **Milestone 1 (five students) passed in early October.** Ads held at £20 to £30. Room opens at six |
| Nov | 4 | 11 | £3,300 | **Milestone 2 (matches the doctor's salary) in November or December.** Every lead still rung personally |
| Dec | 3 | 13 | £3,900 | Christmas is slow for sign-ups; keep-warm plans run |
| Jan 2027 | 5 | 17 | £5,100 | Mocks drive January demand. First churn from the September cohort begins. Coach hiring starts |
| Feb | 5 | 21 | £6,300 | Coach takes the fortnightlies; ads step up to £40 |
| Mar | 4 | 24 | £7,200 | |
| Apr | 4 | 27 | £8,100 | Easter run-in; Year 13s at peak value |
| May | 3 | 28 | £8,400 | **First touch of the £10k pace if conversion holds above 8 percent; the base case gets close, not over** |
| Jun | 1 | 14 | £4,200 | **The June cliff: Year 13 and resit students leave after their exams.** Summer Accelerator carries the summer |
| Jul to Aug | 2 a month | 14 to 16 | £4,500 | Year 12s stay; results-week wave restocks the top of the funnel |
| Sep to Nov 2027 | 8 a month | 30 to 40 | **£10k a month crossed and held, October to November 2027** | Waleed out of medicine, a proven funnel, a room, one coach, ads at £60 to £80 a day |
| 2028 | 12 to 15 a month | 80 to 100 | £25k to £30k | **100 students.** Two to three coaches, cohort onboarding, the Plus tier or recorded subject layer, a second acquisition channel beyond Meta |

**If lead-to-sale is 4 percent rather than 8**, every date moves out by roughly six to nine months: milestone 2 in February 2027, £10k held from spring 2028, 100 students in 2029. **If it is genuinely 15 to 20 percent**, the constraint is purely onboarding and the dates come forward by two to three months, which is exactly why the coach and the room matter more than the ad budget.

The June cliff is the honest shape of this market. Two ways to soften it: recruit Year 12s deliberately from January (they are the students who stay 18 months), and treat the Summer Accelerator as the mentorship's summer product rather than a separate business.

## The delivery shape, and the hours it costs

Waleed's proposal: weekly one-to-one for the first four weeks, then fortnightly; concerns answered in the Skool community; one or two small-group teaching sessions a week in Skool. It is a better fit for a doctor's rota than the eight weeks of weekly one-to-one in file 04, and it works with four adjustments:

1. **Fortnightly sessions are 45 minutes, not 60.** The scorecard does the preparation, so 45 is enough, and it is the difference between 21 and 28 hours a week at 33 students.
2. **Session 6 (starting: the system that survives your moods) is the first fortnightly one-to-one, never a room topic.** Week six is where students drift, and it needs the student's own skipped-sessions pattern in front of them.
3. **The room's teach rotation starts with phase two** (spacing, starting, the free-week protocol, the stuck-topic test), because those are the teaches the fortnightly cadence no longer covers one-to-one. One room session a week until eight students, then two: one teach, one hot seats.
4. **The monthly review stays one-to-one** and lands on the fortnightly cadence anyway (sessions 8, 12, 16, 20, 24), so nothing about the parent update changes.

Hours a week under that shape, with the community answered in one 20-minute daily window:

| Students | Of which in their first month | One-to-one hours | Room | Community and admin | Total a week |
|---|---|---|---|---|---|
| 5 | 2 | 3.5 | 1 | 2 | about 6.5 |
| 12 | 4 | 7 | 1.5 | 3 | about 11.5 |
| 20 | 5 | 10.5 | 2 | 3.5 | about 16 (needs a coach) |
| 33 | 5 | 15.5 | 2 | 4 | about 21.5 alone, about 9 with a coach on the fortnightlies |
| 100 | 15 | not possible one at a time | 3 | 5 | cohort onboarding, two to three coaches, Waleed about 12 |

The line to watch is 12 students: it is the doctor's-salary milestone and it is about 11 to 12 hours a week on top of a full-time rota. That holds for a term, not a year. The coach conversation starts at 12, not at 20, so the coach exists at 15.

## What would make this fail

- **Leads not called within a day.** Every other number in this document assumes the call happens. It is the whole funnel.
- **Refunds after session one.** The risk-free session is a promise, and a student who walks costs a month's ad spend. The first session runsheet is built to make that rare; the hours audit and the live blurt are what make a parent believe.
- **The month-three dip going unmanaged.** Session 12 names it on purpose. A student who stops at month four is £900 of the £2,100 plan gone.
- **Scaling ads before scaling delivery.** Cheap leads that cool are the fastest way to poison a small market. The parents talk to each other.
- **Waleed as the only diagnostician forever.** The coach is the step that turns five a month into eight. Hire early, train by sitting in on calls, and let the runsheets be the manual.

## What to do this week

1. In Events Manager, create the diagnostic-only custom conversion and switch the ad set to optimise for it, so the ad chases the lead that converts and the numbers reconcile.
2. Hold the budget at £20 to £30 a day. Ring every lead within a day. Work the August list.
3. Run the first two students exactly to the runsheets for four weeks. The month-one review page and the first parent email are the retention mechanism, and the first sale is the one that proves it.
4. Sign the 24 September parent and close the two maybes before the ad produces anyone new.
5. Put the six-student mark on the calendar as the day the room opens and the day the ad budget first steps up.
