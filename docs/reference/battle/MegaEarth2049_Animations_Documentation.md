> Reference snapshot: verify IDs, effects and enabled-plugin behavior against the live data and current FAQs. This relocation does not certify the older catalog as current.

# MegaEarth2049 Animations.json Documentation

## Table of Contents
- [Overview](#overview)
- [Animations.json Structure](#animationsjson-structure)
- [Animation Properties](#animation-properties)
- [Frame Data Structure](#frame-data-structure)
- [Timing Data Structure](#timing-data-structure)
- [Animation Categories](#animation-categories)
- [Integration with Other Systems](#integration-with-other-systems)
- [Creating and Modifying Animations](#creating-and-modifying-animations)
- [Best Practices](#best-practices)
- [Future Enhancement Opportunities](#future-enhancement-opportunities)

## Overview

The `Animations.json` file is a core component of the MegaEarth2049 RPG Maker MV project, defining all battle animations used in the game. These animations are visual effects that play when skills, items, or other actions are performed during battle. The file contains a comprehensive collection of animations ranging from basic attacks to elaborate elemental and special effects.

This documentation provides a detailed explanation of:
1. The structure and properties of animations in the JSON file
2. How animations are organized and categorized
3. How animations integrate with skills and other game systems
4. Best practices for creating and modifying animations

## Animations.json Structure

### Basic Structure

The `Animations.json` file is an array of animation objects, with the first element (index 0) being `null`. Each subsequent element defines a specific animation with a unique ID.

```json
[
  null,
  {
    "id": 1,
    "animation1Hue": 0,
    "animation1Name": "Hit1",
    "animation2Hue": 0,
    "animation2Name": "",
    "frames": [...],
    "name": "Hit Physical",
    "position": 1,
    "timings": [...]
  },
  {
    "id": 2,
    "animation1Hue": 0,
    "animation1Name": "Hit1",
    "animation2Hue": 0,
    "animation2Name": "HitPhoton",
    "frames": [...],
    "name": "Hit Effect",
    "position": 1,
    "timings": [...]
  },
  // Additional animations...
]
```

## Animation Properties

Each animation object contains the following properties:

| Property | Description | Example |
|----------|-------------|---------|
| `id` | Unique identifier for the animation | `1` |
| `animation1Name` | Name of the first animation graphic file | `"Hit1"` |
| `animation1Hue` | Hue adjustment for the first animation graphic (0-360) | `0` |
| `animation2Name` | Name of the second animation graphic file (optional) | `"HitPhoton"` |
| `animation2Hue` | Hue adjustment for the second animation graphic (0-360) | `0` |
| `frames` | Array of frame data defining the animation sequence | See [Frame Data Structure](#frame-data-structure) |
| `name` | Display name of the animation | `"Hit Physical"` |
| `position` | Position setting (0: screen, 1: target, 2: center, 3: behind) | `1` |
| `timings` | Array of timing data for effects like flashes and sounds | See [Timing Data Structure](#timing-data-structure) |

### Position Values

The `position` property determines where the animation is displayed:

| Value | Position | Description |
|-------|----------|-------------|
| `0` | Screen | Animation plays on the entire screen |
| `1` | Target | Animation plays on the target |
| `2` | Center | Animation plays in the center of the screen |
| `3` | Behind | Animation plays behind the target |

## Frame Data Structure

The `frames` property contains an array of frame data, where each element represents a single frame in the animation. Each frame is an array of cell data, where each cell defines the properties of a specific animation cell.

```json
"frames": [
  [],  // Frame 0 (often empty)
  [    // Frame 1
    [0, 0, 250, 0, 0, 255, 1],  // Cell 1
    [-1, 0, 0, 0, 0, 0, 0]      // Cell 2
  ],
  [    // Frame 2
    [10, 0, 200, 0, 0, 255, 1]  // Cell 1
  ],
  // Additional frames...
]
```

Each cell is an array with the following structure:

| Index | Property | Description | Example |
|-------|----------|-------------|---------|
| 0 | Pattern | Index of the pattern in the animation graphic (0-15) | `0` |
| 1 | X | X-coordinate of the cell | `0` |
| 2 | Y | Y-coordinate of the cell | `250` |
| 3 | Scale X | Horizontal scaling (0-100) | `0` |
| 4 | Scale Y | Vertical scaling (0-100) | `0` |
| 5 | Opacity | Opacity of the cell (0-255) | `255` |
| 6 | Blend Mode | Blend mode (0: normal, 1: additive, 2: multiply, 3: screen) | `1` |

A value of `-1` for the pattern index indicates that the cell is not displayed.

## Timing Data Structure

The `timings` property contains an array of timing data, where each element defines when special effects like flashes and sounds occur during the animation.

```json
"timings": [
  {
    "flashColor": [255, 255, 255, 255],
    "flashDuration": 2,
    "flashScope": 1,
    "frame": 0,
    "se": {
      "name": "Blow3",
      "pan": 0,
      "pitch": 100,
      "volume": 90
    }
  },
  // Additional timings...
]
```

Each timing object contains the following properties:

| Property | Description | Example |
|----------|-------------|---------|
| `flashColor` | RGBA color for the flash effect [R, G, B, A] | `[255, 255, 255, 255]` |
| `flashDuration` | Duration of the flash effect in frames | `2` |
| `flashScope` | Scope of the flash effect (0: none, 1: target, 2: screen) | `1` |
| `frame` | Frame number when the effect occurs | `0` |
| `se` | Sound effect to play | See below |

The `se` (sound effect) object contains:

| Property | Description | Example |
|----------|-------------|---------|
| `name` | Name of the sound effect file | `"Blow3"` |
| `pan` | Pan setting (-100 to 100, 0 is center) | `0` |
| `pitch` | Pitch setting (50 to 150, 100 is normal) | `100` |
| `volume` | Volume setting (0 to 100) | `90` |

## Animation Categories

The animations in MegaEarth2049 are organized into several categories based on their visual effects and usage:

### 1. Basic Attack Animations (IDs 1-20)

These animations represent basic physical attacks and are often used with the default Attack command or physical skills.

| ID | Name | Description | Usage |
|----|------|-------------|-------|
| 1 | Hit Physical | Basic physical hit effect | Default Attack skill |
| 2 | Hit Effect | Enhanced hit with photon effect | Physical skills with special effects |
| 6 | Slash Physical | Basic slash effect | Sword skills |
| 7 | Slash Effect | Enhanced slash with photon effect | Special sword skills |
| 11 | Pierce Physical | Basic piercing effect | Spear and piercing weapon skills |
| 16 | Claw Physical | Basic claw attack effect | Claw and natural weapon skills |

### 2. Elemental Animations (IDs 3-5, 8-10, 13-15, etc.)

These animations represent elemental effects and are used with elemental magic and skills.

| Element | Basic (Single) | Medium (Single) | Strong (AoE) |
|---------|----------------|-----------------|--------------|
| Fire | Hit Fire (3) | Slash Fire (8) | Pierce Fire (13) |
| Ice | Hit Ice (4) | Slash Ice (9) | Pierce Ice (14) |
| Thunder | Hit Thunder (5) | Slash Thunder (10) | Pierce Thunder (15) |
| Water | Water One 1 (81) | Water One 2 (82) | Water All 1 (83) |
| Earth | Earth One 1 (86) | Earth One 2 (87) | Earth All 1 (88) |
| Wind | Wind One 1 (91) | Wind One 2 (92) | Wind All 1 (93) |
| Light | Light One 1 (96) | Light One 2 (97) | Light All 1 (98) |

### 3. Special Effect Animations (IDs 21-40)

These animations represent special effects like healing, buffs, debuffs, and status effects.

### 4. Powerful Attack Animations (IDs 41-80)

These animations represent powerful attacks and are often used with high-level skills and limit breaks.

### 5. Environmental Effect Animations (IDs 81-100)

These animations represent environmental effects like water, earth, wind, and light.

## Integration with Other Systems

### Integration with Skills.json

Animations are referenced in the `Skills.json` file through the `animationId` property. When a skill is used in battle, the corresponding animation is played.

```json
{
  "id": 9,
  "animationId": 66,
  "damage": {
    "critical": false,
    "elementId": 2,
    "formula": "100 + a.mat * 2",
    "type": 1,
    "variance": 20
  },
  "name": "Fire",
  // Other skill properties...
}
```

In this example, the "Fire" skill uses animation ID 66, which would be a fire-based animation.

Special cases:
- `animationId: -1` - Uses the weapon's animation (for physical attacks)
- `animationId: 0` - No animation

### Integration with Action Sequences

Animations can also be triggered through action sequences in skill notes using the YEP_BattleEngineCore and YEP_X_ActSeqPack plugins. This allows for more complex animation sequences.

Example from the "Attack" skill:
```
<target action>
if user.attackMotion() !== 'missile'
move user: targets, front, 20
else
perform start
end
camera screen: target, front center, 20
camera focus: target, front center, 20
wait for movement
motion attack: user
wait: 10
attack animation: target
wait for animation
action effect
</target action>
```

The `attack animation: target` command plays the weapon's animation on the target.

Other animation commands include:
- `animation X: target` - Plays animation ID X on the target
- `animation X: screen` - Plays animation ID X on the screen
- `animation X: follow` - Plays animation ID X following the target

## Creating and Modifying Animations

### Animation Graphics

Animation graphics are stored in the `img/animations/` folder. Each animation can use up to two graphic files:
- `animation1Name` - Primary animation graphic
- `animation2Name` - Secondary animation graphic (optional)

Each animation graphic is a 5x3 grid of 192x192 pixel cells, for a total of 15 patterns per graphic.

### Creating New Animations

To create a new animation:

1. Add a new entry to the `Animations.json` file with a unique ID
2. Set the animation properties (name, position, etc.)
3. Define the frames and timings
4. Reference the animation in skills or action sequences

### Modifying Existing Animations

To modify an existing animation:

1. Locate the animation in the `Animations.json` file by its ID
2. Modify the properties, frames, or timings as needed
3. Test the animation in-game to ensure it looks and behaves as expected

## Best Practices

### Performance Considerations

- **Limit the number of cells per frame**: Too many cells can cause performance issues
- **Optimize frame count**: Keep animations as short as possible while still achieving the desired effect
- **Reuse animation graphics**: Use the same graphics for multiple animations with different hues or timings

### Visual Design

- **Consistent style**: Maintain a consistent visual style across animations
- **Clear feedback**: Ensure animations provide clear feedback about what's happening
- **Appropriate scale**: Size animations appropriately for their targets

### Sound Design

- **Synchronized sounds**: Ensure sound effects are synchronized with the visual effects
- **Appropriate volume**: Balance sound effect volumes to avoid overwhelming the player
- **Varied sounds**: Use a variety of sounds to avoid repetition

## Future Enhancement Opportunities

### Animation System Improvements

- **Dynamic animation scaling**: Adjust animation size based on target size
- **Particle effects**: Add support for particle-based animations
- **3D effects**: Incorporate 3D elements into animations

### Content Expansion

- **New elemental animations**: Expand the elemental animation sets
- **Character-specific animations**: Create unique animations for each character
- **Enemy-specific animations**: Create unique animations for enemy attacks

### Technical Enhancements

- **Animation blending**: Smooth transitions between animations
- **Animation layering**: Layer multiple animations for complex effects
- **Animation sequencing**: Chain animations together for elaborate sequences
