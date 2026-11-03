import json,copy,zipfile,hashlib
from pathlib import Path
root=Path(__file__).resolve().parents[2]
def read(n):return json.loads((root/'data'/f'{n}.json').read_text(encoding='utf-8-sig'))
files=['data/Enemies.json','data/Troops.json','data/Map002.json','data/Map030.json','js/plugins.js']
backup=root/'tools/legacy-bosses/before-legacy-bosses.zip'
if backup.exists():raise SystemExit('Draft art rejected; installation disabled. Preserve the original snapshot.')
with zipfile.ZipFile(backup,'w',zipfile.ZIP_DEFLATED) as z:
 for f in files:z.write(root/f,f)
enemies,troops=read('Enemies'),read('Troops')
assert len(enemies)==143 and len(troops)==52
protected={'punkEnemy':enemies[117],'poopTroop':troops[36],'placeholderTroops':[troops[5],troops[8]],'hashes':{p:hashlib.sha256((root/p).read_bytes()).hexdigest() for p in ['img/sv_actors/punkBoss1.png','img/bosses/RepossessorNormal.png','img/bosses/RepossessorDamaged.png','js/plugins/ME_Boss.js']}}
(root/'tools/legacy-bosses/protected.json').write_text(json.dumps(protected,indent=2))
for i,key in {115:'Poop',116:'Turd',78:'Spider',79:'SpiderRecluse',80:'SpiderHuge',81:'SpiderMassive',82:'SpiderIcky'}.items():enemies[i]['note']+='\n<ME_Rig: '+key+'>'
# Keep the existing encounter's aggregate stats/rewards; these are visual replacements.
for eid,tid,name,rig,source in [(143,52,'SEAM-3000','Seam',8),(144,53,'Malfunctioning A.S.P. Drone','Drone',5)]:
 members=[enemies[m['enemyId']] for m in troops[source]['members']]
 e=copy.deepcopy(members[0]);e.update(id=eid,name=name,note='<ME_Rig: '+rig+'>',battlerHue=0)
 e['params'][0]=sum(m['params'][0] for m in members)
 e['exp']=sum(m['exp'] for m in members);e['gold']=sum(m['gold'] for m in members)
 enemies.append(e);troops.append({'id':tid,'name':name,'members':[{'enemyId':eid,'x':280,'y':410,'hidden':False}],'pages':[]})
for mapname,ids,tid,item in [('Map002',[23,26],52,137),('Map030',[0,2],53,130)]:
 m=read(mapname)
 for eid in ids:
  e=next(e for e in m['events'] if e and e['id']==eid);commands=e['pages'][0]['list']
  # The two entrances share completion via existing self switches, avoiding new IDs.
  if mapname=='Map002':commands[:]=[c for c in commands if not(c['code']==126 and c['parameters'][0]==137)]
  for c in commands:
   if c['code']==301:c['parameters'][1]=tid
  win=next(i for i,c in enumerate(commands) if c['code']==601)
  indent=commands[win]['indent']+1
  if mapname=='Map002':commands.insert(win+1,{'code':126,'indent':indent,'parameters':[137,0,0,1]})
  at=next(i for i,c in enumerate(commands) if c['code']==123)
  script=';'.join('$gameSelfSwitches.setValue(['+str(int(mapname[3:]))+','+str(other)+',"A"],true)' for other in ids)
  commands.insert(at,{'code':355,'indent':indent,'parameters':[script]})
 (root/'data'/f'{mapname}.json').write_text(json.dumps(m,separators=(',',':')),encoding='utf-8')
for n,d in [('Enemies',enemies),('Troops',troops)]: (root/'data'/f'{n}.json').write_text(json.dumps(d,separators=(',',':')),encoding='utf-8')
p=root/'js/plugins.js';s=p.read_text(encoding='utf-8-sig');i=s.rfind(']');s=s[:i].rstrip()+',\n'+json.dumps({'name':'ME_LegacyBosses','status':True,'description':'Fixed-geometry legacy miniboss animation rigs','parameters':{}})+'\n'+s[i:];p.write_text(s,encoding='utf-8')
print('Installed enemy rigs 78–82,115–116; dedicated enemies143–144/troops52–53. Existing stats and actions preserved.')
