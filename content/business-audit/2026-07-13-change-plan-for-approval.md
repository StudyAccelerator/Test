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
6. (Removed at Waleed's instruction. The scarcity line stays as "limited capacity" with no public number, and no cohort date beyond the 25 July already on the page is made public.)

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
15. Wire Vercel Web Analytics (cookieless, Waleed flips the toggle in the Vercel dashboard) and the Meta pixel. Per Waleed's instruction the pixel is included now, not deferred; it is wired dormant and only loads and sets a cookie once `NEXT_PUBLIC_META_PIXEL_ID` is set in the environment, so switching it on is a one-line env change. It should be switched on together with the privacy policy going live.
16. Delete 4 dead branches: the two old workshop landing pages, the abandoned analytics branch, tender-knuth. gh-pages stays. Irreversible, so it needs its own tick.
17. Records: write the Stripe findings into the audit (aggregates only), mark ask 2 answered, refresh dashboard seed tasks, CLAUDE.md and the Cowork snapshot.

## Deliberately not in this plan (separate decisions)

Every email send (SS1 on Sunday 19 July, the re-opening email, the workshop invite), the PMT outreach send, Results Day Rescue, the 25 July September-flip session, the MailerLite key rotation (scheduled after the cohort closes), anything paid, and the September group dedupe.

## Decisions (answered 14 July)

- **A. Cohort date:** 25 July for now, may change, and the possibility of change stays private. Nothing new made public; the page keeps its existing 25 July.
- **B. Batches:** all four approved, Waleed does the final merge to main.
- **C. Deletions:** all dead branches yes; MailerLite drafts kept for now.
- **D. Numbers:** no public cohort number ("limited capacity" stays); no workshop date set yet.

## Execution status (14 July)

Done on the branch (awaiting Waleed's merge to deploy):
- Batch 1 site fixes: all done and verified in the static export. Point 6 dropped per decision A.
- Batch 2 legal pages: /privacy and /terms drafted, footer-linked, in the sitemap. They deploy when Waleed merges; the bracketed placeholders (entity, address, ICO number) are the review gate and must be filled first.
- Batch 4 code: Vercel Analytics and the dormant Meta pixel wired; partnership branch merged into the lineage; audit and docs updated with the Stripe truth.

Done live (already in effect):
- MailerLite: empty legacy "Newsletter Signups" group deleted; empty superseded automation shell deleted. Drafts untouched.

Could not be done from this session, handed to Waleed:
- The four dead branches could not be deleted: the session's git credentials only allow pushing to the working branch, so the remote refused the deletions with HTTP 403. Delete them in the GitHub branches UI: `claude/workshop-landing-page-8kpY1`, `claude/workshop-landing-page-OzlxS`, `vercel/install-vercel-web-analytics-87om45`, `claude/tender-knuth-GptLs`.
- The parent nurture email link swap stays a dashboard task, because its real content is a designed HTML email and the API can only overwrite the plain-text fallback, which would destroy the design. Steps and ready copy are in `content/parent-guide/delivery-email.md`: pause the automation, edit the first email's download button to `https://alevelaccelerators.com/ALevel-Accelerators-Parent-Guide.pdf`, reactivate.

Waleed's switch-ons after merge:
- Enable Web Analytics in the Vercel project dashboard.
- Add `NEXT_PUBLIC_META_PIXEL_ID` in Vercel when ready to start pixel tracking.
- When ready to publish the legal pages: fill the placeholders and follow `content/legal-drafts/README.md`.

## Update, 15 July: reviewed, redirected and made live

Waleed reviewed the work and redirected two items, then instructed the session to make the branch live.

- **Legal pages parked.** The /privacy and /terms routes, footer links and sitemap entries were removed. The complete drafts moved to `content/legal-drafts/` with restore steps. They stay off the site until Waleed finalises the entity details, and nothing on the site references them.
- **Deliverability concern withdrawn.** Waleed had already verified (14 July, separate session) that the domain's DMARC, SPF and DKIM records are live and correct, and the third party "0% compliance" emails are a false alarm. The earlier risk note was removed; the standing correction lives in CLAUDE.md so no future session re-flags it.
- **Folded into the branch before going live:** the 15 July diagnostic conversion rework (frustration-led hero, parent and student audiences, optional phone capture, national-stats proof band), the Sunday Session MailerLite load (7 complete drafts plus the fragment builder), and the HQ dashboard v3 plus Monzo panel from main.
- **Merged to main and deployed 15 July** on Waleed's instruction.
