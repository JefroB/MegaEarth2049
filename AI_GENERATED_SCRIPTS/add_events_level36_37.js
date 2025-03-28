// Script to add level 36 and 37 quests to the game
const fs = require('fs');
const path = require('path');

// Import the quest data from level36_37_quests.js
const questData = require('./level36_37_quests.js');

// Create a temporary directory for our event files
const tempDir = path.join(__dirname, 'temp_events');
if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir);
}

// Function to create an event file
function createEventFile(event, filename) {
    const filePath = path.join(tempDir, filename);
    fs.writeFileSync(filePath, JSON.stringify(event, null, 2));
    console.log(`Created event file: ${filename}`);
    return filePath;
}

// Create event files for Level 36 Quest - "Digital Dementia"
console.log("Creating Level 36 Quest event files...");
const malfunctioningEmployeePath = createEventFile(questData.level36.malfunctioningEmployee, 'malfunctioning_employee.json');
const memoryFragment1Path = createEventFile(questData.level36.memoryFragment1, 'memory_fragment1.json');
const memoryFragment2Path = createEventFile(questData.level36.memoryFragment2, 'memory_fragment2.json');
const memoryFragment3Path = createEventFile(questData.level36.memoryFragment3, 'memory_fragment3.json');
const drLovelacePath = createEventFile(questData.level36.drLovelace, 'dr_lovelace.json');

// Create event files for Level 37 Quest - "Corporate Crossover Crisis"
console.log("Creating Level 37 Quest event files...");
const corporateSpyPath = createEventFile(questData.level37.suspiciousJanitor, 'suspicious_janitor.json');
const maxEMumPath = createEventFile(questData.level37.maxEMum, 'max_e_mum.json');
const sabotageTerminal1Path = createEventFile(questData.level37.sabotageTerminal1, 'sabotage_terminal1.json');
const sabotageTerminal2Path = createEventFile(questData.level37.sabotageTerminal2, 'sabotage_terminal2.json');
const sabotageTerminal3Path = createEventFile(questData.level37.sabotageTerminal3, 'sabotage_terminal3.json');
const professorParadoxPath = createEventFile(questData.level37.professorParadox, 'professor_paradox.json');

console.log('Event files created successfully!');
console.log('');
console.log('To add these events to the game, use the batch-edit-tool.js and select option 4 (Add event to multiple maps).');
console.log('');
console.log('For level 36 quest (Map104.json - Abandoned Space Station):');
console.log(`- Add ${malfunctioningEmployeePath}`);
console.log(`- Add ${memoryFragment1Path}`);
console.log(`- Add ${memoryFragment2Path}`);
console.log(`- Add ${memoryFragment3Path}`);
console.log('');
console.log('For level 36 quest (Map106.json - NeuraTech Facility):');
console.log(`- Add ${drLovelacePath}`);
console.log('');
console.log('For level 37 quest (Map110.json - Quantum Dynamics Facility):');
console.log(`- Add ${corporateSpyPath}`);
console.log(`- Add ${maxEMumPath}`);
console.log(`- Add ${sabotageTerminal1Path}`);
console.log(`- Add ${sabotageTerminal2Path}`);
console.log(`- Add ${sabotageTerminal3Path}`);
console.log(`- Add ${professorParadoxPath}`);
