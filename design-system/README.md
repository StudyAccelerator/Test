# A-Level Accelerators design system

Refreshed 27 July 2026 from the live production code (globals.css, tailwind.config.ts, header, footer, homepage, pricing section, article kit, FAQ components). Every colour, shadow, radius and pattern here is extracted from what actually ships at alevelaccelerators.com; nothing is invented. This replaces the earlier rough auto-generated design system.

## Contents

- `tokens.css` the canonical token sheet (colours, type, shadows, radii) with the Tailwind names they map to in `tailwind.config.ts`.
- `foundations/` colour palette, typography, surfaces (the layered card shadow, the dark chapter).
- `components/` buttons, cards, article blocks, CTA blocks, pricing tiers, pills and schedule blocks, testimonials and FAQ, navigation.
- `brand/` the writing rules that are part of the visual identity (voice, no dashes, proof points).

Every preview file is self-contained HTML with a `<!-- @dsCard ... -->` first line so the Claude Design pane can index it.

## Syncing to Claude Design

The sync uses the DesignSync tool from a Claude Code session. Remote (web) sessions cannot run the interactive design login, so one of these first:

1. In Claude Design, open the A-Level Accelerators project and use "Send to Claude Code Web", which seeds the project into the workspace; or
2. Run the sync from a session on Waleed's Mac, where `/design-login` works interactively.

Then: `list_files` on the project, diff against this directory, `finalize_plan` with the writes (and deletes for the old rough components), `write_files` from this directory. Incremental, never a blind wholesale replace: keep anything in the remote project that has no local counterpart until Waleed confirms it is obsolete.

## Standing rule

Sessions that change the site's visual language (tokens, shadows, type treatment, a component's look) update this directory in the same pass, and note in their summary that a Claude Design re-sync is due. The site code remains the source of truth; this directory is its documented mirror.
