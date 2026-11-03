from pathlib import Path
import json,copy,zipfile,math
names=['States','Skills','Items','Animations','Classes','Enemies','Map105']
def read(n):return json.loads(Path('data/'+n+'.json').read_text(encoding='utf8'))
def save(n,x):Path('data/'+n+'.json').write_text(json.dumps(x,ensure_ascii=False,separators=(',',':')),encoding='utf8')
b=Path('tools/state-expansion-2/before.zip')
if not b.exists():
 with zipfile.ZipFile(b,'w',zipfile.ZIP_DEFLATED) as z:
  for n in names:z.write('data/'+n+'.json')
  z.write('img/system/IconSet.png')
st,sk,it,an,cl,en,mp=[read(n) for n in names]
assert [len(x) for x in [st,sk,it,an]]==[64,227,161,204], 'Refusing duplicate additions'
def tr(c,d,v):return dict(code=c,dataId=d,value=v)
def ef(c,d,v=1):return dict(code=c,dataId=d,value1=v,value2=0)
# FAQ_11 names and tradeoffs, translated to supported temporary battle mechanics.
rows=[
 ("Athlete's Foot",'disease',3,[tr(21,6,.8)],'AGI -20%. Corporate showers charge extra for fungus.', 'Locker-Room Dividend',4,.8,[5,7],False,82),
 ('Beneficial Parasites','disease',3,[tr(21,2,1.15),tr(21,6,1.1),tr(22,7,-.03)],'ATK +15%, AGI +10%; lose 3% HP each turn. Your tenant eats rent.', 'Symbiotic Contract',5,1,[6,7],True,93),
 ('Wi-Fi Allergy','disease',3,[tr(22,7,-.02),tr(11,4,.65)],'Lose 2% HP per turn; Thunder damage -35%. Allergic to connectivity.', 'Broadcast Irritant',5,.75,[1,7],False,110),
 ('Digital Dementia','disease',3,[tr(22,0,-.15),tr(22,2,.08)],'HIT -15%, CRI +8%. Forgot the plan; remembered the weak spot.', 'Memory Leak',5,.75,[1,6],False,111),
 ('Aim Assist','buff',3,[tr(22,0,.1),tr(22,2,.1)],'HIT +10%, CRI +10%. Premium aiming subscription.', 'Calibrate Optics',5,1,[1,5],True,7),
 ('Reflex Cache','buff',3,[tr(22,1,.15)],'EVA +15%. Dodge now, process the paperwork later.', 'Cache Reflexes',5,1,[1,5],True,12),
 ('Countermeasure','buff',3,[tr(22,5,.15)],'15% magic reflection chance. Returns incoming spell hostility.', 'Arm Countermeasure',6,1,[2,3],True,106),
 ('Capacitor Reserve','buff',3,[tr(22,8,.04)],'Restore 4% MP per turn. Electricity billed to your employer.', 'Charge Reserve',6,1,[1,4],True,107),
 ('Exposed','debuff',3,[tr(23,6,1.2)],'Physical damage taken +20%. Your protection plan has a hole.', 'Open Liability',5,.8,[2,3],False,63),
 ('Curse','debuff',3,[tr(21,7,.7),tr(22,8,-.03)],'LUK -30%; lose 3% MP each turn. Interest compounds in the dark.', 'Compound Misfortune',6,.75,[4],False,102),
 ('Heat Lock','debuff',2,[tr(23,4,1.4)],'MP costs +40%. Thermal throttling has reached your brain.', 'Thermal Throttle',5,.8,[1,3],False,112),
 ('Target Painted','debuff',2,[tr(23,0,2),tr(22,1,-.05)],'Target weight doubled; EVA -5%. Applies to random enemy targeting.', 'Sell Location Data',4,.8,[1,5],False,113)]
manifest=[]
for i,(name,cat,turns,traits,desc,title,mpcost,chance,owners,ally,enemy) in enumerate(rows):
 state=copy.deepcopy(st[52]);state.update(id=64+i,name=name,traits=traits,iconIndex=2048+i,minTurns=turns,maxTurns=turns,priority=45 if cat=='buff' else 55,note=desc+' Temporary battle interpretation; '+str(turns)+' turns.',message1=' gains '+name+'!' if ally else ' suffers '+name+'!',message2=' gains '+name+'!' if ally else ' suffers '+name+'!',message4=' is free of '+name+'.');st.append(state)
 skill=copy.deepcopy(sk[199]);skill.update(id=227+i,name=title,description=('Apply ' if ally else str(round(chance*100))+'% chance of ')+name+' for '+str(turns)+' turns. '+desc.split('. ')[0]+'.',iconIndex=2060+i,animationId=204+i,effects=[ef(21,64+i,chance)],mpCost=mpcost,scope=7 if ally else 1,hitType=0 if ally else 2);sk.append(skill)
 for c in owners:cl[c]['traits'].append(tr(43,227+i,1))
 manifest.append(dict(state=64+i,name=name,category=cat,turns=turns,description=desc,skill=227+i,skillName=title,animation=204+i,icon=2048+i,chance=chance,classes=owners,enemy=enemy,ally=ally,scalePercent=26))
neg=list(range(64,68))+list(range(72,76));newbuff=list(range(68,72));allbuff=list(range(56,60))+newbuff
removers=[('Parasite Eviction',3,7,[65],[4,6,7],'Removes Beneficial Parasites, including their bonuses.'),('Grounding Routine',4,7,[66,67,74,75],[1,3,6],'Clears Wi-Fi Allergy, Digital Dementia, Heat Lock and Target Painted.'),('Clear Liability',6,7,neg,[4,6],'Clears all eight new ailments and debuffs; removes parasite benefits too.'),('Deauthorize',6,1,allbuff,[1,4],'Strips both batches of buff states and ordinary stat buffs from one enemy.')]
for i,(name,cost,scope,states,owners,desc) in enumerate(removers):
 s=copy.deepcopy(sk[211]);s.update(id=239+i,name=name,description=desc,iconIndex=2072+i,animationId=216+i,mpCost=cost,scope=scope,effects=[ef(22,n) for n in states]+([ef(33,n) for n in range(8)] if i==3 else []));sk.append(s)
 for c in owners:cl[c]['traits'].append(tr(43,239+i,1))
for i,row in enumerate(manifest):
 s=copy.deepcopy(sk[227+i]);s.update(id=243+i,name=s['name']+' (Enemy)',mpCost=0,tpCost=0,stypeId=0,scope=11 if row['ally'] else 1,note='Enemy version; same effect and visual as '+str(227+i));sk.append(s)
 en[row['enemy']]['actions'].append(dict(conditionType=1,conditionParam1=2,conditionParam2=4,rating=4,skillId=243+i));row['enemySkill']=243+i
items=[('Acme Footloose',35,[64],'Removes Athlete\'s Foot. Your shoes are not a mushroom franchise.'),('Acme Evict-A-Worm',40,[65],'Removes Beneficial Parasites and their bonuses. No notice required.'),('Acme Airplane Mode',55,[66,67],'Removes Wi-Fi Allergy and Digital Dementia. Disconnect to reconnect.'),('Acme Clean Slate',90,neg,'Clears all eight new ailments/debuffs, including parasite benefits.')]
for i,(name,price,states,desc) in enumerate(items):
 o=copy.deepcopy(it[157]);o.update(id=161+i,name=name,price=price,description=desc,iconIndex=2076+i,animationId=[216,216,217,218][i],effects=[ef(22,n) for n in states]);it.append(o)
# Keep existing broad cleanses relevant; never clear scripted/boss-only states.
def add_removals(obj,states):
 for state in states:
  if not any(e['code']==22 and e['dataId']==state for e in obj['effects']):obj['effects'].append(ef(22,state))
for id,states,desc in [(211,list(range(64,68)),'Clears diseases from both new batches, Parcel Fever and Recall Rash; removes parasite bonuses.'),(212,list(range(72,76)),'Clears debuffs from both new batches, Stapled, Glitterblind and Fine Print.'),(213,newbuff,'Strips buff states from both new batches and ordinary stat buffs from one enemy.'),(214,newbuff,'Removes buff states from both new batches from one ally.')]:add_removals(sk[id],states);sk[id]['description']=desc
for id,states,desc in [(157,list(range(64,68)),'Clears both batches of diseases, Parcel Fever and Recall Rash; removes parasite bonuses.'),(158,list(range(72,76)),'Clears both batches of debuffs, Stapled, Glitterblind and Fine Print.'),(159,newbuff,'Strips both batches of buff states and ordinary stat buffs from one enemy.'),(160,list(range(64,76)),'Clears all 24 new states from an ally, including beneficial ones.')]:add_removals(it[id],states);it[id]['description']=desc
for eid in [4,5]:
 for page in mp['events'][eid]['pages']:
  lst=page['list']
  for j,c in enumerate(lst):
   if c['code']==302:
    k=j+1
    while k<len(lst) and lst[k]['code']==605:k+=1
    lst[k:k]=[dict(code=605,indent=c['indent'],parameters=[0,n,0,0]) for n in range(161,165)];break
# Compact symbolic effects, unique choreography per application.
for i in range(16):
 frames=[]
 for f in range(18):
  t=f/17;alpha=round(255*min(1,(f+1)/3,(18-f)/4));pattern=i if i<12 else 24+i-12;cells=[]
  if i==0:coords=[(-8+16*t,22,20)]
  elif i==1:coords=[(20*math.cos(2*math.pi*t),15*math.sin(2*math.pi*t),18)]
  elif i==2:coords=[(-24+48*t,-5,20),(24-48*t,8,12)]
  elif i==3:coords=[(8*math.sin(f*2),-14,24)]
  elif i==4:coords=[(-20*(1-t),-15,20),(20*(1-t),-15,20)]
  elif i==5:coords=[(-16-8*t,8-25*t,18),(16+8*t,8-25*t,18)]
  elif i==6:coords=[(-24+48*t if t<.5 else 24-48*t,0,24)]
  elif i==7:coords=[(0,20-32*t,26)]
  elif i==8:coords=[(-8-25*t,8+24*t*t,20),(8+25*t,8+24*t*t,20)]
  elif i==9:coords=[(0,-20+30*t,24)]
  elif i==10:coords=[(0,-8+3*math.sin(f*2),24)]
  elif i==11:coords=[(24*(1-t),-20*(1-t),26)]
  elif i==12:coords=[(-5-28*t,-4-12*t,22)]
  elif i==13:coords=[(0,-22+42*t,24)]
  elif i==14:coords=[(-18+36*t,15-30*t,24)]
  else:coords=[(-20*t,0,20),(20*t,0,20)]
  for x,y,scale in coords:cells.append([pattern,round(x),round(y),scale,round(-65*t) if i==8 else 0,0,alpha,0])
  if i==8:
   if f<7:q=f/6;cells=[[20,round(-24*(1-q)),round(-15*(1-q)),26,0,0,255,0]]
   else:cells=[[8,0,0,22,0,0,round(255*(1-(f-7)/10)),0]]
  frames.append(cells)
 title=rows[i][5] if i<12 else removers[i-12][0]
 an.append(dict(id=204+i,name=title+' - status effect',animation1Name='ME_StateExpansion2',animation1Hue=0,animation2Name='',animation2Hue=0,position=1,frames=frames,timings=[dict(frame=6,flashScope=1,flashDuration=3,flashColor=[80,180,180,55] if i in [1,4,5,6,7,12,13,14] else [210,100,130,55],se=dict(name='Heal1' if i in [1,4,5,6,7,12,13,14] else 'Magic1',pan=0,pitch=105+i,volume=55))]))
for n,x in zip(names,[st,sk,it,an,cl,en,mp]):save(n,x)
Path('tools/state-expansion-2/manifest.json').write_text(json.dumps(dict(states=manifest,removers=[dict(skill=239+i,name=r[0],states=r[3],animation=216+i) for i,r in enumerate(removers)],items=[dict(id=161+i,name=r[0],states=r[2]) for i,r in enumerate(items)],sources=['GameFAQs/FAQ_09_Disease_System.md','GameFAQs/FAQ_11_Body_Modification_System.md','DICTIONARY/DICTIONARY.md']),indent=2),encoding='utf8')
print('Added 12 states, 16 skills, 12 ordinary-enemy variants, 4 remedies, 16 animations; expanded existing cleanses.')
