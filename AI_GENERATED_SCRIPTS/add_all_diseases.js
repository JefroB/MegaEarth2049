// add_all_diseases.js
// Master script to add all diseases to MegaEarth 2049
// This script will run all disease-related scripts in sequence

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log("=== MegaEarth 2049 Disease System Installer ===");
console.log("This script will add all diseases and minor ailments to the game.");
console.log("Starting installation process...\n");

// Function to run a script and log its output
function runScript(scriptPath) {
    console.log(`Running ${scriptPath}...`);
    try {
        const output = execSync(`node ${scriptPath}`, { encoding: 'utf8' });
        console.log(output);
        console.log(`Successfully executed ${scriptPath}\n`);
        return true;
    } catch (error) {
        console.error(`Error executing ${scriptPath}:`);
        console.error(error.message);
        return false;
    }
}

// Check if scripts exist
const scripts = [
    'add_diseases.js',
    'disease_animations.js',
    'add_diseases_batch2.js',
    'disease_animations_batch2.js',
    'add_minor_ailments.js',
    'minor_ailment_animations.js',
    'minor_ailment_dialogue.js',
    'add_mental_illnesses.js',
    'mental_illness_animations.js',
    'mental_illness_dialogue.js'
];

let allScriptsExist = true;
for (const script of scripts) {
    if (!fs.existsSync(script)) {
        console.error(`Error: ${script} does not exist.`);
        allScriptsExist = false;
    }
}

if (!allScriptsExist) {
    console.error("One or more required scripts are missing. Aborting.");
    process.exit(1);
}

// Run the scripts in sequence
console.log("Step 1: Adding first batch of diseases");
if (!runScript('disease_system_scripts/add_diseases.js')) {
    console.error("Failed to add first batch of diseases. Aborting.");
    process.exit(1);
}

console.log("Step 2: Setting up animations for first batch of diseases");
if (!runScript('disease_system_scripts/disease_animations.js')) {
    console.error("Failed to set up animations for first batch of diseases. Aborting.");
    process.exit(1);
}

console.log("Step 3: Adding second batch of diseases");
if (!runScript('disease_system_scripts/add_diseases_batch2.js')) {
    console.error("Failed to add second batch of diseases. Aborting.");
    process.exit(1);
}

console.log("Step 4: Setting up animations for second batch of diseases");
if (!runScript('disease_system_scripts/disease_animations_batch2.js')) {
    console.error("Failed to set up animations for second batch of diseases. Aborting.");
    process.exit(1);
}

console.log("Step 5: Adding minor ailments");
if (!runScript('disease_system_scripts/add_minor_ailments.js')) {
    console.error("Failed to add minor ailments. Aborting.");
    process.exit(1);
}

console.log("Step 6: Setting up animations for minor ailments");
if (!runScript('disease_system_scripts/minor_ailment_animations.js')) {
    console.error("Failed to set up animations for minor ailments. Aborting.");
    process.exit(1);
}

console.log("Step 7: Setting up dialogue for minor ailments");
if (!runScript('disease_system_scripts/minor_ailment_dialogue.js')) {
    console.error("Failed to set up dialogue for minor ailments. Aborting.");
    process.exit(1);
}

console.log("Step 8: Adding mental illnesses");
if (!runScript('disease_system_scripts/add_mental_illnesses.js')) {
    console.error("Failed to add mental illnesses. Aborting.");
    process.exit(1);
}

console.log("Step 9: Setting up animations for mental illnesses");
if (!runScript('disease_system_scripts/mental_illness_animations.js')) {
    console.error("Failed to set up animations for mental illnesses. Aborting.");
    process.exit(1);
}

console.log("Step 10: Setting up dialogue for mental illnesses");
if (!runScript('disease_system_scripts/mental_illness_dialogue.js')) {
    console.error("Failed to set up dialogue for mental illnesses. Aborting.");
    process.exit(1);
}

// Check if GameFAQs directory exists, if not create it
const gameFaqsDir = 'GameFAQs';
if (!fs.existsSync(gameFaqsDir)) {
    console.log(`Creating ${gameFaqsDir} directory...`);
    fs.mkdirSync(gameFaqsDir);
}

// Check if FAQ_11_Disease_System.md exists in the root directory
const faqSource = 'FAQ_11_Disease_System.md';
const faqDest = path.join(gameFaqsDir, 'FAQ_11_Disease_System.md');

if (fs.existsSync(faqSource)) {
    console.log(`Moving ${faqSource} to ${faqDest}...`);
    try {
        // Read the content of the file
        const content = fs.readFileSync(faqSource, 'utf8');
        // Write the content to the destination
        fs.writeFileSync(faqDest, content);
        // Delete the original file
        fs.unlinkSync(faqSource);
        console.log(`Successfully moved ${faqSource} to ${faqDest}`);
    } catch (error) {
        console.error(`Error moving ${faqSource} to ${faqDest}:`);
        console.error(error.message);
    }
}

console.log("\n=== Installation Complete ===");
console.log("All disease, minor ailment, and mental illness scripts have been executed successfully.");
console.log("The disease system is now installed in your game.");
console.log("You can find documentation in GameFAQs/FAQ_11_Disease_System.md");
