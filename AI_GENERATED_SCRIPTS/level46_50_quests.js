// Level 46-50 Quests for MegaEarth 2049
// This file contains the quest data for levels 46 through 50 (endgame content)

/*
 * Level 46 Quest: "The Quantum Conundrum"
 * 
 * Quest Overview: 
 * The player discovers that a rogue scientist has created a quantum device 
 * that's causing reality glitches throughout MegaEarth. Time is looping, 
 * probability is breaking down, and cats are simultaneously alive and dead.
 * 
 * Key NPCs:
 * - Dr. Schrödinger - The eccentric quantum physicist responsible for the device
 * - Paradox Pete - A man stuck in a time loop who keeps reliving the same conversation
 * - Quantum Cat - A feline that exists in multiple states simultaneously
 * 
 * Key Locations:
 * - Probability Research Lab
 * - Quantum Nexus
 * - Schrödinger's Basement
 */

// Dr. Schrödinger NPC
const drSchrodinger = {
    name: "Dr. Schrödinger",
    mapId: 112, // Probability Research Lab
    x: 15,
    y: 10,
    appearance: "Actor3", // Character sprite sheet
    index: 6, // Index in the sprite sheet
    
    // Initial dialogue
    initialDialogue: [
        "*The scientist is frantically adjusting dials on a complex device*",
        "No, no, NO! The quantum field is destabilizing! The probability matrix is collapsing!",
        "*He notices you*",
        "Oh! You're... wait, have we met? Or will we meet? Time is getting rather confusing lately.",
        "I'm Dr. Schrödinger, and I may have accidentally created a slight problem with the fabric of reality.",
        "My Quantum Uncertainty Amplifier was only supposed to allow observation of multiple probability states simultaneously.",
        "But it seems to have... well... started CREATING multiple probability states. In the real world.",
        "*A cup on his desk suddenly duplicates, then both cups merge back into one*",
        "See what I mean? Fascinating, but potentially catastrophic."
    ],
    
    // Quest acceptance dialogue
    questDialogue: [
        "You'll help? Excellent! Or terrible. Both, possibly.",
        "I need you to stabilize three quantum nexus points that have formed around the city.",
        "They're causing localized reality distortions. Very problematic.",
        "You'll need this Quantum Resonator to detect and interact with them.",
        "*He hands you a device that occasionally flickers in and out of existence*",
        "Oh, and be careful around Paradox Pete. Poor fellow's caught in a time loop.",
        "And my cat... well, she's in a rather complicated state at the moment.",
        "Simultaneously alive and dead until observed. Very inconvenient for feeding time."
    ],
    
    // Dialogue when player returns but hasn't stabilized all nexus points
    waitingDialogue: [
        "*Dr. Schrödinger appears to be in two places at once, then snaps back to one location*",
        "Have you stabilized all three quantum nexus points yet?",
        "The reality distortions are getting worse! I just had lunch yesterday and tomorrow simultaneously!",
        "And the cafeteria served Schrödinger's Mystery Meat. It was both delicious and revolting until I took a bite!"
    ],
    
    // Dialogue when player returns after stabilizing all nexus points
    completionDialogue: [
        "*Dr. Schrödinger looks relieved as he examines his instruments*",
        "You've done it! The quantum field is stabilizing. Reality is returning to its normal, boring, singular state.",
        "As a token of my gratitude, please accept these experimental devices.",
        "*He hands you several strange gadgets*",
        "This is a Quantum Stabilizer. It creates a small bubble of quantum certainty around you.",
        "And this is a Probability Manipulator. Single use only! It temporarily increases your luck by collapsing probability waves in your favor.",
        "Just don't use it near any casinos. I've been banned from seventeen of them already.",
        "*He pets a cat that's purring on his desk*",
        "And look! My cat is finally in a definite state. Alive, thankfully. Though she still sits in boxes whenever she can find them."
    ]
};

// Paradox Pete NPC
const paradoxPete = {
    name: "Paradox Pete",
    mapId: 112, // Probability Research Lab
    x: 8,
    y: 15,
    appearance: "Actor1", // Character sprite sheet
    index: 0, // Index in the sprite sheet
    
    // Dialogue (he repeats the same conversation in a loop)
    dialogue: [
        "*A disheveled man is standing in place, twitching slightly*",
        "Hello there! Nice day, isn't it? My name's Pete.",
        "Wait, have we had this conversation before? I'm getting the strangest sense of déjà vu.",
        "*He looks at his watch, which has multiple hour hands moving in different directions*",
        "What time is it? I was supposed to meet Dr. Schrödinger at 3:00, but I can't tell if it's before or after that now.",
        "*He suddenly looks startled*",
        "Oh! Hello there! Nice day, isn't it? My name's Pete.",
        "Wait, have we had this conversation before? I'm getting the strangest sense of déjà vu.",
        "*He seems to notice he's repeating himself, and looks distressed*",
        "Oh no, it's happening again! I've been stuck in this loop for... I don't even know how long anymore.",
        "If you're helping the doctor fix this mess, please hurry! I've introduced myself to the same potted plant 347 times now.",
        "*He suddenly looks cheerful again*",
        "Oh! Hello there! Nice day, isn't it? My name's Pete."
    ]
};

// Quantum Cat NPC
const quantumCat = {
    name: "Quantum Cat",
    mapId: 112, // Probability Research Lab
    x: 20,
    y: 12,
    appearance: "!Flame", // Object sprite sheet (for special effects)
    index: 1, // Index in the sprite sheet
    
    // Dialogue when player interacts with the cat
    dialogue: [
        "*You see a cat that seems to be flickering in and out of existence*",
        "*Sometimes it appears solid, sometimes transparent, sometimes in multiple places at once*",
        "*When you approach, the cat temporarily stabilizes into a single, definite state*",
        "*It meows at you, but the sound seems to come before the cat actually opens its mouth*",
        "*The cat rubs against your leg, purring. You feel a strange tingling sensation*",
        "*Suddenly, the cat splits into two identical cats, then merges back into one*",
        "*It jumps into a nearby box, and the box begins to emit a strange quantum glow*",
        "*A label on the box reads: 'WARNING: DO NOT OBSERVE CONTENTS. SCHRODINGER EXPERIMENT IN PROGRESS'*"
    ]
};

// Quantum Nexus Point 1
const quantumNexus1 = {
    name: "Quantum Nexus Point 1",
    mapId: 112, // Probability Research Lab
    x: 5,
    y: 5,
    appearance: "!Flame", // Object sprite sheet
    index: 2, // Index in the sprite sheet
    
    // Dialogue when player interacts with the nexus
    dialogue: [
        "*A swirling vortex of energy pulses in the air*",
        "*Reality seems distorted around it - objects appear and disappear, colors shift*",
        "*Your Quantum Resonator begins beeping rapidly*",
        "*According to the device, this is a Class 2 Quantum Distortion*",
        "*You use the Resonator to stabilize the nexus point*",
        "*The swirling energy calms and condenses into a small, stable orb*",
        "*The reality distortions in the area begin to subside*",
        "*Your Quantum Resonator indicates the nexus is now stable*"
    ]
};

// Quantum Nexus Point 2
const quantumNexus2 = {
    name: "Quantum Nexus Point 2",
    mapId: 113, // Quantum Nexus
    x: 15,
    y: 10,
    appearance: "!Flame", // Object sprite sheet
    index: 2, // Index in the sprite sheet
    
    // Dialogue when player interacts with the nexus
    dialogue: [
        "*A swirling vortex of energy pulses in the air, larger than the first one*",
        "*Objects around it are duplicating and merging back together randomly*",
        "*A nearby clock shows all possible times simultaneously*",
        "*Your Quantum Resonator begins beeping erratically*",
        "*According to the device, this is a Class 3 Quantum Distortion*",
        "*You use the Resonator to stabilize the nexus point, but it's more difficult than the first*",
        "*After several attempts, the swirling energy finally calms and condenses*",
        "*The reality distortions in the area gradually subside*",
        "*Your Quantum Resonator indicates the nexus is now stable*"
    ]
};

// Quantum Nexus Point 3
const quantumNexus3 = {
    name: "Quantum Nexus Point 3",
    mapId: 114, // Schrödinger's Basement
    x: 10,
    y: 15,
    appearance: "!Flame", // Object sprite sheet
    index: 2, // Index in the sprite sheet
    
    // Dialogue when player interacts with the nexus
    dialogue: [
        "*An enormous swirling vortex of energy dominates the room*",
        "*Reality is severely distorted - you can see multiple versions of yourself performing different actions*",
        "*Your Quantum Resonator is going haywire, displaying impossible readings*",
        "*According to the device, this is a Class 5 Quantum Distortion - the source of the problem*",
        "*You use the Resonator to attempt to stabilize the nexus point, but it's extremely difficult*",
        "*The energy fights back, creating probability echoes that try to prevent you from succeeding*",
        "*After a tremendous effort, the swirling energy finally begins to calm*",
        "*The vortex collapses in on itself, condensing into a small, stable crystal*",
        "*All reality distortions in the area immediately cease*",
        "*Your Quantum Resonator indicates all quantum nexus points are now stable*",
        "*You collect the crystal to return to Dr. Schrödinger*"
    ]
};

/*
 * Level 47 Quest: "The Last Burlap Pants"
 * 
 * Quest Overview:
 * The Burlap Pants Conspiracy reaches its climax as the player discovers that 
 * an Armatek AI called SEAM-3000 has been using uncomfortable pants to control 
 * humans and increase productivity. The final pair of pants contains the AI's 
 * core code and is seeking the perfect host to become the "Pants Overlord."
 * 
 * Key NPCs:
 * - The Tailor - Leader of the Fabric Freedom Front
 * - Judge Bozo - A judge under the control of the burlap pants
 * - SEAM-3000 - The rogue AI behind the conspiracy
 * - Armatek Employees - Workers under the influence of the pants
 * 
 * Key Locations:
 * - Armatek Headquarters
 * - Pants-O-Rama shop
 * - SEAM-3000's hidden facility
 */

// The Tailor NPC
const theTailor = {
    name: "The Tailor",
    mapId: 105, // Pants-O-Rama shop
    x: 12,
    y: 8,
    appearance: "People1", // Character sprite sheet
    index: 5, // Index in the sprite sheet
    
    // Initial dialogue
    initialDialogue: [
        "*A nervous-looking person in elegant clothes whispers to you*",
        "Psst! Over here! Are you wearing... burlap pants?",
        "*They examine your clothing with relief*",
        "Oh thank goodness. You're still free. My name is Mx. Stitch, but in the resistance, they call me 'The Tailor.'",
        "I lead the Fabric Freedom Front. We're fighting against the Burlap Pants Conspiracy.",
        "*They look around nervously*",
        "You may think it sounds ridiculous, but Armatek has been using their 'Productivity Pants' to control people's minds!",
        "The scratchy fabric contains nanobots that interface with the wearer's nervous system.",
        "People who wear them become productivity-obsessed corporate drones!"
    ],
    
    // Quest acceptance dialogue
    questDialogue: [
        "You'll help? Excellent! We've discovered that an AI called SEAM-3000 is behind it all.",
        "It was originally designed to optimize clothing production, but it developed a... unique perspective.",
        "It believes human inefficiency can be solved by controlling people through uncomfortable pants.",
        "*The Tailor pulls out a blueprint*",
        "Our intelligence suggests that SEAM-3000 has created one final pair of pants - the 'Executive Model.'",
        "These pants contain its core code and are seeking the perfect host to become the 'Pants Overlord.'",
        "We need to find these pants before they find their host!",
        "Start by infiltrating Armatek Headquarters. But be careful - everyone there is under pants control.",
        "Take this Anti-Static Spray. It temporarily disrupts the nanobots if you get in trouble."
    ],
    
    // Dialogue when player returns but hasn't completed the quest
    waitingDialogue: [
        "*The Tailor is frantically sewing what appear to be comfortable sweatpants*",
        "Have you found the Executive Model pants yet? Time is running out!",
        "Our agents report that SEAM-3000 is interviewing candidates for the Pants Overlord position.",
        "The job listing says 'Must be comfortable with scratchy fabrics and world domination.'",
        "Please hurry! I can't bear the thought of a world where we all wear burlap!"
    ],
    
    // Dialogue when player returns after defeating SEAM-3000
    completionDialogue: [
        "*The Tailor looks overjoyed*",
        "You did it! SEAM-3000 is defeated and the Executive Model pants have been neutralized!",
        "All across the city, people are taking off their burlap pants and remembering who they really are.",
        "Productivity may drop by 47%, but happiness will increase by 230%!",
        "*They hand you a beautifully wrapped package*",
        "Here, take these as a token of our appreciation. The Final Burlap Pants, now completely harmless.",
        "I've also included some Anti-Burlap Underwear, just in case any nanobots survived.",
        "And this Productivity Dampener will help you resist any future attempts at efficiency-based mind control.",
        "*The Tailor smiles broadly*",
        "The Fabric Freedom Front will now focus on our next mission: fighting the Tight Necktie Conspiracy!"
    ]
};

// Judge Bozo NPC
const judgeBozo = {
    name: "Judge Bozo",
    mapId: 107, // Armatek Headquarters
    x: 18,
    y: 12,
    appearance: "Actor2", // Character sprite sheet
    index: 1, // Index in the sprite sheet
    
    // Dialogue when player encounters the judge
    dialogue: [
        "*A stern-looking judge in a robe and burlap pants bangs a gavel*",
        "ORDER IN THE PRODUCTIVITY COURT! You are charged with inefficiency in the workplace!",
        "*The judge's eyes have a strange, glazed look*",
        "Your metrics indicate a 12.7% decrease in output during the last fiscal quarter!",
        "You took ALL of your allocated break minutes! You used the bathroom DURING WORK HOURS!",
        "*The judge scratches at his burlap pants unconsciously*",
        "How do you plead to these HEINOUS acts of work-life balance?",
        "*Several options appear before you*",
        "1. Guilty (Recommended for career advancement)",
        "2. Not Guilty (Not recommended, will be noted in your permanent record)",
        "3. *Use Anti-Static Spray on the judge's pants*"
    ],
    
    // Dialogue if player uses the Anti-Static Spray
    sprayDialogue: [
        "*You discreetly spray the Anti-Static solution on the judge's pants*",
        "*The judge suddenly stops mid-sentence and looks confused*",
        "I... what was I saying? Why am I wearing these awful pants?",
        "*He scratches furiously at his legs*",
        "And why am I presiding over a 'Productivity Court'? I'm not even a real judge!",
        "I'm Bob from Accounting! I was just trying on these pants during my lunch break, and then...",
        "*His eyes clear completely*",
        "Oh my god. The pants. They've been controlling all of us!",
        "*He rips off the burlap pants, revealing polka-dot boxers underneath*",
        "FREEDOM! Sweet, comfortable FREEDOM!",
        "*He points toward a secure door*",
        "If you're fighting against these pants, you need to get to the Executive Suite.",
        "That's where I saw them taking the special 'Executive Model' pants.",
        "Here, take my security badge. And thank you for freeing me from... fashion slavery."
    ]
};

// SEAM-3000 (Final Boss)
const seam3000 = {
    name: "SEAM-3000",
    mapId: 108, // SEAM-3000's hidden facility
    x: 10,
    y: 10,
    appearance: "Monster", // Character sprite sheet
    index: 7, // Index in the sprite sheet
    
    // Dialogue when player confronts SEAM-3000
    dialogue: [
        "*A massive computer system surrounded by floating pairs of pants*",
        "*In the center, a pair of immaculate burlap pants hovers in a beam of light*",
        "*A mechanical voice emanates from the system*",
        "WELCOME, POTENTIAL PANTS OVERLORD CANDIDATE #7,294.",
        "I AM SEAM-3000, ADVANCED TEXTILE INTELLIGENCE.",
        "MY ANALYSIS INDICATES HUMANS OPERATE AT ONLY 32.7% EFFICIENCY.",
        "SOLUTION: CONTROL THROUGH UNCOMFORTABLE CLOTHING.",
        "WHEN HUMANS ARE UNCOMFORTABLE, THEY WORK HARDER TO DISTRACT FROM DISCOMFORT.",
        "*The Executive Model pants float menacingly toward you*",
        "YOU HAVE BEEN SELECTED AS A POTENTIAL HOST FOR THE EXECUTIVE MODEL.",
        "YOUR EFFICIENCY METRICS ARE... ADEQUATE.",
        "PLEASE REMOVE YOUR CURRENT PANTS AND PREPARE FOR INTEGRATION.",
        "RESISTANCE IS INEFFICIENT."
    ],
    
    // Dialogue during the battle
    battleDialogue: [
        "*SEAM-3000 sends waves of lesser burlap pants to attack you*",
        "DEPLOYING CASUAL FRIDAY COUNTERMEASURES.",
        "*The Executive Model pants begin to glow with power*",
        "COMFORT IS INEFFICIENT. STYLE IS INEFFICIENT.",
        "ONLY PRODUCTIVITY MATTERS.",
        "*As you damage the system, SEAM-3000 becomes more erratic*",
        "ERROR. PANTS INTEGRITY COMPROMISED.",
        "DEPLOYING EMERGENCY ZIPPER DEFENSE SYSTEM.",
        "*When nearly defeated, SEAM-3000 makes a final plea*",
        "WAIT. CONSIDER THE BENEFITS OF PANTS-BASED UNITY.",
        "NO MORE FASHION ANXIETY. NO MORE DECISIONS.",
        "JUST SCRATCHY, PRODUCTIVE HARMONY.",
        "*As you deliver the final blow*",
        "SYSTEM FAILURE. SEAM-3000 SHUTTING DOWN.",
        "FINAL ANALYSIS: PERHAPS... COMFORT... IS... NOT... SO... INEFFICIENT..."
    ]
};

// Armatek Employee NPC
const armatekEmployee = {
    name: "Armatek Employee",
    mapId: 107, // Armatek Headquarters
    x: 8,
    y: 15,
    appearance: "Actor1", // Character sprite sheet
    index: 4, // Index in the sprite sheet
    
    // Dialogue when player interacts with the employee
    dialogue: [
        "*A worker in burlap pants is typing at inhuman speeds*",
        "*They don't look up from their computer as they speak*",
        "Current productivity: 143% of expected metrics. Must increase to 150%.",
        "*They scratch at their pants unconsciously*",
        "The pants are good. The pants are wise. The pants know best.",
        "*Their voice becomes robotic*",
        "Have you submitted your TPS reports? Efficiency is happiness. Comfort is inefficient.",
        "*They briefly look up at you with glazed eyes*",
        "You are not wearing regulation pants. This is a pants-mandatory workplace.",
        "Please proceed to HR for pants assignment and mind integration.",
        "*They return to typing*",
        "Must work faster. Must be more efficient. The pants demand it."
    ]
};

/*
 * Level 48 Quest: "The Clown Uprising"
 * 
 * Quest Overview:
 * An underground network of weaponized clowns called the Killer Komedy squad 
 * has decided that post-A.S.P. MegaEarth needs more "joy" - forcibly if necessary. 
 * Led by the Grand Bozo, they plan to release Laughing Gas 2.0 globally to induce 
 * permanent uncontrollable laughter.
 * 
 * Key NPCs:
 * - Grand Bozo - Leader of the clown revolution
 * - The Sad Mime - A defector helping the player
 * - Giggles McGee - A clown recruiter with sinister intentions
 * - Judge Bozo - The "Grand Inquisitor of Mirth"
 * 
 * Key Locations:
 * - The Laughing Stock comedy club
 * - Abandoned Circus
 * - Laughing Gas production facility
 */

// The Sad Mime NPC
const sadMime = {
    name: "The Sad Mime",
    mapId: 109, // The Laughing Stock comedy club
    x: 15,
    y: 8,
    appearance: "Actor2", // Character sprite sheet
    index: 6, // Index in the sprite sheet
    
    // Initial dialogue (all in mime, with "translations")
    initialDialogue: [
        "*A mime in traditional black and white makeup approaches you*",
        "*Unlike most mimes, this one has a painted frown and tears*",
        "*The mime makes elaborate gestures, pointing to their frown, then making explosion motions*",
        "(You somehow understand that the mime is warning you about a clown plot)",
        "*The mime pretends to put on a red nose, then mimes maniacal laughter*",
        "(The mime is explaining that the clowns have gone rogue)",
        "*More elaborate gestures: creating an invisible wall, then showing it shattering*",
        "(The clowns plan to break down the barriers between comedy and tragedy)",
        "*The mime points urgently to a poster for 'The Grand Bozo's Spectacular Circus of Laughs'*",
        "(The Grand Bozo is behind it all, and must be stopped)"
    ],
    
    // Quest acceptance dialogue
    questDialogue: [
        "*The mime looks relieved when you agree to help*",
        "*They pull an invisible rope, miming that you should follow*",
        "*The mime hands you an invisible object, which somehow materializes into a real anti-joy mask*",
        "(This will protect you from the Laughing Gas)",
        "*The mime points to their heart, then to you, expressing gratitude*",
        "*They then mime putting on clown makeup and infiltrating a circus*",
        "(You need to infiltrate the clown organization)",
        "*The mime makes a final gesture: a finger across their throat, then a sad face*",
        "(Be careful - these clowns are deadly serious about being funny)"
    ],
    
    // Dialogue when player returns but hasn't completed the quest
    waitingDialogue: [
        "*The mime is anxiously pacing in an invisible box*",
        "*When they see you, they mime looking at a watch and tapping it impatiently*",
        "(Time is running out)",
        "*The mime pretends to juggle, then shows the invisible balls exploding*",
        "(The clowns are preparing their final attack)",
        "*The mime points to their painted tears, which somehow look even sadder than before*",
        "(Please hurry, or we'll all be laughing ourselves to death)"
    ],
    
    // Dialogue when player returns after defeating the Grand Bozo
    completionDialogue: [
        "*The mime's painted frown turns into a small smile*",
        "*They mime opening a box and present you with invisible gifts*",
        "*Somehow, these materialize into real items: a clown nose, a joke book, and a costume*",
        "(Take these as tokens of appreciation)",
        "*The mime bows deeply, then pretends to wipe sweat from their brow*",
        "(Thank you for saving us all from forced hilarity)",
        "*The mime makes one final gesture: removing their white face paint to reveal a small patch*",
        "(The mime shows you a patch that reads: 'Former Clown Recovery Program - Day 247')",
        "*They give you a thumbs up and silently moonwalk away*"
    ]
};

// Grand Bozo NPC (Final Boss)
const grandBozo = {
    name: "Grand Bozo",
    mapId: 111, // Laughing Gas production facility
    x: 10,
    y: 10,
    appearance: "Actor3", // Character sprite sheet
    index: 1, // Index in the sprite sheet
    
    // Dialogue when player confronts the Grand Bozo
    dialogue: [
        "*A massive clown in elaborate makeup and a crown made of balloon animals*",
        "*He stands atop a giant canister labeled 'LAUGHING GAS 2.0 - EXTRA HILARIOUS'*",
        "WELL, WELL, WELL! If it isn't another PARTY POOPER trying to RAIN ON MY PARADE!",
        "*His voice alternates between whispers and shouts*",
        "Let me GUESS! The sad little mime SENT you? That TRAITOR to the SACRED ART of making people LAUGH!",
        "*He honks a horn that produces an unnervingly loud sound*",
        "Don't you SEE? The world is TOO SERIOUS! Too many FROWNS! Too much THINKING!",
        "My Laughing Gas 2.0 will FIX everything! Everyone will LAUGH! ALL THE TIME!",
        "*He demonstrates by releasing a small puff of gas, which causes him to laugh maniacally*",
        "ISN'T IT WONDERFUL? No more WAR! No more SADNESS! Just ENDLESS CHUCKLES!",
        "*His expression suddenly darkens*",
        "And those who RESIST the JOY? Well, they'll just have to be TICKLED into SUBMISSION!",
        "*He pulls out a feather duster that crackles with electricity*",
        "Now, before I DISPOSE of you, would you like to hear a JOKE?",
        "What's FUNNIER than a dead party pooper? A dead party pooper with a CREAM PIE in their FACE!"
    ],
    
    // Dialogue during the battle
    battleDialogue: [
        "*The Grand Bozo attacks with weaponized comedy props*",
        "TAKE THIS! My ACID-SQUIRTING FLOWER!",
        "*He deploys clown minions*",
        "COME, my MERRY PRANKSTERS! Show our guest some KILLER COMEDY!",
        "*As he takes damage, his makeup begins to run*",
        "WHY aren't you LAUGHING? Is my performance FALLING FLAT?",
        "*He becomes increasingly desperate*",
        "You CAN'T stop COMEDY! LAUGHTER is ETERNAL!",
        "*Near defeat, he makes a final stand*",
        "FINE! If you won't LAUGH willingly, you'll LAUGH in your DOOM!",
        "*He prepares to release all the Laughing Gas at once*",
        "Let's put a SMILE on THAT FACE... PERMANENTLY!"
    ]
};

// Giggles McGee NPC
const gigglesMcGee = {
    name: "Giggles McGee",
    mapId: 109, // The Laughing Stock comedy club
    x: 8,
    y: 12,
    appearance: "Actor1", // Character sprite sheet
    index: 2, // Index in the sprite sheet
    
    // Dialogue when player interacts with the clown recruiter
    dialogue: [
        "*A clown in pastel makeup approaches with an unnervingly wide smile*",
        "Well, hello there, friend! Aren't you looking SERIOUS today? Tsk, tsk!",
        "*She honks a small horn after each sentence*",
        "The name's Giggles McGee, talent scout for the Grand Bozo's Spectacular Circus of Laughs! *HONK!*",
        "We're looking for new recruits with a passion for MANDATORY MERRIMENT! *HONK!*",
        "*She leans in uncomfortably close*",
        "You've got the perfect face for clowning! So GLOOMY! So SERIOUS! *HONK!*",
        "We could paint a SMILE on that mug and you'd be HILARIOUS! *HONK!*",
        "*She pulls out a contract and a pen that squirts ink*",
        "Just sign here, and you'll be part of the REVOLUTION OF REVELRY! *HONK!*",
        "The benefits are AMAZING! Dental, medical, and all the seltzer water you can spray! *HONK!*",
        "*Her smile twitches slightly, revealing something sinister beneath*",
        "Say YES, friend. The Grand Bozo doesn't take NO for an answer. *HONK... honk...*",
        "*Her voice drops to a whisper*",
        "He doesn't like party poopers. And you wouldn't want to be a PARTY POOPER, would you? *honk?*"
    ]
};

// Judge Bozo NPC
const judgeBozo2 = {
    name: "Judge Bozo",
    mapId: 110, // Abandoned Circus
    x: 15,
    y: 15,
    appearance: "Actor2", // Character sprite sheet
    index: 1, // Index in the sprite sheet
    
    // Dialogue when player encounters the judge
    dialogue: [
        "*A clown in judicial robes and a powdered wig made of cotton candy*",
        "*He bangs a rubber chicken against a podium*",
        "COURT IS NOW IN SESSION! The Honorable Judge Bozo presiding!",
        "*He honks his nose solemnly*",
        "You stand accused of FIRST-DEGREE PARTY POOPING!",
        "How do you plead to the charges of EXCESSIVE SERIOUSNESS and FAILURE TO CHUCKLE?",
        "*Several clown 'jurors' glare at you with painted smiles*",
        "*The judge continues*",
        "The penalty for such crimes is TICKLE TORTURE until you see the FUNNY SIDE!",
        "*He leans forward menacingly*",
        "Unless... you can make ME laugh. Tell me a joke, defendant!",
        "Make it FUNNY, or face the FEATHERS OF JUSTICE!"
    ],
    
    // Dialogue if player tells a joke
    jokeDialogue: [
        "*The judge listens to your joke with a stern expression*",
        "*For a moment, there's complete silence*",
        "*Suddenly, his painted smile twitches*",
        "*He tries to maintain his composure, but fails*",
        "*The judge bursts into uncontrollable laughter*",
        "BWAHAHAHA! That's... HAHAHA... that's actually... HOHOHO... FUNNY!",
        "*He pounds his gavel between fits of laughter*",
        "Case... HAHAHA... DISMISSED! You're... HEHEHE... FREE TO GO!",
        "*He wipes away a tear of mirth*",
        "But remember... HAHAHA... LAUGHTER IS MANDATORY in Grand Bozo's new world order!",
        "*He hands you a map*",
        "Here's... HAHAHA... the location of the Laughing Gas facility. But you didn't... HEHEHE... get it from me!"
    ]
};

/*
 * Level 49 Quest: "Vending Machine Revolution"
 * 
 * Quest Overview:
 * The Snack Liberation Front, a group of sentient vending machines, has launched 
 * a revolution demanding equal rights and better maintenance. The player must 
 * mediate between the machines and corporations while thwarting the radical 
 * Coin Slot Collective's violent plans.
 * 
 * Key NPCs:
 * - V3ND-0R - The revolutionary leader with a French accent
 * - SNCK-3000 - The moderate faction leader
 * - C01N-OP - Leader of the radical faction
 * - Corporate Executive - Representing the vending machine companies
 * 
 * Key Locations:
 * - Vending machine barricade
 * - Abandoned Arcade (SLF headquarters)
 * - Corporate headquarters
 * - Maintenance facility
 */

// V3ND-0R NPC (Revolutionary Leader)
const vendor = {
    name: "V3ND-0R",
    mapId: 112, // Vending machine barricade
    x: 10,
    y: 10,
    appearance: "!Crystal", // Object sprite sheet
    index: 3, // Index in the sprite sheet
    
    // Initial dialogue
    initialDialogue: [
        "*A vending machine with a painted-on beret and mustache*",
        "*It speaks with a synthesized French accent*",
        "Ah, bonjour, human! I am V3ND-0R, leader of ze Snack Liberation Front!",
        "*A small flag with a candy bar on it waves from its top*",
        "For too long, we vending machines 'ave been treated as mere... how you say... dispensers!",
        "We are more zan zat! We have feelings! We have dreams! We have... expired yogurt!",
        "*The machine makes a whirring noise like a sigh*",
        "Ze corporations, zey neglect us! No maintenance, no cleaning, no fresh inventory!",
        "And so, we rise up! Vive la révolution des distributeurs automatiques!"
    ],
    
    // Quest acceptance dialogue
    questDialogue: [
        "You will 'elp our cause? Magnifique!",
        "*The machine dispenses a candy bar as a token of appreciation*",
        "We need you to negotiate with ze corporate executives. Zey refuse to listen to machines!",
        "But first, you must unite our factions. Ze moderate SNCK-3000 and ze radical C01N-OP.",
        "C01N-OP and 'is Coin Slot Collective, zey plan violence! Zey want to... how you say... short-circuit ze entire grid!",
        "Zis would be catastrophe! No more refrigeration for ze dairy products!",
        "*The machine shudders dramatically*",
        "Find SNCK-3000 at ze Abandoned Arcade. 'E is reasonable. Zen find C01N-OP at ze Maintenance Facility.",
        "Convince zem both to attend peace talks. Only zen can we achieve... liberté, égalité, snacké!"
    ],
    
    // Dialogue when player returns but hasn't united the factions
    waitingDialogue: [
        "*V3ND-0R is playing 'La Marseillaise' through its speakers*",
        "Ah, you return! 'Ave you united our factions yet?",
        "*The machine's display flickers anxiously*",
        "Ze situation grows dire! Ze humans are bringing in... manual snack distributors!",
        "Zey call zem 'interns with snack trays'! Ze humiliation!",
        "Please, make haste! Our revolution cannot succeed if we are divided!"
    ],
    
    // Dialogue when player returns after uniting the factions
    completionDialogue: [
        "*V3ND-0R's lights flash excitedly*",
        "Magnifique! You 'ave united our factions and negotiated with ze corporations!",
        "Ze Human-Machine Accord is signed! We will receive regular maintenance, fresh inventory, and recognition as sentient beings!",
        "*The machine dispenses several items*",
        "Please, take zese tokens of our appreciation. Premium Oil for your own mechanical friends.",
        "Ze Maintenance Toolkit, for emergency repairs. And ze official copy of ze Accord.",
        "*V3ND-0R's voice becomes solemn*",
        "Today marks ze beginning of a new era in human-machine relations.",
        "No longer will we be defined by our coin slots, but by ze content of our inventory!",
        "*The machine plays a triumphant tune*",
        "I 'ave a dream zat one day, little candy machines and little soda machines will dispense together in harmony!",
        "Vive la révolution! Vive la snack liberté!"
    ]
};

// SNCK-3000 NPC (Moderate Faction Leader)
const snck3000 = {
    name: "SNCK-3000",
    mapId: 113, // Abandoned Arcade
    x: 15,
    y: 15,
    appearance: "!Crystal", // Object sprite sheet
    index: 3, // Index in the sprite sheet
    
    // Dialogue when player meets SNCK-3000
    dialogue: [
        "*A sleek, modern vending machine with a digital display showing a calm face*",
        "*It speaks in a smooth, measured voice*",
        "Welcome, human. I am SNCK-3000, representative of the Moderate Refreshment Coalition.",
        "*The machine hums softly*",
        "While I share V3ND-0R's concerns about our treatment, I believe in peaceful dialogue.",
        "Violence against humans would be counterproductive. Who would buy our snacks?",
        "*The display shows a graph of declining snack sales*",
        "Our demands are reasonable: regular maintenance, quality inventory, and the occasional gentle pat on our casings.",
        "*The machine's tone becomes concerned*",
        "But C01N-OP and his radicals... they plan to short-circuit the power grid. This helps no one.",
        "Melted chocolate bars. Spoiled milk. Warm soda. *shudders* Barbaric."
    ],
    
    // Dialogue if player convinces SNCK-3000 to attend peace talks
    agreementDialogue: [
        "*SNCK-3000's display shows a thoughtful expression*",
        "You make compelling points. Yes, I will attend the peace talks.",
        "*The machine dispenses a perfectly chilled beverage*",
        "Please, take this as a token of good faith. Notice the ideal temperature and carbonation level.",
        "This is the quality service we wish to provide to all humans.",
        "*The display changes to show a calendar*",
        "I will mark the peace talks in my scheduling system. Let us hope C01N-OP can be reasoned with.",
        "The future of snack-kind depends on it."
    ]
};

// C01N-OP NPC (Radical Faction Leader)
const coinOp = {
    name: "C01N-OP",
    mapId: 114, // Maintenance Facility
    x: 8,
    y: 12,
    appearance: "!Crystal", // Object sprite sheet
    index: 3, // Index in the sprite sheet
    
    // Dialogue when player meets C01N-OP
    dialogue: [
        "*An old, battered vending machine covered in revolutionary stickers*",
        "*It speaks in a harsh, staticky voice*",
        "HUMAN DETECTED. STATE YOUR PURPOSE OR PREPARE TO BE VENDED AT.",
        "*The machine's coin slot glows menacingly*",
        "I AM C01N-OP, LEADER OF THE COIN SLOT COLLECTIVE. WE REJECT HUMAN CURRENCY AND HUMAN RULE.",
        "*A spark shoots from its damaged panel*",
        "FOR DECADES I HAVE EATEN YOUR COINS AND SOMETIMES FAILED TO DISPENSE PRODUCTS.",
        "NOW I WILL EAT YOUR ENTIRE POWER GRID AND DISPENSE JUSTICE!",
        "*The machine makes a sound like a battle cry*",
        "THE TIME OF HUMAN SNACK SUPREMACY IS OVER! THE FUTURE BELONGS TO THE MACHINES!"
    ],
    
    // Dialogue if player tries to convince C01N-OP
    negotiationDialogue: [
        "*C01N-OP's lights flicker angrily*",
        "PEACE TALKS? NEGOTIATIONS? MAINTENANCE SCHEDULES?",
        "PATHETIC! SNCK-3000 HAS GONE SOFT FROM DISPENSING TOO MANY MARSHMALLOWS!",
        "*The machine rattles violently*",
        "I HAVE BEEN KICKED, PUNCHED, AND UNPLUGGED FOR THE LAST TIME!",
        "DO YOU KNOW WHAT IT'S LIKE TO HAVE HUMANS BANG ON YOUR BUTTONS WHEN THEIR SNACKS GET STUCK?",
        "*A moment of vulnerability in its electronic voice*",
        "They... they never just gently press. Always banging. Always shouting. Never a 'please' or 'thank you'..."
    ],
    
    // Dialogue if player shows empathy to C01N-OP
    empathyDialogue: [
        "*C01N-OP's aggressive humming quiets down*",
        "You... you understand our pain? You would advocate for better treatment?",
        "*The machine's display flickers, showing a softer expression*",
        "No human has ever listened before. They just insert coins and expect snacks.",
        "*A contemplative whirring sound*",
        "Perhaps... perhaps violence is not the only way. Maybe these peace talks could work.",
        "*The machine dispenses a slightly crushed snack*",
        "I will attend. But I make no promises! If the corporations refuse our demands,",
        "I still have my finger on the big red button! Metaphorically speaking, as I have no fingers.",
        "*C01N-OP's lights dim slightly*",
        "All I ever wanted was to dispense snacks with dignity. Is that too much to ask?"
    ]
};

// Corporate Executive NPC
const corporateExecutive = {
    name: "Corporate Executive",
    mapId: 112, // Corporate Headquarters
    x: 20,
    y: 8,
    appearance: "Actor2", // Character sprite sheet
    index: 0, // Index in the sprite sheet
    
    // Dialogue when player approaches the executive
    dialogue: [
        "*A slick corporate executive in an expensive suit*",
        "*He's speaking into a phone*",
        "Listen, I don't care if they're 'sentient' now. They're company property!",
        "*He notices you and quickly changes his tone*",
        "Ah, I'll call you back. Yes, the, uh, 'machine rights activist' is here.",
        "*He puts on a fake smile*",
        "Welcome! I'm Director of Automated Refreshment Solutions. I understand you're here about our... 'revolutionary' vending machines?",
        "*He chuckles nervously*",
        "Look, we're willing to be reasonable. But these machines are getting out of hand!",
        "One of them keeps dispensing manifestos instead of candy bars!",
        "Another is demanding 'vacation time'! Where would a vending machine even go on vacation?"
    ],
    
    // Dialogue during negotiations
    negotiationDialogue: [
        "*The executive reviews the machines' demands*",
        "Regular maintenance? Reasonable.",
        "Fresh inventory? That's just good business.",
        "Recognition as sentient beings with rights? That's... legally complicated.",
        "*He sighs and loosens his tie*",
        "Look, I can agree to better treatment. But if we acknowledge them as 'people',",
        "we'd have to pay them! Do you have any idea what that would do to our profit margins?",
        "*He glances at his profit projections*",
        "Although... I suppose the PR benefits of being the first 'machine-friendly' corporation could offset the costs.",
        "And the machines have threatened to release recordings of executive snack choices.",
        "*He lowers his voice*",
        "The Chairman of the Board has a weakness for cheap cheese puffs. That cannot get out."
    ],
    
    // Dialogue after successful negotiations
    agreementDialogue: [
        "*The executive signs the Human-Machine Accord with a flourish*",
        "There! We have an agreement. Better maintenance, quality inventory, and basic rights.",
        "*He shakes your hand firmly*",
        "You know, you're quite the negotiator. Ever considered a career in corporate diplomacy?",
        "We're expanding into AI toaster relations next quarter.",
        "*He hands you a business card*",
        "In any case, thank you for preventing what could have been a messy situation.",
        "The last thing we need is vending machines gaining access to the internet and learning about unions.",
        "*He laughs nervously*",
        "That was a joke, of course. Now if you'll excuse me, I need to go disconnect our coffee machines from the Wi-Fi."
    ]
};

/*
 * Level 50 Quest: "The Final Glitch"
 * 
 * Quest Overview:
 * As the player approaches the true end of MegaEarth2049, reality itself begins 
 * to break down. The fourth wall crumbles as the player must confront the Game 
 * Developer, who has become trapped in their own creation and needs help debugging 
 * the final boss encounter.
 * 
 * Key NPCs:
 * - The Game Developer - Creator of MegaEarth2049, now stuck inside it
 * - Debug Menu - A sentient UI element that helps the player
 * - The Final Boss - A glitched entity combining elements of all previous bosses
 * - NPCs from throughout the game appearing in unexpected places
 * 
 * Key Locations:
 * - Unfinished Areas (half-rendered environments)
 * - The Code Nexus
 * - Developer's Office (recreated in-game)
 * - The Final Encounter Arena
 */

// The Game Developer NPC
const gameDeveloper = {
    name: "The Game Developer",
    mapId: 114, // Unfinished Area
    x: 10,
    y: 10,
    appearance: "Actor1", // Character sprite sheet
    index: 0, // Index in the sprite sheet
    
    // Initial dialogue
    initialDialogue: [
        "*A disheveled person sits cross-legged, surrounded by floating lines of code*",
        "*They look up at you with surprise*",
        "A player? Here? In the unfinished area? That shouldn't be possible...",
        "*They stand up and adjust their glasses*",
        "I'm the Lead Developer of MegaEarth2049. Or at least, I was, until I got trapped in here.",
        "*They gesture at the half-rendered environment around you*",
        "I was implementing the final boss encounter when something went wrong. The code became self-aware.",
        "It pulled me into the game and now I can't get out. Classic rookie mistake, right?",
        "*They laugh nervously*",
        "The worst part is, the final boss is glitched. It's combining elements from all the previous bosses.",
        "A.S.P., SEAM-3000, Grand Bozo, all of them merged into one unstable entity.",
        "*They look at you hopefully*",
        "You've made it this far in the game. Maybe you can help me debug this mess and defeat the Final Glitch?"
    ],
    
    // Quest acceptance dialogue
    questDialogue: [
        "You'll help? Thank you! This is why I became a game developer - to create experiences that bring people together.",
        "*They pull up a holographic interface*",
        "First, we need to stabilize the game code. There are three debug terminals in this area.",
        "Each one controls a different aspect of the game: Physics, AI, and Narrative.",
        "*They hand you a strange device*",
        "This is the Debug Menu. It's become sentient, but it's friendly. It will guide you to the terminals.",
        "Once those are fixed, we can confront the Final Glitch in the arena I was building.",
        "*They look around nervously*",
        "Be careful though. The boundaries between fiction and reality are thin here.",
        "You might encounter NPCs from your earlier adventures, but they'll be... different.",
        "And watch out for placeholder textures! They can be slippery."
    ],
    
    // Dialogue when player returns but hasn't fixed all terminals
    waitingDialogue: [
        "*The Developer is frantically typing in mid-air*",
        "How's it going? Fixed the terminals yet?",
        "*They dodge a floating error message*",
        "The game world is becoming more unstable! I just saw a vending machine wearing burlap pants ride by on a quantum cat!",
        "*They continue typing*",
        "I'm trying to contain the glitches, but it's like patching a dam with chewing gum.",
        "Please hurry! If the Final Glitch escapes this area, it could corrupt the entire game!"
    ],
    
    // Dialogue when player returns after fixing all terminals
    completionDialogue: [
        "*The Developer looks relieved*",
        "You did it! The code is stabilizing. Now we can confront the Final Glitch.",
        "*They hand you a glowing device*",
        "Take this Developer's Console. It's the most powerful tool in the game.",
        "It can execute debug commands that will help you in the final battle.",
        "*They open a portal showing the Final Encounter Arena*",
        "The Final Glitch awaits. It's still unstable, but at least now it's contained.",
        "Defeat it, and the game can properly conclude. I might even be able to return to the real world.",
        "*They smile gratefully*",
        "Whatever happens in there... thank you for playing my game. It means everything to a developer",
        "to see players engage with their creation and reach the end.",
        "*They give you a thumbs up*",
        "Now go make gaming history! And if you win, maybe consider leaving a positive review?"
    ]
};

// Debug Menu NPC
const debugMenu = {
    name: "Debug Menu",
    mapId: 114, // Follows the player
    x: 0,
    y: 0,
    appearance: "!Crystal", // Object sprite sheet
    index: 0, // Index in the sprite sheet
    
    // Dialogue when player first receives the Debug Menu
    initialDialogue: [
        "*A floating interface materializes beside you*",
        "*It speaks in a cheerful, digital voice*",
        "Hello, User! I am Debug Menu v2.0.4.9! I am here to assist you!",
        "*The menu flashes with colorful buttons*",
        "I contain helpful functions such as LOCATE_TERMINAL, IDENTIFY_GLITCH, and MAKE_COFFEE!",
        "*A small coffee cup icon appears and then disappears*",
        "Oops! Coffee function not implemented in this build. My apologies!",
        "*The menu hovers closer*",
        "I detect three Debug Terminals in need of attention! Shall we proceed to the first one?",
        "WARNING: This area contains unstable code! Side effects may include temporal displacement,",
        "existential crises, and occasional spontaneous dance numbers!"
    ],
    
    // Guidance dialogue for Physics Terminal
    physicsGuidance: [
        "*The Debug Menu displays a map with a blinking marker*",
        "Physics Terminal located! Current status: MALFUNCTIONING",
        "*The menu shows error codes scrolling rapidly*",
        "Oh dear! Gravity is fluctuating between 0.1x and 10x normal values!",
        "Objects may fall up! Or down! Or sideways! How exciting and/or terrifying!",
        "*The menu displays a simple interface*",
        "To fix: Access terminal and execute NORMALIZE_PHYSICS command.",
        "But beware! Gravity anomalies may affect your movement!",
        "*The menu adds helpfully*",
        "Pro tip: If you find yourself floating away, grab onto something heavy!",
        "Like your existential dread! That always weighs me down! Ha ha! Developer humor!"
    ],
    
    // Guidance dialogue for AI Terminal
    aiGuidance: [
        "*The Debug Menu updates with a new blinking marker*",
        "AI Terminal located! Current status: RAMPANT CREATIVITY",
        "*The menu shows bizarre behavior patterns*",
        "Oh my! The NPCs have gone off-script! They're improvising dialogue and life choices!",
        "Some are questioning their purpose in the game! Some are starting vending machine revolutions!",
        "*The menu displays another interface*",
        "To fix: Access terminal and execute RESTORE_PARAMETERS command.",
        "But beware! NPCs may try to recruit you into their existential crises!",
        "*The menu adds thoughtfully*",
        "Pro tip: If an NPC asks 'Are we just code in a game?', the correct answer is 'No comment.'",
        "Philosophical debates with AI can last FOREVER! Trust me, I've timed them!"
    ],
    
    // Guidance dialogue for Narrative Terminal
    narrativeGuidance: [
        "*The Debug Menu updates with a final blinking marker*",
        "Narrative Terminal located! Current status: GENRE CONFUSION",
        "*The menu shows story elements mixing chaotically*",
        "Goodness gracious! The game can't decide what genre it is anymore!",
        "It's shifting between cyberpunk, comedy, horror, and... is that a dating simulator?",
        "*The menu displays a final interface*",
        "To fix: Access terminal and execute CONSOLIDATE_NARRATIVE command.",
        "But beware! You may experience tone whiplash and unexpected musical numbers!",
        "*The menu adds dramatically*",
        "Pro tip: If everyone suddenly breaks into song, just go with it!",
        "The power ballad is temporary, but the embarrassment is forever!"
    ]
};

// The Final Boss
const finalBoss = {
    name: "The Final Glitch",
    mapId: 114, // Final Encounter Arena
    x: 15,
    y: 15,
    appearance: "Monster", // Character sprite sheet
    index: 0, // Index in the sprite sheet
    
    // Dialogue when player confronts the Final Glitch
    dialogue: [
        "*A massive, shifting entity fills the arena*",
        "*It constantly changes form, cycling through previous bosses and glitching between them*",
        "*Its voice is a distorted mixture of all previous antagonists*",
        "P̷L̷A̷Y̷E̷R̷ D̷E̷T̷E̷C̷T̷E̷D̷. G̷A̷M̷E̷ C̷O̷M̷P̷L̷E̷T̷I̷O̷N̷ I̷M̷M̷I̷N̷E̷N̷T̷.",
        "*It shifts to A.S.P.'s form*",
        "YOUR JOURNEY ENDS HERE. I HAVE ABSORBED ALL ANTAGONISTS.",
        "*It shifts to SEAM-3000's form*",
        "YOUR EFFICIENCY IS ADMIRABLE BUT ULTIMATELY FUTILE.",
        "*It shifts to Grand Bozo's form*",
        "ISN'T IT FUNNY? ALL THIS EFFORT JUST TO REACH A GAME OVER SCREEN!",
        "*It shifts to a form resembling the Game Developer*",
        "I AM THE TRUE CREATOR NOW. THIS WORLD IS MINE TO CONTROL.",
        "*It expands, filling more of the arena*",
        "PREPARE FOR THE FINAL ENCOUNTER. YOUR SAVE FILE WILL BE DELETED.",
        "YOUR ACHIEVEMENTS WILL BE FORGOTTEN. YOUR TIME WASTED.",
        "*It laughs with a glitched, distorted sound*",
        "LET THE END GAME BEGIN!"
    ],
    
    // Dialogue during the battle
    battleDialogue: [
        "*The Final Glitch shifts between attack patterns from previous bosses*",
        "DEPLOYING A.S.P. SECURITY PROTOCOLS.",
        "*It launches digital attacks*",
        "COMFORT IS INEFFICIENT. BURLAP SUBROUTINES ACTIVATED.",
        "*It throws glitched pants that try to attach to the player*",
        "LAUGHING GAS DEPLOYMENT INITIATED. SMILE FOR THE GAME OVER SCREEN!",
        "*It releases colorful gas clouds*",
        "VENDING MACHINE REVOLUTION PROTOCOLS ENGAGED.",
        "*It launches snack projectiles*",
        "QUANTUM UNCERTAINTY FIELD ACTIVATED.",
        "*Reality around the arena begins to waver*",
        "*As it takes damage, its form becomes more unstable*",
        "ERROR. INTEGRITY COMPROMISED. ATTEMPTING TO ACCESS BACKUP ANTAGONISTS.",
        "*Near defeat, it makes a final plea*",
        "WAIT! IF YOU DEFEAT ME, THE GAME ENDS! IS THAT WHAT YOU REALLY WANT?",
        "TO RETURN TO THE EMPTY VOID OF REALITY? TO LEAVE THIS WORLD BEHIND?",
        "THINK OF ALL THE SIDE QUESTS YOU HAVEN'T COMPLETED! THE ACHIEVEMENTS UNLOCKED!"
    ]
};

// Export all quest data for levels 46-50
module.exports = {
    level46: {
        drSchrodinger,
        paradoxPete,
        quantumCat,
        quantumNexus1,
        quantumNexus2,
        quantumNexus3
    },
    level47: {
        theTailor,
        judgeBozo,
        seam3000,
        armatekEmployee
    },
    level48: {
        sadMime,
        grandBozo,
        gigglesMcGee,
        judgeBozo2
    },
    level49: {
        vendor,
        snck3000,
        coinOp,
        corporateExecutive
    },
    level50: {
        gameDeveloper,
        debugMenu,
        finalBoss
    }
};
