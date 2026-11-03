"""Append six opt-in battle-ready enemies; leave map progression untouched."""
import json, copy
from pathlib import Path
from zipfile import ZipFile
R=Path(__file__).resolve().parents[2]
P=Path(__file__).resolve().parent
def read(n): return json.loads((R/'data'/f'{n}.json').read_text(encoding='utf-8-sig'))
names=['Enemies','Troops','Skills','States']
db={n:read(n) for n in names}
backup=P/'before-custodians.zip'
if not backup.exists():
 with ZipFile(backup,'w') as z:
  for n in names:z.write(R/'data'/f'{n}.json',f'data/{n}.json')
  z.write(R/'js/plugins.js','js/plugins.js')
if any(e and '<ME_Custodian:' in e.get('note','') for e in db['Enemies']):
 raise SystemExit('Already installed; edit live assets instead of republishing.')
stories=json.loads((R/'tools/miniboss-stories/stories.json').read_text())
songs=json.loads((R/'tools/miniboss-stories/troop-song-pages.json').read_text())
keys=['Compliance','Duke','Septic','Clap','REM','Widow']
warning=['The stamp-jaws open. Guard next round!','The Duke prepares a drain. Guard next round!',
 'The parcel swells. Guard next round!','Pressure rising! Guard next round!',
 'The lullaby builds. Guard next round!','The boiler overheats. Guard next round!']
attacks=['Terms and Lacerations','Out-of-Network Extraction','Express Infection','Premium Pressure','Mandatory Lullaby','Final Escalation']
fever=copy.deepcopy(db['States'][4]);fever.update(id=len(db['States']),name='Parcel Fever',autoRemovalTiming=2,minTurns=2,maxTurns=2,removeAtBattleEnd=True,traits=[dict(code=22,dataId=7,value=-0.03)],message1=' develops parcel fever!',message2=' develops parcel fever!',message3='',message4=' recovers from parcel fever.',note='Fictional biotech parcel effect. 3% max HP per turn for two turns; removed after battle.')
db['States'].append(fever)
manifest=[]
for i,(key,story) in enumerate(zip(keys,stories)):
 eid=len(db['Enemies']);tid=len(db['Troops']);first=len(db['Skills'])
 for mode in range(3):
  sk=copy.deepcopy(db['Skills'][156]);sk.update(id=len(db['Skills']),mpCost=0,tpCost=0,tpGain=0,speed=0,hitType=0,effects=[],note='',stypeId=3)
  sk['damage']=dict(critical=False,elementId=0,formula='0',type=0,variance=0)
  if mode==0:
   sk.update(name='Prepare '+attacks[i],scope=11,animationId=0,speed=2000,message1=': '+warning[i],description=warning[i])
  elif mode==1:
   sk.update(name=attacks[i],scope=2 if key in ['Clap','Widow'] else 1,animationId=[61,58,59,126,62,68][i],message1=' uses %1!',description='Signature attack, preceded by a full-turn warning.')
   sk['damage']=dict(critical=False,elementId=2 if key=='Widow' else 0,formula='Math.max(8, a.atk * 3 - b.def * 1.5)',type=5 if key=='Duke' else 1,variance=10)
   if key=='Compliance':sk['effects']=[dict(code=21,dataId=6,value1=.5,value2=0)]
   if key=='Septic':sk['effects']=[dict(code=21,dataId=fever['id'],value1=.65,value2=0)]
   if key=='Clap':sk['effects']=[dict(code=32,dataId=6,value1=2,value2=0)]
   if key=='REM':
    sk['damage'].update(type=2,formula='Math.max(4, a.mat - b.mdf / 2)')
    sk['effects']=[dict(code=21,dataId=10,value1=.45,value2=0)]
  else:
   sk.update(name='Recalibrate Policy',scope=11,animationId=0,message1=' pauses to recalibrate.',description='Recovery round. No damage or healing.')
  db['Skills'].append(sk)
 enemy=copy.deepcopy(db['Enemies'][144]);enemy.update(id=eid,name=story['name'],battlerName='custodians/'+key,battlerHue=0,params=[650+i*80,80,22+i*2,16,18+i*2,15,14,14],exp=140+i*25,gold=0,note=f'<ME_Custodian: {key}>',traits=[dict(code=22,dataId=0,value=1),dict(code=22,dataId=1,value=.02)],actions=[dict(conditionType=0,conditionParam1=0,conditionParam2=0,rating=5,skillId=first)],dropItems=[dict(kind=0,dataId=1,denominator=1) for _ in range(3)])
 db['Enemies'].append(enemy)
 pages=copy.deepcopy(songs[key]['pages']) if key in songs else []
 db['Troops'].append(dict(id=tid,name=story['name'],members=[dict(enemyId=eid,x=300,y=440,hidden=False)],pages=pages))
 manifest.append(dict(key=key,name=story['name'],enemyId=eid,troopId=tid,skills=dict(warn=first,strike=first+1,recover=first+2),futureMap=story['arena'],song=key if key in songs else None))
for n in names:(R/'data'/f'{n}.json').write_text(json.dumps(db[n],ensure_ascii=False,separators=(',',':')),encoding='utf-8')
(P/'manifest.json').write_text(json.dumps(dict(enemies=manifest,feverState=fever['id'],mapEncountersInstalled=False),indent=2))
print(json.dumps(manifest,indent=2))
