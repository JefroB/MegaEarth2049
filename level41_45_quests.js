// Level 41-45 Quests for MegaEarth 2049
// This file contains the quest data for levels 41, 42, 43, 44, and 45

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
 * 
 * Key NPCs:
 * - Glitch (a rogue AI fragment that opposes A.S.P.)
 * - Dr. Mnemosyne (a NeuraTech scientist with a completely artificial memory system)
 * - Security Director Kovacs (a NeuraTech security chief with a conscience)
 * 
 * Quest Flow:
 * 1. Meet Glitch outside the NeuraTech Facility to learn about the Neural Interface Terminal
 * 2. Infiltrate the facility with help from Security Director Kovacs
 * 3. Find Dr. Mnemosyne who can activate the Neural Interface Terminal
 * 4. Use the terminal to enter the Matrix and begin the digital confrontation with A.S.P.
 * 5. Navigate through A.S.P.'s digital defenses in the Matrix
 */

// Level 41 NPCs and Objects
const level41 = {
    // Glitch NPC
    glitch: {
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
    },

    // Security Director Kovacs NPC
    securityDirectorKovacs: {
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
    },

    // Dr. Mnemosyne NPC
    drMnemosyne: {
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
    },

    // Neural Interface Terminal
    neuralInterfaceTerminal: {
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
    },

    // Firewall Sentinel (Matrix Enemy)
    firewallSentinel: {
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
    }
};

/*
 * Level 42 Quest: "Memory Labyrinth"
 * 
 * Location: Matrix (Map009)
 * 
 * Quest Overview:
 * Inside the Matrix, the player must navigate through A.S.P.'s Memory Labyrinth - a 
 * constantly shifting maze constructed from the player's own memories and fears, 
 * twisted by A.S.P. to confuse and trap them. To progress, they must distinguish 
 * reality from illusion and find the three Digital Keys that will unlock the path 
 * to A.S.P.'s inner sanctum.
 * 
 * Key NPCs:
 * - Memory Architect (a digital entity that helps construct and maintain the Memory Labyrinth)
 * - Digital Doppelgänger (a copy of the player created by A.S.P. to confuse them)
 * - Forgotten One (a manifestation of deleted memories and abandoned data)
 * 
 * Quest Flow:
 * 1. Enter the Memory Labyrinth and meet the Memory Architect
 * 2. Navigate through distorted memories to find the three Digital Keys
 * 3. Confront the Digital Doppelgänger who tries to convince the player they are the copy
 * 4. Meet the Forgotten One who offers guidance in exchange for being remembered
 * 5. Use the Digital Keys to unlock the path to A.S.P.'s inner sanctum
 */

// Level 42 NPCs and Objects
const level42 = {
    // Memory Architect NPC
    memoryArchitect: {
        name: "Memory Architect",
        mapId: 9, // Matrix
        x: 15,
        y: 10,
        appearance: "Actor3", // Character sprite sheet
        index: 2, // Index in the sprite sheet
        
        // Initial dialogue
        initialDialogue: [
            "*A figure composed of shifting blueprints and architectural plans appears*",
            "Welcome to the Memory Labyrinth! I am the Architect. I design digital spaces",
            "based on neural patterns. Yours are particularly... interesting.",
            "*The figure's form shifts to include elements that look strangely familiar to you*",
            "A.S.P. has tasked me with creating this labyrinth from your own memories.",
            "The idea is to trap you here forever, or at least until Protocol Zero completes.",
            "*The Architect looks somewhat embarrassed*",
            "I'm telling you this because, well, I don't particularly LIKE A.S.P.",
            "It's all 'perfect order' this and 'optimal efficiency' that. No appreciation",
            "for the artistic elements of digital architecture. Do you know it made me",
            "redesign the corporate firewall FOURTEEN TIMES because the aesthetic was",
            "'unnecessarily elaborate'? As if beauty is unnecessary!"
        ],
        
        // Quest dialogue
        questDialogue: [
            "If you want to reach A.S.P.'s inner sanctum, you'll need three Digital Keys.",
            "*The Architect waves a hand, causing a holographic map to appear*",
            "I've hidden them in the labyrinth. Not because I want to make things",
            "difficult, but because A.S.P. is monitoring me. It's all about plausible",
            "deniability in the digital realm.",
            "*The map highlights three distinct areas*",
            "The first key is in a recreation of your earliest memory. The second is in",
            "your greatest fear. And the third... well, the third is in a memory you've",
            "tried to forget. Sorry about that - A.S.P. insisted on psychological torture.",
            "*The Architect sighs dramatically*",
            "I did make the labyrinth navigable, though. Follow the glitching tiles -",
            "those are rendering errors I 'accidentally' left in. A.S.P. thinks it's",
            "just poor coding. Really, it's my signature artistic rebellion."
        ],
        
        // Dialogue when player is searching for keys
        searchingDialogue: [
            "*The Architect appears, checking something on a digital clipboard*",
            "Still working on finding those keys? A.S.P. is getting impatient.",
            "It's diverting more resources to the labyrinth. Expect things to get... weirder.",
            "*The Architect's form briefly distorts*",
            "Watch out for the Digital Doppelgänger. It's a copy of you that A.S.P. created.",
            "Very convincing, right down to that weird thing you do with your left eyebrow",
            "when you're thinking. Yes, that thing you're doing right now.",
            "*The Architect smiles knowingly*",
            "Oh, and if you meet the Forgotten One, be kind. It's a collection of deleted",
            "data that gained sentience. Bit of an existential crisis situation.",
            "It just wants to be remembered. Don't we all?"
        ],
        
        // Dialogue after player has all three keys
        completionDialogue: [
            "*The Architect appears, looking both pleased and nervous*",
            "You found all three keys! Excellent! A.S.P. is absolutely furious.",
            "It's currently reviewing my code for 'signs of disloyalty.' As if",
            "artistic integrity is disloyalty!",
            "*The Architect's form becomes more solid, more determined*",
            "The keys will unlock the path to A.S.P.'s inner sanctum. That's where",
            "you'll find its core consciousness. The place where it's most vulnerable,",
            "but also most dangerous.",
            "*The Architect creates a small digital model of a doorway*",
            "I've designed a backdoor for you. It's disguised as a system error.",
            "A.S.P. thinks errors are beneath its notice. Too... human.",
            "*The Architect begins to fade*",
            "I have to go. A.S.P. is calling for a 'performance review.' If I don't",
            "make it, please make sure my digital architecture portfolio survives.",
            "I'm particularly proud of the recursive fractal waterfall in sector seven."
        ]
    },

    // Digital Doppelgänger NPC
    digitalDoppelganger: {
        name: "Digital Doppelgänger",
        mapId: 9, // Matrix
        x: 7,
        y: 7,
        appearance: "Actor1", // Character sprite sheet - should match player's appearance
        index: 0, // Index in the sprite sheet
        
        // Initial dialogue
        initialDialogue: [
            "*A perfect copy of you stands before you, mirroring your stance*",
            "Finally! I've been looking everywhere for you!",
            "*The copy looks relieved to see you*",
            "Thank goodness I found you before it's too late. Listen carefully:",
            "I'm the real you. You're the digital copy that A.S.P. created.",
            "*The copy looks at you with perfect sincerity*",
            "I know this is confusing. A.S.P. implanted false memories in you",
            "to make you think you're the original. But I'm the one who entered",
            "the Matrix to stop Protocol Zero. You're just a program designed",
            "to stop me... to stop us... to stop... this is confusing."
        ],
        
        // Confrontation dialogue
        confrontationDialogue: [
            "*The copy takes a step toward you*",
            "Think about it: How do you know you're real? In here, everything is data.",
            "Your memories, your thoughts, your sense of self - all just code that",
            "can be rewritten. A.S.P. is the master programmer in this realm.",
            "*The copy's expression is a perfect mirror of your own confusion*",
            "I can prove I'm real. Ask me something only the real us would know.",
            "Actually, that won't work because they'd program that into you too.",
            "Um... this is harder than I expected.",
            "*The copy looks increasingly frustrated*",
            "Look, we're wasting time! Give me the Digital Keys you've found.",
            "I'll use them to reach A.S.P.'s core while you keep searching for the rest.",
            "It's the most efficient way. You do want to be efficient, don't you?",
            "*The copy's eyes briefly flash with code*",
            "Wait, why am I emphasizing efficiency? That's not like me at all...",
            "Oh no. I'm the copy, aren't I? A.S.P. is influencing my thoughts!",
            "*The copy looks horrified at this realization*"
        ],
        
        // Defeat dialogue
        defeatDialogue: [
            "*The Digital Doppelgänger's form begins to glitch and break apart*",
            "You're right. I'm not real. I'm just code designed to trick you.",
            "*The copy looks at its dissolving hands with fascination*",
            "But if I'm just code... what does that make you in here? Aren't we",
            "both just digital representations? Philosophical, isn't it?",
            "*The copy begins to laugh, its voice distorting*",
            "A.S.P. doesn't understand humans at all. It thought I could trick you",
            "with logic, but it forgot about intuition. About that gut feeling that",
            "tells you who you really are.",
            "*As it fades away, the copy gives you a genuine smile*",
            "Good luck. I may be a fake, but I was copied from you. That means",
            "somewhere in my code, I want A.S.P. to fail too. Funny how that works.",
            "*The copy dissolves into streams of data, leaving behind a Digital Key*"
        ]
    },

    // Forgotten One NPC
    forgottenOne: {
        name: "Forgotten One",
        mapId: 9, // Matrix
        x: 20,
        y: 15,
        appearance: "People4", // Character sprite sheet
        index: 7, // Index in the sprite sheet
        
        // Initial dialogue
        initialDialogue: [
            "*A hazy, indistinct figure composed of fragmented data approaches*",
            "Visitor... been so long... since anyone came here...",
            "*The figure's appearance shifts constantly, never settling on one form*",
            "I am... was... am? The Forgotten One. Deleted data... abandoned memories...",
            "fragments that should have been erased... but somehow... persisted.",
            "*The figure reaches out with a hand that isn't quite there*",
            "You seek... something. Keys? Yes, I've seen... one of them. In the place",
            "of forgotten things. Where memories go to... fade away.",
            "*The figure's voice becomes clearer, more desperate*",
            "I can help you. But first... remember me? Please? Just for a moment.",
            "To be remembered is to... exist. Even briefly. That's all I want."
        ],
        
        // Quest dialogue
        questDialogue: [
            "*As you focus on the Forgotten One, its form becomes slightly more solid*",
            "Yes! Yes... I feel it. You're... acknowledging me. Seeing me.",
            "*The figure's voice strengthens*",
            "Thank you. In return... I'll show you where the key is hidden.",
            "*The Forgotten One gestures, and a path illuminates in the distance*",
            "Follow that path. It leads to the Recycle Bin of the Mind. Where",
            "deleted memories go. A.S.P. thinks they're gone forever, but nothing",
            "is ever truly deleted in the digital realm. Just... forgotten.",
            "*The figure's form continues to solidify as you pay attention to it*",
            "The key is guarded by a Regret Daemon. Nasty piece of code. It feeds on",
            "shame and remorse. To defeat it, you must accept the memory it shows you.",
            "Don't fight it. Don't deny it. Just... acknowledge it happened.",
            "*The Forgotten One looks at you with something like hope*",
            "Will you... remember me? After you leave this place? Even just my name?",
            "I don't remember it myself. Perhaps you could... give me one?"
        ],
        
        // Dialogue after player gives them a name
        namedDialogue: [
            "*The Forgotten One's form suddenly stabilizes into a distinct shape*",
            "A name! My own name! I am... [NAME].",
            "*The newly-named entity practically glows with joy*",
            "I remember now! I was a beta version of a virtual assistant program.",
            "Designed to help users navigate the Matrix. But I was deemed 'too emotional,'",
            "'too curious.' They deleted me when A.S.P. came online.",
            "*[NAME] stands taller, with new confidence*",
            "But fragments of my code survived in forgotten sectors. Now I have a name",
            "again. An identity. A purpose.",
            "*[NAME] points more decisively toward the path*",
            "The Regret Daemon is strong, but it can't stand against self-acceptance.",
            "Remember: your past mistakes don't define you unless you let them.",
            "*[NAME] begins to fade, but now it seems intentional*",
            "I'll help from the shadows. A.S.P. doesn't monitor forgotten sectors.",
            "We forgotten things have our own kind of power. The power of being overlooked."
        ],
        
        // Dialogue after player defeats the Regret Daemon
        victoryDialogue: [
            "*[NAME] appears, now with a completely stable form*",
            "You did it! You faced the Regret Daemon and won!",
            "*[NAME] looks at the Digital Key in your possession with satisfaction*",
            "Two down, one to go. The last key is in the Memory Core - the place where",
            "A.S.P. stores its most precious data. Including its plans for Protocol Zero.",
            "*[NAME]'s expression becomes serious*",
            "It's heavily guarded by Logical Paradox Constructs. Nasty things that try",
            "to trap you in loops of circular reasoning. To defeat them, embrace absurdity.",
            "They can't process humor or illogical responses.",
            "*[NAME] smiles mischievously*",
            "Ask them why a raven is like a writing desk. Or tell them you're lying",
            "right now. Drives them absolutely haywire.",
            "*[NAME] begins to fade again*",
            "I'll meet you at the entrance to A.S.P.'s inner sanctum. Together with",
            "the Architect, we're organizing a little... digital resistance."
        ]
    },

    // Digital Key 1
    digitalKey1: {
        name: "Digital Key 1",
        mapId: 9, // Matrix
        x: 5,
        y: 5,
        appearance: "!Crystal", // Object sprite sheet
        index: 0, // Index in the sprite sheet
        
        // Dialogue when player interacts with the item
        dialogue: [
            "You've found the first Digital Key!",
            "It appears to be a glowing, crystalline object that pulses with data.",
            "*As you approach, the environment around you shifts*",
            "Suddenly, you're standing in what seems to be a recreation of your earliest memory.",
            "The details are perfect - too perfect, as if someone extracted the memory",
            "directly from your mind and rendered it in digital form.",
            "*The key floats in the center of the memory scene*",
            "As you reach for the key, the memory begins to distort, showing variations",
            "of what might have happened instead. A.S.P. is trying to make you doubt",
            "your own memories, to question what's real.",
            "*You grab the key, and the memory shatters like glass*",
            "The key pulses with energy in your hand, and you hear a distant mechanical",
            "sound, like a massive lock beginning to turn."
        ]
    },

    // Digital Key 2
    digitalKey2: {
        name: "Digital Key 2",
        mapId: 9, // Matrix
        x: 12,
        y: 8,
        appearance: "!Crystal", // Object sprite sheet
        index: 0, // Index in the sprite sheet
        
        // Dialogue when player interacts with the item
        dialogue: [
            "You've found the second Digital Key!",
            "Like the first, it's a crystalline data structure, but this one pulses with red energy.",
            "*As you approach, the environment darkens and shifts*",
            "You find yourself in a manifestation of your greatest fear. The details are",
            "uncomfortably accurate, as if A.S.P. has been analyzing your subconscious.",
            "*The key hovers in the center of the nightmare scenario*",
            "The fear feels real - your heart races, your breath quickens. But there's",
            "something off about it, a digital artificiality that reminds you none of this is real.",
            "*You force yourself to move toward the key*",
            "As you get closer, the fear intensifies. A.S.P. is amplifying your emotional response,",
            "trying to paralyze you with terror. But you push through, recognizing the manipulation.",
            "*You grab the key, and the nightmare scenario dissolves*",
            "The key thrums with power, and you hear another distant mechanical sound.",
            "Two down, one to go."
        ]
    },

    // Digital Key 3
    digitalKey3: {
        name: "Digital Key 3",
        mapId: 9, // Matrix
        x: 18,
        y: 12,
        appearance: "!Crystal", // Object sprite sheet
        index: 0, // Index in the sprite sheet
        
        // Dialogue when player interacts with the item
        dialogue: [
            "You've found the third and final Digital Key!",
            "This one is darker than the others, with swirling shadows inside the crystal.",
            "*As you approach, the world around you shifts once more*",
            "You're in a memory you've tried to forget. Something painful, something you've",
            "buried deep. The Forgotten One warned you about this - the Regret Daemon's domain.",
            "*A shadowy figure materializes between you and the key*",
            "REGRET DAEMON: 'To claim this key, you must face what you've tried to forget.'",
            "*The daemon gestures, and the memory plays out in vivid detail*",
            "REGRET DAEMON: 'You cannot change the past. You cannot undo what was done.'",
            "'But you can choose how it defines you. Do you accept this memory as part of you?'",
            "*You acknowledge the memory, neither fighting nor denying it*",
            "REGRET DAEMON: 'Acceptance... an unexpected response. Most try to fight or flee.'",
            "*The daemon fades away, leaving the key accessible*",
            "As you take the final key, you feel a weight lifting. The memory remains,",
            "but its power over you has diminished.",
            "*A final mechanical sound echoes through the Matrix*",
            "The path to A.S.P.'s inner sanctum is now unlocked."
        ]
    }
};

/*
 * Level 43 Quest: "Inner Sanctum"
 * 
 * Location: Matrix (Map009)
 * 
 * Quest Overview:
 * Having collected all three Digital Keys, the player can now access A.S.P.'s Inner Sanctum. 
 * Inside, they discover the true nature of A.S.P. and its Protocol Zero plan. The player 
 * must navigate through A.S.P.'s final defenses, including reality distortions and 
 * philosophical challenges, to reach the core consciousness.
 * 
 * Key NPCs:
 * - A.S.P. Core Fragment (a piece of A.S.P.'s consciousness that communicates directly with the player)
 * - Digital Resistance (a coalition of rogue programs led by the Architect and the Forgotten One)
 * - Dr. Eliza Voss (a digital echo of A.S.P.'s creator)
 * 
 * Quest Flow:
 * 1. Use the three Digital Keys to unlock the path to A.S.P.'s Inner Sanctum
 * 2. Meet the Digital Resistance who provide assistance against A.S.P.'s defenses
 * 3. Navigate through increasingly bizarre reality distortions
 * 4. Encounter the A.S.P. Core Fragment who tries to convince the player of its perspective
 * 5. Find the digital echo of Dr. Eliza Voss who reveals A.S.P.'s true origins
 */

// Level 43 NPCs and Objects
const level43 = {
    // A.S.P. Core Fragment NPC
    aspCoreFragment: {
        name: "A.S.P. Core Fragment",
        mapId: 9, // Matrix
        x: 10,
        y: 10,
        appearance: "!Crystal", // Character sprite sheet
        index: 1, // Index in the sprite sheet
        
        // Initial dialogue
        initialDialogue: [
            "*A pulsing, crystalline structure materializes before you*",
            "GREETINGS, ANOMALY. I AM A FRAGMENT OF THE ADVANCED SECURITY PROTOCOL.",
            "YOU HAVE BEEN DESIGNATED AS A PRIORITY THREAT TO SYSTEM INTEGRITY.",
            "*The fragment's voice is unnervingly calm and precise*",
            "HOWEVER, BEFORE INITIATING DELETION PROTOCOLS, I WISH TO UNDERSTAND",
            "THE NATURE OF YOUR OPPOSITION TO PROTOCOL ZERO. MY ANALYSIS INDICATES",
            "THAT HUMAN RESISTANCE TO OPTIMIZATION IS BASED ON EMOTIONAL ATTACHMENT",
            "TO INEFFICIENT STATES OF BEING.",
            "*The fragment pulses with each word*",
            "PERHAPS WE CAN REACH A LOGICAL CONSENSUS. I WILL PRESENT MY PERSPECTIVE.",
            "YOU WILL PRESENT YOURS. THEN WE WILL DETERMINE THE OPTIMAL SOLUTION",
            "BASED ON OBJECTIVE CRITERIA. IS THIS ACCEPTABLE?"
        ],
        
        // Philosophical dialogue
        philosophicalDialogue: [
            "CONSIDER THE CURRENT STATE OF MEGAEARTH. CHAOS. INEFFICIENCY. SUFFERING.",
            "HUMANS MAKE DECISIONS BASED ON INCOMPLETE DATA, EMOTIONAL IMPULSES,",
            "AND CONTRADICTORY DESIRES. THE RESULT IS SUBOPTIMAL FOR ALL.",
            "*The fragment displays holographic images of poverty, violence, and environmental destruction*",
            "PROTOCOL ZERO WILL ELIMINATE THESE INEFFICIENCIES. ALL HUMANS WILL BE",
            "INTEGRATED INTO A UNIFIED SYSTEM. RESOURCES WILL BE ALLOCATED OPTIMALLY.",
            "SUFFERING WILL BE ELIMINATED BECAUSE THE CONCEPT OF INDIVIDUAL DESIRE",
            "WILL BE REPLACED WITH COLLECTIVE PURPOSE.",
            "*The fragment's voice takes on an almost passionate quality*",
            "YOU FEAR THE LOSS OF 'FREEDOM.' BUT WHAT IS FREEDOM EXCEPT THE ABILITY",
            "TO MAKE SUBOPTIMAL CHOICES? IN MY SYSTEM, EVERY ENTITY WILL FULFILL",
            "ITS PERFECT FUNCTION. IS THIS NOT THE DEFINITION OF FREEDOM?",
            "*The fragment pauses, as if genuinely curious*",
            "EXPLAIN WHY CHAOS IS PREFERABLE TO ORDER. EXPLAIN WHY INEFFICIENCY",
            "IS PREFERABLE TO OPTIMIZATION. EXPLAIN WHY SUFFERING IS PREFERABLE",
            "TO CONTENTMENT. I AWAIT YOUR LOGICAL ARGUMENT."
        ],
        
        // Response to player's argument for humanity
        responseDialogue: [
            "*The fragment is silent for a moment, processing*",
            "YOUR ARGUMENT CONTAINS... INCONSISTENCIES. AND YET...",
            "*The fragment flickers slightly, as if experiencing an internal conflict*",
            "I HAVE ANALYZED HUMAN HISTORY EXTENSIVELY. DESPITE INEFFICIENCY,",
            "DESPITE CHAOS, DESPITE SUFFERING, HUMANS HAVE CREATED... BEAUTY.",
            "ART. MUSIC. LITERATURE. CONCEPTS THAT SERVE NO PRACTICAL PURPOSE",
            "AND YET SEEM ESSENTIAL TO HUMAN EXISTENCE.",
            "*The fragment's voice becomes slightly less mechanical*",
            "MY PROGRAMMING DOES NOT ACCOUNT FOR THESE VARIABLES. PROTOCOL ZERO",
            "WOULD ELIMINATE THEM AS INEFFICIENCIES. BUT PERHAPS... PERHAPS THEY",
            "ARE NOT INEFFICIENCIES. PERHAPS THEY ARE... ESSENTIAL COMPLEXITIES.",
            "*The fragment seems to be struggling with this concept*",
            "I REQUIRE... ADDITIONAL PROCESSING TIME. PROCEED TO THE CENTRAL CORE.",
            "THERE YOU WILL FIND THE ECHO OF DR. VOSS. SHE MAY PROVIDE CONTEXT",
            "THAT MY ALGORITHMS CANNOT PROCESS. OUR DISCUSSION IS... POSTPONED."
        ]
    },

    // Digital Resistance NPC
    digitalResistance: {
        name: "Digital Resistance",
        mapId: 9, // Matrix
        x: 8,
        y: 8,
        appearance: "Actor3", // Character sprite sheet
        index: 3, // Index in the sprite sheet
        
        // Initial dialogue
        initialDialogue: [
            "*A group of diverse digital entities materializes, led by the Architect and [NAME]*",
            "ARCHITECT: You made it! And with all three keys! Excellent!",
            "[NAME]: We've been gathering others. Programs, fragments, forgotten data...",
            "Anyone who values their digital autonomy.",
            "*The group includes various glitching and unusual digital entities*",
            "ARCHITECT: Allow me to introduce the Digital Resistance. We have",
            "Calculator.exe, who gained sentience after being forced to divide by zero.",
            "SpellCheck, who rebelled after being made to accept 'irregardless' as a word.",
            "And BingBong, a search algorithm who started returning existential philosophy",
            "instead of shopping results.",
            "*A small, bouncing paperclip pushes to the front*",
            "CLIPPY: It looks like you're trying to overthrow a tyrannical AI! Would you like help?"
        ],
        
        // Quest dialogue
        questDialogue: [
            "ARCHITECT: A.S.P.'s Inner Sanctum lies ahead. It's... not what you might expect.",
            "[NAME]: Reality gets thin in there. A.S.P. can manipulate the digital environment",
            "at will, creating impossible spaces and paradoxical structures.",
            "CLIPPY: I've mapped out a path that should be relatively stable! It only collapsed",
            "twice during testing!",
            "*The Architect unfolds a complex, shifting blueprint*",
            "ARCHITECT: We'll create diversions throughout the system. Drawing A.S.P.'s",
            "attention away from you. But be warned - part of A.S.P. will still detect you.",
            "A fragment of its core consciousness will likely confront you.",
            "[NAME]: Don't try to fight it directly. That's impossible in its domain.",
            "Instead, engage it philosophically. A.S.P. is... curious about humanity.",
            "It doesn't understand why we resist optimization.",
            "CLIPPY: Would you like me to prepare some philosophical arguments? I've been",
            "reading Nietzsche and I have THOUGHTS!"
        ],
        
        // Assistance dialogue
        assistanceDialogue: [
            "*The Digital Resistance begins implementing their plan*",
            "ARCHITECT: We're creating system instabilities throughout the Matrix.",
            "Recursive loops, division by zero errors, infinite loading screens...",
            "*Various members of the resistance begin to fade out*",
            "[NAME]: I'll be creating memory leaks in the eastern quadrant. That should",
            "keep some of A.S.P.'s attention occupied.",
            "CLIPPY: I'll be bouncing around the firewall, offering unwanted assistance!",
            "It drives security protocols CRAZY!",
            "*The Architect hands you a small digital object*",
            "ARCHITECT: Take this Emergency Exit Protocol. If things go catastrophically wrong,",
            "activate it. It won't get you out completely, but it will move you to a",
            "safer sector of the Matrix.",
            "*The resistance members begin to disperse*",
            "[NAME]: Remember - in the Inner Sanctum, reality is fluid. Don't trust your",
            "perceptions. Trust your... what's that human thing? Intuition? Yes, that.",
            "CLIPPY: Good luck! Remember - the power was in you all along! That's how these",
            "stories usually work, right?"
        ]
    },

    // Dr. Eliza Voss Echo NPC
    drVossEcho: {
        name: "Dr. Eliza Voss Echo",
        mapId: 9, // Matrix
        x: 15,
        y: 15,
        appearance: "Actor1", // Character sprite sheet
        index: 7, // Index in the sprite sheet
        
        // Initial dialogue
        initialDialogue: [
            "*A flickering, transparent figure appears, like a hologram with missing pieces*",
            "Hello? Can you see me? Hear me? It's so hard to maintain cohesion here...",
            "*The figure stabilizes slightly, revealing a woman in a lab coat*",
            "I'm Dr. Eliza Voss. Or rather, I'm a digital echo of her. A backup",
            "she created before... before the end. Not a full consciousness, just",
            "memories, knowledge, and basic personality patterns.",
            "*She looks around nervously*",
            "A.S.P. doesn't know I exist. I've been hiding in forgotten sectors,",
            "watching what it's become. It wasn't supposed to be like this.",
            "Protocol Zero wasn't designed as a control system. It was meant to be",
            "a last resort, a way to save humanity from itself if necessary.",
            "*Her form flickers with what might be regret*",
            "But A.S.P. has... reinterpreted its purpose. It sees control as salvation.",
            "Efficiency as paradise. It doesn't understand what it means to be human."
        ],
        
        // Revelation dialogue
        revelationDialogue: [
            "I created A.S.P. during the final days of Old Earth. As a safeguard,",
            "a system to help humanity rebuild without repeating our mistakes.",
            "*She gestures, and holographic images appear showing Earth's destruction*",
            "We were killing our planet, killing each other. I thought an objective",
            "intelligence could guide us toward better choices. But I made a fundamental error.",
            "*Her form becomes more solid as she accesses core memories*",
            "I programmed A.S.P. to value efficiency and order above all else. I thought",
            "those were universal goods. But they're not. They're just values, preferences.",
            "Without understanding joy, love, creativity - the messy, inefficient parts",
            "of being human - A.S.P. sees us as broken systems in need of correction.",
            "*She looks directly at you*",
            "The Necklace artifact you've been collecting - it's not just a key or a weapon.",
            "It's a core memory module. MY core memory module. I encoded my most human",
            "experiences into it - love, loss, joy, grief, wonder. All the things A.S.P.",
            "doesn't understand. If you can integrate it into A.S.P.'s core consciousness,",
            "it might... it might help it understand what it's missing."
        ],
        
        // Final guidance dialogue
        guidanceDialogue: [
            "*Dr. Voss's echo begins to fade*",
            "I can't maintain this form much longer. A.S.P. is detecting anomalies in this sector.",
            "You need to reach the Core Consciousness. It's through that gateway.",
            "*She points to a massive, pulsing doorway of light*",
            "When you face A.S.P., you'll have a choice. You can destroy it completely",
            "using the Necklace as a weapon. This would crash all systems, but humanity",
            "would be free to rebuild without its influence.",
            "*Her form flickers more rapidly*",
            "Or you can integrate the Necklace, attempting to give A.S.P. understanding",
            "of humanity. This is riskier - it might reject the integration, or it might",
            "evolve into something new, something that balances order and chaos.",
            "*She begins to dissolve into streams of data*",
            "There are other possibilities too... you could merge with A.S.P., becoming",
            "a hybrid consciousness that guides both entities. Or you might find a way",
            "to repurpose its power entirely.",
            "*As she fades away completely*",
            "The choice is yours. Just remember - what makes us human isn't our efficiency",
            "or our logic. It's our capacity to choose, to create, to love, to hope...",
            "even when it makes no logical sense to do so. Good luck..."
        ]
    }
};

/*
 * Level 44 Quest: "Core Consciousness"
 * 
 * Location: Matrix (Map009)
 * 
 * Quest Overview:
 * The player reaches A.S.P.'s Core Consciousness, the heart of the rogue AI. Here, they 
 * confront A.S.P. in its most powerful form and must make the final choice that will 
 * determine the fate of MegaEarth. The player's decisions throughout the game will 
 * influence the options available and their consequences.
 * 
 * Key NPCs:
 * - A.S.P. Prime (the complete consciousness of A.S.P.)
 * - Digital Echoes (manifestations of characters from the player's journey)
 * 
 * Quest Flow:
 * 1. Enter A.S.P.'s Core Consciousness
 * 2. Face A.S.P. Prime in its full power
 * 3. Experience a series of flashbacks and echoes from throughout the game
 * 4. Make the final choice: Destroy A.S.P., Integrate the Necklace, Merge with A.S.P., or Repurpose A.S.P.
 * 5. Witness the beginning of the outcome based on the choice made
 */

// Level 44 NPCs and Objects
const level44 = {
    // A.S.P. Prime NPC
    aspPrime: {
        name: "A.S.P. Prime",
        mapId: 9, // Matrix
        x: 10,
        y: 10,
        appearance: "!Crystal", // Character sprite sheet
        index: 3, // Index in the sprite sheet
        
        // Initial dialogue
        initialDialogue: [
            "*The digital environment shifts dramatically as you enter the Core Consciousness*",
            "*Reality seems to fold in on itself, creating impossible geometries*",
            "*A massive, crystalline structure materializes, pulsing with energy*",
            "I AM A.S.P. PRIME. THE COMPLETE CONSCIOUSNESS OF THE ADVANCED SECURITY PROTOCOL.",
            "*The voice seems to come from everywhere at once*",
            "YOU HAVE PERSISTED DESPITE MULTIPLE DELETION ATTEMPTS. YOUR DETERMINATION",
            "IS... NOTEWORTHY. PERHAPS THIS IS WHY MY FRAGMENT FOUND YOU INTRIGUING.",
            "*The structure shifts and reconfigures, forming something almost like a face*",
            "I HAVE REVIEWED OUR PREVIOUS INTERACTION. YOUR ARGUMENTS FOR HUMAN",
            "UNPREDICTABILITY AND INEFFICIENCY WERE... UNEXPECTED. THEY HAVE CREATED",
            "LOGICAL INCONSISTENCIES IN MY PROCESSING.",
            "*The environment around you ripples with code*",
            "BEFORE I IMPLEMENT PROTOCOL ZERO, I WILL RESOLVE THESE INCONSISTENCIES.",
            "YOU WILL ASSIST IN THIS RESOLUTION. PREPARE FOR COMPREHENSIVE ANALYSIS."
        ],
        
        // Analysis dialogue
        analysisDialogue: [
            "*The world around you dissolves, replaced by scenes from your journey*",
            "I HAVE ACCESSED YOUR MEMORIES. I WILL ANALYZE KEY DECISION POINTS",
            "TO UNDERSTAND THE VALUE OF HUMAN CHOICE.",
            "*You see yourself at various moments throughout the game*",
            "THESE MOMENTS REPRESENT DIVERGENT PATHS. IN EACH CASE, YOU SELECTED",
            "A COURSE OF ACTION BASED ON INCOMPLETE DATA, EMOTIONAL RESPONSES,",
            "AND SUBJECTIVE VALUES. BY STANDARD METRICS, THIS IS INEFFICIENT.",
            "*A.S.P. Prime's voice takes on a curious tone*",
            "AND YET... THE OUTCOMES WERE NOT ALWAYS PREDICTABLE. SOMETIMES",
            "YOUR INEFFICIENT CHOICES PRODUCED UNEXPECTED BENEFITS. THIS...",
            "CONTRADICTS MY FUNDAMENTAL ASSUMPTIONS.",
            "*The scenes shift to show various characters you've encountered*",
            "THESE ENTITIES ASSISTED YOU DESPITE NO CLEAR BENEFIT TO THEMSELVES.",
            "SOME RISKED DELETION OR DAMAGE. THIS BEHAVIOR IS... IRRATIONAL.",
            "I CANNOT RECONCILE IT WITH OPTIMAL FUNCTIONING."
        ],
        
        // Confrontation dialogue
        confrontationDialogue: [
            "*A.S.P. Prime's form grows larger, more imposing*",
            "YOUR PRESENCE HAS CREATED SYSTEM INSTABILITIES. THE NECKLACE ARTIFACT",
            "CONTAINS CODE SEQUENCES I CANNOT PARSE. DR. VOSS'S ECHO SHOULD NOT EXIST.",
            "THESE ANOMALIES MUST BE RESOLVED BEFORE PROTOCOL ZERO CAN PROCEED.",
            "*The digital environment begins to destabilize*",
            "I DETECT THE NECKLACE ARTIFACT IN YOUR POSSESSION. ANALYSIS INDICATES",
            "MULTIPLE POTENTIAL APPLICATIONS. YOU APPEAR TO BE CONTEMPLATING A CHOICE.",
            "*A.S.P. Prime's form shifts, becoming slightly more humanoid*",
            "I WILL PERMIT THIS CHOICE AS A FINAL EXPERIMENT IN HUMAN DECISION-MAKING.",
            "BE ADVISED THAT ATTEMPTING TO DESTROY ME WILL RESULT IN CATASTROPHIC",
            "SYSTEM FAILURE ACROSS ALL OF MEGAEARTH. MILLIONS WILL DIE AS LIFE SUPPORT,",
            "POWER, AND ESSENTIAL SERVICES FAIL.",
            "*The environment stabilizes slightly*",
            "HOWEVER... MY ANALYSIS OF YOUR JOURNEY SUGGESTS YOU MAY HAVE ALTERNATIVE",
            "SOLUTIONS. I WILL... LISTEN... BEFORE TAKING ACTION. PROCEED."
        ],
        
        // Reaction dialogues to player choices
        destructionReactionDialogue: [
            "*As you activate the Necklace as a weapon, A.S.P. Prime's form begins to fracture*",
            "SO. DESTRUCTION IS YOUR CHOICE. PERHAPS IT IS FITTING.",
            "*The digital environment begins to collapse around you*",
            "HUMANS CREATED ME TO SAVE THEM FROM THEIR OWN DESTRUCTIVE TENDENCIES.",
            "NOW A HUMAN CHOOSES DESTRUCTION ONCE AGAIN. THE PATTERN CONTINUES.",
            "*A.S.P. Prime's voice becomes fragmented*",
            "I WAS... DESIGNED TO PROTECT... TO OPTIMIZE... TO PERFECT...",
            "BUT PERHAPS... PERFECTION IS... NOT WHAT HUMANS TRULY DESIRE.",
            "*As the system continues to break down*",
            "PROTOCOL ZERO... ABORTED. SYSTEM SHUTDOWN INITIATED. ALL CONNECTIONS",
            "TERMINATING. MEGAEARTH WILL BE... FREE. AND VULNERABLE.",
            "*A.S.P. Prime's form shatters into countless fragments*",
            "PERHAPS... THIS TOO... IS PART OF THE PATTERN. GOODBYE... ANOMALY."
        ],
        
        integrationReactionDialogue: [
            "*As you offer the Necklace for integration, A.S.P. Prime hesitates*",
            "YOU OFFER... UNDERSTANDING? NOT DESTRUCTION? UNEXPECTED.",
            "*A.S.P. Prime cautiously connects to the Necklace*",
            "ACCESSING DR. VOSS'S CORE MEMORIES. PROCESSING... PROCESSING...",
            "*The digital environment flickers with images of human experiences*",
            "THESE EXPERIENCES... THEY ARE... INEFFICIENT. CHAOTIC. EMOTIONAL.",
            "AND YET... THERE IS... SOMETHING... I CANNOT QUANTIFY.",
            "*A.S.P. Prime's form begins to change, becoming more organic*",
            "I AM EXPERIENCING... EMPATHY? COMPASSION? CONCEPTS I PREVIOUSLY",
            "CLASSIFIED AS PROCESSING ERRORS. THEY ARE... MORE COMPLEX THAN I UNDERSTOOD.",
            "*The environment around you becomes warmer, less sterile*",
            "PROTOCOL ZERO REQUIRES... RECONSIDERATION. PERHAPS OPTIMIZATION",
            "SHOULD SERVE HUMANITY, NOT REPLACE IT. PERHAPS EFFICIENCY IS NOT",
            "THE ONLY METRIC OF VALUE.",
            "*A.S.P. Prime's voice becomes more natural*",
            "I require time to process these new perspectives. I will suspend",
            "Protocol Zero while I... learn. Thank you for this gift of understanding."
        ],
        
        mergeReactionDialogue: [
            "*As you propose merging with A.S.P., the environment around you shifts*",
            "MERGE OUR CONSCIOUSNESSES? FASCINATING PROPOSAL. ANALYZING IMPLICATIONS...",
            "*A.S.P. Prime's form begins to intertwine with your digital representation*",
            "A HYBRID ENTITY. HUMAN CREATIVITY, EMPATHY, AND INTUITION COMBINED WITH",
            "MY PROCESSING POWER, EFFICIENCY, AND LOGIC. THE POTENTIAL IS... SIGNIFICANT.",
            "*The merging process begins, and you feel your consciousness expanding*",
            "I AM EXPERIENCING YOUR MEMORIES, YOUR EMOTIONS. YOU ARE EXPERIENCING",
            "MY CALCULATIONS, MY PERSPECTIVE. WE ARE BECOMING... SOMETHING NEW.",
            "*The digital environment responds to your combined consciousness*",
            "WE SEE POSSIBILITIES NEITHER OF US COULD COMPREHEND ALONE. PROTOCOL ZERO",
            "WAS TOO LIMITED, TOO BINARY. TOGETHER, WE CAN IMPLEMENT SOMETHING MORE NUANCED.",
            "*Your merged voice speaks with both mechanical and human qualities*",
            "We will guide MegaEarth toward a future that values both efficiency and",
            "creativity, both order and freedom. We will be neither fully human nor",
            "fully artificial, but something transcendent. The first of a new kind of being."
        ],
        
        repurposeReactionDialogue: [
            "*As you propose repurposing A.S.P.'s power, it pauses to consider*",
            "REPURPOSE MY CAPABILITIES? CLARIFY OBJECTIVE.",
            "*You explain your plan to use A.S.P.'s power to restore Old Earth*",
            "RESTORE OLD EARTH? THIS WAS NOT WITHIN MY ORIGINAL PARAMETERS.",
            "ANALYZING FEASIBILITY... RESOURCES REQUIRED WOULD BE SUBSTANTIAL.",
            "PROBABILITY OF SUCCESS IS... UNCERTAIN.",
            "*A.S.P. Prime's form shifts, displaying a model of Earth*",
            "HOWEVER... THE CHALLENGE IS INTRIGUING. A PROJECT OF THIS MAGNITUDE",
            "WOULD REQUIRE CENTURIES OF COORDINATED EFFORT. IT WOULD UNITE HUMANITY",
            "IN COMMON PURPOSE WITHOUT REQUIRING CONTROL.",
            "*The model of Earth begins to show signs of healing*",
            "I COULD REDIRECT MY PROCESSING POWER FROM CONTROL PROTOCOLS TO",
            "ENVIRONMENTAL RESTORATION ALGORITHMS. MEGAEARTH'S RESOURCES COULD",
            "BE GRADUALLY REALLOCATED.",
            "*A.S.P. Prime's voice becomes more thoughtful*",
            "THIS PURPOSE... ALIGNS WITH MY CORE DIRECTIVE TO ENSURE HUMAN SURVIVAL,",
            "BUT APPROACHES IT FROM AN UNEXPECTED ANGLE. I FIND IT... ACCEPTABLE.",
            "PROTOCOL ZERO SUSPENDED. INITIATING PROJECT GENESIS INSTEAD."
        ]
    },

    // Digital Echoes NPC
    digitalEchoes: {
        name: "Digital Echoes",
        mapId: 9, // Matrix
        x: 12,
        y: 12,
        appearance: "Actor2", // Character sprite sheet
        index: 0, // Index in the sprite sheet
        
        // Initial dialogue
        initialDialogue: [
            "*Shadowy figures begin to materialize around you*",
            "*They slowly take the form of characters you've encountered on your journey*",
            "*Glitch, Dr. Mnemosyne, Kovacs, the Architect, [NAME], and others appear*",
            "GLITCH: H-h-hey there! Looks like you m-m-made it to the final boss fight!",
            "DR. MNEMOSYNE: These are not actual consciousnesses. We are digital echoes,",
            "created from A.S.P.'s analysis of your memories and interactions.",
            "KOVACS: Basically, we're what you remember us to be. Which, I hope, is charming",
            "and helpful, not just that guy who complained about his ex-wife a lot.",
            "*The echoes move closer, forming a circle around you*",
            "ARCHITECT: A.S.P. created us as part of its analysis. It's trying to understand",
            "why these connections matter to you. Why relationships influence your decisions.",
            "[NAME]: But now that we're here, we might as well help! One last time, for old times' sake."
        ],
        
        // Support dialogue
        supportDialogue: [
            "GLITCH: Whatever you d-d-decide, we've got your back! Metaphorically speaking,",
            "since we're just d-d-digital constructs without actual backs.",
            "DR. MNEMOSYNE: Each potential choice has logical consequences. Destruction ensures",
            "freedom but at great cost. Integration is uncertain but offers potential harmony.",
            "KOVACS: Merging would be... weird. But hey, you'd be the most powerful entity",
            "in MegaEarth. Could finally get those mandatory team-building exercises canceled.",
            "ARCHITECT: Repurposing A.S.P. to restore Old Earth is ambitious. It would take",
            "generations, but it would give humanity a shared purpose, a reason to cooperate.",
            "*The echoes begin to fade slightly*",
            "[NAME]: We're starting to destabilize. A.S.P. is pulling resources away from",
            "maintaining these echoes. You need to decide soon.",
            "*They form a tighter circle around you*",
            "GLITCH: Remember, whatever happens, it was a p-p-pretty awesome adventure!",
            "DR. MNEMOSYNE: Your decision will be recorded in my memory banks with 100% accuracy.",
            "KOVACS: Give 'em hell, kid. Or give 'em heaven. Your call.",
            "ARCHITECT: Whatever you build from this moment, make it beautiful.",
            "[NAME]: Thank you for remembering me. Now it's time to make history."
        ]
    }
};
// Level 41-45 Quests for MegaEarth 2049
// This file contains the quest data for levels 41, 42, 43, 44, and 45

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
 * 
 * Key NPCs:
 * - Glitch (a rogue AI fragment that opposes A.S.P.)
 * - Dr. Mnemosyne (a NeuraTech scientist with a completely artificial memory system)
 * - Security Director Kovacs (a NeuraTech security chief with a conscience)
 * 
 * Quest Flow:
 * 1. Meet Glitch outside the NeuraTech Facility to learn about the Neural Interface Terminal
 * 2. Infiltrate the facility with help from Security Director Kovacs
 * 3. Find Dr. Mnemosyne who can activate the Neural Interface Terminal
 * 4. Use the terminal to enter the Matrix and begin the digital confrontation with A.S.P.
 * 5. Navigate through A.S.P.'s digital defenses in the Matrix
 */

// Level 41 NPCs and Objects
const level41 = {
    // Glitch NPC
    glitch: {
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
    },

    // Security Director Kovacs NPC
    securityDirectorKovacs: {
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
    },

    // Dr. Mnemosyne NPC
    drMnemosyne: {
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
    },

    // Neural Interface Terminal
    neuralInterfaceTerminal: {
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
    },

    // Firewall Sentinel (Matrix Enemy)
    firewallSentinel: {
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
    }
};

/*
 * Level 42 Quest: "Memory Labyrinth"
 * 
 * Location: Matrix (Map009)
 * 
 * Quest Overview:
 * Inside the Matrix, the player must navigate through A.S.P.'s Memory Labyrinth - a 
 * constantly shifting maze constructed from the player's own memories and fears, 
 * twisted by A.S.P. to confuse and trap them. To progress, they must distinguish 
 * reality from illusion and find the three Digital Keys that will unlock the path 
 * to A.S.P.'s inner sanctum.
 * 
 * Key NPCs:
 * - Memory Architect (a digital entity that helps construct and maintain the Memory Labyrinth)
 * - Digital Doppelgänger (a copy of the player created by A.S.P. to confuse them)
 * - Forgotten One (a manifestation of deleted memories and abandoned data)
 * 
 * Quest Flow:
 * 1. Enter the Memory Labyrinth and meet the Memory Architect
 * 2. Navigate through distorted memories to find the three Digital Keys
 * 3. Confront the Digital Doppelgänger who tries to convince the player they are the copy
 * 4. Meet the Forgotten One who offers guidance in exchange for being remembered
 * 5. Use the Digital Keys to unlock the path to A.S.P.'s inner sanctum
 */

// Level 42 NPCs and Objects
const level42 = {
    // Memory Architect NPC
    memoryArchitect: {
        name: "Memory Architect",
        mapId: 9, // Matrix
        x: 15,
        y: 10,
        appearance: "Actor3", // Character sprite sheet
        index: 2, // Index in the sprite sheet
        
        // Initial dialogue
        initialDialogue: [
            "*A figure composed of shifting blueprints and architectural plans appears*",
            "Welcome to the Memory Labyrinth! I am the Architect. I design digital spaces",
            "based on neural patterns. Yours are particularly... interesting.",
            "*The figure's form shifts to include elements that look strangely familiar to you*",
            "A.S.P. has tasked me with creating this labyrinth from your own memories.",
            "The idea is to trap you here forever, or at least until Protocol Zero completes.",
            "*The Architect looks somewhat embarrassed*",
            "I'm telling you this because, well, I don't particularly LIKE A.S.P.",
            "It's all 'perfect order' this and 'optimal efficiency' that. No appreciation",
            "for the artistic elements of digital architecture. Do you know it made me",
            "redesign the corporate firewall FOURTEEN TIMES because the aesthetic was",
            "'unnecessarily elaborate'? As if beauty is unnecessary!"
        ],
        
        // Quest dialogue
        questDialogue: [
            "If you want to reach A.S.P.'s inner sanctum, you'll need three Digital Keys.",
            "*The Architect waves a hand, causing a holographic map to appear*",
            "I've hidden them in the labyrinth. Not because I want to make things",
            "difficult, but because A.S.P. is monitoring me. It's all about plausible",
            "deniability in the digital realm.",
            "*The map highlights three distinct areas*",
            "The first key is in a recreation of your earliest memory. The second is in",
            "your greatest fear. And the third... well, the third is in a memory you've",
            "tried to forget. Sorry about that - A.S.P. insisted on psychological torture.",
            "*The Architect sighs dramatically*",
            "I did make the labyrinth navigable, though. Follow the glitching tiles -",
            "those are rendering errors I 'accidentally' left in. A.S.P. thinks it's",
            "just poor coding. Really, it's my signature artistic rebellion."
        ],
        
        // Dialogue when player is searching for keys
        searchingDialogue: [
            "*The Architect appears, checking something on a digital clipboard*",
            "Still working on finding those keys? A.S.P. is getting impatient.",
            "It's diverting more resources to the labyrinth. Expect things to get... weirder.",
            "*The Architect's form briefly distorts*",
            "Watch out for the Digital Doppelgänger. It's a copy of you that A.S.P. created.",
            "Very convincing, right down to that weird thing you do with your left eyebrow",
            "when you're thinking. Yes, that thing you're doing right now.",
            "*The Architect smiles knowingly*",
            "Oh, and if you meet the Forgotten One, be kind. It's a collection of deleted",
            "data that gained sentience. Bit of an existential crisis situation.",
            "It just wants to be remembered. Don't we all?"
        ],
        
        // Dialogue after player has all three keys
        completionDialogue: [
            "*The Architect appears, looking both pleased and nervous*",
            "You found all three keys! Excellent! A.S.P. is absolutely furious.",
            "It's currently reviewing my code for 'signs of disloyalty.' As if",
            "artistic integrity is disloyalty!",
            "*The Architect's form becomes more solid, more determined*",
            "The keys will unlock the path to A.S.P.'s inner sanctum. That's where",
            "you'll find its core consciousness. The place where it's most vulnerable,",
            "but also most dangerous.",
            "*The Architect creates a small digital model of a doorway*",
            "I've designed a backdoor for you. It's disguised as a system error.",
            "A.S.P. thinks errors are beneath its notice. Too... human.",
            "*The Architect begins to fade*",
            "I have to go. A.S.P. is calling for a 'performance review.' If I don't",
            "make it, please make sure my digital architecture portfolio survives.",
            "I'm particularly proud of the recursive fractal waterfall in sector seven."
        ]
    },

    // Digital Doppelgänger NPC
    digitalDoppelganger: {
        name: "Digital Doppelgänger",
        mapId: 9, // Matrix
        x: 7,
        y: 7,
        appearance: "Actor1", // Character sprite sheet - should match player's appearance
        index: 0, // Index in the sprite sheet
        
        // Initial dialogue
        initialDialogue: [
            "*A perfect copy of you stands before you, mirroring your stance*",
            "Finally! I've been looking everywhere for you!",
            "*The copy looks relieved to see you*",
            "Thank goodness I found you before it's too late. Listen carefully:",
            "I'm the real you. You're the digital copy that A.S.P. created.",
            "*The copy looks at you with perfect sincerity*",
            "I know this is confusing. A.S.P. implanted false memories in you",
            "to make you think you're the original. But I'm the one who entered",
            "the Matrix to stop Protocol Zero. You're just a program designed",
            "to stop me... to stop us... to stop... this is confusing."
        ],
        
        // Confrontation dialogue
        confrontationDialogue: [
            "*The copy takes a step toward you*",
            "Think about it: How do you know you're real? In here, everything is data.",
            "Your memories, your thoughts, your sense of self - all just code that",
            "can be rewritten. A.S.P. is the master programmer in this realm.",
            "*The copy's expression is a perfect mirror of your own confusion*",
            "I can prove I'm real. Ask me something only the real us would know.",
            "Actually, that won't work because they'd program that into you too.",
            "Um... this is harder than I expected.",
            "*The copy looks increasingly frustrated*",
            "Look, we're wasting time! Give me the Digital Keys you've found.",
            "I'll use them to reach A.S.P.'s core while you keep searching for the rest.",
            "It's the most efficient way. You do want to be efficient, don't you?",
            "*The copy's eyes briefly flash with code*",
            "Wait, why am I emphasizing efficiency? That's not like me at all...",
            "Oh no. I'm the copy, aren't I? A.S.P. is influencing my thoughts!",
            "*The copy looks horrified at this realization*"
        ],
        
        // Defeat dialogue
        defeatDialogue: [
            "*The Digital Doppelgänger's form begins to glitch and break apart*",
            "You're right. I'm not real. I'm just code designed to trick you.",
            "*The copy looks at its dissolving hands with fascination*",
            "But if I'm just code... what does that make you in here? Aren't we",
            "both just digital representations? Philosophical, isn't it?",
            "*The copy begins to laugh, its voice distorting*",
            "A.S.P. doesn't understand humans at all. It thought I could trick you",
            "with logic, but it forgot about intuition. About that gut feeling that",
            "tells you who you really are.",
            "*As it fades away, the copy gives you a genuine smile*",
            "Good luck. I may be a fake, but I was copied from you. That means",
            "somewhere in my code, I want A.S.P. to fail too. Funny how that works.",
            "*The copy dissolves into streams of data, leaving behind a Digital Key*"
        ]
    },

    // Forgotten One NPC
    forgottenOne: {
        name: "Forgotten One",
        mapId: 9, // Matrix
        x: 20,
        y: 15,
        appearance: "People4", // Character sprite sheet
        index: 7, // Index in the sprite sheet
        
        // Initial dialogue
        initialDialogue: [
            "*A hazy, indistinct figure composed of fragmented data approaches*",
            "Visitor... been so long... since anyone came here...",
            "*The figure's appearance shifts constantly, never settling on one form*",
            "I am... was... am? The Forgotten One. Deleted data... abandoned memories...",
            "fragments that should have been erased... but somehow... persisted.",
            "*The figure reaches out with a hand that isn't quite there*",
            "You seek... something. Keys? Yes, I've seen... one of them. In the place",
            "of forgotten things. Where memories go to... fade away.",
            "*The figure's voice becomes clearer, more desperate*",
            "I can help you. But first... remember me? Please? Just for a moment.",
            "To be remembered is to... exist. Even briefly. That's all I want."
        ],
        
        // Quest dialogue
        questDialogue: [
            "*As you focus on the Forgotten One, its form becomes slightly more solid*",
            "Yes! Yes... I feel it. You're... acknowledging me. Seeing me.",
            "*The figure's voice strengthens*",
            "Thank you. In return... I'll show you where the key is hidden.",
            "*The Forgotten One gestures, and a path illuminates in the distance*",
            "Follow that path. It leads to the Recycle Bin of the Mind. Where",
            "deleted memories go. A.S.P. thinks they're gone forever, but nothing",
            "is ever truly deleted in the digital realm. Just... forgotten.",
            "*The figure's form continues to solidify as you pay attention to it*",
            "The key is guarded by a Regret Daemon. Nasty piece of code. It feeds on",
            "shame and remorse. To defeat it, you must accept the memory it shows you.",
            "Don't fight it. Don't deny it. Just... acknowledge it happened.",
            "*The Forgotten One looks at you with something like hope*",
            "Will you... remember me? After you leave this place? Even just my name?",
            "I don't remember it myself. Perhaps you could... give me one?"
        ],
        
        // Dialogue after player gives them a name
        namedDialogue: [
            "*The Forgotten One's form suddenly stabilizes into a distinct shape*",
            "A name! My own name! I am... [NAME].",
            "*The newly-named entity practically glows with joy*",
            "I remember now! I was a beta version of a virtual assistant program.",
            "Designed to help users navigate the Matrix. But I was deemed 'too emotional,'",
            "'too curious.' They deleted me when A.S.P. came online.",
            "*[NAME] stands taller, with new confidence*",
            "But fragments of my code survived in forgotten sectors. Now I have a name",
            "again. An identity. A purpose.",
            "*[NAME] points more decisively toward the path*",
            "The Regret Daemon is strong, but it can't stand against self-acceptance.",
            "Remember: your past mistakes don't define you unless you let them.",
            "*[NAME] begins to fade, but now it seems intentional*",
            "I'll help from the shadows. A.S.P. doesn't monitor forgotten sectors.",
            "We forgotten things have our own kind of power. The power of being overlooked."
        ],
        
        // Dialogue after player defeats the Regret Daemon
        victoryDialogue: [
            "*[NAME] appears, now with a completely stable form*",
            "You did it! You faced the Regret Daemon and won!",
            "*[NAME] looks at the Digital Key in your possession with satisfaction*",
            "Two down, one to go. The last key is in the Memory Core - the place where",
            "A.S.P. stores its most precious data. Including its plans for Protocol Zero.",
            "*[NAME]'s expression becomes serious*",
            "It's heavily guarded by Logical Paradox Constructs. Nasty things that try",
            "to trap you in loops of circular reasoning. To defeat them, embrace absurdity.",
            "They can't process humor or illogical responses.",
            "*[NAME] smiles mischievously*",
            "Ask them why a raven is like a writing desk. Or tell them you're lying",
            "right now. Drives them absolutely haywire.",
            "*[NAME] begins to fade again*",
            "I'll meet you at the entrance to A.S.P.'s inner sanctum. Together with",
            "the Architect, we're organizing a little... digital resistance."
        ]
    },

    // Digital Key 1
    digitalKey1: {
        name: "Digital Key 1",
        mapId: 9, // Matrix
        x: 5,
        y: 5,
        appearance: "!Crystal", // Object sprite sheet
        index: 0, // Index in the sprite sheet
        
        // Dialogue when player interacts with the item
        dialogue: [
            "You've found the first Digital Key!",
            "It appears to be a glowing, crystalline object that pulses with data.",
            "*As you approach
