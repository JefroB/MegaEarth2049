import json,copy,zipfile
from pathlib import Path
names=['States','Items','Skills','CommonEvents','Map025','Map045','Map083','Map099']
D={n:json.loads(Path('data/'+n+'.json').read_text(encoding='utf-8')) for n in names}
with zipfile.ZipFile('tools/field-guide/before.zip','x',zipfile.ZIP_DEFLATED) as z:
 for n in D:z.write('data/'+n+'.json')
 z.write('js/plugins.js')
assert len(D['Items'])==178 and len(D['CommonEvents'])==8
for i in [27,76]:
 old=D['States'][i]['traits'];assert old==[dict(code=22,dataId=0,value=-.02 if i==27 else -.03)]
 D['States'][i]['traits'][0]['dataId']=7
item=copy.deepcopy(D['Items'][151]);item.update(id=178,name='Body & Firmware Field Guide',description='Effects, durations, cures and calibrated mods.\nReusable reference; read outside battle.',effects=[dict(code=44,dataId=8,value1=0,value2=0)],occasion=2,scope=0,consumable=False,price=0,note='<ME Field Guide>',iconIndex=190)
D['Items'].append(item)
D['CommonEvents'].append(dict(id=8,name='Read Body & Firmware Field Guide',trigger=0,switchId=1,list=[dict(code=355,indent=0,parameters=['ME.FieldGuide.open();']),dict(code=0,indent=0,parameters=[])]))
# Add a guide choice to the outer counter menu; recovery and calibration branches retain their indices.
for n,eid in [('Map025',4),('Map045',1),('Map083',3),('Map099',2)]:
 L=D[n]['events'][eid]['pages'][0]['list'];menu=next(c for c in L if c['code']==102 and c['indent']==0);insert=len(menu['parameters'][0])-1
 assert menu['parameters'][0][-1]=='Leave'
 menu['parameters'][0].insert(insert,'Read field guide');menu['parameters'][1]+=1
 if menu['parameters'][2]>=insert:menu['parameters'][2]+=1
 idx=next(i for i,c in enumerate(L) if c['code']==402 and c['indent']==0 and c['parameters'][0]==insert)
 L[idx]['parameters'][0]+=1
 L[idx:idx]=[dict(code=402,indent=0,parameters=[insert,'Read field guide']),dict(code=117,indent=1,parameters=[8]),dict(code=0,indent=1,parameters=[])]
for o in [D['Items'][157],D['Skills'][211]]:o['description']="Clears diseases, rashes and Queasy.\nAlso removes Beneficial Parasites' bonuses."
for n,d in D.items():Path('data/'+n+'.json').write_text(json.dumps(d,ensure_ascii=False,separators=(',',':')),encoding='utf-8')
p=Path('js/plugins.js');s=p.read_text(encoding='utf-8');a=s.index('[');plugins=json.loads(s[a:].strip().rstrip(';'));assert not any(x['name']=='ME_FieldGuide' for x in plugins);plugins.append(dict(name='ME_FieldGuide',status=True,description='Live combat state and calibrated implant reference.',parameters={}));p.write_text(s[:a]+json.dumps(plugins,indent=2,ensure_ascii=False)+';\n',encoding='utf-8')
print('Added reusable guide178, common event8 and four clinic links; fixed two HP-drain traits.')
