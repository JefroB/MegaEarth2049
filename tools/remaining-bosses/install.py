import json,copy,zipfile,hashlib
from pathlib import Path
root=Path(__file__).resolve().parents[2]
def read(n):return json.loads((root/'data'/f'{n}.json').read_text(encoding='utf-8-sig'))
def save(n,d):(root/'data'/f'{n}.json').write_text(json.dumps(d,separators=(',',':')),encoding='utf-8')
backup=root/'tools/remaining-bosses/before-remaining-v2.zip'
assert not backup.exists(),'Refusing to overwrite backup or reinstall'
files=['data/Enemies.json','data/Troops.json','data/Skills.json','data/Items.json','data/Map002.json','data/Map030.json','js/plugins.js']
with zipfile.ZipFile(backup,'w',zipfile.ZIP_DEFLATED) as z:
 for f in files:z.write(root/f,f)
e,t,s=read('Enemies'),read('Troops'),read('Skills')
items=read('Items');assert items[137] is None
module=copy.deepcopy(items[143]);module.update(id=137,name='SEAM-3000 Control Module',iconIndex=223,description='The brain behind mandatory burlap trousers.\nNow accepting a strongly worded resignation.',occasion=3,scope=0);items[137]=module;save('Items',items)
assert (len(e),len(t),len(s))==(143,52,156)
protected={p:hashlib.sha256((root/p).read_bytes()).hexdigest() for p in ['js/plugins/ME_Boss.js','js/plugins/ME_PoopSprites.js','img/sv_actors/punkBoss1.png','img/bosses/RepossessorNormal.png','img/bosses/RepossessorDamaged.png','img/bosses/poop-v2/poop-master.png','img/bosses/poop-v2/turd-master.png']}
(root/'tools/remaining-bosses/protected-hashes.json').write_text(json.dumps(protected,indent=2))
for i,key in {78:'Spider',79:'Recluse',80:'Huge',81:'Massive',82:'Icky'}.items():e[i]['note']+='\n<ME_Remaining: '+key+'>'
# Three originally visible ninjas become one 360 HP machine with three lighter actions.
visible=[e[m['enemyId']] for m in t[8]['members'] if not m['hidden']]
seam=copy.deepcopy(e[12]);seam.update(id=143,name='SEAM-3000',note='<ME_Remaining: Seam>',battlerHue=0)
seam['params']=[sum(m['params'][i] for m in visible)//len(visible) for i in range(8)];seam['params'][0]=sum(m['params'][0] for m in visible)
seam['exp']=sum(m['exp'] for m in visible);seam['gold']=sum(m['gold'] for m in visible)
seam['traits']+=[{'code':61,'dataId':0,'value':1},{'code':61,'dataId':0,'value':1}]
seam['actions']=[{'conditionType':0,'conditionParam1':0,'conditionParam2':0,'rating':5,'skillId':156}]
drone=copy.deepcopy(e[2]);drone.update(id=144,name='Malfunctioning A.S.P. Drone',note='<ME_Remaining: Drone>',battlerHue=0)
drone['params'][0]=250;drone['exp']=35;drone['gold']=20;drone['actions']=[{'conditionType':0,'conditionParam1':0,'conditionParam2':0,'rating':5,'skillId':157}]
e.extend([seam,drone])
for eid,tid,name in [(143,52,'SEAM-3000'),(144,53,'Malfunctioning A.S.P. Drone')]:t.append({'id':tid,'name':name,'members':[{'enemyId':eid,'x':280,'y':410,'hidden':False}],'pages':[]})
for sid,name,anim,message in [(156,'Mandatory Hemming',11,' enforces mandatory hemming!'),(157,'Security Pulse',115,' fires a security pulse!')]:
 skill=copy.deepcopy(s[1]);skill.update(id=sid,name=name,note='',animationId=anim,message1=message,description='A single-target mechanical attack.',effects=[],stypeId=3);s.append(skill)
for mapname,slots,tid,item in [('Map002',[23,26],52,137),('Map030',[1,2],53,130)]:
 m=read(mapname)
 for slot in slots:
  ev=m['events'][slot];commands=ev['pages'][0]['list']
  if mapname=='Map002':commands[:]=[c for c in commands if not(c['code']==126 and c['parameters'][0]==137)]
  battles=[c for c in commands if c['code']==301];assert len(battles)==1;battles[0]['parameters'][1]=tid
  win=next(i for i,c in enumerate(commands) if c['code']==601);indent=commands[win]['indent']+1
  if mapname=='Map002':commands.insert(win+1,{'code':126,'indent':indent,'parameters':[item,0,0,1]})
  at=next(i for i,c in enumerate(commands) if c['code']==123)
  # Runtime event IDs are array slots; Map030 slot 1 has a legacy serialized id=0.
  script=';'.join('$gameSelfSwitches.setValue(['+str(int(mapname[3:]))+','+str(other)+',"A"],true)' for other in slots)
  commands.insert(at,{'code':355,'indent':indent,'parameters':[script]})
 save(mapname,m)
for n,d in [('Enemies',e),('Troops',t),('Skills',s)]:save(n,d)
p=root/'js/plugins.js';txt=p.read_text(encoding='utf-8-sig');at=txt.rfind(']');txt=txt[:at].rstrip()+',\n'+json.dumps({'name':'ME_RemainingBosses','status':True,'description':'Cohesive animated spider guardians and mechanical minibosses','parameters':{}})+'\n'+txt[at:];p.write_text(txt,encoding='utf-8')
print('Installed remaining miniboss replacements; backup saved.')
