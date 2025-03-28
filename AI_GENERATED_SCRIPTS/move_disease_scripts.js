// move_disease_scripts.js
// Script to move all disease-related scripts to the disease_system_scripts folder

const fs = require('fs');
const path = require('path');

console.log("=== MegaEarth 2049 Disease Scripts Organizer ===");
console.log("This script will move all disease-related scripts to the disease_system_scripts folder.");
console.log("Starting organization process...\n");

// Create disease_system_scripts directory if it doesn't exist
const scriptsDir = 'disease_system_scripts';
if (!fs.existsSync(scriptsDir)) {
    console.log(`Creating ${scriptsDir} directory...`);
    fs.mkdirSync(scriptsDir);
}

// List of disease-related scripts to move
const diseaseScripts = [
    'add_diseases.js',
    'disease_animations.js',
    'add_diseases_batch2.js',
    'disease_animations_batch2.js',
    'add_minor_ailments.js',
    'minor_ailment_animations.js',
    'minor_ailment_dialogue.js',
    'add_mental_illnesses.js',
    'mental_illness_animations.js',
    'mental_illness_dialogue.js',
    'add_all_diseases.js',
    'move_gamefaqs.js',
    'move_specific_faqs.js'
];

let movedCount = 0;

// Move each script to the disease_system_scripts directory
for (const file of diseaseScripts) {
    const sourcePath = path.join('.', file);
    const destPath = path.join(scriptsDir, file);
    
    if (fs.existsSync(sourcePath)) {
        console.log(`Moving ${sourcePath} to ${destPath}...`);
        
        try {
            // Read the content of the file
            const content = fs.readFileSync(sourcePath, 'utf8');
            
            // Write the content to the destination
            fs.writeFileSync(destPath, content);
            
            // Delete the original file
            fs.unlinkSync(sourcePath);
            
            console.log(`Successfully moved ${file} to ${scriptsDir} folder.`);
            movedCount++;
        } catch (error) {
            console.error(`Error moving ${file}:`, error.message);
        }
    } else {
        console.log(`File ${sourcePath} does not exist or has already been moved.`);
    }
}

// Create a README.md file in the disease_system_scripts directory
const readmeContent = `# Disease System Scripts

This folder contains all the scripts related to the disease system in MegaEarth 2049.

## Main Scripts

- **add_all_diseases.js**: Master script that runs all other scripts in sequence
- **add_diseases.js**: Adds the first batch of diseases
- **disease_animations.js**: Sets up animations for the first batch of diseases
- **add_diseases_batch2.js**: Adds the second batch of diseases
- **disease_animations_batch2.js**: Sets up animations for the second batch of diseases
- **add_minor_ailments.js**: Adds minor ailments
- **minor_ailment_animations.js**: Sets up animations for minor ailments
- **minor_ailment_dialogue.js**: Sets up dialogue for minor ailments
- **add_mental_illnesses.js**: Adds mental illnesses
- **mental_illness_animations.js**: Sets up animations for mental illnesses
- **mental_illness_dialogue.js**: Sets up dialogue for mental illnesses

## Utility Scripts

- **move_gamefaqs.js**: Moves all GameFAQs files to the GameFAQs folder
- **move_specific_faqs.js**: Moves specific FAQ files to the GameFAQs folder

## How to Use

To install the complete disease system, run:

\`\`\`
node add_all_diseases.js
\`\`\`

This will execute all the necessary scripts in the correct order.

## Documentation

The disease system is documented in \`GameFAQs/FAQ_11_Disease_System.md\`.
`;

const readmePath = path.join(scriptsDir, 'README.md');
fs.writeFileSync(readmePath, readmeContent);
console.log(`Created README.md in ${scriptsDir} folder.`);

// Create a new version of add_all_diseases.js that uses the new paths
const addAllDiseasesPath = path.join(scriptsDir, 'add_all_diseases.js');
if (fs.existsSync(addAllDiseasesPath)) {
    let addAllDiseasesContent = fs.readFileSync(addAllDiseasesPath, 'utf8');
    
    // Update the paths in the script
    addAllDiseasesContent = addAllDiseasesContent.replace(/runScript\('([^']+)'\)/g, "runScript('disease_system_scripts/$1')");
    
    // Write the updated content back to the file
    fs.writeFileSync(addAllDiseasesPath, addAllDiseasesContent);
    console.log(`Updated paths in add_all_diseases.js.`);
}

console.log(`\nMoved ${movedCount} disease-related scripts to the ${scriptsDir} folder.`);
console.log("\n=== Organization Complete ===");
console.log(`All disease-related scripts have been moved to the ${scriptsDir} folder.`);
