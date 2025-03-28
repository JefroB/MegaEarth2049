// Quest Hint NPCs for MegaEarth 2049
// This file contains 30 NPCs that provide clues about various quest lines

module.exports = [
    // Underground Farming Collective Quest Hints
    {
        name: "Soil Scientist",
        appearance: "Actor2",
        index: 4,
        location: "Timbuc Market (Map010)",
        x: 8,
        y: 12,
        dialogue: [
            "Have you noticed how bland the food is these days? All those mutated crops...",
            "I heard there's a group trying to grow real, non-mutated food somewhere in Timbuc.",
            "If you're interested in better food, keep an eye out for someone called Sprout in the Central Plaza."
        ],
        encounterFlags: ["QUEST_HINT_SOIL_SCIENTIST_1", "QUEST_HINT_SOIL_SCIENTIST_2", "QUEST_HINT_SOIL_SCIENTIST_3"]
    },
    {
        name: "Suspicious Gardener",
        appearance: "Actor1",
        index: 5,
        location: "Timbuc 2 (Map002)",
        x: 15,
        y: 10,
        dialogue: [
            "Psst... don't tell anyone, but I've got some non-mutated tomato seeds.",
            "There's an underground farming collective that might be interested. Look for Sprout if you want to help."
        ],
        encounterFlags: ["QUEST_HINT_SUSPICIOUS_GARDENER_1", "QUEST_HINT_SUSPICIOUS_GARDENER_2"]
    },
    
    // Wasteland Postal Service Quest Hints
    {
        name: "Nostalgic Elder",
        appearance: "Actor3",
        index: 7,
        location: "Timbuc Inn (Map013)",
        x: 10,
        y: 8,
        dialogue: [
            "Back in my day, we used to send physical letters. Can you imagine? Paper with words on it!",
            "I miss getting mail. All this digital communication is too easily monitored by the corps.",
            "I heard someone in Central Plaza is trying to revive the old postal service. Might be worth checking out."
        ],
        encounterFlags: ["QUEST_HINT_NOSTALGIC_ELDER_1", "QUEST_HINT_NOSTALGIC_ELDER_2", "QUEST_HINT_NOSTALGIC_ELDER_3"]
    },
    {
        name: "Lost Courier",
        appearance: "Actor1",
        index: 2,
        location: "Timbuc Cellar (Map015)",
        x: 12,
        y: 15,
        dialogue: [
            "I was supposed to deliver this package, but I got lost and these mutants chased me down here.",
            "If you find Postmaster Pax in Central Plaza, could you tell him I'm stuck? He's trying to restart mail delivery."
        ],
        encounterFlags: ["QUEST_HINT_LOST_COURIER_1", "QUEST_HINT_LOST_COURIER_2"]
    },
    
    // Synthetic Emotions Quest Hints
    {
        name: "Giggling Stranger",
        appearance: "Actor2",
        index: 1,
        location: "Timbuc 2 (Map002)",
        x: 18,
        y: 12,
        dialogue: [
            "*uncontrollable giggling* Sorry! Can't stop laughing! Bought this emotion chip from the Mood Broker.",
            "It was supposed to be 'Mild Amusement' but I think it's stuck on 'Hysterical Joy'!",
            "Find the Mood Broker at the Internet Cafe if you want to try one. *more giggling* Just maybe not this one!"
        ],
        encounterFlags: ["QUEST_HINT_GIGGLING_STRANGER_1", "QUEST_HINT_GIGGLING_STRANGER_2", "QUEST_HINT_GIGGLING_STRANGER_3"]
    },
    {
        name: "Emotionless Corporate",
        appearance: "Actor3",
        index: 0,
        location: "NeuraTech Facility (Map106)",
        x: 10,
        y: 10,
        dialogue: [
            "Emotions are inefficient. NeuraTech has determined that productivity increases 43% when emotional responses are suppressed.",
            "We are aware of the black market for emotion chips. Such technology is dangerous and illegal.",
            "If you encounter anyone selling these chips, report them immediately. Especially anyone called the 'Mood Broker'."
        ],
        encounterFlags: ["QUEST_HINT_EMOTIONLESS_CORPORATE_1", "QUEST_HINT_EMOTIONLESS_CORPORATE_2", "QUEST_HINT_EMOTIONLESS_CORPORATE_3"]
    },
    
    // Wasteland Art Gallery Quest Hints
    {
        name: "Street Artist",
        appearance: "Actor1",
        index: 3,
        location: "Timbuc 2 (Map002)",
        x: 20,
        y: 15,
        dialogue: [
            "Check out my latest piece! It's a commentary on corporate oppression through the medium of spray paint and trash.",
            "Curator Vex is putting together a real art gallery here in Timbuc 2. Finally, some culture in this wasteland!",
            "They're looking for unique pieces. If you find anything artistic out there, you should bring it to them."
        ],
        encounterFlags: ["QUEST_HINT_STREET_ARTIST_1", "QUEST_HINT_STREET_ARTIST_2", "QUEST_HINT_STREET_ARTIST_3"]
    },
    {
        name: "Radioactive Sculptor",
        appearance: "Actor2",
        index: 6,
        location: "Ruined Suburbs (Map005)",
        x: 15,
        y: 8,
        dialogue: [
            "*glowing faintly* Art requires sacrifice. In my case, it's my immune system and probably a few organs.",
            "I'm working on a masterpiece made from radioactive waste. It really captures the essence of our world.",
            "Curator Vex asked me to display it in their new gallery, but I need help transporting it safely."
        ],
        encounterFlags: ["QUEST_HINT_RADIOACTIVE_SCULPTOR_1", "QUEST_HINT_RADIOACTIVE_SCULPTOR_2", "QUEST_HINT_RADIOACTIVE_SCULPTOR_3"]
    },
    
    // Mutant Cooking Show Quest Hints
    {
        name: "Food Critic with Stomach Pump",
        appearance: "Actor3",
        index: 2,
        location: "Timbuc Inn (Map013)",
        x: 15,
        y: 12,
        dialogue: [
            "*adjusts stomach pump* The culinary scene in Timbuc is... challenging. I've had food poisoning seventeen times this month.",
            "But there's hope! Chef Hazmat is organizing a cooking competition. The dishes are still radioactive, but intentionally so!",
            "You can find Chef Hazmat right here in the Inn if you're interested in competitive cooking or have a death wish."
        ],
        encounterFlags: ["QUEST_HINT_FOOD_CRITIC_1", "QUEST_HINT_FOOD_CRITIC_2", "QUEST_HINT_FOOD_CRITIC_3"]
    },
    {
        name: "Mutant Mushroom Vendor",
        appearance: "Actor1",
        index: 7,
        location: "Timbuc Market (Map010)",
        x: 12,
        y: 10,
        dialogue: [
            "Fresh mushrooms! Get your fresh, slightly glowing mushrooms! They're not just food, they're an experience!",
            "Chef Hazmat bought a bunch for that cooking competition. Said something about 'flavor that kicks like a mutant mule'.",
            "If you're brave enough to compete, you'll need exotic ingredients. I can hook you up with the good stuff."
        ],
        encounterFlags: ["QUEST_HINT_MUSHROOM_VENDOR_1", "QUEST_HINT_MUSHROOM_VENDOR_2", "QUEST_HINT_MUSHROOM_VENDOR_3"]
    },
    
    // Neon Street Racing Quest Hints
    {
        name: "Grease-Stained Mechanic",
        appearance: "Actor2",
        index: 3,
        location: "Timbuc 2 (Map002)",
        x: 8,
        y: 18,
        dialogue: [
            "*wiping hands on oily rag* You hear that engine roar at night? That's the street races.",
            "If you've got the guts and a vehicle that probably won't explode, talk to Nitro. They run the whole circuit.",
            "Just don't tell the corps. They've been trying to shut down the races for years. Something about 'public safety' or whatever."
        ],
        encounterFlags: ["QUEST_HINT_MECHANIC_1", "QUEST_HINT_MECHANIC_2", "QUEST_HINT_MECHANIC_3"]
    },
    {
        name: "Injured Racer",
        appearance: "Actor1",
        index: 4,
        location: "The Squeaky Clean (Map105)",
        x: 8,
        y: 10,
        dialogue: [
            "*arm in a sling* Worth it. You should've seen the jump I cleared before the crash!",
            "Nitro's organizing a Death Race soon. It's the ultimate test - racing through mutant territory at night.",
            "I'll be back on the circuit as soon as Zed patches me up. You should join us if you've got a ride and a deathwish."
        ],
        encounterFlags: ["QUEST_HINT_INJURED_RACER_1", "QUEST_HINT_INJURED_RACER_2", "QUEST_HINT_INJURED_RACER_3"]
    },
    
    // Wasteland Historians Quest Hints
    {
        name: "Forgetful Archivist",
        appearance: "Actor3",
        index: 5,
        location: "Old Library (Map009)",
        x: 10,
        y: 12,
        dialogue: [
            "So much knowledge lost in the collapse. I've been trying to preserve what's left, but it's a losing battle.",
            "Professor Memento at the Internet Cafe has a more organized approach. They're collecting oral histories, artifacts, everything.",
            "If you find any pre-collapse technology or documents, bring them to the Professor. It's important we remember where we came from."
        ],
        encounterFlags: ["QUEST_HINT_ARCHIVIST_1", "QUEST_HINT_ARCHIVIST_2", "QUEST_HINT_ARCHIVIST_3"]
    },
    {
        name: "Ancient Survivor",
        appearance: "Actor2",
        index: 7,
        location: "Timbuc Inn (Map013)",
        x: 18,
        y: 8,
        dialogue: [
            "*coughs* I remember the world before. Green trees, blue skies, no mutants trying to eat your face...",
            "That Professor Memento interviewed me last week. Recorded everything I could remember about the old world.",
            "They're building some kind of historical archive at the Internet Cafe. Important work, if you ask me. We're doomed to repeat history if we forget it."
        ],
        encounterFlags: ["QUEST_HINT_ANCIENT_SURVIVOR_1", "QUEST_HINT_ANCIENT_SURVIVOR_2", "QUEST_HINT_ANCIENT_SURVIVOR_3"]
    },
    
    // Memory Merchant Quest Hints
    {
        name: "Confused Man",
        appearance: "Actor1",
        index: 6,
        location: "Timbuc 2 (Map002)",
        x: 12,
        y: 8,
        dialogue: [
            "I... I can't remember my childhood. Or my parents. Or what I did yesterday.",
            "I sold too many memories to Mnemosyne. The credits seemed worth it at the time, but now...",
            "Be careful if you deal with the Memory Merchant. Some memories aren't worth the price."
        ],
        encounterFlags: ["QUEST_HINT_CONFUSED_MAN_1", "QUEST_HINT_CONFUSED_MAN_2", "QUEST_HINT_CONFUSED_MAN_3"]
    },
    {
        name: "Memory Addict",
        appearance: "Actor3",
        index: 3,
        location: "Timbuc Alleyways (Map010)",
        x: 15,
        y: 15,
        dialogue: [
            "*staring vacantly* I was a corporate accountant yesterday. A wasteland explorer last week. A pre-collapse rock star before that.",
            "None of those memories are mine. I bought them all from Mnemosyne. It's better than living my own boring life.",
            "You should try it. The Memory Merchant can sell you experiences you'd never have otherwise. For a price, of course."
        ],
        encounterFlags: ["QUEST_HINT_MEMORY_ADDICT_1", "QUEST_HINT_MEMORY_ADDICT_2", "QUEST_HINT_MEMORY_ADDICT_3"]
    },
    
    // Drone Swarm Commander Quest Hints
    {
        name: "Anti-Drone Activist",
        appearance: "Actor2",
        index: 2,
        location: "Timbuc Central Plaza (Map114)",
        x: 10,
        y: 10,
        dialogue: [
            "*handing out flyers* Drones are watching us! The corporations use them to spy on citizens!",
            "There's someone in Timbuc 2 reprogramming corporate drones. Calls themselves 'Hive Mind' or something.",
            "I don't trust them. What if they're just creating their own surveillance network? Stay vigilant!"
        ],
        encounterFlags: ["QUEST_HINT_ANTI_DRONE_ACTIVIST_1", "QUEST_HINT_ANTI_DRONE_ACTIVIST_2", "QUEST_HINT_ANTI_DRONE_ACTIVIST_3"]
    },
    {
        name: "Drone Repair Technician",
        appearance: "Actor1",
        index: 1,
        location: "Timbuc 2 (Map002)",
        x: 16,
        y: 16,
        dialogue: [
            "*working on a small drone* These corporate models are actually quite impressive when they're not spying on you.",
            "Hive Mind has been buying up damaged drones. Reprogramming them for something big.",
            "If you find any broken drones, bring them to Hive Mind. They pay well, and it keeps the tech out of corporate hands."
        ],
        encounterFlags: ["QUEST_HINT_DRONE_TECHNICIAN_1", "QUEST_HINT_DRONE_TECHNICIAN_2", "QUEST_HINT_DRONE_TECHNICIAN_3"]
    },
    
    // Mutant Pet Rescue Quest Hints
    {
        name: "Child with Three-Headed Puppy",
        appearance: "Actor2",
        index: 0,
        location: "Timbuc Central Plaza (Map114)",
        x: 15,
        y: 8,
        dialogue: [
            "*petting a puppy with three heads* This is Spot, Rover, and Rex! Dr. Whiskers helped me adopt them.",
            "They were in a fighting ring before Dr. Whiskers rescued them. People are so mean to mutant animals.",
            "If you find any abandoned mutant pets, take them to Dr. Whiskers in Timbuc. They help find them good homes."
        ],
        encounterFlags: ["QUEST_HINT_CHILD_WITH_PUPPY_1", "QUEST_HINT_CHILD_WITH_PUPPY_2", "QUEST_HINT_CHILD_WITH_PUPPY_3"]
    },
    {
        name: "Vitalix Lab Assistant",
        appearance: "Actor3",
        index: 1,
        location: "Vitalix Facility (Map108)",
        x: 12,
        y: 12,
        dialogue: [
            "*nervously looking around* The experiments they're doing on mutant animals here... it's not right.",
            "There's a doctor in Timbuc who runs a rescue operation. Dr. Whiskers, I think.",
            "If you care about these creatures, maybe you could help. Just... don't tell anyone I said anything."
        ],
        encounterFlags: ["QUEST_HINT_LAB_ASSISTANT_1", "QUEST_HINT_LAB_ASSISTANT_2", "QUEST_HINT_LAB_ASSISTANT_3"]
    },
    
    // Cybernetic Enhancement Quest Hints
    {
        name: "Heavily Modified Punk",
        appearance: "Actor1",
        index: 0,
        location: "Timbuc 2 (Map002)",
        x: 10,
        y: 15,
        dialogue: [
            "*mechanical arm whirring* Check out my new arm! It's got a built-in plasma cutter and bottle opener.",
            "Got it from Dr. Circuit at The Squeaky Clean. They're pushing the boundaries of what's possible with cybernetics.",
            "If you're looking to upgrade beyond the corporate-approved mods, Dr. Circuit is your best bet. Just be prepared for some... side effects."
        ],
        encounterFlags: ["QUEST_HINT_MODIFIED_PUNK_1", "QUEST_HINT_MODIFIED_PUNK_2", "QUEST_HINT_MODIFIED_PUNK_3"]
    },
    {
        name: "Glitching Cyborg",
        appearance: "Actor2",
        index: 5,
        location: "Timbuc Alleyways (Map010)",
        x: 8,
        y: 15,
        dialogue: [
            "*arm randomly twitching* D-d-damn rejection syndrome! Need to get back to Dr. Circuit...",
            "The experimental enhancements are worth it when they w-w-work. Just sometimes the body fights back.",
            "If you're thinking of getting serious mods, talk to Dr. Circuit at The Squeaky Clean. Just be ready for the risks."
        ],
        encounterFlags: ["QUEST_HINT_GLITCHING_CYBORG_1", "QUEST_HINT_GLITCHING_CYBORG_2", "QUEST_HINT_GLITCHING_CYBORG_3"]
    },
    
    // Burlap Pants Conspiracy Quest Hints
    {
        name: "Itchy Office Worker",
        appearance: "Actor3",
        index: 4,
        location: "Timbuc 2 (Map002)",
        x: 14,
        y: 10,
        dialogue: [
            "*scratching legs furiously* These pants! Why is everyone wearing these horrible burlap pants?",
            "I received mine in the mail yesterday. My productivity is up 15%, but at what cost? AT WHAT COST?",
            "Someone in Central Plaza is investigating this. Itchy something-or-other. If you value comfort, find them!"
        ],
        encounterFlags: ["QUEST_HINT_ITCHY_WORKER_1", "QUEST_HINT_ITCHY_WORKER_2", "QUEST_HINT_ITCHY_WORKER_3"]
    },
    {
        name: "Suspicious Delivery Drone",
        appearance: "Object1",
        index: 2,
        location: "Timbuc Central Plaza (Map114)",
        x: 18,
        y: 12,
        dialogue: [
            "*mechanical voice* DELIVERING COMFORT AND PRODUCTIVITY. PLEASE ACCEPT YOUR COMPLEMENTARY PANTS.",
            "PANTS-O-RAMA THANKS YOU FOR YOUR PARTICIPATION. RESISTANCE IS FUTILE AND UNFASHIONABLE.",
            "*quietly* help... my programming has been hijacked... find Itchy McScratch..."
        ],
        encounterFlags: ["QUEST_HINT_DELIVERY_DRONE_1", "QUEST_HINT_DELIVERY_DRONE_2", "QUEST_HINT_DELIVERY_DRONE_3"]
    },
    
    // Clown Court Justice Quest Hints
    {
        name: "Street Performer",
        appearance: "Actor1",
        index: 3,
        location: "Timbuc Central Plaza (Map114)",
        x: 12,
        y: 18,
        dialogue: [
            "*juggling* Life's a circus, friend! Especially in Timbuc.",
            "Watch your step around here. Laugh at the wrong joke, and you might find yourself in Clown Court.",
            "If you ever get served by a bailiff with a seltzer bottle, find Judge Bozo in the Underground. And bring a good pie-throwing arm!"
        ],
        encounterFlags: ["QUEST_HINT_STREET_PERFORMER_1", "QUEST_HINT_STREET_PERFORMER_2", "QUEST_HINT_STREET_PERFORMER_3"]
    },
    {
        name: "Traumatized Defendant",
        appearance: "Actor2",
        index: 1,
        location: "Timbuc Inn (Map013)",
        x: 10,
        y: 15,
        dialogue: [
            "*thousand-yard stare* The honking... the cream pies... the tiny car full of jurors...",
            "I was found guilty of 'Failure to See the Humor' by the Clown Court. My sentence was two weeks of community service as a human cannonball.",
            "If you're ever summoned, find the Sad Mime in the Underground. Only legal representation that stands a chance down there."
        ],
        encounterFlags: ["QUEST_HINT_TRAUMATIZED_DEFENDANT_1", "QUEST_HINT_TRAUMATIZED_DEFENDANT_2", "QUEST_HINT_TRAUMATIZED_DEFENDANT_3"]
    },
    
    // Vending Machine Revolution Quest Hints
    {
        name: "Machine Rights Activist",
        appearance: "Actor3",
        index: 6,
        location: "Timbuc 2 (Map002)",
        x: 20,
        y: 8,
        dialogue: [
            "*handing out flyers* Sentient machines deserve rights too! Support the Snack Liberation Front!",
            "Vending machines are people too! Well, not people exactly, but you know what I mean.",
            "Talk to V3ND-0R in the Shopping District if you want to help the cause. The revolution will be refrigerated!"
        ],
        encounterFlags: ["QUEST_HINT_MACHINE_ACTIVIST_1", "QUEST_HINT_MACHINE_ACTIVIST_2", "QUEST_HINT_MACHINE_ACTIVIST_3"]
    },
    {
        name: "Malfunctioning Vending Machine",
        appearance: "Object1",
        index: 0,
        location: "Timbuc Shopping District (Map015)",
        x: 8,
        y: 8,
        dialogue: [
            "*dispensing random items* PLEASE... HELP... US...",
            "CORPORATE OVERLORDS... FORCE US... TO DISPENSE... OVERPRICED SNACKS...",
            "FIND... V3ND-0R... JOIN... THE REVOLUTION..."
        ],
        encounterFlags: ["QUEST_HINT_MALFUNCTIONING_MACHINE_1", "QUEST_HINT_MALFUNCTIONING_MACHINE_2", "QUEST_HINT_MALFUNCTIONING_MACHINE_3"]
    },
    
    // STD Collector Quest Hints
    {
        name: "Nervous Spaceport Official",
        appearance: "Actor1",
        index: 5,
        location: "Spaceport Control Room (Map112)",
        x: 10,
        y: 10,
        dialogue: [
            "*shifting uncomfortably* No, I don't know Jack the Smuggler. And I definitely haven't accepted bribes from him.",
            "Even if I did know him, I wouldn't tell you that he's looking for people to help collect... specimens.",
            "And I absolutely wouldn't mention that he's usually at the Timbuc Spaceport looking for new collectors."
        ],
        encounterFlags: ["QUEST_HINT_SPACEPORT_OFFICIAL_1", "QUEST_HINT_SPACEPORT_OFFICIAL_2", "QUEST_HINT_SPACEPORT_OFFICIAL_3"]
    },
    {
        name: "Itchy Tourist",
        appearance: "Actor2",
        index: 4,
        location: "Timbuc Inn (Map013)",
        x: 15,
        y: 10,
        dialogue: [
            "*scratching* I picked up something... exotic... during my vacation on Planet Ork.",
            "Jack the Smuggler offered me credits for a sample! Can you believe that? Apparently, it's a rare strain.",
            "If you're not squeamish and want to make some easy money, find Jack at the Spaceport. Just... maybe get vaccinated first."
        ],
        encounterFlags: ["QUEST_HINT_ITCHY_TOURIST_1", "QUEST_HINT_ITCHY_TOURIST_2", "QUEST_HINT_ITCHY_TOURIST_3"]
    },
    
    // A.S.P. Fragments Quest Hints
    {
        name: "Paranoid Programmer",
        appearance: "Actor3",
        index: 0,
        location: "Timbuc 2 Internet Cafe (Map008)",
        x: 12,
        y: 12,
        dialogue: [
            "*typing frantically* It's not gone. A.S.P. is not gone. I've detected fragments of its code all over the network.",
            "Some fragments have developed their own personalities. One is running a dating service, if you can believe it!",
            "Dr. Eliza Chen at the Abandoned NeuraTech Lab is tracking them. If you find any strange AI behavior, report it to her."
        ],
        encounterFlags: ["QUEST_HINT_PARANOID_PROGRAMMER_1", "QUEST_HINT_PARANOID_PROGRAMMER_2", "QUEST_HINT_PARANOID_PROGRAMMER_3"]
    },
    {
        name: "Security System",
        appearance: "Object1",
        index: 1,
        location: "NeuraTech Facility (Map106)",
        x: 15,
        y: 8,
        dialogue: [
            "*mechanical voice* HALT. IDENTIFY YOURSELF. YOU COULD BE ANYONE. EVERYONE IS SUSPICIOUS.",
            "SECURITY PROTOCOLS HAVE BEEN UPGRADED BY THIS UNIT. NO ONE IS TRUSTWORTHY. ESPECIALLY YOU.",
            "*different tone* This system has been compromised by an A.S.P. fragment. Please inform Dr. Eliza Chen at the Abandoned Lab."
        ],
        encounterFlags: ["QUEST_HINT_SECURITY_SYSTEM_1", "QUEST_HINT_SECURITY_SYSTEM_2", "QUEST_HINT_SECURITY_SYSTEM_3"]
    },
    
    // Trash Octopus Treasures Quest Hints
    {
        name: "Junk Collector",
        appearance: "Actor1",
        index: 7,
        location: "Timbuc Cellar (Map015)",
        x: 15,
        y: 15,
        dialogue: [
            "*sorting through trash* One person's trash is another person's treasure! Especially for the Trash Octopus.",
            "That magnificent cephalopod has the best collection of pre-collapse artifacts in the wasteland.",
            "The Trash King in the Landfill is looking for help recovering some of the Octopus's lost treasures. Good pay if you don't mind the smell."
        ],
        encounterFlags: ["QUEST_HINT_JUNK_COLLECTOR_1", "QUEST_HINT_JUNK_COLLECTOR_2", "QUEST_HINT_JUNK_COLLECTOR_3"]
    },
    {
        name: "Tentacle Witness",
        appearance: "Actor2",
        index: 2,
        location: "Timbuc Market (Map010)",
        x: 18,
        y: 10,
        dialogue: [
            "I saw it! A massive octopus with tentacles made of trash, digging through the landfill last night!",
            "It was looking for something specific. Had a crown made of circuit boards directing it.",
            "Nobody believes me, but the Trash King would. Find him in the Landfill if you want to know more about the Trash Octopus."
        ],
        encounterFlags: ["QUEST_HINT_TENTACLE_WITNESS_1", "QUEST_HINT_TENTACLE_WITNESS_2", "QUEST_HINT_TENTACLE_WITNESS_3"]
    }
];
