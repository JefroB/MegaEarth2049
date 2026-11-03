"""A26 one-time MAX-E-MUM companion installer. Existing story/campaign gates preserved."""
import json,copy,re,textwrap,zipfile
from pathlib import Path
from collections import deque
OUT=Path('tools/max-e-mum')
def load(n):return json.loads(Path('data/'+n+'.json').read_text(encoding='utf8'))
D={n:load(n)for n in ['Actors','Classes','Skills','System','MapInfos','Map010']};tiles=load('Tilesets')
assert len(D['Actors'])==13 and len(D['Classes'])==12 and len(D['Skills'])==280 and len(D['System']['switches'])==266 and len(D['MapInfos'])==251
assert not Path('data/Map251.json').exists()
if (OUT/'before.zip').exists():
 with zipfile.ZipFile(OUT/'before.zip') as z:
  for name in z.namelist():assert z.read(name)==Path(name).read_bytes(),'Snapshot differs; do not reinstall.'
else:
 with zipfile.ZipFile(OUT/'before.zip','x',zipfile.ZIP_DEFLATED)as z:
  for n in D:z.write('data/'+n+'.json')
  z.write('js/plugins/ME_CompletionLog.js')
source=Path('tools/clown-court/build.py').read_text();ns=dict(load=load,copy=copy,textwrap=textwrap,tiles=tiles,deque=deque);exec(source[source.index('def C('):source.index("m=D['Map010']")],ns)
C,nest,say,branch,choice,on,transfer,event=[ns[n]for n in ['C','nest','say','branch','choice','on','transfer','event']]
# Isolate MAX's class; no edits to any existing actor, class or learning list.
base=copy.deepcopy(D['Classes'][3]);base.update(id=12,name='Maintenance Coach',note='',learnings=[dict(level=1,skillId=n,note='')for n in [280,281,282]],traits=[dict(code=41,dataId=2,value=1),dict(code=51,dataId=11,value=1),dict(code=52,dataId=1,value=1),dict(code=22,dataId=0,value=.95)])
for row,scale in enumerate([.85,.8,.95,1.05,.7,.9,.7,.8]):base['params'][row]=[max(1,round(v*scale))if i else v for i,v in enumerate(base['params'][row])]
D['Classes'].append(base)
actor=copy.deepcopy(D['Actors'][1]);actor.update(id=13,name='MAX-E-MUM',nickname='Maintenance Coach',profile='A cleaning robot who downloaded bodybuilding forums.\nRuns Iron Circuits; considers rest a basic right.',classId=12,initialLevel=8,battlerName='MAXEMUM',characterName='$MAXEMUM',characterIndex=0,faceName='MAXEMUM',faceIndex=0,equips=[2,0,0,0,0,0,0,0],traits=[],note='<battle command: attack />\n<battle command: guard />\n<battle command: skill_type 2 />\n<battle command: item />');D['Actors'].append(actor)
for id,name,cost,anim,icon,scope,effects,description in [
 (280,'Spotter Protocol',6,194,2034,7,[dict(code=31,dataId=3,value1=4,value2=0)],'One ally: DEF buff for 4 turns.\n6 TP. Each level +25%; maximum 2 levels.'),
 (281,'Active Recovery',8,193,2033,7,[dict(code=21,dataId=57,value1=1,value2=0)],'One ally: 4% max HP regen for 3 turns.\n8 TP. No instant heal, revival or cure.'),
 (282,'Deload Slam',0,1,1750,1,[],'One enemy: physical hit. 6 AP.\nNo stun or other status effect.')]:
  s=copy.deepcopy(D['Skills'][278]);s.update(id=id,name=name,mpCost=cost,tpCost=6 if id==282 else 0,animationId=anim,iconIndex=icon,scope=scope,effects=effects,description=description,hitType=1 if id==282 else 0)
  if id==282:s['damage'].update(type=1,elementId=1,formula='Math.max(0,a.atk*3-b.def*2)',variance=10,critical=True)
  D['Skills'].append(s)
D['System']['switches'] += ['Iron Circuits - inspection accepted','Iron Circuits - stop verified','Iron Circuits - telemetry verified','Iron Circuits - inspection complete']
# Copy the established room construction helpers without executing their old installation.
ns.update(D=D,Path=Path,re=re,json=json);exec(source[source.index("core=Path('js/rpg_core.js')"):source.index('foyer=newmap(')],ns);m=ns['newmap'](251,'Iron Circuits - No Pain, No Subscription',19,15,{(x,y)for y in range(4,12)for x in range(3,16)},4256);m.update(note='A26 local Timbuc basement gym. Optional recruitment; no castle gate.',autoplayBgm=False)
D['MapInfos'][251]['parentId']=10
entry=event(D['Map010'],'Iron Circuits public lift',14,10,say('IRON CIRCUITS: Basement gym. Lift free. Muscle soreness billed separately. All bodies welcome; having one is a pre-existing condition.')+choice([('Enter Iron Circuits',[transfer(251,9,10)]),('Leave',[])]),'!SF_Switch1',0)
event(m,'Public lift - exit to Timbuc',9,11,[transfer(10,14,11)],'!Door1',0)
def flag(n):return f'$gameSwitches.value({n})'
intro=say('MAX-E-MUM: BRO. I used to clean toilets. Downloaded a bodybuilding forum. Now I clean toilets WITH PURPOSE. Welcome to Iron Circuits: gains without a membership lien.')
accept=say('MAX-E-MUM: Armatek wants me to rent the emergency stop and sell your sweat data. Spot me on two bench tests: stop rig on the left, telemetry desk on the right. No flesh in either machine.')+[on(266)]
invite=choice([('Join our crew',branch('$gameParty._actors.indexOf(13)<0',[C(129,13,0,False)]+say('MAX-E-MUM: GROUP SET! Gym goes self-service. I am joining the walking party or reserves; use Formation to bring me forward. Rest is part of the fucking workout.'),say('MAX-E-MUM is already with your crew. No replacement, reset or second starting kit.'))),('Keep training here',say('MAX-E-MUM: Rest day accepted. Come back whenever. No cancellation fee.'))])
finish=branch(flag(269),say('The gym runs locally with a free emergency stop. MAX can travel; the public lift and training stations remain available.')+invite,branch(flag(267)+' && '+flag(268),say('MAX-E-MUM: STOP WORKS. DATA STAYS HERE. Certified by a robot whose legal name sounds like a supplement scam. Want a spotter on your travels?')+[on(269)]+invite,branch(flag(266),say('MAX-E-MUM: Two checks, bro. Left bench: free stop. Right desk: local telemetry. Neither needs a patient or a sacrifice.'),intro+choice([('Inspect the gym',accept),('Not now',[])]))))
e=event(m,'MAX-E-MUM - No Pain No Subscription',9,5,finish,'$MAXEMUM',0);e['note']='A26 canonical MAX; gym self-service while actor13 is in party.';page=copy.deepcopy(e['pages'][0]);page['conditions'].update(actorValid=True,actorId=13);page['image'].update(characterName='!SF_Switch1',characterIndex=0);e['pages'].append(page)
for id,name,x,prompt,good,bad,flagid,success in [
 (3,'Emergency stop bench',5,'BENCH TEST: dummy motor, no patient. Stop must work without a subscription. Test the unpaid stop before adding any load.',['Test stop with subscription off'],['Lease the stop for30 Credits'],267,'Dummy motor stops for free. No Credits spent; no patient involved.'),
 (4,'Telemetry desk',13,'TELEMETRY: a dummy workout record, not patient data. Posted rule: keep records local; no corporate upload is needed.',['Keep record on local gym storage'],['Upload the record to Armatek'],268,'Dummy record stays in local gym storage. No passenger or medical records were read.')]:
  cs=branch(flag(flagid),say('Check complete. '+success),branch(flag(266),say(prompt)+choice([(good[0],[on(flagid)]+say(success)),(bad[0],say('MAX: Bad form, bro. That fails the posted test. Nothing spent or uploaded. Read the rule and try again.')),('Leave',[])]),say('Ask MAX-E-MUM to inspect the gym first.')))
  event(m,name,x,6,cs,'!SF_Switch1',0)
# Benches leave clear central and side aisles; no actors or landings sit on them.
for x,y in [(4,8),(5,8),(13,8),(14,8)]:
 e=event(m,'Gym seat - solid furnishing',x,y,[],'',0);e['pages'][0]['image']['tileId']=145
D['Map251']=m
for n,v in D.items():Path('data/'+n+'.json').write_text(json.dumps(v,ensure_ascii=False,separators=(',',':')),encoding='utf8')
p=Path('js/plugins/ME_CompletionLog.js');s=p.read_text();needle=" entry('recycling'";assert needle in s;s=s.replace(needle," entry('ironCircuits','No Pain, No Subscription: MAX-E-MUM','projects',function(){return {complete:sw(269),status:state(sw(269),sw(266),sw(267)&&sw(268)),progress:sw(269)?'Inspection complete; invitation remains available.':count([267,268])+'/2 gym checks verified.',location:'Iron Circuits public lift, southeast Timbuc street.',hint:'Ask MAX to inspect the gym. Check the free emergency stop and local telemetry. Return to MAX; recruitment is a separate choice, with no cost or stat requirement. Use Formation if MAX joins reserves.'};});\n"+needle,1);p.write_text(s,encoding='utf8')
(OUT/'manifest.json').write_text(json.dumps(dict(actor=13,cls=12,map=251,entry=dict(map=10,event=entry['id'],x=14,y=10,returnXY=[14,11]),flags=list(range(266,270)),skills=[280,281,282],completionLogTotal=38),indent=2));print('Installed MAX-E-MUM actor13/class12, gym251, skills280–282 and local inspection.')
