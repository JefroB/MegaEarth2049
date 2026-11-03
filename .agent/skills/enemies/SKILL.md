---
name: enemies
description: Use when creating or modifying enemies in data/Enemies.json for MegaEarth2049. Covers JS vs notetag distinction, Enemies.json field reference, actions array (conditionType table), dropItems structure, traits codes, YEP_EnemyLevels notetags, YEP_X_AnimatedSVEnemies notetags, and a complete reference of all 122 named enemies by category. All notetags on enemies are NOT JavaScript.
---

## ⚠️ JS vs Notetags — The Critical Distinction

| Location | IS JavaScript? | Context Variables | Notes |
|---|---|---|---|
| `<Sideview Battler: filename>` | ❌ NOT JS | — | YEP_X_AnimatedSVEnemies; sets the SV sprite sheet |
| `<Sideview Attack Motion: X>` | ❌ NOT JS | — | thrust, swing, or missile (typo "missle" common in data) |
| `<Sideview Weapon: N>` | ❌ NOT JS | — | Weapon ID; determines attack animation graphic |
| `<Sideview Width: N>` / `<Sideview Height: N>` | ❌ NOT JS | — | Sprite size in pixels |
| `<Show Level>` | ❌ NOT JS | — | YEP_EnemyLevels; displays level in enemy name |
| `<Minimum Level: N>` / `<Maximum Level: N>` | ❌ NOT JS | — | Level range for this enemy |
| `<Positive Level Fluctuation: N>` | ❌ NOT JS | — | Max levels above base that can be randomly added |
| `<Negative Level Fluctuation: N>` | ❌ NOT JS | — | Max levels below base that can be randomly subtracted |
| `<Starting Level Type: N>` | ❌ NOT JS | — | See Starting Level Type table |
| `actions[].conditionType/rating/skillId` | ❌ NOT JS | — | Integer fields; no formula. See actions table. |
| `dropItems[].kind/dataId/denominator` | ❌ NOT JS | — | Integer fields only |
| `traits[].code/dataId/value` | ❌ NOT JS | — | Same trait system as actors/classes/states |
| `params[]` | ❌ NOT JS | — | 8 base stat integers |
| Lunatic Mode `<Custom X>` blocks | ✅ YES | varies | Not used on any current enemy — would work if added |

---

## Enemies.json Field Reference

```json
{
  "id": 117,
  "name": "PunkBoss",
  "battlerName": "Bat",          // Base sprite sheet (for non-SV or fallback)
  "battlerHue": 0,               // 0-360 hue rotation applied to battlerName sprite
  "params": [1000,100,20,35,10,10,10,10],  // [mhp,mmp,atk,def,mat,mdf,agi,luk]
  "exp": 500,                    // EXP awarded on defeat
  "gold": 0,                     // JMU (currency) awarded on defeat
  "note": "<Sideview Battler: punkBoss1>\n<Starting Level Type: 3>\n...",
  "dropItems": [                 // Always exactly 3 slots
    {"kind": 1, "dataId": 14, "denominator": 1},  // 100% drop item ID 14
    {"kind": 1, "dataId": 13, "denominator": 1},  // 100% drop item ID 13
    {"kind": 0, "dataId": 1,  "denominator": 1}   // kind 0 = nothing
  ],
  "actions": [                   // Enemy AI skill list
    {"conditionType": 0, "conditionParam1": 0, "conditionParam2": 0, "rating": 5, "skillId": 1},
    {"conditionType": 0, "conditionParam1": 0, "conditionParam2": 0, "rating": 5, "skillId": 4},
    {"conditionType": 0, "conditionParam1": 0, "conditionParam2": 0, "rating": 5, "skillId": 43}
  ],
  "traits": [
    {"code": 22, "dataId": 0, "value": 0.95},  // HIT 95%
    {"code": 22, "dataId": 1, "value": 0.05},  // EVA 5%
    {"code": 31, "dataId": 1, "value": 0},     // Physical attack type
    {"code": 43, "dataId": 4,  "value": 1},    // Add Skill 4 (editor artifact for enemies)
    {"code": 43, "dataId": 43, "value": 1}     // Add Skill 43 (editor artifact for enemies)
  ]
}
```

---

## actions[] — Enemy AI Structure

Each action is a battle decision the enemy can make. The engine selects based on `rating` (weight).

### conditionType values
| conditionType | Condition | conditionParam1 | conditionParam2 |
|---|---|---|---|
| 0 | Always (no restriction) | 0 | 0 |
| 1 | Turn X to Y | min turn | max turn (same = exact turn) |
| 2 | HP ≤ N% | percentage (0–100) | 0 |
| 3 | MP ≤ N% | percentage (0–100) | 0 |
| 4 | State N is active | state ID | 0 |
| 5 | Party level ≥ N | party level | 0 |
| 6 | Switch N is ON | switch ID | 0 |

**`rating`**: 1–9 (relative weighting). Higher values are selected more often.
Multiple actions with the same conditionType all compete by rating.

### Example: Enemy with conditional skill
```json
// Use Attack (rating 5) always; use Poison Scratch (skillId 3) on turn 2 specifically
{"conditionType": 0, "conditionParam1": 0, "conditionParam2": 0, "rating": 5, "skillId": 1},
{"conditionType": 1, "conditionParam1": 2, "conditionParam2": 2, "rating": 1, "skillId": 3}
```

---

## dropItems[] — Drop Structure

Always exactly 3 slots. Unused slots must have `kind: 0`.

| kind | Meaning | dataId |
|---|---|---|
| 0 | Nothing (empty slot) | ignored |
| 1 | Item | item ID from Items.json |
| 2 | Weapon | weapon ID from Weapons.json |
| 3 | Armor | armor ID from Armors.json |

`denominator` = drop chance = 1/denominator
- `1` = 100% (always drops)
- `3` = 33% chance
- `4` = 25% chance
- `6` = ~17% chance
- `20` = 5% chance

---

## YEP_EnemyLevels Notetags (all NOT JS)

```
<Show Level>                     — Appends " Lv N" to enemy name display
<Minimum Level: 1>               — Lowest possible level
<Maximum Level: 25>              — Highest possible level
<Positive Level Fluctuation: 1>  — Can be up to N levels above base
<Negative Level Fluctuation: 3>  — Can be up to N levels below base
<Starting Level Type: 3>         — How base level is determined (see table)
```

### Starting Level Types
| Type | Meaning |
|---|---|
| 1 | Minimum level |
| 2 | Average of min and max |
| 3 | Random between min and max |
| 4 | Maximum level |
| 5 | Match party's average level (scales to players) |

**Type 5** is the most useful for scalable encounters — the enemy level tracks the party.
Most enemies use Type 3 (random within 1–25). Ninja group uses Type 5.

---

## YEP_X_AnimatedSVEnemies Notetags (all NOT JS)

```
<Sideview Battler: filename>     — SV sprite sheet (from img/sv_enemies/ or similar)
<Sideview Attack Motion: swing>  — "thrust", "swing", or "missile" (typo "missle" is common)
<Sideview Weapon: 1>             — Weapon ID; 0 = no weapon sprite
<Sideview Width: 48>             — Width of each frame in pixels
<Sideview Height: 48>            — Height of each frame in pixels
```

**Note**: Enemies without `<Sideview Battler>` use `battlerName` for a front-view sprite.
Enemies with empty `battlerName: ""` and no Sideview notetag will show nothing — avoid this.

---

## Traits Codes on Enemies

Enemies use the same trait system as actors. Key patterns observed:

| Trait | Meaning | Notes |
|---|---|---|
| `{code:22, dataId:0, value:0.95}` | HIT 95% | Standard on almost all enemies |
| `{code:22, dataId:1, value:0.05}` | EVA 5% | Standard on almost all enemies |
| `{code:22, dataId:0, value:0.6}` | HIT 60% | Bat — very inaccurate |
| `{code:22, dataId:1, value:0.3}` | EVA 30% | Bat — very evasive |
| `{code:31, dataId:1, value:0}` | Physical attack | Most enemies |
| `{code:31, dataId:2, value:0}` | Fire attack | Fire Sprite |
| `{code:31, dataId:5, value:0}` | Water attack | Water Sprite |
| `{code:31, dataId:6, value:0}` | Earth attack | Earth Sprite |
| `{code:31, dataId:7, value:0}` | Wind attack | Wind Sprite |
| `{code:31, dataId:9, value:0}` | Unknown element 9 | Gas Man, Halucination |
| `{code:32, dataId:8, value:0.02}` | 2% chance to inflict state 8 on attack | Halucination |
| `{code:51, dataId:3, value:1}` | Can equip weapon type 3 (Thrown) | Ninja group |
| `{code:43, dataId:N, value:1}` | Add Skill N | PunkBoss — likely editor artifact |



---

## Enemy Reference — All 122 Named Enemies by Category

### params[] index key: [mhp, mmp, atk, def, mat, mdf, agi, luk]

---

### Humanoids (IDs 1–9, 24)

| ID | Name | HP | ATK/DEF | SV Battler | Level Type | Notable |
|---|---|---|---|---|---|---|
| 1 | Doll | 200 | 24/18 | SF_Doll | 3 (random) | Drops item 1 (100%) |
| 3 | Thug | 75 | 30/30 | thug | 3 (random) | No drops |
| 6 | Gas Man | 100 | 20/15 | gasman | 3 (random) | Element 9 (unknown) attack |
| 7 | Soldier | 100 | 10/10 | colonial-soldier | 3 (random) | No drops |
| 8 | Foot Soldier | 100 | 10/10 | colonial-soldier (hue:179) | 3 (random) | No drops |
| 9 | Grafitti Artist | 120 | 10/10 | SF_Thug (hue:147) | 3 (random) | 6 EXP, 2 gold |
| 24 | Puppet | 500 | 25/20 | Puppet | 3 (random) | High HP for tier |

### Organic Creatures (IDs 4–5, 10–11)

| ID | Name | HP | ATK/DEF | SV Battler | Level Type | Notable |
|---|---|---|---|---|---|---|
| 4 | Mutant Plant | 80 | 8/9 | plant-default_orig | 3 (random) | skillId 3 on turn 2 (rating 1); drops item 1 (100%) |
| 5 | Parasite | 70 | 10/10 | SF_Parasite | 3 (random) | Drops item 4 (100%) |
| 10 | Trash Octopus | 130 | 22/10 | mod_mimic_03 | 3 (random) | Drops weapon 8 (100%) |
| 11 | Octonasty | 140 | 100/22 | mod_mimic_03 (hue:43) | 3 (random) | Drops weapon 9 (100%); high ATK |

### Flying (ID 2)

| ID | Name | HP | ATK/DEF | SV Battler | Level Type | Notable |
|---|---|---|---|---|---|---|
| 2 | Bat | 25 | 25/20 | bat260403995 | 1 (min level) | HIT 60%, EVA 30% — evasive outlier |

### Ninjas (IDs 12–18) — All use `<Starting Level Type: 5>` (party-scaling)

| ID | Name | HP | ATK/DEF | Drop | Drop% | Notable |
|---|---|---|---|---|---|---|
| 12 | Green Ninja | 120 | 32/30 | item 1 | 33% | Weapon type 3; missle motion |
| 13 | Pink Ninja | 120 | 50/50 | item 3 | 17% | Highest ATK/DEF in group |
| 14 | Brown Ninja | 120 | 32/30 | item 2 | 25% | — |
| 15 | Blue Ninja | 120 | 20/30 | item 1 | 25% | — |
| 16 | Red Ninja | 120 | 20/30 | item 4 | 25% | 5 EXP / 6 gold |
| 17 | Purple Ninja | 120 | 20/30 | item 1 | 25% | 6 EXP / 5 gold |
| 18 | Ninja (Black) | 120 | 20/20 | item 2 | 25% | — |

All ninjas: `<Sideview Attack Motion: missle>` (typo), `<Sideview Weapon: 1>`, `code:51 dataId:3` (Thrown weapon equip trait).

### Spirits (IDs 19–23)

| ID | Name | HP | ATK/DEF | Element | Level Type | Notable |
|---|---|---|---|---|---|---|
| 19 | Halucination | 2000 | 10/50 | 9 (unknown) | 3 (random) | 2% state 8 on attack; high HP+MP(1000) |
| 20 | Earth Sprite | 1500 | 10/40 | 6 (Earth) | 3 (random) | High HP+MP(750) |
| 21 | Fire Sprite | 1500 | 10/40 | 2 (Fire) | 3 (random) | High HP+MP(750) |
| 22 | Wind Sprite | 1500 | 10/40 | 7 (Wind) | 3 (random) | High HP+MP(750) |
| 23 | Water Sprite | 1500 | 10/40 | 5 (Water) | 3 (random) | High HP+MP(750) |

### Punks (IDs 25–31) — All SV battler punk1–6, swing motion

| ID | Name | HP | ATK/DEF | Weapon Drop | Notable |
|---|---|---|---|---|---|
| 25 | Punk1 | 550 | 25/10 | weapon 1 (5%) | swing, Sideview Weapon 1 |
| 26 | Punk2 | 600 | 23/10 | weapon 1 (5%) | — |
| 27 | Punk3 | 70 | 10/20 | weapon 8 (5%) | Also drops armor 5 (100%); Sideview Weapon 0 |
| 28 | Punk4 | 650 | 25/25 | weapon 1 (5%) | — |
| 29 | Punk5 | 600 | 25/20 | weapon 1 (5%) | — |
| 30 | Punk6 | 700 | 32/30 | weapon 3 (5%) | `missle` motion, Sideview Weapon 15 |
| 31 | Punk7 | 550 | 25/10 | weapon 1 (5%) | 2nd action: skillId 3 (rating 2, always) |


### Animals / Placeholder Enemies (IDs 32–38, 97–100)

Most of these have identical placeholder stats: 30–100 HP, all other stats 10. They need development.

| ID | Name | HP | ATK | SV Battler | Notable |
|---|---|---|---|---|---|
| 32 | Rat | 60 | 12 | rat657494608 | Uses skillId 126 (rating 4, always) |
| 33 | Grey Wolf | 100 | 10 | wolf-grey-sv_orig | — |
| 34 | Blue Slime | 100 | 10 | Slime518641091 | — |
| 35 | Red Slime | 100 | 10 | Slime630683762 | — |
| 36 | Tar | 100 | 10 | Slime767690166 | — |
| 37 | Purple Slime | 100 | 10 | Slime966520927 | — |
| 38 | White Goo | 100 | 10 | Slime112319373 | — |
| 97 | Mouse | 30 | 7 | rat410648364_orig | — |
| 98 | Sewer Rat | 30 | 7 | rat648556256 | 6 EXP / 2 gold |
| 99 | Field Mouse | 30 | 7 | rat8615651156 | 6 EXP / 3 gold |
| 100 | Lab Rat | 30 | 7 | rat960466383 | — |

### Aliens (IDs 39–41)

| ID | Name | HP | SV Battler | Notable |
|---|---|---|---|---|
| 39 | Alien | 100 | Alien210143_orig | battlerName empty — must use SV notetag |
| 40 | Blue Alien | 100 | Alien357178_orig | battlerName empty — must use SV notetag |
| 41 | Young Alien | 100 | Alien7137221_orig | battlerName empty — must use SV notetag |

### Cockatrices (IDs 42–46)

| ID | Name | HP | SV Battler | Notable |
|---|---|---|---|---|
| 42 | Cockatrice | 100 | cockatrice115023772 | — |
| 43 | Yellow Cockatrice | 100 | cockatrice155586115 | battlerName empty |
| 44 | White Cockatrice | 100 | cockatrice259886913 | battlerName empty |
| 45 | Black Cockatrice | 100 | cockatrice446945148 | 0 EXP / 0 gold — placeholder |
| 46 | Blue Cockatrice | 100 | cockatrice756463860 | battlerName empty |

### Drones (IDs 47–71) — Placeholder stats (100 HP, 10 all)

Drone sprites: Drone108499806 and variants. All have battlerName empty — SV notetag required.
IDs 48–71 continue the drone/mechanical creature range (various SV battler filenames).

### Scorpions (IDs 72–77)

| ID | Name | SV Battler |
|---|---|---|
| 72 | Scorpion | Scorpion (variant) |
| 73 | Red Scorpion | Scorpion (variant) |
| 74 | Black Scorpion | Scorpion637723660 |
| 75 | Purple Scorpion | Scorpion564165695 |
| 76 | Blue Scorpion | Scorpion518206421_orig |
| 77 | Fire Scorpion | Scorpion462545871_orig |

All scorpions: 100 HP, 10 all stats, physical attack, no drops.

### Spiders (IDs 78–82)

| ID | Name | SV Battler | EXP | Gold |
|---|---|---|---|---|
| 78 | Giant Spider | spider213583399 | 4 | 6 |
| 79 | Brown Recluse | spider456796641 | 5 | 6 |
| 80 | Huge Spider | spider570665783 | 4 | 5 |
| 81 | Massive Spider | spider776702305_orig | 6 | 7 |
| 82 | Icky Spider | spider930284473 | 5 | 7 |

### Foxes (IDs 83–87)

| ID | Name | SV Battler |
|---|---|---|
| 83 | Orange Fox | fox-orange_1_orig |
| 84 | Sandy Fox | fox-sandy_orig |
| 85 | Red Fox | fox-red_orig |
| 86 | Silver Fox | fox-silver_1_orig |
| 87 | White Fox | fox-white_1_orig |

### Bees & Hornets (IDs 88–92)

| ID | Name | SV Battler |
|---|---|---|
| 88 | Bumble Bee | hornet282287884 |
| 89 | Soldier Bee | hornet458985464 |
| 90 | Bee | hornet467842573 |
| 91 | Worker Bee | hornet733005933 |
| 92 | Hornet | hornet842594948_orig |

### Plants (IDs 93–96) — All use skillId 3 on turn 2 (conditionType 1, rating 1)

| ID | Name | HP | SV Battler | Drop |
|---|---|---|---|---|
| 93 | Mutant House Plant | 30 | plant-green_orig | item 1 (100%) |
| 94 | Flowering Plant | 30 | plant-red_orig | item 1 (100%) |
| 95 | Winter Plant | 30 | plant-white_orig | item 1 (100%) |
| 96 | Wilted Plant | 30 | plant-wilted_orig | item 1 (100%) |

Note: Sideview Battler on plants uses no space after colon: `<Sideview Battler:plant-green_orig>` — this is valid.

### Three-Tailed Foxes (IDs 101–105) — Placeholder stats (30 HP, 7 ATK)

| ID | Name | SV Battler |
|---|---|---|
| 101 | Firefox | 3-tailed-fox-fire_1_orig |
| 102 | Hellspawn Fox | 3-tailed-fox-hellspawn_1_orig |
| 103 | Arctic Fox | 3-tailed-fox-ice_1_orig |
| 104 | Three Tailed Fox | 3-tailed-fox-normal_orig |
| 105 | Nocturnal Fox | 3-tailed-fox-spirit_orig |

### Guardians (IDs 106–109) — All use `dark_lord` SV battlers

| ID | Name | SV Battler | EXP | Gold |
|---|---|---|---|---|
| 106 | Guardian | dark_lord__b_w_ | 4 | 4 |
| 107 | Ice Guardian | dark_lord__b_w_ | 3 | 5 |
| 108 | Golden Guardian | dark_lord__gold_ | 4 | 5 |
| 109 | Green Guardian | dark_lord__green_ | 6 | 5 |

Note: IDs 106 and 107 share the same SV battler (`dark_lord__b_w_`).

### Advanced Protection (IDs 110–114) — All use `demon` SV battlers

| ID | Name | SV Battler | EXP |
|---|---|---|---|
| 110 | Advanced Protection Type 1 | demon-default_1_orig | 4 |
| 111 | Advanced Protection Type 2 | demon-blue_1_orig | 3 |
| 112 | Advanced Protection Type 3 | demon-brown_1_orig | 4 |
| 113 | Advanced Protection Type 4 | demon-red_1_orig | 6 |
| 114 | Advanced Protection Type 1 | demon-white_1_orig | 10 |

Note: IDs 110 and 114 share the same name "Advanced Protection Type 1" — this is a data inconsistency in the source.


---

## Boss Enemies

### Poopoo Caca (ID 115)
- **HP**: 1000 | **ATK/DEF**: 10/10 | **EXP**: 100 | **Gold**: 25
- **battlerName**: `BigPoop` | No SV notetags — uses front-view sprite
- **Actions**: skillId 45 (rating 5, always) → skillId 43 (rating 3, always) → skillId 1 (rating 2, always)
- **Drops**: None (all 3 slots kind 0)
- **Note**: No `<Show Level>`, no YEP_EnemyLevels notetags at all — fixed stats

### Crap (ID 116)
- **HP**: 200 | **ATK/DEF**: 7/7 | **EXP**: 4 | **Gold**: 6
- **battlerName**: `crap` | No SV notetags — uses front-view sprite
- **Actions**: skillId 1 (rating 3, always) → skillId 43 (rating 2, always)
- **Drops**: None (all 3 slots kind 0)
- **Note**: No YEP_EnemyLevels notetags — likely a mini-boss or summon for Poopoo Caca

### PunkBoss (ID 117)
- **HP**: 1000 | **MP**: 100 | **ATK/DEF**: 20/35 | **EXP**: 500 | **Gold**: 0
- **battlerName**: `Bat` (fallback) | **SV Battler**: `punkBoss1`
- **Level Type**: 3 (random), range 1–25
- **Actions**: skillId 1 (rating 5) + skillId 4 (rating 5) + skillId 43 (rating 5) — all always, equal weight
- **Drops**: item 13 (100%) + item 14 (100%)
- **Traits**: HIT 95%, EVA 5%, Physical attack + code 43 entries (editor artifact, no functional impact)
- **Note**: 0 gold is intentional. High DEF (35) relative to ATK (20).

### Foot Soldiers — Boss Encounter Variants (IDs 118–122)
These are scripted fight variants, not regular encounters:
- **EXP**: 0 | **Gold**: 0 | All have identical placeholder stats (100 HP, 10 all)
- Different SV battlers: Soldier9 (122), Soldier10 (121), Soldier11 (120), Soldier12 (119), Soldier13 (118)
- Used in scripted sequences — do not grant rewards on defeat

---

## ⚠️ Mechanical Constraints for Enemies

### CAN do (engine-supported)
| Capability | How |
|---|---|
| Multiple skills in AI pool | Add entries to `actions[]` with different skillIds |
| Conditional skill use | Set conditionType 1–6 with appropriate params |
| Element-typed normal attack | Trait code 31, dataId = element ID |
| State chance on normal attack | Trait code 32, dataId = state ID, value = chance (0.0–1.0) |
| Level scaling to party | `<Starting Level Type: 5>` |
| Drop items/weapons/armors | dropItems[] kind 1/2/3 |
| Custom SV animation | `<Sideview Battler>` + `<Sideview Attack Motion>` + `<Sideview Weapon>` |
| Lunatic Mode JS behavior | `<Custom X>` Lunatic blocks (not currently used but valid) |

### CANNOT do (not supported)
| Impossible | Why |
|---|---|
| Enemy uses a skill from mid-battle | actions[] is set at enemy creation; no dynamic skill adding |
| Enemy "learns" or levels up in battle | YEP_EnemyLevels sets level at battle start, not during |
| Enemy checks specific actor HP | conditionType only checks party-wide state or switches |
| Enemy conditional on own HP (not ≤%) | Only "HP ≤ N%" available — no "HP between X and Y" without two actions |
| Enemy drops gold that scales | `gold` is a fixed integer |
| More than 3 drop slots | dropItems[] is always exactly 3 entries |
| Enemy triggers a map event | In-battle only; map event must be in event page post-battle |
| Enemy talks during battle | No message system for enemies in battle (use YEP_BattleStatusWindow workarounds only) |

---

## Adding a New Enemy — Checklist

1. **Append** to `data/Enemies.json` — use the next available ID (currently max is 122)
2. **Set `params[]`**: `[mhp, mmp, atk, def, mat, mdf, agi, luk]`
3. **Set `exp` and `gold`**: Match tier (see reference tables for typical values)
4. **Set `battlerName`**: Front-view sprite fallback (or leave `""` if SV notetag is set)
5. **Set `battlerHue`**: 0–360 (0 = no change)
6. **Set `actions[]`**: At least one entry with `conditionType: 0, rating: 5, skillId: 1` (basic attack)
   - Add additional skill entries if the enemy should have special moves
   - Use conditionType 1–6 for conditional behaviors
7. **Set `dropItems[]`**: Always exactly 3 objects; use `kind: 0` for empty slots
8. **Set `traits[]`**: Always include:
   - `{"code": 22, "dataId": 0, "value": 0.95}` — HIT
   - `{"code": 22, "dataId": 1, "value": 0.05}` — EVA
   - `{"code": 31, "dataId": 1, "value": 0}` — Attack element (change dataId for elemental enemies)
9. **Write `note`** field with YEP_EnemyLevels notetags (if leveled) and SV notetags (if animated):
   ```
   <Sideview Battler: filename>
   <Sideview Attack Motion: swing>
   <Sideview Weapon: 1>
   <Show Level>
   <Minimum Level: 1>
   <Maximum Level: 25>
   <Positive Level Fluctuation: 1>
   <Negative Level Fluctuation: 3>
   <Starting Level Type: 3>
   ```
10. **Verify SV battler file exists** in `img/sv_enemies/` (or correct path)
11. **If `battlerName` is empty string**, ensure SV Battler notetag is present or enemy will be invisible
12. **Boss enemies**: Consider omitting `<Show Level>` to avoid level display in name
13. **Scalable encounters**: Use `<Starting Level Type: 5>` to track party level
14. **"missle" typo**: If using missile motion, use `<Sideview Attack Motion: missle>` (the typo is expected by the plugin)
