> Reference snapshot: verify IDs, effects and enabled-plugin behavior against the live data and current FAQs. This relocation does not certify the older catalog as current.

# RPG Maker MV Map JSON Structure Documentation

This document provides a comprehensive overview of the structure of map JSON files in RPG Maker MV, specifically for the MegaEarth2049 project.

## Map File Naming Convention

Map files in RPG Maker MV follow a specific naming convention:

- Format: `MapXXX.json` where XXX is a three-digit number
- Example: `Map001.json`, `Map002.json`, etc.
- Files are stored in the `data` directory

## Top-Level Structure

Each map file is a JSON object with the following top-level properties:

```json
{
  "autoplayBgm": boolean,
  "autoplayBgs": boolean,
  "battleback1Name": string,
  "battleback2Name": string,
  "bgm": object,
  "bgs": object,
  "disableDashing": boolean,
  "displayName": string,
  "encounterList": array,
  "encounterStep": number,
  "height": number,
  "note": string,
  "parallaxLoopX": boolean,
  "parallaxLoopY": boolean,
  "parallaxName": string,
  "parallaxShow": boolean,
  "parallaxSx": number,
  "parallaxSy": number,
  "scrollType": number,
  "specifyBattleback": boolean,
  "tilesetId": number,
  "width": number,
  "data": array,
  "events": array
}
```

## Property Descriptions

### Basic Map Properties

- **displayName**: The name of the map as shown in the game
- **width**: The width of the map in tiles
- **height**: The height of the map in tiles
- **tilesetId**: The ID of the tileset used for this map
- **note**: Custom notes for the map (can contain plugin commands)

### Background Music and Sound

- **autoplayBgm**: Whether to automatically play the BGM when entering the map
- **autoplayBgs**: Whether to automatically play the BGS when entering the map
- **bgm**: An object containing BGM properties
  ```json
  {
    "name": string,
    "pan": number,
    "pitch": number,
    "volume": number
  }
  ```
- **bgs**: An object containing BGS properties (same structure as bgm)

### Battle Settings

- **encounterList**: An array of possible enemy encounters on this map
- **encounterStep**: The number of steps between random encounters (higher = less frequent)
- **battleback1Name**: The name of the battleback1 image file
- **battleback2Name**: The name of the battleback2 image file
- **specifyBattleback**: Whether to use the specified battlebacks

### Parallax Background

- **parallaxName**: The name of the parallax background image file
- **parallaxLoopX**: Whether the parallax scrolls horizontally
- **parallaxLoopY**: Whether the parallax scrolls vertically
- **parallaxSx**: The horizontal scrolling speed
- **parallaxSy**: The vertical scrolling speed
- **parallaxShow**: Whether to show the parallax background

### Miscellaneous

- **disableDashing**: Whether dashing is disabled on this map
- **scrollType**: The type of scrolling for the map (0-3)

## The Data Array

The `data` array contains the tile IDs for each position on the map. This is a one-dimensional array that represents a three-dimensional structure:

- The map has multiple layers (typically 6 layers in RPG Maker MV)
- Each layer is a grid of width × height tiles
- The data array stores these layers sequentially

The structure can be visualized as:
```
[
  // Layer 1 (z=0)
  tile(0,0,0), tile(1,0,0), ..., tile(width-1,0,0),
  tile(0,1,0), tile(1,1,0), ..., tile(width-1,1,0),
  ...
  tile(0,height-1,0), ..., tile(width-1,height-1,0),
  
  // Layer 2 (z=1)
  tile(0,0,1), tile(1,0,1), ..., tile(width-1,0,1),
  ...
  
  // And so on for all layers
]
```

To access a specific tile at position (x, y) on layer z:
```
index = z * (width * height) + y * width + x
tileId = data[index]
```

### Tile ID Interpretation

- **0**: Empty tile
- **1-999**: Autotiles (animated tiles like water)
- **1000-1999**: A1 tiles (animated, often water/lava)
- **2000-2999**: A2 tiles (ground/terrain)
- **3000-3999**: A3 tiles (building exteriors)
- **4000-4999**: A4 tiles (walls/roofs)
- **5000-5999**: A5 tiles (normal tiles)
- **6000-6999**: B tiles (first sheet of custom tiles)
- **7000-7999**: C tiles (second sheet of custom tiles)
- **8000-8999**: D tiles (third sheet of custom tiles)
- **9000-9999**: E tiles (fourth sheet of custom tiles)

## The Events Array

The `events` array contains all the events on the map. The array is indexed by the event ID, with `null` values for unused IDs.

Each event is an object with the following structure:

```json
{
  "id": number,
  "name": string,
  "note": string,
  "pages": array,
  "x": number,
  "y": number
}
```

- **id**: The unique identifier for the event
- **name**: The name of the event (often "EV001", etc.)
- **note**: Custom notes for the event
- **x**: The x-coordinate of the event on the map
- **y**: The y-coordinate of the event on the map
- **pages**: An array of event pages

### Event Pages

Each event can have multiple pages, which are conditions under which the event behaves differently. Each page is an object:

```json
{
  "conditions": object,
  "directionFix": boolean,
  "image": object,
  "list": array,
  "moveFrequency": number,
  "moveRoute": object,
  "moveSpeed": number,
  "moveType": number,
  "priorityType": number,
  "stepAnime": boolean,
  "through": boolean,
  "trigger": number,
  "walkAnime": boolean
}
```

#### Page Conditions

The `conditions` object specifies when this page is active:

```json
{
  "actorId": number,
  "actorValid": boolean,
  "itemId": number,
  "itemValid": boolean,
  "selfSwitchCh": string,
  "selfSwitchValid": boolean,
  "switch1Id": number,
  "switch1Valid": boolean,
  "switch2Id": number,
  "switch2Valid": boolean,
  "variableId": number,
  "variableValid": boolean,
  "variableValue": number
}
```

#### Event Commands

The `list` array contains the actual event commands:

```json
{
  "code": number,
  "indent": number,
  "parameters": array
}
```

- **code**: The type of command (e.g., 101 for Show Text, 201 for Transfer Player)
- **indent**: The indentation level (for conditional branches)
- **parameters**: Command-specific parameters

Common command codes:
- **0**: End of event processing
- **101**: Show Text
- **102**: Show Choices
- **103**: Input Number
- **104**: Select Item
- **108**: Comment
- **111**: Conditional Branch
- **117**: Common Event
- **121**: Control Switches
- **122**: Control Variables
- **126**: Change Items
- **201**: Transfer Player
- **205**: Set Movement Route
- **230**: Wait
- **250**: Play SE
- **301**: Battle Processing
- **302**: Shop Processing
- **355**: Script

## Working with Map Files

When analyzing or modifying map files, consider the following:

1. **Large Files**: Map files can be very large, especially for maps with many events or large dimensions
2. **Data Array**: The data array is the largest part of the file and requires special handling
3. **Event Commands**: Event commands are complex and vary based on the command code
4. **Tile IDs**: Tile IDs reference the tileset, which is defined in separate files

## Tools for Map Analysis

Several PowerShell scripts have been created to help analyze map files:

- **tools/legacy-root/scripts/list_maps.ps1.txt**: Lists all map files in the data directory
- **tools/legacy-root/scripts/map_analyzer.ps1.txt**: Extracts basic information from map files
- **tools/legacy-root/scripts/extract_map_components.ps1.txt**: Extracts components from map files
- **tools/legacy-root/scripts/extract_map_structure.ps1.txt**: Extracts structure information from map files

## Example Usage

To analyze a map file:

```powershell
# List all maps
.\list_maps.ps1

# Get basic info about a specific map
.\map_analyzer.ps1 -mapFile "data/Map001.json"

# Extract components from a map
.\extract_map_components.ps1 -mapFile "data/Map001.json"

# Extract structure information
.\extract_map_structure.ps1 -mapFile "data/Map001.json"
```

## Conclusion

Understanding the structure of RPG Maker MV map files is essential for advanced game development, debugging, and creating tools to work with these files. This documentation provides a comprehensive overview of the map JSON structure to help with these tasks.
