// add_mental_illnesses.js
// Script to add mental illnesses to MegaEarth 2049
// This script will add mental illnesses to the States.json file

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

// New mental illness definitions
const mentalIllnesses = [
  {
    name: "Generalized Anxiety",
    description: "Constant worry grants defensive bonuses but may cause freezing in battle.",
    iconIndex: 1647,
    maxTurns: 8,
    minTurns: 4,
    motion: 1,
    overlay: 0,
    priority: 70,
    removeAtBattleEnd: false,
    restriction: 0,
    traits: [
      {"code": 21, "dataId": 3, "value": 1.15},  // +15% DEF
      {"code": 21, "dataId": 5, "value": 1.15}   // +15% MDF
    ],
    message1: " develops Generalized Anxiety!",
    message2: " has Generalized Anxiety!",
    message3: " is constantly worried about everything!",
    message4: "'s anxiety subsides!",
    note: "<State Animation: 241>\n<Category: MentalIllness>\n<Custom Action Start Effect>\nif (Math.random() < 0.25) {\n  // 25% chance to freeze\n  BattleManager._logWindow.push('addText', this.name() + ' freezes with anxiety!');\n  return false; // Cancel the action\n}\n</Custom Action Start Effect>"
  },
  {
    name: "Social Anxiety",
    description: "Performs better alone but worse in crowds.",
    iconIndex: 1648,
    maxTurns: 7,
    minTurns: 4,
    motion: 1,
    overlay: 0,
    priority: 65,
    removeAtBattleEnd: false,
    restriction: 0,
    traits: [],
    message1: " develops Social Anxiety!",
    message2: " has Social Anxiety!",
    message3: " is uncomfortable in social situations!",
    message4: "'s social anxiety fades!",
    note: "<State Animation: 242>\n<Category: MentalIllness>\n<Custom Turn Start Effect>\nvar allies = $gameParty.aliveMembers().length;\nif (allies <= 1) {\n  // Alone - gain bonuses\n  this.addBuff(2, 2); // ATK\n  this.addBuff(3, 2); // DEF\n  this.addBuff(4, 2); // MAT\n  this.addBuff(5, 2); // MDF\n  this.addBuff(6, 2); // AGI\n  this.addBuff(7, 2); // LUK\n  BattleManager._logWindow.push('addText', this.name() + ' feels comfortable being alone!');\n} else {\n  // In a crowd - get penalties\n  this.addDebuff(2, 2); // ATK\n  this.addDebuff(3, 2); // DEF\n  this.addDebuff(4, 2); // MAT\n  this.addDebuff(5, 2); // MDF\n  this.addDebuff(6, 2); // AGI\n  this.addDebuff(7, 2); // LUK\n  BattleManager._logWindow.push('addText', this.name() + ' feels anxious in a crowd!');\n}\n</Custom Turn Start Effect>"
  },
  {
    name: "Panic Disorder",
    description: "Random panic attacks that grant speed but reduce accuracy.",
    iconIndex: 1649,
    maxTurns: 6,
    minTurns: 3,
    motion: 1,
    overlay: 0,
    priority: 75,
    removeAtBattleEnd: false,
    restriction: 0,
    traits: [],
    message1: " develops Panic Disorder!",
    message2: " has Panic Disorder!",
    message3: " is prone to panic attacks!",
    message4: "'s panic disorder subsides!",
    note: "<State Animation: 243>\n<Category: MentalIllness>\n<Custom Turn Start Effect>\nif (Math.random() < 0.3) {\n  // 30% chance for panic attack\n  this.addBuff(6, 3); // +50% AGI\n  this.addDebuff(0, 3); // -50% HIT\n  BattleManager._logWindow.push('addText', this.name() + ' has a panic attack!');\n}\n</Custom Turn Start Effect>"
  },
  {
    name: "Bipolar Disorder",
    description: "Cycles between manic phases (increased stats, reckless decisions) and depressive phases.",
    iconIndex: 1650,
    maxTurns: 10,
    minTurns: 5,
    motion: 1,
    overlay: 0,
    priority: 70,
    removeAtBattleEnd: false,
    restriction: 0,
    traits: [],
    message1: " develops Bipolar Disorder!",
    message2: " has Bipolar Disorder!",
    message3: " is experiencing mood cycles!",
    message4: "'s bipolar disorder stabilizes!",
    note: "<State Animation: 244>\n<Category: MentalIllness>\n<Custom Turn Start Effect>\nvar phase = Math.floor(this._stateTurns[this._stateIndexes.indexOf(136)] / 2) % 2;\nif (phase === 0) {\n  // Manic phase\n  this.addBuff(2, 2); // ATK\n  this.addBuff(4, 2); // MAT\n  this.addBuff(6, 2); // AGI\n  this.addDebuff(3, 3); // DEF\n  this.addDebuff(5, 3); // MDF\n  BattleManager._logWindow.push('addText', this.name() + ' enters a manic phase!');\n} else {\n  // Depressive phase\n  this.addDebuff(2, 2); // ATK\n  this.addDebuff(4, 2); // MAT\n  this.addDebuff(6, 2); // AGI\n  this.addBuff(3, 1); // DEF\n  this.addBuff(5, 1); // MDF\n  BattleManager._logWindow.push('addText', this.name() + ' enters a depressive phase!');\n}\n</Custom Turn Start Effect>"
  },
  {
    name: "Clinical Depression",
    description: "Reduces speed and attack but grants immunity to fear and morale effects.",
    iconIndex: 1651,
    maxTurns: 9,
    minTurns: 5,
    motion: 1,
    overlay: 0,
    priority: 65,
    removeAtBattleEnd: false,
    restriction: 0,
    traits: [
      {"code": 21, "dataId": 2, "value": 0.7},  // -30% ATK
      {"code": 21, "dataId": 6, "value": 0.7},  // -30% AGI
      {"code": 14, "dataId": 4, "value": 0}     // Immune to fear
    ],
    message1: " develops Clinical Depression!",
    message2: " has Clinical Depression!",
    message3: " is experiencing persistent low mood!",
    message4: "'s depression lifts!",
    note: "<State Animation: 245>\n<Category: MentalIllness>\n<Custom Action Start Effect>\nif (Math.random() < 0.2) {\n  // 20% chance to skip turn\n  BattleManager._logWindow.push('addText', this.name() + ' lacks motivation to act...');\n  return false; // Cancel the action\n}\n</Custom Action Start Effect>"
  },
  {
    name: "Seasonal Affective",
    description: "Stats vary based on in-game lighting conditions.",
    iconIndex: 1652,
    maxTurns: 8,
    minTurns: 4,
    motion: 1,
    overlay: 0,
    priority: 60,
    removeAtBattleEnd: false,
    restriction: 0,
    traits: [],
    message1: " develops Seasonal Affective Disorder!",
    message2: " has Seasonal Affective Disorder!",
    message3: "'s mood depends on lighting conditions!",
    message4: "'s seasonal affective disorder improves!",
    note: "<State Animation: 246>\n<Category: MentalIllness>\n<Custom Turn Start Effect>\nvar isDark = $gameMap.isDark && $gameMap.isDark() || $gameSystem.isNightTime && $gameSystem.isNightTime();\nif (isDark) {\n  // In darkness - debuffs\n  this.addDebuff(2, 2); // ATK\n  this.addDebuff(4, 2); // MAT\n  this.addDebuff(6, 2); // AGI\n  BattleManager._logWindow.push('addText', this.name() + ' feels worse in the darkness!');\n} else {\n  // In light - buffs\n  this.addBuff(2, 1); // ATK\n  this.addBuff(4, 1); // MAT\n  this.addBuff(6, 1); // AGI\n  BattleManager._logWindow.push('addText', this.name() + ' feels better in the light!');\n}\n</Custom Turn Start Effect>"
  },
  {
    name: "Schizophrenia",
    description: "Character sees and hears things others don't - sometimes revealing actual hidden items/enemies.",
    iconIndex: 1653,
    maxTurns: 7,
    minTurns: 4,
    motion: 1,
    overlay: 0,
    priority: 75,
    removeAtBattleEnd: false,
    restriction: 0,
    traits: [],
    message1: " develops Schizophrenia!",
    message2: " has Schizophrenia!",
    message3: " is experiencing hallucinations!",
    message4: "'s schizophrenia subsides!",
    note: "<State Animation: 247>\n<Category: MentalIllness>\n<Custom Turn Start Effect>\nif (Math.random() < 0.4) {\n  // 40% chance for hallucination\n  if (Math.random() < 0.5) {\n    // 50% chance for helpful hallucination\n    BattleManager._logWindow.push('addText', this.name() + ' notices something others don\\'t!');\n    // Reveal enemy weakness or hidden item\n    if (Math.random() < 0.5) {\n      this.addBuff(2, 2); // ATK\n      BattleManager._logWindow.push('addText', this.name() + ' spots an enemy weakness!');\n    } else {\n      this.addBuff(7, 2); // LUK\n      BattleManager._logWindow.push('addText', this.name() + ' finds a hidden item!');\n    }\n  } else {\n    // 50% chance for harmful hallucination\n    BattleManager._logWindow.push('addText', this.name() + ' is distracted by hallucinations!');\n    this.addDebuff(0, 2); // HIT\n  }\n}\n</Custom Turn Start Effect>"
  },
  {
    name: "Paranoia",
    description: "Increased trap detection and ambush prevention, but may attack allies.",
    iconIndex: 1654,
    maxTurns: 6,
    minTurns: 3,
    motion: 1,
    overlay: 0,
    priority: 70,
    removeAtBattleEnd: false,
    restriction: 0,
    traits: [
      {"code": 21, "dataId": 7, "value": 1.5}  // +50% LUK (for trap detection)
    ],
    message1: " becomes Paranoid!",
    message2: " is Paranoid!",
    message3: " trusts no one!",
    message4: "'s paranoia subsides!",
    note: "<State Animation: 248>\n<Category: MentalIllness>\n<Custom Action Start Effect>\nif (this._actions[0].isForFriend() && Math.random() < 0.3) {\n  // 30% chance to attack ally instead of helping\n  BattleManager._logWindow.push('addText', this.name() + ' suspects an ally is an enemy in disguise!');\n  this._actions[0].setAttack();\n  var allies = this.friendsUnit().aliveMembers();\n  if (allies.length > 1) {\n    var target = allies[Math.floor(Math.random() * allies.length)];\n    if (target !== this) {\n      this._actions[0].setTarget(target.index());\n    }\n  }\n}\n</Custom Action Start Effect>"
  },
  {
    name: "Dissociative Identity",
    description: "Random personality switches with completely different stat distributions.",
    iconIndex: 1655,
    maxTurns: 8,
    minTurns: 4,
    motion: 1,
    overlay: 0,
    priority: 80,
    removeAtBattleEnd: false,
    restriction: 0,
    traits: [],
    message1: " develops Dissociative Identity Disorder!",
    message2: " has Dissociative Identity Disorder!",
    message3: " has multiple personalities!",
    message4: "'s identity stabilizes!",
    note: "<State Animation: 249>\n<Category: MentalIllness>\n<Custom Turn Start Effect>\nif (Math.random() < 0.3) {\n  // 30% chance to switch personality\n  var personalities = ['Warrior', 'Mage', 'Rogue', 'Healer'];\n  var personality = personalities[Math.floor(Math.random() * personalities.length)];\n  \n  // Clear all buffs/debuffs\n  for (var i = 0; i < 8; i++) {\n    this.removeBuff(i);\n  }\n  \n  // Apply new personality stats\n  switch (personality) {\n    case 'Warrior':\n      this.addBuff(2, 3); // ATK\n      this.addBuff(3, 3); // DEF\n      this.addDebuff(4, 2); // MAT\n      this.addDebuff(5, 1); // MDF\n      break;\n    case 'Mage':\n      this.addDebuff(2, 2); // ATK\n      this.addDebuff(3, 1); // DEF\n      this.addBuff(4, 3); // MAT\n      this.addBuff(5, 3); // MDF\n      break;\n    case 'Rogue':\n      this.addBuff(2, 2); // ATK\n      this.addDebuff(3, 2); // DEF\n      this.addDebuff(4, 1); // MAT\n      this.addBuff(6, 3); // AGI\n      this.addBuff(7, 3); // LUK\n      break;\n    case 'Healer':\n      this.addDebuff(2, 1); // ATK\n      this.addBuff(3, 1); // DEF\n      this.addBuff(4, 2); // MAT\n      this.addBuff(5, 2); // MDF\n      break;\n  }\n  \n  BattleManager._logWindow.push('addText', this.name() + ' switches to ' + personality + ' personality!');\n}\n</Custom Turn Start Effect>"
  },
  {
    name: "ADHD",
    description: "Reduced buff/debuff duration, but damage increases when focusing on a single enemy.",
    iconIndex: 1656,
    maxTurns: 7,
    minTurns: 4,
    motion: 1,
    overlay: 0,
    priority: 60,
    removeAtBattleEnd: false,
    restriction: 0,
    traits: [],
    message1: " develops ADHD!",
    message2: " has ADHD!",
    message3: " has difficulty maintaining focus!",
    message4: "'s ADHD symptoms improve!",
    note: "<State Animation: 250>\n<Category: MentalIllness>\n<Custom Turn End Effect>\n// Reduce buff/debuff duration\nfor (var i = 0; i < 8; i++) {\n  if (this._buffTurns[i] > 0) this._buffTurns[i]--;\n}\n</Custom Turn End Effect>\n<Custom Confirm Effect>\nif (action.isAttack()) {\n  // Check if attacking same target as last turn\n  if (this._lastTarget === action._targetIndex) {\n    // Hyperfocus bonus\n    value *= 1.25;\n    BattleManager._logWindow.push('addText', this.name() + ' hyperfocuses for extra damage!');\n    this._focusTurns = (this._focusTurns || 0) + 1;\n    if (this._focusTurns > 1) {\n      value *= (1 + (this._focusTurns * 0.1)); // Additional 10% per turn of focus\n    }\n  } else {\n    this._focusTurns = 0;\n  }\n  this._lastTarget = action._targetIndex;\n}\nreturn value;\n</Custom Confirm Effect>"
  },
  {
    name: "Autism Spectrum",
    description: "Reduced social skills, increased pattern recognition.",
    iconIndex: 1657,
    maxTurns: 0, // Permanent
    minTurns: 0,
    motion: 1,
    overlay: 0,
    priority: 50,
    removeAtBattleEnd: false,
    restriction: 0,
    traits: [],
    message1: " is diagnosed with Autism Spectrum Disorder!",
    message2: " has Autism Spectrum Disorder!",
    message3: " processes information differently!",
    message4: "", // No removal message as it's permanent
    note: "<State Animation: 251>\n<Category: MentalIllness>\n<Custom Turn Start Effect>\n// Increased pattern recognition in battle\nif (this._turnCount && this._turnCount % 3 === 0) {\n  // Every 3 turns, recognize enemy patterns\n  this.addBuff(0, 2); // HIT\n  this.addBuff(7, 2); // LUK\n  BattleManager._logWindow.push('addText', this.name() + ' recognizes enemy attack patterns!');\n}\n</Custom Turn Start Effect>"
  },
  {
    name: "OCD",
    description: "Character must perform rituals before actions but gains perfect accuracy after completing them.",
    iconIndex: 1658,
    maxTurns: 8,
    minTurns: 4,
    motion: 1,
    overlay: 0,
    priority: 65,
    removeAtBattleEnd: false,
    restriction: 0,
    traits: [],
    message1: " develops OCD!",
    message2: " has OCD!",
    message3: " needs to perform rituals before acting!",
    message4: "'s OCD symptoms subside!",
    note: "<State Animation: 252>\n<Category: MentalIllness>\n<Custom Action Start Effect>\nif (!this._ritualComplete) {\n  // First turn - perform ritual\n  BattleManager._logWindow.push('addText', this.name() + ' performs a ritual...');\n  this._ritualComplete = true;\n  return false; // Skip turn for ritual\n} else {\n  // Second turn - perfect accuracy\n  this._actions[0]._hitType = Game_Action.HITTYPE_CERTAIN;\n  BattleManager._logWindow.push('addText', this.name() + ' acts with perfect precision!');\n  this._ritualComplete = false; // Reset for next time\n}\n</Custom Action Start Effect>"
  },
  {
    name: "Narcissistic Personality",
    description: "Character gains massive buffs when praised but severe debuffs when criticized.",
    iconIndex: 1659,
    maxTurns: 7,
    minTurns: 4,
    motion: 1,
    overlay: 0,
    priority: 60,
    removeAtBattleEnd: false,
    restriction: 0,
    traits: [],
    message1: " develops Narcissistic Personality Disorder!",
    message2: " has Narcissistic Personality Disorder!",
    message3: " has an inflated sense of self-importance!",
    message4: "'s narcissism subsides!",
    note: "<State Animation: 253>\n<Category: MentalIllness>\n<Custom Turn Start Effect>\n// Simulate praise or criticism randomly\nif (Math.random() < 0.5) {\n  // Praise\n  for (var i = 0; i < 8; i++) {\n    this.addBuff(i, 3);\n  }\n  BattleManager._logWindow.push('addText', this.name() + ' feels praised and performs better!');\n} else {\n  // Criticism\n  for (var i = 0; i < 8; i++) {\n    this.addDebuff(i, 3);\n  }\n  BattleManager._logWindow.push('addText', this.name() + ' feels criticized and performs worse!');\n}\n</Custom Turn Start Effect>"
  },
  {
    name: "Borderline Personality",
    description: "Extreme stat fluctuations based on proximity to allies.",
    iconIndex: 1660,
    maxTurns: 8,
    minTurns: 4,
    motion: 1,
    overlay: 0,
    priority: 70,
    removeAtBattleEnd: false,
    restriction: 0,
    traits: [],
    message1: " develops Borderline Personality Disorder!",
    message2: " has Borderline Personality Disorder!",
    message3: " experiences emotional instability!",
    message4: "'s borderline symptoms stabilize!",
    note: "<State Animation: 254>\n<Category: MentalIllness>\n<Custom Turn Start Effect>\n// Emotional state depends on allies\nvar allies = $gameParty.aliveMembers().length;\nvar emotionalState = Math.random();\n\n// Clear previous buffs/debuffs\nfor (var i = 0; i < 8; i++) {\n  this.removeBuff(i);\n}\n\nif (emotionalState < 0.3) {\n  // Abandonment fear\n  for (var i = 0; i < 8; i++) {\n    this.addDebuff(i, 3);\n  }\n  BattleManager._logWindow.push('addText', this.name() + ' fears abandonment and performs worse!');\n} else if (emotionalState < 0.6) {\n  // Idealization\n  for (var i = 0; i < 8; i++) {\n    this.addBuff(i, 3);\n  }\n  BattleManager._logWindow.push('addText', this.name() + ' idealizes allies and performs better!');\n} else {\n  // Emotional numbness\n  this.addBuff(3, 2); // DEF\n  this.addBuff(5, 2); // MDF\n  this.addDebuff(2, 2); // ATK\n  this.addDebuff(4, 2); // MAT\n  BattleManager._logWindow.push('addText', this.name() + ' feels emotionally numb!');\n}\n</Custom Turn Start Effect>"
  },
  {
    name: "Agoraphobia",
    description: "Fear of open spaces. Performs better indoors, worse outdoors.",
    iconIndex: 1661,
    maxTurns: 6,
    minTurns: 3,
    motion: 1,
    overlay: 0,
    priority: 65,
    removeAtBattleEnd: false,
    restriction: 0,
    traits: [],
    message1: " develops Agoraphobia!",
    message2: " has Agoraphobia!",
    message3: " fears open spaces!",
    message4: "'s agoraphobia subsides!",
    note: "<State Animation: 255>\n<Category: MentalIllness>\n<Custom Turn Start Effect>\nvar isOutdoors = $gameMap.isOutdoors && $gameMap.isOutdoors() || $dataMap.meta.Outdoors;\nif (isOutdoors) {\n  // Outdoors - debuffs\n  this.addDebuff(2, 2); // ATK\n  this.addDebuff(3, 2); // DEF\n  this.addDebuff(4, 2); // MAT\n  this.addDebuff(5, 2); // MDF\n  this.addDebuff(6, 2); // AGI\n  BattleManager._logWindow.push('addText', this.name() + ' is terrified in open spaces!');\n} else {\n  // Indoors - buffs\n  this.addBuff(2, 1); // ATK\n  this.addBuff(3, 1); // DEF\n  this.addBuff(4, 1); // MAT\n  this.addBuff(5, 1); // MDF\n  this.addBuff(6, 1); // AGI\n  BattleManager._logWindow.push('addText', this.name() + ' feels safer indoors!');\n}\n</Custom Turn Start Effect>"
  }
];

// Add the new mental illnesses to the states array
for (let i = 0; i < mentalIllnesses.length; i++) {
  const illness = mentalIllnesses[i];
  const id = highestId + i + 1;
  
  // Create the state object
  const state = {
    "id": id,
    "autoRemovalTiming": 2,
    "chanceByDamage": 100,
    "iconIndex": illness.iconIndex,
    "maxTurns": illness.maxTurns,
    "message1": illness.message1,
    "message2": illness.message2,
    "message3": illness.message3,
    "message4": illness.message4,
    "minTurns": illness.minTurns,
    "motion": illness.motion,
    "name": illness.name,
    "note": illness.note,
    "overlay": illness.overlay,
    "priority": illness.priority,
    "removeAtBattleEnd": illness.removeAtBattleEnd,
    "removeByDamage": false,
    "removeByRestriction": false,
    "removeByWalking": false,
    "restriction": illness.restriction,
    "stepsToRemove": 100,
    "traits": illness.traits
  };
  
  // Add the state to the states array
  states.push(state);
  
  console.log(`Added mental illness: ${illness.name} with ID ${id}`);
}

// Write the updated states array back to the file
fs.writeFileSync(statesPath, JSON.stringify(states, null, 4));

console.log(`Added ${mentalIllnesses.length} new mental illnesses to States.json`);

// Create treatment items for the mental illnesses
const itemsPath = path.join('data', 'Items.json');
let items = JSON.parse(fs.readFileSync(itemsPath, 'utf8'));

// Find the highest ID currently in use in items
let highestItemId = 0;
for (let i = 0; i < items.length; i++) {
  if (items[i] && items[i].id) {
    highestItemId = Math.max(highestItemId, items[i].id);
  }
}

// Create treatment items for each mental illness
const treatmentItems = [];
for (let i = 0; i < mentalIllnesses.length; i++) {
  const illness = mentalIllnesses[i];
  const id = highestItemId + i + 1;
  const stateId = highestId + i + 1;
  
  // Create the item object
  const item = {
    "id": id,
    "animationId": 46,
    "consumable": true,
    "damage": {
      "critical": false,
      "elementId": 0,
      "formula": "0",
      "type": 0,
      "variance": 20
    },
    "description": `Treats ${illness.name}. Side effects may include drowsiness, dry mouth, and existential dread.`,
    "effects": [
      {
        "code": 22,
        "dataId": stateId,
        "value1": 1,
        "value2": 0
      }
    ],
    "hitType": 0,
    "iconIndex": 345 + i % 10,
    "itypeId": 1,
    "name": getMedicationName(illness.name),
    "note": "",
    "occasion": 0,
    "price": 750,
    "repeats": 1,
    "scope": 7,
    "speed": 0,
    "successRate": 100,
    "tpGain": 0
  };
  
  // Add the item to the items array
  items.push(item);
  treatmentItems.push(item);
  
  console.log(`Added treatment item: ${item.name} with ID ${id}`);
}

// Write the updated items array back to the file
fs.writeFileSync(itemsPath, JSON.stringify(items, null, 4));

console.log(`Added ${treatmentItems.length} new treatment items to Items.json`);

// Helper function to generate medication names
function getMedicationName(illnessName) {
  const prefixes = ["Neuro", "Psych", "Mind", "Cogni", "Emo", "Benzo", "Sero", "Dopa", "Lith"];
  const suffixes = ["zac", "pam", "zine", "tol", "xil", "tine", "zepam", "xetine", "ium"];
  
  // Generate a pseudo-random but consistent name based on the illness name
  const hash = illnessName.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
  const prefix = prefixes[hash % prefixes.length];
  const suffix = suffixes[(hash * 13) % suffixes.length];
  
  // Special cases for some illnesses
  switch (illnessName) {
    case "Bipolar Disorder":
      return "Lithiumol";
    case "Clinical Depression":
      return "Happyzac";
    case "Schizophrenia":
      return "Realitol";
    case "ADHD":
      return "Focusitol";
    case "Autism Spectrum":
      return "Spectrazine";
    case "OCD":
      return "Orderpam";
    case "Paranoia":
      return "Trustazine";
    case "Generalized Anxiety":
      return "Calmapam";
    case "Social Anxiety":
      return "Sociazac";
    case "Panic Disorder":
      return "Steaditol";
    case "Dissociative Identity":
      return "Unifyxil";
    case "Seasonal Affective":
      return "Brightium";
    case "Narcissistic Personality":
      return "Humblezine";
    case "Borderline Personality":
      return "Stabilixil";
    case "Agoraphobia":
      return "Openspacitol";
    default:
      return prefix + suffix;
  }
}
