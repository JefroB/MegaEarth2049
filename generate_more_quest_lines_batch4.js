const fs = require('fs');
const path = require('path');

// Function to generate a quest line
function generateQuestLine(name, description, startingNPC, startingMap, objectives) {
  const questLine = {
    name,
    description,
    startingNPC,
    startingMap,
    quests: []
  };

  // Generate 5 quests for the quest line
  const questNames = objectives.questNames;
  const questObjectives = objectives.questObjectives;

  for (let i = 0; i < 5; i++) {
    const quest = {
      name: questNames[i],
      description: `${questNames[i]} - Part of the ${name} quest line.`,
      objectives: []
    };

    // Generate 5 objectives for each quest
    for (let j = 0; j < 5; j++) {
      quest.objectives.push({
        description: questObjectives[i][j],
        mapId: startingMap + (j % 3), // Distribute objectives across 3 maps
        npcName: objectives.npcNames[i * 5 + j], // Use a different NPC for each objective
        reward: `${name} Token ${i + 1}-${j + 1}`,
        dialogueSuccess: `You've completed objective ${j + 1} of ${questNames[i]}! Here's your reward.`,
        dialogueFailure: `You haven't completed the objective yet. Keep trying!`
      });
    }

    questLine.quests.push(quest);
  }

  return questLine;
}

// Generate 11 new quest lines
const questLines = [
  // 1. Underground Farming
  generateQuestLine(
    "Underground Farming",
    "Develop a network of underground farms using mutated plants and fungi to feed the wasteland communities.",
    {
      name: "Fungus Freddie",
      appearance: "A tall, lanky man covered in bioluminescent mushroom spores that glow in different colors based on his mood.",
      personality: "Eccentric and passionate about fungi, speaks to his mushrooms as if they're his children.",
      dialogueIntro: "Hey there, surface-dweller! Want to get your hands dirty with the future of food? These beauties *gestures to glowing mushrooms* are just the beginning!"
    },
    70, // Map ID
    {
      questNames: [
        "Spore Collection",
        "Hydroponic Setup",
        "Pest Control",
        "Harvest Festival",
        "Distribution Network"
      ],
      questObjectives: [
        [
          "Collect rare spores from the toxic caverns",
          "Analyze spore viability with Dr. Myco",
          "Plant spores in experimental chambers",
          "Monitor growth patterns for 3 cycles",
          "Report findings to Fungus Freddie"
        ],
        [
          "Salvage pipes from abandoned water treatment plant",
          "Repair water filtration system",
          "Install grow lights in the main cavern",
          "Set up nutrient delivery system",
          "Test the system with starter cultures"
        ],
        [
          "Identify mutated insects attacking the crops",
          "Develop natural predator solution",
          "Introduce predator species to the farm",
          "Monitor ecosystem balance",
          "Establish sustainable pest management"
        ],
        [
          "Harvest the first generation of crops",
          "Prepare samples for the wasteland communities",
          "Organize the Underground Harvest Festival",
          "Gather feedback from festival attendees",
          "Improve crop varieties based on feedback"
        ],
        [
          "Map potential distribution routes",
          "Recruit couriers for the delivery network",
          "Establish trade agreements with settlements",
          "Set up storage facilities at key locations",
          "Coordinate the first major distribution"
        ]
      ],
      npcNames: [
        "Spore Collector Sammy", "Dr. Myco", "Growth Technician Gina", "Cycle Monitor Monty", "Research Assistant Riley",
        "Salvage Expert Sally", "Pipe Fitter Phil", "Illumination Engineer Irene", "Nutrient Specialist Nina", "System Tester Terry",
        "Entomologist Eddie", "Predator Breeder Penny", "Ecosystem Engineer Ethan", "Balance Keeper Bella", "Pest Manager Pam",
        "Harvest Helper Harry", "Sample Preparer Sasha", "Festival Organizer Fiona", "Feedback Collector Felix", "Crop Improver Clara",
        "Route Mapper Remy", "Courier Coordinator Cora", "Trade Negotiator Ned", "Storage Specialist Stan", "Distribution Director Dina"
      ]
    }
  ),

  // 2. Wasteland Fashion
  generateQuestLine(
    "Wasteland Fashion",
    "Create a fashion empire in the wasteland by repurposing scrap materials into avant-garde clothing.",
    {
      name: "Threadbare Theo",
      appearance: "A slender person of indeterminate gender wearing an elaborate outfit made entirely of salvaged tech components and colorful wires.",
      personality: "Flamboyant and dramatic, with an eye for beauty in the most unlikely places.",
      dialogueIntro: "Darling, look at you! So... utilitarian. We simply must do something about that. The apocalypse is no excuse for poor fashion choices!"
    },
    75, // Map ID
    {
      questNames: [
        "Material Gathering",
        "Design Competition",
        "Runway Preparation",
        "Fashion Show",
        "Wasteland Boutique"
      ],
      questObjectives: [
        [
          "Collect rare fabrics from abandoned luxury stores",
          "Salvage electronic components for embellishments",
          "Gather metallic scraps from vehicle graveyards",
          "Extract dyes from mutated plants",
          "Deliver materials to Threadbare Theo"
        ],
        [
          "Recruit aspiring designers from settlements",
          "Set up design workstations",
          "Organize design categories and rules",
          "Judge preliminary design submissions",
          "Select finalists for the fashion show"
        ],
        [
          "Secure location for the wasteland runway",
          "Build the catwalk from salvaged materials",
          "Set up lighting and sound systems",
          "Recruit and train wasteland models",
          "Promote the event throughout the region"
        ],
        [
          "Coordinate the fashion show schedule",
          "Manage backstage operations",
          "Host the main event",
          "Award prizes to the winners",
          "Document designs for the fashion archive"
        ],
        [
          "Secure a location for the boutique",
          "Set up display areas and fitting rooms",
          "Price the fashion pieces appropriately",
          "Train sales associates",
          "Host the grand opening"
        ]
      ],
      npcNames: [
        "Fabric Hunter Faye", "Electronics Salvager Eli", "Metal Scrapper Mack", "Dye Extractor Daisy", "Material Sorter Mia",
        "Talent Scout Tina", "Workstation Builder Walt", "Rules Committee Rita", "Judge Judy", "Finalist Selector Finn",
        "Location Scout Liam", "Catwalk Constructor Carl", "Lighting Technician Lena", "Model Trainer Mona", "Promoter Pete",
        "Schedule Coordinator Scott", "Backstage Manager Bianca", "Event Host Hector", "Prize Presenter Patty", "Archivist Archie",
        "Property Agent Penny", "Interior Designer Ian", "Pricing Specialist Priya", "Sales Trainer Saul", "Opening Organizer Olivia"
      ]
    }
  ),

  // 3. Mutant Pet Rescue
  generateQuestLine(
    "Mutant Pet Rescue",
    "Establish a sanctuary for mutated animals and find them loving homes in the wasteland.",
    {
      name: "Creature Keeper Kelly",
      appearance: "A sturdy person covered in scars and animal fur, with various small mutated creatures perched on their shoulders and hiding in their many pockets.",
      personality: "Gruff but deeply compassionate, with more patience for animals than humans.",
      dialogueIntro: "These little guys didn't ask to be changed by the wasteland. They deserve love too. You look like you might have a good heart under all that gear. Wanna help?"
    },
    80, // Map ID
    {
      questNames: [
        "Sanctuary Construction",
        "Rescue Operations",
        "Veterinary Care",
        "Rehabilitation Program",
        "Adoption Network"
      ],
      questObjectives: [
        [
          "Scout location for the animal sanctuary",
          "Gather building materials",
          "Construct basic shelter structures",
          "Build specialized habitats for different species",
          "Set up security systems to protect the sanctuary"
        ],
        [
          "Investigate reports of mutant animal sightings",
          "Develop safe capture techniques",
          "Rescue animals from dangerous areas",
          "Transport animals safely to the sanctuary",
          "Document species variations for the sanctuary database"
        ],
        [
          "Recruit wasteland veterinarians",
          "Salvage medical equipment",
          "Set up treatment areas",
          "Develop specialized care protocols for mutations",
          "Train volunteer medical assistants"
        ],
        [
          "Assess behavioral issues in rescued animals",
          "Design enrichment activities for different species",
          "Implement socialization programs",
          "Train animals with basic commands",
          "Evaluate animals for adoption readiness"
        ],
        [
          "Create adoption profiles for rehabilitated animals",
          "Screen potential adopters",
          "Match animals with suitable homes",
          "Conduct follow-up visits",
          "Host adoption events at settlements"
        ]
      ],
      npcNames: [
        "Location Scout Leila", "Material Gatherer Milo", "Shelter Builder Benny", "Habitat Designer Heidi", "Security Expert Sven",
        "Wildlife Tracker Wendy", "Capture Specialist Casey", "Danger Zone Rescuer Zack", "Transport Technician Tara", "Database Manager Dexter",
        "Veterinarian Recruiter Valerie", "Equipment Salvager Ethan", "Treatment Area Designer Tess", "Protocol Developer Phoebe", "Volunteer Trainer Victor",
        "Behavioral Analyst Blake", "Enrichment Designer Emma", "Socialization Specialist Sophie", "Animal Trainer Axel", "Adoption Evaluator Eva",
        "Profile Creator Polly", "Adopter Screener Sid", "Animal Matcher Mandy", "Follow-up Coordinator Fran", "Event Organizer Otto"
      ]
    }
  ),

  // 4. Wasteland Radio Network
  generateQuestLine(
    "Wasteland Radio Network",
    "Expand the wasteland radio network to connect isolated communities and share vital information.",
    {
      name: "Broadcast Betty",
      appearance: "An older woman with wild gray hair styled in a mohawk, wearing headphones permanently attached to a modified radio backpack that constantly emits static and occasional music.",
      personality: "Energetic and talkative, with a distinctive radio announcer voice she uses even in casual conversation.",
      dialogueIntro: "Hello, hello, testing, one-two! You're tuned in to the voice of the wasteland! *makes sound effects* We need to get more people on the airwaves, and you look like just the assistant I've been waiting for!"
    },
    85, // Map ID
    {
      questNames: [
        "Signal Mapping",
        "Equipment Salvage",
        "Tower Construction",
        "Programming Development",
        "Network Expansion"
      ],
      questObjectives: [
        [
          "Survey radio signal strength across the wasteland",
          "Identify dead zones requiring coverage",
          "Map existing radio towers and stations",
          "Analyze interference patterns",
          "Create a comprehensive signal map"
        ],
        [
          "Locate pre-war broadcasting equipment",
          "Salvage components from abandoned radio stations",
          "Repair damaged transmission equipment",
          "Test salvaged equipment functionality",
          "Deliver working equipment to Broadcast Betty"
        ],
        [
          "Scout locations for new radio towers",
          "Gather construction materials",
          "Build the first relay tower",
          "Install transmission equipment",
          "Test signal strength and range"
        ],
        [
          "Recruit wasteland DJs and hosts",
          "Develop emergency broadcast protocols",
          "Create entertainment program formats",
          "Establish news gathering network",
          "Schedule regular programming blocks"
        ],
        [
          "Connect additional settlements to the network",
          "Train local operators in each settlement",
          "Distribute radio receivers to communities",
          "Establish inter-settlement communication protocols",
          "Host the first wasteland-wide broadcast"
        ]
      ],
      npcNames: [
        "Signal Surveyor Sylvia", "Dead Zone Mapper Zeke", "Tower Tracker Trent", "Interference Analyst Ivy", "Cartographer Carl",
        "Equipment Locator Liam", "Salvage Specialist Stella", "Repair Technician Rex", "Equipment Tester Ellie", "Delivery Driver Donny",
        "Location Scout Larry", "Material Gatherer Mia", "Tower Builder Brock", "Equipment Installer Ingrid", "Signal Tester Stan",
        "DJ Recruiter Rachel", "Protocol Developer Paul", "Entertainment Director Erin", "News Coordinator Nina", "Schedule Manager Sam",
        "Settlement Liaison Lena", "Operator Trainer Oscar", "Receiver Distributor Rita", "Protocol Establisher Preston", "Broadcast Host Hank"
      ]
    }
  ),

  // 5. Wasteland Olympics
  generateQuestLine(
    "Wasteland Olympics",
    "Organize a post-apocalyptic sporting event to bring together rival settlements and foster peace through competition.",
    {
      name: "Coach Crater",
      appearance: "A muscular former athlete with numerous scars and a prosthetic leg made from sports equipment, wearing a tattered tracksuit with 'COACH' written across the back.",
      personality: "Motivational and loud, constantly speaking in sports metaphors and giving pep talks.",
      dialogueIntro: "Listen up, rookie! The wasteland's got enough fighting. Time to channel that energy into something constructive! *blows whistle* We're bringing back the games, and you're my new assistant coach!"
    },
    90, // Map ID
    {
      questNames: [
        "Event Planning",
        "Venue Preparation",
        "Recruitment Drive",
        "Training Program",
        "Games Execution"
      ],
      questObjectives: [
        [
          "Design wasteland-appropriate sporting events",
          "Create rules and scoring systems",
          "Develop safety protocols",
          "Schedule the Olympic events",
          "Draft the Wasteland Olympics charter"
        ],
        [
          "Scout location for the Olympic grounds",
          "Clear and prepare the main arena",
          "Construct event-specific facilities",
          "Build spectator seating areas",
          "Set up medical stations"
        ],
        [
          "Visit settlements to announce the Olympics",
          "Recruit athletes from different communities",
          "Enlist referees and judges",
          "Sign up medical personnel",
          "Gather security teams"
        ],
        [
          "Establish training camps",
          "Develop training regimens for different events",
          "Coach promising athletes",
          "Conduct preliminary competitions",
          "Select final participants"
        ],
        [
          "Coordinate opening ceremony",
          "Manage event operations",
          "Officiate competitions",
          "Award medals and prizes",
          "Host the closing celebration"
        ]
      ],
      npcNames: [
        "Event Designer Ellie", "Rules Writer Ryan", "Safety Officer Sam", "Schedule Coordinator Cora", "Charter Drafter Chuck",
        "Location Scout Lenny", "Arena Clearer Amber", "Facility Builder Frank", "Seating Constructor Cindy", "Medical Station Manager Mia",
        "Announcer Andy", "Athlete Recruiter Rita", "Referee Recruiter Ralph", "Medical Recruiter Molly", "Security Recruiter Sarge",
        "Camp Establisher Ethan", "Training Developer Tina", "Athletic Coach Alvin", "Competition Coordinator Carla", "Participant Selector Penny",
        "Ceremony Organizer Olivia", "Operations Manager Omar", "Head Official Hector", "Prize Presenter Patty", "Celebration Host Charlie"
      ]
    }
  ),

  // 6. Wasteland Amusement Park
  generateQuestLine(
    "Wasteland Amusement Park",
    "Restore and repurpose an abandoned amusement park to bring joy and entertainment to the harsh wasteland.",
    {
      name: "Carnival Carl",
      appearance: "A wiry man in a faded, patched ringmaster's outfit, with a mechanical arm that unfolds into various carnival tools and a permanent smile painted on his face.",
      personality: "Showman through and through, speaks in carnival barker patter and is obsessed with making people smile.",
      dialogueIntro: "Step right up, step right up! Witness the rebirth of joy in this bleak world! *mechanical arm unfolds into a spinning pinwheel* The Wasteland Wonder Park needs YOUR help to bring back the magic of entertainment!"
    },
    95, // Map ID
    {
      questNames: [
        "Park Restoration",
        "Ride Repair",
        "Attraction Development",
        "Staff Recruitment",
        "Grand Opening"
      ],
      questObjectives: [
        [
          "Clear debris from the park grounds",
          "Restore the main entrance and gates",
          "Repair the park's power system",
          "Renovate food and vendor stalls",
          "Install security measures"
        ],
        [
          "Assess salvageable rides",
          "Gather replacement parts",
          "Repair the carousel",
          "Restore the roller coaster",
          "Test ride safety systems"
        ],
        [
          "Design wasteland-themed attractions",
          "Create a mutant petting zoo",
          "Build a radioactive water slide",
          "Develop a post-apocalyptic haunted house",
          "Set up carnival games with wasteland prizes"
        ],
        [
          "Recruit ride operators",
          "Train food vendors",
          "Hire entertainment performers",
          "Assemble a security team",
          "Prepare the maintenance crew"
        ],
        [
          "Distribute invitations across the wasteland",
          "Prepare opening day festivities",
          "Coordinate the ribbon-cutting ceremony",
          "Manage the first day of operations",
          "Gather visitor feedback for improvements"
        ]
      ],
      npcNames: [
        "Debris Clearer Darla", "Gate Restorer Greg", "Power Technician Penny", "Stall Renovator Randy", "Security Installer Sid",
        "Ride Assessor Alvin", "Parts Gatherer Gina", "Carousel Mechanic Mack", "Coaster Engineer Cody", "Safety Tester Tess",
        "Attraction Designer Dora", "Petting Zoo Keeper Zoe", "Water Slide Builder Wade", "Haunted House Creator Hugo", "Game Developer Gus",
        "Operator Recruiter Rita", "Vendor Trainer Vince", "Performer Director Polly", "Security Chief Shane", "Maintenance Manager Mike",
        "Invitation Distributor Ivy", "Festivities Planner Fiona", "Ceremony Coordinator Cedric", "Operations Director Olivia", "Feedback Collector Felix"
      ]
    }
  ),

  // 7. Wasteland Trading Caravan
  generateQuestLine(
    "Wasteland Trading Caravan",
    "Establish a trading caravan network to connect isolated settlements and revitalize the wasteland economy.",
    {
      name: "Merchant Mack",
      appearance: "A heavyset person wearing layers of clothing from different eras and cultures, with pockets full of trinkets and a modified shopping cart that transforms into a market stall.",
      personality: "Shrewd but fair, always looking for a deal but never at the expense of building long-term relationships.",
      dialogueIntro: "Everything's got value in the wasteland, friend! *rattles cart full of odds and ends* What some call junk, others call treasure. Help me connect the dots between settlements, and we'll both profit!"
    },
    100, // Map ID
    {
      questNames: [
        "Route Mapping",
        "Caravan Assembly",
        "Security Detail",
        "Trade Negotiations",
        "Network Expansion"
      ],
      questObjectives: [
        [
          "Scout safe travel routes between settlements",
          "Identify hazards and danger zones",
          "Map water sources and rest points",
          "Time travel durations between locations",
          "Create a comprehensive caravan route map"
        ],
        [
          "Recruit initial caravan members",
          "Acquire pack animals or vehicles",
          "Gather essential trading goods",
          "Develop inventory management system",
          "Prepare the caravan for its first journey"
        ],
        [
          "Recruit security personnel",
          "Acquire weapons and defensive equipment",
          "Develop security protocols for different threats",
          "Train the security team",
          "Test security response to simulated attacks"
        ],
        [
          "Identify valuable trade goods for each settlement",
          "Establish fair exchange rates",
          "Negotiate trade agreements with settlement leaders",
          "Set up regular trading schedules",
          "Create a dispute resolution system"
        ],
        [
          "Incorporate additional settlements into the network",
          "Establish caravan outposts at key locations",
          "Train new caravan leaders",
          "Expand the range of traded goods",
          "Host the first inter-settlement trade fair"
        ]
      ],
      npcNames: [
        "Route Scout Rachel", "Hazard Mapper Hank", "Water Finder Wendy", "Journey Timer Jake", "Cartographer Cora",
        "Recruiter Rita", "Animal Handler Abe", "Goods Gatherer Gina", "Inventory Manager Ian", "Journey Preparer Jess",
        "Security Recruiter Sam", "Weapons Procurer Wade", "Protocol Developer Pam", "Security Trainer Troy", "Simulation Runner Sid",
        "Goods Identifier Gloria", "Exchange Rate Establisher Evan", "Agreement Negotiator Nina", "Schedule Setter Seth", "Dispute Resolver Donna",
        "Network Expander Ned", "Outpost Establisher Oscar", "Caravan Trainer Tina", "Goods Diversifier Dex", "Fair Organizer Fiona"
      ]
    }
  ),

  // 8. Wasteland Postal Service
  generateQuestLine(
    "Wasteland Postal Service",
    "Establish a reliable postal system to reconnect people across the wasteland and deliver hope along with mail.",
    {
      name: "Postmaster Patty",
      appearance: "A lean, weathered woman in a reconstructed postal uniform with numerous pockets and pouches, wearing a hat with a modified postal insignia and carrying a reinforced mail bag.",
      personality: "Dedicated and precise, takes the responsibility of delivering mail with utmost seriousness.",
      dialogueIntro: "Neither radiation storms nor mutant attacks nor gang warfare stays these couriers from the swift completion of their appointed rounds! *stamps clipboard* The mail must go through, and I need deputies!"
    },
    105, // Map ID
    {
      questNames: [
        "Postal Infrastructure",
        "Courier Recruitment",
        "Route Establishment",
        "Mail Processing",
        "Special Delivery"
      ],
      questObjectives: [
        [
          "Set up the central post office",
          "Establish collection points in settlements",
          "Create a mail sorting system",
          "Develop tracking procedures",
          "Build secure storage for packages"
        ],
        [
          "Recruit reliable couriers",
          "Train couriers in navigation and survival",
          "Equip couriers with necessary gear",
          "Establish courier protocols and oath",
          "Assign couriers to initial routes"
        ],
        [
          "Map primary delivery routes",
          "Identify safe houses and rest stops",
          "Mark hazards and alternate paths",
          "Time routes for delivery schedules",
          "Test routes with dummy mail runs"
        ],
        [
          "Develop mail categories and priorities",
          "Create addressing system for the wasteland",
          "Establish postage rates and payment methods",
          "Set up dead letter processing",
          "Implement quality control checks"
        ],
        [
          "Establish special delivery services",
          "Train couriers for high-priority packages",
          "Develop protocols for sensitive items",
          "Create a courier relay system for long distances",
          "Complete the first wasteland-wide mail delivery"
        ]
      ],
      npcNames: [
        "Office Establisher Oscar", "Collection Point Creator Cora", "Sorting System Designer Sid", "Tracking Developer Tina", "Storage Builder Bob",
        "Courier Recruiter Rita", "Training Instructor Tim", "Equipment Manager Emma", "Protocol Writer Paul", "Route Assigner Rachel",
        "Route Mapper Mack", "Safe House Finder Fiona", "Hazard Marker Hank", "Schedule Developer Donna", "Test Runner Terry",
        "Category Creator Carl", "Address System Designer Ava", "Rate Establisher Reggie", "Dead Letter Processor Dina", "Quality Controller Quinn",
        "Special Service Developer Sam", "Priority Trainer Penny", "Sensitive Item Handler Hector", "Relay System Engineer Ellie", "Lead Courier Larry"
      ]
    }
  ),

  // 9. Wasteland Historians
  generateQuestLine(
    "Wasteland Historians",
    "Preserve the knowledge and history of the pre-war world and document the emerging cultures of the wasteland.",
    {
      name: "Archivist Abby",
      appearance: "A meticulous person wearing glasses repaired with different colored wires, dressed in layers of protective clothing to prevent damage to the books and artifacts they constantly carry.",
      personality: "Intensely curious and detail-oriented, speaks in tangents full of historical references and gets easily distracted by new information.",
      dialogueIntro: "The past isn't dead! It's just... temporarily misplaced. *adjusts glasses* Every scrap of knowledge we save is a building block for the future. Help me preserve what remains before it's lost forever!"
    },
    110, // Map ID
    {
      questNames: [
        "Library Restoration",
        "Knowledge Recovery",
        "Oral History Project",
        "Museum Establishment",
        "Education Initiative"
      ],
      questObjectives: [
        [
          "Secure an abandoned library building",
          "Repair the structure and reinforce it",
          "Set up preservation systems for books",
          "Create a cataloging system",
          "Establish security measures for the collection"
        ],
        [
          "Locate and recover books from ruins",
          "Salvage digital storage devices",
          "Recover art and cultural artifacts",
          "Preserve fragile documents",
          "Organize recovered materials by subject"
        ],
        [
          "Identify wasteland elders with pre-war memories",
          "Develop interview protocols",
          "Record and transcribe survivor stories",
          "Document emerging wasteland cultures",
          "Create an accessible oral history archive"
        ],
        [
          "Secure location for the wasteland museum",
          "Design exhibit spaces",
          "Create informative displays",
          "Set up interactive learning stations",
          "Prepare for the museum opening"
        ],
        [
          "Develop basic educational curriculum",
          "Train wasteland teachers",
          "Establish community learning centers",
          "Create and distribute educational materials",
          "Host the first Wasteland Knowledge Fair"
        ]
      ],
      npcNames: [
        "Building Securer Benny", "Repair Specialist Rosa", "Preservation Expert Penny", "Catalog Creator Carl", "Security Installer Sam",
        "Book Hunter Bella", "Digital Salvager Dexter", "Art Recoverer Ava", "Document Preserver Donna", "Organization Specialist Oscar",
        "Elder Finder Ellie", "Interview Developer Ivan", "Story Recorder Randy", "Culture Documenter Dina", "Archive Manager Archie",
        "Museum Locator Mia", "Exhibit Designer Ethan", "Display Creator Daisy", "Learning Station Builder Leo", "Opening Preparer Olivia",
        "Curriculum Developer Cora", "Teacher Trainer Tina", "Learning Center Establisher Liam", "Materials Creator Mack", "Fair Organizer Fiona"
      ]
    }
  ),

  // 10. Wasteland Theater Troupe
  generateQuestLine(
    "Wasteland Theater Troupe",
    "Form a traveling theater company to bring art, entertainment, and cultural enrichment to the wasteland communities.",
    {
      name: "Director Dramatique",
      appearance: "A flamboyant individual wearing a patchwork costume combining elements of classical theater with wasteland practicality, carrying a walking stick that doubles as a stage prop.",
      personality: "Theatrical and expressive, speaks in dramatic tones and often quotes from plays, both real and invented.",
      dialogueIntro: "All the wasteland's a stage, and all the survivors merely players! *strikes a pose* We shall bring catharsis to the masses! Art must survive the apocalypse, and you, my friend, have the face of a natural performer!"
    },
    115, // Map ID
    {
      questNames: [
        "Troupe Formation",
        "Production Development",
        "Prop and Costume Creation",
        "Rehearsal Process",
        "Wasteland Tour"
      ],
      questObjectives: [
        [
          "Recruit actors with various talents",
          "Find musicians for the troupe",
          "Recruit technical crew members",
          "Establish troupe hierarchy and roles",
          "Create the troupe's manifesto and mission"
        ],
        [
          "Recover play scripts from ruins",
          "Adapt classical works for wasteland audiences",
          "Create original plays about wasteland life",
          "Develop musical performances",
          "Plan the troupe's repertoire"
        ],
        [
          "Gather materials for props and costumes",
          "Design costumes from salvaged materials",
          "Construct portable set pieces",
          "Create practical special effects",
          "Build a mobile stage system"
        ],
        [
          "Establish rehearsal space",
          "Conduct acting workshops",
          "Practice musical numbers",
          "Rehearse technical elements",
          "Hold dress rehearsals for the first production"
        ],
        [
          "Plan tour route between settlements",
          "Promote upcoming performances",
          "Perform at the first settlement",
          "Adapt shows based on audience feedback",
          "Complete a full circuit of wasteland communities"
        ]
      ],
      npcNames: [
        "Actor Recruiter Rita", "Musician Finder Melody", "Crew Recruiter Cody", "Role Assigner Rachel", "Manifesto Writer Max",
        "Script Recoverer Sam", "Classical Adapter Cynthia", "Original Playwright Paul", "Music Director Mia", "Repertoire Planner Randy",
        "Materials Gatherer Gina", "Costume Designer Dina", "Set Builder Bob", "Effects Creator Eddie", "Stage Constructor Stan",
        "Space Finder Fiona", "Workshop Leader Wendy", "Music Rehearser Marty", "Tech Director Terry", "Rehearsal Coordinator Rhonda",
        "Route Planner Patty", "Promoter Pete", "Performance Manager Penny", "Feedback Analyzer Felix", "Tour Coordinator Tina"
      ]
    }
  ),

  // 11. Wasteland Hot Springs Resort
  generateQuestLine(
    "Wasteland Hot Springs Resort",
    "Transform a naturally occurring hot spring into a luxury resort to provide relaxation and healing in the harsh wasteland.",
    {
      name: "Spa Master Serena",
      appearance: "A serene individual with unusually clear skin for the wasteland, wearing flowing garments made from repurposed luxury hotel linens and adorned with decorative items made from crystallized mineral deposits.",
      personality: "Calm and wellness-focused, speaks in soothing tones and constantly offers relaxation advice.",
      dialogueIntro: "Even in the wasteland, self-care is essential. *gestures to steaming pools* These healing waters can wash away the radiation and the stress. Your aura is... tense. Let's fix that, shall we?"
    },
    120, // Map ID
    {
      questNames: [
        "Spring Restoration",
        "Facility Construction",
        "Therapeutic Services",
        "Staff Training",
        "Grand Opening"
      ],
      questObjectives: [
        [
          "Analyze the hot spring water properties",
          "Clear debris and improve access to the springs",
          "Develop filtration system for radiation",
          "Enhance the natural healing properties",
          "Create different temperature pools"
        ],
        [
          "Design the resort layout",
          "Gather construction materials",
          "Build bathing facilities and changing rooms",
          "Construct relaxation areas and accommodations",
          "Install security and privacy measures"
        ],
        [
          "Develop massage techniques for mutated anatomy",
          "Create mud treatments from mineral-rich wasteland soil",
          "Formulate herbal remedies from wasteland plants",
          "Design radiation cleansing rituals",
          "Establish stress relief programs"
        ],
        [
          "Recruit staff with appropriate temperaments",
          "Train massage therapists",
          "Teach herbalists and treatment specialists",
          "Instruct hospitality staff",
          "Prepare security personnel"
        ],
        [
          "Create promotional materials",
          "Invite influential wasteland figures",
          "Prepare opening day ceremonies",
          "Manage the first guests' experience",
          "Collect feedback for improvements"
        ]
      ],
      npcNames: [
        "Water Analyst Wanda", "Debris Clearer Doug", "Filtration Engineer Fiona", "Healing Enhancer Hannah", "Pool Designer Penny",
        "Layout Designer Larry", "Material Gatherer Mia", "Facility Builder Frank", "Accommodation Constructor Connie", "Security Installer Sam",
        "Massage Developer Manny", "Mud Treatment Creator Tara", "Herbal Formulator Herb", "Ritual Designer Rita", "Program Developer Pam",
        "Staff Recruiter Rachel", "Massage Trainer Mia", "Herbalist Teacher Hazel", "Hospitality Instructor Holly", "Security Trainer Sarge",
        "Promotion Creator Priya", "VIP Inviter Victor", "Ceremony Preparer Celia", "Guest Experience Manager Gina", "Feedback Collector Felix"
      ]
    }
  )
];

// Function to write quest line to file
function writeQuestLineToFile(questLine) {
  const fileName = `${questLine.name.toLowerCase().replace(/\s+/g, '')}_quest.js`;
  const content = `// ${questLine.name} Quest Line
const questLine = ${JSON.stringify(questLine, null, 2)};

module.exports = questLine;`;

  fs.writeFileSync(fileName, content);
  console.log(`Generated quest line file: ${fileName}`);
}

// Write each quest line to its own file
questLines.forEach(writeQuestLineToFile);

// Update the combined quest lines file
const combinedQuestLines = questLines.map(ql => `require('./${ql.name.toLowerCase().replace(/\s+/g, '')}_quest.js')`).join(',\n  ');
const combinedContent = `// Combined Quest Lines
const questLines = [
  ${combinedQuestLines}
];

module.exports = questLines;`;

fs.writeFileSync('more_quest_lines_batch4.js', combinedContent);
console.log(`Generated combined quest lines file: more_quest_lines_batch4.js`);
