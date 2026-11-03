# Complete assets and atlas packing

Use this workflow for generated or imported icon atlases, native animation cells, sprite frames and portraits. It addresses two distinct failures: cutting through a subject, and importing pieces of its neighbour.

## Source contract

- Prefer isolated assets or small batches when crowded generated sheets have already failed. Specify cell count/order and ample transparent gutters in the art request. Request full silhouettes, including antennae, tails, cloth, cables, debris, shadows and intended effects.
- Inspect the returned dimensions and actual alpha. A displayed black/checkerboard background does not establish transparency; RGB under alpha zero is not visible background. Never chroma-key or threshold arbitrary colours from production art to guess ownership.
- Generated row/column spacing is provisional. Do not calculate source crops solely as `width/columns` and `height/rows` until every boundary is verified against the artwork. Trace the whole asset in the source, including extensions across a nominal cell.
- Use exact named source rectangles in a manifest. If a complete subject and its neighbour cannot be separated cleanly, obtain a corrected isolated source. Do not trade a clipped cable for a clean-looking cell.

## Packing contract

Each manifest cell records `name`, `source_rect:[x,y,width,height]`, `target_rect:[x,y,width,height]` and `target` PNG. Top-level `source` selects the master; a per-cell `source` may override it. Paths resolve relative to the manifest. Store optional animation `group`, `scale` and `pivot` on each frame, with the matching `animation_groups` contract.

Static icons can use aspect-preserving contain fitting into an allocated cell. Animated character/body frames use their common canvas, scale and anchor; do not independently auto-fit their content bounds. Preserve source alpha and intended separate pieces. Connected-component analysis can suggest ownership for review, but **largest-component-only cleanup is not an acceptable default packer**. It can remove legitimate pieces while leaving the principal silhouette apparently intact.

Leave a transparent margin around the intended complete content in both source crop and runtime cell. Choose margins for the consumer:32px icons generally need at least2 transparent pixels around the fitted silhouette;192px animation cells need more space for rotation/filtering. Declare margins in the manifest; do not shrink below the approved in-game size merely to pass a check. If an effect intentionally fills a cell, use a documented renderer-specific exception and inspect its neighbouring samples.

Run the read-only validator before treating the pack as usable:

```
python .agent/skills/graphics/scripts/validate_atlas.py path/to/crops.json --report path/to/atlas-validation.json
```

Minimal manifest shape (use real measured rectangles, not these example values):

```json
{
  "source":"master.png",
  "alpha_threshold":0,
  "source_margin":8,
  "target_margin":2,
  "cells":[
    {"name":"complete-prop","source_rect":[12,16,180,160],
     "target":"packed.png","target_rect":[0,0,32,32]}
  ]
}
```

The validator checks bounds, nonempty content, declared transparent margins, repeated/overlapping destination cells and optional common animation size/scale/pivot. A cropped-off tip touching an edge must fail, rather than being silently masked or scaled smaller. It never edits images. Its success does not prove correct ownership or anatomy; the visual checks below remain required.

For animated frames, declare a named contract such as `"animation_groups":{"idle":{"frame_size":[192,192],"scale":1,"pivot":[96,176]}}` and record `"group":"idle","scale":1,"pivot":[96,176]` on each corresponding cell. These values document a shared packing transform; the validator cannot measure anatomical drift inside the PNG. Run the validator fixtures after changing the checker: `python .agent/skills/graphics/scripts/test_validate_atlas.py`.

## Visual acceptance before integration

1. Overlay source rectangles on the complete master. Inspect every silhouette and separate piece, particularly cells at row boundaries. Do not assume a passing crop has the correct subject.
2. Render **the exact packed PNG cells** individually and as a labelled contact sheet on both light and dark backgrounds. Do not substitute direct source crops for runtime-cell previews. View icons at32px and at an integer enlargement. Check all cells, not a representative subset.
3. Inspect intended disjoint pieces and all edges. Check for tiny neighbouring crescents, cable tips, glow fragments, missing parts and partial symbols. A cleaner largest component may still be the wrong art.
4. For animation, step through first/last/impact/recovery frames and rotating extents at the actual common scale/pivot. Preserve the mechanical/organic rules in the boss skills.
5. Load the production asset in the actual renderer. Check filtering/bleed, native scale and UI overlap. Integrate only after both automated and visual checks pass; report remaining defects as unfinished work.

After any crop, scale, source or padding change, regenerate the runtime asset, preview it from that asset, rerun validation and revisit the affected cells. Record an actual review artifact/report, not a future-tense promise. Never replace validation with a new approval question when the user already authorized the work.
