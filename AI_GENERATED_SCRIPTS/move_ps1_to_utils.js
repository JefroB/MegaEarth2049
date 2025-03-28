// move_ps1_to_utils.js
// Script to move PowerShell scripts to the utils/powershell directory

const fs = require('fs');
const path = require('path');
const fileUtils = require('../utils/core/file-utils');

console.log("=== MegaEarth 2049 PowerShell Scripts Organizer ===");
console.log("This script will move PowerShell scripts to the utils/powershell directory.");
console.log("Starting organization process...\n");

// List of PowerShell scripts to move
const psScripts = [
    'copy_art_assets.ps1',
    'copy_missing_assets.ps1',
    'create_art_assets.ps1',
    'update_enemies_json.ps1',
    'generate_placeholder_sprites.ps1',
    'create_missing_art_assets.ps1',
    'create_boss_art_assets.ps1',
    'generate_boss_placeholder_sprites.ps1',
    'update_boss_enemies_json.ps1'
];

// Create a README.md file for the utils/powershell directory
const readmeContent = `# MegaEarth2049 PowerShell Utilities

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

\`\`\`powershell
# Import the core utilities
. "$PSScriptRoot\\ps-core.ps1"

# Use the utility functions
Ensure-DirectoryExists -DirectoryPath "path/to/directory"
\`\`\`
`;

// Ensure the utils/powershell directory exists
const utilsPsDir = path.join('utils', 'powershell');
if (!fs.existsSync(utilsPsDir)) {
    fs.mkdirSync(utilsPsDir, { recursive: true });
    console.log(`Created directory: ${utilsPsDir}`);
}

// Write the README.md file
fs.writeFileSync(path.join(utilsPsDir, 'README.md'), readmeContent);
console.log(`Created README.md in ${utilsPsDir}`);

let movedCount = 0;

// Move each script to the utils/powershell directory
for (const file of psScripts) {
    const sourcePath = path.join('.', file);
    const destPath = path.join(utilsPsDir, file);
    
    if (fs.existsSync(sourcePath)) {
        console.log(`Moving ${sourcePath} to ${destPath}...`);
        
        try {
            // Read the content of the file
            const content = fs.readFileSync(sourcePath, 'utf8');
            
            // Write the content to the destination
            fs.writeFileSync(destPath, content);
            
            // Delete the original file
            fs.unlinkSync(sourcePath);
            
            console.log(`Successfully moved ${file} to ${utilsPsDir} folder.`);
            movedCount++;
        } catch (error) {
            console.error(`Error moving ${file}:`, error.message);
        }
    } else {
        console.log(`File ${sourcePath} does not exist or has already been moved.`);
    }
}

console.log(`\nMoved ${movedCount} PowerShell scripts to the ${utilsPsDir} folder.`);
console.log("\n=== Organization Complete ===");
console.log(`All PowerShell scripts have been moved to the ${utilsPsDir} folder.`);
