#!/usr/bin/env python3
"""Round 2 creative test: photo-led cards (27 August 2026).

The August test proved the formula: Waleed's real photo converts (30 of 36
leads, 7.26 CPL) and pain-word callouts beat neutral ones. So every card in
this build is photo-led, with the callout on a clean panel so no word is ever
lost on a busy background.

Layouts per ratio:
  1x1  1080x1080  photo top 52 percent, text panel below
  4x5  1080x1350  photo top 55 percent, text panel below (Meta's preferred feed ratio)
  9x16 1080x1920  full-bleed photo, dark gradient, text in the lower-middle band
                  (kept clear of Stories UI top/bottom chrome)
  191  1200x628   text left, photo right

Run:  python3 gen.py     (renders every concept x every ratio into ../final/)
"""
import os, re, subprocess, tempfile, pathlib

CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
HERE = pathlib.Path(__file__).resolve().parent
OUT = HERE.parent / "final"
OUT.mkdir(exist_ok=True)

PHOTOS = {
    "scrubs":   HERE.parent.parent / "2026-07-27-parents-diagnostic-launch/creative-src/waleed-scrubs-desk.jpg",
    "pointing": HERE.parent.parent / "2026-07-27-parents-diagnostic-launch/creative-src/waleed-polo-pointing.png",
    "notebook": HERE.parent.parent / "2026-07-27-parents-diagnostic-launch/creative-src/waleed-polo-notebook.png",
}

CRED = "Dr Waleed Ahmad &middot; NHS Doctor &middot; 1,000+ A-level students"

# slug, photo, pre-highlight text, highlighted phrase, post-highlight text
CONCEPTS = [
    # BOOK A CALL funnel
    ("c1-roadmap",        "scrubs",   "Want a doctor to build your child's", "personal roadmap", "to A*s?"),
    ("c2-free-call",      "scrubs",   "Book a", "free 30 minute call", "with an NHS doctor about your child's A-levels"),
    ("c3-stuck-call",     "pointing", "Is your child", "stuck on the same grade?", "I'll find out why. One free call."),
    ("c4-bring-child",    "notebook", "One call. You, your child, and", "a doctor's plan", "for their grades."),
    # DIAGNOSTIC funnel
    ("d1-stuck-grade",    "scrubs",   "Is your child revising hard but", "stuck on the same grade?", ""),
    ("d2-mocks",          "pointing", "Mocks are coming. Is your child's revision", "actually working?", ""),
    ("d3-strug-chem",     "scrubs",   "Is your child struggling with", "A-level Chemistry?", ""),
    ("d4-strug-maths",    "scrubs",   "Is your child struggling with", "A-level Maths?", ""),
    ("d5-check",          "notebook", "Your child says they're revising.", "Here's how to check", "it's working."),
    # PAID PROGRAMMES funnel
    ("p1-september",      "scrubs",   "", "September intake open:", "A-level Biology, Chemistry and Maths"),
    ("p2-price",          "notebook", "Small group A-level tuition", "from £339,", "built by a doctor"),
]

# ratio -> width, height
RATIOS = {"1x1": (1080, 1080), "4x5": (1080, 1350), "9x16": (1080, 1920), "191": (1200, 628)}

BASE_CSS = """
* { margin:0; padding:0; box-sizing:border-box; }
html,body { width:%(w)spx; height:%(h)spx; overflow:hidden; }
.ad { width:%(w)spx; height:%(h)spspx; }
h1 { font-weight:900; color:#1a1433; line-height:1.16; letter-spacing:-0.01em; }
mark { background:#F2D269; color:#1a1433; padding:2px 14px; border-radius:8px;
       -webkit-box-decoration-break:clone; box-decoration-break:clone; }
.cred { font-weight:700; color:#5a5470; letter-spacing:0.02em; }
"""

SPLIT = """<!DOCTYPE html><html><head><meta charset="utf-8"><style>
* {{ margin:0; padding:0; box-sizing:border-box; }}
html,body {{ width:{w}px; height:{h}px; overflow:hidden;
  font-family:-apple-system,'Helvetica Neue',Arial,sans-serif; }}
.ad {{ width:{w}px; height:{h}px; display:flex; flex-direction:column; background:#FBF7EC; }}
.photo {{ height:{photo_pct}%; background:url('file://{photo}') center 18%/cover no-repeat; }}
.panel {{ flex:1; display:flex; flex-direction:column; justify-content:center;
  align-items:center; text-align:center; padding:30px {pad}px 26px; gap:26px; }}
h1 {{ font-weight:900; color:#1a1433; line-height:1.16; font-size:{fs}px; letter-spacing:-0.01em; }}
mark {{ background:#F2D269; color:#1a1433; padding:2px 14px; border-radius:8px;
  -webkit-box-decoration-break:clone; box-decoration-break:clone; }}
.cred {{ font-weight:700; color:#5a5470; font-size:{cf}px; letter-spacing:0.02em; }}
</style></head><body><div class="ad">
<div class="photo"></div>
<div class="panel"><h1>{text}</h1><div class="cred">{cred}</div></div>
</div></body></html>"""

STORY = """<!DOCTYPE html><html><head><meta charset="utf-8"><style>
* {{ margin:0; padding:0; box-sizing:border-box; }}
html,body {{ width:{w}px; height:{h}px; overflow:hidden;
  font-family:-apple-system,'Helvetica Neue',Arial,sans-serif; }}
.ad {{ width:{w}px; height:{h}px; position:relative;
  background:url('file://{photo}') center 25%/cover no-repeat; }}
.shade {{ position:absolute; inset:0;
  background:linear-gradient(180deg, rgba(20,14,40,0.05) 30%, rgba(20,14,40,0.82) 62%, rgba(20,14,40,0.94) 100%); }}
.block {{ position:absolute; left:70px; right:70px; bottom:340px; text-align:center; }}
h1 {{ font-weight:900; color:#ffffff; line-height:1.18; font-size:{fs}px; letter-spacing:-0.01em; }}
mark {{ background:#F2D269; color:#1a1433; padding:2px 16px; border-radius:8px;
  -webkit-box-decoration-break:clone; box-decoration-break:clone; }}
.cred {{ margin-top:34px; font-weight:700; color:#e8e2f2; font-size:{cf}px; letter-spacing:0.02em; }}
</style></head><body><div class="ad"><div class="shade"></div>
<div class="block"><h1>{text}</h1><div class="cred">{cred}</div></div>
</div></body></html>"""

WIDE = """<!DOCTYPE html><html><head><meta charset="utf-8"><style>
* {{ margin:0; padding:0; box-sizing:border-box; }}
html,body {{ width:{w}px; height:{h}px; overflow:hidden;
  font-family:-apple-system,'Helvetica Neue',Arial,sans-serif; }}
.ad {{ width:{w}px; height:{h}px; display:flex; background:#FBF7EC; }}
.panel {{ width:57%; display:flex; flex-direction:column; justify-content:center;
  padding:40px 44px; gap:22px; }}
h1 {{ font-weight:900; color:#1a1433; line-height:1.16; font-size:{fs}px; letter-spacing:-0.01em; }}
mark {{ background:#F2D269; color:#1a1433; padding:1px 10px; border-radius:6px;
  -webkit-box-decoration-break:clone; box-decoration-break:clone; }}
.cred {{ font-weight:700; color:#5a5470; font-size:{cf}px; letter-spacing:0.02em; }}
.photo {{ flex:1; background:url('file://{photo}') 38% 15%/cover no-repeat; }}
</style></head><body><div class="ad">
<div class="panel"><h1>{text}</h1><div class="cred">{cred}</div></div>
<div class="photo"></div>
</div></body></html>"""


def nobreak(s):
    """Hyphenated words must never split at the hyphen ("A-" / "levels"),
    the same fix the 11 August engine carried."""
    return re.sub(r"([\w£]+(?:-[\w]+)+s?)", r'<span style="white-space:nowrap">\1</span>', s)


def markup(pre, key, post):
    parts = []
    if pre: parts.append(nobreak(pre) + " ")
    parts.append(f"<mark>{nobreak(key)}</mark>")
    if post: parts.append(" " + nobreak(post))
    return "".join(parts)


def fit(ratio, n):
    """Font size from total character count, tuned per layout."""
    table = {
        "1x1":  [(45, 74), (65, 64), (85, 56), (999, 50)],
        "4x5":  [(45, 78), (65, 68), (85, 60), (999, 54)],
        "9x16": [(45, 84), (65, 74), (85, 66), (999, 58)],
        "191":  [(45, 54), (65, 48), (85, 42), (999, 38)],
    }
    for limit, size in table[ratio]:
        if n <= limit:
            return size
    return 40


def render(html, path, w, h):
    with tempfile.NamedTemporaryFile("w", suffix=".html", delete=False) as f:
        f.write(html); tmp = f.name
    subprocess.run([CHROME, "--headless=new", "--disable-gpu", "--hide-scrollbars",
                    f"--screenshot={path}", f"--window-size={w},{h}", f"file://{tmp}"],
                   capture_output=True)
    os.unlink(tmp)


for slug, photo, pre, key, post in CONCEPTS:
    text = markup(pre, key, post)
    n = len(pre) + len(key) + len(post)
    src = PHOTOS[photo]
    for ratio, (w, h) in RATIOS.items():
        fs = fit(ratio, n)
        cf = max(22, int(fs * 0.42))
        if ratio in ("1x1", "4x5"):
            photo_pct = 52 if ratio == "1x1" else 55
            html = SPLIT.format(w=w, h=h, photo=src, photo_pct=photo_pct,
                                pad=60, fs=fs, cf=cf, text=text, cred=CRED)
        elif ratio == "9x16":
            html = STORY.format(w=w, h=h, photo=src, fs=fs, cf=cf, text=text, cred=CRED)
        else:
            html = WIDE.format(w=w, h=h, photo=src, fs=fs, cf=cf, text=text, cred=CRED)
        out = OUT / f"{slug}-{ratio}.png"
        render(html, out, w, h)
        print(out.name)

print("done:", len(CONCEPTS) * len(RATIOS), "files")
