> Historical document retained for provenance. Its commands, IDs and completion claims may be superseded. Use the current FAQs, roadmap and maintained tools for current behavior.

# Necklace Pieces Collection Implementation Guide

This document provides a comprehensive guide for implementing the "Necklace Pieces Collection" quest in MegaEarth2049. This quest involves collecting necklace pieces throughout Timbuc Cellar.

## Table of Contents

1. [Quest Overview](#quest-overview)
2. [Quest Parameters](#quest-parameters)
3. [Quest Flow](#quest-flow)
4. [Required Resources](#required-resources)
5. [YEP_QuestJournal Integration](#yep_questjournal-integration)
6. [Event Implementation](#event-implementation)
7. [Switch Documentation](#switch-documentation)
8. [Testing Checklist](#testing-checklist)
9. [Known Issues](#known-issues)

## Quest Overview

The Necklace Pieces Collection quest is a collection quest where players find necklace pieces throughout Timbuc Cellar. This quest is separate from Jen's Necklace quest (which uses Switch 9) and involves collecting different necklace pieces for a different purpose.

## Quest Parameters

- **Quest Name**: The Ancient Necklace
- **Quest ID**: 11
- **Category**: 4 (Collection Quest)
- **Difficulty**: 2
- **Description**: Ancient necklace pieces have been scattered throughout Timbuc Cellar. Collecting all pieces may reveal a powerful artifact.
- **Objectives**:
  1. Find Necklace Piece 1 in Timbuc Cellar
  2. Find Necklace Piece 2 in Timbuc Cellar
  3. Find Necklace Piece 3 in Timbuc Cellar
  4. Find Necklace Piece 4 in Timbuc Cellar
  5. Combine the necklace pieces
- **Rewards**:
  - Ancient Necklace (Equipment - Accessory)
  - +5 to all stats when equipped

## Quest Flow

1. **Starting Point**: The quest begins when the player finds the first necklace piece (Event 22) in Timbuc Cellar (Map015.json).
2. **Piece Collection**: The player must find the remaining necklace pieces (Events 23-25) throughout Timbuc Cellar.
3. **Completion**: When all pieces are collected, they are automatically combined into the Ancient Necklace.

## Required Resources

### Maps
- Map015.json (Timbuc Cellar) - Location of all necklace pieces

### Items
- Necklace Piece 1 (Item ID: 151) - Found at Event 22
- Necklace Piece 2 (Item ID: 152) - Found at Event 23
- Necklace Piece 3 (Item ID: 153) - Found at Event 24
- Necklace Piece 4 (Item ID: 154) - Found at Event 25
- Ancient Necklace (Item ID: 155) - Reward for collecting all pieces

### Switches
- Switch 7 - Controls visibility of necklace piece events (22-25)
- Switch 68 - Necklace Pieces Quest Active
- Switch 69 - Necklace Piece 1 Found
- Switch 70 - Necklace Piece 2 Found
- Switch 71 - Necklace Piece 3 Found
- Switch 72 - Necklace Piece 4 Found
- Switch 73 - All Necklace Pieces Found

### Events
- Event 22 - Necklace Piece 1
- Event 23 - Necklace Piece 2
- Event 24 - Necklace Piece 3
- Event 25 - Necklace Piece 4

## YEP_QuestJournal Integration

### Quest Entry

Update the QuestData section in YEP_QuestJournal.js to include the following entry:

```javascript
Quest 11: The Ancient Necklace
Category: 4
Difficulty: 2
From: Found in Timbuc Cellar
Location: Timbuc Cellar
Description: Ancient necklace pieces have been scattered throughout Timbuc Cellar. According to local legends, when combined, these pieces form a powerful artifact that grants enhanced abilities to the wearer.
Objectives:
- Find Necklace Piece 1 in Timbuc Cellar
- Find Necklace Piece 2 in Timbuc Cellar
- Find Necklace Piece 3 in Timbuc Cellar
- Find Necklace Piece 4 in Timbuc Cellar
- Combine the necklace pieces
Rewards:
- Ancient Necklace (Equipment - Accessory)
- +5 to all stats when equipped
Subtext: The necklace pieces emit a faint glow when brought near each other. They seem to be made of a material not found in the wasteland.
Quotes:
- "I've heard tales of an ancient artifact hidden in Timbuc Cellar. They say it grants great power to whoever wears it." - Timbuc Resident
- "Those necklace pieces are different from Jen's necklace. They're much older, possibly pre-collapse technology." - Armatek Researcher
```

## Event Implementation

### Necklace Piece 1 Event (Event 22)

Update Event 22 in Map015.json to include quest journal integration:

```
@>Conditional Branch: Switch 7 is OFF
    @>Conditional Branch: Self Switch A is OFF
        @>Show Text: You notice something glinting in the corner of the cellar...
        @>Show Choices: [Investigate][Leave it alone]
            @>When [Investigate]
                @>Show Text: You found a strange piece of what appears to be a necklace. It seems to be part of a larger artifact.
                @>Change Items: Necklace Piece 1 (ID: 151) + 1
                @>Control Switches: #69 (Necklace Piece 1 Found) = ON
                @>Control Switches: #68 (Necklace Pieces Quest Active) = ON
                @>Plugin Command: Quest Add 11
                @>Plugin Command: Quest Update 11 1 Completed
                @>Show Text: The piece seems to resonate with strange energy. There must be more pieces out there...
                @>Self Switch A = ON
            @>When [Leave it alone]
                @>Show Text: You decide to leave it alone for now.
            @>Branch End
    @>Else
        @>Show Text: You've already found the necklace piece here.
    @>End
@>End
```

### Necklace Piece 2 Event (Event 23)

Update Event 23 in Map015.json to include quest journal integration:

```
@>Conditional Branch: Switch 7 is OFF
    @>Conditional Branch: Switch 68 is ON
        @>Conditional Branch: Self Switch A is OFF
            @>Show Text: You notice something embedded in the wall...
            @>Show Choices: [Investigate][Leave it alone]
                @>When [Investigate]
                    @>Show Text: You found another piece of the strange necklace. It resonates with the first piece.
                    @>Change Items: Necklace Piece 2 (ID: 152) + 1
                    @>Control Switches: #70 (Necklace Piece 2 Found) = ON
                    @>Plugin Command: Quest Update 11 2 Completed
                    @>Self Switch A = ON
                @>When [Leave it alone]
                    @>Show Text: You decide to leave it alone for now.
                @>Branch End
        @>Else
            @>Show Text: You've already found the necklace piece here.
        @>End
    @>Else
        @>Show Text: There's something embedded in the wall, but you can't quite make it out.
    @>End
@>End
```

### Necklace Piece 3 Event (Event 24)

Update Event 24 in Map015.json to include quest journal integration:

```
@>Conditional Branch: Switch 7 is OFF
    @>Conditional Branch: Switch 68 is ON
        @>Conditional Branch: Self Switch A is OFF
            @>Show Text: You notice something shimmering in a puddle of water...
            @>Show Choices: [Investigate][Leave it alone]
                @>When [Investigate]
                    @>Show Text: You found another piece of the strange necklace. It resonates with the other pieces.
                    @>Change Items: Necklace Piece 3 (ID: 153) + 1
                    @>Control Switches: #71 (Necklace Piece 3 Found) = ON
                    @>Plugin Command: Quest Update 11 3 Completed
                    @>Self Switch A = ON
                @>When [Leave it alone]
                    @>Show Text: You decide to leave it alone for now.
                @>Branch End
        @>Else
            @>Show Text: You've already found the necklace piece here.
        @>End
    @>Else
        @>Show Text: There's something in the puddle, but you can't quite make it out.
    @>End
@>End
```

### Necklace Piece 4 Event (Event 25)

Update Event 25 in Map015.json to include quest journal integration:

```
@>Conditional Branch: Switch 7 is OFF
    @>Conditional Branch: Switch 68 is ON
        @>Conditional Branch: Self Switch A is OFF
            @>Show Text: You notice something hidden behind some debris...
            @>Show Choices: [Investigate][Leave it alone]
                @>When [Investigate]
                    @>Show Text: You found the final piece of the strange necklace. As you hold it, all four pieces begin to glow intensely.
                    @>Change Items: Necklace Piece 4 (ID: 154) + 1
                    @>Control Switches: #72 (Necklace Piece 4 Found) = ON
                    @>Plugin Command: Quest Update 11 4 Completed
                    @>Conditional Branch: Switch 69 is ON && Switch 70 is ON && Switch 71 is ON && Switch 72 is ON
                        @>Show Text: The four necklace pieces float out of your inventory and combine in front of you, forming a complete necklace!
                        @>Change Items: Necklace Piece 1 (ID: 151) - 1
                        @>Change Items: Necklace Piece 2 (ID: 152) - 1
                        @>Change Items: Necklace Piece 3 (ID: 153) - 1
                        @>Change Items: Necklace Piece 4 (ID: 154) - 1
                        @>Change Items: Ancient Necklace (ID: 155) + 1
                        @>Control Switches: #73 (All Necklace Pieces Found) = ON
                        @>Plugin Command: Quest Update 11 5 Completed
                        @>Plugin Command: Quest Complete 11
                        @>Show Text: You obtained the Ancient Necklace! This powerful artifact will enhance your abilities when equipped.
                    @>End
                    @>Self Switch A = ON
                @>When [Leave it alone]
                    @>Show Text: You decide to leave it alone for now.
                @>Branch End
        @>Else
            @>Show Text: You've already found the necklace piece here.
        @>End
    @>Else
        @>Show Text: There's something behind the debris, but you can't quite make it out.
    @>End
@>End
```

## Switch Documentation

Update the docs/reference/database/MegaEarth2049_Quest_Switch_Documentation.md file to include the following entries:

```markdown
| Switch ID | Name/Purpose | Used In | Description | Notes |
|-----------|--------------|---------|-------------|-------|
| 7 | Necklace Pieces Collection | Map015.json | Controls visibility of necklace piece events (22-25) | Used to hide necklace piece events when not needed |
| 68 | Necklace Pieces Quest Active | Map015.json | Tracks if the Necklace Pieces quest is active | Set when player finds first necklace piece |
| 69 | Necklace Piece 1 Found | Map015.json | Tracks if Necklace Piece 1 has been found | Set when player finds Necklace Piece 1 |
| 70 | Necklace Piece 2 Found | Map015.json | Tracks if Necklace Piece 2 has been found | Set when player finds Necklace Piece 2 |
| 71 | Necklace Piece 3 Found | Map015.json | Tracks if Necklace Piece 3 has been found | Set when player finds Necklace Piece 3 |
| 72 | Necklace Piece 4 Found | Map015.json | Tracks if Necklace Piece 4 has been found | Set when player finds Necklace Piece 4 |
| 73 | All Necklace Pieces Found | Map015.json | Tracks if all necklace pieces have been found | Set when all four pieces are found and combined |
```

## Testing Checklist

1. **Quest Start**:
   - [ ] Find Necklace Piece 1 in Event 22
   - [ ] Verify quest is added to journal
   - [ ] Verify first objective is marked as completed

2. **Piece Collection**:
   - [ ] Find Necklace Piece 2 in Event 23
   - [ ] Verify second objective is marked as completed
   - [ ] Find Necklace Piece 3 in Event 24
   - [ ] Verify third objective is marked as completed
   - [ ] Find Necklace Piece 4 in Event 25
   - [ ] Verify fourth objective is marked as completed

3. **Quest Completion**:
   - [ ] Verify necklace pieces combine automatically
   - [ ] Verify fifth objective is marked as completed
   - [ ] Verify quest is marked as completed
   - [ ] Verify Ancient Necklace is received
   - [ ] Verify Ancient Necklace provides stat bonuses when equipped

4. **Edge Cases**:
   - [ ] Try to find pieces out of order
   - [ ] Try to find pieces without starting the quest
   - [ ] Try to find pieces multiple times
   - [ ] Save and load game during quest

## Known Issues

1. **Switch 7 Purpose**: Switch 7 is currently used to control the visibility of necklace piece events. This should be clarified in the game code to avoid confusion with Jen's Necklace quest (Switch 9).

2. **Piece Placement**: The exact locations for the necklace pieces need to be determined based on map layout and difficulty progression.

3. **Quest Progression**: If a player somehow obtains necklace pieces out of order, they may be able to skip parts of the quest. This is acceptable as it rewards exploration.

4. **Relationship to Jen's Quest**: The relationship between this quest and Jen's Necklace quest should be clarified in the game dialogue to avoid player confusion.
