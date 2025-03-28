// Drone Swarm Commander Quest Line for MegaEarth 2049

const droneSwarmCommander = {
    name: "Drone Swarm Commander",
    description: "Help a tech genius who can control swarms of repurposed drones for both protection and exploration.",
    startingNPC: {
        name: "Hive Mind",
        location: "Timbuc 2 (Map002)",
        appearance: "Actor1",
        index: 4,
        dialogue: [
            "*A person with cybernetic implants sits surrounded by tiny hovering drones that move in perfect synchronization*",
            "My little ones see everything, reach everywhere. They are my eyes, my hands, my voice.",
            "I've reprogrammed corporate security drones to serve me instead. With enough of them, we could change the wasteland.",
            "But I need someone with your skills to help expand my swarm and unlock their true potential. Interested?"
        ],
        x: 9,
        y: 8
    },
    sideQuests: [
        {
            name: "Drone Salvage",
            description: "Recover damaged and discarded drones from dangerous locations to expand the swarm.",
            objectives: [
                "Infiltrate an OmniCorp security drone disposal site",
                "Recover intact drone cores from a crashed corporate transport",
                "Salvage specialized sensor arrays from abandoned surveillance posts",
                "Extract power cells from active but malfunctioning drones",
                "Return all salvaged components to Hive Mind"
            ],
            reward: {
                name: "Drone Beacon",
                description: "A device that can call a small scout drone to your location.",
                effect: "Allows remote scouting of areas up to 100 meters away",
                icon: 83
            },
            humor: "One of the 'malfunctioning' drones you recover has developed a bizarre glitch where it believes it's a tiny flying cat, meowing electronically and attempting to rub against people's legs mid-air, which Hive Mind decides to keep as-is because 'it's excellent for distracting guards.'"
        },
        {
            name: "Swarm Intelligence",
            description: "Help upgrade the collective intelligence of the drone swarm with advanced algorithms.",
            objectives: [
                "Hack into NeuraTech's AI research database",
                "Steal a prototype swarm coordination algorithm",
                "Test the algorithm in controlled conditions",
                "Debug unexpected emergent behaviors",
                "Implement the final version across the entire swarm"
            ],
            reward: {
                name: "Micro-Swarm",
                description: "A personal collection of tiny drones that follow your commands.",
                effect: "Can perform simple tasks like retrieving small objects or distracting enemies",
                icon: 83
            },
            humor: "The 'unexpected emergent behaviors' include the drones spontaneously arranging themselves into elaborate aerial dance formations whenever they hear music, with a particular preference for pre-collapse disco that causes them to form a perfect floating disco ball that refuses to do anything else until the song ends."
        },
        {
            name: "Drone Specialization",
            description: "Develop specialized drone types for different tasks and situations.",
            objectives: [
                "Design and build combat-focused drones with non-lethal weapons",
                "Create medical drones capable of delivering first aid",
                "Develop infiltration drones with stealth capabilities",
                "Construct heavy-duty drones for transport and salvage",
                "Test each drone type in field conditions"
            ],
            reward: {
                name: "Drone Customizer",
                description: "A toolkit that allows on-the-fly modification of drone capabilities.",
                effect: "Can temporarily convert drones between different specializations",
                icon: 83
            },
            humor: "The medical drones develop an overzealous approach to healthcare, attempting to diagnose and treat everyone they encounter, leading to situations where people with minor scratches are suddenly swarmed by tiny drones applying excessive amounts of bandages while electronically reciting bedside manner phrases in soothing voices."
        },
        {
            name: "Corporate Countermeasures",
            description: "Develop methods to protect the swarm from corporate anti-drone technologies.",
            objectives: [
                "Infiltrate an OmniCorp research facility developing anti-drone weapons",
                "Steal the schematics for their drone jammers and EMPs",
                "Create countermeasures based on the stolen data",
                "Test the protections against actual corporate anti-drone systems",
                "Implement the successful countermeasures across the entire swarm"
            ],
            reward: {
                name: "Signal Scrambler",
                description: "A device that prevents drones from being hacked or jammed.",
                effect: "Protects all allied electronic devices from enemy control",
                icon: 83
            },
            humor: "Your 'brilliant' countermeasure involves tiny tinfoil hats for each drone, which surprisingly works perfectly due to special conductive material in the foil, leading to the absurd sight of a serious corporate security team being overwhelmed by a swarm of tiny robots wearing shiny hats while their jammers fail completely."
        },
        {
            name: "Hive Uprising",
            description: "Help Hive Mind liberate drone production facilities to exponentially grow the swarm.",
            objectives: [
                "Infiltrate the main OmniCorp drone manufacturing plant",
                "Override the production line to create loyal drones",
                "Defend the facility from corporate security response",
                "Extract the newly created drone army",
                "Establish a hidden base for the expanded swarm"
            ],
            reward: {
                name: "Queen Drone",
                description: "A special command drone that can direct others with enhanced efficiency.",
                effect: "Improves the effectiveness of all drone-based abilities",
                icon: 83
            },
            humor: "The manufacturing plant's AI misinterprets your production override and creates a batch of drones with exaggerated personalities, including one that speaks entirely in dramatic movie quotes, another that tells dad jokes while completing tasks, and a group that can only communicate through interpretive movement, forming a bizarre but surprisingly effective aerial theater troupe."
        }
    ],
    finalReward: {
        name: "Swarm Commander",
        description: "The ability to control and direct drone swarms with expert precision.",
        effect: "Access to a personal drone swarm that can be deployed for combat, exploration, or utility purposes",
        icon: 87
    }
};

module.exports = droneSwarmCommander;
