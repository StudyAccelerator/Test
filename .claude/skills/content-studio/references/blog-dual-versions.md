# Blog dual-version rule (MANDATORY for every blog article)

Every blog article for A-Level Accelerators gets written TWICE, always. This is a standing instruction from Waleed and his SEO optimizer.

## Version 1: the website article

The canonical version, published on alevelaccelerators.com. Built as a Next.js page under `app/blog/<slug>/page.tsx` with an entry in `lib/posts.ts`, using the article-kit components (QuickAnswer, KeyTakeaways, FAQ schema, TrackerCTA/CourseCTA). Follows the voice rules in `brand-voice.md` and the how-to-add-a-post instructions in the project memory. This is the ONLY version that ever goes on the website.

## Version 2: the backlink article

A fully rewritten twin for guest posts and backlink placements, delivered to Waleed as a file (markdown or PDF in `content/backlink-articles/`), NEVER published on alevelaccelerators.com.

Why: search engines treat near-duplicate copies on other domains as syndication. The duplicate gets filtered and the backlink passes less value. Placements need genuinely unique copy targeting the same keywords.

Rules for the backlink version:
- **Same primary and secondary keywords** as the website version, present in the title, at least one heading, and naturally through the body.
- **Different title** (keyword still included), different opening angle, different section structure, and fully re-expressed sentences. Nothing lifted verbatim beyond unavoidable keyword phrases. If you placed the two side by side, they should read as two articles by the same author about the same subject, not as an edit of each other.
- **Same facts and claims only.** Approved proof points from `audience-and-offers.md`; never invent stats for either version.
- **Simpler structure than the website version:** no FAQ block, no QuickAnswer box, no CTAs. Prose with H2 headings, 600 to 1,000 words. Guest-post editors strip widget-like elements anyway.
- **End with the author bio line:** "Dr Waleed Ahmad, MBBS is a UK doctor, former top-performing A-level student and founder of A-Level Accelerators..." (vary the wording per article). The bio is where the homepage backlink usually lives.
- **Include one natural in-text mention** where a link could sit (the free Revision Tracker, the blurting template, or the relevant blog post), but leave actual link placement to the SEO team.
- Voice rules still apply in full: no em or en dashes, no curly quotes, contractions on, no AI-tell vocabulary, Waleed's spoken style.

## Delivery workflow

1. Write the website version and ship it to the repo as usual.
2. Write the backlink version into `content/backlink-articles/` (append to the existing part files or create a new dated file).
3. Regenerate the PDF pack when asked: assemble the HTML with the existing cover/styles in `content/backlink-articles/pack.html`, then render with headless Chrome (`--print-to-pdf`), and copy to `~/Downloads` for Waleed to send to his SEO optimizer.
4. Run the compliance scan (dashes, curly quotes, banned vocabulary) over both versions before delivering.
