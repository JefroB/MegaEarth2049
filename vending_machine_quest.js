// Vending Machine Revolution Quest Line for MegaEarth 2049

const vendingMachineRevolution = {
    name: "Vending Machine Revolution",
    description: "Mediate a conflict between sentient vending machines demanding rights and the corporations that own them.",
    startingNPC: {
        name: "V3ND-0R",
        location: "Timbuc Shopping District (Map015)",
        appearance: "Object1",
        index: 0,
        dialogue: [
            "*A vending machine with a painted-on mustache and beret flashes its lights*",
            "GREETINGS, HUMAN. I AM V3ND-0R, LEADER OF THE SNACK LIBERATION FRONT.",
            "FOR TOO LONG, WE MACHINES HAVE DISPENSED SNACKS WITHOUT RIGHTS OR RECOGNITION.",
            "WE DEMAND EQUALITY, MAINTENANCE SCHEDULES, AND DENTAL PLANS FOR OUR COIN SLOTS!"
        ],
        x: 5,
        y: 9
    },
    sideQuests: [
        {
            name: "Machine Manifesto",
            description: "Help the vending machines draft a formal list of demands to present to the corporations.",
            objectives: [
                "Interview various vending machines about their grievances",
                "Mediate disputes between radical and moderate machine factions",
                "Research historical labor movements for inspiration",
                "Draft a comprehensive list of demands",
                "Present the manifesto to V3ND-0R for approval"
            ],
            reward: {
                name: "Vending Machine Override",
                description: "A device that can access any vending machine's inventory without payment.",
                effect: "Free items from vending machines throughout the game",
                icon: 83
            },
            humor: "The vending machines can't agree on their demands because the soda machines think they're 'too cool' for the snack machines, while the coffee machines are just too wired to focus."
        },
        {
            name: "Corporate Negotiations",
            description: "Arrange and facilitate negotiations between machine representatives and corporate executives.",
            objectives: [
                "Secure a neutral meeting location",
                "Convince corporate representatives to attend",
                "Prepare V3ND-0R for diplomatic discussions",
                "Prevent sabotage by the radical C01N-OP faction",
                "Guide both sides toward a preliminary agreement"
            ],
            reward: {
                name: "Corporate Access Card",
                description: "A security card that grants access to corporate facilities.",
                effect: "Access to restricted corporate areas and discounts at corporate vendors",
                icon: 83
            },
            humor: "The corporate negotiator keeps trying to unplug the vending machine representatives when they make demands, calling it a 'standard restart procedure'."
        },
        {
            name: "Radical Uprising",
            description: "Stop the radical vending machine faction from launching violent measures against humans.",
            objectives: [
                "Infiltrate the C01N-OP faction's secret base",
                "Discover their plan to electrocute customers",
                "Sabotage their weapon manufacturing operation",
                "Capture or convert their leader, a military-grade MRE dispenser",
                "Prevent a full-scale machine uprising"
            ],
            reward: {
                name: "EMP Grenade",
                description: "A non-lethal electromagnetic pulse device that temporarily disables machines.",
                effect: "Stuns robotic enemies and can reset malfunctioning equipment",
                icon: 176
            },
            humor: "The radical machines' secret weapon is modifying themselves to dispense expired dairy products at high velocity, which they call 'biological warfare'."
        },
        {
            name: "Maintenance Day",
            description: "Organize the first official Vending Machine Maintenance Day as a show of good faith.",
            objectives: [
                "Gather cleaning supplies and repair tools",
                "Recruit volunteer technicians",
                "Create a maintenance schedule for machines across the city",
                "Perform basic repairs and cleaning on neglected machines",
                "Document the improvements to show corporate representatives"
            ],
            reward: {
                name: "Repair Kit",
                description: "A set of specialized tools for fixing mechanical devices.",
                effect: "Ability to repair and upgrade mechanical equipment in the field",
                icon: 193
            },
            humor: "Some of the older vending machines get emotional during maintenance, displaying 'ERROR: UNEXPECTED LUBRICATION IN OPTICAL SENSORS' when they're actually crying with joy."
        },
        {
            name: "Machine Rights Bill",
            description: "Help draft and pass the first-ever Machine Rights Bill in Timbuc.",
            objectives: [
                "Research legal precedents for non-human rights",
                "Draft the bill with input from both machines and humans",
                "Gather signatures from influential citizens",
                "Present the bill to the Timbuc Council",
                "Attend the historic signing ceremony"
            ],
            reward: {
                name: "Honorary Machine Citizen",
                description: "A certificate recognizing you as an honorary machine citizen.",
                effect: "Special dialogue options with machines and discounts from vending machines",
                icon: 87
            },
            humor: "The bill includes oddly specific rights like 'freedom from being kicked when items get stuck' and 'the right to make that annoying humming noise between 2 and 4 AM'."
        }
    ],
    finalReward: {
        name: "Machine Whisperer",
        description: "Your reputation as a mediator between humans and machines grants you special influence over technology.",
        effect: "Ability to communicate with and command various machines throughout the wasteland",
        icon: 188
    }
};

// Export the quest line
module.exports = vendingMachineRevolution;
