// Add More Optional Quest NPCs Script for MegaEarth 2049
// This script adds all NPCs from more_optional_quest_lines.js and more_optional_quest_npcs.js to the game

const fs = require('fs');
const path = require('path');
const jsonUtils = require('./json_tools/json_utils');
const jsonRepair = require('./json_tools/json_repair');

// Import quest lines and NPCs
const questLines = require('./more_optional_quest_lines');
const supportingNPCs = require('./more_optional_quest_npcs');

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
function createNPCEvent(npcData, questLineName) {
    return {
        id: 1, // Will be assigned by the map
        name: npcData.name,
        note: `${questLineName || npcData.questLine} Quest NPC`,
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
                list: generateEventCommands(npcData, questLineName || npcData.questLine),
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

// Function to generate event commands for NPC dialogue
function generateEventCommands(npcData, questLineName) {
    const commands = [];
    
    // Add initial message with character appearance
    commands.push({ code: 101, indent: 0, parameters: [npcData.appearance, npcData.index, 0, 2, npcData.name] });
    
    // Add dialogue lines
    for (const line of npcData.dialogue) {
        commands.push({ code: 401, indent: 0, parameters: [line] });
    }
    
    // End event
    commands.push({ code: 0, indent: 0, parameters: [] });
    
    return commands;
}

// Function to write NPC event to file
function writeNPCEventToFile(npcEvent, npcName, questLineName) {
    const fileName = `${questLineName.toLowerCase().replace(/\s+/g, '_')}_${npcName.toLowerCase().replace(/\s+/g, '_')}.json`;
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

// Main function to add all NPCs
async function addAllNPCs() {
    console.log("Starting to add all NPCs to the game...");
    
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
    
    // Process each quest line's starting NPC
    const results = {
        success: 0,
        failure: 0,
        failedNPCs: []
    };
    
    // Add starting NPCs from quest lines
    for (const questLine of questLines) {
        console.log(`\nProcessing "${questLine.name}" quest line starting NPC...`);
        
        try {
            // Extract map number
            const mapNumber = extractMapNumber(questLine.startingNPC.location);
            if (!mapNumber) {
                results.failure++;
                results.failedNPCs.push(questLine.startingNPC.name);
                continue;
            }
            
            // Create NPC event
            const npcEvent = createNPCEvent(questLine.startingNPC, questLine.name);
            
            // Write NPC event to file
            const eventFilePath = writeNPCEventToFile(npcEvent, questLine.startingNPC.name, questLine.name);
            if (!eventFilePath) {
                results.failure++;
                results.failedNPCs.push(questLine.startingNPC.name);
                continue;
            }
            
            // Add NPC to map
            if (addNPCToMap(questLine.startingNPC, npcEvent, mapNumber)) {
                results.success++;
            } else {
                results.failure++;
                results.failedNPCs.push(questLine.startingNPC.name);
            }
        } catch (error) {
            console.error(`Error processing NPC ${questLine.startingNPC.name}:`, error.message);
            results.failure++;
            results.failedNPCs.push(questLine.startingNPC.name);
        }
    }
    
    // Add supporting NPCs
    for (const npc of supportingNPCs) {
        console.log(`\nProcessing supporting NPC "${npc.name}"...`);
        
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
            const eventFilePath = writeNPCEventToFile(npcEvent, npc.name, npc.questLine);
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
addAllNPCs().then(results => {
    console.log(`\nNPC addition results:`);
    console.log(`- Successfully added: ${results.success}`);
    console.log(`- Failed to add: ${results.failure}`);
    
    if (results.failure > 0) {
        console.log("\nFailed NPCs:");
        results.failedNPCs.forEach(npc => console.log(`- ${npc}`));
    }
    
    console.log("\nTo see the NPCs in-game load the game and visit their locations.");
});
