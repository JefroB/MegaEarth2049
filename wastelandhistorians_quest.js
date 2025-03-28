// Wasteland Historians Quest Line
const questLine = {
  "name": "Wasteland Historians",
  "description": "Preserve the knowledge and history of the pre-war world and document the emerging cultures of the wasteland.",
  "startingNPC": {
    "name": "Archivist Abby",
    "appearance": "A meticulous person wearing glasses repaired with different colored wires, dressed in layers of protective clothing to prevent damage to the books and artifacts they constantly carry.",
    "personality": "Intensely curious and detail-oriented, speaks in tangents full of historical references and gets easily distracted by new information.",
    "dialogueIntro": "The past isn't dead! It's just... temporarily misplaced. *adjusts glasses* Every scrap of knowledge we save is a building block for the future. Help me preserve what remains before it's lost forever!"
  },
  "startingMap": 110,
  "quests": [
    {
      "name": "Library Restoration",
      "description": "Library Restoration - Part of the Wasteland Historians quest line.",
      "objectives": [
        {
          "description": "Secure an abandoned library building",
          "mapId": 110,
          "npcName": "Building Securer Benny",
          "reward": "Wasteland Historians Token 1-1",
          "dialogueSuccess": "You've completed objective 1 of Library Restoration! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Repair the structure and reinforce it",
          "mapId": 111,
          "npcName": "Repair Specialist Rosa",
          "reward": "Wasteland Historians Token 1-2",
          "dialogueSuccess": "You've completed objective 2 of Library Restoration! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Set up preservation systems for books",
          "mapId": 112,
          "npcName": "Preservation Expert Penny",
          "reward": "Wasteland Historians Token 1-3",
          "dialogueSuccess": "You've completed objective 3 of Library Restoration! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Create a cataloging system",
          "mapId": 110,
          "npcName": "Catalog Creator Carl",
          "reward": "Wasteland Historians Token 1-4",
          "dialogueSuccess": "You've completed objective 4 of Library Restoration! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Establish security measures for the collection",
          "mapId": 111,
          "npcName": "Security Installer Sam",
          "reward": "Wasteland Historians Token 1-5",
          "dialogueSuccess": "You've completed objective 5 of Library Restoration! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        }
      ]
    },
    {
      "name": "Knowledge Recovery",
      "description": "Knowledge Recovery - Part of the Wasteland Historians quest line.",
      "objectives": [
        {
          "description": "Locate and recover books from ruins",
          "mapId": 110,
          "npcName": "Book Hunter Bella",
          "reward": "Wasteland Historians Token 2-1",
          "dialogueSuccess": "You've completed objective 1 of Knowledge Recovery! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Salvage digital storage devices",
          "mapId": 111,
          "npcName": "Digital Salvager Dexter",
          "reward": "Wasteland Historians Token 2-2",
          "dialogueSuccess": "You've completed objective 2 of Knowledge Recovery! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Recover art and cultural artifacts",
          "mapId": 112,
          "npcName": "Art Recoverer Ava",
          "reward": "Wasteland Historians Token 2-3",
          "dialogueSuccess": "You've completed objective 3 of Knowledge Recovery! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Preserve fragile documents",
          "mapId": 110,
          "npcName": "Document Preserver Donna",
          "reward": "Wasteland Historians Token 2-4",
          "dialogueSuccess": "You've completed objective 4 of Knowledge Recovery! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Organize recovered materials by subject",
          "mapId": 111,
          "npcName": "Organization Specialist Oscar",
          "reward": "Wasteland Historians Token 2-5",
          "dialogueSuccess": "You've completed objective 5 of Knowledge Recovery! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        }
      ]
    },
    {
      "name": "Oral History Project",
      "description": "Oral History Project - Part of the Wasteland Historians quest line.",
      "objectives": [
        {
          "description": "Identify wasteland elders with pre-war memories",
          "mapId": 110,
          "npcName": "Elder Finder Ellie",
          "reward": "Wasteland Historians Token 3-1",
          "dialogueSuccess": "You've completed objective 1 of Oral History Project! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Develop interview protocols",
          "mapId": 111,
          "npcName": "Interview Developer Ivan",
          "reward": "Wasteland Historians Token 3-2",
          "dialogueSuccess": "You've completed objective 2 of Oral History Project! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Record and transcribe survivor stories",
          "mapId": 112,
          "npcName": "Story Recorder Randy",
          "reward": "Wasteland Historians Token 3-3",
          "dialogueSuccess": "You've completed objective 3 of Oral History Project! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Document emerging wasteland cultures",
          "mapId": 110,
          "npcName": "Culture Documenter Dina",
          "reward": "Wasteland Historians Token 3-4",
          "dialogueSuccess": "You've completed objective 4 of Oral History Project! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Create an accessible oral history archive",
          "mapId": 111,
          "npcName": "Archive Manager Archie",
          "reward": "Wasteland Historians Token 3-5",
          "dialogueSuccess": "You've completed objective 5 of Oral History Project! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        }
      ]
    },
    {
      "name": "Museum Establishment",
      "description": "Museum Establishment - Part of the Wasteland Historians quest line.",
      "objectives": [
        {
          "description": "Secure location for the wasteland museum",
          "mapId": 110,
          "npcName": "Museum Locator Mia",
          "reward": "Wasteland Historians Token 4-1",
          "dialogueSuccess": "You've completed objective 1 of Museum Establishment! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Design exhibit spaces",
          "mapId": 111,
          "npcName": "Exhibit Designer Ethan",
          "reward": "Wasteland Historians Token 4-2",
          "dialogueSuccess": "You've completed objective 2 of Museum Establishment! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Create informative displays",
          "mapId": 112,
          "npcName": "Display Creator Daisy",
          "reward": "Wasteland Historians Token 4-3",
          "dialogueSuccess": "You've completed objective 3 of Museum Establishment! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Set up interactive learning stations",
          "mapId": 110,
          "npcName": "Learning Station Builder Leo",
          "reward": "Wasteland Historians Token 4-4",
          "dialogueSuccess": "You've completed objective 4 of Museum Establishment! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Prepare for the museum opening",
          "mapId": 111,
          "npcName": "Opening Preparer Olivia",
          "reward": "Wasteland Historians Token 4-5",
          "dialogueSuccess": "You've completed objective 5 of Museum Establishment! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        }
      ]
    },
    {
      "name": "Education Initiative",
      "description": "Education Initiative - Part of the Wasteland Historians quest line.",
      "objectives": [
        {
          "description": "Develop basic educational curriculum",
          "mapId": 110,
          "npcName": "Curriculum Developer Cora",
          "reward": "Wasteland Historians Token 5-1",
          "dialogueSuccess": "You've completed objective 1 of Education Initiative! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Train wasteland teachers",
          "mapId": 111,
          "npcName": "Teacher Trainer Tina",
          "reward": "Wasteland Historians Token 5-2",
          "dialogueSuccess": "You've completed objective 2 of Education Initiative! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Establish community learning centers",
          "mapId": 112,
          "npcName": "Learning Center Establisher Liam",
          "reward": "Wasteland Historians Token 5-3",
          "dialogueSuccess": "You've completed objective 3 of Education Initiative! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Create and distribute educational materials",
          "mapId": 110,
          "npcName": "Materials Creator Mack",
          "reward": "Wasteland Historians Token 5-4",
          "dialogueSuccess": "You've completed objective 4 of Education Initiative! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Host the first Wasteland Knowledge Fair",
          "mapId": 111,
          "npcName": "Fair Organizer Fiona",
          "reward": "Wasteland Historians Token 5-5",
          "dialogueSuccess": "You've completed objective 5 of Education Initiative! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        }
      ]
    }
  ]
};

module.exports = questLine;