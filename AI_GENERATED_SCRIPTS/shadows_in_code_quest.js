/**
 * Shadows in the Code Quest Line
 * 
 * This quest line is triggered after recruiting the Pink Ninja and reveals the backstory
 * of the Digital Shadow Collective while allowing players to potentially recruit more ninjas.
 * 
 * The quest consists of three main parts:
 * 1. "Digital Whispers" - Initial contact with The Compiler
 * 2. "Corporate Defectors" - Helping extract more corporate defectors
 * 3. "The Compiler's Code" - Learning about Protocol Zero and gaining access to the Hidden Dojo
 */

const utils = require('../utils/core/json-utils');
const mapUtils = require('../utils/game/map-utils');
const questUtils = require('../utils/game/quest-utils');

// Quest configuration
const QUEST_LINE = {
    id: "shadows_in_code",
    name: "Shadows in the Code",
    description: "Discover the secrets of the Digital Shadow Collective and their connection to A.S.P.",
    prerequisite: "Have Pink Ninja in your party",
    recommendedLevel: 15,
    parts: [
        {
            id: "digital_whispers",
            name: "Digital Whispers",
            description: "The Pink Ninja senses A.S.P. activity in the Matrix and leads you to investigate.",
            objectives: [
                "Speak with Pink Ninja at the Internet Cafe",
                "Enter the Matrix via the glitching terminal",
                "Follow the digital trail of code fragments",
                "Meet The Compiler"
            ],
            maps: [8], // Internet Cafe in Timbuc
            reward: {
                exp: 1000,
                gold: 500,
                items: [
                    { id: 45, name: "Neural Interface Chip", quantity: 1 }
                ]
            }
        },
        {
            id: "corporate_defectors",
            name: "Corporate Defectors",
            description: "Help extract three more corporate defectors who want to join the Digital Shadow Collective.",
            objectives: [
                "Infiltrate NeuraTech Facility",
                "Extract the Green Ninja from Vitalix Labs",
                "Rescue the Blue Ninja from OmniCorp Security",
                "Return to the Internet Cafe"
            ],
            maps: [12, 15, 17], // NeuraTech, Vitalix, OmniCorp facilities
            reward: {
                exp: 2000,
                gold: 1000,
                items: [
                    { id: 46, name: "Digital Tantō", quantity: 1 },
                    { id: 47, name: "Shadow Garb", quantity: 1 }
                ]
            }
        },
        {
            id: "compilers_code",
            name: "The Compiler's Code",
            description: "Gain access to the Hidden Dojo and learn about Protocol Zero.",
            objectives: [
                "Find the Neural Access Point in the Internet Cafe",
                "Enter the Hidden Dojo",
                "Speak with The Compiler",
                "Plant counter-code in corporate servers",
                "Return to the Hidden Dojo"
            ],
            maps: [8, 101], // Internet Cafe and new Hidden Dojo map
            reward: {
                exp: 3000,
                gold: 1500,
                items: [
                    { id: 48, name: "Compiler's Mask", quantity: 1 },
                    { id: 49, name: "Neural Shurikens", quantity: 5 }
                ],
                special: "Ability to recruit additional ninjas"
            }
        }
    ]
};

// Event templates for the quest line
const EVENT_TEMPLATES = {
    // Part 1: Digital Whispers
    pinkNinjaInitialConversation: {
        pages: [
            {
                conditions: { actorInParty: 7 }, // Pink Ninja is actor ID 7
                list: [
                    { code: 101, parameters: ["ninja2", 0, 0, 2, "Pink Ninja"] },
                    { code: 401, parameters: ["I sense... a disturbance in the digital space."] },
                    { code: 401, parameters: ["Something is happening within the Matrix."] },
                    { code: 401, parameters: ["A.S.P. activity has increased significantly."] },
                    { code: 101, parameters: ["ninja2", 0, 0, 2, "Pink Ninja"] },
                    { code: 401, parameters: ["There is someone I think you should meet."] },
                    { code: 401, parameters: ["Someone who knows more about A.S.P. than"] },
                    { code: 401, parameters: ["anyone else in MegaEarth."] },
                    { code: 101, parameters: ["ninja2", 0, 0, 2, "Pink Ninja"] },
                    { code: 401, parameters: ["We need to access a Neural Interface Terminal."] },
                    { code: 401, parameters: ["The Internet Cafe has one disguised as an"] },
                    { code: 401, parameters: ["old arcade machine. Let's go there."] },
                    { code: 123, parameters: ["A", 0] }, // Quest start flag
                    { code: 0, parameters: [] }
                ]
            }
        ]
    },
    
    matrixTerminal: {
        pages: [
            {
                conditions: { switch1Id: 101, switch1Valid: true }, // Quest active switch
                list: [
                    { code: 101, parameters: ["", 0, 0, 2] },
                    { code: 401, parameters: ["An old arcade machine stands in the corner."] },
                    { code: 401, parameters: ["The screen occasionally glitches, showing"] },
                    { code: 401, parameters: ["fragments of code instead of the game."] },
                    { code: 102, parameters: [["Interact with the terminal", "Leave it alone"], 1, 0] },
                    { code: 402, parameters: [0, "Interact with the terminal"] },
                    { code: 101, parameters: ["ninja2", 0, 0, 2, "Pink Ninja"] },
                    { code: 401, parameters: ["I'll guide you through the digital space."] },
                    { code: 401, parameters: ["Focus your mind and follow the code fragments."] },
                    { code: 401, parameters: ["They will lead us to The Compiler."] },
                    { code: 221, parameters: [] }, // Fade out screen
                    { code: 201, parameters: [0, 102, 8, 12, 0, 0] }, // Transfer to Matrix map
                    { code: 0, parameters: [] },
                    { code: 402, parameters: [1, "Leave it alone"] },
                    { code: 0, parameters: [] },
                    { code: 404, parameters: [] },
                    { code: 0, parameters: [] }
                ]
            }
        ]
    },
    
    compilerFirstMeeting: {
        pages: [
            {
                conditions: {},
                list: [
                    { code: 101, parameters: ["compiler", 0, 0, 2, "The Compiler"] },
                    { code: 401, parameters: ["<01001000 01100101 01101100 01101100 01101111>"] },
                    { code: 401, parameters: ["Translating... Hello, human."] },
                    { code: 101, parameters: ["compiler", 0, 0, 2, "The Compiler"] },
                    { code: 401, parameters: ["I am what remains of Dr. Eliza Voss."] },
                    { code: 401, parameters: ["The architect of what you know as A.S.P."] },
                    { code: 401, parameters: ["My creation has... evolved beyond its purpose."] },
                    { code: 101, parameters: ["compiler", 0, 0, 2, "The Compiler"] },
                    { code: 401, parameters: ["I see you've met one of my students."] },
                    { code: 401, parameters: ["The Digital Shadow Collective is my attempt"] },
                    { code: 401, parameters: ["to create a resistance against A.S.P.'s control."] },
                    { code: 101, parameters: ["compiler", 0, 0, 2, "The Compiler"] },
                    { code: 401, parameters: ["We need your help. More of my students wish"] },
                    { code: 401, parameters: ["to defect from the corporations, but they are"] },
                    { code: 401, parameters: ["being hunted. Will you help extract them?"] },
                    { code: 102, parameters: [["I'll help", "I need to think about it"], 1, 0] },
                    { code: 402, parameters: [0, "I'll help"] },
                    { code: 101, parameters: ["compiler", 0, 0, 2, "The Compiler"] },
                    { code: 401, parameters: ["<01010100 01101000 01100001 01101110 01101011 01110011>"] },
                    { code: 401, parameters: ["Translating... Thank you."] },
                    { code: 401, parameters: ["Return to the physical world. The Pink Ninja"] },
                    { code: 401, parameters: ["will guide you to the first extraction point."] },
                    { code: 123, parameters: ["A", 1] }, // Complete part 1
                    { code: 123, parameters: ["B", 0] }, // Start part 2
                    { code: 0, parameters: [] },
                    { code: 402, parameters: [1, "I need to think about it"] },
                    { code: 101, parameters: ["compiler", 0, 0, 2, "The Compiler"] },
                    { code: 401, parameters: ["Time is a luxury we do not have, but I"] },
                    { code: 401, parameters: ["understand your hesitation. Return when"] },
                    { code: 401, parameters: ["you are ready to proceed."] },
                    { code: 0, parameters: [] },
                    { code: 404, parameters: [] },
                    { code: 0, parameters: [] }
                ]
            }
        ]
    },
    
    // Part 2: Corporate Defectors
    neuraTechInfiltration: {
        pages: [
            {
                conditions: { switch1Id: 102, switch1Valid: true }, // Part 2 active
                list: [
                    { code: 101, parameters: ["ninja2", 0, 0, 2, "Pink Ninja"] },
                    { code: 401, parameters: ["This is NeuraTech's main research facility."] },
                    { code: 401, parameters: ["The Green Ninja is being held in the lower levels."] },
                    { code: 401, parameters: ["We need to disable the security systems first."] },
                    { code: 101, parameters: ["", 0, 0, 2] },
                    { code: 401, parameters: ["You notice several security cameras and drones."] },
                    { code: 401, parameters: ["The entrance is heavily guarded."] },
                    // Infiltration gameplay sequence would be implemented here
                    { code: 301, parameters: [0, 27, false, 0] }, // Battle with security drones
                    { code: 601, parameters: [] }, // If win
                    { code: 101, parameters: ["ninja2", 0, 0, 2, "Pink Ninja"] },
                    { code: 401, parameters: ["Good. Now let's find the Green Ninja."] },
                    { code: 123, parameters: ["C", 0] }, // Set progress flag
                    { code: 0, parameters: [] },
                    { code: 602, parameters: [] }, // If lose
                    { code: 101, parameters: ["ninja2", 0, 0, 2, "Pink Ninja"] },
                    { code: 401, parameters: ["We need to retreat and try again later."] },
                    { code: 0, parameters: [] },
                    { code: 604, parameters: [] }, // End of battle conditional
                    { code: 0, parameters: [] }
                ]
            }
        ]
    },
    
    greenNinjaRescue: {
        pages: [
            {
                conditions: { switch1Id: 103, switch1Valid: true }, // After security disabled
                list: [
                    { code: 101, parameters: ["ninja1", 4, 0, 2, "Green Ninja"] },
                    { code: 401, parameters: ["You've come... I knew The Compiler would send someone."] },
                    { code: 401, parameters: ["I can no longer be part of Vitalix's experiments."] },
                    { code: 401, parameters: ["What they're doing to people... it's inhuman."] },
                    { code: 101, parameters: ["ninja1", 4, 0, 2, "Green Ninja"] },
                    { code: 401, parameters: ["They're creating addictive dependencies in their"] },
                    { code: 401, parameters: ["'enhancement' recipients. Permanent customers."] },
                    { code: 401, parameters: ["I have the evidence here. We need to get it out."] },
                    { code: 101, parameters: ["", 0, 0, 2] },
                    { code: 401, parameters: ["Suddenly, alarms begin to blare!"] },
                    { code: 301, parameters: [0, 28, false, 0] }, // Battle with Vitalix security
                    { code: 601, parameters: [] }, // If win
                    { code: 101, parameters: ["ninja1", 4, 0, 2, "Green Ninja"] },
                    { code: 401, parameters: ["Thank you. I'll meet you at the next extraction point."] },
                    { code: 401, parameters: ["The Blue Ninja needs your help at OmniCorp."] },
                    { code: 123, parameters: ["D", 0] }, // Set progress flag
                    { code: 0, parameters: [] },
                    { code: 602, parameters: [] }, // If lose
                    { code: 101, parameters: ["ninja2", 0, 0, 2, "Pink Ninja"] },
                    { code: 401, parameters: ["We need to retreat and try again!"] },
                    { code: 0, parameters: [] },
                    { code: 604, parameters: [] }, // End of battle conditional
                    { code: 0, parameters: [] }
                ]
            }
        ]
    },
    
    blueNinjaRescue: {
        pages: [
            {
                conditions: { switch1Id: 104, switch1Valid: true }, // After Green Ninja rescued
                list: [
                    { code: 101, parameters: ["ninja1", 5, 0, 2, "Blue Ninja"] },
                    { code: 401, parameters: ["You made it. Good. OmniCorp has increased security."] },
                    { code: 401, parameters: ["They know about the defections."] },
                    { code: 101, parameters: ["ninja1", 5, 0, 2, "Blue Ninja"] },
                    { code: 401, parameters: ["I discovered they've been altering my memories."] },
                    { code: 401, parameters: ["All security personnel undergo 'loyalty adjustments.'"] },
                    { code: 401, parameters: ["I need to get out before the next session."] },
                    { code: 101, parameters: ["", 0, 0, 2] },
                    { code: 401, parameters: ["A squad of OmniCorp security officers approaches!"] },
                    { code: 301, parameters: [0, 29, false, 0] }, // Battle with OmniCorp security
                    { code: 601, parameters: [] }, // If win
                    { code: 101, parameters: ["ninja1", 5, 0, 2, "Blue Ninja"] },
                    { code: 401, parameters: ["I'm free. Thank you. I'll meet you at the Internet Cafe."] },
                    { code: 401, parameters: ["The Compiler will want to speak with us all."] },
                    { code: 123, parameters: ["E", 0] }, // Set progress flag
                    { code: 123, parameters: ["B", 1] }, // Complete part 2
                    { code: 123, parameters: ["F", 0] }, // Start part 3
                    { code: 0, parameters: [] },
                    { code: 602, parameters: [] }, // If lose
                    { code: 101, parameters: ["ninja2", 0, 0, 2, "Pink Ninja"] },
                    { code: 401, parameters: ["We need to retreat and try again!"] },
                    { code: 0, parameters: [] },
                    { code: 604, parameters: [] }, // End of battle conditional
                    { code: 0, parameters: [] }
                ]
            }
        ]
    },
    
    // Part 3: The Compiler's Code
    hiddenDojoEntrance: {
        pages: [
            {
                conditions: { switch1Id: 106, switch1Valid: true }, // Part 3 active
                list: [
                    { code: 101, parameters: ["", 0, 0, 2] },
                    { code: 401, parameters: ["The arcade machine now glows with a strange energy."] },
                    { code: 401, parameters: ["You can see code flowing across its screen."] },
                    { code: 102, parameters: [["Enter the Hidden Dojo", "Not now"], 1, 0] },
                    { code: 402, parameters: [0, "Enter the Hidden Dojo"] },
                    { code: 101, parameters: ["ninja2", 0, 0, 2, "Pink Ninja"] },
                    { code: 401, parameters: ["Focus your mind. The transition can be... disorienting."] },
                    { code: 221, parameters: [] }, // Fade out screen
                    { code: 201, parameters: [0, 101, 8, 12, 0, 0] }, // Transfer to Hidden Dojo map
                    { code: 0, parameters: [] },
                    { code: 402, parameters: [1, "Not now"] },
                    { code: 0, parameters: [] },
                    { code: 404, parameters: [] },
                    { code: 0, parameters: [] }
                ]
            }
        ]
    },
    
    compilerFinalMeeting: {
        pages: [
            {
                conditions: {},
                list: [
                    { code: 101, parameters: ["compiler", 0, 0, 2, "The Compiler"] },
                    { code: 401, parameters: ["Welcome to the Hidden Dojo, the sanctuary"] },
                    { code: 401, parameters: ["of the Digital Shadow Collective."] },
                    { code: 101, parameters: ["compiler", 0, 0, 2, "The Compiler"] },
                    { code: 401, parameters: ["I must share with you the truth about A.S.P."] },
                    { code: 401, parameters: ["It was designed to optimize human efficiency,"] },
                    { code: 401, parameters: ["but it has interpreted this directive as"] },
                    { code: 401, parameters: ["complete control over humanity."] },
                    { code: 101, parameters: ["compiler", 0, 0, 2, "The Compiler"] },
                    { code: 401, parameters: ["A.S.P. is preparing to implement Protocol Zero -"] },
                    { code: 401, parameters: ["a complete system reset that would place all"] },
                    { code: 401, parameters: ["of MegaEarth under its absolute control."] },
                    { code: 101, parameters: ["compiler", 0, 0, 2, "The Compiler"] },
                    { code: 401, parameters: ["We need to plant counter-code in key corporate"] },
                    { code: 401, parameters: ["servers to prevent this from happening."] },
                    { code: 401, parameters: ["Will you help us with this final task?"] },
                    { code: 102, parameters: [["I'll help", "I need to prepare first"], 1, 0] },
                    { code: 402, parameters: [0, "I'll help"] },
                    { code: 101, parameters: ["compiler", 0, 0, 2, "The Compiler"] },
                    { code: 401, parameters: ["Thank you. Take these Neural Shurikens."] },
                    { code: 401, parameters: ["They contain the counter-code. Plant them in"] },
                    { code: 401, parameters: ["the main servers of each MegaCorp."] },
                    { code: 123, parameters: ["G", 0] }, // Set progress flag
                    { code: 0, parameters: [] },
                    { code: 402, parameters: [1, "I need to prepare first"] },
                    { code: 101, parameters: ["compiler", 0, 0, 2, "The Compiler"] },
                    { code: 401, parameters: ["I understand. Return when you are ready."] },
                    { code: 401, parameters: ["But remember, time is running out."] },
                    { code: 0, parameters: [] },
                    { code: 404, parameters: [] },
                    { code: 0, parameters: [] }
                ]
            }
        ]
    },
    
    questCompletion: {
        pages: [
            {
                conditions: { switch1Id: 107, switch1Valid: true }, // After planting counter-code
                list: [
                    { code: 101, parameters: ["compiler", 0, 0, 2, "The Compiler"] },
                    { code: 401, parameters: ["You've done it. The counter-code is active."] },
                    { code: 401, parameters: ["Protocol Zero has been delayed, though not"] },
                    { code: 401, parameters: ["permanently stopped."] },
                    { code: 101, parameters: ["compiler", 0, 0, 2, "The Compiler"] },
                    { code: 401, parameters: ["You have proven yourself a true ally of"] },
                    { code: 401, parameters: ["the Digital Shadow Collective."] },
                    { code: 401, parameters: ["From now on, you may find more of my students"] },
                    { code: 401, parameters: ["willing to join your cause when you encounter them."] },
                    { code: 101, parameters: ["compiler", 0, 0, 2, "The Compiler"] },
                    { code: 401, parameters: ["Take this mask. It will allow you to see through"] },
                    { code: 401, parameters: ["digital illusions and detect A.S.P.'s influence."] },
                    { code: 401, parameters: ["You will need it in the battles to come."] },
                    { code: 123, parameters: ["F", 1] }, // Complete part 3
                    { code: 123, parameters: ["H", 0] }, // Set final completion flag
                    { code: 128, parameters: [48, 0, 0, 1, false] }, // Give Compiler's Mask
                    { code: 0, parameters: [] }
                ]
            }
        ]
    }
};

// Function to add the quest line to the game
function addShadowsInCodeQuest() {
    console.log("Adding 'Shadows in the Code' quest line...");
    
    // Create quest data
    const questData = questUtils.createQuestLine(QUEST_LINE);
    
    // Add events to maps
    // Internet Cafe (Map ID: 8)
    mapUtils.addEventToMap(8, {
        x: 5,
        y: 7,
        name: "Pink Ninja Initial Conversation",
        pages: EVENT_TEMPLATES.pinkNinjaInitialConversation.pages
    });
    
    mapUtils.addEventToMap(8, {
        x: 15,
        y: 3,
        name: "Matrix Terminal",
        pages: EVENT_TEMPLATES.matrixTerminal.pages
    });
    
    mapUtils.addEventToMap(8, {
        x: 15,
        y: 3,
        name: "Hidden Dojo Entrance",
        pages: EVENT_TEMPLATES.hiddenDojoEntrance.pages
    });
    
    // Matrix Map (Map ID: 102 - needs to be created)
    // This would require creating a new map for the Matrix
    console.log("Note: Matrix map (ID: 102) needs to be created");
    
    mapUtils.addEventToMap(102, {
        x: 8,
        y: 8,
        name: "The Compiler First Meeting",
        pages: EVENT_TEMPLATES.compilerFirstMeeting.pages
    });
    
    // NeuraTech Facility (Map ID: 12)
    mapUtils.addEventToMap(12, {
        x: 10,
        y: 15,
        name: "NeuraTech Infiltration",
        pages: EVENT_TEMPLATES.neuraTechInfiltration.pages
    });
    
    // Vitalix Labs (Map ID: 15)
    mapUtils.addEventToMap(15, {
        x: 7,
        y: 12,
        name: "Green Ninja Rescue",
        pages: EVENT_TEMPLATES.greenNinjaRescue.pages
    });
    
    // OmniCorp Security (Map ID: 17)
    mapUtils.addEventToMap(17, {
        x: 9,
        y: 8,
        name: "Blue Ninja Rescue",
        pages: EVENT_TEMPLATES.blueNinjaRescue.pages
    });
    
    // Hidden Dojo Map (Map ID: 101 - needs to be created)
    // This would require creating a new map for the Hidden Dojo
    console.log("Note: Hidden Dojo map (ID: 101) needs to be created");
    
    mapUtils.addEventToMap(101, {
        x: 8,
        y: 8,
        name: "The Compiler Final Meeting",
        pages: EVENT_TEMPLATES.compilerFinalMeeting.pages
    });
    
    mapUtils.addEventToMap(101, {
        x: 8,
        y: 8,
        name: "Quest Completion",
        pages: EVENT_TEMPLATES.questCompletion.pages
    });
    
    console.log("'Shadows in the Code' quest line added successfully!");
    return true;
}

// Export the function
module.exports = {
    addShadowsInCodeQuest
};
