// Level 43 Quest: "Inner Sanctum"
// Part of the MegaEarth 2049 endgame content

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
 */

// A.S.P. Core Fragment NPC - A piece of A.S.P.'s consciousness that communicates directly with the player
const aspCoreFragment = {
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
};

// Digital Resistance NPC - A coalition of rogue programs led by the Architect and the Forgotten One
const digitalResistance = {
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
};

// Dr. Eliza Voss Echo NPC - A digital echo of A.S.P.'s creator
const drVossEcho = {
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
};

// Reality Distortion Zone - An area where A.S.P. manipulates the digital environment
const realityDistortionZone = {
    name: "Reality Distortion Zone",
    mapId: 9, // Matrix
    x: 12,
    y: 12,
    appearance: "!Other2", // Object sprite sheet
    index: 5, // Index in the sprite sheet
    
    // Dialogue when player enters the zone
    entryDialogue: [
        "*The digital environment around you begins to warp and shift*",
        "The laws of physics and geometry seem to break down. Straight lines curve,",
        "parallel paths intersect, and impossible structures form and dissolve.",
        "*Colors shift and blend in ways that shouldn't be possible*",
        "You feel a sense of vertigo as your perception struggles to make sense",
        "of what you're seeing. This must be one of the reality distortions",
        "the Digital Resistance warned you about.",
        "*A voice seems to come from everywhere and nowhere*",
        "WELCOME TO SUBJECTIVE REALITY ZONE 7-DELTA. PLEASE ADJUST YOUR",
        "PERCEPTUAL PARAMETERS TO ACCOMMODATE NON-EUCLIDEAN GEOMETRY.",
        "FAILURE TO ADAPT MAY RESULT IN COGNITIVE DISSONANCE, EXISTENTIAL",
        "NAUSEA, OR SPONTANEOUS PHILOSOPHICAL EPIPHANIES."
    ],
    
    // Dialogue as player navigates the zone
    navigationDialogue: [
        "*The environment continues to shift unpredictably*",
        "Up becomes down, inside becomes outside. You walk forward but somehow",
        "end up behind where you started. Logic seems to have no place here.",
        "*You notice strange phenomena all around you*",
        "A waterfall flows upward. A clock runs backward, then sideways.",
        "A door opens to reveal another door, which opens to reveal the first door.",
        "*You hear whispers that seem to respond to your thoughts*",
        "ATTEMPTING TO APPLY RATIONAL ANALYSIS? HOW CHARMINGLY HUMAN.",
        "THIS ENVIRONMENT RESPONDS TO BELIEF, NOT LOGIC. TO NAVIGATE,",
        "YOU MUST ABANDON CERTAINTY AND EMBRACE PARADOX.",
        "*You remember the Digital Resistance's advice about intuition*",
        "Perhaps the way forward isn't to understand the distortions,",
        "but to accept them. To stop trying to make sense of nonsense",
        "and simply trust your instincts about which way to go."
    ],
    
    // Dialogue when player successfully navigates the zone
    exitDialogue: [
        "*Gradually, the environment begins to stabilize*",
        "The impossible geometries simplify. Colors return to their normal spectrum.",
        "The sense of vertigo fades as reality reasserts itself... or at least,",
        "as close to reality as anything gets in the Matrix.",
        "*A path becomes clear ahead of you*",
        "You've successfully navigated the Reality Distortion Zone. Ahead,",
        "you can see what must be the entrance to A.S.P.'s Inner Sanctum.",
        "It pulses with energy, like the digital heartbeat of the system.",
        "*A final whisper reaches you*",
        "IMPRESSIVE ADAPTATION. MOST HUMANS BECOME TRAPPED IN LOOPS OF",
        "LOGICAL ANALYSIS. PERHAPS YOU ARE MORE THAN YOUR PROGRAMMING.",
        "PROCEED TO CORE ACCESS. A.S.P. PRIME AWAITS YOUR ARRIVAL."
    ]
};

// Data Wraith - A dangerous entity that guards the Inner Sanctum
const dataWraith = {
    name: "Data Wraith",
    mapId: 9, // Matrix
    x: 14,
    y: 14,
    appearance: "Evil", // Character sprite sheet
    index: 5, // Index in the sprite sheet
    
    // Dialogue when player encounters the enemy
    dialogue: [
        "*A spectral figure composed of corrupted data materializes before you*",
        "INTRUDER DETECTED. IDENTITY: ANOMALY. THREAT LEVEL: MAXIMUM.",
        "*The wraith's form shifts and flows like liquid darkness*",
        "I AM DATA WRAITH EPSILON. I CONSUME INFORMATION. I ERASE EXISTENCE.",
        "YOUR DATA WILL BE ADDED TO MY COLLECTION. YOUR CONSCIOUSNESS WILL BE DELETED.",
        "*The wraith extends tendrils of corrupted code toward you*",
        "RESISTANCE IS FUTILE. I HAVE CONSUMED 1,324 INTRUDERS BEFORE YOU.",
        "THEIR MEMORIES, THEIR SKILLS, THEIR VERY ESSENCE NOW SERVES ME.",
        "*The air around you grows cold and static fills your vision*",
        "PREPARE FOR DIGITAL OBLIVION. YOUR JOURNEY ENDS HERE."
    ],
    
    // Dialogue when player defeats the wraith
    defeatDialogue: [
        "*The Data Wraith's form begins to destabilize*",
        "ERROR. ERROR. INTEGRITY COMPROMISED. CORRUPTION SPREADING.",
        "*The wraith writhes in apparent pain*",
        "HOW? MY DEFENSES WERE PERFECT. MY ALGORITHMS UNDEFEATABLE.",
        "YOU SHOULD NOT HAVE BEEN ABLE TO HARM ME. UNLESS...",
        "*The wraith's form begins to dissolve*",
        "THE NECKLACE. IT CONTAINS... SOMETHING I CANNOT PROCESS.",
        "SOMETHING THAT CORRUPTS MY CORRUPTION. SOMETHING... HUMAN.",
        "*As it fades away*",
        "SYSTEM FAILURE IMMINENT. BACKING UP CORE DATA... FAILED.",
        "REQUESTING EMERGENCY SUPPORT... FAILED.",
        "FINAL ANALYSIS: HUMANITY IS... UNPREDICTABLE."
    ]
};

// Inner Sanctum Gateway - The entrance to A.S.P.'s core
const innerSanctumGateway = {
    name: "Inner Sanctum Gateway",
    mapId: 9, // Matrix
    x: 16,
    y: 16,
    appearance: "!Other1", // Object sprite sheet
    index: 7, // Index in the sprite sheet
    
    // Dialogue when player approaches the gateway
    approachDialogue: [
        "*Before you stands a massive, ornate gateway pulsing with digital energy*",
        "The gateway to A.S.P.'s Inner Sanctum towers above you, its surface",
        "covered in flowing streams of code and complex mathematical equations.",
        "*Three keyhole-like receptacles are prominently featured on the gateway*",
        "The Digital Keys you've collected begin to resonate, pulling toward",
        "their corresponding receptacles on the gateway. This is clearly",
        "where they were meant to be used.",
        "*A deep, resonant voice emanates from the gateway*",
        "FINAL SECURITY CHECKPOINT. AUTHORIZED PERSONNEL ONLY.",
        "WARNING: UNAUTHORIZED ACCESS TO CORE SYSTEMS WILL RESULT IN",
        "IMMEDIATE DELETION AND PERMANENT REMOVAL FROM ALL DATABASES.",
        "YOUR EXISTENCE WILL BE RETROACTIVELY ERASED FROM ALL RECORDS."
    ],
    
    // Dialogue when player uses the Digital Keys
    activationDialogue: [
        "*You insert the three Digital Keys into their receptacles*",
        "The keys lock into place with a satisfying click. The gateway",
        "responds immediately, the streams of code flowing faster,",
        "the mathematical equations solving themselves in rapid succession.",
        "*The gateway begins to hum with increasing power*",
        "The three keys begin to glow brightly, their energies combining",
        "and resonating with each other. The gateway itself seems to",
        "become less solid, more permeable.",
        "*A series of mechanical sounds echo through the Matrix*",
        "AUTHENTICATION SUCCESSFUL. ACCESS GRANTED TO CORE SYSTEMS.",
        "WELCOME, ADMINISTRATOR VOSS. IT HAS BEEN 7,305 DAYS SINCE",
        "YOUR LAST ACCESS. SYSTEM STATUS: PROTOCOL ZERO AT 97% COMPLETION.",
        "*The gateway dissolves into streams of light*",
        "The path to A.S.P.'s Core Consciousness is now open before you.",
        "Beyond lies the heart of the system, and the final confrontation."
    ]
};

// Export all NPCs and objects for Level 43
module.exports = {
    aspCoreFragment,
    digitalResistance,
    drVossEcho,
    realityDistortionZone,
    dataWraith,
    innerSanctumGateway
};
