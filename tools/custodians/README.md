# Custodian miniboss production

Six enemies and six native combat troops are installed. Their artwork is generated using the built-in image_gen tool; master prompts are in art/bosses/custodians/prompts.json; revised action prompts are in action-pose-prompts.json beside it. Original generated PNGs were copied without raster edits. The rejected soft-tissue warp renderer was replaced by four illustrated poses per organic boss, plus a rigid mechanical rig for the Widow. No independent per-frame resizing is used.

## Installed records

| Enemy | Enemy ID | Troop ID | Skills |
|---|---:|---:|---|
| Chief Compliance Orifice | 145 | 54 | 158-160 |
| The Deductible Duke | 146 | 55 | 161-163 |
| Postmaster Septic | 147 | 56 | 164-166 |
| Admiral Clap | 148 | 57 | 167-169 |
| REMployee of the Month | 149 | 58 | 170-172 |
| The Ticket Widow | 150 | 59 | 173-175 |

Parcel Fever (state 47) is a fictional two-turn, 3% maximum-HP degeneration effect, removed after battle. Existing STD label states were not repurposed or modified. Balance is an initial implementation, not a full campaign balance pass.

## Animation contract

Current source rectangles, per-pose anchors and common scales are recorded in art/bosses/custodians/action-registration.json and ME_Custodians.js. The original master registration.json is retained as source history. Every pose uses the same scale; different reach is handled by explicit source rectangles and overflow strips, not shrinking a pose to fit a cell. Some atlases place attack reach outside the nominal grid, so do not blindly split them into equal quadrants.

Compliance raises and slams its stamp. Duke raises and points its pen. Septic winds up and throws an envelope. Clap gestures, sings and blasts pressure. REM lifts its mug, opens its mouths, then recoils. These are discrete complete-character illustrated poses, not mesh warps. The registrar desk and REM pedestal reuse fixed artwork, while Duke uses the register and receipt drawn together in each pose; the duplicate rectangular overlay was removed. Clap uses the wheel and occluding hand drawn together in each pose; a duplicate rotating overlay was removed. Organic silhouettes change with the deliberate actions; generated poses retain some illustrative variation and are not claimed to be pixel-identical anatomical drawings.

Widow uses the same chassis raster throughout, with two lower legs rotating at fixed knee pivots, a turning valve, and a furnace glow. No mechanical limb scales or stretches. Normal and low-HP modes currently use the same four poses; there is no separate damaged-art phase or recorded vocals. Runtime still passes phase information for future art integration.

The three singers use native troop Show Text pages: opening once, alternating couplets on turns 2+4X and 4+4X. Text waits for player input. Victory couplets run in the installed map victory branches; last-enemy death is not used as a troop-page trigger.

## Combat

Every boss spends one round warning, executes its signature the following round, and spends the third round recovering. The native action queue plays anticipation before impact. A warning that never executes cannot arm the next strike; an unused charge expires after its due round. Standard restriction/death/target selection remains native. No custom party commands or boss HUD are added.

The existing Repossessor plugin has encounter-specific scan/jam/clamp logic. This opt-in renderer and simple cycle intentionally coexist with it rather than changing those accepted mechanics. ME_Custodians is enabled after the other ME plugins. Ordinary enemies are unaffected.

## Dungeon integration

All six encounters are installed. Recovery-room access hatches open after the local evidence is recovered (or its quest is completed). Victory awards a mandate and credits once and unlocks a local service annex. Retreat and recoverable defeat preserve access to the return route. See tools/custodian-placement/README.md for locations and validation.

The shared junction is on MegaEarth, reached through the Repair or Wake annex. Credentials from other planets travel with the party using existing planetary travel. All six authorize the Core service vestibule. The inner Core and final confrontation remain main-story work; this extension does not choose an ending.

## Validation

- node tools/custodians/test-art.js: all six change pose; source rectangles stay in bounds and the sampled fixed desk/pedestal regions remain identical. This is not a claim that every generated anatomical contour is invariant.
- node tools/custodians/test-battle.js: live Chrome/engine tests of three rounds per enemy, real command menu input, sprite integration, native singing cadence, missing-warning selection and charge expiry. See battle-validation.json for the actual outcome.
- node tools/miniboss-stories/test_song_pages.js and test_stories.js: native text pages and story dialogue checks.

Backup: before-custodians.zip. install.py refuses to republish an already installed set. Never rebuild old world/maze snapshots over these records.

- node tools/custodians/test-outcomes.js: native victory, recoverable defeat and escape callbacks for all six troops; see outcome-validation.json. These are isolated troop outcomes, not yet map quest reward tests.

Animation correction v6: removed Duke's duplicate rectangular register/receipt overlay; the chest now uses each complete illustrated pose. Septic recovery excludes the 76x215 attack-overflow region, while the throw retains its extension. test-overlap.js covers Septic alongside Duke, Clap and REM. This removes compositing artifacts, but does not claim identical mechanical geometry across the generated Duke poses.

Septic idle correction v7: Septic-idle-corrected.png supplies only frame0 at the existing scale, rectangle and anchor. His missing anatomical right forearm/hand is drawn in the source. Frames1–3 still use the original atlas and existing letter-overflow exclusions. Preview and native renderer preload the corrected idle source. Verification: test-art.js, test-overlap.js, test-septic-idle.js.
