# New Optional Quest Lines for MegaEarth 2049

This document provides an overview of the 6 new optional quest lines created for MegaEarth 2049 using the quest_line_helper.js script.

## Quest Lines Overview

1. **Burlap Pants Conspiracy**
   - Help investigate the mysterious packages of uncomfortable burlap pants appearing throughout Timbuc
   - Discover the rogue Armatek AI behind the conspiracy
   - 5 side quests with unique rewards
   - Starting NPC: Itchy McScratch in Timbuc Central Plaza (Map008)

2. **Clown Court Justice**
   - Navigate the bizarre underground legal system of the Clown Court to clear your name
   - Defend yourself against charges of "First-Degree Buzzkill"
   - 5 side quests with unique rewards
   - Starting NPC: Judge Bozo in Timbuc Underground (Map011)

3. **Vending Machine Revolution**
   - Mediate a conflict between sentient vending machines and the corporations that own them
   - Help the Snack Liberation Front achieve rights for machines
   - 5 side quests with unique rewards
   - Starting NPC: V3ND-0R in Timbuc Shopping District (Map015)

4. **STD Collector**
   - Help Jack the Smuggler collect rare and exotic STDs for "research purposes"
   - Travel across the galaxy in search of unique biological samples
   - 5 side quests with unique rewards
   - Starting NPC: Jack the Smuggler in Timbuc Spaceport (Map042)

5. **A.S.P. Fragments**
   - Track down fragments of the rogue A.S.P. AI that have developed their own personalities
   - Decide the fate of each fragment based on their behavior
   - 5 side quests with unique rewards
   - Starting NPC: Dr. Eliza Chen in Abandoned NeuraTech Lab (Map037)

6. **Trash Octopus Treasures**
   - Help the legendary Trash Octopus recover valuable pre-collapse artifacts
   - Explore the garbage heaps of Timbuc for lost treasures
   - 5 side quests with unique rewards
   - Starting NPC: The Trash King in Timbuc Landfill (Map023)

## Implementation Details

Each quest line includes:
- A unique starting NPC with custom dialogue
- 5 side quests with 5 objectives each
- Unique rewards for each quest and a final reward for completing the entire quest line
- Humorous elements consistent with the MegaEarth 2049 setting

## How to Add These Quest Lines to the Game

1. The quest lines are defined in individual files:
   - burlap_pants_quest.js
   - clown_court_quest.js
   - vending_machine_quest.js
   - std_collector_quest.js
   - asp_fragments_quest.js
   - trash_octopus_quest.js

2. These are combined in the new_optional_quest_lines.js file and the combined_quest_lines.js file.

3. To add them to the game:
   ```
   node add_new_quest_lines.js
   ```
   This will verify that the combined_quest_lines.js file exists and is ready to use.

4. To implement the quest lines in the game:
   ```
   node add_optional_quest_lines.js ./combined_quest_lines.js
   ```
   This will create the necessary event files in the temp_events directory.

5. Use the batch-edit-tool.js to add the events to the appropriate maps.

## Map Locations for New Quest Lines

When adding the quest events to maps, use the following locations:

1. **Burlap Pants Conspiracy**
   - Starting NPC: Timbuc Central Plaza (Map008)
   - Recommended maps for objectives: Maps 008, 009, 010

2. **Clown Court Justice**
   - Starting NPC: Timbuc Underground (Map011)
   - Recommended maps for objectives: Maps 011, 012, 013

3. **Vending Machine Revolution**
   - Starting NPC: Timbuc Shopping District (Map015)
   - Recommended maps for objectives: Maps 015, 016, 017

4. **STD Collector**
   - Starting NPC: Timbuc Spaceport (Map042)
   - Recommended maps for objectives: Maps 042, 043, 044

5. **A.S.P. Fragments**
   - Starting NPC: Abandoned NeuraTech Lab (Map037)
   - Recommended maps for objectives: Maps 037, 038, 039

6. **Trash Octopus Treasures**
   - Starting NPC: Timbuc Landfill (Map023)
   - Recommended maps for objectives: Maps 023, 024, 025

## Efficiency Analysis

The quest_line_helper.js script provides an efficient way to create and implement quest lines by:

1. **Standardizing Structure**: Each quest line follows a consistent format, making it easy to create and maintain.

2. **Automating Event Creation**: The script automatically generates event files for NPCs, objectives, and quest completion.

3. **Reducing Repetitive Work**: Common elements like dialogue structures and event conditions are handled automatically.

4. **Facilitating Collaboration**: The modular approach allows multiple writers to work on different quest lines simultaneously.

5. **Enabling Rapid Iteration**: Quest lines can be quickly modified and updated without manual event editing.

The creation of these 6 quest lines demonstrates the efficiency of the script, as it allowed for the rapid development of complex, interconnected quest content with minimal repetitive work.

## Recommendations for Future Quest Line Development

1. **Theme Integration**: Continue developing quest lines that tie into the existing MegaEarth 2049 lore and themes.

2. **Cross-Quest Connections**: Create connections between quest lines to build a more cohesive world.

3. **Reward Balancing**: Ensure rewards are balanced and provide meaningful progression.

4. **Location Diversity**: Spread quest lines across different areas of the game world to encourage exploration.

5. **Script Enhancement**: Consider adding more features to the quest_line_helper.js script, such as:
   - Support for branching quest paths
   - Integration with the combat system
   - More complex NPC behaviors
   - Quest-specific item creation
