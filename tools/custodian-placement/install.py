"""Extend live dungeons using intact, already painted room templates."""
import copy,json,textwrap
from pathlib import Path
from zipfile import ZipFile
R=Path(__file__).resolve().parents[2];P=Path(__file__).resolve().parent
def read(p):return json.loads((R/p).read_text(encoding='utf-8-sig'))
def write(p,d):(R/p).write_text(json.dumps(d,ensure_ascii=False,separators=(',',':')),encoding='utf-8')
infos=read('data/MapInfos.json');system=read('data/System.json');tilesets=read('data/Tilesets.json')
bosses=read('tools/custodians/manifest.json')['enemies'];stories=read('tools/miniboss-stories/stories.json');quests=read('tools/mazes/manifest.json')['quests'];songs=read('tools/miniboss-stories/troop-song-pages.json')
if any(i and i['name']=='Custodian Service Junction' for i in infos):raise SystemExit('Already placed; do not republish the baseline.')
parents={b['futureMap']:read(f"data/Map{b['futureMap']:03}.json") for b in bosses}
with ZipFile(P/'before-placement.zip','x') as z:
 for mid in parents:z.write(R/f'data/Map{mid:03}.json',f'data/Map{mid:03}.json')
 for name in ['MapInfos','System']:z.write(R/f'data/{name}.json',f'data/{name}.json')
 z.write(R/'tools/custodians/manifest.json','tools/custodians/manifest.json')
startmap=len(infos);startswitch=len(system['switches'])
assert startmap==224 and startswitch==168,'Live IDs changed; inspect before allocation.'
def cmd(code,params=None,indent=0):return dict(code=code,indent=indent,parameters=params or [])
def say(text,indent=0):
 lines=textwrap.wrap(text,43,break_long_words=False,break_on_hyphens=False);out=[]
 for i in range(0,len(lines),4):out += [cmd(101,['',0,0,2],indent)]+[cmd(401,[line],indent) for line in lines[i:i+4]]
 return out
basepage=copy.deepcopy(parents[127]['events'][2]['pages'][0])
def page(commands,switch=None,image='!SF_Switch1',priority=1):
 p=copy.deepcopy(basepage);p['list']=commands+[cmd(0)];p['image']['characterName']=image;p['priorityType']=priority
 if switch:p['conditions'].update(switch1Valid=True,switch1Id=switch)
 return p
def event(m,name,xy,pages):
 e=dict(id=len(m['events']),name=name,note='Custodian placement',x=xy[0],y=xy[1],pages=pages);m['events'].append(e);return e['id']
def transfer(mid,xy,indent=0):return cmd(201,[0,mid,xy[0],xy[1],2,0],indent)
def branch(switch,yes,no):return [cmd(111,[0,switch,0])]+[dict(c,indent=c['indent']+1) for c in yes]+[cmd(411)]+[dict(c,indent=c['indent']+1) for c in no]+[cmd(412)]
def open_tile(m,x,y):
 if not(0<=x<m['width'] and 0<=y<m['height']):return False
 flags=tilesets[m['tilesetId']]['flags'];w=m['width'];h=m['height']
 for z in [3,2,1,0]:
  f=flags[m['data'][(z*h+y)*w+x]]
  if f&16:continue
  return (f&15)==0
 return False
def free(m,preferred,used):
 cells=[(x,y) for y in range(4,m['height']-4) for x in range(4,m['width']-4) if open_tile(m,x,y) and (x,y) not in used]
 assert cells,'No free floor';xy=min(cells,key=lambda a:abs(a[0]-preferred[0])+abs(a[1]-preferred[1]));used.add(xy);return xy
newmaps={};records=[]
def room(mid,template,name,parent):
 m=copy.deepcopy(template);m.update(displayName=name,events=[None],encounterList=[],note='Custodian extension; existing painted room template. Local, reversible transfer routes.',specifyBattleback=True,battleback1Name='Factory',battleback2Name='SF_WarehouseDistrict');newmaps[mid]=m
 infos.append(dict(id=mid,expanded=False,name=name,order=mid,parentId=parent,scrollX=0,scrollY=0));return m
for i,(b,s,q) in enumerate(zip(bosses,stories,quests)):
 pm=b['futureMap'];parent=parents[pm];arenaid=startmap+i*2;serviceid=arenaid+1;flag=startswitch+i;system['switches'].append(s['mandate']+' mandate - '+b['name']+' defeated')
 center=(parent['events'][1]['x'],parent['events'][1]['y']);used={(e['x'],e['y']) for e in parent['events'] if e}
 hatch=free(parent,(center[0]+2,center[1]),used)
 # Separate local chamber and service room, each with a permanent return route.
 arena=room(arenaid,parent,b['name']+' - Custodian Chamber',pm)
 service=room(serviceid,parent,s['mandate']+' - Service Annex',arenaid)
 spawn=(center[0],center[1]+1);assert open_tile(arena,*spawn)
 taken={spawn};bossxy=free(arena,(center[0],center[1]-1),taken);exitxy=free(arena,(4,center[1]),taken);gatexy=free(arena,(center[0]+2,center[1]),taken)
 access=say('Custodian access: '+b['name']+'. Recover the evidence at this room\'s console first. Either disclosure choice qualifies.')
 ready=say('Custodian chamber: '+b['name']+'. The original return passages remain open.')+[transfer(arenaid,spawn)]
 hid=event(parent,'Custodian access - '+b['name'],hatch,[page(access),page(ready,q['evidence']),page(ready,q['complete'])])
 event(arena,'Return to recovery room',exitxy,[page([transfer(pm,center)],image='!SF_Door1',priority=0)])
 fight=[cmd(108,[f'<ME_CustodianMap: {b["key"]}>'])]+say(s['intro'])+say('The custodian warns, attacks next round, then recovers. You can retreat from battle. Losing returns you here, treated and alive.')
 fight += [cmd(102,[['Challenge custodian','Leave'],1,0,2,0]),cmd(402,[0,'Challenge custodian']),cmd(301,[0,b['troopId'],True,True],1),cmd(601,indent=1),cmd(121,[flag,flag,0],2)]
 if b['song']:fight += [dict(c,indent=c['indent']+2) for c in songs[b['song']]['victoryBranchCommands']]
 else:fight += say(s['defeat'],2)
 fight += say(s['aftermath'],2)+[cmd(125,[0,0,200+i*25],2)]+say(f"{s['mandate']} mandate recovered. The service annex is open. Received {200+i*25} credits.",2)
 fight += [cmd(602,indent=1)]+say('You withdraw. The custodian still controls the annex.',2)+[cmd(603,indent=1),cmd(314,[0,0],2)]+say('The emergency station patches you up. No mandate was recovered. The return passage is open.',2)+[cmd(604,indent=1),cmd(402,[1,'Leave']),cmd(404)]
 bid=event(arena,b['name'],bossxy,[page(fight,image=''),page(say('Custodian disabled. '+s['mandate']+' authority belongs to the residents. The annex remains open.'),flag,image='!SF_Switch1')])
 gid=event(arena,s['mandate']+' service interlock',gatexy,[page(say('Access denied: the custodian retains the '+s['mandate']+' mandate.'),image='!SF_Door1'),page([transfer(serviceid,spawn)],flag,image='!SF_Door1',priority=0)])
 event(service,'Return to custodian chamber',exitxy,[page([transfer(arenaid,spawn)],image='!SF_Door1',priority=0)])
 message=s['aftermath']+' Credentials travel with the party. The service junction is on MegaEarth beneath Rivet Commons; use existing planetary travel to get there.'
 event(service,'Restored service record',bossxy,[page(say(message))])
 event(service,'Emergency treatment station',gatexy,[page(say('The maintenance clinic no longer requires a subscription. HP and MP restored.')+[cmd(314,[0,0])])])
 records.append(dict(key=b['key'],name=b['name'],mandate=s['mandate'],parent=pm,hatchEvent=hid,hatch=list(hatch),returnLanding=list(center),arena=arenaid,service=serviceid,spawn=list(spawn),bossEvent=bid,bossPosition=list(bossxy),gateEvent=gid,exitPosition=list(exitxy),flag=flag,evidence=q['evidence'],complete=q['complete'],troop=b['troopId'],reward=200+i*25))
# Shared junction is on MegaEarth. Credentials, never walking corridors, cross planets.
junctionid=startmap+12;vestibuleid=startmap+13
junction=room(junctionid,parents[145],'Custodian Service Junction',108)
vestibule=room(vestibuleid,parents[145],'NeuraTech Core - Service Vestibule',junctionid)
def require_flags(flags,success,label):
 expression=' && '.join(f'$gameSwitches.value({n})' for n in flags)
 return [cmd(111,[12,expression])]+[dict(c,indent=c['indent']+1) for c in success]+[cmd(411)]+say(label,1)+[cmd(412)]
for record,flags in [(records[1],[168,169]),(records[4],[170,171])]:
 service=newmaps[record['service']];used={(e['x'],e['y']) for e in service['events'] if e}|{tuple(record['spawn'])}
 xy=free(service,(record['spawn'][0]+2,record['spawn'][1]+1),used)
 label='Required mandates: '+', '.join(records[n-168]['mandate'] for n in flags)+'. Both must be recovered.'
 eid=event(service,'MegaEarth junction approach',xy,[page(require_flags(flags,say('The service lift descends to the Rivet Commons junction.')+[transfer(junctionid,(7,8))],label),image='!SF_Door1')]);record['junctionEvent']=eid
for record,xy in [(records[1],(4,7)),(records[4],(9,7))]:
 event(junction,'Return: '+record['mandate']+' annex',xy,[page(require_flags([record['flag']],[transfer(record['service'],record['spawn'])],'That annex remains under custodian control.'),image='!SF_Door1',priority=0)])
status="var names="+json.dumps([r['mandate'] for r in records])+"; var missing=names.filter(function(n,i){return !$gameSwitches.value(168+i);}); $gameMessage.add('SERVICE MANDATES'); if(!missing.length){$gameMessage.add('All six recovered. Vestibule authorized.');} else {missing.forEach(function(n){$gameMessage.add('Missing: '+n);});}"
event(junction,'Mandate status terminal',(7,6),[page([cmd(355,[status])])])
finalgate=event(junction,'Core service vestibule authorization',(7,4),[page(require_flags(list(range(168,174)),say('All six legacy mandates verified. The local maintenance shuttle runs to the Core service vestibule.')+[transfer(vestibuleid,(7,8))],'All six mandates are required. Check the status terminal for missing credentials.'),image='!SF_Door1')])
event(vestibule,'Return maintenance shuttle',(4,7),[page([transfer(junctionid,(7,8))],image='!SF_Door1',priority=0)])
event(vestibule,'Protocol Zero service record',(7,6),[page(say('A.S.P. SERVICE ORDER: Wellness intake, identity licensing, sleep allocation and utility rationing feed one network. Protocol Zero will turn those subscriptions into compulsory neural control.')+say('The six custodians supplied the network. Their mandates grant service access, not control of A.S.P. The Necklace remains the interface needed for the final confrontation.'))])
event(vestibule,'Sealed inner Core access',(9,7),[page(say('INNER CORE: separate main-story access required. The service vestibule is secured. Return to the party\'s Necklace and Core investigation; this terminal does not choose an ending.'),image='!SF_Door1')])
for mid,m in {**parents,**newmaps}.items():write(f'data/Map{mid:03}.json',m)
write('data/MapInfos.json',infos);write('data/System.json',system)
manifest=dict(bosses=records,newMaps=list(newmaps),junction=junctionid,vestibule=vestibuleid,finalGate=finalgate,firstSwitch=startswitch,lastSwitch=startswitch+5)
write('tools/custodian-placement/manifest.json',manifest)
old=read('tools/custodians/manifest.json');old['mapEncountersInstalled']=True;old['placementManifest']='tools/custodian-placement/manifest.json';write('tools/custodians/manifest.json',old)
print(json.dumps(manifest,indent=2))
