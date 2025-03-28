// Script to combine all quest lines from different batches
const fs = require('fs');
const path = require('path');

// Function to get all quest line files
function getQuestLineFiles() {
  const files = fs.readdirSync('./');
  return files.filter(file => file.endsWith('_quest.js'));
}

// Function to get quest line files by batch
function getQuestLineFilesByBatch() {
  const allFiles = getQuestLineFiles();
  
  // Categorize files by batch
  const batches = {
    original: [],
    batch1: [],
    batch2: [],
    batch3: [],
    batch4: [],
    batch5: []
  };
  
  // Original quest lines (from before)
  const originalQuestLines = [
    'wastelandRadioDJ_quest.js',
    'mutantCookingShow_quest.js',
    'cyberneticEnhancement_quest.js',
    'virtualRealityAddiction_quest.js',
    'neonStreetRacing_quest.js',
    'droneSwarmCommander_quest.js',
    'memoryMerchant_quest.js',
    'syntheticEmotions_quest.js',
    'digitalGraffiti_quest.js',
    'syntheticPets_quest.js',
    'holographicNightclub_quest.js'
  ];
  
  // Batch 4 quest lines
  const batch4QuestLines = [
    'undergroundfarming_quest.js',
    'wastelandfashion_quest.js',
    'mutantpetrescue_quest.js',
    'wastelandradionetwork_quest.js',
    'wastelandolympics_quest.js',
    'wastelandamusementpark_quest.js',
    'wastelandtradingcaravan_quest.js',
    'wastelandpostalservice_quest.js',
    'wastelandhistorians_quest.js',
    'wastelandtheatertroupe_quest.js',
    'wastelandhotspringsresort_quest.js'
  ];
  
  // Batch 5 quest lines
  const batch5QuestLines = [
    'wastelandculinarycompetition_quest.js',
    'wastelandmusicfestival_quest.js',
    'wastelandsportsleague_quest.js',
    'wastelandartgallery_quest.js',
    'wastelandfilmfestival_quest.js',
    'wastelandcircus_quest.js',
    'wastelandlibrarynetwork_quest.js',
    'wastelanduniversity_quest.js',
    'wastelandbotanicalgardens_quest.js',
    'wastelandobservatory_quest.js',
    'wastelandmuseumofhistory_quest.js'
  ];
  
  // Categorize files
  allFiles.forEach(file => {
    if (originalQuestLines.includes(file)) {
      batches.original.push(file);
    } else if (batch4QuestLines.includes(file)) {
      batches.batch4.push(file);
    } else if (batch5QuestLines.includes(file)) {
      batches.batch5.push(file);
    } else if (file.startsWith('burlap') || file.startsWith('clown') || 
               file.startsWith('trash') || file.startsWith('vending') || 
               file.startsWith('std') || file.startsWith('asp')) {
      batches.batch1.push(file);
    } else {
      // Any other quest lines go to batch2
      batches.batch2.push(file);
    }
  });
  
  return batches;
}

// Function to combine all quest lines
function combineAllQuestLines() {
  const questLineFiles = getQuestLineFiles();
  console.log(`Found ${questLineFiles.length} quest line files.`);
  
  // Create the combined content
  const combinedQuestLines = questLineFiles.map(file => `require('./${file}')`).join(',\n  ');
  const combinedContent = `// Combined All Quest Lines
const questLines = [
  ${combinedQuestLines}
];

module.exports = questLines;`;

  // Write the combined content to a file
  fs.writeFileSync('all_quest_lines.js', combinedContent);
  console.log('Created combined quest lines file: all_quest_lines.js');
  
  return questLineFiles.length;
}

// Function to create a summary of all quest lines
function createQuestLinesSummary() {
  const questLineFiles = getQuestLineFiles();
  let summary = '# MegaEarth 2049 Quest Lines Summary\n\n';
  summary += 'This document provides an overview of all quest lines available in MegaEarth 2049.\n\n';
  summary += '## Quest Lines Overview\n\n';
  
  questLineFiles.forEach((file, index) => {
    try {
      const questLine = require(`./${file}`);
      summary += `${index + 1}. **${questLine.name}**\n`;
      summary += `   - ${questLine.description}\n`;
      summary += '   - 5 side quests with unique rewards\n';
      const mapId = questLine.startingMap ? questLine.startingMap.toString().padStart(3, '0') : 'Unknown';
      summary += `   - Starting NPC: ${questLine.startingNPC.name} in Map${mapId}\n\n`;
    } catch (error) {
      console.error(`Error processing ${file}: ${error.message}`);
    }
  });
  
  summary += '## Implementation Details\n\n';
  summary += 'Each quest line includes:\n';
  summary += '- A unique starting NPC with custom dialogue\n';
  summary += '- 5 side quests with 5 objectives each\n';
  summary += '- Unique rewards for each quest and a final reward for completing the entire quest line\n';
  summary += '- Humorous elements consistent with the MegaEarth 2049 setting\n\n';
  
  summary += '## How to Add These Quest Lines to the Game\n\n';
  summary += '1. Run the following command to generate event files:\n';
  summary += '   ```\n';
  summary += '   node add_all_quest_lines.js\n';
  summary += '   ```\n';
  summary += '   This will create the necessary event files in the temp_events directory.\n\n';
  
  summary += '2. Use the add_quest_events_to_maps.js script to add the events to the appropriate maps:\n';
  summary += '   ```\n';
  summary += '   node add_quest_events_to_maps.js\n';
  summary += '   ```\n\n';
  
  summary += '## Map Locations for Quest Lines\n\n';
  summary += 'Each quest line is assigned to a specific starting map, with objectives distributed across three consecutive maps.\n';
  
  // Write the summary to a file
  fs.writeFileSync('all_quest_lines_summary.md', summary);
  console.log('Created quest lines summary: all_quest_lines_summary.md');
}

// Function to create a script to add all quest lines to the game
function createAddAllQuestLinesScript() {
  const content = `// Script to add all quest lines to the game
const fs = require('fs');
const path = require('path');

// Import all quest lines
const questLines = require('./all_quest_lines.js');

console.log(\`Processing \${questLines.length} quest lines...\`);

// Create temp_events directory if it doesn't exist
const tempEventsDir = path.join(__dirname, 'temp_events');
if (!fs.existsSync(tempEventsDir)) {
  fs.mkdirSync(tempEventsDir);
}

// Process each quest line
questLines.forEach(questLine => {
  console.log(\`Processing "\${questLine.name}" quest line...\`);
  
  // Create starting NPC event
  const startingNPCEvent = {
    id: 1, // Will be assigned by the map
    name: questLine.startingNPC.name,
    note: "",
    pages: [
      {
        conditions: { actorId: 1, actorValid: false, itemId: 1, itemValid: false, selfSwitchCh: "A", selfSwitchValid: false, switch1Id: 1, switch1Valid: false, switch2Id: 1, switch2Valid: false, variableId: 1, variableValid: false, variableValue: 0 },
        directionFix: false,
        image: { characterIndex: 0, characterName: "", direction: 2, pattern: 1, tileId: 0 },
        list: [
          { code: 101, indent: 0, parameters: ["", 0, 0, 2, questLine.startingNPC.name] },
          { code: 401, indent: 0, parameters: [questLine.startingNPC.dialogueIntro] },
          { code: 101, indent: 0, parameters: ["", 0, 0, 2, questLine.startingNPC.name] },
          { code: 401, indent: 0, parameters: ["Would you like to help me with some tasks?"] },
          { code: 102, indent: 0, parameters: [["Yes", "No"], 1, 0, 2, 0] },
          { code: 402, indent: 0, parameters: [0, "Yes"] },
          { code: 101, indent: 1, parameters: ["", 0, 0, 2, questLine.startingNPC.name] },
          { code: 401, indent: 1, parameters: ["Excellent! Let's get started with the first task."] },
          { code: 123, indent: 1, parameters: ["A", 0] },
          { code: 0, indent: 1, parameters: [] },
          { code: 402, indent: 0, parameters: [1, "No"] },
          { code: 101, indent: 1, parameters: ["", 0, 0, 2, questLine.startingNPC.name] },
          { code: 401, indent: 1, parameters: ["I understand. Come back if you change your mind."] },
          { code: 0, indent: 1, parameters: [] },
          { code: 404, indent: 0, parameters: [] },
          { code: 0, indent: 0, parameters: [] }
        ],
        moveFrequency: 3,
        moveRoute: { list: [{ code: 0, parameters: [] }], repeat: true, skippable: false, wait: false },
        moveSpeed: 3,
        moveType: 0,
        priorityType: 1,
        stepAnime: false,
        through: false,
        trigger: 0,
        walkAnime: true
      }
    ],
    x: 0,
    y: 0
  };
  
  // Write starting NPC event to file
  const startingNPCFilePath = path.join(tempEventsDir, \`\${questLine.name.toLowerCase().replace(/\\s+/g, '')}_starting_npc.json\`);
  fs.writeFileSync(startingNPCFilePath, JSON.stringify(startingNPCEvent, null, 2));
  console.log(\`Created starting NPC: \${startingNPCFilePath}\`);
  
  // Process each quest in the quest line
  questLine.quests.forEach((quest, questIndex) => {
    console.log(\`  Processing "\${quest.name}" side quest...\`);
    
    // Process each objective in the quest
    quest.objectives.forEach((objective, objectiveIndex) => {
      // Create objective event
      const objectiveEvent = {
        id: 1, // Will be assigned by the map
        name: \`\${questLine.name} - \${quest.name} - Objective \${objectiveIndex + 1}\`,
        note: "",
        pages: [
          {
            conditions: { actorId: 1, actorValid: false, itemId: 1, itemValid: false, selfSwitchCh: "A", selfSwitchValid: false, switch1Id: 1, switch1Valid: false, switch2Id: 1, switch2Valid: false, variableId: 1, variableValid: false, variableValue: 0 },
            directionFix: false,
            image: { characterIndex: 0, characterName: "", direction: 2, pattern: 1, tileId: 0 },
            list: [
              { code: 101, indent: 0, parameters: ["", 0, 0, 2, objective.npcName] },
              { code: 401, indent: 0, parameters: [objective.description] },
              { code: 101, indent: 0, parameters: ["", 0, 0, 2, objective.npcName] },
              { code: 401, indent: 0, parameters: ["Complete this task to receive a reward."] },
              { code: 102, indent: 0, parameters: [["Complete", "Not yet"], 1, 0, 2, 0] },
              { code: 402, indent: 0, parameters: [0, "Complete"] },
              { code: 101, indent: 1, parameters: ["", 0, 0, 2, objective.npcName] },
              { code: 401, indent: 1, parameters: [objective.dialogueSuccess] },
              { code: 125, indent: 1, parameters: [0, 0, 1, false, 5] },
              { code: 101, indent: 1, parameters: ["", 0, 0, 2, "System"] },
              { code: 401, indent: 1, parameters: [\`Received \${objective.reward}!\`] },
              { code: 123, indent: 1, parameters: ["A", 0] },
              { code: 0, indent: 1, parameters: [] },
              { code: 402, indent: 0, parameters: [1, "Not yet"] },
              { code: 101, indent: 1, parameters: ["", 0, 0, 2, objective.npcName] },
              { code: 401, indent: 1, parameters: [objective.dialogueFailure] },
              { code: 0, indent: 1, parameters: [] },
              { code: 404, indent: 0, parameters: [] },
              { code: 0, indent: 0, parameters: [] }
            ],
            moveFrequency: 3,
            moveRoute: { list: [{ code: 0, parameters: [] }], repeat: true, skippable: false, wait: false },
            moveSpeed: 3,
            moveType: 0,
            priorityType: 1,
            stepAnime: false,
            through: false,
            trigger: 0,
            walkAnime: true
          }
        ],
        x: 0,
        y: 0
      };
      
      // Write objective event to file
      const objectiveFilePath = path.join(tempEventsDir, \`\${questLine.name.toLowerCase().replace(/\\s+/g, '')}_\${questIndex}_objective_\${objectiveIndex}.json\`);
      fs.writeFileSync(objectiveFilePath, JSON.stringify(objectiveEvent, null, 2));
    });
    
    console.log(\`  Created 5 objectives\`);
  });
  
  // Create quest line completion event
  const completionEvent = {
    id: 1, // Will be assigned by the map
    name: \`\${questLine.name} - Completion\`,
    note: "",
    pages: [
      {
        conditions: { actorId: 1, actorValid: false, itemId: 1, itemValid: false, selfSwitchCh: "A", selfSwitchValid: false, switch1Id: 1, switch1Valid: false, switch2Id: 1, switch2Valid: false, variableId: 1, variableValid: false, variableValue: 0 },
        directionFix: false,
        image: { characterIndex: 0, characterName: "", direction: 2, pattern: 1, tileId: 0 },
        list: [
          { code: 101, indent: 0, parameters: ["", 0, 0, 2, questLine.startingNPC.name] },
          { code: 401, indent: 0, parameters: ["You've completed all the tasks! Thank you for your help."] },
          { code: 101, indent: 0, parameters: ["", 0, 0, 2, questLine.startingNPC.name] },
          { code: 401, indent: 0, parameters: ["Here's a special reward for your dedication."] },
          { code: 125, indent: 0, parameters: [0, 0, 10, false, 20] },
          { code: 101, indent: 0, parameters: ["", 0, 0, 2, "System"] },
          { code: 401, indent: 0, parameters: [\`Received \${questLine.name} Master Token!\`] },
          { code: 123, indent: 0, parameters: ["A", 0] },
          { code: 0, indent: 0, parameters: [] }
        ],
        moveFrequency: 3,
        moveRoute: { list: [{ code: 0, parameters: [] }], repeat: true, skippable: false, wait: false },
        moveSpeed: 3,
        moveType: 0,
        priorityType: 1,
        stepAnime: false,
        through: false,
        trigger: 0,
        walkAnime: true
      }
    ],
    x: 0,
    y: 0
  };
  
  // Write completion event to file
  const completionFilePath = path.join(tempEventsDir, \`\${questLine.name.toLowerCase().replace(/\\s+/g, '')}_completion.json\`);
  fs.writeFileSync(completionFilePath, JSON.stringify(completionEvent, null, 2));
  console.log(\`Created quest line completion event: \${completionFilePath}\`);
});

console.log("\\nEvent files created successfully!");
console.log("\\nTo add these events to the game use the add_quest_events_to_maps.js script.");
`;

  // Write the script to a file
  fs.writeFileSync('add_all_quest_lines.js', content);
  console.log('Created script to add all quest lines: add_all_quest_lines.js');
}

// Main function
function main() {
  const questLineCount = combineAllQuestLines();
  createQuestLinesSummary();
  createAddAllQuestLinesScript();
  
  console.log(`\nAll ${questLineCount} quest lines have been processed successfully!`);
  console.log('To add these quest lines to the game:');
  console.log('1. Run: node add_all_quest_lines.js');
  console.log('2. Run: node add_quest_events_to_maps.js');
}

// Run the main function
main();
