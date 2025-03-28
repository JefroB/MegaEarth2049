/*:
 * @plugindesc Level 48 Quests - The Clown Uprising
 * @author MegaEarth2049 Team
 *
 * @help
 * This plugin contains the quests for character level 48.
 * "The Clown Uprising" - The underground network of weaponized clowns has
 * decided that post-A.S.P. MegaEarth needs more "joy" - forcibly if necessary.
 */

var Imported = Imported || {};
Imported.ME2049_Level48_Quests = true;

var ME2049 = ME2049 || {};
ME2049.Level48 = ME2049.Level48 || {};

(function() {
    // Constants and Configuration
    var QUEST_LEVEL = 48;
    var QUEST_NAME = "The Clown Uprising";
    var QUEST_ID = "clown_uprising";
    
    // Switch IDs for quest tracking
    var QUEST_STARTED_SWITCH = 1070;
    var QUEST_COMPLETED_SWITCH = 1071;
    var INVESTIGATED_LAUGHING_SWITCH = 1072;
    var MET_SAD_MIME_SWITCH = 1073;
    var COMPLETED_CLOWN_TRAINING_SWITCH = 1074;
    var DISCOVERED_PLAN_SWITCH = 1075;
    var SABOTAGED_GAS_SWITCH = 1076;
    
    // Item IDs
    var CLOWN_DISGUISE_ITEM = 220;
    var JOKE_BOOK_ITEM = 221;
    var LAUGHING_GAS_ANTIDOTE_ITEM = 222;
    var GRAND_BOZO_NOSE_ITEM = 223;
    
    // Terrible jokes for player to tell
    var TERRIBLE_JOKES = [
        "Why don't scientists trust atoms? Because they make up everything!",
        "What's the best thing about Switzerland? I don't know, but the flag is a big plus!",
        "Did you hear about the mathematician who's afraid of negative numbers? He'll stop at nothing to avoid them!",
        "Why don't skeletons fight each other? They don't have the guts!",
        "What do you call a fake noodle? An impasta!",
        "Why did the scarecrow win an award? Because he was outstanding in his field!",
        "How do you organize a space party? You planet!",
        "What do you call a parade of rabbits hopping backwards? A receding hare-line!",
        "Why don't eggs tell jokes? They'd crack each other up!",
        "What's brown and sticky? A stick!"
    ];
    
    // Clown training exercises
    var CLOWN_EXERCISES = [
        "Pie Throwing Accuracy Test - Hit the target with 80% accuracy!",
        "Car Stuffing Endurance Trial - Fit 15 clowns in a single vehicle!",
        "Seltzer Bottle Quick-Draw - Spray before being sprayed!",
        "Balloon Animal Speed Challenge - Make a giraffe in under 10 seconds!",
        "Pratfall Impact Resistance - Fall down stairs without actual injury!",
        "Oversized Shoe Obstacle Course - Navigate while wearing shoes 5x your size!",
        "Honking Morse Code - Communicate complex messages via nose honks!",
        "Custard Pie Resilience - Take 10 pies to the face without flinching!",
        "Tiny Bicycle Marathon - Ride a comically small bike for 26.2 minutes!",
        "Spontaneous Juggling - Start juggling random objects at a moment's notice!"
    ];
    
    // Quest Data Structure
    ME2049.Level48.QuestData = {
        id: QUEST_ID,
        name: QUEST_NAME,
        level: QUEST_LEVEL,
        startSwitch: QUEST_STARTED_SWITCH,
        completeSwitch: QUEST_COMPLETED_SWITCH,
        
        // Quest rewards
        rewards: {
            exp: 15000,
            gold: 7500,
            items: [
                {id: GRAND_BOZO_NOSE_ITEM, amount: 1},
                {id: 56, amount: 3}, // High-level healing items
                {id: 66, amount: 1}  // Special equipment
            ]
        },
        
        // Quest steps
        steps: [
            {
                id: "investigate_laughing",
                description: "Investigate reports of uncontrollable laughter",
                switchId: INVESTIGATED_LAUGHING_SWITCH
            },
            {
                id: "meet_sad_mime",
                description: "Meet The Sad Mime for help",
                switchId: MET_SAD_MIME_SWITCH
            },
            {
                id: "complete_clown_training",
                description: "Complete clown training to infiltrate the network",
                switchId: COMPLETED_CLOWN_TRAINING_SWITCH
            },
            {
                id: "discover_plan",
                description: "Discover Grand Bozo's plan",
                switchId: DISCOVERED_PLAN_SWITCH
            },
            {
                id: "sabotage_gas",
                description: "Sabotage the Laughing Gas 2.0 production",
                switchId: SABOTAGED_GAS_SWITCH
            },
            {
                id: "defeat_grand_bozo",
                description: "Defeat Grand Bozo and his Killer Komedy squad",
                switchId: QUEST_COMPLETED_SWITCH
            }
        ]
    };
    
    // Judge Bozo NPC Event
    ME2049.Level48.JudgeBozoEvent = {
        id: 0,
        name: "Judge Bozo",
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
                    {"code":401,"indent":0,"parameters":["JUDGE BOZO: *adjusting an enormous powdered wig*"]},
                    {"code":401,"indent":0,"parameters":["Court is adjourned for today! The defendant"]},
                    {"code":401,"indent":0,"parameters":["has been sentenced to three hours in the"]},
                    {"code":401,"indent":0,"parameters":["tickle chamber for excessive seriousness!"]},
                    {"code":101,"indent":0,"parameters":["People1",0,0,2]},
                    {"code":401,"indent":0,"parameters":["JUDGE BOZO: *notices you*"]},
                    {"code":401,"indent":0,"parameters":["Ah! A potential juror! How do you plead?"]},
                    {"code":401,"indent":0,"parameters":["Guilty or not guilty of having a sense"]},
                    {"code":401,"indent":0,"parameters":["of humor? Choose carefully! Hee hee hee!"]},
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
                // Quest in progress - before discovering plan
                conditions: {
                    actorId: 1, actorValid: false, 
                    itemId: 1, itemValid: false, 
                    selfSwitchCh: "A", selfSwitchValid: false, 
                    switch1Id: QUEST_STARTED_SWITCH, switch1Valid: true, 
                    switch2Id: DISCOVERED_PLAN_SWITCH, switch2Valid: false, 
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
                    {"code":111,"indent":0,"parameters":[1,COMPLETED_CLOWN_TRAINING_SWITCH,0]},
                    {"code":101,"indent":1,"parameters":["People1",0,0,2]},
                    {"code":401,"indent":1,"parameters":["JUDGE BOZO: *now wearing a sash that reads"]},
                    {"code":401,"indent":1,"parameters":["'Grand Inquisitor of Mirth'*"]},
                    {"code":401,"indent":1,"parameters":["The Clown Court is in session! All rise"]},
                    {"code":401,"indent":1,"parameters":["for the honorable Grand Bozo!"]},
                    {"code":101,"indent":1,"parameters":["People1",0,0,2]},
                    {"code":401,"indent":1,"parameters":["JUDGE BOZO: *whispers to you*"]},
                    {"code":401,"indent":1,"parameters":["You're not a real clown, are you? I can tell."]},
                    {"code":401,"indent":1,"parameters":["Your shoes are at least three sizes too small!"]},
                    {"code":401,"indent":1,"parameters":["Complete your training before coming back!"]},
                    {"code":0,"indent":1,"parameters":[]},
                    {"code":411,"indent":0,"parameters":[]},
                    {"code":111,"indent":1,"parameters":[12,"$gameParty.hasItem($dataItems[" + CLOWN_DISGUISE_ITEM + "])"]},
                    {"code":101,"indent":2,"parameters":["People1",0,0,2]},
                    {"code":401,"indent":2,"parameters":["JUDGE BOZO: *now wearing a sash that reads"]},
                    {"code":401,"indent":2,"parameters":["'Grand Inquisitor of Mirth'*"]},
                    {"code":401,"indent":2,"parameters":["Ah, a fellow practitioner of the sacred art!"]},
                    {"code":401,"indent":2,"parameters":["*examines your clown disguise*"]},
                    {"code":101,"indent":2,"parameters":["People1",0,0,2]},
                    {"code":401,"indent":2,"parameters":["JUDGE BOZO: The Grand Bozo will be pleased"]},
                    {"code":401,"indent":2,"parameters":["with our newest recruit! The underground"]},
                    {"code":401,"indent":2,"parameters":["network grows stronger every day!"]},
                    {"code":401,"indent":2,"parameters":["*winks conspiratorially*"]},
                    {"code":101,"indent":2,"parameters":["People1",0,0,2]},
                    {"code":401,"indent":2,"parameters":["JUDGE BOZO: The Grand Council meets tonight"]},
                    {"code":401,"indent":2,"parameters":["beneath The Laughing Stock. The password is"]},
                    {"code":401,"indent":2,"parameters":["'The pie flies at midnight.' Don't be late!"]},
                    {"code":401,"indent":2,"parameters":["Our glorious revolution begins soon! HONK HONK!"]},
                    {"code":121,"indent":2,"parameters":[DISCOVERED_PLAN_SWITCH,DISCOVERED_PLAN_SWITCH,0]},
                    {"code":0,"indent":2,"parameters":[]},
                    {"code":411,"indent":1,"parameters":[]},
                    {"code":101,"indent":2,"parameters":["People1",0,0,2]},
                    {"code":401,"indent":2,"parameters":["JUDGE BOZO: *narrows eyes suspiciously*"]},
                    {"code":401,"indent":2,"parameters":["You're not a clown! Where's your red nose?"]},
                    {"code":401,"indent":2,"parameters":["Your oversized shoes? Your water-squirting"]},
                    {"code":401,"indent":2,"parameters":["flower? IMPOSTER!"]},
                    {"code":101,"indent":2,"parameters":["People1",0,0,2]},
                    {"code":401,"indent":2,"parameters":["JUDGE BOZO: BAILIFF! Remove this humorless"]},
                    {"code":401,"indent":2,"parameters":["individual from my courtroom! And prepare"]},
                    {"code":401,"indent":2,"parameters":["the custard catapult for immediate use!"]},
                    {"code":401,"indent":2,"parameters":["*honks nose threateningly*"]},
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
                moveType: 0,
                priorityType: 1,
                stepAnime: false,
                through: false,
                trigger: 0,
                walkAnime: true
            },
            {
                // After discovering plan
                conditions: {
                    actorId: 1, actorValid: false, 
                    itemId: 1, itemValid: false, 
                    selfSwitchCh: "A", selfSwitchValid: false, 
                    switch1Id: DISCOVERED_PLAN_SWITCH, switch1Valid: true, 
                    switch2Id: QUEST_COMPLETED_SWITCH, switch2Valid: false, 
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
                    {"code":401,"indent":0,"parameters":["JUDGE BOZO: *checking a comically large watch*"]},
                    {"code":401,"indent":0,"parameters":["The Grand Council meeting is tonight! The"]},
                    {"code":401,"indent":0,"parameters":["Laughing Gas 2.0 production facility is"]},
                    {"code":401,"indent":0,"parameters":["almost ready for the global release!"]},
                    {"code":101,"indent":0,"parameters":["People1",0,0,2]},
                    {"code":401,"indent":0,"parameters":["JUDGE BOZO: Soon, everyone will experience"]},
                    {"code":401,"indent":0,"parameters":["the joy of uncontrollable laughter! No more"]},
                    {"code":401,"indent":0,"parameters":["sadness! No more seriousness! Just eternal"]},
                    {"code":401,"indent":0,"parameters":["mirth! Isn't that WONDERFUL? HAHAHAHAHA!"]},
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
                    characterName: "People1", 
                    direction: 2, 
                    pattern: 1, 
                    tileId: 0
                },
                list: [
                    {"code":101,"indent":0,"parameters":["People1",0,0,2]},
                    {"code":401,"indent":0,"parameters":["JUDGE BOZO: *makeup smeared, wig askew*"]},
                    {"code":401,"indent":0,"parameters":["I hereby sentence myself to community"]},
                    {"code":401,"indent":0,"parameters":["service for conspiracy to commit forced"]},
                    {"code":401,"indent":0,"parameters":["hilarity. *sighs deeply*"]},
                    {"code":101,"indent":0,"parameters":["People1",0,0,2]},
                    {"code":401,"indent":0,"parameters":["JUDGE BOZO: I've learned my lesson. Humor"]},
                    {"code":401,"indent":0,"parameters":["should be consensual, not mandatory."]},
                    {"code":401,"indent":0,"parameters":["I'll be performing free birthday parties"]},
                    {"code":401,"indent":0,"parameters":["for underprivileged children as penance."]},
                    {"code":101,"indent":0,"parameters":["People1",0,0,2]},
                    {"code":401,"indent":0,"parameters":["JUDGE BOZO: *offers you a small red nose*"]},
                    {"code":401,"indent":0,"parameters":["Here, take the Grand Bozo's nose as a token"]},
                    {"code":401,"indent":0,"parameters":["of my appreciation. It grants the wearer"]},
                    {"code":401,"indent":0,"parameters":["immunity from all pie-based attacks."]},
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
    
    // Giggles McGee NPC Event
    ME2049.Level48.GigglesEvent = {
        id: 0,
        name: "Giggles McGee",
        note: "",
        pages: [
            {
                // Initial state - Quest started but not met Sad Mime
                conditions: {
                    actorId: 1, actorValid: false, 
                    itemId: 1, itemValid: false, 
                    selfSwitchCh: "A", selfSwitchValid: false, 
                    switch1Id: QUEST_STARTED_SWITCH, switch1Valid: true, 
                    switch2Id: MET_SAD_MIME_SWITCH, switch2Valid: false, 
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
                    {"code":401,"indent":0,"parameters":["GIGGLES: *laughing uncontrollably*"]},
                    {"code":401,"indent":0,"parameters":["HAHAHAHAHA! Oh my! HEEHEEHEE! I can't"]},
                    {"code":401,"indent":0,"parameters":["stop! BWAHAHAHAHA! Help! TEEHEEHEEHEE!"]},
                    {"code":401,"indent":0,"parameters":["*tears streaming down face*"]},
                    {"code":101,"indent":0,"parameters":["People4",0,0,2]},
                    {"code":401,"indent":0,"parameters":["GIGGLES: *gasping between laughs*"]},
                    {"code":401,"indent":0,"parameters":["The... HAHA... Laughing... HEEHEE... Stock!"]},
                    {"code":401,"indent":0,"parameters":["They're... BWAHAHA... recruiting! HAHAHA!"]},
                    {"code":401,"indent":0,"parameters":["*points to comedy club before doubling over*"]},
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
                // After meeting Sad Mime, before completing training
                conditions: {
                    actorId: 1, actorValid: false, 
                    itemId: 1, itemValid: false, 
                    selfSwitchCh: "A", selfSwitchValid: false, 
                    switch1Id: MET_SAD_MIME_SWITCH, switch1Valid: true, 
                    switch2Id: COMPLETED_CLOWN_TRAINING_SWITCH, switch2Valid: false, 
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
                    {"code":401,"indent":0,"parameters":["GIGGLES: *still laughing but now with a"]},
                    {"code":401,"indent":0,"parameters":["sinister undertone*"]},
                    {"code":401,"indent":0,"parameters":["So you met the Sad Mime? HAHAHA! That"]},
                    {"code":401,"indent":0,"parameters":["traitor to the cause! TEEHEEHEEHEE!"]},
                    {"code":101,"indent":0,"parameters":["People4",0,0,2]},
                    {"code":401,"indent":0,"parameters":["GIGGLES: *leans in conspiratorially*"]},
                    {"code":401,"indent":0,"parameters":["I can help you with your clown training!"]},
                    {"code":401,"indent":0,"parameters":["HAHAHA! Just tell me a joke! If it's"]},
                    {"code":401,"indent":0,"parameters":["terrible enough, you pass! BWAHAHAHA!"]},
                    {"code":102,"indent":0,"parameters":[["Tell a joke","No thanks"],1]},
                    {"code":402,"indent":0,"parameters":[0,"Tell a joke"]},
                    {"code":101,"indent":1,"parameters":["People4",0,0,2]},
                    {"code":401,"indent":1,"parameters":["YOU: " + TERRIBLE_JOKES[Math.floor(Math.random() * TERRIBLE_JOKES.length)]]},
                    {"code":101,"indent":1,"parameters":["People4",0,0,2]},
                    {"code":401,"indent":1,"parameters":["GIGGLES: *stares blankly, then bursts into"]},
                    {"code":401,"indent":1,"parameters":["exaggerated laughter*"]},
                    {"code":401,"indent":1,"parameters":["THAT'S TERRIBLE! HAHAHAHAHA! PERFECT!"]},
                    {"code":401,"indent":1,"parameters":["You're a natural! HEEHEEHEEHEE!"]},
                    {"code":101,"indent":1,"parameters":["People4",0,0,2]},
                    {"code":401,"indent":1,"parameters":["GIGGLES: *hands you a clown disguise*"]},
                    {"code":401,"indent":1,"parameters":["Here's your official clown gear! HAHAHA!"]},
                    {"code":401,"indent":1,"parameters":["Now you can infiltrate the network! Just"]},
                    {"code":401,"indent":1,"parameters":["don't betray us like that mime! TEEHEE!"]},
                    {"code":126,"indent":1,"parameters":[CLOWN_DISGUISE_ITEM,0,0,1]},
                    {"code":126,"indent":1,"parameters":[JOKE_BOOK_ITEM,0,0,1]},
                    {"code":121,"indent":1,"parameters":[COMPLETED_CLOWN_TRAINING_SWITCH,COMPLETED_CLOWN_TRAINING_SWITCH,0]},
                    {"code":0,"indent":1,"parameters":[]},
                    {"code":402,"indent":0,"parameters":[1,"No thanks"]},
                    {"code":101,"indent":1,"parameters":["People4",0,0,2]},
                    {"code":401,"indent":1,"parameters":["GIGGLES: *laughs even harder*"]},
                    {"code":401,"indent":1,"parameters":["HAHAHAHAHA! Your loss! BWAHAHAHA!"]},
                    {"code":401,"indent":1,"parameters":["Come back when you're ready to embrace"]},
                    {"code":401,"indent":1,"parameters":["the hilarity! TEEHEEHEEHEE!"]},
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
                moveType: 1,
                priorityType: 1,
                stepAnime: true,
                through: false,
                trigger: 0,
                walkAnime: true
            },
            {
                // After completing training, before sabotaging gas
                conditions: {
                    actorId: 1, actorValid: false, 
                    itemId: 1, itemValid: false, 
                    selfSwitchCh: "A", selfSwitchValid: false, 
                    switch1Id: COMPLETED_CLOWN_TRAINING_SWITCH, switch1Valid: true, 
                    switch2Id: SABOTAGED_GAS_SWITCH, switch2Valid: false, 
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
                    {"code":401,"indent":0,"parameters":["GIGGLES: *laughing but watching you closely*"]},
                    {"code":401,"indent":0,"parameters":["HAHAHA! How's the infiltration going?"]},
                    {"code":401,"indent":0,"parameters":["Found anything interesting? TEEHEE!"]},
                    {"code":401,"indent":0,"parameters":["*eyes narrow slightly between laughs*"]},
                    {"code":111,"indent":0,"parameters":[1,DISCOVERED_PLAN_SWITCH,0]},
                    {"code":101,"indent":1,"parameters":["People4",0,0,2]},
                    {"code":401,"indent":1,"parameters":["GIGGLES: *leans in*"]},
                    {"code":401,"indent":1,"parameters":["The Laughing Gas facility is in the basement"]},
                    {"code":401,"indent":1,"parameters":["of The Laughing Stock! HAHAHA! But you'll"]},
                    {"code":401,"indent":1,"parameters":["never get past security! TEEHEEHEEHEE!"]},
                    {"code":0,"indent":1,"parameters":[]},
                    {"code":411,"indent":0,"parameters":[]},
                    {"code":101,"indent":1,"parameters":["People4",0,0,2]},
                    {"code":401,"indent":1,"parameters":["GIGGLES: *suspicious laugh*"]},
                    {"code":401,"indent":1,"parameters":["You're working with the Sad Mime, aren't you?"]},
                    {"code":401,"indent":1,"parameters":["HAHAHA! I knew it! You'll never stop our"]},
                    {"code":401,"indent":1,"parameters":["glorious revolution of mirth! BWAHAHAHA!"]},
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
                // After sabotaging gas
                conditions: {
                    actorId: 1, actorValid: false, 
                    itemId: 1, itemValid: false, 
                    selfSwitchCh: "A", selfSwitchValid: false, 
                    switch1Id: SABOTAGED_GAS_SWITCH, switch1Valid: true, 
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
                    {"code":401,"indent":0,"parameters":["GIGGLES: *no longer laughing, looks angry*"]},
                    {"code":401,"indent":0,"parameters":["YOU! You sabotaged the Laughing Gas facility!"]},
                    {"code":401,"indent":0,"parameters":["The Grand Bozo is furious! The Killer Komedy"]},
                    {"code":401,"indent":0,"parameters":["squad has been dispatched to deal with you!"]},
                    {"code":101,"indent":0,"parameters":["People4",0,0,2]},
                    {"code":401,"indent":0,"parameters":["GIGGLES: *pulls out a seltzer bottle*"]},
                    {"code":401,"indent":0,"parameters":["I should have known you were a spy! No one"]},
                    {"code":401,"indent":0,"parameters":["tells jokes that bad unless they're trying"]},
                    {"code":401,"indent":0,"parameters":["too hard! Prepare to face clown justice!"]},
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
                    {"code":401,"indent":0,"parameters":["GIGGLES: *makeup washed off, looking sheepish*"]},
                    {"code":401,"indent":0,"parameters":["I... I don't know what came over me. One day"]},
                    {"code":401,"indent":0,"parameters":["I was a regular comedian, the next I was"]},
                    {"code":401,"indent":0,"parameters":["plotting world domination through laughter."]},
                    {"code":101,"indent":0,"parameters":["People4",0,0,2]},
                    {"code":401,"indent":0,"parameters":["GIGGLES: The Grand Bozo's charisma was just"]},
                    {"code":401,"indent":0,"parameters":["too powerful to resist. His jokes weren't"]},
                    {"code":401,"indent":0,"parameters":["even that funny! I think there was something"]},
                    {"code":401,"indent":0,"parameters":["in the seltzer water..."]},
                    {"code":101,"indent":0,"parameters":["People4",0,0,2]},
                    {"code":401,"indent":0,"parameters":["GIGGLES: I'm going back to regular stand-up."]},
                    {"code":401,"indent":0,"parameters":["No more weaponized humor, I promise."]},
                    {"code":401,"indent":0,"parameters":["Although... *smiles* I do have this great"]},
                    {"code":401,"indent":0,"parameters":["new bit about apocalypses I'm working on..."]},
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
    
    // The Sad Mime NPC Event
    ME2049.Level48.SadMimeEvent = {
        id: 0,
        name: "The Sad Mime",
        note: "",
        pages: [
            {
                // Initial state - Quest started but not met mime
                conditions: {
                    actorId: 1, actorValid: false, 
                    itemId: 1, itemValid: false, 
                    selfSwitchCh: "A", selfSwitchValid: false, 
                    switch1Id: INVESTIGATED_LAUGHING_SWITCH, switch1Valid: true, 
                    switch2Id: MET_SAD_MIME_SWITCH, switch2Valid: false, 
                    variableId: 1, variableValid: false, variableValue: 0
                },
                directionFix: false,
                image: {
                    characterIndex: 0, 
                    characterName: "People2", 
                    direction: 2, 
                    pattern: 1, 
                    tileId: 0
                },
                list: [
                    {"code":101,"indent":0,"parameters":["People2",0,0,2]},
                    {"code":401,"indent":0,"parameters":["*A mime with a painted tear on their cheek"]},
                    {"code":401,"indent":0,"parameters":["gestures frantically at you*"]},
                    {"code":401,"indent":0,"parameters":["*They point at their mouth, then shake"]},
                    {"code":401,"indent":0,"parameters":["their head, indicating they can't speak*"]},
                    {"code":101,"indent":0,"parameters":["People2",0,0,2]},
                    {"code":401,"indent":0,"parameters":["*The mime pretends to laugh, then makes"]},
                    {"code":401,"indent":0,"parameters":["a horrified face, then mimes being trapped"]},
                    {"code":401,"indent":0,"parameters":["in a box of laughter*"]},
                    {"code":102,"indent":0,"parameters":[["Try to understand","Walk away"],1]},
                    {"code":402,"indent":0,"parameters":[0,"Try to understand"]},
                    {"code":101,"indent":1,"parameters":["People2",0,0,2]},
                    {"code":401,"indent":1,"parameters":["*The mime looks relieved and begins an"]},
                    {"code":401,"indent":1,"parameters":["elaborate charade*"]},
                    {"code":401,"indent":1,"parameters":["*First, they pretend to be a clown, then"]},
                    {"code":401,"indent":1,"parameters":["point to The Laughing Stock comedy club*"]},
                    {"code":101,"indent":1,"parameters":["People2",0,0,2]},
                    {"code":401,"indent":1,"parameters":["*Next, they mime releasing gas from a canister,"]},
                    {"code":401,"indent":1,"parameters":["followed by everyone laughing uncontrollably*"]},
                    {"code":401,"indent":1,"parameters":["*Finally, they pretend to be a judge banging"]},
                    {"code":401,"indent":1,"parameters":["a gavel, then put on an invisible crown*"]},
                    {"code":101,"indent":1,"parameters":["People2",0,0,2]},
                    {"code":401,"indent":1,"parameters":["*The mime hands you a small vial labeled"]},
                    {"code":401,"indent":1,"parameters":["'Laughing Gas Antidote' and mimes putting"]},
                    {"code":401,"indent":1,"parameters":["on a disguise*"]},
                    {"code":126,"indent":1,"parameters":[LAUGHING_GAS_ANTIDOTE_ITEM,0,0,1]},
                    {"code":121,"indent":1,"parameters":[MET_SAD_MIME_SWITCH,MET_SAD_MIME_SWITCH,0]},
                    {"code":0,"indent":1,"parameters":[]},
                    {"code":402,"indent":0,"parameters":[1,"Walk away"]},
                    {"code":101,"indent":1,"parameters":["People2",0,0,2]},
                    {"code":401,"indent":1,"parameters":["*The mime looks disappointed and tries to"]},
                    {"code":401,"indent":1,"parameters":["get your attention by performing an impressive"]},
                    {"code":401,"indent":1,"parameters":["series of backflips*"]},
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
                // After meeting, before completing training
                conditions: {
                    actorId: 1, actorValid: false, 
                    itemId: 1, itemValid: false, 
                    selfSwitchCh: "A", selfSwitchValid: false, 
                    switch1Id: MET_SAD_MIME_SWITCH, switch1Valid: true, 
                    switch2Id: COMPLETED_CLOWN_TRAINING_SWITCH, switch2Valid: false, 
                    variableId: 1, variableValid: false, variableValue: 0
                },
                directionFix: false,
                image: {
                    characterIndex: 0, 
                    characterName: "People2", 
                    direction: 2, 
                    pattern: 1, 
                    tileId: 0
                },
                list: [
                    {"code":101,"indent":0,"parameters":["People2",0,0,2]},
                    {"code":401,"indent":0,"parameters":["*The mime points at you, then mimes putting"]},
                    {"code":401,"indent":0,"parameters":["on a clown costume and makes a questioning"]},
                    {"code":401,"indent":0,"parameters":["gesture*"]},
                    {"code":101,"indent":0,"parameters":["People2",0,0,2]},
                    {"code":401,"indent":0,"parameters":["*They point to Giggles McGee, then make"]},
                    {"code":401,"indent":0,"parameters":["a series of gestures suggesting you should"]},
                    {"code":401,"indent":0,"parameters":["talk to her to complete your clown training*"]},
                    {"code":101,"indent":0,"parameters":["People2",0,0,2]},
                    {"code":401,"indent":0,"parameters":["*The mime pretends to tell a terrible joke,"]},
                    {"code":401,"indent":0,"parameters":["then gives an exaggerated thumbs up*"]},
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
                // After completing training, before sabotaging gas
                conditions: {
                    actorId: 1, actorValid: false, 
                    itemId: 1, itemValid: false, 
                    selfSwitchCh: "A", selfSwitchValid: false, 
                    switch1Id: COMPLETED_CLOWN_TRAINING_SWITCH, switch1Valid: true, 
                    switch2Id: SABOTAGED_GAS_SWITCH, switch2Valid: false, 
                    variableId: 1, variableValid: false, variableValue: 0
                },
                directionFix: false,
                image: {
                    characterIndex: 0, 
                    characterName: "People2", 
                    direction: 2, 
                    pattern: 1, 
                    tileId: 0
                },
                list: [
                    {"code":111,"indent":0,"parameters":[1,DISCOVERED_PLAN_SWITCH,0]},
                    {"code":101,"indent":1,"parameters":["People2",0,0,2]},
                    {"code":401,"indent":1,"parameters":["*The mime looks at your clown disguise and"]},
                    {"code":401,"indent":1,"parameters":["gives an approving nod*"]},
                    {"code":401,"indent":1,"parameters":["*They point to Judge Bozo and make a series"]},
                    {"code":401,"indent":1,"parameters":["of gestures suggesting you talk to him*"]},
                    {"code":0,"indent":1,"parameters":[]},
                    {"code":411,"indent":0,"parameters":[]},
                    {"code":101,"indent":1,"parameters":["People2",0,0,2]},
                    {"code":401,"indent":1,"parameters":["*The mime mimes opening a door with a key,"]},
                    {"code":401,"indent":1,"parameters":["then points to The Laughing Stock*"]},
                    {"code":401,"indent":1,"parameters":["*They make a gesture like they're pouring"]},
                    {"code":401,"indent":1,"parameters":["something into a container of gas*"]},
                    {"code":101,"indent":1,"parameters":["People2",0,0,2]},
                    {"code":401,"indent":1,"parameters":["*The mime points to the Laughing Gas Antidote"]},
                    {"code":401,"indent":1,"parameters":["they gave you, then mimes sabotaging a machine*"]},
                    {"code":401,"indent":1,"parameters":["*They give you a thumbs up and a determined nod*"]},
                    {"code":121,"indent":1,"parameters":[SABOTAGED_GAS_SWITCH,SABOTAGED_GAS_SWITCH,0]},
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
                // After sabotaging gas
                conditions: {
                    actorId: 1, actorValid: false, 
                    itemId: 1, itemValid: false, 
                    selfSwitchCh: "A", selfSwitchValid: false, 
                    switch1Id: SABOTAGED_GAS_SWITCH, switch1Valid: true, 
                    switch2Id: QUEST_COMPLETED_SWITCH, switch2Valid: false, 
                    variableId: 1, variableValid: false, variableValue: 0
                },
                directionFix: false,
                image: {
                    characterIndex: 0, 
                    characterName: "People2", 
                    direction: 2, 
                    pattern: 1, 
                    tileId: 0
                },
                list: [
                    {"code":101,"indent":0,"parameters":["People2",0,0,2]},
                    {"code":401,"indent":0,"parameters":["*The mime looks excited and mimes a confrontation*"]},
                    {"code":401,"indent":0,"parameters":["*They pretend to be a large, imposing figure"]},
                    {"code":401,"indent":0,"parameters":["with a crown and a big red nose*"]},
                    {"code":101,"indent":0,"parameters":["People2",0,0,2]},
                    {"code":401,"indent":0,"parameters":["*The mime then pretends to be you, heroically"]},
                    {"code":401,"indent":0,"parameters":["defeating this figure in an epic battle*"]},
                    {"code":401,"indent":0,"parameters":["*They point to The Laughing Stock's basement"]},
                    {"code":401,"indent":0,"parameters":["and make a 'go now' gesture*"]},
                    {"code":301,"indent":0,"parameters":[0,11,false,false]},
                    {"code":601,"indent":0,"parameters":[]},
                    {"code":121,"indent":1,"parameters":[QUEST_COMPLETED_SWITCH,QUEST_COMPLETED_SWITCH,0]},
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
                    characterName: "People2", 
                    direction: 2, 
                    pattern: 1, 
                    tileId: 0
                },
                list: [
                    {"code":101,"indent":0,"parameters":["People2",0,0,2]},
                    {"code":401,"indent":0,"parameters":["*The mime wipes away their painted tear and"]},
                    {"code":401,"indent":0,"parameters":["gives you a genuine smile*"]},
                    {"code":401,"indent":0,"parameters":["*They mime a small bow of gratitude*"]},
                    {"code":101,"indent":0,"parameters":["People2",0,0,2]},
                    {"code":401,"indent":0,"parameters":["*The mime pulls out a small notepad and writes:*"]},
                    {"code":401,"indent":0,"parameters":["'Thank you for saving MegaEarth from forced"]},
                    {"code":401,"indent":0,"parameters":["hilarity. Laughter should be a choice, not"]},
                    {"code":401,"indent":0,"parameters":["a weapon. I'm going back to regular miming.'"]},
                    {"code":101,"indent":0,"parameters":["People2",0,0,2]},
                    {"code":401,"indent":0,"parameters":["*The mime pretends to be trapped in an invisible"]},
                    {"code":401,"indent":0,"parameters":["box, but now seems to be enjoying it*"]},
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
    
    // Grand Bozo Boss Event
    ME2049.Level48.GrandBozoEvent = {
        id: 0,
        name: "Grand Bozo",
        note: "",
        pages: [
            {
                // Initial state - After sabotaging gas
                conditions: {
                    actorId: 1, actorValid: false, 
                    itemId: 1, itemValid: false, 
                    selfSwitchCh: "A", selfSwitchValid: false, 
                    switch1Id: SABOTAGED_GAS_SWITCH, switch1Valid: true, 
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
                    {"code":401,"indent":0,"parameters":["*An enormous clown with a golden crown and"]},
                    {"code":401,"indent":0,"parameters":["a glowing red nose stands before you*"]},
                    {"code":401,"indent":0,"parameters":["*He is surrounded by four menacing clowns"]},
                    {"code":401,"indent":0,"parameters":["in combat makeup - the Killer Komedy squad*"]},
                    {"code":101,"indent":0,"parameters":["",0,0,2]},
                    {"code":401,"indent":0,"parameters":["GRAND BOZO: SO! The saboteur reveals themselves!"]},
                    {"code":401,"indent":0,"parameters":["*honks nose dramatically*"]},
                    {"code":401,"indent":0,"parameters":["You've ruined YEARS of planning! My beautiful"]},
                    {"code":401,"indent":0,"parameters":["Laughing Gas 2.0 - neutralized! NEUTRALIZED!"]},
                    {"code":101,"indent":0,"parameters":["",0,0,2]},
                    {"code":401,"indent":0,"parameters":["GRAND BOZO: Do you have ANY idea how long it"]},
                    {"code":401,"indent":0,"parameters":["takes to develop a gas that induces permanent"]},
                    {"code":401,"indent":0,"parameters":["uncontrollable laughter without the side effects"]},
                    {"code":401,"indent":0,"parameters":["of death by asphyxiation? YEARS! DECADES!"]},
                    {"code":101,"indent":0,"parameters":["",0,0,2]},
                    {"code":401,"indent":0,"parameters":["GRAND BOZO: *adjusts oversized bow tie*"]},
                    {"code":401,"indent":0,"parameters":["No matter! The Killer Komedy squad and I will"]},
                    {"code":401,"indent":0,"parameters":["deal with you the old-fashioned way - with"]},
                    {"code":401,"indent":0,"parameters":["PHYSICAL COMEDY! ATTACK, MY MINIONS!"]},
                    {"code":301,"indent":0,"parameters":[0,11,false,false]},
                    {"code":601,"indent":0,"parameters":[]},
                    {"code":101,"indent":1,"parameters":["",0,0,2]},
                    {"code":401,"indent":1,"parameters":["*Grand Bozo falls to his knees, his crown askew*"]},
                    {"code":401,"indent":1,"parameters":["GRAND BOZO: Impossible! Defeated by a... a..."]},
                    {"code":401,"indent":1,"parameters":["straight man? *honk* The irony is not lost on me."]},
                    {"code":401,"indent":1,"parameters":["*his nose dims as he collapses dramatically*"]},
                    {"code":126,"indent":1,"parameters":[GRAND_BOZO_NOSE_ITEM,0,0,1]},
                    {"code":121,"indent":1,"parameters":[QUEST_COMPLETED_SWITCH,QUEST_COMPLETED_SWITCH,0]},
                    {"code":123,"indent":1,"parameters":["A",0]},
                    {"code":0,"indent":1,"parameters":[]},
                    {"code":603,"indent":0,"parameters":[]},
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
                walkAnime: true
            },
            {
                // After defeating Grand Bozo
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
    
    // Laughing Citizen NPC Event
    ME2049.Level48.LaughingCitizenEvent = {
        id: 0,
        name: "Laughing Citizen",
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
                    {"code":401,"indent":0,"parameters":["*A citizen laughs uncontrollably*"]},
                    {"code":401,"indent":0,"parameters":["HAHAHAHAHA! I can't... HEEHEEHEE!"]},
                    {"code":401,"indent":0,"parameters":["Stop! BWAHAHAHA! Help! HAHAHA!"]},
                    {"code":401,"indent":0,"parameters":["*tears streaming down their face*"]},
                    {"code":101,"indent":0,"parameters":["People3",0,0,2]},
                    {"code":401,"indent":0,"parameters":["*They point toward The Laughing Stock*"]},
                    {"code":401,"indent":0,"parameters":["The... HAHAHA... comedy show! HEEHEE!"]},
                    {"code":401,"indent":0,"parameters":["Something in the... BWAHAHA... air!"]},
                    {"code":401,"indent":0,"parameters":["*doubles over in painful laughter*"]},
                    {"code":121,"indent":0,"parameters":[QUEST_STARTED_SWITCH,QUEST_STARTED_SWITCH,0]},
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
                    characterName: "People3", 
                    direction: 2, 
                    pattern: 1, 
                    tileId: 0
                },
                list: [
                    {"code":101,"indent":0,"parameters":["People3",0,0,2]},
                    {"code":401,"indent":0,"parameters":["*Still laughing uncontrollably*"]},
                    {"code":401,"indent":0,"parameters":["HAHAHAHAHA! Please... HEEHEE... make it"]},
                    {"code":401,"indent":0,"parameters":["stop! BWAHAHAHA! My sides... HAHAHA!"]},
                    {"code":401,"indent":0,"parameters":["*clutches stomach in pain*"]},
                    {"code":111,"indent":0,"parameters":[12,"$gameParty.hasItem($dataItems[" + LAUGH
/*:
 * @plugindesc Level 48 Quests - The Clown Uprising
 * @author MegaEarth2049 Team
 *
 * @help
 * This plugin contains the quests for character level 48.
 * "The Clown Uprising" - The underground network of weaponized clowns has
 * decided that post-A.S.P. MegaEarth needs more "joy" - forcibly if necessary.
 */

var Imported = Imported || {};
Imported.ME2049_Level48_Quests = true;

var ME2049 = ME2049 || {};
ME2049.Level48 = ME2049.Level48 || {};

(function() {
    // Constants and Configuration
    var QUEST_LEVEL = 48;
    var QUEST_NAME = "The Clown Uprising";
    var QUEST_ID = "clown_uprising";
    
    // Switch IDs for quest tracking
    var QUEST_STARTED_SWITCH = 1070;
    var QUEST_COMPLETED_SWITCH = 1071;
    var INVESTIGATED_LAUGHING_SWITCH = 1072;
    var MET_SAD_MIME_SWITCH = 1073;
    var COMPLETED_CLOWN_TRAINING_SWITCH = 1074;
    var DISCOVERED_PLAN_SWITCH = 1075;
    var SABOTAGED_GAS_SWITCH = 1076;
    
    // Item IDs
    var CLOWN_DISGUISE_ITEM = 220;
    var JOKE_BOOK_ITEM = 221;
    var LAUGHING_GAS_ANTIDOTE_ITEM = 222;
    var GRAND_BOZO_NOSE_ITEM = 223;
    
    // Terrible jokes for player to tell
    var TERRIBLE_JOKES = [
        "Why don't scientists trust atoms? Because they make up everything!",
        "What's the best thing about Switzerland? I don't know, but the flag is a big plus!",
        "Did you hear about the mathematician who's afraid of negative numbers? He'll stop at nothing to avoid them!",
        "Why don't skeletons fight each other? They don't have the guts!",
        "What do you call a fake noodle? An impasta!",
        "Why did the scarecrow win an award? Because he was outstanding in his field!",
        "How do you organize a space party? You planet!",
        "What do you call a parade of rabbits hopping backwards? A receding hare-line!",
        "Why don't eggs tell jokes? They'd crack each other up!",
        "What's brown and sticky? A stick!"
    ];
    
    // Clown training exercises
    var CLOWN_EXERCISES = [
        "Pie Throwing Accuracy Test - Hit the target with 80% accuracy!",
        "Car Stuffing Endurance Trial - Fit 15 clowns in a single vehicle!",
        "Seltzer Bottle Quick-Draw - Spray before being sprayed!",
        "Balloon Animal Speed Challenge - Make a giraffe in under 10 seconds!",
        "Pratfall Impact Resistance - Fall down stairs without actual injury!",
        "Oversized Shoe Obstacle Course - Navigate while wearing shoes 5x your size!",
        "Honking Morse Code - Communicate complex messages via nose honks!",
        "Custard Pie Resilience - Take 10 pies to the face without flinching!",
        "Tiny Bicycle Marathon - Ride a comically small bike for 26.2 minutes!",
        "Spontaneous Juggling - Start juggling random objects at a moment's notice!"
    ];
    
    // Quest Data Structure
    ME2049.Level48.QuestData = {
        id: QUEST_ID,
        name: QUEST_NAME,
        level: QUEST_LEVEL,
        startSwitch: QUEST_STARTED_SWITCH,
        completeSwitch: QUEST_COMPLETED_SWITCH,
        
        // Quest rewards
        rewards: {
            exp: 15000,
            gold: 7500,
            items: [
                {id: GRAND_BOZO_NOSE_ITEM, amount: 1},
                {id: 56, amount: 3}, // High-level healing items
                {id: 66, amount: 1}  // Special equipment
            ]
        },
        
        // Quest steps
        steps: [
            {
                id: "investigate_laughing",
                description: "Investigate reports of uncontrollable laughter",
                switchId: INVESTIGATED_LAUGHING_SWITCH
            },
            {
                id: "meet_sad_mime",
                description: "Meet The Sad Mime for help",
                switchId: MET_SAD_MIME_SWITCH
            },
            {
                id: "complete_clown_training",
                description: "Complete clown training to infiltrate the network",
                switchId: COMPLETED_CLOWN_TRAINING_SWITCH
            },
            {
                id: "discover_plan",
                description: "Discover Grand Bozo's plan",
                switchId: DISCOVERED_PLAN_SWITCH
            },
            {
                id: "sabotage_gas",
                description: "Sabotage the Laughing Gas 2.0 production",
                switchId: SABOTAGED_GAS_SWITCH
            },
            {
                id: "defeat_grand_bozo",
                description: "Defeat Grand Bozo and his Killer Komedy squad",
                switchId: QUEST_COMPLETED_SWITCH
            }
        ]
    };
    
    // Judge Bozo NPC Event
    ME2049.Level48.JudgeBozoEvent = {
        id: 0,
        name: "Judge Bozo",
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
                    {"code":401,"indent":0,"parameters":["JUDGE BOZO: *adjusting an enormous powdered wig*"]},
                    {"code":401,"indent":0,"parameters":["Court is adjourned for today! The defendant"]},
                    {"code":401,"indent":0,"parameters":["has been sentenced to three hours in the"]},
                    {"code":401,"indent":0,"parameters":["tickle chamber for excessive seriousness!"]},
                    {"code":101,"indent":0,"parameters":["People1",0,0,2]},
                    {"code":401,"indent":0,"parameters":["JUDGE BOZO: *notices you*"]},
                    {"code":401,"indent":0,"parameters":["Ah! A potential juror! How do you plead?"]},
                    {"code":401,"indent":0,"parameters":["Guilty or not guilty of having a sense"]},
                    {"code":401,"indent":0,"parameters":["of humor? Choose carefully! Hee hee hee!"]},
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
                // Quest in progress - before discovering plan
                conditions: {
                    actorId: 1, actorValid: false, 
                    itemId: 1, itemValid: false, 
                    selfSwitchCh: "A", selfSwitchValid: false, 
                    switch1Id: QUEST_STARTED_SWITCH, switch1Valid: true, 
                    switch2Id: DISCOVERED_PLAN_SWITCH, switch2Valid: false, 
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
                    {"code":111,"indent":0,"parameters":[1,COMPLETED_CLOWN_TRAINING_SWITCH,0]},
                    {"code":101,"indent":1,"parameters":["People1",0,0,2]},
                    {"code":401,"indent":1,"parameters":["JUDGE BOZO: *now wearing a sash that reads"]},
                    {"code":401,"indent":1,"parameters":["'Grand Inquisitor of Mirth'*"]},
                    {"code":401,"indent":1,"parameters":["The Clown Court is in session! All rise"]},
                    {"code":401,"indent":1,"parameters":["for the honorable Grand Bozo!"]},
                    {"code":101,"indent":1,"parameters":["People1",0,0,2]},
                    {"code":401,"indent":1,"parameters":["JUDGE BOZO: *whispers to you*"]},
                    {"code":401,"indent":1,"parameters":["You're not a real clown, are you? I can tell."]},
                    {"code":401,"indent":1,"parameters":["Your shoes are at least three sizes too small!"]},
                    {"code":401,"indent":1,"parameters":["Complete your training before coming back!"]},
                    {"code":0,"indent":1,"parameters":[]},
                    {"code":411,"indent":0,"parameters":[]},
                    {"code":111,"indent":1,"parameters":[12,"$gameParty.hasItem($dataItems[" + CLOWN_DISGUISE_ITEM + "])"]},
                    {"code":101,"indent":2,"parameters":["People1",0,0,2]},
                    {"code":401,"indent":2,"parameters":["JUDGE BOZO: *now wearing a sash that reads"]},
                    {"code":401,"indent":2,"parameters":["'Grand Inquisitor of Mirth'*"]},
                    {"code":401,"indent":2,"parameters":["Ah, a fellow practitioner of the sacred art!"]},
                    {"code":401,"indent":2,"parameters":["*examines your clown disguise*"]},
                    {"code":101,"indent":2,"parameters":["People1",0,0,2]},
                    {"code":401,"indent":2,"parameters":["JUDGE BOZO: The Grand Bozo will be pleased"]},
                    {"code":401,"indent":2,"parameters":["with our newest recruit! The underground"]},
                    {"code":401,"indent":2,"parameters":["network grows stronger every day!"]},
                    {"code":401,"indent":2,"parameters":["*winks conspiratorially*"]},
                    {"code":101,"indent":2,"parameters":["People1",0,0,2]},
                    {"code":401,"indent":2,"parameters":["JUDGE BOZO: The Grand Council meets tonight"]},
                    {"code":401,"indent":2,"parameters":["beneath The Laughing Stock. The password is"]},
                    {"code":401,"indent":2,"parameters":["'The pie flies at midnight.' Don't be late!"]},
                    {"code":401,"indent":2,"parameters":["Our glorious revolution begins soon! HONK HONK!"]},
                    {"code":121,"indent":2,"parameters":[DISCOVERED_PLAN_SWITCH,DISCOVERED_PLAN_SWITCH,0]},
                    {"code":0,"indent":2,"parameters":[]},
                    {"code":411,"indent":1,"parameters":[]},
                    {"code":101,"indent":2,"parameters":["People1",0,0,2]},
                    {"code":401,"indent":2,"parameters":["JUDGE BOZO: *narrows eyes suspiciously*"]},
                    {"code":401,"indent":2,"parameters":["You're not a clown! Where's your red nose?"]},
                    {"code":401,"indent":2,"parameters":["Your oversized shoes? Your water-squirting"]},
                    {"code":401,"indent":2,"parameters":["flower? IMPOSTER!"]},
                    {"code":101,"indent":2,"parameters":["People1",0,0,2]},
                    {"code":401,"indent":2,"parameters":["JUDGE BOZO: BAILIFF! Remove this humorless"]},
                    {"code":401,"indent":2,"parameters":["individual from my courtroom! And prepare"]},
                    {"code":401,"indent":2,"parameters":["the custard catapult for immediate use!"]},
                    {"code":401,"indent":2,"parameters":["*honks nose threateningly*"]},
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
                moveType: 0,
                priorityType: 1,
                stepAnime: false,
                through: false,
                trigger: 0,
                walkAnime: true
            },
            {
                // After discovering plan
                conditions: {
                    actorId: 1, actorValid: false, 
                    itemId: 1, itemValid: false, 
                    selfSwitchCh: "A", selfSwitchValid: false, 
                    switch1Id: DISCOVERED_PLAN_SWITCH, switch1Valid: true, 
                    switch2Id: QUEST_COMPLETED_SWITCH, switch2Valid: false, 
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
                    {"code":401,"indent":0,"parameters":["JUDGE BOZO: *checking a comically large watch*"]},
                    {"code":401,"indent":0,"parameters":["The Grand Council meeting is tonight! The"]},
                    {"code":401,"indent":0,"parameters":["Laughing Gas 2.0 production facility is"]},
                    {"code":401,"indent":0,"parameters":["almost ready for the global release!"]},
                    {"code":101,"indent":0,"parameters":["People1",0,0,2]},
                    {"code":401,"indent":0,"parameters":["JUDGE BOZO: Soon, everyone will experience"]},
                    {"code":401,"indent":0,"parameters":["the joy of uncontrollable laughter! No more"]},
                    {"code":401,"indent":0,"parameters":["sadness! No more seriousness! Just eternal"]},
                    {"code":401,"indent":0,"parameters":["mirth! Isn't that WONDERFUL? HAHAHAHAHA!"]},
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
                    characterName: "People1", 
                    direction: 2, 
                    pattern: 1, 
                    tileId: 0
                },
                list: [
                    {"code":101,"indent":0,"parameters":["People1",0,0,2]},
                    {"code":401,"indent":0,"parameters":["JUDGE BOZO: *makeup smeared, wig askew*"]},
                    {"code":401,"indent":0,"parameters":["I hereby sentence myself to community"]},
                    {"code":401,"indent":0,"parameters":["service for conspiracy to commit forced"]},
                    {"code":401,"indent":0,"parameters":["hilarity. *sighs deeply*"]},
                    {"code":101,"indent":0,"parameters":["People1",0,0,2]},
                    {"code":401,"indent":0,"parameters":["JUDGE BOZO: I've learned my lesson. Humor"]},
                    {"code":401,"indent":0,"parameters":["should be consensual, not mandatory."]},
                    {"code":401,"indent":0,"parameters":["I'll be performing free birthday parties"]},
                    {"code":401,"indent":0,"parameters":["for underprivileged children as penance."]},
                    {"code":101,"indent":0,"parameters":["People1",0,0,2]},
                    {"code":401,"indent":0,"parameters":["JUDGE BOZO: *offers you a small red nose*"]},
                    {"code":401,"indent":0,"parameters":["Here, take the Grand Bozo's nose as a token"]},
                    {"code":401,"indent":0,"parameters":["of my appreciation. It grants the wearer"]},
                    {"code":401,"indent":0,"parameters":["immunity from all pie-based attacks."]},
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
    
    // Giggles McGee NPC Event
    ME2049.Level48.GigglesEvent = {
        id: 0,
        name: "Giggles McGee",
        note: "",
        pages: [
            {
                // Initial state - Quest started but not met Sad Mime
                conditions: {
                    actorId: 1, actorValid: false, 
                    itemId: 1, itemValid: false, 
                    selfSwitchCh: "A", selfSwitchValid: false, 
                    switch1Id: QUEST_STARTED_SWITCH, switch1Valid: true, 
                    switch2Id: MET_SAD_MIME_SWITCH, switch2Valid: false, 
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
                    {"code":401,"indent":0,"parameters":["GIGGLES: *laughing uncontrollably*"]},
                    {"code":401,"indent":0,"parameters":["HAHAHAHAHA! Oh my! HEEHEEHEE! I can't"]},
                    {"code":401,"indent":0,"parameters":["stop! BWAHAHAHAHA! Help! TEEHEEHEEHEE!"]},
                    {"code":401,"indent":0,"parameters":["*tears streaming down face*"]},
                    {"code":101,"indent":0,"parameters":["People4",0,0,2]},
                    {"code":401,"indent":0,"parameters":["GIGGLES: *gasping between laughs*"]},
                    {"code":401,"indent":0,"parameters":["The... HAHA... Laughing... HEEHEE... Stock!"]},
                    {"code":401,"indent":0,"parameters":["They're... BWAHAHA... recruiting! HAHAHA!"]},
                    {"code":401,"indent":0,"parameters":["*points to comedy club before doubling over*"]},
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
                // After meeting Sad Mime, before completing training
                conditions: {
                    actorId: 1, actorValid: false, 
                    itemId: 1, itemValid: false, 
                    selfSwitchCh: "A", selfSwitchValid: false, 
                    switch1Id: MET_SAD_MIME_SWITCH, switch1Valid: true, 
                    switch2Id: COMPLETED_CLOWN_TRAINING_SWITCH, switch2Valid: false, 
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
                    {"code":401,"indent":0,"parameters":["GIGGLES: *still laughing but now with a"]},
                    {"code":401,"indent":0,"parameters":["sinister undertone*"]},
                    {"code":401,"indent":0,"parameters":["So you met the Sad Mime? HAHAHA! That"]},
                    {"code":401,"indent":0,"parameters":["traitor to the cause! TEEHEEHEEHEE!"]},
                    {"code":101,"indent":0,"parameters":["People4",0,0,2]},
                    {"code":401,"indent":0,"parameters":["GIGGLES: *leans in conspiratorially*"]},
                    {"code":401,"indent":0,"parameters":["I can help you with your clown training!"]},
                    {"code":401,"indent":0,"parameters":["HAHAHA! Just tell me a joke! If it's"]},
                    {"code":401,"indent":0,"parameters":["terrible enough, you pass! BWAHAHAHA!"]},
                    {"code":102,"indent":0,"parameters":[["Tell a joke","No thanks"],1]},
                    {"code":402,"indent":0,"parameters":[0,"Tell a joke"]},
                    {"code":101,"indent":1,"parameters":["People4",0,0,2]},
                    {"code":401,"indent":1,"parameters":["YOU: " + TERRIBLE_JOKES[Math.floor(Math.random() * TERRIBLE_JOKES.length)]]},
                    {"code":101,"indent":1,"parameters":["People4",0,0,2]},
                    {"code":401,"indent":1,"parameters":["GIGGLES: *stares blankly, then bursts into"]},
                    {"code":401,"indent":1,"parameters":["exaggerated laughter*"]},
                    {"code":401,"indent":1,"parameters":["THAT'S TERRIBLE! HAHAHAHAHA! PERFECT!"]},
                    {"code":401,"indent":1,"parameters":["You're a natural! HEEHEEHEEHEE!"]},
                    {"code":101,"indent":1,"parameters":["People4",0,0,2]},
                    {"code":401,"indent":1,"parameters":["GIGGLES: *hands you a clown disguise*"]},
                    {"code":401,"indent":1,"parameters":["Here's your official clown gear! HAHAHA!"]},
                    {"code":401,"indent":1,"parameters":["Now you can infiltrate the network! Just"]},
                    {"code":401,"indent":1,"parameters":["don't betray us like that mime! TEEHEE!"]},
                    {"code":126,"indent":1,"parameters":[CLOWN_DISGUISE_ITEM,0,0,1]},
                    {"code":126,"indent":1,"parameters":[JOKE_BOOK_ITEM,0,0,1]},
                    {"code":121,"indent":1,"parameters":[COMPLETED_CLOWN_TRAINING_SWITCH,COMPLETED_CLOWN_TRAINING_SWITCH,0]},
                    {"code":0,"indent":1,"parameters":[]},
                    {"code":402,"indent":0,"parameters":[1,"No thanks"]},
                    {"code":101,"indent":1,"parameters":["People4",0,0,2]},
                    {"code":401,"indent":1,"parameters":["GIGGLES: *laughs even harder*"]},
                    {"code":401,"indent":1,"parameters":["HAHAHAHAHA! Your loss! BWAHAHAHA!"]},
                    {"code":401,"indent":1,"parameters":["Come back when you're ready to embrace"]},
                    {"code":401,"indent":1,"parameters":["the hilarity! TEEHEEHEEHEE!"]},
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
                moveType: 1,
                priorityType: 1,
                stepAnime: true,
                through: false,
                trigger: 0,
                walkAnime: true
            },
            {
                // After completing training, before sabotaging gas
                conditions: {
                    actorId: 1, actorValid: false, 
                    itemId: 1, itemValid: false, 
                    selfSwitchCh: "A", selfSwitchValid: false, 
                    switch1Id: COMPLETED_CLOWN_TRAINING_SWITCH, switch1Valid: true, 
                    switch2Id: SABOTAGED_GAS_SWITCH, switch2Valid: false, 
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
                    {"code":401,"indent":0,"parameters":["GIGGLES: *laughing but watching you closely*"]},
                    {"code":401,"indent":0,"parameters":["HAHAHA! How's the infiltration going?"]},
                    {"code":401,"indent":0,"parameters":["Found anything interesting? TEEHEE!"]},
                    {"code":401,"indent":0,"parameters":["*eyes narrow slightly between laughs*"]},
                    {"code":111,"indent":0,"parameters":[1,DISCOVERED_PLAN_SWITCH,0]},
                    {"code":101,"indent":1,"parameters":["People4",0,0,2]},
                    {"code":401,"indent":1,"parameters":["GIGGLES: *leans in*"]},
                    {"code":401,"indent":1,"parameters":["The Laughing Gas facility is in the basement"]},
                    {"code":401,"indent":1,"parameters":["of The Laughing Stock! HAHAHA! But you'll"]},
                    {"code":401,"indent":1,"parameters":["never get past security! TEEHEEHEEHEE!"]},
                    {"code":0,"indent":1,"parameters":[]},
                    {"code":411,"indent":0,"parameters":[]},
                    {"code":101,"indent":1,"parameters":["People4",0,0,2]},
                    {"code":401,"indent":1,"parameters":["GIGGLES: *suspicious laugh*"]},
                    {"code":401,"indent":1,"parameters":["You're working with the Sad Mime, aren't you?"]},
                    {"code":401,"indent":1,"parameters":["HAHAHA! I knew it! You'll never stop our"]},
                    {"code":401,"indent":1,"parameters":["glorious revolution of mirth! BWAHAHAHA!"]},
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
                // After sabotaging gas
                conditions: {
                    actorId: 1, actorValid: false, 
                    itemId: 1, itemValid: false, 
                    selfSwitchCh: "A", selfSwitchValid: false, 
                    switch1Id: SABOTAGED_GAS_SWITCH, switch1Valid: true, 
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
                    {"code":101,"indent":0,"parameters":["People4",0,0,
