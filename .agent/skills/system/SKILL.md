---
name: system
description: Use when working with MegaEarth2049 system IDs — elements, skill types, weapon types, armor types, equip types, switches, and variables. Covers data/System.json structure, game title, currency (Credits), and all named IDs used across database objects. Essential when setting elementId, stypeId, wtypeId, atypeId, or etypeId fields in any data file.
---

## Game Identity

```
Game Title:    MegaEarth 2049 A.E.
Currency Unit: Credits
Window Size:   816 × 624
```

---

## Element IDs (System.json → elements, 1-indexed)

Used in skills (`damage.elementId`), traits, and element rate notetags.
`elementId: -1` = attacker's element (auto). `elementId: 0` = no element.

```
0 = (no element)
1 = Physical
2 = Fire
3 = Ice
4 = Thunder
5 = Water
6 = Earth
7 = Wind
8 = Light
9 = Darkness
```

---

## Skill Types (System.json → skillTypes, 1-indexed)

Used in skills (`stypeId`) and class skill type access traits.

```
1 = Incantation    // Magic-style — used for spells/tech attacks
2 = Ability        // Character-specific special moves
3 = Tech           // Technology-based skills
4 = Squad Attack   // Party-limit skills (IDs 101–121); cost <Party Limit Cost: N>
5 = Cheer          // Support and buff skills
```

---

## Weapon Types (System.json → weaponTypes, 1-indexed)

Used in weapons (`wtypeId`) and class weapon proficiency traits.

```
 1 = Blade
 2 = Knuckles
 3 = Throwing
 4 = Axe
 5 = Whip
 6 = Staff
 7 = Bow
 8 = Sporting Goods
 9 = Gun
10 = Tools
11 = Book
12 = Toy
13 = Machine Gun
14 = Rifle
15 = Pea Shooter
16 = Pee Shooter
```

---

## Armor Types (System.json → armorTypes, 1-indexed)

Used in armors (`atypeId`) and class armor proficiency traits.

```
1 = Clothing
2 = ArmorTech
3 = Light Armor
4 = Heavy Armor
5 = Shield
```

---

## Equip Types (System.json → equipTypes, 1-indexed)

Used in weapons and armors (`etypeId`) to determine which equipment slot they occupy.

```
1 = Weapon    // etypeId 1 = weapon slot (weapons use this)
2 = Shield    // etypeId 2 = off-hand / shield slot
3 = Hat
4 = Jacket
5 = Gloves
6 = Pants
7 = Shoes
8 = Accessory
```

Note: YEP_EquipCore allows classes to define custom slot configurations.
The default slots above are the base RPG Maker MV equipment types.

---

## Switches (System.json → switches, 1-indexed)

Use `$gameSwitches.value(N)` in JS; use switch ID N in event conditions.

```
 1 = Oldman1
 2 = Oldman2
 3 = Oldman3
 4 = Oldman4
 5 = Oldman5
 6 = Intro
 7 = Necklace quest started
 8 = Necklace quest ended
 9 = Jen Recruitment
10 = Poopoo Caca
11 = Engine quest started
12 = Engine quest ended
20 = In Mod Center
21 = Beanstalk Access
22 = Alien Encounter Complete
```

(Switches 13–19 and 23 are unnamed/unused)

---

## Variables (System.json → variables, 1-indexed)

Use `$gameVariables.value(N)` in JS; use variable ID N in event conditions.

```
 1 = Oldman
 2 = Intro
 3 = Necklace piece
 4 = Engine
 5 = Poopoo Caca
10 = Mining Event — temp random roll (Common Event 2; overwritten on every roll)
21 = Current Planet (1 = MegaEarth, 2 = PlanetOrk, 3 = PlanetTingTing)
```

(Variables 6–9, 11–20 are unnamed/unused)

**Variable 10** is used internally by Common Event 2 (Mining Event). Safe to read after calling that
event, but do NOT use it for persistent quest state — it is overwritten on every mine roll.

**Variable 21** is read by Common Event 1 (Ship Transponder) to determine which planet the player is
on. Must be set by each planet's arrival map event. New planets must add a new value here.

---

## JSON Field Reference for System IDs

When editing any data file JSON, these are the field names that reference system IDs:

```json
{
  "stypeId":  1,   // Skill type — used in Skills.json
  "elementId": 1,  // Element — used in Skills.json damage.elementId
  "wtypeId":  1,   // Weapon type — used in Weapons.json
  "atypeId":  1,   // Armor type — used in Armors.json
  "etypeId":  1    // Equip type — used in Weapons.json and Armors.json
}
```

### Traits That Reference System IDs

Traits appear in actors, classes, weapons, armors, enemies, and states as:
`{"code": CODE, "dataId": ID, "value": VALUE}`

```
code 11 = Element Rate      dataId = elementId    value = multiplier (1.0=normal)
code 12 = Debuff Rate       dataId = paramId      value = multiplier
code 13 = State Rate        dataId = stateId      value = multiplier
code 14 = State Resist      dataId = stateId      value = (1=immune)
code 21 = Param             dataId = paramId      value = percent bonus
code 22 = XParam            dataId = xparamId     value = additive
code 31 = Attack Element    dataId = elementId    value = 0
code 32 = Attack State      dataId = stateId      value = chance (0-1)
code 41 = Add Skill Type    dataId = stypeId      value = 0
code 42 = Seal Skill Type   dataId = stypeId      value = 0
code 43 = Add Skill         dataId = skillId      value = 0
code 44 = Seal Skill        dataId = skillId      value = 0
code 51 = Equip Weapon      dataId = wtypeId      value = 0
code 52 = Equip Armor       dataId = atypeId      value = 0
```

*See also: plugins (for notetag syntax referencing these IDs), actors, classes*

## Dungeon expansion reservations (2026-11-01)

These IDs were checked against live System.json, map/common/troop events and the
quest switch documentation before allocation. Earlier range suggestions above
are historical; do not reuse these IDs.

| Switches | Quest and states in ID order |
| --- | --- |
| 101–106 | A Lien on Your Spleen: accepted, meter bypassed, billing isolated, ledger recovered, public disclosure chosen, reward claimed |
| 111–117 | Cold Storage, Warm Bodies: accepted, pressure vented, coolant drained, heat restored, staff released, reward claimed, names protected |
| 121–127 | The Haunted Shift: accepted, air log recovered, timecards recovered, archive unlocked, roster recovered, public memorial chosen, reward claimed |

Item 151 is Dungeon Field Notes (reusable, menu-only Key Item), invoking common
event 5. No new variables or battle encounters are allocated. Maps 110–115 are
the six dungeon floors. See tools/dungeons/README.md for routes and verification.


## Maze expedition reservations

Maps 116–127; switches 131–166 (six groups of six: accepted, first clue, second clue, recovered, public disclosure, reward claimed); Key Item 152 Expedition Notes; Common Event 6; Tileset 19 Industrial Recovery Wards. Names and event references: tools/mazes/manifest.json. These extend the completed dungeon baseline; do not rebuild older snapshots over them.

## Repossessor proof of concept

Reserved Enemy142, Troop51, Skills151–155 and Switch167 (Repossessor defeated). Optional encounter is Map138. Plugin ME_Boss owns two-phase sprite rendering, mark/interrupt state, and the temporary Jam Scanner command. Details and validation: tools/bosses/README.md. Earlier maze builds predate this encounter.

## Local projects reservations (2026-11-01)

Live System.json and explicit map/common/troop/plugin variable references were checked before reserving these IDs. Unnamed variables up to50 have historical references; do not infer vacancy from the named array length.

- Variables51–53: Rivet crew standing (derived0–3 from recycling191, archive199 and sorting200), archive-terminal stage (0–2), sorting-station stage (0–2).
- Switches194–202, in order: Workers' Memory accepted, archive terminal solved, terminal stipend paid, canteen safety copy, SLF consent copy, archive finished, sorting passed, sorting reward paid, public archive chosen.
- Common Event10: refresh/display Rivet standing, with no autorun or parallel trigger.
- New map events are appended only to103 (archivist and sorting station); existing108/3,106/5 and244/4 gain explicit optional menus. Beryl103/2 uses local prices only. No new map, item, enemy or battle plugin is reserved for this batch. See tools/local-projects/manifest.json after implementation.

## Zack companion story reservations (A15 first quest)

Switches203–208: Weight Bearing accepted, load sheet copied, brace staged, repair/reward complete, crew credited on inspection label, brace purchased. No variable, item, actor, skill, map or battle ID is added. Existing welder103/5 and Socket108/5 retain their services through explicit menus; append an inspection indicator to103 and salvage cache to110. Completion Log reads206 for completion. Other companion stories remain future work.

## Jen companion story reservations (A15 second quest, 2026-11-02)

Switches209–216: Without a Badge accepted, patient consent recorded, treatment-only permit, offline care slot, patient treated/personal EXP paid, patient keeps security-denial stub, supply kit claimed, civilian exemption route. Add Orla on outpatient floor26; receptionist25/4 and analyst27/3 retain existing services. Completion Log reads215 for the claimed chapter reward and distinguishes213 as care already provided. No recruitment, new state/item, variable, battle or global clinic policy is allocated. Existing party Recovery remains separate.

## Zed companion story reservations (A15 third chapter)

Switches217–222: Bench Warranty accepted, cutoff test passed, removal test passed, ownership test passed, chapter complete/EXP paid, earned calibration waiver used. Add a simulation bench on99 and append a counter service preserving existing indices0–2. CommonEvent7 may waive one successful calibration fee when221 is true and222 false; prototype purchases/returns/equipped protection remain unchanged. No new item/skill/state/map/variable is allocated.

## Pink companion story reservations (A15 fourth chapter)

Switches223–228: A Thought of Her Own accepted, source trace, counterline trace, rehearsal passed, personal reward claimed, combat route used. Skills278 Own Voice (ally Confusion cure) and279 Directive Loop (training Confusion attempt); Enemy153/Troop62 Directive Echo reuse approved ninja training art. Icon2129 is reserved for an isolated Own Voice source. No new maps/actors/recruitment flags. First Collective credential189 and active conscious Pink are prerequisites; existing trial61 and flags185–190 remain separate.

## A15 remaining companion chapters (2026-11-02)
Switches229–258: five six-flag groups for Black Ninja229, Blue Ninja235, Niles241, Jack247 and Dick253. Each group is accepted, first task, second task, resolution chosen, reward claimed, alternate resolution. Existing actor membership records recruitment; native129 invitations never initialize/reset an existing actor. No new actor, map, item, skill, variable, battle or common event. New contacts/tasks use existing maps8/9/10/15/50/52/54/245/246/247/248. Blue instructor's practice and Pink options retain indices0/1; chapter option2 is appended before cancellation. Completion Log adds five projects for36 total/23 projects. A15 excludes protagonist Rex and antagonist-only A.S.P.11–12; A26 proposed actors remain separate.

## A20 fitting-room illusion reservations
Maps249–250 are two fixed linked showroom/projection layouts reached from the completed Pants-O-Rama route. Switches259–265: inspection accepted, original tape read, maintenance note read, calibration solved, reward claimed, opt-in demo chosen, local resolution recorded. No new variables, items, actors, skills, enemies or battle plugin. Reward150 Credits +1 existing Panacea171, once and capacity guarded. Exit lands on reviewed floor Map002 (15,9). Shop Buy/Leave indices0/1 remain unchanged; new inspection choice2. Completion Log adds one project for37 total/24 projects. All new people, fixtures, landings and routes must pass the map floor audit and native walking test.

## A24 chromatic-skin service reservations
No database IDs allocated. ME_CosmeticSkins provides two finite Rex-only appearance presets through existing clinic counters25/4,45/1,83/3,99/2. Native hue90 (Mint Condition,80 Credits) and hue240 (Ultraviolet Liability,120 Credits) use the original Rex walk/face/SV sheets with unchanged dimensions, alpha and frame registration. Virtual names resolve through load/reserve/request bitmap loaders; no new production PNGs or actor-table edits. Actor1 stores owned presets and selection in optional _meChromaticOwned/_meChromaticStyle fields; missing fields mean original appearance. Refitting owned presets and restoring original are free. No stats/equipment/quest/faction effects. Original menu indices/cancellation remain intact; append service after Leave. Completion Log total stays37 because this is a reversible service, not a quest.

## A26 MAX-E-MUM reservations
Actor13, class12, skills280–282, Map251 Iron Circuits, switches266–269 (accepted, free stop verified, local telemetry verified, inspection complete). New entry Map010/event19 public lift(14,10); return reviewed floor(14,11). One new optional inspection project makes38 Completion Log activities/25 projects. No new item, weapon, state, animation, variable or shared battle plugin. Other proposed companions remain unallocated; preserve starting party and A.S.P. records11/12.

## Audio audit allocations
Native audio-only animations225–227: corporate warning (Computer), Repossessor clamp impact (Hammer), scanner jam (Paralyze1). Existing warning skills with scope11 use225; clamp153 uses226 and jam155 uses227. Scope0 scan151/reset154 cannot play target animations and remain unchanged, pending explicit action-cue wiring. No new skill/state/item/map/plugin. All original animation cells/timing frames and event guards are retained; only SE parameters/commands and these animation IDs changed. See docs/audio/SOUND_EFFECTS_AUDIT.md and tools/audio-audit/changes.json before allocating new animation IDs.
