> Reference snapshot: verify IDs, effects and enabled-plugin behavior against the live data and current FAQs. This relocation does not certify the older catalog as current.

# YEP_CoreEngine Documentation

## Overview

**Plugin Name**: YEP_CoreEngine  
**Version**: 1.28  
**Author**: Yanfly Engine Plugins  
**Required for**: Most Yanfly Engine Plugins  

The Core Engine plugin serves as the foundation for most Yanfly Engine Plugins. It provides essential functionality, bug fixes, and customization options that enhance RPG Maker MV's base capabilities. This plugin should be placed at the top of your plugin list to ensure compatibility with other Yanfly plugins.

## Key Features

### 1. Enhanced Customization
- Adjustable screen resolution
- Customizable font settings
- Configurable window appearance
- Adjustable line height and padding
- Customizable gauge appearance
- Configurable text and number formatting

### 2. Parameter Limits
- Increased gold cap (beyond 9,999,999)
- Adjustable item quantity limits
- Higher level caps (beyond 99)
- Expanded parameter limits for actors and enemies
- Custom HP/MP/TP maximums

### 3. Visual Improvements
- Scaling options for battlebacks, title screen, and game over screen
- Repositioned battlers for better screen utilization
- Enhanced animation rates
- Improved gauge and icon display

### 4. Bug Fixes
- Animation overlay fix for multi-target skills
- Event movement speed correction
- Event movement queue improvements
- Event collision handling
- Screen tearing prevention
- Sprite distortion fixes

### 5. Developer Tools
- Optional console access for debugging
- Script call fail-safe to prevent crashes
- Memory optimization features

## Configuration Options

### Screen Settings

| Parameter | Description | Default |
|-----------|-------------|---------|
| Screen Width | Adjusts the width of the game screen | 816 |
| Screen Height | Adjusts the height of the game screen | 624 |
| Scale Battlebacks | Scales battlebacks to fit the resolution | true |
| Scale Title | Scales the title screen to fit the resolution | true |
| Scale Game Over | Scales the game over screen to fit the resolution | true |
| Open Console | Opens the debug console (for testing) | false |
| Reposition Battlers | Repositions battlers based on resolution | true |
| GameFont Load Timer | Sets the timer for loading the GameFont (0 for unlimited) | 0 |
| Update Real Scale | Updates the real scale for screen stretching | false |
| Collection Clear | Clears stored objects when switching scenes | true |

### Gold Settings

| Parameter | Description | Default |
|-----------|-------------|---------|
| Gold Max | Maximum amount of gold the player can have | 99999999 |
| Gold Font Size | Font size used to display gold | 20 |
| Gold Icon | Icon used to represent gold (0 for no icon) | 313 |
| Gold Overlap | Text displayed when gold exceeds display area | "A lotta" |

### Item Settings

| Parameter | Description | Default |
|-----------|-------------|---------|
| Default Max | Maximum number of items a player can hold | 99 |
| Quantity Text Size | Font size used for item quantity | 20 |

### Parameter Settings

| Parameter | Description | Default |
|-----------|-------------|---------|
| Max Level | Maximum level limit for actors | 99 |
| Actor MaxHP | Maximum HP limit for actors | 9999 |
| Actor MaxMP | Maximum MP limit for actors | 9999 |
| Actor Parameter | Maximum parameter limit for actors | 999 |
| Enemy MaxHP | Maximum HP limit for enemies | 999999 |
| Enemy MaxMP | Maximum MP limit for enemies | 9999 |
| Enemy Parameter | Maximum parameter limit for enemies | 999 |

### Battle Settings

| Parameter | Description | Default |
|-----------|-------------|---------|
| Animation Rate | Rate of battle animations (lower = faster) | 4 |
| Flash Target | Whether targeted enemies flash or whiten | false |
| Show Events Transition | Show events during battle transition | true |
| Show Events Snapshot | Show events in battle background snapshot | true |

### Map Optimization

| Parameter | Description | Default |
|-----------|-------------|---------|
| Refresh Update HP | Do full actor refresh when updating HP on map | true |
| Refresh Update MP | Do full actor refresh when updating MP on map | true |
| Refresh Update TP | Do full actor refresh when updating TP on map | false |

### Font Settings

| Parameter | Description | Default |
|-----------|-------------|---------|
| Chinese Font | Default font(s) for Chinese text | SimHei, Heiti TC, sans-serif |
| Korean Font | Default font(s) for Korean text | Dotum, AppleGothic, sans-serif |
| Default Font | Default font(s) for everything else | GameFont, Verdana, Arial, Courier New |
| Font Size | Default font size for windows | 28 |
| Text Align | Text alignment for command windows | left |

### Window Settings

| Parameter | Description | Default |
|-----------|-------------|---------|
| Digit Grouping | Group digits with commas | true |
| Line Height | Universal line height for windows | 36 |
| Icon Width | Width of icons | 32 |
| Icon Height | Height of icons | 32 |
| Face Width | Width of actor faces | 144 |
| Face Height | Height of actor faces | 144 |
| Window Padding | Padding for all standard windows | 18 |
| Text Padding | Padding for text inside windows | 6 |
| Window Opacity | Background opacity for windows | 192 |
| Gauge Outline | Enable outlines for gauges | true |
| Gauge Height | Height for gauges | 18 |
| Menu TP Bar | Draw TP bar in menu status | true |

### Window Colors

The plugin allows customization of various text and gauge colors through parameters numbered 0-31. Some key color parameters include:

| Parameter | Description | Default |
|-----------|-------------|---------|
| Color: Normal | Default text color | 0 |
| Color: System | System text color | 16 |
| Color: Crisis | Text color for low HP | 17 |
| Color: Death | Text color for 0 HP | 18 |
| Color: Gauge Back | Background color for gauges | 19 |
| Color: HP Gauge 1 | First color for HP gauge gradient | 20 |
| Color: HP Gauge 2 | Second color for HP gauge gradient | 21 |
| Color: MP Gauge 1 | First color for MP gauge gradient | 22 |
| Color: MP Gauge 2 | Second color for MP gauge gradient | 23 |
| Color: MP Cost | Color for MP costs | 23 |
| Color: Power Up | Color for parameter increases | 24 |
| Color: Power Down | Color for parameter decreases | 25 |
| Color: TP Gauge 1 | First color for TP gauge gradient | 28 |
| Color: TP Gauge 2 | Second color for TP gauge gradient | 29 |
| Color: TP Cost | Color for TP costs | 29 |

## Notetags

### Item, Weapon, Armor Notetags

```
<Price: x>
```
Changes the price of the item to x. This allows you to bypass the editor's 999,999 gold cost limit.

```
<Max Item: x>
```
Changes the maximum amount of the item to x.

```
<stat: +x>
<stat: -x>
```
Allows equipment to gain or lose x amount of a stat. Replace "stat" with "hp", "mp", "atk", "def", "mat", "mdf", "agi", or "luk".

### Enemy Notetags

```
<Gold: x>
```
Changes the gold drop value of enemies to x. This allows you to bypass the editor's 9,999,999 gold drop limit.

```
<stat: x>
```
Changes the enemy's stat to x amount. Replace "stat" with "hp", "mp", "atk", "def", "mat", "mdf", "agi", or "luk".

```
<exp: x>
```
Changes the enemy's EXP given to x amount. This allows you to bypass the editor's 9,999,999 EXP limit.

### Actor Notetags

```
<Initial Level: x>
```
Changes the actor's initial level to x. This allows you to bypass the editor's level 99 limit.

```
<Max Level: x>
```
Changes the actor's max level to x. This allows you to bypass the editor's level 99 limit.

### Class Skill Learn Notetag

```
<Learn at Level: x>
```
When placed inside a class's "Skills to Learn" notetag, this will cause the class to learn the skill at level x.

## Plugin Commands

```
GainGold 1234567890
```
Party gains 1234567890 gold.

```
LoseGold 9876543210
```
Party loses 9876543210 gold.

## Integration with Other Plugins

YEP_CoreEngine serves as the foundation for most Yanfly Engine Plugins and should be placed at the top of your plugin list. It provides essential functionality that other plugins rely on, such as:

1. **Extended Parameter Limits**: Used by battle and stat-related plugins
2. **Custom Window Formatting**: Used by menu and UI plugins
3. **Bug Fixes**: Ensures other plugins work correctly
4. **Digit Grouping**: Improves readability of large numbers in all plugins
5. **Enhanced Font Control**: Used by text and message plugins

## Bug Fixes

The Core Engine fixes several bugs found in RPG Maker MV:

1. **Animation Overlay**: Fixes multiple overlays for full-screen animations targeting multiple enemies
2. **Event Movement Speed**: Corrects slightly slower event movement speed
3. **Event Movement Queue**: Ensures event move routes complete even when conditions change
4. **Event Colliding**: Allows events with "Below Player" priority to move over other events
5. **Screen Tearing**: Prevents tile tearing when moving slowly
6. **Sprite Distortion**: Eliminates distortion caused by decimal values in sprite sheets

## Usage Examples

### Extending Gold Limits

```javascript
// Default maximum gold is 99,999,999
// With YEP_CoreEngine, you can use plugin commands for larger amounts
$gameParty.gainGold(1000000000); // Gain 1 billion gold
```

### Custom Item Maximum

```
<Max Item: 500>
```
Placed in an item's notebox, this allows the player to hold up to 500 of this specific item.

### High-Level Actors

```
<Max Level: 999>
```
Placed in an actor's notebox, this allows the actor to reach level 999 instead of the default 99.

### Custom Enemy Stats

```
<hp: 1000000>
<atk: 9999>
```
Placed in an enemy's notebox, this sets their HP to 1,000,000 and ATK to 9,999, bypassing the editor's limitations.

## Best Practices

1. **Plugin Order**: Place YEP_CoreEngine at the top of your plugin list
2. **Resolution**: Set screen resolution appropriate for your target platform
3. **Parameter Limits**: Adjust parameter limits based on your game's balance
4. **Font Settings**: Choose fonts that match your game's aesthetic and support required languages
5. **Window Appearance**: Customize window settings to match your game's UI design
6. **Color Scheme**: Adjust color parameters to create a consistent visual theme

## Compatibility Notes

- Works with most RPG Maker MV plugins
- May conflict with other plugins that modify core engine functionality
- Some features may behave differently depending on the RPG Maker MV version
- Specific compatibility updates have been made for versions 1.3.0, 1.3.2, 1.3.4, and 1.6.0

## Version History

- **v1.28**: Added F5 reload optimization and map refresh options
- **v1.27**: Fixed script call checks for RPG Maker MV v1.6.0
- **v1.26**: Updated for RPG Maker MV v1.6.0 compatibility
- **v1.25**: Updated for RPG Maker MV v1.5.0 compatibility
- **v1.24**: Screen jittering prevention updated for RPG Maker MV v1.3.4
- **v1.23**: Changed battleback scaling for RPG Maker MV v1.3.2+
- **v1.22**: Added event visibility options and script error handling
- **v1.21**: Fixed battleback scaling and optimized garbage collection
- **v1.20**: Added resolution and memory management improvements
- **v1.19**: Fixed skill learning for RPG Maker MV v1.3.2
- **v1.18**: Fixed battleback scaling for front view
- **v1.17**: Updated for RPG Maker MV v1.3.0
- **v1.16**: Fixed text height calculation in drawTextEx
- **v1.15**: Ensured windows have whole number dimensions
- **v1.14**: Optimized memory-intensive loops
- **v1.13**: Updated for RPG Maker MV v1.1.0
- **v1.12**: Fixed Learn at Level notetag
- **v1.11**: Fixed face width and enemy EXP notetags
- **v1.10**: Removed a bugfix that was applied in MV's update
- **v1.09**: Adjusted minimum display width for status drawing
- **v1.08**: Fixed class change level maintenance bug
- **v1.07**: Fixed gauge outline drawing at odd intervals
- **v1.06**: Removed event frequency bug fix (now in MV source)
- **v1.05**: Added Scale Game Over parameter
- **v1.04**: Fixed battleback scaling and escape state removal
- **v1.03**: Fixed battleback shift after battle
- **v1.02**: Fixed mobile screen fading and added scaling parameters
- **v1.01**: Fixed button sprite anchor bug
- **v1.00**: Initial release
