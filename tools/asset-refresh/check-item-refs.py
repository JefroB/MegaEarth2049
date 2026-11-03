import json
from pathlib import Path
items=json.loads(Path('data/Items.json').read_text());bad=[]
def visit(v,w):
 if isinstance(v,dict):
  if 'code' in v and 'parameters' in v:
   a=v['parameters'];code=v['code'];i=None
   if code==126:i=a[0]
   if code in [302,605] and a[0]==0:i=a[1]
   if code==111 and a[0]==8:i=a[1]
   if i and (i>=len(items) or not items[i]):bad.append((w,code,i))
  for x in v.values():visit(x,w)
 elif isinstance(v,list):
  for x in v:visit(x,w)
for p in Path('data').glob('*.json'):visit(json.loads(p.read_text(encoding='utf-8-sig')),p.name)
print(bad)
