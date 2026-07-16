// A-Level Accelerators HQ, iPhone home screen widget.
// Runs inside the free Scriptable app, because iOS only lets native apps put
// widgets on the home screen and Scriptable is the native app that renders
// this script.
//
// Setup, once:
//   1. Install "Scriptable" (free) from the App Store.
//   2. In Scriptable: + to make a new script, paste this whole file in,
//      name it HQ.
//   3. Change BASE below to your dashboard address. With Tailscale that is
//      something like https://waleeds-mac-mini.tailXXXX.ts.net
//      On home Wi-Fi mode it is http://YOUR-MAC-IP:4400 and KEY must match
//      the HQ_TOKEN in dashboard/.env.
//   4. Long-press the home screen, +, search Scriptable, add the medium
//      widget, tap it while wobbling, set Script to HQ.
//
// iOS decides when widgets refresh (roughly every 15 to 60 minutes). Tapping
// the widget opens the full dashboard app.

const BASE = "https://your-mac.your-tailnet.ts.net"
const KEY = ""

const PURPLE = new Color("#2e2557")
const CREAM = new Color("#fbf8f3")
const GOLD = new Color("#c9a96e")
const MUTED = new Color("#a89fce")
const GREEN = new Color("#8ecfa8")

async function fetchSummary() {
  const req = new Request(`${BASE}/api/widget${KEY ? `?key=${encodeURIComponent(KEY)}` : ""}`)
  req.timeoutInterval = 12
  return await req.loadJSON()
}

function gbp(pence) {
  return "£" + (pence / 100).toLocaleString("en-GB", { maximumFractionDigits: 0 })
}

const w = new ListWidget()
w.backgroundColor = PURPLE
w.url = BASE
w.setPadding(14, 16, 12, 16)

const header = w.addText("A-LEVEL HQ")
header.font = Font.boldSystemFont(10)
header.textColor = GOLD
w.addSpacer(6)

try {
  const d = await fetchSummary()

  if (d.tasks && d.tasks.length) {
    for (const t of d.tasks.slice(0, 3)) {
      const line = w.addText("○ " + t.title)
      line.font = Font.mediumSystemFont(12)
      line.textColor = CREAM
      line.lineLimit = 1
      w.addSpacer(3)
    }
    if (d.openTasks > 3) {
      const more = w.addText(`and ${d.openTasks - 3} more`)
      more.font = Font.systemFont(10)
      more.textColor = MUTED
    }
  } else {
    const clear = w.addText("No open tasks. Genuinely quiet.")
    clear.font = Font.mediumSystemFont(12)
    clear.textColor = GREEN
  }

  if (d.todayEvents && d.todayEvents.length) {
    w.addSpacer(4)
    const e = d.todayEvents[0]
    const time = new Date(e.start).toLocaleTimeString("en-GB", { hour: "numeric", minute: "2-digit" })
    const ev = w.addText(`⏰ ${time} ${e.title}`)
    ev.font = Font.systemFont(10)
    ev.textColor = GOLD
    ev.lineLimit = 1
  }

  w.addSpacer()
  const stats = []
  if (d.activeSubscribers != null) stats.push(`${d.activeSubscribers} subs`)
  if (d.stripeBalance != null) stats.push(gbp(d.stripeBalance) + " held")
  if (d.daysToResultsDay > 0) stats.push(`${d.daysToResultsDay}d to results`)
  const foot = w.addText(stats.join("  ·  "))
  foot.font = Font.systemFont(10)
  foot.textColor = MUTED
} catch (e) {
  const err = w.addText("HQ unreachable")
  err.font = Font.mediumSystemFont(13)
  err.textColor = CREAM
  w.addSpacer(4)
  const why = w.addText("Mac awake? Dashboard running? Tailscale on?")
  why.font = Font.systemFont(10)
  why.textColor = MUTED
}

w.refreshAfterDate = new Date(Date.now() + 15 * 60 * 1000)

if (config.runsInWidget) {
  Script.setWidget(w)
} else {
  w.presentMedium()
}
Script.complete()
