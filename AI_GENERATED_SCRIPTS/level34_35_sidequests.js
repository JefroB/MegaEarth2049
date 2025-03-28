// Level 34-35 Side Quests for MegaEarth 2049
// This file contains the side quest data for levels 34 and 35

/*
 * Side Quest: "The Frozen Melody"
 * 
 * Location: Snowy Village (Map047)
 * 
 * Quest Overview: 
 * A musician in the Snowy Village has lost his prized instrument in a blizzard. 
 * The player must find the instrument, which has been frozen in ice, and then 
 * collect special materials to thaw it without damaging it.
 * 
 * Key NPCs:
 * - Nostalgic Musician (quest giver)
 * - Village Alchemist (helps create thawing solution)
 * - Frozen Instrument (quest item)
 * - Warming Herbs (collectible items)
 * 
 * Quest Flow:
 * 1. Player meets the Nostalgic Musician who has lost his instrument
 * 2. Player agrees to help and must find the frozen instrument in an ice cave
 * 3. Player must collect three warming herbs from around the village
 * 4. Player brings the herbs to the village alchemist to create a thawing solution
 * 5. Player returns to the musician with the instrument and solution
 * 6. The musician rewards the player with a Harmonic Resonator
 */

// Nostalgic Musician NPC (Quest Giver)
const nostalgicMusician = {
    name: "Nostalgic Musician",
    mapId: 47, // Snowy Village
    x: 18,
    y: 12,
    appearance: "People1", // Character sprite sheet
    index: 0, // Index in the sprite sheet
    
    // Initial dialogue
    initialDialogue: [
        "*The musician stares sadly at the snow*",
        "My beloved instrument... lost in the blizzard last night.",
        "Without it, the music in my soul has nowhere to go."
    ],
    
    // Quest acceptance dialogue
    questDialogue: [
        "You'll help me find it? Oh, thank you!",
        "I was playing near the ice cave to the north when the blizzard hit.",
        "I had to abandon my instrument and run for shelter.",
        "It's probably frozen solid by now... if you find it,",
        "you'll need a special thawing solution to recover it without damage.",
        "The village alchemist can help with that, but you'll need to",
        "gather warming herbs that grow around the village."
    ],
    
    // Dialogue when player returns but hasn't found the instrument
    waitingDialogue1: [
        "Have you found my instrument yet?",
        "I believe it's somewhere in the ice cave to the north.",
        "Please hurry, I fear the cold may damage it beyond repair."
    ],
    
    // Dialogue when player has found the instrument but not the herbs
    waitingDialogue2: [
        "You found it! But as I feared, it's frozen solid.",
        "You'll need to collect three warming herbs from around the village.",
        "They have bright red leaves that stand out against the snow.",
        "Take them to the alchemist to create a thawing solution."
    ],
    
    // Dialogue when player has the thawed instrument
    completionDialogue: [
        "My precious instrument! You've saved it!",
        "*The musician carefully examines the instrument*",
        "Not a scratch on it! The thawing solution worked perfectly.",
        "Please, take this Harmonic Resonator as a token of my gratitude.",
        "It's an ancient device that can stun enemies with sound waves.",
        "I found it years ago during my travels, but I think you'll make better use of it."
    ],
    
    // Dialogue after completing the quest
    postQuestDialogue: [
        "*The musician plays a beautiful melody*",
        "Music brings warmth even to the coldest places.",
        "Thank you again for your help, friend."
    ]
};

// Frozen Instrument (Quest Item)
const frozenInstrument = {
    name: "Frozen Instrument",
    mapId: 47, // Snowy Village (Ice Cave area)
    x: 8,
    y: 5,
    appearance: "!Chest", // Object sprite sheet
    index: 0, // Index in the sprite sheet
    
    // Dialogue when player interacts with the instrument
    dialogue: [
        "You found a strange object encased in ice.",
        "It appears to be a musical instrument of some kind.",
        "The ice is too thick to break without damaging what's inside.",
        "You'll need a special solution to thaw it safely."
    ]
};

// Warming Herb 1
const warmingHerb1 = {
    name: "Warming Herb 1",
    mapId: 47, // Snowy Village
    x: 22,
    y: 8,
    appearance: "!Flame", // Object sprite sheet
    index: 1, // Index in the sprite sheet
    
    // Dialogue when player interacts with the herb
    dialogue: [
        "You found a warming herb!",
        "Its leaves are bright red and feel warm to the touch.",
        "This will be useful for creating a thawing solution."
    ]
};

// Warming Herb 2
const warmingHerb2 = {
    name: "Warming Herb 2",
    mapId: 47, // Snowy Village
    x: 15,
    y: 18,
    appearance: "!Flame", // Object sprite sheet
    index: 1, // Index in the sprite sheet
    
    // Dialogue when player interacts with the herb
    dialogue: [
        "You found a warming herb!",
        "Steam rises from its vibrant red leaves even in this cold.",
        "This will be useful for creating a thawing solution."
    ]
};

// Warming Herb 3
const warmingHerb3 = {
    name: "Warming Herb 3",
    mapId: 47, // Snowy Village
    x: 5,
    y: 15,
    appearance: "!Flame", // Object sprite sheet
    index: 1, // Index in the sprite sheet
    
    // Dialogue when player interacts with the herb
    dialogue: [
        "You found a warming herb!",
        "The snow has melted in a perfect circle around this plant.",
        "This will be useful for creating a thawing solution."
    ]
};

// Village Alchemist NPC
const villageAlchemist = {
    name: "Village Alchemist",
    mapId: 47, // Snowy Village
    x: 12,
    y: 15,
    appearance: "People1", // Character sprite sheet
    index: 2, // Index in the sprite sheet
    
    // Initial dialogue
    initialDialogue: [
        "Welcome to my humble laboratory!",
        "I specialize in potions and solutions for all of life's problems.",
        "Well, most problems. I'm still working on a cure for existential dread."
    ],
    
    // Dialogue when player has the frozen instrument but not all herbs
    waitingDialogue: [
        "You need a thawing solution? I can certainly help with that.",
        "But I'll need three warming herbs to create it.",
        "They grow around the village, recognizable by their bright red leaves.",
        "Come back when you've collected all three."
    ],
    
    // Dialogue when player has all herbs
    completionDialogue: [
        "Ah, you've collected all three warming herbs! Excellent!",
        "*The alchemist combines the herbs in a small cauldron*",
        "A pinch of this... a dash of that...",
        "*The mixture bubbles and turns a warm orange color*",
        "Here's your thawing solution! Just pour it over the frozen instrument.",
        "It will melt the ice without damaging what's inside.",
        "The solution will work its magic instantly."
    ],
    
    // Dialogue after giving the solution
    postQuestDialogue: [
        "My thawing solution worked well, I hope?",
        "I'm always happy to help preserve beautiful things.",
        "Music brings much-needed joy to our little village."
    ]
};

/*
 * Side Quest: "Cold Storage"
 * 
 * Location: Snowy Village (Map047)
 * 
 * Quest Overview:
 * The village's food storage has been compromised by a malfunctioning temperature 
 * regulator. The player must repair the system before the village's winter supplies spoil.
 * 
 * Key NPCs:
 * - Village Elder (quest giver)
 * - Rogue Maintenance Drones (enemies)
 * - Temperature Regulator (quest objective)
 * 
 * Quest Flow:
 * 1. Player meets the Village Elder who explains the storage problem
 * 2. Player investigates the storage facility
 * 3. Player collects replacement parts from abandoned tech sites
 * 4. Player repairs the temperature regulator
 * 5. Player defeats the rogue maintenance drones
 * 6. The Village Elder rewards the player with a Thermal Regulator and shop discounts
 */

// Village Elder NPC (Quest Giver)
const villageElder = {
    name: "Village Elder",
    mapId: 47, // Snowy Village
    x: 10,
    y: 10,
    appearance: "People1", // Character sprite sheet
    index: 6, // Index in the sprite sheet
    
    // Initial dialogue
    initialDialogue: [
        "*The elder looks worried as she stares at a data pad*",
        "Our food storage system is malfunctioning. The temperature",
        "regulator has gone haywire, and our winter supplies are at risk."
    ],
    
    // Quest acceptance dialogue
    questDialogue: [
        "You'll help us? Thank the digital spirits!",
        "The storage facility is just north of the village.",
        "The temperature regulator needs replacement parts.",
        "You can find them in the abandoned tech sites around the village.",
        "But be careful - the maintenance drones have gone rogue.",
        "They're attacking anyone who approaches the facility."
    ],
    
    // Dialogue when player returns but hasn't collected all parts
    waitingDialogue: [
        "Have you found all the replacement parts?",
        "We need them quickly before our food supplies spoil.",
        "Check the abandoned tech sites around the village."
    ],
    
    // Dialogue when player has repaired the regulator
    completionDialogue: [
        "You've fixed the temperature regulator! Our food supplies are safe.",
        "The maintenance drones have returned to normal operation as well.",
        "Please, take this Thermal Regulator as a token of our gratitude.",
        "It will protect you from extreme temperatures in your travels.",
        "And please, consider our village your home. All our shops",
        "will offer you special discounts from now on."
    ],
    
    // Dialogue after completing the quest
    postQuestDialogue: [
        "Our village is thriving thanks to your help.",
        "The food storage system is working perfectly now.",
        "Remember, you're always welcome here."
    ]
};

// Temperature Regulator (Quest Objective)
const temperatureRegulator = {
    name: "Temperature Regulator",
    mapId: 47, // Snowy Village (Storage Facility area)
    x: 5,
    y: 8,
    appearance: "!Crystal", // Object sprite sheet
    index: 3, // Index in the sprite sheet
    
    // Dialogue when player interacts with the regulator before having all parts
    initialDialogue: [
        "The temperature regulator is malfunctioning.",
        "It's missing several critical components.",
        "You'll need to find replacement parts to repair it."
    ],
    
    // Dialogue when player has all parts
    repairDialogue: [
        "You have all the necessary replacement parts.",
        "You carefully disassemble the regulator and replace the damaged components.",
        "The system hums back to life, and the temperature begins to stabilize.",
        "Suddenly, an alarm sounds! The maintenance drones are approaching!"
    ]
};

// Replacement Part 1
const replacementPart1 = {
    name: "Thermal Coupling",
    mapId: 47, // Snowy Village (Abandoned Tech Site 1)
    x: 18,
    y: 5,
    appearance: "!Chest", // Object sprite sheet
    index: 1, // Index in the sprite sheet
    
    // Dialogue when player interacts with the part
    dialogue: [
        "You found a Thermal Coupling!",
        "This component regulates heat exchange in temperature control systems.",
        "It looks like it will fit the regulator in the storage facility."
    ]
};

// Replacement Part 2
const replacementPart2 = {
    name: "Control Circuit",
    mapId: 47, // Snowy Village (Abandoned Tech Site 2)
    x: 25,
    y: 20,
    appearance: "!Chest", // Object sprite sheet
    index: 1, // Index in the sprite sheet
    
    // Dialogue when player interacts with the part
    dialogue: [
        "You found a Control Circuit!",
        "This microprocessor manages the temperature regulation algorithms.",
        "It's an essential component for the storage facility's system."
    ]
};

// Replacement Part 3
const replacementPart3 = {
    name: "Power Cell",
    mapId: 47, // Snowy Village (Abandoned Tech Site 3)
    x: 8,
    y: 22,
    appearance: "!Chest", // Object sprite sheet
    index: 1, // Index in the sprite sheet
    
    // Dialogue when player interacts with the part
    dialogue: [
        "You found a Power Cell!",
        "This high-capacity energy source will provide stable power",
        "to the temperature regulator in the storage facility."
    ]
};

// Rogue Maintenance Drone (Enemy)
const rogueDrone = {
    name: "Rogue Maintenance Drone",
    mapId: 47, // Snowy Village (Storage Facility area)
    x: 6,
    y: 10,
    appearance: "Monster", // Character sprite sheet
    index: 2, // Index in the sprite sheet
    
    // Battle properties
    battleProperties: {
        level: 34,
        hp: 2500,
        attack: 180,
        defense: 160,
        agility: 120,
        magic: 100,
        magicDefense: 140,
        exp: 800,
        gold: 500,
        drops: [
            { name: "Drone Parts", chance: 0.5 },
            { name: "Tech Scrap", chance: 0.8 }
        ],
        skills: [
            "Laser Beam",
            "Repair Protocol",
            "System Overload"
        ]
    },
    
    // Dialogue before battle
    preBattleDialogue: [
        "INTRUDER DETECTED. SECURITY PROTOCOL ACTIVATED.",
        "UNAUTHORIZED MODIFICATION OF TEMPERATURE REGULATION SYSTEM.",
        "INITIATING DEFENSIVE MEASURES."
    ],
    
    // Dialogue after defeat
    postBattleDialogue: [
        "SYSTEM MALFUNCTION... REBOOTING...",
        "DIAGNOSTICS COMPLETE. RESUMING NORMAL OPERATION.",
        "TEMPERATURE REGULATION SYSTEM RECOGNIZED AS FUNCTIONAL.",
        "RETURNING TO MAINTENANCE DUTIES."
    ]
};

/*
 * Side Quest: "Digital Archaeologist"
 * 
 * Location: Snowy Village (Map047)
 * 
 * Quest Overview:
 * A researcher is studying ancient digital artifacts buried in the snow. The player
 * must help recover these artifacts while avoiding the security systems that still
 * protect them.
 * 
 * Key NPCs:
 * - Digital Archaeologist (quest giver)
 * - Ancient Security System (enemy)
 * - Digital Artifacts (collectible items)
 * 
 * Quest Flow:
 * 1. Player meets the Digital Archaeologist who explains their research
 * 2. Player agrees to help recover artifacts from three excavation sites
 * 3. Player must solve puzzles to bypass security at each site
 * 4. Player collects the artifacts and returns them to the researcher
 * 5. The researcher rewards the player with a Data Extractor and ancient knowledge
 */

// Export all quest data
module.exports = {
    frozenMelody: {
        nostalgicMusician,
        frozenInstrument,
        warmingHerb1,
        warmingHerb2,
        warmingHerb3,
        villageAlchemist
    },
    coldStorage: {
        villageElder,
        temperatureRegulator,
        replacementPart1,
        replacementPart2,
        replacementPart3,
        rogueDrone
    }
};
