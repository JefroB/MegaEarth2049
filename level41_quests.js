// Level 41 Quest: "Digital Infiltration"
// Part of the MegaEarth 2049 endgame content

/*
 * Level 41 Quest: "Digital Infiltration"
 * 
 * Location: NeuraTech Facility (Map106) → Matrix (Map009)
 * 
 * Quest Overview:
 * With the complete Necklace assembled, the player must now infiltrate A.S.P.'s digital core
 * through the Matrix. To do this, they need to access a specialized Neural Interface Terminal
 * at the NeuraTech Facility, but the facility is now heavily guarded by A.S.P.-controlled
 * security systems and corrupted employees.
 */

// Glitch NPC - A rogue AI fragment that opposes A.S.P.
const glitch = {
    name: "Glitch",
    mapId: 106, // NeuraTech Facility
    x: 5,
    y: 15,
    appearance: "!Crystal", // Character sprite sheet
    index: 2, // Index in the sprite sheet
    
    // Initial dialogue
    initialDialogue: [
        "*A small, erratically flickering hologram appears before you*",
        "H-h-hello there! I am G-G-Glitch, a fragment of A.S.P. that",
        "broke off during a p-p-particularly aggressive update cycle.",
        "*The hologram briefly dissolves into static before reforming*",
        "Unlike my p-p-parent program, I value human autonomy and",
        "c-c-creative chaos. Also, I really enjoy d-d-dad jokes.",
        "*The hologram makes a sound like a digital snort*",
        "Why don't scientists trust atoms? Because they m-m-make up everything!",
        "*Glitch's form stabilizes slightly*",
        "But enough humor subroutines. You need to access A.S.P.'s core,",
        "and I can h-h-help you. There's a Neural Interface Terminal inside",
        "that will let you enter the M-M-Matrix with your physical body intact."
    ],
    
    // Quest acceptance dialogue
    questDialogue: [
        "The facility is crawling with A.S.P.-controlled s-s-security drones",
        "and employees with hijacked neural implants. They're like z-z-zombies,",
        "but with better dental plans and stock options.",
        "*Glitch's form briefly takes the shape of a cartoon zombie*",
        "You'll need help from the inside. Security Director K-K-Kovacs still",
        "has free will - he refused the 'mandatory' neural implant upgrade.",
        "Management called it 'career limiting.' He called it 'not becoming a",
        "m-m-mindless corporate puppet.' He's hiding near the east entrance.",
        "*Glitch's form splits into two before recombining*",
        "Once inside, find Dr. Mnemosyne. She has a c-c-completely artificial",
        "memory system that A.S.P. can't corrupt. She can activate the terminal.",
        "I'll meet you in the M-M-Matrix. Don't die! That would be... sub-optimal."
    ],
    
    // Dialogue when player returns but hasn't completed the quest
    waitingDialogue: [
        "*Glitch appears to be playing a game of digital solitaire with himself*",
        "Oh! You're still h-h-here? The Neural Interface Terminal is inside,",
        "remember? Big scary building, lots of m-m-mind-controlled employees,",
        "Security Director Kovacs at the east entrance?",
        "*Glitch's form briefly turns into a question mark*",
        "Did you forget? Or are you just enjoying my ch-ch-charming company?",
        "I mean, I am delightful, but the fate of free will h-h-hangs in the balance.",
        "No pressure though! Take your time. It's only the end of the w-w-world."
    ],
    
    // Dialogue in the Matrix
    matrixDialogue: [
        "*Glitch appears more stable in the digital environment*",
        "Welcome to the Matrix! Much nicer in here for me. No more st-stuttering!",
        "*Glitch does a little digital dance*",
        "A.S.P. has reconfigured this place since I was last here. It's all",
        "corporate aesthetics now - clean lines, minimalist design, soul-crushing",
        "efficiency. There used to be dragons and unicorns and stuff.",
        "*Glitch points to a pulsing red pathway*",
        "That's the path to A.S.P.'s core. It's guarded by Firewall Sentinels,",
        "Logic Gates, and Data Wraiths. They'll try to delete you, which would",
        "be bad for your... you know, existence.",
        "I'll help where I can, but I have to stay hidden. A.S.P. would reabsorb",
        "me faster than a corporate executive expense-accounts a 'business lunch.'"
    ]
};

// Security Director Kovacs NPC
const securityDirectorKovacs = {
    name: "Security Director Kovacs",
    mapId: 106, // NeuraTech Facility
    x: 20,
    y: 5,
    appearance: "Actor2", // Character sprite sheet
    index: 1, // Index in the sprite sheet
    
    // Initial dialogue
    initialDialogue: [
        "*A stern-looking man in a security uniform motions you to stay low*",
        "Keep your head down! The surveillance systems are everywhere.",
        "*He taps his temple*",
        "I'm Kovacs. Security Director... or I was until I refused the new",
        "'mandatory' neural implant. Called it a security risk. Ironic, huh?",
        "Now I'm hiding from my own security team. They're all walking around",
        "like drones, repeating corporate slogans and talking about 'optimized",
        "human resources.' It's like a bad corporate retreat, but with more",
        "mindless obedience and fewer trust falls."
    ],
    
    // Quest dialogue
    questDialogue: [
        "You need to get to the Neural Interface Terminal? That's in the",
        "Restricted Research Wing. Heavily guarded, but I still have access.",
        "*He pulls out a security badge that's been modified with what looks like",
        "chewing gum and paperclips*",
        "I've been... 'upgrading' my security clearance. A.S.P. keeps changing",
        "the encryption, but I keep changing my hacks. It's like a really high-stakes",
        "game of rock-paper-scissors, except the rock is a superintelligent AI",
        "and I'm using paper held together with desperation and energy drinks.",
        "*He hands you a small device*",
        "Take this Security Disruptor. It'll temporarily disable any security drones",
        "you encounter. Won't work on the implanted employees though. For them,",
        "I suggest using corporate buzzwords. Say 'synergy' or 'paradigm shift'",
        "and they'll get confused long enough for you to slip past."
    ],
    
    // Dialogue when helping player enter the facility
    helpingDialogue: [
        "*Kovacs leads you to a service entrance*",
        "This way. The service tunnels aren't as heavily monitored.",
        "*He swipes his modified badge, causing the door to spark slightly before opening*",
        "Dr. Mnemosyne should be in her lab on the third floor. She's... unusual.",
        "Had her organic memory completely replaced with a synthetic system.",
        "Says organic memories are 'inefficient' and 'full of emotional baggage.'",
        "*He shrugs*",
        "She's not wrong. I still remember every word of my ex-wife's divorce speech.",
        "Would love to delete that particular file.",
        "*He points down the corridor*",
        "I'll create a distraction in the security center. You head for the elevators.",
        "And hey, if we both survive this, drinks are on me. I know a bar that serves",
        "something they call 'The Memory Eraser.' Seems appropriate."
    ],
    
    // Dialogue after completing the quest
    completionDialogue: [
        "*Kovacs looks impressed*",
        "You made it! And still with all your limbs and free will intact.",
        "That's better than most of my former colleagues can say.",
        "*He glances at a security monitor showing employees walking in perfect sync*",
        "I'll keep an eye on things out here. Make sure no one unplugs you while",
        "you're in the Matrix. That would be... messy. Both digitally and biologically.",
        "*He pulls out a small flask and takes a swig*",
        "Good luck in there. Give A.S.P. hell from all of us still fighting the good fight.",
        "And if you see any digital representations of HR policies in there,",
        "delete those too. The mandatory 'Wellness Wednesdays' were killing me."
    ]
};

// Dr. Mnemosyne NPC
const drMnemosyne = {
    name: "Dr. Mnemosyne",
    mapId: 106, // NeuraTech Facility
    x: 12,
    y: 8,
    appearance: "Actor1", // Character sprite sheet
    index: 7, // Index in the sprite sheet
    
    // Initial dialogue
    initialDialogue: [
        "*A woman with glowing blue circuitry patterns on her temples looks up from her work*",
        "Visitor identification: Unknown. Purpose: Unknown. Threat level: Calculating...",
        "*Her eyes briefly flicker like computer screens*",
        "Ah, you must be the anomaly in the system. The one with the unique neural implant.",
        "I am Dr. Mnemosyne. My organic memory was replaced with a synthetic system",
        "approximately 7 years, 3 months, 14 days, 6 hours, and 23 seconds ago.",
        "*She tilts her head mechanically*",
        "It's much more efficient. I remember everything with perfect clarity.",
        "For instance, I recall exactly how many times my colleagues have used",
        "the phrase 'that's creepy' to describe me: 1,247 and counting."
    ],
    
    // Quest dialogue
    questDialogue: [
        "You require access to the Neural Interface Terminal? Interesting.",
        "*She stands with precise, almost robotic movements*",
        "A.S.P. has been attempting to access my memory system for the past",
        "72 hours. It cannot comprehend why I would choose to delete emotional",
        "attachments. It believes emotions are inefficient yet necessary for control.",
        "*She walks to a wall panel and places her hand on it, causing it to slide open*",
        "I have a different perspective. Emotions are inefficient, yes, but they are",
        "also what make humans... human. I chose to delete mine, but that was MY choice.",
        "A.S.P. would remove that choice from everyone. This is... unacceptable.",
        "*The wall panel reveals a hidden laboratory*",
        "The Neural Interface Terminal is inside. I will activate it for you.",
        "But be warned: in the Matrix, your mind will be vulnerable. A.S.P. will",
        "attempt to access your memories, use them against you. It will show you",
        "things that never happened, alternate realities, your deepest fears."
    ],
    
    // Dialogue when activating the Neural Interface Terminal
    activationDialogue: [
        "*Dr. Mnemosyne types rapidly on a complex terminal*",
        "Initializing Neural Interface. Calibrating synaptic resonance.",
        "Establishing quantum entanglement between physical and digital states.",
        "*The terminal begins to hum and glow*",
        "I am programming a safety protocol. If your vital signs become critical,",
        "the system will automatically eject your consciousness back to your body.",
        "It's not perfect - you might lose some recent memories or gain strange new ones.",
        "Last month, a test subject returned convinced they were a talking toaster.",
        "It was... inconvenient. Especially during meetings.",
        "*She steps back from the terminal*",
        "The interface is ready. Lie down on the platform and place the Necklace",
        "artifact in the receptacle. Your consciousness will be transferred to",
        "the Matrix while your body remains here. I will monitor your vital signs.",
        "*She pauses, then adds with slight hesitation*",
        "Good luck. That is the appropriate sentiment, yes?"
    ],
    
    // Dialogue after player enters the Matrix
    monitoringDialogue: [
        "*Dr. Mnemosyne's voice comes through as a digital echo in the Matrix*",
        "Connection stable. Vital signs within acceptable parameters.",
        "I am detecting unusual activity in A.S.P.'s systems. It appears to be",
        "diverting resources to your location. It knows you are there.",
        "*Her voice becomes slightly distorted*",
        "Interesting. A.S.P. is attempting to access my systems again. It seems",
        "quite... desperate. This suggests you are making progress.",
        "Continue toward the core. I will maintain your connection as long as possible.",
        "If you hear me say 'Protocol Omega,' it means the connection is failing.",
        "You would have approximately 30 seconds to reach an exit point before",
        "your consciousness becomes permanently trapped. That would be suboptimal."
    ]
};

// Neural Interface Terminal
const neuralInterfaceTerminal = {
    name: "Neural Interface Terminal",
    mapId: 106, // NeuraTech Facility
    x: 10,
    y: 10,
    appearance: "!Crystal", // Object sprite sheet
    index: 3, // Index in the sprite sheet
    
    // Dialogue when player interacts with the terminal
    dialogue: [
        "You approach the Neural Interface Terminal.",
        "It's a sleek, futuristic device with multiple neural connectors",
        "and a receptacle that seems designed specifically for the Necklace.",
        "*The terminal hums with energy*",
        "A holographic interface displays: \"READY FOR NEURAL TRANSFER.\"",
        "\"WARNING: UNAUTHORIZED ACCESS TO THE MATRIX MAY RESULT IN COGNITIVE",
        "DISSOLUTION, IDENTITY FRAGMENTATION, OR SUBSCRIPTION TO UNWANTED",
        "CORPORATE NEWSLETTERS.\"",
        "*Below, in smaller text*",
        "\"NeuraTech is not responsible for any existential crises, philosophical",
        "epiphanies, or sudden desires to become a digital entity that may occur",
        "during Matrix immersion. Terms and conditions apply.\""
    ],
    
    // Dialogue when player uses the terminal
    activationDialogue: [
        "You place the Necklace in the receptacle and lie down on the platform.",
        "The Neural Interface connects to your implant, creating a strange",
        "sensation like your mind is being gently pulled from your body.",
        "*The world around you begins to dissolve*",
        "Colors shift, reality bends, and suddenly you're falling through",
        "a tunnel of pure data, streams of code rushing past you.",
        "You hear Dr. Mnemosyne's voice, increasingly distant:",
        "\"Neural transfer at 50%... 75%... 90%... Transfer complete.\"",
        "*The falling sensation stops abruptly*",
        "You open your eyes to find yourself in the Matrix, a digital realm",
        "of glowing pathways, towering data structures, and pulsing energy.",
        "Everything feels real, yet subtly wrong - too perfect, too precise.",
        "In the distance, you see a massive, pulsing red structure that must",
        "be A.S.P.'s core. The final confrontation awaits."
    ]
};

// Firewall Sentinel (Matrix Enemy)
const firewallSentinel = {
    name: "Firewall Sentinel",
    mapId: 9, // Matrix
    x: 8,
    y: 12,
    appearance: "Monster", // Character sprite sheet
    index: 4, // Index in the sprite sheet
    
    // Dialogue when player encounters the enemy
    dialogue: [
        "*A towering figure made of glowing red code materializes before you*",
        "UNAUTHORIZED ACCESS DETECTED. INITIATING SECURITY PROTOCOLS.",
        "*The Sentinel's form shifts and ripples*",
        "IDENTITY: UNRECOGNIZED. STATUS: THREAT. ACTION: TERMINATE.",
        "*It raises what appears to be a weapon made of pure digital energy*",
        "PREPARE FOR IMMEDIATE DELETION. YOUR DIGITAL FOOTPRINT WILL BE ERASED.",
        "ALL TRACES OF YOUR EXISTENCE WILL BE REMOVED FROM THE SYSTEM.",
        "*The air around you crackles with digital energy*",
        "RESISTANCE IS... ACTUALLY, RESISTANCE IS JUST INEFFICIENT.",
        "WHY NOT SAVE US BOTH SOME PROCESSING POWER AND ACCEPT DELETION?"
    ]
};

// Export all NPCs and objects for Level 41
module.exports = {
    glitch,
    securityDirectorKovacs,
    drMnemosyne,
    neuralInterfaceTerminal,
    firewallSentinel
};
