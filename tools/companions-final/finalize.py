"""Idempotent prose polish on this batch's messages only."""
import json,textwrap
from pathlib import Path
prompts={
5:'BLACK: Reference holds. Who gets the calibration notes: the whole Dojo, or just our crew? Same stipend either way.',
6:'BLUE: Nobody gets shot for crossing a painted line. Do we put the new order on the wall, or keep it in the crew briefing?',
8:'NILES: The block stays in one piece. You want the crew on the inspection, or no names near my stash? Your cut is the same.',
9:'JACK: Cargo is sealed, passengers stay off the sample list. Keep our route copy under seal, or shred the spare? Names stay offline either way.',
10:'DICK: I got in, copied nothing useful, and nobody lost access. Career low point. Want the trick, or shall I keep one fucking secret?'}
m=json.loads(Path('tools/companions-final/manifest.json').read_text(encoding='utf-8'))
old='Both checks are complete. Choose the local outcome. Either choice earns the same reward; it does not affect campaign gates.'
for q in m['chapters']:
 n,id=q['giver'];p=Path(f'data/Map{n:03}.json');d=json.loads(p.read_text(encoding='utf-8'))
 replacements={old:prompts[q['actor']],
 'Already on the crew. Use Formation to put this companion in the walking party; this invitation never resets their level, equipment or condition.':'Already on the crew. Use Formation to put this companion in the walking party.',
 f'{["", "Rex", "Jen", "Zack", "Zed", "Black Ninja", "Blue Ninja", "Pink Ninja", "Niles", "Jack", "Dick"][q["actor"]]} joins the crew. With four walking members they join reserves. Use Formation before taking their chapter. Existing stats and equipment are retained.':f'{["", "Rex", "Jen", "Zack", "Zed", "Black Ninja", "Blue Ninja", "Pink Ninja", "Niles", "Jack", "Dick"][q["actor"]]} joins the crew. With four walking members they join reserves. Use Formation before taking their chapter.',
 'NILES: There. My fuse, my fucking problem. The landlord can repossess the invoice. No new Smelly Key, no new turf war. Just one less button pointed at our flats.':'NILES: There. My fuse, my fucking problem. The landlord can repossess the invoice. If anyone asks, the neighbourhood has never heard of either of us.'}
 for pg in d['events'][id]['pages']:
  L=pg['list'];out=[];i=0
  while i<len(L):
   if L[i]['code']!=101:out.append(L[i]);i+=1;continue
   start=i;depth=L[i]['indent'];params=L[i]['parameters'];texts=[]
   while i<len(L)and L[i]['code']in[101,401]and L[i]['indent']==depth and(L[i]['code']==401 or L[i]['parameters']==params):
    if L[i]['code']==401:texts.append(L[i]['parameters'][0])
    i+=1
   joined=' '.join(texts)
   for before,after in replacements.items():joined=joined.replace(before,after)
   if joined==' '.join(texts):out+=L[start:i];continue
   lines=textwrap.wrap(joined,43)
   for j in range(0,len(lines),4):out.append(dict(code=101,indent=depth,parameters=params));out += [dict(code=401,indent=depth,parameters=[t])for t in lines[j:j+4]]
  pg['list']=out
 p.write_text(json.dumps(d,ensure_ascii=False,separators=(',',':')),encoding='utf-8')
print('Polished companion final decisions and invitation feedback.')
