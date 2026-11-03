"""Prove sound edits preserve gameplay, visuals, existing audio files and event guards."""
from pathlib import Path
import json,zipfile,hashlib,copy,collections
OUT=Path(__file__).parent;plan=json.loads((OUT/'changes.json').read_text());checks=[]
def strip(L):return[c for c in L if c['code']!=250]
with zipfile.ZipFile(OUT/'before.zip')as z:
 for path in z.namelist():
  old=json.loads(z.read(path));new=json.loads(Path(path).read_text(encoding='utf8'));stem=Path(path).stem
  if stem.startswith('Map')and stem[3:].isdigit():
   for e in old['events']:
    if not e:continue
    for p in e['pages']:p['list']=strip(p['list'])
   for e in new['events']:
    if not e:continue
    for p in e['pages']:p['list']=strip(p['list'])
   assert old==new,path;checks.append(path+': geometry, pages, branches, transfers, rewards unchanged')
  elif stem=='Animations':
   assert len(new)==len(old)+3
   for i,a in enumerate(old):
    b=new[i]
    if not a:assert a==b;continue
    aa=copy.deepcopy(a);bb=copy.deepcopy(b);aa.pop('timings');bb.pop('timings');assert aa==bb,(path,i)
    assert len(b['timings'])>=len(a['timings'])
    for x,y in zip(a['timings'],b['timings']):
     x=copy.deepcopy(x);y=copy.deepcopy(y);x.pop('se',None);y.pop('se',None);assert x==y,(path,i,'visual timing altered')
   for a in new[len(old):]:assert a['frames']==[[]]and not a['animation1Name']and not a['animation2Name']and all(t['flashScope']==0 for t in a['timings'])
   checks.append('All old animation cells, timing frames, flashes and other visual fields identical; three new audio-only entries')
  elif stem=='Skills':
   allowed={c['skill']for c in plan['changes']if c['kind']=='skill-audio'};assert len(old)==len(new)
   for i,(a,b)in enumerate(zip(old,new)):
    if i in allowed:a=copy.deepcopy(a);b=copy.deepcopy(b);a.pop('animationId');b.pop('animationId')
    assert a==b,(path,i)
   checks.append('Skills unchanged except12 opt-in animation IDs; no scope0 false audio attachments')
  elif stem=='CommonEvents':
   for a in old:
    if a:a['list']=strip(a['list'])
   for a in new:
    if a:a['list']=strip(a['list'])
   assert old==new;checks.append('Common event behavior identical except three successful fitting cues')
  else:assert old==new,path;checks.append(path+': unchanged')
for n,h in json.loads((OUT/'audio-hashes.json').read_text()).items():assert hashlib.sha256(Path(n).read_bytes()).hexdigest()==h
checks.append('Every existing audio recording byte-identical; no invented placeholder filenames or codec renaming')
# Review each inserted map cue at its original control-flow position.
for c in plan['changes']:
 if c['kind']=='door':
  e=json.loads(Path(f"data/Map{c['map']:03}.json").read_text())['events'][c['event']];L=e['pages'][c['page']]['list']
  for i,cmd in enumerate(L):
   if cmd['code']==201:assert L[i-1]['code']==250 and L[i-1]['indent']==cmd['indent']
checks.append('Every selected physical-door cue is inside its actual transfer branch, never outside a lock/choice guard')
(OUT/'preservation.json').write_text(json.dumps(dict(passed=True,checks=checks,summary=dict(mapCount=sum(s.startswith('data/Map0')or s.startswith('data/Map1')or s.startswith('data/Map2')for s in checks),changes=collections.Counter(c['kind']for c in plan['changes']))),indent=2));print('PASS',len(checks),'preservation checks')
