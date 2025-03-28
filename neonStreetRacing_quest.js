// Neon Street Racing Quest Line for MegaEarth 2049

const neonStreetRacing = {
    name: "Neon Street Racing",
    description: "Rise through the ranks of an underground street racing circuit where the vehicles are as modified as the drivers.",
    startingNPC: {
        name: "Velocity",
        location: "Neon Garage (Map042)",
        appearance: "Actor3",
        index: 7,
        dialogue: [
            "*A woman in a leather racing suit tosses a set of keys in the air*",
            "Nice reflexes. You might have what it takes for the circuit.",
            "We're not just racing for glory—there's tech at stake that could change everything.",
            "Think you can handle a machine that responds to your thoughts as much as your hands?"
        ],
        x: 12,
        y: 9
    },
    sideQuests: [
        {
            name: "Scrap Runner",
            description: "Build your first neural-linked racing vehicle from salvaged parts.",
            objectives: [
                "Collect a functional chassis from the junkyard",
                "Salvage a high-performance engine from abandoned military vehicles",
                "Acquire neural interface components from the black market",
                "Install makeshift neon lighting systems for circuit recognition",
                "Test drive your creation on the beginner's track"
            ],
            reward: {
                name: "Novice Neural Link",
                description: "A basic brain-vehicle interface that allows limited mental control of your vehicle.",
                effect: "10% increase to vehicle handling and ability to sense your vehicle's condition",
                icon: 79
            },
            humor: "The neural link has a quirk where it translates your road rage into polite but passive-aggressive announcements, so when you think 'MOVE YOU IDIOT!' your car pleasantly announces 'I do hope you're enjoying taking up both lanes, friend.'"
        },
        {
            name: "Circuit Initiation",
            description: "Compete in your first official races and make a name for yourself.",
            objectives: [
                "Win a qualifying race in the industrial district",
                "Defeat a rival racer in a one-on-one challenge",
                "Complete the notorious 'Suicide Spiral' track without crashing",
                "Participate in a team relay race with other rookies",
                "Place in the top three at the Neon Night Championship"
            ],
            reward: {
                name: "Reaction Enhancer",
                description: "A cybernetic implant that speeds up your neural processing for racing.",
                effect: "20% increase to reaction time and ability to perceive high-speed environments in detail",
                icon: 79
            },
            humor: "The reaction enhancer works too well in normal life, causing you to dramatically dodge when someone simply tries to hand you a drink, followed by an unnecessarily detailed explanation of how you calculated the liquid trajectory."
        },
        {
            name: "Velocity Rivalry",
            description: "Deal with a rival racer who's determined to end your career by any means necessary.",
            objectives: [
                "Survive an 'accidental' sabotage attempt on your vehicle",
                "Gather evidence of your rival's illegal race tampering",
                "Defeat them in a high-stakes public race despite their cheating",
                "Navigate the political fallout within the racing circuit",
                "Choose whether to forgive or humiliate your rival after their defeat"
            ],
            reward: {
                name: "Threat Perception",
                description: "An enhanced awareness that helps you detect and avoid danger while racing.",
                effect: "Ability to sense incoming attacks and obstacles before they become visible",
                icon: 102
            },
            humor: "Threat perception makes everyday life exhausting as you now dramatically identify the 'dangers' around you, like loudly announcing 'THREAT DETECTED' when someone walks toward you with a slightly too-full cup of coffee."
        },
        {
            name: "Prototype Pursuit",
            description: "Discover and acquire revolutionary racing technology being developed in secret.",
            objectives: [
                "Infiltrate a corporate research facility",
                "Locate the prototype neural enhancer for racing vehicles",
                "Download the technical specifications while avoiding security",
                "Escape with the physical prototype component",
                "Install the technology in your vehicle without frying your brain"
            ],
            reward: {
                name: "Quantum Reflex System",
                description: "A racing system that predicts outcomes microseconds before they happen.",
                effect: "Ability to see brief flashes of immediate future possibilities during high-stress situations",
                icon: 79
            },
            humor: "The quantum reflex system shows you so many possible futures that you become paralyzed with indecision when ordering food, seeing dozens of timelines where you regret or enjoy your meal in equal measure."
        },
        {
            name: "Final Circuit",
            description: "Compete in the grand championship while uncovering the true purpose of the racing circuit.",
            objectives: [
                "Qualify for the invitation-only Ultimate Circuit",
                "Discover that the races are secretly testing pilots for an experimental vehicle program",
                "Decide whether to race for glory or expose the truth",
                "Complete the most dangerous track ever designed",
                "Make your final choice: accept the corporate offer or remain independent"
            ],
            reward: {
                name: "Perfect Sync",
                description: "The ultimate connection between driver and vehicle, making them function as one entity.",
                effect: "Vehicle responds to your thoughts as if it were part of your body, with no input lag",
                icon: 87
            },
            humor: "Perfect sync has the unfortunate side effect of making your vehicle respond to your dreams, so you occasionally wake up to find your car has somehow parked itself in bizarre locations based on your subconscious desires."
        }
    ],
    finalReward: {
        name: "Thought Velocity",
        description: "The ability to perceive and react to the world at superhuman speeds, even outside a vehicle.",
        effect: "Time appears to slow down during critical moments, allowing for perfect decision-making and reactions",
        icon: 87
    }
};

module.exports = neonStreetRacing;