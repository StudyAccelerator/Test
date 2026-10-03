#!/usr/bin/env python3
"""Round 4 (3 October 2026): the tutor line written ON the photo, Waleed's
preferred style, instead of a cream card. 1:1, 4:5 and 9:16 are full-bleed
photo with a dark gradient and white text at the bottom; 1.91:1 keeps the
text on the left and the photo on the right. Same two photos as
gen-tutor-variants.py. Run: python3 gen-tutor-overlay.py
"""
import os, re, subprocess, tempfile, pathlib

CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
HERE = pathlib.Path(__file__).resolve().parent
OUT = HERE.parent / "final"; OUT.mkdir(exist_ok=True)
PHOTOS = {"pen": HERE / "photos/doctor-pen-600.jpg", "mask": HERE / "photos/doctor-original-upright.jpg"}
CRED = "Dr Waleed Ahmad &middot; NHS Doctor &middot; 1,000+ A-level students"
CONCEPTS = [
    ("o1-tutor-mask", "mask", "If one-to-one tuition was the answer,", "every student with a tutor would get A*s.", ""),
    ("o2-tutor-pen",  "pen",  "If one-to-one tuition was the answer,", "every student with a tutor would get A*s.", ""),
]
# ratio: (w, h, photo focus y, text block bottom, gradient start)
RATIOS = {"1x1": (1080, 1080, "18%", 70, 38), "4x5": (1080, 1350, "20%", 80, 42), "9x16": (1080, 1920, "22%", 340, 48)}
FONT = "font-family:-apple-system,'Helvetica Neue',Arial,sans-serif;"
MARK = ("mark {{ background:#F2D269; color:#1a1433; padding:2px 14px; border-radius:8px;"
        " -webkit-box-decoration-break:clone; box-decoration-break:clone; }}")

OVERLAY = """<!DOCTYPE html><html><head><meta charset="utf-8"><style>
* {{ margin:0; padding:0; box-sizing:border-box; }}
html,body {{ width:{w}px; height:{h}px; overflow:hidden; """ + FONT + """ }}
.ad {{ width:{w}px; height:{h}px; position:relative; background:url('file://{photo}') center {focus}/cover no-repeat; }}
.shade {{ position:absolute; inset:0; background:linear-gradient(180deg, rgba(20,14,40,0) {g0}%, rgba(20,14,40,0.78) {g1}%, rgba(20,14,40,0.94) 100%); }}
.block {{ position:absolute; left:64px; right:64px; bottom:{bottom}px; text-align:center; }}
h1 {{ font-weight:900; color:#ffffff; line-height:1.18; font-size:{fs}px; letter-spacing:-0.01em; text-shadow:0 2px 12px rgba(0,0,0,.35); }}
""" + MARK + """
.cred {{ margin-top:28px; font-weight:700; color:#e8e2f2; font-size:{cf}px; letter-spacing:0.02em; }}
</style></head><body><div class="ad"><div class="shade"></div>
<div class="block"><h1>{text}</h1><div class="cred">{cred}</div></div>
</div></body></html>"""

WIDE = """<!DOCTYPE html><html><head><meta charset="utf-8"><style>
* {{ margin:0; padding:0; box-sizing:border-box; }}
html,body {{ width:{w}px; height:{h}px; overflow:hidden; """ + FONT + """ }}
.ad {{ width:{w}px; height:{h}px; display:flex; background:#241d47; }}
.panel {{ width:56%; display:flex; flex-direction:column; justify-content:center; padding:40px 44px; gap:22px; }}
h1 {{ font-weight:900; color:#ffffff; line-height:1.16; font-size:{fs}px; letter-spacing:-0.01em; }}
""" + MARK + """
.cred {{ font-weight:700; color:#e8e2f2; font-size:{cf}px; letter-spacing:0.02em; }}
.photo {{ flex:1; background:url('file://{photo}') center 15%/cover no-repeat; }}
</style></head><body><div class="ad">
<div class="panel"><h1>{text}</h1><div class="cred">{cred}</div></div>
<div class="photo"></div>
</div></body></html>"""

def nobreak(s): return re.sub(r"([\w£%*]+(?:-[\w*]+)+s?)", r'<span style="white-space:nowrap">\1</span>', s)
def markup(pre, key, post):
    parts = []
    if pre: parts.append(nobreak(pre) + " ")
    parts.append(f"<mark>{nobreak(key)}</mark>")
    if post: parts.append(" " + nobreak(post))
    return "".join(parts)
def fit(ratio, n):
    table = {"1x1": [(45,74),(65,64),(85,56),(999,50)], "4x5": [(45,78),(65,68),(85,60),(999,54)],
             "9x16": [(45,84),(65,74),(85,66),(999,58)], "191": [(45,54),(65,48),(85,42),(999,38)]}
    for limit, size in table[ratio]:
        if n <= limit: return size
    return 40
def render(html, path, w, h):
    with tempfile.NamedTemporaryFile("w", suffix=".html", delete=False) as f:
        f.write(html); tmp = f.name
    subprocess.run([CHROME, "--headless=new", "--disable-gpu", "--hide-scrollbars", f"--screenshot={path}",
                    f"--window-size={w},{h}", f"file://{tmp}"], capture_output=True)
    os.unlink(tmp)

count = 0
for slug, photo, pre, key, post in CONCEPTS:
    text = markup(pre, key, post); n = len(pre)+len(key)+len(post); src = PHOTOS[photo]
    for ratio, (w, h, focus, bottom, g0) in RATIOS.items():
        fs = fit(ratio, n); cf = max(22, int(fs*0.42))
        html = OVERLAY.format(w=w, h=h, photo=src, focus=focus, bottom=bottom, g0=g0, g1=g0+28, fs=fs, cf=cf, text=text, cred=CRED)
        render(html, OUT / f"{slug}-{ratio}.png", w, h); count += 1
    fs = fit("191", n); cf = max(22, int(fs*0.42))
    render(WIDE.format(w=1200, h=628, photo=src, fs=fs, cf=cf, text=text, cred=CRED), OUT / f"{slug}-191.png", 1200, 628); count += 1
    print(slug, "done")
print("files:", count)
