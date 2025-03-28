// move_event_scripts.js
// Script to move event-related scripts to the AI_generated_scripts folder

const fs = require('fs');
const path = require('path');

console.log("=== MegaEarth 2049 Event Scripts Organizer ===");
console.log("This script will move event-related scripts to the AI_generated_scripts folder.");
console.log("Starting organization process...\n");

// List of event-related scripts to move
const eventScripts = [
    // Event scripts
    'add_events_level36_37.js',
    'add_events_level38_40.js',
    'add_events_level41_45.js',
    'add_events_to_maps.js',
    'add_events_to_maps_level36_37.js',
    'add_events_to_maps_level38_40.js',
    'all_quest_lines.js',
    'batch-edit-tool.js',
    'event-templates.json'
];

let movedCount = 0;

// Move each script to the AI_generated_scripts directory
for (const file of eventScripts) {
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
const thisScriptPath = path.join('.', 'move_event_scripts.js');
const thisScriptDestPath = path.join('AI_generated_scripts', 'move_event_scripts.js');

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

// Move the move_all_ai_scripts.js and move_more_ai_scripts.js scripts to the AI_generated_scripts directory
const moveScripts = [
    'move_all_ai_scripts.js',
    'move_more_ai_scripts.js',
    'move_quest_scripts.js'
];

for (const file of moveScripts) {
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

console.log(`\nMoved ${movedCount} event-related scripts to the AI_generated_scripts folder.`);
console.log("\n=== Organization Complete ===");
console.log(`All event-related scripts have been moved to the AI_generated_scripts folder.`);
