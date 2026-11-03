import json,copy,textwrap
from pathlib import Path
from zipfile import ZipFile
R=Path('.')
def read(i):return json.loads(Path(f'data/Map{i:03}.json').read_text())
def write(i,m):Path(f'data/Map{i:03}.json').write_text(json.dumps(m,ensure_ascii=False,separators=(',',':')),encoding='utf-8')
def cmd(c,p=None,i=0):return dict(code=c,parameters=p or [],indent=i)
def say(t):
 lines=textwrap.wrap(t,42);out=[]
 for i in range(0,len(lines),4):out+=[cmd(101,['',0,0,2])]+[cmd(401,[x]) for x in lines[i:i+4]]
 return out
with ZipFile('tools/main-boss/before-regional-relocation.zip','x') as z:
 for i in [115,237,238,239]:z.write(f'data/Map{i:03}.json',f'data/Map{i:03}.json')
 z.write('data/MapInfos.json','data/MapInfos.json')
# Remove only the access event created by this task, restoring the vestibule.
m=read(237);assert m['events'][-1]['name']=='Executive liability access';m['events'].pop();write(237,m)
m=read(115);base=copy.deepcopy(read(238)['events'][2]['pages'][1]);base['conditions']['switch1Valid']=False
locked=copy.deepcopy(base);locked['list']=say('EXECUTIVE CLAIMS: recover the erased crew roster first. The Underwriter denies compensation for workers erased from payroll.')+[cmd(0)]
ready=copy.deepcopy(base);ready['conditions'].update(switch1Valid=True,switch1Id=125);ready['list']=say('The roster proves the crews existed. Confront the Underwriter, Vitalix\'s regional claims executive. Both memorial choices qualify.')+[cmd(201,[0,238,7,8,2,0]),cmd(0)]
completed=copy.deepcopy(ready);completed['conditions']['switch1Id']=127
m['events'].append(dict(id=len(m['events']),name='Dorlund executive claims hearing',x=27,y=8,note='Regional main boss; not a finale gate.',pages=[locked,ready,completed]));write(115,m)
a=read(238);a['displayName']='Dorlund - Executive Liability';a['note']='Planet Ork regional boss; follows recovered Payroll Ossuary roster.'
a['events'][1]['name']='Return to Payroll Ossuary';a['events'][1]['pages'][0]['list']=[cmd(201,[0,115,25,8,2,0]),cmd(0)]
f=a['events'][2]['pages'][0]['list'];insert=say('UNDERWRITER: The Dorlund crews were deleted from payroll. No employees means no casualties. Your roster is an unauthorized resurrection.')
f[1:1]=insert
for p in a['events'][2]['pages']:
 for c in p['list']:
  if c['code']==401:c['parameters'][0]=c['parameters'][0].replace('Executive veto revoked.','Regional claims veto revoked.')
write(238,a)
z=read(239);z['displayName']='Dorlund - Claims Audit Archive';z['note']='Regional aftermath; preserves the Necklace and finale progression.'
z['events'][2]['name']='Dorlund compensation ruling';z['events'][2]['pages'][0]['list']=say('The twelve names from the erased roster match the rejected injury claims. Vitalix classified the gas alarm as a voluntary wellness event.')+say('With the regional veto revoked, Mags and the union can pursue the families\' claims. Your choice to publish a memorial or preserve private family copies still stands.')+say('The archive preserves evidence of corporate abuse. It does not replace Ork\'s Necklace guardian, complete the Necklace, or grant entry to the floating castle.')+[cmd(0)];write(239,z)
p=Path('data/MapInfos.json');j=json.loads(p.read_text());j[238].update(name=a['displayName'],parentId=115);j[239].update(name=z['displayName']);p.write_text(json.dumps(j,ensure_ascii=False,separators=(',',':')))
p=Path('tools/main-boss/manifest.json');j=json.loads(p.read_text());j.update(approach=115,world=28,role='Dorlund/Planet Ork regional main boss; not final boss',hatchEvent=len(m['events'])-1,evidence=125,questComplete=127,returnLanding=[25,8]);p.write_text(json.dumps(j,indent=2))
