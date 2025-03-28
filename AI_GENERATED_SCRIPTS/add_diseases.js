// add_diseases.js
// Script to add new diseases to MegaEarth 2049
// This script will add new diseases to the States.json file

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

// New disease definitions
const newDiseases = [
  {
    name: "Narcolepsy",
    description: "Random chance to skip turns as character falls asleep mid-battle.",
    iconIndex: 1614,
    maxTurns: 5,
    minTurns: 3,
    motion: 2,
    overlay: 7,
    priority: 75,
    removeAtBattleEnd: false,
    restriction: 4,
    traits: [
      {"code": 22, "dataId": 0, "value": -0.3}  // Reduces accuracy
    ],
    message1: " suddenly falls asleep!",
    message2: " is narcoleptic!",
    message3: " is sleeping at random intervals!",
    message4: " is no longer narcoleptic!",
    note: "<State Animation: 135>\n<Category: Disease>\n<Category: Mental>\n<Custom Action Start Effect>\nif (Math.random() < 0.3) {\n  this.addState(10); // Add sleep state temporarily\n}\n</Custom Action Start Effect>"
  },
  {
    name: "Tourette's",
    description: "Randomly insults enemies, causing either damage or enraging them.",
    iconIndex: 1615,
    maxTurns: 7,
    minTurns: 4,
    motion: 1,
    overlay: 0,
    priority: 65,
    removeAtBattleEnd: false,
    restriction: 0,
    traits: [
      {"code": 21, "dataId": 2, "value": 1.2}  // Increases attack
    ],
    message1: " develops Tourette's!",
    message2: " has Tourette's!",
    message3: " is shouting random insults!",
    message4: " has overcome Tourette's!",
    note: "<State Animation: 136>\n<Category: Disease>\n<Category: Mental>\n<Custom Action Start Effect>\nif (Math.random() < 0.4) {\n  // 40% chance to trigger effect\n  var targets = this.opponentsUnit().aliveMembers();\n  if (targets.length > 0) {\n    var target = targets[Math.floor(Math.random() * targets.length)];\n    if (Math.random() < 0.5) {\n      // 50% chance to damage\n      var damage = Math.floor(this.atk * 0.2);\n      target.gainHp(-damage);\n      BattleManager._logWindow.push('addText', this.name() + ' insults ' + target.name() + ' for ' + damage + ' damage!');\n    } else {\n      // 50% chance to enrage\n      target.addState(7); // Add rage state\n      BattleManager._logWindow.push('addText', this.name() + ' enrages ' + target.name() + ' with insults!');\n    }\n  }\n}\n</Custom Action Start Effect>"
  },
  {
    name: "Hypochondria",
    description: "Character thinks they have all diseases, gaining resistance to actual diseases.",
    iconIndex: 1616,
    maxTurns: 10,
    minTurns: 5,
    motion: 1,
    overlay: 0,
    priority: 50,
    removeAtBattleEnd: false,
    restriction: 0,
    traits: [
      {"code": 14, "dataId": 11, "value": 0.5},  // 50% resistance to disease states
      {"code": 22, "dataId": 7, "value": -0.02}  // Small HP drain
    ],
    message1: " becomes hypochondriac!",
    message2: " is hypochondriac!",
    message3: " is worried about imaginary diseases!",
    message4: " is no longer hypochondriac!",
    note: "<State Animation: 137>\n<Category: Disease>\n<Category: Mental>\n<Custom Regenerate Effect>\nif (Math.random() < 0.2) {\n  BattleManager._logWindow.push('addText', this.name() + ' complains about a disease they don\'t have!');\n}\n</Custom Regenerate Effect>"
  },
  {
    name: "Stockholm Syndrome",
    description: "Character occasionally heals enemies instead of attacking them.",
    iconIndex: 1617,
    maxTurns: 6,
    minTurns: 3,
    motion: 1,
    overlay: 0,
    priority: 70,
    removeAtBattleEnd: true,
    restriction: 0,
    traits: [],
    message1: " develops Stockholm Syndrome!",
    message2: " has Stockholm Syndrome!",
    message3: " is sympathizing with the enemy!",
    message4: " no longer has Stockholm Syndrome!",
    note: "<State Animation: 138>\n<Category: Disease>\n<Category: Mental>\n<Custom Confirm Effect>\nif (Math.random() < 0.3 && action.isAttack()) {\n  // 30% chance to heal instead of attack\n  value = -value * 0.5; // Convert damage to healing at 50% rate\n  BattleManager._logWindow.push('addText', this.name() + ' sympathizes with the enemy and heals them instead!');\n}\nreturn value;\n</Custom Confirm Effect>"
  },
  {
    name: "Munchausen",
    description: "Character appears to have random status effects but doesn't actually suffer penalties.",
    iconIndex: 1618,
    maxTurns: 8,
    minTurns: 4,
    motion: 1,
    overlay: 0,
    priority: 55,
    removeAtBattleEnd: false,
    restriction: 0,
    traits: [
      {"code": 21, "dataId": 7, "value": 1.2}  // Increases luck
    ],
    message1: " develops Munchausen Syndrome!",
    message2: " has Munchausen Syndrome!",
    message3: " is faking symptoms!",
    message4: " no longer has Munchausen Syndrome!",
    note: "<State Animation: 139>\n<Category: Disease>\n<Category: Mental>\n<Custom Turn Start Effect>\nvar fakeStates = [4, 5, 6, 7, 8]; // Poison, Blind, Silence, Rage, Confusion\nvar randomState = fakeStates[Math.floor(Math.random() * fakeStates.length)];\nBattleManager._logWindow.push('addText', this.name() + ' appears to have ' + $dataStates[randomState].name + ' but is faking it!');\n</Custom Turn Start Effect>"
  },
  {
    name: "Phantom Limb",
    description: "Character attacks with limbs that aren't there, sometimes hitting, sometimes missing entirely.",
    iconIndex: 1619,
    maxTurns: 7,
    minTurns: 3,
    motion: 1,
    overlay: 0,
    priority: 60,
    removeAtBattleEnd: false,
    restriction: 0,
    traits: [],
    message1: " feels a phantom limb!",
    message2: " has phantom limb syndrome!",
    message3: " is attacking with limbs that aren't there!",
    message4: " no longer feels phantom limbs!",
    note: "<State Animation: 140>\n<Category: Disease>\n<Category: Physical>\n<Custom Confirm Effect>\nif (action.isAttack()) {\n  if (Math.random() < 0.5) {\n    // 50% chance to double damage\n    value *= 2;\n    BattleManager._logWindow.push('addText', this.name() + ' attacks with a phantom limb for double damage!');\n  } else {\n    // 50% chance to miss\n    value = 0;\n    BattleManager._logWindow.push('addText', this.name() + ' swings with a phantom limb and misses!');\n  }\n}\nreturn value;\n</Custom Confirm Effect>"
  },
  {
    name: "Progeria",
    description: "Character ages rapidly, gaining wisdom (MAT) but losing physical strength (ATK) and speed (AGI).",
    iconIndex: 1620,
    maxTurns: 10,
    minTurns: 5,
    motion: 1,
    overlay: 0,
    priority: 65,
    removeAtBattleEnd: false,
    restriction: 0,
    traits: [
      {"code": 21, "dataId": 2, "value": 0.8},  // Reduces ATK
      {"code": 21, "dataId": 4, "value": 1.3},  // Increases MAT
      {"code": 21, "dataId": 6, "value": 0.7}   // Reduces AGI
    ],
    message1: " begins aging rapidly!",
    message2: " has Progeria!",
    message3: " is aging before your eyes!",
    message4: " is no longer aging rapidly!",
    note: "<State Animation: 141>\n<Category: Disease>\n<Category: Physical>\n<Custom Turn End Effect>\nif (this._stateTurns[71] && this._stateTurns[71] > 0) {\n  // Increase MAT buff as condition progresses\n  var currentTurn = this._stateTurns[71];\n  var maxTurn = 10;\n  var ratio = (maxTurn - currentTurn) / maxTurn;\n  this.addBuff(4, 1); // Add MAT buff\n}\n</Custom Turn End Effect>"
  },
  {
    name: "Synesthesia",
    description: "Character experiences crossed senses, sometimes causing confusion but also granting insight.",
    iconIndex: 1621,
    maxTurns: 6,
    minTurns: 3,
    motion: 1,
    overlay: 0,
    priority: 55,
    removeAtBattleEnd: false,
    restriction: 0,
    traits: [
      {"code": 21, "dataId": 4, "value": 1.2},  // Increases MAT
      {"code": 21, "dataId": 5, "value": 1.2}   // Increases MDF
    ],
    message1: " develops Synesthesia!",
    message2: " has Synesthesia!",
    message3: " is seeing sounds and hearing colors!",
    message4: " no longer has Synesthesia!",
    note: "<State Animation: 142>\n<Category: Disease>\n<Category: Mental>\n<Custom Action Start Effect>\nif (Math.random() < 0.2) {\n  // 20% chance to get confused\n  this.addState(8); // Add confusion state\n  BattleManager._logWindow.push('addText', this.name() + ' is overwhelmed by sensory crossing!');\n} else if (Math.random() < 0.3) {\n  // 30% chance to gain insight\n  this.addBuff(4, 2); // Add MAT buff\n  BattleManager._logWindow.push('addText', this.name() + ' gains insight from their unique perception!');\n}\n</Custom Action Start Effect>"
  },
  {
    name: "Affluenza",
    description: "Character is too privileged to fight properly, but can bribe enemies to leave them alone.",
    iconIndex: 1622,
    maxTurns: 5,
    minTurns: 3,
    motion: 1,
    overlay: 0,
    priority: 60,
    removeAtBattleEnd: true,
    restriction: 0,
    traits: [
      {"code": 21, "dataId": 2, "value": 0.7},  // Reduces ATK
      {"code": 21, "dataId": 3, "value": 0.7}   // Reduces DEF
    ],
    message1: " develops Affluenza!",
    message2: " has Affluenza!",
    message3: " is too privileged to fight properly!",
    message4: " is no longer afflicted with Affluenza!",
    note: "<State Animation: 143>\n<Category: Disease>\n<Category: Mental>\n<Custom Action Start Effect>\nif (Math.random() < 0.3) {\n  // 30% chance to bribe enemy\n  var gold = 50 + Math.floor(Math.random() * 50);\n  $gameParty.loseGold(gold);\n  var targets = this.opponentsUnit().aliveMembers();\n  if (targets.length > 0) {\n    var target = targets[Math.floor(Math.random() * targets.length)];\n    target.addState(9); // Add fascination state\n    BattleManager._logWindow.push('addText', this.name() + ' bribes ' + target.name() + ' with ' + gold + ' gold!');\n  }\n}\n</Custom Action Start Effect>"
  },
  {
    name: "Impostor Syndrome",
    description: "Character doubts their abilities, reducing effectiveness but occasionally overcompensating.",
    iconIndex: 1623,
    maxTurns: 7,
    minTurns: 4,
    motion: 1,
    overlay: 0,
    priority: 55,
    removeAtBattleEnd: false,
    restriction: 0,
    traits: [
      {"code": 21, "dataId": 2, "value": 0.8},  // Reduces ATK
      {"code": 21, "dataId": 4, "value": 0.8}   // Reduces MAT
    ],
    message1: " develops Impostor Syndrome!",
    message2: " has Impostor Syndrome!",
    message3: " doubts their abilities!",
    message4: " overcomes their Impostor Syndrome!",
    note: "<State Animation: 144>\n<Category: Disease>\n<Category: Mental>\n<Custom Confirm Effect>\nif (action.isAttack() || action.isMagicSkill()) {\n  if (Math.random() < 0.7) {\n    // 70% chance to reduce damage\n    value *= 0.7;\n    BattleManager._logWindow.push('addText', this.name() + ' hesitates due to self-doubt!');\n  } else {\n    // 30% chance to overcompensate and increase damage\n    value *= 1.5;\n    BattleManager._logWindow.push('addText', this.name() + ' overcompensates and hits harder!');\n  }\n}\nreturn value;\n</Custom Confirm Effect>"
  }
];

// Add the new diseases to the states array
for (let i = 0; i < newDiseases.length; i++) {
  const disease = newDiseases[i];
  const id = highestId + i + 1;
  
  // Create the state object
  const state = {
    "id": id,
    "autoRemovalTiming": 2,
    "chanceByDamage": 100,
    "iconIndex": disease.iconIndex,
    "maxTurns": disease.maxTurns,
    "message1": disease.message1,
    "message2": disease.message2,
    "message3": disease.message3,
    "message4": disease.message4,
    "minTurns": disease.minTurns,
    "motion": disease.motion,
    "name": disease.name,
    "note": disease.note,
    "overlay": disease.overlay,
    "priority": disease.priority,
    "removeAtBattleEnd": disease.removeAtBattleEnd,
    "removeByDamage": false,
    "removeByRestriction": false,
    "removeByWalking": false,
    "restriction": disease.restriction,
    "stepsToRemove": 100,
    "traits": disease.traits
  };
  
  // Add the state to the states array
  states.push(state);
  
  console.log(`Added disease: ${disease.name} with ID ${id}`);
}

// Write the updated states array back to the file
fs.writeFileSync(statesPath, JSON.stringify(states, null, 4));

console.log(`Added ${newDiseases.length} new diseases to States.json`);

// Create cure items for the new diseases
const itemsPath = path.join('data', 'Items.json');
let items = JSON.parse(fs.readFileSync(itemsPath, 'utf8'));

// Find the highest ID currently in use in items
let highestItemId = 0;
for (let i = 0; i < items.length; i++) {
  if (items[i] && items[i].id) {
    highestItemId = Math.max(highestItemId, items[i].id);
  }
}

// Create cure items for each disease
const cureItems = [];
for (let i = 0; i < newDiseases.length; i++) {
  const disease = newDiseases[i];
  const id = highestItemId + i + 1;
  const stateId = highestId + i + 1;
  
  // Create the item object
  const item = {
    "id": id,
    "animationId": 45,
    "consumable": true,
    "damage": {
      "critical": false,
      "elementId": 0,
      "formula": "0",
      "type": 0,
      "variance": 20
    },
    "description": `Cures ${disease.name}. Another miracle cure from Acme Pharmaceuticals.`,
    "effects": [
      {
        "code": 22,
        "dataId": stateId,
        "value1": 1,
        "value2": 0
      }
    ],
    "hitType": 0,
    "iconIndex": 325 + i % 10,
    "itypeId": 1,
    "name": `${disease.name} Cure`,
    "note": "",
    "occasion": 0,
    "price": 500,
    "repeats": 1,
    "scope": 7,
    "speed": 0,
    "successRate": 100,
    "tpGain": 0
  };
  
  // Add the item to the items array
  items.push(item);
  cureItems.push(item);
  
  console.log(`Added cure item: ${item.name} with ID ${id}`);
}

// Write the updated items array back to the file
fs.writeFileSync(itemsPath, JSON.stringify(items, null, 4));

console.log(`Added ${cureItems.length} new cure items to Items.json`);
