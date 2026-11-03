> Reference snapshot: verify IDs, effects and enabled-plugin behavior against the live data and current FAQs. This relocation does not certify the older catalog as current.

# MegaEarth2049 Troops and Battle Encounters Documentation

This document provides detailed information about the troop system in MegaEarth2049, focusing on the `Troops.json` file structure, battle encounter design, and how troops integrate with the enemy system to create engaging combat experiences.

## 1. Troops.json Structure

The `Troops.json` file defines all battle encounters in the game. Each troop entry contains:

```json
{
  "id": 1,
  "members": [
    {"enemyId": 26, "x": 295, "y": 421, "hidden": false},
    {"enemyId": 26, "x": 449, "y": 430, "hidden": false}
  ],
  "name": "Punk2*2",
  "pages": [
    {
      "conditions": {
        "actorHp": 50,
        "actorId": 1,
        "actorValid": false,
        "enemyHp": 50,
        "enemyIndex": 0,
        "enemyValid": false,
        "switchId": 1,
        "switchValid": false,
        "turnA": 0,
        "turnB": 0,
        "turnEnding": false,
        "turnValid": false
      },
      "list": [{"code": 0, "indent": 0, "parameters": []}],
      "span": 0
    }
  ]
}
```

Where:
- **id**: Unique identifier for the troop
- **name**: Display name of the troop
- **members**: Array of enemy instances with positions and visibility settings
- **pages**: Battle event pages that define conditional actions during battle

### 1.1 Member Structure

The `members` array defines which enemies appear in the troop and their positioning:

```json
"members": [
  {"enemyId": 26, "x": 295, "y": 421, "hidden": false},
  {"enemyId": 26, "x": 449, "y": 430, "hidden": false}
]
```

Where:
- **enemyId**: Reference to an enemy from Enemies.json
- **x** and **y**: Position coordinates on the battle screen
- **hidden**: Boolean indicating if the enemy is initially hidden (for surprise attacks or mid-battle appearances)

### 1.2 Battle Event Pages

The `pages` array contains battle event pages that define conditional actions during battle:

```json
"pages": [
  {
    "conditions": {
      "actorHp": 50,
      "actorId": 1,
      "actorValid": false,
      "enemyHp": 50,
      "enemyIndex": 0,
      "enemyValid": false,
      "switchId": 1,
      "switchValid": false,
      "turnA": 0,
      "turnB": 0,
      "turnEnding": false,
      "turnValid": false
    },
    "list": [{"code": 0, "indent": 0, "parameters": []}],
    "span": 0
  }
]
```

Where:
- **conditions**: When the events trigger
  - **actorValid/enemyValid**: Whether to check actor/enemy HP
  - **actorHp/enemyHp**: HP threshold percentage
  - **actorId/enemyIndex**: Which actor/enemy to check
  - **switchValid**: Whether to check a switch
  - **switchId**: Which switch to check
  - **turnValid**: Whether to check turn count
  - **turnA/turnB**: Turn range to check
  - **turnEnding**: Whether to trigger at turn end
- **list**: Commands to execute (dialogue, animations, etc.)
- **span**: How long the event lasts (0 = once, 1 = for that turn, 2 = for the whole battle)

## 2. Troop Categories in MegaEarth2049

The game features diverse troop types that reflect its cyberpunk setting:

### 2.1 Punk Gang Formations (IDs 1-2, 6, 28-31)

These troops consist of various punk gang members:
- **Punk*2** (ID 2): Two basic punk gang members
- **Punk2*2** (ID 1): Two punk members with slightly different abilities
- **Punk3** (ID 6): A single, stronger punk member
- **Punk1, Punk2, Punk3** (ID 28): Mixed punk formation with varying abilities
- **Punk3, Punk4, Punk5** (ID 29): Advanced punk formation with higher-level members
- **Punk1, Punk5** (ID 30): Mixed formation with basic and advanced members
- **Punk2, Punk4** (ID 31): Mixed formation with intermediate members

These formations are typically encountered in urban areas, particularly in Timbuc Streets.

### 2.2 Ninja Formations (IDs 8-15)

These troops feature members of the Digital Shadow Collective:
- **Rainbow Ninja** (ID 8): Mixed formation with all ninja types, some hidden
- **Green Ninja** (ID 9): Formation of stealth specialists
- **Brown Ninja** (ID 10): Formation of data archivists
- **Blue Ninja** (ID 11): Formation of weapons experts
- **Red Ninja** (ID 12): Formation of demolitions experts
- **Purple Ninja** (ID 13): Formation of infiltration specialists
- **Black Ninja** (ID 14): Formation of reality manipulators
- **Pink Ninja** (ID 15): Single ninja with special battle events

Ninja troops often feature hidden members that appear during battle, creating surprise elements.

### 2.3 Elemental Entity Groups (IDs 19-27)

These troops consist of elemental manifestations:
- **Earth Wind & Fire** (ID 19): Three elemental entities
- **Earth & Fire** (ID 20): Two elemental entities
- **Earth & Wind** (ID 21): Two elemental entities
- **Water & Fire** (ID 22): Two elemental entities
- **Earth & Water** (ID 23): Two elemental entities
- **Earth Wind & Water** (ID 24): Three elemental entities
- **Fire Wind & Water** (ID 25): Three elemental entities
- **Water Wind** (ID 26): Two elemental entities
- **Fire Wind** (ID 27): Two elemental entities

These formations are typically encountered in digital spaces or areas with A.S.P. influence.

### 2.4 Animal and Mutant Groups (IDs 3-5, 7, 32-35, 40-45)

These troops consist of various animals and mutated creatures:
- **Plants*2** (ID 3): Two mutant plants
- **Bat*2** (ID 4): Two bats
- **Bat** (ID 5): Single bat
- **Mutant Plant** (ID 7): Single mutant plant
- **Rat** (ID 32): Single rat
- **Rat*2** (ID 33): Two rats
- **Rat*3** (ID 34): Three rats
- **Rat*4** (ID 35): Four rats
- **Cockatrice*2** (ID 40): Two cockatrices
- **Spider Formations** (IDs 41-45): Various combinations of spider types

These formations are typically encountered in sewers, abandoned areas, and natural environments.

### 2.5 Boss Encounters (IDs 16-18, 36-39, 46)

These troops represent significant challenges:
- **Halucination** (ID 16): Mental projection boss
- **Doll*3** (ID 17): Enhanced security doll formation
- **Doll*2** (ID 18): Smaller security doll formation
- **Poopoo Caca** (ID 36): Waste management system boss with multiple battle events
- **Crap*3** (ID 37): Three waste enemies
- **Crap*2** (ID 38): Two waste enemies
- **Crap*4** (ID 39): Four waste enemies
- **Punkboss1, Giant Spider*3** (ID 46): Punk leader with spider minions

Boss encounters often feature complex battle events that trigger at specific HP thresholds.

## 3. Battle Event System

The battle event system allows for dynamic encounters with conditional triggers and scripted sequences.

### 3.1 Condition Types

Battle events can trigger based on various conditions:
- **HP Thresholds**: When an enemy or actor reaches a certain HP percentage
- **Turn Count**: After a specific number of turns
- **Switch Status**: When a game switch is on or off
- **Turn Ending**: At the end of a turn

### 3.2 Common Event Commands

Battle events can execute various commands:
- **Dialogue** (code 101, 401): Display text messages
- **Show Animation** (code 337): Play an animation on enemies
- **Enemy Appearance** (code 335): Make hidden enemies appear
- **Force Action** (code 339): Force enemies to use specific skills
- **Change Enemy HP** (code 331): Modify enemy HP
- **Change Battle BGM** (code 132): Change the battle music
- **Battle Effect** (code 340): Show battle effects like screen flashes

### 3.3 Example: Poopoo Caca Boss Battle

The Poopoo Caca boss (ID 36) has multiple event pages that trigger at different HP thresholds:

```json
"pages": [
  {
    "conditions": {"enemyHp": 90, "enemyIndex": 0, "enemyValid": true},
    "list": [
      {"code": 101, "indent": 0, "parameters": ["", 0, 0, 0]},
      {"code": 401, "indent": 0, "parameters": ["Oh Shit. You might actually beat the crap out of me."]},
      {"code": 101, "indent": 0, "parameters": ["", 0, 0, 0]},
      {"code": 401, "indent": 0, "parameters": ["Take this!"]},
      {"code": 335, "indent": 0, "parameters": [2]},
      {"code": 0, "indent": 0, "parameters": []}
    ],
    "span": 0
  },
  {
    "conditions": {"enemyHp": 70, "enemyIndex": 0, "enemyValid": true},
    "list": [
      {"code": 101, "indent": 0, "parameters": ["", 0, 0, 0]},
      {"code": 401, "indent": 0, "parameters": ["Fuck you, Ass Monkey!"]},
      {"code": 335, "indent": 0, "parameters": [4]},
      {"code": 0, "indent": 0, "parameters": []}
    ],
    "span": 0
  }
]
```

This creates a dynamic battle where:
1. At 90% HP, the boss taunts the player and reveals a hidden enemy (index 2)
2. At 70% HP, the boss taunts again and reveals another hidden enemy (index 4)
3. Additional events trigger at 55% and 40% HP

This pattern of escalating difficulty through battle events is common for boss encounters.

### 3.4 Pink Ninja Special Battle

The Pink Ninja troop (ID 15) has a unique battle event that triggers when the enemy is defeated:

```json
"pages": [
  {
    "conditions": {"enemyHp": 0, "enemyIndex": 0, "enemyValid": true},
    "list": [
      {"code": 111, "indent": 0, "parameters": [4, 7, 0]},
      {"code": 340, "indent": 1, "parameters": []},
      {"code": 0, "indent": 1, "parameters": []},
      {"code": 411, "indent": 0, "parameters": []},
      {"code": 101, "indent": 1, "parameters": ["ninja2", 0, 0, 1]},
      {"code": 401, "indent": 1, "parameters": ["A test of will, and you have endured. "]},
      {"code": 401, "indent": 1, "parameters": ["Good job."]},
      {"code": 129, "indent": 1, "parameters": [7, 0, false]},
      {"code": 0, "indent": 1, "parameters": []},
      {"code": 412, "indent": 0, "parameters": []}
    ],
    "span": 0
  }
]
```

This creates a conditional outcome where:
1. If condition 4 (party has actor ID 7) is true, a battle effect is shown
2. Otherwise, dialogue is displayed and actor ID 7 is added to the party

This demonstrates how battle events can be used for story progression and character recruitment.

## 4. Troop Design Patterns

### 4.1 Formation Strategies

Troops in MegaEarth2049 follow several formation patterns:

#### 4.1.1 Basic Formations

- **Line Formation**: Enemies arranged horizontally (e.g., Punk*2, ID 2)
- **Triangle Formation**: Enemies arranged in a triangle (e.g., Punk1, Punk2, Punk3, ID 28)
- **Diamond Formation**: Four enemies arranged in a diamond (e.g., Rat*4, ID 35)

#### 4.1.2 Mixed-Type Formations

- **Tank and Support**: Stronger enemies in front with support enemies behind (e.g., Punkboss1, Giant Spider*3, ID 46)
- **Elemental Combinations**: Different elemental entities combined for varied attacks (e.g., Earth Wind & Fire, ID 19)
- **Complementary Abilities**: Enemies with abilities that enhance each other (e.g., Brown Ninja, ID 10)

#### 4.1.3 Hidden Enemy Mechanics

Some troops use hidden enemies for surprise elements:
- **Ambush Reinforcements**: Hidden enemies appear during battle (e.g., Rainbow Ninja, ID 8)
- **Boss Minions**: Boss troops summon minions at HP thresholds (e.g., Poopoo Caca, ID 36)
- **Stealth Units**: Ninja troops often have hidden members that appear strategically

### 4.2 Positioning Considerations

Enemy positioning affects battle dynamics:
- **Front Row**: Enemies with high HP/DEF positioned at y-coordinates 380-430
- **Back Row**: Ranged attackers positioned at y-coordinates 280-340
- **Side Positions**: Enemies that flank positioned at extreme x-coordinates
- **Center Position**: Boss enemies often centered (x-coordinate ~350)

### 4.3 Balanced Group Composition

Effective troops typically include:
- **Tanks**: High HP/DEF enemies that absorb damage
- **Damage Dealers**: High ATK/MAT enemies that deal significant damage
- **Support**: Enemies that inflict status effects or heal allies

For example, the Punkboss1, Giant Spider*3 troop (ID 46) includes:
- Punkboss as the main tank/damage dealer
- Giant Spiders as support units that inflict status effects

## 5. Integration with Other Systems

### 5.1 Connection to Map Encounters

Troops are connected to maps through:
- **Random Encounter Lists**: Maps have lists of possible troops that can appear
- **Event-Triggered Battles**: Specific events can trigger battles with predetermined troops
- **Area-Appropriate Encounters**: Different areas feature thematically appropriate troops

### 5.2 Relationship with Enemy Leveling

The enemy leveling system (documented in docs/reference/database/MegaEarth2049_Enemies_Documentation.md) applies to all enemies in a troop:
- Each enemy's level is determined independently based on its level range and fluctuation
- This creates varied difficulty even within the same troop type
- Troops in later areas will naturally be more difficult due to higher enemy base levels

### 5.3 Integration with Battle Animations

Troops interact with the animation system through:
- **Enemy Attack Animations**: Each enemy's actions trigger specific animations
- **Battle Event Animations**: Battle events can trigger custom animations
- **Position-Based Animations**: Animation positioning is affected by enemy positions

### 5.4 Integration with Battle System Plugins

MegaEarth2049 uses several Yanfly battle system plugins that enhance troop functionality:
- **YEP_BattleEngineCore**: Provides the foundation for enhanced battle mechanics
- **YEP_X_ActSeqPack**: Allows for custom action sequences in battle events
- **YEP_X_VisualHpGauge**: Displays HP gauges for enemies, affecting battle strategy

## 6. Creating New Troops

### 6.1 Technical Implementation

To create a new troop:

1. Add a new entry to Troops.json with a unique ID
2. Define the troop name (following naming conventions)
3. Add members with appropriate enemyId, x, y, and hidden values
4. Create battle event pages if needed
5. Test the troop in battle to ensure proper positioning and behavior

### 6.2 Balancing Considerations

When creating new troops, consider:
- **Difficulty Level**: Match to the area where the troop will appear
- **Enemy Synergy**: Choose enemies that work well together
- **Variety**: Include different enemy types for varied combat
- **Progression**: Create a sense of escalating challenge

### 6.3 Battle Event Scripting Guidelines

When creating battle events:
- **Use HP Thresholds**: Create dynamic battles that change as enemies take damage
- **Add Dialogue**: Include character-appropriate dialogue for immersion
- **Strategic Reveals**: Use hidden enemies for surprise elements
- **Visual Effects**: Incorporate animations for impactful moments
- **Reward Mechanics**: Consider adding special rewards for defeating challenging troops

### 6.4 Example: Creating a New Corporate Security Troop

For a new security troop in a corporate area:

```json
{
  "id": 51,
  "members": [
    {"enemyId": 1, "x": 250, "y": 400, "hidden": false},
    {"enemyId": 6, "x": 350, "y": 320, "hidden": false},
    {"enemyId": 7, "x": 450, "y": 400, "hidden": true}
  ],
  "name": "Security Detail",
  "pages": [
    {
      "conditions": {"enemyHp": 50, "enemyIndex": 1, "enemyValid": true},
      "list": [
        {"code": 101, "indent": 0, "parameters": ["", 0, 0, 0]},
        {"code": 401, "indent": 0, "parameters": ["Security breach detected! Backup requested!"]},
        {"code": 335, "indent": 0, "parameters": [2]},
        {"code": 0, "indent": 0, "parameters": []}
      ],
      "span": 0
    }
  ]
}
```

This creates a corporate security troop with:
- A basic security doll in the front
- A gas man in the back
- A hidden soldier that appears when the gas man reaches 50% HP
- A battle event that simulates calling for backup

## 7. Future Enhancement Opportunities

### 7.1 Advanced Battle Event Scripting

Future enhancements could include:
- **Conditional Enemy Actions**: Enemies that change tactics based on party composition
- **Environmental Effects**: Battle events that affect the battlefield environment
- **Interactive Elements**: Objects in battle that can be interacted with
- **Multi-Stage Boss Battles**: Bosses that transform or change phases

### 7.2 Dynamic Troop Generation

The system could be extended to support:
- **Procedurally Generated Troops**: Dynamically created based on area and difficulty
- **Adaptive Challenge**: Troops that adjust based on player level and party composition
- **Rare Encounter Variants**: Special versions of troops with unique enemies or rewards

### 7.3 Conditional Enemy Appearances

Future implementations could include:
- **Time-Based Encounters**: Different troops appearing based on in-game time
- **Weather-Dependent Enemies**: Troops that only appear during specific weather conditions
- **Reputation-Based Encounters**: Troops that appear based on player choices and reputation

## 8. Conclusion

The troop system in MegaEarth2049 creates diverse and engaging battle encounters that reflect the game's cyberpunk setting. By understanding the structure of the `Troops.json` file and the various troop types, AI assistants can create balanced and thematically appropriate encounters that enhance the game's narrative and progression.

When creating new troops or modifying existing ones, always consider their role in the game world, their relationship to the player's expected level and abilities, and how they contribute to the overall gameplay experience through strategic positioning, enemy combinations, and battle events.
