> Historical document retained for provenance. Its commands, IDs and completion claims may be superseded. Use the current FAQs, roadmap and maintained tools for current behavior.

# MegaEarth2049 Undocumented Quests Summary

This document provides a comprehensive summary of all undocumented quests discovered in MegaEarth2049. These quests exist in the game code but lack proper documentation, which can lead to logic issues, conflicts, and bugs.

## Identified Undocumented Quests

### 1. Jen's Recruitment Quest

**Status**: Partially documented, implementation issues

**Description**: A character recruitment quest where the player must find Jen's Necklace and return it to her to recruit her as a party member.

**Implementation Issues**:
- Missing boss event in Timbuc Cellar (Map015.json) that should set Switch 9 to ON
- Confusion between necklace pieces (item ID 10) and Jen's Necklace (item ID 146)
- Unclear relationship between Switch 7 (necklace pieces) and Switch 9 (Jen's quest)

**Affected Files**:
- Map015.json (Timbuc Cellar) - Missing boss event
- Map056.json (Jen's House) - Door event checks for Switch 9
- Map057.json (Inside Jen's House) - Recruitment event requires Switch 9

**Required Fixes**:
- Add Trash Octopus boss event to Map015.json
- Set Switch 9 to ON after defeating the boss
- Give the player Jen's Necklace (item ID 146)
- Add appropriate quest journal plugin commands

### 2. Smelly Keys Quest

**Status**: Undocumented, implementation appears complete

**Description**: A quest where the player collects various "smelly keys" to unlock doors throughout Timbuc Cellar.

**Implementation Details**:
- Event 27 in Map015.json gives the player "Smelly key #1" (item ID 12)
- Events 12-16 and 21, 26 in Map015.json are doors that require specific key items (IDs 28-33)
- Each door leads to a different map (Maps 16-21, 32)

**Affected Files**:
- Map015.json (Timbuc Cellar) - Key and door events

**Required Documentation**:
- Quest objectives and flow
- Key item locations
- Door locations and destinations
- Integration with YEP_QuestJournal plugin

### 3. Engine Blueprint Quest

**Status**: Undocumented, implementation appears complete

**Description**: A quest where an Armatek engineer gives the player an Engine Blueprint (item ID 128) and tasks them with finding three components.

**Implementation Details**:
- Events 28-29 in Map015.json involve an Armatek engineer
- The player receives an Engine Blueprint (item ID 128)
- The player must find three components:
  1. One at the construction site
  2. One from a malfunctioning A.S.P. drone
  3. One from the Armatek office

**Affected Files**:
- Map015.json (Timbuc Cellar) - Engineer events

**Required Documentation**:
- Quest objectives and flow
- Component locations
- Rewards for completing the quest
- Integration with YEP_QuestJournal plugin

### 4. Necklace Pieces Collection

**Status**: Undocumented, relationship to Jen's quest unclear

**Description**: A collection quest where the player finds necklace pieces throughout Timbuc Cellar.

**Implementation Details**:
- Events 22-25 in Map015.json are "Necklace piece" events
- They give the player necklace pieces (item ID 10)
- They are conditional on Switch 7 being ON
- It's unclear if this is related to Jen's quest or a separate collectible

**Affected Files**:
- Map015.json (Timbuc Cellar) - Necklace piece events

**Required Documentation**:
- Clarify relationship to Jen's quest
- Document purpose of collecting necklace pieces
- Document rewards for completing the collection
- Integration with YEP_QuestJournal plugin

## Recommendations

1. **Document All Quests**:
   - Create detailed documentation for each undocumented quest
   - Include objectives, flow, rewards, and implementation details

2. **Fix Implementation Issues**:
   - Address the missing boss event in Jen's recruitment quest
   - Clarify the relationship between necklace pieces and Jen's Necklace

3. **Standardize Quest Implementation**:
   - Use consistent switch and item ID ranges for different quest types
   - Follow naming conventions for switches, variables, and items
   - Use self switches for event-specific state whenever possible

4. **Integrate with Quest Journal**:
   - Add appropriate plugin commands to all quest events
   - Ensure all quests appear in the journal with clear objectives
   - Update quest status correctly as the player progresses

5. **Create Quest Testing Protocol**:
   - Develop a testing protocol for all quests
   - Test quest flow from start to finish
   - Test edge cases and potential conflicts with other quests

## Next Steps

1. Implement the Trash Octopus boss event for Jen's recruitment quest
2. Document the Smelly Keys quest in detail
3. Document the Engine Blueprint quest in detail
4. Clarify the relationship between necklace pieces and Jen's quest
5. Update the YEP_QuestJournal.js file to include all undocumented quests
6. Create a comprehensive quest testing protocol
