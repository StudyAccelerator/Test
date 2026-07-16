#!/bin/sh
# Render a Deck Studio HTML deck to a 16:9 PDF with headless Chrome.
# Usage: scripts/render-deck.sh <path/to/deck.html> [output.pdf]
# The deck's own @page rule sets the 1280x720 slide size.
set -e

IN="$1"
if [ -z "$IN" ] || [ ! -f "$IN" ]; then
  echo "usage: scripts/render-deck.sh <deck.html> [output.pdf]" >&2
  exit 1
fi
OUT="${2:-$(dirname "$IN")/deck.pdf}"
ABS_IN="$(cd "$(dirname "$IN")" && pwd)/$(basename "$IN")"

"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless --disable-gpu --no-pdf-header-footer \
  --print-to-pdf="$OUT" "file://$ABS_IN"

echo "Rendered $OUT"
