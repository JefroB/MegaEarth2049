// minor_ailment_dialogue.js
// Script to set up dialogue for minor ailments
// This adds dialogue options for party members and NPCs to ridicule characters with minor ailments

const fs = require('fs');
const path = require('path');

// Define the dialogue options for each minor ailment
// These will be used by NPCs and party members to ridicule the afflicted character
const ailmentDialogue = {
  // Dialogue for Chronic Hiccups
  "hiccups": [
    "Maybe you should try holding your breath? *hic* Oh, now I've got it too!",
    "That speech would have been more inspiring without the hiccups.",
    "I've heard drinking water upside down helps with hiccups. Or was it standing on your head?",
    "Your hiccups are scaring away all the wildlife... and probably attracting predators.",
    "I bet you couldn't hiccup if someone scared you. BOO! ...No? Worth a try."
  ],
  
  // Dialogue for Seasonal Allergies
  "allergies": [
    "Allergic to adventure, are we?",
    "Your sneezing is more effective than our weapons at clearing a room.",
    "I'd offer you a tissue, but I used the last one cleaning my weapon.",
    "Are you allergic to everything, or just success?",
    "Maybe you should wear a mask. For our sake, not yours."
  ],
  
  // Dialogue for Bedhead
  "hair": [
    "Did you style your hair with a lightning bolt this morning?",
    "I've seen better hairstyles on a mop.",
    "Your hair is defying both gravity and fashion.",
    "Is that a new hairstyle or did you just lose a fight with a ceiling fan?",
    "I'd lend you a comb, but I think you need professional help."
  ],
  
  // Dialogue for Bad Breath
  "breath": [
    "When you talk, plants wilt.",
    "Could you face the other way when you speak? My eyes are watering.",
    "I've smelled better breath coming from a sewer grate.",
    "Is that your secret weapon? Talking to enemies until they surrender?",
    "I'd offer you a mint, but I think you need the whole pack."
  ],
  
  // Dialogue for Excessive Sweating
  "sweat": [
    "Are you melting or just really nervous?",
    "You're sweating so much you could solve a water shortage.",
    "I'd stand downwind, but there's sweat coming from all directions.",
    "Is it hot in here, or is it just you... literally just you?",
    "You might want to wring out your clothes before we continue."
  ],
  
  // Dialogue for Athlete's Foot
  "foot": [
    "That constant scratching is driving me crazy. Almost as crazy as your foot must be itching.",
    "Maybe if you washed your socks more than once a month...",
    "Your foot fungus probably has its own ecosystem by now.",
    "I'd lend you my foot powder, but I don't want to catch whatever that is.",
    "The way you're scratching, I'm surprised you haven't worn a hole in your boot."
  ],
  
  // Dialogue for Persistent Cough
  "cough": [
    "That cough sounds like it's trying to escape your body.",
    "Have you tried NOT coughing? Just a suggestion.",
    "Your cough is more reliable than our town clock.",
    "I think your lungs are trying to become external organs.",
    "If you're trying to communicate in cough-code, I'm not fluent."
  ],
  
  // Dialogue for Eye Twitch
  "twitch": [
    "Is your eye trying to send me a secret message?",
    "If you're winking at me, you're really bad at it.",
    "Your eye is twitching more than a nervous rabbit.",
    "I can't tell if you're having a seizure or just really excited about something.",
    "Does your face always do that, or am I special?"
  ],
  
  // Dialogue for Runny Nose
  "nose": [
    "Your nose is running faster than you ever could.",
    "I'd offer you a handkerchief, but I don't think one would be enough.",
    "Are you storing a small lake in your sinuses?",
    "The constant sniffling is like having a soundtrack to our adventure.",
    "I think your nose is trying to escape your face."
  ],
  
  // Dialogue for Acne Breakout
  "acne": [
    "Your face has more craters than the moon.",
    "I'd connect the dots on your face, but I don't have enough ink.",
    "Is your face trying to grow a second face?",
    "Those aren't pimples, they're tactical face weapons.",
    "I'd recommend a face wash, but you might need something industrial strength."
  ],
  
  // Dialogue for Laryngitis
  "voice": [
    "What's that? I can't hear you. Speak up! Oh wait, you can't.",
    "Your whisper is perfect for stealth missions, at least.",
    "I'd ask you to sing, but I think your voice already did.",
    "Are you trying to talk or just breathing aggressively?",
    "Your voice sounds like you swallowed a cheese grater."
  ]
};

// Create a plugin file for handling the dialogue in-game
const pluginContent = `//=============================================================================
// MinorAilmentDialogue.js
//=============================================================================

/*:
 * @plugindesc Adds dialogue for NPCs and party members to ridicule characters with minor ailments
 * @author MegaEarth2049 Team
 *
 * @help
 * This plugin adds dialogue options for NPCs and party members to ridicule
 * characters who are suffering from minor ailments.
 *
 * When a character has a minor ailment, NPCs and party members will occasionally
 * make fun of them with humorous dialogue.
 *
 * Each minor ailment has its own set of dialogue options.
 */

(function() {
    // Store the dialogue options for each minor ailment
    var ailmentDialogue = ${JSON.stringify(ailmentDialogue, null, 4)};
    
    // Original function to check if an actor has a specific state
    var _Game_Actor_isStateAffected = Game_Actor.prototype.isStateAffected;
    Game_Actor.prototype.isStateAffected = function(stateId) {
        return _Game_Actor_isStateAffected.call(this, stateId);
    };
    
    // Function to check if an actor has a minor ailment
    Game_Actor.prototype.hasMinorAilment = function() {
        var states = this.states();
        for (var i = 0; i < states.length; i++) {
            if (states[i].note.includes("<Category: MinorAilment>")) {
                return true;
            }
        }
        return false;
    };
    
    // Function to get the ridicule trigger for a minor ailment
    Game_Actor.prototype.getMinorAilmentTrigger = function() {
        var states = this.states();
        for (var i = 0; i < states.length; i++) {
            if (states[i].note.includes("<Category: MinorAilment>")) {
                var match = states[i].note.match(/<Ridicule Trigger: '(.+)'>/);
                if (match) {
                    return match[1];
                }
            }
        }
        return null;
    };
    
    // Function to get a random ridicule dialogue for a minor ailment
    Game_Actor.prototype.getRandomRidiculeDialogue = function() {
        var trigger = this.getMinorAilmentTrigger();
        if (trigger && ailmentDialogue[trigger]) {
            var dialogues = ailmentDialogue[trigger];
            return dialogues[Math.floor(Math.random() * dialogues.length)];
        }
        return null;
    };
    
    // Hook into the message system to add ridicule dialogue
    var _Game_Interpreter_command101 = Game_Interpreter.prototype.command101;
    Game_Interpreter.prototype.command101 = function() {
        // Check if the player has a minor ailment
        var actor = $gameParty.leader();
        if (actor && actor.hasMinorAilment() && Math.random() < 0.3) { // 30% chance to trigger ridicule
            var dialogue = actor.getRandomRidiculeDialogue();
            if (dialogue) {
                // Add the ridicule dialogue before the original message
                $gameMessage.add("\\C[2]" + $gameMessage.faceName() + "\\C[0]: " + dialogue);
            }
        }
        return _Game_Interpreter_command101.call(this);
    };
    
    // Hook into battle to add ridicule dialogue from party members
    var _BattleManager_displayStartMessages = BattleManager.displayStartMessages;
    BattleManager.displayStartMessages = function() {
        _BattleManager_displayStartMessages.call(this);
        
        // Check if any party members have minor ailments
        for (var i = 0; i < $gameParty.members().length; i++) {
            var actor = $gameParty.members()[i];
            if (actor && actor.hasMinorAilment() && Math.random() < 0.5) { // 50% chance to trigger ridicule in battle
                var dialogue = actor.getRandomRidiculeDialogue();
                if (dialogue) {
                    // Find another party member to ridicule the afflicted character
                    var otherMembers = $gameParty.members().filter(function(member) {
                        return member.actorId() !== actor.actorId();
                    });
                    if (otherMembers.length > 0) {
                        var ridiculer = otherMembers[Math.floor(Math.random() * otherMembers.length)];
                        $gameMessage.add("\\C[2]" + ridiculer.name() + "\\C[0]: " + dialogue);
                    }
                }
            }
        }
    };
})();
`;

// Write the plugin file
const pluginPath = path.join('js', 'plugins', 'MinorAilmentDialogue.js');
fs.writeFileSync(pluginPath, pluginContent);

console.log(`Created MinorAilmentDialogue plugin at ${pluginPath}`);

// Update the plugins.js file to include the new plugin
const pluginsPath = path.join('js', 'plugins.js');
let pluginsContent = fs.readFileSync(pluginsPath, 'utf8');

// Parse the plugins array
const pluginsMatch = pluginsContent.match(/plugins\s*=\s*(\[[\s\S]*?\]);/);
if (pluginsMatch) {
  let pluginsArray = eval(pluginsMatch[1]);
  
  // Check if the plugin is already in the array
  const existingPlugin = pluginsArray.find(p => p.name === 'MinorAilmentDialogue');
  if (!existingPlugin) {
    // Add the new plugin to the array
    pluginsArray.push({
      name: 'MinorAilmentDialogue',
      status: true,
      description: 'Adds dialogue for NPCs and party members to ridicule characters with minor ailments',
      parameters: {}
    });
    
    // Update the plugins.js file
    const newPluginsContent = pluginsContent.replace(
      pluginsMatch[0],
      `plugins = ${JSON.stringify(pluginsArray, null, 2)};`
    );
    fs.writeFileSync(pluginsPath, newPluginsContent);
    
    console.log('Added MinorAilmentDialogue to plugins.js');
  } else {
    console.log('MinorAilmentDialogue already exists in plugins.js');
  }
} else {
  console.error('Could not find plugins array in plugins.js');
}

console.log('Minor ailment dialogue setup complete');
