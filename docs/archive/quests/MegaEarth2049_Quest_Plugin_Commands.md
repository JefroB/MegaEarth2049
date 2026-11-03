> Historical document retained for provenance. Its commands, IDs and completion claims may be superseded. Use the current FAQs, roadmap and maintained tools for current behavior.

# MegaEarth2049 Quest Plugin Commands

This document provides a comprehensive reference for all plugin commands available in the YEP_QuestJournal plugin. These commands are essential for implementing and managing quests in MegaEarth2049.

## Basic Quest Commands

### Adding Quests

```
Quest Add [ID]
```

- **Purpose**: Adds a quest to the player's journal
- **Parameters**:
  - `[ID]`: The ID of the quest to add (must match an ID in YEP_QuestJournal.js)
- **Example**: `Quest Add 6` (adds Jen's Lost Necklace quest)
- **Notes**:
  - This command makes the quest visible in the journal
  - The quest status will be set to "active"
  - All objectives will be set to "known" but not "active"

### Removing Quests

```
Quest Remove [ID]
```

- **Purpose**: Removes a quest from the player's journal
- **Parameters**:
  - `[ID]`: The ID of the quest to remove
- **Example**: `Quest Remove 6` (removes Jen's Lost Necklace quest)
- **Notes**:
  - This completely removes the quest from the journal
  - Use this sparingly, as it's usually better to mark quests as completed or failed

### Completing Quests

```
Quest Complete [ID]
```

- **Purpose**: Marks a quest as completed in the journal
- **Parameters**:
  - `[ID]`: The ID of the quest to complete
- **Example**: `Quest Complete 6` (completes Jen's Lost Necklace quest)
- **Notes**:
  - This automatically marks all objectives as completed
  - The quest will be moved to the "completed" section of the journal

### Failing Quests

```
Quest Fail [ID]
```

- **Purpose**: Marks a quest as failed in the journal
- **Parameters**:
  - `[ID]`: The ID of the quest to fail
- **Example**: `Quest Fail 6` (fails Jen's Lost Necklace quest)
- **Notes**:
  - The quest will be moved to the "failed" section of the journal
  - Use this for quests that can be failed due to player actions or time limits

## Objective Commands

### Updating Objectives

```
Quest Update [ID] [Objective] [Status]
```

- **Purpose**: Updates the status of a specific objective
- **Parameters**:
  - `[ID]`: The ID of the quest
  - `[Objective]`: The number of the objective (1-based)
  - `[Status]`: The new status for the objective (Active, Completed, Failed, Hidden)
- **Example**: `Quest Update 6 1 Completed` (marks the first objective of Jen's quest as completed)
- **Notes**:
  - Objectives are numbered starting from 1
  - Available statuses are:
    - `Active`: The objective is currently active
    - `Completed`: The objective has been completed
    - `Failed`: The objective has failed
    - `Hidden`: The objective is hidden from the player

### Setting All Objectives

```
Quest Objectives [ID] [Status]
```

- **Purpose**: Sets all objectives of a quest to a specific status
- **Parameters**:
  - `[ID]`: The ID of the quest
  - `[Status]`: The status to set for all objectives (Active, Completed, Failed, Hidden)
- **Example**: `Quest Objectives 6 Active` (sets all objectives of Jen's quest to active)
- **Notes**:
  - This affects all objectives for the specified quest
  - Useful for activating all objectives at once

## Description Commands

### Changing Quest Description

```
Quest Description [ID] [Text]
```

- **Purpose**: Changes the description of a quest
- **Parameters**:
  - `[ID]`: The ID of the quest
  - `[Text]`: The new description text
- **Example**: `Quest Description 6 Find Jen's necklace to recruit her to your party.`
- **Notes**:
  - This overwrites the description defined in YEP_QuestJournal.js
  - Useful for updating quest descriptions based on player progress

### Changing Objective Text

```
Quest Objective [ID] [Objective] [Text]
```

- **Purpose**: Changes the text of a specific objective
- **Parameters**:
  - `[ID]`: The ID of the quest
  - `[Objective]`: The number of the objective (1-based)
  - `[Text]`: The new objective text
- **Example**: `Quest Objective 6 1 Find Jen's Necklace in the northern part of Timbuc Cellar.`
- **Notes**:
  - This overwrites the objective text defined in YEP_QuestJournal.js
  - Useful for providing more specific guidance as the player progresses

## Visibility Commands

### Showing/Hiding Quests

```
Quest Show [ID]
Quest Hide [ID]
```

- **Purpose**: Shows or hides a quest in the journal
- **Parameters**:
  - `[ID]`: The ID of the quest to show or hide
- **Example**: `Quest Hide 6` (hides Jen's Lost Necklace quest)
- **Notes**:
  - Hidden quests still exist but are not visible in the journal
  - Useful for temporarily hiding quests that will become relevant later

### Showing/Hiding Objectives

```
Quest Show Objective [ID] [Objective]
Quest Hide Objective [ID] [Objective]
```

- **Purpose**: Shows or hides a specific objective
- **Parameters**:
  - `[ID]`: The ID of the quest
  - `[Objective]`: The number of the objective (1-based)
- **Example**: `Quest Hide Objective 6 3` (hides the third objective of Jen's quest)
- **Notes**:
  - Hidden objectives still exist but are not visible in the journal
  - Useful for objectives that should be revealed later in the quest

## Reward Commands

### Adding Rewards

```
Quest Reward [ID] [Text]
```

- **Purpose**: Adds a reward to a quest
- **Parameters**:
  - `[ID]`: The ID of the quest
  - `[Text]`: The text describing the reward
- **Example**: `Quest Reward 6 500 EXP`
- **Notes**:
  - This adds a new reward to the existing rewards
  - Does not replace existing rewards

### Changing Rewards

```
Quest Change Reward [ID] [Reward] [Text]
```

- **Purpose**: Changes the text of a specific reward
- **Parameters**:
  - `[ID]`: The ID of the quest
  - `[Reward]`: The number of the reward (1-based)
  - `[Text]`: The new reward text
- **Example**: `Quest Change Reward 6 1 Jen joins your party with enhanced healing abilities.`
- **Notes**:
  - This overwrites the reward text defined in YEP_QuestJournal.js
  - Useful for updating rewards based on player choices or progress

## Subtext Commands

### Adding Subtext

```
Quest Subtext [ID] [Text]
```

- **Purpose**: Adds subtext to a quest
- **Parameters**:
  - `[ID]`: The ID of the quest
  - `[Text]`: The subtext to add
- **Example**: `Quest Subtext 6 The necklace appears to be guarded by a powerful creature.`
- **Notes**:
  - This adds a new subtext entry to the existing subtext
  - Subtext provides additional context or hints for the quest

### Changing Subtext

```
Quest Change Subtext [ID] [Subtext] [Text]
```

- **Purpose**: Changes the text of a specific subtext entry
- **Parameters**:
  - `[ID]`: The ID of the quest
  - `[Subtext]`: The number of the subtext entry (1-based)
  - `[Text]`: The new subtext
- **Example**: `Quest Change Subtext 6 1 The Trash Octopus in the northern part of Timbuc Cellar has Jen's necklace.`
- **Notes**:
  - This overwrites the subtext defined in YEP_QuestJournal.js
  - Useful for providing more specific hints as the player progresses

## Category Commands

### Changing Quest Category

```
Quest Category [ID] [Category]
```

- **Purpose**: Changes the category of a quest
- **Parameters**:
  - `[ID]`: The ID of the quest
  - `[Category]`: The new category (1-10)
- **Example**: `Quest Category 6 3` (changes Jen's quest to category 3 - Character Quest)
- **Notes**:
  - Categories are defined as follows:
    1. Main Quest
    2. Side Quest
    3. Character Quest
    4. Item Quest
    5. Exploration Quest
    6. Challenge Quest
    7. Crafting Quest
    8. Delivery Quest
    9. Escort Quest
    10. Special Quest

### Changing Quest Difficulty

```
Quest Difficulty [ID] [Difficulty]
```

- **Purpose**: Changes the difficulty of a quest
- **Parameters**:
  - `[ID]`: The ID of the quest
  - `[Difficulty]`: The new difficulty (1-10)
- **Example**: `Quest Difficulty 6 3` (sets Jen's quest to difficulty 3)
- **Notes**:
  - Difficulty is a number from 1 (easiest) to 10 (hardest)
  - This is purely informational and does not affect gameplay

## Advanced Commands

### Quest Variables

```
Quest Variable [ID] [Variable] [Value]
```

- **Purpose**: Sets a variable for a specific quest
- **Parameters**:
  - `[ID]`: The ID of the quest
  - `[Variable]`: The name of the variable
  - `[Value]`: The value to set
- **Example**: `Quest Variable 6 necklace_pieces 3`
- **Notes**:
  - Quest variables are stored with the quest and can be used for tracking quest-specific data
  - These variables are not the same as RPG Maker variables

### Quest Switches

```
Quest Switch [ID] [Switch] [Value]
```

- **Purpose**: Sets a switch for a specific quest
- **Parameters**:
  - `[ID]`: The ID of the quest
  - `[Switch]`: The name of the switch
  - `[Value]`: The value to set (true or false)
- **Example**: `Quest Switch 6 boss_defeated true`
- **Notes**:
  - Quest switches are stored with the quest and can be used for tracking quest-specific flags
  - These switches are not the same as RPG Maker switches

## Best Practices

1. **Quest Addition**:
   - Always use `Quest Add [ID]` when a quest becomes available to the player
   - This should typically happen when the player accepts the quest from an NPC

2. **Objective Updates**:
   - Use `Quest Update [ID] [Objective] Active` to activate objectives as they become relevant
   - Use `Quest Update [ID] [Objective] Completed` when the player completes an objective
   - Use `Quest Update [ID] [Objective] Failed` if an objective can no longer be completed

3. **Quest Completion**:
   - Use `Quest Complete [ID]` when all objectives are completed and the quest is finished
   - This should typically happen when the player returns to the quest giver or reaches the final objective

4. **Progressive Revelation**:
   - Start with only the first objective active
   - Activate subsequent objectives as the player progresses
   - This helps guide the player through the quest without overwhelming them

5. **Descriptive Updates**:
   - Use `Quest Subtext [ID] [Text]` to provide hints or additional context as the player progresses
   - This can help guide players who are stuck or provide narrative enrichment

6. **Testing**:
   - Test all plugin commands in-game to ensure they work as expected
   - Check the quest journal after each command to verify the changes

## Example Quest Implementation

Here's an example of how to implement Jen's Lost Necklace quest using plugin commands:

1. **When the player defeats the Trash Octopus boss**:
   ```
   Quest Add 6
   Quest Update 6 1 Completed
   Quest Update 6 2 Active
   Quest Subtext 6 You found Jen's Necklace among the debris left by the Trash Octopus.
   ```

2. **When the player returns the necklace to Jen**:
   ```
   Quest Update 6 2 Completed
   Quest Update 6 3 Active
   Quest Subtext 6 Jen is grateful for the return of her necklace and has agreed to join your party.
   ```

3. **When Jen joins the party**:
   ```
   Quest Update 6 3 Completed
   Quest Complete 6
   ```

By following these guidelines and using the plugin commands correctly, you can create rich, interactive quests that guide players through the game world and provide a satisfying experience.
