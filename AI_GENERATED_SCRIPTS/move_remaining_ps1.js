// move_remaining_ps1.js
// Script to move remaining PowerShell scripts to the AI_POWERSHELL_SCRIPTS folder

const fs = require('fs');
const path = require('path');

console.log("=== MegaEarth 2049 Remaining PowerShell Scripts Organizer ===");
console.log("This script will move remaining PowerShell scripts to the AI_POWERSHELL_SCRIPTS folder.");
console.log("Starting organization process...\n");

// List of remaining PowerShell scripts to move
const remainingScripts = [
    'boss_placeholder_sprites/copy_to_game.ps1'
];

let movedCount = 0;

// Move each script to the AI_POWERSHELL_SCRIPTS directory
for (const file of remainingScripts) {
    const sourcePath = path.join('.', file);
    const destPath = path.join('AI_POWERSHELL_SCRIPTS', path.basename(file));
    
    if (fs.existsSync(sourcePath)) {
        console.log(`Moving ${sourcePath} to ${destPath}...`);
        
        try {
            // Read the content of the file
            const content = fs.readFileSync(sourcePath, 'utf8');
            
            // Write the content to the destination
            fs.writeFileSync(destPath, content);
            
            // Delete the original file
            fs.unlinkSync(sourcePath);
            
            console.log(`Successfully moved ${file} to AI_POWERSHELL_SCRIPTS folder.`);
            movedCount++;
        } catch (error) {
            console.error(`Error moving ${file}:`, error.message);
        }
    } else {
        console.log(`File ${sourcePath} does not exist or has already been moved.`);
    }
}

// Move this script to the AI_generated_scripts directory
const thisScriptPath = path.join('.', 'move_remaining_ps1.js');
const thisScriptDestPath = path.join('AI_generated_scripts', 'move_remaining_ps1.js');

if (fs.existsSync(thisScriptPath)) {
    console.log(`Moving ${thisScriptPath} to ${thisScriptDestPath}...`);
    
    try {
        // Read the content of the file
        const content = fs.readFileSync(thisScriptPath, 'utf8');
        
        // Write the content to the destination
        fs.writeFileSync(thisScriptDestPath, content);
        
        console.log(`Successfully moved ${thisScriptPath} to AI_generated_scripts folder.`);
        movedCount++;
    } catch (error) {
        console.error(`Error moving ${thisScriptPath}:`, error.message);
    }
}

console.log(`\nMoved ${movedCount} remaining PowerShell scripts to the AI_POWERSHELL_SCRIPTS folder.`);
console.log("\n=== Organization Complete ===");
console.log(`All remaining PowerShell scripts have been moved to the AI_POWERSHELL_SCRIPTS folder.`);
