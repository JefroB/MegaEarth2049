// Script to add all quest lines to the game
const fs = require('fs');
const path = require('path');

// Import all quest lines
const questLines = require('./all_quest_lines.js');

console.log(`Processing ${questLines.length} quest lines...`);

// Create temp_events directory if it doesn't exist
const tempEventsDir = path.join(__dirname, 'temp_events');
if (!fs.existsSync(tempEventsDir)) {
  fs.mkdirSync(tempEventsDir);
}

// Process each quest line
questLines.forEach(questLine => {
  try {
    console.log(`Processing "${questLine.name}" quest line...`);
    
    // Skip if the quest line doesn't have the required properties
    if (!questLine.startingNPC || !questLine.startingNPC.name || !questLine.startingNPC.dialogueIntro) {
      console.log(`  Skipping "${questLine.name}" quest line: Missing required properties`);
      return;
    }
    
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
    const startingNPCFilePath = path.join(tempEventsDir, `${questLine.name.toLowerCase().replace(/\s+/g, '')}_starting_npc.json`);
    fs.writeFileSync(startingNPCFilePath, JSON.stringify(startingNPCEvent, null, 2));
    console.log(`Created starting NPC: ${startingNPCFilePath}`);
    
    // Skip if the quest line doesn't have quests
    if (!questLine.quests || !Array.isArray(questLine.quests)) {
      console.log(`  Skipping "${questLine.name}" quest line: No quests found`);
      return;
    }
    
    // Process each quest in the quest line
    questLine.quests.forEach((quest, questIndex) => {
      try {
        console.log(`  Processing "${quest.name}" side quest...`);
        
        // Process each objective in the quest
        quest.objectives.forEach((objective, objectiveIndex) => {
          try {
            // Create objective event
            const objectiveEvent = {
              id: 1, // Will be assigned by the map
              name: `${questLine.name} - ${quest.name} - Objective ${objectiveIndex + 1}`,
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
                    { code: 401, indent: 1, parameters: [`Received ${objective.reward}!`] },
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
            const objectiveFilePath = path.join(tempEventsDir, `${questLine.name.toLowerCase().replace(/\s+/g, '')}_${questIndex}_objective_${objectiveIndex}.json`);
            fs.writeFileSync(objectiveFilePath, JSON.stringify(objectiveEvent, null, 2));
          } catch (error) {
            console.error(`    Error processing objective ${objectiveIndex} of quest "${quest.name}": ${error.message}`);
          }
        });
        
        console.log(`  Created objectives for "${quest.name}"`);
      } catch (error) {
        console.error(`  Error processing quest "${quest.name}": ${error.message}`);
      }
    });
    
    // Create quest line completion event
    const completionEvent = {
      id: 1, // Will be assigned by the map
      name: `${questLine.name} - Completion`,
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
            { code: 401, indent: 0, parameters: [`Received ${questLine.name} Master Token!`] },
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
    const completionFilePath = path.join(tempEventsDir, `${questLine.name.toLowerCase().replace(/\s+/g, '')}_completion.json`);
    fs.writeFileSync(completionFilePath, JSON.stringify(completionEvent, null, 2));
    console.log(`Created quest line completion event: ${completionFilePath}`);
  } catch (error) {
    console.error(`Error processing quest line "${questLine.name}": ${error.message}`);
  }
});

console.log("\nEvent files created successfully!");
console.log("\nTo add these events to the game use the add_quest_events_to_maps.js script.");
