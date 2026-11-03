> Historical document retained for provenance. Its commands, IDs and completion claims may be superseded. Use the current FAQs, roadmap and maintained tools for current behavior.

# Zack's Bridge Repair Quest Implementation

This document provides detailed information about the implementation of the Zack's Bridge Repair quest in MegaEarth2049.

## 1. Quest Overview

The Zack's Bridge Repair quest is a character-related quest that involves helping Zack retrieve a stolen engine to repair the bridge to Timbuc 2. This quest is connected to the Smelly Keys quest and potentially leads to Zack joining the party.

## 2. Quest Details

- **Quest ID**: 8 (proposed for YEP_QuestJournal integration)
- **Category**: 4 (Character Quests)
- **Difficulty**: 2
- **From**: Zack
- **Location**: Zack's House and Timbuc Cellar
- **Description**: Zack's grandfather is sick and needs medicine from Timbuc 2, but the bridge is broken. Help Zack retrieve his stolen engine from a thief hiding in Timbuc Cellar so he can repair the bridge.
- **Objectives**:
  1. Find the thief in Timbuc Cellar
  2. Defeat the thief and retrieve the engine
  3. Return the engine to Zack
- **Rewards**:
  - Access to Timbuc 2
  - Zack potentially joins your party
  - Smelly Key #1 (obtained during quest)
- **Subtext**: Zack's grandfather is very ill and needs medicine from Timbuc 2. The bridge is the only way to get there.
- **Quotes**:
  - "My grandpa is SUPER sick, which sucks." - Zack
  - "I would just fix it myself but some asshole stole the engine out of my crane." - Zack

## 3. Implementation Details

### 3.1 Current Implementation

The quest is currently implemented in Map035 (Zack's House) but is not integrated with the YEP_QuestJournal plugin. The quest uses:

- **Switch 11**: Tracks if the quest is active
- **Switch 12**: Tracks if the quest is completed
- **Item ID 12**: Smelly Key #1, given to the player to help access Timbuc Cellar
- **Item ID 27**: The engine that needs to be retrieved
- **Variable 4**: Used to check if the player has the engine

### 3.2 Quest Flow

1. **Quest Initiation**: Talk to Zack in his house (Map035). He explains his grandfather is sick and needs medicine from Timbuc 2, but the bridge is broken because someone stole his engine.
2. **Accept Quest**: If the player accepts the quest, Switch 11 is turned ON and Zack gives the player Smelly Key #1.
3. **Find the Thief**: The player must go to Timbuc Cellar (Map015) and find the thief.
4. **Defeat the Thief**: After defeating the thief, the player obtains the engine (Item ID 27).
5. **Return to Zack**: When the player returns to Zack with the engine, he takes it and goes to fix the bridge.
6. **Quest Completion**: The scene transitions to the bridge (Map037), implying Zack has fixed it. Switch 12 is turned ON.

### 3.3 Connection to Smelly Keys Quest

This quest is connected to the Smelly Keys quest (Quest 3 in YEP_QuestJournal.js) as it provides the player with Smelly Key #1, which is one of the objectives in that quest.

## 4. YEP_QuestJournal Integration

To integrate this quest with the YEP_QuestJournal plugin, the following changes are needed:

### 4.1 Add Quest to YEP_QuestJournal.js

Add the following quest entry to the QuestData section in YEP_QuestJournal.js:

```
Quest 8: Bridge to Timbuc 2
Category: 4
Difficulty: 2
From: Zack
Location: Zack's House and Timbuc Cellar
Description: Zack's grandfather is sick and needs medicine from Timbuc 2, but the bridge is broken. Help Zack retrieve his stolen engine from a thief hiding in Timbuc Cellar so he can repair the bridge.
Objectives:
- Find the thief in Timbuc Cellar
- Defeat the thief and retrieve the engine
- Return the engine to Zack
Rewards:
- Access to Timbuc 2
- Zack potentially joins your party
- Smelly Key #1 (obtained during quest)
Subtext: Zack's grandfather is very ill and needs medicine from Timbuc 2. The bridge is the only way to get there.
Quotes:
- "My grandpa is SUPER sick, which sucks." - Zack
- "I would just fix it myself but some asshole stole the engine out of my crane." - Zack
```

### 4.2 Add Plugin Commands to Map035 (Zack's House)

Add the following plugin commands to the event in Map035:

When the player accepts the quest:
```
Plugin Command: Quest Add 8
Plugin Command: Quest SetObjective 8 1 complete
```

When the player returns with the engine:
```
Plugin Command: Quest SetObjective 8 3 complete
Plugin Command: Quest Complete 8
```

### 4.3 Add Plugin Commands to Map015 (Timbuc Cellar)

Add the following plugin commands to the thief event in Map015:

When the player defeats the thief:
```
Plugin Command: Quest SetObjective 8 2 complete
```

## 5. Engine Component Quest Connection

There is also an event in Zack's House for obtaining Engine Component C (Item ID 131), which appears to be part of the Engine Quest (Quest 2 in YEP_QuestJournal.js). This suggests a connection between Zack's quest and the Engine Quest.

To fully integrate this connection, the following plugin commands should be added to the Engine Component C event:

```
Plugin Command: Quest SetObjective 2 4 complete
```

## 6. Implementation Guide

To fully implement this quest in the YEP_QuestJournal system:

1. Add the quest to YEP_QuestJournal.js as Quest 8
2. Update the event in Map035 (Zack's House) to include the plugin commands
3. Update the thief event in Map015 (Timbuc Cellar) to include the plugin commands
4. Update the Engine Component C event to connect with the Engine Quest

## 7. Testing

To test the quest implementation:
1. Talk to Zack in his house and accept the quest
2. Verify the quest appears in the journal
3. Go to Timbuc Cellar and defeat the thief
4. Verify the second objective is marked as complete
5. Return to Zack with the engine
6. Verify the quest is marked as complete and the bridge to Timbuc 2 is accessible

## 8. Notes

- The quest currently doesn't explicitly show Zack joining the party, but the event structure suggests this might be intended
- The connection between this quest and the Smelly Keys quest should be maintained
- The Engine Component C event suggests a connection to the larger Engine Quest storyline
