#!/usr/bin/env python3
"""Content compliance scan for A-Level Accelerators.

Checks blog/content files against the brand voice hard rules:
- no em dashes or en dashes
- no curly quotes in code/content strings
- no banned AI-tell vocabulary
- flags "not just X, but Y" constructions

Usage: python3 compliance-scan.py <file> [<file> ...]
Exit 0 = clean, 1 = violations found.
"""
import re
import sys

BANNED_WORDS = [
    "delve", "tapestry", "pivotal", "crucial", "robust", "testament",
    "underscore", "leverage", "seamless", "comprehensive", "foster",
    "garner", "vibrant", "meticulous", "unlock", "elevate", "game-changing",
    "moreover", "furthermore", "look no further",
]
BANNED_PHRASES = [
    "in today's fast-paced world", "when it comes to", "the world of",
    "dive in", "dive into",
]
# 'landscape' and 'navigate' banned in metaphorical use; flag every use for review
REVIEW_WORDS = ["landscape", "navigate", "navigating"]

def scan(path: str) -> list[str]:
    issues = []
    try:
        text = open(path, encoding="utf-8").read()
    except OSError as e:
        return [f"cannot read: {e}"]
    for i, line in enumerate(text.splitlines(), 1):
        if "—" in line or "–" in line:
            issues.append(f"{path}:{i}: EM/EN DASH: {line.strip()[:90]}")
        for ch in ("‘", "’", "“", "”"):
            if ch in line:
                # apostrophes inside JSX text are written &apos; in this repo
                issues.append(f"{path}:{i}: CURLY QUOTE ({ch!r}): {line.strip()[:90]}")
                break
        low = line.lower()
        for w in BANNED_WORDS:
            if re.search(rf"\b{re.escape(w)}\b", low):
                issues.append(f"{path}:{i}: BANNED WORD '{w}': {line.strip()[:90]}")
        for p in BANNED_PHRASES:
            if p in low:
                issues.append(f"{path}:{i}: BANNED PHRASE '{p}': {line.strip()[:90]}")
        for w in REVIEW_WORDS:
            if re.search(rf"\b{re.escape(w)}\b", low):
                issues.append(f"{path}:{i}: REVIEW (metaphor ban) '{w}': {line.strip()[:90]}")
        if re.search(r"\bnot just\b.{3,60}\bbut\b", low):
            issues.append(f"{path}:{i}: 'not just X, but Y' pattern: {line.strip()[:90]}")
        # numeric range joined by hyphen in prose (e.g. "4-6 hours"); allow dates in
        # ISO strings, code identifiers, CSS classes by only flagging digit-digit
        # with surrounding spaces-word context
        if re.search(r"(?<![\w/:-])\d+\s?-\s?\d+(?![\w%-])", line) and not re.search(
            r"(datePublished|dateModified|\d{4}-\d{2}-\d{2}|#|px|rgb|w-\d|h-\d)", line
        ):
            issues.append(f"{path}:{i}: HYPHEN RANGE (write 'X to Y'): {line.strip()[:90]}")
    return issues

def main() -> int:
    all_issues = []
    for path in sys.argv[1:]:
        all_issues.extend(scan(path))
    if all_issues:
        print("\n".join(all_issues))
        print(f"\n{len(all_issues)} issue(s) found")
        return 1
    print("clean")
    return 0

if __name__ == "__main__":
    sys.exit(main())
