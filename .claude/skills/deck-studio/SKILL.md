---
name: deck-studio
description: Produce premium sales-call slide decks for A-Level Accelerators | any programme deck, workshop deck, or partnership pitch deck. Use whenever Waleed asks for a deck, slides, a presentation, a pitch, or design input on one | "make me a deck for X", "slides for the call", "partnership deck for X", "update the summer deck". Output is a designed HTML deck rendered to a 16:9 PDF, never a .pptx.
---

# Deck Studio

Decks Waleed keeps open live on sales and partnership calls. Two jobs, equally weighted: get the key facts across fast (he does not have long), and look like a serious, premium operation. A deck that teaches, pads, or rambles has failed even if every fact is right.

## What a deck is here

- A single self-contained HTML file of 1280x720 slides, rendered to PDF with headless Chrome. No PowerPoint, no web fonts, no external CSS: everything needed to render lives in the one file plus repo images.
- 9 to 11 slides. Never more than 12. One idea per slide.
- Waleed reviews every deck before it is used. Nothing here is ever published to the site, linked from it, or placed in `public/`.

## The process

1. **Identify the deck.** Type (programme sale, workshop, partnership), audience (parent buyer, student, company decision maker), and the one decision the deck should drive (enrol, book, agree a trade). If any of the three is unclear, ask before building.
2. **Collect the facts.** Every number, date, price, claim and quote must be traceable to a source: the live page in `app/`, `.claude/skills/content-studio/references/audience-and-offers.md` (approved proof points), `lib/testimonials.ts` (verbatim quotes), `content/business-audit/` (funnel and market numbers, dated), `content/partnerships/<slug>/` (partner dossiers). For a programme or workshop that does not exist yet, the source is Waleed's brief; if a needed fact is missing, ask him rather than invent it. No exceptions to the honesty rule.
3. **Plan against the blueprint.** Pick the matching skeleton in `references/blueprints.md` and write the slide list with one line per slide before writing any HTML. Enforce the word budgets there.
4. **Build.** Copy `assets/template.html` to `content/decks/<slug>/deck.html` and fill it. Design rules in `references/design-system.md` are binding: brand tokens only, archetype layouts, no new decoration. Replace every bracketed token; delete unused archetypes.
5. **Render.** `scripts/render-deck.sh content/decks/<slug>/deck.html "content/decks/<slug>/<Nice-Name>-Deck.pdf"`
6. **Verify like a designer.** Open the rendered PDF and look at every page: overflow, orphaned words, misaligned baselines, contrast on dark slides, photo crops, slide numbers in sequence. Fix and re-render until every slide passes the three-second glance test (the point lands before the viewer reads the body text).
7. **Scan.** `python3 scripts/compliance-scan.py content/decks/<slug>/deck.html` must exit clean.
8. **Deliver for review.** Commit HTML and PDF together, send Waleed the PDF, and say plainly it is awaiting his review. He approves every deck before it goes in front of anyone.

## Hard rules

- All content-studio rules apply: Waleed's voice where prose appears, British English, zero em or en dashes anywhere including CSS comments, no curly quotes, no AI-tell vocabulary, no invented statistics.
- No grade-outcome claims for A-Level Accelerators students until real results exist (August 2026 at the earliest); check `audience-and-offers.md` for the current approved proof list rather than assuming.
- Testimonial quotes verbatim from `lib/testimonials.ts`, never trimmed or paraphrased.
- Prices and dates only from the live page or Stripe. If the page and this skill ever disagree, the page wins and this skill gets updated.
- Real photography only (`public/photos/`); no stock images, no clipart, no emoji.
- Slide copy is terse: fragments are fine, filler is not. Budgets in the blueprints are caps, not targets.

## Where things live

- Decks: `content/decks/<slug>/` (deck.html + rendered PDF), indexed in `content/decks/README.md`. Keep the index current.
- Skill assets: this folder. If a new archetype earns its place, add it to the template and document it in the design system file in the same change.
