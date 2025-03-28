// minor_ailment_animations.js
// Script to set up animations for the minor ailments
// These are simpler animations than the disease animations

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

// New minor ailment animation definitions
const ailmentAnimations = [
  {
    name: "Chronic Hiccups",
    animation1Name: "Breath",
    animation1Hue: 0,
    animation2Name: "",
    animation2Hue: 0,
    position: 1, // Head
    timings: [
      {
        "flashColor": [255, 255, 255, 128],
        "flashDuration": 5,
        "flashScope": 1,
        "frame": 0,
        "se": {"name": "Jump1", "pan": 0, "pitch": 150, "volume": 70}
      }
    ]
  },
  {
    name: "Seasonal Allergies",
    animation1Name: "Blow1",
    animation1Hue: 0,
    animation2Name: "",
    animation2Hue: 0,
    position: 1, // Head
    timings: [
      {
        "flashColor": [255, 255, 255, 128],
        "flashDuration": 5,
        "flashScope": 1,
        "frame": 0,
        "se": {"name": "Wind1", "pan": 0, "pitch": 150, "volume": 70}
      }
    ]
  },
  {
    name: "Bedhead",
    animation1Name: "StateBuff1",
    animation1Hue: 0,
    animation2Name: "",
    animation2Hue: 0,
    position: 1, // Head
    timings: [
      {
        "flashColor": [255, 255, 255, 128],
        "flashDuration": 5,
        "flashScope": 1,
        "frame": 0,
        "se": {"name": "Twine", "pan": 0, "pitch": 100, "volume": 70}
      }
    ]
  },
  {
    name: "Bad Breath",
    animation1Name: "Breath",
    animation1Hue: 120,
    animation2Name: "",
    animation2Hue: 0,
    position: 1, // Head
    timings: [
      {
        "flashColor": [0, 255, 0, 128],
        "flashDuration": 5,
        "flashScope": 1,
        "frame": 0,
        "se": {"name": "Poison", "pan": 0, "pitch": 100, "volume": 70}
      }
    ]
  },
  {
    name: "Excessive Sweating",
    animation1Name: "Water1",
    animation1Hue: 0,
    animation2Name: "",
    animation2Hue: 0,
    position: 0, // Whole body
    timings: [
      {
        "flashColor": [0, 0, 255, 128],
        "flashDuration": 5,
        "flashScope": 1,
        "frame": 0,
        "se": {"name": "Water1", "pan": 0, "pitch": 100, "volume": 70}
      }
    ]
  },
  {
    name: "Athlete's Foot",
    animation1Name: "Poison1",
    animation1Hue: 0,
    animation2Name: "",
    animation2Hue: 0,
    position: 2, // Center
    timings: [
      {
        "flashColor": [255, 0, 0, 128],
        "flashDuration": 5,
        "flashScope": 1,
        "frame": 0,
        "se": {"name": "Scratch", "pan": 0, "pitch": 100, "volume": 70}
      }
    ]
  },
  {
    name: "Persistent Cough",
    animation1Name: "Breath",
    animation1Hue: 0,
    animation2Name: "",
    animation2Hue: 0,
    position: 1, // Head
    timings: [
      {
        "flashColor": [255, 255, 255, 128],
        "flashDuration": 5,
        "flashScope": 1,
        "frame": 0,
        "se": {"name": "Blow1", "pan": 0, "pitch": 100, "volume": 70}
      }
    ]
  },
  {
    name: "Eye Twitch",
    animation1Name: "StateBuff1",
    animation1Hue: 0,
    animation2Name: "",
    animation2Hue: 0,
    position: 1, // Head
    timings: [
      {
        "flashColor": [255, 255, 255, 128],
        "flashDuration": 5,
        "flashScope": 1,
        "frame": 0,
        "se": {"name": "Buzzer1", "pan": 0, "pitch": 150, "volume": 70}
      }
    ]
  },
  {
    name: "Runny Nose",
    animation1Name: "Water1",
    animation1Hue: 0,
    animation2Name: "",
    animation2Hue: 0,
    position: 1, // Head
    timings: [
      {
        "flashColor": [0, 0, 255, 128],
        "flashDuration": 5,
        "flashScope": 1,
        "frame": 0,
        "se": {"name": "Liquid", "pan": 0, "pitch": 150, "volume": 70}
      }
    ]
  },
  {
    name: "Acne Breakout",
    animation1Name: "Poison1",
    animation1Hue: 0,
    animation2Name: "",
    animation2Hue: 0,
    position: 1, // Head
    timings: [
      {
        "flashColor": [255, 0, 0, 128],
        "flashDuration": 5,
        "flashScope": 1,
        "frame": 0,
        "se": {"name": "Damage1", "pan": 0, "pitch": 150, "volume": 70}
      }
    ]
  },
  {
    name: "Laryngitis",
    animation1Name: "Breath",
    animation1Hue: 180,
    animation2Name: "",
    animation2Hue: 0,
    position: 1, // Head
    timings: [
      {
        "flashColor": [128, 128, 128, 128],
        "flashDuration": 5,
        "flashScope": 1,
        "frame": 0,
        "se": {"name": "Whistle", "pan": 0, "pitch": 50, "volume": 40}
      }
    ]
  }
];

// Add the new animations to the animations array
for (let i = 0; i < ailmentAnimations.length; i++) {
  const animation = ailmentAnimations[i];
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

console.log(`Added ${ailmentAnimations.length} new animations to Animations.json`);
