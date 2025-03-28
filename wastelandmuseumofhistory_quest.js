// Wasteland Museum of History Quest Line
const questLine = {
  "name": "Wasteland Museum of History",
  "description": "Create a museum to preserve the history of both pre-war civilization and the post-apocalyptic world for future generations.",
  "startingNPC": {
    "name": "Historian Hank",
    "appearance": "A meticulous person wearing a patchwork suit with pre-war neckties as decorations, carrying a notebook made from salvaged paper and wearing spectacles with mismatched lenses.",
    "personality": "Passionate about preserving history, speaks in historical references, frequently compares current events to historical ones, and treats artifacts with reverent care.",
    "dialogueIntro": "History is repeating itself before our very eyes! *adjusts spectacles* If we don't preserve our past, we're doomed to stumble blindly into the future. Help me build a museum to honor what was lost and document what has risen from the ashes!"
  },
  "startingMap": 175,
  "quests": [
    {
      "name": "Artifact Collection",
      "description": "Artifact Collection - Part of the Wasteland Museum of History quest line.",
      "objectives": [
        {
          "description": "Recover pre-war technological artifacts",
          "mapId": 175,
          "npcName": "Tech Salvager Tim",
          "reward": "Wasteland Museum of History Token 1-1",
          "dialogueSuccess": "You've completed objective 1 of Artifact Collection! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Collect items representing daily life before the apocalypse",
          "mapId": 176,
          "npcName": "Daily Life Collector Donna",
          "reward": "Wasteland Museum of History Token 1-2",
          "dialogueSuccess": "You've completed objective 2 of Artifact Collection! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Gather military and government artifacts",
          "mapId": 177,
          "npcName": "Military Artifact Hunter Marcus",
          "reward": "Wasteland Museum of History Token 1-3",
          "dialogueSuccess": "You've completed objective 3 of Artifact Collection! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Salvage art and cultural objects",
          "mapId": 175,
          "npcName": "Art Recoverer Ava",
          "reward": "Wasteland Museum of History Token 1-4",
          "dialogueSuccess": "You've completed objective 4 of Artifact Collection! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Find items representing the early post-apocalypse period",
          "mapId": 176,
          "npcName": "Post-Apocalypse Gatherer Gus",
          "reward": "Wasteland Museum of History Token 1-5",
          "dialogueSuccess": "You've completed objective 5 of Artifact Collection! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        }
      ]
    },
    {
      "name": "Museum Establishment",
      "description": "Museum Establishment - Part of the Wasteland Museum of History quest line.",
      "objectives": [
        {
          "description": "Secure a suitable building for the museum",
          "mapId": 175,
          "npcName": "Building Securer Benny",
          "reward": "Wasteland Museum of History Token 2-1",
          "dialogueSuccess": "You've completed objective 1 of Museum Establishment! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Restore and reinforce the structure",
          "mapId": 176,
          "npcName": "Restoration Expert Rita",
          "reward": "Wasteland Museum of History Token 2-2",
          "dialogueSuccess": "You've completed objective 2 of Museum Establishment! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Create display areas and exhibit halls",
          "mapId": 177,
          "npcName": "Display Designer Dexter",
          "reward": "Wasteland Museum of History Token 2-3",
          "dialogueSuccess": "You've completed objective 3 of Museum Establishment! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Establish security and preservation systems",
          "mapId": 175,
          "npcName": "Security Specialist Sam",
          "reward": "Wasteland Museum of History Token 2-4",
          "dialogueSuccess": "You've completed objective 4 of Museum Establishment! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Set up administrative and research spaces",
          "mapId": 176,
          "npcName": "Research Space Planner Rachel",
          "reward": "Wasteland Museum of History Token 2-5",
          "dialogueSuccess": "You've completed objective 5 of Museum Establishment! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        }
      ]
    },
    {
      "name": "Exhibit Creation",
      "description": "Exhibit Creation - Part of the Wasteland Museum of History quest line.",
      "objectives": [
        {
          "description": "Design the pre-war technology exhibit",
          "mapId": 175,
          "npcName": "Technology Exhibit Designer Tina",
          "reward": "Wasteland Museum of History Token 3-1",
          "dialogueSuccess": "You've completed objective 1 of Exhibit Creation! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Create the daily life before the apocalypse display",
          "mapId": 176,
          "npcName": "Daily Life Display Creator Dana",
          "reward": "Wasteland Museum of History Token 3-2",
          "dialogueSuccess": "You've completed objective 2 of Exhibit Creation! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Develop the military and government history section",
          "mapId": 177,
          "npcName": "Military Section Developer Mike",
          "reward": "Wasteland Museum of History Token 3-3",
          "dialogueSuccess": "You've completed objective 3 of Exhibit Creation! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Set up the art and culture gallery",
          "mapId": 175,
          "npcName": "Art Gallery Curator Cathy",
          "reward": "Wasteland Museum of History Token 3-4",
          "dialogueSuccess": "You've completed objective 4 of Exhibit Creation! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Build the post-apocalypse survival exhibit",
          "mapId": 176,
          "npcName": "Survival Exhibit Builder Bob",
          "reward": "Wasteland Museum of History Token 3-5",
          "dialogueSuccess": "You've completed objective 5 of Exhibit Creation! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        }
      ]
    },
    {
      "name": "Historical Documentation",
      "description": "Historical Documentation - Part of the Wasteland Museum of History quest line.",
      "objectives": [
        {
          "description": "Interview elders who remember pre-war times",
          "mapId": 175,
          "npcName": "Elder Interviewer Ellie",
          "reward": "Wasteland Museum of History Token 4-1",
          "dialogueSuccess": "You've completed objective 1 of Historical Documentation! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Record oral histories of the apocalypse event",
          "mapId": 176,
          "npcName": "Apocalypse Historian Harper",
          "reward": "Wasteland Museum of History Token 4-2",
          "dialogueSuccess": "You've completed objective 2 of Historical Documentation! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Document the formation of new settlements",
          "mapId": 177,
          "npcName": "Settlement Chronicler Charlie",
          "reward": "Wasteland Museum of History Token 4-3",
          "dialogueSuccess": "You've completed objective 3 of Historical Documentation! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Create a timeline of post-apocalyptic events",
          "mapId": 175,
          "npcName": "Timeline Creator Tara",
          "reward": "Wasteland Museum of History Token 4-4",
          "dialogueSuccess": "You've completed objective 4 of Historical Documentation! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Map the changes in the wasteland over time",
          "mapId": 176,
          "npcName": "Wasteland Mapper Manny",
          "reward": "Wasteland Museum of History Token 4-5",
          "dialogueSuccess": "You've completed objective 5 of Historical Documentation! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        }
      ]
    },
    {
      "name": "Public Education",
      "description": "Public Education - Part of the Wasteland Museum of History quest line.",
      "objectives": [
        {
          "description": "Develop educational programs for children",
          "mapId": 175,
          "npcName": "Children's Program Developer Penny",
          "reward": "Wasteland Museum of History Token 5-1",
          "dialogueSuccess": "You've completed objective 1 of Public Education! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Create guided tours of the museum",
          "mapId": 176,
          "npcName": "Tour Guide Trainer Tom",
          "reward": "Wasteland Museum of History Token 5-2",
          "dialogueSuccess": "You've completed objective 2 of Public Education! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Establish regular historical lectures",
          "mapId": 177,
          "npcName": "Lecture Organizer Larry",
          "reward": "Wasteland Museum of History Token 5-3",
          "dialogueSuccess": "You've completed objective 3 of Public Education! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Train volunteer docents from the community",
          "mapId": 175,
          "npcName": "Docent Trainer Daisy",
          "reward": "Wasteland Museum of History Token 5-4",
          "dialogueSuccess": "You've completed objective 4 of Public Education! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Host a grand opening ceremony",
          "mapId": 176,
          "npcName": "Ceremony Planner Patty",
          "reward": "Wasteland Museum of History Token 5-5",
          "dialogueSuccess": "You've completed objective 5 of Public Education! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        }
      ]
    }
  ]
};

module.exports = questLine;