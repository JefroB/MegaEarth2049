"""Idempotent placement and route-clue corrections after visual inspection."""
import json
import textwrap
from pathlib import Path

p=Path('data/Map103.json')
data=json.loads(p.read_text(encoding='utf-8'))
data['events'][16]['x']=21
data['events'][16]['y']=18
commands=data['events'][15]['pages'][0]['list']
out=[]
i=0
while i<len(commands):
    header=commands[i]
    i+=1
    if header['code']!=101:
        out.append(header)
        continue
    lines=[]
    while i<len(commands) and commands[i]['code']==401:
        lines.append(commands[i]['parameters'][0])
        i+=1
    text=' '.join(lines).replace(
        'the SLF is below the Timbuc neural hatch. Ask Inez for reuse permission.',
        'the SLF is below the Timbuc service hatch. Pip needs the three vending memory labels first: Timbuc, Timbuc 2 and the B.M.N.E.C. frontage. Ask Inez for reuse permission.'
    )
    lines=textwrap.wrap(text,43)
    for start in range(0,len(lines),4):
        out.append(header.copy())
        out.extend(dict(code=401,indent=header['indent'],parameters=[line]) for line in lines[start:start+4])
commands[:]=out
p.write_text(json.dumps(data,ensure_ascii=False,separators=(',',':')),encoding='utf-8')
p=Path('tools/local-projects/manifest.json')
data=json.loads(p.read_text(encoding='utf-8'))
data['newEventLocations']['16']=[21,18]
p.write_text(json.dumps(data,indent=2),encoding='utf-8')
print('Sorting station placed on open sand; archive explains existing SLF access requirements.')
