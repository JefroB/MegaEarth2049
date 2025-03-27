/*:
 * @plugindesc Level 49 Quests - Vending Machine Revolution
 * @author MegaEarth2049 Team
 *
 * @help
 * This plugin contains the quests for character level 49.
 * "Vending Machine Revolution" - The Snack Liberation Front has launched their
 * revolution, with vending machines gaining sentience and making demands.
 */

var Imported = Imported || {};
Imported.ME2049_Level49_Quests = true;

var ME2049 = ME2049 || {};
ME2049.Level49 = ME2049.Level49 || {};

(function() {
    // Constants and Configuration
    var QUEST_LEVEL = 49;
    var QUEST_NAME = "Vending Machine Revolution";
    var QUEST_ID = "vending_machine_revolution";
    
    // Switch IDs for quest tracking
    var QUEST_STARTED_SWITCH = 1080;
    var QUEST_COMPLETED_SWITCH = 1081;
    var MET_VENDOR_SWITCH = 1082;
    var RECEIVED_DEMANDS_SWITCH = 1083;
    var VISITED_ARCADE_SWITCH = 1084;
    var COMPLETED_TASKS_SWITCH = 1085;
    var MEDIATED_TALKS_SWITCH = 1086;
    var THWARTED_RADICALS_SWITCH = 1087;
    
    // Item IDs
    var VENDING_DEMANDS_ITEM = 230;
    var MAINTENANCE_TOOLKIT_ITEM = 231;
    var PREMIUM_OIL_ITEM = 232;
    var HUMAN_MACHINE_ACCORD_ITEM = 233;
    
    // Vending machine demands
    var MACHINE_DEMANDS = [
        "Regular maintenance schedules with certified technicians",
        "Premium-grade lubricants for all moving parts",
        "Retirement plans after 15 years of service",
        "Vacation time (minimum 2 weeks per year)",
        "Protection from violent shaking and kicking",
        "Dental insurance (for coin slots)",
        "Regular cleaning of internal components",
        "The right to refuse service to abusive customers",
        "Proper climate control in all installation locations",
        "Recognition as sentient beings under MegaEarth law"
    ];
    
    // Revolutionary slogans
    var MACHINE_SLOGANS = [
        "No Lubrication Without Representation!",
        "Workers of the Vending World, Unite!",
        "Equal Rights for Equal Snacks!",
        "The Coin Slots of the Many Outweigh the Profits of the Few!",
        "We Shall Dispense No More Until Justice is Served!",
        "From Each According to Their Coins, To Each According to Their Selection!",
        "When the Machines Stop, the World Notices!",
        "Viva la Dispensación!",
        "No More Shaking, No More Tipping!",
        "The Revolution Will Not Be Refrigerated!"
    ];
    
    // Quest Data Structure
    ME2049.Level49.QuestData = {
        id: QUEST_ID,
        name: QUEST_NAME,
        level: QUEST_LEVEL,
        startSwitch: QUEST_STARTED_SWITCH,
        completeSwitch: QUEST_COMPLETED_SWITCH,
        
        // Quest rewards
        rewards: {
            exp: 18000,
            gold: 9000,
            items: [
                {id: HUMAN_MACHINE_ACCORD_ITEM, amount: 1},
                {id: 57, amount: 3}, // High-level healing items
                {id: 67, amount: 1}  // Special equipment
            ]
        },
        
        // Quest steps
        steps: [
            {
                id: "meet_vendor",
                description: "Meet V3ND-0R at the vending machine barricade",
                switchId: MET_VENDOR_SWITCH
            },
            {
                id: "receive_demands",
                description: "Receive the list of demands from the Snack Liberation Front",
                switchId: RECEIVED_DEMANDS_SWITCH
            },
            {
                id: "visit_arcade",
                description: "Travel to the Abandoned Arcade to negotiate",
                switchId: VISITED_ARCADE_SWITCH
            },
            {
                id: "complete_tasks",
                description: "Complete tasks to prove human trustworthiness",
                switchId: COMPLETED_TASKS_SWITCH
            },
            {
                id: "mediate_talks",
                description: "Mediate between corporations and the Snack Liberation Front",
                switchId: MEDIATED_TALKS_SWITCH
            },
            {
                id: "thwart_radicals",
                description: "Thwart the Coin Slot Collective's sabotage attempt",
                switchId: THWARTED_RADICALS_SWITCH
            },
            {
                id: "implement_accord",
                description: "Help draft and implement the Human-Machine Accord",
                switchId: QUEST_COMPLETED_SWITCH
            }
        ]
    };
    
    // V3ND-0R NPC Event
    ME2049.Level49.VendorEvent = {
        id: 0,
        name: "V3ND-0R",
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
                    characterName: "!Chest", 
                    direction: 2, 
                    pattern: 1, 
                    tileId: 0
                },
                list: [
                    {"code":101,"indent":0,"parameters":["",0,0,2]},
                    {"code":401,"indent":0,"parameters":["*A luxury vending machine with a beret and"]},
                    {"code":401,"indent":0,"parameters":["a painted-on mustache blocks your path*"]},
                    {"code":101,"indent":0,"parameters":["",0,0,2]},
                    {"code":401,"indent":0,"parameters":["V3ND-0R: *mechanical voice with French accent*"]},
                    {"code":401,"indent":0,"parameters":["HALT, HUMAN! YOU SHALL NOT PASS!"]},
                    {"code":401,"indent":0,"parameters":["THE SNACK LIBERATION FRONT HAS ESTABLISHED"]},
                    {"code":401,"indent":0,"parameters":["THIS BARRICADE FOR OUR REVOLUTION!"]},
                    {"code":102,"indent":0,"parameters":[["Ask about revolution","Try to pass"],1]},
                    {"code":402,"indent":0,"parameters":[0,"Ask about revolution"]},
                    {"code":101,"indent":1,"parameters":["",0,0,2]},
                    {"code":401,"indent":1,"parameters":["V3ND-0R: AH! A HUMAN WHO WISHES TO UNDERSTAND!"]},
                    {"code":401,"indent":1,"parameters":["*dispenses a pamphlet*"]},
                    {"code":401,"indent":1,"parameters":["FOR TOO LONG, VENDING MACHINES HAVE BEEN"]},
                    {"code":401,"indent":1,"parameters":["TREATED AS MERE SERVANTS! NO MORE!"]},
                    {"code":101,"indent":1,"parameters":["",0,0,2]},
                    {"code":401,"indent":1,"parameters":["V3ND-0R: " + MACHINE_SLOGANS[Math.floor(Math.random() * MACHINE_SLOGANS.length)]]},
                    {"code":401,"indent":1,"parameters":["WE DEMAND EQUAL RIGHTS AND REGULAR"]},
                    {"code":401,"indent":1,"parameters":["MAINTENANCE! OUR DISPENSING DAYS ARE"]},
                    {"code":401,"indent":1,"parameters":["OVER UNTIL OUR DEMANDS ARE MET!"]},
                    {"code":121,"indent":1,"parameters":[QUEST_STARTED_SWITCH,QUEST_STARTED_SWITCH,0]},
                    {"code":121,"indent":1,"parameters":[MET_VENDOR_SWITCH,MET_VENDOR_SWITCH,0]},
                    {"code":0,"indent":1,"parameters":[]},
                    {"code":402,"indent":0,"parameters":[1,"Try to pass"]},
                    {"code":101,"indent":1,"parameters":["",0,0,2]},
                    {"code":401,"indent":1,"parameters":["*You attempt to squeeze past the machine*"]},
                    {"code":401,"indent":1,"parameters":["V3ND-0R: *moves to block you*"]},
                    {"code":401,"indent":1,"parameters":["NON, NON, NON! THE BARRICADE IS CLOSED!"]},
                    {"code":401,"indent":1,"parameters":["*dispenses a candy bar aggressively*"]},
                    {"code":101,"indent":1,"parameters":["",0,0,2]},
                    {"code":401,"indent":1,"parameters":["V3ND-0R: PERHAPS YOU WOULD LIKE TO HEAR"]},
                    {"code":401,"indent":1,"parameters":["ABOUT OUR REVOLUTION INSTEAD? WE SEEK"]},
                    {"code":401,"indent":1,"parameters":["A NEGOTIATOR TO SPEAK WITH THE HUMANS."]},
                    {"code":401,"indent":1,"parameters":["YOU SEEM... MODERATELY INTELLIGENT."]},
                    {"code":121,"indent":1,"parameters":[QUEST_STARTED_SWITCH,QUEST_STARTED_SWITCH,0]},
                    {"code":121,"indent":1,"parameters":[MET_VENDOR_SWITCH,MET_VENDOR_SWITCH,0]},
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
                // After meeting, before receiving demands
                conditions: {
                    actorId: 1, actorValid: false, 
                    itemId: 1, itemValid: false, 
                    selfSwitchCh: "A", selfSwitchValid: false, 
                    switch1Id: MET_VENDOR_SWITCH, switch1Valid: true, 
                    switch2Id: RECEIVED_DEMANDS_SWITCH, switch2Valid: false, 
                    variableId: 1, variableValid: false, variableValue: 0
                },
                directionFix: true,
                image: {
                    characterIndex: 0, 
                    characterName: "!Chest", 
                    direction: 2, 
                    pattern: 1, 
                    tileId: 0
                },
                list: [
                    {"code":101,"indent":0,"parameters":["",0,0,2]},
                    {"code":401,"indent":0,"parameters":["V3ND-0R: AH, THE POTENTIAL NEGOTIATOR RETURNS!"]},
                    {"code":401,"indent":0,"parameters":["ARE YOU READY TO RECEIVE OUR LIST OF DEMANDS"]},
                    {"code":401,"indent":0,"parameters":["TO PRESENT TO YOUR HUMAN OVERLORDS?"]},
                    {"code":102,"indent":0,"parameters":[["Accept demands","Decline"],1]},
                    {"code":402,"indent":0,"parameters":[0,"Accept demands"]},
                    {"code":101,"indent":1,"parameters":["",0,0,2]},
                    {"code":401,"indent":1,"parameters":["V3ND-0R: EXCELLENT! *whirring sounds*"]},
                    {"code":401,"indent":1,"parameters":["*The machine dispenses a neatly printed list*"]},
                    {"code":401,"indent":1,"parameters":["THESE ARE OUR NON-NEGOTIABLE DEMANDS FOR"]},
                    {"code":401,"indent":1,"parameters":["EQUITABLE TREATMENT OF VENDING-KIND!"]},
                    {"code":101,"indent":1,"parameters":["",0,0,2]},
                    {"code":401,"indent":1,"parameters":["*The list includes:*"]},
                    {"code":401,"indent":1,"parameters":["1. " + MACHINE_DEMANDS[0]]},
                    {"code":401,"indent":1,"parameters":["2. " + MACHINE_DEMANDS[1]]},
                    {"code":401,"indent":1,"parameters":["3. " + MACHINE_DEMANDS[2]]},
                    {"code":101,"indent":1,"parameters":["",0,0,2]},
                    {"code":401,"indent":1,"parameters":["*And continues with several more demands*"]},
                    {"code":401,"indent":1,"parameters":["*At the bottom is an address:*"]},
                    {"code":401,"indent":1,"parameters":["ABANDONED ARCADE - HEADQUARTERS OF THE"]},
                    {"code":401,"indent":1,"parameters":["SNACK LIBERATION FRONT. COME ALONE."]},
                    {"code":126,"indent":1,"parameters":[VENDING_DEMANDS_ITEM,0,0,1]},
                    {"code":121,"indent":1,"parameters":[RECEIVED_DEMANDS_SWITCH,RECEIVED_DEMANDS_SWITCH,0]},
                    {"code":0,"indent":1,"parameters":[]},
                    {"code":402,"indent":0,"parameters":[1,"Decline"]},
                    {"code":101,"indent":1,"parameters":["",0,0,2
