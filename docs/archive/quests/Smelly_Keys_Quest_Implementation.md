> Historical document retained for provenance. Its commands, IDs and completion claims may be superseded. Use the current FAQs, roadmap and maintained tools for current behavior.

# Smelly Keys Quest Implementation Guide

This document provides a comprehensive guide for implementing the "Smelly Keys Quest" in MegaEarth2049. This quest involves collecting smelly keys throughout Timbuc Cellar to unlock various doors leading to different areas.

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

The Smelly Keys Quest is a collection quest where players find smelly keys throughout Timbuc Cellar. Each key unlocks a specific door, leading to different areas with potential treasures and items. The quest is designed to encourage exploration of the Timbuc Cellar area and provide rewards for thorough investigation.

## Quest Parameters

- **Quest Name**: The Mysterious Smelly Keys
- **Quest ID**: 9
- **Category**: 3 (Collection Quest)
- **Difficulty**: 2
- **Description**: Strange, smelly keys have been scattered throughout Timbuc Cellar. Each key unlocks a specific door, potentially leading to valuable treasures.
- **Objectives**:
  1. Find Smelly Key #1 in central Timbuc Cellar
  2. Unlock the door to Map020 using Smelly Key #1
  3. Find Smelly Key #2 and unlock the door to Map021
  4. Find Smelly Key #3 and unlock the door to Map017
  5. Find Smelly Key #4 and unlock the door to Map032
  6. Find Smelly Key #5 and unlock the door to Map018
  7. Find Smelly Key #6 and unlock the door to Map019
  8. Find Smelly Key #7 and unlock the door to Map016
- **Rewards**:
  - Access to hidden areas with valuable items
  - 1000 credits total (distributed across the hidden areas)
  - Unique equipment items in the final area

## Quest Flow

1. **Starting Point**: The quest begins when the player finds the first smelly key (Smelly Key #1) from Event 27 in Timbuc Cellar (Map015.json).
2. **Key Collection**: The player must find the remaining keys throughout Timbuc Cellar.
3. **Door Unlocking**: Each key unlocks a specific door, which the player must find and open.
4. **Completion**: The quest is considered complete when all doors have been unlocked.

## Required Resources

### Maps
- Map015.json (Timbuc Cellar) - Main quest area
- Map016.json - Destination for Door 7
- Map017.json - Destination for Door 3
- Map018.json - Destination for Door 5
- Map019.json - Destination for Door 6
- Map020.json - Destination for Door 1
- Map021.json - Destination for Door 2
- Map032.json - Destination for Door 4

### Items
- Smelly Key #1 (Item ID: 12) - Unlocks door to Map020
- Smelly Key #2 (Item ID: 28) - Unlocks door to Map021
- Smelly Key #3 (Item ID: 29) - Unlocks door to Map017
- Smelly Key #4 (Item ID: 30) - Unlocks door to Map032
- Smelly Key #5 (Item ID: 31) - Unlocks door to Map018
- Smelly Key #6 (Item ID: 32) - Unlocks door to Map019
- Smelly Key #7 (Item ID: 33) - Unlocks door to Map016

### Switches
- Switch 12 - Controls access to door leading to Map020
- Switch 28 - Controls access to door leading to Map021
- Switch 29 - Controls access to door leading to Map017
- Switch 30 - Controls access to door leading to Map032
- Switch 31 - Controls access to door leading to Map018
- Switch 32 - Controls access to door leading to Map019
- Switch 33 - Controls access to door leading to Map016
- Switch 60 - Smelly Keys Quest Active

### Events
- Event 12 - Door to Map021
- Event 13 - Door to Map032
- Event 14 - Door to Map018
- Event 15 - Door to Map019
- Event 16 - Door to Map017
- Event 21 - Door to Map020
- Event 26 - Door to Map016
- Event 27 - Gives Smelly Key #1

## YEP_QuestJournal Integration

### Quest Entry

Update the QuestData section in YEP_QuestJournal.js to include the following entry:

```javascript
Quest 9: The Mysterious Smelly Keys
Category: 3
Difficulty: 2
From: Found in Timbuc Cellar
Location: Timbuc Cellar
Description: Strange, smelly keys have been scattered throughout Timbuc Cellar. Each key unlocks a specific door, potentially leading to valuable treasures.
Objectives:
- Find Smelly Key #1 in central Timbuc Cellar
- Unlock the door to Map020 using Smelly Key #1
- Find Smelly Key #2 and unlock the door to Map021
- Find Smelly Key #3 and unlock the door to Map017
- Find Smelly Key #4 and unlock the door to Map032
- Find Smelly Key #5 and unlock the door to Map018
- Find Smelly Key #6 and unlock the door to Map019
- Find Smelly Key #7 and unlock the door to Map016
Rewards:
- Access to hidden areas with valuable items
- 1000 credits total (distributed across the hidden areas)
- Unique equipment items in the final area
Subtext: These keys have a distinct, unpleasant smell. Who would create such foul-smelling keys, and what treasures might they protect?
Quotes:
- "I've heard rumors of hidden treasures in Timbuc Cellar, but the smell of those keys is almost not worth it." - Timbuc Resident
- "Each key has a unique smell. Some say the smell corresponds to what's behind each door." - Mysterious Vendor
```

## Event Implementation

### Key Event (Event 27)

Update Event 27 in Map015.json to include quest journal integration:

```
@>Conditional Branch: Self Switch A is OFF
    @>Show Text: You notice a small chest in the corner.
    @>Show Choices: [Open it][Leave it]
        @>When [Open it]
            @>Play SE: Chest1
            @>Change Actor Images: Actor 0, [Direction] Down, [Pattern] 1
            @>Wait: 3 frames
            @>Change Actor Images: Actor 0, [Direction] Down, [Pattern] 0
            @>Wait: 3 frames
            @>Change Actor Images: Actor 0, [Direction] Down, [Pattern] 1
            @>Self Switch A = ON
            @>Change Items: Smelly Key #1 (ID: 12) + 1
            @>Control Switches: #60 (Smelly Keys Quest) = ON
            @>Plugin Command: Quest Add 9
            @>Plugin Command: Quest Update 9 1 Completed
            @>Plugin Command: Quest Update 9 2 Active
            @>Show Text: You found Smelly Key #1! It has a distinct, unpleasant odor.
            @>Show Text: This key might unlock one of the doors in Timbuc Cellar.
        @>When [Leave it]
            @>Show Text: You decide to leave the chest alone for now.
        @>Branch End
@>Else
    @>Show Text: The chest is empty.
@>End
```

### Door Events

Update each door event to include quest journal integration:

#### Door to Map020 (Event 21)

```
@>Conditional Branch: Switch 12 is ON
    @>Show Text: You use Smelly Key #1 to unlock the door.
    @>Plugin Command: Quest Update 9 2 Completed
    @>Transfer Player: Map020, X:2, Y:6, Direction: Retain
@>Else
    @>Conditional Branch: Has Item: Smelly Key #1 (ID: 12)
        @>Show Text: You use Smelly Key #1 to unlock the door.
        @>Control Switches: #12 = ON
        @>Plugin Command: Quest Update 9 2 Completed
        @>Transfer Player: Map020, X:2, Y:6, Direction: Retain
    @>Else
        @>Show Text: The door is locked. It smells like it needs a specific key.
    @>End
@>End
```

#### Door to Map021 (Event 12)

```
@>Conditional Branch: Switch 28 is ON
    @>Show Text: You use Smelly Key #2 to unlock the door.
    @>Plugin Command: Quest Update 9 3 Completed
    @>Transfer Player: Map021, X:3, Y:4, Direction: Retain
@>Else
    @>Conditional Branch: Has Item: Smelly Key #2 (ID: 28)
        @>Show Text: You use Smelly Key #2 to unlock the door.
        @>Control Switches: #28 = ON
        @>Plugin Command: Quest Update 9 3 Completed
        @>Transfer Player: Map021, X:3, Y:4, Direction: Retain
    @>Else
        @>Show Text: The door is locked. It smells like it needs a specific key.
    @>End
@>End
```

#### Door to Map017 (Event 16)

```
@>Conditional Branch: Switch 29 is ON
    @>Show Text: You use Smelly Key #3 to unlock the door.
    @>Plugin Command: Quest Update 9 4 Completed
    @>Transfer Player: Map017, X:3, Y:6, Direction: Retain
@>Else
    @>Conditional Branch: Has Item: Smelly Key #3 (ID: 29)
        @>Show Text: You use Smelly Key #3 to unlock the door.
        @>Control Switches: #29 = ON
        @>Plugin Command: Quest Update 9 4 Completed
        @>Transfer Player: Map017, X:3, Y:6, Direction: Retain
    @>Else
        @>Show Text: The door is locked. It smells like it needs a specific key.
    @>End
@>End
```

#### Door to Map032 (Event 13)

```
@>Conditional Branch: Switch 30 is ON
    @>Show Text: You use Smelly Key #4 to unlock the door.
    @>Plugin Command: Quest Update 9 5 Completed
    @>Transfer Player: Map032, X:2, Y:6, Direction: Retain
@>Else
    @>Conditional Branch: Has Item: Smelly Key #4 (ID: 30)
        @>Show Text: You use Smelly Key #4 to unlock the door.
        @>Control Switches: #30 = ON
        @>Plugin Command: Quest Update 9 5 Completed
        @>Transfer Player: Map032, X:2, Y:6, Direction: Retain
    @>Else
        @>Show Text: The door is locked. It smells like it needs a specific key.
    @>End
@>End
```

#### Door to Map018 (Event 14)

```
@>Conditional Branch: Switch 31 is ON
    @>Show Text: You use Smelly Key #5 to unlock the door.
    @>Plugin Command: Quest Update 9 6 Completed
    @>Transfer Player: Map018, X:2, Y:6, Direction: Retain
@>Else
    @>Conditional Branch: Has Item: Smelly Key #5 (ID: 31)
        @>Show Text: You use Smelly Key #5 to unlock the door.
        @>Control Switches: #31 = ON
        @>Plugin Command: Quest Update 9 6 Completed
        @>Transfer Player: Map018, X:2, Y:6, Direction: Retain
    @>Else
        @>Show Text: The door is locked. It smells like it needs a specific key.
    @>End
@>End
```

#### Door to Map019 (Event 15)

```
@>Conditional Branch: Switch 32 is ON
    @>Show Text: You use Smelly Key #6 to unlock the door.
    @>Plugin Command: Quest Update 9 7 Completed
    @>Transfer Player: Map019, X:3, Y:4, Direction: Retain
@>Else
    @>Conditional Branch: Has Item: Smelly Key #6 (ID: 32)
        @>Show Text: You use Smelly Key #6 to unlock the door.
        @>Control Switches: #32 = ON
        @>Plugin Command: Quest Update 9 7 Completed
        @>Transfer Player: Map019, X:3, Y:4, Direction: Retain
    @>Else
        @>Show Text: The door is locked. It smells like it needs a specific key.
    @>End
@>End
```

#### Door to Map016 (Event 26)

```
@>Conditional Branch: Switch 33 is ON
    @>Show Text: You use Smelly Key #7 to unlock the door. There's a disgusting smell coming from behind the door.
    @>Plugin Command: Quest Update 9 8 Completed
    @>Plugin Command: Quest Complete 9
    @>Transfer Player: Map016, X:4, Y:11, Direction: Retain
@>Else
    @>Conditional Branch: Has Item: Smelly Key #7 (ID: 33)
        @>Show Text: You use Smelly Key #7 to unlock the door. There's a disgusting smell coming from behind the door.
        @>Control Switches: #33 = ON
        @>Plugin Command: Quest Update 9 8 Completed
        @>Plugin Command: Quest Complete 9
        @>Transfer Player: Map016, X:4, Y:11, Direction: Retain
    @>Else
        @>Show Text: The door is locked. It smells like it needs a specific key.
    @>End
@>End
```

### Additional Key Events

Create new events for the remaining keys. Place these events throughout Timbuc Cellar in hidden or challenging locations.

#### Smelly Key #2 Event

```
@>Conditional Branch: Self Switch A is OFF
    @>Show Text: You notice something glinting behind some debris.
    @>Show Choices: [Investigate][Leave it]
        @>When [Investigate]
            @>Show Text: You found Smelly Key #2! It has a distinct, unpleasant odor.
            @>Change Items: Smelly Key #2 (ID: 28) + 1
            @>Plugin Command: Quest Update 9 3 Active
            @>Self Switch A = ON
        @>When [Leave it]
            @>Show Text: You decide to leave it alone for now.
        @>Branch End
@>Else
    @>Show Text: You've already searched this area.
@>End
```

#### Smelly Key #3 Event

```
@>Conditional Branch: Self Switch A is OFF
    @>Show Text: You notice something shiny in a puddle of murky water.
    @>Show Choices: [Reach in][Leave it]
        @>When [Reach in]
            @>Show Text: You found Smelly Key #3! It has a distinct, unpleasant odor.
            @>Change Items: Smelly Key #3 (ID: 29) + 1
            @>Plugin Command: Quest Update 9 4 Active
            @>Self Switch A = ON
        @>When [Leave it]
            @>Show Text: You decide to leave it alone for now.
        @>Branch End
@>Else
    @>Show Text: You've already searched this area.
@>End
```

#### Smelly Key #4 Event

```
@>Conditional Branch: Self Switch A is OFF
    @>Show Text: You notice something metallic inside a decaying crate.
    @>Show Choices: [Open crate][Leave it]
        @>When [Open crate]
            @>Show Text: You found Smelly Key #4! It has a distinct, unpleasant odor.
            @>Change Items: Smelly Key #4 (ID: 30) + 1
            @>Plugin Command: Quest Update 9 5 Active
            @>Self Switch A = ON
        @>When [Leave it]
            @>Show Text: You decide to leave it alone for now.
        @>Branch End
@>Else
    @>Show Text: You've already searched this crate.
@>End
```

#### Smelly Key #5 Event

```
@>Conditional Branch: Self Switch A is OFF
    @>Show Text: You notice something hidden in a crack in the wall.
    @>Show Choices: [Reach in][Leave it]
        @>When [Reach in]
            @>Show Text: You found Smelly Key #5! It has a distinct, unpleasant odor.
            @>Change Items: Smelly Key #5 (ID: 31) + 1
            @>Plugin Command: Quest Update 9 6 Active
            @>Self Switch A = ON
        @>When [Leave it]
            @>Show Text: You decide to leave it alone for now.
        @>Branch End
@>Else
    @>Show Text: You've already searched this crack.
@>End
```

#### Smelly Key #6 Event

```
@>Conditional Branch: Self Switch A is OFF
    @>Show Text: You notice something buried in a pile of trash.
    @>Show Choices: [Dig through trash][Leave it]
        @>When [Dig through trash]
            @>Show Text: You found Smelly Key #6! It has a distinct, unpleasant odor.
            @>Change Items: Smelly Key #6 (ID: 32) + 1
            @>Plugin Command: Quest Update 9 7 Active
            @>Self Switch A = ON
        @>When [Leave it]
            @>Show Text: You decide to leave it alone for now.
        @>Branch End
@>Else
    @>Show Text: You've already searched this pile of trash.
@>End
```

#### Smelly Key #7 Event

```
@>Conditional Branch: Self Switch A is OFF
    @>Show Text: You notice something strange in a nest of mutated rats.
    @>Show Choices: [Investigate][Leave it]
        @>When [Investigate]
            @>Battle Processing: Troop 15 (Mutated Rats), Can Escape = OFF, Can Lose = OFF
            @>If Win
                @>Show Text: You defeated the mutated rats and found Smelly Key #7! It has a distinct, unpleasant odor.
                @>Change Items: Smelly Key #7 (ID: 33) + 1
                @>Plugin Command: Quest Update 9 8 Active
                @>Self Switch A = ON
            @>End
        @>When [Leave it]
            @>Show Text: You decide to leave the rats alone for now.
        @>Branch End
@>Else
    @>Show Text: The empty rat nest remains.
@>End
```

## Switch Documentation

Update the docs/reference/database/MegaEarth2049_Quest_Switch_Documentation.md file to include the following entries:

```markdown
| Switch ID | Name/Purpose | Used In | Description | Notes |
|-----------|--------------|---------|-------------|-------|
| 12 | Door Key - Map020 | Map015.json (Event 21) | Unlocks door to Map020 | Used with Smelly Keys quest |
| 28 | Door Key - Map021 | Map015.json (Event 12) | Unlocks door to Map021 | Used with Smelly Keys quest |
| 29 | Door Key - Map017 | Map015.json (Event 16) | Unlocks door to Map017 | Used with Smelly Keys quest |
| 30 | Door Key - Map032 | Map015.json (Event 13) | Unlocks door to Map032 | Used with Smelly Keys quest |
| 31 | Door Key - Map018 | Map015.json (Event 14) | Unlocks door to Map018 | Used with Smelly Keys quest |
| 32 | Door Key - Map019 | Map015.json (Event 15) | Unlocks door to Map019 | Used with Smelly Keys quest |
| 33 | Door Key - Map016 | Map015.json (Event 26) | Unlocks door to Map016 | Used with Smelly Keys quest |
| 60 | Smelly Keys Quest Active | Map015.json | Tracks if the Smelly Keys quest is active | Set when player finds first key |
```

## Testing Checklist

1. **Quest Start**:
   - [ ] Find Smelly Key #1 in Event 27
   - [ ] Verify quest is added to journal
   - [ ] Verify first objective is marked as completed
   - [ ] Verify second objective is marked as active

2. **Door Unlocking**:
   - [ ] Use Smelly Key #1 to unlock door to Map020
   - [ ] Verify second objective is marked as completed
   - [ ] Repeat for all doors and keys

3. **Quest Completion**:
   - [ ] Unlock all doors
   - [ ] Verify all objectives are marked as completed
   - [ ] Verify quest is marked as completed

4. **Edge Cases**:
   - [ ] Try to open doors without keys
   - [ ] Try to use wrong keys on doors
   - [ ] Try to collect keys multiple times
   - [ ] Save and load game during quest

## Known Issues

1. **Key Placement**: The exact locations for keys 2-7 need to be determined based on map layout and difficulty progression.

2. **Reward Distribution**: The specific rewards in each unlocked area need to be determined and implemented.

3. **Quest Progression**: If a player somehow obtains keys out of order, they may be able to skip parts of the quest. This is acceptable as it rewards exploration.

4. **Door Text**: The door text could be improved to give more specific hints about which key is needed.
