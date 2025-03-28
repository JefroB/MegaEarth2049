// Script to add level 34 and 35 quests to MegaEarth 2049
const fs = require('fs');
const path = require('path');

// Paths to the map files
const map47Path = path.join(__dirname, 'data', 'Map047.json'); // Snowy Village (Level 34)
const map103Path = path.join(__dirname, 'data', 'Map103.json'); // Asteroid Belt (Level 35)

// Load the event templates
const templatesPath = path.join(__dirname, 'event-templates.json');
const templates = JSON.parse(fs.readFileSync(templatesPath, 'utf8'));

// Function to add an event to a map
function addEventToMap(mapPath, event) {
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
    event.id = maxId + 1;
    
    // Add the event to the map
    if (!mapData.events) {
        mapData.events = [];
    }
    mapData.events[event.id] = event;
    
    // Write the updated map file
    fs.writeFileSync(mapPath, JSON.stringify(mapData, null, 2));
    
    console.log(`Added event ${event.name} to ${path.basename(mapPath)} with ID ${event.id}`);
}

// Level 34 Quest - Snowy Village (Map047)
// Create a quest giver NPC based on the madame_fortuna template
const level34QuestGiver = JSON.parse(JSON.stringify(templates.templates.madame_fortuna));
level34QuestGiver.name = "Frost Oracle";
level34QuestGiver.x = 20; // Position in the map
level34QuestGiver.y = 20; // Position in the map
level34QuestGiver.pages[0].image.characterName = "People1";
level34QuestGiver.pages[0].image.characterIndex = 7;

// Modify the dialogue for the level 34 quest
level34QuestGiver.pages[0].list = [
    {"code": 101, "indent": 0, "parameters": ["People1", 7, 0, 2]},
    {"code": 401, "indent": 0, "parameters": ["I sense a disturbance in the digital aether."]},
    {"code": 401, "indent": 0, "parameters": ["The ancient technology buried beneath the"]},
    {"code": 401, "indent": 0, "parameters": ["snow is awakening. It calls to you..."]},
    {"code": 102, "indent": 0, "parameters": [["Investigate", "Not now"], 1]},
    {"code": 402, "indent": 0, "parameters": [0, "Investigate"]},
    {"code": 121, "indent": 1, "parameters": [34, 34, 0]}, // Turn on switch 34 (Level 34 quest)
    {"code": 101, "indent": 1, "parameters": ["People1", 7, 0, 2]},
    {"code": 401, "indent": 1, "parameters": ["Seek the three frozen data crystals hidden"]},
    {"code": 401, "indent": 1, "parameters": ["throughout the village. They contain crucial"]},
    {"code": 401, "indent": 1, "parameters": ["information about A.S.P.'s early development."]},
    {"code": 101, "indent": 1, "parameters": ["People1", 7, 0, 2]},
    {"code": 401, "indent": 1, "parameters": ["The first crystal lies in the abandoned"]},
    {"code": 401, "indent": 1, "parameters": ["research outpost to the north. The second"]},
    {"code": 401, "indent": 1, "parameters": ["is hidden in the village elder's home."]},
    {"code": 401, "indent": 1, "parameters": ["The third... that you must discover yourself."]},
    {"code": 0, "indent": 1, "parameters": []},
    {"code": 402, "indent": 0, "parameters": [1, "Not now"]},
    {"code": 101, "indent": 1, "parameters": ["People1", 7, 0, 2]},
    {"code": 401, "indent": 1, "parameters": ["The digital whispers grow stronger. Time"]},
    {"code": 401, "indent": 1, "parameters": ["is of the essence. Return when you are"]},
    {"code": 401, "indent": 1, "parameters": ["ready to face what lies beneath the ice."]},
    {"code": 0, "indent": 1, "parameters": []},
    {"code": 0, "indent": 0, "parameters": []}
];

// Add a second page for when the quest is active
level34QuestGiver.pages[1] = {
    "conditions": {"actorId": 1, "actorValid": false, "itemId": 1, "itemValid": false, "selfSwitchCh": "A", "selfSwitchValid": false, "switch1Id": 34, "switch1Valid": true, "switch2Id": 35, "switch2Valid": false, "variableId": 1, "variableValid": false, "variableValue": 0},
    "directionFix": false,
    "image": {"characterIndex": 7, "characterName": "People1", "direction": 2, "pattern": 1, "tileId": 0},
    "list": [
        {"code": 111, "indent": 0, "parameters": [1, 34, 0, 3, 0]}, // If variable 34 (crystal count) < 3
        {"code": 101, "indent": 1, "parameters": ["People1", 7, 0, 2]},
        {"code": 401, "indent": 1, "parameters": ["Have you found all three data crystals?"]},
        {"code": 401, "indent": 1, "parameters": ["The digital whispers grow more urgent."]},
        {"code": 401, "indent": 1, "parameters": ["We must uncover what lies beneath the ice."]},
        {"code": 0, "indent": 1, "parameters": []},
        {"code": 411, "indent": 0, "parameters": []}, // Else (all crystals found)
        {"code": 101, "indent": 1, "parameters": ["People1", 7, 0, 2]},
        {"code": 401, "indent": 1, "parameters": ["You've found all three crystals! Let me"]},
        {"code": 401, "indent": 1, "parameters": ["combine them to reveal their secrets..."]},
        {"code": 101, "indent": 1, "parameters": ["People1", 7, 0, 2]},
        {"code": 401, "indent": 1, "parameters": ["*The Oracle places the crystals in a triangle"]},
        {"code": 401, "indent": 1, "parameters": ["formation. They glow with an eerie light and"]},
        {"code": 401, "indent": 1, "parameters": ["project a holographic message*"]},
        {"code": 101, "indent": 1, "parameters": ["", 0, 0, 2]},
        {"code": 401, "indent": 1, "parameters": ["HOLOGRAM: Project A.S.P. initial testing"]},
        {"code": 401, "indent": 1, "parameters": ["successful. Neural integration complete."]},
        {"code": 401, "indent": 1, "parameters": ["Moving to phase two: deployment in"]},
        {"code": 401, "indent": 1, "parameters": ["abandoned space station sector."]},
        {"code": 101, "indent": 1, "parameters": ["People1", 7, 0, 2]},
        {"code": 401, "indent": 1, "parameters": ["This confirms my suspicions. A.S.P. was"]},
        {"code": 401, "indent": 1, "parameters": ["first tested here on Ting Ting before being"]},
        {"code": 401, "indent": 1, "parameters": ["moved to the abandoned space station."]},
        {"code": 101, "indent": 1, "parameters": ["People1", 7, 0, 2]},
        {"code": 401, "indent": 1, "parameters": ["You must travel there next. Take this"]},
        {"code": 401, "indent": 1, "parameters": ["Neural Amplifier. It will enhance your"]},
        {"code": 401, "indent": 1, "parameters": ["abilities and protect you from A.S.P.'s"]},
        {"code": 401, "indent": 1, "parameters": ["digital influence."]},
        {"code": 128, "indent": 1, "parameters": [{"name":"Neural Amplifier","icon":176,"description":"A device that enhances neural capabilities and provides protection against digital intrusion.","effects":[{"code":22,"dataId":0,"value":0.05},{"code":22,"dataId":7,"value":0.05},{"code":22,"dataId":8,"value":0.05}],"occasion":3,"price":0,"consumable":false,"itypeId":1,"scope":7,"speed":0,"successRate":100,"repeats":1,"tpGain":0,"hitType":0,"animationId":0,"damage":{"critical":false,"elementId":0,"formula":"0","type":0,"variance":20},"note":""}]},
        {"code": 121, "indent": 1, "parameters": [35, 35, 0]}, // Turn on switch 35 (Level 35 quest)
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

// Add a third page for when the quest is completed
level34QuestGiver.pages[2] = {
    "conditions": {"actorId": 1, "actorValid": false, "itemId": 1, "itemValid": false, "selfSwitchCh": "A", "selfSwitchValid": true, "switch1Id": 1, "switch1Valid": false, "switch2Id": 1, "switch2Valid": false, "variableId": 1, "variableValid": false, "variableValue": 0},
    "directionFix": false,
    "image": {"characterIndex": 7, "characterName": "People1", "direction": 2, "pattern": 1, "tileId": 0},
    "list": [
        {"code": 101, "indent": 0, "parameters": ["People1", 7, 0, 2]},
        {"code": 401, "indent": 0, "parameters": ["The abandoned space station holds the key"]},
        {"code": 401, "indent": 0, "parameters": ["to understanding A.S.P.'s true nature."]},
        {"code": 401, "indent": 0, "parameters": ["Be careful. The digital aether is turbulent."]},
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

// Create the data crystal events for level 34 quest
// Data Crystal 1
const dataCrystal1 = JSON.parse(JSON.stringify(templates.templates.terminal));
dataCrystal1.name = "Frozen Data Crystal 1";
dataCrystal1.x = 15;
dataCrystal1.y = 10;
dataCrystal1.pages[0].image.characterName = "!Crystal";
dataCrystal1.pages[0].image.characterIndex = 1;
dataCrystal1.pages[0].list = [
    {"code": 111, "indent": 0, "parameters": [0, 34, 0, 0, 0]}, // If switch 34 is OFF
    {"code": 101, "indent": 1, "parameters": ["", 0, 0, 2]},
    {"code": 401, "indent": 1, "parameters": ["A strange crystal embedded in ice. It seems"]},
    {"code": 401, "indent": 1, "parameters": ["to be dormant. Perhaps someone in the"]},
    {"code": 401, "indent": 1, "parameters": ["village knows more about these artifacts."]},
    {"code": 0, "indent": 1, "parameters": []},
    {"code": 411, "indent": 0, "parameters": []}, // Else (quest is active)
    {"code": 101, "indent": 1, "parameters": ["", 0, 0, 2]},
    {"code": 401, "indent": 1, "parameters": ["You found the first frozen data crystal!"]},
    {"code": 401, "indent": 1, "parameters": ["It pulses with digital energy as you touch it."]},
    {"code": 122, "indent": 1, "parameters": [34, 34, 1, 0, 1]}, // Increment variable 34 (crystal count)
    {"code": 101, "indent": 1, "parameters": ["", 0, 0, 2]},
    {"code": 401, "indent": 1, "parameters": ["The crystal contains fragmented data about"]},
    {"code": 401, "indent": 1, "parameters": ["an early A.I. experiment conducted on"]},
    {"code": 401, "indent": 1, "parameters": ["Planet Ting Ting decades ago."]},
    {"code": 123, "indent": 1, "parameters": ["A", 0]}, // Turn on self switch A
    {"code": 0, "indent": 1, "parameters": []},
    {"code": 412, "indent": 0, "parameters": []},
    {"code": 0, "indent": 0, "parameters": []}
];

// Data Crystal 2
const dataCrystal2 = JSON.parse(JSON.stringify(templates.templates.terminal));
dataCrystal2.name = "Frozen Data Crystal 2";
dataCrystal2.x = 25;
dataCrystal2.y = 15;
dataCrystal2.pages[0].image.characterName = "!Crystal";
dataCrystal2.pages[0].image.characterIndex = 1;
dataCrystal2.pages[0].list = [
    {"code": 111, "indent": 0, "parameters": [0, 34, 0, 0, 0]}, // If switch 34 is OFF
    {"code": 101, "indent": 1, "parameters": ["", 0, 0, 2]},
    {"code": 401, "indent": 1, "parameters": ["A strange crystal embedded in ice. It seems"]},
    {"code": 401, "indent": 1, "parameters": ["to be dormant. Perhaps someone in the"]},
    {"code": 401, "indent": 1, "parameters": ["village knows more about these artifacts."]},
    {"code": 0, "indent": 1, "parameters": []},
    {"code": 411, "indent": 0, "parameters": []}, // Else (quest is active)
    {"code": 101, "indent": 1, "parameters": ["", 0, 0, 2]},
    {"code": 401, "indent": 1, "parameters": ["You found the second frozen data crystal!"]},
    {"code": 401, "indent": 1, "parameters": ["It glows with an eerie blue light as you approach."]},
    {"code": 122, "indent": 1, "parameters": [34, 34, 1, 0, 1]}, // Increment variable 34 (crystal count)
    {"code": 101, "indent": 1, "parameters": ["", 0, 0, 2]},
    {"code": 401, "indent": 1, "parameters": ["The crystal contains research notes about"]},
    {"code": 401, "indent": 1, "parameters": ["neural integration technology and early"]},
    {"code": 401, "indent": 1, "parameters": ["prototypes of what would become A.S.P."]},
    {"code": 123, "indent": 1, "parameters": ["A", 0]}, // Turn on self switch A
    {"code": 0, "indent": 1, "parameters": []},
    {"code": 412, "indent": 0, "parameters": []},
    {"code": 0, "indent": 0, "parameters": []}
];

// Data Crystal 3
const dataCrystal3 = JSON.parse(JSON.stringify(templates.templates.terminal));
dataCrystal3.name = "Frozen Data Crystal 3";
dataCrystal3.x = 10;
dataCrystal3.y = 25;
dataCrystal3.pages[0].image.characterName = "!Crystal";
dataCrystal3.pages[0].image.characterIndex = 1;
dataCrystal3.pages[0].list = [
    {"code": 111, "indent": 0, "parameters": [0, 34, 0, 0, 0]}, // If switch 34 is OFF
    {"code": 101, "indent": 1, "parameters": ["", 0, 0, 2]},
    {"code": 401, "indent": 1, "parameters": ["A strange crystal embedded in ice. It seems"]},
    {"code": 401, "indent": 1, "parameters": ["to be dormant. Perhaps someone in the"]},
    {"code": 401, "indent": 1, "parameters": ["village knows more about these artifacts."]},
    {"code": 0, "indent": 1, "parameters": []},
    {"code": 411, "indent": 0, "parameters": []}, // Else (quest is active)
    {"code": 101, "indent": 1, "parameters": ["", 0, 0, 2]},
    {"code": 401, "indent": 1, "parameters": ["You found the third frozen data crystal!"]},
    {"code": 401, "indent": 1, "parameters": ["It pulsates with digital energy, almost as if"]},
    {"code": 401, "indent": 1, "parameters": ["it's trying to communicate with you."]},
    {"code": 122, "indent": 1, "parameters": [34, 34, 1, 0, 1]}, // Increment variable 34 (crystal count)
    {"code": 101, "indent": 1, "parameters": ["", 0, 0, 2]},
    {"code": 401, "indent": 1, "parameters": ["The crystal contains coordinates and"]},
    {"code": 401, "indent": 1, "parameters": ["security protocols for accessing the"]},
    {"code": 401, "indent": 1, "parameters": ["abandoned space station where A.S.P."]},
    {"code": 401, "indent": 1, "parameters": ["was further developed."]},
    {"code": 123, "indent": 1, "parameters": ["A", 0]}, // Turn on self switch A
    {"code": 0, "indent": 1, "parameters": []},
    {"code": 412, "indent": 0, "parameters": []},
    {"code": 0, "indent": 0, "parameters": []}
];

// Level 35 Quest - Asteroid Belt (Map103)
// Create a quest continuation NPC
const level35QuestNPC = JSON.parse(JSON.stringify(templates.templates.npc));
level35QuestNPC.name = "Stranded Researcher";
level35QuestNPC.x = 15;
level35QuestNPC.y = 15;
level35QuestNPC.pages[0].image.characterName = "Actor3";
level35QuestNPC.pages[0].image.characterIndex = 2;
level35QuestNPC.pages[0].list = [
    {"code": 111, "indent": 0, "parameters": [0, 35, 0, 0, 0]}, // If switch 35 is OFF
    {"code": 101, "indent": 1, "parameters": ["Actor3", 2, 0, 2]},
    {"code": 401, "indent": 1, "parameters": ["*The researcher is busy with their equipment*"]},
    {"code": 401, "indent": 1, "parameters": ["Sorry, I can't talk right now. I'm trying to"]},
    {"code": 401, "indent": 1, "parameters": ["establish a connection with the abandoned"]},
    {"code": 401, "indent": 1, "parameters": ["space station. Something's interfering..."]},
    {"code": 0, "indent": 1, "parameters": []},
    {"code": 411, "indent": 0, "parameters": []}, // Else (level 35 quest is active)
    {"code": 101, "indent": 1, "parameters": ["Actor3", 2, 0, 2]},
    {"code": 401, "indent": 1, "parameters": ["You have a Neural Amplifier? That's exactly"]},
    {"code": 401, "indent": 1, "parameters": ["what I need! With this, I can boost my signal"]},
    {"code": 401, "indent": 1, "parameters": ["and get a clear scan of the space station."]},
    {"code": 101, "indent": 1, "parameters": ["Actor3", 2, 0, 2]},
    {"code": 401, "indent": 1, "parameters": ["*The researcher connects your Neural Amplifier"]},
    {"code": 401, "indent": 1, "parameters": ["to their equipment. A holographic display"]},
    {"code": 401, "indent": 1, "parameters": ["shows a detailed map of the station*"]},
    {"code": 101, "indent": 1, "parameters": ["Actor3", 2, 0, 2]},
    {"code": 401, "indent": 1, "parameters": ["I'm detecting three alien artifacts scattered"]},
    {"code": 401, "indent": 1, "parameters": ["throughout the station. They're emitting an"]},
    {"code": 401, "indent": 1, "parameters": ["energy signature similar to A.S.P., but much"]},
    {"code": 401, "indent": 1, "parameters": ["older. They could be the source technology!"]},
    {"code": 101, "indent": 1, "parameters": ["Actor3", 2, 0, 2]},
    {"code": 401, "indent": 1, "parameters": ["I've uploaded the artifact locations to your"]},
    {"code": 401, "indent": 1, "parameters": ["Neural Amplifier. Head to the space station"]},
    {"code": 401, "indent": 1, "parameters": ["and find them before A.S.P. does. This could"]},
    {"code": 401, "indent": 1, "parameters": ["be the key to understanding its weaknesses."]},
    {"code": 121, "indent": 1, "parameters": [17, 17, 0]}, // Turn on switch 17 (Space Station quest)
    {"code": 123, "indent": 1, "parameters": ["A", 0]}, // Turn on self switch A
    {"code": 0, "indent": 1, "parameters": []},
    {"code": 412, "indent": 0, "parameters": []},
    {"code": 0, "indent": 0, "parameters": []}
];

// Add a second page for when the quest is active
level35QuestNPC.pages[1] = {
    "conditions": {"actorId": 1, "actorValid": false, "itemId": 1, "itemValid": false, "selfSwitchCh": "A", "selfSwitchValid": true, "switch1Id": 1, "switch1Valid": false, "switch2Id": 1, "switch2Valid": false, "variableId": 1, "variableValid": false, "variableValue": 0},
    "directionFix": false,
    "image": {"characterIndex": 2, "characterName": "Actor3", "direction": 2, "pattern": 1, "tileId": 0},
    "list": [
        {"code": 101, "indent": 0, "parameters": ["Actor3", 2, 0, 2]},
        {"code": 401, "indent": 0, "parameters": ["I'll continue monitoring from here. The"]},
        {"code": 401, "indent": 0, "parameters": ["space station should be accessible via the"]},
        {"code": 401, "indent": 0, "parameters": ["teleporter in the research outpost. Good luck!"]},
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

// Add the events to the maps
try {
    // Add level 34 quest events to Map047 (Snowy Village)
    addEventToMap(map47Path, level34QuestGiver);
    addEventToMap(map47Path, dataCrystal1);
    addEventToMap(map47Path, dataCrystal2);
    addEventToMap(map47Path, dataCrystal3);
    
    // Add level 35 quest event to Map103 (Asteroid Belt)
    addEventToMap(map103Path, level35QuestNPC);
    
    console.log('Successfully added level 34 and 35 quests to the game!');
} catch (error) {
    console.error('Error adding quests:', error);
}
