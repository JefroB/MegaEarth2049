> Historical document retained for provenance. Its commands, IDs and completion claims may be superseded. Use the current FAQs, roadmap and maintained tools for current behavior.

# Jen Recruitment Quest Implementation Summary

This document summarizes the changes made to implement the Jen recruitment quest in the YEP_QuestJournal plugin and provides instructions for using it in the game.

## Changes Made

1. **Added Quest to YEP_QuestJournal.js**
   - Added "Quest 6: Jen's Lost Necklace" to the QuestData section
   - Set up quest details including category, difficulty, objectives, rewards, etc.

2. **Created Jen's Necklace Item**
   - Added "Jen's Necklace" (ID 146) to the Items.json file
   - Set it up as a key item with appropriate description and icon

3. **Created Implementation Guide**
   - Created docs/archive/quests/Jen_Recruitment_Quest_Event.txt with detailed event implementation instructions
   - Provided example event scripts for the Timbuc Cellar boss and Jen's house events

4. **Improved Quest Availability Logic**
   - Added level 3 requirement for Jen to appear at her house
   - Created new Switch 21 to control Jen's presence at home

## Quest Details

- **Quest ID**: 6
- **Name**: Jen's Lost Necklace
- **Category**: Character Quests (4)
- **Difficulty**: 2
- **From**: Timbuc Cellar
- **Location**: Timbuc and surrounding areas
- **Availability**: After player reaches level 3
- **Description**: You've discovered that Jen is missing her necklace. It appears to have been stolen and taken to the Timbuc Cellar. Retrieve the necklace and return it to Jen to gain her trust and expertise.
- **Objectives**:
  1. Defeat the boss in Timbuc Cellar
  2. Retrieve Jen's necklace
  3. Return the necklace to Jen
- **Rewards**:
  - Jen joins your party
  - Access to healing and support magic
  - Information about the neural implant technology

## Required Switches

- **Switch 9**: Boss Defeated (ON = defeated, OFF = not defeated)
- **Switch 10**: Jen Recruited (ON = recruited, OFF = not recruited)
- **Switch 21**: Jen is Home (ON = Jen is home, OFF = Jen is not home)

## Switch Logic

1. **Initial State**:
   - Switch 9: OFF (Boss not defeated)
   - Switch 10: OFF (Jen not recruited)
   - Switch 21: OFF (Jen not home)

2. **Level 3 Trigger**:
   - When player reaches level 3, Switch 21 is set to ON (Jen is now home)
   - This allows the player to enter Jen's house and meet her

3. **Boss Defeat**:
   - When the boss is defeated, Switch 9 is set to ON
   - This tracks quest progression and enables the necklace return dialogue

4. **Recruitment**:
   - When the necklace is returned, Switch 10 is set to ON
   - This completes the quest and adds Jen to the party

## Implementation Steps

1. **Create Common Event for Level Check**
   ```
   // Common Event: Jen Availability Check
   Trigger: Parallel Process
   Event Commands:
   - Conditional Branch: Actor 1's Level ≥ 3
     - If true AND Switch 21 is OFF:
       - Set Switch 21 ON (Jen is home)
       - Show Text: "You hear rumors about a former OmniCorp specialist living in Timbuc."
     - End If
   - End Branch
   ```

2. **Set Up Map056 (Outside Jen's House) Event**
   ```
   // Event Page 1: Jen Not Home
   Conditions: Switch 21 OFF
   Event Commands:
   - Show Text: "The house appears to be empty. Nobody answers the door."
   - (Prevent entry to Map057)

   // Event Page 2: Jen Home
   Conditions: Switch 21 ON
   Event Commands:
   - Show Text: "This appears to be the home of the former OmniCorp specialist."
   - Transfer Player: Map057 (entry coordinates)
   ```

3. **Fix Map057 Entry Event**
   ```
   // Map Entry Event for Jen's House (Map057)
   Conditions: None
   Event Commands:
   - Comment: "DO NOT set Switch 9 to OFF here"
   - Other map entry logic...
   ```

4. **Set Up the Boss Event in Timbuc Cellar**
   - Create an event with the Trash Octopus (or appropriate boss) battle
   - After defeating the boss, give the player Jen's Necklace
   - Set Switch 9 ON to indicate the boss has been defeated
   - Add the quest to the journal with `Quest Add 6`
   - Mark the first two objectives as complete with:
     - `Quest SetObjective 6 1 complete`
     - `Quest SetObjective 6 2 complete`

5. **Set Up Jen's NPC Event in Map057**
   - Create an event with multiple pages based on Switch 21, Switch 9, and Switch 10
   - First page: Initial meeting when Jen is home (Switch 21 ON)
   - Second page: After boss defeated (Switch 9 ON)
   - Third page: After Jen has joined the party (Switch 10 ON)

## Testing the Quest

To test the quest implementation:

1. Start a new game and level up to level 3
2. Verify that you receive a notification about Jen
3. Visit Jen's house and confirm you can now enter
4. Talk to Jen to learn about her missing necklace
5. Go to Timbuc Cellar, defeat the boss, and obtain Jen's Necklace
6. Check that the quest appears in the quest journal with the first two objectives complete
7. Return to Jen's house and give her the necklace
8. Verify that Jen joins the party and the quest is marked as complete
9. Check that Switch 10 is ON, indicating Jen has been recruited

## Integration with Main Story

This quest becomes available after the player reaches level 3, giving them time to learn the game mechanics before encountering Jen. Her healing abilities will be valuable for the player as they progress through the game.

The quest serves as an introduction to Jen's character and her background with OmniCorp Security, which will be relevant to the main story involving the neural implant and A.S.P.

After completing this quest, Jen can provide additional information about the neural implant technology and the corporate wars, which helps contextualize the main story quests.
