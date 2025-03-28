// JSON Repair Tool for MegaEarth 2049
// This script provides advanced repair capabilities for corrupted JSON files

const fs = require('fs');
const path = require('path');
const jsonUtils = require('./json_utils.js');

/**
 * Main function to repair corrupted JSON files
 * @param {string} filePath - Path to the corrupted JSON file
 * @param {boolean} createBackup - Whether to create a backup before repairing (default: true)
 * @returns {boolean} - Success or failure
 */
function repairJSONFile(filePath, createBackup = true) {
    console.log(`\nAttempting to repair: ${filePath}`);
    
    try {
        // Check if file exists
        if (!fs.existsSync(filePath)) {
            console.error(`File not found: ${filePath}`);
            return false;
        }
        
        // Create backup if requested
        if (createBackup) {
            jsonUtils.createJSONBackup(filePath);
        }
        
        // Read the file content
        const fileContent = fs.readFileSync(filePath, 'utf8');
        
        // Try to repair the JSON
        const repairedJSON = advancedJSONRepair(fileContent);
        
        if (repairedJSON) {
            // Write the repaired JSON back to the file
            fs.writeFileSync(filePath, JSON.stringify(repairedJSON, null, 2));
            console.log(`✓ Successfully repaired ${filePath}`);
            return true;
        } else {
            console.error(`× Failed to repair ${filePath}`);
            return false;
        }
    } catch (error) {
        console.error(`× Error repairing ${filePath}:`, error.message);
        return false;
    }
}

/**
 * Advanced JSON repair function with multiple strategies
 * @param {string} jsonString - The corrupted JSON string
 * @returns {Object|null} - Repaired JSON object or null if repair failed
 */
function advancedJSONRepair(jsonString) {
    // Try multiple repair strategies in order of increasing aggressiveness
    
    // Strategy 1: Basic syntax fixes
    try {
        const basicRepair = basicSyntaxFixes(jsonString);
        return JSON.parse(basicRepair);
    } catch (error) {
        console.log("Basic repair failed, trying more aggressive methods...");
    }
    
    // Strategy 2: Structure reconstruction
    try {
        const reconstructed = reconstructJSONStructure(jsonString);
        return JSON.parse(reconstructed);
    } catch (error) {
        console.log("Structure reconstruction failed, trying partial extraction...");
    }
    
    // Strategy 3: Partial extraction
    try {
        return extractValidJSON(jsonString);
    } catch (error) {
        console.log("All repair strategies failed.");
        return null;
    }
}

/**
 * Apply basic syntax fixes to JSON string
 * @param {string} jsonString - The corrupted JSON string
 * @returns {string} - JSON string with basic fixes applied
 */
function basicSyntaxFixes(jsonString) {
    let fixed = jsonString;
    
    // Fix 1: Missing quotes around property names
    fixed = fixed.replace(/([{,]\s*)(\w+)(\s*:)/g, '$1"$2"$3');
    
    // Fix 2: Trailing commas in arrays and objects
    fixed = fixed.replace(/,\s*}/g, '}').replace(/,\s*\]/g, ']');
    
    // Fix 3: Unescaped quotes in strings
    fixed = fixed.replace(/(?<=[^\\])"(?=[^"]*"[^"]*$)/g, '\\"');
    
    // Fix 4: Missing closing brackets and braces
    const openBraces = (fixed.match(/{/g) || []).length;
    const closeBraces = (fixed.match(/}/g) || []).length;
    const openBrackets = (fixed.match(/\[/g) || []).length;
    const closeBrackets = (fixed.match(/\]/g) || []).length;
    
    // Add missing closing braces
    for (let i = 0; i < openBraces - closeBraces; i++) {
        fixed += '}';
    }
    
    // Add missing closing brackets
    for (let i = 0; i < openBrackets - closeBrackets; i++) {
        fixed += ']';
    }
    
    // Fix 5: Replace invalid control characters
    fixed = fixed.replace(/[\x00-\x1F]+/g, ' ');
    
    return fixed;
}

/**
 * Reconstruct JSON structure from corrupted JSON
 * @param {string} jsonString - The corrupted JSON string
 * @returns {string} - Reconstructed JSON string
 */
function reconstructJSONStructure(jsonString) {
    // Identify the root structure (object or array)
    const trimmed = jsonString.trim();
    const isObject = trimmed.startsWith('{');
    const isArray = trimmed.startsWith('[');
    
    if (!isObject && !isArray) {
        throw new Error("Cannot determine root structure");
    }
    
    // Extract valid key-value pairs or array elements
    const elements = [];
    
    if (isObject) {
        // Extract key-value pairs using regex
        const keyValuePattern = /"([^"]+)"\s*:\s*([^,}]+)/g;
        let match;
        
        while ((match = keyValuePattern.exec(jsonString)) !== null) {
            const key = match[1];
            let value = match[2].trim();
            
            // Handle nested objects and arrays
            if (value.startsWith('{') || value.startsWith('[')) {
                // Find the closing bracket/brace
                const openChar = value[0];
                const closeChar = openChar === '{' ? '}' : ']';
                let depth = 1;
                let endIndex = 0;
                
                for (let i = 1; i < jsonString.length - match.index - match[0].length; i++) {
                    const char = jsonString[match.index + match[0].length + i];
                    if (char === openChar) depth++;
                    if (char === closeChar) depth--;
                    
                    if (depth === 0) {
                        endIndex = i + 1;
                        break;
                    }
                }
                
                if (endIndex > 0) {
                    value = jsonString.substr(match.index + match[0].length, endIndex);
                }
            }
            
            // Try to parse the value
            try {
                const parsedValue = JSON.parse(value);
                elements.push(`"${key}": ${JSON.stringify(parsedValue)}`);
            } catch (e) {
                // If parsing fails, use the raw value
                elements.push(`"${key}": ${value}`);
            }
        }
        
        return `{${elements.join(',')}}`;
    } else {
        // Extract array elements
        const arrayPattern = /(\{[^{}]*\}|\[[^\[\]]*\]|"[^"]*"|[^,\[\]]+)/g;
        let match;
        
        while ((match = arrayPattern.exec(jsonString)) !== null) {
            const element = match[1].trim();
            if (element && element !== ',') {
                elements.push(element);
            }
        }
        
        return `[${elements.join(',')}]`;
    }
}

/**
 * Extract valid JSON from corrupted JSON by finding the largest valid subset
 * @param {string} jsonString - The corrupted JSON string
 * @returns {Object} - Extracted valid JSON object
 */
function extractValidJSON(jsonString) {
    // Determine if it's an object or array
    const trimmed = jsonString.trim();
    const isObject = trimmed.startsWith('{');
    const isArray = trimmed.startsWith('[');
    
    if (!isObject && !isArray) {
        throw new Error("Cannot determine root structure");
    }
    
    // Create a minimal valid structure
    const result = isObject ? {} : [];
    
    // For objects, try to extract valid key-value pairs
    if (isObject) {
        const keyValuePattern = /"([^"]+)"\s*:\s*([^,}]+)/g;
        let match;
        
        while ((match = keyValuePattern.exec(jsonString)) !== null) {
            const key = match[1];
            const value = match[2].trim();
            
            try {
                // Try to parse the value
                result[key] = JSON.parse(value);
            } catch (e) {
                // If it's a string without quotes, add quotes
                if (!value.startsWith('"') && !value.startsWith('{') && !value.startsWith('[')) {
                    try {
                        result[key] = JSON.parse(`"${value}"`);
                    } catch (e2) {
                        // If still fails, use a placeholder
                        result[key] = null;
                    }
                }
            }
        }
    } else {
        // For arrays, try to extract valid elements
        const elementPattern = /(\{[^{}]*\}|\[[^\[\]]*\]|"[^"]*"|[^,\[\]]+)/g;
        let match;
        
        while ((match = elementPattern.exec(jsonString)) !== null) {
            const element = match[1].trim();
            if (element && element !== ',') {
                try {
                    result.push(JSON.parse(element));
                } catch (e) {
                    // Skip invalid elements
                }
            }
        }
    }
    
    return result;
}

/**
 * Repair multiple JSON files
 * @param {Array<string>} filePaths - Array of file paths to repair
 * @returns {Object} - Results with success and failure counts
 */
function repairMultipleFiles(filePaths) {
    const results = {
        success: 0,
        failure: 0,
        failedFiles: []
    };
    
    for (const filePath of filePaths) {
        if (repairJSONFile(filePath)) {
            results.success++;
        } else {
            results.failure++;
            results.failedFiles.push(filePath);
        }
    }
    
    return results;
}

/**
 * Repair all invalid JSON files in a directory
 * @param {string} dirPath - Path to the directory
 * @param {boolean} recursive - Whether to search recursively
 * @returns {Object} - Results with success and failure counts
 */
function repairDirectoryJSON(dirPath, recursive = false) {
    console.log(`Validating JSON files in ${dirPath}...`);
    
    // First, validate all JSON files to find invalid ones
    const validationResults = jsonUtils.batchValidateJSON(dirPath, recursive);
    
    if (validationResults.invalid === 0) {
        console.log("All JSON files are valid. No repairs needed.");
        return { success: 0, failure: 0, failedFiles: [] };
    }
    
    console.log(`\nFound ${validationResults.invalid} invalid JSON files. Attempting repairs...`);
    
    // Repair all invalid files
    return repairMultipleFiles(validationResults.invalidFiles);
}

// If this script is run directly (not imported)
if (require.main === module) {
    // Parse command line arguments
    const args = process.argv.slice(2);
    
    if (args.length === 0) {
        console.log("Usage:");
        console.log("  node json_repair.js <file_path> - Repair a specific JSON file");
        console.log("  node json_repair.js --dir <directory_path> - Repair all invalid JSON files in a directory");
        console.log("  node json_repair.js --recursive <directory_path> - Repair all invalid JSON files in a directory and its subdirectories");
    } else if (args[0] === "--dir" && args.length > 1) {
        const results = repairDirectoryJSON(args[1], false);
        console.log(`\nRepair results:`);
        console.log(`- Successfully repaired: ${results.success}`);
        console.log(`- Failed to repair: ${results.failure}`);
        
        if (results.failure > 0) {
            console.log("\nFailed files:");
            results.failedFiles.forEach(file => console.log(`- ${file}`));
        }
    } else if (args[0] === "--recursive" && args.length > 1) {
        const results = repairDirectoryJSON(args[1], true);
        console.log(`\nRepair results:`);
        console.log(`- Successfully repaired: ${results.success}`);
        console.log(`- Failed to repair: ${results.failure}`);
        
        if (results.failure > 0) {
            console.log("\nFailed files:");
            results.failedFiles.forEach(file => console.log(`- ${file}`));
        }
    } else {
        repairJSONFile(args[0]);
    }
}

// Export functions
module.exports = {
    repairJSONFile,
    repairMultipleFiles,
    repairDirectoryJSON,
    advancedJSONRepair
};
