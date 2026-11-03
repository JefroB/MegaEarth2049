from pathlib import Path
import json
m=json.loads(Path('tools/weapon-variety/manifest.json').read_text());a=json.loads(Path('data/Animations.json').read_text())
html='''<!doctype html><meta charset="utf-8"><title>Corporate surplus weapons</title><style>body{background:#17212b;color:#f0eee5;font:16px system-ui;margin:32px}main{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:18px}article{background:#263744;padding:18px;border-radius:12px}canvas{width:100%;background:#101923;border-radius:8px}p{min-height:64px;line-height:1.5}h1{color:#eebf66}small{color:#afc4cb}</style><h1>Corporate surplus: twelve terrible ideas</h1><p>New weapons at Rivet Commons' reclaimed hardware shop and Newtown's lake salvage dealer. Cures also available at Newtown's pharmacy.<br>These previews play the same cell positions, rotation, scale and timing as the game's native animation renderer.</p><main id="cards"></main><script>const rows=ROWS,animations=ANIMS;const sheet=new Image();sheet.src='../../img/animations/ME_WeaponVariety.png';for(const row of rows){let e=document.createElement('article');e.innerHTML='<h2>'+row.name+'</h2><canvas width="480" height="240"></canvas><p>'+row.description+'</p><small>Weapon '+row.id+' / '+row.mode+' animation</small>';cards.appendChild(e);row.canvas=e.querySelector('canvas')}function paint(ms){for(const row of rows){let c=row.canvas,x=c.getContext('2d');x.clearRect(0,0,480,240);x.fillStyle='#577285';x.fillRect(85,120,40,55);x.fillStyle='#afc4cb';x.fillText(row.id===69||row.id===72?'ALLY':'TARGET',85,200);let frames=animations[row.animation].frames,f=Math.floor(ms/(1000/60*4))%(frames.length+10);if(sheet.complete&&f<frames.length)for(const cell of frames[f]){x.save();x.translate(105+cell[1],135+cell[2]);x.rotate(cell[4]*Math.PI/180);x.scale(cell[3]/100,cell[3]/100);x.globalAlpha=cell[6]/255;x.drawImage(sheet,cell[0]%5*192,Math.floor(cell[0]/5)*192,192,192,-96,-96,192,192);x.restore()}}requestAnimationFrame(paint)}requestAnimationFrame(paint)</script>'''
html=html.replace('ROWS',json.dumps(m)).replace('ANIMS',json.dumps(a));Path('art/weapons/preview.html').write_text(html,encoding='utf8')
Path('tools/weapon-variety/README.md').write_text('''# Weapon variety

Adds weapons 61–72, attack skills 185–196, cures 197–198, states 48–51, items 154–156, animations 176–187 and icons 1984–2015. Existing IDs, original weapons and story progression are preserved. Data backup: before.zip. build.py deliberately refuses to append twice.

## Existing projectile audit
- Grenade animations 141–145 contain hand-authored cell movement, rotation and impacts. Toss Grenade 142 is used by Smoke Bomb 76 and Bulldoze 68 through YEP action-sequence notes.
- Most guns use target-centered Shoot Normal 111 (Gun1 sprite sheet).
- Lazer Shotgun 39 uses Laser Blast 155. Automatic Gunfire 123 and Laser One/All 115–116 also exist. Security Pulse 157 uses 115.
- Weapon Image tags choose held weapon graphics, not projectile animations.
- YEP BattleEngineCore/ActSeq packs are not active. Existing action-sequence text does not execute under the current stack. No YEP core was enabled or legacy action sequence changed by this patch.
- Enabled existing WeaponSkill.js: native per-weapon Attack skills and ally selection. First equipped weapon controls the skill. No new battle framework is needed.

## Rendering
New animations use RPG Maker MV's native Sprite_Animation cells, with transparent 192px cells in ME_WeaponVariety.png. Thrown props rotate along an incoming arc; invoice returns; staples/spikes travel straight; melee swipes and supportive pulses use separate paths. They are target-relative authored animations like the original grenade, not dynamically traced from the actor's exact hand position. Native battle busy handling waits for animation completion before resolving actions.

## Gameplay
Hardware shop Map103/event2 stocks 61,62,63,64,68,70. Newtown salvage Map105/event4 stocks 65,66,67,69,71,72 and all three cures. Pharmacy Map105/event5 also stocks cures. All weapons have a playable class that can equip them. No class weapon restrictions changed.

Stapled: AGI x0.6, 2 turns. Glitterblind: HIT -0.25, 2 turns. Recall Rash: HP regeneration -2%, 3 turns. Fine Print: MDF x0.75, 3 turns. All expire after battle, respect ordinary state resistance, and do not restrict turns. Adhesive Remover clears Stapled/Glitterblind; Recall Lotion clears Rash; Retraction Stamp clears Fine Print. Shake It Off (10 TP, self) clears the first two. Clinical Reset (4 MP, ally) clears all four. Existing Cheer classes receive Shake It Off; Priest/Mod Doctor receive Clinical Reset through traits so existing saves benefit.

Visual review: art/weapons/preview.html. Build art with pack.js; it only packs generated atlas pixels. Gameplay/runtime checks: node tools/weapon-variety/test.js. Test fixture manipulations do not change game data. Balance is a conservative first pass and still merits normal campaign playtesting.
''',encoding='utf8')
print('Preview and implementation notes written')
