#!/usr/bin/env python3
"""Round 4: the angle test (2 October 2026).

Six photo-led cards, one per angle, built on the lines parents and students
actually used on the September sales calls (dashboard/data/sales-calls/
pain-points-2026-10-02.md, private). Same engine as rounds 2 and 3: photo top
with a text panel for 1x1 and 4x5, full-bleed gradient for 9x16, text left
and photo right for 1.91:1. The highlighted phrase is the pain in their words.

Run:  python3 gen.py
"""
import os, re, subprocess, tempfile, pathlib

CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
HERE = pathlib.Path(__file__).resolve().parent
OUT = HERE.parent / "final"
OUT.mkdir(exist_ok=True)

SRC = HERE.parent.parent / "2026-07-27-parents-diagnostic-launch/creative-src"
PHOTOS = {
    "scrubs":   SRC / "waleed-scrubs-desk.jpg",
    "pointing": SRC / "waleed-polo-pointing.png",
    "notebook": SRC / "waleed-polo-notebook.png",
}

CRED = "Dr Waleed Ahmad &middot; NHS Doctor &middot; 1,000+ A-level students"

# slug, photo, pre, highlighted, post
CONCEPTS = [
    ("a1-future-medics", "scrubs",   "Parents of future doctors: is your child's revision", "good enough for medicine?", ""),
    ("a1b-ucat",         "scrubs",   "Weak UCAT?", "Every A-level grade now has to carry the application.", ""),
    ("a2-mark-scheme",   "notebook", "Your child knows it.", "The examiner still won't give the mark.", ""),
    ("a3-working-hard",  "pointing", "She's working hard.", "The grades don't show it.", "Here's why."),
    ("a4-forgets",       "pointing", "He learns it fast", "and forgets it faster.", ""),
    ("a5-tutor",         "notebook", "If one-to-one tuition was the answer,", "every student with a tutor would get A*s.", ""),
]

RATIOS = {"1x1": (1080, 1080), "4x5": (1080, 1350), "9x16": (1080, 1920), "191": (1200, 628)}

FONT = "font-family:-apple-system,'Helvetica Neue',Arial,sans-serif;"
MARK = ("mark {{ background:#F2D269; color:#1a1433; padding:2px 14px; border-radius:8px;"
        " -webkit-box-decoration-break:clone; box-decoration-break:clone; }}")

SPLIT = """<!DOCTYPE html><html><head><meta charset="utf-8"><style>
* {{ margin:0; padding:0; box-sizing:border-box; }}
html,body {{ width:{w}px; height:{h}px; overflow:hidden; """ + FONT + """ }}
.ad {{ width:{w}px; height:{h}px; display:flex; flex-direction:column; background:#FBF7EC; }}
.photo {{ height:{photo_pct}%; background:url('file://{photo}') center 18%/cover no-repeat; }}
.panel {{ flex:1; display:flex; flex-direction:column; justify-content:center;
  align-items:center; text-align:center; padding:30px 60px 26px; gap:26px; }}
h1 {{ font-weight:900; color:#1a1433; line-height:1.16; font-size:{fs}px; letter-spacing:-0.01em; }}
""" + MARK + """
.cred {{ font-weight:700; color:#5a5470; font-size:{cf}px; letter-spacing:0.02em; }}
</style></head><body><div class="ad">
<div class="photo"></div>
<div class="panel"><h1>{text}</h1><div class="cred">{cred}</div></div>
</div></body></html>"""

STORY = """<!DOCTYPE html><html><head><meta charset="utf-8"><style>
* {{ margin:0; padding:0; box-sizing:border-box; }}
html,body {{ width:{w}px; height:{h}px; overflow:hidden; """ + FONT + """ }}
.ad {{ width:{w}px; height:{h}px; position:relative;
  background:url('file://{photo}') center 25%/cover no-repeat; }}
.shade {{ position:absolute; inset:0;
  background:linear-gradient(180deg, rgba(20,14,40,0.05) 30%, rgba(20,14,40,0.82) 62%, rgba(20,14,40,0.94) 100%); }}
.block {{ position:absolute; left:70px; right:70px; bottom:340px; text-align:center; }}
h1 {{ font-weight:900; color:#ffffff; line-height:1.18; font-size:{fs}px; letter-spacing:-0.01em; }}
""" + MARK + """
.cred {{ margin-top:34px; font-weight:700; color:#e8e2f2; font-size:{cf}px; letter-spacing:0.02em; }}
</style></head><body><div class="ad"><div class="shade"></div>
<div class="block"><h1>{text}</h1><div class="cred">{cred}</div></div>
</div></body></html>"""

WIDE = """<!DOCTYPE html><html><head><meta charset="utf-8"><style>
* {{ margin:0; padding:0; box-sizing:border-box; }}
html,body {{ width:{w}px; height:{h}px; overflow:hidden; """ + FONT + """ }}
.ad {{ width:{w}px; height:{h}px; display:flex; background:#FBF7EC; }}
.panel {{ width:57%; display:flex; flex-direction:column; justify-content:center; padding:40px 44px; gap:22px; }}
h1 {{ font-weight:900; color:#1a1433; line-height:1.16; font-size:{fs}px; letter-spacing:-0.01em; }}
""" + MARK + """
.cred {{ font-weight:700; color:#5a5470; font-size:{cf}px; letter-spacing:0.02em; }}
.photo {{ flex:1; background:url('file://{photo}') 38% 15%/cover no-repeat; }}
</style></head><body><div class="ad">
<div class="panel"><h1>{text}</h1><div class="cred">{cred}</div></div>
<div class="photo"></div>
</div></body></html>"""


def nobreak(s):
    return re.sub(r"([\w£%*]+(?:-[\w*]+)+s?)", r'<span style="white-space:nowrap">\1</span>', s)


def markup(pre, key, post):
    parts = []
    if pre: parts.append(nobreak(pre) + " ")
    parts.append(f"<mark>{nobreak(key)}</mark>")
    if post: parts.append(" " + nobreak(post))
    return "".join(parts)


def fit(ratio, n):
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


count = 0
for slug, photo, pre, key, post in CONCEPTS:
    for ratio, (w, h) in RATIOS.items():
        text = markup(pre, key, post)
        n = len(pre) + len(key) + len(post)
        fs = fit(ratio, n)
        cf = max(22, int(fs * 0.42))
        src = PHOTOS[photo]
        if ratio in ("1x1", "4x5"):
            html = SPLIT.format(w=w, h=h, photo=src, photo_pct=52 if ratio == "1x1" else 55,
                                fs=fs, cf=cf, text=text, cred=CRED)
        elif ratio == "9x16":
            html = STORY.format(w=w, h=h, photo=src, fs=fs, cf=cf, text=text, cred=CRED)
        else:
            html = WIDE.format(w=w, h=h, photo=src, fs=fs, cf=cf, text=text, cred=CRED)
        out = OUT / f"{slug}-{ratio}.png"
        render(html, out, w, h)
        count += 1
        print(out.name)

print("done:", count, "files")
