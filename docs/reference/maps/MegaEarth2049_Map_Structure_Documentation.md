> Reference snapshot: verify IDs, effects and enabled-plugin behavior against the live data and current FAQs. This relocation does not certify the older catalog as current.

# MegaEarth2049 Map Structure Documentation

This document provides detailed information about the map structure in MegaEarth2049, focusing on the `MapInfos.json` file and how it establishes the game world's hierarchy, navigation, and quest progression.

## 1. MapInfos.json Structure

The `MapInfos.json` file is a critical component of RPG Maker MV projects, serving as a directory that organizes all maps in the game. Each entry in this file contains:

```json
{
  "id": 1,
  "name": "Map Name",
  "order": 1,
  "parentId": 0,
  "scrollX": 816,
  "scrollY": 624,
  "expanded": true
}
```

Where:
- **id**: Unique identifier for the map
- **name**: Display name shown in the editor
- **order**: Position in the map list
- **parentId**: ID of the parent map (0 = root level)
- **scrollX/scrollY**: Default scroll position
- **expanded**: Whether the map is expanded in the editor view

## 2. MegaEarth2049 World Hierarchy

The game world is organized in a hierarchical structure with Map001 (Mega Earth) as the root map. This hierarchy creates a logical organization of locations:

### 2.1 Root Level (parentId: 0)
- **Map001**: Mega Earth (Main World Map)

### 2.2 Major Locations (parentId: 1)
- **Map010**: Timbuc (Starting City)
- **Map002**: Timbuc 2 (Second District)
- **Map028**: Planet Ork (Mining Planet)
- **Map039**: Planet Ting Ting (Ice/Desert Planet)
- **Map102**: Planet Needsaname (Mysterious Planet)

### 2.3 Timbuc Sub-locations (parentId: 10)
- **Map011**: Timbuc Grocery
- **Map012**: Timbuc Clinic (Jen's Location)
- **Map013**: Timbuc Bar
- **Map014**: Timbuc Weapon Shop
- **Map015**: Timbuc Cellar (Dungeon Area)

### 2.4 Timbuc Cellar Sub-locations (parentId: 15)
- **Map016**: Boss Room (Contains Trash Octopus boss)
- **Map017**: Secret Chamber (First Necklace Piece Location)

### 2.5 Floating Mansion (A.S.P. Creator's Home)
- **Map038**: Floating Mansion Entrance (parentId: 1)
- **Map039**: Floating Mansion 1st Floor (parentId: 38)
- **Map091**: Floating Mansion 2nd Floor (parentId: 39)
- **Map092**: Bedroom 1 (parentId: 91)
- **Map093**: Guest Room (parentId: 91)
- **Map094**: Study (parentId: 91)
- **Map095**: Bedroom 2 (parentId: 91)
- **Map096**: Unnamed Room (parentId: 91) - Incomplete Map

## 3. Map Connections and Navigation

Maps are connected through various transportation events:

### 3.1 World Map Navigation
- The Beanstalk Elevator (Event ID 13 in Map001) connects Mega Earth to orbital locations
- The Ship Transponder system (CommonEvent ID 1) enables travel between planets

### 3.2 City Navigation
- City entrances/exits connect major locations to the world map
- Building entrances connect exterior maps to interior maps

### 3.3 Dungeon Navigation
- Staircases and passages connect different levels of dungeons
- Teleportation devices may connect distant locations

## 4. Quest Progression Through Maps

The map structure is designed to guide quest progression in a logical sequence:

### 4.1 Main Story Path
1. **Timbuc (Map010)**: Starting location, introduction to Rex's glitches
2. **Timbuc Cellar (Map015)**: First dungeon, discovery of initial Necklace piece
3. **Timbuc 2 (Map002)**: Expansion to second district, B.M.N.E.C. infiltration
4. **Planet Ork (Map028)**: Off-world adventure, second Necklace piece
5. **Planet Ting Ting (Map039)**: Further exploration, additional story elements
6. **Floating Mansion (Maps 038-041)**: Final area, confrontation with A.S.P.

### 4.2 Side Quest Locations
- **Engine Quest**: Components scattered across multiple maps
- **Smelly Keys**: Hidden throughout Timbuc (Map010) and sub-locations
- **Zed's Treatments**: Centered in Timbuc Clinic (Map012)

## 5. Incomplete Maps and Development Opportunities

Several maps in the game are incomplete or underdeveloped, presenting opportunities for expansion:

### 5.1 Identified Incomplete Maps
- **Map096**: Unnamed room in Floating Mansion 2nd Floor
- **Map102**: Planet Needsaname (minimal development)
- **Map039**: Portions of Planet Ting Ting

### 5.2 Development Considerations
When developing these incomplete maps, consider:
- Their position in the map hierarchy
- Logical connections to surrounding maps
- Thematic consistency with their parent locations
- Potential quest integration opportunities

## 6. Map-Based Encounter Design

Enemy encounters are defined at the map level through the encounterList property:

### 6.1 Encounter Structure
```json
"encounterList": [
  {
    "troopId": 1,
    "weight": 10,
    "regionSet": [0]
  },
  {
    "troopId": 2,
    "weight": 5,
    "regionSet": [0]
  }
]
```

Where:
- **troopId**: References a specific enemy group from Troops.json
- **weight**: Relative probability of this encounter occurring
- **regionSet**: Map regions where this encounter can occur (0 = anywhere)

### 6.2 Region-Specific Encounters
Maps can define different encounters for specific regions:
- Urban areas might feature Punks and Thugs
- Sewers might contain Rats and Mutant Plants
- Corporate areas might have Security Forces and Drones

## 7. Map Events and Storytelling

Maps use events to tell stories and create interactive experiences:

### 7.1 Event Types by Location
- **Timbuc (Map010)**: Character introduction events, quest givers
- **Timbuc Cellar (Map015)**: Puzzle events, enemy encounters
- **Floating Mansion (Maps 038-041)**: Story revelation events, climactic sequences

### 7.2 Event Page Conditions
Events use page conditions to change based on:
- Switches that track story progress
- Variables that count collected items
- Party members present
- Items possessed

## 8. Creating New Maps

When creating new maps for MegaEarth2049:

### 8.1 Technical Requirements
1. Create a new entry in MapInfos.json with a unique ID
2. Create the corresponding MapXXX.json file
3. Set appropriate parentId to place it in the hierarchy
4. Establish connections to existing maps through events

### 8.2 Design Considerations
- Maintain visual consistency with parent locations
- Consider the map's purpose in gameplay and storytelling
- Balance encounter difficulty with expected player progression
- Include appropriate treasures and rewards

## 9. Example: Completing Map096

As an example of how to develop an incomplete map, let's consider Map096 (unnamed room in Floating Mansion):

### 9.1 Context Analysis
- Located on the 2nd floor of the Floating Mansion
- Near the Study and Bedrooms
- Connected to the A.S.P. creator's storyline

### 9.2 Potential Development
- **Name**: "Hidden Laboratory" or "A.S.P. Development Room"
- **Purpose**: Reveal crucial information about A.S.P.'s creation
- **Key Events**: 
  - Research terminal containing creator's logs
  - Prototype device that can temporarily disable A.S.P. drones
  - Hidden Necklace component or enhancement

### 9.3 Integration with Main Story
- Requires finding a hidden key in the Study (Map094)
- Provides context for the final confrontation with A.S.P.
- Offers optional but valuable assistance for the endgame

## 10. Conclusion

The map structure in MegaEarth2049 creates a coherent world that supports the game's cyberpunk narrative and quest design. By understanding the hierarchical organization of maps and their interconnections, AI assistants can effectively create new content that integrates seamlessly with the existing game world.

When developing new maps or completing incomplete ones, always consider their position in the hierarchy, their thematic relationship to surrounding areas, and their role in advancing the game's storylines and themes.
