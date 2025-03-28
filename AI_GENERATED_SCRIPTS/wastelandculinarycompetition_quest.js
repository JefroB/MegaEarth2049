// Wasteland Culinary Competition Quest Line
const questLine = {
  "name": "Wasteland Culinary Competition",
  "description": "Organize and participate in a post-apocalyptic cooking competition using mutated ingredients and improvised cooking methods.",
  "startingNPC": {
    "name": "Chef Chaos",
    "appearance": "A burly person wearing a stained chef's hat and an apron made from leather scraps, with various cooking utensils hanging from a tool belt and a flamethrower modified to work as a cooking torch.",
    "personality": "Passionate and intense about food, prone to dramatic outbursts when discussing flavors, and constantly tasting things from the environment.",
    "dialogueIntro": "You call that food? *spits* The wasteland deserves better! We've survived the apocalypse, but our taste buds are dying of boredom! Help me organize the greatest culinary showdown the ruins have ever seen!"
  },
  "startingMap": 125,
  "quests": [
    {
      "name": "Ingredient Gathering",
      "description": "Ingredient Gathering - Part of the Wasteland Culinary Competition quest line.",
      "objectives": [
        {
          "description": "Collect rare mutated vegetables from the toxic gardens",
          "mapId": 125,
          "npcName": "Vegetable Vendor Vera",
          "reward": "Wasteland Culinary Competition Token 1-1",
          "dialogueSuccess": "You've completed objective 1 of Ingredient Gathering! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Hunt exotic irradiated game animals",
          "mapId": 126,
          "npcName": "Hunter Hank",
          "reward": "Wasteland Culinary Competition Token 1-2",
          "dialogueSuccess": "You've completed objective 2 of Ingredient Gathering! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Harvest unusual fungi from the underground caverns",
          "mapId": 127,
          "npcName": "Fungi Forager Fiona",
          "reward": "Wasteland Culinary Competition Token 1-3",
          "dialogueSuccess": "You've completed objective 3 of Ingredient Gathering! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Gather preserved pre-war spices from abandoned stores",
          "mapId": 125,
          "npcName": "Spice Seeker Sam",
          "reward": "Wasteland Culinary Competition Token 1-4",
          "dialogueSuccess": "You've completed objective 4 of Ingredient Gathering! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Source clean water from the hidden spring",
          "mapId": 126,
          "npcName": "Water Warden Wendy",
          "reward": "Wasteland Culinary Competition Token 1-5",
          "dialogueSuccess": "You've completed objective 5 of Ingredient Gathering! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        }
      ]
    },
    {
      "name": "Kitchen Construction",
      "description": "Kitchen Construction - Part of the Wasteland Culinary Competition quest line.",
      "objectives": [
        {
          "description": "Salvage cooking equipment from ruined restaurants",
          "mapId": 125,
          "npcName": "Salvage Specialist Sid",
          "reward": "Wasteland Culinary Competition Token 2-1",
          "dialogueSuccess": "You've completed objective 1 of Kitchen Construction! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Build improvised cooking stations",
          "mapId": 126,
          "npcName": "Station Builder Bob",
          "reward": "Wasteland Culinary Competition Token 2-2",
          "dialogueSuccess": "You've completed objective 2 of Kitchen Construction! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Set up a water purification system for the kitchen",
          "mapId": 127,
          "npcName": "Purification Expert Penny",
          "reward": "Wasteland Culinary Competition Token 2-3",
          "dialogueSuccess": "You've completed objective 3 of Kitchen Construction! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Construct a generator for powering appliances",
          "mapId": 125,
          "npcName": "Generator Guru Greg",
          "reward": "Wasteland Culinary Competition Token 2-4",
          "dialogueSuccess": "You've completed objective 4 of Kitchen Construction! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Create a dining area for judges and audience",
          "mapId": 126,
          "npcName": "Dining Designer Dana",
          "reward": "Wasteland Culinary Competition Token 2-5",
          "dialogueSuccess": "You've completed objective 5 of Kitchen Construction! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        }
      ]
    },
    {
      "name": "Contestant Recruitment",
      "description": "Contestant Recruitment - Part of the Wasteland Culinary Competition quest line.",
      "objectives": [
        {
          "description": "Recruit skilled cooks from different settlements",
          "mapId": 125,
          "npcName": "Recruiter Rita",
          "reward": "Wasteland Culinary Competition Token 3-1",
          "dialogueSuccess": "You've completed objective 1 of Contestant Recruitment! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Find judges with refined palates",
          "mapId": 126,
          "npcName": "Judge Selector Jared",
          "reward": "Wasteland Culinary Competition Token 3-2",
          "dialogueSuccess": "You've completed objective 2 of Contestant Recruitment! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Enlist assistants for the competition",
          "mapId": 127,
          "npcName": "Assistant Arranger Amy",
          "reward": "Wasteland Culinary Competition Token 3-3",
          "dialogueSuccess": "You've completed objective 3 of Contestant Recruitment! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Convince settlement leaders to send representatives",
          "mapId": 125,
          "npcName": "Settlement Liaison Liam",
          "reward": "Wasteland Culinary Competition Token 3-4",
          "dialogueSuccess": "You've completed objective 4 of Contestant Recruitment! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Recruit an announcer for the event",
          "mapId": 126,
          "npcName": "Announcer Recruiter Randy",
          "reward": "Wasteland Culinary Competition Token 3-5",
          "dialogueSuccess": "You've completed objective 5 of Contestant Recruitment! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        }
      ]
    },
    {
      "name": "Challenge Design",
      "description": "Challenge Design - Part of the Wasteland Culinary Competition quest line.",
      "objectives": [
        {
          "description": "Design the appetizer challenge",
          "mapId": 125,
          "npcName": "Challenge Creator Cora",
          "reward": "Wasteland Culinary Competition Token 4-1",
          "dialogueSuccess": "You've completed objective 1 of Challenge Design! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Create the main course competition rules",
          "mapId": 126,
          "npcName": "Rules Writer Ryan",
          "reward": "Wasteland Culinary Competition Token 4-2",
          "dialogueSuccess": "You've completed objective 2 of Challenge Design! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Develop the dessert contest parameters",
          "mapId": 127,
          "npcName": "Dessert Designer Daisy",
          "reward": "Wasteland Culinary Competition Token 4-3",
          "dialogueSuccess": "You've completed objective 3 of Challenge Design! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Establish judging criteria",
          "mapId": 125,
          "npcName": "Criteria Creator Carl",
          "reward": "Wasteland Culinary Competition Token 4-4",
          "dialogueSuccess": "You've completed objective 4 of Challenge Design! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Set up the competition schedule",
          "mapId": 126,
          "npcName": "Schedule Setter Seth",
          "reward": "Wasteland Culinary Competition Token 4-5",
          "dialogueSuccess": "You've completed objective 5 of Challenge Design! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        }
      ]
    },
    {
      "name": "Grand Finale",
      "description": "Grand Finale - Part of the Wasteland Culinary Competition quest line.",
      "objectives": [
        {
          "description": "Prepare the venue for the final competition",
          "mapId": 125,
          "npcName": "Venue Preparer Vince",
          "reward": "Wasteland Culinary Competition Token 5-1",
          "dialogueSuccess": "You've completed objective 1 of Grand Finale! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Coordinate the contestants and judges",
          "mapId": 126,
          "npcName": "Contestant Coordinator Cindy",
          "reward": "Wasteland Culinary Competition Token 5-2",
          "dialogueSuccess": "You've completed objective 2 of Grand Finale! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Manage the audience and security",
          "mapId": 127,
          "npcName": "Security Chief Shane",
          "reward": "Wasteland Culinary Competition Token 5-3",
          "dialogueSuccess": "You've completed objective 3 of Grand Finale! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Oversee the final cooking battle",
          "mapId": 125,
          "npcName": "Battle Overseer Owen",
          "reward": "Wasteland Culinary Competition Token 5-4",
          "dialogueSuccess": "You've completed objective 4 of Grand Finale! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        },
        {
          "description": "Award prizes to the winners",
          "mapId": 126,
          "npcName": "Prize Presenter Patty",
          "reward": "Wasteland Culinary Competition Token 5-5",
          "dialogueSuccess": "You've completed objective 5 of Grand Finale! Here's your reward.",
          "dialogueFailure": "You haven't completed the objective yet. Keep trying!"
        }
      ]
    }
  ]
};

module.exports = questLine;