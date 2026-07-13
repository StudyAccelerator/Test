# A-Level Accelerators: the full business audit and growth plan

Written 13 July 2026, on branch `claude/accelerators-business-audit-lro96y`.

This is analysis and a plan. Nothing in it has been executed. Nothing gets executed until you approve it.

## 0. What this is based on, and what it refuses to do

Everything below traces to a source you own or a public page fetched today:

- Your MailerLite account, pulled live on 13 July: every group, automation, campaign and the newest 100 subscriber records.
- The repo at main commit `e3682d2` (12 July), plus the unmerged branches, including the partnership branch.
- Your live site, fetched page by page today.
- Ahrefs' free domain rating endpoint (the full Ahrefs API refused access: the connected plan has no API allowance).
- Competitor pages fetched today, with the price or claim quoted and the URL named.

There is no Stripe connection and no analytics on the site, so this document contains **no revenue figures, no conversion rates, no traffic numbers and no sales counts**. Where a plan needs one, it says "your number" and stops. Section 9 lists exactly what to hand over. Prices quoted for your own offers are the ones published on your own pages and reference files.

## 1. The verdict

You asked to be told things you did not want to hear. Here is the audit in one page.

**You have built a business's worth of machinery and stopped selling while you built it.** Between February and May you ran live workshops, mailed the list relentlessly, and built an audience of 533 from nothing. Since 6 May you have sent zero broadcasts. Since 6 June you have added zero new email addresses. In those same weeks you shipped a redesigned site, a genuinely good diagnostic, a rebuilt tracker, a parents guide, 16 sequence emails, 7 newsletter issues, a 30-day content calendar with rendered graphics, a backlink pack, and an HQ dashboard. Almost none of it has been put in front of a single new human. The machine is built. The ignition has not been turned.

**The numbers that define the situation (all real, all yours):**

1. **533 subscribers, newest joined 6 June.** Five weeks of zero list growth, immediately before your biggest revenue window of the year.
2. **18 broadcasts between 18 February and 6 May, none since.** Open rates ran 46 to 84 percent. This list is warm and it is being ignored.
3. **The new tool suite has captured almost nobody yet:** Revision Diagnostic group: 2. Sunday Session: 0 (7 issues drafted, none sent, first one dated for this Sunday). Parent Leads: 2. Revision Tracker: 29. The route groups behind the 16-email sequence: 2, 0 and 0.
4. **Your live sales page says the cohort starts Saturday 25 July.** Your brief to me says the Summer Accelerator launches early August. One of those is wrong, and the difference is your entire selling window. As published, you have 12 days.
5. **Domain Rating 0.** Seneca 69, PMT 63, Save My Exams 63, SnapRevise 52, Up Learn 40, MyEdSpace 38, Latimer Tuition 22, Tailored Tutors 18. A web search for your own business name returns nothing about the business. The site has no analytics, no pixel, and has never run an ad. The SEO estate (11 articles plus 11 unplaced backlink twins) is currently inert.

Two smaller corrections you should hear because they show the pattern: results day is **Thursday 13 August**, not 14 August as your brief says (your own repo already corrected this in commit `773c26d`); and the /workshop page on your live site still advertises "Saturday 2nd May", ten weeks in the past.

**The core diagnosis:** this is a builder's business run in builder mode during the four weeks that reward seller mode more than any other month of the year. The workshops and the emails, the two things you have stopped doing, are the only two things that have ever demonstrably worked. The good news is deliberate: nearly everything needed to sell hard for the next 12 days already exists in draft. The work now is approval and sending, not building.

## 2. Offer stack and pricing architecture

**What you sell today (from your own pages and reference files):**

| Offer | Where | Published price | Conversion action |
| --- | --- | --- | --- |
| Summer Accelerator, 6-week live course, Year 12 into 13 (Bio, Chem, Maths, Physics), cohort starts Sat 25 July | /summer-accelerators | £289 one subject, £539 two ("save £39"), £739 three ("most popular, save £128"), £849 four ("save £307"); "£9 to £12 per hour" anchoring against £50 1:1; first session risk-free with full refund | 4 Stripe payment links, live |
| Subject Accelerators, 12-week live weekend programmes (Maths Sat, Bio and Chem Sun), cohort starts Sun 6 September | /subject-accelerators | £339 one subject, £629 two (featured, "save £49"), £849 all three ("save £168") | 3 Stripe payment links, live |
| Study System layer, cohort starts Wed 9 September | /study-systems | Study Series £119; Study Accelerator £499; Top 1% Mentorship £2,000 per year, "invite only, limited to 5 spaces" | Stripe links for £119 and £499; consultation booking for the mentorship |
| Free call | site-wide header/footer | n/a | scheduler.zoom.us/dr-waleed-ahmad/a-level |
| Free tier | diagnostic, tracker, blurting PDF, parents guide, newsletter | £0 | MailerLite capture (except the blurting PDF, which is ungated) |

**What the market charges around you (fetched 13 July):**

- MyEdSpace Summer School: **£20 one subject, £37 two, £49 all**, first week of August, with a countdown and "4.8 on Trustpilot, 2,124 reviews" (summerschool.myedspace.co.uk).
- PMT summer refreshers: **£245 three-day, £95 one-day**, dated 18 to 25 August, straight after results day (pmt.education).
- Justin Craig summer school: **£955 to £1,595** (justincraig.ac.uk/course-fees).
- Up Learn: **£319.99 to £419.99 per subject per year** with "A*/A guaranteed, or your money back" (uplearn.co.uk/pricing).
- Tailored Tutors: **£76 per month** all three sciences, "Grade Guarantee" (tailoredtutors.co.uk).
- MyTutor 1:1: **from £26/hr** with "543,877 five-star reviews" displayed (mytutor.co.uk/pricing).

**The uncomfortable readings:**

1. **You sit mid-market with zero displayed proof numbers in a market that proof-stacks obsessively.** Every one of those competitors leads with review counts, star ratings, student volumes or outcome percentages. Your approved proof points (1,000+ students taught; confidence 6.2 to 8.3 across 74 responses; named student quotes) are real and usable, and they are underweighted on the money pages relative to what every buyer will see on the next tab. You cannot out-stack MyEdSpace's 2,124 reviews. You can be the only page a parent reads that sounds like a doctor explaining a treatment plan, with the honest numbers you do have placed where the buying decision happens.
2. **£289 to £849 against a £49 mass-market summer school is a defensible premium only if the page sells depth**: small cohort, diagnosis-first, one named teacher, accountability. If a parent's frame of reference is MyEdSpace, your page must answer "why is this 17 times the price" without being asked. Whether the price itself is right, I cannot and will not judge without your sales data: that is decision 2 in section 9.
3. **Guarantees are normalised in this market** (Up Learn, Tailored Tutors, Seneca's add-on). You currently offer "first session risk-free", which is honest and modest. Whether to go further is a risk decision only you can make, and it interacts with the fact that you have no results data until August. Flagged, not recommended either way.
4. **Your ladder is wider than your own strategy docs admit, and it contains a written promise.** The offers reference file lists three programmes and no Subject or System prices; the live site quietly sells a full £119 to £2,000 ladder across three cohorts (25 July, 6 September, 9 September) with seven live Stripe links plus an invite-only mentorship. Good structure. But the summer page also tells every visitor "the September cohorts open at a higher price". That is a public price-rise commitment: either the September pages honour it in September, or the line comes down before a parent screenshots it. Decide once.
5. **Conversion truth already exists in your own account and is unexamined.** The £119 and £499 Study System prices live on the site today and match what the June-era workshop funnel sold. Eight people sit in your "Buyers" group at a 75.5 percent open rate. What they bought, at what price, and what your February and May workshop cycles converted, is the closest thing you have to real conversion data, and it beats any projection. That is ask 3 in section 9.

## 3. The funnel as it actually stands

**The capture layer (live counts, 13 July):**

| Group | Members | Notes |
| --- | --- | --- |
| Lecture Series Students (x2 near-duplicate groups) | 181 + 180 | Feb era, heavy overlap |
| Top 1% Study Systems Workshop | 158 | April cycle |
| Workshop / Re-invite / Attendees / Study Series | 89 / 86 / 46 / 26 | Feb to May cycles, overlapping |
| Revision Tracker Users | 29 | Since mid-May, the only tool with organic uptake |
| Buyers | 8 | 75.5% open rate. What did they buy, and for how much? (ask 3) |
| Parent Leads | 2 | Guide funnel, live |
| Revision Diagnostic | 2 | Live since 11 July; likely includes your tests |
| Route groups (Summer / Subject / System) | 2 / 0 / 0 | Feed the 16-email sequence |
| Sunday Session | 0 | 7 issues drafted, zero sent, zero members |
| 1:1 Calls | 2 | |
| UCAT group | 2 | Abandoned experiment, automation off |
| Newsletter Signups (legacy) | 0 | Empty, superseded |

**The automation layer:** 15 automations. The four diagnostic automations (E0 instant report, Summer route, Study System route, Subject route) are **all live as of today**. Note: CLAUDE.md and the Cowork snapshot still say two routes are off pending review; the live account says otherwise, and the dashboard's seeded task list still carries "switch on remaining automations, due 14 July" as open. I have corrected the docs in this commit. Also live: tracker sequence (13 steps), parent nurture (13 steps), three workshop-era automations. One empty superseded shell automation is still awaiting deletion.

**What the funnel data says, bluntly:**

1. **Every part of the machine that touches a buyer is unproven, and every proven part is switched off.** The proven parts: live workshops that registered 158 and 89 people in a cycle, and broadcast emails at 46 to 84 percent opens with the two biggest click spikes on workshop follow-ups (18.5% and 41.7%). The unproven parts: diagnostic, newsletter, parents guide, sequence, all averaging 0 to 2 humans so far. This is not a quality judgement. It is a traffic judgement: nothing has been sent to them.
2. **A live commitment is currently being broken.** The E0 email and the sequence promise "one email a week" (the Sunday Session). Zero issues have ever been sent. The moment the diagnostic gets real traffic, every new lead is promised a newsletter that does not arrive. SS1 is drafted and dated this Sunday, 19 July. Send it or stop promising it.
3. **A live funnel defect:** the Parent Leads nurture automation's first email still buttons to the old Google Drive copy of the parents guide, not the rewritten PDF on your domain. The fix is written and waiting in `content/parent-guide/delivery-email.md`. Five minutes in MailerLite.
4. **The /workshop page advertises 2nd May.** Your own newsletter README quarantines it as a CTA until fixed. It is linked from live nav. A parent who lands there reads "this business stopped in May".
5. **Voice-of-customer gold is sitting unused in your signup fields.** The workshop registration answers are dominated by Biology and Chemistry, UCAT, predicted grades, burnout and "working hard but the grades don't follow". Your audience is heavily medicine-leaning. You are a doctor. The positioning implication is in section 6.

## 4. Website and tools

**The information architecture is genuinely good.** A clear hub homepage, three programme pages, a Free Tools dropdown, tools that cross-link each other, a blog wired to the tracker from every article, clean canonicals, structured data on every page type, and an llms.txt. Most one-person businesses never get close to this. The critique below is about the last five percent, and about the fact that nobody is arriving to see any of it.

**Conversion-path defects found in the code (each small, all cheap, and all sitting on the money path):**

1. **Every blog article's course CTA links to the homepage.** The article kit's CourseCTA defaults to "/" and no article overrides it. The Year 12 summer revision article, your single most launch-relevant page, shows a button reading "Explore the Summer Accelerator" that goes to the homepage instead of the sales page. Buyers who click a buy-intent button get a scenic detour.
2. **/workshop is an orphan.** Zero internal links from any page, nav or footer; it survives only in the sitemap. The homepage and the diagnostic's system route both mention "the free workshop" in copy but link to /study-systems instead. The mechanism that built your entire list is stale (2nd May) and unreachable at the same time. That is the clearest single symptom of builder mode: the proven thing got disconnected while new things got built.
3. **No og:image exists anywhere on the site.** Every link you or anyone else shares on WhatsApp, Facebook or LinkedIn renders as a bare text card. Play 1 is largely link-sharing into exactly those channels; one branded 1200x630 image and a metadata line would make every shared link look like a business. Half a day, disproportionate payoff during launch week.
4. Smaller and worth batching in one hygiene pass: six pages double the "| A-Level Accelerators" suffix via the title template; the subject page title says "Programs" (US spelling) on a money page governed by a British English rule; CLAUDE.md says the summer page has 13 FAQs but the code has 12; llms.txt omits the diagnostic and the newsletter from its page list; and the parents form and diagnostic already fire `fbq`/`gtag` lead events into a pixel that was never installed, so play 3's instrumentation is half-wired already.

**The sales page itself (summer):** the mechanics are mostly right: tier framing with savings maths, per-hour anchoring, a real risk reverser (first session risk-free, full refund), FAQs with schema, a sticky mobile buy bar. Two gaps: the urgency is vague ("limited spaces", no number, no date) where your true scarcity (a real capacity you can teach well, and a hard start date) is more persuasive than the vague version; and the page's fate after 25 July is undefined. The moment the cohort starts, this page, the diagnostic's "every Year 12 STEM student routes to Summer" rule, and the summer sequence emails all start selling a course that has already begun. The September flip (page banner to waitlist or September cohorts, routing switch, sequence retarget) needs a scheduled owner, and it is in play 2.

**Diagnostic routing honesty check, since your rules demand it:** the routing is genuinely diagnosis-dependent across archetypes and year groups. One flag: every Year 12 with Biology, Chemistry, Maths or Physics routes to the Summer Accelerator regardless of diagnosis (the justification text varies, the destination does not). Given your audience is overwhelmingly Y12 STEM, that is close to a hard-wire for your main segment, and after 25 July it becomes actively wrong until the September flip lands.

**The tools themselves:**

- **The diagnostic is your single most differentiated asset.** In the nine-competitor sweep, nobody else runs an assessment-style capture tool. Everyone else's lead magnet is a free trial or a content library. A diagnosis-first funnel fronted by a doctor is a real wedge, and the routing engine (seven archetypes, honest programme routing) is built to a standard most funded competitors do not match. It has had two humans through it. Distribution is the entire problem.
- **The tracker quietly works:** 29 users with no promotion since mid-May, and its automation is live. It is the only evidence so far that a tool can pull people in on its own.
- **The blurting template is ungated by design** and linked from everywhere, including inside sequence emails. Keep it ungated (it is doing trust work, and gating it would add friction exactly where you are trying to be generous), but know that your most-linked free asset captures nothing by choice.
- **Results Day Rescue is on the roadmap with a ship date of 12 August.** Given the next 12 days (section 8), protect that date by keeping its scope small; the roadmap's own instinct is right.

## 5. SEO, content and the open web

**The blunt version: you have no SEO, and you cannot buy any before results day.** Domain Rating 0 against 18 to 69 for everyone you compete with. Zero meaningful referring domains means the 11 site articles and the 11 backlink twins, a genuinely large writing investment, currently return nothing and cannot return anything in the August window. The results-day search moment will be won by Latimer (DR 22), PMT, Save My Exams and MyTutor, all of whom already have 2026 results-day content live.

**The backlink pack was written for an SEO team that does not exist.** The pack's own cover addresses "the SEO team". There is no target site list, no outreach log, and no evidence any twin has been placed. That is not a content failure, it is a missing final mile: written, rendered to PDF, never sent anywhere.

**What the content estate is actually worth right now:** the articles are excellent source material for the thing that does work, your email list and your social calendar. The blurting article became a sequence email; the hours article underpins the tracker's rules. Use them that way in July and August. Treat search as a September project or consciously park it (section 8, play 5).

**Two things already done right, for the record:** the technical layer (sitemap, canonicals, structured data) is clean, and you have an llms.txt plus AI-crawler-friendly robots. When authority arrives, the plumbing is ready.

## 6. Positioning and audience

**What the data says about who you actually attract:** the signup records are dominated by Biology and Chemistry students with UCAT anxieties and medicine ambitions. They came to a doctor. Your approved audience definition (all A-level students, parents as buyers) is broader than the audience your gravity actually pulls. I am not telling you to rebrand as a medics-only service. I am telling you that in every fight for attention, "the NHS doctor who teaches the revision ward round" beats "another A-level tutoring brand", and your own list is the proof. Lead with the doctor everywhere; let the medicine-leaning students self-select; take everyone.

**The buyer-side gap is your biggest positioning weakness.** Your own audience file says it: parents sign off the purchase, parent-trust content is the revenue engine. Against that: the parents' surface is one page, one guide, 2 leads, a Facebook page so new it has no vanity URL, zero posts I can verify, zero ads ever, and a student-facing everything else. LinkedIn (your active channel) is students. The place where buying decisions happen is the least built part of the estate. The competitor seed's synthesis says nobody in the set speaks to parents on Facebook with any care; that is an open lane, and it is also currently an empty one on your side.

**Proof asymmetry (from section 2) is the other weakness:** honest proof you own is not deployed where buyers decide, in a market that decides on proof.

## 7. Operations, compliance and risk

The things that could hurt you independent of growth:

1. **Your full MailerLite API key ships to every visitor's browser.** It is hardcoded in the client bundle (by design, per the repo comments) and it is a full-account key. Anyone who opens dev tools can extract it and read or export all 533 subscriber records, most of them minors, or send email as you. This needs a decision, not panic: the practical fixes (MailerLite's own hosted form endpoints for the simple joins, a tiny free Cloudflare Worker or Vercel function as a key-holding proxy for the diagnostic's rich fields, then rotate the key) are a half-day of work. Sequence it after 25 July so nothing breaks mid-sprint, but do not carry this into September.
2. **No privacy policy and no terms exist anywhere on the site** (I checked; /privacy, /privacy-policy and /terms all 404). You are collecting names, emails, year groups, grades and worry data from under-18s, and selling a paid programme through Stripe with no published terms, refund position, or privacy notice. UK GDPR requires privacy information at the point of collection, and the ICO data protection fee likely applies to you. I am not your lawyer; this needs an hour with a template and, ideally, a professional glance. It also blocks play 3: you should not run paid traffic or a pixel without a privacy policy.
3. **Doc drift is real and I have corrected what I found:** CLAUDE.md said two email routes were off (all four are live); the workshop page says May; the roadmap said "Tuesday 12 August" (a Wednesday); CLAUDE.md counts 13 summer FAQs where the code has 12; and the "compliance scan" the project brief tells every session to run exists only as a manual checklist, not a script. Small individually. Together they are how a solo operation starts believing its own stale notes. The HQ dashboard's honesty rule is the right antidote; keep pointing at live sources.
4. **Real assets are stranded on unmerged branches.** The entire partnership process (skill, PMT dossier, draft outreach email, dated 13 July) sits on `claude/partnership-research-outreach-a4a4gy`, invisible to main and to your other sessions. A Vercel Web Analytics install was started on a branch in June and abandoned. Merge discipline is a growth issue when the assets are growth assets.
5. **Bus factor and hours.** You are an FY doctor. Every plan below is designed around approval-and-send rather than build, but section 9 still asks you for your honest weekly hours, because a plan you cannot staff is a plan to feel guilty about.

## 8. The growth plays, ranked

Ranked by revenue moved per unit of your time inside the actual calendar: cohort starts 25 July as published, results day Thursday 13 August, GCSE results Thursday 20 August, subject cohort Sunday 6 September (hard-coded into sequence email B3). No revenue predictions anywhere: each play states its mechanism, its execution path, what "working" looks like, and which of your numbers it needs.

### Play 1: The 12-day cohort sprint (do this one)

**What it is:** point everything you already have at filling the 25 July Summer Accelerator cohort, using only the two mechanisms that have ever worked for you: broadcast email to the warm list, and a live workshop with the proven follow-up arc.

**Why it is first:** it is the only play that can produce revenue this month. The assets exist (7 newsletter issues, 16 sequence emails, week-1 social posts with rendered graphics, a proven workshop format that registered 158 people in April from a smaller list). The list is warm (46 to 84 percent opens) and completely unworked for nine weeks. Every day of delay is a day of a 12-day window.

**The execution path:**

- **Monday 14 July, decisions (30 minutes, yours alone):**
  1. Confirm the cohort date. If 25 July is real, the sprint below stands. If you intend early August, change the page today and the sprint gains a week. Decide once, publish it, and do not move it again.
  2. Set the real capacity number you can teach well. It becomes the only scarcity claim we make, replacing the vague "limited spaces".
  3. Approve: SS1 for Sunday, the re-opening email, the workshop date, and the Monday fix list: the parent delivery email link, the /workshop page date plus re-linking it from the site, the Year 12 article's course CTA pointing at the sales page instead of the homepage, and one og:image so every shared link carries a card in WhatsApp, Facebook and LinkedIn.
- **Tuesday 15 July:** re-opening broadcast to the full student list. Personal, honest, in your voice: where you have been, what you built for them (diagnostic link), and the one date that matters (workshop announcement). Not a pitch email. This is the pattern your February and May sends already proved.
- **Wednesday 16 July:** parent-framed variant to the parent-heavy segments; posts begin from the already-written week-1 calendar (LinkedIn daily, Facebook page for parents).
- **Thursday 17 July:** workshop invitation broadcast. Free live session, evening of Tuesday 22 July (or Sunday 20, your rota decides): "The Year 12 Autopsy: what this year actually taught you, and the 6-week plan for the summer". The title and teaching spine already exist in your S1 sequence email. Registration through the existing MailerLite workshop mechanics.
- **Friday 18 to Sunday 20 July:** diagnostic push to the list (it feeds the live route automations, which are empty), SS1 goes out Sunday 5pm as drafted, reminder cadence for the workshop exactly as your May cycle ran it (you already have the templates; your 2-hour and 15-minute reminders hit 47 to 50 percent opens in May).
- **Tuesday 22 July:** the workshop. Teach generously for 45 minutes, then present the Summer Accelerator plainly: date, capacity, tiers, first-session risk-free, one Stripe link per tier.
- **Wednesday 23 to Friday 25 July:** the proven follow-up arc, cloned from your own May drafts: replay plus offer, parent summary (your May "Parent Summary" went to 403 people), final call at the honest deadline, which is simply the cohort starting.
- **Throughout:** log every send and click; I can pull per-email numbers from MailerLite after each send so the next decision is made on your data, not vibes.

**What "working" looks like:** checkouts on the four Stripe links before 25 July, measured in Stripe, reported by you or by connecting Stripe read-only to the dashboard. Secondary: workshop registrations versus your April benchmark of 158, and diagnostic completions from the list push. I will not predict any of these numbers, and you should distrust anyone who does.

**What it needs from you:** the three Monday decisions, roughly 2 to 4 focused hours across the week plus the workshop evening, and answers to asks 1 to 4 in section 9.

**Risks, honestly:** the window is short; your rota may not allow a live workshop, in which case run the same arc with a pre-recorded 20-minute "summer plan" video (weaker, still real); and if the list produces registrations but no purchases, that is the most valuable pricing data you have ever collected, and it feeds the September decisions.

### Play 2: The results-week machine (13 and 20 August)

**What it is:** own the two mornings when your entire market is emotionally activated, and convert that attention into the September pipeline (the 6 September subject cohort and the autumn Study System), because by results day the summer cohort is already in week 3.

**Why it matters:** results week is the one week the market comes to you. Your competitors fight it with static SEO guides (PMT, Save My Exams, MyTutor) and post-results courses (PMT, 18 to 25 August, £95 to £245). Nobody in the set has claimed the "results-day rescue" offer space, and nobody has a credible calm human face on the morning itself. A doctor telling students and parents "here is the triage, here is what actually matters in the next 48 hours" is content only you can make.

**The execution path:**

1. **Already drafted, needs approval only:** SS4 (9 Aug, the results-day playbook), SSX (Thursday 13 August 7am special), SS5 (16 Aug, results triage into the September cohort), SS6 (23 Aug). Your newsletter file also already contains the "drafted on the day, never pre-scheduled" rule for results-morning social posts. Approve the set in one sitting during the first week of August.
2. **Ship Results Day Rescue small by Tuesday 11 August:** one page plus one email capture plus one booked-call CTA beats a full tool you cannot finish. The roadmap already leans this way. Its job is to catch the "grades came in wrong" family and route them to a call.
3. **GCSE day, 20 August, is your acquisition day, not A-level day.** A-level results day serves your current list emotionally (their UCAS reality) but those students are mostly leaving the market. The parents of students getting GCSE results on 20 August are your next 12 months of buyers deciding how seriously to take A-levels. The parents guide, the diagnostic and the Facebook page point at exactly this moment (see play 3).
4. **The doctor-on-results-morning PR angle:** one page press pitch ("NHS doctor spends results morning triaging A-level students for free") to local press and 2 or 3 education podcasts in the last week of July. Zero cash, one hour to write, and it is the only route to authority links (section 5) that also produces immediate attention. Needs your sign-off and your story; I can draft the pitch.
5. **The r/A-levels moment:** your own platform playbook calls an early-August Reddit AMA the single highest-value Reddit move of the year, and you have real history there. Results week is the peak of that subreddit's year. Schedule it, answer honestly, no selling; the diagnostic link belongs in your profile, not the posts.
6. **Calendar the September flip for 25 July:** the summer sales page, the diagnostic's Year 12 routing and the summer sequence emails all assume a sellable summer cohort. The day the cohort starts they must pivot to the 6 and 9 September cohorts (waitlist banner, routing switch, sequence retarget). One session, booked now, so August traffic never lands on an offer that has already begun.

**What "working" looks like:** route-group joins and call bookings in the week of 13 to 27 August, September cohort checkouts, and (if the PR lands) referring domains moving off zero. All measurable in MailerLite, your calendar, Stripe and Ahrefs' free endpoint.

**What it needs from you:** approval of the drafted issues, a scope decision on Rescue, the AMA date, and the press pitch sign-off. Asks 5 and 6 in section 9.

### Play 3: Open the buyer channel (parents, Facebook, then paid)

**What it is:** make the parent side real: a warmed Facebook page, the parent calendar posts actually posting, instrumentation installed, then a small paid test with your budget, aimed at the 20 August GCSE-parent moment.

**Why:** your own strategy file says parents sign off the purchase, and the competitor sweep found the parent-Facebook lane empty across the whole set. Right now that lane is also empty on your side: new page, no verifiable posts, no pixel, no ads ever. This play compounds every other play because parent trust is the last mile of every purchase.

**The execution path (strictly in this order):**

1. Privacy policy and terms pages live first (section 7.2). No pixel and no paid traffic before this exists.
2. Instrument: Vercel Web Analytics (a branch already started this in June; do it properly on main) plus the Meta pixel. Half a day total, and it ends the era of having literally no idea what your traffic does.
3. Warm the page organically for two weeks with the parent-facing posts already written in the 30-day calendar (they exist through 8 August).
4. Then the paid test: your platform playbook already specifies the shape (UK parents 38 to 55, small daily budgets). The first paid objective should be the parents guide or the diagnostic, not the sales page: buy leads into the nurture machine you already built, and judge with your own numbers. Budget: your number, ask 7. I will not name one.
5. Retargeting and lookalikes only after the pixel has data and only if the first test's cost per lead (your data) justifies it.

**What "working" looks like:** Parent Leads group growth (currently 2), cost per lead from Ads Manager against the budget you set, and eventually call bookings attributed to parent traffic. Defined stop-loss: you set the spend cap before it starts.

**What it needs from you:** the legal pages decision, Facebook page admin access state, ask 6 and ask 7.

### Play 4: Partnerships and borrowed audiences (cheap now, pays in September)

**What it is:** send the PMT email that is already written, then run the same process on 2 or 3 more targets. Borrowed audiences are the only way to reach thousands of students before results day without paid spend or SEO authority.

**The execution path:** merge the partnership branch (the process and dossier are stranded and invisible on main); answer the dossier's six questions in the research file; verify the address as instructed; send Tuesday to Thursday morning with the LinkedIn note the same day; log the send; follow up once after 4 or 5 working days as drafted. Then pick the next two targets with the same skill. Honest guidance on selection: aim at audiences without a method product (the dossier's logic), such as med-application communities you already have history with (The Medic Life precedent), school sixth-form newsletters for September, and study-adjacent creators; avoid direct course competitors.

**Why it is ranked fourth despite being nearly free:** the September window (PMT's own rhythm, and school terms) means it feeds autumn, not the 25 July cohort. Send it this week anyway, because reply lead times are long and September inventory gets committed in July.

**What "working" looks like:** a reply and a 15-minute call. Then registrants from a co-promoted September series landing in your MailerLite with consent. All countable.

**What it needs from you:** answers to the six dossier questions (only you can), the send button, and ask 8 (your honest inventory of who you already know: the Medic Life relationship, PasTest contact, r/A-levels moderator relationships).

### Play 5: SEO: place it or park it (a decision, not a project)

**The fork, honestly:** the 22 written pieces produce nothing at DR 0, and nothing you do in the next four weeks changes an August SERP. So either:

- **Park it consciously until 1 September.** Zero effort now, no shame, revisit with autumn energy when the PR links from play 2 may have moved DR off zero. The articles keep earning their keep as email and social source material.
- **Or fund the missing final mile in September:** a target list of 20 to 30 UK education and parenting sites, 6 to 8 hours of outreach for the pack (or a reputable placement service, with the usual quality warnings), tracked in a simple log the repo currently lacks.

**My recommendation: park until September, with one exception:** if the results-week press pitch (play 2) lands anywhere, ask every journalist for the link. Editorial links from that moment are worth more than the entire twin pack.

**Explicitly not recommended right now (the "do not do" list):** starting TikTok or YouTube channel builds, any new tool beyond a small Results Day Rescue, more blog articles, UCAT products, dashboard features, or any refactor of things that work. Not because they are bad ideas. Because they are August-shaped costs with October-shaped payoffs, and your constraint is your own hours in the next six weeks.

## 9. The numbers and decisions I need from you

Ordered so one sitting clears the lot. Nothing above becomes a revenue claim until these arrive.

1. **The cohort truth:** does the Summer Accelerator start 25 July as the live page says, or early August as your brief says? And what is the honest capacity?
2. **Stripe:** sales to date on each of the four payment links since the page went live. Easiest permanent fix: create a read-only restricted Stripe key and put it in `dashboard/.env` as `STRIPE_KEY` per the dashboard README, and the HQ dashboard picks it up. Otherwise a screenshot of the payments list does fine.
3. **Sales history:** what did the 8 people in the "Buyers" group buy, at what price? What sold at the June-era "Series £119 / Accelerator £499" prices? Feb to May workshop attendance versus registration numbers if you have them. Total 2026 revenue to date by product, even roughly, from your own records.
4. **Your hours:** honest available hours per week, 14 July to 29 August, given the rota.
5. **Results Day Rescue scope:** one page plus call booking (recommended) or the fuller tool from the roadmap?
6. **Channel truth:** LinkedIn follower count, Facebook page state and admin access, whether the week-1 posts (10 to 16 July) have actually been posting, and any TikTok/YouTube/Reddit accounts you hold.
7. **Paid test budget:** the amount you are comfortable spending to test parent ads in August, if any. Zero is an acceptable answer and the plan degrades gracefully.
8. **Relationship inventory:** Medic Life, PasTest, r/A-levels contacts, and any teacher or school contacts for September.
9. **Compliance:** confirm whether you are ICO-registered, and whether you want the privacy/terms pages drafted for your review this week (recommended).

## 10. What is working and what is dead weight

**Working, keep and feed:** the warm list and its open rates; the live-workshop-plus-follow-up mechanic; the diagnostic (unique in the market, needs traffic); the tracker (29 users on zero promotion); the drafted email estate (16 sequence emails, 7 newsletter issues); the voice and honesty rules; the clean technical base; the HQ dashboard's no-invented-numbers rule; llms.txt and the AI-crawler posture.

**Dead weight or live liabilities, act on each:** the stale and orphaned /workshop page (fix the date and re-link it Monday); the parent delivery email pointing at the old Drive guide (fix Monday, copy is written); the homepage-pointing course CTA on every blog article (one default to change); the missing og:image site-wide; the doubled title suffixes and the US "Programs" spelling on the subject page (one hygiene pass); the never-sent Sunday Session against a live "one email a week" promise (send SS1 this Sunday or pull the promise); the public full-access MailerLite key (decision, fix after 25 July); the missing privacy/terms pages (this week); the unplaced backlink pack (park or fund in September); the two near-duplicate Lecture Series groups and the empty legacy Newsletter Signups group (merge and delete in a September hygiene pass); the empty superseded diagnostic automation shell (delete now, your own README says so); the 7 stale draft campaigns from May (archive); the UCAT group and automation (park or delete: it is off and has 2 members); the abandoned Vercel analytics branch (supersede by instrumenting properly in play 3); the two old workshop landing page branches and gh-pages (delete when convenient); the 30-day calendar's days 1 to 7 (superseded by week-1-optimized, keep days 8 to 32).

## 11. This week, if you take only one page from this document

Monday: make the three decisions (cohort date, capacity, approvals) and answer section 9. Tuesday: the re-opening email goes to 533 people. Thursday: the workshop invitation. Sunday: SS1 sends at 5pm. Tuesday 22nd: you teach. Wednesday to Friday: the follow-up arc you already proved in May. Everything else in this document is second to that sequence.

The uncomfortable summary you asked for: the business's biggest current risk is not competition, pricing, SEO or the algorithm. It is that its founder builds instead of asking for the sale, and the calendar you are in pays selling at a multiple of building for exactly the next six weeks. The machine is good. Turn it on.

---

## Appendix A: MailerLite broadcast history (sent campaigns, live account data, 13 July 2026)

| Date | Campaign | Sent to | Opens | Clicks |
| --- | --- | --- | --- | --- |
| 18 Feb | Free Workshop Follow up 2 | 203 | 50.7% | 3.9% |
| 19 Feb | Free Workshop Follow up 3 | 195 | 49.7% | 3.6% |
| 19 Feb | Copy of Free Workshop Follow up 4 | 290 | 52.4% | 2.4% |
| 20 Feb | Free Workshop Follow up 5 | 291 | 69.4% | 4.8% |
| 20 Feb | Free Workshop Follow up 6 | 286 | 72.4% | 18.5% |
| 20 Feb | Accelerator Workshop Follow up | 106 | 49.1% | 6.6% |
| 22 Feb | 12-Week Accelerator Follow Up | 281 | 55.9% | 3.2% |
| 4 Mar | Final Weekend Follow up 1 | 273 | 46.2% | 3.3% |
| 5 Mar | Final Weekend Follow up 2 (Video) | 270 | 47.8% | 3.3% |
| 1 May | Last call for workshop | 236 | 46.6% | 0.9% |
| 2 May | Follow up Workshop Email | 48 | 79.2% | 41.7% |
| 2 May | No Show Email | 362 | 48.6% | 9.7% |
| 3 May | Parent Summary | 403 | 59.3% | 6.2% |
| 4 May | Free Wednesday Workshop | 360 | 50.0% | 0.8% |
| 5 May | Follow up Workshop Wednesday | 406 | 52.2% | 3.9% |
| 6 May | 2 hour Reminder Workshop Wednesday | 402 | 47.0% | 2.0% |
| 6 May | 15 minute reminder | 402 | 49.5% | 3.7% |
| 6 May | Follow up Study Series Workshop | 26 | 84.6% | 19.2% |

Nothing has been sent since. Seven drafts from February and May remain in the account.

## Appendix B: Domain Rating comparison (Ahrefs free endpoint, 13 July 2026)

alevelaccelerators.com 0. senecalearning.com 69. physicsandmathstutor.com 63. savemyexams.com 63. snaprevise.co.uk 52. uplearn.co.uk 40. myedspace.co.uk 38. latimertuition.com 22. tailoredtutors.co.uk 18.

## Appendix C: Competitor snapshot (fetched 13 July 2026)

- **MyEdSpace:** live classes Years 5 to 13; "just under £5 per hour" framing, £10 ten-day trial; Summer School £20/£37/£49, first week of August, countdown live; "21,000+ families", 4.8 Trustpilot, 2,124 reviews; teacher-fronted TikToks dwarf the brand account.
- **Up Learn:** self-study A-level courses £319.99 to £419.99 per subject per year (or £74.99 to £99.99 monthly); "A*/A guaranteed, or your money back"; "97% achieve A*/A", "600+ schools"; 3-day free trial.
- **PMT:** the free-resource giant (their ad page claims 9.6m monthly page views); paid crash courses; summer refreshers £245 (3-day) and £95 (1-day), 18 to 25 August; results-day parent guide live; National Tutoring Awards 2025 winner.
- **Save My Exams:** subscription notes, free tier, prices in-app only; dedicated 2026 results-day content hub; Instagram 64k.
- **Seneca:** free platform, "14 million students"; premium priced in-app; £5.99/month guarantee add-on; huge school distribution.
- **SnapRevise:** subscriptions, "5M+ happy students and parents", "500+ five-star Google reviews"; shop rate-limited during checks.
- **Tailored Tutors:** £76/month all three sciences, minus 25% for 2027 exams; "2.7 average grade improvement", "700+ five-star reviews", "65,000+ students", "150 partner schools"; Instagram 864.
- **MyTutor:** 1:1 marketplace from £26/hr; "543,877 5-star reviews", "1500+ schools"; parent-facing results-day and clearing guides.
- **Justin Craig:** 40 years old; A-level 3-day courses £675 to £775; summer school £955 to £1,595; ~5 students per class.

Market patterns: August is already being sold to at both price extremes; results day is fought with content, no one has claimed a rescue offer; guarantees are normalised; every lead magnet is a trial or a library (no diagnostics); everyone proof-stacks and you display no numbers.

## Appendix D: Where every number in this document came from

MailerLite API (account 2113061), pulled 13 July 2026: subscriber total, all group counts, automation states, campaign statistics, newest-100 subscriber timeline. Live site fetches, 13 July: prices, cohort date, scarcity copy, workshop date, missing legal pages, absence of analytics scripts. Repo: offer stack and proof points (`.claude/skills/content-studio/references/audience-and-offers.md`), sequence and newsletter inventories (`content/`), roadmap, dashboard seeds, partnership branch. Ahrefs free endpoint, 13 July: all domain ratings. Competitor prices and claims: the URLs named inline, fetched 13 July. JCQ via web search: results dates (A-level Thursday 13 August, GCSE Thursday 20 August 2026). No other numbers exist in this document.
