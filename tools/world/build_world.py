"""Stage the authored world expansion without changing the live game.

Reads an immutable pre-expansion snapshot so staging is reproducible. Publishing
is a separate step, after validate_world.py succeeds and previews are inspected.
"""
import json, copy, zipfile, textwrap, re
from pathlib import Path
from collections import deque

ROOT=Path(__file__).resolve().parents[2]
HERE=Path(__file__).resolve().parent
STAGE=HERE/'staged'; STAGE.mkdir(exist_ok=True)
BACKUP=HERE/'before-world-expansion.zip'
if not BACKUP.exists():
    with zipfile.ZipFile(BACKUP,'w',zipfile.ZIP_DEFLATED) as z:
        for p in sorted((ROOT/'data').glob('Map*.json')): z.write(p,p.name)
with zipfile.ZipFile(BACKUP) as z:
    raw={n:z.read(n).decode('utf-8-sig') for n in z.namelist()}
infos=json.loads(raw['MapInfos.json'])
maps={int(n[3:6]):json.loads(s) for n,s in raw.items() if n!='MapInfos.json' and n!='Map063.json'}
original=copy.deepcopy(maps)
tilesets=json.loads((ROOT/'data/Tilesets.json').read_text(encoding='utf-8-sig'))
changed=set(); added=[]; transfers=[]; services=[]; edits=[]
def touch(mid): changed.add(mid); return maps[mid]
def C(code,*parameters,indent=0): return dict(code=code,indent=indent,parameters=list(parameters))
def message(text):
    lines=[]
    for para in text.split('\n'): lines+=textwrap.wrap(para,48) or ['']
    out=[]
    for i in range(0,len(lines),4):out += [C(101,'',0,0,2)]+[C(401,s) for s in lines[i:i+4]]
    return out
def choices(entries):
    labels=[x[0] for x in entries]; out=[C(102,labels,len(labels)-1,0,2,0)]
    for i,(label,commands) in enumerate(entries):
        out.append(C(402,i,label));out += [dict(c,indent=c['indent']+1) for c in commands];out.append(C(0,indent=1))
    return out+[C(404)]
def page(commands,sprite='SF_People1',index=0,trigger=0,priority=1):
    return dict(conditions=dict(actorId=1,actorValid=False,itemId=1,itemValid=False,selfSwitchCh='A',selfSwitchValid=False,switch1Id=1,switch1Valid=False,switch2Id=1,switch2Valid=False,variableId=1,variableValid=False,variableValue=0),directionFix=True,image=dict(characterIndex=index,characterName=sprite,direction=2,pattern=1,tileId=0),list=commands+[C(0)],moveFrequency=3,moveRoute=dict(list=[C(0)],repeat=True,skippable=True,wait=False),moveSpeed=3,moveType=0,priorityType=priority,stepAnime=False,through=False,trigger=trigger,walkAnime=True)
def blocked(m,x,y):
    return any(e and e['x']==x and e['y']==y and e['pages'][0]['priorityType']==1 and not e['pages'][0]['through'] for e in m['events'])
def passage(mid,x,y,d):
    m=maps[mid]; w,h=m['width'],m['height']
    if not(0<=x<w and 0<=y<h):return False
    bit=1<<(d//2-1)
    # Match Game_Map.checkPassage (star=0x10; set direction bit means BLOCKED).
    for z in [3,2,1,0]:
        tid=m['data'][(z*h+y)*w+x]; f=tilesets[m['tilesetId']]['flags'][tid]
        if f&16:continue
        return not(f&bit)
    return False
DIRS=[(0,1,2),( -1,0,4),(1,0,6),(0,-1,8)]
def canstep(mid,a,b,d):
    return passage(mid,*a,d) and passage(mid,*b,10-d)
def components(mid):
    m=maps[mid]; unseen={(x,y) for y in range(m['height']) for x in range(m['width']) if any(passage(mid,x,y,d) for _,_,d in DIRS) and not blocked(m,x,y)}; groups=[]
    while unseen:
        start=min(unseen); unseen.remove(start); q=deque([start]); group={start}
        while q:
            p=q.popleft()
            for dx,dy,d in DIRS:
                n=(p[0]+dx,p[1]+dy)
                if n in unseen and canstep(mid,p,n,d):unseen.remove(n);group.add(n);q.append(n)
        groups.append(group)
    return sorted(groups,key=len,reverse=True)
def location(mid,x,y,avoid=True,keep_connected=False):
    m=maps[mid]; group=components(mid)[0]
    occupied={(e['x'],e['y']) for e in m['events'] if e}
    # Keep the landing squares of both original and added transfers free.
    for other in maps.values():
        for e in filter(None,other['events']):
            for p in e['pages']:
                for c in p['list']:
                    if c['code']==201 and c['parameters'][:2]==[0,mid]:occupied.add(tuple(c['parameters'][2:4]))
    candidates=[p for p in group if not avoid or p not in occupied]
    candidates.sort(key=lambda p:(abs(x-p[0])+abs(y-p[1]),p[1],p[0]))
    if keep_connected:
        for candidate in candidates:
            neighbors=[(candidate[0]+dx,candidate[1]+dy) for dx,dy,d in DIRS if (candidate[0]+dx,candidate[1]+dy) in group and canstep(mid,candidate,(candidate[0]+dx,candidate[1]+dy),d)]
            if not neighbors:continue
            seen={neighbors[0]};q=deque(seen)
            while q:
                a=q.popleft()
                for dx,dy,d in DIRS:
                    b=(a[0]+dx,a[1]+dy)
                    if b!=candidate and b in group and b not in seen and canstep(mid,a,b,d):seen.add(b);q.append(b)
            if len(seen)==len(group)-1:return candidate
        raise ValueError(f'No non-blocking position for {mid} near {x},{y}')
    return candidates[0]
def event(mid,name,x,y,commands,sprite='SF_People1',index=0,trigger=0,priority=1):
    m=touch(mid)
    if not m['events']:m['events']=[None]
    x,y=location(mid,x,y,keep_connected=priority==1);eid=len(m['events'])
    e=dict(id=eid,name=name,note='World expansion: '+name,x=x,y=y,pages=[page(commands,sprite,index,trigger,priority)])
    m['events'].append(e);added.append([mid,eid]);return e
def npc(mid,name,x,y,text,index=0): return event(mid,name,x,y,message(text),index=index)
def chest(mid,name,x,y,gold=0):
    e=event(mid,name,x,y,message(f'{name}\nThe seal reads: NOT A STAFF BONUS.\nFound {gold} credits.')+[C(125,0,0,gold),C(123,'A',0)],'!SF_Chest',0)
    p=page(message('Empty. Management has already filed the loss.'),'!SF_Chest',0);p['conditions']['selfSwitchValid']=True;p['image']['direction']=8;e['pages'].append(p)
    services.append([mid,e['id'],'one-time cache',gold]);return e
def shop_commands(text,goods):
    cmds=message(text)
    for i,(kind,idx,price) in enumerate(goods):cmds.append(C(302 if i==0 else 605,kind,idx,1,price,*([False] if i==0 else [])))
    return cmds
MED=[(0,1,50)]
WEAP=[(1,1,50),(1,12,80),(1,17,180),(1,13,500)]
ARMOR=[(2,8,100),(2,9,150),(2,10,150),(2,2,300)]
def shop(mid,name,x,y,text,goods=MED,index=1):
    e=event(mid,name,x,y,shop_commands(text,goods),index=index);services.append([mid,e['id'],'shop']);return e
def rest_commands(text,cost):
    yes=[C(111,7,cost,0)]+[dict(c,indent=1) for c in [C(125,1,0,cost),C(221),C(314,0,0),C(230,30),C(222)]+message('Your HP and MP are restored. Your dignity remains a pre-existing condition.')]+[C(411)]+[dict(c,indent=1) for c in message('Not enough credits. Please remain alive until your next payday.')]+[C(412)]
    return message(text)+choices([(f'Recover party - {cost} credits',yes),('Leave',[])])
def rest(mid,name,x,y,text,cost=20,index=2):
    e=event(mid,name,x,y,rest_commands(text,cost),index=index);services.append([mid,e['id'],'recovery',cost]);return e
def link(a,axy,b,bxy,label,backlabel=None):
    # Interact with a visible access point; land alongside it, never on a touch event.
    ea=event(a,label,*axy,[],'!SF_Switch1',0)
    eb=event(b,backlabel or 'Return: '+infos[a]['name'],*bxy,[],'!SF_Switch1',0)
    def near(mid,e):
        return location(mid,e['x'],e['y']+1)
    da=near(a,ea);db=near(b,eb)
    ea['pages'][0]['list']=message(label)+choices([('Enter',[C(201,0,b,*db,2,0)]),('Stay here',[])])+[C(0)]
    eb['pages'][0]['list']=message(backlabel or 'Return to '+infos[a]['name'])+choices([('Return',[C(201,0,a,*da,2,0)]),('Stay here',[])])+[C(0)]
    transfers.extend([[a,ea['id'],b,*db],[b,eb['id'],a,*da]])
    return ea,eb
def clone(mid,source,name,parent):
    maps[mid]=copy.deepcopy(original[source]);maps[mid]['events']=[None];maps[mid]['displayName']=name;maps[mid]['encounterList']=[];touch(mid)
    while len(infos)<=mid:infos.append(None)
    infos[mid]=dict(id=mid,expanded=False,name=name,order=mid,parentId=parent,scrollX=0,scrollY=0)
def tile(mid,x,y,z,value):
    m=touch(mid)
    if 0<=x<m['width'] and 0<=y<m['height']:m['data'][(z*m['height']+y)*m['width']+x]=value
def rect(mid,x,y,w,h,z,value):
    for yy in range(y,y+h):
        for xx in range(x,x+w):tile(mid,xx,yy,z,value)
def stamp(mid,source,sx,sy,w,h,x,y):
    s=original[source]
    for z in range(4):
        for yy in range(h):
            for xx in range(w):tile(mid,x+xx,y+yy,z,s['data'][(z*s['height']+sy+yy)*s['width']+sx+xx])
def autotile_edges(mid,z,base):
    m=maps[mid];w,h=m['width'],m['height'];offset=z*w*h
    table=json.loads(re.search(r'Tilemap.FLOOR_AUTOTILE_TABLE = (\[.*?\]);',(ROOT/'js/rpg_core.js').read_text(),re.S)[1])
    def same(x,y):
        if not(0<=x<w and 0<=y<h):return base<2816
        return base<=m['data'][offset+y*w+x]<base+48
    for y in range(h):
        for x in range(w):
            if not same(x,y):continue
            l,r,u,d=same(x-1,y),same(x+1,y),same(x,y-1),same(x,y+1)
            q=[([2,4] if same(x-1,y-1) else [2,0]) if l and u else ([0,4] if u else [2,2] if l else [0,2]),
               ([1,4] if same(x+1,y-1) else [3,0]) if r and u else ([3,4] if u else [1,2] if r else [3,2]),
               ([2,3] if same(x-1,y+1) else [2,1]) if l and d else ([0,3] if d else [2,5] if l else [0,5]),
               ([1,3] if same(x+1,y+1) else [3,1]) if r and d else ([3,3] if d else [1,5] if r else [3,5])]
            tile(mid,x,y,z,base+table.index(q))
def exterior(mid,name,parent,w=30,h=24):
    clone(mid,33,name,parent);m=maps[mid];m['width']=w;m['height']=h;m['data']=[0]*(w*h*6)
    rect(mid,0,0,w,h,0,3584) # Sand, same kind as the established village.
    # Contained courtyard with a broad southern entry; architecture comes from Village.
    for x in range(w):tile(mid,x,0,2,165)
    for y in range(1,h):tile(mid,0,y,2,165);tile(mid,w-1,y,2,165)
    stamp(mid,33,0,0,7,4,2,2);stamp(mid,33,8,5,7,3,20,3)
    for x,y in [(3,10),(3,17),(21,15)]:
        for dx in range(3):tile(mid,x+dx,y,2,208+dx);tile(mid,x+dx,y+1,2,216+dx)
    for x,y,t in [(11,4,154),(12,4,155),(17,4,154),(18,4,155),(8,12,103),(15,16,103),(25,19,131),(26,19,132),(23,9,134),(24,9,135),(25,9,136),(7,7,94),(19,12,94),(13,5,187),(14,5,187),(24,20,130)]:tile(mid,x,y,2,t)
    # Broad service lanes and small planted buffers break up the industrial yard.
    rect(mid,10,5,6,h-5,1,3680);rect(mid,4,7,21,2,1,3680)
    rect(mid,5,13,18,2,1,3680);rect(mid,4,20,22,2,1,3680)
    autotile_edges(mid,1,3680)
    for x,y in [(7,15),(8,15),(7,16),(8,16),(19,3),(18,3)]:tile(mid,x,y,0,2816)
    autotile_edges(mid,0,2816)

def waterfront(mid):
    # A different silhouette, circulation and setting from Rivet Commons:
    # northern guildhall, west lawn, concrete quay, east lake and two wooden piers.
    m=touch(mid);w,h=36,26;m['width']=w;m['height']=h;m['data']=[0]*(w*h*6)
    rect(mid,0,0,w,h,0,2816)
    rect(mid,22,0,14,h,0,2048)
    rect(mid,22,0,14,h,1,2096)  # Same shallow/deep water stack as Newtown Lake.
    rect(mid,19,0,3,h,0,1585)
    # The green-roofed Newtown office is reused as a complete facade, not a village shack.
    stamp(mid,49,3,2,16,9,1,1)
    rect(mid,8,10,3,16,1,3680);rect(mid,8,12,13,2,1,3680);rect(mid,8,21,13,2,1,3680)
    rect(mid,1,12,8,2,1,3680);rect(mid,6,10,5,2,1,3680)
    autotile_edges(mid,1,3680);autotile_edges(mid,0,2048)
    for y,length in [(13,11),(21,8)]:
        # Back rail and cargo sit on decking too, not on the water behind it.
        rect(mid,21,y-1,length,3,0,1590)
        rect(mid,21,y-1,length,3,1,0)
        for x in range(22,21+length):tile(mid,x,y-1,2,185)
        tile(mid,21+length-1,y,2,131)
    # Market hugs the quay; reclamation piles and park benches occupy the western lawn.
    for x,y in [(14,11),(14,18)]:
        for dx in range(3):tile(mid,x+dx,y,2,208+dx);tile(mid,x+dx,y+1,2,216+dx)
    for x,y,t in [(3,14,103),(3,20,103),(3,12,154),(4,12,155),(3,18,154),(4,18,155),(4,23,141),(5,23,142),(12,23,130),(13,23,131),(14,23,132),(15,23,187),(16,23,187),(20,10,94),(20,18,94),(20,24,94),(27,13,130),(28,13,130),(27,21,132)]:tile(mid,x,y,2,t)
    # Open west and south edges lead into the existing Newtown greenbelt.
    autotile_edges(mid,1,2096)

# Restore unusable interiors using established room art, then furnish distinct functions.
clone(63,13,'Dorlund Inn - The Paid Unconscious',61)
clone(64,11,'Dorlund Cooperative Supply',61)
clone(65,14,'Dorlund Bunkroom',63)
clone(96,94,'Floating Mansion - Complaints Archive',91)
exterior(103,'Rivet Commons - Workers\' Salvage Yard',33)
clone(104,67,'Snowy Village - Municipal Thaw House',47)
exterior(105,'Newtown Reclamation Market',49,32,24)
waterfront(105)
clone(106,84,'Dorlund - Last Shift Canteen',61)
clone(107,8,'Needsaname - Provisional Naming Office',102)
clone(108,12,'Rivet Commons - Shared Workshop',103)
clone(109,8,'Newtown - Salvage Registration Office',105)

# Three shop floors were painted with an impassable A4 wall autotile.
# Replace that floor material only; preserve walls, counters, stock and events.
for mid in [68,69,74]:
    m=touch(mid)
    for i in range(m['width']*m['height']):
        if 7184<=m['data'][i]<7232:m['data'][i]=1572
for mid in [25,26,27]:
    m=touch(mid)
    for i in range(m['width']*m['height']):
        if 5120<=m['data'][i]<5168:m['data'][i]=3200
    autotile_edges(mid,0,3200)
# Normalize malformed shadow bits and discard unused, zero-only trailing data.
for i,t in enumerate(touch(28)['data']):
    if t<0:
        assert 4*1600<=i<5*1600
        maps[28]['data'][i]=t&15
assert not any(maps[100]['data'][70*60*6:])
touch(100)['data']=maps[100]['data'][:70*60*6]
for c in touch(15)['events'][20]['pages'][0]['list']:
    if c['code']==201 and c['parameters'][1]==23:c['parameters']=[0,23,*location(23,10,3),4,0]
assert not any(maps[15]['data'][70*50*6:])
touch(15)['data']=maps[15]['data'][:70*50*6]
# The cave at Ting Ting's north edge leads through the mountain to Snowy Village.
# Carry that snow belt onto the surrounding world map, retaining the warmer
# southern basin and the eastern sea. World_A1/A2 are shared with Snowy Pass.
m=touch(39);n=m['width']*m['height']
for y in range(16):
    for x in range(m['width']):
        if y>11+(x//5)%3:continue
        i=y*m['width']+x
        if 3584<=m['data'][i]<3632:m['data'][i]+=384
        if 3920<=m['data'][n+i]<3968:m['data'][n+i]+=384
autotile_edges(39,0,3968);autotile_edges(39,1,4304)

# Dorlund becomes a connected settlement: station, shops, residential square, bunkroom.
link(43,(14,5),61,(14,5),'Dorlund residential concourse')
link(61,(8,18),63,(3,5),'The Paid Unconscious - Inn')
link(61,(22,13),64,(3,6),'Cooperative Supply')
link(61,(19,20),106,(12,6),'Last Shift Canteen')
link(63,(8,5),65,(3,5),'Guest bunkroom')
for a,axy,b,bxy,label in [(44,(3,5),43,(5,14),'Weapon shop exit'),(45,(4,6),43,(21,13),'Clinic exit'),(58,(4,6),43,(13,23),'Armorer exit')]:link(a,axy,b,bxy,label)
rest(63,'Nurse Numb - innkeeper',6,4,'Beds are twenty credits. Dreams are not monitored. The screaming is complimentary.',20)
shop(64,'Co-op quartermaster',8,5,'Union prices. Corporate customers must first explain what the fuck a synergy is.')
npc(65,'Off-shift miner',7,4,'I mine ore. My spine mines regret. Please let both of us sleep.',5)
chest(65,'Previous tenant\'s severance',6,5,80)
rest(106,'Soup steward',3,4,'The soup is legally a mattress. Twenty credits buys rest and a full recovery.',20)
npc(106,'Shop steward Mags',17,5,'Armatek called the missing miners a staffing adjustment. We called a strike. Guess which one got investigated.',3)
npc(106,'Pension auditor',8,5,'My pension is payable in company teeth. Not shares. Teeth. I have the paperwork.',6)
npc(43,'Cooling engineer',10,15,'I maintain the cooling grid. Keep north for beds; the station is east. If your sweat starts invoicing you, see the clinic.',4)
npc(43,'Armatek safety liaison',24,20,'The lava is a productivity feature. Employees reaching it have exceeded their targets.',7)
npc(61,'Union notice keeper',15,12,'Canteen south. Inn west. Co-op east. No one goes into the Haunted Shift alone. Management does not count as someone.',2)
npc(61,'Retired drilling hand',3,20,'They replaced my lungs with bellows. Good suction, terrible birthdays. I blew the cake into next week.',5)
chest(61,'Strike fund reimbursement',25,21,140)

# Village expansion: locally grounded, useful and deeply unhealthy municipal life.
link(33,(15,11),103,(14,21),'Rivet Commons - salvage and communal services')
shop(103,'Beryl - reclaimed hardware',4,12,'Armatek calls this theft. I call it returning the wall to the people it fell on.',WEAP,3)
shop(103,'Pants witness protection',4,19,'These trousers have seen things. Buy a pair and give them a new identity.',[(2,9,150),(2,13,200),(2,28,400)],5)
rest(103,'Volunteer flesh mechanic',23,17,'Free clinic. We put the bits back where they were. Mostly. Full party recovery, no charge.',0)
npc(103,'Community welder',21,7,'Zack taught us to brace the roofs. Armatek taught us why. Nobody here sleeps under a warranty.',4)
npc(103,'Municipal pigeon advocate',11,8,'The pigeons elected me. I demand bread, shade, and an end to anti-bird architecture. I am not explaining the sash.',6)
chest(103,'Salvage-dividend locker',26,21,90)
e=event(103,'Petition: stop charging for elbows',16,12,message('Armatek has classified elbows as optional hinges. Sign the appeal?')+choices([('Sign with your own elbow',message('The petition printer vomits a rebate. Received 60 credits.')+[C(125,0,0,60),C(123,'A',0)]),('Keep your hinges out of politics',[])]),'SF_People2',3)
p=page(message('Your signature is on file. The elbow tax remains under aggressive reconsideration.'),'SF_People2',3);p['conditions']['selfSwitchValid']=True;e['pages'].append(p)
npc(33,'Crane spotter',8,9,'Rivet Commons is east. Zack keeps the cranes standing; the rest of us keep the bastard fed.',4)

# Snow, lake and desert towns gain distinct inhabitants and side destinations.
link(47,(17,25),104,(3,6),'Municipal Thaw House - no limb left behind')
rest(104,'Thaw attendant',3,4,'Frozen solid? We defrost the whole party for fifteen credits. No one goes in the microwave.',15)
npc(104,'Customer number thirty-two',8,6,'I came in for cold feet. The clerk handed me a wedding annulment. Very efficient town.',5)
chest(104,'Unclaimed coat pocket',8,4,55)
npc(47,'Geothermal union plumber',17,19,'I keep the village warm. The thaw house is south of the square. Vitalix keeps trying to patent shivering.',4)
npc(47,'Snow witness',27,12,'The pass north leads to Newtown. East goes through the mountain to D Town. Both routes are full of weather with opinions.',1)
npc(47,'Frostbite collector',6,31,'I sell snow globes. Real snow, fake tiny people. After the recall we had to be very specific.',7)
npc(47,'Snowplow marshal',26,31,'We cleared the paths. If you wander off them and become a landmark, please face the road.',2)
chest(47,'Emergency mitten fund',35,34,75)
link(49,(38,23),105,(1,13),'Eastern quay - Newtown Reclamation Market')
link(70,(3,31),105,(20,24),'West-bank market footpath')
link(103,(22,6),108,(3,4),'Shared workshop - reclaimed hardware')
link(105,(6,10),109,(3,6),'Salvage registration office')
npc(108,'Tool librarian',6,4,'Borrowed tools come back. Armatek executives do not. That is the entire lending policy.',4)
shop(108,'Workshop repair bench',7,3,'Tools with fewer fingers attached cost extra.',WEAP,3)
npc(109,'Deputy salvage registrar',8,4,'Recovered objects are registered here. Please declare any voices, teeth, or previous owners still attached.',7)
chest(109,'Cancelled filing bond',13,5,65)
shop(105,'Lake salvage dealer',15,13,'Everything washed ashore. Even the price tags. Especially the price tags.',ARMOR,4)
shop(105,'Licensed headache distributor',15,20,'Acetaminophen. For the headache you had before reading the lake water report.')
npc(105,'Lake water sommelier',30,14,'Today\'s vintage has notes of copper, panic, and municipal denial. I would not drink it.',6)
npc(105,'Reclamation magistrate',10,11,'Objects pulled from the lake are salvage. Objects that pull back are citizens. Please sort accordingly.',7)
chest(105,'Salvaged meter float',24,22,110)
npc(49,'Newtown groundskeeper',13,28,'The market and lake are east, beyond the shops. Those trees are the only things here not on a subscription.',3)
npc(49,'Disgruntled duck accountant',34,23,'Quantum Dynamics taught the ducks double-entry bookkeeping. Now the lake owes itself money.',5)
npc(49,'Public access warden',6,16,'The reclaimed goods market takes credits. The lake takes anything. That is not an invitation.',1)
npc(70,'Shoreline angler',8,32,'I hooked a briefcase. It promoted me to bait. The union says this happens.',4)
chest(70,'Washed-up expense account',12,30,120)
npc(77,'Desert water commissioner',16,24,'Water is rationed. Sweat is taxable. Tears count as undeclared exports. Welcome to D Town.',7)
npc(77,'Shade broker',20,16,'I rent shade. Sit under that tree without a contract and I send the sun after you.',3)
npc(77,'Caravan dispatcher',10,34,'Mountain pass north, desert west. South D Town has a cellar under the shack. Bring a light and low expectations.',4)
npc(97,'Unlicensed elbow doctor',17,15,'Vitalix shut my practice down. Apparently a spare elbow has to be somebody\'s elbow. Bureaucrats.',6)
npc(97,'Cellar tenant',27,20,'The shack has stairs down. The landlord calls the basement an open-plan opportunity. The mould calls it home.',2)
chest(97,'Abandoned sunstroke deposit',33,20,85)

# Replace explicit shop/clinic/bar placeholders, retaining their coordinates and appearance.
def replace(mid,eid,commands,role):
    e=touch(mid)['events'][eid];e['pages'][0]['list']=commands+[C(0)];edits.append([mid,eid,role]);return e
replace(44,1,shop_commands('Weapons tested on company property. The company remains very upset.',[(1,13,500),(1,35,650),(1,39,750)]),'weapon shop')
replace(45,1,rest_commands('Dorlund triage. We restore HP and MP. Cosmetic tentacles are a separate department.',30),'clinic')
replace(72,2,shop_commands('Newtown lake patrol surplus. Keep the loud end away from your face.',WEAP),'weapon shop')
replace(79,2,shop_commands('Sand-tested weapons. The warranty excludes sand. Yes, I hear it too.',[(1,12,80),(1,13,500),(1,18,200),(1,35,650)]),'weapon shop')
replace(99,2,rest_commands('Discount recovery. We fix the party you brought in; we do not install a different one.',25),'clinic')
rest(83,'Licensed Vitalix technician',7,5,'All-party recovery: thirty credits. We count your limbs before and after.',30)
replace(67,1,shop_commands('Bar rules: no licking the radiators, no thawing coworkers in the sink. Medicine for the aftermath?',MED),'bar supplier')
replace(67,2,message('I survey the pass. Newtown is north; D Town is over the eastern mountain. Warm up at the thaw house before leaving.'),'route hint')
replace(69,2,message('I count the stock. One painkiller, one more painkiller, one creeping sense of futility.'),'stock clerk')
replace(84,2,shop_commands('The bar serves pain relief. The drinks are only for people who have already given up on relief.',MED),'bar supplier')
replace(101,2,message('Speak easy. The walls have ears. Literal ears. Vitalix recalled the plaster, but the landlord wants a second opinion.'),'bartender')
for c in touch(101)['events'][1]['pages'][0]['list']:
    if c['code']==201:c['parameters']=[0,97,20,11,2,0]

# Connect abandoned local interiors and preserve their existing quest events.
link(2,(22,5),24,(2,17),'B.M.N.E.C. public access tram')
for eid,target in [(5,25),(6,25)]:
    e=touch(24)['events'][eid]; dest=location(target,15,11)
    for p in e['pages']:
        for c in p['list']:
            if c['code']==201:c['parameters']=[0,target,*dest,2,0]
link(24,(10,11),25,(4,10),'B.M.N.E.C. reception')
link(25,(27,10),26,(3,10),'Lift: outpatient floor')
link(26,(27,10),27,(3,10),'Lift: administration')
link(27,(27,10),41,(3,10),'Lift: recovery ward')
replace(26,1,message('Your complaint has been forwarded to your replacement organ. Please allow six to eight working screams.'),'claims clerk')
replace(41,1,rest_commands('Welcome to recovery. Thirty credits gets your HP and MP back. Your original spleen is in arbitration.',30),'recovery nurse')
npc(25,'Intake receptionist',5,8,'For stairs, use the lifts. For lifts, use the buttons. For consent, see the word printed above your signature.',7)
npc(27,'Senior consent analyst',18,9,'Our new consent form signs you. Very popular with management. Less popular with wrists.',3)
link(38,(8,9),40,(9,13),'Floating Mansion entrance')
# Correct the existing unlocked elevator's destination and page precedence.
# Keep switch 20 as its prerequisite; do not grant the story unlock.
for e in touch(1)['events']:
    if e and e['name']=='Beanstalk Elevator':
        for p in e['pages']:
            for c in p['list']:
                if c['code']==201:c['parameters']=[0,38,8,11,2,0]
        e['pages'].sort(key=lambda p:p['conditions']['switch1Valid'])
return_lift=event(38,'Beanstalk - return to Mega Earth',8,11,message('Ground floor. Mind the gap in corporate accountability.')+choices([('Descend',[C(201,0,1,*location(1,28,21),2,0)]),('Stay',[])]),'!SF_Switch1')
link(40,(10,3),91,(9,5),'Grand staircase')
link(91,(17,5),96,(4,9),'Complaints archive')
npc(96,'Archivist of moist grievances',3,7,'Every complaint becomes a mushroom. These shelves are a fucking forest. Yours looks like a chanterelle.',5)
chest(96,'Misfiled damage settlement',5,4,180)
link(98,(6,4),100,(5,5),'D Town cellar access')
npc(100,'Basement dehumidifier inspector',13,9,'I inspect mould. This colony has formed a homeowners association. They want you off the grout.',4)
chest(100,'Condemned maintenance payroll',55,48,160)
chest(100,'Former landlord\'s emergency fund',15,50,140)

# Make wilderness exploration reward attention, without inventing new combat mechanics.
link(61,(2,21),59,(2,46),'Haunted Shift service access')
link(59,(2,3),60,(43,20),'Old extraction works')
link(60,(40,39),62,(20,20),'Dorlund lava-field inspection lift')
npc(59,'Shift memorial keeper',3,25,'Two crews went down. Management removed them from the headcount. We kept their names. Read them before you go.',5)
npc(60,'Retired extraction foreman',8,18,'The survey lockers are abandoned. Take the credits. It is the closest anyone got to a hazard bonus.',4)
chest(60,'Survey crew hazard bonus',9,41,180)
chest(60,'Unpaid overtime cache',38,12,220)
npc(62,'Lava safety contractor',20,24,'Stay on solid ground. I lost a clipboard in the lava and Armatek billed me for warming it.',7)
chest(62,'Heat-resistant petty cash',150,140,250)

# Ship services connect existing regions only after the existing transponder is acquired.
for a,b,axy,bxy in [(50,51,(7,9),(7,10)),(51,52,(4,7),(7,10)),(51,53,(12,7),(7,10)),(53,54,(4,7),(7,10)),(53,55,(12,7),(7,10))]:link(a,axy,b,bxy,'Marcus Garvey 2.0 - '+{50:'bridge',51:'crew corridor',52:'engineering',53:'cargo access',54:'sickbay',55:'mess'}[b])
rest(54,'Ship medical dispenser',7,7,'You are aboard a smuggling vessel. Your medical records are already missing. Recovery is free.',0)
npc(52,'Engineering contractor',7,7,'Jack asked for more thrust. I removed the word CAUTION from the engine. Morale is through the roof.',4)
npc(55,'Galley survivor',7,7,'The meal dispenser calls every meal a new experience. Legally, that means it cannot remember what it fed us.',6)
chest(55,'Galley swear jar',11,8,75)
ports=[(1,(10,12),'Mega Earth'),(28,(28,3),'Planet Ork'),(39,(11,6),'Planet Ting Ting'),(102,(12,12),'Planet Needsaname')]
destinations=[]
for mid,xy,name in ports:
    e=event(mid,'Transponder berth - '+name,*xy,[],'SF_People3',3)
    landing=location(mid,e['x'],e['y']+1);destinations.append((name,mid,landing))
    shiplanding=location(50,7,10)
    e['pages'][0]['list']=[C(111,8,144)]+[dict(c,indent=c['indent']+1) for c in message('Transponder authenticated. Marcus Garvey 2.0 is accepting passengers with all their current organs.')+choices([('Board',[C(201,0,50,*shiplanding,2,0)]),('Stay',[])])]+[C(411)]+[dict(c,indent=1) for c in message('A ship transponder is required. No transponder, no boarding. The alien craft on Mega Earth may have one.')]+[C(412),C(0)]
event(50,'Navigation - choose a landing berth',7,6,message('Navigation online. Please keep your existential baggage inside the ship.')+choices([(name,[C(201,0,mid,*xy,2,0)]) for name,mid,xy in destinations]+[('Remain aboard',[])]),'SF_People3',3)
link(102,(10,10),107,(3,6),'Provisional Naming Office - survey settlement')
npc(102,'Surveyor without a noun',17,14,'We named this place yesterday. The name resigned overnight. The naming office is taking statements.',6)
npc(107,'Provisional nomenclature clerk',3,4,'Proposed names require three signatures. The third must be from the planet. It keeps signing OTHER.',7)
event(107,'Entity consultation terminal',10,4,message('NAME APPLICATION STATUS: THE PLANET HAS OBJECTED.')+choices([('Ask about the signal',message('Your implant is repeating a signal we have heard before. We can discuss it. We cannot remove it from your skull.')),("Submit 'Kevin'",message('Kevin has declined jurisdiction. Application returned.')),("Submit 'Planet Needsaname'",message('Provisional name retained. It is the only applicant who keeps showing up.')) ,('Leave',[])]),'!Crystal',1)
chest(107,'Refunded naming fee',13,5,100)

# Safe havens: no new random fights in towns, shops or ship rooms.
for mid in [33,43,44,45,47,49,58,61,63,64,65,66,67,68,69,71,72,73,74,77,79,80,81,82,83,84,96,97,98,99,101,103,104,105,106,107,50,51,52,53,54,55]:
    touch(mid)['encounterList']=[]
for mid in changed:
    if not maps[mid]['displayName']:maps[mid]['displayName']=infos[mid]['name']
    (STAGE/f'Map{mid:03}.json').write_text(json.dumps(maps[mid],ensure_ascii=False,separators=(',',':'))+'\n',encoding='utf-8')
(STAGE/'MapInfos.json').write_text(json.dumps(infos,ensure_ascii=False,separators=(',',':'))+'\n',encoding='utf-8')
manifest=dict(changed=sorted(changed),addedEvents=added,links=transfers,services=services,editedEvents=edits,newMaps=list(range(103,110)),repairedMaps=[63,64,65,96])
(HERE/'manifest.json').write_text(json.dumps(manifest,indent=2)+'\n',encoding='utf-8')
print(f'Staged {len(changed)} maps, {len(added)} new events, {len(transfers)} directed local links. Original files preserved in {BACKUP.name}.')
