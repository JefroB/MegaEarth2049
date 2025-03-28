// Generate Single Quest Line Script for MegaEarth 2049
// This script generates a single quest line to avoid file size limitations

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
function updateCombinedQuestLinesFile(questLineVariable) {
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
  
  // Add new variable if it doesn't exist
  if (!existingImports.includes(questLineVariable)) {
    existingImports.push(questLineVariable);
  }
  
  if (!existingExports.includes(questLineVariable)) {
    existingExports.push(questLineVariable);
  }
  
  // Generate import statements
  const imports = existingImports.map(variable => {
    return `const ${variable} = require('./${variable}_quest.js');`;
  }).join('\n');
  
  // Generate export statements
  const exports = existingExports.join(',\n    ');
  
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

// Main function to generate a quest line
function generateQuestLine(questLine) {
  console.log("Generating quest line: " + questLine.name);
  
  // Generate quest line file
  const variableName = toCamelCase(questLine.name);
  writeQuestLineToFile(questLine, variableName);
  
  // Update combined_quest_lines.js file
  updateCombinedQuestLinesFile(variableName);
  
  console.log("\nQuest line generated successfully!");
  console.log("To implement this quest line in the game, run:");
  console.log("node add_optional_quest_lines.js ./combined_quest_lines.js");
}

// Define the quest line
const questLine = {
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
        effect: "Ability to create simple
