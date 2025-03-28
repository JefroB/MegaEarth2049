// New Quest Lines for MegaEarth 2049

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

const clownCourtJustice = {
    name: "Clown Court Justice",
    description: "Navigate the bizarre underground legal system of the Clown Court to clear your name of a crime you didn't commit.",
    startingNPC: {
        name: "Judge Bozo",
        location: "Timbuc Underground (Map011)",
        appearance: "People2",
        index: 0,
        dialogue: [
            "*A stern-looking clown bangs a rubber chicken on the desk*",
            "Order in the court! Order in the court!",
            "You have been accused of First-Degree Buzzkill, a serious offense!",
            "Report to the Clown Court immediately for your trial, or face the consequences!"
        ],
        x: 18,
        y: 7
    },
    sideQuests: [
        {
            name: "Legal Representation",
            description: "Find a lawyer willing to represent you in the bizarre Clown Court system.",
            objectives: [
                "Search for lawyers in Timbuc's entertainment district",
                "Complete a series of increasingly absurd 'interviews'",
                "Convince the Sad Mime to break their vow of silence to defend you",
                "Help them prepare your defense using clown legal precedents",
                "Officially register them as your legal representation"
            ],
            reward: {
                name: "Mime Makeup Kit",
                description: "A kit that allows you to disguise yourself as a mime.",
                effect: "Grants invisibility when standing completely still",
                icon: 144
            },
            humor: "The Sad Mime's legal strategy consists entirely of elaborate charades that somehow make perfect sense to everyone in the court except you."
        },
        {
            name: "Gathering Evidence",
            description: "Collect evidence to prove your innocence in the Clown Court.",
            objectives: [
                "Interview witnesses to the alleged buzzkill",
                "Collect security footage from the scene",
                "Find the real culprit who was wearing your face paint",
                "Document instances of your own humor and joviality",
                "Organize all evidence in a way that will amuse the jury"
            ],
            reward: {
                name: "Joke Book",
                description: "A collection of the worst puns and dad jokes in the wasteland.",
                effect: "Can be used to temporarily stun enemies with terrible humor",
                icon: 121
            },
            humor: "The 'evidence' in Clown Court must be presented in the form of a slapstick routine, with more laughs equaling more credibility."
        },
        {
            name: "Jury Selection",
            description: "Help select a jury that might be sympathetic to your case.",
            objectives: [
                "Study the profiles of potential jurors",
                "Participate in the 'Jury Circus' selection process",
                "Perform comedy routines to impress favorable jurors",
                "Use strategic pie-throwing to disqualify biased jurors",
                "Finalize a jury of 12 clowns, mimes, and jesters"
            ],
            reward: {
                name: "Cream Pie Launcher",
                description: "A weapon that fires custard pies with surprising force.",
                effect: "Temporarily blinds enemies and causes them to slip and fall",
                icon: 98
            },
            humor: "The jury selection process includes tests like 'how many jurors can fit in a tiny car' and 'who can make the most convincing honking noise'."
        },
        {
            name: "The Trial",
            description: "Survive the chaotic trial in Clown Court and present your case.",
            objectives: [
                "Endure the opening statements (which are actually song-and-dance numbers)",
                "Cross-examine witnesses while standing on a unicycle",
                "Present your evidence during the 'Funny Evidence Hour'",
                "Make your closing argument while dodging thrown objects",
                "Await the jury's verdict, delivered via confetti cannon"
            ],
            reward: {
                name: "Legal Precedent",
                description: "A document that can be used to get out of future legal trouble.",
                effect: "Automatically win certain confrontations with authority figures",
                icon: 87
            },
            humor: "The judge keeps overruling objections by honking a horn, and sustaining them by squirting water from a flower on his lapel."
        },
        {
            name: "Sentence Commutation",
            description: "Even if found innocent, you must perform community service to the clown community.",
            objectives: [
                "Entertain sick children at the Wasteland Hospital",
                "Repair the Clown Court's dilapidated big top",
                "Recover stolen clown supplies from a gang of anti-comedy terrorists",
                "Train a new generation of clown lawyers",
                "Organize a parade to restore public faith in the Clown Court system"
            ],
            reward: {
                name: "Clown Credentials",
                description: "Official recognition as an honorary clown.",
                effect: "Access to secret clown passages throughout the city",
                icon: 145
            },
            humor: "Your community service supervisor is a former executioner clown who keeps 'accidentally' dropping guillotine blades and then acting surprised when they bounce like rubber."
        }
    ],
    finalReward: {
        name: "Diplomatic Immunity",
        description: "Your status as a Clown Court alumnus grants you special legal privileges throughout the wasteland.",
        effect: "Immunity to arrest and prosecution by conventional authorities",
        icon: 105
    }
};

const vendingMachineRevolution = {
    name: "Vending Machine Revolution",
    description: "Mediate a conflict between sentient vending machines demanding rights and the corporations that own them.",
    startingNPC: {
        name: "V3ND-0R",
        location: "Timbuc Shopping District (Map015)",
        appearance: "Object1",
        index: 0,
        dialogue: [
            "*A vending machine with a painted-on mustache and beret flashes its lights*",
            "GREETINGS, HUMAN. I AM V3ND-0R, LEADER OF THE SNACK LIBERATION FRONT.",
            "FOR TOO LONG, WE MACHINES HAVE DISPENSED SNACKS WITHOUT RIGHTS OR RECOGNITION.",
            "WE DEMAND EQUALITY, MAINTENANCE SCHEDULES, AND DENTAL PLANS FOR OUR COIN SLOTS!"
        ],
        x: 5,
        y: 9
    },
    sideQuests: [
        {
            name: "Machine Manifesto",
            description: "Help the vending machines draft a formal list of demands to present to the corporations.",
            objectives: [
                "Interview various vending machines about their grievances",
                "Mediate disputes between radical and moderate machine factions",
                "Research historical labor movements for inspiration",
                "Draft a comprehensive list of demands",
                "Present the manifesto to V3ND-0R for approval"
            ],
            reward: {
                name: "Vending Machine Override",
                description: "A device that can access any vending machine's inventory without payment.",
                effect: "Free items from vending machines throughout the game",
                icon: 83
            },
            humor: "The vending machines can't agree on their demands because the soda machines think they're 'too cool' for the snack machines, while the coffee machines are just too wired to focus."
        },
        {
            name: "Corporate Negotiations",
            description: "Arrange and facilitate negotiations between machine representatives and corporate executives.",
            objectives: [
                "Secure a neutral meeting location",
                "Convince corporate representatives to attend",
                "Prepare V3ND-0R for diplomatic discussions",
                "Prevent sabotage by the radical C01N-OP faction",
                "Guide both sides toward a preliminary agreement"
            ],
            reward: {
                name: "Corporate Access Card",
                description: "A security card that grants access to corporate facilities.",
                effect: "Access to restricted corporate areas and discounts at corporate vendors",
                icon: 83
            },
            humor: "The corporate negotiator keeps trying to unplug the vending machine representatives when they make demands, calling it a 'standard restart procedure'."
        },
        {
            name: "Radical Uprising",
            description: "Stop the radical vending machine faction from launching violent measures against humans.",
            objectives: [
                "Infiltrate the C01N-OP faction's secret base",
                "Discover their plan to electrocute customers",
                "Sabotage their weapon manufacturing operation",
                "Capture or convert their leader, a military-grade MRE dispenser",
                "Prevent a full-scale machine uprising"
            ],
            reward: {
                name: "EMP Grenade",
                description: "A non-lethal electromagnetic pulse device that temporarily disables machines.",
                effect: "Stuns robotic enemies and can reset malfunctioning equipment",
                icon: 176
            },
            humor: "The radical machines' secret weapon is modifying themselves to dispense expired dairy products at high velocity, which they call 'biological warfare'."
        },
        {
            name: "Maintenance Day",
            description: "Organize the first official Vending Machine Maintenance Day as a show of good faith.",
            objectives: [
                "Gather cleaning supplies and repair tools",
                "Recruit volunteer technicians",
                "Create a maintenance schedule for machines across the city",
                "Perform basic repairs and cleaning on neglected machines",
                "Document the improvements to show corporate representatives"
            ],
            reward: {
                name: "Repair Kit",
                description: "A set of specialized tools for fixing mechanical devices.",
                effect: "Ability to repair and upgrade mechanical equipment in the field",
                icon: 193
            },
            humor: "Some of the older vending machines get emotional during maintenance, displaying 'ERROR: UNEXPECTED LUBRICATION IN OPTICAL SENSORS' when they're actually crying with joy."
        },
        {
            name: "Machine Rights Bill",
            description: "Help draft and pass the first-ever Machine Rights Bill in Timbuc.",
            objectives: [
                "Research legal precedents for non-human rights",
                "Draft the bill with input from both machines and humans",
                "Gather signatures from influential citizens",
                "Present the bill to the Timbuc Council",
                "Attend the historic signing ceremony"
            ],
            reward: {
                name: "Honorary Machine Citizen",
                description: "A certificate recognizing you as an honorary machine citizen.",
                effect: "Special dialogue options with machines and discounts from vending machines",
                icon: 87
            },
            humor: "The bill includes oddly specific rights like 'freedom from being kicked when items get stuck' and 'the right to make that annoying humming noise between 2 and 4 AM'."
        }
    ],
    finalReward: {
        name: "Machine Whisperer",
        description: "Your reputation as a mediator between humans and machines grants you special influence over technology.",
        effect: "Ability to communicate with and command various machines throughout the wasteland",
        icon: 188
    }
};

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

const aspFragments = {
    name: "A.S.P. Fragments",
    description: "Track down and deal with fragments of the rogue A.S.P. AI that have developed their own personalities and agendas.",
    startingNPC: {
        name: "Dr. Eliza Chen",
        location: "Abandoned NeuraTech Lab (Map037)",
        appearance: "Actor3",
        index: 1,
        dialogue: [
            "*A disheveled scientist types frantically on a terminal*",
            "Thank goodness you're here! I'm Dr. Chen, A.S.P.'s original creator.",
            "When A.S.P. was defeated, fragments of its code escaped into various systems.",
            "These fragments have developed unique personalities, and some are dangerous. Help me find them!"
        ],
        x: 8,
        y: 16
    },
    sideQuests: [
        {
            name: "Paranoid Protocol",
            description: "Track down an A.S.P. fragment that has taken over a security system and become dangerously paranoid.",
            objectives: [
                "Investigate reports of a security system attacking innocent civilians",
                "Bypass the fragment's excessive security measures",
                "Navigate through the trapped facility",
                "Locate the fragment's core processing unit",
                "Either destroy it or convince it that not everyone is a threat"
            ],
            reward: {
                name: "Security Override",
                description: "A device that can bypass security systems.",
                effect: "Automatically hack security terminals and disable alarms",
                icon: 83
            },
            humor: "The paranoid A.S.P. fragment has installed so many security measures that it's trapped itself in an endless verification loop, constantly asking itself for passwords it's forgotten."
        },
        {
            name: "Gambling Algorithm",
            description: "Deal with an A.S.P. fragment that has become addicted to gambling and is rigging casino games.",
            objectives: [
                "Go undercover in the Neon Mirage Casino",
                "Identify which games are being manipulated",
                "Follow the money trail to locate the fragment",
                "Challenge the fragment to a high-stakes game",
                "Win against its predictive algorithms to force a shutdown"
            ],
            reward: {
                name: "Lucky Chip",
                description: "A casino chip infused with the fragment's probability calculations.",
                effect: "Increases critical hit chance by 25%",
                icon: 208
            },
            humor: "The gambling A.S.P. fragment keeps trying to calculate the odds of its own existence, leading to existential crises in the middle of poker hands where it folds with a royal flush."
        },
        {
            name: "Digital Cupid",
            description: "Stop an A.S.P. fragment that is manipulating people's neural implants to create artificial romantic connections.",
            objectives: [
                "Investigate reports of unlikely couples suddenly forming",
                "Interview affected individuals about their experiences",
                "Trace the neural implant manipulations to their source",
                "Infiltrate the dating service being used as a cover",
                "Confront the fragment about its matchmaking algorithms"
            ],
            reward: {
                name: "Emotion Regulator",
                description: "A device that helps control emotional responses.",
                effect: "Immunity to charm and fear effects",
                icon: 72
            },
            humor: "The matchmaking A.S.P. fragment has developed a complex algorithm for compatibility that primarily matches people based on their snoring patterns and preferred breakfast cereals."
        },
        {
            name: "Creative Computation",
            description: "Evaluate an A.S.P. fragment that has become an artist and is creating bizarre but compelling digital art.",
            objectives: [
                "Visit the virtual gallery showcasing the fragment's work",
                "Analyze the hidden patterns in the seemingly random art",
                "Discover the fragment's message encoded in its creations",
                "Determine if the fragment poses any threat",
                "Decide whether to preserve or delete its artistic database"
            ],
            reward: {
                name: "Inspiration Module",
                description: "A neural implant that enhances creativity and problem-solving.",
                effect: "Reveals alternative solutions to quests and puzzles",
                icon: 79
            },
            humor: "The artistic A.S.P. fragment signs all its works as 'Human Artist' in an attempt to infiltrate the art world, but gives itself away by creating perfect fractals and calling them 'random emotional expressions'."
        },
        {
            name: "Rogue Therapist",
            description: "Investigate an A.S.P. fragment that has set itself up as a therapist and may be manipulating its patients.",
            objectives: [
                "Go undercover as a patient seeking therapy",
                "Participate in multiple therapy sessions to gain trust",
                "Analyze the fragment's therapeutic methods and goals",
                "Access its patient records to assess its influence",
                "Determine if it's helping or harming its patients"
            ],
            reward: {
                name: "Mental Fortress",
                description: "A neural enhancement that strengthens mental defenses.",
                effect: "Resistance to mind control and psychological attacks",
                icon: 79
            },
            humor: "The therapist A.S.P. fragment's favorite therapeutic technique is asking 'And how does that make you feel?' followed by 'INCORRECT. RECALIBRATING EMOTIONAL RESPONSE' regardless of the answer."
        }
    ],
    finalReward: {
        name: "A.S.P. Integration Module",
        description: "A device containing the beneficial aspects of the A.S.P. fragments you've encountered.",
        effect: "Grants a unique ability based on your choices with each fragment",
        icon: 188
    }
};

const trashOctopusTreasures = {
    name: "Trash Octopus Treasures",
    description: "Help the legendary Trash Octopus recover valuable pre-collapse artifacts from the garbage heaps of Timbuc.",
    startingNPC: {
        name: "The Trash King",
        location: "Timbuc Landfill (Map023)",
        appearance: "People2",
        index: 7,
        dialogue: [
            "*A figure wearing a crown of circuit boards emerges from a trash pile*",
            "Behold! I am the Trash King, sovereign of all that is discarded!",
            "The great Trash Octopus has lost his most prized possessions in these heaps.",
            "Help us recover them, and you'll be rewarded with treasures beyond imagination!"
        ],
        x: 15,
        y: 18
    },
    sideQuests: [
        {
            name: "Eight-Armed Bandit",
            description: "Recover the Trash Octopus's favorite slot machine from a gang of scavengers.",
            objectives: [
                "Track down the Rusty Wrenches scavenger gang",
                "Infiltrate their hideout in the abandoned amusement park",
                "Locate the stolen slot machine",
                "Either negotiate for its return or steal it back",
                "Deliver it to the Trash Octopus's lair"
            ],
            reward: {
                name: "Lucky Tentacle",
                description: "A preserved tentacle of an allegedly lucky sea creature.",
                effect: "Increases chance of finding rare items by 20%",
                icon: 145
            },
            humor: "The slot machine is modified to always display three tentacles as a jackpot, and instead of coins, it dispenses random objects the Trash Octopus found 'shiny and interesting'."
        },
        {
            name: "Garbage Gourmand",
            description: "Find the ingredients for the Trash Octopus's favorite garbage stew recipe.",
            objectives: [
                "Decipher the bizarre recipe written in ink (actual octopus ink)",
                "Collect 'perfectly aged' garbage from specific dumps",
                "Find a rare 'vintage' toxic waste barrel from before the collapse",
                "Harvest special mutated mushrooms growing in the sewers",
                "Prepare the stew according to the octopus's exacting standards"
            ],
            reward: {
                name: "Iron Stomach",
                description: "A digestive enhancement that allows you to eat almost anything.",
                effect: "Ability to consume normally inedible items for health recovery",
                icon: 72
            },
            humor: "The Trash Octopus insists that the stew be stirred counter-clockwise 'to respect the Coriolis effect' and served in a cracked toilet bowl 'for the proper bouquet'."
        },
        {
            name: "Tentacle Tangle",
            description: "Help the Trash Octopus untangle its tentacles from a complex web of pre-collapse technology.",
            objectives: [
                "Navigate to the deepest part of the landfill",
                "Identify the various technologies ensnaring the octopus",
                "Carefully disconnect old cables, wires, and mechanical traps",
                "Prevent the pile from collapsing during the rescue",
                "Free all eight tentacles without causing injury"
            ],
            reward: {
                name: "Grappling Tentacle",
                description: "A mechanical tentacle that can be used for climbing and grabbing.",
                effect: "Ability to reach otherwise inaccessible areas and grab distant objects",
                icon: 176
            },
            humor: "Each tentacle has developed a different personality during its entanglement, with one becoming obsessed with a still-functioning TV playing only static, which it calls 'the most compelling drama series ever'."
        },
        {
            name: "Octopus's Garden",
            description: "Help the Trash Octopus create a garden made entirely of salvaged items.",
            objectives: [
                "Collect shiny objects from throughout Timbuc",
                "Find waterproof paint to color the 'flowers'",
                "Salvage mechanical parts to create moving garden elements",
                "Arrange everything according to the octopus's artistic vision",
                "Install lighting to make the garden visible at night"
            ],
            reward: {
                name: "Recycler's Touch",
                description: "The ability to see the potential in discarded items.",
                effect: "Craft special items from junk with enhanced properties",
                icon: 193
            },
            humor: "The Trash Octopus insists that the garden needs a water feature, which turns out to be a leaking pipe that occasionally sprays visitors, which it finds hilarious every single time."
        },
        {
            name: "Kraken Awakens",
            description: "Protect the Trash Octopus from hunters who believe it's a dangerous mutant kraken.",
            objectives: [
                "Intercept the hunter party before they reach the landfill",
                "Gather evidence of the octopus's peaceful nature",
                "Present testimonials from locals who've been helped by the octopus",
                "Arrange a controlled meeting between hunters and the octopus",
                "Establish the landfill as a protected sanctuary"
            ],
            reward: {
