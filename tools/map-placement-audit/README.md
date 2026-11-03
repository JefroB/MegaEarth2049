# All-map placement audit

`audit.py` is read-only and scans every MapNNN file, human-event pages, fixed transfers in maps/common events/troops, used decorative tile flags and vertical walls. `audit.json` contains the full inventory. Context contact sheets record visual review, including valid doors, ladders, floor textures, seated NPCs and flat decals. `wall-overrides.json` and the override tile sheets record the pre-repair candidate set; do not regenerate it as an installer input after repair.

`repair.py` is a **one-time** installer guarded by exclusive `before.zip`. Never rerun it over the live project. `finalize.py` is idempotent for the three service staff and the two counter service points. `repairs.json` is the authoritative final209-flag,21-position and one-landing delta. It includes reviewed traversal exceptions. `before.zip` preserves all original maps, Tilesets and the companion manifest.

`test.js` runs2182 checks in the native MV runtime across all250 maps, all196 potential person pages and633 fixed destination references. It checks the changed flags and actual service routing across two-tile counters. `preview.js` checks all visible staff/player feet in five real room captures against clear floor and absence of scenery layers.

`walk-helper.js` is used by the companion live test. It walks from reviewed entry points instead of teleporting below an event, excludes scenery and trigger hazards, confirms each movement, then the test uses native action targeting. The five companion chapters complete25 interactions and145 floor steps. Small ground vegetation in Timbuc is explicitly reviewed; it is not a blanket allowance for decorative tiles.

`preservation.json` verifies all map painting/settings and existing quest logic against the snapshot, allowing only documented coordinate moves, the one return destination and two service points.235 maps have no data changes. No PNG artwork or runtime plugin was edited.

Native regressions: companions166; original Dojo68; Pink41; all four spaceship travel/return pairs; clinic84; bounded additions159; local projects84. Sources/preview are in `GameFAQs/FAQ_08_Technical_Issues.md#map-placement-and-passage-audit` and `art/map-placement/preview.html`. No user saves are written.

Known scope limit: no full campaign playthrough or arbitrary-plugin movement proof. Older duplicated Golden Gear contacts and variable51 sharing were observed and recorded as a separate quest-logic finding, not silently rewritten in a placement repair.

A20 added maps249–250 after the original248-map repair snapshot. The latest audit/test inventory includes them; the initial preservation report applies to the earlier floor-repair delta. The later showroom installer has its own snapshot and validation.
