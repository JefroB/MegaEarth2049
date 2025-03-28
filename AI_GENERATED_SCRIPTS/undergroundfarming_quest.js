// Underground Farming Collective Quest Line for MegaEarth 2049

const undergroundFarming = {
    name: "Underground Farming Collective",
    description: "Help a group of agricultural rebels grow non-mutated food in hidden underground facilities.",
    startingNPC: {
        name: "Sprout",
        location: "Timbuc Central Plaza (Map114)",
        appearance: "People1",
        index: 7,
        dialogue: [
            "*A thin person in dirt-stained clothes examines a small plant growing through a crack in the concrete*",
            "You know what's missing in this wasteland? Real food. Not that processed nutrient paste the corps feed us.",
            "We've got a collective growing actual vegetables underground. No mutations, no corporate patents, just real food.",
            "We could use someone with your skills. Interested in helping the green revolution?"
        ],
        x: 8,
        y: 12
    },
    sideQuests: [
        {
            name: "Seed Vault",
            description: "Recover pre-collapse seed samples from an abandoned Vitalix research facility.",
            objectives: [
                "Infiltrate the abandoned Vitalix facility",
                "Locate the climate-controlled seed storage vault",
                "Bypass the security system",
                "Retrieve the seed samples",
                "Return to Sprout without being followed"
            ],
            reward: {
                name: "Heirloom Seed Pouch",
                description: "A collection of rare, non-modified plant seeds.",
                effect: "Can be planted to grow healing herbs in safe locations",
                icon: 176
            },
            humor: "The security system is an ancient AI that keeps mistaking you for 'Dave from Accounting' and asking about your fictional children while you try to rob the place."
        },
        {
            name: "Hydroponic Havoc",
            description: "Set up a hydroponic system using salvaged parts from around Timbuc.",
            objectives: [
                "Collect water filtration components from the sewers",
                "Salvage lighting systems from abandoned buildings",
                "Acquire nutrient solution (legally or otherwise) from a Vitalix shipment",
                "Find a suitable power source",
                "Assemble the hydroponic system in the underground facility"
            ],
            reward: {
                name: "Nutrient Optimizer",
                description: "A device that enhances the nutritional value of any food.",
                effect: "Doubles the healing effect of all consumable items",
                icon: 176
            },
            humor: "The nutrient solution turns out to be the same formula as a popular energy drink, explaining why plants grow twice as fast but seem anxious and can't sleep at night."
        },
        {
            name: "Pest Control",
            description: "Deal with mutated insects that have infested part of the underground farm.",
            objectives: [
                "Investigate the source of the infestation",
                "Develop a non-toxic pest control solution",
                "Set up sonic deterrents around the perimeter",
                "Eliminate the mutant queen bug",
                "Seal the entry points to prevent future infestations"
            ],
            reward: {
                name: "Bug Whisperer",
                description: "A device that can control insect behavior.",
                effect: "Can summon a swarm of insects to distract enemies in combat",
                icon: 83
            },
            humor: "The mutant bugs turn out to be surprisingly reasonable once you establish communication, and they agree to leave in exchange for a small plot of land to grow their own mushrooms and weekly poetry readings."
        },
        {
            name: "Corporate Sabotage",
            description: "Prevent Vitalix from discovering the underground farm by sabotaging their soil analysis project.",
            objectives: [
                "Infiltrate the Vitalix soil survey team",
                "Replace their soil samples with ordinary dirt",
                "Modify their survey data",
                "Plant false information about toxic soil conditions",
                "Redirect their investigation away from the farm's location"
            ],
            reward: {
                name: "Corporate Camouflage",
                description: "A device that masks biological signatures from corporate scanners.",
                effect: "Reduces encounter rate in corporate-controlled areas by 50%",
                icon: 83
            },
            humor: "Your false data about the soil being contaminated with 'hyper-caffeine' leads to Vitalix launching a new premium coffee product called 'Grounds for Excitement' that keeps customers awake for 72 hours straight."
        },
        {
            name: "Harvest Festival",
            description: "Help organize an underground farmers market to distribute the harvest while avoiding corporate attention.",
            objectives: [
                "Set up secure communication channels for potential customers",
                "Establish discreet distribution points throughout Timbuc",
                "Create a lookout system to watch for corporate agents",
                "Distribute produce to key community members",
                "Ensure everyone gets safely back to the farm after the market"
            ],
            reward: {
                name: "Nature's Bounty",
                description: "A basket of fresh, non-mutated fruits and vegetables.",
                effect: "Permanently increases max HP by 10% when consumed",
                icon: 176
            },
            humor: "The citizens of Timbuc are so unfamiliar with real vegetables that some try to wear carrots as fashion accessories and one person attempts to install a cabbage as a neural implant, claiming it makes them 'feel more connected to nature.'"
        }
    ],
    finalReward: {
        name: "Green Thumb",
        description: "Recognition as a trusted member of the Underground Farming Collective.",
        effect: "Access to the hidden underground farm hub with exclusive items and quests",
        icon: 182
    }
};

module.exports = undergroundFarming;
