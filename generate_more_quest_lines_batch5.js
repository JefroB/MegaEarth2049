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
  // 1. Wasteland Culinary Competition
  generateQuestLine(
    "Wasteland Culinary Competition",
    "Organize and participate in a post-apocalyptic cooking competition using mutated ingredients and improvised cooking methods.",
    {
      name: "Chef Chaos",
      appearance: "A burly person wearing a stained chef's hat and an apron made from leather scraps, with various cooking utensils hanging from a tool belt and a flamethrower modified to work as a cooking torch.",
      personality: "Passionate and intense about food, prone to dramatic outbursts when discussing flavors, and constantly tasting things from the environment.",
      dialogueIntro: "You call that food? *spits* The wasteland deserves better! We've survived the apocalypse, but our taste buds are dying of boredom! Help me organize the greatest culinary showdown the ruins have ever seen!"
    },
    125, // Map ID
    {
      questNames: [
        "Ingredient Gathering",
        "Kitchen Construction",
        "Contestant Recruitment",
        "Challenge Design",
        "Grand Finale"
      ],
      questObjectives: [
        [
          "Collect rare mutated vegetables from the toxic gardens",
          "Hunt exotic irradiated game animals",
          "Harvest unusual fungi from the underground caverns",
          "Gather preserved pre-war spices from abandoned stores",
          "Source clean water from the hidden spring"
        ],
        [
          "Salvage cooking equipment from ruined restaurants",
          "Build improvised cooking stations",
          "Set up a water purification system for the kitchen",
          "Construct a generator for powering appliances",
          "Create a dining area for judges and audience"
        ],
        [
          "Recruit skilled cooks from different settlements",
          "Find judges with refined palates",
          "Enlist assistants for the competition",
          "Convince settlement leaders to send representatives",
          "Recruit an announcer for the event"
        ],
        [
          "Design the appetizer challenge",
          "Create the main course competition rules",
          "Develop the dessert contest parameters",
          "Establish judging criteria",
          "Set up the competition schedule"
        ],
        [
          "Prepare the venue for the final competition",
          "Coordinate the contestants and judges",
          "Manage the audience and security",
          "Oversee the final cooking battle",
          "Award prizes to the winners"
        ]
      ],
      npcNames: [
        "Vegetable Vendor Vera", "Hunter Hank", "Fungi Forager Fiona", "Spice Seeker Sam", "Water Warden Wendy",
        "Salvage Specialist Sid", "Station Builder Bob", "Purification Expert Penny", "Generator Guru Greg", "Dining Designer Dana",
        "Recruiter Rita", "Judge Selector Jared", "Assistant Arranger Amy", "Settlement Liaison Liam", "Announcer Recruiter Randy",
        "Challenge Creator Cora", "Rules Writer Ryan", "Dessert Designer Daisy", "Criteria Creator Carl", "Schedule Setter Seth",
        "Venue Preparer Vince", "Contestant Coordinator Cindy", "Security Chief Shane", "Battle Overseer Owen", "Prize Presenter Patty"
      ]
    }
  ),

  // 2. Wasteland Music Festival
  generateQuestLine(
    "Wasteland Music Festival",
    "Organize a music festival in the wasteland to bring together musicians from different settlements and revive musical culture.",
    {
      name: "Melody Mayhem",
      appearance: "A wiry person with hair dyed multiple colors using plant extracts, wearing clothing covered in makeshift musical notation and carrying a guitar made from a car hood and salvaged strings.",
      personality: "Energetic and passionate about music, speaks in musical metaphors, and often breaks into song mid-conversation.",
      dialogueIntro: "The wasteland's got a rhythm, can you feel it? *strums improvised guitar* We need more than just survival, we need SOUL! Help me create the first post-apocalyptic music festival and we'll make these ruins SING!"
    },
    130, // Map ID
    {
      questNames: [
        "Instrument Creation",
        "Musician Recruitment",
        "Venue Preparation",
        "Sound System Setup",
        "Festival Execution"
      ],
      questObjectives: [
        [
          "Collect materials for string instruments",
          "Gather components for percussion instruments",
          "Salvage electronics for amplification",
          "Find materials for wind instruments",
          "Create a showcase of wasteland instruments"
        ],
        [
          "Find musicians in the northern settlement",
          "Recruit performers from the eastern ruins",
          "Discover musical talent in the southern outpost",
          "Convince western settlement performers to join",
          "Audition and select the final lineup"
        ],
        [
          "Clear the festival grounds",
          "Build a main stage from salvaged materials",
          "Construct smaller performance areas",
          "Create audience seating and viewing areas",
          "Set up shelter in case of radiation storms"
        ],
        [
          "Salvage speakers and amplification equipment",
          "Restore and repair audio mixing equipment",
          "Set up a power generation system",
          "Install the sound system across the venue",
          "Test and calibrate the audio setup"
        ],
        [
          "Coordinate the arrival of performers",
          "Manage the festival schedule",
          "Oversee security and crowd control",
          "Facilitate performances and transitions",
          "Document the festival for wasteland history"
        ]
      ],
      npcNames: [
        "String Collector Stella", "Percussion Gatherer Pete", "Electronics Expert Ellie", "Wind Instrument Specialist Wally", "Instrument Curator Irene",
        "Northern Scout Nina", "Eastern Recruiter Eddie", "Southern Talent Scout Sam", "Western Diplomat Wendy", "Audition Judge Jake",
        "Ground Clearer Gus", "Stage Builder Stan", "Performance Area Designer Penny", "Seating Constructor Sid", "Shelter Engineer Shelby",
        "Speaker Salvager Sally", "Mixer Mechanic Mike", "Power Technician Pauline", "Installation Expert Ian", "Sound Tester Terry",
        "Performer Coordinator Cora", "Schedule Manager Manny", "Security Chief Shane", "Stage Director Donna", "Historian Harper"
      ]
    }
  ),

  // 3. Wasteland Sports League
  generateQuestLine(
    "Wasteland Sports League",
    "Establish a sports league with post-apocalyptic twists on classic games to foster community spirit and friendly competition.",
    {
      name: "Referee Rex",
      appearance: "A muscular person wearing a striped referee shirt reinforced with metal plates, carrying a whistle made from a bullet casing and a flag made from a torn hazmat suit.",
      personality: "Fair but strict, obsessed with rules and sportsmanship, prone to blowing the whistle mid-sentence when excited.",
      dialogueIntro: "FOUL! *blows whistle* The wasteland's got too much fighting for survival and not enough playing for fun! We're going to change that with some organized sports—with apocalyptic modifications, of course. You look like you've got a sporting spirit!"
    },
    135, // Map ID
    {
      questNames: [
        "Sport Invention",
        "Field Construction",
        "Team Formation",
        "Rule Establishment",
        "Tournament Organization"
      ],
      questObjectives: [
        [
          "Design a wasteland version of football",
          "Create a post-apocalyptic basketball variant",
          "Develop a radiation-zone racing competition",
          "Invent a mutant-hunting sport",
          "Design a scavenging competition format"
        ],
        [
          "Clear and level the main playing field",
          "Construct goal posts and field markers",
          "Build spectator seating areas",
          "Create a scoreboard system",
          "Set up field lighting for night games"
        ],
        [
          "Recruit team captains from different settlements",
          "Hold tryouts for potential players",
          "Form balanced teams with diverse skills",
          "Create team uniforms from salvaged materials",
          "Train referees and officials"
        ],
        [
          "Establish basic rules for each sport",
          "Create safety guidelines for players",
          "Develop a scoring system",
          "Establish a code of conduct for participants",
          "Create a rulebook for distribution"
        ],
        [
          "Schedule the tournament matches",
          "Prepare the opening ceremony",
          "Manage the tournament operations",
          "Organize the championship finals",
          "Plan the awards ceremony"
        ]
      ],
      npcNames: [
        "Football Designer Frank", "Basketball Innovator Bella", "Racing Developer Rachel", "Hunting Sport Creator Hunter", "Scavenge Game Designer Gina",
        "Field Clearer Cliff", "Goal Constructor Gary", "Seating Builder Samantha", "Scoreboard Technician Tina", "Lighting Engineer Larry",
        "Captain Recruiter Rita", "Tryout Organizer Tom", "Team Balancer Brenda", "Uniform Creator Uma", "Referee Trainer Randy",
        "Rules Writer Ryan", "Safety Officer Sam", "Scoring System Developer Sid", "Conduct Codifier Cora", "Rulebook Editor Eddie",
        "Schedule Coordinator Scott", "Ceremony Organizer Olivia", "Tournament Manager Manny", "Finals Director Fiona", "Awards Presenter Patty"
      ]
    }
  ),

  // 4. Wasteland Art Gallery
  generateQuestLine(
    "Wasteland Art Gallery",
    "Establish an art gallery showcasing post-apocalyptic artwork and preserving artistic expression in the wasteland.",
    {
      name: "Curator Chaos",
      appearance: "A slender person wearing a patchwork suit made from museum banners, with glasses frames that hold different colored lenses, and hair styled to resemble famous sculptures.",
      personality: "Passionate and eccentric about art, speaks in flowery language full of artistic references, and dramatically poses when making important points.",
      dialogueIntro: "Darling, the apocalypse is no excuse for cultural barbarism! *strikes a pose* Art must survive! Help me create a gallery to showcase the wasteland's creative renaissance, and we shall bring beauty back to this broken world!"
    },
    140, // Map ID
    {
      questNames: [
        "Gallery Establishment",
        "Art Collection",
        "Exhibition Design",
        "Artist Recruitment",
        "Opening Gala"
      ],
      questObjectives: [
        [
          "Secure a suitable building for the gallery",
          "Reinforce the structure against the elements",
          "Create display spaces and lighting",
          "Establish security measures for the artwork",
          "Design the gallery layout and flow"
        ],
        [
          "Recover pre-war artwork from ruins",
          "Collect contemporary wasteland paintings",
          "Gather sculptural works made from scrap",
          "Source digital art from surviving technology",
          "Acquire performance art documentation"
        ],
        [
          "Design the main exhibition space",
          "Create informative display plaques",
          "Develop thematic organization for the artwork",
          "Build specialized display cases",
          "Set up proper lighting for each piece"
        ],
        [
          "Find painters working in the wasteland",
          "Recruit sculptors using scrap materials",
          "Discover performance artists",
          "Locate digital artists with working technology",
          "Commission new works for the gallery"
        ],
        [
          "Create and distribute invitations",
          "Prepare refreshments for the opening",
          "Organize an opening night performance",
          "Coordinate gallery tours and explanations",
          "Document the event for wasteland history"
        ]
      ],
      npcNames: [
        "Building Securer Benny", "Structural Engineer Stella", "Display Designer Donna", "Security Expert Sam", "Layout Planner Larry",
        "Art Recoverer Rita", "Painting Collector Pablo", "Sculpture Gatherer Gina", "Digital Archivist Dexter", "Performance Documenter Penny",
        "Exhibition Designer Eva", "Plaque Writer Paul", "Theme Organizer Tina", "Case Builder Bob", "Lighting Technician Lucy",
        "Painter Finder Fiona", "Sculptor Recruiter Scott", "Performance Scout Patty", "Digital Artist Locator Dana", "Commission Coordinator Carl",
        "Invitation Designer Irene", "Refreshment Preparer Rachel", "Performance Organizer Oscar", "Tour Guide Tara", "Event Documenter Darren"
      ]
    }
  ),

  // 5. Wasteland Film Festival
  generateQuestLine(
    "Wasteland Film Festival",
    "Organize a film festival showcasing movies made in the post-apocalyptic world using salvaged equipment and creative storytelling.",
    {
      name: "Director Debris",
      appearance: "A dramatic person wearing a tattered director's beret and a vest covered in film strips, carrying a megaphone made from scrap metal and a viewfinder crafted from broken binoculars.",
      personality: "Theatrical and visionary, speaks in cinematic terms, frequently frames scenes with their hands, and yells 'CUT!' when conversations don't go their way.",
      dialogueIntro: "CUT! CUT! This wasteland needs STORY! *frames you with hands* You've got the look of a production assistant with potential! Help me create the first post-apocalyptic film festival and we'll bring the silver screen back to the masses!"
    },
    145, // Map ID
    {
      questNames: [
        "Equipment Salvage",
        "Filmmaker Recruitment",
        "Venue Preparation",
        "Film Production",
        "Festival Execution"
      ],
      questObjectives: [
        [
          "Recover cameras from pre-war electronics stores",
          "Salvage projection equipment from old theaters",
          "Find recording devices for sound capture",
          "Gather editing equipment from studios",
          "Collect screens and display technology"
        ],
        [
          "Find storytellers in the settlements",
          "Recruit actors from different communities",
          "Discover technical experts for equipment operation",
          "Locate artists for set and costume design",
          "Recruit musicians for film scores"
        ],
        [
          "Secure a location for the film festival",
          "Create a main screening area",
          "Build seating for the audience",
          "Set up projection systems",
          "Create a stage for introductions and awards"
        ],
        [
          "Organize filmmaking workshops",
          "Assist with short film production",
          "Help create documentary about wasteland life",
          "Support production of a wasteland drama",
          "Facilitate a comedy film about apocalypse life"
        ],
        [
          "Create a festival schedule and program",
          "Distribute invitations across settlements",
          "Coordinate the arrival of filmmakers and audience",
          "Manage the screenings and discussions",
          "Organize the awards ceremony"
        ]
      ],
      npcNames: [
        "Camera Collector Cathy", "Projection Salvager Pete", "Sound Equipment Hunter Hannah", "Editing Expert Eddie", "Screen Scavenger Sam",
        "Storyteller Scout Stella", "Actor Recruiter Adam", "Tech Expert Finder Tina", "Artist Locator Ava", "Musician Recruiter Mack",
        "Venue Securer Victor", "Screening Area Builder Bob", "Seating Constructor Sally", "Projection Technician Paul", "Stage Designer Donna",
        "Workshop Leader Wendy", "Short Film Producer Finn", "Documentary Director Dora", "Drama Producer Debbie", "Comedy Director Charlie",
        "Program Designer Penny", "Invitation Distributor Ian", "Arrival Coordinator Amy", "Screening Manager Mia", "Awards Organizer Oscar"
      ]
    }
  ),

  // 6. Wasteland Circus
  generateQuestLine(
    "Wasteland Circus",
    "Create a traveling circus that brings wonder and entertainment to the wasteland settlements with mutant animals and daring performers.",
    {
      name: "Ringmaster Rad",
      appearance: "A flamboyant person in a radiation-resistant ringmaster's outfit with glowing trim, carrying a megaphone crafted from a traffic cone and wearing platform boots made from car parts.",
      personality: "Bombastic and theatrical, speaks in exaggerated announcer voice, constantly hypes up even mundane events, and has a flair for the dramatic pause.",
      dialogueIntro: "LADIES AND GENTLEMEN AND MUTANTS OF ALL KINDS! *dramatic pause* Prepare to be AMAZED! The wasteland needs wonder, and we shall provide it! Join me in creating the most SPECTACULAR, DEATH-DEFYING, MUTATION-CELEBRATING circus the apocalypse has ever seen!"
    },
    150, // Map ID
    {
      questNames: [
        "Performer Recruitment",
        "Animal Training",
        "Equipment Creation",
        "Tent Construction",
        "Tour Organization"
      ],
      questObjectives: [
        [
          "Find acrobats among the agile scavengers",
          "Recruit strongmen from the labor camps",
          "Discover magicians using wasteland tricks",
          "Locate clowns and comedians in settlements",
          "Find daredevils willing to perform stunts"
        ],
        [
          "Capture and tame two-headed wolves",
          "Train giant mutant rats for performances",
          "Domesticate glowing lizards for light shows",
          "Teach tricks to mutated birds",
          "Bond with a radiation-enhanced bear"
        ],
        [
          "Create a high wire from salvaged cables",
          "Build a trapeze system from scrap metal",
          "Construct juggling props from debris",
          "Make clown props and gags from junk",
          "Build stunt ramps and safety equipment"
        ],
        [
          "Gather durable fabric for the big top",
          "Create a tent frame from salvaged poles",
          "Design seating for the audience",
          "Set up a center ring performance area",
          "Create lighting for night performances"
        ],
        [
          "Map a route between major settlements",
          "Create promotional materials for the circus",
          "Establish transportation for performers and equipment",
          "Coordinate the first performance",
          "Collect feedback for show improvements"
        ]
      ],
      npcNames: [
        "Acrobat Scout Alex", "Strongman Recruiter Steve", "Magician Finder Mia", "Comedian Locator Chuck", "Daredevil Recruiter Dina",
        "Wolf Tamer Wendy", "Rat Trainer Randy", "Lizard Handler Larry", "Bird Trainer Bella", "Bear Tamer Boris",
        "Wire Worker Will", "Trapeze Builder Tina", "Prop Creator Penny", "Clown Supplier Charlie", "Stunt Engineer Stella",
        "Fabric Gatherer Fiona", "Frame Builder Frank", "Seating Designer Sam", "Ring Creator Rita", "Lighting Technician Leo",
        "Route Planner Rachel", "Promotions Designer Paul", "Transport Coordinator Tom", "Performance Director Donna", "Feedback Collector Felix"
      ]
    }
  ),

  // 7. Wasteland Library Network
  generateQuestLine(
    "Wasteland Library Network",
    "Establish a network of libraries across the wasteland to preserve knowledge and provide education to survivors.",
    {
      name: "Bookkeeper Brains",
      appearance: "A scholarly person wearing glasses with different lenses cobbled together, dressed in a librarian outfit patched with book covers, and carrying a backpack full of salvaged books.",
      personality: "Meticulous and passionate about knowledge, speaks in literary references, constantly organizes things alphabetically, and shushes loud noises.",
      dialogueIntro: "Shhh! *adjusts glasses* Knowledge is our most precious resource in this wasteland. *pats book bag* Help me establish a library network to preserve what remains of human wisdom, or we're doomed to repeat the mistakes that brought us here!"
    },
    155, // Map ID
    {
      questNames: [
        "Book Salvage",
        "Library Establishment",
        "Cataloging System",
        "Librarian Training",
        "Knowledge Network"
      ],
      questObjectives: [
        [
          "Recover books from abandoned schools",
          "Salvage texts from ruined universities",
          "Gather technical manuals from factories",
          "Collect fiction from residential areas",
          "Salvage digital storage devices with books"
        ],
        [
          "Secure a building for the central library",
          "Create shelving and storage systems",
          "Set up reading and study areas",
          "Establish book repair stations",
          "Create a system for lending books"
        ],
        [
          "Develop a classification system",
          "Create a catalog of all salvaged books",
          "Establish inventory tracking methods",
          "Make reference cards and indexes",
          "Set up subject organization"
        ],
        [
          "Recruit literate individuals as librarians",
          "Train staff in book preservation",
          "Teach cataloging and organization",
          "Instruct on knowledge sharing methods",
          "Train reading teachers for the illiterate"
        ],
        [
          "Establish satellite libraries in settlements",
          "Create a book rotation system between locations",
          "Develop a courier network for book requests",
          "Organize community reading events",
          "Create a system for recording oral knowledge"
        ]
      ],
      npcNames: [
        "School Salvager Sally", "University Explorer Uma", "Manual Collector Mike", "Fiction Finder Fiona", "Digital Recoverer Dexter",
        "Building Securer Benny", "Shelving Builder Sam", "Reading Area Designer Rita", "Repair Specialist Rachel", "Lending System Developer Leo",
        "Classification Creator Cora", "Catalog Compiler Carl", "Inventory Manager Irene", "Index Maker Ian", "Subject Organizer Sophia",
        "Librarian Recruiter Lisa", "Preservation Trainer Paul", "Catalog Instructor Cathy", "Knowledge Sharing Teacher Ken", "Reading Teacher Trainer Tina",
        "Satellite Establisher Stella", "Rotation System Developer Ryan", "Courier Network Organizer Nina", "Reading Event Planner Evan", "Oral Historian Harper"
      ]
    }
  ),

  // 8. Wasteland University
  generateQuestLine(
    "Wasteland University",
    "Establish a post-apocalyptic university to educate the next generation and preserve specialized knowledge.",
    {
      name: "Professor Fallout",
      appearance: "An elderly person wearing a tattered academic robe patched with duct tape, half-moon glasses repaired with wire, and carrying a walking stick that doubles as a pointing tool for improvised blackboards.",
      personality: "Scholarly and absent-minded, speaks in lectures, frequently goes off on educational tangents, and grades conversations on a scale of A to F.",
      dialogueIntro: "Ah, a potential student! *adjusts glasses* Education is the foundation of rebuilding civilization, young scholar! Help me establish the Wasteland University, and we shall illuminate minds darkened by the apocalypse! Your first assignment begins now!"
    },
    160, // Map ID
    {
      questNames: [
        "Campus Establishment",
        "Faculty Recruitment",
        "Curriculum Development",
        "Resource Gathering",
        "Student Enrollment"
      ],
      questObjectives: [
        [
          "Secure buildings for the university campus",
          "Create classroom spaces from ruins",
          "Establish a central library area",
          "Set up laboratory spaces for sciences",
          "Create administrative offices"
        ],
        [
          "Find experts in survival skills",
          "Recruit those with medical knowledge",
          "Locate individuals with engineering expertise",
          "Find those knowledgeable in agriculture",
          "Recruit historians and cultural experts"
        ],
        [
          "Develop a basic education program",
          "Create specialized technical courses",
          "Establish medical training curriculum",
          "Design agricultural education programs",
          "Create cultural and historical studies"
        ],
        [
          "Gather textbooks and educational materials",
          "Collect laboratory equipment",
          "Salvage teaching tools and aids",
          "Create a library of reference materials",
          "Develop writing materials and supplies"
        ],
        [
          "Recruit students from settlements",
          "Establish scholarship system for promising youth",
          "Create dormitories for resident students",
          "Develop graduation requirements",
          "Hold the first commencement ceremony"
        ]
      ],
      npcNames: [
        "Building Securer Benny", "Classroom Creator Cora", "Library Organizer Lisa", "Lab Designer Larry", "Office Preparer Olivia",
        "Survival Expert Sam", "Medical Recruiter Mia", "Engineering Expert Finder Ethan", "Agriculture Specialist Recruiter Amy", "Historian Hunter Harper",
        "Basic Education Developer Beth", "Technical Course Creator Tom", "Medical Curriculum Designer Donna", "Agriculture Program Planner Paul", "Cultural Studies Creator Cynthia",
        "Textbook Gatherer Gina", "Equipment Collector Eddie", "Teaching Tool Salvager Tina", "Reference Librarian Rachel", "Supplies Developer Sid",
        "Student Recruiter Rita", "Scholarship System Designer Stella", "Dormitory Developer Dexter", "Graduation Requirement Creator Grace", "Ceremony Organizer Oscar"
      ]
    }
  ),

  // 9. Wasteland Botanical Gardens
  generateQuestLine(
    "Wasteland Botanical Gardens",
    "Create a botanical garden to preserve plant species and develop new radiation-resistant varieties for food and medicine.",
    {
      name: "Gardener Glow",
      appearance: "A serene person with plants growing in their hair, wearing overalls covered in seed pouches and carrying specialized gardening tools made from repurposed weapons.",
      personality: "Patient and nurturing, speaks to plants as if they're people, gets excited about mutations that others find disturbing, and measures time in growing seasons.",
      dialogueIntro: "The plants are speaking to us, if only we'd listen! *strokes a mutated flower* These new species are the future, not monsters to fear! Help me create a sanctuary for botanical discovery, and we'll grow a better tomorrow from the irradiated soil of today!"
    },
    165, // Map ID
    {
      questNames: [
        "Site Preparation",
        "Specimen Collection",
        "Greenhouse Construction",
        "Research Establishment",
        "Garden Opening"
      ],
      questObjectives: [
        [
          "Find a suitable location with varied soil types",
          "Clear the area of dangerous debris",
          "Test and remediate soil contamination",
          "Create irrigation systems",
          "Establish protective boundaries"
        ],
        [
          "Collect surviving pre-war plant species",
          "Gather mutated plant varieties",
          "Find seeds from abandoned seed banks",
          "Rescue rare plants from threatened areas",
          "Document each specimen's properties"
        ],
        [
          "Salvage materials for greenhouse structures",
          "Build the main conservatory",
          "Create specialized growing environments",
          "Set up water collection and filtration",
          "Install climate control systems"
        ],
        [
          "Set up a botanical laboratory",
          "Create a seed bank and storage system",
          "Establish breeding and hybridization areas",
          "Develop testing areas for edibility and uses",
          "Create a documentation and research library"
        ],
        [
          "Design educational garden paths and signs",
          "Create displays explaining plant uses",
          "Train guides for garden tours",
          "Prepare for opening day ceremony",
          "Establish a system for plant distribution"
        ]
      ],
      npcNames: [
        "Location Scout Liam", "Debris Clearer Darla", "Soil Scientist Sam", "Irrigation Engineer Irene", "Boundary Builder Bob",
        "Pre-war Plant Hunter Penny", "Mutation Collector Mike", "Seed Bank Raider Rita", "Rare Plant Rescuer Rachel", "Plant Documenter Donna",
        "Materials Salvager Mack", "Conservatory Constructor Carl", "Environment Engineer Emma", "Water System Designer Wade", "Climate Technician Tina",
        "Lab Setup Specialist Lisa", "Seed Bank Organizer Oscar", "Breeding Area Designer Brenda", "Testing Coordinator Tom", "Research Librarian Larry",
        "Path Designer Patty", "Display Creator Dexter", "Tour Guide Trainer Grace", "Ceremony Organizer Olivia", "Distribution Developer Dana"
      ]
    }
  ),

  // 10. Wasteland Observatory
  generateQuestLine(
    "Wasteland Observatory",
    "Rebuild an observatory to study the stars and monitor changes in the atmosphere following the apocalypse.",
    {
      name: "Stargazer Stella",
      appearance: "A thoughtful person wearing a lab coat decorated with star patterns, with a telescope eyepiece permanently attached to a headband and carrying star charts made on scraps of leather.",
      personality: "Contemplative and curious, speaks in cosmic metaphors, frequently stares at the sky even during daytime, and loses track of time when discussing astronomy.",
      dialogueIntro: "The answers are above us, not below! *points skyward* The stars remain unchanged despite our world's destruction. Help me rebuild the observatory, and we'll reconnect with the cosmos while monitoring the healing of our atmosphere!"
    },
    170, // Map ID
    {
      questNames: [
        "Observatory Restoration",
        "Equipment Salvage",
        "Research Program",
        "Data Collection",
        "Knowledge Sharing"
      ],
      questObjectives: [
        [
          "Locate a suitable observatory site",
          "Clear and secure the location",
          "Restore or rebuild the main structure",
          "Create a rotating dome mechanism",
          "Establish power systems for operations"
        ],
        [
          "Recover telescope components",
          "Salvage optical equipment from ruins",
          "Find computers and data storage devices",
          "Gather astronomical reference materials",
          "Recover specialized measurement tools"
        ],
        [
          "Develop atmospheric monitoring protocols",
          "Create star mapping procedures",
          "Establish weather prediction methods",
          "Design radiation pattern tracking",
          "Create long-term observation schedules"
        ],
        [
          "Collect baseline atmospheric data",
          "Map the current night sky",
          "Record weather patterns across seasons",
          "Document radiation fluctuations",
          "Compare current data with pre-war records"
        ],
        [
          "Create educational programs about astronomy",
          "Establish a system for sharing weather predictions",
          "Train settlement representatives in basic observations",
          "Develop warning systems for atmospheric events",
          "Host stargazing events for wasteland communities"
        ]
      ],
      npcNames: [
        "Site Locator Lisa", "Security Specialist Sam", "Structure Engineer Ethan", "Dome Designer Donna", "Power Technician Paul",
        "Telescope Recoverer Tom", "Optics Salvager Olivia", "Computer Collector Carl", "Reference Gatherer Rachel", "Tool Hunter Tina",
        "Protocol Developer Penny", "Mapping Methodologist Mike", "Weather Expert Wendy", "Radiation Tracker Randy", "Schedule Creator Sarah",
        "Data Collector Dana", "Sky Mapper Skyler", "Weather Recorder Walter", "Radiation Monitor Rita", "Records Comparer Ryan",
        "Education Program Developer Ed", "Weather Prediction Sharer Sharon", "Training Coordinator Terry", "Warning System Developer Wade", "Event Host Hannah"
      ]
    }
  ),

  // 11. Wasteland Museum of History
  generateQuestLine(
    "Wasteland Museum of History",
    "Create a museum to preserve the history of both pre-war civilization and the post-apocalyptic world for future generations.",
    {
      name: "Historian Hank",
      appearance: "A meticulous person wearing a patchwork suit with pre-war neckties as decorations, carrying a notebook made from salvaged paper and wearing spectacles with mismatched lenses.",
      personality: "Passionate about preserving history, speaks in historical references, frequently compares current events to historical ones, and treats artifacts with reverent care.",
      dialogueIntro: "History is repeating itself before our very eyes! *adjusts spectacles* If we don't preserve our past, we're doomed to stumble blindly into the future. Help me build a museum to honor what was lost and document what has risen from the ashes!"
    },
    175, // Map ID
    {
      questNames: [
        "Artifact Collection",
        "Museum Establishment",
        "Exhibit Creation",
        "Historical Documentation",
        "Public Education"
      ],
      questObjectives: [
        [
          "Recover pre-war technological artifacts",
          "Collect items representing daily life before the apocalypse",
          "Gather military and government artifacts",
          "Salvage art and cultural objects",
          "Find items representing the early post-apocalypse period"
        ],
        [
          "Secure a suitable building for the museum",
          "Restore and reinforce the structure",
          "Create display areas and exhibit halls",
          "Establish security and preservation systems",
          "Set up administrative and research spaces"
        ],
        [
          "Design the pre-war technology exhibit",
          "Create the daily life before the apocalypse display",
          "Develop the military and government history section",
          "Set up the art and culture gallery",
          "Build the post-apocalypse survival exhibit"
        ],
        [
          "Interview elders who remember pre-war times",
          "Record oral histories of the apocalypse event",
          "Document the formation of new settlements",
          "Create a timeline of post-apocalyptic events",
          "Map the changes in the wasteland over time"
        ],
        [
          "Develop educational programs for children",
          "Create guided tours of the museum",
          "Establish regular historical lectures",
          "Train volunteer docents from the community",
          "Host a grand opening ceremony"
        ]
      ],
      npcNames: [
        "Tech Salvager Tim", "Daily Life Collector Donna", "Military Artifact Hunter Marcus", "Art Recoverer Ava", "Post-Apocalypse Gatherer Gus",
        "Building Securer Benny", "Restoration Expert Rita", "Display Designer Dexter", "Security Specialist Sam", "Research Space Planner Rachel",
        "Technology Exhibit Designer Tina", "Daily Life Display Creator Dana", "Military Section Developer Mike", "Art Gallery Curator Cathy", "Survival Exhibit Builder Bob",
        "Elder Interviewer Ellie", "Apocalypse Historian Harper", "Settlement Chronicler Charlie", "Timeline Creator Tara", "Wasteland Mapper Manny",
        "Children's Program Developer Penny", "Tour Guide Trainer Tom", "Lecture Organizer Larry", "Docent Trainer Daisy", "Ceremony Planner Patty"
      ]
    }
  )
];

// Function to write quest lines to individual files and a combined file
function writeQuestLines() {
  // Create individual quest line files
  questLines.forEach(questLine => {
    const fileName = questLine.name.toLowerCase().replace(/\s+/g, '') + '_quest.js';
    const fileContent = `// ${questLine.name} Quest Line
const questLine = ${JSON.stringify(questLine, null, 2)};

module.exports = questLine;`;
    
    fs.writeFileSync(fileName, fileContent);
    console.log(`Generated quest line file: ${fileName}`);
  });
  
  // Create combined quest lines file
  const combinedFileName = 'more_quest_lines_batch5.js';
  const combinedFileContent = `// Combined Quest Lines Batch 5
const questLines = [
  ${questLines.map(questLine => `require('./${questLine.name.toLowerCase().replace(/\s+/g, '')}_quest.js')`).join(',\n  ')}
];

module.exports = questLines;`;
  
  fs.writeFileSync(combinedFileName, combinedFileContent);
  console.log(`Generated combined quest lines file: ${combinedFileName}`);
}

// Execute the function
writeQuestLines();
