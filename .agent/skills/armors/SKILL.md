---
name: armors
description: Use when creating or modifying armors in data/Armors.json for MegaEarth2049. Covers JS vs notetag distinction (nothing in armors is JS), Armors.json field reference, atypeId and etypeId tables, params array, traits codes used, and a complete reference of all 60 named armors. Armors have NO notetags in this game — all configuration is done through params and traits arrays only.
---

For new equipment icons, follow the shared [atlas-packing workflow](../graphics/references/atlas-packing.md). Inspect the exact32px runtime cell as well as the master.

Before offering an outfit, test native `changeEquip` on an eligible current party member. `etypeId` chooses a slot; `atypeId` must also match an allowed armor type. Type0 does not mean universally wearable. For combined-outfit reactions require both pieces on the same relevant party member, and verify unequipping, split outfits, reserved members and original NPC services. Read live records rather than relying on the historical catalog below.

## ⚠️ JS vs Notetags — The Critical Distinction

**Armors have NO notetags in MegaEarth2049.** Every armor entry has an empty `note` field (`""`).
All armor configuration is done through `params[]` and `traits[]` — both of which are pure data arrays
with no formula/JavaScript support.

| Location | IS JavaScript? | Notes |
|---|---|---|
| `note` field | ❌ NOT JS | Always `""` in this game — no notetags on any armor |
| `params[]` | ❌ NOT JS | Array of 8 integers; flat stat bonuses only |
| `traits[].code/dataId/value` | ❌ NOT JS | All numbers; no formula support |
| `price`, `atypeId`, `etypeId` | ❌ NOT JS | Integer fields only |
| `description` | ❌ NOT JS | Display text in equip menu |
| `<Custom X>` … `</Custom X>` (Lunatic) | ✅ YES | Would work if added — but none exist in the current data |

**No animation constraint**: Armors are equip items, not battle actions. They do not require an `animationId`.

---

## Armors.json Field Reference

```json
{
  "id": 5,
  "name": "Trench Coat",
  "atypeId": 1,        // Armor type; gates which classes can equip it (see atypeId table)
  "etypeId": 4,        // Equipment slot this armor goes in (see etypeId table)
  "price": 1000,       // Shop buy price; integer
  "params": [15,15,5,5,5,5,5,5],  // Flat stat bonuses [mhp,mmp,atk,def,mat,mdf,agi,luk]
  "description": "Not quite like the Matrix movies. Wearing this will\nmake anyone look like a creeper.",
  "note": "",          // Always empty in this game
  "traits": [
    {"code": 23, "dataId": 2, "value": 1.5},  // REC ×1.5 (sp-param recovery rate)
    {"code": 32, "dataId": 8, "value": 0.05}  // Attack State: 5% chance to apply state ID 8 on hit
  ]
}
```

### params array index reference (same as weapons)
| Index | Stat |
|---|---|
| 0 | mhp (Max HP) |
| 1 | mmp (Max MP) |
| 2 | atk (Attack) |
| 3 | def (Defense) |
| 4 | mat (Magic Attack) |
| 5 | mdf (Magic Defense) |
| 6 | agi (Agility) |
| 7 | luk (Luck) |

---

## Armor Type (atypeId) Reference

Controls which classes can equip the armor. Each class has an `armorTypes` list.

| atypeId | Category | Notes |
|---|---|---|
| 0 | Heavy Armor | Most color-coded gear sets (Red, Yellow, Purple, Blue, Green, Black) |
| 1 | Light Armor / Clothing | Hat, Trench Coat, Ring, many shoes and pants |
| 3 | Special / Accessory | Nice Hat, Running Shoes, Rad Cargo Shorts, misc accessories |
| 4 | Medium Armor | Heavy Armored Pants/Shorts, Protective Vest |
| 5 | Shield | Riot Shield only |

---

## Equipment Slot (etypeId) Reference

Controls which equipment slot the armor occupies on the actor.

| etypeId | Slot | Typical armor types |
|---|---|---|
| 1 | Weapon | (weapons only — not used in Armors.json) |
| 2 | Shield / Off-Hand | Riot Shield |
| 3 | Helmet / Head | Hat, Nice Hat, Red/Yellow/Purple/Blue/Black Helmets |
| 4 | Body / Jacket | Trench Coat, Red/Yellow/Purple/Blue/Green/Black Jackets |
| 5 | Gloves / Hands | Red/Yellow/Purple/Blue/Green/Black/Nice Gloves |
| 6 | Pants / Legs | Red/Yellow/Purple/Blue/Green/Black Pants, Shorts |
| 7 | Shoes / Feet | Running Shoes, Red/Yellow/Blue Shoes, Rad Kicks, Work Boots |
| 8 | Ring / Accessory | Ring |

**Note**: etypeId 1 is reserved for weapons and does not appear in Armors.json.

---

## Traits Codes Used on Armors

### code 22 — Ex-Param Rate (xparam)
The most common armor trait — almost every armor has it.
`dataId 1` = EVA (evasion rate); `value` = additive modifier.

```json
{"code": 22, "dataId": 1, "value": 0}      // no EVA bonus (most armors)
{"code": 22, "dataId": 1, "value": 0.03}   // Nice Hat: +3% EVA
{"code": 22, "dataId": 1, "value": 0.05}   // Running Shoes: +5% EVA
```

### code 23 — Sp-Param Rate (sparam)
Special parameter multiplier. Only on Trench Coat.
`dataId 2` = REC (HP/MP recovery rate); `value 1.5` = heals 150% effective.

```json
{"code": 23, "dataId": 2, "value": 1.5}   // Trench Coat: recovery effects 50% stronger
```

### code 32 — Attack State
Applies a state on normal attack with given probability.
Only on Trench Coat: `dataId 8` = state ID 8, `value 0.05` = 5% chance.

```json
{"code": 32, "dataId": 8, "value": 0.05}  // Trench Coat: 5% chance to inflict state #8 on attack
```

---

## MegaEarth2049 Armors Reference

### Notable / Stat-Bearing Armors (price > 0 or significant traits)

| ID | Name | atypeId | etypeId | Key params | Key traits |
|---|---|---|---|---|---|
| 1 | Riot Shield | 5 | 2 | +100 def | EVA +0 |
| 2 | Hat | 1 | 3 | +10 def | EVA +0 |
| 4 | Ring | 1 | 8 | +10 mat | EVA +0 |
| 5 | Trench Coat | 1 | 4 | +15 all stats | REC ×1.5 + 5% state on hit |
| 6 | Nice Hat | 3 | 3 | +20 hp/mp, +5 all | EVA +3% |
| 7 | Running Shoes | 3 | 7 | +20 hp/mp, +5 all | EVA +5% |
| 8 | Red Gloves | 0 | 5 | +35 hp/mp, +5/7 | EVA +0 |
| 9 | Red Pants | 0 | 6 | +110 hp/mp, +8/10 | EVA +0 |
| 10 | Red Jacket | 0 | 4 | +110 hp/mp, +8/10 | EVA +0 |
| 11 | Red Helmet | 3 | 3 | +35 hp/mp, +5/7 | EVA +0 |
| 12 | Yellow Gloves | 1 | 5 | +25 hp/mp, +3/4 | EVA +0 |
| 13 | Yellow Pants | 1 | 6 | +100 hp/mp, +5/7 | EVA +0 |
| 14 | Yellow Helmet | 1 | 3 | +25 hp/mp, +3/4 | EVA +0 |
| 15 | Yellow Jacket | 1 | 4 | +100 hp/mp, +5/7 | EVA +0 |
| 16 | Purple Gloves | 0 | 5 | +65 hp/mp, +13/16 | EVA +0 |
| 17 | Purple Pants | 0 | 6 | +165 hp/mp, +16/18 | EVA +0 |
| 18 | Purple Helmet | 0 | 3 | +65 hp/mp, +13/16 | EVA +0 |
| 19 | Purple Jacket | 0 | 4 | +165 hp/mp, +16/18 | EVA +0 |
| 20 | Blue Gloves | 0 | 5 | +47 hp/mp, +8/10 | EVA +0 |
| 21 | Blue Pants | 0 | 6 | +125 hp/mp, +11/13 | EVA +0 |
| 22 | Blue Helmet | 0 | 3 | +47 hp/mp, +8/10 | EVA +0 |
| 23 | Blue Jacket | 0 | 4 | +125 hp/mp, +10/13 | EVA +0 |
| 24 | Green Gloves | 0 | 5 | +55 hp/mp, +10/12 | EVA +0 |
| 25 | Green Pants | 0 | 6 | +150 hp/mp, +14/18 | EVA +0 |
| 26 | Green Jacket | 0 | 4 | +150 hp/mp, +14/18 | EVA +0 |
| 27 | Black Gloves | 0 | 5 | +80 hp/mp, +16/20 | EVA +0 |
| 28 | Black Pants | 0 | 6 | +180 hp/mp, +21/25 | EVA +0 |
| 29 | Black Jacket | 0 | 4 | +180 hp/mp, +21/25 | EVA +0 |
| 30 | Black Halmet | 0 | 3 | +80 hp/mp, +16/20 | EVA +0 |
| 31 | Red Shoes | 0 | 7 | +35 hp/mp, +5/7 | EVA +0 |
| 32 | Yellow Shoes | 1 | 7 | +25 hp/mp, +3/4 | EVA +0 |
| 60 | Blue Shoes | 1 | 7 | +47 hp/mp, +8/10 | EVA +0 |
| 61 | Green Helmet | 0 | 2 | +55 hp/mp, +10/12 | EVA +0 |



### Zero-Stat Armors (IDs 41–59, params all 0)
These armors exist for visual/equip purposes only — they grant no stat bonuses.
Use them as costume pieces or starter gear that the player will replace quickly.

| ID | Name | atypeId | etypeId |
|---|---|---|---|
| 41 | Armortech Helmet | 0 | 6 |
| 42 | Heavy Armored Pants | 4 | 6 |
| 43 | Heavy Armored Shorts | 4 | 6 |
| 44 | Rad Cargo Shorts | 3 | 6 |
| 45 | Kinda Lame Cargo Shorts | 3 | 6 |
| 46 | Tight Orange Pants | 1 | 6 |
| 47 | Rad Kicks | 1 | 7 |
| 48 | Tan Cargo Pants | 0 | 6 |
| 49 | Nice Gloves | 0 | 5 |
| 50 | Hard Hat | 0 | 3 |
| 51 | Work Boots | 0 | 7 |
| 52 | Killer Orange Jacket | 0 | 4 |
| 53 | Killer White Jacket | 0 | 4 |
| 54 | Killer Blue Jacket | 0 | 4 |
| 55 | Neat Helmet | 0 | 3 |
| 56 | Killer Gloves | 0 | 5 |
| 57 | Killer Helmet | 0 | 3 |
| 58 | Coolt White Helmet | 0 | 3 |
| 59 | Protective Vest | 4 | 4 |

**Note**: IDs 3, 33–40 are absent (gaps in the array) — do not use those IDs for new armors.

---

## ⚠️ Mechanical Constraints — What CAN and CANNOT Be Done

Armors grant passive effects via `params[]` and `traits[]`. There is no action or formula support.

| CAN do | How |
|---|---|
| Flat stat bonuses (HP, MP, ATK, DEF, MAT, MDF, AGI, LUK) | `params[]` array |
| Evasion rate boost/penalty | `traits` code 22, dataId 1 |
| Recovery rate multiplier | `traits` code 23, dataId 2 |
| Chance to inflict state on normal attack | `traits` code 32, dataId = state ID |
| Element resistance/weakness | `traits` code 11, dataId = element ID |
| Parameter rate multiplier (stat %) | `traits` code 21, dataId = param ID |
| TP/MP regen | `traits` code 22, dataId 8 (MRG) or 9 (TRG) |

| CANNOT do | Reason |
|---|---|
| Conditional effects (e.g., "if HP < 50%") | No formula support in traits |
| Effects that trigger on skill use (not normal attack) | Use states or skill notetags instead |
| Passive skill grants | Use actor/class learnings instead |
| Custom Lunatic Mode JS | No notetags on current armors; would need to add one |

---

## Adding a New Armor — Checklist

1. **Choose `atypeId`** — must match what the target class(es) can equip (see `classes` skill)
2. **Choose `etypeId`** — determines which equip slot it occupies (see etypeId table above)
3. **Set `params`** — `[mhp, mmp, atk, def, mat, mdf, agi, luk]`; use existing armors of the same tier/slot as a baseline
4. **Add traits** — at minimum add `{"code": 22, "dataId": 1, "value": 0}` (EVA, even if 0) to match all other armors
5. **Leave `note` empty** (`""`) — no notetags are used on armors in this game
6. **Set `price`** — 0 for story/costume pieces; see color-set pricing for combat gear (Red≈100–150, Black≈400)
7. **Pick next available ID** — next free ID after 61 (skip IDs 3, 33–40 which are empty/gaps)

*See also: classes (armor type equip restrictions), actors (starting equipment), system (armor type names and IDs)*
