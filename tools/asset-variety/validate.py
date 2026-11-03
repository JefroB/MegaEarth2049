import json,zipfile,hashlib
from pathlib import Path
from PIL import Image
from collections import defaultdict
P=Path('tools/asset-variety');checks=[]
with zipfile.ZipFile(P/'before-variety.zip') as z:
 for kind in ['Skills','Armors']:
  old=json.loads(z.read('data/'+kind+'.json'));new=json.loads(Path('data/'+kind+'.json').read_text());assert len(old)==len(new)
  for a,b in zip(old,new):
   if a is None:assert b is None;continue
   a=dict(a);b=dict(b);a.pop('iconIndex',None);b.pop('iconIndex',None);assert a==b,(kind,a.get('id'))
  checks.append(kind+' records, names, stats, effects unchanged')
im=Image.open('img/system/IconSet.png').convert('RGBA');seen={};a=json.loads(Path('data/Skills.json').read_text())
for s in a:
 if not s or not s['name'] or s['id'] in [100,125]:continue
 i=s['iconIndex'];assert i>0;cell=im.crop((i%16*32,i//16*32,i%16*32+32,i//16*32+32));assert cell.getchannel('A').getbbox(),s['name'];h=hashlib.sha256(cell.tobytes()).hexdigest();assert h not in seen,(s['name'],seen.get(h));seen[h]=s['name']
checks.append(str(len(seen))+' non-separator skills have distinct nonblank icon pixels')
rows=json.loads(P.joinpath('manifest.json').read_text())
for r in rows:
 i=r['icon'];cell=im.crop((i%16*32,i//16*32,i%16*32+32,i//16*32+32));assert cell.getchannel('A').getbbox();assert not cell.getchannel('A').crop((0,0,32,1)).getbbox();assert not cell.getchannel('A').crop((0,31,32,32)).getbbox()
checks.append('128 packed icons nonempty with transparent top/bottom gutters')
old=Image.open('tools/asset-refresh/ninja2-before.png').convert('RGBA');new=Image.open('img/faces/ninja2.png').convert('RGBA');from PIL import ImageChops
a=old.crop((0,0,144,144));b=new.crop((0,0,144,144));bg=Image.new('RGBA',(144,144),(32,40,48,255));diff=ImageChops.difference(Image.alpha_composite(bg,a),Image.alpha_composite(bg,b));assert max(v[1] for v in diff.getextrema())<=2;checks.append('Existing Pink Ninja appearance preserved (alpha-rounding tolerance2)')
for slot in [1,2,3,4]:assert new.crop((slot%4*144,slot//4*144,slot%4*144+144,slot//4*144+144)).getchannel('A').getbbox()
checks.append('Four new ninja colors populated')
P.joinpath('validation.json').write_text(json.dumps(dict(passed=True,checks=checks),indent=2));print('\n'.join(checks))
