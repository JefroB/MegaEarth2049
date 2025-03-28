// More Optional Quest Lines for MegaEarth 2049
// This file contains 11 additional optional quest lines with 30 NPCs

module.exports = [
    {
        name: "Wasteland Radio Network",
        description: "Help establish a network of radio stations across the wasteland to connect isolated communities.",
        startingNPC: {
            name: "DJ Frequency",
            appearance: "Actor1",
            index: 0,
            location: "Neon District (Map002)",
            x: 15,
            y: 12,
            dialogue: [
                "Hey there, signal seeker! I'm DJ Frequency, voice of the wasteland!",
                "I've got a dream to connect all the scattered communities through radio waves.",
                "With a network of stations, we could share news, warnings, and maybe bring some hope.",
                "Interested in helping me build the Wasteland Radio Network?"
            ]
        },
        finalReward: "Radio Transmitter Backpack (Increases communication range with allies)"
    },
    {
        name: "Wasteland Botanical Gardens",
        description: "Help restore and protect rare plant species that survived the apocalypse.",
        startingNPC: {
            name: "Dr. Bloom",
            appearance: "Actor3",
            index: 1,
            location: "Verdant Ruins (Map007)",
            x: 8,
            y: 10,
            dialogue: [
                "Ah, a visitor! Welcome to what remains of the Botanical Research Center.",
                "I'm Dr. Bloom, and I've dedicated my life to preserving plant species that survived the collapse.",
                "Some of these plants have remarkable properties - medicinal, nutritional, even technological applications!",
                "Would you help me collect and protect these botanical treasures?"
            ]
        },
        finalReward: "Seedbomb Grenades (Temporarily creates difficult terrain for enemies)"
    },
    {
        name: "Wasteland Olympics",
        description: "Help organize and compete in the first post-apocalyptic Olympic Games.",
        startingNPC: {
            name: "Coach Ironheart",
            appearance: "Actor2",
            index: 7,
            location: "Crater Stadium (Map015)",
            x: 20,
            y: 15,
            dialogue: [
                "You look like you've got some fight in you! Name's Coach Ironheart.",
                "I'm trying to organize the first Wasteland Olympics - bring some friendly competition back to this world.",
                "Mutant hurdles, scrap metal javelin, toxic swimming... we've got events planned for all types!",
                "Want to help me recruit athletes and set up the games?"
            ]
        },
        finalReward: "Olympic Torch (Weapon that deals fire damage and boosts team morale)"
    },
    {
        name: "Wasteland Trading Caravan",
        description: "Join a trading caravan that travels between settlements, dealing with raiders and making profitable trades.",
        startingNPC: {
            name: "Caravan Master Zeke",
            appearance: "Actor1",
            index: 4,
            location: "Market District (Map008)",
            x: 12,
            y: 8,
            dialogue: [
                "Looking for adventure and profit? I'm Zeke, master of the Long Road Caravan.",
                "We travel between all the major settlements, trading goods and bringing news.",
                "It's dangerous work - raiders, mutants, and the elements all try to stop us.",
                "But the profits are good, and you'll see parts of the wasteland few ever visit. Interested?"
            ]
        },
        finalReward: "Caravan Leader's Hat (Increases trade prices and charisma)"
    },
    {
        name: "Wasteland University",
        description: "Help establish a new center of learning in the wasteland, collecting lost knowledge and teaching the next generation.",
        startingNPC: {
            name: "Professor Wisdom",
            appearance: "Actor2",
            index: 0,
            location: "Old Library (Map009)",
            x: 10,
            y: 12,
            dialogue: [
                "Ah, a potential student! I am Professor Wisdom, former chair of Applied Survival at Capital University.",
                "I'm establishing a new university here in the wasteland - knowledge must not be lost!",
                "We need textbooks, teaching tools, and protection for our campus and students.",
                "Education is the foundation of rebuilding society. Will you help us?"
            ]
        },
        finalReward: "Scholar's Monocle (Reveals enemy weaknesses and hidden information)"
    },
    {
        name: "Wasteland Theater Troupe",
        description: "Join a traveling theater group that brings entertainment and cultural preservation to the wasteland.",
        startingNPC: {
            name: "Director Dramatique",
            appearance: "Actor3",
            index: 6,
            location: "Abandoned Theater (Map012)",
            x: 15,
            y: 10,
            dialogue: [
                "Darling! You have such presence! I am Director Dramatique of the Wasteland Players.",
                "We travel the wasteland performing classics and new works about our current reality.",
                "Art must survive! Culture must endure! Even in these dark times, people need stories!",
                "We need protection, new performers, and help finding venues. Join our troupe?"
            ]
        },
        finalReward: "Dramatic Mask (Can temporarily charm enemies or create distractions)"
    },
    {
        name: "Wasteland Museum of History",
        description: "Help collect and preserve artifacts from before the collapse to remember the old world.",
        startingNPC: {
            name: "Curator Maxwell",
            appearance: "Actor1",
            index: 5,
            location: "Ruined Mall (Map013)",
            x: 8,
            y: 15,
            dialogue: [
                "History must not be forgotten! I'm Maxwell, curator of the Wasteland Museum of History.",
                "I'm collecting artifacts from before the collapse - technology, art, everyday items.",
                "If we don't remember where we came from, we're doomed to repeat the same mistakes.",
                "Will you help me recover these precious links to our past?"
            ]
        },
        finalReward: "Historian's Journal (Provides hints about hidden locations and treasures)"
    },
    {
        name: "Wasteland Culinary Competition",
        description: "Participate in a cooking contest using wasteland ingredients to create new cuisine.",
        startingNPC: {
            name: "Chef Gusteau",
            appearance: "Actor3",
            index: 4,
            location: "Food Court (Map010)",
            x: 18,
            y: 12,
            dialogue: [
                "Ah, a potential sous-chef! I am Chef Gusteau, master of wasteland cuisine!",
                "I'm organizing the first Great Wasteland Cook-Off to show that good food can exist even after the apocalypse.",
                "We need exotic ingredients, cooking equipment, and judges with refined palates.",
                "Are you ready to help create the new cuisine of our brave new world?"
            ]
        },
        finalReward: "Master Chef's Knife Set (Weapon with bonus against organic enemies and food crafting bonuses)"
    },
    {
        name: "Wasteland Fashion",
        description: "Help establish a new fashion trend in the wasteland using recycled materials.",
        startingNPC: {
            name: "Designer Chic",
            appearance: "Actor2",
            index: 4,
            location: "Abandoned Mall (Map013)",
            x: 12,
            y: 10,
            dialogue: [
                "Darling, that outfit is so... functional. I'm Designer Chic, fashion visionary!",
                "Just because it's the apocalypse doesn't mean we can't look fabulous!",
                "I'm creating a new fashion line from recycled materials - practical yet stylish!",
                "Help me collect materials and organize a fashion show to bring beauty back to the wasteland?"
            ]
        },
        finalReward: "Wasteland Couture Outfit (Provides charisma bonus and temperature resistance)"
    },
    {
        name: "Wasteland Hot Springs Resort",
        description: "Help establish a neutral relaxation zone where wasteland factions can find peace.",
        startingNPC: {
            name: "Spa Manager Serene",
            appearance: "Actor3",
            index: 0,
            location: "Geothermal Area (Map016)",
            x: 15,
            y: 8,
            dialogue: [
                "Welcome, weary traveler. I am Serene, manager of what will be the Wasteland Hot Springs Resort.",
                "I've discovered natural hot springs here that have healing properties - a miracle in this harsh world!",
                "I want to create a neutral zone where all factions can come to relax, heal, and perhaps find common ground.",
                "Will you help me build this oasis of peace in our violent wasteland?"
            ]
        },
        finalReward: "Thermal Water Flask (Provides healing and radiation resistance)"
    },
    {
        name: "Wasteland Film Festival",
        description: "Help organize a film festival showcasing pre-war classics and new wasteland productions.",
        startingNPC: {
            name: "Director Reels",
            appearance: "Actor1",
            index: 7,
            location: "Old Cinema (Map012)",
            x: 10,
            y: 8,
            dialogue: [
                "Cut! Perfect timing! I'm Director Reels, preservationist of cinematic arts!",
                "I've salvaged hundreds of films from before the collapse, and I'm collecting new stories from the wasteland.",
                "I want to organize a film festival to share these visions with everyone - inspire hope through art!",
                "Help me set up projectors, find venues, and protect the last copies of these irreplaceable films?"
            ]
        },
        finalReward: "Projector Drone (Creates distracting illusions in combat)"
    }
];
