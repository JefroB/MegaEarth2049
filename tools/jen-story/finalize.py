"""Idempotent narrative polish; preserves event branches and native text bounds."""
import json,textwrap
from pathlib import Path
p=Path('data/Map026.json');d=json.loads(p.read_text(encoding='utf-8'))
for pg in d['events'][4]['pages']:
    old=pg['list'];out=[];i=0
    while i<len(old):
        h=old[i];i+=1
        if h['code']!=101:
            out.append(h);continue
        lines=[]
        while True:
            while i<len(old) and old[i]['code']==401:
                lines.append(old[i]['parameters'][0]);i+=1
            if i<len(old) and old[i]['code']==101 and old[i]['indent']==h['indent'] and old[i]['parameters']==h['parameters']:
                i+=1
                continue
            break
        text=' '.join(lines).replace('The fictional implant irritation is treated offscreen.','Jen and the clinic team attend to Orla. Her breathing steadies.')
        lines=textwrap.wrap(text,43)
        for k in range(0,len(lines),4):
            out.append(h.copy());out.extend(dict(code=401,indent=h['indent'],parameters=[t])for t in lines[k:k+4])
    pg['list']=out
p.write_text(json.dumps(d,ensure_ascii=False,separators=(',',':')),encoding='utf-8')
