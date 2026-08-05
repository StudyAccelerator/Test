#!/usr/bin/env python3
"""Paid-programme callout batch (1080x1080), Waleed's spec of 5 August 2026:
ugly style, text fully centred, NO banner/tag, highlights include the trailing
question mark, plus plain (no-highlight) versions and face-circle versions for
pattern interruption. Run: python3 gen.py -> ../final/
Also renders two face variants for the DIAGNOSTIC set into the 03 Aug folder.
"""
import os, subprocess, tempfile, pathlib

CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
HERE = pathlib.Path(__file__).resolve().parent
OUT = HERE.parent / "final"
OUT.mkdir(exist_ok=True)
DIAG_OUT = HERE.parent.parent / "2026-08-03-ugly-diagnostic-callouts" / "final"
FACE = HERE / "waleed-scrubs-desk.jpg"

BASE_CSS = """
* { margin:0; padding:0; box-sizing:border-box; }
html,body { width:1080px; height:1080px; overflow:hidden; }
.ad { width:1080px; height:1080px; background:#ffffff; display:flex;
      flex-direction:column; align-items:center; justify-content:center;
      padding:0 84px; text-align:center; position:relative;
      font-family:-apple-system,'Helvetica Neue',Arial,sans-serif; }
.ad.hasface { padding-bottom:150px; }
h1 { font-weight:900; font-size:SIZEpx; line-height:1.24; color:#111111; }
mark { background:#ffe872; padding:2px 10px; }
/* Corner badge: the words stay the hero, the face is the pattern interrupt.
   Zoomed and positioned so Waleed's head sits centred in the circle. */
.face { position:absolute; right:64px; bottom:64px;
      width:250px; height:250px; border-radius:50%;
      background-image:url('FACEURL'); background-size:250% auto;
      background-position:54% 22%; border:9px solid #111111; }
"""

def page(pre, key, suf, size, style):
    css = BASE_CSS.replace("SIZE", str(size)).replace("FACEURL", FACE.as_uri())
    if style == "plain":
        text = f"{pre} {key}{suf}".strip()
        body = f"<h1>{text}</h1>"
    else:
        # Highlight wraps the key phrase only; trailing "?" belongs inside the key
        # (Waleed: a question mark left outside the highlight looks awkward).
        body = f"<h1>{pre} <mark>{key}</mark>{suf}</h1>"
    cls = "ad hasface" if style == "face" else "ad"
    if style == "face":
        body += '<div class="face"></div>'
    return f'<!DOCTYPE html><html><head><meta charset="utf-8"><style>{css}</style></head><body><div class="{cls}">{body}</div></body></html>'

def render(html, path):
    with tempfile.NamedTemporaryFile("w", suffix=".html", delete=False) as f:
        f.write(html); tmp = f.name
    subprocess.run([CHROME, "--headless", "--disable-gpu", "--hide-scrollbars",
                    f"--screenshot={path}", "--window-size=1080,1080", f"file://{tmp}"],
                   capture_output=True)
    os.unlink(tmp)

def size_for(pre, key, face=False):
    """Face variants keep the words at full size: the badge sits in the corner,
    so the text stays the hero (Waleed, 5 Aug)."""
    n = len(pre) + len(key)
    if n > 62: return 78
    if n > 45: return 88
    return 104

# (slug, prefix, key-phrase, suffix, [styles])
# suffix "?" rides INSIDE the highlight (Waleed: a bare question mark looks awkward).
ROWS = [
    ("price-general",   "Expert A-level support for", "a fifth of the cost", " of 1:1 tutoring", ["marker","plain"]),
    ("price-maths",     "Support your child in A-level Maths for", "a fifth of the cost", " of 1:1 tutoring", ["marker"]),
    ("price-biology",   "Support your child in A-level Biology for", "a fifth of the cost", " of 1:1 tutoring", ["marker"]),
    ("price-chemistry", "Support your child in A-level Chemistry for", "a fifth of the cost", " of 1:1 tutoring", ["marker"]),
    ("five-general",    "We're taking on", "5 new A-level students", " for September", ["marker","plain","face"]),
    ("five-maths",      "We're taking on 5 A-level Maths students", "aiming for A*s", "", ["marker"]),
    ("five-biology",    "We're taking on 5 A-level Biology students", "aiming for A*s", "", ["marker"]),
    ("five-chemistry",  "We're taking on 5 A-level Chemistry students", "aiming for A*s", "", ["marker"]),
    ("doctor-grades",   "Want", "a doctor", " to help improve your child's A-level grades?", ["marker","plain","face"]),
    ("doctor-predicted","Work with a doctor on your child's", "predicted grades?", "", ["marker","face"]),
    ("y12",             "Is your child going into", "Year 12?", "", ["marker","plain"]),
    ("y13",             "Is your child going into", "Year 13?", "", ["marker","plain"]),
    ("maths",           "Is your child studying", "A-level Maths?", "", ["marker","plain"]),
    ("biology",         "Is your child studying", "A-level Biology?", "", ["marker"]),
    ("chemistry",       "Is your child studying", "A-level Chemistry?", "", ["marker"]),
]

n = 0
for i, (slug, pre, key, suf, styles) in enumerate(ROWS, 1):
    for style in styles:
        size = size_for(pre, key)
        render(page(pre, key, suf, size, style), OUT / f"{i:02d}-{slug}-{style}.png")
        n += 1
    print(f"{i:02d}-{slug}: {', '.join(styles)}")

# Two face variants for the DIAGNOSTIC funnel (into the 3 Aug folder)
DIAG = [
    ("14-doctor-opinion-face", "Want a doctor's opinion on", "how your child revises?", ""),
    ("15-general-face",        "Is your child studying for", "their A-levels?", ""),
]
for name, pre, key, suf in DIAG:
    render(page(pre, key, suf, size_for(pre, key), "face"), DIAG_OUT / f"{name}.png")
    n += 1
    print(name)

print(f"\ndone: {len(list(OUT.glob('*.png')))} paid images in {OUT}, plus 2 diagnostic face variants")
