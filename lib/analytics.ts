/* One place to fire a lead conversion into the Meta Pixel and Google Analytics
   when someone completes a signup anywhere on the site. Both calls are safe
   no-ops until their IDs are set (dormant pixel / GA), so calling this never
   errors when analytics is off. The diagnostic and parents forms fire these
   two events inline already; the tracker, newsletter and workshop forms call
   trackLead() so every capture point on the site reports a conversion. */
type TrackFn = (...args: unknown[]) => void

export function trackLead(): void {
  if (typeof window === 'undefined') return
  const w = window as typeof window & { fbq?: TrackFn; gtag?: TrackFn }
  w.fbq?.('track', 'Lead')
  w.gtag?.('event', 'generate_lead')
}
