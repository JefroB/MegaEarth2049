// Wasteland Fashion Quest Line
const questLine = {
  "name": "Wasteland Fashion",
  "description": "Create a fashion empire in the wasteland by repurposing scrap materials into avant-garde clothing.",
  "startingNPC": {
    "name": "Threadbare Theo",
    "appearance": "A slender person of indeterminate gender wearing an elaborate outfit made entirely of salvaged tech components and colorful wires.",
    "personality": "Flamboyant and dramatic, with an eye for beauty in the most unlikely places.",
    "dialogueIntro": "Darling, look at you! So... utilitarian. We simply must do something about that. The apocalypse is no excuse for poor fashion choices!"
  },
  "startingMap": 75,
  "quests": [
    {
      "name": "Material Gathering",
      "description": "Material Gathering - Part of the Wasteland Fashion quest line.",
      "objectives": [
        {
          "description": "Collect rare fabrics from abandoned luxury stores",
          "mapId": 75,
          "npcName": "Fabric Hunter Faye",
          "reward": "Wasteland Fashion Token 1-1",
          "dialogueSuccess": "You've completed objective 1 of Material Gathering! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Salvage electronic components for embellishments",
          "mapId": 76,
          "npcName": "Electronics Salvager Eli",
          "reward": "Wasteland Fashion Token 1-2",
          "dialogueSuccess": "You've completed objective 2 of Material Gathering! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Gather metallic scraps from vehicle graveyards",
          "mapId": 77,
          "npcName": "Metal Scrapper Mack",
          "reward": "Wasteland Fashion Token 1-3",
          "dialogueSuccess": "You've completed objective 3 of Material Gathering! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Extract dyes from mutated plants",
          "mapId": 75,
          "npcName": "Dye Extractor Daisy",
          "reward": "Wasteland Fashion Token 1-4",
          "dialogueSuccess": "You've completed objective 4 of Material Gathering! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Deliver materials to Threadbare Theo",
          "mapId": 76,
          "npcName": "Material Sorter Mia",
          "reward": "Wasteland Fashion Token 1-5",
          "dialogueSuccess": "You've completed objective 5 of Material Gathering! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        }
      ]
    },
    {
      "name": "Design Competition",
      "description": "Design Competition - Part of the Wasteland Fashion quest line.",
      "objectives": [
        {
          "description": "Recruit aspiring designers from settlements",
          "mapId": 75,
          "npcName": "Talent Scout Tina",
          "reward": "Wasteland Fashion Token 2-1",
          "dialogueSuccess": "You've completed objective 1 of Design Competition! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Set up design workstations",
          "mapId": 76,
          "npcName": "Workstation Builder Walt",
          "reward": "Wasteland Fashion Token 2-2",
          "dialogueSuccess": "You've completed objective 2 of Design Competition! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Organize design categories and rules",
          "mapId": 77,
          "npcName": "Rules Committee Rita",
          "reward": "Wasteland Fashion Token 2-3",
          "dialogueSuccess": "You've completed objective 3 of Design Competition! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Judge preliminary design submissions",
          "mapId": 75,
          "npcName": "Judge Judy",
          "reward": "Wasteland Fashion Token 2-4",
          "dialogueSuccess": "You've completed objective 4 of Design Competition! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Select finalists for the fashion show",
          "mapId": 76,
          "npcName": "Finalist Selector Finn",
          "reward": "Wasteland Fashion Token 2-5",
          "dialogueSuccess": "You've completed objective 5 of Design Competition! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        }
      ]
    },
    {
      "name": "Runway Preparation",
      "description": "Runway Preparation - Part of the Wasteland Fashion quest line.",
      "objectives": [
        {
          "description": "Secure location for the wasteland runway",
          "mapId": 75,
          "npcName": "Location Scout Liam",
          "reward": "Wasteland Fashion Token 3-1",
          "dialogueSuccess": "You've completed objective 1 of Runway Preparation! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Build the catwalk from salvaged materials",
          "mapId": 76,
          "npcName": "Catwalk Constructor Carl",
          "reward": "Wasteland Fashion Token 3-2",
          "dialogueSuccess": "You've completed objective 2 of Runway Preparation! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Set up lighting and sound systems",
          "mapId": 77,
          "npcName": "Lighting Technician Lena",
          "reward": "Wasteland Fashion Token 3-3",
          "dialogueSuccess": "You've completed objective 3 of Runway Preparation! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Recruit and train wasteland models",
          "mapId": 75,
          "npcName": "Model Trainer Mona",
          "reward": "Wasteland Fashion Token 3-4",
          "dialogueSuccess": "You've completed objective 4 of Runway Preparation! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Promote the event throughout the region",
          "mapId": 76,
          "npcName": "Promoter Pete",
          "reward": "Wasteland Fashion Token 3-5",
          "dialogueSuccess": "You've completed objective 5 of Runway Preparation! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        }
      ]
    },
    {
      "name": "Fashion Show",
      "description": "Fashion Show - Part of the Wasteland Fashion quest line.",
      "objectives": [
        {
          "description": "Coordinate the fashion show schedule",
          "mapId": 75,
          "npcName": "Schedule Coordinator Scott",
          "reward": "Wasteland Fashion Token 4-1",
          "dialogueSuccess": "You've completed objective 1 of Fashion Show! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Manage backstage operations",
          "mapId": 76,
          "npcName": "Backstage Manager Bianca",
          "reward": "Wasteland Fashion Token 4-2",
          "dialogueSuccess": "You've completed objective 2 of Fashion Show! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Host the main event",
          "mapId": 77,
          "npcName": "Event Host Hector",
          "reward": "Wasteland Fashion Token 4-3",
          "dialogueSuccess": "You've completed objective 3 of Fashion Show! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Award prizes to the winners",
          "mapId": 75,
          "npcName": "Prize Presenter Patty",
          "reward": "Wasteland Fashion Token 4-4",
          "dialogueSuccess": "You've completed objective 4 of Fashion Show! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Document designs for the fashion archive",
          "mapId": 76,
          "npcName": "Archivist Archie",
          "reward": "Wasteland Fashion Token 4-5",
          "dialogueSuccess": "You've completed objective 5 of Fashion Show! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        }
      ]
    },
    {
      "name": "Wasteland Boutique",
      "description": "Wasteland Boutique - Part of the Wasteland Fashion quest line.",
      "objectives": [
        {
          "description": "Secure a location for the boutique",
          "mapId": 75,
          "npcName": "Property Agent Penny",
          "reward": "Wasteland Fashion Token 5-1",
          "dialogueSuccess": "You've completed objective 1 of Wasteland Boutique! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Set up display areas and fitting rooms",
          "mapId": 76,
          "npcName": "Interior Designer Ian",
          "reward": "Wasteland Fashion Token 5-2",
          "dialogueSuccess": "You've completed objective 2 of Wasteland Boutique! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Price the fashion pieces appropriately",
          "mapId": 77,
          "npcName": "Pricing Specialist Priya",
          "reward": "Wasteland Fashion Token 5-3",
          "dialogueSuccess": "You've completed objective 3 of Wasteland Boutique! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Train sales associates",
          "mapId": 75,
          "npcName": "Sales Trainer Saul",
          "reward": "Wasteland Fashion Token 5-4",
          "dialogueSuccess": "You've completed objective 4 of Wasteland Boutique! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Host the grand opening",
          "mapId": 76,
          "npcName": "Opening Organizer Olivia",
          "reward": "Wasteland Fashion Token 5-5",
          "dialogueSuccess": "You've completed objective 5 of Wasteland Boutique! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        }
      ]
    }
  ]
};

module.exports = questLine;