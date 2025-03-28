// Mutant Cooking Show Quest Line for MegaEarth 2049

const mutantCookingShow = {
    name: "Mutant Cooking Show",
    description: "Participate in a bizarre cooking competition using questionable ingredients from the wasteland.",
    startingNPC: {
        name: "Chef Hazmat",
        location: "Timbuc Inn (Map013)",
        appearance: "People3",
        index: 1,
        dialogue: [
            "*A person in a stained chef's coat and what appears to be a modified hazmat helmet stirs a bubbling pot*",
            "You! You look like someone with a strong stomach and weaker survival instincts!",
            "I'm organizing 'Apocalypse Kitchen' - the wasteland's first competitive cooking show using... local ingredients.",
            "We need contestants who won't die from taste-testing. Interested in culinary fame and possible mutation?"
        ],
        x: 5,
        y: 8
    },
    sideQuests: [
        {
            name: "Ingredient Hunt",
            description: "Gather rare and dangerous ingredients from around the wasteland for the competition.",
            objectives: [
                "Harvest glowing mushrooms from the Timbuc Cellar",
                "Extract venom sacs from mutant scorpions",
                "Collect acid fruit from the toxic waste dump",
                "Hunt a rare three-headed wasteland chicken",
                "Steal experimental flavor enhancers from a Vitalix lab"
            ],
            reward: {
                name: "Gastro-Analyzer",
                description: "A device that can identify the edibility and effects of any substance.",
                effect: "Immunity to food-based poison damage",
                icon: 176
            },
            humor: "The 'rare three-headed wasteland chicken' turns out to be a regular chicken that's wearing a tiny handmade helmet with two fake heads attached, created by a farmer trying to increase prices by making their livestock seem more 'authentically mutated.'"
        },
        {
            name: "Kitchen Nightmare",
            description: "Help renovate an abandoned restaurant into a suitable venue for the cooking show.",
            objectives: [
                "Clear out the mutant rat infestation in the kitchen",
                "Repair or replace the damaged cooking equipment",
                "Restore power to the refrigeration units",
                "Set up a seating area for the audience and judges",
                "Install safety measures for containing potential culinary disasters"
            ],
            reward: {
                name: "Culinary Multitool",
                description: "A Swiss Army knife of cooking implements that can prepare any ingredient.",
                effect: "Allows field preparation of ingredients for enhanced healing items",
                icon: 176
            },
            humor: "The 'safety measures' include emergency shower stations that accidentally use cooking oil instead of water, fire extinguishers filled with flour (technically correct for grease fires), and a 'panic room' that's just a walk-in freezer with motivational posters."
        },
        {
            name: "Celebrity Chef",
            description: "Recruit judges for the cooking competition, including a famous pre-collapse chef who's now a ghoul.",
            objectives: [
                "Track down the rumored location of Chef Bordeaux, now a ghoul",
                "Convince them that their culinary expertise is still valuable",
                "Help them overcome their insecurity about their appearance",
                "Recruit additional judges from various wasteland factions",
                "Protect the judges from assassination attempts by rival cooking shows"
            ],
            reward: {
                name: "Gourmet Palette",
                description: "Enhanced taste buds that can identify any ingredient or poison.",
                effect: "Automatically detects poisoned food and drink",
                icon: 82
            },
            humor: "Chef Bordeaux, despite being a ghoul, still maintains impossibly high culinary standards and spends the entire competition show spitting out contestants' food and calling them 'donkeys,' while ironically being the only judge who can safely taste the most radioactive dishes."
        },
        {
            name: "Cooking Battle",
            description: "Compete in the preliminary round of the cooking show against wasteland chefs with questionable methods.",
            objectives: [
                "Create an appetizer using mutant fungus",
                "Prepare a main course featuring irradiated meat",
                "Devise a dessert incorporating toxic waste byproducts",
                "Sabotage a rival chef who's using performance-enhancing cooking drugs",
                "Impress the judges without giving them radiation poisoning"
            ],
            reward: {
                name: "Recipe Book",
                description: "A collection of wasteland recipes that are both delicious and only mildly toxic.",
                effect: "Allows creation of food items with random beneficial mutations",
                icon: 144
            },
            humor: "Your rival chef's 'performance-enhancing cooking drugs' turn out to just be extremely caffeinated coffee that makes them cook at triple speed but with no accuracy whatsoever, resulting in dishes that look like abstract art and taste like 'anxiety with notes of burnt everything.'"
        },
        {
            name: "Final Course",
            description: "Compete in the grand finale while dealing with sabotage from corporate sponsors who want their contestant to win.",
            objectives: [
                "Create a signature dish that represents the wasteland's spirit",
                "Counter the corporate sabotage of your cooking station",
                "Adapt to the surprise ingredient: synthetic protein from NeuraTech",
                "Win over the audience with your culinary showmanship",
                "Defeat the corporate-sponsored chef in the final judgment"
            ],
            reward: {
                name: "Molecular Gastronomy Kit",
                description: "A device that can transform any ingredient into foam, gel, or powder.",
                effect: "Converts standard healing items into gourmet versions with additional effects",
                icon: 176
            },
            humor: "The corporate-sponsored chef's dish looks immaculate but tastes like 'marketing and sadness,' while your chaotic creation accidentally achieves fusion cuisine in the most literal sense - it's slightly radioactive and glows in the dark, which the judges declare 'ambiance enhancement' and award you bonus points for presentation."
        }
    ],
    finalReward: {
        name: "Wasteland Chef Supreme",
        description: "Recognition as the wasteland's premier culinary artist.",
        effect: "Ability to create special meals that provide powerful temporary buffs to the entire party",
        icon: 87
    }
};

module.exports = mutantCookingShow;
