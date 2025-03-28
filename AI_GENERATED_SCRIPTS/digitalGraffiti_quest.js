// Digital Graffiti Quest Line for MegaEarth 2049

const digitalGraffiti = {
    name: "Digital Graffiti",
    description: "Join a group of artistic hackers who use augmented reality to create subversive art installations throughout the city.",
    startingNPC: {
        name: "Pixel",
        location: "Abandoned Gallery (Map061)",
        appearance: "Actor3",
        index: 2,
        dialogue: [
            "*A figure in a hoodie covered in tiny LED displays projects a holographic tag onto the wall*",
            "You see that? Most people walk right past it. Their reality filters are set too tight.",
            "We're the Augmented Vandals. We hack the city's AR infrastructure to make people question what's real.",
            "You look like someone who can see beyond the obvious. Want to help us make some digital noise?"
        ],
        x: 11,
        y: 9
    },
    sideQuests: [
        {
            name: "Reality Canvas",
            description: "Learn the basics of augmented reality hacking and create your first digital graffiti piece.",
            objectives: [
                "Acquire a modified AR headset from the Augmented Vandals",
                "Learn to use the basic AR creation tools",
                "Hack into a local AR node to gain access to public space",
                "Create your first digital graffiti piece in a prominent location",
                "Escape before security forces trace your signal"
            ],
            reward: {
                name: "AR Stylus",
                description: "A tool that allows you to create and manipulate augmented reality objects.",
                effect: "Ability to create simple AR illusions that can distract or confuse enemies",
                icon: 83
            },
            humor: "Your first AR creation accidentally includes metadata with your embarrassing username from when you were thirteen, causing your revolutionary art piece to be signed 'XxDarkNinja420xX' in glowing letters visible to anyone with AR access."
        },
        {
            name: "Corporate Canvas",
            description: "Infiltrate corporate headquarters to replace their AR advertisements with subversive art.",
            objectives: [
                "Scout the security systems at Armatek's headquarters",
                "Create a specialized AR overlay that can replace corporate imagery",
                "Hack into the building's AR infrastructure during a public event",
                "Replace the corporate advertisements with your team's manifesto art",
                "Record public reactions to use in future installations"
            ],
            reward: {
                name: "Reality Hijacker",
                description: "A device that can temporarily override commercial AR feeds.",
                effect: "Ability to manipulate what others see in augmented reality",
                icon: 83
            },
            humor: "The reality hijacker has a glitch that occasionally replaces corporate logos with randomly generated pet names, leading to confused citizens talking about shopping at 'Snuggly-Wumpkins' instead of 'ArmaCorps' and not noticing anything wrong."
        },
        {
            name: "Reality War",
            description: "Compete against a rival AR artist collective for control of the city's digital spaces.",
            objectives: [
                "Identify the rival collective's AR signatures",
                "Develop techniques to overwrite their installations",
                "Defend your crew's most prominent pieces from being overwritten",
                "Challenge the rival leader to a real-time AR creation battle",
                "Negotiate a truce or establish dominance in the AR art scene"
            ],
            reward: {
                name: "Persistent Reality Anchor",
                description: "A device that makes your AR creations more difficult to remove or overwrite.",
                effect: "Your AR creations last three times longer and resist hacking attempts",
                icon: 79
            },
            humor: "The persistence anchor works by making your AR creations slightly sentient and very stubborn, so when someone tries to delete them, they argue back with increasingly ridiculous excuses about why they should stay, like claiming to be 'essential infrastructure' or 'the mayor's second cousin.'"
        },
        {
            name: "Reality Glitch",
            description: "Investigate a dangerous glitch in the city's AR system that's causing hallucinations to manifest in physical reality.",
            objectives: [
                "Document cases of AR hallucinations affecting the physical world",
                "Analyze the corrupted AR code causing the phenomenon",
                "Track the glitch to its source in the central AR servers",
                "Contain the spreading corruption before it causes mass hysteria",
                "Decide whether to fix the glitch or harness its reality-altering potential"
            ],
            reward: {
                name: "Reality Stabilizer",
                description: "A device that can separate AR illusions from physical reality.",
                effect: "Immunity to AR-based deceptions and ability to see through illusions",
                icon: 79
            },
            humor: "The reality stabilizer is so effective that it occasionally filters out actual physical objects that look 'too unrealistic,' causing you to bump into things that your brain has decided are 'clearly poorly rendered AR projections with unconvincing physics.'"
        },
        {
            name: "Masterpiece",
            description: "Create a city-wide AR installation that will change how people perceive reality.",
            objectives: [
                "Gather rare components for an enhanced AR broadcasting system",
                "Recruit other artists to contribute to the massive installation",
                "Hack into all major AR nodes simultaneously",
                "Deploy the city-wide art experience during peak hours",
                "Evade the authorities while witnessing the public reaction"
            ],
            reward: {
                name: "Reality Brush",
                description: "An advanced tool that blurs the line between AR and physical reality.",
                effect: "Your AR creations can interact with the physical world in limited ways",
                icon: 83
            },
            humor: "Your masterpiece is so moving that it brings a security AI to tears, causing it to malfunction and send out arrest warrants for 'whoever is cutting all these digital onions' instead of for the actual AR vandals."
        }
    ],
    finalReward: {
        name: "Reality Architect",
        description: "The ability to seamlessly blend augmented reality with the physical world, creating experiences that permanently alter people's perception.",
        effect: "Your AR creations can affect the physical world and persist indefinitely",
        icon: 87
    }
};

module.exports = digitalGraffiti;
