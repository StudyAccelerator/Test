#!/usr/bin/env python3
"""Render a stacked-slide carousel HTML into per-slide PNGs.

Each carousel HTML in this folder stacks its 1080x1350 slides vertically.
Headless Chrome screenshots the whole page once, then PIL slices it into
slide-1.png, slide-2.png, ... under content-hq/public/assets/<slug>/ so the
Content HQ can show them and Waleed can post them straight from there.

Usage: python3 content-hq/graphics-src/render.py carousel-5-habits.html ...
       (no args: renders every carousel-*.html in the folder)
"""
import re
import subprocess
import sys
import tempfile
from pathlib import Path

from PIL import Image

CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
HERE = Path(__file__).resolve().parent
ASSETS = HERE.parent / "public" / "assets"
W, H = 1080, 1350


def render(html_path: Path) -> None:
    slides = len(re.findall(r'class="slide', html_path.read_text()))
    if not slides:
        print(f"  {html_path.name}: no slides found, skipped")
        return
    slug = html_path.stem.removeprefix("carousel-")
    out_dir = ASSETS / slug
    out_dir.mkdir(parents=True, exist_ok=True)

    with tempfile.TemporaryDirectory() as td:
        tall = Path(td) / "tall.png"
        subprocess.run(
            [CHROME, "--headless", "--disable-gpu", "--hide-scrollbars",
             f"--screenshot={tall}", f"--window-size={W},{H * slides}",
             f"file://{html_path}"],
            check=True, capture_output=True,
        )
        img = Image.open(tall)
        if img.size != (W, H * slides):
            print(f"  WARNING {html_path.name}: rendered {img.size}, expected {(W, H * slides)}")
        for i in range(slides):
            img.crop((0, i * H, W, (i + 1) * H)).save(out_dir / f"slide-{i + 1}.png")
    print(f"  {html_path.name} -> {out_dir.relative_to(HERE.parent)}/ ({slides} slides)")


if __name__ == "__main__":
    targets = [HERE / a for a in sys.argv[1:]] or sorted(HERE.glob("carousel-*.html"))
    for t in targets:
        render(t)
