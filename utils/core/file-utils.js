/**
 * MegaEarth2049 File Utilities
 * Common functions for file system operations
 */

const fs = require('fs');
const path = require('path');

/**
 * Ensures a directory exists, creating it if necessary
 * @param {string} dirPath - Path to the directory
 * @returns {boolean} - Whether the directory exists or was created successfully
 */
function ensureDirectoryExists(dirPath) {
  try {
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
      console.log(`Created directory: ${dirPath}`);
    }
    return true;
  } catch (error) {
    console.error(`Error creating directory ${dirPath}:`, error.message);
    return false;
  }
}

/**
 * Safely copy a file with error handling
 * @param {string} sourcePath - Source file path
 * @param {string} destPath - Destination file path
 * @param {boolean} overwrite - Whether to overwrite if destination exists
 * @returns {boolean} - Success or failure
 */
function copyFile(sourcePath, destPath, overwrite = false) {
  try {
    // Check if source exists
    if (!fs.existsSync(sourcePath)) {
      console.error(`Source file not found: ${sourcePath}`);
      return false;
    }
    
    // Check if destination exists and overwrite is false
    if (fs.existsSync(destPath) && !overwrite) {
      console.error(`Destination file already exists: ${destPath}`);
      return false;
    }
    
    // Ensure destination directory exists
    const destDir = path.dirname(destPath);
    ensureDirectoryExists(destDir);
    
    // Copy the file
    fs.copyFileSync(sourcePath, destPath);
    console.log(`Copied ${sourcePath} to ${destPath}`);
    return true;
  } catch (error) {
    console.error(`Error copying file from ${sourcePath} to ${destPath}:`, error.message);
    return false;
  }
}

/**
 * Safely move a file with error handling
 * @param {string} sourcePath - Source file path
 * @param {string} destPath - Destination file path
 * @param {boolean} overwrite - Whether to overwrite if destination exists
 * @returns {boolean} - Success or failure
 */
function moveFile(sourcePath, destPath, overwrite = false) {
  try {
    // First copy the file
    if (!copyFile(sourcePath, destPath, overwrite)) {
      return false;
    }
    
    // Then delete the original
    fs.unlinkSync(sourcePath);
    console.log(`Moved ${sourcePath} to ${destPath}`);
    return true;
  } catch (error) {
    console.error(`Error moving file from ${sourcePath} to ${destPath}:`, error.message);
    return false;
  }
}

/**
 * List files in a directory with optional filtering
 * @param {string} dirPath - Path to the directory
 * @param {object} options - Options for listing
 * @param {boolean} options.recursive - Whether to list files recursively
 * @param {string} options.filePattern - Pattern to match filenames (e.g., '*.js')
 * @param {function} options.filter - Custom filter function
 * @returns {string[]} - Array of file paths
 */
function listFiles(dirPath, options = {}) {
  const { recursive = false, filePattern = '*', filter = null } = options;
  
  try {
    if (!fs.existsSync(dirPath)) {
      console.error(`Directory not found: ${dirPath}`);
      return [];
    }
    
    let results = [];
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dirPath, entry.name);
      
      if (entry.isDirectory() && recursive) {
        // Recursively list files in subdirectory
        results = results.concat(listFiles(fullPath, options));
      } else if (entry.isFile()) {
        // Check if file matches pattern
        if (filePattern !== '*') {
          const regex = new RegExp(filePattern.replace(/\*/g, '.*'));
          if (!regex.test(entry.name)) {
            continue;
          }
        }
        
        // Apply custom filter if provided
        if (filter && !filter(fullPath, entry.name)) {
          continue;
        }
        
        results.push(fullPath);
      }
    }
    
    return results;
  } catch (error) {
    console.error(`Error listing files in ${dirPath}:`, error.message);
    return [];
  }
}

/**
 * Read a file with error handling
 * @param {string} filePath - Path to the file
 * @returns {string|null} - File content or null if error
 */
function readFile(filePath) {
  try {
    if (!fs.existsSync(filePath)) {
      console.error(`File not found: ${filePath}`);
      return null;
    }
    
    return fs.readFileSync(filePath, 'utf8');
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error.message);
    return null;
  }
}

/**
 * Write to a file with error handling
 * @param {string} filePath - Path to the file
 * @param {string} content - Content to write
 * @param {boolean} overwrite - Whether to overwrite if file exists
 * @returns {boolean} - Success or failure
 */
function writeFile(filePath, content, overwrite = true) {
  try {
    // Check if file exists and overwrite is false
    if (fs.existsSync(filePath) && !overwrite) {
      console.error(`File already exists: ${filePath}`);
      return false;
    }
    
    // Ensure directory exists
    const dirPath = path.dirname(filePath);
    ensureDirectoryExists(dirPath);
    
    // Write the file
    fs.writeFileSync(filePath, content);
    console.log(`Successfully wrote to ${filePath}`);
    return true;
  } catch (error) {
    console.error(`Error writing file ${filePath}:`, error.message);
    return false;
  }
}

/**
 * Delete a file with error handling
 * @param {string} filePath - Path to the file
 * @returns {boolean} - Success or failure
 */
function deleteFile(filePath) {
  try {
    if (!fs.existsSync(filePath)) {
      console.error(`File not found: ${filePath}`);
      return false;
    }
    
    fs.unlinkSync(filePath);
    console.log(`Deleted ${filePath}`);
    return true;
  } catch (error) {
    console.error(`Error deleting file ${filePath}:`, error.message);
    return false;
  }
}

/**
 * Get file stats with error handling
 * @param {string} filePath - Path to the file
 * @returns {object|null} - File stats or null if error
 */
function getFileStats(filePath) {
  try {
    if (!fs.existsSync(filePath)) {
      console.error(`File not found: ${filePath}`);
      return null;
    }
    
    return fs.statSync(filePath);
  } catch (error) {
    console.error(`Error getting stats for ${filePath}:`, error.message);
    return null;
  }
}

module.exports = {
  ensureDirectoryExists,
  copyFile,
  moveFile,
  listFiles,
  readFile,
  writeFile,
  deleteFile,
  getFileStats
};
