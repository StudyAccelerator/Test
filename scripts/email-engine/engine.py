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

# Waleed's sign-off block, matching the one his MailerLite builder emails have used
# since July 2026 (checked against the live E0 and P0 on 12 September 2026).
#
# The photo is 1536x2048, a PORTRAIT, not a square. His builder block sets width
# only and lets the height scale, so never give this img a height attribute or a
# fixed CSS height: doing that squashes his face, which is exactly what the first
# version of this signature did. If a true circle is ever wanted, the fix is a
# square-cropped upload, not CSS.
SIG_IMG = 'https://storage.mlcdn.com/account_image/2113061/3SoYgyuLfUdmX53Lnw82S2YV4c6PnZsQch9dP7T5.jpg'
SIG_TEXT = f"margin:0;font-family:{FONT};font-size:16px;line-height:165%;color:#515856;"
SIG_LINK = "color:#515856;text-decoration:underline;"
VALEDICTIONS = ('Kind regards,', 'Best wishes,', 'Talk soon,', 'Warm wishes,', 'All the best,')


def photo_sig(valediction='Kind regards,'):
    """The signature block: round photo left, sign-off and credentials right."""
    return (
        '<table role="presentation" border="0" cellspacing="0" cellpadding="0"'
        ' style="margin:30px 0 4px 0;">'
        '<tr>'
        '<td align="center" valign="top" width="80" style="width:80px;">'
        f'<img src="{SIG_IMG}" width="80" border="0" alt="Dr Waleed Ahmad"'
        ' style="display:inline-block;max-width:80px;border-radius:80px;"></td>'
        '<td width="30" style="width:30px;line-height:30px;">&nbsp;</td>'
        '<td valign="middle" align="left">'
        f'<p style="{SIG_TEXT}">{html.escape(valediction)}<br>Dr Waleed Ahmad<br>'
        f'<a href="https://alevelaccelerators.com" style="{SIG_LINK}">Founder of A-Level Accelerators</a><br>'
        f'<a href="mailto:waleed@alevelaccelerators.com" style="{SIG_LINK}">waleed@alevelaccelerators.com</a>'
        '</p></td></tr></table>'
    )


SIG_PLAIN = ('Dr Waleed Ahmad\nFounder of A-Level Accelerators\n'
             'alevelaccelerators.com\nwaleed@alevelaccelerators.com')


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
    return {'path': path, 'subject': subject, 'preheader': preheader, 'body': body.strip(),
            'no_signature': (field('Signature') or '').lower() == 'none'}


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


def lift_signoff(blocks):
    """Pull the written sign-off out of the body so the photo block can carry it,
    the way Waleed's own builder emails are laid out: body, then any PS, then one
    signature block at the very end.

    Takes the markdown blocks. Removes the bare 'Waleed' line, the valediction
    immediately above it if there is one, and a plain credentials line just below
    it. Returns (remaining blocks, the valediction to print in the block)."""
    sig_ix = None
    for i, b in enumerate(blocks):
        if b.strip() == 'Waleed':
            sig_ix = i
    if sig_ix is None:
        return blocks, 'Kind regards,'
    valediction = 'Kind regards,'
    start = sig_ix
    if sig_ix and blocks[sig_ix - 1].strip() in VALEDICTIONS:
        valediction = blocks[sig_ix - 1].strip()
        start = sig_ix - 1
    end = sig_ix + 1
    if end < len(blocks) and blocks[end].lstrip().startswith('Dr Waleed Ahmad'):
        end += 1
    return blocks[:start] + blocks[end:], valediction


def render_email(meta, footer):
    blocks = [b for b in re.split(r'\n\s*\n', meta['body']) if b.strip()]
    sig = ''
    if not meta.get('no_signature'):
        blocks, valediction = lift_signoff(blocks)
        sig = photo_sig(valediction)
    paras = [para_html(b) for b in blocks]
    pre = html.escape(meta['preheader'])
    return f"""<div style="display:none;max-height:0;overflow:hidden;mso-hide:all;">{pre}&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#ffffff;"><tr><td align="center">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;"><tr><td style="padding:32px 24px 40px 24px;">
{chr(10).join(paras)}
{sig}
<div style="border-top:1px solid #e6e2d8;margin-top:34px;padding-top:20px;">
<p style="margin:0;font-family:{FONT};font-size:14px;line-height:150%;color:#515856;text-align:center;">
{html.escape(footer)}<br><br>
<a href="{{$unsubscribe}}" style="{SIG_LINK}">Unsubscribe</a></p>
</div>
</td></tr></table></td></tr></table>"""


def render_plain(meta, footer):
    blocks = [b for b in re.split(r'\n\s*\n', meta['body']) if b.strip()]
    tail = ''
    if not meta.get('no_signature'):
        blocks, valediction = lift_signoff(blocks)
        tail = f'\n\n{valediction}\n{SIG_PLAIN}'
    body = '\n\n'.join(blocks) + tail
    body = re.sub(r'^\[BUTTON: (.+?) -> (\S+?)\]$', r'\1:\n\2', body, flags=re.M)
    body = re.sub(r'^\[LINK: (.+?) -> (\S+?)\]$', r'\1:\n\2', body, flags=re.M)
    body = re.sub(r'^\[BOX START.*\]$', 'From your report:', body, flags=re.M)
    body = re.sub(r'^\[BOX END\]$', '', body, flags=re.M)
    body = re.sub(r'\*\*(.+?)\*\*', r'\1', body, flags=re.S)
    body = re.sub(r'\n{3,}', '\n\n', body)
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
                # manifest delays are whole days (delay_days) or, for the six hour
                # follow-ups, whole hours (delay_hours)
                if 'delay_hours' in exp:
                    want_v, want_u = exp['delay_hours'], 'hours'
                else:
                    want_v, want_u = exp['delay_days'], 'days'
                ok = got['type'] == 'delay' and int(got.get('value', 0)) == want_v and got.get('unit') == want_u
                if not ok:
                    failures += 1
                    print(f"  FAIL delay: got {got.get('value')} {got.get('unit')}, want {want_v} {want_u}")
        print()
    print('VERIFY:', 'ALL OK' if failures == 0 else f'{failures} FAILURES')
    sys.exit(1 if failures else 0)


def cmd_campaigns(dirpath, live, update=False):
    """Create the broadcast emails in a folder's manifest as DRAFT campaigns.
    Nothing is scheduled or sent; each campaign waits in MailerLite as a draft.
    With --update, entries that already carry a campaign_id are rewritten in
    place (PUT /campaigns/{id}: same body as create), so copy edits in the repo
    reach the existing drafts without duplicating them. Only drafts can be
    updated; a campaign that has already been sent is skipped with a note."""
    d = pathlib.Path(dirpath)
    if not d.is_absolute():
        d = ROOT / d
    man_path = d / 'manifest.json'
    man = json.loads(man_path.read_text())
    key = api_key()
    created, updated = [], []
    for c in man['campaigns']:
        meta = parse_email(str(d.relative_to(ROOT) / c['file']))
        aud = c['audience']
        footer = man['footers'][aud]
        h = render_email(meta, footer)
        p = render_plain(meta, footer)
        print(f"{c['key']:>4}  {c['name'][:52]:<54} {meta['subject'][:44]}")
        if not live:
            continue
        body = {
            'name': c['name'],
            'type': 'regular',
            'groups': man['audiences'][aud],
            'emails': [{
                'subject': meta['subject'],
                'from': 'waleed@alevelaccelerators.com',
                'from_name': 'Dr Waleed Ahmad',
                'content': h,
            }],
        }
        cid = c.get('campaign_id')
        if cid:
            if not update:
                print(f"      = already exists as campaign {cid} (pass --update to rewrite it)")
                continue
            current = api(f'campaigns/{cid}', 'GET', None, key)['data']
            if current.get('status') != 'draft':
                print(f"      ! campaign {cid} is {current.get('status')}, not a draft; left alone")
                continue
            api(f'campaigns/{cid}', 'PUT', body, key)
            updated.append((c['key'], cid))
            print(f"      -> updated draft campaign {cid}")
        else:
            out = api('campaigns', 'POST', body, key)
            cid = out['data']['id']
            c['campaign_id'] = cid
            created.append((c['key'], cid))
            print(f"      -> draft campaign {cid}")
        time.sleep(0.7)
    if live:
        if created:
            man_path.write_text(json.dumps(man, indent=1, ensure_ascii=False) + '\n')
        print(f"\ncreated {len(created)}, updated {len(updated)} draft campaigns "
              f"(send hints are in the manifest; schedule on approval)")


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
    elif cmd == 'campaigns':
        cmd_campaigns(args[1], '--live' in args, '--update' in args)
    else:
        sys.exit(__doc__)
