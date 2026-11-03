import json
from pathlib import Path
for p in Path('data').glob('Map*.json'):
 if p.name=='MapInfos.json':continue
 for e in json.loads(p.read_text(encoding='utf-8-sig'))['events']:
  if not e:continue
  for pg in e['pages']:
   a=pg['list'];cs=[c for c in a if c['code']==126 and c['parameters'][0] in range(2,30)]
   if cs:print(p.stem,e['id'],e['name'],[c['parameters'] for c in cs], ' | '.join(str(c['parameters'][0]) for c in a if c['code']==401)[:360])
