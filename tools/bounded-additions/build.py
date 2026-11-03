"""A13/A16/A19/A21/A22: finite native MV additions; no campaign gates."""
import json,copy,zipfile,math,textwrap,re
from pathlib import Path
from collections import deque
OUT=Path('tools/bounded-additions')
def load(n):return json.loads(Path('data/'+n+'.json').read_text(encoding='utf-8'))
names=['Items','Skills','States','Animations','Classes','Enemies','System','CommonEvents','Map103','Map105','Map108','Map110','Map112','Map114','Map106','Map244']
D={n:load(n)for n in names}
with zipfile.ZipFile(OUT/'before.zip','x',zipfile.ZIP_DEFLATED)as z:
 for n in D:z.write('data/'+n+'.json')
 for n in ['img/system/IconSet.png','js/plugins/ME_FieldGuide.js']:z.write(n)
it,sk,st,an,cl,en=[D[n]for n in['Items','Skills','States','Animations','Classes','Enemies']]
assert[len(it),len(sk),len(st),len(an),len(D['System']['switches']),len(D['CommonEvents'])]==[180,269,77,220,191,9]
D['System']['switches']+=['Recycling - six named parts exchanged','Off-clock jokes - cookbook claimed','Machine letter - delivered to canteen']
def ef(c,n,v=1,v2=0):return dict(code=c,dataId=n,value1=v,value2=v2)
def tr(c,n,v):return dict(code=c,dataId=n,value=v)
def key(name,desc,icon,ce=None):
 o=copy.deepcopy(it[179]);o.update(id=len(it),name=name,description=desc,iconIndex=icon,note='Bounded side content',occasion=2 if ce else 3,scope=0,effects=[ef(44,ce)]if ce else[]);it.append(o);return o
parts=['Dead Relay','Crushed Servo','Spent Power Cell','Contaminated Sensor','Cracked Coolant Filter','Soot-Clogged Optics']
for k,name in enumerate(parts):key(name,'One of six named recycling parts.\nBring the complete set to Beryl in Rivet Commons.',2105+k)
jokes=[('Joint Venture','My employer called my elbows a joint venture.\nNow they want seventy percent of the bend.'),('Pre-Existing Body','My insurer found my pre-existing condition:\nI existed before I could afford insurance.'),('Free Trial','The company gave me a free trial of happiness.\nIt expired during the loading screen.')]
for k,(name,desc)in enumerate(jokes):key('Joke Card: '+name,desc,2111+k,9)
key('Off-Clock Cookbook','Three recipes from the workers\' canteen.\nRead through the reusable Off-Clock Scrapbook.',2114,9)
key('Off-Clock Scrapbook','Tracks six recycling parts, three jokes and\none machine letter. Includes outfit clues.',2115,9)
key('Microwave Love Letter','A vending machine\'s letter to the microwave.\nDeliver it to the Last Shift Canteen steward.',2116)
# Three bounded combat states; timing and target scope are explicit.
for k,(name,turns,restriction,traits,desc)in enumerate([
 ('Paralysis',2,4,[],'Cannot act for 2 turn counters; clears at battle end.'),
 ('Temporal Stasis',1,4,[],'Cannot act for the remainder of this turn; clears at turn end.'),
 ('Stone Skin',3,0,[tr(23,6,.75),tr(21,6,.85)],'Physical damage received -25%; AGI -15% for 3 turns.')]):
 s=copy.deepcopy(st[52]);s.update(id=77+k,name=name,iconIndex=2117+k,minTurns=turns,maxTurns=turns,restriction=restriction,traits=traits,autoRemovalTiming=2,removeAtBattleEnd=True,removeByDamage=False,message1=' gains '+name+'!',message2=' gains '+name+'!',message4=' is free of '+name+'.',note=desc);st.append(s)
# Five unique native animations, with consistently sized packed props and one effect application.
motions=[('Nerve Clamp',17,12),('Borrowed Second',18,13),('Stone Skin',19,14),('Release Motor Lock',20,15),('Shed Stone',21,22)]
for k,(name,primary,accent)in enumerate(motions):
 frames=[]
 for f in range(12):
  t=f/11;cells=[[-1,0,0,100,0,False,0,0]for _ in range(16)]
  if k==0:cells[0]=[primary,round(72*(1-min(1,t*1.6))),-18,30,round(-20+40*t),False,255 if f<8 else max(0,255-(f-7)*60),0]
  elif k==1:cells[0]=[primary,0,-25,30,round(t*180),False,255 if f<9 else max(0,255-(f-8)*80),0]
  elif k==2:cells[0]=[primary,0,round(30-45*t),32,0,False,round(255*math.sin(math.pi*(.15+.8*t))),0]
  elif k==3:cells[0]=[primary,round(35*math.cos(t*math.pi)),round(-20-20*math.sin(t*math.pi)),30,round(t*45),False,255 if f<9 else max(0,255-(f-8)*80),0]
  else:cells[0]=[primary,0,round(-20+65*t),30,round(t*25),False,max(0,255-round(t*255)),0]
  if 5<=f<=9:cells[1]=[accent,0,0,30,0,False,200-(f-5)*35,0]
  frames.append(cells)
 an.append(dict(id=220+k,name=name+' - bounded effect',animation1Name='ME_BoundedAdditions',animation1Hue=0,animation2Name='',animation2Hue=0,frames=frames,position=1,timings=[dict(frame=0,flashColor=[255,255,255,0],flashDuration=0,flashScope=0,se=dict(name='Magic1',pan=0,pitch=110,volume=55))]))
def skill(name,desc,icon,animation,eff,scope=1,hit=2,mp=5,speed=0):
 o=copy.deepcopy(sk[199]);o.update(id=len(sk),name=name,description=desc,iconIndex=icon,animationId=animation,effects=eff,scope=scope,hitType=hit,mpCost=mp,tpCost=0,speed=speed,note='',stypeId=2,repeats=1);sk.append(o);return o
skill('Nerve Clamp','55% Paralysis: cannot act for 2 turn counters.\nNamed bosses are immune.',2122,220,[ef(21,77,.55)],mp=6)
skill('Borrowed Second','Very fast: 45% lock for this turn\'s remainder.\nNamed bosses are immune; no global time freeze.',2123,221,[ef(21,78,.45)],mp=9,speed=200)
skill('Stone Skin','One ally: physical damage -25%, AGI -15%.\nLasts 3 turns; removable with Shed Stone.',2124,222,[ef(21,79)],scope=7,hit=0,mp=6)
skill('Release Motor Lock','Clears Paralysis and Temporal Stasis\nfrom one ally.',2125,223,[ef(22,77),ef(22,78)],scope=7,hit=0,mp=4)
skill('Shed Stone','Removes Stone Skin from one ally,\nincluding its protection and AGI penalty.',2126,224,[ef(22,79)],scope=7,hit=0,mp=3)
skill('Break Stone','Removes Stone Skin from one foe.',2127,224,[ef(22,79)],hit=0,mp=4)
for source,enemy in[(269,8),(270,110),(271,63)]:
 o=copy.deepcopy(sk[source]);o.update(id=len(sk),name=o['name']+' (Enemy)',mpCost=0,tpCost=0,stypeId=0,scope=11 if source==271 else 1);sk.append(o)
 en[enemy]['actions'].append(dict(skillId=o['id'],rating=4,conditionType=1,conditionParam1=2 if source!=270 else 3,conditionParam2=4))
for c,skills in{1:[270,274],3:[269,271],4:[271,272,273],5:[269,273],6:[269,272,273],7:[269,272]}.items():
 for n in skills:cl[c]['traits'].append(tr(43,n,1))
for n in [115,117]+list(range(142,152)):
 for s in[77,78]:en[n]['traits'].append(tr(14,s,1))
for s in[77,78]:en[152]['traits'].append(tr(13,s,.5))
for name,desc,icon,states,price,anim in[
 ('Acme Motor Recall','Clears Paralysis and Temporal Stasis.\nYour limbs are no longer a discontinued service.',2120,[77,78],40,223),
 ('Acme Soft Reset','Removes Stone Skin, its protection\nand its AGI penalty from one ally.',2121,[79],30,224)]:
 o=copy.deepcopy(it[157]);o.update(id=len(it),name=name,description=desc,iconIndex=icon,price=price,animationId=anim,effects=[ef(22,n)for n in states],occasion=0);it.append(o)
for obj,states in[(sk[212],[77,78]),(sk[241],[77,78]),(it[158],[77,78]),(it[164],[77,78]),(it[171],[77,78]),(it[160],[77,78,79]),(sk[213],[79]),(sk[214],[79]),(sk[242],[79]),(it[159],[79])]:
 obj['effects'] += [ef(22,n)for n in states];obj['description']='Clears the listed conditions; see Field Guide\nfor exact coverage and ally/foe targets.'
# Native quest/event helpers and collision-aware placements, never execute old builders.
src=Path('tools/clown-court/build.py').read_text();ns={'load':load,'copy':copy,'textwrap':textwrap,'tiles':load('Tilesets'),'deque':deque};exec(src[src.index('def C('):src.index("m=D['Map010']")],ns)
C,nest,say,branch,choice,on,event,passable,flood=[ns[n]for n in['C','nest','say','branch','choice','on','event','passable','flood']]
def add(m,name,goal,cs,sprite='!SF_Chest',index=0):
 occupied={(e['x'],e['y'])for e in m['events']if e};areas=[flood(m,(x,y))for y in range(m['height'])for x in range(m['width'])if(x,y)not in occupied and any(passable(m,x,y,d)for d in[2,4,6,8])];area=max(areas,key=len)
 p=next(p for p in sorted(area-occupied,key=lambda p:(abs(p[0]-goal[0])+abs(p[1]-goal[1]),p[1],p[0]))if len(flood(m,next(iter(area-{p})),p))>=len(area)-1)
 e=event(m,name,*p,cs,sprite,index);e['note']='Bounded additions A13/A16/A19/A22';return e
book=branch('!$gameParty.hasItem($dataItems[190])',[C(126,190,0,0,1)])
manifest={'scope':['A13','A16','A19','A21','A22'],'pickups':[],'hazards':[],'jokes':[],'newStates':[77,78,79],'newSkills':list(range(269,278)),'animations':list(range(220,225))}
for k,(n,goal)in enumerate([(103,(23,8)),(105,(12,23)),(108,(4,3))]):
 m=D[f'Map{n:03}'];eid=len(m['events']);done=f'$gameSelfSwitches.value([{n},{eid},"A"])';grant=[C(126,180+k,0,0,1),C(123,'A',0)]+book+say('Recovered '+parts[k]+'. Beryl in Rivet Commons accepts the six-part recycling set. The scrapbook tracks the locations.')
 e=add(m,'Named recycling part - '+parts[k],goal,branch(done,say('This named recycling part has already been recovered.'),choice([('Recover named part',grant),('Leave',[])])));manifest['pickups'].append(dict(map=n,event=eid,item=180+k))
for k,(n,goal,sid,desc)in enumerate([(110,(28,22),54,'Corrosive nanites coat the rejected sensor.'),(112,(26,25),53,'Mite-infested coolant surrounds the cracked filter.'),(114,(8,6),52,'A biofilm warning covers the clogged air optics.')]):
 m=D[f'Map{n:03}'];eid=len(m['events']);item=183+k;done=f'$gameSelfSwitches.value([{n},{eid},"A"])';grant=[C(126,item,0,0,1),C(123,'A',0)]+book+say('Recovered '+parts[3+k]+'. This cache is now cleared; Beryl accepts it in the six-part set.')
 bare=[C(355,f'var target=$gameParty.leader();target.clearResult();if(!target.isStateResist({sid}) && Math.random()<0.5*target.stateRate({sid}))target.addState({sid});')]+branch(f'$gameParty.leader().isStateAffected({sid})',say('Your leader is affected by '+st[sid]['name']+'. Pathogen Purge, Clinical Flush or Panacea clears it; clinics can also provide Recovery.'),say('Your leader has no '+st[sid]['name']+' after the exposure check.'))+grant
 protected=branch('$gameParty.hasItem($dataItems[157])',[C(126,157,1,0,1)]+say('The purge sterilizes the cache. No exposure roll.')+grant,say('Bring one Pathogen Purge from a pharmacy, choose the exposure risk, or leave safely.'))
 interact=say('CAUTION: '+desc+' Recovering the part bare-handed risks '+st[sid]['name']+' on the party leader: 50% base chance multiplied by state resistance. Immunity applies. Use one Pathogen Purge to avoid exposure, or leave.')+choice([('Sterilize: 1 Pathogen Purge',protected),('Risk exposure and salvage',bare),('Leave untouched',[])])
 e=add(m,'Warning - '+st[sid]['name']+' salvage cache',goal,branch(done,say('Cache cleared. No further exposure.'),interact),'!SF_Switch1',0);manifest['hazards'].append(dict(map=n,event=eid,item=item,state=sid))
# Beryl keeps the complete existing hardware inventory and adds a finite named-parts exchange.
e=D['Map103']['events'][2];old=e['pages'][0]['list'][:-1]
requirements='[180,181,182,183,184,185].every(function(id){return $gameParty.hasItem($dataItems[id]);})'
trade=[C(126,n,1,0,1)for n in range(180,186)]+[C(126,171,0,0,1),C(125,0,0,250),on(191)]+say('Six named parts exchanged. Received 250 Credits and 1 Panacea. Nothing here is weighed against your Strength; Armatek already tried charging for gravity.')
exchange=branch('$gameSwitches.value(191)',say('The six-part salvage contract is settled. No duplicate payouts.'),say('Bring one each: Dead Relay, Crushed Servo, Spent Power Cell, Contaminated Sensor, Cracked Coolant Filter and Soot-Clogged Optics. Reward:250 Credits and1 Panacea. Three caches warn about exposure before you choose.')+book+choice([('Exchange the complete set',branch(requirements+' && $gameParty.numItems($dataItems[171])<$gameParty.maxItems($dataItems[171])',trade,say('Keep collecting, or make room for the Panacea. Your parts remain yours. Read the scrapbook for six exact source locations.'))),('Keep collecting',[])]))
e['pages'][0]['list']=choice([('Browse hardware',old),('Six-part recycling exchange',exchange),('Read Off-Clock Scrapbook',book+[C(117,9)]),('Leave',[])])+[C(0)]
# Three fixed joke-card sources. Cards remain readable after their reward is claimed.
for k,(n,eid)in enumerate([(103,5),(106,4),(244,3)]):
 e=D[f'Map{n:03}']['events'][eid];L=e['pages'][0]['list'];item=186+k;L[-1:-1]=say('I have a joke card for the canteen\'s off-clock collection. Three different cards earn the cookbook and100 Credits from the soup steward.')+choice([('Take the joke card',branch(f'$gameParty.hasItem($dataItems[{item}])',say('You already have this joke card.'),[C(126,item,0,0,1)]+book+say(jokes[k][1]))),('Leave it for now',[])])
 manifest['jokes'].append(dict(map=n,event=eid,item=item))
# Letter is archived even if the defective advice module was disabled.
e=D['Map244']['events'][6];e['pages'][0]['list'][-1:-1]=choice([('Print archived machine letter',branch('$gameSwitches.value(193)',say('The canteen already received the letter.'),branch('$gameSwitches.value(183)',branch('$gameParty.hasItem($dataItems[191])',say('You already carry the letter.'),[C(126,191,0,0,1)]+book+say('To the microwave: You make me hot without telling me to optimize my childhood. Yours, the vending machine. Deliver this to the Last Shift Canteen steward.')),say('Settle the uprising policy first. The archive works with either final policy.')))),('Leave',[])])
# Canteen steward retains the exact paid-rest service and handles two one-time collections.
e=D['Map106']['events'][2];old=e['pages'][0]['list'][:-1]
jokeReward=branch('$gameSwitches.value(192)',say('Your cookbook and joke stipend have been paid.'),say('Three unique joke cards: the Rivet welder, canteen pension auditor, and Mox at the SLF break room. Reward:Off-Clock Cookbook and100 Credits. The cards are yours to keep.')+book+choice([('Submit the three-card collection',branch('[186,187,188].every(function(id){return $gameParty.hasItem($dataItems[id]);}) && $gameParty.numItems($dataItems[189])<$gameParty.maxItems($dataItems[189])',[C(126,189,0,0,1),C(125,0,0,100),on(192)]+say('Received Off-Clock Cookbook and100 Credits. Read its three recipes from the scrapbook; these are canteen stories, not an unlimited food printer.'),say('Three different cards are required. Make room for the cookbook if needed. No cards are taken.'))),('Not yet',[])]))
letter=branch('$gameSwitches.value(193)',say('The microwave has your letter. It responded with a satisfied ding.'),branch('$gameParty.hasItem($dataItems[191]) && $gameParty.numItems($dataItems[9])<$gameParty.maxItems($dataItems[9])',[C(126,191,1,0,1),C(126,9,0,0,1),on(193)]+say('The steward pins the letter to the microwave. A vending machine has better boundaries than our employer. Received1 Energy Drink; the delivery is complete.'),say('Bring the archived SLF machine letter and space for1 Energy Drink. The archive is available after either uprising outcome.')))
e['pages'][0]['list']=choice([('Rest service',old),('Trade joke collection',jokeReward),('Deliver machine letter',letter),('Read Off-Clock Scrapbook',book+[C(117,9)]),('Leave',[])])+[C(0)]
# Scrapbook is native common-event reference with honest finite counts and exact leads.
count="[186,187,188].filter(function(id){return $gameParty.hasItem($dataItems[id]);}).length"
partsCount="[180,181,182,183,184,185].filter(function(id){return $gameParty.hasItem($dataItems[id]);}).length"
intro=[C(355,"$gameMessage.add('Joke cards: '+"+count+"+'/3. Recycling: '+($gameSwitches.value(191)?'6/6 exchanged':"+partsCount+"+'/6 collected')+'. Machine letter: '+($gameSwitches.value(193)?'delivered':($gameParty.hasItem($dataItems[191])?'carried':'not collected'))+'.');this.setWaitMode('message');")]
jokeRead=[]
for k,(title,desc)in enumerate(jokes):jokeRead+=branch(f'$gameParty.hasItem($dataItems[{186+k}])',say(title+': '+desc),say('Missing '+title+': '+['Rivet Commons community welder.','Last Shift Canteen pension auditor.','Mox in the Snack Liberation Front break room.'][k]))
recipes=branch('$gameParty.hasItem($dataItems[189])',say('HOT LINKS: Heat until the union rep stops arguing with the packaging. Existing Hot Links restore100 HP. BURRITO: Wrap yesterday\'s failure in today\'s optimism. Spicy Burrito restores150 HP. ENERGY DRINK: Shake the can, not the employee. Restores30 MP. The recipes are stories; buy the prepared items.'),say('Collect the three joke cards and visit the Last Shift Canteen soup steward for the cookbook.'))
recycleClues=say('Six sources: Rivet salvage yard loose relay; Newtown market crushed servo; shared workshop spent cell; Underworks warning cache; Condensation Catacombs warning cache; Unpaid Shift warning cache. Beryl in Rivet Commons exchanges the set once for250 Credits and1 Panacea. Hazard caches are optional interactions with resistance-aware exposure or a sterilizing purge.')
outfits=say('Local disguise reactions: equip Hard Hat50 and Work Boots51 on the SAME walking party member for a work-crew outfit. Coolt White Helmet58 plus Protective Vest59 on the SAME member forms an inspector outfit. Pants Witness Protection sells these four pieces. Forewoman Latch, the reclamation magistrate and pension auditor notice them. Comments change; quest authority does not.')
letterRead=branch('$gameSwitches.value(193)',say('Delivered to the canteen microwave. One grateful ding; one Energy Drink rewarded.'),branch('$gameParty.hasItem($dataItems[191])',say('To the microwave: You make me hot without telling me to optimize my childhood. Deliver to the Last Shift Canteen soup steward.'),say('After resolving the vending uprising either way, print the archived letter from the SLF fridge manifesto board.')))
D['CommonEvents'].append(dict(id=9,name='Read Off-Clock Scrapbook',trigger=0,switchId=1,list=intro+choice([('Read collected jokes',jokeRead),('Read cookbook',recipes),('Machine letter',letterRead),('Recycling checklist',recycleClues),('Outfit clues',outfits),('Close',[])])+[C(0)]))
# Two actual outfits checked on one visible party member, at exactly three selected NPCs.
work='$gameParty.battleMembers().some(function(a){return [50,51].every(function(id){return a.equips().indexOf($dataArmors[id])>=0;});})'
inspect='$gameParty.battleMembers().some(function(a){return [58,59].every(function(id){return a.equips().indexOf($dataArmors[id])>=0;});})'
reactions=[(103,11,'Good boots. Management\'s safety policy is currently a chalk outline. At least you look ready to help.','White helmet, official vest. If you came to repossess a spleen, take a number and explain yourself.'),(105,7,'Maintenance crew? Excellent. The lake has been leaking into the invoices again.','Inspector cosplay. I can offer a greeting, not a jurisdiction upgrade. Show the same evidence as everybody else.'),(106,4,'Hard hat and boots. A proper working outfit; I hope the company has not leased your ankles.','That inspector outfit is immaculate. My pension is still payable in teeth. Try explaining the dress code to a molar.')]
for n,eid,w,i in reactions:
 for pg in D[f'Map{n:03}']['events'][eid]['pages']:pg['list']=branch(work,say(w),branch(inspect,say(i)))+pg['list']
L=D['Map103']['events'][3]['pages'][0]['list'];idx=next(i for i,c in enumerate(L)if c['code']==302)+1
while idx<len(L)and L[idx]['code']==605:idx+=1
L[idx:idx]=[C(605,2,n,1,p)for n,p in[(50,100),(51,90),(58,140),(59,180)]]
L[:0]=say('Work disguise: Hard Hat and Work Boots on one party member. Inspector disguise: Coolt White Helmet and Protective Vest together. Three local officials react; a uniform does not buy your case for you.')+book
# Stock the new removers alongside established pharmacy cures, preserving prices and stock.
L=D['Map105']['events'][5]['pages'][0]['list'];idx=next(i for i,c in enumerate(L)if c['code']==302)+1
while idx<len(L)and L[idx]['code']==605:idx+=1
L[idx:idx]=[C(605,0,192,0,0),C(605,0,193,0,0)]
# Register the new states in the live guide; all descriptions/removers remain database-derived.
p=Path('js/plugins/ME_FieldGuide.js');s=p.read_text(encoding='utf-8-sig').replace('68,69,70,71],','68,69,70,71,79],').replace('72,73,74,75],','72,73,74,75,77,78],');p.write_text(s,encoding='utf-8')
for n,d in D.items():Path('data/'+n+'.json').write_text(json.dumps(d,ensure_ascii=False,separators=(',',':')),encoding='utf-8')
manifest.update(parts=list(range(180,186)),jokeItems=list(range(186,189)),cookbook=189,scrapbook=190,letter=191,remedies=[192,193],recyclingVendor=[103,2],canteen=[106,2],letterPrinter=[244,6],flags=dict(recycling=191,jokes=192,letter=193),outfits=dict(work=[50,51],inspector=[58,59]),reactionNPCs=[[n,e]for n,e,_,_ in reactions])
(OUT/'manifest.json').write_text(json.dumps(manifest,indent=2),encoding='utf-8');print('Built five bounded-scope additions; art packing and runtime verification remain.')
