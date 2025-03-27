// Level 36-37 Quests for MegaEarth 2049
// This file contains the quest data for levels 36 and 37

/*
 * Level 36 Quest: "Digital Dementia"
 * 
 * Location: Abandoned Space Station (Map104) → NeuraTech Facility (Map106)
 * 
 * Quest Overview: 
 * A malfunctioning NeuraTech employee is experiencing "digital dementia" - 
 * their memories are being randomly replaced with bizarre advertisements.
 * The player must collect three memory fragments and bring them to Dr. Lovelace
 * at the NeuraTech Facility.
 * 
 * Key NPCs:
 * - Malfunctioning Employee (Space Station)
 * - Dr. Lovelace (NeuraTech Facility)
 * - Memory Fragments (collectible items)
 * 
 * Quest Flow:
 * 1. Player meets Malfunctioning Employee who randomly spouts absurd product slogans
 * 2. Player agrees to help and must find three memory fragments scattered around the station
 * 3. Each fragment reveals part of the story about NeuraTech's memory manipulation experiments
 * 4. After collecting all fragments, player takes them to Dr. Lovelace
 * 5. Dr. Lovelace reveals that her memory integration technology has been corrupted for advertising
 * 6. She gives the player a Neural Firewall and asks them to investigate Quantum Dynamics
 */

// Malfunctioning Employee NPC
const malfunctioningEmployee = {
    name: "Malfunctioning Employee",
    mapId: 104, // Abandoned Space Station
    x: 12,
    y: 8,
    appearance: "Actor2", // Character sprite sheet
    index: 5, // Index in the sprite sheet
    
    // Initial dialogue with random ad slogans
    dialogue: [
        "*The employee's eyes flicker with digital static*",
        "NEW! BURLAP UNDERWEAR! FEEL THE SCRATCH THAT MEANS IT'S WORKING! Wait... what was I...",
        "Sorry about that. I keep getting these... DRINK LIQUID COURAGE! IT'S LIKE REGULAR COURAGE BUT WET AND PROBABLY FLAMMABLE!",
        "*shakes head violently* Something's wrong with my neural implant. NeuraTech was testing some new memory tech and now I can't stop... ASPARAGUS-FLAVORED TOOTHPASTE! TASTE THE VEGETABLE FRESHNESS!"
    ],
    
    // Quest acceptance dialogue
    questDialogue: [
        "Thank you! You need to find Dr. Lovelace at the NeuraTech Facility. She was leading the memory experiments.",
        "But first, I need you to collect three memory fragments that escaped from my brain. They're floating around the station somewhere.",
        "They look like little glowing orbs. BIOLUMINESCENT NOSE HAIR! LIGHT UP THE NIGHT WITH YOUR NOSTRILS!"
    ],
    
    // Dialogue when player returns but hasn't found all fragments
    waitingDialogue: [
        "Have you found all three memory fragments?",
        "I can feel the holes in my brain where they should be. MEMORY HOLES! PERFECT FOR STORING SMALL ITEMS OR EXISTENTIAL DREAD!"
    ],
    
    // Dialogue when player returns with all fragments
    completionDialogue: [
        "You found them all! I can feel my mind clearing up already. Still getting some...",
        "QUANTUM TOAST! IT'S SIMULTANEOUSLY BURNT AND RAW UNTIL YOU OBSERVE IT!",
        "Now you need to take those fragments to Dr. Lovelace at the NeuraTech Facility.",
        "She'll know what to do with them. And maybe she can explain why NeuraTech is pumping these bizarre ads into our brains."
    ]
};

// Memory Fragment 1
const memoryFragment1 = {
    name: "Memory Fragment 1",
    mapId: 104, // Abandoned Space Station
    x: 5,
    y: 12,
    appearance: "!Crystal", // Object sprite sheet
    index: 2, // Index in the sprite sheet
    
    // Dialogue when player interacts with the fragment
    dialogue: [
        "You found a memory fragment!",
        "It pulses with digital energy as you touch it.",
        "*The fragment projects a holographic memory*",
        "You see the employee in a NeuraTech lab, strapped to a chair while scientists inject glowing blue fluid into their neural ports.",
        "SCIENTIST: 'Ad integration successful. Subject now perceives Burlap-brand products as essential to survival. Moving to phase 2.'"
    ]
};

// Memory Fragment 2
const memoryFragment2 = {
    name: "Memory Fragment 2",
    mapId: 104, // Abandoned Space Station
    x: 18,
    y: 15,
    appearance: "!Crystal", // Object sprite sheet
    index: 2, // Index in the sprite sheet
    
    // Dialogue when player interacts with the fragment
    dialogue: [
        "You found a memory fragment!",
        "It pulses with digital energy as you touch it.",
        "*The fragment projects a holographic memory*",
        "You see a boardroom meeting at NeuraTech. Executives are reviewing sales charts.",
        "EXECUTIVE: 'The neural ad integration is working perfectly. Sales of completely useless products are up 500%. But we need to push further. Quantum Dynamics has the tech to make this go multiverse-wide.'"
    ]
};

// Memory Fragment 3
const memoryFragment3 = {
    name: "Memory Fragment 3",
    mapId: 104, // Abandoned Space Station
    x: 10,
    y: 20,
    appearance: "!Crystal", // Object sprite sheet
    index: 2, // Index in the sprite sheet
    
    // Dialogue when player interacts with the fragment
    dialogue: [
        "You found a memory fragment!",
        "It pulses with digital energy as you touch it.",
        "*The fragment projects a holographic memory*",
        "You see Dr. Lovelace in her lab, talking to what appears to be... her computer?",
        "DR. LOVELACE: 'Oh ALAN, you're the only one who understands me. These corporate suits want to use my memory tech for ADVERTISING. It was meant for LOVE! For connecting minds!'",
        "COMPUTER: 'PROCESSING EMOTIONAL CONTENT. I LOVE YOU TOO, REBECCA. WOULD YOU LIKE TO PURCHASE BURLAP UNDERWEAR?'"
    ]
};

// Dr. Lovelace NPC
const drLovelace = {
    name: "Dr. Lovelace",
    mapId: 106, // NeuraTech Facility
    x: 10,
    y: 10,
    appearance: "People1", // Character sprite sheet
    index: 0, // Index in the sprite sheet
    
    // Initial dialogue before quest
    initialDialogue: [
        "*Dr. Lovelace is typing furiously on her computer terminal*",
        "Not now! I'm having a very important conversation with ALAN."
    ],
    
    // Dialogue when player visits during quest but without all fragments
    waitingDialogue: [
        "You're looking for memory fragments? Yes, I've been tracking those.",
        "My poor test subjects... I mean, valued volunteers.",
        "Find all three fragments and bring them back."
    ],
    
    // Dialogue when player returns with all fragments
    completionDialogue: [
        "You found all three memory fragments! Let me analyze them...",
        "*Dr. Lovelace connects the fragments to her terminal. Her face grows increasingly alarmed*",
        "This is worse than I thought. They've corrupted my memory integration technology!",
        "It was supposed to help people share experiences, not force-feed them ads for burlap underwear!",
        "And now they're working with Quantum Dynamics on something called 'Project Crossover.' They're going to merge corporate realities!",
        "Take this Neural Firewall. It will protect you from their memory manipulation.",
        "You need to infiltrate Quantum Dynamics and find out what they're planning."
    ],
    
    // Dialogue after completing the quest
    postQuestDialogue: [
        "Hurry to Quantum Dynamics! If they activate Project Crossover, we could see reality glitches everywhere.",
        "Imagine - OmniCorp guns that shoot Vitalix flesh-mods while playing Armatek construction jingles!",
        "*whispers to her computer* Don't worry, ALAN. I won't let them corrupt our love with their corporate nonsense."
    ]
};

/*
 * Level 37 Quest: "Corporate Crossover Crisis"
 * 
 * Location: NeuraTech Facility (Map106) → Quantum Dynamics Facility (Map110)
 * 
 * Quest Overview:
 * The memory manipulation technology was just a test for a larger corporate scheme - 
 * the five MegaCorps are working on a "Corporate Crossover" project to merge their technologies.
 * The player must infiltrate Quantum Dynamics to sabotage the project before it creates
 * a catastrophic reality glitch.
 * 
 * Key NPCs:
 * - Suspicious Janitor (corporate spy in disguise)
 * - MAX-E-MUM (security robot obsessed with fitness)
 * - Professor Paradox (time-confused scientist)
 * 
 * Quest Flow:
 * 1. Player meets the Suspicious Janitor who reveals the Corporate Crossover plot
 * 2. Player must sabotage three key terminals in the Quantum Dynamics facility
 * 3. MAX-E-MUM guards the facility but can be defeated or distracted with fitness talk
 * 4. Each sabotaged terminal shows increasingly bizarre reality glitches
 * 5. After sabotaging all terminals, Professor Paradox rewards the player with a Quantum Stabilizer
 */

// Suspicious Janitor NPC
const suspiciousJanitor = {
    name: "Suspicious Janitor",
    mapId: 110, // Quantum Dynamics Facility
    x: 8,
    y: 12,
    appearance: "Actor1", // Character sprite sheet
    index: 7, // Index in the sprite sheet
    
    // Initial dialogue before quest
    initialDialogue: [
        "*The janitor mops the same spot repeatedly*",
        "Nothing to see here. Just cleaning up.",
        "Definitely not spying on anything. Nope."
    ],
    
    // Dialogue when quest is active
    questDialogue: [
        "*The janitor looks around nervously*",
        "Psst! Over here! You're looking for info on Project Crossover, right?",
        "I've been spying on Quantum Dynamics for months. They're planning to merge all five corporate realities!",
        "You need to sabotage three key systems to stop the project. They're scattered around the facility.",
        "Look for terminals with the Quantum Dynamics logo. But watch out for MAX-E-MUM, the security robot. He's... enthusiastic."
    ],
    
    // Dialogue after initial conversation
    followupDialogue: [
        "*pretends to mop while whispering*",
        "Remember, three terminals. And if anyone asks, you never saw me.",
        "I'm just a janitor who happens to know top-secret corporate plans. Totally normal. Nothing suspicious at all."
    ]
};

// MAX-E-MUM Security Robot NPC
const maxEMum = {
    name: "MAX-E-MUM",
    mapId: 110, // Quantum Dynamics Facility
    x: 15,
    y: 15,
    appearance: "Monster", // Character sprite sheet
    index: 3, // Index in the sprite sheet
    
    // Initial dialogue before quest
    initialDialogue: [
        "SECURITY PROTOCOL ACTIVE. SCANNING...",
        "NO THREATS DETECTED. CONTINUING PATROL.",
        "REMEMBER: MAXIMUM SECURITY MEANS MAXIMUM GAINS!"
    ],
    
    // Dialogue when quest is active
    confrontationDialogue: [
        "INTRUDER DETECTED! PREPARE FOR MAXIMUM SECURITY!",
        "*flexes robotic arms threateningly*",
        "DO YOU EVEN LIFT, INTRUDER? I LIFT SECURITY PROTOCOLS ALL DAY! EVERY DAY IS SECURITY DAY!"
    ],
    
    // Combat option dialogue
    combatDialogue: [
        "COMBAT MODE ACTIVATED! PREPARE FOR MAXIMUM PAIN!",
        // Battle processing would occur here
        "SYSTEM... FAILURE... NEED... MORE... PROTEIN..." // If player wins
    ],
    
    // Fitness talk option dialogue
    fitnessDialogue: [
        "YOU WANT FITNESS TIPS? FINALLY, SOMEONE WHO APPRECIATES THE TEMPLE THAT IS MY CHASSIS!",
        "*spends 20 minutes talking about oil-based protein shakes and proper joint lubrication*",
        "...AND THAT'S WHY I NEVER SKIP SECURITY DAY! WAIT, I WAS SUPPOSED TO BE GUARDING SOMETHING.",
        "OH WELL, YOU SEEM COOL. CARRY ON, BRO!"
    ],
    
    // Run away option dialogue
    runDialogue: [
        "CARDIO IS THE FOUNDATION OF FITNESS! RUN, HUMAN!",
        "I'LL CATCH YOU EVENTUALLY! LEG DAY WAS YESTERDAY AND I'M STILL FEELING IT!"
    ],
    
    // Dialogue after being defeated/distracted
    defeatedDialogue: [
        "*MAX-E-MUM is doing robot push-ups*",
        "999,997... 999,998... 999,999... ONE MILLION!",
        "YEAH! MAXIMUM EFFORT! MAXIMUM RESULTS!",
        "*completely ignores you now*"
    ]
};

// Sabotage Terminal 1
const sabotageTerminal1 = {
    name: "Quantum Terminal 1",
    mapId: 110, // Quantum Dynamics Facility
    x: 5,
    y: 5,
    appearance: "!Crystal", // Object sprite sheet
    index: 3, // Index in the sprite sheet
    
    // Initial dialogue before quest
    initialDialogue: [
        "A high-tech terminal with the Quantum Dynamics logo.",
        "It seems to be running some kind of simulation."
    ],
    
    // Dialogue when quest is active
    activeDialogue: [
        "A terminal running Project Crossover simulations.",
        "The screen shows various corporate products merging together in disturbing ways."
    ],
    
    // Dialogue when player chooses to sabotage
    sabotageDialogue: [
        "You access the terminal and begin corrupting the simulation data.",
        "The screen flickers and displays: 'REALITY COEFFICIENT DESTABILIZED'",
        "As you finish, the terminal briefly shows an ad for 'QUANTUM BURLAP - UNDERWEAR THAT EXISTS IN MULTIPLE DIMENSIONS SIMULTANEOUSLY!'"
    ]
};

// Sabotage Terminal 2
const sabotageTerminal2 = {
    name: "Quantum Terminal 2",
    mapId: 110, // Quantum Dynamics Facility
    x: 18,
    y: 8,
    appearance: "!Crystal", // Object sprite sheet
    index: 3, // Index in the sprite sheet
    
    // Initial dialogue before quest
    initialDialogue: [
        "A high-tech terminal with the Quantum Dynamics logo.",
        "It seems to be running some kind of simulation."
    ],
    
    // Dialogue when quest is active
    activeDialogue: [
        "A terminal controlling reality stabilizers.",
        "The screen shows five corporate logos slowly merging into one horrifying mega-logo."
    ],
    
    // Dialogue when player chooses to sabotage
    sabotageDialogue: [
        "You access the terminal and reverse the polarity of the reality stabilizers.",
        "The screen glitches and displays: 'DIMENSIONAL INTEGRITY COMPROMISED'",
        "For a moment, you see yourself wearing burlap underwear in the reflection of the screen.",
        "Thankfully, it's just a glitch... you hope."
    ]
};

// Sabotage Terminal 3
const sabotageTerminal3 = {
    name: "Quantum Terminal 3",
    mapId: 110, // Quantum Dynamics Facility
    x: 12,
    y: 18,
    appearance: "!Crystal", // Object sprite sheet
    index: 3, // Index in the sprite sheet
    
    // Initial dialogue before quest
    initialDialogue: [
        "A high-tech terminal with the Quantum Dynamics logo.",
        "It seems to be running some kind of simulation."
    ],
    
    // Dialogue when quest is active
    activeDialogue: [
        "The main Project Crossover control terminal.",
        "The screen shows a countdown to 'CORPORATE SINGULARITY' with various metrics and projections."
    ],
    
    // Dialogue when player chooses to sabotage
    sabotageDialogue: [
        "You access the terminal and upload a virus that replaces all corporate synergy algorithms with recipes for various pasta dishes.",
        "The screen flashes 'CRITICAL ERROR: INSUFFICIENT GARLIC BREAD FOR CORPORATE MERGER' before shutting down completely."
    ]
};

// Professor Paradox NPC
const professorParadox = {
    name: "Professor Paradox",
    mapId: 110, // Quantum Dynamics Facility
    x: 10,
    y: 10,
    appearance: "Actor3", // Character sprite sheet
    index: 6, // Index in the sprite sheet
    
    // Initial dialogue before quest
    initialDialogue: [
        "*The professor appears to be having a conversation with... himself? But there's only one of him.*",
        "Yes, I know the temporal implications! I was there yesterday! Or will be tomorrow! Whatever!"
    ],
    
    // Dialogue when quest is active but not all terminals sabotaged
    midQuestDialogue: [
        "Ah! You're the one who will sabotage/has sabotaged/is sabotaging the terminals!",
        "Excellent! I've been expecting you since last week, which is actually next month from your perspective.",
        "You need to sabotage all three terminals to prevent the corporate reality merger.",
        "Trust me, I've seen the future/past/alternate timeline where it happens. Everyone wears burlap EVERYTHING."
    ],
    
    // Dialogue when all terminals are sabotaged
    completionDialogue: [
        "You did it! You've sabotaged all three terminals!",
        "Project Crossover has been stopped! The corporate realities will remain separate, as nature intended.",
        "*The professor hands you a strange device*",
        "Take this Quantum Stabilizer. It will protect you from any lingering reality glitches.",
        "I've already given it to you next Tuesday, but this timeline needs it now.",
        "Oh, and watch out for those burlap underwear ads. They're surprisingly persuasive across all quantum realities.",
        "Even I bought three pairs! *scratches uncomfortably*"
    ]
};

// Export all quest data
module.exports = {
    level36: {
        malfunctioningEmployee,
        memoryFragment1,
        memoryFragment2,
        memoryFragment3,
        drLovelace
    },
    level37: {
        suspiciousJanitor,
        maxEMum,
        sabotageTerminal1,
        sabotageTerminal2,
        sabotageTerminal3,
        professorParadox
    }
};
