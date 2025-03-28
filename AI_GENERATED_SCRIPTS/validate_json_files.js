// Script to validate all JSON files in the data directory
// This helps identify any corrupted files that might cause issues

const fs = require('fs');
const path = require('path');
const jsonUtils = require('./json_utils.js');

/**
 * Main function to validate JSON files
 */
function validateAllJSONFiles() {
    console.log("Starting JSON validation process...");
    
    // Validate all JSON files in the data directory
    const dataDir = path.join(__dirname, 'data');
    console.log(`\nValidating JSON files in ${dataDir}...`);
    const dataResults = jsonUtils.batchValidateJSON(dataDir, false);
    
    console.log(`\nResults for data directory:`);
    console.log(`- Valid JSON files: ${dataResults.valid}`);
    console.log(`- Invalid JSON files: ${dataResults.invalid}`);
    
    if (dataResults.invalid > 0) {
        console.log("\nInvalid files in data directory:");
        dataResults.invalidFiles.forEach(file => {
            console.log(`- ${file}`);
        });
        
        console.log("\nAttempting to fix invalid files...");
        fixInvalidFiles(dataResults.invalidFiles);
    }
    
    // Validate all JSON files in the temp_events directory if it exists
    const tempEventsDir = path.join(__dirname, 'temp_events');
    if (fs.existsSync(tempEventsDir)) {
        console.log(`\nValidating JSON files in ${tempEventsDir}...`);
        const tempResults = jsonUtils.batchValidateJSON(tempEventsDir, false);
        
        console.log(`\nResults for temp_events directory:`);
        console.log(`- Valid JSON files: ${tempResults.valid}`);
        console.log(`- Invalid JSON files: ${tempResults.invalid}`);
        
        if (tempResults.invalid > 0) {
            console.log("\nInvalid files in temp_events directory:");
            tempResults.invalidFiles.forEach(file => {
                console.log(`- ${file}`);
            });
            
            console.log("\nAttempting to fix invalid files...");
            fixInvalidFiles(tempResults.invalidFiles);
        }
    }
    
    console.log("\nJSON validation process complete.");
}

/**
 * Attempt to fix invalid JSON files
 * @param {Array<string>} invalidFiles - Array of paths to invalid JSON files
 */
function fixInvalidFiles(invalidFiles) {
    let fixed = 0;
    let failed = 0;
    
    for (const filePath of invalidFiles) {
        console.log(`\nAttempting to fix: ${filePath}`);
        
        try {
            // Read the file content
            const content = fs.readFileSync(filePath, 'utf8');
            
            // Try to recover the JSON
            const recoveredJSON = attemptJSONRecovery(content);
            
            if (recoveredJSON) {
                // Create a backup of the original file
                jsonUtils.createJSONBackup(filePath);
                
                // Write the fixed JSON
                fs.writeFileSync(filePath, JSON.stringify(recoveredJSON, null, 2));
                console.log(`✓ Successfully fixed ${filePath}`);
                fixed++;
            } else {
                // Try to restore from backup
                console.log(`× Could not recover JSON. Attempting to restore from backup...`);
                if (jsonUtils.restoreFromBackup(filePath)) {
                    console.log(`✓ Successfully restored ${filePath} from backup`);
                    fixed++;
                } else {
                    console.error(`× Failed to fix or restore ${filePath}`);
                    failed++;
                }
            }
        } catch (error) {
            console.error(`× Error fixing ${filePath}:`, error.message);
            failed++;
        }
    }
    
    console.log(`\nFix results:`);
    console.log(`- Successfully fixed/restored: ${fixed}`);
    console.log(`- Failed to fix: ${failed}`);
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
        
        // 4. Fix unescaped quotes in strings
        const fixedEscapes = fixedBrackets.replace(/(?<!\\)"(?=[^"]*"[^"]*$)/g, '\\"');
        
        // Try to parse the fixed JSON
        return JSON.parse(fixedEscapes);
    } catch (error) {
        console.error("JSON recovery failed:", error.message);
        
        // Try a more aggressive approach for severely corrupted files
        try {
            // Remove all whitespace and try to parse
            const noWhitespace = jsonString.replace(/\s+/g, '');
            return JSON.parse(noWhitespace);
        } catch (error) {
            return null;
        }
    }
}

// Run the validation
validateAllJSONFiles();
