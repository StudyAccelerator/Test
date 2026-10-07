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
  | 'diagnostic_gate_step2'
  | 'diagnostic_start'
  | 'diagnostic_halfway'
  | 'diagnostic_questions_done'
  | 'diagnostic_report_viewed'
  | 'diagnostic_route_click'
  | 'diagnostic_callback_request'

export function trackFunnel(step: FunnelStep, params: Record<string, string | number> = {}): void {
  if (typeof window === 'undefined') return
  const w = window as typeof window & { gtag?: TrackFn }
  /* variant: 'direct' when the visitor landed straight on question one
     (?start=1, the paid-traffic A/B of 13 September 2026), 'landing'
     otherwise. Register it as a custom dimension in GA4 to break the
     funnel down by it. */
  let variant = 'landing'
  /* hero: which mini-landing headline a direct visitor saw (?h=medic etc,
     round 4 angle test, 2 October 2026); 'default' when none was asked for. */
  let hero = 'default'
  try {
    const qs = new URLSearchParams(window.location.search)
    if (qs.get('start') === '1') variant = 'direct'
    hero = qs.get('h') || 'default'
  } catch {}
  w.gtag?.('event', step, { variant, hero, ...params })
}

export function trackLead(): void {
  if (typeof window === 'undefined') return
  const w = window as typeof window & { fbq?: TrackFn; gtag?: TrackFn }
  w.fbq?.('track', 'Lead')
  w.gtag?.('event', 'generate_lead')
}

/* Where the lead came from (3 October 2026, Waleed's ask: the phone push must
   say which ad a lead came from). Read once per visit from the URL and the
   referrer, kept in localStorage so a visitor who answers the 20 questions
   over two sittings still carries their first ad into the gate. A later visit
   that arrives with its own utm tags or an ad click id overwrites it (last
   paid touch wins); a plain revisit keeps what was stored. Nothing here
   identifies a person: it is the ad's own labels. */
export interface Attribution {
  /* "facebook / paid-social", "facebook (click id, no utm)", "google / organic",
     "referral: example.com" or "direct" */
  source: string
  campaign: string
  ad: string
  /* Referrer host plus the landing flags that matter to the ad test */
  referrer: string
}

const ATTRIBUTION_KEY = 'ala-attribution-v1'

export function captureAttribution(): void {
  if (typeof window === 'undefined') return
  try {
    const qs = new URLSearchParams(window.location.search)
    const utmSource = qs.get('utm_source') || ''
    const utmMedium = qs.get('utm_medium') || ''
    const campaign = qs.get('utm_campaign') || ''
    const ad = [qs.get('utm_content') || '', qs.get('utm_term') || ''].filter(Boolean).join(' / ')
    const fbclid = qs.has('fbclid')
    const gclid = qs.has('gclid')
    let refHost = ''
    try {
      refHost = document.referrer ? new URL(document.referrer).hostname.replace(/^www\./, '') : ''
    } catch {}
    const paidTouch = Boolean(utmSource || utmMedium || campaign || ad || fbclid || gclid)
    const existing = localStorage.getItem(ATTRIBUTION_KEY)
    if (existing && !paidTouch) return
    let source = 'direct'
    if (utmSource || utmMedium) source = `${utmSource || '?'} / ${utmMedium || '?'}`
    else if (fbclid) source = 'facebook (click id, no utm)'
    else if (gclid) source = 'google ads (click id, no utm)'
    else if (refHost) source = `referral: ${refHost}`
    const flags = []
    if (refHost) flags.push(refHost)
    if (qs.get('start') === '1') flags.push('start=1')
    if (qs.get('h')) flags.push(`h=${qs.get('h')}`)
    if (qs.get('for')) flags.push(`for=${qs.get('for')}`)
    const a: Attribution = { source, campaign, ad, referrer: flags.join('; ') }
    localStorage.setItem(ATTRIBUTION_KEY, JSON.stringify(a))
  } catch {}
}

export function getAttribution(): Attribution {
  const empty: Attribution = { source: '', campaign: '', ad: '', referrer: '' }
  if (typeof window === 'undefined') return empty
  try {
    const raw = localStorage.getItem(ATTRIBUTION_KEY)
    if (!raw) return empty
    const a = JSON.parse(raw)
    return {
      source: String(a.source || ''),
      campaign: String(a.campaign || ''),
      ad: String(a.ad || ''),
      referrer: String(a.referrer || ''),
    }
  } catch {
    return empty
  }
}

/* Qualified-lead signal for Meta (7 October 2026, Waleed's call). Meta's
   delivery model learns from whoever fires the event an ad set optimises
   for, and until this date every gate submission fired the standard Lead
   event, so a Year 9 parent taught it as much as a Year 13 parent (28% of
   round 4's leads were pre-A-level). Now the standard Lead fires only for
   Year 12, Year 13 and resit takers, the ones his method and proof are built
   for, and everyone else fires the custom event PreALevelLead so they are
   still counted and still called. Nothing about the page, the questions,
   the report or MailerLite changes; only what Meta is told to chase. GA4
   keeps one generate_lead for all, flagged with `qualified` and the year.
   Ads Manager's Results column counts only qualified leads from this date,
   so its cost per result reads higher than before for the same spend. */
export const QUALIFIED_YEAR_IDS = ['y12', 'y13', 'resit']

export function isQualifiedLead(yearId: string | undefined): boolean {
  return QUALIFIED_YEAR_IDS.includes(String(yearId || ''))
}

export function trackDiagnosticLead(yearId: string | undefined, yearGroup: string): void {
  if (typeof window === 'undefined') return
  const w = window as typeof window & { fbq?: TrackFn; gtag?: TrackFn }
  const qualified = isQualifiedLead(yearId)
  if (qualified) w.fbq?.('track', 'Lead', { content_category: yearGroup })
  else w.fbq?.('trackCustom', 'PreALevelLead', { content_category: yearGroup })
  w.gtag?.('event', 'generate_lead', { qualified: qualified ? 'yes' : 'no', year_group: yearGroup })
}
