// Wasteland Olympics Quest Line
const questLine = {
  "name": "Wasteland Olympics",
  "description": "Organize a post-apocalyptic sporting event to bring together rival settlements and foster peace through competition.",
  "startingNPC": {
    "name": "Coach Crater",
    "appearance": "A muscular former athlete with numerous scars and a prosthetic leg made from sports equipment, wearing a tattered tracksuit with 'COACH' written across the back.",
    "personality": "Motivational and loud, constantly speaking in sports metaphors and giving pep talks.",
    "dialogueIntro": "Listen up, rookie! The wasteland's got enough fighting. Time to channel that energy into something constructive! *blows whistle* We're bringing back the games, and you're my new assistant coach!"
  },
  "startingMap": 90,
  "quests": [
    {
      "name": "Event Planning",
      "description": "Event Planning - Part of the Wasteland Olympics quest line.",
      "objectives": [
        {
          "description": "Design wasteland-appropriate sporting events",
          "mapId": 90,
          "npcName": "Event Designer Ellie",
          "reward": "Wasteland Olympics Token 1-1",
          "dialogueSuccess": "You've completed objective 1 of Event Planning! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Create rules and scoring systems",
          "mapId": 91,
          "npcName": "Rules Writer Ryan",
          "reward": "Wasteland Olympics Token 1-2",
          "dialogueSuccess": "You've completed objective 2 of Event Planning! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Develop safety protocols",
          "mapId": 92,
          "npcName": "Safety Officer Sam",
          "reward": "Wasteland Olympics Token 1-3",
          "dialogueSuccess": "You've completed objective 3 of Event Planning! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Schedule the Olympic events",
          "mapId": 90,
          "npcName": "Schedule Coordinator Cora",
          "reward": "Wasteland Olympics Token 1-4",
          "dialogueSuccess": "You've completed objective 4 of Event Planning! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Draft the Wasteland Olympics charter",
          "mapId": 91,
          "npcName": "Charter Drafter Chuck",
          "reward": "Wasteland Olympics Token 1-5",
          "dialogueSuccess": "You've completed objective 5 of Event Planning! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        }
      ]
    },
    {
      "name": "Venue Preparation",
      "description": "Venue Preparation - Part of the Wasteland Olympics quest line.",
      "objectives": [
        {
          "description": "Scout location for the Olympic grounds",
          "mapId": 90,
          "npcName": "Location Scout Lenny",
          "reward": "Wasteland Olympics Token 2-1",
          "dialogueSuccess": "You've completed objective 1 of Venue Preparation! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Clear and prepare the main arena",
          "mapId": 91,
          "npcName": "Arena Clearer Amber",
          "reward": "Wasteland Olympics Token 2-2",
          "dialogueSuccess": "You've completed objective 2 of Venue Preparation! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Construct event-specific facilities",
          "mapId": 92,
          "npcName": "Facility Builder Frank",
          "reward": "Wasteland Olympics Token 2-3",
          "dialogueSuccess": "You've completed objective 3 of Venue Preparation! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Build spectator seating areas",
          "mapId": 90,
          "npcName": "Seating Constructor Cindy",
          "reward": "Wasteland Olympics Token 2-4",
          "dialogueSuccess": "You've completed objective 4 of Venue Preparation! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Set up medical stations",
          "mapId": 91,
          "npcName": "Medical Station Manager Mia",
          "reward": "Wasteland Olympics Token 2-5",
          "dialogueSuccess": "You've completed objective 5 of Venue Preparation! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        }
      ]
    },
    {
      "name": "Recruitment Drive",
      "description": "Recruitment Drive - Part of the Wasteland Olympics quest line.",
      "objectives": [
        {
          "description": "Visit settlements to announce the Olympics",
          "mapId": 90,
          "npcName": "Announcer Andy",
          "reward": "Wasteland Olympics Token 3-1",
          "dialogueSuccess": "You've completed objective 1 of Recruitment Drive! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Recruit athletes from different communities",
          "mapId": 91,
          "npcName": "Athlete Recruiter Rita",
          "reward": "Wasteland Olympics Token 3-2",
          "dialogueSuccess": "You've completed objective 2 of Recruitment Drive! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Enlist referees and judges",
          "mapId": 92,
          "npcName": "Referee Recruiter Ralph",
          "reward": "Wasteland Olympics Token 3-3",
          "dialogueSuccess": "You've completed objective 3 of Recruitment Drive! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Sign up medical personnel",
          "mapId": 90,
          "npcName": "Medical Recruiter Molly",
          "reward": "Wasteland Olympics Token 3-4",
          "dialogueSuccess": "You've completed objective 4 of Recruitment Drive! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Gather security teams",
          "mapId": 91,
          "npcName": "Security Recruiter Sarge",
          "reward": "Wasteland Olympics Token 3-5",
          "dialogueSuccess": "You've completed objective 5 of Recruitment Drive! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        }
      ]
    },
    {
      "name": "Training Program",
      "description": "Training Program - Part of the Wasteland Olympics quest line.",
      "objectives": [
        {
          "description": "Establish training camps",
          "mapId": 90,
          "npcName": "Camp Establisher Ethan",
          "reward": "Wasteland Olympics Token 4-1",
          "dialogueSuccess": "You've completed objective 1 of Training Program! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Develop training regimens for different events",
          "mapId": 91,
          "npcName": "Training Developer Tina",
          "reward": "Wasteland Olympics Token 4-2",
          "dialogueSuccess": "You've completed objective 2 of Training Program! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Coach promising athletes",
          "mapId": 92,
          "npcName": "Athletic Coach Alvin",
          "reward": "Wasteland Olympics Token 4-3",
          "dialogueSuccess": "You've completed objective 3 of Training Program! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Conduct preliminary competitions",
          "mapId": 90,
          "npcName": "Competition Coordinator Carla",
          "reward": "Wasteland Olympics Token 4-4",
          "dialogueSuccess": "You've completed objective 4 of Training Program! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Select final participants",
          "mapId": 91,
          "npcName": "Participant Selector Penny",
          "reward": "Wasteland Olympics Token 4-5",
          "dialogueSuccess": "You've completed objective 5 of Training Program! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        }
      ]
    },
    {
      "name": "Games Execution",
      "description": "Games Execution - Part of the Wasteland Olympics quest line.",
      "objectives": [
        {
          "description": "Coordinate opening ceremony",
          "mapId": 90,
          "npcName": "Ceremony Organizer Olivia",
          "reward": "Wasteland Olympics Token 5-1",
          "dialogueSuccess": "You've completed objective 1 of Games Execution! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Manage event operations",
          "mapId": 91,
          "npcName": "Operations Manager Omar",
          "reward": "Wasteland Olympics Token 5-2",
          "dialogueSuccess": "You've completed objective 2 of Games Execution! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Officiate competitions",
          "mapId": 92,
          "npcName": "Head Official Hector",
          "reward": "Wasteland Olympics Token 5-3",
          "dialogueSuccess": "You've completed objective 3 of Games Execution! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Award medals and prizes",
          "mapId": 90,
          "npcName": "Prize Presenter Patty",
          "reward": "Wasteland Olympics Token 5-4",
          "dialogueSuccess": "You've completed objective 4 of Games Execution! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Host the closing celebration",
          "mapId": 91,
          "npcName": "Celebration Host Charlie",
          "reward": "Wasteland Olympics Token 5-5",
          "dialogueSuccess": "You've completed objective 5 of Games Execution! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        }
      ]
    }
  ]
};

module.exports = questLine;