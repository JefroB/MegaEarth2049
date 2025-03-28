# MegaEarth 2049 Quest Lines Summary

This document provides an overview of all the quest lines available in MegaEarth 2049.

## Quest Lines Overview

1. **Wasteland Radio DJ**
   - Become a radio DJ, bringing music and news to the wasteland while uncovering a conspiracy.
   - 5 side quests with unique rewards
   - Starting NPC: Old Mike in Abandoned Radio Station (Map028)

2. **Mutant Cooking Show**
   - Compete in and eventually host a cooking show that uses mutated ingredients from the wasteland.
   - 5 side quests with unique rewards
   - Starting NPC: Chef Radix in Wasteland Diner (Map019)

3. **Cybernetic Enhancement**
   - Upgrade your body with experimental cybernetics while dealing with unexpected side effects.
   - 5 side quests with unique rewards
   - Starting NPC: Dr. Splice in Back Alley Clinic (Map014)

4. **Virtual Reality Addiction**
   - Help people trapped in addictive virtual reality simulations while being tempted by the allure of digital paradise yourself.
   - 5 side quests with unique rewards
   - Starting NPC: Iris Disconnect in Mindscape Clinic (Map031)

5. **Neon Street Racing**
   - Rise through the ranks of an underground street racing circuit where the vehicles are as modified as the drivers.
   - 5 side quests with unique rewards
   - Starting NPC: Velocity in Neon Garage (Map042)

6. **Drone Swarm Commander**
   - Master the art of controlling a swarm of combat and utility drones while uncovering a conspiracy involving autonomous weapons.
   - 5 side quests with unique rewards
   - Starting NPC: Hive Mind in Drone Pit (Map053)

7. **Memory Merchant**
   - Enter the dangerous world of memory trading, where experiences and skills can be bought, sold, and stolen.
   - 5 side quests with unique rewards
   - Starting NPC: Mnemosyne in Memory Den (Map047)

8. **Synthetic Emotions**
   - Investigate a new drug that allows people to experience artificial emotions, and the corporation that's using it for social control.
   - 5 side quests with unique rewards
   - Starting NPC: Dr. Feelgood in Underground Clinic (Map039)

9. **Digital Graffiti**
   - Join a group of artistic hackers who use augmented reality to create subversive art installations throughout the city.
   - 5 side quests with unique rewards
   - Starting NPC: Pixel in Abandoned Gallery (Map061)

10. **Synthetic Pets**
    - Investigate a new line of robotic pets that are developing unexpected behaviors and possibly consciousness.
    - 5 side quests with unique rewards
    - Starting NPC: Dr. Whiskers in Pet Repair Shop (Map044)

11. **Holographic Nightclub**
    - Become involved with an underground nightclub where reality is enhanced by holographic technology and the line between real and virtual patrons blurs.
    - 5 side quests with unique rewards
    - Starting NPC: Mirage in Abandoned Warehouse (Map056)

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
   - cyberneticEnhancement_quest.js
   - virtualRealityAddiction_quest.js
   - neonStreetRacing_quest.js
   - droneSwarmCommander_quest.js
   - memoryMerchant_quest.js
   - syntheticEmotions_quest.js
   - digitalGraffiti_quest.js
   - syntheticPets_quest.js
   - holographicNightclub_quest.js

2. These are combined in the combined_quest_lines.js file.

3. To implement the quest lines in the game:
   ```
   node add_optional_quest_lines.js ./combined_quest_lines.js
   ```
   This will create the necessary event files in the temp_events directory.

4. Use the batch-edit-tool.js to add the events to the appropriate maps.

## Map Locations for Quest Lines

When adding the quest events to maps, use the following locations:

1. **Wasteland Radio DJ**
   - Starting NPC: Abandoned Radio Station (Map028)
   - Recommended maps for objectives: Maps 028, 029, 030

2. **Mutant Cooking Show**
   - Starting NPC: Wasteland Diner (Map019)
   - Recommended maps for objectives: Maps 019, 020, 021

3. **Cybernetic Enhancement**
   - Starting NPC: Back Alley Clinic (Map014)
   - Recommended maps for objectives: Maps 014, 015, 016

4. **Virtual Reality Addiction**
   - Starting NPC: Mindscape Clinic (Map031)
   - Recommended maps for objectives: Maps 031, 032, 033

5. **Neon Street Racing**
   - Starting NPC: Neon Garage (Map042)
   - Recommended maps for objectives: Maps 042, 043, 044

6. **Drone Swarm Commander**
   - Starting NPC: Drone Pit (Map053)
   - Recommended maps for objectives: Maps 053, 054, 055

7. **Memory Merchant**
   - Starting NPC: Memory Den (Map047)
   - Recommended maps for objectives: Maps 047, 048, 049

8. **Synthetic Emotions**
   - Starting NPC: Underground Clinic (Map039)
   - Recommended maps for objectives: Maps 039, 040, 041

9. **Digital Graffiti**
   - Starting NPC: Abandoned Gallery (Map061)
   - Recommended maps for objectives: Maps 061, 062, 063

10. **Synthetic Pets**
    - Starting NPC: Pet Repair Shop (Map044)
    - Recommended maps for objectives: Maps 044, 045, 046

11. **Holographic Nightclub**
    - Starting NPC: Abandoned Warehouse (Map056)
    - Recommended maps for objectives: Maps 056, 057, 058
