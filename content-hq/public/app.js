/* Content HQ front end. Hand-rolled, no dependencies, same conventions as
   the main HQ: fetch the stores, render honestly, let Waleed change status
   with a click. All writes go back through PUT /api/store/:name. */

const $ = (id) => document.getElementById(id)
const esc = (s) =>
  String(s == null ? '' : s).replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c])

const state = { creators: null, outliers: null, playbook: null, pipeline: null, sweeps: null, channels: null, meta: null }

async function getStore(name) {
  const res = await fetch(`/api/store/${name}`)
  return res.ok ? res.json() : null
}
async function putStore(name, value) {
  await fetch(`/api/store/${name}`, { method: 'PUT', body: JSON.stringify(value) })
}

const fmtN = (n) => {
  if (n == null) return '·'
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(n >= 10_000_000 ? 0 : 1) + 'M'
  if (n >= 1_000) return (n / 1_000).toFixed(n >= 100_000 ? 0 : 1) + 'K'
  return String(n)
}
const fmtDate = (iso) => {
  if (!iso) return 'never'
  const d = new Date(iso)
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }) + ', ' +
    d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
}
const ago = (iso) => {
  if (!iso) return 'never'
  const mins = Math.round((Date.now() - new Date(iso)) / 60000)
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins}m ago`
  if (mins < 60 * 24) return `${Math.round(mins / 60)}h ago`
  return `${Math.round(mins / 60 / 24)}d ago`
}

const PLATFORM_BADGE = { tiktok: '<span class="badge badge-tt">TikTok</span>', instagram: '<span class="badge badge-ig">Reels</span>', youtube: '<span class="badge badge-yt">Shorts</span>' }
const STATUS_BADGE = {
  ready: '<span class="badge badge-ready">Ready to film</span>',
  filmed: '<span class="badge badge-filmed">Filmed</span>',
  posted: '<span class="badge badge-posted">Posted</span>',
  idea: '<span class="badge badge-idea">Idea</span>',
}

/* ---------------------------------------------------------------- topbar */

function renderTopbar() {
  $('top-date').textContent = new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })
  const m = state.meta
  if (m) {
    $('pill-countdown').textContent = `Results day in ${m.daysToResultsDay} days`
    $('pill-countdown').className = 'pill pill-gold'
  }
  const s = state.sweeps
  const pill = $('pill-sweep')
  if (!s || !s.lastSweep) {
    pill.textContent = 'Radar: no sweep yet'
    pill.className = 'pill'
  } else if (s.lastSweepStatus === 'failed') {
    pill.textContent = `Last sweep failed ${ago(s.lastSweep)}`
    pill.className = 'pill pill-alert'
  } else {
    pill.textContent = `Radar swept ${ago(s.lastSweep)}`
    pill.className = 'pill pill-ok'
  }
}

/* ------------------------------------------------------------------- now */

function renderNow() {
  const pkgs = (state.pipeline && state.pipeline.packages) || []
  const ready = pkgs.filter((p) => p.status === 'ready')
  const outliers = (state.outliers && state.outliers.outliers) || []
  const fresh = outliers.filter((o) => o.status === 'new')

  $('now-stats').innerHTML = [
    { n: ready.length, l: 'ready to film' },
    { n: fresh.length, l: 'new outliers' },
    { n: (state.creators && state.creators.creators || []).length, l: 'creators tracked' },
  ].map((s) => `<div class="now-stat"><div class="n">${s.n}</div><div class="l">${s.l}</div></div>`).join('')

  const next = ready[0]
  $('film-next').innerHTML = next
    ? `<div class="film-next"><b>Film this next: ${esc(next.title)}</b>
       <div class="why">${esc(next.whyNow || (next.funnel && next.funnel.why) || '')}</div>
       <div class="why">Hook: "${esc(next.hook)}"</div></div>`
    : '<div class="film-next">Nothing marked ready. Open the pipeline below or ask a session for a new batch.</div>'

  const s = state.sweeps
  $('radar-status-line').textContent = s && s.lastSweep
    ? `Last sweep ${fmtDate(s.lastSweep)}: ${s.lastSweepNote || s.lastSweepStatus}`
    : 'The radar has not swept yet. Data below comes from the initial deep research (17 July 2026).'

  $('now-outliers').innerHTML = fresh.length
    ? fresh.slice(0, 3).map((o) =>
        `<div class="film-next" style="margin-top:8px"><b>${esc(o.creatorName)}</b>: ${esc(o.description)}
         <div class="why">${esc(o.metric || '')}${o.whyItWorked ? ' · ' + esc(o.whyItWorked) : ''}</div></div>`).join('')
    : '<div class="empty">No unreviewed outliers right now. They land here when a sweep finds one.</div>'
}

/* --------------------------------------------------------------- pipeline */

function pkgBody(p) {
  const beats = (p.script || []).map((b) => `
    <div class="beat">
      <div class="b-label">${esc(b.beat)}</div>
      <div><div class="b-spoken">${esc(b.spoken)}</div>${b.onScreen ? `<div class="b-screen">${esc(b.onScreen)}</div>` : ''}</div>
    </div>`).join('')

  const v = p.visual || {}
  const visual = `
    <dl class="visual-spec">
      ${v.duration ? `<dt>Length</dt><dd>${esc(v.duration)}</dd>` : ''}
      ${v.setting ? `<dt>Setting &amp; framing</dt><dd>${esc(v.setting)}</dd>` : ''}
      ${v.wardrobeProps ? `<dt>Wardrobe &amp; props</dt><dd>${esc(v.wardrobeProps)}</dd>` : ''}
      ${v.onScreenTextStyle ? `<dt>On-screen text</dt><dd>${esc(v.onScreenTextStyle)}</dd>` : ''}
      ${v.footage ? `<dt>Footage &amp; cuts</dt><dd>${esc(v.footage)}</dd>` : ''}
      ${v.feel ? `<dt>The feel</dt><dd>${esc(v.feel)}</dd>` : ''}
    </dl>`

  const slides = (p.slides || []).length
    ? `<div class="slides">${p.slides.map((s) => `<img src="${esc(s.src)}" alt="${esc(s.alt || '')}" onclick="showSlide('${esc(s.src)}')">`).join('')}</div>`
    : ''

  const caption = p.caption
    ? `<div class="script-block"><div class="s-label">Caption</div><div class="caption-box" id="cap-${esc(p.id)}">${esc(p.caption)}${p.hashtags ? '\n\n' + esc(p.hashtags) : ''}</div></div>`
    : ''

  return `
    <div class="pkg-cols">
      <div>
        <div class="script-block">
          <div class="s-label">Script</div>
          <div class="beat"><div class="b-label">Hook</div><div><div class="b-spoken"><b>${esc(p.hook)}</b></div>${p.hookOnScreen ? `<div class="b-screen">${esc(p.hookOnScreen)}</div>` : ''}</div></div>
          ${beats}
          <div class="beat"><div class="b-label">CTA</div><div><div class="b-spoken">${esc(p.cta)}</div>${p.ctaOnScreen ? `<div class="b-screen">${esc(p.ctaOnScreen)}</div>` : ''}</div></div>
        </div>
        ${caption}
        ${p.funnel ? `<div class="funnel-line"><b>Funnel:</b> ${esc(p.funnel.target)}${p.funnel.why ? ' · ' + esc(p.funnel.why) : ''}</div>` : ''}
        ${p.modelledOn ? `<div class="modelled">Modelled on: ${esc(p.modelledOn)}</div>` : ''}
      </div>
      <div>
        <div class="s-label" style="font-size:10.5px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;color:var(--ink-muted);margin-bottom:4px">How it should look</div>
        ${visual}
        ${slides}
      </div>
    </div>
    <div class="pkg-actions">
      ${p.status !== 'filmed' && p.status !== 'posted' ? `<button class="primary" onclick="setPkgStatus('${esc(p.id)}','filmed')">Mark filmed</button>` : ''}
      ${p.status === 'filmed' ? `<button class="primary" onclick="setPkgStatus('${esc(p.id)}','posted')">Mark posted</button>` : ''}
      ${p.status === 'posted' || p.status === 'filmed' ? `<button onclick="setPkgStatus('${esc(p.id)}','ready')">Back to ready</button>` : ''}
      <button onclick="copyScript('${esc(p.id)}')">Copy script</button>
      ${p.caption ? `<button onclick="copyText('cap-${esc(p.id)}')">Copy caption</button>` : ''}
    </div>`
}

function renderPipeline() {
  const pkgs = (state.pipeline && state.pipeline.packages) || []
  const order = { ready: 0, idea: 1, filmed: 2, posted: 3 }
  const sorted = [...pkgs].sort((a, b) => (order[a.status] ?? 9) - (order[b.status] ?? 9))
  $('pipeline-count').textContent = `${pkgs.filter((p) => p.status === 'ready').length} ready · ${pkgs.length} total`
  $('pkg-list').innerHTML = sorted.length
    ? sorted.map((p) => `
      <div class="pkg" id="pkg-${esc(p.id)}">
        <div class="pkg-head" onclick="togglePkg('${esc(p.id)}')">
          ${STATUS_BADGE[p.status] || ''}
          ${(p.platforms || []).map((pl) => PLATFORM_BADGE[pl] || '').join(' ')}
          <span class="badge badge-soft">${esc(p.type)}</span>
          <span class="badge badge-soft">${esc(p.audience)}</span>
          <span class="p-title">${esc(p.title)}</span>
          <span class="p-hookline">"${esc(p.hook)}"</span>
        </div>
        <div class="pkg-body">${pkgBody(p)}</div>
      </div>`).join('')
    : '<div class="empty">No packages yet.</div>'
}

window.togglePkg = (id) => $(`pkg-${id}`).classList.toggle('open')

window.setPkgStatus = async (id, status) => {
  const p = state.pipeline.packages.find((x) => x.id === id)
  if (!p) return
  p.status = status
  p.statusChangedAt = new Date().toISOString()
  await putStore('pipeline', state.pipeline)
  renderPipeline(); renderNow()
  const el = $(`pkg-${id}`)
  if (el) el.classList.add('open')
}

window.copyScript = (id) => {
  const p = state.pipeline.packages.find((x) => x.id === id)
  if (!p) return
  const lines = [`HOOK: ${p.hook}`]
  if (p.hookOnScreen) lines.push(`  on screen: ${p.hookOnScreen}`)
  for (const b of p.script || []) {
    lines.push(`${(b.beat || 'BEAT').toUpperCase()}: ${b.spoken}`)
    if (b.onScreen) lines.push(`  on screen: ${b.onScreen}`)
  }
  lines.push(`CTA: ${p.cta}`)
  if (p.ctaOnScreen) lines.push(`  on screen: ${p.ctaOnScreen}`)
  navigator.clipboard.writeText(lines.join('\n'))
}

window.copyText = (elId) => {
  const el = $(elId)
  if (el) navigator.clipboard.writeText(el.textContent)
}

window.showSlide = (src) => {
  $('lightbox-img').src = src
  $('lightbox').classList.add('show')
}
$('lightbox').onclick = () => $('lightbox').classList.remove('show')

/* --------------------------------------------------------------- outliers */

function renderOutliers() {
  const o = state.outliers
  $('outlier-method').textContent = (o && o.method) || ''
  const list = (o && o.outliers) || []
  const sorted = [...list].sort((a, b) => (a.status === 'new' ? -1 : 1) - (b.status === 'new' ? -1 : 1) || String(b.spottedAt || '').localeCompare(String(a.spottedAt || '')))
  $('outlier-list').innerHTML = sorted.length
    ? sorted.map((x) => `
      <div class="outlier ${x.status !== 'new' ? 'is-seen' : ''}">
        <div class="o-top">
          <span>${PLATFORM_BADGE[x.platform] || ''} ${x.status === 'new' ? '<span class="badge badge-new">New</span>' : ''}</span>
          <span class="t-dim">${esc(x.creatorName)} · spotted ${esc(ago(x.spottedAt))}</span>
        </div>
        <div class="o-desc">${esc(x.description)}</div>
        <div class="o-metric">${esc(x.metric || 'metric unavailable')}${x.baseline ? ` <span class="t-dim">vs ${esc(x.baseline)} typical</span>` : ''}</div>
        ${x.whyItWorked ? `<div class="o-why"><b>Why it worked:</b> ${esc(x.whyItWorked)}</div>` : ''}
        ${x.reworkIdea ? `<div class="o-rework"><b>Your rework:</b> ${esc(x.reworkIdea)}</div>` : ''}
        <div class="o-foot">
          ${x.url ? `<a href="${esc(x.url)}" target="_blank" rel="noreferrer">Watch it</a>` : '<span></span>'}
          ${x.status === 'new' ? `<button class="small" onclick="markOutlierSeen('${esc(x.id)}')">Reviewed</button>` : ''}
        </div>
      </div>`).join('')
    : '<div class="empty">No outliers logged yet. The sweeps fill this in.</div>'
}

window.markOutlierSeen = async (id) => {
  const x = (state.outliers.outliers || []).find((o) => o.id === id)
  if (!x) return
  x.status = 'seen'
  await putStore('outliers', state.outliers)
  renderOutliers(); renderNow()
}

/* ---------------------------------------------------------------- radar */

function renderCreators() {
  const c = state.creators
  $('creators-updated').textContent = c && c.updatedAt ? `updated ${fmtDate(c.updatedAt)}` : ''
  $('creators-note').textContent = (c && c.note) || ''
  const list = (c && c.creators) || []
  const sorted = [...list].sort((a, b) => (b.relevance || 0) - (a.relevance || 0) ||
    ((b.tiktok && b.tiktok.followers) || 0) + ((b.instagram && b.instagram.followers) || 0) -
    ((a.tiktok && a.tiktok.followers) || 0) - ((a.instagram && a.instagram.followers) || 0))
  const rows = sorted.map((x) => {
    const tt = x.tiktok || {}
    const ig = x.instagram || {}
    return `<tr>
      <td><span class="t-name">${esc(x.name)}</span><br><span class="t-dim">${esc(x.niche || '')}${x.country === 'UK' ? ' · <span class="badge badge-uk">UK</span>' : ''}</span></td>
      <td>${tt.handle ? `@${esc(tt.handle)}` : '<span class="t-dim">·</span>'}<br>${ig.handle ? `<span class="t-dim">IG @${esc(ig.handle)}</span>` : ''}</td>
      <td class="num">${fmtN(tt.followers)}</td>
      <td class="num">${fmtN(ig.followers)}</td>
      <td><span class="rel">${'★'.repeat(x.relevance || 0)}${'☆'.repeat(Math.max(0, 5 - (x.relevance || 0)))}</span></td>
      <td class="t-dim">${esc(x.stealNotes || x.whatTheyPost || '')}</td>
      <td class="t-dim" style="white-space:nowrap">${x.lastSwept ? esc(ago(x.lastSwept)) : 'research ' + esc(new Date(tt.asOf || ig.asOf || '2026-07-17').toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }))}</td>
    </tr>`
  }).join('')
  $('creator-table').innerHTML = `
    <thead><tr><th>Creator</th><th>Handles</th><th class="num">TikTok</th><th class="num">Instagram</th><th>Study first</th><th>What to steal</th><th>Checked</th></tr></thead>
    <tbody>${rows || '<tr><td colspan="7" class="empty">No creators tracked yet.</td></tr>'}</tbody>`
}

/* --------------------------------------------------------------- playbook */

function renderPlaybook() {
  const p = state.playbook
  $('playbook-updated').textContent = p && p.updatedAt ? `From the niche research, ${fmtDate(p.updatedAt)}. The sweeps revise it as the picture changes.` : ''
  $('rule-list').innerHTML = ((p && p.rules) || []).map((r) => `
    <div class="rule"><div class="r-n"></div>
      <div><b>${esc(r.title)}</b> ${esc(r.detail)}
      ${r.evidence ? `<div class="r-ev">${esc(r.evidence)}</div>` : ''}</div>
    </div>`).join('') || '<div class="empty">Research pending.</div>'
  $('opp-list').innerHTML = ((p && p.opportunities) || []).map((o) =>
    `<div class="opp"><b>${esc(o.title)}.</b> ${esc(o.detail)}</div>`).join('') || '<div class="empty">Research pending.</div>'
}

/* ------------------------------------------------------------------- ops */

function renderChannels() {
  const ch = state.channels || {}
  const row = (key, label) => {
    const c = ch[key] || {}
    return `<div style="display:flex;gap:8px;align-items:center;margin-bottom:9px;flex-wrap:wrap">
      <span style="width:84px;font-weight:600;color:var(--ink)">${label}</span>
      <input type="text" id="ch-${key}" placeholder="@handle" value="${esc(c.handle || '')}" style="flex:1;min-width:130px">
      <span class="t-dim">${c.followers != null ? `${fmtN(c.followers)} followers, ${esc(ago(c.asOf))}` : 'not tracked yet'}</span>
    </div>`
  }
  $('channels').innerHTML = row('tiktok', 'TikTok') + row('instagram', 'Instagram') +
    `<button class="primary" onclick="saveChannels()">Save handles</button>
     <span class="t-dim" style="margin-left:8px">${esc(ch.note || '')}</span>`
}

window.saveChannels = async () => {
  const ch = state.channels || {}
  for (const key of ['tiktok', 'instagram']) {
    const v = $(`ch-${key}`).value.trim().replace(/^@/, '')
    ch[key] = { ...(ch[key] || {}), handle: v || null }
  }
  ch.note = ch.tiktok.handle || ch.instagram.handle ? 'Saved. The next sweep starts tracking these.' : ''
  await putStore('channels', ch)
  state.channels = ch
  renderChannels()
}

function renderSweeps() {
  const s = state.sweeps
  const log = (s && s.log) || []
  $('sweep-table').innerHTML = `
    <thead><tr><th>When</th><th>Status</th><th>What happened</th></tr></thead>
    <tbody>${log.length
      ? log.slice(0, 12).map((e) => `<tr>
          <td class="t-dim" style="white-space:nowrap">${esc(fmtDate(e.at))}</td>
          <td>${e.status === 'ok' ? '<span class="badge badge-ready">ok</span>' : '<span class="badge badge-new">failed</span>'}</td>
          <td class="t-dim">${esc(e.note || '')}</td>
        </tr>`).join('')
      : '<tr><td colspan="3" class="empty">No sweeps yet. The first scheduled sweep logs itself here.</td></tr>'}</tbody>`
}

/* ------------------------------------------------------------------ boot */

async function boot() {
  const [creators, outliers, playbook, pipeline, sweeps, channels, meta] = await Promise.all([
    getStore('creators'), getStore('outliers'), getStore('playbook'),
    getStore('pipeline'), getStore('sweeps'), getStore('channels'),
    fetch('/api/meta').then((r) => r.json()).catch(() => null),
  ])
  Object.assign(state, { creators, outliers, playbook, pipeline, sweeps, channels, meta })
  renderTopbar(); renderNow(); renderPipeline(); renderOutliers(); renderCreators(); renderPlaybook(); renderChannels(); renderSweeps()
}

boot()
