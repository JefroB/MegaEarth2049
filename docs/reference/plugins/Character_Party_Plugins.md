> Reference snapshot: verify IDs, effects and enabled-plugin behavior against the live data and current FAQs. This relocation does not certify the older catalog as current.

# Character and Party Plugins Documentation

This document provides detailed information about character and party related plugins used in the MegaEarth2049 RPG Maker MV project.

## Table of Contents
- [Overview](#overview)
- [Plugin List](#plugin-list)
- [Detailed Documentation](#detailed-documentation)
  - [YEP_PartySystem](#yep_partysystem)
  - [YEP_JobPoints](#yep_jobpoints)
  - [YEP_SkillCore](#yep_skillcore)
  - [YEP_SkillLearnSystem](#yep_skilllearnsystem)
  - [YEP_X_PartyLimitGauge](#yep_x_partylimitgauge)
  - [ROKI_HealOnLvUp](#roki_healOnlvup)
- [Integration Examples](#integration-examples)
- [Related Documentation](#related-documentation)

## Overview

The character and party systems in MegaEarth2049 are enhanced through a collection of plugins that expand the default RPG Maker MV functionality. These plugins work together to create more dynamic character progression, party management, and skill systems.

### Plugin Dependencies

```
YEP_SkillCore
└── YEP_X_PartyLimitGauge

YEP_JobPoints
└── YEP_SkillLearnSystem
```

## Plugin List

| Plugin Name | Version | Status | Description |
|-------------|---------|--------|-------------|
| YEP_PartySystem | v1.13 | Enabled | Replaces the default 'Formation' command with a new menu for party formations |
| YEP_JobPoints | v1.09 | Enabled | Enables actors to acquire JP (job points) for other plugins |
| YEP_SkillCore | v1.12 | Enabled | Gives skills more functions and different types of costs |
| YEP_SkillLearnSystem | v1.16 | Enabled | Allows actors to learn skills through crafting them via items or JP |
| YEP_X_PartyLimitGauge | v1.10 | Enabled | Adds a party-wide skill resource accessible across all members |
| ROKI_HealOnLvUp | N/A | Enabled | Heals HP/MP when actors level up |

## Detailed Documentation

### YEP_PartySystem

#### Overview
The YEP_PartySystem plugin replaces RPG Maker MV's default 'Formation' command with a more robust party management system. This plugin allows players to easily change party formations, add/remove party members, and view detailed information about each character.

#### Configuration in MegaEarth2049
- **Max Battle Members**: 4 (Maximum number of characters allowed in the active battle party)
- **Show Battle Command**: true (Shows the formation command during battle)
- **Enable Battle Command**: true (Allows formation changes during battle)
- **Battle Cooldown**: 1 (Number of turns required before formation can be changed again in battle)
- **Maximum Followers**: 1 (Maximum number of visible followers on the map)
- **EXP Distribution**: false (Experience is not distributed to inactive party members)
- **Help Window**: false (No help window is displayed in the party menu)
- **Text Alignment**: center (Text is centered in the party menu)
- **Change Command**: Change (Text for the command to change a party member)
- **Remove Command**: Remove (Text for the command to remove a party member)
- **Revert Command**: Revert (Text for the command to revert changes)
- **Finish Command**: Finish (Text for the command to finalize changes)
- **Empty Text**: - Empty - (Text displayed for empty party slots)
- **Actor Face**: true (Shows character face graphics)
- **Actor Sprite**: true (Shows character sprite graphics)
- **Remove Icon**: 16 (Icon used for the remove command)
- **Show Sprite**: true (Shows sprites in the party list)
- **Sprite Y Buffer**: 16 (Vertical offset for character sprites)
- **In Party Text Color**: 6 (Color used to highlight characters in the active party)
- **Lock First Actor**: false (The first character in the party is not locked)
- **Locked Icon**: 195 (Icon used to indicate a locked character)
- **Required Icon**: 205 (Icon used to indicate a required character)
- **Enable Detail Window**: true (Shows a detailed information window for selected characters)
- **List Width**: 300 (Width of the party member list window)
- **Actor Parameters**: Parameters (Text label for the parameters section)
- **Actor Equipment**: Equipment (Text label for the equipment section)

#### Implementation in MegaEarth2049
The Party System in MegaEarth2049 is implemented with a flexible approach that allows players to customize their team based on different character strengths and tactical considerations:

1. **Character Roster**:
   The game features a diverse cast of characters with different abilities and roles:
   - **Rex** (Actor 1): Hacker class with tech-focused abilities
   - **Jen** (Actor 2): Priest/Medic with healing and support abilities
   - **Zack** (Actor 3): Construction Worker with physical damage and barrier-breaking abilities
   - **Zed** (Actor 4): Mod Doctor with experimental abilities and status effects
   - **Black Ninja** (Actor 5): Stealth-focused character with high agility

2. **Party Flexibility**:
   - The first character (protagonist) is not locked, allowing complete party customization
   - Players can have up to 4 active battle members
   - Formation changes are allowed during battle with a 1-turn cooldown
   - The system supports strategic party composition based on enemy types and battle conditions

3. **Visual Presentation**:
   - Characters are displayed with both face graphics and sprites
   - Active party members are highlighted with color #6
   - A detailed window shows selected character parameters and equipment

4. **Integration with Other Systems**:
   - **Row Formation**: Works with YEP_RowFormation to allow positioning characters in front, middle, or back rows
   - **Job Points**: Characters earn JP based on battle participation, encouraging rotation of party members
   - **Party Limit Gauge**: Party composition affects how the shared limit gauge is generated and utilized

5. **Strategic Applications**:
   - **Balanced Party Composition**: Players can create teams with complementary roles
   - **Tactical Adaptation**: Mid-battle formation changes allow for responses to battlefield conditions
   - **Character Development**: The system encourages players to develop multiple characters

### YEP_JobPoints

#### Overview
This plugin enables actors to acquire JP (job points) that can be used for other plugins, particularly the YEP_SkillLearnSystem. It creates a progression system where characters earn points through battle actions and level ups.

#### Configuration in MegaEarth2049
- **JP Text**: JMU (Display text for Job Points)
- **JP Icon**: 188 (Icon used for Job Points)
- **JP Per Action**: 10 + Math.randomInt(10) (JP earned per action in battle)
- **JP Per Level**: 100 + Math.randomInt(100) (JP earned when leveling up)
- **JP Per Enemy**: 50 + Math.randomInt(10) (JP earned per defeated enemy)
- **Show Results**: true (Show JP earned in battle results)

#### Implementation in MegaEarth2049
The Job Points system is integrated with all skills in the game. Regular skills provide a small amount of JP (15 + Math.randomInt(10)), while the special "Squad Attack" skills that use the Party Limit Gauge provide significantly more JP (100 + Math.randomInt(50)). This creates an incentive for players to build up and use their Party Limit Gauge for these powerful skills, as they not only deal more damage but also provide more JP for character progression.

The JP system is used primarily for skill learning through the YEP_SkillLearnSystem plugin, allowing players to customize their characters by choosing which skills to learn based on their playstyle and strategy.

### YEP_SkillCore

#### Overview
The Skill Core plugin expands the functionality of skills, allowing for different types of costs, custom damage formulas, and more. It serves as the foundation for the skill system and is extended by other plugins like YEP_X_PartyLimitGauge.

#### Configuration in MegaEarth2049
- **Cost Padding**: 4 (Padding for cost display)
- **Command Alignment**: center (Alignment of commands in the skill menu)
- **Window Columns**: 2 (Number of columns in the skill window)
- **HP/MP/TP Cost Display**: Configured with custom formats, font sizes, text colors, and icons

#### Implementation in MegaEarth2049
This plugin serves as a foundation for the Party Limit Gauge system and is used extensively throughout the game's skill system. Many skills in the game use custom action sequences and effects that are enabled by this plugin.

Key implementations include:

1. **Custom Skill Costs**:
   - HP costs for powerful physical skills
   - MP costs for magical and technical skills
   - TP costs for special abilities
   - Party Limit Gauge costs for squad attacks

2. **Skill Notetags**:
   - `<HP Cost: x>`: Skills that cost HP to use
   - `<MP Cost: x>`: Skills that cost MP to use
   - `<TP Cost: x>`: Skills that cost TP to use
   - `<Party Limit Cost: x>`: Skills that cost Party Limit Gauge to use
   - `<Ally Party Limit Gauge: +x>`: Skills that add to the Party Limit Gauge

3. **Custom Damage Formulas**:
   - Complex damage calculations based on multiple parameters
   - Conditional damage bonuses based on states, equipment, or position
   - Special effects triggered by critical hits

4. **Skill Types**:
   - Incantation (Type 1): Magic-based skills
   - Ability (Type 2): Physical and special abilities
   - Tech (Type 3): Technical and utility skills
   - Squad Attack (Type 4): Powerful team-based attacks that use the Party Limit Gauge
   - Cheer (Type 5): Support and buff skills

### YEP_SkillLearnSystem

#### Overview
This plugin allows actors to learn skills from the skill menu through crafting them via items or otherwise. In MegaEarth2049, it's primarily used with the JP system to allow characters to learn new skills by spending Job Points.

#### Configuration in MegaEarth2049
- **Learn Command**: Learn Skills (Text for the learn command)
- **Show Command**: true (Show the learn command in the skill menu)
- **Enable Command**: true (Enable the learn command)
- **Confirm Window**: true (Show confirmation window when learning skills)
- **Confirm Text**: Have %1 learn %2? (Text for the confirmation window)
- **Default Gold Cost**: 1000 (Default gold cost for learning skills)
- **Default JP Cost**: 100 (Default JP cost for learning skills)

#### Implementation in MegaEarth2049
The Skill Learn System is used to allow players to learn new skills by spending JP (Job Points). This creates a progression system where players can customize their characters by choosing which skills to learn based on their playstyle and strategy.

Key implementations include:

1. **Skill Learning Requirements**:
   - JP costs for learning skills
   - Prerequisites (other skills that must be learned first)
   - Character level requirements
   - Class-specific skill trees

2. **Skill Notetags**:
   - `<Learn Require Level: x>`: Level requirement for learning the skill
   - `<Learn Require Skill: x>`: Skill ID required to have learned before this skill
   - `<Learn Require JP: x>`: JP cost to learn the skill
   - `<Learn Require Item: x, y>`: Item ID and quantity required to learn the skill

3. **Character Specialization**:
   - Each character has unique skills available to learn
   - Some skills are shared between characters but with different JP costs
   - Advanced skills require learning basic skills first

4. **Integration with Game Progression**:
   - New skills become available as the story progresses
   - Some skills are unlocked through story events rather than JP spending
   - Special skills can be learned from trainers or through side quests

### YEP_X_PartyLimitGauge

#### Overview
The Party Limit Gauge plugin creates a shared resource gauge for the entire party that fills up during battle based on various actions. This gauge can then be spent to use powerful skills.

#### Configuration in MegaEarth2049
- **Gauge Increments**: 100 (Each increment represents 100 points in the raw gauge value)
- **Party Text Size**: 24 (Font size for Party Limit text)
- **Draw Cost Icon**: true (Shows the icon for Party Limit costs)
- **Cost Color**: 6 (Yellow text color for costs)
- **Party Gauge Colors**: 9 and 1 (Blue gradient)
- **Party Gauge Icon**: 166 (Icon used for the Party Limit Gauge)
- **Reset Gauge**: false (Party Limit Gauge carries over between battles)
- **Limit Gain Mechanics**:
  - Battle Start: 0 (No gauge gain at battle start)
  - Take HP Damage: Math.floor(5 * damage / user.mhp).clamp(10, 25)
  - Deal HP Damage: Math.floor(2 * damage / target.mhp).clamp(5, 10)
  - Heal HP Damage: Math.floor(-1 * damage / target.mhp).clamp(3, 5)
  - Take MP Damage: Math.floor(5 * damage / user.mmp).clamp(10, 25)
  - Deal MP Damage: Math.floor(5 * damage / target.mmp).clamp(5, 10)
  - Heal MP Damage: Math.floor(-2 * damage / target.mmp).clamp(3, 5)
  - Gain State: 5
  - Deal State: 3
  - Killed Ally: 10
  - Killed Foe: 5
  - Win Battle: 10
  - Flee Battle: -100
  - Lose Battle: -1000

#### Implementation in MegaEarth2049
The Party Limit Gauge is used in two main ways in this project:

1. **Regular Skills Contributing to the Gauge**:
   Almost all regular skills in the game have the `<Ally Party Limit Gauge: +1>` notetag, which means using these skills adds 1 point to the Party Limit Gauge. This encourages players to use a variety of skills to build up the gauge.

2. **Special "Squad Attack" Skills Using the Gauge**:
   The game features special high-powered skills (IDs 101-121) that require Party Limit Gauge to use. These skills have the `<Party Limit Cost: X>` notetag, where X is the number of gauge increments required. For example:
   
   - "Social Engineering" (ID 101): Costs 2 gauge increments
   - "Man in the Middle" (ID 102): Costs 1 gauge increment
   - "Botnet" (ID 103): Costs 4 gauge increments
   - "Blessing" (ID 104): Costs 1 gauge increment
   - "Sermon" (ID 105): Costs 2 gauge increments
   - "Hymn" (ID 106): Costs 4 gauge increments
   - "Drunken Monkey" (ID 107): Costs 1 gauge increment
   - "Fists of Fury" (ID 108): Costs 2 gauge increments
   - "Punch 36" (ID 109): Costs 4 gauge increments
   - "Mosh Pit" (ID 110): Costs 4 gauge increments
   - "Kidney Punch" (ID 111): Costs 1 gauge increment
   - "Knuckle Sandwich" (ID 112): Costs 2 gauge increments
   - "Reinforce" (ID 113): Costs 2 gauge increments
   - "Delay" (ID 114): Costs 1 gauge increment
   - "Traffic Jam" (ID 115): Costs 4 gauge increments
   - "Group Therapy" (ID 116): Costs 4 gauge increments
   - "Chemo" (ID 117): Costs 2 gauge increments
   - "Procedure" (ID 118): Costs 1 gauge increment
   - "Humiliate" (ID 119): Costs 2 gauge increments
   - "Tickle" (ID 120): Costs 1 gauge increment
   - "Center Ring Act" (ID 121): Costs 4 gauge increments

These "Squad Attack" skills are more powerful than regular skills and provide significant JP (Job Points) rewards (100 + Math.randomInt(50)) compared to regular skills (15 + Math.randomInt(10)).

### ROKI_HealOnLvUp

#### Overview
The ROKI_HealOnLvUp plugin by Alejandro López is a simple but effective utility that automatically heals actors' HP and MP when they level up. It works by overriding the default `levelUp` function in the Game_Actor prototype to add healing functionality while preserving the normal level-up behavior.

#### Configuration in MegaEarth2049
- **% of HP**: 100 (Heals 100% of max HP on level up)
- **% of MP**: 100 (Heals 100% of max MP on level up)
- **Value of HP**: 0 (Not using fixed value healing for HP)
- **Value of MP**: 0 (Not using fixed value healing for MP)
- **% or value**: 1 (Using percentage-based healing rather than fixed values)

#### How It Works
1. When a character levels up, the plugin calculates how much HP and MP to restore based on your configuration
2. Since the game is using percentage mode (1) with 100% for both HP and MP, characters are fully healed upon leveling up
3. The healing is applied before the character learns any new skills from leveling up

#### Integration with Other Systems
The ROKI_HealOnLvUp plugin works seamlessly with other level-up related systems in the game:

1. **Integration with YEP_JobPoints**:
   - When characters level up and get healed, they also earn Job Points (JP)
   - In the game's configuration, characters earn "100 + Math.randomInt(100)" JP per level
   - These JP can be used to learn new skills through the YEP_SkillLearnSystem

2. **Integration with YEP_X_AftermathLevelUp**:
   - After battle, the Victory Aftermath sequence shows characters who leveled up
   - The sequence displays parameter changes and any skills learned
   - The healing from ROKI_HealOnLvUp happens before this sequence, so characters will already be healed when the battle ends

#### Benefits in Gameplay
1. **Quality of Life Improvement**: Players don't need to manually heal characters after they level up
2. **Streamlined Progression**: Characters are always ready for the next battle after leveling up
3. **Resource Management**: Reduces the need to use healing items or MP for healing spells after battles where characters level up

## Integration Examples

### Party System and Limit Gauge Integration

The Party System and Party Limit Gauge work together to create strategic party composition decisions:

```javascript
// Example of how party composition affects limit gauge gain
Game_Party.prototype.limitGaugeGainRate = function() {
    var rate = 1.0;
    
    // Check for party role coverage
    if (this.hasRole('attacker')) rate += 0.1;
    if (this.hasRole('healer')) rate += 0.1;
    if (this.hasRole('support')) rate += 0.1;
    if (this.hasRole('tank')) rate += 0.1;
    
    // Check for party synergy
    if (this.hasRole('attacker') && this.hasRole('support')) rate += 0.1;
    if (this.hasRole('tank') && this.hasRole('healer')) rate += 0.1;
    
    return rate;
};
```

### Skill Learning Progression

The Skill Learn System and Job Points work together to create a character progression system:

```javascript
// Example of skill learning requirements
var skillRequirements = {
    // Rex's skill tree
    50: { // "Hack" skill
        jp: 100,
        level: 5,
        prereqSkills: []
    },
    51: { // "Data Mining" skill
        jp: 200,
        level: 8,
        prereqSkills: [50] // Requires "Hack" skill
    },
    52: { // "Firewall" skill
        jp: 350,
        level: 12,
        prereqSkills: [51] // Requires "Data Mining" skill
    },
    53: { // "System Crash" skill
        jp: 500,
        level: 18,
        prereqSkills: [52] // Requires "Firewall" skill
    }
};
```

## Related Documentation

- [Battle_System_Plugins.md](Battle_System_Plugins.md) - Documentation for battle system plugins
- [Item_Equipment_Plugins.md](Item_Equipment_Plugins.md) - Documentation for item and equipment plugins
- [States_Effects_Plugins.md](States_Effects_Plugins.md) - Documentation for states and effects plugins
- [RPG_Maker_MV_Plugins_README.md](RPG_Maker_MV_Plugins_README.md) - Main plugins documentation index
