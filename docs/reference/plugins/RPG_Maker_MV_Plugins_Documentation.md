> Reference snapshot: verify IDs, effects and enabled-plugin behavior against the live data and current FAQs. This relocation does not certify the older catalog as current.

# RPG Maker MV Plugins Documentation

This document provides a comprehensive list of all plugins used in the MegaEarth2049 RPG Maker MV project, including their status (enabled/disabled), version information, descriptions, and how they're specifically implemented in the project.

## Table of Contents

- [Enabled Plugins](#enabled-plugins)
- [Disabled Plugins](#disabled-plugins)
- [Additional Installed Plugins](#additional-installed-plugins)
- [Plugin Categories](#plugin-categories)
  - [Battle System](#battle-system)
  - [User Interface](#user-interface)
  - [Item and Equipment](#item-and-equipment)
  - [Character and Party](#character-and-party)
  - [States and Effects](#states-and-effects)
  - [Miscellaneous](#miscellaneous)
- [Detailed Plugin Documentation](#detailed-plugin-documentation)
  - [EnemyBook](#enemybook)
  - [ItemBook](#itembook)
  - [YEP_PartySystem](#yep_partysystem)
  - [YEP_MessageCore](#yep_messagecore)
  - [YEP_X_PartyLimitGauge](#yep_x_partylimitgauge)
  - [YEP_SkillCore](#yep_skillcore)
  - [YEP_BattleEngineCore](#yep_battleenginecore)
  - [YEP_X_ActSeqPack1](#yep_x_actseqpack1)
  - [YEP_X_ActSeqPack2](#yep_x_actseqpack2)
  - [YEP_X_ActSeqPack3](#yep_x_actseqpack3)
  - [YEP_AbsorptionBarrier](#yep_absorptionbarrier)
  - [YEP_RowFormation](#yep_rowformation)
  - [YEP_ItemCore](#yep_itemcore)
  - [YEP_EquipCore](#yep_equipcore)
  - [YEP_JobPoints](#yep_jobpoints)
  - [YEP_BuffsStatesCore](#yep_buffsstatescore)
  - [YEP_X_AnimatedSVEnemies](#yep_x_animatedsvenemies)
  - [YEP_EnemyLevels](#yep_enemylevels)
  - [YEP_X_DifficultySlider](#yep_x_difficultyslider)
  - [ROKI_HealOnLvUp](#roki_healOnlvup)

## Enabled Plugins

### EnemyBook
- **Status**: Enabled
- **Description**: Displays detailed statuses of enemies.
- **Parameters**:
  - Unknown Data: ??????

### ItemBook
- **Status**: Enabled
- **Description**: Displays detailed statuses of items.
- **Parameters**:
  - Unknown Data: ??????
  - Price Text: Price
  - Equip Text: Equip
  - Type Text: Type

### WeaponSkill
- **Status**: Enabled
- **Description**: Change skill id of attack for each weapon.
- **Parameters**: None

### ROKI_HealOnLvUp
- **Status**: Enabled
- **Description**: Heal up hp/mp from actors on lvl up
- **Parameters**:
  - % of HP: 100
  - % of MP: 100
  - Value of HP: 0
  - Value of MP: 0
  - % or value: 1

### YEP_CoreEngine
- **Status**: Enabled
- **Description**: v1.28 Needed for the majority of Yanfly Engine Scripts. Also contains bug fixes found inherently in RPG Maker.
- **Parameters**: Extensive configuration for screen settings, gold, items, parameters, battle, map optimization, font settings, windows, and window colors.
- **Detailed Documentation**: [YEP_CoreEngine Documentation](YEP_CoreEngine_Documentation.md)

### YEP_PartySystem
- **Status**: Enabled
- **Description**: v1.13 Replaces the default 'Formation' command with a new menu for players to easily change party formations.
- **Parameters**:
  - Max Battle Members: 4
  - Show Battle Command: true
  - Enable Battle Command: true
  - Battle Cooldown: 1
  - Maximum Followers: 1
  - EXP Distribution: false
  - Help Window: false
  - Text Alignment: center
  - Change Command: Change
  - Remove Command: Remove
  - Revert Command: Revert
  - Finish Command: Finish
  - Empty Text: - Empty -
  - Actor Face: true
  - Actor Sprite: true
  - Remove Icon: 16
  - Show Sprite: true
  - Sprite Y Buffer: 16
  - In Party Text Color: 6
  - Lock First Actor: false
  - Locked Icon: 195
  - Required Icon: 205
  - Enable Detail Window: true
  - List Width: 300
  - Actor Parameters: Parameters
  - Actor Equipment: Equipment

### YEP_RowFormation
- **Status**: Enabled
- **Description**: v1.15 Places party members into row formations to give them distinct advantages based on row location.
- **Parameters**: Extensive configuration for row settings, positions, and visual appearance.

### YEP_EquipCore
- **Status**: Enabled
- **Description**: v1.17 Allows for the equipment system to be more flexible to allow for unique equipment slots per class.
- **Parameters**:
  - Text Align: center
  - Finish Command: Finish
  - Remove Text: Remove
  - Remove Icon: 16
  - Empty Text: <Empty>
  - Empty Icon: 16
  - Non-Removable Types: 1
  - Non-Optimized Types: 5
- **Detailed Documentation**: [YEP_ItemCore and YEP_EquipCore Documentation](YEP_ItemCore_EquipCore_Documentation.md)

### YEP_ItemCore
- **Status**: Enabled
- **Description**: v1.29 Changes the way Items are handled for your game and the Item Scene, too.
- **Parameters**:
  - Max Items: 0
  - Max Weapons: 100
  - Max Armors: 100
  - Starting ID: 3000
  - Random Variance: 0
  - Negative Variance: false
  - Name Format: %1%2%3%4
  - Name Spacing: true
  - Boost Format: (+%1)
  - Updated Scene Item: true
  - List Equipped Items: true
  - Show Icon: false
  - Icon Size: 96
  - Font Size: 18
  - Command Alignment: center
  - Recovery Format: %1 Heal
  - Add State: +State
  - Add Buff: +Buff
  - Remove State: -State
  - Remove Buff: -Buff
  - Maximum Icons: 4
  - Use Command: Use %1
  - Carry Format: %1/%2
  - Midgame Note Parsing: false
- **Detailed Documentation**: [YEP_ItemCore and YEP_EquipCore Documentation](YEP_ItemCore_EquipCore_Documentation.md)

### YEP_X_ItemDiscard
- **Status**: Enabled
- **Description**: v1.02 (Requires YEP_ItemCore.js) Allow the player to discard items from their inventory.
- **Parameters**:
  - Discard Command: Discard %1 %2/%3
  - Default Discard: true
  - Confirm Discard: true
  - Confirm Message: Are you sure you want to discard %1 %2?
  - Confirm Yes: Yes
  - Confirm No: No

### YEP_X_ItemPictureImg
- **Status**: Enabled
- **Description**: v1.01 (Requires YEP_ItemCore.js) Allows you to use images for items inside of the item menu instead of large icons.
- **Parameters**:
  - Max Image Width: 128
  - Max Image Height: 128

### YEP_BattleStatusWindow
- **Status**: Enabled
- **Description**: v1.09 A simple battle status window that shows the faces of your party members in horizontal format.
- **Parameters**: Configuration for visual appearance, actor switching, and front view settings.

### YEP_ShopMenuCore
- **Status**: Enabled
- **Description**: v1.05 Revamps the shop menu appearance and provides the framework for many new shop options.
- **Parameters**: Configuration for general appearance, status window, and info window.

### YEP_BattleEngineCore
- **Status**: Enabled
- **Description**: v1.46 Have more control over the flow of the battle system with this plugin and alter various aspects to your liking.
- **Parameters**: Extensive configuration for general battle settings, escape mechanics, animations, frontview/sideview positioning, sprites, damage popups, tick settings, window settings, selection help, enemy/actor selection, and battle log.

### YEP_DamageCore
- **Status**: Enabled
- **Description**: v1.07 Expand the control you have over the game's damage calculation with more features and effects.
- **Parameters**: Configuration for damage cap and extensive damage calculation steps.

### YEP_X_ArmorScaling
- **Status**: Enabled
- **Description**: v1.04 (Requires YEP_DamageCore.js) Scale defensive stats relative to a universal scale.
- **Parameters**: Configuration for physical, magical, and certain damage scaling.

### YEP_X_AnimatedSVEnemies
- **Status**: Enabled
- **Description**: v1.19 (Requires YEP_BattleEngineCore.js) This plugin lets you use Animated Sideview Actors for enemies!
- **Parameters**: Extensive configuration for enemy appearance, shadows, breathing effects, floating effects, motions, and weapons.

### YEP_X_InBattleStatus
- **Status**: Enabled
- **Description**: v1.01 (Requires YEP_BattleEngineCore.js) Adds a 'Status' option in the Party Window in battle.
- **Parameters**: Configuration for window appearance, status list, and buffs/debuffs display.

### YEP_X_ActSeqPack1
- **Status**: Enabled
- **Description**: v1.12 (Requires YEP_BattleEngineCore.js) Basic functions are added to the Battle Engine Core's action sequences.
- **Parameters**:
  - Default Volume: 90
  - Default Pitch: 100
  - Default Pan: 0

### YEP_X_ActSeqPack2
- **Status**: Enabled
- **Description**: v1.12 (Requires YEP_BattleEngineCore.js) Visual functions are added to the Battle Engine Core's action sequences.
- **Parameters**: None

### YEP_X_ActSeqPack3
- **Status**: Enabled
- **Description**: v1.05 (Requires YEP_BattleEngineCore.js) Camera control is added to the Battle Engine Core's action sequences.
- **Parameters**:
  - Camera Option: Battle Camera

### YEP_X_VisualHpGauge
- **Status**: Enabled
- **Description**: v1.07 (Requires YEP_BattleEngineCore.js) Reveal HP Gauges when a battler is selected or takes damage in battle.
- **Parameters**: Configuration for general appearance, gauge appearance, and text display.

### YEP_BuffsStatesCore
- **Status**: Enabled
- **Description**: v1.15 Alter the basic mechanics behind buffs and states that aren't adjustable within the RPG Maker editor.
- **Parameters**: Configuration for turn indicators, enemy icons, buff settings, state settings, and counter settings.

### YEP_X_StateCategories
- **Status**: Enabled
- **Description**: v1.06 (Requires YEP_BuffsStatesCore.js) Sets up categories for your states to make control over them easier.
- **Parameters**: None

### YEP_X_ExtDoT
- **Status**: Enabled
- **Description**: v1.03 (Req YEP_BattleEngineCore & YEP_BuffsStatesCore) Create custom DoT formulas and effects with ease.
- **Parameters**:
  - Regen Animation: 46
  - DoT Animation: 59
  - Default Variance: 20
  - Default Element: 0

### YEP_X_VisualStateFX
- **Status**: Enabled
- **Description**: v1.02 (Req YEP_BattleEngineCore & YEP_BuffsStatesCore) Adds visual effects to your states.
- **Parameters**: Configuration for actor/enemy state display and animation settings.

### YEP_VictoryAftermath
- **Status**: Enabled
- **Description**: v1.07 Display an informative window after a battle is over instead of message box text stating what the party earned.
- **Parameters**: Configuration for general appearance, BGM, battle results, and EXP window.

### YEP_X_AftermathLevelUp
- **Status**: Enabled
- **Description**: v1.01 (Requires YEP_VictoryAftermath.js) Adds a level up portion to the Victory Aftermath sequences.
- **Parameters**:
  - Level Up Title: %1 has reached Level %2!
  - Enable Aftermath: true
  - Font Size: 28
  - Skill Text Singular: Acquired Skill
  - Skill Text Plural: Acquired Skills
  - Skill List Width: 200

### YEP_JobPoints
- **Status**: Enabled
- **Description**: v1.09 This plugin by itself doesn't do much, but it enables actors to acquire JP (job points) used for other plugins.
- **Parameters**: Configuration for general JP settings, menu display, and victory aftermath.

### YEP_SkillLearnSystem
- **Status**: Enabled
- **Description**: v1.16 Allows actors to learn skills from the skill menu through crafting them via items or otherwise.
- **Parameters**: Configuration for general appearance, confirm window, skill learn window, and default costs.

### YEP_EnemyLevels
- **Status**: Enabled
- **Description**: v1.08 This plugin enables giving your enemies levels and parameter changes with those levels.
- **Parameters**: Extensive configuration for general settings, level setup, and parameter growth formulas.

### YEP_X_DifficultySlider
- **Status**: Enabled
- **Description**: v1.03 (Requires YEP_EnemyLevels.js) Give your players access to an option that allows them to change difficulty.
- **Parameters**: Configuration for options menu, difficulty settings, and level formulas.

### YEP_OptionsCore
- **Status**: Enabled
- **Description**: v1.01 Expand the Options Menu into a more elegant looking menu with more customization potential.
- **Parameters**: Extensive configuration for option categories and menu appearance.

### YEP_WeaponAnimation
- **Status**: Enabled
- **Description**: v1.05 This plugin allows you to go past the standard weapon images and even using custom images.
- **Parameters**:
  - Image Filepath: img/weapons/
  - Image Smoothing: false
  - Default Motion: swing

### YEP_BattleAniSpeedOpt
- **Status**: Enabled
- **Description**: v1.01 Add battle animation speed options for your game so your players can choose the speed setting they want.
- **Parameters**: Configuration for general settings and speed vocabulary.

### YEP_MessageCore
- **Status**: Enabled
- **Description**: v1.19 Adds more features to the Message Window to customized the way your messages appear and functions.
- **Parameters**: Extensive configuration for general appearance, font settings, and name box.

### YEP_X_MessageBacklog
- **Status**: Enabled
- **Description**: v1.01 (Requires YEP_MessageCore.js) Add a message backlog function to your game's message system!
- **Parameters**: Configuration for backlog key, settings, and visual appearance.

### YEP_SkillCore
- **Status**: Enabled
- **Description**: v1.12 Skills are now given more functions and the ability to require different types of costs.
- **Parameters**: Configuration for general appearance and HP/MP/TP cost display.

### YEP_X_PartyLimitGauge
- **Status**: Enabled
- **Description**: v1.10 (Requires YEP_SkillCore.js) A party-wide skill resource is accessible across all members of a unit.
- **Parameters**: Extensive configuration for gauge appearance, party/troop settings, and limit gain mechanics.

### YEP_AbsorptionBarrier
- **Status**: Enabled
- **Description**: v1.07 Battlers can be surrounded by an absorption barrier that would mitigate damage dealt to HP.
- **Parameters**: Configuration for barrier appearance, animations, and mechanics.

### HIME_ActorBattleCommands
- **Status**: Enabled
- **Description**: v1.4 - Provides you with tools to customize and manage actor battle commands.
- **Parameters**: None

### HIME_PlaceholderStates
- **Status**: Enabled
- **Description**: v1.0 - allows you to create a state that may resolve to a different state when it is added or removed.
- **Parameters**: None

## Disabled Plugins

### AltMenuScreen
- **Status**: Disabled
- **Description**: Alternative menu screen layout.
- **Parameters**: None

### YEP_X_NewGamePlus
- **Status**: Disabled
- **Description**: v1.02 (Requires YEP_SaveCore.js) Allow your players to have a New Game+ mode that allows carrying over save data.
- **Parameters**: Configuration for general appearance, carried data, actor data, and party data.

### YEP_BattleBgmControl
- **Status**: Disabled
- **Description**: v1.01 Assign BGM's to certain troops. Make BGM's change during battle when certain enemies reach different HP values.
- **Parameters**: None

## Plugin Categories

### Battle System
- YEP_BattleEngineCore
- YEP_BattleStatusWindow
- YEP_X_ActSeqPack1
- YEP_X_ActSeqPack2
- YEP_X_ActSeqPack3
- YEP_X_AnimatedSVEnemies
- YEP_X_InBattleStatus
- YEP_X_VisualHpGauge
- YEP_BattleAniSpeedOpt
- YEP_DamageCore
- YEP_X_ArmorScaling
- HIME_ActorBattleCommands
- YEP_RowFormation
- WeaponSkill
- YEP_WeaponAnimation

### User Interface
- YEP_CoreEngine
- YEP_OptionsCore
- YEP_MessageCore
- YEP_X_MessageBacklog
- YEP_VictoryAftermath
- YEP_X_AftermathLevelUp

### Item and Equipment
- YEP_ItemCore
- YEP_X_ItemDiscard
- YEP_X_ItemPictureImg
- YEP_EquipCore
- YEP_ShopMenuCore
- ItemBook

### Character and Party
- YEP_PartySystem
- YEP_JobPoints
- YEP_SkillCore
- YEP_SkillLearnSystem
- YEP_X_PartyLimitGauge
- ROKI_HealOnLvUp

### States and Effects
- YEP_BuffsStatesCore
- YEP_X_StateCategories
- YEP_X_ExtDoT
- YEP_X_VisualStateFX
- YEP_AbsorptionBarrier
- HIME_PlaceholderStates

### Miscellaneous
- YEP_EnemyLevels
- YEP_X_DifficultySlider
- EnemyBook

## Additional Installed Plugins

The following plugins are installed in the project but are not currently enabled in the `plugins.js` configuration file. They are available for use if needed:

### MOG (Moghunter) Plugins

#### MOG_ActorHud.js

##### Overview
The Actor Hud plugin creates a customizable HUD that displays actor parameters (HP, MP, TP, states, etc.) during map exploration. This provides players with constant visibility of their character's status without needing to open the menu.

##### Key Features
- **Customizable Layout**: Fully adjustable position, size, and appearance
- **Parameter Displays**: Shows HP, MP, TP with customizable meters and number displays
- **Face Display**: Shows character face with optional animations (shake, zoom)
- **States Display**: Shows status effects/conditions affecting the character
- **Smart Fade**: Automatically adjusts opacity when player character walks over the HUD
- **Auto Fade**: Automatically adjusts opacity when message windows are active

##### Visual Elements
The plugin uses several image files from the img/actorhud/ folder:
- Layout.png - Main HUD background
- HP_Meter.png - HP gauge graphic
- MP_Meter.png - MP gauge graphic
- TP_Meter.png - TP gauge graphic
- HP_Number.png - HP value number graphic
- MP_Number.png - MP value number graphic
- TP_Number.png - TP value number graphic
- Face_X.png - Character face images (where X is the actor ID)

##### Implementation Considerations
- Provides real-time status information during exploration
- Complements the battle HUD system for consistent UI experience
- Can be toggled on/off with plugin commands (hide_actor_hud, show_actor_hud)
- Supports animated faces that react to damage/healing

#### MOG_BattleHud.js

##### Overview
The Battle Hud plugin completely overhauls the default battle interface, allowing for extensive customization of the battle screen layout. It replaces the default battle status window with individually positioned actor HUDs.

##### Key Features
- **Fully Customizable Layout**: Position, size, and appearance of all battle windows
- **Individual Actor HUDs**: Each party member has their own status display
- **Parameter Displays**: Shows HP, MP, TP with customizable meters and number displays
- **Face Display**: Shows character faces with optional animations (shake, zoom)
- **Turn Order Display**: Visual indicator for the active character
- **States Display**: Shows status effects/conditions affecting characters
- **ATB Compatibility**: Works with various Active Time Battle systems
- **Custom Window Positioning**: All battle windows (command, party, skill, item, etc.) can be repositioned

##### Visual Elements
The plugin uses numerous image files from the img/battlehud/ folder:
- Layout.png - Main HUD background for each actor
- HP_Meter.png - HP gauge graphic
- MP_Meter.png - MP gauge graphic
- TP_Meter.png - TP gauge graphic
- ATB_Meter.png - Active Time Battle gauge graphic
- HP_Number.png - HP value number graphic
- MP_Number.png - MP value number graphic
- TP_Number.png - TP value number graphic
- Turn.png - Turn indicator graphic
- Layout_Screen.png - Overall battle screen layout
- Layout_Command.png - Command window background
- Layout_Party.png - Party window background
- Layout_Help.png - Help window background
- Layout_Skill.png - Skill window background
- Layout_Item.png - Item window background
- Face_X.png - Character face images (where X is the actor ID)

##### Implementation Considerations
- Completely replaces the default battle UI
- Highly customizable through plugin parameters
- Supports vertical or horizontal actor HUD layouts
- Compatible with other MOG battle plugins
- Can be toggled on/off with plugin commands (bhud_disable, bhud_enable)

#### MOG_BattleCommands.js

##### Overview
The Battle Commands plugin replaces the default command window with customizable graphical command buttons. It allows for a more visually appealing and intuitive battle command interface.

##### Key Features
- **Two Display Modes**: 
  - Normal mode: Commands displayed in a vertical/horizontal list
  - Ring mode: Commands displayed in a circular arrangement
- **Custom Command Graphics**: Each command uses its own image
- **Animation Effects**: Zoom and slide animations for selected commands
- **Command Names**: Optional text display of command names
- **Cursor Customization**: Custom cursor graphic with animation options
- **Layout Customization**: Background image for the command area

##### Visual Elements
The plugin uses several image files from the img/battlecommands/ folder:
- Com_X.png - Command button graphics (where X is the command name, e.g., Com_Attack.png)
- Layout.png - Background for the command area
- Cursor.png - Cursor graphic
- Arrow.png - Arrow indicators for scrolling
- Face_X.png - Character face images (where X is the actor ID)

##### Implementation Considerations
- Requires MOG_BattleHud.js to function
- Provides a more visually distinct command system
- Can be configured for different layout styles
- Supports both keyboard/gamepad navigation and mouse input
- Command images must follow specific naming conventions

#### MOG_BalloonActionName.js

##### Overview
The Balloon Action Name plugin displays the name of actions (skills/items) in a speech balloon above the actor when they perform an action in battle. This provides clear visual feedback about what action is being performed.

##### Key Features
- **Speech Balloon Display**: Shows skill/item names in a balloon graphic
- **Customizable Duration**: Control how long the balloon appears
- **Position Adjustment**: Fine-tune the position of the balloon and text
- **Wait Mode**: Option to pause battle animation until the balloon disappears
- **Selective Display**: Option to disable the balloon for specific skills/items

##### Visual Elements
The plugin uses one image file from the img/system/ folder:
- ActionNameB.png - The balloon graphic (divided into sections for the balloon parts)

##### Implementation Considerations
- Enhances battle feedback by clearly identifying actions
- Can be disabled for specific skills/items using the note tag: `Disable Balloon Name`
- Compatible with MOG_BattleCamera and MOG_ATB plugins
- Automatically sizes the balloon based on the length of the action name

#### MOG_Weather_EX.js

##### Overview
The Weather EX plugin greatly expands the default weather system with numerous new weather effects. It allows for more atmospheric and diverse environmental conditions in your game.

##### Key Features
- **21 Weather Types**: Vastly expanded from the default rain/storm/snow
  - Wind effects (3 types)
  - Spark effects (3 types)
  - Fire effects (3 types)
  - Snow effects (3 types)
  - Rain effects (3 types)
  - Cloud effects (3 types)
  - Random effects (3 types)
- **Customizable Intensity**: Control the power/density of weather particles
- **Custom Images**: Use your own images for weather particles
- **Blend Modes**: Different blending options for visual effects

##### Visual Elements
The plugin uses custom images from the img/weather/ folder that you can create yourself.

##### Implementation Considerations
- Activated through plugin commands: `weather : TYPE : POWER : BLEND_TYPE : FILE_NAME`
- Deactivated with the command: `clear_weather`
- TYPE parameter ranges from 0-20 for different weather effects
- POWER parameter (1-2000) controls the intensity/number of particles
- BLEND_TYPE parameter (0-1) sets the blend mode
- FILE_NAME parameter specifies the image to use for particles
- Significantly enhances atmospheric effects for maps and cutscenes

### SRD (SumRndmDde) Plugins
- SRD_HUDMaker.js - Allows creation of custom HUDs
- SRD_PluginUpdater.js - Provides functionality to update plugins
- SRD_SummonBattlerImages.js - Manages summoned battler images
- SRD_SummonCore.js - Core plugin for summoning mechanics
- SRD_SuperToolsEngine.js - Core engine for SRD plugins

### MrTS Plugins
- MrTS_EmergeAnimations.js - Adds custom animations for enemies emerging in battle

### Other Plugins
- AltSaveScreen.js - Alternative save screen layout
- Archeia_Steamworks.js - Integration with Steam platform
- Community_Basic.js - Basic community-provided functionality
- GamepadConfig.js - Configuration for gamepad controls
- MadeWithMv.js - Displays a "Made with MV" splash screen
- SergeofBIBEKActionSequenceProxy.js - Proxy for action sequences
- SimpleMsgSideView.js - Simplifies message display in side view battles
- TitleCommandPosition.js - Adjusts position of commands on title screen
- YEP_CreditsPage.js - Adds a credits page to the game
- YEP_LoadCustomFonts.js - Allows loading of custom fonts
- YEP_WeaponUnleash.js - Adds special effects that can trigger when using weapons
- YEP_X_SVEnemyFolder.js - Organizes sideview enemy files in folders

## Detailed Plugin Documentation

### YEP_ShopMenuCore

#### Overview
The YEP_ShopMenuCore plugin revamps the default RPG Maker MV shop menu, providing a more detailed and customizable shopping experience. It enhances the visual presentation of shops and offers a framework for implementing specialized shop types with custom commands and functionality.

#### Configuration in MegaEarth2049
- **Status**: Enabled
- **Version**: v1.05
- **Parameters**:
  - **Command Order**: Buy Sell Equip Custom Cancel
  - **Shop List Width**: Graphics.boxWidth / 2 + Graphics.boxWidth / 10
  - **Command Alignment**: center
  - **Default Mode**: actor
  - **Stat Switching**: true
  - **Cannot Equip**: Can't Equip
  - **Stat Font Size**: 18
  - **Cannot Equip Font Size**: 18
  - **Show Icon**: true
  - **Icon Size**: 128
  - **Font Size**: 18
  - **Recovery Format**: %1 Heal
  - **Add State**: +State
  - **Add Buff**: +Buff
  - **Remove State**: -State
  - **Remove Buff**: -Buff
  - **Maximum Icons**: 4

#### Current Implementation Status
Currently, the YEP_ShopMenuCore plugin is enabled but not fully utilized for specialized shops. There is a concept for implementing "Zed's mod clinic" as a specialized shop, but this has not been fully realized in the game yet. The game does contain several items attributed to Zed that would be perfect for such a shop:

- **Experimental Neural Enhancer**: "One of Zed's experimental neural mods. Side effect: randomly swaps your limbs. 'It's a feature, not a bug!' - Zed"
- **Disco Implant**: "Zed's prototype mood enhancer. Side effect: causes uncontrollable disco dancing at inappropriate moments."
- **Third Eye Mod**: "Zed's perception enhancer. Side effect: you can see bad puns floating above people's heads. Cannot unsee."

#### Potential Implementation: Zed's Mod Clinic

The YEP_ShopMenuCore plugin provides an excellent foundation for implementing Zed's mod clinic as a specialized shop with unique features and presentation. Here's how it could be implemented:

1. **Custom Shop Commands**:
   The plugin allows for custom commands beyond the standard Buy/Sell options. For Zed's mod clinic, these could include:
   ```javascript
   // Example custom command implementation
   Window_ShopCommand.prototype.addCustomCommands = function() {
     this.addCommand("Install", 'custom', true);
     this.addCommand("Upgrade", 'custom', true);
     this.addCommand("Remove", 'custom', true);
   };
   ```

2. **Specialized Item Display**:
   The enhanced item information window could be used to display both the benefits and humorous side effects of Zed's experimental mods:
   ```javascript
   // Example of custom item description display
   Window_ShopInfo.prototype.drawItemInfo = function(item) {
     var rect = this.getRectPosition(rect, 0);
     this.changeTextColor(this.systemColor());
     this.drawText("Benefits:", rect.x, rect.y, rect.width);
     // Draw benefits
     
     rect = this.getRectPosition(rect, 2);
     this.changeTextColor(this.textColor(10)); // Red color for side effects
     this.drawText("Side Effects:", rect.x, rect.y, rect.width);
     // Draw side effects
   };
   ```

3. **Risk Factor System**:
   A unique "risk factor" could be implemented for Zed's experimental mods, displayed in the shop interface:
   ```javascript
   // Example of risk factor display
   Window_ShopStatus.prototype.drawActorRiskFactor = function(actor, x, y, width) {
     var risk = this._item.meta.riskFactor || 0;
     this.changeTextColor(this.textColor(risk > 5 ? 10 : 2));
     this.drawText("Risk: " + risk + "/10", x, y, width, 'right');
   };
   ```

4. **Integration with Character Stats**:
   The status window could show how mods would affect character parameters, with color-coded indicators for positive and negative effects:
   ```javascript
   // Example of parameter change display
   Window_ShopStatus.prototype.drawActorParamChange = function(x, y, actor, item1) {
     var width = this.contents.width - this.textPadding() - x;
     var paramId = this.paramId();
     var change = this._item.params[paramId] - (item1 ? item1.params[paramId] : 0);
     
     // Draw primary stat change
     this.changeTextColor(this.paramchangeTextColor(change));
     var text = (change > 0 ? '+' : '') + change;
     this.drawText(text, x, y, width, 'right');
     
     // Draw side effect stat change if applicable
     if (this._item.meta.sideEffectParam) {
       var sideEffectId = parseInt(this._item.meta.sideEffectParam);
       var sideChange = parseInt(this._item.meta.sideEffectValue) || 0;
       this.changeTextColor(this.paramchangeTextColor(-sideChange));
       var text = TextManager.param(sideEffectId) + ": " + (sideChange > 0 ? '-' : '+') + sideChange;
       this.drawText(text, x, y + this.lineHeight(), width, 'right');
     }
   };
   ```

5. **Installation Process**:
   Instead of instantly buying items, a custom "installation" process could be implemented for mods:
   ```javascript
   // Example of installation process
   Scene_Shop.prototype.doBuy = function(number) {
     if (this._item.meta.isMod) {
       // Show installation animation/message
       $gameMessage.add(this._item.name + " is being installed on " + this._actor.name() + "...");
       // Apply mod effects
       this.applyModEffects(this._actor, this._item);
       // Deduct gold
       $gameParty.loseGold(number * this.buyingPrice());
     } else {
       // Regular item purchase
       Yanfly.Shop.Scene_Shop_doBuy.call(this, number);
     }
   };
   ```

6. **Visual Customization**:
   The shop could have a unique visual style to reinforce its experimental/risky nature:
   ```javascript
   // Example of custom shop background
   Scene_Shop.prototype.createBackground = function() {
     if (this._shopType === 'modClinic') {
       this._backgroundSprite = new Sprite();
       this._backgroundSprite.bitmap = ImageManager.loadPicture('ModClinicBackground');
       this.addChild(this._backgroundSprite);
     } else {
       Scene_MenuBase.prototype.createBackground.call(this);
     }
   };
   ```

#### Implementation Steps

To fully implement Zed's mod clinic using YEP_ShopMenuCore:

1. **Create a dedicated map event** for Zed's mod clinic with custom graphics and dialogue
2. **Define special shop goods** in the event with unique properties:
   ```javascript
   // Example shop goods setup
   var goods = [
     [1, 132, 0, 0, true],  // Experimental Neural Enhancer
     [1, 133, 0, 0, true],  // Disco Implant
     [1, 134, 0, 0, true]   // Third Eye Mod
   ];
   ```

3. **Add metadata to mod items** in the database:
   ```
   <isMod>
   <riskFactor:7>
   <sideEffectParam:6>
   <sideEffectValue:2>
   ```

4. **Create custom shop processing** for installation and side effects:
   ```javascript
   // Example custom shop processing
   Scene_Shop.prototype.applyModEffects = function(actor, item) {
     // Apply primary effect
     actor.addParam(item.meta.paramId, item.meta.paramValue);
     
     // Apply side effect with chance based on risk factor
     var risk = item.meta.riskFactor || 5;
     if (Math.random() < risk/10) {
       actor.addParam(item.meta.sideEffectParam, -item.meta.sideEffectValue);
       $gameMessage.add("Side effect triggered: " + item.meta.sideEffectDesc);
     }
   };
   ```

5. **Add visual and sound effects** for the installation process:
   ```javascript
   // Example installation effects
   Scene_Shop.prototype.showInstallationEffect = function(actor) {
     // Play installation sound
     AudioManager.playSe({name: 'Buzzing', pan: 0, pitch: 100, volume: 90});
     
     // Show installation animation
     $gameScreen.startFlash([255, 0, 255, 128], 60);
     
     // Show success message with random humor
     var messages = [
       "Installation complete! Feeling tingly yet?",
       "Mod successfully installed! Any extra limbs are completely normal.",
       "All done! The voices in your head are just the mod calibrating."
     ];
     $gameMessage.add(messages[Math.floor(Math.random() * messages.length)]);
   };
   ```

#### Benefits of Implementation

Implementing Zed's mod clinic using YEP_ShopMenuCore would provide several benefits:

1. **Unique Gameplay Mechanics**: Mods could provide special abilities with interesting trade-offs
2. **Character Customization**: Players could customize their characters beyond standard equipment
3. **Thematic Reinforcement**: Enhances the cyberpunk theme with body modifications
4. **Humor Integration**: Provides opportunities for the game's humor through side effects
5. **Risk/Reward System**: Creates interesting player choices with the risk factor system

#### Conclusion

The YEP_ShopMenuCore plugin provides all the necessary tools to implement Zed's mod clinic as a unique and engaging gameplay feature. While not currently fully implemented, the groundwork exists in the form of Zed's character, his experimental items, and the enabled plugin. Completing this implementation would add depth to character customization and reinforce the game's cyberpunk setting and humorous tone.

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

#### Benefits of Implementation
- **Enhanced Combat Variety**: Different weapons could trigger different attack patterns
- **Strategic Depth**: Players would need to choose weapons based on their special effects
- **Character Specialization**: Each character could have unique weapon skills
- **Thematic Integration**: Weapon skills could reinforce the cyberpunk setting

### EnemyBook

#### Overview
The EnemyBook plugin by Yoji Ojima creates a bestiary or monster encyclopedia that displays detailed information about enemies the player has encountered. This plugin allows players to access information about enemy stats, drops, and weaknesses, enhancing the strategic elements of gameplay.

#### Configuration in MegaEarth2049
- **Unknown Data**: ?????? (The specific configuration parameters are not fully documented in the plugins.js file)

#### Implementation in MegaEarth2049
The EnemyBook is implemented as a reference tool for players to track and learn about the various enemies in the game. The implementation includes:

1. **Enemy Registration System**:
   - Enemies are automatically registered in the EnemyBook when encountered in battle
   - The game features over 100 unique enemy types, all of which can be cataloged in the EnemyBook

2. **Enemy Information Display**:
   - Basic stats (HP, MP, Attack, Defense, etc.)
   - Elemental weaknesses and resistances
   - Potential item drops and drop rates
   - Enemy level information (leveraging the YEP_EnemyLevels plugin)

3. **Menu Integration**:
   - The EnemyBook is accessible through the main menu
   - Players can browse through all encountered enemies
   - A completion percentage is shown to encourage players to discover all enemies

4. **Strategic Value**:
   - Players can use the EnemyBook to prepare for upcoming battles
   - Information about enemy weaknesses helps players optimize their party composition and skill usage

### ItemBook

#### Overview
The ItemBook plugin by Yoji Ojima creates an item encyclopedia that displays detailed information about items the player has obtained. This plugin allows players to access information about item effects, equipment stats, and other properties, providing a comprehensive reference for all collectible items in the game.

#### Configuration in MegaEarth2049
- **Unknown Data**: ?????? (The specific configuration parameters are not fully documented in the plugins.js file)
- **Price Text**: Price
- **Equip Text**: Equip
- **Type Text**: Type

#### Implementation in MegaEarth2049
The ItemBook serves as a comprehensive catalog of all items in the game, providing players with detailed information about each item they've discovered. The implementation includes:

1. **Item Registration System**:
   - Items are automatically registered in the ItemBook when obtained
   - The game features a wide variety of items including consumables, key items, weapons, and armor

2. **Item Information Display**:
   - Basic properties (name, description, icon)
   - Price information for purchasable items
   - Effect details for consumable items
   - Stat bonuses for equipment
   - Equipment restrictions (which characters can equip the item)

3. **Menu Integration**:
   - The ItemBook is accessible through the main menu
   - Items are categorized by type (consumables, key items, weapons, armor)
   - A completion percentage is shown to encourage players to collect all items

4. **Integration with YEP_ItemCore**:
   - The ItemBook works seamlessly with the YEP_ItemCore plugin
   - Independent items with unique properties are properly displayed
   - Custom item categories are supported

5. **Visual Enhancements**:
   - Works with YEP_X_ItemPictureImg to display larger item images when available
   - Provides a more visually appealing way to browse the game's items

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

This implementation creates a dynamic party management system that enhances the strategic depth of the game while giving players more control over their team composition and battle tactics.

### YEP_MessageCore

#### Overview
The YEP_MessageCore plugin enhances RPG Maker MV's default message system with additional features and customization options. It allows for more control over how text is displayed, formatted, and interacted with, creating a more polished and professional text presentation system.

#### Configuration in MegaEarth2049
- **Default Rows**: 4 (Number of text rows in the message window)
- **Default Width**: Graphics.boxWidth (Width of the message window)
- **Face Indent**: Window_Base._faceWidth + 24 (Indentation when face graphics are shown)
- **Fast Forward Key**: pagedown (Key to fast forward through messages)
- **Enable Fast Forward**: true (Allows players to fast forward through messages)
- **Word Wrapping**: false (Automatic word wrapping is disabled)
- **Description Wrap**: false (Automatic word wrapping for descriptions is disabled)
- **Word Wrap Space**: false (Word wrapping at spaces is disabled)
- **Tight Wrap**: false (Tight word wrapping is disabled)
- **Font Name**: GameFont (Default font for messages)
- **Font Name CH**: SimHei, Heiti TC, sans-serif (Font for Chinese text)
- **Font Name KR**: Dotum, AppleGothic, sans-serif (Font for Korean text)
- **Font Size**: 28 (Default font size)
- **Font Size Change**: 12 (Amount to change font size with text codes)
- **Font Changed Max**: 96 (Maximum font size with text codes)
- **Font Changed Min**: 12 (Minimum font size with text codes)
- **Font Outline**: 4 (Thickness of font outline)
- **Maintain Font**: false (Font settings reset between messages)
- **Name Box Buffer X**: -28 (Horizontal position adjustment for name boxes)
- **Name Box Buffer Y**: 0 (Vertical position adjustment for name boxes)
- **Name Box Padding**: this.standardPadding() * 4 (Padding inside name boxes)
- **Name Box Color**: 0 (Color index for name boxes)
- **Name Box Clear**: false (Name boxes have opaque backgrounds)
- **Name Box Added Text**: \c[6] (Text code added to names in name boxes)
- **Name Box Auto Close**: false (Name boxes don't automatically close)

#### Implementation in MegaEarth2049
The Message Core is a fundamental component of the game's narrative and dialogue system, providing a consistent and visually appealing way to present text to the player. The implementation includes:

1. **Dialogue Presentation**:
   - Character dialogue uses name boxes with color-coded names (using the \c[6] text code)
   - Face graphics are displayed alongside dialogue to show the speaking character
   - The message window is positioned at the bottom of the screen with 4 rows of text
   - Messages can be fast-forwarded using the Page Down key for players who read quickly

2. **Text Formatting**:
   - Text codes are used throughout dialogue to add emphasis and visual interest:
     - `\c[n]` for colored text (e.g., `\c[2]` for green, `\c[3]` for blue)
     - `\{` and `\}` to increase and decrease font size
     - `\i[n]` to display icons within text
     - `\af[x]` to change the displayed face graphic mid-message
   - Important terms and concepts are highlighted with color codes
   - Emphasis is added through font size changes for dramatic moments

3. **Integration with YEP_X_MessageBacklog**:
   - All messages are logged to a backlog that players can access by pressing Shift
   - The backlog preserves all text formatting and face graphics
   - Players can scroll through previous messages to review important information
   - Special inputs (like choices) are marked with a special format in the backlog

4. **Narrative Techniques**:
   - Different text colors are used to distinguish between:
     - Normal dialogue (default color)
     - Internal thoughts (blue color)
     - System messages (green color)
     - Important information (yellow color)
     - Warnings or danger (red color)
   - Font size changes are used for emphasis or to represent volume changes
   - Name boxes clearly identify speakers in multi-character conversations

5. **Technical Implementation**:
   - Custom fonts are used for a unique visual style that fits the cyberpunk setting
   - Font size is set to 28 for good readability on various screen sizes
   - Message window width is set to the full screen width for maximum text space
   - Face indent is carefully calculated to ensure text doesn't overlap with face graphics

This implementation creates a polished and professional text presentation system that enhances the storytelling capabilities of the game, making dialogue more engaging and easier to follow.

### YEP_X_PartyLimitGauge

#### Overview
The Party Limit Gauge plugin creates a shared resource gauge for the entire party that fills up during battle based on various actions. This gauge can then be spent to use powerful skills.

#### Configuration in MegaEarth2049
- **Gauge Increments**: 100 (Each increment represents 100 points in the raw gauge value)
- **Party Text Size**: 24
- **Draw Cost Icon**: true (Shows the icon for Party Limit costs)
- **Cost Color**: 6 (Yellow text color for costs)
- **Party Gauge Colors**: 9 and 1 (Blue gradient)
- **Party Gauge Icon**: 166
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

### YEP_SkillCore

#### Overview
The Skill Core plugin expands the functionality of skills, allowing for different types of costs, custom damage formulas, and more.

#### Configuration in MegaEarth2049
- **Cost Padding**: 4
- **Command Alignment**: center
- **Window Columns**: 2
- **HP/MP/TP Cost Display**: Configured with custom formats, font sizes, text colors, and icons

#### Implementation in MegaEarth2049
This plugin serves as a foundation for the Party Limit Gauge system and is used extensively throughout the game's skill system. Many skills in the game use custom action sequences and effects that are enabled by this plugin.

### YEP_BattleEngineCore

#### Overview
The Battle Engine Core plugin provides extensive control over the battle system, allowing for customization of battle flow, animations, and more.

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

### YEP_X_ActSeqPack1

#### Overview
This plugin adds basic action sequence functions to the Battle Engine Core.

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
This plugin adds visual action sequence functions to the Battle Engine Core.

#### Implementation in MegaEarth2049
Used to create visually impressive battle animations with effects like:

- Screen flashes
- Opacity changes
- Floating effects
- Visual impact effects

Skills like "Bulldoze" (ID 68) and "Shred" (ID 59) use these visual effects extensively.

### YEP_X_ActSeqPack3

#### Overview
This plugin adds camera control functions to the Battle Engine Core.

#### Configuration in MegaEarth2049
- **Camera Option**: Battle Camera

#### Implementation in MegaEarth2049
Used to create dynamic camera movements during battle sequences, enhancing the visual impact of skills. Many skills in the game use camera control functions such as:

- Camera focus (focusing on specific targets)
- Camera screen (positioning the camera at specific locations)
- Zoom effects (zooming in/out during key moments)

Skills like "Bulldoze" (ID 68), "Ninjitsu" (ID 69), and "Fists of Fury" (ID 108) make extensive use of these camera controls to create cinematic battle sequences.

### YEP_AbsorptionBarrier

#### Overview
This plugin allows battlers to be surrounded by an absorption barrier that mitigates damage dealt to HP.

#### Configuration in MegaEarth2049
- **Barrier State**: 15
- **Barrier Colors**: 13 and 5
- **Barrier Animation**: 136
- **Break Animation**: 135
- **Clear Per Battle**: true (Barriers are cleared at the end of battle)
- **Clear on Death**: true (Barriers are cleared when a battler dies)

#### Implementation in MegaEarth2049
The Absorption Barrier system is used in several skills to provide defensive capabilities:

- "Barrier" (ID 46): Adds a 200-point barrier to a single target
- "Magic Barrier" (ID 47): Adds a 200-point barrier to a single target
- "Firewall" (ID 52): Adds a 100-point barrier to all allies
- "Rally" (ID 24): Adds a 150-point barrier to all allies

The "Tinker" (ID 48) and "Hackathon" (ID 49) skills can reduce enemy barriers by 100 and 75 points respectively, while "Reverse Engineer" (ID 50) can reduce them by 200 points.

### YEP_RowFormation

#### Overview
This plugin places party members into row formations to give them distinct advantages based on row location.

#### Configuration in MegaEarth2049
- **Maximum Rows**: 3
- **Row Names and Descriptions**:
  - Front Row: "This is the front row. Place your melee allies here."
  - Middle Row: "This is the middle row. Place allies here who can fight from the middle."
  - Back Row: "This is the back row. Place allies here to take less melee damage."

#### Implementation in MegaEarth2049
The row formation system provides tactical depth to battles by allowing players to position characters based on their strengths and weaknesses. Melee-focused characters benefit from being in the front row for increased damage, while ranged attackers and support characters can stay safer in the back rows.

### YEP_JobPoints

#### Overview
This plugin enables actors to acquire JP (job points) that can be used for other plugins.

#### Configuration in MegaEarth2049
- **JP Text**: JMU
- **JP Icon**: 188
- **JP Per Action**: 10 + Math.randomInt(10)
- **JP Per Level**: 100 + Math.randomInt(100)
- **JP Per Enemy**: 50 + Math.randomInt(10)
- **Show Results**: true

#### Implementation in MegaEarth2049
The Job Points system is integrated with all skills in the game. Regular skills provide a small amount of JP (15 + Math.randomInt(10)), while the special "Squad Attack" skills that use the Party Limit Gauge provide significantly more JP (100 + Math.randomInt(50)). This creates an incentive for players to build up and use their Party Limit Gauge for these powerful skills, as they not only deal more damage but also provide more JP for character progression.

### YEP_SkillLearnSystem

#### Overview
This plugin allows actors to learn skills from the skill menu through crafting them via items or otherwise.

#### Configuration in MegaEarth2049
- **Learn Command**: Learn Skills
- **Show Command**: true
- **Enable Command**: true
- **Confirm Window**: true
- **Confirm Text**: Have %1 learn %2?
- **Default Gold Cost**: 1000
- **Default JP Cost**: 100

#### Implementation in MegaEarth2049
The Skill Learn System is used to allow players to learn new skills by spending JP (Job Points). This creates a progression system where players can customize their characters by choosing which skills to learn based on their playstyle and strategy.

### YEP_BuffsStatesCore

#### Overview
This plugin alters the basic mechanics behind buffs and states that aren't adjustable within the RPG Maker editor.

#### Configuration in MegaEarth2049
- **Show Turns**: true
- **Enemy Buff/State Display**: Configured to show turns and counters
- **Buff Formula**: this._buffs[paramId] * 0.25 + 1.0

#### Implementation in MegaEarth2049
The Buffs States Core is extended by several other plugins (StateCategories, ExtDoT, VisualStateFX) to create a comprehensive state system. Various skills in the game apply states with visual effects and damage-over-time capabilities:

- "Bite" (ID 126): Has a chance to apply state 26
- "Smoke Bomb" (ID 76): Applies state 5 with a 70% chance
- "Poop Fling" (ID 43): Applies state 14 with a 50% chance and state 32 with a 15% chance

### YEP_X_AnimatedSVEnemies

#### Overview
The Animated SV Enemies plugin allows you to use Animated Sideview Actors for enemies in battle. This creates a more dynamic and visually engaging battle system by giving enemies the same animation capabilities as player characters, including idle animations, attack motions, damage reactions, and death animations.

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

5. **Performance Optimization**:
   - Frame counts are optimized for each enemy type to balance visual quality and performance
   - Simpler enemies use fewer animation frames to reduce memory usage
   - Important enemies (bosses, etc.) use more detailed animations

This implementation creates a cohesive visual style for battles where both player characters and enemies have similar animation quality, making the combat system more immersive and visually consistent.

### YEP_EnemyLevels

#### Overview
The YEP_EnemyLevels plugin enables enemies to have levels, similar to actors, with parameter changes based on those levels. This creates a more dynamic difficulty system where enemies can scale with the player's progress, ensuring that battles remain challenging throughout the game.

#### Configuration in MegaEarth2049
- **Minimum Level**: 1 (Lowest possible enemy level)
- **Maximum Level**: 9999 (Highest possible enemy level)
- **Maximum Cap**: 9999 (Maximum value for parameters)
- **Preserve Rate**: true (Preserves rate-based parameter growth)
- **Default Type**: 5 (Default level calculation type)
- **Positive Fluctuation**: 2 (Random level increase)
- **Negative Fluctuation**: 2 (Random level decrease)
- **Parameter Growth Formulas**:
  - **HP**: base * (1 + (level - 1) * rate) + (flat * (level - 1))
  - **MP**: base * (1 + (level - 1) * rate) + (flat * (level - 1))
  - **ATK/DEF/MAT/MDF/AGI/LUK**: base * (1 + (level - 1) * rate) + (flat * (level - 1))
  - **EXP/Gold**: base * (1 + (level - 1) * rate) + (flat * (level - 1))
- **Growth Rates**:
  - **HP Rate**: 0.15 (15% increase per level)
  - **HP Flat**: 50.0 (50 flat increase per level)
  - **MP Rate**: 0.10 (10% increase per level)
  - **MP Flat**: 10.0 (10 flat increase per level)
  - **ATK/DEF/MAT/MDF/AGI/LUK Rate**: 0.05 (5% increase per level)
  - **ATK/DEF/MAT/MDF/AGI/LUK Flat**: 2.5 (2.5 flat increase per level)
  - **EXP/Gold Rate**: 0.14 (14% increase per level)
  - **EXP/Gold Flat**: 9.00 (9 flat increase per level)

#### Implementation in MegaEarth2049
The Enemy Levels system is a core component of the game's difficulty scaling, ensuring that enemies remain challenging as players progress through the game. The implementation includes:

1. **Level Calculation Types**:
   The game uses different level calculation types for different areas and enemy groups:
   - **Type 1 (Lowest Party Member)**: Used for tutorial areas and early game encounters
   - **Type 2 (Average Party Level)**: Used for standard encounters in most areas
   - **Type 3 (Highest Party Member)**: Used for elite enemies and mini-bosses
   - **Type 4 (Specific Level)**: Used for story bosses and special encounters
   - **Type 5 (Formula-Based)**: Used for dynamically scaling enemies in certain areas

2. **Area-Based Level Scaling**:
   - Early game areas (Maps 1-20): Enemies use Type 1 or 2 with lower base levels
   - Mid-game areas (Maps 21-50): Enemies use Type 2 or 3 with moderate base levels
   - Late-game areas (Maps 51-80): Enemies use Type 3 or 5 with higher base levels
   - End-game areas (Maps 81+): Enemies use Type 3, 4, or 5 with the highest base levels

3. **Enemy Type Specialization**:
   - **Corporate Security**: Higher DEF and HP scaling
   - **Hackers**: Higher MAT and MP scaling
   - **Street Gangs**: Higher ATK and AGI scaling
   - **Mutants**: Higher HP and ATK scaling but lower DEF scaling
   - **Robots**: Higher DEF and MDF scaling but lower AGI scaling
   - **Bosses**: Higher scaling across all parameters

4. **Level Display**:
   - Enemy levels are displayed in battle next to their names
   - The EnemyBook shows base level and level range for each enemy type
   - Level format is set to "Lv%1 %2" (e.g., "Lv5 Corporate Guard")

5. **Integration with YEP_X_DifficultySlider**:
   - Enemy levels are modified by the player's chosen difficulty setting
   - Higher difficulties increase enemy levels beyond their base calculation
   - Lower difficulties decrease enemy levels below their base calculation

This implementation creates a dynamic difficulty system that scales with player progression, ensuring that battles remain challenging and engaging throughout the game while allowing players to customize their experience through the difficulty slider.

### YEP_X_DifficultySlider

#### Overview
The YEP_X_DifficultySlider plugin extends YEP_EnemyLevels by giving players access to an option that allows them to change the game's difficulty. This affects enemy levels and, consequently, their parameters, providing a customizable gameplay experience that can adapt to different player skill levels.

#### Configuration in MegaEarth2049
- **Command Text**: Difficulty (Text displayed in the options menu)
- **Default Show**: true (Difficulty option is shown by default)
- **Default Difficulty**: 100 (Default difficulty percentage)
- **Minimum Difficulty**: 50 (Lowest possible difficulty setting)
- **Maximum Difficulty**: 200 (Highest possible difficulty setting)
- **Change Increment**: 25 (Amount difficulty changes with each adjustment)
- **Level Formulas**:
  - **Base Level Formula**: level * multiplier / 100
  - **Maximum Level Formula**: level * multiplier / 100
  - **Minimum Level Formula**: level * multiplier / 100

#### Implementation in MegaEarth2049
The Difficulty Slider is implemented as a player-facing feature that allows customization of the game's challenge level. The implementation includes:

1. **Options Menu Integration**:
   - The difficulty slider appears in the "General" tab of the options menu
   - Players can adjust difficulty at any time during gameplay
   - Changes take effect immediately for all subsequent enemy encounters
   - The current difficulty setting is saved with the game save file

2. **Difficulty Levels**:
   The game provides five preset difficulty levels through the slider:
   - **Easy (50%)**: Enemy levels are halved, suitable for story-focused players
   - **Normal (100%)**: Standard difficulty, balanced for the average player
   - **Hard (125%)**: Enemy levels are increased by 25%, providing a moderate challenge
   - **Very Hard (150%)**: Enemy levels are increased by 50%, suitable for experienced players
   - **Nightmare (200%)**: Enemy levels are doubled, creating an extreme challenge

3. **Effect on Gameplay**:
   - **Enemy Levels**: Directly scaled by the difficulty multiplier
   - **Enemy Parameters**: Indirectly scaled through the level adjustment
   - **Rewards**: EXP and gold drops scale with enemy levels, ensuring appropriate rewards
   - **Boss Encounters**: Even fixed-level bosses (Type 4) are affected by the difficulty slider

4. **Visual Feedback**:
   - The options menu displays the current difficulty percentage
   - A gauge shows the relative difficulty level with color coding
   - Lower difficulties are shown in green, higher difficulties in red
   - The text changes to reflect the named difficulty level (Easy, Normal, Hard, etc.)

5. **Balance Considerations**:
   - The minimum difficulty (50%) ensures that even on Easy, enemies provide some challenge
   - The maximum difficulty (200%) creates a significant challenge without making the game impossible
   - The 25% increment allows for fine-tuning without overwhelming players with too many options
   - The formulas ensure consistent scaling across all enemy types and areas

This implementation provides players with control over their gameplay experience, allowing them to adjust the difficulty based on their skill level, playstyle preferences, or desire for challenge. The integration with YEP_EnemyLevels creates a comprehensive difficulty system that affects all aspects of combat while maintaining game balance.

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

#### Technical Implementation
The plugin works by replacing the default `levelUp` function with a custom version that:
1. Increases the level by 1
2. Calculates healing amounts based on the configuration (percentage or fixed value)
3. Applies the healing, ensuring it doesn't exceed maximum HP/MP
4. Proceeds with the normal level-up behavior (learning skills)

The code is straightforward and efficient, making minimal changes to the core game functionality while providing a useful quality-of-life feature for players.

### YEP_X_ExtDoT

#### Overview
This plugin allows for the creation of custom Damage over Time (DoT) formulas and effects.

#### Configuration in MegaEarth2049
- **Regen Animation**: 46
- **DoT Animation**: 59
- **Default Variance**: 20
- **Default Element**: 0

#### Implementation in MegaEarth2049
The Extended Damage over Time system is used to create states that deal damage over multiple turns, adding strategic depth to battles. Players can apply these states to enemies to deal damage over time, while also focusing on other targets or defensive actions.

### YEP_X_VisualStateFX

#### Overview
This plugin adds visual effects to states, making them more noticeable and impactful.

#### Configuration in MegaEarth2049
- **Actor/Enemy State Display**: Overlays, icons, and animations enabled
- **Animation Settings**: Flash and sound effects enabled

#### Implementation in MegaEarth2049
Visual State Effects are used to provide clear feedback when states are applied, making the battle system more intuitive and visually engaging. Players can easily see which characters are affected by which states, helping them make strategic decisions.

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

This implementation creates a balanced party system where each character has a specific role in battle, encouraging players to use different characters for different situations.

### HIME_PlaceholderStates

#### Overview
This plugin allows for the creation of states that may resolve to different states when they are added or removed, based on a formula.

#### Configuration in MegaEarth2049
The plugin is used with its default configuration, with no custom parameters set.

#### Implementation in MegaEarth2049
The game uses placeholder states to create dynamic state progression systems, where applying the same state multiple times can lead to different outcomes. There are two main placeholder states implemented:

1. **Dia/Dys (State 14)**:
   This placeholder state resolves to either Diarrhea (State 11) or Dysentery (State 13) based on how long the character has had Diarrhea:
   ```javascript
   <placeholder state>
   var diarrhea = 11;
     if (a.isStateAffected(diarrhea)) {
       var turnsLeft = a._stateTurns[diarrhea];
       if(turnsLeft >= 11) {
         13;
       } else {
         11
       } 
     }
     else {
        11;
     } 
   </placeholder state>
   ```
   - First application: Applies Diarrhea (State 11)
   - If Diarrhea has been active for 11+ turns and the state is applied again: Applies Dysentery (State 13)
   - Dysentery is a more severe condition with stronger debuffs than Diarrhea

2. **Hyped/Stoked (State 18)**:
   This placeholder state resolves to either Hyped (State 19) or Stoked (State 20) based on how long the character has been Hyped:
   ```javascript
   <placeholder state>
   var hype = 19;
     if (a.isStateAffected(hype)) {
       var turnsLeft = a._stateTurns[hype];
       if(turnsLeft >= 11) {
         20;
       } else {
         19
       } 
     }
     else {
        19;
     } 
   </placeholder state>
   ```
   - First application: Applies Hyped (State 19)
   - If Hyped has been active for 11+ turns and the state is applied again: Applies Stoked (State 20)
   - Stoked provides stronger buffs than Hyped, including increased parameters and special attack replacements

These placeholder states create interesting gameplay mechanics where the same skill or item can have different effects based on the target's current condition, adding strategic depth to the battle system.
