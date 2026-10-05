# Google Ads: the first search test (2 October 2026)

Waleed's decision, 2 October 2026: test buying the head terms we cannot yet rank for organically ("a level tutor" and its family). Rationale: page 1 for those terms is gated on domain authority we will not have for months, Meta is proven at £4.37 to £7.61 per lead, and a £10 a day search test tells us in two weeks whether high-intent search traffic converts better than interrupt traffic. Nothing here is live: Waleed creates the account and presses every Publish himself. Sessions may draft and read, never edit a live ads account.

## The shape

- One campaign, Search only (untick Display Network and Search Partners, both waste money on a first test).
- Budget £10 a day. Location: United Kingdom. Language: English.
- Bidding: start on Maximise clicks with a £6 max CPC cap, switch to Maximise conversions once 15 to 20 conversions have recorded.
- Landing page: https://alevelaccelerators.com/ (the programme hub with Book a Call). The diagnostic rides as a sitelink, not the destination: someone searching "a level tutor" wants a tutor, not a quiz.

## Conversions (do this before launch or the test is unreadable)

1. In Google Ads: Tools, Data manager, link the GA4 property "A-Level Accelerators Website" (G-RGPD6KKPR4, the waleed@alevelaccelerators.com account).
2. Import the GA4 key events `generate_lead` and `diagnostic_callback_request` as Google Ads conversions. Both are live key events since 24 September.
3. Set `generate_lead` as primary, `diagnostic_callback_request` as primary, everything else secondary.

## Keywords (phrase match unless stated)

5 October 2026: Pragya's Keyword Planner export confirms real volumes and bids for this set: a level chemistry tutor 880 searches a month (top of page bids £5.11 to £14.13), a level biology tutor 590, a level maths tutor near me 480, a level tutors near me 480, a level tuition 390, the rest 170 to 320. Her list misses "a level tutor" itself, which stays in. Her bid ranges mean the £6 CPC cap will sometimes buy positions below absolute top; fine for the test, revisit the cap if impression share is tiny.

Buyer intent core: "a level tutor", "a level tutors", "a level tuition", "a level tutoring", "online a level tutor", "a level tutor online", "best a level tutors uk".
Subject: "a level biology tutor", "a level chemistry tutor", "a level maths tutor" (and the "tutor a level biology" word orders Google folds in).
Parent phrasing: "tutor for a level student", "a level help for my child".

Negative keywords from day one: free, jobs, job, salary, become a tutor, how to become, gcse, physics, degree, university tutor, dbs.
(Physics is negative because the Subject Accelerators sell Biology, Chemistry and Maths only. Review the search terms report weekly and feed new negatives in.)

## Ad copy (responsive search ad, within Google's 30 and 90 character limits)

Headlines:
1. A-Level Tutoring That Works
2. Taught By An NHS Doctor
3. From About £14 An Hour
4. Book A Free Strategy Call
5. Biology, Chemistry, Maths
6. 1,000+ Students Taught
7. Small Group A-Level Teaching
8. Average Two Grade Jump
9. Free Revision Diagnostic
10. A-Level Accelerators

Descriptions:
1. Built by Dr Waleed Ahmad, NHS doctor and former top A-level student. See every price upfront.
2. Live small group teaching to a proven method. About £14 an hour against £40 to £50 for 1:1.
3. Book a free call and get a full strategy plan for your grades. No commitment needed.
4. Start with the free 20 question Revision Diagnostic and see exactly what to fix first.

Sitelinks: Pricing (/pricing/), Free Revision Diagnostic (/revision-diagnostic/), Subject Accelerators (/subject-accelerators/), Meet Dr Waleed (/about/ once live, else /study-systems/).

The two grade average and the doctor framing are Waleed's approved claims. No grade guarantees anywhere: the satisfaction guarantee is the guarantee.

## Kill and scale rules

- Two weeks or £140, whichever first, then judge.
- Kill if: cost per lead over £25 with conversions importing correctly, or CTR under 2 percent (search intent should beat Meta's interrupt CTR easily).
- Scale if: cost per lead at or under Meta's £4 to £8, raise to £20 a day and split subject keywords into their own ad group.
- Weekly: search terms report read, negatives added, logged here.

## Log

| Date | Spend | Clicks | CTR | Leads | CPL | Notes |
|---|---|---|---|---|---|---|
| | | | | | | |
