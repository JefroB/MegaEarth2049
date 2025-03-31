/**
 * Implement Ninja System
 * 
 * This master script integrates all components of the Digital Shadow Collective (ninja) system.
 * It calls the other scripts we've created to implement the complete ninja system:
 * 
 * 1. Updates the story with ninja lore
 * 2. Adds the "Shadows in the Code" quest line
 * 3. Updates the dictionary with ninja terminology
 * 4. Updates the ninja troops with recruitment logic
 * 5. Adds ninja items to the game
 */

const fs = require('fs');
const path = require('path');

// Import the component scripts
const shadowsInCodeQuest = require('./shadows_in_code_quest');
const updateDictionaryNinjaTerms = require('./update_dictionary_ninja_terms');
const updateNinjaTroops = require('./update_ninja_troops');
const addNinjaItems = require('./add_ninja_items');

/**
 * Implements the complete ninja system
 * @returns {boolean} - Success status
 */
async function implementNinjaSystem() {
    console.log('=== IMPLEMENTING DIGITAL SHADOW COLLECTIVE (NINJA) SYSTEM ===');
    
    try {
        // Create backup directory if it doesn't exist
        const backupDir = path.join('backups', 'ninja_system_' + Date.now());
        if (!fs.existsSync('backups')) {
            fs.mkdirSync('backups');
        }
        fs.mkdirSync(backupDir);
        console.log(`Created backup directory: ${backupDir}`);
        
        // Backup key files
        const filesToBackup = [
            path.join('data', 'Troops.json'),
            path.join('data', 'Items.json'),
            'MegaEarth2049_Story.md'
        ];
        
        filesToBackup.forEach(file => {
            if (fs.existsSync(file)) {
                const backupFile = path.join(backupDir, path.basename(file));
                fs.copyFileSync(file, backupFile);
                console.log(`Backed up ${file} to ${backupFile}`);
            }
        });
        
        // Step 1: Add the "Shadows in the Code" quest line
        console.log('\n=== STEP 1: Adding "Shadows in the Code" quest line ===');
        const questResult = shadowsInCodeQuest.addShadowsInCodeQuest();
        if (questResult) {
            console.log('Successfully added "Shadows in the Code" quest line.');
        } else {
            console.error('Failed to add "Shadows in the Code" quest line.');
            return false;
        }
        
        // Step 2: Update the dictionary with ninja terminology
        console.log('\n=== STEP 2: Updating dictionary with ninja terminology ===');
        const dictionaryResult = updateDictionaryNinjaTerms.updateAllDictionaries();
        if (dictionaryResult) {
            console.log('Successfully updated dictionaries with ninja terminology.');
        } else {
            console.error('Failed to update dictionaries with ninja terminology.');
            return false;
        }
        
        // Step 3: Update the ninja troops with recruitment logic
        console.log('\n=== STEP 3: Updating ninja troops with recruitment logic ===');
        const troopsResult = updateNinjaTroops.updateNinjaTroops();
        if (troopsResult) {
            console.log('Successfully updated ninja troops with recruitment logic.');
        } else {
            console.error('Failed to update ninja troops with recruitment logic.');
            return false;
        }
        
        // Step 4: Add ninja items to the game
        console.log('\n=== STEP 4: Adding ninja items to the game ===');
        const itemsResult = addNinjaItems.addNinjaItems();
        if (itemsResult) {
            console.log('Successfully added ninja items to the game.');
        } else {
            console.error('Failed to add ninja items to the game.');
            return false;
        }
        
        console.log('\n=== DIGITAL SHADOW COLLECTIVE (NINJA) SYSTEM IMPLEMENTATION COMPLETE ===');
        console.log('\nThe ninja system has been successfully implemented with the following components:');
        console.log('1. "Shadows in the Code" quest line added');
        console.log('2. Dictionary updated with ninja terminology');
        console.log('3. Ninja troops updated with recruitment logic');
        console.log('4. Ninja items added to the game');
        console.log('\nNOTE: Two new maps need to be created:');
        console.log('- Map ID 101: Hidden Dojo');
        console.log('- Map ID 102: Matrix');
        console.log('\nThese maps are referenced in the quest line but need to be created manually.');
        
        return true;
    } catch (error) {
        console.error(`Error implementing ninja system: ${error.message}`);
        return false;
    }
}

// Export the function
module.exports = {
    implementNinjaSystem
};

// Run the implementation if this script is executed directly
if (require.main === module) {
    implementNinjaSystem().then(success => {
        if (success) {
            console.log('Ninja system implementation completed successfully!');
        } else {
            console.error('Ninja system implementation failed!');
            process.exit(1);
        }
    }).catch(error => {
        console.error(`Unexpected error: ${error.message}`);
        process.exit(1);
    });
}
