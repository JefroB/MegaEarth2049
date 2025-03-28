# MegaEarth2049 Boss Features

This package provides tools and scripts for creating and implementing boss enemies in MegaEarth2049. Boss enemies are larger than regular enemies, have special visual effects (like flashing red when near death), and generally provide a more challenging and memorable battle experience.

## Files Included

1. **create_boss_art_assets.ps1** - Generates detailed specifications for boss art assets
2. **generate_boss_placeholder_sprites.ps1** - Creates placeholder sprites for boss enemies, including near-death state frames
3. **update_boss_enemies_json.ps1** - Updates the Enemies.json file to add boss-specific features
4. **js/plugins/BossFeatures.js** - RPG Maker MV plugin that implements boss features in the game engine

## Boss Features

- **Larger Sprites**: Boss enemies use 96x96 pixel sprites (compared to 64x64 for regular enemies)
- **Near-Death Flashing**: Bosses flash red when their HP falls below a configurable threshold (default: 25%)
- **Enhanced Animations**: Boss sprites support more elaborate animations with multiple attack types
- **Better Rewards**: Bosses provide more EXP, gold, and better item drops
- **Distinctive Presence**: Larger size and visual effects make bosses stand out in battle

## How to Use

### Step 1: Generate Boss Art Specifications

Run the `create_boss_art_assets.ps1` script to generate detailed specifications for boss art assets:

```powershell
.\create_boss_art_assets.ps1
```

This will create a `boss_art_assets` directory containing text files with specifications for each boss. These specifications include:
- Size requirements (96x96 pixels)
- Animation frame guidelines
- Color schemes and style notes
- Special effects requirements (like near-death state)

### Step 2: Generate Boss Placeholder Sprites (Optional)

If you want to test the boss features before creating the final art assets, run the `generate_boss_placeholder_sprites.ps1` script:

```powershell
.\generate_boss_placeholder_sprites.ps1
```

This will create a `boss_placeholder_sprites` directory containing:
- Placeholder PNG files for each boss
- Each placeholder includes normal frames and near-death state frames (with red tint)
- A `copy_to_game.ps1` script to copy these placeholders to the game directory

### Step 3: Update Enemies.json

Run the `update_boss_enemies_json.ps1` script to update the game's Enemies.json file to add boss-specific features:

```powershell
.\update_boss_enemies_json.ps1
```

This will:
- Create a backup of the original Enemies.json file
- Update existing boss enemies to use the new animated sprites
- Add boss-specific note tags for special features
- Add new boss enemies with references to the new animated sprites

### Step 4: Install the BossFeatures Plugin

The `BossFeatures.js` plugin should be placed in the `js/plugins` directory of your RPG Maker MV project. Then:

1. Open your project in RPG Maker MV
2. Go to Tools > Plugin Manager
3. Add the BossFeatures plugin and enable it
4. Save your project

## Boss Art Guidelines

### Sprite Sheet Layout

Boss sprite sheets should follow this layout:
- **Size**: 96x96 pixels per frame
- **Frames**: 8 frames per animation (minimum)
- **Layout**: Horizontal arrangement of frames
- **Multiple Animations**: Can be arranged vertically (different rows for different animations)

Example layout for a boss with 8 frames:
- **Width**: 768 pixels (8 frames × 96 pixels)
- **Height**: 96 pixels (single animation) or 192+ pixels (multiple animations)

### Animation Types

Each boss should have the following animations:
1. **Idle Animation** (6-8 frames) - Row 1
2. **Attack Animation(s)** (8-12 frames) - Row 2 (and 3+ for additional attacks)
3. **Damage Reaction** (4-6 frames) - Separate row
4. **Near-Death State** (same frames as idle, but with red tint) - Bottom row

### Near-Death Implementation

The near-death state can be implemented in two ways:
1. **Separate Frames**: Create a separate row of frames with red tint (recommended)
2. **Runtime Tinting**: Let the BossFeatures.js plugin apply a red tint at runtime

The plugin supports both approaches, but separate frames allow for more customized near-death appearances.

## Note Tags

The following note tags can be added to enemy entries in the database:

- `<Boss Enemy>` - Identifies an enemy as a boss
- `<Flash When Near Death>` - Enables red flashing when HP is low
- `<Near Death Threshold: X>` - Sets the HP percentage threshold (default: 25)
- `<Sideview Frame Width: 96>` - Sets the frame width for the boss sprite
- `<Sideview Frame Height: 96>` - Sets the frame height for the boss sprite
- `<Sideview Animation Frames: 8>` - Sets the number of animation frames

## Creating Custom Bosses

To create a new boss enemy:

1. Create the boss sprite sheet following the guidelines above
2. Place the sprite sheet in the `img/sv_enemies` directory
3. Add a new enemy in the RPG Maker MV database
4. Set the enemy's battler name to the sprite sheet filename
5. Add the appropriate note tags to enable boss features
6. Adjust the enemy's parameters (HP, attack, etc.) to make it challenging

Alternatively, you can use the `update_boss_enemies_json.ps1` script to add new bosses directly to the Enemies.json file.

## Troubleshooting

- **Sprites Not Showing**: Make sure the sprite files are in the correct location and named correctly
- **No Red Flashing**: Check that the note tags are properly added to the enemy
- **Sprite Size Issues**: Verify that the frame width and height are set correctly in the note tags
- **Animation Problems**: Ensure the sprite sheet follows the correct layout and has the expected number of frames

## Technical Details

The BossFeatures.js plugin works by:
1. Detecting enemies with the `<Boss Enemy>` note tag
2. Monitoring their HP to detect when they enter the near-death state
3. Either applying a red tint or switching to near-death frames
4. Handling the larger sprite size and custom frame dimensions

The plugin is designed to be compatible with other RPG Maker MV plugins and should not conflict with most battle system enhancements.

## Credits

These boss features were created for MegaEarth2049 by Cline. Feel free to modify and extend them as needed for your game.
