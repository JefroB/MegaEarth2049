/**
 * Body Modification Items
 * 
 * This script adds body modification items to the game's Items.json file.
 * These items represent the various modifications that players can purchase
 * from Zed's clinic.
 */

const fs = require('fs');
const path = require('path');
const { backupFile } = require('../utils/core/backup-utils');

// Body modification categories
const CATEGORIES = {
    CYBERNETIC: 'cybernetic',
    BIOLOGICAL: 'biological',
    AESTHETIC: 'aesthetic',
    EXPERIMENTAL: 'experimental',
    LEGENDARY: 'legendary'
};

// Body modification slots
const SLOTS = {
    HEAD: 'head',
    EYES: 'eyes',
    EARS: 'ears',
    FACE: 'face',
    NECK: 'neck',
    TORSO: 'torso',
    ARMS: 'arms',
    HANDS: 'hands',
    LEGS: 'legs',
    FEET: 'feet',
    SKIN: 'skin',
    INTERNAL: 'internal',
    NEURAL: 'neural',
    SPECIAL: 'special'
};

// Body modifications
const BODY_MODIFICATIONS = [
    // Cybernetic Modifications
    {
        name: "Targeting Optics",
        description: "Cybernetic eye enhancement that increases accuracy with ranged weapons.",
        iconIndex: 176,
        price: 2500,
        category: CATEGORIES.CYBERNETIC,
        slot: SLOTS.EYES,
        effects: {
            accuracy: 15,
            critRate: 5
        },
        sideEffects: {
            description: "Occasional visual glitches in low light conditions.",
            chance: 15
        },
        requirements: {
            level: 5
        }
    },
    {
        name: "Neural Processor",
        description: "Brain implant that enhances cognitive functions and reaction time.",
        iconIndex: 177,
        price: 3500,
        category: CATEGORIES.CYBERNETIC,
        slot: SLOTS.NEURAL,
        effects: {
            intelligence: 2,
            agility: 1
        },
        sideEffects: {
            description: "Occasional migraines and insomnia.",
            chance: 20
        },
        requirements: {
            level: 8
        }
    },
    {
        name: "Power Fists",
        description: "Mechanical hand enhancements that increase melee damage.",
        iconIndex: 178,
        price: 3000,
        category: CATEGORIES.CYBERNETIC,
        slot: SLOTS.HANDS,
        effects: {
            strength: 2,
            meleeDamage: 15
        },
        sideEffects: {
            description: "Reduced fine motor control for delicate tasks.",
            chance: 25
        },
        requirements: {
            level: 7
        }
    },
    {
        name: "Hydraulic Legs",
        description: "Leg enhancements that increase movement speed and jumping ability.",
        iconIndex: 179,
        price: 4000,
        category: CATEGORIES.CYBERNETIC,
        slot: SLOTS.LEGS,
        effects: {
            agility: 2,
            movementSpeed: 20
        },
        sideEffects: {
            description: "Occasional joint lock-ups when wet.",
            chance: 15
        },
        requirements: {
            level: 10
        }
    },
    {
        name: "Subdermal Armor",
        description: "Reinforced plating beneath the skin that reduces physical damage.",
        iconIndex: 180,
        price: 5000,
        category: CATEGORIES.CYBERNETIC,
        slot: SLOTS.SKIN,
        effects: {
            defense: 15,
            physicalResistance: 10
        },
        sideEffects: {
            description: "Reduced sensitivity to touch and temperature.",
            chance: 20
        },
        requirements: {
            level: 12
        }
    },
    
    // Biological Modifications
    {
        name: "Toxin Filters",
        description: "Enhanced liver and kidney functions that provide resistance to poisons and toxins.",
        iconIndex: 181,
        price: 2800,
        category: CATEGORIES.BIOLOGICAL,
        slot: SLOTS.INTERNAL,
        effects: {
            poisonResistance: 50,
            diseaseResistance: 25
        },
        sideEffects: {
            description: "Increased thirst and frequent urination.",
            chance: 30
        },
        requirements: {
            level: 6
        }
    },
    {
        name: "Adrenal Boosters",
        description: "Modified adrenal glands that provide temporary bursts of strength and speed in combat.",
        iconIndex: 182,
        price: 3200,
        category: CATEGORIES.BIOLOGICAL,
        slot: SLOTS.INTERNAL,
        effects: {
            combatBoost: "Temporary +3 to Strength and Agility when health drops below 30%"
        },
        sideEffects: {
            description: "Increased aggression and occasional heart palpitations.",
            chance: 35
        },
        requirements: {
            level: 9
        }
    },
    {
        name: "Dermal Hardening",
        description: "Toughened skin that provides resistance to physical damage.",
        iconIndex: 183,
        price: 2600,
        category: CATEGORIES.BIOLOGICAL,
        slot: SLOTS.SKIN,
        effects: {
            defense: 10,
            heatResistance: 15,
            coldResistance: 15
        },
        sideEffects: {
            description: "Skin appears leathery and has reduced flexibility.",
            chance: 15
        },
        requirements: {
            level: 5
        }
    },
    {
        name: "Regenerative Tissue",
        description: "Enhanced cellular regeneration that increases natural healing rate.",
        iconIndex: 184,
        price: 4500,
        category: CATEGORIES.BIOLOGICAL,
        slot: SLOTS.INTERNAL,
        effects: {
            healthRegen: 2,
            healingRate: 25
        },
        sideEffects: {
            description: "Increased appetite and occasional benign growths.",
            chance: 20
        },
        requirements: {
            level: 11
        }
    },
    {
        name: "Muscle Grafts",
        description: "Enhanced muscle tissue that increases strength and endurance.",
        iconIndex: 185,
        price: 3800,
        category: CATEGORIES.BIOLOGICAL,
        slot: SLOTS.TORSO,
        effects: {
            strength: 2,
            endurance: 1
        },
        sideEffects: {
            description: "Muscle cramps and increased metabolism requiring more food.",
            chance: 25
        },
        requirements: {
            level: 8
        }
    },
    
    // Aesthetic Modifications
    {
        name: "Circuit Patterns",
        description: "Glowing circuit-like patterns embedded in the skin that provide minor energy resistance.",
        iconIndex: 186,
        price: 1500,
        category: CATEGORIES.AESTHETIC,
        slot: SLOTS.SKIN,
        effects: {
            energyResistance: 5,
            charisma: 1
        },
        sideEffects: {
            description: "Patterns glow brighter when nervous, revealing emotional state.",
            chance: 10
        },
        requirements: {
            level: 3
        }
    },
    {
        name: "Metallic Dermal Layers",
        description: "Thin metallic layers embedded in the skin that provide a distinctive appearance and minor protection.",
        iconIndex: 187,
        price: 1800,
        category: CATEGORIES.AESTHETIC,
        slot: SLOTS.SKIN,
        effects: {
            defense: 5,
            charisma: 1
        },
        sideEffects: {
            description: "Increased sensitivity to extreme temperatures.",
            chance: 15
        },
        requirements: {
            level: 4
        }
    },
    {
        name: "Bioluminescent Tattoos",
        description: "Living tattoos that glow in the dark and can change patterns based on mood.",
        iconIndex: 188,
        price: 1200,
        category: CATEGORIES.AESTHETIC,
        slot: SLOTS.SKIN,
        effects: {
            charisma: 2,
            nightVision: "Provides dim light in darkness"
        },
        sideEffects: {
            description: "Tattoos may move or change unexpectedly when emotional.",
            chance: 20
        },
        requirements: {
            level: 2
        }
    },
    {
        name: "Chromatic Eyes",
        description: "Eyes that can change color based on mood or at will.",
        iconIndex: 189,
        price: 1600,
        category: CATEGORIES.AESTHETIC,
        slot: SLOTS.EYES,
        effects: {
            charisma: 2,
            intimidation: 10
        },
        sideEffects: {
            description: "Eyes may change color involuntarily based on strong emotions.",
            chance: 25
        },
        requirements: {
            level: 3
        }
    },
    {
        name: "Voice Modulator",
        description: "Vocal cord modifications that allow for a wider range of sounds and effects.",
        iconIndex: 190,
        price: 2000,
        category: CATEGORIES.AESTHETIC,
        slot: SLOTS.NECK,
        effects: {
            charisma: 2,
            intimidation: 15
        },
        sideEffects: {
            description: "Occasional voice cracks or unintended modulation.",
            chance: 20
        },
        requirements: {
            level: 5
        }
    },
    
    // Experimental Modifications
    {
        name: "Probability Manipulator",
        description: "A quantum device that subtly alters probability in the user's favor.",
        iconIndex: 191,
        price: 8000,
        category: CATEGORIES.EXPERIMENTAL,
        slot: SLOTS.SPECIAL,
        effects: {
            luck: 3,
            critRate: 10
        },
        sideEffects: {
            description: "Occasional reality glitches and strange coincidences.",
            chance: 40
        },
        requirements: {
            level: 15
        }
    },
    {
        name: "Dimensional Storage",
        description: "A small pocket dimension accessible through a port in the user's palm.",
        iconIndex: 192,
        price: 7500,
        category: CATEGORIES.EXPERIMENTAL,
        slot: SLOTS.HANDS,
        effects: {
            inventorySpace: "+10 inventory slots"
        },
        sideEffects: {
            description: "Items occasionally go missing or appear mysteriously altered.",
            chance: 35
        },
        requirements: {
            level: 18
        }
    },
    {
        name: "Quantum Stabilizer",
        description: "A device that allows the user to briefly exist in multiple states simultaneously.",
        iconIndex: 193,
        price: 9000,
        category: CATEGORIES.EXPERIMENTAL,
        slot: SLOTS.TORSO,
        effects: {
            evasion: 20,
            ability: "Phase Shift: Chance to avoid damage entirely"
        },
        sideEffects: {
            description: "Occasional displacement from reality for brief periods.",
            chance: 45
        },
        requirements: {
            level: 20
        }
    },
    {
        name: "Consciousness Splitter",
        description: "Neural modification that allows the user to process multiple thought streams simultaneously.",
        iconIndex: 194,
        price: 8500,
        category: CATEGORIES.EXPERIMENTAL,
        slot: SLOTS.NEURAL,
        effects: {
            intelligence: 3,
            ability: "Multi-tasking: Can perform two actions in one turn"
        },
        sideEffects: {
            description: "Risk of personality fragmentation and conflicting thoughts.",
            chance: 50
        },
        requirements: {
            level: 22
        }
    },
    {
        name: "Reality Anchor",
        description: "A device that strengthens the user's connection to reality, providing resistance to reality-altering effects.",
        iconIndex: 195,
        price: 7800,
        category: CATEGORIES.EXPERIMENTAL,
        slot: SLOTS.SPECIAL,
        effects: {
            mentalResistance: 30,
            realityResistance: 50
        },
        sideEffects: {
            description: "Difficulty perceiving illusions or hallucinations, even beneficial ones.",
            chance: 30
        },
        requirements: {
            level: 17
        }
    },
    
    // Legendary Modifications (quest rewards, not purchasable)
    {
        name: "The Prometheus Hand",
        description: "A cybernetic hand that can generate and control fire.",
        iconIndex: 196,
        price: 0, // Not purchasable
        category: CATEGORIES.LEGENDARY,
        slot: SLOTS.HANDS,
        effects: {
            ability: "Pyrokinesis: Generate and control flames",
            fireResistance: 75
        },
        sideEffects: {
            description: "Occasional uncontrolled flame generation when emotional.",
            chance: 25
        },
        requirements: {
            quest: "Prometheus Unbound"
        }
    },
    {
        name: "Chameleon Skin",
        description: "Advanced biological modification that allows near-perfect camouflage.",
        iconIndex: 197,
        price: 0, // Not purchasable
        category: CATEGORIES.LEGENDARY,
        slot: SLOTS.SKIN,
        effects: {
            stealth: 50,
            ability: "Active Camouflage: Become nearly invisible when stationary"
        },
        sideEffects: {
            description: "Skin may change color involuntarily based on emotions.",
            chance: 30
        },
        requirements: {
            quest: "Ghost Protocol"
        }
    },
    {
        name: "The Third Eye",
        description: "A mysterious implant that allows the user to see invisible entities and energy patterns.",
        iconIndex: 198,
        price: 0, // Not purchasable
        category: CATEGORIES.LEGENDARY,
        slot: SLOTS.HEAD,
        effects: {
            perception: 3,
            ability: "True Sight: See invisible entities and energy flows"
        },
        sideEffects: {
            description: "Occasional overwhelming visions of things beyond comprehension.",
            chance: 35
        },
        requirements: {
            quest: "Visions Beyond"
        }
    },
    {
        name: "Quantum Heart",
        description: "A replacement heart that exists partially outside normal space-time.",
        iconIndex: 199,
        price: 0, // Not purchasable
        category: CATEGORIES.LEGENDARY,
        slot: SLOTS.INTERNAL,
        effects: {
            maxHealth: 50,
            ability: "Temporal Resilience: Chance to revert fatal damage"
        },
        sideEffects: {
            description: "Occasional temporal displacement of the user's consciousness.",
            chance: 40
        },
        requirements: {
            quest: "Heart of the Matter"
        }
    },
    {
        name: "The Hive Mind",
        description: "A neural implant that allows the user to mentally control insects and small creatures.",
        iconIndex: 200,
        price: 0, // Not purchasable
        category: CATEGORIES.LEGENDARY,
        slot: SLOTS.NEURAL,
        effects: {
            ability: "Swarm Control: Command insects and small creatures",
            perception: 2
        },
        sideEffects: {
            description: "Occasional intrusive thoughts and sensations from nearby creatures.",
            chance: 35
        },
        requirements: {
            quest: "The Swarm"
        }
    },
    {
        name: "Chronos Module",
        description: "A temporal manipulation device that can briefly slow time from the user's perspective.",
        iconIndex: 201,
        price: 0, // Not purchasable
        category: CATEGORIES.LEGENDARY,
        slot: SLOTS.SPECIAL,
        effects: {
            ability: "Time Dilation: Briefly slow time, allowing extra actions",
            agility: 3
        },
        sideEffects: {
            description: "Occasional temporal desynchronization causing delayed reactions.",
            chance: 30
        },
        requirements: {
            quest: "Out of Time"
        }
    }
];

/**
 * Adds body modification items to the game's items database
 * @param {string} itemsPath - Path to Items.json
 * @returns {boolean} - Success status
 */
function addBodyModificationItems(itemsPath) {
    try {
        console.log("Adding body modification items...");
        
        // Check if the items file exists
        if (!fs.existsSync(itemsPath)) {
            console.error(`Items file not found: ${itemsPath}`);
            return false;
        }
        
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
        
        // Add body modification items
        let addedCount = 0;
        BODY_MODIFICATIONS.forEach((mod, index) => {
            // Check if the item already exists
            const existingItem = itemsData.find(item => 
                item && item.name === mod.name && item.note && item.note.includes('<bodyMod')
            );
            
            if (existingItem) {
                console.log(`Item already exists: ${mod.name}`);
                return; // Skip this item
            }
            
            // Create the new item
            const itemId = maxId + index + 1;
            
            // Format effects and side effects as strings for the note field
            let effectsStr = '';
            if (typeof mod.effects === 'object') {
                effectsStr = Object.entries(mod.effects)
                    .map(([key, value]) => `${key}: ${value}`)
                    .join(', ');
            }
            
            let sideEffectsStr = '';
            if (mod.sideEffects) {
                sideEffectsStr = `${mod.sideEffects.description} (${mod.sideEffects.chance}% chance)`;
            }
            
            // Format requirements as a string
            let requirementsStr = '';
            if (typeof mod.requirements === 'object') {
                requirementsStr = Object.entries(mod.requirements)
                    .map(([key, value]) => `${key}: ${value}`)
                    .join(', ');
            }
            
            // Create the item object
            const newItem = {
                id: itemId,
                name: mod.name,
                description: mod.description,
                iconIndex: mod.iconIndex,
                price: mod.price,
                occasion: 0, // None
                scope: 1, // One ally
                animation: 0, // None
                effects: [],
                note: `<bodyMod:${mod.category}>\n<bodyModSlot:${mod.slot}>\n<bodyModEffects:${effectsStr}>\n<bodyModSideEffects:${sideEffectsStr}>\n<bodyModRequirements:${requirementsStr}>`
            };
            
            // Add the item to the array
            itemsData.push(newItem);
            addedCount++;
            
            console.log(`Added body modification item: ${mod.name} (ID: ${itemId})`);
        });
        
        // Write the updated items file
        fs.writeFileSync(itemsPath, JSON.stringify(itemsData, null, 2), 'utf8');
        
        console.log(`Successfully added ${addedCount} body modification items to ${itemsPath}`);
        return true;
    } catch (error) {
        console.error(`Error adding body modification items: ${error.message}`);
        return false;
    }
}

/**
 * Creates a plugin file for the body modification system
 * @param {string} pluginsDir - Path to the plugins directory
 * @returns {boolean} - Success status
 */
function createBodyModPlugin(pluginsDir) {
    try {
        console.log("Creating body modification plugin...");
        
        // Define the plugin file path
        const pluginPath = path.join(pluginsDir, "BodyModificationSystem.js");
        
        // Check if the plugin already exists
        if (fs.existsSync(pluginPath)) {
            console.log("Body modification plugin already exists");
            return false;
        }
        
        // Create a basic plugin file
        const pluginContent = `//=============================================================================
// BodyModificationSystem.js
//=============================================================================

/*:
 * @plugindesc Implements the body modification system
 * @author MegaEarth2049 Team
 *
 * @help
 * This plugin implements the body modification system, allowing players
 * to install, upgrade, and remove various modifications to enhance their
 * characters.
 *
 * Body modifications are stored as special items with the following note tags:
 * <bodyMod:category> - The category of the modification (cybernetic, biological, etc.)
 * <bodyModSlot:slot> - The body slot the modification occupies
 * <bodyModEffects:effects> - The effects of the modification
 * <bodyModSideEffects:effects> - The potential side effects of the modification
 * <bodyModRequirements:requirements> - The requirements to install the modification
 *
 * Plugin Commands:
 * OpenBodyModificationShop - Opens the body modification shop
 * InstallBodyMod itemId - Installs the specified body modification
 * RemoveBodyMod slotName - Removes the body modification from the specified slot
 */

// Register plugin
var Imported = Imported || {};
Imported.BodyModificationSystem = true;

(function() {
    // Implementation will be added in a future update
})();`;
        
        // Write the plugin file
        fs.writeFileSync(pluginPath, pluginContent, 'utf8');
        
        console.log(`Successfully created plugin file: ${pluginPath}`);
        return true;
    } catch (error) {
        console.error(`Error creating body modification plugin: ${error.message}`);
        return false;
    }
}

/**
 * Adds the body modification plugin to the plugins.js file
 * @param {string} pluginsPath - Path to plugins.js
 * @returns {boolean} - Success status
 */
function addPluginToPluginsJs(pluginsPath) {
    try {
        console.log("Adding body modification plugin to plugins.js...");
        
        // Check if the plugins file exists
        if (!fs.existsSync(pluginsPath)) {
            console.error(`Plugins file not found: ${pluginsPath}`);
            return false;
        }
        
        // Backup the plugins file
        backupFile(pluginsPath);
        
        // Read the plugins file
        const pluginsData = JSON.parse(fs.readFileSync(pluginsPath, 'utf8'));
        
        // Check if the plugin already exists
        const existingPlugin = pluginsData.find(plugin => 
            plugin && plugin.name === "BodyModificationSystem"
        );
        
        if (existingPlugin) {
            console.log("Body modification plugin already exists in plugins.js");
            return false;
        }
        
        // Create the plugin object
        const bodyModPlugin = {
            name: "BodyModificationSystem",
            status: true,
            description: "Implements the body modification system",
            parameters: {}
        };
        
        // Add the plugin to the array
        pluginsData.push(bodyModPlugin);
        
        // Write the updated plugins file
        fs.writeFileSync(pluginsPath, JSON.stringify(pluginsData, null, 2), 'utf8');
        
        console.log("Successfully added body modification plugin to plugins.js");
        return true;
    } catch (error) {
        console.error(`Error adding body modification plugin to plugins.js: ${error.message}`);
        return false;
    }
}

/**
 * Implements the body modification items system
 * @param {Object} options - Configuration options
 * @param {string} options.dataDir - Path to the data directory
 * @param {string} options.jsDir - Path to the js directory
 * @returns {boolean} - Success status
 */
function implementBodyModItems(options) {
    try {
        console.log("Implementing Body Modification Items System...");
        
        // Validate options
        if (!options || !options.dataDir || !options.jsDir) {
            console.error("Invalid options provided");
            return false;
        }
        
        // Define paths
        const itemsPath = path.join(options.dataDir, 'Items.json');
        const pluginsPath = path.join(options.jsDir, 'plugins.js');
        const pluginsDir = path.join(options.jsDir, 'plugins');
        
        // Validate paths
        if (!fs.existsSync(itemsPath)) {
            console.error(`Items.json not found at: ${itemsPath}`);
            return false;
        }
        
        if (!fs.existsSync(pluginsPath)) {
            console.error(`plugins.js not found at: ${pluginsPath}`);
            return false;
        }
        
        if (!fs.existsSync(pluginsDir)) {
            console.error(`plugins directory not found at: ${pluginsDir}`);
            return false;
        }
        
        // Implement each component
        const itemsSuccess = addBodyModificationItems(itemsPath);
        const pluginFileSuccess = createBodyModPlugin(pluginsDir);
        const pluginsJsSuccess = addPluginToPluginsJs(pluginsPath);
        
        // Check results
        if (itemsSuccess && pluginFileSuccess && pluginsJsSuccess) {
            console.log("Body Modification Items System successfully implemented!");
            return true;
        } else {
            console.warn("Body Modification Items System implementation completed with some issues.");
            return false;
        }
    } catch (error) {
        console.error(`Error implementing Body Modification Items System: ${error.message}`);
        return false;
    }
}

// Export functions
module.exports = {
    addBodyModificationItems,
    createBodyModPlugin,
    addPluginToPluginsJs,
    implementBodyModItems
};

// Run the implementation if this script is executed directly
if (require.main === module) {
    const options = {
        dataDir: path.join(__dirname, '..', 'data'),
        jsDir: path.join(__dirname, '..', 'js')
    };
    
    implementBodyModItems(options);
}
