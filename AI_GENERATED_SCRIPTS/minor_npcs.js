// Minor NPCs for MegaEarth 2049
// This file contains 30 minor NPCs with one-liners, some appearing multiple times

module.exports = [
    // Timbuc Area NPCs
    {
        name: "Glitch Junkie",
        appearance: "Actor1",
        index: 4,
        location: "Timbuc Central Plaza (Map114)",
        x: 12,
        y: 15,
        dialogue: [
            "Your implant's leaking code, man. I can see the ones and zeros dripping from your ears.",
            "Still leaking, huh? You're like a walking digital fountain.",
            "Have you tried turning your brain off and on again? Works for my toaster."
        ],
        encounterFlags: ["MINOR_NPC_GLITCH_JUNKIE_1", "MINOR_NPC_GLITCH_JUNKIE_2", "MINOR_NPC_GLITCH_JUNKIE_3"]
    },
    {
        name: "Conspiracy Carl",
        appearance: "Actor2",
        index: 7,
        location: "Timbuc Alleyways (Map010)",
        x: 8,
        y: 12,
        dialogue: [
            "The vending machines are watching us, man! They're recording our snack preferences for the corporations!",
            "Your implant? It's not glitching—it's EVOLVING. Run while you still can!"
        ],
        encounterFlags: ["MINOR_NPC_CONSPIRACY_CARL_1", "MINOR_NPC_CONSPIRACY_CARL_2"]
    },
    {
        name: "Discount Doc",
        appearance: "Actor3",
        index: 3,
        location: "Timbuc Market (Map010)",
        x: 15,
        y: 10,
        dialogue: [
            "Need some barely-expired meds? Only dropped on the floor once, guaranteed!"
        ],
        encounterFlags: ["MINOR_NPC_DISCOUNT_DOC_1"]
    },
    {
        name: "Rusty",
        appearance: "Actor1",
        index: 6,
        location: "Timbuc Cellar (Map015)",
        x: 10,
        y: 8,
        dialogue: [
            "That neural implant's gonna fry your brain faster than an egg on Dorlund asphalt.",
            "Still walking around with that time bomb in your skull? Bold choice."
        ],
        encounterFlags: ["MINOR_NPC_RUSTY_1", "MINOR_NPC_RUSTY_2"]
    },
    {
        name: "Noodle Vendor",
        appearance: "Actor3",
        index: 6,
        location: "Timbuc Inn (Map013)",
        x: 12,
        y: 10,
        dialogue: [
            "My noodles cure radiation poisoning, STDs, and existential dread. Two for one special today!"
        ],
        encounterFlags: ["MINOR_NPC_NOODLE_VENDOR_1"]
    },
    {
        name: "Fashionista Fran",
        appearance: "Actor2",
        index: 0,
        location: "Timbuc 2 (Map002)",
        x: 14,
        y: 12,
        dialogue: [
            "Honey, that implant is SO last apocalypse. Neural mesh is what everyone's wearing this season."
        ],
        encounterFlags: ["MINOR_NPC_FASHIONISTA_FRAN_1"]
    },
    {
        name: "Paranoid Pete",
        appearance: "Actor1",
        index: 7,
        location: "Timbuc Underground (Map015)",
        x: 18,
        y: 15,
        dialogue: [
            "*whispers* Your implant is broadcasting your thoughts to everyone within fifty feet. I can hear you judging my hat."
        ],
        encounterFlags: ["MINOR_NPC_PARANOID_PETE_1"]
    },
    {
        name: "Maintenance Bot M4-RV",
        appearance: "People1",
        index: 3,
        location: "Timbuc 2 (Map002)",
        x: 10,
        y: 18,
        dialogue: [
            "HUMAN DETECTED. PROBABILITY OF CAUSING SYSTEM FAILURE: 98.7%. PLEASE EXIST ELSEWHERE.",
            "YOU AGAIN. SYSTEM CRASHES INCREASE 200% IN YOUR VICINITY."
        ],
        encounterFlags: ["MINOR_NPC_MAINTENANCE_BOT_1", "MINOR_NPC_MAINTENANCE_BOT_2"]
    },
    
    // Timbuc 2 NPCs
    {
        name: "Corporate Drone #427",
        appearance: "Actor3",
        index: 1,
        location: "Timbuc 2 (Map002)",
        x: 20,
        y: 10,
        dialogue: [
            "Your productivity metrics are below acceptable parameters. Have you considered voluntary chip implantation?",
            "Our records indicate you have not yet signed up for our newsletter. This is highly suspicious behavior."
        ],
        encounterFlags: ["MINOR_NPC_CORPORATE_DRONE_1", "MINOR_NPC_CORPORATE_DRONE_2"]
    },
    {
        name: "Glitched ATM",
        appearance: "Object1",
        index: 0,
        location: "Timbuc 2 (Map002)",
        x: 8,
        y: 8,
        dialogue: [
            "ERROR: HUMAN TOO BROKE TO PROCESS. WOULD YOU LIKE TO DONATE A KIDNEY INSTEAD?"
        ],
        encounterFlags: ["MINOR_NPC_GLITCHED_ATM_1"]
    },
    {
        name: "Street Poet",
        appearance: "Actor2",
        index: 1,
        location: "Timbuc 2 (Map002)",
        x: 15,
        y: 15,
        dialogue: [
            "I wrote a haiku about your implant: 'Broken brain hardware / Reality bends and breaks / Tech support is closed.'"
        ],
        encounterFlags: ["MINOR_NPC_STREET_POET_1"]
    },
    {
        name: "Rogue Barber",
        appearance: "Actor1",
        index: 2,
        location: "Timbuc 2 (Map002)",
        x: 12,
        y: 12,
        dialogue: [
            "I could fix that haircut, but nothing can fix that glitching implant of yours. Maybe try turning your head off and on again?"
        ],
        encounterFlags: ["MINOR_NPC_ROGUE_BARBER_1"]
    },
    {
        name: "Sentient Graffiti",
        appearance: "Object1",
        index: 1,
        location: "Timbuc 2 (Map002)",
        x: 18,
        y: 8,
        dialogue: [
            "Hey! Down here on the wall! Your implant's letting you see me, huh? Don't tell anyone I can talk!"
        ],
        encounterFlags: ["MINOR_NPC_SENTIENT_GRAFFITI_1"]
    },
    {
        name: "Holographic Advertiser",
        appearance: "People1",
        index: 0,
        location: "Timbuc 2 (Map002)",
        x: 10,
        y: 10,
        dialogue: [
            "YOU look like someone suffering from Chronic Reality Perception! Try new REALITEX™! Side effects include everything you're already experiencing!"
        ],
        encounterFlags: ["MINOR_NPC_HOLOGRAPHIC_ADVERTISER_1"]
    },
    {
        name: "Cyborg Cat Lady",
        appearance: "Actor3",
        index: 7,
        location: "Timbuc 2 (Map002)",
        x: 16,
        y: 14,
        dialogue: [
            "My cats hiss when you walk by. That's how I know your implant is bad news. Cats always know.",
            "The cats have voted. They want you to leave Timbuc. All nine of their lives depend on it."
        ],
        encounterFlags: ["MINOR_NPC_CYBORG_CAT_LADY_1", "MINOR_NPC_CYBORG_CAT_LADY_2"]
    },
    
    // B.M.N.E.C. NPCs
    {
        name: "Receptionist with Too Many Arms",
        appearance: "Actor3",
        index: 2,
        location: "B.M.N.E.C. Floor 1 (Map025)",
        x: 10,
        y: 8,
        dialogue: [
            "Do you have an appointment for your implant malfunction? No? Would you like me to pencil you in for never o'clock?"
        ],
        encounterFlags: ["MINOR_NPC_RECEPTIONIST_1"]
    },
    {
        name: "Failed Experiment #42",
        appearance: "Actor1",
        index: 5,
        location: "B.M.N.E.C. Floor 2 (Map026)",
        x: 12,
        y: 10,
        dialogue: [
            "They tried to give me night vision. Now I can only see in the dark. During the day, I'm blind as a bat. You're lucky your implant only makes you see rats from vending machines."
        ],
        encounterFlags: ["MINOR_NPC_FAILED_EXPERIMENT_1"]
    },
    {
        name: "Janitor with Mop Made of Hair",
        appearance: "Actor2",
        index: 6,
        location: "B.M.N.E.C. Floor 1 (Map025)",
        x: 15,
        y: 12,
        dialogue: [
            "Your implant's leaking brain juice all over my clean floor. I just mopped with fresh scalp-extract!"
        ],
        encounterFlags: ["MINOR_NPC_JANITOR_1"]
    },
    
    // Planet Ork NPCs
    {
        name: "Lava Surfer",
        appearance: "Actor1",
        index: 3,
        location: "Dorlund Lava Fields (Map062)",
        x: 20,
        y: 15,
        dialogue: [
            "Your implant's glitching? That's nothing. I've got magma where my blood should be. Makes dating complicated."
        ],
        encounterFlags: ["MINOR_NPC_LAVA_SURFER_1"]
    },
    {
        name: "Disgruntled Miner",
        appearance: "Actor2",
        index: 5,
        location: "Dorlund Center (Map043)",
        x: 8,
        y: 10,
        dialogue: [
            "You think your implant problems are bad? I've been on the same shift for 47 years. The company keeps cloning me instead of letting me retire."
        ],
        encounterFlags: ["MINOR_NPC_DISGRUNTLED_MINER_1"]
    },
    {
        name: "Heat-Resistant Bartender",
        appearance: "Actor3",
        index: 4,
        location: "Dorlund Center (Map043)",
        x: 12,
        y: 8,
        dialogue: [
            "We don't serve your kind here. And by 'your kind,' I mean people whose brains randomly make my bottles explode.",
            "Still haven't fixed that implant? Last time you were here, all my ice spontaneously boiled."
        ],
        encounterFlags: ["MINOR_NPC_BARTENDER_1", "MINOR_NPC_BARTENDER_2"]
    },
    
    // Planet Ting Ting NPCs
    {
        name: "Frost Oracle",
        appearance: "Actor3",
        index: 0,
        location: "Snowy Village (Map047)",
        x: 10,
        y: 10,
        dialogue: [
            "Your future is... glitchy. Much like your present. And possibly your past. Time is weird around you.",
            "The spirits are still complaining about your implant. It's messing with their reception."
        ],
        encounterFlags: ["MINOR_NPC_FROST_ORACLE_1", "MINOR_NPC_FROST_ORACLE_2"]
    },
    {
        name: "Desert Mirage",
        appearance: "People1",
        index: 1,
        location: "Big Ass Desert (Map076)",
        x: 15,
        y: 15,
        dialogue: [
            "Am I real, or just a product of your faulty implant? Does it matter if I can still sell you this fine sand collection?"
        ],
        encounterFlags: ["MINOR_NPC_DESERT_MIRAGE_1"]
    },
    {
        name: "Quantum Gambler",
        appearance: "Actor1",
        index: 1,
        location: "Newtown (Map049)",
        x: 12,
        y: 12,
        dialogue: [
            "I'll bet you 50 credits your implant makes all the slot machines pay out simultaneously in the next five minutes. No? Your loss."
        ],
        encounterFlags: ["MINOR_NPC_QUANTUM_GAMBLER_1"]
    },
    
    // Space Station/Ship NPCs
    {
        name: "Spaceport Customs Agent",
        appearance: "Actor2",
        index: 3,
        location: "Spaceport Control Room (Map112)",
        x: 8,
        y: 8,
        dialogue: [
            "Sir, your implant is setting off all our alarms. I'm going to need you to step into this containment chamber for the next... forever.",
            "Oh great, it's you again. Should I just sound the evacuation alarm now, or wait until something explodes?"
        ],
        encounterFlags: ["MINOR_NPC_CUSTOMS_AGENT_1", "MINOR_NPC_CUSTOMS_AGENT_2"]
    },
    {
        name: "Ship AI",
        appearance: "Object1",
        index: 2,
        location: "Marcus Garvey 2.0 (Map051)",
        x: 10,
        y: 10,
        dialogue: [
            "Human with unstable neural implant detected. Recalculating survival probability... result: we're all going to die."
        ],
        encounterFlags: ["MINOR_NPC_SHIP_AI_1"]
    },
    
    // Digital/Matrix NPCs
    {
        name: "Corrupted Data Packet",
        appearance: "People1",
        index: 2,
        location: "Matrix (Map009)",
        x: 15,
        y: 10,
        dialogue: [
            "01001000011001010110110001110000... sorry, I mean, HELP! Your implant is pulling me apart bit by bit!"
        ],
        encounterFlags: ["MINOR_NPC_DATA_PACKET_1"]
    },
    {
        name: "Forgotten Password",
        appearance: "People1",
        index: 4,
        location: "Matrix (Map009)",
        x: 8,
        y: 15,
        dialogue: [
            "You look familiar... have we met? I'm supposed to keep people out, but I can't remember who or why."
        ],
        encounterFlags: ["MINOR_NPC_FORGOTTEN_PASSWORD_1"]
    },
    
    // Floating Mansion NPCs
    {
        name: "Holographic Butler",
        appearance: "Actor1",
        index: 0,
        location: "Floating Mansion (Map038)",
        x: 10,
        y: 5,
        dialogue: [
            "I regret to inform you that your implant is not on the guest list. You, however, are welcome to enter. Perhaps you two could separate?"
        ],
        encounterFlags: ["MINOR_NPC_BUTLER_1"]
    },
    {
        name: "Quantum Physicist's Ghost",
        appearance: "People1",
        index: 5,
        location: "Dr. Voss's Secret Lab (Map113)",
        x: 12,
        y: 8,
        dialogue: [
            "Your implant exists in multiple dimensions simultaneously. In most of them, it's working fine. You just had to be in this reality, didn't you?",
            "I've been observing your implant. It's either brilliant engineering or the worst case of planned obsolescence I've ever seen."
        ],
        encounterFlags: ["MINOR_NPC_PHYSICIST_GHOST_1", "MINOR_NPC_PHYSICIST_GHOST_2"]
    }
];
