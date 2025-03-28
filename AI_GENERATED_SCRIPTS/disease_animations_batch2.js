// disease_animations_batch2.js
// Script to set up Yanfly's battle animations for the new diseases (batch 2)
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
    name: "Digital Dementia",
    animation1Name: "StateBuff1",
    animation1Hue: 240,
    animation2Name: "",
    animation2Hue: 0,
    position: 1, // Head
    timings: [
      {
        "flashColor": [0, 0, 255, 128],
        "flashDuration": 10,
        "flashScope": 1,
        "frame": 0,
        "se": {"name": "Computer", "pan": 0, "pitch": 100, "volume": 90}
      }
    ]
  },
  {
    name: "Wi-Fi Allergy",
    animation1Name: "Absorb1",
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
        "se": {"name": "Buzzer2", "pan": 0, "pitch": 150, "volume": 90}
      }
    ]
  },
  {
    name: "Techno-Organic Fusion",
    animation1Name: "Barrier",
    animation1Hue: 180,
    animation2Name: "",
    animation2Hue: 0,
    position: 0, // Whole body
    timings: [
      {
        "flashColor": [0, 255, 255, 128],
        "flashDuration": 10,
        "flashScope": 1,
        "frame": 0,
        "se": {"name": "Paralyze1", "pan": 0, "pitch": 100, "volume": 90}
      }
    ]
  },
  {
    name: "Rad-Hoarder Syndrome",
    animation1Name: "Fire1",
    animation1Hue: 120,
    animation2Name: "",
    animation2Hue: 0,
    position: 0, // Whole body
    timings: [
      {
        "flashColor": [0, 255, 0, 128],
        "flashDuration": 10,
        "flashScope": 1,
        "frame": 0,
        "se": {"name": "Poison", "pan": 0, "pitch": 100, "volume": 90}
      }
    ]
  },
  {
    name: "Wasteland Nostalgia",
    animation1Name: "Mist",
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
        "se": {"name": "Darkness4", "pan": 0, "pitch": 100, "volume": 90}
      }
    ]
  },
  {
    name: "Bunker Fever",
    animation1Name: "StateBuff1",
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
        "se": {"name": "Paralyze2", "pan": 0, "pitch": 100, "volume": 90}
      }
    ]
  },
  {
    name: "Spontaneous Extra Limb",
    animation1Name: "Weapon1",
    animation1Hue: 0,
    animation2Name: "",
    animation2Hue: 0,
    position: 0, // Whole body
    timings: [
      {
        "flashColor": [255, 0, 0, 128],
        "flashDuration": 10,
        "flashScope": 1,
        "frame": 0,
        "se": {"name": "Slash1", "pan": 0, "pitch": 100, "volume": 90}
      }
    ]
  },
  {
    name: "Beneficial Parasites",
    animation1Name: "Absorb2",
    animation1Hue: 0,
    animation2Name: "",
    animation2Hue: 0,
    position: 0, // Whole body
    timings: [
      {
        "flashColor": [255, 0, 255, 128],
        "flashDuration": 10,
        "flashScope": 1,
        "frame": 0,
        "se": {"name": "Absorb1", "pan": 0, "pitch": 100, "volume": 90}
      }
    ]
  },
  {
    name: "Glowing Skin",
    animation1Name: "HitRadiation",
    animation1Hue: 120,
    animation2Name: "",
    animation2Hue: 0,
    position: 0, // Whole body
    timings: [
      {
        "flashColor": [0, 255, 0, 128],
        "flashDuration": 10,
        "flashScope": 1,
        "frame": 0,
        "se": {"name": "Flash1", "pan": 0, "pitch": 100, "volume": 90}
      }
    ]
  },
  {
    name: "Bottle Cap Fever",
    animation1Name: "Coin",
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
        "se": {"name": "Shop1", "pan": 0, "pitch": 100, "volume": 90}
      }
    ]
  },
  {
    name: "Barter Addiction",
    animation1Name: "Coin",
    animation1Hue: 180,
    animation2Name: "",
    animation2Hue: 0,
    position: 1, // Head
    timings: [
      {
        "flashColor": [0, 255, 255, 128],
        "flashDuration": 10,
        "flashScope": 1,
        "frame": 0,
        "se": {"name": "Shop2", "pan": 0, "pitch": 100, "volume": 90}
      }
    ]
  },
  {
    name: "Resource Hoarding",
    animation1Name: "Hammer",
    animation1Hue: 0,
    animation2Name: "",
    animation2Hue: 0,
    position: 0, // Whole body
    timings: [
      {
        "flashColor": [128, 128, 128, 128],
        "flashDuration": 10,
        "flashScope": 1,
        "frame": 0,
        "se": {"name": "Load", "pan": 0, "pitch": 100, "volume": 90}
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
