// Wasteland Botanical Gardens Quest Line
const questLine = {
  "name": "Wasteland Botanical Gardens",
  "description": "Create a botanical garden to preserve plant species and develop new radiation-resistant varieties for food and medicine.",
  "startingNPC": {
    "name": "Gardener Glow",
    "appearance": "A serene person with plants growing in their hair, wearing overalls covered in seed pouches and carrying specialized gardening tools made from repurposed weapons.",
    "personality": "Patient and nurturing, speaks to plants as if they're people, gets excited about mutations that others find disturbing, and measures time in growing seasons.",
    "dialogueIntro": "The plants are speaking to us, if only we'd listen! *strokes a mutated flower* These new species are the future, not monsters to fear! Help me create a sanctuary for botanical discovery, and we'll grow a better tomorrow from the irradiated soil of today!"
  },
  "startingMap": 165,
  "quests": [
    {
      "name": "Site Preparation",
      "description": "Site Preparation - Part of the Wasteland Botanical Gardens quest line.",
      "objectives": [
        {
          "description": "Find a suitable location with varied soil types",
          "mapId": 165,
          "npcName": "Location Scout Liam",
          "reward": "Wasteland Botanical Gardens Token 1-1",
          "dialogueSuccess": "You've completed objective 1 of Site Preparation! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Clear the area of dangerous debris",
          "mapId": 166,
          "npcName": "Debris Clearer Darla",
          "reward": "Wasteland Botanical Gardens Token 1-2",
          "dialogueSuccess": "You've completed objective 2 of Site Preparation! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Test and remediate soil contamination",
          "mapId": 167,
          "npcName": "Soil Scientist Sam",
          "reward": "Wasteland Botanical Gardens Token 1-3",
          "dialogueSuccess": "You've completed objective 3 of Site Preparation! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Create irrigation systems",
          "mapId": 165,
          "npcName": "Irrigation Engineer Irene",
          "reward": "Wasteland Botanical Gardens Token 1-4",
          "dialogueSuccess": "You've completed objective 4 of Site Preparation! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Establish protective boundaries",
          "mapId": 166,
          "npcName": "Boundary Builder Bob",
          "reward": "Wasteland Botanical Gardens Token 1-5",
          "dialogueSuccess": "You've completed objective 5 of Site Preparation! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        }
      ]
    },
    {
      "name": "Specimen Collection",
      "description": "Specimen Collection - Part of the Wasteland Botanical Gardens quest line.",
      "objectives": [
        {
          "description": "Collect surviving pre-war plant species",
          "mapId": 165,
          "npcName": "Pre-war Plant Hunter Penny",
          "reward": "Wasteland Botanical Gardens Token 2-1",
          "dialogueSuccess": "You've completed objective 1 of Specimen Collection! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Gather mutated plant varieties",
          "mapId": 166,
          "npcName": "Mutation Collector Mike",
          "reward": "Wasteland Botanical Gardens Token 2-2",
          "dialogueSuccess": "You've completed objective 2 of Specimen Collection! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Find seeds from abandoned seed banks",
          "mapId": 167,
          "npcName": "Seed Bank Raider Rita",
          "reward": "Wasteland Botanical Gardens Token 2-3",
          "dialogueSuccess": "You've completed objective 3 of Specimen Collection! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Rescue rare plants from threatened areas",
          "mapId": 165,
          "npcName": "Rare Plant Rescuer Rachel",
          "reward": "Wasteland Botanical Gardens Token 2-4",
          "dialogueSuccess": "You've completed objective 4 of Specimen Collection! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Document each specimen's properties",
          "mapId": 166,
          "npcName": "Plant Documenter Donna",
          "reward": "Wasteland Botanical Gardens Token 2-5",
          "dialogueSuccess": "You've completed objective 5 of Specimen Collection! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        }
      ]
    },
    {
      "name": "Greenhouse Construction",
      "description": "Greenhouse Construction - Part of the Wasteland Botanical Gardens quest line.",
      "objectives": [
        {
          "description": "Salvage materials for greenhouse structures",
          "mapId": 165,
          "npcName": "Materials Salvager Mack",
          "reward": "Wasteland Botanical Gardens Token 3-1",
          "dialogueSuccess": "You've completed objective 1 of Greenhouse Construction! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Build the main conservatory",
          "mapId": 166,
          "npcName": "Conservatory Constructor Carl",
          "reward": "Wasteland Botanical Gardens Token 3-2",
          "dialogueSuccess": "You've completed objective 2 of Greenhouse Construction! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Create specialized growing environments",
          "mapId": 167,
          "npcName": "Environment Engineer Emma",
          "reward": "Wasteland Botanical Gardens Token 3-3",
          "dialogueSuccess": "You've completed objective 3 of Greenhouse Construction! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Set up water collection and filtration",
          "mapId": 165,
          "npcName": "Water System Designer Wade",
          "reward": "Wasteland Botanical Gardens Token 3-4",
          "dialogueSuccess": "You've completed objective 4 of Greenhouse Construction! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Install climate control systems",
          "mapId": 166,
          "npcName": "Climate Technician Tina",
          "reward": "Wasteland Botanical Gardens Token 3-5",
          "dialogueSuccess": "You've completed objective 5 of Greenhouse Construction! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        }
      ]
    },
    {
      "name": "Research Establishment",
      "description": "Research Establishment - Part of the Wasteland Botanical Gardens quest line.",
      "objectives": [
        {
          "description": "Set up a botanical laboratory",
          "mapId": 165,
          "npcName": "Lab Setup Specialist Lisa",
          "reward": "Wasteland Botanical Gardens Token 4-1",
          "dialogueSuccess": "You've completed objective 1 of Research Establishment! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Create a seed bank and storage system",
          "mapId": 166,
          "npcName": "Seed Bank Organizer Oscar",
          "reward": "Wasteland Botanical Gardens Token 4-2",
          "dialogueSuccess": "You've completed objective 2 of Research Establishment! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Establish breeding and hybridization areas",
          "mapId": 167,
          "npcName": "Breeding Area Designer Brenda",
          "reward": "Wasteland Botanical Gardens Token 4-3",
          "dialogueSuccess": "You've completed objective 3 of Research Establishment! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Develop testing areas for edibility and uses",
          "mapId": 165,
          "npcName": "Testing Coordinator Tom",
          "reward": "Wasteland Botanical Gardens Token 4-4",
          "dialogueSuccess": "You've completed objective 4 of Research Establishment! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Create a documentation and research library",
          "mapId": 166,
          "npcName": "Research Librarian Larry",
          "reward": "Wasteland Botanical Gardens Token 4-5",
          "dialogueSuccess": "You've completed objective 5 of Research Establishment! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        }
      ]
    },
    {
      "name": "Garden Opening",
      "description": "Garden Opening - Part of the Wasteland Botanical Gardens quest line.",
      "objectives": [
        {
          "description": "Design educational garden paths and signs",
          "mapId": 165,
          "npcName": "Path Designer Patty",
          "reward": "Wasteland Botanical Gardens Token 5-1",
          "dialogueSuccess": "You've completed objective 1 of Garden Opening! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Create displays explaining plant uses",
          "mapId": 166,
          "npcName": "Display Creator Dexter",
          "reward": "Wasteland Botanical Gardens Token 5-2",
          "dialogueSuccess": "You've completed objective 2 of Garden Opening! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Train guides for garden tours",
          "mapId": 167,
          "npcName": "Tour Guide Trainer Grace",
          "reward": "Wasteland Botanical Gardens Token 5-3",
          "dialogueSuccess": "You've completed objective 3 of Garden Opening! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Prepare for opening day ceremony",
          "mapId": 165,
          "npcName": "Ceremony Organizer Olivia",
          "reward": "Wasteland Botanical Gardens Token 5-4",
          "dialogueSuccess": "You've completed objective 4 of Garden Opening! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Establish a system for plant distribution",
          "mapId": 166,
          "npcName": "Distribution Developer Dana",
          "reward": "Wasteland Botanical Gardens Token 5-5",
          "dialogueSuccess": "You've completed objective 5 of Garden Opening! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        }
      ]
    }
  ]
};

module.exports = questLine;