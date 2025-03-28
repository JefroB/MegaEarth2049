# Generated Quest Lines for MegaEarth 2049

This document provides an overview of the new optional quest lines generated for MegaEarth 2049.

## Quest Lines Overview

1. **Wasteland Radio DJ**
   - Become a radio DJ and bring music and news to the wasteland while uncovering a conspiracy.
   - 5 side quests with unique rewards
   - Starting NPC: Old Mike in Abandoned Radio Station (Map028)

2. **Mutant Cooking Show**
   - Compete in and eventually host a popular cooking show that uses mutated ingredients from the wasteland.
   - 5 side quests with unique rewards
   - Starting NPC: Chef Radix in Wasteland Diner (Map019)

## Implementation Details

Each quest line includes:
- A unique starting NPC with custom dialogue
- 5 side quests with 5 objectives each
- Unique rewards for each quest and a final reward for completing the entire quest line
- Humorous elements consistent with the MegaEarth 2049 setting

## How to Add These Quest Lines to the Game

1. The quest lines are defined in individual files:
   - wastelandRadioDJ_quest.js
   - mutantCookingShow_quest.js

2. These are combined in the combined_quest_lines.js file.

3. To implement the quest lines in the game:
   ```
   node add_optional_quest_lines.js ./combined_quest_lines.js
   ```
   This will create the necessary event files in the temp_events directory.

4. Use the batch-edit-tool.js to add the events to the appropriate maps.

## Map Locations for New Quest Lines

When adding the quest events to maps, use the following locations:

1. **Wasteland Radio DJ**
   - Starting NPC: Abandoned Radio Station (Map028)
   - Recommended maps for objectives: Maps 28, 29, 30

2. **Mutant Cooking Show**
   - Starting NPC: Wasteland Diner (Map019)
   - Recommended maps for objectives: Maps 19, 20, 21

