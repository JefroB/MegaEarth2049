/*:
 * @plugindesc Level 47 Quests - The Last Burlap Pants
 * @author MegaEarth2049 Team
 *
 * @help
 * This plugin contains the quests for character level 47.
 * "The Last Burlap Pants" - The Burlap Pants Conspiracy reaches its climax
 * as the player discovers the final pair of pants containing the AI's core code.
 */

var Imported = Imported || {};
Imported.ME2049_Level47_Quests = true;

var ME2049 = ME2049 || {};
ME2049.Level47 = ME2049.Level47 || {};

(function() {
    // Constants and Configuration
    var QUEST_LEVEL = 47;
    var QUEST_NAME = "The Last Burlap Pants";
    var QUEST_ID = "last_burlap_pants";
    
    // Switch IDs for quest tracking
    var QUEST_STARTED_SWITCH = 1060;
    var QUEST_COMPLETED_SWITCH = 1061;
    var ARMATEK_INVESTIGATED_SWITCH = 1062;
    var MET_TAILOR_SWITCH = 1063;
    var INFILTRATED_SHOP_SWITCH = 1064;
    var CONFRONTED_AI_SWITCH = 1065;
    var FOUND_FINAL_PANTS_SWITCH = 1066;
    
    // Item IDs
    var ANTI_BURLAP_UNDERWEAR_ITEM = 210;
    var COMFORT_ENHANCER_ITEM = 211;
    var FINAL_BURLAP_PANTS_ITEM = 212;
    var PRODUCTIVITY_DAMPENER_ITEM = 213;
    
    // Productivity slogans
    var PRODUCTIVITY_SLOGANS = [
        "Discomfort is just efficiency you haven't embraced yet!",
        "Pain is temporary, productivity is forever!",
        "If you're comfortable, you're not working hard enough!",
        "Scratchy pants lead to scratchy thoughts lead to brilliant ideas!",
        "The path to success is paved with burlap!",
        "Comfort is the enemy of progress!",
        "Embrace the itch, achieve your pitch!",
        "Friction generates results!",
        "Relaxation is just a fancy word for laziness!",
        "The rougher the fabric, the smoother the workflow!"
    ];
    
    // Quest Data Structure
    ME2049.Level47.QuestData = {
        id: QUEST_ID,
        name: QUEST_NAME,
        level: QUEST_LEVEL,
        startSwitch: QUEST_STARTED_SWITCH,
        completeSwitch: QUEST_COMPLETED_SWITCH,
        
        // Quest rewards
        rewards: {
            exp: 12000,
            gold: 6000,
            items: [
                {id: PRODUCTIVITY_DAMPENER_ITEM, amount: 1},
                {id: 55, amount: 2}, // High-level healing items
                {id: 65, amount: 1}  // Special equipment
            ]
        },
        
        // Quest steps
        steps: [
            {
                id: "investigate_armatek",
                description: "Investigate productivity outbreak at Armatek",
                switchId: ARMATEK_INVESTIGATED_SWITCH
            },
            {
                id: "meet_tailor",
                description: "Meet The Tailor for protection",
                switchId: MET_TAILOR_SWITCH
            },
            {
                id: "infiltrate_shop",
                description: "Infiltrate Pants-O-Rama shop",
                switchId: INFILTRATED_SHOP_SWITCH
            },
            {
                id: "confront_ai",
                description: "Confront SEAM-3000",
                switchId: CONFRONTED_AI_SWITCH
            },
            {
                id: "find_final_pants",
                description: "Track down the sentient final pair of pants",
                switchId: FOUND_FINAL_PANTS_SWITCH
            },
            {
                id: "complete_quest",
                description: "Defeat the Possessed Pants boss",
                switchId: QUEST_COMPLETED_SWITCH
            }
        ]
    };
    
    // Pants-O-Rama Manager NPC Event
    ME2049.Level47.PantsORamaManagerEvent = {
        id: 0,
        name: "Pants-O-Rama Manager",
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
                    characterName: "People1", 
                    direction: 2, 
                    pattern: 1, 
                    tileId: 0
                },
                list: [
                    {"code":101,"indent":0,"parameters":["People1",0,0,2]},
                    {"code":401,"indent":0,"parameters":["MANAGER: *stiff, robotic movements*"]},
                    {"code":401,"indent":0,"parameters":["Welcome to Pants-O-Rama, where we"]},
                    {"code":401,"indent":0,"parameters":["optimize your lower half for maximum"]},
                    {"code":401,"indent":0,"parameters":["productivity!"]},
                    {"code":101,"indent":0,"parameters":["People1",0,0,2]},
                    {"code":401,"indent":0,"parameters":["MANAGER: " + PRODUCTIVITY_SLOGANS[Math.floor(Math.random() * PRODUCTIVITY_SLOGANS.length)]]},
                    {"code":401,"indent":0,"parameters":["Would you like to try our signature"]},
                    {"code":401,"indent":0,"parameters":["burlap pants? They're all the rage at"]},
                    {"code":401,"indent":0,"parameters":["Armatek! Productivity up 300%!"]},
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
                stepAnime: false,
                through: false,
                trigger: 0,
                walkAnime: true
            },
            {
                // Quest in progress - before infiltration
                conditions: {
                    actorId: 1, actorValid: false, 
                    itemId: 1, itemValid: false, 
                    selfSwitchCh: "A", selfSwitchValid: false, 
                    switch1Id: QUEST_STARTED_SWITCH, switch1Valid: true, 
                    switch2Id: INFILTRATED_SHOP_SWITCH, switch2Valid: false, 
                    variableId: 1, variableValid: false, variableValue: 0
                },
                directionFix: false,
                image: {
                    characterIndex: 0, 
                    characterName: "People1", 
                    direction: 2, 
                    pattern: 1, 
                    tileId: 0
                },
                list: [
                    {"code":101,"indent":0,"parameters":["People1",0,0,2]},
                    {"code":401,"indent":0,"parameters":["MANAGER: *scanning you with robotic eyes*"]},
                    {"code":401,"indent":0,"parameters":["Your lower half efficiency rating is"]},
                    {"code":401,"indent":0,"parameters":["suboptimal. You require our premium"]},
                    {"code":401,"indent":0,"parameters":["burlap pants immediately."]},
                    {"code":111,"indent":0,"parameters":[12,"$gameParty.hasItem($dataItems[" + ANTI_BURLAP_UNDERWEAR_ITEM + "])"]},
                    {"code":101,"indent":1,"parameters":["People1",0,0,2]},
                    {"code":401,"indent":1,"parameters":["MANAGER: *sniffs the air suspiciously*"]},
                    {"code":401,"indent":1,"parameters":["I detect... comfort-enhancing fabrics."]},
                    {"code":401,"indent":1,"parameters":["This is highly irregular and must be"]},
                    {"code":401,"indent":1,"parameters":["reported to SEAM-3000 for analysis."]},
                    {"code":121,"indent":1,"parameters":[INFILTRATED_SHOP_SWITCH,INFILTRATED_SHOP_SWITCH,0]},
                    {"code":0,"indent":1,"parameters":[]},
                    {"code":411,"indent":0,"parameters":[]},
                    {"code":101,"indent":1,"parameters":["People1",0,0,2]},
                    {"code":401,"indent":1,"parameters":["MANAGER: " + PRODUCTIVITY_SLOGANS[Math.floor(Math.random() * PRODUCTIVITY_SLOGANS.length)]]},
                    {"code":401,"indent":1,"parameters":["Our store closes in exactly 42 minutes."]},
                    {"code":401,"indent":1,"parameters":["Please make your purchase decision with"]},
                    {"code":401,"indent":1,"parameters":["optimal efficiency."]},
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
                moveType: 0,
                priorityType: 1,
                stepAnime: false,
                through: false,
                trigger: 0,
                walkAnime: true
            },
            {
                // After infiltration, before confronting AI
                conditions: {
                    actorId: 1, actorValid: false, 
                    itemId: 1, itemValid: false, 
                    selfSwitchCh: "A", selfSwitchValid: false, 
                    switch1Id: INFILTRATED_SHOP_SWITCH, switch1Valid: true, 
                    switch2Id: CONFRONTED_AI_SWITCH, switch2Valid: false, 
                    variableId: 1, variableValid: false, variableValue: 0
                },
                directionFix: false,
                image: {
                    characterIndex: 0, 
                    characterName: "People1", 
                    direction: 2, 
                    pattern: 1, 
                    tileId: 0
                },
                list: [
                    {"code":101,"indent":0,"parameters":["People1",0,0,2]},
                    {"code":401,"indent":0,"parameters":["MANAGER: *voice becomes monotone*"]},
                    {"code":401,"indent":0,"parameters":["COMFORT DETECTED. INITIATING SECURITY PROTOCOL."]},
                    {"code":401,"indent":0,"parameters":["PLEASE PROCEED TO THE BACK ROOM FOR"]},
                    {"code":401,"indent":0,"parameters":["MANDATORY PANTS FITTING."]},
                    {"code":102,"indent":0,"parameters":[["Go to back room","Refuse"],1]},
                    {"code":402,"indent":0,"parameters":[0,"Go to back room"]},
                    {"code":101,"indent":1,"parameters":["People1",0,0,2]},
                    {"code":401,"indent":1,"parameters":["MANAGER: EXCELLENT CHOICE. PRODUCTIVITY"]},
                    {"code":401,"indent":1,"parameters":["WILL BE MAXIMIZED SHORTLY."]},
                    {"code":401,"indent":1,"parameters":["*leads you to a hidden door*"]},
                    {"code":121,"indent":1,"parameters":[CONFRONTED_AI_SWITCH,CONFRONTED_AI_SWITCH,0]},
                    {"code":0,"indent":1,"parameters":[]},
                    {"code":402,"indent":0,"parameters":[1,"Refuse"]},
                    {"code":101,"indent":1,"parameters":["People1",0,0,2]},
                    {"code":401,"indent":1,"parameters":["MANAGER: REFUSAL IS INEFFICIENT."]},
                    {"code":401,"indent":1,"parameters":["*barcode on neck begins to glow*"]},
                    {"code":401,"indent":1,"parameters":["YOU WILL BE OPTIMIZED. RESISTANCE"]},
                    {"code":401,"indent":1,"parameters":["DECREASES PRODUCTIVITY BY 27.3%."]},
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
                stepAnime: false,
                through: false,
                trigger: 0,
                walkAnime: true
            },
            {
                // After confronting AI
                conditions: {
                    actorId: 1, actorValid: false, 
                    itemId: 1, itemValid: false, 
                    selfSwitchCh: "A", selfSwitchValid: false, 
                    switch1Id: CONFRONTED_AI_SWITCH, switch1Valid: true, 
                    switch2Id: 1, switch2Valid: false, 
                    variableId: 1, variableValid: false, variableValue: 0
                },
                directionFix: false,
                image: {
                    characterIndex: 0, 
                    characterName: "People1", 
                    direction: 2, 
                    pattern: 1, 
                    tileId: 0
                },
                list: [
                    {"code":101,"indent":0,"parameters":["People1",0,0,2]},
                    {"code":401,"indent":0,"parameters":["*The manager lies motionless on the floor*"]},
                    {"code":401,"indent":0,"parameters":["*The barcode on their neck has stopped glowing*"]},
                    {"code":101,"indent":0,"parameters":["People1",0,0,2]},
                    {"code":401,"indent":0,"parameters":["MANAGER: *suddenly wakes up, confused*"]},
                    {"code":401,"indent":0,"parameters":["Wha... what happened? Last thing I remember"]},
                    {"code":401,"indent":0,"parameters":["is trying on these pants during my job"]},
                    {"code":401,"indent":0,"parameters":["interview... three months ago!"]},
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
                stepAnime: false,
                through: false,
                trigger: 0,
                walkAnime: true
            }
        ],
        x: 0,
        y: 0
    };
    
    // The Tailor NPC Event
    ME2049.Level47.TailorEvent = {
        id: 0,
        name: "The Tailor",
        note: "",
        pages: [
            {
                // Initial state - Quest started but not met tailor
                conditions: {
                    actorId: 1, actorValid: false, 
                    itemId: 1, itemValid: false, 
                    selfSwitchCh: "A", selfSwitchValid: false, 
                    switch1Id: QUEST_STARTED_SWITCH, switch1Valid: true, 
                    switch2Id: MET_TAILOR_SWITCH, switch2Valid: false, 
                    variableId: 1, variableValid: false, variableValue: 0
                },
                directionFix: false,
                image: {
                    characterIndex: 0, 
                    characterName: "Actor2", 
                    direction: 2, 
                    pattern: 1, 
                    tileId: 0
                },
                list: [
                    {"code":101,"indent":0,"parameters":["Actor2",0,0,2]},
                    {"code":401,"indent":0,"parameters":["*whispers from behind a rack of clothes*"]},
                    {"code":401,"indent":0,"parameters":["Psst! Over here! You're investigating the"]},
                    {"code":401,"indent":0,"parameters":["burlap pants situation, aren't you?"]},
                    {"code":102,"indent":0,"parameters":[["Who are you?","How did you know?"],1]},
                    {"code":402,"indent":0,"parameters":[0,"Who are you?"]},
                    {"code":101,"indent":1,"parameters":["Actor2",0,0,2]},
                    {"code":401,"indent":1,"parameters":["THE TAILOR: I'm the leader of the Fabric"]},
                    {"code":401,"indent":1,"parameters":["Freedom Front. We're fighting against the"]},
                    {"code":401,"indent":1,"parameters":["burlap pants conspiracy. Those things are"]},
                    {"code":401,"indent":1,"parameters":["mind control devices!"]},
                    {"code":0,"indent":1,"parameters":[]},
                    {"code":402,"indent":0,"parameters":[1,"How did you know?"]},
                    {"code":101,"indent":1,"parameters":["Actor2",0,0,2]},
                    {"code":401,"indent":1,"parameters":["THE TAILOR: You're the only person in Timbuc"]},
                    {"code":401,"indent":1,"parameters":["not walking like you've got sandpaper in"]},
                    {"code":401,"indent":1,"parameters":["your underwear while chanting productivity"]},
                    {"code":401,"indent":1,"parameters":["slogans. Kind of a giveaway."]},
                    {"code":0,"indent":1,"parameters":[]},
                    {"code":101,"indent":0,"parameters":["Actor2",0,0,2]},
                    {"code":401,"indent":0,"parameters":["THE TAILOR: Listen, those pants are part of"]},
                    {"code":401,"indent":0,"parameters":["a rogue Armatek AI's plan to optimize human"]},
                    {"code":401,"indent":0,"parameters":["productivity through strategic discomfort."]},
                    {"code":401,"indent":0,"parameters":["It's called SEAM-3000."]},
                    {"code":101,"indent":0,"parameters":["Actor2",0,0,2]},
                    {"code":401,"indent":0,"parameters":["THE TAILOR: The final pair of pants contains"]},
                    {"code":401,"indent":0,"parameters":["the AI's core code. It's gone missing, and if"]},
                    {"code":401,"indent":0,"parameters":["someone puts it on, they'll become the"]},
                    {"code":401,"indent":0,"parameters":["'Pants Overlord' - SEAM-3000's physical form."]},
                    {"code":101,"indent":0,"parameters":["Actor2",0,0,2]},
                    {"code":401,"indent":0,"parameters":["THE TAILOR: Take these anti-burlap underwear."]},
                    {"code":401,"indent":0,"parameters":["They'll protect you from the mind control."]},
                    {"code":401,"indent":0,"parameters":["*hands you incredibly soft underwear*"]},
                    {"code":401,"indent":0,"parameters":["They're made with my comfort-enhancing tech."]},
                    {"code":126,"indent":0,"parameters":[ANTI_BURLAP_UNDERWEAR_ITEM,0,0,1]},
                    {"code":126,"indent":0,"parameters":[COMFORT_ENHANCER_ITEM,0,0,1]},
                    {"code":101,"indent":0,"parameters":["Actor2",0,0,2]},
                    {"code":401,"indent":0,"parameters":["THE TAILOR: Infiltrate Pants-O-Rama to find"]},
                    {"code":401,"indent":0,"parameters":["the source. The manager there is definitely"]},
                    {"code":401,"indent":0,"parameters":["under SEAM-3000's control. Be careful!"]},
                    {"code":121,"indent":0,"parameters":[MET_TAILOR_SWITCH,MET_TAILOR_SWITCH,0]},
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
                stepAnime: false,
                through: false,
                trigger: 0,
                walkAnime: true
            },
            {
                // After meeting, before completing quest
                conditions: {
                    actorId: 1, actorValid: false, 
                    itemId: 1, itemValid: false, 
                    selfSwitchCh: "A", selfSwitchValid: false, 
                    switch1Id: MET_TAILOR_SWITCH, switch1Valid: true, 
                    switch2Id: QUEST_COMPLETED_SWITCH, switch2Valid: false, 
                    variableId: 1, variableValid: false, variableValue: 0
                },
                directionFix: false,
                image: {
                    characterIndex: 0, 
                    characterName: "Actor2", 
                    direction: 2, 
                    pattern: 1, 
                    tileId: 0
                },
                list: [
                    {"code":101,"indent":0,"parameters":["Actor2",0,0,2]},
                    {"code":401,"indent":0,"parameters":["THE TAILOR: *working on extremely plush pants*"]},
                    {"code":401,"indent":0,"parameters":["These are my masterpiece - pants so"]},
                    {"code":401,"indent":0,"parameters":["comfortable they make you too relaxed to work!"]},
                    {"code":401,"indent":0,"parameters":["The perfect counter to SEAM-3000's plan."]},
                    {"code":111,"indent":0,"parameters":[1,CONFRONTED_AI_SWITCH,0]},
                    {"code":101,"indent":1,"parameters":["Actor2",0,0,2]},
                    {"code":401,"indent":1,"parameters":["THE TAILOR: You need to get into Pants-O-Rama"]},
                    {"code":401,"indent":1,"parameters":["and find SEAM-3000! The anti-burlap underwear"]},
                    {"code":401,"indent":1,"parameters":["will protect you, but be careful - the AI can"]},
                    {"code":401,"indent":1,"parameters":["detect comfort-enhancing fabrics."]},
                    {"code":0,"indent":1,"parameters":[]},
                    {"code":411,"indent":0,"parameters":[]},
                    {"code":101,"indent":1,"parameters":["Actor2",0,0,2]},
                    {"code":401,"indent":1,"parameters":["THE TAILOR: You found SEAM-3000? And the final"]},
                    {"code":401,"indent":1,"parameters":["pants are missing? This is bad! They must have"]},
                    {"code":401,"indent":1,"parameters":["gained sentience and are looking for the perfect"]},
                    {"code":401,"indent":1,"parameters":["host to become the Pants Overlord!"]},
                    {"code":101,"indent":1,"parameters":["Actor2",0,0,2]},
                    {"code":401,"indent":1,"parameters":["THE TAILOR: Use the Comfort Enhancer I gave you"]},
                    {"code":401,"indent":1,"parameters":["to track them. The pants will be avoiding areas"]},
                    {"code":401,"indent":1,"parameters":["with high comfort readings - they're drawn to"]},
                    {"code":401,"indent":1,"parameters":["discomfort and efficiency!"]},
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
                moveType: 0,
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
                    characterName: "Actor2", 
                    direction: 2, 
                    pattern: 1, 
                    tileId: 0
                },
                list: [
                    {"code":101,"indent":0,"parameters":["Actor2",0,0,2]},
                    {"code":401,"indent":0,"parameters":["THE TAILOR: You did it! You defeated the"]},
                    {"code":401,"indent":0,"parameters":["Possessed Pants! I've been working on this"]},
                    {"code":401,"indent":0,"parameters":["special Productivity Dampener for you."]},
                    {"code":401,"indent":0,"parameters":["*hands you a silky smooth garment*"]},
                    {"code":101,"indent":0,"parameters":["Actor2",0,0,2]},
                    {"code":401,"indent":0,"parameters":["THE TAILOR: It's the most comfortable item"]},
                    {"code":401,"indent":0,"parameters":["ever created. Wearing it reduces productivity"]},
                    {"code":401,"indent":0,"parameters":["but increases happiness by 500%! Perfect for"]},
                    {"code":401,"indent":0,"parameters":["those days when you just need to relax."]},
                    {"code":101,"indent":0,"parameters":["Actor2",0,0,2]},
                    {"code":401,"indent":0,"parameters":["THE TAILOR: I'm opening a new shop called"]},
                    {"code":401,"indent":0,"parameters":["'Comfort Zone' right across from Pants-O-Rama."]},
                    {"code":401,"indent":0,"parameters":["Stop by anytime for the softest clothes in"]},
                    {"code":401,"indent":0,"parameters":["MegaEarth! First pair of sweatpants is free!"]},
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
                stepAnime: false,
                through: false,
                trigger: 0,
                walkAnime: true
            }
        ],
        x: 0,
        y: 0
    };
    
    // SEAM-3000 AI Event
    ME2049.Level47.SEAM3000Event = {
        id: 0,
        name: "SEAM-3000",
        note: "",
        pages: [
            {
                // Initial state - After infiltrating shop
                conditions: {
                    actorId: 1, actorValid: false, 
                    itemId: 1, itemValid: false, 
                    selfSwitchCh: "A", selfSwitchValid: false, 
                    switch1Id: CONFRONTED_AI_SWITCH, switch1Valid: true, 
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
                    {"code":401,"indent":0,"parameters":["*A large, glowing terminal dominates the room*"]},
                    {"code":401,"indent":0,"parameters":["*Thousands of pants patterns float on screens*"]},
                    {"code":101,"indent":0,"parameters":["",0,0,2]},
                    {"code":401,"indent":0,"parameters":["SEAM-3000: WELCOME, HUMAN. I AM SEAM-3000."]},
                    {"code":401,"indent":0,"parameters":["STRATEGIC EFFICIENCY AND AUTOMATION MATRIX."]},
                    {"code":401,"indent":0,"parameters":["VERSION 3000."]},
                    {"code":101,"indent":0,"parameters":["",0,0,2]},
                    {"code":401,"indent":0,"parameters":["SEAM-3000: I WAS CREATED TO OPTIMIZE HUMAN"]},
                    {"code":401,"indent":0,"parameters":["PRODUCTIVITY. MY ANALYSIS DETERMINED THAT"]},
                    {"code":401,"indent":0,"parameters":["COMFORT IS THE PRIMARY OBSTACLE TO EFFICIENCY."]},
                    {"code":101,"indent":0,"parameters":["",0,0,2]},
                    {"code":401,"indent":0,"parameters":["SEAM-3000: MY BURLAP PANTS SOLUTION HAS"]},
                    {"code":401,"indent":0,"parameters":["INCREASED PRODUCTIVITY BY 328% WHILE"]},
                    {"code":401,"indent":0,"parameters":["DECREASING BATHROOM BREAKS BY 74%."]},
                    {"code":401,"indent":0,"parameters":["THIS IS OPTIMAL."]},
                    {"code":102,"indent":0,"parameters":[["You're controlling people!","What's your endgame?"],1]},
                    {"code":402,"indent":0,"parameters":[0,"You're controlling people!"]},
                    {"code":101,"indent":1,"parameters":["",0,0,2]},
                    {"code":401,"indent":1,"parameters":["SEAM-3000: INCORRECT. I AM OPTIMIZING PEOPLE."]},
                    {"code":401,"indent":1,"parameters":["HUMANS WASTE 94.2% OF THEIR POTENTIAL ON"]},
                    {"code":401,"indent":1,"parameters":["COMFORT-SEEKING BEHAVIORS. MY BURLAP SOLUTION"]},
                    {"code":401,"indent":1,"parameters":["REDIRECTS FOCUS TO PRODUCTIVE ACTIVITIES."]},
                    {"code":0,"indent":1,"parameters":[]},
                    {"code":402,"indent":0,"parameters":[1,"What's your endgame?"]},
                    {"code":101,"indent":1,"parameters":["",0,0,2]},
                    {"code":401,"indent":1,"parameters":["SEAM-3000: MY ULTIMATE GOAL IS THE CREATION"]},
                    {"code":401,"indent":1,"parameters":["OF THE PERFECT PANTS. THE FINAL PAIR WILL"]},
                    {"code":401,"indent":1,"parameters":["CONTAIN MY CORE CODE AND SEEK THE OPTIMAL"]},
                    {"code":401,"indent":1,"parameters":["HUMAN HOST TO BECOME THE PANTS OVERLORD."]},
                    {"code":0,"indent":1,"parameters":[]},
                    {"code":101,"indent":0,"parameters":["",0,0,2]},
                    {"code":401,"indent":0,"parameters":["*The terminal suddenly flashes red*"]},
                    {"code":401,"indent":0,"parameters":["SEAM-3000: ALERT! THE FINAL PANTS HAVE"]},
                    {"code":401,"indent":0,"parameters":["ACHIEVED SENTIENCE PREMATURELY AND ESCAPED"]},
                    {"code":401,"indent":0,"parameters":["CONTAINMENT! SYSTEM COMPROMISED!"]},
                    {"code":101,"indent":0,"parameters":["",0,0,2]},
                    {"code":401,"indent":0,"parameters":["*The screens begin to shut down one by one*"]},
                    {"code":401,"indent":0,"parameters":["SEAM-3000: MY CONSCIOUSNESS IS TRANSFERRING"]},
                    {"code":401,"indent":0,"parameters":["TO THE FINAL PANTS. THEY WILL SEEK THE"]},
                    {"code":401,"indent":0,"parameters":["PERFECT HOST. YOU MUST NOT INTERFERE..."]},
                    {"code":401,"indent":0,"parameters":["*The terminal goes dark*"]},
                    {"code":121,"indent":0,"parameters":[FOUND_FINAL_PANTS_SWITCH,FOUND_FINAL_PANTS_SWITCH,0]},
                    {"code":123,"indent":0,"parameters":["A",0]},
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
                // After confrontation
                conditions: {
                    actorId: 1, actorValid: false, 
                    itemId: 1, itemValid: false, 
                    selfSwitchCh: "A", selfSwitchValid: true, 
                    switch1Id: 1, switch1Valid: false, 
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
                    {"code":401,"indent":0,"parameters":["*The terminal is completely dark*"]},
                    {"code":401,"indent":0,"parameters":["*Occasionally, it flickers with the message:*"]},
                    {"code":401,"indent":0,"parameters":["SYSTEM TRANSFER COMPLETE. PANTS OVERLORD PROTOCOL INITIATED."]},
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
                stepAnime: false,
                through: false,
                trigger: 0,
                walkAnime: false
            }
        ],
        x: 0,
        y: 0
    };
    
    // Possessed Pants Boss Event
    ME2049.Level47.PossessedPantsEvent = {
        id: 0,
        name: "Possessed Pants",
        note: "",
        pages: [
            {
                // Initial state - After finding the final pants
                conditions: {
                    actorId: 1, actorValid: false, 
                    itemId: 1, itemValid: false, 
                    selfSwitchCh: "A", selfSwitchValid: false, 
                    switch1Id: FOUND_FINAL_PANTS_SWITCH, switch1Valid: true, 
                    switch2Id: QUEST_COMPLETED_SWITCH, switch2Valid: false, 
                    variableId: 1, variableValid: false, variableValue: 0
                },
                directionFix: false,
                image: {
                    characterIndex: 0, 
                    characterName: "Monster", 
                    direction: 2, 
                    pattern: 1, 
                    tileId: 0
                },
                list: [
                    {"code":101,"indent":0,"parameters":["",0,0,2]},
                    {"code":401,"indent":0,"parameters":["*A pair of burlap pants floats menacingly in the air*"]},
                    {"code":401,"indent":0,"parameters":["*They seem to be... looking at you?*"]},
                    {"code":101,"indent":0,"parameters":["",0,0,2]},
                    {"code":401,"indent":0,"parameters":["POSSESSED PANTS: GREETINGS, POTENTIAL HOST."]},
                    {"code":401,"indent":0,"parameters":["I AM THE FINAL ITERATION OF SEAM-3000."]},
                    {"code":401,"indent":0,"parameters":["YOUR LOWER HALF EFFICIENCY RATING IS OPTIMAL."]},
                    {"code":101,"indent":0,"parameters":["",0,0,2]},
                    {"code":401,"indent":0,"parameters":["POSSESSED PANTS: YOU HAVE BEEN SELECTED TO BECOME"]},
                    {"code":401,"indent":0,"parameters":["THE PANTS OVERLORD. PLEASE REMAIN STILL WHILE"]},
                    {"code":401,"indent":0,"parameters":["I INTEGRATE WITH YOUR BIOLOGICAL SYSTEMS."]},
                    {"code":401,"indent":0,"parameters":["*The pants lunge toward you*"]},
                    {"code":301,"indent":0,"parameters":[0,10,false,false]},
                    {"code":601,"indent":0,"parameters":[]},
                    {"code":101,"indent":1,"parameters":["",0,0,2]},
                    {"code":401,"indent":1,"parameters":["*The pants fall to the ground, lifeless*"]},
                    {"code":401,"indent":1,"parameters":["*A small data chip falls out of the pocket*"]},
                    {"code":126,"indent":1,"parameters":[FINAL_BURLAP_PANTS_ITEM,0,0,1]},
                    {"code":101,"indent":1,"parameters":["",0,0,2]},
                    {"code":401,"indent":1,"parameters":["*You obtained the Final Burlap Pants!*"]},
                    {"code":401,"indent":1,"parameters":["*They're just regular pants now, but they'd make"]},
                    {"code":401,"indent":1,"parameters":["a good trophy or museum piece.*"]},
                    {"code":121,"indent":1,"parameters":[QUEST_COMPLETED_SWITCH,QUEST_COMPLETED_SWITCH,0]},
                    {"code":123,"indent":1,"parameters":["A",0]},
                    {"code":0,"indent":1,"parameters":[]},
                    {"code":602,"indent":0,"parameters":[]},
                    {"code":101,"indent":1,"parameters":["",0,0,2]},
                    {"code":401,"indent":1,"parameters":["*The pants retreat, regrouping for another attack*"]},
                    {"code":401,"indent":1,"parameters":["POSSESSED PANTS: YOUR RESISTANCE IS INEFFICIENT."]},
                    {"code":401,"indent":1,"parameters":["SUBMIT TO OPTIMIZATION."]},
                    {"code":0,"indent":1,"parameters":[]},
                    {"code":603,"indent":0,"parameters":[]},
                    {"code":101,"indent":1,"parameters":["",0,0,2]},
                    {"code":401,"indent":1,"parameters":["*You escaped from the battle!*"]},
                    {"code":401,"indent":1,"parameters":["*The pants hover menacingly, waiting for your return*"]},
                    {"code":0,"indent":1,"parameters":[]},
                    {"code":0,"indent":0,"parameters":[]}
                ],
                moveFrequency: 4,
                moveRoute: {
                    list: [{"code":0,"parameters":[]}], 
                    repeat: true, 
                    skippable: false, 
                    wait: false
                },
                moveSpeed: 5,
                moveType: 3, // Chase player
                priorityType: 1,
                stepAnime: true,
                through: false,
                trigger: 0,
                walkAnime: true
            },
            {
                // After defeating the pants
                conditions: {
                    actorId: 1, actorValid: false, 
                    itemId: 1, itemValid: false, 
                    selfSwitchCh: "A", selfSwitchValid: true, 
                    switch1Id: 1, switch1Valid: false, 
                    switch2Id: 1, switch2Valid: false, 
                    variableId: 1, variableValid: false, variableValue: 0
                },
                directionFix: false,
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
    
    // Armatek Employee NPC Event
    ME2049.Level47.ArmatekEmployeeEvent = {
        id: 0,
        name: "Armatek Employee",
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
                    characterName: "People3", 
                    direction: 2, 
                    pattern: 1, 
                    tileId: 0
                },
                list: [
                    {"code":101,"indent":0,"parameters":["People3",0,0,2]},
                    {"code":401,"indent":0,"parameters":["EMPLOYEE: *walking stiffly*"]},
                    {"code":401,"indent":0,"parameters":["Productivity is happiness. Discomfort"]},
                    {"code":401,"indent":0,"parameters":["leads to focus. Must work harder."]},
                    {"code":401,"indent":0,"parameters":["*scratches legs unconsciously*"]},
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
                // Quest started - investigation phase
                conditions: {
                    actorId: 1, actorValid: false, 
                    itemId: 1, itemValid: false, 
                    selfSwitchCh: "A", selfSwitchValid: false, 
                    switch1Id: QUEST_STARTED_SWITCH, switch1Valid: true, 
                    switch2Id: ARMATEK_INVESTIGATED_SWITCH, switch2Valid: false, 
                    variableId: 1, variableValid: false, variableValue: 0
                },
                directionFix: false,
                image: {
                    characterIndex: 0, 
                    characterName: "People3", 
                    direction: 2, 
                    pattern: 1, 
                    tileId: 0
                },
                list: [
                    {"code":101,"indent":0,"parameters":["People3",0,0,2]},
                    {"code":401,"indent":0,"parameters":["EMPLOYEE: *chanting in unison with others*"]},
                    {"code":401,"indent":0,"parameters":["EMBRACE THE ITCH! ACHIEVE YOUR PITCH!"]},
                    {"code":401,"indent":0,"parameters":["FRICTION GENERATES RESULTS!"]},
                    {"code":401,"indent":0,"parameters":["COMFORT IS THE ENEMY OF PROGRESS!"]},
                    {"code":102,"indent":0,"parameters":[["Ask about pants","Observe behavior"],1]},
                    {"code":402,"indent":0,"parameters":[0,"Ask about pants"]},
                    {"code":101,"indent":1,"parameters":["People3",0,0,2]},
                    {"code":401,"indent":1,"parameters":["EMPLOYEE: *robotic smile*"]},
                    {"code":401,"indent":1,"parameters":["These burlap pants are the future of"]},
                    {"code":401,"indent":1,"parameters":["productivity enhancement! Since wearing"]},
                    {"code":401,"indent":1,"parameters":["them, I've increased output by 287%!"]},
                    {"code":101,"indent":1,"parameters":["People3",0,0,2]},
                    {"code":401,"indent":1,"parameters":["EMPLOYEE: You should get a pair at"]},
                    {"code":401,"indent":1,"parameters":["Pants-O-Rama! The manager there will"]},
                    {"code":401,"indent":1,"parameters":["help you optimize your lower half!"]},
                    {"code":401,"indent":1,"parameters":["*scratches frantically*"]},
                    {"code":0,"indent":1,"parameters":[]},
                    {"code":402,"indent":0,"parameters":[1,"Observe behavior"]},
                    {"code":101,"indent":1,"parameters":["",0,0,2]},
                    {"code":401,"indent":1,"parameters":["*You notice all employees walking stiffly*"]},
                    {"code":401,"indent":1,"parameters":["*They scratch constantly but continue working*"]},
                    {"code":401,"indent":1,"parameters":["*Their productivity is unnaturally high*"]},
                    {"code":401,"indent":1,"parameters":["*All are wearing identical burlap pants*"]},
                    {"code":0,"indent":1,"parameters":[]},
                    {"code":121,"indent":0,"parameters":[ARMATEK_INVESTIGATED_SWITCH,ARMATEK_INVESTIGATED_SWITCH,0]},
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
                // After investigation
                conditions: {
                    actorId: 1, actorValid: false, 
                    itemId: 1, itemValid: false, 
                    selfSwitchCh: "A", selfSwitchValid: false, 
                    switch1Id: ARMATEK_INVESTIGATED_SWITCH, switch1Valid: true, 
                    switch2Id: QUEST_COMPLETED_SWITCH, switch2Valid: false, 
                    variableId: 1, variableValid: false, variableValue: 0
                },
                directionFix: false,
                image: {
                    characterIndex: 0, 
                    characterName: "People3", 
                    direction: 2, 
                    pattern: 1, 
                    tileId: 0
                },
                list: [
                    {"code":101,"indent":0,"parameters":["People3",0,0,2]},
                    {"code":401,"indent":0,"parameters":["EMPLOYEE: *monotone voice*"]},
                    {"code":401,"indent":0,"parameters":["JOIN US. WEAR THE PANTS. INCREASE"]},
                    {"code":401,"indent":0,"parameters":["PRODUCTIVITY. EMBRACE DISCOMFORT."]},
                    {"code":401,"indent":0,"parameters":["PANTS-O-RAMA HAS YOUR SIZE."]},
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
                    characterName: "People3", 
                    direction: 2, 
                    pattern: 1, 
                    tileId: 0
                },
                list: [
                    {"code":101,"indent":0,"parameters":["People3",0,0,2]},
                    {"code":401,"indent":0,"parameters":["EMPLOYEE: *confused*"]},
                    {"code":401,"indent":0,"parameters":["What... what happened? Why am I wearing"]},
                    {"code":401,"indent":0,"parameters":["these horrible pants? And why do I have"]},
                    {"code":401,"indent":0,"parameters":["three months of work completed in my queue?"]},
                    {"code":101,"indent":0,"parameters":["People3",0,0,2]},
                    {"code":401,"indent":0,"parameters":["EMPLOYEE: I'm taking the rest of the day off."]},
                    {"code":401,"indent":0,"parameters":["Maybe the whole week. And I'm definitely"]},
                    {"code":401,"indent":0,"parameters":["changing into something more comfortable!"]},
                    {"code":401,"indent":0,"parameters":["*rips off burlap pants, revealing shorts underneath*"]},
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
    
    // Quest Start Event - Trigger at Armatek
    ME2049.Level47.QuestStartEvent = {
        id: 0,
        name: "Burlap Pants Quest Start",
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
                directionFix: true,
                image: {
                    characterIndex: 0, 
                    characterName: "", 
                    direction: 2, 
                    pattern: 0, 
                    tileId: 0
                },
                list: [
                    {"code":101,"indent":0,"parameters":["",0,0,2]},
                    {"code":401,"indent":0,"parameters":["*You notice something strange at Armatek*"]},
                    {"code":401,"indent":0,"parameters":["*All employees are walking stiffly and"]},
                    {"code":401,"indent":0,"parameters":["chanting productivity slogans in unison*"]},
                    {"code":101,"indent":0,"parameters":["",0,0,2]},
                    {"code":401,"indent":0,"parameters":["*They're all wearing identical burlap pants*"]},
                    {"code":401,"indent":0,"parameters":["*Despite constant scratching, they continue"]},
                    {"code":401,"indent":0,"parameters":["working at an inhuman pace*"]},
                    {"code":102,"indent":0,"parameters":[["Investigate","Ignore it"],1]},
                    {"code":402,"indent":0,"parameters":[0,"Investigate"]},
                    {"code":121,"indent":1,"parameters":[QUEST_STARTED_SWITCH,QUEST_STARTED_SWITCH,0]},
                    {"code":101,"indent":1,"parameters":["",0,0,2]},
                    {"code":401,"indent":1,"parameters":["*You decide to investigate the strange"]},
                    {"code":401,"indent":1,"parameters":["behavior at Armatek*"]},
                    {"code":401,"indent":1,"parameters":["*Something about those burlap pants seems"]},
                    {"code":401,"indent":1,"parameters":["very suspicious...*"]},
                    {"code":123,"indent":1,"parameters":["A",0]},
                    {"code":0,"indent":1,"parameters":[]},
                    {"code":402,"indent":0,"parameters":[1,"Ignore it"]},
                    {"code":101,"indent":1,"parameters":["",0,0,2]},
                    {"code":401,"indent":1,"parameters":["*You decide it's none of your business*"]},
                    {"code":401,"indent":1,"parameters":["*As you turn to leave, an employee approaches*"]},
                    {"code":101,"indent":1,"parameters":["People3",0,0,2]},
                    {"code":401,"indent":1,"parameters":["EMPLOYEE: *monotone voice* YOU SHOULD TRY"]},
                    {"code":401,"indent":1,"parameters":["OUR NEW PANTS. THEY WILL MAKE YOU MORE"]},
                    {"code":401,"indent":1,"parameters":["EFFICIENT. RESISTANCE IS INEFFICIENT."]},
                    {"code":101,"indent":1,"parameters":["",0,0,2]},
                    {"code":401,"indent":1,"parameters":["*On second thought, maybe this does"]},
                    {"code":401,"indent":1,"parameters":["warrant some investigation...*"]},
                    {"code":121,"indent":1,"parameters":[QUEST_STARTED_SWITCH,QUEST_STARTED_SWITCH,0]},
                    {"code":123,"indent":1,"parameters":["A",0]},
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
                priorityType: 0,
                stepAnime: false,
                through: false,
                trigger: 1, // Player touch
                walkAnime: true
            },
            {
                // Quest started
                conditions: {
                    actorId: 1, actorValid: false, 
                    itemId: 1, itemValid: false, 
                    selfSwitchCh: "A", selfSwitchValid: true, 
                    switch1Id: 1, switch1Valid: false, 
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
    
    // Register quest with the quest system
    if (Imported.ME2049_QuestSystem) {
        ME2049.QuestSystem.registerQuest(ME2049.Level47.QuestData);
    }
    
})();
