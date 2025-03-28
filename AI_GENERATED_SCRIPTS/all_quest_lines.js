// All Quest Lines for MegaEarth 2049
// This file combines all the new quest lines into a single array for easy integration

// Import all quest line modules
const undergroundFarming = require('./undergroundfarming_quest.js');
const wastelandPostalService = require('./wastelandpostalservice_quest.js');
const syntheticEmotions = require('./syntheticEmotions_quest.js');
const wastelandArtGallery = require('./wastelandartgallery_quest.js');
const mutantCookingShow = require('./mutantcookingshow_quest.js');
const neonStreetRacing = require('./neonStreetRacing_quest.js');
const wastelandHistorians = require('./wastelandhistorians_quest.js');
const memoryMerchant = require('./memoryMerchant_quest.js');
const droneSwarmCommander = require('./droneSwarmCommander_quest.js');
const mutantPetRescue = require('./mutantpetrescue_quest.js');
const cyberneticEnhancement = require('./cyberneticEnhancement_quest.js');

// Combine all quest lines into a single array
const allQuestLines = [
    undergroundFarming,
    wastelandPostalService,
    syntheticEmotions,
    wastelandArtGallery,
    mutantCookingShow,
    neonStreetRacing,
    wastelandHistorians,
    memoryMerchant,
    droneSwarmCommander,
    mutantPetRescue,
    cyberneticEnhancement
];

// Export the combined array
module.exports = allQuestLines;
