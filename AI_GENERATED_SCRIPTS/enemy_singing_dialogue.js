/**
 * enemy_singing_dialogue.js
 * 
 * This script adds singing dialogue to enemies during battle.
 * It uses the MegaEarth2049 dictionary, thesaurus, and rhyming dictionary
 * to create songs for enemies to sing during combat.
 */

const fs = require('fs');
const path = require('path');

// Paths
const TROOPS_PATH = path.join(__dirname, '..', 'data', 'Troops.json');
const DICTIONARY_PATH = path.join(__dirname, '..', 'DICTIONARY', 'DICTIONARY.md');
const RHYMING_DICTIONARY_PATH = path.join(__dirname, '..', 'DICTIONARY', 'RHYMING_DICTIONARY.md');

/**
 * Generate a song verse using terms from the dictionary and rhyming patterns
 * @param {string} rhymePattern - The rhyming pattern to use (e.g., 'ech', 'orp', etc.)
 * @param {string} theme - The theme of the song (e.g., 'corporate', 'wasteland', etc.)
 * @returns {string[]} - Array of lines for the song verse
 */
function generateSongVerse(rhymePattern, theme) {
    // Default verses if we can't load the rhyming dictionary
    const defaultVerses = {
        'corporate': [
            "Working for OmniCorp has rotted my brain,",
            "Now I'm a Corp-Zomb feeling nothing but pain.",
            "My Chemical Leash keeps me singing this song,",
            "Join our Corpse-orate family, where you belong!"
        ],
        'wasteland': [
            "I'm a Gunk Punk with a case of Rust Lung,",
            "In this wasteland where toxic waste gets flung.",
            "Got Rad-Hoarder Syndrome from climbing each rung,",
            "Now I'm singing this song that should never be sung!"
        ],
        'tech': [
            "My Neural Hardware is glitching today,",
            "This Back-Alley Firmware has led me astray.",
            "My Cerebral Firewall has something to say,",
            "It's singing this song in a most disturbing way!"
        ],
        'mutant': [
            "Experimental Fluid has changed my insides,",
            "Now I've got mutations I cannot hide.",
            "Vitalix's treatments have opened my eyes,",
            "To sing you this song before one of us dies!"
        ],
        'ninja': [
            "Silent as shadows until this song,",
            "My Digital Graffiti won't last for long.",
            "The Glitch Witch told me this is wrong,",
            "But I'm singing anyway, my voice is strong!"
        ],
        'punk': [
            "I'm a wasteland punk with a Funk Trunk sound,",
            "My Trash Octopus beats will astound.",
            "The Resistance Directive can't keep me down,",
            "I'll sing till your eardrums fall to the ground!"
        ],
        'space': [
            "Floating through space with Quantum Quandary,",
            "My Reality Thumper makes music that's planetary.",
            "This Pocket Reality's getting quite contrary,",
            "As I sing this song that's extraordinarily scary!"
        ]
    };
    
    // Try to load verses from the rhyming dictionary
    try {
        if (fs.existsSync(RHYMING_DICTIONARY_PATH)) {
            const rhymingContent = fs.readFileSync(RHYMING_DICTIONARY_PATH, 'utf8');
            
            // Find the rhyming pattern section
            const patternRegex = new RegExp(`### -${rhymePattern} Rhymes\\s*\\n\\s*\\*\\*.*?\\*\\*\\s*\\n\\s*\\*Example Verse:\\*\\s*\\n\`\`\`\\s*([\\s\\S]*?)\`\`\``, 'i');
            const match = patternRegex.exec(rhymingContent);
            
            if (match && match[1]) {
                // Use the example verse from the rhyming dictionary
                return match[1].trim().split('\n');
            }
        }
    } catch (error) {
        console.error('Error loading rhyming dictionary:', error);
    }
    
    // If we couldn't load from the rhyming dictionary, use default verses
    return defaultVerses[theme] || defaultVerses['wasteland'];
}

/**
 * Create singing dialogue for a troop
 * @param {Object} troop - The troop object to add singing dialogue to
 * @param {string} theme - The theme of the song (e.g., 'corporate', 'wasteland', etc.)
 * @returns {Object} - The updated troop object with singing dialogue
 */
function addSingingDialogue(troop, theme) {
    // Skip if the troop already has dialogue
    if (troop.pages && troop.pages.length > 0 && 
        troop.pages[0].list && troop.pages[0].list.length > 1) {
        return troop;
    }
    
    // Choose a random rhyming pattern
    const rhymePatterns = ['ech', 'orp', 'ation', 'ome', 'ality', 'ware', 'umper', 'unk', 'itch', 'ead', 'drome', 'itis'];
    const randomPattern = rhymePatterns[Math.floor(Math.random() * rhymePatterns.length)];
    
    // Generate a song verse
    const songVerse = generateSongVerse(randomPattern, theme);
    
    // Create a new page with singing dialogue
    const newPage = {
        "conditions": {
            "actorHp": 50,
            "actorId": 1,
            "actorValid": false,
            "enemyHp": 75,
            "enemyIndex": 0,
            "enemyValid": true,
            "switchId": 1,
            "switchValid": false,
            "turnA": 1,
            "turnB": 3,
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
                "parameters": ["♪ " + songVerse[0] + " ♪"]
            }
        ],
        "span": 0
    };
    
    // Add the rest of the song verse lines
    for (let i = 1; i < songVerse.length; i++) {
        newPage.list.push({
            "code": 401,
            "indent": 0,
            "parameters": ["♪ " + songVerse[i] + " ♪"]
        });
    }
    
    // Add a final command to end the event
    newPage.list.push({
        "code": 0,
        "indent": 0,
        "parameters": []
    });
    
    // Add the new page to the troop
    if (!troop.pages) {
        troop.pages = [];
    }
    
    troop.pages.push(newPage);
    
    return troop;
}

/**
 * Add singing dialogue to troops based on their name
 * @param {Object[]} troops - Array of troop objects
 * @returns {Object[]} - Updated array of troop objects with singing dialogue
 */
function addSingingDialogueToTroops(troops) {
    return troops.map(troop => {
        if (!troop) return troop;
        
        // Determine the theme based on the troop name
        let theme = 'wasteland';
        
        if (troop.name) {
            const name = troop.name.toLowerCase();
            
            if (name.includes('punk')) {
                theme = 'punk';
            } else if (name.includes('ninja')) {
                theme = 'ninja';
            } else if (name.includes('earth') || name.includes('wind') || name.includes('fire') || name.includes('water')) {
                theme = 'mutant';
            } else if (name.includes('space') || name.includes('asteroid') || name.includes('rock')) {
                theme = 'space';
            } else if (name.includes('rat') || name.includes('spider') || name.includes('bat')) {
                theme = 'mutant';
            } else if (name.includes('doll') || name.includes('halucination')) {
                theme = 'tech';
            }
        }
        
        // Add singing dialogue to the troop
        return addSingingDialogue(troop, theme);
    });
}

/**
 * Main function to add singing dialogue to enemies
 */
function main() {
    console.log('Adding singing dialogue to enemies...');
    
    try {
        // Read the troops file
        if (!fs.existsSync(TROOPS_PATH)) {
            console.error('Troops file not found:', TROOPS_PATH);
            return false;
        }
        
        const troopsData = JSON.parse(fs.readFileSync(TROOPS_PATH, 'utf8'));
        
        // Create a backup of the original file
        const backupPath = `${TROOPS_PATH}.bak`;
        fs.writeFileSync(backupPath, JSON.stringify(troopsData, null, 2));
        console.log('Created backup of original troops file:', backupPath);
        
        // Add singing dialogue to troops
        const updatedTroops = addSingingDialogueToTroops(troopsData);
        
        // Write the updated troops file
        fs.writeFileSync(TROOPS_PATH, JSON.stringify(updatedTroops, null, 2));
        console.log('Successfully added singing dialogue to enemies!');
        
        return true;
    } catch (error) {
        console.error('Error adding singing dialogue to enemies:', error);
        return false;
    }
}

/**
 * Generate a specific song for a specific enemy type
 * @param {string} enemyType - The type of enemy to generate a song for
 * @returns {string[]} - Array of lines for the song
 */
function generateSpecificSong(enemyType) {
    const songs = {
        'punk': [
            "♪ I'm a wasteland punk with a Funk Trunk beat, ♪",
            "♪ Got Stonks Only Go Up Syndrome that can't be beat! ♪",
            "♪ My Cerebral Firewall's been hacked by a Glitch Witch, ♪",
            "♪ Now I'm singing this song without a single hitch! ♪"
        ],
        'ninja': [
            "♪ Silent as shadows until this Digital Graffiti, ♪",
            "♪ My Neural Hardware's glitching, it's getting pretty gritty! ♪",
            "♪ The Reality Rewrite Protocol can't stop my flow, ♪",
            "♪ This Ninja's dropping beats before the final blow! ♪"
        ],
        'elemental': [
            "♪ Elements combined in a Quantum Quandary, ♪",
            "♪ Earth, Wind, Fire, and Water—quite extraordinary! ♪",
            "♪ Experimental Fluid flows through my veins, ♪",
            "♪ This Pocket Reality's driving me insane! ♪"
        ],
        'rat': [
            "♪ Scurrying through sewers with my Rad-Hoarder crew, ♪",
            "♪ Got more Rust Lung than a Sewer Sommelier too! ♪",
            "♪ The Trash Octopus taught me this catchy tune, ♪",
            "♪ I'll be gnawing on your corpse very soon! ♪"
        ],
        'spider': [
            "♪ Eight legs dancing to this Tech-Barnacle beat, ♪",
            "♪ My web of Corporate Jargon can't be beat! ♪",
            "♪ Got Profit-Induced Psychopathy from Vitalix's labs, ♪",
            "♪ Now I'm singing while I wrap you up in silky slabs! ♪"
        ],
        'space': [
            "♪ Floating through the void with Quantum Jumper grace, ♪",
            "♪ This Reality Thumper sets the pace! ♪",
            "♪ My Pocket Reality's expanding with this song, ♪",
            "♪ In the vacuum of space, where you don't belong! ♪"
        ],
        'default': [
            "♪ I'm a wasteland warrior with a Chemical Leash, ♪",
            "♪ My Neural Puppet strings make me sing like this! ♪",
            "♪ Got Corp-Zomb syndrome from OmniCorp's grip, ♪",
            "♪ Now I'm breaking into song on this deadly trip! ♪"
        ]
    };
    
    return songs[enemyType] || songs['default'];
}

/**
 * Create a custom singing event for a specific troop
 * @param {number} troopId - The ID of the troop to add singing dialogue to
 * @param {string} enemyType - The type of enemy to generate a song for
 */
function createCustomSingingEvent(troopId, enemyType) {
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
        
        // Generate a specific song for the enemy type
        const songLines = generateSpecificSong(enemyType);
        
        // Create a new page with singing dialogue
        const newPage = {
            "conditions": {
                "actorHp": 50,
                "actorId": 1,
                "actorValid": false,
                "enemyHp": 75,
                "enemyIndex": 0,
                "enemyValid": true,
                "switchId": 1,
                "switchValid": false,
                "turnA": 1,
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
        
        // Add the song lines
        for (const line of songLines) {
            newPage.list.push({
                "code": 401,
                "indent": 0,
                "parameters": [line]
            });
        }
        
        // Add a final command to end the event
        newPage.list.push({
            "code": 0,
            "indent": 0,
            "parameters": []
        });
        
        // Add the new page to the troop
        if (!troopsData[troopId].pages) {
            troopsData[troopId].pages = [];
        }
        
        troopsData[troopId].pages.push(newPage);
        
        // Write the updated troops file
        fs.writeFileSync(TROOPS_PATH, JSON.stringify(troopsData, null, 2));
        console.log(`Successfully added singing dialogue to troop ID ${troopId}!`);
        
        return true;
    } catch (error) {
        console.error('Error adding custom singing event:', error);
        return false;
    }
}

// Export functions for use in other scripts
module.exports = {
    addSingingDialogueToTroops,
    generateSongVerse,
    createCustomSingingEvent,
    main
};

// Run the main function if this script is executed directly
if (require.main === module) {
    main();
}
