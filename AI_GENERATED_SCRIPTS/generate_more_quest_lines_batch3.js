// Generate More Quest Lines Script for MegaEarth 2049 - Batch 3
// This script adds more quest lines in smaller batches to avoid file size limitations

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
  
  // Read existing combined_quest_lines.js file
  let existingContent = '';
  try {
    existingContent = fs.readFileSync(filePath, 'utf8');
  } catch (error) {
    console.log("Creating new combined_quest_lines.js file");
  }
  
  // Extract existing imports and exports
  let existingImports = [];
  let existingExports = [];
  
  if (existingContent) {
    // Extract existing imports
    const importsMatch = existingContent.match(/const\s+(\w+)\s*=\s*require\(['"]\.\/(.*)['"]\);/g);
    if (importsMatch) {
      existingImports = importsMatch.map(line => {
        const match = line.match(/const\s+(\w+)\s*=/);
        return match ? match[1] : null;
      }).filter(Boolean);
    }
    
    // Extract existing exports
    const exportsMatch = existingContent.match(/module\.exports\s*=\s*{([^}]*)}/s);
    if (exportsMatch && exportsMatch[1]) {
      existingExports = exportsMatch[1].split(',')
        .map(line => line.trim())
        .filter(line => line && !line.startsWith('//'))
        .map(line => {
          const match = line.match(/(\w+)/);
          return match ? match[1] : null;
        }).filter(Boolean);
    }
  }
  
  // Combine existing and new variables
  const allImports = [...new Set([...existingImports, ...questLineVariables])];
  const allExports = [...new Set([...existingExports, ...questLineVariables])];
  
  // Generate import statements
  const imports = allImports.map(variable => {
    return `const ${variable} = require('./${variable}_quest.js');`;
  }).join('\n');
  
  // Generate export statements
  const exports = allExports.join(',\n    ');
  
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
  
  // Read existing summary file
  let existingContent = '';
  try {
    existingContent = fs.readFileSync(filePath, 'utf8');
  } catch (error) {
    console.log("Creating new summary file");
  }
  
  // Extract existing quest lines
  let existingQuestLines = [];
  if (existingContent) {
    const questLinesMatch = existingContent.match(/\d+\.\s+\*\*([^*]+)\*\*/g);
    if (questLinesMatch) {
      existingQuestLines = questLinesMatch.map(line => {
        const match = line.match(/\*\*([^*]+)\*\*/);
        return match ? match[1] : null;
      }).filter(Boolean);
    }
  }
  
  // Generate overview section
  let content = '# Generated Quest Lines for MegaEarth 2049\n\n';
  content += 'This document provides an overview of the new optional quest lines generated for MegaEarth 2049.\n\n';
  
  // Generate quest lines overview
  content += '## Quest Lines Overview\n\n';
  
  // Combine existing and new quest lines
  const allQuestLines = [...questLines];
  if (existingQuestLines.length > 0) {
    // Find existing quest lines in the new quest lines array
    for (const existingName of existingQuestLines) {
      const exists = allQuestLines.some(ql => ql.name === existingName);
      if (!exists) {
        // Add a placeholder for existing quest lines not in the new array
        allQuestLines.push({
          name: existingName,
          description: "(Previously added quest line)",
          sideQuests: [{}],
          startingNPC: { name: "", location: "" }
        });
      }
    }
  }
  
  allQuestLines.forEach((questLine, index) => {
    content += `${index + 1}. **${questLine.name}**\n`;
    content += `   - ${questLine.description}\n`;
    content += `   - ${questLine.sideQuests.length} side quests with unique rewards\n`;
    if (questLine.startingNPC.name && questLine.startingNPC.location) {
      content += `   - Starting NPC: ${questLine.startingNPC.name} in ${questLine.startingNPC.location}\n`;
    }
    content += '\n';
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
  
  allQuestLines.forEach((questLine, index) => {
    content += `${index + 1}. **${questLine.name}**\n`;
    if (questLine.startingNPC.location) {
      content += `   - Starting NPC: ${questLine.startingNPC.location}\n`;
      const mapNumber = questLine.startingNPC.location.match(/Map(\d+)/);
      if (mapNumber) {
        const mapNum = parseInt(mapNumber[1], 10);
        content += `   - Recommended maps for objectives: Maps ${mapNum}, ${mapNum + 1}, ${mapNum + 2}\n`;
      } else {
        content += `   - Recommended maps for objectives: Various maps near the starting location\n`;
      }
    }
    content += '\n';
  });
  
  // Write to file
  fs.writeFileSync(filePath, content);
  console.log("Created quest lines summary: " + filePath);
}

// Main function to generate quest lines
function generateQuestLines(questLines) {
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

// Define quest lines - Batch 3 (3 quest lines)
const questLinesBatch3 = [
  // 1. Digital Graffiti
  {
    name: "Digital Graffiti",
    description: "Join a group of artistic hackers who use augmented reality to create subversive art installations throughout the city.",
    startingNPC: {
      name: "Pixel",
      location: "Abandoned Gallery (Map061)",
      appearance: "Actor3",
      index: 2,
      dialogue: [
        "*A figure in a hoodie covered in tiny LED displays projects a holographic tag onto the wall*",
        "You see that? Most people walk right past it. Their reality filters are set too tight.",
        "We're the Augmented Vandals. We hack the city's AR infrastructure to make people question what's real.",
        "You look like someone who can see beyond the obvious. Want to help us make some digital noise?"
      ],
      x: 11,
      y: 9
    },
    sideQuests: [
      {
        name: "Reality Canvas",
        description: "Learn the basics of augmented reality hacking and create your first digital graffiti piece.",
        objectives: [
          "Acquire a modified AR headset from the Augmented Vandals",
          "Learn to use the basic AR creation tools",
          "Hack into a local AR node to gain access to public space",
          "Create your first digital graffiti piece in a prominent location",
          "Escape before security forces trace your signal"
        ],
        reward: {
          name: "AR Stylus",
          description: "A tool that allows you to create and manipulate augmented reality objects.",
          effect: "Ability to create simple AR illusions that can distract or confuse enemies",
          icon: 83
        },
        humor: "Your first AR creation accidentally includes metadata with your embarrassing username from when you were thirteen, causing your revolutionary art piece to be signed 'XxDarkNinja420xX' in glowing letters visible to anyone with AR access."
      },
      {
        name: "Corporate Canvas",
        description: "Infiltrate corporate headquarters to replace their AR advertisements with subversive art.",
        objectives: [
          "Scout the security systems at Armatek's headquarters",
          "Create a specialized AR overlay that can replace corporate imagery",
          "Hack into the building's AR infrastructure during a public event",
          "Replace the corporate advertisements with your team's manifesto art",
          "Record public reactions to use in future installations"
        ],
        reward: {
          name: "Reality
