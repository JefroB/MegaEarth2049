# MegaEarth2049 Boss Features - Summary

This package provides a complete solution for implementing boss enemies in MegaEarth2049. We've created scripts, tools, and documentation to help you create and implement boss enemies that are larger than regular enemies, flash red when near death, and provide a more challenging and memorable battle experience.

## Files Created

1. **create_boss_art_assets.ps1**
   - PowerShell script that generates detailed specifications for boss art assets
   - Creates a `boss_art_assets` directory with text files for each boss

2. **generate_boss_placeholder_sprites.ps1**
   - PowerShell script that creates placeholder sprites for boss enemies
   - Generates PNG files with normal frames and near-death state frames
   - Creates a `boss_placeholder_sprites` directory with the placeholder sprites

3. **update_boss_enemies_json.ps1**
   - PowerShell script that updates the Enemies.json file to add boss-specific features
   - Adds note tags for boss identification and near-death flashing
   - Creates new boss enemy entries in the database

4. **js/plugins/BossFeatures.js**
   - RPG Maker MV plugin that implements the boss features in the game engine
   - Handles the larger sprite size and the red flashing effect
   - Detects when bosses are near death and applies visual effects

5. **BOSS_FEATURES_README.md**
   - Comprehensive documentation explaining how to use all the scripts and features
   - Includes installation instructions and troubleshooting tips

6. **BOSS_ART_CREATION_GUIDE.md**
   - Detailed guide for creating pixel art for boss enemies
   - Includes technical specifications, animation requirements, and style guidelines
   - Provides specific guidelines for each boss type

7. **BOSS_SPRITE_EXAMPLE.txt**
   - ASCII art representation of a boss sprite sheet
   - Illustrates how animations should be structured
   - Provides a visual reference for the concepts described in the guide

## Quick Start Guide

### Step 1: Generate Boss Art Specifications

Run the `create_boss_art_assets.ps1` script to generate detailed specifications for boss art assets:

```powershell
.\create_boss_art_assets.ps1
```

This will create a `boss_art_assets` directory with specifications for each boss.

### Step 2: Generate Boss Placeholder Sprites

Run the `generate_boss_placeholder_sprites.ps1` script to create placeholder sprites for boss enemies:

```powershell
.\generate_boss_placeholder_sprites.ps1
```

This will create a `boss_placeholder_sprites` directory with placeholder PNG files.

### Step 3: Update Enemies.json

Run the `update_boss_enemies_json.ps1` script to update the Enemies.json file:

```powershell
.\update_boss_enemies_json.ps1
```

This will add boss-specific features to the Enemies.json file.

### Step 4: Install the BossFeatures Plugin

The `BossFeatures.js` plugin should be placed in the `js/plugins` directory of your RPG Maker MV project. Then:

1. Open your project in RPG Maker MV
2. Go to Tools > Plugin Manager
3. Add the BossFeatures plugin and enable it
4. Save your project

### Step 5: Create Boss Art Assets

Use the `BOSS_ART_CREATION_GUIDE.md` as a reference to create the actual boss art assets. The guide provides detailed instructions for creating pixel art for boss enemies, including technical specifications, animation requirements, and style guidelines.

The `BOSS_SPRITE_EXAMPLE.txt` provides a visual reference for how the sprite sheet should be structured.

### Step 6: Test the Boss Features

1. Place your boss sprite sheets in the `img/sv_enemies` directory
2. Run the game and test the boss in battle
3. Check that all animations play correctly
4. Verify that the near-death state activates when HP is low

## Boss Features

- **Larger Sprites**: Boss enemies use 96x96 pixel sprites (compared to 64x64 for regular enemies)
- **Near-Death Flashing**: Bosses flash red when their HP falls below a configurable threshold (default: 25%)
- **Enhanced Animations**: Boss sprites support more elaborate animations with multiple attack types
- **Better Rewards**: Bosses provide more EXP, gold, and better item drops
- **Distinctive Presence**: Larger size and visual effects make bosses stand out in battle

## Boss Types Included

1. **Punk Boss (punkBoss1_animated)**
   - Punk leader with cybernetic enhancements
   - Multicolored mohawk, spiked armor, and tech enhancements

2. **Corporate Boss (corporateBoss_animated)**
   - Corporate executive with hidden combat enhancements
   - Business suit with corporate logo, reveals cybernetic enhancements during combat

3. **Ninja Lord (ninjaLord_animated)**
   - Master ninja with advanced tech
   - Black/gold with glowing tech highlights and weapon effects

4. **Alien Overlord (alienOverlord_animated)**
   - Alien leader with psychic abilities
   - Unusual alien color scheme with glowing psychic effects

5. **Robotic Titan (roboticTitan_animated)**
   - Massive security robot with heavy weaponry
   - Industrial metals with warning lights and corporate branding

6. **Elemental Lord (elementalLord_animated)**
   - Fusion of elemental spirits into a powerful entity
   - Swirling combination of elemental colors with energy effects

7. **Digital Entity (digitalEntity_animated)**
   - Digital consciousness manifested in reality
   - Digital blues/greens with glitch effects and corruption artifacts

8. **Mutant Behemoth (mutantBehemoth_animated)**
   - Massive mutated creature from the sewers
   - Toxic greens/purples with oozing effects and biological mutations

## Technical Implementation

The boss features are implemented through a combination of:

1. **Data Changes**: The `update_boss_enemies_json.ps1` script adds note tags to the Enemies.json file that identify bosses and configure their behavior.

2. **Plugin Code**: The `BossFeatures.js` plugin detects these note tags and implements the visual effects and behavior changes.

3. **Art Assets**: The boss sprite sheets provide the visual representation of the bosses, including their animations and near-death state.

The note tags used are:

- `<Boss Enemy>` - Identifies an enemy as a boss
- `<Flash When Near Death>` - Enables red flashing when HP is low
- `<Near Death Threshold: X>` - Sets the HP percentage threshold (default: 25%)
- `<Sideview Frame Width: 96>` - Sets the frame width for the boss sprite
- `<Sideview Frame Height: 96>` - Sets the frame height for the boss sprite
- `<Sideview Animation Frames: 8>` - Sets the number of animation frames

## Customization

You can customize the boss features by:

1. **Editing the Note Tags**: Modify the note tags in the Enemies.json file to change the behavior of specific bosses.

2. **Modifying the Plugin**: Edit the `BossFeatures.js` plugin to change how the visual effects are implemented.

3. **Creating Custom Art**: Create your own boss sprite sheets following the guidelines in the `BOSS_ART_CREATION_GUIDE.md`.

4. **Adding New Bosses**: Use the `update_boss_enemies_json.ps1` script as a template to add new boss enemies to the game.

## Conclusion

This package provides everything you need to implement boss enemies in MegaEarth2049. The scripts, tools, and documentation work together to create a complete solution that enhances the game's battle system and provides players with more challenging and memorable boss encounters.
