# Facebook ads: Revision Diagnostic (parent-facing)

Updated 15 July 2026 on Waleed's instruction: the campaign is Facebook only (no Instagram, no Audience Network, no Messenger) and parent-facing only. The earlier student-facing variants are superseded by this file. Voice and proof follow the content-studio skill; approved proof only, no grade-outcome claims.

Rendered creatives (2160x2700, 4:5) live in `creatives/`:

- `parent-ad-a-effort.png` (Waleed at his desk, hands clasped)
- `parent-ad-b-predicted.png` (Waleed arms crossed with stethoscope)
- `parent-ad-c-four-tiers.png` (Waleed pointing down the lens)

Destination for every ad: https://alevelaccelerators.com/revision-diagnostic (the diagnostic has a built-in "parent taking it for their child" mode, so the ads' promise is real).

## Campaign setup (Ads Manager)

1. **Structure:** 1 campaign, 1 ad set, 3 ads (A, B, C compete; keep the winner).
2. **Objective:** until the Meta pixel is switched on, use Traffic optimised for Landing Page Views. Once the pixel is live, duplicate the campaign with the Leads objective optimising for the Lead event (the diagnostic already fires it on completion), because "cheap clicks" and "people who finish the diagnostic" are different crowds and the pixel finds the second one.
3. **Placements:** Manual placements. Tick Facebook Feed only. Untick Instagram, Audience Network, Messenger, and the right-hand column.
4. **Schedule:** run continuously. Do not touch anything for the first 3 to 4 days (Meta's learning phase resets on every edit).

## Targeting (the ad set)

- **Location:** United Kingdom.
- **Age:** 38 to 55 (the parent band from the platform playbook).
- **Gender:** all.
- **Detailed targeting, ORed together:** the demographic "Parents with teenagers (13-17 years)", plus interests "A-level", "UCAS", "Sixth form college", "GCSE". Leave Advantage detailed targeting on so Meta can expand once it finds the pattern.
- Nothing else. No lookalikes or retargeting until the pixel has data to build them from.

## Budget (recommendation, Waleed's call)

- Start at **£10 per day** on the single ad set, and review after 7 days (about £70).
- Why that number: much below £10 a day the three ads split the budget so thinly that Meta cannot exit the learning phase or produce a readable result inside a week. This is a test budget, priced to buy information, not growth.
- **Decision rules at day 7:** kill any ad with clearly worse cost per landing view (or per diagnostic completion once the pixel is on); if one ad is winning and the cost per result is acceptable to Waleed, raise the budget by no more than 20 to 30 percent at a time (bigger jumps reset learning); if nothing converts by about £100 total spend, pause and change the creative or the offer, not the targeting.
- Cap the whole experiment at a number Waleed is comfortable losing entirely. The point of round one is the number it produces: cost per completed diagnostic, which prices every future decision.

## Tracking

- Add this to each ad's "URL parameters" field so GA4 attributes the traffic:
  `utm_source=facebook&utm_medium=paid&utm_campaign=diagnostic_parents&utm_content={{ad.name}}`
- Watch in GA4 (source facebook / paid) and, once the pixel ID is in, in Ads Manager as Leads.

## The three ads (all fields, ready to paste)

CTA button on all three: **Learn more**. Display link: `alevelaccelerators.com`.

### Ad A: the effort reframe (image: parent-ad-a-effort.png)

**Primary text:**
If your child is working hard and the grades still aren't moving, effort isn't the problem. It almost never is.

I'm an NHS doctor and a former top A-level student. Across 1,000+ students I keep seeing the same thing: most revision builds knowledge, but exams test performance under pressure. Two different skills, and schools only teach the first one.

So I built a free diagnostic that finds exactly where marks are leaking. 20 questions, about 4 minutes. You can take it for your child, or send it to them tonight. You'll get a proper report, not generic advice.

**Headline:** Find where your child's marks are leaking
**Description:** Free 4-minute revision diagnostic from an NHS doctor.

### Ad B: predicted grades (image: parent-ad-b-predicted.png)

**Primary text:**
Predicted grades decide which universities your child can even apply to. And they get set on performance in assessments, not on hours of effort.

If there's a gap between the grades your child gets and the grades they need, something in how they revise is quietly costing them marks. Most students never find out what.

I'm a doctor. I don't treat patients before diagnosing them, and revision is no different. My free diagnostic pinpoints the weakest link in your child's revision and what to fix first. 4 minutes, and you can take it on their behalf.

**Headline:** Predicted grades below where they need to be?
**Description:** A doctor-built diagnostic. Free, 4 minutes.

### Ad C: the four tiers (image: parent-ad-c-four-tiers.png)

**Primary text:**
Here's what school never explains to parents. Grades come in four tiers: knowing the content, recalling it, applying it, and performing under exam pressure. Most students are stuck at one of these tiers and have no idea which.

More hours won't fix the wrong tier. Finding it will.

I'm an NHS doctor who has worked with 1,000+ A-level students, and I built a free diagnostic that identifies exactly which tier is holding your child's grade down. 20 questions, 4 minutes, a real answer.

**Headline:** Which tier is holding their grade down?
**Description:** Free revision diagnostic by Dr Waleed Ahmad, MBBS.

## Doctor-fronted video script (30 to 45 seconds, parent version)

Film once; it becomes the fourth ad once the statics have picked a winning angle. Talking head, captions burned on, vertical or square.

- **Hook (0 to 2s).** Spoken: "If your child works hard and the grades don't move, it isn't laziness." On-screen: WORKING HARD. GRADES STUCK.
- **Credibility (2 to 12s).** Spoken: "I'm an NHS doctor. Before medicine I was an A-level student doing exactly what your child is doing now: revising for hours and losing marks anyway." On-screen: NHS doctor. 1,000+ students.
- **Insight (12 to 26s).** Spoken: "Here's what nobody tells parents. Rereading notes builds recognition. Exams demand recall under pressure. They're different skills, and schools only teach the first."
- **Offer (26 to 38s).** Spoken: "So I built a free diagnostic. Twenty questions, four minutes. It shows exactly where your child's marks are leaking, and you can take it for them." On-screen: Free. 4 minutes. Take it for your child.
- **Close (38 to 43s).** Spoken: "It's free. The link's below." On-screen: Tap Learn More.
