# Baseline before the report sells the call (12 October 2026)

Internal record, written the afternoon the change went live, so the next read can
tell whether sending report readers to the Zoom scheduler helps or hurts. Every
number below was read from the source named on the day; nothing is modelled.

## What changed, and when

- Section 02 of the diagnostic report (both paths) became the free strategy call
  card with a full-width booking button; the Top 1% Mentorship moved to a text link
  and the closing band's outline button. Live on main from commit 60a99cb,
  12 October 2026 (afternoon, UK time). Before this, section 02 was the programme
  card and every primary button pointed at /study-systems/.
- Nothing else on the page changed: same questions, same gate, same report cover,
  same MailerLite record, same phone push.

## Ads context (Ads Manager, read-only, 12 October)

- Campaign "New Revision Diagnostic Tests 03/10", Active, campaign budget 20 pounds
  a day, two ad sets left on (Student Quote, Original + Future Medic Header).
- 3 to 7 October: 401.93 pounds spent, 30 Meta-attributed leads (typed into the HQ
  ad-spend store on 7 October from the screen).
- 8 to 11 October: NO spend. The campaign did not deliver on those four days after
  the budget cut and the ad set removals. It resumed on 12 October: 15.03 pounds and
  3 leads by mid-afternoon (Student Quote 10.97 / 1 lead, Original + Future Medic
  Header 4.06 / 2 leads; 869 impressions, 16 link clicks, 13 landing page views).
- So the week before the change is NOT a clean ads week. Judge the change on rates
  (per report reader, per lead), not on volumes.

## Leads (MailerLite, the two diagnostic master groups, by day)

| Day | Parents | Students | Total | Callback requests |
|---|---|---|---|---|
| 3 Oct | 5 | 0 | 5 | 1 |
| 4 Oct | 6 | 3 | 9 | 2 |
| 5 Oct | 6 | 5 | 11 | 2 |
| 6 Oct | 3 | 4 | 7 | 1 |
| 7 Oct | 5 | 3 | 8 | 0 |
| 8 Oct | 5 | 0 | 5 | 1 |
| 9 Oct | 1 | 1 | 2 | 0 |
| 10 Oct | 2 | 1 | 3 | 0 |
| 11 Oct | 1 | 0 | 1 | 0 |
| 12 Oct (to 4pm) | 2 | 0 | 2 | 1 |

Callback requests are joins to the "Callback requested" group (196438369449805734).
8 requests against 53 leads since 3 October, about 15 percent. This is the number
most likely to FALL after the change, because the booking button now sits above the
callback link; that is acceptable only if scheduler bookings rise by more.

## Site funnel (GA4, property 538386511, 5 to 11 October, read 12 October)

Sessions 1,065, users 954. Events (count, users):

| Step | Count | Users |
|---|---|---|
| diagnostic_start | 84 | 84 |
| diagnostic_halfway | 61 | 61 |
| diagnostic_questions_done | 58 | 58 |
| generate_lead | 67 | 48 |
| diagnostic_report_viewed | 36 | 36 |
| diagnostic_route_click | 40 | 14 |
| diagnostic_callback_request | 4 | 4 |

Rates to hold the change against:

- Quiz completion: 58 of 84 starts finished, 69 percent.
- Gate completion: 48 lead users from 58 finishers, 83 percent (the week before,
  1 to 7 October, it read 54 of 69, 78 percent). This should NOT move; the change
  is below the gate.
- Report readers who clicked any programme or call link: 14 of 36 report viewers,
  39 percent (40 clicks, so clickers click about three times). This is the headline
  rate to watch, and it should go UP, with the clicks now landing on the scheduler.
- GA4 undercounts (ad blockers, Meta's in-app browser); MailerLite is the lead
  count of record. GA4 saw 48 lead users in a week MailerLite recorded 37 leads for
  5 to 11 October, because generate_lead also fires from the parents' guide,
  tracker and newsletter forms, so read the diagnostic steps, not generate_lead, for
  the diagnostic.

GA4 gap to close: `diagnostic_route_click` carries `placement` and `target`
parameters (route_section, closing_band, callback_card, sticky_bar, plan_day1;
programme or book_a_call) but neither is registered as a custom dimension, so the
Events report cannot split programme clicks from scheduler clicks. Registering both
(Admin, Custom definitions) is a one-minute job in Waleed's GA4 account and makes
the next read far sharper. Data only accrues from the day they are registered.

## Bookings (the number that decides it)

The scheduler carries no pixel, so bookings are counted from Waleed's Zoom
Scheduler and calendar, not from the site. Baseline from the Fathom record: strategy
calls held 5 to 11 October: Iffa (5), Aliya (5), Sabeer (6), Zane (6), Karolina (7),
Akshara (7), Zakki (7, GCSE), Norman/Maya (9), Ali (11): nine calls in the week,
nearly all booked by Waleed ringing the lead or sending the link himself, not by the
lead clicking through from the report. The target after the change is self-booked
calls appearing in the scheduler without a chase.

## How to read it in a week (19 October)

1. MailerLite leads per day and the callback count, same tables as above.
2. GA4 5-step funnel for 12 to 18 October against the rates above (quiz completion,
   gate completion, report-reader click rate).
3. Scheduler bookings that arrived without Waleed chasing, against roughly zero.
4. Ads: spend per day from Ads Manager with Breakdown: Day, because the campaign
   was dark 8 to 11 October and may not run evenly.

If gate completion holds, report-reader clicks rise and self-booked calls appear,
keep it. If leads fall without bookings rising, bring the programme card back
(the previous section 02 is in git at fa60064).
