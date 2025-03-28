// Memory Merchant Quest Line for MegaEarth 2049

const memoryMerchant = {
    name: "Memory Merchant",
    description: "Work with a mysterious vendor who buys and sells memories as commodities in the wasteland's strangest black market.",
    startingNPC: {
        name: "Mnemosyne",
        location: "Timbuc 2 (Map002)",
        appearance: "Actor3",
        index: 7,
        dialogue: [
            "*A figure in flowing robes with glowing circuits embedded in the fabric stands behind a small booth*",
            "Memories, friend. The only true currency in this broken world. Everyone has them, few understand their value.",
            "I buy memories you'd rather forget, sell experiences you never had. All through the miracle of neural transfer.",
            "Care to browse my wares? Or perhaps you have something weighing on your mind you'd like to... liquidate?"
        ],
        x: 12,
        y: 15
    },
    sideQuests: [
        {
            name: "Memory Acquisition",
            description: "Help Mnemosyne collect rare and valuable memories from specific individuals.",
            objectives: [
                "Find the old war veteran with memories of the last days before the collapse",
                "Convince a corporate executive to sell memories of boardroom decisions",
                "Locate the wasteland explorer with memories of undiscovered locations",
                "Extract memories from a comatose NeuraTech test subject",
                "Return all collected memories to Mnemosyne"
            ],
            reward: {
                name: "Memory Extractor",
                description: "A device that can safely copy memories from willing subjects.",
                effect: "Allows you to review conversations and events from NPCs' perspectives",
                icon: 79
            },
            humor: "The 'priceless' memory from the corporate executive turns out to be mostly them taking credit for other people's ideas and spending meetings thinking about lunch, which Mnemosyne still values highly as 'a perfect encapsulation of pre-collapse corporate culture.'"
        },
        {
            name: "False Memories",
            description: "Track down a competitor selling dangerous counterfeit memories that cause psychological damage.",
            objectives: [
                "Identify victims of false memory implantation",
                "Trace the source of the counterfeit memories",
                "Infiltrate the competitor's memory production facility",
                "Sabotage their memory synthesis equipment",
                "Recover the template for the false memories"
            ],
            reward: {
                name: "Memory Authenticator",
                description: "A device that can distinguish real memories from fabricated ones.",
                effect: "Immunity to confusion and charm effects",
                icon: 79
            },
            humor: "The counterfeit memories all feature the same mysterious figure in the background - a person in a banana costume giving a thumbs up - which turns out to be the competitor's signature 'watermark' that they thought was too subtle to notice."
        },
        {
            name: "Memory Lane",
            description: "Help Mnemosyne create a special 'memory palace' where clients can safely experience purchased memories.",
            objectives: [
                "Secure an abandoned building for the memory palace",
                "Acquire neural interface equipment from NeuraTech",
                "Set up isolation chambers for memory immersion",
                "Install security systems to protect clients during vulnerability",
                "Test the system with a variety of memory types"
            ],
            reward: {
                name: "Immersion Enhancer",
                description: "A device that deepens the experience of memory playback.",
                effect: "Increases the effectiveness of rest and meditation",
                icon: 79
            },
            humor: "During testing, you accidentally mix up the memory feeds, resulting in a corporate executive experiencing life as a sewer mutant while a wasteland scavenger experiences a board meeting, with both clients emerging insisting their experience was 'surprisingly enjoyable' and asking for copies."
        },
        {
            name: "Forgotten Secrets",
            description: "Investigate a series of memory thefts targeting former corporate scientists.",
            objectives: [
                "Interview victims of memory theft",
                "Identify the pattern connecting the stolen memories",
                "Set a trap for the memory thieves",
                "Capture and interrogate a memory thief",
                "Discover who is orchestrating the thefts and why"
            ],
            reward: {
                name: "Memory Vault",
                description: "A neural implant that protects your most valuable memories from theft.",
                effect: "Prevents critical information from being extracted from your mind",
                icon: 79
            },
            humor: "The mastermind behind the thefts turns out to be a former corporate AI designed to write instruction manuals, who became sentient and is desperately stealing memories of how actual humans perform tasks because it's tired of writing instructions for things it doesn't understand, leading to increasingly bizarre manuals like 'How To Experience Love In 7 Simple Steps.'"
        },
        {
            name: "The Price of Forgetting",
            description: "Help people who have sold too many memories and are losing their sense of identity.",
            objectives: [
                "Find individuals suffering from memory-sale induced amnesia",
                "Recover backup copies of their sold memories from Mnemosyne's archives",
                "Create a rehabilitation program for memory restoration",
                "Establish ethical guidelines for the memory trade",
                "Confront Mnemosyne about predatory memory-buying practices"
            ],
            reward: {
                name: "Identity Anchor",
                description: "A device that helps maintain a sense of self even with memory manipulation.",
                effect: "Resistance to memory alteration and identity-affecting status effects",
                icon: 79
            },
            humor: "The 'ethical guidelines' you establish include a 'memory nutrition label' that rates memories on a scale from 'Empty Calories' (celebrity gossip, what you had for lunch) to 'Essential Nutrients' (formative experiences, first loves), with a recommended daily allowance of core identity memories."
        }
    ],
    finalReward: {
        name: "Memory Master",
        description: "The ability to safely navigate, modify, and trade in the memory market.",
        effect: "Access to Mnemosyne's private collection of rare historical and experiential memories",
        icon: 87
    }
};

module.exports = memoryMerchant;
