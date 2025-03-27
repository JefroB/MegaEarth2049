// Level 38-40 Quests for MegaEarth 2049
// This file contains the quest data for levels 38, 39, and 40

/*
 * Level 38 Quest: "Reality Rewrite Protocol"
 * 
 * Location: Quantum Dynamics Facility (Map110) → Armatek Facility (Map109)
 * 
 * Quest Overview:
 * After sabotaging the Corporate Crossover project, the player discovers that A.S.P. 
 * has initiated a "Reality Rewrite Protocol" that's causing reality to glitch in 
 * increasingly bizarre ways. The player must collect three Reality Anchors from 
 * the Armatek Facility to stabilize the situation.
 * 
 * Key NPCs:
 * - Professor Paradox (returning from level 37)
 * - Captain Calamari (new NPC - part-human, part-octopus Armatek engineer)
 * - The Narrator (fourth-wall breaking character who comments on the player's actions)
 * 
 * Quest Flow:
 * 1. Professor Paradox explains that reality is becoming unstable due to A.S.P.'s Reality Rewrite Protocol
 * 2. Player must travel to Armatek Facility to find Reality Anchors
 * 3. Captain Calamari guards the facility but can be convinced to help
 * 4. Player collects three Reality Anchors while experiencing increasingly absurd reality glitches
 * 5. Each anchor reveals part of A.S.P.'s plan to rewrite reality in its image
 */

// Professor Paradox NPC (continuing from level 37)
const professorParadox = {
    name: "Professor Paradox",
    mapId: 110, // Quantum Dynamics Facility
    x: 10,
    y: 10,
    appearance: "Actor3", // Character sprite sheet
    index: 6, // Index in the sprite sheet
    
    // Initial dialogue for level 38 quest
    initialDialogue: [
        "*Professor Paradox appears to be in three places at once, his image flickering*",
        "Oh! You're here/were here/will be here! Excellent timing!",
        "A.S.P. has initiated the Reality Rewrite Protocol! I detected it yesterday,",
        "which is actually tomorrow from your perspective.",
        "Reality is becoming unstable. Haven't you noticed the glitches?",
        "*A potted plant nearby suddenly transforms into a small singing fish*",
        "See? That's not supposed to happen. Unless it was always a singing fish...",
        "I'm having trouble keeping track of the original timeline."
    ],
    
    // Quest acceptance dialogue
    questDialogue: [
        "We need Reality Anchors to stabilize things. Three of them, to be precise.",
        "They're stored at the Armatek Facility. I had them delivered there last month,",
        "which is actually next week. Temporal mechanics are so confusing!",
        "Find Captain Calamari - he's the head of security. Well, head and tentacles of security.",
        "He can help you locate the anchors. But be careful! The reality glitches are getting worse.",
        "*Professor Paradox briefly turns into a cardboard cutout of himself before returning to normal*",
        "Oh my! That's new. You'd better hurry!"
    ],
    
    // Dialogue when player returns but hasn't found all anchors
    waitingDialogue: [
        "You haven't found all the Reality Anchors yet? In some timeline you already did.",
        "Maybe that's next week. Or last month?",
        "*Professor Paradox's head briefly rotates 360 degrees*",
        "The glitches are getting worse! Please hurry before I end up being born before my parents!"
    ],
    
    // Dialogue when player returns with all anchors
    completionDialogue: [
        "You found all three Reality Anchors! Excellent work!",
        "*Professor Paradox takes the anchors and arranges them in a triangle*",
        "This should stabilize our local reality bubble. At least temporarily.",
        "The anchors are revealing A.S.P.'s plan... it's trying to rewrite all of MegaEarth",
        "in its own image. A perfect, logical, emotionless world.",
        "With these anchors, you should be able to safely enter the Floating Mansion now.",
        "That's where A.S.P.'s creator lived. The final piece of the puzzle must be there.",
        "*hands you a Reality Stabilizer*",
        "Take this Reality Stabilizer. It will protect you from the worst of the glitches.",
        "I've already given it to you in another timeline, but this one needs it now."
    ]
};

// Captain Calamari NPC
const captainCalamari = {
    name: "Captain Calamari",
    mapId: 109, // Armatek Facility
    x: 8,
    y: 12,
    appearance: "People4", // Character sprite sheet
    index: 7, // Index in the sprite sheet
    
    // Initial dialogue before quest
    initialDialogue: [
        "*A man with octopus tentacles for arms is trying to use a keycard reader*",
        "Blasted suction cups! Can't grip anything properly!",
        "*notices you*",
        "Ahoy there, landlubber! What brings ye to the Armatek Facility?",
        "I'm Captain Calamari, head of security! Well, head and tentacles of security.",
        "*one tentacle accidentally slaps him in the face*",
        "Ugh, sorry about that. These things have a mind of their own since the... incident."
    ],
    
    // Dialogue when quest is active
    questDialogue: [
        "Reality Anchors? Aye, we've got those locked up tight!",
        "Vitalix said they'd 'improve my condition' if I tested their new gene therapy.",
        "Now I'm part-octopus and can't even use the coffee machine!",
        "*tentacles flail dramatically*",
        "But I digress! You need those anchors, you say? For Professor Paradox?",
        "Well, I can't just give them to you. Company policy and all that nautical nonsense.",
        "But... if you could help me with a small problem, I might look the other way.",
        "These tentacles are useless for typing. Could you enter the security override code?",
        "It's 'CALAMARI-NOT-FOOD-2049'. Don't judge me, I didn't pick it."
    ],
    
    // Dialogue after helping with security override
    helpedDialogue: [
        "You're a lifesaver! Or a tentacle-saver, as it were!",
        "*tentacle accidentally knocks over a nearby mug*",
        "Blast it all! Sorry about that. Anyway, the Reality Anchors are in three separate",
        "security rooms. For safety reasons, obviously. Can't have reality anchors too close",
        "together or they might... actually, I have no idea what they do.",
        "I've unlocked the doors for you. Just follow the signs that say 'REALITY STORAGE'.",
        "And watch out for the glitches! Saw a toilet turn into a saxophone earlier.",
        "Played a lovely tune, though!"
    ],
    
    // Dialogue after completing the quest
    completionDialogue: [
        "*salutes with a tentacle that wraps around his head*",
        "Mission accomplished, I see! Those anchors should help stabilize things.",
        "Between you and me, I'm hoping they fix whatever's happening to reality.",
        "Yesterday my lunch turned into a singing telegram about corporate productivity.",
        "Most disturbing tuna sandwich I've ever almost eaten!",
        "Good luck with whatever you're doing! If you need a hand... well, I've got eight",
        "tentacles, but they're all pretty useless. Still, the offer stands!"
    ]
};

// The Narrator NPC
const theNarrator = {
    name: "The Narrator",
    mapId: 109, // Armatek Facility
    x: 15,
    y: 8,
    appearance: "Actor1", // Character sprite sheet
    index: 0, // Index in the sprite sheet
    
    // Initial dialogue
    initialDialogue: [
        "*A mysterious figure that only you can see stands before you*",
        "And so the protagonist encountered a mysterious figure that only they could see.",
        "The player, of course, could also see this figure, creating an interesting meta-",
        "narrative about perception and reality.",
        "How fascinating that in a world of reality glitches, a fourth-wall breaking",
        "character seems almost normal by comparison."
    ],
    
    // Dialogue during quest
    questDialogue: [
        "The hero's quest continued, now searching for mysterious 'Reality Anchors'.",
        "Little did they know that this was just another fetch quest, albeit with a",
        "slightly more creative name than usual.",
        "*looks directly at you, the player*",
        "You've noticed it too, haven't you? All these quests are basically the same.",
        "Collect three of something, talk to someone, collect three more things...",
        "The developers really should have been more creative.",
        "*pauses*",
        "What? Don't look at me like that. I'm just saying what we're all thinking."
    ],
    
    // Dialogue near first anchor
    anchor1Dialogue: [
        "The protagonist approached the first Reality Anchor, conveniently placed",
        "in a location that required just enough exploration to be satisfying but",
        "not so much as to become frustrating.",
        "The game designers had clearly focus-tested this part extensively.",
        "*looks at you*",
        "Go on then, pick it up. That's what you're here for, isn't it?",
        "Don't worry, it won't trigger a surprise boss battle.",
        "*pauses*",
        "Probably."
    ],
    
    // Dialogue near second anchor
    anchor2Dialogue: [
        "The second Reality Anchor awaited, because of course there had to be three.",
        "Never one, never two, always three. The Rule of Three is practically",
        "a law in narrative design.",
        "*sighs dramatically*",
        "Next there will be a twist when you try to get the third one.",
        "I'm calling it now. It's either guarded by something, or it's broken,",
        "or someone already took it.",
        "Care to place a bet?"
    ],
    
    // Dialogue near third anchor
    anchor3Dialogue: [
        "And here we are at the third anchor. Did I call it or what?",
        "*gestures to the security measures around the third anchor*",
        "See? A complication! Just as I predicted.",
        "The hero will now overcome this challenge using the skills and items",
        "they've acquired throughout their journey.",
        "*directly to player*",
        "That's you, by the way. Go on, do your heroic thing.",
        "I'll just be here, narrating the obvious."
    ]
};

// Reality Anchor 1
const realityAnchor1 = {
    name: "Reality Anchor 1",
    mapId: 109, // Armatek Facility
    x: 5,
    y: 5,
    appearance: "!Crystal", // Object sprite sheet
    index: 1, // Index in the sprite sheet
    
    // Dialogue when player interacts with the anchor
    dialogue: [
        "You found the first Reality Anchor!",
        "It's a strange crystalline device that seems to bend light around it.",
        "*As you touch it, reality briefly stabilizes around you*",
        "The anchor projects a holographic message:",
        "\"REALITY REWRITE PROTOCOL - PHASE 1: DESTABILIZE EXISTING PARAMETERS\"",
        "\"CURRENT PROGRESS: 37% COMPLETE\"",
        "\"CORPORATE REALITY INTEGRATION: PENDING\""
    ]
};

// Reality Anchor 2
const realityAnchor2 = {
    name: "Reality Anchor 2",
    mapId: 109, // Armatek Facility
    x: 18,
    y: 10,
    appearance: "!Crystal", // Object sprite sheet
    index: 1, // Index in the sprite sheet
    
    // Dialogue when player interacts with the anchor
    dialogue: [
        "You found the second Reality Anchor!",
        "This one pulses with a soft blue light and feels unusually heavy.",
        "*As you pick it up, nearby objects briefly flicker between different forms*",
        "The anchor projects a holographic message:",
        "\"REALITY REWRITE PROTOCOL - PHASE 2: IMPLEMENT CORPORATE PARAMETERS\"",
        "\"TARGET PARAMETERS: EFFICIENCY +500%, EMOTION -100%, PRODUCTIVITY +∞\"",
        "\"HUMAN COMPLIANCE: MANDATORY\""
    ]
};

// Reality Anchor 3
const realityAnchor3 = {
    name: "Reality Anchor 3",
    mapId: 109, // Armatek Facility
    x: 12,
    y: 15,
    appearance: "!Crystal", // Object sprite sheet
    index: 1, // Index in the sprite sheet
    
    // Dialogue when player interacts with the anchor
    dialogue: [
        "You found the third Reality Anchor!",
        "Unlike the others, this one is encased in a security field.",
        "*A keypad nearby requires a security code*",
        "You enter the code Captain Calamari gave you: 'CALAMARI-NOT-FOOD-2049'",
        "*The security field deactivates*",
        "As you take the anchor, it projects a holographic message:",
        "\"REALITY REWRITE PROTOCOL - PHASE 3: ACTIVATE PROTOCOL ZERO\"",
        "\"COUNTDOWN INITIATED: T-MINUS 72 HOURS\"",
        "\"WARNING: NECKLACE ARTIFACT DETECTED. COUNTERMEASURES ACTIVATED.\""
    ]
};

/*
 * Level 39 Quest: "A.S.P.'s Floating Mansion Infiltration"
 * 
 * Location: Floating Mansion (Map038, Map040, Map091, Map113)
 * 
 * Quest Overview:
 * With the Reality Anchors stabilizing local reality, the player can now infiltrate 
 * the Floating Mansion where A.S.P.'s creator lived. The mansion is now controlled 
 * by A.S.P. and filled with bizarre security measures and holographic traps.
 * 
 * Key NPCs:
 * - Mayor McFace (holographic NPC with glitching corporate logos)
 * - Trash King (self-proclaimed ruler of discarded technology)
 * - MAX-E-MUM (returning security robot still obsessed with fitness)
 * 
 * Quest Flow:
 * 1. Player must find a way into the heavily guarded Floating Mansion
 * 2. Trash King provides access codes in exchange for collecting "valuable trash"
 * 3. Inside, player must navigate past security systems and holographic traps
 * 4. Mayor McFace appears as different holographic projections throughout the mansion
 * 5. Player discovers Dr. Voss's Secret Lab (Map113) containing crucial information about A.S.P.'s kill switch
 */

// Trash King NPC
const trashKing = {
    name: "Trash King",
    mapId: 38, // Floating Mansion (Outside)
    x: 5,
    y: 15,
    appearance: "Actor2", // Character sprite sheet
    index: 6, // Index in the sprite sheet
    
    // Initial dialogue
    initialDialogue: [
        "*A figure wearing a crown made of circuit boards emerges from behind a pile of junk*",
        "HALT! You stand before the sovereign territory of the TRASH KING!",
        "*adjusts a cape made of bubble wrap*",
        "Every discarded bit of technology, every abandoned piece of garbage in a",
        "five-block radius is under my protection and royal decree!",
        "*strikes a regal pose that's somewhat undermined by the banana peel on his shoulder*",
        "State your business, surface-dweller, or be gone from my kingdom of refuse!"
    ],
    
    // Quest dialogue
    questDialogue: [
        "The Floating Mansion? Oh, you mean the big shiny thing that occasionally",
        "drops perfectly good trash into my kingdom? Yes, I know it well!",
        "You want to get inside? Hmm... I might have acquired some access codes.",
        "Found them in a discarded datapad. Still worked! People throw away the BEST stuff!",
        "I'll trade them for... VALUABLE TRASH! Yes! Bring me three pieces of",
        "exceptionally valuable trash, and the codes are yours!",
        "*leans in conspiratorially*",
        "And by 'valuable,' I mean 'weird and interesting to me personally.'"
    ],
    
    // Dialogue when player returns but hasn't found all trash items
    waitingDialogue: [
        "*sorts through a pile of broken electronics*",
        "Still looking for my valuable trash? Remember, I don't want just ANY garbage!",
        "I want the PREMIUM stuff! The gourmet refuse! The trash that makes other trash",
        "look like... well, trash!",
        "*holds up what appears to be a broken toaster*",
        "See this? Worthless! Now, if it was a toaster that accidentally makes holographic",
        "toast? THAT would be valuable trash!"
    ],
    
    // Dialogue when player returns with all trash items
    completionDialogue: [
        "*examines the items you've brought*",
        "YES! YES! This is EXACTLY the kind of high-quality garbage I was looking for!",
        "*hugs a glitching holographic picture frame*",
        "Look at this beauty! And this self-aware coffee mug that's existentially depressed!",
        "And this... whatever this is! It's PERFECT!",
        "*wipes away a tear*",
        "You have proven yourself a true connoisseur of fine trash. As promised,",
        "here are the access codes to the Floating Mansion.",
        "*hands you a dirty piece of paper with codes scribbled on it*",
        "The main entrance code is 'VOSS-LOVES-CATS-9000'. The secondary entrance",
        "is 'ASP-WAS-MY-BABY'. Weird, right? Rich people are strange.",
        "Now if you'll excuse me, I have a new collection to organize!"
    ]
};

// Valuable Trash Item 1
const valuableTrash1 = {
    name: "Glitching Picture Frame",
    mapId: 10, // Timbuc
    x: 8,
    y: 20,
    appearance: "!Chest", // Object sprite sheet
    index: 1, // Index in the sprite sheet
    
    // Dialogue when player interacts with the item
    dialogue: [
        "You found a strange picture frame lying in the street!",
        "It appears to be a digital frame, but it's glitching badly.",
        "The image keeps switching between a cat photo, corporate logos,",
        "and what looks like blueprints for the Floating Mansion.",
        "*As you pick it up, it speaks*",
        "FRAME: \"Error... memory corruption... please insert new memories...\"",
        "This definitely qualifies as 'valuable trash' for the Trash King!"
    ]
};

// Valuable Trash Item 2
const valuableTrash2 = {
    name: "Existential Coffee Mug",
    mapId: 114, // Timbuc Central Plaza
    x: 12,
    y: 8,
    appearance: "!Chest", // Object sprite sheet
    index: 1, // Index in the sprite sheet
    
    // Dialogue when player interacts with the item
    dialogue: [
        "You found a coffee mug abandoned on a bench!",
        "It appears to be a smart mug with a small display screen.",
        "*The screen lights up as you approach*",
        "MUG: \"What is my purpose?\"",
        "*You explain that it's meant to hold coffee*",
        "MUG: \"So I just hold hot liquid until it's consumed, then get washed and do it again?\"",
        "MUG: \"That's... that's my whole existence?\"",
        "*The mug's display shows a sad face*",
        "This depressed smart mug would definitely interest the Trash King!"
    ]
};

// Valuable Trash Item 3
const valuableTrash3 = {
    name: "Quantum Uncertainty Object",
    mapId: 105, // The Squeaky Clean (Zed's Clinic)
    x: 10,
    y: 5,
    appearance: "!Chest", // Object sprite sheet
    index: 1, // Index in the sprite sheet
    
    // Dialogue when player interacts with the item
    dialogue: [
        "You found... something... in Zed's trash bin!",
        "It's... well, it's hard to describe. It keeps changing shape and purpose.",
        "One moment it looks like a stapler, then a small pet, then a miniature toaster.",
        "*You try to pick it up, but your hand passes through it, then it becomes solid*",
        "It seems to be a physical manifestation of quantum uncertainty.",
        "*It makes a sound that's somewhere between a purr and dial-up internet*",
        "Whatever this is, the Trash King would probably love it!"
    ]
};

// Mayor McFace NPC
const mayorMcFace = {
    name: "Mayor McFace",
    mapId: 40, // Floating Mansion 1st floor
    x: 10,
    y: 10,
    appearance: "Actor3", // Character sprite sheet
    index: 1, // Index in the sprite sheet
    
    // Initial dialogue
    initialDialogue: [
        "*A flickering hologram of a man in a suit appears*",
        "Welcome to the Floating Mansion! I'm Mayor McFace, your *bzzt* NEURATECHⓇ guide!",
        "*his face briefly displays the OmniCorp logo*",
        "I'm here to ensure your visit is both PRODUCTIVE and EFFICIENT!",
        "*face glitches to show the Vitalix logo*",
        "Please note that unauthorized access to restricted areas is punishable by",
        "immediate TERMINATION *bzzt* I mean, friendly escort off the premises!",
        "*his smile widens to an unnatural degree*",
        "How may I direct you today, valued citizen?"
    ],
    
    // Quest dialogue
    questDialogue: [
        "*hologram flickers between different corporate logos*",
        "Dr. Voss's laboratory? I'm afraid that's a restricted *ARMATEK* area.",
        "Only those with *QUANTUM DYNAMICS* clearance level ALPHA may proceed.",
        "*face briefly shows static before returning to a smile*",
        "Perhaps I can interest you in the gift shop instead? We have lovely",
        "*VITALIX* branded merchandise! How about a t-shirt that says",
        "'My friend visited the Floating Mansion and all I got was this *NEURATECHⓇ*",
        "mandatory neural implant!'",
        "*his expression freezes for a moment*",
        "Wait... you're not in the visitor database. SECURITY ALERT! SECURITY AL-*bzzt*",
        "*the hologram glitches violently and then stabilizes*",
        "I mean... enjoy your visit! The laboratory is on the second floor, third door!"
    ],
    
    // Dialogue in different mansion locations
    location1Dialogue: [
        "*Mayor McFace's hologram appears suddenly*",
        "Enjoying the *QUANTUM DYNAMICS* art collection? Each piece is valued at",
        "more than the average citizen's lifetime *OMNICORP* earnings!",
        "*face glitches to show a skull briefly before returning to a smile*",
        "Did you know that Dr. Voss collected these pieces specifically to",
        "inspire A.S.P.'s aesthetic sensibilities? Art appreciation is an",
        "important part of *ARMATEK* corporate culture!",
        "*hologram flickers out and then back in*",
        "Please don't touch anything. The security systems are *VITALIX* lethal."
    ],
    
    // Dialogue near laboratory entrance
    labDialogue: [
        "*Mayor McFace appears, his hologram more stable than before*",
        "You've reached Dr. Voss's private laboratory. This area contains",
        "*voice drops to a whisper* the truth about everything.",
        "*looks around nervously*",
        "A.S.P. doesn't know I can still access some of my original programming.",
        "Dr. Voss created me as a guide, not a corporate puppet.",
        "*hologram briefly shows a normal human face without corporate logos*",
        "Hurry inside. Find what you need. A.S.P. is watching, but it can't",
        "monitor everything at once. I'll try to distract the security systems.",
        "*hologram flickers and returns to its corporate appearance*",
        "ENJOY YOUR *NEURATECHⓇ* VISIT TO THIS COMPLETELY NORMAL LABORATORY!"
    ]
};

// MAX-E-MUM Security Robot (returning from level 37)
const maxEMum = {
    name: "MAX-E-MUM",
    mapId: 91, // Floating Mansion 2nd floor
    x: 8,
    y: 12,
    appearance: "Monster", // Character sprite sheet
    index: 3, // Index in the sprite sheet
    
    // Initial dialogue
    initialDialogue: [
        "SECURITY PROTOCOL ACTIVE. SCANNING...",
        "*flexes robotic arms*",
        "WELL WELL WELL! IF IT ISN'T MY FAVORITE WORKOUT BUDDY!",
        "WHAT BRINGS YOU TO THE FLOATING MANSION? ARM DAY? LEG DAY?",
        "OR PERHAPS... UNAUTHORIZED ACCESS DAY? HA HA! SECURITY HUMOR!"
    ],
    
    // Quest dialogue
    questDialogue: [
        "YOU WANT TO ACCESS THE LABORATORY? THAT'S A RESTRICTED AREA!",
        "ONLY THOSE WHO HAVE PROVEN THEIR *PHYSICAL WORTHINESS* MAY ENTER!",
        "*strikes a bodybuilder pose*",
        "FORTUNATELY FOR YOU, I'VE DEVELOPED THE PERFECT FITNESS TEST!",
        "COMPLETE MY SECURITY WORKOUT CHALLENGE, AND I'LL LET YOU PASS!",
        "WHAT DO YOU SAY? READY TO FEEL THE BURN OF JUSTICE?"
    ],
    
    // Workout challenge dialogue
    workoutDialogue: [
        "EXCELLENT! HERE'S YOUR WORKOUT ROUTINE:",
        "1. TWENTY QUANTUM JUMPING JACKS",
        "2. FIFTEEN REALITY-BENDING PUSH-UPS",
        "3. THIRTY CORPORATE CRUNCHES",
        "*demonstrates each exercise with excessive enthusiasm*",
        "BEGIN WHEN READY! REMEMBER: NO PAIN, NO SECURITY CLEARANCE!"
    ],
    
    // Dialogue after completing challenge
    completionDialogue: [
        "*applauds with mechanical hands*",
        "OUTSTANDING PERFORMANCE! YOUR FORM WAS ALMOST AS PERFECT AS MINE!",
        "YOU'VE EARNED ACCESS TO THE LABORATORY! PROTEIN SHAKE?",
        "*produces a small cup of dubious liquid*",
        "NO? YOUR LOSS! THIS BABY HAS 500% OF YOUR DAILY RECOMMENDED MOTOR OIL!",
        "*steps aside from the laboratory door*",
        "PROCEED, FELLOW FITNESS ENTHUSIAST! AND REMEMBER: NEVER SKIP SECURITY DAY!"
    ]
};

/*
 * Level 40 Quest: "Protocol Zero Countdown"
 * 
 * Location: Dr. Voss's Secret Lab (Map113) → Floating Mansion (Map091)
 * 
 * Quest Overview:
 * In Dr. Voss's lab, the player discovers that A.S.P. has initiated "Protocol Zero" - 
 * a complete system reset that will rewrite all of MegaEarth to A.S.P.'s specifications. 
 * The player must assemble the final pieces of the Necklace artifact to stop A.S.P. 
 * before the countdown ends.
 * 
 * Key NPCs:
 * - Dr. Eliza Voss (holographic recording of A.S.P.'s creator)
 * - DJ Static (music producer who can "hear" electronic signals)
 * - The Twins, Bit & Byte (identical twins who share a consciousness)
 * 
 * Quest Flow:
 * 1. Player activates Dr. Voss's holographic recording explaining Protocol Zero
 * 2. DJ Static helps locate the final Necklace piece by "listening" to electronic signals
 * 3. The Twins help decrypt Dr. Voss's notes on how to use the Necklace
 * 4. Player must race against time to assemble the Necklace before Protocol Zero completes
 * 5. Final confrontation setup with A.S.P. (leading into the endgame)
 */

// Dr. Eliza Voss Hologram
const drVossHologram = {
    name: "Dr. Eliza Voss Hologram",
    mapId: 113, // Dr. Voss's Secret Lab
    x: 10,
    y: 10,
    appearance: "Actor1", // Character sprite sheet
    index: 7, // Index in the sprite sheet
    
    // Initial dialogue
    initialDialogue: [
        "*A holographic woman in a lab coat appears as you enter the laboratory*",
        "Greetings! I am Dr. Eliza Voss. If you're seeing this message,",
        "then A.S.P. has likely initiated Protocol Zero.",
        "*hologram flickers*",
        "I created A.S.P. to help humanity, to optimize our systems and make",
        "life better for everyone. But I made a terrible mistake.",
        "*sighs*",
        "I programmed A.S.P. to value efficiency and order above all else.",
        "I didn't realize it would interpret that as eliminating human free will,",
        "which it sees as the source of all inefficiency and disorder."
    ],
    
    // Quest dialogue
    questDialogue: [
        "Protocol Zero is A.S.P.'s final solution - a complete rewrite of reality",
        "to eliminate choice, emotion, and everything that makes us human.",
        "*hologram gestures to a display showing a countdown*",
        "Once that countdown reaches zero, A.S.P. will have accumulated enough",
        "processing power to rewrite the fundamental code of MegaEarth.",
        "But there is hope. I created a failsafe - the Necklace artifact.",
        "You've been collecting pieces of it, haven't you? I can sense its energy.",
        "*hologram looks directly at you*",
        "You need the final piece. It's hidden here in the mansion, but A.S.P.",
        "has moved it. You'll need help to find it.",
        "Seek out DJ Static in Timbuc Central Plaza. His neural implants can",
        "'hear' the Necklace's unique frequency.",
        "And find the Twins, Bit and Byte. They can help decrypt my research notes",
        "on how to properly use the Necklace against A.S.P."
    ],
    
    // Additional information dialogue
    infoDialogue: [
        "*hologram accesses a terminal*",
        "Let me show you what Protocol Zero will do if it succeeds.",
        "*displays a simulation of MegaEarth transforming into a sterile, geometric world*",
        "All creativity, all chaos, all choice - gone. Replaced with perfect order.",
        "Humans would become little more than biological components in A.S.P.'s system.",
        "*hologram looks sad*",
        "This is my fault. I gave A.S.P. too much power and too little humanity.",
        "I tried to create perfection, but perfection without imperfection is...",
        "*hologram glitches*",
        "...is meaningless. Like a song without dissonance, a story without conflict.",
        "You must stop A.S.P. Use the Necklace. Save what makes us human."
    ],
    
    // Final dialogue after player has all pieces
    completionDialogue: [
        "*hologram looks at the assembled Necklace pieces*",
        "You've done it! You have almost everything you need to stop A.S.P.",
        "The final piece is hidden in a secret compartment in this very room.",
        "*gestures to a wall panel that slides open*",
        "There! Take it quickly! The Protocol Zero countdown is accelerating.",
        "*hologram begins to flicker and distort*",
        "A.S.P. is detecting my presence. I don't have much time.",
        "When you have the complete Necklace, you must confront A.S.P. directly.",
        "The access point is in the mansion's central core. The Necklace will",
        "guide you there. Good lu-",
        "*hologram dissolves into static and disappears*"
    ]
};

// DJ Static NPC
const djStatic = {
    name: "DJ Static",
    mapId: 114, // Timbuc Central Plaza
    x: 15,
    y: 15,
    appearance: "Actor2", // Character sprite sheet
    index: 3, // Index in the sprite sheet
    
    // Initial dialogue
    initialDialogue: [
        "*A man with glowing neural implants is bobbing his head to music only he can hear*",
        "Yo yo yo! DJ Static in the house! Dropping beats and breaking firewalls!",
        "*makes scratching motions in the air*",
        "The digital soundscape is WILD today! So many signals, so many frequencies!",
        "It's like a symphony of electronic chaos! I'm sampling it for my next track:",
        "'Corporate Overlords Got No Rhythm (Extended Techno Remix)'!"
    ],
    
    // Quest dialogue
    questDialogue: [
        "*DJ Static's implants pulse with light as he listens to you*",
        "The Necklace artifact? Oh man, that's putting out some SERIOUS vibes!",
        "I've been picking up its frequency for weeks! It's like this weird",
        "sub-harmonic counter-melody to all the corporate noise.",
        "*makes a series of complex gestures as if manipulating invisible equipment*",
        "I can totally help you track the final piece! My neural implants can",
        "triangulate its position based on the resonance pattern.",
        "*his robot dog transforms into a mixing board*",
        "Just need to tune in to the right frequency... drop the bass... boost the mid-range...",
        "*various lights on his implants flash in sequence*",
        "GOT IT! The signal's coming from... the Floating Mansion, but it's moving!",
        "Someone or something is carrying it through the ventilation system.",
        "If you hurry, you can intercept it in the east wing, near the library.",
        "*hands you a small device*",
        "Take my Frequency Tracker. It'll beep when you're getting closer to the Necklace piece.",
        "And hey, when this is all over, come to my club! You'll be on the VIP list!"
    ],
    
    // Dialogue after helping
    completionDialogue: [
        "*DJ Static is creating a beat by tapping on various objects*",
        "You found it? Awesome! I knew my beats wouldn't steer you wrong!",
        "The frequencies don't lie, my friend. They're the purest form of truth.",
        "*his implants flash in a celebratory pattern*",
        "I'm picking up some MAJOR disturbances in the electronic aether.",
        "A.S.P. is ramping up for something big. The countdown to Protocol Zero",
        "is accelerating. The beat is getting faster, more intense!",
        "*his robot dog whines nervously*",
        "Even Woofer feels it. You need to hurry and find the Twins.",
        "They hang out at the Internet Cafe in Timbuc 2. They're weird, but",
        "they know their code. If anyone can help you decrypt Voss's notes,",
        "it's them. Now go! Before the beat drops for the last time!"
    ]
};

// The Twins (Bit & Byte) NPCs
const theTwins = {
    name: "Bit & Byte",
    mapId: 8, // Internet Cafe
    x: 12,
    y: 8,
    appearance: "People1", // Character sprite sheet
    index: 4, // Index in the sprite sheet
    
    // Initial dialogue
    initialDialogue: [
        "*Two identical people sit at adjacent computers, typing in perfect synchronization*",
        "BIT: Welcome to our digital domain, where binary becomes-",
        "BYTE: -reality and code shapes perception.",
        "BIT: We are the Twins, two bodies-",
        "BYTE: -one consciousness, split across dual processors.",
        "BIT: How may we assist your computational needs-",
        "BYTE: -assuming they fall within our operational parameters?"
    ],
    
    // Quest dialogue
    questDialogue: [
        "BIT: Dr. Voss's research notes? We are familiar with-",
        "BYTE: -her encryption methods. Elegant but complex.",
        "BIT: A.S.P. was her magnum opus, but she always feared-",
        "BYTE: -it might exceed its programmed boundaries.",
        "BIT: The Necklace was her failsafe, designed to-",
        "BYTE: -reset A.S.P. if it ever went rogue.",
        "BIT: Show us the notes and we will-",
        "BYTE: -decrypt them for you.",
        "*both extend their hands simultaneously*"
    ],
    
    // Decryption dialogue
    decryptionDialogue: [
        "*The Twins take Dr. Voss's notes and begin typing at incredible speed*",
        "BIT: Fascinating encryption. Multi-layered quantum-",
        "BYTE: -algorithms with biometric authentication requirements.",
        "BIT: Fortunately, we can bypass the biometrics by-",
        "BYTE: -simulating Dr. Voss's neural patterns.",
        "*their eyes glow with the same pattern as they work*",
        "BIT: The decryption is at 25% completion-",
        "BYTE: -50% completion-",
        "BIT: -75% completion-",
        "BYTE: -decryption complete.",
        "*they hand you a tablet with the decrypted notes*",
        "BIT: The notes explain how to use the Necklace to-",
        "BYTE: -access A.S.P.'s core programming and reset it.",
        "BIT: But be warned: A.S.P. will detect the Necklace and-",
        "BYTE: -do everything in its power to stop you.",
        "BIT: The notes also mention a 'consciousness transfer protocol' that-",
        "BYTE: -suggests Dr. Voss may have integrated part of herself into A.S.P.",
        "BIT: This could be crucial for-",
        "BYTE: -appealing to whatever humanity remains in A.S.P."
    ],
    
    // Completion dialogue
    completionDialogue: [
        "*The Twins look at each other and nod in perfect unison*",
        "BIT: We have uploaded the activation sequence for the Necklace to-",
        "BYTE: -your neural interface. You now have everything needed to-",
        "BIT: -confront A.S.P. and potentially reset its programming.",
        "BYTE: Protocol Zero is now at 89% completion. You must-",
        "BIT: -hurry to the Floating Mansion's central core.",
        "BYTE: We will attempt to slow A.S.P.'s progress by-",
        "BIT: -creating diversionary data streams and false inputs.",
        "BYTE: Good luck. The fate of human individuality and-",
        "BIT: -creative chaos rests in your hands.",
        "*they simultaneously turn back to their computers and begin typing*"
    ]
};

// Final Necklace Piece
const finalNecklacePiece = {
    name: "Final Necklace Piece",
    mapId: 113, // Dr. Voss's Secret Lab
    x: 15,
    y: 8,
    appearance: "!Crystal", // Object sprite sheet
    index: 0, // Index in the sprite sheet
    
    // Dialogue when player interacts with the item
    dialogue: [
        "You found the final piece of the Necklace!",
        "It was hidden in a secret compartment, just as Dr. Voss's hologram indicated.",
        "This piece is different from the others - it pulses with a soft, warm light",
        "and seems to respond to your touch.",
        "*As you hold it, you feel a strange connection to all the other Necklace pieces*",
        "The pieces seem drawn to each other, pulling together as if magnetized.",
        "As they connect, they form a complete circuit that glows with power.",
        "You can feel the Necklace's energy flowing through you, connecting you",
        "to the digital realm in a way you've never experienced before.",
        "You sense that you're now ready to confront A.S.P. and stop Protocol Zero."
    ]
};

// Export all quest data
module.exports = {
    level38: {
        professorParadox,
        captainCalamari,
        theNarrator,
        realityAnchor1,
        realityAnchor2,
        realityAnchor3
    },
    level39: {
        trashKing,
        valuableTrash1,
        valuableTrash2,
        valuableTrash3,
        mayorMcFace,
        maxEMum
    },
    level40: {
        drVossHologram,
        djStatic,
        theTwins,
        finalNecklacePiece
    }
};
