# A26 — MAX-E-MUM

One bounded optional companion built from the existing Iron Circuits/cleaning-robot/bodybuilding-forum story. [Player guide](../../GameFAQs/FAQ_04_Characters_and_NPCs.md#max-e-mum). [Animated review](../../art/max-e-mum/preview.html).

## Production

`build.py` is the already-applied one-time installer. Actor13/class12/skills280–282/Map251/switches266–269 are appended; original records are retained. `before.zip` preserves the pre-install database files, Timbuc and Completion Log plugin. Do not rerun the installer over later changes. Its assertions and snapshot comparison reject mismatched state.

Art was generated with the built-in ImageGen tool as a transparent modular master. See [prompt](../../art/max-e-mum/prompt.txt). `pack.py` deterministically assembles rigid parts from manually measured source rectangles: three chassis views, view-specific arms and rotating tread hubs. Each part has one fixed scale and pivot per view. No whole-chassis scaling/warping, per-frame fitting or largest-component cleanup is performed. Near-transparent source alpha noise is preserved, with alpha8 used only for edge validation. Native outputs: `$MAXEMUM.png`144×192 (48px walk cells), MAXEMUM face576×288 (cell0), MAXEMUM SV864×576 (96px cells). Ground pivots are24,46 for walking and48,94 for battle. KO is the same assembled robot tipped onto its side, not a new image.

`source-crops.json` records9 complete isolated sources. `atlas.json` records all54 SV and12 walking destination cells. Review artifacts include source-overlay.png, each exact frame, both dark/light contacts and an18-motion preview. The portrait is an intentionally framed bust, with complete antenna and shoulders above its authored baseline. Master remains unchanged.

## Verification

Run from repository root:

- `python tools/max-e-mum/pack.py` regenerates only MAX’s production sheets and art review artifacts.
- `python .agent/skills/graphics/scripts/validate_atlas.py art/max-e-mum/source-crops.json --report art/max-e-mum/source-validation.json`
- `python .agent/skills/graphics/scripts/validate_atlas.py art/max-e-mum/atlas.json --report art/max-e-mum/atlas-validation.json`
- `node tools/max-e-mum/test.js`: recruitment/decline/retry, legacy arrays, partial and complete saves, no repeat reset, exact skill effects, message widths, clear-floor native walk/action route, lift exit and reserve Formation.
- `node tools/max-e-mum/battle-test.js`: native Ability menu and ally selection, full Attack and three ability actions, costs/effects,96px frame registration and battle cleanup.
- `node tools/max-e-mum/preview-test.js`: moving canvases,18 motions, loaded assets, responsive desktop/mobile layouts.
- `python tools/max-e-mum/preserve.py`: existing records, System, Timbuc and original Completion Log definitions preserved.
- `python tools/map-placement-audit/audit.py`:251 maps, no suspect people/landings or wall-side flag errors.

Native screenshots are816×624 GameCanvas captures; model and full action evidence is separate in validation.json and battle-validation.json. The game labels engine MP as TP and engine TP as AP; player-facing ability descriptions follow those UI labels. All involved people, entry/return landings, diagnostic stations and furnishing collisions are reviewed through native walking and interaction. No battle-core configuration or shared sprite hooks are changed.

Regression checks cover the nine existing A15 chapters, A20 showroom, A24 cosmetics and Local Completion Log. Their expected totals now include38 optional activities/25 projects. Full campaign playthrough and broad level-to-level balance remain outside these focused checks; MAX’s future mansion scene and other proposed companions are not implemented here.

Walking tread update: the source rubber/grip textures cycle within measured interior belt-face masks for all four directions. Native resting pattern1, chassis/head pixels, silhouette alpha, ground pivot, portrait and battle sheet remain unchanged. See tread-validation.json and tread-frames.png. No new runtime plugin or whole-body deformation.
