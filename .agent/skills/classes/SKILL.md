---
name: classes
description: Use when editing Classes.json or working with character class data in MegaEarth2049. Covers the original 11 classes and Maintenance Coach (Hacker, Punk, Construction Worker, Priest, Ninja, Mod Doctor, Clown, Thief, Smuggler, Beastman, Advanced Security Protocol), their skill type access, weapon/armor proficiencies, JP rates, level-up skill learnings, and YEP_JobPoints/YEP_SkillLearnSystem/YEP_WeaponUnleash notetags. Includes JS vs notetag distinction for Classes.json.
---

## JS in Classes — What IS and Is NOT JavaScript

| Field/Tag | Is it JS? | Notes |
|---|---|---|
| `note` field content | NOT JS | Parsed as text by YEP plugins via regex |
| `<JP Rate: N%>` | NOT JS | Literal string; sets JP gain multiplier |
| `<Learn Skill: N to M>` | NOT JS | Literal string; YEP_SkillLearnSystem reads it |
| `<Weapon Unleash N%: ID>` | NOT JS | Literal string; YEP_WeaponUnleash reads it |
| `<Guard Unleash N%: ID>` | NOT JS | Literal string; YEP_WeaponUnleash reads it |
| `learnings[].note` | NOT JS | Display text only, not evaluated |
| `params` arrays | NOT JS | Numeric stat tables, not evaluated |
| `traits` array | NOT JS | Numeric codes, not evaluated |
| Event scripts referencing classes | IS JS | `$dataClasses[N]` etc. in Script calls |

---

## Classes.json Field Reference

```json
{
  "id": 1,
  "name": "Hacker",
  "note": "<JP Rate: 107%>\n<Learn Skill: 202 to 222>\n<Weapon Unleash 2%: 3>\n<Guard Unleash 5%: 24>",
  "traits": [
    {"code": 41, "dataId": 2, "value": 0},   // Add Skill Type: Ability(2)
    {"code": 51, "dataId": 1, "value": 1},   // Equip Weapon: Blade(1)
    {"code": 52, "dataId": 1, "value": 0}    // Equip Armor: Clothing(1)
  ],
  "learnings": [
    {"level": 1, "note": "", "skillId": 6},        // Learn skill 6 at level 1
    {"level": 11, "note": "Squad Attack", "skillId": 102}  // note is display-only
  ],
  "params": [                // 8 arrays of 99 values each (levels 1-99)
    [500, 510, ...],         // [0] Max HP
    [200, 205, ...],         // [1] Max MP
    [10, 11, ...],           // [2] ATK
    [8, 9, ...],             // [3] DEF
    [12, 13, ...],           // [4] MAT
    [6, 7, ...],             // [5] MDF
    [9, 10, ...],            // [6] AGI
    [5, 6, ...]              // [7] LUK
  ],
  "expParams": [30, 20, 30, 30]  // EXP curve parameters
}
```

Trait codes relevant to classes: `41`=Add Skill Type, `51`=Equip Weapon, `52`=Equip Armor,
`22`=XParam bonus, `23`=SParam bonus, `11`=Element Rate, `31`=Attack Element, `55`=Special Flag.

---

## Class Summary Table

| ID | Name | JP Rate | Skill Types | Key Notes |
|---|---|---|---|---|
| 1 | Hacker | 107% | Ability(2), Cheer(5) | Weapon Unleash 2%:3, Guard Unleash 5%:24 |
| 2 | Punk | 100% | Ability(2), Tech(3), Cheer(5) | Weapon Unleash 2%:3, Guard Unleash 5%:24 |
| 3 | Construction Worker | 105% | Ability(2), Tech(3), Squad Attack(4), Cheer(5) | All weapon types; fire element attack |
| 4 | Priest | 45% | Ability(2), Incantation(1), Squad Attack(4), Cheer(5) | Weapon Unleash 1%:3 only |
| 5 | Ninja | 100% | Ability(2) | Weapon Unleash 3%:3, Guard Unleash 7%:24 |
| 6 | Mod Doctor | 105% | Ability(2), Tech(3), Cheer(5) | Learn Skill: 202-210, 223 (not full range) |
| 7 | Clown | 95% | Ability(2), Tech(3), Cheer(5) | Weapon Unleash 1%:3, Guard Unleash 5%:24 |
| 8 | Thief | 77% | Cheer(5) | Low JP rate; Weapon/Guard Unleash both present |
| 9 | Smuggler | 105% | Cheer(5) | Minimal learnings (only 1 level-up skill) |
| 10 | Beastman | 99% | Cheer(5) | Learn Skill: 202-210 + 223 separately |
| 11 | Adv. Security Protocol | — | Incantation(1) | Boss/NPC class; no learnings; no note tags |

---

## YEP Notetags on Classes (All Literal Strings — NOT JS)

### YEP_JobPoints — `<JP Rate: N%>`
Sets the JP gain rate for this class. Default = 100%.
```
<JP Rate: 107%>    // Class gains 107% of normal JP per battle
<JP Rate: 45%>     // Priest gains half JP (balances heavy skill selection)
<JP Rate: 77%>     // Thief gains 77% JP
```
- JP text label is "JMU" (configured in plugin params), icon ID 188
- JP is used to unlock skills via YEP_SkillLearnSystem in shops/menus

### YEP_SkillLearnSystem — `<Learn Skill: ...>`
Defines which skills can be PURCHASED with JP in the skill learn menu.
These are NOT automatically learned — the player must spend JP to unlock them.
```
<Learn Skill: 202 to 222>          // Can purchase skills 202-222
<Learn Skill: 202 , 203, 204, 210, 223>  // Specific skill IDs (Mod Doctor)
<Learn Skill: 202 to 210>          // Partial range (Beastman)
<Learn Skill: 223>                 // Single additional skill (Beastman)
```
Most classes get `<Learn Skill: 202 to 222>` (full Cheer skill range).
Mod Doctor and Beastman get limited selections.

### YEP_WeaponUnleash — Class-Level Unleash
Applies a percentage chance that a normal attack or guard triggers a skill instead.
```
<Weapon Unleash N%: SKILL_ID>    // N% chance attack → skill SKILL_ID
<Guard Unleash N%: SKILL_ID>     // N% chance guard → skill SKILL_ID
```
Skill ID 3 = the "Hack" or basic element skill used as a class-flavor attack proc.
Skill ID 24 = guard unleash skill (Rally-type).
These stack with actor-level and weapon-level unleash notetags (same plugin).



---

## Individual Class Details & Learnings

Learnings are skills automatically granted at level-up (no JP cost).
The `note` field in each learning entry is DISPLAY TEXT ONLY — not JS, not parsed by plugins.
Squad Attack skills (IDs 101–121) require `<Party Limit Cost: N>` on the skill itself.

### Class 1 — Hacker
**JP Rate**: 107% | **SkillLearn Range**: 202–222
**Notetags**: `<Weapon Unleash 2%: 3>` `<Guard Unleash 5%: 24>`
**Weapon types**: Blade(1), Knuckles(2), Gun(9)
**Armor types**: Clothing(1), Light Armor(3), ArmorTech(2), Shield(5)

| Level | Skill ID | Note (display only) |
|---|---|---|
| 1 | 6 | — |
| 1 | 44 | — |
| 2 | 32 | — |
| 3 | 10 | — |
| 5 | 48 | — |
| 8 | 52 | — |
| 11 | 102 | Squad Attack |
| 14 | 50 | — |
| 17 | 51 | — |
| 20 | 101 | Squad Attack |
| 23 | 53 | — |
| 26 | 49 | — |
| 29 | 103 | Squad Attack |

---

### Class 2 — Punk
**JP Rate**: 100% | **SkillLearn Range**: 202–222
**Notetags**: `<Weapon Unleash 2%: 3>` `<Guard Unleash 5%: 24>`
**Weapon types**: Blade(1), Knuckles(2)
**Armor types**: Clothing(1), ArmorTech(2)

| Level | Skill ID | Note |
|---|---|---|
| 1 | 1 | Squad Attack |
| 1 | 6 | — |
| 3 | 54 | — |
| 5 | 55 | — |
| 7 | 56 | — |
| 9 | 111 | Squad Attack |
| 11 | 57 | — |
| 13 | 58 | — |
| 15 | 59 | — |
| 17 | 11 | — |
| 20 | 112 | Squad Attack |
| 22 | 60 | — |
| 25 | 110 | — |

---

### Class 3 — Construction Worker
**JP Rate**: 105% | **SkillLearn Range**: 202–222
**Notetags**: `<Weapon Unleash 3%: 3>` `<Guard Unleash 5%: 24>`
**Weapon types**: ALL (Blade, Knuckles, Throwing, Axe, Gun, Sporting Goods, Toy, and more)
**Armor types**: Clothing(1), Light Armor(3), ArmorTech(2), Shield(5), Heavy Armor(6)
**Special**: Attack Element = Fire(1); Preserve TP between battles (code 55)

| Level | Skill ID | Note |
|---|---|---|
| 1 | 6 | — |
| 2 | 61 | — |
| 3 | 68 | — |
| 4 | 62 | — |
| 6 | 14 | — |
| 8 | 63 | — |
| 10 | 114 | Squad Attack |
| 12 | 64 | — |
| 14 | 65 | — |
| 16 | 113 | Squad Attack |
| 18 | 66 | — |
| 20 | 15 | — |
| 22 | 67 | — |
| 27 | 115 | Squad Attack |

---

### Class 4 — Priest
**JP Rate**: 45% | **SkillLearn Range**: 202–222
**Notetags**: `<Weapon Unleash 1%: 3>` (no Guard Unleash)
**Weapon types**: Staff(11)
**Armor types**: Clothing(1) (limited armor options; class trait seals heavier types)

| Level | Skill ID | Note |
|---|---|---|
| 1 | 6 | — |
| 2 | 8 | — |
| 3 | 46 | — |
| 5 | 47 | — |
| 6 | 21 | — |
| 7 | 25 | — |
| 8 | 29 | — |
| 9 | 33 | — |
| 10 | 37 | — |
| 10 | 104 | Squad Attack |
| 12 | 16 | — |
| 15 | 22 | — |
| 15 | 105 | Squad Attack |
| 16 | 26 | — |
| 17 | 30 | — |
| 18 | 34 | — |
| 19 | 38 | — |
| 20 | 17 | — |
| 20 | 106 | Squad Attack |
| 22 | 23 | — |
| 23 | 27 | — |
| 24 | 31 | — |
| 25 | 35 | — |
| 26 | 39 | — |
| 27 | 18 | — |


---

### Class 5 — Ninja
**JP Rate**: 100% | **SkillLearn Range**: 202–222
**Notetags**: `<Weapon Unleash 3%: 3>` `<Guard Unleash 7%: 24>`
**Weapon types**: Blade(1), Throwing(3) (lightweight weapons only)
**Armor types**: Clothing(1) (limited)
**Skill types**: Ability(2) only

| Level | Skill ID | Note |
|---|---|---|
| 1 | 6 | — |
| 1 | 69 | — |
| 8 | 70 | — |
| 10 | 77 | — |
| 11 | 107 | Squad Attack |
| 13 | 72 | — |
| 14 | 73 | — |
| 18 | 74 | — |
| 20 | 108 | Squad Attack |
| 21 | 75 | — |
| 23 | 76 | — |
| 25 | 109 | Squad Attack |

---

### Class 6 — Mod Doctor
**JP Rate**: 105% | **SkillLearn Range**: 202, 203, 204, 205, 206, 207, 208, 209, 210, 223
**Notetags**: `<Weapon Unleash 1%: 3>` (no Guard Unleash)
**Note**: Limited SkillLearn range (202–210 + 223 only, NOT full 202–222)
**Weapon types**: Blade(1)
**Armor types**: ArmorTech(2)
**Skill types**: Ability(2), Tech(3), Cheer(5)

| Level | Skill ID | Note |
|---|---|---|
| 1 | 6 | — |
| 2 | 78 | — |
| 5 | 118 | Squad Attack |
| 7 | 79 | — |
| 9 | 117 | Squad Attack |
| 12 | 82 | — |
| 14 | 116 | Squad Attack |
| 16 | 81 | — |
| 18 | 83 | — |
| 20 | 84 | — |

---

### Class 7 — Clown
**JP Rate**: 95% | **SkillLearn Range**: 202–222
**Notetags**: `<Weapon Unleash 1%: 3>` `<Guard Unleash 5%: 24>`
**Weapon types**: Blade(1)
**Armor types**: ArmorTech(2)
**Skill types**: Ability(2), Tech(3), Cheer(5)

| Level | Skill ID | Note |
|---|---|---|
| 1 | 6 | — |
| 3 | 85 | — |
| 5 | 42 | — |
| 7 | 86 | — |
| 10 | 120 | Squad Attack |
| 13 | 87 | — |
| 17 | 88 | — |
| 20 | 119 | Squad Attack |
| 23 | 89 | — |
| 26 | 90 | — |
| 27 | 91 | — |
| 30 | 121 | Squad Attack |
| 33 | 92 | — |
| 36 | 93 | — |

---

### Class 8 — Thief
**JP Rate**: 77% | **SkillLearn Range**: 202–222
**Notetags**: `<Weapon Unleash 1%: 3>` `<Guard Unleash 5%: 24>`
**Weapon types**: Blade(1)
**Armor types**: ArmorTech(2)
**Skill types**: Cheer(5) [lowest JP rate of all player classes]

| Level | Skill ID | Note |
|---|---|---|
| 1 | 6 | — |
| 2 | 41 | — |
| 4 | 48 | — |
| 6 | 54 | — |
| 8 | 11 | — |
| 10 | 112 | Squad Attack |
| 13 | 61 | — |
| 16 | 62 | — |
| 18 | 71 | — |

---

### Class 9 — Smuggler
**JP Rate**: 105% | **SkillLearn Range**: 202–222
**Notetags**: `<Weapon Unleash 1%: 3>` `<Guard Unleash 5%: 24>`
**Weapon types**: Blade(1)
**Armor types**: ArmorTech(2)
**Skill types**: Cheer(5)
**Note**: Minimal level-up learnings — only 1 skill learned via level-up.

| Level | Skill ID | Note |
|---|---|---|
| 7 | 41 | — |

---

### Class 10 — Beastman
**JP Rate**: 99% | **SkillLearn Range**: 202–210, 223 (two separate notetags)
**Notetags**: `<Learn Skill: 202 to 210>` + `<Learn Skill: 223>` + `<Weapon Unleash 4%: 3>` `<Guard Unleash 5%: 24>`
**Weapon types**: Blade(1)
**Armor types**: ArmorTech(2)
**Skill types**: Cheer(5)
**Note**: Beastman uses TWO separate `<Learn Skill:>` notetags. No level-up learnings defined.

| Level | Skill ID | Note |
|---|---|---|
| (none) | — | All skills acquired via JP/SkillLearn menu |

---

### Class 11 — Advanced Security Protocol
**JP Rate**: N/A (boss/NPC class) | **SkillLearn Range**: none
**Notetags**: (none)
**Weapon types**: (none configured)
**Armor types**: (none configured)
**Skill types**: Incantation(1) only
**Note**: Boss-only class for A.S.P. enemies. No learnings, no YEP notetags.

---

## Learnings Structure — JSON Example

When adding a new level-up skill to a class:
```json
{"level": 15, "note": "Squad Attack", "skillId": 107}
```
- `level`: integer, the level at which the skill is automatically granted
- `skillId`: integer, the skill ID from Skills.json
- `note`: string — **DISPLAY ONLY**, not parsed by any plugin; use for your own reference

Multiple entries can share the same level (the actor learns both skills at that level).

*See also: actors (for actor-class assignments), skills (for skill IDs and types), plugins (for YEP notetag details)*

## Class12 — Maintenance Coach (A26)

MAX-E-MUM’s isolated class: native stat curves derived once from Construction Worker with lower HP/ATK/AGI and stronger DEF; no inherited construction skill grants, JP learn catalog or unleashes. Ability type2, weapon type11 and Clothing armor type1; native95% HIT. Level1 learnings280 Spotter Protocol (DEF buff),281 Active Recovery (state57 Nanite Repair),282 Deload Slam (physical hit). Inspect live data before tuning. Existing classes1–11 are unchanged.
