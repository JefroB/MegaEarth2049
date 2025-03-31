/**
 * Body Modification Fast Travel System
 * 
 * This script implements various methods for players to return to Zed's clinic
 * from anywhere in the game, ensuring the body modification system is accessible
 * throughout the player's journey.
 */

const fs = require('fs');
const path = require('path');
const { backupFile } = require('../utils/core/backup-utils');
const { getMapData, saveMapData } = require('../utils/game/map-utils');

// Constants
const ZED_CLINIC_MAP_ID = 150; // Assuming this is the map ID for Zed's clinic
const ZED_CLINIC_X = 12; // Default X position when arriving at the clinic
const ZED_CLINIC_Y = 14; // Default Y position when arriving at the clinic

// Fast travel items
const FAST_TRAVEL_ITEMS = [
    {
        id: 'mod_doctor_hotline',
        name: 'Mod Doctor Hotline',
        description: 'A special item that calls one of Zed\'s assistants to escort you to the clinic from almost anywhere.',
        iconIndex: 186,
        price: 1000,
        consumable: false,
        cooldown: 24, // hours in game time
        switchId: 101 // Switch ID to track cooldown
    },
    {
        id: 'zeds_vip_card',
        name: 'Zed\'s VIP Card',
        description: 'Allows instant teleportation to the clinic from any safe location.',
        iconIndex: 83,
        price: 5000,
        consumable: false,
        cooldown: 6, // hours in game time
        switchId: 102 // Switch ID to track cooldown
    },
    {
        id: 'distress_beacon',
        name: 'Distress Beacon',
        description: 'Emergency extraction to Zed\'s clinic, causing damage and temporary stat penalties.',
        iconIndex: 189,
        price: 2500,
        consumable: false,
        cooldown: 72, // hours in game time
        switchId: 103, // Switch ID to track cooldown
        penalties: {
            health: 30, // % of max health lost
            stats: {
                strength: 2,
                endurance: 2,
                agility: 2
            },
            duration: 4 // hours in game time
        }
    }
];

// Transport NPCs - characters who can escort the player to Zed's clinic
const TRANSPORT_NPCS = [
    {
        name: "Courier",
        mapId: 8, // Timbuc Central Plaza
        x: 15,
        y: 18,
        appearance: "People1",
        index: 7,
        price: 100
    },
    {
        name: "Scavenger",
        mapId: 12, // Wasteland Outskirts
        x: 8,
        y: 10,
        appearance: "People2",
        index: 3,
        price: 200
    },
    {
        name: "Smuggler",
        mapId: 25, // Black Market
        x: 12,
        y: 7,
        appearance: "Actor1",
        index: 5,
        price: 150
    },
    {
        name: "Nomad",
        mapId: 38, // Desert Trading Post
        x: 20,
        y: 15,
        appearance: "Actor2",
        index: 2,
        price: 250
    },
    {
        name: "Junker",
        mapId: 41, // Scrapyard
        x: 5,
        y: 22,
        appearance: "People3",
        index: 4,
        price: 175
    }
];

/**
 * Adds fast travel items to the game's items database
 * @param {string} itemsPath - Path to Items.json
 * @returns {boolean} - Success status
 */
function addFastTravelItems(itemsPath) {
    try {
        // Backup the items file
        backupFile(itemsPath);
        
        // Read the items file
        const itemsData = JSON.parse(fs.readFileSync(itemsPath, 'utf8'));
        
        // Find the highest item ID
        let maxId = 0;
        itemsData.forEach(item => {
            if (item && item.id > maxId) {
                maxId = item.id;
            }
        });
        
        // Add our fast travel items
        FAST_TRAVEL_ITEMS.forEach((item, index) => {
            const itemId = maxId + index + 1;
            
            // Create the item object
            const newItem = {
                id: itemId,
                name: item.name,
                description: item.description,
                iconIndex: item.iconIndex,
                price: item.price,
                consumable: item.consumable,
                occasion: 3, // Menu item
                scope: 0, // None
                effects: [],
                note: `<bodyModFastTravel:${item.id}>`
            };
            
            // Add the item to the array
            itemsData.push(newItem);
            
            console.log(`Added fast travel item: ${item.name} (ID: ${itemId})`);
        });
        
        // Write the updated items file
        fs.writeFileSync(itemsPath, JSON.stringify(itemsData, null, 2), 'utf8');
        console.log(`Successfully updated ${itemsPath} with fast travel items`);
        
        return true;
    } catch (error) {
        console.error(`Error adding fast travel items: ${error.message}`);
        return false;
    }
}

/**
 * Adds transport NPCs to their respective maps
 * @param {string} mapsDir - Directory containing map JSON files
 * @returns {boolean} - Success status
 */
function addTransportNPCs(mapsDir) {
    try {
        let successCount = 0;
        
        // Process each transport NPC
        for (const npc of TRANSPORT_NPCS) {
            const mapPath = path.join(mapsDir, `Map${npc.mapId.toString().padStart(3, '0')}.json`);
            
            // Skip if map file doesn't exist
            if (!fs.existsSync(mapPath)) {
                console.warn(`Map file not found: ${mapPath}`);
                continue;
            }
            
            // Backup and read the map file
            backupFile(mapPath);
            const mapData = getMapData(mapPath);
            
            // Find the highest event ID
            let maxEventId = 0;
            if (mapData.events) {
                mapData.events.forEach(event => {
                    if (event && event.id > maxEventId) {
                        maxEventId = event.id;
                    }
                });
            } else {
                mapData.events = [];
            }
            
            // Create the NPC event
            const eventId = maxEventId + 1;
            const npcEvent = {
                id: eventId,
                name: `${npc.name} (Transport to Zed's Clinic)`,
                note: "Body Mod Transport NPC",
                pages: [
                    {
                        conditions: {
                            actorId: 1,
                            actorValid: false,
                            itemId: 1,
                            itemValid: false,
                            selfSwitchCh: "A",
                            selfSwitchValid: false,
                            switch1Id: 1,
                            switch1Valid: false,
                            switch2Id: 1,
                            switch2Valid: false,
                            variableId: 1,
                            variableValid: false,
                            variableValue: 0
                        },
                        directionFix: false,
                        image: {
                            characterIndex: npc.index,
                            characterName: npc.appearance,
                            direction: 2,
                            pattern: 1,
                            tileId: 0
                        },
                        list: [
                            {
                                code: 101,
                                indent: 0,
                                parameters: [npc.appearance, npc.index, 0, 2]
                            },
                            {
                                code: 401,
                                indent: 0,
                                parameters: [`${npc.name.toUpperCase()}: Need a ride to Zed's clinic?`]
                            },
                            {
                                code: 401,
                                indent: 0,
                                parameters: ["I can take you there for " + npc.price + " credits."]
                            },
                            {
                                code: 102,
                                indent: 0,
                                parameters: [["Yes (Pay " + npc.price + " credits)", "No"], 1, 0, 2, 0]
                            },
                            {
                                code: 402,
                                indent: 0,
                                parameters: [0, "Yes (Pay " + npc.price + " credits)"]
                            },
                            {
                                code: 111,
                                indent: 1,
                                parameters: [0, 0, 0, npc.price, false]
                            },
                            {
                                code: 122,
                                indent: 2,
                                parameters: [0, 0, 1, 0, npc.price]
                            },
                            {
                                code: 101,
                                indent: 2,
                                parameters: [npc.appearance, npc.index, 0, 2]
                            },
                            {
                                code: 401,
                                indent: 2,
                                parameters: [`${npc.name.toUpperCase()}: Alright, let's go!`]
                            },
                            {
                                code: 401,
                                indent: 2,
                                parameters: ["Hold on tight, it might get bumpy."]
                            },
                            {
                                code: 221,
                                indent: 2,
                                parameters: []
                            },
                            {
                                code: 201,
                                indent: 2,
                                parameters: [0, ZED_CLINIC_MAP_ID, ZED_CLINIC_X, ZED_CLINIC_Y, 0, 0]
                            },
                            {
                                code: 0,
                                indent: 2,
                                parameters: []
                            },
                            {
                                code: 411,
                                indent: 1,
                                parameters: []
                            },
                            {
                                code: 101,
                                indent: 2,
                                parameters: [npc.appearance, npc.index, 0, 2]
                            },
                            {
                                code: 401,
                                indent: 2,
                                parameters: [`${npc.name.toUpperCase()}: Sorry, you don't have enough credits.`]
                            },
                            {
                                code: 0,
                                indent: 2,
                                parameters: []
                            },
                            {
                                code: 412,
                                indent: 1,
                                parameters: []
                            },
                            {
                                code: 0,
                                indent: 1,
                                parameters: []
                            },
                            {
                                code: 402,
                                indent: 0,
                                parameters: [1, "No"]
                            },
                            {
                                code: 101,
                                indent: 1,
                                parameters: [npc.appearance, npc.index, 0, 2]
                            },
                            {
                                code: 401,
                                indent: 1,
                                parameters: [`${npc.name.toUpperCase()}: Suit yourself. I'll be here if you change your mind.`]
                            },
                            {
                                code: 0,
                                indent: 1,
                                parameters: []
                            },
                            {
                                code: 404,
                                indent: 0,
                                parameters: []
                            },
                            {
                                code: 0,
                                indent: 0,
                                parameters: []
                            }
                        ],
                        moveFrequency: 3,
                        moveRoute: {
                            list: [
                                {
                                    code: 0,
                                    parameters: []
                                }
                            ],
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
                x: npc.x,
                y: npc.y
            };
            
            // Add the NPC event to the map
            mapData.events[eventId] = npcEvent;
            
            // Save the updated map
            saveMapData(mapPath, mapData);
            
            console.log(`Added transport NPC ${npc.name} to Map${npc.mapId}`);
            successCount++;
        }
        
        console.log(`Successfully added ${successCount} transport NPCs`);
        return successCount > 0;
    } catch (error) {
        console.error(`Error adding transport NPCs: ${error.message}`);
        return false;
    }
}

/**
 * Adds fast travel options to all standard fast travel points
 * @param {string} commonEventsPath - Path to CommonEvents.json
 * @returns {boolean} - Success status
 */
function addFastTravelOptions(commonEventsPath) {
    try {
        // Backup the common events file
        backupFile(commonEventsPath);
        
        // Read the common events file
        const commonEventsData = JSON.parse(fs.readFileSync(commonEventsPath, 'utf8'));
        
        // Find the fast travel common event (assuming it exists)
        let fastTravelEvent = null;
        let fastTravelEventIndex = -1;
        
        for (let i = 0; i < commonEventsData.length; i++) {
            const event = commonEventsData[i];
            if (event && event.name && event.name.toLowerCase().includes("fast travel")) {
                fastTravelEvent = event;
                fastTravelEventIndex = i;
                break;
            }
        }
        
        if (!fastTravelEvent) {
            console.warn("Fast travel common event not found");
            return false;
        }
        
        // Find the location selection part of the event
        let choiceIndex = -1;
        for (let i = 0; i < fastTravelEvent.list.length; i++) {
            const command = fastTravelEvent.list[i];
            if (command.code === 102) { // Choice command
                choiceIndex = i;
                break;
            }
        }
        
        if (choiceIndex === -1) {
            console.warn("Location choice not found in fast travel event");
            return false;
        }
        
        // Add Zed's Clinic to the choices
        const choiceCommand = fastTravelEvent.list[choiceIndex];
        choiceCommand.parameters[0].push("Zed's Clinic (The Squeaky Clean)");
        
        // Find the highest choice handler index
        let maxChoiceHandlerIndex = -1;
        let choiceHandlerIndices = [];
        
        for (let i = choiceIndex + 1; i < fastTravelEvent.list.length; i++) {
            const command = fastTravelEvent.list[i];
            if (command.code === 402) { // Choice handler
                choiceHandlerIndices.push(i);
                maxChoiceHandlerIndex = i;
            } else if (command.code === 404) { // End of choice
                break;
            }
        }
        
        if (maxChoiceHandlerIndex === -1) {
            console.warn("Choice handlers not found in fast travel event");
            return false;
        }
        
        // Create the handler for Zed's Clinic
        const newChoiceHandler = {
            code: 402,
            indent: 0,
            parameters: [choiceCommand.parameters[0].length - 1, "Zed's Clinic (The Squeaky Clean)"]
        };
        
        // Create the teleport commands
        const teleportCommands = [
            {
                code: 101,
                indent: 1,
                parameters: ["", 0, 0, 2]
            },
            {
                code: 401,
                indent: 1,
                parameters: ["Traveling to Zed's Clinic..."]
            },
            {
                code: 221,
                indent: 1,
                parameters: []
            },
            {
                code: 201,
                indent: 1,
                parameters: [0, ZED_CLINIC_MAP_ID, ZED_CLINIC_X, ZED_CLINIC_Y, 0, 0]
            },
            {
                code: 0,
                indent: 1,
                parameters: []
            }
        ];
        
        // Insert the new choice handler and teleport commands
        fastTravelEvent.list.splice(maxChoiceHandlerIndex + 1, 0, newChoiceHandler, ...teleportCommands);
        
        // Save the updated common events
        fs.writeFileSync(commonEventsPath, JSON.stringify(commonEventsData, null, 2), 'utf8');
        
        console.log("Successfully added Zed's Clinic to fast travel options");
        return true;
    } catch (error) {
        console.error(`Error adding fast travel options: ${error.message}`);
        return false;
    }
}

/**
 * Creates plugin code for handling the fast travel items
 * @param {string} pluginsPath - Path to plugins.js
 * @returns {boolean} - Success status
 */
function createFastTravelPlugin(pluginsPath) {
    try {
        // Backup the plugins file
        backupFile(pluginsPath);
        
        // Read the plugins file
        const pluginsData = JSON.parse(fs.readFileSync(pluginsPath, 'utf8'));
        
        // Create the plugin object
        const bodyModFastTravelPlugin = {
            name: "BodyModFastTravel",
            status: true,
            description: "Implements fast travel to Zed's body modification clinic",
            parameters: {}
        };
        
        // Add the plugin to the array
        pluginsData.push(bodyModFastTravelPlugin);
        
        // Write the updated plugins file
        fs.writeFileSync(pluginsPath, JSON.stringify(pluginsData, null, 2), 'utf8');
        
        // Create the plugin JS file
        const pluginJsPath = path.join(path.dirname(pluginsPath), "plugins", "BodyModFastTravel.js");
        
        // Plugin code
        const pluginCode = `//=============================================================================
// BodyModFastTravel.js
//=============================================================================

/*:
 * @plugindesc Implements fast travel to Zed's body modification clinic
 * @author MegaEarth2049 Team
 *
 * @help
 * This plugin adds functionality for the body modification fast travel items:
 * - Mod Doctor Hotline
 * - Zed's VIP Card
 * - Distress Beacon
 */

// Register plugin
var Imported = Imported || {};
Imported.BodyModFastTravel = true;

(function() {
    // Constants
    const ZED_CLINIC_MAP_ID = ${ZED_CLINIC_MAP_ID};
    const ZED_CLINIC_X = ${ZED_CLINIC_X};
    const ZED_CLINIC_Y = ${ZED_CLINIC_Y};
    
    // Item use handlers
    const _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        _Game_Interpreter_pluginCommand.call(this, command, args);
        
        if (command === 'BodyModFastTravel') {
            const action = args[0];
            
            if (action === 'UseHotline') {
                // Show animation and message
                $gameMessage.add("Calling Zed's assistant...");
                $gameScreen.startFlash([255, 255, 255, 170], 60);
                
                // Wait a moment, then teleport
                setTimeout(() => {
                    $gamePlayer.reserveTransfer(ZED_CLINIC_MAP_ID, ZED_CLINIC_X, ZED_CLINIC_Y, 0, 0);
                    $gameSwitches.setValue(101, true); // Start cooldown
                }, 2000);
            }
            else if (action === 'UseVIPCard') {
                // Show animation and message
                $gameMessage.add("Activating VIP teleport...");
                $gameScreen.startFlash([0, 255, 255, 170], 60);
                
                // Instant teleport
                $gamePlayer.reserveTransfer(ZED_CLINIC_MAP_ID, ZED_CLINIC_X, ZED_CLINIC_Y, 0, 0);
                $gameSwitches.setValue(102, true); // Start cooldown
            }
            else if (action === 'UseDistressBeacon') {
                // Show animation and message
                $gameMessage.add("EMERGENCY EXTRACTION ACTIVATED");
                $gameScreen.startFlash([255, 0, 0, 170], 60);
                
                // Apply penalties
                const hpDamage = Math.floor($gameParty.leader().mhp * 0.3);
                $gameParty.leader().gainHp(-hpDamage);
                
                // Apply stat penalties
                $gameVariables.setValue(50, 2); // Strength penalty
                $gameVariables.setValue(51, 2); // Endurance penalty
                $gameVariables.setValue(52, 2); // Agility penalty
                $gameVariables.setValue(53, 4); // Duration in hours
                
                // Teleport
                $gamePlayer.reserveTransfer(ZED_CLINIC_MAP_ID, ZED_CLINIC_X, ZED_CLINIC_Y, 0, 0);
                $gameSwitches.setValue(103, true); // Start cooldown
            }
        }
    };
    
    // Item use handling
    const _Game_Item_prototype_onUse = Game_Item.prototype.onUse;
    Game_Item.prototype.onUse = function() {
        _Game_Item_prototype_onUse.call(this);
        
        // Check if this is a body mod fast travel item
        const item = this.object();
        if (item && item.note) {
            if (item.note.includes('<bodyModFastTravel:mod_doctor_hotline>')) {
                $gameMap._interpreter.pluginCommand('BodyModFastTravel', ['UseHotline']);
                return true;
            }
            else if (item.note.includes('<bodyModFastTravel:zeds_vip_card>')) {
                $gameMap._interpreter.pluginCommand('BodyModFastTravel', ['UseVIPCard']);
                return true;
            }
            else if (item.note.includes('<bodyModFastTravel:distress_beacon>')) {
                $gameMap._interpreter.pluginCommand('BodyModFastTravel', ['UseDistressBeacon']);
                return true;
            }
        }
        
        return false;
    };
})();`;

        // Write the plugin file
        fs.writeFileSync(pluginJsPath, pluginCode, 'utf8');
        
        console.log(`Successfully created plugin file: ${pluginJsPath}`);
        return true;
    } catch (error) {
        console.error(`Error creating fast travel plugin: ${error.message}`);
        return false;
    }
}

/**
 * Implements the body modification fast travel system
 * @param {Object} options - Configuration options
 * @param {string} options.dataDir - Path to the data directory
 * @param {string} options.jsDir - Path to the js directory
 * @returns {boolean} - Success status
 */
function implementBodyModFastTravel(options) {
    try {
        console.log("Implementing Body Modification Fast Travel System...");
        
        // Validate options
        if (!options || !options.dataDir || !options.jsDir) {
            console.error("Invalid options provided");
            return false;
        }
        
        // Define paths
        const itemsPath = path.join(options.dataDir, 'Items.json');
        const mapsDir = options.dataDir;
        const commonEventsPath = path.join(options.dataDir, 'CommonEvents.json');
        const pluginsPath = path.join(options.jsDir, 'plugins.js');
        
        // Validate paths
        if (!fs.existsSync(itemsPath)) {
            console.error(`Items.json not found at: ${itemsPath}`);
            return false;
        }
        
        if (!fs.existsSync(commonEventsPath)) {
            console.error(`CommonEvents.json not found at: ${commonEventsPath}`);
            return false;
        }
        
        if (!fs.existsSync(pluginsPath)) {
            console.error(`plugins.js not found at: ${pluginsPath}`);
            return false;
        }
        
        // Implement each component
        const itemsSuccess = addFastTravelItems(itemsPath);
        const npcsSuccess = addTransportNPCs(mapsDir);
        const fastTravelSuccess = addFastTravelOptions(commonEventsPath);
        const pluginSuccess = createFastTravelPlugin(pluginsPath);
        
        // Check results
        if (itemsSuccess && npcsSuccess && fastTravelSuccess && pluginSuccess) {
            console.log("Body Modification Fast Travel System successfully implemented!");
            return true;
        } else {
            console.warn("Body Modification Fast Travel System implementation completed with some issues.");
            return false;
        }
    } catch (error) {
        console.error(`Error implementing Body Modification Fast Travel System: ${error.message}`);
        return false;
    }
}

// Export functions
module.exports = {
    addFastTravelItems,
    addTransportNPCs,
    addFastTravelOptions,
    createFastTravelPlugin,
    implementBodyModFastTravel
};

// Run the implementation if this script is executed directly
if (require.main === module) {
    const options = {
        dataDir: path.join(__dirname, '..', 'data'),
        jsDir: path.join(__dirname, '..', 'js')
    };
    
    implementBodyModFastTravel(options);
}
