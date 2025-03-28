// Mutant Pet Rescue Quest Line
const questLine = {
  "name": "Mutant Pet Rescue",
  "description": "Establish a sanctuary for mutated animals and find them loving homes in the wasteland.",
  "startingNPC": {
    "name": "Creature Keeper Kelly",
    "appearance": "A sturdy person covered in scars and animal fur, with various small mutated creatures perched on their shoulders and hiding in their many pockets.",
    "personality": "Gruff but deeply compassionate, with more patience for animals than humans.",
    "dialogueIntro": "These little guys didn't ask to be changed by the wasteland. They deserve love too. You look like you might have a good heart under all that gear. Wanna help?"
  },
  "startingMap": 80,
  "quests": [
    {
      "name": "Sanctuary Construction",
      "description": "Sanctuary Construction - Part of the Mutant Pet Rescue quest line.",
      "objectives": [
        {
          "description": "Scout location for the animal sanctuary",
          "mapId": 80,
          "npcName": "Location Scout Leila",
          "reward": "Mutant Pet Rescue Token 1-1",
          "dialogueSuccess": "You've completed objective 1 of Sanctuary Construction! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Gather building materials",
          "mapId": 81,
          "npcName": "Material Gatherer Milo",
          "reward": "Mutant Pet Rescue Token 1-2",
          "dialogueSuccess": "You've completed objective 2 of Sanctuary Construction! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Construct basic shelter structures",
          "mapId": 82,
          "npcName": "Shelter Builder Benny",
          "reward": "Mutant Pet Rescue Token 1-3",
          "dialogueSuccess": "You've completed objective 3 of Sanctuary Construction! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Build specialized habitats for different species",
          "mapId": 80,
          "npcName": "Habitat Designer Heidi",
          "reward": "Mutant Pet Rescue Token 1-4",
          "dialogueSuccess": "You've completed objective 4 of Sanctuary Construction! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Set up security systems to protect the sanctuary",
          "mapId": 81,
          "npcName": "Security Expert Sven",
          "reward": "Mutant Pet Rescue Token 1-5",
          "dialogueSuccess": "You've completed objective 5 of Sanctuary Construction! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        }
      ]
    },
    {
      "name": "Rescue Operations",
      "description": "Rescue Operations - Part of the Mutant Pet Rescue quest line.",
      "objectives": [
        {
          "description": "Investigate reports of mutant animal sightings",
          "mapId": 80,
          "npcName": "Wildlife Tracker Wendy",
          "reward": "Mutant Pet Rescue Token 2-1",
          "dialogueSuccess": "You've completed objective 1 of Rescue Operations! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Develop safe capture techniques",
          "mapId": 81,
          "npcName": "Capture Specialist Casey",
          "reward": "Mutant Pet Rescue Token 2-2",
          "dialogueSuccess": "You've completed objective 2 of Rescue Operations! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Rescue animals from dangerous areas",
          "mapId": 82,
          "npcName": "Danger Zone Rescuer Zack",
          "reward": "Mutant Pet Rescue Token 2-3",
          "dialogueSuccess": "You've completed objective 3 of Rescue Operations! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Transport animals safely to the sanctuary",
          "mapId": 80,
          "npcName": "Transport Technician Tara",
          "reward": "Mutant Pet Rescue Token 2-4",
          "dialogueSuccess": "You've completed objective 4 of Rescue Operations! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Document species variations for the sanctuary database",
          "mapId": 81,
          "npcName": "Database Manager Dexter",
          "reward": "Mutant Pet Rescue Token 2-5",
          "dialogueSuccess": "You've completed objective 5 of Rescue Operations! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        }
      ]
    },
    {
      "name": "Veterinary Care",
      "description": "Veterinary Care - Part of the Mutant Pet Rescue quest line.",
      "objectives": [
        {
          "description": "Recruit wasteland veterinarians",
          "mapId": 80,
          "npcName": "Veterinarian Recruiter Valerie",
          "reward": "Mutant Pet Rescue Token 3-1",
          "dialogueSuccess": "You've completed objective 1 of Veterinary Care! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Salvage medical equipment",
          "mapId": 81,
          "npcName": "Equipment Salvager Ethan",
          "reward": "Mutant Pet Rescue Token 3-2",
          "dialogueSuccess": "You've completed objective 2 of Veterinary Care! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Set up treatment areas",
          "mapId": 82,
          "npcName": "Treatment Area Designer Tess",
          "reward": "Mutant Pet Rescue Token 3-3",
          "dialogueSuccess": "You've completed objective 3 of Veterinary Care! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Develop specialized care protocols for mutations",
          "mapId": 80,
          "npcName": "Protocol Developer Phoebe",
          "reward": "Mutant Pet Rescue Token 3-4",
          "dialogueSuccess": "You've completed objective 4 of Veterinary Care! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Train volunteer medical assistants",
          "mapId": 81,
          "npcName": "Volunteer Trainer Victor",
          "reward": "Mutant Pet Rescue Token 3-5",
          "dialogueSuccess": "You've completed objective 5 of Veterinary Care! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        }
      ]
    },
    {
      "name": "Rehabilitation Program",
      "description": "Rehabilitation Program - Part of the Mutant Pet Rescue quest line.",
      "objectives": [
        {
          "description": "Assess behavioral issues in rescued animals",
          "mapId": 80,
          "npcName": "Behavioral Analyst Blake",
          "reward": "Mutant Pet Rescue Token 4-1",
          "dialogueSuccess": "You've completed objective 1 of Rehabilitation Program! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Design enrichment activities for different species",
          "mapId": 81,
          "npcName": "Enrichment Designer Emma",
          "reward": "Mutant Pet Rescue Token 4-2",
          "dialogueSuccess": "You've completed objective 2 of Rehabilitation Program! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Implement socialization programs",
          "mapId": 82,
          "npcName": "Socialization Specialist Sophie",
          "reward": "Mutant Pet Rescue Token 4-3",
          "dialogueSuccess": "You've completed objective 3 of Rehabilitation Program! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Train animals with basic commands",
          "mapId": 80,
          "npcName": "Animal Trainer Axel",
          "reward": "Mutant Pet Rescue Token 4-4",
          "dialogueSuccess": "You've completed objective 4 of Rehabilitation Program! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Evaluate animals for adoption readiness",
          "mapId": 81,
          "npcName": "Adoption Evaluator Eva",
          "reward": "Mutant Pet Rescue Token 4-5",
          "dialogueSuccess": "You've completed objective 5 of Rehabilitation Program! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        }
      ]
    },
    {
      "name": "Adoption Network",
      "description": "Adoption Network - Part of the Mutant Pet Rescue quest line.",
      "objectives": [
        {
          "description": "Create adoption profiles for rehabilitated animals",
          "mapId": 80,
          "npcName": "Profile Creator Polly",
          "reward": "Mutant Pet Rescue Token 5-1",
          "dialogueSuccess": "You've completed objective 1 of Adoption Network! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Screen potential adopters",
          "mapId": 81,
          "npcName": "Adopter Screener Sid",
          "reward": "Mutant Pet Rescue Token 5-2",
          "dialogueSuccess": "You've completed objective 2 of Adoption Network! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Match animals with suitable homes",
          "mapId": 82,
          "npcName": "Animal Matcher Mandy",
          "reward": "Mutant Pet Rescue Token 5-3",
          "dialogueSuccess": "You've completed objective 3 of Adoption Network! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Conduct follow-up visits",
          "mapId": 80,
          "npcName": "Follow-up Coordinator Fran",
          "reward": "Mutant Pet Rescue Token 5-4",
          "dialogueSuccess": "You've completed objective 4 of Adoption Network! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Host adoption events at settlements",
          "mapId": 81,
          "npcName": "Event Organizer Otto",
          "reward": "Mutant Pet Rescue Token 5-5",
          "dialogueSuccess": "You've completed objective 5 of Adoption Network! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        }
      ]
    }
  ]
};

module.exports = questLine;