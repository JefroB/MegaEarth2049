"""Render MV map contact sheets using the project's own autotile tables and art.
Usage: python tools/world/render_maps.py 33 43 47
"""
import json, re, sys, math, os
from pathlib import Path
from functools import lru_cache
from PIL import Image, ImageDraw, ImageFile
ImageFile.LOAD_TRUNCATED_IMAGES = True  # Older art has ancillary PNG checksum errors.
ROOT = Path(__file__).resolve().parents[2]
OUT = Path(os.environ.get('WORLD_PREVIEW_DIR', str(ROOT / 'tools/world/previews')))
OUT.mkdir(parents=True, exist_ok=True)
DATA = Path(os.environ.get('WORLD_MAP_DIR', str(ROOT/'data')))
core = (ROOT/'js/rpg_core.js').read_text(encoding='utf-8-sig')
TABLES = {k: json.loads(re.search(r'Tilemap\.'+k+r'_AUTOTILE_TABLE = (\[.*?\]);', core, re.S)[1]) for k in ['FLOOR','WALL','WATERFALL']}
sets = json.loads(((DATA/'Tilesets.json') if (DATA/'Tilesets.json').exists() else (ROOT/'data/Tilesets.json')).read_text(encoding='utf-8-sig'))
infos = json.loads((DATA/'MapInfos.json').read_text(encoding='utf-8-sig'))
@lru_cache(None)
def sheet(name, category='tilesets'):
    p=ROOT/'img'/category/(name+'.png')
    return Image.open(p).convert('RGBA') if p.exists() else None
@lru_cache(None)
def tile(ts, tid):
    out=Image.new('RGBA',(48,48))
    if not tid: return out
    if tid<2048:
        slot=4 if tid>=1536 else 5+tid//256
        sx=(tid//128%2*8+tid%8)*48; sy=(tid%256//8%16)*48
        src=sheet(sets[ts]['tilesetNames'][slot])
        if src: out.alpha_composite(src.crop((sx,sy,sx+48,sy+48)))
        return out
    kind=(tid-2048)//48; shape=(tid-2048)%48; tx=kind%8; ty=kind//8; table=TABLES['FLOOR']
    if tid<2816:
        slot=0
        if kind<4: bx,by=[(0,0),(0,3),(6,0),(6,3)][kind]
        else:
            bx=tx//4*8; by=ty*6+(tx//2%2)*3
            if kind%2: bx+=6; table=TABLES['WATERFALL']
    elif tid<4352: slot=1; bx=tx*2; by=(ty-2)*3
    elif tid<5888: slot=2; bx=tx*2; by=(ty-6)*2; table=TABLES['WALL']
    else:
        slot=3; bx=tx*2; by=math.floor((ty-10)*2.5+(0.5 if ty%2 else 0))
        if ty%2: table=TABLES['WALL']
    src=sheet(sets[ts]['tilesetNames'][slot])
    if src and shape<len(table):
        for i,(qx,qy) in enumerate(table[shape]):
            sx=(bx*2+qx)*24; sy=(by*2+qy)*24
            out.alpha_composite(src.crop((sx,sy,sx+24,sy+24)),(i%2*24,i//2*24))
    return out
def render(mid, labels=True):
    p=DATA/f'Map{mid:03}.json'
    if not p.exists(): p=ROOT/f'data/Map{mid:03}.json'
    m=json.loads(p.read_text(encoding='utf-8-sig'))
    w,h=m['width'],m['height']; ts=m['tilesetId']; n=w*h
    im=Image.new('RGBA',(w*48,h*48),(25,25,29,255)); upper=[]
    for z in range(4):
        for y in range(h):
            for x in range(w):
                tid=m['data'][z*n+y*w+x]
                if tid:
                    if sets[ts]['flags'][tid]&16: upper.append((tid,x,y))
                    else: im.alpha_composite(tile(ts,tid),(x*48,y*48))
    for e in filter(None,m['events']):
        p=e['pages'][0]; a=p['image']; name=a['characterName']
        if a['tileId']: im.alpha_composite(tile(ts,a['tileId']),(e['x']*48,e['y']*48))
        elif name:
            s=sheet(name,'characters')
            if s:
                big='$' in name[:2]; cw=s.width//(3 if big else 12); ch=s.height//(4 if big else 8)
                idx=a['characterIndex']; sx=(0 if big else idx%4*3)*cw+cw; sy=(0 if big else idx//4*4)*ch+(a['direction']//2-1)*ch
                im.alpha_composite(s.crop((sx,sy,sx+cw,sy+ch)),(e['x']*48+24-cw//2,e['y']*48+48-ch))
    for tid,x,y in upper: im.alpha_composite(tile(ts,tid),(x*48,y*48))
    if labels:
        d=ImageDraw.Draw(im)
        for e in filter(None,m['events']):
            x,y=e['x']*48,e['y']*48
            d.rectangle((x,y,x+47,y+47),outline='#ffcc55',width=2);d.text((x+2,y+2),str(e['id']),fill='white',stroke_width=1,stroke_fill='black')
    return im.convert('RGB')
if __name__=='__main__':
    ids=list(map(int,sys.argv[1:])); thumbs=[]
    for mid in ids:
        im=render(mid);im.save(OUT/f'Map{mid:03}.png'); im.thumbnail((560,480))
        card=Image.new('RGB',(580,520),'#20242b');card.paste(im,((580-im.width)//2,32));ImageDraw.Draw(card).text((10,10),f'{mid:03} - {infos[mid]["name"]}',fill='white');thumbs.append(card)
    contact=Image.new('RGB',(580*3,520*math.ceil(len(thumbs)/3)),'#20242b')
    for i,im in enumerate(thumbs):contact.paste(im,(i%3*580,i//3*520))
    contact.save(OUT/'contact.png'); print(OUT/'contact.png')
