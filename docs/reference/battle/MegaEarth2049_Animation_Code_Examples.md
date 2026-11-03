> Reference snapshot: verify IDs, effects and enabled-plugin behavior against the live data and current FAQs. This relocation does not certify the older catalog as current.

# MegaEarth2049 Animation Code Examples

This document provides practical code examples for working with animations in RPG Maker MV. These examples will help you understand the structure of animations and how to use them in your game.

## Table of Contents
- [Basic Animation Structure](#basic-animation-structure)
- [Elemental Animation Example](#elemental-animation-example)
- [Using Animations in Events](#using-animations-in-events)
- [Using Animations in Battle](#using-animations-in-battle)
- [Creating Animations Programmatically](#creating-animations-programmatically)
- [Modifying Existing Animations](#modifying-existing-animations)
- [Common Animation Patterns](#common-animation-patterns)

## Basic Animation Structure

Here's a breakdown of a basic physical hit animation (ID: 1):

```javascript
{
  "id": 1,                      // Unique identifier
  "name": "Hit Physical",       // Display name
  "position": 1,                // Position (1 = target)
  "animation1Name": "Hit1",     // Primary graphic
  "animation1Hue": 0,           // Hue adjustment (0-360)
  "animation2Name": "",         // Secondary graphic (none used)
  "animation2Hue": 0,           // Secondary hue adjustment
  "frames": [                   // Animation frame data
    [],                         // Frame 0 (empty)
    [                           // Frame 1
      [0,0,0,250,0,0,255,1],    // Cell 0: [pattern, x, y, zoom, rotation, opacity, blendMode]
      [-1,0,0,0,0,0,0,0],       // Cell 1: not displayed (-1 pattern)
      [-1,0,0,0,0,0,0,0],       // Cell 2: not displayed
      [-1,0,0,0,0,0,0,0]        // Cell 3: not displayed
    ],
    [[1,0,0,200,0,0,255,1]],    // Frame 2: Cell 0 with pattern 1
    [[2,0,0,200,0,0,255,1]],    // Frame 3: Cell 0 with pattern 2
    [[3,0,0,200,0,0,255,1]]     // Frame 4: Cell 0 with pattern 3
  ],
  "timings": [                  // Special timing effects
    {
      "frame": 0,               // Frame when effect occurs
      "se": {                   // Sound effect
        "name": "Blow3",        // Sound file name
        "volume": 90,           // Volume (0-100)
        "pitch": 100,           // Pitch (50-150)
        "pan": 0                // Stereo pan (-100 to 100)
      },
      "flashScope": 1,          // Flash scope (0=none, 1=target, 2=screen, 3=hide target)
      "flashColor": [255,255,255,255], // Flash color (RGBA)
      "flashDuration": 2        // Flash duration in frames
    }
  ]
}
```

### Understanding Frame Data

Each frame in the animation contains an array of cell data. Each cell represents a sprite from the animation sheet:

```javascript
// Cell data format:
[pattern, x, y, zoom, rotation, opacity, blendMode]

// Example:
[0, 0, 0, 250, 0, 0, 255, 1]
// pattern = 0 (first sprite in the animation sheet)
// x = 0 (x position offset)
// y = 0 (y position offset)
// zoom = 250 (250% size)
// rotation = 0 (no rotation)
// opacity = 255 (fully opaque)
// blendMode = 1 (normal blend)
```

### Understanding Position Values

The `position` property determines where the animation is displayed:

- `0`: Screen (centered on screen)
- `1`: Target (centered on the target)
- `2`: Center (centered between user and target)
- `3`: Behind (displayed behind the target)

## Elemental Animation Example

Here's an example of a fire elemental animation (ID: 3):

```javascript
{
  "id": 3,
  "name": "Hit Fire",
  "position": 1,                // Target
  "animation1Name": "Hit2",     // Base hit graphic
  "animation1Hue": 0,
  "animation2Name": "HitFire",  // Fire effect overlay
  "animation2Hue": 0,
  // frames data omitted for brevity
  "timings": [
    {
      "frame": 0,
      "se": {"name": "Fire1", "volume": 100, "pitch": 100, "pan": 0},
      "flashScope": 0,
      "flashColor": [255,255,255,255],
      "flashDuration": 5
    },
    {
      "frame": 0,
      "se": {"name": "Blow3", "volume": 100, "pitch": 100, "pan": 0},
      "flashScope": 1,
      "flashColor": [255,119,102,221],  // Reddish flash for fire
      "flashDuration": 3
    },
    {
      "frame": 2,
      "se": null,
      "flashScope": 2,          // Screen flash
      "flashColor": [255,136,51,153],   // Orange glow
      "flashDuration": 5
    }
  ]
}
```

### Multiple Timing Effects

Note that elemental animations often have multiple timing effects:
1. Initial sound effect
2. Target flash with element color
3. Screen flash with element color

## Using Animations in Events

Animations can be played during events using the "Show Animation" event command:

```javascript
// Example of using animations in an event command
// This would be part of an event's command list
{
  "code": 337,           // Show Animation code
  "indent": 0,
  "parameters": [
    1,                   // Target (0=player, 1=event)
    3,                   // Animation ID (3 = Hit Fire)
    false                // Wait for completion (false=don't wait)
  ]
}
```

### Event Script Call

You can also play animations using script calls in events:

```javascript
// Play animation 3 on event ID 5
$gameTemp.requestAnimation([$gameMap.event(5)], 3);

// Play animation 7 on the player
$gameTemp.requestAnimation([$gamePlayer], 7);

// Play animation 10 on multiple events
$gameTemp.requestAnimation([$gameMap.event(3), $gameMap.event(4)], 10);
```

## Using Animations in Battle

Animations are automatically played in battle when skills or items are used. The animation is specified in the skill or item definition:

```javascript
// Example skill definition (from data/Skills.json)
{
  "id": 7,
  "animationId": 3,      // Animation ID to play (3 = Hit Fire)
  "damage": {
    "critical": true,
    "elementId": 2,      // Element ID (2 = Fire)
    "formula": "a.atk * 4 - b.def * 2",
    "type": 1,
    "variance": 20
  },
  "description": "Deals fire damage to one enemy",
  "effects": [],
  "hitType": 1,
  "iconIndex": 64,
  "message1": "%1 casts %2!",
  "message2": "%1 takes %2 damage!",
  "mpCost": 8,
  "name": "Fire",
  "note": "",
  "occasion": 1,
  "repeats": 1,
  "requiredWtypeId1": 0,
  "requiredWtypeId2": 0,
  "scope": 1,
  "speed": 0,
  "stypeId": 1,
  "successRate": 100,
  "tpCost": 0,
  "tpGain": 10
}
```

### Battle Script Call

You can also play animations directly in battle using script calls:

```javascript
// Play animation 5 on the first enemy
$gameTemp.requestAnimation([$gameTroop.members()[0]], 5);

// Play animation 8 on the entire party
$gameTemp.requestAnimation($gameParty.members(), 8);

// Play animation 12 on a specific actor (ID 2)
$gameTemp.requestAnimation([$gameActors.actor(2)], 12);
```

## Creating Animations Programmatically

You can create new animations programmatically in a plugin:

```javascript
// Example of creating a new animation programmatically
var newAnimation = {
  id: $dataAnimations.length,  // Use next available ID
  name: "Custom Lightning",
  position: 1,                 // Target
  animation1Name: "Thunder1",
  animation1Hue: 0,
  animation2Name: "",
  animation2Hue: 0,
  frames: [
    // Frame data would go here
    [],
    [[0,0,0,200,0,0,255,1]],
    [[1,0,0,200,0,0,255,1]],
    [[2,0,0,200,0,0,255,1]],
    [[3,0,0,200,0,0,255,1]]
  ],
  timings: [
    {
      frame: 0,
      se: {name: "Thunder8", volume: 90, pitch: 100, pan: 0},
      flashScope: 2,           // Screen flash
      flashColor: [255,255,221,170],  // Yellow-white flash
      flashDuration: 5
    }
  ]
};

// Add the new animation to the database
$dataAnimations.push(newAnimation);

// Play the animation on a target
var target = $gamePlayer;  // Or could be a battler in battle
$gameTemp.requestAnimation([target], newAnimation.id);
```

## Modifying Existing Animations

You can also modify existing animations:

```javascript
// Example of modifying an existing animation
// This could be used in a plugin
var originalAnimation = $dataAnimations[3];  // Get the Fire animation
var modifiedAnimation = JSON.parse(JSON.stringify(originalAnimation));  // Deep copy

// Modify properties
modifiedAnimation.id = $dataAnimations.length;  // New ID
modifiedAnimation.name = "Enhanced Fire";
modifiedAnimation.animation1Hue = 20;  // Slightly shift the hue

// Add an additional flash effect
modifiedAnimation.timings.push({
  frame: 4,
  se: {name: "Explosion1", volume: 90, pitch: 100, pan: 0},
  flashScope: 2,
  flashColor: [255,60,30,200],  // Intense red flash
  flashDuration: 10
});

// Add the modified animation to the database
$dataAnimations.push(modifiedAnimation);
```

## Common Animation Patterns

### Screen Flash Pattern

```javascript
// Add a screen flash effect
animation.timings.push({
  frame: 0,
  se: null,  // No sound
  flashScope: 2,  // Screen
  flashColor: [255,255,255,170],  // White, semi-transparent
  flashDuration: 3
});
```

### Target Flash Pattern

```javascript
// Add a target flash effect
animation.timings.push({
  frame: 0,
  se: null,  // No sound
  flashScope: 1,  // Target
  flashColor: [255,0,0,170],  // Red, semi-transparent
  flashDuration: 3
});
```

### Sound Effect Pattern

```javascript
// Add a sound effect
animation.timings.push({
  frame: 0,
  se: {name: "Explosion1", volume: 90, pitch: 100, pan: 0},
  flashScope: 0,  // No flash
  flashColor: [0,0,0,0],
  flashDuration: 0
});
```

### Rotation Effect

```javascript
// Create a rotating effect in frame data
var frames = [];
for (var i = 0; i < 20; i++) {
  var rotation = i * 18;  // Increase rotation by 18 degrees each frame
  frames.push([[0, 0, 0, 100, rotation, 0, 255, 1]]);
}
animation.frames = frames;
```

### Zoom Effect

```javascript
// Create a zoom-in effect in frame data
var frames = [];
for (var i = 0; i < 10; i++) {
  var zoom = 50 + (i * 15);  // Start at 50% and increase by 15% each frame
  frames.push([[0, 0, 0, zoom, 0, 0, 255, 1]]);
}
animation.frames = frames;
```

---

*This documentation was created on April 19, 2025 for the MegaEarth2049 project.*
