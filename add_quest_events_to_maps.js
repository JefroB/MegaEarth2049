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
  
  // Add Underground Farming events to maps
  console.log("\nAdding Underground Farming events to maps...");
  
  // Add starting NPC to Map070
  addEventToMap(path.join(tempEventsDir, 'undergroundfarming_starting_npc.json'), 70);
  
  // Add objectives to Maps 70, 71, 72
  const undergroundFarmingFiles = fs.readdirSync(tempEventsDir)
    .filter(file => file.startsWith('undergroundfarming_') && file.includes('objective'));
  
  for (let i = 0; i < undergroundFarmingFiles.length; i++) {
    // Distribute objectives across maps 70, 71, 72
    const mapId = 70 + (i % 3);
    addEventToMap(path.join(tempEventsDir, undergroundFarmingFiles[i]), mapId);
  }
  
  // Add completion event to Map070
  addEventToMap(path.join(tempEventsDir, 'undergroundfarming_completion.json'), 70);
  
  // Add Wasteland Fashion events to maps
  console.log("\nAdding Wasteland Fashion events to maps...");
  
  // Add starting NPC to Map075
  addEventToMap(path.join(tempEventsDir, 'wastelandfashion_starting_npc.json'), 75);
  
  // Add objectives to Maps 75, 76, 77
  const wastelandFashionFiles = fs.readdirSync(tempEventsDir)
    .filter(file => file.startsWith('wastelandfashion_') && file.includes('objective'));
  
  for (let i = 0; i < wastelandFashionFiles.length; i++) {
    // Distribute objectives across maps 75, 76, 77
    const mapId = 75 + (i % 3);
    addEventToMap(path.join(tempEventsDir, wastelandFashionFiles[i]), mapId);
  }
  
  // Add completion event to Map075
  addEventToMap(path.join(tempEventsDir, 'wastelandfashion_completion.json'), 75);
  
  // Add Mutant Pet Rescue events to maps
  console.log("\nAdding Mutant Pet Rescue events to maps...");
  
  // Add starting NPC to Map080
  addEventToMap(path.join(tempEventsDir, 'mutantpetrescue_starting_npc.json'), 80);
  
  // Add objectives to Maps 80, 81, 82
  const mutantPetRescueFiles = fs.readdirSync(tempEventsDir)
    .filter(file => file.startsWith('mutantpetrescue_') && file.includes('objective'));
  
  for (let i = 0; i < mutantPetRescueFiles.length; i++) {
    // Distribute objectives across maps 80, 81, 82
    const mapId = 80 + (i % 3);
    addEventToMap(path.join(tempEventsDir, mutantPetRescueFiles[i]), mapId);
  }
  
  // Add completion event to Map080
  addEventToMap(path.join(tempEventsDir, 'mutantpetrescue_completion.json'), 80);
  
  // Add Wasteland Radio Network events to maps
  console.log("\nAdding Wasteland Radio Network events to maps...");
  
  // Add starting NPC to Map085
  addEventToMap(path.join(tempEventsDir, 'wastelandradionetwork_starting_npc.json'), 85);
  
  // Add objectives to Maps 85, 86, 87
  const wastelandRadioNetworkFiles = fs.readdirSync(tempEventsDir)
    .filter(file => file.startsWith('wastelandradionetwork_') && file.includes('objective'));
  
  for (let i = 0; i < wastelandRadioNetworkFiles.length; i++) {
    // Distribute objectives across maps 85, 86, 87
    const mapId = 85 + (i % 3);
    addEventToMap(path.join(tempEventsDir, wastelandRadioNetworkFiles[i]), mapId);
  }
  
  // Add completion event to Map085
  addEventToMap(path.join(tempEventsDir, 'wastelandradionetwork_completion.json'), 85);
  
  // Add Wasteland Olympics events to maps
  console.log("\nAdding Wasteland Olympics events to maps...");
  
  // Add starting NPC to Map090
  addEventToMap(path.join(tempEventsDir, 'wastelandolympics_starting_npc.json'), 90);
  
  // Add objectives to Maps 90, 91, 92
  const wastelandOlympicsFiles = fs.readdirSync(tempEventsDir)
    .filter(file => file.startsWith('wastelandolympics_') && file.includes('objective'));
  
  for (let i = 0; i < wastelandOlympicsFiles.length; i++) {
    // Distribute objectives across maps 90, 91, 92
    const mapId = 90 + (i % 3);
    addEventToMap(path.join(tempEventsDir, wastelandOlympicsFiles[i]), mapId);
  }
  
  // Add completion event to Map090
  addEventToMap(path.join(tempEventsDir, 'wastelandolympics_completion.json'), 90);
  
  // Add Wasteland Amusement Park events to maps
  console.log("\nAdding Wasteland Amusement Park events to maps...");
  
  // Add starting NPC to Map095
  addEventToMap(path.join(tempEventsDir, 'wastelandamusementpark_starting_npc.json'), 95);
  
  // Add objectives to Maps 95, 96, 97
  const wastelandAmusementParkFiles = fs.readdirSync(tempEventsDir)
    .filter(file => file.startsWith('wastelandamusementpark_') && file.includes('objective'));
  
  for (let i = 0; i < wastelandAmusementParkFiles.length; i++) {
    // Distribute objectives across maps 95, 96, 97
    const mapId = 95 + (i % 3);
    addEventToMap(path.join(tempEventsDir, wastelandAmusementParkFiles[i]), mapId);
  }
  
  // Add completion event to Map095
  addEventToMap(path.join(tempEventsDir, 'wastelandamusementpark_completion.json'), 95);
  
  // Add Wasteland Trading Caravan events to maps
  console.log("\nAdding Wasteland Trading Caravan events to maps...");
  
  // Add starting NPC to Map100
  addEventToMap(path.join(tempEventsDir, 'wastelandtradingcaravan_starting_npc.json'), 100);
  
  // Add objectives to Maps 100, 101, 102
  const wastelandTradingCaravanFiles = fs.readdirSync(tempEventsDir)
    .filter(file => file.startsWith('wastelandtradingcaravan_') && file.includes('objective'));
  
  for (let i = 0; i < wastelandTradingCaravanFiles.length; i++) {
    // Distribute objectives across maps 100, 101, 102
    const mapId = 100 + (i % 3);
    addEventToMap(path.join(tempEventsDir, wastelandTradingCaravanFiles[i]), mapId);
  }
  
  // Add completion event to Map100
  addEventToMap(path.join(tempEventsDir, 'wastelandtradingcaravan_completion.json'), 100);
  
  // Add Wasteland Postal Service events to maps
  console.log("\nAdding Wasteland Postal Service events to maps...");
  
  // Add starting NPC to Map105
  addEventToMap(path.join(tempEventsDir, 'wastelandpostalservice_starting_npc.json'), 105);
  
  // Add objectives to Maps 105, 106, 107
  const wastelandPostalServiceFiles = fs.readdirSync(tempEventsDir)
    .filter(file => file.startsWith('wastelandpostalservice_') && file.includes('objective'));
  
  for (let i = 0; i < wastelandPostalServiceFiles.length; i++) {
    // Distribute objectives across maps 105, 106, 107
    const mapId = 105 + (i % 3);
    addEventToMap(path.join(tempEventsDir, wastelandPostalServiceFiles[i]), mapId);
  }
  
  // Add completion event to Map105
  addEventToMap(path.join(tempEventsDir, 'wastelandpostalservice_completion.json'), 105);
  
  // Add Wasteland Historians events to maps
  console.log("\nAdding Wasteland Historians events to maps...");
  
  // Add starting NPC to Map110
  addEventToMap(path.join(tempEventsDir, 'wastelandhistorians_starting_npc.json'), 110);
  
  // Add objectives to Maps 110, 111, 112
  const wastelandHistoriansFiles = fs.readdirSync(tempEventsDir)
    .filter(file => file.startsWith('wastelandhistorians_') && file.includes('objective'));
  
  for (let i = 0; i < wastelandHistoriansFiles.length; i++) {
    // Distribute objectives across maps 110, 111, 112
    const mapId = 110 + (i % 3);
    addEventToMap(path.join(tempEventsDir, wastelandHistoriansFiles[i]), mapId);
  }
  
  // Add completion event to Map110
  addEventToMap(path.join(tempEventsDir, 'wastelandhistorians_completion.json'), 110);
  
  // Add Wasteland Theater Troupe events to maps
  console.log("\nAdding Wasteland Theater Troupe events to maps...");
  
  // Add starting NPC to Map115
  addEventToMap(path.join(tempEventsDir, 'wastelandtheatertroupe_starting_npc.json'), 115);
  
  // Add objectives to Maps 115, 116, 117
  const wastelandTheaterTroupeFiles = fs.readdirSync(tempEventsDir)
    .filter(file => file.startsWith('wastelandtheatertroupe_') && file.includes('objective'));
  
  for (let i = 0; i < wastelandTheaterTroupeFiles.length; i++) {
    // Distribute objectives across maps 115, 116, 117
    const mapId = 115 + (i % 3);
    addEventToMap(path.join(tempEventsDir, wastelandTheaterTroupeFiles[i]), mapId);
  }
  
  // Add completion event to Map115
  addEventToMap(path.join(tempEventsDir, 'wastelandtheatertroupe_completion.json'), 115);
  
  // Add Wasteland Hot Springs Resort events to maps
  console.log("\nAdding Wasteland Hot Springs Resort events to maps...");
  
  // Add starting NPC to Map120
  addEventToMap(path.join(tempEventsDir, 'wastelandhotspringsresort_starting_npc.json'), 120);
  
  // Add objectives to Maps 120, 121, 122
  const wastelandHotSpringsResortFiles = fs.readdirSync(tempEventsDir)
    .filter(file => file.startsWith('wastelandhotspringsresort_') && file.includes('objective'));
  
  for (let i = 0; i < wastelandHotSpringsResortFiles.length; i++) {
    // Distribute objectives across maps 120, 121, 122
    const mapId = 120 + (i % 3);
    addEventToMap(path.join(tempEventsDir, wastelandHotSpringsResortFiles[i]), mapId);
  }
  
  // Add completion event to Map120
  addEventToMap(path.join(tempEventsDir, 'wastelandhotspringsresort_completion.json'), 120);
  
  // Add Wasteland Culinary Competition events to maps
  console.log("\nAdding Wasteland Culinary Competition events to maps...");
  
  // Add starting NPC to Map125
  addEventToMap(path.join(tempEventsDir, 'wastelandculinarycompetition_starting_npc.json'), 125);
  
  // Add objectives to Maps 125, 126, 127
  const wastelandCulinaryCompetitionFiles = fs.readdirSync(tempEventsDir)
    .filter(file => file.startsWith('wastelandculinarycompetition_') && file.includes('objective'));
  
  for (let i = 0; i < wastelandCulinaryCompetitionFiles.length; i++) {
    // Distribute objectives across maps 125, 126, 127
    const mapId = 125 + (i % 3);
    addEventToMap(path.join(tempEventsDir, wastelandCulinaryCompetitionFiles[i]), mapId);
  }
  
  // Add completion event to Map125
  addEventToMap(path.join(tempEventsDir, 'wastelandculinarycompetition_completion.json'), 125);
  
  // Add Wasteland Music Festival events to maps
  console.log("\nAdding Wasteland Music Festival events to maps...");
  
  // Add starting NPC to Map130
  addEventToMap(path.join(tempEventsDir, 'wastelandmusicfestival_starting_npc.json'), 130);
  
  // Add objectives to Maps 130, 131, 132
  const wastelandMusicFestivalFiles = fs.readdirSync(tempEventsDir)
    .filter(file => file.startsWith('wastelandmusicfestival_') && file.includes('objective'));
  
  for (let i = 0; i < wastelandMusicFestivalFiles.length; i++) {
    // Distribute objectives across maps 130, 131, 132
    const mapId = 130 + (i % 3);
    addEventToMap(path.join(tempEventsDir, wastelandMusicFestivalFiles[i]), mapId);
  }
  
  // Add completion event to Map130
  addEventToMap(path.join(tempEventsDir, 'wastelandmusicfestival_completion.json'), 130);
  
  // Add Wasteland Sports League events to maps
  console.log("\nAdding Wasteland Sports League events to maps...");
  
  // Add starting NPC to Map135
  addEventToMap(path.join(tempEventsDir, 'wastelandsportsleague_starting_npc.json'), 135);
  
  // Add objectives to Maps 135, 136, 137
  const wastelandSportsLeagueFiles = fs.readdirSync(tempEventsDir)
    .filter(file => file.startsWith('wastelandsportsleague_') && file.includes('objective'));
  
  for (let i = 0; i < wastelandSportsLeagueFiles.length; i++) {
    // Distribute objectives across maps 135, 136, 137
    const mapId = 135 + (i % 3);
    addEventToMap(path.join(tempEventsDir, wastelandSportsLeagueFiles[i]), mapId);
  }
  
  // Add completion event to Map135
  addEventToMap(path.join(tempEventsDir, 'wastelandsportsleague_completion.json'), 135);
  
  // Add Wasteland Art Gallery events to maps
  console.log("\nAdding Wasteland Art Gallery events to maps...");
  
  // Add starting NPC to Map140
  addEventToMap(path.join(tempEventsDir, 'wastelandartgallery_starting_npc.json'), 140);
  
  // Add objectives to Maps 140, 141, 142
  const wastelandArtGalleryFiles = fs.readdirSync(tempEventsDir)
    .filter(file => file.startsWith('wastelandartgallery_') && file.includes('objective'));
  
  for (let i = 0; i < wastelandArtGalleryFiles.length; i++) {
    // Distribute objectives across maps 140, 141, 142
    const mapId = 140 + (i % 3);
    addEventToMap(path.join(tempEventsDir, wastelandArtGalleryFiles[i]), mapId);
  }
  
  // Add completion event to Map140
  addEventToMap(path.join(tempEventsDir, 'wastelandartgallery_completion.json'), 140);
  
  // Add Wasteland Film Festival events to maps
  console.log("\nAdding Wasteland Film Festival events to maps...");
  
  // Add starting NPC to Map145
  addEventToMap(path.join(tempEventsDir, 'wastelandfilmfestival_starting_npc.json'), 145);
  
  // Add objectives to Maps 145, 146, 147
  const wastelandFilmFestivalFiles = fs.readdirSync(tempEventsDir)
    .filter(file => file.startsWith('wastelandfilmfestival_') && file.includes('objective'));
  
  for (let i = 0; i < wastelandFilmFestivalFiles.length; i++) {
    // Distribute objectives across maps 145, 146, 147
    const mapId = 145 + (i % 3);
    addEventToMap(path.join(tempEventsDir, wastelandFilmFestivalFiles[i]), mapId);
  }
  
  // Add completion event to Map145
  addEventToMap(path.join(tempEventsDir, 'wastelandfilmfestival_completion.json'), 145);
  
  // Add Wasteland Circus events to maps
  console.log("\nAdding Wasteland Circus events to maps...");
  
  // Add starting NPC to Map150
  addEventToMap(path.join(tempEventsDir, 'wastelandcircus_starting_npc.json'), 150);
  
  // Add objectives to Maps 150, 151, 152
  const wastelandCircusFiles = fs.readdirSync(tempEventsDir)
    .filter(file => file.startsWith('wastelandcircus_') && file.includes('objective'));
  
  for (let i = 0; i < wastelandCircusFiles.length; i++) {
    // Distribute objectives across maps 150, 151, 152
    const mapId = 150 + (i % 3);
    addEventToMap(path.join(tempEventsDir, wastelandCircusFiles[i]), mapId);
  }
  
  // Add completion event to Map150
  addEventToMap(path.join(tempEventsDir, 'wastelandcircus_completion.json'), 150);
  
  // Add Wasteland Library Network events to maps
  console.log("\nAdding Wasteland Library Network events to maps...");
  
  // Add starting NPC to Map155
  addEventToMap(path.join(tempEventsDir, 'wastelandlibrarynetwork_starting_npc.json'), 155);
  
  // Add objectives to Maps 155, 156, 157
  const wastelandLibraryNetworkFiles = fs.readdirSync(tempEventsDir)
    .filter(file => file.startsWith('wastelandlibrarynetwork_') && file.includes('objective'));
  
  for (let i = 0; i < wastelandLibraryNetworkFiles.length; i++) {
    // Distribute objectives across maps 155, 156, 157
    const mapId = 155 + (i % 3);
    addEventToMap(path.join(tempEventsDir, wastelandLibraryNetworkFiles[i]), mapId);
  }
  
  // Add completion event to Map155
  addEventToMap(path.join(tempEventsDir, 'wastelandlibrarynetwork_completion.json'), 155);
  
  // Add Wasteland University events to maps
  console.log("\nAdding Wasteland University events to maps...");
  
  // Add starting NPC to Map160
  addEventToMap(path.join(tempEventsDir, 'wastelanduniversity_starting_npc.json'), 160);
  
  // Add objectives to Maps 160, 161, 162
  const wastelandUniversityFiles = fs.readdirSync(tempEventsDir)
    .filter(file => file.startsWith('wastelanduniversity_') && file.includes('objective'));
  
  for (let i = 0; i < wastelandUniversityFiles.length; i++) {
    // Distribute objectives across maps 160, 161, 162
    const mapId = 160 + (i % 3);
    addEventToMap(path.join(tempEventsDir, wastelandUniversityFiles[i]), mapId);
  }
  
  // Add completion event to Map160
  addEventToMap(path.join(tempEventsDir, 'wastelanduniversity_completion.json'), 160);
  
  // Add Wasteland Botanical Gardens events to maps
  console.log("\nAdding Wasteland Botanical Gardens events to maps...");
  
  // Add starting NPC to Map165
  addEventToMap(path.join(tempEventsDir, 'wastelandbotanicalgardens_starting_npc.json'), 165);
  
  // Add objectives to Maps 165, 166, 167
  const wastelandBotanicalGardensFiles = fs.readdirSync(tempEventsDir)
    .filter(file => file.startsWith('wastelandbotanicalgardens_') && file.includes('objective'));
  
  for (let i = 0; i < wastelandBotanicalGardensFiles.length; i++) {
    // Distribute objectives across maps 165, 166, 167
    const mapId = 165 + (i % 3);
    addEventToMap(path.join(tempEventsDir, wastelandBotanicalGardensFiles[i]), mapId);
  }
  
  // Add completion event to Map165
  addEventToMap(path.join(tempEventsDir, 'wastelandbotanicalgardens_completion.json'), 165);
  
  // Add Wasteland Observatory events to maps
  console.log("\nAdding Wasteland Observatory events to maps...");
  
  // Add starting NPC to Map170
  addEventToMap(path.join(tempEventsDir, 'wastelandobservatory_starting_npc.json'), 170);
  
  // Add objectives to Maps 170, 171, 172
  const wastelandObservatoryFiles = fs.readdirSync(tempEventsDir)
    .filter(file => file.startsWith('wastelandobservatory_') && file.includes('objective'));
  
  for (let i = 0; i < wastelandObservatoryFiles.length; i++) {
    // Distribute objectives across maps 170, 171, 172
    const mapId = 170 + (i % 3);
    addEventToMap(path.join(tempEventsDir, wastelandObservatoryFiles[i]), mapId);
  }
  
  // Add completion event to Map170
  addEventToMap(path.join(tempEventsDir, 'wastelandobservatory_completion.json'), 170);
  
  // Add Wasteland Museum of History events to maps
  console.log("\nAdding Wasteland Museum of History events to maps...");
  
  // Add starting NPC to Map175
  addEventToMap(path.join(tempEventsDir, 'wastelandmuseumofhistory_starting_npc.json'), 175);
  
  // Add objectives to Maps 175, 176, 177
  const wastelandMuseumOfHistoryFiles = fs.readdirSync(tempEventsDir)
    .filter(file => file.startsWith('wastelandmuseumofhistory_') && file.includes('objective'));
  
  for (let i = 0; i < wastelandMuseumOfHistoryFiles.length; i++) {
    // Distribute objectives across maps 175, 176, 177
    const mapId = 175 + (i % 3);
    addEventToMap(path.join(tempEventsDir, wastelandMuseumOfHistoryFiles[i]), mapId);
  }
  
  // Add completion event to Map175
  addEventToMap(path.join(tempEventsDir, 'wastelandmuseumofhistory_completion.json'), 175);
  
  console.log("\nAll quest events have been added to the maps!");
}

// Run the main function
addQuestEventsToMaps();
