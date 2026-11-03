> Historical document retained for provenance. Its commands, IDs and completion claims may be superseded. Use the current FAQs, roadmap and maintained tools for current behavior.

# MegaEarth2049 Timbuc Cellar Quest Analysis

This document provides a comprehensive analysis of the quest system in Timbuc Cellar (Map015.json). Timbuc Cellar appears to be a hub for several quests in MegaEarth2049, but many of these quests are undocumented or have implementation issues.

## Map Overview

Timbuc Cellar (Map015.json) is a dungeon area that contains multiple quest-related events:

- **Necklace Pieces Collection** (Events 22-25)
- **Smelly Keys Quest** (Events 12-16, 21, 26, 27)
- **Engine Blueprint Quest** (Events 28-29)
- **Missing Trash Octopus Boss** (Not implemented, should be added)

The map also contains several doors that lead to other areas, most of which are locked and require specific keys to open.

## Quest Analysis

### 1. Jen's Recruitment Quest

**Status**: Partially implemented, missing critical event

**Related Events**:
- None currently in Map015.json (Trash Octopus boss event is missing)
- Events in Map056.json and Map057.json check for Switch 9, which should be set by the boss event

**Implementation Issues**:
- The Trash Octopus boss event that should give the player Jen's Necklace (item ID 146) and set Switch 9 to ON is missing from Map015.json
- Without this event, players cannot obtain Jen's Necklace or set Switch 9 to ON, making it impossible to complete the quest

**Required Fixes**:
- Add a new event in Map015.json at coordinates (65, 43) for the Trash Octopus boss
- The event should set Switch 9 to ON and give the player Jen's Necklace (item ID 146) when defeated
- Add appropriate plugin commands to update the quest journal

**Recommended Implementation**:
```
@>Conditional Branch: Self Switch A is OFF
    @>Show Text: \C[4]A large, mutated octopus appears to be guarding something shiny.\C[0]
    @>Show Choices: [Fight][Run away]
        @>When [Fight]
            @>Battle Processing: Troop 10 (Trash Octopus), Can Escape = OFF, Can Lose = OFF
            @>If Win
                @>Show Text: You defeated the Trash Octopus!
                @>Show Text: You found Jen's Necklace among the debris!
                @>Change Items: Jen's Necklace (ID: 146) + 1
                @>Control Switches: #9 (Jen's Quest) = ON
                @>Plugin Command: Quest Add 6
                @>Plugin Command: Quest Update 6 1 Completed
                @>Plugin Command: Quest Update 6 2 Active
                @>Self Switch A = ON
            @>End
        @>When [Run away]
            @>Show Text: You decide to leave the octopus alone for now.
        @>Branch End
@>Else
    @>Show Text: The defeated octopus lies motionless in the murky water.
@>End
```

### 2. Necklace Pieces Collection

**Status**: Implemented but undocumented

**Related Events**:
- Event 22: Necklace Piece 1
- Event 23: Necklace Piece 2
- Event 24: Necklace Piece 3
- Event 25: Necklace Piece 4

**Implementation Details**:
- These events give the player necklace pieces (item ID 10)
- They are conditional on Switch 7 being ON
- It's unclear if this is related to Jen's quest or a separate collectible

**Potential Issues**:
- Confusion between necklace pieces (item ID 10) and Jen's Necklace (item ID 146)
- Unclear relationship between Switch 7 (necklace pieces) and Switch 9 (Jen's quest)

**Recommended Fixes**:
- Clarify the relationship between necklace pieces and Jen's Necklace
- Document the purpose of collecting necklace pieces
- Add quest journal integration if this is intended to be a separate quest

### 3. Smelly Keys Quest

**Status**: Implemented but undocumented

**Related Events**:
- Event 27: Gives the player "Smelly key #1" (item ID 12)
- Event 12: Door to Map021, requires Switch 28
- Event 13: Door to Map032, requires Switch 30
- Event 14: Door to Map018, requires Switch 31
- Event 15: Door to Map019, requires Switch 32
- Event 16: Door to Map017, requires Switch 29
- Event 21: Door to Map020, requires Switch 12
- Event 26: Door to Map016, requires Switch 33

**Implementation Details**:
- Event 27 gives the player a key item
- Events 12-16, 21, and 26 are doors that require specific switches to be ON
- Each door leads to a different map

**Potential Issues**:
- No clear indication of which key opens which door
- No quest journal integration
- Unclear quest flow and objectives

**Recommended Fixes**:
- Add quest journal integration
- Update event text to clearly indicate which key opens which door
- Document the quest flow and objectives

### 4. Engine Blueprint Quest

**Status**: Partially implemented, undocumented

**Related Events**:
- Event 28: Armatek Engineer
- Event 29: Armatek Engineer (continued)

**Implementation Details**:
- The player receives an Engine Blueprint (item ID 128)
- The player is tasked with finding three components:
  1. One at the construction site
  2. One from a malfunctioning A.S.P. drone
  3. One from the Armatek office

**Potential Issues**:
- No quest journal integration
- Unclear if all necessary events for component collection exist
- No clear indication of where to find the components

**Recommended Fixes**:
- Add quest journal integration
- Create events for the three components if they don't already exist
- Update event text to clearly indicate where to find the components

## Switch Usage Analysis

The following switches are used in Map015.json:

| Switch ID | Purpose | Used In | Notes |
|-----------|---------|---------|-------|
| 7 | Necklace Pieces Collection | Events 22-25 | Controls visibility of necklace piece events |
| 9 | Jen's Recruitment Quest | Not used in Map015.json | Should be set by Trash Octopus boss event |
| 12 | Door Key - Map020 | Event 21 | Unlocks door to Map020 |
| 28 | Door Key - Map021 | Event 12 | Unlocks door to Map021 |
| 29 | Door Key - Map017 | Event 16 | Unlocks door to Map017 |
| 30 | Door Key - Map032 | Event 13 | Unlocks door to Map032 |
| 31 | Door Key - Map018 | Event 14 | Unlocks door to Map018 |
| 32 | Door Key - Map019 | Event 15 | Unlocks door to Map019 |
| 33 | Door Key - Map016 | Event 26 | Unlocks door to Map016 |

**Potential Issues**:
- Switch 7 and Switch 9 may be related but are used separately
- Multiple switches used for door keys could be consolidated
- No clear naming convention for switches

**Recommended Fixes**:
- Clarify the relationship between Switch 7 and Switch 9
- Consider using a more systematic approach to door keys
- Document all switch usage in docs/reference/database/MegaEarth2049_Quest_Switch_Documentation.md

## Item Usage Analysis

The following items are used in Map015.json:

| Item ID | Name | Purpose | Used In | Notes |
|---------|------|---------|---------|-------|
| 10 | Necklace Piece | Collection | Events 22-25 | Given by necklace piece events |
| 12 | Smelly key #1 | Door Key | Event 27 | Given to the player |
| 128 | Engine Blueprint | Quest Item | Event 28 | Given to the player |
| 146 | Jen's Necklace | Quest Item | Not used in Map015.json | Should be given by Trash Octopus boss event |

**Potential Issues**:
- Confusion between necklace pieces (item ID 10) and Jen's Necklace (item ID 146)
- Unclear relationship between items and quests
- No standardized naming convention for items

**Recommended Fixes**:
- Clarify the relationship between necklace pieces and Jen's Necklace
- Document all item usage and purpose
- Standardize item naming and ID assignment

## Quest Journal Integration

None of the quests in Timbuc Cellar have proper integration with the YEP_QuestJournal plugin. The following plugin commands should be added:

### Jen's Recruitment Quest

```
Quest Add 6
Quest Update 6 1 Completed
Quest Update 6 2 Active
```

### Necklace Pieces Collection

If this is a separate quest:
```
Quest Add [ID]
Quest Update [ID] [Objective] Completed
```

### Smelly Keys Quest

```
Quest Add [ID]
Quest Update [ID] [Objective] Completed
```

### Engine Blueprint Quest

```
Quest Add [ID]
Quest Update [ID] [Objective] Completed
```

## Recommendations

1. **Add Missing Boss Event**:
   - Implement the Trash Octopus boss event in Map015.json
   - Ensure it sets Switch 9 to ON and gives the player Jen's Necklace (item ID 146)
   - Add appropriate plugin commands for quest journal integration

2. **Document All Quests**:
   - Create detailed documentation for each quest in Timbuc Cellar
   - Include objectives, flow, rewards, and implementation details
   - Add all quests to YEP_QuestJournal.js

3. **Standardize Implementation**:
   - Use consistent switch and item ID ranges for different quest types
   - Follow naming conventions for switches, variables, and items
   - Use self switches for event-specific state whenever possible

4. **Improve Quest Flow**:
   - Update event text to provide clear guidance to players
   - Consider adding maps or other visual aids to help players navigate
   - Ensure all quests have a clear beginning, middle, and end

5. **Test All Quests**:
   - Develop a testing protocol for all quests in Timbuc Cellar
   - Test quest flow from start to finish
   - Test edge cases and potential conflicts between quests

By implementing these recommendations, the quest system in Timbuc Cellar will be more robust, consistent, and enjoyable for players. These changes will also make it easier for developers to maintain and extend the quest system in the future.
