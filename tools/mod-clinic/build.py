import json,copy,zipfile,textwrap
from pathlib import Path
OUT=Path('tools/mod-clinic');names=['Items','Armors','CommonEvents','Map025','Map045','Map083','Map099','Map110']
with zipfile.ZipFile(OUT/'before.zip','x',zipfile.ZIP_DEFLATED) as z:
 for n in names:z.write('data/'+n+'.json')
def load(n):return json.loads(Path('data/'+n+'.json').read_text(encoding='utf-8'))
D={n:load(n) for n in names};assert len(D['Armors'])==62 and len(D['CommonEvents'])==7
mods=[dict(item=133,armor=62,name='Calibrated Disco Implant',cost=100,traits=[dict(code=21,dataId=6,value=1.15),dict(code=23,dataId=0,value=1.2)],description='AGI +15%; target rate +20%.\nThe beat makes you faster and easier to notice.'),dict(item=134,armor=63,name='Calibrated Third Eye',cost=150,traits=[dict(code=22,dataId=0,value=.1),dict(code=13,dataId=5,value=.5)],description='Hit rate +10 points; Blind chance halved.\nRetains the Underworks reveal while carried.'),dict(item=153,armor=64,name='Calibrated Neural Enhancer',cost=180,traits=[dict(code=21,dataId=4,value=1.15),dict(code=23,dataId=4,value=1.1)],description='MAT +15%; MP costs +10%.\nAdditional thoughts billed separately.')]
for r in mods:
 a=copy.deepcopy(D['Armors'][4]);a.update(id=r['armor'],name=r['name'],iconIndex=D['Items'][r['item']]['iconIndex'],description=r['description'],params=[0]*8,traits=r['traits'],price=0,note='A02 calibrated prototype; return unequipped to a clinic to recover the original item.');D['Armors'].append(a)
 i=D['Items'][r['item']];i.update(consumable=False,occasion=3,scope=0,description='Prototype for clinic calibration.\nAccessory fitting costs '+str(r['cost'])+' Credits; removal is free.')
D['Items'][134]['description']='Clinic prototype; still reveals hidden ducts.\nCalibrate for 150 Credits to use as an accessory.'
def C(code,*args):return dict(code=code,indent=0,parameters=list(args))
def nest(cmds):return [dict(c,indent=c['indent']+1) for c in cmds]
def say(s):
 lines=[]
 for line in s.split('\n'):lines+=textwrap.wrap(line,43)
 out=[]
 for k in range(0,len(lines),4):out += [C(101,'',0,0,2)]+[C(401,l) for l in lines[k:k+4]]
 return out
def branch(expr,yes,no):return [C(111,12,expr)]+nest(yes)+[C(411)]+nest(no)+[C(412)]
def choice(rows):
 out=[C(102,[name for name,_ in rows],len(rows)-1,0,2,0)]
 for k,(name,cmds) in enumerate(rows):out += [C(402,k,name)]+nest(cmds)+[dict(C(0),indent=1)]
 return out+[C(404)]
rows=[]
for r in mods:
 i,a,c=r['item'],r['armor'],r['cost'];prototype=D['Items'][i]['name']
 install=branch(f'$gameParty.numItems($dataItems[{i}]) > 0 && $gameParty.gold() >= {c} && !$gameParty.hasItem($dataArmors[{a}], true)',[C(126,i,1,0,1),C(125,1,0,c),C(128,a,0,0,1,False)]+say('Calibrated. Fit it in the Equipment menu\'s Accessory slot. Removing it there immediately removes its bonuses and drawbacks. No organ repossession.'),say('Bring the prototype, enough Credits, and no existing copy of this module. No charge.'))
 reclaim=branch(f'$gameParty.numItems($dataArmors[{a}]) > 0 && $gameParty.numItems($dataItems[{i}]) < $gameParty.maxItems($dataItems[{i}])',[C(128,a,1,0,1,False),C(126,i,0,0,1)]+say('Original prototype returned. Calibration fees pay for work already done; they are not refunded. All fingers still accounted for.'),say('Unequip the module first. Bring it here with space for its prototype. Equipped modules are never taken.'))
 buy=branch(f'$gameParty.gold() >= 500 && $gameParty.numItems($dataItems[{i}]) < $gameParty.maxItems($dataItems[{i}])',[C(125,1,0,500),C(126,i,0,0,1)]+say('Prototype supplied. Calibration is a separate service.'),say('You need 500 Credits and inventory space. No charge.'))
 rows.append((prototype,say(r['description'])+say(f'Calibration: one prototype + {c} Credits. Equip one module in the Accessory slot. Unequip freely. Returning a module restores its prototype, not the fee.')+choice([(f'Calibrate: {c} Credits',choice([('Confirm calibration',install),('Cancel',[])])),('Buy prototype: 500 Credits',choice([('Confirm purchase',buy),('Cancel',[])])),('Return unequipped module',choice([('Confirm return',reclaim),('Cancel',[])])),('Leave',[])])))
rows.append(('Leave',[]))
commands=say('Zed-compatible calibration. Having a body is a pre-existing condition. Our warranty covers the socket. One calibrated module of each type per party; fit it in the Accessory slot.')+choice(rows)+[C(0)]
D['CommonEvents'].append(dict(id=7,name='Prototype Mod Clinic',trigger=0,switchId=1,list=commands))
# A reception service, not a replacement for clinic recovery or existing plot.
for n,e in [('Map025',4),('Map045',1),('Map083',3),('Map099',2)]:
 pg=D[n]['events'][e]['pages'][0];old=pg['list'][:-1]
 if n=='Map025':pg['list']=old+choice([('Prototype calibration', [C(117,7)]),('Leave',[])])+[C(0)]
 else:pg['list']=choice([('Recovery service',old),('Prototype calibration',[C(117,7)]),('Leave',[])])+[C(0)]
# Calibrating must not remove existing world access. Carried/equipped modules qualify.
L=D['Map110']['events'][5]['pages'][0]['list'];matches=0
for c in L:
 if c['code']==111 and c['parameters']==[12,'$gameParty.hasItem($dataItems[134])']:
  c['parameters']=[12,'$gameParty.hasItem($dataItems[134]) || $gameParty.hasItem($dataArmors[63], true)'];matches+=1
assert matches==1
for n,d in D.items():Path('data/'+n+'.json').write_text(json.dumps(d,ensure_ascii=False,separators=(',',':')),encoding='utf-8')
(OUT/'manifest.json').write_text(json.dumps(dict(mods=mods,commonEvent=7,clinics=[[25,4],[45,1],[83,3],[99,2]],saveCompatibility='Native inventory/equipment only; existing prototypes remain eligible; no new persistent fields.'),indent=2),encoding='utf-8')
print('Added 3 calibrated accessories and clinic services at 4 existing counters.')
