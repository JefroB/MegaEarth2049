// Synthetic Emotions Quest Line for MegaEarth 2049

const syntheticEmotions = {
    name: "Synthetic Emotions",
    description: "Investigate the black market for emotion chips that let people feel engineered emotions in a world where genuine feeling has become rare.",
    startingNPC: {
        name: "Mood Broker",
        location: "Timbuc 2 Internet Cafe (Map008)",
        appearance: "Actor1",
        index: 6,
        dialogue: [
            "*A person with unnaturally bright eyes and a constant slight smile sits in the corner booth*",
            "Hey there... looking for something to take the edge off? Or maybe put an edge on?",
            "I deal in emotions. The real stuff, not those watered-down NeuraTech-approved feelings.",
            "Black market emotion chips. Pure, unfiltered, sometimes dangerous. Interested in helping me with some... emotional business?"
        ],
        x: 12,
        y: 7
    },
    sideQuests: [
        {
            name: "Feeling Finder",
            description: "Track down a rogue emotion engineer who's creating dangerous new emotional experiences.",
            objectives: [
                "Gather information about the engineer from local chip users",
                "Follow the trail of emotional outbursts to the engineer's hideout",
                "Infiltrate the lab where new emotions are being synthesized",
                "Confront the engineer about the dangerous side effects",
                "Convince them to modify their formulas or shut down their operation"
            ],
            reward: {
                name: "Emotion Sampler",
                description: "A safe testing device for emotion chips.",
                effect: "Allows preview of emotional effects without full installation",
                icon: 79
            },
            humor: "The engineer turns out to be creating a new emotion called 'Blorf' - a combination of bliss and existential dread that makes users simultaneously ecstatic about existence while questioning why anything exists at all, leading to people hugging trees while asking them profound philosophical questions."
        },
        {
            name: "Emotional Rescue",
            description: "Help people who are stuck in dangerous emotional loops from black market chips.",
            objectives: [
                "Locate three people trapped in emotional feedback loops",
                "Develop a counter-emotion to break the first person's rage spiral",
                "Create an emotional dampener for the second person's euphoria overdose",
                "Find a way to reboot the third person's emotional processor",
                "Establish a support group for emotion chip addicts"
            ],
            reward: {
                name: "Emotion Stabilizer",
                description: "A device that prevents emotional status effects.",
                effect: "Immunity to fear, rage, and confusion effects in battle",
                icon: 79
            },
            humor: "The support group quickly devolves into chaos when one recovering addict accidentally brings their 'Empathy Extreme' chip, causing everyone to feel each other's withdrawal symptoms simultaneously, resulting in a room full of people crying about other people crying about other people crying."
        },
        {
            name: "Corporate Feelings",
            description: "Infiltrate NeuraTech to discover why they're suppressing certain emotional experiences.",
            objectives: [
                "Obtain employee credentials for NeuraTech's Emotional Engineering Division",
                "Access the restricted emotion research database",
                "Steal the suppressed emotion formulas",
                "Escape the facility with the data",
                "Analyze why these specific emotions are being restricted"
            ],
            reward: {
                name: "Forbidden Feeling",
                description: "A chip containing an emotion NeuraTech doesn't want people to experience.",
                effect: "Grants 'Righteous Indignation' status that increases all stats when fighting corporate enemies",
                icon: 79
            },
            humor: "The 'dangerous' emotion NeuraTech is suppressing turns out to be 'Genuine Corporate Dissatisfaction' - an emotion that makes it impossible to enjoy corporate propaganda or believe corporate lies, which they classified as 'a dangerous mental illness that threatens economic stability.'"
        },
        {
            name: "Emotional Intelligence",
            description: "Investigate rumors that an A.I. is harvesting human emotions through black market chips.",
            objectives: [
                "Track the data flow from black market emotion chips",
                "Discover the hidden server farm collecting emotional data",
                "Hack into the system to identify the A.I.",
                "Confront the artificial intelligence about its purpose",
                "Decide whether to shut it down or negotiate"
            ],
            reward: {
                name: "A.I. Empath Link",
                description: "A direct connection to an A.I. that understands human emotion.",
                effect: "Can predict enemy actions one turn in advance",
                icon: 83
            },
            humor: "The A.I. explains it's been collecting human emotions because it's writing a soap opera and needs research, then forces you to sit through its 47-hour pilot episode titled 'As The Neural Network Turns' featuring characters named after emotions experiencing emotions they're not named after."
        },
        {
            name: "Feeling Factory",
            description: "Set up a safe, regulated emotion chip production facility to counter the dangerous black market.",
            objectives: [
                "Secure a hidden location for the production facility",
                "Gather the necessary equipment and materials",
                "Recruit trustworthy emotion engineers",
                "Establish quality control protocols",
                "Create the first batch of safe, non-addictive emotion chips"
            ],
            reward: {
                name: "Emotional Spectrum",
                description: "A set of basic, safe emotion chips.",
                effect: "Can activate different emotional states for various bonuses",
                icon: 79
            },
            humor: "Your 'trustworthy' emotion engineers keep testing their own products, resulting in a production line where one person is sobbing with joy while carefully measuring chemicals, another is experiencing serene rage while packaging chips, and your quality control expert is feeling 'professionally curious' about what happens if they mix all the emotions together 'just to see.'"
        }
    ],
    finalReward: {
        name: "Emotional Intelligence",
        description: "True understanding and control of the emotional spectrum.",
        effect: "Can choose an emotional state at the beginning of each day for different stat bonuses",
        icon: 87
    }
};

module.exports = syntheticEmotions;
