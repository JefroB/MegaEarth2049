from pathlib import Path
import json,zipfile,copy,re
root=Path('.');out=Path('tools/backlog-repairs');out.mkdir(exist_ok=True)
files=['data/CommonEvents.json','data/Items.json','data/Skills.json','data/States.json','data/Troops.json','data/Map001.json','data/Map002.json','data/Map010.json','js/plugins/YEP_QuestJournal.js','.agent/skills/debug-room/SKILL.md']
with zipfile.ZipFile(out/'before.zip','x',zipfile.ZIP_DEFLATED) as z:
 for f in files:z.write(f)
def read(f):return json.loads(Path('data/'+f+'.json').read_text(encoding='utf-8'))
def write(f,d):Path('data/'+f+'.json').write_text(json.dumps(d,ensure_ascii=False,separators=(',',':')),encoding='utf-8')
def c(code,p=[],i=0):return dict(code=code,indent=i,parameters=p)
def text(s,i=0):return [c(101,['',0,0,2],i)]+[c(401,[l],i) for l in s.split('\n')]
ce=read('CommonEvents');ce[1].update(trigger=0,switchId=1)
ce[1]['list']=[c(111,[12,'$gameParty.hasItem($dataItems[144]) && [1,28,39].indexOf($gameMap.mapId()) >= 0'])]+text('Calling the Marcus Garvey 2.0...\nPlease select your destination at navigation.',1)+[c(201,[0,50,7,11,2,0],1),c(411)]+text('The ship needs your transponder signal\nand an open world-map boarding location.',1)+[c(412),c(0)]
write('CommonEvents',ce)
items=read('Items');items[144]['occasion']=2;items[144]['description']='Summons the Marcus Garvey 2.0 from MegaEarth, Ork or Ting Ting world maps. Choose a destination aboard the ship.'
# Keep only one event at each duplicate location, preserving old self-switch completion.
for mid,groups in [(1,[(17,[10,17])]),(2,[(23,[23,26])]),(10,[(10,[10,12]),(11,[11,13])])]:
 d=read(f'Map{mid:03}')
 for primary,ids in groups:
  e=d['events'][primary];pg=e['pages'][0]
  done=' || '.join(f'$gameSelfSwitches.value([{mid},{n},"A"])' for n in ids)
  if mid==1:done+=' || $gameSwitches.value(12) || $gameParty.hasItem($dataItems[132])'
  if mid==2:done+=' || $gameParty.hasItem($dataItems[137])'
  if mid==10:done+=f' || $gameParty.hasItem($dataItems[{135 if primary==10 else 136}])'
  sync=';'.join(f'$gameSelfSwitches.setValue([{mid},{n},"A"],true)' for n in ids)+';'
  if mid==1:
   seq=text("I can assemble your experimental engine.\nBring the blueprint and all three components.")
   seq+=[c(111,[12,'[128,129,130,131].every(function(id){return $gameParty.hasItem($dataItems[id]);})'])]
   seq+=text('All parts accounted for. Let me build it.\nYour completed engine is ready!',1)
   seq += [c(126,[n,1,0,1],1) for n in [128,129,130,131]]+[c(126,[132,0,0,1],1),c(121,[12,12,0],1),c(355,[sync],1),c(411)]
   seq+=text('You still need the blueprint or components.\nCheck the cellar, construction site, drone\nand Armatek office.',1)+[c(412),c(0)]
   pg['list']=seq
  else:
   for cmd in pg['list']:
    if cmd['code']==123:cmd.update(code=355,parameters=[sync])
  pg['list']=[c(111,[12,done]),c(355,[sync],1),c(115,[],1),c(412)]+pg['list']
  for n in ids:
   if n!=primary:d['events'][n]['pages']=[];d['events'][n]['note']='Retired duplicate; canonical event '+str(primary)+'. ID reserved for save compatibility.'
 write(f'Map{mid:03}',d)
# Native troop turn-zero immortality lets the defeat dialogue run before victory.
t=read('Troops');p=t[15]['pages'][0];p['list']=[x for x in p['list'] if x['code']!=340];p['list'].insert(-1,c(333,[0,1,3]));init=copy.deepcopy(p);init['conditions'].update(enemyValid=False,turnValid=True,turnA=0,turnB=0);init['list']=[c(333,[0,0,3]),c(0)];t[15]['pages']=[init,p];write('Troops',t)
# Bounded combat effects; preserve original labels, IDs and bespoke icons.
st=read('States');effects={27:(22,0,-.02),28:(23,2,.8),29:(21,6,.85),30:(22,0,-.1),31:(21,2,.85)}
for n,(code,idx,value) in effects.items():
 st[n].update(traits=[dict(code=code,dataId=idx,value=value)],autoRemovalTiming=2,minTurns=3,maxTurns=3,removeAtBattleEnd=True,message1=' is afflicted with '+st[n]['name']+'!',message2=' is afflicted with '+st[n]['name']+'!',message4=' recovers from '+st[n]['name']+'.')
 st[n]['note']='Fictional combat abstraction: 3 turns, cleared at battle end. Clinical Flush or Pathogen Purge removes this state.'
write('States',st)
sk=read('Skills')
for obj in [sk[211],items[157]]:
 obj['effects'] += [dict(code=22,dataId=n,value1=1,value2=0) for n in range(27,32)]
 obj['description']='Clears legacy STDs, newer diseases, Parcel Fever and Recall Rash. Also removes parasite bonuses.'
write('Skills',sk);write('Items',items)
Path('.agent/skills/debug-room/SKILL.md').write_text('''---
name: debug-room
description: Build isolated, evidence-backed playtest fixtures without overwriting campaign maps or inventing progression.
---

# Developer Debug Room

Inspect data/MapInfos.json and every existing MapNNN.json before allocating a new map ID. There is currently no verified developer room. Map103 is Workers Salvage Yard, Map105 is the market, and Map112 is a dungeon; never repurpose them.

Use a separate disposable test save. Start fixtures with DataManager.setupNewGame(), using System.json for the starting party and spawn. Never reset story switches or party membership in a player's save. Pink Ninja joins through troop15 and is not a starting actor.

For each checkpoint, trace actual transfer events, item grants, switches and actor recruitment in live data. Record the source map/event/page, prerequisites, destination and expected outcome. Set only verified prerequisites. Do not guess chapter numbers, actors, completion flags or item IDs. Avoid broad all-switches or all-items presets. Verify destination passability and a way back.

Consult docs/story/STORY_PROGRESSION.md and the theme-and-story skill. The finale returns to the first world map, enters and traverses the floating castle, then has two consecutive final bosses. Regional bosses do not replace that route. Do not invent a NeuraTech Core endpoint or mark unresolved necklace/castle gates complete.

Keep debug access behind Utils.isOptionValid('test'); do not add an ordinary campaign entrance. Prefer temporary automated fixtures when a permanent map is unnecessary. Recovery uses event314; shops use302 with605 continuations (these are not plugin commands). Plugin commands use356. Test fixture changes must be reversible, and never be represented as campaign completion evidence.
''',encoding='utf-8')
print('R01-R05 repair data written; snapshots saved.')
