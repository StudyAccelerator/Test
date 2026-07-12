/* Canvas renderer for the downloadable plan image: A4 landscape at 150 dpi,
   styled to the brand so the wall copy looks like the site. Greyscale safe:
   every session block carries its technique label as text and a distinct
   left-edge treatment (solid, dashed, dotted). */

import type { PlanResult, PlacedEvent } from '@/lib/tracker/engine'
import { subjectDotMap, toHHMM, type TrackerForm } from '@/lib/tracker/form'
import { TECHNIQUES, type SessionType } from '@/lib/tracker/techniques'

const DAY_LABELS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']

const isSession = (kind: PlacedEvent['kind']): kind is SessionType =>
  kind === 'blurt' || kind === 'recall' || kind === 'review' || kind === 'paper'

function loadLogo(): Promise<HTMLImageElement | null> {
  return new Promise((resolve) => {
    const img = new Image()
    const done = (ok: boolean) => resolve(ok ? img : null)
    const timer = setTimeout(() => done(false), 1500)
    img.onload = () => {
      clearTimeout(timer)
      done(true)
    }
    img.onerror = () => {
      clearTimeout(timer)
      done(false)
    }
    img.src = '/logo-mark.png'
  })
}

export async function renderPlanImage(plan: PlanResult, form: TrackerForm, diagnosis: string): Promise<string> {
  const W = 1754
  const H = 1240
  const MG = 40
  const cv = document.createElement('canvas')
  cv.width = W
  cv.height = H
  const c = cv.getContext('2d')!

  const logo = await loadLogo()

  // ground
  c.fillStyle = '#FBF8F3'
  c.fillRect(0, 0, W, H)
  c.fillStyle = '#C9A96E'
  c.fillRect(0, 0, W, 6)

  // header
  const name = form.name.trim()
  c.fillStyle = '#2E2557'
  c.font = 'bold 34px Georgia, serif'
  c.textAlign = 'left'
  c.fillText(`${name ? name + "'s" : 'My'} Revision Week`, MG, MG + 34)
  c.font = '15px Arial, sans-serif'
  c.fillStyle = 'rgba(26,21,53,0.65)'
  const totalH = Math.round(plan.usedStudyMins / 30) / 2
  const summary = `${plan.sessionCount} session${plan.sessionCount === 1 ? '' : 's'} · ${totalH} hour${totalH === 1 ? '' : 's'} of focused study · weakest topics first · every break protected`
  c.fillText(summary, MG, MG + 62)
  c.font = 'italic 15px Georgia, serif'
  c.fillStyle = '#2E2557'
  let diag = diagnosis
  while (c.measureText(diag).width > W - 2 * MG - 320 && diag.length > 10) diag = diag.slice(0, -1)
  if (diag !== diagnosis) diag = diag.slice(0, -1) + '…'
  c.fillText(diag, MG, MG + 88)
  if (logo) {
    const lw = 260
    const lh = (logo.height / logo.width) * lw
    c.drawImage(logo, W - MG - lw, MG - 4, lw, lh)
  } else {
    c.font = 'bold 18px Georgia, serif'
    c.fillStyle = '#2E2557'
    c.textAlign = 'right'
    c.fillText('A-LEVEL ACCELERATORS', W - MG, MG + 24)
    c.textAlign = 'left'
  }

  // timeline geometry
  const GRID_TOP = MG + 118
  const HDR_H = 30
  const LEG_H = 96
  const AXIS_W = 52
  const GRID_LEFT = MG + AXIS_W
  const GRID_H = H - GRID_TOP - HDR_H - LEG_H - MG
  const COL_W = Math.floor((W - 2 * MG - AXIS_W) / 7)

  const allEvents = plan.days.flatMap((d) => d.events)
  const drawable = allEvents.filter((e) => e.kind !== 'free')
  const start = Math.min(...drawable.map((e) => e.startMin), 8 * 60)
  const end = Math.max(...drawable.map((e) => e.endMin), start + 6 * 60)
  const PPM = GRID_H / (end - start)

  // day headers + column grounds
  plan.days.forEach((day, i) => {
    const x = GRID_LEFT + i * COL_W
    c.fillStyle = '#2E2557'
    c.fillRect(x, GRID_TOP, COL_W - 3, HDR_H)
    c.fillStyle = '#F3EBD8'
    c.font = 'bold 13px Georgia, serif'
    c.textAlign = 'center'
    c.fillText(DAY_LABELS[i], x + COL_W / 2, GRID_TOP + 20)
    c.fillStyle = '#FFFFFF'
    c.fillRect(x, GRID_TOP + HDR_H, COL_W - 3, GRID_H)
  })

  // hour lines + labels
  c.textAlign = 'right'
  for (let h = Math.ceil(start / 60); h <= Math.floor(end / 60); h++) {
    const y = GRID_TOP + HDR_H + Math.round((h * 60 - start) * PPM)
    c.strokeStyle = 'rgba(46,37,87,0.08)'
    c.lineWidth = 1
    c.beginPath()
    c.moveTo(GRID_LEFT, y)
    c.lineTo(GRID_LEFT + 7 * COL_W - 3, y)
    c.stroke()
    c.fillStyle = 'rgba(26,21,53,0.45)'
    c.font = '11px Arial, sans-serif'
    c.fillText(`${String(((h % 24) + 24) % 24).padStart(2, '0')}:00`, GRID_LEFT - 6, y + 4)
  }

  const dots = subjectDotMap(plan.scheduled.map((t) => t.subject))

  // events
  plan.days.forEach((day, i) => {
    const x = GRID_LEFT + i * COL_W
    for (const ev of day.events) {
      if (ev.kind === 'free') continue
      const top = GRID_TOP + HDR_H + Math.round((ev.startMin - start) * PPM)
      const ht = Math.max(14, Math.round((ev.endMin - ev.startMin) * PPM))
      if (isSession(ev.kind)) {
        const tech = TECHNIQUES[ev.kind]
        c.fillStyle = tech.bg
        c.fillRect(x + 2, top, COL_W - 7, ht)
        // greyscale-safe edge
        c.strokeStyle = '#FFFFFF'
        c.lineWidth = 3
        c.setLineDash(tech.edge === 'dashed' ? [6, 4] : tech.edge === 'dotted' ? [2, 4] : tech.edge === 'double' ? [12, 3] : [])
        c.beginPath()
        c.moveTo(x + 4, top + 2)
        c.lineTo(x + 4, top + ht - 2)
        c.stroke()
        c.setLineDash([])
        // subject dot
        c.fillStyle = dots.get(ev.subject || '') || '#fff'
        c.beginPath()
        c.arc(x + 16, top + 12, 4, 0, Math.PI * 2)
        c.fill()
        // labels: technique + subject always
        c.fillStyle = tech.fg
        c.font = 'bold 12px Arial, sans-serif'
        c.textAlign = 'left'
        const maxW = COL_W - 34
        let label = `${tech.shortLabel}: ${ev.subject || ''}`
        while (c.measureText(label).width > maxW && label.length > 3) label = label.slice(0, -1)
        c.fillText(label, x + 26, top + 16)
        if (ht >= 34 && ev.topic) {
          c.font = '11px Arial, sans-serif'
          c.globalAlpha = 0.85
          let topic = ev.topic
          while (c.measureText(topic).width > maxW + 14 && topic.length > 3) topic = topic.slice(0, -1)
          c.fillText(topic, x + 12, top + 32)
          c.globalAlpha = 1
        }
        if (ht >= 50) {
          c.font = '10px Arial, sans-serif'
          c.globalAlpha = 0.7
          c.fillText(`${toHHMM(ev.startMin)} to ${toHHMM(ev.endMin)}`, x + 12, top + ht - 8)
          c.globalAlpha = 1
        }
      } else if (ev.kind === 'freestyle') {
        c.fillStyle = 'rgba(46,37,87,0.05)'
        c.fillRect(x + 2, top, COL_W - 7, ht)
        c.strokeStyle = 'rgba(46,37,87,0.45)'
        c.lineWidth = 1.5
        c.setLineDash([5, 4])
        c.strokeRect(x + 3.5, top + 1.5, COL_W - 10, ht - 3)
        c.setLineDash([])
        c.fillStyle = '#2E2557'
        c.font = 'bold 12px Arial, sans-serif'
        c.textAlign = 'left'
        c.fillText('Open Hour', x + 10, top + 16)
        if (ht >= 34) {
          c.font = '11px Arial, sans-serif'
          c.globalAlpha = 0.7
          c.fillText('Optional: your call', x + 10, top + 32)
          c.globalAlpha = 1
        }
      } else {
        const isFixed = ev.kind === 'fixed'
        c.fillStyle = isFixed ? '#A0A0B8' : '#F3EBD8'
        c.fillRect(x + 2, top, COL_W - 7, ht)
        c.fillStyle = isFixed ? '#FFFFFF' : 'rgba(26,21,53,0.55)'
        c.font = '11px Arial, sans-serif'
        c.textAlign = 'left'
        let label = ev.label || ''
        while (c.measureText(label).width > COL_W - 20 && label.length > 3) label = label.slice(0, -1)
        if (ht >= 14) c.fillText(label, x + 10, top + Math.min(15, ht - 3))
      }
    }
  })

  // legend
  const legY = H - MG - LEG_H + 14
  c.textAlign = 'left'
  let lx = MG
  for (const k of Object.keys(TECHNIQUES) as SessionType[]) {
    const tech = TECHNIQUES[k]
    c.fillStyle = tech.bg
    c.fillRect(lx, legY, 18, 18)
    c.strokeStyle = '#FFFFFF'
    c.lineWidth = 2.5
    c.setLineDash(tech.edge === 'dashed' ? [5, 3] : tech.edge === 'dotted' ? [2, 3] : tech.edge === 'double' ? [10, 3] : [])
    c.beginPath()
    c.moveTo(lx + 3, legY + 2)
    c.lineTo(lx + 3, legY + 16)
    c.stroke()
    c.setLineDash([])
    c.fillStyle = '#2E2557'
    c.font = 'bold 13px Arial, sans-serif'
    const label = `${tech.label} (${tech.mins} min)`
    c.fillText(label, lx + 24, legY + 14)
    c.font = '12px Arial, sans-serif'
    c.fillStyle = 'rgba(26,21,53,0.6)'
    c.fillText(tech.strap, lx + 24, legY + 32)
    lx += Math.max(c.measureText(tech.strap).width, c.measureText(label).width) + 60
  }

  // freestyle legend entry
  c.fillStyle = 'rgba(46,37,87,0.05)'
  c.fillRect(lx, legY, 18, 18)
  c.strokeStyle = 'rgba(46,37,87,0.45)'
  c.lineWidth = 1.5
  c.setLineDash([4, 3])
  c.strokeRect(lx + 1, legY + 1, 16, 16)
  c.setLineDash([])
  c.fillStyle = '#2E2557'
  c.font = 'bold 13px Arial, sans-serif'
  c.fillText('Open Hour (60 min)', lx + 24, legY + 14)
  c.font = '12px Arial, sans-serif'
  c.fillStyle = 'rgba(26,21,53,0.6)'
  c.fillText('Optional: light work or a break. Your call.', lx + 24, legY + 32)

  // subject key
  let sx = MG
  const subY = legY + 52
  c.font = '12px Arial, sans-serif'
  c.fillStyle = 'rgba(26,21,53,0.6)'
  c.fillText('Subjects:', sx, subY + 10)
  sx += c.measureText('Subjects:').width + 14
  for (const [subject, colour] of dots) {
    c.fillStyle = '#2E2557'
    c.beginPath()
    c.arc(sx + 5, subY + 6, 6, 0, Math.PI * 2)
    c.fill()
    c.fillStyle = colour
    c.beginPath()
    c.arc(sx + 5, subY + 6, 4.5, 0, Math.PI * 2)
    c.fill()
    c.fillStyle = '#2E2557'
    c.font = 'bold 12px Arial, sans-serif'
    c.fillText(subject, sx + 16, subY + 10)
    sx += c.measureText(subject).width + 40
  }

  // footer
  c.font = '12px Arial, sans-serif'
  c.fillStyle = 'rgba(26,21,53,0.5)'
  c.textAlign = 'right'
  c.fillText('Built free at alevelaccelerators.com/revision-tracker', W - MG, H - MG + 14)

  return new Promise<string>((resolve) => {
    cv.toBlob((blob) => {
      resolve(URL.createObjectURL(blob!))
    }, 'image/png')
  })
}
