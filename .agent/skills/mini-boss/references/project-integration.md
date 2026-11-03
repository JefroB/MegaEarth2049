# Existing project implementation

Read these live files rather than reproducing their current content from memory:

- `js/plugins/ME_Boss.js`: native MV hooks, atlas definitions, per-phase anchors, target mark, hit/jam interruption, exposure, phase threshold, temporary command, HUD and action-log animation timing.
- `js/plugins.js`: actual enabled plugins. Installed files and historical YEP notetags do not imply activation.
- `tools/bosses/README.md`, `manifest.json`, `install_boss.py`: Repossessor setup, IDs, optional encounter, backup and overwrite checks.
- `tools/bosses/test_boss.js`: browser integration checks for response rounds, a real animated attack, interrupts, phase state, target invalidation, command cancellation, map-event outcomes and repeat prevention.
- `tools/bosses/test_commands.js`: fully opened command-menu checks.
- `art/bosses/repossessor/animation-preview.html`: phase toggle and stepped preview; this is the accepted prototype, not a pixel-perfect master to impose on new bosses.
- `.agent/skills/system/SKILL.md` and `docs/reference/database/MegaEarth2049_Quest_Switch_Documentation.md`: ID reservations; cross-check current database arrays before allocating.

Paths above are relative to the game repository root. This skill lives at `.agent/skills/mini-boss/`.

## Reuse carefully

The Repossessor definition configures atlas images, scale, phase threshold, hit count and skill IDs. Its behavior is still a specific scan/charge/clamp/recovery loop. Damage formulas, HUD language and some messages are tailored to that encounter. A different mechanic may require extending the plugin's behavior interface and UI, not merely adding another definition.

The current HUD selects one living boss for display. Multi-boss encounters require deliberate HUD and command-targeting work. Current interruption uses a damaging-hit counter or its encounter-specific jam skill; do not assume every future boss should expose the same counterplay.

The prototype uses a fixed common scale with explicit per-frame anchors, but the generated artwork retains some contour/geometry differences. The user has accepted leaving it unchanged. New assets must satisfy the stronger registration and size checks in this skill.

## Regression lessons

- Test expected response windows with a controlled party. The game's auto-controlled Pink Ninja can attack twice and interrupt a charge while a test is trying to observe it.
- Drive real menu input or deactivate windows appropriately in automation; directly invoking command handlers can leave input windows active and stall battle processing. Do not modify production engine behavior to compensate for a broken test harness.
- Wait for command windows to be fully open before taking screenshots. MV can display their frame before their text, creating a misleading empty-box image.
- Actual game fonts can overflow with text that looked short in source. Inspect the HUD, battle log and map dialogue in-game.
- Test escape, defeat and victory through the actual map event callback. A successful isolated enemy kill does not prove rewards, switches or replay prevention work.
- The staged world/dungeon/maze generators precede the boss encounter. Rebuilding an older snapshot can remove later work. Preserve current live edits and reconcile before publishing.
