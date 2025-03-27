# MegaEarth 2049 - Level 34 and 35 Quests

This document provides a summary of the quests added for character levels 34 and 35 in MegaEarth 2049.

## Level 34 Quest: Digital Whispers (Snowy Village)

### Location
- **Map**: Map047.json (Snowy Village on Planet Ting Ting)

### Quest Giver
- **Name**: Frost Oracle
- **Location**: Coordinates (20, 20) in the Snowy Village
- **Appearance**: Female character from People1 character set (index 7)

### Quest Overview
The Frost Oracle senses a disturbance in the digital aether and asks the player to investigate ancient technology buried beneath the snow. This technology is related to A.S.P.'s early development on Planet Ting Ting.

### Quest Objectives
1. Find three frozen data crystals hidden throughout the Snowy Village:
   - **Crystal 1**: Located at coordinates (15, 10)
   - **Crystal 2**: Located at coordinates (25, 15)
   - **Crystal 3**: Located at coordinates (10, 25)

2. Return to the Frost Oracle with all three crystals to learn about A.S.P.'s origins.

### Quest Rewards
- **Neural Amplifier**: An item that enhances neural capabilities and provides protection against digital intrusion.
  - Effects: +5% to various stats
  - This item is required for the level 35 quest

### Quest Progression
1. Talk to the Frost Oracle to start the quest (activates switch 34)
2. Find the three data crystals (increments variable 34 for each crystal found)
3. Return to the Frost Oracle with all three crystals
4. Receive the Neural Amplifier and information about A.S.P.'s origins
5. The quest completes and leads into the level 35 quest (activates switch 35)

### Quest Dialogue Highlights
- **Frost Oracle (Initial)**: "I sense a disturbance in the digital aether. The ancient technology buried beneath the snow is awakening. It calls to you..."
- **Data Crystal 1**: "The crystal contains fragmented data about an early A.I. experiment conducted on Planet Ting Ting decades ago."
- **Data Crystal 2**: "The crystal contains research notes about neural integration technology and early prototypes of what would become A.S.P."
- **Data Crystal 3**: "The crystal contains coordinates and security protocols for accessing the abandoned space station where A.S.P. was further developed."
- **Frost Oracle (Completion)**: "This confirms my suspicions. A.S.P. was first tested here on Ting Ting before being moved to the abandoned space station."

## Level 35 Quest: Alien Origins (Asteroid Belt & Space Station)

### Location
- **Map**: Map103.json (Asteroid Belt) leading to Map104.json (Abandoned Space Station)

### Quest Giver
- **Name**: Stranded Researcher
- **Location**: Coordinates (15, 15) in the Asteroid Belt
- **Appearance**: Male character from Actor3 character set (index 2)

### Quest Overview
The Stranded Researcher is trying to establish a connection with the abandoned space station but is experiencing interference. With the player's Neural Amplifier (from the level 34 quest), the researcher can boost their signal and detect three alien artifacts scattered throughout the station.

### Quest Objectives
1. Talk to the Stranded Researcher with the Neural Amplifier
2. Travel to the Abandoned Space Station (Map104)
3. Find the three alien artifacts (this connects to the existing quest in Map104)

### Quest Progression
1. Complete the level 34 quest to obtain the Neural Amplifier
2. Talk to the Stranded Researcher in the Asteroid Belt (activates switch 17)
3. Travel to the Abandoned Space Station
4. Find the three alien artifacts (as per the existing quest in Map104)
5. Return to the Holographic Scientist in the Space Station to combine the artifacts

### Quest Dialogue Highlights
- **Stranded Researcher (Initial)**: "Sorry, I can't talk right now. I'm trying to establish a connection with the abandoned space station. Something's interfering..."
- **Stranded Researcher (With Neural Amplifier)**: "You have a Neural Amplifier? That's exactly what I need! With this, I can boost my signal and get a clear scan of the space station."
- **Stranded Researcher (After Scan)**: "I'm detecting three alien artifacts scattered throughout the station. They're emitting an energy signature similar to A.S.P., but much older. They could be the source technology!"

## Technical Implementation

The quests were implemented using the following files:

1. **add_quests.js**: Script that creates the event files in the temp_events directory
2. **add_events_to_maps.js**: Script that attempts to add the events to the maps

### Event Files
The following event files were created in the temp_events directory:

- **level34_quest_giver.json**: The Frost Oracle NPC for the level 34 quest
- **data_crystal1.json**: The first data crystal for the level 34 quest
- **data_crystal2.json**: The second data crystal for the level 34 quest
- **data_crystal3.json**: The third data crystal for the level 34 quest
- **level35_quest_npc.json**: The Stranded Researcher NPC for the level 35 quest

### Game Variables and Switches
The quests use the following variables and switches:

- **Switch 34**: Activated when the level 34 quest is started
- **Variable 34**: Counts the number of data crystals found (incremented for each crystal)
- **Switch 35**: Activated when the level 34 quest is completed and the level 35 quest becomes available
- **Switch 17**: Activated when the level 35 quest is started (connects to the existing Space Station quest)

## Story Integration

These quests integrate with the MegaEarth 2049 story by:

1. Revealing A.S.P.'s origins on Planet Ting Ting
2. Connecting to the existing Space Station quest
3. Providing a narrative bridge between the player's adventures on Planet Ting Ting and their exploration of the Abandoned Space Station
4. Introducing the concept of alien technology as the source of A.S.P.'s capabilities

The quests follow the cyberpunk themes of the game, with elements of corporate experimentation, rogue A.I., and ancient alien technology. They also maintain the game's quirky and often humorous tone while advancing the main storyline.
