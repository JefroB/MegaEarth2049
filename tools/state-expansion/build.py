from pathlib import Path
import json,copy,math,zipfile
names=['States','Skills','Items','Animations','Classes','Enemies','Map105']
def read(n):return json.loads(Path('data/'+n+'.json').read_text(encoding='utf8'))
def save(n,v):Path('data/'+n+'.json').write_text(json.dumps(v,ensure_ascii=False,separators=(',',':')),encoding='utf8')
b=Path('tools/state-expansion/before.zip')
if not b.exists():
 with zipfile.ZipFile(b,'w',zipfile.ZIP_DEFLATED) as z:
  for n in names:z.write('data/'+n+'.json')
  z.write('img/system/IconSet.png')
st,sk,it,an,cl,en,mp=[read(n) for n in names]
assert [len(x) for x in [st,sk,it,an]]==[52,199,157,188], 'One-time builder: refuse duplicate IDs'
def trait(c,d,v):return dict(code=c,dataId=d,value=v)
def effect(c,d,v=1):return dict(code=c,dataId=d,value1=v,value2=0)
rows=[
 ('Influenza','disease',3,[trait(21,6,.8),trait(23,2,.8)],'AGI -20%, healing received -20%. Sick leave denied.','Aerosol Benefits',6,.75,[6,7],6),
 ('Scabies','disease',3,[trait(22,0,-.15),trait(21,6,.9)],'HIT -15%, AGI -10%. Mandatory team infestation.','Mite Shift',5,.75,[5,6,7],5),
 ('Chrome Rot','disease',3,[trait(21,3,.85),trait(21,5,.85)],'DEF and MDF -15%. Your implant warranty has dissolved.','Corrupt Implant',6,.75,[1,6],48),
 ('Nanite Sepsis','disease',3,[trait(22,7,-.03),trait(23,2,.8)],'Lose 3% HP per turn; healing received -20%. Internal hostile takeover.','Dirty Nanites',7,.65,[1,6],100),
 ('Adrenal Surge','buff',3,[trait(21,2,1.2),trait(21,6,1.15)],'ATK +20%, AGI +15%. Overtime in a syringe.','Adrenal Surge',5,1,[2,3],27),
 ('Nanite Repair','buff',3,[trait(22,7,.04)],'Restore 4% HP per turn. Your body has opened a repair ticket.','Repair Swarm',6,1,[1,6],50),
 ('Dermal Plating','buff',3,[trait(23,6,.8)],'Physical damage taken -20%. Skin now meets building code.','Install Plating',6,1,[1,3],51),
 ('Signal Focus','buff',3,[trait(21,4,1.2),trait(23,4,.8)],'MAT +20%, MP costs -20%. Premium brain bandwidth.','Tune Signal',6,1,[1,4],39),
 ('Enfeebled','debuff',3,[trait(21,2,.75)],'ATK -25%. Strength has been outsourced.','Outsource Strength',5,.8,[4],40),
 ('Armor Fracture','debuff',3,[trait(21,3,.75)],'DEF -25%. Structural integrity is a paid extra.','Stress Fracture',5,.8,[2,3],62),
 ('Packet Loss','debuff',2,[trait(42,3,1)],'Tech skills sealed. Basic attacks, Ability and items still work.','Throttle Connection',6,.7,[1,5],47),
 ('Optic Desync','debuff',2,[trait(22,0,-.2),trait(22,1,-.1)],'HIT -20%, EVA -10%. Your eyes are buffering.','Scramble Optics',5,.8,[1,5],49)]
manifest=[]
for i,(name,category,turns,traits,desc,skill,cost,chance,owners,enemy) in enumerate(rows):
 sid=52+i;kid=199+i;aid=188+i
 state=copy.deepcopy(st[48]);state.update(id=sid,name=name,iconIndex=2016+i,minTurns=turns,maxTurns=turns,autoRemovalTiming=2,traits=traits,priority=45 if category=='buff' else 55,motion=0,overlay=0,restriction=0,removeAtBattleEnd=True,message1=' gains '+name+'!' if category=='buff' else ' suffers '+name+'!',message2=' gains '+name+'!' if category=='buff' else ' suffers '+name+'!',message3='',message4=' is free of '+name+'.',note=desc+' Duration: '+str(turns)+' turns. Clears at battle end.');st.append(state)
 s=copy.deepcopy(sk[198]);s.update(id=kid,name=skill,iconIndex=2028+i,description=(('Apply ' if category=='buff' else str(round(chance*100))+'% chance of ')+name+' for '+str(turns)+' turns. '+desc.split('. ')[0]+'.'),effects=[effect(21,sid,chance)],scope=7 if category=='buff' else 1,mpCost=cost,tpCost=0,tpGain=0,stypeId=2,hitType=0 if category=='buff' else 2,occasion=1,animationId=aid,note='<Ally Party Limit Gauge: +1>');sk.append(s)
 for c in owners:cl[c]['traits'].append(trait(43,kid,1))
 manifest.append(dict(state=sid,name=name,category=category,turns=turns,description=desc,skill=kid,skillName=skill,animation=aid,icon=2016+i,chance=chance,classes=owners,enemy=enemy,scalePercent=30 if category=='buff' else 24))
# Explicitly scoped removers: no death, immortality or unrelated scripted states.
groups=[list(range(52,56))+[47,50],list(range(60,64))+[48,49,51],list(range(56,60)),list(range(56,60))]
removers=[('Clinical Flush',6,7,[4,6],'Clears new diseases, Parcel Fever and Recall Rash.'),('Neural Reboot',5,7,[1,3,6],'Clears new debuffs, Stapled, Glitterblind and Fine Print.'),('Revoke Benefits',6,1,[1,4],'Strips the four new buff states and ordinary stat buffs from one enemy.'),('Safe Mode',2,7,[1,4,6],'Removes the four new buff states from one ally.')]
for i,(name,cost,scope,owners,desc) in enumerate(removers):
 kid=211+i;s=copy.deepcopy(sk[198]);s.update(id=kid,name=name,description=desc,iconIndex=2040+i,animationId=200+i,scope=scope,mpCost=cost,tpCost=0,tpGain=0,stypeId=2,hitType=0,note='<Ally Party Limit Gauge: +1>',effects=[effect(22,n) for n in groups[i]]+([effect(33,n) for n in range(8)] if i==2 else []));sk.append(s)
 for c in owners:cl[c]['traits'].append(trait(43,kid,1))
# Enemy variants cost no MP (existing ordinary enemies have no MP pool).
for i,row in enumerate(manifest):
 kid=215+i;s=copy.deepcopy(sk[row['skill']]);s.update(id=kid,name=s['name']+' (Enemy)',mpCost=0,tpCost=0,stypeId=0,scope=11 if row['category']=='buff' else 1,note='Enemy-only variant; same visual/effect as player skill '+str(row['skill'])+'.');sk.append(s)
 enemy=en[row['enemy']];enemy['actions'].append(dict(conditionType=1,conditionParam1=2,conditionParam2=4,rating=4,skillId=kid));row['enemySkill']=kid
# Remedies/dispels stocked at an existing pharmacy and salvage dealer.
items=[('Pathogen Purge',60,7,groups[0],200,'Clears new diseases, Parcel Fever and Recall Rash.'),('Neural Reset Cartridge',55,7,groups[1],201,'Clears new debuffs, Stapled, Glitterblind and Fine Print.'),('Benefit Revocation',75,1,groups[2],202,'Strips new buff states and ordinary stat buffs from one enemy.'),('Emergency Rollback',90,7,list(range(52,64)),203,'Clears all twelve new states from an ally, including beneficial ones.')]
for i,(name,price,scope,states,aid,desc) in enumerate(items):
 obj=copy.deepcopy(it[154]);obj.update(id=157+i,name=name,price=price,scope=scope,occasion=1,description=desc,iconIndex=2044+i,animationId=aid,effects=[effect(22,n) for n in states]+([effect(33,n) for n in range(8)] if i==2 else []));it.append(obj)
for eid in [4,5]:
 done=False
 for page in mp['events'][eid]['pages']:
  lst=page['list']
  for j,c in enumerate(lst):
   if c['code']==302:
    k=j+1
    while k<len(lst) and lst[k]['code']==605:k+=1
    lst[k:k]=[dict(code=605,indent=c['indent'],parameters=[0,n,0,0]) for n in range(157,161)];done=True;break
 assert done
# Distinct, compact effect choreography; each uses its own generated symbol.
for i in range(16):
 frames=[]
 for f in range(16):
  t=f/15;alpha=round(255*min(1,(f+1)/3,(16-f)/4));cells=[]
  if i==0:coords=[(-24+48*t,-20+8*math.sin(t*math.pi*2),14),(24-48*t,8,12)]
  elif i==1:coords=[(-20+40*t,10-20*t,16),(18-36*t,-12+24*t,12)]
  elif i==2:coords=[(0,-28+52*t,24)]
  elif i==3:coords=[(22*math.cos(t*math.pi*2),18*math.sin(t*math.pi*2),16),(-22*math.cos(t*math.pi*2),-18*math.sin(t*math.pi*2),12)]
  elif i==4:coords=[(0,22-40*t,30)]
  elif i==5:coords=[(-18,18-32*t,18),(18,30-44*t,18)]
  elif i==6:coords=[(-26*(1-t),0,24),(26*(1-t),0,24)]
  elif i==7:coords=[(0,-18,30)]
  elif i==8:coords=[(0,-22+40*t,24)]
  elif i==9:coords=[(-35+35*min(t*2,1),-25+25*min(t*2,1),24)]
  elif i==10:coords=[(-10 if f%2 else 10,0,24)]
  elif i==11:coords=[(round(8*math.sin(f*2)), -10,24)]
  elif i==12:coords=[(-18+36*t,18-36*t,22),(18-36*t,26-40*t,14)]
  elif i==13:coords=[(0,0,30)]
  elif i==14:coords=[(-22*t,-12*t,20),(22*t,12*t,20)]
  else:coords=[(0,12-24*t,30)]
  for x,y,scale in coords:cells.append([i if i<12 else i+12,round(x),round(y),scale,round(360*t) if i==13 else 0,0,alpha,0])
  frames.append(cells)
 name=rows[i][5] if i<12 else removers[i-12][0]
 sound='Heal1' if i in [4,5,6,7,12,13,15] else 'Magic1'
 an.append(dict(id=188+i,name=name+' - status effect',animation1Name='ME_StateExpansion',animation1Hue=0,animation2Name='',animation2Hue=0,position=1,frames=frames,timings=[dict(frame=6,flashScope=1,flashDuration=3,flashColor=[90,200,180,55] if i in [4,5,6,7,12,13,15] else [180,90,140,55],se=dict(name=sound,pan=0,pitch=95+i*2,volume=55))]))
for n,d in zip(names,[st,sk,it,an,cl,en,mp]):save(n,d)
Path('tools/state-expansion/manifest.json').write_text(json.dumps(dict(states=manifest,removers=[dict(skill=211+i,name=x[0],states=groups[i],animation=200+i) for i,x in enumerate(removers)],items=[dict(id=157+i,name=x[0],states=x[3]) for i,x in enumerate(items)],enemySchedule='Turn 2, then every 4 turns; rating 4 versus normal attack rating 5.'),indent=2),encoding='utf8')
print('Added 12 states, 16 player skills, 12 enemy variants, 4 consumables and 16 animations.')

import runpy
runpy.run_path('tools/state-expansion/fracture-motion.py',run_name='__main__')
