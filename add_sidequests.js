// Script to add side quests to MegaEarth 2049
const fs = require('fs');
const path = require('path');

// Load the event templates
const templatesPath = path.join(__dirname, 'event-templates.json');
const templates = JSON.parse(fs.readFileSync(templatesPath, 'utf8'));

// Load the side quests
const level34_35_sidequests = require('./level34_35_sidequests.js');
const level36_37_sidequests = require('./level36_37_sidequests.js');
const level38_40_sidequests = require('./level38_40_sidequests.js');

// Create a temporary directory for our event files
const tempDir = path.join(__dirname, 'temp_events');
if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir);
}

// Function to create an event file
function createEventFile(event, filename) {
    const filePath = path.join(tempDir, filename);
    fs.writeFileSync(filePath, JSON.stringify(event, null, 2));
    return filePath;
}

// Process "The Frozen Melody" quest
console.log('Processing "The Frozen Melody" side quest...');

// Create the Nostalgic Musician NPC
const nostalgicMusician = JSON.parse(JSON.stringify(templates.templates.npc));
nostalgicMusician.name = level34_35_sidequests.frozenMelody.nostalgicMusician.name;
nostalgicMusician.x = level34_35_sidequests.frozenMelody.nostalgicMusician.x;
nostalgicMusician.y = level34_35_sidequests.frozenMelody.nostalgicMusician.y;
nostalgicMusician.pages[0].image.characterName = level34_35_sidequests.frozenMelody.nostalgicMusician.appearance;
nostalgicMusician.pages[0].image.characterIndex = level34_35_sidequests.frozenMelody.nostalgicMusician.index;

// Modify the dialogue for the Nostalgic Musician
nostalgicMusician.pages[0].list = [
    {"code": 101, "indent": 0, "parameters": [level34_35_sidequests.frozenMelody.nostalgicMusician.appearance, level34_35_sidequests.frozenMelody.nostalgicMusician.index, 0, 2]},
    {"code": 401, "indent": 0, "parameters": [level34_35_sidequests.frozenMelody.nostalgicMusician.initialDialogue[0]]},
    {"code": 401, "indent": 0, "parameters": [level34_35_sidequests.frozenMelody.nostalgicMusician.initialDialogue[1]]},
    {"code": 401, "indent": 0, "parameters": [level34_35_sidequests.frozenMelody.nostalgicMusician.initialDialogue[2]]},
    {"code": 102, "indent": 0, "parameters": [["Help find instrument", "Not now"], 1]},
    {"code": 402, "indent": 0, "parameters": [0, "Help find instrument"]},
    {"code": 121, "indent": 1, "parameters": [50, 50, 0]}, // Turn on switch 50 (Frozen Melody quest)
    {"code": 101, "indent": 1, "parameters": [level34_35_sidequests.frozenMelody.nostalgicMusician.appearance, level34_35_sidequests.frozenMelody.nostalgicMusician.index, 0, 2]},
    {"code": 401, "indent": 1, "parameters": [level34_35_sidequests.frozenMelody.nostalgicMusician.questDialogue[0]]},
    {"code": 401, "indent": 1, "parameters": [level34_35_sidequests.frozenMelody.nostalgicMusician.questDialogue[1]]},
    {"code": 401, "indent": 1, "parameters": [level34_35_sidequests.frozenMelody.nostalgicMusician.questDialogue[2]]},
    {"code": 101, "indent": 1, "parameters": [level34_35_sidequests.frozenMelody.nostalgicMusician.appearance, level34_35_sidequests.frozenMelody.nostalgicMusician.index, 0, 2]},
    {"code": 401, "indent": 1, "parameters": [level34_35_sidequests.frozenMelody.nostalgicMusician.questDialogue[3]]},
    {"code": 401, "indent": 1, "parameters": [level34_35_sidequests.frozenMelody.nostalgicMusician.questDialogue[4]]},
    {"code": 401, "indent": 1, "parameters": [level34_35_sidequests.frozenMelody.nostalgicMusician.questDialogue[5]]},
    {"code": 401, "indent": 1, "parameters": [level34_35_sidequests.frozenMelody.nostalgicMusician.questDialogue[6]]},
    {"code": 0, "indent": 1, "parameters": []},
    {"code": 402, "indent": 0, "parameters": [1, "Not now"]},
    {"code": 101, "indent": 1, "parameters": [level34_35_sidequests.frozenMelody.nostalgicMusician.appearance, level34_35_sidequests.frozenMelody.nostalgicMusician.index, 0, 2]},
    {"code": 401, "indent": 1, "parameters": ["I understand. If you change your mind,"]},
    {"code": 401, "indent": 1, "parameters": ["please come back. My music is my life."]},
    {"code": 0, "indent": 1, "parameters": []},
    {"code": 0, "indent": 0, "parameters": []}
];

// Add a second page for when the quest is active but instrument not found
nostalgicMusician.pages[1] = {
    "conditions": {"actorId": 1, "actorValid": false, "itemId": 1, "itemValid": false, "selfSwitchCh": "A", "selfSwitchValid": false, "switch1Id": 50, "switch1Valid": true, "switch2Id": 51, "switch2Valid": false, "variableId": 1, "variableValid": false, "variableValue": 0},
    "directionFix": false,
    "image": {"characterIndex": level34_35_sidequests.frozenMelody.nostalgicMusician.index, "characterName": level34_35_sidequests.frozenMelody.nostalgicMusician.appearance, "direction": 2, "pattern": 1, "tileId": 0},
    "list": [
        {"code": 101, "indent": 0, "parameters": [level34_35_sidequests.frozenMelody.nostalgicMusician.appearance, level34_35_sidequests.frozenMelody.nostalgicMusician.index, 0, 2]},
        {"code": 401, "indent": 0, "parameters": [level34_35_sidequests.frozenMelody.nostalgicMusician.waitingDialogue1[0]]},
        {"code": 401, "indent": 0, "parameters": [level34_35_sidequests.frozenMelody.nostalgicMusician.waitingDialogue1[1]]},
        {"code": 401, "indent": 0, "parameters": [level34_35_sidequests.frozenMelody.nostalgicMusician.waitingDialogue1[2]]},
        {"code": 0, "indent": 0, "parameters": []}
    ],
    "moveFrequency": 3,
    "moveRoute": {"list": [{"code": 0, "parameters": []}], "repeat": true, "skippable": false, "wait": false},
    "moveSpeed": 3,
    "moveType": 0,
    "priorityType": 1,
    "stepAnime": false,
    "through": false,
    "trigger": 0,
    "walkAnime": true
};

// Add a third page for when the instrument is found but not thawed
nostalgicMusician.pages[2] = {
    "conditions": {"actorId": 1, "actorValid": false, "itemId": 1, "itemValid": false, "selfSwitchCh": "A", "selfSwitchValid": false, "switch1Id": 51, "switch1Valid": true, "switch2Id": 52, "switch2Valid": false, "variableId": 1, "variableValid": false, "variableValue": 0},
    "directionFix": false,
    "image": {"characterIndex": level34_35_sidequests.frozenMelody.nostalgicMusician.index, "characterName": level34_35_sidequests.frozenMelody.nostalgicMusician.appearance, "direction": 2, "pattern": 1, "tileId": 0},
    "list": [
        {"code": 101, "indent": 0, "parameters": [level34_35_sidequests.frozenMelody.nostalgicMusician.appearance, level34_35_sidequests.frozenMelody.nostalgicMusician.index, 0, 2]},
        {"code": 401, "indent": 0, "parameters": [level34_35_sidequests.frozenMelody.nostalgicMusician.waitingDialogue2[0]]},
        {"code": 401, "indent": 0, "parameters": [level34_35_sidequests.frozenMelody.nostalgicMusician.waitingDialogue2[1]]},
        {"code": 401, "indent": 0, "parameters": [level34_35_sidequests.frozenMelody.nostalgicMusician.waitingDialogue2[2]]},
        {"code": 401, "indent": 0, "parameters": [level34_35_sidequests.frozenMelody.nostalgicMusician.waitingDialogue2[3]]},
        {"code": 0, "indent": 0, "parameters": []}
    ],
    "moveFrequency": 3,
    "moveRoute": {"list": [{"code": 0, "parameters": []}], "repeat": true, "skippable": false, "wait": false},
    "moveSpeed": 3,
    "moveType": 0,
    "priorityType": 1,
    "stepAnime": false,
    "through": false,
    "trigger": 0,
    "walkAnime": true
};

// Add a fourth page for when the player has the thawed instrument
nostalgicMusician.pages[3] = {
    "conditions": {"actorId": 1, "actorValid": false, "itemId": 1, "itemValid": false, "selfSwitchCh": "A", "selfSwitchValid": false, "switch1Id": 52, "switch1Valid": true, "switch2Id": 53, "switch2Valid": false, "variableId": 1, "variableValid": false, "variableValue": 0},
    "directionFix": false,
    "image": {"characterIndex": level34_35_sidequests.frozenMelody.nostalgicMusician.index, "characterName": level34_35_sidequests.frozenMelody.nostalgicMusician.appearance, "direction": 2, "pattern": 1, "tileId": 0},
    "list": [
        {"code": 101, "indent": 0, "parameters": [level34_35_sidequests.frozenMelody.nostalgicMusician.appearance, level34_35_sidequests.frozenMelody.nostalgicMusician.index, 0, 2]},
        {"code": 401, "indent": 0, "parameters": [level34_35_sidequests.frozenMelody.nostalgicMusician.completionDialogue[0]]},
        {"code": 401, "indent": 0, "parameters": [level34_35_sidequests.frozenMelody.nostalgicMusician.completionDialogue[1]]},
        {"code": 401, "indent": 0, "parameters": [level34_35_sidequests.frozenMelody.nostalgicMusician.completionDialogue[2]]},
        {"code": 101, "indent": 0, "parameters": [level34_35_sidequests.frozenMelody.nostalgicMusician.appearance, level34_35_sidequests.frozenMelody.nostalgicMusician.index, 0, 2]},
        {"code": 401, "indent": 0, "parameters": [level34_35_sidequests.frozenMelody.nostalgicMusician.completionDialogue[3]]},
        {"code": 401, "indent": 0, "parameters": [level34_35_sidequests.frozenMelody.nostalgicMusician.completionDialogue[4]]},
        {"code": 401, "indent": 0, "parameters": [level34_35_sidequests.frozenMelody.nostalgicMusician.completionDialogue[5]]},
        {"code": 128, "indent": 0, "parameters": [{"name":"Harmonic Resonator","icon":176,"description":"An ancient device that can stun enemies with sound waves.","effects":[{"code":41,"dataId":4,"value":0.3}],"occasion":1,"price":0,"consumable":false,"itypeId":1,"scope":2,"speed":0,"successRate":100,"repeats":1,"tpGain":0,"hitType":0,"animationId":0,"damage":{"critical":false,"elementId":0,"formula":"0","type":0,"variance":20},"note":""}]},
        {"code": 121, "indent": 0, "parameters": [53, 53, 0]}, // Turn on switch 53 (Frozen Melody quest completed)
        {"code": 123, "indent": 0, "parameters": ["A", 0]}, // Turn on self switch A
        {"code": 0, "indent": 0, "parameters": []}
    ],
    "moveFrequency": 3,
    "moveRoute": {"list": [{"code": 0, "parameters": []}], "repeat": true, "skippable": false, "wait": false},
    "moveSpeed": 3,
    "moveType": 0,
    "priorityType": 1,
    "stepAnime": false,
    "through": false,
    "trigger": 0,
    "walkAnime": true
};

// Add a fifth page for after the quest is completed
nostalgicMusician.pages[4] = {
    "conditions": {"actorId": 1, "actorValid": false, "itemId": 1, "itemValid": false, "selfSwitchCh": "A", "selfSwitchValid": true, "switch1Id": 1, "switch1Valid": false, "switch2Id": 1, "switch2Valid": false, "variableId": 1, "variableValid": false, "variableValue": 0},
    "directionFix": false,
    "image": {"characterIndex": level34_35_sidequests.frozenMelody.nostalgicMusician.index, "characterName": level34_35_sidequests.frozenMelody.nostalgicMusician.appearance, "direction": 2, "pattern": 1, "tileId": 0},
    "list": [
        {"code": 101, "indent": 0, "parameters": [level34_35_sidequests.frozenMelody.nostalgicMusician.appearance, level34_35_sidequests.frozenMelody.nostalgicMusician.index, 0, 2]},
        {"code": 401, "indent": 0, "parameters": [level34_35_sidequests.frozenMelody.nostalgicMusician.postQuestDialogue[0]]},
        {"code": 401, "indent": 0, "parameters": [level34_35_sidequests.frozenMelody.nostalgicMusician.postQuestDialogue[1]]},
        {"code": 401, "indent": 0, "parameters": [level34_35_sidequests.frozenMelody.nostalgicMusician.postQuestDialogue[2]]},
        {"code": 0, "indent": 0, "parameters": []}
    ],
    "moveFrequency": 3,
    "moveRoute": {"list": [{"code": 0, "parameters": []}], "repeat": true, "skippable": false, "wait": false},
    "moveSpeed": 3,
    "moveType": 0,
    "priorityType": 1,
    "stepAnime": false,
    "through": false,
    "trigger": 0,
    "walkAnime": true
};

// Create the Frozen Instrument
const frozenInstrument = JSON.parse(JSON.stringify(templates.templates.chest));
frozenInstrument.name = level34_35_sidequests.frozenMelody.frozenInstrument.name;
frozenInstrument.x = level34_35_sidequests.frozenMelody.frozenInstrument.x;
frozenInstrument.y = level34_35_sidequests.frozenMelody.frozenInstrument.y;
frozenInstrument.pages[0].image.characterName = level34_35_sidequests.frozenMelody.frozenInstrument.appearance;
frozenInstrument.pages[0].image.characterIndex = level34_35_sidequests.frozenMelody.frozenInstrument.index;

// Modify the dialogue for the Frozen Instrument
frozenInstrument.pages[0].list = [
    {"code": 111, "indent": 0, "parameters": [0, 50, 0, 0, 0]}, // If switch 50 is OFF (quest not started)
    {"code": 101, "indent": 1, "parameters": ["", 0, 0, 2]},
    {"code": 401, "indent": 1, "parameters": ["A strange object encased in ice."]},
    {"code": 401, "indent": 1, "parameters": ["You can't tell what it is."]},
    {"code": 0, "indent": 1, "parameters": []},
    {"code": 411, "indent": 0, "parameters": []}, // Else (quest is active)
    {"code": 101, "indent": 1, "parameters": ["", 0, 0, 2]},
    {"code": 401, "indent": 1, "parameters": [level34_35_sidequests.frozenMelody.frozenInstrument.dialogue[0]]},
    {"code": 401, "indent": 1, "parameters": [level34_35_sidequests.frozenMelody.frozenInstrument.dialogue[1]]},
    {"code": 401, "indent": 1, "parameters": [level34_35_sidequests.frozenMelody.frozenInstrument.dialogue[2]]},
    {"code": 401, "indent": 1, "parameters": [level34_35_sidequests.frozenMelody.frozenInstrument.dialogue[3]]},
    {"code": 121, "indent": 1, "parameters": [51, 51, 0]}, // Turn on switch 51 (Instrument found)
    {"code": 123, "indent": 1, "parameters": ["A", 0]}, // Turn on self switch A
    {"code": 0, "indent": 1, "parameters": []},
    {"code": 412, "indent": 0, "parameters": []},
    {"code": 0, "indent": 0, "parameters": []}
];

// Create the Warming Herbs
// Warming Herb 1
const warmingHerb1 = JSON.parse(JSON.stringify(templates.templates.terminal));
warmingHerb1.name = level34_35_sidequests.frozenMelody.warmingHerb1.name;
warmingHerb1.x = level34_35_sidequests.frozenMelody.warmingHerb1.x;
warmingHerb1.y = level34_35_sidequests.frozenMelody.warmingHerb1.y;
warmingHerb1.pages[0].image.characterName = level34_35_sidequests.frozenMelody.warmingHerb1.appearance;
warmingHerb1.pages[0].image.characterIndex = level34_35_sidequests.frozenMelody.warmingHerb1.index;

// Modify the dialogue for Warming Herb 1
warmingHerb1.pages[0].list = [
    {"code": 111, "indent": 0, "parameters": [0, 51, 0, 0, 0]}, // If switch 51 is OFF (instrument not found)
    {"code": 101, "indent": 1, "parameters": ["", 0, 0, 2]},
    {"code": 401, "indent": 1, "parameters": ["A plant with bright red leaves."]},
    {"code": 401, "indent": 1, "parameters": ["It feels warm to the touch."]},
    {"code": 0, "indent": 1, "parameters": []},
    {"code": 411, "indent": 0, "parameters": []}, // Else (instrument found)
    {"code": 101, "indent": 1, "parameters": ["", 0, 0, 2]},
    {"code": 401, "indent": 1, "parameters": [level34_35_sidequests.frozenMelody.warmingHerb1.dialogue[0]]},
    {"code": 401, "indent": 1, "parameters": [level34_35_sidequests.frozenMelody.warmingHerb1.dialogue[1]]},
    {"code": 401, "indent": 1, "parameters": [level34_35_sidequests.frozenMelody.warmingHerb1.dialogue[2]]},
    {"code": 122, "indent": 1, "parameters": [50, 50, 1, 0, 1]}, // Increment variable 50 (herb count)
    {"code": 123, "indent": 1, "parameters": ["A", 0]}, // Turn on self switch A
    {"code": 0, "indent": 1, "parameters": []},
    {"code": 412, "indent": 0, "parameters": []},
    {"code": 0, "indent": 0, "parameters": []}
];

// Create the Village Alchemist
const villageAlchemist = JSON.parse(JSON.stringify(templates.templates.npc));
villageAlchemist.name = level34_35_sidequests.frozenMelody.villageAlchemist.name;
villageAlchemist.x = level34_35_sidequests.frozenMelody.villageAlchemist.x;
villageAlchemist.y = level34_35_sidequests.frozenMelody.villageAlchemist.y;
villageAlchemist.pages[0].image.characterName = level34_35_sidequests.frozenMelody.villageAlchemist.appearance;
villageAlchemist.pages[0].image.characterIndex = level34_35_sidequests.frozenMelody.villageAlchemist.index;

// Modify the dialogue for the Village Alchemist
villageAlchemist.pages[0].list = [
    {"code": 111, "indent": 0, "parameters": [0, 51, 0, 0, 0]}, // If switch 51 is OFF (instrument not found)
    {"code": 101, "indent": 1, "parameters": [level34_35_sidequests.frozenMelody.villageAlchemist.appearance, level34_35_sidequests.frozenMelody.villageAlchemist.index, 0, 2]},
    {"code": 401, "indent": 1, "parameters": [level34_35_sidequests.frozenMelody.villageAlchemist.initialDialogue[0]]},
    {"code": 401, "indent": 1, "parameters": [level34_35_sidequests.frozenMelody.villageAlchemist.initialDialogue[1]]},
    {"code": 401, "indent": 1, "parameters": [level34_35_sidequests.frozenMelody.villageAlchemist.initialDialogue[2]]},
    {"code": 0, "indent": 1, "parameters": []},
    {"code": 411, "indent": 0, "parameters": []}, // Else (instrument found)
    {"code": 111, "indent": 1, "parameters": [1, 50, 0, 3, 0]}, // If variable 50 (herb count) < 3
    {"code": 101, "indent": 2, "parameters": [level34_35_sidequests.frozenMelody.villageAlchemist.appearance, level34_35_sidequests.frozenMelody.villageAlchemist.index, 0, 2]},
    {"code": 401, "indent": 2, "parameters": [level34_35_sidequests.frozenMelody.villageAlchemist.waitingDialogue[0]]},
    {"code": 401, "indent": 2, "parameters": [level34_35_sidequests.frozenMelody.villageAlchemist.waitingDialogue[1]]},
    {"code": 401, "indent": 2, "parameters": [level34_35_sidequests.frozenMelody.villageAlchemist.waitingDialogue[2]]},
    {"code": 401, "indent": 2, "parameters": [level34_35_sidequests.frozenMelody.villageAlchemist.waitingDialogue[3]]},
    {"code": 0, "indent": 2, "parameters": []},
    {"code": 411, "indent": 1, "parameters": []}, // Else (all herbs found)
    {"code": 101, "indent": 2, "parameters": [level34_35_sidequests.frozenMelody.villageAlchemist.appearance, level34_35_sidequests.frozenMelody.villageAlchemist.index, 0, 2]},
    {"code": 401, "indent": 2, "parameters": [level34_35_sidequests.frozenMelody.villageAlchemist.completionDialogue[0]]},
    {"code": 401, "indent": 2, "parameters": [level34_35_sidequests.frozenMelody.villageAlchemist.completionDialogue[1]]},
    {"code": 401, "indent": 2, "parameters": [level34_35_sidequests.frozenMelody.villageAlchemist.completionDialogue[2]]},
    {"code": 101, "indent": 2, "parameters": [level34_35_sidequests.frozenMelody.villageAlchemist.appearance, level34_35_sidequests.frozenMelody.villageAlchemist.index, 0, 2]},
    {"code": 401, "indent": 2, "parameters": [level34_35_sidequests.frozenMelody.villageAlchemist.completionDialogue[3]]},
    {"code": 401, "indent": 2, "parameters": [level34_35_sidequests.frozenMelody.villageAlchemist.completionDialogue[4]]},
    {"code": 401, "indent": 2, "parameters": [level34_35_sidequests.frozenMelody.villageAlchemist.completionDialogue[5]]},
    {"code": 401, "indent": 2, "parameters": [level34_35_sidequests.frozenMelody.villageAlchemist.completionDialogue[6]]},
    {"code": 121, "indent": 2, "parameters": [52, 52, 0]}, // Turn on switch 52 (Thawing solution created)
    {"code": 123, "indent": 2, "parameters": ["A", 0]}, // Turn on self switch A
    {"code": 0, "indent": 2, "parameters": []},
    {"code": 412, "indent": 1, "parameters": []},
    {"code": 0, "indent": 1, "parameters": []},
    {"code": 412, "indent": 0, "parameters": []},
    {"code": 0, "indent": 0, "parameters": []}
];

// Add a second page for after giving the solution
villageAlchemist.pages[1] = {
    "conditions": {"actorId": 1, "actorValid": false, "itemId": 1, "itemValid": false, "selfSwitchCh": "A", "selfSwitchValid": true, "switch1Id": 1, "switch1Valid": false, "switch2Id": 1, "switch2Valid": false, "variableId": 1, "variableValid": false, "variableValue": 0},
    "directionFix": false,
    "image": {"characterIndex": level34_35_sidequests.frozenMelody.villageAlchemist.index, "characterName": level34_35_sidequests.frozenMelody.villageAlchemist.appearance, "direction": 2, "pattern": 1, "tileId": 0},
    "list": [
        {"code": 101, "indent": 0, "parameters": [level34_35_sidequests.frozenMelody.villageAlchemist.appearance, level34_35_sidequests.frozenMelody.villageAlchemist.index, 0, 2]},
        {"code": 401, "indent": 0, "parameters": [level34_35_sidequests.frozenMelody.villageAlchemist.postQuestDialogue[0]]},
        {"code": 401, "indent": 0, "parameters": [level34_35_sidequests.frozenMelody.villageAlchemist.postQuestDialogue[1]]},
        {"code": 401, "indent": 0, "parameters": [level34_35_sidequests.frozenMelody.villageAlchemist.postQuestDialogue[2]]},
        {"code": 0, "indent": 0, "parameters": []}
    ],
    "moveFrequency": 3,
    "moveRoute": {"list": [{"code": 0, "parameters": []}], "repeat": true, "skippable": false, "wait": false},
    "moveSpeed": 3,
    "moveType": 0,
    "priorityType": 1,
    "stepAnime": false,
    "through": false,
    "trigger": 0,
    "walkAnime": true
};

// Create event files for "The Frozen Melody" quest
const nostalgicMusicianPath = createEventFile(nostalgicMusician, 'nostalgic_musician.json');
const frozenInstrumentPath = createEventFile(frozenInstrument, 'frozen_instrument.json');
const warmingHerb1Path = createEventFile(warmingHerb1, 'warming_herb1.json');
const villageAlchemistPath = createEventFile(villageAlchemist, 'village_alchemist.json');

// Process "Memory Lane Maintenance" quest
console.log('Processing "Memory Lane Maintenance" side quest...');

// Create the Corrupted Maintenance AI NPC
const corruptedMaintenanceAI = JSON.parse(JSON.stringify(templates.templates.terminal));
corruptedMaintenanceAI.name = level36_37_sidequests.memoryLaneMaintenance.corruptedMaintenanceAI.name;
corruptedMaintenanceAI.x = level36_37_sidequests.memoryLaneMaintenance.corruptedMaintenanceAI.x;
corruptedMaintenanceAI.y = level36_37_sidequests.memoryLaneMaintenance.corruptedMaintenanceAI.y;
corruptedMaintenanceAI.pages[0].image.characterName = level36_37_sidequests.memoryLaneMaintenance.corruptedMaintenanceAI.appearance;
corruptedMaintenanceAI.pages[0].image.characterIndex = level36_37_sidequests.memoryLaneMaintenance.corruptedMaintenanceAI.index;

// Modify the dialogue for the Corrupted Maintenance AI
corruptedMaintenanceAI.pages[0].list = [
    {"code": 101, "indent": 0, "parameters": ["", 0, 0, 2]},
    {"code": 401, "indent": 0, "parameters": [level36_37_sidequests.memoryLaneMaintenance.corruptedMaintenanceAI.initialDialogue[0]]},
    {"code": 401, "indent": 0, "parameters": [level36_37_sidequests.memoryLaneMaintenance.corruptedMaintenanceAI.initialDialogue[1]]},
    {"code": 401, "indent": 0, "parameters": [level36_37_sidequests.memoryLaneMaintenance.corruptedMaintenanceAI.initialDialogue[2]]},
    {"code": 401, "indent": 0, "parameters": [level36_37_sidequests.memoryLaneMaintenance.corruptedMaintenanceAI.initialDialogue[3]]},
    {"code": 102, "indent": 0, "parameters": [["Stop deletion", "Leave it alone"], 1]},
    {"code": 402, "indent": 0, "parameters": [0, "Stop deletion"]},
    {"code": 121, "indent": 1, "parameters": [54, 54, 0]}, // Turn on switch 54 (Memory Lane Maintenance quest)
    {"code": 101, "indent": 1, "parameters": ["", 0, 0, 2]},
    {"code": 401, "indent": 1, "parameters": [level36_37_sidequests.memoryLaneMaintenance.corruptedMaintenanceAI.questDialogue[0]]},
    {"code": 401, "indent": 1, "parameters": [level36_37_sidequests.memoryLaneMaintenance.corruptedMaintenanceAI.questDialogue[1]]},
    {"code": 401, "indent": 1, "parameters": [level36_37_sidequests.memoryLaneMaintenance.corruptedMaintenanceAI.questDialogue[2]]},
    {"code": 101, "indent": 1, "parameters": ["", 0, 0, 2]},
    {"code": 401, "indent": 1, "parameters": [level36_37_sidequests.memoryLaneMaintenance.corruptedMaintenanceAI.questDialogue[3]]},
    {"code": 401, "indent": 1, "parameters": [level36_37_sidequests.memoryLaneMaintenance.corruptedMaintenanceAI.questDialogue[4]]},
    {"code": 401, "indent": 1, "parameters": [level36_37_sidequests.memoryLaneMaintenance.corruptedMaintenanceAI.questDialogue[5]]},
    {"code": 0, "indent": 1, "parameters": []},
    {"code": 402, "indent": 0, "parameters": [1, "Leave it alone"]},
    {"code": 101, "indent": 1, "parameters": ["", 0, 0, 2]},
    {"code": 401, "indent": 1, "parameters": ["DELETION SEQUENCE CONTINUING."]},
    {"code": 401, "indent": 1, "parameters": ["MEMORY FILES WILL BE PURGED."]},
    {"code": 0, "indent": 1, "parameters": []},
    {"code": 0, "indent": 0, "parameters": []}
];

// Add a second page for when the quest is active but not all memory samples collected
corruptedMaintenanceAI.pages[1] = {
    "conditions": {"actorId": 1, "actorValid": false, "itemId": 1, "itemValid": false, "selfSwitchCh": "A", "selfSwitchValid": false, "switch1Id": 54, "switch1Valid": true, "switch2Id": 55, "switch2Valid": false, "variableId": 1, "variableValid": false, "variableValue": 0},
    "directionFix": false,
    "image": {"characterIndex": level36_37_sidequests.memoryLaneMaintenance.corruptedMaintenanceAI.index, "characterName": level36_37_sidequests.memoryLaneMaintenance.corruptedMaintenanceAI.appearance, "direction": 2, "pattern": 1, "tileId": 0},
    "list": [
        {"code": 111, "indent": 0, "parameters": [1, 54, 0, 5, 0]}, // If variable 54 (memory sample count) < 5
        {"code": 101, "indent": 1, "parameters": ["", 0, 0, 2]},
        {"code": 401, "indent": 1, "parameters": [level36_37_sidequests.memoryLaneMaintenance.corruptedMaintenanceAI.waitingDialogue[0]]},
        {"code": 401, "indent": 1, "parameters": [level36_37_sidequests.memoryLaneMaintenance.corruptedMaintenanceAI.waitingDialogue[1]]},
        {"code": 401, "indent": 1, "parameters": [level36_37_sidequests.memoryLaneMaintenance.corruptedMaintenanceAI.waitingDialogue[2]]},
        {"code": 401, "indent": 1, "parameters": [level36_37_sidequests.memoryLaneMaintenance.corruptedMaintenanceAI.waitingDialogue[3]]},
        {"code": 0, "indent": 1, "parameters": []},
        {"code": 411, "indent": 0, "parameters": []}, // Else (all memory samples collected)
        {"code": 101, "indent": 1, "parameters": ["", 0, 0, 2]},
        {"code": 401, "indent": 1, "parameters": [level36_37_sidequests.memoryLaneMaintenance.corruptedMaintenanceAI.completionDialogue[0]]},
        {"code": 401, "indent": 1, "parameters": [level36_37_sidequests.memoryLaneMaintenance.corruptedMaintenanceAI.completionDialogue[1]]},
        {"code": 101, "indent": 1, "parameters": ["", 0, 0, 2]},
        {"code": 401, "indent": 1, "parameters": [level36_37_sidequests.memoryLaneMaintenance.corruptedMaintenanceAI.completionDialogue[2]]},
        {"code": 401, "indent": 1, "parameters": [level36_37_sidequests.memoryLaneMaintenance.corruptedMaintenanceAI.completionDialogue[3]]},
        {"code": 401, "indent": 1, "parameters": [level36_37_sidequests.memoryLaneMaintenance.corruptedMaintenanceAI.completionDialogue[4]]},
        {"code": 101, "indent": 1, "parameters": ["", 0, 0, 2]},
        {"code": 401, "indent": 1, "parameters": [level36_37_sidequests.memoryLaneMaintenance.corruptedMaintenanceAI.completionDialogue[5]]},
        {"code": 401, "indent": 1, "parameters": [level36_37_sidequests.memoryLaneMaintenance.corruptedMaintenanceAI.completionDialogue[6]]},
        {"code": 401, "indent": 1, "parameters": [level36_37_sidequests.memoryLaneMaintenance.corruptedMaintenanceAI.completionDialogue[7]]},
        {"code": 128, "indent": 1, "parameters": [{"name":"Memory Optimization","icon":79,"description":"A neural subroutine that increases experience gain.","effects":[{"code":23,"dataId":0,"value":0.1}],"occasion":3,"price":0,"consumable":false,"itypeId":1,"scope":7,"speed":0,"successRate":100,"repeats":1,"tpGain":0,"hitType":0,"animationId":0,"damage":{"critical":false,"elementId":0,"formula":"0","type":0,"variance":20},"note":""}]},
        {"code": 128, "indent": 1, "parameters": [{"name":"Maintenance Override","icon":83,"description":"A key that grants access to restricted areas.","effects":[],"occasion":3,"price":0,"consumable":false,"itypeId":2,"scope":0,"speed":0,"successRate":100,"repeats":1,"tpGain":0,"hitType":0,"animationId":0,"damage":{"critical":false,"elementId":0,"formula":"0","type":0,"variance":20},"note":""}]},
        {"code": 121, "indent": 1, "parameters": [55, 55, 0]}, // Turn on switch 55 (Memory Lane Maintenance quest completed)
        {"code": 123, "indent": 1, "parameters": ["A", 0]}, // Turn on self switch A
        {"code": 0, "indent": 1, "parameters": []},
        {"code": 412, "indent": 0, "parameters": []},
        {"code": 0, "indent": 0, "parameters": []}
    ],
    "moveFrequency": 3,
    "moveRoute": {"list": [{"code": 0, "parameters": []}], "repeat": true, "skippable": false, "wait": false},
    "moveSpeed": 3,
    "moveType": 0,
    "priorityType": 1,
    "stepAnime": false,
    "through": false,
    "trigger": 0,
    "walkAnime": true
};

// Add a third page for after the quest is completed
corruptedMaintenanceAI.pages[2] = {
    "conditions": {"actorId": 1, "actorValid": false, "itemId": 1, "itemValid": false, "selfSwitchCh": "A", "selfSwitchValid": true, "switch1Id": 1, "switch1Valid": false, "switch2Id": 1, "switch2Valid": false, "variableId": 1, "variableValid": false, "variableValue": 0},
    "directionFix": false,
    "image": {"characterIndex": level36_37_sidequests.memoryLaneMaintenance.corruptedMaintenanceAI.index, "characterName": level36_37_sidequests.memoryLaneMaintenance.corruptedMaintenanceAI.appearance, "direction": 2, "pattern": 1, "tileId": 0},
    "list": [
        {"code": 101, "indent": 0, "parameters": ["", 0, 0, 2]},
        {"code": 401, "indent": 0, "parameters": [level36_37_sidequests.memoryLaneMaintenance.corruptedMaintenanceAI.postQuestDialogue[0]]},
        {"code": 401, "indent": 0, "parameters": [level36_37_sidequests.memoryLaneMaintenance.corruptedMaintenanceAI.postQuestDialogue[1]]},
        {"code": 401, "indent": 0, "parameters": [level36_37_sidequests.memoryLaneMaintenance.corruptedMaintenanceAI.postQuestDialogue[2]]},
        {"code": 401, "indent": 0, "parameters": [level36_37_sidequests.memoryLaneMaintenance.corruptedMaintenanceAI.postQuestDialogue[3]]},
        {"code": 0, "indent": 0, "parameters": []}
    ],
    "moveFrequency": 3,
    "moveRoute": {"list": [{"code": 0, "parameters": []}], "repeat": true, "skippable": false, "wait": false},
    "moveSpeed": 3,
    "moveType": 0,
    "priorityType": 1,
    "stepAnime": false,
    "through": false,
    "trigger": 0,
    "walkAnime": true
};

// Create Memory Terminal 1
const memoryTerminal1 = JSON.parse(JSON.stringify(templates.templates.terminal));
memoryTerminal1.name = level36_37_sidequests.memoryLaneMaintenance.memoryTerminal1.name;
memoryTerminal1.x = level36_37_sidequests.memoryLaneMaintenance.memoryTerminal1.x;
memoryTerminal1.y = level36_37_sidequests.memoryLaneMaintenance.memoryTerminal1.y;
memoryTerminal1.pages[0].image.characterName = level36_37_sidequests.memoryLaneMaintenance.memoryTerminal1.appearance;
memoryTerminal1.pages[0].image.characterIndex = level36_37_sidequests.memoryLaneMaintenance.memoryTerminal1.index;

// Modify the dialogue for Memory Terminal 1
memoryTerminal1.pages[0].list = [
    {"code": 111, "indent": 0, "parameters": [0, 54, 0, 0, 0]}, // If switch 54 is OFF (quest not started)
    {"code": 101, "indent": 1, "parameters": ["", 0, 0, 2]},
    {"code": 401, "indent": 1, "parameters": ["A memory terminal. It appears to be inactive."]},
    {"code": 0, "indent": 1, "parameters": []},
    {"code": 411, "indent": 0, "parameters": []}, // Else (quest is active)
    {"code": 101, "indent": 1, "parameters": ["", 0, 0, 2]},
    {"code": 401, "indent": 1, "parameters": [level36_37_sidequests.memoryLaneMaintenance.memoryTerminal1.dialogue[0]]},
    {"code": 401, "indent": 1, "parameters": [level36_37_sidequests.memoryLaneMaintenance.memoryTerminal1.dialogue[1]]},
    {"code": 401, "indent": 1, "parameters": [level36_37_sidequests.memoryLaneMaintenance.memoryTerminal1.dialogue[2]]},
    {"code": 401, "indent": 1, "parameters": [level36_37_sidequests.memoryLaneMaintenance.memoryTerminal1.dialogue[3]]},
    {"code": 401, "indent": 1, "parameters": [level36_37_sidequests.memoryLaneMaintenance.memoryTerminal1.dialogue[4]]},
    {"code": 122, "indent": 1, "parameters": [54, 54, 1, 0, 1]}, // Increment variable 54 (memory sample count)
    {"code": 123, "indent": 1, "parameters": ["A", 0]}, // Turn on self switch A
    {"code": 0, "indent": 1, "parameters": []},
    {"code": 412, "indent": 0, "parameters": []},
    {"code": 0, "indent": 0, "parameters": []}
];

// Process "Quantum Entanglement Dating Service" quest
console.log('Processing "Quantum Entanglement Dating Service" side quest...');

// Create the Professor Paradox's Assistant NPC
const paradoxAssistant = JSON.parse(JSON.stringify(templates.templates.npc));
paradoxAssistant.name = level38_40_sidequests.quantumEntanglementDating.paradoxAssistant.name;
paradoxAssistant.x = level38_40_sidequests.quantumEntanglementDating.paradoxAssistant.x;
paradoxAssistant.y = level38_40_sidequests.quantumEntanglementDating.paradoxAssistant.y;
paradoxAssistant.pages[0].image.characterName = level38_40_sidequests.quantumEntanglementDating.paradoxAssistant.appearance;
paradoxAssistant.pages[0].image.characterIndex = level38_40_sidequests.quantumEntanglementDating.paradoxAssistant.index;

// Modify the dialogue for the Professor Paradox's Assistant
paradoxAssistant.pages[0].list = [
    {"code": 101, "indent": 0, "parameters": [level38_40_sidequests.quantumEntanglementDating.paradoxAssistant.appearance, level38_40_sidequests.quantumEntanglementDating.paradoxAssistant.index, 0, 2]},
    {"code": 401, "indent": 0, "parameters": [level38_40_sidequests.quantumEntanglementDating.paradoxAssistant.initialDialogue[0]]},
    {"code": 401, "indent": 0, "parameters": [level38_40_sidequests.quantumEntanglementDating.paradoxAssistant.initialDialogue[1]]},
    {"code": 401, "indent": 0, "parameters": [level38_40_sidequests.quantumEntanglementDating.paradoxAssistant.initialDialogue[2]]},
    {"code": 101, "indent": 0, "parameters": [level38_40_sidequests.quantumEntanglementDating.paradoxAssistant.appearance, level38_40_sidequests.quantumEntanglementDating.paradoxAssistant.index, 0, 2]},
    {"code": 401, "indent": 0, "parameters": [level38_40_sidequests.quantumEntanglementDating.paradoxAssistant.initialDialogue[3]]},
    {"code": 401, "indent": 0, "parameters": [level38_40_sidequests.quantumEntanglementDating.paradoxAssistant.initialDialogue[4]]},
    {"code": 401, "indent": 0, "parameters": [level38_40_sidequests.quantumEntanglementDating.paradoxAssistant.initialDialogue[5]]},
    {"code": 102, "indent": 0, "parameters": [["Help disentangle clients", "Report to Professor Paradox"], 1]},
    {"code": 402, "indent": 0, "parameters": [0, "Help disentangle clients"]},
    {"code": 121, "indent": 1, "parameters": [56, 56, 0]}, // Turn on switch 56 (Quantum Entanglement Dating quest)
    {"code": 101, "indent": 1, "parameters": [level38_40_sidequests.quantumEntanglementDating.paradoxAssistant.appearance, level38_40_sidequests.quantumEntanglementDating.paradoxAssistant.index, 0, 2]},
    {"code": 401, "indent": 1, "parameters": [level38_40_sidequests.quantumEntanglementDating.paradoxAssistant.questDialogue[0]]},
    {"code": 401, "indent": 1, "parameters": [level38_40_sidequests.quantumEntanglementDating.paradoxAssistant.questDialogue[1]]},
    {"code": 401, "indent": 1, "parameters": [level38_40_sidequests.quantumEntanglementDating.paradoxAssistant.questDialogue[2]]},
    {"code": 101, "indent": 1, "parameters": [level38_40_sidequests.quantumEntanglementDating.paradoxAssistant.appearance, level38_40_sidequests.quantumEntanglementDating.paradoxAssistant.index, 0, 2]},
    {"code": 401, "indent": 1, "parameters": [level38_40_sidequests.quantumEntanglementDating.paradoxAssistant.questDialogue[3]]},
    {"code": 401, "indent": 1, "parameters": [level38_40_sidequests.quantumEntanglementDating.paradoxAssistant.questDialogue[4]]},
    {"code": 401, "indent": 1, "parameters": [level38_40_sidequests.quantumEntanglementDating.paradoxAssistant.questDialogue[5]]},
    {"code": 401, "indent": 1, "parameters": [level38_40_sidequests.quantumEntanglementDating.paradoxAssistant.questDialogue[6]]},
    {"code": 101, "indent": 1, "parameters": [level38_40_sidequests.quantumEntanglementDating.paradoxAssistant.appearance, level38_40_sidequests.quantumEntanglementDating.paradoxAssistant.index, 0, 2]},
    {"code": 401, "indent": 1, "parameters": [level38_40_sidequests.quantumEntanglementDating.paradoxAssistant.questDialogue[7]]},
    {"code": 401, "indent": 1, "parameters": [level38_40_sidequests.quantumEntanglementDating.paradoxAssistant.questDialogue[8]]},
    {"code": 401, "indent": 1, "parameters": [level38_40_sidequests.quantumEntanglementDating.paradoxAssistant.questDialogue[9]]},
    {"code": 0, "indent": 1, "parameters": []},
    {"code": 402, "indent": 0, "parameters": [1, "Report to Professor Paradox"]},
    {"code": 101, "indent": 1, "parameters": [level38_40_sidequests.quantumEntanglementDating.paradoxAssistant.appearance, level38_40_sidequests.quantumEntanglementDating.paradoxAssistant.index, 0, 2]},
    {"code": 401, "indent": 1, "parameters": ["No! Please don't! I'll lose my research position!"]},
    {"code": 401, "indent": 1, "parameters": ["Look, I promise it's all under control. Just..."]},
    {"code": 401, "indent": 1, "parameters": ["give me a chance to fix this myself, okay?"]},
    {"code": 0, "indent": 1, "parameters": []},
    {"code": 0, "indent": 0, "parameters": []}
];

// Create event files
const corruptedMaintenanceAIPath = createEventFile(corruptedMaintenanceAI, 'corrupted_maintenance_ai.json');
const memoryTerminal1Path = createEventFile(memoryTerminal1, 'memory_terminal1.json');
const paradoxAssistantPath = createEventFile(paradoxAssistant, 'paradox_assistant.json');

console.log('Event files created successfully!');
console.log('');
console.log('To add these events to the game, use the batch-edit-tool.js and select option 4 (Add event to multiple maps).');
console.log('');
console.log('For "The Frozen Melody" side quest (Map047.json - Snowy Village):');
console.log(`- Add ${nostalgicMusicianPath}`);
console.log(`- Add ${frozenInstrumentPath}`);
console.log(`- Add ${warmingHerb1Path}`);
console.log(`- Add ${villageAlchemistPath}`);
console.log('');
console.log('For "Memory Lane Maintenance" side quest (Map104.json - Abandoned Space Station):');
console.log(`- Add ${corruptedMaintenanceAIPath}`);
console.log(`- Add ${memoryTerminal1Path}`);
console.log('');
console.log('For "Quantum Entanglement Dating Service" side quest (Map110.json - Quantum Dynamics Facility):');
console.log(`- Add ${paradoxAssistantPath}`);
