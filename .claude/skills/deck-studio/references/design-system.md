# Deck design system

The decks borrow the site's visual language and tighten it for a shared screen. Everything below is binding. When a slide looks wrong, the fix is almost always to remove something, not add something.

## Tokens (never introduce new colours)

| Token | Value | Use |
|---|---|---|
| purple | #2E2557 | Dark slide background, headings, primary text on light |
| purple-light | #3d3370 | Only for subtle depth on dark slides |
| cream | #FBF8F3 | Light slide background, text on dark |
| cream-dark | #F3EBD8 | Quiet fills (bars, table stripes) |
| gold | #C9A96E | The single accent: eyebrow ticks, italic phrases, ticks, featured rings, chips |
| gold-light | #e0b577 | Gold text on dark backgrounds where gold is too dim |
| ink | #1a1535 | Body text on light |
| muted | #6b6584 | Captions only |

Red exists only as #b3544f for cross marks in contrast lists. Nothing else gets a new colour.

## Type

- Headings and numerals: Georgia serif, bold, tight leading. Cover 61px, slide titles 39px, statements 44px, stat numerals 56px, price amounts 44px.
- Body: the system sans stack, 13.5 to 17.5px, ink at 60 to 80 percent opacity. Full opacity black is never used.
- Labels: SF Mono/Menlo, uppercase, letterspaced (.16em to .22em), 10.5 to 12px. This is the "engineered" voice of the brand; every slide has at least one mono element and no slide has more than four.
- The signature move: one italic Georgia phrase in gold inside a purple or cream headline. One per slide maximum; the only exception is the method statement slide, which italicises its three verbs the way the homepage does.

## Slide anatomy

- Canvas 1280x720, padding 60px top, 72px sides, 96px bottom (footer zone). Content never enters the footer zone.
- Every slide: eyebrow (gold 26px tick + mono label) top left, footer bottom (brand chevron + wordmark left, "Programme · NN" right, slide numbers hand-set and sequential).
- Dark slides open and close the deck; everything between is cream. Never two dark slides in a row.
- The dark slide gets one radial gold wash top right (already in the template), nothing else decorative.

## Archetypes (the only layouts)

1. **Cover (dark):** brand row, eyebrow, headline with gold italic, one-line sub, three fact chips, art motif right, founder credit in footer.
2. **At a glance (light):** six white tiles (mono label, serif value, one support line). This is slide 2 of every deck, always: if the call dies early the pitch has landed.
3. **Split (light):** copy left, evidence right (contrast card, timetable, photo frame, anatomy bars).
4. **Statement + steps (light):** one big serif statement, three numbered cards. The Diagnose, Rebuild, Coach slide.
5. **Proof (light):** stat cards left with honest captions, two verbatim quote cards right.
6. **Pricing (light):** three or four price cards, one featured with gold ring and "Most popular" pill, value anchor plus guarantee line beneath.
7. **Close (dark):** three numbered next steps in dark cards, date and scarcity chips, contact in footer.

Art motifs (pure HTML/CSS, one per deck, on cover and optionally close):
- Grade climb (C/D to B to A to A*, gold final rung): Summer Accelerator and general brand decks.
- Mark scheme card (white tilted mini card, gold ticks, "+2 marks found" chip): Subject Accelerators.
- Top 1 percent bars (rising bars, gold tallest with pill): Study System.
A new programme gets its own motif in the same family: flat brand shapes, one gold focal point, no illustration.

## Photography

Real photos from `public/photos/` only, always inside the white tilted frame (`.photo-frame`). One photo per deck is usually right (the founder slide). Reference images relative to the deck file: `../../../public/photos/<file>.jpg`.

## Word budgets (caps)

- Slide title: 9 words. Statement: 18 words. Lede: 2 sentences.
- Tiles: label 2 words, value 5 words, support 8 words.
- Tick/cross lines: 8 words. Step cards: name 5 words, body 12 words.
- Any slide body total: 60 words. If a fact will not fit, it goes in Waleed's mouth, not on the slide.

## Premium checklist (run on the rendered PDF, every deck)

- Nothing overflows, wraps awkwardly, or leaves a single orphaned word on its own line.
- Consistent margins on every slide; tiles and cards align to a grid; gaps are even.
- One gold italic max per slide; gold never used for body text on light slides.
- Dark slide text passes contrast (cream at 80 percent minimum for body).
- Numbers agree with each other and with the live page (savings maths, per-hour maths, dates).
- Footer numbering sequential, programme name correct on every slide.
- No emoji, no stock art, no gradients beyond the two sanctioned washes, no drop shadows on text.
