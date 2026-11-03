> Reference snapshot: verify IDs, effects and enabled-plugin behavior against the live data and current FAQs. This relocation does not certify the older catalog as current.

# Battle System Plugins Documentation

This document provides detailed information about battle system plugins used in the MegaEarth2049 RPG Maker MV project.

## Table of Contents
- [Overview](#overview)
- [Plugin List](#plugin-list)
- [Detailed Documentation](#detailed-documentation)
  - [YEP_BattleEngineCore](#yep_battleenginecore)
  - [YEP_BattleStatusWindow](#yep_battlestatuswindow)
  - [YEP_X_ActSeqPack1](#yep_x_actseqpack1)
  - [YEP_X_ActSeqPack2](#yep_x_actseqpack2)
  - [YEP_X_ActSeqPack3](#yep_x_actseqpack3)
  - [YEP_X_AnimatedSVEnemies](#yep_x_animatedsvenemies)
  - [YEP_X_InBattleStatus](#yep_x_inbattlestatus)
  - [YEP_X_VisualHpGauge](#yep_x_visualhpgauge)
  - [YEP_DamageCore](#yep_damagecore)
  - [YEP_X_ArmorScaling](#yep_x_armorscaling)
  - [YEP_RowFormation](#yep_rowformation)
  - [WeaponSkill](#weaponskill)
  - [YEP_WeaponAnimation](#yep_weaponanimation)
  - [HIME_ActorBattleCommands](#hime_actorbattlecommands)
- [Integration Examples](#integration-examples)
- [Related Documentation](#related-documentation)

## Overview

The battle system in MegaEarth2049 is built on a foundation of interconnected plugins that enhance the default RPG Maker MV battle system. These plugins work together to create a more dynamic, visually engaging, and strategically deep combat experience.

### Plugin Dependencies

```
YEP_BattleEngineCore
├── YEP_X_ActSeqPack1
├── YEP_X_ActSeqPack2
├── YEP_X_ActSeqPack3
├── YEP_X_AnimatedSVEnemies
│   └── YEP_X_VisualHpGauge
└── YEP_X_InBattleStatus

YEP_DamageCore
└── YEP_X_ArmorScaling
```

## Plugin List

| Plugin Name | Version | Status | Description |
|-------------|---------|--------|-------------|
| YEP_BattleEngineCore | v1.46 | Enabled | Core battle system framework with enhanced control over battle flow |
| YEP_BattleStatusWindow | v1.09 | Enabled | Horizontal battle status window showing party member faces |
| YEP_X_ActSeqPack1 | v1.12 | Enabled | Basic action sequence functions for Battle Engine Core |
| YEP_X_ActSeqPack2 | v1.12 | Enabled | Visual action sequence functions for Battle Engine Core |
| YEP_X_ActSeqPack3 | v1.05 | Enabled | Camera control functions for Battle Engine Core |
| YEP_X_AnimatedSVEnemies | v1.19 | Enabled | Allows using animated sideview actors for enemies |
| YEP_X_InBattleStatus | v1.01 | Enabled | Adds a 'Status' option in the Party Window during battle |
| YEP_X_VisualHpGauge | v1.07 | Enabled | Reveals HP Gauges when a battler is selected or takes damage |
| YEP_DamageCore | v1.07 | Enabled | Expands control over damage calculation |
| YEP_X_ArmorScaling | v1.04 | Enabled | Scales defensive stats relative to a universal scale |
| YEP_RowFormation | v1.15 | Enabled | Places party members into row formations with distinct advantages |
| WeaponSkill | N/A | Enabled | Changes skill ID of attack for each weapon |
| YEP_WeaponAnimation | v1.05 | Enabled | Allows custom weapon images beyond standard weapon images |
| HIME_ActorBattleCommands | v1.4 | Enabled | Provides tools to customize actor battle commands |

## Detailed Documentation

### YEP_BattleEngineCore

#### Overview
This plugin provides extensive control over the battle system, allowing for customization of battle flow, animations, and more. It serves as the foundation for many other battle-related plugins.

#### Configuration in MegaEarth2049
- **Action Speed**: agi (Based on agility)
- **Default System**: dtb (Default Turn Battle)
- **Escape Ratio**: 0.5 * $gameParty.agility() / $gameTroop.agility()
- **Animation Settings**: Customized for smoother animations
- **Frontview/Sideview Settings**: Customized positioning
- **Damage Popup Settings**: Enhanced visual feedback

#### Implementation in MegaEarth2049
This plugin serves as the foundation for the battle system and is extended by several other plugins (ActSeqPack1/2/3, AnimatedSVEnemies, etc.). Many skills in the game use custom action sequences that are enabled by this plugin, such as:

- "Attack" (ID 1): Uses custom movement and camera actions
- "Dragon Blade" (ID 20): Complex sequence of movements and attacks
- "Assassination" (ID 75): Stealth-based attack sequence with multiple strikes
- "Fists of Fury" (ID 108): Squad attack with elaborate animation sequence

### YEP_BattleStatusWindow

#### Overview
A simple battle status window that shows the faces of your party members in horizontal format, providing a cleaner and more visually appealing battle interface.

#### Configuration in MegaEarth2049
- **Visual appearance**: Customized for the game's UI theme
- **Actor switching**: Enabled for easy party member selection
- **Front view settings**: Optimized for the game's battle view

### YEP_X_ActSeqPack1

#### Overview
This plugin adds basic action sequence functions to the Battle Engine Core, allowing for more control over battle animations and effects.

#### Configuration in MegaEarth2049
- **Default Volume**: 90
- **Default Pitch**: 100
- **Default Pan**: 0

#### Implementation in MegaEarth2049
Used in conjunction with the Battle Engine Core to create custom battle animations and sequences. Many skills use the basic functions provided by this plugin, such as:

- Wait commands
- Animation display
- Action effects
- Movement controls

### YEP_X_ActSeqPack2

#### Overview
This plugin adds visual action sequence functions to the Battle Engine Core, enhancing the visual impact of battle animations.

#### Implementation in MegaEarth2049
Used to create visually impressive battle animations with effects like:

- Screen flashes
- Opacity changes
- Floating effects
- Visual impact effects

Skills like "Bulldoze" (ID 68) and "Shred" (ID 59) use these visual effects extensively.

### YEP_X_ActSeqPack3

#### Overview
This plugin adds camera control functions to the Battle Engine Core, allowing for dynamic camera movements during battle sequences.

#### Configuration in MegaEarth2049
- **Camera Option**: Battle Camera

#### Implementation in MegaEarth2049
Used to create dynamic camera movements during battle sequences, enhancing the visual impact of skills. Many skills in the game use camera control functions such as:

- Camera focus (focusing on specific targets)
- Camera screen (positioning the camera at specific locations)
- Zoom effects (zooming in/out during key moments)

Skills like "Bulldoze" (ID 68), "Ninjitsu" (ID 69), and "Fists of Fury" (ID 108) make extensive use of these camera controls to create cinematic battle sequences.

### YEP_X_AnimatedSVEnemies

#### Overview
The Animated SV Enemies plugin allows you to use Animated Sideview Actors for enemies in battle. This creates a more dynamic and visually engaging battle system by giving enemies the same animation capabilities as player characters.

#### Configuration in MegaEarth2049
- **Default Frames**: 3
- **Default Width**: 64
- **Default Height**: 64
- **Default Scale**: 1.0
- **Breathing**: true (Enables subtle breathing animations for enemies)
- **Floating**: true (Enables floating effects for certain enemy types)
- **Floating Speed**: 0.25 (Controls the speed of the floating animation)
- **Floating Height**: 0.25 (Controls the height of the floating animation)
- **Floating Death**: true (Enemies continue floating animation when defeated)
- **Attack Motion**: thrust (Default attack motion for enemies)
- **Weapon Image**: false (Disables weapon images for enemies by default)
- **Weapon Animation**: false (Disables weapon animations for enemies by default)
- **Motion Speed**: 12 (Controls the speed of enemy motions)

#### Implementation in MegaEarth2049
The Animated SV Enemies plugin is a cornerstone of the battle system in MegaEarth2049, creating a more dynamic and visually engaging combat experience. The implementation includes:

1. **Custom Enemy Animations**:
   - All enemies in the game use animated sideview battlers instead of static images
   - Enemies have idle animations, attack motions, damage reactions, and death animations
   - Different enemy types have different animation sets appropriate to their character

2. **Enemy-Specific Configurations**:
   - Humanoid enemies (like corporate security, gang members, etc.) use standard humanoid animations
   - Robotic enemies have mechanical movements with less "breathing" animation
   - Animal/creature enemies have more exaggerated movements
   - Boss enemies have unique, more elaborate animations to emphasize their importance

3. **Integration with Action Sequences**:
   - Works seamlessly with YEP_X_ActSeqPack1/2/3 to create cinematic battle sequences
   - Enemy attack animations are synchronized with their action sequences
   - Custom damage reactions based on attack type (physical/magical/special)

4. **Technical Implementation**:
   - Enemy battlers are stored in the img/sv_enemies/ folder
   - Each enemy has multiple sprite sheets for different actions (idle, attack, damage, etc.)
   - Notetags are used to customize animation parameters for specific enemies:
     - `<sideview battler: FILENAME>` - Sets the battler image
     - `<sideview frames: X>` - Sets the number of frames
     - `<sideview attack motion: MOTION>` - Sets the attack motion (swing, thrust, missile, etc.)
     - `<sideview weapon: WEAPONID>` - Assigns a weapon image to the enemy (for humanoid enemies)
     - `<floating>` or `<no floating>` - Enables/disables floating animation
     - `<breathing>` or `<no breathing>` - Enables/disables breathing animation

### YEP_X_InBattleStatus

#### Overview
This plugin adds a 'Status' option in the Party Window during battle, allowing players to view detailed information about their party members without leaving the battle screen.

#### Configuration in MegaEarth2049
- **Window appearance**: Customized to match the game's UI theme
- **Status list**: Configured to show relevant character information
- **Buffs/debuffs display**: Enhanced to show more detailed status information

### YEP_X_VisualHpGauge

#### Overview
This plugin reveals HP Gauges when a battler is selected or takes damage in battle, providing visual feedback about the health status of battlers.

#### Configuration in MegaEarth2049
- **General appearance**: Customized to match the game's UI theme
- **Gauge appearance**: Configured for optimal visibility
- **Text display**: Enhanced to show more detailed health information

### YEP_DamageCore

#### Overview
This plugin expands the control over the game's damage calculation with more features and effects, allowing for more complex and nuanced damage formulas.

#### Configuration in MegaEarth2049
- **Damage cap**: Configured to balance game difficulty
- **Damage calculation steps**: Customized for the game's combat system

### YEP_X_ArmorScaling

#### Overview
This plugin scales defensive stats relative to a universal scale, creating a more balanced damage calculation system.

#### Configuration in MegaEarth2049
- **Physical damage scaling**: Configured to balance physical attacks
- **Magical damage scaling**: Configured to balance magical attacks
- **Certain damage scaling**: Configured to balance certain damage types

### YEP_RowFormation

#### Overview
This plugin places party members into row formations to give them distinct advantages based on row location, adding a layer of strategic positioning to battles.

#### Configuration in MegaEarth2049
- **Maximum Rows**: 3
- **Row Names and Descriptions**:
  - Front Row: "This is the front row. Place your melee allies here."
  - Middle Row: "This is the middle row. Place allies here who can fight from the middle."
  - Back Row: "This is the back row. Place allies here to take less melee damage."

#### Implementation in MegaEarth2049
The row formation system provides tactical depth to battles by allowing players to position characters based on their strengths and weaknesses. Melee-focused characters benefit from being in the front row for increased damage, while ranged attackers and support characters can stay safer in the back rows.

### WeaponSkill

#### Overview
The WeaponSkill plugin by Sasuke KANNAZUKI allows you to change the skill ID used when a character performs a basic attack with a specific weapon. Instead of always using the default Attack skill (ID 1), each weapon can be configured to use a different skill through note tags.

#### Configuration in MegaEarth2049
- **Status**: Enabled but not currently implemented
- **Parameters**: None (This plugin doesn't require any parameters)

#### How It Works
1. Add the note tag `<skill_id:X>` to a weapon's note field in the database, where X is the ID of the skill you want to use
2. When a character attacks with that weapon, the specified skill will be used instead of the default attack
3. For dual-wielding characters, the skill ID of the weapon in the dominant hand (first equipped) is used
4. If no note tag is specified, the default attack skill (ID 1) is used

#### Potential Implementation
While this plugin is currently enabled, it's not actively used in the game. A comprehensive implementation plan has been created in the `docs/reference/plugins/WeaponSkill_Implementation_README.md` file, which outlines:

1. **Basic weapon skills** that could be implemented
2. **Character-specific weapons** tailored to each party member's role
3. **Integration with existing systems** like Party Limit Gauge and Row Formation
4. **Cyberpunk-themed weapons** fitting the game's setting
5. **Weapon progression system** for game balance

### YEP_WeaponAnimation

#### Overview
This plugin allows you to go beyond the standard weapon images and use custom images for weapons, enhancing the visual variety of weapon animations.

#### Configuration in MegaEarth2049
- **Image Filepath**: img/weapons/
- **Image Smoothing**: false
- **Default Motion**: swing

### HIME_ActorBattleCommands

#### Overview
This plugin provides tools to customize and manage actor battle commands, allowing for fine-grained control over what commands each actor can use in battle.

#### Configuration in MegaEarth2049
The plugin is used with its default configuration, with no custom parameters set.

#### Implementation in MegaEarth2049
Each actor in the game has a customized set of battle commands defined through note tags. This creates a unique battle experience for each character and reinforces their role in the party. The implementation includes:

1. **Custom Command Sets for Each Actor**:
   - **Rex (Actor 1)**: Attack, Guard, Cheer, Ability, Tech, Squad Attack, Item
   - **Jen (Actor 2)**: Attack, Cheer, Incantation, Tech, Squad Attack, Item
   - **Zack (Actor 3)**: Attack, Guard, Cheer, Ability, Tech, Squad Attack, Item
   - **Zed (Actor 4)**: Attack, Guard, Cheer, Ability, Tech, Squad Attack, Item
   - **Black Ninja (Actor 5)**: Attack, Guard, Cheer, Ability, Tech, Squad Attack, Item

2. **Skill Type Integration**:
   The battle commands correspond to the following skill types in the game:
   - Incantation (Type 1): Magic-based skills
   - Ability (Type 2): Physical and special abilities
   - Tech (Type 3): Technical and utility skills
   - Squad Attack (Type 4): Powerful team-based attacks that use the Party Limit Gauge
   - Cheer (Type 5): Support and buff skills

3. **Character Specialization**:
   - Jen is the only character with access to Incantation skills but doesn't have the Guard command
   - All characters have access to Squad Attack skills, reinforcing the team-based combat system
   - All characters have the Item command, allowing for item use in battle

## Integration Examples

### Custom Battle Sequence Example

Here's an example of how multiple battle plugins work together to create a custom battle sequence for the "Fists of Fury" skill (ID 108):

```javascript
<setup action>
display action
</setup action>

<target action>
// Camera control from YEP_X_ActSeqPack3
camera focus: target
camera zoom: 150, 30

// Basic action sequence from YEP_X_ActSeqPack1
motion: subject, swing
wait: 15
motion: subject, thrust
wait: 10
motion: subject, swing
wait: 5

// Visual effects from YEP_X_ActSeqPack2
flash screen: color(255, 0, 0, 128), 30
action animation: target
wait for animation

// Damage calculation using YEP_DamageCore
action effect: target
wait for effect
</target action>
```

### Row Formation Strategy

The YEP_RowFormation plugin creates strategic positioning options that interact with other battle systems:

- Front row characters deal more damage but take more damage
- Back row characters deal less damage but take less damage
- Middle row characters have balanced offense and defense
- Some skills can only be used from specific rows
- Some skills can target specific rows
- Row positions affect the Party Limit Gauge gain rate

## Related Documentation

- [Character_Party_Plugins.md](Character_Party_Plugins.md) - Documentation for character and party plugins
- [States_Effects_Plugins.md](States_Effects_Plugins.md) - Documentation for states and effects plugins
- [WeaponSkill_Implementation_README.md](WeaponSkill_Implementation_README.md) - Detailed implementation plan for the WeaponSkill plugin
- [RPG_Maker_MV_Plugins_README.md](RPG_Maker_MV_Plugins_README.md) - Main plugins documentation index
