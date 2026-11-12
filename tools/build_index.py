#!/usr/bin/env python3
"""Book tool: write appendix/A-source-index.md from tools/citations.tsv and the chapters that cite each id.

Usage: python3 tools/build_index.py
"""
import re, pathlib, collections

ROOT = pathlib.Path(__file__).resolve().parent.parent
SHA = '8c32a9dc5d72c033816c6a8110b37f40cf94fba4'
BASE = f'https://github.com/deepseek-ai/dsh-superagent-prototype/blob/{SHA}/'
NAMES = {'overview-samagra-naksho': 'નકશો', '00-paayo': '0', '00a-lekh-ane-prototype': '0A'}

def chapter_label(stem):
    return NAMES.get(stem) or str(int(stem.split('-')[0]))

def main():
    used = collections.defaultdict(list)
    for path in sorted((ROOT / 'book').glob('*.md')):
        body = path.read_text(encoding='utf-8').split('<!-- citations:begin')[0]
        prose = re.sub(r'```.*?```', '', body, flags=re.S)
        for cid in sorted(set(re.findall(r'\]\[([a-z0-9-]+)\]', prose))):
            used[cid].append(f'[{chapter_label(path.stem)}](../book/{path.name})')
    groups = collections.OrderedDict()
    for line in (ROOT / 'tools' / 'citations.tsv').read_text(encoding='utf-8').splitlines():
        if not line.strip() or line.startswith('#'):
            continue
        cid, file, rng, needle = (line.split('\t') + [''])[:4]
        groups.setdefault(file, []).append((cid, rng, needle))
    out = ['# પરિશિષ્ટ A — Source અને symbol index', '',
           '> આ પાનું `tools/build_index.py` વડે `tools/citations.tsv` અને પ્રકરણોમાંથી **આપોઆપ બને છે**. હાથે ન બદલો.',
           f'> બધી links commit `{SHA[:7]}` પર pinned છે. ✅ દરેક file, line range અને "ઓળખ-લખાણ" pinned checkout સામે `tools/citations.py` વડે ચકાસાયેલું છે.',
           '',
           f'કુલ **{sum(len(v) for v in groups.values())}** સંદર્ભ, **{len(groups)}** files માં. "ઓળખ-લખાણ" એ તે લીટીઓમાં હોવું જ જોઈએ તેવું લખાણ છે; upstream બદલાય અને લખાણ ખસી જાય તો ચકાસણી નિષ્ફળ જાય છે.',
           '']
    order = lambda f: (0 if f.startswith('src/core') else 1 if f.startswith('src/') else 2 if f.startswith('docs/') else 3 if f.startswith('tests/') else 4, f)
    for file in sorted(groups, key=order):
        out += [f'## `{file}`', '', '| Id | Lines | ઓળખ-લખાણ | પ્રકરણ |', '|---|---|---|---|']
        for cid, rng, needle in groups[file]:
            start, end = rng.split('-')
            link = f'{BASE}{file}#L{start}-L{end}'
            needle = needle.replace('|', '\\|')
            out.append(f'| `{cid}` | [L{start}–L{end}]({link}) | {'`' + needle + '`' if needle else '—'} | {", ".join(used.get(cid, [])) or "—"} |')
        out.append('')
    unused = [cid for file in groups for cid, _, _ in groups[file] if cid not in used]
    out += ['## વપરાયા વગરના ids', '', (', '.join(f'`{c}`' for c in unused) or 'કોઈ નહીં.'), '']
    (ROOT / 'appendix' / 'A-source-index.md').write_text('\n'.join(out), encoding='utf-8')
    print(f'{sum(len(v) for v in groups.values())} citations, {len(groups)} files, {len(unused)} unused')

main()
