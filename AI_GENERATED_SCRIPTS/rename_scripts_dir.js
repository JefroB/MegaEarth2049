// rename_scripts_dir.js
// Script to rename AI_generated_scripts to AI_GENERATED_SCRIPTS for consistent capitalization

const fs = require('fs');
const path = require('path');

console.log("=== MegaEarth 2049 Directory Renaming ===");
console.log("This script will rename AI_generated_scripts to AI_GENERATED_SCRIPTS for consistent capitalization.");
console.log("Starting renaming process...\n");

const oldDir = 'AI_generated_scripts';
const newDir = 'AI_GENERATED_SCRIPTS';

// Check if the old directory exists
if (!fs.existsSync(oldDir)) {
    console.error(`Error: Directory ${oldDir} does not exist.`);
    process.exit(1);
}

// Check if the new directory already exists
if (fs.existsSync(newDir) && oldDir.toLowerCase() !== newDir.toLowerCase()) {
    console.error(`Error: Directory ${newDir} already exists.`);
    process.exit(1);
}

// Check if this is a case-only rename (Windows is case-insensitive for directories)
if (oldDir.toLowerCase() === newDir.toLowerCase()) {
    console.log(`Performing case-only rename from ${oldDir} to ${newDir}`);
    
    // On Windows, we need to use a temporary name for case-only renames
    const tempDir = `${oldDir}_temp_${Date.now()}`;
    fs.renameSync(oldDir, tempDir);
    fs.renameSync(tempDir, newDir);
    
    console.log(`Successfully renamed ${oldDir} to ${newDir}`);
    console.log("\n=== Renaming Complete ===");
    process.exit(0);
}

// Create a temporary directory with a unique name
const tempDir = `${oldDir}_temp_${Date.now()}`;
console.log(`Creating temporary directory: ${tempDir}`);
fs.renameSync(oldDir, tempDir);

// Create the new directory
console.log(`Creating new directory: ${newDir}`);
fs.mkdirSync(newDir, { recursive: true });

// Copy all files from the temporary directory to the new directory
console.log(`Copying files from ${tempDir} to ${newDir}`);
const files = fs.readdirSync(tempDir);
let copiedCount = 0;

for (const file of files) {
    const sourcePath = path.join(tempDir, file);
    const destPath = path.join(newDir, file);
    
    // Check if it's a file or directory
    const stats = fs.statSync(sourcePath);
    
    if (stats.isFile()) {
        // Copy the file
        const content = fs.readFileSync(sourcePath);
        fs.writeFileSync(destPath, content);
        console.log(`Copied file: ${file}`);
        copiedCount++;
    } else if (stats.isDirectory()) {
        // Copy the directory recursively
        fs.mkdirSync(destPath, { recursive: true });
        const copyDir = (src, dest) => {
            const entries = fs.readdirSync(src);
            for (const entry of entries) {
                const srcPath = path.join(src, entry);
                const destPath = path.join(dest, entry);
                const entryStats = fs.statSync(srcPath);
                
                if (entryStats.isFile()) {
                    const content = fs.readFileSync(srcPath);
                    fs.writeFileSync(destPath, content);
                    console.log(`Copied file: ${path.relative(tempDir, srcPath)}`);
                    copiedCount++;
                } else if (entryStats.isDirectory()) {
                    fs.mkdirSync(destPath, { recursive: true });
                    copyDir(srcPath, destPath);
                }
            }
        };
        
        copyDir(sourcePath, destPath);
        console.log(`Copied directory: ${file}`);
    }
}

// Remove the temporary directory
console.log(`Removing temporary directory: ${tempDir}`);
const removeDir = (dir) => {
    const entries = fs.readdirSync(dir);
    for (const entry of entries) {
        const entryPath = path.join(dir, entry);
        const entryStats = fs.statSync(entryPath);
        
        if (entryStats.isFile()) {
            fs.unlinkSync(entryPath);
        } else if (entryStats.isDirectory()) {
            removeDir(entryPath);
        }
    }
    fs.rmdirSync(dir);
};

removeDir(tempDir);

console.log(`\nSuccessfully renamed ${oldDir} to ${newDir}`);
console.log(`Copied ${copiedCount} files`);
console.log("\n=== Renaming Complete ===");
