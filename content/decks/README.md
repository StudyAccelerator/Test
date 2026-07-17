# Sales-call decks

Slide decks Waleed keeps open live on sales and partnership calls. Source HTML plus a rendered 16:9 PDF live together in each folder, and the HTML is always the thing you edit. Rebuild a PDF with:

```
scripts/render-deck.sh content/decks/<slug>/deck.html "content/decks/<slug>/<Name>-Deck.pdf"
```

The PDF is the faithful artefact: it is what Chrome renders and what Waleed presents from. Each deck is also mirrored into his Canva account (see below), which is close but not pixel-exact.

These are private sales materials. They are never published on the site, linked from it, or moved into `public/`. Waleed reviews every deck before it is used, and prices or dates shown here must match the live page they came from; when a page changes, the deck changes in the same session. Run `python3 scripts/compliance-scan.py` on any deck you touch.

## Index

| Deck | Folder | For | Built |
|---|---|---|---|
| Summer Accelerator | `summer-accelerator/` | Parent sales calls, cohort starting Saturday 8 August 2026 | 16 July 2026 |
| Subject Accelerators | `subject-accelerators/` | Parent sales calls, cohort starting Sunday 13 September 2026 | 16 July 2026 |
| Top 1% Study System | `study-system/` | Parent sales calls, cohort starting Wednesday 16 September 2026 | 16 July 2026 |

## The Canva mirror (17 July 2026)

Each deck is imported into Waleed's Canva as an editable 9-page presentation via the Canva connector's `import-design-from-url`, pointed at the deck's `raw.githubusercontent.com` URL on this branch. The repo is public, so those URLs are already reachable; never publish a deck to a file-sharing service to manufacture a URL.

To re-import after editing a deck: push first, then import the pushed commit's raw URL. Canva locks per URL, so import a specific commit SHA (or the branch URL) rather than retrying the same one. Every import creates a NEW design; the connector cannot delete, so avoid speculative imports.

Each `<section class="slide">` carries `data-document-role="page"` (plus `data-label`), which is what maps one slide to one Canva page. Keep those attributes on any new slide. The founder photo is embedded as a data URI so the import needs no subresource fetch.

### What Canva's HTML importer does to a design

Learned the hard way, so future sessions do not re-derive it. Canva renders each element as a separate object and does not honour CSS layout faithfully:

- **It flattens flexbox.** Anything relying on `align-items` or on flex blockifying an empty span collapses. Absolute positioning maps reliably, which is why the grade climb, the bar motif and the mark-scheme card are anchored with explicit `left`/`bottom`.
- **It re-bullets `ul`/`li`** regardless of `list-style: none`. Tick rows are plain divs for this reason.
- **It redraws a CSS border as a separate square-cornered frame**, losing `border-radius`; a filled box keeps its radius. The featured pricing card's ring is therefore a filled layer behind the card, not a border.
- **It offsets a text box from its own background shape.** This is unfixable from CSS: padding, fixed height, `line-height` centring and pseudo-elements were all tried, and the label still floats above its pill. The cover and closing slides' fact chips are the one place this shows.
- It does render `::before`/`::after`, but as independently positioned shapes, so pseudo-elements are not an escape hatch.

Net: 7 of 9 slides import faithfully; the fact chips on the two dark slides are imperfect and are the known gap. Do not spend another session chasing them through CSS. If a pixel-clean Canva deck is ever needed, the honest fix is a design change (drop the pill treatment and set those facts as plain text), which is Waleed's call because it changes the PDF too.

**PDF import is worse and is not an option:** it turns every card shadow into a solid block, flattens the dark slides' radial wash into a solid gold disc, and breaks word spacing. Tested 17 July 2026.
