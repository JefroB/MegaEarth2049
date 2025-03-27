# Instructions for Adding Level 34 and 35 Quests to MegaEarth 2049

This document provides step-by-step instructions for adding the level 34 and 35 quests to MegaEarth 2049 using the batch-edit-tool.js.

## Overview

We've created event files for the level 34 and 35 quests in the `temp_events` directory. These files need to be added to the appropriate maps using the batch-edit-tool.js.

## Event Files

The following event files have been created:

1. `level34_quest_giver.json`: The Frost Oracle NPC for the level 34 quest
2. `data_crystal1.json`: The first data crystal for the level 34 quest
3. `data_crystal2.json`: The second data crystal for the level 34 quest
4. `data_crystal3.json`: The third data crystal for the level 34 quest
5. `level35_quest_npc.json`: The Stranded Researcher NPC for the level 35 quest

## Adding Events to Maps

### Using the Batch Edit Tool

1. Run the batch-edit-tool.js:
   ```
   node batch-edit-tool.js
   ```

2. Select option 4 (Add event to multiple maps)

3. For each event file, follow these steps:
   - Enter the map file pattern (e.g., Map047 for the Snowy Village)
   - Enter the path to the event file (e.g., temp_events/level34_quest_giver.json)
   - Confirm the addition

### Map and Event Pairings

- **Map047.json (Snowy Village)**:
  - `temp_events/level34_quest_giver.json` (Frost Oracle)
  - `temp_events/data_crystal1.json` (Data Crystal 1)
  - `temp_events/data_crystal2.json` (Data Crystal 2)
  - `temp_events/data_crystal3.json` (Data Crystal 3)

- **Map103.json (Asteroid Belt)**:
  - `temp_events/level35_quest_npc.json` (Stranded Researcher)

## Alternative Method: Manual Editing

If the batch-edit-tool.js method doesn't work, you can manually edit the map files:

1. Open the map file (e.g., Map047.json) in a text editor
2. Find the "events" section
3. Add the content of the event file as a new event
4. Assign a unique ID to the event
5. Save the map file

## Quest Summary

For a detailed description of the quests, please refer to the `level34_35_quests_summary.md` file. This document provides information about:

- Quest objectives and progression
- NPC locations and dialogue
- Game variables and switches used
- Story integration

## Troubleshooting

If you encounter issues with the batch-edit-tool.js:

1. Make sure the map files (Map047.json and Map103.json) are valid JSON files
2. Check that the event files in the temp_events directory are accessible
3. Try restarting the batch-edit-tool.js
4. Consider using the manual editing method as a fallback

## Next Steps

After adding the events to the maps:

1. Test the quests in-game to ensure they work as expected
2. Make any necessary adjustments to NPC positions or dialogue
3. Ensure the quest progression flows smoothly from level 34 to level 35
