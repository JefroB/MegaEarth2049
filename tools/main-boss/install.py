import json,copy,textwrap
from pathlib import Path
from zipfile import ZipFile
P=Path('tools/main-boss');R=Path('.')
def read(n):return json.loads(Path('data',n+'.json').read_text(encoding='utf-8-sig'))
def write(n,d):Path('data',n+'.json').write_text(json.dumps(d,ensure_ascii=False,separators=(',',':')),encoding='utf-8')
names=['Enemies','Troops','Skills','System','MapInfos','Map237'];db={n:read(n) for n in names}
assert len(db['Enemies'])==151 and len(db['Troops'])==60 and len(db['Skills'])==176 and len(db['MapInfos'])==238 and len(db['System']['switches'])==174
with ZipFile(P/'before-main-boss.zip','x') as z:
 for n in names:z.write(Path('data',n+'.json'),'data/'+n+'.json')
 z.write('js/plugins.js','js/plugins.js')
for i,(title,anim,scope,kind,formula,effects) in enumerate([
 ('Claim Denied',61,1,1,'Math.max(10,a.atk*3-b.def*1.5)',[]),
 ('Herpes Fine Print',59,1,1,'Math.max(10,a.mat*3-b.mdf)',[dict(code=21,dataId=47,value1=.7,value2=0)]),
 ('Open Enrollment Outbreak',68,2,1,'Math.max(10,a.mat*2.3-b.mdf)',[]),
 ('Premium Extraction',58,1,5,'Math.max(10,a.mat*3-b.mdf)',[]) ]):
 for warn in [True,False]:
  s=copy.deepcopy(db['Skills'][160]);s.update(id=len(db['Skills']),name=('Prepare ' if warn else '')+title,scope=11 if warn else scope,speed=-2000,animationId=0 if warn else anim,stypeId=3,hitType=0,successRate=100,repeats=1,mpCost=0,tpCost=0,tpGain=0,effects=[] if warn else effects,message1=' prepares a claim.' if warn else ' uses %1!',description='Announced one round before impact. Guard reduces damage.' if not warn else 'Warning only. No damage.',note='ME_MainBoss Underwriter')
  s['damage']=dict(critical=False,elementId=0,formula='0' if warn else formula,type=0 if warn else kind,variance=0)
  db['Skills'].append(s)
s=copy.deepcopy(db['Skills'][160]);s.update(id=184,name='Audit Recess',speed=-2000,description='Recovery: no damage or healing.',message1=' pauses to revise the exclusions.');db['Skills'].append(s)
e=copy.deepcopy(db['Enemies'][145]);e.update(id=151,name='The Underwriter',battlerName='custodians/Compliance',params=[4200,100,45,22,43,22,12,15],exp=1800,gold=0,note='<ME_MainBoss: Underwriter>',actions=[dict(conditionType=0,conditionParam1=0,conditionParam2=0,rating=5,skillId=176)]);db['Enemies'].append(e)
db['Troops'].append(dict(id=60,name='The Underwriter - Executive Liability',members=[dict(enemyId=151,x=300,y=440,hidden=False)],pages=[]))
db['System']['switches'].append('Underwriter defeated - audit archive opened')
def cmd(code,params=None,indent=0):return dict(code=code,parameters=params or [],indent=indent)
def say(t,indent=0):
 lines=textwrap.wrap(t,42);out=[]
 for i in range(0,len(lines),4):out+=[cmd(101,['',0,0,2],indent)]+[cmd(401,[v],indent) for v in lines[i:i+4]]
 return out
def page(commands,flag=None):
 p=copy.deepcopy(db['Map237']['events'][2]['pages'][0]);p['list']=commands+[cmd(0)];p['conditions']['switch1Valid']=bool(flag);p['conditions']['switch1Id']=flag or 1;return p
def event(m,name,x,y,pages):
 eid=len(m['events']);m['events'].append(dict(id=eid,name=name,note='Main boss integration',x=x,y=y,pages=pages));return eid
def transfer(mid):return cmd(201,[0,mid,7,8,2,0])
for mid,name in [(238,'Executive Liability Chamber'),(239,'Protocol Zero - Audit Archive')]:
 m=copy.deepcopy(db['Map237']);m.update(events=[None],displayName=name,note='Local service extension; main ending remains separately gated.');db['Map'+str(mid)]=m;db['MapInfos'].append(dict(id=mid,name=name,parentId=237 if mid==238 else 238,expanded=False,order=mid,scrollX=0,scrollY=0))
event(db['Map237'],'Executive liability access',9,8,[page(say('Vitalix retained an executive veto over the six mandates. The Underwriter holds the audit archive. The inner Core remains separately sealed.')+[transfer(238)])])
a=db['Map238'];event(a,'Return to vestibule',4,7,[page([transfer(237)])])
f=say('UNDERWRITER: Having a body is a pre-existing condition. Herpes is excluded. So is not having herpes. That is failure to diversify.')+say('Watch the marked target, then Guard next turn. At half health, new attacks unlock. You can retreat; the service clinic treats a defeat.')
f += [cmd(102,[['Challenge','Leave'],1,0,2,0]),cmd(402,[0,'Challenge']),cmd(301,[0,60,True,True],1),cmd(601,indent=1),cmd(121,[174,174,0],2),cmd(125,[0,0,1500],2)]+say('UNDERWRITER: This death is out of network. Please resubmit in triplicate.',2)+say('Executive veto revoked. The audit archive is open. Received 1500 credits.',2)+[cmd(602,indent=1)]+say('You withdraw. The return route remains open.',2)+[cmd(603,indent=1),cmd(314,[0,0],2)]+say('The service clinic restores the party. No mandate or reward was claimed.',2)+[cmd(604,indent=1),cmd(402,[1,'Leave']),cmd(404)]
event(a,'The Underwriter',7,6,[page(f),page(say('Executive veto revoked. Audit access restored.'),174)])
event(a,'Audit archive authorization',9,7,[page(say('The Underwriter retains the executive veto.')),page([transfer(239)],174)])
event(a,'Service clinic',7,4,[page(say('Emergency service: no copay. HP and MP restored.')+[cmd(314,[0,0])])])
z=db['Map239'];event(z,'Return to liability chamber',4,7,[page([transfer(238)])]);event(z,'Protocol Zero evidence',7,6,[page(say('AUDIT: Vitalix sells medical exclusions to NeuraTech. Protocol Zero turns the resulting debt into permission for compulsory neural control.')+say('The six mandates and revoked executive veto preserve this evidence. The Necklace is still required to confront A.S.P.; this archive grants no authority to choose an ending.'))])
for n,d in db.items():write(n,d)
p=Path('js/plugins.js');s=p.read_text();pos=s.rfind(']');s=s[:pos]+',{"name":"ME_MainBoss","status":true,"description":"Phased main boss controller","parameters":{}}\n'+s[pos:];p.write_text(s)
(P/'manifest.json').write_text(json.dumps(dict(enemy=151,troop=60,skills=list(range(176,185)),flag=174,approach=237,arena=238,archive=239,bossEvent=2,gateEvent=3,spawn=[7,8],reward=1500),indent=2))
print('Installed Underwriter: enemy151 troop60 skills176-184 maps238-239 switch174')
