#!/usr/bin/env python3
"""Generate the ugly callout ad batch (1080x1080) for the revision diagnostic.

Sabri Suby / Victor Alvarez style: deliberately plain text-card creatives where the
question itself does the audience narrowing. One HTML template, many variants.
Run from anywhere: python3 gen.py  ->  writes PNGs into ../final/
"""
import os, subprocess, tempfile, pathlib

CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
OUT = pathlib.Path(__file__).resolve().parent.parent / "final"
OUT.mkdir(exist_ok=True)

# (slug, prefix, key phrase, suffix)
QUESTIONS = [
    ("general",       "Is your child studying for", "their A-levels", "?"),
    ("y12",           "Is your child going into", "Year 12", "?"),
    ("y13",           "Is your child going into", "Year 13", "?"),
    ("maths",         "Is your child studying", "A-level Maths", "?"),
    ("biology",       "Is your child studying", "A-level Biology", "?"),
    ("chemistry",     "Is your child studying", "A-level Chemistry", "?"),
    ("physics",       "Is your child studying", "A-level Physics", "?"),
    ("y12-maths",     "Is your child studying", "Year 12 A-level Maths", "?"),
    ("y12-biology",   "Is your child studying", "Year 12 A-level Biology", "?"),
    ("y12-chemistry", "Is your child studying", "Year 12 A-level Chemistry", "?"),
    ("y13-maths",     "Is your child studying", "Year 13 A-level Maths", "?"),
    ("y13-biology",   "Is your child studying", "Year 13 A-level Biology", "?"),
    ("y13-chemistry", "Is your child studying", "Year 13 A-level Chemistry", "?"),
]

MARKER = """<!DOCTYPE html><html><head><meta charset="utf-8"><style>
* {{ margin:0; padding:0; box-sizing:border-box; }}
html,body {{ width:1080px; height:1080px; overflow:hidden; }}
.ad {{ width:1080px; height:1080px; background:#ffffff; display:flex; flex-direction:column;
      font-family:-apple-system,'Helvetica Neue',Arial,sans-serif; }}
.strip {{ background:#c62828; color:#ffffff; text-align:center; font-weight:800;
      font-size:38px; letter-spacing:0.06em; padding:26px 0; }}
.body {{ flex:1; display:flex; flex-direction:column; justify-content:center;
      padding:0 90px; text-align:center; }}
h1 {{ font-weight:900; font-size:{size}px; line-height:1.18; color:#111111; }}
mark {{ background:#ffe872; padding:0 12px; }}
.cta {{ padding:0 90px 70px; text-align:center; }}
.cta .line {{ font-weight:700; font-size:40px; color:#111111; margin-bottom:14px; }}
.cta .url {{ font-weight:600; font-size:30px; color:#777777; }}
</style></head><body><div class="ad">
<div class="strip">ATTENTION: UK PARENTS</div>
<div class="body"><h1>{prefix}<br><mark>{key}</mark>{suffix}</h1></div>
<div class="cta"><div class="line">Take the free 3 minute revision diagnostic &#8595;</div>
<div class="url">alevelaccelerators.com</div></div>
</div></body></html>"""

UNDERLINE = """<!DOCTYPE html><html><head><meta charset="utf-8"><style>
* {{ margin:0; padding:0; box-sizing:border-box; }}
html,body {{ width:1080px; height:1080px; overflow:hidden; }}
.ad {{ width:1080px; height:1080px; background:#ffffff; display:flex; flex-direction:column;
      font-family:-apple-system,'Helvetica Neue',Arial,sans-serif; padding:70px 90px;
      position:relative; }}
.tag {{ position:absolute; top:70px; left:90px; background:#2E2557; color:#F3EBD8;
      font-weight:700; font-size:28px; letter-spacing:0.1em; padding:14px 26px; }}
.body {{ flex:1; display:flex; flex-direction:column; justify-content:center; text-align:left; }}
h1 {{ font-weight:900; font-size:{size}px; line-height:1.22; color:#111111; }}
.key {{ box-shadow: inset 0 -16px 0 0 rgba(46,37,87,0.25); }}
.cta {{ display:flex; align-items:center; gap:28px; }}
.pill {{ background:#2E2557; color:#F3EBD8; font-weight:700; font-size:36px;
      padding:26px 44px; border-radius:14px; }}
.url {{ font-weight:600; font-size:30px; color:#777777; }}
</style></head><body><div class="ad">
<div class="tag">FOR UK PARENTS</div>
<div class="body"><h1>{prefix}<br><span class="key">{key}</span>{suffix}</h1></div>
<div class="cta"><div class="pill">Free 3 minute check &#8594;</div>
<div class="url">alevelaccelerators.com</div></div>
</div></body></html>"""

def font_size(prefix, key):
    n = len(prefix) + len(key)
    if n > 48: return 92
    if n > 40: return 104
    return 118

def render(html, path):
    with tempfile.NamedTemporaryFile("w", suffix=".html", delete=False) as f:
        f.write(html); tmp = f.name
    subprocess.run([CHROME, "--headless", "--disable-gpu", "--hide-scrollbars",
                    f"--screenshot={path}", "--window-size=1080,1080", f"file://{tmp}"],
                   capture_output=True)
    os.unlink(tmp)

for i, (slug, prefix, key, suffix) in enumerate(QUESTIONS, 1):
    size = font_size(prefix, key)
    render(MARKER.format(size=size, prefix=prefix, key=key, suffix=suffix),
           OUT / f"{i:02d}-{slug}-marker.png")
    render(UNDERLINE.format(size=size, prefix=prefix, key=key, suffix=suffix),
           OUT / f"{i:02d}-{slug}-underline.png")
    print(f"{i:02d}-{slug}: done")
print(f"\n{len(QUESTIONS)*2} images in {OUT}")
