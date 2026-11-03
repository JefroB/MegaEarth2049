MegaEarth2049 Map Analysis Tools
==============================

This collection of tools allows you to analyze and document the map files in your RPG Maker MV game. The tools are designed to help you understand the structure of your maps, extract useful information, and generate documentation.

Quick Start
----------

To run all the tools at once, simply double-click on:
- run_all_tools.bat

This will execute all the working tools in sequence and generate a comprehensive report in the map_analysis_results directory.

Alternatively, you can run the analyze_maps.bat file, which runs a subset of the tools:
- analyze_maps.bat

Individual Tools
---------------

The tools are organized into several categories:

1. Basic Map Tools:
   - list_maps.ps1: Lists all map files in the data directory
   - check_map_file.ps1: Checks if a specific map file exists
   - count_maps.ps1: Counts the number of map files in the data directory

2. Map Information Extraction:
   - map_info.ps1: Extracts basic information from map files
   - count_map_events.ps1: Counts the number of events in a map file
   - list_map_events.ps1: Lists events from a map file
   - list_map_properties.ps1: Lists basic properties of all maps

3. Map Analysis:
   - map_analyzer.ps1: Extracts basic information from map files
   - analyze_map_data.ps1: Analyzes map data in chunks to avoid memory issues
   - extract_map_components.ps1: Extracts components from map files
   - extract_map_structure.ps1: Extracts structure information from map files
   - extract_map_events.ps1: Extracts event information from map files
   - simple_map_events.ps1: Extracts basic event information from map files
   - analyze_all_maps.ps1: Runs all map analysis tools in sequence
   - simple_map_summary.ps1: Generates a simple summary of all maps

4. Documentation:
   - map_tools.ps1: A module with utility functions for working with maps
   - update_readme.ps1: Updates the README file with the latest tool information
   - MegaEarth2049_Map_JSON_Documentation.md: Comprehensive documentation of the map JSON structure

Usage Examples
-------------

To run a specific tool, open a PowerShell window and navigate to the directory containing the tools. Then run the tool using the following syntax:

```powershell
# List all maps
.\list_maps.ps1

# Check if a map exists
.\check_map_file.ps1 -mapFile "data/Map001.json"

# Count events in a map
.\count_map_events.ps1 -mapFile "data/Map001.json"

# List properties of all maps
.\list_map_properties.ps1

# Generate a simple map summary
.\simple_map_summary.ps1
```

Troubleshooting
--------------

If you encounter errors when running these scripts:

1. Make sure you're running them from the correct directory (the project root).
2. Check that the map files exist in the data directory.
3. For large maps, try using the scripts that process data in chunks.
4. If you get PowerShell errors, try running the simpler scripts like list_maps.ps1 or check_map_file.ps1.

If you're having trouble running the PowerShell scripts, you may need to change the execution policy. Open PowerShell as an administrator and run:

```powershell
Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope CurrentUser
```

Documentation
------------

For more detailed information about the map JSON structure and the tools, see the following files:

- MegaEarth2049_Map_JSON_Documentation.md: Comprehensive documentation of the map JSON structure
- MegaEarth2049_Map_Analysis_Tools_README.md: Detailed information about the tools

Contact
-------

If you have any questions or suggestions, please contact the developer.

Last Updated: April 18, 2025
