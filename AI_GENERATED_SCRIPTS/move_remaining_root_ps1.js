// move_remaining_root_ps1.js
// Script to move remaining PowerShell scripts from the root directory to the utils/powershell directory

const fs = require('fs');
const path = require('path');

console.log("=== MegaEarth 2049 Remaining PowerShell Scripts Organizer ===");
console.log("This script will move remaining PowerShell scripts from the root directory to the utils/powershell directory.");
console.log("Starting organization process...\n");

// List of PowerShell scripts to check in the root directory
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

// Ensure the utils/powershell directory exists
const utilsPsDir = path.join('utils', 'powershell');
if (!fs.existsSync(utilsPsDir)) {
    fs.mkdirSync(utilsPsDir, { recursive: true });
    console.log(`Created directory: ${utilsPsDir}`);
}

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

// Check for boss_placeholder_sprites/copy_to_game.ps1
const bossScriptPath = path.join('.', 'boss_placeholder_sprites', 'copy_to_game.ps1');
const bossScriptDestPath = path.join(utilsPsDir, 'copy_boss_to_game.ps1');

if (fs.existsSync(bossScriptPath)) {
    console.log(`Moving ${bossScriptPath} to ${bossScriptDestPath}...`);
    
    try {
        // Read the content of the file
        const content = fs.readFileSync(bossScriptPath, 'utf8');
        
        // Write the content to the destination
        fs.writeFileSync(bossScriptDestPath, content);
        
        // Delete the original file
        fs.unlinkSync(bossScriptPath);
        
        console.log(`Successfully moved ${bossScriptPath} to ${utilsPsDir} folder as copy_boss_to_game.ps1.`);
        movedCount++;
    } catch (error) {
        console.error(`Error moving ${bossScriptPath}:`, error.message);
    }
} else {
    console.log(`File ${bossScriptPath} does not exist or has already been moved.`);
}

console.log(`\nMoved ${movedCount} remaining PowerShell scripts to the ${utilsPsDir} folder.`);
console.log("\n=== Organization Complete ===");
console.log(`All remaining PowerShell scripts have been moved to the ${utilsPsDir} folder.`);
