> Historical document retained for provenance. Its commands, IDs and completion claims may be superseded. Use the current FAQs, roadmap and maintained tools for current behavior.

# MegaEarth2049 Animation Documentation Tools

This collection of tools helps you analyze and document the animations in your MegaEarth2049 RPG Maker MV game. These tools are designed to extract information from the Animations.json file, generate comprehensive documentation, and provide insights into the animation system.

## Available Tools

### Core Tools

1. **tools/legacy-root/scripts/count_animations.ps1.txt**: Counts animations and displays basic statistics
2. **tools/legacy-root/scripts/generate_animations_catalog.ps1.txt**: Generates a comprehensive catalog of all animations
3. **tools/legacy-root/scripts/animation_documentation_suite.bat.txt**: Provides a menu-driven interface to all animation tools

### Generated Documentation

The tools generate the following documentation files:

1. **docs/reference/battle/MegaEarth2049_Animations_Catalog.md**: Comprehensive documentation of all animations in the game
2. **docs/reference/battle/MegaEarth2049_Animation_Code_Examples.md**: Practical code examples for working with animations

## Quick Start Guide

### Using the Animation Documentation Suite

The easiest way to use these tools is through the Animation Documentation Suite:

1. Double-click on `tools/legacy-root/scripts/animation_documentation_suite.bat.txt`
2. Select an option from the menu:
   - Option 1: Count animations and show basic statistics
   - Option 2: Generate comprehensive animation catalog
   - Option 3: Update animation documentation
   - Option 4: View animation code examples
   - Option 5: Exit

### Manual Usage

You can also run the individual PowerShell scripts directly:

```powershell
# Count animations and show basic statistics
powershell -ExecutionPolicy Bypass -File tools/legacy-root/scripts/count_animations.ps1.txt

# Generate comprehensive animation catalog
powershell -ExecutionPolicy Bypass -File tools/legacy-root/scripts/generate_animations_catalog.ps1.txt
```

## Understanding the Documentation

### Animation Catalog

The animation catalog provides comprehensive information about all animations in the game, including:

1. **Animation Statistics**: Overall statistics about the animations in the game
2. **Animation Categories**: Explanation of the different categories of animations
3. **Complete Animation Catalog**: Detailed listing of all animations, grouped by category
4. **Animation Graphics**: List of all animation graphics used in the game

### Animation Code Examples

The code examples document provides practical examples for working with animations:

1. **Basic Animation Structure**: Detailed explanation of animation JSON structure
2. **Elemental Animation Example**: Example of a fire elemental animation
3. **Using Animations in Events**: How to play animations in map events
4. **Using Animations in Battle**: How animations are used in battle
5. **Creating Animations Programmatically**: How to create new animations in code
6. **Modifying Existing Animations**: How to modify animations in code
7. **Common Animation Patterns**: Useful patterns for creating animations

## Animation Structure in RPG Maker MV

### Basic Structure

In RPG Maker MV, animations are defined in the `Animations.json` file. Each animation has the following properties:

- **id**: Unique identifier for the animation
- **name**: Display name of the animation
- **position**: Position setting (0: screen, 1: target, 2: center, 3: behind)
- **animation1Name**: Name of the first animation graphic file
- **animation1Hue**: Hue adjustment for the first animation graphic (0-360)
- **animation2Name**: Name of the second animation graphic file (optional)
- **animation2Hue**: Hue adjustment for the second animation graphic (0-360)
- **frames**: Array of frame data defining the animation sequence
- **timings**: Array of timing data for effects like flashes and sounds

### Animation Categories

Animations in MegaEarth2049 are organized into several categories:

1. **Basic Attack Animations (IDs 1-20)**: Basic physical attacks and weapon effects
2. **Special Effect Animations (IDs 21-40)**: Healing, buffs, debuffs, and status effects
3. **Powerful Attack Animations (IDs 41-80)**: High-level skills and limit breaks
4. **Environmental Effect Animations (IDs 81-100)**: Environmental effects like water, earth, wind, and light
5. **Other Animations (IDs 101+)**: Miscellaneous and custom animations

## Troubleshooting

If you encounter issues:

1. Make sure PowerShell is installed and can run scripts
2. Check that the Animations.json file is in the expected location (data directory)
3. Verify that you have write permissions for the output files
4. If a script fails, try running it directly from PowerShell with the `-Verbose` flag

## Requirements

- Windows operating system
- PowerShell 5.0 or later
- RPG Maker MV game with Animations.json file in the data directory

## License

These tools are provided for use with the MegaEarth2049 project.

---

*Last updated: April 19, 2025*
