> Historical document retained for provenance. Its commands, IDs and completion claims may be superseded. Use the current FAQs, roadmap and maintained tools for current behavior.

# MegaEarth2049 Map Analysis Tools

This collection of PowerShell scripts provides tools for analyzing and documenting RPG Maker MV map files in the MegaEarth2049 project.

## Overview

RPG Maker MV stores map data in JSON files located in the `data` directory. These files contain information about the map's layout, events, and properties. The tools in this collection help you extract, analyze, and document this information.

## Available Tools

### Basic Map Tools

- **tools/legacy-root/scripts/map_tools.ps1.txt**: A module with basic map utility functions
  - `List-Maps`: Lists all map files in the data directory
  - `Test-Map`: Checks if a specific map file exists
  - `Create-MapDocumentation`: Creates a documentation file for map structure

### Map Listing and Checking

- **tools/legacy-root/scripts/list_maps.ps1.txt**: Lists all map files in the data directory
- **tools/legacy-root/scripts/check_map_file.ps1.txt**: Checks if a specific map file exists

### Map Information Extraction

- **tools/legacy-root/scripts/map_info.ps1.txt**: Extracts basic information from map files
- **tools/legacy-root/scripts/count_map_events.ps1.txt**: Counts the number of events in a map file
- **tools/legacy-root/scripts/list_map_events.ps1.txt**: Lists events from a map file

### Map Analysis

- **tools/legacy-root/scripts/map_analyzer.ps1.txt**: Extracts basic information from map files
- **tools/legacy-root/scripts/analyze_map_data.ps1.txt**: Analyzes map data in chunks to avoid memory issues
- **tools/legacy-root/scripts/extract_map_components.ps1.txt**: Extracts components from map files
- **tools/legacy-root/scripts/extract_map_structure.ps1.txt**: Extracts structure information from map files
- **tools/legacy-root/scripts/extract_map_events.ps1.txt**: Extracts event information from map files
- **tools/legacy-root/scripts/simple_map_events.ps1.txt**: Extracts basic event information from map files
- **tools/legacy-root/scripts/analyze_all_maps.ps1.txt**: Runs all map analysis tools in sequence

### Documentation

- **docs/reference/maps/MegaEarth2049_Map_JSON_Documentation.md**: Comprehensive documentation of the map JSON structure
- **docs/reference/maps/MegaEarth2049_Map_JSON_Structure.md**: Overview of the map JSON structure

## Usage Examples

### List All Maps

```powershell
# Using list_maps.ps1
.\list_maps.ps1

# Using map_tools.ps1
Import-Module .\map_tools.ps1
List-Maps
```

### Check If a Map Exists

```powershell
# Using check_map_file.ps1
.\check_map_file.ps1 -mapFile "data/Map001.json"

# Using map_tools.ps1
Import-Module .\map_tools.ps1
Test-Map -mapFile "data/Map001.json"
```

### Extract Map Information

```powershell
# Extract basic map info
.\map_info.ps1 -mapFile "data/Map001.json"

# Count events in a map
.\count_map_events.ps1 -mapFile "data/Map001.json"

# List events in a map
.\list_map_events.ps1 -mapFile "data/Map001.json"
```

### Analyze Maps

```powershell
# Analyze a single map
.\map_analyzer.ps1 -mapFile "data/Map001.json"

# Extract map components
.\extract_map_components.ps1 -mapFile "data/Map001.json"

# Extract map structure
.\extract_map_structure.ps1 -mapFile "data/Map001.json"

# Extract map events
.\extract_map_events.ps1 -mapFile "data/Map001.json"

# Analyze all maps
.\analyze_all_maps.ps1
```

## Map JSON Structure

RPG Maker MV map files have the following structure:

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

For more detailed information about the map JSON structure, see the [MegaEarth2049_Map_JSON_Documentation.md](../../../docs/reference/maps/MegaEarth2049_Map_JSON_Documentation.md) file.

## Notes

- Some scripts may encounter errors when processing large map files due to memory constraints. In such cases, use the `tools/legacy-root/scripts/analyze_map_data.ps1.txt` script, which processes maps in chunks.
- The `data` array in map files can be very large, especially for large maps. It contains tile IDs for each position on the map.
- The `events` array contains all events on the map, indexed by the event ID. Null values represent unused event IDs.

## Troubleshooting

If you encounter errors when running these scripts:

1. Make sure you're running them from the correct directory (the project root).
2. Check that the map files exist in the `data` directory.
3. For large maps, try using the scripts that process data in chunks.
4. If you get PowerShell errors about variable references, try using the simpler scripts like `tools/legacy-root/scripts/list_maps.ps1.txt` or `tools/legacy-root/scripts/check_map_file.ps1.txt`.

## Contributing

Feel free to modify and extend these scripts to suit your needs. If you create new tools or improve existing ones, please update this README accordingly.
