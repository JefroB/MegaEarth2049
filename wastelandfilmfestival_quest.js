// Wasteland Film Festival Quest Line
const questLine = {
  "name": "Wasteland Film Festival",
  "description": "Organize a film festival showcasing movies made in the post-apocalyptic world using salvaged equipment and creative storytelling.",
  "startingNPC": {
    "name": "Director Debris",
    "appearance": "A dramatic person wearing a tattered director's beret and a vest covered in film strips, carrying a megaphone made from scrap metal and a viewfinder crafted from broken binoculars.",
    "personality": "Theatrical and visionary, speaks in cinematic terms, frequently frames scenes with their hands, and yells 'CUT!' when conversations don't go their way.",
    "dialogueIntro": "CUT! CUT! This wasteland needs STORY! *frames you with hands* You've got the look of a production assistant with potential! Help me create the first post-apocalyptic film festival and we'll bring the silver screen back to the masses!"
  },
  "startingMap": 145,
  "quests": [
    {
      "name": "Equipment Salvage",
      "description": "Equipment Salvage - Part of the Wasteland Film Festival quest line.",
      "objectives": [
        {
          "description": "Recover cameras from pre-war electronics stores",
          "mapId": 145,
          "npcName": "Camera Collector Cathy",
          "reward": "Wasteland Film Festival Token 1-1",
          "dialogueSuccess": "You've completed objective 1 of Equipment Salvage! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Salvage projection equipment from old theaters",
          "mapId": 146,
          "npcName": "Projection Salvager Pete",
          "reward": "Wasteland Film Festival Token 1-2",
          "dialogueSuccess": "You've completed objective 2 of Equipment Salvage! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Find recording devices for sound capture",
          "mapId": 147,
          "npcName": "Sound Equipment Hunter Hannah",
          "reward": "Wasteland Film Festival Token 1-3",
          "dialogueSuccess": "You've completed objective 3 of Equipment Salvage! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Gather editing equipment from studios",
          "mapId": 145,
          "npcName": "Editing Expert Eddie",
          "reward": "Wasteland Film Festival Token 1-4",
          "dialogueSuccess": "You've completed objective 4 of Equipment Salvage! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Collect screens and display technology",
          "mapId": 146,
          "npcName": "Screen Scavenger Sam",
          "reward": "Wasteland Film Festival Token 1-5",
          "dialogueSuccess": "You've completed objective 5 of Equipment Salvage! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        }
      ]
    },
    {
      "name": "Filmmaker Recruitment",
      "description": "Filmmaker Recruitment - Part of the Wasteland Film Festival quest line.",
      "objectives": [
        {
          "description": "Find storytellers in the settlements",
          "mapId": 145,
          "npcName": "Storyteller Scout Stella",
          "reward": "Wasteland Film Festival Token 2-1",
          "dialogueSuccess": "You've completed objective 1 of Filmmaker Recruitment! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Recruit actors from different communities",
          "mapId": 146,
          "npcName": "Actor Recruiter Adam",
          "reward": "Wasteland Film Festival Token 2-2",
          "dialogueSuccess": "You've completed objective 2 of Filmmaker Recruitment! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Discover technical experts for equipment operation",
          "mapId": 147,
          "npcName": "Tech Expert Finder Tina",
          "reward": "Wasteland Film Festival Token 2-3",
          "dialogueSuccess": "You've completed objective 3 of Filmmaker Recruitment! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Locate artists for set and costume design",
          "mapId": 145,
          "npcName": "Artist Locator Ava",
          "reward": "Wasteland Film Festival Token 2-4",
          "dialogueSuccess": "You've completed objective 4 of Filmmaker Recruitment! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Recruit musicians for film scores",
          "mapId": 146,
          "npcName": "Musician Recruiter Mack",
          "reward": "Wasteland Film Festival Token 2-5",
          "dialogueSuccess": "You've completed objective 5 of Filmmaker Recruitment! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        }
      ]
    },
    {
      "name": "Venue Preparation",
      "description": "Venue Preparation - Part of the Wasteland Film Festival quest line.",
      "objectives": [
        {
          "description": "Secure a location for the film festival",
          "mapId": 145,
          "npcName": "Venue Securer Victor",
          "reward": "Wasteland Film Festival Token 3-1",
          "dialogueSuccess": "You've completed objective 1 of Venue Preparation! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Create a main screening area",
          "mapId": 146,
          "npcName": "Screening Area Builder Bob",
          "reward": "Wasteland Film Festival Token 3-2",
          "dialogueSuccess": "You've completed objective 2 of Venue Preparation! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Build seating for the audience",
          "mapId": 147,
          "npcName": "Seating Constructor Sally",
          "reward": "Wasteland Film Festival Token 3-3",
          "dialogueSuccess": "You've completed objective 3 of Venue Preparation! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Set up projection systems",
          "mapId": 145,
          "npcName": "Projection Technician Paul",
          "reward": "Wasteland Film Festival Token 3-4",
          "dialogueSuccess": "You've completed objective 4 of Venue Preparation! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Create a stage for introductions and awards",
          "mapId": 146,
          "npcName": "Stage Designer Donna",
          "reward": "Wasteland Film Festival Token 3-5",
          "dialogueSuccess": "You've completed objective 5 of Venue Preparation! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        }
      ]
    },
    {
      "name": "Film Production",
      "description": "Film Production - Part of the Wasteland Film Festival quest line.",
      "objectives": [
        {
          "description": "Organize filmmaking workshops",
          "mapId": 145,
          "npcName": "Workshop Leader Wendy",
          "reward": "Wasteland Film Festival Token 4-1",
          "dialogueSuccess": "You've completed objective 1 of Film Production! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Assist with short film production",
          "mapId": 146,
          "npcName": "Short Film Producer Finn",
          "reward": "Wasteland Film Festival Token 4-2",
          "dialogueSuccess": "You've completed objective 2 of Film Production! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Help create documentary about wasteland life",
          "mapId": 147,
          "npcName": "Documentary Director Dora",
          "reward": "Wasteland Film Festival Token 4-3",
          "dialogueSuccess": "You've completed objective 3 of Film Production! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Support production of a wasteland drama",
          "mapId": 145,
          "npcName": "Drama Producer Debbie",
          "reward": "Wasteland Film Festival Token 4-4",
          "dialogueSuccess": "You've completed objective 4 of Film Production! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Facilitate a comedy film about apocalypse life",
          "mapId": 146,
          "npcName": "Comedy Director Charlie",
          "reward": "Wasteland Film Festival Token 4-5",
          "dialogueSuccess": "You've completed objective 5 of Film Production! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        }
      ]
    },
    {
      "name": "Festival Execution",
      "description": "Festival Execution - Part of the Wasteland Film Festival quest line.",
      "objectives": [
        {
          "description": "Create a festival schedule and program",
          "mapId": 145,
          "npcName": "Program Designer Penny",
          "reward": "Wasteland Film Festival Token 5-1",
          "dialogueSuccess": "You've completed objective 1 of Festival Execution! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Distribute invitations across settlements",
          "mapId": 146,
          "npcName": "Invitation Distributor Ian",
          "reward": "Wasteland Film Festival Token 5-2",
          "dialogueSuccess": "You've completed objective 2 of Festival Execution! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Coordinate the arrival of filmmakers and audience",
          "mapId": 147,
          "npcName": "Arrival Coordinator Amy",
          "reward": "Wasteland Film Festival Token 5-3",
          "dialogueSuccess": "You've completed objective 3 of Festival Execution! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Manage the screenings and discussions",
          "mapId": 145,
          "npcName": "Screening Manager Mia",
          "reward": "Wasteland Film Festival Token 5-4",
          "dialogueSuccess": "You've completed objective 4 of Festival Execution! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Organize the awards ceremony",
          "mapId": 146,
          "npcName": "Awards Organizer Oscar",
          "reward": "Wasteland Film Festival Token 5-5",
          "dialogueSuccess": "You've completed objective 5 of Festival Execution! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        }
      ]
    }
  ]
};

module.exports = questLine;