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
| Website uptime | Live | Pings https://alevelaccelerators.com each load, shows latest git commit as "last site update". |
| Stripe | Pending | Create a **restricted, read only** key (Balance, Charges, Payouts) in Stripe, then put `STRIPE_KEY=rk_live_...` in `dashboard/.env` and restart. The panel goes live by itself. |
| LinkedIn | Manual | LinkedIn has no analytics API for personal profiles. Log each post's numbers on the panel, 30 seconds each, and the trend is real. |
| Facebook ads | Pending | Nothing to measure until the first campaign is live. Then connect Meta. |
| Gmail | Pending | Needs a one-off Google OAuth sign in from Waleed (read only scope). |
| Bank | Pending | Optional. Monzo and Starling have safe read only personal tokens; other banks are not worth the Open Banking setup. Stripe is the business source of truth meanwhile. |
| Competitor radar | Watchlist | Qualitative watchlist seeded 12 July 2026. Follower counts appear only after a research pass verifies them against a source. Ask a Claude Code session to "refresh the competitor radar". |

## Layout of this folder

- `server.js` is the whole backend. Static files plus `/api/*` proxies so keys never reach the browser.
- `public/` is the dashboard UI (plain HTML, CSS, JS, hand-rolled SVG charts).
- `seed/` holds committed defaults, copied into `data/` on first run only.
- `data/` is your live local data. Gitignored. Delete a file to re-seed it.
