// Optional Quest Lines for MegaEarth 2049
// This file contains 6 optional quest lines, each with 4+ side quests

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
            objectives: [
                "Consider the philosophical implications of extreme cybernetic enhancement",
                "Speak with both pro-cybernetic and pro-organic advocates",
                "Decide on your final enhancement package",
                "Undergo the extensive surgical procedure",
                "Test your new capabilities"
            ],
            reward: {
                name: "Integrated Weapon System",
                description: "A weapon system built directly into your cybernetic arm.",
                effect: "Powerful weapon that doesn't take an equipment slot",
                icon: 98
            },
            humor: "Your new built-in weapons system occasionally activates when you sneeze, leading to some very awkward social situations."
        }
    ],
    finalReward: {
        name: "Transcendence",
        description: "Your extensive cybernetic enhancements have changed how others perceive you and how you interact with technology.",
        effect: "Unique cybernetic appearance and special dialogue options with machines and humans",
        icon: 188
    }
};

const virtualRealityAddiction = {
    name: "Virtual Reality Addiction",
    description: "Help people who have become trapped in virtual reality simulations, unable or unwilling to return to the real world.",
    startingNPC: {
        name: "Dr. Reeves",
        location: "Mindscape Clinic (Map031)",
        appearance: "Actor3",
        index: 7,
        dialogue: [
            "*A concerned doctor shows you brain scans of VR users*",
            "The new immersive VR systems are causing unprecedented addiction rates.",
            "People are choosing to live in fantasy worlds rather than face reality.",
            "I need someone who can go in after them. Someone like you."
        ],
        x: 12,
        y: 9
    },
    sideQuests: [
        {
            name: "Disconnection Syndrome",
            description: "Help a family bring back their loved one who has been in VR for months.",
            objectives: [
                "Interview the family about their loved one's interests and personality",
                "Enter the VR simulation where they're trapped",
                "Locate them in a vast fantasy world",
                "Use personal memories to remind them of reality",
                "Guide them through the disconnection process"
            ],
            reward: {
                name: "Reality Anchor",
                description: "A device that helps maintain connection to reality.",
                effect: "Provides immunity to confusion and charm effects",
                icon: 145
            },
            humor: "The VR addict has built an elaborate fantasy life where they're a famous and beloved king, but their 'subjects' are all just spamming 'lol' and crude jokes in the background."
        },
        {
            name: "Game Over, Man",
            description: "Enter a military combat simulation to rescue a veteran who can't distinguish reality from VR.",
            objectives: [
                "Infiltrate the military-grade VR facility",
                "Enter the endless war simulation",
                "Fight through simulated combat zones",
                "Find the veteran who's been 'killed' hundreds of times but keeps respawning",
                "Convince them that the war is over and they can come home"
            ],
            reward: {
                name: "Combat Simulator",
                description: "A personal VR device for combat training.",
                effect: "Allows practicing combat for XP without risk of death",
                icon: 189
            },
            humor: "The veteran has been 'respawning' so many times that they've developed a habit of dramatically shouting 'Not again!' and falling over whenever they're surprised."
        },
        {
            name: "Paradise Program",
            description: "Convince people to leave a too-perfect virtual world that's slowly killing their physical bodies.",
            objectives: [
                "Enter the 'Paradise' simulation",
                "Experience the perfectly crafted world of pleasure and wish fulfillment",
                "Discover the dark truth about what happens to users' physical bodies",
                "Gather evidence of the simulation's harmful effects",
                "Convince the residents to disconnect before it's too late"
            ],
            reward: {
                name: "Bliss Inducer",
                description: "A device that creates feelings of happiness and contentment.",
                effect: "Temporarily charms enemies, making them friendly",
                icon: 72
            },
            humor: "The 'paradise' includes oddly specific wish fulfillment, like a room where you always find matching socks and ice cream that doesn't melt."
        },
        {
            name: "Corrupted Instance",
            description: "Fix a glitched VR world that's causing mental harm to its users who can't log out.",
            objectives: [
                "Enter the corrupted VR simulation",
                "Navigate through glitched landscapes and broken physics",
                "Find the source code access point",
                "Debug the critical errors while fighting manifestations of the corruption",
                "Safely extract the trapped users"
            ],
            reward: {
                name: "Debug Tool",
                description: "A device that can temporarily manipulate reality in small ways.",
                effect: "Provides a chance to 'glitch' through obstacles and walls",
                icon: 83
            },
            humor: "The glitched world includes people walking in midair, rain falling upward, and NPCs stuck repeating the same sentence fragment like 'Would you like to—Would you like to—Would you like to—'"
        },
        {
            name: "Reality Check",
            description: "After spending so much time in VR, determine if you yourself are in a simulation.",
            objectives: [
                "Experience strange glitches in the 'real' world",
                "Consult with VR experts about symptoms of extended immersion",
                "Perform tests to determine if your reality is authentic",
                "Find the truth behind your experiences",
                "Make a choice about which reality to accept"
            ],
            reward: {
                name: "Perception Filter",
                description: "A device that allows you to see through illusions.",
                effect: "Reveals hidden objects, enemies, and pathways",
                icon: 79
            },
            humor: "One of the 'tests of reality' is trying to walk through a wall, which results in a broken nose and a very confused doctor explaining that 'No, that's not how you test if this is real.'"
        }
    ],
    finalReward: {
        name: "The Red Pill",
        description: "Your extensive experience with virtual realities has given you insight into manipulating perception itself.",
        effect: "Ability to slow down time in combat situations",
        icon: 72
    }
};

const culinaryWasteland = {
    name: "Culinary Wasteland",
    description: "Rediscover the lost art of cooking in the post-apocalyptic world, bringing flavor back to the wasteland.",
    startingNPC: {
        name: "Chef Ramshackle",
        location: "Wasteland Diner (Map019)",
        appearance: "People2",
        index: 4,
        dialogue: [
            "*A frustrated chef throws a pot against the wall*",
            "Another disaster! How am I supposed to create haute cuisine",
            "when all I have is irradiated mutant meat and canned mystery paste?",
            "The world has forgotten what real food tastes like. We must change that!"
        ],
        x: 7,
        y: 10
    },
    sideQuests: [
        {
            name: "Recipe for Disaster",
            description: "Find ancient cooking recipes in unexpected places throughout the wasteland.",
            objectives: [
                "Search the ruins of a pre-collapse restaurant",
                "Recover a data drive from a sunken luxury cruise ship",
                "Extract recipe data from a malfunctioning domestic robot",
                "Decipher food advertisements in an abandoned subway",
                "Compile the recipes into a usable cookbook"
            ],
            reward: {
                name: "Wasteland Cookbook",
                description: "A collection of adapted pre-collapse recipes.",
                effect: "Unlocks crafting of basic food items with beneficial effects",
                icon: 121
            },
            humor: "One of the 'gourmet' recipes is just different ways to prepare rat meat with the note 'Call it something French and charge triple'."
        },
        {
            name: "Ingredient Hunt",
            description: "Gather rare ingredients from dangerous locations across the wasteland.",
            objectives: [
                "Harvest mushrooms from a radioactive cave",
                "Collect honey from mutated giant bees",
                "Hunt a rare albino mutant deer for its meat",
                "Gather spices from an abandoned hydroponics lab",
                "Extract salt from a toxic lake"
            ],
            reward: {
                name: "Preservation Unit",
                description: "A high-tech container that keeps ingredients fresh indefinitely.",
                effect: "Food ingredients never spoil in your inventory",
                icon: 176
            },
            humor: "Chef Ramshackle tastes the toxic lake salt and declares it 'Perfectly seasoned with hints of mercury and industrial runoff. Exquisite!'"
        },
        {
            name: "Kitchen Nightmare",
            description: "Help a struggling wasteland restaurant become successful by improving their menu and service.",
            objectives: [
                "Evaluate the current state of the restaurant",
                "Train the staff in basic hygiene (like not sneezing on the food)",
                "Redesign the menu using available ingredients",
                "Advertise to attract customers from nearby settlements",
                "Successfully serve a full house of customers"
            ],
            reward: {
                name: "Chef's Toolkit",
                description: "A set of professional cooking tools.",
                effect: "Improves the effects of crafted food items by 50%",
                icon: 193
            },
            humor: "The restaurant's previous specialty was 'Mystery Meat Surprise' where the 'surprise' was usually food poisoning."
        },
        {
            name: "Food Critic",
            description: "Prepare and serve a gourmet meal to a notorious wasteland food critic.",
            objectives: [
                "Research the food critic's preferences and history",
                "Design a multi-course meal to impress them",
                "Gather the perfect ingredients for each course",
                "Prepare the meal under pressure",
                "Serve the critic and await their verdict"
            ],
            reward: {
                name: "Gourmet Reputation",
                description: "Your reputation as a culinary expert spreads throughout the wasteland.",
                effect: "Receive better prices and special items from food vendors",
                icon: 145
            },
            humor: "The feared food critic turns out to be a 10-year-old kid who became powerful because they're the only person who can read and write in their settlement."
        },
        {
            name: "Molecular Gastronomy",
            description: "Use high-tech methods to create revolutionary dishes that could change wasteland cuisine forever.",
            objectives: [
                "Recover specialized cooking equipment from a luxury bunker",
                "Learn the principles of molecular gastronomy from an AI chef",
                "Experiment with transforming common wasteland ingredients",
                "Create a showcase of innovative dishes",
                "Present your creations at a wasteland food festival"
            ],
            reward: {
                name: "Food Synthesizer",
                description: "A device that can create food items from basic components.",
                effect: "Create food items using simplified ingredient requirements",
                icon: 189
            },
            humor: "Your revolutionary cooking technique of 'spherification' is misunderstood by wasteland dwellers who spread rumors that you're 'turning food into suspicious balls through witchcraft'."
        }
    ],
    finalReward: {
        name: "Master Chef",
        description: "Your culinary expertise is unmatched in the wasteland, allowing you to create legendary dishes.",
        effect: "Ability to create legendary food items with powerful temporary buffs",
        icon: 87
    }
};

const wastelandRadio = {
    name: "Wasteland Radio",
    description: "Establish a radio network across the wasteland to connect isolated communities and spread information.",
    startingNPC: {
        name: "DJ Frequency",
        location: "Abandoned Radio Station (Map028)",
        appearance: "Actor3",
        index: 4,
        dialogue: [
            "*A charismatic figure fiddles with radio equipment*",
            "You know what this wasteland needs? A voice. A connection.",
            "I've got the equipment, I've got the voice, but I need someone",
            "to help me reach the people. Someone like you, friend."
        ],
        x: 14,
        y: 11
    },
    sideQuests: [
        {
            name: "Signal Boost",
            description: "Repair and activate radio towers across the region to extend broadcast range.",
            objectives: [
                "Locate three damaged radio towers on the map",
                "Gather replacement parts from electronics stores",
                "Repair each tower's transmission equipment",
                "Defend the towers from scavengers during activation",
                "Return to DJ Frequency to confirm signal strength"
            ],
            reward: {
                name: "Signal Tracker",
                description: "A device that can detect and locate hidden signals and frequencies.",
                effect: "Reveals hidden caches and quest objectives on the map",
                icon: 83
            },
            humor: "One of the towers picks up an alien signal that turns out to be a pre-collapse satellite still broadcasting a shopping channel."
        },
        {
            name: "Breaking News",
            description: "Gather newsworthy stories from remote settlements to build credibility for the station.",
            objectives: [
                "Interview settlement leaders about local events",
                "Investigate rumors of strange occurrences",
                "Document evidence of corporate wrongdoing",
                "Record testimonials from wasteland survivors",
                "Compile all stories for broadcast"
            ],
            reward: {
                name: "Press Pass",
                description: "An official-looking ID that grants you access as a journalist.",
                effect: "Access to restricted areas and special dialogue options",
                icon: 87
            },
            humor: "Your biggest 'breaking news' story is about a two-headed cow that can predict the weather, which becomes the most popular segment on the station."
        },
        {
            name: "Airwave Interference",
            description: "Deal with a rival radio station that's spreading misinformation and jamming your signal.",
            objectives: [
                "Track down the source of the interference",
                "Infiltrate the rival station",
                "Gather evidence of their deliberate sabotage",
                "Confront the rival DJ",
                "Either sabotage their equipment or convince them to cooperate"
            ],
            reward: {
                name: "Signal Jammer",
                description: "A device that can temporarily disable enemy communications.",
                effect: "Prevents enemies from calling for reinforcements during combat",
                icon: 176
            },
            humor: "The rival DJ turns out to be DJ Frequency's ex-partner who's still bitter about a disagreement over whether to play 'classic rock' or 'classic rock with synth'."
        },
        {
            name: "Musical Wasteland",
            description: "Collect music recordings to build a broadcast library that will boost morale across the wasteland.",
            objectives: [
                "Recover vinyl records from an abandoned music store",
                "Download digital music files from a corporate server",
                "Find a rare collection of pre-collapse concert recordings",
                "Convince a wasteland musician to record original songs",
                "Deliver all music to DJ Frequency"
            ],
            reward: {
                name: "Portable Radio",
                description: "A device that plays morale-boosting music for you and your allies.",
                effect: "Provides passive buffs to nearby allies",
                icon: 189
            },
            humor: "The most requested song in the wasteland turns out to be a pre-collapse commercial jingle for a brand of cheese that no one remembers."
        },
        {
            name: "Voice of Freedom",
            description: "Defend the radio station from a faction that wants to control information in the wasteland.",
            objectives: [
                "Set up defensive perimeter around the station",
                "Recruit allies from settlements that benefit from the broadcasts",
                "Intercept the attack plans to prepare defenses",
                "Defend the station during the assault",
                "Broadcast the truth about the attackers to turn public opinion against them"
            ],
            reward: {
                name: "Emergency Broadcast System",
                description: "A system that can call for help from listeners in emergencies.",
                effect: "Ability to call for NPC allies in certain areas",
                icon: 105
            },
            humor: "During the climactic battle, DJ Frequency refuses to stop broadcasting and provides a play-by-play commentary of the fight like it's a sporting event."
        }
    ],
    finalReward: {
        name: "Wasteland DJ",
        description: "Your control of the airwaves gives you significant influence over wasteland politics and culture.",
        effect: "Ability to influence faction relations through special broadcast missions",
        icon: 145
    }
};

// Export all quest lines
module.exports = {
    digitalArchaeology,
    corporateEspionage,
    cyberneticEnhancement,
    virtualRealityAddiction,
    culinaryWasteland,
    wastelandRadio
};
