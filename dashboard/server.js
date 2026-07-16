#!/usr/bin/env node
/*
 * A-Level Accelerators HQ. Private local dashboard server.
 *
 * Zero dependencies, binds to 127.0.0.1 only. Serves the dashboard UI from
 * ./public and proxies live data so API keys never reach the browser:
 *
 *   /api/mailerlite  live subscriber, group, automation and campaign stats
 *                    (key reused from lib/mailerlite.ts, same as the site forms)
 *   /api/stripe      live balance and takings once STRIPE_KEY exists in
 *                    dashboard/.env, honest pending state until then
 *   /api/monzo       live Monzo balances, business and personal, once Waleed
 *                    has signed in himself through /api/monzo/connect
 *   /api/site        uptime ping of the live site plus the latest git commit
 *   /api/store/:name local JSON stores (tasks, subscriptions, linkedin log...)
 *                    kept in dashboard/data/, which is gitignored
 *
 * Every /api/mailerlite call also writes a dated snapshot into
 * data/history.json so growth trends accumulate from real observations.
 */

const http = require('node:http')
const fs = require('node:fs')
const path = require('node:path')
const crypto = require('node:crypto')
const { execFile } = require('node:child_process')

const PORT = Number(process.env.PORT || 4400)
const ROOT = __dirname
const PUBLIC_DIR = path.join(ROOT, 'public')
const DATA_DIR = path.join(ROOT, 'data')
const SEED_DIR = path.join(ROOT, 'seed')
const REPO_ROOT = path.join(ROOT, '..')

/* ---------------------------------------------------------------- config */

function loadEnv() {
  const out = {}
  const envPath = path.join(ROOT, '.env')
  if (fs.existsSync(envPath)) {
    for (const line of fs.readFileSync(envPath, 'utf8').split('\n')) {
      const m = line.match(/^\s*([A-Z_][A-Z0-9_]*)\s*=\s*(.*?)\s*$/)
      if (m && !line.trim().startsWith('#')) out[m[1]] = m[2].replace(/^["']|["']$/g, '')
    }
  }
  return out
}

const env = loadEnv()

/* Default is loopback only: private by construction, and the right mode when
   the phone reaches the Mac through Tailscale (whose proxy connects locally).
   HQ_HOST=0.0.0.0 in .env opens it to the home network instead; that mode
   demands HQ_TOKEN so a guest on the Wi-Fi cannot open the dashboard. */
const HOST = env.HQ_HOST || '127.0.0.1'
const HQ_TOKEN = env.HQ_TOKEN || null

function isLoopback(req) {
  const a = req.socket.remoteAddress || ''
  return a === '127.0.0.1' || a === '::1' || a === '::ffff:127.0.0.1'
}

/* The site already ships this key in client code for the signup forms, so the
   dashboard reuses it rather than duplicating a secret. ML_API_KEY in .env wins. */
function mailerliteKey() {
  if (env.ML_API_KEY) return env.ML_API_KEY
  try {
    const src = fs.readFileSync(path.join(REPO_ROOT, 'lib', 'mailerlite.ts'), 'utf8')
    const m = src.match(/'(eyJ[^']+)'/)
    if (m) return m[1]
  } catch {}
  return null
}

const ML_KEY = mailerliteKey()
const STRIPE_KEY = env.STRIPE_KEY || null

/* ------------------------------------------------------------ local data */

const STORES = ['tasks', 'projects', 'subscriptions', 'linkedin', 'facebook', 'competitors', 'history', 'gmail', 'calendar', 'stripe-snapshot', 'linkedin-competitors']

function ensureData() {
  fs.mkdirSync(DATA_DIR, { recursive: true })
  if (!fs.existsSync(SEED_DIR)) return
  for (const file of fs.readdirSync(SEED_DIR)) {
    const target = path.join(DATA_DIR, file)
    if (!fs.existsSync(target)) fs.copyFileSync(path.join(SEED_DIR, file), target)
  }
}

function readStore(name, fallback) {
  try {
    return JSON.parse(fs.readFileSync(path.join(DATA_DIR, `${name}.json`), 'utf8'))
  } catch {
    return fallback
  }
}

function writeStore(name, value) {
  const target = path.join(DATA_DIR, `${name}.json`)
  const tmp = `${target}.tmp`
  fs.writeFileSync(tmp, JSON.stringify(value, null, 2))
  fs.renameSync(tmp, target)
}

/* -------------------------------------------------------------- fetchers */

const cache = new Map()

async function cached(key, ttlMs, fn) {
  const hit = cache.get(key)
  if (hit && Date.now() - hit.at < ttlMs) return hit.value
  const value = await fn()
  cache.set(key, { at: Date.now(), value })
  return value
}

async function ml(pathname) {
  const res = await fetch(`https://connect.mailerlite.com/api${pathname}`, {
    headers: { Authorization: `Bearer ${ML_KEY}` },
    signal: AbortSignal.timeout(15000),
  })
  if (!res.ok) throw new Error(`MailerLite ${res.status} on ${pathname}`)
  return res.json()
}

const rate = (r) => (r && typeof r.float === 'number' ? r.float : null)

async function fetchMailerlite() {
  const [groupsRes, totalRes, activeRes, automationsRes, campaignsRes] = await Promise.all([
    ml('/groups?limit=50&sort=-active_count'),
    ml('/subscribers?limit=0'),
    ml('/subscribers?filter[status]=active&limit=0'),
    ml('/automations?limit=25').catch(() => ml('/automations?limit=10')),
    ml('/campaigns?filter[status]=sent&limit=10'),
  ])

  const groups = (groupsRes.data || []).map((g) => ({
    id: g.id,
    name: g.name,
    active: g.active_count,
    openRate: rate(g.open_rate),
    clickRate: rate(g.click_rate),
    created: g.created_at,
  }))

  const automations = (automationsRes.data || []).map((a) => ({
    id: a.id,
    name: a.name,
    enabled: a.enabled,
    emails: a.emails_count,
    sent: a.stats ? a.stats.sent : null,
    openRate: a.stats ? rate(a.stats.open_rate) : null,
    queue: a.stats ? a.stats.subscribers_in_queue_count : null,
  }))

  const campaigns = (campaignsRes.data || []).map((c) => {
    const s = c.stats || {}
    return {
      id: c.id,
      name: c.name,
      finishedAt: c.finished_at || c.scheduled_for || null,
      recipients: s.sent != null ? s.sent : null,
      openRate: rate(s.open_rate),
      clickRate: rate(s.click_rate),
    }
  })

  const payload = {
    fetchedAt: new Date().toISOString(),
    total: totalRes.total,
    active: activeRes.total,
    groups,
    automations,
    campaigns,
  }

  /* One honest snapshot per day so the growth chart is built from what the
     dashboard actually saw, never interpolated. */
  const today = new Date().toISOString().slice(0, 10)
  const history = readStore('history', [])
  const snapshot = {
    date: today,
    total: payload.total,
    active: payload.active,
    groups: Object.fromEntries(groups.map((g) => [g.id, g.active])),
  }
  const existing = history.findIndex((h) => h.date === today)
  if (existing >= 0) history[existing] = snapshot
  else history.push(snapshot)
  writeStore('history', history)

  return payload
}

async function fetchStripe() {
  /* Until a restricted key exists, serve the last real snapshot a Claude
     session pulled through the Stripe connector, clearly dated. */
  if (!STRIPE_KEY) {
    const snap = readStore('stripe-snapshot', null)
    return snap ? { snapshot: snap } : { pending: true }
  }

  const call = async (pathname) => {
    const res = await fetch(`https://api.stripe.com/v1${pathname}`, {
      headers: { Authorization: `Bearer ${STRIPE_KEY}` },
      signal: AbortSignal.timeout(15000),
    })
    const body = await res.json()
    if (!res.ok) throw new Error(body.error ? body.error.message : `Stripe ${res.status}`)
    return body
  }

  const since = Math.floor(Date.now() / 1000) - 30 * 24 * 3600
  const [balance, charges, payouts] = await Promise.all([
    call('/balance'),
    call(`/charges?limit=100&created[gte]=${since}`),
    call('/payouts?limit=5'),
  ])

  const sumGbp = (list) =>
    (list || []).filter((b) => b.currency === 'gbp').reduce((acc, b) => acc + b.amount, 0)
  const paid = (charges.data || []).filter((c) => c.paid && !c.refunded)

  return {
    fetchedAt: new Date().toISOString(),
    currency: 'gbp',
    available: sumGbp(balance.available),
    pendingBalance: sumGbp(balance.pending),
    last30dGross: paid.reduce((acc, c) => acc + c.amount, 0),
    last30dCount: paid.length,
    last30dHasMore: Boolean(charges.has_more),
    payouts: (payouts.data || []).map((p) => ({
      amount: p.amount,
      status: p.status,
      arrival: p.arrival_date,
    })),
  }
}

/* ---------------------------------------------------------------- monzo */

/* Monzo is read only here: balances and account names, nothing else. Waleed
   does the sign in himself in his own browser; this server only ever handles
   the code Monzo hands back. Tokens live in data/monzo-tokens.json (gitignored,
   owner-readable only) and are NEVER exposed through /api/store. */

/* Read afresh each time rather than caching at boot: editing .env then takes
   effect immediately, with no restart to forget. */
function monzoConfig() {
  const e = loadEnv()
  return { id: e.MONZO_CLIENT_ID || null, secret: e.MONZO_CLIENT_SECRET || null }
}

/* Deliberately "localhost" and not the 127.0.0.1 literal: Monzo's CloudFront
   WAF 403s any auth request carrying a loopback IP in the query string
   (verified 15 July 2026: identical URL is 200 with localhost, 403 with
   127.0.0.1). localhost resolves to 127.0.0.1, so the server still only ever
   listens on the loopback interface. */
const MONZO_REDIRECT = `http://localhost:${PORT}/api/monzo/callback`
const MONZO_TOKEN_FILE = path.join(DATA_DIR, 'monzo-tokens.json')
const monzoStates = new Set()

function readMonzoTokens() {
  try {
    return JSON.parse(fs.readFileSync(MONZO_TOKEN_FILE, 'utf8'))
  } catch {
    return null
  }
}

function writeMonzoTokens(tokens) {
  fs.writeFileSync(MONZO_TOKEN_FILE, JSON.stringify(tokens, null, 2), { mode: 0o600 })
}

async function monzoTokenCall(params) {
  const res = await fetch('https://api.monzo.com/oauth2/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams(params),
    signal: AbortSignal.timeout(15000),
  })
  const body = await res.json()
  if (!res.ok) throw new Error(body.message || body.code || `Monzo token error ${res.status}`)
  return body
}

/* Access tokens last a few hours; a confidential client can refresh them
   indefinitely, so the panel keeps working without Waleed signing in again. */
async function monzoAccessToken() {
  const t = readMonzoTokens()
  if (!t) return null
  if (Date.now() < t.expiresAt - 60_000) return t.accessToken
  if (!t.refreshToken) return null
  const cfg = monzoConfig()
  const fresh = await monzoTokenCall({
    grant_type: 'refresh_token',
    client_id: cfg.id,
    client_secret: cfg.secret,
    refresh_token: t.refreshToken,
  })
  const next = {
    accessToken: fresh.access_token,
    refreshToken: fresh.refresh_token || t.refreshToken,
    expiresAt: Date.now() + fresh.expires_in * 1000,
    connectedAt: t.connectedAt,
  }
  writeMonzoTokens(next)
  return next.accessToken
}

/* Monzo's "description" is often just the owner id (user_0000...) rather than
   anything a human would recognise, so fall back to the account type. */
const MONZO_TYPE_NAMES = {
  uk_retail: 'Personal current account',
  uk_retail_joint: 'Joint account',
  uk_retail_plus: 'Personal (Plus)',
  uk_business: 'Business current account',
  uk_monzo_flex: 'Flex',
  uk_prepaid: 'Prepaid card',
}

function monzoAccountName(a) {
  const d = (a.description || '').trim()
  const looksLikeAnId = !d || /^(user|acc)_[A-Za-z0-9]+$/.test(d)
  return looksLikeAnId ? MONZO_TYPE_NAMES[a.type] || a.type || 'Account' : d
}

/* Money in and out per month. Monzo's strong-customer-authentication rules cap
   unattended access at the last 90 days, so that is the honest window: no
   earlier history is available to us without Waleed signing in again. Declines
   and zero-amount entries are excluded because they never moved money. */
async function monzoCashflow(call, accountId) {
  const since = new Date(Date.now() - 89 * 864e5).toISOString()
  let all = []
  let cursor = null
  for (let page = 0; page < 8; page++) {
    const q = cursor
      ? `/transactions?account_id=${encodeURIComponent(accountId)}&since=${encodeURIComponent(cursor)}&limit=100`
      : `/transactions?account_id=${encodeURIComponent(accountId)}&since=${encodeURIComponent(since)}&limit=100`
    const r = await call(q)
    const batch = r.transactions || []
    all = all.concat(batch)
    if (batch.length < 100) break
    cursor = batch[batch.length - 1].id
  }

  const real = all.filter((t) => !t.decline_reason && t.amount !== 0)
  const byMonth = new Map()
  for (const t of real) {
    const key = t.created.slice(0, 7)
    if (!byMonth.has(key)) byMonth.set(key, { month: key, inflow: 0, outflow: 0 })
    const e = byMonth.get(key)
    if (t.amount > 0) e.inflow += t.amount
    else e.outflow += -t.amount
  }
  const monthly = [...byMonth.values()]
    .sort((a, b) => (a.month < b.month ? -1 : 1))
    .map((e) => ({ ...e, net: e.inflow - e.outflow }))

  const cutoff = new Date(Date.now() - 30 * 864e5).toISOString()
  const last30 = real.reduce(
    (acc, t) => {
      if (t.created < cutoff) return acc
      if (t.amount > 0) acc.inflow += t.amount
      else acc.outflow += -t.amount
      return acc
    },
    { inflow: 0, outflow: 0 }
  )
  last30.net = last30.inflow - last30.outflow

  return { monthly, last30, transactions: real.length, windowDays: 89 }
}

async function fetchMonzo() {
  const cfg = monzoConfig()
  if (!cfg.id || !cfg.secret) return { pending: 'config', redirect: MONZO_REDIRECT }

  let token = null
  try {
    token = await monzoAccessToken()
  } catch (err) {
    return { pending: 'auth', error: err.message }
  }
  if (!token) return { pending: 'auth' }

  const call = async (pathname) => {
    const res = await fetch(`https://api.monzo.com${pathname}`, {
      headers: { Authorization: `Bearer ${token}` },
      signal: AbortSignal.timeout(15000),
    })
    const body = await res.json().catch(() => ({}))
    if (!res.ok) {
      const err = new Error(body.message || body.code || `Monzo ${res.status}`)
      err.code = body.code || ''
      err.status = res.status
      throw err
    }
    return body
  }

  try {
    const { accounts } = await call('/accounts')
    const open = (accounts || []).filter((a) => !a.closed)
    const withBalances = []
    for (const a of open) {
      const b = await call(`/balance?account_id=${encodeURIComponent(a.id)}`)
      withBalances.push({
        name: monzoAccountName(a),
        kind: a.type && a.type.includes('business') ? 'business' : 'personal',
        balance: b.balance,
        totalBalance: b.total_balance,
        currency: b.currency,
        spendToday: b.spend_today,
      })
    }
    /* cashflow from the main account: the one the balances came from */
    let cashflow = null
    const main = open.find((a) => a.type === 'uk_business') || open[0]
    if (main) {
      try {
        cashflow = await monzoCashflow(call, main.id)
      } catch (err) {
        cashflow = { error: err.message }
      }
    }

    const tokens = readMonzoTokens()
    return {
      fetchedAt: new Date().toISOString(),
      connectedAt: tokens ? tokens.connectedAt : null,
      accounts: withBalances,
      cashflow,
      cashflowAccount: main ? monzoAccountName(main) : null,
    }
  } catch (err) {
    /* Monzo returns this until the sign in is approved in the phone app */
    if (err.status === 403 || (err.code && err.code.includes('insufficient_permissions'))) {
      return { pending: 'approval' }
    }
    return { error: err.message }
  }
}

function git(args) {
  return new Promise((resolve) => {
    execFile('git', args, { cwd: REPO_ROOT, timeout: 5000 }, (err, stdout) =>
      resolve(err ? null : stdout.trim())
    )
  })
}

/* Production tracks origin/main on Vercel, so "last site update" means the
   last pushed commit, not local HEAD. Unpushed local commits are surfaced
   separately rather than passed off as deployed. */
async function gitInfo() {
  const line = await git(['log', 'origin/main', '-1', '--format=%h|%ad|%s', '--date=format:%d %b %Y'])
  if (!line) return null
  const [hash, date, ...subject] = line.split('|')
  const ahead = await git(['rev-list', '--count', 'origin/main..main'])
  return { hash, date, subject: subject.join('|'), unpushed: ahead ? Number(ahead) : 0 }
}

async function fetchSite() {
  const started = Date.now()
  let up = false
  let status = null
  try {
    const res = await fetch('https://alevelaccelerators.com/', {
      signal: AbortSignal.timeout(8000),
    })
    up = res.ok
    status = res.status
  } catch {}
  return {
    up,
    status,
    ms: Date.now() - started,
    checkedAt: new Date().toISOString(),
    lastCommit: await gitInfo(),
  }
}

/* --------------------------------------------------------------- routing */

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
}

function sendJson(res, code, value) {
  const body = JSON.stringify(value)
  res.writeHead(code, { 'Content-Type': 'application/json; charset=utf-8' })
  res.end(body)
}

function sendFile(res, filePath) {
  fs.readFile(filePath, (err, buf) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' })
      return res.end('Not found')
    }
    res.writeHead(200, {
      'Content-Type': MIME[path.extname(filePath)] || 'application/octet-stream',
      'Cache-Control': 'no-store',
    })
    res.end(buf)
  })
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let raw = ''
    req.on('data', (chunk) => {
      raw += chunk
      if (raw.length > 2_000_000) reject(new Error('Body too large'))
    })
    req.on('end', () => resolve(raw))
    req.on('error', reject)
  })
}

async function handleApi(req, res, url) {
  const seg = url.pathname.split('/').filter(Boolean) // ['api', ...]

  if (seg[1] === 'mailerlite') {
    if (!ML_KEY) return sendJson(res, 200, { pending: true, reason: 'No MailerLite key found' })
    try {
      const fresh = url.searchParams.has('fresh')
      if (fresh) cache.delete('ml')
      return sendJson(res, 200, await cached('ml', 3 * 60_000, fetchMailerlite))
    } catch (err) {
      return sendJson(res, 200, { error: err.message })
    }
  }

  if (seg[1] === 'stripe') {
    try {
      return sendJson(res, 200, await cached('stripe', 3 * 60_000, fetchStripe))
    } catch (err) {
      return sendJson(res, 200, { pending: true, error: err.message })
    }
  }

  /* Monzo sign in: Waleed clicks Connect, Monzo emails him a magic link and
     asks his phone to approve. This server never sees his password. */
  if (seg[1] === 'monzo' && seg[2] === 'connect') {
    const cfg = monzoConfig()
    if (!cfg.id) return sendJson(res, 400, { error: 'No MONZO_CLIENT_ID in dashboard/.env' })
    const state = crypto.randomUUID()
    monzoStates.add(state)
    const auth =
      'https://auth.monzo.com/?' +
      new URLSearchParams({
        client_id: cfg.id,
        redirect_uri: MONZO_REDIRECT,
        response_type: 'code',
        state,
      })
    res.writeHead(302, { Location: auth })
    return res.end()
  }

  if (seg[1] === 'monzo' && seg[2] === 'callback') {
    const code = url.searchParams.get('code')
    const state = url.searchParams.get('state')
    const page = (msg) =>
      `<!doctype html><meta charset="utf-8"><body style="font-family:-apple-system,sans-serif;background:#f8f3e9;color:#1a1535;padding:3rem;max-width:34rem;margin:0 auto"><h1 style="font-family:Georgia,serif;font-weight:normal">Monzo</h1><p>${msg}</p><p><a href="/" style="color:#a87f2f">Back to the dashboard</a></p></body>`
    if (!code || !state || !monzoStates.has(state)) {
      res.writeHead(400, { 'Content-Type': 'text/html; charset=utf-8' })
      return res.end(page('That sign in did not complete. Close this tab and press Connect Monzo again.'))
    }
    monzoStates.delete(state)
    try {
      const cfg = monzoConfig()
      const t = await monzoTokenCall({
        grant_type: 'authorization_code',
        client_id: cfg.id,
        client_secret: cfg.secret,
        redirect_uri: MONZO_REDIRECT,
        code,
      })
      writeMonzoTokens({
        accessToken: t.access_token,
        refreshToken: t.refresh_token || null,
        expiresAt: Date.now() + t.expires_in * 1000,
        connectedAt: new Date().toISOString(),
      })
      cache.delete('monzo')
      res.writeHead(302, { Location: '/' })
      return res.end()
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' })
      return res.end(page(`Monzo refused the sign in: ${err.message}`))
    }
  }

  if (seg[1] === 'monzo' && seg[2] === 'disconnect' && req.method === 'POST') {
    try {
      fs.unlinkSync(MONZO_TOKEN_FILE)
    } catch {}
    cache.delete('monzo')
    return sendJson(res, 200, { ok: true })
  }

  if (seg[1] === 'monzo') {
    try {
      if (url.searchParams.has('fresh')) cache.delete('monzo')
      return sendJson(res, 200, await cached('monzo', 60_000, fetchMonzo))
    } catch (err) {
      return sendJson(res, 200, { error: err.message })
    }
  }

  if (seg[1] === 'site') {
    try {
      return sendJson(res, 200, await cached('site', 60_000, fetchSite))
    } catch (err) {
      return sendJson(res, 200, { error: err.message })
    }
  }

  if (seg[1] === 'store' && STORES.includes(seg[2])) {
    if (req.method === 'GET') {
      return sendJson(res, 200, readStore(seg[2], []))
    }
    if (req.method === 'PUT') {
      try {
        const parsed = JSON.parse(await readBody(req))
        writeStore(seg[2], parsed)
        return sendJson(res, 200, { ok: true })
      } catch (err) {
        return sendJson(res, 400, { error: err.message })
      }
    }
  }

  /* Compact summary for the phone widget: open tasks, today's calendar and
     the headline numbers, all from the same honest sources as the panels. */
  if (seg[1] === 'widget') {
    const allTasks = readStore('tasks', [])
    const open = allTasks.filter((t) => !t.done)
    const today = new Date().toISOString().slice(0, 10)
    const cal = readStore('calendar', null)
    const events = (cal && cal.extractedAt && cal.events ? cal.events : [])
      .filter((e) => e.start.slice(0, 10) === today)
      .map((e) => ({ start: e.start, title: e.title }))
    const snap = readStore('stripe-snapshot', null)
    let active = null
    if (ML_KEY) {
      try {
        active = (await cached('ml', 3 * 60_000, fetchMailerlite)).active
      } catch {}
    }
    const resultsDay = Math.ceil((new Date('2026-08-13T00:00:00') - Date.now()) / 86400000)
    return sendJson(res, 200, {
      updatedAt: new Date().toISOString(),
      openTasks: open.length,
      tasks: open.slice(0, 4).map((t) => ({ title: t.title, due: t.due })),
      todayEvents: events,
      activeSubscribers: active,
      stripeBalance: snap ? snap.balanceAvailable : null,
      lastSale: snap ? snap.lastSale : null,
      daysToResultsDay: resultsDay,
    })
  }

  if (seg[1] === 'connections') {
    const has = (name, test) => {
      const v = readStore(name, null)
      return v && (!test || test(v))
    }
    return sendJson(res, 200, {
      mailerlite: ML_KEY ? 'live' : 'pending',
      stripe: STRIPE_KEY ? 'live' : has('stripe-snapshot') ? 'snapshot' : 'pending',
      site: 'live',
      linkedin: has('linkedin', (v) => v.extractedAt) ? 'extracted' : 'manual',
      facebook: has('facebook', (v) => v.extractedAt) ? 'extracted' : 'pending',
      gmail: has('gmail') ? 'extracted' : 'pending',
      calendar: has('calendar') ? 'extracted' : 'pending',
      bank: !monzoConfig().id ? 'pending' : readMonzoTokens() ? 'live' : 'needs sign in',
    })
  }

  sendJson(res, 404, { error: 'Unknown endpoint' })
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`)

  /* Token gate for non-loopback visitors when HQ_TOKEN is set. Opening
     /?key=TOKEN once plants a year-long cookie; the Monzo callback is exempt
     because Monzo's redirect cannot carry the cookie. */
  if (HQ_TOKEN && !isLoopback(req) && url.pathname !== '/api/monzo/callback') {
    const cookieOk = (req.headers.cookie || '').split(/;\s*/).includes(`hq=${HQ_TOKEN}`)
    const keyOk = url.searchParams.get('key') === HQ_TOKEN
    if (keyOk && !cookieOk) {
      url.searchParams.delete('key')
      res.writeHead(302, {
        'Set-Cookie': `hq=${HQ_TOKEN}; Path=/; Max-Age=31536000; HttpOnly; SameSite=Lax`,
        Location: url.pathname + (url.searchParams.size ? `?${url.searchParams}` : ''),
      })
      return res.end()
    }
    if (!cookieOk && !keyOk) {
      res.writeHead(401, { 'Content-Type': 'text/plain; charset=utf-8' })
      return res.end('Private dashboard. Open it once as /?key=YOUR_TOKEN to unlock this device.')
    }
  }

  if (url.pathname.startsWith('/api/')) {
    try {
      return await handleApi(req, res, url)
    } catch (err) {
      return sendJson(res, 500, { error: err.message })
    }
  }

  /* Static files, locked inside ./public */
  const rel = url.pathname === '/' ? 'index.html' : url.pathname.slice(1)
  const filePath = path.normalize(path.join(PUBLIC_DIR, rel))
  if (!filePath.startsWith(PUBLIC_DIR)) {
    res.writeHead(403)
    return res.end('Forbidden')
  }
  sendFile(res, filePath)
})

ensureData()

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use. Is the dashboard already running?`)
    process.exit(1)
  }
  throw err
})

server.listen(PORT, HOST, () => {
  console.log('')
  console.log('  A-Level Accelerators HQ')
  console.log(`  http://${HOST}:${PORT}`)
  console.log('')
  console.log(`  MailerLite: ${ML_KEY ? 'connected' : 'no key found'}`)
  console.log(`  Stripe:     ${STRIPE_KEY ? 'connected' : 'snapshot (add STRIPE_KEY to dashboard/.env for always-on)'}`)
  console.log(
    `  Monzo:      ${
      !monzoConfig().id
        ? 'pending (add MONZO_CLIENT_ID and MONZO_CLIENT_SECRET to dashboard/.env)'
        : readMonzoTokens()
          ? 'connected'
          : 'waiting for you to press Connect Monzo on the Bank panel'
    }`
  )
  if (HOST === '127.0.0.1') {
    console.log('  Private:    bound to 127.0.0.1 only (phones reach it through Tailscale)')
  } else if (HQ_TOKEN) {
    console.log(`  Network:    listening on ${HOST}, guarded by HQ_TOKEN`)
  } else {
    console.log(`  WARNING:    listening on ${HOST} with NO HQ_TOKEN set.`)
    console.log('              Anyone on this network can open the dashboard. Add HQ_TOKEN to .env.')
  }
  console.log('')
})
