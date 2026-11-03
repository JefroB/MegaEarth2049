"""A15 third companion chapter and one earned existing-service fee waiver."""
import copy,json,textwrap,zipfile
from pathlib import Path
from collections import deque
OUT=Path('tools/zed-story')
def load(n):return json.loads(Path('data/'+n+'.json').read_text(encoding='utf-8'))
D={n:load(n) for n in ['System','CommonEvents','Map099']}
assert len(D['System']['switches'])==217
with zipfile.ZipFile(OUT/'before.zip','x',zipfile.ZIP_DEFLATED)as z:
    for n in D:z.write('data/'+n+'.json')
    for n in ['ME_CompletionLog','ME_FieldGuide']:z.write('js/plugins/'+n+'.js')
src=Path('tools/clown-court/build.py').read_text(encoding='utf-8');ns={'load':load,'copy':copy,'textwrap':textwrap,'tiles':load('Tilesets'),'deque':deque};exec(src[src.index('def C('):src.index("m=D['Map010']")],ns)
C,nest,say,branch,choice,on,event,passable,flood=[ns[n]for n in ['C','nest','say','branch','choice','on','event','passable','flood']]
D['System']['switches'] += ['Bench Warranty - accepted','Bench Warranty - cutoff test','Bench Warranty - removal test','Bench Warranty - ownership test','Bench Warranty - complete / Zed EXP','Bench Warranty - fee waiver used']
def flag(n):return f'$gameSwitches.value({n})'
present='$gameParty.battleMembers().some(function(a){return a.actorId()===4 && a.isAlive();})'
waiver=flag(221)+' && !'+flag(222)
reset=[C(121,218,220,1)]+say('ZED: Your simulated thumb filed a grievance. Reset the rig and try again. No Credits, implants, equipment or actual limbs were touched.')
finish=[on(220),on(221),C(315,0,4,0,0,200,False)]+say('All three bench tests passed. Zed gains 200 EXP. Earned: one calibration-fee waiver at any prototype mod counter. Bring a valid prototype; buying one still costs 500 Credits. The waiver is used only when a calibration succeeds.')+say('ZED: Emergency stops that charge a fee. Software that refuses to leave an arm. A lease on an elbow. These are not side effects. They are competitors. First calibration is on me. Hardware is still retail. Revolution comes in installments.')
questions=[
 ('BENCH TEST 1: The sample arm charges two Credits per high-five. Its emergency stop demands a payment. Posted rule: emergency shutdown must work without payment.', [('Physical cutoff', [on(218)]+say('Cutoff test passed. The bench stops without a fee. Next test checks behavior after removal.')),('Pay the emergency-stop fee',reset),('Leave the rig',[])]),
 ('BENCH TEST 2: The detached Disco sample still schedules mandatory dancing. Posted rule: a removed module cannot keep running tasks in the owner.', [('Mute the owner\'s hearing',reset),('Clear detached module task',[on(219)]+say('Removal test passed. No task survives detachment. Next test checks who owns the joint.')),('Leave the rig',[])]),
 ('BENCH TEST 3: The task is stopped, but the service account still claims the elbow. Posted rule: local joint control belongs to its owner.', [('Renew the elbow lease',reset),('Return local joint control',finish),('Leave the rig',[])])
]
stages=branch('!'+flag(218),say(questions[0][0])+choice(questions[0][1]),branch('!'+flag(219),say(questions[1][0])+choice(questions[1][1]),say(questions[2][0])+choice(questions[2][1])))
done=branch(flag(222),say('Bench Warranty complete. Your one calibration-fee waiver has been used. Standard fees apply to later calibrations.'),say('Bench Warranty complete. One calibration-fee waiver remains. Any prototype counter can use it on one valid calibration; prototype purchases still cost 500 Credits.'))
start=branch(flag(221),done,branch(present,branch(flag(217),say('ZED: The isolated bench is in this room. Three tests: free emergency cutoff, no tasks after removal, owner control returned. Wrong choices reset the rig. Leaving keeps passed tests. It touches no real implants.'),say('ZED: Vitalix sent a sample arm with a subscription wrist. It tried to repossess my forceps. Help me test the isolated warranty rig before I fit anything like that to a customer. Or a rival. No patients, no entry fee.')+choice([('Take the bench shift',[on(217)]+say('Bench Warranty accepted. Use the isolated bench in this room with Zed conscious in the walking party. Finish three posted tests for 200 personal EXP and one calibration-fee waiver.')),('Another time',[])])),say('Bring Zed conscious in the walking party to discuss the faulty-mod bench. The clinic keeps its regular services.')))
L=D['Map099']['events'][2]['pages'][0]['list'];h=next(c for c in L if c['code']==102 and c['indent']==0);assert h['parameters'][0]==['Recovery service','Prototype calibration','Read field guide','Leave'];h['parameters'][0].insert(3,'Zed: Bench Warranty');h['parameters'][1]=4
idx=next(i for i,c in enumerate(L)if c['code']==402 and c['indent']==0 and c['parameters'][0]==3);L[idx]['parameters'][0]=4;L[idx:idx]=[C(402,3,'Zed: Bench Warranty')]+nest(start)+[dict(C(0),indent=1)]
commands=branch(flag(221),done,branch(present,branch(flag(217),stages,say('Ask the Mod Center counter about Zed\'s Bench Warranty first.')),say('The isolated test rig waits for Zed, conscious and in the walking party.')))
m=D['Map099'];occupied={(e['x'],e['y'])for e in m['events']if e};area=max((flood(m,(x,y))for y in range(m['height'])for x in range(m['width'])if(x,y)not in occupied and any(passable(m,x,y,d)for d in [2,4,6,8])),key=len)
p=next(p for p in sorted(area-occupied,key=lambda p:(abs(p[0]-4)+abs(p[1]-3),p[1],p[0]))if len(flood(m,next(iter(area-{p})),p))>=len(area)-1)
bench=event(m,'Isolated warranty test bench',*p,commands,'!SF_Switch1',0);bench['note']='A15 Zed chapter: isolated simulation, no party implant changes.'
pg=copy.deepcopy(bench['pages'][0]);pg['conditions'].update(switch1Valid=True,switch1Id=221);pg['image']['characterIndex']=2;pg['list']=done+[C(0)];bench['pages'].append(pg)

# Preserve CommonEvent7 ordering and native prerequisites. Waive only successful
# calibration fees, never500-Credit prototype purchases or subsequent returns.
L=D['CommonEvents'][7]['list']
mods=[(133,62,100),(134,63,150),(153,64,180)]
for item,armor,cost in reversed(mods):
    predicate=f'$gameParty.numItems($dataItems[{item}]) > 0 && $gameParty.gold() >= {cost} && !$gameParty.hasItem($dataArmors[{armor}], true)'
    c=next(c for c in L if c['code']==111 and c['parameters']==[12,predicate]);c['parameters'][1]=predicate.replace(f'$gameParty.gold() >= {cost}',f'($gameParty.gold() >= {cost} || ({waiver}))')
    # Locate the fee inside this successful transaction, rather than a purchase.
    i=L.index(c);fee=next(j for j in range(i+1,len(L))if L[j]['code']==125 and L[j]['parameters']==[1,0,cost]);depth=L[fee]['indent']
    replaced=branch(waiver,[on(222)]+say('Zed\'s earned calibration-fee waiver is used. Calibration fee: 0 Credits.'),[C(125,1,0,cost)])
    L[fee:fee+1]=[dict(x,indent=x['indent']+depth)for x in replaced]
    menu=next(j for j in range(i-1,-1,-1)if L[j]['code']==102 and L[j]['indent']==1)
    L[menu]['parameters'][0][0]='Calibrate / earned waiver'
    branch_label=next(c for c in L[menu+1:]if c['code']==402 and c['indent']==1 and c['parameters'][0]==0);branch_label['parameters'][1]='Calibrate / earned waiver'
    confirm=next(j for j in range(menu+1,len(L))if L[j]['code']==102 and L[j]['indent']==2)
    quote=branch(waiver,say('Earned waiver available: calibration fee 0 Credits. The prototype is still consumed. The waiver is used only on success.'),say(f'Standard calibration fee: {cost} Credits. Bring the prototype and no existing copy of this module.'))
    L[confirm:confirm]=[dict(x,indent=x['indent']+2)for x in quote]
prefix=branch(waiver,say('One earned Zed fee waiver is available. It covers one successful calibration at any counter. Standard fees are listed below; the confirmation quote shows your actual fee. Prototype purchases remain 500 Credits.'))
L[:0]=prefix
for n,d in D.items():Path('data/'+n+'.json').write_text(json.dumps(d,ensure_ascii=False,separators=(',',':')),encoding='utf-8')
(OUT/'manifest.json').write_text(json.dumps(dict(title='Bench Warranty',actor=4,giver=[99,2],bench=[99,bench['id']],benchPosition=list(p),switches=list(range(217,223)),waiverAvailable='221 && !222',mods=mods,personalExp=200),indent=2),encoding='utf-8');print('Built Bench Warranty and one-use earned calibration fee waiver; verification pending.')
import runpy
runpy.run_path(str(OUT/'finalize.py'))
