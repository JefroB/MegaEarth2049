import json
from pathlib import Path
from PIL import Image,ImageDraw,ImageFont
here=Path(__file__).resolve().parent;m=json.loads((here/'manifest.json').read_text())
im=Image.new('RGB',(1720,1320),'#161b24');d=ImageDraw.Draw(im)
font=ImageFont.truetype('C:/Windows/Fonts/arial.ttf',17);small=ImageFont.truetype('C:/Windows/Fonts/arial.ttf',14);title=ImageFont.truetype('C:/Windows/Fonts/arialbd.ttf',22)
for qi,q in enumerate(m['quests']):
 ox=(qi%2)*860;oy=(qi//2)*440
 d.text((ox+20,oy+15),q['theme'],font=title,fill='white');d.text((ox+20,oy+44),'Each node is a separate map. Lines are two-way doors.',font=font,fill='#b9c4d9')
 positions={}
 for i,mid in enumerate(q['roomMaps']):
  depth,ri=divmod(i,9);row,col=divmod(ri,3);positions[mid]=(ox+90+depth*390+col*105,oy+125+row*95)
 for a,b in m['roomLinks']:
  if a in positions and b in positions and a<b:d.line([positions[a],positions[b]],fill='#809ab4',width=4)
 a=q['roomMaps'][2];b=q['roomMaps'][15];ax,ay=positions[a];bx,by=positions[b]
 d.line([(ax,ay),(ox+370,ay),(ox+370,oy+370),(bx,oy+370),(bx,by)],fill='#e9ac61',width=3)
 d.text((ox+280,oy+393),'Descent requires both clues',font=small,fill='#e9ac61')
 for i,mid in enumerate(q['roomMaps']):
  x,y=positions[mid];ri=i%9;color='#438c83' if ri==6 else '#596889'
  d.rounded_rectangle((x-40,y-27,x+40,y+27),radius=6,fill=color,outline='#d3dfef',width=1)
  d.text((x-29,y-21),f'Map {mid}',font=small,fill='white');d.text((x-25,y+1),f'Room {ri+1}',font=small,fill='white')
 d.text((ox+35,oy+350),'Green: entry / return room',font=small,fill='#91d8cc')
im.save(here/'previews/connections.png')
