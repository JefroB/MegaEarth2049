# JSON Tools for MegaEarth 2049

This directory contains utility scripts for safely working with JSON files in the MegaEarth 2049 project. These tools help prevent errors when working with large JSON files, provide automatic backups, and offer recovery options for corrupted files.

## Available Tools

### 1. json_utils.js

Core utility library with functions for safely reading, writing, and manipulating JSON files.

**Key Features:**
- Safe reading and writing of JSON files with automatic backups
- JSON validation and error recovery
- Backup creation and restoration
- Safe map event addition

**Usage Example:**
```javascript
const jsonUtils = require('./json_tools/json_utils.js');

// Safely read a JSON file
const data = jsonUtils.safeReadJSON('data/Map001.json');

// Modify the data
data.events[5].name = "Modified Event";

// Safely write the modified data back to the file
jsonUtils.safeWriteJSON('data/Map001.json', data);
```

### 2. validate_json_files.js

Script to validate all JSON files in the data directory, identify corrupted files, and attempt to fix them.

**Key Features:**
- Batch validation of all JSON files
- Identification of corrupted files
- Automatic recovery attempts
- Restoration from backups if recovery fails

**Usage:**
```bash
node json_tools/validate_json_files.js
```

### 3. json_repair.js

Advanced tool for repairing corrupted JSON files using multiple repair strategies.

**Key Features:**
- Multiple repair strategies (basic syntax fixes, structure reconstruction, partial extraction)
- Automatic backup creation before repair attempts
- Batch repair of multiple files
- Detailed reporting of repair results

**Usage:**
```bash
# Repair a specific file
node json_tools/json_repair.js data/Map047.json

# Repair all invalid JSON files in a directory
node json_tools/json_repair.js --dir data

# Repair all invalid JSON files in a directory and its subdirectories
node json_tools/json_repair.js --recursive data
```

### 4. safe_add_quest_events.js

Enhanced version of add_quest_events.js that uses json_utils.js for safer JSON handling when adding NPCs to maps.

**Key Features:**
- Safe addition of NPCs to maps
- Automatic backups before modifications
- Detailed error reporting and statistics
- Recovery options for failed operations

**Usage:**
```bash
node json_tools/safe_add_quest_events.js
```

### 5. safe_add_quest_lines.js

Comprehensive tool for safely adding new quest lines to the game, with validation and repair capabilities.

**Key Features:**
- Pre-validation of JSON files before adding quest lines
- Automatic repair of corrupted files
- Creation of all necessary event files for quest lines
- Post-validation to ensure data integrity

**Usage:**
```bash
node json_tools/safe_add_quest_lines.js all_quest_lines.js
```

## Backup System

All tools automatically create backups before modifying JSON files. Backups are stored in the `backups` directory with timestamps in the filename.

If a file becomes corrupted, you can:

1. Run `validate_json_files.js` to attempt automatic recovery
2. Use `json_repair.js` for more advanced repair options
3. Manually restore from a backup using the `restoreFromBackup` function in json_utils.js
4. Directly copy a backup file from the backups directory

## Error Recovery

The tools include several methods for recovering from common JSON errors:

1. Missing quotes around property names
2. Trailing commas in arrays and objects
3. Missing closing brackets and braces
4. Unescaped quotes in strings
5. Invalid control characters
6. Structural reconstruction for severely damaged files
7. Partial extraction of valid data from corrupted files

If automatic recovery fails, the system will attempt to restore from the most recent backup.

## Best Practices

1. Always use these tools instead of direct file operations when working with JSON files
2. Run `validate_json_files.js` periodically to check for corrupted files
3. Use `json_repair.js` to fix any corrupted files before they cause problems
4. Use `safe_add_quest_events.js` instead of `add_quest_events.js` when adding NPCs to maps
5. Use `safe_add_quest_lines.js` when adding new quest lines to ensure data integrity
6. Keep backups of important files in a separate location

## Troubleshooting

If you encounter issues with JSON files:

1. Check the console output for error messages
2. Run `validate_json_files.js` to identify corrupted files
3. Use `json_repair.js` to attempt repairs on corrupted files
4. Check the backups directory for recent backups
5. If all else fails, restore from a known good backup

## Advanced Usage

### Combining Tools

You can combine these tools in your own scripts for more advanced functionality:

```javascript
const jsonUtils = require('./json_tools/json_utils.js');
const jsonRepair = require('./json_tools/json_repair.js');

// Custom function that safely processes a JSON file
async function processJSONFile(filePath) {
    // First, validate the file
    if (!jsonUtils.validateJSON(filePath)) {
        // If invalid, try to repair it
        if (!jsonRepair.repairJSONFile(filePath)) {
            console.error(`Could not repair ${filePath}. Aborting.`);
            return false;
        }
    }
    
    // Now safely read the file
    const data = jsonUtils.safeReadJSON(filePath);
    if (!data) {
        console.error(`Could not read ${filePath}. Aborting.`);
        return false;
    }
    
    // Process the data...
    // ...
    
    // Safely write the modified data back to the file
    return jsonUtils.safeWriteJSON(filePath, data);
}
```
