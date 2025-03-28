// Script to add quest events to maps
const fs = require('fs');
const path = require('path');

// Function to add an event to a map
function addEventToMap(eventFilePath, mapId) {
  console.log(`Adding event from ${eventFilePath} to Map${mapId.toString().padStart(3, '0')}.json`);
  
  // Read the event file
  const eventData = JSON.parse(fs.readFileSync(eventFilePath, 'utf8'));
  
  // Read the map file
  const mapFilePath = path.join(__dirname, 'data', `Map${mapId.toString().padStart(3, '0')}.json`);
  const mapData = JSON.parse(fs.readFileSync(mapFilePath, 'utf8'));
  
  // Find the highest event ID in the map
  let maxId = 0;
  for (const event of Object.values(mapData.events || {})) {
    if (event && event.id > maxId) {
      maxId = event.id;
    }
  }
  
  // Assign a new ID to the event
  const newId = maxId + 1;
  eventData.id = newId;
  
  // Initialize events array if it doesn't exist
  if (!mapData.events) {
    mapData.events = [];
  }
  
  // Add the event to the map
  mapData.events[newId] = eventData;
  
  // Write the updated map file
  fs.writeFileSync(mapFilePath, JSON.stringify(mapData, null, 2));
  
  console.log(`Added event with ID ${newId} to Map${mapId.toString().padStart(3, '0')}.json`);
}

// Main function to add quest events to maps
function addQuestEventsToMaps() {
  // Create temp_events directory if it doesn't exist
  const tempEventsDir = path.join(__dirname, 'temp_events');
  if (!fs.existsSync(tempEventsDir)) {
    fs.mkdirSync(tempEventsDir);
  }
  
  // Add Wasteland Radio DJ events to maps
  console.log("Adding Wasteland Radio DJ events to maps...");
  
  // Add starting NPC to Map028
  addEventToMap(path.join(tempEventsDir, 'wastelandRadioDJ_starting_npc.json'), 28);
  
  // Add objectives to Maps 28, 29, 30
  const wastelandRadioDJFiles = fs.readdirSync(tempEventsDir)
    .filter(file => file.startsWith('wastelandRadioDJ_') && file.includes('objective'));
  
  for (let i = 0; i < wastelandRadioDJFiles.length; i++) {
    // Distribute objectives across maps 28, 29, 30
    const mapId = 28 + (i % 3);
    addEventToMap(path.join(tempEventsDir, wastelandRadioDJFiles[i]), mapId);
  }
  
  // Add completion event to Map028
  addEventToMap(path.join(tempEventsDir, 'wastelandRadioDJ_completion.json'), 28);
  
  // Add Mutant Cooking Show events to maps
  console.log("\nAdding Mutant Cooking Show events to maps...");
  
  // Add starting NPC to Map019
  addEventToMap(path.join(tempEventsDir, 'mutantCookingShow_starting_npc.json'), 19);
  
  // Add objectives to Maps 19, 20, 21
  const mutantCookingShowFiles = fs.readdirSync(tempEventsDir)
    .filter(file => file.startsWith('mutantCookingShow_') && file.includes('objective'));
  
  for (let i = 0; i < mutantCookingShowFiles.length; i++) {
    // Distribute objectives across maps 19, 20, 21
    const mapId = 19 + (i % 3);
    addEventToMap(path.join(tempEventsDir, mutantCookingShowFiles[i]), mapId);
  }
  
  // Add completion event to Map019
  addEventToMap(path.join(tempEventsDir, 'mutantCookingShow_completion.json'), 19);
  
  console.log("\nAll quest events have been added to the maps!");
}

// Run the main function
addQuestEventsToMaps();
