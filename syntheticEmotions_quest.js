// Synthetic Emotions Quest Line for MegaEarth 2049

const syntheticEmotions = {
    name: "Synthetic Emotions",
    description: "Investigate a new drug that allows people to experience artificial emotions, and the corporation that's using it for social control.",
    startingNPC: {
        name: "Dr. Feelgood",
        location: "Underground Clinic (Map039)",
        appearance: "Actor2",
        index: 7,
        dialogue: [
            "*A nervous-looking doctor glances over their shoulder while preparing an injection*",
            "You've heard of EmotiCorp's 'mood stabilizers,' right? Government-approved emotional regulation.",
            "What they don't tell you is they're using them to flatten affect, make people compliant.",
            "I've developed an alternative—SynthFeel. It lets people experience the full spectrum again. Want to help distribute it?"
        ],
        x: 5,
        y: 8
    },
    sideQuests: [
        {
            name: "Emotional Spectrum",
            description: "Test different synthetic emotions and document their effects.",
            objectives: [
                "Experience the basic synthetic emotion package under supervision",
                "Document the physiological effects of each emotion",
                "Test the duration and intensity controls",
                "Identify potential side effects and risks",
                "Help refine the formula based on your experiences"
            ],
            reward: {
                name: "Emotion Sampler",
                description: "A kit containing small doses of various synthetic emotions.",
                effect: "Ability to temporarily boost specific emotional states for gameplay benefits",
                icon: 176
            },
            humor: "The synthetic version of nostalgia has the unexpected side effect of making you intensely sentimental about things you've never actually experienced, leading to you tearfully reminiscing about your childhood on Mars despite having never left Earth."
        },
        {
            name: "Underground Distribution",
            description: "Help establish a distribution network for SynthFeel to those who need emotional freedom.",
            objectives: [
                "Identify communities most affected by EmotiCorp's control",
                "Establish safe distribution points in different districts",
                "Recruit trustworthy distributors who won't abuse the product",
                "Create a secure communication system for the network",
                "Avoid detection by EmotiCorp security forces"
            ],
            reward: {
                name: "Emotional Camouflage",
                description: "A device that masks your emotional state from EmotiCorp scanners.",
                effect: "Ability to appear emotionally neutral in situations where emotions are monitored",
                icon: 144
            },
            humor: "The emotional camouflage works too well in social situations, giving you the perfect poker face but making you appear so emotionally blank that people keep asking if you're feeling alright while slowly backing away."
        },
        {
            name: "Corporate Infiltration",
            description: "Infiltrate EmotiCorp to discover their true plans for emotional control.",
            objectives: [
                "Secure a position as a low-level EmotiCorp employee",
                "Gain access to restricted research areas",
                "Steal classified documents about Project Harmony",
                "Plant monitoring devices in executive offices",
                "Escape with the evidence before your cover is blown"
            ],
            reward: {
                name: "Emotional Override",
                description: "A device that can temporarily disable EmotiCorp emotional control implants.",
                effect: "Can free EmotiCorp subjects from emotional suppression and cause security systems to malfunction",
                icon: 83
            },
            humor: "The override device works by flooding the target with every emotion simultaneously, which is effective but leads to freed subjects experiencing what they describe as 'feeling like a soap opera character who just discovered they're pregnant with their amnesiac evil twin's baby while also winning the lottery.'"
        },
        {
            name: "Emotional Fallout",
            description: "Deal with unexpected consequences as people struggle with newly unleashed emotions.",
            objectives: [
                "Establish support groups for people experiencing emotional overload",
                "Develop protocols for safe emotional reintegration",
                "Help a prominent citizen who's having a public emotional breakdown",
                "Prevent violence from those overwhelmed by anger or fear",
                "Create a balanced approach to emotional freedom"
            ],
            reward: {
                name: "Emotional Stabilizer",
                description: "A non-suppressive method to help manage overwhelming emotions.",
                effect: "Ability to calm emotional situations and prevent emotional damage",
                icon: 72
            },
            humor: "The stabilizer has a 'suggested emotional response' feature that provides hilariously inappropriate recommendations, like suggesting 'mild amusement' as the appropriate response to narrowly escaping death or 'polite interest' during passionate romantic encounters."
        },
        {
            name: "Project Harmony",
            description: "Stop EmotiCorp's plan to release a city-wide emotional control agent through the water supply.",
            objectives: [
                "Analyze the stolen Project Harmony documents",
                "Locate the water treatment facility where the agent will be deployed",
                "Develop a neutralizing agent for the emotional suppressant",
                "Infiltrate the facility on the night of deployment",
                "Replace the control agent with your neutralizer"
            ],
            reward: {
                name: "Emotional Sovereignty",
                description: "A permanent protection against all forms of emotional manipulation.",
                effect: "Complete immunity to emotional control and manipulation attempts",
                icon: 79
            },
            humor: "The emotional sovereignty protection is so effective that you become immune to your own attempts at emotional self-manipulation, making it impossible to convince yourself that you 'don't mind' or 'aren't bothered' by things, forcing you into uncomfortable honesty with yourself at all times."
        }
    ],
    finalReward: {
        name: "Emotional Mastery",
        description: "The perfect balance of emotional freedom and control, allowing you to experience the full spectrum of emotions while maintaining complete agency over your emotional state.",
        effect: "Ability to select and modify your emotional responses to any situation for optimal outcomes",
        icon: 87
    }
};

module.exports = syntheticEmotions;