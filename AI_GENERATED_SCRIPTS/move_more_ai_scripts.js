// move_more_ai_scripts.js
// Script to move more AI-generated scripts to the AI_generated_scripts folder

const fs = require('fs');
const path = require('path');

console.log("=== MegaEarth 2049 More AI Scripts Organizer ===");
console.log("This script will move more AI-generated scripts to the AI_generated_scripts folder.");
console.log("Starting organization process...\n");

// List of additional AI-generated scripts to move
const aiScripts = [
    // Wasteland quest scripts
    'virtualRealityAddiction_quest.js',
    'wastelandamusementpark_quest.js',
    'wastelandbotanicalgardens_quest.js',
    'wastelandcircus_quest.js',
    'wastelandculinarycompetition_quest.js',
    'wastelandfashion_quest.js',
    'wastelandfilmfestival_quest.js',
    'wastelandhotspringsresort_quest.js',
    'wastelandlibrarynetwork_quest.js',
    'wastelandmuseumofhistory_quest.js',
    'wastelandmusicfestival_quest.js',
    'wastelandobservatory_quest.js',
    'wastelandolympics_quest.js',
    'wastelandRadioDJ_quest.js',
    'wastelandradionetwork_quest.js',
    'wastelandsportsleague_quest.js',
    'wastelandtheatertroupe_quest.js',
    'wastelandtradingcaravan_quest.js',
    'wastelanduniversity_quest.js',
    
    // Quest batch scripts
    'more_quest_lines_batch4.js',
    'more_quest_lines_batch5.js',
    
    // Other quest-related scripts
    'combined_quest_lines.js',
    'push_to_github.js',
    'quest_lines_summary.md',
    'generated_quest_lines_summary.md',
    
    // JSON utility scripts
    'json_utils.js',
    'validate_json_files.js',
    'safe_add_quest_events.js',
    'add_quest_events_to_maps.js',
    
    // Level quest scripts
    'level34_35_quests_summary.md',
    'level36_37_quests_summary.md',
    'level38_40_quests_summary.md',
    'level41_45_quests_summary.md',
    'level46_50_quests_summary.md'
];

let movedCount = 0;

// Move each script to the AI_generated_scripts directory
for (const file of aiScripts) {
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
const thisScriptPath = path.join('.', 'move_more_ai_scripts.js');
const thisScriptDestPath = path.join('AI_generated_scripts', 'move_more_ai_scripts.js');

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

console.log(`\nMoved ${movedCount} additional AI-generated scripts to the AI_generated_scripts folder.`);
console.log("\n=== Organization Complete ===");
console.log(`All additional AI-generated scripts have been moved to the AI_generated_scripts folder.`);
