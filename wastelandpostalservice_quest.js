// Wasteland Postal Service Quest Line
const questLine = {
  "name": "Wasteland Postal Service",
  "description": "Establish a reliable postal system to reconnect people across the wasteland and deliver hope along with mail.",
  "startingNPC": {
    "name": "Postmaster Patty",
    "appearance": "A lean, weathered woman in a reconstructed postal uniform with numerous pockets and pouches, wearing a hat with a modified postal insignia and carrying a reinforced mail bag.",
    "personality": "Dedicated and precise, takes the responsibility of delivering mail with utmost seriousness.",
    "dialogueIntro": "Neither radiation storms nor mutant attacks nor gang warfare stays these couriers from the swift completion of their appointed rounds! *stamps clipboard* The mail must go through, and I need deputies!"
  },
  "startingMap": 105,
  "quests": [
    {
      "name": "Postal Infrastructure",
      "description": "Postal Infrastructure - Part of the Wasteland Postal Service quest line.",
      "objectives": [
        {
          "description": "Set up the central post office",
          "mapId": 105,
          "npcName": "Office Establisher Oscar",
          "reward": "Wasteland Postal Service Token 1-1",
          "dialogueSuccess": "You've completed objective 1 of Postal Infrastructure! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Establish collection points in settlements",
          "mapId": 106,
          "npcName": "Collection Point Creator Cora",
          "reward": "Wasteland Postal Service Token 1-2",
          "dialogueSuccess": "You've completed objective 2 of Postal Infrastructure! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Create a mail sorting system",
          "mapId": 107,
          "npcName": "Sorting System Designer Sid",
          "reward": "Wasteland Postal Service Token 1-3",
          "dialogueSuccess": "You've completed objective 3 of Postal Infrastructure! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Develop tracking procedures",
          "mapId": 105,
          "npcName": "Tracking Developer Tina",
          "reward": "Wasteland Postal Service Token 1-4",
          "dialogueSuccess": "You've completed objective 4 of Postal Infrastructure! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Build secure storage for packages",
          "mapId": 106,
          "npcName": "Storage Builder Bob",
          "reward": "Wasteland Postal Service Token 1-5",
          "dialogueSuccess": "You've completed objective 5 of Postal Infrastructure! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        }
      ]
    },
    {
      "name": "Courier Recruitment",
      "description": "Courier Recruitment - Part of the Wasteland Postal Service quest line.",
      "objectives": [
        {
          "description": "Recruit reliable couriers",
          "mapId": 105,
          "npcName": "Courier Recruiter Rita",
          "reward": "Wasteland Postal Service Token 2-1",
          "dialogueSuccess": "You've completed objective 1 of Courier Recruitment! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Train couriers in navigation and survival",
          "mapId": 106,
          "npcName": "Training Instructor Tim",
          "reward": "Wasteland Postal Service Token 2-2",
          "dialogueSuccess": "You've completed objective 2 of Courier Recruitment! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Equip couriers with necessary gear",
          "mapId": 107,
          "npcName": "Equipment Manager Emma",
          "reward": "Wasteland Postal Service Token 2-3",
          "dialogueSuccess": "You've completed objective 3 of Courier Recruitment! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Establish courier protocols and oath",
          "mapId": 105,
          "npcName": "Protocol Writer Paul",
          "reward": "Wasteland Postal Service Token 2-4",
          "dialogueSuccess": "You've completed objective 4 of Courier Recruitment! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Assign couriers to initial routes",
          "mapId": 106,
          "npcName": "Route Assigner Rachel",
          "reward": "Wasteland Postal Service Token 2-5",
          "dialogueSuccess": "You've completed objective 5 of Courier Recruitment! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        }
      ]
    },
    {
      "name": "Route Establishment",
      "description": "Route Establishment - Part of the Wasteland Postal Service quest line.",
      "objectives": [
        {
          "description": "Map primary delivery routes",
          "mapId": 105,
          "npcName": "Route Mapper Mack",
          "reward": "Wasteland Postal Service Token 3-1",
          "dialogueSuccess": "You've completed objective 1 of Route Establishment! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Identify safe houses and rest stops",
          "mapId": 106,
          "npcName": "Safe House Finder Fiona",
          "reward": "Wasteland Postal Service Token 3-2",
          "dialogueSuccess": "You've completed objective 2 of Route Establishment! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Mark hazards and alternate paths",
          "mapId": 107,
          "npcName": "Hazard Marker Hank",
          "reward": "Wasteland Postal Service Token 3-3",
          "dialogueSuccess": "You've completed objective 3 of Route Establishment! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Time routes for delivery schedules",
          "mapId": 105,
          "npcName": "Schedule Developer Donna",
          "reward": "Wasteland Postal Service Token 3-4",
          "dialogueSuccess": "You've completed objective 4 of Route Establishment! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Test routes with dummy mail runs",
          "mapId": 106,
          "npcName": "Test Runner Terry",
          "reward": "Wasteland Postal Service Token 3-5",
          "dialogueSuccess": "You've completed objective 5 of Route Establishment! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        }
      ]
    },
    {
      "name": "Mail Processing",
      "description": "Mail Processing - Part of the Wasteland Postal Service quest line.",
      "objectives": [
        {
          "description": "Develop mail categories and priorities",
          "mapId": 105,
          "npcName": "Category Creator Carl",
          "reward": "Wasteland Postal Service Token 4-1",
          "dialogueSuccess": "You've completed objective 1 of Mail Processing! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Create addressing system for the wasteland",
          "mapId": 106,
          "npcName": "Address System Designer Ava",
          "reward": "Wasteland Postal Service Token 4-2",
          "dialogueSuccess": "You've completed objective 2 of Mail Processing! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Establish postage rates and payment methods",
          "mapId": 107,
          "npcName": "Rate Establisher Reggie",
          "reward": "Wasteland Postal Service Token 4-3",
          "dialogueSuccess": "You've completed objective 3 of Mail Processing! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Set up dead letter processing",
          "mapId": 105,
          "npcName": "Dead Letter Processor Dina",
          "reward": "Wasteland Postal Service Token 4-4",
          "dialogueSuccess": "You've completed objective 4 of Mail Processing! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Implement quality control checks",
          "mapId": 106,
          "npcName": "Quality Controller Quinn",
          "reward": "Wasteland Postal Service Token 4-5",
          "dialogueSuccess": "You've completed objective 5 of Mail Processing! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        }
      ]
    },
    {
      "name": "Special Delivery",
      "description": "Special Delivery - Part of the Wasteland Postal Service quest line.",
      "objectives": [
        {
          "description": "Establish special delivery services",
          "mapId": 105,
          "npcName": "Special Service Developer Sam",
          "reward": "Wasteland Postal Service Token 5-1",
          "dialogueSuccess": "You've completed objective 1 of Special Delivery! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Train couriers for high-priority packages",
          "mapId": 106,
          "npcName": "Priority Trainer Penny",
          "reward": "Wasteland Postal Service Token 5-2",
          "dialogueSuccess": "You've completed objective 2 of Special Delivery! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Develop protocols for sensitive items",
          "mapId": 107,
          "npcName": "Sensitive Item Handler Hector",
          "reward": "Wasteland Postal Service Token 5-3",
          "dialogueSuccess": "You've completed objective 3 of Special Delivery! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Create a courier relay system for long distances",
          "mapId": 105,
          "npcName": "Relay System Engineer Ellie",
          "reward": "Wasteland Postal Service Token 5-4",
          "dialogueSuccess": "You've completed objective 4 of Special Delivery! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Complete the first wasteland-wide mail delivery",
          "mapId": 106,
          "npcName": "Lead Courier Larry",
          "reward": "Wasteland Postal Service Token 5-5",
          "dialogueSuccess": "You've completed objective 5 of Special Delivery! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        }
      ]
    }
  ]
};

module.exports = questLine;