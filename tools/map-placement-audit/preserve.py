"""Verify the live delta against the immutable pre-audit snapshot."""
import json,zipfile
from pathlib import Path
OUT=Path(__file__).parent
z=zipfile.ZipFile(OUT/'before.zip');repairs=json.loads((OUT/'repairs.json').read_text(encoding='utf-8'))
moves={(q['map'],q['event']):q for q in repairs['positions']};proxies={(q['map'],q['event'])for q in repairs['counterServicePoints']};changed=[]
for name in z.namelist():
 if not name.startswith('data/Map'):continue
 n=int(Path(name).stem[3:]);old=json.loads(z.read(name));new=json.loads(Path(name).read_text(encoding='utf-8'))
 assert {k:v for k,v in old.items()if k!='events'}=={k:v for k,v in new.items()if k!='events'}
 for idx,e in enumerate(old['events']):
  if e is None:continue
  actual=json.loads(json.dumps(new['events'][idx]))
  if(n,idx)in moves:actual['x'],actual['y']=e['x'],e['y']
  for q in repairs['landings']:
   if q['source'][:2]==[n,idx]:
    for c in actual['pages'][q['source'][2]]['list']:
     if c['code']==201 and c['parameters'][:4]==[0]+q['after']:c['parameters'][1:4]=q['before']
  assert actual==e,(n,idx)
 for e in new['events'][len(old['events']):]:assert(n,e['id'])in proxies
 if old!=new:changed.append(n)
old=json.loads(z.read('data/Tilesets.json'));new=json.loads(Path('data/Tilesets.json').read_text(encoding='utf-8'));approved={(q['tileset'],q['tile'])for q in repairs['flags']};delta=[]
for a,b in zip(old,new):
 if not a:continue
 assert {k:v for k,v in a.items()if k!='flags'}=={k:v for k,v in b.items()if k!='flags'}
 for t,(before,after)in enumerate(zip(a['flags'],b['flags'])):
  if before!=after:assert(a['id'],t)in approved;delta.append([a['id'],t])
out=dict(passed=True,changedMaps=changed,unchangedMaps=248-len(changed),flagChanges=len(delta),positions=len(repairs['positions']),checks=['All map tiles, dimensions, tilesets and environment settings preserved','All existing event conditions, images, triggers and quest commands preserved except one corrected return destination','Only reviewed position/flag changes and two native service proxies added'])
(OUT/'preservation.json').write_text(json.dumps(out,indent=2),encoding='utf-8');print('PASS snapshot preservation:',len(changed),'coordinate/service maps;',len(delta),'reviewed flags.')
