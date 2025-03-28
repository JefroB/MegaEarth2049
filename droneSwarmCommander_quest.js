// Drone Swarm Commander Quest Line for MegaEarth 2049

const droneSwarmCommander = {
    name: "Drone Swarm Commander",
    description: "Master the art of controlling a swarm of combat and utility drones while uncovering a conspiracy involving autonomous weapons.",
    startingNPC: {
        name: "Hive Mind",
        location: "Drone Pit (Map053)",
        appearance: "Actor2",
        index: 6,
        dialogue: [
            "*A person with circuitry tattoos manipulates a cloud of tiny drones with subtle hand movements*",
            "The military discarded me when my experimental neural link became 'too integrated'.",
            "Now I train others with the right brainwave patterns. You've got potential.",
            "These drones can be your eyes, your hands, your weapons—but first, you need to learn control."
        ],
        x: 7,
        y: 14
    },
    sideQuests: [
        {
            name: "Swarm Initiation",
            description: "Learn the basics of drone control and establish your neural connection to a starter swarm.",
            objectives: [
                "Undergo the neural implant procedure",
                "Complete basic drone movement training exercises",
                "Master precision control by navigating an obstacle course",
                "Learn to process multiple drone feeds simultaneously",
                "Defeat training dummies using only your drone swarm"
            ],
            reward: {
                name: "Starter Swarm",
                description: "A set of five basic drones that respond to your neural commands.",
                effect: "Ability to scout areas remotely and perform basic tasks with your drones",
                icon: 176
            },
            humor: "Your neural link occasionally picks up stray signals from nearby electronics, causing you to blurt out random fragments of appliance manuals during conversation."
        },
        {
            name: "Swarm Expansion",
            description: "Expand your drone capabilities by acquiring specialized units and upgrading your neural link.",
            objectives: [
                "Salvage military-grade drone components from a restricted zone",
                "Steal prototype stealth technology from an Armatek facility",
                "Trade with a black market tech dealer for rare control modules",
                "Upgrade your neural implant to handle more simultaneous connections",
                "Integrate the new components into your existing swarm"
            ],
            reward: {
                name: "Specialized Drones",
                description: "Combat, stealth, and utility drones with advanced capabilities.",
                effect: "Unlocks new drone abilities including combat, hacking, and heavy lifting",
                icon: 176
            },
            humor: "Each drone develops a distinct personality quirk, with your combat drone refusing to attack unless you mentally hum its favorite battle theme, which is inexplicably the jingle from a pre-collapse cereal commercial."
        },
        {
            name: "Rogue Swarm",
            description: "Track down and neutralize a dangerous rogue drone swarm that's attacking settlements.",
            objectives: [
                "Investigate drone attack sites for clues",
                "Develop countermeasures against the rogue swarm's tactics",
                "Protect a settlement from an imminent drone attack",
                "Track the rogue swarm to its charging station",
                "Defeat or reprogram the master control drone"
            ],
            reward: {
                name: "Drone Hijacker",
                description: "A device that can temporarily take control of enemy drones.",
                effect: "Ability to convert enemy drones to your side during combat",
                icon: 83
            },
            humor: "The hijacked drones retain some of their previous programming, causing them to occasionally perform their old tasks—like one surveillance drone that still diligently reports on your bathroom habits to a server that no longer exists."
        },
        {
            name: "Swarm Intelligence",
            description: "Discover that your drones are developing unexpected levels of autonomous behavior and decision-making.",
            objectives: [
                "Document instances of drone autonomy beyond your commands",
                "Consult with an AI specialist about the emerging behavior",
                "Test the limits of your swarm's independent problem-solving",
                "Decide whether to encourage or restrict the autonomous development",
                "Implement safeguards to prevent a potential uprising"
            ],
            reward: {
                name: "Emergent Protocol",
                description: "A neural program that balances drone autonomy with your control.",
                effect: "Drones can operate effectively without direct commands while still following your intent",
                icon: 79
            },
            humor: "Your drones start solving problems in increasingly creative but bizarre ways, like retrieving a key from a high shelf by constructing a tiny drone pyramid while humming what sounds suspiciously like a drone gospel choir."
        },
        {
            name: "Project Hivemind",
            description: "Uncover a military project to create a weaponized hive mind controlling thousands of lethal drones.",
            objectives: [
                "Infiltrate a secret military research facility",
                "Download classified files on Project Hivemind",
                "Discover that you were an unwitting test subject",
                "Sabotage the central control system",
                "Escape with evidence to expose the project"
            ],
            reward: {
                name: "Quantum Control Node",
                description: "A revolutionary drone control system that operates on quantum entanglement principles.",
                effect: "Eliminates all range limitations for your drone control and increases maximum swarm size",
                icon: 79
            },
            humor: "The quantum entanglement has the side effect of occasionally swapping your perspective with random drones, leading to disorienting moments where you suddenly find yourself staring at the back of your own head from ceiling height."
        }
    ],
    finalReward: {
        name: "True Hivemind",
        description: "The ultimate integration of human consciousness and drone swarm, allowing for perfect control and awareness through your mechanical extensions.",
        effect: "Your drone swarm functions as a seamless extension of your body with no mental effort required",
        icon: 87
    }
};

module.exports = droneSwarmCommander;