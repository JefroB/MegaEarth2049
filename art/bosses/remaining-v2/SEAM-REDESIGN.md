# SEAM-3000 sewing animation v5

Installed in ME_RemainingBosses.js and the shared review page. Source/runtime atlas: seam-cycle-v5.png (1462 x 1076, RGBA; four 731 x 538 cells). The generated atlas is a component source, not four interchangeable chassis frames: generated stationary geometry drifts slightly.

The renderer keeps the first chassis at origin [377,520], common scale 0.30, bitmap 360 x 185. It excludes the original needle and cloth, then composites a complete battler. The wheel interior rotates from the same source ellipse (151,207; radii 103,110), with its external mounting fixed. The original needle assembly translates vertically through a 34-source-pixel stroke. Its exposed telescoping shaft length changes with travel. Neither the chassis nor needle assembly is rescaled between poses.

Four individually painted cloth silhouettes feed from under the needle and form progressively longer folds. The renderer clips them using explicit polygons in R.seamCloth. There is no cloth mesh stretch and no detached rectangular strip. Cloth/frame changes occur every seven animation ticks during the attack, then hold the last fold until recovery. Returning to idle resets the cloth to its short starting pose; this is a discrete attack cycle, not a persistent fabric simulation.

Travelling warm highlights follow the red thread from spool to guide and from guide to the moving needle. They imply thread transport without changing its thickness. Motion is visible principally during the attack; idle is stationary. The preview has a Next sewing frame control.

Validation: node tools/remaining-bosses/test-art.js samples anticipation, multiple attack times, and recovery; zero changed pixels outside the declared moving regions for SEAM and drone. This is a stationary-region check, not proof that generated cloth texture is identical between drawings. Enlarged four-pose inspection: tools/remaining-bosses/seam-v5-review.png. SEAM_ONLY=1 node tools/remaining-bosses/test-battle.js passed a native three-action turn, victory/defeat rewards, duplicate entrance flags, and old-save synchronization. Other enemies and encounter data were not changed.
