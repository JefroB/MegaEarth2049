// Neon Street Racing Quest Line for MegaEarth 2049

const neonStreetRacing = {
    name: "Neon Street Racing",
    description: "Compete in illegal street races with vehicles held together by duct tape, hope, and questionable modifications.",
    startingNPC: {
        name: "Nitro",
        location: "Timbuc 2 (Map002)",
        appearance: "Actor1",
        index: 7,
        dialogue: [
            "*A person in a leather jacket covered in glowing strips leans against a makeshift vehicle*",
            "You look like someone who appreciates speed and doesn't mind a little... legal flexibility.",
            "I run the Neon Circuit - fastest, most dangerous street racing in what's left of civilization.",
            "We're always looking for new drivers crazy enough to risk their necks for glory and credits. Interested?"
        ],
        x: 18,
        y: 10
    },
    sideQuests: [
        {
            name: "Scrap Racer",
            description: "Build your own racing vehicle from salvaged parts around Timbuc.",
            objectives: [
                "Collect a functional engine from the junkyard",
                "Salvage wheels from abandoned vehicles",
                "Acquire a power cell from a derelict corporate drone",
                "Find lightweight materials for the chassis",
                "Assemble your vehicle at the Neon Circuit garage"
            ],
            reward: {
                name: "Turbo Booster",
                description: "A nitrous injection system for your vehicle.",
                effect: "Temporary speed boost during races",
                icon: 83
            },
            humor: "Your 'racing vehicle' ends up being a shopping cart with a drone engine strapped to it, but it's somehow faster than vehicles with actual wheels, leading to accusations of cheating until Nitro points out there's no rule against 'innovative chassis design.'"
        },
        {
            name: "Street Cred",
            description: "Prove your worth by winning races in each district of Timbuc.",
            objectives: [
                "Win the Junkyard Derby in the industrial district",
                "Complete the Sewer Speedway race without drowning",
                "Survive the Corporate Plaza Circuit without being arrested",
                "Master the Rooftop Rally across Timbuc's skyline",
                "Defeat the reigning champion of each district"
            ],
            reward: {
                name: "Reputation Booster",
                description: "A holographic emblem that displays your racing achievements.",
                effect: "25% discount at all vehicle parts vendors",
                icon: 145
            },
            humor: "The 'reigning champion' of the Sewer Speedway turns out to be a giant mutant alligator that doesn't actually race but just chases racers, which technically makes it undefeated since no one has ever outrun it before you."
        },
        {
            name: "Illegal Modifications",
            description: "Upgrade your vehicle with experimental and highly questionable technology.",
            objectives: [
                "Steal experimental hover technology from Armatek",
                "Acquire a neural interface control system from NeuraTech",
                "Install a questionable 'quantum uncertainty engine' from a back-alley mechanic",
                "Test each modification on the practice track",
                "Integrate all systems without causing a catastrophic meltdown"
            ],
            reward: {
                name: "Schrödinger's Gearbox",
                description: "A transmission system that exists in multiple states simultaneously.",
                effect: "50% chance to ignore terrain penalties during races",
                icon: 83
            },
            humor: "The 'quantum uncertainty engine' doesn't actually do anything except make your vehicle randomly change color and occasionally teleport three inches to the left, but other racers are so distracted trying to figure out what it does that they crash into walls."
        },
        {
            name: "Corporate Infiltrator",
            description: "Participate in a high-stakes corporate-sponsored race as an undercover street racer.",
            objectives: [
                "Create a fake identity to enter the corporate race",
                "Qualify in the preliminary time trials",
                "Sabotage the corporate favorite's vehicle",
                "Win the race without revealing your street racing connections",
                "Escape with the prize money before your cover is blown"
            ],
            reward: {
                name: "Chameleon Paint Job",
                description: "A vehicle coating that can change appearance on command.",
                effect: "Reduced chance of being recognized by corporate security",
                icon: 82
            },
            humor: "Your 'fake identity' as 'Maxwell Corporateman' involves wearing a suit jacket over your racing leathers and speaking exclusively in business jargon you don't understand, yet somehow the corporate executives find you 'refreshingly authentic' and keep inviting you to board meetings."
        },
        {
            name: "Death Race 2049",
            description: "Compete in the most dangerous race in the wasteland: a no-rules run through mutant territory.",
            objectives: [
                "Modify your vehicle with defensive capabilities",
                "Scout the death race route for optimal shortcuts",
                "Recruit a co-driver to handle weapons while you drive",
                "Survive the qualifying round through the toxic waste dump",
                "Win the Death Race while fending off armed competitors"
            ],
            reward: {
                name: "Phoenix Protocol",
                description: "An emergency system that can rebuild your vehicle after catastrophic damage.",
                effect: "Auto-revive once per race if your vehicle is destroyed",
                icon: 81
            },
            humor: "Your co-driver turns out to be a sentient mutant cactus who's an excellent gunner but keeps accidentally shooting spines into your back whenever you hit a bump, leading to you finishing the race looking like a pincushion but still somehow in first place."
        }
    ],
    finalReward: {
        name: "Neon Circuit Champion",
        description: "Recognition as the greatest racer in the wasteland.",
        effect: "Access to the exclusive Underground Racing Club and its unique vehicle modifications",
        icon: 87
    }
};

module.exports = neonStreetRacing;
