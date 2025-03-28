// Memory Merchant Quest Line for MegaEarth 2049

const memoryMerchant = {
    name: "Memory Merchant",
    description: "Enter the dangerous world of memory trading, where experiences and skills can be bought, sold, and stolen.",
    startingNPC: {
        name: "Mnemosyne",
        location: "Memory Den (Map047)",
        appearance: "Actor1",
        index: 0,
        dialogue: [
            "*A woman with iridescent eyes and neural ports visible at her temples studies you intently*",
            "You've got quality memories... I can tell just by looking at you.",
            "The memory trade isn't for everyone. Once you start buying and selling experiences, it changes you.",
            "But if you're willing to risk it, I can show you how to extract, store, and trade in the ultimate commodity—human experience."
        ],
        x: 9,
        y: 11
    },
    sideQuests: [
        {
            name: "Memory Extraction",
            description: "Learn the art of safely extracting and storing memories for trade.",
            objectives: [
                "Undergo the neural port installation procedure",
                "Learn to isolate specific memories for extraction",
                "Practice extracting your own non-essential memories",
                "Store memories in specialized containment units",
                "Successfully extract a memory from a willing volunteer"
            ],
            reward: {
                name: "Memory Extractor",
                description: "A device that can safely extract memories from willing subjects.",
                effect: "Ability to store up to five memories for later use or trade",
                icon: 79
            },
            humor: "The memory extraction process occasionally mixes in random sensory data, causing one of your stored memories of a romantic dinner to inexplicably include the smell of wet dog and the sensation of having sand in your shoes."
        },
        {
            name: "Black Market Memories",
            description: "Enter the underground memory trade and make your first deals.",
            objectives: [
                "Find the hidden memory market in the abandoned subway",
                "Establish your reputation by trading minor memories",
                "Identify valuable memories that fetch high prices",
                "Avoid memory addicts and law enforcement",
                "Complete your first major memory transaction"
            ],
            reward: {
                name: "Memory Authentication Tool",
                description: "A device that can verify the authenticity and quality of memories.",
                effect: "Ability to detect fake or corrupted memories before purchase",
                icon: 83
            },
            humor: "The authentication tool has an unnecessarily judgmental interface that rates memories on a scale from 'Barely Worth Remembering' to 'Actually Interesting For Once,' and frequently adds snarky commentary about people's vacation memories."
        },
        {
            name: "Stolen Experiences",
            description: "Deal with a dangerous memory thief who's forcibly extracting valuable memories from victims.",
            objectives: [
                "Investigate reports of memory theft victims",
                "Develop protection against forced memory extraction",
                "Set a trap for the memory thief using yourself as bait",
                "Recover the stolen memory cache",
                "Return memories to their rightful owners if possible"
            ],
            reward: {
                name: "Neural Firewall",
                description: "A mental defense system that prevents unwanted memory extraction.",
                effect: "Immunity to forced memory extraction and mental intrusion",
                icon: 79
            },
            humor: "The neural firewall manifests as a mental bouncer who looks suspiciously like your childhood gym teacher and responds to all unauthorized access attempts with embarrassing personal anecdotes from your awkward teenage years."
        },
        {
            name: "Memory Addiction",
            description: "Help a friend who has become addicted to experiencing other people's memories.",
            objectives: [
                "Track down your friend who has disappeared into the memory den",
                "Learn about the nature of memory addiction",
                "Find a specialist who can treat memory dependency",
                "Gather ingredients for the experimental treatment",
                "Help your friend through the difficult withdrawal process"
            ],
            reward: {
                name: "Memory Purifier",
                description: "A device that can cleanse corrupted or addictive memories.",
                effect: "Ability to remove harmful mental influences and memory-based manipulations",
                icon: 72
            },
            humor: "The purifier works by replacing addictive memories with incredibly boring ones, leading your friend to complain that they now have detailed memories of watching paint dry in seventeen different colors, complete with drying time statistics."
        },
        {
            name: "The Ultimate Memory",
            description: "Discover a conspiracy to create and sell the 'perfect memory' that can permanently alter personalities.",
            objectives: [
                "Investigate rumors of a revolutionary new memory on the market",
                "Infiltrate the lab where the perfect memory is being developed",
                "Discover the true purpose behind the perfect memory",
                "Steal a sample to understand its effects",
                "Decide whether to destroy the research or use it"
            ],
            reward: {
                name: "Memory Synthesis Module",
                description: "A device that can combine multiple memories into new experiences.",
                effect: "Ability to create custom memories with specific emotional or informational content",
                icon: 79
            },
            humor: "Your first attempt at memory synthesis accidentally combines your knowledge of cooking with childhood playground games, resulting in a memory of an intensely competitive professional cooking competition where chefs battle by playing deadly serious games of hopscotch with pots of boiling soup."
        }
    ],
    finalReward: {
        name: "Perfect Recall",
        description: "The ability to access, store, and integrate memories with unprecedented clarity and control.",
        effect: "Perfect memory of all experiences and the ability to temporarily access skills from stored memories",
        icon: 87
    }
};

module.exports = memoryMerchant;