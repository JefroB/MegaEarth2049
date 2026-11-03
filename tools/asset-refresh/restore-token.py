import json,copy
from pathlib import Path
p=Path('data/Items.json');a=json.loads(p.read_text());o=copy.deepcopy(a[12]);o.update(id=34,name='Armortech Token',description='Company scrip accepted by Armortech gear dispensers. Five tokens buy a piece of equipment. No refunds, naturally.',price=100,iconIndex=a[145]['iconIndex']);a[34]=o;a[27]['description']='The stolen crane engine recovered for Zack. Heavy, oily, and essential to repairing the bridge.';p.write_text(json.dumps(a,separators=(',',':')))
