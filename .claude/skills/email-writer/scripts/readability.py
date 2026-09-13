#!/usr/bin/env python3
"""Readability check for engine-format email markdown (the email-writer skill's bar).

Usage: python3 .claude/skills/email-writer/scripts/readability.py <file.md> [...]

Reads the body after the '---' header separator, strips link and button markup,
and reports words, paragraph lengths, sentence lengths and Flesch reading ease.
The bar (Waleed, 13 September 2026, tightened same day to match the approved
Sunday Session): paragraphs of one to three sentences (average 23 words or
fewer, none over 45), average sentence 13 words or fewer, no sentence over
30 words, Flesch reading ease 85 or above. Exits 1 on a miss."""
import re
import sys


def syllables(word):
    w = re.sub(r'[^a-z]', '', word.lower())
    if not w:
        return 0
    if len(w) <= 3:
        return 1
    w = re.sub(r'(?:[^laeiouy]es|ed|[^laeiouy]e)$', '', w)
    w = re.sub(r'^y', '', w)
    return max(1, len(re.findall(r'[aeiouy]{1,2}', w)))


def check(path):
    raw = open(path).read()
    body = raw.split('\n---\n', 1)[1] if '\n---\n' in raw else raw
    body = re.sub(r'\[(?:LINK|BUTTON): (.+?) -> \S+\]', r'\1.', body)
    body = re.sub(r'\[BOX START.*?\]|\[BOX END\]', '', body)
    body = re.sub(r'\[([^\]]+)\]\(\S+?\)', r'\1', body)
    body = re.sub(r'\{\$\w+(?:\|default\(\'([^\']*)\'\))?\}', lambda m: m.group(1) or 'Sam', body)
    body = body.replace('**', '')
    paras = [p for p in re.split(r'\n\s*\n', body) if p.strip()]
    sents = [s for s in re.split(r'(?<=[.!?:])\s+|\n', body) if re.search(r'[A-Za-z]', s)]
    words = re.findall(r"[A-Za-z0-9']+", body)
    if not words or not sents:
        print(f'{path}: empty body')
        return False
    syl = sum(syllables(w) for w in words)
    W, S = len(words), len(sents)
    fre = 206.835 - 1.015 * W / S - 84.6 * syl / W
    para_words = [len(re.findall(r"[A-Za-z0-9']+", p)) for p in paras]
    long_sents = [s.strip() for s in sents if len(s.split()) > 30]
    sent_counts = [len([x for x in re.split(r'(?<=[.!?])\s+', p.strip()) if re.search('[A-Za-z]', x)]) for p in paras]
    long_paras = [p.strip()[:60] for p, n, c in zip(paras, para_words, sent_counts)
                  if (n > 55 if p.strip().startswith('PS:')
                      else n > 45 or (c > 3 and n > 25))]
    avg_para = W / len(paras)
    avg_sent = W / S
    ok = avg_sent <= 13 and not long_sents and not long_paras and avg_para <= 23 and fre >= 85
    name = path.split('/')[-1]
    print(f"{'PASS' if ok else 'FAIL'} {name}: {W} words, {len(paras)} paragraphs "
          f"(avg {avg_para:.0f} words, longest {max(para_words)}), avg sentence {avg_sent:.1f} words, "
          f"reading ease {fre:.0f}")
    for s in long_sents:
        print(f'   long sentence ({len(s.split())} words): {s[:90]}')
    for p in long_paras:
        print(f'   long paragraph: {p}...')
    if avg_para > 23:
        print('   average paragraph over 23 words')
    if avg_sent > 13:
        print('   average sentence over 13 words')
    if fre < 85:
        print('   reading ease under 85')
    return ok


if __name__ == '__main__':
    results = [check(p) for p in sys.argv[1:]]
    sys.exit(0 if all(results) else 1)
