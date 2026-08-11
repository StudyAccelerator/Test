#!/usr/bin/env python3
"""Paid-programme callouts, auto-fitting build (Waleed, 5 August 2026).

Fixes two things he flagged:
  1. Type now AUTO-FITS. A binary search in the page grows the font until the text
     block exactly fills its box, so no ratio is ever left with dead space. On 9:16
     the line box is deliberately narrowed so the words wrap into more lines and
     fill the tall canvas instead of sitting in a band in the middle.
  2. His face is now big and sharp. The source still is 1920x1080 and a square crop
     of his head is about 768px, so a 400 to 560px circle is a downscale (crisp);
     the old 250px badge was throwing detail away, which is what read as blurry.

Face layout per ratio, chosen so the photo never pushes text about or leaves a gap:
  1x1 and 9x16 - text fills the upper zone, face circle centred in a lower band
  191          - text fills the left, face circle fills the right

Run: python3 gen-fill.py   ->   ../final-ratios/
"""
import os, subprocess, tempfile, pathlib

CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
HERE = pathlib.Path(__file__).resolve().parent
OUT = HERE.parent / "final-ratios"
OUT.mkdir(exist_ok=True)
FACE = HERE / "waleed-scrubs-desk.jpg"

# ratio -> (w, h, pad, text_width_pct, badge_px)
RATIOS = {
    "1x1":  (1080, 1080, 70, 100, 400),
    "9x16": (1080, 1920, 80,  80, 560),
    "191":  (1200,  628, 55, 100, 470),
}

TPL = """<!DOCTYPE html><html><head><meta charset="utf-8"><style>
* {{ margin:0; padding:0; box-sizing:border-box; }}
html,body {{ width:{w}px; height:{h}px; overflow:hidden; }}
.ad {{ width:{w}px; height:{h}px; background:#ffffff; padding:{pad}px;
      display:flex; flex-direction:{dir}; align-items:center; gap:{gap}px;
      font-family:-apple-system,'Helvetica Neue',Arial,sans-serif; }}
#box {{ width:{bw}px; height:{bh}px; overflow:hidden;
      display:flex; align-items:center; justify-content:center; }}
#t {{ font-weight:900; line-height:1.14; color:#111111; text-align:center;
      max-width:{tw}%; }}
mark {{ background:#ffe872; padding:0 12px; }}
.nb {{ white-space:nowrap; }}
.badge {{ width:{bd}px; height:{bd}px; border-radius:50%; flex:none;
      border:10px solid #111111; background-image:url('{face}');
      background-size:{bgs}%; background-position:{bgp}; }}
</style></head><body><div class="ad">
<div id="box"><h1 id="t">{text}</h1></div>{badge}
</div>
<script>
(function(){{
  var box=document.getElementById('box'), t=document.getElementById('t');
  var lo=10, hi=700;
  for(var i=0;i<60;i++){{
    var mid=(lo+hi)/2;
    t.style.fontSize=mid+'px';
    if(t.scrollHeight<=box.clientHeight && t.scrollWidth<=box.clientWidth) lo=mid; else hi=mid;
  }}
  t.style.fontSize=lo+'px';
}})();
</script></body></html>"""

# (slug, prefix, key, suffix, styles)
ROWS = [
    ("01-five-students", "We're taking on", "5 New A-level Students", " for September",
     ["marker", "plain", "face"]),
    ("02-achieve-astar", "Want a doctor to help your child", "achieve A*", "",
     ["plain", "face"]),
    ("03-predicted-grades", "Work with a doctor on your child's", "predicted grades", "",
     ["plain", "face"]),
    ("04-y12", "Is your child going into", "Year 12?", "", ["marker", "plain", "face"]),
    ("05-y13", "Is your child going into", "Year 13?", "", ["marker", "plain", "face"]),
    ("06-maths", "Is your child studying", "A-level Maths?", "", ["marker", "plain", "face"]),
    ("07-chemistry", "Is your child studying", "A-level Chemistry?", "", ["marker", "plain", "face"]),
    ("08-biology", "Is your child studying", "A-level Biology?", "", ["marker", "plain", "face"]),
    ("09-astar-grades", "Want a Doctor to Help Your Child Achieve", "A* Grades", " at A-levels?",
     ["plain", "face"]),
    ("10-alevel-grades", "Work with a doctor on your child's", "A-level grades", "",
     ["plain", "face"]),
]
def nb(s):
    """Wrap hyphenated tokens so they never break across lines."""
    return " ".join(f'<span class="nb">{w}</span>' if "-" in w else w for w in s.split(" "))

FACE_KEEPS_MARK = {"01-five-students", "04-y12", "05-y13", "06-maths", "07-chemistry", "08-biology"}

def render(html, path, w, h):
    with tempfile.NamedTemporaryFile("w", suffix=".html", delete=False) as f:
        f.write(html); tmp = f.name
    subprocess.run([CHROME, "--headless", "--disable-gpu", "--hide-scrollbars",
                    "--virtual-time-budget=3000",
                    f"--screenshot={path}", f"--window-size={w},{h}", f"file://{tmp}"],
                   capture_output=True)
    os.unlink(tmp)

count = 0
for slug, pre, key, suf, styles in ROWS:
    for style in styles:
        marked = style == "marker" or (style == "face" and slug in FACE_KEEPS_MARK)
        P, K, S = nb(pre), nb(key), nb(suf)
        text = f"{P} <mark>{K}</mark>{S}" if marked else f"{P} {K}{S}"
        for ratio, (w, h, pad, tw, bd) in RATIOS.items():
            face = style == "face"
            inner_w, inner_h = w - pad*2, h - pad*2
            gap = 40 if face else 0
            if not face:
                dir_, bw, bh, badge = "column", inner_w, inner_h, ""
            elif ratio == "191":
                dir_, bw, bh = "row", inner_w - bd - gap, inner_h
                badge = '<div class="badge"></div>'
            else:
                dir_, bw, bh = "column", inner_w, inner_h - bd - gap
                badge = '<div class="badge"></div>'
            html = TPL.format(w=w, h=h, pad=pad, dir=dir_, gap=gap, bw=bw, bh=bh,
                              tw=tw if not face else 100, bd=bd,
                              bgs=235, bgp="53% 17%", face=FACE.as_uri(),
                              text=text, badge=badge)
            render(html, OUT / f"{slug}-{style}-{ratio}.png", w, h)
            count += 1
    print(f"{slug}: {', '.join(styles)}")
print(f"\n{count} files in {OUT}")
