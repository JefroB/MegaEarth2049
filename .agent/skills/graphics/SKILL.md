---
name: graphics
description: Create and integrate MegaEarth2049 raster assets, icons, portraits, character and battle sprites. Verify actual engine layouts, complete artwork and crop ownership before packing; use the shared atlas validation workflow for sprite/icon sheets.
---

# Graphics for MegaEarth2049

Inspect the actual asset and active loader before editing. Historical filenames and example dimensions are not format contracts. Preserve approved artwork and existing slots. Use the available image-generation workflow to create or repaint raster art; packing existing art into engine cells is a separate operation.

## Mandatory atlas workflow

Before extracting icons, animation cells, faces or sprite frames, read [atlas-packing.md](references/atlas-packing.md). Save exact crop rectangles and destination cells, validate transparent gutters and bounds with [validate_atlas.py](scripts/validate_atlas.py), then inspect every exact packed cell and the actual game renderer. A regular-looking generated grid is a draft, not evidence of correct crop boundaries.

Do not cure neighboring-cell fragments by retaining only the largest connected component, thresholding away pieces, shrinking the entire sheet or tightening a crop through the subject. Those techniques can erase legitimate debris, limbs, cables, cloth and effects. Correct the ownership/crop or regenerate an isolated asset with space around its complete silhouette. Padding a clipped crop cannot restore missing artwork.

## Engine layouts to verify

| Asset | Native MV layout / rule |
|---|---|
| IconSet |32px cells,16 columns; preserve the512px sheet width and existing icons. Height grows in full32px rows. Allocate against live data and pixels, not a guessed blank slot.|
| Character sheet with `$` prefix |One character,3 pattern columns ×4 directions. Frame size derives from image dimensions; `$` does not mean a fixed enlargement.|
| Ordinary character sheet |Eight character blocks,4 across ×2 down; each block is3 patterns ×4 directions. Inspect active loader overrides before using another layout.|
| `!` object prefix |Object positioning behavior; inspect actual frame size and anchor. It does not define one fixed PNG size.|
| MV SV battler |9 columns ×6 rows of cells. Motion uses three-frame blocks: `cx=floor(motion/6)*3+pattern`, `cy=motion%6`. A row is not nine frames of one motion. Check `Sprite_Actor.MOTIONS` and the enabled enemy loader.|
| MV face sheet |4 faces across ×2 down; default face cells144×144. Confirm the consuming face dimensions.|
| Native animation sheet |Five192px cells per row, indexed by database animation patterns. Cell art needs margins for filtering, rotation and travel.|
| Native WeaponsN |Twelve weapons per sheet, each with three96×64 frames. Usual sheet576×384; verify `Sprite_Weapon.updateFrame`.|
| Custom ME boss atlas |Use its actual named sequence, cell, phase, scale and anchor manifest; no generic MV layout assumption.|

Native walk directions are down, left, right, up. Damage variants and filename suffixes do not establish a layout; inspect their pixels and callers. Enemy animated battlers are governed by the enabled plugins, not by installed-but-disabled Yanfly files.

## Style and registration

Match nearby approved game art: readable silhouettes, clean pixel outlines, a limited palette, cyberpunk accents and coherent lighting. Inspect at actual32px icon size or the relevant character/battle size, then enlarge for edge review. Portraits can use the established cel-shaded bust style rather than chibi sprite proportions.

For animation, use [mini-boss](../mini-boss/SKILL.md) / [main-boss](../main-boss/SKILL.md) and [battle-animation](../battle-animation/SKILL.md) as applicable. Mechanical geometry stays rigid and registered; organic movement may deform intentionally. Do not normalize every animated silhouette to the same bounding-box size. One shared canvas, scale and pivot preserve body size while poses extend naturally.

## Completion evidence

Keep source masters, a reproducible packer, the crop/placement manifest and validator report. Inspect a source-boundary overlay, every isolated packed cell on contrasting backgrounds, a contact sheet, native-size pixels and the in-game use. For animation also step through boundaries and rotations. Do not claim that dimensions, an automatic check or a generated sheet alone proves complete, clean or pixel-perfect artwork.
