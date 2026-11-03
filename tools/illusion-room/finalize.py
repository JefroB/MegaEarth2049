"""Keep the policy rule visible on one native message page; idempotent."""
import json,textwrap
from pathlib import Path
before='The projector now follows the original tape. The fake shrinkage stops. Keep a voluntary demonstration, or disconnect the sales pitch? Both leave a readable inspection record.'
after='The projection now follows the tape. Fake shrinkage stops. Keep a voluntary demo, or disconnect the pitch? Either choice leaves an inspection record.'
assert len(textwrap.wrap(after,43))<=4
for n in[249,250]:
 p=Path(f'data/Map{n:03}.json');m=json.loads(p.read_text(encoding='utf-8'))
 for e in m['events']:
  if not e:continue
  for pg in e['pages']:
   L=pg['list'];out=[];i=0
   while i<len(L):
    if L[i]['code']!=101:out.append(L[i]);i+=1;continue
    start=i;depth=L[i]['indent'];params=L[i]['parameters'];texts=[]
    while i<len(L)and L[i]['code']in[101,401]and L[i]['indent']==depth and(L[i]['code']==401 or L[i]['parameters']==params):
     if L[i]['code']==401:texts.append(L[i]['parameters'][0])
     i+=1
    joined=' '.join(texts)
    if before not in joined:out+=L[start:i];continue
    lines=textwrap.wrap(joined.replace(before,after),43)
    for k in range(0,len(lines),4):out.append(dict(code=101,indent=depth,parameters=params));out += [dict(code=401,indent=depth,parameters=[t])for t in lines[k:k+4]]
   pg['list']=out
 p.write_text(json.dumps(m,ensure_ascii=False,separators=(',',':')),encoding='utf-8')
