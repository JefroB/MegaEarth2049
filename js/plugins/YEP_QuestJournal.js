//=============================================================================
// YEP_QuestJournal.js
// Version: 1.0.0
//=============================================================================

var Imported = Imported || {};
Imported.YEP_QuestJournal = true;

var Yanfly = Yanfly || {};
Yanfly.Quest = Yanfly.Quest || {};
Yanfly.Quest.version = 1.00;

//=============================================================================
/*:
 * @plugindesc v1.00 Quest Journal System for RPG Maker MV
 * @author Yanfly Engine Plugins
 *
 * @param ---General---
 * @default
 *
 * @param Quest Command
 * @parent ---General---
 * @desc This is the text used for the quest command in the menu.
 * @default Quest
 *
 * @param Show Command
 * @parent ---General---
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the Quest command in the main menu by default?
 * NO - false     YES - true
 * @default true
 *
 * @param Enable Command
 * @parent ---General---
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enable the Quest command in the main menu by default?
 * NO - false     YES - true
 * @default true
 *
 * @param Auto Add Quests
 * @parent ---General---
 * @type boolean
 * @on YES
 * @off NO
 * @desc Automatically add new quests to the Quest Journal?
 * NO - false     YES - true
 * @default true
 *
 * @param ---Quest Categories---
 * @default
 *
 * @param Category 1
 * @parent ---Quest Categories---
 * @desc Name of category 1.
 * @default Main Quests
 *
 * @param Category 2
 * @parent ---Quest Categories---
 * @desc Name of category 2.
 * @default Side Quests
 *
 * @param Category 3
 * @parent ---Quest Categories---
 * @desc Name of category 3.
 * @default Character Quests
 *
 * @param Category 4
 * @parent ---Quest Categories---
 * @desc Name of category 4.
 * @default Tutorial Quests
 *
 * @param Category 5
 * @parent ---Quest Categories---
 * @desc Name of category 5.
 * @default
 *
 * @param Category 6
 * @parent ---Quest Categories---
 * @desc Name of category 6.
 * @default
 *
 * @param Category 7
 * @parent ---Quest Categories---
 * @desc Name of category 7.
 * @default
 *
 * @param Category 8
 * @parent ---Quest Categories---
 * @desc Name of category 8.
 * @default
 *
 * @param Category 9
 * @parent ---Quest Categories---
 * @desc Name of category 9.
 * @default
 *
 * @param Category 10
 * @parent ---Quest Categories---
 * @desc Name of category 10.
 * @default
 *
 * @param ---Quest List---
 * @default
 *
 * @param Quest 1
 * @parent ---Quest List---
 * @desc Quest 1 data. Format: [name, category, difficulty, from, location, description, objectives, rewards, subtext, quotes]
 * @default
 *
 * @param Quest 2
 * @parent ---Quest List---
 * @desc Quest 2 data. Format: [name, category, difficulty, from, location, description, objectives, rewards, subtext, quotes]
 * @default
 *
 * @param Quest 3
 * @parent ---Quest List---
 * @desc Quest 3 data. Format: [name, category, difficulty, from, location, description, objectives, rewards, subtext, quotes]
 * @default
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin adds a Quest Journal system to your game. Players can now keep
 * track of their current quests, completed quests, and failed quests. Quests
 * can be broken down into categories, can have multiple objectives, and can
 * be completed or failed based on switches or variables.
 *
 * ============================================================================
 * Instructions
 * ============================================================================
 *
 * This plugin uses a custom data format for quests. Each quest has the
 * following properties:
 *
 * - Name: The name of the quest
 * - Category: The category the quest belongs to
 * - Difficulty: A number representing the quest's difficulty
 * - From: Who gave the quest
 * - Location: Where the quest takes place
 * - Description: A description of the quest
 * - Objectives: A list of objectives for the quest
 * - Rewards: A list of rewards for completing the quest
 * - Subtext: Additional text for the quest
 * - Quotes: A list of quotes related to the quest
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * The following plugin commands can be used to manipulate quests:
 *
 * Quest Add questID
 * - Adds the specified quest to the player's quest journal
 *
 * Quest Remove questID
 * - Removes the specified quest from the player's quest journal
 *
 * Quest Complete questID
 * - Marks the specified quest as completed
 *
 * Quest Fail questID
 * - Marks the specified quest as failed
 *
 * Quest SetObjective questID objectiveID status
 * - Sets the status of the specified objective for the specified quest
 * - status can be "complete" or "incomplete"
 *
 * ============================================================================
 * Script Calls
 * ============================================================================
 *
 * The following script calls can be used to manipulate quests:
 *
 * $gameSystem.addQuest(questID)
 * - Adds the specified quest to the player's quest journal
 *
 * $gameSystem.removeQuest(questID)
 * - Removes the specified quest from the player's quest journal
 *
 * $gameSystem.completeQuest(questID)
 * - Marks the specified quest as completed
 *
 * $gameSystem.failQuest(questID)
 * - Marks the specified quest as failed
 *
 * $gameSystem.setQuestObjective(questID, objectiveID, status)
 * - Sets the status of the specified objective for the specified quest
 * - status can be true (complete) or false (incomplete)
 *
 * $gameSystem.isQuestObjectiveComplete(questID, objectiveID)
 * - Returns true if the specified objective for the specified quest is complete
 *
 * $gameSystem.isQuestComplete(questID)
 * - Returns true if the specified quest is complete
 *
 * $gameSystem.isQuestFailed(questID)
 * - Returns true if the specified quest is failed
 *
 * $gameSystem.isQuestKnown(questID)
 * - Returns true if the specified quest is in the player's quest journal
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.00:
 * - Initial release
 *
 */
//=============================================================================

// Generated Quest Data
var QuestData = {
  "CategoryNames": "Main Story\nSide Quests\nCollection\nCharacter Quests\nLocation Quests",
  "CategoryIcons": "0\n0\n0\n0\n0",
  "ListWindowCols": 1,
  "ListTextAlign": "left",
  "ListLineHeight": 36,
  "ListWindowWidth": 400,
  "ListWindowHeight": "auto",
  "ListWindowX": 0,
  "ListWindowY": 0,
  "ListWindowSkin": "Window",
  "ListWindowFontFace": "GameFont",
  "ListWindowFontSize": 28,
  "DataWindowWidth": 400,
  "DataWindowHeight": "auto",
  "DataWindowX": 400,
  "DataWindowY": 0,
  "DataWindowSkin": "Window",
  "DataWindowFontFace": "GameFont",
  "DataWindowFontSize": 28,
  "CommandWindowWidth": 240,
  "CommandWindowCols": 1,
  "CommandWindowRows": 4,
  "CommandWindowX": 0,
  "CommandWindowY": 0,
  "CommandWindowSkin": "Window",
  "CommandWindowFontFace": "GameFont",
  "CommandWindowFontSize": 28,
  "TextHeaderQuest": "Quest",
  "TextHeaderFrom": "From",
  "TextHeaderLocation": "Location",
  "TextHeaderDescription": "Description",
  "TextHeaderObjectives": "Objectives",
  "TextHeaderRewards": "Rewards",
  "TextHeaderSubtext": "Subtext",
  "TextHeaderQuotes": "Quotes",
  "CommandWindow_Known_Text": "Available",
  "CommandWindow_Completed_Text": "Completed",
  "CommandWindow_Failed_Text": "Failed",
  "CommandWindow_All_Text": "All",
  "QuestData": "Quest 1: The Mysterious Necklace\nCategory: 1\nDifficulty: 2\nFrom: Inn guest\nLocation: Timbuc cellar and inn\nDescription: The inn guest asks for four necklace fragments from the cellar. Return them to the guest for the repaired necklace.\nObjectives:\n- Collect four cellar fragments\n- Return to the inn guest\nRewards:\n- Repaired necklace key item\n\nQuest 2: The Engine Reconstruction\nCategory: 2\nDifficulty: 2\nFrom: Armatek engineer\nLocation: Cellar, construction site, drone, Armatek office; MegaEarth mechanic\nDescription: Collect the blueprint and components A, B and C. The mechanic on MegaEarth assembles them. This is distinct from Zack's stolen crane engine.\nObjectives:\n- Find the blueprint in the cellar\n- Find all three components\n- Visit the MegaEarth mechanic\nRewards:\n- Completed Engine key item; blueprint and components consumed\n\nQuest 9: The Mysterious Smelly Keys\nCategory: 3\nDifficulty: 2\nFrom: Cellar exploration\nLocation: Timbuc Cellar\nDescription: Find the numbered smelly keys and investigate the locked cellar passages. Read each door's requirement; no fixed total credit or equipment reward is guaranteed.\nObjectives:\n- Explore the cellar\n- Match keys to locked doors\nRewards:\n- Access through their corresponding locked doors\n\nQuest 11: The Ancient Necklace\nCategory: 4\nDifficulty: 2\nFrom: Exploration\nLocation: BMNEC, Ork and Floating Mansion\nDescription: Distinct named fragments exist outside the cellar. Their assembly and equipment payoff are not implemented; this is a development lead, not an available accessory quest.\nObjectives:\n- Development lead: assembly route not implemented\nRewards:\n- No implemented accessory or stat bonus\n\nQuest 4: Zed's Clinic\nCategory: 4\nDifficulty: 2\nFrom: Zed\nLocation: Clinic\nDescription: Clinic story material exists. The rare-material exchange, discount and enhancement quest described in older notes is not implemented.\nObjectives:\n- Development lead: clinic exchange not implemented\nRewards:\n- No implemented quest reward\n\nQuest 5: Digital Detox\nCategory: 5\nDifficulty: 2\nFrom: Research notes\nLocation: Floating Mansion\nDescription: The purification-device quest described in older notes is not implemented. It does not unlock a drone-disable ability.\nObjectives:\n- Development lead: device quest not implemented\nRewards:\n- No implemented quest reward\n\nQuest 6: Jen's Lost Necklace\nCategory: 4\nDifficulty: 2\nFrom: Inn guest\nLocation: Timbuc cellar, inn and Jen's house\nDescription: Recover the cellar fragments and have the inn guest repair the necklace. Visit Jen when the recruitment flag is enabled.\nObjectives:\n- Recover four cellar fragments\n- Return to the inn guest\n- Visit Jen at her house\nRewards:\n- Jen joins the party\n\nQuest 7: Ninja Recruitment\nCategory: 4\nDifficulty: 2\nFrom: Pink Ninja\nLocation: Timbuc 2 / Church Street\nDescription: Defeat Pink Ninja to earn her respect and recruit her. No ordered green, brown and blue ninja prerequisite is enforced.\nObjectives:\n- Defeat Pink Ninja\nRewards:\n- Pink Ninja joins the party once\n\nQuest 8: Bridge to Timbuc 2\nCategory: 4\nDifficulty: 2\nFrom: Zack\nLocation: Zack's house and Timbuc Cellar\nDescription: Zack needs his stolen crane engine to repair the bridge so medicine can reach his sick grandfather. This is separate from the experimental-engine reconstruction.\nObjectives:\n- Find the thief in the cellar\n- Recover the stolen engine\n- Return to Zack\nRewards:\n- Progress the bridge-repair story\n"
};

// End of YEP_QuestJournal.js
