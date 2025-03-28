// Quest Helper NPCs for MegaEarth 2049
// This file contains 30 NPCs that actively help the player with various quests

module.exports = [
    // Item/Resource Providers
    {
        name: "Scrap Merchant",
        appearance: "Actor1",
        index: 3,
        location: "Timbuc Market (Map010)",
        x: 20,
        y: 12,
        dialogue: [
            "Need parts for that Neon Street Racing quest? I've got just what you need.",
            "Here's a high-performance engine part. Nitro will be impressed you found this.",
            "Come back if you need more racing components. I always keep a stash for serious racers."
        ],
        helperType: "item_provider",
        questLine: "Neon Street Racing",
        itemProvided: "High-Performance Engine",
        itemFlag: "HELPER_SCRAP_MERCHANT_GAVE_ENGINE"
    },
    {
        name: "Seed Vault Keeper",
        appearance: "Actor2",
        index: 2,
        location: "Abandoned Vitalix Lab (Map041)",
        x: 15,
        y: 10,
        dialogue: [
            "You're helping Sprout with the Underground Farming Collective? I've been saving these.",
            "Take this collection of pre-collapse seeds. They're non-mutated and will grow pure food.",
            "I've been hiding these from Vitalix for years. Use them wisely."
        ],
        helperType: "item_provider",
        questLine: "Underground Farming Collective",
        itemProvided: "Pre-Collapse Seed Collection",
        itemFlag: "HELPER_SEED_VAULT_KEEPER_GAVE_SEEDS"
    },
    {
        name: "Retired Courier",
        appearance: "Actor3",
        index: 5,
        location: "Timbuc Residential (Map004)",
        x: 12,
        y: 15,
        dialogue: [
            "Working with Postmaster Pax to revive the postal service? That takes me back.",
            "Here's my old courier bag. It's reinforced to protect mail from radiation and rain.",
            "It served me well for twenty years. Now it's yours."
        ],
        helperType: "item_provider",
        questLine: "Wasteland Postal Service",
        itemProvided: "Reinforced Courier Bag",
        itemFlag: "HELPER_RETIRED_COURIER_GAVE_BAG"
    },
    {
        name: "Emotion Chip Engineer",
        appearance: "Actor1",
        index: 2,
        location: "Timbuc 2 (Map002)",
        x: 18,
        y: 18,
        dialogue: [
            "Investigating the black market emotion chips? I used to design the legal versions.",
            "Take this emotion stabilizer. It will help you safely interact with unstable emotion chips.",
            "Be careful around the Mood Broker. Those black market chips aren't properly tested."
        ],
        helperType: "item_provider",
        questLine: "Synthetic Emotions",
        itemProvided: "Emotion Stabilizer",
        itemFlag: "HELPER_ENGINEER_GAVE_STABILIZER"
    },
    {
        name: "Art Supply Hoarder",
        appearance: "Actor2",
        index: 4,
        location: "Timbuc Cellar (Map015)",
        x: 8,
        y: 12,
        dialogue: [
            "You're helping Curator Vex with the art gallery? I've been collecting supplies for years.",
            "Take these rare pigments and brushes. Perfect for creating or restoring artwork.",
            "Art is what keeps us human in this wasteland. Glad to help preserve it."
        ],
        helperType: "item_provider",
        questLine: "Wasteland Art Gallery",
        itemProvided: "Rare Art Supplies",
        itemFlag: "HELPER_ART_HOARDER_GAVE_SUPPLIES"
    },
    
    // Healers and Buff Providers
    {
        name: "Wasteland Medic",
        appearance: "Actor3",
        index: 1,
        location: "The Squeaky Clean (Map105)",
        x: 15,
        y: 8,
        dialogue: [
            "Heading to rescue mutant animals from that fighting ring? You'll need medical support.",
            "I'll patch you up whenever you return here. No charge for animal rescuers.",
            "Dr. Whiskers is doing important work. Glad to support the cause."
        ],
        helperType: "healer",
        questLine: "Mutant Pet Rescue",
        healAmount: 100,
        healFlag: "HELPER_MEDIC_HEALED"
    },
    {
        name: "Radiation Chef",
        appearance: "Actor1",
        index: 7,
        location: "Timbuc Inn (Map013)",
        x: 18,
        y: 10,
        dialogue: [
            "Competing in Chef Hazmat's cooking competition? You'll need protection from those ingredients.",
            "Try my special anti-radiation stew. It'll boost your resistance for a while.",
            "The secret ingredient? Don't ask. Just enjoy the protection."
        ],
        helperType: "buffer",
        questLine: "Mutant Cooking Show",
        buffType: "Radiation Resistance",
        buffDuration: 600, // seconds
        buffFlag: "HELPER_CHEF_BUFFED"
    },
    {
        name: "Memory Technician",
        appearance: "Actor2",
        index: 0,
        location: "Timbuc 2 (Map002)",
        x: 10,
        y: 12,
        dialogue: [
            "Working with Mnemosyne? Memory work can be dangerous without protection.",
            "This neural shield will protect your own memories while handling others'.",
            "It's temporary, but should last long enough for your current task."
        ],
        helperType: "buffer",
        questLine: "Memory Merchant",
        buffType: "Memory Protection",
        buffDuration: 900, // seconds
        buffFlag: "HELPER_TECHNICIAN_BUFFED"
    },
    {
        name: "Drone Engineer",
        appearance: "Actor1",
        index: 4,
        location: "Timbuc 2 (Map002)",
        x: 20,
        y: 15,
        dialogue: [
            "Helping Hive Mind with the drone swarm? You'll need this controller upgrade.",
            "It'll temporarily boost your ability to interface with and control drones.",
            "The boost will wear off eventually, but should help with your current mission."
        ],
        helperType: "buffer",
        questLine: "Drone Swarm Commander",
        buffType: "Drone Control",
        buffDuration: 1200, // seconds
        buffFlag: "HELPER_ENGINEER_BUFFED"
    },
    {
        name: "Cybernetic Tuner",
        appearance: "Actor3",
        index: 6,
        location: "The Squeaky Clean (Map105)",
        x: 12,
        y: 12,
        dialogue: [
            "Testing experimental enhancements for Dr. Circuit? Let me optimize your current implants.",
            "This tuning will boost your system performance temporarily.",
            "All cybernetics need regular tuning. Come back anytime."
        ],
        helperType: "buffer",
        questLine: "Cybernetic Enhancement",
        buffType: "System Optimization",
        buffDuration: 1500, // seconds
        buffFlag: "HELPER_TUNER_BUFFED"
    },
    
    // Skill Teachers
    {
        name: "Wasteland Historian",
        appearance: "Actor2",
        index: 7,
        location: "Old Library (Map009)",
        x: 15,
        y: 15,
        dialogue: [
            "Working with Professor Memento? I can teach you proper artifact handling techniques.",
            "There, now you know how to preserve fragile pre-collapse documents and technology.",
            "This knowledge will help you recover artifacts without damaging them."
        ],
        helperType: "skill_teacher",
        questLine: "Wasteland Historians",
        skillTaught: "Artifact Preservation",
        skillFlag: "HELPER_HISTORIAN_TAUGHT_PRESERVATION"
    },
    {
        name: "Veteran Racer",
        appearance: "Actor1",
        index: 5,
        location: "Timbuc 2 (Map002)",
        x: 8,
        y: 8,
        dialogue: [
            "So Nitro's got you racing, huh? I can teach you some advanced driving techniques.",
            "These drifting and boosting methods will give you an edge in the Death Race.",
            "Practice makes perfect. Use these techniques wisely."
        ],
        helperType: "skill_teacher",
        questLine: "Neon Street Racing",
        skillTaught: "Advanced Driving",
        skillFlag: "HELPER_RACER_TAUGHT_DRIVING"
    },
    {
        name: "Botanical Expert",
        appearance: "Actor3",
        index: 2,
        location: "Timbuc Greenhouse (Map007)",
        x: 10,
        y: 10,
        dialogue: [
            "Helping Dr. Bloom with the botanical gardens? Let me teach you proper planting techniques.",
            "These methods will ensure higher yield and healthier plants, even in irradiated soil.",
            "The secret is in how you prepare the soil and position the seeds."
        ],
        helperType: "skill_teacher",
        questLine: "Wasteland Botanical Gardens",
        skillTaught: "Advanced Planting",
        skillFlag: "HELPER_BOTANIST_TAUGHT_PLANTING"
    },
    {
        name: "Radio Technician",
        appearance: "Actor1",
        index: 1,
        location: "Timbuc 2 (Map002)",
        x: 15,
        y: 15,
        dialogue: [
            "Working with DJ Frequency? I can teach you how to repair and tune radio equipment.",
            "These skills will help you get those old transmitters working again.",
            "Radio is the lifeblood of wasteland communication. Use these skills to help rebuild the network."
        ],
        helperType: "skill_teacher",
        questLine: "Wasteland Radio Network",
        skillTaught: "Radio Repair",
        skillFlag: "HELPER_TECHNICIAN_TAUGHT_REPAIR"
    },
    {
        name: "Clown Court Lawyer",
        appearance: "Actor2",
        index: 1,
        location: "Timbuc Underground (Map011)",
        x: 12,
        y: 8,
        dialogue: [
            "Facing charges in the Clown Court? I can teach you the bizarre legal system they use.",
            "Remember: objections must be in limerick form, and evidence must be presented with a pratfall.",
            "Follow these rules and you might just avoid the human cannonball sentence."
        ],
        helperType: "skill_teacher",
        questLine: "Clown Court Justice",
        skillTaught: "Clown Law",
        skillFlag: "HELPER_LAWYER_TAUGHT_CLOWN_LAW"
    },
    
    // Transportation Providers
    {
        name: "Wasteland Pilot",
        appearance: "Actor1",
        index: 6,
        location: "Timbuc Spaceport (Map042)",
        x: 15,
        y: 12,
        dialogue: [
            "Need to collect STD samples from distant locations? I can fly you there.",
            "My vertibird isn't pretty, but she's fast and radiation-shielded.",
            "Just say the word when you're ready to fly to your next collection site."
        ],
        helperType: "transport",
        questLine: "STD Collector",
        destinations: [
            { name: "Planet Ork", mapId: 43 },
            { name: "Ting Ting Outpost", mapId: 47 },
            { name: "Abandoned Colony", mapId: 52 }
        ],
        transportFlag: "HELPER_PILOT_TRANSPORTED"
    },
    {
        name: "Tunnel Navigator",
        appearance: "Actor3",
        index: 4,
        location: "Timbuc Underground (Map011)",
        x: 8,
        y: 15,
        dialogue: [
            "Looking for A.S.P. fragments? I know all the maintenance tunnels in the city.",
            "I can guide you through shortcuts to reach those hidden server rooms quickly.",
            "The digital realm has physical access points. I'll show you where they are."
        ],
        helperType: "transport",
        questLine: "A.S.P. Fragments",
        destinations: [
            { name: "Abandoned Server Farm", mapId: 37 },
            { name: "Corporate Database", mapId: 106 },
            { name: "Old Network Hub", mapId: 27 }
        ],
        transportFlag: "HELPER_NAVIGATOR_TRANSPORTED"
    },
    {
        name: "Trash Barge Captain",
        appearance: "Actor2",
        index: 3,
        location: "Timbuc Landfill (Map023)",
        x: 10,
        y: 10,
        dialogue: [
            "Helping the Trash King find lost treasures? My barge can take you to the floating garbage islands.",
            "These islands form and break apart constantly. Without my navigation, you'd never find them.",
            "All aboard when you're ready to set sail on the sea of garbage!"
        ],
        helperType: "transport",
        questLine: "Trash Octopus Treasures",
        destinations: [
            { name: "Electronics Island", mapId: 24 },
            { name: "Appliance Atoll", mapId: 25 },
            { name: "Pre-Collapse Dump", mapId: 26 }
        ],
        transportFlag: "HELPER_CAPTAIN_TRANSPORTED"
    },
    {
        name: "Caravan Master",
        appearance: "Actor1",
        index: 0,
        location: "Timbuc Central Plaza (Map114)",
        x: 12,
        y: 12,
        dialogue: [
            "Working with the trading caravan? My brahmin can carry you and your goods safely.",
            "We travel between all major settlements. Just hop on when you're ready.",
            "The wasteland is dangerous, but my routes avoid the worst of it."
        ],
        helperType: "transport",
        questLine: "Wasteland Trading Caravan",
        destinations: [
            { name: "Northern Settlement", mapId: 5 },
            { name: "Eastern Outpost", mapId: 7 },
            { name: "Southern Trading Post", mapId: 12 }
        ],
        transportFlag: "HELPER_CARAVAN_TRANSPORTED"
    },
    {
        name: "Underground Farmer",
        appearance: "Actor3",
        index: 7,
        location: "Timbuc Cellar (Map015)",
        x: 15,
        y: 15,
        dialogue: [
            "Part of the farming collective? I know all the hidden growing chambers.",
            "I can take you directly to any of our facilities through these maintenance tunnels.",
            "The network connects all our growing operations. Keeps them hidden from corporations."
        ],
        helperType: "transport",
        questLine: "Underground Farming Collective",
        destinations: [
            { name: "Hydroponic Chamber", mapId: 16 },
            { name: "Mushroom Cave", mapId: 17 },
            { name: "Seed Bank", mapId: 27 }
        ],
        transportFlag: "HELPER_FARMER_TRANSPORTED"
    },
    
    // Secret Area Unlockers
    {
        name: "Former Security Guard",
        appearance: "Actor1",
        index: 3,
        location: "NeuraTech Facility (Map106)",
        x: 8,
        y: 8,
        dialogue: [
            "Looking for emotion chip research? I used to work security here.",
            "I can unlock the restricted laboratory area for you. My credentials still work.",
            "Just don't tell anyone I helped you. I still need this job."
        ],
        helperType: "unlocker",
        questLine: "Synthetic Emotions",
        unlocksArea: "Restricted Laboratory",
        unlockFlag: "HELPER_GUARD_UNLOCKED_LAB"
    },
    {
        name: "Maintenance Worker",
        appearance: "Actor2",
        index: 5,
        location: "Timbuc 2 (Map002)",
        x: 12,
        y: 18,
        dialogue: [
            "Need access to the vending machine factory? I maintain the building systems there.",
            "I can let you into the production floor through the service entrance.",
            "The machines are becoming sentient, aren't they? I've noticed strange behavior myself."
        ],
        helperType: "unlocker",
        questLine: "Vending Machine Revolution",
        unlocksArea: "Production Floor",
        unlockFlag: "HELPER_WORKER_UNLOCKED_FACTORY"
    },
    {
        name: "Museum Curator",
        appearance: "Actor3",
        index: 0,
        location: "Timbuc 2 (Map002)",
        x: 18,
        y: 10,
        dialogue: [
            "Helping the Wasteland Historians? I can give you access to our private collection.",
            "These artifacts aren't on public display due to their sensitive nature.",
            "Professor Memento will find these records invaluable for the historical archive."
        ],
        helperType: "unlocker",
        questLine: "Wasteland Historians",
        unlocksArea: "Private Collection",
        unlockFlag: "HELPER_CURATOR_UNLOCKED_COLLECTION"
    },
    {
        name: "Sewer Maintenance Chief",
        appearance: "Actor1",
        index: 7,
        location: "Timbuc Underground (Map011)",
        x: 15,
        y: 10,
        dialogue: [
            "Looking for those burlap pants shipments? They're coming through the old sewer system.",
            "I can unlock the sealed section where the distribution center is located.",
            "Been wondering why the sewers are full of pants. Now it makes sense."
        ],
        helperType: "unlocker",
        questLine: "Burlap Pants Conspiracy",
        unlocksArea: "Sealed Sewer Section",
        unlockFlag: "HELPER_CHIEF_UNLOCKED_SEWER"
    },
    {
        name: "Abandoned Facility Caretaker",
        appearance: "Actor2",
        index: 6,
        location: "Ruined Suburbs (Map005)",
        x: 10,
        y: 15,
        dialogue: [
            "Looking for a place to set up the cooking competition? I watch over the old convention center.",
            "It's mostly intact, just sealed up after the collapse. I can open it for you.",
            "Perfect venue for Chef Hazmat's competition. Big kitchen, dining area, everything you need."
        ],
        helperType: "unlocker",
        questLine: "Mutant Cooking Show",
        unlocksArea: "Convention Center",
        unlockFlag: "HELPER_CARETAKER_UNLOCKED_CENTER"
    },
    
    // Specialized Service Providers
    {
        name: "Weapon Modifier",
        appearance: "Actor1",
        index: 2,
        location: "Timbuc Market (Map010)",
        x: 15,
        y: 18,
        dialogue: [
            "Rescuing mutant animals from fighting rings? You'll need non-lethal weapons.",
            "I can modify your gear to stun rather than kill. Perfect for rescue operations.",
            "These mods are temporary but should last for your current mission."
        ],
        helperType: "service_provider",
        questLine: "Mutant Pet Rescue",
        serviceType: "Weapon Modification",
        serviceFlag: "HELPER_MODIFIER_SERVICED"
    },
    {
        name: "Vehicle Mechanic",
        appearance: "Actor2",
        index: 4,
        location: "Timbuc 2 (Map002)",
        x: 8,
        y: 10,
        dialogue: [
            "Racing for Nitro? I can tune up your vehicle for the Death Race.",
            "This special nitro injection system will give you bursts of speed when you need it most.",
            "Just don't blow up the engine. These mods push the limits of what's safe."
        ],
        helperType: "service_provider",
        questLine: "Neon Street Racing",
        serviceType: "Vehicle Tuning",
        serviceFlag: "HELPER_MECHANIC_SERVICED"
    },
    {
        name: "Drone Programmer",
        appearance: "Actor3",
        index: 3,
        location: "Timbuc 2 Internet Cafe (Map008)",
        x: 10,
        y: 8,
        dialogue: [
            "Working with Hive Mind? I can reprogram salvaged corporate drones for your swarm.",
            "Just bring me any drones you find, and I'll convert them to your control system.",
            "Each drone adds to the swarm's processing power and capabilities."
        ],
        helperType: "service_provider",
        questLine: "Drone Swarm Commander",
        serviceType: "Drone Reprogramming",
        serviceFlag: "HELPER_PROGRAMMER_SERVICED"
    },
    {
        name: "Cybernetic Installer",
        appearance: "Actor1",
        index: 1,
        location: "The Squeaky Clean (Map105)",
        x: 18,
        y: 8,
        dialogue: [
            "Dr. Circuit sent you? I can install temporary experimental enhancements.",
            "These mods will give you capabilities beyond standard implants, but they're not permanent.",
            "Perfect for testing before committing to permanent installation."
        ],
        helperType: "service_provider",
        questLine: "Cybernetic Enhancement",
        serviceType: "Temporary Implants",
        serviceFlag: "HELPER_INSTALLER_SERVICED"
    },
    {
        name: "Memory Analyzer",
        appearance: "Actor2",
        index: 0,
        location: "Timbuc 2 (Map002)",
        x: 15,
        y: 8,
        dialogue: [
            "Collecting memories for Mnemosyne? I can analyze them for authenticity and value.",
            "Many memories on the market are fabricated or corrupted. I can spot the fakes.",
            "This service will save you from wasting time on worthless memories."
        ],
        helperType: "service_provider",
        questLine: "Memory Merchant",
        serviceType: "Memory Authentication",
        serviceFlag: "HELPER_ANALYZER_SERVICED"
    }
];
