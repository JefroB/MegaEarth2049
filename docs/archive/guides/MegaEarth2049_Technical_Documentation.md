> Historical document retained for provenance. Its commands, IDs and completion claims may be superseded. Use the current FAQs, roadmap and maintained tools for current behavior.

# MegaEarth2049 RPG Maker MV Technical Documentation for AI Assistants

This documentation is designed to help AI assistants understand the structure and relationships between key JSON files in the MegaEarth2049 RPG Maker MV project, with a focus on how these components work together to create quests, storylines, and gameplay experiences.

## 1. Overview of Key JSON Files

### 1.1 Maps and MapInfos.json

The `MapInfos.json` file serves as a directory of all maps in the game, containing metadata about each map including:

- **id**: Unique identifier for each map
- **name**: Display name of the map
- **order**: Determines the order in maps list
- **parentId**: Establishes map hierarchy (0 = root level, other numbers = child of that map ID)
- **scrollX/scrollY**: Default scroll position
- **expanded**: Whether the map is expanded in the editor view

Individual map files (e.g., `Map001.json`, `Map002.json`, etc.) contain the actual map data:

- **autoplayBgm/autoplayBgs**: Background music/sound settings
- **bgm/bgs**: Music/sound definitions
- **displayName**: The name shown to players
- **encounterList**: Defines random enemy encounters on the map
- **width/height**: Map dimensions
- **data**: Numerical array representing tile placement
- **events**: Array of event objects that define interactions, NPCs, and story elements

In MegaEarth2049, maps are organized hierarchically with Map001 (Mega Earth) as the main world map, with various locations like Timbuc (Map010), Timbuc 2 (Map002), and different planets (Planet Ork - Map028, Planet Ting Ting - Map039, Planet Needsaname - Map102) branching off from it.

### 1.2 Tilesets.json

The `Tilesets.json` file defines the visual building blocks used to create maps:

- Contains definitions for different tile sets used throughout the game
- Associates tile IDs with specific graphics
- Defines passability and other tile properties

The tileset data is crucial for map creation and determines the visual appearance and functional properties of each map area.

### 1.3 CommonEvents.json

The `CommonEvents.json` file contains reusable event sequences that can be triggered from multiple locations:

- **id**: Unique identifier
- **name**: Name of the common event
- **trigger**: How the event is triggered (0 = none, 1 = autorun, 2 = parallel)
- **switchId**: Associated switch ID if applicable
- **list**: Array of event commands

In MegaEarth2049, common events are used for recurring mechanics like:
- The Ship Transponder system for interplanetary travel (CommonEvent ID 1)
- The Mining Event for resource gathering (CommonEvent ID 2)
- Other reusable event sequences

### 1.4 Enemies.json

The `Enemies.json` file defines all enemy characters in the game:

- **id**: Unique identifier
- **name**: Enemy name
- **battlerName**: Reference to the graphic file
- **battlerHue**: Color adjustment
- **params**: Stats array [HP, MP, ATK, DEF, MAT, MDF, AGI, LUK]
- **exp/gold**: Rewards for defeating
- **dropItems**: Items that can be obtained after battle
- **actions**: Battle actions the enemy can perform
- **traits**: Special characteristics
- **note**: Custom properties (often contains Yanfly plugin parameters)

MegaEarth2049 features a diverse enemy roster including:
- Punks (IDs 25-31): Street gang members with various weapons and abilities
- Ninjas (IDs 12-18): Members of the Digital Shadow Collective
- Mutated creatures (IDs 32-56): Rats, plants, wolves, etc.
- Drones (IDs 47-51): Corporate security robots
- Corporate security forces (IDs 67-72, 118-122)
- Alien entities (IDs 39-41)

## 2. Relationships Between Files

### 2.1 Map Hierarchy and Navigation

The `MapInfos.json` file establishes a hierarchical relationship between maps through the `parentId` property. This creates a tree structure where:

- Map001 (Mega Earth) serves as the root world map
- Major locations like Timbuc, Timbuc 2, and planets are direct children of Map001
- Buildings, dungeons, and interior spaces are children of their respective location maps

For example:
- Map010 (Timbuc) is a child of Map001
- Map011 (Timbuc Grocery) is a child of Map010
- Map015 (Timbuc Cellar) is a child of Map010
- Map016 (Boss Room) is a child of Map015

This hierarchy is crucial for understanding the spatial relationships between locations and for creating coherent quest paths.

### 2.2 Events and Map Interactions

Map events (defined in individual map files) are the primary way players interact with the game world. These events can:

- Trigger story sequences
- Initiate battles
- Provide quests
- Enable transportation between maps
- Create puzzles and challenges

Key event types in MegaEarth2049 include:
- **NPCs**: Characters like Jen, Zack, and Zed who provide quests and story progression
- **Transportation points**: Events that move players between maps (e.g., the Beanstalk Elevator in Map001)
- **Treasure chests**: Containing items, equipment, or key quest items
- **Enemy encounters**: Triggering specific battles
- **Story triggers**: Advancing the main narrative (like the Story Intro event in Map001)

### 2.3 Common Events and Reusable Mechanics

Common events (from `CommonEvents.json`) are referenced by map events to implement consistent mechanics across multiple locations. In MegaEarth2049, these include:

- **Ship Transponder system**: Allows travel between planets (CommonEvent ID 1)
- **Mining system**: For resource gathering (CommonEvent ID 2)
- **Other reusable event sequences**: For consistent gameplay mechanics

### 2.4 Encounter System and Enemy Integration

The encounter system connects maps to enemies through:

1. **Map encounterList**: Defines which enemy groups (troops) can appear on a map
2. **Troops.json** (not detailed here): Defines groups of enemies that appear together
3. **Enemies.json**: Defines the individual enemies within those groups

This creates a chain of references: Map → Troop → Enemy

For example, Map001 (Mega Earth) has an encounterList that includes various troops, each containing different combinations of enemies like Rats (ID 32), Mutant Plants (ID 4), and Thugs (ID 3).

## 3. Quest Structure and Implementation

MegaEarth2049 features several quest types that utilize these interconnected files:

### 3.1 Main Story Quests

The main storyline follows Rex's journey to understand their neural implant and confront A.S.P. This is implemented through:

- **Sequential map events**: Events that trigger based on story progression
- **Switch and variable tracking**: Game variables track story progress
- **Key item collection**: Items like the Necklace pieces that advance the plot

For example, the Necklace quest spans multiple maps, with pieces found in:
- Timbuc Cellar (Map015)
- B.M.N.E.C. (Maps 025-027)
- Planet Ork (Map028)
- Floating Mansion (Maps 038-041)

### 3.2 Side Quests

Side quests provide additional content and rewards, implemented through:

- **Independent event chains**: Events that can be completed in any order
- **Conditional event pages**: Different event behaviors based on quest progress
- **Reward distribution**: Items, equipment, or abilities granted upon completion

Examples include:
- **Engine Quest**: Collecting engine components from various locations (implemented through the Engine Completion event in Map001)
- **Smelly Keys**: Finding keys hidden throughout Timbuc
- **Zed's Treatments**: Completing tasks for cybernetic enhancements

### 3.3 Collection Quests

Collection quests involve gathering specific items, implemented through:

- **Item flags**: Tracking which items have been collected
- **Conditional events**: Changing based on collection progress
- **Reward mechanics**: Providing benefits upon completion

A prime example is the Engine Quest, where players must collect:
- Engine Blueprint
- Engine Component A
- Engine Component B
- Engine Component C

These components are then brought to the Engine Completion NPC (Event ID 10 in Map001) to create the Completed Engine.

## 4. Incomplete Maps and Quest Opportunities

MegaEarth2049 contains several incomplete maps that present opportunities for AI assistants to create new content:

### 4.1 Identifying Incomplete Maps

Incomplete maps can be identified by:
- Minimal event content
- Placeholder names (e.g., "MAP096")
- Undeveloped areas within otherwise complete maps

Notable incomplete maps include:
- Map096 (unnamed room in Floating Mansion)
- Several areas on Planet Needsaname (Map102)
- Portions of Planet Ting Ting (Map039)

### 4.2 Creating Compatible Quests

When developing new quests for incomplete maps, AI assistants should:

1. **Maintain narrative consistency**: Align with the existing cyberpunk, corporate-controlled setting
2. **Follow established quest patterns**: Use similar event structures to existing quests
3. **Utilize existing mechanics**: Leverage systems like the disease mechanics, ninja encounters, etc.
4. **Connect to main storyline**: Create meaningful ties to the A.S.P. conflict and character motivations

### 4.3 Key Item Integration

New quests should incorporate key items that:
- Have clear purposes within the quest
- Connect to existing item systems
- Provide meaningful rewards

For example, the Engine Quest and Necklace Quest both use key items as central collection objectives, with significant rewards upon completion.

## 5. Best Practices for AI Quest Creation

### 5.1 Analyzing Existing Patterns

Before creating new content, analyze:
- **Event structures**: How existing quests are implemented
- **Dialogue patterns**: The tone and style of character interactions
- **Reward balance**: Appropriate rewards for quest difficulty

The existing events in Map001 provide excellent templates for quest design, particularly:
- The Engine Completion event (ID 10)
- The Alien Encounter event (ID 11)
- The Beanstalk Elevator event (ID 13)

### 5.2 Maintaining Thematic Consistency

MegaEarth2049 has a distinct tone combining:
- Cyberpunk dystopia
- Corporate satire
- Body horror comedy
- Existential questions about humanity

New content should maintain this tone while exploring these themes, as seen in the story elements and dialogue throughout the existing events.

### 5.3 Technical Implementation Guidelines

When designing new map events:
- Use conditional branches to check quest progress
- Implement appropriate switches and variables
- Create engaging dialogue with meaningful choices
- Balance challenge and reward

The Engine Completion event (ID 10 in Map001) demonstrates effective use of conditional branches to check for collected items and provide appropriate responses.

### 5.4 Quest Integration Checklist

✓ Does the quest fit the game's cyberpunk setting?
✓ Does it connect to existing storylines or characters?
✓ Does it utilize established game mechanics?
✓ Does it provide appropriate rewards?
✓ Does it maintain the game's satirical, often absurd tone?

## 6. Specific File Modification Guidelines

### 6.1 Adding New Map Events

To add new events to incomplete maps:
1. Identify the appropriate map file
2. Create events with unique IDs
3. Define event pages with conditions, graphics, and command lists
4. Connect to existing systems through switches and variables

For example, to add a new NPC to Map096, you would:
- Determine an unused event ID
- Create an event with appropriate graphics
- Define dialogue and interactions
- Set conditions for when the event appears/changes

### 6.2 Extending Enemy Encounters

To create new enemy encounters:
1. Define appropriate enemies from Enemies.json
2. Create balanced encounter groups
3. Add these encounters to relevant maps

The encounterList in Map001 provides a good template for how encounters are structured, with troopId, weight, and regionSet properties.

### 6.3 Creating New Common Events

For reusable mechanics:
1. Add entries to CommonEvents.json
2. Ensure they don't conflict with existing common events
3. Reference them from map events as needed

The Ship Transponder common event (ID 1) provides an excellent template for creating reusable travel mechanics between different locations.

## 7. Example: Creating a Quest for an Incomplete Map

Let's examine how to create a quest for Map096 (unnamed room in Floating Mansion):

### 7.1 Context Analysis

Map096 is located in the Floating Mansion (parentId 91), which is connected to the A.S.P. creator's storyline. Based on the map hierarchy:
- Map091 is "Floating Mansion 2nd floor"
- Map096 is an unnamed room on this floor
- Other rooms on this floor include "Bedroom 1", "Guest Room", "Study", and "Bedroom 2"

This suggests Map096 could be a secret room, laboratory, or storage area related to the A.S.P. creator's work.

### 7.2 Quest Concept Development

A suitable quest might involve:
- Discovering forgotten research data about A.S.P.'s original purpose
- Finding a prototype device that could help against A.S.P.
- Uncovering personal logs that reveal the creator's intentions

This would connect to the main storyline while providing additional context and rewards.

### 7.3 Technical Implementation

The quest implementation would require:
1. Adding events to Map096 with appropriate graphics and dialogue
2. Creating conditional branches to check quest progress
3. Setting up rewards (items, experience, abilities)
4. Connecting to existing switches and variables

For example, the event might check if the player has already found other Necklace pieces, and provide dialogue accordingly.

### 7.4 Integration with Existing Systems

The quest should integrate with:
- The Necklace collection quest
- The A.S.P. conflict storyline
- The disease system (perhaps requiring specific treatments from Zed)
- The enemy encounter system (using appropriate enemies from Enemies.json)

## 8. Disease and Status Effect System

MegaEarth2049 features a unique disease and status effect system that adds depth to gameplay:

### 8.1 Disease Types

As referenced in the story documentation, diseases come in several categories:
- **Standard Diseases**: Viral infections, bacterial infections, parasitic infestations
- **Minor Ailments**: Temporary conditions, allergic reactions, food poisoning
- **Mental Illnesses**: Digital psychosis, corporate drone syndrome, reality rejection
- **STDs (Synthetically Transmitted Diseases)**: Designer STDs, alien infections, digital STDs

### 8.2 Implementation in Events

Diseases are implemented through:
- Event commands that apply states to characters
- Conditional branches that check for specific states
- Common events that handle disease progression and cures

### 8.3 Integration with Quests

Many quests in MegaEarth2049 involve:
- Finding cures for specific diseases
- Dealing with the consequences of infections
- Using diseases strategically (e.g., infecting enemies)

When creating new quests, consider how the disease system might add interesting gameplay elements and narrative opportunities.

## 9. Conclusion

The interconnected JSON files in MegaEarth2049 create a complex but navigable system for implementing quests, storylines, and gameplay experiences. By understanding how maps, events, enemies, and common events work together, AI assistants can create compelling new content that seamlessly integrates with the existing game world.

When developing new quests for incomplete maps, focus on maintaining narrative consistency, following established patterns, and connecting to the game's core themes of corporate control, technological modification, and the search for humanity in a post-Earth dystopia.
