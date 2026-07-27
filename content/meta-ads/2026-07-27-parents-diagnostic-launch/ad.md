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

> The course they want asks for AAA. The predicted grades aren't there yet. And your child is already working hard.
>
> If that's your house right now, this is for you.
>
> I'm an NHS doctor. Before medicine I was a top-performing A-level student, and I've worked with over 1,000 A-level students since. I see the same pattern every week: a student putting in real hours with a revision system nobody ever taught them, then losing marks in exams they knew the content for.
>
> Effort is almost never the problem. The system is. And you can't fix a system you can't see.
>
> I can't treat a patient without a diagnosis first. Revision is the same. So I built the Revision Diagnostic for parents:
>
> • You answer 20 quick questions about how your child revises. It takes about 3 minutes.
> • You get an instant report showing which of 7 revision profiles your child fits.
> • It shows where their study hours are leaking away, and what to change first.
>
> It's free. No call and nothing to book. Just a clear picture of why the hours aren't turning into the grades, before results day on 13 August and the new school year.
>
> Tap Learn More and see which profile your child gets.

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

On-image copy: eyebrow "FOR PARENTS OF A-LEVEL STUDENTS", headline "Hours of revision. Grades that don't match.", subline naming the 20 questions and the instant report, gold pill "Take the free diagnostic", credibility badge "Dr Waleed Ahmad, NHS doctor". Editable sources in `creative-src/` (HTML, rendered with headless Chrome at exact pixel sizes).

### Why the opening line is the opening line

Meta truncates primary text after roughly the first two lines, so the hook has to catch the priority reader before "See more". "The course they want asks for AAA. The predicted grades aren't there yet." is the exact sentence in a rising Year 13 parent's head in late July: predictions were just set at the end of Year 12, the UCAS application lands in the autumn, and the gap between the two is the single sharpest frustration named in the brief. Parents of rising Year 12s aren't excluded: the second paragraph onwards (hours in, grades not matching, system never taught) is their story too, and nothing in the ad names a year group as a requirement.

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
