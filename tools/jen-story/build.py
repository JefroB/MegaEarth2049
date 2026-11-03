"""A15 second companion chapter: Without a Badge. Local fictional care case."""
import copy,json,textwrap,zipfile
from pathlib import Path
from collections import deque
OUT=Path('tools/jen-story')
def load(n):return json.loads(Path('data/'+n+'.json').read_text(encoding='utf-8'))
D={n:load(n) for n in ['System','Map025','Map026','Map027']}
assert len(D['System']['switches'])==209
with zipfile.ZipFile(OUT/'before.zip','x',zipfile.ZIP_DEFLATED)as z:
    for n in D:z.write('data/'+n+'.json')
    z.write('js/plugins/ME_CompletionLog.js')
src=Path('tools/clown-court/build.py').read_text(encoding='utf-8');ns={'load':load,'copy':copy,'textwrap':textwrap,'tiles':load('Tilesets'),'deque':deque}
exec(src[src.index('def C('):src.index("m=D['Map010']")],ns)
C,nest,say,branch,choice,on,event,passable,flood=[ns[n]for n in ['C','nest','say','branch','choice','on','event','passable','flood']]
D['System']['switches'] += ['Without a Badge - accepted','Without a Badge - patient consent','Without a Badge - treatment-only permit','Without a Badge - offline care slot','Without a Badge - Orla treated / Jen EXP','Without a Badge - patient keeps denial stub','Without a Badge - supply kit claimed','Without a Badge - civilian exemption route']
def flag(n):return f'$gameSwitches.value({n})'
present='$gameParty.battleMembers().some(function(a){return a.actorId()===2 && a.isAlive();})'
bring=say('Bring Jen, conscious and in the walking party, to discuss this care case. Orla can wait safely; no timer is running.')
kit=branch(flag(215),say('The volunteer supply kit was already collected. Orla keeps her clinic follow-up.'),branch('$gameParty.numItems($dataItems[157])<$gameParty.maxItems($dataItems[157])',[C(126,157,0,0,1),on(215)]+say('Volunteer supply kit: 1 Pathogen Purge. Jen\'s personal EXP was awarded when care was provided.'),say('Orla has already received care. The volunteer supply kit is held here until you have room for 1 Pathogen Purge. No treatment or EXP is withheld.')))
def finish(keep):
    return [C(121,214,214,0 if keep else 1),on(213),C(315,0,2,0,0,200,False)]+say(('Orla keeps the security-denial stub as proof of the refusal. ' if keep else 'Orla watches Jen shred the obsolete security-denial stub. ')+"The clinic keeps only the treatment chart Orla authorized. The fictional implant irritation is treated offscreen. Jen gains 200 EXP.")+say('ORLA: It stopped coughing up invoices. There is still a customer-satisfaction form in my spit. JEN: One problem at a time. I left OmniCorp because a uniform was becoming an excuse. You do not need my badge. You need care.')+kit

consent=say('ORLA: My name and treatment notes can stay in this clinic. No voice prints. No implant memories. No fucking security watchlist. Ask me what you need, then stop there.')+choice([('Record that limited consent',[on(210)]+say('Treatment-only consent recorded. Use the consent analyst upstairs for a reviewed permit, or ask intake for a civilian exemption. Both preserve the same limits.')),('Request full implant dump',say('ORLA: No. That is not what I agreed to. JEN: Then we do not do it. No scan or transfer takes place.')),('Ask another time',[])])
treat=branch(flag(210)+' && '+flag(211)+' && '+flag(212),say('Orla confirms she still wants care. She also gets to choose what happens to the obsolete security-denial stub. Neither option sends her chart to OmniCorp.')+choice([('Keep stub as proof',finish(True)),('Shred the security stub',finish(False)),('Come back later',[])]),say('First record Orla\'s limited consent. Get a reviewed treatment-only permit from the Floor 3 analyst, or a civilian exemption at Floor 1 intake. Then ask intake to clear an offline care slot and return here with Jen.'))
case=say('ORLA: The throat mod grew an extra tonsil. It coughs up laminated claim forms. Intake confirmed I have a body and marked that as a pre-existing condition. JEN: OmniCorp linked security clearance to triage. I know that policy. I used to wear their badge.')+choice([('Help with this care case',[on(209)]+say('Without a Badge accepted. Ask Orla what she permits. Then choose the upstairs consent review or the civilian exemption at intake. No badge, credits or medicine donation is required.')),('Not now',[])])
active=choice([('Ask / confirm consent',branch(flag(210),say('Orla\'s limits remain: local treatment notes only. No implant dump or security feed.'),consent)),('Provide authorized care',treat),('Review the case',say('Orla: Floor 2. Consent analyst: Floor 3. Intake: Floor 1. Limited consent first; either permit route second; intake care slot third. Return to Orla with Jen. Refusals and wrong previews are safe and retryable.')),('Leave',[])])
done=branch(flag(214),say('ORLA: I kept the denial stub. If they call this a voluntary absence, I have the receipt. My follow-up stays in the clinic.'),say('ORLA: The obsolete security stub is shredded. My follow-up stays in the clinic. Nobody gets to rent my throat to a marketing partner.'))+choice([('Collect volunteer supply kit',kit),('Leave',[])])
patient=branch(flag(213),done,branch(present,branch(flag(209),active,case),say('ORLA: They confirmed I had a body and refused coverage. If Jen is with you, I would like to talk to her about a local care case.')+bring))

def add(m,name,goal,commands):
    occupied={(e['x'],e['y'])for e in m['events']if e};area=max((flood(m,(x,y))for y in range(m['height'])for x in range(m['width'])if(x,y)not in occupied and any(passable(m,x,y,d)for d in [2,4,6,8])),key=len)
    p=next(p for p in sorted(area-occupied,key=lambda p:(abs(p[0]-goal[0])+abs(p[1]-goal[1]),p[1],p[0]))if len(flood(m,next(iter(area-{p})),p))>=len(area)-1)
    e=event(m,name,*p,commands,'SF_People2',6);e['note']='A15 Jen companion chapter: local fictional care case, no party healing.';return e
orla=add(D['Map026'],'Orla - Without a Badge',(19,5),patient)
pg=copy.deepcopy(orla['pages'][0]);pg['conditions'].update(switch1Valid=True,switch1Id=213);pg['image']['direction']=4;pg['list']=done+[C(0)];orla['pages'].append(pg)

requirements=flag(209)+' && '+flag(210)
grant=[on(211),C(121,216,216,1)]+say('Reviewed permit: local treatment notes only, offline clinic chart. No patient memory or security export is authorized. Ask intake downstairs to clear the care slot.')
review=say('PREVIEW ONLY. Posted rule: authorize only the treatment notes Orla agreed to, and route them to the offline clinic chart. Wrong previews send no data.')+choice([('Treatment notes only',choice([('Offline clinic chart',grant),('OmniCorp security feed',say('Preview rejected. The security feed exceeds Orla\'s consent. No record was sent. Retry or use intake\'s civilian exemption.')),('Leave preview',[])])),('Full neural-memory dump',say('Preview rejected. Orla did not consent to implant memories. No scan or export occurred.')),('Leave',[])])
analyst=branch(flag(213),say('Orla\'s authorized care is complete. The clinic chart stays local.'),branch(present,branch(requirements,branch(flag(211),say('The treatment-only permit is already valid. Intake downstairs can clear the offline care slot.'),review),say('Ask Orla on Floor 2 to state her consent first. Accept the care case before requesting this review.')),bring))
e=D['Map027']['events'][3];old=e['pages'][0]['list'][:-1];e['pages'][0]['list']=choice([('Talk about consent forms',old),('Jen: treatment-only review',analyst),('Leave',[])])+[C(0)]

manual=branch(flag(211),say('A permit is already valid. No second approval or payment is needed.'),say('JEN: I am applying as a civilian medic, not OmniCorp security. Local treatment notes. No implant dump. INTAKE: There is a civilian exemption. The company prints it in the bit normally stapled to the back of your spleen.')+choice([('Request civilian exemption',[on(211),on(216)]+say('Civilian exemption recorded, within Orla\'s limits. No corporate badge or fee is required. Clear the offline care slot here next.')),('Decide later',[])]))
slot=branch(flag(211),branch(flag(212),say('Orla\'s offline care slot is already cleared. Return to her on Floor 2 with Jen.'),[on(212)]+say('Offline care slot cleared. Billing has no security feed attached. Return to Orla on Floor 2 with Jen and reconfirm she wants care.')),say('Obtain a treatment-only permit first: reviewed upstairs, or a civilian exemption here.'))
intake=branch(flag(213),say('Orla has received her authorized care. Follow-up remains local. Her volunteer supply kit, if uncollected, is held with her upstairs.'),branch(present,branch(requirements,choice([('Civilian exemption route',manual),('Clear offline care slot',slot),('Leave',[])]),say('Ask Orla on Floor 2 about the case and record her limited consent first.')),bring))
# Keep calibration and Field Guide at their original choice indices0/1.
L=D['Map025']['events'][4]['pages'][0]['list'];header=next(c for c in L if c['code']==102 and c['indent']==0);assert header['parameters'][0]==['Prototype calibration','Read field guide','Leave'];header['parameters'][0].insert(2,'Jen: Orla care case');header['parameters'][1]=3
idx=next(i for i,c in enumerate(L)if c['code']==402 and c['indent']==0 and c['parameters'][0]==2);L[idx]['parameters'][0]=3
L[idx:idx]=[C(402,2,'Jen: Orla care case')]+nest(intake)+[dict(C(0),indent=1)]

for n,d in D.items():Path('data/'+n+'.json').write_text(json.dumps(d,ensure_ascii=False,separators=(',',':')),encoding='utf-8')
manifest=dict(scope='A15 second companion chapter; remaining companions open',title='Without a Badge',actor=2,patient=[26,orla['id']],patientPosition=[orla['x'],orla['y']],intake=[25,4],analyst=[27,3],switches=list(range(209,217)),reward=dict(item=157,quantity=1,actorExp=200),careFlag=213,rewardFlag=215)
(OUT/'manifest.json').write_text(json.dumps(manifest,indent=2),encoding='utf-8');print('Built Without a Badge; verification pending.',manifest['patient'])
import runpy
runpy.run_path(str(OUT/'finalize.py'))
