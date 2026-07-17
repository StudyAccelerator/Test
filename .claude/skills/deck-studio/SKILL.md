---
name: deck-studio
description: Write the prompt Waleed sends to Claude Design so IT builds a premium sales-call deck for A-Level Accelerators | programme decks, workshop decks, partnership pitch decks. Use whenever he asks for a deck, slides, a presentation, a pitch, or design input on one | "make me a deck for X", "prompt for a partnership deck", "slides for the call", "update the summer deck". The output is a ready-to-send prompt, never a deck built here.
---

# Deck Studio

Waleed keeps decks open live on sales and partnership calls. They have to carry the key points fast (he has minutes, not an hour) and look genuinely premium.

**You do not design the deck. Claude Design designs the deck.** Your job is the prompt he pastes into it. If you find yourself writing HTML, CSS, or a slide layout, you have taken over someone else's job and the answer is wrong.

## Why the prompt is the whole job

Claude Design cannot see this repo. It has no access to the live pages, `lib/testimonials.ts`, the approved proof list, or the brand tokens. Anything you leave out, it has to guess, and a guessed price or an invented statistic is the one failure this business cannot absorb.

That flips the usual briefing instinct. Compare with `code-session-briefs`, which writes briefs for Claude Code and strips out everything the session can look up itself: the opposite applies here.

**Over-supply the facts. Under-specify the design.**

Two tests for every line you are about to write:

- *Could Claude Design get this wrong by guessing?* Then it goes in the prompt, verbatim and exact. Prices, dates, quotes, claims, hex codes, names.
- *Is this a design decision?* Then leave it out. Layout, composition, type scale, graphics, motifs, how a slide is arranged: all Claude Design's call. Waleed asked for genuine design work, and a prompt that dictates pixels gets a deck that looks like you drew it.

You are the researcher and the strategist. Claude Design is the designer.

## The process

1. **Identify the deck.** Type (programme sale, workshop, partnership), audience (parent buyer, student, company decision maker), and the one decision it should drive (enrol, book, agree a trade). If any of the three is unclear, ask Waleed before writing.
2. **Collect the facts, first-hand.** Every number, date, price, claim and quote must be read out of a source this session can open, not recalled: the live page in `app/`, `.claude/skills/content-studio/references/audience-and-offers.md` (approved proof points), `lib/testimonials.ts` (verbatim quotes), `content/business-audit/` (funnel and market numbers, dated), `content/partnerships/<slug>/` (partner dossiers). For a programme or workshop that does not exist yet, the source is Waleed's brief, and a fact he has not given you is a question for him, never a gap you fill.
3. **Plan the narrative.** Pick the matching skeleton in `references/blueprints.md` and decide what each slide has to achieve. You are choosing the argument, not the artwork.
4. **Write the prompt.** Copy `assets/prompt-template.md` to `content/decks/<slug>/design-prompt.md` and fill it. Paste the brand block from `references/brand-brief.md` in whole: Claude Design cannot read it from here.
5. **Check it as if you were Claude Design.** Read it back with no repo access and no memory of this session. Every fact needed to build the deck must be on the page, and nothing on the page should be a layout instruction.
6. **Scan it.** `python3 scripts/compliance-scan.py content/decks/<slug>/design-prompt.md` must exit clean. The prompt carries the copy rules, so the prompt itself has to obey them.
7. **Hand it over.** Commit the prompt, then give Waleed the file and tell him plainly: paste this into Claude Design, attach any photo the prompt names, and review what comes back. He approves every deck before it is used.

## What the prompt must always carry

- **The job and the audience,** including that this is shown live on a short call and the viewer decides on the spot.
- **Every fact, verbatim,** with an explicit instruction that these are exact and must not be altered, rounded, extended or added to.
- **The brand block** from `references/brand-brief.md`, plus the live site (alevelaccelerators.com) so Claude Design can look at the house style itself.
- **The slide plan as jobs,** one line each: what that slide has to land, not how it looks.
- **The copy rules:** Waleed's voice, British English, zero em or en dashes, no AI-tell vocabulary, verbatim testimonial quotes, no invented statistics, no grade-outcome claims for A-Level Accelerators' own students (none exist until August 2026; check `audience-and-offers.md` for the current approved list rather than assuming).
- **The creative latitude, said out loud,** so Claude Design knows the design is genuinely its own.
- **The deliverable:** 16:9 slides, the slide count, and that Waleed reviews before use.
- **Assets:** name the photo from `public/photos/` he should attach, since Claude Design cannot fetch it. If no photo suits, say so and leave the visual to Claude Design.

## Hard rules

- Nothing invented, ever. A fact you cannot source is a question for Waleed.
- Prices and dates only from the live page or Stripe. If a page and this skill disagree, the page wins and this skill gets corrected in the same session.
- Testimonial quotes verbatim from `lib/testimonials.ts`, never trimmed or paraphrased.
- One deck per prompt.
- Waleed sends the prompt himself and reviews the deck himself. This skill never contacts Claude Design and never publishes a deck.
- Decks are private sales material: never on the site, never linked from it, never in `public/`.

## Where things live

- Prompts: `content/decks/<slug>/design-prompt.md`, indexed in `content/decks/README.md`. Keep the index current.
- Skill files: this folder. `references/brand-brief.md` is the brand block, `references/blueprints.md` the per-type narratives, `assets/prompt-template.md` the skeleton.
- The three HTML decks in `content/decks/` dated 16 July 2026 are legacy: they were built in-session before this skill was corrected to brief Claude Design. Do not extend that pattern or build more of them.
