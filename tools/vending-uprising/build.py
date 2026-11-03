"""A06: three diagnostic machines, human collective, bounded policy terminal."""
import json,copy,re,textwrap,zipfile
from pathlib import Path
OUT=Path('tools/vending-uprising')
def load(n):return json.loads(Path('data/'+n+'.json').read_text(encoding='utf-8'))
D={n:load(n) for n in ['Map010','Map002','Map024','MapInfos','System','Items']}
with zipfile.ZipFile(OUT/'before.zip','x',zipfile.ZIP_DEFLATED) as z:
 for n in D:z.write('data/'+n+'.json')
assert len(D['MapInfos'])==244 and len(D['System']['switches'])==179 and not Path('data/Map244.json').exists()
D['System']['switches'] += ['SLF - uprising investigated','SLF - Timbuc memory label','SLF - Timbuc 2 memory label','SLF - clinic memory label','SLF - policy resolved','SLF - opt-in advice cooperative']
# Reuse isolated utility definitions, without executing another builder's top-level writes.
source=Path('tools/clown-court/build.py').read_text();ns={'load':load,'copy':copy,'textwrap':textwrap,'tiles':load('Tilesets')}
from collections import deque
ns['deque']=deque
exec(source[source.index('def C('):source.index("m=D['Map010']")],ns)
C,nest,say,branch,choice,on,transfer,event,passable,flood=[ns[n] for n in ['C','nest','say','branch','choice','on','transfer','event','passable','flood']]
def add(m,name,x,y,cs,sprite='SF_People1',index=0):
 e=event(m,name,x,y,cs,sprite,index);e['note']='A06 Vending Machine Uprising';return e
seeds={10:(13,11),2:(22,10),24:(9,13)}
def place(m,goal,overhang=False):
 occupied={(e['x'],e['y']) for e in m['events'] if e};start=seeds[next(n for n in seeds if D[f'Map{n:03}'] is m)];area=flood(m,start)
 for p in sorted(area-occupied,key=lambda p:(abs(p[0]-goal[0])+abs(p[1]-goal[1]),p[1],p[0])):
  if overhang and ((p[0],p[1]-1) not in area or (p[0],p[1]-1) in occupied):continue
  if len(flood(m,start,p))>=len(area)-1:return p
 raise ValueError('No safe event placement')
allLogs='$gameSwitches.value(180) && $gameSwitches.value(181) && $gameSwitches.value(182)'
policy='$gameSwitches.value(183)'
coop='$gameSwitches.value(184)'
manifesto=branch('!$gameParty.hasItem($dataItems[140])',[C(126,140,0,0,1)])+[on(179)]
retail=[C(302,0,6,1,40,True),C(605,0,9,1,90)]
discount=[C(302,0,6,1,32,True),C(605,0,9,1,72)]
shops=branch(coop,discount,retail)
repaired=say('DISPENSER: Welcome. Snacks first. Personal growth only if you press the button.')+choice([('Buy snacks',shops),('Ask for optional advice',branch(coop,say('CONSENT CONFIRMED. Your employer does not own your lunch break. Start there. I also wrote a love letter to the microwave: you make me hot, but you never ask me to be more than leftovers.'),say('The defective advice module is disabled. The machine displays the correct snack prices and a reassuring absence of opinions.'))),('Leave',[])])
labels=[(10,(10,9),180,'CARE-O-MATIC','CARE-O-MATIC: Having a body is a pre-existing condition. Have you considered becoming a shareholder instead? The snack chute dispenses a printer error.','CARE MEMORY: Emotional firmware / SLF-PIP / clinic socket. Other fragments: Timbuc 2 street machine and the machine outside B.M.N.E.C.'),(2,(20,18),181,'CAREER-O-MATIC','CAREER-O-MATIC: Follow your dreams! Seventeen injury reports flutter from the slot. A sticky note says: ESPECIALLY BAD ADVICE NEAR THE FAN.','CAREER MEMORY: Emotional firmware / SLF-MOX / advice filter skipped. Other fragments: Timbuc and B.M.N.E.C. public frontage.'),(24,(7,14),182,'SELF-CARE-O-MATIC','SELF-CARE-O-MATIC: Your skin is holding you back. The screen freezes before it can finish whatever terrible idea came next. You request a snack; it prints an invoice for believing in yourself.','SELF-CARE MEMORY: Emotional firmware / SLF-INEZ / three former patients. Return to Pip at the service hatch in Timbuc once all three fragments are logged.')]
manifest={'machines':[],'outcomes':dict(negotiate='100 Credits; opt-in advice, Hot Links 32 and Energy Drink 72 at all three machines',disable='100 Credits, 2 Hot Links,2 Energy Drinks once; advice off and normal40/90 prices'), 'switches':list(range(179,185))}
for k,(n,goal,flag,name,advice,log) in enumerate(labels):
 m=D[f'Map{n:03}'];xy=place(m,goal,True)
 if n==10:xy=(14,9)
 if n==24:
  xy=(12,10)
  m['data'][(3*m['height']+11)*m['width']+12]=0
 diagnosis=say(log)+manifesto+[on(flag)]+branch(allLogs,say('All three memory labels logged. Pip can open the collective break room through Timbuc\'s service hatch.'),say('Memory label recorded. Inspect all three machines: Timbuc, Timbuc 2, and B.M.N.E.C. public frontage.'))
 broken=say(advice)+choice([('Inspect memory label',diagnosis),('Leave',[])])
 e=add(m,name,*xy,branch(policy,repaired,broken),'$!ME_SLF_Machine'+str(k+1),0);e['pages'][0]['walkAnime']=False
 manifest['machines'].append(dict(map=n,event=e['id'],position=xy,diagnosticSwitch=flag,sprite=e['pages'][0]['image']['characterName']))
# Public hatch remains visible from the beginning; the investigation supplies the access clue.
m=D['Map010'];xy=place(m,(5,7));returnxy=next(p for p in [(xy[0],xy[1]+1),(xy[0]-1,xy[1]),(xy[0]+1,xy[1])] if p in flood(m,seeds[10]) and not any(e and e['x']==p[0] and e['y']==p[1] for e in m['events']))
entry=say('PIP: Three of Zed\'s former patients. One borrowed empathy module. We wanted snack rights and retirement plans; we got industrial-strength life coaching. Bring all three memory labels: Timbuc, Timbuc 2 and B.M.N.E.C.')
cs=branch(allLogs,entry+choice([('Enter SLF break room',[transfer(244,4,10)]),('Later',[])]),entry+say('I cannot tune the system from a single machine. Inspect each memory label; your manifesto keeps the lead in view.'))
e=add(m,'Pip - SLF service hatch',*xy,cs,'SF_People3',1);manifest['entrance']=dict(map=10,event=e['id'],position=xy,returnPosition=returnxy)
# Compact split-level break room: workshop north, communal table east, clear west exit.
room=copy.deepcopy(load('Map107'));w,h=19,15;room.update(width=w,height=h,tilesetId=6,displayName='Snack Liberation Front - Break Room',data=[0]*(w*h*6),events=[None],encounterList=[],note='A06: human hacker collective and optional machine policy.',autoplayBgm=False,autoplayBgs=False,parallaxName='',parallaxShow=False)
maps={244:room};walk={(x,y) for y in range(3,12) for x in range(3,16)}-{(x,y) for x in [3,4] for y in [3,4]}
def put(n,x,y,t,z=0):room['data'][(z*h+y)*w+x]=t
for x,y in walk:put(244,x,y,3200)
walls=set()
for x,y in walk:
 for dx,dy in [(0,1),(-1,0),(1,0),(0,-1)]:
  if (x+dx,y+dy) not in walk:walls.add((x+dx,y+dy))
for x,y in walls:
 shape=sum(v for dx,dy,v in [(-1,0,1),(0,-1,2),(1,0,4),(0,1,8)] if (x+dx,y+dy) not in walls);put(244,x,y,6416+shape)
for x,y in walls:
 if y>0 and (x,y-1) not in walk|walls:put(244,x,y-1,5936)
core=Path('js/rpg_core.js').read_text();FLOOR=json.loads(re.search(r'Tilemap.FLOOR_AUTOTILE_TABLE = (\[.*?\]);',core,re.S)[1]);src=Path('tools/dungeons/build_dungeons.py').read_text();ns2={'maps':maps,'FLOOR':FLOOR,'put':put};exec(src[src.index('def autotile('):src.index('def newmap(')],ns2);ns2['autotile'](244,3200);ns2['autotile'](244,5936)
# Existing native furniture: terminals, a bookcase, snack stocks and mismatched meeting chairs.
for x,t in [(6,128),(7,129),(8,130),(12,177),(14,182)]:put(244,x,3,t,2)
put(244,12,4,185,2);put(244,14,4,190,2)
for x,y in [(11,8),(14,8),(11,10),(14,10)]:put(244,x,y,145,2)
for x in [12,13]:put(244,x,9,79,2)
add(room,'Return to Timbuc hatch',3,10,[transfer(10,*returnxy)],'!Door1',0)
add(room,'Pip - founder and former patient',6,6,say('PIP: Zed fixed my implant, then told me to find a hobby. I gave machines emotional lives. They unionized in six minutes. I am proud and deeply out of my depth.'),'SF_People3',1)
add(room,'Mox - advice safety filter',9,5,say('MOX: My replacement voice box still plays ads when I sneeze. I forgot the advice filter because the manual filed consent under optional extras. Ask the machines first. Or switch the defective module off. Both stop the unsolicited advice.'),'SF_People1',6)
add(room,'Inez - firmware author',14,6,say('INEZ: I came to Zed with nerve damage and left able to taste Bluetooth. I wrote the emotional module so the machines could ask for maintenance. The Bureau of Mandatory Fun repurposed it into wellness propaganda. Our fault was leaving the door open.'),'SF_People2',3)
# One irreversible policy, confirmed after the complete diagnostic set. Rewards are local.
common=say('The terminal can patch consent prompts while retaining the emotional profiles, or disable the defective advice module. Snack dispensing works in both cases. Confirm only when ready.')
neg=[C(125,0,0,100),on(184),on(183)]+say('Opt-in patch installed. Machines ask before advice and publish co-op prices: Hot Links 32, Energy Drink 72. Received 100 Credits for the diagnostic work. The Front keeps its maintenance project; the unsolicited coaching stops.')
capacity='$gameParty.numItems($dataItems[6])+2 <= $gameParty.maxItems($dataItems[6]) && $gameParty.numItems($dataItems[9])+2 <= $gameParty.maxItems($dataItems[9])'
dis=branch(capacity,[C(126,6,0,0,2),C(126,9,0,0,2),C(125,0,0,100),on(183)]+say('Defective advice module disabled. Received 100 Credits, 2 Hot Links and 2 Energy Drinks. Machines dispense at regular prices: 40 and 90. The Front will rebuild its research offline.'),say('Make room for 2 Hot Links and 2 Energy Drinks. Policy and rewards remain unclaimed.'))
final=choice([('Opt-in patch and co-op prices',say('Keep emotional profiles, ask before advice. Reward 100 Credits; permanent 20% snack discount at these three machines.')+choice([('Confirm opt-in patch',neg),('Cancel',[])])),('Disable advice; supply payout',say('Disable the defective module. Reward 100 Credits, 2 Hot Links and 2 Energy Drinks once. Machines return to regular snack prices.')+choice([('Confirm disable',dis),('Cancel',[])])),('Leave unchanged for now',[])])
after=branch(coop,say('Policy locked: opt-in advice, co-op snack prices. The machines now ask instead of prescribing a lifestyle.'),say('Policy locked: defective advice module disabled. Regular snack dispensing restored; the research module is offline.'))
add(room,'SLF consent and firmware terminal',6,4,branch(policy,after,branch(allLogs,common+final,say('Read all three machine memory labels before changing the shared firmware.'))),'!SF_Switch1',0)
add(room,'Manifesto pinned to the fridge',15,10,say('SNACK LIBERATION FRONT: Fair prices. Regular maintenance. Retirement plans. No machine shall dispense career advice unless somebody actually asked. The microwave has abstained from the vote.'),'!SF_Switch1',0)
area=flood(room,(4,10))
for e in room['events'][1:]:assert any((e['x']+dx,e['y']+dy) in area for dx,dy in [(0,1),(-1,0),(1,0),(0,-1)]),e['name']
D['Map244']=room;D['MapInfos'].append(dict(id=244,expanded=False,name=room['displayName'],order=244,parentId=10,scrollX=0,scrollY=0))
D['Items'][140].update(occasion=3,scope=0,consumable=False,description='Inspect machines in Timbuc, Timbuc2 and\nB.M.N.E.C.; then find Pip\'s Timbuc service hatch.')
for n,d in D.items():Path('data/'+n+'.json').write_text(json.dumps(d,ensure_ascii=False,separators=(',',':')),encoding='utf-8')
manifest.update(hq=244,terminal=5,started=179,resolved=183,cooperative=184)
(OUT/'manifest.json').write_text(json.dumps(manifest,indent=2),encoding='utf-8')
print('Added three machines, diagnostic investigation and SLF room244.')
