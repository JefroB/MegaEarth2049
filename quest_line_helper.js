// Quest Line Helper Script for MegaEarth 2049
// This script guides you through creating and implementing quest lines

const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { execSync } = require('child_process');

// Create readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Helper function to prompt user for input
function prompt(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

// Helper function to prompt user for a list of items
async function promptList(question, count) {
  console.log(question);
  const items = [];
  for (let i = 0; i < count; i++) {
    const item = await prompt("  " + (i + 1) + ": ");
    items.push(item);
  }
  return items;
}

// Helper function to create a directory if it doesn't exist
function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log("Created directory: " + dirPath);
  }
}

// Generate a quest line template based on user input
async function generateQuestLineTemplate() {
  console.log("\n=== QUEST LINE CREATION ===\n");
  
  const questLine = {};
  
  questLine.name = await prompt("Quest Line Name: ");
  questLine.description = await prompt("Quest Line Description: ");
  
  // Starting NPC
  console.log("\n--- Starting NPC ---");
  questLine.startingNPC = {};
  questLine.startingNPC.name = await prompt("NPC Name: ");
  questLine.startingNPC.location = await prompt("NPC Location (e.g., 'Neo-Tokyo Archives (Map022)'): ");
  questLine.startingNPC.appearance = await prompt("NPC Appearance (e.g., 'People1', 'Actor2'): ");
  questLine.startingNPC.index = parseInt(await prompt("NPC Index (0-7): "), 10);
  questLine.startingNPC.x = parseInt(await prompt("NPC X Position: "), 10);
  questLine.startingNPC.y = parseInt(await prompt("NPC Y Position: "), 10);
  
  const dialogueCount = parseInt(await prompt("Number of dialogue lines: "), 10);
  questLine.startingNPC.dialogue = await promptList("Enter dialogue lines:", dialogueCount);
  
  // Side Quests
  const sideQuestCount = parseInt(await prompt("\nNumber of side quests (4-5 recommended): "), 10);
  questLine.sideQuests = [];
  
  for (let i = 0; i < sideQuestCount; i++) {
    console.log("\n--- Side Quest " + (i + 1) + " ---");
    const sideQuest = {};
    
    sideQuest.name = await prompt("Quest Name: ");
    sideQuest.description = await prompt("Quest Description: ");
    
    const objectiveCount = parseInt(await prompt("Number of objectives (3-5 recommended): "), 10);
    sideQuest.objectives = await promptList("Enter objectives:", objectiveCount);
    
    // Reward
    console.log("\n- Reward -");
    sideQuest.reward = {};
    sideQuest.reward.name = await prompt("Reward Name: ");
    sideQuest.reward.description = await prompt("Reward Description: ");
    sideQuest.reward.effect = await prompt("Reward Effect: ");
    sideQuest.reward.icon = parseInt(await prompt("Reward Icon ID: "), 10);
    
    sideQuest.humor = await prompt("Humorous Element: ");
    
    questLine.sideQuests.push(sideQuest);
  }
  
  // Final Reward
  console.log("\n--- Final Reward ---");
  questLine.finalReward = {};
  questLine.finalReward.name = await prompt("Final Reward Name: ");
  questLine.finalReward.description = await prompt("Final Reward Description: ");
  questLine.finalReward.effect = await prompt("Final Reward Effect: ");
  questLine.finalReward.icon = parseInt(await prompt("Final Reward Icon ID: "), 10);
  
  return questLine;
}

// Generate JavaScript code for the quest line
function generateQuestLineCode(questLine, variableName) {
  // Format dialogue lines
  const dialogueLines = questLine.startingNPC.dialogue.map(function(line) {
    return '"' + line + '"';
  }).join(',\n            ');
  
  // Format side quests
  const sideQuestsCode = questLine.sideQuests.map(function(sideQuest) {
    // Format objectives
    const objectivesCode = sideQuest.objectives.map(function(objective) {
      return '"' + objective + '"';
    }).join(',\n                ');
    
    return '{\n' +
           '            name: "' + sideQuest.name + '",\n' +
           '            description: "' + sideQuest.description + '",\n' +
           '            objectives: [\n' +
           '                ' + objectivesCode + '\n' +
           '            ],\n' +
           '            reward: {\n' +
           '                name: "' + sideQuest.reward.name + '",\n' +
           '                description: "' + sideQuest.reward.description + '",\n' +
           '                effect: "' + sideQuest.reward.effect + '",\n' +
           '                icon: ' + sideQuest.reward.icon + '\n' +
           '            },\n' +
           '            humor: "' + sideQuest.humor + '"\n' +
           '        }';
  }).join(',\n        ');
  
  return 'const ' + variableName + ' = {\n' +
         '    name: "' + questLine.name + '",\n' +
         '    description: "' + questLine.description + '",\n' +
         '    startingNPC: {\n' +
         '        name: "' + questLine.startingNPC.name + '",\n' +
         '        location: "' + questLine.startingNPC.location + '",\n' +
         '        appearance: "' + questLine.startingNPC.appearance + '",\n' +
         '        index: ' + questLine.startingNPC.index + ',\n' +
         '        dialogue: [\n' +
         '            ' + dialogueLines + '\n' +
         '        ],\n' +
         '        x: ' + questLine.startingNPC.x + ',\n' +
         '        y: ' + questLine.startingNPC.y + '\n' +
         '    },\n' +
         '    sideQuests: [\n' +
         '        ' + sideQuestsCode + '\n' +
         '    ],\n' +
         '    finalReward: {\n' +
         '        name: "' + questLine.finalReward.name + '",\n' +
         '        description: "' + questLine.finalReward.description + '",\n' +
         '        effect: "' + questLine.finalReward.effect + '",\n' +
         '        icon: ' + questLine.finalReward.icon + '\n' +
         '    }\n' +
         '};';
}

// Generate or update the optional_quest_lines.js file
function generateQuestLineFile(questLine) {
  console.log("\nGenerating quest line file...");
  
  const filePath = 'optional_quest_lines.js';
  let fileContent = '';
  let existingQuestLines = {};
  
  // Convert quest line name to camelCase for variable name
  const variableName = questLine.name
    .replace(/\s+(.)/g, (_, char) => char.toUpperCase())
    .replace(/\s/g, '')
    .replace(/^(.)/, (_, char) => char.toLowerCase());
  
  // Check if file already exists
  if (fs.existsSync(filePath)) {
    try {
      // Try to require the file to get existing quest lines
      const tempPath = path.resolve(filePath);
      delete require.cache[tempPath]; // Clear require cache
      existingQuestLines = require(`./${filePath}`);
      
      // Create backup of existing file
      fs.copyFileSync(filePath, `${filePath}.bak`);
    console.log("Created backup of existing file: " + filePath + ".bak");
      
      // Generate new file content with existing quest lines and new quest line
      fileContent = "// Optional Quest Lines for MegaEarth 2049\n" +
                    "// This file contains quest lines, each with 4+ side quests\n\n" +
                    generateQuestLineCode(questLine, variableName) + "\n\n" +
                    "// Export all quest lines\n" +
                    "module.exports = {\n" +
                    "    " + Object.keys(existingQuestLines).join(',\n    ') + ",\n" +
                    "    " + variableName + "\n" +
                    "};";
    } catch (error) {
      console.error(`Error reading existing file: ${error.message}`);
      console.log("Creating new file instead.");
      
      // Generate new file content with just the new quest line
      fileContent = "// Optional Quest Lines for MegaEarth 2049\n" +
                    "// This file contains quest lines, each with 4+ side quests\n\n" +
                    generateQuestLineCode(questLine, variableName) + "\n\n" +
                    "// Export all quest lines\n" +
                    "module.exports = {\n" +
                    "    " + variableName + "\n" +
                    "};";
    }
  } else {
    // Generate new file content with just the new quest line
    fileContent = "// Optional Quest Lines for MegaEarth 2049\n" +
                  "// This file contains quest lines, each with 4+ side quests\n\n" +
                  generateQuestLineCode(questLine, variableName) + "\n\n" +
                  "// Export all quest lines\n" +
                  "module.exports = {\n" +
                  "    " + variableName + "\n" +
                  "};";
  }
  
  // Write to file
  fs.writeFileSync(filePath, fileContent);
    console.log("Quest line file generated: " + filePath);
  
  return variableName;
}

// Generate the add_optional_quest_lines.js script if it doesn't exist
function ensureQuestLineScriptExists() {
  const scriptPath = 'add_optional_quest_lines.js';
  
  if (!fs.existsSync(scriptPath)) {
    console.log("\nGenerating quest line implementation script...");
    
    const scriptContent = "// Script to add optional quest lines to MegaEarth 2049\n" +
                          "const fs = require('fs');\n" +
                          "const path = require('path');\n\n" +
                          "// Load the event templates\n" +
                          "const templatesPath = path.join(__dirname, 'event-templates.json');\n" +
                          "const templates = JSON.parse(fs.readFileSync(templatesPath, 'utf8'));\n\n" +
                          "// Load the optional quest lines\n" +
                          "const optionalQuestLines = require('./optional_quest_lines.js');\n\n" +
                          "// Create a temporary directory for our event files\n" +
                          "const tempDir = path.join(__dirname, 'temp_events');\n" +
                          "if (!fs.existsSync(tempDir)) {\n" +
                          "    fs.mkdirSync(tempDir);\n" +
                          "}\n\n" +
                          "// Function to create an event file\n" +
                          "function createEventFile(event, filename) {\n" +
                          "    const filePath = path.join(tempDir, filename);\n" +
                          "    fs.writeFileSync(filePath, JSON.stringify(event, null, 2));\n" +
                          "    return filePath;\n" +
                          "}\n\n" +
                          "// Function to create an NPC event\n" +
                          "function createNPC(npcData, questLine, questName) {\n" +
                          "    const npc = JSON.parse(JSON.stringify(templates.templates.npc));\n" +
                          "    npc.name = npcData.name;\n" +
                          "    npc.x = npcData.x;\n" +
                          "    npc.y = npcData.y;\n" +
                          "    npc.pages[0].image.characterName = npcData.appearance;\n" +
                          "    npc.pages[0].image.characterIndex = npcData.index;\n" +
                          "    \n" +
                          "    // Create dialogue list\n" +
                          "    const dialogueList = [];\n" +
                          "    \n" +
                          "    // Add initial message with character appearance\n" +
                          "    dialogueList.push({\"code\": 101, \"indent\": 0, \"parameters\": [npcData.appearance, npcData.index, 0, 2]});\n" +
                          "    \n" +
                          "    // Add dialogue lines\n" +
                          "    for (const line of npcData.dialogue) {\n" +
                          "        dialogueList.push({\"code\": 401, \"indent\": 0, \"parameters\": [line]});\n" +
                          "    }\n" +
                          "    \n" +
                          "    // Add quest acceptance choice\n" +
                          "    dialogueList.push({\"code\": 102, \"indent\": 0, \"parameters\": [[\"Accept quest\", \"Not now\"], 1]});\n" +
                          "    \n" +
                          "    // Accept quest branch\n" +
                          "    dialogueList.push({\"code\": 402, \"indent\": 0, \"parameters\": [0, \"Accept quest\"]});\n" +
                          "    \n" +
                          "    // Set quest switch (using a unique switch ID based on quest line and quest)\n" +
                          "    const switchId = getSwitchId(questLine, questName, \"started\");\n" +
                          "    dialogueList.push({\"code\": 121, \"indent\": 1, \"parameters\": [switchId, switchId, 0]});\n" +
                          "    \n" +
                          "    // Add quest acceptance dialogue\n" +
                          "    dialogueList.push({\"code\": 101, \"indent\": 1, \"parameters\": [npcData.appearance, npcData.index, 0, 2]});\n" +
                          "    dialogueList.push({\"code\": 401, \"indent\": 1, \"parameters\": [\"Great! I'll mark the details in your neural log.\"]});\n" +
                          "    dialogueList.push({\"code\": 401, \"indent\": 1, \"parameters\": [\"Come back when you've completed the task.\"]});\n" +
                          "    dialogueList.push({\"code\": 0, \"indent\": 1, \"parameters\": []});\n" +
                          "    \n" +
                          "    // Decline quest branch\n" +
                          "    dialogueList.push({\"code\": 402, \"indent\": 0, \"parameters\": [1, \"Not now\"]});\n" +
                          "    dialogueList.push({\"code\": 101, \"indent\": 1, \"parameters\": [npcData.appearance, npcData.index, 0, 2]});\n" +
                          "    dialogueList.push({\"code\": 401, \"indent\": 1, \"parameters\": [\"I understand. Come back if you change your mind.\"]});\n" +
                          "    dialogueList.push({\"code\": 0, \"indent\": 1, \"parameters\": []});\n" +
                          "    \n" +
                          "    // End choice\n" +
                          "    dialogueList.push({\"code\": 0, \"indent\": 0, \"parameters\": []});\n" +
                          "    \n" +
                          "    npc.pages[0].list = dialogueList;\n" +
                          "    \n" +
                          "    // Add a second page for when the quest is active\n" +
                          "    npc.pages[1] = {\n" +
                          "        \"conditions\": {\n" +
                          "            \"actorId\": 1, \n" +
                          "            \"actorValid\": false, \n" +
                          "            \"itemId\": 1, \n" +
                          "            \"itemValid\": false, \n" +
                          "            \"selfSwitchCh\": \"A\", \n" +
                          "            \"selfSwitchValid\": false, \n" +
                          "            \"switch1Id\": switchId, \n" +
                          "            \"switch1Valid\": true, \n" +
                          "            \"switch2Id\": getSwitchId(questLine, questName, \"completed\"), \n" +
                          "            \"switch2Valid\": false, \n" +
                          "            \"variableId\": 1, \n" +
                          "            \"variableValid\": false, \n" +
                          "            \"variableValue\": 0\n" +
                          "        },\n" +
                          "        \"directionFix\": false,\n" +
                          "        \"image\": {\n" +
                          "            \"characterIndex\": npcData.index, \n" +
                          "            \"characterName\": npcData.appearance, \n" +
                          "            \"direction\": 2, \n" +
                          "            \"pattern\": 1, \n" +
                          "            \"tileId\": 0\n" +
                          "        },\n" +
                          "        \"list\": [\n" +
                          "            {\"code\": 101, \"indent\": 0, \"parameters\": [npcData.appearance, npcData.index, 0, 2]},\n" +
                          "            {\"code\": 401, \"indent\": 0, \"parameters\": [\"Have you completed the task yet?\"]},\n" +
                          "            {\"code\": 401, \"indent\": 0, \"parameters\": [\"I'm counting on you!\"]},\n" +
                          "            {\"code\": 0, \"indent\": 0, \"parameters\": []}\n" +
                          "        ],\n" +
                          "        \"moveFrequency\": 3,\n" +
                          "        \"moveRoute\": {\"list\": [{\"code\": 0, \"parameters\": []}], \"repeat\": true, \"skippable\": false, \"wait\": false},\n" +
                          "        \"moveSpeed\": 3,\n" +
                          "        \"moveType\": 0,\n" +
                          "        \"priorityType\": 1,\n" +
                          "        \"stepAnime\": false,\n" +
                          "        \"through\": false,\n" +
                          "        \"trigger\": 0,\n" +
                          "        \"walkAnime\": true\n" +
                          "    };\n" +
                          "    \n" +
                          "    // Add a third page for quest completion\n" +
                          "    npc.pages[2] = {\n" +
                          "        \"conditions\": {\n" +
                          "            \"actorId\": 1, \n" +
                          "            \"actorValid\": false, \n" +
                          "            \"itemId\": 1, \n" +
                          "            \"itemValid\": false, \n" +
                          "            \"selfSwitchCh\": \"A\", \n" +
                          "            \"selfSwitchValid\": false, \n" +
                          "            \"switch1Id\": getSwitchId(questLine, questName, \"objectives_complete\"), \n" +
                          "            \"switch1Valid\": true, \n" +
                          "            \"switch2Id\": getSwitchId(questLine, questName, \"completed\"), \n" +
                          "            \"switch2Valid\": false, \n" +
                          "            \"variableId\": 1, \n" +
                          "            \"variableValid\": false, \n" +
                          "            \"variableValue\": 0\n" +
                          "        },\n" +
                          "        \"directionFix\": false,\n" +
                          "        \"image\": {\n" +
                          "            \"characterIndex\": npcData.index, \n" +
                          "            \"characterName\": npcData.appearance, \n" +
                          "            \"direction\": 2, \n" +
                          "            \"pattern\": 1, \n" +
                          "            \"tileId\": 0\n" +
                          "        },\n" +
                          "        \"list\": [\n" +
                          "            {\"code\": 101, \"indent\": 0, \"parameters\": [npcData.appearance, npcData.index, 0, 2]},\n" +
                          "            {\"code\": 401, \"indent\": 0, \"parameters\": [\"You've done it! Excellent work!\"]},\n" +
                          "            {\"code\": 101, \"indent\": 0, \"parameters\": [npcData.appearance, npcData.index, 0, 2]},\n" +
                          "            {\"code\": 401, \"indent\": 0, \"parameters\": [\"Here's your reward as promised.\"]},\n" +
                          "            // Give reward item\n" +
                          "            {\"code\": 128, \"indent\": 0, \"parameters\": [{\n" +
                          "                \"name\": questName + \" Reward\",\n" +
                          "                \"icon\": 176,\n" +
                          "                \"description\": \"A reward for completing the \" + questName + \" quest.\",\n" +
                          "                \"effects\": [{\"code\": 21, \"dataId\": 0, \"value\": 5}],\n" +
                          "                \"occasion\": 3,\n" +
                          "                \"price\": 0,\n" +
                          "                \"consumable\": false,\n" +
                          "                \"itypeId\": 1,\n" +
                          "                \"scope\": 7,\n" +
                          "                \"speed\": 0,\n" +
                          "                \"successRate\": 100,\n" +
                          "                \"repeats\": 1,\n" +
                          "                \"tpGain\": 0,\n" +
                          "                \"hitType\": 0,\n" +
                          "                \"animationId\": 0,\n" +
                          "                \"damage\": {\"critical\": false, \"elementId\": 0, \"formula\": \"0\", \"type\": 0, \"variance\": 20},\n" +
                          "                \"note\": \"\"\n" +
                          "            }]},\n" +
                          "            // Set quest completed switch\n" +
                          "            {\"code\": 121, \"indent\": 0, \"parameters\": [getSwitchId(questLine, questName, \"completed\"), getSwitchId(questLine, questName, \"completed\"), 0]},\n" +
                          "            // Set self switch for post-quest dialogue\n" +
                          "            {\"code\": 123, \"indent\": 0, \"parameters\": [\"A\", 0]},\n" +
                          "            {\"code\": 0, \"indent\": 0, \"parameters\": []}\n" +
                          "        ],\n" +
                          "        \"moveFrequency\": 3,\n" +
                          "        \"moveRoute\": {\"list\": [{\"code\": 0, \"parameters\": []}], \"repeat\": true, \"skippable\": false, \"wait\": false},\n" +
                          "        \"moveSpeed\": 3,\n" +
                          "        \"moveType\": 0,\n" +
                          "        \"priorityType\": 1,\n" +
                          "        \"stepAnime\": false,\n" +
                          "        \"through\": false,\n" +
                          "        \"trigger\": 0,\n" +
                          "        \"walkAnime\": true\n" +
                          "    };\n" +
                          "    \n" +
                          "    // Add a fourth page for after quest completion\n" +
                          "    npc.pages[3] = {\n" +
                          "        \"conditions\": {\n" +
                          "            \"actorId\": 1, \n" +
                          "            \"actorValid\": false, \n" +
                          "            \"itemId\": 1, \n" +
                          "            \"itemValid\": false, \n" +
                          "            \"selfSwitchCh\": \"A\", \n" +
                          "            \"selfSwitchValid\": true, \n" +
                          "            \"switch1Id\": 1, \n" +
                          "            \"switch1Valid\": false, \n" +
                          "            \"switch2Id\": 1, \n" +
                          "            \"switch2Valid\": false, \n" +
                          "            \"variableId\": 1, \n" +
                          "            \"variableValid\": false, \n" +
                          "            \"variableValue\": 0\n" +
                          "        },\n" +
                          "        \"directionFix\": false,\n" +
                          "        \"image\": {\n" +
                          "            \"characterIndex\": npcData.index, \n" +
                          "            \"characterName\": npcData.appearance, \n" +
                          "            \"direction\": 2, \n" +
                          "            \"pattern\": 1, \n" +
                          "            \"tileId\": 0\n" +
                          "        },\n" +
                          "        \"list\": [\n" +
                          "            {\"code\": 101, \"indent\": 0, \"parameters\": [npcData.appearance, npcData.index, 0, 2]},\n" +
                          "            {\"code\": 401, \"indent\": 0, \"parameters\": [\"Thanks again for your help!\"]},\n" +
                          "            {\"code\": 401, \"indent\": 0, \"parameters\": [\"Your assistance has been invaluable.\"]},\n" +
                          "            {\"code\": 0, \"indent\": 0, \"parameters\": []}\n" +
                          "        ],\n" +
                          "        \"moveFrequency\": 3,\n" +
                          "        \"moveRoute\": {\"list\": [{\"code\": 0, \"parameters\": []}], \"repeat\": true, \"skippable\": false, \"wait\": false},\n" +
                          "        \"moveSpeed\": 3,\n" +
                          "        \"moveType\": 0,\n" +
                          "        \"priorityType\": 1,\n" +
                          "        \"stepAnime\": false,\n" +
                          "        \"through\": false,\n" +
                          "        \"trigger\": 0,\n" +
                          "        \"walkAnime\": true\n" +
                          "    };\n" +
                          "    \n" +
                          "    return npc;\n" +
                          "}";
    
    // Write to file
    fs.writeFileSync(scriptPath, scriptContent);
    console.log("Quest line implementation script generated: " + scriptPath);
  }
}

// Generate event files for a quest line
function generateEventFiles(questLine, variableName) {
    console.log("\nGenerating event files...");
    
    // Ensure temp_events directory exists
    const tempDir = path.join(__dirname, 'temp_events');
    ensureDirectoryExists(tempDir);
    
    // Process the quest line
    console.log("Processing \"" + questLine.name + "\" quest line...");
    
    // Create the starting NPC
    const startingNPC = createNPC(questLine.startingNPC, questLine.name, "start");
    const startingNPCPath = path.join(tempDir, variableName + "_starting_npc.json");
    fs.writeFileSync(startingNPCPath, JSON.stringify(startingNPC, null, 2));
    
    console.log("Created starting NPC: " + startingNPCPath);
    
    // Process each side quest
    for (const [index, sideQuest] of questLine.sideQuests.entries()) {
        console.log("  Processing \"" + sideQuest.name + "\" side quest...");
        
        // Create objectives
        const objectivePaths = [];
        for (const [objIndex, objective] of sideQuest.objectives.entries()) {
            const objectiveEvent = createObjective(objective, questLine.name, sideQuest.name, objIndex);
            const objectivePath = path.join(tempDir, variableName + "_" + index + "_objective_" + objIndex + ".json");
            fs.writeFileSync(objectivePath, JSON.stringify(objectiveEvent, null, 2));
            objectivePaths.push(objectivePath);
        }
        
    console.log("  Created " + objectivePaths.length + " objectives");
    }
    
    // Create quest line completion event
    const completionEvent = createQuestLineCompletion(questLine);
    const completionPath = path.join(tempDir, variableName + "_completion.json");
    fs.writeFileSync(completionPath, JSON.stringify(completionEvent, null, 2));
    
    console.log("Created quest line completion event: " + completionPath);
    
    return true;
}

// Update the FAQ documentation with the new quest line
function updateDocumentation(questLine) {
    console.log("\nUpdating documentation...");
    
    const faqPath = 'FAQ_06_Quests_and_Storylines.md';
    
    if (!fs.existsSync(faqPath)) {
        console.error("FAQ file not foun
