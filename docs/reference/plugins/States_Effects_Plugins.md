> Reference snapshot: verify IDs, effects and enabled-plugin behavior against the live data and current FAQs. This relocation does not certify the older catalog as current.

# States and Effects Plugins Documentation

This document provides detailed information about states and effects related plugins used in the MegaEarth2049 RPG Maker MV project.

## Table of Contents
- [Overview](#overview)
- [Plugin List](#plugin-list)
- [Detailed Documentation](#detailed-documentation)
  - [YEP_BuffsStatesCore](#yep_buffsstatescore)
  - [YEP_X_StateCategories](#yep_x_statecategories)
  - [YEP_X_ExtDoT](#yep_x_extdot)
  - [YEP_X_VisualStateFX](#yep_x_visualstatefx)
  - [YEP_AbsorptionBarrier](#yep_absorptionbarrier)
  - [HIME_PlaceholderStates](#hime_placeholderstates)
- [Integration Examples](#integration-examples)
- [Related Documentation](#related-documentation)

## Overview

The states and effects systems in MegaEarth2049 are enhanced through a collection of plugins that expand the default RPG Maker MV functionality. These plugins work together to create more dynamic and visually engaging status effects, barriers, and damage-over-time mechanics.

### Plugin Dependencies

```
YEP_BuffsStatesCore
├── YEP_X_StateCategories
├── YEP_X_ExtDoT
└── YEP_X_VisualStateFX
```

## Plugin List

| Plugin Name | Version | Status | Description |
|-------------|---------|--------|-------------|
| YEP_BuffsStatesCore | v1.15 | Enabled | Alters the basic mechanics behind buffs and states |
| YEP_X_StateCategories | v1.06 | Enabled | Sets up categories for states to make control over them easier |
| YEP_X_ExtDoT | v1.03 | Enabled | Creates custom Damage over Time formulas and effects |
| YEP_X_VisualStateFX | v1.02 | Enabled | Adds visual effects to states |
| YEP_AbsorptionBarrier | v1.07 | Enabled | Allows battlers to have damage-absorbing barriers |
| HIME_PlaceholderStates | v1.0 | Enabled | Creates states that may resolve to different states when added or removed |

## Detailed Documentation

### YEP_BuffsStatesCore

#### Overview
This plugin alters the basic mechanics behind buffs and states that aren't adjustable within the RPG Maker editor. It provides more control over how states are applied, removed, and displayed during battle.

#### Configuration in MegaEarth2049
- **Show Turns**: true (Show the number of turns remaining for states)
- **Enemy Buff/State Display**: Configured to show turns and counters
- **Buff Formula**: this._buffs[paramId] * 0.25 + 1.0 (Formula for calculating buff effects)

#### Implementation in MegaEarth2049
The Buffs States Core is extended by several other plugins (StateCategories, ExtDoT, VisualStateFX) to create a comprehensive state system. Various skills in the game apply states with visual effects and damage-over-time capabilities:

1. **State Application**:
   - "Bite" (ID 126): Has a chance to apply state 26
   - "Smoke Bomb" (ID 76): Applies state 5 with a 70% chance
   - "Poop Fling" (ID 43): Applies state 14 with a 50% chance and state 32 with a 15% chance

2. **State Categories**:
   - Positive states (buffs, enhancements)
   - Negative states (debuffs, ailments)
   - Neutral states (transformations, special conditions)
   - Special states (unique game mechanics)

3. **State Mechanics**:
   - State stacking for certain effects
   - State immunity based on equipment or traits
   - State resistance calculations
   - Custom state removal conditions

4. **Visual Feedback**:
   - State icons displayed above battlers
   - Turn counters for active states
   - Visual effects for state application and removal

### YEP_X_StateCategories

#### Overview
This plugin sets up categories for states to make control over them easier. It allows for grouping states into categories that can be referenced by other plugins and game mechanics.

#### Implementation in MegaEarth2049
The State Categories plugin is used to organize states into logical groups for easier management and reference:

1. **Category Types**:
   - **Buff**: Positive status effects that enhance parameters
   - **Debuff**: Negative status effects that reduce parameters
   - **Ailment**: Status conditions that impair functionality
   - **Special**: Unique status effects with special mechanics
   - **Environmental**: Status effects related to environment or terrain

2. **State Notetags**:
   - `<State Category: Buff>`: Categorizes a state as a buff
   - `<State Category: Debuff>`: Categorizes a state as a debuff
   - `<State Category: Ailment>`: Categorizes a state as an ailment
   - `<State Category: Special>`: Categorizes a state as a special state
   - `<State Category: Environmental>`: Categorizes a state as an environmental state

3. **Category-Based Mechanics**:
   - Equipment that provides resistance to specific categories
   - Skills that are effective against specific categories
   - Items that remove all states of a specific category
   - Conditional effects based on state categories

4. **Integration with Other Systems**:
   - Works with YEP_X_ExtDoT for category-based damage over time effects
   - Connects with YEP_X_VisualStateFX for category-specific visual effects
   - Supports YEP_BuffsStatesCore for enhanced state mechanics

### YEP_X_ExtDoT

#### Overview
This plugin allows for the creation of custom Damage over Time (DoT) formulas and effects. It extends the functionality of states to include periodic damage or healing effects.

#### Configuration in MegaEarth2049
- **Regen Animation**: 46 (Animation ID for regeneration effects)
- **DoT Animation**: 59 (Animation ID for damage over time effects)
- **Default Variance**: 20 (Default variance for damage calculations)
- **Default Element**: 0 (Default element for damage calculations)

#### Implementation in MegaEarth2049
The Extended Damage over Time system is used to create states that deal damage over multiple turns, adding strategic depth to battles. Players can apply these states to enemies to deal damage over time, while also focusing on other targets or defensive actions.

1. **DoT State Types**:
   - **Poison**: Deals physical damage over time
   - **Burn**: Deals fire elemental damage over time
   - **Bleed**: Deals physical damage over time with increasing severity
   - **Radiation**: Deals magical damage over time with parameter debuffs
   - **Corrosion**: Deals damage to both HP and MP over time

2. **State Notetags**:
   - `<State x Turn HP Damage: y>`: Deals y HP damage every x turns
   - `<State x Turn MP Damage: y>`: Deals y MP damage every x turns
   - `<State x Turn HP Heal: y>`: Heals y HP every x turns
   - `<State x Turn MP Heal: y>`: Heals y MP every x turns
   - `<State x Turn TP Damage: y>`: Deals y TP damage every x turns
   - `<State x Turn TP Heal: y>`: Heals y TP every x turns

3. **Custom Damage Formulas**:
   - Formula-based damage calculations
   - Scaling based on target's maximum HP/MP
   - Variance in damage amounts
   - Elemental properties for damage

4. **Visual Feedback**:
   - Damage popups for DoT effects
   - Animations for damage application
   - State icons with turn counters
   - Visual effects for state activation

### YEP_X_VisualStateFX

#### Overview
This plugin adds visual effects to states, making them more noticeable and impactful. It provides visual feedback when states are applied, active, and removed.

#### Configuration in MegaEarth2049
- **Actor/Enemy State Display**: Overlays, icons, and animations enabled
- **Animation Settings**: Flash and sound effects enabled

#### Implementation in MegaEarth2049
Visual State Effects are used to provide clear feedback when states are applied, making the battle system more intuitive and visually engaging. Players can easily see which characters are affected by which states, helping them make strategic decisions.

1. **Visual Effect Types**:
   - **Overlays**: Visual effects that appear over the battler
   - **Animations**: Animations that play when states are applied or removed
   - **Sprites**: Additional sprites that appear with the battler
   - **Tints**: Color changes applied to the battler

2. **State Notetags**:
   - `<State Animation: x>`: Plays animation x when the state is applied
   - `<State Overlay: filename>`: Displays an overlay image on the affected battler
   - `<State Tone: r, g, b, a>`: Changes the color tone of the affected battler
   - `<Visual State Effect: effect>`: Applies a custom visual effect

3. **Category-Based Effects**:
   - Different visual effects based on state categories
   - Consistent visual language for similar state types
   - Intensity scaling based on state severity

4. **Integration with Battle System**:
   - Works with YEP_BattleEngineCore for enhanced battle visuals
   - Connects with YEP_X_AnimatedSVEnemies for enemy state animations
   - Supports YEP_BuffsStatesCore for state mechanics

### YEP_AbsorptionBarrier

#### Overview
This plugin allows battlers to be surrounded by an absorption barrier that would mitigate damage dealt to HP. These barriers act as a form of temporary hit points that absorb damage before it affects the character's actual HP.

#### Configuration in MegaEarth2049
- **Barrier State**: 15 (State ID for the barrier effect)
- **Barrier Colors**: 13 and 5 (Colors for the barrier gauge)
- **Barrier Animation**: 136 (Animation ID for barrier application)
- **Break Animation**: 135 (Animation ID for barrier breaking)
- **Clear Per Battle**: true (Barriers are cleared at the end of battle)
- **Clear on Death**: true (Barriers are cleared when a battler dies)

#### Implementation in MegaEarth2049
The Absorption Barrier system is used in several skills to provide defensive capabilities:

1. **Barrier-Creating Skills**:
   - "Barrier" (ID 46): Adds a 200-point barrier to a single target
   - "Magic Barrier" (ID 47): Adds a 200-point barrier to a single target
   - "Firewall" (ID 52): Adds a 100-point barrier to all allies
   - "Rally" (ID 24): Adds a 150-point barrier to all allies

2. **Barrier-Breaking Skills**:
   - "Tinker" (ID 48): Reduces enemy barriers by 100 points
   - "Hackathon" (ID 49): Reduces enemy barriers by 75 points
   - "Reverse Engineer" (ID 50): Reduces enemy barriers by 200 points

3. **Barrier Mechanics**:
   - Barriers absorb damage before it affects HP
   - Multiple barriers can be stacked
   - Barriers can be targeted and reduced by specific skills
   - Barriers are displayed as a gauge above the character

4. **Visual Feedback**:
   - Barrier gauges displayed above battlers
   - Animations for barrier application and breaking
   - Damage popups showing barrier absorption
   - Visual effects for barrier activation

### HIME_PlaceholderStates

#### Overview
This plugin allows for the creation of states that may resolve to different states when they are added or removed, based on a formula. This creates dynamic state progression systems where applying the same state multiple times can lead to different outcomes.

#### Configuration in MegaEarth2049
The plugin is used with its default configuration, with no custom parameters set.

#### Implementation in MegaEarth2049
The game uses placeholder states to create dynamic state progression systems, where applying the same state multiple times can lead to different outcomes. There are two main placeholder states implemented:

1. **Dia/Dys (State 14)**:
   This placeholder state resolves to either Diarrhea (State 11) or Dysentery (State 13) based on how long the character has had Diarrhea:
   ```javascript
   <placeholder state>
   var diarrhea = 11;
     if (a.isStateAffected(diarrhea)) {
       var turnsLeft = a._stateTurns[diarrhea];
       if(turnsLeft >= 11) {
         13;
       } else {
         11
       } 
     }
     else {
        11;
     } 
   </placeholder state>
   ```
   - First application: Applies Diarrhea (State 11)
   - If Diarrhea has been active for 11+ turns and the state is applied again: Applies Dysentery (State 13)
   - Dysentery is a more severe condition with stronger debuffs than Diarrhea

2. **Hyped/Stoked (State 18)**:
   This placeholder state resolves to either Hyped (State 19) or Stoked (State 20) based on how long the character has been Hyped:
   ```javascript
   <placeholder state>
   var hype = 19;
     if (a.isStateAffected(hype)) {
       var turnsLeft = a._stateTurns[hype];
       if(turnsLeft >= 11) {
         20;
       } else {
         19
       } 
     }
     else {
        19;
     } 
   </placeholder state>
   ```
   - First application: Applies Hyped (State 19)
   - If Hyped has been active for 11+ turns and the state is applied again: Applies Stoked (State 20)
   - Stoked provides stronger buffs than Hyped, including increased parameters and special attack replacements

These placeholder states create interesting gameplay mechanics where the same skill or item can have different effects based on the target's current condition, adding strategic depth to the battle system.

## Integration Examples

### State Progression System

The Placeholder States and Extended DoT plugins work together to create a dynamic state progression system:

```javascript
// Example of state progression with DoT effects
var stateProgression = {
    // Poison progression
    10: { // "Poison" state
        dot: { hp: 50, variance: 10, element: 0 },
        duration: 5,
        nextState: 11 // Progresses to "Severe Poison" if reapplied
    },
    11: { // "Severe Poison" state
        dot: { hp: 100, variance: 20, element: 0 },
        duration: 5,
        nextState: 12 // Progresses to "Toxic" if reapplied
    },
    12: { // "Toxic" state
        dot: { hp: 200, variance: 30, element: 0 },
        duration: 5,
        nextState: 12 // Stays as "Toxic" if reapplied
    }
};
```

### Visual State Effects Integration

The Visual State Effects plugin works with the State Categories plugin to create consistent visual language:

```javascript
// Example of category-based visual effects
var categoryEffects = {
    "Buff": {
        overlay: "buff_overlay",
        animation: 123,
        tone: [0, 50, 0, 0] // Green tint
    },
    "Debuff": {
        overlay: "debuff_overlay",
        animation: 124,
        tone: [50, 0, 0, 0] // Red tint
    },
    "Ailment": {
        overlay: "ailment_overlay",
        animation: 125,
        tone: [50, 0, 50, 0] // Purple tint
    }
};
```

## Related Documentation

- [Battle_System_Plugins.md](Battle_System_Plugins.md) - Documentation for battle system plugins
- [Character_Party_Plugins.md](Character_Party_Plugins.md) - Documentation for character and party plugins
- [Item_Equipment_Plugins.md](Item_Equipment_Plugins.md) - Documentation for item and equipment plugins
- [RPG_Maker_MV_Plugins_README.md](RPG_Maker_MV_Plugins_README.md) - Main plugins documentation index
