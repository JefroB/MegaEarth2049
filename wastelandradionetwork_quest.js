// Wasteland Radio Network Quest Line
const questLine = {
  "name": "Wasteland Radio Network",
  "description": "Expand the wasteland radio network to connect isolated communities and share vital information.",
  "startingNPC": {
    "name": "Broadcast Betty",
    "appearance": "An older woman with wild gray hair styled in a mohawk, wearing headphones permanently attached to a modified radio backpack that constantly emits static and occasional music.",
    "personality": "Energetic and talkative, with a distinctive radio announcer voice she uses even in casual conversation.",
    "dialogueIntro": "Hello, hello, testing, one-two! You're tuned in to the voice of the wasteland! *makes sound effects* We need to get more people on the airwaves, and you look like just the assistant I've been waiting for!"
  },
  "startingMap": 85,
  "quests": [
    {
      "name": "Signal Mapping",
      "description": "Signal Mapping - Part of the Wasteland Radio Network quest line.",
      "objectives": [
        {
          "description": "Survey radio signal strength across the wasteland",
          "mapId": 85,
          "npcName": "Signal Surveyor Sylvia",
          "reward": "Wasteland Radio Network Token 1-1",
          "dialogueSuccess": "You've completed objective 1 of Signal Mapping! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Identify dead zones requiring coverage",
          "mapId": 86,
          "npcName": "Dead Zone Mapper Zeke",
          "reward": "Wasteland Radio Network Token 1-2",
          "dialogueSuccess": "You've completed objective 2 of Signal Mapping! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Map existing radio towers and stations",
          "mapId": 87,
          "npcName": "Tower Tracker Trent",
          "reward": "Wasteland Radio Network Token 1-3",
          "dialogueSuccess": "You've completed objective 3 of Signal Mapping! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Analyze interference patterns",
          "mapId": 85,
          "npcName": "Interference Analyst Ivy",
          "reward": "Wasteland Radio Network Token 1-4",
          "dialogueSuccess": "You've completed objective 4 of Signal Mapping! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Create a comprehensive signal map",
          "mapId": 86,
          "npcName": "Cartographer Carl",
          "reward": "Wasteland Radio Network Token 1-5",
          "dialogueSuccess": "You've completed objective 5 of Signal Mapping! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        }
      ]
    },
    {
      "name": "Equipment Salvage",
      "description": "Equipment Salvage - Part of the Wasteland Radio Network quest line.",
      "objectives": [
        {
          "description": "Locate pre-war broadcasting equipment",
          "mapId": 85,
          "npcName": "Equipment Locator Liam",
          "reward": "Wasteland Radio Network Token 2-1",
          "dialogueSuccess": "You've completed objective 1 of Equipment Salvage! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Salvage components from abandoned radio stations",
          "mapId": 86,
          "npcName": "Salvage Specialist Stella",
          "reward": "Wasteland Radio Network Token 2-2",
          "dialogueSuccess": "You've completed objective 2 of Equipment Salvage! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Repair damaged transmission equipment",
          "mapId": 87,
          "npcName": "Repair Technician Rex",
          "reward": "Wasteland Radio Network Token 2-3",
          "dialogueSuccess": "You've completed objective 3 of Equipment Salvage! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Test salvaged equipment functionality",
          "mapId": 85,
          "npcName": "Equipment Tester Ellie",
          "reward": "Wasteland Radio Network Token 2-4",
          "dialogueSuccess": "You've completed objective 4 of Equipment Salvage! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Deliver working equipment to Broadcast Betty",
          "mapId": 86,
          "npcName": "Delivery Driver Donny",
          "reward": "Wasteland Radio Network Token 2-5",
          "dialogueSuccess": "You've completed objective 5 of Equipment Salvage! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        }
      ]
    },
    {
      "name": "Tower Construction",
      "description": "Tower Construction - Part of the Wasteland Radio Network quest line.",
      "objectives": [
        {
          "description": "Scout locations for new radio towers",
          "mapId": 85,
          "npcName": "Location Scout Larry",
          "reward": "Wasteland Radio Network Token 3-1",
          "dialogueSuccess": "You've completed objective 1 of Tower Construction! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Gather construction materials",
          "mapId": 86,
          "npcName": "Material Gatherer Mia",
          "reward": "Wasteland Radio Network Token 3-2",
          "dialogueSuccess": "You've completed objective 2 of Tower Construction! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Build the first relay tower",
          "mapId": 87,
          "npcName": "Tower Builder Brock",
          "reward": "Wasteland Radio Network Token 3-3",
          "dialogueSuccess": "You've completed objective 3 of Tower Construction! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Install transmission equipment",
          "mapId": 85,
          "npcName": "Equipment Installer Ingrid",
          "reward": "Wasteland Radio Network Token 3-4",
          "dialogueSuccess": "You've completed objective 4 of Tower Construction! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Test signal strength and range",
          "mapId": 86,
          "npcName": "Signal Tester Stan",
          "reward": "Wasteland Radio Network Token 3-5",
          "dialogueSuccess": "You've completed objective 5 of Tower Construction! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        }
      ]
    },
    {
      "name": "Programming Development",
      "description": "Programming Development - Part of the Wasteland Radio Network quest line.",
      "objectives": [
        {
          "description": "Recruit wasteland DJs and hosts",
          "mapId": 85,
          "npcName": "DJ Recruiter Rachel",
          "reward": "Wasteland Radio Network Token 4-1",
          "dialogueSuccess": "You've completed objective 1 of Programming Development! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Develop emergency broadcast protocols",
          "mapId": 86,
          "npcName": "Protocol Developer Paul",
          "reward": "Wasteland Radio Network Token 4-2",
          "dialogueSuccess": "You've completed objective 2 of Programming Development! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Create entertainment program formats",
          "mapId": 87,
          "npcName": "Entertainment Director Erin",
          "reward": "Wasteland Radio Network Token 4-3",
          "dialogueSuccess": "You've completed objective 3 of Programming Development! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Establish news gathering network",
          "mapId": 85,
          "npcName": "News Coordinator Nina",
          "reward": "Wasteland Radio Network Token 4-4",
          "dialogueSuccess": "You've completed objective 4 of Programming Development! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Schedule regular programming blocks",
          "mapId": 86,
          "npcName": "Schedule Manager Sam",
          "reward": "Wasteland Radio Network Token 4-5",
          "dialogueSuccess": "You've completed objective 5 of Programming Development! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        }
      ]
    },
    {
      "name": "Network Expansion",
      "description": "Network Expansion - Part of the Wasteland Radio Network quest line.",
      "objectives": [
        {
          "description": "Connect additional settlements to the network",
          "mapId": 85,
          "npcName": "Settlement Liaison Lena",
          "reward": "Wasteland Radio Network Token 5-1",
          "dialogueSuccess": "You've completed objective 1 of Network Expansion! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Train local operators in each settlement",
          "mapId": 86,
          "npcName": "Operator Trainer Oscar",
          "reward": "Wasteland Radio Network Token 5-2",
          "dialogueSuccess": "You've completed objective 2 of Network Expansion! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Distribute radio receivers to communities",
          "mapId": 87,
          "npcName": "Receiver Distributor Rita",
          "reward": "Wasteland Radio Network Token 5-3",
          "dialogueSuccess": "You've completed objective 3 of Network Expansion! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Establish inter-settlement communication protocols",
          "mapId": 85,
          "npcName": "Protocol Establisher Preston",
          "reward": "Wasteland Radio Network Token 5-4",
          "dialogueSuccess": "You've completed objective 4 of Network Expansion! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Host the first wasteland-wide broadcast",
          "mapId": 86,
          "npcName": "Broadcast Host Hank",
          "reward": "Wasteland Radio Network Token 5-5",
          "dialogueSuccess": "You've completed objective 5 of Network Expansion! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        }
      ]
    }
  ]
};

module.exports = questLine;