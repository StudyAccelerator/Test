---
name: facebook-lead-radar
description: Sweep Facebook for UK parents actively asking for A-level or GCSE tutoring help, filter out the noise, draft a reply for each real lead, and surface them in the HQ dashboard for Waleed to send himself. Runs hourly via the scheduled task facebook-lead-radar-hourly, or on demand ("sweep for leads", "any new Facebook leads?"). Never sends, posts, comments or messages anything.
---

# The Facebook lead radar

Find UK parents who are asking for A-level or GCSE help RIGHT NOW, draft Waleed a reply for each, and put them where he will see them. He reads, edits if he wants, and sends every one himself. A-level is the core market; GCSE is the potential-future-client tier, included on his instruction from 17 July 2026.

Background on why this exists and how the channel behaves: `content/facebook-groups/2026-07-16-lead-radar-and-where-parents-actually-ask.md`. The conduct rules are Part 6 of `content/facebook-groups/2026-07-15-personal-facebook-strategy.md`. Read the first one if anything here is unclear.

## The hard rules (never break these)

1. **Never send, post, comment, react, join, or message anything.** Not on his behalf, not "to test", not ever. This routine reads and drafts. Waleed sends. If you find yourself about to type into a Facebook field, stop.
2. **Never change a setting on his account**, including notification settings.
3. **Never invent a number, a credential or a result.** Approved proof only (`.claude/skills/content-studio/references/audience-and-offers.md`). He has no grade-outcome data until August 2026.
4. **If the sweep cannot run, fail honestly.** Chrome not open, not logged in, search blocked: write nothing but the failure into the store's `lastSweep`, and say so in the run summary. A stale real store beats a fabricated fresh one.
5. **Never surface a lead you are not confident about.** A quiet hour is a correct outcome. Noise is what makes him stop reading.

## Step 1: sweep

Use the Claude in Chrome tools (`mcp__claude-in-chrome__*`) against his logged-in personal profile ("Waleed Ahmad", never the Page). Load them in ONE ToolSearch call:

`select:mcp__claude-in-chrome__tabs_context_mcp,mcp__claude-in-chrome__navigate,mcp__claude-in-chrome__get_page_text,mcp__claude-in-chrome__find,mcp__claude-in-chrome__read_page`

Run these post searches, each as `https://www.facebook.com/search/posts?q=<url-encoded query>` and read with `get_page_text`:

- `looking for an A level tutor`
- `looking for a maths tutor A level`
- `A level tutor recommendations`
- `need a tutor year 12`
- `need a tutor year 13`
- `"A level" tutor daughter son`
- `A level biology tutor` (rotate the subject each run across biology, chemistry, physics, maths)
- `looking for a GCSE maths tutor`
- `GCSE science tutor recommendations` (rotate science/maths each run)

Results skew recent but are not strictly time-sorted, so read the whole page, not just the top. Facebook renders the timestamp as scrambled characters in the text extraction; the relative age ("23m", "3h", "1d") is usually readable next to comments, and the post's own age is visible in a screenshot if you need it. If you cannot establish a post's age, treat it as old and skip it.

## Step 2: filter (this is the part that decides whether he keeps using this)

A post is a **lead** only if ALL of these are true:

- The author is **asking for help**: a parent, guardian or student seeking a tutor, recommendations, or support. Not offering it.
- It is **A-level** (Year 12 / Year 13 / sixth form) **or GCSE** (Year 10 / Year 11). A-level is the core market. GCSE was widened in on 17 July 2026 on Waleed's instruction: GCSE parents are potential future clients, helpful advice builds standing, and the summer programme can stretch to a strong GCSE student. Mark which is which (see `market` below) so he can prioritise A-level at a glance.
- It is **UK**: UK exam boards (AQA, Edexcel, OCR, WJEC). Not CAIE, not international O-level, not American.
- It is **fresh**: posted within the last 3 hours. The whole point is replying while it is near the top. Anything older has already collected replies and sunk.
- **He has not already replied** to it, and it is not already in the store's `seen` list.
- The subject is one he teaches (**maths, biology, chemistry, physics**, or double/triple science at GCSE) or it is general revision, study-system or "hard worker, bad grades" help.

Because GCSE volume dwarfs A-level, keep the bar high: a GCSE post must be a clear, current, named ask from a parent, not a vague grumble. **Cap GCSE leads at 3 per sweep**, best first (freshest, fewest competing replies), so a busy GCSE hour cannot drown the panel. A-level leads are never capped.

**Reject** all of these, without exception:
- Tutors, agencies or platforms advertising themselves, or anyone recruiting tutors.
- 11+, primary, KS3-and-below, undergraduate, university, UCAT-only requests.
- Requests that explicitly demand **face to face / in person only**. He teaches online.
- Subjects he does not teach (English, sociology, economics, computer science, psychology...) unless the ask is really about revision method rather than the subject.
- Anything you are unsure about. Unsure means reject.

**Deduplicate.** Parents cross-post the identical request to several groups. Same author plus near-identical text equals ONE lead; record every copy's URL under `copies` and point him at the copy with the fewest existing comments, because that is where his reply is most visible.

## Step 3: draft the reply

One bespoke draft per lead, following Part 6 of the personal Facebook strategy. The shape that works:

1. **One clause of credential, no brochure.** "I'm an NHS doctor and I've taught over 1,000 A-level students."
2. **One or two diagnostic questions**, pulled from what their post actually says. The default pair: which year group, and is it the subject content itself or do the marks not match the hours. Adapt it: if they already said Year 12, do not ask.
3. **An invitation for them to message him.** Never "I'll DM you": a message from a non-friend lands in their hidden Message Requests folder, and most groups ban unsolicited DMs.

Hard constraints on every draft:
- **Under 60 words.** Length reads as sales.
- **No link, no price, no subject menu, no bullet list.** Links get comments filtered and posts removed in several of these groups.
- **Waleed's voice** (`.claude/skills/content-studio/`): direct, short sentences, contractions, British English. **Zero em dashes or en dashes.** No AI-tell vocabulary.
- **Every draft worded differently.** Identical copy-paste across posts is exactly what the agency spammers do, it reads as spam to parents, and it trips Facebook's detection. Vary the opening every time.
- **Address them by name** if their name is on the post.
- Run the drafts past `python3 scripts/compliance-scan.py` if you write them to a file; otherwise self-check for dashes and banned words.

**GCSE drafts, one extra rule:** GCSE is the secondary market and no GCSE-specific product exists, so the draft gives genuinely useful advice and invites the conversation; it never implies he runs a GCSE programme. The programmes discussion, if any, happens in the DM where Waleed is driving. The credential line still works unchanged ("I've taught over 1,000 students" covers it; do not say "1,000 A-level students" on a GCSE lead, say "1,000 students").

Also record a one-line **`why`**: why this lead is worth his minutes, in plain language ("Year 12 maths, wants a year of support, only 3 comments so far"). On GCSE leads the `why` should say what makes THIS one worth it ("Year 11, mocks in November, parent sounds ready to buy").

## Step 4: write the store

Rewrite `/Users/waleedahmad/Downloads/Claude Code/dashboard/data/leads.json`, preserving this exact shape:

```json
{
  "lastSweep": "2026-07-16T18:00:00Z",
  "lastSweepStatus": "ok",
  "lastSweepNote": "7 queries, 41 posts read, 1 lead, 22 GCSE skipped",
  "sweepsToday": 4,
  "skippedCounts": { "tutorAds": 14, "tooOld": 3, "notUk": 2, "otherSubject": 1, "otherLevel": 2, "gcseOverCap": 0 },
  "leads": [
    {
      "id": "stable-slug-from-author-and-date",
      "foundAt": "2026-07-16T18:00:00Z",
      "postedAgo": "23m",
      "author": "Lucy Albert",
      "group": "GCSE and A-Level UK tutoring",
      "url": "https://www.facebook.com/groups/.../posts/...",
      "copies": ["https://www.facebook.com/groups/.../posts/..."],
      "quote": "Looking for A level tutor in mathematics from now to next summer.",
      "subject": "Maths",
      "market": "alevel",
      "year": "Year 12 (assumed, not stated)",
      "competingReplies": 3,
      "why": "A year of maths support, and only 3 replies so far.",
      "draft": "Hi Lucy. I'm an NHS doctor and I've taught over 1,000 A-level students, maths included...",
      "status": "new"
    }
  ],
  "seen": ["post-url-or-id", "..."]
}
```

Rules for the store:
- `market` is `alevel` or `gcse`. The dashboard sorts A-level first; do not fake a market to promote a lead.
- `status` is `new` until Waleed changes it in the dashboard. Never write anything other than `new` yourself.
- **Append to `leads`, never wipe it.** Keep leads whose status is still `new`; drop ones he marked `sent` or `skipped` more than 7 days ago.
- **Always add every lead's URL to `seen`**, plus the URLs of posts you rejected, so the next sweep does not re-read them. Cap `seen` at 800 entries, oldest dropped first.
- `sweepsToday` resets when the date changes.
- On failure: set `lastSweepStatus` to `failed`, put the real reason in `lastSweepNote`, leave `leads` untouched, and stop.

## Step 5: surface it

- If there is **at least one new lead**, send exactly one `PushNotification` (status `proactive`), under 200 characters, leading with what he would act on. Example: `2 new A-level leads: Year 12 maths (23m old), Year 13 biology (1h). Drafts ready in HQ.`
- If there are **no new leads, send nothing.** Silence is the correct output for most hours. Do not notify to say you found nothing.
- The dashboard panel (Today section, "Live leads") reads the store automatically. He opens `npm run hq` at http://127.0.0.1:4400, reads the draft, copies it, sends it himself, then marks it Sent or Skip.

## Step 6: report

End with a two-line summary: what you found, and what you skipped. If the sweep failed, say why in plain language and say what he needs to do (usually: open Chrome and make sure Facebook is logged in).
