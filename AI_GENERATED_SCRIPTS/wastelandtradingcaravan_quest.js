// Wasteland Trading Caravan Quest Line
const questLine = {
  "name": "Wasteland Trading Caravan",
  "description": "Establish a trading caravan network to connect isolated settlements and revitalize the wasteland economy.",
  "startingNPC": {
    "name": "Merchant Mack",
    "appearance": "A heavyset person wearing layers of clothing from different eras and cultures, with pockets full of trinkets and a modified shopping cart that transforms into a market stall.",
    "personality": "Shrewd but fair, always looking for a deal but never at the expense of building long-term relationships.",
    "dialogueIntro": "Everything's got value in the wasteland, friend! *rattles cart full of odds and ends* What some call junk, others call treasure. Help me connect the dots between settlements, and we'll both profit!"
  },
  "startingMap": 100,
  "quests": [
    {
      "name": "Route Mapping",
      "description": "Route Mapping - Part of the Wasteland Trading Caravan quest line.",
      "objectives": [
        {
          "description": "Scout safe travel routes between settlements",
          "mapId": 100,
          "npcName": "Route Scout Rachel",
          "reward": "Wasteland Trading Caravan Token 1-1",
          "dialogueSuccess": "You've completed objective 1 of Route Mapping! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Identify hazards and danger zones",
          "mapId": 101,
          "npcName": "Hazard Mapper Hank",
          "reward": "Wasteland Trading Caravan Token 1-2",
          "dialogueSuccess": "You've completed objective 2 of Route Mapping! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Map water sources and rest points",
          "mapId": 102,
          "npcName": "Water Finder Wendy",
          "reward": "Wasteland Trading Caravan Token 1-3",
          "dialogueSuccess": "You've completed objective 3 of Route Mapping! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Time travel durations between locations",
          "mapId": 100,
          "npcName": "Journey Timer Jake",
          "reward": "Wasteland Trading Caravan Token 1-4",
          "dialogueSuccess": "You've completed objective 4 of Route Mapping! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Create a comprehensive caravan route map",
          "mapId": 101,
          "npcName": "Cartographer Cora",
          "reward": "Wasteland Trading Caravan Token 1-5",
          "dialogueSuccess": "You've completed objective 5 of Route Mapping! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        }
      ]
    },
    {
      "name": "Caravan Assembly",
      "description": "Caravan Assembly - Part of the Wasteland Trading Caravan quest line.",
      "objectives": [
        {
          "description": "Recruit initial caravan members",
          "mapId": 100,
          "npcName": "Recruiter Rita",
          "reward": "Wasteland Trading Caravan Token 2-1",
          "dialogueSuccess": "You've completed objective 1 of Caravan Assembly! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Acquire pack animals or vehicles",
          "mapId": 101,
          "npcName": "Animal Handler Abe",
          "reward": "Wasteland Trading Caravan Token 2-2",
          "dialogueSuccess": "You've completed objective 2 of Caravan Assembly! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Gather essential trading goods",
          "mapId": 102,
          "npcName": "Goods Gatherer Gina",
          "reward": "Wasteland Trading Caravan Token 2-3",
          "dialogueSuccess": "You've completed objective 3 of Caravan Assembly! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Develop inventory management system",
          "mapId": 100,
          "npcName": "Inventory Manager Ian",
          "reward": "Wasteland Trading Caravan Token 2-4",
          "dialogueSuccess": "You've completed objective 4 of Caravan Assembly! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Prepare the caravan for its first journey",
          "mapId": 101,
          "npcName": "Journey Preparer Jess",
          "reward": "Wasteland Trading Caravan Token 2-5",
          "dialogueSuccess": "You've completed objective 5 of Caravan Assembly! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        }
      ]
    },
    {
      "name": "Security Detail",
      "description": "Security Detail - Part of the Wasteland Trading Caravan quest line.",
      "objectives": [
        {
          "description": "Recruit security personnel",
          "mapId": 100,
          "npcName": "Security Recruiter Sam",
          "reward": "Wasteland Trading Caravan Token 3-1",
          "dialogueSuccess": "You've completed objective 1 of Security Detail! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Acquire weapons and defensive equipment",
          "mapId": 101,
          "npcName": "Weapons Procurer Wade",
          "reward": "Wasteland Trading Caravan Token 3-2",
          "dialogueSuccess": "You've completed objective 2 of Security Detail! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Develop security protocols for different threats",
          "mapId": 102,
          "npcName": "Protocol Developer Pam",
          "reward": "Wasteland Trading Caravan Token 3-3",
          "dialogueSuccess": "You've completed objective 3 of Security Detail! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Train the security team",
          "mapId": 100,
          "npcName": "Security Trainer Troy",
          "reward": "Wasteland Trading Caravan Token 3-4",
          "dialogueSuccess": "You've completed objective 4 of Security Detail! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Test security response to simulated attacks",
          "mapId": 101,
          "npcName": "Simulation Runner Sid",
          "reward": "Wasteland Trading Caravan Token 3-5",
          "dialogueSuccess": "You've completed objective 5 of Security Detail! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        }
      ]
    },
    {
      "name": "Trade Negotiations",
      "description": "Trade Negotiations - Part of the Wasteland Trading Caravan quest line.",
      "objectives": [
        {
          "description": "Identify valuable trade goods for each settlement",
          "mapId": 100,
          "npcName": "Goods Identifier Gloria",
          "reward": "Wasteland Trading Caravan Token 4-1",
          "dialogueSuccess": "You've completed objective 1 of Trade Negotiations! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Establish fair exchange rates",
          "mapId": 101,
          "npcName": "Exchange Rate Establisher Evan",
          "reward": "Wasteland Trading Caravan Token 4-2",
          "dialogueSuccess": "You've completed objective 2 of Trade Negotiations! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Negotiate trade agreements with settlement leaders",
          "mapId": 102,
          "npcName": "Agreement Negotiator Nina",
          "reward": "Wasteland Trading Caravan Token 4-3",
          "dialogueSuccess": "You've completed objective 3 of Trade Negotiations! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Set up regular trading schedules",
          "mapId": 100,
          "npcName": "Schedule Setter Seth",
          "reward": "Wasteland Trading Caravan Token 4-4",
          "dialogueSuccess": "You've completed objective 4 of Trade Negotiations! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Create a dispute resolution system",
          "mapId": 101,
          "npcName": "Dispute Resolver Donna",
          "reward": "Wasteland Trading Caravan Token 4-5",
          "dialogueSuccess": "You've completed objective 5 of Trade Negotiations! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        }
      ]
    },
    {
      "name": "Network Expansion",
      "description": "Network Expansion - Part of the Wasteland Trading Caravan quest line.",
      "objectives": [
        {
          "description": "Incorporate additional settlements into the network",
          "mapId": 100,
          "npcName": "Network Expander Ned",
          "reward": "Wasteland Trading Caravan Token 5-1",
          "dialogueSuccess": "You've completed objective 1 of Network Expansion! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Establish caravan outposts at key locations",
          "mapId": 101,
          "npcName": "Outpost Establisher Oscar",
          "reward": "Wasteland Trading Caravan Token 5-2",
          "dialogueSuccess": "You've completed objective 2 of Network Expansion! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Train new caravan leaders",
          "mapId": 102,
          "npcName": "Caravan Trainer Tina",
          "reward": "Wasteland Trading Caravan Token 5-3",
          "dialogueSuccess": "You've completed objective 3 of Network Expansion! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Expand the range of traded goods",
          "mapId": 100,
          "npcName": "Goods Diversifier Dex",
          "reward": "Wasteland Trading Caravan Token 5-4",
          "dialogueSuccess": "You've completed objective 4 of Network Expansion! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Host the first inter-settlement trade fair",
          "mapId": 101,
          "npcName": "Fair Organizer Fiona",
          "reward": "Wasteland Trading Caravan Token 5-5",
          "dialogueSuccess": "You've completed objective 5 of Network Expansion! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        }
      ]
    }
  ]
};

module.exports = questLine;