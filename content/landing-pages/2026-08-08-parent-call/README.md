# Parent call-funnel landing page (REVIEW DRAFT, 8 August 2026)

A standalone, self-contained landing page that funnels cold parent traffic into the free 30 minute call with Dr Waleed, feeding the Study Series, Study Accelerator and premium study system. Deliberately NOT part of the Next.js site, per Waleed's instruction. Built from the EdViro Academy and Victor Alvarez teardowns (research-notes.md beside this file) plus Hormozi's landing page rules and Suby's Sell Like Crazy.

**Status: awaiting Waleed's review. Nothing is live, nothing is hosted, no traffic points here.**

## Files

- `index.html`: the whole page, one file, photos embedded, opens in any browser (193KB).
- `research-notes.md`: the competitor teardown and what the page borrows and refuses.
- `preview-desktop.png` / `preview-mobile.png`: rendered screenshots (regenerable, not committed).

## Decisions taken as defaults (change any, the build swaps in minutes)

1. **Booking target:** the existing Zoom scheduler (scheduler.zoom.us/dr-waleed-ahmad/a-level), in 4 places in the file. Swap to Calendly or anything else in one find-and-replace.
2. **No prices on the page.** The call sells; the FAQ promises exact prices on the call. Competitor pages do the same.
3. **Direct booking, not phone-callback capture.** Victor's "give us your number, we ring you in 24 hours" mechanic converts well but needs someone free to ring within 24 hours, which an FY rota cannot promise. The honest version is self-booked slots on the real calendar. A phone-capture form that feeds MailerLite plus the personal-outreach habit can be added later as an A/B (needs a form backend decision first: MailerLite key handling).
4. **Audience width:** GCSE and A-level, Year 9 to 13, per Waleed's instruction that this is not limited to one level. Copy stays A-level-weighted in examples because that is the core market.
5. **No webinar step.** The recorded parents' masterclass remains a separate play (17 July lead-generation map).

## Before this page can go live (in order)

1. **Swap the three SAMPLE testimonial cards** for real MyTutor quotes (Waleed is pulling these). Each card's bracketed text says what shape of quote fits there. MyTutor quotes must keep the honest sourcing ("via MyTutor": they are proof of Waleed as a tutor, not of the programmes).
2. **Delete the review banner** (the marked block at the top of the HTML) and either film the 90 second video for the sample slot or delete that section. The video-script skill can write the script from the section's title.
3. **Confirm the booking link** works and, if wanted, add UTM parameters for GA4 attribution.
4. **Wire analytics** (commented block at the bottom of the HTML): GA4 G-RGPD6KKPR4 and Meta pixel 1585888179629830, with a Lead event on booking-link clicks, mirroring lib/analytics.ts. Required before paid traffic, pointless before hosting.
5. **Legal check:** footer links point at alevelaccelerators.com/privacy and /terms. Confirm both are live on the production site before running ads to this page.
6. **Hosting decision (only Waleed can make it):** recommended, a tiny separate Vercel project serving this folder on a subdomain such as go.alevelaccelerators.com, so ad pages stay off the main site and deploys never touch it. Any static host works. Keep the noindex tag either way; ad landing pages do not need Google.
7. Re-run the compliance scan if any copy changes: `python3 scripts/compliance-scan.py content/landing-pages/2026-08-08-parent-call/index.html`.

## What this page must never gain

Grade promises, invented percentages, fake countdown timers, or scarcity that is not literally true. The scarcity on this page is Waleed's NHS rota, which is real. The whole funnel's credibility rests on the call being what the page says it is: a diagnosis with the doctor, not a pitch with a closer.
