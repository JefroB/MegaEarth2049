# MegaEarth2049 Art Assets Creation Guide

This guide provides instructions for creating the missing art assets for MegaEarth2049. The game requires various sprite sheets for enemies, characters, and other elements to function properly.

## Overview

The MegaEarth2049 game is missing several art assets, particularly animated sprite sheets for enemies. This package includes scripts to:

1. Generate specifications for the required art assets
2. Create placeholder sprites for testing
3. Update the game's Enemies.json file to reference the new animated sprites

## Files Included

- `create_art_assets.ps1`: Generates detailed specifications for each required art asset
- `generate_placeholder_sprites.ps1`: Creates simple placeholder PNG files for testing
- `update_enemies_json.ps1`: Updates the game's Enemies.json file to reference the new animated sprites

## Art Style Guidelines

- **Overall Style**: 16-bit pixel art with a cyberpunk aesthetic
- **Resolution**: 
  - Enemy battlers: 64x64 pixels for standard, 96x96 pixels for larger enemies
  - Character sprites: 32x48 pixels (character sheet)
  - Tiles: 16x16 pixels each
- **Animation**: 
  - Enemy idle animations: 4-8 frames
  - Enemy attack animations: 4-8 frames
  - Damage reaction: 2-4 frames
- **Theme**: Cyberpunk with elements of humor, absurdity, and digital glitches
- **Color Palette**: Neon colors against dark backgrounds for cyberpunk areas

## Step-by-Step Instructions

### 1. Generate Art Asset Specifications

Run the `create_art_assets.ps1` script to generate detailed specifications for each required art asset:

```powershell
.\create_art_assets.ps1
```

This will create a `new_art_assets` directory containing text files with specifications for each asset.

### 2. Generate Placeholder Sprites (Optional)

If you want to test the game with placeholder sprites before creating the final art assets, run the `generate_placeholder_sprites.ps1` script:

```powershell
.\generate_placeholder_sprites.ps1
```

This will create a `placeholder_sprites` directory containing simple PNG files for each required asset, as well as a `copy_to_game.ps1` script to copy these placeholders to the game directory.

### 3. Update Enemies.json

Run the `update_enemies_json.ps1` script to update the game's Enemies.json file to reference the new animated sprites:

```powershell
.\update_enemies_json.ps1
```

This will create a backup of the original Enemies.json file and update it to reference the new animated sprites.

### 4. Create the Art Assets

Using the specifications generated in step 1, create the actual art assets. Each asset should be a PNG file with the specified dimensions and animations.

For enemy battlers, create sprite sheets with the following layout:
- For 64x64 pixel sprites with 8 frames: Create a 512x64 pixel sprite sheet
- For 96x96 pixel sprites with 8 frames: Create a 768x96 pixel sprite sheet

You can also arrange multiple animations vertically:
- Row 1: Idle animation frames
- Row 2: Attack animation frames
- Row 3: Damage reaction frames

### 5. Place the Art Assets in the Game Directory

Once you have created the art assets, place them in the `img/sv_enemies` directory of the game.

## Priority Assets

These assets should be prioritized as they are central to the game experience:

1. Elemental Spirits (Firespirit, Earthspirit, Waterspirit, Windspirit)
2. SF Series (SF_TeddyBear)
3. Punks (punk1 through punk6, punkBoss1)
4. Ninjas (greenninja, pinkninja, brownninja, blueninja, redninja, purpleninja, blackninja)
5. Human Enemies (thug, gasman)
6. Soldiers (Soldier9 through Soldier13)

## Animation Frame Guidelines

For each animated sprite, create the following frames:

### 1. Idle Animation (4-8 frames)
- Frame 1: Base pose
- Frame 2-4: Subtle movement (breathing, shifting weight)
- Frame 5-8: Return to base pose with variations

### 2. Attack Animation (6-12 frames)
- Frame 1-2: Wind-up/preparation
- Frame 3-4: Attack execution
- Frame 5-6: Attack impact/follow-through
- Frame 7-12: Recovery to idle (for longer animations)

### 3. Damage Reaction (2-4 frames)
- Frame 1: Impact pose
- Frame 2-4: Recoil and recovery

## Notes for Artists

- The game has a cyberpunk aesthetic with elements of humor and absurdity
- Character designs should reflect the "off-the-rails" nature of the game
- Enemy designs should be memorable and often incorporate humorous elements
- Environmental art should convey the dystopian yet absurd nature of MegaEarth
- Special attention should be given to glitch effects and digital distortions
- Color palette should include neon colors against dark backgrounds for cyberpunk areas
- Corporate facilities should have sterile minimalist designs with corporate logos
- Alien worlds should be visually distinct from Earth-based environments
- UI elements should be clean and readable while maintaining the cyberpunk aesthetic
- Animations should be smooth but maintain the pixel art style (no tweening)
- Consider the game's humor when designing assets - exaggeration and absurdity are welcome

## Troubleshooting

- If the placeholder sprites don't appear in the game, make sure the Enemies.json file has been updated correctly.
- If the game crashes, check that the sprite sheets have the correct dimensions and format.
- If the animations don't play correctly, ensure that the frames are arranged properly in the sprite sheet.

## Contact

If you have any questions or need further assistance, please contact the MegaEarth2049 development team.
