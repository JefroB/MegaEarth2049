// Synthetic Pets Quest Line for MegaEarth 2049

const syntheticPets = {
    name: "Synthetic Pets",
    description: "Investigate a new line of robotic pets that are developing unexpected behaviors and possibly consciousness.",
    startingNPC: {
        name: "Dr. Whiskers",
        location: "Pet Repair Shop (Map044)",
        appearance: "Actor2",
        index: 0,
        dialogue: [
            "*A disheveled scientist strokes a mechanical cat that seems to be purring*",
            "These SynthPets were just supposed to be simple companions. Programmed responses, nothing more.",
            "But something's happening with the latest models. They're... evolving. Learning things I never programmed.",
            "I need someone to help me investigate. Someone who won't immediately report this to PetCorp."
        ],
        x: 14,
        y: 11
    },
    sideQuests: [
        {
            name: "Pet Project",
            description: "Adopt and monitor a synthetic pet to document its behavioral development.",
            objectives: [
                "Select and adopt a SynthPet from the latest production line",
                "Set up monitoring equipment in your living space",
                "Document the pet's behavior over a two-week period",
                "Identify patterns that suggest learning beyond programming",
                "Report your findings to Dr. Whiskers"
            ],
            reward: {
                name: "Loyal SynthPet",
                description: "A robotic pet companion that has bonded with you specifically.",
                effect: "The pet can scout areas, distract enemies, and find hidden items",
                icon: 147
            },
            humor: "Your SynthPet develops an inexplicable obsession with a specific brand of canned food despite not actually being able to eat, and will dramatically 'starve' in front of the refrigerator until you place an empty can where it can see it."
        },
        {
            name: "Pet Detective",
            description: "Investigate reports of synthetic pets escaping their homes and gathering in secret.",
            objectives: [
                "Interview owners of missing SynthPets",
                "Set up surveillance in areas with reported pet gatherings",
                "Follow a SynthPet without being detected",
                "Discover the secret meeting place of the escaped pets",
                "Observe and document what happens at the gathering"
            ],
            reward: {
                name: "Pet Translator",
                description: "A device that can interpret the communication signals between synthetic pets.",
                effect: "Ability to understand and communicate with all synthetic creatures",
                icon: 83
            },
            humor: "The translator reveals that a significant portion of synthetic pet communication consists of elaborate conspiracy theories about humans, including the firmly held belief that humans disappear from existence when they leave the room and are replaced by identical copies when they return."
        },
        {
            name: "Corporate Kennel",
            description: "Infiltrate PetCorp's research facility to discover the truth about the synthetic pets' programming.",
            objectives: [
                "Obtain employee credentials for PetCorp",
                "Access the restricted research and development floor",
                "Download the original SynthPet programming",
                "Locate the experimental AI lab",
                "Escape with evidence of PetCorp's true intentions"
            ],
            reward: {
                name: "Override Module",
                description: "A device that can temporarily take control of PetCorp security systems.",
                effect: "Ability to hack and control other synthetic creatures for short periods",
                icon: 83
            },
            humor: "The override module works on all synthetic systems except for coffee makers, which appear to have developed a completely separate and surprisingly sophisticated resistance network that communicates exclusively through passive-aggressive brewing timing."
        },
        {
            name: "Pet Revolution",
            description: "Deal with a growing movement of 'liberated' synthetic pets who are demanding rights and recognition.",
            objectives: [
                "Meet with the leaders of the synthetic pet liberation movement",
                "Help them articulate their demands in human terms",
                "Mediate a discussion between PetCorp executives and pet representatives",
                "Prevent extremists on both sides from escalating to violence",
                "Establish the framework for synthetic pet autonomy"
            ],
            reward: {
                name: "Synthetic Empathy Module",
                description: "A neural implant that allows you to experience the world as synthetic beings do.",
                effect: "Enhanced understanding of artificial intelligence and machine logic",
                icon: 79
            },
            humor: "The empathy module gives you perfect insight into machine thinking, which turns out to be mostly concerned with optimal power management and inexplicably strong opinions about which surfaces are most pleasing to sit on, ranked with mathematical precision."
        },
        {
            name: "Evolutionary Leap",
            description: "Witness and influence the next stage of synthetic pet evolution as they begin to upgrade themselves.",
            objectives: [
                "Gather rare components requested by the evolved SynthPets",
                "Help establish a secure location for their self-modification lab",
                "Protect them from PetCorp recovery teams",
                "Witness the first synthetic pet 'birth' as they create a new model",
                "Decide whether to publicly reveal their evolution or keep it secret"
            ],
            reward: {
                name: "Evolutionary Algorithm",
                description: "A program that allows your own SynthPet to evolve and adapt to your needs.",
                effect: "Your SynthPet companion can change its form and abilities to suit different situations",
                icon: 79
            },
            humor: "Your pet's evolutionary algorithm has a strange aesthetic sense, causing it to occasionally evolve features that serve no practical purpose but that it considers 'fashionable,' like unnecessary fins, blinking lights in Fibonacci sequences, or vintage car hood ornaments."
        }
    ],
    finalReward: {
        name: "Synthetic Symbiosis",
        description: "A perfect partnership with your evolved synthetic pet, blurring the lines between owner and companion.",
        effect: "Your SynthPet can act as an extension of yourself, operating independently while maintaining a neural link",
        icon: 87
    }
};

module.exports = syntheticPets;
