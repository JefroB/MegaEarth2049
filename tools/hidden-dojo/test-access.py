import json,zipfile,copy,textwrap
from pathlib import Path
from collections import deque
D=lambda n:json.loads(Path('data/'+n+'.json').read_text(encoding='utf-8'))
src=Path('tools/clown-court/build.py').read_text();ns={'load':D,'copy':copy,'textwrap':textwrap,'tiles':D('Tilesets'),'deque':deque};exec(src[src.index('def C('):src.index("m=D['Map010']")],ns);flood=ns['flood'];checks=[]
with zipfile.ZipFile('tools/hidden-dojo/before.zip') as z:
 old=json.loads(z.read('data/Map009.json'));new=D('Map009');a=flood(old,(9,17));b=flood(new,(9,17))
 for e in old['events']:
  if not e or not e['pages']:continue
  reach=lambda ar:any((e['x']+dx,e['y']+dy)in ar for dx,dy in [(0,1),(-1,0),(1,0),(0,-1)])
  assert not reach(a)or reach(b),e['id']
 checks.append('All previously reachable Matrix exits retain an approach.')
for n in [8,9,245,246,247,248]:
 m=D(f'Map{n:03}')
 for e in m['events']:
  if not e:continue
  for pg in e['pages']:
   for c in pg['list']:
    if c['code']!=201 or c['parameters'][0]!=0:continue
    _,to,x,y,*_=c['parameters'];dest=D(f'Map{to:03}');assert 0<=x<dest['width'] and 0<=y<dest['height'];assert any(ns['passable'](dest,x,y,d)for d in [2,4,6,8]);assert not any(t and(t['x'],t['y'])==(x,y)and any(p['priorityType']==1 for p in t['pages'])for t in dest['events']),(n,e['id'],to,x,y)
checks.append('Every authored transfer in the access/trial maps lands on a passable, unoccupied tile.')
Path('tools/hidden-dojo/access-validation.json').write_text(json.dumps(dict(passed=True,checks=checks),indent=2),encoding='utf-8');print('PASS original Matrix exit access and all trial transfer landings')
