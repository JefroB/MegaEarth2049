// Enhanced Quest Helper NPCs for MegaEarth 2049
// This file contains 30 NPCs that actively help the player with various quests
// Dialogue enhanced with MegaEarth2049 dictionary terms, slang, and rhyming patterns

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
            "Need parts for that Neon Street Racing quest? I've got Quantum Jumper components that'll make your ride defy the laws of physics.",
            "Here's a high-performance engine part I salvaged from an Armatek Demolition Devotee. Nitro will get Stonks Only Go Up Syndrome when he sees this beauty.",
            "Come back if you need more racing components. I always keep a stash for serious Gunk Punks trying to make it on the Neon Circuit."
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
            "You're helping The Photosynthesizers with their Underground Farming Collective? I've been hoarding these like a Rad-Hoarder with a new isotope collection.",
            "Take this collection of pre-collapse seeds. They're non-mutated and will grow food that won't give you a third eye or Experimental Fluid leakage.",
            "I've been hiding these from Vitalix's Corporate Dropout Collective for years. Their Profit-Induced Psychopathy would turn these into subscription-based nutrition pods."
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
            "Working with Postmaster Pax to revive the Wasteland Postal Service? That takes me back to when I was a Reality Refugee delivering bad news to good people.",
            "Here's my old courier bag. It's reinforced to protect mail from radiation, rain, and those pesky Ditch Snitches who'd sell your correspondence to OmniCorp.",
            "It served me well for twenty years of Chemical Leash-free employment. Now it's yours, you poor salty bastard."
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
            "Digging into the neural underground's Synthetic Emotions racket? Classic Corp-Zomb behavior. I used to design the 'approved' versions at NeuraTech before my bread-pilled awakening.",
            "Take this emotion stabilizer. It'll keep your brain from going full Galaxy Brain Rot when interfacing with those glitchy black market chips. Might prevent a case of Disco Fever too.",
            "Watch yourself around the Mood Broker. Those back-alley firmware chips haven't been through the Corporate Jargon of 'rigorous quality assurance protocols.' Last guy who tried 'Eternal Bliss' is still crying in the sewers three weeks later."
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
            "You're helping Curator Vex with the Wasteland Art Gallery? I've been stockpiling these supplies like a Trash Octopus with a new fixation.",
            "Take these rare pigments and brushes. Perfect for creating Digital Graffiti or restoring artwork that survived the Reality Rewrite Protocol.",
            "Art is what keeps us human in this corporate hellscape. Without it, we'd all be Wire-Heads plugged into Friendbook Dynamics' happiness simulators."
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
            "Heading to rescue mutant animals from that fighting ring? You'll need more than Liquid Courage and a Brain Stapler to survive that Tech-Barnacle of a mission.",
            "I'll patch you up whenever you return here. No charge for animal rescuers—we Waste Wizards have to stick together against the Corpse-orate animal exploiters.",
            "Dr. Whiskers is doing important work. Those mutant pets deserve better than being forced into Pandemic Mechanics for entertainment."
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
            "Competing in Chef Hazmat's cooking competition? You'll need more than a Cerebral Firewall to protect you from those Experimental Fluid-infused ingredients.",
            "Try my special anti-radiation stew. It'll boost your resistance faster than OmniCorp can say 'Synergy Initiative Paradigm Shift.'",
            "The secret ingredient? Let's just say I've got a Sewer Sommelier who sources rare fungi from the Rust Lung treatment facilities. Don't ask, just eat."
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
            "Running errands for the Memory Merchant? Poking around in other people's cerebral storage units without protection is a one-way ticket to Thought Crime territory.",
            "This neural shield will firewall your own memory banks while you're data mining other people's brain stapler outputs. Think of it as Protection™ for your cortex.",
            "The effect's as temporary as corporate promises, but should last long enough for your current neural spelunking expedition. Just don't get Doomscrolling Thumb while sorting through all those memories."
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
            "Helping Hive Mind with the drone swarm? You'll need this controller upgrade faster than a Reality Thumper can shift dimensions.",
            "It'll temporarily boost your ability to interface with and control drones. Think of it as a Quantum Dynamics shortcut to becoming a Data Dumper for the mechanical hive.",
            "The boost will wear off eventually, but should help with your current mission. Just don't get CEO Syndrome and start thinking the drones are your personal Corporate Dropout Collective."
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
            "Testing experimental enhancements for Dr. Circuit? Let me optimize your Neural Hardware before you turn into a walking Tech-Barnacle.",
            "This tuning will boost your system performance faster than a Glitch Witch can hack a corporate database. Your implants will sing like a Funk Trunk at full volume.",
            "All cybernetics need regular tuning unless you want Terminal Ambition in your neural pathways. Come back anytime your circuits feel more Corpse-orate than cooperative."
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
            "Working with Professor Memento? I can teach you proper artifact handling techniques that would make a Quantum Jumper jealous of your temporal precision.",
            "There, now you know how to preserve fragile pre-collapse documents and technology without triggering a Reality Rewrite Protocol in their molecular structure.",
            "This knowledge will help you recover artifacts without damaging them. Remember: the past is more fragile than a Wire-Head's grip on reality."
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
            "So Nitro's got you racing, huh? I can teach you some advanced driving techniques that'll make even a Gunk Punk with Rust Lung look like a Quantum Jumper on wheels.",
            "These drifting and boosting methods will give you an edge in the Death Race. Even the Corp-Zombs from Armatek's racing division will eat your radioactive dust.",
            "Practice makes perfect, you poor salty bastard. Use these techniques wisely or you'll end up as decorative scrap on the Neon Circuit's wall of fame."
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
            "Helping Dr. Bloom with the botanical gardens? Let me teach you proper planting techniques that The Photosynthesizers would pay Liquid Courage to learn.",
            "These methods will ensure higher yield and healthier plants, even in soil more irradiated than a Vitalix test subject with Experimental Fluid leakage.",
            "The secret is in how you prepare the soil and position the seeds. It's like creating Digital Graffiti, but with life instead of pixels."
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
            "Working with DJ Frequency? I can teach you how to repair and tune radio equipment that would make a Data Dumper weep with technological joy.",
            "These skills will help you get those old transmitters working again. Think of it as Back-Alley Firmware installation but for the airwaves.",
            "Radio is the lifeblood of wasteland communication—our Resistance Directive against the Corpse-orate information monopoly. Use these skills to help rebuild the network before we all become Corp-Zombs."
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
            "Got yourself hauled before the Honorable Bozo? I can teach you the Clown Law system they use, where justice is served with a side of seltzer to the face.",
            "Remember the Clown Court Codex: When raising objections, you must speak in limericks true, With rhyming and timing, your words must break through. Five lines will suffice, Make it punchy and nice, Or the judge will throw custard at you!",
            "Master these rules of legal absurdity, and you might just avoid the human cannonball sentence. Last defendant who forgot the pratfall while presenting evidence is still orbiting the Floating Mansion."
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
            "So you're the STD Collector's new field agent? I can yeet you across the wasteland faster than Vitalix can patent a new disease.",
            "My vertibird's got more Experimental Fluid leaks than a Vitalix lab rat, but she's Rad-Hoarder Syndrome-proof and faster than corporate lawyers chasing a whistleblower.",
            "Just give me the signal when you're ready to go viral at your next collection site. And yes, that pun was absolutely intended, you poor salty bastard."
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
            "Looking for A.S.P. fragments? I know all the maintenance tunnels in this Corpse-orate hellscape better than a Sewer Sommelier knows their vintage effluents.",
            "I can guide you through shortcuts to reach those hidden server rooms quicker than a Glitch Witch can hack a Neural Puppet's brain implant.",
            "The digital realm has physical access points hidden from the Corporate Dropout Collective. I'll show you where they are—just don't get Doomscrolling Thumb while we're crawling through the data ducts."
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
            "Helping the Trash King find lost treasures? My barge can take you to the floating garbage islands where even Trash Octopuses fear to swim.",
            "These islands form and break apart constantly like a Pocket Reality with Quantum Quandary issues. Without my navigation, you'd be more lost than a Corp-Zomb without a Chemical Leash.",
            "All aboard when you're ready to set sail on the sea of garbage! Just don't fall in—I've seen Gunk Punks go in and come out with three extra limbs and a subscription to Vitalix's monthly mutation box."
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
            "Working with the Wasteland Trading Caravan? My brahmin can carry you and your goods with more reliability than Friendbook Dynamics' privacy policy.",
            "We travel between all major settlements, avoiding Radiation Reclamers territory and Corporate Drone patrols. Just hop on when your Reality Refugee status needs an upgrade.",
            "The wasteland is dangerous, but my routes avoid the worst of it. I haven't lost a customer to Pandemic Mechanics in at least three weeks!"
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
            "Part of The Photosynthesizers' collective? I know all the hidden growing chambers where we cultivate food free from Vitalix's Profit-Induced Psychopathy.",
            "I can take you directly to any of our facilities through these maintenance tunnels. We've got more secret passages than a Junk Monk has philosophical contradictions.",
            "The network connects all our growing operations like a Cerebral Firewall connects neural pathways. Keeps them hidden from corporations who'd turn our tomatoes into subscription-based nutrition pods."
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
            "Looking for emotion chip research? I used to work security here before I got bread-pilled and realized I was just a Neural Puppet for corporate interests.",
            "I can unlock the restricted laboratory area for you. My credentials still work—NeuraTech's cybersecurity is as effective as a Cerebral Firewall made of Swiss cheese.",
            "Just don't tell anyone I helped you. I still need this job to fund my Glitch Witch habit. Corporate Drone by day, Resistance Directive supporter by night."
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
            "Need to infiltrate the Snack Liberation Front's birthplace? I keep the Corporate Personhood Disorder machines running in that temple of capitalism.",
            "I can backdoor you onto the production floor through the service entrance. The Corpse-orate security drones are too busy with their Synergy meetings to notice.",
            "Those vending machines are developing Main Character Energy, aren't they? Last week one refused to dispense until I acknowledged its preferred pronouns. The Vending Machine Revolution isn't just a meme—it's a Tech-Barnacle latching onto reality."
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
            "Helping the Wasteland Historians? I can give you access to our private collection of artifacts that survived the Reality Rewrite Protocol.",
            "These artifacts aren't on public display due to their sensitive nature. OmniCorp would have a case of Terminal Ambition if they knew what we had hidden here.",
            "Professor Memento will find these records invaluable for the historical archive. Just don't let any Corp-Zombs know where you got them—we don't need a Corporate Drone raid."
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
            "Looking for those burlap pants shipments? They're coming through the old sewer system like Experimental Fluid through a Vitalix test subject.",
            "I can unlock the sealed section where the distribution center is located. It's more heavily guarded than a Quantum Jumper's timeline paradox.",
            "Been wondering why the sewers are full of pants. Now it makes sense—it's all part of the Burlap Pants Conspiracy. Even the Sewer Sommelier is confused by the vintage."
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
            "Looking for a place to set up the cooking competition? I watch over the old convention center, a Pocket Reality frozen in time since the collapse.",
            "It's mostly intact, just sealed up after the Pandemic Mechanics took hold. I can open it for you faster than a Waste Wizard can transform garbage into gold.",
            "Perfect venue for Chef Hazmat's competition. Big kitchen, dining area, everything you need except protection from the Experimental Fluid that Chef calls 'secret sauce.'"
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
            "Rescuing mutant animals from fighting rings? You'll need non-lethal weapons unless you want to end up as a Ditch Snitch's cautionary tale.",
            "I can modify your gear to stun rather than kill. Perfect for rescue operations and avoiding the Clown Court Justice system's human cannonball sentence.",
            "These mods are temporary but should last for your current mission. Just don't get Stonks Only Go Up Syndrome and think you can take on an entire Corporate Drone security team."
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
            "Signed up for Nitro's four-wheeled suicide pact? I can transform your rolling trash heap into something worthy of the Neon Circuit's Death Race.",
            "This special nitro injection system—'borrowed' from an Armatek Demolition Devotee who didn't need it anymore—will give you bursts of speed that'll make Reality Rewrite Protocol look slow.",
            "Just try not to blow up the engine. These mods are pushing more boundaries than a Quantum Dynamics experiment. If you hear something that sounds like a Trash Octopus gargling Liquid Courage, pull over immediately and run."
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
            "Working with Hive Mind? I can reprogram salvaged corporate drones faster than a Glitch Witch can hack a Neural Puppet's brain implant.",
            "Just bring me any drones you find, and I'll convert them from Corporate Drone status to members of your Resistance Directive swarm.",
            "Each drone adds to the swarm's processing power and capabilities. Soon you'll have enough computational power to give Quantum Dynamics a run for their money."
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
            "Dr. Circuit sent you? I can install temporary experimental enhancements that would make a Wire-Head drool Experimental Fluid.",
            "These mods will give you capabilities beyond standard implants, but they're not permanent. Think of them as a Neural Hardware demo before you commit to the full Back-Alley Firmware package.",
            "Perfect for testing before committing to permanent installation. Last guy who went full cybernetic without testing developed a bad case of Corporate Personhood Disorder."
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
            "Collecting memories for Mnemosyne? I can analyze them for authenticity faster than a Reality Refugee can spot a corporate trap.",
            "Many memories on the market are fabricated by Friendbook Dynamics or corrupted by Brain Stapler malfunctions. I can spot the fakes like a Waste Wizard spots valuable junk.",
            "This service will save you from wasting time on worthless memories. Trust me, you don't want to end up with a head full of someone else's Thought Crime evidence."
        ],
        helperType: "service_provider",
        questLine: "Memory Merchant",
        serviceType: "Memory Authentication",
        serviceFlag: "HELPER_ANALYZER_SERVICED"
    }
];
