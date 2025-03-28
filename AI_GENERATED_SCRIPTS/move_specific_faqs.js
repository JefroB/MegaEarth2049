// move_specific_faqs.js
// Script to move specific FAQ files to the GameFAQs folder

const fs = require('fs');
const path = require('path');

console.log("=== MegaEarth 2049 GameFAQs Organizer ===");
console.log("This script will move specific FAQ files to the GameFAQs folder.");
console.log("Starting organization process...\n");

// Create GameFAQs directory if it doesn't exist
const gameFaqsDir = 'GameFAQs';
if (!fs.existsSync(gameFaqsDir)) {
    console.log(`Creating ${gameFaqsDir} directory...`);
    fs.mkdirSync(gameFaqsDir);
}

// List of specific FAQ files to move
const faqFiles = [
    'FAQ_01_Getting_Started.md',
    'FAQ_02_Combat_System.md',
    'FAQ_03_Locations_Guide.md',
    'FAQ_04_Characters_and_NPCs.md',
    'FAQ_05_Equipment_and_Items.md',
    'FAQ_06_Quests_and_Storylines.md',
    'FAQ_07_Secrets_and_Easter_Eggs.md',
    'FAQ_08_Technical_Issues.md',
    'FAQ_09_Modding_and_Customization.md',
    'FAQ_10_Community_and_Resources.md',
    'FAQ_11_Disease_System.md'
];

let movedCount = 0;

// Move each FAQ file to the GameFAQs directory
for (const file of faqFiles) {
    const sourcePath = path.join('.', file);
    const destPath = path.join(gameFaqsDir, file);
    
    if (fs.existsSync(sourcePath)) {
        console.log(`Moving ${sourcePath} to ${destPath}...`);
        
        try {
            // Read the content of the file
            const content = fs.readFileSync(sourcePath, 'utf8');
            
            // Write the content to the destination
            fs.writeFileSync(destPath, content);
            
            // Delete the original file
            fs.unlinkSync(sourcePath);
            
            console.log(`Successfully moved ${file} to ${gameFaqsDir} folder.`);
            movedCount++;
        } catch (error) {
            console.error(`Error moving ${file}:`, error.message);
        }
    } else {
        console.log(`File ${sourcePath} does not exist or has already been moved.`);
    }
}

console.log(`\nMoved ${movedCount} FAQ files to the ${gameFaqsDir} folder.`);
console.log("\n=== Organization Complete ===");
console.log(`All available FAQ files have been moved to the ${gameFaqsDir} folder.`);
