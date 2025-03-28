# MegaEarth2049 PowerShell Utilities

This directory contains PowerShell utility scripts for the MegaEarth2049 project.

## Core Utilities

- **ps-core.ps1**: Core PowerShell utility functions for file operations, JSON handling, and asset management.

## Asset Management Scripts

- **copy_art_assets.ps1**: Script to copy art assets to the game directory.
- **copy_missing_assets.ps1**: Script to copy missing art assets to the game directory.
- **create_art_assets.ps1**: Script to create art asset specifications.
- **create_missing_art_assets.ps1**: Script to create missing art asset specifications.
- **create_boss_art_assets.ps1**: Script to create boss art asset specifications.
- **generate_placeholder_sprites.ps1**: Script to generate placeholder sprites.
- **generate_boss_placeholder_sprites.ps1**: Script to generate boss placeholder sprites.
- **update_enemies_json.ps1**: Script to update the Enemies.json file with new enemy data.
- **update_boss_enemies_json.ps1**: Script to update the Enemies.json file with new boss enemy data.

## Usage

These scripts can be imported and used in other PowerShell scripts:

```powershell
# Import the core utilities
. "$PSScriptRoot\ps-core.ps1"

# Use the utility functions
Ensure-DirectoryExists -DirectoryPath "path/to/directory"
```
