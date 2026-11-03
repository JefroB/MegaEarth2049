from pathlib import Path
import json,zipfile
from collections import deque
D=lambda n:json.loads(Path('data/'+n+'.json').read_text(encoding='utf-8'))
tiles=D('Tilesets');manifest=json.loads(Path('tools/vending-uprising/manifest.json').read_text(encoding='utf-8'))
def passable(m,x,y,d):
 if not(0<=x<m['width'] and 0<=y<m['height']):return False
 for z in [3,2,1,0]:
  t=m['data'][(z*m['height']+y)*m['width']+x];f=tiles[m['tilesetId']]['flags'][t]
  if f&16:continue
  return not(f & (1<<(d//2-1)))
 return False
def area(m,seed):
 blocked={(e['x'],e['y']) for e in m['events'] if e and any(p['priorityType']==1 for p in e['pages'])};seen={seed};q=deque([seed])
 while q:
  x,y=q.popleft()
  for dx,dy,d in [(0,1,2),(-1,0,4),(1,0,6),(0,-1,8)]:
   n=x+dx,y+dy
   if n not in seen and n not in blocked and passable(m,x,y,d) and passable(m,*n,10-d):seen.add(n);q.append(n)
 return seen
checks=[]
with zipfile.ZipFile('tools/vending-uprising/before.zip') as z:
 for n,seed in [(10,(13,11)),(2,(22,10)),(24,(9,13))]:
  old=json.loads(z.read(f'data/Map{n:03}.json'));new=D(f'Map{n:03}');a,b=area(old,seed),area(new,seed)
  for e in old['events']:
   if not e or not e['pages']:continue
   reach=lambda ar:any((e['x']+dx,e['y']+dy) in ar for dx,dy in [(0,1),(-1,0),(1,0),(0,-1)])
   assert not reach(a) or reach(b),(n,e['id'],'access lost')
  checks.append(dict(map=n,oldArea=len(a),newArea=len(b),existingEventAccessPreserved=True))
Path('tools/vending-uprising/town-access-validation.json').write_text(json.dumps(dict(passed=True,checks=checks),indent=2),encoding='utf-8')
print('PASS existing event approaches preserved on all three town maps')
