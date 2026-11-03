# World expansion tools and verification

This expansion builds on the existing MegaEarth2049 maps and art. It uses native
RPG Maker MV events; it adds no runtime plugins, new database items, or custom
JavaScript event commands.

## Added places

| Map | Location | Access and geography |
| --- | --- | --- |
| 103 | Rivet Commons | East of the existing Village near Zack; sand, industrial salvage, cobbled service lanes, clinic, stalls and a small petition interaction. |
| 104 | Municipal Thaw House | Inside Snowy Village; warm indoor recovery stop with local dialogue. |
| 105 | Newtown Reclamation Market | Newtown's eastern, lake-facing edge; green western bank, water east, two staggered-cargo piers, shops and a salvage office. Also connects to Newtown Lake's west bank. |
| 106 | Last Shift Canteen | Dorlund residential district; union meeting place and recovery service. |
| 107 | Provisional Naming Office | Existing northwestern survey settlement on Needsaname; branching naming-office dialogue. |
| 108 | Shared Workshop | Rivet Commons workshop building; hardware merchant and tool librarian. |
| 109 | Salvage Registration Office | Market guildhall; claims clerk and a one-time filing-bond refund. |

Dorlund's empty inn, shop and bunkroom are furnished and connected. The mansion's
blank room becomes a complaints archive. Existing snowy, lakeside, desert and
industrial districts gain inhabitants, services, route hints and one-time caches.
The ship rooms are connected and receive a navigation menu, free sickbay and
crew dialogue. Boarding requires the existing Ship Transponder (item 144); the
expansion does not grant it. The mansion elevator retains switch 20 as its gate.

Ting Ting's northern approach now uses the same snow and snowy-mountain tiles as
Snowy Pass, matching the route through the northern cave to Snowy Village. The
southern desert basin and eastern sea remain. The market uses Newtown Lake's
water layers, and its entrance is on Newtown's eastern side.

## Repairs

- Rebuilt truncated Map063 and blank Maps064, 065 and 096 using established art.
- Replaced impassable wall materials used as floors in Maps025–027 and
  Maps068, 069 and 074. Tileset flags were not changed.
- Connected previously isolated Dorlund, clinic, ship and mansion interiors.
- Fixed the mansion elevator's destination and unlocked-page precedence,
  the speakeasy's wrong-town exit, and a cellar transfer outside its destination.
- Removed zero-only surplus layer data in Maps015 and 100; normalized two invalid
  shadow masks in Map028.

Existing story events, quest IDs, map IDs, terrain layouts and database records
are retained except for the specific route/floor repairs above. This is a world
expansion, not a claim that the full existing campaign has been playtested.

## Workflow

Run from the repository root with Python (Pillow required for previews) and Node:

```text
python tools/world/build_world.py
node tools/world/validate_world.js
node tools/world/test_events.js
node tools/world/smoke_game.js
python tools/world/publish_world.py
node tools/world/validate_world.js --live
node tools/world/test_events.js --live
```

`build_world.py` reads the immutable `before-world-expansion.zip` snapshot and
writes `staged/`. It does not modify live maps. `publish_world.py` refuses to
overwrite intervening live edits. Keep the snapshot to recover original maps.
Do not republish staging over subsequent game development without reconciling it.

`manifest.json` lists changed maps, added events, links and services.
`validation.json` records structural, asset, native-engine passage, landing and
interaction checks. The native interpreter tests cover payment, refusal,
insufficient funds, recovery, one-time rewards, shops and gated transfers.
`browser-validation.json` records the installed-plugin browser smoke test and
the actual player walk to the lower dock's end. Browser testing uses a temporary
loopback-only server, reads staged map overrides, and closes the browser/server.
Set `PLAYWRIGHT_MODULE` if Playwright is installed somewhere other than the bundled
runtime path. Chrome must be installed.

For map previews, set `WORLD_MAP_DIR` to the absolute `staged` directory, then run
`python tools/world/render_maps.py 103 105`. Without that variable it renders live
maps. The contact sheet includes event IDs for review; the in-game screenshot
shows the actual installed-plugin rendering. Previews are review outputs, not
game assets.
