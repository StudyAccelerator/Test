# Top 1% Academy: the Skool pack (26 October 2026)

The live play. Supersedes the August "Top 1% A-Levels" free-community plan in the parent folder (kept for its posts, parent letter and June play, which this pack reuses). Everything needed to open the Skool community for the founding cohort from the 31 October workshop, bill it, fill it and run it.

Decisions (Waleed, 23 to 25 October 2026): name Top 1% Academy, tagline "Weekly live coaching on how to study, with Dr Waleed"; Tuesday 7pm to 9pm (teaching, then the Hot Seat), Saturday 2pm to 4pm (The Marks Clinic); £100 a month founding (closes Tuesday 3 November 11:59pm, locked while they stay) then £150; 7-day money-back guarantee; first session Tuesday 3 November.

Decision made in this pack (26 October, for Waleed to confirm by using it): **bill in pounds through his own Stripe, not through Skool**, because Skool charges members in US dollars only. Skool stays a private, approval-only group on the $9 Hobby plan. Full reasoning in file 04.

## The files

1. [01-skool-setup.md](01-skool-setup.md): every Skool field, top to bottom (plan, identity, About page, joining questions, categories, levels, calendar, rules, Zoom meetings, settings sweep).
2. [02-classroom-and-video.md](02-classroom-and-video.md): the four courses with every module written, the 90 second welcome video script, the parent letter, and the answer to "do I need a VSL".
3. [03-posts-and-weekly-rhythm.md](03-posts-and-weekly-rhythm.md): the pinned welcome post, the launch fortnight's posts, the five weekly threads, the 20 minute daily routine.
4. [04-billing-and-join-flow.md](04-billing-and-join-flow.md): Hobby versus Pro in numbers, the Stripe setup, the member-by-member join flow, refunds and cancellations, and the page.
5. `assets/`: `cover.png` (1084 x 576) and `icon.png` (512 x 512) for the group, with editable HTML sources.

## What already exists in the systems

- Site page `app/top-1-academy/page.tsx` (short link `/academy`), values in `lib/academy.ts`, join card in `components/academy/join-card.tsx`. Not live until the Stripe links and Skool URL are pasted in and Waleed says deploy.
- MailerLite group "Top 1% Academy members" `202397742297777684` and automation "Academy: welcome (A0)" `202397778692801649` (OFF, skeleton only, manifest key `academy-a0`); welcome copy in `content/email-sequences/top-1-academy/00-welcome.md`.
- The workshop follow-ups W3 (replay plus offer), W4 (Questions?) and W5 (closes tonight) in `content/email-sequences/free-workshop/`, listed in that folder's manifest, not loaded until the recording link exists.

## Waleed's order of work (Saturday evening to Tuesday)

| When | What | Where |
| --- | --- | --- |
| Saturday after the workshop | Create the Skool group (file 01, sections 0 to 7) and the two recurring Zoom meetings (section 8) | skool.com, zoom.us |
| Saturday evening | Stripe: product, two prices, two payment links (file 04 section 2) | dashboard.stripe.com |
| Saturday evening | Paste the two Stripe links and the Skool URL into `lib/academy.ts`, the Zoom and Skool links into the welcome email; tell a session "deploy the Academy page and load the welcome automation" | a Claude session |
| Saturday evening | Build Start Here and the Workshop Replay course (file 02), pin the welcome post (file 03) | Skool |
| Sunday 9am | W3 goes out with the replay link and the offer (a session loads and schedules it on your go) | MailerLite |
| Sunday onwards | Approve each paid member against Stripe, add them to the members group, record the enrolment in the HQ | Skool, MailerLite, HQ |
| Monday 6pm | W4 Questions? | MailerLite |
| Tuesday 9am | W5 closes tonight; 7pm first session; 11:59pm deactivate the £100 link | MailerLite, Zoom, Stripe |
