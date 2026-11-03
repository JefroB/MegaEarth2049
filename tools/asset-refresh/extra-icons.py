from pathlib import Path
from PIL import Image
import json
p=Path('tools/asset-refresh/extra-icons.json');rows=[];n=1770
for slot,cell in [(6,0),(8,1),(9,2),(4,3),(13,4),(1,5)]:rows.append(dict(kind='Items',slot=slot,id=n,source='SuppliesAtlas',cell=cell));n+=1
arms=json.loads(Path('data/Armors.json').read_text())
for slot,o in enumerate(arms):
 if not o or not o['name']:continue
 name=o['name'].lower();col=None
 if slot==2:col=0
 elif 'gloves' in name:col=1
 elif 'pants' in name and slot!=36:col=2
 elif 'jacket' in name:col=3
 elif 'helmet' in name or 'helment' in name:col=4
 elif 'shoe' in name or slot in [7,47]:col=5
 elif 'shorts' in name:col=6
 elif 'boots' in name:col=7
 if col is not None:
  row=next((r for word,r in [('red',0),('yellow',1),('purple',2),('blue',3),('green',4),('black',5),('white',6),('orange',7)] if word in name),5)
  if slot==2:row=2
  rows.append(dict(kind='Armors',slot=slot,id=n,source='ClothingAtlas',cell=row*8+col));n+=1
for kind in ['Items','Armors']:
 f=Path('data/'+kind+'.json');a=json.loads(f.read_text())
 for r in rows:
  if r['kind']==kind:a[r['slot']]['iconIndex']=r['id']
 if kind=='Items':
  for o in a:
   if o and o['id'] in range(128,133):o.update(itypeId=2,consumable=False)
 f.write_text(json.dumps(a,separators=(',',':')))
a=Image.open('img/ui/ClothingAtlas.png').convert('RGBA').getchannel('A');w,h=a.size
xs=[0]+[min(range(j-12,j+13),key=lambda x:sum(a.crop((x,0,x+1,h)).getdata())) for j in [162,324,486,648,810,972,1134]]+[w]
ys=[0,150,297,442,590,737,884,1033,h]
p.write_text(json.dumps(dict(icons=rows,xs=xs,ys=ys),indent=2));print(len(rows),'additional icons',xs)
