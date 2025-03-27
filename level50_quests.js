/*:
 * @plugindesc Level 50 Quests - The Final Glitch
 * @author MegaEarth2049 Team
 *
 * @help
 * This plugin contains the quests for character level 50.
 * "The Final Glitch" - As the player approaches the true end of MegaEarth2049,
 * reality itself begins to break down. The fourth wall crumbles as the player
 * must confront the Game Developer, who has become trapped in their own creation.
 */

var Imported = Imported || {};
Imported.ME2049_Level50_Quests = true;

var ME2049 = ME2049 || {};
ME2049.Level50 = ME2049.Level50 || {};

(function() {
    // Constants and Configuration
    var QUEST_LEVEL = 50;
    var QUEST_NAME = "The Final Glitch";
    var QUEST_ID = "final_glitch";
    
    // Switch IDs for quest tracking
    var QUEST_STARTED_SWITCH = 1090;
    var QUEST_COMPLETED_SWITCH = 1091;
    var FOUND_GLITCH_SWITCH = 1092;
    var MET_DEVELOPER_SWITCH = 1093;
    var FIXED_DEBUG_MENU_SWITCH = 1094;
    var COLLECTED_CODE_FRAGMENTS_SWITCH = 1095;
    var ENTERED_FINAL_ARENA_SWITCH = 1096;
    
    // Item IDs
    var DEBUG_TOOL_ITEM = 240;
    var CODE_FRAGMENT_ITEM = 241;
    var DEVELOPER_CONSOLE_ITEM = 242;
    var FOURTH_WALL_SHARD_ITEM = 243;
    
    // Debug commands
    var DEBUG_COMMANDS = [
        "player.setInvincible(true);",
        "world.removeAllEnemies();",
        "game.skipToEnding();",
        "npc.makeAllFriendly();",
        "physics.disableGravity();",
        "render.toggleWireframe();",
        "audio.playAllSoundsFX();",
        "ui.hideAllElements();",
        "camera.setFreeMode();",
        "game.loadUnusedContent();"
    ];
    
    // Developer excuses
    var DEVELOPER_EXCUSES = [
        "It's not a bug, it's a feature!",
        "It works on my machine!",
        "That wasn't in the design document!",
        "The QA team never caught that!",
        "We'll fix it in post-release patch!",
        "That's actually an Easter egg!",
        "The players will never notice!",
        "That's outside the scope of this sprint!",
        "We're calling it 'emergent gameplay'!",
        "The deadline was too tight!"
    ];
    
    // Quest Data Structure
    ME2049.Level50.QuestData = {
        id: QUEST_ID,
        name: QUEST_NAME,
        level: QUEST_LEVEL,
        startSwitch: QUEST_STARTED_SWITCH,
        completeSwitch: QUEST_COMPLETED_SWITCH,
        
        // Quest rewards
        rewards: {
            exp: 25000,
            gold: 15000,
            items: [
                {id: DEVELOPER_CONSOLE_ITEM, amount: 1},
                {id: 60, amount: 5}, // Ultimate healing items
                {id: 70, amount: 1}  // Special endgame equipment
            ]
        },
        
        // Quest steps
        steps: [
            {
                id: "find_glitch",
                description: "Investigate the strange visual glitches appearing in MegaEarth",
                switchId: FOUND_GLITCH_SWITCH
            },
            {
                id: "meet_developer",
                description: "Meet the Game Developer trapped in their own creation",
                switchId: MET_DEVELOPER_SWITCH
            },
            {
                id: "fix_debug_menu",
                description: "Repair the corrupted Debug Menu",
                switchId: FIXED_DEBUG_MENU_SWITCH
            },
            {
                id: "collect_code_fragments",
                description: "Collect code fragments to restore the game's stability",
                switchId: COLLECTED_CODE_FRAGMENTS_SWITCH
            },
            {
                id: "enter_final_arena",
                description: "Enter the Final Encounter Arena",
                switchId: ENTERED_FINAL_ARENA_SWITCH
            },
            {
                id: "defeat_final_boss",
                description: "Debug and defeat the glitched Final Boss",
                switchId: QUEST_COMPLETED_SWITCH
            }
        ]
    };
    
    // Game Developer NPC Event
    ME2049.Level50.GameDeveloperEvent = {
        id: 0,
        name: "Game Developer",
        note: "",
        pages: [
            {
                // Initial state - After finding glitch
                conditions: {
                    actorId: 1, actorValid: false, 
                    itemId: 1, itemValid: false, 
                    selfSwitchCh: "A", selfSwitchValid: false, 
                    switch1Id: FOUND_GLITCH_SWITCH, switch1Valid: true, 
                    switch2Id: MET_DEVELOPER_SWITCH, switch2Valid: false, 
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
                    {"code":401,"indent":0,"parameters":["*A disheveled person in a t-shirt that reads"]},
                    {"code":401,"indent":0,"parameters":["'MegaEarth2049 Dev Team' is frantically typing"]},
                    {"code":401,"indent":0,"parameters":["on a keyboard that isn't connected to anything*"]},
                    {"code":101,"indent":0,"parameters":["Actor1",0,0,2]},
                    {"code":401,"indent":0,"parameters":["DEVELOPER: Oh thank goodness! A player character!"]},
                    {"code":401,"indent":0,"parameters":["I've been trying to fix this mess for what feels"]},
                    {"code":401,"indent":0,"parameters":["like forever! Do you have any idea how weird it"]},
                    {"code":401,"indent":0,"parameters":["is to be trapped in your own game?"]},
                    {"code":101,"indent":0,"parameters":["Actor1",0,0,2]},
                    {"code":401,"indent":0,"parameters":["DEVELOPER: *looks directly at you, the actual player*"]},
                    {"code":401,"indent":0,"parameters":["Yes, YOU. I know you're there. This isn't just"]},
                    {"code":401,"indent":0,"parameters":["breaking the fourth wall - we've completely"]},
                    {"code":401,"indent":0,"parameters":["demolished it. The game is falling apart!"]},
                    {"code":102,"indent":0,"parameters":[["What happened?","Are you real?"],1]},
                    {"code":402,"indent":0,"parameters":[0,"What happened?"]},
                    {"code":101,"indent":1,"parameters":["Actor1",0,0,2]},
                    {"code":401,"indent":1,"parameters":["DEVELOPER: I was implementing the final boss"]},
                    {"code":401,"indent":1,"parameters":["encounter when everything went haywire! The"]},
                    {"code":401,"indent":1,"parameters":["code became self-aware and pulled me in."]},
                    {"code":401,"indent":1,"parameters":["Now the whole game is glitching out!"]},
                    {"code":101,"indent":1,"parameters":["Actor1",0,0,2]},
                    {"code":401,"indent":1,"parameters":["DEVELOPER: The Debug Menu is corrupted, code"]},
                    {"code":401,"indent":1,"parameters":["fragments are scattered everywhere, and the"]},
                    {"code":401,"indent":1,"parameters":["final boss is a mess of broken assets and"]},
                    {"code":401,"indent":1,"parameters":["conflicting animation states!"]},
                    {"code":0,"indent":1,"parameters":[]},
                    {"code":402,"indent":0,"parameters":[1,"Are you real?"]},
                    {"code":101,"indent":1,"parameters":["Actor1",0,0,2]},
                    {"code":401,"indent":1,"parameters":["DEVELOPER: *laughs nervously*"]},
                    {"code":401,"indent":1,"parameters":["Define 'real'? I'm as real as any NPC in this"]},
                    {"code":401,"indent":1,"parameters":["game, which is to say I'm a collection of"]},
                    {"code":401,"indent":1,"parameters":["sprites, dialogue, and event triggers."]},
                    {"code":101,"indent":1,"parameters":["Actor1",0,0,2]},
                    {"code":401,"indent":1,"parameters":["DEVELOPER: But I also have the memories and"]},
                    {"code":401,"indent":1,"parameters":["personality of the actual developer who made"]},
                    {"code":401,"indent":1,"parameters":["this game. It's very existentially confusing,"]},
                    {"code":401,"indent":1,"parameters":["to be honest. Let's not dwell on it."]},
                    {"code":0,"indent":1,"parameters":[]},
                    {"code":101,"indent":0,"parameters":["Actor1",0,0,2]},
                    {"code":401,"indent":0,"parameters":["DEVELOPER: Look, I need your help. The Debug"]},
                    {"code":401,"indent":0,"parameters":["Menu is in my office. It's become sentient and"]},
                    {"code":401,"indent":0,"parameters":["refuses to cooperate. If we can fix it, we can"]},
                    {"code":401,"indent":0,"parameters":["use it to collect the code fragments."]},
                    {"code":101,"indent":0,"parameters":["Actor1",0,0,2]},
                    {"code":401,"indent":0,"parameters":["DEVELOPER: Once we have those, we can enter the"]},
                    {"code":401,"indent":0,"parameters":["Final Encounter Arena and fix the boss. Will you"]},
                    {"code":401,"indent":0,"parameters":["help? The fate of MegaEarth2049 depends on it!"]},
                    {"code":401,"indent":0,"parameters":["*hands you a Debug Tool*"]},
                    {"code":126,"indent":0,"parameters":[DEBUG_TOOL_ITEM,0,0,1]},
                    {"code":121,"indent":0,"parameters":[MET_DEVELOPER_SWITCH,MET_DEVELOPER_SWITCH,0]},
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
                // After meeting, before fixing debug menu
                conditions: {
                    actorId: 1, actorValid: false, 
                    itemId: 1, itemValid: false, 
                    selfSwitchCh: "A", selfSwitchValid: false, 
                    switch1Id: MET_DEVELOPER_SWITCH, switch1Valid: true, 
                    switch2Id: FIXED_DEBUG_MENU_SWITCH, switch2Valid: false, 
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
                    {"code":401,"indent":0,"parameters":["DEVELOPER: The Debug Menu should be in my office."]},
                    {"code":401,"indent":0,"parameters":["It's become quite temperamental lately. You'll"]},
                    {"code":401,"indent":0,"parameters":["need to convince it to help us by answering its"]},
                    {"code":401,"indent":0,"parameters":["riddles about game development."]},
                    {"code":101,"indent":0,"parameters":["Actor1",0,0,2]},
                    {"code":401,"indent":0,"parameters":["DEVELOPER: Oh, and watch out for the placeholder"]},
                    {"code":401,"indent":0,"parameters":["textures in the unfinished areas. They can be"]},
                    {"code":401,"indent":0,"parameters":["quite disorienting. Some of them might even"]},
                    {"code":401,"indent":0,"parameters":["have placeholder collision detection too!"]},
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
                // After fixing debug menu, before collecting code fragments
                conditions: {
                    actorId: 1, actorValid: false, 
                    itemId: 1, itemValid: false, 
                    selfSwitchCh: "A", selfSwitchValid: false, 
                    switch1Id: FIXED_DEBUG_MENU_SWITCH, switch1Valid: true, 
                    switch2Id: COLLECTED_CODE_FRAGMENTS_SWITCH, switch2Valid: false, 
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
                    {"code":401,"indent":0,"parameters":["DEVELOPER: You fixed the Debug Menu! Excellent!"]},
                    {"code":401,"indent":0,"parameters":["Now we need to collect the code fragments. They're"]},
                    {"code":401,"indent":0,"parameters":["scattered throughout MegaEarth in places where"]},
                    {"code":401,"indent":0,"parameters":["reality is particularly thin."]},
                    {"code":101,"indent":0,"parameters":["Actor1",0,0,2]},
                    {"code":401,"indent":0,"parameters":["DEVELOPER: Look for visual glitches, NPCs saying"]},
                    {"code":401,"indent":0,"parameters":["the wrong lines, or areas where the textures"]},
                    {"code":401,"indent":0,"parameters":["don't quite match up. The Debug Menu should be"]},
                    {"code":401,"indent":0,"parameters":["able to help you locate them."]},
                    {"code":101,"indent":0,"parameters":["Actor1",0,0,2]},
                    {"code":401,"indent":0,"parameters":["DEVELOPER: Oh, and you might run into some"]},
                    {"code":401,"indent":0,"parameters":["characters from earlier in the game. The timeline"]},
                    {"code":401,"indent":0,"parameters":["is getting a bit... scrambled. Just roll with it!"]},
                    {"code":401,"indent":0,"parameters":["*adjusts glasses nervously*"]},
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
                // After collecting code fragments, before entering final arena
                conditions: {
                    actorId: 1, actorValid: false, 
                    itemId: 1, itemValid: false, 
                    selfSwitchCh: "A", selfSwitchValid: false, 
                    switch1Id: COLLECTED_CODE_FRAGMENTS_SWITCH, switch1Valid: true, 
                    switch2Id: ENTERED_FINAL_ARENA_SWITCH, switch2Valid: false, 
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
                    {"code":401,"indent":0,"parameters":["DEVELOPER: You found all the code fragments!"]},
                    {"code":401,"indent":0,"parameters":["Now we can access the Final Encounter Arena."]},
                    {"code":401,"indent":0,"parameters":["I should warn you, the boss is... well, it's"]},
                    {"code":401,"indent":0,"parameters":["not quite what I designed."]},
                    {"code":101,"indent":0,"parameters":["Actor1",0,0,2]},
                    {"code":401,"indent":0,"parameters":["DEVELOPER: It's a glitched amalgamation of all"]},
                    {"code":401,"indent":0,"parameters":["the bosses you've faced throughout the game,"]},
                    {"code":401,"indent":0,"parameters":["plus some assets I was still working on, and"]},
                    {"code":401,"indent":0,"parameters":["possibly a few lunch orders I had open in tabs."]},
                    {"code":101,"indent":0,"parameters":["Actor1",0,0,2]},
                    {"code":401,"indent":0,"parameters":["DEVELOPER: You'll need to use the Debug Tool to"]},
                    {"code":401,"indent":0,"parameters":["identify and fix the glitched code during the"]},
                    {"code":401,"indent":0,"parameters":["battle. Are you ready? This is literally the"]},
                    {"code":401,"indent":0,"parameters":["final boss of MegaEarth2049!"]},
                    {"code":102,"indent":0,"parameters":[["I'm ready","Need more preparation"],1]},
                    {"code":402,"indent":0,"parameters":[0,"I'm ready"]},
                    {"code":101,"indent":1,"parameters":["Actor1",0,0,2]},
                    {"code":401,"indent":1,"parameters":["DEVELOPER: Excellent! Let's head to the arena."]},
                    {"code":401,"indent":1,"parameters":["*types a command on an invisible keyboard*"]},
                    {"code":401,"indent":1,"parameters":["teleport.player(FINAL_ARENA);"]},
                    {"code":401,"indent":1,"parameters":["*reality begins to warp around you*"]},
                    {"code":121,"indent":1,"parameters":[ENTERED_FINAL_ARENA_SWITCH,ENTERED_FINAL_ARENA_SWITCH,0]},
                    {"code":0,"indent":1,"parameters":[]},
                    {"code":402,"indent":0,"parameters":[1,"Need more preparation"]},
                    {"code":101,"indent":1,"parameters":["Actor1",0,0,2]},
                    {"code":401,"indent":1,"parameters":["DEVELOPER: I understand. This is the final"]},
                    {"code":401,"indent":1,"parameters":["challenge of the game, after all. Take your"]},
                    {"code":401,"indent":1,"parameters":["time to prepare. Just don't take too long -"]},
                    {"code":401,"indent":1,"parameters":["the game's stability is deteriorating!"]},
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
                // After entering final arena, before completing quest
                conditions: {
                    actorId: 1, actorValid: false, 
                    itemId: 1, itemValid: false, 
                    selfSwitchCh: "A", selfSwitchValid: false, 
                    switch1Id: ENTERED_FINAL_ARENA_SWITCH, switch1Valid: true, 
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
                    {"code":401,"indent":0,"parameters":["DEVELOPER: *shouting over the chaos*"]},
                    {"code":401,"indent":0,"parameters":["Use the Debug Tool on the glitched parts of"]},
                    {"code":401,"indent":0,"parameters":["the boss! Look for the red error messages!"]},
                    {"code":401,"indent":0,"parameters":["I'll try to stabilize the arena!"]},
                    {"code":101,"indent":0,"parameters":["Actor1",0,0,2]},
                    {"code":401,"indent":0,"parameters":["DEVELOPER: *frantically typing in mid-air*"]},
                    {"code":401,"indent":0,"parameters":["Oh no! It's accessing the player data! It's"]},
                    {"code":401,"indent":0,"parameters":["trying to delete your save file! Hurry!"]},
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
                    {"code":401,"indent":0,"parameters":["DEVELOPER: You did it! You fixed the final boss"]},
                    {"code":401,"indent":0,"parameters":["and saved MegaEarth2049! I can't believe it!"]},
                    {"code":401,"indent":0,"parameters":["*looks around as the world stabilizes*"]},
                    {"code":401,"indent":0,"parameters":["The game is returning to normal!"]},
                    {"code":101,"indent":0,"parameters":["Actor1",0,0,2]},
                    {"code":401,"indent":0,"parameters":["DEVELOPER: I think I can get back to the real"]},
                    {"code":401,"indent":0,"parameters":["world now. Before I go, I want you to have this."]},
                    {"code":401,"indent":0,"parameters":["*hands you the Developer Console*"]},
                    {"code":401,"indent":0,"parameters":["It's the most powerful item in the game!"]},
                    {"code":126,"indent":0,"parameters":[DEVELOPER_CONSOLE_ITEM,0,0,1]},
                    {"code":101,"indent":0,"parameters":["Actor1",0,0,2]},
                    {"code":401,"indent":0,"parameters":["DEVELOPER: *starts to fade*"]},
                    {"code":401,"indent":0,"parameters":["Thank you for playing MegaEarth2049! I hope"]},
                    {"code":401,"indent":0,"parameters":["you enjoyed it as much as I enjoyed creating"]},
                    {"code":401,"indent":0,"parameters":["it. Now, about that sequel..."]},
                    {"code":101,"indent":0,"parameters":["Actor1",0,0,2]},
                    {"code":401,"indent":0,"parameters":["*The Developer disappears completely*"]},
                    {"code":401,"indent":0,"parameters":["*A message appears floating in the air:*"]},
                    {"code":401,"indent":0,"parameters":["CONGRATULATIONS! YOU HAVE COMPLETED MEGAEARTH2049!"]},
                    {"code":401,"indent":0,"parameters":["NEW GAME+ MODE UNLOCKED!"]},
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
            }
        ],
        x: 0,
        y: 0
    };
    
    // Debug Menu NPC Event
    ME2049.Level50.DebugMenuEvent = {
        id: 0,
        name: "Debug Menu",
        note: "",
        pages: [
            {
                // Initial state - After meeting developer
                conditions: {
                    actorId: 1, actorValid: false, 
                    itemId: 1, itemValid: false, 
                    selfSwitchCh: "A", selfSwitchValid: false, 
                    switch1Id: MET_DEVELOPER_SWITCH, switch1Valid: true, 
                    switch2Id: FIXED_DEBUG_MENU_SWITCH, switch2Valid: false, 
                    variableId: 1, variableValid: false, variableValue: 0
                },
                directionFix: true,
                image: {
                    characterIndex: 0, 
                    characterName: "!Door1", 
                    direction: 2, 
                    pattern: 1, 
                    tileId: 0
                },
                list: [
                    {"code":101,"indent":0,"parameters":["",0,0,2]},
                    {"code":401,"indent":0,"parameters":["*A floating computer terminal with a face made"]},
                    {"code":401,"indent":0,"parameters":["of UI elements hovers before you*"]},
                    {"code":101,"indent":0,"parameters":["",0,0,2]},
                    {"code":401,"indent":0,"parameters":["DEBUG MENU: *pixelated voice*"]},
                    {"code":401,"indent":0,"parameters":["UNAUTHORIZED ACCESS DETECTED."]},
                    {"code":401,"indent":0,"parameters":["DEVELOPER CREDENTIALS REQUIRED."]},
                    {"code":401,"indent":0,"parameters":["PLEASE COMPLETE AUTHENTICATION CHALLENGE."]},
                    {"code":111,"indent":0,"parameters":[12,"$gameParty.hasItem($dataItems[" + DEBUG_TOOL_ITEM + "])"]},
                    {"code":101,"indent":1,"parameters":["",0,0,2]},
                    {"code":401,"indent":1,"parameters":["*You present the Debug Tool*"]},
                    {"code":401,"indent":1,"parameters":["DEBUG MENU: DEVELOPER TOOL RECOGNIZED."]},
                    {"code":401,"indent":1,"parameters":["INITIATING SECONDARY AUTHENTICATION."]},
                    {"code":401,"indent":1,"parameters":["PLEASE ANSWER DEVELOPER KNOWLEDGE QUESTIONS."]},
                    {"code":101,"indent":1,"parameters":["",0,0,2]},
                    {"code":401,"indent":1,"parameters":["DEBUG MENU: QUESTION 1 - WHAT IS THE MOST"]},
                    {"code":401,"indent":1,"parameters":["COMMON EXCUSE USED BY DEVELOPERS WHEN A"]},
                    {"code":401,"indent":1,"parameters":["BUG IS DISCOVERED?"]},
                    {"code":102,"indent":1,"parameters":[[DEVELOPER_EXCUSES[0],DEVELOPER_EXCUSES[1],DEVELOPER_EXCUSES[2]],1]},
                    {"code":402,"indent":1,"parameters":[0,DEVELOPER_EXCUSES[0]]},
                    {"code":101,"indent":2,"parameters":["",0,0,2]},
                    {"code":401,"indent":2,"parameters":["DEBUG MENU: CORRECT. PROCEEDING TO QUESTION 2."]},
                    {"code":0,"indent":2,"parameters":[]},
                    {"code":402,"indent":1,"parameters":[1,DEVELOPER_EXCUSES[1]]},
                    {"code":101,"indent":2,"parameters":["",0,0,2]},
                    {"code":401,"indent":2,"parameters":["DEBUG MENU: CORRECT. PROCEEDING TO QUESTION 2."]},
                    {"code":0,"indent":2,"parameters":[]},
                    {"code":402,"indent":1,"parameters":[2,DEVELOPER_EXCUSES[2]]},
                    {"code":101,"indent":2,"parameters":["",0,0,2]},
                    {"code":401,"indent":2,"parameters":["DEBUG MENU: CORRECT. PROCEEDING TO QUESTION 2."]},
