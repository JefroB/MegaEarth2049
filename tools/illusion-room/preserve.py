"""Check the original shop, fight and prior database records against the snapshot."""
import copy,json,zipfile
from pathlib import Path
OUT=Path(__file__).parent;z=zipfile.ZipFile(OUT/'before.zip')
before=json.loads(z.read('data/Map002.json'));after=json.loads(Path('data/Map002.json').read_text(encoding='utf-8'));restored=copy.deepcopy(after)
old=before['events'][23];new=restored['events'][23]
# Restore exactly the documented legacy-completion predicate for comparison.
new['pages'][0]['list'][0]=copy.deepcopy(old['pages'][0]['list'][0])
L=new['pages'][1]['list'];h=next(c for c in L if c['code']==102 and c['indent']==1);assert h['parameters'][0]==['Buy safe burlap clothing','Leave','Inspect fitting-room projection'];h['parameters'][0].pop()
i=next(i for i,c in enumerate(L)if c['code']==402 and c['indent']==1 and c['parameters'][0]==2);j=next(j for j in range(i+1,len(L))if L[j]['code']==404 and L[j]['indent']==1);del L[i:j]
assert restored==before
system=json.loads(Path('data/System.json').read_text(encoding='utf-8'));original=json.loads(z.read('data/System.json'));assert system['switches'][:259]==original['switches'];system['switches']=system['switches'][:259];assert system==original
infos=json.loads(Path('data/MapInfos.json').read_text(encoding='utf-8'));assert infos[:249]==json.loads(z.read('data/MapInfos.json'));assert len(infos)==251
result=dict(passed=True,checks=['Original SEAM battle and every other Map002 event unchanged','Original post-SEAM clothing purchase, goods, Leave index and cancellation unchanged','Only the inspection branch and legacy completed-save predicate added','Prior switches, variables, System settings and map hierarchy preserved; two maps appended'])
(OUT/'preservation.json').write_text(json.dumps(result,indent=2),encoding='utf-8');print('PASS original shop/battle/database preservation.')
