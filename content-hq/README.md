# Content HQ | the short-form content operation

Waleed's viral content strategy HQ for TikTok and Instagram Reels. Deliberately SEPARATE from the business HQ dashboard (`dashboard/`, port 4400): this one runs the content channel, the other runs the business.

## Run it

```
npm run content-hq        # or the content-hq entry in .claude/launch.json
open http://127.0.0.1:4500
```

Zero npm dependencies, binds to 127.0.0.1 only, never deployed, never linked from the public site.

## What it shows

- **Now** (dark section): what to film next, fresh outliers, sweep status.
- **Content pipeline**: ready-to-shoot packages. Each is a full shoot kit: scripted hook, body beats and CTA with on-screen text, a visual snapshot (setting, props, cuts, feel), caption and hashtags, the funnel target, and finished 1080x1350 graphics for carousels. Waleed marks them Filmed / Posted as he works through them. Nothing ever posts itself.
- **Outliers**: posts that massively overperformed (3x+ the creator's median of their last 10, or 1M+ views in-niche), each with why it worked and a rework idea.
- **Creator radar**: the tracked education creators, followers per platform (dated, sourced), relevance stars, and what to steal from each.
- **Playbook**: the rules of what is working right now, plus the gaps Waleed can own.
- **Your channels / sweep log**: his own handles once the accounts exist, and an honest log of every sweep including failures.

## Where the data comes from

- Initial baseline: the 17 July 2026 deep research (38-agent workflow; every creator verified against live pages or Google-indexed profile snapshots that day, source detail in each creator's `sourceNote`).
- Ongoing: the `viral-content-radar` skill (`.claude/skills/viral-content-radar/SKILL.md`) sweeps TikTok/Instagram **three times a day** via the scheduled task `viral-content-radar-3x` (08:20, 14:20, 20:20, runs while the Claude desktop app is open). Read-only: it never posts, likes, follows, comments or messages anything.
- The honesty rule from the main HQ is load-bearing here too: no invented numbers, every figure carries its date and source, failed sweeps are logged as failed.

## Layout

- `server.js` | zero-dep server: static UI + `/api/store/:name` (whitelist) + `/api/meta`.
- `seed/` | committed defaults, copied to `data/` on first run.
- `data/` | live stores, **gitignored** (creators, outliers, playbook, pipeline, sweeps, channels).
- `public/` | the UI; `public/assets/<slug>/` holds the finished carousel slide PNGs (committed, ready to post).
- `graphics-src/` | carousel HTML sources + `render.py` (headless Chrome tall screenshot, PIL split into slides). Rebuild after editing a carousel: `python3 content-hq/graphics-src/render.py`, then visually check the PNGs for overflow.

## Rules for sessions working here

1. Content follows `.claude/skills/content-studio/` (Waleed's voice, zero em/en dashes, no AI-tell words, approved proof only; run `python3 scripts/compliance-scan.py` on anything you touch).
2. New packages go into the pipeline store shaped like the existing ones; status `idea` if machine-drafted, `ready` only for complete shoot kits.
3. Never mark anything posted; only Waleed does that in the UI.
4. `dashboard/` is a different product. Do not merge the two.
