import json,re,html
from pathlib import Path
from PIL import Image
P=Path('tools/art-audit');read=lambda n:json.loads(Path('data/'+n+'.json').read_text(encoding='utf-8-sig'))
uses={};missing=[];scriptrefs=[]
def use(k,i,w):uses.setdefault(k+':'+str(i),set()).add(w)
def commands(cs,w):
 for c in cs:
  code=c['code'];a=c['parameters']
  if code in [126,127,128]:use({126:'Items',127:'Weapons',128:'Armors'}[code],a[0],w)
  if code in [302,605] and len(a)>1:use(['Items','Weapons','Armors'][a[0]],a[1],w+' shop')
  if code in [355,655,356]:scriptrefs.append({'where':w,'text':a[0]})
for m in read('MapInfos'):
 if m:
  for e in read('Map%03d'%m['id'])['events']:
   if e:
    for page in e['pages']:commands(page['list'],f'Map{m["id"]} event{e["id"]}')
for e in read('CommonEvents'):
 if e:commands(e['list'],f'CommonEvent{e["id"]}')
for e in read('Enemies'):
 if e:
  for d in e['dropItems']:
   if d['kind']:use(['','Items','Weapons','Armors'][d['kind']],d['dataId'],f'Enemy{e["id"]} drop')
for a in read('Actors'):
 if a:
  for n,i in enumerate(a['equips']):
   if i:use('Weapons' if n==0 else 'Armors',i,f'Actor{a["id"]} initial equip')
for a in read('Animations'):
 if a:
  for k in ['animation1Name','animation2Name']:
   n=a[k]
   if n and not Path('img/animations/'+n+'.png').exists():missing.append({'animation':a['id'],'file':n})
mismatches=[]
for k in ['Items','Weapons','Armors','Skills','States']:
 for index,o in enumerate(read(k)):
  if o and o['id']!=index:mismatches.append({'kind':k,'index':index,'id':o['id'],'name':o['name']})
(P/'nonbattle-references.json').write_text(json.dumps({'uses':{k:sorted(v) for k,v in uses.items()},'missingAnimationSheets':missing,'idMismatches':mismatches,'scriptCommands':scriptrefs},indent=2))
# Sheet overviews of other art; preserve source pixels and draw browser thumbnails only.
for group,folders in [('ui',['system','actorhud','battlehud','battlecommands']),('environment',['tilesets','parallaxes','weather']),('effects',['animations'])]:
 files=[f for d in folders for f in Path('img',d).glob('*.png')]
 for start in range(0,len(files),40):
  cards=''.join('<section><img src="../../'+f.as_posix()+'"><div>'+html.escape(f.as_posix())+'</div></section>' for f in files[start:start+40])
  (P/f'other-{group}-{start//40+1}.html').write_text('<!doctype html><meta charset="utf-8"><style>body{background:#29353a;color:#fff;font:12px sans-serif}main{display:grid;grid-template-columns:repeat(5,200px);gap:8px}section{background:#40504b;padding:5px;overflow-wrap:anywhere}img{width:190px;height:160px;object-fit:contain}</style><main>'+cards+'</main><script>Promise.all([...document.images].map(i=>i.decode().catch(()=>{}))).then(()=>window.ready=true)</script>',encoding='utf-8')
print('Missing animation sheets',missing);print('ID mismatches',mismatches);print('Quest item actual indexes',[(i,o['id'],o['name'],len(uses.get('Items:'+str(i),[]))) for i,o in enumerate(read('Items')) if o and o['name']]);print('YoYo',uses.get('Weapons:15'))
