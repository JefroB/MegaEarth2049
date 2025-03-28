// Wasteland Circus Quest Line
const questLine = {
  "name": "Wasteland Circus",
  "description": "Create a traveling circus that brings wonder and entertainment to the wasteland settlements with mutant animals and daring performers.",
  "startingNPC": {
    "name": "Ringmaster Rad",
    "appearance": "A flamboyant person in a radiation-resistant ringmaster's outfit with glowing trim, carrying a megaphone crafted from a traffic cone and wearing platform boots made from car parts.",
    "personality": "Bombastic and theatrical, speaks in exaggerated announcer voice, constantly hypes up even mundane events, and has a flair for the dramatic pause.",
    "dialogueIntro": "LADIES AND GENTLEMEN AND MUTANTS OF ALL KINDS! *dramatic pause* Prepare to be AMAZED! The wasteland needs wonder, and we shall provide it! Join me in creating the most SPECTACULAR, DEATH-DEFYING, MUTATION-CELEBRATING circus the apocalypse has ever seen!"
  },
  "startingMap": 150,
  "quests": [
    {
      "name": "Performer Recruitment",
      "description": "Performer Recruitment - Part of the Wasteland Circus quest line.",
      "objectives": [
        {
          "description": "Find acrobats among the agile scavengers",
          "mapId": 150,
          "npcName": "Acrobat Scout Alex",
          "reward": "Wasteland Circus Token 1-1",
          "dialogueSuccess": "You've completed objective 1 of Performer Recruitment! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Recruit strongmen from the labor camps",
          "mapId": 151,
          "npcName": "Strongman Recruiter Steve",
          "reward": "Wasteland Circus Token 1-2",
          "dialogueSuccess": "You've completed objective 2 of Performer Recruitment! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Discover magicians using wasteland tricks",
          "mapId": 152,
          "npcName": "Magician Finder Mia",
          "reward": "Wasteland Circus Token 1-3",
          "dialogueSuccess": "You've completed objective 3 of Performer Recruitment! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Locate clowns and comedians in settlements",
          "mapId": 150,
          "npcName": "Comedian Locator Chuck",
          "reward": "Wasteland Circus Token 1-4",
          "dialogueSuccess": "You've completed objective 4 of Performer Recruitment! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Find daredevils willing to perform stunts",
          "mapId": 151,
          "npcName": "Daredevil Recruiter Dina",
          "reward": "Wasteland Circus Token 1-5",
          "dialogueSuccess": "You've completed objective 5 of Performer Recruitment! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        }
      ]
    },
    {
      "name": "Animal Training",
      "description": "Animal Training - Part of the Wasteland Circus quest line.",
      "objectives": [
        {
          "description": "Capture and tame two-headed wolves",
          "mapId": 150,
          "npcName": "Wolf Tamer Wendy",
          "reward": "Wasteland Circus Token 2-1",
          "dialogueSuccess": "You've completed objective 1 of Animal Training! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Train giant mutant rats for performances",
          "mapId": 151,
          "npcName": "Rat Trainer Randy",
          "reward": "Wasteland Circus Token 2-2",
          "dialogueSuccess": "You've completed objective 2 of Animal Training! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Domesticate glowing lizards for light shows",
          "mapId": 152,
          "npcName": "Lizard Handler Larry",
          "reward": "Wasteland Circus Token 2-3",
          "dialogueSuccess": "You've completed objective 3 of Animal Training! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Teach tricks to mutated birds",
          "mapId": 150,
          "npcName": "Bird Trainer Bella",
          "reward": "Wasteland Circus Token 2-4",
          "dialogueSuccess": "You've completed objective 4 of Animal Training! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Bond with a radiation-enhanced bear",
          "mapId": 151,
          "npcName": "Bear Tamer Boris",
          "reward": "Wasteland Circus Token 2-5",
          "dialogueSuccess": "You've completed objective 5 of Animal Training! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        }
      ]
    },
    {
      "name": "Equipment Creation",
      "description": "Equipment Creation - Part of the Wasteland Circus quest line.",
      "objectives": [
        {
          "description": "Create a high wire from salvaged cables",
          "mapId": 150,
          "npcName": "Wire Worker Will",
          "reward": "Wasteland Circus Token 3-1",
          "dialogueSuccess": "You've completed objective 1 of Equipment Creation! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Build a trapeze system from scrap metal",
          "mapId": 151,
          "npcName": "Trapeze Builder Tina",
          "reward": "Wasteland Circus Token 3-2",
          "dialogueSuccess": "You've completed objective 2 of Equipment Creation! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Construct juggling props from debris",
          "mapId": 152,
          "npcName": "Prop Creator Penny",
          "reward": "Wasteland Circus Token 3-3",
          "dialogueSuccess": "You've completed objective 3 of Equipment Creation! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Make clown props and gags from junk",
          "mapId": 150,
          "npcName": "Clown Supplier Charlie",
          "reward": "Wasteland Circus Token 3-4",
          "dialogueSuccess": "You've completed objective 4 of Equipment Creation! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Build stunt ramps and safety equipment",
          "mapId": 151,
          "npcName": "Stunt Engineer Stella",
          "reward": "Wasteland Circus Token 3-5",
          "dialogueSuccess": "You've completed objective 5 of Equipment Creation! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        }
      ]
    },
    {
      "name": "Tent Construction",
      "description": "Tent Construction - Part of the Wasteland Circus quest line.",
      "objectives": [
        {
          "description": "Gather durable fabric for the big top",
          "mapId": 150,
          "npcName": "Fabric Gatherer Fiona",
          "reward": "Wasteland Circus Token 4-1",
          "dialogueSuccess": "You've completed objective 1 of Tent Construction! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Create a tent frame from salvaged poles",
          "mapId": 151,
          "npcName": "Frame Builder Frank",
          "reward": "Wasteland Circus Token 4-2",
          "dialogueSuccess": "You've completed objective 2 of Tent Construction! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Design seating for the audience",
          "mapId": 152,
          "npcName": "Seating Designer Sam",
          "reward": "Wasteland Circus Token 4-3",
          "dialogueSuccess": "You've completed objective 3 of Tent Construction! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Set up a center ring performance area",
          "mapId": 150,
          "npcName": "Ring Creator Rita",
          "reward": "Wasteland Circus Token 4-4",
          "dialogueSuccess": "You've completed objective 4 of Tent Construction! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Create lighting for night performances",
          "mapId": 151,
          "npcName": "Lighting Technician Leo",
          "reward": "Wasteland Circus Token 4-5",
          "dialogueSuccess": "You've completed objective 5 of Tent Construction! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        }
      ]
    },
    {
      "name": "Tour Organization",
      "description": "Tour Organization - Part of the Wasteland Circus quest line.",
      "objectives": [
        {
          "description": "Map a route between major settlements",
          "mapId": 150,
          "npcName": "Route Planner Rachel",
          "reward": "Wasteland Circus Token 5-1",
          "dialogueSuccess": "You've completed objective 1 of Tour Organization! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Create promotional materials for the circus",
          "mapId": 151,
          "npcName": "Promotions Designer Paul",
          "reward": "Wasteland Circus Token 5-2",
          "dialogueSuccess": "You've completed objective 2 of Tour Organization! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Establish transportation for performers and equipment",
          "mapId": 152,
          "npcName": "Transport Coordinator Tom",
          "reward": "Wasteland Circus Token 5-3",
          "dialogueSuccess": "You've completed objective 3 of Tour Organization! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Coordinate the first performance",
          "mapId": 150,
          "npcName": "Performance Director Donna",
          "reward": "Wasteland Circus Token 5-4",
          "dialogueSuccess": "You've completed objective 4 of Tour Organization! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Collect feedback for show improvements",
          "mapId": 151,
          "npcName": "Feedback Collector Felix",
          "reward": "Wasteland Circus Token 5-5",
          "dialogueSuccess": "You've completed objective 5 of Tour Organization! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        }
      ]
    }
  ]
};

module.exports = questLine;