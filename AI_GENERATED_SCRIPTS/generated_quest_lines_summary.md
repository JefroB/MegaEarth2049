# Generated Quest Lines for MegaEarth 2049

This document provides an overview of the new optional quest lines generated for MegaEarth 2049.

## Quest Lines Overview

1. **Drone Swarm Commander**
   - Master the art of controlling a swarm of combat and utility drones while uncovering a conspiracy involving autonomous weapons.
   - 5 side quests with unique rewards
   - Starting NPC: Hive Mind in Drone Pit (Map053)

2. **Memory Merchant**
   - Enter the dangerous world of memory trading, where experiences and skills can be bought, sold, and stolen.
   - 5 side quests with unique rewards
   - Starting NPC: Mnemosyne in Memory Den (Map047)

3. **Synthetic Emotions**
   - Investigate a new drug that allows people to experience artificial emotions, and the corporation that's using it for social control.
   - 5 side quests with unique rewards
   - Starting NPC: Dr. Feelgood in Underground Clinic (Map039)

4. **Cybernetic Enhancement**
   - (Previously added quest line)
   - 1 side quests with unique rewards

5. **Virtual Reality Addiction**
   - (Previously added quest line)
   - 1 side quests with unique rewards

6. **Neon Street Racing**
   - (Previously added quest line)
   - 1 side quests with unique rewards

7. **Wasteland Radio DJ**
   - (Previously added quest line)
   - 1 side quests with unique rewards

8. **Mutant Cooking Show**
   - (Previously added quest line)
   - 1 side quests with unique rewards

## Implementation Details

Each quest line includes:
- A unique starting NPC with custom dialogue
- 5 side quests with 5 objectives each
- Unique rewards for each quest and a final reward for completing the entire quest line
- Humorous elements consistent with the MegaEarth 2049 setting

## How to Add These Quest Lines to the Game

1. The quest lines are defined in individual files:
   - droneSwarmCommander_quest.js
   - memoryMerchant_quest.js
   - syntheticEmotions_quest.js

2. These are combined in the combined_quest_lines.js file.

3. To implement the quest lines in the game:
   ```
   node add_optional_quest_lines.js ./combined_quest_lines.js
   ```
   This will create the necessary event files in the temp_events directory.

4. Use the batch-edit-tool.js to add the events to the appropriate maps.

## Map Locations for New Quest Lines

When adding the quest events to maps, use the following locations:

1. **Drone Swarm Commander**
   - Starting NPC: Drone Pit (Map053)
   - Recommended maps for objectives: Maps 53, 54, 55

2. **Memory Merchant**
   - Starting NPC: Memory Den (Map047)
   - Recommended maps for objectives: Maps 47, 48, 49

3. **Synthetic Emotions**
   - Starting NPC: Underground Clinic (Map039)
   - Recommended maps for objectives: Maps 39, 40, 41

4. **Cybernetic Enhancement**

5. **Virtual Reality Addiction**

6. **Neon Street Racing**

7. **Wasteland Radio DJ**

8. **Mutant Cooking Show**

