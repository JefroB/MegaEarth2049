import json
from pathlib import Path
from PIL import Image
R=Path('.');read=lambda n:json.loads((R/'data'/f'{n}.json').read_text(encoding='utf-8-sig'))
refs=[]
def add(folder,name,where):
 if name: refs.append(dict(path=f'img/{folder}/{name}.png',where=where))
for a in read('Actors'):
 if a:
  for folder,key in [('characters','characterName'),('faces','faceName'),('sv_actors','battlerName')]:add(folder,a[key],f'Actor{a["id"]}')
for m in read('MapInfos'):
 if not m:continue
 d=read('Map%03d'%m['id']);loc=f'Map{m["id"]} {m["name"]}'
 for k in ['battleback1Name','battleback2Name','parallaxName']:add({'battleback1Name':'battlebacks1','battleback2Name':'battlebacks2','parallaxName':'parallaxes'}[k],d[k],loc)
 for e in d['events']:
  if not e:continue
  for p in e['pages']:
   w=loc+f' event{e["id"]}';add('characters',p['image']['characterName'],w)
   for c in p['list']:
    if c['code']==101:add('faces',c['parameters'][0],w)
    if c['code']==231:add('pictures',c['parameters'][1],w)
for t in read('Tilesets'):
 if t:
  for n in t['tilesetNames']:add('tilesets',n,f'Tileset{t["id"]}')
s=read('System');add('titles1',s['title1Name'],'Title');add('titles2',s['title2Name'],'Title')
rows=json.loads(Path('tools/art-audit/enemies.json').read_text());unhandled=[r for r in rows if r['intended'] and not r['override'] and r['id'] not in range(78,83)]
result={'missingReferences':[r for r in refs if not Path(r['path']).exists()],'legacyOverworld':[r for r in refs if 'poopoocaca' in r['path'] or 'tumbleweed' in r['path']],'unhandledSideviewCount':len(unhandled),'directlyReferencedSideview':[r for r in unhandled if r['locations']],'ratFiles':[str(p) for p in Path('img/sv_actors').glob('*rat*')],'title':[s['title1Name'],s['title2Name']]}
Path('tools/art-audit/references.json').write_text(json.dumps(result,indent=2));print(json.dumps(result,indent=2))
