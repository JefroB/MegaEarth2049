/**
 * MegaEarth2049 JSON Utilities
 * Common functions for safely working with JSON files
 */

const fs = require('fs');
const path = require('path');
const fileUtils = require('./file-utils');

// Create backups directory if it doesn't exist
const backupsDir = path.join(__dirname, '..', '..', 'backups');
fileUtils.ensureDirectoryExists(backupsDir);

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
      return fileUtils.writeFile(filePath, jsonString);
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
    
    return fileUtils.copyFile(filePath, backupPath, true) ? backupPath : null;
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
    return fileUtils.copyFile(mostRecentBackup, filePath, true);
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
 * Merge two JSON objects deeply
 * @param {Object} target - Target object
 * @param {Object} source - Source object to merge into target
 * @returns {Object} - Merged object
 */
function deepMerge(target, source) {
  // Create a copy of the target to avoid modifying the original
  const output = Object.assign({}, target);
  
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach(key => {
      if (isObject(source[key])) {
        if (!(key in target)) {
          Object.assign(output, { [key]: source[key] });
        } else {
          output[key] = deepMerge(target[key], source[key]);
        }
      } else {
        Object.assign(output, { [key]: source[key] });
      }
    });
  }
  
  return output;
}

/**
 * Check if a value is an object
 * @param {*} item - Value to check
 * @returns {boolean} - Whether the value is an object
 */
function isObject(item) {
  return (item && typeof item === 'object' && !Array.isArray(item));
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
    const files = fileUtils.listFiles(dirPath, {
      recursive,
      filePattern: '*.json'
    });
    
    for (const filePath of files) {
      if (validateJSON(filePath)) {
        results.valid++;
      } else {
        results.invalid++;
        results.invalidFiles.push(filePath);
      }
    }
    
    console.log(`\nJSON Validation Results:
Valid: ${results.valid}
Invalid: ${results.invalid}
${results.invalid > 0 ? 'Invalid files: ' + results.invalidFiles.join(', ') : ''}`);
    
    return results;
  } catch (error) {
    console.error(`Error validating directory ${dirPath}:`, error.message);
    return results;
  }
}

/**
 * Find and fix common JSON errors in a file
 * @param {string} filePath - Path to the JSON file
 * @returns {boolean} - Success or failure
 */
function repairJSONFile(filePath) {
  try {
    if (!fs.existsSync(filePath)) {
      console.error(`File not found: ${filePath}`);
      return false;
    }
    
    // Create backup
    createJSONBackup(filePath);
    
    // Read file content
    const fileContent = fs.readFileSync(filePath, 'utf8');
    
    // Try to parse as is
    try {
      JSON.parse(fileContent);
      console.log(`${filePath} is already valid JSON, no repair needed`);
      return true;
    } catch (parseError) {
      console.log(`Attempting to repair ${filePath}...`);
      
      // Try to recover
      const recoveredJSON = attemptJSONRecovery(fileContent);
      if (!recoveredJSON) {
        console.error(`Could not repair ${filePath}`);
        return false;
      }
      
      // Write the repaired JSON
      const repairedContent = JSON.stringify(recoveredJSON, null, 2);
      fs.writeFileSync(filePath, repairedContent);
      console.log(`Successfully repaired ${filePath}`);
      return true;
    }
  } catch (error) {
    console.error(`Error repairing ${filePath}:`, error.message);
    return false;
  }
}

module.exports = {
  safeReadJSON,
  safeWriteJSON,
  createJSONBackup,
  restoreFromBackup,
  validateJSON,
  attemptJSONRecovery,
  deepMerge,
  batchValidateJSON,
  repairJSONFile
};
