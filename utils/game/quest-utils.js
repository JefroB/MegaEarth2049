/**
 * MegaEarth2049 Quest Utilities
 * Common functions for working with quests and quest lines
 */

const fs = require('fs');
const path = require('path');
const jsonUtils = require('../core/json-utils');
const mapUtils = require('./map-utils');

// Default paths
const TEMP_EVENTS_DIR = path.join(__dirname, '..', '..', 'temp_events');

/**
 * Quest structure template
 * @typedef {Object} QuestTemplate
 * @property {string} name - Quest name
 * @property {string} description - Quest description
 * @property {Array<string>} objectives - List of objectives
 * @property {Object} reward - Quest reward
 * @property {string} reward.name - Reward name
 * @property {string} reward.description - Reward description
 * @property {string} reward.effect - Reward effect
 * @property {number} reward.icon - Reward icon ID
 * @property {string} [humor] - Humorous element
 */

/**
 * Quest line structure template
 * @typedef {Object} QuestLineTemplate
 * @property {string} name - Quest line name
 * @property {string} description - Quest line description
 * @property {Object} startingNPC - Starting NPC data
 * @property {string} startingNPC.name - NPC name
 * @property {string} startingNPC.location - NPC location
 * @property {string} startingNPC.appearance - NPC appearance
 * @property {number} startingNPC.index - NPC index
 * @property {Array<string>} startingNPC.dialogue - NPC dialogue
 * @property {number} startingNPC.x - NPC X position
 * @property {number} startingNPC.y - NPC Y position
 * @property {Array<QuestTemplate>} sideQuests - List of side quests
 * @property {Object} finalReward - Final reward
 */

/**
 * Create a new quest template
 * @param {Object} options - Quest options
 * @param {string} options.name - Quest name
 * @param {string} options.description - Quest description
 * @param {Array<string>} options.objectives - List of objectives
 * @param {Object} options.reward - Quest reward
 * @param {string} [options.humor] - Humorous element
 * @returns {QuestTemplate} - Quest template
 */
function createQuestTemplate(options = {}) {
  const {
    name = 'New Quest',
    description = 'Quest description',
    objectives = ['Complete objective 1'],
    reward = {
      name: 'Quest Reward',
      description: 'A reward for completing the quest',
      effect: 'Provides a bonus',
      icon: 176
    },
    humor = ''
  } = options;
  
  return {
    name,
    description,
    objectives,
    reward,
    humor
  };
}

/**
 * Create a new quest line template
 * @param {Object} options - Quest line options
 * @param {string} options.name - Quest line name
 * @param {string} options.description - Quest line description
 * @param {Object} options.startingNPC - Starting NPC data
 * @param {Array<QuestTemplate>} options.sideQuests - List of side quests
 * @param {Object} options.finalReward - Final reward
 * @returns {QuestLineTemplate} - Quest line template
 */
function createQuestLineTemplate(options = {}) {
  const {
    name = 'New Quest Line',
    description = 'Quest line description',
    startingNPC = {
      name: 'NPC Name',
      location: 'Location (Map000)',
      appearance: 'Actor1',
      index: 0,
      dialogue: ['Hello, traveler!'],
      x: 10,
      y: 10
    },
    sideQuests = [createQuestTemplate()],
    finalReward = {
      name: 'Final Reward',
      description: 'A reward for completing the quest line',
      effect: 'Provides a significant bonus',
      icon: 176
    }
  } = options;
  
  return {
    name,
    description,
    startingNPC,
    sideQuests,
    finalReward
  };
}

/**
 * Generate a variable name from a quest line name
 * @param {string} questLineName - Quest line name
 * @returns {string} - Variable name in camelCase
 */
function generateVariableName(questLineName) {
  return questLineName
    .replace(/\s+(.)/g, (_, char) => char.toUpperCase())
    .replace(/\s/g, '')
    .replace(/^(.)/, (_, char) => char.toLowerCase())
    .replace(/[^a-zA-Z0-9]/g, '');
}

/**
 * Generate JavaScript code for a quest line
 * @param {QuestLineTemplate} questLine - Quest line template
 * @param {string} variableName - Variable name
 * @returns {string} - JavaScript code
 */
function generateQuestLineCode(questLine, variableName) {
  // Format dialogue lines
  const dialogueLines = questLine.startingNPC.dialogue.map(function(line) {
    return `"${line}"`;
  }).join(',\n            ');
  
  // Format side quests
  const sideQuestsCode = questLine.sideQuests.map(function(sideQuest) {
    // Format objectives
    const objectivesCode = sideQuest.objectives.map(function(objective) {
      return `"${objective}"`;
    }).join(',\n                ');
    
    return '{\n' +
           `            name: "${sideQuest.name}",\n` +
           `            description: "${sideQuest.description}",\n` +
           '            objectives: [\n' +
           `                ${objectivesCode}\n` +
           '            ],\n' +
           '            reward: {\n' +
           `                name: "${sideQuest.reward.name}",\n` +
           `                description: "${sideQuest.reward.description}",\n` +
           `                effect: "${sideQuest.reward.effect}",\n` +
           `                icon: ${sideQuest.reward.icon}\n` +
           '            }' +
           (sideQuest.humor ? `,\n            humor: "${sideQuest.humor}"` : '') +
           '\n        }';
  }).join(',\n        ');
  
  return `const ${variableName} = {\n` +
         `    name: "${questLine.name}",\n` +
         `    description: "${questLine.description}",\n` +
         '    startingNPC: {\n' +
         `        name: "${questLine.startingNPC.name}",\n` +
         `        location: "${questLine.startingNPC.location}",\n` +
         `        appearance: "${questLine.startingNPC.appearance}",\n` +
         `        index: ${questLine.startingNPC.index},\n` +
         '        dialogue: [\n' +
         `            ${dialogueLines}\n` +
         '        ],\n' +
         `        x: ${questLine.startingNPC.x},\n` +
         `        y: ${questLine.startingNPC.y}\n` +
         '    },\n' +
         '    sideQuests: [\n' +
         `        ${sideQuestsCode}\n` +
         '    ],\n' +
         '    finalReward: {\n' +
         `        name: "${questLine.finalReward.name}",\n` +
         `        description: "${questLine.finalReward.description}",\n` +
         `        effect: "${questLine.finalReward.effect}",\n` +
         `        icon: ${questLine.finalReward.icon}\n` +
         '    }\n' +
         '};';
}

/**
 * Create a starting NPC event for a quest line
 * @param {QuestLineTemplate} questLine - Quest line template
 * @param {string} questLineName - Quest line name (for switch IDs)
 * @returns {Object} - NPC event object
 */
function createStartingNPC(questLine, questLineName) {
  const npcData = questLine.startingNPC;
  const switchPrefix = generateVariableName(questLineName);
  
  // Create dialogue list
  const dialogueList = [];
  
  // Add initial message with character appearance
  dialogueList.push({
    code: 101, 
    indent: 0, 
    parameters: [npcData.appearance, npcData.index, 0, 2]
  });
  
  // Add dialogue lines
  for (const line of npcData.dialogue) {
    dialogueList.push({
      code: 401, 
      indent: 0, 
      parameters: [line]
    });
  }
  
  // Add quest acceptance choice
  dialogueList.push({
    code: 102, 
    indent: 0, 
    parameters: [["Accept quest", "Not now"], 1]
  });
  
  // Accept quest branch
  dialogueList.push({
    code: 402, 
    indent: 0, 
    parameters: [0, "Accept quest"]
  });
  
  // Set quest switch (using a unique switch ID based on quest line)
  const switchId = 100; // This would be determined dynamically in a real implementation
  dialogueList.push({
    code: 121, 
    indent: 1, 
    parameters: [switchId, switchId, 0]
  });
  
  // Add quest acceptance dialogue
  dialogueList.push({
    code: 101, 
    indent: 1, 
    parameters: [npcData.appearance, npcData.index, 0, 2]
  });
  dialogueList.push({
    code: 401, 
    indent: 1, 
    parameters: ["Great! I'll mark the details in your neural log."]
  });
  dialogueList.push({
    code: 401, 
    indent: 1, 
    parameters: ["Come back when you've completed the task."]
  });
  dialogueList.push({
    code: 0, 
    indent: 1, 
    parameters: []
  });
  
  // Decline quest branch
  dialogueList.push({
    code: 402, 
    indent: 0, 
    parameters: [1, "Not now"]
  });
  dialogueList.push({
    code: 101, 
    indent: 1, 
    parameters: [npcData.appearance, npcData.index, 0, 2]
  });
  dialogueList.push({
    code: 401, 
    indent: 1, 
    parameters: ["I understand. Come back if you change your mind."]
  });
  dialogueList.push({
    code: 0, 
    indent: 1, 
    parameters: []
  });
  
  // End choice
  dialogueList.push({
    code: 0, 
    indent: 0, 
    parameters: []
  });
  
  // Create the NPC event
  return mapUtils.createBasicEvent({
    name: npcData.name,
    x: npcData.x,
    y: npcData.y,
    characterName: npcData.appearance,
    characterIndex: npcData.index,
    pages: [{
      conditions: {
        actorId: 1,
        actorValid: false,
        itemId: 1,
        itemValid: false,
        selfSwitchCh: 'A',
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
      list: dialogueList,
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
    }]
  });
}

/**
 * Create event files for a quest line
 * @param {QuestLineTemplate} questLine - Quest line template
 * @returns {Object} - Object with paths to created event files
 */
function createQuestLineEvents(questLine) {
  // Ensure temp_events directory exists
  if (!fs.existsSync(TEMP_EVENTS_DIR)) {
    fs.mkdirSync(TEMP_EVENTS_DIR, { recursive: true });
  }
  
  const variableName = generateVariableName(questLine.name);
  const result = {
    startingNPC: null,
    objectives: [],
    completion: null
  };
  
  // Create starting NPC
  const startingNPC = createStartingNPC(questLine, questLine.name);
  const startingNPCPath = path.join(TEMP_EVENTS_DIR, `${variableName}_starting_npc.json`);
  jsonUtils.safeWriteJSON(startingNPCPath, startingNPC);
  result.startingNPC = startingNPCPath;
  
  // Process each side quest (in a real implementation, this would create objective events)
  for (const [index, sideQuest] of questLine.sideQuests.entries()) {
    // In a real implementation, this would create events for each objective
    // For now, we'll just log the objectives
    console.log(`Quest: ${sideQuest.name}`);
    for (const [objIndex, objective] of sideQuest.objectives.entries()) {
      console.log(`  Objective ${objIndex + 1}: ${objective}`);
    }
  }
  
  return result;
}

/**
 * Add a quest line to a quest file
 * @param {QuestLineTemplate} questLine - Quest line template
 * @param {string} filePath - Path to the quest file
 * @returns {boolean} - Success or failure
 */
function addQuestLineToFile(questLine, filePath = 'optional_quest_lines.js') {
  const variableName = generateVariableName(questLine.name);
  
  // Generate code for the quest line
  const questLineCode = generateQuestLineCode(questLine, variableName);
  
  try {
    let fileContent = '';
    let existingQuestLines = {};
    
    // Check if file already exists
    if (fs.existsSync(filePath)) {
      try {
        // Try to read the existing file
        fileContent = fs.readFileSync(filePath, 'utf8');
        
        // Create backup of existing file
        const backupPath = `${filePath}.bak`;
        fs.writeFileSync(backupPath, fileContent);
        console.log(`Created backup of existing file: ${backupPath}`);
        
        // Extract existing variable names
        const variableRegex = /const\s+(\w+)\s*=/g;
        let match;
        const existingVars = [];
        
        while ((match = variableRegex.exec(fileContent)) !== null) {
          existingVars.push(match[1]);
        }
        
        // Generate new file content with existing quest lines and new quest line
        fileContent = "// Optional Quest Lines for MegaEarth 2049\n" +
                      "// This file contains quest lines, each with multiple side quests\n\n" +
                      questLineCode + "\n\n" +
                      "// Export all quest lines\n" +
                      "module.exports = {\n" +
                      "    " + [...existingVars, variableName].join(',\n    ') + "\n" +
                      "};";
      } catch (error) {
        console.error(`Error reading existing file: ${error.message}`);
        console.log("Creating new file instead.");
        
        // Generate new file content with just the new quest line
        fileContent = "// Optional Quest Lines for MegaEarth 2049\n" +
                      "// This file contains quest lines, each with multiple side quests\n\n" +
                      questLineCode + "\n\n" +
                      "// Export all quest lines\n" +
                      "module.exports = {\n" +
                      "    " + variableName + "\n" +
                      "};";
      }
    } else {
      // Generate new file content with just the new quest line
      fileContent = "// Optional Quest Lines for MegaEarth 2049\n" +
                    "// This file contains quest lines, each with multiple side quests\n\n" +
                    questLineCode + "\n\n" +
                    "// Export all quest lines\n" +
                    "module.exports = {\n" +
                    "    " + variableName + "\n" +
                    "};";
    }
    
    // Write to file
    fs.writeFileSync(filePath, fileContent);
    console.log(`Quest line added to ${filePath}`);
    return true;
  } catch (error) {
    console.error(`Error adding quest line to file: ${error.message}`);
    return false;
  }
}

module.exports = {
  TEMP_EVENTS_DIR,
  createQuestTemplate,
  createQuestLineTemplate,
  generateVariableName,
  generateQuestLineCode,
  createStartingNPC,
  createQuestLineEvents,
  addQuestLineToFile
};
