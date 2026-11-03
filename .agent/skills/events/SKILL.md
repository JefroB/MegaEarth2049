---
name: events
description: Use when creating or modifying common events in data/CommonEvents.json for MegaEarth2049. Covers CommonEvents.json field reference, common event triggers (none/autorun/parallel), the two existing common events (Ship Transponder and Mining Event), event command codes (including which are real JavaScript), and a checklist for adding new common events. No JavaScript anywhere in common event data except code 355 Script calls.
---

## ⚠️ JS vs Data — The Critical Distinction

**There is NO JavaScript in CommonEvents.json** except for `code 355` Script calls (rarely used).

| Location | IS JavaScript? | Notes |
|---|---|---|
| `trigger` | ❌ NOT JS | Integer: 0/1/2 only |
| `switchId` | ❌ NOT JS | Integer ID of the control switch |
| `list[].code` | ❌ NOT JS | Event command code (integer) |
| Dialogue text (code 401) | ❌ NOT JS | Plain display string |
| Choice text (code 102 params) | ❌ NOT JS | Array of string literals |
| Show Choices, Conditional Branch | ❌ NOT JS | Integer type + value flags |
| Control Variables (code 122) | ❌ NOT JS | Data manipulation, not JS |
| Plugin Command (code 605) | ❌ NOT JS | Text string parsed by plugin |
| `code 355` Script call | ✅ YES | Full JS — full game scope available |

Common events in this game use **no** code 355 calls. If you add one, it is real JavaScript.

---

## CommonEvents.json Field Reference

```json
{
  "id": 1,
  "name": "Ship Transponder",
  "trigger": 1,
  "switchId": 1,
  "list": [
    {"code": 111, "indent": 0, "parameters": [0, 21, 0]},
    {"code": 401, "indent": 0, "parameters": ["Text line"]},
    {"code":   0, "indent": 0, "parameters": []}
  ]
}
```

### Field Descriptions

| Field | Type | Notes |
|---|---|---|
| `id` | integer | 1-based ID; used with plugin command `Common Event N` or event cmd 117 |
| `name` | string | Editor display name only — not shown in game |
| `trigger` | integer | 0 = none (manual call only), 1 = autorun, 2 = parallel |
| `switchId` | integer | For trigger 1 and 2: the game switch that must be ON to activate |
| `list` | array | Event command list; must end with `{"code": 0, "indent": 0, "parameters": []}` |

---

## Common Event Trigger Types

| trigger | Name | Behavior |
|---|---|---|
| 0 | None | Does NOT run automatically. Must be called via:<br>• Map event `Common Event` (cmd 117)<br>• Plugin command (e.g. `Common Event 1`)<br>• Script: `$gameTemp.reserveCommonEvent(id)` |
| 1 | Autorun | Runs as soon as the assigned `switchId` turns ON. Locks player input (like trigger 3 on map events). Runs once and stops when the event list ends. |
| 2 | Parallel | Runs every frame (in background) while `switchId` is ON. Does NOT lock player input. Continues until the list ends or switch is turned OFF. |

**Difference from map event autorun**: Common event autorun (trigger 1) continues across map transitions as long as the switch stays ON.

---

## Current Common Events

### ID 1 — Ship Transponder
- **trigger**: 1 (autorun when switch 1 is ON)
- **switchId**: 1
- **Purpose**: Interplanetary travel system using the Marcus Garvey 2.0 ship

**Flow summary** (96-command list):
1. Checks variable 21 (current planet: 1=MegaEarth, 2=PlanetOrk, 3=PlanetTingTing)
2. If variable 21 = 1 (MegaEarth): Shows travel menu to Planet Ork / Planet Ting Ting / Cancel
3. If variable 21 = 2 (Planet Ork): Shows travel menu to MegaEarth / Planet Ting Ting / Cancel
4. If variable 21 = 3 (Planet Ting Ting): Shows travel menu to MegaEarth / Planet Ork / Cancel
5. If variable 21 is none of the above: "The transponder doesn't seem to be working."
6. On any valid selection: Shows "Calling Marcus Garvey 2.0...", waits 60 frames, then uses cmd 201 (Transfer Player) to move to destination map

**Planet destination map IDs** (from cmd 201 parameters):
| Planet | Map ID | Transfer coordinates |
|---|---|---|
| MegaEarth | 1 | x:8, y:6 |
| Planet Ork | 2 | x:8, y:6 |
| Planet Ting Ting | 3 | x:8, y:6 |

**Variable 21** is the planet tracker — it must be set by a map event when the player arrives on each planet. The common event reads it but does not set it.

**Key commands used**:
- `111 [0, 21, 0]` — Conditional Branch: switch check or variable check on planet variable
- `111 [11, 1/2/3]` — Conditional Branch: nested planet checks
- `102` — Show Choices (travel menu)
- `402` — When Choice branch
- `404` — End Choices
- `230 [60]` — Wait 60 frames (~1 second at 60fps)
- `201 [0, mapId, x, y, 0, 0]` — Transfer Player (mode 0 = direct, no fade)
- `411/412` — Else / End Branch

### ID 2 — Mining Event
- **trigger**: 0 (none — must be called manually via event or plugin command)
- **switchId**: 1 (unused since trigger = 0)
- **Purpose**: Mining mechanic — generates a random result and shows what was found

**Flow summary** (24-command list):
1. `122 [10, 10, 0, 2, 0, 49]` — Control Variable 10 = random(0–49) [sets var 10 to random value]
2. `102` — Show Choices: ["Yes", "No"] (confirm mining action)
3. If "Yes":
   - `111 [1, 10, 0, 47, 3]` — If variable 10 ≥ 47: "You found a really rare thing."
   - Else if variable 10 ≤ 35: "You found a common thing."
   - Else: "You found a somewhat rare thing."
4. If "No": end (no dialogue)

**Note**: The Mining Event is a skeleton/prototype. Actual item grants (cmd 126) have not been wired up yet — it only shows dialogue. Variable 10 is used as a temporary local roll variable.

---

## Event Command Codes (Common Event Context)

Same command set as map events. Most-used codes in common events:

| Code | Command | IS JS? | Notes |
|---|---|---|---|
| 0 | End of list | — | Required last entry |
| 101 | Show Message | ❌ | `[faceName, faceIndex, background, position]` |
| 401 | Text line | ❌ | `["text string"]` |
| 102 | Show Choices | ❌ | `[["choice1","choice2",...], cancelType, ...]` |
| 402 | When Choice | ❌ | `[index, "choice label"]` |
| 404 | End Choices | ❌ | `[]` |
| 111 | Conditional Branch | ❌ | `[type, val1, val2, ...]` — see map events skill for full type table |
| 411 | Else | ❌ | `[]` |
| 412 | End Branch | ❌ | `[]` |
| 117 | Common Event (call) | ❌ | `[commonEventId]` — calls another common event |
| 121 | Control Switches | ❌ | `[switchId, switchId2, value]` |
| 122 | Control Variables | ❌ | `[varId, varId2, operation, operandType, ...]` |
| 201 | Transfer Player | ❌ | `[mode, mapId, x, y, direction, fade]` |
| 230 | Wait | ❌ | `[frames]` |
| 355 | Script | ✅ YES | `["javascript code"]` — REAL JS if present |
| 605 | Plugin Command | ❌ | `["plugin command string"]` |



---

## Common Event vs Map Event — Key Differences

| Feature | Common Event | Map Event |
|---|---|---|
| Scope | Global — runs regardless of which map player is on | Local — only runs on its map |
| Persistence across maps | ✅ Yes (trigger 1/2 continues while switch is ON) | ❌ No — event resets when leaving map |
| Self switches | ❌ Not available | ✅ A/B/C/D per event instance |
| Page conditions | ❌ Only one list per common event | ✅ Multiple pages with full condition set |
| Calling mechanism | trigger 0 = must be called explicitly | trigger 0 = action button |
| Best use | Shared mechanics used across maps (travel, mining, etc.) | Map-specific interactions |

---

## ⚠️ Mechanical Constraints for Common Events

### CAN do (engine-supported)
| Capability | How |
|---|---|
| Interplanetary travel | cmd 201 (Transfer Player) with target mapId + coordinates |
| Random loot mechanic | cmd 122 (Control Variables) with random operand, then Conditional Branch |
| Show dialogue from any map | Common event trigger 1/2 or call via cmd 117 |
| Check which planet player is on | Read variable 21 via Conditional Branch |
| Set switches/variables | cmd 121 (Control Switches), cmd 122 (Control Variables) |
| Shop in common event | cmd 302 (Shop Processing) |
| Battle in common event | cmd 301 (Battle Processing) |
| Recover party | cmd 314 (Recover All) |
| Full JS | cmd 355 Script call — `$gameVariables`, `$gameSwitches`, `$gameParty`, `$gamePlayer`, etc. |

### CANNOT do (not supported)
| Impossible | Why |
|---|---|
| Common event page conditions | Each common event has only one list — no multi-page system |
| Common event self switches | Self switches only exist per map event instance |
| Know which map called the event | No caller context is passed; use a variable to communicate if needed |
| Parallel event that runs on specific map only | Parallel trigger fires globally; use map-level check (variable) to guard |
| Modify common event list at runtime | Event list is static data; cannot add/remove commands during play |

---

## Adding a New Common Event — Checklist

1. **Append** to `data/CommonEvents.json` — use next available ID (currently max is 2 → use 3)
2. **Set `name`**: descriptive label (editor only — not shown in game)
3. **Set `trigger`**:
   - `0` = manual call only (called via cmd 117 or plugin command)
   - `1` = autorun when `switchId` switch is ON (locks player input)
   - `2` = parallel while `switchId` switch is ON (no input lock)
4. **Set `switchId`**: only relevant for trigger 1 or 2; ignored for trigger 0
5. **Build `list[]`**: array of event command objects; must end with `{"code": 0, "indent": 0, "parameters": []}`
6. **To call from a map event**: use cmd 117 `[commonEventId]` in the map event list
7. **To call from a plugin command**: use `Common Event N` (YEP_CommonEventMenu or similar)
8. **Variable discipline**: if the common event reads variables (like variable 21 for planet), document which variable IDs it depends on — see system/SKILL.md for the variable registry
9. **Autorun trigger 1 safety**: always ensure the controlling switch gets turned OFF when the event completes, or it will run again on next autorun check
10. **Parallel trigger 2 safety**: parallel events run every frame — keep the list short or use a "done" self-switch equivalent (game variable/switch) to exit early once work is complete
11. **No JS needed**: prefer cmd 121/122 for data manipulation; only use cmd 355 Script if no event command achieves the effect
12. **Test call order**: if a common event calls another (cmd 117), the called event runs inline before the caller continues
