#!/usr/bin/env python3
"""Book tool: build appendix/citations.generated.md from tools/citations.tsv.

Usage: python3 tools/citations.py <pinned dsh-superagent-prototype checkout>   (prints the table)

Every row of the TSV is `id, path, start-end, needle`. The tool fails when the file is
missing in the checkout, the line range is outside the file, or `needle` does not appear
inside the cited lines: a citation whose lines moved is caught here, not by the reader.
"""
import sys, pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent
SHA = '8c32a9dc5d72c033816c6a8110b37f40cf94fba4'
BASE = f'https://github.com/deepseek-ai/dsh-superagent-prototype/blob/{SHA}/'

def rows():
    for n, line in enumerate((ROOT / 'tools' / 'citations.tsv').read_text(encoding='utf-8').splitlines(), 1):
        if not line.strip() or line.startswith('#'):
            continue
        cells = line.split('\t')
        if len(cells) < 3:
            raise SystemExit(f'citations.tsv:{n}: expected id, path, lines[, needle]')
        cid, path, span = cells[0], cells[1], cells[2]
        needle = cells[3] if len(cells) > 3 else ''
        lo, _, hi = span.partition('-')
        yield n, cid, path, int(lo), int(hi or lo), needle

def main():
    checkout = pathlib.Path(sys.argv[1]).resolve()
    out = ['| id | file | lines | must contain | permalink |', '|---|---|---|---|---|']
    errors, seen = [], set()
    for n, cid, path, lo, hi, needle in rows():
        if cid in seen:
            errors.append(f'citations.tsv:{n}: duplicate id {cid}')
        seen.add(cid)
        target = checkout / path
        if not target.exists():
            errors.append(f'citations.tsv:{n}: {path} is not in the checkout'); continue
        lines = target.read_text(encoding='utf-8').splitlines()
        if not (1 <= lo <= hi <= len(lines)):
            errors.append(f'citations.tsv:{n}: {path} L{lo}-L{hi} is outside 1..{len(lines)}'); continue
        if needle and needle not in '\n'.join(lines[lo - 1:hi]):
            errors.append(f'citations.tsv:{n}: {cid}: "{needle}" is not in {path} L{lo}-L{hi}'); continue
        frag = f'#L{lo}' if lo == hi else f'#L{lo}-L{hi}'
        shown = needle.replace('|', '\\|')[:60]
        out.append(f'| `{cid}` | `{path}` | {lo}–{hi} | `{shown}` | [{path}{frag}]({BASE}{path}{frag}) |')
    if errors:
        print('\n'.join(errors), file=sys.stderr); sys.exit(1)
    print('\n'.join(out))

if __name__ == '__main__':
    main()
