"""A01/A03/A08/A09/A10/A11; append-only content with an original snapshot."""
import json,copy,zipfile,re,textwrap
from pathlib import Path
OUT=Path('tools/high-value-additions')
files=['Items','Skills','Weapons','Actors','Enemies','States','MapInfos','Map003','Map105','Map108','Map110']
with zipfile.ZipFile(OUT/'before.zip','x',zipfile.ZIP_DEFLATED) as z:
 for n in files:z.write('data/'+n+'.json')
 for n in ['js/plugins.js','img/system/IconSet.png']:z.write(n)
def load(n):return json.loads(Path('data/'+n+'.json').read_text(encoding='utf-8'))
def save(n,d):Path('data/'+n+'.json').write_text(json.dumps(d,ensure_ascii=False,separators=(',',':')),encoding='utf-8')
D={n:load(n) for n in files};it=D['Items'];sk=D['Skills'];we=D['Weapons'];ac=D['Actors'];st=D['States'];en=D['Enemies']
assert len(it)==165 and len(sk)==255 and len(we)==73 and len(st)==76
manifest={'items':[],'skills':[],'recipes':[],'scope':['A01','A03','A08','A09','A10','A11']}
def effect(code,n,v=1,v2=0):return dict(code=code,dataId=n,value1=v,value2=v2)
def item(name,desc,icon,effects,price=30,scope=7,animation=200,occasion=0):
 o=copy.deepcopy(it[157]);o.update(id=len(it),name=name,description=desc,iconIndex=icon,effects=effects,price=price,scope=scope,animationId=animation,occasion=occasion,note='');it.append(o);manifest['items'].append(dict(id=o['id'],name=name));return o
cures=[('Acme Herpicin',27,'Ointment. Your insurer still considers skin optional.'),('Acme Retroviral Relief',28,'Clears the combat ailment. Coverage sold separately.'),('Acme Gon-A-Gone',29,'One less burning issue for the complaints desk.'),('Acme Syph-Off',30,'Restores accuracy. Cannot correct management.'),('Acme Clapback',31,'Applause for surviving the wellness programme.')]
for k,(name,n,joke) in enumerate(cures):item(name,'Removes '+st[n]['name']+'. '+joke,2080+k,[effect(22,n)],25)
item('Green Herb','Restores 80 HP; clears Poison. Legal until it helps someone.',2085,[effect(11,0,0,80),effect(22,4)],25,animation=49)
# Explicit combat-ailment list, never inferred from names or numerical ranges at runtime.
cleanse=[4,5,6,7,8,9,10,11,13,21,22,25,26,27,28,29,30,31,32,33,34,35,36,39,42,47,48,49,50,51,52,53,54,55,60,61,62,63,64,65,66,67,72,73,74,75,76]
item('Panacea','Clears listed combat ailments, including parasite bonuses. No revival or plot-state removal.',2086,[effect(22,n) for n in cleanse],120)
item('Probably Not Poison','50%: +150 HP. 25%: +30 MP. 25%: Queasy (3% HP loss, 3 turns). One ally; battle only.',2087,[],15,animation=200,occasion=1)['note']='<ME Dubious Potion>'
# Mild, finite bad outcome. Existing Poison is intentionally not reused.
o=copy.deepcopy(st[27]);o.update(id=76,name='Queasy',iconIndex=2087,traits=[dict(code=22,dataId=0,value=-.03)],message1=' feels queasy!',message2=' feels queasy!',message4=' settles down.',note='Dubious potion: 3 turns; Green Herb, Panacea, Clinical Flush or Pathogen Purge.');st.append(o)
for obj in [it[170],it[157],sk[211]]:obj['effects'].append(effect(22,76))
it[170]['description']='Restores 80 HP; clears Poison and Queasy. Legal until it helps someone.'
def skill(name,desc,icon,animation,effects,scope=1,hit=2,mp=4,formula='0',dtype=0,stype=2):
 o=copy.deepcopy(sk[199]);o.update(id=len(sk),name=name,description=desc,iconIndex=icon,animationId=animation,effects=effects,scope=scope,hitType=hit,mpCost=mp,tpCost=0,repeats=1,stypeId=stype,note='',requiredWtypeId1=0,requiredWtypeId2=0);o['damage']=dict(type=dtype,elementId=0,formula=formula,variance=0,critical=False);sk.append(o);manifest['skills'].append(dict(id=o['id'],name=name));return o
# Five actual hostile application paths; zero-MP variants work for ordinary enemies.
for k,((_,sid,_),enemy,anim) in enumerate(zip(cures,[41,38,11,94,67],[188,191,189,190,204])):
 o=skill(['Herpetic Sample','Retroviral Invoice','Gonococcal Spray','Spirochete Static','Claptrap Culture'][k],'45% '+st[sid]['name']+' for 3 turns. Use the matching Acme cure or Pathogen Purge.',st[sid]['iconIndex'],anim,[effect(21,sid,.45)],mp=0)
 en[enemy]['actions'].append(dict(skillId=o['id'],rating=4,conditionType=1,conditionParam1=2,conditionParam2=4))
 # Thrown samples give players a source without broadening every class's skill list.
 item(['Herpes Sample','Retroviral Sample','Gonorrhea Sample','Syphalis Sample','Clap Sample'][k],'60% '+st[sid]['name']+' for 3 turns on one enemy. Boss resistance applies.',st[sid]['iconIndex'],[effect(21,sid,.6)],35,scope=1,animation=anim,occasion=1)['hitType']=2
# Personal abilities: live actor traits grant on existing saves as well as new games.
ninja=[(5,'Smoke Severance','70% Blind for 3 turns? Uses the existing Blind duration. Cuts visibility, not severance pay.',2088,199,[effect(21,5,.7)],1,2,4,'0',0),
(5,'Cut the Feed','Damage and 65% Packet Loss for 2 turns. Unsubscribe with a blade.',2089,198,[effect(21,62,.65)],1,2,6,'Math.max(1,a.atk*2-b.def)',1),
(6,'Blue Crosscut','Two precise cuts at one enemy. Each strike uses ATK against DEF.',2090,7,[],1,1,5,'Math.max(1,a.atk*1.8-b.def)',1),
(6,'Hold the Line','Gain Dermal Plating and Reflex Cache for 3 turns. No shield required.',2091,194,[effect(21,58),effect(21,69)],11,0,7,'0',0),
(7,'Field Dressing','Restore 100 + MAT HP; remove Bleed and Poison from one ally.',2092,200,[effect(22,22),effect(22,4)],7,0,5,'100+a.mat',3),
(7,'Mutual Aid','One ally gains Adrenal Surge for 3 turns; clears Stapled and Enfeebled.',2093,192,[effect(21,56),effect(22,48),effect(22,60)],7,0,6,'0',0)]
for actor,name,desc,icon,anim,eff,scope,hit,mp,formula,dt in ninja:
 if name=='Smoke Severance':desc='70% Blind: lowers hit rate for its normal duration. No severance pay.'
 o=skill(name,desc,icon,anim,eff,scope,hit,mp,formula,dt);o['repeats']=2 if name=='Blue Crosscut' else 1;ac[actor]['traits'].append(dict(code=43,dataId=o['id'],value=1))
for actor,role in [(5,'Disruption: Smoke Severance and Cut the Feed.'),(6,'Combat: Blue Crosscut and Hold the Line.'),(7,'Support: Field Dressing and Mutual Aid.')]:
 ac[actor]['profile']=role+' Blades and throwing weapons; dual wield.'
 # Make the two auto-battle ninjas selectable so ally support and personal choices are usable.
 ac[actor]['traits']=[t for t in ac[actor]['traits'] if not(t['code']==62 and t['dataId']==0)]
# Fixed upgrades preserve weapon type and approved motion/scale, not recursive stat growth.
for base,source,name,icon,atk,cost,desc,formula,eff,tp in [
 (66,190,'Union Rubber Chicken',2094,12,180,'Useful damage; drains 20 target TP and grants 10 user TP. Collective honking.','a.atk*3-b.def*1.5',[effect(13,0,-20)],10),
 (68,192,'Reinforced Safety Brick',2095,20,240,'Slow throw; attempts DEF down for 2 turns and 35% Armor Fracture for 3.','a.atk*4-b.def*2',[effect(32,3,2),effect(21,61,.35)],0),
 (61,185,'Tenured Stapler',2096,16,220,'50% Stapled for 2 turns. Your dismissal has been permanently attached.','a.atk*4-b.def*2',[effect(21,48,.5)],0)]:
 s=copy.deepcopy(sk[source]);s.update(id=len(sk),name=name,description=desc,iconIndex=icon,effects=eff,tpGain=tp);s['damage']['formula']=formula;sk.append(s);manifest['skills'].append(dict(id=s['id'],name=name))
 w=copy.deepcopy(we[base]);w.update(id=len(we),name=name,description=desc,iconIndex=icon,price=we[base]['price']+cost,note=f'<skill_id:{s["id"]}>');w['params'][2]=atk;we.append(w);manifest['recipes'].append(dict(base=base,result=w['id'],cost=cost,skill=s['id']))
# Native event helpers.
def C(code,*p):return dict(code=code,indent=0,parameters=list(p))
def nested(cmds):return [dict(c,indent=c['indent']+1) for c in cmds]
def say(s):
 lines=textwrap.wrap(s,44);out=[]
 for n in range(0,len(lines),4):out += [C(101,'',0,0,2)]+[C(401,l) for l in lines[n:n+4]]
 return out
def branch(expr,yes,no=[]):return [C(111,12,expr)]+nested(yes)+([C(411)]+nested(no) if no else [])+[C(412)]
def choices(entries):
 out=[C(102,[n for n,_ in entries],len(entries)-1,0,2,0)]
 for i,(n,commands) in enumerate(entries):out += [C(402,i,n)]+nested(commands)+[dict(C(0),indent=1)]
 return out+[C(404)]
def addshop(m,e,goods):
 L=D[f'Map{m:03}']['events'][e]['pages'][0]['list'];idx=next(i for i,c in enumerate(L) if c['code']==302)+1
 while idx<len(L) and L[idx]['code']==605:idx+=1
 L[idx:idx]=[C(605,*g) for g in goods]
addshop(105,5,[[0,i,0,0] for i in range(165,173)])
# Early remedy access; keep prior store merchandise.
for e in D['Map003']['events']:
 if e and any(c['code']==302 for c in e['pages'][0]['list']):addshop(3,e['id'],[[0,i,0,0] for i in range(165,173)])
addshop(105,4,[[0,i,0,0] for i in range(173,178)])
addshop(108,3,[[1,i,0,0] for i in [61,66,68]])
entries=[]
for r in manifest['recipes']:
 name=we[r['result']]['name'];expr=f'$gameParty.numItems($dataWeapons[{r["base"]}]) > 0 && $gameParty.gold() >= {r["cost"]} && $gameParty.numItems($dataWeapons[{r["result"]}]) < $gameParty.maxItems($dataWeapons[{r["result"]}])'
 entries.append((name, say(we[r['result']]['description'])+choices([(f'Exchange: {r["cost"]} Credits',branch(expr,[C(127,r['base'],1,0,1,False),C(125,1,0,r['cost']),C(127,r['result'],0,0,1,False)]+say('Upgrade complete. No subscription, no recurring amputation.'),say('Bring one UNEQUIPPED '+we[r['base']]['name']+', enough Credits, and room for the result.'))),('Cancel',[])])))
entries.append(('Leave',[]));e=D['Map108']['events'][2];e['pages'][0]['list']=e['pages'][0]['list'][:-1]+say('Fixed upgrades: one unequipped base weapon plus Credits. Chicken 180; brick 240; stapler 220. The bench sells base models.')+choices(entries)+[C(0)]
# Optional hatch beside an existing clue; lore and original quest instructions remain intact.
L=D['Map110']['events'][5]['pages'][0]['list'][:-1]
L+=say('A scratched label reads: FILTER BEFORE ENTRY. Having a body is a pre-existing condition. Maintenance keeps emergency supplies behind this panel.')
enter=[C(201,0,240,4,8,2,0)]
paid=branch('$gameParty.hasItem($dataItems[157])',[C(126,157,1,0,1)]+say('The purge sterilizes the intake. The service route is safe.')+enter,say('You need one Pathogen Purge. The market pharmacy sells it. You can leave safely.'))
L+=choices([('Use Third Eye',branch('$gameParty.hasItem($dataItems[134])',say('The lens reveals a clean bypass behind the billing overlay.')+enter,say('Bring the Third Eye Mod from Zed\'s clinic, or follow the scratched filter instructions.'))),('Inspect service controls',choices([('Flush intake: 1 Pathogen Purge',paid),('Override intake',say('The alarm refuses. The air is toxic; no one enters. Try the filter instruction.')),('Leave',[])])),('Leave',[])])+[C(0)]
D['Map110']['events'][5]['pages'][0]['list']=L
# Distinct compact L-shaped supply annex, native industrial tiles; no encounters or story switches.
assert not Path('data/Map240.json').exists()
m=copy.deepcopy(load('Map111'));w,h=16,13;m.update(width=w,height=h,displayName='Armatek - Excluded Body Storage',data=[0]*(w*h*6),events=[None],encounterList=[],note='A11 optional cache; no progression flags.',autoplayBgm=False,autoplayBgs=False)
walk={(x,y) for y in range(6,10) for x in range(3,8)}|{(x,y) for y in range(3,10) for x in range(7,13)}
# Autotile shaping copied from established dungeon tooling, never executing its old builder.
core=Path('js/rpg_core.js').read_text();FLOOR=json.loads(re.search(r'Tilemap.FLOOR_AUTOTILE_TABLE = (\[.*?\]);',core,re.S)[1])
def put(x,y,t,z=0):m['data'][(z*h+y)*w+x]=t
walls=set()
for x,y in walk:
 put(x,y,2912)
 for dx,dy in [(0,1),(-1,0),(1,0),(0,-1)]:
  if (x+dx,y+dy) not in walk:walls.add((x+dx,y+dy))
for x,y in walls:
 shape=sum(v for dx,dy,v in [(-1,0,1),(0,-1,2),(1,0,4),(0,1,8)] if (x+dx,y+dy) not in walls);put(x,y,6320+shape)
for x,y in walls:
 if (x,y-1) not in walk|walls and y>0:put(x,y-1,5936)
# Reuse reliable floor-edge shaping from the builder, isolated from its mutating top-level code.
source=Path('tools/dungeons/build_dungeons.py').read_text();fn=source[source.index('def autotile('):source.index('def newmap(')];ns={'maps':{240:m},'FLOOR':FLOOR,'put':lambda mid,x,y,t,z=0:put(x,y,t,z)};exec(fn,ns);ns['autotile'](240,2912);ns['autotile'](240,5936)
def event(n,name,x,y,cmds,sprite='!SF_Switch1',index=0):
 e=copy.deepcopy(load('Map111')['events'][1]);e.update(id=n,name=name,x=x,y=y,note='High-value A11');p=e['pages'][0];p['image'].update(characterName=sprite,characterIndex=index);p['list']=cmds+[C(0)];return e
m['events'].append(event(1,'Exit to Meter Galleries',3,8,[C(201,0,110,16,14,2,0)]))
ch=event(2,'Excluded-body emergency supplies',11,4,say('ACME DENIAL: Body present before policy began. Supplies reassigned to the nearest executive. You reassign them again.')+[C(126,171,0,0,1),C(126,170,0,0,2),C(125,0,0,90),C(123,'A',0)]+say('Recovered 1 Panacea, 2 Green Herbs and 90 Credits.'),'!SF_Chest')
p=copy.deepcopy(ch['pages'][0]);p['conditions']['selfSwitchValid']=True;p['image']['direction']=8;p['list']=say('The emergency cabinet is empty.')+[C(0)];ch['pages'].append(p);m['events'].append(ch)
m['events'].append(event(3,'Corporate exclusions plaque',10,8,say('Armatek has outsourced maintenance to whoever still has lungs. The Third Eye sees the safe duct; the filter controls provide another way. Neither route opens the organ registry.')))
save('Map240',m)
while len(D['MapInfos'])<=240:D['MapInfos'].append(None)
D['MapInfos'][240]=dict(id=240,expanded=False,name=m['displayName'],order=240,parentId=110,scrollX=0,scrollY=0)
for i in [115,117]+list(range(142,152)):
 for n in range(27,32):
  if not any(t['code'] in [13,14] and t['dataId']==n for t in en[i]['traits']):en[i]['traits'].append(dict(code=13,dataId=n,value=.5))
for n,d in D.items():save(n,d)
manifest.update(potion=172,queasy=76,panaceaStates=cleanse,annex=240,ninjaSkills=list(range(260,266)),diseaseSkills=list(range(255,260)),sampleItems=list(range(173,178)),animationContract='Native MV target-relative effects; existing approved animation IDs/sizes, no new projectile scaling or shared battle-core changes.')
(OUT/'manifest.json').write_text(json.dumps(manifest,indent=2),encoding='utf-8')
print('Built six additions; items165-177, skills255-268, weapons73-75, state76, optional map240.')
