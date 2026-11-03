import json,re,html
from pathlib import Path
from PIL import Image
R=Path('.');P=R/'tools/art-audit'
def read(n):return json.loads((R/'data'/f'{n}.json').read_text(encoding='utf-8-sig'))
maps={i['id']:read('Map%03d'%i['id']) for i in read('MapInfos') if i};troops=read('Troops');enemies=read('Enemies');uses={}
for mid,m in maps.items():
 for enc in m['encounterList']:uses.setdefault(enc['troopId'],[]).append(f'Map{mid} random')
 for e in m['events']:
  if not e:continue
  for p in e['pages']:
   for c in p['list']:
    if c['code']==301 and c['parameters'][0]==0:uses.setdefault(c['parameters'][1],[]).append(f'Map{mid} event{e["id"]}')
for ev in read('CommonEvents'):
 if ev:
  for c in ev['list']:
   if c['code']==301 and c['parameters'][0]==0:uses.setdefault(c['parameters'][1],[]).append(f'CommonEvent{ev["id"]}')
rows=[]
for e in enemies:
 if not e or not e['name']:continue
 ts=[t['id'] for t in troops if t and any(m['enemyId']==e['id'] for m in t['members'])];tags=re.findall(r'<Sideview Battler:\s*([^>]+)>',e['note'],re.I);over=re.findall(r'<ME_\w+:\s*([^>]+)>',e['note']);rows.append(dict(id=e['id'],name=e['name'],static=e['battlerName'],intended=tags,override=over,troops=ts,locations=sorted(set(v for t in ts for v in uses.get(t,[])))))
(P/'enemies.json').write_text(json.dumps(rows,indent=2))
assets=[]
for f in (R/'img').rglob('*.png'):
 try:
  im=Image.open(f);assets.append(dict(path=f.as_posix(),width=im.width,height=im.height,bytes=f.stat().st_size))
 except Exception as ex:assets.append(dict(path=f.as_posix(),error=str(ex)))
(P/'inventory.json').write_text(json.dumps(assets,indent=2))
# Contact sheet HTML uses native source images, with a first-cell view for MV sheets.
def pages(name,cards):
 for n in range(0,len(cards),30):
  body=''
  for label,file,grid in cards[n:n+30]:
   body+=f'<section><canvas width="180" height="150" data-src="../../{html.escape(file)}" data-grid="{grid}"></canvas><div>{html.escape(label)}</div></section>'
  text='<!doctype html><meta charset="utf-8"><style>body{background:#29353a;color:white;font:13px sans-serif;margin:10px}main{display:grid;grid-template-columns:repeat(5,200px);gap:8px}section{background:#40504b;height:205px;padding:5px}canvas{display:block;margin:auto}div{overflow-wrap:anywhere}</style><main>'+body+'</main><script>Promise.all([...document.querySelectorAll("canvas")].map(c=>new Promise(resolve=>{let im=new Image();im.onload=()=>{let g=c.dataset.grid.split(",").map(Number),w=im.width/g[0],h=im.height/g[1],s=Math.min(170/w,140/h,2);c.getContext("2d").drawImage(im,0,0,w,h,(180-w*s)/2,(150-h*s)/2,w*s,h*s);resolve()};im.onerror=()=>resolve();im.src=c.dataset.src}))).then(()=>window.ready=true)</script>'
  (P/f'{name}-{n//30+1}.html').write_text(text,encoding='utf-8')
pages('enemy-intended',[(f'{r["id"]} {r["name"]}'+(' [used]' if r['locations'] else ' [no direct map use]'),'img/sv_actors/'+r['intended'][0]+'.png','9,6') for r in rows if r['intended'] and not r['override']])
statics={r['static'] for r in rows if r['static'] and not r['intended'] and not r['override']};pages('enemy-static',[(s,'img/sv_enemies/'+s+'.png','1,1') for s in sorted(statics)])
for folder in ['pictures','titles1','titles2','faces','characters']:
 pages(folder,[(f.stem,f.as_posix(),'4,2' if folder=='faces' else '1,1') for f in (R/'img'/folder).glob('*.png')])
print('Images:',len(assets),'named enemies:',len(rows),'tagged animated without custom renderer:',sum(bool(r['intended']) and not r['override'] for r in rows))
print('Referenced animated enemy assets missing:',[(r['id'],s) for r in rows for s in r['intended'] if not (R/'img/sv_actors'/f'{s}.png').exists()])
print('Pictures:',[f.name for f in (R/'img/pictures').iterdir()])
