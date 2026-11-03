import json,copy,textwrap,zipfile
from pathlib import Path
names=['Armors','Items','Map010','Map002'];D={n:json.loads(Path('data/'+n+'.json').read_text(encoding='utf-8')) for n in names}
with zipfile.ZipFile('tools/burlap-quest/before.zip','x',zipfile.ZIP_DEFLATED) as z:
 for n in names:z.write('data/'+n+'.json')
 z.write('img/system/IconSet.png')
assert len(D['Armors'])==65
rows=[('Deprogrammed Burlap Pants',6,[0,0,0,6,0,0,-2,0],[dict(code=13,dataId=4,value=.75)],120,'DEF +6; AGI -2; Poison chance -25%.\nStill itchy. No longer remotely managed.'),('Off-Clock Burlap Vest',4,[0,0,0,5,0,4,0,0],[],160,'DEF +5; MDF +4.\nClocking out is now a physical possibility.'),('Union Stitch Gloves',5,[0,0,3,2,0,0,0,0],[dict(code=22,dataId=0,value=.03)],100,'ATK +3; DEF +2; hit rate +3 points.\nCollective bargaining, individual fingers.')]
for k,(name,slot,params,traits,price,desc) in enumerate(rows):
 o=copy.deepcopy(D['Armors'][4]);o.update(id=65+k,name=name,etypeId=slot,params=params,traits=traits,price=price,description=desc,iconIndex=2101+k,note='A04: nanites disabled after SEAM quest hand-in.');D['Armors'].append(o)
def C(code,*p):return dict(code=code,indent=0,parameters=list(p))
def nest(cs):return [dict(c,indent=c['indent']+1) for c in cs]
def say(s):
 lines=textwrap.wrap(s,43);out=[]
 for i in range(0,len(lines),4):out += [C(101,'Actor3',7,0,2)]+[C(401,l) for l in lines[i:i+4]]
 return out
def branch(expr,yes,no=[]):return [C(111,12,expr)]+nest(yes)+([C(411)]+nest(no) if no else [])+[C(412)]
def choice(rows):
 out=[C(102,[n for n,_ in rows],len(rows)-1,0,2,0)]
 for k,(n,cmds) in enumerate(rows):out += [C(402,k,n)]+nest(cmds)+[dict(C(0),indent=1)]
 return out+[C(404)]
complete='$gameSelfSwitches.value([10,11,"B"]) || $gameSelfSwitches.value([10,13,"B"])'
won='$gameParty.hasItem($dataItems[137]) || $gameSelfSwitches.value([2,23,"A"]) || $gameSelfSwitches.value([2,26,"A"])'
shop=[C(302,2,65,0,0,False),C(605,2,66,0,0),C(605,2,67,0,0)]
post=say('The nanites are offline. The pants no longer own your arse. I kept the useful fabric; you kept your right to sit down.')+choice([('Buy safe burlap clothing',shop),('Leave',[])])
rewards=[]
for k,row in enumerate(rows):
 n=65+k
 grant=[C(126,137,1,0,1),C(128,n,0,0,1,False),C(125,0,0,150),C(355,'$gameSelfSwitches.setValue([10,11,"B"],true);$gameSelfSwitches.setValue([10,13,"B"],true);$gameSelfSwitches.setValue([2,23,"A"],true);$gameSelfSwitches.setValue([2,26,"A"],true);')]+say('Received '+row[0]+' and 150 Credits. Safe clothing is now available here and at Pants-O-Rama. Your employment contract ends at your waistband.')
 rewards.append((row[0],say(row[5])+choice([('Take this reward',branch(f'$gameParty.numItems($dataArmors[{n}]) < $gameParty.maxItems($dataArmors[{n}])',grant,say('Your inventory for this garment is full. Make room and return; your reward is still waiting.'))),('Not yet',[])])))
rewards.append(('Decide later',[]))
handin=say('You shut down SEAM! Its control module confirms the nanites were billing unpaid overtime directly to your crotch. I can disable the garment receivers. Choose one safe piece and take 150 Credits for exposing this.')+choice(rewards)
analysed='$gameSelfSwitches.value([10,11,"A"]) || $gameSelfSwitches.value([10,13,"A"]) || $gameParty.hasItem($dataItems[136])'
reminder=say('The sample contains mind-control nanites. Search behind the counter at Pants-O-Rama in Timbuc 2. Defeat SEAM-3000, recover its control module, then return here for safe clothing and 150 Credits.')
analysis=say('Those Productivity Enhancement Garments are from SEAM-3000. May I cut a sample? It is either mind control or the worst fabric softener ever commissioned.')+choice([('Analyze the package',branch('!$gameParty.hasItem($dataItems[136])',[C(126,136,0,0,1)])+[C(355,'$gameSelfSwitches.setValue([10,11,"A"],true);$gameSelfSwitches.setValue([10,13,"A"],true);')]+say('Microscopic mind-control nanites. I have labeled the fabric sample for you. Armatek calls involuntary pelvic labor a wellness initiative.')+reminder),('Not now',[])])
list_=branch(complete,post,branch(won,handin,branch(analysed,reminder,branch('$gameParty.hasItem($dataItems[135])',analysis,say('A package of Productivity Enhancement Garments was left nearby in Timbuc. Bring it here before you put it on. Having skin is already a pre-existing condition; do not give them trousers too.')))))+[C(0)]
e=D['Map010']['events'][11];pg=copy.deepcopy(e['pages'][0]);pg['conditions'].update(itemValid=False,selfSwitchValid=False);pg['moveType']=0;pg['list']=list_;e['pages']=[pg]
# Preserve the complete SEAM battle and its accepted animation; update only the hand-in directions.
e=D['Map002']['events'][23]
for pg in e['pages']:
 for c in pg['list']:
  if c['code']==401 and c['parameters']==['The Burlap Pants Conspiracy has been stopped.']:c['parameters']=['Take the module to the researcher in Timbuc.']
e['pages'][1]['list']=branch(complete,say('PANTS-O-RAMA: UNDER HUMAN MANAGEMENT. No nanites. No mandatory overtime. No refunds for chafing.')+choice([('Buy safe burlap clothing',shop),('Leave',[])]),say('Pants-O-Rama is closed for decontamination. Return to the Armatek researcher in Timbuc to claim your reward and reopen the safe clothing counter.'))+[C(0)]
# Existing saves with only the retired shop completion flag sync themselves on the first interaction.
D['Items'][137]['description']='SEAM is offline. Take this to the Armatek\nresearcher in Timbuc for your clothing reward.'
for n,d in D.items():Path('data/'+n+'.json').write_text(json.dumps(d,ensure_ascii=False,separators=(',',':')),encoding='utf-8')
Path('tools/burlap-quest/manifest.json').write_text(json.dumps(dict(armors=[65,66,67],icons=[2101,2102,2103],researcher=[10,11],shop=[2,23],completion='Self switches [10,11,B] and [10,13,B]',reward='Choice of one garment +150 Credits once; clothing shop unlocked',battle='Troop52 unchanged'),indent=2),encoding='utf-8')
