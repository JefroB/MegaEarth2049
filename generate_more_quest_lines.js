// Generate More Quest Lines Script for MegaEarth 2049
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

// Define quest lines - Batch 1 (3 quest lines)
const questLinesBatch1 = [
  // 1. Cybernetic Enhancement
  {
    name: "Cybernetic Enhancement",
    description: "Upgrade your body with experimental cybernetics while dealing with unexpected side effects.",
    startingNPC: {
      name: "Dr. Splice",
      location: "Back Alley Clinic (Map014)",
      appearance: "Actor2",
      index: 3,
      dialogue: [
        "*A doctor with mechanical arms adjusts a holographic display*",
        "You look like someone who wants to transcend the limitations of flesh.",
        "I've got some... experimental enhancements that could change your life.",
        "The procedures aren't exactly approved, but the results? Magnificent!"
      ],
      x: 8,
      y: 12
    },
    sideQuests: [
      {
        name: "Parts Acquisition",
        description: "Gather rare components needed for your first cybernetic enhancement.",
        objectives: [
          "Steal a prototype neural interface from Armatek Labs",
          "Recover military-grade servomotors from a crashed transport",
          "Extract bio-compatible alloys from an abandoned medical facility",
          "Purchase black market power cells from an underground dealer",
          "Collect rare earth magnets from old electronic devices"
        ],
        reward: {
          name: "Basic Neural Interface",
          description: "A rudimentary brain-computer interface that enhances reaction time.",
          effect: "10% increase to agility and 5% increase to perception",
          icon: 79
        },
        humor: "The neural interface occasionally translates your thoughts into bizarre food orders, causing you to shout 'EXTRA PICKLES!' during tense combat situations."
      },
      {
        name: "System Integration",
        description: "Undergo the first cybernetic procedure and adapt to your new enhancements.",
        objectives: [
          "Survive the initial installation procedure",
          "Complete basic motor function calibration exercises",
          "Adjust to sensory input overload in crowded areas",
          "Learn to control the enhancement's power consumption",
          "Defeat the training robots in Dr. Splice's combat simulator"
        ],
        reward: {
          name: "Cybernetic Arm",
          description: "A mechanical arm replacement with enhanced strength and precision.",
          effect: "25% increase to melee damage and ability to hack simple electronic locks",
          icon: 97
        },
        humor: "Your new arm has a mind of its own sometimes, giving thumbs-up to enemies after you defeat them and occasionally waving at security cameras when you're trying to be stealthy."
      },
      {
        name: "Rejection Syndrome",
        description: "Deal with your body's rejection of the cybernetic implants.",
        objectives: [
          "Track down specialized immunosuppressant drugs",
          "Find a technician who can adjust the neural interface",
          "Recover experimental nanobots to repair tissue damage",
          "Locate a rare biological stabilizer in the wasteland",
          "Return to Dr. Splice for emergency recalibration"
        ],
        reward: {
          name: "Auto-Immunizer",
          description: "A system that prevents rejection of cybernetic implants.",
          effect: "Immunity to disease and poison effects",
          icon: 72
        },
        humor: "The auto-immunizer works perfectly, except it now identifies caffeine as a threat and causes you to emit a high-pitched warning beep whenever someone offers you coffee."
      },
      {
        name: "Upgrade Path",
        description: "Choose and install additional cybernetic enhancements.",
        objectives: [
          "Test different enhancement prototypes in virtual simulation",
          "Decide between combat, stealth, or hacking specialization",
          "Gather materials specific to your chosen enhancement path",
          "Undergo the more complex secondary installation procedure",
          "Integrate the new systems with your existing enhancements"
        ],
        reward: {
          name: "Specialization Module",
          description: "A cybernetic enhancement tailored to your preferred playstyle.",
          effect: "Unique abilities based on chosen specialization (combat, stealth, or hacking)",
          icon: 193
        },
        humor: "Your specialization module comes with a built-in AI assistant that offers 'helpful' advice in the most sarcastic tone possible, and seems particularly judgmental of your fashion choices."
      },
      {
        name: "Human After All",
        description: "Confront a group of anti-cybernetic extremists who are hunting enhanced individuals.",
        objectives: [
          "Infiltrate the extremist group to learn their plans",
          "Protect other cybernetically enhanced people from attacks",
          "Sabotage the extremists' EMP weapon development",
          "Convince a key member to abandon the cause",
          "Confront the leader and end the threat"
        ],
        reward: {
          name: "Humanity Anchor",
          description: "A special implant that balances your human and cybernetic aspects.",
          effect: "Prevents cybernetic malfunctions and provides immunity to EMP effects",
          icon: 79
        },
        humor: "The humanity anchor works by occasionally forcing you to experience very human moments, like suddenly remembering embarrassing things you did as a teenager during important conversations."
      }
    ],
    finalReward: {
      name: "Transcendence",
      description: "The perfect integration of human and machine, allowing unprecedented control over your cybernetic systems.",
      effect: "Ability to reconfigure your cybernetic enhancements on the fly to adapt to different situations",
      icon: 87
    }
  },
  
  // 2. Virtual Reality Addiction
  {
    name: "Virtual Reality Addiction",
    description: "Help people trapped in addictive virtual reality simulations while being tempted by the allure of digital paradise yourself.",
    startingNPC: {
      name: "Iris Disconnect",
      location: "Mindscape Clinic (Map031)",
      appearance: "Actor1",
      index: 6,
      dialogue: [
        "*A woman with VR implant scars stares at you with unnervingly steady eyes*",
        "My brother's been jacked in for three weeks. The clinic says it's 'normal adjustment'.",
        "Nothing's normal about living in a fantasy while your body wastes away.",
        "I need someone who can go in after him. Someone who can resist the pull of paradise."
      ],
      x: 15,
      y: 7
    },
    sideQuests: [
      {
        name: "Digital Diving",
        description: "Enter the virtual world and learn to navigate its reality-bending physics.",
        objectives: [
          "Acquire a black market neural interface compatible with the VR system",
          "Undergo the connection procedure at the Mindscape Clinic",
          "Complete the VR orientation program without getting trapped in loops",
          "Learn to distinguish between real sensory input and digital fabrications",
          "Establish a mental anchor to prevent total immersion"
        ],
        reward: {
          name: "Reality Tether",
          description: "A device that helps maintain your connection to the real world while in virtual reality.",
          effect: "Ability to detect illusions and fabrications in both virtual and real environments",
          icon: 79
        },
        humor: "The reality tether occasionally glitches and makes you question if mundane objects are real, leading to existential standoffs with particularly suspicious-looking toasters."
      },
      {
        name: "Paradise Program",
        description: "Explore the main VR environment where most addicts are trapped and discover its secrets.",
        objectives: [
          "Navigate through the five districts of the virtual paradise",
          "Identify the psychological hooks that keep users addicted",
          "Meet with digital representations of other trapped users",
          "Discover the identity of the paradise architect",
          "Find Iris's brother in his personalized fantasy scenario"
        ],
        reward: {
          name: "Digital Cartographer",
          description: "A mental enhancement that allows you to map and remember complex digital spaces.",
          effect: "Reveals hidden paths and shortcuts in complex environments, both virtual and real",
          icon: 102
        },
        humor: "The digital cartographer also maps your own thought processes, creating embarrassingly detailed visualizations of your train of thought whenever you get distracted by something trivial."
      },
      {
        name: "Extraction Protocol",
        description: "Attempt to extract Iris's brother from his personal paradise.",
        objectives: [
          "Convince her brother that he's living in a simulation",
          "Overcome the system's attempts to keep him engaged",
          "Guide him to a digital extraction point",
          "Defend against security programs trying to stop the extraction",
          "Return to the real world with (or without) him"
        ],
        reward: {
          name: "Firewall Mind",
          description: "Mental protection against digital manipulation and persuasion.",
          effect: "Immunity to mind control effects and increased resistance to persuasion attempts",
          icon: 79
        },
        humor: "The firewall is so effective that it also blocks out your own attempts at self-deception, forcing you to acknowledge uncomfortable truths like exactly how long it's been since you last cleaned your living space."
      },
      {
        name: "System Corruption",
        description: "Discover that the VR system is being used for more than just entertainment.",
        objectives: [
          "Investigate anomalies in the paradise program's code",
          "Uncover evidence of data mining from users' subconscious",
          "Track the flow of harvested data to corporate servers",
          "Identify what the corporation is using the data for",
          "Gather evidence for potential legal action"
        ],
        reward: {
          name: "Subconscious Encryption",
          description: "A mental technique that protects your deepest thoughts from external scanning.",
          effect: "Prevents mind reading and memory extraction by technological or psychic means",
          icon: 83
        },
        humor: "The encryption is so thorough that you sometimes can't remember your own secrets, leading to moments where you frantically try to recall your own passwords while muttering 'I made it impossible for anyone to know this, especially me!'"
      },
      {
        name: "Reality Check",
        description: "Confront the corporation behind the addictive VR system.",
        objectives: [
          "Infiltrate the corporate headquarters",
          "Locate the server room containing the paradise program",
          "Upload a modification that makes users aware they're in VR",
          "Escape the building during the resulting chaos",
          "Deal with the moral implications of potentially destroying people's digital happiness"
        ],
        reward: {
          name: "Dual Consciousness",
          description: "The ability to maintain awareness in both virtual and real worlds simultaneously.",
          effect: "Can operate in VR without disconnecting from reality, effectively multitasking across dimensions",
          icon: 79
        },
        humor: "Dual consciousness sounds great until you realize you now have twice as many awkward social interactions to overthink, and your embarrassing memories now play on repeat in picture-in-picture mode."
      }
    ],
    finalReward: {
      name: "Digital Enlightenment",
      description: "The ability to perceive the digital underpinnings of modern reality and manipulate them to your advantage.",
      effect: "Can see and interact with digital systems without specialized equipment and can briefly manipulate reality using simulation principles",
      icon: 87
    }
  },
  
  // 3. Neon Street Racing
  {
    name: "Neon Street Racing",
    description: "Rise through the ranks of an underground street racing circuit where the vehicles are as modified as the drivers.",
    startingNPC: {
      name: "Velocity",
      location: "Neon Garage (Map042)",
      appearance: "Actor3",
      index: 7,
      dialogue: [
        "*A woman in a leather racing suit tosses a set of keys in the air*",
        "Nice reflexes. You might have what it takes for the circuit.",
        "We're not just racing for glory—there's tech at stake that could change everything.",
        "Think you can handle a machine that responds to your thoughts as much as your hands?"
      ],
      x: 12,
      y: 9
    },
    sideQuests: [
      {
        name: "Scrap Runner",
        description: "Build your first neural-linked racing vehicle from salvaged parts.",
        objectives: [
          "Collect a functional chassis from the junkyard",
          "Salvage a high-performance engine from abandoned military vehicles",
          "Acquire neural interface components from the black market",
          "Install makeshift neon lighting systems for circuit recognition",
          "Test drive your creation on the beginner's track"
        ],
        reward: {
          name: "Novice Neural Link",
          description: "A basic brain-vehicle interface that allows limited mental control of your vehicle.",
          effect: "10% increase to vehicle handling and ability to sense your vehicle's condition",
          icon: 79
        },
        humor: "The neural link has a quirk where it translates your road rage into polite but passive-aggressive announcements, so when you think 'MOVE YOU IDIOT!' your car pleasantly announces 'I do hope you're enjoying taking up both lanes, friend.'"
      },
      {
        name: "Circuit Initiation",
        description: "Compete in your first official races and make a name for yourself.",
        objectives: [
          "Win a qualifying race in the industrial district",
          "Defeat a rival racer in a one-on-one challenge",
          "Complete the notorious 'Suicide Spiral' track without crashing",
          "Participate in a team relay race with other rookies",
          "Place in the top three at the Neon Night Championship"
        ],
        reward: {
          name: "Reaction Enhancer",
          description: "A cybernetic implant that speeds up your neural processing for racing.",
          effect: "20% increase to reaction time and ability to perceive high-speed environments in detail",
          icon: 79
        },
        humor: "The reaction enhancer works too well in normal life, causing you to dramatically dodge when someone simply tries to hand you a drink, followed by an unnecessarily detailed explanation of how you calculated the liquid trajectory."
      },
      {
        name: "Velocity Rivalry",
        description: "Deal with a rival racer who's determined to end your career by any means necessary.",
        objectives: [
          "Survive an 'accidental' sabotage attempt on your vehicle",
          "Gather evidence of your rival's illegal race tampering",
          "Defeat them in a high-stakes public race despite their cheating",
          "Navigate the political fallout within the racing circuit",
          "Choose whether to forgive or humiliate your rival after their defeat"
        ],
        reward: {
          name: "Threat Perception",
          description: "An enhanced awareness that helps you detect and avoid danger while racing.",
          effect: "Ability to sense incoming attacks and obstacles before they become visible",
          icon: 102
        },
        humor: "Threat perception makes everyday life exhausting as you now dramatically identify the 'dangers' around you, like loudly announcing 'THREAT DETECTED' when someone walks toward you with a slightly too-full cup of coffee."
      },
      {
        name: "Prototype Pursuit",
        description: "Discover and acquire revolutionary racing technology being developed in secret.",
        objectives: [
          "Infiltrate a corporate research facility",
          "Locate the prototype neural enhancer for racing vehicles",
          "Download the technical specifications while avoiding security",
          "Escape with the physical prototype component",
          "Install the technology in your vehicle without frying your brain"
        ],
        reward: {
          name: "Quantum Reflex System",
          description: "A racing system that predicts outcomes microseconds before they happen.",
          effect: "Ability to see brief flashes of immediate future possibilities during high-stress situations",
          icon: 79
        },
        humor: "The quantum reflex system shows you so many possible futures that you become paralyzed with indecision when ordering food, seeing dozens of timelines where you regret or enjoy your meal in equal measure."
      },
      {
        name: "Final Circuit",
        description: "Compete in the grand championship while uncovering the true purpose of the racing circuit.",
        objectives: [
          "Qualify for the invitation-only Ultimate Circuit",
          "Discover that the races are secretly testing pilots for an experimental vehicle program",
          "Decide whether to race for glory or expose the truth",
          "Complete the most dangerous track ever designed",
          "Make your final choice: accept the corporate offer or remain independent"
        ],
        reward: {
          name: "Perfect Sync",
          description: "The ultimate connection between driver and vehicle, making them function as one entity.",
          effect: "Vehicle responds to your thoughts as if it were part of your body, with no input lag",
          icon: 87
        },
        humor: "Perfect sync has the unfortunate side effect of making your vehicle respond to your dreams, so you occasionally wake up to find your car has somehow parked itself in bizarre locations based on your subconscious desires."
      }
    ],
    finalReward: {
      name: "Thought Velocity",
      description: "The ability to perceive and react to the world at superhuman speeds, even outside a vehicle.",
      effect: "Time appears to slow down during critical moments, allowing for perfect decision-making and reactions",
      icon: 87
    }
  }
];

// Run the main function with the first batch of quest lines
generateQuestLines(questLinesBatch1);
