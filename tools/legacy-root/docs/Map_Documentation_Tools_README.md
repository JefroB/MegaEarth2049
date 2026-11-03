> Historical document retained for provenance. Its commands, IDs and completion claims may be superseded. Use the current FAQs, roadmap and maintained tools for current behavior.

# MegaEarth2049 Map Documentation Tools

This collection of tools helps you analyze and document the maps in your MegaEarth2049 RPG Maker MV game. These tools are designed to identify incomplete maps, generate comprehensive documentation, and keep that documentation up-to-date as you develop your game.

## Available Tools

### Core Tools

1. **tools/legacy-root/scripts/analyze_incomplete_maps.ps1.txt**: Analyzes all map files and identifies potentially incomplete maps
2. **tools/legacy-root/scripts/document_maps.bat.txt**: Runs the analysis and generates comprehensive map documentation
3. **tools/legacy-root/scripts/update_map_documentation.ps1.txt**: Updates the map documentation when run
4. **tools/legacy-root/scripts/monitor_maps.bat.txt**: Continuously monitors map files for changes and updates documentation automatically

### Supporting Tools

- **tools/legacy-root/scripts/count_maps.ps1.txt**: Counts the number of map files in the data directory
- **tools/legacy-root/scripts/list_map_properties.ps1.txt**: Lists basic properties of all maps
- **tools/legacy-root/scripts/check_map_file.ps1.txt**: Checks if a specific map file exists

## Generated Documentation

The tools generate the following documentation files:

1. **tools/legacy-root/reports/incomplete_maps_report.txt**: A detailed report of incomplete maps, categorized by type of incompleteness
2. **docs/reference/maps/MegaEarth2049_Map_Documentation.md**: Comprehensive documentation of all maps in the game

## Quick Start Guide

### One-Time Documentation

To generate documentation once:

1. Double-click on `tools/legacy-root/scripts/document_maps.bat.txt`
2. Review the generated files:
   - `tools/legacy-root/reports/incomplete_maps_report.txt`
   - `docs/reference/maps/MegaEarth2049_Map_Documentation.md`

### Continuous Documentation

To keep documentation up-to-date as you work:

1. Double-click on `tools/legacy-root/scripts/monitor_maps.bat.txt`
2. The script will run in the background, monitoring map files for changes
3. When changes are detected, the documentation will be automatically updated
4. Press Ctrl+C in the terminal window to stop monitoring

### Manual Update

To manually update the documentation:

```powershell
powershell -ExecutionPolicy Bypass -File tools/legacy-root/scripts/update_map_documentation.ps1.txt
```

## Understanding the Documentation

### Incomplete Maps Report

The incomplete maps report categorizes maps into several types:

1. **Maps Without Names**: Maps that don't have a display name
2. **Maps Without Events**: Maps that have a name but no events
3. **Maps Without Tiles**: Maps that have dimensions and structure but no tile data
4. **Small Maps**: Maps with unusually small dimensions
5. **Large Maps**: Maps with unusually large dimensions
6. **Maps With Errors**: Maps that couldn't be processed due to errors

### Map Documentation

The comprehensive map documentation includes:

1. **Map Statistics**: Overall statistics about the maps in the game
2. **Map Structure**: Explanation of the map file structure
3. **Map Categories**: Categorization of maps by type and purpose
4. **Incomplete Maps**: Lists of maps that need attention
5. **Map Connections**: Description of how maps are connected
6. **Recommendations**: Prioritized recommendations for completing maps

## Customization

You can customize the tools by editing the PowerShell scripts:

- Adjust the criteria for identifying incomplete maps in `tools/legacy-root/scripts/analyze_incomplete_maps.ps1.txt`
- Change the monitoring interval in `tools/legacy-root/scripts/update_map_documentation.ps1.txt`
- Modify the documentation format in `tools/legacy-root/scripts/update_map_documentation.ps1.txt`

## Troubleshooting

If you encounter issues:

1. Make sure PowerShell is installed and can run scripts
2. Check that the map files are in the expected location (data directory)
3. Verify that you have write permissions for the output files
4. If a script fails, try running it directly from PowerShell with the `-Verbose` flag

## Requirements

- Windows operating system
- PowerShell 5.0 or later
- RPG Maker MV game with map files in the data directory

## License

These tools are provided for use with the MegaEarth2049 project.

---

*Last updated: April 18, 2025*
