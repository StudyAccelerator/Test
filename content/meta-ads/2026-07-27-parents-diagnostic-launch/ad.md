# Meta ad: parents into the Revision Diagnostic (first paid push)

Built 27 July 2026. Nothing here runs until Waleed launches it himself in Ads Manager. The two gates from the 17 July lead generation map still apply before a pound is spent: legal pages live (drafts in `content/legal-drafts/`) and Waleed's explicit budget approval.

## The creative direction, and why this one

**Backed: Waleed's face, in scrubs, with the stethoscope. Photo-led, one creative direction, no alternatives.**

The reasoning, from the 15 July Ad Library research (`content/facebook-groups/2026-07-15-facebook-groups-and-parent-competitors.md`):

- Every winner in the UK parent market fronts a person, not a logo. MyEdSpace pays to run named-teacher ads ("Neil Does Maths"); Sabah Hadi built a five-figure parent community on "Hi, I'm Sabah"; Bradfield Tuition's whole machine is founder-face ads. The faceless corporates list facelessness as their own weakness.
- The one asset none of them can copy at any budget is a practising NHS doctor who teaches the method himself. The scrubs and stethoscope say it before a word is read. A brochure-style graphic would spend that advantage on decoration.
- Kip McGrath's proven register (validate the parent's instinct, never blame the child) shapes the copy; the doctor photo is what makes the same words credible from us.

The studio still (scrubs, arms crossed, warm room, teaching screen behind) reads as "calm professional who will tell you the truth", which is the brand. The two black-polo stills are held in `creative-src/` as the refresh variants for when this creative fatigues.

## The finished ad

**Campaign objective:** Leads (website conversions, optimising to the Lead event, live on the pixel since 14 July).

**Destination URL:**
`https://alevelaccelerators.com/revision-diagnostic/?for=parents&utm_source=facebook&utm_medium=paid-social&utm_campaign=parents-diagnostic-2026-08`

(`?for=parents` preselects the parent path so the fork never loses them.)

### Primary text

> The course they want asks for AAA. The predictions aren't there yet. And your child is already working hard.
>
> I'm an NHS doctor and I've worked with over 1,000 A-level students. When the hours go in and the marks don't come out, it's almost never effort. It's the revision system nobody taught them.
>
> The free Revision Diagnostic shows you what's actually going wrong:
>
> • 20 quick questions about how your child revises, about 3 minutes
> • An instant report: which of 7 revision profiles fits your child, where the study hours leak, and what to change first
>
> Completely free. Take it before results day on 13 August.
>
> Tap Learn More and see which profile your child gets.

Trimmed to about 110 words on 27 July at Waleed's instruction: the first draft ran about 200 words, longer than the competitor norm (MyEdSpace and the other parent-market winners run a hook, one credibility line, short bullets and a CTA). The ask is a free 3 minute quiz, so the copy matches the size of the ask. Deliberately no "no call, nothing to book" anywhere: the funnel's next step after the report IS the call, so the ads never promise its absence.

### Headline (below the image)

The free A-level revision diagnostic

### Description

20 questions, 3 minutes, instant report.

### Call to action button

Learn More

### Creative files (in `final/`)

- `parents-diagnostic-4x5.png` (1080x1350): feed placements, the primary asset
- `parents-diagnostic-1x1.png` (1080x1080): right column and any square placement
- `parents-diagnostic-9x16.png` (1080x1920): Stories and Reels placements

On-image copy: eyebrow "FOR PARENTS OF A-LEVEL STUDENTS", headline "Your child puts the hours in. So where are the marks?" (direct parent call-out, reworded 27 July at Waleed's instruction), subline naming the 20 questions and the instant report, gold pill "Take the free diagnostic" beside "Completely free. Takes about 3 minutes.", credibility badge "Dr Waleed Ahmad, NHS doctor". Editable sources in `creative-src/` (HTML, rendered with headless Chrome at exact pixel sizes).

### Why the opening line is the opening line

Meta truncates primary text after roughly the first two lines, so the hook has to catch the priority reader before "See more". "The course they want asks for AAA. The predictions aren't there yet." is the exact sentence in a rising Year 13 parent's head in late July: predictions were just set at the end of Year 12, the UCAS application lands in the autumn, and the gap between the two is the single sharpest frustration named in the brief. Parents of rising Year 12s aren't excluded: the second paragraph onwards (hours in, grades not matching, system never taught) is their story too, and nothing in the ad names a year group as a requirement.

## Creative 2: the diagnostic profiles graphic (added 27 July, same day)

A second concept for the same ad set, in the site's own look (cream, white card, purple): headline "Which of the 7 revision profiles is your child?", the seven real archetype chips from `lib/diagnostic.ts` with The Grinder highlighted ("hours going in, marks not following. Sound familiar?"), a reason-why subline ("The instant report shows where their study hours are leaking, and what to change first"), pill "Find your child's profile" beside "Completely free." Files: `parents-profiles-4x5.png`, `parents-profiles-1x1.png`, `parents-profiles-9x16.png` in `final/`, sources in `creative-src/`. It tests product curiosity against founder credibility, which is the most informative first contrast. Uses the same primary text, headline and URL as creative 1.

## The £100 test plan (agreed structure, 27 July)

Budget Waleed named: £100 through to the cohort start on Saturday 8 August (about £9 a day if started 28 or 29 July).

- ONE campaign, ONE ad set, lifetime budget £100 with end date 7 August. Both concepts sit inside the same ad set as two ads; Meta's delivery shifts spend to whichever earns cheaper leads. No manual split: separate ad sets at this size halve the data per cell and double the learning problem.
- The three sizes of each concept are one ad each (placement customisation), not separate ads. So the ad set contains exactly two ads.
- No third text-only creative: the primary text already does the text-led job, and a third ad would thin £100 too far. The black-polo stills in `creative-src/` are the refresh material for after this test reads.
- Honest expectations at benchmark CPLs (£16 to £28): roughly 4 to 6 leads from £100. This test buys information (first real CPL, quiz completion rate) and warms the pixel and retargeting audiences before results week; it will not fill the August cohort by itself, and leads landing 5 to 7 August have little runway before the 8th. Their value is the list and the September cohorts.
- Judge nothing before about £50 has spent.

## Ads Manager setup (from the 17 July lead map, section 6)

- One campaign, one ad set. UK, ages 38 to 55, Advantage+ audience with light parent-of-teens hints. The copy does the fine targeting.
- Optimise for the Lead event. Judge on 14-day windows, not day one.
- £300 as a four-to-six-week test is the standing recommendation, timed to run into results day (13 August) when education inventory is at its annual cheapest. Decision rule as written in the lead map: leads under about £20 with quiz completions holding means scale; £30+ or completions collapsing means fix creative or page before adding a pound.
- Retargeting audiences (site visitors 180-day, engagement 365-day) should be created before launch so they fill from organic traffic.

## Honesty and policy checks done

- Every claim in the copy is an approved proof point: NHS doctor, former top-performing A-level student, 1,000+ students, the diagnostic's real mechanics (20 questions, 7 profiles, instant report, free). No grade outcomes, no invented numbers.
- Nothing asserts anything about the reader's child (Meta personal-attributes policy): the ad describes a situation the reader recognises, it never claims to know their child is struggling.
- Results day date (Thursday 13 August 2026) is JCQ-correct.
- Compliance scan (`scripts/compliance-scan.py`) run on this file and the creative sources.

## What happens after the click (already live)

Diagnostic parent path → instant report addressed to the parent → "Revision Diagnostic Parents" MailerLite group → the 13-email parent sequence (all four automations verified on). The report-page call flip and 24-hour outreach habit from the lead map remain the two conversion upgrades worth making before launch.
