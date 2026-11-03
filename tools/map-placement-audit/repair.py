"""Apply reviewed collision/placement repairs once, preserving quests and artwork."""
import json,zipfile,sys
from pathlib import Path
ROOT=Path(__file__).resolve().parents[2];OUT=Path(__file__).parent
sys.path.insert(0,str(ROOT/'tools/world'));import render_maps as render
def load(n):return json.loads((ROOT/'data'/f'{n}.json').read_text(encoding='utf-8'))
maps={int(p.stem[3:]):json.loads(p.read_text(encoding='utf-8'))for p in(ROOT/'data').glob('Map[0-9][0-9][0-9].json')};sets=load('Tilesets')
with zipfile.ZipFile(OUT/'before.zip','x',zipfile.ZIP_DEFLATED)as z:
 z.write(ROOT/'data/Tilesets.json','data/Tilesets.json')
 for n in maps:z.write(ROOT/f'data/Map{n:03}.json',f'data/Map{n:03}.json')
 z.write(ROOT/'tools/companions-final/manifest.json','tools/companions-final/manifest.json')
changes=[]
def flag(ts,t,value,why):
 old=sets[ts]['flags'][t]
 if old!=value:sets[ts]['flags'][t]=value;changes.append(dict(tileset=ts,tile=t,before=old,after=value,reason=why))
# Reviewed openings and traversable floor overlays must keep their current behavior.
exceptions={(5,t)for t in[43,51,230,231,238,239,732,733]}|{(9,t)for t in[95,3796,3810]}|{(4,t)for t in[4,6,12,14]}|{(6,385),(6,393),(17,8),(13,8),(8,102)}
overrides=json.loads((OUT/'wall-overrides.json').read_text(encoding='utf-8'))
for q in overrides:
 ts,t=q['tileset'],q['tile']
 if(ts,t)in exceptions:continue
 flag(ts,t,sets[ts]['flags'][t]|16,'Reviewed wall-mounted art: upper layer must defer passage to the wall, not override it as floor.')
def tile(col,row,slot=0):return slot*256+(128 if col>=8 else 0)+row*8+col%8
def solid_rect(ts,slot,x,y,w,h,why):
 for yy in range(y,y+h):
  for xx in range(x,x+w):
   t=tile(xx,yy,slot)
   if render.tile(ts,t).getchannel('A').getbbox():flag(ts,t,(sets[ts]['flags'][t]&~16)|15,why)
solid_rect(11,0,9,6,7,5,'Solid bridge console footprint, not a walking floor.')
for t in[211,212,213,219,220,221]:flag(11,t,(sets[11]['flags'][t]&~16)|15,'Solid bridge chair/console footprint.')
solid_rect(11,1,0,7,5,4,'Solid engineering console footprint.')
solid_rect(12,0,0,0,16,5,'Solid recovery pods and medical furniture; open floor remains outside the art footprint.')
for t in[71,786,794,849,850,851,857,858,859]:flag(6,t,((sets[6]['flags'][t]&~16)|15|128),'Bar counter blocks walking and supports talking across its front.')
positions=[(34,[8],2,2,'Wandering resident moved off the table.'),(1,[12,15,19],25,17,'Dealer was over open water.'),(1,[13,16,20],29,21,'Elevator contact moved off its pond ornament.'),(3,[4,5,6],12,6,'Scientist was outside the map bounds.'),(35,[5,6],5,4,'Engine-component contact was outside the map bounds.'),(28,[5],32,4,'Berth attendant moved off spaceport scenery.'),(49,[13],4,17,'Give the resident a clear grass tile away from the roof edge.'),(50,[2],7,7,'Navigator moved off chair/console footprint.'),(50,[3],9,7,'Jack moved off console tip.'),(52,[2],5,7,'Contractor moved off machine footprint.'),(15,[30],4,42,'New casing fixture moved from cliff edge to the entrance chamber floor.')]
moved=[]
for n,ids,x,y,why in positions:
 for i in ids:
  e=maps[n]['events'][i];before=[e['x'],e['y']];e.update(x=x,y=y);moved.append(dict(map=n,event=i,before=before,after=[x,y],reason=why))
landings=[]
for n,m in maps.items():
 for e in m['events']:
  if not e:continue
  for pi,p in enumerate(e['pages']):
   for c in p['list']:
    if c['code']==201 and c['parameters'][:4]==[0,60,40,40]:c['parameters'][2:4]=[40,37];landings.append(dict(source=[n,e['id'],pi],before=[60,40,40],after=[60,40,37],reason='Return landed inside a machine painted over the wall.'))
touched={q['map']for q in moved}|{q['source'][0]for q in landings}
for n in touched:(ROOT/f'data/Map{n:03}.json').write_text(json.dumps(maps[n],ensure_ascii=False,separators=(',',':')),encoding='utf-8')
(ROOT/'data/Tilesets.json').write_text(json.dumps(sets,ensure_ascii=False,separators=(',',':')),encoding='utf-8')
p=ROOT/'tools/companions-final/manifest.json';m=json.loads(p.read_text(encoding='utf-8'))
for q in m['chapters']:
 n,i=q['giver'];e=maps[n]['events'][i];q['giverPosition']=[e['x'],e['y']]
 q['taskPositions']=[[maps[n]['events'][i]['x'],maps[n]['events'][i]['y']]for n,i in q['taskEvents']]
p.write_text(json.dumps(m,indent=2),encoding='utf-8')
(OUT/'repairs.json').write_text(json.dumps(dict(flags=changes,positions=moved,landings=landings,reviewedPassageExceptions=[list(q)for q in sorted(exceptions)]),indent=2),encoding='utf-8')
print(f'Repaired {len(changes)} shared flags, {len(moved)} event positions and {len(landings)} landing references. Verification pending.')

import runpy
runpy.run_path(str(OUT/"finalize.py"))
