// move_guidelines.js
// Script to move .txt and .md files used as guidelines to the AI_GUIDELINES folder

const fs = require('fs');
const path = require('path');

console.log("=== MegaEarth 2049 Guidelines Organizer ===");
console.log("This script will move .txt and .md files used as guidelines to the AI_GUIDELINES folder.");
console.log("Starting organization process...\n");

// List of files to move
const filesToMove = [
    // .md files
    'BOSS_ART_CREATION_GUIDE.md',
    'BOSS_FEATURES_README.md',
    'BOSS_FEATURES_SUMMARY.md',
    'MegaEarth2049_CompletionGuide.md',
    'MegaEarth2049_EditingGuide.md',
    'MegaEarth2049_PressRelease.md',
    'ReducingClineRequests.md',
    
    // .txt files
    'BOSS_SPRITE_EXAMPLE.txt',
    'Drifty and Teas 5 minute game jam action sequence compilation.txt',
    'MegaEarth2049_LaunchingAdvice.txt',
    'MegaEarth2049_ProfitStrategies.txt',
    'MegaEarth2049_vs_AverageRPGMaker.txt',
    'note.txt'
];

// Files to keep in place
const filesToKeep = [
    'README.md',
    'MegaEarth2049_Story.md'
];

// Ensure the AI_GUIDELINES directory exists
const guidelinesDir = 'AI_GUIDELINES';
if (!fs.existsSync(guidelinesDir)) {
    fs.mkdirSync(guidelinesDir, { recursive: true });
    console.log(`Created directory: ${guidelinesDir}`);
}

// Create a README.md file for the AI_GUIDELINES directory
const readmeContent = `# MegaEarth2049 AI Guidelines

This directory contains guidelines and documentation files used by AI assistants for the MegaEarth2049 project.

## Documentation Files

### Boss-related Guidelines
- **BOSS_ART_CREATION_GUIDE.md**: Guidelines for creating boss art assets
- **BOSS_FEATURES_README.md**: Documentation for boss features
- **BOSS_FEATURES_SUMMARY.md**: Summary of boss features
- **BOSS_SPRITE_EXAMPLE.txt**: Example of boss sprite specifications

### Project Guidelines
- **MegaEarth2049_CompletionGuide.md**: Guide for completing the MegaEarth2049 project
- **MegaEarth2049_EditingGuide.md**: Guide for editing the MegaEarth2049 project
- **MegaEarth2049_LaunchingAdvice.txt**: Advice for launching the MegaEarth2049 project
- **MegaEarth2049_PressRelease.md**: Press release template for the MegaEarth2049 project
- **MegaEarth2049_ProfitStrategies.txt**: Strategies for monetizing the MegaEarth2049 project
- **MegaEarth2049_vs_AverageRPGMaker.txt**: Comparison between MegaEarth2049 and average RPG Maker games

### Miscellaneous
- **Drifty and Teas 5 minute game jam action sequence compilation.txt**: Action sequence compilation
- **ReducingClineRequests.md**: Guidelines for reducing Cline requests
- **note.txt**: Miscellaneous notes

These files are used by AI assistants to understand the project requirements, guidelines, and specifications.
`;

// Write the README.md file
fs.writeFileSync(path.join(guidelinesDir, 'README.md'), readmeContent);
console.log(`Created README.md in ${guidelinesDir}`);

let movedCount = 0;

// Move each file to the AI_GUIDELINES directory
for (const file of filesToMove) {
    const sourcePath = path.join('.', file);
    const destPath = path.join(guidelinesDir, file);
    
    if (fs.existsSync(sourcePath)) {
        console.log(`Moving ${sourcePath} to ${destPath}...`);
        
        try {
            // Read the content of the file
            const content = fs.readFileSync(sourcePath, 'utf8');
            
            // Write the content to the destination
            fs.writeFileSync(destPath, content);
            
            // Delete the original file
            fs.unlinkSync(sourcePath);
            
            console.log(`Successfully moved ${file} to ${guidelinesDir} folder.`);
            movedCount++;
        } catch (error) {
            console.error(`Error moving ${file}:`, error.message);
        }
    } else {
        console.log(`File ${sourcePath} does not exist or has already been moved.`);
    }
}

console.log(`\nMoved ${movedCount} guideline files to the ${guidelinesDir} folder.`);
console.log(`Files kept in place: ${filesToKeep.join(', ')}`);
console.log("\n=== Organization Complete ===");
console.log(`All guideline files have been moved to the ${guidelinesDir} folder.`);
