# Bounded additions production record

Scope: A13/A16/A19/A21/A22. See `GameFAQs/FAQ_07_Secrets_and_Easter_Eggs.md#off-clock-collections-and-salvage` for locations and player behavior; `manifest.json` contains the exact IDs and event sources.

`build.py` is the original append-only builder, protected by expected database lengths and an exclusive `before.zip` snapshot. **Do not rerun it against the finished project.** `Armors-before-outfits.json` separately preserves the four costume records' source database.

## Reproducible finishing and checks

From the repository root:

```
python -X utf8 tools/bounded-additions/finalize.py
node tools/bounded-additions/pack-v2.js
python -X utf8 .agent/skills/graphics/scripts/validate_atlas.py tools/bounded-additions/crops-v2.json --report tools/bounded-additions/source-validation.json
python -X utf8 .agent/skills/graphics/scripts/validate_atlas.py tools/bounded-additions/runtime-cells.json --report tools/bounded-additions/atlas-validation.json
node tools/bounded-additions/review.js
node tools/bounded-additions/test.js
node tools/bounded-additions/visual.js
```

`finalize.py` is idempotent; it maintains pack-capacity guards, wearable costume types and bounded scrapbook prose. `pack.js` is a compatibility entry point for `pack-v2.js`; the retired grid/component-mask implementation has been removed. Packing never deletes disjoint pieces, keys colors or thresholds production pixels. `art-crops.json` and `atlas-source.png` are historical v1 evidence only; the authoritative manifest is `crops-v2.json`.

Review each `source-*-v2-boundaries.png` and `art/bounded/icons.png` after repacking. Runtime validation checks alpha0 padding. The source margin test's explicit alpha20 tolerance ignores faint antialias residue for measurement only; the packer preserves every source pixel inside each measured rectangle. Geometry checks cannot certify complete anatomy or ownership, so keep visual review mandatory.

## Generated artwork

Built-in image generation produced three transparent4×2 master batches, copied into `art/bounded/source-salvage-v2.png`, `source-collection-v2.png` and `source-status-v2.png`. Prompt set: chunky outlined cyberpunk pixel-art icons, no text/backdrop, complete centered silhouettes, wide transparent gutters, compact local effects; groups respectively salvage parts/joke cards, off-clock books/letter/state symbols, and remedies/control/removal/recycling symbols. Exact final crop and placement rectangles are in `crops-v2.json`. The original crowded v1 sheet is retained as discarded source evidence and is not sampled by the runtime packer.

No runtime plugin was added. `ME_FieldGuide.js` only registers the three new native states in its public categories. New data, events and native animations use the already active engine stack. Test saves are in-memory fixtures; no user save files are modified.
