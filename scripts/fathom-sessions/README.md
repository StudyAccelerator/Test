# Student session logger (Fathom to spreadsheet)

Turns every recorded call into a row Waleed can scan before the next session,
a WhatsApp message he can send, and a private coaching note only he sees.

Built 29 September 2026 on Waleed's instruction, to replace doing all of this
by hand after each session.

## What it does

1. Reads recordings out of **Fathom** (read only, through the official Fathom
   MCP server, reusing the OAuth grant stored in `~/.mcp-auth`; no API key).
2. Works out from the meeting title whether it was a **mentorship session**
   with a current student or a **sales call** with a prospect, and which
   student or prospect it belongs to.
3. Stores one record per session in `dashboard/data/student-sessions.json`
   and caches the full transcript in `dashboard/data/fathom-cache/`.
   Both are gitignored: student data never reaches GitHub.
4. A Claude session (the scheduled task below, or a session on request) reads
   the transcript and fills in the written fields: what was covered, where the
   student struggled, the tasks set, what to start the next session with, the
   student details, the **WhatsApp draft**, and Waleed's **private feedback**.
5. Exports the spreadsheet and updates the Google Sheet.

## The spreadsheet

It is a workbook, not one grid, because forty sessions on a single page is not
readable before a session.

- **All sessions**, the overview: one row per call, newest first, with the
  WhatsApp draft in column D and the private feedback further along.
- **One tab per mentorship student**, which is what Waleed opens before a
  session. Each one leads with year, subjects, exam board, what they are working
  at now, target, what they want it for, first session, sessions so far and the
  next session date. Then where they are right now, what to cover next session,
  what to watch out for, and every session so far underneath.

The profile fields live in `dashboard/data/student-profiles.json`, keyed by
student name, and are kept current by a Claude session rather than by the
script: a session writes `next_session_plan` and `where_they_are` fresh after
almost every session, bumps `sessions_so_far`, and only touches `year`,
`subjects`, `working_at` or `target` when a call actually says so. Anything that
was never said is "not stated". `watch_out_for` is where a task that has slipped
twice gets named plainly.

`workbook` builds the .xlsx. Google Sheets imports every tab of an .xlsx in one
go, which is the whole reason it is a workbook: the spreadsheet rebuilds in a
single import rather than one per student.

## The hard rules

- **Nothing is ever sent.** The WhatsApp message is a draft Waleed copies and
  sends himself. The tool has no send path at all.
- **The private feedback is private.** It is Waleed's own coaching note, written
  to him. It never appears in a student message and never leaves his machine.
- **Never invent anything.** Grades, marks, dates and tasks come from the
  transcript or they do not appear. A session that says nothing about a grade
  gets no grade.
- **The machine side refreshes, the written side does not.** A re-pull updates
  Fathom's own summary and never overwrites written work. `patch` refuses to
  touch protected fields.

## Commands

```bash
# Pull new recordings (default: last 30 days) and cache transcripts
python3 scripts/fathom-sessions/fathom_sessions.py pull --since 14 --transcripts

# See what is stored, and what still needs a message drafted
python3 scripts/fathom-sessions/fathom_sessions.py list --undrafted

# Read one session in full (record plus the path to its transcript)
python3 scripts/fathom-sessions/fathom_sessions.py show 187889270

# Write the analysed fields for one session (used by a Claude session)
python3 scripts/fathom-sessions/fathom_sessions.py patch 187889270 --file patch.json

# Print the WhatsApp drafts ready to paste
python3 scripts/fathom-sessions/fathom_sessions.py whatsapp --unsent
python3 scripts/fathom-sessions/fathom_sessions.py whatsapp --student Leighton

# Record that one has been sent
python3 scripts/fathom-sessions/fathom_sessions.py mark-sent 187889270

# Write the spreadsheet: the flat CSV and the multi-tab workbook
python3 scripts/fathom-sessions/fathom_sessions.py export-csv
python3 scripts/fathom-sessions/fathom_sessions.py workbook
```

## The voice of the messages

The WhatsApp drafts go out under Waleed's name, so they follow the same voice
standard as his emails: `.claude/skills/content-studio/references/email-style-waleed.md`
and `.claude/skills/email-writer/references/plain-english.md`. The rules that
matter most here are joined sentences rather than fragment pairs, what was
covered written as prose rather than a bulleted list of nouns, a median sentence
of about twelve words, and a shape that varies between messages so they do not
read as generated. Check each one with the readability script in the
email-writer skill and with `scripts/compliance-scan.py`.

## The roster

`dashboard/data/student-roster.json` holds the current Top 1% Mentorship
students. It exists so loose meeting titles ("Angela's", "Ajmaal", "Yousuf")
all land on one canonical name, and so a mentorship session with a name that is
not on the roster gets noticed rather than silently filed. Add a student here
the day they join.

## Automation

The scheduled task `student-session-logger` runs through the day, checks the
calendar for calls that have finished, pulls anything new out of Fathom, writes
the records and drafts, updates the Google Sheet and pushes one notification.
It never sends a message and never schedules anything.

## Known limits

- Fathom takes a few minutes after a call to produce its summary. A session
  pulled too early has a transcript but no summary; the next run fills it in.
- Classification is by meeting title. Keep naming calls
  `<Name> Top 1% Mentorship` and `<Name> A-Level Strategy Call` and it stays
  reliable. A title it cannot read files as `other` and is skipped unless
  `--include-other` is passed.
- If Fathom's OAuth grant ever expires, re-authorise with:
  `npx mcp-remote@latest https://api.fathom.ai/mcp`
