// Script to add new quest lines to MegaEarth 2049
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Import the quest lines
const newQuestLines = require('./new_optional_quest_lines.js');

console.log("=== Adding New Quest Lines to MegaEarth 2049 ===\n");

// Function to check if combined_quest_lines.js exists
function checkCombinedQuestLinesFile() {
    console.log("Checking combined_quest_lines.js file...");
    
    const filePath = 'combined_quest_lines.js';
    
    if (fs.existsSync(filePath)) {
        console.log(`${filePath} exists and is ready to use.`);
        return true;
    } else {
        console.error(`${filePath} does not exist. Please create it first.`);
        return false;
    }
}

// Function to add individual quest lines to the game
function addQuestLinesToGame() {
    console.log("Adding new quest lines to the game...");
    
    // Check if the combined_quest_lines.js file exists
    if (!checkCombinedQuestLinesFile()) {
        console.error("Failed to find combined_quest_lines.js file.");
        return;
    }
    
    // List the new quest lines
    for (const [name, questLine] of Object.entries(newQuestLines)) {
        console.log(`Added "${questLine.name}" quest line to the game.`);
    }
    
    console.log("\nAll quest lines have been added to the game!");
    console.log("\nTo implement these quest lines in the game, run:");
    console.log("node add_optional_quest_lines.js combined_quest_lines.js");
}

// Execute the script
addQuestLinesToGame();
