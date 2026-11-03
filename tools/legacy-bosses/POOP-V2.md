# Poopoo Caca rebuild — 2026-11-01

Approved complete-character design replaces the rejected detached-part draft. Installed `ME_PoopSprites` after existing plugins; only enemies 115 and 116 opt in. Enemy stats, actions, drops, troop members, reinforcement event pages and quest outcomes are unchanged. PunkBoss and Repossessor remain unchanged.

Runtime source images are in `img/bosses/poop-v2`. Master images, generation prompts, shared preview renderer and review are in `art/bosses/poop-v2`. The boss keeps one immutable body image; two clipped eye interiors use the generated blink art. Native battle actions trigger a 24-frame, nine-pixel minion hop without scaling. Idle minions remain grounded. Native battle damage flashes and collapse use the complete bitmap normally.

The minion's apparent glow in the generation display is alpha-zero outside the silhouette, verified against a solid game-size preview. The attempted cleanup regenerated its size and was discarded. No per-frame bounding-box resizing is used. Actual blink comparison: 2,099 changed pixels within eye region; zero changed pixels outside it at runtime scale.

Checks: `node tools/legacy-bosses/test-poop-preview.js` and `node tools/legacy-bosses/test-poop-battle.js`. The battle test drives real party commands, executes a full turn, and checks native reinforcement pages below 90/70/55/40 percent HP. Values are sampled one HP below boundaries because the native engine's floating-point percentage comparison can miss exact 55 percent.

Backup: `before-poop-v2.zip`. The earlier all-family detached-part plugin remains disabled. Spider, SEAM and drone redesigns are still outstanding; do not run the rejected installer.
