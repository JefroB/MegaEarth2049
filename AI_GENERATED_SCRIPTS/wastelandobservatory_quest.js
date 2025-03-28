// Wasteland Observatory Quest Line
const questLine = {
  "name": "Wasteland Observatory",
  "description": "Rebuild an observatory to study the stars and monitor changes in the atmosphere following the apocalypse.",
  "startingNPC": {
    "name": "Stargazer Stella",
    "appearance": "A thoughtful person wearing a lab coat decorated with star patterns, with a telescope eyepiece permanently attached to a headband and carrying star charts made on scraps of leather.",
    "personality": "Contemplative and curious, speaks in cosmic metaphors, frequently stares at the sky even during daytime, and loses track of time when discussing astronomy.",
    "dialogueIntro": "The answers are above us, not below! *points skyward* The stars remain unchanged despite our world's destruction. Help me rebuild the observatory, and we'll reconnect with the cosmos while monitoring the healing of our atmosphere!"
  },
  "startingMap": 170,
  "quests": [
    {
      "name": "Observatory Restoration",
      "description": "Observatory Restoration - Part of the Wasteland Observatory quest line.",
      "objectives": [
        {
          "description": "Locate a suitable observatory site",
          "mapId": 170,
          "npcName": "Site Locator Lisa",
          "reward": "Wasteland Observatory Token 1-1",
          "dialogueSuccess": "You've completed objective 1 of Observatory Restoration! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Clear and secure the location",
          "mapId": 171,
          "npcName": "Security Specialist Sam",
          "reward": "Wasteland Observatory Token 1-2",
          "dialogueSuccess": "You've completed objective 2 of Observatory Restoration! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Restore or rebuild the main structure",
          "mapId": 172,
          "npcName": "Structure Engineer Ethan",
          "reward": "Wasteland Observatory Token 1-3",
          "dialogueSuccess": "You've completed objective 3 of Observatory Restoration! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Create a rotating dome mechanism",
          "mapId": 170,
          "npcName": "Dome Designer Donna",
          "reward": "Wasteland Observatory Token 1-4",
          "dialogueSuccess": "You've completed objective 4 of Observatory Restoration! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Establish power systems for operations",
          "mapId": 171,
          "npcName": "Power Technician Paul",
          "reward": "Wasteland Observatory Token 1-5",
          "dialogueSuccess": "You've completed objective 5 of Observatory Restoration! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        }
      ]
    },
    {
      "name": "Equipment Salvage",
      "description": "Equipment Salvage - Part of the Wasteland Observatory quest line.",
      "objectives": [
        {
          "description": "Recover telescope components",
          "mapId": 170,
          "npcName": "Telescope Recoverer Tom",
          "reward": "Wasteland Observatory Token 2-1",
          "dialogueSuccess": "You've completed objective 1 of Equipment Salvage! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Salvage optical equipment from ruins",
          "mapId": 171,
          "npcName": "Optics Salvager Olivia",
          "reward": "Wasteland Observatory Token 2-2",
          "dialogueSuccess": "You've completed objective 2 of Equipment Salvage! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Find computers and data storage devices",
          "mapId": 172,
          "npcName": "Computer Collector Carl",
          "reward": "Wasteland Observatory Token 2-3",
          "dialogueSuccess": "You've completed objective 3 of Equipment Salvage! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Gather astronomical reference materials",
          "mapId": 170,
          "npcName": "Reference Gatherer Rachel",
          "reward": "Wasteland Observatory Token 2-4",
          "dialogueSuccess": "You've completed objective 4 of Equipment Salvage! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Recover specialized measurement tools",
          "mapId": 171,
          "npcName": "Tool Hunter Tina",
          "reward": "Wasteland Observatory Token 2-5",
          "dialogueSuccess": "You've completed objective 5 of Equipment Salvage! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        }
      ]
    },
    {
      "name": "Research Program",
      "description": "Research Program - Part of the Wasteland Observatory quest line.",
      "objectives": [
        {
          "description": "Develop atmospheric monitoring protocols",
          "mapId": 170,
          "npcName": "Protocol Developer Penny",
          "reward": "Wasteland Observatory Token 3-1",
          "dialogueSuccess": "You've completed objective 1 of Research Program! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Create star mapping procedures",
          "mapId": 171,
          "npcName": "Mapping Methodologist Mike",
          "reward": "Wasteland Observatory Token 3-2",
          "dialogueSuccess": "You've completed objective 2 of Research Program! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Establish weather prediction methods",
          "mapId": 172,
          "npcName": "Weather Expert Wendy",
          "reward": "Wasteland Observatory Token 3-3",
          "dialogueSuccess": "You've completed objective 3 of Research Program! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Design radiation pattern tracking",
          "mapId": 170,
          "npcName": "Radiation Tracker Randy",
          "reward": "Wasteland Observatory Token 3-4",
          "dialogueSuccess": "You've completed objective 4 of Research Program! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Create long-term observation schedules",
          "mapId": 171,
          "npcName": "Schedule Creator Sarah",
          "reward": "Wasteland Observatory Token 3-5",
          "dialogueSuccess": "You've completed objective 5 of Research Program! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        }
      ]
    },
    {
      "name": "Data Collection",
      "description": "Data Collection - Part of the Wasteland Observatory quest line.",
      "objectives": [
        {
          "description": "Collect baseline atmospheric data",
          "mapId": 170,
          "npcName": "Data Collector Dana",
          "reward": "Wasteland Observatory Token 4-1",
          "dialogueSuccess": "You've completed objective 1 of Data Collection! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Map the current night sky",
          "mapId": 171,
          "npcName": "Sky Mapper Skyler",
          "reward": "Wasteland Observatory Token 4-2",
          "dialogueSuccess": "You've completed objective 2 of Data Collection! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Record weather patterns across seasons",
          "mapId": 172,
          "npcName": "Weather Recorder Walter",
          "reward": "Wasteland Observatory Token 4-3",
          "dialogueSuccess": "You've completed objective 3 of Data Collection! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Document radiation fluctuations",
          "mapId": 170,
          "npcName": "Radiation Monitor Rita",
          "reward": "Wasteland Observatory Token 4-4",
          "dialogueSuccess": "You've completed objective 4 of Data Collection! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Compare current data with pre-war records",
          "mapId": 171,
          "npcName": "Records Comparer Ryan",
          "reward": "Wasteland Observatory Token 4-5",
          "dialogueSuccess": "You've completed objective 5 of Data Collection! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        }
      ]
    },
    {
      "name": "Knowledge Sharing",
      "description": "Knowledge Sharing - Part of the Wasteland Observatory quest line.",
      "objectives": [
        {
          "description": "Create educational programs about astronomy",
          "mapId": 170,
          "npcName": "Education Program Developer Ed",
          "reward": "Wasteland Observatory Token 5-1",
          "dialogueSuccess": "You've completed objective 1 of Knowledge Sharing! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Establish a system for sharing weather predictions",
          "mapId": 171,
          "npcName": "Weather Prediction Sharer Sharon",
          "reward": "Wasteland Observatory Token 5-2",
          "dialogueSuccess": "You've completed objective 2 of Knowledge Sharing! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Train settlement representatives in basic observations",
          "mapId": 172,
          "npcName": "Training Coordinator Terry",
          "reward": "Wasteland Observatory Token 5-3",
          "dialogueSuccess": "You've completed objective 3 of Knowledge Sharing! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Develop warning systems for atmospheric events",
          "mapId": 170,
          "npcName": "Warning System Developer Wade",
          "reward": "Wasteland Observatory Token 5-4",
          "dialogueSuccess": "You've completed objective 4 of Knowledge Sharing! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Host stargazing events for wasteland communities",
          "mapId": 171,
          "npcName": "Event Host Hannah",
          "reward": "Wasteland Observatory Token 5-5",
          "dialogueSuccess": "You've completed objective 5 of Knowledge Sharing! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        }
      ]
    }
  ]
};

module.exports = questLine;