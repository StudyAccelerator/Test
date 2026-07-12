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
const { execFile } = require('node:child_process')

const HOST = '127.0.0.1'
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

const STORES = ['tasks', 'projects', 'subscriptions', 'linkedin', 'competitors', 'history']

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
  const [groupsRes, totalRes, automationsRes, campaignsRes] = await Promise.all([
    ml('/groups?limit=50&sort=-active_count'),
    ml('/subscribers?limit=0'),
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
    groups: Object.fromEntries(groups.map((g) => [g.id, g.active])),
  }
  const existing = history.findIndex((h) => h.date === today)
  if (existing >= 0) history[existing] = snapshot
  else history.push(snapshot)
  writeStore('history', history)

  return payload
}

async function fetchStripe() {
  if (!STRIPE_KEY) return { pending: true }

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

  if (seg[1] === 'connections') {
    return sendJson(res, 200, {
      mailerlite: ML_KEY ? 'live' : 'pending',
      stripe: STRIPE_KEY ? 'live' : 'pending',
      site: 'live',
      linkedin: 'manual',
      facebook: 'pending',
      gmail: 'pending',
      bank: 'pending',
    })
  }

  sendJson(res, 404, { error: 'Unknown endpoint' })
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`)

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
  console.log(`  Stripe:     ${STRIPE_KEY ? 'connected' : 'pending (add STRIPE_KEY to dashboard/.env)'}`)
  console.log('  Private:    bound to 127.0.0.1 only')
  console.log('')
})
