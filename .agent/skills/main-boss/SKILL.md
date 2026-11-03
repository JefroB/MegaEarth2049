---
name: main-boss
description: Create or extend MegaEarth2049 main bosses with escalating battle phases, distinct attack animations, phase-gated move sets, and verified RPG Maker MV integration. Use for major phased encounters and their art or mechanics; use mini-boss for simpler encounters.
---

All multi-phase/attack atlases follow the shared [atlas-packing workflow](../graphics/references/atlas-packing.md), including every frame and phase. Edge validation and complete runtime-cell review supplement the common scale/pivot checks.

For battle animation production, projectile arcs, on-screen sizing, impact timing, or Yanfly action-sequence integration, use [battle-animation](../battle-animation/SKILL.md). It covers active-plugin verification and testing against the existing custom boss stack.

# Main boss production

Build on [mini-boss](../mini-boss/SKILL.md). Read that skill for the shared art, encounter, engine and verification requirements; this skill adds phase progression and multiple animated attacks. Honor the requested scope: designing a boss or creating its skill does not imply installing a fight.

## Design an escalating fight

- First read `docs/story/STORY_PROGRESSION.md` and the relevant existing story/quest sections. State the encounter's role: regional main boss or explicitly requested final encounter. Prefer existing story antagonists, conflicts and locations; adapt modestly and record changes. Do not promote a new regional boss into the finale or bypass existing prerequisites. The Underwriter belongs to Dorlund on Planet Ork. The future finale returns to Map001, traverses the floating castle and ends with two consecutive bosses; their identities and handoff rules remain to be designed from the existing story.

- Establish the boss's story role, dungeon location, intended party capabilities, and victory consequence. Read [theme-and-story](../theme-and-story/SKILL.md) for new lore. Preserve the established world, corporate disillusionment and grotesque comedy appropriate to the particular boss.
- Default to two irreversible phases: an introductory move set above 50% maximum HP, then an expanded move set at or below 50%. Treat this as an HP midpoint, not half the elapsed battle time. Use different thresholds, additional phases or scripted triggers when the encounter calls for them, and record the choice.
- The first phase teaches recognizable threats and responses. The second retains useful learned responses while introducing attacks and animations unavailable in phase one. Escalation must change decisions, not only increase damage or playback speed. Avoid forcing every boss into the custodians' three-turn cycle.
- Give each significant attack a recognizable anticipation, execution and recovery sequence. Design several distinct attack motions appropriate to the creature: for example a strike, projectile launch, area discharge, summon or channel. These are examples, not a required roster. A palette swap or whole-body warp does not establish a distinct attack animation.
- List exactly which attacks are allowed in each phase, their selection rules, costs/cooldowns, warning, counterplay, impact timing and recovery. Include explicit second-phase-only attacks. Plan a fair opportunity to encounter the new attacks rather than relying entirely on low-probability random selection.

Read [phase-and-animation-contract.md](references/phase-and-animation-contract.md) when designing or implementing the phase state machine, attack manifest and transition tests.

## Art for multiple attacks

- Apply the mini-boss [art-registration requirements](../mini-boss/references/art-registration.md). Mechanical geometry stays rigid and consistently registered; organic bodies may move fluidly. Mixed creatures preserve hardware while tissue deforms intentionally.
- Start from a complete master with visible, coherent anatomy. Account for every limb, held object, attachment and projectile in each pose. An actually missing arm needs an art correction, not a crop adjustment.
- Define named animation sequences per attack, plus idle, phase transition, hit/interruption, recovery and defeat where the encounter uses them. Frame counts and durations follow the motion; do not force every attack into the same four poses.
- Separate battle phase, cosmetic damage state and animation state. A second-phase move can unlock without a new body skin. If the body transforms, register the new artwork deliberately and make it readable without arbitrarily resizing the boss.
- Preload every phase's assets before combat. Keep one common intended scale and explicit anchors across sequences. Allow extra canvas room for reach; do not normalize each pose's silhouette to a fixed box.
- Review attack-specific props and occlusion. Do not draw a register, wheel, hand or receipt twice over artwork that already contains it. Check full projectile trajectories and atlas boundaries, including recovery and idle loops, for neighboring-frame bleed.
- Provide a preview using the production renderer, with phase selection, named attack selection, play/pause and frame stepping. Show which moves are locked in phase one while allowing an explicit inspection mode to review their art. Inspect at battle size and enlarged size.

## Implement in the actual engine

Read the mini-boss [project integration reference](../mini-boss/references/project-integration.md) and inspect live enabled plugins. `ME_Boss` and `ME_Custodians` contain encounter-specific logic; neither is evidence of an existing general multi-attack phase API. Extend or introduce a narrowly scoped opt-in controller when needed. Do not rewrite accepted encounters or ordinary enemies to fit the new boss.

Use stable attack identifiers to connect selection, warnings, animation and damage. Drive impact and transitions through the engine action queue, not wall-clock timers or preview-only code. Preserve native targeting, restrictions, victory and defeat processing. Integrate narrative dialogue or singing through native battle events where suitable, without repeating transition dialogue on every action.

## Acceptance and delivery

- Prove phase-one selection cannot execute or show second-phase-only attacks, including queued and forced actions. Demonstrate each new move in phase two with meaningful counterplay.
- Test threshold crossing, queued attacks, interruption, death during transition, healing after transition, multiple actions and a fresh retry. Verify transition happens once and never grants a surprise untelegraphed attack.
- Visually inspect all sequence boundaries, anatomy, props, effects and the phase transition in the enabled in-game renderer. Source bounds and anchor tests alone do not establish good animation or pixel-perfect mechanics.
- Run native battle input tests and actual map outcome callbacks when implementing a complete encounter. Verify victory rewards once, intended retreat/defeat behavior and surrounding paths. Preserve main-story ending requirements.
- Deliver the phase/attack manifest, assets, relevant plugin/database changes, review preview and reproducible evidence appropriate to scope. Distinguish technical verification from full campaign balance testing. Record remaining art or mechanics limitations honestly.
