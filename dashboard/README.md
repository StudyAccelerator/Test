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
| Monzo | Needs Waleed's sign in | Live business and personal balances, read only. Waleed creates a Confidential OAuth client at developers.monzo.com (redirect `http://localhost:4400/api/monzo/callback`), puts `MONZO_CLIENT_ID` and `MONZO_CLIENT_SECRET` in `dashboard/.env` (see `.env.example`), restarts, then presses **Connect Monzo** on the Bank panel and approves the notification in the Monzo phone app. Tokens land in `data/monzo-tokens.json` (gitignored, owner-only) and refresh themselves; they are never exposed through the store API. Claude cannot do this sign in on his behalf. |
| Competitor radar | Researched | Deep multi-agent research 12 to 14 July 2026 with an adversarial fact-check pass, committed in `seed/competitors.json`. Every count carries its source; Up Learn fully verified, others single-pass. Refresh by asking a session to "refresh the competitor radar". |
| Live leads | Auto, hourly | The **Live leads** panel (Today section) lists UK parents who posted asking for A-level or GCSE tutoring in the last few hours, each with a reply drafted for Waleed to send himself. Fed by the `facebook-lead-radar-hourly` scheduled task into `data/leads.json`. Drafts only: nothing is ever sent, posted or messaged. A fresh lead also jumps to the top of the triage panel, because replying fast is the whole point. Mark each one Sent or Skip after you deal with it. See "The lead radar" below. |

## On your phone

The dashboard is an installable app (a PWA): on a phone it becomes swipeable full-screen pages, Tasks first, with section chips along the bottom. Nothing is hosted publicly; the phone talks to the Mac directly, so the Mac must be awake with `npm run hq` running.

**Reaching the Mac (pick one):**

1. **Tailscale, recommended.** Install Tailscale (free) on the Mac and the phone, sign in to both with the same account, then on the Mac run `tailscale serve --bg localhost:4400`. The dashboard appears at a private `https://...ts.net` address that only your own devices can reach, from anywhere, encrypted. The server stays bound to 127.0.0.1.
2. **Home Wi-Fi only.** Put `HQ_HOST=0.0.0.0` and an `HQ_TOKEN=<any long random string>` in `dashboard/.env`, restart, then open `http://<the Mac's IP>:4400/?key=<token>` on the phone once (the token plants a year-long cookie; without it the server answers 401). Works only at home.

**Install as an app:** open the address on the phone, then iPhone Safari: Share, Add to Home Screen. Android Chrome: menu, Add to Home screen / Install. It opens full screen with the HQ icon, and shows an honest "cannot reach your Mac" page when the Mac is off.

**Home screen widget (iPhone):** iOS does not let web apps make widgets, so the widget runs in the free Scriptable app: setup steps are at the top of `phone/hq-widget.js` (paste the script, set your address, add a Scriptable widget). It shows open tasks, today's calendar, subscribers and the Stripe balance from `/api/widget`, refreshed on Apple's schedule of roughly every 15 to 60 minutes. On Android, ask a session for the equivalent.

## The lead radar (hourly Facebook lead-gen)

Once an hour, a scheduled task sweeps Facebook for UK parents actively asking for A-level tutoring, drafts you a reply for each real one, and drops them in the **Live leads** panel. You read, edit if you like, and send every reply yourself. Nothing is ever sent, posted or messaged on your behalf.

- **How it runs:** the `facebook-lead-radar-hourly` scheduled task (at 9 minutes past each hour) invokes the `facebook-lead-radar` skill (`.claude/skills/facebook-lead-radar/SKILL.md`). It searches Facebook through your logged-in Chrome as your personal profile, reads the results, filters them, writes `data/leads.json`, and pings you **only if it found at least one new lead**. Silent hours are normal and correct.
- **What it surfaces:** only a parent, guardian or student *asking* for help, for *A-level or GCSE*, UK exam boards, posted in the last 3 hours, in a subject you teach or general revision help. A-level is the core market and always lists first; GCSE (widened in 17 July 2026, Waleed's call: future clients, and the summer programme can stretch) is capped at 3 per sweep and tagged "GCSE, future market" on the card. It rejects tutor adverts, 11+/primary/university, face-to-face-only requests, subjects you do not teach, anything older, and anything it is unsure about. The panel footer shows what it filtered out each sweep, so you can see it is working, not idle.
- **Where it shows:** the Live leads panel in the Today section, plus a red line at the top of "Needs your attention" whenever a lead is unworked, plus a line on the phone widget. Each card has the parent's own words, why it is worth your minutes, the drafted reply, an **Open post** link, **Copy draft**, and **Mark sent** / **Skip**.
- **Requirements:** it needs the Claude desktop app open (scheduled tasks only run while the app is open; a missed hour runs on next launch) and Chrome logged into Facebook. If it cannot run, it says so honestly in the panel and the triage list instead of inventing anything, and tells you to open Chrome.
- **Pause or change it:** open the **Scheduled** section in the app sidebar to pause, resume, or run it now. To change what it surfaces or how replies are drafted, edit the skill at `.claude/skills/facebook-lead-radar/SKILL.md` (the filter rules and the draft rules are both there in plain language), or just tell a Claude session what to change.
- **The data:** `data/leads.json` is gitignored like everything in `data/`. Leads you mark sent or skipped drop off after 7 days. Delete the file to reset to the empty seed.

## Layout of this folder

- `server.js` is the whole backend. Static files plus `/api/*` proxies so keys never reach the browser.
- `public/` is the dashboard UI (plain HTML, CSS, JS, hand-rolled SVG charts).
- `seed/` holds committed defaults, copied into `data/` on first run only.
- `data/` is your live local data. Gitignored. Delete a file to re-seed it.
