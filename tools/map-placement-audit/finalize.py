"""Idempotent service-counter and medical staff floor placement."""
import copy,json
from pathlib import Path
def load(n):return json.loads(Path(f'data/Map{n:03}.json').read_text(encoding='utf-8'))
report=json.loads(Path('tools/map-placement-audit/repairs.json').read_text(encoding='utf-8'));report.setdefault('counterServicePoints',[])
for n,x,y in[(54,10,5),(104,3,3),(106,3,3)]:
 m=load(n);e=m['events'][2];before=[e['x'],e['y']]
 if before!=[x,y]:e.update(x=x,y=y);report['positions'].append(dict(map=n,event=2,before=before,after=[x,y],reason='Staff stands on clear floor, outside furniture footprint.'))
 if n in[104,106]and not any(ev and ev['name']=='Counter service point'for ev in m['events']):
  p=copy.deepcopy(e['pages'][0]);p['image'].update(characterName='',tileId=0);p.update(trigger=0,priorityType=1,moveType=0,through=False);p['list']=[dict(code=355,indent=0,parameters=['$gameMap.event(2).start();']),dict(code=0,indent=0,parameters=[])]
  proxy=dict(id=len(m['events']),name='Counter service point',note='Route service across the two-tile counter to its original floor-standing staff event.',x=3,y=4,pages=[p]);m['events'].append(proxy);report['counterServicePoints'].append(dict(map=n,event=proxy['id'],staff=2,position=[3,4]))
 Path(f'data/Map{n:03}.json').write_text(json.dumps(m,ensure_ascii=False,separators=(',',':')),encoding='utf-8')
Path('tools/map-placement-audit/repairs.json').write_text(json.dumps(report,indent=2),encoding='utf-8')
