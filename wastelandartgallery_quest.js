// Wasteland Art Gallery Quest Line
const questLine = {
  "name": "Wasteland Art Gallery",
  "description": "Establish an art gallery showcasing post-apocalyptic artwork and preserving artistic expression in the wasteland.",
  "startingNPC": {
    "name": "Curator Chaos",
    "appearance": "A slender person wearing a patchwork suit made from museum banners, with glasses frames that hold different colored lenses, and hair styled to resemble famous sculptures.",
    "personality": "Passionate and eccentric about art, speaks in flowery language full of artistic references, and dramatically poses when making important points.",
    "dialogueIntro": "Darling, the apocalypse is no excuse for cultural barbarism! *strikes a pose* Art must survive! Help me create a gallery to showcase the wasteland's creative renaissance, and we shall bring beauty back to this broken world!"
  },
  "startingMap": 140,
  "quests": [
    {
      "name": "Gallery Establishment",
      "description": "Gallery Establishment - Part of the Wasteland Art Gallery quest line.",
      "objectives": [
        {
          "description": "Secure a suitable building for the gallery",
          "mapId": 140,
          "npcName": "Building Securer Benny",
          "reward": "Wasteland Art Gallery Token 1-1",
          "dialogueSuccess": "You've completed objective 1 of Gallery Establishment! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Reinforce the structure against the elements",
          "mapId": 141,
          "npcName": "Structural Engineer Stella",
          "reward": "Wasteland Art Gallery Token 1-2",
          "dialogueSuccess": "You've completed objective 2 of Gallery Establishment! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Create display spaces and lighting",
          "mapId": 142,
          "npcName": "Display Designer Donna",
          "reward": "Wasteland Art Gallery Token 1-3",
          "dialogueSuccess": "You've completed objective 3 of Gallery Establishment! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Establish security measures for the artwork",
          "mapId": 140,
          "npcName": "Security Expert Sam",
          "reward": "Wasteland Art Gallery Token 1-4",
          "dialogueSuccess": "You've completed objective 4 of Gallery Establishment! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Design the gallery layout and flow",
          "mapId": 141,
          "npcName": "Layout Planner Larry",
          "reward": "Wasteland Art Gallery Token 1-5",
          "dialogueSuccess": "You've completed objective 5 of Gallery Establishment! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        }
      ]
    },
    {
      "name": "Art Collection",
      "description": "Art Collection - Part of the Wasteland Art Gallery quest line.",
      "objectives": [
        {
          "description": "Recover pre-war artwork from ruins",
          "mapId": 140,
          "npcName": "Art Recoverer Rita",
          "reward": "Wasteland Art Gallery Token 2-1",
          "dialogueSuccess": "You've completed objective 1 of Art Collection! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Collect contemporary wasteland paintings",
          "mapId": 141,
          "npcName": "Painting Collector Pablo",
          "reward": "Wasteland Art Gallery Token 2-2",
          "dialogueSuccess": "You've completed objective 2 of Art Collection! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Gather sculptural works made from scrap",
          "mapId": 142,
          "npcName": "Sculpture Gatherer Gina",
          "reward": "Wasteland Art Gallery Token 2-3",
          "dialogueSuccess": "You've completed objective 3 of Art Collection! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Source digital art from surviving technology",
          "mapId": 140,
          "npcName": "Digital Archivist Dexter",
          "reward": "Wasteland Art Gallery Token 2-4",
          "dialogueSuccess": "You've completed objective 4 of Art Collection! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Acquire performance art documentation",
          "mapId": 141,
          "npcName": "Performance Documenter Penny",
          "reward": "Wasteland Art Gallery Token 2-5",
          "dialogueSuccess": "You've completed objective 5 of Art Collection! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        }
      ]
    },
    {
      "name": "Exhibition Design",
      "description": "Exhibition Design - Part of the Wasteland Art Gallery quest line.",
      "objectives": [
        {
          "description": "Design the main exhibition space",
          "mapId": 140,
          "npcName": "Exhibition Designer Eva",
          "reward": "Wasteland Art Gallery Token 3-1",
          "dialogueSuccess": "You've completed objective 1 of Exhibition Design! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Create informative display plaques",
          "mapId": 141,
          "npcName": "Plaque Writer Paul",
          "reward": "Wasteland Art Gallery Token 3-2",
          "dialogueSuccess": "You've completed objective 2 of Exhibition Design! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Develop thematic organization for the artwork",
          "mapId": 142,
          "npcName": "Theme Organizer Tina",
          "reward": "Wasteland Art Gallery Token 3-3",
          "dialogueSuccess": "You've completed objective 3 of Exhibition Design! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Build specialized display cases",
          "mapId": 140,
          "npcName": "Case Builder Bob",
          "reward": "Wasteland Art Gallery Token 3-4",
          "dialogueSuccess": "You've completed objective 4 of Exhibition Design! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Set up proper lighting for each piece",
          "mapId": 141,
          "npcName": "Lighting Technician Lucy",
          "reward": "Wasteland Art Gallery Token 3-5",
          "dialogueSuccess": "You've completed objective 5 of Exhibition Design! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        }
      ]
    },
    {
      "name": "Artist Recruitment",
      "description": "Artist Recruitment - Part of the Wasteland Art Gallery quest line.",
      "objectives": [
        {
          "description": "Find painters working in the wasteland",
          "mapId": 140,
          "npcName": "Painter Finder Fiona",
          "reward": "Wasteland Art Gallery Token 4-1",
          "dialogueSuccess": "You've completed objective 1 of Artist Recruitment! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Recruit sculptors using scrap materials",
          "mapId": 141,
          "npcName": "Sculptor Recruiter Scott",
          "reward": "Wasteland Art Gallery Token 4-2",
          "dialogueSuccess": "You've completed objective 2 of Artist Recruitment! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Discover performance artists",
          "mapId": 142,
          "npcName": "Performance Scout Patty",
          "reward": "Wasteland Art Gallery Token 4-3",
          "dialogueSuccess": "You've completed objective 3 of Artist Recruitment! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Locate digital artists with working technology",
          "mapId": 140,
          "npcName": "Digital Artist Locator Dana",
          "reward": "Wasteland Art Gallery Token 4-4",
          "dialogueSuccess": "You've completed objective 4 of Artist Recruitment! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Commission new works for the gallery",
          "mapId": 141,
          "npcName": "Commission Coordinator Carl",
          "reward": "Wasteland Art Gallery Token 4-5",
          "dialogueSuccess": "You've completed objective 5 of Artist Recruitment! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        }
      ]
    },
    {
      "name": "Opening Gala",
      "description": "Opening Gala - Part of the Wasteland Art Gallery quest line.",
      "objectives": [
        {
          "description": "Create and distribute invitations",
          "mapId": 140,
          "npcName": "Invitation Designer Irene",
          "reward": "Wasteland Art Gallery Token 5-1",
          "dialogueSuccess": "You've completed objective 1 of Opening Gala! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Prepare refreshments for the opening",
          "mapId": 141,
          "npcName": "Refreshment Preparer Rachel",
          "reward": "Wasteland Art Gallery Token 5-2",
          "dialogueSuccess": "You've completed objective 2 of Opening Gala! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Organize an opening night performance",
          "mapId": 142,
          "npcName": "Performance Organizer Oscar",
          "reward": "Wasteland Art Gallery Token 5-3",
          "dialogueSuccess": "You've completed objective 3 of Opening Gala! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Coordinate gallery tours and explanations",
          "mapId": 140,
          "npcName": "Tour Guide Tara",
          "reward": "Wasteland Art Gallery Token 5-4",
          "dialogueSuccess": "You've completed objective 4 of Opening Gala! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Document the event for wasteland history",
          "mapId": 141,
          "npcName": "Event Documenter Darren",
          "reward": "Wasteland Art Gallery Token 5-5",
          "dialogueSuccess": "You've completed objective 5 of Opening Gala! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        }
      ]
    }
  ]
};

module.exports = questLine;