---
name: mini-boss
description: Create or extend MegaEarth2049 minibosses and bosses, including consistent animated artwork, telegraphed mechanics, ME_Boss integration, encounters, and in-game verification. Use for repeating the miniboss production workflow or fixing boss animation consistency; not ordinary enemy database edits.
---

Before packing frames, follow the shared [atlas-packing workflow](../graphics/references/atlas-packing.md). Validate complete source crops and runtime gutters; preserve common registration and intended disconnected anatomy/props.

For battle animation production, projectile arcs, on-screen sizing, impact timing, or Yanfly action-sequence integration, use [battle-animation](../battle-animation/SKILL.md). It covers active-plugin verification and testing against the existing custom boss stack.

# Miniboss production

Build a readable, playable encounter that fits MegaEarth2049's absurd corporate world and RPG Maker MV. Match the requested scope: concept discussion, art-only, animation, plugin integration, or complete encounter. Do not install encounters when only art or ideas were requested.

Choose animation constraints by material: **mechanical bosses require pixel-perfect rigid geometry and registration; organic bosses may animate their bodies fluidly**, including deliberate breathing, squash/stretch, recoil and deformation. Organic motion must remain coherent and intentional, rather than accidental frame-to-frame redesign or scale drift. For mixed creatures, preserve rigid mechanical parts while allowing organic tissue to deform. Current bosses, including Repossessor and the rebuilt poop enemies, are accepted as-is; this guidance applies moving forward and is not a request to revise them.

## Establish the encounter

- Read `docs/story/STORY_PROGRESSION.md` and the relevant existing storyline and live quest events before adding lore or gates. Fit minibosses into established conflicts and locations; modest changes are allowed, but new sidequests must not silently replace the Necklace/A.S.P. progression. Regional/main/final boss roles are distinct. Sidequest rewards and service corridors must not bypass the confirmed return to Map001, floating-castle traversal and two-boss finale.

- Inspect the current world/quest location, actual enabled `js/plugins.js`, and relevant engine methods. Older project skill catalogs and enemy notetags can refer to inactive plugins; they are not evidence that functionality exists.
- Pick a concrete telegraph, a useful response, and a visible consequence. Prefer a small, readable move set for a proof of concept. Different bosses need not reuse the Repossessor's clamp mechanics or four-frame count.
- Define when a marked attack resolves, what interrupts it, what happens if its target dies, and what changes between phases. A countdown must give the intended characters a real response opportunity under the game's turn order.
- Read `../theme-and-story/SKILL.md` for new lore. For implementation, consult the relevant enemy, troop, skill, event, system and plugin skills, then verify command semantics against the local engine.

## Art and animation: define rigid and deforming regions

Read [art-registration.md](references/art-registration.md) before generating or modifying animation assets. Its acceptance checks are required for new animated bosses.

1. Inspect real battle backgrounds, party sprites and enemies at game resolution. Match their camera, facing, outline and shading. Here, "pixel-perfect" means stable raster geometry and registration; it does not require turning the game's painted battlers into a different pixel-art style.
2. Establish one master design, fixed working canvas and base runtime scale, camera, contact points and pivots. Identify mechanical/rigid regions and organic/deforming regions before animating; document intended deformation and contact changes.
3. Prefer a cohesive complete-character master. Reusable parts suit mechanical articulation when joints look natural; organic creatures may use fluid drawn poses or controlled deformation. Do not force organics into rigid cutout animation. Independently generated poses can accidentally redesign anatomy; a generated atlas remains a draft until reviewed.
4. Keep mechanical dimensions and regions designated stationary unchanged. Organic body motion may intentionally alter contours and proportions through breathing, squash/stretch or recoil; judge continuity, recognizable anatomy and convincing volume rather than identical body pixels. Do not use warping to disguise inconsistent source drawings. Preserve contacts meant to be planted, while allowing intentional steps, jumps and perspective changes.
5. Match normal and damaged phases to the same registration. Damage may remove armor or reveal machinery; it must not arbitrarily enlarge the chassis or shift the feet. Compare the same pose across phases.
6. Do not independently crop and resize each frame to fill its cell or fit a bounding box. An extended arm naturally changes the silhouette's bounds; normalizing those bounds makes the body pulse in size. Fix drifting artwork rather than hiding it with per-frame scale changes.
7. Use the available image-generation skill for generated raster artwork. Follow its tool/editing requirements; do not silently substitute a code raster-editing pipeline. Runtime frame selection and transforms belong in the renderer. If precise art corrections require a workflow the tools cannot deliver, report the remaining limitation instead of claiming pixel-perfect output.

## Verification before integration

- Review a loop with pause, frame stepping and phase switching at **actual game size** and enlarged size. Use a fixed ground guide, same-pose phase toggles, and overlays/differences of regions intended to remain still.
- Check several landmarks: both planted contacts when applicable, hip/shoulder separation, torso width, head dimensions, and rigid limb lengths. A matching bottom pixel proves registration only; it does **not** prove stable scale or anatomy.
- Verify alpha, complete silhouettes, atlas gutters, source rectangles, phase parity and no neighboring-frame bleed. Store crop rectangles, pivot/anchor data, common scale and timings in a manifest or the plugin definition; do not leave them only in prose.
- For mechanical parts, treat pulsing dimensions or geometry drift as failures. For organics, accept intentional fluid deformation and breathing; reject unexplained size changes, disconnected anatomy or incoherent volume. For both, reject unintended sliding, jitter and phase jumps. Report measured tolerances honestly; an anchor-only check does not prove mechanical pixel-perfectness.

## Plugin and encounter integration

Read [project-integration.md](references/project-integration.md) when implementing game behavior.

- Extend the existing `ME_Boss` architecture where appropriate, preserving ordinary enemies. Inspect which behavior is truly configurable before assuming a new definition is sufficient.
- Drive animation from battle state and the action queue: anticipation before damage, impact at resolution, interruption visibly cancels the attack, and phase state changes only once. Preload phase assets. Preserve stable scale/anchors in the actual sprite renderer, not only the art preview.
- Allocate database IDs against live data and document them. Do not copy example IDs or overwrite earlier work by republishing an old generator snapshot.
- Preserve existing quest paths and NPC access. Set victory flags and repeat prevention only after victory. Implement the requested retreat/defeat policy; recovery after defeat is a Repossessor design choice, not a universal boss rule.
- Keep temporary encounter commands temporary. Test their enablement, target selection and cancellation. Fit telegraphs and instructions in the real game font and viewport.

## Finish with evidence

Test the real game with enabled plugins: timing, interrupts including queued attacks, phase transitions, invalid/dead targets, victory, escape/defeat policy, repeat rewards, existing enemy behavior and surrounding-map access. Use a controlled party so auto-battlers do not accidentally invalidate the intended test. Capture UI only after windows finish opening; verify real command input separately from direct test calls.

Deliver the assets/manifest, plugin and data changes appropriate to scope, reproducible checks, and a short explanation of where to find the encounter. Distinguish source artwork, preview-only animation, installed behavior and playtest balance. Never label artwork pixel-perfect solely because dimensions match or an anchor test passes.
