// Underground Farming Quest Line
const questLine = {
  "name": "Underground Farming",
  "description": "Develop a network of underground farms using mutated plants and fungi to feed the wasteland communities.",
  "startingNPC": {
    "name": "Fungus Freddie",
    "appearance": "A tall, lanky man covered in bioluminescent mushroom spores that glow in different colors based on his mood.",
    "personality": "Eccentric and passionate about fungi, speaks to his mushrooms as if they're his children.",
    "dialogueIntro": "Hey there, surface-dweller! Want to get your hands dirty with the future of food? These beauties *gestures to glowing mushrooms* are just the beginning!"
  },
  "startingMap": 70,
  "quests": [
    {
      "name": "Spore Collection",
      "description": "Spore Collection - Part of the Underground Farming quest line.",
      "objectives": [
        {
          "description": "Collect rare spores from the toxic caverns",
          "mapId": 70,
          "npcName": "Spore Collector Sammy",
          "reward": "Underground Farming Token 1-1",
          "dialogueSuccess": "You've completed objective 1 of Spore Collection! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Analyze spore viability with Dr. Myco",
          "mapId": 71,
          "npcName": "Dr. Myco",
          "reward": "Underground Farming Token 1-2",
          "dialogueSuccess": "You've completed objective 2 of Spore Collection! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Plant spores in experimental chambers",
          "mapId": 72,
          "npcName": "Growth Technician Gina",
          "reward": "Underground Farming Token 1-3",
          "dialogueSuccess": "You've completed objective 3 of Spore Collection! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Monitor growth patterns for 3 cycles",
          "mapId": 70,
          "npcName": "Cycle Monitor Monty",
          "reward": "Underground Farming Token 1-4",
          "dialogueSuccess": "You've completed objective 4 of Spore Collection! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Report findings to Fungus Freddie",
          "mapId": 71,
          "npcName": "Research Assistant Riley",
          "reward": "Underground Farming Token 1-5",
          "dialogueSuccess": "You've completed objective 5 of Spore Collection! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        }
      ]
    },
    {
      "name": "Hydroponic Setup",
      "description": "Hydroponic Setup - Part of the Underground Farming quest line.",
      "objectives": [
        {
          "description": "Salvage pipes from abandoned water treatment plant",
          "mapId": 70,
          "npcName": "Salvage Expert Sally",
          "reward": "Underground Farming Token 2-1",
          "dialogueSuccess": "You've completed objective 1 of Hydroponic Setup! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Repair water filtration system",
          "mapId": 71,
          "npcName": "Pipe Fitter Phil",
          "reward": "Underground Farming Token 2-2",
          "dialogueSuccess": "You've completed objective 2 of Hydroponic Setup! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Install grow lights in the main cavern",
          "mapId": 72,
          "npcName": "Illumination Engineer Irene",
          "reward": "Underground Farming Token 2-3",
          "dialogueSuccess": "You've completed objective 3 of Hydroponic Setup! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Set up nutrient delivery system",
          "mapId": 70,
          "npcName": "Nutrient Specialist Nina",
          "reward": "Underground Farming Token 2-4",
          "dialogueSuccess": "You've completed objective 4 of Hydroponic Setup! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Test the system with starter cultures",
          "mapId": 71,
          "npcName": "System Tester Terry",
          "reward": "Underground Farming Token 2-5",
          "dialogueSuccess": "You've completed objective 5 of Hydroponic Setup! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        }
      ]
    },
    {
      "name": "Pest Control",
      "description": "Pest Control - Part of the Underground Farming quest line.",
      "objectives": [
        {
          "description": "Identify mutated insects attacking the crops",
          "mapId": 70,
          "npcName": "Entomologist Eddie",
          "reward": "Underground Farming Token 3-1",
          "dialogueSuccess": "You've completed objective 1 of Pest Control! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Develop natural predator solution",
          "mapId": 71,
          "npcName": "Predator Breeder Penny",
          "reward": "Underground Farming Token 3-2",
          "dialogueSuccess": "You've completed objective 2 of Pest Control! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Introduce predator species to the farm",
          "mapId": 72,
          "npcName": "Ecosystem Engineer Ethan",
          "reward": "Underground Farming Token 3-3",
          "dialogueSuccess": "You've completed objective 3 of Pest Control! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Monitor ecosystem balance",
          "mapId": 70,
          "npcName": "Balance Keeper Bella",
          "reward": "Underground Farming Token 3-4",
          "dialogueSuccess": "You've completed objective 4 of Pest Control! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Establish sustainable pest management",
          "mapId": 71,
          "npcName": "Pest Manager Pam",
          "reward": "Underground Farming Token 3-5",
          "dialogueSuccess": "You've completed objective 5 of Pest Control! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        }
      ]
    },
    {
      "name": "Harvest Festival",
      "description": "Harvest Festival - Part of the Underground Farming quest line.",
      "objectives": [
        {
          "description": "Harvest the first generation of crops",
          "mapId": 70,
          "npcName": "Harvest Helper Harry",
          "reward": "Underground Farming Token 4-1",
          "dialogueSuccess": "You've completed objective 1 of Harvest Festival! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Prepare samples for the wasteland communities",
          "mapId": 71,
          "npcName": "Sample Preparer Sasha",
          "reward": "Underground Farming Token 4-2",
          "dialogueSuccess": "You've completed objective 2 of Harvest Festival! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Organize the Underground Harvest Festival",
          "mapId": 72,
          "npcName": "Festival Organizer Fiona",
          "reward": "Underground Farming Token 4-3",
          "dialogueSuccess": "You've completed objective 3 of Harvest Festival! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Gather feedback from festival attendees",
          "mapId": 70,
          "npcName": "Feedback Collector Felix",
          "reward": "Underground Farming Token 4-4",
          "dialogueSuccess": "You've completed objective 4 of Harvest Festival! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Improve crop varieties based on feedback",
          "mapId": 71,
          "npcName": "Crop Improver Clara",
          "reward": "Underground Farming Token 4-5",
          "dialogueSuccess": "You've completed objective 5 of Harvest Festival! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        }
      ]
    },
    {
      "name": "Distribution Network",
      "description": "Distribution Network - Part of the Underground Farming quest line.",
      "objectives": [
        {
          "description": "Map potential distribution routes",
          "mapId": 70,
          "npcName": "Route Mapper Remy",
          "reward": "Underground Farming Token 5-1",
          "dialogueSuccess": "You've completed objective 1 of Distribution Network! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Recruit couriers for the delivery network",
          "mapId": 71,
          "npcName": "Courier Coordinator Cora",
          "reward": "Underground Farming Token 5-2",
          "dialogueSuccess": "You've completed objective 2 of Distribution Network! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Establish trade agreements with settlements",
          "mapId": 72,
          "npcName": "Trade Negotiator Ned",
          "reward": "Underground Farming Token 5-3",
          "dialogueSuccess": "You've completed objective 3 of Distribution Network! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Set up storage facilities at key locations",
          "mapId": 70,
          "npcName": "Storage Specialist Stan",
          "reward": "Underground Farming Token 5-4",
          "dialogueSuccess": "You've completed objective 4 of Distribution Network! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Coordinate the first major distribution",
          "mapId": 71,
          "npcName": "Distribution Director Dina",
          "reward": "Underground Farming Token 5-5",
          "dialogueSuccess": "You've completed objective 5 of Distribution Network! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        }
      ]
    }
  ]
};

module.exports = questLine;