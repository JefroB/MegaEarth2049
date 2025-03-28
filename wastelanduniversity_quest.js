// Wasteland University Quest Line
const questLine = {
  "name": "Wasteland University",
  "description": "Establish a post-apocalyptic university to educate the next generation and preserve specialized knowledge.",
  "startingNPC": {
    "name": "Professor Fallout",
    "appearance": "An elderly person wearing a tattered academic robe patched with duct tape, half-moon glasses repaired with wire, and carrying a walking stick that doubles as a pointing tool for improvised blackboards.",
    "personality": "Scholarly and absent-minded, speaks in lectures, frequently goes off on educational tangents, and grades conversations on a scale of A to F.",
    "dialogueIntro": "Ah, a potential student! *adjusts glasses* Education is the foundation of rebuilding civilization, young scholar! Help me establish the Wasteland University, and we shall illuminate minds darkened by the apocalypse! Your first assignment begins now!"
  },
  "startingMap": 160,
  "quests": [
    {
      "name": "Campus Establishment",
      "description": "Campus Establishment - Part of the Wasteland University quest line.",
      "objectives": [
        {
          "description": "Secure buildings for the university campus",
          "mapId": 160,
          "npcName": "Building Securer Benny",
          "reward": "Wasteland University Token 1-1",
          "dialogueSuccess": "You've completed objective 1 of Campus Establishment! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Create classroom spaces from ruins",
          "mapId": 161,
          "npcName": "Classroom Creator Cora",
          "reward": "Wasteland University Token 1-2",
          "dialogueSuccess": "You've completed objective 2 of Campus Establishment! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Establish a central library area",
          "mapId": 162,
          "npcName": "Library Organizer Lisa",
          "reward": "Wasteland University Token 1-3",
          "dialogueSuccess": "You've completed objective 3 of Campus Establishment! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Set up laboratory spaces for sciences",
          "mapId": 160,
          "npcName": "Lab Designer Larry",
          "reward": "Wasteland University Token 1-4",
          "dialogueSuccess": "You've completed objective 4 of Campus Establishment! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Create administrative offices",
          "mapId": 161,
          "npcName": "Office Preparer Olivia",
          "reward": "Wasteland University Token 1-5",
          "dialogueSuccess": "You've completed objective 5 of Campus Establishment! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        }
      ]
    },
    {
      "name": "Faculty Recruitment",
      "description": "Faculty Recruitment - Part of the Wasteland University quest line.",
      "objectives": [
        {
          "description": "Find experts in survival skills",
          "mapId": 160,
          "npcName": "Survival Expert Sam",
          "reward": "Wasteland University Token 2-1",
          "dialogueSuccess": "You've completed objective 1 of Faculty Recruitment! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Recruit those with medical knowledge",
          "mapId": 161,
          "npcName": "Medical Recruiter Mia",
          "reward": "Wasteland University Token 2-2",
          "dialogueSuccess": "You've completed objective 2 of Faculty Recruitment! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Locate individuals with engineering expertise",
          "mapId": 162,
          "npcName": "Engineering Expert Finder Ethan",
          "reward": "Wasteland University Token 2-3",
          "dialogueSuccess": "You've completed objective 3 of Faculty Recruitment! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Find those knowledgeable in agriculture",
          "mapId": 160,
          "npcName": "Agriculture Specialist Recruiter Amy",
          "reward": "Wasteland University Token 2-4",
          "dialogueSuccess": "You've completed objective 4 of Faculty Recruitment! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Recruit historians and cultural experts",
          "mapId": 161,
          "npcName": "Historian Hunter Harper",
          "reward": "Wasteland University Token 2-5",
          "dialogueSuccess": "You've completed objective 5 of Faculty Recruitment! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        }
      ]
    },
    {
      "name": "Curriculum Development",
      "description": "Curriculum Development - Part of the Wasteland University quest line.",
      "objectives": [
        {
          "description": "Develop a basic education program",
          "mapId": 160,
          "npcName": "Basic Education Developer Beth",
          "reward": "Wasteland University Token 3-1",
          "dialogueSuccess": "You've completed objective 1 of Curriculum Development! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Create specialized technical courses",
          "mapId": 161,
          "npcName": "Technical Course Creator Tom",
          "reward": "Wasteland University Token 3-2",
          "dialogueSuccess": "You've completed objective 2 of Curriculum Development! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Establish medical training curriculum",
          "mapId": 162,
          "npcName": "Medical Curriculum Designer Donna",
          "reward": "Wasteland University Token 3-3",
          "dialogueSuccess": "You've completed objective 3 of Curriculum Development! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Design agricultural education programs",
          "mapId": 160,
          "npcName": "Agriculture Program Planner Paul",
          "reward": "Wasteland University Token 3-4",
          "dialogueSuccess": "You've completed objective 4 of Curriculum Development! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Create cultural and historical studies",
          "mapId": 161,
          "npcName": "Cultural Studies Creator Cynthia",
          "reward": "Wasteland University Token 3-5",
          "dialogueSuccess": "You've completed objective 5 of Curriculum Development! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        }
      ]
    },
    {
      "name": "Resource Gathering",
      "description": "Resource Gathering - Part of the Wasteland University quest line.",
      "objectives": [
        {
          "description": "Gather textbooks and educational materials",
          "mapId": 160,
          "npcName": "Textbook Gatherer Gina",
          "reward": "Wasteland University Token 4-1",
          "dialogueSuccess": "You've completed objective 1 of Resource Gathering! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Collect laboratory equipment",
          "mapId": 161,
          "npcName": "Equipment Collector Eddie",
          "reward": "Wasteland University Token 4-2",
          "dialogueSuccess": "You've completed objective 2 of Resource Gathering! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Salvage teaching tools and aids",
          "mapId": 162,
          "npcName": "Teaching Tool Salvager Tina",
          "reward": "Wasteland University Token 4-3",
          "dialogueSuccess": "You've completed objective 3 of Resource Gathering! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Create a library of reference materials",
          "mapId": 160,
          "npcName": "Reference Librarian Rachel",
          "reward": "Wasteland University Token 4-4",
          "dialogueSuccess": "You've completed objective 4 of Resource Gathering! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Develop writing materials and supplies",
          "mapId": 161,
          "npcName": "Supplies Developer Sid",
          "reward": "Wasteland University Token 4-5",
          "dialogueSuccess": "You've completed objective 5 of Resource Gathering! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        }
      ]
    },
    {
      "name": "Student Enrollment",
      "description": "Student Enrollment - Part of the Wasteland University quest line.",
      "objectives": [
        {
          "description": "Recruit students from settlements",
          "mapId": 160,
          "npcName": "Student Recruiter Rita",
          "reward": "Wasteland University Token 5-1",
          "dialogueSuccess": "You've completed objective 1 of Student Enrollment! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Establish scholarship system for promising youth",
          "mapId": 161,
          "npcName": "Scholarship System Designer Stella",
          "reward": "Wasteland University Token 5-2",
          "dialogueSuccess": "You've completed objective 2 of Student Enrollment! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Create dormitories for resident students",
          "mapId": 162,
          "npcName": "Dormitory Developer Dexter",
          "reward": "Wasteland University Token 5-3",
          "dialogueSuccess": "You've completed objective 3 of Student Enrollment! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Develop graduation requirements",
          "mapId": 160,
          "npcName": "Graduation Requirement Creator Grace",
          "reward": "Wasteland University Token 5-4",
          "dialogueSuccess": "You've completed objective 4 of Student Enrollment! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Hold the first commencement ceremony",
          "mapId": 161,
          "npcName": "Ceremony Organizer Oscar",
          "reward": "Wasteland University Token 5-5",
          "dialogueSuccess": "You've completed objective 5 of Student Enrollment! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        }
      ]
    }
  ]
};

module.exports = questLine;