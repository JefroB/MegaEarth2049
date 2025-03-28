// Level 38-40 Side Quests for MegaEarth 2049
// This file contains the side quest data for levels 38, 39, and 40

/*
 * Side Quest: "Quantum Entanglement Dating Service"
 * 
 * Location: Quantum Dynamics Facility (Map110)
 * 
 * Quest Overview: 
 * Professor Paradox's assistant has been running a side business using the quantum technology 
 * to match people with their alternate selves from parallel dimensions for "self-love" therapy. 
 * However, some clients have become "too attached" to their alternate selves, causing quantum 
 * entanglement issues.
 * 
 * Key NPCs:
 * - Professor Paradox's Assistant (quest giver)
 * - Entangled Clients (quest objectives)
 * - Quantum Disentanglement Device (quest item)
 * 
 * Quest Flow:
 * 1. Player meets Professor Paradox's Assistant who explains the situation
 * 2. Player agrees to help disentangle the clients from their alternate selves
 * 3. Player must find three entangled clients throughout the facility
 * 4. Player uses a quantum disentanglement device on each client
 * 5. Player collects data on the psychological effects of self-romance
 * 6. Player returns to the assistant with the findings
 * 7. The assistant rewards the player with a Quantum Mirror and Dimensional Insight
 */

// Professor Paradox's Assistant NPC (Quest Giver)
const paradoxAssistant = {
    name: "Professor Paradox's Assistant",
    mapId: 110, // Quantum Dynamics Facility
    x: 15,
    y: 8,
    appearance: "Actor2", // Character sprite sheet
    index: 5, // Index in the sprite sheet
    
    // Initial dialogue
    initialDialogue: [
        "*The assistant nervously checks over her shoulder*",
        "Oh! You startled me. I'm just... conducting some independent research.",
        "Nothing to do with Professor Paradox's work. Completely separate.",
        "*She sighs*",
        "Look, I might as well tell you. I've been using the quantum technology",
        "to run a dating service. But not just any dating service..."
    ],
    
    // Quest acceptance dialogue
    questDialogue: [
        "I call it 'Self-Love Therapy.' I use the quantum tech to connect people",
        "with versions of themselves from parallel dimensions.",
        "The theory was sound! Who better to understand you than... well, you?",
        "But some clients have become too attached to their alternate selves.",
        "They're becoming quantum entangled, and it's causing serious problems.",
        "I need your help to find these clients and use this disentanglement device",
        "to separate them before Professor Paradox finds out.",
        "*She hands you a small device with blinking lights*",
        "Oh, and if you could collect some psychological data while you're at it,",
        "that would be great for my research paper."
    ],
    
    // Dialogue when player returns but hasn't found all entangled clients
    waitingDialogue: [
        "Have you found all the entangled clients yet?",
        "There should be three of them scattered around the facility.",
        "You'll recognize them by their slightly transparent appearance",
        "and the way they keep talking to someone who isn't there.",
        "Please hurry! If Professor Paradox discovers what I've done,",
        "I'll lose my research position for sure."
    ],
    
    // Dialogue when player has disentangled all clients
    completionDialogue: [
        "You've disentangled all the clients? Thank goodness!",
        "*She eagerly takes the psychological data you've collected*",
        "This is fascinating! Despite the entanglement issues,",
        "the therapy showed remarkable success rates in treating self-esteem issues.",
        "With some refinements to prevent quantum entanglement,",
        "this could revolutionize therapeutic approaches!",
        "Here, take this Quantum Mirror as a token of my gratitude.",
        "It occasionally summons a temporary clone to assist you in battle.",
        "And I've also uploaded a Dimensional Insight subroutine to your neural interface.",
        "It should help you perceive weak points more effectively."
    ],
    
    // Dialogue after completing the quest
    postQuestDialogue: [
        "I've refined my Self-Love Therapy protocols based on your data.",
        "No more quantum entanglement issues!",
        "Professor Paradox still doesn't know about my side business,",
        "but I'm thinking of presenting it as a legitimate research project soon.",
        "After all, the results are quite promising!"
    ]
};

// Entangled Client 1
const entangledClient1 = {
    name: "Entangled Client 1",
    mapId: 110, // Quantum Dynamics Facility
    x: 8,
    y: 12,
    appearance: "Actor1", // Character sprite sheet
    index: 0, // Index in the sprite sheet
    
    // Dialogue when player interacts with the client
    initialDialogue: [
        "*The person appears slightly transparent, as if not fully present in this reality*",
        "Oh, hello! Don't mind me, I'm just having a conversation with myself.",
        "*They turn to empty space beside them*",
        "No, not in the crazy way! I mean literally myself. From another dimension.",
        "*They sigh dreamily*",
        "We have so much in common. It's like they really get me, you know?"
    ],
    
    // Dialogue when player uses the disentanglement device
    disentanglementDialogue: [
        "*You activate the quantum disentanglement device*",
        "*The client's form becomes more solid as the connection is severed*",
        "Wait, what are you doing? No! We were in the middle of planning our future together!",
        "*They look around, confused*",
        "Where did they go? I feel... strangely empty now.",
        "But also more... present? Like I'm fully here for the first time in weeks.",
        "*They look thoughtful*",
        "Maybe it was getting unhealthy. I was starting to neglect my friends in this dimension.",
        "I suppose I should focus on loving myself in this reality first.",
        "*You collect psychological data on their experience*"
    ]
};

// Entangled Client 2
const entangledClient2 = {
    name: "Entangled Client 2",
    mapId: 110, // Quantum Dynamics Facility
    x: 20,
    y: 15,
    appearance: "Actor1", // Character sprite sheet
    index: 3, // Index in the sprite sheet
    
    // Dialogue when player interacts with the client
    initialDialogue: [
        "*This person is flickering in and out of reality, sometimes appearing in different clothing*",
        "Have you ever wondered what you'd be like if you made different choices?",
        "*Their appearance shifts slightly*",
        "I don't have to wonder anymore. I know exactly what I'd be like.",
        "*They laugh at something you can't hear*",
        "Sorry, they just told a joke. It's weird, we have the same sense of humor,",
        "but somehow they're funnier. I think I'm in love with myself."
    ],
    
    // Dialogue when player uses the disentanglement device
    disentanglementDialogue: [
        "*You activate the quantum disentanglement device*",
        "*The client stops flickering and stabilizes in one form*",
        "Hey! What did you just do? The connection... it's gone!",
        "*They look disappointed, then relieved*",
        "Actually, my head feels clearer now. I was starting to lose track of which memories",
        "were mine and which were theirs. Our thoughts were becoming entangled.",
        "It was fascinating, but... probably dangerous.",
        "I should probably stick to regular dating for a while.",
        "*You collect psychological data on their experience*"
    ]
};

// Entangled Client 3
const entangledClient3 = {
    name: "Entangled Client 3",
    mapId: 110, // Quantum Dynamics Facility
    x: 12,
    y: 20,
    appearance: "Actor1", // Character sprite sheet
    index: 7, // Index in the sprite sheet
    
    // Dialogue when player interacts with the client
    initialDialogue: [
        "*This person is surrounded by a faint quantum aura, with multiple shadowy versions of themselves visible*",
        "Have you met the assistant? Brilliant woman. Her therapy is revolutionary.",
        "*They gesture to the multiple shadows around them*",
        "I'm not just dating one alternate self. I'm dating FIVE!",
        "*The shadows shift and move independently*",
        "We're planning to find a way to merge our realities permanently.",
        "Why limit yourself to one existence when you can experience many simultaneously?"
    ],
    
    // Dialogue when player uses the disentanglement device
    disentanglementDialogue: [
        "*You activate the quantum disentanglement device*",
        "*The shadowy figures are pulled away from the client, disappearing one by one*",
        "NO! What are you doing? You're ruining everything!",
        "*As the last shadow disappears, the client collapses to their knees*",
        "They're... gone. All of them. I feel so... singular.",
        "*They slowly stand up, looking disoriented*",
        "I didn't realize how much of my consciousness was spread across dimensions.",
        "It was like being a god, but... I was losing myself. My identity was fragmenting.",
        "Maybe this is for the best. One life, lived fully, is enough.",
        "*You collect psychological data on their experience*"
    ]
};

/*
 * Side Quest: "Schrödinger's Cafeteria"
 * 
 * Location: Quantum Dynamics Facility (Map110)
 * 
 * Quest Overview:
 * The cafeteria in the Quantum Dynamics Facility has been affected by a quantum experiment gone wrong.
 * Food exists in a state of being both delicious and disgusting simultaneously until observed.
 * The player must help the cafeteria worker fix the quantum uncertainty field.
 * 
 * Key NPCs:
 * - Confused Cafeteria Worker (quest giver)
 * - Quantum Uncertainty Field Generator (quest objective)
 * - Schrödinger's Cat (special NPC)
 * 
 * Quest Flow:
 * 1. Player meets the Confused Cafeteria Worker who explains the situation
 * 2. Player must find components to repair the quantum field stabilizer
 * 3. Player encounters Schrödinger's Cat who provides cryptic advice
 * 4. Player repairs the quantum field stabilizer
 * 5. Player returns to the cafeteria to test if the food is now stable
 * 6. The worker rewards the player with Quantum Cuisine and Probability Manipulation
 */

// Export all quest data
module.exports = {
    quantumEntanglementDating: {
        paradoxAssistant,
        entangledClient1,
        entangledClient2,
        entangledClient3
    },
    schrodingersCafeteria: {
        // To be implemented
    }
};
