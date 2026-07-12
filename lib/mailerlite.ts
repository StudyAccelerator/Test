/*
 * MailerLite client-side integration for the Revision Diagnostic and the
 * Sunday Session newsletter signup. Same direct-API approach as the revision
 * tracker and parents form. The diag_* custom fields and both groups already
 * exist in the account.
 */

const ML_API_KEY =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiYjUzMWQ4MTgyNzM5NmM3MTViZDVjN2ZhZDY5ZTYxMjNiYzZjMTViNjM1Y2Q3YjkwODI4YWY1YjlmMzgwYjE4Yjg5MmQ0N2FmM2M3YTM0ZWYiLCJpYXQiOjE3Nzg1MTIzODEuMjUwMjI2LCJuYmYiOjE3Nzg1MTIzODEuMjUwMjI5LCJleHAiOjQ5MzQxODU5ODEuMjQ2MjY1LCJzdWIiOiIyMTMxNzg2Iiwic2NvcGVzIjpbXX0.QQkqYoMhCzwoGI4g3LfZWhiGWZ_dWxGfQOrNfebTqL4R7OKHgpaEduW-J9AAdhWo2_bsRpKvi6NnVJA_rdeTPQUBnCmmXcvzahU4bVx7_Ulff0Ld_8_8a5boETdU3UrKTWMCjdXQkmpJ-1TiM5_Mi4iLOpB0vvPvG_U3Cya_ORnGsTSyDv5qQ7MQHqjytbaZ0R_aRWDA1-emMFymr2dXOv-iOW1Dly1dflxrIo6Yb0BPA-v6Chs4TjlHdEvwFvSRgzZAATN9dDSjGENQbhQIFmuUGQ00HiP1xsmS6qKaCU__iARC8z91GZyrbcf0m9ryHNhkScckYMoGu1sYIC9Hm2Wj_BKpI970L0-CAT5dDpolTbTd8absVHR3UOxuiWZSEHVcumvtPsZ6K5GP0zQ_ccFlMaqLrPs7o80wy9DWt97fDZ8_KuScHY20zKSG-beSojlzuUXXj4rpH33-9PeJ4puXIMirOWzsKJIaEEckRDumvyhawrliPhHMwelKhgpCxMZlA_Bc3-nwZMDiEZf_CtXgXOkzUSkJohkboZBELdeLOrv83EPRhpHXahEyZkOhURucBLtb5Fs0lFIkLKeI-RXAz_7TPByqlHkcxZV8xObgZpqtCGVd1q8oI2pwrD7D85H4i5wP70q-Lsv8BZl_G8RTosjdYckZn0nXlOTjehM'

/* "Revision Diagnostic" group, created 11 July 2026 */
const DIAG_GROUP_ID = '192687508025247162'

export interface DiagnosticSubscriber {
  email: string
  name: string
  yearGroup: string
  subjects: string
  worrySubject: string
  currentGrade: string
  targetGrade: string
  hoursPerWeek: string
  lowYieldHours: string
  archetype: string
  bottleneck: string
  scores: string
  route: string
}

export type SubscribeResult = 'ok' | 'invalid-email' | 'network-error'

export async function subscribeDiagnostic(sub: DiagnosticSubscriber): Promise<SubscribeResult> {
  try {
    const res = await fetch('https://connect.mailerlite.com/api/subscribers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${ML_API_KEY}`,
      },
      body: JSON.stringify({
        email: sub.email,
        fields: {
          name: sub.name,
          year_group: sub.yearGroup,
          subjects: sub.subjects,
          diag_worry_subject: sub.worrySubject,
          diag_current_grade: sub.currentGrade,
          diag_target_grade: sub.targetGrade,
          diag_hours_per_week: sub.hoursPerWeek,
          diag_low_yield_hours: sub.lowYieldHours,
          diag_archetype: sub.archetype,
          diag_bottleneck: sub.bottleneck,
          diag_scores: sub.scores,
          diag_route: sub.route,
          diag_date: new Date().toISOString().slice(0, 10),
        },
        groups: [DIAG_GROUP_ID],
      }),
    })
    if (res.ok) return 'ok'
    if (res.status === 422) return 'invalid-email'
    console.error('[diagnostic] MailerLite error:', res.status, await res.text())
    return 'network-error'
  } catch (err) {
    console.error('[diagnostic] MailerLite fetch failed:', err)
    return 'network-error'
  }
}

/* "Sunday Session" group, created 12 July 2026: the weekly newsletter send list */
const NEWSLETTER_GROUP_ID = '192801700892903405'

export async function subscribeNewsletter(email: string, name: string): Promise<SubscribeResult> {
  try {
    const res = await fetch('https://connect.mailerlite.com/api/subscribers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${ML_API_KEY}`,
      },
      body: JSON.stringify({
        email,
        fields: { name },
        groups: [NEWSLETTER_GROUP_ID],
      }),
    })
    if (res.ok) return 'ok'
    if (res.status === 422) return 'invalid-email'
    console.error('[newsletter] MailerLite error:', res.status, await res.text())
    return 'network-error'
  } catch (err) {
    console.error('[newsletter] MailerLite fetch failed:', err)
    return 'network-error'
  }
}
