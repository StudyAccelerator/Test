'use strict'

/* A-Level Accelerators HQ client. Everything renders from live API data or
   the local JSON stores. Nothing on this page is a made-up number: sources
   that are not connected yet say so instead. */

const $ = (sel) => document.querySelector(sel)
const esc = (s) =>
  String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]))
const nf = new Intl.NumberFormat('en-GB')
const gbp = (pence) =>
  '£' + (pence / 100).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
const pct = (f) => (f == null ? 'no data' : (f * 100).toFixed(1) + '%')

const RESULTS_DAY = new Date('2026-08-13T00:00:00')

const GROUPS = {
  diagnostic: '192687508025247162',
  newsletter: '192801700892903405',
  parents: '188021995515937985',
  tracker: '187183128836573106',
  routeSummer: '192802205272639254',
  routeSubject: '192802207993693338',
  routeSystem: '192802211655321354',
}

const state = {
  ml: null,
  stripe: null,
  site: null,
  history: [],
  tasks: [],
  projects: [],
  subs: [],
  linkedin: [],
  competitors: null,
  connections: null,
}

/* ------------------------------------------------------------------ api */

async function getJSON(url) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`${url} returned ${res.status}`)
  return res.json()
}

async function putStore(name, value) {
  await fetch(`/api/store/${name}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(value),
  })
}

/* -------------------------------------------------------------- helpers */

function daysUntil(date) {
  const now = new Date()
  const target = date instanceof Date ? date : new Date(`${date}T00:00:00`)
  return Math.ceil((target - new Date(now.getFullYear(), now.getMonth(), now.getDate())) / 86400000)
}

function nextSundaySend() {
  const now = new Date()
  const d = new Date(now)
  d.setHours(17, 0, 0, 0)
  const day = d.getDay()
  if (day !== 0 || d <= now) d.setDate(d.getDate() + ((7 - day) % 7 || 7))
  return d
}

function shortDate(d) {
  return new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
}

/* -------------------------------------------------------------- tooltip */

const tip = $('#tooltip')
function showTip(html, x, y) {
  tip.innerHTML = html
  tip.hidden = false
  const pad = 14
  const rect = tip.getBoundingClientRect()
  tip.style.left = Math.min(x + pad, window.innerWidth - rect.width - 8) + 'px'
  tip.style.top = Math.max(8, y - rect.height - pad) + 'px'
}
function hideTip() {
  tip.hidden = true
}

/* ----------------------------------------------------------- svg charts */

const SVG = 'http://www.w3.org/2000/svg'
function svgEl(tag, attrs) {
  const el = document.createElementNS(SVG, tag)
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v)
  return el
}

/* Single-series line with area fill, direct label on the latest point,
   recessive axis, hover tooltip per point. */
function renderLineChart(container, points, valueLabel) {
  container.innerHTML = ''
  const w = Math.max(container.clientWidth || 300, 260)
  const h = 130
  const m = { top: 12, right: 52, bottom: 22, left: 8 }
  const svg = svgEl('svg', { width: w, height: h, viewBox: `0 0 ${w} ${h}` })

  const values = points.map((p) => p.value)
  let lo = Math.min(...values)
  let hi = Math.max(...values)
  if (lo === hi) {
    lo -= 1
    hi += 1
  }
  const padY = (hi - lo) * 0.15
  lo -= padY
  hi += padY

  const x = (i) => m.left + (i / (points.length - 1)) * (w - m.left - m.right)
  const y = (v) => m.top + (1 - (v - lo) / (hi - lo)) * (h - m.top - m.bottom)

  /* recessive baseline grid: two lines */
  for (const gv of [lo + (hi - lo) * 0.25, lo + (hi - lo) * 0.75]) {
    svg.appendChild(
      svgEl('line', {
        x1: m.left, x2: w - m.right, y1: y(gv), y2: y(gv),
        stroke: 'rgba(251,248,243,0.06)', 'stroke-width': 1,
      })
    )
  }

  const linePath = points.map((p, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)},${y(p.value).toFixed(1)}`).join('')
  const areaPath = `${linePath}L${x(points.length - 1).toFixed(1)},${h - m.bottom}L${x(0).toFixed(1)},${h - m.bottom}Z`

  svg.appendChild(svgEl('path', { d: areaPath, fill: 'rgba(201,169,110,0.12)' }))
  svg.appendChild(
    svgEl('path', { d: linePath, fill: 'none', stroke: '#c9a96e', 'stroke-width': 2, 'stroke-linejoin': 'round' })
  )

  const last = points[points.length - 1]
  svg.appendChild(svgEl('circle', { cx: x(points.length - 1), cy: y(last.value), r: 3.5, fill: '#c9a96e' }))
  const lastLabel = svgEl('text', {
    x: x(points.length - 1) + 8, y: y(last.value) + 4,
    fill: '#fbf8f3', 'font-size': 12, 'font-family': 'Georgia, serif',
  })
  lastLabel.textContent = nf.format(last.value)
  svg.appendChild(lastLabel)

  /* first and last date labels */
  const t0 = svgEl('text', { x: m.left, y: h - 6, fill: 'rgba(143,134,184,0.9)', 'font-size': 10 })
  t0.textContent = shortDate(points[0].date)
  const t1 = svgEl('text', { x: w - m.right, y: h - 6, fill: 'rgba(143,134,184,0.9)', 'font-size': 10, 'text-anchor': 'end' })
  t1.textContent = shortDate(last.date)
  svg.appendChild(t0)
  svg.appendChild(t1)

  /* hover targets */
  points.forEach((p, i) => {
    const hit = svgEl('circle', { cx: x(i), cy: y(p.value), r: 12, fill: 'transparent' })
    hit.addEventListener('mousemove', (e) =>
      showTip(`<div class="t-label">${esc(shortDate(p.date))}</div>${nf.format(p.value)} ${esc(valueLabel)}`, e.clientX, e.clientY)
    )
    hit.addEventListener('mouseleave', hideTip)
    svg.appendChild(hit)
  })

  container.appendChild(svg)
}

/* Single-series bars with rounded data ends, 2px gaps, hover tooltip. */
function renderBarChart(container, items) {
  container.innerHTML = ''
  const w = Math.max(container.clientWidth || 300, 260)
  const h = 120
  const m = { top: 10, right: 4, bottom: 20, left: 4 }
  const svg = svgEl('svg', { width: w, height: h, viewBox: `0 0 ${w} ${h}` })

  const hi = Math.max(...items.map((d) => d.value), 1)
  const innerW = w - m.left - m.right
  const band = innerW / items.length
  const barW = Math.min(Math.max(band - 2, 3), 42)
  const y = (v) => m.top + (1 - v / hi) * (h - m.top - m.bottom)

  svg.appendChild(
    svgEl('line', {
      x1: m.left, x2: w - m.right, y1: h - m.bottom, y2: h - m.bottom,
      stroke: 'rgba(251,248,243,0.12)', 'stroke-width': 1,
    })
  )

  items.forEach((d, i) => {
    const bx = m.left + i * band + (band - barW) / 2
    const by = y(d.value)
    const bar = svgEl('rect', {
      x: bx, y: by, width: barW, height: Math.max(h - m.bottom - by, 1.5),
      rx: 3, fill: i === items.length - 1 ? '#c9a96e' : 'rgba(201,169,110,0.55)',
    })
    bar.addEventListener('mousemove', (e) => showTip(d.tip, e.clientX, e.clientY))
    bar.addEventListener('mouseleave', hideTip)
    svg.appendChild(bar)

    const lbl = svgEl('text', {
      x: bx + barW / 2, y: h - 6, fill: 'rgba(143,134,184,0.9)', 'font-size': 9.5, 'text-anchor': 'middle',
    })
    lbl.textContent = d.label
    svg.appendChild(lbl)
  })

  /* direct label on the latest bar only */
  const last = items[items.length - 1]
  const lx = m.left + (items.length - 1) * band + band / 2
  const lastLbl = svgEl('text', {
    x: lx, y: y(last.value) - 5, fill: '#fbf8f3', 'font-size': 11, 'text-anchor': 'middle', 'font-family': 'Georgia, serif',
  })
  lastLbl.textContent = nf.format(last.value)
  svg.appendChild(lastLbl)

  container.appendChild(svg)
}

/* -------------------------------------------------------------- top bar */

function renderTop() {
  $('#top-date').textContent = new Date().toLocaleDateString('en-GB', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  })
  const days = daysUntil(RESULTS_DAY)
  $('#top-countdown').textContent =
    days > 0 ? `${days} days to results day` : days === 0 ? 'Results day is today' : 'Results are out'

  const pill = $('#top-site')
  if (!state.site) return
  if (state.site.up) {
    pill.textContent = `site live · ${state.site.ms}ms`
    pill.className = 'pill pill-ok'
  } else {
    pill.textContent = 'site not responding'
    pill.className = 'pill pill-alert'
  }
}

/* ---------------------------------------------------------------- pulse */

function renderPulse() {
  const s = state.site
  const send = nextSundaySend()
  const now = new Date()
  const hrs = Math.round((send - now) / 3600000)
  const sendText =
    hrs <= 24
      ? `today ${hrs > 0 ? `in ${hrs}h` : 'now'}`
      : send.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' }) + ', 5pm'

  const rows = [
    {
      k: 'Results day',
      v: `<span class="big">${daysUntil(RESULTS_DAY)}</span> days <span class="muted small">Thu 13 Aug</span>`,
    },
    { k: 'Sunday Session', v: esc(sendText) },
    {
      k: 'Website',
      v: s ? (s.up ? `up, ${s.ms}ms` : '<span style="color:var(--alert)">not responding</span>') : 'checking',
    },
    {
      k: 'Last deploy',
      v:
        s && s.lastCommit
          ? `${esc(s.lastCommit.date)} <span class="muted small">${esc(s.lastCommit.subject.slice(0, 34))}${s.lastCommit.subject.length > 34 ? '…' : ''}</span>${s.lastCommit.unpushed ? `<br /><span class="task-due">${s.lastCommit.unpushed} local commit${s.lastCommit.unpushed > 1 ? 's' : ''} not deployed yet</span>` : ''}`
          : 'unknown',
    },
    {
      k: 'Subscribers',
      v: state.ml && state.ml.total != null ? `<b>${nf.format(state.ml.total)}</b> on the list` : 'loading',
    },
  ]

  $('#pulse-body').innerHTML = rows
    .map((r) => `<div class="pulse-row"><span class="pulse-key">${r.k}</span><span class="pulse-val">${r.v}</span></div>`)
    .join('')
}

/* ---------------------------------------------------------------- email */

function renderEmail() {
  const body = $('#email-body')
  const chip = $('#email-chip')
  const ml = state.ml

  if (!ml || ml.error || ml.pending) {
    chip.textContent = ml && ml.pending ? 'pending' : 'connection error'
    chip.className = 'chip chip-error'
    body.innerHTML = `<p class="empty-state">Could not reach MailerLite${ml && ml.error ? `: ${esc(ml.error)}` : ''}. Live numbers will appear when the connection recovers. Nothing here is cached or invented.</p>`
    return
  }

  const g = (id) => ml.groups.find((x) => x.id === id)
  const featured = [
    { label: 'Revision Diagnostic', grp: g(GROUPS.diagnostic) },
    { label: 'Sunday Session', grp: g(GROUPS.newsletter) },
    { label: 'Parents guide', grp: g(GROUPS.parents) },
    { label: 'Revision Tracker', grp: g(GROUPS.tracker) },
  ]

  const routes = [
    { label: 'Summer route', grp: g(GROUPS.routeSummer) },
    { label: 'Subject route', grp: g(GROUPS.routeSubject) },
    { label: 'System route', grp: g(GROUPS.routeSystem) },
  ]

  const autoRows = ml.automations
    .map((a) => {
      const stat = a.enabled
        ? `<span class="state-on">ON</span>`
        : `<span class="state-off">OFF</span>`
      const meta = a.sent ? `${nf.format(a.sent)} sent · ${pct(a.openRate)} open` : 'no sends yet'
      return `<div class="list-row"><span class="row-name" title="${esc(a.name)}">${esc(a.name)}</span><span class="row-meta"><span>${meta}</span>${stat}</span></div>`
    })
    .join('')

  const campRows = ml.campaigns.length
    ? ml.campaigns
        .slice(0, 6)
        .map(
          (c) =>
            `<div class="list-row"><span class="row-name" title="${esc(c.name)}">${esc(c.name)}</span><span class="row-meta"><span>${c.finishedAt ? esc(shortDate(c.finishedAt)) : ''}</span><span>${pct(c.openRate)} open</span><span>${pct(c.clickRate)} click</span></span></div>`
        )
        .join('')
    : '<p class="empty-state">No sent campaigns yet.</p>'

  body.innerHTML = `
    <div class="email-grid">
      <div>
        <div class="label">All subscribers</div>
        <div class="hero-number">${nf.format(ml.total)}</div>
        <div class="hero-sub">across the whole account, live from MailerLite</div>
        <div class="group-tiles">
          ${featured
            .map(
              (f) => `
            <div class="group-tile">
              <div class="g-count">${f.grp ? nf.format(f.grp.active) : 'no data'}</div>
              <div class="g-name">${esc(f.label)}</div>
            </div>`
            )
            .join('')}
        </div>
        <div class="subhead">Diagnostic routes</div>
        ${routes
          .map(
            (r) =>
              `<div class="list-row"><span class="row-name">${esc(r.label)}</span><span class="row-meta">${r.grp ? nf.format(r.grp.active) + (r.grp.active === 1 ? ' lead' : ' leads') : 'no data'}</span></div>`
          )
          .join('')}
        <div class="chart-wrap"><div class="label">List growth</div><div id="growth-chart"></div><div id="growth-note" class="chart-note"></div></div>
      </div>
      <div>
        <div class="subhead">Automations</div>
        ${autoRows || '<p class="empty-state">No automations found.</p>'}
        <div class="subhead">Recent campaigns</div>
        ${campRows}
      </div>
    </div>`

  const hist = state.history.filter((h) => typeof h.total === 'number')
  const growthEl = $('#growth-chart')
  const noteEl = $('#growth-note')
  if (hist.length >= 2) {
    renderLineChart(growthEl, hist.map((h) => ({ date: h.date, value: h.total })), 'subscribers')
    const first = hist[0]
    const delta = ml.total - first.total
    noteEl.textContent = `${delta >= 0 ? '+' : ''}${nf.format(delta)} since ${shortDate(first.date)}. One real snapshot per day the dashboard is open.`
  } else {
    growthEl.innerHTML = ''
    noteEl.textContent =
      'History starts today. The dashboard records one real snapshot each day it is open, so this becomes a trend line within a week. No back-dated numbers are faked in.'
  }
}

/* --------------------------------------------------------------- stripe */

function renderStripe() {
  const body = $('#stripe-body')
  const chip = $('#stripe-chip')
  const st = state.stripe

  if (!st || st.pending) {
    chip.textContent = st && st.error ? 'key error' : 'pending'
    chip.className = st && st.error ? 'chip chip-error' : 'chip chip-pending'
    body.innerHTML = `
      ${st && st.error ? `<p class="small" style="color:var(--alert)">Stripe rejected the key: ${esc(st.error)}</p>` : '<p class="small muted">Not connected yet, so no numbers are shown. Two minutes to fix:</p>'}
      <ol class="setup-steps">
        <li>In Stripe: Developers, then API keys, then <b>Create restricted key</b>.</li>
        <li>Give it <b>read only</b> access to Balance, Charges and Payouts. Nothing else.</li>
        <li>Create a file <code>dashboard/.env</code> containing<br /><code>STRIPE_KEY=rk_live_...</code></li>
        <li>Restart the dashboard.</li>
      </ol>
      <p class="small muted">A read only key cannot move money and cannot touch your payment links.</p>`
    return
  }

  chip.textContent = 'live'
  chip.className = 'chip chip-live'
  const payouts = st.payouts.length
    ? st.payouts
        .map(
          (p) =>
            `<div class="list-row"><span class="row-name">${gbp(p.amount)}</span><span class="row-meta">${esc(p.status)} · ${new Date(p.arrival * 1000).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</span></div>`
        )
        .join('')
    : '<p class="empty-state">No payouts yet.</p>'

  body.innerHTML = `
    <div class="money-row"><span class="m-key">Available now</span><span class="m-val">${gbp(st.available)}</span></div>
    <div class="money-row"><span class="m-key">On the way to you</span><span class="m-val">${gbp(st.pendingBalance)}</span></div>
    <div class="money-row"><span class="m-key">Taken, last 30 days</span><span class="m-val">${gbp(st.last30dGross)} <span class="muted small">(${st.last30dCount}${st.last30dHasMore ? '+' : ''} payments)</span></span></div>
    <div class="subhead">Recent payouts</div>
    ${payouts}`
}

/* -------------------------------------------------------- subscriptions */

function renderSubs() {
  const body = $('#subs-body')
  const subs = state.subs
  const known = subs.filter((s) => s.monthly != null)
  const total = known.reduce((acc, s) => acc + Number(s.monthly), 0)

  body.innerHTML = `
    ${subs
      .map(
        (s) => `
      <div class="list-row" data-id="${esc(s.id)}">
        <span class="row-name">${esc(s.name)}${s.note ? ` <span class="muted small">${esc(s.note)}</span>` : ''}</span>
        <span class="row-meta">£ <input class="subs-input" type="number" min="0" step="0.01" placeholder="enter" value="${s.monthly != null ? esc(s.monthly) : ''}" /></span>
      </div>`
      )
      .join('')}
    <div class="subs-total">
      <span class="label">${known.length === subs.length ? 'Total per month' : `Total so far (${subs.length - known.length} amounts missing)`}</span>
      <span class="m-val">£${total.toLocaleString('en-GB', { minimumFractionDigits: 2 })}</span>
    </div>
    <p class="small muted" style="margin-bottom:0">Enter what each tool actually bills you per month. Blank rows are not guessed at.</p>`

  body.querySelectorAll('.subs-input').forEach((input) => {
    input.addEventListener('change', async () => {
      const id = input.closest('.list-row').dataset.id
      const sub = state.subs.find((s) => s.id === id)
      sub.monthly = input.value === '' ? null : Number(input.value)
      await putStore('subscriptions', state.subs)
      renderSubs()
    })
  })
}

/* ----------------------------------------------------------------- bank */

function renderBank() {
  $('#bank-body').innerHTML = `
    <p class="small muted" style="margin-top:0">Not linked, and honestly it may not need to be. Stripe already shows what the business holds and what is on the way.</p>
    <p class="small muted">If you want the business vs personal split in here, tell me which bank you use. Monzo and Starling offer safe read only personal tokens I can wire in. Other banks need Open Banking, which is more setup than it is worth right now.</p>`
}

/* ------------------------------------------------------------- linkedin */

function renderLinkedIn() {
  const body = $('#linkedin-body')
  const posts = [...state.linkedin].sort((a, b) => (a.date < b.date ? -1 : 1))

  const statsBlock = posts.length
    ? (() => {
        const latest = posts[posts.length - 1]
        const recent = posts.slice(-5)
        const avgImp = Math.round(recent.reduce((a, p) => a + p.impressions, 0) / recent.length)
        const eng = latest.impressions
          ? (((latest.reactions + latest.comments) / latest.impressions) * 100).toFixed(1) + '%'
          : 'no data'
        return `
        <div class="li-stats">
          <div class="li-stat"><div class="label">Latest post</div><div class="hero-number">${nf.format(latest.impressions)}</div><div class="hero-sub">impressions</div></div>
          <div class="li-stat"><div class="label">Average, last ${recent.length}</div><div class="hero-number">${nf.format(avgImp)}</div><div class="hero-sub">impressions</div></div>
          <div class="li-stat"><div class="label">Latest engagement</div><div class="hero-number">${eng}</div><div class="hero-sub">reactions and comments</div></div>
        </div>
        <div id="li-chart"></div>`
      })()
    : `<p class="empty-state">No posts logged yet. After each LinkedIn post, drop its numbers in below. Takes 30 seconds and builds your real trend line. LinkedIn has no analytics API for personal profiles, so this stays honest instead of guessed.</p>`

  body.innerHTML = `
    ${statsBlock}
    <div class="li-form">
      <input id="li-hook" type="text" placeholder="Post hook or topic" />
      <input id="li-imp" type="number" min="0" placeholder="Impressions" />
      <input id="li-rea" type="number" min="0" placeholder="Reactions" />
      <input id="li-com" type="number" min="0" placeholder="Comments" />
      <button id="li-add" class="gold-btn" type="button">Log post</button>
    </div>`

  if (posts.length) {
    const items = posts.slice(-10).map((p) => ({
      label: shortDate(p.date),
      value: p.impressions,
      tip: `<div class="t-label">${esc(shortDate(p.date))} · ${esc(p.hook || 'post')}</div>${nf.format(p.impressions)} impressions · ${nf.format(p.reactions)} reactions · ${nf.format(p.comments)} comments`,
    }))
    renderBarChart($('#li-chart'), items)
  }

  $('#li-add').addEventListener('click', async () => {
    const imp = Number($('#li-imp').value)
    if (!imp) return $('#li-imp').focus()
    state.linkedin.push({
      date: new Date().toISOString().slice(0, 10),
      hook: $('#li-hook').value.trim(),
      impressions: imp,
      reactions: Number($('#li-rea').value) || 0,
      comments: Number($('#li-com').value) || 0,
    })
    await putStore('linkedin', state.linkedin)
    renderLinkedIn()
    renderTriage()
  })
}

function renderFacebook() {
  $('#facebook-body').innerHTML = `
    <p class="small muted" style="margin-top:0">The parent channel, and the priority buyer channel. No ads are live yet, so there is nothing to measure and nothing is shown.</p>
    <p class="small muted">When the first campaign goes live, connect Meta here and this panel becomes spend, reach and cost per lead. Until then the honest number is zero activity.</p>
    <p class="small"><a href="https://www.facebook.com/profile.php?id=61589304930667" target="_blank" rel="noreferrer">Open the Facebook page</a></p>`
}

/* ------------------------------------------------------------- projects */

function renderProjects() {
  const body = $('#projects-body')
  if (!state.projects.length) {
    body.innerHTML = '<p class="empty-state">No projects listed.</p>'
    return
  }
  body.innerHTML = state.projects
    .map((p) => {
      const days = p.due ? daysUntil(p.due) : null
      const dueText =
        days == null ? '' : days < 0 ? ` · <span style="color:var(--alert)">${Math.abs(days)} days overdue</span>` : ` · ${days} days left`
      return `
      <div class="proj-row">
        <span class="badge badge-${esc(p.status)}">${esc(p.status)}</span>
        <div>
          <div class="proj-name">${esc(p.name)}</div>
          <div class="proj-milestone">${esc(p.milestone)}${dueText}</div>
          ${p.note ? `<div class="proj-note">${esc(p.note)}</div>` : ''}
        </div>
      </div>`
    })
    .join('')
}

/* ---------------------------------------------------------------- tasks */

function renderTasks() {
  const body = $('#tasks-body')
  const today = new Date().toISOString().slice(0, 10)
  const open = state.tasks.filter((t) => !t.done)
  const done = state.tasks.filter((t) => t.done)

  const row = (t) => `
    <div class="task-row ${t.done ? 'task-done' : ''}" data-id="${esc(t.id)}">
      <input type="checkbox" ${t.done ? 'checked' : ''} />
      <div style="min-width:0">
        <div class="task-title">${esc(t.title)}
          ${t.due && !t.done ? `<span class="task-due ${t.due < today ? 'overdue' : ''}">· ${t.due === today ? 'today' : esc(shortDate(t.due))}</span>` : ''}
        </div>
        ${t.note ? `<div class="task-note">${esc(t.note)}</div>` : ''}
      </div>
      <button class="task-del" title="Delete task">&times;</button>
    </div>`

  body.innerHTML = `
    ${open.length ? open.map(row).join('') : '<p class="empty-state">Nothing open. Add what is on your mind below.</p>'}
    ${done.length ? `<div class="subhead">Done</div>${done.map(row).join('')}` : ''}
    <div class="task-add">
      <input id="task-new" type="text" placeholder="Add a task" />
      <button id="task-add-btn" class="gold-btn" type="button">Add</button>
    </div>`

  body.querySelectorAll('.task-row input[type="checkbox"]').forEach((box) => {
    box.addEventListener('change', async () => {
      const t = state.tasks.find((x) => x.id === box.closest('.task-row').dataset.id)
      t.done = box.checked
      await putStore('tasks', state.tasks)
      renderTasks()
      renderTriage()
    })
  })
  body.querySelectorAll('.task-del').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const id = btn.closest('.task-row').dataset.id
      state.tasks = state.tasks.filter((x) => x.id !== id)
      await putStore('tasks', state.tasks)
      renderTasks()
      renderTriage()
    })
  })
  const add = async () => {
    const input = $('#task-new')
    const title = input.value.trim()
    if (!title) return
    state.tasks.push({ id: 't' + Date.now(), title, note: '', due: null, done: false })
    await putStore('tasks', state.tasks)
    renderTasks()
  }
  $('#task-add-btn').addEventListener('click', add)
  $('#task-new').addEventListener('keydown', (e) => e.key === 'Enter' && add())
}

/* ---------------------------------------------------------- competitors */

function renderCompetitors() {
  const body = $('#competitors-body')
  const chip = $('#competitors-chip')
  const c = state.competitors
  if (!c || !c.watchlist) {
    body.innerHTML = '<p class="empty-state">No watchlist yet.</p>'
    return
  }

  chip.textContent = c.researchedAt ? `researched ${shortDate(c.researchedAt)}` : 'watchlist'

  const card = (comp) => `
    <div class="radar-card">
      <div class="radar-name"><a href="${esc(comp.website)}" target="_blank" rel="noreferrer">${esc(comp.name)}</a></div>
      <div class="radar-pos">${esc(comp.positioning)}</div>
      <div class="radar-channels">
        ${comp.channels
          .map(
            (ch) =>
              `<a class="radar-ch" href="${esc(ch.url || comp.website)}" target="_blank" rel="noreferrer">${esc(ch.platform)} ${
                ch.followers != null ? `<b>${nf.format(ch.followers)}</b>` : '<span class="muted">not counted</span>'
              }</a>`
          )
          .join('')}
      </div>
    </div>`

  const synth = c.synthesis
    ? `<div class="synth-block"><b style="color:var(--gold)">Market read.</b> ${esc(c.synthesis.summary)}
        ${c.synthesis.moves && c.synthesis.moves.length ? `<div class="subhead" style="margin-top:10px">Moves worth making</div><ol class="setup-steps" style="margin-top:4px">${c.synthesis.moves.map((m) => `<li>${esc(m)}</li>`).join('')}</ol>` : ''}
      </div>`
    : ''

  body.innerHTML = `
    <p class="radar-note">${esc(c.note || '')} Counts marked "not counted" have not been verified against a source yet. To refresh with real numbers, ask a Claude Code session to "refresh the competitor radar".</p>
    <div class="radar-grid">${c.watchlist.map(card).join('')}</div>
    ${synth}`
}

/* ---------------------------------------------------------------- inbox */

function renderInbox() {
  $('#inbox-body').innerHTML = `
    <p class="small muted" style="margin-top:0">Gmail is not connected, so nothing is shown rather than something stale.</p>
    <p class="small muted">To make this live it needs a one-off sign in from you: a Google Cloud OAuth credential for <b>Waleed@alevelaccelerators.com</b> with read only Gmail scope. Say the word and I will walk you through it in about ten minutes, then this panel becomes "emails needing a reply" and "outreach going cold".</p>
    <p class="small"><a href="https://mail.google.com" target="_blank" rel="noreferrer">Open Gmail</a></p>`
}

/* ---------------------------------------------------------- connections */

function renderConnections() {
  const c = state.connections || {}
  const defs = [
    { key: 'mailerlite', name: 'MailerLite', what: 'subscribers, groups, automations, campaigns' },
    { key: 'site', name: 'Website', what: 'uptime ping plus latest deploy from git' },
    { key: 'stripe', name: 'Stripe', what: 'needs a read only restricted key in dashboard/.env' },
    { key: 'linkedin', name: 'LinkedIn', what: 'no personal analytics API, you log posts in 30 seconds' },
    { key: 'facebook', name: 'Facebook ads', what: 'connect Meta once the first campaign is live' },
    { key: 'gmail', name: 'Gmail', what: 'needs a one-off Google sign in from you' },
    { key: 'bank', name: 'Bank', what: 'optional, tell me your bank and I will advise' },
  ]
  $('#connections-body').innerHTML = `<div class="conn-grid">${defs
    .map((d) => {
      const status = c[d.key] || 'pending'
      const cls = status === 'live' ? 'chip-live' : status === 'manual' ? 'chip-manual' : 'chip-pending'
      return `<div class="conn-row"><span class="conn-name">${d.name}</span><span class="conn-what">${d.what}</span><span class="chip ${cls}">${status}</span></div>`
    })
    .join('')}</div>`
}

/* --------------------------------------------------------------- triage */

function renderTriage() {
  const items = []
  const today = new Date().toISOString().slice(0, 10)

  if (state.site && !state.site.up) {
    items.push({
      sev: 'high',
      title: 'The website is not responding',
      why: 'alevelaccelerators.com failed the last check. Every funnel starts there.',
    })
  }

  if (state.ml && state.ml.error) {
    items.push({
      sev: 'high',
      title: 'MailerLite connection failed',
      why: state.ml.error,
    })
  }

  if (state.ml && state.ml.automations) {
    const off = state.ml.automations.filter((a) => !a.enabled)
    const diag = off.filter((a) => /revision diagnostic/i.test(a.name))
    if (diag.length) {
      items.push({
        sev: 'high',
        title: `${diag.length} diagnostic automation${diag.length > 1 ? 's are' : ' is'} switched off`,
        why: `Leads routed to these get no follow-up sequence: ${diag.map((a) => a.name.replace(/revision diagnostic:?\s*/i, '')).join(', ')}. Review and enable them in MailerLite.`,
        href: 'https://dashboard.mailerlite.com/automations',
      })
    }
    const other = off.filter((a) => !diag.includes(a))
    if (other.length) {
      items.push({
        sev: 'info',
        title: `${other.length} other automation${other.length > 1 ? 's' : ''} currently off`,
        why: other.map((a) => a.name).join(', '),
      })
    }
  }

  const overdue = state.tasks.filter((t) => !t.done && t.due && t.due < today)
  if (overdue.length) {
    items.push({
      sev: 'high',
      title: `${overdue.length} task${overdue.length > 1 ? 's are' : ' is'} overdue`,
      why: overdue.map((t) => t.title).join(' · '),
    })
  }

  const dueToday = state.tasks.filter((t) => !t.done && t.due === today)
  if (dueToday.length) {
    items.push({
      sev: 'med',
      title: `Due today: ${dueToday.map((t) => t.title).join(' · ')}`,
      why: '',
    })
  }

  const now = new Date()
  if (now.getDay() === 0 && now.getHours() < 17) {
    items.push({
      sev: 'med',
      title: 'The Sunday Session sends today at 5pm',
      why: "Students only, parents group excluded. Make sure this week's issue is approved and scheduled.",
    })
  }

  if (state.stripe && state.stripe.pending) {
    items.push({
      sev: 'med',
      title: 'Money panel is flying blind',
      why: 'Stripe is not connected, so you cannot see what the business holds. Two minute fix on the Stripe panel.',
    })
  }

  if (state.linkedin) {
    const latest = [...state.linkedin].sort((a, b) => (a.date < b.date ? 1 : -1))[0]
    const staleDays = latest ? daysUntil(latest.date) * -1 : null
    if (!latest) {
      items.push({
        sev: 'info',
        title: 'No LinkedIn posts logged yet',
        why: 'LinkedIn is the student channel. Log posts on the LinkedIn panel so the trend is real.',
      })
    } else if (staleDays >= 7) {
      items.push({
        sev: 'med',
        title: `Nothing logged on LinkedIn for ${staleDays} days`,
        why: 'Either the student channel has gone quiet or the log has. Both are worth a look.',
      })
    }
  }

  const missing = state.subs.filter((s) => s.monthly == null).length
  if (missing) {
    items.push({
      sev: 'info',
      title: `Running costs incomplete: ${missing} amount${missing > 1 ? 's' : ''} missing`,
      why: 'Fill in what each tool bills you and the true monthly cost appears.',
    })
  }

  const rescue = state.projects.find((p) => p.id === 'p3' && p.status !== 'done')
  if (rescue && rescue.due) {
    const d = daysUntil(rescue.due)
    if (d <= 31 && d >= 0) {
      items.push({
        sev: d <= 14 ? 'med' : 'info',
        title: `Results Day Rescue ships in ${d} days`,
        why: 'Roadmap target is Tuesday 12 August, the day before results. It owns the biggest brand moment of the year.',
      })
    }
  }

  const order = { high: 0, med: 1, info: 2 }
  items.sort((a, b) => order[a.sev] - order[b.sev])

  $('#triage-body').innerHTML = items.length
    ? items
        .map(
          (i) => `
      <div class="triage-item">
        <span class="sev-dot sev-${i.sev}"></span>
        <div>
          <div class="triage-title">${i.href ? `<a href="${esc(i.href)}" target="_blank" rel="noreferrer" style="color:inherit">${esc(i.title)}</a>` : esc(i.title)}</div>
          ${i.why ? `<div class="triage-why">${esc(i.why)}</div>` : ''}
        </div>
      </div>`
        )
        .join('')
    : '<div class="all-clear">Nothing needs you right now. Genuinely quiet.</div>'
}

/* ----------------------------------------------------------------- boot */

async function loadAll(fresh = false) {
  const results = await Promise.allSettled([
    getJSON(`/api/mailerlite${fresh ? '?fresh=1' : ''}`),
    getJSON('/api/stripe'),
    getJSON('/api/site'),
    getJSON('/api/store/history'),
    getJSON('/api/store/tasks'),
    getJSON('/api/store/projects'),
    getJSON('/api/store/subscriptions'),
    getJSON('/api/store/linkedin'),
    getJSON('/api/store/competitors'),
    getJSON('/api/connections'),
  ])
  const val = (i, fallback) => (results[i].status === 'fulfilled' ? results[i].value : fallback)
  state.ml = val(0, { error: 'dashboard server unreachable' })
  state.stripe = val(1, { pending: true })
  state.site = val(2, null)
  state.history = val(3, [])
  state.tasks = val(4, [])
  state.projects = val(5, [])
  state.subs = val(6, [])
  state.linkedin = val(7, [])
  state.competitors = val(8, null)
  state.connections = val(9, null)
}

function renderAll() {
  renderTop()
  renderPulse()
  renderEmail()
  renderStripe()
  renderSubs()
  renderBank()
  renderLinkedIn()
  renderFacebook()
  renderProjects()
  renderTasks()
  renderCompetitors()
  renderInbox()
  renderConnections()
  renderTriage()
}

async function boot(fresh = false) {
  await loadAll(fresh)
  renderAll()
}

$('#refresh-btn').addEventListener('click', () => boot(true))

let resizeTimer
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer)
  resizeTimer = setTimeout(renderAll, 250)
})

/* live data refreshes itself every five minutes while the tab is open */
setInterval(() => boot(false), 5 * 60_000)

boot()
