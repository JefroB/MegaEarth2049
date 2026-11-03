"""Verify A24 changed only the reviewed service choices and appended plugin."""
import json,zipfile,hashlib,re
from pathlib import Path
m=json.loads(Path('tools/cosmetic-skins/manifest.json').read_text());checks=[]
with zipfile.ZipFile('tools/cosmetic-skins/before.zip') as z:
 for q in m['entries']:
  name=f"data/Map{q['map']:03}.json";old=json.loads(z.read(name));cur=json.loads(Path(name).read_text(encoding='utf8'));L=cur['events'][q['event']]['pages'][0]['list'];h=next(c for c in L if c['code']==102 and c['indent']==0);assert h['parameters'][1]==q['cancel'];assert h['parameters'][0].pop()=='Chromatic skin: Rex';start=next(i for i,c in enumerate(L)if c['code']==402 and c['indent']==0 and c['parameters'][0]==q['choice']);end=next(i for i in range(start+1,len(L))if L[i]['code']==404 and L[i]['indent']==0);del L[start:end];assert cur==old;checks.append(f"Map{q['map']:03}: original map, services, choice indices and cancellation unchanged")
 assert z.read('data/Actors.json')==Path('data/Actors.json').read_bytes();checks.append('Actors database byte-identical')
 def plugins(s):return json.loads(re.search(r'var\s+\$plugins\s*=\s*(\[.*\]);',s,re.S)[1])
 old=plugins(z.read('js/plugins.js').decode('utf8'));cur=plugins(Path('js/plugins.js').read_text());assert cur[:-1]==old and cur[-1]['name']=='ME_CosmeticSkins' and cur[-1]['status'];checks.append('Existing plugin order and configuration unchanged; cosmetic plugin appended')
for a in m['assets']:
 assert hashlib.sha256(Path(a['path']).read_bytes()).hexdigest()==a['sha256'];checks.append(a['path']+' original source hash unchanged')
Path('tools/cosmetic-skins/preservation.json').write_text(json.dumps(dict(passed=True,checks=checks),indent=2));print('PASS',len(checks),'preservation checks')
