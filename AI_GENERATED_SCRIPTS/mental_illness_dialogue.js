// mental_illness_dialogue.js
// Script to set up dialogue for mental illnesses
// This adds dialogue options for party members and NPCs to comment on characters with mental illnesses

const fs = require('fs');
const path = require('path');

// Define the dialogue options for each mental illness
// These will be used by NPCs and party members to comment on the afflicted character
const mentalIllnessDialogue = {
  // Dialogue for Generalized Anxiety
  "anxiety": [
    "You worry too much. What's the worst that could happen? Oh wait, don't answer that.",
    "Have you tried just... not being anxious? No? Shocking.",
    "Your anxiety is so powerful it's making ME nervous.",
    "I'd tell you to relax, but I know that would just make it worse.",
    "You're so prepared for disaster that the apocalypse was probably a relief."
  ],
  
  // Dialogue for Social Anxiety
  "social": [
    "You know, most people don't analyze every conversation for 3 hours afterward.",
    "I see you've mastered the art of looking busy to avoid small talk.",
    "Your idea of hell is just a room full of people saying 'let's go around and introduce ourselves.'",
    "You've perfected the 'please don't talk to me' face.",
    "I've never seen someone so relieved when plans get canceled."
  ],
  
  // Dialogue for Panic Disorder
  "panic": [
    "Your fight-or-flight response is stuck on 'both at the same time.'",
    "I've never seen someone run so fast while simultaneously freezing in place.",
    "Your heart's beating so fast it could power a small city.",
    "Deep breaths... no, not that fast, you'll hyperventilate!",
    "Is that a panic attack or are you just excited to see a new way to die?"
  ],
  
  // Dialogue for Bipolar Disorder
  "bipolar": [
    "Your mood swings are so extreme they should come with safety harnesses.",
    "One minute you're planning to save the world, the next you can't get out of bed.",
    "I never know if I'm talking to the life of the party or someone who wants to be left alone.",
    "Your energy levels fluctuate more than the stock market.",
    "You're either the most productive person I know or completely immobile. No in-between."
  ],
  
  // Dialogue for Clinical Depression
  "depression": [
    "You make Eeyore look like an optimist.",
    "I've seen more enthusiasm from a sloth on tranquilizers.",
    "Your favorite color is clearly gray.",
    "You've turned sighing into an art form.",
    "Getting out of bed was your heroic act for the day, wasn't it?"
  ],
  
  // Dialogue for Seasonal Affective
  "seasonal": [
    "You and sunshine have a complicated relationship, don't you?",
    "Winter isn't coming, it's already in your head.",
    "You're like a reverse solar panel - you shut down when it gets dark.",
    "Have you tried sitting next to a really bright lamp and pretending it's the sun?",
    "Your mood is more dependent on weather forecasts than a farmer's."
  ],
  
  // Dialogue for Schizophrenia
  "schizophrenia": [
    "So... which one of you am I talking to right now?",
    "You're hearing voices? Tell them I said hi.",
    "You see things others don't? Like what? The truth? The future? Next week's lottery numbers?",
    "Reality is overrated anyway.",
    "Your hallucinations are probably more interesting than most people's actual personalities."
  ],
  
  // Dialogue for Paranoia
  "paranoia": [
    "Not everyone is out to get you. I am, but not everyone.",
    "Your tinfoil hat collection must be impressive.",
    "You check for traps more thoroughly than our rogue.",
    "Just because you're paranoid doesn't mean they're not after you... but in this case, they're not.",
    "You trust people about as much as a cat trusts water."
  ],
  
  // Dialogue for Dissociative Identity
  "dissociative": [
    "Which personality is my favorite? I plead the fifth.",
    "Your team meetings must be interesting when everyone's in the same body.",
    "You're never alone, even when you're alone.",
    "Do all of you have to agree on what to order for dinner?",
    "You're the most interesting party I've ever met who's technically just one person."
  ],
  
  // Dialogue for ADHD
  "adhd": [
    "You started three different tasks while I was saying this sentence.",
    "Focus! No, not on that. Or that. Or... what are you doing now?",
    "Your brain doesn't have a train of thought, it has a demolition derby.",
    "You're either hyperfocused or not focused at all. There is no middle ground.",
    "I've never seen someone so easily distracted by... oh look, a butterfly!"
  ],
  
  // Dialogue for Autism Spectrum
  "autism": [
    "Your pattern recognition puts our tactician to shame.",
    "Social cues are overrated anyway.",
    "You remember more details about wasteland creatures than most people remember about their own families.",
    "Your special interest knowledge could fill an encyclopedia.",
    "You're like a computer - brilliant at some things, confused by the simplest human behaviors."
  ],
  
  // Dialogue for OCD
  "ocd": [
    "Your ritual before battle takes longer than the actual fight.",
    "Everything has to be just right, doesn't it? No, a little to the left. Perfect.",
    "I've never seen someone count their steps so precisely.",
    "Your inventory is organized better than most military operations.",
    "You've checked that door is locked so many times I think you've worn down the handle."
  ],
  
  // Dialogue for Narcissistic Personality
  "narcissistic": [
    "Yes, yes, you're the main character and we're all just NPCs in your story.",
    "Have you considered that not everything is about you? No? Shocking.",
    "Your ego is so big it has its own gravitational pull.",
    "I'd ask how you're doing, but I know you'll tell me anyway. In great detail.",
    "If confidence was currency, you'd be the richest person in the wasteland."
  ],
  
  // Dialogue for Borderline Personality
  "borderline": [
    "Your emotional regulation is like a roller coaster designed by a madman.",
    "You either love someone or hate them, with nothing in between.",
    "Your fear of abandonment is so strong you get attached to random NPCs.",
    "Your mood changes faster than wasteland weather.",
    "You feel emotions so intensely it's like experiencing everything for the first time, every time."
  ],
  
  // Dialogue for Agoraphobia
  "agoraphobia": [
    "The great outdoors isn't so great to you, is it?",
    "You treat open spaces like they're filled with invisible lava.",
    "Your ideal mission would never leave the bunker, wouldn't it?",
    "You cling to walls like they're your only friend.",
    "I've seen people more comfortable in deathclaw nests than you are in an open field."
  ]
};

// Create a plugin file for handling the dialogue in-game
const pluginContent = `//=============================================================================
// MentalIllnessDialogue.js
//=============================================================================

/*:
 * @plugindesc Adds dialogue for NPCs and party members to comment on characters with mental illnesses
 * @author MegaEarth2049 Team
 *
 * @help
 * This plugin adds dialogue options for NPCs and party members to comment
 * on characters who are suffering from mental illnesses.
 *
 * When a character has a mental illness, NPCs and party members will occasionally
 * make comments with dark humor that fits the game's tone.
 *
 * Each mental illness has its own set of dialogue options.
 */

(function() {
    // Store the dialogue options for each mental illness
    var mentalIllnessDialogue = ${JSON.stringify(mentalIllnessDialogue, null, 4)};
    
    // Original function to check if an actor has a specific state
    var _Game_Actor_isStateAffected = Game_Actor.prototype.isStateAffected;
    Game_Actor.prototype.isStateAffected = function(stateId) {
        return _Game_Actor_isStateAffected.call(this, stateId);
    };
    
    // Function to check if an actor has a mental illness
    Game_Actor.prototype.hasMentalIllness = function() {
        var states = this.states();
        for (var i = 0; i < states.length; i++) {
            if (states[i].note.includes("<Category: MentalIllness>")) {
                return true;
            }
        }
        return false;
    };
    
    // Function to get the dialogue trigger for a mental illness
    Game_Actor.prototype.getMentalIllnessTrigger = function() {
        var states = this.states();
        for (var i = 0; i < states.length; i++) {
            if (states[i].note.includes("<Category: MentalIllness>")) {
                // Extract trigger from state name
                var name = states[i].name.toLowerCase();
                if (name.includes("anxiety")) return "anxiety";
                if (name.includes("social")) return "social";
                if (name.includes("panic")) return "panic";
                if (name.includes("bipolar")) return "bipolar";
                if (name.includes("depression")) return "depression";
                if (name.includes("seasonal")) return "seasonal";
                if (name.includes("schizophrenia")) return "schizophrenia";
                if (name.includes("paranoia")) return "paranoia";
                if (name.includes("dissociative")) return "dissociative";
                if (name.includes("adhd")) return "adhd";
                if (name.includes("autism")) return "autism";
                if (name.includes("ocd")) return "ocd";
                if (name.includes("narcissistic")) return "narcissistic";
                if (name.includes("borderline")) return "borderline";
                if (name.includes("agoraphobia")) return "agoraphobia";
            }
        }
        return null;
    };
    
    // Function to get a random dialogue for a mental illness
    Game_Actor.prototype.getRandomMentalIllnessDialogue = function() {
        var trigger = this.getMentalIllnessTrigger();
        if (trigger && mentalIllnessDialogue[trigger]) {
            var dialogues = mentalIllnessDialogue[trigger];
            return dialogues[Math.floor(Math.random() * dialogues.length)];
        }
        return null;
    };
    
    // Hook into the message system to add dialogue
    var _Game_Interpreter_command101 = Game_Interpreter.prototype.command101;
    Game_Interpreter.prototype.command101 = function() {
        // Check if the player has a mental illness
        var actor = $gameParty.leader();
        if (actor && actor.hasMentalIllness() && Math.random() < 0.3) { // 30% chance to trigger dialogue
            var dialogue = actor.getRandomMentalIllnessDialogue();
            if (dialogue) {
                // Add the dialogue before the original message
                $gameMessage.add("\\C[2]" + $gameMessage.faceName() + "\\C[0]: " + dialogue);
            }
        }
        return _Game_Interpreter_command101.call(this);
    };
    
    // Hook into battle to add dialogue from party members
    var _BattleManager_displayStartMessages = BattleManager.displayStartMessages;
    BattleManager.displayStartMessages = function() {
        _BattleManager_displayStartMessages.call(this);
        
        // Check if any party members have mental illnesses
        for (var i = 0; i < $gameParty.members().length; i++) {
            var actor = $gameParty.members()[i];
            if (actor && actor.hasMentalIllness() && Math.random() < 0.5) { // 50% chance to trigger dialogue in battle
                var dialogue = actor.getRandomMentalIllnessDialogue();
                if (dialogue) {
                    // Find another party member to comment on the afflicted character
                    var otherMembers = $gameParty.members().filter(function(member) {
                        return member.actorId() !== actor.actorId();
                    });
                    if (otherMembers.length > 0) {
                        var commenter = otherMembers[Math.floor(Math.random() * otherMembers.length)];
                        $gameMessage.add("\\C[2]" + commenter.name() + "\\C[0] to \\C[2]" + actor.name() + "\\C[0]: " + dialogue);
                    }
                }
            }
        }
    };
})();
`;

// Write the plugin file
const pluginPath = path.join('js', 'plugins', 'MentalIllnessDialogue.js');
fs.writeFileSync(pluginPath, pluginContent);

console.log(`Created MentalIllnessDialogue plugin at ${pluginPath}`);

// Update the plugins.js file to include the new plugin
const pluginsPath = path.join('js', 'plugins.js');
let pluginsContent = fs.readFileSync(pluginsPath, 'utf8');

// Parse the plugins array
const pluginsMatch = pluginsContent.match(/plugins\s*=\s*(\[[\s\S]*?\]);/);
if (pluginsMatch) {
  let pluginsArray = eval(pluginsMatch[1]);
  
  // Check if the plugin is already in the array
  const existingPlugin = pluginsArray.find(p => p.name === 'MentalIllnessDialogue');
  if (!existingPlugin) {
    // Add the new plugin to the array
    pluginsArray.push({
      name: 'MentalIllnessDialogue',
      status: true,
      description: 'Adds dialogue for NPCs and party members to comment on characters with mental illnesses',
      parameters: {}
    });
    
    // Update the plugins.js file
    const newPluginsContent = pluginsContent.replace(
      pluginsMatch[0],
      `plugins = ${JSON.stringify(pluginsArray, null, 2)};`
    );
    fs.writeFileSync(pluginsPath, newPluginsContent);
    
    console.log('Added MentalIllnessDialogue to plugins.js');
  } else {
    console.log('MentalIllnessDialogue already exists in plugins.js');
  }
} else {
  console.error('Could not find plugins array in plugins.js');
}

console.log('Mental illness dialogue setup complete');
