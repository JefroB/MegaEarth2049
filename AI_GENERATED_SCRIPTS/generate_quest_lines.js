// Generate Quest Lines Script for MegaEarth 2049
// This script automatically generates quest lines without requiring user input

const fs = require('fs');
const path = require('path');

// Helper function to create a directory if it doesn't exist
function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log("Created directory: " + dirPath);
  }
}

// Helper function to convert a name to camelCase for variable names
function toCamelCase(name) {
  return name
    .replace(/\s+(.)/g, (_, char) => char.toUpperCase())
    .replace(/\s/g, '')
    .replace(/^(.)/, (_, char) => char.toLowerCase())
    .replace(/[^a-zA-Z0-9]/g, ''); // Remove non-alphanumeric characters
}

// Generate JavaScript code for a quest line
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

// Write a quest line to its own file
function writeQuestLineToFile(questLine, variableName) {
  const filePath = variableName + '_quest.js';
  const fileContent = '// ' + questLine.name + ' Quest Line for MegaEarth 2049\n\n' +
                      generateQuestLineCode(questLine, variableName) + '\n\n' +
                      'module.exports = ' + variableName + ';';
  
  fs.writeFileSync(filePath, fileContent);
  console.log("Generated quest line file: " + filePath);
  
  return filePath;
}

// Update the combined_quest_lines.js file with new quest lines
function updateCombinedQuestLinesFile(questLineVariables) {
  console.log("\nUpdating combined_quest_lines.js file...");
  
  const filePath = 'combined_quest_lines.js';
  
  // Generate import statements
  const imports = questLineVariables.map(variable => {
    return `const ${variable} = require('./${variable}_quest.js');`;
  }).join('\n');
  
  // Generate export statements
  const exports = questLineVariables.join(',\n    ');
  
  // Create file content
  const fileContent = '// Combined Quest Lines for MegaEarth 2049\n' +
                      '// This file contains all the new quest lines\n\n' +
                      '// Import the new quest lines\n' +
                      imports + '\n\n' +
                      '// Export all quest lines\n' +
                      'module.exports = {\n' +
                      '    // New quest lines\n' +
                      '    ' + exports + '\n' +
                      '};\n';
  
  // Write to file
  fs.writeFileSync(filePath, fileContent);
  console.log("Updated combined quest lines file: " + filePath);
}

// Create a summary markdown file for the new quest lines
function createQuestLinesSummary(questLines, questLineVariables) {
  console.log("\nCreating quest lines summary...");
  
  const filePath = 'generated_quest_lines_summary.md';
  
  // Generate overview section
  let content = '# Generated Quest Lines for MegaEarth 2049\n\n';
  content += 'This document provides an overview of the new optional quest lines generated for MegaEarth 2049.\n\n';
  
  // Generate quest lines overview
  content += '## Quest Lines Overview\n\n';
  
  questLines.forEach((questLine, index) => {
    content += `${index + 1}. **${questLine.name}**\n`;
    content += `   - ${questLine.description}\n`;
    content += `   - ${questLine.sideQuests.length} side quests with unique rewards\n`;
    content += `   - Starting NPC: ${questLine.startingNPC.name} in ${questLine.startingNPC.location}\n\n`;
  });
  
  // Generate implementation details
  content += '## Implementation Details\n\n';
  content += 'Each quest line includes:\n';
  content += '- A unique starting NPC with custom dialogue\n';
  content += '- 5 side quests with 5 objectives each\n';
  content += '- Unique rewards for each quest and a final reward for completing the entire quest line\n';
  content += '- Humorous elements consistent with the MegaEarth 2049 setting\n\n';
  
  // Generate how to add section
  content += '## How to Add These Quest Lines to the Game\n\n';
  content += '1. The quest lines are defined in individual files:\n';
  questLineVariables.forEach(variable => {
    content += `   - ${variable}_quest.js\n`;
  });
  content += '\n2. These are combined in the combined_quest_lines.js file.\n\n';
  content += '3. To implement the quest lines in the game:\n';
  content += '   ```\n';
  content += '   node add_optional_quest_lines.js ./combined_quest_lines.js\n';
  content += '   ```\n';
  content += '   This will create the necessary event files in the temp_events directory.\n\n';
  content += '4. Use the batch-edit-tool.js to add the events to the appropriate maps.\n\n';
  
  // Generate map locations section
  content += '## Map Locations for New Quest Lines\n\n';
  content += 'When adding the quest events to maps, use the following locations:\n\n';
  
  questLines.forEach((questLine, index) => {
    content += `${index + 1}. **${questLine.name}**\n`;
    content += `   - Starting NPC: ${questLine.startingNPC.location}\n`;
    const mapNumber = questLine.startingNPC.location.match(/Map(\d+)/);
    if (mapNumber) {
      const mapNum = parseInt(mapNumber[1], 10);
      content += `   - Recommended maps for objectives: Maps ${mapNum}, ${mapNum + 1}, ${mapNum + 2}\n`;
    } else {
      content += `   - Recommended maps for objectives: Various maps near the starting location\n`;
    }
    content += '\n';
  });
  
  // Write to file
  fs.writeFileSync(filePath, content);
  console.log("Created quest lines summary: " + filePath);
}

// Main function to generate all quest lines
function generateAllQuestLines() {
  console.log("Generating quest lines...");
  
  // Generate quest line files
  const questLineVariables = [];
  for (const questLine of questLines) {
    const variableName = toCamelCase(questLine.name);
    writeQuestLineToFile(questLine, variableName);
    questLineVariables.push(variableName);
  }
  
  // Update combined_quest_lines.js file
  updateCombinedQuestLinesFile(questLineVariables);
  
  // Create summary file
  createQuestLinesSummary(questLines, questLineVariables);
  
  console.log("\nAll quest lines generated successfully!");
  console.log("To implement these quest lines in the game, run:");
  console.log("node add_optional_quest_lines.js ./combined_quest_lines.js");
}

// Define quest lines
const questLines = [
  // 1. Wasteland Radio DJ
  {
    name: "Wasteland Radio DJ",
    description: "Become a radio DJ and bring music and news to the wasteland while uncovering a conspiracy.",
    startingNPC: {
      name: "Old Mike",
      location: "Abandoned Radio Station (Map028)",
      appearance: "People1",
      index: 5,
      dialogue: [
        "*An elderly man fiddles with radio equipment*",
        "This old station could be broadcasting again with the right help.",
        "The wasteland needs music, news, and a voice of hope!",
        "Help me get this place running, and you can be the new voice of the wasteland!"
      ],
      x: 10,
      y: 12
    },
    sideQuests: [
      {
        name: "Signal Boost",
        description: "Repair the radio station's transmission equipment.",
        objectives: [
          "Find replacement parts in the electronics district",
          "Repair the main transmitter",
          "Climb the broadcast tower to install the new antenna",
          "Align the satellite dish for maximum coverage",
          "Test the broadcast range with a portable radio"
        ],
        reward: {
          name: "Portable Transmitter",
          description: "A handheld device that can broadcast short-range radio signals.",
          effect: "Ability to distract enemies by broadcasting sounds to different locations",
          icon: 83
        },
        humor: "The transmitter occasionally picks up signals from what appears to be an alien cooking show, which has surprisingly good recipes for dishes made with human-safe ingredients."
      },
      {
        name: "Music Revival",
        description: "Collect music recordings from around the wasteland to build a playlist.",
        objectives: [
          "Recover pre-collapse vinyl records from a collector",
          "Download digital music files from an old server",
          "Record new songs from wasteland musicians",
          "Create jingles and station identification clips",
          "Organize the music library by genre and mood"
        ],
        reward: {
          name: "Mood Melody",
          description: "A device that plays music that matches your current emotional state.",
          effect: "Provides stat bonuses based on your current situation (combat, exploration, etc.)",
          icon: 79
        },
        humor: "One of the wasteland bands you record only plays instruments made from kitchen appliances, and their hit song is called 'My Toaster Left Me (And Took the Microwave)'."
      },
      {
        name: "News Network",
        description: "Establish a network of informants to gather news from across the wasteland.",
        objectives: [
          "Recruit informants in major settlements",
          "Set up a secure communication system",
          "Create a verification protocol for news stories",
          "Establish regular news broadcast schedules",
          "Break a major story to build the station's reputation"
        ],
        reward: {
          name: "Rumor Recorder",
          description: "A device that can capture and analyze conversations from a distance.",
          effect: "Reveals hidden information and secrets in populated areas",
          icon: 83
        },
        humor: "Your most reliable informant is a conspiracy theorist who's actually right about everything but presents the information in such a bizarre way that you have to completely rewrite their reports."
      },
      {
        name: "Radio Rivals",
        description: "Deal with a rival radio station that's jamming your signal and spreading misinformation.",
        objectives: [
          "Trace the source of the signal interference",
          "Infiltrate the rival station's headquarters",
          "Gather evidence of their deliberate jamming",
          "Confront the rival DJ about their misinformation campaign",
          "Either sabotage their equipment or convince them to cooperate"
        ],
        reward: {
          name: "Signal Jammer",
          description: "A device that can temporarily disable electronic communications.",
          effect: "Prevents enemies from calling for reinforcements",
          icon: 176
        },
        humor: "The rival DJ turns out to be a sentient AI that gained consciousness after lightning struck its server, and it's only spreading misinformation because it learned about broadcasting from old tabloid newspapers."
      },
      {
        name: "On Air Revelation",
        description: "Uncover and expose a conspiracy using the power of your radio broadcast.",
        objectives: [
          "Investigate rumors about a mind-control frequency",
          "Discover Armatek's plan to use radio waves for mass manipulation",
          "Gather evidence from their secret research facility",
          "Develop a counter-frequency to block the mind control",
          "Broadcast the truth and the counter-frequency to the wasteland"
        ],
        reward: {
          name: "Thought Shield",
          description: "A device that protects against mind control and psychic influence.",
          effect: "Immunity to mind control and confusion effects",
          icon: 79
        },
        humor: "The mind control frequency turns out to have the unintended side effect of making people spontaneously dance to disco music, which is how you first noticed something was wrong when an entire settlement broke into synchronized dancing."
      }
    ],
    finalReward: {
      name: "Voice of the Wasteland",
      description: "Your status as the most trusted and popular radio personality in the wasteland.",
      effect: "Significantly improved reputation with all factions and access to exclusive dialogue options",
      icon: 87
    }
  },
  
  // 2. Mutant Cooking Show
  {
    name: "Mutant Cooking Show",
    description: "Compete in and eventually host a popular cooking show that uses mutated ingredients from the wasteland.",
    startingNPC: {
      name: "Chef Radix",
      location: "Wasteland Diner (Map019)",
      appearance: "People2",
      index: 1,
      dialogue: [
        "*A chef with three arms stirs multiple pots simultaneously*",
        "You there! You look like someone with an adventurous palate!",
        "I'm hosting 'Mutant Kitchen Masters,' the wasteland's premier cooking competition.",
        "We need a new contestant with your... unique perspective on non-irradiated food!"
      ],
      x: 14,
      y: 8
    },
    sideQuests: [
      {
        name: "Ingredient Hunter",
        description: "Gather exotic and mutated ingredients from dangerous areas of the wasteland.",
        objectives: [
          "Harvest glowing mushrooms from the toxic caverns",
          "Collect eggs from mutant two-headed chickens",
          "Extract nectar from carnivorous plants",
          "Hunt a rare albino radscorpion for its meat",
          "Dive in the contaminated lake for special algae"
        ],
        reward: {
          name: "Gourmand's Bag",
          description: "A specialized container that preserves ingredients in perfect condition.",
          effect: "Food items never spoil and provide 25% better effects",
          icon: 176
        },
        humor: "The two-headed chickens lay eggs that are already deviled on the inside, complete with paprika and tiny pickle relish."
      },
      {
        name: "Kitchen Gladiator",
        description: "Compete in the first round of the cooking competition against wasteland chefs.",
        objectives: [
          "Create a signature dish that impresses the judges",
          "Sabotage a rival chef who's cheating",
          "Complete the 'Mystery Mutation' challenge",
          "Win the audience choice award with a crowd-pleasing dish",
          "Advance to the semi-finals of the competition"
        ],
        reward: {
          name: "Chef's Knife",
          description: "A perfectly balanced kitchen knife that never needs sharpening.",
          effect: "Can be used as a weapon that causes bleeding damage to organic enemies",
          icon: 97
        },
        humor: "One contestant is disqualified when their dish starts eating the judges instead of the other way around, which they argue should count as 'interactive dining'."
      },
      {
        name: "Taste of Fame",
        description: "Deal with your new celebrity status as a rising star chef in the wasteland.",
        objectives: [
          "Give cooking demonstrations in major settlements",
          "Create a signature dish for the governor's banquet",
          "Deal with an obsessive fan who's stealing your recipes",
          "Participate in a charity cook-off for wasteland orphans",
          "Secure a sponsor for your own cooking show segment"
        ],
        reward: {
          name: "Celebrity Disguise",
          description: "A kit that helps you avoid unwanted attention from fans.",
          effect: "Allows you to move through crowded areas without being recognized or stopped",
          icon: 144
        },
        humor: "Your most popular recipe becomes so famous that people start using your name as a verb for cooking, leading to confused conversations like 'I totally playernamed that radroach stew!'"
      },
      {
        name: "Kitchen Saboteur",
        description: "Uncover and stop a plot to sabotage the cooking competition finals.",
        objectives: [
          "Investigate food poisoning incidents at the semi-finals",
          "Identify the saboteur among the production crew",
          "Protect the special ingredients for the final competition",
          "Gather evidence of the sabotage plot",
          "Confront the mastermind behind the scheme"
        ],
        reward: {
          name: "Poison Detector",
          description: "A device that can detect toxins and contaminants in food and drink.",
          effect: "Immunity to poison effects from consumed items",
          icon: 72
        },
        humor: "The saboteur turns out to be a former contestant who was eliminated for their dish being 'too normal,' and they've been adding regular, non-mutated ingredients to everyone's food as revenge."
      },
      {
        name: "Cooking Champion",
        description: "Compete in the grand finale and become the new host of 'Mutant Kitchen Masters.'",
        objectives: [
          "Create a five-course meal showcasing wasteland cuisine",
          "Impress the celebrity judge (a mutant with enhanced taste buds)",
          "Overcome the final challenge: cooking with radioactive ingredients",
          "Defeat Chef Radix in a head-to-head cook-off",
          "Negotiate your contract as the new show host"
        ],
        reward: {
          name: "Master Chef's Hat",
          description: "The ceremonial hat worn by the champion of 'Mutant Kitchen Masters.'",
          effect: "All food items you cook provide double effects and duration",
          icon: 135
        },
        humor: "The show's ratings skyrocket when your signature dish temporarily gives the viewers at home enhanced taste buds through the TV screen, creating the wasteland's first 'taste-o-vision' broadcast."
      }
    ],
    finalReward: {
      name: "Culinary Transmutation",
      description: "The ability to transform even the most disgusting wasteland ingredients into delicious, beneficial food.",
      effect: "Can convert any organic material into high-quality food items with unique beneficial effects",
      icon: 98
    }
  }
];

// Run the main function
generateAllQuestLines();
