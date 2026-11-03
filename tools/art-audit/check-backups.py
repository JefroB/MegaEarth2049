from pathlib import Path
import zipfile,json
for p in Path('tools').rglob('*.zip'):
 with zipfile.ZipFile(p) as z:
  names=[n for n in z.namelist() if n.endswith('Items.json')]
  for n in names:
   a=json.loads(z.read(n).decode('utf-8-sig'));print(str(p),[(i,x['id'],x['name']) for i,x in enumerate(a[:15]) if x])
