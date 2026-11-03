"""Split the authored room graph into actual interconnecting RPG Maker maps.
Executed by build_mazes.py before serialization; no live writes.
"""
old_maps={mid:copy.deepcopy(maps[mid]) for mid in range(116,128)}
old_layouts=copy.deepcopy(layouts);old_refs=copy.deepcopy(refs);old_routes=copy.deepcopy(routes)
room_ids={};room_rects={};old_event_ids={};new_ids=[]
for qi,q in enumerate(quests):
 old_pair=q['maps'][:];q['roomMaps']=[]
 for depth,oldmid in enumerate(old_pair):
  for ri,(x,y,w,h) in enumerate(old_layouts[oldmid]['rooms']):
   mid=116+qi*18+depth*9+ri;room_ids[oldmid,ri]=mid;room_rects[mid]=(x,y,w,h);new_ids.append(mid);q['roomMaps'].append(mid)
   parent=q['hub'] if ri==6 and depth==0 else 116+qi*18+6
   if parent==mid:parent=q['hub']
   newmap(mid,f'{q["theme"]} / {q["floors"][depth]} {ri+1}: {ROOM_NAMES[q["key"]][ri]}',parent,max(17,w+8),max(15,h+8),q['ts'])
   room(mid,4,4,w,h);surface(mid,q['floor'],q['wall'],q['ceiling'])
   old=old_maps[oldmid]
   for yy in range(h):
    for xx in range(w):
     for z in (1,2,3):put(mid,xx+4,yy+4,old['data'][(z*old['height']+y+yy)*old['width']+x+xx],z)
   maps[mid]['note']='Maze expedition: separate room map, connected by native transfer doors. No combat.'
   maps[mid]['displayName']=f'{q["floors"][depth]} - Room {ri+1}'
 q['maps']=[116+qi*18+6,116+qi*18+15]

def locate(oldmid,x,y):
 rects=old_layouts[oldmid]['rooms']
 ri=min(range(9),key=lambda i:max(rects[i][0]-x,0,x-(rects[i][0]+rects[i][2]-1))**2+max(rects[i][1]-y,0,y-(rects[i][1]+rects[i][3]-1))**2)
 ox,oy,w,h=rects[ri];return room_ids[oldmid,ri],max(4,min(w+3,x-ox+4)),max(4,min(h+3,y-oy+4))
# Preserve every authored quest event, moving it into its own room map.
for oldmid,old in old_maps.items():
 for e in old['events']:
  if not e:continue
  mid,x,y=locate(oldmid,e['x'],e['y']);ne=copy.deepcopy(e);ne.update(id=len(maps[mid]['events']),x=x,y=y)
  maps[mid]['events'].append(ne);old_event_ids[oldmid,e['id']]=(mid,ne['id'])
for key,(mid,eid) in old_refs.items():refs[key]=list(old_event_ids.get((mid,eid),(mid,eid)))
# Existing hub entries and between-level stairs now target individual room maps.
for mid in changed:
 for e in maps[mid]['events']:
  if not e:continue
  for p in e['pages']:
   for cmd in p['list']:
    if cmd['code']==201 and cmd['parameters'][0]==0 and cmd['parameters'][1] in old_maps:
     _,target,x,y,d,fade=cmd['parameters'];target,x,y=locate(target,x,y)
     x,y=place(target,x,y,False);reserved.setdefault(target,set()).add((x,y));cmd['parameters']=[0,target,x,y,d,fade]
routes=[]
for source,eid,target,x,y,requirements in old_routes:
 source,eid=old_event_ids.get((source,eid),(source,eid))
 cmd=next(c for p in maps[source]['events'][eid]['pages'] for c in p['list'] if c['code']==201)
 _,target,x,y,_,_=cmd['parameters'];routes.append([source,eid,target,x,y,requirements])
# Room-to-room doors occupy opposite edges and show their destination before entry.
# Action-button doors avoid automatic bounce-back when returning through a passage.
room_links=[]
for oldmid,layout in old_layouts.items():
 for a,b in layout['edges']:
  ma,mb=room_ids[oldmid,a],room_ids[oldmid,b]
  pair=[]
  for source,target,ri,rj in [(ma,mb,a,b),(mb,ma,b,a)]:
   _,_,w,h=room_rects[source]
   if rj%3>ri%3:xy=(w+3,4+h//2);direction='East'
   elif rj%3<ri%3:xy=(4,4+h//2);direction='West'
   elif rj//3>ri//3:xy=(4+w//2,h+3);direction='South'
   else:xy=(4+w//2,4);direction='North'
   key=f'room_{source}_to_{target}'
   e=event(source,key,f'{direction} door - Room {rj+1}',*xy,[],'!SF_Door1',0)
   arrival=place(source,e['x'],e['y'],False);reserved.setdefault(source,set()).add(arrival)
   pair.append((source,target,e,arrival,rj,direction))
  for index,(source,target,e,arrival,rj,direction) in enumerate(pair):
   dest=pair[1-index][3]
   e['pages'][0]['list']=say(f'{direction} passage to Room {rj+1}.')+choice([('Go through',[C(201,0,target,*dest,2,0)]),('Stay',[])])+[C(0)]
   routes.append([source,e['id'],target,*dest,[]]);room_links.append([source,target])
layouts={str(oldmid):dict(layout,roomMaps=[room_ids[oldmid,i] for i in range(9)]) for oldmid,layout in old_layouts.items()}
