# MegaEarth2049 — Body modification

Jump to: [Prototype clinic](#prototype-mod-clinic) · [Cosmetic skin](#chromatic-skin)

## Which body modifications are implemented?

Disco Implant133, Third Eye Mod134 and Experimental Neural Enhancer153 calibrate into reversible accessories at four existing clinic counters. Rex also has two reversible chromatic skin finishes. These are bounded services, not permanent limb replacement, general surgery slots, rejection/maintenance simulation or arbitrary body compositing. Temporary combat states are described in [the disease/state FAQ](FAQ_09_Disease_System.md).


## Prototype mod clinic

Available at B.M.N.E.C. reception (Map025), Dorlund triage (Map045), the D Town body-mod technician (Map083), and the existing Mod Center counter (Map099). Recovery services retain their existing prices and behavior.

| Module | Prototype | Calibration | Effects while equipped |
|---|---|---|---|
| Calibrated Disco Implant | Disco Implant133 | 100 Credits | AGI +15%; target rate +20% |
| Calibrated Third Eye | Third Eye Mod134 | 150 Credits | Hit rate +10 percentage points; Blind state rate halved |
| Calibrated Neural Enhancer | Experimental Neural Enhancer153 | 180 Credits | MAT +15%; MP costs +10% |

The counter sells each original prototype for 500 Credits if needed. Calibration consumes one prototype and the stated fee, returning an equippable module. One calibrated copy of each type is allowed per party, counting equipped copies. All three use the existing Accessory slot and Clothing armor permission; no extra implant slots or permanent actor-stat changes.

Fit or remove modules in Equipment. Unequipping removes their traits exactly. Bring an unequipped module back to any counter to recover its original prototype for free. Calibration fees are not refunded. Purchase, calibration and return each have a confirmation/cancel choice and resource/capacity checks. Equipped modules are never seized. Calibrated modules have no resale value.

Third Eye's Underworks bypass accepts the original prototype or its calibrated module, including equipped modules. It does not require equipping just to inspect the duct. No necklace, castle or ending flags are modified.

### Save compatibility and verification

This uses native CommonEvent7, inventory and equipment records. Existing saves keep their old prototypes, party and gear; no migration script or new persistent fields are required. Serialized saves containing the original prototypes were loaded and calibrated; equipped modules survived save/load with identical stats. There is no retrospective fee, grant or surgery applied on load.

Runtime checks cover all three exchanges, cancellation, insufficient money, capacity protection, equipped-item protection, repeat-return duplication, exact native stat changes/reversal, the original ten ordinary actor classes, both calibrated Third Eye access cases, and save roundtrips. Four counters were exercised through their common-event calls; original paid recovery and rejection without funds were verified. The live catalog was rendered and inspected.

Evidence: tools/mod-clinic/validation.json (84 checks), counter-validation.json (7 integration checks), catalog.png. Reproduce with `node tools/mod-clinic/test.js` and `node tools/mod-clinic/test-counters.js`. Original changed files are preserved in tools/mod-clinic/before.zip. No battle-core plugin or new raster art was needed; module icons reuse their approved prototype art.


### Earned Bench Warranty waiver

[Zed's Bench Warranty chapter](FAQ_04_Characters_and_NPCs.md#zed-bench-warranty) awards one calibration-fee waiver usable at all four counters. A valid prototype and no existing copy of the module are still required. The final confirmation displays0 Credits while the waiver is available. Prototype purchases remain500 Credits; cancellation, rejection and returns preserve an unused waiver. It is spent only on a successful calibration, and later calibrations use the standard fees above.


## Chromatic skin

Choose **Chromatic skin: Rex** at B.M.N.E.C. reception (Map025), Dorlund triage (Map045), the D Town technician (Map083), or the Mod Center counter (Map099). Bring Rex conscious in the walking party, using his usual appearance.

| Finish | First unlock | Later fittings |
|---|---|---|
| Original appearance | Free | Free |
| Mint Condition |80 Credits | Free |
| Ultraviolet Liability |120 Credits | Free |

The catalog previews the matching portrait, walking animation and battle sprite. Select a finish to review its price, then confirm; confirmation defaults to Cancel. Browsing or cancelling spends nothing. Unlocks remain owned after switching finishes, restoring the original, or saving/loading. There are no refunds for purchased finishes.

These are green/violet colour coatings with a chromatic projection over Rex’s clothing. They use his existing artwork, including hair and accessories, rather than replacing limbs or changing his silhouette. No stats, equipment, skills, diseases, faction reactions or exploration access change. This reversible service adds no Completion Log activity.

Story disguises and other scripted appearance changes take precedence. Fitting is unavailable during such an appearance; the selected finish resumes once all Rex’s canonical image fields return. Other party members keep their own art.

The three calibrated prototype implants, recovery services, Field Guide and Zed’s local waiver keep their existing behavior. Waiver discounts concern prototype calibration only; chromatic finishes have their own stated prices.

### Rendering and saves

ME_CosmeticSkins applies the engine’s native hue renderer to the original Rex face, character and sideview sheets. Canvas sizes, alpha pixels, source rectangles and native anchors are preserved. The cosmetic service preserves the original art and Rex’s actor record. Load, reservation and request loaders resolve virtual finish names to existing source files, including save thumbnails.

Two optional fields on actor1 store ownership and selection: `_meChromaticOwned` and `_meChromaticStyle`. Saves without them use the original appearance without a fee or migration. No database IDs, switches, variables or maps are added.

[Animated preview](../art/cosmetic-skins/preview.html) · [Implementation and verification](../tools/cosmetic-skins/README.md)
