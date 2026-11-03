"""A20: fixed paired illusion rooms, native events, no physics or OS changes."""
import json,copy,textwrap,re,zipfile
from pathlib import Path
from collections import deque
OUT=Path('tools/illusion-room')
def load(n):return json.loads(Path('data/'+n+'.json').read_text(encoding='utf-8'))
D={n:load(n)for n in['System','MapInfos','Map002']}
assert len(D['System']['switches'])==259 and len(D['MapInfos'])==249
assert not Path('data/Map249.json').exists()and not Path('data/Map250.json').exists()
with zipfile.ZipFile(OUT/'before.zip','x',zipfile.ZIP_DEFLATED)as z:
 for n in D:z.write('data/'+n+'.json')
 z.write('js/plugins/ME_CompletionLog.js')
src=Path('tools/clown-court/build.py').read_text(encoding='utf-8');ns={'load':load,'copy':copy,'textwrap':textwrap,'tiles':load('Tilesets'),'deque':deque};exec(src[src.index('def C('):src.index("m=D['Map010']")],ns)
C,nest,say,branch,choice,on,event=[ns[n]for n in['C','nest','say','branch','choice','on','event']]
D['System']['switches']+=['Perfect Fit - accepted','Perfect Fit - original tape','Perfect Fit - maintenance note','Perfect Fit - calibrated','Perfect Fit - reward claimed','Perfect Fit - opt-in demo','Perfect Fit - resolution recorded']
def f(n):return f'$gameSwitches.value({n})'
def transfer(n,x,y):return C(201,0,n,x,y,2,0)
complete='$gameSelfSwitches.value([10,11,"B"]) || $gameSelfSwitches.value([10,13,"B"])'
capacity='$gameParty.gold()+150<=$gameParty.maxGold() && $gameParty.numItems($dataItems[171])<$gameParty.maxItems($dataItems[171])'
outcome=branch(f(264),say('The fitting-room display is kept as an opt-in demonstration. Its pitch cannot activate itself.'),say('The sales projection is disconnected. Its test layout remains available as an archive.'))
grant=[on(263),C(125,0,0,150),C(126,171,0,0,1)]+say('Received 150 Credits and 1 Panacea. The fitting-room inspection is settled. One invoice for a fourth wall has been shredded on your behalf.')
claim=branch(capacity,grant,say('Make room for 150 Credits and 1 Panacea. Your inspection and choice are recorded; the full reward waits here.'))
entry=branch(f(263),outcome,branch(f(265),outcome+claim,say('PANTS-O-RAMA: The nanites are off, but an old sales projector still insists its trousers fit by shrinking the customer\'s reflection. Inspect its two fixed displays. The green return station always brings you outside. No charge, treatment or change of clothes.')))+choice([('Enter fitting-room display',[on(259),transfer(249,8,10)]),('Stay outside',[])])
# Keep the original clothing purchase/leave indices, commands and battle intact.
L=D['Map002']['events'][23]['pages'][1]['list'];h=next(c for c in L if c['code']==102 and c['indent']==1);assert h['parameters'][0]==['Buy safe burlap clothing','Leave'];h['parameters'][0].append('Inspect fitting-room projection')
i=next(i for i,c in enumerate(L)if c['code']==404 and c['indent']==1);L[i:i]=[dict(C(402,2,'Inspect fitting-room projection'),indent=1)]+[dict(c,indent=c['indent']+2)for c in entry]+[dict(C(0),indent=2)]
# Honor an already-claimed legacy researcher outcome before showing the post-SEAM page.
guard=D['Map002']['events'][23]['pages'][0]['list'][0];assert guard['code']==111;guard['parameters'][1]='('+guard['parameters'][1]+') || ('+complete+')'
maps={};walk={(x,y)for y in range(3,12)for x in range(2,15)}
core=Path('js/rpg_core.js').read_text(encoding='utf-8');FLOOR=json.loads(re.search(r'Tilemap.FLOOR_AUTOTILE_TABLE = (\[.*?\]);',core,re.S)[1])
def put(n,x,y,t,z=0):
 m=maps[n];assert 0<=x<m['width']and 0<=y<m['height'];m['data'][(z*m['height']+y)*m['width']+x]=t
s=Path('tools/dungeons/build_dungeons.py').read_text(encoding='utf-8');env={'maps':maps,'FLOOR':FLOOR,'put':put};exec(s[s.index('def autotile('):s.index('def newmap(')],env);autotile=env['autotile']
def room(n,name,ts,floor,wall,ceiling):
 m=copy.deepcopy(load('Map107'));m.update(width=17,height=13,displayName=name,tilesetId=ts,data=[0]*(17*13*6),events=[None],encounterList=[],autoplayBgm=False,autoplayBgs=False,parallaxName='',parallaxShow=False,scrollType=0,note='A20 optional fixed showroom projection; every exit is unconditional.');maps[n]=m
 for x,y in walk:put(n,x,y,floor)
 walls={(x+dx,y+dy)for x,y in walk for dx,dy in[(0,1),(-1,0),(1,0),(0,-1)]if(x+dx,y+dy)not in walk}
 for x,y in walls:
  shape=sum(v for dx,dy,v in[(-1,0,1),(0,-1,2),(1,0,4),(0,1,8)]if(x+dx,y+dy)not in walls);put(n,x,y,wall+shape)
 for x,y in walls:
  if y>0 and(x,y-1)not in walk|walls:put(n,x,y-1,ceiling)
 autotile(n,floor);autotile(n,ceiling);D['MapInfos'].append(dict(id=n,expanded=False,name=name,order=n,parentId=2,scrollX=0,scrollY=0));return m
room(249,'Pants-O-Rama - Original Measure',6,2912,6416,5936)
room(250,'Pants-O-Rama - Sales Reflection',9,2912,6320,5936)
for y in range(6,10):
 for x in range(6,11):put(249,x,y,3680)
autotile(249,3680)
for y in range(6,9):
 for x in range(11,14):put(250,x,y,3392)
autotile(250,3392)
def add(n,name,x,y,commands,sprite='!SF_Switch1',idx=0):
 assert(x,y)in walk
 return event(maps[n],name,x,y,commands,sprite,idx)
def green(e,flag):
 pg=copy.deepcopy(e['pages'][0]);pg['conditions'].update(switch1Valid=True,switch1Id=flag);pg['image']['characterIndex']=2;e['pages'].append(pg)
resolution=say('The projection now follows the tape. Fake shrinkage stops. Keep a voluntary demo, or disconnect the pitch? Either choice leaves an inspection record.')+choice([('Disconnect the sales pitch',[C(121,264,264,1),on(265)]+outcome+say('Return to Pants-O-Rama outside to collect the inspection payment.')),('Keep an opt-in demonstration',[on(264),on(265)]+outcome+say('Return to Pants-O-Rama outside to collect the inspection payment.')),('Decide later',[])])
wrong=say('The stitches do not balance. No adjustment is committed. Recheck the original tape and the maintenance note, then retry for free.')
code=say('Set the stitch counts in the maker\'s original left-to-right orientation. The reflected display reverses the room, not the control wiring.')+choice([('Left: one stitch',wrong),('Left: three stitches',wrong),('Left: four stitches',choice([('Centre: one stitch',choice([('Right: one stitch',wrong),('Right: three stitches',[on(262)]+resolution),('Right: four stitches',wrong),('Stop adjusting',[])])),('Centre: three stitches',wrong),('Centre: four stitches',wrong),('Stop adjusting',[])])),('Stop adjusting',[])])
control=branch(f(265),outcome,branch(f(262),resolution,branch(f(260)+' && '+f(261),code,say('Calibration needs two records: the original tape in the warm showroom and the maintenance note in the blue reflection. Use the crystal to compare layouts.'))))
for n in[249,250]:
 other=250 if n==249 else 249
 add(n,'Green return station - always leave',8,11,[transfer(2,15,9)],idx=2)
 mode=branch(f(265)+' && !'+f(264),say('The sales pitch is disconnected. This crystal opens the archived test layout; it cannot restart the pitch.'),say('The crystal switches between two recorded fitting-room layouts. Your body and equipment stay the same.'))
 add(n,'Projection comparison crystal',8,8,mode+choice([('Compare the other display',[transfer(other,8,9)]),('Stay here',[])]),'!Crystal',1)
 e=add(n,'Original-orientation calibration',8,4,control);green(e,265)
 if n==249:
  e=add(n,'Original seam tape',4,5,[on(260)]+say('ORIGINAL TAPE: Left FOUR. Centre ONE. Right THREE. Four wide stitches, one torn stitch, three repairs. This is the maker\'s orientation, before the sales mirror. Your arse is not a rounding error.'));green(e,260)
  add(n,'Approved fit testimonial',12,5,say('APPROVED TESTIMONIAL: This fabric has converted my rash into measurable enthusiasm. My insurer calls having a body a pre-existing condition. The trousers call it user error.'))
 else:
  add(n,'Reflected advertisement',4,5,say('REFLECTION: PERFECT FIT ACHIEVED. Customer reflection reduced by twelve percent. Actual customer unchanged and increasingly pissed off.'))
  e=add(n,'Mirror maintenance note',12,5,[on(261)]+say('MAINTENANCE: The image swaps left and right. Calibration buttons retain the maker\'s original orientation. Use the original tape order, not the reflected order. A mirror is cheaper than paying a tailor.'));green(e,261)
 add(n,'Archived Armatek fit spokesperson',4 if n==249 else 12,8,say('ARCHIVED FIT SPOKESPERSON: If the pants pinch, reduce the customer until satisfaction improves. Please ignore the fourth wall. Its warranty is void if you notice it.'),'SF_People3',3)
for n,m in maps.items():Path(f'data/Map{n:03}.json').write_text(json.dumps(m,ensure_ascii=False,separators=(',',':')),encoding='utf-8')
for n,d in D.items():Path('data/'+n+'.json').write_text(json.dumps(d,ensure_ascii=False,separators=(',',':')),encoding='utf-8')
p=Path('js/plugins/ME_CompletionLog.js');s=p.read_text(encoding='utf-8');i=s.index(" entry('recycling'");s=s[:i]+" entry('perfectFit','The Perfect Fit','projects',function(){return {complete:sw(263),status:state(sw(263),sw(259),sw(265)),progress:sw(263)?'Inspection payment claimed.':sw(265)?'Projection policy settled; payment awaits.':sw(262)?'Calibration solved; choose a policy.':count([260,261])+'/2 fitting-room records found.',location:'Pants-O-Rama in Timbuc2, after the original SEAM hand-in reward.',hint:sw(265)?(sw(264)?'Demonstration retained with opt-in activation.':'Sales pitch disconnected; archive remains accessible.')+(sw(263)?'':' Return outside with room for150 Credits and1 Panacea.'):'Read the original tape and mirror maintenance note in the paired displays. Calibrate in the maker\'s original orientation, then choose a local policy. The green south station always exits.'};});\n".replace("maker's","maker\\'s")+s[i:];p.write_text(s,encoding='utf-8')
(OUT/'manifest.json').write_text(json.dumps(dict(name='The Perfect Fit',maps=[249,250],entry=[2,23],entryChoice=2,entryLanding=[249,8,10],exitLanding=[2,15,9],comparisonLanding=[8,9],flags=list(range(259,266)),tape=[249,4],maintenance=[250,5],control=3,crystal=2,exit=1,codeChoices=[2,0,1],reward=dict(credits=150,item=171,count=1)),indent=2),encoding='utf-8');print('Built paired fitting-room projection; native verification pending.')
