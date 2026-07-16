# Parent diagnostic follow-up sequence

Written 15 July 2026, alongside the student/parent fork of the Revision Diagnostic. This is the buyer-side sequence: it speaks to the parent who completed the parent diagnostic about their child, never to the student. Waleed reviews every email before anything is switched on.

## The shape of it

Deliberately shorter and more decisive than the student sequence: parents do not want five long teaching emails, they want clarity, trust and a decision path. One instant email on completion, then four emails over eleven days in one of three route variants. After email four, parents simply stay subscribed (they are not added to the student weekly newsletter; the Sunday Session is students only).

| Day | Everyone | Summer variant (PS) | Subject variant (PB) | System variant (PY) |
|-----|----------|--------------------|--------------------|--------------------|
| 0 (instant) | P0 The report + tonight's move | | | |
| 2 | | PS1 Help without nagging | PB1 The capable-child problem | PY1 Effort was never the problem |
| 5 | | PS2 The honest pitch | PB2 The September window | PY2 Fixing the machine, at every budget |
| 8 | | PS3 Parents' questions | PB3 Fair questions | PY3 Parents' questions |
| 11 | | PS4 The decision | PB4 September is a decision | PY4 The compounding window |

Teaching emails send around 8pm (parents read in the evening), pitch and door emails around 11am. Every pitch has an explicit who-should-not-buy section, every door has a genuine free path, and the free 30 minute call is the pressure valve throughout.

## The plumbing (already live in the site code)

- Parents who complete the parent diagnostic join group **Revision Diagnostic Parents** (`193102828818925394`) plus ONE parent route group. They never join the student groups, so they can never receive the student sequence.
- Route groups: **Diag Parents Summer Route** `193102829177537641` · **Diag Parents Subject Route** `193102829598016991` · **Diag Parents System Route** `193102829963970408`. Route selection happens in `lib/mailerlite.ts` `parentRouteGroupId()`, same pattern as the student side.
- New fields on every parent completion: `diag_taker` = "parent", `diag_child_name` (optional, blank if not given), `diag_support` (tutoring status, both paths), `diag_notes` (free text, both paths), plus all the existing `diag_*` fields describing the child.

### Merge fields used in these emails

`{$name}` is the PARENT's first name. `{$diag_child_name|default('your child')}` is how every email names the student, and the default keeps the grammar natural when the parent skipped the optional name field. Also used: `{$diag_archetype}`, `{$diag_bottleneck}`, `{$diag_worry_subject|default('their weakest subject')}`, `{$diag_hours_per_week}`, `{$diag_low_yield_hours}`. An empty `diag_worry_subject` means "not sure", not missing data.

## Building it in MailerLite

Four automations, mirroring the student architecture (one instant, three linear route sequences, no condition steps):

1. **Parent E0**: trigger "subscriber joins group" = Revision Diagnostic Parents, re-entry OFF. One step: send P0 immediately.
2. **Parent Summer**: trigger = joins Diag Parents Summer Route. Delay to day 2 ~8pm, PS1; delay to day 5 ~11am, PS2; day 8 ~8pm, PS3; day 11 ~11am, PS4.
3. **Parent Subject**: same shape with PB1 to PB4 on Diag Parents Subject Route.
4. **Parent System**: same shape with PY1 to PY4 on Diag Parents System Route.

From name **Dr Waleed | A-Level Accelerators**, from and reply-to **Waleed@alevelaccelerators.com**, same identity as everything else. Template spec and deliverability rules are identical to the student sequence (see `../revision-diagnostic/README.md`): text-first, max 600px, at most two or three links, bordered text buttons, visible unsubscribe.

## Switch-on checklist (Waleed)

The four automations were created via the API on 15 July 2026, INACTIVE, with all copy loaded:

- Parent diagnostic: instant report email (P0) · id `193104426403103955`
- Parent diagnostic: Summer route (PS1 to PS4) · id `193104510133995325`
- Parent diagnostic: Subject route (PB1 to PB4) · id `193104582976472652`
- Parent diagnostic: System route (PY1 to PY4) · id `193104665931417269`

1. Read the 13 emails in this folder and edit anything that is not your voice.
2. In MailerLite, open the four "Parent diagnostic" automations and check each email against this folder (sender name and reply-to especially).
3. Send yourself a test of P0 and one route's set; check Primary tab and merge fields (create a test parent through the live diagnostic, then delete it).
4. Enable all four automations.
5. Group-join triggers do NOT fire retroactively: any parent who completed the diagnostic between the fork going live and the automations being enabled needs removing and re-adding to their groups (a fresh join fires the trigger), or a one-off manual send of P0.

## Honesty rules baked into the copy

No grade claims (first results August 2026). The only number used is the measured confidence shift, 6.2 to 8.3 over 74 responses, clearly labelled as confidence, not grades. Prices are stated plainly (£289+ summer, £339 subject, £119/£499 system) and anchored against the real ~£50/hour tutoring average. No countdown-timer urgency: the only deadlines cited are the actual cohort dates (Saturday 8 August, Sunday 13 September). If cohort dates or prices change on the site, these emails must be updated in MailerLite the same day; the repo copy is the source of truth.
