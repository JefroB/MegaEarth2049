---
name: weapons
description: Use when creating or modifying weapons in data/Weapons.json for MegaEarth2049. Covers JS vs notetag distinction, Weapons.json field reference, wtypeId table, params array, animationId, Weapon Image and Weapon Motion notetags, traits codes, and a complete reference of all 52 named weapons by type. The Weapon Image and Weapon Motion notetags are NOT JavaScript.
---

For weapon icons, projectiles and packed props, follow the shared [atlas-packing workflow](../graphics/references/atlas-packing.md). Preserve complete cables, handles, tips and separate pieces; never repair clipping by deleting components.

For battle animation production, projectile arcs, on-screen sizing, impact timing, or Yanfly action-sequence integration, use [battle-animation](../battle-animation/SKILL.md). It covers active-plugin verification and testing against the existing custom boss stack.

## ⚠️ JS vs Notetags — The Critical Distinction

| Location | IS JavaScript? | Context Variables | Notes |
|---|---|---|---|
| `<Weapon Image: N>` | ❌ NOT JS | — | N = icon/image index; sets the weapon sprite on battler. Literal integer string. |
| `<Weapon Motion: X>` | ❌ NOT JS | — | X = thrust, swing, or missile (NOT JS, literal keyword). Controls attack animation pose. |
| `animationId` | ❌ NOT JS | — | Integer ID from Animations database; played on target when weapon attacks |
| `traits[].code/dataId/value` | ❌ NOT JS | — | All numbers; no formula support in traits |
| `params[]` | ❌ NOT JS | — | Array of 8 integers; flat stat bonuses |
| `price`, `wtypeId` | ❌ NOT JS | — | Integer fields only |
| `description` | ❌ NOT JS | — | Display text in equip menu; NOT JS |
| `note` notetags | ❌ NOT JS | — | Literal strings parsed by regex |
| `<Custom X>` … `</Custom X>` (Lunatic Mode) | ✅ YES | varies per block | YEP plugin-specific JS blocks; see plugins skill |

**Key point**: `<Weapon Motion: missle>` (the typo "missle" without second 's') appears in many weapons
in the actual data. Both spellings work — use the same typo if copying an existing weapon to be consistent,
but "missile" is the correct YEP notetag value.

---

## Weapons.json Field Reference

```json
{
  "id": 1,
  "name": "Switchblade",
  "wtypeId": 1,           // Weapon type ID; gates which classes can equip it (see wtypeId table)
  "price": 50,            // Shop buy price; integer
  "animationId": 6,       // Animation database ID played on target when attacking; 0=none, -1=default
  "params": [0,0,8,0,0,0,2,0],  // Flat stat bonuses [mhp, mmp, atk, def, mat, mdf, agi, luk]
  "description": "",      // Equip menu text; NOT JS
  "note": "<Weapon Image: 1>\n<Weapon Motion: thrust>",  // Notetag string; NOT JS
  "traits": [
    {"code": 31, "dataId": 1, "value": 0},   // Attack type: Physical (code 31 = attack type)
    {"code": 22, "dataId": 0, "value": 0.05} // HIT rate +5% (code 22 = xparam, dataId 0 = HIT)
  ]
}
```

### params array index reference (same for weapons and armors)
| Index | Stat | Common name |
|---|---|---|
| 0 | mhp | Max HP |
| 1 | mmp | Max MP |
| 2 | atk | Attack |
| 3 | def | Defense |
| 4 | mat | Magic Attack |
| 5 | mdf | Magic Defense |
| 6 | agi | Agility |
| 7 | luk | Luck |

---

## Weapon Type (wtypeId) Reference

| wtypeId | Category | Example Weapons | Notes |
|---|---|---|---|
| 1 | Knife / Blade | Switchblade, Shank, Big Ass Knife, Chainsaw | Thrust or swing motion |
| 3 | Thrown | Throwing Knives | Missile motion |
| 5 | Whip | Gnarly Whip | Swing motion |
| 6 | Rod / Staff | Healing Rod, Taser Stick, Lead Pipe | Swing motion |
| 8 | Bludgeon | Luisville Slugger | Swing motion |
| 9 | Handgun / Pistol | Shotgun, Gun, Rifle, M.I. Ice Pistol | Missile motion |
| 10 | Club | Club | Swing motion |
| 11 | Fist / Thrown Object | Spiked Gloves, Bible, Koran | Thrust or missile motion |
| 12 | Special | Yo-Yo, Slingshot | Thrust or missile motion |
| 13 | Heavy Weapon / Machine Gun | BFG, SAW, M1, AK, Railgun, etc. | Missile motion; most heavy ordnance |

**Which classes can equip which types**: See `classes` skill — each class lists its allowed `wtypeId` values.

---

## Weapon Motion Values

`<Weapon Motion: X>` controls the attacker's battler animation during the Attack command.

| Motion | When used |
|---|---|
| `thrust` | Stabbing/forward-lunge weapons (knives, rods, yo-yo) |
| `swing` | Swinging weapons (bats, clubs, swords, whips, chainsaws) |
| `missile` | Ranged/thrown weapons (guns, throwing knives, books) |

**Common data typo**: Many weapons in the file use `<Weapon Motion: missle>` (missing 's').
Both work in game, but match the typo when editing existing entries to avoid inconsistency.

---

## Traits Codes Used on Weapons

### code 31 — Attack Type
Every weapon in the game has this trait.
`dataId 1` = Physical attack type (as opposed to magical).
```json
{"code": 31, "dataId": 1, "value": 0}
```

### code 22 — Ex-Param Rate (extended parameter modifier)
Additive modifier. `dataId 0` = HIT (hit rate).
```json
{"code": 22, "dataId": 0, "value": 0.05}   // +5% HIT rate
{"code": 22, "dataId": 0, "value": 0}       // no HIT bonus
```
Knives/blades typically grant +5% HIT. Guns and heavy weapons grant +0% (rely on base HIT).

### code 55 — Unknown / Plugin Trait
Appears on Pea Shooter (ID 14) and Pee Shooter (ID 22): `{"code":55,"dataId":1,"value":1}`
Exact effect unclear; likely a YEP plugin-specific trait. Do not add this unless you know its effect.

---

## MegaEarth2049 Weapons Reference

### Blades (wtypeId 1)
| ID | Name | atk | agi | animationId | Motion |
|---|---|---|---|---|---|
| 1 | Switchblade | +8 | +2 | 6 | thrust |
| 12 | Shank | +7 | +2 | 6 | thrust |
| 18 | Big Ass Knife | +8 | +2 | 6 | swing |
| 7 | Chainsaw | +0 | +0 | 23 | swing |

### Handguns / Pistols (wtypeId 9)
| ID | Name | atk | animationId | Notes |
|---|---|---|---|---|
| 3 | Shotgun | +15 | 111 | |
| 4 | Gun | +10 | 111 | |
| 13 | Rifle | +15 | 111 | "missle" typo |
| 14 | Pea Shooter | +15 | 111 | code 55 trait |
| 22 | Pee Shooter | +15 | 111 | code 55 trait |
| 50 | M.I. Ice Pistol | +10 | 0 | animationId 0 — no animation! |

### Heavy Weapons / Machine Guns (wtypeId 13)
| ID | Name | atk | animationId |
|---|---|---|---|
| 21 | Belt Fed Machine Gun | +10 | 111 |
| 23 | BFG | +10 | 111 |
| 24 | S.A.W. | +10 | 111 |
| 25–34 | M1, M16, AK, Snipetastic, M17, UZI, Gnarly MG, Gnarly AK, Old Sniper, SemiAuto | +10 | 111 |
| 35–49 | Sci-fi variants (Hand Laser, Pulse Canon, Fire Pistol, Ice Pistol, etc.) | +10 | 111 or 155 |
| 51–52 | Fire Shotgun, Snow Trooper's Rifle | +10 | 111 |

### Specialty Weapons
| ID | Name | wtypeId | atk | animationId | Notes |
|---|---|---|---|---|---|
| 2 | Spiked Gloves | 11 | +7 | 1 | Fist weapon |
| 5 | Healing Rod | 6 | +0 | 41 | Staff; used by Priest |
| 6 | Gnarly Whip | 5 | +0 | 1 | |
| 8 | Luisville Slugger | 8 | +0 | 1 | Bat |
| 9 | Bible | 11 | +0 | 37 | Thrown book; missile motion |
| 10 | Koran | 11 | +0 | 37 | Thrown book; missile motion |
| 11 | Throwing Knives | 3 | +0 | 6 | wtypeId 3 |
| 15 | Yo-Yo | 12 | +7 | 1 | |
| 16 | Taser Stick | 6 | +7 | 1 | |
| 17 | Lead Pipe | 6 | +7 | 1 | |
| 19 | Slingshot | 12 | +8 | 1 | +2 agi, +5% HIT |
| 20 | Club | 10 | +7 | 1 | |

---

## Adding a New Weapon — Checklist

1. **Set `wtypeId`** to match the appropriate category (see table above)
2. **Set `animationId`** — match similar weapons (most guns use 111); 0 = no animation (avoid)
3. **Set `params`** — `[0,0,atk,0,0,0,agi,0]` is the standard pattern for physical weapons
4. **Add standard traits** — all weapons need both:
   - `{"code": 31, "dataId": 1, "value": 0}` (Physical attack type)
   - `{"code": 22, "dataId": 0, "value": X}` (HIT rate; 0.05 for blades, 0 for guns)
5. **Set `note` with `<Weapon Image: N>`** — N = icon index in the weapon image sheet
6. **Set `note` with `<Weapon Motion: X>`** — thrust, swing, or missile
7. **Check class equip restrictions** — see `classes` skill for which wtypeId each class allows

*See also: classes (weapon type equip restrictions), actors (starting equipment), system (weapon type IDs), armors (armor slot and type reference)*

