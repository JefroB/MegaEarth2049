# MegaEarth2049 README Updater
# This script updates the README file with the latest tool information

# Function to update the README file
function Update-Readme {
    param (
        [string]$readmeFile = "MegaEarth2049_Map_Analysis_Tools_README.md"
    )
    
    # Check if the README file exists
    if (-not (Test-Path $readmeFile)) {
        Write-Host "Error: README file $readmeFile does not exist." -ForegroundColor Red
        return
    }
    
    Write-Host "Updating README file..." -ForegroundColor Cyan
    
    try {
        # Find all PowerShell scripts in the current directory
        $scriptFiles = Get-ChildItem -Path "." -Filter "*.ps1"
        
        # Find all batch files in the current directory
        $batchFiles = Get-ChildItem -Path "." -Filter "*.bat"
        
        # Find all documentation files
        $docFiles = Get-ChildItem -Path "." -Filter "*.md" | Where-Object { $_.Name -ne $readmeFile }
        
        # Create a new README content
        $readmeContent = @"
# MegaEarth2049 Map Analysis Tools

This collection of PowerShell scripts provides tools for analyzing and documenting RPG Maker MV map files in the MegaEarth2049 project.

## Overview

RPG Maker MV stores map data in JSON files located in the `data` directory. These files contain information about the map's layout, events, and properties. The tools in this collection help you extract, analyze, and document this information.

## Available Tools

### PowerShell Scripts

"@
        
        # Add PowerShell scripts to the README
        foreach ($script in $scriptFiles) {
            # Read the first line of the script (comment with description)
            $firstLine = Get-Content $script.FullName -TotalCount 1
            
            # Remove the # from the beginning of the line
            $description = $firstLine -replace '^# ', ''
            
            # Add the script to the README
            $readmeContent += "`n- **$($script.Name)**: $description"
        }
        
        # Add batch files to the README
        $readmeContent += "`n`n### Batch Files`n"
        foreach ($batch in $batchFiles) {
            $readmeContent += "`n- **$($batch.Name)**: Batch file to run multiple tools in sequence"
        }
        
        # Add documentation files to the README
        $readmeContent += "`n`n### Documentation Files`n"
        foreach ($doc in $docFiles) {
            $readmeContent += "`n- **$($doc.Name)**: Documentation file"
        }
        
        # Add usage examples to the README
        $readmeContent += @"

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

# List properties of all maps
.\list_map_properties.ps1
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

# Generate a detailed map report
.\map_report.ps1 -mapFile "data/Map001.json"

# Analyze all maps
.\analyze_all_maps.ps1
```

### Run All Tools

```batch
# Run all tools in sequence
.\analyze_maps.bat
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

For more detailed information about the map JSON structure, see the [MegaEarth2049_Map_JSON_Documentation.md](MegaEarth2049_Map_JSON_Documentation.md) file.

## Notes

- Some scripts may encounter errors when processing large map files due to memory constraints. In such cases, use the `analyze_map_data.ps1` script, which processes maps in chunks.
- The `data` array in map files can be very large, especially for large maps. It contains tile IDs for each position on the map.
- The `events` array contains all events on the map, indexed by the event ID. Null values represent unused event IDs.

## Troubleshooting

If you encounter errors when running these scripts:

1. Make sure you're running them from the correct directory (the project root).
2. Check that the map files exist in the `data` directory.
3. For large maps, try using the scripts that process data in chunks.
4. If you get PowerShell errors about variable references, try using the simpler scripts like `list_maps.ps1` or `check_map_file.ps1`.

## Contributing

Feel free to modify and extend these scripts to suit your needs. If you create new tools or improve existing ones, please update this README accordingly.

## Last Updated

This README was last updated on $(Get-Date).
"@
        
        # Write the new README content to the file
        $readmeContent | Out-File -FilePath $readmeFile -Encoding utf8
        
        Write-Host "README file updated successfully." -ForegroundColor Green
    }
    catch {
        Write-Host "Error updating README file: $_" -ForegroundColor Red
    }
}

# Main script execution
Update-Readme
