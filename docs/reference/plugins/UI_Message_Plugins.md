> Reference snapshot: verify IDs, effects and enabled-plugin behavior against the live data and current FAQs. This relocation does not certify the older catalog as current.

# User Interface and Message Plugins Documentation

This document provides detailed information about user interface and message related plugins used in the MegaEarth2049 RPG Maker MV project.

## Table of Contents
- [Overview](#overview)
- [Plugin List](#plugin-list)
- [Detailed Documentation](#detailed-documentation)
  - [YEP_CoreEngine](#yep_coreengine)
  - [YEP_OptionsCore](#yep_optionscore)
  - [YEP_MessageCore](#yep_messagecore)
  - [YEP_X_MessageBacklog](#yep_x_messagebacklog)
  - [YEP_VictoryAftermath](#yep_victoryaftermath)
  - [YEP_X_AftermathLevelUp](#yep_x_aftermathlevelup)
- [Integration Examples](#integration-examples)
- [Related Documentation](#related-documentation)

## Overview

The user interface and message systems in MegaEarth2049 are enhanced through a collection of plugins that expand the default RPG Maker MV functionality. These plugins work together to create a more polished and customizable user experience, from message windows to menus and battle results.

### Plugin Dependencies

```
YEP_CoreEngine

YEP_MessageCore
└── YEP_X_MessageBacklog

YEP_VictoryAftermath
└── YEP_X_AftermathLevelUp

YEP_OptionsCore
```

## Plugin List

| Plugin Name | Version | Status | Description |
|-------------|---------|--------|-------------|
| YEP_CoreEngine | v1.28 | Enabled | Needed for the majority of Yanfly Engine Scripts with bug fixes |
| YEP_OptionsCore | v1.01 | Enabled | Expands the Options Menu with more customization potential |
| YEP_MessageCore | v1.19 | Enabled | Adds more features to the Message Window for customization |
| YEP_X_MessageBacklog | v1.01 | Enabled | Adds a message backlog function to the message system |
| YEP_VictoryAftermath | v1.07 | Enabled | Displays an informative window after battle instead of message boxes |
| YEP_X_AftermathLevelUp | v1.01 | Enabled | Adds a level up portion to the Victory Aftermath sequences |

## Detailed Documentation

### YEP_CoreEngine

#### Overview
The YEP_CoreEngine plugin is a fundamental plugin that serves as the foundation for many other Yanfly Engine plugins. It also contains numerous bug fixes and quality-of-life improvements for RPG Maker MV.

#### Configuration in MegaEarth2049
The CoreEngine has extensive configuration options, including:

- **Screen Settings**: Resolution, scaling, and rendering options
- **Gold Settings**: Maximum gold, font size, and icon
- **Item Settings**: Maximum items, weapons, and armors
- **Parameter Settings**: Maximum levels, parameter caps, and formulas
- **Battle Settings**: Animation speed, flash settings, and battle systems
- **Map Optimization**: Tile caching and fog of war options
- **Font Settings**: Default font, font size, and outline thickness
- **Window Settings**: Window padding, line height, and background type
- **Window Colors**: Text colors, gauge colors, and window skin options

For a complete list of parameters and their values, see the [YEP_CoreEngine_Documentation.md](YEP_CoreEngine_Documentation.md) file.

#### Implementation in MegaEarth2049
The CoreEngine plugin provides numerous enhancements to the base game:

1. **UI Improvements**:
   - Higher resolution display (816x624)
   - Custom window skin with cyberpunk aesthetic
   - Adjusted text colors for better readability
   - Custom gauge colors for HP (green/red), MP (blue/dark blue), and TP (yellow/orange)

2. **Game Balance Adjustments**:
   - Increased parameter caps (9999 for most parameters)
   - Modified experience curve for smoother progression
   - Adjusted damage formulas for better balance
   - Custom critical hit effects

3. **Quality of Life Features**:
   - Fast-forward button for battle animations
   - Encounter rate variance to prevent predictable encounters
   - Improved error handling
   - Performance optimizations for larger maps

4. **Integration with Other Systems**:
   - Serves as the foundation for other Yanfly plugins
   - Provides core functionality for custom UI elements
   - Enables advanced battle mechanics
   - Supports custom fonts and text formatting

### YEP_OptionsCore

#### Overview
The YEP_OptionsCore plugin expands the Options Menu into a more elegant looking menu with more customization potential. It allows for categorized options and provides a framework for adding custom options.

#### Configuration in MegaEarth2049
- **Option Categories**: General, Audio, Visual, Gameplay
- **Category Order**: General, Audio, Visual, Gameplay
- **Command Window Width**: 400
- **Command Window Rows**: 4
- **Command Alignment**: center
- **Command Window Text**: Options
- **Show Command Window**: true
- **Help Window Text**: Game Options
- **Show Help Window**: true
- **Option Window Width**: 600
- **Option Window Height**: 400
- **Option Window Spacing**: 0
- **Option Window Text**: Settings
- **Show Option Window**: true
- **Finish Command**: Finish
- **Finish Command Alignment**: center
- **Finish Command Text**: Finish
- **Show Finish Command**: true

#### Implementation in MegaEarth2049
The OptionsCore plugin creates a more organized and visually appealing options menu:

1. **Category Organization**:
   - **General**: Basic game options like text speed, window opacity, etc.
   - **Audio**: Volume controls for BGM, BGS, ME, and SE
   - **Visual**: Display options like resolution, screen effects, etc.
   - **Gameplay**: Game-specific options like difficulty, control schemes, etc.

2. **Custom Options**:
   - **Text Speed**: Controls the speed of text display in message windows
   - **Battle Animation Speed**: Controls the speed of battle animations
   - **Difficulty Slider**: Adjusts the game's difficulty level
   - **Control Scheme**: Toggles between different control layouts
   - **Auto-Dash**: Toggles automatic dashing when moving

3. **Visual Enhancements**:
   - Custom window skin for the options menu
   - Category icons for better visual organization
   - Slider controls for numeric options
   - Toggle switches for boolean options
   - Dropdown menus for multi-choice options

4. **Integration with Other Systems**:
   - Works with YEP_X_DifficultySlider for difficulty adjustments
   - Connects with YEP_BattleAniSpeedOpt for animation speed options
   - Supports custom game-specific options

### YEP_MessageCore

#### Overview
The YEP_MessageCore plugin enhances RPG Maker MV's default message system with additional features and customization options. It allows for more control over how text is displayed, formatted, and interacted with, creating a more polished and professional text presentation system.

#### Configuration in MegaEarth2049
- **Default Rows**: 4 (Number of text rows in the message window)
- **Default Width**: Graphics.boxWidth (Width of the message window)
- **Face Indent**: Window_Base._faceWidth + 24 (Indentation when face graphics are shown)
- **Fast Forward Key**: pagedown (Key to fast forward through messages)
- **Enable Fast Forward**: true (Allows players to fast forward through messages)
- **Word Wrapping**: false (Automatic word wrapping is disabled)
- **Description Wrap**: false (Automatic word wrapping for descriptions is disabled)
- **Word Wrap Space**: false (Word wrapping at spaces is disabled)
- **Tight Wrap**: false (Tight word wrapping is disabled)
- **Font Name**: GameFont (Default font for messages)
- **Font Name CH**: SimHei, Heiti TC, sans-serif (Font for Chinese text)
- **Font Name KR**: Dotum, AppleGothic, sans-serif (Font for Korean text)
- **Font Size**: 28 (Default font size)
- **Font Size Change**: 12 (Amount to change font size with text codes)
- **Font Changed Max**: 96 (Maximum font size with text codes)
- **Font Changed Min**: 12 (Minimum font size with text codes)
- **Font Outline**: 4 (Thickness of font outline)
- **Maintain Font**: false (Font settings reset between messages)
- **Name Box Buffer X**: -28 (Horizontal position adjustment for name boxes)
- **Name Box Buffer Y**: 0 (Vertical position adjustment for name boxes)
- **Name Box Padding**: this.standardPadding() * 4 (Padding inside name boxes)
- **Name Box Color**: 0 (Color index for name boxes)
- **Name Box Clear**: false (Name boxes have opaque backgrounds)
- **Name Box Added Text**: \c[6] (Text code added to names in name boxes)
- **Name Box Auto Close**: false (Name boxes don't automatically close)

#### Implementation in MegaEarth2049
The Message Core is a fundamental component of the game's narrative and dialogue system, providing a consistent and visually appealing way to present text to the player. The implementation includes:

1. **Dialogue Presentation**:
   - Character dialogue uses name boxes with color-coded names (using the \c[6] text code)
   - Face graphics are displayed alongside dialogue to show the speaking character
   - The message window is positioned at the bottom of the screen with 4 rows of text
   - Messages can be fast-forwarded using the Page Down key for players who read quickly

2. **Text Formatting**:
   - Text codes are used throughout dialogue to add emphasis and visual interest:
     - `\c[n]` for colored text (e.g., `\c[2]` for green, `\c[3]` for blue)
     - `\{` and `\}` to increase and decrease font size
     - `\i[n]` to display icons within text
     - `\af[x]` to change the displayed face graphic mid-message
   - Important terms and concepts are highlighted with color codes
   - Emphasis is added through font size changes for dramatic moments

3. **Integration with YEP_X_MessageBacklog**:
   - All messages are logged to a backlog that players can access by pressing Shift
   - The backlog preserves all text formatting and face graphics
   - Players can scroll through previous messages to review important information
   - Special inputs (like choices) are marked with a special format in the backlog

4. **Narrative Techniques**:
   - Different text colors are used to distinguish between:
     - Normal dialogue (default color)
     - Internal thoughts (blue color)
     - System messages (green color)
     - Important information (yellow color)
     - Warnings or danger (red color)
   - Font size changes are used for emphasis or to represent volume changes
   - Name boxes clearly identify speakers in multi-character conversations

5. **Technical Implementation**:
   - Custom fonts are used for a unique visual style that fits the cyberpunk setting
   - Font size is set to 28 for good readability on various screen sizes
   - Message window width is set to the full screen width for maximum text space
   - Face indent is carefully calculated to ensure text doesn't overlap with face graphics

### YEP_X_MessageBacklog

#### Overview
This plugin adds a message backlog function to the game's message system, allowing players to review previous dialogue and narrative text. This is particularly useful for story-heavy games where players might want to revisit important information.

#### Configuration in MegaEarth2049
- **Backlog Key**: shift (Key to open the backlog)
- **Enable Backlog**: true (Enables the backlog feature)
- **Disable Switch**: 0 (No switch disables the backlog)
- **Max Messages**: 100 (Maximum number of messages stored in the backlog)
- **Log Choices**: true (Choices are logged in the backlog)
- **Choice Format**: \c[6]%1\c[0] (Format for displaying choices in the backlog)
- **Choice Indent**: 2 (Indentation for choices in the backlog)
- **Window Width**: Graphics.boxWidth (Width of the backlog window)
- **Window Height**: Graphics.boxHeight (Height of the backlog window)
- **Window X**: 0 (X position of the backlog window)
- **Window Y**: 0 (Y position of the backlog window)
- **Window Opacity**: 192 (Opacity of the backlog window)
- **Scroll Speed**: 4 (Speed of scrolling through the backlog)
- **Scroll Increment**: 1 (Number of lines scrolled at once)
- **Scroll Wait**: 8 (Wait time between scrolls)

#### Implementation in MegaEarth2049
The Message Backlog plugin enhances the narrative experience by allowing players to review previous dialogue:

1. **Backlog Access**:
   - Players can access the backlog by pressing the Shift key during or after dialogue
   - The backlog can be accessed from most game screens, including map, battle, and menu
   - A visual indicator shows when the backlog is available

2. **Backlog Content**:
   - All dialogue messages are stored in the backlog
   - Face graphics are preserved alongside the text
   - Text formatting (colors, sizes, icons) is maintained
   - Player choices are recorded with special formatting
   - System messages can be optionally included or excluded

3. **Navigation Features**:
   - Players can scroll through the backlog using arrow keys or mouse wheel
   - Page Up/Down keys allow for faster navigation
   - The most recent messages are displayed at the bottom
   - A scrollbar indicates the current position in the backlog

4. **Visual Presentation**:
   - The backlog window uses a semi-transparent background
   - Text is formatted consistently with the original messages
   - Face graphics are displayed at a slightly reduced size
   - A custom window skin matches the game's cyberpunk aesthetic

5. **Integration with Game Flow**:
   - The backlog can be disabled during specific scenes if needed
   - Accessing the backlog pauses the game but doesn't interrupt gameplay
   - The backlog is cleared at specific story points to prevent spoilers
   - Important tutorial information is highlighted in the backlog

### YEP_VictoryAftermath

#### Overview
This plugin displays an informative window after a battle is over instead of message box text, providing a more visually appealing and informative battle results screen.

#### Configuration in MegaEarth2049
- **Victory Order**: exp custom drops
- **BGM**: Victory1 (BGM played during victory sequence)
- **BGM Volume**: 90 (Volume of the victory BGM)
- **BGM Pitch**: 100 (Pitch of the victory BGM)
- **BGM Pan**: 0 (Pan of the victory BGM)
- **Duration**: 180 (Duration of the victory sequence)
- **Battle Results Text**: Battle Results (Text displayed for battle results)
- **Font Size**: 28 (Font size for the victory aftermath windows)
- **EXP Earned Text**: EXP Earned (Text displayed for experience earned)
- **Level Up Text**: LEVEL UP! (Text displayed for level up)
- **Max Level Text**: MAX LEVEL (Text displayed for maximum level)
- **Format Actor**: Actor
- **JP Earned Text**: JP Earned (Text displayed for JP earned)
- **Earned JP Format**: %1 JP (Format for JP earned)
- **Earned JP Format**: %1 JP (Format for JP earned)
- **Mastered JP Format**: MASTERED! (Format for mastered JP)

#### Implementation in MegaEarth2049
The Victory Aftermath plugin creates a more engaging and informative post-battle experience:

1. **Victory Sequence**:
   - Victory music plays when the battle is won
   - A battle results window displays basic information
   - Experience points earned are shown with animations
   - Level ups are highlighted with special effects
   - Item drops are displayed with icons and descriptions

2. **Experience Display**:
   - Shows experience earned for each party member
   - Displays current level and progress to next level
   - Animates experience gain with filling gauges
   - Highlights level ups with special effects and sounds
   - Shows parameter increases from level ups

3. **JP System Integration**:
   - Displays JP earned for each party member
   - Shows current JP and progress toward skill learning
   - Highlights when skills become available to learn
   - Integrates with YEP_JobPoints for JP calculations
   - Works with YEP_X_AftermathLevelUp for level up displays

4. **Item Drop Display**:
   - Shows items, weapons, and armor obtained from battle
   - Displays gold earned with animations
   - Groups similar items for cleaner presentation
   - Provides item descriptions on selection
   - Integrates with YEP_ItemCore for independent items

5. **Custom Victory Elements**:
   - Supports custom victory sequences for special battles
   - Allows for boss-specific victory animations
   - Can display story-relevant information after key battles
   - Supports conditional victory rewards
   - Integrates with the game's achievement system

### YEP_X_AftermathLevelUp

#### Overview
This plugin adds a level up portion to the Victory Aftermath sequences, showing detailed information about character growth when they level up after battle.

#### Configuration in MegaEarth2049
- **Level Up Title**: %1 has reached Level %2! (Title format for level up display)
- **Enable Aftermath**: true (Enable the level up aftermath)
- **Font Size**: 28 (Font size for the level up display)
- **Skill Text Singular**: Acquired Skill (Text for a single acquired skill)
- **Skill Text Plural**: Acquired Skills (Text for multiple acquired skills)
- **Skill List Width**: 200 (Width of the skill list)

#### Implementation in MegaEarth2049
The Aftermath Level Up plugin enhances the post-battle experience by providing detailed information about character growth:

1. **Level Up Display**:
   - Shows which characters leveled up during the battle
   - Displays the new level with visual and sound effects
   - Shows parameter changes with before/after comparisons
   - Highlights significant stat increases
   - Provides a satisfying visual reward for character progression

2. **Skill Acquisition**:
   - Displays new skills learned from leveling up
   - Shows skill icons, names, and descriptions
   - Provides visual effects for skill acquisition
   - Groups skills by type for organized presentation
   - Integrates with YEP_SkillLearnSystem for JP-based skill learning

3. **Visual Presentation**:
   - Character face graphics are displayed prominently
   - Parameter changes are color-coded (green for increases, red for decreases)
   - Animations highlight important information
   - Custom window skin matches the game's cyberpunk aesthetic
   - Sound effects enhance the feeling of progression

4. **Integration with Other Systems**:
   - Works with ROKI_HealOnLvUp to show healing on level up
   - Connects with YEP_JobPoints to show JP earned
   - Supports YEP_SkillLearnSystem for skill acquisition display
   - Integrates with YEP_VictoryAftermath for a seamless post-battle experience

## Integration Examples

### Message System Integration

The Message Core and Message Backlog plugins work together to create a comprehensive dialogue system:

```javascript
// Example of a complex message with formatting
$gameMessage.add("\\c[6]Rex:\\c[0] I found something interesting in the \\c[3]Timbuc Ruins\\c[0].");
$gameMessage.add("It looks like some kind of \\{ancient technology\\}.");
$gameMessage.add("\\af[2]\\c[6]Jen:\\c[0] Be careful! Those ruins are \\c[2]radioactive\\c[0].");
$gameMessage.add("We should bring it to \\c[6]Zed\\c[0] for analysis.");
```

### Victory Aftermath Integration

The Victory Aftermath and Aftermath Level Up plugins create a comprehensive post-battle experience:

```javascript
// Example of custom victory rewards
BattleManager.makeRewards = function() {
    this._rewards = {};
    this._rewards.gold = $gameTroop.goldTotal();
    this._rewards.exp = $gameTroop.expTotal();
    this._rewards.items = $gameTroop.makeDropItems();
    
    // Custom rewards for boss battles
    if ($gameTroop.isBossTroop()) {
        this._rewards.gold *= 2;
        this._rewards.exp *= 1.5;
        this._rewards.jp = 100;
    }
};
```

## Related Documentation

- [Battle_System_Plugins.md](Battle_System_Plugins.md) - Documentation for battle system plugins
- [Character_Party_Plugins.md](Character_Party_Plugins.md) - Documentation for character and party plugins
- [Item_Equipment_Plugins.md](Item_Equipment_Plugins.md) - Documentation for item and equipment plugins
- [States_Effects_Plugins.md](States_Effects_Plugins.md) - Documentation for states and effects plugins
- [RPG_Maker_MV_Plugins_README.md](RPG_Maker_MV_Plugins_README.md) - Main plugins documentation index
