# Change plan for Waleed's approval, 13 July 2026

Every change below comes from the audit (`2026-07-13-business-audit-and-growth-plan.md`), consolidated into four batches. Nothing here has been executed. Approval works by replying in chat; the format is at the bottom. This file is the durable copy.

## New since the audit: the Stripe truth

Stripe was connected after the audit shipped, so ask 2 of section 9 is now answered, from the account itself:

- 18 successful payments in the account's entire live history, all between 20 February and 6 May 2026. Gross £6,443, minus £870 in partial refunds: **£5,573 net lifetime, before Stripe fees**.
- Price points that sold: £479 (7 times), £239 (5), £289 (2), £429, £399, £300, £189. All from the February to May funnel.
- **No current site price point (£289/£539/£739/£849 summer, £339/£629/£849 subject, £119/£499 system) has ever taken a payment. The Summer Accelerator page has sold zero places.**
- The last sale was 6 May, the same day as the last email broadcast. Every sale cluster falls within days of a workshop email cycle. Emails stopped; sales stopped.
- Pattern worth knowing: 4 of 18 payments were later half-refunded (looks like dropped subjects), and one household bought three times.

This makes the audit's play 1 (the cohort sprint on the warm list) the confirmed priority, and it makes these fixes the runway for it.

## Batch 1: site fixes (one branch, merged to main on approval, which deploys)

1. /workshop page: replace the stale "Saturday 2nd May" with the next workshop date if Waleed supplies one, otherwise a "next date announced soon, join the list for first invite" state. Re-link the page from the Free Tools dropdown and footer (it is currently orphaned).
2. Blog course buttons: the Year 12 summer article's "Explore the Summer Accelerator" button points at /summer-accelerators instead of the homepage; resits, predicted grades, choosing a tutor and one-to-one tutoring articles point at /subject-accelerators.
3. og:image: one branded 1200x630 share card, wired site-wide, so shared links carry a proper card on WhatsApp, Facebook and LinkedIn.
4. Titles: remove the doubled "| A-Level Accelerators" suffix on the six affected pages (includes the homepage title render; the chosen wording stays, only the duplicated suffix goes) and change "Programs" to "Programmes" in the subject page title.
5. llms.txt: add the Revision Diagnostic and Sunday Session newsletter pages.
6. Summer page scarcity line: swap "limited spaces" for the real capacity number. Blocked until Waleed supplies the number.

## Batch 2: legal pages (drafted now, deploy only after Waleed reads them)

7. Privacy policy: what is collected and why, MailerLite/Stripe/Zoom/Vercel as processors, under-18 data, retention, rights, ICO complaint route, contact.
8. Terms for the paid programmes: refund position matching the published "first session risk-free", cancellation rights, delivery over Zoom, recordings.
9. Both linked from the footer. ICO registration itself stays with Waleed.

## Batch 3: MailerLite account fixes (live account changes)

10. Parent Leads nurture email 1: swap the old Google Drive guide link for the on-site PDF, using the prepared copy in `content/parent-guide/delivery-email.md`.
11. Delete the empty superseded automation shell 192745483429479786 (the sequence README already says to).
12. Delete the empty legacy "Newsletter Signups" group 181053980331214369.
13. Delete the 7 stale draft campaigns from February and May. Irreversible, so it needs its own tick. Sent campaigns and their stats are untouched.

## Batch 4: repo, analytics and records

14. Merge the partnership branch (`claude/partnership-research-outreach-a4a4gy`) into main so the PMT dossier and skill stop being stranded. Sending the outreach email remains a separate decision.
15. Wire Vercel Web Analytics into the code (cookieless, no consent banner needed). Waleed flips the toggle in the Vercel dashboard. The Meta pixel stays deferred until the privacy policy is live and paid testing is approved.
16. Delete 4 dead branches: the two old workshop landing pages, the abandoned analytics branch, tender-knuth. gh-pages stays. Irreversible, so it needs its own tick.
17. Records: write the Stripe findings into the audit (aggregates only), mark ask 2 answered, refresh dashboard seed tasks, CLAUDE.md and the Cowork snapshot.

## Deliberately not in this plan (separate decisions)

Every email send (SS1 on Sunday 19 July, the re-opening email, the workshop invite), the PMT outreach send, Results Day Rescue, the 25 July September-flip session, the MailerLite key rotation (scheduled after the cohort closes), anything paid, and the September group dedupe.

## Decisions needed from Waleed

- **A. Cohort date:** 25 July as published, or moved once to a stated August date, or "undecided, run the fixes and hold the date-dependent copy".
- **B. Batches:** which of 1 to 4 to execute (recommendation: all four).
- **C. Deletions:** draft campaigns, dead branches, both, or neither.
- **D. Two numbers when ready:** the honest cohort capacity, and the next workshop date if one is set.

Reply format example: "Date: 25 July. Batches: all. Deletions: both. Capacity: N."
