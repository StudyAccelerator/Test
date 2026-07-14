import re, json, glob, html, os

import sys
SRC = 'content/email-newsletter'
OUT = sys.argv[1] if len(sys.argv) > 1 else '/tmp/sunday-session-html'
os.makedirs(OUT, exist_ok=True)

FONT = "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif"
P_STYLE = f"margin:0 0 18px 0;font-family:{FONT};font-size:17px;line-height:1.6;color:#1a1535;"
LINK_STYLE = "color:#C9A96E;text-decoration:underline;"

ISSUES = [
    ('2026-07-19-the-four-tiers.md',        'SS1 · The four tiers (Sun 19 Jul, 5pm)'),
    ('2026-07-26-learn-it-backwards.md',    'SS2 · Learn it backwards (Sun 26 Jul, 5pm)'),
    ('2026-08-02-ugly-notes.md',            'SS3 · Ugly notes win (Sun 2 Aug, 5pm)'),
    ('2026-08-09-the-results-day-playbook.md','SS4 · The results day playbook (Sun 9 Aug, 5pm)'),
    ('2026-08-13-results-morning.md',       'SSX · Results morning special (Thu 13 Aug, 7am)'),
    ('2026-08-16-read-it-like-a-doctor.md', 'SS5 · Read it like a doctor (Sun 16 Aug, 5pm)'),
    ('2026-08-23-the-prediction-window.md', 'SS6 · The prediction window (Sun 23 Aug, 5pm)'),
]

def header_field(header, key):
    m = re.search(r'^' + key + r': (.+)$', header, re.M)
    return m.group(1).strip() if m else None

def linkify(text):
    # text is already html-escaped; URLs contain no escaped chars
    def repl(m):
        url = m.group(0).rstrip('.,;')
        trail = m.group(0)[len(url):]
        return f'<a href="{url}" style="{LINK_STYLE}">{url}</a>{trail}'
    return re.sub(r'https?://[^\s<)\]]+', repl, text)

def para_html(block):
    block = block.strip()
    m = re.match(r'^\[BUTTON: (.+?) -> (\S+?)\]$', block)
    if m:
        label, url = html.escape(m.group(1)), m.group(2).rstrip(']')
        return (f'<table role="presentation" cellpadding="0" cellspacing="0" style="margin:6px 0 24px 0;">'
                f'<tr><td style="border:2px solid #2E2557;border-radius:4px;">'
                f'<a href="{url}" style="display:inline-block;padding:14px 28px;font-family:{FONT};'
                f'font-size:16px;font-weight:600;color:#2E2557;text-decoration:none;background:#ffffff;">{label}</a>'
                f'</td></tr></table>')
    t = html.escape(block, quote=False)
    t = re.sub(r'\*\*(.+?)\*\*', r'<strong>\1</strong>', t)
    t = linkify(t)
    t = t.replace('\n', '<br>\n')
    return f'<p style="{P_STYLE}">{t}</p>'

def build(fname, campaign_name):
    raw = open(f'{SRC}/{fname}').read()
    header, body = raw.split('\n---\n', 1)
    subject = header_field(header, 'Subject A')
    preheader = header_field(header, 'Preheader')
    special = 'results-morning' in fname
    if special:
        body = re.sub(r'\[IF RESULTS DAY RESCUE IS LIVE.*?\]\n*', '', body, flags=re.S | 0)
        body = re.sub(r'\[IF NOT LIVE, KEEP THIS LINE INSTEAD: (.*?)\s*\]', r'\1', body)
    body = body.strip()
    paras = [para_html(b) for b in re.split(r'\n\s*\n', body) if b.strip()]
    subline = 'Results morning special' if special else 'One thing school never taught you. Every Sunday, 5pm.'
    h = f"""<div style="display:none;max-height:0;overflow:hidden;mso-hide:all;">{html.escape(preheader)}&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#ffffff;"><tr><td align="center">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;"><tr><td style="padding:32px 24px 40px 24px;">
<p style="margin:0 0 4px 0;font-family:Georgia,'Times New Roman',serif;font-size:24px;color:#2E2557;">The Sunday Session</p>
<p style="margin:0 0 28px 0;font-family:{FONT};font-size:13px;color:#6b6580;">{subline}</p>
{chr(10).join(paras)}
<div style="border-top:2px solid #C9A96E;margin-top:32px;padding-top:16px;">
<p style="margin:0;font-family:{FONT};font-size:13px;line-height:1.6;color:#6b6580;">
Dr Waleed Ahmad, MBBS &middot; A-Level Accelerators &middot; <a href="https://alevelaccelerators.com" style="{LINK_STYLE}">alevelaccelerators.com</a><br>
You're getting this because you signed up at alevelaccelerators.com (the diagnostic, the tracker or a workshop).<br>
<a href="{{$unsubscribe}}" style="{LINK_STYLE}">Unsubscribe</a></p>
</div>
</td></tr></table></td></tr></table>"""
    out = f'{OUT}/{fname.replace(".md", ".html")}'
    open(out, 'w').write(h)
    return {'campaign_name': campaign_name, 'subject': subject, 'preheader': preheader, 'html_file': out, 'source': fname}

manifest = [build(f, n) for f, n in ISSUES]
json.dump(manifest, open(f'{OUT}/manifest.json', 'w'), indent=1)
for m in manifest:
    print(m['campaign_name'], '| subject:', m['subject'], '| bytes:', os.path.getsize(m['html_file']))
