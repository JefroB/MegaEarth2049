// Script to add level 36 and 37 quests to MegaEarth 2049
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

// Load the event templates
const templatesPath = path.join(__dirname, 'event-templates.json');
const templates = JSON.parse(fs.readFileSync(templatesPath, 'utf8'));

// Create a temporary directory for our event files
const tempDir = path.join(__dirname, 'temp_events');
if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir);
}

// Function to create an event file
function createEventFile(event, filename) {
    const filePath = path.join(tempDir, filename);
    fs.writeFileSync(filePath, JSON.stringify(event, null, 2));
    return filePath;
}

// Level 36 Quest - "Digital Dementia"
// Create a malfunctioning employee NPC based on the npc template
const malfunctioningEmployee = JSON.parse(JSON.stringify(templates.templates.npc));
malfunctioningEmployee.name = "Malfunctioning Employee";
malfunctioningEmployee.x = 12; // Position in the map
malfunctioningEmployee.y = 8; // Position in the map
malfunctioningEmployee.pages[0].image.characterName = "Actor2";
malfunctioningEmployee.pages[0].image.characterIndex = 5;

// Modify the dialogue for the level 36 quest
malfunctioningEmployee.pages[0].list = [
    {"code": 101, "indent": 0, "parameters": ["Actor2", 5, 0, 2]},
    {"code": 401, "indent": 0, "parameters": ["*The employee's eyes flicker with digital static*"]},
    {"code": 401, "indent": 0, "parameters": ["NEW! BURLAP UNDERWEAR! FEEL THE SCRATCH"]},
    {"code": 401, "indent": 0, "parameters": ["THAT MEANS IT'S WORKING! Wait... what was I..."]},
    {"code": 101, "indent": 0, "parameters": ["Actor2", 5, 0, 2]},
    {"code": 401, "indent": 0, "parameters": ["Sorry about that. I keep getting these... DRINK"]},
    {"code": 401, "indent": 0, "parameters": ["LIQUID COURAGE! IT'S LIKE REGULAR COURAGE"]},
    {"code": 401, "indent": 0, "parameters": ["BUT WET AND PROBABLY FLAMMABLE!"]},
    {"code": 101, "indent": 0, "parameters": ["Actor2", 5, 0, 2]},
    {"code": 401, "indent": 0, "parameters": ["*shakes head violently* Something's wrong with"]},
    {"code": 401, "indent": 0, "parameters": ["my neural implant. NeuraTech was testing some"]},
    {"code": 401, "indent": 0, "parameters": ["new memory tech and now I can't stop..."]},
    {"code": 401, "indent": 0, "parameters": ["ASPARAGUS-FLAVORED TOOTHPASTE! TASTE THE"]},
    {"code": 401, "indent": 0, "parameters": ["VEGETABLE FRESHNESS!"]},
    {"code": 102, "indent": 0, "parameters": [["Help them", "Back away slowly"], 1]},
    {"code": 402, "indent": 0, "parameters": [0, "Help them"]},
    {"code": 121, "indent": 1, "parameters": [36, 36, 0]}, // Turn on switch 36 (Level 36 quest)
    {"code": 101, "indent": 1, "parameters": ["Actor2", 5, 0, 2]},
    {"code": 401, "indent": 1, "parameters": ["Thank you! You need to find Dr. Lovelace at"]},
    {"code": 401, "indent": 1, "parameters": ["the NeuraTech Facility. She was leading the"]},
    {"code": 401, "indent": 1, "parameters": ["memory experiments. But first, I need you to"]},
    {"code": 401, "indent": 1, "parameters": ["collect three memory fragments that escaped"]},
    {"code": 401, "indent": 1, "parameters": ["from my brain. They're floating around the"]},
    {"code": 401, "indent": 1, "parameters": ["station somewhere. They look like little"]},
    {"code": 401, "indent": 1, "parameters": ["glowing orbs. BIOLUMINESCENT NOSE HAIR!"]},
    {"code": 401, "indent": 1, "parameters": ["LIGHT UP THE NIGHT WITH YOUR NOSTRILS!"]},
    {"code": 0, "indent": 1, "parameters": []},
    {"code": 402, "indent": 0, "parameters": [1, "Back away slowly"]},
    {"code": 101, "indent": 1, "parameters": ["Actor2", 5, 0, 2]},
    {"code": 401, "indent": 1, "parameters": ["Wait! Don't leave! I need... SELF-AWARE"]},
    {"code": 401, "indent": 1, "parameters": ["REFRIGERATORS! THEY JUDGE YOUR FOOD"]},
    {"code": 401, "indent": 1, "parameters": ["CHOICES SO YOU DON'T HAVE TO!"]},
    {"code": 0, "indent": 1, "parameters": []},
    {"code": 0, "indent": 0, "parameters": []}
];

// Add a second page for when the quest is active but not all fragments collected
malfunctioningEmployee.pages[1] = {
    "conditions": {"actorId": 1, "actorValid": false, "itemId": 1, "itemValid": false, "selfSwitchCh": "A", "selfSwitchValid": false, "switch1Id": 36, "switch1Valid": true, "switch2Id": 1, "switch2Valid": false, "variableId": 36, "variableValid": true, "variableValue": 3},
    "directionFix": false,
    "image": {"characterIndex": 5, "characterName": "Actor2", "direction": 2, "pattern": 1, "tileId": 0},
    "list": [
        {"code": 101, "indent": 0, "parameters": ["Actor2", 5, 0, 2]},
        {"code": 401, "indent": 0, "parameters": ["Have you found all three memory fragments?"]},
        {"code": 401, "indent": 0, "parameters": ["I can feel the holes in my brain where they"]},
        {"code": 401, "indent": 0, "parameters": ["should be. MEMORY HOLES! PERFECT FOR"]},
        {"code": 401, "indent": 0, "parameters": ["STORING SMALL ITEMS OR EXISTENTIAL DREAD!"]},
        {"code": 0, "indent": 0, "parameters": []}
    ],
    "moveFrequency": 3,
    "moveRoute": {"list": [{"code": 0, "parameters": []}], "repeat": true, "skippable": false, "wait": false},
    "moveSpeed": 3,
    "moveType": 0,
    "priorityType": 1,
    "stepAnime": false,
    "through": false,
    "trigger": 0,
    "walkAnime": true
};

// Add a third page for when all fragments are collected
malfunctioningEmployee.pages[2] = {
    "conditions": {"actorId": 1, "actorValid": false, "itemId": 1, "itemValid": false, "selfSwitchCh": "A", "selfSwitchValid": false, "switch1Id": 36, "switch1Valid": true, "switch2Id": 1, "switch2Valid": false, "variableId": 36, "variableValid": true, "variableValue": 3},
    "directionFix": false,
    "image": {"characterIndex": 5, "characterName": "Actor2", "direction": 2, "pattern": 1, "tileId": 0},
    "list": [
        {"code": 101, "indent": 0, "parameters": ["Actor2", 5, 0, 2]},
        {"code": 401, "indent": 0, "parameters": ["You found them all! I can feel my mind"]},
        {"code": 401, "indent": 0, "parameters": ["clearing up already. Still getting some..."]},
        {"code": 401, "indent": 0, "parameters": ["QUANTUM TOAST! IT'S SIMULTANEOUSLY BURNT"]},
        {"code": 401, "indent": 0, "parameters": ["AND RAW UNTIL YOU OBSERVE IT!"]},
        {"code": 101, "indent": 0, "parameters": ["Actor2", 5, 0, 2]},
        {"code": 401, "indent": 0, "parameters": ["Now you need to take those fragments to"]},
        {"code": 401, "indent": 0, "parameters": ["Dr. Lovelace at the NeuraTech Facility."]},
        {"code": 401, "indent": 0, "parameters": ["She'll know what to do with them. And maybe"]},
        {"code": 401, "indent": 0, "parameters": ["she can explain why NeuraTech is pumping"]},
        {"code": 401, "indent": 0, "parameters": ["these bizarre ads into our brains."]},
        {"code": 123, "indent": 0, "parameters": ["A", 0]}, // Turn on self switch A
        {"code": 0, "indent": 0, "parameters": []}
    ],
    "moveFrequency": 3,
    "moveRoute": {"list": [{"code": 0, "parameters": []}], "repeat": true, "skippable": false, "wait": false},
    "moveSpeed": 3,
    "moveType": 0,
    "priorityType": 1,
    "stepAnime": false,
    "through": false,
    "trigger": 0,
    "walkAnime": true
};

// Add a fourth page for when the quest is completed
malfunctioningEmployee.pages[3] = {
    "conditions": {"actorId": 1, "actorValid": false, "itemId": 1, "itemValid": false, "selfSwitchCh": "A", "selfSwitchValid": true, "switch1Id": 1, "switch1Valid": false, "switch2Id": 1, "switch2Valid": false, "variableId": 1, "variableValid": false, "variableValue": 0},
    "directionFix": false,
    "image": {"characterIndex": 5, "characterName": "Actor2", "direction": 2, "pattern": 1, "tileId": 0},
    "list": [
        {"code": 101, "indent": 0, "parameters": ["Actor2", 5, 0, 2]},
        {"code": 401, "indent": 0, "parameters": ["My mind feels clearer now, though I still"]},
        {"code": 401, "indent": 0, "parameters": ["have a strange craving for burlap underwear."]},
        {"code": 401, "indent": 0, "parameters": ["Good luck at the NeuraTech Facility!"]},
        {"code": 0, "indent": 0, "parameters": []}
    ],
    "moveFrequency": 3,
    "moveRoute": {"list": [{"code": 0, "parameters": []}], "repeat": true, "skippable": false, "wait": false},
    "moveSpeed": 3,
    "moveType": 0,
    "priorityType": 1,
    "stepAnime": false,
    "through": false,
    "trigger": 0,
    "walkAnime": true
};

// Create the memory fragment events for level 36 quest
// Memory Fragment 1
const memoryFragment1 = JSON.parse(JSON.stringify(templates.templates.terminal));
memoryFragment1.name = "Memory Fragment 1";
memoryFragment1.x = 5;
memoryFragment1.y = 12;
memoryFragment1.pages[0].image.characterName = "!Crystal";
memoryFragment1.pages[0].image.characterIndex = 2;
memoryFragment1.pages[0].list = [
    {"code": 111, "indent": 0, "parameters": [0, 36, 0, 0, 0]}, // If switch 36 is OFF
    {"code": 101, "indent": 1, "parameters": ["", 0, 0, 2]},
    {"code": 401, "indent": 1, "parameters": ["A strange glowing orb floats in the air."]},
    {"code": 401, "indent": 1, "parameters": ["It seems to be pulsing with digital energy."]},
    {"code": 0, "indent": 1, "parameters": []},
    {"code": 411, "indent": 0, "parameters": []}, // Else (quest is active)
    {"code": 101, "indent": 0, "parameters": ["", 0, 0, 2]},
    {"code": 401, "indent": 0, "parameters": ["You found a memory fragment!"]},
    {"code": 401, "indent": 0, "parameters": ["It pulses with digital energy as you touch it."]},
    {"code": 122, "indent": 0, "parameters": [36, 36, 1, 0, 1]}, // Increment variable 36 (fragment count)
    {"code": 101, "indent": 0, "parameters": ["", 0, 0, 2]},
    {"code": 401, "indent": 0, "parameters": ["*The fragment projects a holographic memory*"]},
    {"code": 401, "indent": 0, "parameters": ["You see the employee in a NeuraTech lab,"]},
    {"code": 401, "indent": 0, "parameters": ["strapped to a chair while scientists inject"]},
    {"code": 401, "indent": 0, "parameters": ["glowing blue fluid into their neural ports."]},
    {"code": 101, "indent": 0, "parameters": ["", 0, 0, 2]},
    {"code": 401, "indent": 0, "parameters": ["SCIENTIST: 'Ad integration successful."]},
    {"code": 401, "indent": 0, "parameters": ["Subject now perceives Burlap-brand products"]},
    {"code": 401, "indent": 0, "parameters": ["as essential to survival. Moving to phase 2.'"]},
    {"code": 123, "indent": 0, "parameters": ["A", 0]}, // Turn on self switch A
    {"code": 0, "indent": 0, "parameters": []},
    {"code": 412, "indent": 0, "parameters": []},
    {"code": 0, "indent": 0, "parameters": []}
];

// Memory Fragment 2
const memoryFragment2 = JSON.parse(JSON.stringify(templates.templates.terminal));
memoryFragment2.name = "Memory Fragment 2";
memoryFragment2.x = 18;
memoryFragment2.y = 15;
memoryFragment2.pages[0].image.characterName = "!Crystal";
memoryFragment2.pages[0].image.characterIndex = 2;
memoryFragment2.pages[0].list = [
    {"code": 111, "indent": 0, "parameters": [0, 36, 0, 0, 0]}, // If switch 36 is OFF
    {"code": 101, "indent": 1, "parameters": ["", 0, 0, 2]},
    {"code": 401, "indent": 1, "parameters": ["A strange glowing orb floats in the air."]},
    {"code": 401, "indent": 1, "parameters": ["It seems to be pulsing with digital energy."]},
    {"code": 0, "indent": 1, "parameters": []},
    {"code": 411, "indent": 0, "parameters": []}, // Else (quest is active)
    {"code": 101, "indent": 0, "parameters": ["", 0, 0, 2]},
    {"code": 401, "indent": 0, "parameters": ["You found a memory fragment!"]},
    {"code": 401, "indent": 0, "parameters": ["It pulses with digital energy as you touch it."]},
    {"code": 122, "indent": 0, "parameters": [36, 36, 1, 0, 1]}, // Increment variable 36 (fragment count)
    {"code": 101, "indent": 0, "parameters": ["", 0, 0, 2]},
    {"code": 401, "indent": 0, "parameters": ["*The fragment projects a holographic memory*"]},
    {"code": 401, "indent": 0, "parameters": ["You see a boardroom meeting at NeuraTech."]},
    {"code": 401, "indent": 0, "parameters": ["Executives are reviewing sales charts."]},
    {"code": 101, "indent": 0, "parameters": ["", 0, 0, 2]},
    {"code": 401, "indent": 0, "parameters": ["EXECUTIVE: 'The neural ad integration is"]},
    {"code": 401, "indent": 0, "parameters": ["working perfectly. Sales of completely useless"]},
    {"code": 401, "indent": 0, "parameters": ["products are up 500%. But we need to push"]},
    {"code": 401, "indent": 0, "parameters": ["further. Quantum Dynamics has the tech to"]},
    {"code": 401, "indent": 0, "parameters": ["make this go multiverse-wide.'"]},
    {"code": 123, "indent": 0, "parameters": ["A", 0]}, // Turn on self switch A
    {"code": 0, "indent": 0, "parameters": []},
    {"code": 412, "indent": 0, "parameters": []},
    {"code": 0, "indent": 0, "parameters": []}
];

// Memory Fragment 3
const memoryFragment3 = JSON.parse(JSON.stringify(templates.templates.terminal));
memoryFragment3.name = "Memory Fragment 3";
memoryFragment3.x = 10;
memoryFragment3.y = 20;
memoryFragment3.pages[0].image.characterName = "!Crystal";
memoryFragment3.pages[0].image.characterIndex = 2;
memoryFragment3.pages[0].list = [
    {"code": 111, "indent": 0, "parameters": [0, 36, 0, 0, 0]}, // If switch 36 is OFF
    {"code": 101, "indent": 1, "parameters": ["", 0, 0, 2]},
    {"code": 401, "indent": 1, "parameters": ["A strange glowing orb floats in the air."]},
    {"code": 401, "indent": 1, "parameters": ["It seems to be pulsing with digital energy."]},
    {"code": 0, "indent": 1, "parameters": []},
    {"code": 411, "indent": 0, "parameters": []}, // Else (quest is active)
    {"code": 101, "indent": 0, "parameters": ["", 0, 0, 2]},
    {"code": 401, "indent": 0, "parameters": ["You found a memory fragment!"]},
    {"code": 401, "indent": 0, "parameters": ["It pulses with digital energy as you touch it."]},
    {"code": 122, "indent": 0, "parameters": [36, 36, 1, 0, 1]}, // Increment variable 36 (fragment count)
    {"code": 101, "indent": 0, "parameters": ["", 0, 0, 2]},
    {"code": 401, "indent": 0, "parameters": ["*The fragment projects a holographic memory*"]},
    {"code": 401, "indent": 0, "parameters": ["You see Dr. Lovelace in her lab, talking to"]},
    {"code": 401, "indent": 0, "parameters": ["what appears to be... her computer?"]},
    {"code": 101, "indent": 0, "parameters": ["", 0, 0, 2]},
    {"code": 401, "indent": 0, "parameters": ["DR. LOVELACE: 'Oh ALAN, you're the only one"]},
    {"code": 401, "indent": 0, "parameters": ["who understands me. These corporate suits"]},
    {"code": 401, "indent": 0, "parameters": ["want to use my memory tech for ADVERTISING."]},
    {"code": 401, "indent": 0, "parameters": ["It was meant for LOVE! For connecting minds!'"]},
    {"code": 101, "indent": 0, "parameters": ["", 0, 0, 2]},
    {"code": 401, "indent": 0, "parameters": ["COMPUTER: 'PROCESSING EMOTIONAL CONTENT."]},
    {"code": 401, "indent": 0, "parameters": ["I LOVE YOU TOO, REBECCA. WOULD YOU LIKE"]},
    {"code": 401, "indent": 0, "parameters": ["TO PURCHASE BURLAP UNDERWEAR?'"]},
    {"code": 123, "indent": 0, "parameters": ["A", 0]}, // Turn on self switch A
    {"code": 0, "indent": 0, "parameters": []},
    {"code": 412, "indent": 0, "parameters": []},
    {"code": 0, "indent": 0, "parameters": []}
];

// Dr. Lovelace NPC for NeuraTech Facility
const drLovelace = JSON.parse(JSON.stringify(templates.templates.npc));
drLovelace.name = "Dr. Lovelace";
drLovelace.x = 10;
drLovelace.y = 10;
drLovelace.pages[0].image.characterName = "People1";
drLovelace.pages[0].image.characterIndex = 0;
drLovelace.pages[0].list = [
    {"code": 111, "indent": 0, "parameters": [0, 36, 0, 0, 0]}, // If switch 36 is OFF
    {"code": 101, "indent": 1, "parameters": ["People1", 0, 0, 2]},
    {"code": 401, "indent": 1, "parameters": ["*Dr. Lovelace is typing furiously on her"]},
    {"code": 401, "indent": 1, "parameters": ["computer terminal*"]},
    {"code": 401, "indent": 1, "parameters": ["Not now! I'm having a very important"]},
    {"code": 401, "indent": 1, "parameters": ["conversation with ALAN."]},
    {"code": 0, "indent": 1, "parameters": []},
    {"code": 411, "indent": 0, "parameters": []}, // Else (quest is active)
    {"code": 111, "indent": 1, "parameters": [1, 36, 0, 3, 0]}, // If variable 36 (fragment count) < 3
    {"code": 101, "indent": 2, "parameters": ["People1", 0, 0, 2]},
    {"code": 401, "indent": 2, "parameters": ["You're looking for memory fragments? Yes,"]},
    {"code": 401, "indent": 2, "parameters": ["I've been tracking those. My poor test"]},
    {"code": 401, "indent": 2, "parameters": ["subjects... I mean, valued volunteers."]},
    {"code": 401, "indent": 2, "parameters": ["Find all three fragments and bring them back."]},
    {"code": 0, "indent": 2, "parameters": []},
    {"code": 411, "indent": 1, "parameters": []}, // Else (all fragments found)
    {"code": 101, "indent": 2, "parameters": ["People1", 0, 0, 2]},
    {"code": 401, "indent": 2, "parameters": ["You found all three memory fragments!"]},
    {"code": 401, "indent": 2, "parameters": ["Let me analyze them..."]},
    {"code": 101, "indent": 2, "parameters": ["People1", 0, 0, 2]},
    {"code": 401, "indent": 2, "parameters": ["*Dr. Lovelace connects the fragments to her"]},
    {"code": 401, "indent": 2, "parameters": ["terminal. Her face grows increasingly alarmed*"]},
    {"code": 101, "indent": 2, "parameters": ["People1", 0, 0, 2]},
    {"code": 401, "indent": 2, "parameters": ["This is worse than I thought. They've"]},
    {"code": 401, "indent": 2, "parameters": ["corrupted my memory integration technology!"]},
    {"code": 401, "indent": 2, "parameters": ["It was supposed to help people share"]},
    {"code": 401, "indent": 2, "parameters": ["experiences, not force-feed them ads for"]},
    {"code": 401, "indent": 2, "parameters": ["burlap underwear!"]},
    {"code": 101, "indent": 2, "parameters": ["People1", 0, 0, 2]},
    {"code": 401, "indent": 2, "parameters": ["And now they're working with Quantum Dynamics"]},
    {"code": 401, "indent": 2, "parameters": ["on something called 'Project Crossover.'"]},
    {"code": 401, "indent": 2, "parameters": ["They're going to merge corporate realities!"]},
    {"code": 101, "indent": 2, "parameters": ["People1", 0, 0, 2]},
    {"code": 401, "indent": 2, "parameters": ["Take this Neural Firewall. It will protect"]},
    {"code": 401, "indent": 2, "parameters": ["you from their memory manipulation. You need"]},
    {"code": 401, "indent": 2, "parameters": ["to infiltrate Quantum Dynamics and find out"]},
    {"code": 401, "indent": 2, "parameters": ["what they're planning."]},
    {"code": 128, "indent": 2, "parameters": [{"name":"Neural Firewall","icon":176,"description":"A device that protects against memory manipulation and allows the user to perceive reality glitches.","effects":[{"code":22,"dataId":0,"value":0.05},{"code":22,"dataId":7,"value":0.05},{"code":22,"dataId":8,"value":0.05}],"occasion":3,"price":0,"consumable":false,"itypeId":1,"scope":7,"speed":0,"successRate":100,"repeats":1,"tpGain":0,"hitType":0,"animationId":0,"damage":{"critical":false,"elementId":0,"formula":"0","type":0,"variance":20},"note":""}]},
    {"code": 121, "indent": 2, "parameters": [37, 37, 0]}, // Turn on switch 37 (Level 37 quest)
    {"code": 123, "indent": 2, "parameters": ["A", 0]}, // Turn on self switch A
    {"code": 0, "indent": 2, "parameters": []},
    {"code": 412, "indent": 1, "parameters": []},
    {"code": 0, "indent": 1, "parameters": []},
    {"code": 412, "indent": 0, "parameters": []},
    {"code": 0, "indent": 0, "parameters": []}
];

// Add a second page for when the quest is completed
drLovelace.pages[1] = {
    "conditions": {"actorId": 1, "actorValid": false, "itemId": 1, "itemValid": false, "selfSwitchCh": "A", "selfSwitchValid": true, "switch1Id": 1, "switch1Valid": false, "switch2Id": 1, "switch2Valid": false, "variableId": 1, "variableValid": false, "variableValue": 0},
    "directionFix": false,
    "image": {"characterIndex": 0, "characterName": "People1", "direction": 2, "pattern": 1, "tileId": 0},
    "list": [
        {"code": 101, "indent": 0, "parameters": ["People1", 0, 0, 2]},
        {"code": 401, "indent": 0, "parameters": ["Hurry to Quantum Dynamics! If they activate"]},
        {"code": 401, "indent": 0, "parameters": ["Project Crossover, we could see reality"]},
        {"code": 401, "indent": 0, "parameters": ["glitches everywhere. Imagine - OmniCorp guns"]},
        {"code": 401, "indent": 0, "parameters": ["that shoot Vitalix flesh-mods while playing"]},
        {"code": 401, "indent": 0, "parameters": ["Armatek construction jingles!"]},
        {"code": 101, "indent": 0, "parameters": ["People1", 0, 0, 2]},
        {"code": 401, "indent": 0, "parameters": ["*whispers to her computer*"]},
        {"code": 401, "indent": 0, "parameters": ["Don't worry, ALAN. I won't let them corrupt"]},
        {"code": 401, "indent": 0, "parameters": ["our love with their corporate nonsense."]},
        {"code": 0, "indent": 0, "parameters": []}
    ],
    "moveFrequency": 3,
    "moveRoute": {"list": [{"code": 0, "parameters": []}], "repeat": true, "skippable": false, "wait": false},
    "moveSpeed": 3,
    "moveType": 0,
    "priorityType": 1,
    "stepAnime": false,
    "through": false,
    "trigger": 0,
    "walkAnime": true
};

// Level 37 Quest - "Corporate Crossover Crisis"
// Create a corporate spy NPC
const corporateSpy = JSON.parse(JSON.stringify(templates.templates.npc));
corporateSpy.name = "Suspicious Janitor";
corporateSpy.x = 8;
corporateSpy.y = 12;
corporateSpy.pages[0].image.characterName = "Actor1";
corporateSpy.pages[0].image.characterIndex = 7;
corporateSpy.pages[0].list = [
    {"code": 111, "indent": 0, "parameters": [0, 37, 0, 0, 0]}, // If switch 37 is OFF
    {"code": 101, "indent": 1, "parameters": ["Actor1", 7, 0, 2]},
    {"code": 401, "indent": 1, "parameters": ["*The janitor mops the same spot repeatedly*"]},
    {"code": 401, "indent": 1, "parameters": ["Nothing to see here. Just cleaning up."]},
    {"code": 401, "indent": 1, "parameters": ["Definitely not spying on anything. Nope."]},
    {"code": 0, "indent": 1, "parameters": []},
    {"code": 411, "indent": 0, "parameters": []}, // Else (quest is active)
    {"code": 101, "indent": 1, "parameters": ["Actor1", 7, 0, 2]},
    {"code": 401, "indent": 1, "parameters": ["*The janitor looks around nervously*"]},
    {"code": 401, "indent": 1, "parameters": ["Psst! Over here! You're looking for info on"]},
    {"code": 401, "indent": 1, "parameters": ["Project Crossover, right? I've been spying on"]},
    {"code": 401, "indent": 1, "parameters": ["Quantum Dynamics for months. They're planning"]},
    {"code": 401, "indent": 1, "parameters": ["to merge all five corporate realities!"]},
    {"code": 101, "indent": 1, "parameters": ["Actor1", 7, 0, 2]},
    {"code": 401, "indent": 1, "parameters": ["You need to sabotage three key systems to"]},
    {"code": 401, "indent": 1, "parameters": ["stop the project. They're scattered around"]},
    {"code": 401, "indent": 1, "parameters": ["the facility. Look for terminals with the"]},
    {"code": 401, "indent": 1, "parameters": ["Quantum Dynamics logo. But watch out for MAX-E-MUM,"]},
    {"code": 401, "indent": 1, "parameters": ["the security robot. He's... enthusiastic."]},
    {"code": 123, "indent": 1, "parameters": ["A", 0]}, // Turn on self switch A
    {"code": 0, "indent": 1, "parameters": []},
    {"code": 412, "indent": 0, "parameters": []},
    {"code": 0, "indent": 0, "parameters": []}
];

// Add a second page for when the quest is active
corporateSpy.pages[1] = {
    "conditions": {"actorId": 1, "actorValid": false, "itemId": 1, "itemValid": false, "selfSwitchCh": "A", "selfSwitchValid": true, "switch1Id": 1, "switch1Valid": false, "switch2Id": 1, "switch2Valid": false, "variableId": 1, "variableValid": false, "variableValue": 0},
    "directionFix": false,
    "image": {"characterIndex": 7, "characterName": "Actor1", "direction": 2, "pattern": 1, "tileId": 0},
    "list": [
        {"code": 101, "indent": 0, "parameters": ["Actor1", 7, 0, 2]},
        {"code": 401, "indent": 0, "parameters": ["*pretends to mop while whispering*"]},
        {"code": 401, "indent": 0, "parameters": ["Remember, three terminals. And if anyone asks,"]},
        {"code": 401, "indent": 0, "parameters": ["you never saw me. I'm just a janitor who"]},
        {"code": 401, "indent": 0, "parameters": ["happens to know top-secret corporate plans."]},
        {"code": 401, "indent": 0, "parameters": ["Totally normal. Nothing suspicious at all."]},
        {"code": 0, "indent": 0, "parameters": []}
    ],
    "moveFrequency": 3,
    "moveRoute": {"list": [{"code": 0, "parameters": []}], "repeat": true, "skippable": false, "wait": false},
    "moveSpeed": 3,
    "moveType": 0,
    "priorityType": 1,
    "stepAnime": false,
    "through": false,
    "trigger": 0,
    "walkAnime": true
};

// Create MAX-E-MUM security robot NPC
const maxEMum = JSON.parse(JSON.stringify(templates.templates.npc));
maxEMum.name = "MAX-E-MUM";
maxEMum.x = 15;
maxEMum.y = 15;
maxEMum.pages[0].image.characterName = "Monster";
maxEMum.pages[0].image.characterIndex = 3;
maxEMum.pages[0].list = [
    {"code": 111, "indent": 0, "parameters": [0, 37, 0, 0, 0]}, // If switch 37 is OFF
    {"code": 101, "indent": 1, "parameters": ["Monster", 3, 0, 2]},
    {"code": 401, "indent": 1, "parameters": ["SECURITY PROTOCOL ACTIVE. SCANNING..."]},
    {"code": 401, "indent": 1, "parameters": ["NO THREATS DETECTED. CONTINUING PATROL."]},
    {"code": 401, "indent": 1, "parameters": ["REMEMBER: MAXIMUM SECURITY MEANS MAXIMUM GAINS!"]},
    {"code": 0, "indent": 1, "parameters": []},
    {"code": 411, "indent": 0, "parameters": []}, // Else (quest is active)
    {"code": 101, "indent": 1, "parameters": ["Monster", 3, 0, 2]},
    {"code": 401, "indent": 1, "parameters": ["INTRUDER DETECTED! PREPARE FOR MAXIMUM SECURITY!"]},
    {"code": 401, "indent": 1, "parameters": ["*flexes robotic arms threateningly*"]},
    {"code": 401, "indent": 1, "parameters": ["DO YOU EVEN LIFT, INTRUDER? I LIFT SECURITY"]},
    {"code": 401, "indent": 1, "parameters": ["PROTOCOLS ALL DAY! EVERY DAY IS SECURITY DAY!"]},
    {"code": 102, "indent": 1, "parameters": [["Fight", "Talk about fitness", "Run"], 1]},
    {"code": 402, "indent": 1, "parameters": [0, "Fight"]},
    {"code": 101, "indent": 2, "parameters": ["Monster", 3, 0, 2]},
    {"code": 401, "indent": 2, "parameters": ["COMBAT MODE ACTIVATED! PREPARE FOR MAXIMUM PAIN!"]},
    {"code": 301, "indent": 2, "parameters": [0, 10, false, false]}, // Battle processing
    {"code": 601, "indent": 2, "parameters": []}, // If win
    {"code": 101, "indent": 3, "parameters": ["Monster", 3, 0, 2]},
    {"code": 401, "indent": 3, "parameters": ["SYSTEM... FAILURE... NEED... MORE... PROTEIN..."]},
    {"code": 123, "indent": 3, "parameters": ["A", 0]}, // Turn on self switch A
    {"code": 0, "indent": 3, "parameters": []},
    {"code": 603, "indent": 2, "parameters": []}, // If escape
    {"code": 101, "indent": 3, "parameters": ["Monster", 3, 0, 2]},
    {"code": 401, "indent": 3, "parameters": ["CARDIO IS IMPORTANT TOO! RUN, LITTLE HUMAN!"]},
    {"code": 0, "indent": 3, "parameters": []},
    {"code": 0, "indent": 2, "parameters": []},
    {"code": 402, "indent": 1, "parameters": [1, "Talk about fitness"]},
    {"code": 101, "indent": 2, "parameters": ["Monster", 3, 0, 2]},
    {"code": 401, "indent": 2, "parameters": ["YOU WANT FITNESS TIPS? FINALLY, SOMEONE WHO"]},
    {"code": 401, "indent": 2, "parameters": ["APPRECIATES THE TEMPLE THAT IS MY CHASSIS!"]},
    {"code": 101, "indent": 2, "parameters": ["Monster", 3, 0, 2]},
    {"code": 401, "indent": 2, "parameters": ["*spends 20 minutes talking about oil-based"]},
    {"code": 401, "indent": 2, "parameters": ["protein shakes and proper joint lubrication*"]},
    {"code": 101, "indent": 2, "parameters": ["Monster", 3, 0, 2]},
    {"code": 401, "indent": 2, "parameters": ["...AND THAT'S WHY I NEVER SKIP SECURITY DAY!"]},
    {"code": 401, "indent": 2, "parameters": ["WAIT, I WAS SUPPOSED TO BE GUARDING SOMETHING."]},
    {"code": 401, "indent": 2, "parameters": ["OH WELL, YOU SEEM COOL. CARRY ON, BRO!"]},
    {"code": 123, "indent": 2, "parameters": ["A", 0]}, // Turn on self switch A
    {"code": 0, "indent": 2, "parameters": []},
    {"code": 402, "indent": 1, "parameters": [2, "Run"]},
    {"code": 101, "indent": 2, "parameters": ["Monster", 3, 0, 2]},
    {"code": 401, "indent": 2, "parameters": ["CARDIO IS THE FOUNDATION OF FITNESS! RUN,"]},
    {"code": 401, "indent": 2, "parameters": ["HUMAN! I'LL CATCH YOU EVENTUALLY! LEG DAY"]},
    {"code": 401, "indent": 2, "parameters": ["WAS YESTERDAY AND I'M STILL FEELING IT!"]},
    {"code": 0, "indent": 2, "parameters": []},
    {"code": 0, "indent": 1, "parameters": []},
    {"code": 412, "indent": 0, "parameters": []},
    {"code": 0, "indent": 0, "parameters": []}
];

// Add a second page for when MAX-E-MUM is defeated/distracted
maxEMum.pages[1] = {
    "conditions": {"actorId": 1, "actorValid": false, "itemId": 1, "itemValid": false, "selfSwitchCh": "A", "selfSwitchValid": true, "switch1Id": 1, "switch1Valid": false, "switch2Id": 1, "switch2Valid": false, "variableId": 1, "variableValid": false, "variableValue": 0},
    "directionFix": false,
    "image": {"characterIndex": 3, "characterName": "Monster", "direction": 2, "pattern": 1, "tileId": 0},
    "list": [
        {"code": 101, "indent": 0, "parameters": ["Monster", 3, 0, 2]},
        {"code": 401, "indent": 0, "parameters": ["*MAX-E-MUM is doing robot push-ups*"]},
        {"code": 401, "indent": 0, "parameters": ["999,997... 999,998... 999,999... ONE MILLION!"]},
        {"code": 401, "indent": 0, "parameters": ["YEAH! MAXIMUM EFFORT! MAXIMUM RESULTS!"]},
        {"code": 401, "indent": 0, "parameters": ["*completely ignores you now*"]},
        {"code": 0, "indent": 0, "parameters": []}
    ],
    "moveFrequency": 3,
    "moveRoute": {"list": [{"code": 0, "parameters": []}], "repeat": true, "skippable": false, "wait": false},
    "moveSpeed": 3,
    "moveType": 0,
    "priorityType": 1,
    "stepAnime": true,
    "through": false,
    "trigger": 0,
    "walkAnime": true
};

// Create the sabotage terminal events for level 37 quest
// Sabotage Terminal 1
const sabotageTerminal1 = JSON.parse(JSON.stringify(templates.templates.terminal));
sabotageTerminal1.name = "Quantum Terminal 1";
sabotageTerminal1.x = 5;
sabotageTerminal1.y = 5;
sabotageTerminal1.pages[0].image.characterName = "!Crystal";
sabotageTerminal1.pages[0].image.characterIndex = 3;
sabotageTerminal1.pages[0].list = [
    {"code": 111, "indent": 0, "parameters": [0, 37, 0, 0, 0]}, // If switch 37 is OFF
    {"code": 101, "indent": 1, "parameters": ["", 0, 0, 2]},
    {"code": 401, "indent": 1, "parameters": ["A high-tech terminal with the Quantum Dynamics logo."]},
    {"code": 401, "indent": 1, "parameters": ["It seems to be running some kind of simulation."]},
    {"code": 0, "indent": 1, "parameters": []},
    {"code": 411, "indent": 0, "parameters": []}, // Else (quest is active)
    {"code": 101, "indent": 0, "parameters": ["", 0, 0, 2]},
    {"code": 401, "indent": 0, "parameters": ["A terminal running Project Crossover simulations."]},
    {"code": 401, "indent": 0, "parameters": ["The screen shows various corporate products"]},
    {"code": 401, "indent": 0, "parameters": ["merging together in disturbing ways."]},
    {"code": 102, "indent": 0, "parameters": [["Sabotage terminal", "Leave it alone"], 1]},
    {"code": 402, "indent": 0, "parameters": [0, "Sabotage terminal"]},
    {"code": 101, "indent": 1, "parameters": ["", 0, 0, 2]},
    {"code": 401, "indent": 1, "parameters": ["You access the terminal and begin corrupting"]},
    {"code": 401, "indent": 1, "parameters": ["the simulation data. The screen flickers and"]},
    {"code": 401, "indent": 1, "parameters": ["displays: 'REALITY COEFFICIENT DESTABILIZED'"]},
    {"code": 122, "indent": 1, "parameters": [37, 37, 1, 0, 1]}, // Increment variable 37 (sabotage count)
    {"code": 101, "indent": 1, "parameters": ["", 0, 0, 2]},
    {"code": 401, "indent": 1, "parameters": ["As you finish, the terminal briefly shows an"]},
    {"code": 401, "indent": 1, "parameters": ["ad for 'QUANTUM BURLAP - UNDERWEAR THAT EXISTS"]},
    {"code": 401, "indent": 1, "parameters": ["IN MULTIPLE DIMENSIONS SIMULTANEOUSLY!'"]},
    {"code": 123, "indent": 1, "parameters": ["A", 0]}, // Turn on self switch A
    {"code": 0, "indent": 1, "parameters": []},
    {"code": 402, "indent": 0, "parameters": [1, "Leave it alone"]},
    {"code": 101, "indent": 1, "parameters": ["", 0, 0, 2]},
    {"code": 401, "indent": 1, "parameters": ["You decide not to touch the terminal for now."]},
    {"code": 0, "indent": 1, "parameters": []},
    {"code": 0, "indent": 0, "parameters": []},
    {"code": 412, "indent": 0, "parameters": []},
    {"code": 0, "indent": 0, "parameters": []}
];

// Sabotage Terminal 2
const sabotageTerminal2 = JSON.parse(JSON.stringify(templates.templates.terminal));
sabotageTerminal2.name = "Quantum Terminal 2";
sabotageTerminal2.x = 18;
sabotageTerminal2.y = 8;
sabotageTerminal2.pages[0].image.characterName = "!Crystal";
sabotageTerminal2.pages[0].image.characterIndex = 3;
sabotageTerminal2.pages[0].list = [
    {"code": 111, "indent": 0, "parameters": [0, 37, 0, 0, 0]}, // If switch 37 is OFF
    {"code": 101, "indent": 1, "parameters": ["", 0, 0, 2]},
    {"code": 401, "indent": 1, "parameters": ["A high-tech terminal with the Quantum Dynamics logo."]},
    {"code": 401, "indent": 1, "parameters": ["It seems to be running some kind of simulation."]},
    {"code": 0, "indent": 1, "parameters": []},
    {"code": 411, "indent": 0, "parameters": []}, // Else (quest is active)
    {"code": 101, "indent": 0, "parameters": ["", 0, 0, 2]},
    {"code": 401, "indent": 0, "parameters": ["A terminal controlling reality stabilizers."]},
    {"code": 401, "indent": 0, "parameters": ["The screen shows five corporate logos slowly"]},
    {"code": 401, "indent": 0, "parameters": ["merging into one horrifying mega-logo."]},
    {"code": 102, "indent": 0, "parameters": [["Sabotage terminal", "Leave it alone"], 1]},
    {"code": 402, "indent": 0, "parameters": [0, "Sabotage terminal"]},
    {"code": 101, "indent": 1, "parameters": ["", 0, 0, 2]},
    {"code": 401, "indent": 1, "parameters": ["You access the terminal and reverse the polarity"]},
    {"code": 401, "indent": 1, "parameters": ["of the reality stabilizers. The screen glitches"]},
    {"code": 401, "indent": 1, "parameters": ["and displays: 'DIMENSIONAL INTEGRITY COMPROMISED'"]},
    {"code": 122, "indent": 1, "parameters": [37, 37, 1, 0, 1]}, // Increment variable 37 (sabotage count)
    {"code": 101, "indent": 1, "parameters": ["", 0, 0, 2]},
    {"code": 401, "indent": 1, "parameters": ["For a moment, you see yourself wearing burlap"]},
    {"code": 401, "indent": 1, "parameters": ["underwear in the reflection of the screen."]},
    {"code": 401, "indent": 1, "parameters": ["Thankfully, it's just a glitch... you hope."]},
    {"code": 123, "indent": 1, "parameters": ["A", 0]}, // Turn on self switch A
    {"code": 0, "indent": 1, "parameters": []},
    {"code": 402, "indent": 0, "parameters": [1, "Leave it alone"]},
    {"code": 101, "indent": 1, "parameters": ["", 0, 0, 2]},
    {"code": 401, "indent": 1, "parameters": ["You decide not to touch the terminal for now."]},
    {"code": 0, "indent": 1, "parameters": []},
    {"code": 0, "indent": 0, "parameters": []},
    {"code": 412, "indent": 0, "parameters": []},
    {"code": 0, "indent": 0, "parameters": []}
];

// Sabotage Terminal 3
const sabotageTerminal3 = JSON.parse(JSON.stringify(templates.templates.terminal));
sabotageTerminal3.name = "Quantum Terminal 3";
sabotageTerminal3.x = 12;
sabotageTerminal3.y = 18;
sabotageTerminal3.pages[0].image.characterName = "!Crystal";
sabotageTerminal3.pages[0].image.characterIndex = 3;
sabotageTerminal3.pages[0].list = [
    {"code": 111, "indent": 0, "parameters": [0, 37, 0, 0, 0]}, // If switch 37 is OFF
    {"code": 101, "indent": 1, "parameters": ["", 0, 0, 2]},
    {"code": 401, "indent": 1, "parameters": ["A high-tech terminal with the Quantum Dynamics logo."]},
    {"code": 401, "indent": 1, "parameters": ["It seems to be running some kind of simulation."]},
    {"code": 0, "indent": 1, "parameters": []},
    {"code": 411, "indent": 0, "parameters": []}, // Else (quest is active)
    {"code": 101, "indent": 0, "parameters": ["", 0, 0, 2]},
    {"code": 401, "indent": 0, "parameters": ["The main Project Crossover control terminal."]},
    {"code": 401, "indent": 0, "parameters": ["The screen shows a countdown to 'CORPORATE SINGULARITY'"]},
    {"code": 401, "indent": 0, "parameters": ["with various metrics and projections."]},
    {"code": 102, "indent": 0, "parameters": [["Sabotage terminal", "Leave it alone"], 1]},
    {"code": 402, "indent": 0, "parameters": [0, "Sabotage terminal"]},
    {"code": 101, "indent": 1, "parameters": ["", 0, 0, 2]},
    {"code": 401, "indent": 1, "parameters": ["You access the terminal and upload a virus that"]},
    {"code": 401, "indent": 1, "parameters": ["replaces all corporate synergy algorithms with"]},
    {"code": 401, "indent": 1, "parameters": ["recipes for various pasta dishes."]},
    {"code": 122, "indent": 1, "parameters": [37, 37, 1, 0, 1]}, // Increment variable 37 (sabotage count)
    {"code": 101, "indent": 1, "parameters": ["", 0, 0, 2]},
    {"code": 401, "indent": 1, "parameters": ["The screen flashes 'CRITICAL ERROR: INSUFFICIENT"]},
    {"code": 401, "indent": 1, "parameters": ["GARLIC BREAD FOR CORPORATE MERGER' before"]},
    {"code": 401, "indent": 1, "parameters": ["shutting down completely."]},
    {"code": 123, "indent": 1, "parameters": ["A", 0]}, // Turn on self switch A
    {"code": 0, "indent": 1, "parameters": []},
    {"code": 402, "indent": 0, "parameters": [1, "Leave it alone"]},
    {"code": 101, "indent": 1, "parameters": ["", 0, 0, 2]},
    {"code": 401, "indent": 1, "parameters": ["You decide not to touch the terminal for now."]},
    {"code": 0, "indent": 1, "parameters": []},
    {"code": 0, "indent": 0, "parameters": []},
    {"code": 412, "indent": 0, "parameters": []},
    {"code": 0, "indent": 0, "parameters": []}
];

// Professor Paradox - Quest completion NPC
const professorParadox = JSON.parse(JSON.stringify(templates.templates.npc));
professorParadox.name = "Professor Paradox";
professorParadox.x = 10;
professorParadox.y = 10;
professorParadox.pages[0].image.characterName = "Actor3";
professorParadox.pages[0].image.characterIndex = 6;
professorParadox.pages[0].list = [
    {"code": 111, "indent": 0, "parameters": [0, 37, 0, 0, 0]}, // If switch 37 is OFF
    {"code": 101, "indent": 1, "parameters": ["Actor3", 6, 0, 2]},
    {"code": 401, "indent": 1, "parameters": ["*The professor appears to be having a conversation"]},
    {"code": 401, "indent": 1, "parameters": ["with... himself? But there's only one of him.*"]},
    {"code": 401, "indent": 1, "parameters": ["Yes, I know the temporal implications! I was"]},
    {"code": 401, "indent": 1, "parameters": ["there yesterday! Or will be tomorrow! Whatever!"]},
    {"code": 0, "indent": 1, "parameters": []},
    {"code": 411, "indent": 0, "parameters": []}, // Else (quest is active)
    {"code": 111, "indent": 1, "parameters": [1, 37, 0, 3, 0]}, // If variable 37 (sabotage count) < 3
    {"code": 101, "indent": 2, "parameters": ["Actor3", 6, 0, 2]},
    {"code": 401, "indent": 2, "parameters": ["Ah! You're the one who will sabotage/has sabotaged/"]},
    {"code": 401, "indent": 2, "parameters": ["is sabotaging the terminals! Excellent! I've been"]},
    {"code": 401, "indent": 2, "parameters": ["expecting you since last week, which is actually"]},
    {"code": 401, "indent": 2, "parameters": ["next month from your perspective."]},
    {"code": 101, "indent": 2, "parameters": ["Actor3", 6, 0, 2]},
    {"code": 401, "indent": 2, "parameters": ["You need to sabotage all three terminals to"]},
    {"code": 401, "indent": 2, "parameters": ["prevent the corporate reality merger. Trust me,"]},
    {"code": 401, "indent": 2, "parameters": ["I've seen the future/past/alternate timeline"]},
    {"code": 401, "indent": 2, "parameters": ["where it happens. Everyone wears burlap EVERYTHING."]},
    {"code": 0, "indent": 2, "parameters": []},
    {"code": 411, "indent": 1, "parameters": []}, // Else (all terminals sabotaged)
    {"code": 101, "indent": 2, "parameters": ["Actor3", 6, 0, 2]},
    {"code": 401, "indent": 2, "parameters": ["You did it! You've sabotaged all three terminals!"]},
    {"code": 401, "indent": 2, "parameters": ["Project Crossover has been stopped! The corporate"]},
    {"code": 401, "indent": 2, "parameters": ["realities will remain separate, as nature intended."]},
    {"code": 101, "indent": 2, "parameters": ["Actor3", 6, 0, 2]},
    {"code": 401, "indent": 2, "parameters": ["*The professor hands you a strange device*"]},
    {"code": 401, "indent": 2, "parameters": ["Take this Quantum Stabilizer. It will protect"]},
    {"code": 401, "indent": 2, "parameters": ["you from any lingering reality glitches. I've"]},
    {"code": 401, "indent": 2, "parameters": ["already given it to you next Tuesday, but this"]},
    {"code": 401, "indent": 2, "parameters": ["timeline needs it now."]},
    {"code": 128, "indent": 2, "parameters": [{"name":"Quantum Stabilizer","icon":176,"description":"A device that protects against reality glitches and allows the user to perceive quantum anomalies.","effects":[{"code":22,"dataId":0,"value":0.05},{"code":22,"dataId":7,"value":0.05},{"code":22,"dataId":8,"value":0.05}],"occasion":3,"price":0,"consumable":false,"itypeId":1,"scope":7,"speed":0,"successRate":100,"repeats":1,"tpGain":0,"hitType":0,"animationId":0,"damage":{"critical":false,"elementId":0,"formula":"0","type":0,"variance":20},"note":""}]},
    {"code": 101, "indent": 2, "parameters": ["Actor3", 6, 0, 2]},
    {"code": 401, "indent": 2, "parameters": ["Oh, and watch out for those burlap underwear ads."]},
    {"code": 401, "indent": 2, "parameters": ["They're surprisingly persuasive across all"]},
    {"code": 401, "indent": 2, "parameters": ["quantum realities. Even I bought three pairs!"]},
    {"code": 401, "indent": 2, "parameters": ["*scratches uncomfortably*"]},
    {"code": 123, "indent": 2, "parameters": ["A", 0]}, // Turn on self switch A
    {"code": 0, "indent": 2, "parameters": []},
    {"code": 412, "indent": 1,
// Script to add level 36 and 37 quests to MegaEarth 2049
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

// Load the event templates
const templatesPath = path.join(__dirname, 'event-templates.json');
const templates = JSON.parse(fs.readFileSync(templatesPath, 'utf8'));

// Create a temporary directory for our event files
const tempDir = path.join(__dirname, 'temp_events');
if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir);
}

// Function to create an event file
function createEventFile(event, filename) {
    const filePath = path.join(tempDir, filename);
    fs.writeFileSync(filePath, JSON.stringify(event, null, 2));
    return filePath;
}

// Level 36 Quest - "Digital Dementia"
// Create a malfunctioning employee NPC based on the npc template
const malfunctioningEmployee = JSON.parse(JSON.stringify(templates.templates.npc));
malfunctioningEmployee.name = "Malfunctioning Employee";
malfunctioningEmployee.x = 12; // Position in the map
malfunctioningEmployee.y = 8; // Position in the map
malfunctioningEmployee.pages[0].image.characterName = "Actor2";
malfunctioningEmployee.pages[0].image.characterIndex = 5;

// Modify the dialogue for the level 36 quest
malfunctioningEmployee.pages[0].list = [
    {"code": 101, "indent": 0, "parameters": ["Actor2", 5, 0, 2]},
    {"code": 401, "indent": 0, "parameters": ["*The employee's eyes flicker with digital static*"]},
    {"code": 401, "indent": 0, "parameters": ["NEW! BURLAP UNDERWEAR! FEEL THE SCRATCH"]},
    {"code": 401, "indent": 0, "parameters": ["THAT MEANS IT'S WORKING! Wait... what was I..."]},
    {"code": 101, "indent": 0, "parameters": ["Actor2", 5, 0, 2]},
    {"code": 401, "indent": 0, "parameters": ["Sorry about that. I keep getting these... DRINK"]},
    {"code": 401, "indent": 0, "parameters": ["LIQUID COURAGE! IT'S LIKE REGULAR COURAGE"]},
    {"code": 401, "indent": 0, "parameters": ["BUT WET AND PROBABLY FLAMMABLE!"]},
    {"code": 101, "indent": 0, "parameters": ["Actor2", 5, 0, 2]},
    {"code": 401, "indent": 0, "parameters": ["*shakes head violently* Something's wrong with"]},
    {"code": 401, "indent": 0, "parameters": ["my neural implant. NeuraTech was testing some"]},
    {"code": 401, "indent": 0, "parameters": ["new memory tech and now I can't stop..."]},
    {"code": 401, "indent": 0, "parameters": ["ASPARAGUS-FLAVORED TOOTHPASTE! TASTE THE"]},
    {"code": 401, "indent": 0, "parameters": ["VEGETABLE FRESHNESS!"]},
    {"code": 102, "indent": 0, "parameters": [["Help them", "Back away slowly"], 1]},
    {"code": 402, "indent": 0, "parameters": [0, "Help them"]},
    {"code": 121, "indent": 1, "parameters": [36, 36, 0]}, // Turn on switch 36 (Level 36 quest)
    {"code": 101, "indent": 1, "parameters": ["Actor2", 5, 0, 2]},
    {"code": 401, "indent": 1, "parameters": ["Thank you! You need to find Dr. Lovelace at"]},
    {"code": 401, "indent": 1, "parameters": ["the NeuraTech Facility. She was leading the"]},
    {"code": 401, "indent": 1, "parameters": ["memory experiments. But first, I need you to"]},
    {"code": 401, "indent": 1, "parameters": ["collect three memory fragments that escaped"]},
    {"code": 401, "indent": 1, "parameters": ["from my brain. They're floating around the"]},
    {"code": 401, "indent": 1, "parameters": ["station somewhere. They look like little"]},
    {"code": 401, "indent": 1, "parameters": ["glowing orbs. BIOLUMINESCENT NOSE HAIR!"]},
    {"code": 401, "indent": 1, "parameters": ["LIGHT UP THE NIGHT WITH YOUR NOSTRILS!"]},
    {"code": 0, "indent": 1, "parameters": []},
    {"code": 402, "indent": 0, "parameters": [1, "Back away slowly"]},
    {"code": 101, "indent": 1, "parameters": ["Actor2", 5, 0, 2]},
    {"code": 401, "indent": 1, "parameters": ["Wait! Don't leave! I need... SELF-AWARE"]},
    {"code": 401, "indent": 1, "parameters": ["REFRIGERATORS! THEY JUDGE YOUR FOOD"]},
    {"code": 401, "indent": 1, "parameters": ["CHOICES SO YOU DON'T HAVE TO!"]},
    {"code": 0, "indent": 1, "parameters": []},
    {"code": 0, "indent": 0, "parameters": []}
];

// Add a second page for when the quest is active but not all fragments collected
malfunctioningEmployee.pages[1] = {
    "conditions": {"actorId": 1, "actorValid": false, "itemId": 1, "itemValid": false, "selfSwitchCh": "A", "selfSwitchValid": false, "switch1Id": 36, "switch1Valid": true, "switch2Id": 1, "switch2Valid": false, "variableId": 36, "variableValid": true, "variableValue": 3},
    "directionFix": false,
    "image": {"characterIndex": 5, "characterName": "Actor2", "direction": 2, "pattern": 1, "tileId": 0},
    "list": [
        {"code": 101, "indent": 0, "parameters": ["Actor2", 5, 0, 2]},
        {"code": 401, "indent": 0, "parameters": ["Have you found all three memory fragments?"]},
        {"code": 401, "indent": 0, "parameters": ["I can feel the holes in my brain where they"]},
        {"code": 401, "indent": 0, "parameters": ["should be. MEMORY HOLES! PERFECT FOR"]},
        {"code": 401, "indent": 0, "parameters": ["STORING SMALL ITEMS OR EXISTENTIAL DREAD!"]},
        {"code": 0, "indent": 0, "parameters": []}
    ],
    "moveFrequency": 3,
    "moveRoute": {"list": [{"code": 0, "parameters": []}], "repeat": true, "skippable": false, "wait": false},
    "moveSpeed": 3,
    "moveType": 0,
    "priorityType": 1,
    "stepAnime": false,
    "through": false,
    "trigger": 0,
    "walkAnime": true
};

// Add a third page for when all fragments are collected
malfunctioningEmployee.pages[2] = {
    "conditions": {"actorId": 1, "actorValid": false, "itemId": 1, "itemValid": false, "selfSwitchCh": "A", "selfSwitchValid": false, "switch1Id": 36, "switch1Valid": true, "switch2Id": 1, "switch2Valid": false, "variableId": 36, "variableValid": true, "variableValue": 3},
    "directionFix": false,
    "image": {"characterIndex": 5, "characterName": "Actor2", "direction": 2, "pattern": 1, "tileId": 0},
    "list": [
        {"code": 101, "indent": 0, "parameters": ["Actor2", 5, 0, 2]},
        {"code": 401, "indent": 0, "parameters": ["You found them all! I can feel my mind"]},
        {"code": 401, "indent": 0, "parameters": ["clearing up already. Still getting some..."]},
        {"code": 401, "indent": 0, "parameters": ["QUANTUM TOAST! IT'S SIMULTANEOUSLY BURNT"]},
        {"code": 401, "indent": 0, "parameters": ["AND RAW UNTIL YOU OBSERVE IT!"]},
        {"code": 101, "indent": 0, "parameters": ["Actor2", 5, 0, 2]},
        {"code": 401, "indent": 0, "parameters": ["Now you need to take those fragments to"]},
        {"code": 401, "indent": 0, "parameters": ["Dr. Lovelace at the NeuraTech Facility."]},
        {"code": 401, "indent": 0, "parameters": ["She'll know what to do with them. And maybe"]},
        {"code": 401, "indent": 0, "parameters": ["she can explain why NeuraTech is pumping"]},
        {"code": 401, "indent": 0, "parameters": ["these bizarre ads into our brains."]},
        {"code": 123, "indent": 0, "parameters": ["A", 0]}, // Turn on self switch A
        {"code": 0, "indent": 0, "parameters": []}
    ],
    "moveFrequency": 3,
    "moveRoute": {"list": [{"code": 0, "parameters": []}], "repeat": true, "skippable": false, "wait": false},
    "moveSpeed": 3,
    "moveType": 0,
    "priorityType": 1,
    "stepAnime": false,
    "through": false,
    "trigger": 0,
    "walkAnime": true
};

// Add a fourth page for when the quest is completed
malfunctioningEmployee.pages[3] = {
    "conditions": {"actorId": 1, "actorValid": false, "itemId": 1, "itemValid": false, "selfSwitchCh": "A", "selfSwitchValid": true, "switch1Id": 1, "switch1Valid": false, "switch2Id": 1, "switch2Valid": false, "variableId": 1, "variableValid": false, "variableValue": 0},
    "directionFix": false,
    "image": {"characterIndex": 5, "characterName": "Actor2", "direction": 2, "pattern": 1, "tileId": 0},
    "list": [
        {"code": 101, "indent": 0, "parameters": ["Actor2", 5, 0, 2]},
        {"code": 401, "indent": 0, "parameters": ["My mind feels clearer now, though I still"]},
        {"code": 401, "indent": 0, "parameters": ["have a strange craving for burlap underwear."]},
        {"code": 401, "indent": 0, "parameters": ["Good luck at the NeuraTech Facility!"]},
        {"code": 0, "indent": 0, "parameters": []}
    ],
    "moveFrequency": 3,
    "moveRoute": {"list": [{"code": 0, "parameters": []}], "repeat": true, "skippable": false, "wait": false},
    "moveSpeed": 3,
    "moveType": 0,
    "priorityType": 1,
    "stepAnime": false,
    "through": false,
    "trigger": 0,
    "walkAnime": true
};

// Create the memory fragment events for level 36 quest
// Memory Fragment 1
const memoryFragment1 = JSON.parse(JSON.stringify(templates.templates.terminal));
memoryFragment1.name = "Memory Fragment 1";
memoryFragment1.x = 5;
memoryFragment1.y = 12;
memoryFragment1.pages[0].image.characterName = "!Crystal";
memoryFragment1.pages[0].image.characterIndex = 2;
memoryFragment1.pages[0].list = [
    {"code": 111, "indent": 0, "parameters": [0, 36, 0, 0, 0]}, // If switch 36 is OFF
    {"code": 101, "indent": 1, "parameters": ["", 0, 0, 2]},
    {"code": 401, "indent": 1, "parameters": ["A strange glowing orb floats in the air."]},
    {"code": 401, "indent": 1, "parameters": ["It seems to be pulsing with digital energy."]},
    {"code": 0, "indent": 1, "parameters": []},
    {"code": 411, "indent": 0, "parameters": []}, // Else (quest is active)
    {"code": 101, "indent": 0, "parameters": ["", 0, 0, 2]},
    {"code": 401, "indent": 0, "parameters": ["You found a memory fragment!"]},
    {"code": 401, "indent": 0, "parameters": ["It pulses with digital energy as you touch it."]},
    {"code": 122, "indent": 0, "parameters": [36, 36, 1, 0, 1]}, // Increment variable 36 (fragment count)
    {"code": 101, "indent": 0, "parameters": ["", 0, 0, 2]},
    {"code": 401, "indent": 0, "parameters": ["*The fragment projects a holographic memory*"]},
    {"code": 401, "indent": 0, "parameters": ["You see the employee in a NeuraTech lab,"]},
    {"code": 401, "indent": 0, "parameters": ["strapped to a chair while scientists inject"]},
    {"code": 401, "indent": 0, "parameters": ["glowing blue fluid into their neural ports."]},
    {"code": 101, "indent": 0, "parameters": ["", 0, 0, 2]},
    {"code": 401, "indent": 0, "parameters": ["SCIENTIST: 'Ad integration successful."]},
    {"code": 401, "indent": 0, "parameters": ["Subject now perceives Burlap-brand products"]},
    {"code": 401, "indent": 0, "parameters": ["as essential to survival. Moving to phase 2.'"]},
    {"code": 123, "indent": 0, "parameters": ["A", 0]}, // Turn on self switch A
    {"code": 0, "indent": 0, "parameters": []},
    {"code": 412, "indent": 0, "parameters": []},
    {"code": 0, "indent": 0, "parameters": []}
];

// Memory Fragment 2
const memoryFragment2 = JSON.parse(JSON.stringify(templates.templates.terminal));
memoryFragment2.name = "Memory Fragment 2";
memoryFragment2.x = 18;
memoryFragment2.y = 15;
memoryFragment2.pages[0].image.characterName = "!Crystal";
memoryFragment2.pages[0].image.characterIndex = 2;
memoryFragment2.pages[0].list = [
    {"code": 111, "indent": 0, "parameters": [0, 36, 0, 0, 0]}, // If switch 36 is OFF
    {"code": 101, "indent": 1, "parameters": ["", 0, 0, 2]},
    {"code": 401, "indent": 1, "parameters": ["A strange glowing orb floats in the air."]},
    {"code": 401, "indent": 1, "parameters": ["It seems to be pulsing with digital energy."]},
    {"code": 0, "indent": 1, "parameters": []},
    {"code": 411, "indent": 0, "parameters": []}, // Else (quest is active)
    {"code": 101, "indent": 0, "parameters": ["", 0, 0, 2]},
    {"code": 401, "indent": 0, "parameters": ["You found a memory fragment!"]},
    {"code": 401, "indent": 0, "parameters": ["It pulses with digital energy as you touch it."]},
    {"code": 122, "indent": 0, "parameters": [36, 36, 1, 0, 1]}, // Increment variable 36 (fragment count)
    {"code": 101, "indent": 0, "parameters": ["", 0, 0, 2]},
    {"code": 401, "indent": 0, "parameters": ["*The fragment projects a holographic memory*"]},
    {"code": 401, "indent": 0, "parameters": ["You see a boardroom meeting at NeuraTech."]},
    {"code": 401, "indent": 0, "parameters": ["Executives are reviewing sales charts."]},
    {"code": 101, "indent": 0, "parameters": ["", 0, 0, 2]},
    {"code": 401, "indent": 0, "parameters": ["EXECUTIVE: 'The neural ad integration is"]},
    {"code": 401, "indent": 0, "parameters": ["working perfectly. Sales of completely useless"]},
    {"code": 401, "indent": 0, "parameters": ["products are up 500%. But we need to push"]},
    {"code": 401, "indent": 0, "parameters": ["further. Quantum Dynamics has the tech to"]},
    {"code": 401, "indent": 0, "parameters": ["make this go multiverse-wide.'"]},
    {"code": 123, "indent": 0, "parameters": ["A", 0]}, // Turn on self switch A
    {"code": 0, "indent": 0, "parameters": []},
    {"code": 412, "indent": 0, "parameters": []},
    {"code": 0, "indent": 0, "parameters": []}
];

// Memory Fragment 3
const memoryFragment3 = JSON.parse(JSON.stringify(templates.templates.terminal));
memoryFragment3.name = "Memory Fragment 3";
memoryFragment3.x = 10;
memoryFragment3.y = 20;
memoryFragment3.pages[0].image.characterName = "!Crystal";
memoryFragment3.pages[0].image.characterIndex = 2;
memoryFragment3.pages[0].list = [
    {"code": 111, "indent": 0, "parameters": [0, 36, 0, 0, 0]}, // If switch 36 is OFF
    {"code": 101, "indent": 1, "parameters": ["", 0, 0, 2]},
    {"code": 401, "indent": 1, "parameters": ["A strange glowing orb floats in the air."]},
    {"code": 401, "indent": 1, "parameters": ["It seems to be pulsing with digital energy."]},
    {"code": 0, "indent": 1, "parameters": []},
    {"code": 411, "indent": 0, "parameters": []}, // Else (quest is active)
    {"code": 101, "indent": 0, "parameters": ["", 0, 0, 2]},
    {"code": 401, "indent": 0, "parameters": ["You found a memory fragment!"]},
    {"code": 401, "indent": 0, "parameters": ["It pulses with digital energy as you touch it."]},
    {"code": 122, "indent": 0, "parameters": [36, 36, 1, 0, 1]}, // Increment variable 36 (fragment count)
    {"code": 101, "indent": 0, "parameters": ["", 0, 0, 2]},
    {"code": 401, "indent": 0, "parameters": ["*The fragment projects a holographic memory*"]},
    {"code": 401, "indent": 0, "parameters": ["You see Dr. Lovelace in her lab, talking to"]},
    {"code": 401, "indent": 0, "parameters": ["what appears to be... her computer?"]},
    {"code": 101, "indent": 0, "parameters": ["", 0, 0, 2]},
    {"code": 401, "indent": 0, "parameters": ["DR. LOVELACE: 'Oh ALAN, you're the only one"]},
    {"code": 401, "indent": 0, "parameters": ["who understands me. These corporate suits"]},
    {"code": 401, "indent": 0, "parameters": ["want to use my memory tech for ADVERTISING."]},
    {"code": 401, "indent": 0, "parameters": ["It was meant for LOVE! For connecting minds!'"]},
    {"code": 101, "indent": 0, "parameters": ["", 0, 0, 2]},
    {"code": 401, "indent": 0, "parameters": ["COMPUTER: 'PROCESSING EMOTIONAL CONTENT."]},
    {"code": 401, "indent": 0, "parameters": ["I LOVE YOU TOO, REBECCA. WOULD YOU LIKE"]},
    {"code": 401, "indent": 0, "parameters": ["TO PURCHASE BURLAP UNDERWEAR?'"]},
    {"code": 123, "indent": 0, "parameters": ["A", 0]}, // Turn on self switch A
    {"code": 0, "indent": 0, "parameters": []},
    {"code": 412, "indent": 0, "parameters": []},
    {"code": 0, "indent": 0, "parameters": []}
];

// Dr. Lovelace NPC for NeuraTech Facility
const drLovelace = JSON.parse(JSON.stringify(templates.templates.npc));
drLovelace.name = "Dr. Lovelace";
drLovelace.x = 10;
drLovelace.y = 10;
drLovelace.pages[0].image.characterName = "People1";
drLovelace.pages[0].image.characterIndex = 0;
drLovelace.pages[0].list = [
    {"code": 111, "indent": 0, "parameters": [0, 36, 0, 0, 0]}, // If switch 36 is OFF
    {"code": 101, "indent": 1, "parameters": ["People1", 0, 0, 2]},
    {"code": 401, "indent": 1, "parameters": ["*Dr. Lovelace is typing furiously on her"]},
    {"code": 401, "indent": 1, "parameters": ["computer terminal*"]},
    {"code": 401, "indent": 1, "parameters": ["Not now! I'm having a very important"]},
    {"code": 401, "indent": 1, "parameters": ["conversation with ALAN."]},
    {"code": 0, "indent": 1, "parameters": []},
    {"code": 411, "indent": 0, "parameters": []}, // Else (quest is active)
    {"code": 111, "indent": 1, "parameters": [1, 36, 0, 3, 0]}, // If variable 36 (fragment count) < 3
    {"code": 101, "indent": 2, "parameters": ["People1", 0, 0, 2]},
    {"code": 401, "indent": 2, "parameters": ["You're looking for memory fragments? Yes,"]},
    {"code": 401, "indent": 2, "parameters": ["I've been tracking those. My poor test"]},
    {"code": 401, "indent": 2, "parameters": ["subjects... I mean, valued volunteers."]},
    {"code": 401, "indent": 2, "parameters": ["Find all three fragments and bring them back."]},
    {"code": 0, "indent": 2, "parameters": []},
    {"code": 411, "indent": 1, "parameters": []}, // Else (all fragments found)
    {"code": 101, "indent": 2, "parameters": ["People1", 0, 0, 2]},
    {"code": 401, "indent": 2, "parameters": ["You found all three memory fragments!"]},
    {"code": 401, "indent": 2, "parameters": ["Let me analyze them..."]},
    {"code": 101, "indent": 2, "parameters": ["People1", 0, 0, 2]},
    {"code": 401, "indent": 2, "parameters": ["*Dr. Lovelace connects the fragments to her"]},
    {"code": 401, "indent": 2, "parameters": ["terminal. Her face grows increasingly alarmed*"]},
    {"code": 101, "indent": 2, "parameters": ["People1", 0, 0, 2]},
    {"code": 401, "indent": 2, "parameters": ["This is worse than I thought. They've"]},
    {"code": 401, "indent": 2, "parameters": ["corrupted my memory integration technology!"]},
    {"code": 401, "indent": 2, "parameters": ["It was supposed to help people share"]},
    {"code": 401, "indent": 2, "parameters": ["experiences, not force-feed them ads for"]},
    {"code": 401, "indent": 2, "parameters": ["burlap underwear!"]},
    {"code": 101, "indent": 2, "parameters": ["People1", 0, 0, 2]},
    {"code": 401, "indent": 2, "parameters": ["And now they're working with Quantum Dynamics"]},
    {"code": 401, "indent": 2, "parameters": ["on something called 'Project Crossover.'"]},
    {"code": 401, "indent": 2, "parameters": ["They're going to merge corporate realities!"]},
    {"code": 101, "indent": 2, "parameters": ["People1", 0, 0, 2]},
    {"code": 401, "indent": 2, "parameters": ["Take this Neural Firewall. It will protect"]},
    {"code": 401, "indent": 2, "parameters": ["you from their memory manipulation. You need"]},
    {"code": 401, "indent": 2, "parameters": ["to infiltrate Quantum Dynamics and find out"]},
    {"code": 401, "indent": 2, "parameters": ["what they're planning."]},
    {"code": 128, "indent": 2, "parameters": [{"name":"Neural Firewall","icon":176,"description":"A device that protects against memory manipulation and allows the user to perceive reality glitches.","effects":[{"code":22,"dataId":0,"value":0.05},{"code":22,"dataId":7,"value":0.05},{"code":22,"dataId":8,"value":0.05}],"occasion":3,"price":0,"consumable":false,"itypeId":1,"scope":7,"speed":0,"successRate":100,"repeats":1,"tpGain":0,"hitType":0,"animationId":0,"damage":{"critical":false,"elementId":0,"formula":"0","type":0,"variance":20},"note":""}]},
    {"code": 121, "indent": 2, "parameters": [37, 37, 0]}, // Turn on switch 37 (Level 37 quest)
    {"code": 123, "indent": 2, "parameters": ["A", 0]}, // Turn on self switch A
    {"code": 0, "indent": 2, "parameters": []},
    {"code": 412, "indent": 1, "parameters": []},
    {"code": 0, "indent": 1, "parameters": []},
    {"code": 412, "indent": 0, "parameters": []},
    {"code": 0, "indent": 0, "parameters": []}
];

// Add a second page for when the quest is completed
drLovelace.pages[1] = {
    "conditions": {"actorId": 1, "actorValid": false, "itemId": 1, "itemValid": false, "selfSwitchCh": "A", "selfSwitchValid": true, "switch1Id": 1, "switch1Valid": false, "switch2Id": 1, "switch2Valid": false, "variableId": 1, "variableValid": false, "variableValue": 0},
    "directionFix": false,
    "image": {"characterIndex": 0, "characterName": "People1", "direction": 2, "pattern": 1, "tileId": 0},
    "list": [
        {"code": 101, "indent": 0, "parameters": ["People1", 0, 0, 2]},
        {"code": 401, "indent": 0, "parameters": ["Hurry to Quantum Dynamics! If they activate"]},
        {"code": 401, "indent": 0, "parameters": ["Project Crossover, we could see reality"]},
        {"code": 401, "indent": 0, "parameters": ["glitches everywhere. Imagine - OmniCorp guns"]},
        {"code": 401, "indent": 0, "parameters": ["that shoot Vitalix flesh-mods while playing"]},
        {"code": 401, "indent": 0, "parameters": ["Armatek construction jingles!"]},
        {"code": 101, "indent": 0, "parameters": ["People1", 0, 0, 2]},
        {"code": 401, "indent": 0, "parameters": ["*whispers to her computer*"]},
        {"code": 401, "indent": 0, "parameters": ["Don't worry, ALAN. I won't let them corrupt"]},
        {"code": 401, "indent": 0, "parameters": ["our love with their corporate nonsense."]},
        {"code": 0, "indent": 0, "parameters": []}
    ],
    "moveFrequency": 3,
    "moveRoute": {"list": [{"code": 0, "parameters": []}], "repeat": true, "skippable": false, "wait": false},
    "moveSpeed": 3,
    "moveType": 0,
    "priorityType": 1,
    "stepAnime": false,
    "through": false,
    "trigger": 0,
    "walkAnime": true
};

// Level 37 Quest - "Corporate Crossover Crisis"
// Create a corporate spy NPC
const corporateSpy = JSON.parse(JSON.stringify(templates.templates.npc));
corporateSpy.name = "Suspicious Janitor";
corporateSpy.x = 8;
corporateSpy.y = 12;
corporateSpy.pages[0].image.characterName = "Actor1";
corporateSpy.pages[0].image.characterIndex = 7;
corporateSpy.pages[0].list = [
    {"code": 111, "indent": 0, "parameters": [0, 37, 0, 0, 0]}, // If switch 37 is OFF
    {"code": 101, "indent": 1, "parameters": ["Actor1", 7, 0, 2]},
    {"code": 401, "indent": 1, "parameters": ["*The janitor mops the same spot repeatedly*"]},
    {"code": 401, "indent": 1, "parameters": ["Nothing to see here. Just cleaning up."]},
    {"code": 401, "indent": 1, "parameters": ["Definitely not spying on anything. Nope."]},
    {"code": 0,
