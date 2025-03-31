/**
 * Body Modification System Implementation
 * 
 * This script integrates all components of the body modification system:
 * - Dictionary updates
 * - Fast travel system
 * - Clinic map creation
 * - Items and modifications
 */

const fs = require('fs');
const path = require('path');
const { backupFile } = require('../utils/core/backup-utils');

// Import component scripts
const { updateAllDictionaries } = require('./update_dictionary_body_mod_terms');
const { implementBodyModFastTravel } = require('./add_body_mod_fast_travel');

/**
 * Creates the map for Zed's clinic
 * @param {string} mapsDir - Directory containing map JSON files
 * @param {number} mapId - ID to use for the new map
 * @returns {boolean} - Success status
 */
function createClinicMap(mapsDir, mapId = 150) {
    try {
        console.log(`Creating clinic map with ID: ${mapId}`);
        
        // Define the map file path
        const mapPath = path.join(mapsDir, `Map${mapId.toString().padStart(3, '0')}.json`);
        
        // Check if the map already exists
        if (fs.existsSync(mapPath)) {
            console.warn(`Map${mapId} already exists. Backing up before overwriting.`);
            backupFile(mapPath);
        }
        
        // Create the clinic map data
        const clinicMap = {
            "autoplayBgm": false,
            "autoplayBgs": false,
            "battleback1Name": "Cobblestone1",
            "battleback2Name": "Hospital",
            "bgm": {
                "name": "Dungeon3",
                "pan": 0,
                "pitch": 100,
                "volume": 90
            },
            "bgs": {
                "name": "Drips",
                "pan": 0,
                "pitch": 100,
                "volume": 40
            },
            "disableDashing": false,
            "displayName": "The Squeaky Clean",
            "encounterList": [],
            "encounterStep": 30,
            "height": 20,
            "note": "Zed's body modification clinic",
            "parallaxLoopX": false,
            "parallaxLoopY": false,
            "parallaxName": "",
            "parallaxShow": true,
            "parallaxSx": 0,
            "parallaxSy": 0,
            "scrollType": 0,
            "specifyBattleback": true,
            "tilesetId": 5,
            "width": 25,
            "data": [
                // This would be a large array of tile data
                // For brevity, we're using a placeholder array that would be replaced with actual tile data
                ...Array(20 * 25 * 6).fill(0)
            ],
            "events": [
                null, // Event 0 is always null
                {
                    "id": 1,
                    "name": "Zed",
                    "note": "Main mod doctor",
                    "pages": [
                        {
                            "conditions": {
                                "actorId": 1,
                                "actorValid": false,
                                "itemId": 1,
                                "itemValid": false,
                                "selfSwitchCh": "A",
                                "selfSwitchValid": false,
                                "switch1Id": 1,
                                "switch1Valid": false,
                                "switch2Id": 1,
                                "switch2Valid": false,
                                "variableId": 1,
                                "variableValid": false,
                                "variableValue": 0
                            },
                            "directionFix": false,
                            "image": {
                                "characterIndex": 0,
                                "characterName": "Actor1",
                                "direction": 2,
                                "pattern": 1,
                                "tileId": 0
                            },
                            "list": [
                                {
                                    "code": 101,
                                    "indent": 0,
                                    "parameters": ["Actor1", 0, 0, 2]
                                },
                                {
                                    "code": 401,
                                    "indent": 0,
                                    "parameters": ["ZED: Well, well! Another brave soul seeking"]
                                },
                                {
                                    "code": 401,
                                    "indent": 0,
                                    "parameters": ["improvement! Or is it desperation?"]
                                },
                                {
                                    "code": 401,
                                    "indent": 0,
                                    "parameters": ["*adjusts surgical mask with bloodstained gloves*"]
                                },
                                {
                                    "code": 401,
                                    "indent": 0,
                                    "parameters": ["What'll it be today? Something practical?"]
                                },
                                {
                                    "code": 401,
                                    "indent": 0,
                                    "parameters": ["Something deadly? Something... weird?"]
                                },
                                {
                                    "code": 102,
                                    "indent": 0,
                                    "parameters": [["Browse Modifications", "Ask About Quests", "Leave"], 1, 0, 2, 0]
                                },
                                {
                                    "code": 402,
                                    "indent": 0,
                                    "parameters": [0, "Browse Modifications"]
                                },
                                {
                                    "code": 356,
                                    "indent": 1,
                                    "parameters": ["OpenBodyModificationShop"]
                                },
                                {
                                    "code": 0,
                                    "indent": 1,
                                    "parameters": []
                                },
                                {
                                    "code": 402,
                                    "indent": 0,
                                    "parameters": [1, "Ask About Quests"]
                                },
                                {
                                    "code": 356,
                                    "indent": 1,
                                    "parameters": ["OpenZedQuestMenu"]
                                },
                                {
                                    "code": 0,
                                    "indent": 1,
                                    "parameters": []
                                },
                                {
                                    "code": 402,
                                    "indent": 0,
                                    "parameters": [2, "Leave"]
                                },
                                {
                                    "code": 101,
                                    "indent": 1,
                                    "parameters": ["Actor1", 0, 0, 2]
                                },
                                {
                                    "code": 401,
                                    "indent": 1,
                                    "parameters": ["ZED: Leaving with all your original parts?"]
                                },
                                {
                                    "code": 401,
                                    "indent": 1,
                                    "parameters": ["How disappointingly conventional!"]
                                },
                                {
                                    "code": 0,
                                    "indent": 1,
                                    "parameters": []
                                },
                                {
                                    "code": 404,
                                    "indent": 0,
                                    "parameters": []
                                },
                                {
                                    "code": 0,
                                    "indent": 0,
                                    "parameters": []
                                }
                            ],
                            "moveFrequency": 3,
                            "moveRoute": {
                                "list": [
                                    {
                                        "code": 0,
                                        "parameters": []
                                    }
                                ],
                                "repeat": true,
                                "skippable": false,
                                "wait": false
                            },
                            "moveSpeed": 3,
                            "moveType": 0,
                            "priorityType": 1,
                            "stepAnime": false,
                            "through": false,
                            "trigger": 0,
                            "walkAnime": true
                        }
                    ],
                    "x": 12,
                    "y": 10
                },
                {
                    "id": 2,
                    "name": "Assistant",
                    "note": "Zed's assistant",
                    "pages": [
                        {
                            "conditions": {
                                "actorId": 1,
                                "actorValid": false,
                                "itemId": 1,
                                "itemValid": false,
                                "selfSwitchCh": "A",
                                "selfSwitchValid": false,
                                "switch1Id": 1,
                                "switch1Valid": false,
                                "switch2Id": 1,
                                "switch2Valid": false,
                                "variableId": 1,
                                "variableValid": false,
                                "variableValue": 0
                            },
                            "directionFix": false,
                            "image": {
                                "characterIndex": 1,
                                "characterName": "People1",
                                "direction": 2,
                                "pattern": 1,
                                "tileId": 0
                            },
                            "list": [
                                {
                                    "code": 101,
                                    "indent": 0,
                                    "parameters": ["People1", 1, 0, 2]
                                },
                                {
                                    "code": 401,
                                    "indent": 0,
                                    "parameters": ["ASSISTANT: *nervously organizing tools*"]
                                },
                                {
                                    "code": 401,
                                    "indent": 0,
                                    "parameters": ["I used to be a patient, you know. Now I"]
                                },
                                {
                                    "code": 401,
                                    "indent": 0,
                                    "parameters": ["help out to pay off my... modifications."]
                                },
                                {
                                    "code": 401,
                                    "indent": 0,
                                    "parameters": ["*lowers voice* Word of advice: always ask"]
                                },
                                {
                                    "code": 401,
                                    "indent": 0,
                                    "parameters": ["what the side effects are BEFORE the surgery."]
                                },
                                {
                                    "code": 0,
                                    "indent": 0,
                                    "parameters": []
                                }
                            ],
                            "moveFrequency": 3,
                            "moveRoute": {
                                "list": [
                                    {
                                        "code": 0,
                                        "parameters": []
                                    }
                                ],
                                "repeat": true,
                                "skippable": false,
                                "wait": false
                            },
                            "moveSpeed": 3,
                            "moveType": 1,
                            "priorityType": 1,
                            "stepAnime": false,
                            "through": false,
                            "trigger": 0,
                            "walkAnime": true
                        }
                    ],
                    "x": 15,
                    "y": 8
                },
                {
                    "id": 3,
                    "name": "Operating Table",
                    "note": "Main surgery station",
                    "pages": [
                        {
                            "conditions": {
                                "actorId": 1,
                                "actorValid": false,
                                "itemId": 1,
                                "itemValid": false,
                                "selfSwitchCh": "A",
                                "selfSwitchValid": false,
                                "switch1Id": 1,
                                "switch1Valid": false,
                                "switch2Id": 1,
                                "switch2Valid": false,
                                "variableId": 1,
                                "variableValid": false,
                                "variableValue": 0
                            },
                            "directionFix": true,
                            "image": {
                                "characterIndex": 0,
                                "characterName": "",
                                "direction": 2,
                                "pattern": 1,
                                "tileId": 48
                            },
                            "list": [
                                {
                                    "code": 101,
                                    "indent": 0,
                                    "parameters": ["", 0, 0, 2]
                                },
                                {
                                    "code": 401,
                                    "indent": 0,
                                    "parameters": ["An operating table with suspicious stains."]
                                },
                                {
                                    "code": 401,
                                    "indent": 0,
                                    "parameters": ["Various surgical tools are arranged nearby,"]
                                },
                                {
                                    "code": 401,
                                    "indent": 0,
                                    "parameters": ["some of which don't look medical at all."]
                                },
                                {
                                    "code": 0,
                                    "indent": 0,
                                    "parameters": []
                                }
                            ],
                            "moveFrequency": 3,
                            "moveRoute": {
                                "list": [
                                    {
                                        "code": 0,
                                        "parameters": []
                                    }
                                ],
                                "repeat": true,
                                "skippable": false,
                                "wait": false
                            },
                            "moveSpeed": 3,
                            "moveType": 0,
                            "priorityType": 1,
                            "stepAnime": false,
                            "through": false,
                            "trigger": 0,
                            "walkAnime": true
                        }
                    ],
                    "x": 12,
                    "y": 7
                },
                {
                    "id": 4,
                    "name": "Parts Cabinet",
                    "note": "Storage for modification components",
                    "pages": [
                        {
                            "conditions": {
                                "actorId": 1,
                                "actorValid": false,
                                "itemId": 1,
                                "itemValid": false,
                                "selfSwitchCh": "A",
                                "selfSwitchValid": false,
                                "switch1Id": 1,
                                "switch1Valid": false,
                                "switch2Id": 1,
                                "switch2Valid": false,
                                "variableId": 1,
                                "variableValid": false,
                                "variableValue": 0
                            },
                            "directionFix": true,
                            "image": {
                                "characterIndex": 0,
                                "characterName": "",
                                "direction": 2,
                                "pattern": 1,
                                "tileId": 46
                            },
                            "list": [
                                {
                                    "code": 101,
                                    "indent": 0,
                                    "parameters": ["", 0, 0, 2]
                                },
                                {
                                    "code": 401,
                                    "indent": 0,
                                    "parameters": ["A cabinet filled with various body parts,"]
                                },
                                {
                                    "code": 401,
                                    "indent": 0,
                                    "parameters": ["some mechanical, some biological, and some"]
                                },
                                {
                                    "code": 401,
                                    "indent": 0,
                                    "parameters": ["that defy easy classification."]
                                },
                                {
                                    "code": 0,
                                    "indent": 0,
                                    "parameters": []
                                }
                            ],
                            "moveFrequency": 3,
                            "moveRoute": {
                                "list": [
                                    {
                                        "code": 0,
                                        "parameters": []
                                    }
                                ],
                                "repeat": true,
                                "skippable": false,
                                "wait": false
                            },
                            "moveSpeed": 3,
                            "moveType": 0,
                            "priorityType": 1,
                            "stepAnime": false,
                            "through": false,
                            "trigger": 0,
                            "walkAnime": true
                        }
                    ],
                    "x": 18,
                    "y": 5
                },
                {
                    "id": 5,
                    "name": "Exit",
                    "note": "Exit to Timbuc",
                    "pages": [
                        {
                            "conditions": {
                                "actorId": 1,
                                "actorValid": false,
                                "itemId": 1,
                                "itemValid": false,
                                "selfSwitchCh": "A",
                                "selfSwitchValid": false,
                                "switch1Id": 1,
                                "switch1Valid": false,
                                "switch2Id": 1,
                                "switch2Valid": false,
                                "variableId": 1,
                                "variableValid": false,
                                "variableValue": 0
                            },
                            "directionFix": true,
                            "image": {
                                "characterIndex": 0,
                                "characterName": "",
                                "direction": 2,
                                "pattern": 1,
                                "tileId": 0
                            },
                            "list": [
                                {
                                    "code": 201,
                                    "indent": 0,
                                    "parameters": [0, 8, 15, 18, 0, 0]
                                },
                                {
                                    "code": 0,
                                    "indent": 0,
                                    "parameters": []
                                }
                            ],
                            "moveFrequency": 3,
                            "moveRoute": {
                                "list": [
                                    {
                                        "code": 0,
                                        "parameters": []
                                    }
                                ],
                                "repeat": true,
                                "skippable": false,
                                "wait": false
                            },
                            "moveSpeed": 3,
                            "moveType": 0,
                            "priorityType": 0,
                            "stepAnime": false,
                            "through": false,
                            "trigger": 1,
                            "walkAnime": true
                        }
                    ],
                    "x": 12,
                    "y": 19
                }
            ]
        };
        
        // Write the map file
        fs.writeFileSync(mapPath, JSON.stringify(clinicMap, null, 2), 'utf8');
        
        // Update MapInfos.json to include the new map
        const mapInfosPath = path.join(mapsDir, 'MapInfos.json');
        if (fs.existsSync(mapInfosPath)) {
            backupFile(mapInfosPath);
            const mapInfos = JSON.parse(fs.readFileSync(mapInfosPath, 'utf8'));
            
            // Add the new map info
            mapInfos[mapId] = {
                "id": mapId,
                "expanded": false,
                "name": "The Squeaky Clean",
                "order": mapInfos.length + 1,
                "parentId": 0,
                "scrollX": 819,
                "scrollY": 461
            };
            
            // Write the updated MapInfos.json
            fs.writeFileSync(mapInfosPath, JSON.stringify(mapInfos, null, 2), 'utf8');
        }
        
        console.log(`Successfully created clinic map: Map${mapId}`);
        return true;
    } catch (error) {
        console.error(`Error creating clinic map: ${error.message}`);
        return false;
    }
}

/**
 * Updates the story file with body modification lore
 * @param {string} storyPath - Path to the story file
 * @returns {boolean} - Success status
 */
function updateStoryWithBodyModLore(storyPath) {
    try {
        // Check if the story file exists
        if (!fs.existsSync(storyPath)) {
            console.error(`Story file not found: ${storyPath}`);
            return false;
        }
        
        // Backup the story file
        backupFile(storyPath);
        
        // Read the story file
        const storyContent = fs.readFileSync(storyPath, 'utf8');
        
        // Check if body modification section already exists
        if (storyContent.includes("## Body Modification")) {
            console.warn("Body modification section already exists in the story file");
            return false;
        }
        
        // Create the body modification lore section
        const bodyModLore = `
## Body Modification

In the harsh world of MegaEarth 2049, body modifications are far more than cosmetic enhancements—they're often necessary survival adaptations. Unlike the clean, corporate-approved cybernetics of the elite, most wasteland dwellers rely on back-alley mod doctors using salvaged parts, experimental biotech, and questionable medical practices.

### Zed and "The Squeaky Clean"

The most notorious mod doctor in the wasteland is a former Vitalix biotech researcher known only as Zed. Operating out of his ironically-named clinic "The Squeaky Clean" in Timbuc, Zed offers a wide range of modifications to anyone with enough credits or interesting trade goods.

Zed was fired from Vitalix for what corporate documents describe as "excessive creativity" (corporate speak for "horrifically unethical experimentation"). Now he applies his considerable talents to the wasteland's modification market, where ethical constraints are as scarce as clean water.

His clinic is a paradoxical mix of cutting-edge technology and absolute squalor. Operating tables sit next to piles of salvaged parts, experimental serums bubble in beakers next to open cans of beer, and the floor is suspiciously sticky despite the name of the establishment.

What makes Zed unique is his willingness to install experimental modifications that other doctors wouldn't touch. His motto: "If it might work, it's worth trying! Refunds only available if you survive the procedure."

### Modification Categories

#### Cybernetic Modifications
Mechanical enhancements that replace or augment body parts with technological components. These include limb replacements, ocular implants, neural processors, subdermal armor, and weapon integrations.

#### Biological Modifications
Organic enhancements that alter the body's natural functions through genetic manipulation, grafting, or chemical treatments. These include muscle grafts, organ upgrades, symbiotic organisms, genetic splicing, and chemical glands.

#### Aesthetic Modifications
Appearance-altering modifications that may also provide minor functional benefits. These include dermal pigmentation, bioluminescence, structural alterations, decorative implants, and scarification.

#### Experimental Modifications
Highly unstable, unpredictable modifications with potentially powerful effects. These include reality anchors, quantum uncertainties, dimensional pockets, temporal disruptors, and consciousness expanders.

### Legendary Modifications

Rumors persist of extremely rare, powerful modifications that cannot be purchased directly. These legendary mods must be earned through specific quests or challenges:

- **The Prometheus Hand**: A cybernetic hand that can generate and control fire
- **Chameleon Skin**: Advanced biological modification that allows near-perfect camouflage
- **The Third Eye**: A mysterious implant that allows the user to see invisible entities and energy patterns
- **Quantum Heart**: A replacement heart that exists partially outside normal space-time
- **The Hive Mind**: A neural implant that allows the user to mentally control insects and small creatures
- **Chronos Module**: A temporal manipulation device that can briefly slow time from the user's perspective

### Modification Culture

Body modification has developed its own subculture in the wasteland. Different communities have different attitudes toward modifications:

- **Purists**: Reject all modifications as unnatural and dangerous
- **Moderates**: Accept practical modifications but avoid experimental ones
- **Enhancers**: Actively seek out modifications to transcend human limitations
- **Extremists**: Attempt to replace as much of their original body as possible

Some wasteland communities use specific modifications as marks of membership or status, while others have taboos against modifying certain body parts for religious or cultural reasons.

The most heavily modified individuals are sometimes called "Patchworks" or "Mosaics" due to their composite nature—part human, part machine, part something else entirely.
`;
        
        // Append the body modification lore to the story file
        fs.writeFileSync(storyPath, storyContent + bodyModLore, 'utf8');
        
        console.log("Successfully updated story with body modification lore");
        return true;
    } catch (error) {
        console.error(`Error updating story with body modification lore: ${error.message}`);
        return false;
    }
}

/**
 * Implements the body modification system
 * @param {Object} options - Configuration options
 * @param {string} options.dataDir - Path to the data directory
 * @param {string} options.jsDir - Path to the js directory
 * @param {string} options.storyPath - Path to the story file
 * @returns {boolean} - Success status
 */
function implementBodyModSystem(options) {
    try {
        console.log("Implementing Body Modification System...");
        
        // Validate options
        if (!options || !options.dataDir || !options.jsDir || !options.storyPath) {
            console.error("Invalid options provided");
            return false;
        }
        
        // Update dictionaries
        console.log("Updating dictionaries with body modification terms...");
        const dictionarySuccess = updateAllDictionaries();
        
        // Create clinic map
        console.log("Creating clinic map...");
        const mapSuccess = createClinicMap(options.dataDir);
        
        // Implement fast travel system
        console.log("Implementing fast travel system...");
        const fastTravelSuccess = implementBodyModFastTravel({
            dataDir: options.dataDir,
            jsDir: options.jsDir
        });
        
        // Update story with body modification lore
        console.log("Updating story with body modification lore...");
        const storySuccess = updateStoryWithBodyModLore(options.storyPath);
        
        // Check results
        if (dictionarySuccess && mapSuccess && fastTravelSuccess && storySuccess) {
            console.log("Body Modification System successfully implemented!");
            return true;
        } else {
            console.warn("Body Modification System implementation completed with some issues.");
            return false;
        }
    } catch (error) {
        console.error(`Error implementing Body Modification System: ${error.message}`);
        return false;
    }
}

// Export functions
module.exports = {
    createClinicMap,
    updateStoryWithBodyModLore,
    implementBodyModSystem
};

// Run the implementation if this script is executed directly
if (require.main === module) {
    const options = {
        dataDir: path.join(__dirname, '..', 'data'),
        jsDir: path.join(__dirname, '..', 'js'),
        storyPath: path.join(__dirname, '..', 'MegaEarth2049_Story.md')
    };
    
    implementBodyModSystem(options);
}
