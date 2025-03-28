// Virtual Reality Addiction Quest Line for MegaEarth 2049

const virtualRealityAddiction = {
    name: "Virtual Reality Addiction",
    description: "Help people trapped in addictive virtual reality simulations while being tempted by the allure of digital paradise yourself.",
    startingNPC: {
        name: "Iris Disconnect",
        location: "Mindscape Clinic (Map031)",
        appearance: "Actor1",
        index: 6,
        dialogue: [
            "*A woman with VR implant scars stares at you with unnervingly steady eyes*",
            "My brother's been jacked in for three weeks. The clinic says it's 'normal adjustment'.",
            "Nothing's normal about living in a fantasy while your body wastes away.",
            "I need someone who can go in after him. Someone who can resist the pull of paradise."
        ],
        x: 15,
        y: 7
    },
    sideQuests: [
        {
            name: "Digital Diving",
            description: "Enter the virtual world and learn to navigate its reality-bending physics.",
            objectives: [
                "Acquire a black market neural interface compatible with the VR system",
                "Undergo the connection procedure at the Mindscape Clinic",
                "Complete the VR orientation program without getting trapped in loops",
                "Learn to distinguish between real sensory input and digital fabrications",
                "Establish a mental anchor to prevent total immersion"
            ],
            reward: {
                name: "Reality Tether",
                description: "A device that helps maintain your connection to the real world while in virtual reality.",
                effect: "Ability to detect illusions and fabrications in both virtual and real environments",
                icon: 79
            },
            humor: "The reality tether occasionally glitches and makes you question if mundane objects are real, leading to existential standoffs with particularly suspicious-looking toasters."
        },
        {
            name: "Paradise Program",
            description: "Explore the main VR environment where most addicts are trapped and discover its secrets.",
            objectives: [
                "Navigate through the five districts of the virtual paradise",
                "Identify the psychological hooks that keep users addicted",
                "Meet with digital representations of other trapped users",
                "Discover the identity of the paradise architect",
                "Find Iris's brother in his personalized fantasy scenario"
            ],
            reward: {
                name: "Digital Cartographer",
                description: "A mental enhancement that allows you to map and remember complex digital spaces.",
                effect: "Reveals hidden paths and shortcuts in complex environments, both virtual and real",
                icon: 102
            },
            humor: "The digital cartographer also maps your own thought processes, creating embarrassingly detailed visualizations of your train of thought whenever you get distracted by something trivial."
        },
        {
            name: "Extraction Protocol",
            description: "Attempt to extract Iris's brother from his personal paradise.",
            objectives: [
                "Convince her brother that he's living in a simulation",
                "Overcome the system's attempts to keep him engaged",
                "Guide him to a digital extraction point",
                "Defend against security programs trying to stop the extraction",
                "Return to the real world with (or without) him"
            ],
            reward: {
                name: "Firewall Mind",
                description: "Mental protection against digital manipulation and persuasion.",
                effect: "Immunity to mind control effects and increased resistance to persuasion attempts",
                icon: 79
            },
            humor: "The firewall is so effective that it also blocks out your own attempts at self-deception, forcing you to acknowledge uncomfortable truths like exactly how long it's been since you last cleaned your living space."
        },
        {
            name: "System Corruption",
            description: "Discover that the VR system is being used for more than just entertainment.",
            objectives: [
                "Investigate anomalies in the paradise program's code",
                "Uncover evidence of data mining from users' subconscious",
                "Track the flow of harvested data to corporate servers",
                "Identify what the corporation is using the data for",
                "Gather evidence for potential legal action"
            ],
            reward: {
                name: "Subconscious Encryption",
                description: "A mental technique that protects your deepest thoughts from external scanning.",
                effect: "Prevents mind reading and memory extraction by technological or psychic means",
                icon: 83
            },
            humor: "The encryption is so thorough that you sometimes can't remember your own secrets, leading to moments where you frantically try to recall your own passwords while muttering 'I made it impossible for anyone to know this, especially me!'"
        },
        {
            name: "Reality Check",
            description: "Confront the corporation behind the addictive VR system.",
            objectives: [
                "Infiltrate the corporate headquarters",
                "Locate the server room containing the paradise program",
                "Upload a modification that makes users aware they're in VR",
                "Escape the building during the resulting chaos",
                "Deal with the moral implications of potentially destroying people's digital happiness"
            ],
            reward: {
                name: "Dual Consciousness",
                description: "The ability to maintain awareness in both virtual and real worlds simultaneously.",
                effect: "Can operate in VR without disconnecting from reality, effectively multitasking across dimensions",
                icon: 79
            },
            humor: "Dual consciousness sounds great until you realize you now have twice as many awkward social interactions to overthink, and your embarrassing memories now play on repeat in picture-in-picture mode."
        }
    ],
    finalReward: {
        name: "Digital Enlightenment",
        description: "The ability to perceive the digital underpinnings of modern reality and manipulate them to your advantage.",
        effect: "Can see and interact with digital systems without specialized equipment and can briefly manipulate reality using simulation principles",
        icon: 87
    }
};

module.exports = virtualRealityAddiction;