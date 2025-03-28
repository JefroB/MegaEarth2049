// mental_illness_animations.js
// Script to set up animations for the mental illnesses
// These animations will be used to visualize the mental illnesses in battle

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

// New mental illness animation definitions
const mentalIllnessAnimations = [
  {
    name: "Generalized Anxiety",
    animation1Name: "StateBuff1",
    animation1Hue: 180,
    animation2Name: "",
    animation2Hue: 0,
    position: 0, // Whole body
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
    name: "Social Anxiety",
    animation1Name: "StateBuff1",
    animation1Hue: 270,
    animation2Name: "",
    animation2Hue: 0,
    position: 0, // Whole body
    timings: [
      {
        "flashColor": [128, 128, 255, 128],
        "flashDuration": 5,
        "flashScope": 1,
        "frame": 0,
        "se": {"name": "Collapse1", "pan": 0, "pitch": 150, "volume": 70}
      }
    ]
  },
  {
    name: "Panic Disorder",
    animation1Name: "Blow1",
    animation1Hue: 0,
    animation2Name: "",
    animation2Hue: 0,
    position: 1, // Head
    timings: [
      {
        "flashColor": [255, 128, 128, 128],
        "flashDuration": 5,
        "flashScope": 1,
        "frame": 0,
        "se": {"name": "Crash", "pan": 0, "pitch": 150, "volume": 70}
      }
    ]
  },
  {
    name: "Bipolar Disorder",
    animation1Name: "StateDown1",
    animation1Hue: 180,
    animation2Name: "StateBuff1",
    animation2Hue: 0,
    position: 0, // Whole body
    timings: [
      {
        "flashColor": [255, 128, 255, 128],
        "flashDuration": 5,
        "flashScope": 1,
        "frame": 0,
        "se": {"name": "Flash1", "pan": 0, "pitch": 150, "volume": 70}
      }
    ]
  },
  {
    name: "Clinical Depression",
    animation1Name: "StateDown1",
    animation1Hue: 240,
    animation2Name: "",
    animation2Hue: 0,
    position: 0, // Whole body
    timings: [
      {
        "flashColor": [0, 0, 128, 128],
        "flashDuration": 5,
        "flashScope": 1,
        "frame": 0,
        "se": {"name": "Down1", "pan": 0, "pitch": 100, "volume": 70}
      }
    ]
  },
  {
    name: "Seasonal Affective",
    animation1Name: "StateDown1",
    animation1Hue: 180,
    animation2Name: "",
    animation2Hue: 0,
    position: 0, // Whole body
    timings: [
      {
        "flashColor": [128, 128, 128, 128],
        "flashDuration": 5,
        "flashScope": 1,
        "frame": 0,
        "se": {"name": "Down3", "pan": 0, "pitch": 100, "volume": 70}
      }
    ]
  },
  {
    name: "Schizophrenia",
    animation1Name: "Blind",
    animation1Hue: 180,
    animation2Name: "",
    animation2Hue: 0,
    position: 1, // Head
    timings: [
      {
        "flashColor": [255, 128, 255, 128],
        "flashDuration": 5,
        "flashScope": 1,
        "frame": 0,
        "se": {"name": "Starlight", "pan": 0, "pitch": 150, "volume": 70}
      }
    ]
  },
  {
    name: "Paranoia",
    animation1Name: "Blind",
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
        "se": {"name": "Buzzer2", "pan": 0, "pitch": 150, "volume": 70}
      }
    ]
  },
  {
    name: "Dissociative Identity",
    animation1Name: "Blind",
    animation1Hue: 270,
    animation2Name: "",
    animation2Hue: 0,
    position: 1, // Head
    timings: [
      {
        "flashColor": [255, 255, 255, 128],
        "flashDuration": 5,
        "flashScope": 1,
        "frame": 0,
        "se": {"name": "Reflection", "pan": 0, "pitch": 150, "volume": 70}
      }
    ]
  },
  {
    name: "ADHD",
    animation1Name: "Blow1",
    animation1Hue: 180,
    animation2Name: "",
    animation2Hue: 0,
    position: 1, // Head
    timings: [
      {
        "flashColor": [255, 255, 128, 128],
        "flashDuration": 5,
        "flashScope": 1,
        "frame": 0,
        "se": {"name": "Jump1", "pan": 0, "pitch": 150, "volume": 70}
      }
    ]
  },
  {
    name: "Autism Spectrum",
    animation1Name: "StateBuff1",
    animation1Hue: 90,
    animation2Name: "",
    animation2Hue: 0,
    position: 1, // Head
    timings: [
      {
        "flashColor": [128, 255, 128, 128],
        "flashDuration": 5,
        "flashScope": 1,
        "frame": 0,
        "se": {"name": "Twine", "pan": 0, "pitch": 150, "volume": 70}
      }
    ]
  },
  {
    name: "OCD",
    animation1Name: "StateBuff1",
    animation1Hue: 0,
    animation2Name: "",
    animation2Hue: 0,
    position: 0, // Whole body
    timings: [
      {
        "flashColor": [255, 255, 255, 128],
        "flashDuration": 5,
        "flashScope": 1,
        "frame": 0,
        "se": {"name": "Clock", "pan": 0, "pitch": 150, "volume": 70}
      }
    ]
  },
  {
    name: "Narcissistic Personality",
    animation1Name: "StateBuff1",
    animation1Hue: 60,
    animation2Name: "",
    animation2Hue: 0,
    position: 0, // Whole body
    timings: [
      {
        "flashColor": [255, 255, 0, 128],
        "flashDuration": 5,
        "flashScope": 1,
        "frame": 0,
        "se": {"name": "Applause1", "pan": 0, "pitch": 150, "volume": 70}
      }
    ]
  },
  {
    name: "Borderline Personality",
    animation1Name: "StateBuff1",
    animation1Hue: 300,
    animation2Name: "",
    animation2Hue: 0,
    position: 0, // Whole body
    timings: [
      {
        "flashColor": [255, 128, 255, 128],
        "flashDuration": 5,
        "flashScope": 1,
        "frame": 0,
        "se": {"name": "Collapse2", "pan": 0, "pitch": 150, "volume": 70}
      }
    ]
  },
  {
    name: "Agoraphobia",
    animation1Name: "StateDown1",
    animation1Hue: 0,
    animation2Name: "",
    animation2Hue: 0,
    position: 0, // Whole body
    timings: [
      {
        "flashColor": [128, 128, 255, 128],
        "flashDuration": 5,
        "flashScope": 1,
        "frame": 0,
        "se": {"name": "Collapse3", "pan": 0, "pitch": 150, "volume": 70}
      }
    ]
  }
];

// Add the new animations to the animations array
for (let i = 0; i < mentalIllnessAnimations.length; i++) {
  const animation = mentalIllnessAnimations[i];
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

console.log(`Added ${mentalIllnessAnimations.length} new animations to Animations.json`);
