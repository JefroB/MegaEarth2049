# MegaEarth2049 Utilities

This directory contains utility modules and functions for the MegaEarth2049 project. These utilities are organized into subdirectories based on their functionality.

## Directory Structure

- **core/**: Core utility functions for file operations, JSON handling, and backup management
- **game/**: Game-specific utilities for working with maps, events, quests, and other game data
- **powershell/**: PowerShell utility scripts for asset management and other tasks

## Core Utilities

The `core` directory contains fundamental utility functions that are used throughout the project:

- **file-utils.js**: File system operations (creating directories, copying/moving files, etc.)
- **json-utils.js**: JSON handling with error recovery and backup functionality
- **backup-utils.js**: Backup creation and management

## Game Utilities

The `game` directory contains utilities specific to the MegaEarth2049 game:

- **map-utils.js**: Functions for working with game maps and events
- **quest-utils.js**: Functions for creating and managing quests and quest lines

## PowerShell Utilities

The `powershell` directory contains PowerShell scripts for various tasks:

- **ps-core.ps1**: Core PowerShell utility functions
- Various scripts for asset management and generation

## Usage

### JavaScript Utilities

```javascript
// Import the utility modules
const fileUtils = require('./utils/core/file-utils');
const jsonUtils = require('./utils/core/json-utils');
const mapUtils = require('./utils/game/map-utils');
const questUtils = require('./utils/game/quest-utils');

// Use the utility functions
fileUtils.ensureDirectoryExists('path/to/directory');
const jsonData = jsonUtils.safeReadJSON('path/to/file.json');
const mapData = mapUtils.loadMap(123);
const questTemplate = questUtils.createQuestTemplate({
  name: 'My Quest',
  description: 'A quest description'
});
```

### PowerShell Utilities

```powershell
# Import the core utilities
. "$PSScriptRoot\utils\powershell\ps-core.ps1"

# Use the utility functions
Ensure-DirectoryExists -DirectoryPath "path/to/directory"
```
