from pathlib import Path
import json
P=Path('tools/asset-variety')
P.joinpath('ninja-colors.json').write_text(json.dumps([{'color':c,'faceName':s,'faceIndex':i} for c,s,i in [('Red','ninja1',0),('Black','ninja1',1),('Pink','ninja2',0),('Green','ninja2',1),('Blue','ninja2',2),('Brown','ninja2',3),('Purple','ninja2',4)]],indent=2))
P.joinpath('README.md').write_text('''# Ninja, skill and armor variety follow-up

## Completed

- Filled the empty Blue Ninja portrait slot (ninja2, index2), plus Green1, Brown3 and Purple4. Existing Pink0, Red and Black portraits retained. New portraits have dark-brown/hazel/amber-brown/gray-green irises, varied complexions and facial detail. All52 referenced actor/dialogue face cells now contain art.
- Rebuilt36 HUD portrait assets from correct actor face cells. Seven ninja colors are shown in the preview, including colors not yet assigned to playable actors. Slot lookup: ninja-colors.json.
- Replaced109 skill icons with action-specific illustrations. All147 non-separator named skills now have distinct, nonblank icon pixels; only the two organizational separators remain blank.
- Restored19 distinctive armor identities: tropical Bermuda Shorts, work overalls, cybernetic Armortech armor, heavy steel plating, different cargo short cuts, slim orange pants, high-top sneakers, tan cargo pants, leather gloves, work boots, open-face/spiked helmets and a ballistic vest.
- No armor records were missing: the previous icon pass had obscured their identities. All60 named armor records remain. Skill effects, equipment stats and all other fields are unchanged.

## Art and generation

Generated with the built-in image-generation tool; no API fallback. Source art: [SkillVarietyA](../../img/ui/SkillVarietyA.png), [SkillVarietyB](../../img/ui/SkillVarietyB.png), [revised ninja portraits](../../art/ui/ninja-colors-source.png). Packed engine assets: img/system/IconSet.png and img/faces/ninja2.png; HUDs under img/actorhud, img/battlehud and img/battlecommands.

Exact icon prompts: [sheetA](prompt-0.txt), [sheetB](prompt-1.txt). Ninja edit prompt: preserve green/brown/blue/purple hood/mask designs and anime RPG style; green character medium warm-brown skin/dark-brown eyes, brown character olive skin/hazel eyes, blue character deep-brown skin/amber-brown eyes, purple character light freckled skin/gray-green eyes; no blue irises in these four; keep individual features without stereotypes, transparent background, four portrait cells.

## Verification

validate.py compares database records to before-variety.zip, ignoring only iconIndex. It checks distinct skill icon pixels, nonempty crops, transparent gutters and preserved existing Pink Ninja appearance (2-level alpha-rounding tolerance). check-face-cells.py checks actor and dialogue references. Browser preview test rendered the finished galleries. See validation.json.

[Open preview](../../art/ui/preview.html). Rebuild order for this follow-up: pack-icons.js; asset-refresh/write-preview.py; add-ninja-preview.py. Portrait packing is asset-refresh/fix-ninja-faces.js. Original data/IconSet/ninja2 are backed up in before-variety.zip; the original sparse ninja2 sheet is also in asset-refresh/ninja2-before.png. Do not rerun the older generic armor migration over these final mappings.
''',encoding='utf-8')
p=Path('art/ui/preview.html');s=p.read_text(encoding='utf-8').replace("atlas.src='../../img/system/IconSet.png'","atlas.src='../../img/system/IconSet.png?rev=variety-v2'");p.write_text(s,encoding='utf-8')
