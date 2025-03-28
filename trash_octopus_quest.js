// Trash Octopus Treasures Quest Line for MegaEarth 2049

const trashOctopusTreasures = {
    name: "Trash Octopus Treasures",
    description: "Help the legendary Trash Octopus recover valuable pre-collapse artifacts from the garbage heaps of Timbuc.",
    startingNPC: {
        name: "The Trash King",
        location: "Timbuc Landfill (Map023)",
        appearance: "People2",
        index: 7,
        dialogue: [
            "*A figure wearing a crown of circuit boards emerges from a trash pile*",
            "Behold! I am the Trash King, sovereign of all that is discarded!",
            "The great Trash Octopus has lost his most prized possessions in these heaps.",
            "Help us recover them, and you'll be rewarded with treasures beyond imagination!"
        ],
        x: 15,
        y: 18
    },
    sideQuests: [
        {
            name: "Eight-Armed Bandit",
            description: "Recover the Trash Octopus's favorite slot machine from a gang of scavengers.",
            objectives: [
                "Track down the Rusty Wrenches scavenger gang",
                "Infiltrate their hideout in the abandoned amusement park",
                "Locate the stolen slot machine",
                "Either negotiate for its return or steal it back",
                "Deliver it to the Trash Octopus's lair"
            ],
            reward: {
                name: "Lucky Tentacle",
                description: "A preserved tentacle of an allegedly lucky sea creature.",
                effect: "Increases chance of finding rare items by 20%",
                icon: 145
            },
            humor: "The slot machine is modified to always display three tentacles as a jackpot, and instead of coins, it dispenses random objects the Trash Octopus found 'shiny and interesting'."
        },
        {
            name: "Garbage Gourmand",
            description: "Find the ingredients for the Trash Octopus's favorite garbage stew recipe.",
            objectives: [
                "Decipher the bizarre recipe written in ink (actual octopus ink)",
                "Collect 'perfectly aged' garbage from specific dumps",
                "Find a rare 'vintage' toxic waste barrel from before the collapse",
                "Harvest special mutated mushrooms growing in the sewers",
                "Prepare the stew according to the octopus's exacting standards"
            ],
            reward: {
                name: "Iron Stomach",
                description: "A digestive enhancement that allows you to eat almost anything.",
                effect: "Ability to consume normally inedible items for health recovery",
                icon: 72
            },
            humor: "The Trash Octopus insists that the stew be stirred counter-clockwise 'to respect the Coriolis effect' and served in a cracked toilet bowl 'for the proper bouquet'."
        },
        {
            name: "Tentacle Tangle",
            description: "Help the Trash Octopus untangle its tentacles from a complex web of pre-collapse technology.",
            objectives: [
                "Navigate to the deepest part of the landfill",
                "Identify the various technologies ensnaring the octopus",
                "Carefully disconnect old cables, wires, and mechanical traps",
                "Prevent the pile from collapsing during the rescue",
                "Free all eight tentacles without causing injury"
            ],
            reward: {
                name: "Grappling Tentacle",
                description: "A mechanical tentacle that can be used for climbing and grabbing.",
                effect: "Ability to reach otherwise inaccessible areas and grab distant objects",
                icon: 176
            },
            humor: "Each tentacle has developed a different personality during its entanglement, with one becoming obsessed with a still-functioning TV playing only static, which it calls 'the most compelling drama series ever'."
        },
        {
            name: "Octopus's Garden",
            description: "Help the Trash Octopus create a garden made entirely of salvaged items.",
            objectives: [
                "Collect shiny objects from throughout Timbuc",
                "Find waterproof paint to color the 'flowers'",
                "Salvage mechanical parts to create moving garden elements",
                "Arrange everything according to the octopus's artistic vision",
                "Install lighting to make the garden visible at night"
            ],
            reward: {
                name: "Recycler's Touch",
                description: "The ability to see the potential in discarded items.",
                effect: "Craft special items from junk with enhanced properties",
                icon: 193
            },
            humor: "The Trash Octopus insists that the garden needs a water feature, which turns out to be a leaking pipe that occasionally sprays visitors, which it finds hilarious every single time."
        },
        {
            name: "Kraken Awakens",
            description: "Protect the Trash Octopus from hunters who believe it's a dangerous mutant kraken.",
            objectives: [
                "Intercept the hunter party before they reach the landfill",
                "Gather evidence of the octopus's peaceful nature",
                "Present testimonials from locals who've been helped by the octopus",
                "Arrange a controlled meeting between hunters and the octopus",
                "Establish the landfill as a protected sanctuary"
            ],
            reward: {
                name: "Tentacle Camouflage",
                description: "A cloak made from synthetic octopus skin that changes color.",
                effect: "Improved stealth capabilities and resistance to water damage",
                icon: 135
            },
            humor: "The hunters are convinced the Trash Octopus is dangerous because 'it has too many arms to be trustworthy' and 'probably has a secret ink-based doomsday weapon'."
        }
    ],
    finalReward: {
        name: "Octopus's Treasure",
        description: "A collection of the most valuable and useful items the Trash Octopus has found over the years.",
        effect: "Random valuable items appear in your inventory daily",
        icon: 208
    }
};

// Export the quest line
module.exports = trashOctopusTreasures;
