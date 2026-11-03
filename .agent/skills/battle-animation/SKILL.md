---
name: battle-animation
description: Create and refine MegaEarth2049 battle animations using RPG Maker MV animation cells, weapon attack skills, and Yanfly action sequences. Use for projectile travel, throwing arcs, beams, attack choreography, impact timing, camera movement, or battle-effect scale and polish.
---

For every atlas extraction, use the shared [atlas-packing workflow](../graphics/references/atlas-packing.md): measured source ownership, crop manifest, transparent-edge validation and inspection of exact runtime cells. Do not use largest-component-only masking to hide neighbouring art.

# Battle animation production

Make attacks feel deliberate and readable at actual game resolution. Use the installed plugins where they add useful choreography; Yanfly Battle Engine Core is an intended option, not forbidden infrastructure. Preserve the game's existing hand-authored effects and custom boss behavior.

## Inspect before choosing an implementation

Read [engine-and-examples.md](references/engine-and-examples.md) for local examples, plugin responsibilities, and current compatibility considerations. Check the actual `js/plugins.js` and relevant plugin source each time: an installed file or a notetag does not establish that its behavior is active. Read [plugins](../plugins/SKILL.md) for notetag versus JavaScript distinctions. Treat live database records and plugin code as authoritative over older skill catalogs.

Trace the requested weapon/skill through its animation ID, notes, active plugin handlers, and sprite assets. Look for an existing related attack before inventing a new renderer. Do not mistake a held weapon image index for an animation ID, or a target-centered impact for a projectile traveling from the actor.

Choose the smallest implementation that delivers the intended motion:
- Native animation cells for authored throws, rotating props, beams, impacts, flashes and sound.
- Existing WeaponSkill for per-weapon Attack behaviors and ally-targeting support weapons; read [weapons](../weapons/SKILL.md) when changing the database.
- Yanfly Battle Engine Core plus the necessary action-sequence packs for staged motion, action/effect timing and camera choreography. Enable and integrate dependencies when the requested implementation needs them; resolve compatibility and verify affected fights rather than simply declining to use Yanfly.
- A focused extension only where the installed stack lacks the needed feature, such as a projectile whose endpoints must track actual battler positions. Pack 2's battler jump is not a generic projectile spawner.

A request to write this skill alone does not enable plugins or alter battles.

## Define a motion contract

Record a compact manifest alongside each implementation: skill/weapon/animation IDs, active renderer and dependencies, asset and cell, launch/impact anchors, intended visible pixel size, flight duration, trajectory/arc height, rotation, impact frame, effect timing, sound, return/recovery and camera reset. Reuse the same values in previews and game data so they cannot drift independently.

Give each attack readable anticipation, execution, impact and recovery as appropriate. Distinguish physical travel from the impact effect. Do not animate every weapon by scaling or wobbling the whole image. Preserve rigid object dimensions during flight; rotation, translation, deliberate perspective and separately drawn effects provide motion. For animated creatures, also apply [mini-boss](../mini-boss/SKILL.md) or [main-boss](../main-boss/SKILL.md): organic deformation is acceptable; mechanical structure must remain consistently registered.

## Dial in scale and trajectory

- Judge scale against an actual actor, target and battle HUD at the game's resolution, not the source atlas or a zoomed preview alone. A small handheld prop should read as handheld; beams and deliberate oversized joke weapons can differ.
- Measure visible artwork inside the cell, including transparent margins. Native MV cells are 192 px; scale is a percentage. Approximate visible width = artwork width inside the cell × cell scale / 100 × any parent/camera scale. Do not treat all 192 pixels as opaque artwork.
- Use a representative normal actor and a large boss to judge placement. For a compact thrown prop, roughly 20–40 visible pixels is a useful starting point here, not a universal limit. The corrected brick uses cell scale 25% with artwork packed inside a 160 px square; its first 65% version was too large.
- Specify launch near the hand/muzzle and impact near the intended target region. Native target-relative animation offsets are not automatically actor-relative. Disclose that limitation; use a launch stage or a tested endpoint-aware implementation when a continuous hand-to-target path matters.
- For a parabolic arc, an optional starting model is `P(t) = (1-t)*start + t*end`, with screen Y reduced by `4*height*t*(1-t)`, for `t` from 0 to 1. Express height and endpoints in the same coordinate space. Tune for the distance; never copy one arc unchanged to every encounter.
- Native MV animation frames normally last four game frames; confirm `Sprite_Animation.setupRate` and active overrides before converting duration to frame counts. At 60 FPS, twelve native animation frames are approximately 0.8 seconds.
- Sample launch, apex, contact and recovery. Check the entire rotated silhouette stays within the screen and clear of essential UI. Returning weapons need an explicit return path; bullets should not use a slow grenade lob by default.
- Use normal alpha blending for solid objects. Reserve additive effects for appropriate light/glow. Avoid large screen flashes or camera zooms that obscure the action.

## Art and atlas integration

Use the available image-generation workflow when creating or repainting raster artwork. Packing generated art into engine cells is separate from generating the art itself. Preserve source masters and reproducible crop coordinates.

Inspect each extracted cell individually on a contrasting background: neighboring streaks, partial props and stray pixels can survive a seemingly correct grid crop. Give rotating props enough padding to avoid clipping. Do not fix contamination by shrinking the entire sheet or chopping off meaningful anatomy. Use an isolated complete prop or correct the source art. Preview the exact packed runtime asset, not only the uncut atlas.

## Sequence timing and plugin integration

Use commands supported by the locally installed versions; read their help and handlers rather than inventing sequence syntax. Separate user motion, launch, flight, target impact, gameplay effect and recovery. Decide whether a miss still shows flight and whether impact effects differ. Apply damage/status once per intended hit; repeated and all-target actions must not accidentally multiply effects.

For Yanfly migrations, snapshot relevant plugin configuration and database records, inspect dependency/load order and aliases shared with `ME_*` plugins, and enable only the needed components. Native animation busy handling and Yanfly action phases have different timing contracts. Prove explicit waits and effect commands behave correctly under the active renderer. Clean up temporary immortality, motion offsets, zoom and camera focus on completion, including death/interruption where applicable. A fallback must be reported, not silently represented as working Yanfly choreography.

## Verify and deliver

Play the full action through the real battle manager, not just `startAnimation` or direct `Game_Action.apply`. Confirm targeting UI, launch direction, scale, arc, rotation, impact location, sound, effect timing, one-time effects and return to input. Inspect normal-speed playback and representative still frames. Use previews for iteration, but an attractive preview alone is not integration proof.

When changing the battle core or shared hooks, exercise ordinary attacks, ally-target actions, misses, multiple targets/repeats, enemy turns, death/victory and encounter callbacks. Also verify existing animated enemies and representative custom bosses, including phase transition and defeat. Inspect the console for errors and stalled waits. Adapt the repository's runtime test harnesses; do not blindly run data-building scripts that append IDs or overwrite approved assets.

Deliver the animation manifest, reusable source/packing steps, working preview, integration locations and validation results. Distinguish rendered-animation checks from complete-action tests and campaign balance testing. For user feedback such as “too big” or “too floaty,” adjust the responsible scale/trajectory values and verify the result in battle; preserve unrelated approved artwork and behavior.
