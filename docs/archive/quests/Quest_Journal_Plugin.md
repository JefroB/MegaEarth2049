> Historical document retained for provenance. Its commands, IDs and completion claims may be superseded. Use the current FAQs, roadmap and maintained tools for current behavior.

# Quest Journal Plugin Documentation

This document provides detailed information about the YEP_QuestJournal plugin implementation in the MegaEarth2049 RPG Maker MV project.

## Table of Contents
- [Overview](#overview)
- [Plugin Configuration](#plugin-configuration)
- [Quest Categories](#quest-categories)
- [Quest Data Structure](#quest-data-structure)
- [Implemented Quests](#implemented-quests)
- [How to Use in Events](#how-to-use-in-events)
- [Integration with Existing Systems](#integration-with-existing-systems)
- [Extension Plugins](#extension-plugins)

## Overview

The YEP_QuestJournal plugin adds a comprehensive quest tracking system to the game, allowing players to view their active, completed, and failed quests. The plugin organizes quests into categories and provides detailed information about each quest, including objectives, rewards, and related lore.

## Plugin Configuration

The YEP_QuestJournal plugin is configured with the following settings:

- **Quest Command**: "Quest" (The text displayed in the menu)
- **Show Command**: true (The quest command is visible in the menu)
- **Enable Command**: true (The quest command is enabled in the menu)
- **Auto Add Quests**: true (Quests are automatically added to the journal when triggered)

## Quest Categories

Quests in MegaEarth2049 are organized into the following categories:

1. **Main Story**: Primary quests that advance the central narrative about Rex's neural implant and the A.S.P. conflict
2. **Side Quests**: Additional content outside the main storyline
3. **Collection**: Quests focused on gathering specific items or resources
4. **Character Quests**: Quests that develop relationships with key NPCs
5. **Location Quests**: Quests tied to particular areas of the game world

## Quest Data Structure

Each quest in the system has the following properties:

- **Name**: The title of the quest
- **Category**: Which category the quest belongs to (1-5)
- **Difficulty**: A number representing the quest's challenge level (1-5)
- **From**: The NPC or entity that gave the quest
- **Location**: Where the quest takes place
- **Description**: A detailed explanation of the quest
- **Objectives**: A list of tasks to complete
- **Rewards**: What the player receives upon completion
- **Subtext**: Additional information or lore
- **Quotes**: Related dialogue from NPCs

## Implemented Quests

### Quest 1: The Mysterious Necklace
- **Category**: Main Story
- **Difficulty**: 2
- **From**: Found in Timbuc Cellar
- **Location**: Various locations throughout the game
- **Description**: You've discovered a strange necklace piece in the Timbuc Cellar. It seems to be part of a larger artifact with mysterious powers. Collect all the pieces to unlock its true potential.
- **Objectives**:
  - Find the necklace piece in Timbuc Cellar
  - Locate the second piece in the Abandoned Mine
  - Discover the third piece in the Floating Mansion
  - Find the final piece in the A.S.P. Facility
  - Assemble the complete necklace
- **Rewards**:
  - Complete Necklace (Key Item)
  - Enhanced neural implant capabilities
  - Access to new areas
- **Subtext**: The necklace appears to interact with your neural implant in strange ways.
- **Quotes**:
  - "This artifact predates the corporate wars. Handle with care." - Zed
  - "I've seen symbols like these before, in the old Earth archives." - Jen

### Quest 2: The Engine Reconstruction
- **Category**: Side Quests
- **Difficulty**: 3
- **From**: Engineer in Timbuc
- **Location**: Multiple locations
- **Description**: An engineer in Timbuc needs help reconstructing an advanced engine. The components are scattered across different locations.
- **Objectives**:
  - Obtain the engine blueprint
  - Find Component A in the Junkyard
  - Find Component B in the Corporate District
  - Find Component C in the Abandoned Factory
  - Return all components to the engineer
- **Rewards**:
  - Access to new transportation
  - Engineering skill increase
  - Unique weapon modification
- **Subtext**: This engine design seems unusually advanced for current technology.
- **Quotes**:
  - "With this engine, we could revolutionize transportation in the wasteland." - Engineer
  - "I haven't seen technology like this since before the collapse." - Zed

### Quest 3: The Mysterious Smelly Keys
- **Category**: Collection
- **Difficulty**: 2
- **From**: Various vendors in Timbuc
- **Location**: Timbuc
- **Description**: Strange, smelly keys have been appearing in food items sold by Timbuc vendors. These keys seem to open hidden caches throughout the city.
- **Objectives**:
  - Find Smelly Key #1 (in the soup)
  - Find Smelly Key #2 (in the bread)
  - Find Smelly Key #3 (in the meat pie)
  - Find Smelly Key #4 (in the fruit basket)
  - Discover what the keys open
- **Rewards**:
  - Access to hidden supply caches
  - Unique items from each cache
  - Information about Timbuc's underground
- **Subtext**: Who would hide keys in food, and why? The smell suggests they've been there a while...
- **Quotes**:
  - "I swear I didn't put that there! Must've been the supplier." - Food Vendor
  - "These keys smell terrible, but they might be worth the stench." - Rex

### Quest 4: Zed's Clinic
- **Category**: Character Quests
- **Difficulty**: 2
- **From**: Zed
- **Location**: Zed's Clinic in Timbuc
- **Description**: Zed, the eccentric cybernetic surgeon, needs rare materials for his experimental treatments. Help him gather these materials and you might benefit from his unique skills.
- **Objectives**:
  - Collect rare metals from the Junkyard
  - Obtain synthetic tissue from the Corporate District
  - Find experimental nanites in the Abandoned Lab
  - Return the materials to Zed
  - Undergo the experimental treatment (optional)
- **Rewards**:
  - Unique cybernetic enhancement
  - Discount on future treatments
  - Access to Zed's special inventory
- **Subtext**: Zed's methods are unorthodox, but his results are undeniable. Just don't ask where he learned his techniques.
- **Quotes**:
  - "Don't worry about the side effects. They're mostly temporary." - Zed
  - "I've never seen someone's body accept the implants so well!" - Zed

### Quest 5: Digital Detox
- **Category**: Location Quests
- **Difficulty**: 4
- **From**: Research Terminal
- **Location**: Floating Mansion Hidden Laboratory
- **Description**: You've discovered plans for a device that can purify digital corruption from A.S.P. systems. Creating this device could provide a powerful tool against A.S.P.'s influence.
- **Objectives**:
  - Download the research data
  - Collect the Quantum Purifier component
  - Obtain the Neural Stabilizer component
  - Assemble the A.S.P. Purification Device
  - Test the device in the laboratory
- **Rewards**:
  - A.S.P. Purification Device (Key Item)
  - Ability to temporarily disable A.S.P. drones
  - Knowledge about A.S.P.'s weaknesses
- **Subtext**: This technology seems to have been developed by someone who understood A.S.P.'s core programming.
- **Quotes**:
  - "This device could be our best chance against A.S.P.'s digital corruption." - Rex
  - "The creator must have known A.S.P. would eventually go rogue." - Jen

## How to Use in Events

### Adding a Quest to the Journal

To add a quest to the player's journal, use the following plugin command in an event:

```
Quest Add 1
```

Replace `1` with the ID of the quest you want to add.

### Updating Quest Objectives

To mark an objective as complete, use the following plugin command:

```
Quest SetObjective 1 2 complete
```

This marks objective 2 of quest 1 as complete. To mark it as incomplete, use:

```
Quest SetObjective 1 2 incomplete
```

### Completing a Quest

To mark a quest as completed, use:

```
Quest Complete 1
```

### Failing a Quest

If a quest can be failed, use:

```
Quest Fail 1
```

### Script Call Examples

You can also use script calls in conditional branches or script events:

```javascript
// Add a quest
$gameSystem.addQuest(1);

// Check if a quest is known
if ($gameSystem.isQuestKnown(1)) {
    // Do something
}

// Complete an objective
$gameSystem.setQuestObjective(1, 2, true);

// Check if an objective is complete
if ($gameSystem.isQuestObjectiveComplete(1, 2)) {
    // Do something
}

// Complete a quest
$gameSystem.completeQuest(1);

// Check if a quest is complete
if ($gameSystem.isQuestComplete(1)) {
    // Do something
}
```

## Integration with Existing Systems

### Integration with Switches and Variables

The quest journal system can work alongside the existing switch and variable-based quest tracking system. For example:

```javascript
// In an event where the player finds a necklace piece
// First, handle the existing quest tracking
$gameSwitches.setValue(11, true);  // Set the switch for finding the piece
$gameVariables.setValue(20, $gameVariables.value(20) + 1);  // Increment the piece counter

// Then, update the quest journal
if ($gameVariables.value(20) === 1) {
    $gameSystem.addQuest(1);  // Add the quest on first piece
    $gameSystem.setQuestObjective(1, 1, true);  // Complete first objective
} else if ($gameVariables.value(20) === 2) {
    $gameSystem.setQuestObjective(1, 2, true);  // Complete second objective
} else if ($gameVariables.value(20) === 3) {
    $gameSystem.setQuestObjective(1, 3, true);  // Complete third objective
} else if ($gameVariables.value(20) === 4) {
    $gameSystem.setQuestObjective(1, 4, true);  // Complete fourth objective
    $gameSystem.setQuestObjective(1, 5, true);  // Complete assembly objective
    $gameSystem.completeQuest(1);  // Mark the quest as complete
}
```

### Integration with Common Events

You can create common events for standard quest operations to ensure consistency:

- **Quest Start Common Event**: Handles standard procedures when starting a quest
- **Quest Objective Complete Common Event**: Handles standard procedures when completing an objective
- **Quest Complete Common Event**: Handles standard procedures when completing a quest

## Extension Plugins

While not currently installed, the following extension plugins could enhance the quest system:

1. **YEP_X_MoreQuests1-10**: Adds more quest slots (100 per plugin)
2. **YEP_X_MoreQuestInfo**: Adds more information fields to quests
3. **YEP_X_MapQuestWindow**: Shows active quests on the map
4. **YEP_X_QuestSys**: Adds a more advanced quest system with conditions

These plugins can be installed if the base quest system needs to be expanded in the future.
