import json,copy,zipfile,math
from pathlib import Path
root=Path('.')
files=['data/'+n+'.json' for n in ['Weapons','Skills','States','Items','Animations','Classes','Map103','Map105']]+['js/plugins.js','img/system/IconSet.png']
b=Path('tools/weapon-variety/before.zip')
if not b.exists():
 with zipfile.ZipFile(b,'w',zipfile.ZIP_DEFLATED) as z:
  for f in files:z.write(f)
def read(n):return json.loads(Path('data/'+n+'.json').read_text(encoding='utf8'))
def write(n,d):Path('data/'+n+'.json').write_text(json.dumps(d,ensure_ascii=False,separators=(',',':')),encoding='utf8')
w,s,st,it,an,cl=[read(n) for n in ['Weapons','Skills','States','Items','Animations','Classes']]
assert [len(x) for x in [w,s,st,it,an]]==[61,185,48,154,176], 'Run once; restore backup deliberately before rebuilding'
def effect(code,id,value=1,v2=0):return dict(code=code,dataId=id,value1=value,value2=v2)
for j,(name,turns,trait,msg) in enumerate([
 ('Stapled',2,dict(code=21,dataId=6,value=.6),' has been filed under footwear!'),
 ('Glitterblind',2,dict(code=22,dataId=0,value=-.25),' cannot see past the mandatory fun!'),
 ('Recall Rash',3,dict(code=22,dataId=7,value=-.02),' develops a product-recall rash!'),
 ('Fine Print',3,dict(code=21,dataId=5,value=.75),' has waived the right to magical privacy!')]):
 x=copy.deepcopy(st[4]);x.update(id=48+j,name=name,iconIndex=1996+j,minTurns=turns,maxTurns=turns,autoRemovalTiming=2,removeAtBattleEnd=True,motion=0,overlay=0,traits=[trait],message1=msg,message2=msg,message3='',message4=' is free of '+name+'.',note='Temporary weapon ailment; clears at battle end.');st.append(x)
rows=[
 ('Pink-Slip Stapler',9,12,420,'35% chance to Staple: AGI -40% for 2 turns. HR has pinned you down.',1,'a.atk*4-b.def*2',[effect(21,48,.35)],21,'line'),
 ('Terms & Conditions',11,13,480,'30% Fine Print: MDF -25% for 3 turns. Binding arbitration, literally.',1,'a.atk*4-b.def*2',[effect(21,51,.30)],24,'arc'),
 ('Rail-Spike Driver',9,18,850,'40% bonus damage against Stapled foes. Management calls this follow-through.',1,'(a.atk*4-b.def*2)*(b.isStateAffected(48)?1.4:1)',[],22,'line'),
 ('Bloodwork Letter Opener',1,14,600,'Drains HP with a weaker strike. Your blood is our business.',5,'a.atk*2-b.def',[],3,'slash'),
 ('Glitter Compliance Cannon',9,3,150,'Weak damage; 55% Glitterblind: HIT -25% for 2 turns. Mandatory fun.',1,'a.atk*2-b.def',[effect(21,49,.55)],23,'line'),
 ('Executive Rubber Chicken',2,2,90,'Feeble damage, drains 15 target TP; grants 10 user TP. HONK if you hate work.',1,'a.atk*1.5-b.def',[effect(13,0,-15)],27,'arc'),
 ('Boomerang Invoice',3,10,400,'Drains a little MP instead of HP. The bill always comes back.',6,'Math.max(1,a.atk*.35-b.mdf*.15)',[],25,'return'),
 ('OSHA-Approved Brick',3,16,500,'Slow throw. Attempts DEF down for 2 turns. Safety is a blunt instrument.',1,'a.atk*4-b.def*2',[effect(32,3,2)],26,'arc'),
 ('Motivational Foam Finger',2,1,100,'Attack targets an ally: small heal and ATK up for 2 turns. Zero useful punching.',3,'a.atk*1.5+a.level*3+20',[effect(31,2,2)],30,'heal'),
 ('Coupon Cutter',1,9,300,'40% bonus damage vs buffed foes; removes DEF buffs. Savings that hurt.',1,'(a.atk*4-b.def*2)*(b.isAnyBuffAffected()?1.4:1)',[effect(33,3)],28,'slash'),
 ('Unlicensed Culture Swab',1,7,220,'40% Recall Rash: loses 2% HP per turn for 3 turns. Lab coat sold separately.',1,'a.atk*3-b.def*2',[effect(21,50,.4)],29,'slash'),
 ('Percussive Care Manual',11,8,550,'Attack targets an ally: restores 80 + half MAT HP and clears Recall Rash.',3,'80+a.mat*.5',[effect(22,50)],31,'heal')]
manifest=[]
for i,(name,typ,atk,price,desc,dt,formula,fx,cell,mode) in enumerate(rows):
 aid=176+i
 cell={177:1,179:3,181:5,182:6,183:7,185:9,186:10}.get(aid,cell)
 frames=[]
 for f in range(18):
  t=min(f/12,1);opacity=255 if f<13 else max(0,255-(f-12)*51)
  if mode in ['arc','return']:x=220*(1-t);y=-90*math.sin(math.pi*t);rot=f*30
  elif mode=='line':x=220*(1-t);y=0;rot=0
  elif mode=='slash':x=55*(1-t);y=-55+55*t;rot=-50+100*t
  else:x=0;y=15-30*t;rot=0
  if mode=='return' and f>12:x=(f-12)*44;y=-30*math.sin((f-12)/5*math.pi);opacity=255
  frames.append([[cell,round(x),round(y),[18, 25, 20, 24, 30, 28, 25, 25, 32, 24, 22, 32][i],round(rot),0,opacity,0]])
 sound='Heal1' if mode=='heal' else ('Gun1' if mode=='line' else 'Blow1')
 an.append(dict(id=aid,name=name+' - '+mode,animation1Name='ME_WeaponVariety',animation1Hue=0,animation2Name='',animation2Hue=0,position=1,frames=frames,timings=[dict(frame=12,flashScope=1,flashColor=[100,220,160,90] if mode=='heal' else [255,220,150,90],flashDuration=3,se=dict(name=sound,pan=0,pitch=115 if i==5 else 100,volume=65))]))
 sk=copy.deepcopy(s[1]);sk.update(id=185+i,name=name,animationId=aid,description=desc,note='',iconIndex=1984+i,message1=' uses %1!',effects=fx,scope=7 if dt==3 else 1,hitType=0 if dt==3 else 1,tpGain=10 if i==5 else 0,speed=-20 if i==7 else 0,damage=dict(type=dt,elementId=0 if dt==3 else 1,formula=formula,variance=10,critical=dt==1));s.append(sk)
 ww=dict(id=61+i,name=name,wtypeId=typ,price=price,animationId=aid,params=[0,0,atk,0,0,0,0,0],description=desc,note='<skill_id:'+str(185+i)+'>',traits=[dict(code=31,dataId=1,value=1)],iconIndex=1984+i,etypeId=1);w.append(ww)
 manifest.append(dict(id=61+i,name=name,skill=185+i,animation=aid,icon=1984+i,description=desc,mode=mode,scalePercent=[18, 25, 20, 24, 30, 28, 25, 25, 32, 24, 22, 32][i]))
for idx,name,scope,cost,states,icon,stype in [(197,'Shake It Off',11,10,[48,49],2003,5),(198,'Clinical Reset',7,4,[48,49,50,51],2004,2)]:
 sk=copy.deepcopy(s[1]);sk.update(id=idx,name=name,description='Removes '+', '.join(st[n]['name'] for n in states)+'.',iconIndex=icon,animationId=41,damage=dict(type=0,elementId=0,formula='0',variance=0,critical=False),effects=[effect(22,n) for n in states],hitType=0,scope=scope,stypeId=stype,tpCost=cost if idx==197 else 0,mpCost=cost if idx==198 else 0,tpGain=0,message1=' uses %1!',note='',occasion=1);s.append(sk)
for c in cl:
 if not c:continue
 if any(t['code']==41 and t['dataId']==5 for t in c['traits']):c['traits'].append(dict(code=43,dataId=197,value=1))
 if c['id'] in [4,6]:c['traits'].append(dict(code=43,dataId=198,value=1))
for j,(name,price,states) in enumerate([('Adhesive Remover',40,[48,49]),('Recall Lotion',35,[50]),('Retraction Stamp',50,[51])]):
 x=copy.deepcopy(it[6]);x.update(id=154+j,name=name,price=price,iconIndex=2000+j,effects=[effect(22,n) for n in states],description='Removes '+', '.join(st[n]['name'] for n in states)+'. Single use.');it.append(x)
for mid,eid,goods in [(103,2,[(1,i) for i in [61,62,63,64,68,70]]),(105,4,[(1,i) for i in [65,66,67,69,71,72]]+[(0,i) for i in [154,155,156]]),(105,5,[(0,i) for i in [154,155,156]])]:
 m=read('Map'+str(mid).zfill(3));done=False
 for page in m['events'][eid]['pages']:
  lst=page['list']
  for k,c in enumerate(lst):
   if c['code']==302:
    end=k+1
    while end<len(lst) and lst[end]['code']==605:end+=1
    lst[end:end]=[dict(code=605,indent=c['indent'],parameters=[kind,id,0,0]) for kind,id in goods];done=True;break
 assert done,(mid,eid)
 write('Map'+str(mid).zfill(3),m)
for n,d in zip(['Weapons','Skills','States','Items','Animations','Classes'],[w,s,st,it,an,cl]):write(n,d)
p=Path('js/plugins.js');txt=p.read_text(encoding='utf8');pos=txt.rfind(']');txt=txt[:pos].rstrip()+',\n'+json.dumps(dict(name='WeaponSkill',status=True,description='Native per-weapon attack skills',parameters={}))+'\n'+txt[pos:];p.write_text(txt,encoding='utf8')
Path('tools/weapon-variety/manifest.json').write_text(json.dumps(manifest,indent=2),encoding='utf8')
print('Added 12 weapons, 14 skills, 4 states, 3 remedies, 12 native animations; stocked existing shops.')
