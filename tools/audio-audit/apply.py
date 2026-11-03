"""One-time curated audio pass; only SE commands, animation timings and audio-only IDs."""
import json,re,copy,zipfile,hashlib
from pathlib import Path
OUT=Path('tools/audio-audit')
def load(n):return json.loads(Path('data/'+n+'.json').read_text(encoding='utf8'))
D={p.stem:json.loads(p.read_text(encoding='utf8'))for p in Path('data').glob('*.json')};assert len(D['Animations'])==225
with zipfile.ZipFile(OUT/'before.zip','x',zipfile.ZIP_DEFLATED)as z:
 for p in Path('data').glob('*.json'):z.write(p)
(OUT/'audit-before.json').write_bytes((OUT/'audit.json').read_bytes());(OUT/'audio-hashes.json').write_text(json.dumps({str(p).replace('\\','/'):hashlib.sha256(p.read_bytes()).hexdigest()for p in Path('audio').rglob('*')if p.is_file()},indent=2))
changes=[];maps=set()
def se(name,vol=50,pitch=100):return dict(name=name,volume=vol,pitch=pitch,pan=0)
def cmd(name,indent,vol=50,pitch=100):return dict(code=250,indent=indent,parameters=[se(name,vol,pitch)])
def note(kind,**kw):changes.append(dict(kind=kind,**kw))
# Existing impacts retain their timing; only their sound palette changes.
palette={176:('Switch1',60,115),178:('Hammer',55,105),179:('Slash2',50,110),185:('Slash1',50,115),186:('Poison',40,115),188:('Poison',45,105),189:('Poison',40,120),190:('Paralyze1',50,90),191:('Poison',45,95),193:('Recovery',50,110),194:('Equip1',55,90),195:('Sound1',45,105),197:('Break',55,100),198:('Noise',45,110),199:('Blind',45,110),201:('Sound1',45,115),202:('Down1',45,100),203:('Switch3',45,100),205:('Absorb1',45,105),206:('Noise',40,120),207:('Noise',45,85),208:('Sound1',45,115),209:('Evasion1',45,105),210:('Reflection',45,105),211:('Paralyze2',40,95),213:('Darkness1',40,110),214:('Paralyze3',45,85),215:('Computer',40,115),216:('Recovery',50,115),217:('Switch2',50,100),218:('Recovery',50,105),219:('Switch3',45,90),220:('Paralyze2',50,100),221:('Down1',45,80),222:('Earth1',50,95),223:('Switch2',50,110),224:('Break',50,110)}
for id,(name,vol,pitch)in palette.items():
 a=D['Animations'][id];timings=[t for t in a['timings']if t.get('se')and t['se'].get('name')];assert len(timings)==1
 old=copy.deepcopy(timings[0]['se']);timings[0]['se']=se(name,vol,pitch);note('animation-palette',animation=id,name=a['name'],frame=timings[0]['frame'],before=old,after=timings[0]['se'])
def timing(id,frame,name,vol=50,pitch=100):
 a=D['Animations'][id];assert 0<=frame<len(a['frames']);a['timings'].append(dict(frame=frame,se=se(name,vol,pitch),flashScope=0,flashColor=[0,0,0,0],flashDuration=0));note('animation-cue',animation=id,name=a['name'],frame=frame,sound=name)
for id in [177,182]:timing(id,0,'Book1',40,110)
timing(140,0,'Machine',35,110);timing(140,21,'Crash',50,105)
timing(142,0,'Evasion1',45,115)
for id,name,vol in [(141,'Explosion1',55),(143,'Flash1',50),(144,'Wind2',45),(145,'Poison',50)]:
 a=D['Animations'][id];impact=next(i for i,f in enumerate(a['frames'])if any(c and c[0]>=100 for c in f));timing(id,impact,name,vol);timing(id,0,'Evasion1',30,115)
timing(148,0,'Noise',45,100);timing(155,0,'Laser1',50,110)
# Audio-only native animation records give custom warnings/attacks an action-timed
# cue without adding flash, drawing, plugins, timer damage or particle effects.
for id,label,sound,vol,pitch in [(225,'Corporate warning - audio only','Computer',40,115),(226,'Repossession clamp - audio only','Hammer',55,85),(227,'Scanner jam - audio only','Paralyze1',50,100)]:
 assert len(D['Animations'])==id;D['Animations'].append(dict(id=id,name=label,animation1Name='',animation1Hue=0,animation2Name='',animation2Hue=0,position=1,frames=[[]],timings=[dict(frame=0,se=se(sound,vol,pitch),flashScope=0,flashColor=[0,0,0,0],flashDuration=0)]));note('audio-only-animation',animation=id,name=label,sound=sound)
for id,anim in {153:226,155:227,158:225,161:225,164:225,167:225,170:225,173:225,176:225,178:225,180:225,182:225}.items():
 assert D['Skills'][id]['animationId']==0;D['Skills'][id]['animationId']=anim;note('skill-audio',skill=id,name=D['Skills'][id]['name'],before=0,after=anim)
# Exact success flags, not general dialogue or every browsing action.
flags={(99,3):{218:'Switch2',219:'Switch2',220:'Switch2'},(251,3):{267:'Switch2'},(251,4):{268:'Computer'},(249,3):{262:'Computer',265:'Switch2'},(250,3):{262:'Computer',265:'Switch2'},(246,20):{190:'Switch1'},(246,21):{186:'Decision2'}}
for key,m in D.items():
 if not re.fullmatch('Map[0-9]{3}',key):continue
 mid=int(key[3:])
 for e in m['events']:
  if not e:continue
  for pi,p in enumerate(e['pages']):
   L=p['list'];sprite=p['image']['characterName'];hasSound=any(c['code']==250 or(c['code']==205 and any(r['code']==44 for r in c['parameters'][1]['list']))for c in L)or any(r['code']==44 for r in p['moveRoute']['list'])
   physical=p['trigger']==0 and bool(re.match(r'^!Door|^!SF_Door|^!\$SF_Gate',sprite))and not hasSound
   new=[]
   for c in L:
    if c['code']==250 and c['parameters'][0]['name']=='Elevator':
     old=c['parameters'][0];c=copy.deepcopy(c);c['parameters'][0]=se('Machine',55,90);note('missing-reference-fallback',map=mid,event=e['id'],page=pi,before=old,after=c['parameters'][0]);maps.add(mid)
    if physical and c['code']==201:
     sound='Door3'if 'SF'in sprite or m['tilesetId']in [6,8]else 'Door1';new.append(cmd(sound,c['indent'],40));note('door',map=mid,event=e['id'],page=pi,sound=sound,trigger='actual transfer branch');maps.add(mid)
    new.append(c);sound=None
    if c['code']==126 and c['parameters'][1]==0 and c['parameters'][2]==0:
     if c['parameters'][0]in range(180,186):sound='Item1'
     if c['parameters'][0]in range(186,189):sound='Book1'
    if c['code']==314 and(mid,e['id'])in [(45,1),(83,3),(99,2)]:sound='Recovery'
    if c['code']==121:
     a,b,op=c['parameters'];f=flags.get((mid,e['id']),{})
     if op==0 and a==b and a in f:sound=f[a]
    if sound:new.append(cmd(sound,c['indent'],45));note('interaction',map=mid,event=e['id'],page=pi,sound=sound,afterCommand=c['code'],parameters=c['parameters']);maps.add(mid)
   p['list']=new
# One quiet fitting cue after the successful, guarded accessory grant.
L=D['CommonEvents'][7]['list'];new=[]
for c in L:
 new.append(c)
 if c['code']==128 and c['parameters'][0]in [62,63,64]and c['parameters'][1]==0:new.append(cmd('Equip1',c['indent'],55));note('calibration',commonEvent=7,armor=c['parameters'][0],sound='Equip1')
D['CommonEvents'][7]['list']=new
for name in ['Animations','Skills','CommonEvents']+['Map'+str(n).zfill(3)for n in sorted(maps)]:Path('data/'+name+'.json').write_text(json.dumps(D[name],ensure_ascii=False,separators=(',',':')),encoding='utf8')
(OUT/'changes.json').write_text(json.dumps(dict(changes=changes,changedMaps=sorted(maps),newAnimations=[225,226,227],deferredIntegration=[dict(skill=151,name='Repossessor scan',reason='Scope0 requires explicit action cue'),dict(skill=154,name='Reset Actuators',reason='Scope0 requires explicit action cue')],unchanged='Battle mechanics, action ordering, animation cells, existing timing frames/flashes, event branches, maps and rewards; audio-only animations add a native short visual-free wait.'),indent=2),encoding='utf8')
print('Applied',len(changes),'audio changes across',len(maps),'maps; counts',dict(__import__('collections').Counter(c['kind']for c in changes)))
