// Safe Add Quest Lines Script for MegaEarth 2049
// This script safely adds new quest lines to the game using the JSON tools

const fs = require('fs');
const path = require('path');
const jsonUtils = require('./json_utils.js');
const jsonRepair = require('./json_repair.js');

/**
 * Safely add quest lines to the game
 * @param {Array} questLines - Array of quest line objects
 * @returns {Object} - Results with success and failure counts
 */
async function safeAddQuestLines(questLines) {
    console.log(`Starting to add ${questLines.length} quest lines to the game...`);
    
    // First, validate all JSON files to ensure they're in good shape
    console.log("\nValidating JSON files before adding quest lines...");
    const dataDir = path.join(__dirname, '..', 'data');
    const validationResults = jsonUtils.batchValidateJSON(dataDir, false);
    
    if (validationResults.invalid > 0) {
        console.log(`\nFound ${validationResults.invalid} invalid JSON files. Attempting to repair them before proceeding...`);
        const repairResults = jsonRepair.repairMultipleFiles(validationResults.invalidFiles);
        
        if (repairResults.failure > 0) {
            console.error(`\nWarning: Could not repair ${repairResults.failure} JSON files. Proceeding with caution.`);
        } else {
            console.log("\nAll JSON files repaired successfully. Proceeding with adding quest lines.");
        }
    } else {
        console.log("\nAll JSON files are valid. Proceeding with adding quest lines.");
    }
    
    // Create temp_events directory if it doesn't exist
    const tempEventsDir = path.join(__dirname, '..', 'temp_events');
    if (!fs.existsSync(tempEventsDir)) {
        fs.mkdirSync(tempEventsDir);
        console.log("Created temp_events directory");
    }
    
    // Process each quest line
    const results = {
        success: 0,
        failure: 0,
        failedQuestLines: []
    };
    
    for (const questLine of questLines) {
        console.log(`\nProcessing "${questLine.name}" quest line...`);
        
        try {
            // Create starting NPC event
            const npcResult = createNPCEvent(questLine.startingNPC, questLine.name);
            
            if (!npcResult) {
                console.error(`Failed to create NPC event for ${questLine.name}`);
                results.failure++;
                results.failedQuestLines.push(questLine.name);
                continue;
            }
            
            const { npcEvent, mapNumber } = npcResult;
            
            // Write NPC event to file
            const eventFilePath = writeNPCEventToFile(npcEvent, questLine.name);
            
            if (!eventFilePath) {
                console.error(`Failed to write NPC event file for ${questLine.name}`);
                results.failure++;
                results.failedQuestLines.push(questLine.name);
                continue;
            }
            
            // Add event to map
            console.log(`Adding ${questLine.startingNPC.name} to Map${mapNumber}...`);
            const mapPath = path.join(__dirname, '..', 'data', `Map${mapNumber.padStart(3, '0')}.json`);
            
            // Use the safe add event function from json_utils
            const newId = jsonUtils.safeAddEventToMap(mapPath, npcEvent);
            
            if (newId) {
                console.log(`Successfully added ${questLine.startingNPC.name} to Map${mapNumber} with ID ${newId}`);
                results.success++;
                
                // Create quest objective event files
                await createQuestObjectiveEvents(questLine);
            } else {
                console.error(`Failed to add ${questLine.startingNPC.name} to Map${mapNumber}`);
                results.failure++;
                results.failedQuestLines.push(questLine.name);
            }
        } catch (error) {
            console.error(`Error processing quest line ${questLine.name}:`, error.message);
            results.failure++;
            results.failedQuestLines.push(questLine.name);
        }
    }
    
    // Final validation to ensure everything is still in good shape
    console.log("\nValidating JSON files after adding quest lines...");
    const finalValidationResults = jsonUtils.batchValidateJSON(dataDir, false);
    
    if (finalValidationResults.invalid > 0) {
        console.log(`\nFound ${finalValidationResults.invalid} invalid JSON files after adding quest lines. Attempting to repair...`);
        const repairResults = jsonRepair.repairMultipleFiles(finalValidationResults.invalidFiles);
        
        if (repairResults.failure > 0) {
            console.error(`\nWarning: Could not repair ${repairResults.failure} JSON files.`);
        } else {
            console.log("\nAll JSON files repaired successfully.");
        }
    } else {
        console.log("\nAll JSON files are valid after adding quest lines.");
    }
    
    return results;
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
    const filePath = path.join(__dirname, '..', 'temp_events', fileName);
    
    if (jsonUtils.safeWriteJSON(filePath, npcEvent)) {
        console.log(`Created NPC event file: ${filePath}`);
        return filePath;
    }
    
    return null;
}

/**
 * Create quest objective event files
 * @param {Object} questLine - The quest line object
 * @returns {Promise<boolean>} - Success or failure
 */
async function createQuestObjectiveEvents(questLine) {
    try {
        const questName = questLine.name.toLowerCase().replace(/\s+/g, '_');
        
        // Create objective events for each quest in the quest line
        for (let questIndex = 0; questIndex < questLine.quests.length; questIndex++) {
            const quest = questLine.quests[questIndex];
            
            // Create objective events for each objective in the quest
            for (let objectiveIndex = 0; objectiveIndex < quest.objectives.length; objectiveIndex++) {
                const objective = quest.objectives[objectiveIndex];
                
                // Create event file name
                const fileName = `${questName}_${questIndex}_objective_${objectiveIndex}.json`;
                const filePath = path.join(__dirname, '..', 'temp_events', fileName);
                
                // Create basic objective event structure
                const objectiveEvent = {
                    name: `${questLine.name} Quest ${questIndex + 1} Objective ${objectiveIndex + 1}`,
                    note: `${objective.description}`,
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
                                characterIndex: 0,
                                characterName: "",
                                direction: 2,
                                pattern: 1,
                                tileId: 0
                            },
                            list: [
                                { code: 101, indent: 0, parameters: ["", 0, 0, 2] },
                                { code: 401, indent: 0, parameters: [objective.description] },
                                { code: 0, indent: 0, parameters: [] }
                            ],
                            moveFrequency: 3,
                            moveRoute: {
                                list: [{ code: 0, parameters: [] }],
                                repeat: true,
                                skippable: false,
                                wait: false
                            },
                            moveSpeed: 3,
                            moveType: 0,
                            priorityType: 0,
                            stepAnime: false,
                            through: false,
                            trigger: 0,
                            walkAnime: true
                        }
                    ]
                };
                
                // Write objective event to file
                if (!jsonUtils.safeWriteJSON(filePath, objectiveEvent)) {
                    console.error(`Failed to write objective event file: ${filePath}`);
                }
            }
            
            // Create completion event for the quest
            const completionFileName = `${questName}_completion.json`;
            const completionFilePath = path.join(__dirname, '..', 'temp_events', completionFileName);
            
            // Create basic completion event structure
            const completionEvent = {
                name: `${questLine.name} Quest Line Completion`,
                note: `Completion event for ${questLine.name} quest line`,
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
                            characterIndex: 0,
                            characterName: "",
                            direction: 2,
                            pattern: 1,
                            tileId: 0
                        },
                        list: [
                            { code: 101, indent: 0, parameters: ["", 0, 0, 2] },
                            { code: 401, indent: 0, parameters: [`Congratulations! You have completed the ${questLine.name} quest line.`] },
                            { code: 401, indent: 0, parameters: [`Reward: ${questLine.finalReward}`] },
                            { code: 0, indent: 0, parameters: [] }
                        ],
                        moveFrequency: 3,
                        moveRoute: {
                            list: [{ code: 0, parameters: [] }],
                            repeat: true,
                            skippable: false,
                            wait: false
                        },
                        moveSpeed: 3,
                        moveType: 0,
                        priorityType: 0,
                        stepAnime: false,
                        through: false,
                        trigger: 0,
                        walkAnime: true
                    }
                ]
            };
            
            // Write completion event to file
            if (!jsonUtils.safeWriteJSON(completionFilePath, completionEvent)) {
                console.error(`Failed to write completion event file: ${completionFilePath}`);
            }
        }
        
        return true;
    } catch (error) {
        console.error(`Error creating quest objective events for ${questLine.name}:`, error.message);
        return false;
    }
}

// If this script is run directly (not imported)
if (require.main === module) {
    // Parse command line arguments
    const args = process.argv.slice(2);
    
    if (args.length === 0) {
        console.log("Usage:");
        console.log("  node safe_add_quest_lines.js <quest_lines_file> - Add quest lines from a JavaScript file");
    } else {
        try {
            // Import quest lines from the specified file
            const questLinesPath = path.resolve(__dirname, '..', args[0]);
            const questLines = require(questLinesPath);
            
            // Add quest lines to the game
            safeAddQuestLines(questLines).then(results => {
                console.log(`\nQuest line addition results:`);
                console.log(`- Successfully added: ${results.success}`);
                console.log(`- Failed to add: ${results.failure}`);
                
                if (results.failure > 0) {
                    console.log("\nFailed quest lines:");
                    results.failedQuestLines.forEach(questLine => console.log(`- ${questLine}`));
                }
            });
        } catch (error) {
            console.error(`Error importing quest lines:`, error.message);
        }
    }
}

// Export functions
module.exports = {
    safeAddQuestLines,
    createNPCEvent,
    generateEventCommands,
    writeNPCEventToFile,
    createQuestObjectiveEvents
};
