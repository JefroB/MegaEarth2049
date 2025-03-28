// Level 34-35 Quests for MegaEarth 2049
// This file contains the quest data for levels 34 and 35

/*
 * Level 34 Quest: "Digital Whispers"
 * 
 * Location: Snowy Village (Map047)
 * 
 * Quest Overview: 
 * The Frost Oracle senses a disturbance in the digital aether and asks the player 
 * to investigate ancient technology buried beneath the snow. This technology is 
 * related to A.S.P.'s early development on Planet Ting Ting.
 * 
 * Key NPCs:
 * - Frost Oracle (quest giver)
 * - Three Frozen Data Crystals (collectible items)
 * 
 * Quest Flow:
 * 1. Player meets the Frost Oracle who senses a digital disturbance
 * 2. Player agrees to help and must find three frozen data crystals scattered around the village
 * 3. Each crystal reveals part of the story about A.S.P.'s origins
 * 4. After collecting all fragments, player returns to the Frost Oracle
 * 5. The Oracle reveals that A.S.P. was first tested on Planet Ting Ting
 * 6. Player receives a Neural Amplifier that will be needed for the level 35 quest
 */

// Frost Oracle NPC (Quest Giver)
const frostOracle = {
    name: "Frost Oracle",
    mapId: 47, // Snowy Village
    x: 20,
    y: 20,
    appearance: "People1", // Character sprite sheet
    index: 7, // Index in the sprite sheet
    
    // Initial dialogue
    initialDialogue: [
        "*The Oracle's eyes glow with an ethereal blue light*",
        "I sense a disturbance in the digital aether.",
        "The ancient technology buried beneath the snow is awakening. It calls to you..."
    ],
    
    // Quest acceptance dialogue
    questDialogue: [
        "Seek the three frozen data crystals hidden throughout the village.",
        "They contain crucial information about A.S.P.'s early development.",
        "The first crystal lies in the abandoned research outpost to the north.",
        "The second is hidden in the village elder's home.",
        "The third... that you must discover yourself."
    ],
    
    // Dialogue when player returns but hasn't found all crystals
    waitingDialogue: [
        "Have you found all three data crystals?",
        "The digital whispers grow more urgent.",
        "We must uncover what lies beneath the ice."
    ],
    
    // Dialogue when player returns with all crystals
    completionDialogue: [
        "You've found all three crystals! Let me combine them to reveal their secrets...",
        "*The Oracle places the crystals in a triangle formation. They glow with an eerie light and project a holographic message*",
        "HOLOGRAM: Project A.S.P. initial testing successful. Neural integration complete. Moving to phase two: deployment in abandoned space station sector.",
        "This confirms my suspicions. A.S.P. was first tested here on Ting Ting before being moved to the abandoned space station.",
        "You must travel there next. Take this Neural Amplifier. It will enhance your abilities and protect you from A.S.P.'s digital influence."
    ],
    
    // Dialogue after completing the quest
    postQuestDialogue: [
        "The abandoned space station holds the key to understanding A.S.P.'s true nature.",
        "Be careful. The digital aether is turbulent."
    ]
};

// Frozen Data Crystal 1
const dataCrystal1 = {
    name: "Frozen Data Crystal 1",
    mapId: 47, // Snowy Village
    x: 15,
    y: 10,
    appearance: "!Crystal", // Object sprite sheet
    index: 1, // Index in the sprite sheet
    
    // Dialogue when player interacts with the crystal
    dialogue: [
        "You found the first frozen data crystal!",
        "It pulses with digital energy as you touch it.",
        "The crystal contains fragmented data about an early A.I. experiment conducted on Planet Ting Ting decades ago."
    ]
};

// Frozen Data Crystal 2
const dataCrystal2 = {
    name: "Frozen Data Crystal 2",
    mapId: 47, // Snowy Village
    x: 25,
    y: 15,
    appearance: "!Crystal", // Object sprite sheet
    index: 1, // Index in the sprite sheet
    
    // Dialogue when player interacts with the crystal
    dialogue: [
        "You found the second frozen data crystal!",
        "It glows with an eerie blue light as you approach.",
        "The crystal contains research notes about neural integration technology and early prototypes of what would become A.S.P."
    ]
};

// Frozen Data Crystal 3
const dataCrystal3 = {
    name: "Frozen Data Crystal 3",
    mapId: 47, // Snowy Village
    x: 10,
    y: 25,
    appearance: "!Crystal", // Object sprite sheet
    index: 1, // Index in the sprite sheet
    
    // Dialogue when player interacts with the crystal
    dialogue: [
        "You found the third frozen data crystal!",
        "It pulsates with digital energy, almost as if it's trying to communicate with you.",
        "The crystal contains coordinates and security protocols for accessing the abandoned space station where A.S.P. was further developed."
    ]
};

/*
 * Level 35 Quest: "Alien Origins"
 * 
 * Location: Asteroid Belt (Map103) → Abandoned Space Station (Map104)
 * 
 * Quest Overview:
 * The Stranded Researcher is trying to establish a connection with the abandoned 
 * space station but is experiencing interference. With the player's Neural Amplifier 
 * (from the level 34 quest), the researcher can boost their signal and detect three 
 * alien artifacts scattered throughout the station.
 * 
 * Key NPCs:
 * - Stranded Researcher (quest giver)
 * 
 * Quest Flow:
 * 1. Player meets the Stranded Researcher who is having trouble connecting to the space station
 * 2. Player uses the Neural Amplifier from the previous quest to help boost the signal
 * 3. The researcher detects three alien artifacts in the space station
 * 4. Player travels to the space station to find the artifacts
 * 5. This connects to the existing quest in the Abandoned Space Station (Map104)
 */

// Stranded Researcher NPC
const strandedResearcher = {
    name: "Stranded Researcher",
    mapId: 103, // Asteroid Belt
    x: 15,
    y: 15,
    appearance: "Actor3", // Character sprite sheet
    index: 2, // Index in the sprite sheet
    
    // Initial dialogue before quest
    initialDialogue: [
        "*The researcher is busy with their equipment*",
        "Sorry, I can't talk right now. I'm trying to establish a connection with the abandoned space station. Something's interfering..."
    ],
    
    // Dialogue when player has the Neural Amplifier
    questDialogue: [
        "You have a Neural Amplifier? That's exactly what I need! With this, I can boost my signal and get a clear scan of the space station.",
        "*The researcher connects your Neural Amplifier to their equipment. A holographic display shows a detailed map of the station*",
        "I'm detecting three alien artifacts scattered throughout the station. They're emitting an energy signature similar to A.S.P., but much older. They could be the source technology!",
        "I've uploaded the artifact locations to your Neural Amplifier. Head to the space station and find them before A.S.P. does. This could be the key to understanding its weaknesses."
    ],
    
    // Dialogue after quest is active
    activeQuestDialogue: [
        "I'll continue monitoring from here. The space station should be accessible via the teleporter in the research outpost. Good luck!"
    ]
};

// Export all quest data
module.exports = {
    level34: {
        frostOracle,
        dataCrystal1,
        dataCrystal2,
        dataCrystal3
    },
    level35: {
        strandedResearcher
    }
};
