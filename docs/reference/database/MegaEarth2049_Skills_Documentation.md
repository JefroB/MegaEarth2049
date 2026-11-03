> Reference snapshot: verify IDs, effects and enabled-plugin behavior against the live data and current FAQs. This relocation does not certify the older catalog as current.

# MegaEarth2049 Skills.json Documentation

## Table of Contents
- [Overview](#overview)
- [Skills.json Structure](#skillsjson-structure)
- [Skill Types and Categories](#skill-types-and-categories)
- [Custom Notetags and Extensions](#custom-notetags-and-extensions)
- [Action Sequences](#action-sequences)
- [Integration with Other Systems](#integration-with-other-systems)
- [Skill Design Patterns](#skill-design-patterns)
- [Future Enhancement Opportunities](#future-enhancement-opportunities)

## Overview

The `Skills.json` file is a core component of the MegaEarth2049 RPG Maker MV project, defining all skills available to actors and enemies. This file has been extensively customized through various plugins and custom implementations to create a rich and dynamic skill system that integrates with multiple game mechanics.

This documentation provides a comprehensive guide to understanding how skills are implemented in MegaEarth2049, with special attention to:

1. The structure and properties of skills in the JSON file
2. Custom extensions through notetags
3. Integration with other systems like Party Limit Gauge and WeaponSkill
4. Action sequences for visual effects
5. Design patterns used throughout the skill system

## Skills.json Structure

### Basic Structure

Each skill in the `Skills.json` file is defined as a JSON object with various properties. The file begins with a `null` entry at index 0, followed by skill definitions starting from index 1.

```json
[
  null,
  {
    "id": 1,
    "animationId": -1,
    "damage": {
      "critical": true,
      "elementId": -1,
      "formula": "a.atk * 4",
      "type": 1,
      "variance": 20
    },
    "description": "",
    "effects": [
      {
        "code": 21,
        "dataId": 0,
        "value1": 1,
        "value2": 0
      }
    ],
    "hitType": 1,
    "iconIndex": 77,
    "message1": " attacks!",
    "message2": "",
    "mpCost": 0,
    "name": "Attack",
    "note": "Skill #1 will be used when you select\nthe Attack command.\n<setup action>\ndisplay action\nimmortal: targets, true\n</setup action>\n<target action>\nif user.attackMotion() !== 'missile'\nmove user: targets, front, 20\nelse\nperform start\nend\ncamera screen: target, front center, 20\ncamera focus: target, front center, 20\nwait for movement\nmotion attack: user\nwait: 10\nattack animation: target\nwait for animation\naction effect\n</target action>\n<Ally Party Limit Gauge: +1>\n<JP Gain: 8 + Math.randomInt(10)>",
    "occasion": 1,
    "repeats": 1,
    "requiredWtypeId1": 0,
    "requiredWtypeId2": 0,
    "scope": 1,
    "speed": 0,
    "stypeId": 0,
    "successRate": 100,
    "tpCost": 0,
    "tpGain": 12
  },
  // Additional skills...
]
```

### Key Properties

| Property | Description | Example |
|----------|-------------|---------|
| `id` | Unique identifier for the skill | `1` |
| `animationId` | ID of the animation to play when the skill is used | `-1` (uses weapon animation) |
| `damage` | Object containing damage calculation properties | See below |
| `description` | Text description of the skill | `"A powerful blow"` |
| `effects` | Array of effect objects that apply additional effects | See below |
| `hitType` | Type of hit (0: certain, 1: physical, 2: magical) | `1` |
| `iconIndex` | Index of the icon used for the skill | `77` |
| `message1` | Message displayed when using the skill | `" attacks!"` |
| `message2` | Secondary message displayed | `""` |
| `mpCost` | MP cost of the skill | `0` |
| `name` | Name of the skill | `"Attack"` |
| `note` | Custom notes field containing notetags | See below |
| `occasion` | When the skill can be used (0: always, 1: battle, 2: menu, 3: never) | `1` |
| `repeats` | Number of times the skill repeats | `1` |
| `requiredWtypeId1` | Required weapon type 1 | `0` |
| `requiredWtypeId2` | Required weapon type 2 | `0` |
| `scope` | Target scope (1: single enemy, 2: all enemies, etc.) | `1` |
| `speed` | Speed modifier for the skill | `0` |
| `stypeId` | Skill type ID | `0` |
| `successRate` | Success rate percentage | `100` |
| `tpCost` | TP cost of the skill | `0` |
| `tpGain` | TP gained from using the skill | `12` |

### Damage Object

The `damage` object contains properties that determine how damage is calculated:

```json
"damage": {
  "critical": true,
  "elementId": -1,
  "formula": "a.atk * 4",
  "type": 1,
  "variance": 20
}
```

| Property | Description | Example |
|----------|-------------|---------|
| `critical` | Whether the skill can critical | `true` |
| `elementId` | Element ID (-1 for weapon element) | `-1` |
| `formula` | JavaScript formula for damage calculation | `"a.atk * 4"` |
| `type` | Damage type (0: none, 1: HP damage, 2: MP damage, 3: HP recovery, 4: MP recovery, 5: HP drain, 6: MP drain) | `1` |
| `variance` | Variance percentage for damage randomization | `20` |

### Effects Array

The `effects` array contains objects that define additional effects:

```json
"effects": [
  {
    "code": 21,
    "dataId": 0,
    "value1": 1,
    "value2": 0
  }
]
```

| Property | Description | Example |
|----------|-------------|---------|
| `code` | Effect type code | `21` (Add State) |
| `dataId` | ID of the data to use (state, parameter, etc.) | `0` |
| `value1` | Primary value for the effect | `1` |
| `value2` | Secondary value for the effect | `0` |

Common effect codes:
- `11`: Add Buff
- `12`: Add Debuff
- `21`: Add State
- `22`: Remove State
- `31`: Add Parameter
- `32`: Remove Parameter
- `41`: Special Effect (escape, etc.)

## Skill Types and Categories

MegaEarth2049 organizes skills into several types (stypeId) that determine how they're categorized in menus and their general behavior:

### Skill Types

| stypeId | Type Name | Description | Examples |
|---------|-----------|-------------|----------|
| `0` | None | Basic commands like Attack and Guard | Attack (ID 1), Guard (ID 2) |
| `1` | Magic | Magical spells and incantations | Heal (ID 8), Fire (ID 9), Frost (ID 25) |
| `2` | Ability | Physical and special abilities | Dual Attack (ID 3), Slug (ID 11), Hammer Time (ID 14) |
| `3` | Tech | Technical and utility skills | (Reserved for future use) |
| `4` | Squad Attack | Powerful team-based attacks using Party Limit Gauge | Social Engineering (ID 101), Botnet (ID 103) |
| `5` | Cheer | Support and buff skills | Rally (ID 24), Cheer (ID 44) |

### Functional Categories

Beyond the formal skill types, skills are also organized into functional categories based on their effects and usage:

1. **Basic Combat Skills (IDs 1-7)**
   - Attack, Guard, Dual Attack, Double Attack, Triple Attack, Escape, Wait
   - These are fundamental combat actions available to all characters

2. **Elemental Magic (IDs 8-40)**
   - Organized by element: Fire (9, 21-23), Ice (25-27), Thunder (29-31), Earth (33-35), Water (37-39)
   - Three tiers of power for each element

3. **Physical Abilities (IDs 11-20, 42-93)**
   - Character-specific combat abilities
   - Includes weapon-specific techniques

4. **Support and Healing (IDs 8, 44-53)**
   - Healing, buffs, barriers, and other support abilities

5. **Squad Attacks (IDs 101-121)**
   - Powerful team-based attacks that use the Party Limit Gauge
   - Organized by character theme (hacking, religious, martial arts, etc.)

6. **Enemy-Only Skills (IDs 125-150)**
   - Skills that are only used by enemies
   - Includes special boss abilities

## Custom Notetags and Extensions

The `note` field of each skill contains custom notetags that extend the skill's functionality beyond what's possible with the standard RPG Maker MV properties. These notetags are processed by various plugins to add new features and behaviors.

### YEP_SkillCore Notetags

| Notetag | Description | Example |
|---------|-------------|---------|
| `<HP Cost: x>` | Sets an HP cost for the skill | `<HP Cost: 20>` |
| `<MP Cost: x>` | Overrides the default MP cost | `<MP Cost: 15>` |
| `<TP Cost: x>` | Overrides the default TP cost | `<TP Cost: 30>` |
| `<Hide in Battle>` | Hides the skill during battle | `<Hide in Battle>` |
| `<Hide in Field>` | Hides the skill outside of battle | `<Hide in Field>` |
| `<Custom Show Eval>...</Custom Show Eval>` | JavaScript code to determine if the skill should be shown | See example below |

Example of a custom show condition:
```
<Custom Show Eval>
var equips = user._equips
var gunOne;
var gunTwo;

user._equips.forEach(function(element) {
  if(element._dataClass == 'weapon') {
    var i = element._itemId;
    var itemName = $dataWeapons[i].baseItemName;
    if((itemName == 'Pea Shooter') || (itemName == 'Pee Shooter')) {
     gunOne = true;
    }
    if(itemName == 'Pee Shooter'){
     gunTwo = true;
    }
  }
});

if((gunOne === true) && (gunTwo === true)){
  visible = true;
} else {
  visible = false;
}
</Custom Show Eval>
```

### YEP_X_PartyLimitGauge Notetags

| Notetag | Description | Example |
|---------|-------------|---------|
| `<Ally Party Limit Gauge: +x>` | Adds x to the Party Limit Gauge when the skill is used | `<Ally Party Limit Gauge: +1>` |
| `<Party Limit Cost: x>` | Sets a Party Limit Gauge cost for the skill | `<Party Limit Cost: 2>` |

Almost all regular skills in MegaEarth2049 have the `<Ally Party Limit Gauge: +1>` notetag, which means using these skills adds 1 point to the Party Limit Gauge. This encourages players to use a variety of skills to build up the gauge.

The special "Squad Attack" skills (IDs 101-121) have the `<Party Limit Cost: X>` notetag, where X is the number of gauge increments required (typically 1, 2, or 4).

### YEP_JobPoints Notetags

| Notetag | Description | Example |
|---------|-------------|---------|
| `<JP Gain: x>` | Sets the amount of JP gained from using the skill | `<JP Gain: 15 + Math.randomInt(10)>` |

Regular skills typically provide `<JP Gain: 15 + Math.randomInt(10)>`, while Squad Attack skills provide significantly more JP with `<JP Gain: 100 + Math.randomInt(50)>`. This creates an incentive for players to build up and use their Party Limit Gauge for these powerful skills.

### Action Sequence Notetags

| Notetag | Description | Example |
|---------|-------------|---------|
| `<setup action>...</setup action>` | Defines actions to perform before the skill is executed | See below |
| `<whole action>...</whole action>` | Defines actions that affect all targets | See below |
| `<target action>...</target action>` | Defines actions to perform on each target | See below |
| `<follow action>...</follow action>` | Defines actions to perform after targeting | See below |
| `<finish action>...</finish action>` | Defines actions to perform at the end | See below |

These action sequence notetags are used to create custom animations and visual effects for skills. They are processed by the YEP_BattleEngineCore and YEP_X_ActSeqPack plugins.

## Action Sequences

Action sequences are a powerful feature that allows for custom animations and visual effects for skills. They are defined in the `note` field using special tags and are processed by the YEP_BattleEngineCore and YEP_X_ActSeqPack plugins.

### Action Sequence Structure

Each skill can have up to five different action sequence sections:

1. **Setup Action** (`<setup action>...</setup action>`)
   - Performed before the skill costs are paid
   - Used for initial setup, like displaying action text or setting immortality flags

2. **Whole Action** (`<whole action>...</whole action>`)
   - Performed after costs are paid but before individual target processing
   - Used for actions that affect all targets at once

3. **Target Action** (`<target action>...</target action>`)
   - Performed for each target individually
   - Used for the main effects of the skill

4. **Follow Action** (`<follow action>...</follow action>`)
   - Performed after all targets have been processed
   - Used for follow-up effects or cleanup

5. **Finish Action** (`<finish action>...</finish action>`)
   - Performed at the very end of the skill
   - Used for final cleanup and returning to normal battle state

### Common Action Sequence Commands

| Command | Description | Example |
|---------|-------------|---------|
| `display action` | Displays the skill name in the battle log | `display action` |
| `immortal: targets, true/false` | Makes targets immortal (can't die) | `immortal: targets, true` |
| `move user: targets, front, 20` | Moves the user to the front of targets at speed 20 | `move user: targets, front, 20` |
| `camera screen: target, front center, 20` | Moves the camera to focus on the target | `camera screen: target, front center, 20` |
| `wait for movement` | Waits for movement to complete | `wait for movement` |
| `motion attack: user` | Plays the attack motion for the user | `motion attack: user` |
| `wait: 10` | Waits for 10 frames | `wait: 10` |
| `attack animation: target` | Plays the attack animation on the target | `attack animation: target` |
| `wait for animation` | Waits for the animation to complete | `wait for animation` |
| `action effect` | Applies the skill's effects to the target | `action effect` |
| `zoom: 120%, 20` | Zooms the camera to 120% over 20 frames | `zoom: 120%, 20` |
| `face user: target` | Makes the user face the target | `face user: target` |
| `jump user: 200, 30` | Makes the user jump 200 pixels high over 30 frames | `jump user: 200, 30` |
| `wait for jump` | Waits for the jump to complete | `wait for jump` |
| `perform action` | Performs the action | `perform action` |
| `perform finish` | Finishes the action | `perform finish` |

### Example Action Sequence

Here's an example of a complete action sequence from the "Slug" skill (ID 11):

```
<Target Action>
move user: target, front head, 30
jump user: 200, 30
wait for jump
motion swing: user, no weapon
perform action
action animation: target
wait for animation
action effect: target
perform finish
</Target Action>
```

This sequence:
1. Moves the user to the front of the target's head
2. Makes the user jump
3. Waits for the jump to complete
4. Plays the swing motion without a weapon
5. Performs the action
6. Plays the skill animation on the target
7. Waits for the animation to complete
8. Applies the skill's effects to the target
9. Finishes the action

### Complex Action Sequence Example

Here's a more complex example from the "Fists of Fury" skill (ID 108):

```
<setup action>
immortal: targets, true
camera focus: user
display action
immortal: targets, true
perform start
wait: 5
motion skill: user
animation 52: user
wait for animation
wait for movement
</setup action>

<target action>
move user: target, front base, 15
wait for movement
wait: 15
motion victory: user
jump user: 100, 30
animation 2: target
action effect
wait: 5
float target: 200, 30
camera focus: target
wait for float
wait: 15
camera focus: user
float user: 300, 15
wait: 15
motion swing: user, no weapon
animation 6: target
action effect
wait: 15
move user: backward, 300, 30
face user: target
float user: 0, 30

camera focus: target
float target: 0, 10
wait: 10
shake screen: 5, 5, 30
action effect

wait: 45

motion spell: user
wait for animation
animation 150: target
Force Element: Fire
action effect
wait: 5
action effect
wait: 5
action effect
wait: 5
action effect
wait: 5
action effect
wait: 5
action effect
perform finish
reset camera: 15
reset zoom: 15
</target action>
```

This complex sequence creates a multi-hit martial arts attack with camera movements, jumps, floats, and multiple damage applications.

## Integration with Other Systems

The skill system in MegaEarth2049 is deeply integrated with several other game systems, creating a cohesive and interconnected gameplay experience.

### WeaponSkill Integration

The WeaponSkill plugin allows weapons to use custom skills instead of the default Attack command. This is achieved by adding a note tag to weapons in the database:

```
<skill_id:X>
```

Where X is the ID of the skill to be used when attacking with that weapon.

For example, a weapon with `<skill_id:200>` would use the "Rapid Fire" skill (ID 200) when attacking, which hits twice for 70% damage each.

This system allows for character-specific weapons that complement their roles:

1. **Rex (Hacker)**
   - Data Spike: `<skill_id:210>` - Data Breach (Damage + defense down)
   - Neural Disruptor: `<skill_id:211>` - System Crash (Damage + chance to stun)
   - Hacking Deck: `<skill_id:212>` - Backdoor Access (Damage + party damage buff)

2. **Jen (Priest/Medic)**
   - Med-Staff: `<skill_id:215>` - Healing Strike (Damage + heal ally)
   - Cleansing Gun: `<skill_id:216>` - Purifying Shot (Damage + remove debuffs)
   - Regen Wand: `<skill_id:217>` - Rejuvenation Wave (AoE damage + party heal)

3. **Zack (Construction Worker)**
   - Pneumatic Hammer: `<skill_id:220>` - Demolition Strike (Heavy damage + break barriers)
   - Scanning Drill: `<skill_id:221>` - Structural Weakness (Damage + vulnerability)
   - Explosive Wrench: `<skill_id:222>` - Area Demolition (AoE damage)

4. **Zed (Mod Doctor)**
   - Mod Syringe: `<skill_id:225>` - Experimental Injection (Damage + random status)
   - Overclocking Tool: `<skill_id:226>` - Cybernetic Overload (Damage + chance for bonus)
   - Prototype Implanter: `<skill_id:227>` - Unstable Modification (Variable damage)

### Party Limit Gauge Integration

The Party Limit Gauge is a shared resource for the entire party that fills up during battle based on various actions. This gauge can then be spent to use powerful "Squad Attack" skills.

1. **Regular Skills Contributing to the Gauge**
   - Almost all regular skills have the `<Ally Party Limit Gauge: +1>` notetag
   - Using these skills adds 1 point to the Party Limit Gauge
   - This encourages players to use a variety of skills

2. **Squad Attack Skills Using the Gauge**
   - Special high-powered skills (IDs 101-121) require Party Limit Gauge to use
   - These skills have the `<Party Limit Cost: X>` notetag
   - Costs range from 1 to 4 gauge increments
   - Examples:
     - "Social Engineering" (ID 101): Costs 2 gauge increments
     - "Man in the Middle" (ID 102): Costs 1 gauge increment
     - "Botnet" (ID 103): Costs 4 gauge increments

3. **Weapons That Interact with the Gauge**
   - Some weapons have skills that specifically interact with the Party Limit Gauge
   - Examples:
     - Energy Blade: Energy Siphon (Damage + +2 Party Limit)
     - Tactical Scanner: Team Coordinator (Damage + conditional +3 Party Limit)
     - Limit Catalyst: Limit Breaker (Uses 1 Party Limit + 150% damage)

### Job Points Integration

The Job Points (JP) system is integrated with all skills in the game:

1. **JP Gain from Skills**
   - Regular skills provide `<JP Gain: 15 + Math.randomInt(10)>`
   - Squad Attack skills provide `<JP Gain: 100 + Math.randomInt(50)>`
   - This creates an incentive for using Squad Attack skills

2. **JP for Skill Learning**
   - JP earned from using skills can be spent to learn new skills
   - This creates a progression system where using skills leads to learning more skills

3. **JP-Enhancing Weapons**
   - Some weapons have skills that specifically enhance JP gain
   - Examples:
     - Data Extractor: Knowledge Extractor (Damage + JP on kill)
     - Wisdom Staff: Experience Amplifier (Damage + party JP)

### Row Formation Integration

The Row Formation system allows characters to be positioned in front, middle, or back rows, which affects their damage output and vulnerability:

1. **Row-Based Skills**
   - Some skills have different effects based on the user's row position
   - Examples:
     - Front Line Assault: 130% damage from front row, 70% from other rows
     - Ranged Precision: 120% damage from back row, 80% from other rows

2. **Row-Dependent Weapons**
   - Some weapons are designed for specific row positions
   - Examples:
     - Front-liner: Front Line Assault (130% damage from front row)
     - Long-range Rifle: Ranged Precision (120% damage from back row)
     - Tactical Weapon: Tactical Position (Row-based damage)

## Skill Design Patterns

Throughout the skills.json file, several design patterns emerge that show how skills are structured and balanced:

### Tiered Skill Progression

Many skill types follow a tiered progression pattern, with higher tiers costing more but dealing more damage:

1. **Elemental Magic Tiers**
   - Tier 1: 10 MP, single target, formula: `100 + a.mat * 2`
   - Tier 2: 25 MP, single target, formula: `100 + a.mat * 4`
   - Tier 3: 50 MP, all enemies, formula: `100 + a.mat * 6`

2. **Physical Ability Tiers**
   - Basic: 7-10 TP, single target, formula: `a.atk * 4-5`
   - Advanced: 15-20 TP, single/multiple targets, formula: `a.atk * 6-7`
   - Master: 30+ TP, multiple targets, formula: `a.atk * 8-10`

### Cost-Effect Balance

Skills are balanced by adjusting costs based on their effects:

1. **Single Target vs. Multi-Target**
   - Multi-target skills typically deal less damage per target
   - Example: "Triple Attack" (ID 5) hits 3 random enemies but uses the same formula as "Attack"

2. **Damage vs. Utility**
   - Skills with additional effects (status, buffs, etc.) deal less base damage
   - Example: "Neural Hack" (ID 203) deals 80% damage but has a 30% chance to confuse

3. **Resource Type Balance**
   - HP costs: High-risk, high-reward skills
   - MP costs: Sustainable but limited by MP pool
   - TP costs: Requires building TP through actions
   - Party Limit costs: Powerful but requires team effort to build

### Character Role Specialization

Skills are designed to reinforce character roles:

1. **Rex (Hacker)**
   - Focus on technical skills and debuffs
   - Examples: "Hack", "Data Mining", "Firewall", "System Crash"

2. **Jen (Priest/Medic)**
   - Focus on healing and support
   - Examples: "Heal", "Blessing", "Sermon", "Hymn"

3. **Zack (Construction Worker)**
   - Focus on physical damage and barrier breaking
   - Examples: "Demolition Strike", "Structural Weakness", "Area Demolition"

4. **Zed (Mod Doctor)**
   - Focus on experimental effects and status changes
   - Examples: "Experimental Injection", "Cybernetic Overload", "Unstable Modification"

### Cyberpunk Theming

Skills are themed around cyberpunk concepts:

1. **Hacking and Technology**
   - Examples: "Hack", "Firewall", "System Crash", "Malware Injection"

2. **Corporate Influence**
   - Examples: "Corporate Takeover", "Suppression Fire", "Executive Override"

3. **Body Modification**
   - Examples: "Cybernetic Overload", "Genetic Corruption", "Cellular Modification"

4. **Dystopian Society**
   - Examples: "Social Engineering", "Man in the Middle", "Crowd Control"

## Future Enhancement Opportunities

Based on the current implementation, there are several opportunities for future enhancements to the skill system:

### New Skill Types

1. **Combo Skills**
   - Skills that become more powerful when used in sequence
   - Example: "Hack" → "Data Mining" → "System Crash" for increasing effects

2. **Environmental Skills**
   - Skills that interact with the battle environment
   - Example: "Electrical Surge" that deals more damage in wet environments

3. **Team Skills**
   - Skills that require specific party compositions
   - Example: "Synchronized Attack" that deals more damage when specific characters are in the party

### System Expansions

1. **Skill Customization System**
   - Allow players to modify skills with "mods" or "upgrades"
   - Example: Add elemental effects, increase damage, reduce costs

2. **Skill Evolution**
   - Skills that change or evolve based on usage
   - Example: "Hack" evolves into "Advanced Hack" after being used 50 times

3. **Skill Synergy**
   - Skills that have special effects when used by specific characters or in specific combinations
   - Example: Rex's "Hack" and Zed's "Experimental Injection" combine for a special effect

### Technical Improvements

1. **Dynamic Skill Generation**
   - Generate skills procedurally based on equipment or character state
   - Example: Weapons with random skill properties

2. **AI Skill Usage**
   - Improve enemy AI to use skills more strategically
   - Example: Enemies that target character weaknesses or exploit status effects

3. **Skill Animation Enhancements**
   - More complex and visually impressive action sequences
   - Example: Camera movements, particle effects, screen filters

### Content Expansions

1. **Corporate-Themed Skill Sets**
   - Expand the corporate-themed skills for each of the five MegaCorps
   - Example: Complete sets for NeuraTech, OmniCorp, Vitalix, Armatek, and Quantum Dynamics

2. **Location-Specific Skills**
   - Skills that are only available in certain locations
   - Example: "Hacking" skills are more effective in corporate areas

3. **Story-Driven Skill Unlocks**
   - Skills that are unlocked through story progression
   - Example: Special abilities gained after key story events
