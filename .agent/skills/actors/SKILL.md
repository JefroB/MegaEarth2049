---
name: actors
description: Use when editing Actors.json or working with actor/character data in MegaEarth2049. Covers the original 12 actors and MAX-E-MUM (Rex, Jen, Zack, Zed, Black Ninja, Blue Ninja, Pink Ninja, Niles, Jack, Dick, A.S.P.), their class IDs, initial equipment, traits, and battle command configurations. Includes HIME_ActorBattleCommands notetag syntax and JSON field reference for Actors.json.
---

## JS in Actors — What IS and Is NOT JavaScript

| Field | Is it JS? | Notes |
|---|---|---|
| `note` field | NOT JS | Contains HIME battle command notetags — literal strings |
| `traits` array | NOT JS | Numeric codes, not evaluated |
| `profile` field | NOT JS | Display text only |
| Event Script calls referencing actors | IS JS | `$gameActors.actor(N)` etc. |

---

## Actors.json Field Reference

```json
{
  "id": 1,
  "name": "Rex",
  "nickname": "",
  "profile": "Character background text",
  "classId": 1,
  "initialLevel": 1,
  "maxLevel": 99,
  "battlerName": "Rex",            // img/sv_actors/ spritesheet (no extension)
  "characterName": "Rex_walk",     // img/characters/ spritesheet
  "characterIndex": 0,             // Which character on the spritesheet (0-7)
  "faceName": "Rex",               // img/faces/ image (no extension)
  "faceIndex": 0,                  // Which face on the sheet (0-7)
  "equips": [14, 22, 0, 3, 0, null, 0],  // Starting equipment IDs per slot
  "traits": [],                    // See system skill for trait code reference
  "note": ""                       // HIME battle command notetags
}
```

The `equips` array maps to equip type slots in order: Weapon, Shield, Hat, Jacket, Gloves, Pants, Shoes, Accessory.
Use `0` or `null` for empty slots.

---

## HIME_ActorBattleCommands — Notetags (NOT JS)

Battle commands for each actor are configured in the actor's `note` field.
These are parsed text — NOT JavaScript.

```
<battle command: attack />
<battle command: guard />
<battle command: item />
<battle command: skill_type N />    // N = skill type ID from system skill
                                    // 1=Incantation, 2=Ability, 3=Tech, 4=Squad Attack, 5=Cheer
```

---

## All Actors — Current Data

### Actor 1 — Rex (Class 1: Hacker)
- **Initial Level**: 1 | **Max Level**: 99
- **Battler**: Rex | **Character**: Rex_walk[0] | **Face**: Rex[0]
- **Starting Equips**: Weapon=14, Shield=22, Hat=0, Jacket=3
- **Battle Commands**: Attack, Guard, Cheer(5), Ability(2), Tech(3), Squad Attack(4), Item
- **Traits**: Equip types 9,1,2,12,13,14; Skill type 1 access; Skills 13,44 innate

### Actor 2 — Jen (Class 4: Priest)
- **Initial Level**: 5 | **Max Level**: 99
- **Battler**: Jen | **Character**: Jen_walk[0] | **Face**: Jen_face[0]
- **Starting Equips**: Weapon=2, Shield=1, Hat=2, Jacket=3
- **Battle Commands**: Attack, Cheer(5), Incantation(1), Tech(3), Squad Attack(4), Item
- **⚠️ No Guard command** — intentional; matches her aggressive personality
- **Traits**: Equip types 9,1; Skill 44 innate

### Actor 3 — Zack (Class 3: Construction Worker)
- **Initial Level**: 5 | **Max Level**: 99
- **Battler**: Zack | **Character**: Zack_walk[0] | **Face**: Zack[0]
- **Starting Equips**: Weapon=3, Jacket=3, Accessory=4
- **Battle Commands**: Attack, Guard, Cheer(5), Ability(2), Tech(3), Squad Attack(4), Item
- **Traits**: Equip types 2,8,10,3,9; Skills 14,44 innate
- **Profile**: "Being hispanic, his real name is Jose. Everyone calls him Zack though."

### Actor 4 — Zed (Class 7: Mod Doctor)
- **Initial Level**: 5 | **Max Level**: 99
- **Battler**: Zed | **Character**: Zed_walk[0] | **Face**: Zed[0]
- **Starting Equips**: Weapon=4, Hat=2, Jacket=3, Accessory=4
- **Battle Commands**: Attack, Guard, Cheer(5), Ability(2), Tech(3), Squad Attack(4), Item
- **Traits**: Equip types 9,3,2,1; Skill 44 innate

### Actor 5 — Black Ninja (Class 5: Ninja)
- **Initial Level**: 6 | **Max Level**: 99
- **Battler**: blackninja | **Character**: ninja1[4] | **Face**: ninja1[1]
- **Starting Equips**: Weapon=1, Shield=1
- **Battle Commands**: Attack, Guard, Cheer(5), Ability(2), Tech(3), Squad Attack(4), Item
- **Traits**: Skill type 1 access; Attack times +2 (code 33)

### Actor 6 — Blue Ninja (Class 5: Ninja)
- **Initial Level**: 1 | **Max Level**: 99
- **Battler**: blueninja | **Character**: ninja1[5] | **Face**: ninja2[2]
- **Starting Equips**: Weapon=11, Shield=11
- **Battle Commands**: (none configured — uses class defaults)
- **Traits**: Add skill type 5(code 64); Skill type 1 access; Seal armor type 2(code 62); Attack times +2

### Actor 7 — Pink Ninja (Class 5: Ninja)
- **Initial Level**: 5 | **Max Level**: 99
- **Battler**: pinkninja | **Character**: ninja1[3] | **Face**: ninja2[0]
- **Starting Equips**: Weapon=11, Shield=1
- **Battle Commands**: (none configured — uses class defaults)
- **Traits**: Crit rate 0.95(code 61); Add skill type 2(code 64); Seal armor type 2; Skill type 1 access; Attack times +2

### Actor 8 — Niles (Class 2: Punk)
- **Initial Level**: 8 | **Max Level**: 99
- **Battler**: punk6 | **Character**: punk1[5] | **Face**: punk1[5]
- **Starting Equips**: Weapon=1
- **Battle Commands**: (none configured)
- **Profile**: "Punk son of a bitch." | **Nickname**: "Stinky"

### Actor 9 — Jack (Class 9: Smuggler)
- **Initial Level**: 1 | **Max Level**: 99
- **Battler**: Smuggler | **Character**: some_main_dudes[0] | **Face**: some_main_dudes[0]
- **Starting Equips**: (none)
- **Battle Commands**: (none configured)

### Actor 10 — Dick (Class 8: Thief)
- **Initial Level**: 1 | **Max Level**: 99
- **Battler**: Thief | **Character**: some_main_dudes[1] | **Face**: some_main_dudes[1]
- **Starting Equips**: (none)

### Actor 11 — A.S.P. (Class 1: early form)
- **Initial Level**: 20 | **Nickname**: Demon
- **Battler**: demon-white_1_orig | **Profile**: "Advanced Security Protocol"

### Actor 12 — A.S.P. (Class 1: final form)
- **Initial Level**: 40 | **Nickname**: Demon
- **Battler**: Dark Lord783542067_orig | **Profile**: "Advanced Security Protocol"

---

## Trait Code Quick Reference

See `system` skill for full trait code table. Common codes in actors:

```
code 33 = Attack Times+   dataId=0   value=N  (adds N attacks per action)
code 43 = Add Skill       dataId=skillId       (actor permanently has this skill)
code 51 = Equip Weapon    dataId=wtypeId       (can equip this weapon type)
code 52 = Equip Armor     dataId=atypeId       (can equip this armor type)
code 55 = Special Flag    dataId=1             (preserve TP between battles)
code 61 = Critical Rate   dataId=0  value=rate (crit chance multiplier)
code 62 = Seal Equip Armor dataId=atypeId      (cannot equip this armor type)
code 64 = Add Skill Type  dataId=stypeId       (can use this skill type)
```

*See also: classes, system (for type IDs), plugins (for HIME notetag details)*


## Actor13 — MAX-E-MUM (A26)

Optional Iron Circuits recruit on Map251 via Timbuc lift10/19; class12 Maintenance Coach, initial level8, $MAXEMUM[0] walking, MAXEMUM[0] face and MAXEMUM SV battler. Skills280–282 are class learnings; initial weapon2 Spiked Gloves, no new actor traits. Explicit invitation uses native129 without initialization; never reset an existing recruit or add him to the starting party. Native battle sheet864×576 has96px cells, not64px; walk144×192 is single-character48px cells. See GameFAQs/FAQ_04_Characters_and_NPCs.md#max-e-mum and tools/max-e-mum/manifest.json. Preserve his planned Floating Mansion role as future integration, not a campaign bypass.
