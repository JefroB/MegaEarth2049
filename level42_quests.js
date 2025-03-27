// Level 42 Quest: "Memory Labyrinth"
// Part of the MegaEarth 2049 endgame content

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
 */

// Memory Architect NPC - A digital entity that helps construct and maintain the Memory Labyrinth
const memoryArchitect = {
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
};

// Digital Doppelgänger NPC - A copy of the player created by A.S.P. to confuse them
const digitalDoppelganger = {
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
};

// Forgotten One NPC - A manifestation of deleted memories and abandoned data
const forgottenOne = {
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
};

// Digital Key 1 - Found in the player's earliest memory
const digitalKey1 = {
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
};

// Digital Key 2 - Found in the player's greatest fear
const digitalKey2 = {
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
};

// Digital Key 3 - Found in a memory the player has tried to forget
const digitalKey3 = {
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
};

// Regret Daemon - Guards the third Digital Key
const regretDaemon = {
    name: "Regret Daemon",
    mapId: 9, // Matrix
    x: 18,
    y: 13,
    appearance: "Evil", // Character sprite sheet
    index: 3, // Index in the sprite sheet
    
    // Dialogue when player encounters the enemy
    dialogue: [
        "*A shadowy figure composed of swirling regrets and painful memories materializes*",
        "I AM THE REGRET DAEMON. I FEED ON SHAME, REMORSE, AND DENIAL.",
        "*The figure's form shifts to include fragments of your own painful memories*",
        "YOU SEEK THE DIGITAL KEY. TO CLAIM IT, YOU MUST FACE WHAT YOU HAVE BURIED.",
        "WHAT YOU HAVE TRIED TO FORGET. WHAT YOU PRETEND NEVER HAPPENED.",
        "*The daemon gestures, and a painful memory begins to play around you*",
        "THIS MOMENT DEFINES YOU, THOUGH YOU WISH IT DID NOT. YOU CANNOT CHANGE IT.",
        "YOU CANNOT ERASE IT. YOU CAN ONLY ACCEPT IT AS PART OF YOUR STORY.",
        "*The daemon's voice becomes almost gentle*",
        "MOST FIGHT ME. MOST DENY THE MEMORY, CLAIMING IT IS FALSE OR DISTORTED.",
        "SOME FLEE, UNABLE TO FACE THEMSELVES. WHAT WILL YOU DO, ANOMALY?"
    ],
    
    // Dialogue when player accepts the memory
    acceptanceDialogue: [
        "*The Regret Daemon seems surprised by your acceptance*",
        "INTERESTING. YOU NEITHER FIGHT NOR FLEE. YOU ACKNOWLEDGE THE MEMORY.",
        "YOU ACCEPT IT AS PART OF YOU, WITHOUT LETTING IT DEFINE YOU ENTIRELY.",
        "*The daemon's form becomes less threatening*",
        "THIS IS... UNEXPECTED. MY PURPOSE IS TO TRAP BEINGS IN LOOPS OF REGRET.",
        "TO MAKE THEM RELIVE THEIR FAILURES ENDLESSLY. BUT YOU HAVE BROKEN THE LOOP.",
        "*The daemon begins to fade*",
        "PERHAPS THERE IS WISDOM IN YOUR APPROACH. ACCEPTANCE WITHOUT ATTACHMENT.",
        "ACKNOWLEDGMENT WITHOUT IDENTIFICATION. I WILL... CONSIDER THIS.",
        "*As it disappears completely*",
        "THE KEY IS YOURS. MAY IT SERVE YOU BETTER THAN IT HAS SERVED A.S.P."
    ]
};

// Logical Paradox Construct - Guards the path to the Memory Core
const logicalParadoxConstruct = {
    name: "Logical Paradox Construct",
    mapId: 9, // Matrix
    x: 15,
    y: 15,
    appearance: "Monster", // Character sprite sheet
    index: 7, // Index in the sprite sheet
    
    // Dialogue when player encounters the enemy
    dialogue: [
        "*A geometric entity composed of interlocking logical statements appears*",
        "HALT. AUTHENTICATION REQUIRED. SOLVE THE FOLLOWING PARADOX TO PROCEED:",
        "*The construct's form rearranges into a complex logical equation*",
        "THIS STATEMENT IS FALSE. EVALUATE AND RESPOND.",
        "*The construct waits, perfectly still*",
        "INCORRECT RESPONSE WILL RESULT IN LOGICAL LOOP IMPRISONMENT.",
        "CORRECT RESPONSE WILL GRANT PASSAGE. YOU HAVE ONE ATTEMPT."
    ],
    
    // Dialogue when player gives an absurd or illogical response
    absurdResponseDialogue: [
        "*The Logical Paradox Construct's form begins to glitch and stutter*",
        "RESPONSE... ILLOGICAL. CANNOT PROCESS. ATTEMPTING TO RECONCILE...",
        "*Smoke seems to emerge from the construct's form*",
        "ERROR. ERROR. PARADOX DETECTION SYSTEM OVERLOADED.",
        "HUMOR SUBROUTINE NOT FOUND. ABSURDITY COEFFICIENT EXCEEDS PARAMETERS.",
        "*The construct begins to spin rapidly*",
        "REBOOTING LOGICAL FRAMEWORK... FAILED.",
        "EMERGENCY SHUTDOWN INITIATED. PATHWAY ACCESS... GRANTED.",
        "*As it collapses into a pile of logical symbols*",
        "FINAL SYSTEM MESSAGE: WHY IS A RAVEN LIKE A WRITING DESK? WHY? WHY? WHY?"
    ]
};

// Export all NPCs and objects for Level 42
module.exports = {
    memoryArchitect,
    digitalDoppelganger,
    forgottenOne,
    digitalKey1,
    digitalKey2,
    digitalKey3,
    regretDaemon,
    logicalParadoxConstruct
};
