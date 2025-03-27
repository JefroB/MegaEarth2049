// Script to add events to maps using the batch-edit-tool.js
const fs = require('fs');
const path = require('path');

// Function to add an event to a map
function addEventToMap(mapPath, eventPath) {
    try {
        // Read the map file
        const mapData = JSON.parse(fs.readFileSync(mapPath, 'utf8'));
        
        // Read the event file
        const eventData = JSON.parse(fs.readFileSync(eventPath, 'utf8'));
        
        // Find the highest event ID
        let maxId = 0;
        for (const eventId in mapData.events) {
            if (eventId && !isNaN(parseInt(eventId))) {
                maxId = Math.max(maxId, parseInt(eventId));
            }
        }
        
        // Set the new event ID
        eventData.id = maxId + 1;
        
        // Add the event to the map
        if (!mapData.events) {
            mapData.events = [];
        }
        mapData.events[eventData.id] = eventData;
        
        // Write the updated map file
        fs.writeFileSync(mapPath, JSON.stringify(mapData, null, 2));
        
        console.log(`Added event ${eventData.name} to ${path.basename(mapPath)} with ID ${eventData.id}`);
        return true;
    } catch (error) {
        console.error(`Error adding event to ${path.basename(mapPath)}:`, error.message);
        return false;
    }
}

// Paths to the map files
const map47Path = path.join(__dirname, 'data', 'Map047.json'); // Snowy Village (Level 34)
const map103Path = path.join(__dirname, 'data', 'Map103.json'); // Asteroid Belt (Level 35)

// Paths to the event files
const tempDir = path.join(__dirname, 'temp_events');
const level34QuestGiverPath = path.join(tempDir, 'level34_quest_giver.json');
const dataCrystal1Path = path.join(tempDir, 'data_crystal1.json');
const dataCrystal2Path = path.join(tempDir, 'data_crystal2.json');
const dataCrystal3Path = path.join(tempDir, 'data_crystal3.json');
const level35QuestNPCPath = path.join(tempDir, 'level35_quest_npc.json');

// Add events to maps
console.log('Adding level 34 quest events to Map047.json (Snowy Village)...');
let success = true;
success = success && addEventToMap(map47Path, level34QuestGiverPath);
success = success && addEventToMap(map47Path, dataCrystal1Path);
success = success && addEventToMap(map47Path, dataCrystal2Path);
success = success && addEventToMap(map47Path, dataCrystal3Path);

console.log('\nAdding level 35 quest event to Map103.json (Asteroid Belt)...');
success = success && addEventToMap(map103Path, level35QuestNPCPath);

if (success) {
    console.log('\nAll events added successfully!');
    console.log('\nLevel 34 Quest (Snowy Village):');
    console.log('- Added Frost Oracle (quest giver)');
    console.log('- Added 3 Frozen Data Crystals');
    console.log('\nLevel 35 Quest (Asteroid Belt):');
    console.log('- Added Stranded Researcher (connects to Space Station quest)');
} else {
    console.log('\nSome events could not be added. Check the error messages above.');
}
