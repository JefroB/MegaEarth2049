/**
 * Add Ninja Items
 * 
 * This script adds the special ninja equipment items mentioned in the FAQ to the Items.json file.
 * These items will be available as rewards for completing the "Shadows in the Code" quest line.
 */

const fs = require('fs');
const path = require('path');

// Define the new ninja items
const NINJA_ITEMS = [
    {
        id: 45, // Using IDs from the shadows_in_code_quest.js script
        name: "Neural Interface Chip",
        description: "A specialized chip that allows communication with the Digital Shadow Collective's network.",
        iconIndex: 176, // Assuming this is a suitable icon
        price: 1000,
        consumable: false,
        occasion: 3, // 0=Always, 1=Battle, 2=Menu, 3=Never
        scope: 7, // 0=None, 1=One Enemy, 2=All Enemies, 3=One Random Enemy, 4=Two Random Enemies, 5=Three Random Enemies, 6=Four Random Enemies, 7=One Ally, 8=All Allies, 9=One Ally (Dead), 10=All Allies (Dead), 11=The User
        effects: [
            { code: 21, dataId: 0, value1: 1, value2: 0 } // Increase a parameter temporarily
        ],
        note: "<Digital Shadow Collective>\nAllows access to Neural Access Points when equipped by a ninja."
    },
    {
        id: 46,
        name: "Digital Tantō",
        description: "A short blade that exists simultaneously in physical and digital space, allowing it to damage both physical enemies and A.S.P. constructs.",
        iconIndex: 97, // Assuming this is a suitable icon for a dagger
        price: 2000,
        consumable: false,
        occasion: 0, // Always
        scope: 1, // One Enemy
        effects: [
            { code: 11, dataId: 0, value1: 1, value2: 0 }, // Deal physical damage
            { code: 21, dataId: 2, value1: 0.2, value2: 0 } // Increase attack temporarily
        ],
        note: "<Digital Shadow Collective>\nDeals additional damage to A.S.P. constructs and digital entities."
    },
    {
        id: 47,
        name: "Shadow Garb",
        description: "Ninja armor that increases evasion and provides stealth capabilities in corporate facilities.",
        iconIndex: 135, // Assuming this is a suitable icon for armor
        price: 2500,
        consumable: false,
        occasion: 3, // Never (equip item)
        scope: 7, // One Ally
        effects: [
            { code: 22, dataId: 1, value1: 0.15, value2: 0 } // Increase evasion
        ],
        note: "<Digital Shadow Collective>\nReduces detection chance in corporate facilities and increases Shadow Step success rate."
    },
    {
        id: 48,
        name: "Compiler's Mask",
        description: "A special face covering that allows the wearer to see through digital illusions and detect A.S.P. influence.",
        iconIndex: 145, // Assuming this is a suitable icon for a mask
        price: 3000,
        consumable: false,
        occasion: 3, // Never (equip item)
        scope: 7, // One Ally
        effects: [
            { code: 22, dataId: 8, value1: 0.2, value2: 0 }, // Increase mental resistance
            { code: 22, dataId: 9, value1: 0.2, value2: 0 }  // Increase status effect resistance
        ],
        note: "<Digital Shadow Collective>\nReveals hidden digital entities and A.S.P. influence. Grants immunity to digital illusions."
    },
    {
        id: 49,
        name: "Neural Shurikens",
        description: "Throwing weapons that can temporarily disrupt enemy neural implants, preventing them from using tech-based abilities.",
        iconIndex: 64, // Assuming this is a suitable icon for throwing weapons
        price: 500,
        consumable: true,
        occasion: 1, // Battle
        scope: 1, // One Enemy
        effects: [
            { code: 11, dataId: 0, value1: 0.5, value2: 0 }, // Deal physical damage
            { code: 21, dataId: 5, value1: -0.3, value2: 0 } // Decrease enemy's tech abilities
        ],
        note: "<Digital Shadow Collective>\nTemporarily disables neural implants and tech-based abilities."
    },
    {
        id: 50,
        name: "Neural Bandana - Pink",
        description: "A bandana worn by the Pink Ninja that provides resistance to mental status effects and boosts agility.",
        iconIndex: 146, // Assuming this is a suitable icon for headgear
        price: 1500,
        consumable: false,
        occasion: 3, // Never (equip item)
        scope: 7, // One Ally
        effects: [
            { code: 22, dataId: 6, value1: 0.1, value2: 0 }, // Increase agility
            { code: 22, dataId: 8, value1: 0.15, value2: 0 } // Increase mental resistance
        ],
        note: "<Digital Shadow Collective>\nEnhances mind-based abilities and provides resistance to mental status effects."
    },
    {
        id: 51,
        name: "Neural Bandana - Blue",
        description: "A bandana worn by the Blue Ninja that enhances tactical abilities and weapon proficiency.",
        iconIndex: 146, // Assuming this is a suitable icon for headgear
        price: 1500,
        consumable: false,
        occasion: 3, // Never (equip item)
        scope: 7, // One Ally
        effects: [
            { code: 22, dataId: 2, value1: 0.15, value2: 0 }, // Increase attack
            { code: 22, dataId: 3, value1: 0.1, value2: 0 }  // Increase defense
        ],
        note: "<Digital Shadow Collective>\nEnhances tactical abilities and weapon proficiency."
    },
    {
        id: 52,
        name: "Neural Bandana - Black",
        description: "A bandana worn by the Black Ninja that allows minor reality manipulation and increases luck.",
        iconIndex: 146, // Assuming this is a suitable icon for headgear
        price: 1500,
        consumable: false,
        occasion: 3, // Never (equip item)
        scope: 7, // One Ally
        effects: [
            { code: 22, dataId: 7, value1: 0.2, value2: 0 } // Increase luck
        ],
        note: "<Digital Shadow Collective>\nAllows minor reality manipulation and increases probability of favorable outcomes."
    },
    {
        id: 53,
        name: "Neural Bandana - Green",
        description: "A bandana worn by the Green Ninja that provides resistance to toxins and enhances healing abilities.",
        iconIndex: 146, // Assuming this is a suitable icon for headgear
        price: 1500,
        consumable: false,
        occasion: 3, // Never (equip item)
        scope: 7, // One Ally
        effects: [
            { code: 22, dataId: 9, value1: 0.2, value2: 0 }, // Increase status effect resistance
            { code: 22, dataId: 10, value1: 0.1, value2: 0 } // Increase recovery
        ],
        note: "<Digital Shadow Collective>\nProvides resistance to toxins and enhances healing abilities."
    },
    {
        id: 54,
        name: "Neural Bandana - Red",
        description: "A bandana worn by the Red Ninja that enhances perception of structural weaknesses and explosive damage.",
        iconIndex: 146, // Assuming this is a suitable icon for headgear
        price: 1500,
        consumable: false,
        occasion: 3, // Never (equip item)
        scope: 7, // One Ally
        effects: [
            { code: 22, dataId: 2, value1: 0.2, value2: 0 } // Increase attack
        ],
        note: "<Digital Shadow Collective>\nEnhances perception of structural weaknesses and increases explosive damage."
    },
    {
        id: 55,
        name: "Neural Bandana - Purple",
        description: "A bandana worn by the Purple Ninja that enhances stealth and disguise abilities.",
        iconIndex: 146, // Assuming this is a suitable icon for headgear
        price: 1500,
        consumable: false,
        occasion: 3, // Never (equip item)
        scope: 7, // One Ally
        effects: [
            { code: 22, dataId: 1, value1: 0.2, value2: 0 } // Increase evasion
        ],
        note: "<Digital Shadow Collective>\nEnhances stealth and disguise abilities, reducing detection chance."
    },
    {
        id: 56,
        name: "Neural Bandana - Brown",
        description: "A bandana worn by the Brown Ninja that enhances memory and knowledge retention.",
        iconIndex: 146, // Assuming this is a suitable icon for headgear
        price: 1500,
        consumable: false,
        occasion: 3, // Never (equip item)
        scope: 7, // One Ally
        effects: [
            { code: 22, dataId: 4, value1: 0.2, value2: 0 }, // Increase magic attack
            { code: 22, dataId: 8, value1: 0.1, value2: 0 }  // Increase mental resistance
        ],
        note: "<Digital Shadow Collective>\nEnhances memory and knowledge retention, providing access to corporate secrets."
    },
    {
        id: 57,
        name: "Compiler's Code Blade",
        description: "The ultimate ninja weapon, forged from the original code of A.S.P. and imbued with The Compiler's consciousness.",
        iconIndex: 101, // Assuming this is a suitable icon for a special sword
        price: 10000,
        consumable: false,
        occasion: 0, // Always
        scope: 1, // One Enemy
        effects: [
            { code: 11, dataId: 0, value1: 2, value2: 0 }, // Deal physical damage
            { code: 21, dataId: 2, value1: 0.5, value2: 0 }, // Increase attack temporarily
            { code: 21, dataId: 4, value1: 0.5, value2: 0 }  // Increase magic attack temporarily
        ],
        note: "<Digital Shadow Collective>\nThe ultimate ninja weapon. Deals massive damage to A.S.P. constructs and can temporarily disrupt Protocol Zero."
    }
];

/**
 * Updates the Items.json file with new ninja items
 * @returns {boolean} - Success status
 */
function addNinjaItems() {
    const itemsPath = path.join('data', 'Items.json');
    
    try {
        // Read the Items.json file
        console.log(`Reading ${itemsPath}...`);
        const itemsContent = fs.readFileSync(itemsPath, 'utf8');
        let items = JSON.parse(itemsContent);
        
        // Make a backup of the original file
        const backupPath = path.join('data', 'Items.json.bak');
        fs.writeFileSync(backupPath, itemsContent, 'utf8');
        console.log(`Backup created at ${backupPath}`);
        
        // Check if we need to expand the items array
        const maxItemId = Math.max(...NINJA_ITEMS.map(item => item.id));
        if (items.length <= maxItemId) {
            // Expand the array to accommodate the new items
            const originalLength = items.length;
            items.length = maxItemId + 1;
            
            // Fill any gaps with null
            for (let i = originalLength; i < items.length; i++) {
                if (!items[i]) {
                    items[i] = null;
                }
            }
            
            console.log(`Expanded items array to length ${items.length}`);
        }
        
        // Add the new items
        let addedCount = 0;
        NINJA_ITEMS.forEach(ninjaItem => {
            // Check if the item already exists
            if (items[ninjaItem.id] && items[ninjaItem.id].name === ninjaItem.name) {
                console.log(`Item "${ninjaItem.name}" (ID: ${ninjaItem.id}) already exists, skipping.`);
                return;
            }
            
            // Add the new item
            items[ninjaItem.id] = ninjaItem;
            addedCount++;
            console.log(`Added item "${ninjaItem.name}" (ID: ${ninjaItem.id})`);
        });
        
        // Write the updated items back to the file
        fs.writeFileSync(itemsPath, JSON.stringify(items), 'utf8');
        console.log(`Updated ${itemsPath} with ${addedCount} new ninja items!`);
        
        return true;
    } catch (error) {
        console.error(`Error adding ninja items: ${error.message}`);
        return false;
    }
}

// Export the function
module.exports = {
    addNinjaItems,
    NINJA_ITEMS
};

// Run the update if this script is executed directly
if (require.main === module) {
    addNinjaItems();
}
