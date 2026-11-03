import json
from pathlib import Path
r=lambda n:json.loads(Path('data/'+n+'.json').read_text(encoding='utf-8-sig'))
for p in Path('data').glob('Map*.json'):
 if p.name=='MapInfos.json':continue
 for e in json.loads(p.read_text(encoding='utf-8-sig'))['events']:
  if not e:continue
  for pg in e['pages']:
   for c in pg['list']:
    a=c['parameters'];code=c['code']
    if (code==111 and a[0]==8 and a[1]<35) or (code in [302,605] and a[0]==0 and a[1]<35):print(p.stem,e['id'],code,a)
