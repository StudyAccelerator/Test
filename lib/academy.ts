/*
 * Top 1% Academy: the weekly group coaching programme (Waleed's decisions,
 * 23 to 25 October 2026). Every price, date, label and link the sales page
 * at /top-1-academy/ needs lives HERE, so a price change or a new cohort is a
 * one-file edit.
 *
 * Three values are Waleed's to paste in once they exist (the page copes
 * while they are empty: the Join button becomes a "places open after the
 * workshop" note and nothing links to a dead URL):
 *   stripeFoundingUrl  Stripe payment link, £100 a month (founding cohort)
 *   stripeStandardUrl  Stripe payment link, £150 a month
 *   skoolUrl           the Skool group, where paid members request access
 *
 * Billing is in pounds through Waleed's own Stripe, not through Skool,
 * because Skool charges members in US dollars only (its help centre:
 * "All subscription prices on Skool are in USD"). Rationale and the join
 * flow: content/skool/top-1-academy/04-billing-and-join-flow.md.
 */

export const ACADEMY = {
  name: 'Top 1% Academy',
  tagline: 'Weekly live coaching on how to study, with Dr Waleed',

  foundingPrice: 100,
  standardPrice: 150,
  /* The founding price runs for one week after the 31 October workshop
     (Waleed, 30 October): end of Saturday 7 November, UK time (GMT). After
     this instant the page shows the standard price and link. Sessions moved
     the same day to Wednesday 7pm to 9pm and Sunday 10am to 12pm, first
     session Wednesday 11 November (he is on nights the weekend of 7 and 8). */
  foundingDeadlineISO: '2026-11-07T23:59:59+00:00',
  foundingDeadlineLabel: 'Saturday 7 November at 11:59pm',

  firstSessionLabel: 'Wednesday 11 November',
  firstClinicLabel: 'Sunday 15 November',

  sessions: [
    {
      day: 'Wednesday',
      time: '7pm to 9pm',
      name: 'Teaching + Hot Seat',
      body:
        'Hour one, Dr Waleed teaches one part of the study system properly, with a worked example from a real subject. Hour two is the Hot Seat: you bring your specific problem and it gets fixed live.',
    },
    {
      day: 'Sunday',
      time: '10am to 12pm',
      name: 'The Marks Clinic',
      body:
        'Bring your paper. Upload a piece of real marked work by Saturday evening, a timed paper, an essay, a week plan, and Dr Waleed goes through it on screen. Everyone learns from every paper.',
    },
  ],

  guaranteeDays: 7,
  /* Waleed's second guarantee for the founding cohort (30 October 2026),
     in his words. Terms beyond this line are his to define. */
  gradeGuarantee:
    'Founding members also get the grade guarantee: work with Dr Waleed for six months, and if you do not get the grades you need for your university offer, he keeps working with you for free until you do.',
  contactEmail: 'waleed@alevelaccelerators.com',

  /* Waleed pastes these in. Empty is handled by the page. */
  stripeFoundingUrl: '',
  stripeStandardUrl: '',
  skoolUrl: '',
} as const

/* True while the founding price is still open. Evaluated in the browser by
   the join card (the site is a static export, so a build-time check would
   freeze). */
export function foundingOpen(now: Date = new Date()): boolean {
  return now.getTime() < Date.parse(ACADEMY.foundingDeadlineISO)
}
