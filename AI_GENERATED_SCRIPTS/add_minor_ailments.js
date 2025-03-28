// add_minor_ailments.js
// Script to add minor ailments to MegaEarth 2049
// These are less severe than diseases but trigger ridicule from party members and NPCs

const fs = require('fs');
const path = require('path');

// Load the States.json file
const statesPath = path.join('data', 'States.json');
let states = JSON.parse(fs.readFileSync(statesPath, 'utf8'));

// Find the highest ID currently in use
let highestId = 0;
for (let i = 0; i < states.length; i++) {
  if (states[i] && states[i].id) {
    highestId = Math.max(highestId, states[i].id);
  }
}

// New minor ailment definitions
const minorAilments = [
  {
    name: "Chronic Hiccups",
    description: "Random hiccups during conversations. Small chance to interrupt dialogue or actions.",
    iconIndex: 1636,
    maxTurns: 3,
    minTurns: 2,
    motion: 1,
    overlay: 0,
    priority: 40,
    removeAtBattleEnd: true,
    restriction: 0,
    traits: [],
    message1: " gets the hiccups!",
    message2: " has hiccups!",
    message3: " is hiccupping uncontrollably!",
    message4: "'s hiccups finally stop!",
    note: "<State Animation: 208>\n<Category: MinorAilment>\n<Custom Action Start Effect>\nif (Math.random() < 0.2) {\n  // 20% chance to interrupt action\n  BattleManager._logWindow.push('addText', this.name() + ' *hic* can\\'t speak properly!');\n  return false; // Cancel the action\n}\n</Custom Action Start Effect>\n<Ridicule Trigger: 'hiccups'>"
  },
  {
    name: "Seasonal Allergies",
    description: "Occasional sneezing fits. Small chance to alert enemies.",
    iconIndex: 1637,
    maxTurns: 4,
    minTurns: 2,
    motion: 1,
    overlay: 0,
    priority: 40,
    removeAtBattleEnd: true,
    restriction: 0,
    traits: [
      {"code": 22, "dataId": 0, "value": -0.05}  // Slightly reduces accuracy
    ],
    message1: " starts sneezing!",
    message2: " has allergies!",
    message3: " keeps sneezing!",
    message4: "'s allergies clear up!",
    note: "<State Animation: 209>\n<Category: MinorAilment>\n<Custom Turn Start Effect>\nif (Math.random() < 0.3) {\n  // 30% chance to sneeze\n  BattleManager._logWindow.push('addText', this.name() + ' has a sneezing fit! ACHOO!');\n}\n</Custom Turn Start Effect>\n<Ridicule Trigger: 'allergies'>"
  },
  {
    name: "Bedhead",
    description: "Hair sticking up in all directions. No gameplay effect.",
    iconIndex: 1638,
    maxTurns: 4,
    minTurns: 3,
    motion: 1,
    overlay: 0,
    priority: 30,
    removeAtBattleEnd: false,
    restriction: 0,
    traits: [],
    message1: "'s hair is sticking up everywhere!",
    message2: " has terrible bedhead!",
    message3: "'s hair refuses to be tamed!",
    message4: " finally fixes their hair!",
    note: "<State Animation: 210>\n<Category: MinorAilment>\n<Ridicule Trigger: 'hair'>"
  },
  {
    name: "Bad Breath",
    description: "Self-explanatory. Minor penalty to persuasion attempts.",
    iconIndex: 1639,
    maxTurns: 3,
    minTurns: 2,
    motion: 1,
    overlay: 0,
    priority: 35,
    removeAtBattleEnd: false,
    restriction: 0,
    traits: [],
    message1: "'s breath suddenly smells terrible!",
    message2: " has bad breath!",
    message3: "'s breath could knock out a skunk!",
    message4: "'s breath returns to normal!",
    note: "<State Animation: 211>\n<Category: MinorAilment>\n<Ridicule Trigger: 'breath'>"
  },
  {
    name: "Excessive Sweating",
    description: "Visible sweat stains. Small charisma penalty.",
    iconIndex: 1640,
    maxTurns: 4,
    minTurns: 2,
    motion: 1,
    overlay: 0,
    priority: 35,
    removeAtBattleEnd: true,
    restriction: 0,
    traits: [],
    message1: " starts sweating profusely!",
    message2: " is sweating buckets!",
    message3: " is drenched in sweat!",
    message4: " stops sweating excessively!",
    note: "<State Animation: 212>\n<Category: MinorAilment>\n<Ridicule Trigger: 'sweat'>"
  },
  {
    name: "Athlete's Foot",
    description: "Constant foot itching. Minor AGI penalty.",
    iconIndex: 1641,
    maxTurns: 5,
    minTurns: 3,
    motion: 1,
    overlay: 0,
    priority: 35,
    removeAtBattleEnd: false,
    restriction: 0,
    traits: [
      {"code": 21, "dataId": 6, "value": 0.95}  // Slightly reduces AGI
    ],
    message1: " develops athlete's foot!",
    message2: " has athlete's foot!",
    message3: " can't stop scratching their feet!",
    message4: "'s athlete's foot clears up!",
    note: "<State Animation: 213>\n<Category: MinorAilment>\n<Custom Turn Start Effect>\nif (Math.random() < 0.3) {\n  // 30% chance to scratch\n  BattleManager._logWindow.push('addText', this.name() + ' stops to scratch their foot!');\n}\n</Custom Turn Start Effect>\n<Ridicule Trigger: 'foot'>"
  },
  {
    name: "Persistent Cough",
    description: "Random coughing fits. Small chance to alert enemies.",
    iconIndex: 1642,
    maxTurns: 4,
    minTurns: 2,
    motion: 1,
    overlay: 0,
    priority: 40,
    removeAtBattleEnd: true,
    restriction: 0,
    traits: [],
    message1: " starts coughing!",
    message2: " has a persistent cough!",
    message3: " keeps coughing!",
    message4: "'s cough finally subsides!",
    note: "<State Animation: 214>\n<Category: MinorAilment>\n<Custom Action Start Effect>\nif (Math.random() < 0.2) {\n  // 20% chance to cough during action\n  BattleManager._logWindow.push('addText', this.name() + ' has a coughing fit!');\n}\n</Custom Action Start Effect>\n<Ridicule Trigger: 'cough'>"
  },
  {
    name: "Eye Twitch",
    description: "Random eye twitching. No gameplay effect.",
    iconIndex: 1643,
    maxTurns: 3,
    minTurns: 2,
    motion: 1,
    overlay: 0,
    priority: 30,
    removeAtBattleEnd: false,
    restriction: 0,
    traits: [],
    message1: "'s eye starts twitching!",
    message2: " has an eye twitch!",
    message3: "'s eye won't stop twitching!",
    message4: "'s eye twitch stops!",
    note: "<State Animation: 215>\n<Category: MinorAilment>\n<Ridicule Trigger: 'twitch'>"
  },
  {
    name: "Runny Nose",
    description: "Constant sniffling. No gameplay effect.",
    iconIndex: 1644,
    maxTurns: 4,
    minTurns: 2,
    motion: 1,
    overlay: 0,
    priority: 35,
    removeAtBattleEnd: true,
    restriction: 0,
    traits: [],
    message1: "'s nose starts running!",
    message2: " has a runny nose!",
    message3: " keeps sniffling!",
    message4: "'s nose stops running!",
    note: "<State Animation: 216>\n<Category: MinorAilment>\n<Custom Turn Start Effect>\nif (Math.random() < 0.4) {\n  // 40% chance to sniffle\n  BattleManager._logWindow.push('addText', this.name() + ' sniffles loudly!');\n}\n</Custom Turn Start Effect>\n<Ridicule Trigger: 'nose'>"
  },
  {
    name: "Acne Breakout",
    description: "Embarrassing pimples. Small charisma penalty.",
    iconIndex: 1645,
    maxTurns: 5,
    minTurns: 3,
    motion: 1,
    overlay: 0,
    priority: 30,
    removeAtBattleEnd: false,
    restriction: 0,
    traits: [],
    message1: " breaks out in acne!",
    message2: " has an acne breakout!",
    message3: "'s face is covered in pimples!",
    message4: "'s acne clears up!",
    note: "<State Animation: 217>\n<Category: MinorAilment>\n<Ridicule Trigger: 'acne'>"
  },
  {
    name: "Laryngitis",
    description: "Raspy, barely audible voice. Small penalty to persuasion.",
    iconIndex: 1646,
    maxTurns: 4,
    minTurns: 2,
    motion: 1,
    overlay: 0,
    priority: 40,
    removeAtBattleEnd: false,
    restriction: 0,
    traits: [],
    message1: " loses their voice!",
    message2: " has laryngitis!",
    message3: " can barely speak above a whisper!",
    message4: "'s voice returns to normal!",
    note: "<State Animation: 218>\n<Category: MinorAilment>\n<Custom Action Start Effect>\nif (this._actions[0].isSkill() && Math.random() < 0.2) {\n  // 20% chance to fail verbal skills\n  BattleManager._logWindow.push('addText', this.name() + ' can\\'t speak loud enough to cast the spell!');\n  return false; // Cancel the action\n}\n</Custom Action Start Effect>\n<Ridicule Trigger: 'voice'>"
  }
];

// Add the new minor ailments to the states array
for (let i = 0; i < minorAilments.length; i++) {
  const ailment = minorAilments[i];
  const id = highestId + i + 1;
  
  // Create the state object
  const state = {
    "id": id,
    "autoRemovalTiming": 2,
    "chanceByDamage": 100,
    "iconIndex": ailment.iconIndex,
    "maxTurns": ailment.maxTurns,
    "message1": ailment.message1,
    "message2": ailment.message2,
    "message3": ailment.message3,
    "message4": ailment.message4,
    "minTurns": ailment.minTurns,
    "motion": ailment.motion,
    "name": ailment.name,
    "note": ailment.note,
    "overlay": ailment.overlay,
    "priority": ailment.priority,
    "removeAtBattleEnd": ailment.removeAtBattleEnd,
    "removeByDamage": false,
    "removeByRestriction": false,
    "removeByWalking": false,
    "restriction": ailment.restriction,
    "stepsToRemove": 100,
    "traits": ailment.traits
  };
  
  // Add the state to the states array
  states.push(state);
  
  console.log(`Added minor ailment: ${ailment.name} with ID ${id}`);
}

// Write the updated states array back to the file
fs.writeFileSync(statesPath, JSON.stringify(states, null, 4));

console.log(`Added ${minorAilments.length} new minor ailments to States.json`);

// Create cure items for the minor ailments
const itemsPath = path.join('data', 'Items.json');
let items = JSON.parse(fs.readFileSync(itemsPath, 'utf8'));

// Find the highest ID currently in use in items
let highestItemId = 0;
for (let i = 0; i < items.length; i++) {
  if (items[i] && items[i].id) {
    highestItemId = Math.max(highestItemId, items[i].id);
  }
}

// Create cure items for each minor ailment
const cureItems = [];
for (let i = 0; i < minorAilments.length; i++) {
  const ailment = minorAilments[i];
  const id = highestItemId + i + 1;
  const stateId = highestId + i + 1;
  
  // Create the item object
  const item = {
    "id": id,
    "animationId": 41,
    "consumable": true,
    "damage": {
      "critical": false,
      "elementId": 0,
      "formula": "0",
      "type": 0,
      "variance": 20
    },
    "description": `Relieves ${ailment.name}. A common over-the-counter remedy.`,
    "effects": [
      {
        "code": 22,
        "dataId": stateId,
        "value1": 1,
        "value2": 0
      }
    ],
    "hitType": 0,
    "iconIndex": 335 + i % 10,
    "itypeId": 1,
    "name": `${ailment.name} Remedy`,
    "note": "",
    "occasion": 0,
    "price": 100,  // Cheaper than disease cures
    "repeats": 1,
    "scope": 7,
    "speed": 0,
    "successRate": 100,
    "tpGain": 0
  };
  
  // Add the item to the items array
  items.push(item);
  cureItems.push(item);
  
  console.log(`Added remedy item: ${item.name} with ID ${id}`);
}

// Write the updated items array back to the file
fs.writeFileSync(itemsPath, JSON.stringify(items, null, 4));

console.log(`Added ${cureItems.length} new remedy items to Items.json`);
