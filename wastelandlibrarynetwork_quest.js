// Wasteland Library Network Quest Line
const questLine = {
  "name": "Wasteland Library Network",
  "description": "Establish a network of libraries across the wasteland to preserve knowledge and provide education to survivors.",
  "startingNPC": {
    "name": "Bookkeeper Brains",
    "appearance": "A scholarly person wearing glasses with different lenses cobbled together, dressed in a librarian outfit patched with book covers, and carrying a backpack full of salvaged books.",
    "personality": "Meticulous and passionate about knowledge, speaks in literary references, constantly organizes things alphabetically, and shushes loud noises.",
    "dialogueIntro": "Shhh! *adjusts glasses* Knowledge is our most precious resource in this wasteland. *pats book bag* Help me establish a library network to preserve what remains of human wisdom, or we're doomed to repeat the mistakes that brought us here!"
  },
  "startingMap": 155,
  "quests": [
    {
      "name": "Book Salvage",
      "description": "Book Salvage - Part of the Wasteland Library Network quest line.",
      "objectives": [
        {
          "description": "Recover books from abandoned schools",
          "mapId": 155,
          "npcName": "School Salvager Sally",
          "reward": "Wasteland Library Network Token 1-1",
          "dialogueSuccess": "You've completed objective 1 of Book Salvage! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Salvage texts from ruined universities",
          "mapId": 156,
          "npcName": "University Explorer Uma",
          "reward": "Wasteland Library Network Token 1-2",
          "dialogueSuccess": "You've completed objective 2 of Book Salvage! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Gather technical manuals from factories",
          "mapId": 157,
          "npcName": "Manual Collector Mike",
          "reward": "Wasteland Library Network Token 1-3",
          "dialogueSuccess": "You've completed objective 3 of Book Salvage! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Collect fiction from residential areas",
          "mapId": 155,
          "npcName": "Fiction Finder Fiona",
          "reward": "Wasteland Library Network Token 1-4",
          "dialogueSuccess": "You've completed objective 4 of Book Salvage! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Salvage digital storage devices with books",
          "mapId": 156,
          "npcName": "Digital Recoverer Dexter",
          "reward": "Wasteland Library Network Token 1-5",
          "dialogueSuccess": "You've completed objective 5 of Book Salvage! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        }
      ]
    },
    {
      "name": "Library Establishment",
      "description": "Library Establishment - Part of the Wasteland Library Network quest line.",
      "objectives": [
        {
          "description": "Secure a building for the central library",
          "mapId": 155,
          "npcName": "Building Securer Benny",
          "reward": "Wasteland Library Network Token 2-1",
          "dialogueSuccess": "You've completed objective 1 of Library Establishment! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Create shelving and storage systems",
          "mapId": 156,
          "npcName": "Shelving Builder Sam",
          "reward": "Wasteland Library Network Token 2-2",
          "dialogueSuccess": "You've completed objective 2 of Library Establishment! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Set up reading and study areas",
          "mapId": 157,
          "npcName": "Reading Area Designer Rita",
          "reward": "Wasteland Library Network Token 2-3",
          "dialogueSuccess": "You've completed objective 3 of Library Establishment! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Establish book repair stations",
          "mapId": 155,
          "npcName": "Repair Specialist Rachel",
          "reward": "Wasteland Library Network Token 2-4",
          "dialogueSuccess": "You've completed objective 4 of Library Establishment! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Create a system for lending books",
          "mapId": 156,
          "npcName": "Lending System Developer Leo",
          "reward": "Wasteland Library Network Token 2-5",
          "dialogueSuccess": "You've completed objective 5 of Library Establishment! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        }
      ]
    },
    {
      "name": "Cataloging System",
      "description": "Cataloging System - Part of the Wasteland Library Network quest line.",
      "objectives": [
        {
          "description": "Develop a classification system",
          "mapId": 155,
          "npcName": "Classification Creator Cora",
          "reward": "Wasteland Library Network Token 3-1",
          "dialogueSuccess": "You've completed objective 1 of Cataloging System! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Create a catalog of all salvaged books",
          "mapId": 156,
          "npcName": "Catalog Compiler Carl",
          "reward": "Wasteland Library Network Token 3-2",
          "dialogueSuccess": "You've completed objective 2 of Cataloging System! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Establish inventory tracking methods",
          "mapId": 157,
          "npcName": "Inventory Manager Irene",
          "reward": "Wasteland Library Network Token 3-3",
          "dialogueSuccess": "You've completed objective 3 of Cataloging System! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Make reference cards and indexes",
          "mapId": 155,
          "npcName": "Index Maker Ian",
          "reward": "Wasteland Library Network Token 3-4",
          "dialogueSuccess": "You've completed objective 4 of Cataloging System! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Set up subject organization",
          "mapId": 156,
          "npcName": "Subject Organizer Sophia",
          "reward": "Wasteland Library Network Token 3-5",
          "dialogueSuccess": "You've completed objective 5 of Cataloging System! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        }
      ]
    },
    {
      "name": "Librarian Training",
      "description": "Librarian Training - Part of the Wasteland Library Network quest line.",
      "objectives": [
        {
          "description": "Recruit literate individuals as librarians",
          "mapId": 155,
          "npcName": "Librarian Recruiter Lisa",
          "reward": "Wasteland Library Network Token 4-1",
          "dialogueSuccess": "You've completed objective 1 of Librarian Training! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Train staff in book preservation",
          "mapId": 156,
          "npcName": "Preservation Trainer Paul",
          "reward": "Wasteland Library Network Token 4-2",
          "dialogueSuccess": "You've completed objective 2 of Librarian Training! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Teach cataloging and organization",
          "mapId": 157,
          "npcName": "Catalog Instructor Cathy",
          "reward": "Wasteland Library Network Token 4-3",
          "dialogueSuccess": "You've completed objective 3 of Librarian Training! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Instruct on knowledge sharing methods",
          "mapId": 155,
          "npcName": "Knowledge Sharing Teacher Ken",
          "reward": "Wasteland Library Network Token 4-4",
          "dialogueSuccess": "You've completed objective 4 of Librarian Training! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Train reading teachers for the illiterate",
          "mapId": 156,
          "npcName": "Reading Teacher Trainer Tina",
          "reward": "Wasteland Library Network Token 4-5",
          "dialogueSuccess": "You've completed objective 5 of Librarian Training! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        }
      ]
    },
    {
      "name": "Knowledge Network",
      "description": "Knowledge Network - Part of the Wasteland Library Network quest line.",
      "objectives": [
        {
          "description": "Establish satellite libraries in settlements",
          "mapId": 155,
          "npcName": "Satellite Establisher Stella",
          "reward": "Wasteland Library Network Token 5-1",
          "dialogueSuccess": "You've completed objective 1 of Knowledge Network! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Create a book rotation system between locations",
          "mapId": 156,
          "npcName": "Rotation System Developer Ryan",
          "reward": "Wasteland Library Network Token 5-2",
          "dialogueSuccess": "You've completed objective 2 of Knowledge Network! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Develop a courier network for book requests",
          "mapId": 157,
          "npcName": "Courier Network Organizer Nina",
          "reward": "Wasteland Library Network Token 5-3",
          "dialogueSuccess": "You've completed objective 3 of Knowledge Network! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Organize community reading events",
          "mapId": 155,
          "npcName": "Reading Event Planner Evan",
          "reward": "Wasteland Library Network Token 5-4",
          "dialogueSuccess": "You've completed objective 4 of Knowledge Network! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Create a system for recording oral knowledge",
          "mapId": 156,
          "npcName": "Oral Historian Harper",
          "reward": "Wasteland Library Network Token 5-5",
          "dialogueSuccess": "You've completed objective 5 of Knowledge Network! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        }
      ]
    }
  ]
};

module.exports = questLine;