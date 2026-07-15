# Legal page drafts (NOT live)

`privacy-page.tsx` and `terms-page.tsx` are complete draft pages for /privacy and /terms. Waleed parked them on 15 July 2026 while he finalises the details: they are deliberately NOT routed, NOT linked and NOT in the sitemap, and no session should publish them without his explicit instruction.

Each draft still carries bracketed placeholders (legal trading entity, business address, ICO registration number) that only Waleed can fill.

## To publish them later

1. Fill the bracketed placeholders in both files.
2. Move the files back: `content/legal-drafts/privacy-page.tsx` to `app/privacy/page.tsx` and `content/legal-drafts/terms-page.tsx` to `app/terms/page.tsx`.
3. Re-add the two footer links (Company column in `components/footer.tsx`) and the two sitemap entries (`app/sitemap.ts`).
4. Build, check /privacy/ and /terms/ render, then deploy.
