"""Pack generated isolated parts into registered native MV frames; no body warping."""
from PIL import Image,ImageOps,ImageDraw
from pathlib import Path
import json,math
ROOT=Path(__file__).resolve().parents[2];SRC=ROOT/'art/max-e-mum/master.png';OUT=ROOT/'art/max-e-mum';im=Image.open(SRC).convert('RGBA')
rects={'side':[26,7,379,387],'front':[458,6,369,388],'back':[900,7,368,387],'armSide':[44,448,341,346],'armFront':[481,448,287,364],'armBack':[904,448,342,359],'wheel':[80,904,256,259],'claw':[436,933,354,198],'portrait':[810,822,480,390]}
parts={};cells=[]
for name,(x,y,w,h) in rects.items():
 part=im.crop((x,y,x+w,y+h));part.save(OUT/(name+'.png'));parts[name]=part;cells.append(dict(name=name,source_rect=[x,y,w,h],target=str(OUT/(name+'.png')),target_rect=[0,0,w,h]))
(OUT/'source-crops.json').write_text(json.dumps(dict(source=str(SRC),alpha_threshold=8,source_margin=4,target_margin=4,cells=cells),indent=2))
# Fixed assembly transforms, not automatic per-frame silhouette fitting.
body={n:parts[n].resize((64,66),Image.Resampling.NEAREST)for n in ['side','front','back']}
arm={n:parts[n].resize((30,32),Image.Resampling.NEAREST)for n in ['armSide','armFront','armBack']}
wheel=parts['wheel'].resize((9,9),Image.Resampling.NEAREST)
# Interior belt faces in the fixed 64x66 chassis coordinates. Cycle the existing
# rubber/grip pixels inside these masks; silhouette, hubs and armor stay fixed.
tread_faces={
 'front':[[(6,45),(14,45),(14,60),(6,60)],[(50,45),(57,45),(57,60),(50,60)]],
 'back':[[(5,45),(14,45),(14,60),(5,60)],[(50,45),(58,45),(58,60),(50,60)]],
 'side':[[(5,46),(10,46),(10,59),(5,59)],[(38,46),(42,44),(42,49),(39,53),(39,59),(35,59),(35,54)]]
}
def moving_treads(view,phase):
 src=body[view];dst=src.copy()
 for polygon in tread_faces[view]:
  mask=Image.new('1',src.size);ImageDraw.Draw(mask).polygon(polygon,fill=1)
  for x in range(src.width):
   rows=[y for y in range(src.height) if mask.getpixel((x,y))]
   for i,y in enumerate(rows):
    rgb=src.getpixel((x,rows[(i-phase)%len(rows)]))[:3]
    dst.putpixel((x,y),rgb+(src.getpixel((x,y))[3],))
 return dst
def limb(canvas,part,pivot,at,angle,mirror=False):
 if mirror:part=ImageOps.mirror(part);pivot=(part.width-pivot[0],pivot[1])
 layer=Image.new('RGBA',(192,192));layer.alpha_composite(part,(96-pivot[0],96-pivot[1]));layer=layer.rotate(angle,Image.Resampling.NEAREST,center=(96,96));canvas.alpha_composite(layer,(at[0]-96,at[1]-96))
def rig(view='side',angle=0,other=0,wheelangle=0,treadphase=0):
 c=Image.new('RGBA',(96,96));a=arm['armSide' if view=='side' else 'armBack' if view=='back' else 'armFront'];pivot=(26,6)if view=='side' else (8,6)if view=='back' else (19,5)
 if view=='side':limb(c,a,pivot,(39,42),other)
 c.alpha_composite(moving_treads(view,treadphase) if treadphase else body[view],(16,14))
 if view=='side':
  # Tread hubs rotate independently; chassis does not scale or wobble.
  for at in [(58,66),(72,64)]:c.alpha_composite(wheel.rotate(wheelangle,Image.Resampling.NEAREST,expand=False),at)
  limb(c,a,pivot,(63,42),angle)
 else:
  limb(c,a,pivot,(28,43),angle,view=='back');limb(c,a,pivot,(68,43),other,view!='back')
 return c
angles=[[0,10,-10],[0,5,0],[20,45,20],[55,60,55],[-15,-25,-15],[0,15,0],[-20,-75,0],[70,-55,0],[15,45,0],[20,65,20],[25,55,25],[15,35,15],[10,-10,10],[60,80,60],[-15,-20,-15],[-10,5,-10],[-20,-20,-20],[0,0,0]]
sv=Image.new('RGBA',(864,576));records=[]
for motion in range(18):
 for pattern in range(3):
  f=rig(angle=angles[motion][pattern],other=-angles[motion][pattern]//2,wheelangle=pattern*35 if motion in [0,12]else 0)
  if motion==17:
   f=f.rotate(90,Image.Resampling.NEAREST,expand=False);f=ImageOps.flip(f);shift=Image.new('RGBA',f.size);shift.alpha_composite(f,(0,7));f=shift
  if motion!=17:
   grounded=Image.new('RGBA',f.size);grounded.alpha_composite(f,(0,14));f=grounded
  x=(motion//6*3+pattern)*96;y=(motion%6)*96;sv.alpha_composite(f,(x,y));fp=OUT/f'sv-{motion:02}-{pattern}.png';f.save(fp);records.append(dict(name=f'motion{motion}-frame{pattern}',source=str(fp),source_rect=[0,0,96,96],target=str(ROOT/'img/sv_actors/MAXEMUM.png'),target_rect=[x,y,96,96],group='battle',scale=1,pivot=[48,94]))
sv.save(ROOT/'img/sv_actors/MAXEMUM.png')
walk=Image.new('RGBA',(144,192))
for row,view in enumerate(['front','side','side','back']):
 for pattern in range(3):
  f=rig(view,angle=[-8,0,8][pattern],other=[8,0,-8][pattern],wheelangle=pattern*35,treadphase=(pattern-1)*4)
  if row==2:f=ImageOps.mirror(f)
  f=f.resize((48,48),Image.Resampling.NEAREST);grounded=Image.new('RGBA',f.size);grounded.alpha_composite(f,(0,6));f=grounded;fp=OUT/f'walk-{row}-{pattern}.png';f.save(fp);walk.alpha_composite(f,(pattern*48,row*48));records.append(dict(name=f'walk{row}-frame{pattern}',source=str(fp),source_rect=[0,0,48,48],target=str(ROOT/'img/characters/$MAXEMUM.png'),target_rect=[pattern*48,row*48,48,48],group='walk',scale=1,pivot=[24,46]))
walk.save(ROOT/'img/characters/$MAXEMUM.png')
face=Image.new('RGBA',(576,288));portrait=parts['portrait'];portrait.thumbnail((140,140),Image.Resampling.LANCZOS);face.alpha_composite(portrait,((144-portrait.width)//2,142-portrait.height));face.save(ROOT/'img/faces/MAXEMUM.png');fp=OUT/'face-fitted.png';face.crop((0,0,144,144)).save(fp);records.append(dict(name='portrait-cell0',source=str(fp),source_rect=[0,0,144,144],target=str(ROOT/'img/faces/MAXEMUM.png'),target_rect=[0,0,144,144]))
(OUT/'atlas.json').write_text(json.dumps(dict(source=str(SRC),alpha_threshold=8,source_margin=1,target_margin=1,cells=records,animation_groups={'battle':dict(frame_size=[96,96],scale=1,pivot=[48,94]),'walk':dict(frame_size=[48,48],scale=1,pivot=[24,46])}),indent=2))
# Exact runtime cells on a contrasting background, all motions labelled.
contact=Image.new('RGB',(960,1080),'#2d4050');d=ImageDraw.Draw(contact)
for m in range(18):
 x=m%6*160;y=m//6*360;d.text((x+4,y+4),str(m),fill='white')
 for pat in range(3):
  f=Image.open(OUT/f'sv-{m:02}-{pat}.png');contact.paste(f,(x+24,y+24+pat*104),f)
contact.save(OUT/'contact.png');print('Packed rigid-part battle, walking and face art.')

# Review the complete source ownership without modifying the source master.
overlay=Image.new('RGBA',im.size,'#243745');overlay.alpha_composite(im);d=ImageDraw.Draw(overlay)
for name,(x,y,w,h) in rects.items():d.rectangle((x,y,x+w-1,y+h-1),outline='#ff5c76',width=2);d.text((x+3,y+3),name,fill='white')
overlay.convert('RGB').save(OUT/'source-overlay.png')
light=Image.new('RGB',contact.size,'#dce8dc');d=ImageDraw.Draw(light)
for m in range(18):
 x=m%6*160;y=m//6*360;d.text((x+4,y+4),str(m),fill='black')
 for pat in range(3):
  f=Image.open(OUT/f'sv-{m:02}-{pat}.png');light.paste(f,(x+24,y+24+pat*104),f)
light.save(OUT/'contact-light.png')
