"""Build twelve reproducible room mazes on the completed dungeon baseline."""
import copy,json,re,random,textwrap,zipfile
from pathlib import Path
from collections import deque
ROOT=Path(__file__).resolve().parents[2];HERE=Path(__file__).resolve().parent
STAGE=HERE/'staged';STAGE.mkdir(exist_ok=True)
BACKUP=HERE/'before-mazes.zip'
if not BACKUP.exists():
 with zipfile.ZipFile(BACKUP,'w',zipfile.ZIP_DEFLATED) as z:
  for p in sorted((ROOT/'data').glob('*.json')):z.write(p,p.name)
with zipfile.ZipFile(BACKUP) as z:original={n:json.loads(z.read(n).decode('utf-8-sig')) for n in z.namelist()}
maps={int(n[3:6]):copy.deepcopy(v) for n,v in original.items() if re.fullmatch(r'Map\d{3}.json',n)}
infos=copy.deepcopy(original['MapInfos.json']);system=copy.deepcopy(original['System.json']);items=copy.deepcopy(original['Items.json']);commons=copy.deepcopy(original['CommonEvents.json']);tilesets=original['Tilesets.json']
assert not tilesets[19]['name'] and all(m['tilesetId']!=19 for m in maps.values())
medical=copy.deepcopy(tilesets[9]);medical.update(id=19,name='Industrial Recovery Wards')
medical['tilesetNames'][7]=tilesets[12]['tilesetNames'][5]
medical['flags'][512:768]=tilesets[12]['flags'][0:256];tilesets[19]=medical
changed=set();refs={};routes=[];masks={};reserved={}
core=(ROOT/'js/rpg_core.js').read_text();FLOOR=json.loads(re.search(r'Tilemap.FLOOR_AUTOTILE_TABLE = (\[.*?\]);',core,re.S)[1])
# Reuse tested native-event and tile helpers, without executing the older build.
source=(ROOT/'tools/dungeons/build_dungeons.py').read_text()
exec(source[source.index('def C('):source.index('# Six original layouts:')])
def place(mid,x,y,solid=True):
 area=flood(mid);existing=[e for e in maps[mid]['events'] if e]
 occupied={(e['x'],e['y']) for e in existing}|reserved.get(mid,set())
 for p in sorted(area-occupied,key=lambda p:(abs(p[0]-x)+abs(p[1]-y),p[1],p[0])):
  if solid:
   if len(flood(mid,extra=p))!=len(area)-1:continue
   if any(not any((e['x']+dx,e['y']+dy) in area-{p} for dx,dy,_ in DIRS) for e in existing if any(pg['priorityType']==1 for pg in e['pages']) and any((e['x']+dx,e['y']+dy) in area for dx,dy,_ in DIRS)):continue
  return p
 raise ValueError(f'No placement preserving NPC access: {mid}')
def notes_item():return branch([8,152],[],[C(126,152,0,0,1)]+say('Received Expedition Notes. Use it from Key Items for room clues and objectives.'))
quests=[
 dict(key='names',title='Your Name Is On Backorder',hub=107,npc='Clerk Alias',theme='Pronoun Reclamation Vault',floors=['Rejected Identities','Originals Department'],ts=9,floor=2912,wall=6320,ceiling=5936,hook='NeuraTech has repossessed six residents\' names. They are receiving mail addressed to PRODUCT. Find the original identity register beneath the Naming Office.',a='Appeals receipt: originals require a witness, not a subscription.',b='Witness record: the clerk witnessed the names BEFORE their sale.',prompt='Which claim has priority?',answers=['The original witnessed identity','The subscription invoice'],ending='The residents have their names back. One has chosen a new one: Refund.',lore='A.S.P. lists a child\'s nickname as an unlicensed derivative work.'),
 dict(key='parts',title='The Right to Repair Yourself',hub=108,npc='Mechanic Socket',theme='Warranty Intestine',floors=['Returns Labyrinth','Recall Chambers'],ts=9,floor=3296,wall=6272,ceiling=5888,hook='Armatek recalled the workshop\'s prosthetic joints while people were wearing them. Find the mechanical release specification in the old returns facility.',a='Service diagram: isolate power before disengaging the joint lock.',b='Recall memo: the red cable is billing telemetry; the blue cable powers the lock.',prompt='How should the joint lock be released?',answers=['Isolate blue power, then release','Pull the red billing cable'],ending='The workshop can repair the joints now. Nobody has to mail in a knee.',lore='Warranty void if the customer experiences stairs, joy, or weather.'),
 dict(key='cargo',title='Dead Letter, Live Kidney',hub=109,npc='Dispatcher Brine',theme='Misdelivery Repository',floors=['Unclaimed Freight','Biological Sorting'],ts=9,floor=2912,wall=6272,ceiling=5888,hook='Vitalix sent transplant tissue to salvage. The cold boxes are still running, but their recipients are running out of time. Recover the routing manifest below the salvage office.',a='Dispatch receipt: medical freight belongs on the cold chain.',b='Address slip: the destination is a clinic, not the recycling furnace.',prompt='Choose the destination for the manifest.',answers=['Clinic cold-chain dispatch','Recycling furnace'],ending='The clinic has the manifest and will collect its freight. The kidneys decline to tip.',lore='CONTENTS: fragile. Do not fold, spindle, or promote to management.'),
 dict(key='tide',title='The Tide Is a Subscription',hub=105,npc='Pump keeper Silt',theme='Tidal Invoice Works',floors=['Dry Service Galleries','Floodgate Records'],ts=9,floor=3296,wall=6320,ceiling=5936,hook='Newtown\'s waterfront pumps stop whenever the tide misses a payment. Explore the dry maintenance rooms beneath the quay and recover the public-service override.',a='Pump schematic: the emergency bypass feeds the public drainage line.',b='Contract appendix: flood safety remains mandatory during billing disputes.',prompt='Which circuit must remain active?',answers=['Public emergency drainage','Premium fountain display'],ending='The pumps now ignore unpaid tide invoices. The fish remain suspicious.',lore='The dry galleries sit behind the seawall. This is a service facility, not an underwater walking tour.'),
 dict(key='sleep',title='Eight Hours, Subject to Approval',hub=103,npc='Night steward Yawn',theme='Overtime Dream Exchange',floors=['Sleep Intake','Restitution Wards'],ts=9,floor=2912,wall=6320,ceiling=5936,hook='NeuraTech sold the night shift\'s sleep credits twice. People are dreaming during forklift operation. Find the unedited sleep allocation record in the buried exchange.',a='Medical record: eight hours of rest are allocated per worker.',b='Sales ledger: duplicated credits were sold after the medical allocation.',prompt='Which record governs the refund?',answers=['The original medical allocation','The duplicated sales ledger'],ending='The night shift can sleep again. The forklifts have requested the same benefit.',lore='Premium nightmare package: now with an ad-free first scream.'),
 dict(key='warmth',title='Heat Death of the Help Desk',hub=104,npc='Boiler tender Cinder',theme='Thermal Complaint Complex',floors=['Ticket Catacombs','Boiler Arbitration'],ts=4,floor=3248,wall=6416,ceiling=6032,hook='The thaw house\'s backup boiler only heats unresolved complaints. Management closed every ticket. Recover the winter emergency charter beneath the frozen service annex.',a='Safety notice: the winter charter overrides automated ticket closure.',b='Temperature log: the annex is below the emergency threshold.',prompt='Which rule overrides the shutdown?',answers=['The winter emergency charter','The closed-ticket dashboard'],ending='Backup heat is restored to the thaw house. Management has filed a complaint about warmth.',lore='Your hypothermia is important to us. Current hold time: geological.')
]
for q in quests:
 if q['key'] in ('cargo','sleep'):q['ts']=19
 if q['key']=='sleep':q['floor']=3296
ROOM_NAMES={
'names':['Witness Booth','Alias Sorting','Originals Access','Signature Audit','Lost Surnames','Appeals Waiting','Intake','Rejected Forms','Birth Records'],
'parts':['Service Diagrams','Joint Returns','Recall Access','Spare Elbows','Warranty Stores','Lock Testing','Receiving','Scrapped Claims','Cable Records'],
'cargo':['Cold-chain Dispatch','Unclaimed Boxes','Manifest Access','Tissue Storage','Emergency Freight','Routing Office','Loading Intake','Dead Letters','Clinic Addresses'],
'tide':['Bypass Schematics','Pressure Meters','Floodgate Access','Pump Inspection','Dry Stores','Valve Service','Quay Intake','Billing Archive','Safety Contracts'],
'sleep':['Medical Allocation','Dream Intake','Refund Access','Quiet Ward','Rest Stores','Nap Audit','Shift Intake','Nightmare Archive','Sales Records'],
'warmth':['Winter Charter','Frost Intake','Boiler Access','Heat Exchange','Fuel Stores','Ticket Triage','Service Intake','Hold Queue','Temperature Logs']}
def prop(mid,x,y,rows):
 for dy,row in enumerate(rows):
  for dx,t in enumerate(row):
   assert (x+dx,y+dy) in masks[mid]
   put(mid,x+dx,y+dy,t,2)
SWITCHES={};layouts={};centers={};tracks=[]
for qi,q in enumerate(quests):
 base=131+qi*6;q.update(active=base,first=base+1,second=base+2,evidence=base+3,public=base+4,complete=base+5,reward=320+qi*30,maps=[116+qi*2,117+qi*2])
 for offset,label in enumerate(['Accepted','First clue','Second clue','Recovered','Public disclosure','Reward claimed']):
  sid=base+offset;assert sid>=len(system['switches']) or not system['switches'][sid],f'Switch {sid} in use';SWITCHES[sid]=q['title']+' - '+label
 for depth,mid in enumerate(q['maps']):
  assert mid not in maps
  rng=random.Random(mid*509);newmap(mid,q['theme']+' - '+q['floors'][depth],q['hub'] if depth==0 else mid-1,58,48,q['ts'])
  cs=[];rects=[]
  for row in range(3):
   for col in range(3):
    x=4+col*18+rng.randrange(3);y=4+row*14+rng.randrange(2);w=rng.randrange(7,11);h=rng.randrange(6,9)
    room(mid,x,y,w,h);cs.append((x+w//2,y+h//2));rects.append([x,y,w,h])
  # Randomized depth-first room graph, plus one genuine loop per floor.
  edges=[];seen={6};stack=[6]
  while stack:
   a=stack[-1];r,c=divmod(a,3);options=[b for b in range(9) if b not in seen and abs(b//3-r)+abs(b%3-c)==1]
   if not options:stack.pop();continue
   b=rng.choice(options);edges.append((a,b));seen.add(b);stack.append(b)
  unused=[(a,b) for a in range(9) for b in range(a+1,9) if abs(a//3-b//3)+abs(a%3-b%3)==1 and (a,b) not in edges and (b,a) not in edges]
  edges.append(rng.choice(unused))
  for a,b in edges:
   ax,ay=cs[a];bx,by=cs[b]
   if a//3==b//3:
    bend=(ax+bx)//2;pts=[(ax,ay),(bend,ay),(bend,by),(bx,by)]
   else:
    bend=(ay+by)//2;pts=[(ax,ay),(ax,bend),(bx,bend),(bx,by)]
   corridor(mid,pts,width=3)
  surface(mid,q['floor'],q['wall'],q['ceiling']);centers[mid]=cs;layouts[mid]=dict(rooms=rects,edges=edges,seed=mid*509)
  # Furnish corners, never doors or corridor centerlines.
  for ri,(x,y,w,h) in enumerate(rects):
   if q['key']=='names':prop(mid,x+1,y+1,[[57,58],[65,66]])
   elif q['key']=='parts':prop(mid,x+1,y+1,[[264,265,266],[272,273,274],[288,289,290],[304,305,306]])
   elif q['key'] in ('cargo','sleep'):
    if ri%2==0 or q['key']=='sleep':prop(mid,x+1,y+1,[[544,545,546],[560,561,562],[576,577,578]])
    else:prop(mid,x+1,y+1,[[547,547],[563,563]])
   elif q['key']=='tide':prop(mid,x+1,y+1,[[32,32],[33,33]])
   else:prop(mid,x+1,y+1,[[67],[75]])
   neighbors=sorted(b if a==ri else a for a,b in edges if ri in (a,b))
   marker=f'{q["floors"][depth]} / Room {ri+1}: {ROOM_NAMES[q["key"]][ri]}. Linked rooms: '+', '.join(str(n+1) for n in neighbors)+'.'
   if ri==6:marker+=' Return passage here.'
   event(mid,f'{q["key"]}_{depth}_room{ri}','Room marker',*cs[ri],say(marker),'',priority=0)
  cache(mid,f'{q["key"]}_{depth}_cache',*cs[4],55+qi*5+depth*20,'A sealed emergency petty-cash tin. Emergency: petty cash.')
  event(mid,f'{q["key"]}_{depth}_lore','Discarded memorandum',*cs[7],say(q['lore']),'!SF_Switch1')
 a,b=q['maps'];key=q['key'];ac=q['active'];f=q['first'];s=q['second'];ev=q['evidence'];done=q['complete'];pub=q['public']
 stairs(q['hub'],(6+qi*2,7),a,centers[a][6],key+'_entry','Enter '+q['theme'])
 stairs(a,centers[a][2],b,centers[b][6],key+'_depth','Descend to '+q['floors'][1],[ac,f,s])
 reminder=f'Enter {q["theme"]} from this location. On the first floor, read Room 1 and Room 9. The descent is in Room 3. The final console is in Room 3 downstairs.'
 ending=branch([0,pub,0],say(q['ending']+' The evidence is posted publicly.'),say(q['ending']+' The affected residents hold the only copies.'))
 giver(q['hub'],key+'_giver',q['npc'],(9+qi,10),ac,ev,done,q['reward'],q['hook'],reminder,ending,index=qi%8)
 objective(a,key+'_first','First evidence',centers[a][0],ac,f,say(q['a'])+[on(f)],q['a'])
 objective(a,key+'_second','Second evidence',centers[a][8],ac,s,say(q['b'])+[on(s)],q['b'])
 success=say('The record is authenticated. Who should hold the evidence?')+choice([('Publish it',say('A public copy has been prepared.')+[on(ev),on(pub)]),('Give copies to affected residents',say('Private copies have been prepared.')+[on(ev)]),('Decide later',[])])
 objective(b,key+'_final','Recovery console',centers[b][2],ac,ev,all_on([f,s],say(q['prompt'])+choice([(q['answers'][0],success),(q['answers'][1],say('The records contradict that choice. Review the two clues; nothing has been changed.')),('Leave',[])]),say('The console requires both first-floor records.')), 'Evidence recovered. Return to '+q['npc']+'.')
 event(b,key+'_hint','Operator instructions',*centers[b][0],say(q['a']+' '+q['b']))
 track=branch([0,done,0],say('COMPLETED. Reward claimed. '+q['ending']),branch([0,ev,0],say('Return to '+q['npc']+' for your reward.'),branch([0,ac,0],say(reminder),say('Speak to '+q['npc']+' at '+infos[q['hub']]['name']+'.'))))
 tracks.append((q['title'],track))
while len(system['switches'])<=max(SWITCHES):system['switches'].append('')
for sid,name in SWITCHES.items():system['switches'][sid]=name
assert len(items)<=152 or not items[152]
while len(items)<=152:items.append(None)
items[152]=copy.deepcopy(items[151]);items[152].update(id=152,name='Expedition Notes',description='Room clues and objectives for six maze expeditions.\nReusable: Key Items, then confirm the party.',effects=[dict(code=44,dataId=6,value1=0,value2=0)])
assert len(commons)<=6 or not commons[6]
while len(commons)<=6:commons.append(None)
commons[6]=dict(id=6,name='Expedition Notes',trigger=0,switchId=1,list=choice([('Names, repairs, freight',choice(tracks[:3]+[('Close',[])])),('Tides, sleep, heating',choice(tracks[3:]+[('Close',[])])),('Close',[])])+[C(0)])
# New passages refer to the new notebook, leaving all earlier content untouched.
for key,(mid,eid) in refs.items():
 for p in maps[mid]['events'][eid]['pages']:
  for cmd in p['list']:
   if cmd['code']==401:cmd['parameters'][0]=cmd['parameters'][0].replace('Dungeon Field Notes','Expedition Notes')
exec((HERE/'split_rooms.py').read_text())
for mid in changed:(STAGE/f'Map{mid:03}.json').write_text(json.dumps(maps[mid],separators=(',',':'))+'\n')
for name,obj in [('MapInfos',infos),('System',system),('Items',items),('CommonEvents',commons),('Tilesets',tilesets)]: (STAGE/f'{name}.json').write_text(json.dumps(obj,separators=(',',':'))+'\n')
manifest=dict(changed=sorted(changed),newMaps=new_ids,events=refs,routes=routes,switches=SWITCHES,quests=quests,layouts=layouts,roomLinks=room_links)
(HERE/'manifest.json').write_text(json.dumps(manifest,indent=2)+'\n')
print(f'Staged {len(layouts)} levels, 108 separate room maps, {len(refs)} events and six quests.')

