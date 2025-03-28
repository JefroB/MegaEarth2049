// Cybernetic Enhancement Quest Line for MegaEarth 2049

const cyberneticEnhancement = {
    name: "Cybernetic Enhancement",
    description: "Upgrade your body with experimental cybernetics while dealing with unexpected side effects.",
    startingNPC: {
        name: "Dr. Splice",
        location: "Back Alley Clinic (Map014)",
        appearance: "Actor2",
        index: 3,
        dialogue: [
            "*A doctor with mechanical arms adjusts a holographic display*",
            "You look like someone who wants to transcend the limitations of flesh.",
            "I've got some... experimental enhancements that could change your life.",
            "The procedures aren't exactly approved, but the results? Magnificent!"
        ],
        x: 8,
        y: 12
    },
    sideQuests: [
        {
            name: "Parts Acquisition",
            description: "Gather rare components needed for your first cybernetic enhancement.",
            objectives: [
                "Steal a prototype neural interface from Armatek Labs",
                "Recover military-grade servomotors from a crashed transport",
                "Extract bio-compatible alloys from an abandoned medical facility",
                "Purchase black market power cells from an underground dealer",
                "Collect rare earth magnets from old electronic devices"
            ],
            reward: {
                name: "Basic Neural Interface",
                description: "A rudimentary brain-computer interface that enhances reaction time.",
                effect: "10% increase to agility and 5% increase to perception",
                icon: 79
            },
            humor: "The neural interface occasionally translates your thoughts into bizarre food orders, causing you to shout 'EXTRA PICKLES!' during tense combat situations."
        },
        {
            name: "System Integration",
            description: "Undergo the first cybernetic procedure and adapt to your new enhancements.",
            objectives: [
                "Survive the initial installation procedure",
                "Complete basic motor function calibration exercises",
                "Adjust to sensory input overload in crowded areas",
                "Learn to control the enhancement's power consumption",
                "Defeat the training robots in Dr. Splice's combat simulator"
            ],
            reward: {
                name: "Cybernetic Arm",
                description: "A mechanical arm replacement with enhanced strength and precision.",
                effect: "25% increase to melee damage and ability to hack simple electronic locks",
                icon: 97
            },
            humor: "Your new arm has a mind of its own sometimes, giving thumbs-up to enemies after you defeat them and occasionally waving at security cameras when you're trying to be stealthy."
        },
        {
            name: "Rejection Syndrome",
            description: "Deal with your body's rejection of the cybernetic implants.",
            objectives: [
                "Track down specialized immunosuppressant drugs",
                "Find a technician who can adjust the neural interface",
                "Recover experimental nanobots to repair tissue damage",
                "Locate a rare biological stabilizer in the wasteland",
                "Return to Dr. Splice for emergency recalibration"
            ],
            reward: {
                name: "Auto-Immunizer",
                description: "A system that prevents rejection of cybernetic implants.",
                effect: "Immunity to disease and poison effects",
                icon: 72
            },
            humor: "The auto-immunizer works perfectly, except it now identifies caffeine as a threat and causes you to emit a high-pitched warning beep whenever someone offers you coffee."
        },
        {
            name: "Upgrade Path",
            description: "Choose and install additional cybernetic enhancements.",
            objectives: [
                "Test different enhancement prototypes in virtual simulation",
                "Decide between combat, stealth, or hacking specialization",
                "Gather materials specific to your chosen enhancement path",
                "Undergo the more complex secondary installation procedure",
                "Integrate the new systems with your existing enhancements"
            ],
            reward: {
                name: "Specialization Module",
                description: "A cybernetic enhancement tailored to your preferred playstyle.",
                effect: "Unique abilities based on chosen specialization (combat, stealth, or hacking)",
                icon: 193
            },
            humor: "Your specialization module comes with a built-in AI assistant that offers 'helpful' advice in the most sarcastic tone possible, and seems particularly judgmental of your fashion choices."
        },
        {
            name: "Human After All",
            description: "Confront a group of anti-cybernetic extremists who are hunting enhanced individuals.",
            objectives: [
                "Infiltrate the extremist group to learn their plans",
                "Protect other cybernetically enhanced people from attacks",
                "Sabotage the extremists' EMP weapon development",
                "Convince a key member to abandon the cause",
                "Confront the leader and end the threat"
            ],
            reward: {
                name: "Humanity Anchor",
                description: "A special implant that balances your human and cybernetic aspects.",
                effect: "Prevents cybernetic malfunctions and provides immunity to EMP effects",
                icon: 79
            },
            humor: "The humanity anchor works by occasionally forcing you to experience very human moments, like suddenly remembering embarrassing things you did as a teenager during important conversations."
        }
    ],
    finalReward: {
        name: "Transcendence",
        description: "The perfect integration of human and machine, allowing unprecedented control over your cybernetic systems.",
        effect: "Ability to reconfigure your cybernetic enhancements on the fly to adapt to different situations",
        icon: 87
    }
};

module.exports = cyberneticEnhancement;