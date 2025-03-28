// Enhanced script to safely add quest events to maps for the new quest lines
// Uses json_utils.js for safer JSON handling

const fs = require('fs');
const path = require('path');
const jsonUtils = require('./json_utils.js');

// Import all quest lines
const allQuestLines = require('../all_quest_lines.js');

// Create temp_events directory if it doesn't exist
const tempEventsDir = path.join(__dirname, '..', 'temp_events');
if (!fs.existsSync(tempEventsDir)) {
    fs.mkdirSync(tempEventsDir);
    console.log("Created temp_events directory");
}

/**
 * Create an NPC event from quest line data
 * @param {Object} npcData - The NPC data from the quest line
 * @param {string} questLineName - The name of the quest line
 * @returns {Object|null} - The NPC event data and map number, or null if error
 */
function createNPCEvent(npcData, questLineName) {
    // Extract map number from location string (e.g., "Timbuc (Map010)" -> "010")
    const mapMatch = npcData.location.match(/Map(\d+)/);
    if (!mapMatch) {
        console.error(`Could not extract map number from location: ${npcData.location}`);
        return null;
    }
    
    const mapNumber = mapMatch[1];
    
    // Create basic NPC event structure
    const npcEvent = {
        id: 1, // Will be assigned by the map
        name: npcData.name,
        note: `${questLineName} Quest Line Starting NPC`,
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
                list: generateEventCommands(npcData, questLineName),
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
    
    return { npcEvent, mapNumber };
}

/**
 * Generate event commands for NPC dialogue
 * @param {Object} npcData - The NPC data from the quest line
 * @param {string} questLineName - The name of the quest line
 * @returns {Array} - Array of event commands
 */
function generateEventCommands(npcData, questLineName) {
    const commands = [];
    
    // Add initial message with character appearance
    commands.push({ code: 101, indent: 0, parameters: [npcData.appearance, npcData.index, 0, 2, npcData.name] });
    
    // Add dialogue lines
    for (const line of npcData.dialogue) {
        commands.push({ code: 401, indent: 0, parameters: [line] });
    }
    
    // Add quest acceptance choice
    commands.push({ code: 102, indent: 0, parameters: [["Accept quest", "Not now"], 1, 0, 2, 0] });
    
    // Accept quest branch
    commands.push({ code: 402, indent: 0, parameters: [0, "Accept quest"] });
    
    // Add quest acceptance dialogue
    commands.push({ code: 101, indent: 1, parameters: [npcData.appearance, npcData.index, 0, 2, npcData.name] });
    commands.push({ code: 401, indent: 1, parameters: [`Great! I'll mark the details of the ${questLineName} quest line in your neural log.`] });
    commands.push({ code: 401, indent: 1, parameters: ["Come back when you've made progress on the first task."] });
    
    // Set a switch to track quest acceptance (using a placeholder switch ID)
    commands.push({ code: 121, indent: 1, parameters: [2000, 2000, 0] });
    
    // End of accept branch
    commands.push({ code: 0, indent: 1, parameters: [] });
    
    // Decline quest branch
    commands.push({ code: 402, indent: 0, parameters: [1, "Not now"] });
    commands.push({ code: 101, indent: 1, parameters: [npcData.appearance, npcData.index, 0, 2, npcData.name] });
    commands.push({ code: 401, indent: 1, parameters: ["I understand. Come back if you change your mind."] });
    commands.push({ code: 0, indent: 1, parameters: [] });
    
    // End choice
    commands.push({ code: 404, indent: 0, parameters: [] });
    
    // End event
    commands.push({ code: 0, indent: 0, parameters: [] });
    
    return commands;
}

/**
 * Write NPC event to file
 * @param {Object} npcEvent - The NPC event data
 * @param {string} questLineName - The name of the quest line
 * @returns {string|null} - Path to the event file or null if error
 */
function writeNPCEventToFile(npcEvent, questLineName) {
    const fileName = `${questLineName.toLowerCase().replace(/\s+/g, '_')}_starting_npc.json`;
    const filePath = path.join(tempEventsDir, fileName);
    
    if (jsonUtils.safeWriteJSON(filePath, npcEvent)) {
        console.log(`Created NPC event file: ${filePath}`);
        return filePath;
    }
    
    return null;
}

/**
 * Process all quest lines and add their NPCs to maps
 */
function processQuestLines() {
    console.log(`Processing ${allQuestLines.length} quest lines...`);
    
    let successCount = 0;
    let failureCount = 0;
    
    allQuestLines.forEach(questLine => {
        console.log(`\nProcessing "${questLine.name}" quest line...`);
        
        // Create starting NPC event
        const result = createNPCEvent(questLine.startingNPC, questLine.name);
        
        if (!result) {
            console.error(`Failed to create NPC event for ${questLine.name}`);
            failureCount++;
            return;
        }
        
        const { npcEvent, mapNumber } = result;
        
        // Write NPC event to file
        const eventFilePath = writeNPCEventToFile(npcEvent, questLine.name);
        
        if (!eventFilePath) {
            console.error(`Failed to write NPC event file for ${questLine.name}`);
            failureCount++;
            return;
        }
        
        // Add event to map
        console.log(`Adding ${questLine.startingNPC.name} to Map${mapNumber}...`);
        const mapPath = path.join(__dirname, '..', 'data', `Map${mapNumber.padStart(3, '0')}.json`);
        
        // Use the safe add event function from json_utils
        const newId = jsonUtils.safeAddEventToMap(mapPath, npcEvent);
        
        if (newId) {
            console.log(`Successfully added ${questLine.startingNPC.name} to Map${mapNumber} with ID ${newId}`);
            successCount++;
        } else {
            console.error(`Failed to add ${questLine.startingNPC.name} to Map${mapNumber}`);
            failureCount++;
        }
    });
    
    console.log("\nAll quest line NPCs have been processed.");
    console.log(`Summary: ${successCount} NPCs added successfully, ${failureCount} failures.`);
    
    if (failureCount > 0) {
        console.log("\nSome NPCs could not be added. You may want to:");
        console.log("1. Run validate_json_files.js to check for and fix corrupted JSON files");
        console.log("2. Run this script again to retry adding the failed NPCs");
    } else {
        console.log("\nTo see the NPCs in-game, load the game and visit their locations.");
        console.log("Note: You may need to set up appropriate switches and variables for quest progression.");
    }
}

// Run the script
processQuestLines();
