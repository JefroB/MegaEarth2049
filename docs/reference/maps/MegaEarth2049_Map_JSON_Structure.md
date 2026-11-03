> Reference snapshot: verify IDs, effects and enabled-plugin behavior against the live data and current FAQs. This relocation does not certify the older catalog as current.

# MegaEarth2049 Map JSON Structure Documentation

This document provides a comprehensive explanation of the structure and components of map JSON files in the MegaEarth2049 RPG Maker MV project. Understanding this structure is essential for AI assistants and developers who need to analyze, modify, or create maps for the game.

## Table of Contents

1. [Overview](#overview)
2. [Map Properties](#map-properties)
3. [Data Array Structure](#data-array-structure)
4. [Events Array Structure](#events-array-structure)
5. [Common Patterns and Conventions](#common-patterns-and-conventions)
6. [Relationships with Other Game Components](#relationships-with-other-game-components)
7. [Working with Large Map Files](#working-with-large-map-files)
8. [Map Creation Guidelines](#map-creation-guidelines)

## Overview

Map files in RPG Maker MV are stored as JSON files in the `data` directory, named according to their ID (e.g., `Map001.json`, `Map002.json`, etc.). Each map file contains three main components:

1. **Map Properties**: Basic information about the map, such as dimensions, tileset, and display settings
2. **Data Array**: A large numerical array representing all tile placements on the map
3. **Events Array**: An array of event objects that define interactive elements on the map

The structure of these components is detailed in the following sections.

## Map Properties

Map properties define the basic characteristics and settings of a map. Here are the key properties found in MegaEarth2049 map files:

| Property | Type | Description |
|----------|------|-------------|
| `autoplayBgm` | Boolean | Whether BGM should automatically play when entering the map |
| `autoplayBgs` | Boolean | Whether BGS should automatically play when entering the map |
| `battleback1Name` | String | The filename of the first battleback image |
| `battleback2Name` | String | The filename of the second battleback image |
| `bgm` | Object | Background music settings (name, pan, pitch, volume) |
| `bgs` | Object | Background sound settings (name, pan, pitch, volume) |
| `disableDashing` | Boolean | Whether dashing is disabled on this map |
| `displayName` | String | The name displayed when entering the map |
| `encounterList` | Array | List of enemy encounters that can occur on the map |
| `encounterStep` | Number | The number of steps between random encounters |
| `height` | Number | The height of the map in tiles |
| `note` | String | Custom notes about the map (can contain plugin commands) |
| `parallaxLoopX` | Boolean | Whether the parallax background loops horizontally |
| `parallaxLoopY` | Boolean | Whether the parallax background loops vertically |
| `parallaxName` | String | The filename of the parallax background image |
| `parallaxShow` | Boolean | Whether to show the parallax background |
| `parallaxSx` | Number | The horizontal scrolling speed of the parallax |
| `parallaxSy` | Number | The vertical scrolling speed of the parallax |
| `scrollType` | Number | The type of scrolling (0: no loop, 1: loop horizontally, 2: loop vertically, 3: loop both) |
| `specifyBattleback` | Boolean | Whether to use the specified battlebacks |
| `tilesetId` | Number | The ID of the tileset used for this map |
| `width` | Number | The width of the map in tiles |

### Example Map Properties

```json
{
  "autoplayBgm": false,
  "autoplayBgs": false,
  "battleback1Name": "",
  "battleback2Name": "",
  "bgm": {"name": "", "pan": 0, "pitch": 100, "volume": 90},
  "bgs": {"name": "", "pan": 0, "pitch": 100, "volume": 90},
  "disableDashing": false,
  "displayName": "Jen's House",
  "encounterList": [],
  "encounterStep": 30,
  "height": 13,
  "note": "",
  "parallaxLoopX": false,
  "parallaxLoopY": false,
  "parallaxName": "",
  "parallaxShow": true,
  "parallaxSx": 0,
  "parallaxSy": 0,
  "scrollType": 0,
  "specifyBattleback": false,
  "tilesetId": 5,
  "width": 17
}
```

## Data Array Structure

The `data` array is the largest component of a map file, containing numerical values that represent the tiles placed on the map. This array is structured as a one-dimensional array that represents a three-dimensional space (width × height × layers).

### Layer Organization

RPG Maker MV maps have multiple layers:

1. **Layer 1-4**: Tile layers (from bottom to top)
2. **Layer 5**: Shadow layer
3. **Layer 6**: Region layer (used for special region designations)
4. **Layer 7**: Events layer (not used in the data array, events are stored separately)

### Array Indexing

The data array is indexed using the following formula:

```
index = z * width * height + y * width + x
```

Where:
- `x` is the x-coordinate (0 to width-1)
- `y` is the y-coordinate (0 to height-1)
- `z` is the layer (0 to 5)

### Tile ID Values

Each value in the data array represents a tile ID, which corresponds to a specific tile in the tileset. The tile ID is determined by:

1. **Base Tile ID**: The position of the tile in the tileset
2. **Autotile Index**: For autotiles, additional bits encode the specific autotile shape
3. **Flags**: Special properties like passability are stored in the tileset, not in the map data

### Example Data Array (Truncated)

```json
"data": [
  2816, 2840, 4499, 4498, 4498, 4498, 4498, 4498, 4498, 4498, 4498, 4498, 4498, 4498, 4498, 4498, 4502,
  2816, 2840, 4497, 4496, 4496, 4496, 4496, 4496, 4496, 4496, 4496, 4496, 4496, 4496, 4496, 4496, 4500,
  /* ... many more values ... */
]
```

### Common Tile ID Ranges

In MegaEarth2049, tile IDs generally fall into these ranges:

- **0**: Empty tile
- **1-999**: Basic tiles
- **1000-1999**: Autotile A1 (animated)
- **2000-2999**: Autotile A2 (terrain)
- **3000-3999**: Autotile A3 (building walls)
- **4000-4999**: Autotile A4 (walls, roofs)
- **5000+**: Manual tiles (B-E tilesets)

## Events Array Structure

The `events` array contains all the interactive elements on the map, such as NPCs, treasure chests, doors, and scripted sequences. Each event is an object with the following structure:

### Event Object Properties

| Property | Type | Description |
|----------|------|-------------|
| `id` | Number | Unique identifier for the event on this map |
| `name` | String | The name of the event (for editor reference) |
| `note` | String | Custom notes about the event (can contain plugin commands) |
| `pages` | Array | Array of event pages, each with conditions and commands |
| `x` | Number | The x-coordinate of the event on the map |
| `y` | Number | The y-coordinate of the event on the map |

### Event Page Structure

Each event can have multiple pages, which are displayed based on conditions. Each page has the following structure:

| Property | Type | Description |
|----------|------|-------------|
| `conditions` | Object | Conditions that must be met for this page to be active |
| `directionFix` | Boolean | Whether the event's direction is fixed |
| `image` | Object | The graphic displayed for this event |
| `list` | Array | Array of event commands that execute when the event is triggered |
| `moveFrequency` | Number | How often the event moves (1-5, higher is more frequent) |
| `moveRoute` | Object | Custom movement pattern for the event |
| `moveSpeed` | Number | How fast the event moves (1-6, higher is faster) |
| `moveType` | Number | Movement type (0: fixed, 1: random, 2: approach) |
| `priorityType` | Number | Whether the event is below (0), same as (1), or above (2) characters |
| `stepAnime` | Boolean | Whether the event's sprite is always animated |
| `through` | Boolean | Whether the event can pass through other events/characters |
| `trigger` | Number | What activates the event (0: action button, 1: player touch, 2: event touch, 3: autorun, 4: parallel) |
| `walkAnime` | Boolean | Whether the event's sprite is animated when moving |

### Event Command Structure

The `list` property of an event page contains an array of command objects, each representing an action in the event sequence:

| Property | Type | Description |
|----------|------|-------------|
| `code` | Number | The type of command (e.g., 101: Show Text, 201: Transfer Player) |
| `indent` | Number | The indentation level for conditional branches |
| `parameters` | Array | Parameters specific to the command type |

### Example Event

```json
{
  "id": 1,
  "name": "EV001",
  "note": "",
  "pages": [
    {
      "conditions": {
        "actorId": 1,
        "actorValid": false,
        "itemId": 1,
        "itemValid": false,
        "selfSwitchCh": "A",
        "selfSwitchValid": false,
        "switch1Id": 1,
        "switch1Valid": false,
        "switch2Id": 1,
        "switch2Valid": false,
        "variableId": 1,
        "variableValid": false,
        "variableValue": 0
      },
      "directionFix": false,
      "image": {
        "characterIndex": 2,
        "characterName": "!SF_Door1",
        "direction": 2,
        "pattern": 2,
        "tileId": 0
      },
      "list": [
        {"code": 250, "indent": 0, "parameters": [{"name": "Knock", "volume": 100, "pitch": 100, "pan": 0}]},
        {"code": 230, "indent": 0, "parameters": [15]},
        {"code": 250, "indent": 0, "parameters": [{"name": "Knock", "volume": 100, "pitch": 100, "pan": 0}]},
        {"code": 230, "indent": 0, "parameters": [15]},
        {"code": 250, "indent": 0, "parameters": [{"name": "Knock", "volume": 100, "pitch": 100, "pan": 0}]},
        {"code": 230, "indent": 0, "parameters": [180]},
        {"code": 108, "indent": 0, "parameters": ["FIXED: Check for Switch 9 (boss defeated) instead of item ID 8"]},
        {"code": 111, "indent": 0, "parameters": [4, 9, 1]},
        {"code": 101, "indent": 1, "parameters": ["", 0, 0, 2]},
        {"code": 401, "indent": 1, "parameters": ["Come on in, it's unlocked!"]},
        {"code": 201, "indent": 1, "parameters": [0, 57, 5, 6, 0, 0]},
        {"code": 0, "indent": 1, "parameters": []},
        {"code": 411, "indent": 0, "parameters": []},
        {"code": 101, "indent": 1, "parameters": ["", 0, 0, 2]},
        {"code": 401, "indent": 1, "parameters": ["Hmmm...Guess nobody's home."]},
        {"code": 0, "indent": 1, "parameters": []},
        {"code": 412, "indent": 0, "parameters": []},
        {"code": 0, "indent": 0, "parameters": []}
      ],
      "moveFrequency": 3,
      "moveRoute": {
        "list": [{"code": 0, "parameters": []}],
        "repeat": true,
        "skippable": false,
        "wait": false
      },
      "moveSpeed": 3,
      "moveType": 0,
      "priorityType": 1,
      "stepAnime": false,
      "through": false,
      "trigger": 1,
      "walkAnime": false
    }
  ],
  "x": 8,
  "y": 7
}
```

### Common Event Command Codes

Here are some of the most frequently used event command codes in MegaEarth2049:

| Code | Command | Description |
|------|---------|-------------|
| 0 | End Event Processing | Marks the end of an event sequence or branch |
| 101 | Show Text | Displays a message in a text box |
| 102 | Show Choices | Presents the player with choices |
| 103 | Input Number | Prompts the player to input a number |
| 104 | Select Item | Opens the item selection window |
| 108 | Comment | A comment for developers (not shown in-game) |
| 111 | Conditional Branch | Executes commands based on conditions |
| 117 | Common Event | Calls a common event |
| 121 | Control Switches | Changes the ON/OFF state of game switches |
| 122 | Control Variables | Changes the value of game variables |
| 126 | Change Items | Adds or removes items from inventory |
| 201 | Transfer Player | Moves the player to another map or position |
| 205 | Set Movement Route | Controls the movement of an event or character |
| 230 | Wait | Pauses event execution for a specified time |
| 250 | Play SE | Plays a sound effect |
| 301 | Battle Processing | Initiates a battle with enemies |
| 302 | Shop Processing | Opens a shop menu |
| 355 | Script | Executes custom JavaScript code |

## Common Patterns and Conventions

### Map Naming Conventions

In MegaEarth2049, maps follow these naming conventions:

1. **World Maps**: Named after planets or major areas (e.g., "Mega Earth", "Planet Ork")
2. **Cities/Towns**: Named directly (e.g., "Timbuc", "Dorlund Center")
3. **Buildings**: Named by function and location (e.g., "Timbuc Grocery", "Dorlund Inn")
4. **Dungeons**: Named by location and type (e.g., "Timbuc Cellar", "Dorlund Lava Fields")
5. **Special Areas**: Named descriptively (e.g., "Floating Mansion", "Alien Craft")

### Event Naming Conventions

Events in MegaEarth2049 typically follow these naming patterns:

1. **NPCs**: Named after the character (e.g., "Jen", "Zack")
2. **Doors/Exits**: Named by destination (e.g., "To Timbuc", "Exit to World Map")
3. **Treasure Chests**: Named by content (e.g., "Weapon Chest", "Key Item")
4. **Triggers**: Named by function (e.g., "Story Trigger", "Quest Start")
5. **Generic Events**: Named by ID (e.g., "EV001", "EV002")

### Common Event Patterns

Several event patterns are used consistently throughout MegaEarth2049:

1. **Door Pattern**: 
   - Check for conditions (key items, switches)
   - Play sound effect
   - Transfer player to destination

2. **NPC Dialogue Pattern**:
   - Check for quest progress (variables, switches)
   - Show appropriate dialogue
   - Update quest progress if needed
   - Give rewards if applicable

3. **Treasure Chest Pattern**:
   - Check if already opened (self switch)
   - Play open animation
   - Give item
   - Set self switch to prevent reopening

4. **Enemy Encounter Pattern**:
   - Check for conditions
   - Show warning dialogue
   - Initiate battle
   - Process results based on victory/defeat

## Relationships with Other Game Components

### Map and Tileset Relationship

Maps reference tilesets through the `tilesetId` property:

1. The `tilesetId` corresponds to an entry in `Tilesets.json`
2. The tileset defines the graphics and properties (passability, terrain tags) of tiles
3. The map's data array contains tile IDs that reference specific tiles in the tileset

### Map and Event Relationship

Events on maps can reference other game components:

1. **Common Events**: Events can call common events from `CommonEvents.json`
2. **Switches/Variables**: Events reference switches and variables for conditions and effects
3. **Items/Weapons/Armor**: Events can give, take, or check for items from respective JSON files
4. **Actors/Enemies**: Events can reference characters and enemies for battles and story

### Map Hierarchy

Maps in MegaEarth2049 are organized in a hierarchical structure defined in `MapInfos.json`:

1. **Root Maps**: Major world areas (parentId: 0)
2. **Child Maps**: Locations within those areas (parentId: parent map ID)
3. **Sub-locations**: Buildings, dungeons, etc. within locations

This hierarchy is important for understanding the spatial relationships between maps and for creating coherent navigation systems.

## Working with Large Map Files

### Memory Considerations

Map files, especially those with large dimensions, can be memory-intensive due to:

1. **Data Array Size**: width × height × layers = total number of tile entries
2. **Event Complexity**: Maps with many events or complex event logic
3. **Command Lists**: Events with long command sequences

### Strategies for Processing Large Maps

To work with large map files effectively:

1. **Component Extraction**: Process map properties, data array, and events separately
2. **Chunked Processing**: Process the data array in smaller chunks
3. **Selective Loading**: Load only the components needed for a specific task
4. **Compression**: Use compression techniques when storing processed map data

### Tools for Map Analysis

The following tools can help analyze map files:

1. **Data Array Visualization**: Convert the data array to a visual representation
2. **Event Extraction**: Extract and categorize events for easier analysis
3. **Tile Usage Statistics**: Analyze which tiles are used most frequently
4. **Path Analysis**: Identify navigable paths and potential issues

## Map Creation Guidelines

When creating new maps for MegaEarth2049, follow these guidelines:

### Technical Guidelines

1. **Size Considerations**: Keep maps to a reasonable size (typically under 100×100 for performance)
2. **Event Density**: Avoid placing too many events in a small area
3. **Layer Usage**: Use layers appropriately (ground on layer 1, objects on layers 2-4)
4. **Region Usage**: Use region IDs consistently for special areas

### Design Guidelines

1. **Thematic Consistency**: Match the cyberpunk aesthetic of MegaEarth2049
2. **Navigation Flow**: Create intuitive paths for players to follow
3. **Point of Interest Density**: Include enough interesting elements without overcrowding
4. **Environmental Storytelling**: Use map design to convey narrative elements

### Integration Guidelines

1. **Map Connections**: Create proper transfer events to connect to existing maps
2. **Quest Integration**: Consider how the map fits into existing quest structures
3. **NPC Placement**: Position NPCs logically based on their role and function
4. **Enemy Encounters**: Design appropriate enemy encounters for the area

By following these guidelines and understanding the structure of map JSON files, you can effectively create, analyze, and modify maps for MegaEarth2049.
