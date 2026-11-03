"""Stage six authored, non-combat dungeon floors and three native MV quests.

Uses a separate snapshot of the completed world expansion. Never reruns or
replaces the earlier world build, and does not publish files automatically.
"""
import copy, json, math, re, textwrap, zipfile
from collections import deque
from pathlib import Path
ROOT=Path(__file__).resolve().parents[2]; HERE=Path(__file__).resolve().parent
STAGE=HERE/'staged';STAGE.mkdir(exist_ok=True)
BACKUP=HERE/'before-dungeons.zip'
if not BACKUP.exists():
    with zipfile.ZipFile(BACKUP,'w',zipfile.ZIP_DEFLATED) as z:
        for p in sorted((ROOT/'data').glob('*.json')):z.write(p,p.name)
with zipfile.ZipFile(BACKUP) as z:original={n:json.loads(z.read(n).decode('utf-8-sig')) for n in z.namelist()}
maps={int(n[3:6]):copy.deepcopy(v) for n,v in original.items() if re.fullmatch(r'Map\d{3}.json',n)}
infos=copy.deepcopy(original['MapInfos.json']); system=copy.deepcopy(original['System.json'])
items=copy.deepcopy(original['Items.json']); commons=copy.deepcopy(original['CommonEvents.json']);tilesets=copy.deepcopy(original['Tilesets.json'])
# Reuse existing medical art and its exact engine passage flags in the ice set.
assert not tilesets[18]['name'] and all(m['tilesetId']!=18 for m in maps.values()), 'Tileset 18 is already used.'
frozen=copy.deepcopy(tilesets[4]);frozen.update(id=18,name='Frozen Service Complex')
frozen['tilesetNames'][7]=tilesets[12]['tilesetNames'][5]
frozen['flags'][512:768]=tilesets[12]['flags'][0:256]
tilesets[18]=frozen
changed=set(); refs={}; routes=[]; masks={}; reserved={}
core=(ROOT/'js/rpg_core.js').read_text()
FLOOR=json.loads(re.search(r'Tilemap.FLOOR_AUTOTILE_TABLE = (\[.*?\]);',core,re.S)[1])
def C(code,*parameters,indent=0):return dict(code=code,indent=indent,parameters=list(parameters))
def say(text):
    lines=sum([textwrap.wrap(p,46) or [''] for p in text.split('\n')],[]);out=[]
    for i in range(0,len(lines),4):out += [C(101,'',0,0,2)]+[C(401,s) for s in lines[i:i+4]]
    return out
def nested(commands):return [dict(c,indent=c['indent']+1) for c in commands]
def branch(condition,yes,no=None):
    return [C(111,*condition)]+nested(yes)+([C(411)]+nested(no) if no is not None else [])+[C(412)]
def choice(entries):
    out=[C(102,[s for s,_ in entries],len(entries)-1,0,2,0)]
    for i,(s,cmds) in enumerate(entries):out += [C(402,i,s)]+nested(cmds)+[C(0,indent=1)]
    return out+[C(404)]
def on(s):return C(121,s,s,0)
def page(commands,sprite='!SF_Switch1',index=0,switch=None,priority=1):
    p=dict(conditions=dict(actorId=1,actorValid=False,itemId=1,itemValid=False,selfSwitchCh='A',selfSwitchValid=False,switch1Id=switch or 1,switch1Valid=bool(switch),switch2Id=1,switch2Valid=False,variableId=1,variableValid=False,variableValue=0),directionFix=True,image=dict(characterIndex=index,characterName=sprite,direction=2,pattern=1,tileId=0),list=commands+[C(0)],moveFrequency=3,moveRoute=dict(list=[C(0)],repeat=True,skippable=True,wait=False),moveSpeed=3,moveType=0,priorityType=priority,stepAnime=False,through=False,trigger=0,walkAnime=True)
    return p
def put(mid,x,y,t,z=0):
    m=maps[mid];m['data'][(z*m['height']+y)*m['width']+x]=t;changed.add(mid)
def box(mid,x,y,w,h,t,z=0):
    for yy in range(y,y+h):
        for xx in range(x,x+w):put(mid,xx,yy,t,z)
def autotile(mid,base,z=0):
    m=maps[mid];w,h=m['width'],m['height'];off=z*w*h
    def same(x,y):return 0<=x<w and 0<=y<h and base<=m['data'][off+y*w+x]<base+48
    for y in range(h):
        for x in range(w):
            if not same(x,y):continue
            l,r,u,d=same(x-1,y),same(x+1,y),same(x,y-1),same(x,y+1)
            q=[([2,4] if same(x-1,y-1) else [2,0]) if l and u else ([0,4] if u else [2,2] if l else [0,2]),([1,4] if same(x+1,y-1) else [3,0]) if r and u else ([3,4] if u else [1,2] if r else [3,2]),([2,3] if same(x-1,y+1) else [2,1]) if l and d else ([0,3] if d else [2,5] if l else [0,5]),([1,3] if same(x+1,y+1) else [3,1]) if r and d else ([3,3] if d else [1,5] if r else [3,5])]
            put(mid,x,y,base+FLOOR.index(q),z)
def newmap(mid,name,parent,w,h,ts):
    m=copy.deepcopy(maps[109]);m.update(width=w,height=h,tilesetId=ts,displayName=name,data=[0]*(w*h*6),events=[None],encounterList=[],encounterStep=30,note='Dungeon expansion: exploration and quest puzzles; no encounters.',autoplayBgm=False,autoplayBgs=False,parallaxName='',parallaxShow=False,scrollType=0)
    maps[mid]=m;masks[mid]=set();changed.add(mid)
    while len(infos)<=mid:infos.append(None)
    infos[mid]=dict(id=mid,expanded=False,name=name,order=mid,parentId=parent,scrollX=0,scrollY=0)
def room(mid,x,y,w,h):masks[mid].update((xx,yy) for yy in range(y,y+h) for xx in range(x,x+w))
def oval(mid,cx,cy,rx,ry):
    masks[mid].update((x,y) for y in range(cy-ry,cy+ry+1) for x in range(cx-rx,cx+rx+1) if ((x-cx)/rx)**2+((y-cy)/ry)**2<=1)
def corridor(mid,points,width=3):
    r=width//2
    for (ax,ay),(bx,by) in zip(points,points[1:]):
        assert ax==bx or ay==by
        room(mid,min(ax,bx)-r,min(ay,by)-r,abs(ax-bx)+width,abs(ay-by)+width)
def surface(mid,floor,wall,ceiling):
    m=maps[mid];w,h=m['width'],m['height'];walk=masks[mid];walls=set()
    for x,y in walk:
        assert 1<x<w-2 and 1<y<h-2
        put(mid,x,y,floor)
        for dx,dy in [(0,1),(-1,0),(1,0),(0,-1)]:
            p=x+dx,y+dy
            if p not in walk:walls.add(p)
    for x,y in walls:
        shape=(1 if (x-1,y) not in walls else 0)+(2 if (x,y-1) not in walls else 0)+(4 if (x+1,y) not in walls else 0)+(8 if (x,y+1) not in walls else 0)
        put(mid,x,y,wall+shape)
    for x,y in walls:
        p=x,y-1
        if p not in walk and p not in walls and y>0 and not any((p[0]+dx,p[1]+dy) in walk for dx,dy in [(0,1),(-1,0),(1,0),(0,-1)]):put(mid,*p,ceiling)
    autotile(mid,floor);autotile(mid,ceiling)
DIRS=[(0,1,2),(-1,0,4),(1,0,6),(0,-1,8)]
def passable(mid,x,y,d):
    m=maps[mid];w,h=m['width'],m['height']
    if not(0<=x<w and 0<=y<h):return False
    for z in [3,2,1,0]:
        f=tilesets[m['tilesetId']]['flags'][m['data'][(z*h+y)*w+x]]
        if f&16:continue
        return not (f&(1<<(d//2-1)))
    return False
def flood(mid,seed=None,extra=None):
    m=maps[mid];blocked={(e['x'],e['y']) for e in m['events'] if e and any(p['priorityType']==1 for p in e['pages'])}
    if extra:blocked.add(extra)
    unseen={(x,y) for y in range(m['height']) for x in range(m['width']) if any(passable(mid,x,y,d) for _,_,d in DIRS) and (x,y) not in blocked};groups=[]
    while unseen:
        start=seed if seed in unseen else min(unseen);q=deque([start]);seen={start};unseen.remove(start)
        while q:
            x,y=q.popleft()
            for dx,dy,d in DIRS:
                n=x+dx,y+dy
                if n in unseen and passable(mid,x,y,d) and passable(mid,*n,10-d):unseen.remove(n);seen.add(n);q.append(n)
        if seed is not None:return seen
        groups.append(seen)
    return max(groups,key=len) if groups else set()
def place(mid,x,y,solid=True):
    m=maps[mid];area=flood(mid);occupied={(e['x'],e['y']) for e in m['events'] if e}|reserved.get(mid,set())
    for p in sorted(area-occupied,key=lambda p:(abs(p[0]-x)+abs(p[1]-y),p[1],p[0])):
        if not solid or len(flood(mid,extra=p))==len(area)-1:return p
    raise ValueError(f'No safe placement in {mid}')
def event(mid,key,name,x,y,commands,sprite='!SF_Switch1',index=0,priority=1):
    m=maps[mid];xy=place(mid,x,y,priority==1);eid=len(m['events']);changed.add(mid)
    e=dict(id=eid,name=name,note='Dungeon expansion: '+key,x=xy[0],y=xy[1],pages=[page(commands,sprite,index,priority=priority)])
    m['events'].append(e);refs[key]=[mid,eid];return e
def extra_page(e,commands,switch):
    old=e['pages'][0];e['pages'].append(page(commands,old['image']['characterName'],old['image']['characterIndex'],switch,old['priorityType']))
def all_on(ids,yes,no):
    for s in reversed(ids):yes=branch([0,s,0],yes,no)
    return yes
def stairs(a,axy,b,bxy,key,label,requirements=None):
    ea=event(a,key+'_in',label,*axy,[],'!SF_Switch1')
    eb=event(b,key+'_out','Return passage',*bxy,[],'!SF_Switch1')
    da=place(a,ea['x'],ea['y']+1,False);reserved.setdefault(a,set()).add(da)
    db=place(b,eb['x'],eb['y']+1,False);reserved.setdefault(b,set()).add(db)
    go=say(label)+choice([('Go through',[C(201,0,b,*db,2,0)]),('Stay',[])])
    if requirements:go=all_on(requirements,go,say('Access is not ready. Check Dungeon Field Notes for the next objective.'))
    ea['pages'][0]['list']=go+[C(0)]
    eb['pages'][0]['list']=say('Return to '+infos[a]['name'])+choice([('Return',[C(201,0,a,*da,2,0)]),('Stay',[])])+[C(0)]
    routes.extend([[a,ea['id'],b,*db,requirements or []],[b,eb['id'],a,*da,[]]])
def cache(mid,key,x,y,amount,text):
    e=event(mid,key,'Salvage cache',x,y,say(text+f'\nRecovered {amount} credits.')+[C(125,0,0,amount),C(123,'A',0)],'!SF_Chest')
    p=page(say('Empty. Someone has already requisitioned this requisition.'),'!SF_Chest');p['conditions']['selfSwitchValid']=True;p['image']['direction']=8;e['pages'].append(p)
def objective(mid,key,name,xy,active,done,commands,after,sprite='!SF_Switch1',index=0):
    e=event(mid,key,name,*xy,say('The equipment is in standby. Speak to the local coordinator before changing anything.'),sprite,index)
    extra_page(e,commands,active);extra_page(e,say(after),done);return e
def notes_item():return branch([8,151],[],[C(126,151,0,0,1)]+say('Received Dungeon Field Notes. Use it from Key Items to check your objectives.'))
def giver(mid,key,name,xy,active,evidence,complete,reward,hook,reminder,ending,index=4,existing=None):
    before=say(hook)+choice([('Take the job',[on(active)]+notes_item()+say(reminder)),('Not now',say('The job will still be here. So will the consequences.'))])
    during=branch([0,evidence,0],say('You have what we need.')+choice([('Finish the job',ending+[C(125,0,0,reward),on(complete)]+say(f'Quest complete. Received {reward} credits.')),('Not yet',say('Keep the records safe.'))]),say(reminder))
    if existing:
        e=next(e for e in maps[mid]['events'] if e and e['name']==existing);refs[key]=[mid,e['id']];e['note']='Dungeon expansion: '+key;e['pages']=[page(before,'SF_People1',index)];changed.add(mid)
    else:e=event(mid,key,name,*xy,before,'SF_People1',index)
    extra_page(e,during,active);extra_page(e,ending+say('Your payment has been settled. No repeat claims, even if your spleen signs separately.'),complete)

# Six original layouts: a utility loop, records vault, ice caverns, thaw chambers,
# switchback mine, and bent archive gallery. No map is a renamed template copy.
newmap(110,'Armatek Underworks - Meter Galleries',103,38,28,9)
for r in [(3,19,10,6),(3,4,10,9),(23,4,11,9),(23,18,11,7),(16,11,5,7)]:room(110,*r)
corridor(110,[(8,22),(8,8),(28,8),(28,22),(8,22)]);corridor(110,[(18,8),(18,22)])
surface(110,3296,6272,5888)
newmap(111,'Armatek Underworks - Organ Liens Registry',110,32,24,9)
room(111,3,4,26,16);masks[111]-={(x,y) for x in range(12,20) for y in range(9,14)}
surface(111,2912,6320,5936)
newmap(112,'Ting Ting - Condensation Catacombs',104,36,32,4)
for r in [(7,25,4,3),(7,9,4,5),(26,8,6,4),(26,24,6,4),(17,17,3,3)]:oval(112,*r)
corridor(112,[(7,25),(7,9),(26,9),(26,24),(7,24)])
corridor(112,[(26,17),(17,17)])
surface(112,3248,6416,6032)
newmap(113,'Ting Ting - Suspended Benefits Ward',112,30,26,18)
oval(113,15,15,10,7);room(113,3,4,7,7);room(113,21,4,6,7)
corridor(113,[(6,8),(6,17),(23,17),(23,8)])
masks[113]-={(x,y) for x in range(14,16) for y in range(10,16)}
surface(113,4112,6416,6032)
newmap(114,'Dorlund - The Unpaid Shift',60,44,32,4)
for r in [(3,22,10,7),(3,3,10,8),(15,15,10,9),(28,3,12,9),(25,26,7,3)]:room(114,*r)
corridor(114,[(8,25),(8,8),(19,8),(19,20),(34,20),(34,7)])
corridor(114,[(10,25),(34,25),(34,20)]);corridor(114,[(28,25),(28,27)])
surface(114,2912,6368,5984)
box(114,25,7,3,8,3680);autotile(114,3680)
newmap(115,'Dorlund - Payroll Ossuary',114,34,28,4)
for r in [(3,20,11,5),(8,4,21,9),(22,13,7,9)]:room(115,*r)
corridor(115,[(11,22),(11,8),(25,8),(25,19)])
surface(115,3200,6368,5984)

# Machinery and geological landmarks use existing sheets, on supported ground.
for mid in [110,111]:
    for x,y in ([(4,5),(10,5),(24,5),(31,5)] if mid==110 else [(5,5),(9,5),(21,5),(26,5)]):
        put(mid,x,y,32,2);put(mid,x,y+1,33,2)
    for x,y in ([(24,19),(25,19),(31,23)] if mid==110 else [(5,14),(6,14),(25,16)]):put(mid,x,y,109,2)
for mid,coords in [(112,[(4,8),(29,7),(29,24),(15,16)]),(113,[(4,5),(24,5),(12,16),(21,19)])]:
    for x,y in coords:
        if (x,y) in masks[mid] and (x,y+1) in masks[mid]:put(mid,x,y,67,2);put(mid,x,y+1,75,2)
for mid,coords in [(114,[(4,5),(11,23),(16,17),(37,5),(28,27)]),(115,[(9,5),(27,6),(24,18),(4,21)])]:
    for x,y in coords:put(mid,x,y,56,2)
for mid,xy in [(110,(17,15)),(111,(22,17)),(112,(18,18)),(113,(18,19)),(114,(21,21)),(115,(25,19))]:
    put(mid,*xy,49 if mid>=112 else 101,2)
def prop(mid,x,y,rows):
    for dy,row in enumerate(rows):
        for dx,t in enumerate(row):
            assert (x+dx,y+dy) in masks[mid], f'Unsupported prop: {mid}/{x+dx},{y+dy}'
            put(mid,x+dx,y+dy,t,2)
pod=[[264,265,266],[272,273,274],[288,289,290],[304,305,306]]
for mid,x,y in [(110,4,9),(110,30,8),(111,4,9),(111,24,10)]:prop(mid,x,y,pod)
for mid,x,y in [(110,24,20),(111,9,5),(111,20,15)]:prop(mid,x,y,[[57,58],[65,66]])
for x,y in [(3,4),(22,4),(6,13),(19,13)]:
    prop(113,x,y,[[544,545,546],[560,561,562],[576,577,578]])
for x,y in [(10,18),(18,18),(7,8)]:prop(113,x,y,[[547]])
for mid,coords in [(112,[(6,11),(9,8),(25,5),(30,9),(24,26),(17,17)]),(114,[(4,9),(10,4),(17,16),(22,21),(31,4),(38,9),(27,28)]),(115,[(9,11),(27,11),(4,23),(27,20)])]:
    for j,(x,y) in enumerate(coords):
        if (x,y) in masks[mid]:put(mid,x,y,[51,53,55][j%3] if mid==112 else [48,49,54][j%3],2)
for mid,x,y in [(114,29,4),(115,11,5),(115,19,5),(115,23,15)]:
    prop(mid,x,y,[[520,521,522,523],[528,529,530,531]])

# Dungeon connections; every floor has an unconditional route back out.
stairs(103,(18,5),110,(7,23),'rivet_entry','Armatek Underworks service hatch')
stairs(110,(30,21),111,(5,17),'rivet_depth','Organ Liens Registry',[101,102,103])
stairs(104,(8,4),112,(7,26),'thaw_entry','Condensation Catacombs maintenance stairs')
stairs(112,(26,10),113,(9,20),'thaw_depth','Suspended Benefits Ward',[111,114])
stairs(60,(43,24),114,(6,26),'mine_entry','Unpaid Shift survey shaft')
stairs(114,(35,8),115,(6,22),'mine_depth','Payroll Ossuary archive lift',[121,124])

# Quest 1: corporate debt secured against tenants' actual organs.
giver(103,'lien_giver','Forewoman Latch - tenant advocate',(9,11),101,104,106,260,
      'Armatek put a lien on our plumbing. Then on our spleens. The Underworks hatch is by the northern service lane. Recover the organ-debt ledger without shutting off the drinking water. I can pay 260 credits.',
      'In the Underworks, bypass the tenant meter in the west gallery and isolate billing in the east. The registry lift is southeast. Recover its ledger, then return to me in Rivet Commons.',
      branch([0,105,0],say('The ledger is public. Armatek has reclassified the scandal as an organ-ic community initiative. Nobody is buying it.'),say('The debt warrants are void. Families keep their medical details; Armatek gets a strongly worded invoice.')),4)
objective(110,'meter','Tenant billing manifold',(6,7),101,102,
    say('Two pipes: DRINKING WATER and TENANT METER. The meter is shaped like a clenched anus.')+choice([
        ('Bypass the tenant meter',say('Water stays on. The meter issues a wet, defeated fart. Billing bypass engaged.')+[on(102)]),
        ('Close the drinking-water line',say('The warning tag says this shuts off the village. You leave it alone. Find the billing bypass.')),
        ('Leave it alone',[])]),
    'Tenant meter bypassed. Drinking-water pressure is steady.')
objective(110,'billing','Invoice relay',(29,7),101,103,
    say('Relay modes: HOLD INVOICES or LIQUIDATE TENANTS. Someone has underlined liquidate twice.')+choice([
        ('Hold invoices',say('Invoice generation stops. The printer tries to charge a cancellation fee, then loses power.')+[on(103)]),
        ('Inspect liquidation mode',say('A handwritten note: NO. THAT WORD IS LITERAL. You do not enable it.')),
        ('Leave',[])]),'Billing relay isolated. The ledger can now be copied safely.')
objective(111,'ledger','Organ-debt ledger console',(25,7),101,104,
    say('A.S.P. audit: tenants are listed as depreciating biological fixtures. Your own implant appears in a blank account. What should Latch receive?')+choice([
        ('Publish the ledger',say('A public copy preserves the evidence of organ-backed debt. Latch can organize a challenge.')+[on(104),on(105)]),
        ('Void warrants; protect records',say('Collection warrants are voided. An encrypted copy goes to the affected families through Latch.')+[on(104)]),
        ('Decide later',[])]),'Evidence secured. Return to Forewoman Latch in Rivet Commons.')
event(110,'rivet_clue','Maintenance grievance',16,13,say('SHIFT NOTE: Keep water flowing. Bypass the meter, then isolate the invoice relay. The registry needs both safety lamps green.\nIf the pipes start asking for next of kin, do not provide yours.'))
event(111,'rivet_lore','Future enforcement memo',7,6,say('REGIONAL ASSESSOR: relocation pending. Enforcement chassis remains off-site.\nZack scribbled underneath: If they repossess one more rib, I am repossessing their fucking building.'))
cache(110,'rivet_cache',30,23,45,'Maintenance coffee fund. The coffee is listed as a non-sentient expense.')
cache(111,'registry_cache',25,17,65,'Unclaimed refund bond. Apparently someone successfully appealed having kidneys.')

# Quest 2: a sequential vent/drain/heat puzzle with explicit retryable clues.
giver(104,'thaw_giver','Enid - thermal steward',(8,6),111,115,116,300,
      'Vitalix froze our night crew for exceeding their heating allowance. The stairs behind the thaw house lead to the old plant. Vent it, drain it, restore heat, and get the crew out. Three hundred credits, and actual gratitude.',
      'Use the maintenance stairs here. In the catacombs: vent the northwest pressure stack, drain coolant southeast, then restart the northeast heat exchanger. The ward opens after heat returns. Bring the crew home.',
      branch([0,117,0],say('The crew is home. Their names are protected; Vitalix cannot use our rescue list as a fresh debt register.'),say('The crew is home. Their signed complaint is public. Vitalix calls this an unauthorized thaw.')),2)
objective(112,'vent','Pressure stack',(6,6),111,112,
    say('STEP 1: VENT. The inspection sticker has frozen into the shape of a middle finger.')+choice([
        ('Vent the pressure stack',say('Pressure bleeds into the empty shaft. The northwest indicator goes green.')+[on(112)]),('Leave',[])]),
    'Pressure is vented. Drain coolant at the southeast station next.')
objective(112,'drain','Coolant sump',(28,25),111,113,
    branch([0,112,0],say('Pressure is safe. STEP 2: DRAIN.')+choice([('Drain the coolant',say('The old coolant drains into a sealed tank. Something inside it says goodbye.')+[on(113)]),('Leave',[])]),say('Pressure is still high. The valve refuses to open. Vent the northwest stack first.')),
    'Coolant drained. Restart the northeast heat exchanger.')
objective(112,'heater','Heat exchanger',(28,6),111,114,
    all_on([112,113],say('Pressure: safe. Coolant: drained. STEP 3: HEAT.')+choice([('Restart the exchanger',say('Warm air reaches the ward. The access latch releases. The thermostat apologizes for its conduct.')+[on(114)]),('Leave',[])]),say('Safety interlock: VENT, then DRAIN, then HEAT. The instruction plate is mercifully literal.')),
    'Heat restored. The nearby ward entrance is open.')
objective(113,'rescue','Trapped night-shift technician',(23,7),111,115,
    all_on([114],say('We were frozen for unpaid heating bills. My union rep is a popsicle. The way back is warm now. How do we document this?')+choice([
        ('Protect the crew identities',say('You record the abuse without publishing patient names. The crew heads back through the cleared passage.')+[on(115),on(117)]),
        ('File their signed complaint',say('The crew signs a public complaint. They leave through the warmed service route, arguing about the spelling of bastards.')+[on(115)]),
        ('Come back shortly',[])]),say('Restore heat at the exchanger before opening the ward.')),
    'The ward has been evacuated. Report to Enid in the thaw house.','SF_People2',4)
e=maps[113]['events'][refs['rescue'][1]];e['pages'][-1]['image']['characterName']='';e['pages'][-1]['priorityType']=0
e=event(104,'rescued_worker','Returned night-shift technician',7,6,[],'',priority=0)
e['pages'].append(page(say('Enid got us blankets. Vitalix sent an invoice for accelerated defrosting. We are using it to light the stove.'),'SF_People2',4,switch=115))
event(112,'thaw_clue','Service sequence plate',8,22,say('PLANT RESTART: 1. Northwest vent. 2. Southeast sump. 3. Northeast heat exchanger.\nAn intern added: The order matters. I used to have eyebrows.'))
event(113,'thaw_lore','Empty executive capsule',6,6,say('EXECUTIVE CRYOSUITE - RESERVED. The occupant has not arrived. A note requests a freezer large enough for both the executive and his golden parachute.'))
cache(112,'ice_cache',17,18,55,'Emergency sock allowance. Someone has preserved it in three layers of paperwork.')
cache(113,'ward_cache',19,19,70,'Personal effects locker marked TAKE THIS, NOT MY TEETH.')

# Quest 3: investigate a missing crew and expose a falsified timeline.
giver(106,'shift_giver','Shop steward Mags',(17,5),121,125,127,360,
      'Armatek deleted two missing crews from payroll. Their families still get billed for the helmets. Enter the Unpaid Shift shaft in the old extraction works beyond the service hall. Bring back the real roster. Union fund pays 360 credits.',
      'From Dorlund residential concourse take Haunted Shift access, then the old extraction works. The Unpaid Shift shaft is on the east side. Find its air log and timecards; use them at the northeast archive interlock. Bring the roster back here.',
      branch([0,126,0],say('The memorial has their names again. They were workers, not an equipment failure. Their families can finally point to something the company cannot quietly rename.'),say('The families have the records privately. We preserved their choice, and the evidence. Armatek does not get to decide how they mourn.')),3,existing='Shop steward Mags')
objective(114,'airlog','Air-monitor recorder',(6,6),121,122,
    say('02:10 - GAS ALARM. Evacuation requested.\n02:14 - Supervisor overrides evacuation.\nThe alarm happened before the missing clock-outs.')+[on(122)],'Air log copied: gas alarm at 02:10, override at 02:14.')
objective(114,'timecards','Timecard punch station',(20,18),121,123,
    say('02:17 - Crew still underground.\n02:30 - All workers marked voluntarily absent.\n03:00 - Payroll records deleted. Nobody clocked out.')+[on(123)],'Timecards copied: payroll deletion was last, not first.')
objective(114,'interlock','Archive chronology interlock',(35,6),121,124,
    all_on([122,123],say('The interlock accepts the first event in the actual timeline. Corporate training strongly recommends lying.')+choice([
        ('Gas alarm at 02:10',say('Chronology verified. The archive lift is unlocked. Corporate training has been ignored.')+[on(124)]),
        ('Voluntary absence at 02:30',say('That entry contradicts the air log. The interlock stays locked. Check the evidence and try again.')),
        ('Payroll deletion at 03:00',say('That was last. The interlock stays locked. Nobody is harmed by this incorrect answer.')),
        ('Review later',[])]),say('Two records are required: northwest air log and central timecards. The Field Notes track what you have found.')),
    'Correct timeline verified. Use the nearby archive lift.')
objective(115,'roster','Erased crew roster',(25,7),121,125,
    say('The erased roster survives on paper. Twelve names, next-of-kin addresses, and a note: NO ONE VOLUNTEERED TO DISAPPEAR. How should Mags use it?')+choice([
        ('Restore the public memorial',say('You preserve a public memorial copy and the evidence of the cover-up.')+[on(125),on(126)]),
        ('Give records to families privately',say('You seal the family copies. The union retains the evidence without publishing names.')+[on(125)]),
        ('Decide later',[])]),'Roster recovered. Return to Mags at the Last Shift Canteen.')
event(114,'mine_clue','Surveyor map scrap',7,23,say('Northwest: air monitor. Central room: timecards. Northeast: archive interlock.\nThe archive wants the first event, not the company-approved version.'))
event(115,'mine_lore','Unsent auditor memo',11,7,say('A.S.P. AUDIT FRAGMENT: zero employees implies zero casualties.\nThe filing clerk wrote: You cannot subtract people from a fucking cave-in.\nThe review board never replied.'))
cache(114,'mine_cache',29,27,80,'A hazard bonus sealed in a crate nobody was paid to open.')
cache(115,'archive_cache',25,19,90,'Returned helmet deposits. The names on the envelope have been copied for the union.')
event(106,'memorial','Union memorial board',15,6,
      branch([0,127,0],branch([0,126,0],say('THE UNPAID SHIFT\nTwelve workers. Twelve families. No voluntary absences.\nNames restored by the union; the original roster is held here.'),say('The union keeps the recovered roster for the families. The board reads: THEIR NAMES ARE THEIRS TO SHARE.')),say('THE UNPAID SHIFT\nThe spaces for the missing workers remain blank. Mags is collecting evidence.')))

SWITCHES={101:'Lien - Accepted',102:'Lien - Meter bypassed',103:'Lien - Billing isolated',104:'Lien - Ledger recovered',105:'Lien - Public disclosure',106:'Lien - Reward claimed',111:'Cold Storage - Accepted',112:'Cold Storage - Pressure vented',113:'Cold Storage - Coolant drained',114:'Cold Storage - Heat restored',115:'Cold Storage - Staff released',116:'Cold Storage - Reward claimed',117:'Cold Storage - Names protected',121:'Haunted Shift - Accepted',122:'Haunted Shift - Air log',123:'Haunted Shift - Timecards',124:'Haunted Shift - Archive unlocked',125:'Haunted Shift - Roster recovered',126:'Haunted Shift - Public memorial',127:'Haunted Shift - Reward claimed'}
while len(system['switches'])<=max(SWITCHES):system['switches'].append('')
for i,name in SWITCHES.items():
    assert not system['switches'][i],f'Switch collision: {i}'
    system['switches'][i]=name

# Working quest tracking with native MV key-item/common-event mechanics.
def tracker(title,active,complete,stages):
    progress=say('Not accepted. '+stages[0][1])
    accepted=say(stages[0][1])
    for switch,text in stages[1:]:accepted=branch([0,switch,0],say(text),accepted)
    return say(title)+branch([0,complete,0],say('COMPLETED. Reward claimed. You can revisit the dungeon; rewards and discoveries do not reset.'),branch([0,active,0],accepted,progress))
track1=tracker('A LIEN ON YOUR SPLEEN',101,106,[(0,'Speak to Forewoman Latch in Rivet Commons. Use the northern Underworks hatch. Bypass the west tenant meter and isolate the east billing relay.'),(102,'Meter bypassed. Isolate the east billing relay, then use the southeast registry lift.'),(103,'Billing isolated. If the west meter is also bypassed, use the southeast registry lift. Recover the ledger from the far console.'),(104,'Ledger recovered. Return to Forewoman Latch in Rivet Commons for 260 credits.')])
track2=tracker('COLD STORAGE, WARM BODIES',111,116,[(0,'Speak to Enid in the Municipal Thaw House. Take the maintenance stairs. Restart order: northwest VENT, southeast DRAIN, northeast HEAT.'),(112,'Pressure vented. Drain the southeast coolant sump.'),(113,'Coolant drained. Restart the northeast heat exchanger.'),(114,'Heat restored. Enter the northeast Suspended Benefits Ward and speak to the trapped technician.'),(115,'Crew released. Return to Enid in the thaw house for 300 credits.')])
track3=tracker('THE HAUNTED SHIFT',121,127,[(0,'Speak to Mags in Dorlund\'s Last Shift Canteen. Through residential service access and extraction works, enter the Unpaid Shift shaft. Find the northwest air log and central timecards.'),(122,'Air log recovered. Find the central timecards, then answer the northeast archive interlock. The alarm was at 02:10.'),(123,'Timecards recovered. Also collect the northwest air log. Use both records at the northeast interlock; identify which event happened first.'),(124,'Archive unlocked. Take the nearby lift into the Payroll Ossuary; copy the roster at the far console.'),(125,'Roster recovered. Return to Mags at the Last Shift Canteen for 360 credits.')])
assert len(commons)<=5 or not commons[5]
while len(commons)<=5:commons.append(None)
commons[5]=dict(id=5,name='Dungeon Field Notes',trigger=0,switchId=1,list=say('DUNGEON FIELD NOTES\nSelect a case to review its current objective.')+choice([('A Lien on Your Spleen',track1),('Cold Storage, Warm Bodies',track2),('The Haunted Shift',track3),('Close notebook',[])])+[C(0)])
assert len(items)<=151 or not items[151] or not items[151]['name']
while len(items)<=151:items.append(None)
items[151]=dict(id=151,name='Dungeon Field Notes',description='Review dungeon objectives, directions, and hints.\nReusable; select from Key Items outside battle.',iconIndex=190,itypeId=2,price=0,consumable=False,scope=8,occasion=2,speed=0,successRate=100,repeats=1,tpGain=0,hitType=0,animationId=0,note='',damage=dict(type=0,elementId=0,formula='0',variance=0,critical=False),effects=[dict(code=44,dataId=5,value1=0,value2=0)])
for mid in changed:(STAGE/f'Map{mid:03}.json').write_text(json.dumps(maps[mid],ensure_ascii=False,separators=(',',':'))+'\n',encoding='utf-8')
for name,obj in [('MapInfos',infos),('System',system),('Items',items),('CommonEvents',commons),('Tilesets',tilesets)]:
    (STAGE/f'{name}.json').write_text(json.dumps(obj,ensure_ascii=False,separators=(',',':'))+'\n',encoding='utf-8')
manifest=dict(changed=sorted(changed),newMaps=list(range(110,116)),events=refs,routes=routes,switches=SWITCHES,fieldNotesItem=151,fieldNotesCommonEvent=5,quests=[dict(key='lien',active=101,evidence=104,complete=106,reward=260),dict(key='thaw',active=111,evidence=115,complete=116,reward=300),dict(key='shift',active=121,evidence=125,complete=127,reward=360)])
(HERE/'manifest.json').write_text(json.dumps(manifest,indent=2)+'\n',encoding='utf-8')
print(f'Staged {len(changed)} maps, {len(refs)} authored events, three questlines, and Dungeon Field Notes. No battles or random encounters added.')

