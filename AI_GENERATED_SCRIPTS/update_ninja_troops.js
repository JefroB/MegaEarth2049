/**
 * Update Ninja Troops
 * 
 * This script modifies the Troops.json file to update the ninja troop encounters
 * to include the ability to recruit additional ninjas after completing the
 * "Shadows in the Code" quest line.
 */

const fs = require('fs');
const path = require('path');

/**
 * Updates the Troops.json file to modify ninja troop encounters
 * @returns {boolean} - Success status
 */
function updateNinjaTroops() {
    const troopsPath = path.join('data', 'Troops.json');
    
    try {
        // Read the Troops.json file
        console.log(`Reading ${troopsPath}...`);
        const troopsContent = fs.readFileSync(troopsPath, 'utf8');
        let troops = JSON.parse(troopsContent);
        
        // Make a backup of the original file
        const backupPath = path.join('data', 'Troops.json.bak');
        fs.writeFileSync(backupPath, troopsContent, 'utf8');
        console.log(`Backup created at ${backupPath}`);
        
        // Update the Pink Ninja troop (Troop ID: 15)
        // This troop already has recruitment logic, but we'll enhance it
        console.log('Updating Pink Ninja troop (ID: 15)...');
        const pinkNinjaTroopIndex = troops.findIndex(troop => troop && troop.id === 15);
        
        if (pinkNinjaTroopIndex !== -1) {
            // The Pink Ninja troop exists, update its pages
            const pinkNinjaTroop = troops[pinkNinjaTroopIndex];
            
            // Update the existing page to include more dialogue
            if (pinkNinjaTroop.pages && pinkNinjaTroop.pages.length > 0) {
                const page = pinkNinjaTroop.pages[0];
                
                // Find the index of the dialogue in the list
                const dialogueIndex = page.list.findIndex(item => 
                    item.code === 101 && 
                    item.parameters && 
                    item.parameters[0] === "ninja2"
                );
                
                if (dialogueIndex !== -1) {
                    // Update the dialogue
                    page.list.splice(dialogueIndex, 3, // Remove existing dialogue
                        { code: 101, indent: 1, parameters: ["ninja2", 0, 0, 1] },
                        { code: 401, indent: 1, parameters: ["A test of will, and you have endured."] },
                        { code: 401, indent: 1, parameters: ["You show promise as an ally against A.S.P."] },
                        { code: 401, indent: 1, parameters: ["I will join your cause."] }
                    );
                    
                    console.log('Pink Ninja dialogue updated.');
                }
            }
        } else {
            console.warn('Pink Ninja troop (ID: 15) not found.');
        }
        
        // Update the Blue Ninja troop (Troop ID: 11)
        console.log('Updating Blue Ninja troop (ID: 11)...');
        const blueNinjaTroopIndex = troops.findIndex(troop => troop && troop.id === 11);
        
        if (blueNinjaTroopIndex !== -1) {
            // The Blue Ninja troop exists, add recruitment logic
            const blueNinjaTroop = troops[blueNinjaTroopIndex];
            
            // Add a new page for recruitment after completing the quest
            if (!blueNinjaTroop.pages) {
                blueNinjaTroop.pages = [];
            }
            
            // Add a new page that checks for quest completion and Pink Ninja in party
            blueNinjaTroop.pages.push({
                conditions: {
                    actorHp: 0,
                    actorId: 7, // Pink Ninja
                    actorValid: true, // Check if Pink Ninja is in party
                    enemyHp: 0,
                    enemyIndex: 0,
                    enemyValid: true,
                    switchId: 108, // "Shadows in the Code" quest completion switch
                    switchValid: true,
                    turnA: 0,
                    turnB: 0,
                    turnEnding: false,
                    turnValid: false
                },
                list: [
                    { code: 111, indent: 0, parameters: [4, 7, 0] }, // If Pink Ninja is in party
                    { code: 111, indent: 1, parameters: [0, 108, 0] }, // If quest is completed
                    { code: 111, indent: 2, parameters: [11, 1, 0, 6, 0] }, // Random chance (1/6)
                    { code: 101, indent: 3, parameters: ["ninja1", 5, 0, 2, "Blue Ninja"] },
                    { code: 401, indent: 3, parameters: ["The Compiler speaks highly of you."] },
                    { code: 401, indent: 3, parameters: ["You've proven yourself against A.S.P."] },
                    { code: 401, indent: 3, parameters: ["I will lend my tactical expertise to your cause."] },
                    { code: 129, indent: 3, parameters: [6, 0, false] }, // Add Blue Ninja to party
                    { code: 0, indent: 3, parameters: [] },
                    { code: 412, indent: 2, parameters: [] }, // End if random chance
                    { code: 0, indent: 2, parameters: [] },
                    { code: 412, indent: 1, parameters: [] }, // End if quest completed
                    { code: 0, indent: 1, parameters: [] },
                    { code: 412, indent: 0, parameters: [] }, // End if Pink Ninja in party
                    { code: 0, indent: 0, parameters: [] }
                ],
                span: 0
            });
            
            console.log('Blue Ninja recruitment logic added.');
        } else {
            console.warn('Blue Ninja troop (ID: 11) not found.');
        }
        
        // Update the Black Ninja troop (Troop ID: 14)
        console.log('Updating Black Ninja troop (ID: 14)...');
        const blackNinjaTroopIndex = troops.findIndex(troop => troop && troop.id === 14);
        
        if (blackNinjaTroopIndex !== -1) {
            // The Black Ninja troop exists, add recruitment logic
            const blackNinjaTroop = troops[blackNinjaTroopIndex];
            
            // Add a new page for recruitment after completing the quest
            if (!blackNinjaTroop.pages) {
                blackNinjaTroop.pages = [];
            }
            
            // Add a new page that checks for quest completion and Pink Ninja in party
            blackNinjaTroop.pages.push({
                conditions: {
                    actorHp: 0,
                    actorId: 7, // Pink Ninja
                    actorValid: true, // Check if Pink Ninja is in party
                    enemyHp: 0,
                    enemyIndex: 0,
                    enemyValid: true,
                    switchId: 108, // "Shadows in the Code" quest completion switch
                    switchValid: true,
                    turnA: 0,
                    turnB: 0,
                    turnEnding: false,
                    turnValid: false
                },
                list: [
                    { code: 111, indent: 0, parameters: [4, 7, 0] }, // If Pink Ninja is in party
                    { code: 111, indent: 1, parameters: [0, 108, 0] }, // If quest is completed
                    { code: 111, indent: 2, parameters: [11, 1, 0, 8, 0] }, // Random chance (1/8)
                    { code: 101, indent: 3, parameters: ["ninja1", 4, 0, 2, "Black Ninja"] },
                    { code: 401, indent: 3, parameters: ["Reality is malleable in the right hands."] },
                    { code: 401, indent: 3, parameters: ["The Compiler believes you can help us"] },
                    { code: 401, indent: 3, parameters: ["prevent Protocol Zero. I will join you."] },
                    { code: 129, indent: 3, parameters: [5, 0, false] }, // Add Black Ninja to party
                    { code: 0, indent: 3, parameters: [] },
                    { code: 412, indent: 2, parameters: [] }, // End if random chance
                    { code: 0, indent: 2, parameters: [] },
                    { code: 412, indent: 1, parameters: [] }, // End if quest completed
                    { code: 0, indent: 1, parameters: [] },
                    { code: 412, indent: 0, parameters: [] }, // End if Pink Ninja in party
                    { code: 0, indent: 0, parameters: [] }
                ],
                span: 0
            });
            
            console.log('Black Ninja recruitment logic added.');
        } else {
            console.warn('Black Ninja troop (ID: 14) not found.');
        }
        
        // Update the Green Ninja troop (Troop ID: 9)
        console.log('Updating Green Ninja troop (ID: 9)...');
        const greenNinjaTroopIndex = troops.findIndex(troop => troop && troop.id === 9);
        
        if (greenNinjaTroopIndex !== -1) {
            // The Green Ninja troop exists, add recruitment logic
            const greenNinjaTroop = troops[greenNinjaTroopIndex];
            
            // Add a new page for recruitment after completing the quest
            if (!greenNinjaTroop.pages) {
                greenNinjaTroop.pages = [];
            }
            
            // Add a new page that checks for quest completion and Pink Ninja in party
            greenNinjaTroop.pages.push({
                conditions: {
                    actorHp: 0,
                    actorId: 7, // Pink Ninja
                    actorValid: true, // Check if Pink Ninja is in party
                    enemyHp: 0,
                    enemyIndex: 0,
                    enemyValid: true,
                    switchId: 108, // "Shadows in the Code" quest completion switch
                    switchValid: true,
                    turnA: 0,
                    turnB: 0,
                    turnEnding: false,
                    turnValid: false
                },
                list: [
                    { code: 111, indent: 0, parameters: [4, 7, 0] }, // If Pink Ninja is in party
                    { code: 111, indent: 1, parameters: [0, 108, 0] }, // If quest is completed
                    { code: 111, indent: 2, parameters: [11, 1, 0, 10, 0] }, // Random chance (1/10)
                    { code: 101, indent: 3, parameters: ["ninja1", 4, 0, 2, "Green Ninja"] },
                    { code: 401, indent: 3, parameters: ["Your body harbors toxins from this world."] },
                    { code: 401, indent: 3, parameters: ["I can help purify you while we fight"] },
                    { code: 401, indent: 3, parameters: ["against Vitalix's poisonous influence."] },
                    { code: 129, indent: 3, parameters: [8, 0, false] }, // Add Green Ninja to party (assuming ID 8)
                    { code: 0, indent: 3, parameters: [] },
                    { code: 412, indent: 2, parameters: [] }, // End if random chance
                    { code: 0, indent: 2, parameters: [] },
                    { code: 412, indent: 1, parameters: [] }, // End if quest completed
                    { code: 0, indent: 1, parameters: [] },
                    { code: 412, indent: 0, parameters: [] }, // End if Pink Ninja in party
                    { code: 0, indent: 0, parameters: [] }
                ],
                span: 0
            });
            
            console.log('Green Ninja recruitment logic added.');
        } else {
            console.warn('Green Ninja troop (ID: 9) not found.');
        }
        
        // Update the Red Ninja troop (Troop ID: 12)
        console.log('Updating Red Ninja troop (ID: 12)...');
        const redNinjaTroopIndex = troops.findIndex(troop => troop && troop.id === 12);
        
        if (redNinjaTroopIndex !== -1) {
            // The Red Ninja troop exists, add recruitment logic
            const redNinjaTroop = troops[redNinjaTroopIndex];
            
            // Add a new page for recruitment after completing the quest
            if (!redNinjaTroop.pages) {
                redNinjaTroop.pages = [];
            }
            
            // Add a new page that checks for quest completion and Pink Ninja in party
            redNinjaTroop.pages.push({
                conditions: {
                    actorHp: 0,
                    actorId: 7, // Pink Ninja
                    actorValid: true, // Check if Pink Ninja is in party
                    enemyHp: 0,
                    enemyIndex: 0,
                    enemyValid: true,
                    switchId: 108, // "Shadows in the Code" quest completion switch
                    switchValid: true,
                    turnA: 0,
                    turnB: 0,
                    turnEnding: false,
                    turnValid: false
                },
                list: [
                    { code: 111, indent: 0, parameters: [4, 7, 0] }, // If Pink Ninja is in party
                    { code: 111, indent: 1, parameters: [0, 108, 0] }, // If quest is completed
                    { code: 111, indent: 2, parameters: [11, 1, 0, 12, 0] }, // Random chance (1/12)
                    { code: 101, indent: 3, parameters: ["ninja1", 4, 0, 2, "Red Ninja"] },
                    { code: 401, indent: 3, parameters: ["Every structure has a weakness."] },
                    { code: 401, indent: 3, parameters: ["I can help you find the weak points"] },
                    { code: 401, indent: 3, parameters: ["in A.S.P.'s defenses. Count me in."] },
                    { code: 129, indent: 3, parameters: [9, 0, false] }, // Add Red Ninja to party (assuming ID 9)
                    { code: 0, indent: 3, parameters: [] },
                    { code: 412, indent: 2, parameters: [] }, // End if random chance
                    { code: 0, indent: 2, parameters: [] },
                    { code: 412, indent: 1, parameters: [] }, // End if quest completed
                    { code: 0, indent: 1, parameters: [] },
                    { code: 412, indent: 0, parameters: [] }, // End if Pink Ninja in party
                    { code: 0, indent: 0, parameters: [] }
                ],
                span: 0
            });
            
            console.log('Red Ninja recruitment logic added.');
        } else {
            console.warn('Red Ninja troop (ID: 12) not found.');
        }
        
        // Update the Purple Ninja troop (Troop ID: 13)
        console.log('Updating Purple Ninja troop (ID: 13)...');
        const purpleNinjaTroopIndex = troops.findIndex(troop => troop && troop.id === 13);
        
        if (purpleNinjaTroopIndex !== -1) {
            // The Purple Ninja troop exists, add recruitment logic
            const purpleNinjaTroop = troops[purpleNinjaTroopIndex];
            
            // Add a new page for recruitment after completing the quest
            if (!purpleNinjaTroop.pages) {
                purpleNinjaTroop.pages = [];
            }
            
            // Add a new page that checks for quest completion and Pink Ninja in party
            purpleNinjaTroop.pages.push({
                conditions: {
                    actorHp: 0,
                    actorId: 7, // Pink Ninja
                    actorValid: true, // Check if Pink Ninja is in party
                    enemyHp: 0,
                    enemyIndex: 0,
                    enemyValid: true,
                    switchId: 108, // "Shadows in the Code" quest completion switch
                    switchValid: true,
                    turnA: 0,
                    turnB: 0,
                    turnEnding: false,
                    turnValid: false
                },
                list: [
                    { code: 111, indent: 0, parameters: [4, 7, 0] }, // If Pink Ninja is in party
                    { code: 111, indent: 1, parameters: [0, 108, 0] }, // If quest is completed
                    { code: 111, indent: 2, parameters: [11, 1, 0, 15, 0] }, // Random chance (1/15)
                    { code: 101, indent: 3, parameters: ["ninja1", 4, 0, 2, "Purple Ninja"] },
                    { code: 401, indent: 3, parameters: ["I've infiltrated all five MegaCorps."] },
                    { code: 401, indent: 3, parameters: ["My disguise skills can get us into"] },
                    { code: 401, indent: 3, parameters: ["places others can't access. I'll join you."] },
                    { code: 129, indent: 3, parameters: [10, 0, false] }, // Add Purple Ninja to party (assuming ID 10)
                    { code: 0, indent: 3, parameters: [] },
                    { code: 412, indent: 2, parameters: [] }, // End if random chance
                    { code: 0, indent: 2, parameters: [] },
                    { code: 412, indent: 1, parameters: [] }, // End if quest completed
                    { code: 0, indent: 1, parameters: [] },
                    { code: 412, indent: 0, parameters: [] }, // End if Pink Ninja in party
                    { code: 0, indent: 0, parameters: [] }
                ],
                span: 0
            });
            
            console.log('Purple Ninja recruitment logic added.');
        } else {
            console.warn('Purple Ninja troop (ID: 13) not found.');
        }
        
        // Update the Brown Ninja troop (Troop ID: 10)
        console.log('Updating Brown Ninja troop (ID: 10)...');
        const brownNinjaTroopIndex = troops.findIndex(troop => troop && troop.id === 10);
        
        if (brownNinjaTroopIndex !== -1) {
            // The Brown Ninja troop exists, add recruitment logic
            const brownNinjaTroop = troops[brownNinjaTroopIndex];
            
            // Add a new page for recruitment after completing the quest
            if (!brownNinjaTroop.pages) {
                brownNinjaTroop.pages = [];
            }
            
            // Add a new page that checks for quest completion and Pink Ninja in party
            brownNinjaTroop.pages.push({
                conditions: {
                    actorHp: 0,
                    actorId: 7, // Pink Ninja
                    actorValid: true, // Check if Pink Ninja is in party
                    enemyHp: 0,
                    enemyIndex: 0,
                    enemyValid: true,
                    switchId: 108, // "Shadows in the Code" quest completion switch
                    switchValid: true,
                    turnA: 0,
                    turnB: 0,
                    turnEnding: false,
                    turnValid: false
                },
                list: [
                    { code: 111, indent: 0, parameters: [4, 7, 0] }, // If Pink Ninja is in party
                    { code: 111, indent: 1, parameters: [0, 108, 0] }, // If quest is completed
                    { code: 111, indent: 2, parameters: [11, 1, 0, 20, 0] }, // Random chance (1/20)
                    { code: 101, indent: 3, parameters: ["ninja1", 4, 0, 2, "Brown Ninja"] },
                    { code: 401, indent: 3, parameters: ["I've memorized terabytes of corporate secrets."] },
                    { code: 401, indent: 3, parameters: ["Knowledge is power, and I'll share it"] },
                    { code: 401, indent: 3, parameters: ["with those who fight for freedom."] },
                    { code: 129, indent: 3, parameters: [11, 0, false] }, // Add Brown Ninja to party (assuming ID 11)
                    { code: 0, indent: 3, parameters: [] },
                    { code: 412, indent: 2, parameters: [] }, // End if random chance
                    { code: 0, indent: 2, parameters: [] },
                    { code: 412, indent: 1, parameters: [] }, // End if quest completed
                    { code: 0, indent: 1, parameters: [] },
                    { code: 412, indent: 0, parameters: [] }, // End if Pink Ninja in party
                    { code: 0, indent: 0, parameters: [] }
                ],
                span: 0
            });
            
            console.log('Brown Ninja recruitment logic added.');
        } else {
            console.warn('Brown Ninja troop (ID: 10) not found.');
        }
        
        // Update the Rainbow Ninja troop (Troop ID: 8)
        console.log('Updating Rainbow Ninja troop (ID: 8)...');
        const rainbowNinjaTroopIndex = troops.findIndex(troop => troop && troop.id === 8);
        
        if (rainbowNinjaTroopIndex !== -1) {
            // The Rainbow Ninja troop exists, add special dialogue
            const rainbowNinjaTroop = troops[rainbowNinjaTroopIndex];
            
            // Add a new page for special dialogue after completing the quest
            if (!rainbowNinjaTroop.pages) {
                rainbowNinjaTroop.pages = [];
            }
            
            // Add a new page that checks for quest completion and Pink Ninja in party
            rainbowNinjaTroop.pages.push({
                conditions: {
                    actorHp: 0,
                    actorId: 7, // Pink Ninja
                    actorValid: true, // Check if Pink Ninja is in party
                    enemyHp: 50,
                    enemyIndex: 0,
                    enemyValid: true,
                    switchId: 108, // "Shadows in the Code" quest completion switch
                    switchValid: true,
                    turnA: 0,
                    turnB: 0,
                    turnEnding: false,
                    turnValid: false
                },
                list: [
                    { code: 101, indent: 0, parameters: ["ninja2", 0, 0, 2, "Pink Ninja"] },
                    { code: 401, indent: 0, parameters: ["These are elite members of the Digital Shadow"] },
                    { code: 401, indent: 0, parameters: ["Collective. They're testing our abilities."] },
                    { code: 401, indent: 0, parameters: ["Show them what we can do!"] },
                    { code: 0, indent: 0, parameters: [] }
                ],
                span: 0
            });
            
            console.log('Rainbow Ninja special dialogue added.');
        } else {
            console.warn('Rainbow Ninja troop (ID: 8) not found.');
        }
        
        // Write the updated troops back to the file
        fs.writeFileSync(troopsPath, JSON.stringify(troops), 'utf8');
        console.log(`Updated ${troopsPath} successfully!`);
        
        return true;
    } catch (error) {
        console.error(`Error updating ninja troops: ${error.message}`);
        return false;
    }
}

// Export the function
module.exports = {
    updateNinjaTroops
};

// Run the update if this script is executed directly
if (require.main === module) {
    updateNinjaTroops();
}
