---
name: maps
description: Use when creating or modifying maps in data/MapXXX.json for MegaEarth2049. Covers the Map file field reference, encounterList[] troop weighting, event page structure, page triggers and conditions, common event command codes (including which are JS), and the complete map hierarchy across all 102 maps organized by planet/area.
---

## ⚠️ JS vs Data — The Critical Distinction

Map files (Map001.json – Map102.json) contain event lists. Most event commands are pure data, but **one command is real JavaScript**.

| Location | IS JavaScript? | Notes |
|---|---|---|
| Map-level fields (tilesetId, width, height, encounterList, etc.) | ❌ NOT JS | All pure data |
| `note` field on the map | ❌ NOT JS | Plugin notetag strings (parsed by regex) |
| `events[].pages[].list[].code` | ❌ NOT JS | Command type integer |
| Dialogue text (code 401) | ❌ NOT JS | Plain display string |
| Show Choices (code 102) parameters | ❌ NOT JS | Array of choice strings |
| Event conditions (selfSwitch, switch1, variable, etc.) | ❌ NOT JS | Boolean flags + integer IDs |
| `code 355` — Script call | ✅ YES | Full JS, full game scope. `$gameVariables`, `$gameSwitches`, `$gameParty`, etc. available |
| Plugin Command (code 357 / 605) | ❌ NOT JS | Text string parsed by plugin |

**All 102 current maps have empty `note` fields** — no map-level plugin notetags are in use yet.

---

## Floor placement and collision verification

For NPCs and player landings, verify the complete feet tile against the rendered map, all four tile layers and actual runtime passage. A tile with one open edge is not necessarily floor: cliff caps, roofs and scenery corners can allow movement. Upper scenery (`0x10`) is skipped by the passage resolver; a non-star decoration can also override a blocked wall beneath it. Inspect the whole furnishing footprint, not just its opaque centre.

Use explicit, visually reviewed floor positions and reachable approaches. Check map bounds before indexing tile arrays; an out-of-bounds row can accidentally read the next layer. Preserve legitimate doors, ladders, floor decals and counters when correcting shared flags, and test other maps using the same tileset. Do not globally block every nontransparent decoration or every A4 tile: some maps intentionally use flat A4 textures as floor.

For live interaction screenshots, start on a known floor entry and walk to the target with native collision. Never assume `(event.x, event.y+1)` is safe, or directly start a remote event as evidence that the player can reach it. Confirm the action button reaches the intended event, and inspect visible feet after capture. `tools/map-placement-audit/walk-helper.js` demonstrates the strict clear-floor approach used for the companion routes. The all-map audit and native checks are in `tools/map-placement-audit/`.

## Map File Field Reference

```json
{
  "autoplayBgm": true,
  "autoplayBgs": false,
  "battleback1Name": "",
  "battleback2Name": "",
  "bgm": {"name": "Just_standing_here_thinking", "pan": 0, "pitch": 100, "volume": 90},
  "bgs": {"name": "", "pan": 0, "pitch": 100, "volume": 90},
  "disableDashing": false,
  "displayName": "Mega Earth",
  "encounterList": [
    {"regionSet": [], "troopId": 5, "weight": 5},
    {"regionSet": [3, 4, 5], "troopId": 4, "weight": 4}
  ],
  "encounterStep": 30,
  "height": 35,
  "note": "",
  "parallaxLoopX": false,
  "parallaxLoopY": false,
  "parallaxName": "",
  "parallaxShow": false,
  "parallaxSx": 0,
  "parallaxSy": 0,
  "scrollType": 0,
  "specifyBattleback": false,
  "tilesetId": 1,
  "width": 35,
  "data": [...],
  "events": [...]
}
```

### Key Map Fields

| Field | Type | Notes |
|---|---|---|
| `tilesetId` | integer | References Tilesets.json (see tilesets skill) |
| `displayName` | string | Shown on-screen when entering map; blank = no display |
| `encounterList` | array | Random battle configuration (see below) |
| `encounterStep` | integer | Average steps between encounters (default 30; 0 = no encounters) |
| `scrollType` | integer | 0=fixed, 1=loop V, 2=loop H, 3=loop both |
| `specifyBattleback` | boolean | If true, uses `battleback1Name`/`battleback2Name` instead of tileset default |
| `disableDashing` | boolean | Prevents running on this map |
| `autoplayBgm` | boolean | If true, starts `bgm` on map entry |
| `note` | string | Plugin notetags (none currently used in any map) |
| `data` | array | Flat tile data (width × height × 6 layers) — do NOT edit manually |

---

## encounterList[] — Random Battle Configuration

Each entry: `{"regionSet": [...], "troopId": N, "weight": N}`

- **`troopId`**: Which troop from Troops.json to use
- **`weight`**: Relative probability (higher = more common)
- **`regionSet`**: If empty `[]`, troop can encounter anywhere. If populated, troop only encounters when player is on one of those region tile IDs
- **`encounterStep`**: Map-wide step counter before an encounter triggers (30 = default)
- Indoor maps with `encounterList: []` = no random battles

**Example (Map001 — Mega Earth overworld):**

| troopId | Troop Name | weight | regionSet | Notes |
|---|---|---|---|---|
| 5 | Bat | 5 | any | Most common |
| 4 | Bat*2 | 4 | region 3,4,5 | Region-restricted |
| 6 | Punk3 | 3 | region 1,3,4 | Region-restricted |
| 3 | Plants*2 | 4 | any | Common |
| 2 | Punk*2 | 2 | region 10,11,9 | Rarer |
| 32 | Rat | 5 | any | Common |
| 33 | Rat*2 | 4 | any | Common |
| 34 | Rat*3 | 3 | any | Less common |
| 35 | Rat*4 | 2 | any | Rare |
| 14 | Black Ninja | 1 | region 12 | Region 12 only |

---

## Event Page Structure

Each event has `pages[]`. Each page:
```json
{
  "conditions": { ... },
  "directionFix": false,
  "image": {"characterIndex": 0, "characterName": "", "direction": 2, "pattern": 1, "tileId": 0},
  "list": [{"code": 101, "indent": 0, "parameters": [...]}, {"code": 0, "indent": 0, "parameters": []}],
  "moveFrequency": 3,
  "moveRoute": {...},
  "moveSpeed": 3,
  "moveType": 0,
  "priorityType": 1,
  "stepAnime": false,
  "through": false,
  "trigger": 0,
  "walkAnime": true
}
```

### Page Trigger Values

| trigger | Name | When it fires |
|---|---|---|
| 0 | Action Button | Player presses OK/confirm while facing event |
| 1 | Player Touch | Player walks onto event tile |
| 2 | Event Touch | Event walks onto player tile |
| 3 | Autorun | Runs immediately, locks player input |
| 4 | Parallel Process | Runs every frame in background, no input lock |

### Page Conditions

All fields with `Valid: false` = ignored. All active conditions must be true to display this page.

| Field | Valid flag | Meaning when active |
|---|---|---|
| `switch1Id` | `switch1Valid` | Game switch N must be ON |
| `switch2Id` | `switch2Valid` | Game switch N must be ON |
| `variableId` + `variableValue` | `variableValid` | Variable N must be ≥ value |
| `selfSwitchCh` | `selfSwitchValid` | Self switch "A"/"B"/"C"/"D" must be ON |
| `actorId` | `actorValid` | Actor N must be in party |
| `itemId` | `itemValid` | Item N must be in inventory |

Pages are checked from highest index to lowest — **the last matching page wins**.

---

## Common Event Command Codes (Map Events)

| Code | Command | IS JS? | parameters |
|---|---|---|---|
| 0 | End of list | — | `[]` |
| 101 | Show Message | ❌ | `[faceName, faceIndex, background, position]` |
| 401 | Text line | ❌ | `["text string"]` |
| 102 | Show Choices | ❌ | `[["choice1","choice2",...], cancelType]` |
| 402 | When Choice | ❌ | `[index, "choice text"]` |
| 404 | End Choices | ❌ | `[]` |
| 111 | Conditional Branch | ❌ | `[type, val1, val2]` |
| 411 | Else | ❌ | `[]` |
| 412 | End Branch | ❌ | `[]` |
| 115 | Exit Event Processing | ❌ | `[]` |
| 121 | Control Switches | ❌ | `[switchId, switchId2, value (0=off,1=on,2=toggle)]` |
| 122 | Control Variables | ❌ | `[varId, varId2, operation, operandType, ...]` |
| 123 | Control Self Switch | ❌ | `["A"/"B"/"C"/"D", 0=off/1=on]` |
| 125 | Change Gold | ❌ | `[operation, operandType, operand]` |
| 126 | Change Items | ❌ | `[itemId, operation, operandType, operand]` |
| 201 | Transfer Player | ❌ | `[mode, mapId, x, y, direction, fade]` |
| 205 | Set Move Route | ❌ | `[eventId, moveRoute]` |
| 221 | Fade Out Screen | ❌ | `[]` |
| 222 | Fade In Screen | ❌ | `[]` |
| 223 | Tint Screen | ❌ | `[[r,g,b,gray], duration, wait]` |
| 230 | Wait | ❌ | `[frames]` |
| 234 | Change Screen Color Tone | ❌ | `[[r,g,b,gray], frames]` |
| 236 | Change Weather | ❌ | `[type, power, duration]` |
| 249 | Play BGM | ❌ | `[{name, volume, pitch, pan}]` |
| 250 | Play SE | ❌ | `[{name, volume, pitch, pan}]` |
| 301 | Battle Processing | ❌ | `[troopId, canEscape, canLose]` |
| 302 | Shop Processing | ❌ | `[goods array, purchaseOnly]` |
| 314 | Recover All | ❌ | `[actorId]` |
| 355 | Script | ✅ **YES** | `["javascript code"]` |
| 505 | Move Route sub-command | ❌ | Move step data |
| 601/603/604 | Battle result branches | ❌ | Victory/Escape/Defeat branches |
| 605 | Plugin Command | ❌ | `["plugin command string"]` |



---

## Complete Map Hierarchy — All 102 Maps

Maps are organized in a tree using `parentId`. `parentId: 0` = root level (world maps).

### Root — World Maps
| ID | Name | Notes |
|---|---|---|
| 1 | Mega Earth | Main world map; overworld tileset; 9 encounter entries |
| 28 | Planet Ork | Sci-fi world; has dungeon sub-areas |
| 30 | Alien Craft | Alien ship exterior container |
| 39 | Planet Ting Ting | Snowy/desert/lake world |
| 50 | Marcus Garvey 2.0 | Contains 5 maps (51–55), all named "Marcus Garvey 2.0" |
| 102 | Planet Needsaname | Placeholder; needs development |

### Mega Earth (parentId: 1)
| ID | Name | Parent | Tileset |
|---|---|---|---|
| 2 | Timbuc 2 | 1 | — |
| 3 | Item Shop | 2 | SF Inside (6) |
| 4 | Weapon Shop | 2 | — |
| 5 | Church Street | 2 | — |
| 6 | Town Park | 2 | — |
| 7 | Gnarles Barkley Ave | 2 | — |
| 8 | Internet Cafe | 7 | — |
| 9 | Matrix | 8 | — |
| 10 | Timbuc | 1 | — |
| 11 | Timbuc Grocery | 10 | — |
| 12 | Timbuc Weapon Shop | 10 | — |
| 15 | Timbuc Cellar | 10 | — |
| 16 | Boss Room | 15 | — |
| 17 | Room A | 15 | — |
| 18 | Room D | 15 | — |
| 19 | Room B | 15 | — |
| 20 | Room C | 15 | — |
| 21 | Room E | 15 | — |
| 22 | Passageway 1 | 15 | — |
| 23 | Passageway 2 | 15 | — |
| 32 | Room F | 15 | — |
| 56 | Jen's House (outer) | 10 | — |
| 57 | Jen's House | 56 | — |
| 13 | Timbuc Inn | 56 | — |
| 14 | Timbuc Inn Room | 13 | — |
| 24 | B.M.N.E.C. | 1 | — |
| 25 | B.M.N.E.C. Floor 1 | 24 | — |
| 26 | B.M.N.E.C. Floor 2 | 24 | — |
| 27 | B.M.N.E.C. Floor 3 | 24 | — |
| 41 | B.M.N.E.C. Floor 4 | 24 | — |
| 33 | Village | 1 | — |
| 34 | Inn | 33 | — |
| 35 | Zack's House | 33 | — |
| 36 | Armor Shop | 33 | — |
| 37 | Bridge to Timbuc 2 | 1 | — |
| 38 | Floating Mansion (Outside) | 1 | — |
| 40 | Floating Mansion 1st floor | 38 | — |
| 91 | Floating Mansion 2nd floor | 38 | — |
| 92 | Bedroom 1 | 91 | — |
| 93 | Guest Room | 91 | — |
| 94 | Study | 91 | — |
| 95 | Bedroom 2 | 91 | — |
| 96 | MAP096 | 91 | Placeholder |

### Planet Ork (parentId: 28)
| ID | Name | Parent |
|---|---|---|
| 29 | Alien Craft | 30 |
| 31 | Alien Craft | 30 |
| 42 | Dorlund Station | 28 |
| 43 | Dorlund Center | 28 |
| 44 | Weapon Shop | 43 |
| 45 | Mod Center | 43 |
| 58 | Armorer | 43 |
| 61 | Dorlund Center | 28 |
| 63 | Dorlund Inn | 61 |
| 65 | Dorlund Inn Room | 63 |
| 64 | Dorlund Shop | 61 |
| 59 | Hall | 28 |
| 60 | Dungeon | 28 |
| 62 | Dorlund Lava Fields | 28 |

### Planet Ting Ting (parentId: 39)
| ID | Name | Parent |
|---|---|---|
| 46 | Passageway | 39 |
| 47 | Snowy Village | 39 |
| 66 | Village Inn | 47 |
| 67 | Village Lounge | 47 |
| 68 | Village Tools | 47 |
| 69 | Village Items | 47 |
| 48 | Snowy Pass | 39 |
| 49 | Newtown | 39 |
| 71 | Newtown Inn | 49 |
| 72 | Newtown Weapons | 49 |
| 73 | Newtown Armor | 49 |
| 74 | Newtown Items | 49 |
| 70 | Newtown Lake | 39 |
| 75 | Upper Newtown Lake | 70 |
| 85 | Island Basement | 75 |
| 86–90 | Basement rooms #1–#5 | 85 |
| 76 | Big Ass Desert | 39 |
| 77 | North D Town | 39 |
| 79 | D Town Weapon Shop | 77 |
| 80 | D Town Armor Shop | 77 |
| 81 | D Town Item Shop | 77 |
| 82 | D Town Inn | 77 |
| 83 | D Town Body Mod Center | 77 |
| 84 | D Town Bar | 77 |
| 97 | South D Town | 77 |
| 98 | Shack | 97 |
| 100 | D Town Cellar | 98 |
| 99 | Mod Center | 97 |
| 101 | D Town Speak Easy | 97 |
| 78 | Mountain Pass | 39 |

---

## ⚠️ Mechanical Constraints for Maps

### CAN do (engine-supported)
| Capability | How |
|---|---|
| Region-restricted random encounters | `encounterList` entry with `regionSet` array |
| Autorun cutscenes | Event page with trigger 3 + self-switch to prevent repeat |
| Parallel background scripts | Event page with trigger 4 |
| Custom BGM per map | `autoplayBgm: true` + `bgm` name |
| Custom battlebacks | `specifyBattleback: true` + `battleback1Name`/`battleback2Name` |
| Transfer to another map | Event cmd 201 (Transfer Player) |
| Conditional event pages | Switch, variable, self-switch, actor, or item conditions |
| JS in event | cmd 355 Script call — real JavaScript |
| Plugin commands | cmd 605 with plugin-specific text string |

### CANNOT do (not supported)
| Impossible | Why |
|---|---|
| Map-level notetag effects (currently) | No maps have `note` content — plugin notetags in map notes not yet used |
| Dynamic tile changes | `data[]` array is static; tiles cannot change at runtime (except via events moving characters) |
| Region-based BGM switching | Not a built-in feature; would need a plugin |
| Per-encounter region weight scaling | `weight` is fixed; no formula support |
| More than 16 regions | RPG Maker MV supports region IDs 1–63 but uses only 1 tile layer per region |
| Map-specific encounter step formula | `encounterStep` is a fixed integer, not a formula |

---

## Adding a New Map — Checklist

1. **Create** `data/MapNNN.json` where NNN = next 3-digit zero-padded ID (currently max is 102 → use 103)
2. **Add entry** to `data/MapInfos.json` with matching `id`, `name`, `parentId`, and `order`
3. **Set `tilesetId`**: reference Tilesets.json (see tilesets skill for which tileset fits the setting)
4. **Set `displayName`**: shown when player enters map; leave `""` for no display
5. **Set `width` and `height`**: tile counts (not pixels)
6. **Set `encounterList`**: empty array for indoor/no battles, or add troop entries for outdoor maps
7. **Set `encounterStep`**: 30 is default; increase for fewer random battles
8. **Set `scrollType`**: 0 = fixed (most maps), 3 = loop both (for world maps)
9. **Set `autoplayBgm`** and `bgm.name` if the map has its own music
10. **Set `specifyBattleback: true`** + `battleback1Name`/`battleback2Name` to override default battle background
11. **`data` array**: must be `width × height × 6` integers (tile layer data) — use the editor to paint tiles; do NOT hand-edit
12. **`events`**: start with `[null]` (index 0 reserved), add event objects starting at index 1
13. **Event best practice**: Use self-switch "A" after a one-time event to switch to an empty page 2
14. **JS in events**: Script calls (code 355) are real JS; test carefully; prefer plugin commands (605) where possible
