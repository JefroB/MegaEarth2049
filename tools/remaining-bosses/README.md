# Remaining legacy minibosses

Installed on 2026-11-01 using the `mini-boss`, graphics/image-generation, enemy, troop, skill, item and map guidance. Source prompts are saved in `art/bosses/remaining-v2/PROMPTS.md`; built-in image generation supplied the three complete master images. The previous detached-part drafts and `ME_LegacyBosses` remain disabled.

## Installed encounters

- Enemies78–82: Giant Spider, Brown Recluse, Huge Spider, Massive Spider and Icky Spider. One complete illustrated spider master supplies five fixed color/size variants. Intentional organic breathing, anticipation crouch, forward strike and recovery use the same master. Stats, attacks, drops, troop compositions and key rewards are preserved. Their key-guardian encounters remain in Maps17–20/32, and the existing spiders accompanying PunkBoss in Map16 use the new art. PunkBoss itself is untouched.
- Enemy143 / Troop52: SEAM-3000 at Pants-O-Rama in Timbuc2 (Map002, events23/26 at15,8). A complete industrial sewing-press illustration replaces the ninja placeholder. One master supplies the chassis and folded cloth together. The body raster and transform stay fixed; a continuous cloth mesh within the same image feeds the loose folds forward during attacks, and the optic changes brightness. No separate cloth artwork is loaded. See art/bosses/remaining-v2/SEAM-REDESIGN.md. Skill156 is Mandatory Hemming with the native piercing animation. 360HP and three attacks per round approximate the three originally visible ninja enemies; hidden ninjas never entered the original fight. The attack stat is their rounded-down average (24). Original aggregate visible-enemy experience/gold is preserved.
- Enemy144 / Troop53: malfunctioning A.S.P. drone in Alien Craft (Map030, runtime events1/2 at8,15). Complete drone art replaces the bat placeholder. Two clipped fan interiors rotate and its optical core brightens; shell dimensions, placement and silhouette remain fixed. Skill157 is Security Pulse with the native laser animation. First-pass miniboss tuning:250HP,35EXP,20gold; other base stats come from the old placeholder. This intentionally gives the encounter more durability than its original25HP bat.

Both machines retain the original no-escape, recover-after-defeat policy. Their anticipation is a short visual windup before native action resolution, not a promised interrupt round. No new statuses or interruption mechanics are introduced. Tuning has been functionally tested with a controlled level8 party; campaign difficulty still needs normal player playtesting.

## Quest fixes

SEAM's item137 was an empty database slot, so the old event could not award its module. Restored it as the SEAM-3000 Control Module key item, and moved the grant to the victory branch. Defeat awards none. The drone keeps item130 Engine Component B. Both duplicated entrances now share completion; the plugin also synchronizes a previously completed entrance on map refresh for old saves. It does not grant extra replacement items to old saves that already completed the event.

Map030's legacy event at array slot1 has serialized id0. MV constructs it as runtime event1; the new shared self-switch commands use runtime IDs1/2. The original serialized ID is preserved. No terrain, transfers or unrelated map events changed. No new global switches are allocated.

## Renderer and art contract

`js/plugins/ME_RemainingBosses.js` is enabled after `ME_PoopSprites`. Its pure `ME_RemainingArt` definitions and draw function are shared by the preview and battle bitmap renderer. All crop-free source dimensions, origins, fixed base scales, canvas sizes, color variants and moving optic/fan regions live there. Mechanical body images are reused unchanged in every pose; no independently generated pose sheets or per-frame bounding-box resizing. Native bitmap damage flashes, enemy selection, animations and collapse remain available. Existing Repossessor and poop plugins/art are unchanged.

`art/bosses/remaining-v2/preview.html` provides pause, pose stepping, variant selection and1×/2× inspection. Runtime masters are copied to `img/bosses/remaining-v2`.

## Verification

- `node tools/remaining-bosses/test-art.js`: readback comparisons across all mechanical poses; changed pixels must remain inside the optic/fan/fabric regions. Canvas CPU readback is selected explicitly to avoid differing GPU/software resampling paths during the measurement. This checks the body raster rather than only the floor anchor.
- `python tools/remaining-bosses/test-data.py`: compare the live database/map data against the backup and protected asset hashes. Existing records and terrain are preserved, with only five spider opt-in notes, the restored item137 and selected machine event command lists changing.
- `node tools/remaining-bosses/test-battle.js`: boots the real game with enabled plugins, drives party-command input, executes native full turns for troops41/43/44/45/46/52/53, checks action-synchronized poses, tests both machines' real event defeat/victory callbacks and one-time rewards, both entrance pages and old-save flag synchronization. Reports and screenshots are in this directory. `EVENTS_ONLY=1` may be used for a focused callback diagnostic; a complete report includes all seven round records.
- Existing `node tools/bosses/test_boss.js` and `node tools/legacy-bosses/test-poop-battle.js` provide regressions for the accepted bosses, including Repossessor response windows/interrupts and poop reinforcement waves.

`before-remaining-v2.zip` contains the exact pre-change live database/map/plugin files, including the prior Items database. The installer refuses to overwrite it or reinstall. Do not republish the earlier world/dungeon generators or the rejected legacy installer to deploy these changes.
