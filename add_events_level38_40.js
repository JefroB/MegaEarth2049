// Script to add level 38, 39, and 40 quests to the game
const fs = require('fs');
const path = require('path');

// Import the quest data from level38_40_quests.js
const questData = require('./level38_40_quests.js');

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

// Create event files for Level 38 Quest - "Reality Rewrite Protocol"
console.log("Creating Level 38 Quest event files...");
const professorParadoxPath = createEventFile(questData.level38.professorParadox, 'professor_paradox_level38.json');
const captainCalamariPath = createEventFile(questData.level38.captainCalamari, 'captain_calamari.json');
const theNarratorPath = createEventFile(questData.level38.theNarrator, 'the_narrator.json');
const realityAnchor1Path = createEventFile(questData.level38.realityAnchor1, 'reality_anchor1.json');
const realityAnchor2Path = createEventFile(questData.level38.realityAnchor2, 'reality_anchor2.json');
const realityAnchor3Path = createEventFile(questData.level38.realityAnchor3, 'reality_anchor3.json');

// Create event files for Level 39 Quest - "A.S.P.'s Floating Mansion Infiltration"
console.log("Creating Level 39 Quest event files...");
const trashKingPath = createEventFile(questData.level39.trashKing, 'trash_king.json');
const valuableTrash1Path = createEventFile(questData.level39.valuableTrash1, 'valuable_trash1.json');
const valuableTrash2Path = createEventFile(questData.level39.valuableTrash2, 'valuable_trash2.json');
const valuableTrash3Path = createEventFile(questData.level39.valuableTrash3, 'valuable_trash3.json');
const mayorMcFacePath = createEventFile(questData.level39.mayorMcFace, 'mayor_mcface.json');
const maxEMumPath = createEventFile(questData.level39.maxEMum, 'max_e_mum_level39.json');

// Create event files for Level 40 Quest - "Protocol Zero Countdown"
console.log("Creating Level 40 Quest event files...");
const drVossHologramPath = createEventFile(questData.level40.drVossHologram, 'dr_voss_hologram.json');
const djStaticPath = createEventFile(questData.level40.djStatic, 'dj_static.json');
const theTwinsPath = createEventFile(questData.level40.theTwins, 'the_twins.json');
const finalNecklacePiecePath = createEventFile(questData.level40.finalNecklacePiece, 'final_necklace_piece.json');

console.log('Event files created successfully!');
console.log('');
console.log('To add these events to the game, use the batch-edit-tool.js and select option 4 (Add event to multiple maps).');
console.log('');
console.log('For level 38 quest:');
console.log(`- Add ${professorParadoxPath} to Map110.json (Quantum Dynamics Facility)`);
console.log(`- Add ${captainCalamariPath} to Map109.json (Armatek Facility)`);
console.log(`- Add ${theNarratorPath} to Map109.json (Armatek Facility)`);
console.log(`- Add ${realityAnchor1Path} to Map109.json (Armatek Facility)`);
console.log(`- Add ${realityAnchor2Path} to Map109.json (Armatek Facility)`);
console.log(`- Add ${realityAnchor3Path} to Map109.json (Armatek Facility)`);
console.log('');
console.log('For level 39 quest:');
console.log(`- Add ${trashKingPath} to Map038.json (Floating Mansion Outside)`);
console.log(`- Add ${valuableTrash1Path} to Map010.json (Timbuc)`);
console.log(`- Add ${valuableTrash2Path} to Map114.json (Timbuc Central Plaza)`);
console.log(`- Add ${valuableTrash3Path} to Map105.json (The Squeaky Clean - Zed's Clinic)`);
console.log(`- Add ${mayorMcFacePath} to Map040.json (Floating Mansion 1st floor)`);
console.log(`- Add ${maxEMumPath} to Map091.json (Floating Mansion 2nd floor)`);
console.log('');
console.log('For level 40 quest:');
console.log(`- Add ${drVossHologramPath} to Map113.json (Dr. Voss's Secret Lab)`);
console.log(`- Add ${djStaticPath} to Map114.json (Timbuc Central Plaza)`);
console.log(`- Add ${theTwinsPath} to Map008.json (Internet Cafe)`);
console.log(`- Add ${finalNecklacePiecePath} to Map113.json (Dr. Voss's Secret Lab)`);
