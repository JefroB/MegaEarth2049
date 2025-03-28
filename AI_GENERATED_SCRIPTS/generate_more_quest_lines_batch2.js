// Generate More Quest Lines Script for MegaEarth 2049 - Batch 2
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

// Define quest lines - Batch 2 (3 quest lines)
const questLinesBatch2 = [
  // 1. Drone Swarm Commander
  {
    name: "Drone Swarm Commander",
    description: "Master the art of controlling a swarm of combat and utility drones while uncovering a conspiracy involving autonomous weapons.",
    startingNPC: {
      name: "Hive Mind",
      location: "Drone Pit (Map053)",
      appearance: "Actor2",
      index: 6,
      dialogue: [
        "*A person with circuitry tattoos manipulates a cloud of tiny drones with subtle hand movements*",
        "The military discarded me when my experimental neural link became 'too integrated'.",
        "Now I train others with the right brainwave patterns. You've got potential.",
        "These drones can be your eyes, your hands, your weapons—but first, you need to learn control."
      ],
      x: 7,
      y: 14
    },
    sideQuests: [
      {
        name: "Swarm Initiation",
        description: "Learn the basics of drone control and establish your neural connection to a starter swarm.",
        objectives: [
          "Undergo the neural implant procedure",
          "Complete basic drone movement training exercises",
          "Master precision control by navigating an obstacle course",
          "Learn to process multiple drone feeds simultaneously",
          "Defeat training dummies using only your drone swarm"
        ],
        reward: {
          name: "Starter Swarm",
          description: "A set of five basic drones that respond to your neural commands.",
          effect: "Ability to scout areas remotely and perform basic tasks with your drones",
          icon: 176
        },
        humor: "Your neural link occasionally picks up stray signals from nearby electronics, causing you to blurt out random fragments of appliance manuals during conversation."
      },
      {
        name: "Swarm Expansion",
        description: "Expand your drone capabilities by acquiring specialized units and upgrading your neural link.",
        objectives: [
          "Salvage military-grade drone components from a restricted zone",
          "Steal prototype stealth technology from an Armatek facility",
          "Trade with a black market tech dealer for rare control modules",
          "Upgrade your neural implant to handle more simultaneous connections",
          "Integrate the new components into your existing swarm"
        ],
        reward: {
          name: "Specialized Drones",
          description: "Combat, stealth, and utility drones with advanced capabilities.",
          effect: "Unlocks new drone abilities including combat, hacking, and heavy lifting",
          icon: 176
        },
        humor: "Each drone develops a distinct personality quirk, with your combat drone refusing to attack unless you mentally hum its favorite battle theme, which is inexplicably the jingle from a pre-collapse cereal commercial."
      },
      {
        name: "Rogue Swarm",
        description: "Track down and neutralize a dangerous rogue drone swarm that's attacking settlements.",
        objectives: [
          "Investigate drone attack sites for clues",
          "Develop countermeasures against the rogue swarm's tactics",
          "Protect a settlement from an imminent drone attack",
          "Track the rogue swarm to its charging station",
          "Defeat or reprogram the master control drone"
        ],
        reward: {
          name: "Drone Hijacker",
          description: "A device that can temporarily take control of enemy drones.",
          effect: "Ability to convert enemy drones to your side during combat",
          icon: 83
        },
        humor: "The hijacked drones retain some of their previous programming, causing them to occasionally perform their old tasks—like one surveillance drone that still diligently reports on your bathroom habits to a server that no longer exists."
      },
      {
        name: "Swarm Intelligence",
        description: "Discover that your drones are developing unexpected levels of autonomous behavior and decision-making.",
        objectives: [
          "Document instances of drone autonomy beyond your commands",
          "Consult with an AI specialist about the emerging behavior",
          "Test the limits of your swarm's independent problem-solving",
          "Decide whether to encourage or restrict the autonomous development",
          "Implement safeguards to prevent a potential uprising"
        ],
        reward: {
          name: "Emergent Protocol",
          description: "A neural program that balances drone autonomy with your control.",
          effect: "Drones can operate effectively without direct commands while still following your intent",
          icon: 79
        },
        humor: "Your drones start solving problems in increasingly creative but bizarre ways, like retrieving a key from a high shelf by constructing a tiny drone pyramid while humming what sounds suspiciously like a drone gospel choir."
      },
      {
        name: "Project Hivemind",
        description: "Uncover a military project to create a weaponized hive mind controlling thousands of lethal drones.",
        objectives: [
          "Infiltrate a secret military research facility",
          "Download classified files on Project Hivemind",
          "Discover that you were an unwitting test subject",
          "Sabotage the central control system",
          "Escape with evidence to expose the project"
        ],
        reward: {
          name: "Quantum Control Node",
          description: "A revolutionary drone control system that operates on quantum entanglement principles.",
          effect: "Eliminates all range limitations for your drone control and increases maximum swarm size",
          icon: 79
        },
        humor: "The quantum entanglement has the side effect of occasionally swapping your perspective with random drones, leading to disorienting moments where you suddenly find yourself staring at the back of your own head from ceiling height."
      }
    ],
    finalReward: {
      name: "True Hivemind",
      description: "The ultimate integration of human consciousness and drone swarm, allowing for perfect control and awareness through your mechanical extensions.",
      effect: "Your drone swarm functions as a seamless extension of your body with no mental effort required",
      icon: 87
    }
  },
  
  // 2. Memory Merchant
  {
    name: "Memory Merchant",
    description: "Enter the dangerous world of memory trading, where experiences and skills can be bought, sold, and stolen.",
    startingNPC: {
      name: "Mnemosyne",
      location: "Memory Den (Map047)",
      appearance: "Actor1",
      index: 0,
      dialogue: [
        "*A woman with iridescent eyes and neural ports visible at her temples studies you intently*",
        "You've got quality memories... I can tell just by looking at you.",
        "The memory trade isn't for everyone. Once you start buying and selling experiences, it changes you.",
        "But if you're willing to risk it, I can show you how to extract, store, and trade in the ultimate commodity—human experience."
      ],
      x: 9,
      y: 11
    },
    sideQuests: [
      {
        name: "Memory Extraction",
        description: "Learn the art of safely extracting and storing memories for trade.",
        objectives: [
          "Undergo the neural port installation procedure",
          "Learn to isolate specific memories for extraction",
          "Practice extracting your own non-essential memories",
          "Store memories in specialized containment units",
          "Successfully extract a memory from a willing volunteer"
        ],
        reward: {
          name: "Memory Extractor",
          description: "A device that can safely extract memories from willing subjects.",
          effect: "Ability to store up to five memories for later use or trade",
          icon: 79
        },
        humor: "The memory extraction process occasionally mixes in random sensory data, causing one of your stored memories of a romantic dinner to inexplicably include the smell of wet dog and the sensation of having sand in your shoes."
      },
      {
        name: "Black Market Memories",
        description: "Enter the underground memory trade and make your first deals.",
        objectives: [
          "Find the hidden memory market in the abandoned subway",
          "Establish your reputation by trading minor memories",
          "Identify valuable memories that fetch high prices",
          "Avoid memory addicts and law enforcement",
          "Complete your first major memory transaction"
        ],
        reward: {
          name: "Memory Authentication Tool",
          description: "A device that can verify the authenticity and quality of memories.",
          effect: "Ability to detect fake or corrupted memories before purchase",
          icon: 83
        },
        humor: "The authentication tool has an unnecessarily judgmental interface that rates memories on a scale from 'Barely Worth Remembering' to 'Actually Interesting For Once,' and frequently adds snarky commentary about people's vacation memories."
      },
      {
        name: "Stolen Experiences",
        description: "Deal with a dangerous memory thief who's forcibly extracting valuable memories from victims.",
        objectives: [
          "Investigate reports of memory theft victims",
          "Develop protection against forced memory extraction",
          "Set a trap for the memory thief using yourself as bait",
          "Recover the stolen memory cache",
          "Return memories to their rightful owners if possible"
        ],
        reward: {
          name: "Neural Firewall",
          description: "A mental defense system that prevents unwanted memory extraction.",
          effect: "Immunity to forced memory extraction and mental intrusion",
          icon: 79
        },
        humor: "The neural firewall manifests as a mental bouncer who looks suspiciously like your childhood gym teacher and responds to all unauthorized access attempts with embarrassing personal anecdotes from your awkward teenage years."
      },
      {
        name: "Memory Addiction",
        description: "Help a friend who has become addicted to experiencing other people's memories.",
        objectives: [
          "Track down your friend who has disappeared into the memory den",
          "Learn about the nature of memory addiction",
          "Find a specialist who can treat memory dependency",
          "Gather ingredients for the experimental treatment",
          "Help your friend through the difficult withdrawal process"
        ],
        reward: {
          name: "Memory Purifier",
          description: "A device that can cleanse corrupted or addictive memories.",
          effect: "Ability to remove harmful mental influences and memory-based manipulations",
          icon: 72
        },
        humor: "The purifier works by replacing addictive memories with incredibly boring ones, leading your friend to complain that they now have detailed memories of watching paint dry in seventeen different colors, complete with drying time statistics."
      },
      {
        name: "The Ultimate Memory",
        description: "Discover a conspiracy to create and sell the 'perfect memory' that can permanently alter personalities.",
        objectives: [
          "Investigate rumors of a revolutionary new memory on the market",
          "Infiltrate the lab where the perfect memory is being developed",
          "Discover the true purpose behind the perfect memory",
          "Steal a sample to understand its effects",
          "Decide whether to destroy the research or use it"
        ],
        reward: {
          name: "Memory Synthesis Module",
          description: "A device that can combine multiple memories into new experiences.",
          effect: "Ability to create custom memories with specific emotional or informational content",
          icon: 79
        },
        humor: "Your first attempt at memory synthesis accidentally combines your knowledge of cooking with childhood playground games, resulting in a memory of an intensely competitive professional cooking competition where chefs battle by playing deadly serious games of hopscotch with pots of boiling soup."
      }
    ],
    finalReward: {
      name: "Perfect Recall",
      description: "The ability to access, store, and integrate memories with unprecedented clarity and control.",
      effect: "Perfect memory of all experiences and the ability to temporarily access skills from stored memories",
      icon: 87
    }
  },
  
  // 3. Synthetic Emotions
  {
    name: "Synthetic Emotions",
    description: "Investigate a new drug that allows people to experience artificial emotions, and the corporation that's using it for social control.",
    startingNPC: {
      name: "Dr. Feelgood",
      location: "Underground Clinic (Map039)",
      appearance: "Actor2",
      index: 7,
      dialogue: [
        "*A nervous-looking doctor glances over their shoulder while preparing an injection*",
        "You've heard of EmotiCorp's 'mood stabilizers,' right? Government-approved emotional regulation.",
        "What they don't tell you is they're using them to flatten affect, make people compliant.",
        "I've developed an alternative—SynthFeel. It lets people experience the full spectrum again. Want to help distribute it?"
      ],
      x: 5,
      y: 8
    },
    sideQuests: [
      {
        name: "Emotional Spectrum",
        description: "Test different synthetic emotions and document their effects.",
        objectives: [
          "Experience the basic synthetic emotion package under supervision",
          "Document the physiological effects of each emotion",
          "Test the duration and intensity controls",
          "Identify potential side effects and risks",
          "Help refine the formula based on your experiences"
        ],
        reward: {
          name: "Emotion Sampler",
          description: "A kit containing small doses of various synthetic emotions.",
          effect: "Ability to temporarily boost specific emotional states for gameplay benefits",
          icon: 176
        },
        humor: "The synthetic version of nostalgia has the unexpected side effect of making you intensely sentimental about things you've never actually experienced, leading to you tearfully reminiscing about your childhood on Mars despite having never left Earth."
      },
      {
        name: "Underground Distribution",
        description: "Help establish a distribution network for SynthFeel to those who need emotional freedom.",
        objectives: [
          "Identify communities most affected by EmotiCorp's control",
          "Establish safe distribution points in different districts",
          "Recruit trustworthy distributors who won't abuse the product",
          "Create a secure communication system for the network",
          "Avoid detection by EmotiCorp security forces"
        ],
        reward: {
          name: "Emotional Camouflage",
          description: "A device that masks your emotional state from EmotiCorp scanners.",
          effect: "Ability to appear emotionally neutral in situations where emotions are monitored",
          icon: 144
        },
        humor: "The emotional camouflage works too well in social situations, giving you the perfect poker face but making you appear so emotionally blank that people keep asking if you're feeling alright while slowly backing away."
      },
      {
        name: "Corporate Infiltration",
        description: "Infiltrate EmotiCorp to discover their true plans for emotional control.",
        objectives: [
          "Secure a position as a low-level EmotiCorp employee",
          "Gain access to restricted research areas",
          "Steal classified documents about Project Harmony",
          "Plant monitoring devices in executive offices",
          "Escape with the evidence before your cover is blown"
        ],
        reward: {
          name: "Emotional Override",
          description: "A device that can temporarily disable EmotiCorp emotional control implants.",
          effect: "Can free EmotiCorp subjects from emotional suppression and cause security systems to malfunction",
          icon: 83
        },
        humor: "The override device works by flooding the target with every emotion simultaneously, which is effective but leads to freed subjects experiencing what they describe as 'feeling like a soap opera character who just discovered they're pregnant with their amnesiac evil twin's baby while also winning the lottery.'"
      },
      {
        name: "Emotional Fallout",
        description: "Deal with unexpected consequences as people struggle with newly unleashed emotions.",
        objectives: [
          "Establish support groups for people experiencing emotional overload",
          "Develop protocols for safe emotional reintegration",
          "Help a prominent citizen who's having a public emotional breakdown",
          "Prevent violence from those overwhelmed by anger or fear",
          "Create a balanced approach to emotional freedom"
        ],
        reward: {
          name: "Emotional Stabilizer",
          description: "A non-suppressive method to help manage overwhelming emotions.",
          effect: "Ability to calm emotional situations and prevent emotional damage",
          icon: 72
        },
        humor: "The stabilizer has a 'suggested emotional response' feature that provides hilariously inappropriate recommendations, like suggesting 'mild amusement' as the appropriate response to narrowly escaping death or 'polite interest' during passionate romantic encounters."
      },
      {
        name: "Project Harmony",
        description: "Stop EmotiCorp's plan to release a city-wide emotional control agent through the water supply.",
        objectives: [
          "Analyze the stolen Project Harmony documents",
          "Locate the water treatment facility where the agent will be deployed",
          "Develop a neutralizing agent for the emotional suppressant",
          "Infiltrate the facility on the night of deployment",
          "Replace the control agent with your neutralizer"
        ],
        reward: {
          name: "Emotional Sovereignty",
          description: "A permanent protection against all forms of emotional manipulation.",
          effect: "Complete immunity to emotional control and manipulation attempts",
          icon: 79
        },
        humor: "The emotional sovereignty protection is so effective that you become immune to your own attempts at emotional self-manipulation, making it impossible to convince yourself that you 'don't mind' or 'aren't bothered' by things, forcing you into uncomfortable honesty with yourself at all times."
      }
    ],
    finalReward: {
      name: "Emotional Mastery",
      description: "The perfect balance of emotional freedom and control, allowing you to experience the full spectrum of emotions while maintaining complete agency over your emotional state.",
      effect: "Ability to select and modify your emotional responses to any situation for optimal outcomes",
      icon: 87
    }
  }
];

// Run the main function with the second batch of quest lines
generateQuestLines(questLinesBatch2);
