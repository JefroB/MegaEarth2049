from pathlib import Path
import json
p=Path('data/Animations.json');animations=json.loads(p.read_text(encoding='utf8'));a=animations[197]
a['animation1Name']='ME_ArmorFracture';a['name']='Armor Fracture - shatter and fall';frames=[]
for f in range(18):
 if f<3:cells=[[0,(-3 if f==1 else 2 if f==2 else 0),0,30,0,0,255,0]]
 else:
  t=(f-3)/14;alpha=round(255*min(1,(1-t)*3));y=round(-8*4*t*(1-t)+32*t*t)
  cells=[[1,round(-6-28*t),y,30,round(-95*t),0,alpha,0],[2,round(6+28*t),y+3,30,round(110*t),0,alpha,0],[3,round(8*t),round(8+38*t*t),20,round(150*t),0,alpha,0]]
 frames.append(cells)
a['frames']=frames;a['timings']=[dict(frame=2,flashScope=1,flashColor=[255,100,65,110],flashDuration=3,se=dict(name='Blow1',pan=0,pitch=120,volume=65))]
p.write_text(json.dumps(animations,separators=(',',':')),encoding='utf8')
print('Armor fracture now hits, splits, tumbles and falls away')
