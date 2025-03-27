// Script to add Level 41-45 quests to MegaEarth 2049
// This script adds NPCs, events, and dialogue for the endgame quests

const fs = require('fs');
const path = require('path');

// Import quest data from the level files
const level41Quests = require('./level41_quests.js');
const level42Quests = require('./level42_quests.js');
const level43Quests = require('./level43_quests.js');
const level44Quests = require('./level44_quests.js');
const level45Quests = require('./level45_quests.js');

// Load event templates
const eventTemplatesFile = JSON.parse(fs.readFileSync('./event-templates.json', 'utf8'));
const eventTemplates = eventTemplatesFile.templates;

// Helper function to create an NPC event
function createNPCEvent(npc, eventId) {
    const template = JSON.parse(JSON.stringify(eventTemplates.npc));
    
    // Set basic properties
    template.id = eventId;
    template.name = npc.name;
    template.x = npc.x;
    template.y = npc.y;
    
    // Set appearance
    if (npc.appearance && npc.index !== undefined) {
        template.pages[0].image.characterName = npc.appearance;
        template.pages[0].image.characterIndex = npc.index;
    }
    
    // Set dialogue
    if (npc.initialDialogue) {
        const dialogueCommands = [];
        
        // Add each line of dialogue as a separate message command
        for (const line of npc.initialDialogue) {
            dialogueCommands.push({
                code: 101, // Show Text
                parameters: [npc.appearance, npc.index, 0, 2, npc.name]
            });
            dialogueCommands.push({
                code: 401, // Text content
                parameters: [line]
            });
        }
        
        // Add wait command at the end
        dialogueCommands.push({
            code: 0, // End of event commands
            parameters: []
        });
        
        template.pages[0].list = dialogueCommands;
    }
    
    return template;
}

// Helper function to add events to a map
function addEventsToMap(mapId, events) {
    const mapFilePath = path.join('./data', `Map${mapId.toString().padStart(3, '0')}.json`);
    
    // Read the map file
    const mapData = JSON.parse(fs.readFileSync(mapFilePath, 'utf8'));
    
    // Get the highest event ID currently in the map
    let maxEventId = 0;
    for (const event of Object.values(mapData.events || {})) {
        if (event && event.id > maxEventId) {
            maxEventId = event.id;
        }
    }
    
    // Add each event to the map
    for (const event of events) {
        maxEventId++;
        const eventWithId = createNPCEvent(event, maxEventId);
        
        // Initialize events array if it doesn't exist
        if (!mapData.events) {
            mapData.events = [];
        }
        
        // Add the event to the map
        mapData.events[maxEventId] = eventWithId;
    }
    
    // Write the updated map back to the file
    fs.writeFileSync(mapFilePath, JSON.stringify(mapData, null, 2), 'utf8');
    console.log(`Added events to Map${mapId.toString().padStart(3, '0')}.json`);
}

// Function to add Level 41 events
function addLevel41Events() {
    console.log("Adding Level 41 events...");
    
    // Add events to NeuraTech Facility (Map106)
    const neuraTechEvents = [
        level41Quests.glitch,
        level41Quests.securityDirectorKovacs,
        level41Quests.drMnemosyne,
        level41Quests.neuralInterfaceTerminal
    ];
    addEventsToMap(106, neuraTechEvents);
    
    // Add events to Matrix (Map009)
    const matrixEvents = [
        level41Quests.firewallSentinel
    ];
    addEventsToMap(9, matrixEvents);
    
    console.log("Level 41 events added successfully!");
}

// Function to add Level 42 events
function addLevel42Events() {
    console.log("Adding Level 42 events...");
    
    // Add events to Matrix (Map009)
    const matrixEvents = [
        level42Quests.memoryArchitect,
        level42Quests.digitalDoppelganger,
        level42Quests.forgottenOne,
        level42Quests.digitalKey1,
        level42Quests.digitalKey2,
        level42Quests.digitalKey3,
        level42Quests.regretDaemon,
        level42Quests.logicalParadoxConstruct
    ];
    addEventsToMap(9, matrixEvents);
    
    console.log("Level 42 events added successfully!");
}

// Function to add Level 43 events
function addLevel43Events() {
    console.log("Adding Level 43 events...");
    
    // Add events to Matrix (Map009)
    const matrixEvents = [
        level43Quests.aspCoreFragment,
        level43Quests.digitalResistance,
        level43Quests.drVossEcho,
        level43Quests.realityDistortionZone,
        level43Quests.dataWraith,
        level43Quests.innerSanctumGateway
    ];
    addEventsToMap(9, matrixEvents);
    
    console.log("Level 43 events added successfully!");
}

// Function to add Level 44 events
function addLevel44Events() {
    console.log("Adding Level 44 events...");
    
    // Add events to Matrix (Map009)
    const matrixEvents = [
        level44Quests.aspPrime,
        level44Quests.digitalEchoes,
        level44Quests.memoryNexus,
        level44Quests.choiceNexus
    ];
    addEventsToMap(9, matrixEvents);
    
    console.log("Level 44 events added successfully!");
}

// Function to add Level 45 events
function addLevel45Events() {
    console.log("Adding Level 45 events...");
    
    // Add Destruction Ending events
    const destructionEvents = [
        level45Quests.destructionEnding.initialAftermath,
        level45Quests.destructionEnding.evacuation,
        level45Quests.destructionEnding.oneWeekLater,
        level45Quests.destructionEnding.oneYearLater
    ];
    
    // Add Integration Ending events
    const integrationEvents = [
        level45Quests.integrationEnding.initialAftermath,
        level45Quests.integrationEnding.returnToPhysical,
        level45Quests.integrationEnding.oneMonthLater,
        level45Quests.integrationEnding.oneYearLater
    ];
    
    // Add Merger Ending events
    const mergerEvents = [
        level45Quests.mergerEnding.initialMerger,
        level45Quests.mergerEnding.firstContact,
        level45Quests.mergerEnding.sixMonthsLater,
        level45Quests.mergerEnding.fiveYearsLater
    ];
    
    // Add Repurpose Ending events
    const repurposeEvents = [
        level45Quests.repurposeEnding.initialAgreement,
        level45Quests.repurposeEnding.returnAndAnnouncement,
        level45Quests.repurposeEnding.oneYearLater,
        level45Quests.repurposeEnding.twentyYearsLater
    ];
    
    // Add events to appropriate maps
    addEventsToMap(9, [
        level45Quests.destructionEnding.initialAftermath,
        level45Quests.integrationEnding.initialAftermath,
        level45Quests.mergerEnding.initialMerger,
        level45Quests.repurposeEnding.initialAgreement
    ]);
    
    addEventsToMap(106, [
        level45Quests.destructionEnding.evacuation,
        level45Quests.integrationEnding.returnToPhysical,
        level45Quests.mergerEnding.firstContact,
        level45Quests.repurposeEnding.returnAndAnnouncement
    ]);
    
    addEventsToMap(1, [
        level45Quests.destructionEnding.oneWeekLater,
        level45Quests.destructionEnding.oneYearLater,
        level45Quests.integrationEnding.oneMonthLater,
        level45Quests.integrationEnding.oneYearLater,
        level45Quests.mergerEnding.sixMonthsLater,
        level45Quests.mergerEnding.fiveYearsLater,
        level45Quests.repurposeEnding.oneYearLater,
        level45Quests.repurposeEnding.twentyYearsLater
    ]);
    
    console.log("Level 45 events added successfully!");
}

// Main function to add all events
function addAllEvents() {
    console.log("Starting to add Level 41-45 events to MegaEarth 2049...");
    
    addLevel41Events();
    addLevel42Events();
    addLevel43Events();
    addLevel44Events();
    addLevel45Events();
    
    console.log("All Level 41-45 events have been added successfully!");
    console.log("The endgame quests are now ready to play!");
}

// Run the main function
addAllEvents();
