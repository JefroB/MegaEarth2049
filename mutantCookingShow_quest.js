// Mutant Cooking Show Quest Line for MegaEarth 2049

const mutantCookingShow = {
    name: "Mutant Cooking Show",
    description: "Compete in and eventually host a popular cooking show that uses mutated ingredients from the wasteland.",
    startingNPC: {
        name: "Chef Radix",
        location: "Wasteland Diner (Map019)",
        appearance: "People2",
        index: 1,
        dialogue: [
            "*A chef with three arms stirs multiple pots simultaneously*",
            "You there! You look like someone with an adventurous palate!",
            "I'm hosting 'Mutant Kitchen Masters,' the wasteland's premier cooking competition.",
            "We need a new contestant with your... unique perspective on non-irradiated food!"
        ],
        x: 14,
        y: 8
    },
    sideQuests: [
        {
            name: "Ingredient Hunter",
            description: "Gather exotic and mutated ingredients from dangerous areas of the wasteland.",
            objectives: [
                "Harvest glowing mushrooms from the toxic caverns",
                "Collect eggs from mutant two-headed chickens",
                "Extract nectar from carnivorous plants",
                "Hunt a rare albino radscorpion for its meat",
                "Dive in the contaminated lake for special algae"
            ],
            reward: {
                name: "Gourmand's Bag",
                description: "A specialized container that preserves ingredients in perfect condition.",
                effect: "Food items never spoil and provide 25% better effects",
                icon: 176
            },
            humor: "The two-headed chickens lay eggs that are already deviled on the inside, complete with paprika and tiny pickle relish."
        },
        {
            name: "Kitchen Gladiator",
            description: "Compete in the first round of the cooking competition against wasteland chefs.",
            objectives: [
                "Create a signature dish that impresses the judges",
                "Sabotage a rival chef who's cheating",
                "Complete the 'Mystery Mutation' challenge",
                "Win the audience choice award with a crowd-pleasing dish",
                "Advance to the semi-finals of the competition"
            ],
            reward: {
                name: "Chef's Knife",
                description: "A perfectly balanced kitchen knife that never needs sharpening.",
                effect: "Can be used as a weapon that causes bleeding damage to organic enemies",
                icon: 97
            },
            humor: "One contestant is disqualified when their dish starts eating the judges instead of the other way around, which they argue should count as 'interactive dining'."
        },
        {
            name: "Taste of Fame",
            description: "Deal with your new celebrity status as a rising star chef in the wasteland.",
            objectives: [
                "Give cooking demonstrations in major settlements",
                "Create a signature dish for the governor's banquet",
                "Deal with an obsessive fan who's stealing your recipes",
                "Participate in a charity cook-off for wasteland orphans",
                "Secure a sponsor for your own cooking show segment"
            ],
            reward: {
                name: "Celebrity Disguise",
                description: "A kit that helps you avoid unwanted attention from fans.",
                effect: "Allows you to move through crowded areas without being recognized or stopped",
                icon: 144
            },
            humor: "Your most popular recipe becomes so famous that people start using your name as a verb for cooking, leading to confused conversations like 'I totally playernamed that radroach stew!'"
        },
        {
            name: "Kitchen Saboteur",
            description: "Uncover and stop a plot to sabotage the cooking competition finals.",
            objectives: [
                "Investigate food poisoning incidents at the semi-finals",
                "Identify the saboteur among the production crew",
                "Protect the special ingredients for the final competition",
                "Gather evidence of the sabotage plot",
                "Confront the mastermind behind the scheme"
            ],
            reward: {
                name: "Poison Detector",
                description: "A device that can detect toxins and contaminants in food and drink.",
                effect: "Immunity to poison effects from consumed items",
                icon: 72
            },
            humor: "The saboteur turns out to be a former contestant who was eliminated for their dish being 'too normal,' and they've been adding regular, non-mutated ingredients to everyone's food as revenge."
        },
        {
            name: "Cooking Champion",
            description: "Compete in the grand finale and become the new host of 'Mutant Kitchen Masters.'",
            objectives: [
                "Create a five-course meal showcasing wasteland cuisine",
                "Impress the celebrity judge (a mutant with enhanced taste buds)",
                "Overcome the final challenge: cooking with radioactive ingredients",
                "Defeat Chef Radix in a head-to-head cook-off",
                "Negotiate your contract as the new show host"
            ],
            reward: {
                name: "Master Chef's Hat",
                description: "The ceremonial hat worn by the champion of 'Mutant Kitchen Masters.'",
                effect: "All food items you cook provide double effects and duration",
                icon: 135
            },
            humor: "The show's ratings skyrocket when your signature dish temporarily gives the viewers at home enhanced taste buds through the TV screen, creating the wasteland's first 'taste-o-vision' broadcast."
        }
    ],
    finalReward: {
        name: "Culinary Transmutation",
        description: "The ability to transform even the most disgusting wasteland ingredients into delicious, beneficial food.",
        effect: "Can convert any organic material into high-quality food items with unique beneficial effects",
        icon: 98
    }
};

module.exports = mutantCookingShow;