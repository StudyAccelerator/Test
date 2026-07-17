#!/usr/bin/env node
/*
 * A-Level Accelerators CONTENT HQ. Private local server, separate from the
 * business HQ dashboard (dashboard/, port 4400) on Waleed's instruction.
 *
 * This one runs the short-form content operation: the education-creator
 * radar (who is winning on TikTok and Instagram, which posts overperformed),
 * the playbook of what is working right now, and the ready-to-shoot content
 * pipeline. Zero dependencies, binds to 127.0.0.1 only, never deployed.
 *
 *   /api/store/:name  local JSON stores in content-hq/data/ (gitignored,
 *                     seeded from content-hq/seed/ on first run)
 *   /api/meta         countdown facts + store freshness for the top bar
 *
 * The stores are refreshed by the viral-content-radar skill (three sweeps a
 * day via the scheduled task viral-content-radar-3x). The honesty rule from
 * the main HQ applies here too: no invented numbers, every extracted figure
 * carries its date and source, failed sweeps say they failed.
 */

const http = require('node:http')
const fs = require('node:fs')
const path = require('node:path')

const PORT = Number(process.env.PORT || 4500)
const ROOT = __dirname
const PUBLIC_DIR = path.join(ROOT, 'public')
const DATA_DIR = path.join(ROOT, 'data')
const SEED_DIR = path.join(ROOT, 'seed')

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
const HOST = env.HQ_HOST || '127.0.0.1'
const HQ_TOKEN = env.HQ_TOKEN || null

function isLoopback(req) {
  const a = req.socket.remoteAddress || ''
  return a === '127.0.0.1' || a === '::1' || a === '::ffff:127.0.0.1'
}

/* ------------------------------------------------------------ local data */

const STORES = ['creators', 'outliers', 'playbook', 'pipeline', 'sweeps', 'channels']

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

/* --------------------------------------------------------------- routing */

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.ico': 'image/x-icon',
}

function sendJson(res, code, value) {
  res.writeHead(code, { 'Content-Type': 'application/json; charset=utf-8' })
  res.end(JSON.stringify(value))
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
      if (raw.length > 4_000_000) reject(new Error('Body too large'))
    })
    req.on('end', () => resolve(raw))
    req.on('error', reject)
  })
}

async function handleApi(req, res, url) {
  const seg = url.pathname.split('/').filter(Boolean) // ['api', ...]

  if (seg[1] === 'store' && STORES.includes(seg[2])) {
    if (req.method === 'GET') return sendJson(res, 200, readStore(seg[2], null))
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

  /* Freshness of every store plus the countdown facts the top bar shows. */
  if (seg[1] === 'meta') {
    const freshness = {}
    for (const name of STORES) {
      try {
        freshness[name] = fs.statSync(path.join(DATA_DIR, `${name}.json`)).mtime.toISOString()
      } catch {
        freshness[name] = null
      }
    }
    const daysTo = (iso) => Math.ceil((new Date(`${iso}T08:00:00`) - Date.now()) / 86400000)
    return sendJson(res, 200, {
      now: new Date().toISOString(),
      freshness,
      daysToResultsDay: daysTo('2026-08-13'),
      daysToGcseResults: daysTo('2026-08-20'),
    })
  }

  sendJson(res, 404, { error: 'Unknown endpoint' })
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`)

  /* Same token gate as the main HQ for non-loopback visitors (Tailscale
     connects locally, so the default loopback bind already covers phones). */
  if (HQ_TOKEN && !isLoopback(req)) {
    const cookieOk = (req.headers.cookie || '').split(/;\s*/).includes(`chq=${HQ_TOKEN}`)
    const keyOk = url.searchParams.get('key') === HQ_TOKEN
    if (keyOk && !cookieOk) {
      url.searchParams.delete('key')
      res.writeHead(302, {
        'Set-Cookie': `chq=${HQ_TOKEN}; Path=/; Max-Age=31536000; HttpOnly; SameSite=Lax`,
        Location: url.pathname + (url.searchParams.size ? `?${url.searchParams}` : ''),
      })
      return res.end()
    }
    if (!cookieOk && !keyOk) {
      res.writeHead(401, { 'Content-Type': 'text/plain; charset=utf-8' })
      return res.end('Private content HQ. Open it once as /?key=YOUR_TOKEN to unlock this device.')
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
  const rel = url.pathname === '/' ? 'index.html' : decodeURIComponent(url.pathname.slice(1))
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
    console.error(`Port ${PORT} is already in use. Is the content HQ already running?`)
    process.exit(1)
  }
  throw err
})

server.listen(PORT, HOST, () => {
  console.log('')
  console.log('  A-Level Accelerators CONTENT HQ')
  console.log(`  http://${HOST}:${PORT}`)
  console.log('')
  console.log('  Radar data refreshes via the viral-content-radar skill (3 sweeps a day).')
  if (HOST === '127.0.0.1') console.log('  Private: bound to 127.0.0.1 only.')
  console.log('')
})
