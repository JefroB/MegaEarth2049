"""A05: native MV court investigation; independent authored rooms, no combat plugin."""
import json,copy,re,textwrap,zipfile
from collections import deque
from pathlib import Path
OUT=Path('tools/clown-court')
def load(n):return json.loads(Path('data/'+n+'.json').read_text(encoding='utf-8'))
D={n:load(n) for n in ['Map010','MapInfos','System','Items']};tiles=load('Tilesets')
with zipfile.ZipFile(OUT/'before.zip','x',zipfile.ZIP_DEFLATED) as z:
 for n in D:z.write('data/'+n+'.json')
assert len(D['MapInfos'])==241 and len(D['System']['switches'])==175
for n in range(241,244):assert not Path(f'data/Map{n:03}.json').exists()
D['System']['switches'] += ['Clown Court - summons filed','Clown Court - good graces verdict','Clown Court - mime testimony','Clown Court - predated billing ledger']
def C(code,*p):return dict(code=code,indent=0,parameters=list(p))
def nest(cs):return [dict(c,indent=c['indent']+1) for c in cs]
def say(s):
 lines=[]
 for t in s.split('\n'):lines+=textwrap.wrap(t,43)
 out=[]
 for k in range(0,len(lines),4):out += [C(101,'',0,0,2)]+[C(401,l) for l in lines[k:k+4]]
 return out
def branch(expr,yes,no=[]):return [C(111,12,expr)]+nest(yes)+([C(411)]+nest(no) if no else [])+[C(412)]
def choice(rows):
 out=[C(102,[n for n,_ in rows],len(rows)-1,0,2,0)]
 for k,(name,cs) in enumerate(rows):out += [C(402,k,name)]+nest(cs)+[dict(C(0),indent=1)]
 return out+[C(404)]
def on(n):return C(121,n,n,0)
def transfer(n,x,y):return C(201,0,n,x,y,2,0)
template=copy.deepcopy(load('Map107')['events'][2]['pages'][0])
def event(m,name,x,y,cs,sprite='clown',index=3,direction=2):
 e=dict(id=len(m['events']),name=name,note='A05 Clown Court',x=x,y=y,pages=[copy.deepcopy(template)]);p=e['pages'][0];p['image'].update(characterName=sprite,characterIndex=index,direction=direction,pattern=1,tileId=0);p.update(moveType=0,directionFix=True,walkAnime=True,stepAnime=False,trigger=0,priorityType=1,through=False);p['list']=cs+[C(0)];m['events'].append(e);return e
# Native passage checks include actual decoration tiles and normal-priority events.
def passable(m,x,y,d):
 if not(0<=x<m['width'] and 0<=y<m['height']):return False
 for z in [3,2,1,0]:
  t=m['data'][(z*m['height']+y)*m['width']+x];f=tiles[m['tilesetId']]['flags'][t]
  if f&16:continue
  return not(f & (1<<(d//2-1)))
 return False
def flood(m,start,extra=None):
 blocked={(e['x'],e['y']) for e in m['events'] if e and any(p['priorityType']==1 for p in e['pages'])}
 if extra:blocked.add(extra)
 seen={start};q=deque([start])
 while q:
  x,y=q.popleft()
  for dx,dy,d in [(0,1,2),(-1,0,4),(1,0,6),(0,-1,8)]:
   n=x+dx,y+dy
   if n not in seen and n not in blocked and passable(m,x,y,d) and passable(m,*n,10-d):seen.add(n);q.append(n)
 return seen
m=D['Map010'];occupied={(e['x'],e['y']) for e in m['events'] if e};area=max((flood(m,(x,y)) for y in range(m['height']) for x in range(m['width']) if (x,y) not in occupied and any(passable(m,x,y,d) for d in [2,4,6,8])),key=len)
spots=sorted(area-occupied,key=lambda p:abs(p[0]-5)+abs(p[1]-10));entry=next(p for p in spots if len(flood(m,next(iter(area-{p})),p))>=len(area)-1)
# Summons serves as a lasting introduction; voluntary court entry and exit are always explicit.
issue=branch('!$gameParty.hasItem($dataItems[138])',[C(126,138,0,0,1)])+[on(175)]
intro=say('BAILIFF HONK: You are under arrest for Insufficient Whimsy. The arrest is currently on paper. Our cells are full of confiscated confetti. Attend the court below when ready.')+issue
cs=branch('$gameSwitches.value(176)',say('The court recognizes you as sufficiently ridiculous. Your good graces are still on file.'),intro)+choice([('Enter underground court',[transfer(241,9,10)]),('Later',[])])
e=event(m,'Bailiff Honk - Clown Court summons',*entry,cs,index=3);entryid=e['id']
# Build three rooms using existing indoor art with different shape, floor, furnishings.
core=Path('js/rpg_core.js').read_text();FLOOR=json.loads(re.search(r'Tilemap.FLOOR_AUTOTILE_TABLE = (\[.*?\]);',core,re.S)[1]);maps={};walks={}
def newmap(n,name,w,h,walk,floor):
 m=copy.deepcopy(load('Map107'));m.update(width=w,height=h,displayName=name,tilesetId=6,data=[0]*(w*h*6),events=[None],encounterList=[],note='A05 optional Clown Court; investigation and dialogue.',autoplayBgm=False,autoplayBgs=False,parallaxName='',parallaxShow=False,scrollType=0);maps[n]=m;walks[n]=walk
 for x,y in walk:put(n,x,y,floor)
 walls=set()
 for x,y in walk:
  for dx,dy in [(0,1),(-1,0),(1,0),(0,-1)]:
   if (x+dx,y+dy) not in walk:walls.add((x+dx,y+dy))
 for x,y in walls:
  shape=sum(v for dx,dy,v in [(-1,0,1),(0,-1,2),(1,0,4),(0,1,8)] if (x+dx,y+dy) not in walls);put(n,x,y,6416+shape)
 for x,y in walls:
  if y>0 and (x,y-1) not in walls|walk:put(n,x,y-1,5936)
 autotile(n,floor);autotile(n,5936)
 D['MapInfos'].append(dict(id=n,expanded=False,name=name,order=n,parentId=10 if n==241 else 241,scrollX=0,scrollY=0));return m
def put(n,x,y,t,z=0):
 m=maps[n];m['data'][(z*m['height']+y)*m['width']+x]=t
source=Path('tools/dungeons/build_dungeons.py').read_text();ns={'maps':maps,'FLOOR':FLOOR,'put':put};exec(source[source.index('def autotile('):source.index('def newmap(')],ns);autotile=ns['autotile']
foyer=newmap(241,'Clown Court - Department of Whimsy',19,15,{(x,y) for y in range(4,12) for x in range(3,16)},3200)
records=newmap(242,'Clown Court - Pie Discovery Room',17,15,{(x,y) for y in range(3,12) for x in range(3,14)}-{(x,y) for x in [3,4] for y in [3,4]},3632)
court=newmap(243,'Clown Court - Chamber of Appeals',23,17,{(x,y) for y in range(3,14) for x in range(3,20)},2816)
# Foyer seating: wide central route; courtroom gallery leaves two aisles open.
for x,y in [(5,7),(13,7)]:put(241,x,y,145,2)
for x in [4,18]:
 for y in [7,10]:put(243,x,y,145,2)
for x in [6,8,14,16]:put(243,x,10,145,2)
# Red hearing runner and raised-looking bench; floor remains native walkable art.
for y in range(5,14):
 for x in [10,11,12]:put(243,x,y,4064)
autotile(243,4064)
for x,t in [(10,249),(11,250),(12,251)]:put(243,x,5,t,2)
for x in [6,10]:put(242,x,3,177 if x==6 else 176,2);put(242,x,4,185 if x==6 else 184,2)
# Exit / room links are action-button doors; no transfer landings coincide with them.
event(foyer,'Exit to Timbuc',9,11,[transfer(10,entry[0],entry[1]+1 if entry[1]+1<m['height'] else entry[1]-1)],'!Door1',0)
# Choose a verified reachable return square next to the bailiff, rather than guessing.
returnxy=next(p for p in [(entry[0],entry[1]+1),(entry[0]+1,entry[1]),(entry[0]-1,entry[1]),(entry[0],entry[1]-1)] if p in area and p not in occupied and p!=entry)
foyer['events'][1]['pages'][0]['list']=[transfer(10,*returnxy),C(0)]
event(foyer,'Door to evidence discovery',4,4,[transfer(242,8,10)],'!Door1',1)
event(foyer,'Door to hearing chamber',14,4,branch('$gameParty.hasItem($dataItems[138]) || $gameSwitches.value(176)',[transfer(243,11,12)],say('A summons is required. Speak to the filing clerk beside the central aisle.')),'!Door1',1)
event(foyer,'Filing clerk - court procedure',9,6,branch('$gameSwitches.value(176)',say('Verdict filed: in good graces. Legal standing: still ridiculous. Ask the usher in the hearing chamber for the local tip.'),say('The charge is Insufficient Whimsy. Evidence Discovery is the left door; the hearing is the right. Search the pie exhibit and the billing ledger, or ask the mime to testify. Sincere arguments are a procedural hazard.')+issue),index=3)
event(foyer,'Notice of legal fees',13,10,say('CLOWN COURT: Silence costs nothing. Honking is free. Your corporate insurer refuses the claim because having a face counts as a pre-existing condition.'),'!SF_Switch1',0)
event(records,'Return to filing hall',8,11,[transfer(241,4,5)],'!Door1',0)
event(records,'Mime Witness - contradictory allegations',5,7,branch('$gameSwitches.value(176)',say('The mime applauds silently. It is the first professional review you have ever enjoyed.'),say('The mime reenacts your supposed offence. In the reenactment, you are already inside an invisible box when the complaint arrives. They were there. A witness to a crime without a punchline.')+choice([('Invite the mime to testify',say('The mime nods. The clerk records the nod, notarizes the silence, and bills neither.')+[on(177)]),('Leave them rehearsing',[])])),index=4)
event(records,'Predated prosecution ledger',11,7,say('BILLING LEDGER: Case opened 09:00. Defendant committed alleged lack of whimsy at 09:15. Prosecution invoice paid by the Bureau of Mandatory Fun at 08:50. The court has been selling guilty verdicts in advance.')+[on(178)],'!SF_Switch1',0)
event(records,'Pie-Based Evidence exhibit',8,5,branch('$gameSwitches.value(176)',say('Exhibit returned to the communal dessert budget.'),branch('$gameParty.hasItem($dataItems[139])',say('You already have the pie. The receipt baked into it predates the alleged offence. Read the ledger or bring the mime before the hearing.'),say('Inside the banana-cream pie is a receipt for one prepaid guilty verdict. Acquired Pie-Based Evidence. Take it to the judge after investigating the ledger or witness.')+[C(126,139,0,0,1)])),'!SF_Chest',0)
event(records,'Discovery protocol poster',12,10,say('Either documentary proof or live testimony may support an objection. All physical evidence must contain cream. Do not eat the chain of custody.'),'!SF_Switch1',0)
event(court,'Court recess - return to hall',11,13,[transfer(241,14,5)],'!Door1',0)
reward=[C(126,139,1,0,1),C(125,0,0,250),on(176),on(175)]+say('JUDGE HONK: NOT GUILTY. More importantly: sufficiently ridiculous. The court returns 250 Credits from its prepaid-conviction fund. You are permanently in our good graces. Speak to the usher; clowns know where useful things are hidden.')
missing=say('The judge squints. That objection needs Pie-Based Evidence and corroboration from the ledger or mime. Recess granted. The Evidence Discovery room is across the hall; return when ready.')
paper=branch('$gameParty.hasItem($dataItems[139]) && $gameSwitches.value(178)',say('You juggle the receipt and invoice dates. REX: Your honour, the verdict is older than the crime. I move that causality be held in contempt. The judge honks at the accounting.')+reward,missing)
mime=branch('$gameParty.hasItem($dataItems[139]) && $gameSwitches.value(177)',say('You hand over the pie and call the mime. They trap the prosecutor in an invisible box, reenacting the timeline without a word. REX: The defence rests. Inside this imaginary box. The gallery loses its shit.')+reward,missing)
hearing=say('JUDGE HONK: Rex, charged with Insufficient Whimsy. How do you plead to being a miserable little economic unit?')+choice([('Juggle the invoice dates',paper),('Call the mime; mime innocence',mime),('Explain the facts sincerely',say('OBJECTION: Comprehensible! The judge stamps CONTEMPT OF COMEDY. No fine, but the hearing is adjourned. Investigate the pie evidence, then try an argument with a punchline.')),('Request a recess',say('Recess granted. Your right to leave is the only clause we did not outsource.'))])
event(court,'Judge Honk - trial and verdict',11,4,branch('$gameSwitches.value(176)',say('The acquittal stands. Repeated trials are a corporate revenue model. We have standards. Very low ones, but standards.'),branch('$gameParty.hasItem($dataItems[138])',hearing,say('File your summons with the clerk first.'))),index=0)
event(court,'Court usher - good graces clue',16,6,branch('$gameSwitches.value(176)',say('OFF THE RECORD: Experimental-engine blueprint? The engineer in Timbuc Cellar has it. Component A is at the construction site; B is with the malfunctioning drone; C is at the Armatek office. The mechanic on MegaEarth assembles them. Clowns read the filing cabinets.'),say('We sell laughter, not convictions. If someone prepaid your guilty verdict, check the pie exhibit and billing ledger. The mime saw more than they say.')),index=3)
# Authored finishing details recorded independently after the first visual review.
for key,rows in json.loads((OUT/'furnishing-notes.json').read_text(encoding='utf-8')).items():
 for name,x,y,index,dialogue in rows:event(maps[int(key)],name,x,y,say(dialogue),'!SF_Switch1' if 'placard' in name else 'clown',index)
# Make every interactive event accessible from its map landing, including solid props.
landings={241:(9,10),242:(8,10),243:(11,12)}
for n,room in maps.items():
 area2=flood(room,landings[n]);assert len(area2)>20
 for e in room['events'][1:]:assert any((e['x']+dx,e['y']+dy) in area2 for dx,dy in [(0,1),(-1,0),(1,0),(0,-1)]),(n,e['name'])
 D[f'Map{n:03}']=room
for n in [138,139]:D['Items'][n].update(consumable=False,occasion=3,scope=0)
D['Items'][138]['description']='Insufficient Whimsy. Meet Bailiff Honk in\nTimbuc, then investigate the underground court.'
D['Items'][139]['description']='A prepaid verdict receipt baked into a pie.\nSupport it with the ledger or mime testimony.'
for n,d in D.items():Path('data/'+n+'.json').write_text(json.dumps(d,ensure_ascii=False,separators=(',',':')),encoding='utf-8')
(OUT/'manifest.json').write_text(json.dumps(dict(entry=dict(map=10,event=entryid,position=entry,returnPosition=returnxy),maps=[241,242,243],landings=landings,switches=dict(started=175,verdict=176,mime=177,ledger=178),rewardCredits=250,paths=['pie + ledger / juggling causality','pie + mime / interpretive testimony'],storySource='docs/story/MegaEarth2049_GameStory.md Clown Court; docs/story/MegaEarth2049_Story.md side quests'),indent=2),encoding='utf-8')
print('Created three connected court rooms; native reachability passed.')
