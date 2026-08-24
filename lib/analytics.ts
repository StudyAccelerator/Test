/* One place to fire a lead conversion into the Meta Pixel and Google Analytics
   when someone completes a signup anywhere on the site. Both calls are safe
   no-ops until their IDs are set (dormant pixel / GA), so calling this never
   errors when analytics is off. The diagnostic and parents forms fire these
   two events inline already; the tracker and newsletter forms call trackLead()
   so every capture point on the site reports a conversion. */
type TrackFn = (...args: unknown[]) => void

/* Funnel steps for the revision diagnostic (24 August 2026). The site only
   ever reported the finished conversion, so a visitor who answered all 20
   questions and then refused the gate looked identical to one who bounced on
   arrival. These name each step in between, so GA4 can draw the drop-off.
   No new packages, no new tracking of individuals: the same gtag that is
   already on the page, with an event name and a couple of plain parameters.
   Safe no-op when GA is absent or blocked. */
export type FunnelStep =
  | 'diagnostic_start'
  | 'diagnostic_halfway'
  | 'diagnostic_questions_done'
  | 'diagnostic_report_viewed'
  | 'diagnostic_route_click'
  | 'diagnostic_callback_request'

export function trackFunnel(step: FunnelStep, params: Record<string, string | number> = {}): void {
  if (typeof window === 'undefined') return
  const w = window as typeof window & { gtag?: TrackFn }
  w.gtag?.('event', step, params)
}

export function trackLead(): void {
  if (typeof window === 'undefined') return
  const w = window as typeof window & { fbq?: TrackFn; gtag?: TrackFn }
  w.fbq?.('track', 'Lead')
  w.gtag?.('event', 'generate_lead')
}
