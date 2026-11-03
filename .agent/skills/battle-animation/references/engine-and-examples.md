# Local engine references and examples

Paths below are relative to the repository root. This is an audit snapshot from 2026-11-01; recheck live configuration before editing.

## Current runtime and Yanfly options

`js/plugins.js` currently enables `ME_AnimatedEnemies`, `YEP_QuestJournal`, `ME_Boss`, `ME_PoopSprites`, `ME_RemainingBosses`, `ME_Custodians`, `ME_CustodianMapSprites`, `ME_MainBoss`, and `WeaponSkill`. The installed Yanfly battle core/action-sequence files are not currently enabled. Earlier attempts to enable the broader Yanfly stack encountered null-slot/custom-sprite and stalled-battle issues; this is compatibility work to resolve, not a permanent ban on using it.

Read the relevant source files when implementing:
- `js/plugins/YEP_BattleEngineCore.js`: action-sequence phases and battle flow.
- `js/plugins/YEP_X_ActSeqPack1.js`: mechanical action-sequence commands.
- `js/plugins/YEP_X_ActSeqPack2.js`: battler movement, motion, float/jump and visual commands. Requires the core.
- `js/plugins/YEP_X_ActSeqPack3.js`: camera/zoom commands and waits. Requires the core; inspect interaction with Pack 2.
- `js/plugins/SergeofBIBEKActionSequenceProxy.js`: reusable sequences, explicitly placed below the core; not a projectile renderer.
- `js/plugins/YEP_WeaponAnimation.js`: held weapon graphics/motions; inspect dependencies before enabling.
- `js/plugins/WeaponSkill.js`: `<skill_id:N>` selects a weapon's Attack skill. Uses the first equipped weapon. Supports ally/self/all-target skills through native selection. No Yanfly dependency.

Preserve relative ordering required in each file's help, then inspect the custom ME plugins' aliases of `BattleManager`, `Window_BattleLog`, `Sprite_Enemy` and `Sprite_Animation`. Do not assume enabling every installed plugin together is necessary.

## Existing authored animations

Inspect `data/Animations.json` and the corresponding PNGs in `img/animations`:

| IDs | Example | What to learn |
|---|---|---|
| 142 | Toss Grenade | Five authored position/rotation frames for a launch stage |
| 141, 143–145 | Grenade Hit, Flash, Smoke, Poison | Incoming arc/bounce and variant impact sheets |
| 111 | Shoot Normal, Gun1 sheet | Target-centered gunshot effect used by most guns; not a separate traveling bullet |
| 155 | Laser Blast | Lazer Shotgun weapon 39's beam effect |
| 115–116, 123 | Laser One/All, Automatic Gunfire | Existing laser and gunfire effects; check actual references before claiming they are used |
| 176–187 | Weapon-variety animations | Straight shots, arcs, returning invoice, swipes, support effects |

Skill 76 Smoke Bomb's notes contain a user launch animation 142 followed by enemy animation 144. Skill 68 Bulldoze also references launch 142. These are useful hand-authored sequence examples, but their Yanfly commands currently do not execute under the native-only battle stack. Do not copy the inactive notetags and call the result integrated.

`<Weapon Image:141>` is a held-weapon graphic index, not a reference to grenade animation 141. Likewise, `<Weapon Motion:missile>` describes actor motion rather than creating projectile travel. Verify accepted spelling in the installed handler; do not assume old misspellings are supported.

## Native cell schema

`Sprite_Animation` in `js/rpg_sprites.js` reads each cell as:

`[pattern, x, y, scalePercent, rotationDegrees, mirror, opacity, blendMode]`

Sheets have five 192×192 cells across. Patterns 0–99 address the first sheet; patterns 100–199 address the second. Position 0/1/2 anchors at target head/center/feet; position 3 is screen-relative. Mirroring also affects cell position/rotation. Inspect `updatePosition`, `updateCellSprite`, `setupRate` and active overrides when computing coordinates/timing.

In native flow, `Window_BattleLog.startAction` queues motion and animation; battle-manager busy handling waits on animations. Yanfly changes sequencing. Test effects against the actual active lifecycle rather than assuming a fixed delay works in both.

## Working tools to adapt

- `tools/weapon-variety/manifest.json`: weapon/skill/animation associations.
- `tools/weapon-variety/build.py`: one-time database builder, refuses duplicate appends; inspect rather than rerunning for small edits.
- `tools/weapon-variety/pack.js`: generated atlas to IconSet and native animation cells using canvas.
- `tools/weapon-variety/preview.py`: creates `art/weapons/preview.html` from live animation data.
- `tools/weapon-variety/test.js`: database mechanics and native rendered-animation checks.
- `tools/weapon-variety/test-actions.js`: all twelve attacks through battle flow, verifying gameplay effects wait for animations.
- `tools/main-boss/test-main-boss.js`, `tools/main-boss/test-defeat.js`: phase/callback and defeat regressions when shared battle behavior changes.

The current projectile examples use target-relative paths, not dynamic hand-to-target endpoints. A reusable extension should make that distinction explicit in its manifest. Preview generators and test fixtures can contain hard-coded IDs; adapt them to the new encounter.
