"""Read-only audit of every map's people, fixed landings and used passage flags.
Art-context review is required for seating, counters and upper scenery.
"""
import json,collections,re
from pathlib import Path
ROOT=Path(__file__).resolve().parents[2];OUT=Path(__file__).parent
def load(name):return json.loads((ROOT/'data'/f'{name}.json').read_text(encoding='utf-8'))
sets=load('Tilesets');maps={int(p.stem[3:]):json.loads(p.read_text(encoding='utf-8'))for p in (ROOT/'data').glob('Map[0-9][0-9][0-9].json')}
def tiles(m,x,y):
 if not(0<=x<m['width']and 0<=y<m['height']):return None
 return [m['data'][(z*m['height']+y)*m['width']+x]for z in range(4)]
def directions(ts,ids):
 if ids is None:return []
 out=[]
 for d in [2,4,6,8]:
  for t in reversed(ids):
   flag=sets[ts]['flags'][t]
   if flag&16:continue
   if not(flag&(1<<(d//2-1))):out.append(d)
   break
 return out
def ground(ids):
 if ids is None:return 'out-of-bounds'
 t=next((t for t in ids[:2][::-1]if t),0)
 if not t:return 'empty'
 if 4352<=t<8192:return 'building/cliff'
 if 2048<=t<2816:return 'animated terrain: inspect land/water'
 return 'floor/ground'
people=[];landings=[];variableTransfers=[];eventRelocations=[];throughPeople=[];used=collections.defaultdict(collections.Counter);wallSides=[]
for n,m in sorted(maps.items()):
 for t in m['data'][:m['width']*m['height']*4]:used[m['tilesetId']][t]+=1
 for e in m['events']:
  if not e:continue
  for pi,p in enumerate(e['pages']):
   im=p['image'];name=im['characterName']
   if name and not name.startswith(('!','$!'))and not im['tileId']:
    ids=tiles(m,e['x'],e['y']);people.append(dict(map=n,event=e['id'],page=pi,name=e['name'],sprite=name,x=e['x'],y=e['y'],tiles=ids,ground=ground(ids),directions=directions(m['tilesetId'],ids),moveType=p['moveType']))
    if p['through']or any(c['code']==37 for c in p['moveRoute']['list']):throughPeople.append([n,e['id'],pi])
def commands(source,L):
 for i,c in enumerate(L):
  p=c['parameters']
  if c['code']==201 and p[0]!=0:variableTransfers.append(dict(source=source,index=i,parameters=p))
  if c['code']==203:eventRelocations.append(dict(source=source,index=i,parameters=p))
  if c['code']==201 and p[0]==0:
   dest,x,y=p[1:4];ids=tiles(maps[dest],x,y)if dest in maps else None
   landings.append(dict(source=source,index=i,map=dest,x=x,y=y,tiles=ids,ground=ground(ids),directions=directions(maps[dest]['tilesetId'],ids)if dest in maps else []))
for n,m in maps.items():
 for e in m['events']:
  if e:
   for pi,p in enumerate(e['pages']):commands(f'Map{n:03}/{e["id"]}/{pi}',p['list'])
for key in ['CommonEvents','Troops']:
 for e in load(key):
  if e:
   if key=='CommonEvents':commands(f'{key}/{e["id"]}',e['list'])
   else:
    for pi,p in enumerate(e['pages']):commands(f'{key}/{e["id"]}/{pi}',p['list'])
tiles=[]
for ts,counts in sorted(used.items()):
 for t,count in sorted(counts.items()):
  f=sets[ts]['flags'][t];kind=(t-2048)//48
  if 4352<=t<8192 and kind%16>=8 and (f&15)!=15:wallSides.append(dict(tileset=ts,tile=t,flag=f,uses=count))
  if t and t<1536:tiles.append(dict(tileset=ts,tile=t,flag=f,uses=count,upper=bool(f&16),walkable=(f&15)!=15))
reviews=json.loads((OUT/'floor-reviews.json').read_text(encoding='utf-8'))
for landing in landings:
 review=next((r for r in reviews if (r['map'],r['x'],r['y'],r['tiles'])==(landing['map'],landing['x'],landing['y'],landing['tiles'])),None)
 if review:landing['reviewedFloor']=review['reason']
report=dict(maps=len(maps),peoplePages=len(people),peopleCoordinates=len({(p['map'],p['x'],p['y'])for p in people}),fixedTransferReferences=len(landings),usedDecorativeTiles=len(tiles),variableTransfers=variableTransfers,eventRelocations=eventRelocations,throughPeople=throughPeople,wallSidePassageErrors=wallSides,people=people,landings=landings,decorativeTiles=tiles,reviewedFloorSurfaces=reviews,
 suspects=dict(people=[p for p in people if p['ground']in ['out-of-bounds','empty','building/cliff']or not p['directions']],landings=[p for p in landings if (p['ground']in ['out-of-bounds','empty','building/cliff']or not p['directions'])and not p.get('reviewedFloor')]),
 limitations=['Actor feet and collision are inspected separately; upper scenery/counters/seats need visual review.','Variable transfers, event relocations and through-enabled people are inventoried; arbitrary plugin behavior and full campaign sequences are not simulated.'])
(OUT/'audit.json').write_text(json.dumps(report,indent=2),encoding='utf-8')
print(json.dumps({k:report[k]for k in ['maps','peoplePages','fixedTransferReferences','usedDecorativeTiles','wallSidePassageErrors']}))
print('suspect people',len(report['suspects']['people']),'landings',len(report['suspects']['landings']))
for r in report['suspects']['landings']:print(r['source'],r['index'],'=>',r['map'],r['x'],r['y'],r['ground'],r['directions'])
