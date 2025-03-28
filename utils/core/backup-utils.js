/**
 * MegaEarth2049 Backup Utilities
 * Common functions for creating and managing backups
 */

const fs = require('fs');
const path = require('path');
const fileUtils = require('./file-utils');

// Default backup directory
const DEFAULT_BACKUP_DIR = path.join(__dirname, '..', '..', 'backups');

// Ensure the backup directory exists
fileUtils.ensureDirectoryExists(DEFAULT_BACKUP_DIR);

/**
 * Create a backup of a file with timestamp
 * @param {string} filePath - Path to the file to backup
 * @param {string} backupDir - Directory to store backups (default: project's backup directory)
 * @param {string} suffix - Suffix to add to the backup filename (default: 'bak')
 * @returns {string|null} - Path to the backup file or null if error
 */
function createBackup(filePath, backupDir = DEFAULT_BACKUP_DIR, suffix = 'bak') {
  try {
    if (!fs.existsSync(filePath)) {
      console.error(`Cannot create backup, file not found: ${filePath}`);
      return null;
    }
    
    // Ensure backup directory exists
    fileUtils.ensureDirectoryExists(backupDir);
    
    // Create backup filename with timestamp
    const fileName = path.basename(filePath);
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupPath = path.join(backupDir, `${fileName}.${timestamp}.${suffix}`);
    
    // Copy the file
    if (fileUtils.copyFile(filePath, backupPath, true)) {
      console.log(`Created backup: ${backupPath}`);
      return backupPath;
    }
    
    return null;
  } catch (error) {
    console.error(`Error creating backup for ${filePath}:`, error.message);
    return null;
  }
}

/**
 * Restore a file from its most recent backup
 * @param {string} filePath - Path to the file to restore
 * @param {string} backupDir - Directory containing backups (default: project's backup directory)
 * @param {string} suffix - Suffix of backup files (default: 'bak')
 * @returns {boolean} - Success or failure
 */
function restoreFromBackup(filePath, backupDir = DEFAULT_BACKUP_DIR, suffix = 'bak') {
  try {
    const fileName = path.basename(filePath);
    
    // Find all backups for this file
    const backups = fs.readdirSync(backupDir)
      .filter(file => file.startsWith(fileName + '.') && file.endsWith('.' + suffix))
      .sort()
      .reverse(); // Most recent first
    
    if (backups.length === 0) {
      console.error(`No backups found for ${fileName}`);
      return false;
    }
    
    // Get the most recent backup
    const mostRecentBackup = path.join(backupDir, backups[0]);
    
    // Restore the file
    if (fileUtils.copyFile(mostRecentBackup, filePath, true)) {
      console.log(`Restored ${filePath} from backup: ${mostRecentBackup}`);
      return true;
    }
    
    return false;
  } catch (error) {
    console.error(`Error restoring backup for ${filePath}:`, error.message);
    return false;
  }
}

/**
 * List all backups for a file
 * @param {string} filePath - Path to the file
 * @param {string} backupDir - Directory containing backups (default: project's backup directory)
 * @param {string} suffix - Suffix of backup files (default: 'bak')
 * @returns {string[]} - Array of backup file paths
 */
function listBackups(filePath, backupDir = DEFAULT_BACKUP_DIR, suffix = 'bak') {
  try {
    const fileName = path.basename(filePath);
    
    // Find all backups for this file
    const backups = fs.readdirSync(backupDir)
      .filter(file => file.startsWith(fileName + '.') && file.endsWith('.' + suffix))
      .sort()
      .reverse() // Most recent first
      .map(file => path.join(backupDir, file));
    
    return backups;
  } catch (error) {
    console.error(`Error listing backups for ${filePath}:`, error.message);
    return [];
  }
}

/**
 * Clean up old backups, keeping only the specified number of most recent ones
 * @param {string} filePath - Path to the file
 * @param {number} keepCount - Number of most recent backups to keep (default: 5)
 * @param {string} backupDir - Directory containing backups (default: project's backup directory)
 * @param {string} suffix - Suffix of backup files (default: 'bak')
 * @returns {number} - Number of backups deleted
 */
function cleanupBackups(filePath, keepCount = 5, backupDir = DEFAULT_BACKUP_DIR, suffix = 'bak') {
  try {
    const backups = listBackups(filePath, backupDir, suffix);
    
    if (backups.length <= keepCount) {
      console.log(`No backups to clean up for ${path.basename(filePath)}`);
      return 0;
    }
    
    // Keep the most recent backups and delete the rest
    const backupsToDelete = backups.slice(keepCount);
    let deletedCount = 0;
    
    for (const backupPath of backupsToDelete) {
      if (fileUtils.deleteFile(backupPath)) {
        deletedCount++;
      }
    }
    
    console.log(`Cleaned up ${deletedCount} old backups for ${path.basename(filePath)}`);
    return deletedCount;
  } catch (error) {
    console.error(`Error cleaning up backups for ${filePath}:`, error.message);
    return 0;
  }
}

/**
 * Create a backup of a directory
 * @param {string} dirPath - Path to the directory to backup
 * @param {string} backupDir - Directory to store backups (default: project's backup directory)
 * @returns {string|null} - Path to the backup directory or null if error
 */
function createDirectoryBackup(dirPath, backupDir = DEFAULT_BACKUP_DIR) {
  try {
    if (!fs.existsSync(dirPath)) {
      console.error(`Cannot create backup, directory not found: ${dirPath}`);
      return null;
    }
    
    // Ensure backup directory exists
    fileUtils.ensureDirectoryExists(backupDir);
    
    // Create backup directory name with timestamp
    const dirName = path.basename(dirPath);
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupDirPath = path.join(backupDir, `${dirName}_${timestamp}`);
    
    // Create the backup directory
    fileUtils.ensureDirectoryExists(backupDirPath);
    
    // Copy all files from the source directory to the backup directory
    const files = fileUtils.listFiles(dirPath, { recursive: false });
    let copiedCount = 0;
    
    for (const filePath of files) {
      const relativePath = path.relative(dirPath, filePath);
      const destPath = path.join(backupDirPath, relativePath);
      
      if (fileUtils.copyFile(filePath, destPath, true)) {
        copiedCount++;
      }
    }
    
    console.log(`Created directory backup: ${backupDirPath} (${copiedCount} files)`);
    return backupDirPath;
  } catch (error) {
    console.error(`Error creating directory backup for ${dirPath}:`, error.message);
    return null;
  }
}

module.exports = {
  DEFAULT_BACKUP_DIR,
  createBackup,
  restoreFromBackup,
  listBackups,
  cleanupBackups,
  createDirectoryBackup
};
