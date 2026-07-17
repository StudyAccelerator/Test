---
name: viral-content-radar
description: Sweep the tracked education creators on TikTok and Instagram, record what their newest posts are actually doing, flag outliers that massively overperformed, and keep the Content HQ (content-hq/, port 4500) fresh. Runs three times a day via the scheduled task viral-content-radar-3x, or on demand ("sweep the creator radar", "what's going viral in education right now?"). Read-only: never posts, likes, follows, comments or messages anything.
---

# The viral content radar

Keep Waleed's Content HQ honest and current: who is winning in education short-form, which posts are overperforming RIGHT NOW, and what he should learn or rework from them. Three sweeps a day so the picture is hours old, not weeks.

This is the CONTENT HQ's radar (`content-hq/`, port 4500, `npm run content-hq`). It is separate from the business HQ dashboard and from the facebook-lead-radar. Do not touch `dashboard/` from here.

## The hard rules (never break these)

1. **Read-only, everywhere.** Never post, comment, like, follow, share, vote, DM or join anything on TikTok, Instagram or anywhere else. Never change an account setting. This routine observes and records. If you are about to type into a social input field, stop.
2. **Never invent a number.** Views, followers and dates come off the page or they are `null`. TikTok abbreviates ("1.2M"); record the abbreviated figure as shown and expand it (1200000) only as arithmetic, never as false precision beyond it. Every number gets an `asOf` date.
3. **Fail honestly.** If a platform cannot be swept (blocked, login wall, page not loading), write `lastSweepStatus: "failed"` or `"partial"` with the real reason in the note, leave the previous data intact, and say so in the run summary. Stale real data beats fresh fabricated data.
4. **Draft-only content.** Any content idea this sweep produces goes into the pipeline store with status `"idea"` for Waleed to review. Nothing is ever scheduled or posted.
5. **A quiet sweep is a correct sweep.** Most sweeps find no new outlier. Do not lower the bar to produce one.

## Step 1: read the stores

All stores live in `/Users/waleedahmad/Downloads/Claude Code/content-hq/data/` (if the folder is missing, run `node content-hq/server.js` once or copy `content-hq/seed/` to `content-hq/data/`).

- `creators.json` — the roster. Sweep targets come from here.
- `outliers.json` — previously flagged outliers (check before re-flagging; a post already flagged is not news).
- `sweeps.json` — the log; also tells you which rotation slot this sweep is in.
- `channels.json` — Waleed's own handles, if set. If a handle exists, sweep his profile too (followers + latest post views) and update it, same rules.
- `pipeline.json` — the content pipeline; you may append at most ONE `"idea"` package per sweep (Step 5).

## Step 2: sweep

**Pick 8 to 10 creators per sweep**, rotating so every roster creator is covered at least once per day across the three sweeps: sort by `lastSwept` (oldest first), always including any creator with `relevance` 5 not swept in the last 12 hours.

Use the Claude in Chrome tools against Waleed's Chrome (load in ONE ToolSearch call: `select:mcp__claude-in-chrome__tabs_context_mcp,mcp__claude-in-chrome__navigate,mcp__claude-in-chrome__get_page_text,mcp__claude-in-chrome__read_page,mcp__claude-in-chrome__computer`). If Chrome is not available, the in-app Browser pane works for TikTok (public pages need no login); note Instagram limitations honestly.

Per creator:

- **TikTok** (`https://www.tiktok.com/@handle`): the profile grid shows a view count on every video thumbnail; this is the core signal. Record follower count and the newest ~6 videos: rough description (from the caption/cover), view count, and how old ("2d ago" style dates are on the grid or the video page). New posts since `lastSwept` matter most.
- **Instagram** (`https://www.instagram.com/handle/reels/`): the reels tab shows view counts per reel when logged in. If Instagram is not logged in or blocks the read, skip it for that creator and count it in the note ("IG unreadable for 3 creators").
- Update the creator's entry: `followers` + `asOf`, `lastSwept`, and keep the newest posts in `recentPosts` (cap 12 per creator, oldest dropped): `{ postedAgo, description, views, viewsShown, url, seenAt }`.

**Discovery (first sweep of the day only):** spend a few minutes on TikTok search ("a level revision", "gcse revision", "study tips uk", rotate terms) looking for creators not on the roster whose recent videos clear ~100K views. Add promising ones to the roster (max 2 per day, roster capped at 22; drop the lowest-relevance entry if full) with `addedBy: "radar"` and a sourced follower count.

## Step 3: the outlier maths (keep it consistent)

For each creator, compute the **median views of their last 10 recorded posts** (use what is in `recentPosts` plus what you just read; fewer than 5 posts means skip the maths, don't fake a baseline).

A post is an **outlier** when:

- its views are **at least 3x that creator's median**, or
- it clears **1M views** on an education/study topic regardless of baseline (cross-niche signal).

For every NEW outlier (not already in `outliers.json` by URL), append:

```json
{
  "id": "creator-slug-YYYYMMDD-short-slug",
  "spottedAt": "ISO timestamp",
  "platform": "tiktok",
  "creatorName": "…",
  "creatorId": "…",
  "description": "what the post is, in one sentence",
  "url": "…",
  "metric": "2.4M views in ~3 days",
  "baseline": "180K median",
  "multiple": 13.3,
  "whyItWorked": "your honest read: hook, format, emotion, timing",
  "reworkIdea": "one sentence: how Waleed could rework it honestly in his voice with the doctor angle",
  "status": "new"
}
```

Never change an outlier Waleed has marked `seen`. Cap the store at 60 outliers, oldest `seen` dropped first.

## Step 4: write the stores

- `creators.json`: updated numbers, `updatedAt`, honest `note` if parts of the sweep failed.
- `outliers.json`: new outliers appended, `updatedAt`.
- `sweeps.json`: set `lastSweep`, `lastSweepStatus` (`ok` / `partial` / `failed`), `lastSweepNote` ("9 creators swept, 2 IG unreadable, 1 new outlier"), and prepend to `log` (cap 40): `{ at, status, note, newOutliers, creatorsSwept }`.
- `channels.json`: if Waleed's handles are set, update followers/`asOf` from his live profiles.
- `playbook.json`: only when several sweeps show the same repeatable pattern (a format, hook style or timing repeatedly outperforming), add or revise ONE rule with dated evidence. This should be rare, not weekly noise.

Write with plain file edits; the HQ reads the files live. Do not run git. Do not touch anything outside `content-hq/data/`.

## Step 5: one idea per big outlier (optional, capped)

If the sweep found a genuinely big NEW outlier (multiple >= 5x, or >= 1M views in-niche), append ONE package to `pipeline.json` with `status: "idea"`, drafted in Waleed's voice per `.claude/skills/content-studio/` (read `references/brand-voice.md` first: zero em or en dashes, no AI-tell words, no invented statistics, approved proof only). Shape it exactly like the existing packages in that store: hook, script beats with on-screen text, cta, visual spec, caption, funnel target, and `modelledOn` naming the outlier. It waits as an idea; Waleed promotes it to "ready" in the HQ if he likes it.

## Step 6: surface it

- If the sweep found a new outlier with multiple >= 5x or >= 1M views, send exactly ONE PushNotification (status `proactive`, under 200 characters) leading with the takeaway: `Education outlier: Mr X's "silent teacher marks papers" hit 2.1M (12x his median). Rework drafted in Content HQ.`
- Otherwise send NOTHING. Silence is the normal outcome.

## Step 7: report

End with a two-line summary: what moved (new outliers, notable follower jumps, roster changes) and what could not be swept and why. If everything failed, say plainly what Waleed needs to do (usually: open Chrome, or log into Instagram there).
