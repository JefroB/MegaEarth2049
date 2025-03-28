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
  
  // Add Cybernetic Enhancement events to maps
  console.log("\nAdding Cybernetic Enhancement events to maps...");
  
  // Add starting NPC to Map014
  addEventToMap(path.join(tempEventsDir, 'cyberneticEnhancement_starting_npc.json'), 14);
  
  // Add objectives to Maps 14, 15, 16
  const cyberneticEnhancementFiles = fs.readdirSync(tempEventsDir)
    .filter(file => file.startsWith('cyberneticEnhancement_') && file.includes('objective'));
  
  for (let i = 0; i < cyberneticEnhancementFiles.length; i++) {
    // Distribute objectives across maps 14, 15, 16
    const mapId = 14 + (i % 3);
    addEventToMap(path.join(tempEventsDir, cyberneticEnhancementFiles[i]), mapId);
  }
  
  // Add completion event to Map014
  addEventToMap(path.join(tempEventsDir, 'cyberneticEnhancement_completion.json'), 14);
  
  // Add Virtual Reality Addiction events to maps
  console.log("\nAdding Virtual Reality Addiction events to maps...");
  
  // Add starting NPC to Map031
  addEventToMap(path.join(tempEventsDir, 'virtualRealityAddiction_starting_npc.json'), 31);
  
  // Add objectives to Maps 31, 32, 33
  const virtualRealityAddictionFiles = fs.readdirSync(tempEventsDir)
    .filter(file => file.startsWith('virtualRealityAddiction_') && file.includes('objective'));
  
  for (let i = 0; i < virtualRealityAddictionFiles.length; i++) {
    // Distribute objectives across maps 31, 32, 33
    const mapId = 31 + (i % 3);
    addEventToMap(path.join(tempEventsDir, virtualRealityAddictionFiles[i]), mapId);
  }
  
  // Add completion event to Map031
  addEventToMap(path.join(tempEventsDir, 'virtualRealityAddiction_completion.json'), 31);
  
  // Add Neon Street Racing events to maps
  console.log("\nAdding Neon Street Racing events to maps...");
  
  // Add starting NPC to Map042
  addEventToMap(path.join(tempEventsDir, 'neonStreetRacing_starting_npc.json'), 42);
  
  // Add objectives to Maps 42, 43, 44
  const neonStreetRacingFiles = fs.readdirSync(tempEventsDir)
    .filter(file => file.startsWith('neonStreetRacing_') && file.includes('objective'));
  
  for (let i = 0; i < neonStreetRacingFiles.length; i++) {
    // Distribute objectives across maps 42, 43, 44
    const mapId = 42 + (i % 3);
    addEventToMap(path.join(tempEventsDir, neonStreetRacingFiles[i]), mapId);
  }
  
  // Add completion event to Map042
  addEventToMap(path.join(tempEventsDir, 'neonStreetRacing_completion.json'), 42);
  
  // Add Drone Swarm Commander events to maps
  console.log("\nAdding Drone Swarm Commander events to maps...");
  
  // Add starting NPC to Map053
  addEventToMap(path.join(tempEventsDir, 'droneSwarmCommander_starting_npc.json'), 53);
  
  // Add objectives to Maps 53, 54, 55
  const droneSwarmCommanderFiles = fs.readdirSync(tempEventsDir)
    .filter(file => file.startsWith('droneSwarmCommander_') && file.includes('objective'));
  
  for (let i = 0; i < droneSwarmCommanderFiles.length; i++) {
    // Distribute objectives across maps 53, 54, 55
    const mapId = 53 + (i % 3);
    addEventToMap(path.join(tempEventsDir, droneSwarmCommanderFiles[i]), mapId);
  }
  
  // Add completion event to Map053
  addEventToMap(path.join(tempEventsDir, 'droneSwarmCommander_completion.json'), 53);
  
  // Add Memory Merchant events to maps
  console.log("\nAdding Memory Merchant events to maps...");
  
  // Add starting NPC to Map047
  addEventToMap(path.join(tempEventsDir, 'memoryMerchant_starting_npc.json'), 47);
  
  // Add objectives to Maps 47, 48, 49
  const memoryMerchantFiles = fs.readdirSync(tempEventsDir)
    .filter(file => file.startsWith('memoryMerchant_') && file.includes('objective'));
  
  for (let i = 0; i < memoryMerchantFiles.length; i++) {
    // Distribute objectives across maps 47, 48, 49
    const mapId = 47 + (i % 3);
    addEventToMap(path.join(tempEventsDir, memoryMerchantFiles[i]), mapId);
  }
  
  // Add completion event to Map047
  addEventToMap(path.join(tempEventsDir, 'memoryMerchant_completion.json'), 47);
  
  // Add Synthetic Emotions events to maps
  console.log("\nAdding Synthetic Emotions events to maps...");
  
  // Add starting NPC to Map039
  addEventToMap(path.join(tempEventsDir, 'syntheticEmotions_starting_npc.json'), 39);
  
  // Add objectives to Maps 39, 40, 41
  const syntheticEmotionsFiles = fs.readdirSync(tempEventsDir)
    .filter(file => file.startsWith('syntheticEmotions_') && file.includes('objective'));
  
  for (let i = 0; i < syntheticEmotionsFiles.length; i++) {
    // Distribute objectives across maps 39, 40, 41
    const mapId = 39 + (i % 3);
    addEventToMap(path.join(tempEventsDir, syntheticEmotionsFiles[i]), mapId);
  }
  
  // Add completion event to Map039
  addEventToMap(path.join(tempEventsDir, 'syntheticEmotions_completion.json'), 39);
  
  // Add Digital Graffiti events to maps
  console.log("\nAdding Digital Graffiti events to maps...");
  
  // Add starting NPC to Map061
  addEventToMap(path.join(tempEventsDir, 'digitalGraffiti_starting_npc.json'), 61);
  
  // Add objectives to Maps 61, 62, 63
  const digitalGraffitiFiles = fs.readdirSync(tempEventsDir)
    .filter(file => file.startsWith('digitalGraffiti_') && file.includes('objective'));
  
  for (let i = 0; i < digitalGraffitiFiles.length; i++) {
    // Distribute objectives across maps 61, 62, 63
    const mapId = 61 + (i % 3);
    addEventToMap(path.join(tempEventsDir, digitalGraffitiFiles[i]), mapId);
  }
  
  // Add completion event to Map061
  addEventToMap(path.join(tempEventsDir, 'digitalGraffiti_completion.json'), 61);
  
  // Add Synthetic Pets events to maps
  console.log("\nAdding Synthetic Pets events to maps...");
  
  // Add starting NPC to Map044
  addEventToMap(path.join(tempEventsDir, 'syntheticPets_starting_npc.json'), 44);
  
  // Add objectives to Maps 44, 45, 46
  const syntheticPetsFiles = fs.readdirSync(tempEventsDir)
    .filter(file => file.startsWith('syntheticPets_') && file.includes('objective'));
  
  for (let i = 0; i < syntheticPetsFiles.length; i++) {
    // Distribute objectives across maps 44, 45, 46
    const mapId = 44 + (i % 3);
    addEventToMap(path.join(tempEventsDir, syntheticPetsFiles[i]), mapId);
  }
  
  // Add completion event to Map044
  addEventToMap(path.join(tempEventsDir, 'syntheticPets_completion.json'), 44);
  
  // Add Holographic Nightclub events to maps
  console.log("\nAdding Holographic Nightclub events to maps...");
  
  // Add starting NPC to Map056
  addEventToMap(path.join(tempEventsDir, 'holographicNightclub_starting_npc.json'), 56);
  
  // Add objectives to Maps 56, 57, 58
  const holographicNightclubFiles = fs.readdirSync(tempEventsDir)
    .filter(file => file.startsWith('holographicNightclub_') && file.includes('objective'));
  
  for (let i = 0; i < holographicNightclubFiles.length; i++) {
    // Distribute objectives across maps 56, 57, 58
    const mapId = 56 + (i % 3);
    addEventToMap(path.join(tempEventsDir, holographicNightclubFiles[i]), mapId);
  }
  
  // Add completion event to Map056
  addEventToMap(path.join(tempEventsDir, 'holographicNightclub_completion.json'), 56);
  
  console.log("\nAll quest events have been added to the maps!");
}

// Run the main function
addQuestEventsToMaps();
