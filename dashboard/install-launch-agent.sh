#!/bin/bash
# Keeps the HQ dashboard running on this Mac as a user LaunchAgent
# (7 October 2026, Waleed's ask: the HQ should be a URL that is simply there,
# not a terminal he has to start). launchd starts it at login, restarts it if
# it ever dies, and logs to dashboard/data/hq.log. Run once:
#   bash dashboard/install-launch-agent.sh
# Remove with:  bash dashboard/install-launch-agent.sh --uninstall
set -euo pipefail
LABEL="com.alevelaccelerators.hq"
PLIST="$HOME/Library/LaunchAgents/$LABEL.plist"
HERE="$(cd "$(dirname "$0")" && pwd)"
NODE="$(command -v node || echo /usr/local/bin/node)"
UID_NUM="$(id -u)"

if [ "${1:-}" = "--uninstall" ]; then
  launchctl bootout "gui/$UID_NUM" "$PLIST" 2>/dev/null || true
  rm -f "$PLIST"
  echo "HQ launch agent removed. The server stops at next logout, or kill it now: pkill -f 'dashboard/server.js'"
  exit 0
fi

mkdir -p "$HOME/Library/LaunchAgents" "$HERE/data"
cat > "$PLIST" <<PL
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key><string>$LABEL</string>
  <key>ProgramArguments</key>
  <array>
    <string>$NODE</string>
    <string>$HERE/server.js</string>
  </array>
  <key>WorkingDirectory</key><string>$HERE/..</string>
  <key>EnvironmentVariables</key>
  <dict><key>PATH</key><string>/usr/local/bin:/opt/homebrew/bin:/usr/bin:/bin</string></dict>
  <key>RunAtLoad</key><true/>
  <key>KeepAlive</key><true/>
  <key>ThrottleInterval</key><integer>10</integer>
  <key>StandardOutPath</key><string>$HERE/data/hq.log</string>
  <key>StandardErrorPath</key><string>$HERE/data/hq.log</string>
</dict>
</plist>
PL

# a server started by hand would hold the port; stop it so launchd owns it
pkill -f "dashboard/server.js" 2>/dev/null || true
sleep 1
launchctl bootout "gui/$UID_NUM" "$PLIST" 2>/dev/null || true
launchctl bootstrap "gui/$UID_NUM" "$PLIST"
launchctl enable "gui/$UID_NUM/$LABEL"
sleep 2
if curl -sf -o /dev/null http://127.0.0.1:4400/api/site; then
  echo "HQ is running and will start itself at every login: http://localhost:4400"
else
  echo "Installed, but the server has not answered yet. Check $HERE/data/hq.log"
fi
