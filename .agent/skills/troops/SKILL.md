---
name: troops
description: Use when creating or modifying troops in data/Troops.json for MegaEarth2049. Covers Troops.json field reference, members[] positioning, pages[] battle events, page condition flags, battle event command codes, the complete list of all 46 troops, and a checklist for adding new troops. No JavaScript anywhere in Troops.json — all fields are data.
---

## ⚠️ JS vs Data — The Critical Distinction

**There is NO JavaScript in Troops.json.** All fields are pure data or text strings.

| Location | IS JavaScript? | Notes |
|---|---|---|
| `members[].enemyId` / `.x` / `.y` / `.hidden` | ❌ NOT JS | Enemy placement, integer positions |
| `pages[].conditions.*` | ❌ NOT JS | Boolean flags + integer thresholds |
| `pages[].list[].code` | ❌ NOT JS | Event command code (integer) |
| `pages[].list[].parameters` | ❌ NOT JS | Array of strings/integers per command |
| Dialogue text in code 401 | ❌ NOT JS | Plain display text |
| Script call (code 355) | ✅ YES | Full JS — if ever used in a troop page |

Battle event pages in troops use the same event command system as map events, but **code 355 (Script)** is rare in troops. If added, it is real JS.

---

## Troops.json Field Reference

```json
{
  "id": 36,
  "name": "Poopoo Caca",
  "members": [
    {"enemyId": 115, "x": 252, "y": 406, "hidden": false},
    {"enemyId": 116, "x": 390, "y": 292, "hidden": false},
    {"enemyId": 116, "x": 453, "y": 298, "hidden": true}
  ],
  "pages": [
    {
      "conditions": {
        "actorHp": 50,    "actorId": 1,    "actorValid": false,
        "enemyHp": 90,    "enemyIndex": 0, "enemyValid": true,
        "switchId": 1,    "switchValid": false,
        "turnA": 0,       "turnB": 0,      "turnValid": false,
        "turnEnding": false
      },
      "list": [
        {"code": 101, "indent": 0, "parameters": ["", 0, 0, 0]},
        {"code": 401, "indent": 0, "parameters": ["Oh Shit. You might actually beat me."]},
        {"code": 335, "indent": 0, "parameters": [2]},
        {"code":   0, "indent": 0, "parameters": []}
      ]
    }
  ]
}
```

---

## members[] — Enemy Placement

| Field | Type | Notes |
|---|---|---|
| `enemyId` | integer | ID from Enemies.json |
| `x` | integer | Screen X position (pixels); battle screen is ~816 wide |
| `y` | integer | Screen Y position (pixels); battle screen is ~624 tall |
| `hidden` | boolean | `true` = starts hidden; must be revealed by cmd 335 (Show Enemy) |

Typical X range: 150–520. Typical Y range: 260–450.
Hidden enemies can be revealed mid-battle via battle event page using cmd 335.

---

## pages[].conditions — Page Trigger Flags

A page triggers when **all active conditions** are met (those with `Valid: true`).

| Field | Valid flag | Meaning when active |
|---|---|---|
| `enemyHp` + `enemyIndex` | `enemyValid` | Trigger when enemy[index] HP falls to ≤ N% |
| `actorHp` + `actorId` | `actorValid` | Trigger when actor N's HP falls to ≤ N% |
| `turnA` + `turnB` | `turnValid` | Trigger on turn (turnB + turnA * n) |
| `switchId` | `switchValid` | Trigger when game switch N is ON |
| `turnEnding` | — | Trigger at end of turn (no valid flag needed) |

**`enemyHp: 0` with `enemyValid: true`** = triggers the moment enemy index 0 reaches 0% HP (i.e., upon defeat). Used for scripted recruitment battles.

Multiple conditions can be active simultaneously — all must be true for the page to fire.
A page runs **once per battle** (not repeatable by default).

---

## Battle Event Command Codes (used in troops)

| Code | Command | parameters |
|---|---|---|
| 0 | End of list (required last entry) | `[]` |
| 101 | Show Message (start) | `[faceName, faceIndex, background, position]` |
| 401 | Show Text (continuation line) | `["text string"]` |
| 111 | Conditional Branch | `[type, value1, value2]` — see RPG Maker MV event docs |
| 411 | Else | `[]` |
| 412 | End Branch | `[]` |
| 129 | Change Party Member | `[actorId, operation (0=add,1=remove), initialize]` |
| 335 | Show Enemy (reveal hidden) | `[enemyIndex]` — 0-based index into members[] |
| 340 | Abort Battle | `[]` — ends battle immediately (treated as escape) |
| 355 | Script (JS) | `["javascript code string"]` ← REAL JS if used |

---

## Complete Troop Reference — All 46 Troops

### Single-Enemy Troops
| ID | Name | Enemy | EXP | Notes |
|---|---|---|---|---|
| 5 | Bat | Bat (2) | 3 | — |
| 6 | Punk3 | Punk3 (27) | 4 | Punk3 has 2 drop slots |
| 7 | Mutant Plant | Mutant Plant (4) | 4 | Uses skillId 3 on turn 2 |
| 15 | Pink Ninja | Pink Ninja (13) | 3 | Scripted recruitment: defeat triggers actor 7 join |
| 16 | Halucination | Halucination (19) | 3 | 2000 HP boss-tier solo |
| 32 | Rat | Rat (32) | 3 | Rat uses skillId 126 |

### Two-Enemy Troops
| ID | Name | Members | Notes |
|---|---|---|---|
| 1 | Punk2*2 | Punk2×2 | — |
| 2 | Punk*2 | Punk1×2 | — |
| 3 | Plants*2 | Mutant Plant×2 | Both use turn-2 skill |
| 4 | Bat*2 | Bat×2 | — |
| 17 | Doll*2 | Doll×2 (1 hidden) | — |
| 18 | Doll*2 | Doll×2 (1 hidden) | Duplicate of 17 pattern |
| 20 | Earth & Fire | Earth Sprite + Fire Sprite | — |
| 21 | Earth & Wind | Earth Sprite + Wind Sprite | — |
| 22 | Water & Fire | Fire Sprite + Water Sprite | — |
| 23 | Earth & Water | Earth Sprite + Water Sprite | — |
| 26 | Water Wind | Wind Sprite + Water Sprite | — |
| 27 | Fire Wind | Wind Sprite + Fire Sprite | — |
| 30 | Punk1, Punk5 | Punk1 + Punk5 | — |
| 31 | Punk2, Punk4 | Punk2 + Punk4 | — |
| 33 | Rat*2 | Rat×2 | — |
| 38 | Crap*2 | Crap×2 | — |
| 40 | Cockatrice*2 | Cockatrice×2 | — |
| 41 | Icky Spider*2 | Icky Spider×2 | — |



### Three-Enemy Troops
| ID | Name | Members | Notes |
|---|---|---|---|
| 9 | Green Ninja | Green Ninja×3 (1 hidden) | Third ninja hidden |
| 10 | Brown Ninja | Brown Ninja×3 (1 hidden) | Second ninja hidden |
| 11 | Blue Ninja | Blue Ninja×3 (1 hidden) | Second ninja hidden |
| 12 | Red Ninja | Red Ninja×3 (1 hidden) | Second ninja hidden |
| 13 | Purple Ninja | Purple Ninja×3 (1 hidden) | Second ninja hidden |
| 14 | Black Ninja | Black Ninja×3 | None hidden |
| 17 | Doll*3 | Doll×3 (1 hidden) | Second doll hidden |
| 19 | Earth Wind & Fire | Earth + Wind + Fire Sprites | None hidden |
| 24 | Earth Wind & Water | Earth + Wind + Water Sprites | None hidden |
| 25 | Fire Wind & Water | Wind + Water + Fire Sprites | None hidden |
| 28 | Punk1, Punk2, Punk3 | Punk1 + Punk2 + Punk3 | None hidden |
| 29 | Punk3, Punk4, Punk5 | Punk3 + Punk4 + Punk5 | None hidden |
| 34 | Rat*3 | Rat×3 | None hidden |
| 37 | Crap*3 | Crap×3 | None hidden |
| 42 | Icky Spider*2, Massive Spider | Icky Spider×2 + Massive Spider | None hidden |
| 43 | Massive Spider*2, Huge Spider | Massive Spider×2 + Huge Spider | None hidden |
| 44 | Huge Spider*2, Brown Recluse | Huge Spider×2 + Brown Recluse | None hidden |
| 45 | Brown Recluse*2, Giant Spider | Brown Recluse×2 + Giant Spider | None hidden |

### Four+-Enemy Troops
| ID | Name | Members | Pages | Notes |
|---|---|---|---|---|
| 35 | Rat*4 | Rat×4 | 1 | No hidden, no conditions |
| 39 | Crap*4 | Crap×4 | 1 | No hidden, no conditions |
| 46 | Punkboss1, Giant Spider*3 | PunkBoss (117) + Giant Spider×3 | 1 | No hidden, no conditions |

### Special Multi-Enemy Troops
| ID | Name | Members | Pages | Notes |
|---|---|---|---|---|
| 8 | Rainbow Ninja | 6 ninjas (3 hidden): Green + Brown + Blue + Red + Purple + Black | 1 | Half hidden — full color set |
| 36 | Poopoo Caca | 8 members: Poopoo Caca boss + 7 Crap (4 hidden) | 4 | Boss fight with phase reinforcements (see below) |

---

## Boss Troop: Poopoo Caca (ID 36)

### Member Lineup (8 members, 0-based index)

| Index | Enemy | Hidden? | Position |
|---|---|---|---|
| 0 | Poopoo Caca (ID 115) | No (visible) | (252, 406) — left side |
| 1 | Crap (ID 116) | No (visible) | (390, 292) |
| 2 | Crap (ID 116) | **Yes** | (453, 298) — revealed page 0 |
| 3 | Crap (ID 116) | No (visible) | (408, 355) |
| 4 | Crap (ID 116) | **Yes** | (465, 358) — revealed page 1 |
| 5 | Crap (ID 116) | No (visible) | (405, 400) |
| 6 | Crap (ID 116) | **Yes** | (450, 403) — revealed page 2 |
| 7 | Crap (ID 116) | **Yes** | (369, 379) — revealed page 3 |

So the fight starts with **4 visible enemies** (boss + 3 Crap), and escalates up to 8 total.

### Battle Event Pages (4 pages, each runs once)

| Page | Trigger | Dialogue | Reveal Enemy |
|---|---|---|---|
| 0 | Boss HP ≤ 90% | "Oh Shit. You might actually beat the crap out of me." → "Take this!" | Index 2 (cmd 335 [2]) |
| 1 | Boss HP ≤ 70% | "Fuck you, Ass Monkey!" | Index 4 (cmd 335 [4]) |
| 2 | Boss HP ≤ 55% | "Eat shit for breakfast." | Index 6 (cmd 335 [6]) |
| 3 | Boss HP ≤ 40% | "Have a shit sandwich!" | Index 7 (cmd 335 [7]) |

All conditions: `enemyValid: true, enemyIndex: 0` — tracking the boss (index 0, Poopoo Caca).

### Key Mechanic: Hidden Enemy Reveal

Battle event pages use **cmd 335** (Show Enemy) with a **0-based enemy index** into `members[]`.
This is the only way to reveal hidden enemies mid-battle — cmd 335 cannot spawn new enemies, only reveal pre-placed hidden ones.

---

## Scripted Recruitment Troop: Pink Ninja (ID 15)

### Setup
- Single member: Pink Ninja (enemy ID 13), visible at start
- 1 battle event page: `enemyHp: 0, enemyValid: true, enemyIndex: 0`
- Trigger: when Pink Ninja (index 0) reaches 0% HP = **upon defeat**

### Page 0 Event Flow

```
[cmd 111] Conditional Branch: params [4, 7, 0]
           → Is actor 7 already in the party?
  [cmd 340] Abort Battle   ← if YES (already recruited) → end battle cleanly
[cmd 411] Else             ← if NOT in party yet:
  [cmd 101] Show Message:  face "ninja2", faceIndex 0, position bottom
  [cmd 401] "A test of will, and you have endured. "
  [cmd 401] "Good job."
  [cmd 129] Change Party Member: params [7, 0, false]
             → Add actor 7 to party (without initialize reset)
[cmd 412] End Branch
```

### Key Points for Similar Recruitment Battles
1. `enemyHp: 0 + enemyValid: true` = "upon defeat" trigger
2. cmd 111 `[4, 7, 0]` = "Is actor ID 7 in the party?" — prevents double-recruit if replayed
3. cmd 340 (Abort Battle) exits cleanly when already recruited
4. cmd 129 `[actorId, 0, false]` = Add actor; `false` = keep current stats (do not reinitialize)
5. The dialogue (cmd 101/401) appears BEFORE the join (cmd 129) — order matters

---

## ⚠️ Mechanical Constraints for Troops

### CAN do (engine-supported)
| Capability | How |
|---|---|
| Show dialogue mid-battle | cmd 101 + cmd 401 in a page event |
| Reveal hidden enemies | cmd 335 with enemy index in page event |
| Recruit actor after battle | cmd 129 in page event |
| End battle on condition | cmd 340 (Abort Battle) |
| Branch on party membership | cmd 111 type 4 |
| Trigger on boss HP threshold | `enemyValid: true, enemyHp: N%` |
| Trigger on turn number | `turnValid: true, turnA/turnB` |
| Run JS in battle event | cmd 355 (rare, but valid) |

### CANNOT do (not supported)
| Impossible | Why |
|---|---|
| Reveal enemy not pre-placed in members[] | cmd 335 only unhides; cannot add new enemies |
| Change enemy stats mid-battle | No command modifies enemy base stats in battle |
| Trigger a page more than once per battle | Pages are one-shot by default |
| Spawn enemies beyond the initial members[] | members[] is fixed at battle start |
| Show enemy-specific dialogue automatically | Enemies have no dialogue system; requires troop page |
| Conditional on a specific enemy's HP (not index 0) | enemyIndex can be changed; multiple pages needed for different enemies |

---

## Adding a New Troop — Checklist

1. **Append** to `data/Troops.json` — use next available ID (currently max is 46)
2. **Set `name`**: descriptive label (shown in editor only, not in game)
3. **Set `members[]`**: one object per enemy:
   - `enemyId`: ID from Enemies.json
   - `x`: horizontal position (150–520 typical)
   - `y`: vertical position (260–450 typical)
   - `hidden`: `false` to start visible, `true` for scripted reveals
4. **Set `pages[]`**: at least one page (even if empty with just `{code:0}`):
   - Set all condition `Valid` flags to `false` for an unconditional page (or no-trigger)
   - To trigger on boss HP: set `enemyValid: true`, `enemyIndex: 0` (or other), `enemyHp: N`
   - To trigger on defeat: set `enemyHp: 0, enemyValid: true`
5. **Battle event list**: always end with `{"code": 0, "indent": 0, "parameters": []}`
6. **Hidden reinforcements pattern** (like Poopoo Caca):
   - Add enemies with `hidden: true` in members[]
   - Add one page per reveal threshold with cmd 335 + the 0-based index
   - Each page needs a unique `enemyHp` threshold
7. **Recruitment pattern** (like Pink Ninja):
   - Set `enemyHp: 0, enemyValid: true` on the boss enemy index
   - Add cmd 111 check for actor party membership first
   - Add cmd 340 (abort) if already recruited
   - Add cmd 101/401 dialogue + cmd 129 add-actor in the else branch
8. **No JS needed**: everything in troops is data — avoid cmd 355 unless absolutely required
9. **Verify enemy IDs**: all `enemyId` values must exist in Enemies.json
