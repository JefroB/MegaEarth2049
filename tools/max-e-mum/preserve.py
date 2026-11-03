"""Read-only preservation checks against the A26 pre-install snapshot."""
from pathlib import Path
import json,zipfile
checks=[]
with zipfile.ZipFile('tools/max-e-mum/before.zip')as z:
 for name in ['Actors','Classes','Skills','MapInfos']:
  old=json.loads(z.read('data/'+name+'.json'));new=json.loads(Path('data/'+name+'.json').read_text());assert new[:len(old)]==old;checks.append(name+' original records unchanged; new records appended')
 old=json.loads(z.read('data/System.json'));new=json.loads(Path('data/System.json').read_text());assert new['switches'][266:]==['Iron Circuits - inspection accepted','Iron Circuits - stop verified','Iron Circuits - telemetry verified','Iron Circuits - inspection complete'];new['switches']=new['switches'][:266];assert new==old;checks.append('System unchanged except four appended local switches')
 old=json.loads(z.read('data/Map010.json'));new=json.loads(Path('data/Map010.json').read_text());assert new['events'][-1]['name']=='Iron Circuits public lift';new['events'].pop();assert new==old;checks.append('All original Timbuc tiles/events unchanged; one public lift appended')
 old=z.read('js/plugins/ME_CompletionLog.js').decode('utf8');new=Path('js/plugins/ME_CompletionLog.js').read_text();new=''.join(line+'\n'for line in new.splitlines()if not line.startswith(" entry('ironCircuits'"));assert new.splitlines()==old.splitlines();checks.append('Completion Log original definitions and runtime unchanged; one read-only project appended')
Path('tools/max-e-mum/preservation.json').write_text(json.dumps(dict(passed=True,checks=checks),indent=2));print('PASS',len(checks),'preservation checks')
