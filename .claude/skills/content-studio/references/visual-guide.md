# Visual guide

**Corrected by Waleed, 16 July 2026, and this correction outranks everything below: the default visual is a REAL PHOTO of Waleed, raw and natural, from the repo's `Photos ` folder.** Heavily designed graphics (quote cards, wordmark panels, brand-coloured templates) read as AI-generated, and LinkedIn started suppressing that content class in May 2026. Photos with his face outperform designed images by a wide margin. Crop to 4:5 (1080x1350), match the photo to the story, and add at most one line of light text (5 to 8 words, white with a soft shadow, no panel, no logo) on a minority of images. On Facebook, text-only posts are the default and the only images worth attaching are real phone photos. The designed formats that survive: de-branded document carousels for genuinely information-dense frameworks, and real product screenshots. Everything below about card graphics is now fallback-only, for when no real photo fits.

## Brand look

- Colours: deep purple `#2E2557`, gold `#C9A96E`, cream `#F3EBD8`, dark text `#1a1535`. (These are the site's brand tokens.)
- Fonts: a serif for headlines (Georgia-style), clean sans for body.
- Feel: premium, calm, credible. Not a busy "study-gram". Lots of white/cream space. One idea per graphic.
- Always brand it: small "A-Level Accelerators" wordmark or Dr Waleed's name on each graphic so screenshots stay attributable.
- Real over stock: a screenshot of a live session, the tracker, the blurting template, or Waleed's face beats any stock photo. Never use obviously-AI or generic stock imagery; the user specifically wants visuals that don't look AI-generated.

## When each format applies

- **LinkedIn carousel (PDF document, 6 to 10 slides):** the top-performing format. Use for any list, framework or step-by-step ("The 4 tiers", "5 questions to ask before hiring a tutor", "Your Year 12 summer, week by week"). Slide 1 is the hook/cover, last slide is a soft CTA + Waleed's name. Big text, one point per slide.
- **Single quote/stat card:** for a single punchy line or an approved stat. Purple background, gold accent, the line in large serif, wordmark bottom corner.
- **Screenshot post:** the revision tracker output, a marked-up mark scheme, the blurting template, a real testimonial. Most authentic and most trusted; use often.
- **Face-to-camera photo:** founder-story and reassurance posts land harder with Waleed's actual face. Use the graduation photo already on the site, or new photos in a teaching setting.
- **Short-form video thumbnail / cover:** bold 3 to 4 word text, face, brand colours.

## How to produce them

1. **Spec for a human/designer (default when handing off):** write a tight brief: format, dimensions, exact copy per slide, which brand colours, what image/screenshot, and the wordmark placement. The user works with editors; a clear brief is often the right deliverable.
2. **Generate directly when asked:** build the graphic as a self-contained HTML file using the brand colours and render it (the repo has a headless-Chrome to PDF/PNG path used for the blurting template; reuse that approach). Good for carousels and quote cards. Keep everything inline, no external assets.
3. **Canva:** if the user prefers, give them a slide-by-slide script they can drop into a Canva template. Provide exact text and colour hex codes.

Dimensions cheat-sheet: LinkedIn carousel 1080x1350 (4:5) or 1080x1080; single image 1200x1200; Facebook 1200x630 or 1080x1080; Reels/TikTok/Shorts 1080x1920 (9:16); YouTube thumbnail 1280x720.

## Rule of thumb

If a post is a list, a framework, a stat, or a step-by-step, it should ship as a carousel or card, not plain text. If it's a personal story or a reframe, a face photo or a single quote card is enough. If in doubt, spec the visual and flag it, never ship list content as a wall of text.
