> Reference snapshot: verify IDs, effects and enabled-plugin behavior against the live data and current FAQs. This relocation does not certify the older catalog as current.

# MegaEarth2049 Actors and Classes Documentation

This document provides detailed information about the character system in MegaEarth2049, focusing on the `Actors.json` and `Classes.json` files, their structure, relationship, and how they integrate with other game systems.

## 1. Overview of the Character System

In MegaEarth2049, characters are defined through a combination of two primary components:

1. **Actors**: Individual characters with unique identities, appearances, and personal traits
2. **Classes**: Role-based templates that define abilities, stat growth, and learnable skills

This separation allows for a flexible character system where different actors can share class-based abilities while maintaining their unique identities and specializations.

## 2. Actors.json Structure

The `Actors.json` file defines all playable and important non-playable characters in the game. Each actor entry contains:

```json
{
  "id": 1,
  "battlerName": "Rex",
  "characterIndex": 0,
  "characterName": "Rex_walk",
  "classId": 1,
  "equips": [14, 22, 0, 3, 0, null, 0],
  "faceIndex": 0,
  "faceName": "Rex",
  "traits": [
    {"code": 51, "dataId": 9, "value": 1},
    {"code": 51, "dataId": 1, "value": 1},
    {"code": 51, "dataId": 2, "value": 1},
    {"code": 51, "dataId": 12, "value": 1},
    {"code": 51, "dataId": 13, "value": 1},
    {"code": 51, "dataId": 14, "value": 1},
    {"code": 55, "dataId": 1, "value": 1},
    {"code": 43, "dataId": 13, "value": 1},
    {"code": 43, "dataId": 44, "value": 1}
  ],
  "initialLevel": 1,
  "maxLevel": 99,
  "name": "Rex",
  "nickname": "",
  "note": "<battle command: attack />\n<battle command: guard />\n<battle command: skill_type 5 />\n<battle command: skill_type 2 />\n<battle command: skill_type 3 />\n<battle command: skill_type 4 />\n<battle command: item />",
  "profile": ""
}
```

### 2.1 Key Properties

- **id**: Unique identifier for the actor
- **name**: Display name of the character
- **classId**: Reference to the class definition in Classes.json
- **characterName/characterIndex**: Sprite sheet reference for map representation
- **faceName/faceIndex**: Portrait image reference for dialogue
- **battlerName**: Battle sprite reference
- **initialLevel/maxLevel**: Starting level and level cap
- **equips**: Array of initially equipped items (weapons, armor, accessories)
- **traits**: Array of innate character traits (abilities, resistances, etc.)
- **note**: Custom properties and battle commands using note tags
- **profile**: Character background information

### 2.2 Visual Representation

Actors in MegaEarth2049 have multiple visual representations:

- **Map Sprites**: Defined by `characterName` and `characterIndex`
- **Face Portraits**: Defined by `faceName` and `faceIndex`
- **Battle Sprites**: Defined by `battlerName`

These visual elements create a consistent character appearance across different game contexts.

### 2.3 Trait System

Actor traits define innate abilities and characteristics:

```json
{"code": 51, "dataId": 9, "value": 1}
```

Where:
- **code**: Trait category (e.g., 51 = Attack Element)
- **dataId**: Specific trait within the category (e.g., 9 = Element ID)
- **value**: Effect magnitude or boolean flag

Common trait codes in MegaEarth2049:
- **11**: Element Rate
- **21**: State Rate
- **22**: State Resist
- **23**: Parameter
- **31**: Attack Element
- **32**: Attack State
- **33**: Attack Speed
- **34**: Attack Times
- **41**: Skill Type
- **43**: Skill Learn
- **51**: Attack Element
- **52**: Attack State
- **55**: Debuff Rate

### 2.4 Battle Commands

The `note` field contains battle commands that define available actions:

```
<battle command: attack />
<battle command: guard />
<battle command: skill_type 5 />
<battle command: skill_type 2 />
<battle command: skill_type 3 />
<battle command: skill_type 4 />
<battle command: item />
```

These commands determine what appears in the actor's battle menu, including:
- Basic commands (attack, guard, item)
- Access to skill types (magic, special abilities, etc.)

## 3. Classes.json Structure

The `Classes.json` file defines character classes that determine stat growth, learnable skills, and class-specific traits:

```json
{
  "id": 1,
  "expParams": [34, 20, 50, 30],
  "traits": [
    {"code": 23, "dataId": 0, "value": 1},
    {"code": 22, "dataId": 0, "value": 0.95},
    {"code": 22, "dataId": 1, "value": 0.05},
    {"code": 22, "dataId": 2, "value": 0.04},
    {"code": 41, "dataId": 2, "value": 0},
    {"code": 52, "dataId": 3, "value": 0},
    {"code": 52, "dataId": 1, "value": 0},
    {"code": 52, "dataId": 5, "value": 0},
    {"code": 51, "dataId": 9, "value": 1},
    {"code": 41, "dataId": 5, "value": 1},
    {"code": 51, "dataId": 9, "value": 0},
    {"code": 51, "dataId": 1, "value": 1},
    {"code": 51, "dataId": 2, "value": 1},
    {"code": 52, "dataId": 2, "value": 1}
  ],
  "learnings": [
    {"level": 1, "note": "", "skillId": 6},
    {"level": 2, "note": "", "skillId": 32},
    {"level": 3, "note": "", "skillId": 10},
    {"level": 5, "note": "", "skillId": 48},
    {"level": 8, "note": "", "skillId": 52},
    {"level": 11, "note": "Squad Attack", "skillId": 102},
    {"level": 14, "note": "", "skillId": 50},
    {"level": 17, "note": "", "skillId": 51},
    {"level": 20, "note": "Squad Attack", "skillId": 101},
    {"level": 23, "note": "", "skillId": 53},
    {"level": 26, "note": "", "skillId": 49},
    {"level": 29, "note": "Squad Attack", "skillId": 103},
    {"level": 1, "note": "", "skillId": 44}
  ],
  "name": "Hacker",
  "note": "<JP Rate: 107%>\n<Learn Skill: 202 to 222>\n<Weapon Unleash 2%: 3>\n<Guard Unleash 5%: 24>",
  "params": [
    [1, 450, 537, 622, 708, 793, 877, 961, 1045, 1128, 1211, 1294, 1376, 1457, 1539, 1619, 1700, 1780, 1860, 1939, 2018, 2096, 2174, 2252, 2329, 2406, 2482, 2558, 2634, 2709, 2783, 2858, 2932, 3005, 3078, 3151, 3223, 3295, 3367, 3438, 3509, 3579, 3649, 3718, 3787, 3856, 3924, 3992, 4060, 4127, 4193, 4259, 4325, 4391, 4456, 4520, 4584, 4648, 4712, 4774, 4837, 4899, 4961, 5022, 5083, 5144, 5204, 5264, 5323, 5382, 5440, 5498, 5556, 5613, 5670, 5727, 5783, 5838, 5893, 5948, 6003, 6057, 6110, 6164, 6216, 6269, 6321, 6372, 6423, 6474, 6525, 6575, 6624, 6673, 6722, 6770, 6818, 6866, 6913, 6959],
    [0, 90, 100, 110, 120, 130, 140, 150, 160, 170, 180, 190, 200, 210, 220, 230, 240, 250, 260, 270, 280, 290, 300, 310, 320, 330, 340, 350, 360, 370, 380, 390, 400, 410, 420, 430, 440, 450, 460, 470, 480, 490, 500, 510, 520, 530, 540, 550, 560, 570, 580, 590, 600, 610, 620, 630, 640, 650, 660, 670, 680, 690, 700, 710, 720, 730, 740, 750, 760, 770, 780, 790, 800, 810, 820, 830, 840, 850, 860, 870, 880, 890, 900, 910, 920, 930, 940, 950, 960, 970, 980, 990, 1000, 1010, 1020, 1030, 1040, 1050, 1060, 1070],
    [1, 16, 18, 19, 20, 21, 23, 24, 25, 26, 28, 29, 30, 31, 33, 34, 35, 36, 38, 39, 40, 41, 43, 44, 45, 46, 48, 49, 50, 51, 53, 54, 55, 56, 58, 59, 60, 61, 63, 64, 65, 66, 68, 69, 70, 71, 73, 74, 75, 76, 77, 79, 80, 81, 82, 84, 85, 86, 87, 89, 90, 91, 92, 94, 95, 96, 97, 99, 100, 101, 102, 104, 105, 106, 107, 109, 110, 111, 112, 114, 115, 116, 117, 119, 120, 121, 122, 124, 125, 126, 127, 129, 130, 131, 132, 134, 135, 136, 137, 138],
    [0, 16, 18, 19, 20, 21, 23, 24, 25, 26, 28, 29, 30, 31, 33, 34, 35, 36, 38, 39, 40, 41, 43, 44, 45, 46, 48, 49, 50, 51, 53, 54, 55, 56, 58, 59, 60, 61, 63, 64, 65, 66, 68, 69, 70, 71, 73, 74, 75, 76, 77, 79, 80, 81, 82, 84, 85, 86, 87, 89, 90, 91, 92, 94, 95, 96, 97, 99, 100, 101, 102, 104, 105, 106, 107, 109, 110, 111, 112, 114, 115, 116, 117, 119, 120, 121, 122, 124, 125, 126, 127, 129, 130, 131, 132, 134, 135, 136, 137, 138],
    [0, 16, 18, 19, 20, 21, 23, 24, 25, 26, 28, 29, 30, 31, 33, 34, 35, 36, 38, 39, 40, 41, 43, 44, 45, 46, 48, 49, 50, 51, 53, 54, 55, 56, 58, 59, 60, 61, 63, 64, 65, 66, 68, 69, 70, 71, 73, 74, 75, 76, 77, 79, 80, 81, 82, 84, 85, 86, 87, 89, 90, 91, 92, 94, 95, 96, 97, 99, 100, 101, 102, 104, 105, 106, 107, 109, 110, 111, 112, 114, 115, 116, 117, 119, 120, 121, 122, 124, 125, 126, 127, 129, 130, 131, 132, 134, 135, 136, 137, 138],
    [0, 16, 18, 19, 20, 21, 23, 24, 25, 26, 28, 29, 30, 31, 33, 34, 35, 36, 38, 39, 40, 41, 43, 44, 45, 46, 48, 49, 50, 51, 53, 54, 55, 56, 58, 59, 60, 61, 63, 64, 65, 66, 68, 69, 70, 71, 73, 74, 75, 76, 77, 79, 80, 81, 82, 84, 85, 86, 87, 89, 90, 91, 92, 94, 95, 96, 97, 99, 100, 101, 102, 104, 105, 106, 107, 109, 110, 111, 112, 114, 115, 116, 117, 119, 120, 121, 122, 124, 125, 126, 127, 129, 130, 131, 132, 134, 135, 136, 137, 138],
    [0, 32, 35, 37, 40, 42, 45, 47, 50, 52, 55, 57, 60, 62, 65, 67, 70, 72, 75, 77, 80, 82, 85, 87, 90, 92, 95, 97, 100, 102, 105, 107, 110, 112, 115, 117, 120, 122, 125, 127, 130, 132, 135, 137, 140, 142, 145, 147, 150, 152, 155, 157, 160, 162, 165, 167, 170, 172, 175, 177, 180, 182, 185, 187, 190, 192, 195, 197, 200, 202, 205, 207, 210, 212, 215, 217, 220, 222, 225, 227, 230, 232, 235, 237, 240, 242, 245, 247, 250, 252, 255, 257, 260, 262, 265, 267, 270, 272, 275, 277],
    [1, 32, 39, 46, 52, 59, 65, 72, 78, 85, 91, 97, 104, 110, 116, 122, 128, 134, 140, 146, 152, 158, 164, 170, 176, 181, 187, 193, 198, 204, 210, 215, 221, 226, 231, 237, 242, 247, 253, 258, 263, 268, 273, 278, 283, 288, 293, 298, 303, 308, 313, 317, 322, 327, 331, 336, 341, 345, 350, 354, 358, 363, 367, 371, 376, 380, 384, 388, 392, 396, 400, 404, 408, 412, 416, 420, 423, 427, 431, 435, 438, 442, 445, 449, 452, 456, 459, 462, 466, 469, 472, 475, 479, 482, 485, 488, 491, 494, 497, 499]
  ]
}
```

### 3.1 Key Properties

- **id**: Unique identifier for the class
- **name**: Display name of the class
- **expParams**: Experience curve parameters [base, extra, acceleration, correction]
- **traits**: Class-specific traits (abilities, resistances, etc.)
- **learnings**: Skills learned at specific levels
- **params**: Stat growth curves for each parameter at each level
- **note**: Custom properties using note tags

### 3.2 Experience Curve

The `expParams` array defines how much experience is needed to level up:

```json
"expParams": [34, 20, 50, 30]
```

Where:
- First value: Base value
- Second value: Extra value
- Third value: Acceleration
- Fourth value: Correction

These values are used in a formula to calculate the experience required for each level.

### 3.3 Skill Learning System

The `learnings` array defines skills that characters of this class automatically learn at specific levels:

```json
"learnings": [
  {"level": 1, "note": "", "skillId": 6},
  {"level": 2, "note": "", "skillId": 32}
]
```

Where:
- **level**: Level at which the skill is learned
- **skillId**: Reference to the skill in Skills.json
- **note**: Optional notes about the skill learning

### 3.4 Parameter Growth

The `params` property contains 8 arrays, one for each core parameter:

1. Max HP
2. Max MP
3. Attack
4. Defense
5. Magic Attack
6. Magic Defense
7. Agility
8. Luck

Each array contains 99 values representing the parameter value at each level from 1 to 99.

## 4. Key Characters in MegaEarth2049

### 4.1 Playable Characters

#### Rex (ID 1, Hacker)
- **Role**: Protagonist with neural implant issues
- **Specialization**: Hacking, digital manipulation
- **Unique Traits**: Access to circuit bending and digital skills
- **Background**: Main character whose neural implant connects to A.S.P.

#### Jen (ID 2, Priest)
- **Role**: Support character with healing abilities
- **Specialization**: Healing, barriers, status management
- **Unique Traits**: Access to healing and support magic
- **Background**: Former OmniCorp Security, now helps Rex

#### Zack (ID 3, Construction Worker)
- **Role**: Physical damage dealer and tank
- **Specialization**: Heavy weapons, demolition
- **Unique Traits**: High HP, defense, and physical attacks
- **Background**: Hispanic worker who knows MegaEarth's infrastructure

#### Zed (ID 4, Mod Doctor)
- **Role**: Technical specialist with unique abilities
- **Specialization**: Cybernetic modifications, status effects
- **Unique Traits**: Access to experimental procedures
- **Background**: Underground cybernetic enhancement specialist

### 4.2 Supporting Characters

#### Jack (ID 9, Smuggler)
- **Role**: Resource provider
- **Specialization**: Item acquisition and transportation
- **Background**: Moves goods between locations

#### Dick (ID 10, Thief)
- **Role**: Stealth specialist
- **Specialization**: Stealing, agility-based attacks
- **Background**: Steals for the thrill

### 4.3 Antagonists

#### Ninjas (IDs 5-7)
- **Role**: Enemy combatants
- **Specialization**: Stealth attacks, status effects
- **Variants**: Black, Blue, and Pink Ninjas with different abilities

#### A.S.P. (IDs 11-12)
- **Role**: Main antagonist force
- **Description**: Advanced Security Protocol manifestations
- **Specialization**: Digital corruption and control

## 5. Class System Design

MegaEarth2049 features a diverse class system that reflects the cyberpunk setting:

### 5.1 Hacker (Class 1)
- **Primary Character**: Rex
- **Focus**: Digital manipulation, tech skills
- **Key Skills**: Circuit Bend, DDOS, Firewall, Proxy
- **Stat Focus**: Balanced with emphasis on Magic Attack and MP

### 5.2 Punk (Class 2)
- **Primary Character**: Niles "Stinky"
- **Focus**: Physical combat, street fighting
- **Key Skills**: Bash, Slam, Slamdance, Headbang
- **Stat Focus**: High HP and Attack

### 5.3 Construction Worker (Class 3)
- **Primary Character**: Zack
- **Focus**: Building, demolition, heavy weapons
- **Key Skills**: Hammer Time, Demolition, Build, Wreck
- **Stat Focus**: High HP, Defense, and Attack

### 5.4 Priest (Class 4)
- **Primary Character**: Jen
- **Focus**: Healing, support, barriers
- **Key Skills**: Heal, Barrier, Magic Barrier, Blessing
- **Stat Focus**: High MP, Magic Defense, and Magic Attack

### 5.5 Ninja (Class 5)
- **Primary Characters**: Various Ninjas
- **Focus**: Stealth, precision attacks, status effects
- **Key Skills**: Slice, Dice, Smoke Bomb, Assassination
- **Stat Focus**: High Agility and Attack

### 5.6 Mod Doctor (Class 7)
- **Primary Character**: Zed
- **Focus**: Cybernetic enhancements, status management
- **Key Skills**: Cure, Quarantine, Surgical Strike, Disembowel
- **Stat Focus**: Balanced with emphasis on Magic Attack

### 5.7 Thief (Class 8)
- **Primary Character**: Dick
- **Focus**: Stealing, agility-based attacks
- **Key Skills**: Steal, Slug
- **Stat Focus**: High Agility and Luck

### 5.8 Smuggler (Class 9)
- **Primary Character**: Jack
- **Focus**: Resource acquisition and transportation
- **Key Skills**: Steal (variant)
- **Stat Focus**: Balanced with emphasis on Luck

## 6. Integration with Other Game Systems

### 6.1 Skills System

The actor-class system integrates with Skills.json through:
- Class-based skill learning (`learnings` property)
- Actor-specific battle commands (`note` field)
- Trait-based skill access (`traits` property)

Skills are organized into types (magic, special abilities, etc.) that can be accessed through battle commands.

### 6.2 Equipment System

Actors have equipment slots defined in their `equips` array:

```json
"equips": [14, 22, 0, 3, 0, null, 0]
```

These reference items from:
- Weapons.json
- Armors.json (includes armor, accessories, etc.)

Equipment affects actor stats and may provide additional traits or abilities.

### 6.3 State System

Both actors and classes can have traits that affect state application and resistance:

```json
{"code": 22, "dataId": 0, "value": 0.95}  // State rate
```

States (defined in States.json) include status effects, buffs, debuffs, and special conditions.

### 6.4 Battle System

The actor-class system influences battle through:
- Available commands (from actor notes)
- Learnable skills (from class learnings)
- Stat values (from class params and actor/class traits)
- Equipment options (from actor equips)

### 6.5 Squad Attack System

MegaEarth2049 features a special "Squad Attack" system noted in class learnings:

```json
{"level": 11, "note": "Squad Attack", "skillId": 102}
```

These powerful cooperative attacks involve multiple party members and are learned at specific levels.

## 7. Creating New Actors and Classes

When creating new actors or classes for MegaEarth2049, follow these guidelines:

### 7.1 Actor Creation Guidelines

1. **Assign a unique ID** higher than existing actors
2. **Select an appropriate class** that matches the character concept
3. **Define visual assets** (character sprites, face portraits, battle sprites)
4. **Set initial equipment** appropriate for the character's role
5. **Add character-specific traits** that reflect unique abilities
6. **Configure battle commands** in the note field
7. **Write a profile** that explains the character's background

### 7.2 Class Creation Guidelines

1. **Assign a unique ID** higher than existing classes
2. **Define experience parameters** consistent with other classes
3. **Set appropriate traits** that reflect the class's specialization
4. **Create a skill learning progression** that makes sense for the class
5. **Configure parameter growth curves** that support the class's role
6. **Add class-specific notes** for special features or mechanics

### 7.3 Integration Considerations

When adding new actors or classes, consider:
- **Narrative fit**: How the character fits into the MegaEarth2049 story
- **Mechanical balance**: Ensuring the character isn't over or underpowered
- **Unique identity**: Providing distinctive abilities and traits
- **Progression path**: Creating a satisfying skill learning curve

## 8. Technical Implementation Details

### 8.1 Actor-Class Relationship

The relationship between actors and classes is implemented through the `classId` property in Actors.json:

```json
"classId": 1
```

This creates a one-to-many relationship where:
- One class can be used by multiple actors
- Each actor has exactly one class

### 8.2 Parameter Calculation

An actor's final parameters are calculated using:
- Base values from the class's `params` property
- Modifications from actor and class traits
- Bonuses from equipped items
- Temporary effects from states and buffs

### 8.3 Skill Availability

Skills become available to actors through:
- Class-based learning at specific levels
- Equipment that grants skills
- Traits that enable skill types
- Battle commands that provide access to skill categories

### 8.4 Note Tag Processing

Custom functionality is implemented through note tags in the `note` field:

```
<JP Rate: 107%>
<Learn Skill: 202 to 222>
<Weapon Unleash 2%: 3>
<Guard Unleash 5%: 24>
```

These tags are processed by the game engine or plugins to provide additional features.

## 9. Best Practices for AI Assistants

When working with Actors.json and Classes.json in MegaEarth2049, AI assistants should:

### 9.1 Maintain Consistency

- Preserve the existing actor-class relationships
- Follow established naming conventions
- Maintain the cyberpunk aesthetic and themes
- Ensure new content fits the game's narrative

### 9.2 Balance Considerations

- Review existing actors and classes for balance benchmarks
- Ensure new actors aren't overpowered or underpowered
- Create appropriate skill learning progressions
- Balance parameter growth curves

### 9.3 Technical Accuracy

- Use correct property names and data types
- Ensure IDs are unique and references are valid
- Follow the established trait coding system
- Properly format note tags for plugin compatibility

### 9.4 Integration Focus

- Consider how actors and classes interact with other systems
- Ensure equipment compatibility makes sense
- Create appropriate skill type access
- Maintain narrative consistency with the game world

## 10. Conclusion

The actor and class systems in MegaEarth2049 form the foundation of character development and progression. By understanding the structure and relationships between Actors.json and Classes.json, AI assistants can create new content that seamlessly integrates with the existing game world, maintains mechanical balance, and enhances the cyberpunk narrative of MegaEarth2049.

When creating or modifying actors and classes, always consider their role in the broader game context, their relationship to other systems, and how they contribute to the player experience. Well-designed characters can significantly improve gameplay depth, narrative engagement, and overall enjoyment of the MegaEarth2049 experience.
