"""A14/A17/A18/A23: native, optional local projects on existing maps."""
import copy
import json
import textwrap
import zipfile
from collections import deque
from pathlib import Path

OUT = Path('tools/local-projects')
def load(n): return json.loads(Path('data/'+n+'.json').read_text(encoding='utf-8'))
D = {n:load(n) for n in ['System','CommonEvents','Map103','Map106','Map108','Map244']}
assert len(D['System']['switches']) == 194 and len(D['CommonEvents']) == 10
with zipfile.ZipFile(OUT/'before.zip','x',zipfile.ZIP_DEFLATED) as z:
    for n in D: z.write('data/'+n+'.json')

# Reuse proven event/passage helpers without executing an older content builder.
source = Path('tools/clown-court/build.py').read_text(encoding='utf-8')
ns = {'load':load,'copy':copy,'textwrap':textwrap,'tiles':load('Tilesets'),'deque':deque}
exec(source[source.index('def C('):source.index("m=D['Map010']")],ns)
C,nest,say,branch,choice,on,event,passable,flood = [ns[n] for n in ['C','nest','say','branch','choice','on','event','passable','flood']]
def setvar(n,v): return C(122,n,n,0,0,v)
def script(s): return C(355,s)
def flag(n): return f'$gameSwitches.value({n})'
def stage(n,k): return f'$gameVariables.value({n})==={k}'

s=D['System']
s['switches'] += [
    "Workers' Memory - accepted", 'Archive terminal - solved', 'Archive terminal - stipend paid',
    'Workers Memory - canteen safety copy', 'Workers Memory - SLF consent copy',
    'Workers Memory - archive finished', 'Sorting station - passed', 'Sorting station - reward paid',
    'Workers Memory - public safety archive',
]
s['variables'] += ['']*(54-len(s['variables']))
s['variables'][51:54] = ['Rivet crew standing','Archive terminal stage','Sorting station stage']

refresh = script("var score=($gameSwitches.value(191)?1:0)+($gameSwitches.value(199)?1:0)+($gameSwitches.value(200)?1:0);$gameVariables.setValue(51,score);")
display = script("$gameMessage.add('Rivet crew standing: '+$gameVariables.value(51)+'/3.');$gameMessage.add($gameVariables.value(51)>=2?'Beryl: 10% off hardware purchases.':'At 2/3, Beryl offers 10% off hardware.');$gameMessage.add('Earn trust: recycling, archive, sorting.');this.setWaitMode('message');")
D['CommonEvents'].append(dict(id=10,name='Rivet crew - standing',trigger=0,switchId=1,list=[refresh,display,C(0)]))

# Beryl retains the exact menu, exchange, notes and merchandise. Replace only
# the Browse hardware shop command block with an equivalent local-price shop.
e=D['Map103']['events'][2]
L=e['pages'][0]['list']
start=next(i for i,c in enumerate(L) if c['code']==302)
end=start+1
while end<len(L) and L[end]['code']==605: end+=1
goods=[c['parameters'][:4] for c in L[start:end]]
shop_code="var goods="+json.dumps(goods,separators=(',',':'))+";if($gameVariables.value(51)>=2){goods=goods.map(function(g){var db=[null,$dataWeapons,$dataArmors][g[0]]||$dataItems;var base=g[2]===1?g[3]:db[g[1]].price;return [g[0],g[1],1,Math.floor(base*0.9)];});}SceneManager.push(Scene_Shop);SceneManager.prepareNextScene(goods,false);"
L[start:end]=[dict(script(shop_code),indent=L[start]['indent'])]
L[:0]=[C(117,10)]

# Three-stage terminal: a readable audit procedure, not a typing/timing trap.
capacity=lambda item,gold: f'$gameParty.numItems($dataItems[{item}])<$gameParty.maxItems($dataItems[{item}]) && $gameParty.gold()+{gold}<=$gameParty.maxGold()'
hack_pay=branch(flag(196),say('The repair stipend was paid. The read-only mirror remains available.'),branch(capacity(9,80),[C(126,9,0,0,1),C(125,0,0,80),on(196)]+say('Repair stipend: 80 Credits and 1 Energy Drink. The mirror contains the workshop maintenance record.'),say('Your repair stipend is reserved. Make room for an Energy Drink and 80 Credits, then return.')))
hack_success=[on(195),setvar(52,0)]+say('READ-ONLY MIRROR VERIFIED. The safety notice survives; the live prosthetic-joint controls are untouched. This record counts toward the Workers Memory archive, even if you accept that job later.')+hack_pay
def wrong(): return [setvar(52,0)]+say('Sandbox rejected the sequence. No equipment, money or health was touched. Start again: isolate the actuator link, copy read-only, then verify the checksum.')
steps=[
 ('LIVE ACTUATOR LINK: A recalled knee is not a printer. What comes first?', [('Isolate actuator link',[setvar(52,1)]),('Copy live control image',wrong()),('Read procedure',say('Procedure: isolate actuator link, copy read-only mirror, verify checksum. Leave at any stage to resume later.')),('Leave terminal',[])]),
 ('ACTUATOR LINK ISOLATED. Preserve the safety notice without changing the control image.', [('Overwrite production image',wrong()),('Copy read-only mirror',[setvar(52,2)]),('Read procedure',say('Keep the isolated link closed. Copy the read-only mirror before you verify its checksum.')),('Leave terminal',[])]),
 ('READ-ONLY COPY READY. Which operation closes the audit?', [('Delete original notice',wrong()),('Reconnect live knee',wrong()),('Verify copied checksum',hack_success),('Leave terminal',[])]),
]
# Each interaction asks exactly one stage; progress survives leaving/saving.
staged=branch(stage(52,0),say(steps[0][0])+choice(steps[0][1]),branch(stage(52,1),say(steps[1][0])+choice(steps[1][1]),say(steps[2][0])+choice(steps[2][1])))
hack=say('Socket built a sandbox mirror for Armatek recall notices. The company bills nerve damage as customer feedback. Procedure is posted on the housing: ISOLATE, COPY READ-ONLY, VERIFY. No live implants are connected.')+branch(flag(195),hack_pay,staged)
e=D['Map108']['events'][3]
old=e['pages'][0]['list'][:-1]
e['pages'][0]['list']=choice([('Buy workshop tools',old),('Patch archive mirror',hack),('Leave',[])])+[C(0)]

# A three-copy Workers' Memory errand, based on the authored Wasteland Historians
# branch and existing crew/SLF stories. No personal records are copied.
e=D['Map106']['events'][5]
old=e['pages'][0]['list'][:-1]
copy_canteen=branch(flag(194),branch(flag(197),say('You already copied the public canteen safety strip.'),say('PUBLIC SAFETY STRIP: Wash hands before handling food. Your employer cannot classify fingers as reusable cutlery. The steward authorizes a copy. No missing-worker names or private family records are copied.')+[on(197)]),say('Splice in Rivet Commons is collecting public workers safety records. Ask about the Workers Memory archive first.'))
e['pages'][0]['list']=choice([('Read memorial board',old),('Copy public safety strip',copy_canteen),('Leave',[])])+[C(0)]
e=D['Map244']['events'][4]
old=e['pages'][0]['list'][:-1]
copy_slf=branch(flag(194),branch(flag(198),say('The SLF reuse permission is already on your slate.'),say('INEZ: Copy the consent clause, not patient memories. Voluntary means you can stop. Armatek defines it as you were technically breathing when you signed. You have permission to reuse this clause in the local archive, with credit. It does not change our vending policy.')+[on(198)]),say('INEZ: Splice in Rivet Commons wants a workers archive. Get the brief first. I do not mail my entire brain to everyone who owns a clipboard.'))
e['pages'][0]['list']=choice([('Talk about the firmware',old),('Request archive permission',copy_slf),('Leave',[])])+[C(0)]

def add(m,name,goal,commands,sprite,index):
    occupied={(e['x'],e['y']) for e in m['events'] if e}
    area=max((flood(m,(x,y)) for y in range(m['height']) for x in range(m['width']) if (x,y) not in occupied and any(passable(m,x,y,d) for d in [2,4,6,8])),key=len)
    p=next(p for p in sorted(area-occupied,key=lambda p:(abs(p[0]-goal[0])+abs(p[1]-goal[1]),p[1],p[0])) if len(flood(m,next(iter(area-{p})),p))>=len(area)-1)
    e=event(m,name,*p,commands,sprite,index)
    e['note']='Local projects A14/A17/A18/A23; optional, no campaign gates.'
    return e

progress=script("$gameMessage.add('Workers Memory: '+([$gameSwitches.value(195),$gameSwitches.value(197),$gameSwitches.value(198)].filter(function(v){return v;}).length)+'/3 copies.');$gameMessage.add('Workshop mirror; canteen safety strip;');$gameMessage.add('SLF firmware author Inez: permission.');this.setWaitMode('message');")
complete=flag(195)+' && '+flag(197)+' && '+flag(198)
def finish(public):
    return [C(121,202,202,0 if public else 1),on(199),C(126,171,0,0,1),C(125,0,0,180),refresh]+say(('The local public safety archive is open. Only the approved notices are posted.' if public else 'Splice keeps the copies for the repair crew. Nothing is put on a public noticeboard.')+' Received 180 Credits and 1 Panacea. The crew trusts you a little more. Nobody sold a patient list to an insurer.')
claim=branch(complete,branch(capacity(171,180),say('All three authorized copies are ready. Choose where they live. Both choices pay 180 Credits and 1 Panacea and earn the same crew standing.')+choice([('Publish safety notices',finish(True)),('Crew reference copies only',finish(False)),('Decide later',[])]),say('Your archive reward is reserved. Make room for 1 Panacea and 180 Credits; no copies or choices are lost.')),say('Still needed: the workshop terminal mirror, public canteen safety strip and Inez at the Snack Liberation Front. No boss or private patient record is required.'))
archive_intro=say('SPLICE: Armatek has been selling our own safety notices back to us. My replacement hippocampus requires a subscription. I am keeping this archive outside my fucking head. Copy three approved records: the Shared Workshop mirror, the Last Shift Canteen safety strip, and Inez at the SLF. Then bring the slate back here. Payment: 180 Credits and a Panacea.')+choice([('Take the archive job',[on(194)]+say('Workers Memory accepted. The workshop is here in Rivet Commons; the canteen is in Dorlund; the SLF is below the Timbuc neural hatch. Ask Inez for reuse permission.')),('Not now',[])])
archive_done=branch(flag(202),say('SPLICE: Public safety notices, author credit, no patient names. Look at that: history without a targeted hemorrhoid advert.'),say('SPLICE: The crew keeps the reference copies. Armatek still cannot charge us for remembering how our knees work.'))
archive=branch(flag(199),archive_done,branch(flag(194),[progress]+choice([('File completed archive',claim),('Remind me of the job',say('Copy three sources in any order: workshop sandbox terminal, canteen public safety strip, and SLF firmware author Inez. The mirror can be fixed before accepting. Return here to choose public or crew-only copies.')),('Leave',[])]),archive_intro))
archivist=add(D['Map103'],'Splice - Workers Memory archive',(17,18),[C(117,10)]+choice([('Workers Memory archive',archive),('Crew standing explained',say('Rivet crew standing is local. Finish Beryl\'s six-part exchange, the Workers Memory archive, or one perfect sorting run. Each counts once. At two of three, Beryl cuts hardware purchase prices by 10%. Other shops and selling prices are unchanged.')),('Leave',[])]),'SF_People1',7)

# Free authored classification game. Safe props, exact posted rules, one reward;
# a capacity block leaves the earned claim pending rather than requiring a replay.
sort_pay=branch(flag(201),say('First-pass reward already paid. Practice is free and pays nothing extra.'),branch(flag(200),branch(capacity(170,150),[C(126,170,0,0,1),C(125,0,0,150),on(201)]+say('First-pass reward: 150 Credits and 1 Green Herb. One crew-standing credit; no repeat wages from a sealed practice crate.'),say('Your first-pass reward is reserved. Make room for 1 Green Herb and 150 Credits, then claim it here.')),say('Pass three classifications in one run to qualify. Mistakes and leaving cost nothing.')))
questions=[('A bent aluminum time-clock shell. No circuit board, battery or tissue remains.',0),('A dead circuit board. All power cells have been removed; no biological coating.',1),('A sealed filter labeled BIOLOGICAL CONTAMINATION. It contains simulated tissue, not a live exposure.',2)]
sort_rounds=[setvar(53,0)]
for k,(prompt,correct) in enumerate(questions):
    answers=[]
    for j,label in enumerate(['Metal bin','Electronics bin','Biohazard bin']):
        good=[setvar(53,k+1)]+say('Correct. '+('Clean separation keeps the crew safe.' if k<2 else 'All three classified correctly.'))
        bad=[setvar(53,-1)]+say('Training stop. Correct bin: '+['metal','electronics','biohazard'][correct]+'. No real contaminants or penalties. Try again whenever ready.')
        answers.append((label,good if j==correct else bad))
    answers.append(('Leave practice',[setvar(53,-1)]+say('Practice stopped. No cost, damage or disease.')))
    sort_rounds += branch(stage(53,k),say(f'CRATE {k+1}/3: '+prompt)+choice(answers))
sort_rounds += branch(stage(53,3),[on(200),refresh]+sort_pay)+[setvar(53,0)]
sort_intro=say('SORTING PRACTICE: Bare clean metal goes to METAL. Bare unpowered boards go to ELECTRONICS. Anything biologically coated goes to BIOHAZARD. These are sealed training props. Three correct in one run earns 150 Credits and 1 Green Herb once. Repeats are practice only. No entry fee or disease roll.')
sorter=add(D['Map103'],'Three-bin sorting station',(25,18),sort_intro+choice([('Start free practice',sort_rounds),('Claim first-pass reward',sort_pay),('Crew standing',[C(117,10)]),('Leave',[])])+[setvar(53,0)],'!SF_Switch1',0)

for n,d in D.items(): Path('data/'+n+'.json').write_text(json.dumps(d,ensure_ascii=False,separators=(',',':')),encoding='utf-8')
manifest=dict(scope=['A14','A17','A18','A23'],maps=[103,106,108,244],archivist=[103,archivist['id']],sorter=[103,sorter['id']],terminal=[108,3],canteen=[106,5],inez=[244,4],vendor=[103,2],standingVariable=51,hackStage=52,sortStage=53,standingEvent=10,archiveFlags=[194,195,197,198,199,202],hackFlags=[195,196],sortFlags=[200,201],originalGoods=goods,newEventLocations={archivist['id']:[archivist['x'],archivist['y']],sorter['id']:[sorter['x'],sorter['y']]})
(OUT/'manifest.json').write_text(json.dumps(manifest,indent=2),encoding='utf-8')
print('Built four local projects; runtime verification remains. New events:',manifest['newEventLocations'])
import runpy
runpy.run_path(str(OUT/'finalize.py'))
