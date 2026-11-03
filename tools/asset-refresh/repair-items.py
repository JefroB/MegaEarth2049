import json,copy,re
from pathlib import Path
P=Path('tools/asset-refresh');read=lambda p:json.loads(Path(p).read_text(encoding='utf-8-sig'))
a=read('data/Items.json');orig=copy.deepcopy(a);out=[None]*154;out[0]=a[0];out[1]=a[1];mapping={};log=[]
for slot,o in enumerate(a):
 if not o or not o['name'] or slot==1:continue
 dest=o['id']
 if slot==19:dest=153 # Neural enhancer and completed engine had conflicting ID132.
 if slot>=128 or dest not in [128,129,130,131,137]:out[dest]=copy.deepcopy(o);out[dest]['id']=dest
 mapping[slot]=dest
# Five authored pickups whose records were overwritten by the compressed quest-item block.
for id,name,desc,price,effects,icon in [
 (4,'Stimulant','Corporate alertness in a vial. Restores 20 TP and clears Sleep. Your break is now cancelled.',100,[{'code':13,'dataId':0,'value1':20,'value2':0},{'code':22,'dataId':10,'value1':1,'value2':0}],176),
 (6,'Hot Links','Aggressively spicy corporate sausages. Restores 100 HP. Served at a legally defensible temperature.',40,[{'code':11,'dataId':0,'value1':0,'value2':100}],274),
 (8,'Spicy Burrito','A tightly wrapped meal with suspicious structural integrity. Restores 150 HP.',65,[{'code':11,'dataId':0,'value1':0,'value2':150}],274),
 (9,'Energy Drink','Liquid overtime. Restores 30 MP. The crash is your personal responsibility.',90,[{'code':12,'dataId':0,'value1':0,'value2':30}],176),
 (13,'Rabinex','Acme Rabinex: clears Rabies. Side effects may include spontaneous tax fraud.',80,[{'code':22,'dataId':26,'value1':1,'value2':0}],176)]:
  o=copy.deepcopy(out[1]);o.update(id=id,name=name,description=desc,price=price,effects=effects,iconIndex=icon,animationId=41,scope=7,consumable=True,itypeId=1,occasion=0);out[id]=o
# All authored quest IDs now live at their originally declared IDs. Existing event scripts remain meaningful.
Path('data/Items.json').write_text(json.dumps(out,separators=(',',':')),encoding='utf-8')
# Invalid legacy supply references are resolved conservatively, not sold as quest artifacts.
supply={2:1,3:13,5:6,7:8,14:13,15:13,16:13,17:13,18:13,19:13}
for p in [*Path('data').glob('Map*.json'),Path('data/CommonEvents.json'),Path('data/Troops.json')]:
 if p.name=='MapInfos.json':continue
 d=read(p);changed=False
 def visit(v):
  global changed
  if isinstance(v,dict):
   if 'code' in v and 'parameters' in v:
    code=v['code'];args=v['parameters']
    if code in [302,605] and args and args[0]==0:
     old=args[1];new=supply.get(old, mapping.get(old,old) if old in range(20,27) else old)
     if new!=old:args[1]=new;changed=True;log.append([str(p),'shop',old,new])
   for x in v.values():visit(x)
  elif isinstance(v,list):
   for x in v:visit(x)
 visit(d)
 if changed:p.write_text(json.dumps(d,separators=(',',':')),encoding='utf-8')
# Invalid consumable drop slots predate the quest block. Preserve drop chances, use existing small supplies.
p=Path('data/Enemies.json');d=read(p)
for e in d:
 if e:
  for drop in e['dropItems']:
   if drop['kind']==1 and (drop['dataId']>=len(out) or not out[drop['dataId']]):
    log.append(['Enemies',e['id'],drop['dataId'],1]);drop['dataId']=1
p.write_text(json.dumps(d,separators=(',',':')),encoding='utf-8')
P.joinpath('item-repair.json').write_text(json.dumps({'slotToCanonicalId':mapping,'referenceChanges':log,'saveNote':'Legacy inventory keys already used stored IDs. Preserve them. ID132 was ambiguous between neural enhancer and completed engine; retain engine132, preserve original inventory snapshot in save migration, do not grant unearned quest completion. New enhancer is153.'},indent=2))
print('Canonical items',sum(bool(x and x.get('name')) for x in out),'reference fixes',len(log))
