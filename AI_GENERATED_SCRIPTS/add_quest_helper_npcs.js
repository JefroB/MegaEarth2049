// Add Quest Helper NPCs Script for MegaEarth 2049
// This script adds all NPCs from quest_helper_npcs.js to the game

const fs = require('fs');
const path = require('path');
const jsonUtils = require('./json_tools/json_utils');
const jsonRepair = require('./json_tools/json_repair');

// Import quest helper NPCs
const questHelperNPCs = require('./quest_helper_npcs');

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
        note: `Quest Helper NPC - ${npcData.helperType} - ${npcData.questLine}`,
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

// Function to generate event commands for NPC dialogue and helper functionality
function generateEventCommands(npcData) {
    const commands = [];
    
    // Add initial message with character appearance
    commands.push({ code: 101, indent: 0, parameters: [npcData.appearance, npcData.index, 0, 2, npcData.name] });
    
    // Add first dialogue line
    commands.push({ code: 401, indent: 0, parameters: [npcData.dialogue[0]] });
    
    // Check if the helper has already provided their service
    commands.push({ code: 111, indent: 0, parameters: [0, npcData.itemFlag || npcData.healFlag || npcData.buffFlag || npcData.skillFlag || npcData.transportFlag || npcData.unlockFlag || npcData.serviceFlag, 0] });
    
    // Add second dialogue line
    commands.push({ code: 401, indent: 1, parameters: [npcData.dialogue[1]] });
    
    // Add helper functionality based on helper type
    switch (npcData.helperType) {
        case "item_provider":
            // Give item to player
            commands.push({ code: 125, indent: 1, parameters: [0, 0, npcData.itemProvided, 1] });
            commands.push({ code: 101, indent: 1, parameters: [npcData.appearance, npcData.index, 0, 2, npcData.name] });
            commands.push({ code: 401, indent: 1, parameters: [`You received ${npcData.itemProvided}!`] });
            break;
            
        case "healer":
            // Heal the player
            commands.push({ code: 314, indent: 1, parameters: [0, npcData.healAmount] });
            commands.push({ code: 101, indent: 1, parameters: [npcData.appearance, npcData.index, 0, 2, npcData.name] });
            commands.push({ code: 401, indent: 1, parameters: [`You've been healed for ${npcData.healAmount} HP!`] });
            break;
            
        case "buffer":
            // Apply buff to player
            commands.push({ code: 311, indent: 1, parameters: [0, npcData.buffType, 1, 0, npcData.buffDuration] });
            commands.push({ code: 101, indent: 1, parameters: [npcData.appearance, npcData.index, 0, 2, npcData.name] });
            commands.push({ code: 401, indent: 1, parameters: [`You've been granted ${npcData.buffType} for ${Math.floor(npcData.buffDuration / 60)} minutes!`] });
            break;
            
        case "skill_teacher":
            // Teach skill to player
            commands.push({ code: 318, indent: 1, parameters: [0, npcData.skillTaught, 1] });
            commands.push({ code: 101, indent: 1, parameters: [npcData.appearance, npcData.index, 0, 2, npcData.name] });
            commands.push({ code: 401, indent: 1, parameters: [`You've learned ${npcData.skillTaught}!`] });
            break;
            
        case "transport":
            // Show destination choices
            commands.push({ code: 102, indent: 1, parameters: [["Where would you like to go?", ...npcData.destinations.map(d => d.name), "Cancel"], 0, 0, 2, 0] });
            
            // For each destination
            for (let i = 0; i < npcData.destinations.length; i++) {
                commands.push({ code: 402, indent: 1, parameters: [i] });
                commands.push({ code: 101, indent: 2, parameters: [npcData.appearance, npcData.index, 0, 2, npcData.name] });
                commands.push({ code: 401, indent: 2, parameters: [`Taking you to ${npcData.destinations[i].name} now.`] });
                commands.push({ code: 201, indent: 2, parameters: [0, npcData.destinations[i].mapId, 8, 8, 0, 0] });
                commands.push({ code: 0, indent: 2, parameters: [] });
            }
            
            // Cancel option
            commands.push({ code: 402, indent: 1, parameters: [npcData.destinations.length] });
            commands.push({ code: 101, indent: 2, parameters: [npcData.appearance, npcData.index, 0, 2, npcData.name] });
            commands.push({ code: 401, indent: 2, parameters: ["Let me know when you're ready to travel."] });
            commands.push({ code: 0, indent: 2, parameters: [] });
            
            // End choice
            commands.push({ code: 404, indent: 1, parameters: [] });
            break;
            
        case "unlocker":
            // Unlock area
            commands.push({ code: 123, indent: 1, parameters: [`AREA_UNLOCKED_${npcData.unlocksArea.replace(/\s+/g, '_').toUpperCase()}`, 0, 1] });
            commands.push({ code: 101, indent: 1, parameters: [npcData.appearance, npcData.index, 0, 2, npcData.name] });
            commands.push({ code: 401, indent: 1, parameters: [`I've unlocked access to ${npcData.unlocksArea} for you.`] });
            break;
            
        case "service_provider":
            // Provide service
            commands.push({ code: 122, indent: 1, parameters: [15, 15, 0, 0, 1] }); // Set variable for service provided
            commands.push({ code: 101, indent: 1, parameters: [npcData.appearance, npcData.index, 0, 2, npcData.name] });
            commands.push({ code: 401, indent: 1, parameters: [`${npcData.serviceType} complete! This should help with your quest.`] });
            break;
    }
    
    // Set flag that helper has provided their service
    commands.push({ code: 123, indent: 1, parameters: [npcData.itemFlag || npcData.healFlag || npcData.buffFlag || npcData.skillFlag || npcData.transportFlag || npcData.unlockFlag || npcData.serviceFlag, 0, 1] });
    
    // End conditional branch
    commands.push({ code: 0, indent: 1, parameters: [] });
    
    // Else branch (already helped)
    commands.push({ code: 411, indent: 0, parameters: [] });
    
    // Add third dialogue line
    commands.push({ code: 401, indent: 1, parameters: [npcData.dialogue[2]] });
    
    // End else branch
    commands.push({ code: 0, indent: 1, parameters: [] });
    commands.push({ code: 412, indent: 0, parameters: [] });
    
    // End event
    commands.push({ code: 0, indent: 0, parameters: [] });
    
    return commands;
}

// Function to write NPC event to file
function writeNPCEventToFile(npcEvent, npcName) {
    const fileName = `quest_helper_npc_${npcName.toLowerCase().replace(/\s+/g, '_').replace(/[^\w_]/g, '')}.json`;
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

// Main function to add all quest helper NPCs
async function addAllQuestHelperNPCs() {
    console.log("Starting to add all quest helper NPCs to the game...");
    
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
    
    // Process each quest helper NPC
    const results = {
        success: 0,
        failure: 0,
        failedNPCs: []
    };
    
    // Add quest helper NPCs
    for (const npc of questHelperNPCs) {
        console.log(`\nProcessing quest helper NPC "${npc.name}"...`);
        
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
addAllQuestHelperNPCs().then(results => {
    console.log(`\nQuest helper NPC addition results:`);
    console.log(`- Successfully added: ${results.success}`);
    console.log(`- Failed to add: ${results.failure}`);
    
    if (results.failure > 0) {
        console.log("\nFailed NPCs:");
        results.failedNPCs.forEach(npc => console.log(`- ${npc}`));
    }
    
    console.log("\nTo see the NPCs in-game load the game and visit their locations.");
});
