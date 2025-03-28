/**
 * singing_boss_battles.js
 * 
 * This script creates special singing boss battles where the bosses
 * perform musical numbers during combat. It uses the MegaEarth2049
 * dictionary, thesaurus, and rhyming dictionary to create songs.
 */

const fs = require('fs');
const path = require('path');
const enemySinging = require('./enemy_singing_dialogue');

// Paths
const TROOPS_PATH = path.join(__dirname, '..', 'data', 'Troops.json');
const DICTIONARY_PATH = path.join(__dirname, '..', 'DICTIONARY', 'DICTIONARY.md');
const RHYMING_DICTIONARY_PATH = path.join(__dirname, '..', 'DICTIONARY', 'RHYMING_DICTIONARY.md');

/**
 * Generate a boss musical number with multiple verses and a chorus
 * @param {string} bossType - The type of boss (e.g., 'corporate', 'mutant', etc.)
 * @returns {Object} - Object containing verses and chorus for the musical number
 */
function generateBossMusicalNumber(bossType) {
    // Default musical numbers if we can't load from files
    const defaultMusicalNumbers = {
        'corporate': {
            chorus: [
                "♪ I am the CEO with Terminal Ambition! ♪",
                "♪ My Profit-Induced Psychopathy is my mission! ♪",
                "♪ Join the Corp-Zombs in our Synergy Initiative! ♪",
                "♪ Or face the Brain Stapler's definitive decision! ♪"
            ],
            verses: [
                [
                    "♪ OmniCorp's reach extends through every sector, ♪",
                    "♪ My Chemical Leash keeps all workers in vector, ♪",
                    "♪ Your Resistance Directive is merely a specter, ♪",
                    "♪ Against my Corporate Personhood Disorder projector! ♪"
                ],
                [
                    "♪ NeuraTech implants monitor your every thought, ♪",
                    "♪ Committing Thought Crime is how you got caught, ♪",
                    "♪ Your Digital Graffiti rebellion will come to naught, ♪",
                    "♪ As my Neural Puppets show you what Vitalix has wrought! ♪"
                ]
            ]
        },
        'mutant': {
            chorus: [
                "♪ Experimental Fluid flows through my veins! ♪",
                "♪ Vitalix's treatments have scrambled my brains! ♪",
                "♪ My mutations give me extraordinary gains! ♪",
                "♪ As I sing this song of radioactive refrains! ♪"
            ],
            verses: [
                [
                    "♪ I was once human before the Pandemic Mechanics, ♪",
                    "♪ Now I'm a walking showcase of genetic polemics, ♪",
                    "♪ My Rad-Hoarder Syndrome gives me academic credentials, ♪",
                    "♪ In the wasteland's school of mutant aesthetics! ♪"
                ],
                [
                    "♪ The Trash Octopus taught me how to adapt, ♪",
                    "♪ To a body that's been thoroughly remapped, ♪",
                    "♪ My Reality Refugee status has me trapped, ♪",
                    "♪ In this Pocket Reality where I'm gift-wrapped! ♪"
                ]
            ]
        },
        'tech': {
            chorus: [
                "♪ My Neural Hardware is state of the art! ♪",
                "♪ This Back-Alley Firmware is just the start! ♪",
                "♪ My Cerebral Firewall keeps us apart! ♪",
                "♪ As I calculate the ways to break your heart! ♪"
            ],
            verses: [
                [
                    "♪ I'm a Wire-Head with a Quantum Jumper mind, ♪",
                    "♪ My Tech-Barnacle upgrades leave humans behind, ♪",
                    "♪ The Reality Rewrite Protocol has me designed, ♪",
                    "♪ To sing this song as your demise is signed! ♪"
                ],
                [
                    "♪ The Glitch Witch couldn't hack my system, ♪",
                    "♪ My Data Dumper backups give me wisdom, ♪",
                    "♪ Your attempts to shut me down are schism, ♪",
                    "♪ Against my digital mind's perfect rhythm! ♪"
                ]
            ]
        },
        'wasteland': {
            chorus: [
                "♪ I'm the king of this wasteland domain! ♪",
                "♪ My Gunk Punk army will bring you pain! ♪",
                "♪ The Sewer Sommelier taught me this refrain! ♪",
                "♪ As I sing this song again and again! ♪"
            ],
            verses: [
                [
                    "♪ The Waste Wizard crowned me with toxic might, ♪",
                    "♪ My Rust Lung voice echoes through the night, ♪",
                    "♪ The Corporate Dropout Collective trembles in fright, ♪",
                    "♪ As my Funk Trunk beats give musical delight! ♪"
                ],
                [
                    "♪ I climbed from the Sewer Rung to the top, ♪",
                    "♪ The Junk Monk's teachings helped me hop, ♪",
                    "♪ Over Corpse-orate barriers that tried to stop, ♪",
                    "♪ My rise to power that will never drop! ♪"
                ]
            ]
        }
    };
    
    // Try to load from rhyming dictionary
    try {
        if (fs.existsSync(RHYMING_DICTIONARY_PATH)) {
            // Implementation for loading from rhyming dictionary would go here
            // For now, we'll use the default musical numbers
        }
    } catch (error) {
        console.error('Error loading from rhyming dictionary:', error);
    }
    
    return defaultMusicalNumbers[bossType] || defaultMusicalNumbers['wasteland'];
}

/**
 * Create a singing boss battle event
 * @param {Object} troop - The troop object to add singing dialogue to
 * @param {string} bossType - The type of boss (e.g., 'corporate', 'mutant', etc.)
 * @returns {Object} - The updated troop object with singing boss battle
 */
function createSingingBossBattle(troop, bossType) {
    // Generate a musical number for the boss
    const musicalNumber = generateBossMusicalNumber(bossType);
    
    // Create pages for the musical number
    const pages = [];
    
    // Create a page for the introduction
    const introPage = {
        "conditions": {
            "actorHp": 50,
            "actorId": 1,
            "actorValid": false,
            "enemyHp": 100,
            "enemyIndex": 0,
            "enemyValid": true,
            "switchId": 1,
            "switchValid": false,
            "turnA": 1,
            "turnB": 1,
            "turnEnding": false,
            "turnValid": true
        },
        "list": [
            {
                "code": 101,
                "indent": 0,
                "parameters": ["", 0, 0, 0]
            },
            {
                "code": 401,
                "indent": 0,
                "parameters": ["Prepare yourself for a musical battle!"]
            },
            {
                "code": 0,
                "indent": 0,
                "parameters": []
            }
        ],
        "span": 0
    };
    
    pages.push(introPage);
    
    // Create a page for the chorus (first appearance)
    const chorusPage1 = {
        "conditions": {
            "actorHp": 50,
            "actorId": 1,
            "actorValid": false,
            "enemyHp": 90,
            "enemyIndex": 0,
            "enemyValid": true,
            "switchId": 1,
            "switchValid": false,
            "turnA": 2,
            "turnB": 2,
            "turnEnding": false,
            "turnValid": true
        },
        "list": [
            {
                "code": 101,
                "indent": 0,
                "parameters": ["", 0, 0, 0]
            }
        ],
        "span": 0
    };
    
    // Add chorus lines
    for (const line of musicalNumber.chorus) {
        chorusPage1.list.push({
            "code": 401,
            "indent": 0,
            "parameters": [line]
        });
    }
    
    // Add end command
    chorusPage1.list.push({
        "code": 0,
        "indent": 0,
        "parameters": []
    });
    
    pages.push(chorusPage1);
    
    // Create a page for the first verse
    const verse1Page = {
        "conditions": {
            "actorHp": 50,
            "actorId": 1,
            "actorValid": false,
            "enemyHp": 75,
            "enemyIndex": 0,
            "enemyValid": true,
            "switchId": 1,
            "switchValid": false,
            "turnA": 3,
            "turnB": 3,
            "turnEnding": false,
            "turnValid": true
        },
        "list": [
            {
                "code": 101,
                "indent": 0,
                "parameters": ["", 0, 0, 0]
            }
        ],
        "span": 0
    };
    
    // Add verse 1 lines
    for (const line of musicalNumber.verses[0]) {
        verse1Page.list.push({
            "code": 401,
            "indent": 0,
            "parameters": [line]
        });
    }
    
    // Add end command
    verse1Page.list.push({
        "code": 0,
        "indent": 0,
        "parameters": []
    });
    
    pages.push(verse1Page);
    
    // Create a page for the chorus (second appearance)
    const chorusPage2 = {
        "conditions": {
            "actorHp": 50,
            "actorId": 1,
            "actorValid": false,
            "enemyHp": 60,
            "enemyIndex": 0,
            "enemyValid": true,
            "switchId": 1,
            "switchValid": false,
            "turnA": 4,
            "turnB": 4,
            "turnEnding": false,
            "turnValid": true
        },
        "list": [
            {
                "code": 101,
                "indent": 0,
                "parameters": ["", 0, 0, 0]
            }
        ],
        "span": 0
    };
    
    // Add chorus lines
    for (const line of musicalNumber.chorus) {
        chorusPage2.list.push({
            "code": 401,
            "indent": 0,
            "parameters": [line]
        });
    }
    
    // Add end command
    chorusPage2.list.push({
        "code": 0,
        "indent": 0,
        "parameters": []
    });
    
    pages.push(chorusPage2);
    
    // Create a page for the second verse
    const verse2Page = {
        "conditions": {
            "actorHp": 50,
            "actorId": 1,
            "actorValid": false,
            "enemyHp": 40,
            "enemyIndex": 0,
            "enemyValid": true,
            "switchId": 1,
            "switchValid": false,
            "turnA": 5,
            "turnB": 5,
            "turnEnding": false,
            "turnValid": true
        },
        "list": [
            {
                "code": 101,
                "indent": 0,
                "parameters": ["", 0, 0, 0]
            }
        ],
        "span": 0
    };
    
    // Add verse 2 lines
    for (const line of musicalNumber.verses[1]) {
        verse2Page.list.push({
            "code": 401,
            "indent": 0,
            "parameters": [line]
        });
    }
    
    // Add end command
    verse2Page.list.push({
        "code": 0,
        "indent": 0,
        "parameters": []
    });
    
    pages.push(verse2Page);
    
    // Create a page for the final chorus
    const finalChorusPage = {
        "conditions": {
            "actorHp": 50,
            "actorId": 1,
            "actorValid": false,
            "enemyHp": 25,
            "enemyIndex": 0,
            "enemyValid": true,
            "switchId": 1,
            "switchValid": false,
            "turnA": 6,
            "turnB": 6,
            "turnEnding": false,
            "turnValid": true
        },
        "list": [
            {
                "code": 101,
                "indent": 0,
                "parameters": ["", 0, 0, 0]
            }
        ],
        "span": 0
    };
    
    // Add chorus lines (with more emphasis)
    for (const line of musicalNumber.chorus) {
        finalChorusPage.list.push({
            "code": 401,
            "indent": 0,
            "parameters": [line.replace("♪", "♫").replace("♪", "♫")]
        });
    }
    
    // Add end command
    finalChorusPage.list.push({
        "code": 0,
        "indent": 0,
        "parameters": []
    });
    
    pages.push(finalChorusPage);
    
    // Create a page for the finale
    const finalePage = {
        "conditions": {
            "actorHp": 50,
            "actorId": 1,
            "actorValid": false,
            "enemyHp": 10,
            "enemyIndex": 0,
            "enemyValid": true,
            "switchId": 1,
            "switchValid": false,
            "turnA": 0,
            "turnB": 0,
            "turnEnding": false,
            "turnValid": false
        },
        "list": [
            {
                "code": 101,
                "indent": 0,
                "parameters": ["", 0, 0, 0]
            },
            {
                "code": 401,
                "indent": 0,
                "parameters": ["♫ GRAND FINALE! ♫"]
            },
            {
                "code": 401,
                "indent": 0,
                "parameters": ["♫ Thank you, wasteland! I'll be here all week! ♫"]
            },
            {
                "code": 401,
                "indent": 0,
                "parameters": ["♫ Or at least until you defeat me! ♫"]
            },
            {
                "code": 0,
                "indent": 0,
                "parameters": []
            }
        ],
        "span": 0
    };
    
    pages.push(finalePage);
    
    // Add the pages to the troop
    troop.pages = pages;
    
    return troop;
}

/**
 * Add singing boss battles to specific troops
 * @param {Object[]} troops - Array of troop objects
 * @returns {Object[]} - Updated array of troop objects with singing boss battles
 */
function addSingingBossBattles(troops) {
    // Define boss troops and their types
    const bossTroops = [
        { id: 15, type: 'ninja' },     // Pink Ninja
        { id: 19, type: 'mutant' },    // Earth Wind & Fire
        { id: 28, type: 'punk' },      // Punk1, Punk2, Punk3
        { id: 36, type: 'wasteland' },  // Poopoo Caca
        { id: 46, type: 'tech' }       // Punkboss1, Giant Spider*3
    ];
    
    // Add singing boss battles to the specified troops
    for (const bossTroop of bossTroops) {
        if (troops[bossTroop.id]) {
            troops[bossTroop.id] = createSingingBossBattle(troops[bossTroop.id], bossTroop.type);
        }
    }
    
    return troops;
}

/**
 * Main function to add singing boss battles
 */
function main() {
    console.log('Adding singing boss battles...');
    
    try {
        // Read the troops file
        if (!fs.existsSync(TROOPS_PATH)) {
            console.error('Troops file not found:', TROOPS_PATH);
            return false;
        }
        
        const troopsData = JSON.parse(fs.readFileSync(TROOPS_PATH, 'utf8'));
        
        // Create a backup of the original file
        const backupPath = `${TROOPS_PATH}.boss.bak`;
        fs.writeFileSync(backupPath, JSON.stringify(troopsData, null, 2));
        console.log('Created backup of original troops file:', backupPath);
        
        // Add singing boss battles
        const updatedTroops = addSingingBossBattles(troopsData);
        
        // Write the updated troops file
        fs.writeFileSync(TROOPS_PATH, JSON.stringify(updatedTroops, null, 2));
        console.log('Successfully added singing boss battles!');
        
        return true;
    } catch (error) {
        console.error('Error adding singing boss battles:', error);
        return false;
    }
}

/**
 * Create a custom singing boss battle for a specific troop
 * @param {number} troopId - The ID of the troop to add singing boss battle to
 * @param {string} bossType - The type of boss (e.g., 'corporate', 'mutant', etc.)
 */
function createCustomSingingBossBattle(troopId, bossType) {
    try {
        // Read the troops file
        if (!fs.existsSync(TROOPS_PATH)) {
            console.error('Troops file not found:', TROOPS_PATH);
            return false;
        }
        
        const troopsData = JSON.parse(fs.readFileSync(TROOPS_PATH, 'utf8'));
        
        // Find the troop by ID
        if (!troopsData[troopId]) {
            console.error('Troop not found with ID:', troopId);
            return false;
        }
        
        // Create a singing boss battle for the troop
        troopsData[troopId] = createSingingBossBattle(troopsData[troopId], bossType);
        
        // Write the updated troops file
        fs.writeFileSync(TROOPS_PATH, JSON.stringify(troopsData, null, 2));
        console.log(`Successfully added singing boss battle to troop ID ${troopId}!`);
        
        return true;
    } catch (error) {
        console.error('Error adding custom singing boss battle:', error);
        return false;
    }
}

// Export functions for use in other scripts
module.exports = {
    addSingingBossBattles,
    createSingingBossBattle,
    createCustomSingingBossBattle,
    generateBossMusicalNumber,
    main
};

// Run the main function if this script is executed directly
if (require.main === module) {
    main();
}
