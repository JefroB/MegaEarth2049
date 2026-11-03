> Historical document retained for provenance. Its commands, IDs and completion claims may be superseded. Use the current FAQs, roadmap and maintained tools for current behavior.

# MegaEarth2049 Quest Implementation Guide

This guide provides a comprehensive approach to implementing quests in MegaEarth2049 using the YEP_QuestJournal plugin. Following these guidelines will ensure consistent quest implementation, avoid common pitfalls, and create a better experience for both developers and players.

## Table of Contents

1. [Quest Design Process](#quest-design-process)
2. [YEP_QuestJournal Integration](#yep_questjournal-integration)
3. [Event Implementation](#event-implementation)
4. [Switch and Variable Usage](#switch-and-variable-usage)
5. [Item Integration](#item-integration)
6. [Testing and Validation](#testing-and-validation)
7. [Common Pitfalls](#common-pitfalls)
8. [Example Implementation](#example-implementation)

## Quest Design Process

### 1. Define Quest Parameters

Before implementing a quest, define the following parameters:

- **Quest Name**: A clear, descriptive name
- **Quest ID**: A unique identifier (see [Quest ID Assignment](#quest-id-assignment))
- **Category**: The quest category (1-10, see [Quest Categories](#quest-categories))
- **Difficulty**: The quest difficulty (1-10)
- **Description**: A brief description of the quest
- **Objectives**: Clear, measurable goals for the player
- **Rewards**: Items, experience, gold, or other benefits

### 2. Plan Quest Flow

Map out the quest flow, including:

- **Starting Point**: Where and how the quest begins
- **Key Events**: Major milestones in the quest
- **Completion Conditions**: Requirements to complete the quest
- **Failure Conditions**: Circumstances that cause quest failure (if applicable)

### 3. Identify Required Resources

Determine what resources the quest requires:

- **Maps**: Which maps are involved in the quest
- **NPCs**: Which NPCs are involved and their roles
- **Items**: What items are needed or rewarded
- **Switches**: Which switches will track quest state
- **Variables**: Which variables will store quest data

### 4. Document Quest Details

Create documentation for the quest, including:

- **Implementation Details**: How the quest is implemented
- **Testing Scenarios**: How to test the quest
- **Known Issues**: Any potential issues or edge cases

## YEP_QuestJournal Integration

### Quest ID Assignment

Quest IDs should be assigned according to the following ranges:

- **1-10**: Main story quests
- **11-30**: Character recruitment quests
- **31-50**: Side quests
- **51-70**: Collection quests
- **71-90**: Challenge quests
- **91-100**: Special events

### Quest Categories

Quest categories should be assigned according to the following system:

1. **Main Quest**: Primary story quests
2. **Side Quest**: Optional quests not related to the main story
3. **Character Quest**: Quests related to specific characters
4. **Item Quest**: Collection or crafting quests
5. **Exploration Quest**: Quests focused on discovering locations
6. **Challenge Quest**: Quests focused on combat or other challenges
7. **Crafting Quest**: Quests focused on crafting items
8. **Delivery Quest**: Quests focused on delivering items
9. **Escort Quest**: Quests focused on escorting NPCs
10. **Special Quest**: Unique or event-specific quests

### Adding Quests to YEP_QuestJournal.js

To add a quest to the YEP_QuestJournal.js file:

1. Locate the `QuestData` section in the file
2. Add a new quest entry using the following template:

```javascript
// Quest ID: [ID]
{
    name: "[Quest Name]",
    cat: [Category],
    diff: [Difficulty],
    desc: "[Description]",
    obj: [
        "[Objective 1]",
        "[Objective 2]",
        "[Objective 3]"
    ],
    subtext: [
        "[Subtext 1]",
        "[Subtext 2]",
        "[Subtext 3]"
    ],
    note: "[Additional Notes]",
    rewards: [
        "[Reward 1]",
        "[Reward 2]",
        "[Reward 3]"
    ],
    tracking: [
        "[Tracking 1]",
        "[Tracking 2]",
        "[Tracking 3]"
    ]
},
```

3. Fill in the template with your quest details
4. Ensure the quest ID is unique and follows the assignment guidelines

## Event Implementation

### Starting a Quest

To start a quest, use the following plugin command in an event:

```
Quest Add [ID]
```

This adds the quest to the player's journal and sets its status to "active".

### Updating Quest Objectives

To update a quest objective, use the following plugin command:

```
Quest Update [ID] [Objective] [Status]
```

Where:
- `[ID]` is the quest ID
- `[Objective]` is the objective number (1-based)
- `[Status]` is one of: "Active", "Completed", "Failed", or "Hidden"

### Completing a Quest

To complete a quest, use the following plugin command:

```
Quest Complete [ID]
```

This marks the quest as completed in the journal.

### Failing a Quest

To fail a quest, use the following plugin command:

```
Quest Fail [ID]
```

This marks the quest as failed in the journal.

### Removing a Quest

To remove a quest from the journal, use the following plugin command:

```
Quest Remove [ID]
```

This removes the quest from the journal entirely.

## Switch and Variable Usage

### Switch Assignment

Switches should be assigned according to the following ranges:

- **1-49**: System switches (reserved for core game functionality)
- **50-59**: Character recruitment quest switches
- **60-69**: Item collection quest switches
- **70-79**: Location discovery quest switches
- **80-89**: Combat/challenge quest switches
- **90-99**: Story progression switches

### Switch Naming

In the RPG Maker editor, name all switches according to this format:

```
[Quest Name] - [Specific Purpose]
```

Example: "Jen's Quest - House Access"

### Self Switches

Use self switches (A, B, C, D) whenever possible for event-specific state. Reserve global switches for cross-map quest logic.

### Variables

Variables should be used sparingly for quest logic. When necessary, use the following ranges:

- **1-49**: System variables (reserved for core game functionality)
- **50-59**: Character recruitment quest variables
- **60-69**: Item collection quest variables
- **70-79**: Location discovery quest variables
- **80-89**: Combat/challenge quest variables
- **90-99**: Story progression variables

## Item Integration

### Item ID Assignment

Item IDs should be assigned according to the following ranges:

- **1-100**: Common items
- **101-150**: Key items
- **151-200**: Quest-specific items
- **201-300**: Weapons
- **301-400**: Armor
- **401-500**: Accessories

### Quest Items

When creating quest items:

1. Assign an appropriate item ID
2. Set the item type to "Key Item" for quest-specific items
3. Provide a clear description that indicates the item's purpose
4. Use a distinctive icon that makes the item easy to identify
5. Set appropriate item flags (e.g., "Important", "Cannot Sell")

### Item Events

When creating events that give or require items:

1. Use conditional branches to check for items
2. Use change items commands to give or take items
3. Consider using common events for repeated item operations

## Testing and Validation

### Quest Testing Checklist

Before finalizing a quest, test the following:

1. **Quest Start**: Can the quest be started correctly?
2. **Objectives**: Do all objectives update correctly?
3. **Items**: Are all items given and received correctly?
4. **NPCs**: Do all NPCs behave correctly?
5. **Switches**: Are all switches set and checked correctly?
6. **Completion**: Can the quest be completed correctly?
7. **Rewards**: Are all rewards given correctly?
8. **Journal**: Does the quest appear correctly in the journal?

### Edge Case Testing

Test the following edge cases:

1. **Out of Order**: What happens if the player completes objectives out of order?
2. **Multiple Attempts**: What happens if the player tries to start the quest multiple times?
3. **Item Loss**: What happens if the player loses quest items?
4. **Map Transitions**: What happens if the player leaves and returns to quest areas?
5. **Save/Load**: What happens if the player saves and loads during the quest?

### Validation Criteria

A quest is considered valid if:

1. It can be started, progressed, and completed without errors
2. All objectives update correctly in the journal
3. All rewards are given correctly
4. The quest state is preserved correctly when saving and loading
5. The quest does not conflict with other quests or game systems

## Common Pitfalls

### Switch Conflicts

**Problem**: Using the same switch for multiple purposes can cause quest logic to break.

**Solution**: Use dedicated switches for each quest and purpose. Document all switch usage in MegaEarth2049_Quest_Switch_Documentation.md.

### Missing Plugin Commands

**Problem**: Forgetting to add plugin commands for quest journal updates can result in quests not appearing or updating correctly.

**Solution**: Always include appropriate plugin commands in quest events. Use the checklist in the [Testing and Validation](#testing-and-validation) section.

### Inconsistent Quest IDs

**Problem**: Using different quest IDs in different places can cause quest logic to break.

**Solution**: Define the quest ID once and use it consistently throughout the implementation. Document all quest IDs in a central location.

### Incomplete Quest Logic

**Problem**: Not accounting for all possible player actions can result in broken quests.

**Solution**: Plan and test quest flow thoroughly. Consider edge cases and unexpected player behavior.

### Item Management Issues

**Problem**: Not properly tracking quest items can result in quest progression issues.

**Solution**: Use conditional branches to check for items. Consider using variables to track item counts if necessary.

## Example Implementation

### Example: Character Recruitment Quest

Here's an example implementation of a character recruitment quest:

#### 1. Define Quest Parameters

- **Quest Name**: Jen's Lost Necklace
- **Quest ID**: 6
- **Category**: 3 (Character Quest)
- **Difficulty**: 3
- **Description**: Jen has lost her necklace. Find it and return it to her to recruit her to your party.
- **Objectives**: 
  1. Find Jen's Necklace
  2. Return the necklace to Jen
  3. Recruit Jen to your party
- **Rewards**: 
  1. Jen joins your party
  2. 500 EXP
  3. Access to Priest class skills

#### 2. Add to YEP_QuestJournal.js

```javascript
// Quest 6: Jen's Lost Necklace
{
    name: "Jen's Lost Necklace",
    cat: 3,
    diff: 3,
    desc: "Jen, a skilled priest living in Timbuc, has lost her precious necklace. She believes it was stolen by a mutated creature in the Timbuc Cellar. Find the necklace and return it to her, and she may be willing to join your cause.",
    obj: [
        "Find Jen's Necklace in Timbuc Cellar",
        "Return the necklace to Jen",
        "Recruit Jen to your party"
    ],
    subtext: [
        "A large mutated octopus in Timbuc Cellar seems to be guarding something shiny...",
        "Jen lives in a small house in the eastern part of Timbuc",
        "Jen is a skilled priest who can heal allies in battle"
    ],
    note: "Jen will only join your party if you return her necklace.",
    rewards: [
        "Jen joins your party",
        "500 EXP",
        "Access to Priest class skills"
    ],
    tracking: [
        "Defeat the Trash Octopus boss in Timbuc Cellar",
        "Visit Jen's house in eastern Timbuc",
        "Complete Jen's recruitment event"
    ]
},
```

#### 3. Create Boss Event

Create a boss event in Timbuc Cellar (Map015.json) with the following script:

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

#### 4. Create Recruitment Event

Create a recruitment event in Jen's House (Map057.json) with the following script:

```
@>Conditional Branch: Switch 9 (Jen's Quest) is ON
    @>Conditional Branch: Has Item: Jen's Necklace (ID: 146)
        @>Show Text: \N[2]: Oh! You found my necklace! Thank you so much!
        @>Show Text: \N[2]: This necklace is very important to me. It was a gift from my mother before she passed away.
        @>Show Text: \N[2]: As a token of my gratitude, I'll join your party. My healing skills should be useful in your journey.
        @>Change Items: Jen's Necklace (ID: 146) - 1
        @>Change Party Member: Jen (ID: 2), Add
        @>Plugin Command: Quest Update 6 2 Completed
        @>Plugin Command: Quest Update 6 3 Completed
        @>Plugin Command: Quest Complete 6
        @>Control Switches: #9 (Jen's Quest) = OFF
        @>Self Switch A = ON
    @>Else
        @>Show Text: \N[2]: Have you found my necklace yet? I really miss it...
    @>End
@>Else
    @>Show Text: \N[2]: Hello there. I'm Jen, a priest in training.
    @>Show Text: \N[2]: I lost my precious necklace recently. I think a monster in the cellar stole it.
    @>Show Text: \N[2]: If you happen to find it, please bring it back to me. It means a lot to me.
@>End
```

#### 5. Create Door Event

Create a door event for Jen's House (Map056.json) with the following script:

```
@>Conditional Branch: Switch 9 (Jen's Quest) is ON
    @>Transfer Player: Map057 (Jen's House), X:8, Y:6, Direction: Retain
@>Else
    @>Show Text: The door is locked. You can hear someone inside.
@>End
```

#### 6. Create Quest Item

Add the following item to the Items.json file:

```json
{
  "id": 146,
  "name": "Jen's Necklace",
  "iconIndex": 176,
  "description": "A beautiful silver necklace with a small crystal pendant. It belongs to Jen.",
  "price": 0,
  "consumable": false,
  "itypeId": 2,
  "note": "<Key Item>"
}
```

#### 7. Test the Quest

Test the quest by:

1. Entering Timbuc Cellar (Map015)
2. Finding and defeating the Trash Octopus boss
3. Verifying that you receive Jen's Necklace and Switch 9 is set to ON
4. Verifying that the quest appears in the journal with the first objective completed
5. Going to Jen's house and entering (should now be possible)
6. Talking to Jen and giving her the necklace
7. Verifying that Jen joins your party and the quest is marked as complete

This example demonstrates a complete quest implementation following the guidelines in this document. By following these steps for all quests, you can ensure consistent, bug-free quest implementation throughout MegaEarth2049.
