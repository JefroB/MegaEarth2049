> Historical document retained for provenance. Its commands, IDs and completion claims may be superseded. Use the current FAQs, roadmap and maintained tools for current behavior.

# Ninja Recruitment Quest Implementation

This document provides detailed information about the implementation of the Ninja Recruitment quest in MegaEarth2049.

## 1. Quest Overview

The Ninja Recruitment quest is a character recruitment quest that allows the player to recruit a Pink Ninja character after defeating various ninja types on Church Street in Timbuc 2. The quest is designed to progressively reveal itself as the player encounters and defeats different ninja types.

## 2. Quest Details

- **Quest ID**: 7
- **Category**: 4 (Character Quests)
- **Difficulty**: 3
- **From**: Church Street
- **Location**: Timbuc 2 - Church Street
- **Description**: You've encountered ninjas on Church Street. Defeat different colored ninjas to learn about their clan and potentially recruit them to your cause.
- **Objectives**:
  1. Defeat a Green Ninja
  2. Defeat a Brown Ninja
  3. Defeat a Blue Ninja
  4. Defeat the Pink Ninja leader
- **Rewards**:
  - Pink Ninja joins your party
  - Access to ninja techniques
- **Subtext**: The ninjas seem to be testing your combat abilities before deciding whether to join you.
- **Quotes**:
  - "A test of will, and you have endured." - Pink Ninja
  - "Our clan values strength and honor. You have demonstrated both." - Ninja Master

## 3. Implementation Details

### 3.1 Quest Journal Integration

The quest has been added to the YEP_QuestJournal.js file as Quest 7. This makes it available in the quest journal system once it's activated through plugin commands.

### 3.2 Ninja Encounters

The quest involves encounters with different ninja types on Church Street (Map005):

- **Green Ninja** (Troop ID 9)
- **Brown Ninja** (Troop ID 10)
- **Blue Ninja** (Troop ID 11)
- **Pink Ninja** (Troop ID 15)

### 3.3 Quest Progression

The quest progression is designed to work as follows:

1. **Initial Discovery**: The quest should not appear in the journal until the player has defeated at least two different ninja types.
2. **Objective Completion**: Each ninja type defeated should complete the corresponding objective.
3. **Final Challenge**: Defeating the Pink Ninja leader completes the quest and recruits the character.

### 3.4 Required Plugin Commands

To implement this quest progression, the following plugin commands need to be added to the appropriate battle events:

#### After defeating the second ninja type:
```
Quest Add 7
```

#### After defeating a Green Ninja:
```
Quest SetObjective 7 1 complete
```

#### After defeating a Brown Ninja:
```
Quest SetObjective 7 2 complete
```

#### After defeating a Blue Ninja:
```
Quest SetObjective 7 3 complete
```

#### After defeating the Pink Ninja:
```
Quest SetObjective 7 4 complete
Quest Complete 7
```

### 3.5 Character Recruitment

The Pink Ninja (Actor ID 7) is recruited through the battle event in Troop ID 15. The event already contains the code to add the character to the party:

```
{"code":129,"indent":1,"parameters":[7,0,false]}
```

This code adds Actor ID 7 to the party when the Pink Ninja is defeated.

## 4. Implementation Guide

To fully implement this quest, the following steps should be taken:

### 4.1 Update Troop Battle Events

#### Green Ninja (Troop ID 9)
Add a battle event that checks if the enemy is defeated and then executes:
```
Plugin Command: Quest SetObjective 7 1 complete
```
If this is the second ninja type defeated, also add:
```
Plugin Command: Quest Add 7
```

#### Brown Ninja (Troop ID 10)
Add a battle event that checks if the enemy is defeated and then executes:
```
Plugin Command: Quest SetObjective 7 2 complete
```
If this is the second ninja type defeated, also add:
```
Plugin Command: Quest Add 7
```

#### Blue Ninja (Troop ID 11)
Add a battle event that checks if the enemy is defeated and then executes:
```
Plugin Command: Quest SetObjective 7 3 complete
```
If this is the second ninja type defeated, also add:
```
Plugin Command: Quest Add 7
```

#### Pink Ninja (Troop ID 15)
The Pink Ninja battle event already contains code to add the character to the party. Add the following plugin commands:
```
Plugin Command: Quest SetObjective 7 4 complete
Plugin Command: Quest Complete 7
```

### 4.2 Add Switch for Tracking

To track which ninja types have been defeated, create switches:
- Switch 101: Green Ninja Defeated
- Switch 102: Brown Ninja Defeated
- Switch 103: Blue Ninja Defeated
- Switch 104: Pink Ninja Defeated
- Switch 105: Ninja Quest Added to Journal

Use these switches to determine when to add the quest to the journal (after defeating two different ninja types).

### 4.3 Update Map005 (Church Street)

Add an event to Map005 that checks if the player has defeated at least two different ninja types but hasn't yet added the quest to the journal:

```
If: Switch 101 ON AND Switch 102 ON AND Switch 105 OFF
  Plugin Command: Quest Add 7
  Set Switch 105 ON
Else If: Switch 101 ON AND Switch 103 ON AND Switch 105 OFF
  Plugin Command: Quest Add 7
  Set Switch 105 ON
Else If: Switch 102 ON AND Switch 103 ON AND Switch 105 OFF
  Plugin Command: Quest Add 7
  Set Switch 105 ON
End If
```

## 5. Testing

To test the quest implementation:
1. Visit Church Street in Timbuc 2
2. Encounter and defeat different ninja types
3. Check that the quest appears in the journal after defeating two different ninja types
4. Verify that each objective is completed when the corresponding ninja type is defeated
5. Defeat the Pink Ninja and confirm that it joins the party
6. Verify that the quest is marked as complete in the journal

## 6. Notes

- The Pink Ninja is Actor ID 7 in the game
- The quest is designed to be discovered through gameplay rather than being given by an NPC
- The quest rewards include both a new party member and access to ninja techniques
