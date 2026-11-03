> Reference snapshot: verify IDs, effects and enabled-plugin behavior against the live data and current FAQs. This relocation does not certify the older catalog as current.

# MegaEarth2049 States System Documentation

This document provides detailed information about the state system in MegaEarth2049, focusing on the `States.json` file structure, state types, and their integration with game mechanics, with special attention to the disease system.

## 1. States.json Structure

The `States.json` file defines all status effects in the game. Each state entry contains:

```json
{
  "id": 11,
  "autoRemovalTiming": 2,
  "chanceByDamage": 100,
  "traits": [
    {"code": 21, "dataId": 5, "value": 0.9},
    {"code": 21, "dataId": 3, "value": 0.9}
  ],
  "iconIndex": 1600,
  "maxTurns": 5,
  "message1": " has diarrhea, cha cha cha!",
  "message2": " has diarrhea!",
  "message3": " has explosive diarrhea!",
  "message4": " no longer has the shits.",
  "minTurns": 5,
  "motion": 0,
  "name": "Diarrhea",
  "note": "<State Animation: 133>\n<Reapply Add Turns>\n\n",
  "overlay": 0,
  "priority": 50,
  "removeAtBattleEnd": false,
  "removeByDamage": false,
  "removeByRestriction": false,
  "removeByWalking": false,
  "restriction": 0,
  "stepsToRemove": 100
}
```

Where:
- **id**: Unique identifier for the state
- **name**: Display name
- **iconIndex**: Reference to the icon graphic
- **priority**: Determines which state icon is displayed when multiple states are active (higher = higher priority)
- **restriction**: Action restrictions (0 = none, 1 = attack enemy only, 2 = attack random target, 3 = attack allies only, 4 = cannot act)
- **traits**: Array of trait objects that define the state's effects
- **messages**: Text displayed when the state is applied (1), when already applied (2), during turns (3), and when removed (4)
- **autoRemovalTiming**: When the state is automatically removed (0 = none, 1 = end of action, 2 = end of turn)
- **minTurns/maxTurns**: Minimum and maximum duration in turns
- **removeAtBattleEnd**: Whether the state is removed at the end of battle
- **removeByDamage**: Whether the state can be removed when taking damage
- **chanceByDamage**: Chance of removal when taking damage (if removeByDamage is true)
- **removeByWalking**: Whether the state is removed by walking
- **stepsToRemove**: Number of steps required to remove the state (if removeByWalking is true)
- **note**: Custom properties (often contains plugin-specific parameters)

### 1.1 Trait Codes

The `traits` array contains objects that define the state's effects:

| Code | Description | dataId | value |
|------|-------------|--------|-------|
| 11 | Element Rate | Element ID | Rate (1.0 = 100%) |
| 12 | Debuff Rate | Parameter ID | Rate (1.0 = 100%) |
| 13 | State Rate | State ID | Rate (1.0 = 100%) |
| 14 | State Immunity | State ID | 1 = immune |
| 21 | Parameter | Parameter ID | Multiplier (1.0 = 100%) |
| 22 | Ex-Parameter | Ex-Parameter ID | Value change |
| 23 | Sp-Parameter | Sp-Parameter ID | Value change |
| 31 | Attack Element | Element ID | 1 = add element |
| 32 | Attack State | State ID | Chance (1.0 = 100%) |
| 33 | Attack Speed | - | Value change |
| 34 | Attack Times | - | Number of additional attacks |
| 41 | Attack Skill | Skill ID | Replace with skill |
| 42 | Add Skill Type | Skill Type ID | 1 = add type |
| 43 | Seal Skill Type | Skill Type ID | 1 = seal type |
| 44 | Add Skill | Skill ID | 1 = add skill |
| 45 | Seal Skill | Skill ID | 1 = seal skill |
| 51 | Equip Weapon | Weapon Type ID | 1 = can equip |
| 52 | Equip Armor | Armor Type ID | 1 = can equip |
| 53 | Fix Equipment | - | 1 = fixed |
| 54 | Seal Equipment | - | 1 = sealed |
| 55 | Slot Type | Slot Type ID | 1 = set type |
| 61 | Action Times | - | Value change |
| 62 | Special Flag | Flag ID | 1 = set flag |
| 63 | Collapse Type | Collapse Type ID | 1 = set type |
| 64 | Party Ability | Party Ability ID | 1 = set ability |

### 1.2 Parameter IDs

When traits reference parameters (code 21), they use these IDs:

| ID | Parameter |
|----|-----------|
| 0 | Max HP |
| 1 | Max MP |
| 2 | Attack |
| 3 | Defense |
| 4 | Magic Attack |
| 5 | Magic Defense |
| 6 | Agility |
| 7 | Luck |

### 1.3 Ex-Parameter IDs

When traits reference ex-parameters (code 22), they use these IDs:

| ID | Ex-Parameter |
|----|--------------|
| 0 | Hit Rate |
| 1 | Evasion Rate |
| 2 | Critical Rate |
| 3 | Critical Evasion |
| 4 | Magic Evasion |
| 5 | Magic Reflection |
| 6 | Counter Attack |
| 7 | HP Regeneration |
| 8 | MP Regeneration |
| 9 | TP Regeneration |

## 2. State Categories in MegaEarth2049

The game features diverse state types that reflect its cyberpunk setting:

### 2.1 Standard RPG States (IDs 1-10)

These are the default states included in RPG Maker MV:

- **Knockout** (ID 1): Character is defeated (HP = 0)
- **Guard** (ID 2): Character is guarding (reduced damage)
- **Immortal** (ID 3): Character cannot die
- **Poison** (ID 4): Character takes damage over time
- **Blind** (ID 5): Character has reduced hit rate
- **Silence** (ID 6): Character cannot use magic
- **Rage** (ID 7): Character attacks randomly
- **Confusion** (ID 8): Character may attack allies
- **Fascination** (ID 9): Character may help enemies
- **Sleep** (ID 10): Character cannot act

### 2.2 Disease States (IDs 11-14, 26-32, 37-38)

MegaEarth2049 features a unique disease system with various conditions:

#### 2.2.1 Gastrointestinal Diseases
- **Diarrhea** (ID 11): Reduces Defense and Attack by 10%
  - Applied message: " has diarrhea, cha cha cha!"
  - During message: " has explosive diarrhea!"
  - Remove message: " no longer has the shits."
  - Has animation 133
  - Duration: 5 turns
  - `<Reapply Add Turns>` tag adds turns when reapplied

- **Constipation** (ID 12): Not fully implemented

- **Dysentery** (ID 13): Severe form of diarrhea
  - Reduces multiple stats (HP, MP, ATK, DEF, MAT, MDF) by 25-50%
  - Prevents HP recovery (trait code 14, dataId 11)
  - Has animation 134
  - Applied message: " has dysentary. Oh my god, there is shit everywhere!"
  - Remove message: " has been cured of dysentary."

- **Dia/Dys** (ID 14): Placeholder state that resolves to either Diarrhea or Dysentery
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

#### 2.2.2 Infectious Diseases
- **Rabies** (ID 26): Causes confusion and damage over time
  - Reduces HP by 2% per turn (trait code 22, dataId 7, value -0.02)
  - Causes confusion (restriction 2)
  - Duration: 3-7 turns

- **Fever** (ID 37): Not fully implemented
- **Sickness** (ID 38): Not fully implemented

#### 2.2.3 Sexually Transmitted Diseases (STDs)
- **Herpes** (ID 27): Not fully implemented
- **AIDS** (ID 28): Not fully implemented
- **Gonorrhea** (ID 29): Not fully implemented
- **Syphilis** (ID 30): Not fully implemented
- **The Clap** (ID 31): Not fully implemented
- **Hepatitis B** (ID 32): Reduces hit rate by 10%
  - Reduces hit rate (trait code 22, dataId 0, value -0.1)
  - Duration: 15 turns

### 2.3 Buff/Debuff States (IDs 15-16, 19-23, 25, 33-36, 39-42)

These states provide positive or negative effects to characters:

#### 2.3.1 Defensive Buffs
- **Barrier** (ID 15): Increases Defense by 10%
  - Has animation 139
  - Increases Defense (trait code 21, dataId 3, value 1.1)

- **Magic Barrier** (ID 23): Increases Magic Defense by 10%
  - Increases Magic Defense (trait code 21, dataId 5, value 1.1)

- **Regen** (ID 16): Regenerates HP over time
  - Has animation 137
  - Increases HP regeneration (trait code 23, dataId 2, value 0.1)

#### 2.3.2 Mood States
- **Hyped/Stoked** (ID 18): Placeholder state that resolves to either Hyped or Stoked
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

- **Hyped** (ID 19): Moderate mood enhancement
  - Increases Attack and Magic Attack by 20%
  - Increases TP and MP regeneration by 2%
  - Duration: 5 turns
  - `<Reapply Add Turns>` tag adds turns when reapplied
  - Has custom attack replacement logic:
    ```javascript
    <Custom Replace Attack>
    var rand = Math.floor(Math.random() * 100);
      if (rand >= 95) {
        id = 3;
      } else if ((rand >= 80) && (rand < 95)) {
        id = 4;
      } else {
        id = 0;
      }
    </Custom Replace Attack>
    ```

- **Stoked** (ID 20): Advanced mood enhancement
  - Increases Attack, Magic Attack, and Agility by 20%
  - Increases HP, MP, and Magic Defense by 10%
  - Increases Defense by 10%
  - Increases TP and MP regeneration by 5%
  - Provides immunity to Hyped (trait code 14, dataId 19, value 1)
  - Duration: 15 turns
  - Has custom attack replacement logic:
    ```javascript
    <Custom Replace Attack>
    var rand = Math.floor(Math.random() * 100);
      if (rand >= 90) {
        id = 5;
      } else if ((rand >= 70) && (rand < 90)) {
        id = 12;
      } else {
        id = 0;
      }
    </Custom Replace Attack>
    ```

- **Bummed** (ID 21): Negative mood state
  - Provides immunity to Hyped (trait code 14, dataId 19, value 1)
  - Duration: 3 turns

- **Hysterical** (ID 39): Causes confusion
  - Causes confusion (restriction 3)
  - Duration: 5 turns

#### 2.3.3 Elemental Debuffs
- **Frostbite** (ID 25): Cold-based debuff
  - Reduces HP by 2% per turn (trait code 22, dataId 7, value -0.02)
  - Increases ice element vulnerability by 50% (trait code 11, dataId 3, value 1.5)
  - Increases physical vulnerability by 20% (trait code 11, dataId 1, value 1.2)

- **Soaked** (ID 34): Water-based debuff
  - Reduces HP by 2% per turn (trait code 22, dataId 7, value -0.02)
  - Increases water element vulnerability by 50% (trait code 11, dataId 5, value 1.5)
  - Increases physical vulnerability by 20% (trait code 11, dataId 1, value 1.2)

- **Burn** (ID 35): Fire-based debuff
  - Reduces HP by 2% per turn (trait code 22, dataId 7, value -0.02)
  - Increases fire element vulnerability by 50% (trait code 11, dataId 2, value 1.5)
  - Increases physical vulnerability by 20% (trait code 11, dataId 1, value 1.2)

- **Shock** (ID 36): Lightning-based debuff
  - Reduces HP by 2% per turn (trait code 22, dataId 7, value -0.02)
  - Increases lightning element vulnerability by 50% (trait code 11, dataId 4, value 1.5)
  - Increases physical vulnerability by 20% (trait code 11, dataId 1, value 1.2)

- **Windblown** (ID 40): Wind-based debuff
  - Reduces HP by 2% per turn (trait code 22, dataId 7, value -0.02)
  - Increases wind element vulnerability by 50% (trait code 11, dataId 7, value 1.5)
  - Increases physical vulnerability by 20% (trait code 11, dataId 1, value 1.2)

- **Blessed** (ID 41): Light-based debuff
  - Reduces HP by 2% per turn (trait code 22, dataId 7, value -0.02)
  - Increases light element vulnerability by 50% (trait code 11, dataId 8, value 1.5)
  - Increases physical vulnerability by 20% (trait code 11, dataId 1, value 1.2)

- **Vexed** (ID 42): Dark-based debuff
  - Reduces HP by 2% per turn (trait code 22, dataId 7, value -0.02)
  - Increases dark element vulnerability by 50% (trait code 11, dataId 9, value 1.5)
  - Increases physical vulnerability by 20% (trait code 11, dataId 1, value 1.2)

#### 2.3.4 Movement Debuffs
- **Stuck** (ID 33): Prevents movement
  - Increases earth element vulnerability by 50% (trait code 11, dataId 6, value 1.5)
  - Prevents action (restriction 4)
  - Duration: 3 turns

### 2.4 Special States (IDs 17, 24, 43-46)

These states have unique effects or are used for special mechanics:

- **Test State** (ID 17): Used for testing
  - Has custom turn calculation:
    ```javascript
    <Custom State 17 Turn>
    turn = 5;
    </Custom State 17 Turn>
    ```

- **Quarantine** (ID 24): Prevents disease spread
  - Prevents skill use (traits with code 42)
  - Prevents item use (traits with code 44)
  - Restricts movement (restriction 4)
  - Duration: 2 turns
  - Description: "Removes Disease"

- **Protection** (ID 43): Not fully implemented
- **Blank States** (IDs 44-46): Not implemented

## 3. Disease System in Detail

MegaEarth2049 features a unique disease system that adds strategic depth to gameplay. The disease system includes:

### 3.1 Disease Mechanics

#### 3.1.1 Disease Application
Diseases can be applied through various means:
- **Enemy Skills**: Certain enemy skills can inflict diseases
- **Environmental Factors**: Some areas may have a chance to inflict diseases
- **Story Events**: Certain story events may inflict diseases as part of the narrative
- **Item Side Effects**: Some items may have a chance to cause diseases as a side effect

#### 3.1.2 Disease Effects
Diseases have various negative effects:
- **Stat Reductions**: Most diseases reduce one or more stats
- **Damage Over Time**: Many diseases cause HP loss over time
- **Action Restrictions**: Some diseases restrict actions or cause confusion
- **Elemental Vulnerabilities**: Some diseases increase vulnerability to certain elements

#### 3.1.3 Disease Duration
Diseases have different durations:
- **Short-term**: 3-5 turns (e.g., Rabies)
- **Medium-term**: 5-10 turns (e.g., Diarrhea)
- **Long-term**: 10+ turns (e.g., Hepatitis B)
- **Permanent**: Some diseases may be permanent until cured (not fully implemented)

### 3.2 Disease Progression System

The game uses placeholder states to create dynamic disease progression:

#### 3.2.1 Diarrhea to Dysentery Progression
- **Initial Infection**: When the Dia/Dys state (ID 14) is applied, it resolves to Diarrhea (ID 11)
- **Progression Check**: If Diarrhea has been active for 11+ turns and Dia/Dys is applied again, it resolves to Dysentery (ID 13)
- **Effect Escalation**: Dysentery has more severe effects than Diarrhea:
  - Diarrhea: Reduces DEF and ATK by 10%
  - Dysentery: Reduces multiple stats by 25-50% and prevents recovery

#### 3.2.2 Hyped to Stoked Progression
While not a disease, this system uses the same placeholder state mechanism:
- **Initial Application**: When the Hyped/Stoked state (ID 18) is applied, it resolves to Hyped (ID 19)
- **Progression Check**: If Hyped has been active for 11+ turns and Hyped/Stoked is applied again, it resolves to Stoked (ID 20)
- **Effect Escalation**: Stoked has stronger effects than Hyped:
  - Hyped: Increases ATK and MAT by 20%, minor regeneration
  - Stoked: Increases multiple stats by 10-20%, stronger regeneration, special attacks

### 3.3 Cure Mechanics

Diseases can be cured through various means:

#### 3.3.1 Item Cures
While not fully implemented in the current Items.json, disease cure items would use effect code 22 (Remove State) with the appropriate state ID:

```json
{
  "effects": [
    {
      "code": 22,
      "dataId": 11,
      "value1": 0,
      "value2": 100
    }
  ]
}
```

#### 3.3.2 Skill Cures
Healing skills can remove diseases:
- **Cure** (not implemented): Would remove basic diseases
- **Esuna** (not implemented): Would remove all diseases
- **Specific Cure Skills** (not implemented): Would target specific diseases

#### 3.3.3 Quarantine
The Quarantine state (ID 24) is a special state that:
- Prevents the character from acting (restriction 4)
- Likely prevents disease spread to other characters
- May have a chance to cure diseases over time (not explicitly implemented)

#### 3.3.4 Time-Based Recovery
Some diseases may resolve on their own after a certain number of turns:
- **autoRemovalTiming**: Determines when the state is automatically removed
- **minTurns/maxTurns**: Sets the duration range for the state

## 4. State Implementation Details

### 4.1 YEP_BuffsStatesCore Integration

MegaEarth2049 uses the YEP_BuffsStatesCore plugin to enhance the state system:

- **Turn Display**: Shows the number of turns remaining for states
- **Custom State Icons**: Uses custom icons for states
- **Enhanced State Mechanics**: Provides more control over how states are applied and removed

### 4.2 YEP_X_StateCategories Integration

The YEP_X_StateCategories plugin organizes states into categories:

- **Buff**: Positive status effects (Barrier, Regen, Hyped, Stoked)
- **Debuff**: Negative status effects (Frostbite, Soaked, Burn, Shock)
- **Ailment**: Status conditions (Poison, Blind, Silence, Sleep)
- **Disease**: Disease states (Diarrhea, Dysentery, Rabies, STDs)

### 4.3 YEP_X_ExtDoT Integration

The YEP_X_ExtDoT plugin adds damage over time effects to states:

- **HP Damage**: States like Poison, Diarrhea, and Rabies cause HP damage over time
- **Custom Formulas**: Allows for complex damage calculations
- **Visual Feedback**: Provides animations for damage application

### 4.4 YEP_X_VisualStateFX Integration

The YEP_X_VisualStateFX plugin adds visual effects to states:

- **State Animations**: Many states have custom animations (e.g., Diarrhea has animation 133)
- **Visual Overlays**: Some states may have visual overlays on affected characters
- **Application Effects**: Visual effects when states are applied or removed

### 4.5 HIME_PlaceholderStates Integration

The HIME_PlaceholderStates plugin creates dynamic state progression:

- **Placeholder Logic**: States like Dia/Dys and Hyped/Stoked use JavaScript to determine which state to apply
- **Condition Checking**: Checks conditions like turn count to determine progression
- **State Transitions**: Allows for seamless transition between related states

## 5. Future Enhancement Opportunities

### 5.1 Expanded Disease System

The disease system could be enhanced with:

- **More Disease Types**: Additional diseases with unique effects
- **Environmental Factors**: Diseases contracted from specific environments
- **Contagion Mechanics**: Diseases that can spread between party members
- **Immunity System**: Temporary or permanent immunity after recovery

### 5.2 Advanced Cure Mechanics

The cure system could be expanded with:

- **Partial Cures**: Items that reduce symptoms without fully curing the disease
- **Preventative Medications**: Items that provide temporary immunity
- **Side Effect System**: Cures that remove the disease but cause other effects
- **Resistance Development**: Characters developing resistance to diseases they've recovered from

### 5.3 Integration with Other Systems

The state system could be further integrated with:

- **Quest System**: Quests centered around curing diseases or preventing outbreaks
- **Skill System**: Skills that interact with or are affected by disease states
- **Equipment System**: Equipment that provides disease resistance or immunity
- **Environment System**: Areas that have a chance to inflict specific diseases

## 6. Creating New Disease States

When creating new disease states, consider:

### 6.1 Technical Implementation

1. Add a new entry to States.json with a unique ID
2. Define appropriate traits based on the disease's effects
3. Set up messages for application, during, and removal
4. Configure duration, removal conditions, and other properties
5. Add custom notetags for animations and special effects

### 6.2 Disease Design Considerations

New diseases should:
- Fit the cyberpunk, corporate-controlled setting
- Have logical symptoms and effects
- Balance gameplay impact with narrative significance
- Connect to existing disease progression systems when appropriate

### 6.3 Example: Creating a New Disease State

For a new corporate-engineered flu variant:

```json
{
  "id": 47,
  "autoRemovalTiming": 2,
  "chanceByDamage": 50,
  "traits": [
    {"code": 21, "dataId": 2, "value": 0.8},
    {"code": 21, "dataId": 6, "value": 0.7},
    {"code": 22, "dataId": 7, "value": -0.03}
  ],
  "iconIndex": 1614,
  "maxTurns": 8,
  "message1": " has contracted CorpFlu™!",
  "message2": " is suffering from CorpFlu™!",
  "message3": " coughs violently from CorpFlu™!",
  "message4": " has recovered from CorpFlu™.",
  "minTurns": 5,
  "motion": 1,
  "name": "CorpFlu™",
  "note": "<State Animation: 140>\n<State Category: Disease>\n<Reapply Add Turns>\n",
  "overlay": 1,
  "priority": 50,
  "removeAtBattleEnd": false,
  "removeByDamage": true,
  "removeByRestriction": false,
  "removeByWalking": false,
  "restriction": 0,
  "stepsToRemove": 100
}
```

This creates a mid-game disease with:
- Reduced Attack (80%) and Agility (70%)
- HP drain of 3% per turn
- 50% chance to be removed when taking damage
- Duration of 5-8 turns
- Custom animation and messages
- Categorized as a Disease for plugin integration

## 7. Conclusion

The state system in MegaEarth2049, particularly its disease mechanics, creates a unique gameplay element that fits well with the game's cyberpunk setting. By understanding the structure of the `States.json` file and how it integrates with the item system, developers can create new states that seamlessly fit into the existing framework.

When creating new states, especially diseases, consider:
- The specific effects the state should have
- How it can be cured or removed
- Visual and message feedback for player clarity
- How it fits into the game's narrative and world
- Potential progression paths for more complex diseases

By carefully designing states with these considerations in mind, the disease system can become a compelling and strategic element of gameplay.
