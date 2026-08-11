#!/usr/bin/env python3
"""Paid-programme callouts, all three Meta ratios (Waleed, 5 August 2026).

  1x1  = 1080x1080   9x16 = 1080x1920   191 = 1200x628

House rules for this set, from his instructions:
  - No banner or tag. Text centred. Text is the only thing on the card.
  - "plain" = no highlight, type pushed large so the words fill the canvas.
  - "marker" = yellow highlight on the key phrase, question mark INSIDE it.
  - "face" = his scrubs photo in a circle, TOP LEFT, in normal flow above the text
    so it can never overlap a word ("ensure I don't block any other writing").
Output: ../final-ratios/<slug>-<style>-<ratio>.png
"""
import os, subprocess, tempfile, pathlib

CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
HERE = pathlib.Path(__file__).resolve().parent
OUT = HERE.parent / "final-ratios"
OUT.mkdir(exist_ok=True)
FACE = HERE / "waleed-scrubs-desk.jpg"

# ratio -> (w, h, pad, badge, [big, mid, small, tiny])
RATIOS = {
    "1x1":  (1080, 1080, 80, 230, [132, 116, 100, 86]),
    "9x16": (1080, 1920, 84, 240, [140, 122, 106, 92]),
    "191":  (1200,  628, 60, 165, [ 84,  74,  64, 56]),
}

TPL = """<!DOCTYPE html><html><head><meta charset="utf-8"><style>
* {{ margin:0; padding:0; box-sizing:border-box; }}
html,body {{ width:{w}px; height:{h}px; overflow:hidden; }}
.ad {{ width:{w}px; height:{h}px; background:#ffffff; display:flex; flex-direction:column;
      padding:{pad}px; font-family:-apple-system,'Helvetica Neue',Arial,sans-serif; }}
.badge {{ width:{b}px; height:{b}px; border-radius:50%; flex:none; align-self:flex-start;
      margin-bottom:{bm}px; border:9px solid #111111;
      background-image:url('{face}'); background-size:250% auto;
      background-position:54% 22%; }}
.body {{ flex:1; display:flex; align-items:center; justify-content:center; }}
h1 {{ font-weight:900; font-size:{fs}px; line-height:1.16; color:#111111; text-align:center; }}
mark {{ background:#ffe872; padding:0 12px; }}
</style></head><body><div class="ad">
{badge}<div class="body"><h1>{text}</h1></div>
</div></body></html>"""

# (slug, prefix, key phrase, suffix, styles)
ROWS = [
    ("01-five-students", "We're taking on", "5 New A-level Students", " for September",
     ["marker", "plain", "face"]),
    ("02-achieve-astar", "Want a doctor to help your child", "achieve A*", "",
     ["plain", "face"]),
    ("03-predicted-grades", "Work with a doctor on your child's", "predicted grades", "",
     ["plain", "face"]),
    ("04-y12", "Is your child going into", "Year 12?", "",
     ["marker", "plain", "face"]),
    ("05-y13", "Is your child going into", "Year 13?", "",
     ["marker", "plain", "face"]),
    ("06-maths", "Is your child studying", "A-level Maths?", "",
     ["marker", "plain", "face"]),
    ("07-chemistry", "Is your child studying", "A-level Chemistry?", "",
     ["marker", "plain", "face"]),
    ("08-biology", "Is your child studying", "A-level Biology?", "",
     ["marker", "plain", "face"]),
]

# Slugs where the face variant should keep the yellow highlight (they have a marker
# version he has already approved). The two statement cards stay unhighlighted.
FACE_KEEPS_MARK = {"01-five-students", "04-y12", "05-y13", "06-maths", "07-chemistry", "08-biology"}

def font(ratio, n, has_face):
    big, mid, small, tiny = RATIOS[ratio][4]
    size = big if n <= 34 else mid if n <= 44 else small if n <= 56 else tiny
    return int(size * 0.84) if has_face else size

def render(html, path, w, h):
    with tempfile.NamedTemporaryFile("w", suffix=".html", delete=False) as f:
        f.write(html); tmp = f.name
    subprocess.run([CHROME, "--headless", "--disable-gpu", "--hide-scrollbars",
                    f"--screenshot={path}", f"--window-size={w},{h}", f"file://{tmp}"],
                   capture_output=True)
    os.unlink(tmp)

count = 0
for slug, pre, key, suf, styles in ROWS:
    full_len = len(pre) + len(key) + len(suf)
    for style in styles:
        marked = style == "marker" or (style == "face" and slug in FACE_KEEPS_MARK)
        text = f"{pre} <mark>{key}</mark>{suf}" if marked else f"{pre} {key}{suf}"
        for ratio, (w, h, pad, b, _sizes) in RATIOS.items():
            has_face = style == "face"
            fs = font(ratio, full_len, has_face)
            badge = f'<div class="badge"></div>' if has_face else ""
            html = TPL.format(w=w, h=h, pad=pad, b=b, bm=int(pad * 0.6),
                              face=FACE.as_uri(), fs=fs, badge=badge, text=text)
            render(html, OUT / f"{slug}-{style}-{ratio}.png", w, h)
            count += 1
    print(f"{slug}: {', '.join(styles)}")
print(f"\n{count} files in {OUT}")
