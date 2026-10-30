# Billing, the join flow, and the Skool pricing question

Written 26 October 2026.

## 1. Skool's two plans: the honest difference

Skool's own pricing page lists the same features on both plans: unlimited members, courses, videos and live calls, a custom URL and affiliates. The difference is money only.

| | Hobby | Pro |
| --- | --- | --- |
| Skool's monthly charge | $9 | $99 |
| Fee Skool keeps on payments IT processes | 10% (plus about 30c a transaction) | 2.9% (plus about 30c) up to $899 a transaction, 3.9% above |
| Fee on payments taken outside Skool (your Stripe) | none | none |
| Break-even | cheaper below about $1,270 a month of Skool-billed revenue | cheaper above it |

Two facts that settle it for this launch:

1. **Skool bills members in US dollars only.** From Skool's help centre: "All subscription prices on Skool are in USD. Members pay in USD." Payouts to a UK bank arrive in pounds, but the parent's card is charged in dollars, so £100 shows as roughly $133 and £150 as roughly $200, both moving with the exchange rate, plus the bank's foreign transaction fee. For a UK parent that reads as odd and slightly more expensive every month.
2. **If Skool processed the payments, Pro would win almost immediately.** Ten founding members at about $133 is $1,330 a month, already past break-even; thirty is $4,000 a month, where Hobby's fee is $400 against Pro's $99 plus $116.

**Decision: bill through your own Stripe in pounds; run Skool as a private, approval-only group on Hobby at $9.** Skool's fee never applies, Hobby stays correct at any size, parents see £100 or £150 in pounds on a receipt from a company they can look up, refunds under the 7 day guarantee are one click in Stripe, and every enrolment lands in the HQ Sales panel the way the rest of the business already works. The cost is two clicks per new member (approve in Skool, add to MailerLite), which at 30 to 100 members is minutes a week.

If you ever prefer Skool's native billing (members never leave Skool, upgrades and cancellations are automatic), set two prices in dollars, $129 founding and $199 standard, switch to Pro the day the tenth member pays, and change `billing` in `lib/academy.ts` so the page says "billed in US dollars by Skool". Everything else in the pack still holds.

## 2. Stripe: 20 minutes, in this order

1. **Product:** "Top 1% Academy". Two recurring prices, monthly, GBP: **£100** (nickname "Founding, workshop cohort") and **£150** (nickname "Standard").
2. **Two payment links**, one per price. On each: collect the customer's name, email and phone number; add a custom field "Student's first name and year group" (so a parent paying shows which student to approve); terms of service acceptance ON pointing at https://alevelaccelerators.com/terms/; after payment, redirect to the Skool group URL (section 3 explains why). Description on the checkout page, both links: "Top 1% Academy: weekly live coaching on how to study, with Dr Waleed. Two live sessions a week on Zoom, every one recorded. Monthly, cancel any time. 7 day money-back guarantee."
3. **Paste the two links** into `lib/academy.ts` (`stripeFoundingUrl`, `stripeStandardUrl`) and have a session deploy the page. The page shows the founding price until the deadline passes, then the standard one.
4. **Customer portal ON** (Settings, Billing, Customer portal) so a member can cancel from the link in their receipt without emailing you. Allow cancellation at period end; no plan switching.
5. **Email receipts ON**, and your own notification for successful payments ON, because that email is your cue to approve the member (section 3).
6. **Wednesday 11 November, 11:59pm:** deactivate the £100 payment link in Stripe (Payment links, the link, Deactivate). The page flips to £150 on its own from `foundingDeadlineISO`. Existing founding members keep £100 for as long as they stay: Stripe never changes a live subscription's price unless you do.

## 3. The join flow, member by member

1. Student (or parent) pays on the page. Stripe charges £100, emails them a receipt, emails you "Payment of £100.00 from ...", and sends them on to the Skool group page.
2. They press "Request to join" on Skool and answer the three questions, the first being the email they paid with.
3. You (morning or evening): match the Skool request to the Stripe payment, **approve** in Skool, and **add the email to the MailerLite group "Top 1% Academy members"**, which fires the welcome email (`content/email-sequences/top-1-academy/00-welcome.md`: the Zoom links, the first session, the first three jobs). Record the enrolment in the HQ Sales panel (name, Top 1% Academy, £100 or £150, per month) so MRR is real.
4. A paid member who hasn't requested access by the next morning gets a one-line personal email from you with the Skool link.

**Refund under the guarantee (within 7 days):** Stripe, the payment, Refund, then Cancel the subscription immediately; remove the member from Skool; mark the enrolment stopped in the HQ panel. Reply to their email the same day, warmly, and ask the one question: what would have made it right?

**Cancellation later:** they cancel via the portal or email you; the subscription ends at period end; on that date remove them from Skool and mark the enrolment stopped. Leavers get a goodbye and a request for one line on what the Academy did for them.

## 4. Mapping for the automation later

Every step above is manual on purpose for the first cohort: the volume is small and you see every member arrive. When it grows, a Stripe webhook (Zapier or Make: "new paying customer" to "add MailerLite subscriber to group") removes the MailerLite click, and Skool's own Zapier app can auto-approve a request whose email matches. Not before the first thirty.

## 5. The page

`alevelaccelerators.com/top-1-academy/` (short link `/academy`) is the sales page: standalone like the workshop page, no site navigation, the schedule, the two prices with the live deadline, the guarantee, who it's for, the comparison to one subject tutor, proof, FAQ, and the Join button to the Stripe link. Every value is in `lib/academy.ts`. The page goes live on your go once the two Stripe links and the Skool URL are pasted in; until then the button reads "Founding places open after Saturday's workshop".
