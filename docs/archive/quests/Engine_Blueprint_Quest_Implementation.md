> Historical document retained for provenance. Its commands, IDs and completion claims may be superseded. Use the current FAQs, roadmap and maintained tools for current behavior.

# Engine Blueprint Quest Implementation Guide

This document provides a comprehensive guide for implementing the "Engine Blueprint Quest" in MegaEarth2049. This quest involves helping an Armatek engineer by collecting engine components to build a revolutionary engine design.

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

The Engine Blueprint Quest is a collection quest where players help an Armatek engineer by finding three components needed to build a revolutionary engine. The quest begins when the player speaks with the engineer in Timbuc Cellar, who gives them an Engine Blueprint and tasks them with finding the three components in different locations.

## Quest Parameters

- **Quest Name**: The Engine Reconstruction
- **Quest ID**: 10
- **Category**: 2 (Side Quest)
- **Difficulty**: 3
- **Description**: An Armatek engineer needs your help to reconstruct an advanced engine. The components are scattered across different locations, and you'll need to find them all to complete the engine.
- **Objectives**:
  1. Obtain the engine blueprint from the Armatek engineer
  2. Find Component A at the construction site
  3. Find Component B from a malfunctioning A.S.P. drone
  4. Find Component C from the Armatek office
  5. Return all components to the engineer
- **Rewards**:
  - Advanced Engine (Key Item)
  - Engineering skill increase
  - 500 credits

## Quest Flow

1. **Starting Point**: The quest begins when the player speaks with the Armatek engineer (Events 28-29) in Timbuc Cellar (Map015.json).
2. **Blueprint Acquisition**: The player receives the Engine Blueprint (Item ID: 128) from the engineer.
3. **Component Collection**: The player must find the three components in different locations:
   - Component A at the construction site
   - Component B from a malfunctioning A.S.P. drone
   - Component C from the Armatek office
4. **Completion**: The player returns to the engineer with all three components to complete the quest.

## Required Resources

### Maps
- Map015.json (Timbuc Cellar) - Location of the Armatek engineer
- Construction Site Map - Location of Component A
- A.S.P. Drone Location Map - Location of Component B
- Armatek Office Map - Location of Component C

### Items
- Engine Blueprint (Item ID: 128) - Given by the engineer
- Engine Component A (Item ID: 129) - Found at the construction site
- Engine Component B (Item ID: 130) - Found from a malfunctioning A.S.P. drone
- Engine Component C (Item ID: 131) - Found in the Armatek office
- Advanced Engine (Item ID: 132) - Reward for completing the quest

### Switches
- Switch 61 - Engine Blueprint Quest Active
- Switch 62 - Engine Blueprint Obtained
- Switch 63 - Component A Found
- Switch 64 - Component B Found
- Switch 65 - Component C Found
- Switch 66 - All Components Found
- Switch 67 - Engine Blueprint Quest Completed

### Events
- Events 28-29 - Armatek Engineer in Timbuc Cellar
- New Event - Component A at the construction site
- New Event - Component B from a malfunctioning A.S.P. drone
- New Event - Component C in the Armatek office

## YEP_QuestJournal Integration

### Quest Entry

Update the QuestData section in YEP_QuestJournal.js to include the following entry:

```javascript
Quest 10: The Engine Reconstruction
Category: 2
Difficulty: 3
From: Armatek Engineer in Timbuc Cellar
Location: Various locations
Description: An Armatek engineer needs your help to reconstruct an advanced engine. The components are scattered across different locations, and you'll need to find them all to complete the engine.
Objectives:
- Obtain the engine blueprint from the Armatek engineer
- Find Component A at the construction site
- Find Component B from a malfunctioning A.S.P. drone
- Find Component C from the Armatek office
- Return all components to the engineer
Rewards:
- Advanced Engine (Key Item)
- Engineering skill increase
- 500 credits
Subtext: This engine design seems unusually advanced for current technology. The engineer believes it could revolutionize transportation in the wasteland.
Quotes:
- "With this engine, we could revolutionize transportation in the wasteland." - Armatek Engineer
- "I haven't seen technology like this since before the collapse." - Zed
```

## Event Implementation

### Engineer Event (Events 28-29)

Update Events 28-29 in Map015.json to include quest journal integration:

```
@>Conditional Branch: Switch 67 is OFF (Engine Blueprint Quest Not Completed)
    @>Conditional Branch: Switch 61 is OFF (Engine Blueprint Quest Not Active)
        @>Show Text: \C[6]Engineer:\C[0] Hey there! I'm an Armatek engineer working on a revolutionary engine design, but I've got a problem with some corporate spies.
        @>Show Choices: [Offer to help][Not interested]
            @>When [Offer to help]
                @>Show Text: \C[6]Engineer:\C[0] Excellent! First, I need you to find the blueprint. It should be in the old archives in the Corporate District.
                @>Show Text: \C[6]Engineer:\C[0] Wait, I actually have a copy right here. Take this blueprint and help me find the components.
                @>Change Items: Engine Blueprint (ID: 128) + 1
                @>Control Switches: #61 (Engine Blueprint Quest Active) = ON
                @>Control Switches: #62 (Engine Blueprint Obtained) = ON
                @>Plugin Command: Quest Add 10
                @>Plugin Command: Quest Update 10 1 Completed
                @>Plugin Command: Quest Update 10 2 Active
                @>Plugin Command: Quest Update 10 3 Active
                @>Plugin Command: Quest Update 10 4 Active
                @>Show Text: \C[6]Engineer:\C[0] You'll need to find three components to build this engine. One is at the construction site, another can be salvaged from a malfunctioning A.S.P. drone, and the last one is in the Armatek office.
            @>When [Not interested]
                @>Show Text: \C[6]Engineer:\C[0] Well, if you change your mind, you know where to find me.
            @>Branch End
    @>Else
        @>Conditional Branch: Switch 66 is ON (All Components Found)
            @>Show Text: \C[6]Engineer:\C[0] You found all the components! Let's put this engine together!
            @>Change Items: Engine Component A (ID: 129) - 1
            @>Change Items: Engine Component B (ID: 130) - 1
            @>Change Items: Engine Component C (ID: 131) - 1
            @>Change Items: Advanced Engine (ID: 132) + 1
            @>Change Gold: + 500
            @>Control Switches: #67 (Engine Blueprint Quest Completed) = ON
            @>Plugin Command: Quest Update 10 5 Completed
            @>Plugin Command: Quest Complete 10
            @>Show Text: \C[6]Engineer:\C[0] It works! This engine will revolutionize transportation. As promised, here's something for your trouble.
        @>Else
            @>Show Text: \C[6]Engineer:\C[0] Have you found all the components yet?
            @>Conditional Branch: Switch 63 is OFF (Component A Not Found)
                @>Show Text: \C[6]Engineer:\C[0] Component A should be at the construction site. Look for a large metallic cylinder.
            @>End
            @>Conditional Branch: Switch 64 is OFF (Component B Not Found)
                @>Show Text: \C[6]Engineer:\C[0] Component B can be salvaged from a malfunctioning A.S.P. drone. They're usually found in the outskirts of the city.
            @>End
            @>Conditional Branch: Switch 65 is OFF (Component C Not Found)
                @>Show Text: \C[6]Engineer:\C[0] Component C would be in the Armatek office. It's a specialized power cell.
            @>End
            @>Conditional Branch: Switch 63 is ON && Switch 64 is ON && Switch 65 is ON
                @>Control Switches: #66 (All Components Found) = ON
                @>Show Text: \C[6]Engineer:\C[0] You found all the components! Let's put this engine together!
                @>Change Items: Engine Component A (ID: 129) - 1
                @>Change Items: Engine Component B (ID: 130) - 1
                @>Change Items: Engine Component C (ID: 131) - 1
                @>Change Items: Advanced Engine (ID: 132) + 1
                @>Change Gold: + 500
                @>Control Switches: #67 (Engine Blueprint Quest Completed) = ON
                @>Plugin Command: Quest Update 10 5 Completed
                @>Plugin Command: Quest Complete 10
                @>Show Text: \C[6]Engineer:\C[0] It works! This engine will revolutionize transportation. As promised, here's something for your trouble.
            @>End
        @>End
    @>End
@>Else
    @>Show Text: \C[6]Engineer:\C[0] The engine is working perfectly! Thanks again for your help.
@>End
```

### Component A Event (Construction Site)

Create a new event at the construction site for Component A:

```
@>Conditional Branch: Switch 61 is ON && Switch 63 is OFF
    @>Show Text: You notice a large metallic cylinder partially buried under some debris.
    @>Show Choices: [Investigate][Leave it]
        @>When [Investigate]
            @>Show Text: You found Engine Component A! This appears to be the component the engineer mentioned.
            @>Change Items: Engine Component A (ID: 129) + 1
            @>Control Switches: #63 (Component A Found) = ON
            @>Plugin Command: Quest Update 10 2 Completed
            @>Self Switch A = ON
        @>When [Leave it]
            @>Show Text: You decide to leave it alone for now.
        @>Branch End
@>Else
    @>Conditional Branch: Self Switch A is ON
        @>Show Text: You've already retrieved the engine component from here.
    @>Else
        @>Show Text: A pile of construction debris. Nothing interesting here.
    @>End
@>End
```

### Component B Event (A.S.P. Drone Location)

Create a new event for the malfunctioning A.S.P. drone:

```
@>Conditional Branch: Switch 61 is ON && Switch 64 is OFF
    @>Show Text: You see a malfunctioning A.S.P. drone hovering erratically nearby.
    @>Show Choices: [Approach][Leave it]
        @>When [Approach]
            @>Show Text: The drone seems to be experiencing a critical system failure.
            @>Show Choices: [Salvage parts][Leave it]
                @>When [Salvage parts]
                    @>Battle Processing: Troop 20 (Malfunctioning Drone), Can Escape = OFF, Can Lose = OFF
                    @>If Win
                        @>Show Text: You managed to disable the drone and salvage Engine Component B!
                        @>Change Items: Engine Component B (ID: 130) + 1
                        @>Control Switches: #64 (Component B Found) = ON
                        @>Plugin Command: Quest Update 10 3 Completed
                        @>Self Switch A = ON
                    @>End
                @>When [Leave it]
                    @>Show Text: You decide it's too risky to approach the malfunctioning drone.
                @>Branch End
        @>When [Leave it]
            @>Show Text: You decide to leave the drone alone for now.
        @>Branch End
@>Else
    @>Conditional Branch: Self Switch A is ON
        @>Show Text: The disabled drone lies motionless on the ground, its valuable parts already salvaged.
    @>Else
        @>Show Text: Nothing unusual here.
    @>End
@>End
```

### Component C Event (Armatek Office)

Create a new event in the Armatek office for Component C:

```
@>Conditional Branch: Switch 61 is ON && Switch 65 is OFF
    @>Show Text: You notice a secure storage locker with the Armatek logo.
    @>Show Choices: [Try to open][Leave it]
        @>When [Try to open]
            @>Show Text: The locker is locked with a keypad.
            @>Show Choices: [Hack the keypad][Leave it]
                @>When [Hack the keypad]
                    @>Show Text: You attempt to hack the keypad...
                    @>Wait: 60 frames
                    @>Show Text: Success! The locker opens, revealing Engine Component C inside.
                    @>Change Items: Engine Component C (ID: 131) + 1
                    @>Control Switches: #65 (Component C Found) = ON
                    @>Plugin Command: Quest Update 10 4 Completed
                    @>Self Switch A = ON
                @>When [Leave it]
                    @>Show Text: You decide not to risk triggering an alarm.
                @>Branch End
        @>When [Leave it]
            @>Show Text: You decide to leave the locker alone for now.
        @>Branch End
@>Else
    @>Conditional Branch: Self Switch A is ON
        @>Show Text: The empty Armatek storage locker stands open.
    @>Else
        @>Show Text: A standard Armatek storage locker. Nothing interesting here.
    @>End
@>End
```

## Switch Documentation

Update the docs/reference/database/MegaEarth2049_Quest_Switch_Documentation.md file to include the following entries:

```markdown
| Switch ID | Name/Purpose | Used In | Description | Notes |
|-----------|--------------|---------|-------------|-------|
| 61 | Engine Blueprint Quest Active | Map015.json, Component Maps | Tracks if the Engine Blueprint quest is active | Set when player receives the blueprint |
| 62 | Engine Blueprint Obtained | Map015.json | Tracks if the player has obtained the engine blueprint | Set when the engineer gives the blueprint |
| 63 | Component A Found | Map015.json, Construction Site Map | Tracks if Component A has been found | Set when player finds Component A |
| 64 | Component B Found | Map015.json, A.S.P. Drone Location Map | Tracks if Component B has been found | Set when player finds Component B |
| 65 | Component C Found | Map015.json, Armatek Office Map | Tracks if Component C has been found | Set when player finds Component C |
| 66 | All Components Found | Map015.json | Tracks if all components have been found | Set when all three components are found |
| 67 | Engine Blueprint Quest Completed | Map015.json | Tracks if the Engine Blueprint quest is completed | Set when the quest is completed |
```

## Testing Checklist

1. **Quest Start**:
   - [ ] Talk to the Armatek engineer
   - [ ] Choose to help the engineer
   - [ ] Verify quest is added to journal
   - [ ] Verify first objective is marked as completed
   - [ ] Verify objectives 2-4 are marked as active

2. **Component Collection**:
   - [ ] Find Component A at the construction site
   - [ ] Verify objective 2 is marked as completed
   - [ ] Find Component B from the malfunctioning A.S.P. drone
   - [ ] Verify objective 3 is marked as completed
   - [ ] Find Component C in the Armatek office
   - [ ] Verify objective 4 is marked as completed

3. **Quest Completion**:
   - [ ] Return to the engineer with all components
   - [ ] Verify objective 5 is marked as completed
   - [ ] Verify quest is marked as completed
   - [ ] Verify rewards are received

4. **Edge Cases**:
   - [ ] Try to collect components before starting the quest
   - [ ] Try to complete the quest without all components
   - [ ] Try to start the quest after already finding components
   - [ ] Save and load game during quest

## Known Issues

1. **Component Locations**: The exact locations for the components need to be determined based on map layout and difficulty progression.

2. **A.S.P. Drone Battle**: The battle with the malfunctioning A.S.P. drone needs to be balanced appropriately for the player's expected level.

3. **Keypad Hacking**: Consider adding a mini-game or skill check for hacking the keypad at the Armatek office.

4. **Quest Progression**: If a player somehow obtains components out of order, they may be able to skip parts of the quest. This is acceptable as it rewards exploration.
