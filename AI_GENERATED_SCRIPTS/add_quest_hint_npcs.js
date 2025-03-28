// Add Quest Hint NPCs Script for MegaEarth 2049
// This script adds all NPCs from quest_hint_npcs.js to the game

const fs = require('fs');
const path = require('path');
const jsonUtils = require('./json_tools/json_utils');
const jsonRepair = require('./json_tools/json_repair');

// Import quest hint NPCs
const questHintNPCs = require('./quest_hint_npcs');

// Function to extract map number from location string
function extractMapNumber(location) {
    const mapMatch = location.match(/Map(\d+)/);
    if (!mapMatch) {
        console.error(`Could not extract map number from location: ${location}`);
        return null;
    }
    return mapMatch[1];
}

// Function to create NPC event
function createNPCEvent(npcData) {
    return {
        id: 1, // Will be assigned by the map
        name: npcData.name,
        note: `Quest Hint NPC`,
        pages: [
            {
                conditions: {
                    actorId: 1,
                    actorValid: false,
                    itemId: 1,
                    itemValid: false,
                    selfSwitchCh: "A",
                    selfSwitchValid: false,
                    switch1Id: 1,
                    switch1Valid: false,
                    switch2Id: 1,
                    switch2Valid: false,
                    variableId: 1,
                    variableValid: false,
                    variableValue: 0
                },
                directionFix: false,
                image: {
                    characterIndex: npcData.index,
                    characterName: npcData.appearance,
                    direction: 2,
                    pattern: 1,
                    tileId: 0
                },
                list: generateEventCommands(npcData),
                moveFrequency: 3,
                moveRoute: {
                    list: [{ code: 0, parameters: [] }],
                    repeat: true,
                    skippable: false,
                    wait: false
                },
                moveSpeed: 3,
                moveType: 0,
                priorityType: 1,
                stepAnime: false,
                through: false,
                trigger: 0,
                walkAnime: true
            }
        ],
        x: npcData.x,
        y: npcData.y
    };
}

// Function to generate event commands for NPC dialogue with encounter tracking
function generateEventCommands(npcData) {
    const commands = [];
    
    // If NPC has multiple dialogue options based on encounters
    if (npcData.encounterFlags && npcData.encounterFlags.length > 1) {
        // Add initial message with character appearance
        commands.push({ code: 101, indent: 0, parameters: [npcData.appearance, npcData.index, 0, 2, npcData.name] });
        
        // For each possible encounter
        for (let i = 0; i < npcData.encounterFlags.length; i++) {
            // Check if this is the first encounter (no flag set yet)
            if (i === 0) {
                // Check if first encounter flag is NOT set
                commands.push({ code: 111, indent: 0, parameters: [0, npcData.encounterFlags[0], 0] });
                
                // Add dialogue for first encounter
                commands.push({ code: 401, indent: 1, parameters: [npcData.dialogue[0]] });
                
                // Set the flag for first encounter
                commands.push({ code: 123, indent: 1, parameters: [npcData.encounterFlags[0], 0, 1] });
                
                // End conditional branch
                commands.push({ code: 0, indent: 1, parameters: [] });
                
                // Else if this is a subsequent encounter
                commands.push({ code: 411, indent: 0, parameters: [] });
            }
            
            // For second and later encounters, check if we're at the right encounter number
            if (i > 0 && i < npcData.encounterFlags.length - 1) {
                // Check if current encounter flag is NOT set but previous one IS set
                commands.push({ code: 111, indent: 1, parameters: [0, npcData.encounterFlags[i], 0] });
                commands.push({ code: 111, indent: 2, parameters: [0, npcData.encounterFlags[i-1], 1] });
                
                // Add dialogue for this encounter
                commands.push({ code: 401, indent: 3, parameters: [npcData.dialogue[i]] });
                
                // Set the flag for this encounter
                commands.push({ code: 123, indent: 3, parameters: [npcData.encounterFlags[i], 0, 1] });
                
                // End inner conditional branch
                commands.push({ code: 0, indent: 3, parameters: [] });
                commands.push({ code: 0, indent: 2, parameters: [] });
            }
            
            // For the last encounter, just show that dialogue if all previous flags are set
            if (i === npcData.encounterFlags.length - 1) {
                // Add dialogue for last encounter
                commands.push({ code: 401, indent: 1, parameters: [npcData.dialogue[i]] });
            }
        }
        
        // End the else branch
        commands.push({ code: 0, indent: 1, parameters: [] });
        commands.push({ code: 412, indent: 0, parameters: [] });
    } else {
        // Simple case: NPC has only one dialogue line
        commands.push({ code: 101, indent: 0, parameters: [npcData.appearance, npcData.index, 0, 2, npcData.name] });
        commands.push({ code: 401, indent: 0, parameters: [npcData.dialogue[0]] });
    }
    
    // End event
    commands.push({ code: 0, indent: 0, parameters: [] });
    
    return commands;
}

// Function to write NPC event to file
function writeNPCEventToFile(npcEvent, npcName) {
    const fileName = `quest_hint_npc_${npcName.toLowerCase().replace(/\s+/g, '_').replace(/[^\w_]/g, '')}.json`;
    const filePath = path.join(__dirname, 'temp_events', fileName);
    
    if (jsonUtils.safeWriteJSON(filePath, npcEvent)) {
        console.log(`Created NPC event file: ${filePath}`);
        return filePath;
    }
    
    return null;
}

// Function to add NPC to map
function addNPCToMap(npcData, npcEvent, mapNumber) {
    console.log(`Adding ${npcData.name} to Map${mapNumber}...`);
    const mapPath = path.join(__dirname, 'data', `Map${mapNumber.padStart(3, '0')}.json`);
    
    // Use the safe add event function from json_utils
    const newId = jsonUtils.safeAddEventToMap(mapPath, npcEvent);
    
    if (newId) {
        console.log(`Successfully added ${npcData.name} to Map${mapNumber} with ID ${newId}`);
        return true;
    } else {
        console.error(`Failed to add ${npcData.name} to Map${mapNumber}`);
        return false;
    }
}

// Main function to add all quest hint NPCs
async function addAllQuestHintNPCs() {
    console.log("Starting to add all quest hint NPCs to the game...");
    
    // First, validate all JSON files to ensure they're in good shape
    console.log("\nValidating JSON files before adding NPCs...");
    const dataDir = path.join(__dirname, 'data');
    const validationResults = jsonUtils.batchValidateJSON(dataDir, false);
    
    if (validationResults.invalid > 0) {
        console.log(`\nFound ${validationResults.invalid} invalid JSON files. Attempting to repair them before proceeding...`);
        const repairResults = jsonRepair.repairMultipleFiles(validationResults.invalidFiles);
        
        if (repairResults.failure > 0) {
            console.error(`\nWarning: Could not repair ${repairResults.failure} JSON files. Proceeding with caution.`);
        } else {
            console.log("\nAll JSON files repaired successfully. Proceeding with adding NPCs.");
        }
    } else {
        console.log("\nAll JSON files are valid. Proceeding with adding NPCs.");
    }
    
    // Create temp_events directory if it doesn't exist
    const tempEventsDir = path.join(__dirname, 'temp_events');
    if (!fs.existsSync(tempEventsDir)) {
        fs.mkdirSync(tempEventsDir);
        console.log("Created temp_events directory");
    }
    
    // Process each quest hint NPC
    const results = {
        success: 0,
        failure: 0,
        failedNPCs: []
    };
    
    // Add quest hint NPCs
    for (const npc of questHintNPCs) {
        console.log(`\nProcessing quest hint NPC "${npc.name}"...`);
        
        try {
            // Extract map number
            const mapNumber = extractMapNumber(npc.location);
            if (!mapNumber) {
                results.failure++;
                results.failedNPCs.push(npc.name);
                continue;
            }
            
            // Create NPC event
            const npcEvent = createNPCEvent(npc);
            
            // Write NPC event to file
            const eventFilePath = writeNPCEventToFile(npcEvent, npc.name);
            if (!eventFilePath) {
                results.failure++;
                results.failedNPCs.push(npc.name);
                continue;
            }
            
            // Add NPC to map
            if (addNPCToMap(npc, npcEvent, mapNumber)) {
                results.success++;
            } else {
                results.failure++;
                results.failedNPCs.push(npc.name);
            }
        } catch (error) {
            console.error(`Error processing NPC ${npc.name}:`, error.message);
            results.failure++;
            results.failedNPCs.push(npc.name);
        }
    }
    
    // Final validation to ensure everything is still in good shape
    console.log("\nValidating JSON files after adding NPCs...");
    const finalValidationResults = jsonUtils.batchValidateJSON(dataDir, false);
    
    if (finalValidationResults.invalid > 0) {
        console.log(`\nFound ${finalValidationResults.invalid} invalid JSON files after adding NPCs. Attempting to repair...`);
        const repairResults = jsonRepair.repairMultipleFiles(finalValidationResults.invalidFiles);
        
        if (repairResults.failure > 0) {
            console.error(`\nWarning: Could not repair ${repairResults.failure} JSON files.`);
        } else {
            console.log("\nAll JSON files repaired successfully.");
        }
    } else {
        console.log("\nAll JSON files are valid after adding NPCs.");
    }
    
    return results;
}

// Run the script
addAllQuestHintNPCs().then(results => {
    console.log(`\nQuest hint NPC addition results:`);
    console.log(`- Successfully added: ${results.success}`);
    console.log(`- Failed to add: ${results.failure}`);
    
    if (results.failure > 0) {
        console.log("\nFailed NPCs:");
        results.failedNPCs.forEach(npc => console.log(`- ${npc}`));
    }
    
    console.log("\nTo see the NPCs in-game load the game and visit their locations.");
});
