# Repossessor boss prototype

Plugin: `js/plugins/ME_Boss.js` (enabled after the existing journal plugin).

## Play

Enter the Warranty Intestine from the Workshop (Map108), then find **Returns Labyrinth, Room5: Warranty Stores (Map138)**. Activate the enforcement console and choose Challenge. This is optional and does not gate the repair quest. Escape leaves it available; defeat restores the party at the console; victory permanently deactivates it and awards 250 EXP and 400 credits once.

## Fight rules

1. Identify Collateral marks one living party member.
2. A full following round is reserved for responses. The party can use the temporary **Jam Scanner** command, land two damaging hits, or have the marked actor Guard.
3. The clamp resolves on the subsequent round with very low speed. Its wind-up drawing precedes damage; strike and recovery drawings follow in sequence.
4. Interrupting cancels even an already queued clamp and exposes the machine to 50% extra damage through the next round.
5. At 50% HP, the boss permanently changes to damaged art and a stronger clamp formula. The warning interval remains unchanged. A dead marked target is not silently replaced.

Jam Scanner is encounter-only, costs an action, and does not permanently modify actor skills. This first encounter prioritizes proving readable mechanics and animation; difficulty and rewards may need tuning through player testing.

## Assets and extension

`img/bosses/RepossessorNormal.png` and `RepossessorDamaged.png` are four-pose transparent atlases. The plugin reads rectangles and per-phase planted-foot anchors directly, at 0.62 scale. No image warping is used. Idle/charge/strike/recovery map to frame indices 0/1/2/3. Atlas definitions and skill IDs live in `ME_Boss.definitions`. Tag an enemy `<ME_Boss: Repossessor>` to opt in. The encounter HUD supports one displayed boss; ordinary enemies retain native rendering and commands.

IDs: Enemy142, Troop51, Skills151–155, Switch167, Map138 enforcement event. `manifest.json` records them. The switch and the event self-switch are only set on victory. Native enemy death/collapse and normal engine victory/escape handling remain in use.

`install_boss.py` installs database entries against `before-boss.zip`, refuses unexpected edits, and enables the plugin. Earlier world/dungeon/maze generators predate this encounter; do not republish their snapshots over it.

## Verification

`node tools/bosses/test_boss.js` boots the real game in Chrome with all enabled plugins, tests marked charge timing and an actual clamp, interruption paths, damaged phase, target invalidation, command cancellation and both atlases. It also exercises the actual map-event escape, defeat and victory callbacks and checks that the defeated event cannot start another reward-bearing battle. The test intercepts local game file requests without an external service. Results: `validation.json`; screenshots: `normal-battle.png`, `damaged-battle.png`. Browser tests use an explicitly configured level8 party; they are not a general balance certification.
