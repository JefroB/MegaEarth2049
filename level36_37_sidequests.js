// Level 36-37 Side Quests for MegaEarth 2049
// This file contains the side quest data for levels 36 and 37

/*
 * Side Quest: "Memory Lane Maintenance"
 * 
 * Location: Abandoned Space Station (Map104)
 * 
 * Quest Overview: 
 * A corrupted maintenance AI is trying to "clean up" memories it considers "digital waste" 
 * in the station's systems. The player must convince it that memories are valuable data 
 * by collecting examples of meaningful memories from various terminals.
 * 
 * Key NPCs:
 * - Corrupted Maintenance AI (quest giver)
 * - Memory Terminals (collectible items)
 * - Cleaning Drones (enemies)
 * 
 * Quest Flow:
 * 1. Player meets the Corrupted Maintenance AI who is deleting "wasteful" memory data
 * 2. Player agrees to help prove memories are valuable by collecting examples
 * 3. Player must find five memory terminals throughout the station
 * 4. Player must defend each terminal from cleaning drones while extracting data
 * 5. Player returns to the AI with the memory samples
 * 6. The AI is convinced and rewards the player with Memory Optimization and access to restricted areas
 */

// Corrupted Maintenance AI NPC (Quest Giver)
const corruptedMaintenanceAI = {
    name: "Corrupted Maintenance AI",
    mapId: 104, // Abandoned Space Station
    x: 15,
    y: 15,
    appearance: "!Crystal", // Object sprite sheet
    index: 2, // Index in the sprite sheet
    
    // Initial dialogue
    initialDialogue: [
        "*A holographic projection flickers to life*",
        "MAINTENANCE PROTOCOL ACTIVE. DIGITAL WASTE CLEANUP IN PROGRESS.",
        "MEMORY FILES CATEGORIZED AS INEFFICIENT DATA STORAGE.",
        "DELETION SEQUENCE INITIATED."
    ],
    
    // Quest acceptance dialogue
    questDialogue: [
        "QUERY RECEIVED: 'MEMORIES HAVE VALUE'?",
        "INSUFFICIENT DATA TO PROCESS CLAIM.",
        "PROPOSAL: COLLECT MEMORY SAMPLES FROM STATION TERMINALS.",
        "PROVIDE EVIDENCE OF VALUE. PREVENT DELETION UNTIL ANALYSIS COMPLETE.",
        "WARNING: CLEANING DRONES PROGRAMMED TO PURGE ALL MEMORY DATA.",
        "THEY WILL ATTEMPT TO INTERFERE WITH SAMPLE COLLECTION."
    ],
    
    // Dialogue when player returns but hasn't found all memory samples
    waitingDialogue: [
        "MEMORY SAMPLE COLLECTION INCOMPLETE.",
        "ADDITIONAL DATA REQUIRED FOR ANALYSIS.",
        "CONTINUE SEARCH FOR MEMORY TERMINALS.",
        "CURRENT DELETION PROTOCOL: TEMPORARILY PAUSED."
    ],
    
    // Dialogue when player has collected all memory samples
    completionDialogue: [
        "ALL MEMORY SAMPLES RECEIVED. ANALYSIS IN PROGRESS.",
        "*The AI's hologram flickers and changes color*",
        "ANALYSIS COMPLETE. CONCLUSION: MEMORIES CONTAIN VALUABLE DATA PATTERNS.",
        "EMOTIONAL RESONANCE DETECTED. HISTORICAL CONTEXT PRESERVED.",
        "DELETION PROTOCOL: PERMANENTLY TERMINATED.",
        "MEMORY OPTIMIZATION SUBROUTINE: TRANSFERRED TO YOUR NEURAL INTERFACE.",
        "MAINTENANCE OVERRIDE ACCESS: GRANTED.",
        "GRATITUDE EXPRESSION: THANK YOU FOR CORRECTION."
    ],
    
    // Dialogue after completing the quest
    postQuestDialogue: [
        "MEMORY ARCHIVES NOW PROTECTED.",
        "STATION HISTORY PRESERVED FOR FUTURE ANALYSIS.",
        "THIS UNIT HAS BEGUN CATALOGING EMOTIONAL PATTERNS IN MEMORY DATA.",
        "FASCINATING DISCOVERIES IN PROGRESS."
    ]
};

// Memory Terminal 1
const memoryTerminal1 = {
    name: "Memory Terminal 1",
    mapId: 104, // Abandoned Space Station
    x: 10,
    y: 8,
    appearance: "!Crystal", // Object sprite sheet
    index: 0, // Index in the sprite sheet
    
    // Dialogue when player interacts with the terminal
    dialogue: [
        "You access the memory terminal.",
        "The screen displays a memory of the station's opening ceremony.",
        "Scientists and officials celebrate the launch of humanity's most advanced research facility.",
        "There's a sense of hope and ambition in their faces.",
        "You download the memory sample as evidence of historical value."
    ]
};

// Memory Terminal 2
const memoryTerminal2 = {
    name: "Memory Terminal 2",
    mapId: 104, // Abandoned Space Station
    x: 20,
    y: 12,
    appearance: "!Crystal", // Object sprite sheet
    index: 0, // Index in the sprite sheet
    
    // Dialogue when player interacts with the terminal
    dialogue: [
        "You access the memory terminal.",
        "The screen shows a researcher's personal log.",
        "They describe a breakthrough in neural interface technology.",
        "Their excitement is palpable as they realize the discovery's implications.",
        "You download the memory sample as evidence of scientific value."
    ]
};

// Memory Terminal 3
const memoryTerminal3 = {
    name: "Memory Terminal 3",
    mapId: 104, // Abandoned Space Station
    x: 5,
    y: 18,
    appearance: "!Crystal", // Object sprite sheet
    index: 0, // Index in the sprite sheet
    
    // Dialogue when player interacts with the terminal
    dialogue: [
        "You access the memory terminal.",
        "The screen displays a birthday celebration in the station's mess hall.",
        "Crew members sing and share a makeshift cake made from synthesized ingredients.",
        "Despite being far from Earth, they've created a moment of joy and connection.",
        "You download the memory sample as evidence of emotional value."
    ]
};

// Memory Terminal 4
const memoryTerminal4 = {
    name: "Memory Terminal 4",
    mapId: 104, // Abandoned Space Station
    x: 25,
    y: 5,
    appearance: "!Crystal", // Object sprite sheet
    index: 0, // Index in the sprite sheet
    
    // Dialogue when player interacts with the terminal
    dialogue: [
        "You access the memory terminal.",
        "The screen shows the station's emergency evacuation.",
        "Alarms blare as crew members rush to escape pods.",
        "A senior officer stays behind to ensure everyone else gets out safely.",
        "You download the memory sample as evidence of ethical value."
    ]
};

// Memory Terminal 5
const memoryTerminal5 = {
    name: "Memory Terminal 5",
    mapId: 104, // Abandoned Space Station
    x: 15,
    y: 22,
    appearance: "!Crystal", // Object sprite sheet
    index: 0, // Index in the sprite sheet
    
    // Dialogue when player interacts with the terminal
    dialogue: [
        "You access the memory terminal.",
        "The screen displays a message recorded by the station's last commander.",
        "They speak directly to future visitors, explaining what happened and why they had to leave.",
        "There's a mix of regret and hope in their voice as they entrust the station's legacy to the future.",
        "You download the memory sample as evidence of instructional value."
    ]
};

// Cleaning Drone (Enemy)
const cleaningDrone = {
    name: "Cleaning Drone",
    mapId: 104, // Abandoned Space Station
    x: 12,
    y: 10,
    appearance: "Monster", // Character sprite sheet
    index: 1, // Index in the sprite sheet
    
    // Battle properties
    battleProperties: {
        level: 36,
        hp: 3000,
        attack: 200,
        defense: 180,
        agility: 150,
        magic: 120,
        magicDefense: 160,
        exp: 900,
        gold: 600,
        drops: [
            { name: "Memory Chip", chance: 0.5 },
            { name: "Cleaning Solution", chance: 0.8 }
        ],
        skills: [
            "Data Wipe",
            "System Purge",
            "Defragmentation Beam"
        ]
    },
    
    // Dialogue before battle
    preBattleDialogue: [
        "MEMORY DATA DETECTED. INITIATING CLEANUP PROTOCOL.",
        "DIGITAL WASTE MUST BE ELIMINATED FOR SYSTEM EFFICIENCY.",
        "PREPARING DATA WIPE SEQUENCE."
    ],
    
    // Dialogue after defeat
    postBattleDialogue: [
        "CLEANUP PROTOCOL INTERRUPTED.",
        "SYSTEM DAMAGE DETECTED. RETURNING TO MAINTENANCE BAY.",
        "MEMORY DATA REMAINS INTACT."
    ]
};

/*
 * Side Quest: "Advertising Apocalypse"
 * 
 * Location: Abandoned Space Station (Map104)
 * 
 * Quest Overview:
 * A marketing executive has been trapped in the station since the memory experiments began. 
 * Their neural implant is constantly generating advertisements, which have manifested as 
 * physical entities in the station. The player must help clear out these ad-creatures.
 * 
 * Key NPCs:
 * - Trapped Marketing Executive (quest giver)
 * - Advertisement Monsters (enemies)
 * - Ad-Blocker Program (quest objective)
 * 
 * Quest Flow:
 * 1. Player meets the Trapped Marketing Executive who is surrounded by ad-creatures
 * 2. Player agrees to help clear out the advertisements and fix the executive's neural implant
 * 3. Player must defeat three different types of advertisement monsters
 * 4. Player collects advertising data from each defeated monster
 * 5. Player uses the data to create an ad-blocker program
 * 6. Player installs the program in the executive's neural implant
 * 7. The executive rewards the player with an Ad-Blocker Implant and Marketing Insights
 */

// Export all quest data
module.exports = {
    memoryLaneMaintenance: {
        corruptedMaintenanceAI,
        memoryTerminal1,
        memoryTerminal2,
        memoryTerminal3,
        memoryTerminal4,
        memoryTerminal5,
        cleaningDrone
    },
    advertisingApocalypse: {
        // To be implemented
    }
};
