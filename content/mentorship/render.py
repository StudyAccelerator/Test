#!/usr/bin/env python3
"""Render the mentorship curriculum (the four markdown files in this folder)
into one branded PDF via headless Chrome.

Usage, from the repo root:  python3 content/mentorship/render.py
Needs the `markdown` package (pip install markdown) and a Chrome/Chromium binary.
Set CHROME=/path/to/chrome if it is not found automatically.
Output: content/mentorship/Top-1-Mentorship-Curriculum.pdf (gitignored).
"""
import os, re, glob, shutil, subprocess, sys
import markdown

HERE = os.path.dirname(os.path.abspath(__file__))
FILES = ['README.md', '01-the-spine.md', '02-weekly-runsheets.md', '03-templates.md', '04-sustainability.md', '05-skool-merger-stress-test.md', '06-billing-and-the-four-month-term.md', '07-scalability-and-the-road-to-10k.md']
OUT_HTML = os.path.join(HERE, 'Top-1-Mentorship-Curriculum.html')
OUT_PDF = os.path.join(HERE, 'Top-1-Mentorship-Curriculum.pdf')

CSS = """
@page { size: A4; margin: 16mm 15mm 18mm 15mm; }
body { font-family: Georgia, 'Times New Roman', serif; color: #2b2540; font-size: 10.5pt; line-height: 1.45; margin: 0; }
h1 { font-size: 22pt; color: #2E2557; margin: 0 0 4mm; line-height: 1.15; }
h2 { font-size: 15pt; color: #2E2557; margin: 8mm 0 3mm; border-bottom: 2px solid #C9A96E; padding-bottom: 1.5mm; }
h3 { font-size: 12pt; color: #2E2557; margin: 5mm 0 2mm; }
p, li { font-family: -apple-system, 'Helvetica Neue', Arial, sans-serif; }
p { margin: 0 0 2.6mm; }
ul, ol { margin: 0 0 3mm 5mm; padding-left: 4mm; }
li { margin-bottom: 1.4mm; }
strong { color: #2E2557; }
em { color: #5a5470; }
table { border-collapse: collapse; width: 100%; margin: 2mm 0 4mm; font-family: -apple-system, 'Helvetica Neue', Arial, sans-serif; font-size: 9pt; }
th { background: #2E2557; color: #F3EBD8; text-align: left; padding: 1.6mm 2mm; }
td { border-bottom: 1px solid #e6e0d2; padding: 1.5mm 2mm; vertical-align: top; }
tr:nth-child(even) td { background: #FBF8F3; }
code, pre { font-family: Menlo, Consolas, monospace; font-size: 8.5pt; background: #F3EBD8; border-radius: 3px; }
code { padding: 0 1mm; }
pre { padding: 2mm 3mm; white-space: pre-wrap; word-break: break-word; }
hr { border: 0; height: 0; margin: 0; }
.doc { page-break-before: always; }
.doc:first-child { page-break-before: auto; }
.session { page-break-before: always; }
.cover { text-align: center; padding-top: 60mm; page-break-after: always; }
.cover h1 { font-size: 34pt; }
.cover p { font-size: 12pt; color: #5a5470; }
.cover .gold { color: #C9A96E; font-weight: bold; letter-spacing: .08em; text-transform: uppercase; font-size: 10pt; }
"""

def find_chrome():
    if os.environ.get('CHROME'):
        return os.environ['CHROME']
    candidates = [
        '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
        shutil.which('google-chrome'), shutil.which('chromium'), shutil.which('chromium-browser'),
    ]
    candidates += glob.glob('/opt/pw-browsers/chromium-*/chrome-linux/chrome')
    candidates += glob.glob('/opt/pw-browsers/chromium-*/chrome-linux64/chrome')
    for c in candidates:
        if c and os.path.exists(c):
            return c
    sys.exit('No Chrome found. Set CHROME=/path/to/chrome')

def render_md(name):
    text = open(os.path.join(HERE, name), encoding='utf-8').read()
    # python-markdown needs a blank line before a list that follows a paragraph.
    lines, fixed = text.split('\n'), []
    for i, line in enumerate(lines):
        prev = lines[i - 1] if i else ''
        if line.startswith('- ') and prev.strip() and not prev.startswith('- ') and not prev.startswith('  '):
            fixed.append('')
        fixed.append(line)
    html = markdown.markdown('\n'.join(fixed), extensions=['tables', 'fenced_code'])
    # Each session and each break-week block starts on a fresh page in the runsheets.
    if name.startswith('02-'):
        html = re.sub(r'<h2>(Session \d+|Weeks of|The run-in)', r'<h2 class="session">\1', html)
    # Internal links between the files point nowhere in a PDF; keep the label.
    html = re.sub(r'<a href="0\d-[^"]+\.md">([^<]+)</a>', r'<strong>\1</strong>', html)
    return f'<section class="doc">{html}</section>'

def main():
    body = '<section class="cover"><p class="gold">A-Level Accelerators</p><h1>Top 1% Mentorship<br>The curriculum</h1><p>The spine, the weekly runsheets, the templates and the honest read on scale.<br>Built 10 September 2026 for the first two students.</p></section>'
    body += ''.join(render_md(f) for f in FILES)
    open(OUT_HTML, 'w', encoding='utf-8').write(f'<!doctype html><html><head><meta charset="utf-8"><title>Top 1% Mentorship curriculum</title><style>{CSS}</style></head><body>{body}</body></html>')
    chrome = find_chrome()
    cmd = [chrome, '--headless=new', '--disable-gpu', '--no-sandbox', '--no-pdf-header-footer',
           f'--print-to-pdf={OUT_PDF}', f'file://{OUT_HTML}']
    subprocess.run(cmd, check=True, capture_output=True)
    os.remove(OUT_HTML)
    print(f'Wrote {OUT_PDF} ({os.path.getsize(OUT_PDF)//1024} KB)')

if __name__ == '__main__':
    main()
