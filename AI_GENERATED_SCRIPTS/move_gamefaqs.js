// move_gamefaqs.js
// Script to move all GameFAQs files to their own folder

const fs = require('fs');
const path = require('path');

console.log("=== MegaEarth 2049 GameFAQs Organizer ===");
console.log("This script will move all FAQ files to the GameFAQs folder.");
console.log("Starting organization process...\n");

// Create GameFAQs directory if it doesn't exist
const gameFaqsDir = 'GameFAQs';
if (!fs.existsSync(gameFaqsDir)) {
    console.log(`Creating ${gameFaqsDir} directory...`);
    fs.mkdirSync(gameFaqsDir);
}

// Find all FAQ files in the root directory
const files = fs.readdirSync('.');
const faqFiles = files.filter(file => file.startsWith('FAQ_') && file.endsWith('.md'));

console.log(`Found ${faqFiles.length} FAQ files in the root directory.`);

// Move each FAQ file to the GameFAQs directory
for (const file of faqFiles) {
    const sourcePath = path.join('.', file);
    const destPath = path.join(gameFaqsDir, file);
    
    console.log(`Moving ${sourcePath} to ${destPath}...`);
    
    try {
        // Read the content of the file
        const content = fs.readFileSync(sourcePath, 'utf8');
        
        // Write the content to the destination
        fs.writeFileSync(destPath, content);
        
        // Delete the original file
        fs.unlinkSync(sourcePath);
        
        console.log(`Successfully moved ${file} to ${gameFaqsDir} folder.`);
    } catch (error) {
        console.error(`Error moving ${file}:`, error.message);
    }
}

console.log("\n=== Organization Complete ===");
console.log(`All FAQ files have been moved to the ${gameFaqsDir} folder.`);
