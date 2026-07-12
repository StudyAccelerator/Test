# The free parents' guide

The PDF that parents receive when they sign up on `/parents` lives at `public/ALevel-Accelerators-Parent-Guide.pdf`. **Do not rename that file**: the MailerLite automation that delivers it links to that exact URL.

## Source of truth

The guide is written and designed in `parent-guide.html` in this folder. Edit the copy there, never the PDF directly. The design uses the site's brand colours and fonts (purple #2E2557, gold #C9A96E, cream #FBF8F3, Georgia serif headings) so the guide looks like the rest of the site.

## How to regenerate the PDF

From the repo root:

```
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless --disable-gpu --no-pdf-header-footer --print-to-pdf="public/ALevel-Accelerators-Parent-Guide.pdf" "file://$PWD/content/parent-guide/parent-guide.html"
```

Then check every page fits (four A4 pages, nothing overlapping the page footers) before committing.

## Content rules

Same rules as everything else: Waleed's spoken voice, British English, zero em or en dashes, no invented statistics, and the routing stays honest. The guide's job is to give a parent something genuinely useful (the four tiers, the three questions) and then point them at the free tools first: diagnostic, then tracker, then the Sunday Session, with the paid programmes and the free call as the clearly labelled next step. Rewritten July 2026.
