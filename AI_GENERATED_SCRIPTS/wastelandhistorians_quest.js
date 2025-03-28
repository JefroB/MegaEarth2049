// Wasteland Historians Quest Line for MegaEarth 2049

const wastelandHistorians = {
    name: "Wasteland Historians",
    description: "Help preserve knowledge of the world before the collapse by collecting artifacts, records, and memories.",
    startingNPC: {
        name: "Professor Memento",
        location: "Timbuc 2 Internet Cafe (Map008)",
        appearance: "Actor2",
        index: 5,
        dialogue: [
            "*An elderly person with spectacles and a coat covered in pockets full of notes examines a pre-collapse device*",
            "History is being erased, my friend. Not just by time, but deliberately by those who prefer we forget.",
            "I lead the Wasteland Historical Society. We preserve knowledge of the world before... all this.",
            "Your travels take you to places we scholars cannot reach. Would you help us recover our past?"
        ],
        x: 5,
        y: 5
    },
    sideQuests: [
        {
            name: "Digital Archaeology",
            description: "Recover data from pre-collapse storage devices in dangerous locations.",
            objectives: [
                "Retrieve a hard drive from the flooded basement of the old library",
                "Recover flash drives from a corporate executive's office",
                "Download data from a still-functioning but heavily guarded server",
                "Find a rare quantum storage crystal in the ruins of a research facility",
                "Return all storage devices to Professor Memento for analysis"
            ],
            reward: {
                name: "Data Recovery Tool",
                description: "A device that can extract data from damaged storage media.",
                effect: "Reveals hidden information when examining technological artifacts",
                icon: 83
            },
            humor: "The 'invaluable historical data' you risk your life to recover turns out to include someone's extensive collection of cat videos, pre-collapse memes about 'Monday feelings,' and a 10,000-entry spreadsheet tracking one person's daily coffee consumption with detailed tasting notes."
        },
        {
            name: "Oral History",
            description: "Interview the oldest survivors of the collapse to record their memories before they're lost forever.",
            objectives: [
                "Find Old Jeb, who claims to have worked for the government before the collapse",
                "Interview Granny Wasteland, who was a corporate scientist",
                "Record the memories of the Twins, who were children during the early days of MegaEarth",
                "Locate the mysterious Bunker Hermit who has lived in isolation since the collapse",
                "Protect the interview subjects from corporate agents trying to silence them"
            ],
            reward: {
                name: "Memory Crystal",
                description: "A device that can store and replay memories with perfect clarity.",
                effect: "Allows you to review past conversations and events in detail",
                icon: 79
            },
            humor: "Old Jeb's 'crucial government secrets' turn out to be mostly complaints about the office coffee machine and his conspiracy theory that the collapse was caused by 'too many people using the microwave and Wi-Fi at the same time,' which Professor Memento solemnly catalogs as 'valuable perspective on pre-collapse workplace culture.'"
        },
        {
            name: "Artifact Recovery",
            description: "Collect physical objects from the pre-collapse era that demonstrate how people lived.",
            objectives: [
                "Recover intact household appliances from abandoned apartments",
                "Find pre-collapse entertainment devices from a shopping mall",
                "Salvage office equipment from a corporate headquarters",
                "Collect personal items from a preserved residential block",
                "Transport all artifacts safely back to the Historical Society's vault"
            ],
            reward: {
                name: "Preservation Field",
                description: "A device that creates a protective field around fragile objects.",
                effect: "Reduces damage to carried items and equipment",
                icon: 83
            },
            humor: "The most puzzling artifact to future historians is a plastic banana slicer, which leads to an entire academic conference debating its religious significance, with one faction arguing it was clearly used in ritual sacrifice and another insisting it was a sacred object representing the 'divine geometry of convenience.'"
        },
        {
            name: "Corporate Archives",
            description: "Infiltrate the MegaCorps to uncover the truth about their role in the collapse.",
            objectives: [
                "Hack into NeuraTech's classified historical database",
                "Steal physical records from OmniCorp's secure storage",
                "Photograph secret murals in Armatek's executive level",
                "Download Vitalix's pre-collapse research logs",
                "Escape with the evidence before corporate security catches you"
            ],
            reward: {
                name: "Truth Seeker",
                description: "A device that can detect falsehoods and manipulated information.",
                effect: "Highlights inconsistencies and lies in documents and dialogue",
                icon: 83
            },
            humor: "The 'shocking truth' about the collapse turns out to include evidence that one CEO accidentally triggered the apocalypse by spilling coffee on the wrong console while trying to take a selfie with the doomsday button for his corporate social media account, which was captioned 'Just another Monday at the office! #WorldDomination #CorpLife.'"
        },
        {
            name: "Living Museum",
            description: "Help establish a public museum to educate wasteland citizens about their history.",
            objectives: [
                "Secure a suitable building for the museum",
                "Set up displays with recovered artifacts and information",
                "Create interactive exhibits using salvaged technology",
                "Develop educational materials for visitors",
                "Defend the museum from corporate saboteurs during the grand opening"
            ],
            reward: {
                name: "Historian's Lens",
                description: "A monocle that reveals the history and origin of objects you observe.",
                effect: "Provides detailed information about items, locations, and people",
                icon: 144
            },
            humor: "The most popular exhibit turns out to be the 'Pre-Collapse Bathroom Experience,' where visitors wait in line to use a functioning toilet with actual toilet paper, with many younger wasteland residents believing it's a fictional luxury invented by the museum until they try it themselves."
        }
    ],
    finalReward: {
        name: "Keeper of History",
        description: "Recognition as an official historian of the wasteland.",
        effect: "Access to the Historical Society's secret bunker containing preserved pre-collapse technology",
        icon: 145
    }
};

module.exports = wastelandHistorians;
