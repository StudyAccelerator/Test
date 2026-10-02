#!/usr/bin/env python3
"""
Fathom session logger for A-Level Accelerators.

Pulls meeting recordings out of Fathom, works out which student each one
belongs to and whether it was a mentorship session or a sales call, and keeps
a per session record that the HQ dashboard reads and that exports to a
spreadsheet.

It never writes anything back to Fathom and it never sends a message to a
student. Drafting the student message is a separate step done by a Claude
session, which patches the record through the `patch` command below.

Talks to Fathom through the official MCP server over stdio, reusing the OAuth
grant already stored in ~/.mcp-auth, so there is no API key to manage.

Usage:
  python3 fathom_sessions.py pull --since 30
  python3 fathom_sessions.py pull --since 2026-09-01 --transcripts
  python3 fathom_sessions.py list
  python3 fathom_sessions.py show <recording_id>
  python3 fathom_sessions.py patch <recording_id> --file patch.json
  python3 fathom_sessions.py export-csv [path]
"""

import argparse
import csv
import datetime as dt
import json
import os
import re
import subprocess
import sys
import time

REPO = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
DATA_DIR = os.path.join(REPO, 'dashboard', 'data')
STORE = os.path.join(DATA_DIR, 'student-sessions.json')
CACHE_DIR = os.path.join(DATA_DIR, 'fathom-cache')
DEFAULT_CSV = os.path.join(DATA_DIR, 'student-session-log.csv')

MCP_CMD = ['npx', '-y', 'mcp-remote@latest', 'https://api.fathom.ai/mcp']

# How a meeting title tells us what the meeting was.
MENTORSHIP_MARKERS = ['top 1% mentorship', 'top 1 percent mentorship', 'mentorship']
SALES_MARKERS = ['strategy call', 'academic strategy', 'a-level strategy', 'discovery call']


# ---------------------------------------------------------------- MCP client

class Fathom:
    """Minimal JSON-RPC client that speaks to the Fathom MCP server."""

    def __init__(self, timeout=180):
        self.timeout = timeout
        self.proc = None
        self.next_id = 0

    def __enter__(self):
        self.proc = subprocess.Popen(
            MCP_CMD, stdin=subprocess.PIPE, stdout=subprocess.PIPE,
            stderr=subprocess.DEVNULL, text=True, bufsize=1)
        self._send({'jsonrpc': '2.0', 'id': self._id(), 'method': 'initialize',
                    'params': {'protocolVersion': '2024-11-05', 'capabilities': {},
                               'clientInfo': {'name': 'ala-session-logger', 'version': '1'}}})
        self._await(0)
        self._send({'jsonrpc': '2.0', 'method': 'notifications/initialized', 'params': {}})
        return self

    def __exit__(self, *exc):
        if self.proc:
            try:
                self.proc.terminate()
                self.proc.wait(timeout=10)
            except Exception:
                self.proc.kill()

    def _id(self):
        i = self.next_id
        self.next_id += 1
        return i

    def _send(self, obj):
        self.proc.stdin.write(json.dumps(obj) + '\n')
        self.proc.stdin.flush()

    def _await(self, want_id):
        deadline = time.time() + self.timeout
        while time.time() < deadline:
            line = self.proc.stdout.readline()
            if not line:
                raise RuntimeError('Fathom MCP connection closed. Re-authorise with: '
                                   'npx mcp-remote@latest https://api.fathom.ai/mcp')
            try:
                msg = json.loads(line)
            except ValueError:
                continue
            if msg.get('id') == want_id:
                if 'error' in msg:
                    raise RuntimeError(f"Fathom error: {msg['error']}")
                return msg.get('result', {})
        raise RuntimeError('Timed out waiting for Fathom.')

    def call(self, tool, **args):
        rid = self._id()
        self._send({'jsonrpc': '2.0', 'id': rid, 'method': 'tools/call',
                    'params': {'name': tool, 'arguments': args}})
        result = self._await(rid)
        chunks = [c.get('text', '') for c in result.get('content', []) if c.get('type') == 'text']
        return '\n'.join(chunks)


# ------------------------------------------------------------- classification

def classify(title):
    low = (title or '').lower()
    if any(m in low for m in MENTORSHIP_MARKERS):
        return 'mentorship'
    if any(m in low for m in SALES_MARKERS):
        return 'sales_call'
    return 'other'


def student_name(title):
    """Pull the student's name out of a meeting title.

    Handles 'Haneen Top 1% Mentorship', 'Finn Academic Strategy Call' and
    "Dr Waleed Ahmad's Academic Strategy Call  (Alice Akelo)".
    """
    if not title:
        return ''
    title = title.strip()
    bracket = re.search(r'\(([^)]+)\)\s*$', title)
    if bracket:
        return bracket.group(1).strip()
    low = title.lower()
    cut = len(title)
    for marker in MENTORSHIP_MARKERS + SALES_MARKERS + ['mentorship', 'strategy call']:
        idx = low.find(marker)
        if idx > 0:
            cut = min(cut, idx)
    lead = title[:cut].strip(" -|·:")
    # Titles are written loosely: "Angela's", "Eman’s", "Samar's A-Level...".
    lead = re.sub(r"['’]s$", '', lead).strip()
    # A leading name is at most three words and never starts with 'Dr'.
    if not lead or lead.lower().startswith('dr ') or len(lead.split()) > 3:
        return ''
    return lead


ROSTER = os.path.join(DATA_DIR, 'student-roster.json')


def load_roster():
    """Current mentorship students. Used to flag sessions with an unknown name."""
    try:
        with open(ROSTER) as fh:
            return json.load(fh)
    except Exception:
        return {'students': []}


def roster_match(name):
    """Map a loose meeting-title name onto the roster. Returns the canonical name."""
    if not name:
        return ''
    low = name.lower()
    for s in load_roster().get('students', []):
        canon = s.get('name', '')
        if not canon:
            continue
        if low == canon.lower() or low.startswith(canon.lower()) or canon.lower() in low:
            return canon
        for alias in s.get('aliases', []):
            if low == alias.lower() or alias.lower() in low:
                return canon
    return name


# --------------------------------------------------------------- parse output

MEETING_LINE = re.compile(
    r'^-\s+(?P<title>.+?)\s+\|\s+(?P<date>\d{4}-\d{2}-\d{2})\s+\|\s+id:\s*(?P<id>\d+)\s+\|\s+url:\s*(?P<url>\S+)')


def parse_meetings(text):
    """Turn the MCP server's text listing into structured meetings."""
    meetings = []
    current = None
    mode = None
    for raw in text.splitlines():
        m = MEETING_LINE.match(raw.strip()) if raw.strip().startswith('- ') else None
        if m:
            current = {'title': m.group('title').strip(), 'date': m.group('date'),
                       'recording_id': int(m.group('id')), 'url': m.group('url'),
                       'summary': '', 'action_items': ''}
            meetings.append(current)
            mode = None
            continue
        if current is None:
            continue
        stripped = raw.strip()
        if stripped.lower().startswith('summary:'):
            mode = 'summary'
            continue
        if stripped.lower().startswith('action items:'):
            mode = 'action_items'
            continue
        if mode and stripped:
            current[mode] += ('\n' if current[mode] else '') + stripped
    return meetings


def clean(text):
    """Fathom escapes markdown headings. Make the summary readable again."""
    if not text:
        return ''
    text = text.replace('\\#', '#').replace('\\*', '*').replace('\\_', '_')
    text = re.sub(r'(?<!\n)(#{2,4} )', r'\n\1', text)
    return text.strip()


# ------------------------------------------------------------------- storage

def load_store():
    try:
        with open(STORE) as fh:
            return json.load(fh)
    except Exception:
        return {'sessions': [], 'lastPull': None, 'lastPullStatus': 'never run'}


def save_store(store):
    os.makedirs(DATA_DIR, exist_ok=True)
    tmp = STORE + '.tmp'
    with open(tmp, 'w') as fh:
        json.dump(store, fh, indent=2)
    os.replace(tmp, STORE)


def blank_record(m):
    return {
        'recording_id': m['recording_id'],
        'date': m['date'],
        'title': m['title'],
        'url': m['url'],
        'type': classify(m['title']),
        'student': roster_match(student_name(m['title'])),
        'fathom_summary': clean(m.get('summary', '')),
        'fathom_action_items': clean(m.get('action_items', '')),
        'has_transcript': False,
        # Everything below is filled in by a Claude session, never by this script.
        'covered': '',
        'struggled_with': '',
        'tasks_set': '',
        'next_session_focus': '',
        'student_message': '',
        'message_status': 'not drafted',
        'message_sent_at': None,
        'notes': '',
        # Waleed's own coaching note. Private: never sent, never in a student message.
        'private_feedback': '',
    }


# ------------------------------------------------------------------ commands

def cmd_pull(args):
    since = args.since
    if re.fullmatch(r'\d+', str(since)):
        start = dt.datetime.utcnow() - dt.timedelta(days=int(since))
        created_after = start.strftime('%Y-%m-%dT00:00:00Z')
    else:
        created_after = since if 'T' in str(since) else f'{since}T00:00:00Z'

    store = load_store()
    by_id = {s['recording_id']: s for s in store['sessions']}
    added, updated, transcripts = 0, 0, 0

    try:
        with Fathom() as fathom:
            text = fathom.call('list_meetings', created_after=created_after,
                               include_summary=True, include_action_items=True,
                               max_pages=args.max_pages)
            meetings = parse_meetings(text)

            for m in meetings:
                kind = classify(m['title'])
                if kind == 'other' and not args.include_other:
                    continue
                rec = by_id.get(m['recording_id'])
                if rec is None:
                    rec = blank_record(m)
                    by_id[m['recording_id']] = rec
                    store['sessions'].append(rec)
                    added += 1
                else:
                    # Refresh only the machine side. Never overwrite written work.
                    fresh_summary = clean(m.get('summary', ''))
                    if fresh_summary and fresh_summary != rec.get('fathom_summary'):
                        rec['fathom_summary'] = fresh_summary
                        updated += 1
                    fresh_actions = clean(m.get('action_items', ''))
                    if fresh_actions:
                        rec['fathom_action_items'] = fresh_actions
                    rec['title'] = m['title']
                    rec['url'] = m['url']
                    rec['date'] = m['date']

                if args.transcripts and not rec.get('has_transcript'):
                    body = fathom.call('get_meeting_transcript',
                                       recording_id=m['recording_id'], url=m['url'])
                    if body and 'No transcript' not in body[:60]:
                        os.makedirs(CACHE_DIR, exist_ok=True)
                        path = os.path.join(CACHE_DIR, f"{m['recording_id']}.txt")
                        with open(path, 'w') as fh:
                            fh.write(body)
                        rec['has_transcript'] = True
                        transcripts += 1

        store['lastPull'] = dt.datetime.utcnow().isoformat(timespec='seconds') + 'Z'
        store['lastPullStatus'] = 'ok'
    except Exception as err:
        store['lastPull'] = dt.datetime.utcnow().isoformat(timespec='seconds') + 'Z'
        store['lastPullStatus'] = f'failed: {err}'
        save_store(store)
        print(f'Pull failed: {err}', file=sys.stderr)
        return 1

    store['sessions'].sort(key=lambda s: (s['date'], s['recording_id']), reverse=True)
    save_store(store)
    print(f'{added} new session(s), {updated} summary refresh(es), '
          f'{transcripts} transcript(s) cached. Store: {STORE}')
    return 0


def cmd_list(args):
    store = load_store()
    rows = store['sessions']
    if args.student:
        rows = [r for r in rows if r['student'].lower() == args.student.lower()]
    if args.type:
        rows = [r for r in rows if r['type'] == args.type]
    if args.undrafted:
        rows = [r for r in rows if r['message_status'] == 'not drafted']
    for r in rows:
        flag = '*' if r['message_status'] == 'not drafted' else ' '
        print(f"{flag} {r['date']}  {r['recording_id']}  {r['type']:<11} "
              f"{(r['student'] or '?'):<12} {r['title'][:52]}")
    print(f'\n{len(rows)} session(s). * = student message not drafted yet.')
    return 0


def cmd_show(args):
    store = load_store()
    for r in store['sessions']:
        if str(r['recording_id']) == str(args.recording_id):
            print(json.dumps(r, indent=2))
            tpath = os.path.join(CACHE_DIR, f"{r['recording_id']}.txt")
            if os.path.exists(tpath):
                print(f'\nTranscript: {tpath}')
            return 0
    print('Not found.', file=sys.stderr)
    return 1


def cmd_patch(args):
    """Patch the written fields of one session. Used by a Claude session."""
    with open(args.file) as fh:
        patch = json.load(fh)
    allowed = {'covered', 'struggled_with', 'tasks_set', 'next_session_focus',
               'student_message', 'message_status', 'message_sent_at', 'notes',
               'private_feedback', 'student', 'type'}
    bad = set(patch) - allowed
    if bad:
        print(f'Refusing to patch protected field(s): {sorted(bad)}', file=sys.stderr)
        return 1
    store = load_store()
    for r in store['sessions']:
        if str(r['recording_id']) == str(args.recording_id):
            r.update(patch)
            if patch.get('student_message') and r['message_status'] == 'not drafted':
                r['message_status'] = 'drafted'
            save_store(store)
            print(f"Patched {args.recording_id}: {', '.join(sorted(patch))}")
            return 0
    print('Not found.', file=sys.stderr)
    return 1


# Column order matters: this is exactly how the Google Sheet is laid out, and the
# fallback import rebuilds the sheet from this file. The WhatsApp draft sits
# fourth on purpose, because it is the column Waleed reaches for most.
CSV_COLUMNS = [
    ('date', 'Date'),
    ('student', 'Student'),
    ('type', 'Session type'),
    ('student_message', 'WhatsApp draft'),
    ('tasks_set', 'Tasks for next meeting'),
    ('covered', 'What we covered'),
    ('struggled_with', 'Where they struggled'),
    ('next_session_focus', 'Start next session with'),
    ('notes', 'Student details and notes'),
    ('private_feedback', 'My feedback (private)'),
    ('message_status', 'WhatsApp status'),
    ('url', 'Recording'),
]


def cmd_export_csv(args):
    store = load_store()
    path = args.path or DEFAULT_CSV
    rows = [r for r in store['sessions'] if r['type'] == 'mentorship'] \
        if args.mentorship_only else store['sessions']
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, 'w', newline='') as fh:
        w = csv.writer(fh)
        w.writerow([label for _, label in CSV_COLUMNS])
        order = (lambda s: (s['student'] or 'zz', s['date'])) if args.by_student \
            else (lambda s: (s['date'], s['recording_id']))
        for r in sorted(rows, key=order, reverse=not args.by_student):
            w.writerow([
                str(r.get(key, '') or '') if key == 'student_message'
                else str(r.get(key, '') or '').replace('\n', ' ')
                for key, _ in CSV_COLUMNS
            ])
    print(f'{len(rows)} row(s) written to {path}')
    return 0


def cmd_whatsapp(args):
    """Print the drafted WhatsApp message so it can be pasted straight in."""
    store = load_store()
    rows = [r for r in store['sessions'] if r.get('student_message')]
    if args.recording_id:
        rows = [r for r in rows if str(r['recording_id']) == str(args.recording_id)]
    elif args.unsent:
        rows = [r for r in rows if r['message_status'] != 'sent']
    if args.student:
        rows = [r for r in rows if r['student'].lower() == args.student.lower()]
    rows.sort(key=lambda r: r['date'], reverse=True)
    for r in rows[:args.limit]:
        print('=' * 62)
        print(f"{r['student']}  |  {r['date']}  |  {r['type']}  |  id {r['recording_id']}")
        print('=' * 62)
        print(r['student_message'])
        print()
    if not rows:
        print('Nothing drafted yet.')
    return 0


def cmd_mark_sent(args):
    store = load_store()
    for r in store['sessions']:
        if str(r['recording_id']) == str(args.recording_id):
            r['message_status'] = 'sent'
            r['message_sent_at'] = dt.datetime.utcnow().isoformat(timespec='seconds') + 'Z'
            save_store(store)
            print(f"Marked sent: {r['student']} {r['date']}")
            return 0
    print('Not found.', file=sys.stderr)
    return 1


# ------------------------------------------------------------------ workbook

PROFILES = os.path.join(DATA_DIR, 'student-profiles.json')

PROFILE_ROWS = [
    ('year', 'Year'),
    ('subjects', 'Subjects'),
    ('exam_board', 'Exam board'),
    ('working_at', 'Working at now'),
    ('target', 'Target'),
    ('goal', 'What they want it for'),
    ('started', 'First session'),
    ('sessions_so_far', 'Sessions so far'),
    ('next_session', 'Next session'),
]

HISTORY_COLS = ['Date', 'Type', 'What we covered', 'Where they struggled',
                'Tasks set', 'Open the next session with', 'Recording']


def load_profiles():
    try:
        with open(PROFILES) as fh:
            return json.load(fh)
    except Exception:
        return {}


def cmd_workbook(args):
    """Build the multi-tab spreadsheet: one overview tab plus a tab per student.

    Google Sheets imports every tab of an .xlsx in one go, which is why this
    exists: it means the whole spreadsheet is rebuilt in a single import rather
    than one fiddly import per student.
    """
    try:
        from openpyxl import Workbook
        from openpyxl.styles import Font, Alignment, PatternFill
        from openpyxl.utils import get_column_letter
    except ImportError:
        print('openpyxl is needed for the workbook: python3 -m pip install openpyxl',
              file=sys.stderr)
        return 1

    store = load_store()
    profiles = load_profiles()
    sessions = sorted(store['sessions'], key=lambda s: (s['date'], s['recording_id']),
                      reverse=True)

    wb = Workbook()
    head = Font(bold=True, color='FFFFFF')
    head_fill = PatternFill('solid', fgColor='4A3A6B')
    label = Font(bold=True)
    section = Font(bold=True, size=12, color='4A3A6B')
    wrap = Alignment(wrap_text=True, vertical='top')
    top = Alignment(vertical='top')

    # ---- overview tab -----------------------------------------------------
    ws = wb.active
    ws.title = 'All sessions'
    headers = [lbl for _, lbl in CSV_COLUMNS]
    ws.append(headers)
    for c in range(1, len(headers) + 1):
        ws.cell(1, c).font = head
        ws.cell(1, c).fill = head_fill
    for r in sessions:
        ws.append([str(r.get(k, '') or '') for k, _ in CSV_COLUMNS])
    widths = {'Date': 11, 'Student': 13, 'Session type': 13, 'WhatsApp draft': 60,
              'Tasks for next meeting': 50, 'What we covered': 50,
              'Where they struggled': 50, 'Start next session with': 40,
              'Student details and notes': 45, 'My feedback (private)': 50,
              'WhatsApp status': 14, 'Recording': 30}
    for i, h in enumerate(headers, start=1):
        ws.column_dimensions[get_column_letter(i)].width = widths.get(h, 20)
    for row in ws.iter_rows(min_row=2):
        for cell in row:
            cell.alignment = wrap
    ws.freeze_panes = 'A2'

    # ---- one tab per student ---------------------------------------------
    names = sorted({r['student'] for r in sessions if r['type'] == 'mentorship' and r['student']})
    for extra in profiles:
        if extra not in names:
            names.append(extra)
    names = sorted(set(names))

    for name in names:
        tab = wb.create_sheet(title=name[:31])
        p = profiles.get(name, {})
        tab['A1'] = name
        tab['A1'].font = Font(bold=True, size=16, color='4A3A6B')
        row = 3
        for key, lbl in PROFILE_ROWS:
            tab.cell(row, 1, lbl).font = label
            tab.cell(row, 2, str(p.get(key, 'not stated') or 'not stated')).alignment = wrap
            row += 1

        row += 1
        tab.cell(row, 1, 'WHERE THEY ARE').font = section
        row += 1
        tab.cell(row, 1, str(p.get('where_they_are', '') or '')).alignment = wrap
        tab.merge_cells(start_row=row, start_column=1, end_row=row + 3, end_column=7)
        row += 5

        tab.cell(row, 1, 'NEXT SESSION: WHAT TO COVER').font = section
        row += 1
        plan = str(p.get('next_session_plan', '') or '')
        for part in re.split(r'\s(?=\d\))', plan.strip()):
            if part.strip():
                tab.cell(row, 1, part.strip()).alignment = wrap
                tab.merge_cells(start_row=row, start_column=1, end_row=row, end_column=7)
                row += 1

        row += 1
        tab.cell(row, 1, 'WATCH OUT FOR').font = section
        row += 1
        tab.cell(row, 1, str(p.get('watch_out_for', '') or '')).alignment = wrap
        tab.merge_cells(start_row=row, start_column=1, end_row=row + 1, end_column=7)
        row += 3

        tab.cell(row, 1, 'EVERY SESSION SO FAR').font = section
        row += 1
        for i, h in enumerate(HISTORY_COLS, start=1):
            c = tab.cell(row, i, h)
            c.font = head
            c.fill = head_fill
        row += 1
        mine = [r for r in sessions if r['student'] == name]
        for r in mine:
            vals = [r['date'],
                    'Mentorship' if r['type'] == 'mentorship' else 'Sales call',
                    r.get('covered', ''), r.get('struggled_with', ''),
                    r.get('tasks_set', ''), r.get('next_session_focus', ''), r.get('url', '')]
            for i, v in enumerate(vals, start=1):
                tab.cell(row, i, str(v or '')).alignment = wrap
            row += 1

        for col, w in zip('ABCDEFG', [22, 46, 46, 46, 46, 40, 30]):
            tab.column_dimensions[col].width = w

    path = args.path or os.path.join(DATA_DIR, 'Student Sessions.xlsx')
    wb.save(path)
    print(f'{len(names)} student tab(s) plus the overview written to {path}')
    return 0


def main():
    p = argparse.ArgumentParser(description=__doc__,
                                formatter_class=argparse.RawDescriptionHelpFormatter)
    sub = p.add_subparsers(dest='cmd', required=True)

    pull = sub.add_parser('pull', help='fetch new recordings from Fathom')
    pull.add_argument('--since', default='30', help='days back, or an ISO date')
    pull.add_argument('--max-pages', type=int, default=5)
    pull.add_argument('--transcripts', action='store_true', help='cache full transcripts')
    pull.add_argument('--include-other', action='store_true',
                      help='keep meetings that are neither mentorship nor a sales call')
    pull.set_defaults(func=cmd_pull)

    ls = sub.add_parser('list', help='list stored sessions')
    ls.add_argument('--student')
    ls.add_argument('--type', choices=['mentorship', 'sales_call', 'other'])
    ls.add_argument('--undrafted', action='store_true')
    ls.set_defaults(func=cmd_list)

    show = sub.add_parser('show', help='print one session record')
    show.add_argument('recording_id')
    show.set_defaults(func=cmd_show)

    patch = sub.add_parser('patch', help='write the analysed fields of one session')
    patch.add_argument('recording_id')
    patch.add_argument('--file', required=True, help='JSON file of fields to set')
    patch.set_defaults(func=cmd_patch)

    wa = sub.add_parser('whatsapp', help='print drafted WhatsApp messages to paste')
    wa.add_argument('recording_id', nargs='?')
    wa.add_argument('--student')
    wa.add_argument('--unsent', action='store_true')
    wa.add_argument('--limit', type=int, default=10)
    wa.set_defaults(func=cmd_whatsapp)

    ms = sub.add_parser('mark-sent', help='record that a message was sent')
    ms.add_argument('recording_id')
    ms.set_defaults(func=cmd_mark_sent)

    wbk = sub.add_parser('workbook', help='build the multi-tab xlsx for Google Sheets')
    wbk.add_argument('path', nargs='?')
    wbk.set_defaults(func=cmd_workbook)

    exp = sub.add_parser('export-csv', help='write the spreadsheet')
    exp.add_argument('path', nargs='?')
    exp.add_argument('--mentorship-only', action='store_true')
    exp.add_argument('--by-student', action='store_true',
                     help='group by student instead of newest first')
    exp.set_defaults(func=cmd_export_csv)

    args = p.parse_args()
    sys.exit(args.func(args))


if __name__ == '__main__':
    main()
