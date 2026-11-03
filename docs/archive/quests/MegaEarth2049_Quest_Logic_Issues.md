> Historical document retained for provenance. Its commands, IDs and completion claims may be superseded. Use the current FAQs, roadmap and maintained tools for current behavior.

# MegaEarth2049 Quest Logic Issues

This document identifies and provides solutions for quest logic issues found in MegaEarth2049.

## 1. Jen Recruitment Quest

### Issues Identified

1. **Door Logic Issue**: The door event in Map056.json (outside Jen's house) was checking for item ID 8 (which doesn't exist) and setting Switch 9 to OFF when entering Jen's house.

2. **Missing Boss Event**: There is no boss event in Timbuc Cellar (Map015.json) that sets Switch 9 to ON after defeating the boss.

3. **Necklace Item Confusion**: There are multiple necklace pieces (item ID 10, 125-127) in the game, but the Jen recruitment quest requires "Jen's Necklace" (item ID 146).

### Solutions Implemented

1. **Door Logic Fix**: Modified Map056.json to check for Switch 9 instead of item ID 8, and removed the code that was setting Switch 9 to OFF.

2. **Boss Event Implementation**: Created a detailed guide (docs/archive/quests/Jen_Recruitment_Quest_Boss_Event.txt) for implementing the boss event in Timbuc Cellar (Map015.json) that sets Switch 9 to ON after defeating the boss.

3. **Quest Documentation**: Created comprehensive documentation (docs/archive/quests/Jen_Recruitment_Quest_Implementation_Summary.md) explaining the quest flow and implementation details.

## 2. Engine Quest

### Potential Issues

Based on the examination of Map016.json (Cellar Dweller's Room), the Engine Quest appears to be implemented correctly. The event (ID 2) in this map gives the player an Engine (item ID 27) after defeating the enemy.

However, there might be issues with the quest's integration with the YEP_QuestJournal plugin:

1. **Quest Journal Integration**: The Engine Quest may not be properly added to the quest journal.

2. **Objective Tracking**: The quest objectives may not be properly updated as the player progresses.

### Recommended Checks

1. Verify that the Engine Quest is properly defined in YEP_QuestJournal.js.

2. Check if there are plugin commands to add the quest and update objectives in the relevant events.

3. Ensure that the quest rewards are properly given upon completion.

## 3. Smelly Keys Quest

### Potential Issues

Based on the examination of Map015.json (Timbuc Cellar), there are events related to the Smelly Keys quest. Event 27 gives the player Smelly Key #1 (item ID 12).

Potential issues with this quest include:

1. **Door Logic**: The doors that require Smelly Keys may have incorrect item checks or switch logic.

2. **Key Distribution**: The locations of all Smelly Keys may not be properly implemented.

3. **Quest Journal Integration**: The Smelly Keys quest may not be properly added to the quest journal.

### Recommended Checks

1. Verify that all doors requiring Smelly Keys are checking for the correct item IDs.

2. Ensure that all Smelly Keys are obtainable in the game.

3. Check if the quest is properly defined in YEP_QuestJournal.js and if there are plugin commands to add the quest and update objectives.

## 4. General Quest System Issues

### Potential Issues

1. **Switch Consistency**: Switches may be used inconsistently across different quests, leading to conflicts.

2. **Item ID Conflicts**: Item IDs may be referenced incorrectly in events.

3. **Quest Journal Integration**: Quests may not be properly integrated with the YEP_QuestJournal plugin.

### Recommended Checks

1. Create a comprehensive list of all switches and their purposes to identify potential conflicts.

2. Verify that all item IDs referenced in events correspond to actual items in the game.

3. Ensure that all quests are properly defined in YEP_QuestJournal.js and that plugin commands are used consistently.

## 5. Recommended Testing Procedure

To identify and fix quest logic issues, follow this testing procedure:

1. **Start a New Game**: Begin a new game to ensure all switches and variables are in their default states.

2. **Follow Quest Paths**: Complete each quest from start to finish, noting any issues or inconsistencies.

3. **Check Quest Journal**: Verify that quests are properly added to the journal and that objectives are updated correctly.

4. **Test Edge Cases**: Try completing quest steps out of order or skipping optional steps to identify potential logic issues.

5. **Verify Rewards**: Ensure that quest rewards are properly given upon completion.

## 6. Conclusion

The Jen recruitment quest had significant logic issues that have been addressed. Other quests may have similar issues that should be identified and fixed to ensure a smooth gameplay experience.

By systematically checking each quest's implementation and testing them thoroughly, we can ensure that all quests in MegaEarth2049 function as intended and provide an engaging experience for players.
