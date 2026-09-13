#!/usr/bin/env python3
"""Round 3: proof ads (13 September 2026).

Waleed's brief: results-led creatives now that proof exists. Every claim on a
card is his own stated figure or a real student quote (see COPY-PACK.md for the
one substantiation flag, raised once). Same photo-led engine as round 2
(content/meta-ads/2026-08-27-round-2-creative-test/src/gen.py) plus a QUOTE
card style for the testimonial creative.

Layouts per ratio: 1x1 and 4x5 photo top / text panel; 9x16 full-bleed with
gradient; 191 text left / photo right. Quote cards are text-only brand cards.

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

# slug, style, photo, pre, highlighted, post
CONCEPTS = [
    ("r1-sarah-c-to-astar", "photo", "scrubs",   "Sarah went from a", "C to an A*", "in A-level Biology. Here's the method."),
    ("r2-two-grades",       "photo", "pointing", "On average, our students", "jump two grades", "in about 3 months"),
    ("r3-first-choice",     "photo", "notebook", "", "96% of our students", "get their first-choice university offer"),
    ("r4-next-story",       "photo", "scrubs",   "Could your child be our next", "C to A* story?", ""),
    ("r5-the-method",       "photo", "notebook", "Learn the method that took our students", "from C to A*", ""),
    ("r6-quote-sarah",      "quote", "",
        "It would have been harder to revise all on my own. Sticking to the strict two hours and getting everything done in it is easier than managing it all yourself.",
        "Sarah", "A* in Biology &middot; Veterinary Science at Bristol, her first choice"),
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

# Testimonial card: dark purple brand card, gold stars, the real quote, the
# attribution, then the credibility line. No photo: the student is the proof.
QUOTE = """<!DOCTYPE html><html><head><meta charset="utf-8"><style>
* {{ margin:0; padding:0; box-sizing:border-box; }}
html,body {{ width:{w}px; height:{h}px; overflow:hidden; """ + FONT + """ }}
.ad {{ width:{w}px; height:{h}px; background:#2E2557; color:#F3EBD8; display:flex; flex-direction:column;
  justify-content:center; padding:{pad}px; position:relative; }}
.ad:before {{ content:'\\201C'; position:absolute; top:{qtop}px; left:{pad}px; font-size:{qf}px; line-height:1;
  color:#D4A843; font-weight:900; opacity:0.9; }}
.stars {{ color:#D4A843; font-size:{sf}px; letter-spacing:6px; margin-bottom:{gap}px; }}
p.q {{ font-weight:800; font-size:{fs}px; line-height:1.28; letter-spacing:-0.005em; }}
.who {{ margin-top:{gap}px; font-weight:900; font-size:{wf}px; color:#F2D269; }}
.who span {{ display:block; font-weight:600; color:#F3EBD8; opacity:0.85; font-size:{wsf}px; margin-top:6px; }}
.cred {{ margin-top:{gap}px; font-weight:700; font-size:{cf}px; color:#F3EBD8; opacity:0.6; letter-spacing:0.02em; }}
</style></head><body><div class="ad">
<div class="stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
<p class="q">{quote}</p>
<div class="who">{who}<span>{role}</span></div>
<div class="cred">{cred}</div>
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


# quote card sizes per ratio: pad, quote font, star font, who font, who-sub font, cred font, gap, glyph size, glyph top
QUOTE_SIZES = {
    "1x1":  (90, 52, 40, 40, 26, 22, 34, 260, 20),
    "4x5":  (90, 56, 42, 42, 27, 23, 38, 280, 40),
    "9x16": (100, 62, 46, 46, 30, 25, 46, 320, 200),
    "191":  (70, 38, 30, 30, 21, 18, 22, 180, 10),
}


def render(html, path, w, h):
    with tempfile.NamedTemporaryFile("w", suffix=".html", delete=False) as f:
        f.write(html); tmp = f.name
    subprocess.run([CHROME, "--headless=new", "--disable-gpu", "--hide-scrollbars",
                    f"--screenshot={path}", f"--window-size={w},{h}", f"file://{tmp}"],
                   capture_output=True)
    os.unlink(tmp)


count = 0
for slug, style, photo, pre, key, post in CONCEPTS:
    for ratio, (w, h) in RATIOS.items():
        if style == "quote":
            pad, fs, sf, wf, wsf, cf, gap, qf, qtop = QUOTE_SIZES[ratio]
            html = QUOTE.format(w=w, h=h, pad=pad, fs=fs, sf=sf, wf=wf, wsf=wsf, cf=cf, gap=gap,
                                qf=qf, qtop=qtop, quote=pre, who=key, role=post, cred=CRED)
        else:
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
