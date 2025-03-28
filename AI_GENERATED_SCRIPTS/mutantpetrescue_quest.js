// Mutant Pet Rescue Quest Line for MegaEarth 2049

const mutantPetRescue = {
    name: "Mutant Pet Rescue",
    description: "Help rescue and rehabilitate mutated animals that have been abandoned or are being exploited in the wasteland.",
    startingNPC: {
        name: "Dr. Whiskers",
        location: "Timbuc (Map010)",
        appearance: "Actor2",
        index: 7,
        dialogue: [
            "*A person in a stained lab coat covered in various animal hairs tends to a three-eyed cat*",
            "These poor creatures... abandoned when they developed mutations, or worse, exploited for entertainment.",
            "I run the Mutant Pet Sanctuary. We rescue, rehabilitate, and find homes for animals affected by radiation and chemicals.",
            "We're always short-handed, and someone with your skills could really help these innocent mutants. Interested?"
        ],
        x: 7,
        y: 9
    },
    sideQuests: [
        {
            name: "Rescue Operation",
            description: "Save mutant animals from an illegal fighting ring in the wasteland.",
            objectives: [
                "Infiltrate the underground mutant pet fighting arena",
                "Identify the most abused animals in need of immediate rescue",
                "Create a distraction to clear the arena",
                "Free the mutant animals from their cages",
                "Escort them safely back to Dr. Whiskers' sanctuary"
            ],
            reward: {
                name: "Animal Empathy",
                description: "A neural implant that helps you understand mutated animal behavior.",
                effect: "Ability to pacify hostile mutant animals",
                icon: 82
            },
            humor: "The 'fearsome' fighting animals turn out to be mostly adorable despite their mutations, including a kitten with tentacles instead of a tail that uses them to give surprisingly good massages, and a puppy that can shoot harmless rainbow-colored sparks when excited."
        },
        {
            name: "Medical Miracle",
            description: "Develop treatments for the unique health issues affecting mutant pets.",
            objectives: [
                "Collect rare medicinal plants from the toxic waste marsh",
                "Acquire specialized veterinary equipment from an abandoned Vitalix lab",
                "Analyze the genetic mutations of different animal species",
                "Synthesize customized treatments for each type of mutation",
                "Test the treatments on willing animal patients"
            ],
            reward: {
                name: "Mutation Stabilizer",
                description: "A device that can temporarily control and direct mutations.",
                effect: "Can enhance beneficial mutations and suppress harmful ones in allies",
                icon: 79
            },
            humor: "Your 'groundbreaking' treatment for a six-legged dog involves tiny custom boots for each foot, which becomes an unexpected fashion trend in Timbuc when the dog prances around showing them off, leading to humans wearing multiple pairs of miniature boots as jewelry."
        },
        {
            name: "Adoption Day",
            description: "Find suitable homes for rehabilitated mutant pets among wasteland residents.",
            objectives: [
                "Screen potential adopters for their ability to care for special needs pets",
                "Match mutant pets with compatible owners based on lifestyle and abilities",
                "Educate new owners about their pets' unique care requirements",
                "Follow up with recent adoptions to ensure successful integration",
                "Deal with a pet that keeps teleporting back to the sanctuary"
            ],
            reward: {
                name: "Creature Comfort",
                description: "A device that creates a soothing environment for stressed animals.",
                effect: "Reduces aggression in all nearby creatures, including hostile enemies",
                icon: 82
            },
            humor: "The teleporting pet - a cat with phase-shifting abilities - keeps returning to the sanctuary not because it's unhappy, but because it's running an underground railroad for other pets, helping them escape bad situations and bringing them to the sanctuary while their owners think they've just run away."
        },
        {
            name: "Corporate Specimen",
            description: "Rescue a rare and valuable mutant animal from a Vitalix research facility.",
            objectives: [
                "Infiltrate the high-security Vitalix animal testing lab",
                "Locate the 'Project Alpha' specimen in the restricted area",
                "Disable the containment systems without triggering alarms",
                "Gain the creature's trust using your animal empathy skills",
                "Escape the facility with the specimen before security locks down"
            ],
            reward: {
                name: "Alpha Bond",
                description: "A special connection with the rescued specimen.",
                effect: "Ability to call on Project Alpha for assistance once per day",
                icon: 82
            },
            humor: "The highly dangerous 'Project Alpha' specimen turns out to be a seemingly ordinary hamster that can control electronic devices with its mind, which you discover when it hijacks the facility's PA system to play dramatic escape music and opens all the doors for you while making tiny 'pew pew' noises with its mouth."
        },
        {
            name: "Sanctuary Defense",
            description: "Protect the Mutant Pet Sanctuary from corporate agents trying to reclaim their 'property'.",
            objectives: [
                "Set up an early warning system around the sanctuary perimeter",
                "Train the more combat-capable mutant animals to assist in defense",
                "Establish escape routes for evacuating vulnerable animals",
                "Fortify the sanctuary buildings against attack",
                "Repel the corporate raid and convince them to leave the sanctuary alone"
            ],
            reward: {
                name: "Pack Tactics",
                description: "The ability to coordinate effectively with animal allies.",
                effect: "Mutant animals in your party gain increased combat effectiveness",
                icon: 82
            },
            humor: "Your 'elite defense force' includes a nearsighted mole with seismic sensing abilities that keeps alerting you to 'incoming enemies' that turn out to be someone's stomach growling, a parrot that can perfectly mimic corporate security authorization codes but only when it feels like it, and a chameleon that can turn invisible but constantly gives away its position by making 'whoosh' noises when it moves."
        }
    ],
    finalReward: {
        name: "Beast Whisperer",
        description: "Mastery of communication and bonding with mutated animals.",
        effect: "Ability to recruit mutant animals as temporary combat companions",
        icon: 87
    }
};

module.exports = mutantPetRescue;
