/* A-Level Accelerators HQ service worker.
   Network first everywhere: the dashboard is live data, so the cache exists
   only to open the shell and say "unreachable" honestly when the Mac is off.
   API responses are never cached; a stale number shown as live would break
   the dashboard's one rule. */

const VERSION = 'hq-v1'
const SHELL = ['/', '/styles.css', '/app.js', '/manifest.webmanifest', '/offline.html', '/icons/icon-192.png']

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(VERSION).then((cache) => cache.addAll(SHELL)).then(() => self.skipWaiting())
  )
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  )
})

self.addEventListener('fetch', (event) => {
  const req = event.request
  if (req.method !== 'GET') return
  const url = new URL(req.url)

  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      fetch(req).catch(
        () =>
          new Response(JSON.stringify({ error: 'Your Mac is unreachable right now' }), {
            status: 503,
            headers: { 'Content-Type': 'application/json' },
          })
      )
    )
    return
  }

  event.respondWith(
    fetch(req)
      .then((res) => {
        if (res.ok && url.origin === self.location.origin) {
          const copy = res.clone()
          caches.open(VERSION).then((cache) => cache.put(req, copy))
        }
        return res
      })
      .catch(async () => {
        const hit = await caches.match(req)
        if (hit) return hit
        if (req.mode === 'navigate') return caches.match('/offline.html')
        return Response.error()
      })
  )
})
