# Daily broadcasts: the layer on top of the sequences

Added 31 August 2026, on Waleed's instruction after reading Ian Stanley's "Just F*cking Send It". The email operation now has two layers, exactly as the book prescribes:

1. **Automated sequences** (in `content/email-sequences/`, loaded by the engine) own a lead's first 14 days. Near daily, front-loaded, one CTA per email. These are the "welcome sequence" layer: people are most likely to buy soon after joining, so the sequence takes that window.
2. **Daily broadcasts** (this folder) own everyone else, forever. One email a day to the whole active list, alongside The Sunday Session. This is the relationship-and-revenue layer: you hear from the people who matter most daily, not monthly.

## The Ian Stanley playbook, distilled for this business

The book's four principles: send more emails, send better emails, send the right emails at the right time, and don't be boring. Applied here:

- **Cadence:** daily, or damn near. Consistency beats perfection; a good email sent beats a perfect one drafted. Sundays are the best selling day (people decide to change their lives on Sundays), which is exactly where the Sunday Session and cohort deadlines already sit.
- **The Emotional Bank Account:** most emails are deposits (a teach, a story, a laugh, a belief confirmed); promos are withdrawals. Keep the balance positive and a list stays warm for years. Never string withdrawals together without deposits.
- **Just The Tip / soft teaching:** each email is ONE idea. Teach the WHAT fully and freely; the HOW (coached, structured, accountable) is what the programmes sell. Never leave a reader with nothing, never give away the whole treatment.
- **The Core Offer Wheel**, mapped to us: front end = the free diagnostic (and tracker); back end = Subject Accelerators (£339 to £849) and the Study Accelerator (£499); recurring = nothing yet (the planned Skool membership would fill this slot, worth remembering); promos = 1 to 2 real pushes a month with an honest deadline, and September's is the cohort itself. Rotate the wheel across the week; every email links somewhere (90 percent rule), often just in the PS.
- **Email types to rotate** (the book's ten, in our voice): paradigm shift (never smart enough vs never taught), story/confession, worst way, best way without, 80/20, Mr Miyagi (what-not-how), results, value, lifestyle, FAQ. Plus the "Questions?" reply-harvest email before any close, and the FAQ email near every deadline.
- **Subject lines:** curiosity + benefit is the reliable formula ("the drill that finds your missing marks"), sentence case, honest, and the email must pay off the promise. The deeper goal is that the from-name "Dr Waleed Ahmad" becomes the reason people open.
- **CTAs:** one primary CTA at the END of the email. "Click here"-style plain links work; reply-CTAs build deliverability; the PS is prime selling space; the "ways to work with me" PS rotates in occasionally. The email's job is to set up the click.
- **Re-engagement:** Dean Jackson's nine word email, sent as-is, no additions. Most buyers buy after 90 days, so a quiet list is an asset that needs waking, not deleting.
- **Sequence handoff:** when a sequence finishes, the lead joins the daily broadcast audience. The sequences now say so honestly (the old "one email a week" promise is retired).

Honesty rules still bind everything: no invented numbers, urgency only from the real calendar (cohort dates, capped places), Waleed's voice per `.claude/skills/content-studio/references/email-style-waleed.md` (the 6 September standard, learned from his own edits; it supersedes the 28 August natural-voice pass). Proof is stated his way: "on average, our students jump two grades", real testimonial quotes, the satisfaction guarantee. Never the retired confidence statistic, and never a "we don't promise grades" line in any form.

## This folder

- `2026-09-launch/` — the first live arc: re-engagement (1 Sept), six deposit emails (2 to 6 Sept), then the September cohort promo week (7 to 13 Sept, closing the day the cohort starts). Each file is engine-format markdown; `manifest.json` maps files to campaign names, dates and audiences. Load with `python3 scripts/email-engine/engine.py campaigns content/email-broadcasts/2026-09-launch --live` (creates DRAFT campaigns in MailerLite; nothing sends until each is scheduled).
- After the arc: one email a day continues from the weekly production routine (see `PRODUCTION.md`).

## Audiences

- **Students + mixed** ("the list"): every active group except the parent groups and the internal alert group.
- **Parents**: Revision Diagnostic Parents + Parent Leads. Parents get the parent-voiced versions on promo days and are excluded from student-voiced dailies where the framing wouldn't land; where a teach works for both, they're included.
- New-joiner overlap: someone inside their 14 day sequence may also get the daily during promo weeks. The book explicitly endorses this (two a day is fine near a deadline); revisit only if unsubscribes say otherwise.
