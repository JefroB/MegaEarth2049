> Reference snapshot: verify IDs, effects and enabled-plugin behavior against the live data and current FAQs. This relocation does not certify the older catalog as current.

# RPG Maker MV Plugins Documentation Guide

## Overview

This repository contains comprehensive documentation for the plugins used in the MegaEarth2049 RPG Maker MV project. The documentation is organized into category-specific files for easier navigation and maintenance.

## Documentation Structure

The documentation is organized into the following files:

- **[RPG_Maker_MV_Plugins_README.md](RPG_Maker_MV_Plugins_README.md)** (this file): Main index and guide to the documentation
- **[Battle_System_Plugins.md](Battle_System_Plugins.md)**: Documentation for battle system plugins
- **[Item_Equipment_Plugins.md](Item_Equipment_Plugins.md)**: Documentation for item and equipment plugins
- **[Character_Party_Plugins.md](Character_Party_Plugins.md)**: Documentation for character and party plugins
- **[States_Effects_Plugins.md](States_Effects_Plugins.md)**: Documentation for states and effects plugins
- **[UI_Message_Plugins.md](UI_Message_Plugins.md)**: Documentation for UI and message plugins
- **[Miscellaneous_Plugins.md](Miscellaneous_Plugins.md)**: Documentation for miscellaneous plugins
- **[Quest_Journal_Plugin.md](../../archive/quests/Quest_Journal_Plugin.md)**: Documentation for the quest journal system
- **[YEP_CoreEngine_Documentation.md](YEP_CoreEngine_Documentation.md)**: Detailed documentation for YEP_CoreEngine
- **[YEP_ItemCore_EquipCore_Documentation.md](YEP_ItemCore_EquipCore_Documentation.md)**: Detailed documentation for YEP_ItemCore and YEP_EquipCore
- **[WeaponSkill_Implementation_README.md](WeaponSkill_Implementation_README.md)**: Implementation plan for the WeaponSkill plugin

## Plugin Categories

### Battle System
Documented in [Battle_System_Plugins.md](Battle_System_Plugins.md)
- YEP_BattleEngineCore
- YEP_BattleStatusWindow
- YEP_X_ActSeqPack1/2/3
- YEP_X_AnimatedSVEnemies
- YEP_X_InBattleStatus
- YEP_X_VisualHpGauge
- YEP_DamageCore
- YEP_X_ArmorScaling
- YEP_RowFormation
- WeaponSkill
- YEP_WeaponAnimation
- HIME_ActorBattleCommands

### Item and Equipment
Documented in [Item_Equipment_Plugins.md](Item_Equipment_Plugins.md)
- YEP_ItemCore
- YEP_X_ItemDiscard
- YEP_X_ItemPictureImg
- YEP_EquipCore
- YEP_ShopMenuCore
- ItemBook

### Character and Party
Documented in [Character_Party_Plugins.md](Character_Party_Plugins.md)
- YEP_PartySystem
- YEP_JobPoints
- YEP_SkillCore
- YEP_SkillLearnSystem
- YEP_X_PartyLimitGauge
- ROKI_HealOnLvUp

### States and Effects
Documented in [States_Effects_Plugins.md](States_Effects_Plugins.md)
- YEP_BuffsStatesCore
- YEP_X_StateCategories
- YEP_X_ExtDoT
- YEP_X_VisualStateFX
- YEP_AbsorptionBarrier
- HIME_PlaceholderStates

### User Interface and Messages
Documented in [UI_Message_Plugins.md](UI_Message_Plugins.md)
- YEP_CoreEngine
- YEP_OptionsCore
- YEP_MessageCore
- YEP_X_MessageBacklog
- YEP_VictoryAftermath
- YEP_X_AftermathLevelUp

### Quest System
Documented in [Quest_Journal_Plugin.md](../../archive/quests/Quest_Journal_Plugin.md)
- YEP_QuestJournal

### Miscellaneous
Documented in [Miscellaneous_Plugins.md](Miscellaneous_Plugins.md)
- YEP_EnemyLevels
- YEP_X_DifficultySlider
- EnemyBook
- YEP_BattleAniSpeedOpt
- YEP_X_NewGamePlus (disabled)
- YEP_BattleBgmControl (disabled)

## Purpose

This documentation serves several important purposes:

1. **Project Reference**: Provides a quick reference for all plugins used in the project
2. **Implementation Details**: Documents how specific plugins are being used in the game
3. **Troubleshooting Aid**: Helps identify plugin dependencies and potential conflicts
4. **Future Development**: Makes it easier to understand the project's capabilities when making changes
5. **Knowledge Transfer**: Facilitates sharing project knowledge with new team members

## How to Use This Documentation

### For Project Overview

1. Start with this README file to understand the overall structure
2. Review the categorized lists in the "Plugin Categories" section to understand what functionality areas are covered
3. Navigate to the specific category file for more detailed information

### For Specific Plugin Information

1. Identify which category the plugin belongs to
2. Navigate to the corresponding category file
3. Find the plugin in the detailed documentation section to learn about:
   - Version information
   - Description
   - Configuration parameters
   - Implementation details
   - Integration with other plugins

### For Implementation Details

Each category file provides in-depth information about how plugins are used in the project:

1. **docs/reference/plugins/Battle_System_Plugins.md**: Details custom battle sequences, animations, and mechanics
2. **docs/reference/plugins/Character_Party_Plugins.md**: Explains party management, skill learning, and the Party Limit Gauge
3. **docs/reference/plugins/Item_Equipment_Plugins.md**: Documents the item system, equipment, and shops (including Zed's mod clinic)
4. **docs/reference/plugins/States_Effects_Plugins.md**: Covers status effects, barriers, and damage-over-time mechanics
5. **docs/reference/plugins/UI_Message_Plugins.md**: Details message system, UI customization, and victory sequences
6. **docs/archive/quests/Quest_Journal_Plugin.md**: Documents the quest journal system, quest categories, and implementation
7. **docs/reference/plugins/Miscellaneous_Plugins.md**: Explains enemy leveling, difficulty adjustment, and other features

### For Troubleshooting

If you encounter issues with specific game features:

1. Identify which plugin category the feature belongs to
2. Check the relevant category file for plugin dependencies and integration details
3. Review the plugin parameters to ensure proper configuration
4. Look at the implementation examples to understand how the plugin is being used

## Maintaining the Documentation

To keep this documentation up-to-date:

1. When adding new plugins to the project:
   - Add them to the `js/plugins.js` file
   - Update the appropriate category file with the plugin's information
   - Add it to the plugin list in this README file

2. When changing plugin parameters:
   - Update the corresponding parameters in the appropriate category file

3. When changing how plugins are used:
   - Update the implementation details in the appropriate category file

4. When disabling plugins:
   - Move the plugin to the disabled section in the appropriate category file
   - Update the status in the plugin list

## Plugin Structure in RPG Maker MV

Understanding how plugins work in RPG Maker MV:

- **plugins.js**: Located in the `js/` folder, this file contains the list of all plugins and their parameters
- **Plugin Files**: Located in the `js/plugins/` folder, these are the actual JavaScript files that implement the plugin functionality
- **Plugin Parameters**: Configured in the RPG Maker MV editor or directly in the plugins.js file
- **Notetags**: Special tags added to database objects (actors, classes, items, skills, etc.) that interact with plugins

## Common Plugin Developers

This project uses plugins from several well-known developers:

- **Yanfly Engine Plugins (YEP)**: Comprehensive suite of plugins that enhance nearly every aspect of RPG Maker MV
- **Hime Works (HIME)**: Specialized plugins for specific game mechanics
- **Moghunter (MOG)**: Visual enhancement plugins, particularly for battle and UI elements
- **SumRndmDde (SRD)**: Various utility and enhancement plugins

## Additional Resources

For more information about specific plugins, visit these resources:

- [Yanfly Engine Plugins](http://yanfly.moe/yep/)
- [Hime Works](http://himeworks.com/)
- [Moghunter's Blog](https://mogplugins.wordpress.com/)
- [SumRndmDde's Website](https://sumrndm.site/)
- [RPG Maker Web Forums](https://forums.rpgmakerweb.com/)
