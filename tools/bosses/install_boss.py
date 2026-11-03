import copy,json,zipfile
from pathlib import Path
root=Path(__file__).resolve().parents[2];here=Path(__file__).resolve().parent;data=root/'data'
files=['Skills.json','Enemies.json','Troops.json','System.json','Map138.json']
backup=here/'before-boss.zip'
if not backup.exists():
 with zipfile.ZipFile(backup,'w',zipfile.ZIP_DEFLATED) as z:
  for n in files:z.write(data/n,n)
  z.write(root/'js/plugins.js','plugins.js')
with zipfile.ZipFile(backup) as z:original={n:json.loads(z.read(n).decode('utf-8-sig')) for n in files}
skills=copy.deepcopy(original['Skills.json']);assert len(skills)==151
for sid,name,scope,formula,kind,speed in [(151,'Identify Collateral',0,'0',0,0),(152,'Clamp Charging',0,'0',0,0),(153,'Repossession Clamp',1,'Math.max(35, a.atk * (a._meBoss.phase === 2 ? 5 : 4) - b.def * 2)',1,-2000),(154,'Reset Actuators',0,'0',0,0),(155,'Jam Scanner',1,'0',0,100)]:
 s=copy.deepcopy(skills[1]);s.update(id=sid,name=name,note='',description='Interrupt the marked clamp attack. Available only during this boss encounter.' if sid==155 else '',scope=scope,speed=speed,animationId=0,hitType=0,successRate=100,tpGain=0,effects=[],message1=' uses '+name+'!',message2='',mpCost=0,tpCost=0)
 s['damage']=dict(type=kind,elementId=0,formula=formula,variance=0,critical=False);skills.append(s)
enemies=copy.deepcopy(original['Enemies.json']);eid=len(enemies);e=copy.deepcopy(enemies[1]);e.update(id=eid,name='The Repossessor',battlerName='SF_Doll',battlerHue=0,note='<ME_Boss: Repossessor>',params=[1800,0,35,15,12,15,12,10],actions=[dict(conditionParam1=0,conditionParam2=0,conditionType=0,rating=5,skillId=151)],exp=250,gold=400,dropItems=[dict(kind=0,dataId=1,denominator=1)]*3,traits=[dict(code=22,dataId=0,value=1),dict(code=22,dataId=1,value=0)])
enemies.append(e)
troops=copy.deepcopy(original['Troops.json']);tid=len(troops);t=copy.deepcopy(troops[1]);t.update(id=tid,name='The Repossessor - optional prototype',members=[dict(enemyId=eid,x=155,y=435,hidden=False)]);t['pages'][0]['list']=[dict(code=0,indent=0,parameters=[])];troops.append(t)
system=copy.deepcopy(original['System.json']);assert len(system['switches'])==167;system['switches'].append('Repossessor - defeated')
m=copy.deepcopy(original['Map138.json']);m.update(specifyBattleback=True,battleback1Name='SF_Metal1',battleback2Name='SF_Factory')
# Reuse a native event page, preserving all unrelated events and passages.
page=copy.deepcopy(m['events'][2]['pages'][0]);page['image'].update(characterName='!SF_Switch1',characterIndex=0,direction=2);page['conditions'].update(selfSwitchValid=False);page['priorityType']=1
C=lambda code,params=[],indent=0:dict(code=code,parameters=params,indent=indent)
page['list']=[C(101,['',0,0,2]),C(401,['THE REPOSSESSOR: warranty enforcement unit.']),C(401,['Optional miniboss. Jam Scanner cancels its']),C(401,['marked attack; two damaging hits also jam it.']),C(401,['Guard reduces damage. Retreat is allowed.']),C(102,[['Challenge the Repossessor','Leave it powered down'],1,1,2,0]),C(402,[0,'Challenge the Repossessor']),C(301,[0,tid,True,True],1),C(601,[],1),C(121,[167,167,0],2),C(123,['A',0],2),C(101,['',0,0,2],2),C(401,['The collection unit is permanently offline.'],2),C(401,['Your limbs remain under local ownership.'],2),C(602,[],1),C(101,['',0,0,2],2),C(401,['You retreat. The unit returns to standby.'],2),C(603,[],1),C(314,[0,0],2),C(101,['',0,0,2],2),C(401,['The emergency cutoff ejects you from the rig.'],2),C(401,['The workshop patches you up. Try again later.'],2),C(604,[],1),C(0,[],1),C(402,[1,'Leave it powered down']),C(0,[],1),C(404),C(0)]
p2=copy.deepcopy(page);p2['conditions'].update(selfSwitchValid=True,selfSwitchCh='A');p2['list']=[C(101,['',0,0,2]),C(401,['OUT OF SERVICE: involuntary limb collection.']),C(0)]
m['events'].append(dict(id=len(m['events']),name='Repossessor - optional miniboss',note='ME_Boss proof of concept',x=11,y=8,pages=[page,p2]))
for n,obj in [('Skills.json',skills),('Enemies.json',enemies),('Troops.json',troops),('System.json',system),('Map138.json',m)]:
 current=json.loads((data/n).read_text(encoding='utf-8-sig'));assert current==original[n] or current==obj,'Intervening edit '+n
 (data/n).write_text(json.dumps(obj,separators=(',',':'))+'\n')
p=root/'js/plugins.js';text=p.read_text();body=json.loads(text[text.index('['):text.rindex(']')+1]);body=[x for x in body if x['name']!='ME_Boss'];body.append(dict(name='ME_Boss',status=True,description='Telegraphed boss mechanics and anchored two-phase animation',parameters={}));p.write_text('var $plugins =\n'+json.dumps(body,indent=2)+';\n')
(here/'manifest.json').write_text(json.dumps(dict(enemy=eid,troop=tid,skills=list(range(151,156)),map=138,event=m['events'][-1]['id'],switch=167),indent=2))
print('Installed',eid,tid,'Map138 optional encounter')
