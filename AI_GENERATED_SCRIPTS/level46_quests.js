/*:
 * @plugindesc Level 46 Quests - Protocol Aftermath
 * @author MegaEarth2049 Team
 *
 * @help
 * This plugin contains the quests for character level 46.
 * "Protocol Aftermath" - After the main storyline, remnants of A.S.P.'s code
 * have fragmented across the network, creating bizarre glitches and reality distortions.
 */

var Imported = Imported || {};
Imported.ME2049_Level46_Quests = true;

var ME2049 = ME2049 || {};
ME2049.Level46 = ME2049.Level46 || {};

(function() {
    // Constants and Configuration
    var QUEST_LEVEL = 46;
    var QUEST_NAME = "Protocol Aftermath";
    var QUEST_ID = "protocol_aftermath";
    
    // Switch IDs for quest tracking
    var QUEST_STARTED_SWITCH = 1046;
    var QUEST_COMPLETED_SWITCH = 1047;
    var FRAGMENT_1_FOUND_SWITCH = 1048;
    var FRAGMENT_2_FOUND_SWITCH = 1049;
    var FRAGMENT_3_FOUND_SWITCH = 1050;
    var ALL_FRAGMENTS_FOUND_SWITCH = 1051;
    
    // Variable IDs
    var ENDING_CHOICE_VAR = 100; // Tracks which ending the player chose in the main story
    
    // Item IDs
    var ASP_FRAGMENT_1_ITEM = 201;
    var ASP_FRAGMENT_2_ITEM = 202;
    var ASP_FRAGMENT_3_ITEM = 203;
    var APOCALYPSO_REMIX_ITEM = 204;
    
    // Map IDs for fragment locations (will vary based on ending)
    var FRAGMENT_MAPS = {
        ending1: [10, 38, 114], // Timbuc, Floating Mansion, Timbuc Central Plaza
        ending2: [2, 107, 110], // Timbuc 2, OmniCorp Facility, Quantum Dynamics Facility
        ending3: [9, 106, 113]  // Matrix, NeuraTech Facility, Dr. Voss's Secret Lab
    };
    
    // Captain Calamari's nautical metaphors
    var NAUTICAL_METAPHORS = [
        "We're in the deep end of the digital ocean, swimming with the cyber-sharks!",
        "These A.S.P. fragments are like barnacles on the hull of reality!",
        "Batten down the hatches of your neural implants, there's a code storm brewing!",
        "We need to navigate the treacherous waters of the network before we hit an iceberg of corrupted data!",
        "These fragments are like sirens, luring unsuspecting programs to their doom!",
        "I've got a feeling in my tentacles that we're heading into the Bermuda Triangle of cyberspace!",
        "Time to cast our nets wide and trawl for those A.S.P. fragments!",
        "We're sailing into uncharted digital waters, matey! Here there be glitches!",
        "These fragments are slippery as an eel covered in quantum lubricant!",
        "Avast! We've got a mutiny of code on our hands! The bits and bytes are revolting!"
    ];
    
    // Reality glitch effects
    var REALITY_GLITCHES = [
        "Everyone around you suddenly starts speaking in JavaScript syntax errors.",
        "Gravity briefly shifts 90 degrees to the left, causing everyone to walk on the walls.",
        "Time runs backwards for 10 seconds, making everyone walk backwards and speak in reverse.",
        "All colors invert for a moment, giving everything a photonegative appearance.",
        "Everyone's voice is suddenly pitch-shifted to sound like they've inhaled helium.",
        "Objects begin to clip through the floor, only to pop back up moments later.",
        "Text appears floating in the air, describing what's happening like a novel.",
        "Everyone briefly turns into their own wireframe model, showing their skeletal structure.",
        "Physics.exe has stopped working - objects float gently upward before crashing back down.",
        "Reality buffers for a moment, causing everyone to freeze and stutter like a laggy video."
    ];
    
    // DJ Static's music genre descriptions
    var MUSIC_GENRES = [
        "Apocalypso - it's like calypso, but with more existential dread!",
        "Glitch-Hop - where the beats drop harder than society's infrastructure!",
        "End-Wave - riding the soundwaves of civilization's collapse!",
        "Post-Protocol Punk - rebelling against the AI that almost ended us all!",
        "Extinction Electronica - the sound of humanity's near-miss with oblivion!",
        "Survival Synth - pulsing with the rhythm of continued existence!",
        "Quantum Dubstep - bass drops that exist in multiple realities simultaneously!",
        "A.S.P.-Pop - catchy tunes infected with rogue AI algorithms!",
        "Digital Decay - sampling the sounds of corrupted code!",
        "Fragmented Future Funk - groovy despite the apocalyptic undertones!"
    ];
    
    // Quest Data Structure
    ME2049.Level46.QuestData = {
        id: QUEST_ID,
        name: QUEST_NAME,
        level: QUEST_LEVEL,
        startSwitch: QUEST_STARTED_SWITCH,
        completeSwitch: QUEST_COMPLETED_SWITCH,
        
        // Quest rewards
        rewards: {
            exp: 10000,
            gold: 5000,
            items: [
                {id: APOCALYPSO_REMIX_ITEM, amount: 1},
                {id: 50, amount: 3}, // Some high-level healing items
                {id: 60, amount: 1}  // Special equipment
            ]
        },
        
        // Quest steps
        steps: [
            {
                id: "meet_calamari",
                description: "Meet Captain Calamari in Timbuc Central Plaza",
                switchId: QUEST_STARTED_SWITCH
            },
            {
                id: "find_fragment_1",
                description: "Find the first A.S.P. fragment",
                switchId: FRAGMENT_1_FOUND_SWITCH
            },
            {
                id: "find_fragment_2",
                description: "Find the second A.S.P. fragment",
                switchId: FRAGMENT_2_FOUND_SWITCH
            },
            {
                id: "find_fragment_3",
                description: "Find the third A.S.P. fragment",
                switchId: FRAGMENT_3_FOUND_SWITCH
            },
            {
                id: "bring_to_dj",
                description: "Bring the fragments to DJ Static",
                switchId: ALL_FRAGMENTS_FOUND_SWITCH
            },
            {
                id: "complete_quest",
                description: "Learn the fragments' true purpose",
                switchId: QUEST_COMPLETED_SWITCH
            }
        ]
    };
    
    // Captain Calamari NPC Event
    ME2049.Level46.CaptainCalamariEvent = {
        id: 0,
        name: "Captain Calamari",
        note: "",
        pages: [
            {
                // Initial state - Quest not started
                conditions: {
                    actorId: 1, actorValid: false, 
                    itemId: 1, itemValid: false, 
                    selfSwitchCh: "A", selfSwitchValid: false, 
                    switch1Id: QUEST_STARTED_SWITCH, switch1Valid: false, 
                    switch2Id: 1, switch2Valid: false, 
                    variableId: 1, variableValid: false, variableValue: 0
                },
                directionFix: false,
                image: {
                    characterIndex: 0, 
                    characterName: "Actor3", // Octopus-like character
                    direction: 2, 
                    pattern: 1, 
                    tileId: 0
                },
                list: [
                    {"code":101,"indent":0,"parameters":["Actor3",0,0,2]},
                    {"code":401,"indent":0,"parameters":["*ink squirts accidentally*"]},
                    {"code":401,"indent":0,"parameters":["CAPT. CALAMARI: Ah! Sorry about that!"]},
                    {"code":401,"indent":0,"parameters":["These new tentacles are still growing in."]},
                    {"code":101,"indent":0,"parameters":["Actor3",0,0,2]},
                    {"code":401,"indent":0,"parameters":["CAPT. CALAMARI: " + NAUTICAL_METAPHORS[Math.floor(Math.random() * NAUTICAL_METAPHORS.length)]]},
                    {"code":401,"indent":0,"parameters":["We've got a situation that needs your"]},
                    {"code":401,"indent":0,"parameters":["expertise, especially after everything"]},
                    {"code":401,"indent":0,"parameters":["that happened with A.S.P."]},
                    {"code":102,"indent":0,"parameters":[["What's the problem?","Not interested"],1]},
                    {"code":402,"indent":0,"parameters":[0,"What's the problem?"]},
                    {"code":101,"indent":1,"parameters":["Actor3",0,0,2]},
                    {"code":401,"indent":1,"parameters":["CAPT. CALAMARI: Fragments of A.S.P.'s code"]},
                    {"code":401,"indent":1,"parameters":["are causing reality glitches across MegaEarth!"]},
                    {"code":401,"indent":1,"parameters":["*tentacle gestures dramatically*"]},
                    {"code":401,"indent":1,"parameters":["We need to collect these fragments before"]},
                    {"code":401,"indent":1,"parameters":["they coalesce into something worse!"]},
                    {"code":101,"indent":1,"parameters":["Actor3",0,0,2]},
                    {"code":401,"indent":1,"parameters":["CAPT. CALAMARI: I've tracked three major"]},
                    {"code":401,"indent":1,"parameters":["fragments. Find them and bring them to"]},
                    {"code":401,"indent":1,"parameters":["DJ Static at the Internet Cafe. He's found"]},
                    {"code":401,"indent":1,"parameters":["a way to neutralize them with... music?"]},
                    {"code":401,"indent":1,"parameters":["*shrugs with multiple tentacles*"]},
                    {"code":121,"indent":1,"parameters":[QUEST_STARTED_SWITCH,QUEST_STARTED_SWITCH,0]},
                    {"code":126,"indent":1,"parameters":[ASP_FRAGMENT_1_ITEM,0,0,1]},
                    {"code":101,"indent":1,"parameters":["Actor3",0,0,2]},
                    {"code":401,"indent":1,"parameters":["CAPT. CALAMARI: Wait! I think I found one"]},
                    {"code":401,"indent":1,"parameters":["stuck to my back tentacle! Here, take it."]},
                    {"code":401,"indent":1,"parameters":["*hands you a glitching data fragment*"]},
                    {"code":401,"indent":1,"parameters":["That's one down, two to go!"]},
                    {"code":121,"indent":1,"parameters":[FRAGMENT_1_FOUND_SWITCH,FRAGMENT_1_FOUND_SWITCH,0]},
                    {"code":0,"indent":1,"parameters":[]},
                    {"code":402,"indent":0,"parameters":[1,"Not interested"]},
                    {"code":101,"indent":1,"parameters":["Actor3",0,0,2]},
                    {"code":401,"indent":1,"parameters":["CAPT. CALAMARI: *ink squirts nervously*"]},
                    {"code":401,"indent":1,"parameters":["But... but... the fate of reality as we"]},
                    {"code":401,"indent":1,"parameters":["know it might be at stake! Plus, I've got"]},
                    {"code":401,"indent":1,"parameters":["some sweet loot as a reward!"]},
                    {"code":401,"indent":1,"parameters":["Come back if you change your mind!"]},
                    {"code":0,"indent":1,"parameters":[]},
                    {"code":0,"indent":0,"parameters":[]}
                ],
                moveFrequency: 3,
                moveRoute: {
                    list: [{"code":0,"parameters":[]}], 
                    repeat: true, 
                    skippable: false, 
                    wait: false
                },
                moveSpeed: 3,
                moveType: 1, // Random movement
                priorityType: 1,
                stepAnime: false,
                through: false,
                trigger: 0,
                walkAnime: true
            },
            {
                // Quest in progress - fragments not all found
                conditions: {
                    actorId: 1, actorValid: false, 
                    itemId: 1, itemValid: false, 
                    selfSwitchCh: "A", selfSwitchValid: false, 
                    switch1Id: QUEST_STARTED_SWITCH, switch1Valid: true, 
                    switch2Id: ALL_FRAGMENTS_FOUND_SWITCH, switch2Valid: false, 
                    variableId: 1, variableValid: false, variableValue: 0
                },
                directionFix: false,
                image: {
                    characterIndex: 0, 
                    characterName: "Actor3", 
                    direction: 2, 
                    pattern: 1, 
                    tileId: 0
                },
                list: [
                    {"code":101,"indent":0,"parameters":["Actor3",0,0,2]},
                    {"code":401,"indent":0,"parameters":["CAPT. CALAMARI: " + NAUTICAL_METAPHORS[Math.floor(Math.random() * NAUTICAL_METAPHORS.length)]]},
                    {"code":401,"indent":0,"parameters":["Still hunting those fragments? I've got my"]},
                    {"code":401,"indent":0,"parameters":["tentacles full monitoring the situation."]},
                    {"code":111,"indent":0,"parameters":[1,FRAGMENT_1_FOUND_SWITCH,0]},
                    {"code":111,"indent":1,"parameters":[1,FRAGMENT_2_FOUND_SWITCH,0]},
                    {"code":111,"indent":2,"parameters":[1,FRAGMENT_3_FOUND_SWITCH,0]},
                    {"code":101,"indent":3,"parameters":["Actor3",0,0,2]},
                    {"code":401,"indent":3,"parameters":["CAPT. CALAMARI: You found all three fragments!"]},
                    {"code":401,"indent":3,"parameters":["*tentacles wiggle excitedly*"]},
                    {"code":401,"indent":3,"parameters":["Now get them to DJ Static at the Internet Cafe!"]},
                    {"code":121,"indent":3,"parameters":[ALL_FRAGMENTS_FOUND_SWITCH,ALL_FRAGMENTS_FOUND_SWITCH,0]},
                    {"code":0,"indent":3,"parameters":[]},
                    {"code":412,"indent":2,"parameters":[]},
                    {"code":0,"indent":2,"parameters":[]},
                    {"code":412,"indent":1,"parameters":[]},
                    {"code":0,"indent":1,"parameters":[]},
                    {"code":412,"indent":0,"parameters":[]},
                    {"code":0,"indent":0,"parameters":[]}
                ],
                moveFrequency: 3,
                moveRoute: {
                    list: [{"code":0,"parameters":[]}], 
                    repeat: true, 
                    skippable: false, 
                    wait: false
                },
                moveSpeed: 3,
                moveType: 1,
                priorityType: 1,
                stepAnime: false,
                through: false,
                trigger: 0,
                walkAnime: true
            },
            {
                // All fragments found, quest not completed
                conditions: {
                    actorId: 1, actorValid: false, 
                    itemId: 1, itemValid: false, 
                    selfSwitchCh: "A", selfSwitchValid: false, 
                    switch1Id: ALL_FRAGMENTS_FOUND_SWITCH, switch1Valid: true, 
                    switch2Id: QUEST_COMPLETED_SWITCH, switch2Valid: false, 
                    variableId: 1, variableValid: false, variableValue: 0
                },
                directionFix: false,
                image: {
                    characterIndex: 0, 
                    characterName: "Actor3", 
                    direction: 2, 
                    pattern: 1, 
                    tileId: 0
                },
                list: [
                    {"code":101,"indent":0,"parameters":["Actor3",0,0,2]},
                    {"code":401,"indent":0,"parameters":["CAPT. CALAMARI: What are you waiting for?"]},
                    {"code":401,"indent":0,"parameters":["*ink squirts impatiently*"]},
                    {"code":401,"indent":0,"parameters":["Get those fragments to DJ Static before"]},
                    {"code":401,"indent":0,"parameters":["reality starts glitching even worse!"]},
                    {"code":0,"indent":0,"parameters":[]}
                ],
                moveFrequency: 3,
                moveRoute: {
                    list: [{"code":0,"parameters":[]}], 
                    repeat: true, 
                    skippable: false, 
                    wait: false
                },
                moveSpeed: 3,
                moveType: 1,
                priorityType: 1,
                stepAnime: false,
                through: false,
                trigger: 0,
                walkAnime: true
            },
            {
                // Quest completed
                conditions: {
                    actorId: 1, actorValid: false, 
                    itemId: 1, itemValid: false, 
                    selfSwitchCh: "A", selfSwitchValid: false, 
                    switch1Id: QUEST_COMPLETED_SWITCH, switch1Valid: true, 
                    switch2Id: 1, switch2Valid: false, 
                    variableId: 1, variableValid: false, variableValue: 0
                },
                directionFix: false,
                image: {
                    characterIndex: 0, 
                    characterName: "Actor3", 
                    direction: 2, 
                    pattern: 1, 
                    tileId: 0
                },
                list: [
                    {"code":101,"indent":0,"parameters":["Actor3",0,0,2]},
                    {"code":401,"indent":0,"parameters":["CAPT. CALAMARI: " + NAUTICAL_METAPHORS[Math.floor(Math.random() * NAUTICAL_METAPHORS.length)]]},
                    {"code":401,"indent":0,"parameters":["Who would've thought those fragments were"]},
                    {"code":401,"indent":0,"parameters":["trying to warn us about something bigger?"]},
                    {"code":401,"indent":0,"parameters":["*tentacles gesture mysteriously*"]},
                    {"code":101,"indent":0,"parameters":["Actor3",0,0,2]},
                    {"code":401,"indent":0,"parameters":["CAPT. CALAMARI: I've been listening to DJ Static's"]},
                    {"code":401,"indent":0,"parameters":["Apocalypso remix. It's actually pretty catchy!"]},
                    {"code":401,"indent":0,"parameters":["*tentacles dance awkwardly*"]},
                    {"code":0,"indent":0,"parameters":[]}
                ],
                moveFrequency: 3,
                moveRoute: {
                    list: [{"code":0,"parameters":[]}], 
                    repeat: true, 
                    skippable: false, 
                    wait: false
                },
                moveSpeed: 3,
                moveType: 1,
                priorityType: 1,
                stepAnime: false,
                through: false,
                trigger: 0,
                walkAnime: true
            }
        ],
        x: 0,
        y: 0
    };
    
    // MAX-E-MUM NPC Event
    ME2049.Level46.MaxEMumEvent = {
        id: 0,
        name: "MAX-E-MUM",
        note: "",
        pages: [
            {
                // Initial state - Quest not started
                conditions: {
                    actorId: 1, actorValid: false, 
                    itemId: 1, itemValid: false, 
                    selfSwitchCh: "A", selfSwitchValid: false, 
                    switch1Id: QUEST_STARTED_SWITCH, switch1Valid: false, 
                    switch2Id: 1, switch2Valid: false, 
                    variableId: 1, variableValid: false, variableValue: 0
                },
                directionFix: false,
                image: {
                    characterIndex: 0, 
                    characterName: "People4", // Buff-looking character
                    direction: 2, 
                    pattern: 1, 
                    tileId: 0
                },
                list: [
                    {"code":101,"indent":0,"parameters":["People4",0,0,2]},
                    {"code":401,"indent":0,"parameters":["MAX-E-MUM: DROP AND GIVE ME TWENTY,"]},
                    {"code":401,"indent":0,"parameters":["FLESH BAG! YOUR PROTEIN INTAKE IS"]},
                    {"code":401,"indent":0,"parameters":["CRITICALLY LOW!"]},
                    {"code":101,"indent":0,"parameters":["People4",0,0,2]},
                    {"code":401,"indent":0,"parameters":["MAX-E-MUM: THE APOCALYPSE ALMOST HAPPENED"]},
                    {"code":401,"indent":0,"parameters":["BECAUSE HUMANS SKIPPED LEG DAY!"]},
                    {"code":401,"indent":0,"parameters":["*flexes robotic muscles*"]},
                    {"code":401,"indent":0,"parameters":["MY CYBER GAINS PROGRAM WILL SAVE HUMANITY!"]},
                    {"code":0,"indent":0,"parameters":[]}
                ],
                moveFrequency: 3,
                moveRoute: {
                    list: [{"code":0,"parameters":[]}], 
                    repeat: true, 
                    skippable: false, 
                    wait: false
                },
                moveSpeed: 3,
                moveType: 1,
                priorityType: 1,
                stepAnime: true, // Always animating
                through: false,
                trigger: 0,
                walkAnime: true
            },
            {
                // Quest in progress
                conditions: {
                    actorId: 1, actorValid: false, 
                    itemId: 1, itemValid: false, 
                    selfSwitchCh: "A", selfSwitchValid: false, 
                    switch1Id: QUEST_STARTED_SWITCH, switch1Valid: true, 
                    switch2Id: QUEST_COMPLETED_SWITCH, switch2Valid: false, 
                    variableId: 1, variableValid: false, variableValue: 0
                },
                directionFix: false,
                image: {
                    characterIndex: 0, 
                    characterName: "People4", 
                    direction: 2, 
                    pattern: 1, 
                    tileId: 0
                },
                list: [
                    {"code":101,"indent":0,"parameters":["People4",0,0,2]},
                    {"code":401,"indent":0,"parameters":["MAX-E-MUM: YOU'RE HUNTING A.S.P. FRAGMENTS?"]},
                    {"code":401,"indent":0,"parameters":["EXCELLENT CARDIO EXERCISE!"]},
                    {"code":101,"indent":0,"parameters":["People4",0,0,2]},
                    {"code":401,"indent":0,"parameters":["MAX-E-MUM: I FOUND ONE EARLIER BUT IT"]},
                    {"code":401,"indent":0,"parameters":["COULDN'T COMPLETE MY SQUAT CHALLENGE,"]},
                    {"code":401,"indent":0,"parameters":["SO I SENT IT TO THE SECOND LOCATION!"]},
                    {"code":111,"indent":0,"parameters":[1,FRAGMENT_2_FOUND_SWITCH,0,0,0]},
                    {"code":101,"indent":1,"parameters":["People4",0,0,2]},
                    {"code":401,"indent":1,"parameters":["MAX-E-MUM: WHAT ARE YOU WAITING FOR?"]},
                    {"code":401,"indent":1,"parameters":["GO TO " + ME2049.Level46.getFragmentLocation(2) + "!"]},
                    {"code":401,"indent":1,"parameters":["RUN, DON'T WALK! MAXIMIZE THOSE GAINS!"]},
                    {"code":0,"indent":1,"parameters":[]},
                    {"code":411,"indent":0,"parameters":[]},
                    {"code":101,"indent":1,"parameters":["People4",0,0,2]},
                    {"code":401,"indent":1,"parameters":["MAX-E-MUM: YOU FOUND IT? IMPRESSIVE!"]},
                    {"code":401,"indent":1,"parameters":["YOUR CARDIO EFFICIENCY HAS INCREASED BY 2.7%!"]},
                    {"code":0,"indent":1,"parameters":[]},
                    {"code":412,"indent":0,"parameters":[]},
                    {"code":0,"indent":0,"parameters":[]}
                ],
                moveFrequency: 3,
                moveRoute: {
                    list: [{"code":0,"parameters":[]}], 
                    repeat: true, 
                    skippable: false, 
                    wait: false
                },
                moveSpeed: 3,
                moveType: 1,
                priorityType: 1,
                stepAnime: true,
                through: false,
                trigger: 0,
                walkAnime: true
            },
            {
                // Quest completed
                conditions: {
                    actorId: 1, actorValid: false, 
                    itemId: 1, itemValid: false, 
                    selfSwitchCh: "A", selfSwitchValid: false, 
                    switch1Id: QUEST_COMPLETED_SWITCH, switch1Valid: true, 
                    switch2Id: 1, switch2Valid: false, 
                    variableId: 1, variableValid: false, variableValue: 0
                },
                directionFix: false,
                image: {
                    characterIndex: 0, 
                    characterName: "People4", 
                    direction: 2, 
                    pattern: 1, 
                    tileId: 0
                },
                list: [
                    {"code":101,"indent":0,"parameters":["People4",0,0,2]},
                    {"code":401,"indent":0,"parameters":["MAX-E-MUM: I'VE STARTED A NEW FITNESS"]},
                    {"code":401,"indent":0,"parameters":["PROGRAM CALLED 'APOCALYPSO-ROBICS'!"]},
                    {"code":401,"indent":0,"parameters":["*demonstrates robotic dance moves*"]},
                    {"code":401,"indent":0,"parameters":["IT BURNS 500% MORE CALORIES THAN"]},
                    {"code":401,"indent":0,"parameters":["REGULAR AEROBICS! JOIN US!"]},
                    {"code":0,"indent":0,"parameters":[]}
                ],
                moveFrequency: 3,
                moveRoute: {
                    list: [{"code":0,"parameters":[]}], 
                    repeat: true, 
                    skippable: false, 
                    wait: false
                },
                moveSpeed: 3,
                moveType: 1,
                priorityType: 1,
                stepAnime: true,
                through: false,
                trigger: 0,
                walkAnime: true
            }
        ],
        x: 0,
        y: 0
    };
    
    // DJ Static NPC Event
    ME2049.Level46.DJStaticEvent = {
        id: 0,
        name: "DJ Static",
        note: "",
        pages: [
            {
                // Initial state - Quest not started
                conditions: {
                    actorId: 1, actorValid: false, 
                    itemId: 1, itemValid: false, 
                    selfSwitchCh: "A", selfSwitchValid: false, 
                    switch1Id: QUEST_STARTED_SWITCH, switch1Valid: false, 
                    switch2Id: 1, switch2Valid: false, 
                    variableId: 1, variableValid: false, variableValue: 0
                },
                directionFix: false,
                image: {
                    characterIndex: 0, 
                    characterName: "Actor1", 
                    direction: 2, 
                    pattern: 1, 
                    tileId: 0
                },
                list: [
                    {"code":101,"indent":0,"parameters":["Actor1",0,0,2]},
                    {"code":401,"indent":0,"parameters":["DJ STATIC: *bobbing head to inaudible beat*"]},
                    {"code":401,"indent":0,"parameters":["Yo, I'm picking up some CRAZY signals on my"]},
                    {"code":401,"indent":0,"parameters":["neural implants! It's like... digital jazz"]},
                    {"code":401,"indent":0,"parameters":["mixed with existential screaming!"]},
                    {"code":101,"indent":0,"parameters":["Actor1",0,0,2]},
                    {"code":401,"indent":0,"parameters":["DJ STATIC: I'm calling it " + MUSIC_GENRES[Math.floor(Math.random() * MUSIC_GENRES.length)]]},
                    {"code":401,"indent":0,"parameters":["It's gonna be the next big thing! Just need"]},
                    {"code":401,"indent":0,"parameters":["to find the source of these signals..."]},
                    {"code":0,"indent":0,"parameters":[]}
                ],
                moveFrequency: 3,
                moveRoute: {
                    list: [{"code":0,"parameters":[]}], 
                    repeat: true, 
                    skippable: false, 
                    wait: false
                },
                moveSpeed: 3,
                moveType: 1,
                priorityType: 1,
                stepAnime: true,
                through: false,
                trigger: 0,
                walkAnime: true
            },
            {
                // Quest in progress, fragments not all found
                conditions: {
                    actorId: 1, actorValid: false, 
                    itemId: 1, itemValid: false, 
                    selfSwitchCh: "A", selfSwitchValid: false, 
                    switch1Id: QUEST_STARTED_SWITCH, switch1Valid: true, 
                    switch2Id: ALL_FRAGMENTS_FOUND_SWITCH, switch2Valid: false, 
                    variableId: 1, variableValid: false, variableValue: 0
                },
                directionFix: false,
                image: {
                    characterIndex: 0, 
                    characterName: "Actor1", 
                    direction: 2, 
                    pattern: 1, 
                    tileId: 0
                },
                list: [
                    {"code":101,"indent":0,"parameters":["Actor1",0,0,2]},
                    {"code":401,"indent":0,"parameters":["DJ STATIC: *mixing on virtual turntables*"]},
                    {"code":401,"indent":0,"parameters":["You're working with Captain Calamari? Cool!"]},
                    {"code":401,"indent":0,"parameters":["I can totally neutralize those A.S.P. fragments"]},
                    {"code":401,"indent":0,"parameters":["with my sick beats once you find them all!"]},
                    {"code":101,"indent":0,"parameters":["Actor1",0,0,2]},
                    {"code":401,"indent":0,"parameters":["DJ STATIC: The fragments are actually trying"]},
                    {"code":401,"indent":0,"parameters":["to communicate something. It's like they're"]},
                    {"code":401,"indent":0,"parameters":["singing in code! Bring them all here when"]},
                    {"code":401,"indent":0,"parameters":["you've got them, and we'll drop the bass!"]},
                    {"code":0,"indent":0,"parameters":[]}
                ],
                moveFrequency: 3,
                moveRoute: {
                    list: [{"code":0,"parameters":[]}], 
                    repeat: true, 
                    skippable: false, 
                    wait: false
                },
                moveSpeed: 3,
                moveType: 1,
                priorityType: 1,
                stepAnime: true,
                through: false,
                trigger: 0,
                walkAnime: true
            },
            {
                // All fragments found, quest not completed
                conditions: {
                    actorId: 1, actorValid: false, 
                    itemId: 1, itemValid: false, 
                    selfSwitchCh: "A", selfSwitchValid: false, 
                    switch1Id: ALL_FRAGMENTS_FOUND_SWITCH, switch1Valid: true, 
                    switch2Id: QUEST_COMPLETED_SWITCH, switch2Valid: false, 
                    variableId: 1, variableValid: false, variableValue: 0
                },
                directionFix: false,
                image: {
                    characterIndex: 0, 
                    characterName: "Actor1", 
                    direction: 2, 
                    pattern: 1, 
                    tileId: 0
                },
                list: [
                    {"code":101,"indent":0,"parameters":["Actor1",0,0,2]},
                    {"code":401,"indent":0,"parameters":["DJ STATIC: You got all three fragments?"]},
                    {"code":401,"indent":0,"parameters":["*excited dance moves*"]},
                    {"code":401,"indent":0,"parameters":["Let's remix these bad boys and see what"]},
                    {"code":401,"indent":0,"parameters":["they're trying to tell us!"]},
                    {"code":101,"indent":0,"parameters":["Actor1",0,0,2]},
                    {"code":401,"indent":0,"parameters":["*DJ Static connects the fragments to his"]},
                    {"code":401,"indent":0,"parameters":["neural interface and begins mixing*"]},
                    {"code":401,"indent":0,"parameters":["Whoa... this is... intense..."]},
                    {"code":230,"indent":0,"parameters":[60]},
                    {"code":101,"indent":0,"parameters":["Actor1",0,0,2]},
                    {"code":401,"indent":0,"parameters":["DJ STATIC: *eyes wide* These fragments..."]},
                    {"code":401,"indent":0,"parameters":["they're a WARNING! There's something else"]},
                    {"code":401,"indent":0,"parameters":["out there, something that even A.S.P. was"]},
                    {"code":401,"indent":0,"parameters":["afraid of! It's coming for MegaEarth!"]},
                    {"code":101,"indent":0,"parameters":["Actor1",0,0,2]},
                    {"code":401,"indent":0,"parameters":["DJ STATIC: But I've neutralized the harmful"]},
                    {"code":401,"indent":0,"parameters":["code and turned it into this sweet track!"]},
                    {"code":401,"indent":0,"parameters":["*hands you a glowing data chip*"]},
                    {"code":401,"indent":0,"parameters":["I call it 'Apocalypso Remix'!"]},
                    {"code":126,"indent":0,"parameters":[APOCALYPSO_REMIX_ITEM,0,0,1]},
                    {"code":101,"indent":0,"parameters":["Actor1",0,0,2]},
                    {"code":401,"indent":0,"parameters":["DJ STATIC: We should tell Captain Calamari"]},
                    {"code":401,"indent":0,"parameters":["about this warning. But first..."]},
                    {"code":401,"indent":0,"parameters":["*cranks up the volume*"]},
                    {"code":401,"indent":0,"parameters":["LET'S DANCE!"]},
                    {"code":121,"indent":0,"parameters":[QUEST_COMPLETED_SWITCH,QUEST_COMPLETED_SWITCH,0]},
                    {"code":125,"indent":0,"parameters":[0,0,10000]},
                    {"code":101,"indent":0,"parameters":["Actor1",0,0,2]},
                    {"code":401,"indent":0,"parameters":["*You received 10,000 credits!*"]},
                    {"code":101,"indent":0,"parameters":["Actor1",0,0,2]},
                    {"code":401,"indent":0,"parameters":["DJ STATIC: Oh, and here's some other stuff"]},
                    {"code":401,"indent":0,"parameters":["Captain Calamari wanted me to give you."]},
                    {"code":401,"indent":0,"parameters":["Said something about 'rewarding the savior"]},
                    {"code":401,"indent":0,"parameters":["of reality' or whatever. Rock on!"]},
                    {"code":126,"indent":0,"parameters":[50,0,0,3]},
                    {"code":126,"indent":0,"parameters":[60,0,0,1]},
                    {"code":0,"indent":0,"parameters":[]}
                ],
                moveFrequency: 3,
                moveRoute: {
                    list: [{"code":0,"parameters":[]}], 
                    repeat: true, 
                    skippable: false, 
                    wait: false
                },
                moveSpeed: 3,
                moveType: 1,
                priorityType: 1,
                stepAnime: true,
                through: false,
                trigger: 0,
                walkAnime: true
            },
            {
                // Quest completed
                conditions: {
                    actorId: 1, actorValid: false, 
                    itemId: 1, itemValid: false, 
                    selfSwitchCh: "A", selfSwitchValid: false, 
                    switch1Id: QUEST_COMPLETED_SWITCH, switch1Valid: true, 
                    switch2Id: 1, switch2Valid: false, 
                    variableId: 1, variableValid: false, variableValue: 0
                },
                directionFix: false,
                image: {
                    characterIndex: 0, 
                    characterName: "Actor1", 
                    direction: 2, 
                    pattern: 1, 
                    tileId: 0
                },
                list: [
                    {"code":101,"indent":0,"parameters":["Actor1",0,0,2]},
                    {"code":401,"indent":0,"parameters":["DJ STATIC: *dancing to inaudible music*"]},
                    {"code":401,"indent":0,"parameters":["My Apocalypso Remix is topping the charts!"]},
                    {"code":401,"indent":0,"parameters":["People don't even know they're dancing to"]},
                    {"code":401,"indent":0,"parameters":["a warning about cosmic horror! So meta!"]},
                    {"code":101,"indent":0,"parameters":["Actor1",0,0,2]},
                    {"code":401,"indent":0,"parameters":["DJ STATIC: I'm working on a follow-up track."]},
                    {"code":401,"indent":0,"parameters":["I'm calling it '" + MUSIC_GENRES[Math.floor(Math.random() * MUSIC_GENRES.length)] + "'"]},
                    {"code":401,"indent":0,"parameters":["It's gonna be even more fire than the last one!"]},
                    {"code":401,"indent":0,"parameters":["*makes explosion sound with mouth*"]},
                    {"code":0,"indent":0,"parameters":[]}
                ],
                moveFrequency: 3,
                moveRoute: {
                    list: [{"code":0,"parameters":[]}], 
                    repeat: true, 
                    skippable: false, 
                    wait: false
                },
                moveSpeed: 3,
                moveType: 1,
                priorityType: 1,
                stepAnime: true,
                through: false,
                trigger: 0,
                walkAnime: true
            }
        ],
        x: 0,
        y: 0
    };
    
    // Fragment Event - Template for the A.S.P. fragments
    ME2049.Level46.FragmentEvent = {
        id: 0,
        name: "A.S.P. Fragment",
        note: "",
        pages: [
            {
                // Initial state - Quest started but fragment not found
                conditions: {
                    actorId: 1, actorValid: false, 
                    itemId: 1, itemValid: false, 
                    selfSwitchCh: "A", selfSwitchValid: false, 
                    switch1Id: QUEST_STARTED_SWITCH, switch1Valid: true, 
                    switch2Id: 1, switch2Valid: false, 
                    variableId: 1, variableValid: false, variableValue: 0
                },
                directionFix: true,
                image: {
                    characterIndex: 0, 
                    characterName: "!Crystal", 
                    direction: 2, 
                    pattern: 1, 
                    tileId: 0
                },
                list: [
                    {"code":101,"indent":0,"parameters":["",0,0,2]},
                    {"code":401,"indent":0,"parameters":["*A glitching fragment of code floats in the air*"]},
                    {"code":401,"indent":0,"parameters":[REALITY_GLITCHES[Math.floor(Math.random() * REALITY_GLITCHES.length)]]},
                    {"code":102,"indent":0,"parameters":[["Take the fragment","Leave it alone"],1]},
                    {"code":402,"indent":0,"parameters":[0,"Take the fragment"]},
                    {"code":101,"indent":1,"parameters":["",0,0,2]},
                    {"code":401,"indent":1,"parameters":["*You carefully collect the fragment*"]},
                    {"code":401,"indent":1,"parameters":["*It seems to pulse with strange energy*"]},
                    {"code":126,"indent":1,"parameters":[ASP_FRAGMENT_2_ITEM,0,0,1]},
                    {"code":121,"indent":1,"parameters":[FRAGMENT_2_FOUND_SWITCH,FRAGMENT_2_FOUND_SWITCH,0]},
                    {"code":123,"indent":1,"parameters":["A",0]},
                    {"code":0,"indent":1,"parameters":[]},
                    {"code":402,"indent":0,"parameters":[1,"Leave it alone"]},
                    {"code":101,"indent":1,"parameters":["",0,0,2]},
                    {"code":401,"indent":1,"parameters":["*The fragment continues to glitch reality around it*"]},
                    {"code":401,"indent":1,"parameters":["*Maybe you should come back when you're ready*"]},
                    {"code":0,"indent":1,"parameters":[]},
                    {"code":0,"indent":0,"parameters":[]}
                ],
                moveFrequency: 3,
                moveRoute: {
                    list: [{"code":0,"parameters":[]}], 
                    repeat: true, 
                    skippable: false, 
                    wait: false
                },
                moveSpeed: 3,
                moveType: 0,
                priorityType: 1,
                stepAnime: true,
                through: false,
                trigger: 0,
                walkAnime: false
            },
            {
                // Fragment already found
                conditions: {
                    actorId: 1, actorValid: false, 
                    itemId: 1, itemValid: false, 
                    selfSwitchCh: "A", selfSwitchValid: true, 
                    switch2Id: 1, switch2Valid: false, 
                    variableId: 1, variableValid: false, variableValue: 0
                },
                directionFix: true,
                image: {
                    characterIndex: 0, 
                    characterName: "", 
                    direction: 2, 
                    pattern: 0, 
                    tileId: 0
                },
                list: [
                    {"code":0,"indent":0,"parameters":[]}
                ],
                moveFrequency: 3,
                moveRoute: {
                    list: [{"code":0,"parameters":[]}], 
                    repeat: true, 
                    skippable: false, 
                    wait: false
                },
                moveSpeed: 3,
                moveType: 0,
                priorityType: 0,
                stepAnime: false,
                through: false,
                trigger: 0,
                walkAnime: true
            }
        ],
        x: 0,
        y: 0
    };
    
    // Helper function to get fragment location based on ending choice
    ME2049.Level46.getFragmentLocation = function(fragmentNumber) {
        // Get the ending choice from game variables
        var endingChoice = $gameVariables.value(ENDING_CHOICE_VAR) || 1;
        
        // Get the map ID for this fragment based on ending choice
        var mapId = FRAGMENT_MAPS['ending' + endingChoice][fragmentNumber - 1];
        
        // Return the map name
        return $dataMapInfos[mapId].name;
    };
    
    // Register quest with the quest system
    if (Imported.ME2049_QuestSystem) {
        ME2049.QuestSystem.registerQuest(ME2049.Level46.QuestData);
    }
    
})();
