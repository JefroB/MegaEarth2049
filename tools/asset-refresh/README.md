# Asset refresh, 2026-11-01

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
