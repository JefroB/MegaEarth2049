import zipfile,json
from pathlib import Path
P=Path('tools/asset-refresh');z=P/'before-refresh.zip'
if not z.exists():
 with zipfile.ZipFile(z,'w',zipfile.ZIP_DEFLATED) as f:
  for p in [*Path('data').glob('*.json'),Path('js/plugins.js'),*Path('img/system').glob('*.png'),*Path('img/battlecommands').glob('*.png'),*Path('img/battlehud').glob('Face_*.png'),*Path('img/actorhud').glob('Face_*.png'),Path('img/battlehud/Turn.png')]:f.write(p,p.as_posix())
# Icon replacements use new reserved slots; original icon sheet pixels remain intact.
read=lambda n:json.loads(Path('data/'+n+'.json').read_text(encoding='utf-8-sig'))
assign=[];render=[];nextId=1680
cache={}
def icon(cell,hue=0):
 global nextId
 key=(cell,hue)
 if key not in cache:cache[key]=nextId;render.append(dict(id=nextId,cell=cell,hue=hue));nextId+=1
 return cache[key]
def seti(k,a,slot,cell,hue=0):
 o=a[slot];old=o['iconIndex'];o['iconIndex']=icon(cell,hue);assign.append(dict(kind=k,slot=slot,name=o['name'],old=old,new=o['iconIndex']))
a=read('Items')
for slot,cell in {2:0,3:4,4:1,5:2,6:3,14:6,15:7,16:8,17:9,18:10,19:12,20:13,21:14,22:15,23:16,24:17,25:18,26:19,27:20,28:21,29:22,128:7,129:8,130:9,131:10,132:6,137:17,143:23,144:24,145:11,146:5}.items():seti('Items',a,slot,cell)
Path('data/Items.json').write_text(json.dumps(a,separators=(',',':')),encoding='utf-8')
a=read('Weapons')
for slot,cell in {15:25,19:26,21:59,23:60,24:59,25:56,26:56,27:56,28:57,29:56,30:55,31:59,32:56,33:57,34:56,35:60,36:60,37:54,38:54,39:58,40:58,41:57,42:60,45:60}.items():seti('Weapons',a,slot,cell,180 if slot in [38,40] else 90 if slot==45 else 0)
Path('data/Weapons.json').write_text(json.dumps(a,separators=(',',':')),encoding='utf-8')
a=read('Armors')
for slot,o in enumerate(a):
 if not o or not o['name']:continue
 name=o['name'].lower();cell=None
 if slot==2:cell=48
 elif 'gloves' in name:cell=49
 elif slot in [9,13,17,21,25,28]:cell=50
 elif 'jacket' in name:cell=51
 elif 'helmet' in name:cell=52
 elif 'shoes' in name or slot==7:cell=53
 if cell is not None:
  hue=next((v for k,v in [('yellow',55),('purple',275),('blue',210),('green',110),('white',180),('orange',25)] if k in name),0)
  seti('Armors',a,slot,cell,hue)
Path('data/Armors.json').write_text(json.dumps(a,separators=(',',':')),encoding='utf-8')
a=read('Skills')
for slot,cell in {70:27,87:32,90:29,91:29,92:29,103:28,107:32,108:32,109:32,111:33,114:35,115:34,120:30,121:31,43:43,45:44,76:34}.items():seti('Skills',a,slot,cell)
for slot in range(151,185):
 name=a[slot]['name'].lower();cell=61 if any(x in name for x in ['prepare','charging','identify']) else 63 if any(x in name for x in ['recalibrate','reset','jam scanner','recess']) else 62
 seti('Skills',a,slot,cell)
Path('data/Skills.json').write_text(json.dumps(a,separators=(',',':')),encoding='utf-8')
a=read('States')
for slot,cell in {11:43,12:42,13:44,27:36,28:37,29:38,30:39,31:40,32:41,37:45,38:46,39:47,21:46}.items():seti('States',a,slot,cell)
Path('data/States.json').write_text(json.dumps(a,separators=(',',':')),encoding='utf-8')
P.joinpath('manifest.json').write_text(json.dumps(dict(assignments=assign,icons=render),indent=2))
print(len(assign),'assignments;',len(render),'new icon cells')
