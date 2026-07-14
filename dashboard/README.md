# A-Level Accelerators HQ

Waleed's private business dashboard. One screen that shows the real state of the business: what needs attention, the email engine, money, content, projects and the competitor radar.

## Run it

```
npm run hq
```

Then open http://127.0.0.1:4400. No install step, no dependencies: it is a plain Node server (Node 24 is already on this Mac).

## Privacy

- Binds to 127.0.0.1 only, so nothing is reachable from outside this Mac.
- `dashboard/data/` (your tasks, costs, LinkedIn log, growth history) and `dashboard/.env` (keys) are gitignored and never leave the machine.
- The dashboard is read only against every external service. It cannot send emails, move money or change the website.

## The honesty rule

No number on the dashboard is ever invented. A source is either live, manual (you type real numbers in), or pending with a note on what it needs. Growth trends build from one real snapshot per day the dashboard is open, never back-filled.

## Data sources

| Source | Status | Notes |
| --- | --- | --- |
| MailerLite | Live | Reuses the same API key the site's signup forms already use (`lib/mailerlite.ts`). Override with `ML_API_KEY` in `dashboard/.env` if that key is ever rotated. |
| Website uptime | Live | Pings https://alevelaccelerators.com each load, shows the last pushed commit as "last deploy" and flags unpushed local commits. |
| Stripe | Snapshot | Real account numbers (balance, full payment history, monthly revenue) pulled through Waleed's Stripe connector by a Claude session into `data/stripe-snapshot.json`, dated in the UI. For always-on live numbers, create a **restricted, read only** key (Balance, Charges) and put `STRIPE_KEY=rk_live_...` in `dashboard/.env`; the panel upgrades itself. |
| LinkedIn | Extracted | LinkedIn has no analytics API for personal profiles, so a Claude Code session extracts post analytics through Waleed's own logged-in Chrome (first done 12 July 2026: all posts with exact impressions, follower count, 365 day totals, in `data/linkedin.json`). Log new posts by hand on the panel, or ask a session to "re-extract my LinkedIn numbers". |
| Facebook | Extracted, ads pending | Page state extracted the same way (12 July 2026: 0 followers, 1 post). Ad metrics need Meta once the first campaign runs. |
| Gmail | Extracted | Business inbox digest via Waleed's Gmail connector into `data/gmail.json`: thread volume, items needing attention (these feed the triage panel), honest observations. Ask a session to "re-check my inbox" to refresh. |
| Calendar | Extracted | The week ahead from the business Google Calendar into `data/calendar.json`; today's events show on the Pulse panel. |
| Bank | Pending | Optional. Monzo and Starling have safe read only personal tokens; other banks are not worth the Open Banking setup. Stripe is the business source of truth meanwhile. |
| Competitor radar | Researched | Deep multi-agent research 12 to 14 July 2026 with an adversarial fact-check pass, committed in `seed/competitors.json`. Every count carries its source; Up Learn fully verified, others single-pass. Refresh by asking a session to "refresh the competitor radar". |

## Layout of this folder

- `server.js` is the whole backend. Static files plus `/api/*` proxies so keys never reach the browser.
- `public/` is the dashboard UI (plain HTML, CSS, JS, hand-rolled SVG charts).
- `seed/` holds committed defaults, copied into `data/` on first run only.
- `data/` is your live local data. Gitignored. Delete a file to re-seed it.
