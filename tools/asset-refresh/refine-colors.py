import json
from pathlib import Path
p=Path('tools/asset-refresh/extra-icons.json');d=json.loads(p.read_text());fix={7:2*8+5,37:4*8+6,42:5*8+2,43:5*8+6,44:7*8+6,45:3*8+6,47:4*8+5,48:1*8+2,49:0*8+1,51:1*8+7}
for r in d['icons']:
 if r['kind']=='Armors' and r['slot'] in fix:r['cell']=fix[r['slot']]
 if r['kind']=='Armors' and r['slot'] in [48,51]:r['filter']='saturate(0.35)'
d['icons'].append(dict(kind='Armors',slot=30,id=1828,source='ClothingAtlas',cell=44));p.write_text(json.dumps(d,indent=2));p=Path('data/Armors.json');a=json.loads(p.read_text());a[30]['iconIndex']=1828;a[30]['name']='Black Helmet';p.write_text(json.dumps(a,separators=(',',':')))
p=Path('tools/asset-refresh/pack-extra.js');s=p.read_text().replace('x.clearRect(i.id%16*32','x.filter=i.filter||"none";x.clearRect(i.id%16*32');p.write_text(s)
