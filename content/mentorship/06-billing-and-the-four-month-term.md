# Charging the mentorship: Stripe, and how the four-month minimum actually works

*Written 11 September 2026, for the first mentorship parent. Answers the question "where is the minimum term setting in Stripe", which has a short answer: there isn't one, and there never will be.*

## Why there is no setting

A Stripe subscription is cancel-anytime by design, so a Payment Link has no minimum-term field. A minimum term is a contract term, not a billing feature. That means you get it from one of three places, and you should know which one you are relying on.

| | How it binds | What it costs you |
|---|---|---|
| 1. Structural | The four months are already paid, so there is nothing to enforce | A £1,200 payment at checkout, which is untested at this business |
| 2. Contractual (recommended) | The parent ticks a box agreeing to the four-month term before paying, and cannot cancel without emailing you | Ten minutes of settings, once |
| 3. Skin in the game | A non-refundable enrolment item on the first payment | Raises the entry price, complicates the offer |

## What I recommend: option 2, plus option 1 offered as a choice

On the call, give the parent both:

- **£300 a month, four-month minimum.** The default, and what most will take.
- **£1,200 for the four months upfront**, framed as paying the term in one go the way schools bill. Offer it plainly, with no discount needed, though £1,140 is a reasonable nudge if you want one. The audit's calibration matters here: every payment this business has ever taken sits between £189 and £479, so £1,200 at checkout is genuinely untested. Offer it, do not lead with it.

If the parent picks upfront, create a second Payment Link as a one-off £1,200 product and you are done: no term to enforce, no settings, no admin. Everything below is for the monthly option.

## The three settings that make the monthly option bind

Ten minutes in the Stripe dashboard. You do not need to recreate the subscription link you already made; all three of these can be added to it or applied account-wide. Stripe moves labels around, so the names below are what to look for rather than an exact path.

**1. Point Stripe at your terms, and make the parent tick the box.**
In Settings, under your business or branding details, there are fields for a Terms of service URL and a Privacy policy URL. Put `https://alevelaccelerators.com/terms/` and `https://alevelaccelerators.com/privacy/` in them. Then edit your payment link and turn on the option to require customers to accept your terms of service. The parent now ticks a box agreeing to the four-month term before they can pay, and Stripe records that acceptance against the checkout session, with a timestamp. That record is the thing that makes the term real.

**2. Turn off self-serve cancellation.**
In Settings, Billing, Customer portal, there is a Cancellations section. Turn off the option that lets customers cancel their own subscriptions. A parent who wants to stop now has to email you, which is exactly the conversation you want: the difference between a silent cancel in month three and a call where you open the scorecard and show them the line going up. Leave invoice history and payment method updates switched on, so they can still fix an expired card themselves.

**3. Fix the terms page, because right now it contradicts you.**
Clause 5.3 of your live terms says "To cancel at any time, contact us by email." If you point the Stripe checkbox at that page today, the parent is formally agreeing that they can leave whenever they like. I have written the missing clauses and they are on this branch, unmerged:

- **4.4** explains that some programmes are monthly subscriptions, and that payment repeats automatically.
- **4.5** states the Top 1% Mentorship has a minimum term of four monthly payments, and says why in your own reasoning: four months is the shortest period over which a change in how a student studies reliably shows up in their marks.
- **5.4** protects the risk-free first session. Walk away within 48 hours of session one and you get a full refund and the minimum term does not apply.
- **5.5** commits them to the four payments after that, with a genuine-reason escape hatch (illness, money, a change at school) because a clause with no human exit is both unfair and unenforceable.
- **5.6** gives one month's notice to leave after the minimum term.

Read those and approve them before the branch merges. They are the only site change in this work, and they are what the Stripe checkbox points at.

## The one risk, said once

No payment provider can force a card payment. If a parent cancels the card or calls their bank, the money stops, and chasing a family for a disputed £300 would cost you more in reputation than the payment is worth. A minimum term holds up if it was clearly disclosed before payment and is fair, and the statutory 14-day cancellation right sits on top of it regardless of what your terms say.

So treat the four months as a commitment device at the moment of signing, not as a fence you would ever defend. It works because a parent who has consciously agreed to four months turns up differently in month three, not because you could sue. The real retention machinery is the programme itself: the monthly review page and the monthly parent update are what stop anyone wanting to leave. That is the last time I will raise this.

## Set up so you never chase anyone

Turn these on once and the monthly admin is reading a notification.

- **Customer emails** (Settings, Business, Customer emails): send emails for successful payments and refunds. The parent gets a receipt every month without you touching anything.
- **Failed payment handling** (Settings, Billing, Subscriptions and emails): switch on automatic retries, the emails to the customer when a payment fails, and the reminder when a card is about to expire. Stripe retries a failed card over about two weeks, emails the parent each time, and only tells you if it finally gives up. That is the entire chasing problem solved.
- **Custom field on the payment link:** add one for the student's first and last name. The parent's name is on the card, the student's is not, and you want the Stripe customer to map to a student in the Lead CRM.
- **After payment:** set the confirmation to a short thank-you message that says the welcome email with the five pre-session steps is coming today, then send it (template in file 03).

## Card or Bacs Direct Debit

Both, eventually. For this parent, card.

| | Fee on £300 | Speed | How it feels |
|---|---|---|---|
| UK card | about £4.70 | Instant | A payment |
| Bacs Direct Debit | about £3.20, capped at £4 | Mandate takes a few working days, each payment about three working days to clear | A commitment, which helps |

Bacs needs activating on the account and cannot be set up same day, so if this student starts next week, take the card now. Add Bacs as a second payment method on the link for the next parent, and mention it to this one at month two if they would prefer it.

Either way the fee is under two percent, against monthly bank-transfer reconciliation you would be doing by hand forever. Your personal account was the wrong answer for a second reason too: business income should not run through it, and the Monzo business account is already wired into the HQ.

## What to send the parent

Subject: Your place on the Top 1% Mentorship

Hi {name},

I hope you're well! Really glad to have {child} on board, and thank you for the conversation earlier.

Here's the link to get everything set up: {payment link}

It's £300 a month. The first session is risk-free, so if you tell me within 48 hours of it that it isn't right for {child}, I refund you in full and we stop there, no questions asked. After that I ask families to commit to four months, because four months is genuinely the shortest run over which a change in how a student studies shows up in their marks, and I would rather say that plainly than take a payment for a month that can't do the job on its own. After those four months it's month to month, and you can stop whenever with a month's notice.

If you'd rather pay the four months in one go instead, just say and I'll send you that link.

Once you're set up I'll email {child} directly with the five things I need before our first session, and I'll email you at the end of every month with a short update on what actually changed, with the numbers behind it.

Any questions at all, just reply to this.

Best wishes,

Waleed

PS: I'm a full time doctor, so if a reply takes a day or two it's a night shift rather than anything else. I do always reply.

## When Skool arrives

Skool bills its own members, so new students would pay through Skool and the group fee replaces this setup. Leave anyone already on Stripe where they are: moving a paying parent's billing is a cancellation conversation you do not need to have. Run both until the Stripe cohort naturally ends.
