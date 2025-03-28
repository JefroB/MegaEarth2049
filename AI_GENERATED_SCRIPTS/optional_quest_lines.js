// Optional Quest Lines for MegaEarth 2049
// This file contains quest lines, each with 4+ side quests

const digitalArchaeology = {
    name: "Digital Archaeology",
    description: "Uncover the lost digital history of the world before the collapse.",
    startingNPC: {
        name: "Professor Bitwise",
        location: "Neo-Tokyo Archives (Map022)",
        appearance: "People1",
        index: 7,
        dialogue: [
            "*The professor is surrounded by stacks of ancient hard drives*",
            "Ah, a fellow seeker of knowledge! I'm Professor Bitwise,",
            "and I'm trying to piece together our digital history.",
            "So much was lost in the collapse... would you help me recover it?"
        ],
        x: 10,
        y: 8
    },
    sideQuests: [
        {
            name: "Data Miners",
            description: "Help Professor Bitwise recover data from ancient servers in the ruins of a data center.",
            objectives: [
                "Locate the ancient data center",
                "Power up the backup generators",
                "Defend the servers from scavengers while data transfers",
                "Return the recovered data to Professor Bitwise"
            ],
            reward: {
                name: "Neural Interface Upgrade",
                description: "A cybernetic enhancement that improves learning capabilities.",
                effect: "+10% XP gain",
                icon: 121
            },
            humor: "One of the recovered files is just 10,000 pictures of cats with funny captions."
        },
        {
            name: "Corrupted Memories",
            description: "Clean up corrupted data to reveal historical footage of pre-collapse events.",
            objectives: [
                "Collect specialized data cleaning tools",
                "Access the corrupted memory banks",
                "Run data recovery algorithms",
                "Eliminate digital viruses protecting the corruption",
                "Preview the recovered footage"
            ],
            reward: {
                name: "Holographic Projector",
                description: "A device that creates solid-light constructs to aid in battle.",
                effect: "Summons a temporary ally in combat",
                icon: 176
            },
            humor: "The 'historical footage' turns out to be mostly embarrassing reality TV shows and people falling down."
        },
        {
            name: "Ghost in the Machine",
            description: "Track down an AI that claims to be a digital copy of a pre-collapse celebrity.",
            objectives: [
                "Follow digital traces across the network",
                "Interview NPCs who have encountered the AI",
                "Set up a trap to capture the AI",
                "Determine if the AI is genuine or a scam",
                "Either expose the fraud or help the AI find a new purpose"
            ],
            reward: {
                name: "Celebrity Endorsement",
                description: "The AI celebrity vouches for you at certain vendors.",
                effect: "50% discount at entertainment and luxury vendors",
                icon: 145
            },
            humor: "The 'celebrity' AI turns out to be based on a pre-collapse influencer famous for doing absolutely nothing of value."
        },
        {
            name: "Forgotten Passwords",
            description: "Crack the passwords to access secured historical archives.",
            objectives: [
                "Collect password hints from various terminals",
                "Interview former employees of the archive",
                "Solve riddles that contain password clues",
                "Defeat the security system's AI guardian",
                "Access the secured archives"
            ],
            reward: {
                name: "Encryption Key",
                description: "A master key that can decrypt secured data storages.",
                effect: "Opens special encrypted chests found throughout the game",
                icon: 83
            },
            humor: "After all that work, one of the passwords turns out to be 'password123'."
        },
        {
            name: "Digital Time Capsule",
            description: "Assemble a complete pre-collapse entertainment library for future generations.",
            objectives: [
                "Collect music data fragments from entertainment districts",
                "Recover film data from an abandoned movie studio",
                "Download game data from a retro arcade",
                "Find literary works in a digital library",
                "Assemble the complete time capsule"
            ],
            reward: {
                name: "Vintage Entertainment System",
                description: "A fully restored pre-collapse gaming system.",
                effect: "Provides permanent stat boost when used during rest",
                icon: 189
            },
            humor: "The 'pinnacle of pre-collapse gaming' is just a device that plays a game about a plumber jumping on mushrooms."
        }
    ],
    finalReward: {
        name: "Historian's Credentials",
        description: "Official recognition as a digital historian, granting access to restricted archives.",
        effect: "Access to a secret historical area with unique equipment",
        icon: 87
    }
};

const corporateEspionage = {
    name: "Corporate Espionage",
    description: "Infiltrate and sabotage the operations of rival megacorporations.",
    startingNPC: {
        name: "Ms. Johnson",
        location: "NeoCorps Plaza (Map035)",
        appearance: "Actor1",
        index: 1,
        dialogue: [
            "*A sharply dressed woman checks over her shoulder before speaking*",
            "I represent certain... interests... that would benefit from",
            "some inside information on our competitors.",
            "Nothing illegal, of course. Just... aggressive market research."
        ],
        x: 15,
        y: 12
    },
    sideQuests: [
        {
            name: "Resume Builder",
            description: "Create a fake identity to infiltrate MegaTech Corporation.",
            objectives: [
                "Obtain a blank corporate ID card",
                "Hack the corporate database to create employee records",
                "Acquire appropriate corporate attire",
                "Attend the new employee orientation",
                "Successfully pass the security interview"
            ],
            reward: {
                name: "Corporate ID",
                description: "A forged ID card that grants access to corporate areas.",
                effect: "Access to corporate restricted areas",
                icon: 83
            },
            humor: "Your fake resume claims you were 'Time Magazine's Person of the Year,' which is technically true since they once gave it to 'Everyone'."
        },
        {
            name: "Climbing the Ladder",
            description: "Complete corporate tasks to gain trust and access to higher levels of the corporation.",
            objectives: [
                "Complete menial office tasks to establish cover",
                "Sabotage a rival employee's project",
                "Impress the department manager with a presentation",
                "Attend the corporate retreat and network with executives",
                "Receive a promotion to management"
            ],
            reward: {
                name: "Executive Access Card",
                description: "A high-level security card stolen from an executive.",
                effect: "Unlocks high-security doors throughout corporate facilities",
                icon: 83
            },
            humor: "You're awarded 'Employee of the Month' for a project you completely made up using corporate buzzwords strung together randomly."
        },
        {
            name: "Industrial Secrets",
            description: "Steal proprietary technology blueprints from the R&D department.",
            objectives: [
                "Gain access to the R&D department",
                "Distract the security guards",
                "Crack the safe containing the blueprints",
                "Replace the blueprints with fakes",
                "Escape without raising alarms"
            ],
            reward: {
                name: "Prototype Gadget",
                description: "An experimental device stolen from the R&D lab.",
                effect: "Unique utility item with multiple functions",
                icon: 176
            },
            humor: "The revolutionary technology turns out to be a slightly improved coffee maker that uses 'blockchain' and 'AI' to brew coffee that tastes exactly the same."
        },
        {
            name: "Whistleblower",
            description: "Expose corporate corruption to the public by gathering evidence and leaking it.",
            objectives: [
                "Gather evidence of illegal corporate activities",
                "Make contact with a sympathetic journalist",
                "Set up a secure communication channel",
                "Avoid corporate assassins sent to silence you",
                "Ensure the evidence is published"
            ],
            reward: {
                name: "Corporate Blackmail Data",
                description: "Sensitive information that can be leveraged against corporate executives.",
                effect: "Can be used to get out of certain situations with corporate entities",
                icon: 87
            },
            humor: "The 'shocking exposé' gets less public attention than a viral video of a cat riding a robot vacuum."
        },
        {
            name: "Hostile Takeover",
            description: "Help orchestrate a corporate coup to replace the current CEO.",
            objectives: [
                "Gather dirt on the current CEO",
                "Rally support among board members",
                "Sabotage the CEO's major project",
                "Attend the emergency board meeting",
                "Vote to remove the CEO"
            ],
            reward: {
                name: "Corporate Shares",
                description: "Stock certificates in the newly restructured corporation.",
                effect: "Provides passive income of credits every game day",
                icon: 208
            },
            humor: "The new CEO's first action is to rename the company with an unpronounceable symbol and declare that Tuesdays are now called 'Synergy-Day'."
        }
    ],
    finalReward: {
        name: "Corporate Overlord",
        description: "Your reputation as a corporate fixer makes security forces respect and fear you.",
        effect: "Ability to call in corporate security as allies in certain areas",
        icon: 105
    }
};

const cyberneticEnhancement = {
    name: "Cybernetic Enhancement",
    description: "Upgrade your body with experimental cybernetics, pushing the boundaries of human capability.",
    startingNPC: {
        name: "Dr. Splice",
        location: "Back Alley Clinic (Map014)",
        appearance: "Actor2",
        index: 2,
        dialogue: [
            "*A doctor with more metal than flesh examines you with a mechanical eye*",
            "I can see you're still mostly meat. How... primitive.",
            "I could fix that for you. Make you better. Stronger. Faster.",
            "Just don't ask where I get my parts. Or my medical license."
        ],
        x: 8,
        y: 14
    },
    sideQuests: [
        {
            name: "Spare Parts",
            description: "Collect rare components for Dr. Splice's cybernetic enhancements.",
            objectives: [
                "Salvage military-grade servos from a restricted zone",
                "Acquire neural processors from a corporate lab",
                "Extract power cells from rogue security drones",
                "Steal experimental alloys from a metallurgy lab",
                "Deliver all components to Dr. Splice"
            ],
            reward: {
                name: "Scrap Converter",
                description: "A device that transforms junk items into useful components.",
                effect: "Converts low-value items into crafting materials",
                icon: 193
            },
            humor: "Dr. Splice keeps referring to your organic parts as 'the bits that will eventually be replaced' and 'temporary components'."
        },
        {
            name: "Human Guinea Pig",
            description: "Test experimental cybernetics with unpredictable results.",
            objectives: [
                "Allow Dr. Splice to install experimental ocular implants",
                "Test the implants in a combat situation",
                "Return for adjustments after the implants malfunction",
                "Test the improved version in an infiltration scenario",
                "Provide feedback data on the implant performance"
            ],
            reward: {
                name: "Experimental Implant",
                description: "A prototype cybernetic enhancement with powerful but unstable effects.",
                effect: "Provides random powerful buffs with occasional glitches",
                icon: 176
            },
            humor: "One malfunction causes you to see everyone as dancing cartoon characters for an hour, which is especially disturbing during a serious negotiation."
        },
        {
            name: "Rejection Syndrome",
            description: "Deal with unexpected side effects as your body rejects the cybernetic implants.",
            objectives: [
                "Diagnose the cause of the rejection symptoms",
                "Collect rare medicinal herbs from the wilderness",
                "Synthesize an anti-rejection drug",
                "Undergo a stabilization procedure",
                "Test your body's acceptance of the implants"
            ],
            reward: {
                name: "Immune Booster",
                description: "A cybernetic immune system enhancement.",
                effect: "Provides resistance to status effects and poisons",
                icon: 72
            },
            humor: "The rejection symptoms include your cybernetic arm occasionally giving rude gestures to authority figures completely on its own."
        },
        {
            name: "Wetware Upgrade",
            description: "Find a specialist who can fine-tune your neural implants for better performance.",
            objectives: [
                "Locate the reclusive neural specialist in the abandoned subway",
                "Convince them to help you by solving their personal problem",
                "Gather specialized equipment for the procedure",
                "Undergo the risky neural recalibration",
                "Adapt to your enhanced neural capabilities"
            ],
            reward: {
                name: "Neural Accelerator",
                description: "A brain implant that speeds up neural processes.",
                effect: "Reduces cooldowns on abilities by 20%",
                icon: 79
            },
            humor: "The neural specialist lives in a Faraday cage and wears a tinfoil hat over their cybernetic implants, 'just to be safe from THEIR signals'."
        },
        {
            name: "More Machine Than Man",
            description: "Make a final decision about how far to take your cybernetic enhancements.",
