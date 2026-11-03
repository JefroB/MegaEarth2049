from pathlib import Path
import json,html
P=Path('tools/asset-refresh')
records=[]
for kind in ['Items','Weapons','Armors','Skills','States']:
 for o in json.loads(Path('data/'+kind+'.json').read_text()):
  if o and o['name'] and o['iconIndex']>=1680:records.append(dict(kind=kind,name=o['name'],id=o['id'],icon=o['iconIndex']))
s='''<!doctype html><meta charset="utf-8"><title>Mega Earth — asset refresh</title><style>body{background:#101b25;color:#e1eceb;font:16px system-ui;margin:32px}h1{color:#e9b15a}nav{display:flex;gap:10px;margin:25px 0}button{background:#263e4c;color:white;padding:10px;border:1px solid #609495;border-radius:5px;cursor:pointer}main{display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:12px}article{background:#20313e;padding:14px;min-height:112px;border-radius:5px}canvas{image-rendering:pixelated;display:block;margin-bottom:10px}small{color:#a4bfc7}img{max-width:100%}.portraits{display:flex;flex-wrap:wrap;gap:12px;margin:20px 0}</style><h1>Mega Earth: finished asset pass</h1><p>New inventory, equipment, status and skill icons. Each preview shows the native 32px icon and a 2× view.</p><nav id="tabs"></nav><main id="grid"></main><h2>Actor command portraits</h2><div class="portraits">'''
actors=json.loads(Path('data/Actors.json').read_text(encoding='utf-8-sig'))
s+=''.join('<img src="../../img/battlecommands/Face_'+str(a['id'])+'.png" alt="'+html.escape(a['name'])+'">' for a in actors if a and a['name'])
s+='</div><h2>Screen treatment</h2><img width="600" src="../../img/system/GameOver.png"><p><img src="../../img/system/Loading.png"></p><script>const records='+json.dumps(records)+''';let atlas=new Image();function show(kind){grid.replaceChildren();records.filter(r=>r.kind===kind).forEach(r=>{let a=document.createElement('article'),c=document.createElement('canvas');c.width=112;c.height=64;let x=c.getContext('2d');x.imageSmoothingEnabled=false;let sx=r.icon%16*32,sy=Math.floor(r.icon/16)*32;x.drawImage(atlas,sx,sy,32,32,0,16,32,32);x.drawImage(atlas,sx,sy,32,32,48,0,64,64);a.append(c,document.createTextNode(r.name));let small=document.createElement('small');small.textContent=' · '+r.id;a.append(small);grid.append(a)});}['Items','Weapons','Armors','Skills','States'].forEach(k=>{let b=document.createElement('button');b.textContent=k;b.onclick=()=>show(k);tabs.append(b)});atlas.onload=()=>{show('Items');window.ready=true};atlas.src='../../img/system/IconSet.png';</script>'''
Path('art/ui/preview.html').write_text(s,encoding='utf-8')
P.joinpath('README.md').write_text('''# Asset refresh, 2026-11-01

Implemented the expanded audit backlog, including assets not yet used in encounters. Source atlases live in img/ui; packed engine art is img/system/IconSet.png. Preview: art/ui/preview.html. Generated with the built-in image-generation tool, then cropped/resized and packed for MV. No API fallback used. Clothing was revised after the first pass was too dark.

## Completed

- Bespoke quest-object, Necklace fragment/pendant, engine/component/gear, implant, document and photograph icons.
- Disease icons replacing plain letters; rough bodily/status icons replaced.
- Colored equipment families, including a readable charcoal set and actual white gear.
- Yo-Yo, Slingshot, weapon-family silhouettes; all 14 missing usable skill icons; distinct boss warning/attack/recovery icons.
- HUD portraits for every defined actor in actorhud, battlehud and battlecommands, drawn from the exact actor face slot. Correct actor names replace the unrelated demo names. Associated HUD plugins remain disabled until their broader layouts/configuration are deliberately integrated.
- Finished turn indicator and replacement for Untitled sample; cleaner native window background, corporate GameOver and Loading treatments. Existing source alternatives suffixed _old remain historical, not runtime selections.
- Restored canonical story item IDs, merged duplicate component records, separated Neural Enhancer153 from Completed Engine132. Preserved crane Engine27 as a distinct quest item. Engine components now appear under Key Items.
- Reconstructed Stimulant4 (+20TP, clears Sleep), Hot Links6 (+100HP), Spicy Burrito8 (+150HP), Energy Drink9 (+30MP), Rabinex13 (clears Rabies), at conservative fixed prices. Restored Armortech Token34 (100 gold; existing dispensers cost5 tokens). No named reward/event was removed.
- Old supply shops pointing at overwritten or missing records now stock the restored supplies. Exact changes: item-repair.json. All direct item command references now resolve.

## Preservation and limitations

Original data and artwork are in before-refresh.zip. Existing save inventory keys already used the stored canonical IDs; they are retained without automatic grants. Historical ID132 represented both an enhancer and a completed engine: existing132 remains the engine, and future enhancer gains use153. It is impossible to determine the provenance of every previously corrupted save count; no speculative quest-unlocking migration is performed. Fresh gains, inventory lists and save roundtrips are verified.

Finished stock tilesets, props and optional approved character art were retained. This pass fixes the identified art backlog, not every unfinished quest, shop balance or entire-map placement issue. Future-use assets are ready in the database and HUD folders; unused encounters are not automatically added to progression.

## Validation and build notes

validation.json records native runtime assertions. check-item-refs.py validates direct command references. Final icon audit has no blank item/weapon/armor icons and no blank usable skill icons; internal status icons and two database separator skills intentionally remain blank.

The scripts are staged implementation tools, not a single idempotent installer: assign-icons.py was run against the pre-refresh database before repair-items.py. Do not rerun those migration stages on current data. pack-art.js packages the first atlas/UI; pack-extra.js then packages the final clothing/supply atlas. Back up current work before any rebuild. The manifest preserves the first-stage slot assignments, and item-repair.json records canonical ID changes; extra-icons.json contains final equipment/supply placements.
''',encoding='utf-8')
P.joinpath('PROMPTS.md').write_text('''# Generation prompt set

Built-in image_gen, transparent background, no labels or grid. Final source outputs: img/ui/InventoryAtlas.png, SuppliesAtlas.png, ClothingAtlas.png.

InventoryAtlas: 8×8 equal-cell production inventory atlas, crisp dark outlines, strong silhouettes and3-tone shading for32px RPG display. Row-major subjects: pendant quarters1–4, assembled pendant, blue teardrop necklace, industrial engine, blueprint; piston, circuitboard, turbine, gear, neural chip, disco implant, third-eye implant, burlap parcel; cloth, control module, summons, pie evidence, manifesto, oilcan, photographs, research notebook; transponder, yo-yo, slingshot, shuriken, network, prank box, feather, circus spotlight; fist, kidney impact, barricade, hourglass, blisters, cracked immune shield, bacteria, corkscrew pathogen; infected clapping hands, liver, toilet, waste, bloody waste, thermometer, queasy face, laughing face; cap, glove, trousers, jacket, helmet, shoe, pistol, SMG; rifle, sniper rifle, shotgun, rotary cannon, plasma cannon, warning, impact, wrench.

SuppliesAtlas: 4×2 equal-cell transparent production atlas, dark outlines and bold3-tone silhouettes legible at32px. Row1: spicy sausages in tray, burrito, blue energy can with lightning bolt, purple stimulant vial. Row2: green medical bottle with white cross, painkiller blister pack, first-aid tin, juice carton. No text.

ClothingAtlas (final revision): 8×8, bright polished urban sci-fi pixel-art equipment, body colors not black objects with colored trim; generous cell margins, no text. Columns: cap, armored glove, tactical pants, jacket, motorcycle helmet, running shoe, cargo shorts, work boot. Rows: red, yellow, purple, blue, green, charcoal with silver highlights, ivory white with cool shadows, orange. Dark navy outlines, broad3-tone shading, strong32px silhouettes.
''',encoding='utf-8')
print('Preview and implementation report saved')
