import json
from pathlib import Path
from PIL import Image
refs={}
def add(n,i,w):
 if n:refs.setdefault((n,i),[]).append(w)
a=json.loads(Path('data/Actors.json').read_text(encoding='utf-8-sig'))
for o in a:
 if o:add(o['faceName'],o['faceIndex'],'Actor'+str(o['id']))
def scan(v,w):
 if isinstance(v,dict):
  if v.get('code')==101:add(v['parameters'][0],v['parameters'][1],w)
  for x in v.values():scan(x,w)
 elif isinstance(v,list):
  for x in v:scan(x,w)
for p in Path('data').glob('*.json'):scan(json.loads(p.read_text(encoding='utf-8-sig')),p.name)
for (n,i),uses in refs.items():
 p=Path('img/faces',n+'.png')
 if not p.exists():print('MISSING',n,i,uses[:4]);continue
 im=Image.open(p).convert('RGBA');cell=im.crop((i%4*144,i//4*144,i%4*144+144,i//4*144+144))
 if not cell.getchannel('A').getbbox():print('BLANK',n,i,uses[:6])
print('Checked',len(refs),'referenced portrait cells')
