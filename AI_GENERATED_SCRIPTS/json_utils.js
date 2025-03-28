// JSON Utilities for MegaEarth 2049
// This script provides utility functions for safely working with large JSON files

const fs = require('fs');
const path = require('path');

// Create backups directory if it doesn't exist
const backupsDir = path.join(__dirname, 'backups');
if (!fs.existsSync(backupsDir)) {
    fs.mkdirSync(backupsDir);
    console.log("Created backups directory");
}

/**
 * Safely read a JSON file with error handling
 * @param {string} filePath - Path to the JSON file
 * @param {boolean} createBackup - Whether to create a backup before reading (default: true)
 * @returns {Object|null} - Parsed JSON object or null if error
 */
function safeReadJSON(filePath, createBackup = true) {
    try {
        // Check if file exists
        if (!fs.existsSync(filePath)) {
            console.error(`File not found: ${filePath}`);
            return null;
        }

        // Create backup if requested
        if (createBackup) {
            createJSONBackup(filePath);
        }

        // Read and parse the file
        const fileContent = fs.readFileSync(filePath, 'utf8');
        
        try {
            // Try to parse the JSON
            return JSON.parse(fileContent);
        } catch (parseError) {
            console.error(`Error parsing JSON in ${filePath}:`, parseError.message);
            
            // Try to recover the JSON
            const recoveredJSON = attemptJSONRecovery(fileContent);
            if (recoveredJSON) {
                console.log(`Successfully recovered JSON from ${filePath}`);
                return recoveredJSON;
            }
            
            return null;
        }
    } catch (error) {
        console.error(`Error reading file ${filePath}:`, error.message);
        return null;
    }
}

/**
 * Safely write a JSON file with error handling and backup
 * @param {string} filePath - Path to the JSON file
 * @param {Object} data - Data to write
 * @param {boolean} createBackup - Whether to create a backup before writing (default: true)
 * @param {boolean} prettyPrint - Whether to format the JSON with indentation (default: true)
 * @returns {boolean} - Success or failure
 */
function safeWriteJSON(filePath, data, createBackup = true, prettyPrint = true) {
    try {
        // Create backup if requested and file exists
        if (createBackup && fs.existsSync(filePath)) {
            createJSONBackup(filePath);
        }
        
        // Validate that data is valid JSON by stringifying it
        try {
            const jsonString = prettyPrint 
                ? JSON.stringify(data, null, 2) 
                : JSON.stringify(data);
            
            // Write the file
            fs.writeFileSync(filePath, jsonString);
            console.log(`Successfully wrote JSON to ${filePath}`);
            return true;
        } catch (stringifyError) {
            console.error(`Error stringifying JSON for ${filePath}:`, stringifyError.message);
            return false;
        }
    } catch (error) {
        console.error(`Error writing file ${filePath}:`, error.message);
        return false;
    }
}

/**
 * Create a backup of a JSON file
 * @param {string} filePath - Path to the JSON file
 * @returns {string|null} - Path to the backup file or null if error
 */
function createJSONBackup(filePath) {
    try {
        if (!fs.existsSync(filePath)) {
            console.error(`Cannot create backup, file not found: ${filePath}`);
            return null;
        }
        
        const fileName = path.basename(filePath);
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const backupPath = path.join(backupsDir, `${fileName}.${timestamp}.bak`);
        
        fs.copyFileSync(filePath, backupPath);
        console.log(`Created backup: ${backupPath}`);
        return backupPath;
    } catch (error) {
        console.error(`Error creating backup for ${filePath}:`, error.message);
        return null;
    }
}

/**
 * Restore a JSON file from the most recent backup
 * @param {string} filePath - Path to the JSON file to restore
 * @returns {boolean} - Success or failure
 */
function restoreFromBackup(filePath) {
    try {
        const fileName = path.basename(filePath);
        const backups = fs.readdirSync(backupsDir)
            .filter(file => file.startsWith(fileName + '.'))
            .sort()
            .reverse(); // Most recent first
        
        if (backups.length === 0) {
            console.error(`No backups found for ${fileName}`);
            return false;
        }
        
        const mostRecentBackup = path.join(backupsDir, backups[0]);
        fs.copyFileSync(mostRecentBackup, filePath);
        console.log(`Restored ${filePath} from backup: ${mostRecentBackup}`);
        return true;
    } catch (error) {
        console.error(`Error restoring backup for ${filePath}:`, error.message);
        return false;
    }
}

/**
 * Attempt to recover corrupted JSON
 * @param {string} jsonString - The corrupted JSON string
 * @returns {Object|null} - Recovered JSON object or null if recovery failed
 */
function attemptJSONRecovery(jsonString) {
    try {
        // Try to fix common JSON errors
        
        // 1. Fix missing quotes around property names
        const fixedQuotes = jsonString.replace(/([{,]\s*)(\w+)(\s*:)/g, '$1"$2"$3');
        
        // 2. Fix trailing commas in arrays and objects
        const fixedCommas = fixedQuotes
            .replace(/,\s*}/g, '}')
            .replace(/,\s*\]/g, ']');
        
        // 3. Fix missing closing brackets and braces
        let fixedBrackets = fixedCommas;
        const openBraces = (fixedBrackets.match(/{/g) || []).length;
        const closeBraces = (fixedBrackets.match(/}/g) || []).length;
        const openBrackets = (fixedBrackets.match(/\[/g) || []).length;
        const closeBrackets = (fixedBrackets.match(/\]/g) || []).length;
        
        // Add missing closing braces
        for (let i = 0; i < openBraces - closeBraces; i++) {
            fixedBrackets += '}';
        }
        
        // Add missing closing brackets
        for (let i = 0; i < openBrackets - closeBrackets; i++) {
            fixedBrackets += ']';
        }
        
        // Try to parse the fixed JSON
        return JSON.parse(fixedBrackets);
    } catch (error) {
        console.error("JSON recovery failed:", error.message);
        return null;
    }
}

/**
 * Validate a JSON file without modifying it
 * @param {string} filePath - Path to the JSON file
 * @returns {boolean} - Whether the JSON is valid
 */
function validateJSON(filePath) {
    try {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        JSON.parse(fileContent);
        console.log(`${filePath} contains valid JSON`);
        return true;
    } catch (error) {
        console.error(`${filePath} contains invalid JSON:`, error.message);
        return false;
    }
}

/**
 * Add an event to a map file with safety checks
 * @param {string} mapPath - Path to the map file
 * @param {Object} eventData - The event data to add
 * @returns {number|null} - The ID of the added event or null if failed
 */
function safeAddEventToMap(mapPath, eventData) {
    // Read the map file
    const mapData = safeReadJSON(mapPath);
    if (!mapData) {
        return null;
    }
    
    // Find the highest event ID
    let maxId = 0;
    for (const eventId in mapData.events) {
        if (eventId && !isNaN(parseInt(eventId))) {
            maxId = Math.max(maxId, parseInt(eventId));
        }
    }
    
    // Set the new event ID
    const newId = maxId + 1;
    eventData.id = newId;
    
    // Add the event to the map
    if (!mapData.events) {
        mapData.events = [];
    }
    mapData.events[newId] = eventData;
    
    // Write the updated map file
    if (safeWriteJSON(mapPath, mapData)) {
        console.log(`Added event ${eventData.name} to ${path.basename(mapPath)} with ID ${newId}`);
        return newId;
    }
    
    return null;
}

/**
 * Batch validate all JSON files in a directory
 * @param {string} dirPath - Path to the directory
 * @param {boolean} recursive - Whether to search recursively
 * @returns {Object} - Results with valid and invalid file counts
 */
function batchValidateJSON(dirPath, recursive = false) {
    const results = {
        valid: 0,
        invalid: 0,
        invalidFiles: []
    };
    
    try {
        const files = fs.readdirSync(dirPath);
        
        for (const file of files) {
            const filePath = path.join(dirPath, file);
            const stats = fs.statSync(filePath);
            
            if (stats.isDirectory() && recursive) {
                // Recursively validate files in subdirectory
                const subResults = batchValidateJSON(filePath, recursive);
                results.valid += subResults.valid;
                results.invalid += subResults.invalid;
                results.invalidFiles = results.invalidFiles.concat(subResults.invalidFiles);
            } else if (stats.isFile() && file.endsWith('.json')) {
                // Validate JSON file
                if (validateJSON(filePath)) {
                    results.valid++;
                } else {
                    results.invalid++;
                    results.invalidFiles.push(filePath);
                }
            }
        }
    } catch (error) {
        console.error(`Error validating directory ${dirPath}:`, error.message);
    }
    
    return results;
}

// Export utility functions
module.exports = {
    safeReadJSON,
    safeWriteJSON,
    createJSONBackup,
    restoreFromBackup,
    validateJSON,
    safeAddEventToMap,
    batchValidateJSON
};
