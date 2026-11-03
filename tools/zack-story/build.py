"""A15 first companion quest: Weight Bearing. No recruitment or battle changes."""
import copy
import json
import textwrap
import zipfile
from pathlib import Path
from collections import deque

OUT=Path('tools/zack-story')
def load(n):return json.loads(Path('data/'+n+'.json').read_text(encoding='utf-8'))
D={n:load(n) for n in ['System','Map103','Map108','Map110']}
assert len(D['System']['switches'])==203
with zipfile.ZipFile(OUT/'before.zip','x',zipfile.ZIP_DEFLATED)as z:
    for n in D:z.write('data/'+n+'.json')
    z.write('js/plugins/ME_CompletionLog.js')
src=Path('tools/clown-court/build.py').read_text(encoding='utf-8')
ns={'load':load,'copy':copy,'textwrap':textwrap,'tiles':load('Tilesets'),'deque':deque}
exec(src[src.index('def C('):src.index("m=D['Map010']")],ns)
C,nest,say,branch,choice,on,event,passable,flood=[ns[n]for n in ['C','nest','say','branch','choice','on','event','passable','flood']]
D['System']['switches'] += ['Weight Bearing - accepted','Weight Bearing - load sheet','Weight Bearing - brace staged','Weight Bearing - complete','Weight Bearing - crew credited','Weight Bearing - brace purchased']
def flag(n):return f'$gameSwitches.value({n})'
present='$gameParty.battleMembers().some(function(a){return a.actorId()===3;})'
room='$gameParty.numItems($dataItems[170])<$gameParty.maxItems($dataItems[170]) && $gameParty.gold()+100<=$gameParty.maxGold()'

def settle(credit):
    return [C(121,207,207,0 if credit else 1),on(206),C(126,170,0,0,1),C(125,0,0,100),C(315,0,3,0,0,200,False)]+say(('The inspection label credits the volunteer crew. ' if credit else 'The inspection label records the repair without names. ')+"The crew fits the brace and the inspection light turns green. Received 100 Credits and 1 Green Herb. Zack gains 200 EXP.")+say("ZACK: Armatek called my family non-load-bearing occupants. I cannot fix what happened. This roof, I can. No speeches. Just something that stays up.")

repair=branch(flag(204)+' && '+flag(205),branch(room,say('The load sheet and brace are ready. Zack and the crew can reinforce the existing home. How should the inspection label read? Both choices give the same reward.')+choice([('Credit the volunteer crew',settle(True)),('Repair record, no names',settle(False)),('Do it later',[])]),say('The crew keeps the materials ready. Make room for 1 Green Herb and 100 Credits before settling the repair. Zack\'s EXP and the inspection label remain pending.')),say('Ask Socket at the Shared Workshop for the free load sheet. Then salvage the marked return-stock brace in the Underworks entry gallery, or buy a precut brace from Socket for 80 Credits. Return here with Zack in the walking party.'))
active=say('ZACK: One sheet tells us what the wall carries. One brace stops the company from calling a collapsed home a market correction.')+choice([('Finish the reinforcement',repair),('Review the work order',say('Free load sheet: Socket, Shared Workshop. Brace: marked clean return-stock cache near the Underworks entrance, or 80 Credits at Socket. This job does not require defeating a boss or resolving the organ ledger. Bring Zack back to the welder for the repair.')),('Leave',[])])
intro=say('WELDER: The west home needs a proper brace. Armatek invoiced the tenants for an emotional support wall. It does not support the fucking roof.')+say('ZACK: I know this design. They used it in the block where my family died. We fix this one while people still have a home. Socket has the load sheet. A clean return-stock brace is in the Underworks entry gallery; or we buy one for 80 Credits.')+choice([('Take the repair shift',[on(203)]+say('Weight Bearing accepted. Get Socket\'s load sheet and either source for the brace. Return to the welder with Zack in the walking party. Payment: 100 Credits, 1 Green Herb and 200 EXP for Zack.')),('Another time',[])])
done=branch(flag(207),say('The inspection label credits the volunteer crew. The repair is holding. Zack checks the bolts without making a speech.'),say('The inspection label records the repair without names. The repair is holding. Zack checks the bolts without making a speech.'))
story=branch(flag(206),done,branch(present,branch(flag(203),active,intro),say('The welder wants Zack\'s help with this home. Put him in the walking party when you want to discuss the repair. Nobody is recruited, removed or replaced by this job.')))
e=D['Map103']['events'][5]
old=e['pages'][0]['list'][:-1]
e['pages'][0]['list']=choice([('Neighborhood / joke card',old),('Zack: Weight Bearing',story),('Leave',[])])+[C(0)]

plan=branch(flag(203),branch(flag(204),say('Socket\'s load sheet is already copied. It specifies a diagonal brace and keeps the doorway clear.'),[on(204)]+say('SOCKET: Here is the load sheet. A roof carries weight. A press release does not. The doorway stays clear, and we do not drill into the water line. Copy made; no implant recall specification is required.')),say('Speak to the Rivet community welder with Zack first. The repair shift is separate from my prosthetic recall investigation.'))
buy=branch(flag(203),branch(flag(205),say('A brace is already staged with the crew. No second payment is needed.'),branch('$gameParty.gold()>=80',choice([('Buy precut brace: 80 Credits',[C(125,1,0,80),on(205),on(208)]+say('One precut brace is staged with the Rivet crew. No weapon or equipped gear was consumed.')),('Keep looking for salvage',[])]),say('A precut brace costs 80 Credits. The marked return-stock cache near the Underworks entry passage is the free alternative. No payment taken.'))),say('Take the repair shift with Zack at the Rivet welder first.'))
for pg in D['Map108']['events'][5]['pages']:
    old=pg['list'][:-1]
    pg['list']=choice([('Prosthetic recall investigation',old),('Zack: load sheet / brace',branch(flag(206),say('The reinforcement is finished. The load sheet remains on file; no more materials or payment are needed.'),choice([('Copy free load sheet',plan),('Buy precut brace',buy),('Leave',[])]))),('Leave',[])])+[C(0)]

def add(m,name,goal,commands,sprite,index):
    occupied={(e['x'],e['y'])for e in m['events']if e}
    area=max((flood(m,(x,y))for y in range(m['height'])for x in range(m['width'])if(x,y)not in occupied and any(passable(m,x,y,d)for d in[2,4,6,8])),key=len)
    p=next(p for p in sorted(area-occupied,key=lambda p:(abs(p[0]-goal[0])+abs(p[1]-goal[1]),p[1],p[0]))if len(flood(m,next(iter(area-{p})),p))>=len(area)-1)
    e=event(m,name,*p,commands,sprite,index);e['note']='A15 Weight Bearing: optional Zack story.';return e

cache=add(D['Map110'],'Clean return-stock brace - Weight Bearing',(12,22),branch(flag(205),say('The Rivet crew already has its brace. Leave this stock for the next repair.'),branch(flag(203),say('RETURN STOCK: a clean, unused structural brace. No invoice cable, living tissue or contaminated filter is attached.')+choice([('Stage brace for Rivet crew',[on(205),C(123,'A',0)]+say('The marked brace is staged with the crew. Get Socket\'s free load sheet if you have not already; return to the Rivet welder with Zack.')),('Leave it',[])]),say('A clean structural brace is tagged for local repairs. Ask the Rivet welder about a repair shift with Zack.'))),'!SF_Chest',0)
indicator=add(D['Map103'],'Weight Bearing inspection light',(10,5),branch(flag(203),say('REINFORCEMENT PENDING. The volunteer crew needs Socket\'s load sheet, one brace and Zack. The community welder coordinates the work.'),say('LOAD INSPECTION: reinforcement required. Ask the community welder with Zack in the walking party.')),'!SF_Switch1',0)
pg=copy.deepcopy(indicator['pages'][0]);pg['conditions'].update(switch1Valid=True,switch1Id=206);pg['image']['characterIndex']=2
pg['list']=branch(flag(207),say('REINFORCED BY THE VOLUNTEER CREW. Load checked. Doorway clear. Paid for by people who actually live here.'),say('REINFORCEMENT COMPLETE. Load checked. Doorway clear. No names or personal records are published.'))+[C(0)]
indicator['pages'].append(pg)

for n,d in D.items():Path('data/'+n+'.json').write_text(json.dumps(d,ensure_ascii=False,separators=(',',':')),encoding='utf-8')
manifest=dict(scope='A15 first companion story only',title='Weight Bearing',actor=3,giver=[103,5],socket=[108,5],cache=[110,cache['id']],indicator=[103,indicator['id']],locations={str(cache['id']):[cache['x'],cache['y']],str(indicator['id']):[indicator['x'],indicator['y']]},switches=list(range(203,209)),reward=dict(credits=100,item=170,quantity=1,actorExp=200),paidBraceCost=80)
(OUT/'manifest.json').write_text(json.dumps(manifest,indent=2),encoding='utf-8')
print('Built Weight Bearing; optional first companion quest. Verification pending.',manifest['cache'],manifest['indicator'])
import runpy
runpy.run_path(str(OUT/'finalize.py'))
