# A24 — reversible Rex chromatic finishes

Runtime: `js/plugins/ME_CosmeticSkins.js`. Four existing clinic choice lists expose a shared native fitting scene. See [player guide](../../GameFAQs/FAQ_11_Body_Modification_System.md#chromatic-skin).

`install.py` is a one-time installer, already applied. It refuses an existing `before.zip`; do not rerun or remove that snapshot to force a second installation. `before.zip` preserves all four original maps, plugin configuration and actor database.

Production uses original Rex sheets through native hue rendering. Virtual names are resolved in ImageManager load/reserve/request paths. Canonical raw actor image fields remain untouched, allowing story overrides to take precedence. Matching portrait, walk and SV getters apply only to actor1. Literal Rex event portraits follow the effective finish. Optional actor fields persist natively through JsonEx. A new/old save without them remains original.

`manifest.json` records source hashes, native geometry, used cells and service entry indices. `art/cosmetic-skins/runtime` contains diagnostic exports from the real renderer for the standalone animation preview; these are not replacement game assets. Full-sheet alpha comparison verifies all12 walk frames and54 SV cells, preserving original geometry rather than individually cropping frames.

Run from repository root:

- `node tools/cosmetic-skins/test.js`:35 state, loading, pixel and native clinic UI checks; exports review PNGs, validation.json and pixel-validation.json.
- `node tools/cosmetic-skins/battle-test.js`: three native battles, actual Attack completion,64×64 sprite cells and scale1, supported aliases, no missing files or page errors.
- `node tools/cosmetic-skins/preview-test.js`:18 selectable battle motions, moving canvas frames, loaded artwork and responsive1200/360px layouts.
- `python tools/cosmetic-skins/preserve.py`: original map content/services/cancel indices, actor database, existing plugin configuration and source art hashes.
- `node tools/mod-clinic/test.js`:84 existing calibration checks.
- `node tools/jen-story/test.js`:78 existing care/consent checks.
- `node tools/zed-story/test.js`:58 existing bench/waiver checks and native flow.

Native UI screenshots use the816×624 GameCanvas. Map099 catalog entry is reached by the floor-aware walking/action helper from verified floor(7,6). No actor/event placement, tile flags or map geometry changes are part of A24. Other three clinic entry lists are also exercised. Catalog, confirmation and battle screenshots were visually inspected. Completion Log remains37.
