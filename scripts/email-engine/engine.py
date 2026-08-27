#!/usr/bin/env python3
"""The email engine: renders the repo's sequence markdown into MailerLite-ready
HTML and loads it into automation emails via the API, so nobody ever pastes
email copy into MailerLite by hand again.

Subcommands (run from the repo root):

  python3 scripts/email-engine/engine.py render
      Render every email in manifest.json to build/ (html + plain text).
      Pure local, safe to run any time.

  python3 scripts/email-engine/engine.py skeletons
      Print, for each automation missing an automation_id, the payload to
      create it (a Claude session passes this to the MailerLite connector's
      create_automation tool; the public REST API has no create endpoint).

  python3 scripts/email-engine/engine.py load <key> [--live]
      Load subjects, HTML, plain text and sender name into the automation's
      email steps, in order. Without --live it renders and diffs only.
      Requires automation_id to be filled in manifest.json.

  python3 scripts/email-engine/engine.py verify [<key>]
      Re-fetch each automation and assert: step order matches the manifest,
      delays match, every email is designed, sender is right. Prints a table.

The content write uses PUT /api/automations/{aid}/emails/{eid}/content
(undocumented but verified: it applies the design and registers link
tracking, unlike writing the `content` field directly). Subject, from_name
and plain_text go through PUT /api/automations/{aid}/emails/{eid}.

The API key is read from lib/mailerlite.ts so it stays single-sourced.
"""
import html
import json
import pathlib
import re
import sys
import time
import urllib.error
import urllib.request

ROOT = pathlib.Path(__file__).resolve().parents[2]
ENGINE = pathlib.Path(__file__).resolve().parent
BUILD = ENGINE / 'build'
MANIFEST = ENGINE / 'manifest.json'

FONT = "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif"
P_STYLE = f"margin:0 0 18px 0;font-family:{FONT};font-size:17px;line-height:1.6;color:#1a1535;"
LINK_STYLE = "color:#C9A96E;text-decoration:underline;"
MONO = "font-family:Menlo,Consolas,'Courier New',monospace;font-size:14px;"

# Waleed's standard photo signature (his real headshot on the MailerLite CDN),
# same block the Sunday Session builder uses.
PHOTO_SIG = (
    '<table role="presentation" border="0" cellspacing="0" cellpadding="0" style="margin:8px 0 4px 0;">'
    '<tr>'
    '<td valign="top" style="padding-right:16px;">'
    '<img src="https://storage.mlcdn.com/account_image/2113061/3SoYgyuLfUdmX53Lnw82S2YV4c6PnZsQch9dP7T5.jpg"'
    ' width="64" height="64" alt="Dr Waleed Ahmad"'
    ' style="display:block;width:64px;height:64px;border-radius:64px;"></td>'
    f'<td valign="middle" style="font-family:{FONT};font-size:15px;line-height:1.55;color:#1a1535;">'
    '<strong>Dr Waleed Ahmad, MBBS</strong><br>'
    'Founder, A-Level Accelerators<br>'
    f'<a href="https://alevelaccelerators.com" style="{LINK_STYLE}">alevelaccelerators.com</a>'
    '</td></tr></table>'
)
SIG_PLAIN = 'Dr Waleed Ahmad, MBBS\nFounder, A-Level Accelerators\nalevelaccelerators.com'


def api_key():
    src = (ROOT / 'lib' / 'mailerlite.ts').read_text()
    m = re.search(r"eyJ[A-Za-z0-9._-]+", src)
    if not m:
        sys.exit('could not find the MailerLite key in lib/mailerlite.ts')
    return m.group(0)


def api(path, method='GET', body=None, key=None):
    req = urllib.request.Request(
        f'https://connect.mailerlite.com/api/{path}',
        headers={'Authorization': f'Bearer {key}', 'Content-Type': 'application/json'},
        method=method,
        data=json.dumps(body).encode() if body is not None else None,
    )
    for attempt in range(3):
        try:
            with urllib.request.urlopen(req) as r:
                return json.load(r)
        except urllib.error.HTTPError as e:
            if e.code == 429 and attempt < 2:
                time.sleep(5)
                continue
            detail = e.read().decode()[:400]
            raise SystemExit(f'{method} {path} -> HTTP {e.code}: {detail}')


# ---------------------------------------------------------------- parsing

def parse_email(path):
    raw = (ROOT / path).read_text()
    header, body = raw.split('\n---\n', 1)

    def field(key):
        m = re.search(r'^' + key + r': (.+)$', header, re.M)
        return m.group(1).strip() if m else None

    subject = field('Subject A')
    preheader = field('Preheader')
    if not subject:
        sys.exit(f'{path}: no "Subject A" in header')
    if not preheader:
        sys.exit(f'{path}: no "Preheader" in header')
    return {'path': path, 'subject': subject, 'preheader': preheader, 'body': body.strip()}


# ---------------------------------------------------------------- rendering

def linkify(text):
    def repl(m):
        url = m.group(0).rstrip('.,;)')
        trail = m.group(0)[len(url):]
        return f'<a href="{url}" style="{LINK_STYLE}">{url}</a>{trail}'
    return re.sub(r'https?://[^\s<)\]]+|\{\$unsubscribe\}', repl, text)


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
    m = re.match(r'^\[LINK: (.+?) -> (\S+?)\]$', block)
    if m:
        label, url = html.escape(m.group(1)), m.group(2).rstrip(']')
        return (f'<p style="{P_STYLE}"><a href="{url}" style="color:#2E2557;font-weight:600;'
                f'text-decoration:underline;">{label}</a></p>')
    if block.startswith('[BOX START'):
        lines = [l for l in block.split('\n')[1:] if not l.startswith('[BOX END')]
        rows = ''.join(
            f'<p style="margin:0 0 6px 0;{MONO}color:#1a1535;">{html.escape(l, quote=False)}</p>'
            for l in lines if l.strip())
        return (f'<div style="border:1px solid #C9A96E;padding:14px 16px;margin:0 0 24px 0;">'
                f'<p style="margin:0 0 10px 0;{MONO}color:#6b6580;text-transform:uppercase;'
                f'letter-spacing:1px;font-size:12px;">From your report</p>{rows}</div>')
    t = html.escape(block, quote=False)
    t = re.sub(r'\*\*(.+?)\*\*', r'<strong>\1</strong>', t, flags=re.S)
    t = linkify(t)
    t = t.replace('\n', '<br>\n')
    return f'<p style="{P_STYLE}">{t}</p>'


def swap_signature(paras):
    """Insert the photo signature after the bare 'Waleed' sign-off paragraph,
    replacing a plain-text credentials paragraph if one follows (the photo
    block carries the credentials)."""
    sig_ix = None
    for i, p in enumerate(paras):
        if re.fullmatch(r'<p style="[^"]*">\s*Waleed\s*</p>', p):
            sig_ix = i
    if sig_ix is None:
        return paras, False
    out = paras[:sig_ix + 1] + [PHOTO_SIG]
    rest = paras[sig_ix + 1:]
    if rest and 'Dr Waleed Ahmad' in rest[0]:
        rest = rest[1:]
    return out + rest, True


def render_email(meta, footer):
    body = meta['body']
    paras = [para_html(b) for b in re.split(r'\n\s*\n', body) if b.strip()]
    paras, swapped = swap_signature(paras)
    if not swapped:
        paras.append(PHOTO_SIG)
    pre = html.escape(meta['preheader'])
    return f"""<div style="display:none;max-height:0;overflow:hidden;mso-hide:all;">{pre}&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#ffffff;"><tr><td align="center">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;"><tr><td style="padding:32px 24px 40px 24px;">
{chr(10).join(paras)}
<div style="border-top:2px solid #C9A96E;margin-top:28px;padding-top:16px;">
<p style="margin:0;font-family:{FONT};font-size:13px;line-height:1.6;color:#6b6580;">
{html.escape(footer)}<br>
<a href="{{$unsubscribe}}" style="{LINK_STYLE}">Unsubscribe</a></p>
</div>
</td></tr></table></td></tr></table>"""


def render_plain(meta, footer):
    body = meta['body']
    body = re.sub(r'^\[BUTTON: (.+?) -> (\S+?)\]$', r'\1:\n\2', body, flags=re.M)
    body = re.sub(r'^\[LINK: (.+?) -> (\S+?)\]$', r'\1:\n\2', body, flags=re.M)
    body = re.sub(r'^\[BOX START.*\]$', 'From your report:', body, flags=re.M)
    body = re.sub(r'^\[BOX END\]$', '', body, flags=re.M)
    body = re.sub(r'\*\*(.+?)\*\*', r'\1', body, flags=re.S)
    body = re.sub(r'\n{3,}', '\n\n', body)
    if 'Dr Waleed Ahmad' not in body:
        body = body.rstrip() + '\n' + SIG_PLAIN
    return f"{body.rstrip()}\n\n----\n{footer}\nUnsubscribe: {{$unsubscribe}}\n"


def render_plain_short(meta, footer):
    """MailerLite's plain_text field is capped at 1000 characters, so send a
    faithful opening rather than the default 'can't display HTML' template."""
    full = render_plain(meta, footer)
    tail = '\n\n[...]\n\nRead the full email: {$url}\n\nUnsubscribe: {$unsubscribe}\n'
    if len(full) <= 1000:
        return full
    cut = full[: 1000 - len(tail)]
    cut = cut.rsplit('\n', 1)[0]
    return cut.rstrip() + tail


# ---------------------------------------------------------------- commands

def load_manifest():
    return json.loads(MANIFEST.read_text())


def cmd_render():
    man = load_manifest()
    BUILD.mkdir(exist_ok=True)
    manifest_out = []
    for auto in man['automations']:
        emails = [s['email'] for s in auto['steps'] if 'email' in s]
        for i, path in enumerate(emails):
            meta = parse_email(path)
            slug = f"{auto['key']}-{i:02d}"
            (BUILD / f'{slug}.html').write_text(render_email(meta, auto['footer']))
            (BUILD / f'{slug}.txt').write_text(render_plain(meta, auto['footer']))
            manifest_out.append({'slug': slug, 'key': auto['key'], 'index': i,
                                 'subject': meta['subject'], 'source': path})
            print(f"{slug}  {meta['subject'][:60]}")
    (BUILD / 'index.json').write_text(json.dumps(manifest_out, indent=1))
    print(f'\nrendered {len(manifest_out)} emails into {BUILD.relative_to(ROOT)}/')


def cmd_skeletons():
    man = load_manifest()
    for auto in man['automations']:
        if auto['automation_id']:
            continue
        steps = []
        for s in auto['steps']:
            if 'email' in s:
                steps.append({'type': 'email', 'email_subject': parse_email(s['email'])['subject']})
            else:
                steps.append({'type': 'delay', 'delay_value': s['delay_days'], 'delay_unit': 'days'})
        payload = {
            'name': auto['name'],
            'trigger_type': 'subscriber_joins_group',
            'trigger_config': {'group_ids': [auto['trigger_group_id']]},
            'steps': steps,
        }
        print(f"== {auto['key']} ==")
        print(json.dumps(payload))
        print()


def ordered_steps(data):
    """MailerLite returns steps unordered; rebuild the parent-chain order."""
    steps = data.get('steps', [])
    by_parent = {s.get('parent_id'): s for s in steps}
    out, cur = [], by_parent.get(None)
    while cur:
        out.append(cur)
        cur = by_parent.get(cur['id'])
    if len(out) != len(steps):
        sys.exit(f"step chain broken: walked {len(out)} of {len(steps)} steps")
    return out


def fetch_auto(auto, key):
    return api(f"automations/{auto['automation_id']}", key=key)['data']


def cmd_load(target_key, live):
    man = load_manifest()
    key = api_key()
    sender = man['sender']
    for auto in man['automations']:
        if target_key not in (auto['key'], 'all'):
            continue
        if not auto['automation_id']:
            sys.exit(f"{auto['key']}: automation_id missing in manifest.json (create the skeleton first)")
        emails = [s['email'] for s in auto['steps'] if 'email' in s]
        data = fetch_auto(auto, key)
        chain = [s for s in ordered_steps(data) if s['type'] == 'email']
        if len(chain) != len(emails):
            sys.exit(f"{auto['key']}: automation has {len(chain)} email steps, manifest expects {len(emails)}")
        print(f"== {auto['key']} -> {auto['name']} ({'LIVE' if live else 'dry run'})")
        for i, (step, path) in enumerate(zip(chain, emails)):
            meta = parse_email(path)
            h = render_email(meta, auto['footer'])
            p = render_plain_short(meta, auto['footer'])
            print(f"  [{i}] {meta['subject'][:58]}  <- {pathlib.Path(path).name}")
            if not live:
                continue
            aid, eid = auto['automation_id'], step['email_id']
            api(f'automations/{aid}/emails/{eid}/content', 'PUT', {'html': h}, key)
            api(f'automations/{aid}/emails/{eid}', 'PUT', {
                'subject': meta['subject'],
                'from_name': sender['from_name'],
                'from': sender['from'],
                'plain_text': p,
            }, key)
            time.sleep(0.7)  # stay under MailerLite's 120 requests/minute
        print()


def cmd_verify(target_key):
    man = load_manifest()
    key = api_key()
    failures = 0
    for auto in man['automations']:
        if target_key not in (auto['key'], 'all'):
            continue
        if not auto['automation_id']:
            print(f"== {auto['key']}: NO automation_id yet")
            failures += 1
            continue
        data = fetch_auto(auto, key)
        chain = ordered_steps(data)
        print(f"== {auto['key']} · {data['name']} · enabled={data['enabled']}")
        want = auto['steps']
        if len(chain) != len(want):
            print(f"  FAIL step count: automation {len(chain)} vs manifest {len(want)}")
            failures += 1
            continue
        ei = 0
        for got, exp in zip(chain, want):
            if 'email' in exp:
                meta = parse_email(exp['email'])
                em = got.get('email') or {}
                ok = (got['type'] == 'email' and got.get('subject') == meta['subject']
                      and em.get('is_designed') and got.get('from_name') == man['sender']['from_name'])
                mark = 'ok ' if ok else 'FAIL'
                if not ok:
                    failures += 1
                print(f"  {mark} email[{ei}] {str(got.get('subject'))[:52]}  designed={em.get('is_designed')} from_name={got.get('from_name')}")
                ei += 1
            else:
                ok = got['type'] == 'delay' and int(got.get('value', 0)) == exp['delay_days'] and got.get('unit') == 'days'
                if not ok:
                    failures += 1
                    print(f"  FAIL delay: got {got.get('value')} {got.get('unit')}, want {exp['delay_days']} days")
        print()
    print('VERIFY:', 'ALL OK' if failures == 0 else f'{failures} FAILURES')
    sys.exit(1 if failures else 0)


if __name__ == '__main__':
    args = sys.argv[1:]
    if not args:
        sys.exit(__doc__)
    cmd = args[0]
    if cmd == 'render':
        cmd_render()
    elif cmd == 'skeletons':
        cmd_skeletons()
    elif cmd == 'load':
        cmd_load(args[1] if len(args) > 1 else 'all', '--live' in args)
    elif cmd == 'verify':
        cmd_verify(args[1] if len(args) > 1 and not args[1].startswith('-') else 'all')
    else:
        sys.exit(__doc__)
