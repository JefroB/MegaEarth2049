"""A12: a bounded Collective trial through existing Cafe/Matrix access."""
import copy,json,re,textwrap,zipfile
from pathlib import Path
from collections import deque
OUT=Path('tools/hidden-dojo')
def load(n):return json.loads(Path('data/'+n+'.json').read_text(encoding='utf-8'))
D={n:load(n) for n in ['Map008','Map009','MapInfos','System','Items','Armors','Enemies','Troops']}
with zipfile.ZipFile(OUT/'before.zip','x',zipfile.ZIP_DEFLATED) as z:
 for n in D:z.write('data/'+n+'.json')
 z.write('img/system/IconSet.png')
assert len(D['MapInfos'])==245 and len(D['System']['switches'])==185 and len(D['Items'])==179 and len(D['Armors'])==68 and len(D['Enemies'])==152 and len(D['Troops'])==61
for n in range(245,249):assert not Path(f'data/Map{n:03}.json').exists()
D['System']['switches'] += ['Collective - dojo neural handshake','Collective - silent route passed','Collective - sparring passed','Collective - care trial passed','Collective - first trial credential','Collective - silent route armed']
# Isolate native event and passage helpers from earlier tooling.
src=Path('tools/clown-court/build.py').read_text();ns={'load':load,'copy':copy,'textwrap':textwrap,'tiles':load('Tilesets'),'deque':deque};exec(src[src.index('def C('):src.index("m=D['Map010']")],ns)
C,nest,say,branch,choice,on,transfer,event,passable,flood=[ns[n] for n in ['C','nest','say','branch','choice','on','transfer','event','passable','flood']]
def off(n):return C(121,n,n,1)
def add(m,name,x,y,cs,sprite='!SF_Switch1',index=0,trigger=0,priority=1):
 e=event(m,name,x,y,cs,sprite,index);e['note']='A12 Hidden Dojo';e['pages'][0].update(trigger=trigger,priorityType=priority,stepAnime=False);return e
# Pink's established recruitment authenticates the first visit; the handshake then persists.
gate='$gameParty._actors.indexOf(7)>=0 || $gameSwitches.value(185)'
auth=branch(gate,say('Pink\'s implant recognizes the Collective handshake. A pocket between this Matrix node and physical space opens. The first trial is available.')+[on(185)]+choice([('Enter Hidden Dojo',[transfer(245,10,12)]),('Later',[])]),say('COLLECTIVE HANDSHAKE: Unrecognized neural signature. Recruit Pink Ninja through her Church Street encounter, then return with her in the party.'))
# Preserve the original cafe-to-Matrix path in both activation tiles of the same computer.
for i in [1,3]:D['Map008']['events'][i]['pages'][0]['list']=say('Neural access: public Matrix session or the encrypted Collective handshake.')+choice([('Connect to the Matrix',[C(201,0,9,9,17,8,1)]),('Follow Collective handshake',auth),('Disconnect',[])])+[C(0)]
add(D['Map009'],'Collective neural access point',13,10,auth,'!Crystal',1)
# Ordinary training echo, reusing the approved Blue Ninja battler and native battle effects.
e=copy.deepcopy(D['Enemies'][15]);e.update(id=152,name='Collective Training Echo',params=[600,50,24,14,16,16,30,10],exp=0,gold=0,dropItems=[dict(kind=0,dataId=1,denominator=1) for _ in range(3)],note='<Sideview Battler: blueninja>\n<Sideview Attack Motion: thrust>\n<Sideview Weapon: 1>',actions=[dict(skillId=1,rating=5,conditionType=0,conditionParam1=0,conditionParam2=0),dict(skillId=262,rating=4,conditionType=1,conditionParam1=2,conditionParam2=3)]);D['Enemies'].append(e)
D['Troops'].append(dict(id=61,name='Collective - Training Echo',members=[dict(enemyId=152,x=360,y=325,hidden=False)],pages=[]))
# Reward equipment and reference credential are native records; no permanent actor edits.
a=copy.deepcopy(D['Armors'][4]);a.update(id=68,name='Collective Neural Bandana',etypeId=3,atypeId=1,price=0,iconIndex=2104,params=[0,0,0,2,0,3,2,0],traits=[dict(code=13,dataId=6,value=.5),dict(code=13,dataId=8,value=.5)],description='DEF +2; MDF +3; AGI +2.\nHalves Silence and Confusion application.',note='A12 first Collective trial reward.');D['Armors'].append(a)
i=copy.deepcopy(D['Items'][138]);i.update(id=179,name='Collective Trial Credential',iconIndex=2104,occasion=3,scope=0,price=0,description='First trial passed: silence, discipline, care.\nNeural access: Internet Cafe or Matrix relay.',note='A12 credential; does not recruit additional ninjas or unlock the finale.');D['Items'].append(i)
# Handshake hall, alarm route, training ring, care ward: distinct interconnected maps.
maps={};walks={};core=Path('js/rpg_core.js').read_text();FLOOR=json.loads(re.search(r'Tilemap.FLOOR_AUTOTILE_TABLE = (\[.*?\]);',core,re.S)[1])
def put(n,x,y,t,z=0):
 m=maps[n];m['data'][(z*m['height']+y)*m['width']+x]=t
src2=Path('tools/dungeons/build_dungeons.py').read_text();ns2={'maps':maps,'FLOOR':FLOOR,'put':put};exec(src2[src2.index('def autotile('):src2.index('def newmap(')],ns2);autotile=ns2['autotile']
def new(n,name,w,h,ts,walk,floor,wall,ceiling):
 m=copy.deepcopy(load('Map107'));m.update(width=w,height=h,displayName=name,tilesetId=ts,data=[0]*(w*h*6),events=[None],encounterList=[],note='A12 optional Collective trial; no random encounters.',autoplayBgm=False,autoplayBgs=False,parallaxName='',parallaxShow=False,scrollType=0);maps[n]=m;walks[n]=walk
 for x,y in walk:put(n,x,y,floor)
 walls=set()
 for x,y in walk:
  for dx,dy in [(0,1),(-1,0),(1,0),(0,-1)]:
   if(x+dx,y+dy)not in walk:walls.add((x+dx,y+dy))
 for x,y in walls:
  shape=sum(v for dx,dy,v in[(-1,0,1),(0,-1,2),(1,0,4),(0,1,8)]if(x+dx,y+dy)not in walls);put(n,x,y,wall+shape)
 for x,y in walls:
  if y>0 and (x,y-1)not in walk|walls:put(n,x,y-1,ceiling)
 autotile(n,floor);autotile(n,ceiling)
 D['MapInfos'].append(dict(id=n,expanded=False,name=name,order=n,parentId=9 if n==245 else 245,scrollX=0,scrollY=0));return m
hallwalk={(x,y)for y in range(3,14)for x in range(3,18)}
hall=new(245,'Hidden Dojo - Handshake Hall',21,17,6,hallwalk,2912,6416,5936)
routewalk={(x,y)for y in range(10,14)for x in range(3,9)}|{(x,y)for y in range(5,13)for x in range(6,9)}|{(x,y)for y in range(5,8)for x in range(6,16)}|{(x,y)for y in range(3,8)for x in range(13,18)}
route=new(246,'Hidden Dojo - Silent Packet Run',21,17,9,routewalk,2912,6320,5936)
ring=new(247,'Hidden Dojo - Counterexample Ring',21,17,9,{(x,y)for y in range(3,14)for x in range(3,18)},2912,6320,5936)
ward=new(248,'Hidden Dojo - Care Before Compliance',23,16,12,{(x,y)for y in range(3,13)for x in range(3,20)},2912,6416,6032)
# Hall mat and relay fittings; no furniture blocks the central return route.
for y in range(6,12):
 for x in range(8,13):put(245,x,y,3680)
autotile(245,3680)
for x in [5,15]:put(245,x,3,128,2);put(245,x,4,136,2)
add(hall,'Return to Matrix access point',10,13,[off(190),transfer(9,13,11)],'!Door1',0)
add(hall,'Silent Packet Run entrance',4,6,say('Silence trial: follow the cyan route. Orange simulation tiles are noise alarms, not HP damage. An alarm resets this attempt; re-arm at the start console. The other trials keep their progress.')+branch('$gameSwitches.value(186)',[off(190)], [on(190)])+[transfer(246,5,12)],'!Door1',1)
add(hall,'Counterexample Ring entrance',16,6,[transfer(247,10,12)],'!Door1',1)
add(hall,'Care trial entrance',10,3,[transfer(248,11,11)],'!Door1',1)
progress=say('Three qualities: move without triggering alarms, complete the practice fight, and help the care-ward apprentice. Return here afterward. Corporate security tests obedience. We test whether you can stop acting like their fucking product.')
add(hall,'Collective steward - trial objectives',6,10,progress,'ninja1',4)
allPassed='$gameSwitches.value(186)&&$gameSwitches.value(187)&&$gameSwitches.value(188)'
reward=[C(128,68,0,0,1,False),C(126,179,0,0,1),C(315,0,0,0,0,200,False),on(189)]+say('First trial passed. Received Collective Neural Bandana, Collective Trial Credential, and 200 EXP for each current party member. The bandana halves Silence and Confusion application while equipped. Further recruitment trials are still separate matters.')
claim=branch('$gameParty.numItems($dataArmors[68])<$gameParty.maxItems($dataArmors[68]) && $gameParty.numItems($dataItems[179])<$gameParty.maxItems($dataItems[179])',reward,say('Make room for the bandana and credential. Your trial progress and reward are retained.'))
relay=say('COMPILER RELAY: This is a Collective training projection. Some say the Compiler helped architect A.S.P.; this relay cannot verify that claim. Your implant\'s larger mystery still lies beyond these exercises.')+branch('$gameSwitches.value(189)',say('Your first credential remains valid. No duplicate training stipend is authorized. Ask the steward about future work.'),branch(allPassed,choice([('Claim first-trial reward',claim),('Later',[])]),progress))
add(hall,'Compiler relay - first trial credential',10,5,relay,'Evil',3)
# Explicit safe corridor and fixed visible alarms; no timing or hidden collision scripts.
safe={(x,y)for y in range(10,14)for x in range(3,9)}|{(7,y)for y in range(7,13)}|{(x,7)for x in range(7,11)}|{(10,6),(11,6),(12,6)}|{(x,y)for y in range(3,8)for x in range(13,18)}
for x,y in safe:put(246,x,y,3296)
alarms=[]
for x,y in sorted(routewalk-safe):
 put(246,x,y,3680)
 alarm=branch('$gameSwitches.value(190)&&!$gameSwitches.value(186)',[off(190),C(250,dict(name='Buzzer1',volume=65,pitch=100,pan=0))]+say('AUDIT ALARM. Attempt reset; no injury or lost items. Re-arm the start console and follow the cyan route.')+[transfer(246,5,12)])
 e=add(route,'Visible noise alarm',x,y,alarm,'',0,trigger=1,priority=0);alarms.append(e['id'])
autotile(246,3296);autotile(246,3680)
add(route,'Return to Handshake Hall',3,12,[off(190),transfer(245,5,6)],'!Door1',0)
start=add(route,'Re-arm silent trial',4,11,branch('$gameSwitches.value(186)',say('Silence trial already passed.'),say('Arm the trial, then follow cyan tiles to the far console. Orange tiles reset an armed attempt. Leaving or a failed attempt never clears other trial progress.')+choice([('Arm trial',[on(190)]),('Leave',[])])))
goal=add(route,'Silent route finish console',16,4,branch('$gameSwitches.value(186)',say('Silent route credential already recorded.'),branch('$gameSwitches.value(190)',[on(186),off(190)]+say('Silent route passed. You crossed without an active alarm. Return to the hall for the other trials.'),say('The attempt is not armed. Use the start console or re-enter from the hall.'))))
# Combat ring with native win/escape/defeat callbacks and no farmable battle rewards.
for y in range(5,11):
 for x in range(6,15):put(247,x,y,3392)
autotile(247,3392)
add(ring,'Return to Handshake Hall',10,13,[transfer(245,15,6)],'!Door1',0)
recover=[C(314,0,0)]
battle=[C(301,0,61,True,True),C(601)]+nest([on(187)]+recover+say('Practice victory recorded. HP and MP restored. This echo grants no loot or repeat EXP.'))+[C(602)]+nest(recover+say('Practice escaped. HP and MP restored. The trial remains available.'))+[C(603)]+nest(recover+say('Practice stopped safely. HP and MP restored. Try again when ready.'))+[C(604)]
add(ring,'Blue instructor - training echo',10,4,say('A single training echo tests ordinary battle decisions. You may escape, and defeat is safe. The dojo restores your party after every attempt. Victory records this trial once.')+choice([('Begin practice',battle),('Not now',[])]),'ninja1',5)
add(ring,'Ring instruction tablet',4,11,say('The echo uses normal attacks and Blue Crosscut. Guard, healing and support skills work normally. No gear is removed and no party members are replaced. Your first-trial reward comes from the relay, not repeated practice.'))
# Complete medical tile stamps from the existing atlas: two four-by-three recovery couches.
def b(col,row):return (128 if col>=8 else 0)+row*8+(col%8)
for target,sourceCol in[(4,0),(15,4)]:
 for dy in range(3):
  for dx in range(4):put(248,target+dx,4+dy,b(sourceCol+dx,dy),2)
add(ward,'Return to Handshake Hall',11,12,[transfer(245,10,4)],'!Door1',0)
completeCare=[on(188)]+say('Care trial passed. The apprentice accepts the help. No labour contract, no involuntary upgrades, and no invoice for having a nervous system.')
plan=choice([('Ask for consent',choice([('Disconnect the hostile link',choice([('Apply the agreed patch',completeCare),('Enable wellness ads',say('The apprentice declines. Re-read the care protocol; the trial can be retried.')),('Stop for now',[])])),('Overclock the patient',say('The apprentice declines. Speed is not consent. Try again.')),('Stop for now',[])])),('Install without asking',say('The apprentice refuses. Consent comes first; the trial can be retried.')),('Stop for now',[])])
care=say('An apprentice has returned from an infiltration with a burned-out implant interface. They consent to basic aid, not another proprietary replacement. Offer a Green Herb, or follow their agreed care protocol.')+choice([('Give 1 Green Herb',branch('$gameParty.hasItem($dataItems[170])',[C(126,170,1,0,1)]+completeCare,say('No Green Herb carried. The sealed supply cabinet has one. The care terminal also offers an agreed patch sequence.'))),('Follow consent protocol',plan),('Leave for now',[])])
add(ward,'Care instructor - injured apprentice',11,7,branch('$gameSwitches.value(188)',say('The apprentice is recovering. Your care credential is recorded; no further supplies are needed.'),care),'ninja1',3)
add(ward,'Agreed care protocol',8,9,say('AGREED PROTOCOL: Ask for consent. Disconnect the hostile link. Apply the agreed patch. The apprentice may decline at any point. Neither treatment path unlocks a party member or alters your characters.'))
cache=add(ward,'Sealed Green Herb supply',17,10,branch('$gameSelfSwitches.value([248,4,"A"])',say('The supply cabinet is empty.'),branch('$gameParty.numItems($dataItems[170])<$gameParty.maxItems($dataItems[170])',[C(126,170,0,0,1),C(123,'A',0)]+say('Recovered 1 Green Herb for the care trial.'),say('Your Green Herb inventory is full. The sealed supply remains available.'))),'!SF_Chest',0)
assert cache['id']==4
# Native passage plus no-alarm reachability: all objectives have a usable approach.
landings={245:(10,12),246:(5,12),247:(10,12),248:(11,11)}
for n,m in maps.items():
 reachable=flood(m,landings[n]);assert len(reachable)>20
 for e in m['events'][1:]:
  if e['name']=='Visible noise alarm':continue
  assert any((e['x']+dx,e['y']+dy)in reachable for dx,dy in[(0,1),(-1,0),(1,0),(0,-1)]),(n,e['name'])
# Validate safe graph separately, treating alarm cells as blocked.
seen={landings[246]};q=deque(seen)
while q:
 x,y=q.popleft()
 for dx,dy in[(0,1),(-1,0),(1,0),(0,-1)]:
  p=x+dx,y+dy
  if p in safe and p not in seen:seen.add(p);q.append(p)
assert any((goal['x']+dx,goal['y']+dy)in seen for dx,dy in[(0,1),(-1,0),(1,0),(0,-1)])
for n,m in maps.items():D[f'Map{n:03}']=m
for n,d in D.items():Path('data/'+n+'.json').write_text(json.dumps(d,ensure_ascii=False,separators=(',',':')),encoding='utf-8')
(OUT/'manifest.json').write_text(json.dumps(dict(maps=list(maps),landings=landings,access=dict(cafe=[8,1],matrix=[9,5],requiresActor=7,switch=185),switches=dict(stealth=186,combat=187,care=188,reward=189,armed=190),stealth=dict(alarms=alarms,start=start['id'],finish=goal['id'],safeCells=sorted(safe)),troop=61,enemy=152,reward=dict(armor=68,item=179,exp=200,icon=2104),care=dict(instructor=2,protocol=3,cache=4)),indent=2),encoding='utf-8')
print('Created four interconnected dojo maps and three native trials.')
