// Wasteland Postal Service Quest Line for MegaEarth 2049

const wastelandPostalService = {
    name: "Wasteland Postal Service",
    description: "Help revive the lost art of mail delivery in a world where digital communication is monitored and physical delivery is dangerous but private.",
    startingNPC: {
        name: "Postmaster Pax",
        location: "Timbuc Central Plaza (Map114)",
        appearance: "People2",
        index: 3,
        dialogue: [
            "*A weathered individual in a patched-together uniform sorts through a bag of letters*",
            "Neither rain, nor radiation, nor mutant attacks, nor corporate assassins shall keep us from our appointed rounds!",
            "The Wasteland Postal Service is making a comeback. Corps monitor all digital comms, but they can't track every physical letter.",
            "We need couriers with your... particular set of survival skills. Interested in carrying the mail?"
        ],
        x: 15,
        y: 9
    },
    sideQuests: [
        {
            name: "Special Delivery",
            description: "Deliver a package to a remote settlement while avoiding corporate interceptors.",
            objectives: [
                "Collect the special package from Postmaster Pax",
                "Navigate through the dangerous Dorlund Lava Fields",
                "Avoid or neutralize the OmniCorp interceptors",
                "Deliver the package to the settlement leader",
                "Return to Pax with proof of delivery"
            ],
            reward: {
                name: "Courier Bag",
                description: "A reinforced messenger bag with hidden compartments.",
                effect: "Increases inventory capacity by 5 slots",
                icon: 176
            },
            humor: "The 'special package' turns out to be a birthday cake that somehow survived the journey intact despite your multiple falls into radioactive puddles and a brief firefight with mutant scorpions."
        },
        {
            name: "Mail Route Mapping",
            description: "Chart safe delivery routes through dangerous territories.",
            objectives: [
                "Scout the northern wasteland for potential routes",
                "Mark safe rest points and danger zones",
                "Test the route timing with a dummy package",
                "Document corporate patrol patterns",
                "Create a secure map for postal couriers"
            ],
            reward: {
                name: "Cartographer's Compass",
                description: "A navigation device that reveals hidden paths.",
                effect: "Shows the shortest safe route to any discovered location",
                icon: 83
            },
            humor: "Your 'safe route' accidentally goes through a Punk territory, but they're so confused by your postal uniform that they form an honor guard and start asking when they'll receive their long-overdue mail-order brides."
        },
        {
            name: "Dead Letter Office",
            description: "Recover a bag of lost mail from a courier who never returned.",
            objectives: [
                "Track the missing courier's last known route",
                "Investigate the abandoned outpost where they were last seen",
                "Recover the mail bag from a nest of mutant postal rats",
                "Sort through the mail to identify priority deliveries",
                "Complete the missing courier's final deliveries"
            ],
            reward: {
                name: "Dead Letter Decoder",
                description: "A device that can restore damaged or faded writing.",
                effect: "Reveals hidden text and messages in documents and on walls",
                icon: 83
            },
            humor: "The 'mutant postal rats' have organized the mail by zip code and priority, and one is wearing a tiny makeshift postal hat. They reluctantly give up the mail but ask if you're hiring."
        },
        {
            name: "Stamp of Approval",
            description: "Create a new authentication system for official mail to prevent forgeries.",
            objectives: [
                "Collect rare materials for creating unique stamps",
                "Design a forgery-resistant postal mark",
                "Test the new stamps against known counterfeiters",
                "Implement a verification protocol for couriers",
                "Train postal workers on the new system"
            ],
            reward: {
                name: "Authentication Stamp",
                description: "A stamp that marks items with an unforgeable postal seal.",
                effect: "Can verify the authenticity of any item or document",
                icon: 144
            },
            humor: "Your 'unforgeable' stamp design is based on a complex pattern of coffee stains, smudges, and what appears to be a thumbprint in radioactive ink, which works perfectly because no one can reproduce your specific level of messiness."
        },
        {
            name: "Going Postal",
            description: "Defend the central post office from corporate agents trying to shut down the independent mail service.",
            objectives: [
                "Set up defensive positions around the post office",
                "Recruit allies from among satisfied postal customers",
                "Intercept the corporate sabotage team",
                "Protect the mail sorting facility during the attack",
                "Drive off the corporate agents permanently"
            ],
            reward: {
                name: "Postal Uniform",
                description: "An official Wasteland Postal Service uniform that commands respect.",
                effect: "50% less likely to be attacked in neutral territories",
                icon: 135
            },
            humor: "During the attack, you discover that half the corporate agents were actually there to retrieve their own secret personal mail, including love letters, magazine subscriptions, and a 'Cheese of the Month Club' delivery that had been stuck in transit for three years."
        }
    ],
    finalReward: {
        name: "Postmaster General",
        description: "Official recognition as a high-ranking member of the Wasteland Postal Service.",
        effect: "Access to the postal network for fast travel between major settlements",
        icon: 145
    }
};

module.exports = wastelandPostalService;
