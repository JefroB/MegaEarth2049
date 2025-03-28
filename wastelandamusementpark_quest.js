// Wasteland Amusement Park Quest Line
const questLine = {
  "name": "Wasteland Amusement Park",
  "description": "Restore and repurpose an abandoned amusement park to bring joy and entertainment to the harsh wasteland.",
  "startingNPC": {
    "name": "Carnival Carl",
    "appearance": "A wiry man in a faded, patched ringmaster's outfit, with a mechanical arm that unfolds into various carnival tools and a permanent smile painted on his face.",
    "personality": "Showman through and through, speaks in carnival barker patter and is obsessed with making people smile.",
    "dialogueIntro": "Step right up, step right up! Witness the rebirth of joy in this bleak world! *mechanical arm unfolds into a spinning pinwheel* The Wasteland Wonder Park needs YOUR help to bring back the magic of entertainment!"
  },
  "startingMap": 95,
  "quests": [
    {
      "name": "Park Restoration",
      "description": "Park Restoration - Part of the Wasteland Amusement Park quest line.",
      "objectives": [
        {
          "description": "Clear debris from the park grounds",
          "mapId": 95,
          "npcName": "Debris Clearer Darla",
          "reward": "Wasteland Amusement Park Token 1-1",
          "dialogueSuccess": "You've completed objective 1 of Park Restoration! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Restore the main entrance and gates",
          "mapId": 96,
          "npcName": "Gate Restorer Greg",
          "reward": "Wasteland Amusement Park Token 1-2",
          "dialogueSuccess": "You've completed objective 2 of Park Restoration! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Repair the park's power system",
          "mapId": 97,
          "npcName": "Power Technician Penny",
          "reward": "Wasteland Amusement Park Token 1-3",
          "dialogueSuccess": "You've completed objective 3 of Park Restoration! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Renovate food and vendor stalls",
          "mapId": 95,
          "npcName": "Stall Renovator Randy",
          "reward": "Wasteland Amusement Park Token 1-4",
          "dialogueSuccess": "You've completed objective 4 of Park Restoration! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Install security measures",
          "mapId": 96,
          "npcName": "Security Installer Sid",
          "reward": "Wasteland Amusement Park Token 1-5",
          "dialogueSuccess": "You've completed objective 5 of Park Restoration! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        }
      ]
    },
    {
      "name": "Ride Repair",
      "description": "Ride Repair - Part of the Wasteland Amusement Park quest line.",
      "objectives": [
        {
          "description": "Assess salvageable rides",
          "mapId": 95,
          "npcName": "Ride Assessor Alvin",
          "reward": "Wasteland Amusement Park Token 2-1",
          "dialogueSuccess": "You've completed objective 1 of Ride Repair! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Gather replacement parts",
          "mapId": 96,
          "npcName": "Parts Gatherer Gina",
          "reward": "Wasteland Amusement Park Token 2-2",
          "dialogueSuccess": "You've completed objective 2 of Ride Repair! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Repair the carousel",
          "mapId": 97,
          "npcName": "Carousel Mechanic Mack",
          "reward": "Wasteland Amusement Park Token 2-3",
          "dialogueSuccess": "You've completed objective 3 of Ride Repair! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Restore the roller coaster",
          "mapId": 95,
          "npcName": "Coaster Engineer Cody",
          "reward": "Wasteland Amusement Park Token 2-4",
          "dialogueSuccess": "You've completed objective 4 of Ride Repair! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Test ride safety systems",
          "mapId": 96,
          "npcName": "Safety Tester Tess",
          "reward": "Wasteland Amusement Park Token 2-5",
          "dialogueSuccess": "You've completed objective 5 of Ride Repair! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        }
      ]
    },
    {
      "name": "Attraction Development",
      "description": "Attraction Development - Part of the Wasteland Amusement Park quest line.",
      "objectives": [
        {
          "description": "Design wasteland-themed attractions",
          "mapId": 95,
          "npcName": "Attraction Designer Dora",
          "reward": "Wasteland Amusement Park Token 3-1",
          "dialogueSuccess": "You've completed objective 1 of Attraction Development! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Create a mutant petting zoo",
          "mapId": 96,
          "npcName": "Petting Zoo Keeper Zoe",
          "reward": "Wasteland Amusement Park Token 3-2",
          "dialogueSuccess": "You've completed objective 2 of Attraction Development! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Build a radioactive water slide",
          "mapId": 97,
          "npcName": "Water Slide Builder Wade",
          "reward": "Wasteland Amusement Park Token 3-3",
          "dialogueSuccess": "You've completed objective 3 of Attraction Development! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Develop a post-apocalyptic haunted house",
          "mapId": 95,
          "npcName": "Haunted House Creator Hugo",
          "reward": "Wasteland Amusement Park Token 3-4",
          "dialogueSuccess": "You've completed objective 4 of Attraction Development! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Set up carnival games with wasteland prizes",
          "mapId": 96,
          "npcName": "Game Developer Gus",
          "reward": "Wasteland Amusement Park Token 3-5",
          "dialogueSuccess": "You've completed objective 5 of Attraction Development! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        }
      ]
    },
    {
      "name": "Staff Recruitment",
      "description": "Staff Recruitment - Part of the Wasteland Amusement Park quest line.",
      "objectives": [
        {
          "description": "Recruit ride operators",
          "mapId": 95,
          "npcName": "Operator Recruiter Rita",
          "reward": "Wasteland Amusement Park Token 4-1",
          "dialogueSuccess": "You've completed objective 1 of Staff Recruitment! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Train food vendors",
          "mapId": 96,
          "npcName": "Vendor Trainer Vince",
          "reward": "Wasteland Amusement Park Token 4-2",
          "dialogueSuccess": "You've completed objective 2 of Staff Recruitment! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Hire entertainment performers",
          "mapId": 97,
          "npcName": "Performer Director Polly",
          "reward": "Wasteland Amusement Park Token 4-3",
          "dialogueSuccess": "You've completed objective 3 of Staff Recruitment! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Assemble a security team",
          "mapId": 95,
          "npcName": "Security Chief Shane",
          "reward": "Wasteland Amusement Park Token 4-4",
          "dialogueSuccess": "You've completed objective 4 of Staff Recruitment! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Prepare the maintenance crew",
          "mapId": 96,
          "npcName": "Maintenance Manager Mike",
          "reward": "Wasteland Amusement Park Token 4-5",
          "dialogueSuccess": "You've completed objective 5 of Staff Recruitment! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        }
      ]
    },
    {
      "name": "Grand Opening",
      "description": "Grand Opening - Part of the Wasteland Amusement Park quest line.",
      "objectives": [
        {
          "description": "Distribute invitations across the wasteland",
          "mapId": 95,
          "npcName": "Invitation Distributor Ivy",
          "reward": "Wasteland Amusement Park Token 5-1",
          "dialogueSuccess": "You've completed objective 1 of Grand Opening! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Prepare opening day festivities",
          "mapId": 96,
          "npcName": "Festivities Planner Fiona",
          "reward": "Wasteland Amusement Park Token 5-2",
          "dialogueSuccess": "You've completed objective 2 of Grand Opening! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Coordinate the ribbon-cutting ceremony",
          "mapId": 97,
          "npcName": "Ceremony Coordinator Cedric",
          "reward": "Wasteland Amusement Park Token 5-3",
          "dialogueSuccess": "You've completed objective 3 of Grand Opening! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Manage the first day of operations",
          "mapId": 95,
          "npcName": "Operations Director Olivia",
          "reward": "Wasteland Amusement Park Token 5-4",
          "dialogueSuccess": "You've completed objective 4 of Grand Opening! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Gather visitor feedback for improvements",
          "mapId": 96,
          "npcName": "Feedback Collector Felix",
          "reward": "Wasteland Amusement Park Token 5-5",
          "dialogueSuccess": "You've completed objective 5 of Grand Opening! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        }
      ]
    }
  ]
};

module.exports = questLine;