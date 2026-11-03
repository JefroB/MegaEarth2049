import json,html
from pathlib import Path
from PIL import Image
P=Path('tools/art-audit'); read=lambda n:json.loads(Path('data/'+n+'.json').read_text(encoding='utf-8-sig'))
im=Image.open('img/system/IconSet.png').convert('RGBA');rows=[]
for kind in ['Items','Weapons','Armors','Skills','States']:
 for slot,o in enumerate(read(kind)):
  if not o or not o['name']:continue
  i=o['iconIndex'];x=i%16*32;y=i//16*32;valid=x+32<=im.width and y+32<=im.height
  blank=not im.crop((x,y,x+32,y+32)).getchannel('A').getbbox() if valid else True
  rows.append(dict(slot=slot,kind=kind,id=o['id'],name=o['name'],icon=i,blank=blank,valid=valid,description=o.get('description',''),note=o.get('note','')))
(P/'other-assets.json').write_text(json.dumps(rows,indent=2))
for kind in ['Items','Weapons','Armors','Skills','States']:
 a=[r for r in rows if r['kind']==kind]
 for start in range(0,len(a),70):
  cards=''.join(f'<section><canvas width="64" height="64" data-icon="{r["icon"]}"></canvas><b>Slot {r["slot"]}: {html.escape(r["name"])}</b><small>Icon {r["icon"]}'+(' — BLANK' if r['blank'] else '')+'</small><p>'+html.escape(r['description'])+'</p></section>' for r in a[start:start+70])
  (P/f'icons-{kind}-{start//70+1}.html').write_text('<!doctype html><meta charset="utf-8"><style>body{background:#263138;color:white;font:13px sans-serif}main{display:grid;grid-template-columns:repeat(5,200px);gap:8px}section{padding:8px;background:#3b4850}canvas{float:left;margin-right:8px;image-rendering:pixelated}small{display:block;color:#ade}p{clear:both}</style><h1>'+kind+'</h1><main>'+cards+'</main><script>let im=new Image();im.onload=()=>{document.querySelectorAll("canvas").forEach(c=>{let i=+c.dataset.icon,x=c.getContext("2d");x.imageSmoothingEnabled=false;x.drawImage(im,i%16*32,Math.floor(i/16)*32,32,32,0,0,64,64)});window.ready=true};im.src="../../img/system/IconSet.png"</script>',encoding='utf-8')
print('IconSet',im.size)
for kind in ['Items','Weapons','Armors','Skills','States']:
 a=[r for r in rows if r['kind']==kind];print(kind,len(a),'blank',[(r['id'],r['name'],r['icon']) for r in a if r['blank']])
