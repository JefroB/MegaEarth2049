"""Idempotent dialogue refinements from native map/art review."""
import json
import textwrap
from pathlib import Path

changes={
    'The west home needs a proper brace.':'The west first-aid room needs a proper brace.',
    'invoiced the tenants':'invoiced the crew',
    'reinforce the existing home':'reinforce the crew first-aid room',
    'We fix this one while people still have a home.':'We keep this roof up while people still need it.',
    'a collapsed home a market correction':'a collapsed clinic a wellness initiative',
    'Zack\'s help with this home':'Zack\'s help with the first-aid room',
    ' Nobody is recruited, removed or replaced by this job.':'',
    ' No weapon or equipped gear was consumed.':'',
}
for name,ids in [('Map103',[5]),('Map108',[5])]:
    p=Path('data/'+name+'.json');data=json.loads(p.read_text(encoding='utf-8'))
    for ident in ids:
        for pg in data['events'][ident]['pages']:
            old=pg['list'];out=[];i=0
            while i<len(old):
                h=old[i];i+=1
                if h['code']!=101:
                    out.append(h);continue
                lines=[]
                while i<len(old) and old[i]['code']==401:
                    lines.append(old[i]['parameters'][0]);i+=1
                text=' '.join(lines)
                for a,b in changes.items():text=text.replace(a,b)
                lines=textwrap.wrap(text,43)
                for k in range(0,len(lines),4):
                    out.append(h.copy())
                    out.extend(dict(code=401,indent=h['indent'],parameters=[t])for t in lines[k:k+4])
            pg['list']=out
    p.write_text(json.dumps(data,ensure_ascii=False,separators=(',',':')),encoding='utf-8')
print('Work order uses the existing first-aid building; NPC prose refined.')
