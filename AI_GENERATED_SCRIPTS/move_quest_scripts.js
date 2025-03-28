// move_quest_scripts.js
// Script to move quest-related scripts to the AI_generated_scripts folder

const fs = require('fs');
const path = require('path');

console.log("=== MegaEarth 2049 Quest Scripts Organizer ===");
console.log("This script will move quest-related scripts to the AI_generated_scripts folder.");
console.log("Starting organization process...\n");

// List of quest-related scripts to move
const questScripts = [
    // Level quest scripts
    'level34_35_quests.js',
    'level36_37_quests.js',
    'level38_40_quests.js',
    'level41_45_quests.js',
    'level41_quests.js',
    'level42_quests.js',
    'level43_quests.js',
    'level44_quests.js',
    'level45_quests.js',
    'level46_50_quests.js',
    'level46_quests.js',
    'level47_quests.js',
    'level48_quests.js',
    'level49_quests.js',
    'level50_quests.js',
    
    // Sidequest scripts
    'level34_35_sidequests.js',
    'level36_37_sidequests.js',
    'level38_40_sidequests.js',
    
    // Add quest scripts
    'add_level34_35_quests.js',
    'add_level36_37_quests.js',
    'add_quests.js',
    'add_sidequests.js',
    
    // Quest instructions
    'add_quests_instructions.md'
];

let movedCount = 0;

// Move each script to the AI_generated_scripts directory
for (const file of questScripts) {
    const sourcePath = path.join('.', file);
    const destPath = path.join('AI_generated_scripts', file);
    
    if (fs.existsSync(sourcePath)) {
        console.log(`Moving ${sourcePath} to ${destPath}...`);
        
        try {
            // Read the content of the file
            const content = fs.readFileSync(sourcePath, 'utf8');
            
            // Write the content to the destination
            fs.writeFileSync(destPath, content);
            
            // Delete the original file
            fs.unlinkSync(sourcePath);
            
            console.log(`Successfully moved ${file} to AI_generated_scripts folder.`);
            movedCount++;
        } catch (error) {
            console.error(`Error moving ${file}:`, error.message);
        }
    } else {
        console.log(`File ${sourcePath} does not exist or has already been moved.`);
    }
}

// Move this script to the AI_generated_scripts directory
const thisScriptPath = path.join('.', 'move_quest_scripts.js');
const thisScriptDestPath = path.join('AI_generated_scripts', 'move_quest_scripts.js');

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

console.log(`\nMoved ${movedCount} quest-related scripts to the AI_generated_scripts folder.`);
console.log("\n=== Organization Complete ===");
console.log(`All quest-related scripts have been moved to the AI_generated_scripts folder.`);
