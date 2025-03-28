// disease_animations.js
// Script to set up Yanfly's battle animations for the new diseases
// This script will create animation settings for the new diseases

const fs = require('fs');
const path = require('path');

// Load the Animations.json file
const animationsPath = path.join('data', 'Animations.json');
let animations = JSON.parse(fs.readFileSync(animationsPath, 'utf8'));

// Find the highest ID currently in use
let highestId = 0;
for (let i = 0; i < animations.length; i++) {
  if (animations[i] && animations[i].id) {
    highestId = Math.max(highestId, animations[i].id);
  }
}

// New disease animation definitions
const diseaseAnimations = [
  {
    name: "Narcolepsy",
    animation1Name: "Sleep",
    animation1Hue: 0,
    animation2Name: "",
    animation2Hue: 0,
    position: 1, // Head
    timings: [
      {
        "flashColor": [255, 255, 255, 128],
        "flashDuration": 10,
        "flashScope": 1,
        "frame": 0,
        "se": {"name": "Sleep", "pan": 0, "pitch": 100, "volume": 90}
      }
    ]
  },
  {
    name: "Tourette's",
    animation1Name: "Anger",
    animation1Hue: 0,
    animation2Name: "",
    animation2Hue: 0,
    position: 1, // Head
    timings: [
      {
        "flashColor": [255, 0, 0, 128],
        "flashDuration": 10,
        "flashScope": 1,
        "frame": 0,
        "se": {"name": "Buzzer1", "pan": 0, "pitch": 100, "volume": 90}
      }
    ]
  },
  {
    name: "Hypochondria",
    animation1Name: "StateBuff1",
    animation1Hue: 180,
    animation2Name: "",
    animation2Hue: 0,
    position: 3, // Full screen
    timings: [
      {
        "flashColor": [0, 255, 255, 128],
        "flashDuration": 10,
        "flashScope": 1,
        "frame": 0,
        "se": {"name": "Recovery", "pan": 0, "pitch": 100, "volume": 90}
      }
    ]
  },
  {
    name: "Stockholm Syndrome",
    animation1Name: "Heal1",
    animation1Hue: 300,
    animation2Name: "",
    animation2Hue: 0,
    position: 1, // Head
    timings: [
      {
        "flashColor": [255, 0, 255, 128],
        "flashDuration": 10,
        "flashScope": 1,
        "frame": 0,
        "se": {"name": "Heal1", "pan": 0, "pitch": 100, "volume": 90}
      }
    ]
  },
  {
    name: "Munchausen",
    animation1Name: "StateDown1",
    animation1Hue: 0,
    animation2Name: "",
    animation2Hue: 0,
    position: 1, // Head
    timings: [
      {
        "flashColor": [128, 128, 128, 128],
        "flashDuration": 10,
        "flashScope": 1,
        "frame": 0,
        "se": {"name": "Evasion1", "pan": 0, "pitch": 100, "volume": 90}
      }
    ]
  },
  {
    name: "Phantom Limb",
    animation1Name: "Hit1",
    animation1Hue: 180,
    animation2Name: "",
    animation2Hue: 0,
    position: 2, // Center
    timings: [
      {
        "flashColor": [0, 0, 255, 128],
        "flashDuration": 10,
        "flashScope": 1,
        "frame": 0,
        "se": {"name": "Miss", "pan": 0, "pitch": 100, "volume": 90}
      }
    ]
  },
  {
    name: "Progeria",
    animation1Name: "Aging",
    animation1Hue: 0,
    animation2Name: "",
    animation2Hue: 0,
    position: 1, // Head
    timings: [
      {
        "flashColor": [255, 255, 0, 128],
        "flashDuration": 10,
        "flashScope": 1,
        "frame": 0,
        "se": {"name": "Earth4", "pan": 0, "pitch": 100, "volume": 90}
      }
    ]
  },
  {
    name: "Synesthesia",
    animation1Name: "Blind",
    animation1Hue: 180,
    animation2Name: "",
    animation2Hue: 0,
    position: 1, // Head
    timings: [
      {
        "flashColor": [255, 0, 255, 128],
        "flashDuration": 10,
        "flashScope": 1,
        "frame": 0,
        "se": {"name": "Reflection", "pan": 0, "pitch": 100, "volume": 90}
      }
    ]
  },
  {
    name: "Affluenza",
    animation1Name: "Coin",
    animation1Hue: 0,
    animation2Name: "",
    animation2Hue: 0,
    position: 3, // Full screen
    timings: [
      {
        "flashColor": [255, 255, 0, 128],
        "flashDuration": 10,
        "flashScope": 1,
        "frame": 0,
        "se": {"name": "Shop1", "pan": 0, "pitch": 100, "volume": 90}
      }
    ]
  },
  {
    name: "Impostor Syndrome",
    animation1Name: "Debuff1",
    animation1Hue: 0,
    animation2Name: "",
    animation2Hue: 0,
    position: 1, // Head
    timings: [
      {
        "flashColor": [128, 128, 255, 128],
        "flashDuration": 10,
        "flashScope": 1,
        "frame": 0,
        "se": {"name": "Collapse1", "pan": 0, "pitch": 100, "volume": 90}
      }
    ]
  }
];

// Add the new animations to the animations array
for (let i = 0; i < diseaseAnimations.length; i++) {
  const animation = diseaseAnimations[i];
  const id = highestId + i + 1;
  
  // Create the animation object
  const animationObj = {
    "id": id,
    "animation1Hue": animation.animation1Hue,
    "animation1Name": animation.animation1Name,
    "animation2Hue": animation.animation2Hue,
    "animation2Name": animation.animation2Name,
    "frames": [],
    "name": animation.name,
    "position": animation.position,
    "timings": animation.timings
  };
  
  // Create empty frames
  for (let j = 0; j < 16; j++) {
    animationObj.frames.push([
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ]);
  }
  
  // Add the animation to the animations array
  animations.push(animationObj);
  
  console.log(`Added animation: ${animation.name} with ID ${id}`);
}

// Write the updated animations array back to the file
fs.writeFileSync(animationsPath, JSON.stringify(animations, null, 4));

console.log(`Added ${diseaseAnimations.length} new animations to Animations.json`);
