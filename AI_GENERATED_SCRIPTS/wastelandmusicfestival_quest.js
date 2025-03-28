// Wasteland Music Festival Quest Line
const questLine = {
  "name": "Wasteland Music Festival",
  "description": "Organize a music festival in the wasteland to bring together musicians from different settlements and revive musical culture.",
  "startingNPC": {
    "name": "Melody Mayhem",
    "appearance": "A wiry person with hair dyed multiple colors using plant extracts, wearing clothing covered in makeshift musical notation and carrying a guitar made from a car hood and salvaged strings.",
    "personality": "Energetic and passionate about music, speaks in musical metaphors, and often breaks into song mid-conversation.",
    "dialogueIntro": "The wasteland's got a rhythm, can you feel it? *strums improvised guitar* We need more than just survival, we need SOUL! Help me create the first post-apocalyptic music festival and we'll make these ruins SING!"
  },
  "startingMap": 130,
  "quests": [
    {
      "name": "Instrument Creation",
      "description": "Instrument Creation - Part of the Wasteland Music Festival quest line.",
      "objectives": [
        {
          "description": "Collect materials for string instruments",
          "mapId": 130,
          "npcName": "String Collector Stella",
          "reward": "Wasteland Music Festival Token 1-1",
          "dialogueSuccess": "You've completed objective 1 of Instrument Creation! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Gather components for percussion instruments",
          "mapId": 131,
          "npcName": "Percussion Gatherer Pete",
          "reward": "Wasteland Music Festival Token 1-2",
          "dialogueSuccess": "You've completed objective 2 of Instrument Creation! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Salvage electronics for amplification",
          "mapId": 132,
          "npcName": "Electronics Expert Ellie",
          "reward": "Wasteland Music Festival Token 1-3",
          "dialogueSuccess": "You've completed objective 3 of Instrument Creation! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Find materials for wind instruments",
          "mapId": 130,
          "npcName": "Wind Instrument Specialist Wally",
          "reward": "Wasteland Music Festival Token 1-4",
          "dialogueSuccess": "You've completed objective 4 of Instrument Creation! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Create a showcase of wasteland instruments",
          "mapId": 131,
          "npcName": "Instrument Curator Irene",
          "reward": "Wasteland Music Festival Token 1-5",
          "dialogueSuccess": "You've completed objective 5 of Instrument Creation! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        }
      ]
    },
    {
      "name": "Musician Recruitment",
      "description": "Musician Recruitment - Part of the Wasteland Music Festival quest line.",
      "objectives": [
        {
          "description": "Find musicians in the northern settlement",
          "mapId": 130,
          "npcName": "Northern Scout Nina",
          "reward": "Wasteland Music Festival Token 2-1",
          "dialogueSuccess": "You've completed objective 1 of Musician Recruitment! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Recruit performers from the eastern ruins",
          "mapId": 131,
          "npcName": "Eastern Recruiter Eddie",
          "reward": "Wasteland Music Festival Token 2-2",
          "dialogueSuccess": "You've completed objective 2 of Musician Recruitment! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Discover musical talent in the southern outpost",
          "mapId": 132,
          "npcName": "Southern Talent Scout Sam",
          "reward": "Wasteland Music Festival Token 2-3",
          "dialogueSuccess": "You've completed objective 3 of Musician Recruitment! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Convince western settlement performers to join",
          "mapId": 130,
          "npcName": "Western Diplomat Wendy",
          "reward": "Wasteland Music Festival Token 2-4",
          "dialogueSuccess": "You've completed objective 4 of Musician Recruitment! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Audition and select the final lineup",
          "mapId": 131,
          "npcName": "Audition Judge Jake",
          "reward": "Wasteland Music Festival Token 2-5",
          "dialogueSuccess": "You've completed objective 5 of Musician Recruitment! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        }
      ]
    },
    {
      "name": "Venue Preparation",
      "description": "Venue Preparation - Part of the Wasteland Music Festival quest line.",
      "objectives": [
        {
          "description": "Clear the festival grounds",
          "mapId": 130,
          "npcName": "Ground Clearer Gus",
          "reward": "Wasteland Music Festival Token 3-1",
          "dialogueSuccess": "You've completed objective 1 of Venue Preparation! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Build a main stage from salvaged materials",
          "mapId": 131,
          "npcName": "Stage Builder Stan",
          "reward": "Wasteland Music Festival Token 3-2",
          "dialogueSuccess": "You've completed objective 2 of Venue Preparation! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Construct smaller performance areas",
          "mapId": 132,
          "npcName": "Performance Area Designer Penny",
          "reward": "Wasteland Music Festival Token 3-3",
          "dialogueSuccess": "You've completed objective 3 of Venue Preparation! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Create audience seating and viewing areas",
          "mapId": 130,
          "npcName": "Seating Constructor Sid",
          "reward": "Wasteland Music Festival Token 3-4",
          "dialogueSuccess": "You've completed objective 4 of Venue Preparation! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Set up shelter in case of radiation storms",
          "mapId": 131,
          "npcName": "Shelter Engineer Shelby",
          "reward": "Wasteland Music Festival Token 3-5",
          "dialogueSuccess": "You've completed objective 5 of Venue Preparation! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        }
      ]
    },
    {
      "name": "Sound System Setup",
      "description": "Sound System Setup - Part of the Wasteland Music Festival quest line.",
      "objectives": [
        {
          "description": "Salvage speakers and amplification equipment",
          "mapId": 130,
          "npcName": "Speaker Salvager Sally",
          "reward": "Wasteland Music Festival Token 4-1",
          "dialogueSuccess": "You've completed objective 1 of Sound System Setup! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Restore and repair audio mixing equipment",
          "mapId": 131,
          "npcName": "Mixer Mechanic Mike",
          "reward": "Wasteland Music Festival Token 4-2",
          "dialogueSuccess": "You've completed objective 2 of Sound System Setup! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Set up a power generation system",
          "mapId": 132,
          "npcName": "Power Technician Pauline",
          "reward": "Wasteland Music Festival Token 4-3",
          "dialogueSuccess": "You've completed objective 3 of Sound System Setup! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Install the sound system across the venue",
          "mapId": 130,
          "npcName": "Installation Expert Ian",
          "reward": "Wasteland Music Festival Token 4-4",
          "dialogueSuccess": "You've completed objective 4 of Sound System Setup! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Test and calibrate the audio setup",
          "mapId": 131,
          "npcName": "Sound Tester Terry",
          "reward": "Wasteland Music Festival Token 4-5",
          "dialogueSuccess": "You've completed objective 5 of Sound System Setup! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        }
      ]
    },
    {
      "name": "Festival Execution",
      "description": "Festival Execution - Part of the Wasteland Music Festival quest line.",
      "objectives": [
        {
          "description": "Coordinate the arrival of performers",
          "mapId": 130,
          "npcName": "Performer Coordinator Cora",
          "reward": "Wasteland Music Festival Token 5-1",
          "dialogueSuccess": "You've completed objective 1 of Festival Execution! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Manage the festival schedule",
          "mapId": 131,
          "npcName": "Schedule Manager Manny",
          "reward": "Wasteland Music Festival Token 5-2",
          "dialogueSuccess": "You've completed objective 2 of Festival Execution! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Oversee security and crowd control",
          "mapId": 132,
          "npcName": "Security Chief Shane",
          "reward": "Wasteland Music Festival Token 5-3",
          "dialogueSuccess": "You've completed objective 3 of Festival Execution! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Facilitate performances and transitions",
          "mapId": 130,
          "npcName": "Stage Director Donna",
          "reward": "Wasteland Music Festival Token 5-4",
          "dialogueSuccess": "You've completed objective 4 of Festival Execution! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Document the festival for wasteland history",
          "mapId": 131,
          "npcName": "Historian Harper",
          "reward": "Wasteland Music Festival Token 5-5",
          "dialogueSuccess": "You've completed objective 5 of Festival Execution! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        }
      ]
    }
  ]
};

module.exports = questLine;