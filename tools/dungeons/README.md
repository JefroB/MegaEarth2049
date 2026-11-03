# Dungeon quest expansion

Three optional questlines, six floors, and 40 authored events extend the existing hubs. No bosses, minibosses, battle commands, or random encounters were added. Main-story progression is unchanged.

| Quest | Start | Dungeon | Objective and reward |
|---|---|---|---|
| A Lien on Your Spleen | Forewoman Latch, Rivet Commons (103) | Armatek Underworks: Meter Galleries (110), Organ Liens Registry (111) | Bypass the meter and isolate billing, then choose public disclosure or protect indebted families. 260 credits. |
| Cold Storage, Warm Bodies | Enid, Thaw House (104) | Condensation Catacombs (112), Suspended Benefits Ward (113) | Vent pressure, drain coolant, restore heat, and rescue frozen staff. Choose privacy or a signed public complaint. 300 credits. |
| The Haunted Shift | Shop steward Mags, Dorlund canteen (106) | The Unpaid Shift (114), Payroll Ossuary (115), entered from existing mine (60) | Reconstruct a suppressed gas-alarm timeline and recover the crew roster. Choose public memorial or private family records. 360 credits. |

Each dungeon has a second floor gated by its quest objectives, readable evidence, optional one-time salvage caches, and an unconditional exit. Future antagonist hooks remain dialogue only: an offsite assessor and an unoccupied executive cryosuite. The locations sit beneath existing settlements/mine geography.

## Tracking and engine compatibility

Accepting any quest grants reusable **Dungeon Field Notes**, Key Item 151. Use it from Items > Key Items, confirm the party selection, then choose a quest for objectives and directions. Common Event 5 provides the notebook. This game's installed Quest Journal file contains definitions but no journal implementation; these quests therefore use native MV switches and events without plugin commands. The item targets all allies solely to satisfy this engine's menu validation; it changes no actor statistics.

Switch ranges: 101–106, 111–117, 121–127. Full names and event IDs are in `manifest.json`. Tileset 18 combines the existing ice tiles with existing medical props and matching passage flags; no new raster assets or engine changes are needed.

## Validation and maintenance

- `node tools/dungeons/test_dungeons.js`: 2,087 native interpreter, data, reward, alternate outcome, collision, and transfer assertions. Add `--live` to check published data.
- `node tools/dungeons/smoke_dungeons.js`: Chrome/Playwright loads all six floors with installed plugins, checks reachable landing areas, completes the Lien quest, round-trips native save contents midway, and invokes Field Notes through the actual item scene. This is a save serialization check, not a disk save-slot UI test.
- `validation.json` and `browser-validation.json` contain results. All three quest branches are tested through the native interpreter; the browser end-to-end quest check covers Lien.
- `previews/contact.png` shows all six floors; `previews/in-game-archive.png` is a runtime screenshot.

`before-dungeons.zip` snapshots the live database after the earlier world expansion. `build_dungeons.py` reproducibly stages this expansion from that snapshot. `publish_dungeons.py` refuses to overwrite intervening edits and requires both validation reports to pass. Do not republish the older `tools/world` baseline over this expansion. For later map work, reconcile new changes before rebuilding from either snapshot.
