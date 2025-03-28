// New Optional Quest Lines for MegaEarth 2049
// This file contains 6 new quest lines, each with 5 side quests

// Import individual quest lines
const burlapPantsConspiracy = require('./burlap_pants_quest.js');
const clownCourtJustice = require('./clown_court_quest.js');
const vendingMachineRevolution = require('./vending_machine_quest.js');
const stdCollector = require('./std_collector_quest.js');
const aspFragments = require('./asp_fragments_quest.js');
const trashOctopusTreasures = require('./trash_octopus_quest.js');

// Export all quest lines
module.exports = {
    burlapPantsConspiracy,
    clownCourtJustice,
    vendingMachineRevolution,
    stdCollector,
    aspFragments,
    trashOctopusTreasures
};
