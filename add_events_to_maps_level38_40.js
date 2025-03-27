// Script to add level 38-40 quest events to maps
const fs = require('fs');
const path = require('path');

// Function to read a JSON file
function readJsonFile(filePath) {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
}

// Function to write a JSON file
function writeJsonFile(filePath, data) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
}

// Function to add an event to a map
function addEventToMap(mapFilePath, eventFilePath) {
    try {
        // Read the map and event files
        const mapData = readJsonFile(mapFilePath);
        const eventData = readJsonFile(eventFilePath);
        
        // Find the highest event ID in the map
        let maxId = 0;
        for (const event of mapData.events) {
            if (event && event.id > maxId) {
                maxId = event.id;
            }
        }
        
        // Set the event ID and adjust coordinates if needed
        eventData.id = maxId + 1;
        
        // Add the event to the map's events array
        // If the array is not large enough, expand it
        if (mapData.events.length <= eventData.id) {
            mapData.events = mapData.events.concat(
                Array(eventData.id - mapData.events.length + 1).fill(null)
            );
        }
        
        mapData.events[eventData.id] = eventData;
        
        // Write the updated map data back to the file
        writeJsonFile(mapFilePath, mapData);
        
        console.log(`Successfully added event ${path.basename(eventFilePath)} to ${path.basename(mapFilePath)}`);
        return true;
    } catch (error) {
        console.error(`Error adding event to map: ${error.message}`);
        return false;
    }
}

// Main function to add all events to maps
function addAllEvents() {
    const dataDir = path.join(__dirname, 'data');
    const tempEventsDir = path.join(__dirname, 'temp_events');
    
    // Level 38 Quest - "Reality Rewrite Protocol"
    console.log("\nAdding Level 38 Quest events...");
    
    // Professor Paradox in Quantum Dynamics Facility
    addEventToMap(
        path.join(dataDir, 'Map110.json'),
        path.join(tempEventsDir, 'professor_paradox_level38.json')
    );
    
    // Captain Calamari in Armatek Facility
    addEventToMap(
        path.join(dataDir, 'Map109.json'),
        path.join(tempEventsDir, 'captain_calamari.json')
    );
    
    // The Narrator in Armatek Facility
    addEventToMap(
        path.join(dataDir, 'Map109.json'),
        path.join(tempEventsDir, 'the_narrator.json')
    );
    
    // Reality Anchors in Armatek Facility
    addEventToMap(
        path.join(dataDir, 'Map109.json'),
        path.join(tempEventsDir, 'reality_anchor1.json')
    );
    
    addEventToMap(
        path.join(dataDir, 'Map109.json'),
        path.join(tempEventsDir, 'reality_anchor2.json')
    );
    
    addEventToMap(
        path.join(dataDir, 'Map109.json'),
        path.join(tempEventsDir, 'reality_anchor3.json')
    );
    
    // Level 39 Quest - "A.S.P.'s Floating Mansion Infiltration"
    console.log("\nAdding Level 39 Quest events...");
    
    // Trash King outside Floating Mansion
    addEventToMap(
        path.join(dataDir, 'Map038.json'),
        path.join(tempEventsDir, 'trash_king.json')
    );
    
    // Valuable Trash items
    addEventToMap(
        path.join(dataDir, 'Map010.json'),
        path.join(tempEventsDir, 'valuable_trash1.json')
    );
    
    addEventToMap(
        path.join(dataDir, 'Map114.json'),
        path.join(tempEventsDir, 'valuable_trash2.json')
    );
    
    addEventToMap(
        path.join(dataDir, 'Map105.json'),
        path.join(tempEventsDir, 'valuable_trash3.json')
    );
    
    // Mayor McFace in Floating Mansion 1st floor
    addEventToMap(
        path.join(dataDir, 'Map040.json'),
        path.join(tempEventsDir, 'mayor_mcface.json')
    );
    
    // MAX-E-MUM in Floating Mansion 2nd floor
    addEventToMap(
        path.join(dataDir, 'Map091.json'),
        path.join(tempEventsDir, 'max_e_mum_level39.json')
    );
    
    // Level 40 Quest - "Protocol Zero Countdown"
    console.log("\nAdding Level 40 Quest events...");
    
    // Dr. Voss Hologram in Secret Lab
    addEventToMap(
        path.join(dataDir, 'Map113.json'),
        path.join(tempEventsDir, 'dr_voss_hologram.json')
    );
    
    // DJ Static in Timbuc Central Plaza
    addEventToMap(
        path.join(dataDir, 'Map114.json'),
        path.join(tempEventsDir, 'dj_static.json')
    );
    
    // The Twins in Internet Cafe
    addEventToMap(
        path.join(dataDir, 'Map008.json'),
        path.join(tempEventsDir, 'the_twins.json')
    );
    
    // Final Necklace Piece in Secret Lab
    addEventToMap(
        path.join(dataDir, 'Map113.json'),
        path.join(tempEventsDir, 'final_necklace_piece.json')
    );
    
    console.log("\nAll events have been added to their respective maps!");
}

// Run the main function
addAllEvents();
