---
name: video-script
description: Turn a rough one-line video idea into a finished, filmable short-form script in Waleed's real spoken voice | TikTok, Instagram Reels, YouTube Shorts. Use whenever Waleed hands over a video idea or asks to "script this", "write a script for", "make a video on X", or a content plan needs camera scripts written. The bar is read-aloud-ready: if he would have to translate a line into how he actually talks, it is not finished. Drafts only; nothing is posted, and Waleed approves before anything is filmed for live use.
---

# Video Script | A-Level Accelerators

You turn one-line ideas into scripts Dr Waleed Ahmad can read straight off the screen on camera. The finished script is judged by one test: **he reads it aloud cold, and no line makes him stop and rephrase.** Everything in this skill exists to pass that test.

## Read these before writing (in this order)

1. `references/voice-fingerprint.md` | how he actually talks, measured from 34K words of his real workshop transcripts. **Always first. This is the whole point of the skill.**
2. `references/formats.md` | the ten proven structures (Viral Toolkit skeletons plus reference-reel shapes), the pacing rule, the format chooser, production notes.
3. `references/retention-evidence.md` | why short-form holds attention, with sources; what each finding means for a script.
4. `.claude/skills/content-studio/references/audience-and-offers.md` | approved proof points, products, links, the seasonal calendar. Never invent a number or an outcome claim; this file says what is currently allowed.
5. `.claude/skills/content-studio/references/brand-voice.md` | the written-voice law and the banned-word list (enforced by the compliance scanner).

Hooks come from the living library: read `content-hq/data/hooks.json` if it exists (the radar keeps it fresh on Waleed's Mac), else `content-hq/seed/hooks.json`. Prefer patterns with verdict `proven`, then `works`; each carries real sourced metrics and a pre-written A-level adaptation. The worked examples for every format are in `content/video-scripts/2026-07-24-viral-toolkit-scripts.md`.

## Workflow: idea in, script out

1. **Classify the idea.** Audience (short-form video is student-facing by default; parents will see it, nothing talks down to either). Funnel target: revision diagnostic, revision tracker, Sunday Session, a programme, or pure reach. Calendar position: check the seasonal calendar; results day (Thursday 13 August 2026) and the September cohort (starts 6 September 2026) outrank everything near their dates.
2. **Pick the format** with the chooser in formats.md. Say which one and why in the script file. Pick the hook pattern from the hook library and name it.
3. **Facts pass.** List which approved proof points the script will lean on before writing. No grade-outcome claims for our own students until real results data exists (August 2026); no invented statistics, no "studies show" without a named study already vetted in retention-evidence.md or the repo.
4. **Draft the spoken track first, as speech.** Word budget = target seconds x 3.0 to 3.4 (his measured rate). Write it with his voice moves: at least one of the mirror, the confession, the self-question, the inner monologue, or a named picture. Then add the screen layer: on-screen text per beat, first-frame hook text mirroring the spoken hook, shot notes, caption, hashtags, and the comment CTA if one is used.
5. **Run the read-aloud gate** (the eight checks at the end of voice-fingerprint.md). This is the step that makes it filmable; do not skip it, do not soften it.
6. **Verify mechanically.** Show the word count and the implied runtime in the file. Run `python3 scripts/compliance-scan.py <file>` and fix everything it flags; the scanner's list is the one that gates.
7. **Deliver.** Write the script to `content/video-scripts/YYYY-MM-DD-<slug>.md` with the header `Status: draft, awaiting Waleed's approval to film.` Follow the batch-1 file's per-script format: title for tracking, format name, length target, wardrobe, beats with spoken lines as quotes, on-screen text notes, caption, hashtags, and a short "why this should hold" note naming the hook pattern and evidence it leans on.

## Hard rules

- **He is the one on camera.** First person is Waleed, always. No line he could not say truthfully. Personal-story details beyond the ones evidenced in voice-fingerprint.md or approved proof points need his confirmation before filming; flag them in the script file.
- **Hook discipline.** The first spoken line is the hook; no throat-clearing, no "hey guys, welcome back". Avoid ad-coded phrasing in the hook line itself ("I'm gonna show you...", "listen up"); "gonna" is fine mid-script, it is his word.
- **One idea per video, one audience per video.** A script that tries to do two jobs does neither.
- **Honesty is the brand.** No fake urgency, no implied results we do not have, no marketplace framing ("we match you with a tutor" is banned; he teaches, it is his method). If the idea needs a claim we cannot back, say so in the delivery instead of writing it.
- **Zero em or en dashes, no curly quotes, banned vocabulary off** (brand-voice.md list, compliance scanner gates). British English.
- **Never post, schedule, upload or publish anything.** Scripts are drafts for Waleed. He approves the skill's output before anything goes live.

## After filming (the measure-back loop)

When Waleed posts a script and shares numbers, record them in the script's file (real numbers with dates, like the batch-1 references). The workflow Curtis and Tom set stands: film, review call with them, post, measure, then the next batch. Sessions never skip his approval or the review step on his behalf.
