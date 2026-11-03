import json
from pathlib import Path
r=lambda n:json.loads(Path('data/'+n+'.json').read_text(encoding='utf-8-sig'))
a=r('Items'); print([(i,x['id'],x['name']) for i,x in enumerate(a) if x and (i<35 or 120<i<150)])
for mid in [1,2,15,30,38,40,91]:
 m=r('Map%03d'%mid)
 for e in m['events']:
  if not e:continue
  for p in e['pages']:
   for j,c in enumerate(p['list']):
    if c['code']==126:print(mid,e['id'],c['parameters'],[z['parameters'] for z in p['list'][max(0,j-2):j] if z['code']==401])
