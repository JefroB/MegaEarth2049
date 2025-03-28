// add_diseases_batch2.js
// Script to add more diseases to MegaEarth 2049
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
    name: "Digital Dementia",
    description: "Character forgets skills randomly but occasionally performs critical hits.",
    iconIndex: 1624,
    maxTurns: 6,
    minTurns: 3,
    motion: 1,
    overlay: 0,
    priority: 65,
    removeAtBattleEnd: false,
    restriction: 0,
    traits: [
      {"code": 22, "dataId": 0, "value": -0.2}  // Reduces accuracy
    ],
    message1: " develops Digital Dementia!",
    message2: " has Digital Dementia!",
    message3: " is forgetting how to use skills!",
    message4: " recovers from Digital Dementia!",
    note: "<State Animation: 186>\n<Category: Disease>\n<Category: Technological>\n<Custom Action Start Effect>\nif (Math.random() < 0.3) {\n  // 30% chance to forget skill\n  BattleManager._logWindow.push('addText', this.name() + ' forgets how to use their skill!');\n  return false; // Cancel the action\n} else if (Math.random() < 0.2) {\n  // 20% chance for critical hit\n  this._actions[0]._criticalRate = 1;\n  BattleManager._logWindow.push('addText', this.name() + ' has a moment of digital clarity!');\n}\n</Custom Action Start Effect>"
  },
  {
    name: "Wi-Fi Allergy",
    description: "Takes damage near technology but gains resistance to tech attacks.",
    iconIndex: 1625,
    maxTurns: 8,
    minTurns: 4,
    motion: 1,
    overlay: 0,
    priority: 60,
    removeAtBattleEnd: false,
    restriction: 0,
    traits: [
      {"code": 11, "dataId": 5, "value": 0.7},  // Resistance to electric damage
      {"code": 22, "dataId": 7, "value": -0.03}  // Small HP drain
    ],
    message1: " develops Wi-Fi Allergy!",
    message2: " has Wi-Fi Allergy!",
    message3: " is sensitive to wireless signals!",
    message4: " is no longer allergic to Wi-Fi!",
    note: "<State Animation: 187>\n<Category: Disease>\n<Category: Technological>\n<Custom Regenerate Effect>\nvar damage = Math.floor(this.mhp * 0.03);\nthis.gainHp(-damage);\nBattleManager._logWindow.push('addText', this.name() + ' takes ' + damage + ' damage from wireless signals!');\n</Custom Regenerate Effect>"
  },
  {
    name: "Techno-Organic Fusion",
    description: "Body parts randomly transform into technology, granting random buffs/debuffs.",
    iconIndex: 1626,
    maxTurns: 7,
    minTurns: 4,
    motion: 1,
    overlay: 0,
    priority: 70,
    removeAtBattleEnd: false,
    restriction: 0,
    traits: [],
    message1: "'s body begins fusing with technology!",
    message2: " has Techno-Organic Fusion!",
    message3: "'s body is partially technological!",
    message4: "'s body returns to normal!",
    note: "<State Animation: 188>\n<Category: Disease>\n<Category: Technological>\n<Category: Mutant>\n<Custom Turn Start Effect>\nvar paramId = Math.floor(Math.random() * 8); // Random parameter\nvar buffOrDebuff = Math.random() < 0.5 ? 1 : -1; // 50% chance for buff or debuff\nvar bodyParts = ['arm', 'leg', 'eye', 'ear', 'finger', 'spine', 'brain'];\nvar randomPart = bodyParts[Math.floor(Math.random() * bodyParts.length)];\nvar techParts = ['circuit', 'processor', 'antenna', 'battery', 'screen', 'speaker', 'camera'];\nvar randomTech = techParts[Math.floor(Math.random() * techParts.length)];\nif (buffOrDebuff > 0) {\n  this.addBuff(paramId, 2);\n  BattleManager._logWindow.push('addText', this.name() + '\\'s ' + randomPart + ' transforms into a ' + randomTech + '!');\n} else {\n  this.addDebuff(paramId, 2);\n  BattleManager._logWindow.push('addText', this.name() + '\\'s ' + randomPart + ' malfunctions as a ' + randomTech + '!');\n}\n</Custom Turn Start Effect>"
  },
  {
    name: "Rad-Hoarder Syndrome",
    description: "Character collects radiation, taking damage but building resistance and eventually gaining powers.",
    iconIndex: 1627,
    maxTurns: 10,
    minTurns: 5,
    motion: 1,
    overlay: 0,
    priority: 65,
    removeAtBattleEnd: false,
    restriction: 0,
    traits: [
      {"code": 11, "dataId": 5, "value": 0.5},  // Resistance to radiation damage
      {"code": 22, "dataId": 7, "value": -0.05}  // HP drain from radiation
    ],
    message1: " starts hoarding radiation!",
    message2: " has Rad-Hoarder Syndrome!",
    message3: " is collecting harmful radiation!",
    message4: " stops hoarding radiation!",
    note: "<State Animation: 189>\n<Category: Disease>\n<Category: Post-Apocalyptic>\n<Custom Turn End Effect>\nif (this._stateTurns[81] && this._stateTurns[81] > 0) {\n  // As condition progresses, gain more benefits\n  var currentTurn = this._stateTurns[81];\n  var maxTurn = 10;\n  var progress = (maxTurn - currentTurn) / maxTurn;\n  if (progress > 0.5) {\n    // After halfway through, start gaining benefits\n    this.addBuff(2, 1); // Add ATK buff\n    this.addBuff(4, 1); // Add MAT buff\n    BattleManager._logWindow.push('addText', this.name() + ' gains power from radiation!');\n  }\n}\n</Custom Turn End Effect>"
  },
  {
    name: "Wasteland Nostalgia",
    description: "Character daydreams about pre-apocalypse, occasionally missing turns but gaining inspiration.",
    iconIndex: 1628,
    maxTurns: 6,
    minTurns: 3,
    motion: 1,
    overlay: 0,
    priority: 55,
    removeAtBattleEnd: false,
    restriction: 0,
    traits: [
      {"code": 21, "dataId": 4, "value": 1.3}  // Increases MAT
    ],
    message1: " becomes nostalgic for the old world!",
    message2: " has Wasteland Nostalgia!",
    message3: " is daydreaming about pre-apocalypse times!",
    message4: " stops dwelling on the past!",
    note: "<State Animation: 190>\n<Category: Disease>\n<Category: Post-Apocalyptic>\n<Category: Mental>\n<Custom Action Start Effect>\nif (Math.random() < 0.3) {\n  // 30% chance to miss turn\n  BattleManager._logWindow.push('addText', this.name() + ' gets lost in memories of the old world...');\n  return false; // Cancel the action\n} else if (Math.random() < 0.4) {\n  // 40% chance to gain inspiration\n  this.addBuff(4, 2); // Add MAT buff\n  BattleManager._logWindow.push('addText', this.name() + ' is inspired by memories of the past!');\n}\n</Custom Action Start Effect>"
  },
  {
    name: "Bunker Fever",
    description: "Increased paranoia causing defensive stance but occasional panic attacks.",
    iconIndex: 1629,
    maxTurns: 7,
    minTurns: 4,
    motion: 1,
    overlay: 0,
    priority: 60,
    removeAtBattleEnd: false,
    restriction: 0,
    traits: [
      {"code": 21, "dataId": 3, "value": 1.3},  // Increases DEF
      {"code": 21, "dataId": 5, "value": 1.3}   // Increases MDF
    ],
    message1: " develops Bunker Fever!",
    message2: " has Bunker Fever!",
    message3: " is paranoid and defensive!",
    message4: " overcomes Bunker Fever!",
    note: "<State Animation: 191>\n<Category: Disease>\n<Category: Post-Apocalyptic>\n<Category: Mental>\n<Custom Turn Start Effect>\nif (Math.random() < 0.2) {\n  // 20% chance for panic attack\n  this.addState(8); // Add confusion state\n  BattleManager._logWindow.push('addText', this.name() + ' has a panic attack!');\n}\n</Custom Turn Start Effect>"
  },
  {
    name: "Spontaneous Extra Limb",
    description: "Random limb growth that allows extra attacks but reduces coordination.",
    iconIndex: 1630,
    maxTurns: 8,
    minTurns: 4,
    motion: 1,
    overlay: 0,
    priority: 70,
    removeAtBattleEnd: false,
    restriction: 0,
    traits: [
      {"code": 21, "dataId": 2, "value": 1.3},  // Increases ATK
      {"code": 21, "dataId": 6, "value": 0.7}   // Reduces AGI
    ],
    message1: " grows an extra limb!",
    message2: " has an extra limb!",
    message3: " is struggling to coordinate their extra limb!",
    message4: "'s extra limb disappears!",
    note: "<State Animation: 192>\n<Category: Disease>\n<Category: Mutant>\n<Custom Confirm Effect>\nif (action.isAttack()) {\n  if (Math.random() < 0.4) {\n    // 40% chance for extra attack\n    var extraDamage = Math.floor(value * 0.5);\n    BattleManager._logWindow.push('addText', this.name() + ' attacks with their extra limb for ' + extraDamage + ' damage!');\n    value += extraDamage;\n  } else if (Math.random() < 0.3) {\n    // 30% chance to fumble\n    value *= 0.5;\n    BattleManager._logWindow.push('addText', this.name() + ' fumbles with their extra limb!');\n  }\n}\nreturn value;\n</Custom Confirm Effect>"
  },
  {
    name: "Beneficial Parasites",
    description: "Parasites that help the host while slowly consuming them.",
    iconIndex: 1631,
    maxTurns: 9,
    minTurns: 5,
    motion: 1,
    overlay: 0,
    priority: 65,
    removeAtBattleEnd: false,
    restriction: 0,
    traits: [
      {"code": 21, "dataId": 2, "value": 1.2},  // Increases ATK
      {"code": 21, "dataId": 6, "value": 1.2},  // Increases AGI
      {"code": 22, "dataId": 7, "value": -0.04}  // HP drain
    ],
    message1: " is infected with beneficial parasites!",
    message2: " has beneficial parasites!",
    message3: " is being enhanced by parasites!",
    message4: " is free of parasites!",
    note: "<State Animation: 193>\n<Category: Disease>\n<Category: Mutant>\n<Custom Regenerate Effect>\nvar damage = Math.floor(this.mhp * 0.04);\nthis.gainHp(-damage);\nBattleManager._logWindow.push('addText', this.name() + '\\'s parasites consume ' + damage + ' HP but enhance performance!');\n</Custom Regenerate Effect>"
  },
  {
    name: "Glowing Skin",
    description: "Radiation causes skin to glow, revealing hidden items but attracting enemies.",
    iconIndex: 1632,
    maxTurns: 7,
    minTurns: 4,
    motion: 1,
    overlay: 3,  // Glow overlay
    priority: 60,
    removeAtBattleEnd: false,
    restriction: 0,
    traits: [
      {"code": 11, "dataId": 5, "value": 0.6}  // Resistance to radiation damage
    ],
    message1: "'s skin begins to glow!",
    message2: " has glowing skin!",
    message3: " is illuminating the area!",
    message4: "'s skin stops glowing!",
    note: "<State Animation: 194>\n<Category: Disease>\n<Category: Mutant>\n<Custom Turn Start Effect>\nif (Math.random() < 0.2) {\n  // 20% chance to find an item\n  BattleManager._logWindow.push('addText', this.name() + '\\'s glow reveals hidden treasures!');\n}\n</Custom Turn Start Effect>\n<Custom Select Effect>\n// Enemies are more likely to target this character\nif (this.isActor() && Math.random() < 0.3) {\n  BattleManager._logWindow.push('addText', this.name() + '\\'s glow attracts enemy attention!');\n}\n</Custom Select Effect>"
  },
  {
    name: "Bottle Cap Fever",
    description: "Obsession with collecting currency, occasionally stealing from enemies instead of attacking.",
    iconIndex: 1633,
    maxTurns: 6,
    minTurns: 3,
    motion: 1,
    overlay: 0,
    priority: 55,
    removeAtBattleEnd: true,
    restriction: 0,
    traits: [
      {"code": 21, "dataId": 7, "value": 1.3}  // Increases LUK
    ],
    message1: " develops Bottle Cap Fever!",
    message2: " has Bottle Cap Fever!",
    message3: " is obsessed with collecting bottle caps!",
    message4: " is no longer obsessed with bottle caps!",
    note: "<State Animation: 195>\n<Category: Disease>\n<Category: Economic>\n<Custom Action Start Effect>\nif (Math.random() < 0.4 && action.isAttack()) {\n  // 40% chance to steal instead of attack\n  var gold = 10 + Math.floor(Math.random() * 50);\n  $gameParty.gainGold(gold);\n  BattleManager._logWindow.push('addText', this.name() + ' steals ' + gold + ' bottle caps instead of attacking!');\n  return false; // Cancel the attack\n}\n</Custom Action Start Effect>"
  },
  {
    name: "Barter Addiction",
    description: "Compulsively tries to trade with enemies instead of fighting.",
    iconIndex: 1634,
    maxTurns: 5,
    minTurns: 3,
    motion: 1,
    overlay: 0,
    priority: 60,
    removeAtBattleEnd: true,
    restriction: 0,
    traits: [],
    message1: " develops Barter Addiction!",
    message2: " has Barter Addiction!",
    message3: " keeps trying to trade with enemies!",
    message4: " is no longer addicted to bartering!",
    note: "<State Animation: 196>\n<Category: Disease>\n<Category: Economic>\n<Custom Action Start Effect>\nif (Math.random() < 0.3 && action.isAttack()) {\n  // 30% chance to attempt bartering\n  var targets = this.opponentsUnit().aliveMembers();\n  if (targets.length > 0) {\n    var target = targets[Math.floor(Math.random() * targets.length)];\n    if (Math.random() < 0.5) {\n      // 50% chance for successful trade\n      var gold = 20 + Math.floor(Math.random() * 30);\n      $gameParty.gainGold(gold);\n      BattleManager._logWindow.push('addText', this.name() + ' successfully barters with ' + target.name() + ' for ' + gold + ' gold!');\n    } else {\n      // 50% chance for failed trade\n      BattleManager._logWindow.push('addText', this.name() + ' fails to barter with ' + target.name() + '!');\n    }\n  }\n  return false; // Cancel the attack\n}\n</Custom Action Start Effect>"
  },
  {
    name: "Resource Hoarding",
    description: "Reduces inventory space but occasionally finds extra items.",
    iconIndex: 1635,
    maxTurns: 8,
    minTurns: 4,
    motion: 1,
    overlay: 0,
    priority: 55,
    removeAtBattleEnd: false,
    restriction: 0,
    traits: [
      {"code": 21, "dataId": 3, "value": 0.8},  // Reduces DEF
      {"code": 21, "dataId": 6, "value": 0.8}   // Reduces AGI
    ],
    message1: " starts hoarding resources!",
    message2: " has Resource Hoarding!",
    message3: " is carrying too many items!",
    message4: " stops hoarding resources!",
    note: "<State Animation: 197>\n<Category: Disease>\n<Category: Economic>\n<Custom Turn End Effect>\nif (Math.random() < 0.2) {\n  // 20% chance to find an item\n  BattleManager._logWindow.push('addText', this.name() + ' finds a useful item in their hoard!');\n}\n</Custom Turn End Effect>"
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
