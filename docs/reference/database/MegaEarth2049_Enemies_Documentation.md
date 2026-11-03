> Reference snapshot: verify IDs, effects and enabled-plugin behavior against the live data and current FAQs. This relocation does not certify the older catalog as current.

# MegaEarth2049 Enemies and Combat System Documentation

This document provides detailed information about the enemy system in MegaEarth2049, focusing on the `Enemies.json` file structure, enemy types, combat mechanics, and how to create balanced encounters that fit the game's narrative and progression.

## 1. Enemies.json Structure

The `Enemies.json` file defines all enemy characters in the game. Each enemy entry contains:

```json
{
  "id": 1,
  "actions": [
    {
      "conditionParam1": 0,
      "conditionParam2": 0,
      "conditionType": 0,
      "rating": 5,
      "skillId": 1
    }
  ],
  "battlerHue": 277,
  "battlerName": "SF_Doll",
  "dropItems": [
    {"kind": 1, "dataId": 1, "denominator": 1},
    {"dataId": 1, "denominator": 1, "kind": 0},
    {"dataId": 1, "denominator": 1, "kind": 0}
  ],
  "exp": 3,
  "traits": [
    {"code": 22, "dataId": 0, "value": 0.95},
    {"code": 22, "dataId": 1, "value": 0.05},
    {"code": 31, "dataId": 1, "value": 0}
  ],
  "gold": 5,
  "name": "Doll",
  "note": "<Show Level>\n<Minimum Level: 1>\n<Maximum Level: 25>\n<Positive Level Fluctuation: 1>\n<Negative Level Fluctuation: 3>\n<Starting Level Type: 3>",
  "params": [200, 0, 24, 18, 30, 30, 30, 30]
}
```

Where:
- **id**: Unique identifier for the enemy
- **name**: Display name
- **battlerName**: Reference to the graphic file
- **battlerHue**: Color adjustment (0-360)
- **params**: Stats array [HP, MP, ATK, DEF, MAT, MDF, AGI, LUK]
- **exp/gold**: Rewards for defeating
- **dropItems**: Items that can be obtained after battle
- **actions**: Battle actions the enemy can perform
- **traits**: Special characteristics
- **note**: Custom properties (often contains Yanfly plugin parameters)

## 2. Enemy Categories in MegaEarth2049

The game features diverse enemy types that reflect its cyberpunk setting:

### 2.1 Corporate Security (IDs 1, 6-8, 67-72, 118-122)
- **SF_Dolls** (ID 1): Basic security robots with moderate stats
- **Gas Men** (ID 6): Security units with poison abilities
- **Soldiers** (IDs 7-8, 118-122): Corporate military personnel
- **Thugs** (ID 67): Hired muscle with high attack stats

### 2.2 Street Gangs (IDs 3, 9, 25-31)
- **Punks** (IDs 25-31): Various gang members with different weapons and abilities
- **Thugs** (ID 3): Generic street fighters
- **Graffiti Artists** (ID 9): Territory markers with spray-based attacks

### 2.3 Digital Shadow Collective (Ninjas) (IDs 12-18)
- **Green Ninja** (ID 12): Stealth specialist with high agility
- **Pink Ninja** (ID 13): Mind-control specialist with mental attacks
- **Brown Ninja** (ID 14): Data archivist with information-based abilities
- **Blue Ninja** (ID 15): Weapons expert with high attack
- **Red Ninja** (ID 16): Demolitions expert with explosive attacks
- **Purple Ninja** (ID 17): Infiltration specialist with disguise abilities
- **Black Ninja** (ID 18): Reality manipulator with unique status effects

### 2.4 Mutated Creatures (IDs 4, 32-66, 73-92)
- **Mutant Plants** (IDs 4, 93-96): Biological experiments with poison abilities
- **Rats** (IDs 32, 97-100): Sewer dwellers with disease attacks
- **Wolves** (IDs 33, 52-56): Feral pack hunters
- **Slimes** (IDs 34-38): Amorphous entities with absorption abilities
- **Scorpions** (IDs 73-77): Venomous arthropods
- **Spiders** (IDs 78-82): Web-spinning ambush predators
- **Foxes** (IDs 83-87, 101-105): Cunning creatures with trickery abilities
- **Bees/Hornets** (IDs 88-92): Flying insects with poison attacks

### 2.5 A.S.P. Manifestations (IDs 19-24, 106-114)
- **Hallucinations** (ID 19): Mental projections that cause confusion
- **Elemental Sprites** (IDs 20-23): Manifestations of elemental data
- **Puppets** (ID 24): Controlled humans with unpredictable behavior
- **Guardians** (IDs 106-109): Advanced protection systems
- **Advanced Protection Types** (IDs 110-114): Elite A.S.P. security units

### 2.6 Alien Entities (IDs 39-41)
- **Aliens** (IDs 39-41): Extraterrestrial beings with unknown origins and abilities

### 2.7 Boss Enemies (IDs 10-11, 115-117)
- **Trash Octopus** (ID 10): Sewer boss with tentacle attacks
- **Octonasty** (ID 11): Enhanced version of Trash Octopus
- **Poopoo Caca** (ID 115): Waste management system gone rogue
- **Crap** (ID 116): Mini-boss version of waste enemies
- **PunkBoss** (ID 117): Leader of the Punks with enhanced abilities

## 3. Enemy Properties and Mechanics

### 3.1 Stats and Parameters

The `params` array defines eight core statistics:
1. **HP**: Health points
2. **MP**: Magic/skill points
3. **ATK**: Physical attack power
4. **DEF**: Physical defense
5. **MAT**: Magical attack power
6. **MDF**: Magical defense
7. **AGI**: Agility (affects turn order)
8. **LUK**: Luck (affects critical hits and status effects)

These stats determine an enemy's combat effectiveness and should be balanced according to:
- The area where the enemy appears
- The expected player level at that point
- The enemy's role in combat (tank, damage dealer, support)

### 3.2 Actions and Skills

The `actions` array defines what abilities an enemy can use in battle:

```json
"actions": [
  {
    "conditionParam1": 0,
    "conditionParam2": 0,
    "conditionType": 0,
    "rating": 5,
    "skillId": 1
  }
]
```

Where:
- **conditionType**: When the action can be used (0 = always, 1 = turn, 2 = HP%, 3 = MP%, 4 = state, 5 = party level, 6 = switch)
- **conditionParam1/2**: Parameters for the condition
- **rating**: Relative priority (higher = more likely to use)
- **skillId**: Reference to the skill being used

For example, the Rat enemy (ID 32) has two actions:
- A basic attack (skillId 1) with rating 5
- A disease-inflicting bite (skillId 126) with rating 4

### 3.3 Traits

The `traits` array defines special characteristics:

```json
"traits": [
  {"code": 22, "dataId": 0, "value": 0.95},
  {"code": 22, "dataId": 1, "value": 0.05},
  {"code": 31, "dataId": 1, "value": 0}
]
```

Common trait codes include:
- **11**: Element Rate (resistance/weakness)
- **12**: Debuff Rate
- **22**: Attack Element
- **31**: Attack State (status effects)
- **43**: Attack Skill (special attacks)
- **51**: Special Flag (like "Boss" status)

### 3.4 Drop Items

The `dropItems` array defines potential rewards:

```json
"dropItems": [
  {"kind": 1, "dataId": 1, "denominator": 1},
  {"dataId": 1, "denominator": 1, "kind": 0},
  {"dataId": 1, "denominator": 1, "kind": 0}
]
```

Where:
- **kind**: Item type (0 = none, 1 = item, 2 = weapon, 3 = armor)
- **dataId**: ID of the specific item/weapon/armor
- **denominator**: Drop rate (1/denominator chance)

For example, the Trash Octopus (ID 10) drops a weapon (kind 2) with ID 8 at a 1/1 rate (guaranteed).

### 3.5 Note Tags

The `note` field contains custom parameters, often using Yanfly plugin syntax:

```
<Show Level>
<Minimum Level: 1>
<Maximum Level: 25>
<Positive Level Fluctuation: 1>
<Negative Level Fluctuation: 3>
<Starting Level Type: 3>
```

Common note tags in MegaEarth2049 include:
- Level-related tags (as above)
- Sideview battler specifications
- Special battle animations
- Enemy-specific behaviors

## 4. Enemy Integration with Game Progression

### 4.1 Level Scaling

MegaEarth2049 uses a level scaling system for enemies, defined through note tags:

```
<Minimum Level: 1>
<Maximum Level: 25>
<Positive Level Fluctuation: 1>
<Negative Level Fluctuation: 3>
<Starting Level Type: 3>
```

This creates a dynamic difficulty curve where:
- Enemies scale within a range (1-25)
- Level can fluctuate slightly (±1-3 levels)
- Starting level is determined by type (3 = based on area difficulty)

### 4.2 Area-Appropriate Enemies

Different areas feature thematically appropriate enemies:

- **Timbuc Streets**: Punks, Thugs, Rats
- **Timbuc Sewers**: Mutant Plants, Rats, Trash Octopus
- **Corporate Areas**: Security Dolls, Soldiers, Gas Men
- **Digital Spaces**: Ninjas, A.S.P. Manifestations
- **Planets**: Alien entities, mutated wildlife

### 4.3 Boss Progression

Boss enemies mark significant progression points:

1. **Trash Octopus** (ID 10): Early game boss in Timbuc Cellar
2. **Octonasty** (ID 11): Enhanced version in deeper areas
3. **PunkBoss** (ID 117): Mid-game confrontation with the Punks
4. **Advanced Protection Types** (IDs 110-114): Late-game A.S.P. guardians

## 5. Creating Balanced Enemy Encounters

### 5.1 Enemy Group Composition

Effective enemy groups typically include:
- **Tanks**: High HP/DEF enemies that absorb damage (e.g., Thugs, Ogres)
- **Damage Dealers**: High ATK/MAT enemies that deal significant damage (e.g., Ninjas, Drones)
- **Support**: Enemies that inflict status effects or heal allies (e.g., Mutant Plants, Sprites)

### 5.2 Difficulty Scaling

When creating new enemies or encounters, consider:
- **Early Game** (Levels 1-10): HP 50-200, ATK/DEF 10-25
- **Mid Game** (Levels 11-30): HP 200-800, ATK/DEF 25-50
- **Late Game** (Levels 31-40): HP 800-1500, ATK/DEF 50-80
- **Endgame** (Levels 41-50): HP 1500+, ATK/DEF 80+

### 5.3 Reward Balancing

Balance rewards based on difficulty:
- **EXP**: Should scale with enemy level and difficulty
- **Gold**: Provides economic progression
- **Drop Items**: Special items should have appropriate rarity

For example, the PunkBoss (ID 117) provides 500 EXP and guaranteed rare item drops, reflecting its status as a significant challenge.

## 6. Enemy-Specific Mechanics

### 6.1 Digital Shadow Collective (Ninjas)

Ninjas feature unique mechanics:
- **Shadow Step**: Ability to occasionally avoid attacks
- **Digital Tantō**: Weapons that exist in both physical and digital space
- **Neural Disruption**: Ability to temporarily disable player abilities

### 6.2 A.S.P. Manifestations

A.S.P. entities have special properties:
- **Reality Distortion**: Can change the battlefield conditions
- **Digital Infection**: Can inflict unique status effects
- **Adaptive Defense**: Change resistances during battle

### 6.3 Disease Carriers

Some enemies can inflict diseases:
- **Rats**: Vector for viral infections
- **Mutant Plants**: Cause allergic reactions
- **Certain NPCs**: Can transmit STDs (Synthetically Transmitted Diseases)

## 7. Creating New Enemies

When creating new enemies for incomplete areas:

### 7.1 Technical Implementation

1. Add a new entry to Enemies.json with a unique ID
2. Define appropriate stats based on the area difficulty
3. Set up actions, traits, and drop items
4. Add note tags for level scaling and special properties
5. Ensure the battlerName references an existing graphic

### 7.2 Thematic Considerations

New enemies should:
- Fit the cyberpunk, corporate-controlled setting
- Reflect the specific area's theme (corporate, street, digital, etc.)
- Have logical abilities and behaviors
- Connect to the game's narrative when appropriate

### 7.3 Example: Creating a New Corporate Security Type

For a new security unit in a corporate area:

```json
{
  "id": 142,
  "actions": [
    {"conditionParam1": 0, "conditionParam2": 0, "conditionType": 0, "rating": 5, "skillId": 1},
    {"conditionParam1": 2, "conditionParam2": 0.5, "conditionType": 2, "rating": 4, "skillId": 7}
  ],
  "battlerHue": 180,
  "battlerName": "SF_Doll",
  "dropItems": [
    {"kind": 1, "dataId": 5, "denominator": 3},
    {"dataId": 1, "denominator": 1, "kind": 0},
    {"dataId": 1, "denominator": 1, "kind": 0}
  ],
  "exp": 8,
  "traits": [
    {"code": 22, "dataId": 0, "value": 0.95},
    {"code": 22, "dataId": 1, "value": 0.05},
    {"code": 31, "dataId": 4, "value": 0.15}
  ],
  "gold": 10,
  "name": "NeuraTech Enforcer",
  "note": "<Show Level>\n<Minimum Level: 15>\n<Maximum Level: 30>\n<Positive Level Fluctuation: 1>\n<Negative Level Fluctuation: 2>\n<Starting Level Type: 3>",
  "params": [350, 50, 40, 35, 20, 25, 30, 20]
}
```

This creates a mid-game corporate security unit with:
- A basic attack and a special skill when below 50% HP
- A chance to drop a useful item
- Moderate stats appropriate for mid-game
- A paralysis effect on its attacks (trait code 31, dataId 4)

## 8. Integrating Enemies with Quests

Enemies can be integrated with quests in several ways:

### 8.1 Quest-Specific Enemies

Some enemies appear only during specific quests:
- **PunkBoss** (ID 117): Appears during the confrontation with the Punks
- **Hallucination** (ID 19): Appears during quests involving mental states

### 8.2 Enemy-Driven Collection Quests

Quests may require defeating specific enemies to collect items:
- Gathering components from Security Dolls
- Collecting samples from Mutant Plants
- Studying Alien entities

### 8.3 Enemy Territory Quests

Some quests involve clearing areas of specific enemy types:
- Removing Punk gangs from neighborhoods
- Clearing Mutant infestations
- Eliminating A.S.P. corruption from systems

## 9. Conclusion

The enemy system in MegaEarth2049 creates a diverse and challenging combat experience that reflects the game's cyberpunk setting. By understanding the structure of the `Enemies.json` file and the various enemy types, AI assistants can create balanced and thematically appropriate encounters that enhance the game's narrative and progression.

When creating new enemies or modifying existing ones, always consider their role in the game world, their relationship to the player's expected level and abilities, and how they contribute to the overall gameplay experience.
