---
name: items
description: Use when creating or modifying items in data/Items.json for MegaEarth2049. Covers the critical itypeId distinction (battle item vs key item), JS vs notetag fields, field reference, effects array, and animation constraints for battle-usable items. Key items (itypeId 2) are never used in battle. Battle items (itypeId 1) with occasion 0 or 1 must be animatable.
---

For item/key-item icons or reusable animation art, follow the shared [atlas-packing workflow](../graphics/references/atlas-packing.md). Verify every exact runtime crop; do not assume a generated grid has uniform boundaries.

## ⚠️ JS vs Notetags — The Critical Distinction

| Location | IS JavaScript? | Context Variables | Notes |
|---|---|---|---|
| `damage.formula` | ✅ YES | `a`=user, `b`=target, `v[n]`=variable n, `item`=item object | Same as skills; full JS expression |
| `<Custom X>` … `</Custom X>` | ✅ YES (Lunatic Mode) | Varies per block | YEP plugin-specific; see plugins skill |
| `script:` inside action sequence | ✅ YES | Full game scope | ONLY the `script:` line |
| `note` field notetags | ❌ NOT JS | — | Literal strings parsed by regex |
| `effects[].code/dataId/value1/value2` | ❌ NOT JS | — | All integers; no formula support |
| `itypeId`, `scope`, `occasion`, `hitType` | ❌ NOT JS | — | Enumeration integers only |
| `description` | ❌ NOT JS | — | Display text in menu/item screen |
| `consumable` | ❌ NOT JS | — | Boolean true/false only |
| `price` | ❌ NOT JS | — | Integer shop price |
| Action sequence commands in `note` | ❌ NOT JS | — | Text parser; NOT JS (except `script:` lines) |

---

## ⚠️ The itypeId Distinction — MOST IMPORTANT

```
itypeId: 1  →  Regular item  (can appear in Item menu; can be used in battle if occasion allows)
itypeId: 2  →  Key item      (NEVER usable in battle; appears in Key Items tab only; no animation needed)
```

**Current MegaEarth2049 item breakdown:**
- **6 battle items** (itypeId 1) — Acetaminophen, etc. — can have effects, animations, damage
- **32+ key items** (itypeId 2) — Necklace pieces, engine parts, quest objects — no combat use

**Key rule**: If `itypeId: 2`, you do NOT need:
- An `animationId` (ignored)
- An action sequence
- Any `effects[]` entries (they'd never trigger in battle)
- A `damage.formula` (irrelevant)

**Key rule**: If `itypeId: 1` AND `occasion: 0` or `occasion: 1`, the item IS usable in battle and MUST have a visible animation (see Animation Constraint section).

---

## Items.json Field Reference

```json
{
  "id": 1,
  "animationId": 0,           // 0=none, -1=weapon animation, N=Animations database ID
  "consumable": true,         // boolean: true=item disappears after use; false=reusable
  "damage": {
    "critical": false,        // boolean — can this item critically hit?
    "elementId": 0,           // -1=weapon element, 0=none, 1–9=element IDs
    "formula": "0",           // ✅ IS JavaScript (same context vars as skills)
    "type": 0,                // 0=none, 1=HP dmg, 2=MP dmg, 3=HP heal, 4=MP heal, 5=HP drain, 6=MP drain
    "variance": 20            // integer; % randomization range
  },
  "description": "...",       // Display text; NOT JS
  "effects": [                // Array of effect objects; ALL integer fields; NOT JS
    {"code": 11, "dataId": 0, "value1": 0, "value2": 100}
  ],
  "hitType": 0,               // 0=certain, 1=physical, 2=magical
  "iconIndex": 176,           // Icon ID from iconset
  "itypeId": 1,               // 1=regular item, 2=key item  ← MOST IMPORTANT FIELD
  "name": "Acetaminophen",    // Display name
  "note": "",                 // Notetag string; see Notetags section
  "occasion": 0,              // 0=always, 1=battle only, 2=menu only, 3=never
  "price": 50,                // Shop buy price; integer
  "repeats": 1,               // How many times the effect applies
  "scope": 7,                 // Target scope (same enum as skills; see below)
  "speed": 0,                 // Turn order modifier
  "successRate": 100,         // Base success chance %; integer
  "tpGain": 0                 // TP gained by user when item is used
}
```

**Note**: Items share the same `scope`, `occasion`, `hitType`, and `damage.type` enumerations as skills.
See the `skills` skill file for those tables. Items do NOT have `stypeId`, `mpCost`, `tpCost`, or `tpGain` on target.

---

## Scope Reference (same as skills)
| Value | Targets |
|---|---|
| 0 | None |
| 1 | One enemy |
| 2 | All enemies |
| 7 | One ally |
| 8 | All allies |
| 9 | One dead ally (revive) |
| 10 | All dead allies (revive) |
| 11 | User only |

## Effects Array (same codes as skills)
Each entry: `code`, `dataId`, `value1`, `value2` — ALL integers, NOT JS.

| code | Effect | dataId | value1 | value2 |
|---|---|---|---|---|
| 11 | Recover HP | 0 | Flat HP | % of max HP (0.0–1.0) |
| 12 | Recover MP | 0 | Flat MP | % of max MP (0.0–1.0) |
| 13 | Gain TP | 0 | TP amount | 0 |
| 21 | Add Buff | param ID (0–7) | Turns | 0 |
| 22 | Add Debuff | param ID (0–7) | Turns | 0 |
| 41 | Add State | state ID | Chance (0.0–1.0) | 0 |
| 42 | Remove State | state ID | 0 | 0 |
| 51 | Common Event | event ID | 0 | 0 |

**Param IDs**: 0=mhp, 1=mmp, 2=atk, 3=def, 4=mat, 5=mdf, 6=agi, 7=luk

**Example — Acetaminophen (full HP heal to one ally):**
```json
{"code": 11, "dataId": 0, "value1": 0, "value2": 100}
```
In this game's data, `value2: 100` represents 100% max HP recovery.
**Follow the existing items' `value2` convention** when adding new HP/MP recovery effects —
match the scale used in the actual file (whole number 100 = 100%, not decimal 1.0).


---

## ⚠️ Mechanical Constraints — Battle Items Must Be Implementable

### The Core Rule

Items follow the same constraint as skills: **flavor text is unlimited; game mechanics must be achievable**.
A funny item description is unlimited. The actual *effect* of using the item must map to
available engine primitives: HP/MP recovery, states, buffs, debuffs, or common events.

> ✅ "Acme Rabinex™: Guaranteed to cure rabies or your money back! Side effects include speaking in tongues."
> *(Funny flavor. The actual mechanic: `effects[]` code 11, HP recovery to one ally.)*

> ❌ "Quantum Gut Optimizer: Rearranges target's internal organs into a more efficient configuration,
> permanently raising all stats by 10%."
> *(Permanent stat increases via items are not directly supported mid-battle. Use Grow effect code 32 for +1 permanent,
> or apply a buff with code 21 for turns-based increases.)*

### What Battle Items CAN Do

| Mechanic | How to Implement |
|---|---|
| Restore HP (flat or %) | `effects[]` code 11; `damage.type 3` + formula |
| Restore MP (flat or %) | `effects[]` code 12; `damage.type 4` + formula |
| Deal HP damage | `damage.type 1` + `damage.formula` (IS JS) |
| Inflict a state (Diarrhea, Hyped, etc.) | `effects[]` code 41, dataId=state ID, value1=chance |
| Remove a state | `effects[]` code 42, dataId=state ID |
| Buff a stat (turns-based) | `effects[]` code 21, dataId=param ID, value1=turns |
| Debuff a stat (turns-based) | `effects[]` code 22, dataId=param ID, value1=turns |
| Trigger a Common Event | `effects[]` code 51, dataId=event ID |
| `consumable: false` (reusable) | Set `consumable: false`; item stays in inventory after use |

### What Battle Items CANNOT Do

| Claimed Effect | Reality |
|---|---|
| Instantly change equipment | Equipment changes via events only |
| Award gold or experience mid-battle | Handled by battle end |
| "Permanently" raise all stats by X% | No such item effect; Grow (code 32) adds +1 to ONE param permanently |
| Spawn a party member | No actor addition mid-battle |
| Cause a branching story event during battle | Events can only be triggered via code 51 (Common Event); run after battle |

---

## ⚠️ Animation Constraint — Battle Items Must Be Visually Animated

**Applies only to `itypeId: 1` items with `occasion: 0` or `occasion: 1`.**
Key items (`itypeId: 2`) are never used in battle — skip this section for them.

### Option 1: Set animationId

```json
"animationId": 49   // Play animation 49 (e.g., healing sparkle) on use
```
- `0` = no animation (avoid for items used in battle)
- `-1` = weapon animation (unusual for items; use sparingly)
- `N` = any animation from the Animations database

### Option 2: Action Sequences in note

Items support the same YEP action sequence system as skills. Commands are NOT JavaScript.

**Minimal healing item sequence:**
```
<target action>
motion item: user
action animation: target
wait for animation
action effect: target
</target action>
```

**Damage item sequence (e.g., thrown grenade):**
```
<whole action>
motion skill: user
animation N: targets
wait for animation
action effect: targets
</whole action>
```

### Option 3: Copy a Skill's Sequence

```
<action copy: skill:11>
```
Copies all action sequence phases from Skill 11. Useful when an item's animation
matches an existing skill.

---

## YEP Notetags for Items

All notetag text in `note` is a literal string — NOT JavaScript — unless marked ✅ JS.

| Notetag | JS? | Plugin | Description |
|---|---|---|---|
| `<action copy: skill:N>` | ❌ NO | YEP_BattleEngineCore | Copy action sequence from skill N |
| `<action copy: item:N>` | ❌ NO | YEP_BattleEngineCore | Copy action sequence from item N |
| `<Custom Use Effect>` … `</Custom Use Effect>` | ✅ YES (Lunatic) | YEP_ItemCore | JS block run when item is used; vars: `user`, `target`, `item` |
| `<Cannot be Sold>` | ❌ NO | YEP_ShopMenuCore | Item cannot be sold in shops |
| `<Price: N>` | ❌ NO | YEP_ItemCore | Override item price in notetag |

---

## MegaEarth2049 Items Reference

### All Battle Items (itypeId 1) — Need Animations for Battle Use

| ID | Name | scope | effects summary |
|---|---|---|---|
| 1 | Acetaminophen | 7 (one ally) | HP recovery (100% max HP) |
| 2–6 | (other battle items) | varies | Check Items.json for current data |

**Acetaminophen full data:**
```json
{
  "id": 1, "itypeId": 1, "consumable": true,
  "animationId": 0,
  "scope": 7, "occasion": 0, "hitType": 0,
  "damage": {"formula": "0", "type": 0, "elementId": 0, "variance": 20},
  "effects": [{"code": 11, "dataId": 0, "value1": 0, "value2": 100}],
  "description": "Corporate pain relief that keeps you working through injuries. Side effects include loyalty and decreased critical thinking.",
  "price": 50, "successRate": 100
}
```
Note: `animationId: 0` — this item currently has no battle animation. When adding new battle items, set a real animationId.

### Key Items (itypeId 2) — No Animation Needed

Key items are purely story/quest items. They appear in the Key Items inventory tab and
**cannot be used in battle** regardless of their `occasion`, `effects[]`, or other fields.

Examples: Necklace Piece 1–3 (IDs 10–12), engine parts, quest keys.
`consumable: false` on key items means they stay in the inventory after quest use.

---

## Adding a New Item — Checklist

1. **Determine type**: `itypeId: 1` for battle/menu item; `itypeId: 2` for key item
2. **Set occasion**: `0`=always (menu+battle), `1`=battle only, `2`=menu only, `3`=never
3. **If battle-usable (itypeId 1, occasion 0 or 1)**:
   - Set a non-zero `animationId` OR add action sequences in `note`
   - Define `effects[]` with integer codes (NOT JS formulas)
   - Set appropriate `scope` for the target
4. **If key item (itypeId 2)**:
   - `consumable: false` (usually)
   - `effects: []` (empty — will never trigger)
   - `occasion: 0` (doesn't matter, but 0 is standard)
   - No animation needed
5. **Description**: flavor text is unlimited; side effects can be absurd/funny
6. **Mechanics**: must map to real engine capabilities (see Constraints section above)

*See also: skills (shared damage/effects system), plugins (YEP notetag details), states (state IDs for inflicting conditions)*

