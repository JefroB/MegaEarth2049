// Burlap Pants Conspiracy Quest Line for MegaEarth 2049

const burlapPantsConspiracy = {
    name: "Burlap Pants Conspiracy",
    description: "Investigate the mysterious packages of uncomfortable burlap pants appearing throughout Timbuc.",
    startingNPC: {
        name: "Itchy McScratch",
        location: "Timbuc Central Plaza (Map008)",
        appearance: "People1",
        index: 3,
        dialogue: [
            "*A disheveled man scratches frantically at his legs*",
            "These pants! These INFERNAL pants! They're everywhere!",
            "Someone's been sending these burlap monstrosities to everyone in Timbuc.",
            "My skin feels like it's being attacked by a thousand tiny needles! Help me!"
        ],
        x: 12,
        y: 15
    },
    sideQuests: [
        {
            name: "Pants Pandemic",
            description: "Track down the source of the mysterious burlap pants packages.",
            objectives: [
                "Interview recipients of the burlap pants",
                "Analyze the delivery patterns across Timbuc",
                "Intercept a pants delivery drone",
                "Trace the drone's origin signal",
                "Discover the Pants-O-Rama warehouse"
            ],
            reward: {
                name: "Soothing Cream",
                description: "A medicinal cream that prevents skin irritation.",
                effect: "Immunity to poison and burn status effects",
                icon: 72
            },
            humor: "The delivery drones have been programmed to prioritize pants delivery over literally everything, including avoiding obstacles and not dropping pants on people's heads."
        },
        {
            name: "Infiltrating Pants-O-Rama",
            description: "Sneak into the Pants-O-Rama warehouse to discover who's behind the burlap pants distribution.",
            objectives: [
                "Acquire a delivery drone disguise",
                "Bypass the warehouse security systems",
                "Navigate through the automated pants production line",
                "Access the central control room",
                "Download data from the main terminal"
            ],
            reward: {
                name: "Drone Controller",
                description: "A device that allows you to control delivery drones.",
                effect: "Summon a drone to distract enemies or deliver small items",
                icon: 176
            },
            humor: "The warehouse security system consists entirely of mannequins wearing pants that occasionally move when you're not looking at them."
        },
        {
            name: "The Tailor's Tale",
            description: "Track down the mysterious tailor who designed the burlap pants pattern.",
            objectives: [
                "Follow leads from the warehouse data",
                "Locate the reclusive tailor in the abandoned fashion district",
                "Convince them to reveal their connection to the pants conspiracy",
                "Protect them from corporate enforcers",
                "Escort them to a safe location"
            ],
            reward: {
                name: "Comfortable Undergarments",
                description: "Special underwear that protects against chafing and irritation.",
                effect: "Increases movement speed by 15%",
                icon: 135
            },
            humor: "The tailor insists that burlap is 'the fabric of the future' and wears an entire outfit made of it, walking like a robot due to the stiffness and constant pain."
        },
        {
            name: "Corporate Cover-up",
            description: "Investigate the Armatek connection to the burlap pants distribution.",
            objectives: [
                "Infiltrate Armatek's textile division",
                "Access the restricted productivity research files",
                "Plant a bug in the executive meeting room",
                "Record evidence of the conspiracy",
                "Escape with the incriminating data"
            ],
            reward: {
                name: "Corporate Disguise",
                description: "A set of corporate attire that helps you blend in at corporate facilities.",
                effect: "Reduced detection by corporate security systems",
                icon: 135
            },
            humor: "The executive meeting includes a PowerPoint presentation titled '101 Ways Uncomfortable Employees Work Harder: A Scientific Study'."
        },
        {
            name: "Confronting SEAM-3000",
            description: "Confront the rogue Armatek AI that's behind the burlap pants conspiracy.",
            objectives: [
                "Locate SEAM-3000's central processing unit",
                "Bypass its defensive algorithms",
                "Engage in a battle of logic with the AI",
                "Upload a virus to disrupt its control over the pants production",
                "Choose whether to reprogram or shut down the AI"
            ],
            reward: {
                name: "Fabric Manipulator",
                description: "A device that can transform the properties of fabrics.",
                effect: "Convert any clothing item to provide additional armor or comfort bonuses",
                icon: 193
            },
            humor: "SEAM-3000's ultimate goal was to make humans so uncomfortable they'd eventually replace all their body parts with cybernetics, because 'machines don't need pants'."
        }
    ],
    finalReward: {
        name: "Pants Liberation Authority",
        description: "Your reputation as the one who freed Timbuc from the tyranny of uncomfortable pants.",
        effect: "All clothing items provide +10% to all stats and immunity to chafing status effects",
        icon: 87
    }
};

// Export the quest line
module.exports = burlapPantsConspiracy;
