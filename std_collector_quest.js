// STD Collector Quest Line for MegaEarth 2049

const stdCollector = {
    name: "STD Collector",
    description: "Help Jack the Smuggler collect rare and exotic STDs for 'research purposes' and bribing officials.",
    startingNPC: {
        name: "Jack the Smuggler",
        location: "Timbuc Spaceport (Map042)",
        appearance: "Actor1",
        index: 0,
        dialogue: [
            "*A roguish captain leans against his ship, looking shifty*",
            "Hey there! I've got a... unique business opportunity for you.",
            "I need to collect some rare, uh, 'biological samples' for research.",
            "And by 'research,' I mean bribing spaceport officials who collect exotic diseases."
        ],
        x: 20,
        y: 12
    },
    sideQuests: [
        {
            name: "Patient Zero",
            description: "Track down the origin of a rare mutated STD in Timbuc's underground clubs.",
            objectives: [
                "Interview Jen the Priest/Medic about recent outbreaks",
                "Infiltrate exclusive clubs in the entertainment district",
                "Identify the carrier using medical scanning equipment",
                "Convince them to provide a sample voluntarily",
                "Deliver the sample to Jack for analysis"
            ],
            reward: {
                name: "Medical Scanner",
                description: "A device that can detect diseases and biological anomalies.",
                effect: "Reveals hidden biological hazards and enemy weaknesses",
                icon: 79
            },
            humor: "The carrier is completely asymptomatic but leaves a trail of glowing footprints visible only under blacklight, making the clubs look like a connect-the-dots puzzle."
        },
        {
            name: "Interstellar Infection",
            description: "Travel to Planet Ork to collect a rare alien STD that's highly valued by collectors.",
            objectives: [
                "Secure passage on Jack's ship to Planet Ork",
                "Navigate the planet's red light district",
                "Find the alien brothel rumored to host the infection",
                "Negotiate with the establishment's owner for a sample",
                "Return to Jack with the exotic specimen"
            ],
            reward: {
                name: "Alien Antibodies",
                description: "Antibodies derived from alien biology that enhance your immune system.",
                effect: "Immunity to common diseases and poisons",
                icon: 72
            },
            humor: "The alien STD causes victims to temporarily speak in rhyming couplets, which the aliens consider a mark of sophistication and cultural refinement."
        },
        {
            name: "Corporate Bioweapon",
            description: "Infiltrate Vitalix Corporation to steal a sample of their experimental designer STD.",
            objectives: [
                "Obtain a Vitalix employee disguise",
                "Infiltrate their bioweapons research facility",
                "Bypass the laboratory security systems",
                "Steal a sample of 'Project Cupid's Arrow'",
                "Escape without being infected or caught"
            ],
            reward: {
                name: "Hazmat Suit",
                description: "A high-tech suit that protects against biological and chemical hazards.",
                effect: "Immunity to environmental damage and disease-based attacks",
                icon: 135
            },
            humor: "The designer STD makes victims fall temporarily in love with inanimate objects, which Vitalix markets as 'a solution to workplace romance issues'."
        },
        {
            name: "Digital Virus",
            description: "Collect a unique STD that somehow affects both humans and cybernetic implants.",
            objectives: [
                "Research reports of malfunctioning implants with unusual symptoms",
                "Track the infection to a virtual reality brothel",
                "Identify the method of transmission between digital and biological systems",
                "Obtain a sample without connecting to the infected system",
                "Deliver the specimen to Jack in a secure container"
            ],
            reward: {
                name: "Neural Firewall",
                description: "A cybernetic enhancement that protects against digital intrusions.",
                effect: "Immunity to hacking attempts and digital status effects",
                icon: 79
            },
            humor: "The digital-biological STD causes both humans and machines to randomly play outdated pop songs at inappropriate moments, which is actually how it spreads."
        },
        {
            name: "The Ultimate Collection",
            description: "Help Jack create a comprehensive catalog of wasteland STDs for a mysterious client.",
            objectives: [
                "Organize all collected samples in specialized containers",
                "Document the symptoms and effects of each disease",
                "Create a visually appealing presentation (with safe handling procedures)",
                "Meet with the mysterious collector at a neutral location",
                "Complete the transaction without catching anything yourself"
            ],
            reward: {
                name: "Universal Prophylactic",
                description: "A high-tech personal protection device against all known diseases.",
                effect: "Complete immunity to disease status effects",
                icon: 72
            },
            humor: "The mysterious collector turns out to be a hypochondriac who never leaves their hermetically sealed bunker and collects diseases like others collect stamps - to look at but never touch."
        }
    ],
    finalReward: {
        name: "Plague Doctor",
        description: "Your expertise in exotic diseases makes you both feared and respected throughout the wasteland.",
        effect: "Ability to weaponize diseases against enemies and cure allies of any affliction",
        icon: 72
    }
};

// Export the quest line
module.exports = stdCollector;
