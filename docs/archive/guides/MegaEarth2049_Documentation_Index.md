> Historical document retained for provenance. Its commands, IDs and completion claims may be superseded. Use the current FAQs, roadmap and maintained tools for current behavior.

# MegaEarth2049 Documentation Index

This document serves as a central index for all technical documentation related to the MegaEarth2049 RPG Maker MV project. It provides an overview of each documentation file and explains how they relate to each other, helping future AI assistants navigate the documentation efficiently.

## Documentation Overview

The MegaEarth2049 documentation is organized into seventeen specialized documents, each focusing on different aspects of the game's structure and mechanics:

1. **docs/archive/guides/MegaEarth2049_Technical_Documentation.md** - General overview of the game's JSON files and their relationships
2. **docs/reference/maps/MegaEarth2049_Map_Structure_Documentation.md** - Detailed information about the map hierarchy and navigation
3. **docs/reference/database/MegaEarth2049_Enemies_Documentation.md** - Comprehensive guide to the enemy system and combat mechanics
4. **docs/reference/database/MegaEarth2049_Troops_Documentation.md** - Detailed explanation of battle encounters and the Troops.json implementation
5. **docs/reference/database/MegaEarth2049_Items_Documentation.md** - Detailed information about the item system and Items.json implementation
6. **docs/reference/database/MegaEarth2049_States_Documentation.md** - Comprehensive guide to the state system and disease mechanics
7. **docs/reference/database/MegaEarth2049_Weapons_Documentation.md** - Detailed documentation of the weapon system and Weapons.json implementation
8. **docs/reference/database/MegaEarth2049_Armors_Documentation.md** - Comprehensive guide to the armor system and Armors.json implementation
9. **docs/reference/database/MegaEarth2049_CommonEvents_Documentation.md** - Explanation of reusable event sequences and mechanics
10. **docs/archive/quests/MegaEarth2049_Quest_Design_Documentation.md** - Guidelines for creating quests that integrate with the game's systems
11. **docs/reference/database/MegaEarth2049_Actors_Classes_Documentation.md** - Detailed explanation of the character system and class mechanics
12. **docs/reference/database/MegaEarth2049_Skills_Documentation.md** - Comprehensive documentation of the skills system and Skills.json implementation
13. **docs/reference/battle/MegaEarth2049_Animations_Documentation.md** - Detailed guide to battle animations and the Animations.json file
14. **docs/archive/quests/Quest_Journal_Plugin.md** - Detailed documentation of the YEP_QuestJournal plugin implementation
15. **docs/archive/guides/MegaEarth2049_AI_Development_Guide.md** - Specialized guide for AI assistants on creating stable, thematically consistent content
16. **docs/reference/maps/MegaEarth2049_Map_Documentation.md** - Comprehensive documentation of all maps in the game, including incomplete maps
17. **tools/legacy-root/docs/Map_Documentation_Tools_README.md** - Guide to using the map analysis and documentation tools

Together, these documents provide a comprehensive understanding of the MegaEarth2049 project structure, enabling AI assistants to create new content that seamlessly integrates with the existing game.

## Document Summaries

### 1. MegaEarth2049_Technical_Documentation.md

**Purpose**: Provides a general overview of the key JSON files in the MegaEarth2049 project and how they work together.

**Key Sections**:
- Overview of Maps, MapInfos.json, Tilesets.json, CommonEvents.json, and Enemies.json
- Relationships between files and how they create the game world
- Quest structure and implementation
- Guidelines for creating new content for incomplete maps
- Best practices for AI assistants

**When to Use**: Start with this document to gain a broad understanding of the project structure before diving into more specialized documentation.

### 2. MegaEarth2049_Map_Structure_Documentation.md

**Purpose**: Focuses specifically on the map hierarchy and how locations are connected in the game world.

**Key Sections**:
- MapInfos.json structure and properties
- World hierarchy and parent-child relationships
- Map connections and navigation systems
- Quest progression through maps
- Development opportunities for incomplete maps
- Map-based encounter design

**When to Use**: Refer to this document when working with map-related tasks, such as creating new areas, establishing connections between locations, or understanding the spatial relationships in the game world.

### 3. MegaEarth2049_Enemies_Documentation.md

**Purpose**: Details the enemy system, combat mechanics, and how to create balanced encounters.

**Key Sections**:
- Enemies.json structure and properties
- Enemy categories and types in MegaEarth2049
- Enemy properties and mechanics
- Integration with game progression
- Creating balanced enemy encounters
- Enemy-specific mechanics
- Creating new enemies

**When to Use**: Consult this document when working with combat-related tasks, such as creating new enemies, designing balanced encounters, or integrating enemies with quests.

### 4. MegaEarth2049_Troops_Documentation.md

**Purpose**: Provides detailed information about the troop system, battle encounter design, and how troops integrate with the enemy system to create engaging combat experiences.

**Key Sections**:
- Troops.json structure and properties
- Member structure and battle event pages
- Troop categories and formations
- Battle event system and conditional triggers
- Troop design patterns and positioning strategies
- Integration with map encounters and enemy leveling
- Creating new troops and battle events
- Future enhancement opportunities

**When to Use**: Reference this document when working with battle encounters, such as creating new enemy formations, designing boss battles with special events, or understanding how troops are integrated with maps and the encounter system.

### 5. MegaEarth2049_Items_Documentation.md

**Purpose**: Details the item system in MegaEarth2049, focusing on the Items.json file structure, item types, and their integration with game mechanics, with special attention to the disease cure system.

**Key Sections**:
- Items.json structure and properties
- Effect codes and parameters
- Item categories (consumables, key items, special items)
- Disease cure system and implementation
- YEP_ItemCore integration and enhancements
- Item usage contexts and acquisition methods
- Future enhancement opportunities for the item system

**When to Use**: Consult this document when working with item-related tasks, such as creating new consumable items, implementing quest items, or designing disease cures that integrate with the state system.

### 6. MegaEarth2049_States_Documentation.md

**Purpose**: Provides comprehensive documentation of the state system in MegaEarth2049, focusing on the States.json file structure, state types, and their integration with game mechanics, with special attention to the disease system.

**Key Sections**:
- States.json structure and properties
- Trait codes and parameters
- State categories (standard, diseases, buffs/debuffs, special)
- Disease system mechanics and progression
- Cure mechanics and implementation
- Plugin integration (BuffsStatesCore, StateCategories, ExtDoT)
- Creating new disease states and considerations

**When to Use**: Reference this document when working with state-related tasks, such as creating new status effects, implementing disease mechanics, or designing cure systems that integrate with items and skills.

### 7. MegaEarth2049_Weapons_Documentation.md

**Purpose**: Details the weapon system in MegaEarth2049, focusing on the Weapons.json file structure, weapon types, and their integration with game mechanics, with special attention to future enhancement opportunities.

**Key Sections**:
- Weapons.json structure and properties
- Weapon types and categories
- Available weapon assets and images
- WeaponSkill plugin integration
- Grenade system implementation
- Future enhancement opportunities for weapons
- Corporate-themed weapons and progression systems

**When to Use**: Consult this document when working with weapon-related tasks, such as creating new weapons, implementing the WeaponSkill system, or expanding the grenade system to add tactical variety to combat.

### 8. MegaEarth2049_Armors_Documentation.md

**Purpose**: Provides comprehensive documentation of the armor system in MegaEarth2049, focusing on the Armors.json file structure, armor types, and their integration with game mechanics, with special attention to future enhancement opportunities.

**Key Sections**:
- Armors.json structure and properties
- Equipment types and armor categories
- Color-coded armor sets and their statistics
- Specialized armor types (Armortech, Heavy Armor)
- Future enhancement opportunities for armors
- Set bonus systems and corporate-themed armor

**When to Use**: Reference this document when working with armor-related tasks, such as creating new armor pieces, implementing armor set bonuses, or designing specialized armor types for different gameplay situations.

### 9. MegaEarth2049_CommonEvents_Documentation.md

**Purpose**: Explains how common events implement reusable game mechanics and how they can be extended.

**Key Sections**:
- CommonEvents.json structure
- Common event types in MegaEarth2049
- Implementation details and command codes
- Methods for calling common events
- Integration with game systems
- Creating new common events
- Best practices and patterns

**When to Use**: Reference this document when working with reusable mechanics, such as transportation systems, resource gathering, or status effects, or when creating new common events.

### 10. MegaEarth2049_Quest_Design_Documentation.md

**Purpose**: Provides guidelines for creating quests that integrate with the game's narrative, mechanics, and systems.

**Key Sections**:
- Quest structure overview and types
- Technical implementation in RPG Maker MV
- Quest design principles for MegaEarth2049
- Creating quests for incomplete maps
- Quest patterns and examples
- Integration with disease system and enemies
- Testing and refinement
- Complete quest implementation example

**When to Use**: Turn to this document when designing new quests, especially for incomplete maps, or when seeking to understand how quests integrate with other game systems.

### 11. MegaEarth2049_Actors_Classes_Documentation.md

**Purpose**: Details the character system in MegaEarth2049, focusing on Actors.json and Classes.json files and their relationships.

**Key Sections**:
- Actors.json and Classes.json structure and properties
- Character visual representation and trait systems
- Battle commands and skill learning systems
- Key characters and class designs in MegaEarth2049
- Integration with other game systems (skills, equipment, states)
- Guidelines for creating new actors and classes
- Technical implementation details
- Best practices for AI assistants

**When to Use**: Consult this document when working with character-related tasks, such as creating new playable characters, modifying existing classes, or understanding how characters develop and progress in the game.

### 12. MegaEarth2049_Skills_Documentation.md

**Purpose**: Provides comprehensive documentation of the Skills.json file and the skill system in MegaEarth2049, with special focus on implementation details and integration with other systems.

**Key Sections**:
- Skills.json structure and properties
- Skill types and categories
- Custom notetags and extensions
- Action sequences for visual effects
- Integration with WeaponSkill, Party Limit Gauge, and Job Points systems
- Skill design patterns and balance considerations
- Future enhancement opportunities

**When to Use**: Reference this document when working with skill-related tasks, such as creating new skills, understanding how skills integrate with weapons and other systems, or implementing custom action sequences for visual effects.

### 13. MegaEarth2049_Animations_Documentation.md

**Purpose**: Details the battle animation system in MegaEarth2049, focusing on the Animations.json file structure and how animations are integrated with skills and other battle mechanics.

**Key Sections**:
- Animations.json structure and properties
- Frame data and timing structure
- Animation categories and types
- Integration with skills and action sequences
- Creating and modifying animations
- Best practices for animation design
- Future enhancement opportunities

**When to Use**: Consult this document when working with battle animations, such as creating new visual effects for skills, understanding how animations are triggered during battle, or modifying existing animations to enhance the visual experience.

### 14. Quest_Journal_Plugin.md

**Purpose**: Details the implementation of the YEP_QuestJournal plugin, which provides a comprehensive quest tracking system for players.

**Key Sections**:
- Plugin configuration and settings
- Quest categories and organization
- Quest data structure and properties
- Implemented quest examples
- How to use plugin commands in events
- Script call examples for quest management
- Integration with existing switch/variable-based quest system
- Extension plugins for enhanced functionality

**When to Use**: Consult this document when working with the quest journal system, such as adding new quests to the journal, updating quest objectives, or integrating the journal with existing quest mechanics.

### 15. MegaEarth2049_AI_Development_Guide.md

**Purpose**: Provides a comprehensive guide specifically for AI assistants on how to create stable, thematically consistent content for MegaEarth2049, with special focus on balancing technical correctness with the game's unique cyberpunk-meets-absurdist-comedy style.

**Key Sections**:
- Technical stability framework for preventing game-breaking issues
- Thematic consistency guidelines for matching the game's tone and style
- Content creation workflows for maps, quests, items, weapons, enemies, skills, and more
- Advanced battle animation techniques with code examples
- Integration checklist for ensuring new content works with existing systems
- Troubleshooting guide for common issues and their solutions
- Code examples for all major content types

**When to Use**: This should be the primary reference for AI assistants working on MegaEarth2049. Consult this guide before creating any new content to ensure it both functions correctly and maintains the game's unique style and tone. The document provides practical implementation examples that can be adapted for various content creation tasks.

## How to Use This Documentation

### For General Understanding

1. Start with **docs/archive/guides/MegaEarth2049_Technical_Documentation.md** to gain a broad overview of the project structure.
2. Review **docs/reference/maps/MegaEarth2049_Map_Structure_Documentation.md** to understand the spatial organization of the game world.
3. Explore **docs/reference/database/MegaEarth2049_Actors_Classes_Documentation.md** to understand the character system.
4. Explore the other documents based on your specific interests or needs.

### For Specific Tasks

- **For any content creation task**: Start with the AI Development Guide for stability guidelines and thematic consistency.
- **Creating a new map**: Refer to the Map Structure Documentation for hierarchy guidelines, then the Technical Documentation for implementation details.
- **Designing new enemies**: Consult the Enemies Documentation for structure and balance guidelines.
- **Creating battle encounters**: Review the Troops Documentation for formation strategies, battle events, and integration with the enemy system.
- **Creating new items**: Reference the Items Documentation for structure, effect codes, and integration with the disease system.
- **Implementing status effects**: Study the States Documentation for trait codes, disease mechanics, and cure implementation.
- **Creating new characters**: Review the Actors Classes Documentation for character creation guidelines and class mechanics.
- **Implementing reusable mechanics**: Review the CommonEvents Documentation for patterns and implementation techniques.
- **Developing new quests**: Study the Quest Design Documentation for patterns and integration guidelines, and the Quest Journal Plugin documentation for implementing the quest journal system.
- **Creating or modifying skills**: Reference the Skills Documentation for structure, integration with other systems, and action sequence implementation.
- **Designing battle animations**: Explore the Animations Documentation for animation structure, frame data, and integration with skills.
- **Troubleshooting issues**: Consult the AI Development Guide's troubleshooting section for common problems and solutions.
- **Understanding the map structure**: Review the Map Documentation for a comprehensive overview of all maps, including incomplete ones.
- **Analyzing maps**: Use the Map Documentation Tools to analyze maps, identify incomplete maps, and generate updated documentation.

### For Comprehensive Development

When developing comprehensive new content (such as completing an incomplete map with quests, enemies, and mechanics):

1. Review the AI Development Guide for stability guidelines and thematic consistency principles
2. Understand the map's position in the hierarchy (Map Structure Documentation)
3. Design appropriate enemies for the area (Enemies Documentation)
4. Create battle encounters using troops (Troops Documentation)
5. Design status effects and diseases for the area (States Documentation)
6. Create items, including consumables and disease cures (Items Documentation)
7. Create or modify characters that will appear in the area (Actors Classes Documentation)
8. Design skills for characters and enemies (Skills Documentation)
9. Create or modify battle animations for skills and states (Animations Documentation)
10. Implement any needed reusable mechanics (CommonEvents Documentation)
11. Create quests that integrate with the game's systems (Quest Design Documentation)
12. Implement the quest journal system for tracking quests (Quest Journal Plugin Documentation)
13. Use the Integration Checklist from the AI Development Guide to ensure all elements work together cohesively

## Key Concepts Across Documents

Several important concepts appear across multiple documents and are central to understanding MegaEarth2049:

### 1. Hierarchical Organization

The game uses hierarchical structures for:
- Maps (parent-child relationships)
- Events (indentation levels)
- Quests (main quests and side quests)

Understanding these hierarchies is essential for creating content that fits within the existing structure.

### 2. State Tracking

Game state is tracked through:
- Switches (boolean flags)
- Variables (numeric values)
- Items (inventory contents)
- Event page conditions

These mechanisms are used consistently across maps, common events, and quests.

### 3. Thematic Elements

The game's cyberpunk setting is reflected in:
- Corporate control and influence
- Technological modification and its consequences
- Post-Earth dystopian environment
- Satirical and often absurd tone

New content should maintain these thematic elements for consistency.

### 4. Integration Between Systems

The game's systems are highly integrated:
- Maps contain events that trigger common events
- Enemies appear in maps based on encounter lists
- Troops organize enemies into battle formations with conditional events
- States implement status effects, buffs/debuffs, and the disease system
- Items provide healing, status cures, and quest progression
- Disease states can progress from mild to severe forms if left untreated
- Cure items interact with the disease system to remove specific states
- Quests span multiple maps and involve various enemies, with the quest journal system tracking progress
- Common events implement mechanics used across quests
- Skills integrate with weapons, party limit gauge, and job points systems
- Characters learn skills based on class and progression
- Animations are referenced by skills and triggered through action sequences
- Battle mechanics combine skills, animations, and sound effects for a cohesive experience

Understanding these relationships is crucial for creating cohesive content.

## Conclusion

This documentation set provides a comprehensive guide to the MegaEarth2049 RPG Maker MV project, enabling AI assistants to understand the game's structure, mechanics, and design principles. By referring to the appropriate documents based on the task at hand, assistants can create new content that seamlessly integrates with the existing game world, maintaining consistency in both technical implementation and thematic elements.

When working on the MegaEarth2049 project, remember that the game combines technical precision with creative storytelling, balancing serious cyberpunk themes with satirical and absurd elements. By understanding both the technical framework and the narrative context, AI assistants can contribute effectively to the ongoing development of this unique game world.

