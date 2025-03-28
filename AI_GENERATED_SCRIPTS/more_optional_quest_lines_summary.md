# More Optional Quest Lines for MegaEarth 2049

This document summarizes the 11 new optional quest lines and 30 NPCs added to MegaEarth 2049.

## Quest Lines Overview

| # | Quest Line | Description | Final Reward |
|---|------------|-------------|--------------|
| 1 | Wasteland Radio Network | Help establish a network of radio stations across the wasteland to connect isolated communities. | Radio Transmitter Backpack (Increases communication range with allies) |
| 2 | Wasteland Botanical Gardens | Help restore and protect rare plant species that survived the apocalypse. | Seedbomb Grenades (Temporarily creates difficult terrain for enemies) |
| 3 | Wasteland Olympics | Help organize and compete in the first post-apocalyptic Olympic Games. | Olympic Torch (Weapon that deals fire damage and boosts team morale) |
| 4 | Wasteland Trading Caravan | Join a trading caravan that travels between settlements, dealing with raiders and making profitable trades. | Caravan Leader's Hat (Increases trade prices and charisma) |
| 5 | Wasteland University | Help establish a new center of learning in the wasteland, collecting lost knowledge and teaching the next generation. | Scholar's Monocle (Reveals enemy weaknesses and hidden information) |
| 6 | Wasteland Theater Troupe | Join a traveling theater group that brings entertainment and cultural preservation to the wasteland. | Dramatic Mask (Can temporarily charm enemies or create distractions) |
| 7 | Wasteland Museum of History | Help collect and preserve artifacts from before the collapse to remember the old world. | Historian's Journal (Provides hints about hidden locations and treasures) |
| 8 | Wasteland Culinary Competition | Participate in a cooking contest using wasteland ingredients to create new cuisine. | Master Chef's Knife Set (Weapon with bonus against organic enemies and food crafting bonuses) |
| 9 | Wasteland Fashion | Help establish a new fashion trend in the wasteland using recycled materials. | Wasteland Couture Outfit (Provides charisma bonus and temperature resistance) |
| 10 | Wasteland Hot Springs Resort | Help establish a neutral relaxation zone where wasteland factions can find peace. | Thermal Water Flask (Provides healing and radiation resistance) |
| 11 | Wasteland Film Festival | Help organize a film festival showcasing pre-war classics and new wasteland productions. | Projector Drone (Creates distracting illusions in combat) |

## NPCs Added

### Wasteland Radio Network
1. **DJ Frequency** (Map002) - Starting NPC, wants to establish a radio network to connect communities
2. **Signal Technician** (Map006) - Former emergency broadcast system technician with transmitter expertise
3. **Voice of the Wastes** (Map017) - Storyteller collecting tales from across the wasteland
4. **Wasteland Musician** (Map008) - Collects instruments and teaches music to spread through the radio network

### Wasteland Botanical Gardens
5. **Dr. Bloom** (Map007) - Starting NPC, botanist preserving plant species that survived the apocalypse
6. **Seed Keeper** (Map027) - Has preserved seed samples for fifteen years in an underground bunker
7. **Botanical Researcher** (Map041) - Studies plant mutations that could be key to survival

### Wasteland Olympics
8. **Coach Ironheart** (Map015) - Starting NPC, organizing the first Wasteland Olympics
9. **Former Athlete** (Map038) - Olympic gold medalist from before the collapse
10. **Event Coordinator** (Map004) - Experienced international event organizer mapping competition venues

### Wasteland Trading Caravan
11. **Caravan Master Zeke** (Map008) - Starting NPC, leads the Long Road Caravan between settlements
12. **Guard Captain** (Map003) - Veteran caravan guard with twelve years of experience
13. **Master Trader** (Map013) - Expert in rare goods trading with connections in every settlement

### Wasteland University
14. **Professor Wisdom** (Map009) - Starting NPC, establishing a new university in the wasteland
15. **Librarian** (Map009) - Cataloging surviving books and preserving knowledge
16. **Young Scholar** (Map004) - Self-taught student recruiting others who want to learn

### Wasteland Theater Troupe
17. **Director Dramatique** (Map012) - Starting NPC, leads the Wasteland Players performing troupe
18. **Prop Master** (Map025) - Creates props from junk for theatrical productions

### Wasteland Museum of History
19. **Curator Maxwell** (Map013) - Starting NPC, collecting artifacts from before the collapse
20. **Relic Hunter** (Map005) - Salvages pre-war technology and historical items

### Wasteland Culinary Competition
21. **Chef Gusteau** (Map010) - Starting NPC, organizing the Great Wasteland Cook-Off
22. **Ingredient Forager** (Map007) - Finds rare edible ingredients in dangerous locations
23. **Food Critic** (Map008) - Maintains culinary standards even after the apocalypse

### Wasteland Fashion
24. **Designer Chic** (Map013) - Starting NPC, creating a fashion line from recycled materials
25. **Fabric Scavenger** (Map026) - Collects usable textiles from abandoned factories

### Wasteland Hot Springs Resort
26. **Spa Manager Serene** (Map016) - Starting NPC, discovered healing hot springs
27. **Security Consultant** (Map003) - Designing security systems for the neutral zone
28. **Healing Waters Chemist** (Map010) - Analyzing the springs' therapeutic properties

### Wasteland Film Festival
29. **Director Reels** (Map012) - Starting NPC, preserving films and organizing a festival
30. **Film Preservationist** (Map027) - Storing and digitizing film reels in controlled conditions

## Implementation Details

All NPCs have been successfully added to their respective maps using the JSON tools to ensure data integrity. Each NPC has:

- Unique dialogue related to their quest line
- Proper placement on their designated map
- Event data stored in the temp_events directory

The implementation process included:

1. Creating quest line and NPC data in JavaScript files
2. Validating all JSON files before adding NPCs
3. Creating NPC events with appropriate dialogue and appearance
4. Adding NPCs to their respective maps
5. Validating all JSON files after adding NPCs to ensure data integrity

All JSON files remain valid after the additions, with automatic backups created for each modified file.

## How to Access

To see the NPCs in-game:
1. Load the game
2. Visit the locations specified for each NPC
3. Interact with them to start their respective quest lines

Note: Quest progression is tied to game switches and variables that will need to be set up for full quest functionality.
