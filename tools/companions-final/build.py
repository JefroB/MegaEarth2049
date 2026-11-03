"""Finish bounded A15 chapters for all remaining existing companion actors.
One-time installer: never rebuild older source over live content.
"""
import copy,json,textwrap,zipfile
from pathlib import Path
from collections import deque
OUT=Path('tools/companions-final')
def load(n):return json.loads(Path('data/'+n+'.json').read_text(encoding='utf-8'))
ids=[8,9,10,15,50,52,54,245,246,247,248]
D={n:load(n)for n in ['System']+[f'Map{i:03}'for i in ids]}
assert len(D['System']['switches'])==229
with zipfile.ZipFile(OUT/'before.zip','x',zipfile.ZIP_DEFLATED)as z:
 for n in D:z.write('data/'+n+'.json')
 z.write('js/plugins/ME_CompletionLog.js')
src=Path('tools/clown-court/build.py').read_text(encoding='utf-8');ns={'load':load,'copy':copy,'textwrap':textwrap,'tiles':load('Tilesets'),'deque':deque};exec(src[src.index('def C('):src.index("m=D['Map010']")],ns)
C,nest,say,branch,choice,on,event,passable,flood=[ns[n]for n in ['C','nest','say','branch','choice','on','event','passable','flood']]
actors=load('Actors')
chapters=[
 dict(id='fixedPoint',name='A Fixed Point',actor=5,base=229,map=245,spot=[4,8],gate='$gameSwitches.value(189)',location='Black Ninja, Collective Dojo hall, after the first credential.',intro='BLACK: Quantum Dynamics called a moving emergency exit a productivity feature. I kept a fixed reference so people could actually leave. Help me rebuild that anchor without rewriting anybody\'s body coordinates.',
  tasks=[(246,[5,10],'Anchor reference rig','POSTED RULE: the doorway is the fixed reference. The dummy marker drifts when the model moves. What stays fixed?', [('Fix the doorway reference',True),('Move the dummy through a wall',False)],'Reference fixed. Now verify the isolated model at the Matrix anchor console.'),(9,[12,12],'Isolated Matrix anchor','POSTED RULE: this isolated model must not overwrite physical-world coordinates. Which record should be retained?', [('Overwrite world coordinates',False),('Keep the local reference',True)],'The anchor remains local. Return to Black in the Dojo hall.')],
  endings=['Share the reference with the Dojo','Keep a crew-only reference'],outcomes=['The Dojo receives the fixed-reference method.','The crew keeps the fixed-reference method.'],closing='BLACK: A door in the same place twice. Quantum will patent it as a miracle. The rest of us call it a fucking door.',credits=0,item=9),
 dict(id='standDown',name='Stand Down',actor=6,base=235,map=247,spot=None,gate='$gameSwitches.value(189)',location='Blue instructor, Collective Dojo practice room, after the first credential.',intro='BLUE: OmniCorp taught me that hesitation was a defect. Then they billed the families for ammunition. I am replacing one old order: an unarmed person is not a target. Help me write an actual withdrawal plan.',
  tasks=[(247,[5,9],'Rules of engagement board','EXERCISE: an unarmed entrant crosses the training line. Posted rule: no weapon or threat is present. Choose the response.', [('Hold fire and open communication',True),('Fire a warning into the entrant',False)],'Hold-fire rule recorded. Review an exit plan at the care-ward safety board.'),(248,[14,9],'Care-ward safety board','POSTED RULE: the apprentice can leave without surrendering medical data. Choose the withdrawal plan.', [('Transmit the patient identity',False),('Keep the exit open',True)],'Exit plan recorded. Return to Blue in the practice room.')],
  endings=['Post the standing order','Keep it as a crew order'],outcomes=['The Dojo posts the hold-fire standing order.','The crew records its hold-fire order.'],closing='BLUE: Nobody gets a medal for not shooting a patient. Good. Maybe we can stop treating that as advanced fucking tactics.',credits=0,item=171),
 dict(id='ownFuse',name='Nobody Rents My Fuse',actor=8,base=241,map=10,spot=[6,8],gate='true',location='Niles, Timbuc, near the package square.',intro='NILES: Armatek sold my cache a remote eviction trigger. It calls blowing up the whole block a lease adjustment. Help me isolate the bastard. We use a dead training casing first. I like explosions; I like my customers alive longer.',
  tasks=[(15,[4,42],'Dead timer casing','DEAD TRAINING CASING: its battery is a removable dummy. Posted rule: isolate the power before handling the trigger. No live explosive is connected.', [('Remove the dummy battery',True),('Bridge the trigger contacts',False)],'Casing isolated. Return to the cache relay in Timbuc to inspect its separate trigger.'),(10,[6,9],'Niles cache relay','POSTED RULE: the cache trigger must be separate from residential alarms. Choose the wiring plan. This checks the plan; it detonates nothing.', [('Chain every housing alarm',False),('Isolate the cache trigger',True)],'Residential alarms stay separate. Niles wants your decision about the inspection label.')],
  endings=['Credit the neighbourhood crew','Leave the cache unmarked'],outcomes=['The inspection credits the neighbourhood crew.','The cache keeps an unmarked inspection record.'],closing='NILES: There. My fuse, my fucking problem. The landlord can repossess the invoice. No new Smelly Key, no new turf war. Just one less button pointed at our flats.',credits=75,item=0),
 dict(id='notFreight',name='Passengers Are Not Freight',actor=9,base=247,map=50,spot=[11,7],gate='true',location='Jack, Marcus Garvey 2.0 bridge.',intro='JACK: You borrowed my ship. Fine. Let us negotiate the bit where its captain comes along. A carrier wants to list our passengers as biological freight. After the alien-STD shipment Jen still hates me for, I am not putting people on a specimen manifest.',
  tasks=[(52,[10,7],'Cargo isolation panel','POSTED RULE: passenger supplies and sealed biological samples travel separately. The sample crate is sealed; choose its bay assignment.', [('Separate the sealed sample crate',True),('Pack it with passenger supplies',False)],'Cargo assignment checked. Ask the sickbay release desk about the passenger manifest.'),(54,[10,7],'Sickbay release desk','POSTED RULE: the carrier needs bay clearance, not diagnoses or passenger identities. What should the release disclose?', [('Publish names and diagnoses',False),('Release bay clearance only',True)],'Only bay clearance leaves sickbay. Return to Jack on the bridge.')],
  endings=['Keep the sealed route copy','Destroy the spare route copy'],outcomes=['A sealed route copy stays aboard.','The spare route copy is destroyed.'],closing='JACK: Names stay offline either way. Having a body is a pre-existing condition; having a boarding pass is apparently evidence. Cargo can be repossessed. People get an exit.',credits=0,item=157),
 dict(id='emptyHeist',name='Nothing Worth Stealing',actor=10,base=253,map=8,spot=[6,5],gate='true',location='Dick, Internet Cafe, Timbuc.',intro='DICK: I came to lift NeuraTech data. Your implant made the alarm swear at its own mother. Beautiful. There is an empty decoy index in the public Matrix sandbox. Help me prove I can get in without stealing some worker\'s life.',
  tasks=[(9,[7,12],'Decoy index lock','POSTED SCOPE: copy only the empty decoy index in this sandbox. The public Matrix connection remains open. Choose the target.', [('Copy the empty decoy index',True),('Export workers\' memories',False)],'Decoy copied. Check the owner-access rig at the Internet Cafe.'),(8,[7,5],'Owner-access test rig','POSTED RULE: opening the decoy must leave the owner\'s access intact. Choose the final test.', [('Revoke everyone else\'s access',False),('Verify owner access still works',True)],'Owner access survives. Return to Dick here in the cafe.')],
  endings=['Teach the crew the trick','Keep the trick private'],outcomes=['Dick shares the decoy method with the crew.','Dick keeps his decoy method private.'],closing='DICK: An empty index. Absolutely nothing worth stealing. Hardest job I have ever done. Apparently the real challenge was leaving everybody else\'s shit alone.',credits=100,item=0)
]
def flag(n):return f'$gameSwitches.value({n})'
def member(a):return f'$gameParty._actors.indexOf({a})>=0'
def walking(a):return f'$gameParty.battleMembers().some(function(a){{return a.actorId()==={a} && a.isAlive();}})'
def add(n,name,preferred,commands,sprite='!SF_Switch1',index=0,actor=0):
 m=D[f'Map{n:03}'];occupied={(e['x'],e['y'])for e in m['events']if e and e['pages']};area=max((flood(m,(x,y))for y in range(m['height'])for x in range(m['width'])if(x,y)not in occupied and any(passable(m,x,y,d)for d in [2,4,6,8])),key=len)
 def floor(p):
  x,y=p;ids=[m['data'][(z*m['height']+y)*m['width']+x]for z in range(4)];base=ids[1]or ids[0]
  return (1536<=base<2048 or 2816<=base<4352)and all(not t or(n==10 and t in[288,289,290,291,296])for t in ids[2:])
 p=next(p for p in sorted(area-occupied,key=lambda p:(abs(p[0]-preferred[0])+abs(p[1]-preferred[1]),p[1],p[0]))if floor(p)and len(flood(m,next(iter(area-{p})),p))>=len(area)-1)
 e=event(m,name,*p,commands,sprite,index);e['note']='A15 bounded existing-companion chapter.'
 if actor:
  pg=copy.deepcopy(e['pages'][0]);pg['conditions'].update(actorValid=True,actorId=actor);pg['image'].update(characterName='!SF_Switch1',characterIndex=0);e['pages'].append(pg)
 return e
for q in chapters:
 a=q['actor'];b=q['base'];D['System']['switches'] += [q['name']+' - '+label for label in ['accepted','first task','second task','resolution chosen','reward claimed','alternate resolution']]
 q['flags']=list(range(b,b+6));present=walking(a);q['taskEvents']=[]
 for k,(n,spot,name,prompt,answers,success)in enumerate(q['tasks']):
  good=[on(b+1+k)]+say(success)
  rows=[(label,good if correct else say('That does not follow the posted rule. Nothing was changed or spent. Read the rule and try again.'))for label,correct in answers]+[('Leave',[])]
  work=branch(flag(b+1+k),say('This check is already complete. '+success),branch(flag(b) if k==0 else flag(b+1),say(prompt)+choice(rows),say('Accept this chapter first.' if k==0 else 'Complete the first check before this one.')))
  cs=branch(present,work,say(f'Bring {actors[a]["name"]} conscious in the walking party for this check. Use Formation if they are in reserve.'))
  e=add(n,name,spot,cs);q['taskEvents'].append([n,e['id']]);q.setdefault('taskPositions',[]).append([e['x'],e['y']])
  pg=copy.deepcopy(e['pages'][0]);pg['conditions'].update(switch1Valid=True,switch1Id=b+1+k);pg['image']['characterIndex']=2;pg['list']=say('Check complete. '+success)+[C(0)];e['pages'].append(pg)
 result=branch(flag(b+5),say(q['outcomes'][1]),say(q['outcomes'][0]))
 rewardtext=f'{actors[a]["name"]} gains 200 personal EXP'+(f' and {q["credits"]} Credits'if q['credits']else'')+(f' and 1 {load("Items")[q["item"]]["name"]}'if q['item']else'')+'. One-time reward.'
 capacity=(f'$gameParty.gold()+{q["credits"]}<=$gameParty.maxGold()'if q['credits']else f'$gameParty.numItems($dataItems[{q["item"]}])<$gameParty.maxItems($dataItems[{q["item"]}])')
 grant=[on(b+4),C(315,0,a,0,0,200,False)]+([C(125,0,0,q['credits'])]if q['credits']else[C(126,q['item'],0,0,1)])+say(rewardtext)+say(q['closing'])
 claim=branch(capacity,grant,say('The resolution is recorded. Make room for the reward, then return with the companion conscious in the walking party. Nothing is paid until the full reward fits.'))
 endings=choice([(q['endings'][0],[on(b+3),C(121,b+5,b+5,1)]+result+claim),(q['endings'][1],[on(b+3),on(b+5)]+result+claim),('Decide later',[])])
 objective='First: '+q['tasks'][0][2]+'; then '+q['tasks'][1][2]+'. Return here for a final choice and the reward. All checks are free and have posted rules.'
 discussion=branch(flag(b+4),result+say('Chapter complete. '+rewardtext),branch(present,branch(flag(b+3),result+claim,branch(flag(b+2),say('Both checks are complete. Choose the local outcome. Either choice earns the same reward; it does not affect campaign gates.')+endings,branch(flag(b),say(objective),say(q['intro'])+say(objective)+choice([('Accept the chapter',[on(b)]+say('Accepted. '+objective)),('Later',[])])))),say(f'Invite {actors[a]["name"]} first, then use Formation to put them in the walking party and keep them conscious.')))
 invite=branch(member(a),say('Already on the crew. Use Formation to put this companion in the walking party; this invitation never resets their level, equipment or condition.'),say(q['intro'])+choice([('Join our crew',[C(129,a,0,False)]+say(f'{actors[a]["name"]} joins the crew. With four walking members they join reserves. Use Formation before taking their chapter. Existing stats and equipment are retained.')),('Not yet',[])]))
 body=choice([('Invite '+actors[a]['name'],invite),('Discuss '+q['name'],discussion),('Leave',[])])
 q['giverMenu']=[0,1];body=branch(q['gate'],body,say('Earn the first Collective credential at the hall relay before requesting this field partnership.'))
 if a==6:
  L=D['Map247']['events'][2]['pages'][0]['list'];h=next(c for c in L if c['code']==102 and c['indent']==0);assert h['parameters'][0]==['Begin practice','Pink: directive rehearsal','Not now'];h['parameters'][0].insert(2,'Blue: Stand Down');h['parameters'][1]=3
  i=next(i for i,c in enumerate(L)if c['code']==402 and c['indent']==0 and c['parameters'][0]==2);L[i]['parameters'][0]=3;L[i:i]=[C(402,2,'Blue: Stand Down')]+nest(body)+[dict(C(0),indent=1)];q['giver']=[247,2];q['prefix']=[2]
 else:
  e=add(q['map'],actors[a]['name']+' - '+q['name'],q['spot'],body,actors[a]['characterName'],actors[a]['characterIndex'],a);q['giver']=[q['map'],e['id']];q['giverPosition']=[e['x'],e['y']];q['prefix']=[]
 q['reward']={'exp':200,'credits':q['credits'],'item':q['item']}
for n,d in D.items():Path('data/'+n+'.json').write_text(json.dumps(d,ensure_ascii=False,separators=(',',':')),encoding='utf-8')
# The existing read-only log automatically includes these flag-backed definitions.
p=Path('js/plugins/ME_CompletionLog.js');s=p.read_text(encoding='utf-8');entries=[]
for q in chapters:
 b=q['base'];where=q['location'];hint='Invite this companion explicitly, then put them conscious in the walking party using Formation. '+q['tasks'][0][2]+', then '+q['tasks'][1][2]+'. Return to the contact for a local outcome and one-time reward.'
 entries.append(" entry("+','.join(json.dumps(x)for x in [q['id'],q['name']+': '+actors[q['actor']]['name'],'projects'])+",function(){return {complete:sw("+str(b+4)+"),status:state(sw("+str(b+4)+"),sw("+str(b)+"),sw("+str(b+3)+")),progress:sw("+str(b+4)+")?'Reward claimed.':sw("+str(b+3)+")?'Resolution recorded; reward awaits.':count(["+str(b+1)+","+str(b+2)+"])+ '/2 checks complete.',location:"+json.dumps(where)+",hint:sw("+str(b+3)+")?(sw("+str(b+5)+")?"+json.dumps(q['outcomes'][1])+":"+json.dumps(q['outcomes'][0])+")+ (sw("+str(b+4)+")?'':' Return with the companion and room for the reward.') :"+json.dumps(hint)+"};});")
i=s.index(" entry('recycling'");s=s[:i]+'\n'.join(entries)+'\n'+s[i:];p.write_text(s,encoding='utf-8')
(OUT/'manifest.json').write_text(json.dumps(dict(chapters=chapters,logTotal=36,projectTotal=23,scope='One bounded chapter for each existing companion actor2–10, excluding protagonist and antagonist-only records.'),indent=2),encoding='utf-8');print('Installed five remaining A15 chapters and explicit recruitment; verification pending.')

import runpy
runpy.run_path(str(OUT/"finalize.py"))
