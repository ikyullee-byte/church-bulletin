#!/usr/bin/env python3
"""개역개정/*.md → bible/NN.json (NN = 1~66 성경 순서). 통독 본문 창에서 필요한 권만 불러 씁니다.

사용: python3 bible/build.py   (저장소 맨 위 폴더에서)
각 파일: {"name": "마가복음", "ch": [[[절번호, "본문"], ...], ...]}  (ch[0] = 1장, 합쳐진 절은 "18-19" 같은 글자)
본문 중간에 섞여 있는 소제목 상호참조 \\<...\\> 표시는 뺍니다.
"""
import json, re, glob, os

root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
files = sorted(glob.glob(os.path.join(root, '개역개정', '[12]-[0-9][0-9]*.md')))
assert len(files) == 66, len(files)
os.makedirs(os.path.join(root, 'bible'), exist_ok=True)
total = 0
for i, f in enumerate(files, 1):
    name = re.sub(r'^[12]-\d+', '', os.path.basename(f)[:-3])
    chapters, cur = [], None
    for line in open(f, encoding='utf-8'):
        line = line.rstrip('\n')
        m = re.match(r'^## (\d+)장\s*$', line) or re.match(r'^### (\d+)편\s*$', line)
        if m:
            assert int(m.group(1)) == len(chapters) + 1, (name, m.group(1))
            cur = []
            chapters.append(cur)
            continue
        m = re.match(r'^\*\*(\d+(?:-\d+)?)\*\* (.*)$', line)
        if m and cur is not None:
            text = re.sub(r'\\<.*?\\>\s*', '', m.group(2))
            text = re.sub(r'\s+', ' ', text).strip()
            n = m.group(1)
            cur.append([int(n) if n.isdigit() else n, text])
            total += 1 if n.isdigit() else int(n.split('-')[1]) - int(n.split('-')[0]) + 1
    json.dump({'name': name, 'ch': chapters}, open(os.path.join(root, 'bible', f'{i:02d}.json'), 'w', encoding='utf-8'),
              ensure_ascii=False, separators=(',', ':'))
print('책 66권, 절', total)
