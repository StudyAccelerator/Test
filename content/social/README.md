# Weekly social content packs

One folder per week, named by the Monday of the week it covers. Exception: the first pack, `content/social/2026-07-20/`, covers eleven days (Thursday 16 to Sunday 26 July 2026) because Waleed set the posting start to 16 July. Both platforms run one post per day, every day.

Each folder contains:

- `pack.md`: the full week. Snapshot that set the direction, decisions Waleed must make, every post (copy, first comment, time, visual), variants, and the measurement list.
- `research-notes.md`: the niche and platform research baseline plus that week's delta, every number labelled VERIFIED / REPORTED / INFERRED.
- Visuals live in `content/graphics/week-<date>/` (rendered) with HTML sources in `content/graphics-src/week-<date>/`.

## The routine

Every Friday at 9am the scheduled task `weekly-content-pack-friday` builds the following week's pack by running the `weekly-content-pack` skill (`.claude/skills/weekly-content-pack/SKILL.md`, the canonical process). It can also be run any time by asking a session to "build next week's content pack".

The process in one line: fresh business snapshot decides the push, light research refresh tunes the format, the genre engine shapes the week (LinkedIn students, Facebook parents, never mixed), visuals are made or precisely briefed with a made fallback, everything is compliance-scanned, committed, and handed to Waleed with an artifact preview.

**Nothing is ever scheduled or posted by the routine. Waleed approves every pack and posts manually.** After the week runs, he drops the numbers (impressions, comments, diagnostic signups, boost results) into the next Friday session so the engine learns.

First pack: `2026-07-20/` (built 15 July 2026, covering 16 to 26 July, daily on both platforms). Its `research-notes.md` is the standing research baseline until a monthly deep refresh replaces it.
