"""Keep the actual fee visible in the final native confirmation choice."""
import json
from pathlib import Path
p=Path('data/CommonEvents.json');d=json.loads(p.read_text(encoding='utf-8'));cs=d[7]['list']
confirm=[c for c in cs if c['code']==102 and c['parameters'][0]==['Confirm calibration','Cancel']]
assert len(confirm) in (0,3)
for c,cost in zip(confirm,[100,150,180]):
    c['code']=355
    c['parameters']=["var fee=($gameSwitches.value(221)&&!$gameSwitches.value(222))?0:"+str(cost)+";this.setupChoices([['Confirm calibration: '+fee+' Credits','Cancel'],1,0,2,0]);this.setWaitMode('message');"]
p.write_text(json.dumps(d,ensure_ascii=False,separators=(',',':')),encoding='utf-8')
