import json,zipfile
from pathlib import Path
files=['data/Enemies.json','js/plugins.js'];backup=Path('tools/legacy-bosses/before-poop-v2.zip')
assert not backup.exists()
with zipfile.ZipFile(backup,'w',zipfile.ZIP_DEFLATED) as z:
 for f in files:z.write(f)
p=Path('data/Enemies.json');d=json.loads(p.read_text(encoding='utf-8-sig'))
for i,k in [(115,'Poop'),(116,'Turd')]:d[i]['note']+='\n<ME_PoopArt: '+k+'>'
p.write_text(json.dumps(d,separators=(',',':')),encoding='utf-8')
p=Path('js/plugins.js');s=p.read_text(encoding='utf-8-sig');at=s.rfind(']');s=s[:at].rstrip()+',\n'+json.dumps({'name':'ME_PoopSprites','status':True,'description':'Fixed-body poop boss and minion artwork','parameters':{}})+'\n'+s[at:];p.write_text(s,encoding='utf-8')
