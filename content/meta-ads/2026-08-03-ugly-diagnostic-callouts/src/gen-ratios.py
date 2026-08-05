#!/usr/bin/env python3
"""Multi-ratio build of the callout cards (Waleed, 5 August 2026).

Five questions x two styles x three Meta ratios, into ../final-ratios/:
  1x1  = 1080x1080  (feed square)
  191  = 1200x628   (right column, search, wide crop)
  9x16 = 1080x1920  (Stories and Reels)

The trailing "?" now sits INSIDE the highlight: Waleed flagged a bare question mark
left outside as awkward. Text stays the only thing on the card, no CTA, no URL.
9:16 keeps the text in the middle band so Meta's Stories UI cannot cover it.
"""
import os, subprocess, tempfile, pathlib

CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
OUT = pathlib.Path(__file__).resolve().parent.parent / "final-ratios"
OUT.mkdir(exist_ok=True)

# ratio -> (w, h, strip_font, strip_pad, tag_font, tag_pad, size_big, size_mid, size_small)
RATIOS = {
    "1x1":  (1080, 1080, 38, 26, 28, "14px 26px", 104, 88, 78),
    "191":  (1200,  628, 30, 17, 22, "11px 20px",  80, 70, 60),
    "9x16": (1080, 1920, 42, 34, 32, "16px 30px", 112, 96, 84),
}

# (slug, prefix, key phrase incl. the question mark)
QUESTIONS = [
    ("01-general",             "Is your child studying for",   "their A-levels?"),
    ("02-y13",                 "Is your child going into",     "Year 13?"),
    ("03-struggling-maths",    "Is your child struggling with", "A-level Maths?"),
    ("04-struggling-biology",  "Is your child struggling with", "A-level Biology?"),
    ("05-struggling-chemistry","Is your child struggling with", "A-level Chemistry?"),
]

MARKER = """<!DOCTYPE html><html><head><meta charset="utf-8"><style>
* {{ margin:0; padding:0; box-sizing:border-box; }}
html,body {{ width:{w}px; height:{h}px; overflow:hidden; }}
.ad {{ width:{w}px; height:{h}px; background:#ffffff; display:flex; flex-direction:column;
      font-family:-apple-system,'Helvetica Neue',Arial,sans-serif; }}
.strip {{ background:#c62828; color:#ffffff; text-align:center; font-weight:800;
      font-size:{sf}px; letter-spacing:0.06em; padding:{sp}px 0; }}
.body {{ flex:1; display:flex; align-items:center; justify-content:center;
      padding:0 {pad}px; text-align:center; }}
h1 {{ font-weight:900; font-size:{fs}px; line-height:1.18; color:#111111; }}
mark {{ background:#ffe872; padding:0 12px; }}
</style></head><body><div class="ad">
<div class="strip">ATTENTION: UK PARENTS</div>
<div class="body"><h1>{prefix}<br><mark>{key}</mark></h1></div>
</div></body></html>"""

UNDERLINE = """<!DOCTYPE html><html><head><meta charset="utf-8"><style>
* {{ margin:0; padding:0; box-sizing:border-box; }}
html,body {{ width:{w}px; height:{h}px; overflow:hidden; }}
.ad {{ width:{w}px; height:{h}px; background:#ffffff; display:flex; flex-direction:column;
      justify-content:center; padding:{pad}px; position:relative;
      font-family:-apple-system,'Helvetica Neue',Arial,sans-serif; }}
.tag {{ position:absolute; top:{pad}px; left:{pad}px; background:#2E2557; color:#F3EBD8;
      font-weight:700; font-size:{tf}px; letter-spacing:0.1em; padding:{tp}; }}
h1 {{ font-weight:900; font-size:{fs}px; line-height:1.22; color:#111111; text-align:left; }}
.key {{ box-shadow: inset 0 -16px 0 0 rgba(46,37,87,0.25); }}
</style></head><body><div class="ad">
<div class="tag">FOR UK PARENTS</div>
<h1>{prefix}<br><span class="key">{key}</span></h1>
</div></body></html>"""

def font(ratio, prefix, key):
    _, _, _, _, _, _, big, mid, small = RATIOS[ratio]
    n = len(prefix) + len(key)
    if n > 46: return small
    if n > 38: return mid
    return big

def render(html, path):
    with tempfile.NamedTemporaryFile("w", suffix=".html", delete=False) as f:
        f.write(html); tmp = f.name
    w, h = html.split("width:")[1].split("px")[0], html.split("height:")[1].split("px")[0]
    subprocess.run([CHROME, "--headless", "--disable-gpu", "--hide-scrollbars",
                    f"--screenshot={path}", f"--window-size={w},{h}", f"file://{tmp}"],
                   capture_output=True)
    os.unlink(tmp)

count = 0
for slug, prefix, key in QUESTIONS:
    for ratio, (w, h, sf, sp, tf, tp, *_ ) in RATIOS.items():
        fs = font(ratio, prefix, key)
        pad = 90 if ratio != "191" else 56
        render(MARKER.format(w=w, h=h, sf=sf, sp=sp, pad=pad, fs=fs, prefix=prefix, key=key),
               OUT / f"{slug}-marker-{ratio}.png")
        render(UNDERLINE.format(w=w, h=h, tf=tf, tp=tp, pad=pad, fs=fs, prefix=prefix, key=key),
               OUT / f"{slug}-underline-{ratio}.png")
        count += 2
    print(f"{slug}: 6 files")
print(f"\n{count} files in {OUT}")
