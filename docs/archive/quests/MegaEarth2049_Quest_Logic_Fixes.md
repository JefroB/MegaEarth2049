> Historical document retained for provenance. Its commands, IDs and completion claims may be superseded. Use the current FAQs, roadmap and maintained tools for current behavior.

# MegaEarth2049 Quest Logic Fixes

This document outlines specific quest logic issues identified in MegaEarth2049 and provides detailed solutions for fixing them. These fixes will ensure that quests function correctly and provide a consistent player experience.

## Jen's Recruitment Quest

### Issues

1. **Missing Boss Event**:
   - The Trash Octopus boss event that should give the player Jen's Necklace and set Switch 9 to ON is missing from Map015.json (Timbuc Cellar).
   - Without this event, players cannot obtain Jen's Necklace or set Switch 9 to ON, making it impossible to complete the quest.

2. **Switch 9 Reset**:
   - When entering Jen's House (Map057.json), there appears to be an event that sets Switch 9 to OFF.
   - This conflicts with the requirement that Switch 9 be ON to trigger the recruitment event.

3. **Confusion Between Necklace Items**:
   - There are two different necklace items: necklace pieces (item ID 10) and Jen's Necklace (item ID 146).
   - It's unclear if these are related or separate quest items.

4. **Incomplete Quest Journal Integration**:
   - The quest is defined in YEP_QuestJournal.js, but the necessary plugin commands to update quest objectives are missing from the events.

### Fixes

1. **Add Boss Event to Map015.json**:
   - Create a new event in Timbuc Cellar (Map015.json) at coordinates (65, 43) with the following script:

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

2. **Fix Switch 9 Reset in Map057.json**:
   - Locate the event in Map057.json that sets Switch 9 to OFF when entering the map.
   - Remove this command or modify it to only set Switch 9 to OFF after the recruitment event is complete.
   - Alternatively, use a different switch for controlling access to Jen's house.

3. **Clarify Necklace Items**:
   - Update the item descriptions to clarify the relationship between necklace pieces (item ID 10) and Jen's Necklace (item ID 146).
   - If they are related, update the events to establish a clear connection.
   - If they are unrelated, ensure their descriptions and quest text make this clear.

4. **Add Quest Journal Integration**:
   - Add the following plugin commands to the boss event in Map015.json:
     - `Quest Add 6` (when the player defeats the boss)
     - `Quest Update 6 1 Completed` (when the player obtains Jen's Necklace)
     - `Quest Update 6 2 Active` (when the player obtains Jen's Necklace)
   - Add the following plugin commands to the recruitment event in Map057.json:
     - `Quest Update 6 2 Completed` (when the player returns the necklace)
     - `Quest Update 6 3 Completed` (when Jen joins the party)
     - `Quest Complete 6` (when the quest is complete)

## Smelly Keys Quest

### Issues

1. **Undocumented Quest**:
   - The Smelly Keys quest exists in the game code but is not documented.
   - Events 12-16, 21, 26, and 27 in Map015.json (Timbuc Cellar) are related to this quest.

2. **Missing Quest Journal Entry**:
   - The quest is not defined in YEP_QuestJournal.js.
   - There are no plugin commands to add or update the quest in the journal.

3. **Unclear Quest Flow**:
   - It's unclear how players are supposed to obtain the keys and in what order.
   - The relationship between the keys and the doors is not well-established.

### Fixes

1. **Document the Quest**:
   - Create documentation for the Smelly Keys quest, including objectives, flow, and rewards.
   - Add the quest to YEP_QuestJournal.js with an appropriate ID, category, and objectives.

2. **Add Quest Journal Integration**:
   - Add plugin commands to the key and door events to add and update the quest in the journal.
   - For example:
     - `Quest Add [ID]` (when the player obtains the first key)
     - `Quest Update [ID] [Objective] Completed` (when the player unlocks a door)
     - `Quest Complete [ID]` (when the player unlocks all doors)

3. **Clarify Quest Flow**:
   - Update the event text to clearly indicate which key opens which door.
   - Consider adding a map or other guidance to help players navigate the quest.
   - Ensure the quest has a clear beginning, middle, and end.

## Engine Blueprint Quest

### Issues

1. **Undocumented Quest**:
   - The Engine Blueprint quest exists in the game code but is not documented.
   - Events 28-29 in Map015.json (Timbuc Cellar) are related to this quest.

2. **Missing Quest Journal Entry**:
   - The quest is not defined in YEP_QuestJournal.js.
   - There are no plugin commands to add or update the quest in the journal.

3. **Incomplete Implementation**:
   - It's unclear if all the necessary events for this quest exist.
   - The locations of the three components are not well-established.

### Fixes

1. **Document the Quest**:
   - Create documentation for the Engine Blueprint quest, including objectives, flow, and rewards.
   - Add the quest to YEP_QuestJournal.js with an appropriate ID, category, and objectives.

2. **Add Quest Journal Integration**:
   - Add plugin commands to the blueprint and component events to add and update the quest in the journal.
   - For example:
     - `Quest Add [ID]` (when the player receives the blueprint)
     - `Quest Update [ID] [Objective] Completed` (when the player finds a component)
     - `Quest Complete [ID]` (when the player finds all components)

3. **Complete Implementation**:
   - Create events for the three components if they don't already exist.
   - Update the event text to clearly indicate where to find the components.
   - Ensure the quest has a clear beginning, middle, and end.

## Necklace Pieces Collection

### Issues

1. **Undocumented Quest**:
   - The Necklace Pieces collection exists in the game code but is not documented.
   - Events 22-25 in Map015.json (Timbuc Cellar) are related to this collection.

2. **Relationship to Jen's Quest**:
   - It's unclear if the necklace pieces (item ID 10) are related to Jen's Necklace (item ID 146).
   - Switch 7 controls the visibility of necklace piece events, while Switch 9 is used for Jen's quest.

3. **Missing Quest Journal Entry**:
   - If this is a separate quest, it's not defined in YEP_QuestJournal.js.
   - There are no plugin commands to add or update the quest in the journal.

### Fixes

1. **Clarify Relationship to Jen's Quest**:
   - Determine if the necklace pieces are related to Jen's Necklace.
   - If they are related, update the events to establish a clear connection.
   - If they are unrelated, ensure their descriptions and quest text make this clear.

2. **Document the Quest**:
   - If this is a separate quest, create documentation for it, including objectives, flow, and rewards.
   - If this is part of Jen's quest, update the Jen's quest documentation to include the necklace pieces.

3. **Add Quest Journal Integration**:
   - If this is a separate quest, add it to YEP_QuestJournal.js with an appropriate ID, category, and objectives.
   - Add plugin commands to the necklace piece events to add and update the quest in the journal.

## General Fixes

1. **Standardize Switch Usage**:
   - Use dedicated switch ranges for different quest types (see docs/reference/database/MegaEarth2049_Quest_Switch_Documentation.md).
   - Use descriptive names for switches in the editor.
   - Document all switch usage in a central location.

2. **Standardize Item Usage**:
   - Use dedicated item ID ranges for different item types.
   - Use descriptive names and icons for quest items.
   - Include clear descriptions that indicate the item's purpose.

3. **Implement Quest Journal Integration**:
   - Add all quests to YEP_QuestJournal.js.
   - Add appropriate plugin commands to all quest events.
   - Test quest journal functionality for all quests.

4. **Create Testing Protocol**:
   - Develop a testing protocol for all quests.
   - Test quest flow from start to finish.
   - Test edge cases and potential conflicts with other quests.

By implementing these fixes, the quest system in MegaEarth2049 will be more robust, consistent, and enjoyable for players. These changes will also make it easier for developers to maintain and extend the quest system in the future.
