// Script to add quest events to maps for the new quest lines
const fs = require('fs');
const path = require('path');

// Import all quest lines
const allQuestLines = require('./all_quest_lines.js');

// Create temp_events directory if it doesn't exist
const tempEventsDir = path.join(__dirname, 'temp_events');
if (!fs.existsSync(tempEventsDir)) {
    fs.mkdirSync(tempEventsDir);
    console.log("Created temp_events directory");
}

// Function to create an NPC event from quest line data
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

// Function to generate event commands for NPC dialogue
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

// Function to write NPC event to file
function writeNPCEventToFile(npcEvent, questLineName) {
    const fileName = `${questLineName.toLowerCase().replace(/\s+/g, '_')}_starting_npc.json`;
    const filePath = path.join(tempEventsDir, fileName);
    
    fs.writeFileSync(filePath, JSON.stringify(npcEvent, null, 2));
    console.log(`Created NPC event file: ${filePath}`);
    
    return filePath;
}

// Function to add event to map
function addEventToMap(mapNumber, eventData) {
    const mapPath = path.join(__dirname, 'data', `Map${mapNumber.padStart(3, '0')}.json`);
    
    try {
        // Read the map file
        const mapData = JSON.parse(fs.readFileSync(mapPath, 'utf8'));
        
        // Find the highest event ID
        let maxId = 0;
        for (const eventId in mapData.events) {
            if (eventId && !isNaN(parseInt(eventId))) {
                maxId = Math.max(maxId, parseInt(eventId));
            }
        }
        
        // Set the new event ID
        const newId = maxId + 1;
        eventData.id = newId;
        
        // Add the event to the map
        if (!mapData.events) {
            mapData.events = [];
        }
        mapData.events[newId] = eventData;
        
        // Write the updated map file
        fs.writeFileSync(mapPath, JSON.stringify(mapData, null, 2));
        
        console.log(`Added event ${eventData.name} to Map${mapNumber} with ID ${newId}`);
        return true;
    } catch (error) {
        console.error(`Error adding event to Map${mapNumber}:`, error.message);
        return false;
    }
}

// Process each quest line
console.log(`Processing ${allQuestLines.length} quest lines...`);

allQuestLines.forEach(questLine => {
    console.log(`\nProcessing "${questLine.name}" quest line...`);
    
    // Create starting NPC event
    const { npcEvent, mapNumber } = createNPCEvent(questLine.startingNPC, questLine.name);
    
    if (npcEvent && mapNumber) {
        // Write NPC event to file
        const eventFilePath = writeNPCEventToFile(npcEvent, questLine.name);
        
        // Add event to map
        console.log(`Adding ${questLine.startingNPC.name} to Map${mapNumber}...`);
        const success = addEventToMap(mapNumber, npcEvent);
        
        if (success) {
            console.log(`Successfully added ${questLine.startingNPC.name} to Map${mapNumber}`);
        } else {
            console.error(`Failed to add ${questLine.startingNPC.name} to Map${mapNumber}`);
        }
    }
});

console.log("\nAll quest line NPCs have been processed.");
console.log("To see the NPCs in-game, load the game and visit their locations.");
console.log("Note: You may need to set up appropriate switches and variables for quest progression.");
