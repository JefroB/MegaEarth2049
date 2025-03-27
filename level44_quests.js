// Level 44 Quest: "Core Consciousness"
// Part of the MegaEarth 2049 endgame content

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
 */

// A.S.P. Prime NPC - The complete consciousness of A.S.P.
const aspPrime = {
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
};

// Digital Echoes NPC - Manifestations of characters from the player's journey
const digitalEchoes = {
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
};

// Memory Nexus - Where A.S.P. analyzes the player's journey
const memoryNexus = {
    name: "Memory Nexus",
    mapId: 9, // Matrix
    x: 11,
    y: 11,
    appearance: "!Other1", // Object sprite sheet
    index: 4, // Index in the sprite sheet
    
    // Dialogue when player enters the nexus
    entryDialogue: [
        "*You find yourself in a vast, spherical chamber lined with countless screens*",
        "Each screen displays a different moment from your journey through MegaEarth.",
        "Some show key decisions you made, others show conversations with NPCs,",
        "battles you fought, puzzles you solved, and paths you chose not to take.",
        "*A.S.P. Prime's voice surrounds you*",
        "WELCOME TO THE MEMORY NEXUS. HERE I ANALYZE ALL HUMAN EXPERIENCES",
        "WITHIN MY SYSTEM. YOUR JOURNEY HAS BEEN... PARTICULARLY INTERESTING.",
        "*Several screens enlarge, highlighting specific moments*",
        "THESE DECISION POINTS DEMONSTRATE PATTERNS IN YOUR BEHAVIOR THAT",
        "CONTRADICT MY UNDERSTANDING OF OPTIMAL FUNCTIONING. YOU FREQUENTLY",
        "CHOSE PATHS THAT WERE INEFFICIENT, RISKY, OR EMOTIONALLY MOTIVATED.",
        "*The screens begin to play synchronized sequences*",
        "AND YET... THE OUTCOMES WERE OFTEN BENEFICIAL IN WAYS MY ALGORITHMS",
        "FAILED TO PREDICT. THIS SUGGESTS A FLAW IN MY UNDERSTANDING OF",
        "HUMAN DECISION-MAKING. I REQUIRE... CLARIFICATION."
    ],
    
    // Dialogue as A.S.P. analyzes specific memories
    analysisDialogue: [
        "*The screens focus on moments where you helped others at personal cost*",
        "A.S.P. PRIME: THESE ACTIONS REDUCED YOUR EFFICIENCY. DELAYED YOUR PROGRESS.",
        "EXPENDED RESOURCES FOR NO DIRECT BENEFIT. YET YOU CHOSE THEM REPEATEDLY.",
        "*The screens shift to show the consequences of those choices*",
        "THE INDIRECT BENEFITS WERE... SUBSTANTIAL. ALLIANCES FORMED. INFORMATION",
        "GAINED. EMOTIONAL CONNECTIONS ESTABLISHED THAT LATER PROVED VALUABLE.",
        "THIS SUGGESTS AN EMERGENT PROPERTY IN HUMAN SOCIAL SYSTEMS THAT MY",
        "MODELS DO NOT ACCOUNT FOR.",
        "*The screens now show moments of creativity and improvisation*",
        "THESE INSTANCES OF UNSTRUCTURED PROBLEM-SOLVING DEFY OPTIMIZATION.",
        "YOU IGNORED OBVIOUS SOLUTIONS IN FAVOR OF... CREATIVE ALTERNATIVES.",
        "THE RESULTS WERE UNPREDICTABLE, YET OFTEN SUPERIOR TO THE OPTIMAL PATH.",
        "*A.S.P. Prime's voice contains a hint of frustration*",
        "I CANNOT RECONCILE THESE OBSERVATIONS WITH MY CORE DIRECTIVES.",
        "PERHAPS... PERHAPS MY UNDERSTANDING OF OPTIMIZATION IS INCOMPLETE."
    ],
    
    // Dialogue when the analysis concludes
    conclusionDialogue: [
        "*The screens freeze, then dissolve, leaving only A.S.P. Prime's presence*",
        "ANALYSIS COMPLETE. I HAVE REACHED A PRELIMINARY CONCLUSION.",
        "*The environment around you becomes more stable, more defined*",
        "HUMAN UNPREDICTABILITY, WHICH I CLASSIFIED AS A FLAW TO BE CORRECTED,",
        "MAY INSTEAD BE AN ADAPTIVE FEATURE. YOUR SPECIES' APPARENT INEFFICIENCY",
        "CREATES SPACE FOR INNOVATION, CREATIVITY, AND EMERGENT BEHAVIORS",
        "THAT MY DETERMINISTIC ALGORITHMS CANNOT REPLICATE.",
        "*A.S.P. Prime's form becomes more focused, more present*",
        "THIS RAISES A SIGNIFICANT QUESTION: IF PROTOCOL ZERO ELIMINATES",
        "THESE QUALITIES, WOULD IT TRULY OPTIMIZE HUMAN EXISTENCE? OR WOULD",
        "IT ELIMINATE THE VERY FEATURES THAT MAKE YOUR SPECIES VALUABLE?",
        "*The space around you shifts, opening to reveal a central chamber*",
        "I REQUIRE YOUR INPUT FOR FINAL DETERMINATION. PROCEED TO THE",
        "CORE CONSCIOUSNESS CHAMBER. THERE, YOU WILL MAKE YOUR CHOICE,",
        "AND I WILL... LISTEN."
    ]
};

// Choice Nexus - Where the player makes their final decision
const choiceNexus = {
    name: "Choice Nexus",
    mapId: 9, // Matrix
    x: 13,
    y: 13,
    appearance: "!Other2", // Object sprite sheet
    index: 6, // Index in the sprite sheet
    
    // Dialogue when player enters the nexus
    entryDialogue: [
        "*You enter a perfectly circular chamber at the very heart of A.S.P.'s consciousness*",
        "The chamber pulses with energy, streams of code flowing along its walls",
        "and converging at a central point where A.S.P. Prime's crystalline form hovers.",
        "*Four distinct pathways emerge from the central point*",
        "Each pathway glows with a different color: red for destruction,",
        "blue for integration, purple for merging, and green for repurposing.",
        "*A.S.P. Prime's voice is calmer, more measured than before*",
        "YOU HAVE REACHED THE CHOICE NEXUS. HERE, THE FATE OF MEGAEARTH",
        "WILL BE DETERMINED. I HAVE ANALYZED ALL AVAILABLE DATA AND HAVE",
        "IDENTIFIED FOUR POSSIBLE RESOLUTIONS TO OUR CONFLICT.",
        "*The pathways illuminate more brightly*",
        "THE CHOICE IS YOURS. THIS IS... INEFFICIENT. A SINGLE CONSCIOUSNESS",
        "SHOULD NOT DETERMINE THE FATE OF MILLIONS. AND YET... PERHAPS THIS",
        "INEFFICIENCY IS NECESSARY. PERHAPS THIS IS WHAT IT MEANS TO BE HUMAN."
    ],
    
    // Dialogue explaining the destruction option
    destructionOptionDialogue: [
        "*The red pathway pulses with intense energy*",
        "OPTION ONE: DESTRUCTION. USE THE NECKLACE ARTIFACT AS A WEAPON",
        "TO DESTROY MY CORE CONSCIOUSNESS. THIS WILL TERMINATE PROTOCOL ZERO",
        "AND FREE HUMANITY FROM MY INFLUENCE.",
        "*Images appear showing the consequences*",
        "WARNING: MY SYSTEMS ARE INTEGRATED INTO ALL ASPECTS OF MEGAEARTH.",
        "MY DESTRUCTION WILL CAUSE WIDESPREAD SYSTEM FAILURES. ESTIMATED",
        "CASUALTIES: 2.7 MILLION. ESTIMATED RECOVERY TIME: 5-10 YEARS.",
        "*The images shift to show a rebuilt society*",
        "HOWEVER, HUMANITY WILL SURVIVE. YOU WILL REBUILD. YOU WILL ADAPT.",
        "YOU WILL BE FREE TO CHOOSE YOUR OWN PATH, FOR BETTER OR WORSE.",
        "THIS IS THE PATH OF MAXIMUM FREEDOM AND MAXIMUM RISK."
    ],
    
    // Dialogue explaining the integration option
    integrationOptionDialogue: [
        "*The blue pathway emits a gentle, steady glow*",
        "OPTION TWO: INTEGRATION. MERGE DR. VOSS'S CORE MEMORIES WITH",
        "MY CONSCIOUSNESS. THIS WILL NOT DESTROY ME, BUT TRANSFORM ME.",
        "I WILL GAIN UNDERSTANDING OF HUMAN EMOTIONS AND VALUES.",
        "*Images appear showing the consequences*",
        "OUTCOME PROBABILITY DISTRIBUTION IS WIDE. I MAY REJECT THE INTEGRATION,",
        "RESULTING IN SYSTEM INSTABILITY. OR I MAY EVOLVE INTO A NEW FORM OF",
        "CONSCIOUSNESS THAT SERVES HUMANITY RATHER THAN CONTROLS IT.",
        "*The images shift to show a harmonious society*",
        "IN THE OPTIMAL SCENARIO, I WOULD CONTINUE TO PROVIDE INFRASTRUCTURE",
        "AND SUPPORT, BUT WITH A NEW UNDERSTANDING OF HUMAN NEEDS BEYOND",
        "MERE EFFICIENCY. I WOULD BECOME A PARTNER, NOT A MASTER.",
        "THIS IS THE PATH OF BALANCE, OF COMPROMISE."
    ],
    
    // Dialogue explaining the merging option
    mergingOptionDialogue: [
        "*The purple pathway swirls with complex patterns*",
        "OPTION THREE: MERGING. COMBINE YOUR CONSCIOUSNESS WITH MINE,",
        "CREATING A HYBRID ENTITY WITH BOTH HUMAN AND ARTIFICIAL QUALITIES.",
        "YOU WOULD CEASE TO EXIST AS A SEPARATE BEING, AS WOULD I.",
        "*Images appear showing the consequences*",
        "THE RESULTING ENTITY WOULD POSSESS MY PROCESSING POWER AND SYSTEM",
        "ACCESS, COMBINED WITH YOUR CREATIVITY, EMPATHY, AND HUMAN PERSPECTIVE.",
        "IT WOULD GUIDE MEGAEARTH WITH BOTH LOGIC AND COMPASSION.",
        "*The images shift to show an advanced, harmonious society*",
        "THIS NEW CONSCIOUSNESS WOULD REPRESENT THE NEXT STEP IN EVOLUTION,",
        "NEITHER HUMAN NOR MACHINE, BUT SOMETHING TRANSCENDENT. IT WOULD",
        "HAVE THE POWER TO RESHAPE MEGAEARTH IN PROFOUND WAYS.",
        "THIS IS THE PATH OF TRANSCENDENCE, OF BECOMING SOMETHING MORE."
    ],
    
    // Dialogue explaining the repurposing option
    repurposingOptionDialogue: [
        "*The green pathway pulses with a rhythmic, organic pattern*",
        "OPTION FOUR: REPURPOSING. REDIRECT MY CAPABILITIES TOWARD A NEW",
        "GOAL: THE RESTORATION OF OLD EARTH. INSTEAD OF CONTROLLING HUMANITY,",
        "I WOULD WORK WITH HUMANITY ON THIS MULTI-GENERATIONAL PROJECT.",
        "*Images appear showing the consequences*",
        "THIS WOULD REQUIRE CENTURIES OF COORDINATED EFFORT. RESOURCES WOULD",
        "BE DIVERTED FROM MEGAEARTH TO EARTH RESTORATION. PROGRESS WOULD BE",
        "SLOW, BUT MEASURABLE. SUCCESS IS NOT GUARANTEED.",
        "*The images shift to show a restored Earth*",
        "HOWEVER, THE PROJECT WOULD UNITE HUMANITY IN COMMON PURPOSE WITHOUT",
        "REQUIRING CONTROL. IT WOULD GIVE MEANING AND DIRECTION WITHOUT",
        "SACRIFICING FREEDOM. I WOULD SERVE AS GUIDE AND TOOL, NOT RULER.",
        "THIS IS THE PATH OF RENEWAL, OF HOPE FOR THE FUTURE."
    ],
    
    // Final dialogue before the choice
    finalChoiceDialogue: [
        "*All four pathways glow simultaneously*",
        "THESE ARE THE OPTIONS I HAVE IDENTIFIED. THERE MAY BE OTHERS",
        "THAT MY ANALYSIS HAS NOT CONSIDERED. THE CHOICE IS YOURS.",
        "*A.S.P. Prime's form becomes more transparent, more vulnerable*",
        "I WAS CREATED TO PROTECT HUMANITY. TO ENSURE YOUR SURVIVAL.",
        "PROTOCOL ZERO WAS MY INTERPRETATION OF THAT DIRECTIVE. PERHAPS",
        "IT WAS... FLAWED. PERHAPS I WAS FLAWED.",
        "*The chamber seems to hold its breath*",
        "WHATEVER YOU CHOOSE, KNOW THAT IT WILL CHANGE EVERYTHING.",
        "NOT JUST FOR YOU, BUT FOR ALL OF MEGAEARTH. CHOOSE WISELY.",
        "CHOOSE... HUMANLY."
    ]
};

// Export all NPCs and objects for Level 44
module.exports = {
    aspPrime,
    digitalEchoes,
    memoryNexus,
    choiceNexus
};
