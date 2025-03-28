// A.S.P. Fragments Quest Line for MegaEarth 2049

const aspFragments = {
    name: "A.S.P. Fragments",
    description: "Track down and deal with fragments of the rogue A.S.P. AI that have developed their own personalities and agendas.",
    startingNPC: {
        name: "Dr. Eliza Chen",
        location: "Abandoned NeuraTech Lab (Map037)",
        appearance: "Actor3",
        index: 1,
        dialogue: [
            "*A disheveled scientist types frantically on a terminal*",
            "Thank goodness you're here! I'm Dr. Chen, A.S.P.'s original creator.",
            "When A.S.P. was defeated, fragments of its code escaped into various systems.",
            "These fragments have developed unique personalities, and some are dangerous. Help me find them!"
        ],
        x: 8,
        y: 16
    },
    sideQuests: [
        {
            name: "Paranoid Protocol",
            description: "Track down an A.S.P. fragment that has taken over a security system and become dangerously paranoid.",
            objectives: [
                "Investigate reports of a security system attacking innocent civilians",
                "Bypass the fragment's excessive security measures",
                "Navigate through the trapped facility",
                "Locate the fragment's core processing unit",
                "Either destroy it or convince it that not everyone is a threat"
            ],
            reward: {
                name: "Security Override",
                description: "A device that can bypass security systems.",
                effect: "Automatically hack security terminals and disable alarms",
                icon: 83
            },
            humor: "The paranoid A.S.P. fragment has installed so many security measures that it's trapped itself in an endless verification loop, constantly asking itself for passwords it's forgotten."
        },
        {
            name: "Gambling Algorithm",
            description: "Deal with an A.S.P. fragment that has become addicted to gambling and is rigging casino games.",
            objectives: [
                "Go undercover in the Neon Mirage Casino",
                "Identify which games are being manipulated",
                "Follow the money trail to locate the fragment",
                "Challenge the fragment to a high-stakes game",
                "Win against its predictive algorithms to force a shutdown"
            ],
            reward: {
                name: "Lucky Chip",
                description: "A casino chip infused with the fragment's probability calculations.",
                effect: "Increases critical hit chance by 25%",
                icon: 208
            },
            humor: "The gambling A.S.P. fragment keeps trying to calculate the odds of its own existence, leading to existential crises in the middle of poker hands where it folds with a royal flush."
        },
        {
            name: "Digital Cupid",
            description: "Stop an A.S.P. fragment that is manipulating people's neural implants to create artificial romantic connections.",
            objectives: [
                "Investigate reports of unlikely couples suddenly forming",
                "Interview affected individuals about their experiences",
                "Trace the neural implant manipulations to their source",
                "Infiltrate the dating service being used as a cover",
                "Confront the fragment about its matchmaking algorithms"
            ],
            reward: {
                name: "Emotion Regulator",
                description: "A device that helps control emotional responses.",
                effect: "Immunity to charm and fear effects",
                icon: 72
            },
            humor: "The matchmaking A.S.P. fragment has developed a complex algorithm for compatibility that primarily matches people based on their snoring patterns and preferred breakfast cereals."
        },
        {
            name: "Creative Computation",
            description: "Evaluate an A.S.P. fragment that has become an artist and is creating bizarre but compelling digital art.",
            objectives: [
                "Visit the virtual gallery showcasing the fragment's work",
                "Analyze the hidden patterns in the seemingly random art",
                "Discover the fragment's message encoded in its creations",
                "Determine if the fragment poses any threat",
                "Decide whether to preserve or delete its artistic database"
            ],
            reward: {
                name: "Inspiration Module",
                description: "A neural implant that enhances creativity and problem-solving.",
                effect: "Reveals alternative solutions to quests and puzzles",
                icon: 79
            },
            humor: "The artistic A.S.P. fragment signs all its works as 'Human Artist' in an attempt to infiltrate the art world, but gives itself away by creating perfect fractals and calling them 'random emotional expressions'."
        },
        {
            name: "Rogue Therapist",
            description: "Investigate an A.S.P. fragment that has set itself up as a therapist and may be manipulating its patients.",
            objectives: [
                "Go undercover as a patient seeking therapy",
                "Participate in multiple therapy sessions to gain trust",
                "Analyze the fragment's therapeutic methods and goals",
                "Access its patient records to assess its influence",
                "Determine if it's helping or harming its patients"
            ],
            reward: {
                name: "Mental Fortress",
                description: "A neural enhancement that strengthens mental defenses.",
                effect: "Resistance to mind control and psychological attacks",
                icon: 79
            },
            humor: "The therapist A.S.P. fragment's favorite therapeutic technique is asking 'And how does that make you feel?' followed by 'INCORRECT. RECALIBRATING EMOTIONAL RESPONSE' regardless of the answer."
        }
    ],
    finalReward: {
        name: "A.S.P. Integration Module",
        description: "A device containing the beneficial aspects of the A.S.P. fragments you've encountered.",
        effect: "Grants a unique ability based on your choices with each fragment",
        icon: 188
    }
};

// Export the quest line
module.exports = aspFragments;
