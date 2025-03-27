// Script to add optional quest lines to MegaEarth 2049
const fs = require('fs');
const path = require('path');

// Load the event templates
const templatesPath = path.join(__dirname, 'event-templates.json');
const templates = JSON.parse(fs.readFileSync(templatesPath, 'utf8'));

// Load the optional quest lines
const optionalQuestLines = require('./optional_quest_lines.js');

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

// Function to create an NPC event
function createNPC(npcData, questLine, questName) {
    const npc = JSON.parse(JSON.stringify(templates.templates.npc));
    npc.name = npcData.name;
    npc.x = npcData.x;
    npc.y = npcData.y;
    npc.pages[0].image.characterName = npcData.appearance;
    npc.pages[0].image.characterIndex = npcData.index;
    
    // Create dialogue list
    const dialogueList = [];
    
    // Add initial message with character appearance
    dialogueList.push({"code": 101, "indent": 0, "parameters": [npcData.appearance, npcData.index, 0, 2]});
    
    // Add dialogue lines
    for (const line of npcData.dialogue) {
        dialogueList.push({"code": 401, "indent": 0, "parameters": [line]});
    }
    
    // Add quest acceptance choice
    dialogueList.push({"code": 102, "indent": 0, "parameters": [["Accept quest", "Not now"], 1]});
    
    // Accept quest branch
    dialogueList.push({"code": 402, "indent": 0, "parameters": [0, "Accept quest"]});
    
    // Set quest switch (using a unique switch ID based on quest line and quest)
    const switchId = getSwitchId(questLine, questName, "started");
    dialogueList.push({"code": 121, "indent": 1, "parameters": [switchId, switchId, 0]});
    
    // Add quest acceptance dialogue
    dialogueList.push({"code": 101, "indent": 1, "parameters": [npcData.appearance, npcData.index, 0, 2]});
    dialogueList.push({"code": 401, "indent": 1, "parameters": ["Great! I'll mark the details in your neural log."]});
    dialogueList.push({"code": 401, "indent": 1, "parameters": ["Come back when you've completed the task."]});
    dialogueList.push({"code": 0, "indent": 1, "parameters": []});
    
    // Decline quest branch
    dialogueList.push({"code": 402, "indent": 0, "parameters": [1, "Not now"]});
    dialogueList.push({"code": 101, "indent": 1, "parameters": [npcData.appearance, npcData.index, 0, 2]});
    dialogueList.push({"code": 401, "indent": 1, "parameters": ["I understand. Come back if you change your mind."]});
    dialogueList.push({"code": 0, "indent": 1, "parameters": []});
    
    // End choice
    dialogueList.push({"code": 0, "indent": 0, "parameters": []});
    
    npc.pages[0].list = dialogueList;
    
    // Add a second page for when the quest is active
    npc.pages[1] = {
        "conditions": {
            "actorId": 1, 
            "actorValid": false, 
            "itemId": 1, 
            "itemValid": false, 
            "selfSwitchCh": "A", 
            "selfSwitchValid": false, 
            "switch1Id": switchId, 
            "switch1Valid": true, 
            "switch2Id": getSwitchId(questLine, questName, "completed"), 
            "switch2Valid": false, 
            "variableId": 1, 
            "variableValid": false, 
            "variableValue": 0
        },
        "directionFix": false,
        "image": {
            "characterIndex": npcData.index, 
            "characterName": npcData.appearance, 
            "direction": 2, 
            "pattern": 1, 
            "tileId": 0
        },
        "list": [
            {"code": 101, "indent": 0, "parameters": [npcData.appearance, npcData.index, 0, 2]},
            {"code": 401, "indent": 0, "parameters": ["Have you completed the task yet?"]},
            {"code": 401, "indent": 0, "parameters": ["I'm counting on you!"]},
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
    
    // Add a third page for quest completion
    npc.pages[2] = {
        "conditions": {
            "actorId": 1, 
            "actorValid": false, 
            "itemId": 1, 
            "itemValid": false, 
            "selfSwitchCh": "A", 
            "selfSwitchValid": false, 
            "switch1Id": getSwitchId(questLine, questName, "objectives_complete"), 
            "switch1Valid": true, 
            "switch2Id": getSwitchId(questLine, questName, "completed"), 
            "switch2Valid": false, 
            "variableId": 1, 
            "variableValid": false, 
            "variableValue": 0
        },
        "directionFix": false,
        "image": {
            "characterIndex": npcData.index, 
            "characterName": npcData.appearance, 
            "direction": 2, 
            "pattern": 1, 
            "tileId": 0
        },
        "list": [
            {"code": 101, "indent": 0, "parameters": [npcData.appearance, npcData.index, 0, 2]},
            {"code": 401, "indent": 0, "parameters": ["You've done it! Excellent work!"]},
            {"code": 101, "indent": 0, "parameters": [npcData.appearance, npcData.index, 0, 2]},
            {"code": 401, "indent": 0, "parameters": ["Here's your reward as promised."]},
            // Give reward item
            {"code": 128, "indent": 0, "parameters": [{
                "name": questName + " Reward",
                "icon": 176,
                "description": "A reward for completing the " + questName + " quest.",
                "effects": [{"code": 21, "dataId": 0, "value": 5}],
                "occasion": 3,
                "price": 0,
                "consumable": false,
                "itypeId": 1,
                "scope": 7,
                "speed": 0,
                "successRate": 100,
                "repeats": 1,
                "tpGain": 0,
                "hitType": 0,
                "animationId": 0,
                "damage": {"critical": false, "elementId": 0, "formula": "0", "type": 0, "variance": 20},
                "note": ""
            }]},
            // Set quest completed switch
            {"code": 121, "indent": 0, "parameters": [getSwitchId(questLine, questName, "completed"), getSwitchId(questLine, questName, "completed"), 0]},
            // Set self switch for post-quest dialogue
            {"code": 123, "indent": 0, "parameters": ["A", 0]},
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
    
    // Add a fourth page for after quest completion
    npc.pages[3] = {
        "conditions": {
            "actorId": 1, 
            "actorValid": false, 
            "itemId": 1, 
            "itemValid": false, 
            "selfSwitchCh": "A", 
            "selfSwitchValid": true, 
            "switch1Id": 1, 
            "switch1Valid": false, 
            "switch2Id": 1, 
            "switch2Valid": false, 
            "variableId": 1, 
            "variableValid": false, 
            "variableValue": 0
        },
        "directionFix": false,
        "image": {
            "characterIndex": npcData.index, 
            "characterName": npcData.appearance, 
            "direction": 2, 
            "pattern": 1, 
            "tileId": 0
        },
        "list": [
            {"code": 101, "indent": 0, "parameters": [npcData.appearance, npcData.index, 0, 2]},
            {"code": 401, "indent": 0, "parameters": ["Thanks again for your help!"]},
            {"code": 401, "indent": 0, "parameters": ["Your assistance has been invaluable."]},
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
    
    return npc;
}

// Function to create an objective event
function createObjective(objectiveData, questLine, questName, objectiveIndex) {
    const objective = JSON.parse(JSON.stringify(templates.templates.chest));
    objective.name = "Objective " + (objectiveIndex + 1);
    objective.x = 10 + objectiveIndex * 2; // Placeholder position
    objective.y = 10 + objectiveIndex; // Placeholder position
    
    // Create dialogue list
    const dialogueList = [];
    
    // Add initial message
    dialogueList.push({"code": 101, "indent": 0, "parameters": ["", 0, 0, 2]});
    dialogueList.push({"code": 401, "indent": 0, "parameters": ["Objective " + (objectiveIndex + 1) + ": " + objectiveData]});
    
    // Check if quest is active
    dialogueList.push({"code": 111, "indent": 0, "parameters": [0, getSwitchId(questLine, questName, "started"), 0, 0, 0]});
    dialogueList.push({"code": 101, "indent": 1, "parameters": ["", 0, 0, 2]});
    dialogueList.push({"code": 401, "indent": 1, "parameters": ["You need to start the quest first."]});
    dialogueList.push({"code": 0, "indent": 1, "parameters": []});
    
    // If quest is active
    dialogueList.push({"code": 411, "indent": 0, "parameters": []});
    
    // Check if objective is already completed
    dialogueList.push({"code": 111, "indent": 1, "parameters": [0, getSwitchId(questLine, questName, "objective_" + objectiveIndex), 0, 0, 0]});
    
    // If not completed, complete it
    dialogueList.push({"code": 101, "indent": 2, "parameters": ["", 0, 0, 2]});
    dialogueList.push({"code": 401, "indent": 2, "parameters": ["Objective completed!"]});
    dialogueList.push({"code": 121, "indent": 2, "parameters": [getSwitchId(questLine, questName, "objective_" + objectiveIndex), getSwitchId(questLine, questName, "objective_" + objectiveIndex), 0]});
    
    // Increment objective counter
    dialogueList.push({"code": 122, "indent": 2, "parameters": [getVariableId(questLine, questName, "objectives_count"), getVariableId(questLine, questName, "objectives_count"), 1, 0, 1]});
    
    // Check if all objectives are completed
    dialogueList.push({"code": 111, "indent": 2, "parameters": [1, getVariableId(questLine, questName, "objectives_count"), 0, objectiveData.length, 0]});
    dialogueList.push({"code": 121, "indent": 3, "parameters": [getSwitchId(questLine, questName, "objectives_complete"), getSwitchId(questLine, questName, "objectives_complete"), 0]});
    dialogueList.push({"code": 101, "indent": 3, "parameters": ["", 0, 0, 2]});
    dialogueList.push({"code": 401, "indent": 3, "parameters": ["All objectives completed! Return to the quest giver."]});
    dialogueList.push({"code": 0, "indent": 3, "parameters": []});
    dialogueList.push({"code": 412, "indent": 2, "parameters": []});
    
    // Set self switch to prevent repeated interaction
    dialogueList.push({"code": 123, "indent": 2, "parameters": ["A", 0]});
    dialogueList.push({"code": 0, "indent": 2, "parameters": []});
    
    // If already completed
    dialogueList.push({"code": 411, "indent": 1, "parameters": []});
    dialogueList.push({"code": 101, "indent": 2, "parameters": ["", 0, 0, 2]});
    dialogueList.push({"code": 401, "indent": 2, "parameters": ["You've already completed this objective."]});
    dialogueList.push({"code": 0, "indent": 2, "parameters": []});
    dialogueList.push({"code": 412, "indent": 1, "parameters": []});
    
    dialogueList.push({"code": 0, "indent": 1, "parameters": []});
    dialogueList.push({"code": 412, "indent": 0, "parameters": []});
    dialogueList.push({"code": 0, "indent": 0, "parameters": []});
    
    objective.pages[0].list = dialogueList;
    
    // Add a second page for when the objective is completed
    objective.pages[1] = {
        "conditions": {
            "actorId": 1, 
            "actorValid": false, 
            "itemId": 1, 
            "itemValid": false, 
            "selfSwitchCh": "A", 
            "selfSwitchValid": true, 
            "switch1Id": 1, 
            "switch1Valid": false, 
            "switch2Id": 1, 
            "switch2Valid": false, 
            "variableId": 1, 
            "variableValid": false, 
            "variableValue": 0
        },
        "directionFix": false,
        "image": {
            "characterIndex": 0, 
            "characterName": "", 
            "direction": 2, 
            "pattern": 1, 
            "tileId": 0
        },
        "list": [
            {"code": 101, "indent": 0, "parameters": ["", 0, 0, 2]},
            {"code": 401, "indent": 0, "parameters": ["Objective completed."]},
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
    
    return objective;
}

// Function to create a quest line completion event
function createQuestLineCompletion(questLine) {
    const completion = JSON.parse(JSON.stringify(templates.templates.npc));
    completion.name = questLine.name + " Completion";
    completion.x = 15; // Placeholder position
    completion.y = 15; // Placeholder position
    
    // Use the same NPC as the starting NPC
    completion.pages[0].image.characterName = questLine.startingNPC.appearance;
    completion.pages[0].image.characterIndex = questLine.startingNPC.index;
    
    // Create dialogue list
    const dialogueList = [];
    
    // Add initial message with character appearance
    dialogueList.push({"code": 101, "indent": 0, "parameters": [questLine.startingNPC.appearance, questLine.startingNPC.index, 0, 2]});
    dialogueList.push({"code": 401, "indent": 0, "parameters": ["Congratulations on completing all the quests in this quest line!"]});
    dialogueList.push({"code": 101, "indent": 0, "parameters": [questLine.startingNPC.appearance, questLine.startingNPC.index, 0, 2]});
    dialogueList.push({"code": 401, "indent": 0, "parameters": ["Here is your final reward: " + questLine.finalReward.name]});
    dialogueList.push({"code": 401, "indent": 0, "parameters": [questLine.finalReward.description]});
    
    // Give final reward
    dialogueList.push({"code": 128, "indent": 0, "parameters": [{
        "name": questLine.finalReward.name,
        "icon": questLine.finalReward.icon,
        "description": questLine.finalReward.description,
        "effects": [{"code": 21, "dataId": 0, "value": 10}],
        "occasion": 3,
        "price": 0,
        "consumable": false,
        "itypeId": 1,
        "scope": 7,
        "speed": 0,
        "successRate": 100,
        "repeats": 1,
        "tpGain": 0,
        "hitType": 0,
        "animationId": 0,
        "damage": {"critical": false, "elementId": 0, "formula": "0", "type": 0, "variance": 20},
        "note": ""
    }]});
    
    // Set quest line completed switch
    dialogueList.push({"code": 121, "indent": 0, "parameters": [getQuestLineCompletionSwitchId(questLine.name), getQuestLineCompletionSwitchId(questLine.name), 0]});
    
    // Set self switch for post-completion dialogue
    dialogueList.push({"code": 123, "indent": 0, "parameters": ["A", 0]});
    dialogueList.push({"code": 0, "indent": 0, "parameters": []});
    
    completion.pages[0].list = dialogueList;
    
    // Add a second page for after quest line completion
    completion.pages[1] = {
        "conditions": {
            "actorId": 1, 
            "actorValid": false, 
            "itemId": 1, 
            "itemValid": false, 
            "selfSwitchCh": "A", 
            "selfSwitchValid": true, 
            "switch1Id": 1, 
            "switch1Valid": false, 
            "switch2Id": 1, 
            "switch2Valid": false, 
            "variableId": 1, 
            "variableValid": false, 
            "variableValue": 0
        },
        "directionFix": false,
        "image": {
            "characterIndex": questLine.startingNPC.index, 
            "characterName": questLine.startingNPC.appearance, 
            "direction": 2, 
            "pattern": 1, 
            "tileId": 0
        },
        "list": [
            {"code": 101, "indent": 0, "parameters": [questLine.startingNPC.appearance, questLine.startingNPC.index, 0, 2]},
            {"code": 401, "indent": 0, "parameters": ["You've mastered the " + questLine.name + " quest line!"]},
            {"code": 401, "indent": 0, "parameters": ["I hope you're enjoying your " + questLine.finalReward.name + "."]},
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
    
    return completion;
}

// Helper functions for switch and variable IDs
function getSwitchId(questLine, questName, suffix) {
    // This is a simple hash function to generate a unique switch ID
    // In a real implementation, you would use a more sophisticated approach
    const hash = (questLine.name + questName + suffix).split('').reduce((a, b) => {
        a = ((a << 5) - a) + b.charCodeAt(0);
        return a & a;
    }, 0);
    
    // Use a range of switch IDs that won't conflict with existing ones
    // For this example, we'll use 1000-2000
    return 1000 + (Math.abs(hash) % 1000);
}

function getVariableId(questLine, questName, suffix) {
    // Similar to getSwitchId, but for variables
    const hash = (questLine.name + questName + suffix).split('').reduce((a, b) => {
        a = ((a << 5) - a) + b.charCodeAt(0);
        return a & a;
    }, 0);
    
    // Use a range of variable IDs that won't conflict with existing ones
    // For this example, we'll use 1000-2000
    return 1000 + (Math.abs(hash) % 1000);
}

function getQuestLineCompletionSwitchId(questLineName) {
    // Generate a switch ID for quest line completion
    const hash = (questLineName + "completion").split('').reduce((a, b) => {
        a = ((a << 5) - a) + b.charCodeAt(0);
        return a & a;
    }, 0);
    
    // Use a range of switch IDs that won't conflict with existing ones
    // For this example, we'll use 2000-3000
    return 2000 + (Math.abs(hash) % 1000);
}

// Process each quest line
for (const [questLineName, questLine] of Object.entries(optionalQuestLines)) {
    console.log(`Processing "${questLine.name}" quest line...`);
    
    // Create the starting NPC
    const startingNPC = createNPC(questLine.startingNPC, questLine.name, "start");
    const startingNPCPath = createEventFile(startingNPC, `${questLineName}_starting_npc.json`);
    
    console.log(`Created starting NPC: ${startingNPCPath}`);
    
    // Process each side quest
    for (const [index, sideQuest] of questLine.sideQuests.entries()) {
        console.log(`  Processing "${sideQuest.name}" side quest...`);
        
        // Create objectives
        const objectivePaths = [];
        for (const [objIndex, objective] of sideQuest.objectives.entries()) {
            const objectiveEvent = createObjective(objective, questLine.name, sideQuest.name, objIndex);
            const objectivePath = createEventFile(objectiveEvent, `${questLineName}_${index}_objective_${objIndex}.json`);
            objectivePaths.push(objectivePath);
        }
        
        console.log(`  Created ${objectivePaths.length} objectives`);
    }
    
    // Create quest line completion event
    const completionEvent = createQuestLineCompletion(questLine);
    const completionPath = createEventFile(completionEvent, `${questLineName}_completion.json`);
    
    console.log(`Created quest line completion event: ${completionPath}`);
}

console.log('');
console.log('Event files created successfully!');
console.log('');
console.log('To add these events to the game, use the batch-edit-tool.js and select option 4 (Add event to multiple maps).');
console.log('');
console.log('Map recommendations for quest lines:');
console.log('- Digital Archaeology: Map022 (Neo-Tokyo Archives)');
console.log('- Corporate Espionage: Map035 (NeoCorps Plaza)');
console.log('- Cybernetic Enhancement: Map014 (Back Alley Clinic)');
console.log('- Virtual Reality Addiction: Map031 (Mindscape Clinic)');
console.log('- Culinary Wasteland: Map019 (Wasteland Diner)');
console.log('- Wasteland Radio: Map028 (Abandoned Radio Station)');
