> Reference snapshot: verify IDs, effects and enabled-plugin behavior against the live data and current FAQs. This relocation does not certify the older catalog as current.

# MegaEarth2049 Items System Documentation

This document provides detailed information about the item system in MegaEarth2049, focusing on the `Items.json` file structure, item types, and their integration with game mechanics, with special attention to the disease cure system.

## 1. Items.json Structure

The `Items.json` file defines all items in the game. Each item entry contains:

```json
{
  "id": 1,
  "animationId": 0,
  "consumable": true,
  "damage": {
    "critical": false,
    "elementId": 0,
    "formula": "0",
    "type": 0,
    "variance": 20
  },
  "description": "Corporate pain relief that keeps you working through injuries. Side effects include loyalty and decreased critical thinking.",
  "effects": [
    {
      "code": 11,
      "dataId": 0,
      "value1": 0,
      "value2": 100
    }
  ],
  "hitType": 0,
  "iconIndex": 176,
  "itypeId": 1,
  "name": "Acetaminophen",
  "note": "",
  "occasion": 0,
  "price": 50,
  "repeats": 1,
  "scope": 7,
  "speed": 0,
  "successRate": 100,
  "tpGain": 0
}
```

Where:
- **id**: Unique identifier for the item
- **name**: Display name
- **iconIndex**: Reference to the icon graphic
- **description**: Text description shown in menus
- **itypeId**: Item type (1 = regular item, 2 = key item)
- **price**: Purchase/sell price
- **consumable**: Whether the item is consumed on use
- **occasion**: When the item can be used (0 = always, 1 = battle, 2 = menu, 3 = never)
- **scope**: Target scope (7 = one ally, 8 = all allies, etc.)
- **effects**: Array of effect objects that define what the item does
- **note**: Custom properties (often contains plugin-specific parameters)

### 1.1 Effect Codes

The `effects` array contains objects that define what happens when the item is used:

| Code | Description | dataId | value1 | value2 |
|------|-------------|--------|--------|--------|
| 11 | HP Recovery | 0 | Formula (0 = %, 1 = fixed) | Amount |
| 12 | MP Recovery | 0 | Formula (0 = %, 1 = fixed) | Amount |
| 13 | TP Recovery | 0 | - | Amount |
| 21 | Add State | State ID | - | Success Rate (%) |
| 22 | Remove State | State ID | - | Success Rate (%) |
| 31 | Add Buff | Parameter ID | - | Turns |
| 32 | Add Debuff | Parameter ID | - | Turns |
| 33 | Remove Buff | Parameter ID | - | - |
| 34 | Remove Debuff | Parameter ID | - | - |
| 41 | Special Effect | Special Effect ID | - | - |
| 42 | Grow | Parameter ID | - | Amount |
| 43 | Learn Skill | Skill ID | - | - |
| 44 | Common Event | Common Event ID | - | - |

### 1.2 Parameter IDs

When effects reference parameters, they use these IDs:

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

## 2. Item Categories in MegaEarth2049

The game features diverse item types that reflect its cyberpunk setting:

### 2.1 Consumable Items (itypeId: 1)

#### 2.1.1 Healing Items
- **Acetaminophen** (ID 1): Basic healing item that restores HP
- Other healing items not fully implemented in the current data

#### 2.1.2 Disease Cure Items
While not explicitly defined in the current Items.json, the game's disease system (documented in States.json) suggests the need for cure items for various diseases:

- **Anti-Diarrheal Medication**: Would cure Diarrhea (State 11)
- **Antibiotics**: Would cure Dysentery (State 13)
- **Rabies Vaccine**: Would cure Rabies (State 26)
- **Antiviral Medication**: Would cure viral STDs like Herpes (State 27) and AIDS (State 28)
- **Antibiotics**: Would cure bacterial STDs like Gonorrhea (State 29), Syphilis (State 30), and "The Clap" (State 31)
- **Hepatitis Treatment**: Would cure Hepatitis B (State 32)

These items would likely use effect code 22 (Remove State) with the appropriate state ID.

### 2.2 Key Items (itypeId: 2)

#### 2.2.1 Quest Items
- **Necklace Pieces** (IDs 10, 125-127): Four pieces of a mysterious necklace that form a complete artifact
- **Complete Necklace** (ID 11): The assembled necklace artifact
- **Smelly Keys** (IDs 12, 28-33): Seven keys with unique descriptions, likely for a quest sequence
- **Engine Components** (IDs 129-131): Parts needed to build an engine
- **Engine Blueprint** (ID 128): Instructions for building the engine
- **Completed Engine** (ID 27): The assembled engine

#### 2.2.2 Special Items
- **Experimental Neural Enhancer** (ID 132): One of Zed's experimental neural mods
- **Disco Implant** (ID 133): Zed's prototype mood enhancer
- **Third Eye Mod** (ID 134): Zed's perception enhancer
- **Mysterious Burlap Package** (ID 135): Suspicious package containing scratchy pants
- **Productivity Fabric Sample** (ID 136): Itchy fabric with mind-control nanites
- **AI Control Module** (ID 137): Control module for the SEAM-3000 AI
- **Court Summons** (ID 138): Summons to the underground Clown Court
- **Pie-Based Evidence** (ID 139): Evidence for Clown Court
- **Vending Machine Manifesto** (ID 140): Manifesto of the Snack Liberation Front
- **Premium Grade Lubricant** (ID 141): Lubricant for vending machine negotiations
- **Niles's Embarrassing Photos** (ID 142): Photos for trading with Niles's ex

#### 2.2.3 Research Items
- **Alien Research Notes** (ID 143): Documentation of alien STD experiments
- **Ship Transponder** (ID 144): Device to summon the Marcus Garvey 2.0
- **Golden Gear** (ID 145): Ancient gear with strange runes

## 3. Disease System and Cure Mechanics

MegaEarth2049 features a unique disease system implemented through states, with corresponding cure items. The disease system includes:

### 3.1 Disease Types

#### 3.1.1 Gastrointestinal Diseases
- **Diarrhea** (State 11): Reduces DEF and ATK by 10%
- **Dysentery** (State 13): Reduces multiple stats by 25-50% and prevents recovery

#### 3.1.2 Infectious Diseases
- **Rabies** (State 26): Causes confusion and damage over time
- **Fever** (State 37): Not fully implemented
- **Sickness** (State 38): Not fully implemented

#### 3.1.3 Sexually Transmitted Diseases (STDs)
- **Herpes** (State 27): Not fully implemented
- **AIDS** (State 28): Not fully implemented
- **Gonorrhea** (State 29): Not fully implemented
- **Syphilis** (State 30): Not fully implemented
- **The Clap** (State 31): Not fully implemented
- **Hepatitis B** (State 32): Reduces hit rate by 10%

### 3.2 Disease Progression

The game uses placeholder states to create dynamic disease progression:

- **Dia/Dys** (State 14): Placeholder state that resolves to either Diarrhea (State 11) or Dysentery (State 13)
  - First application: Applies Diarrhea
  - If Diarrhea has been active for 11+ turns and the state is applied again: Progresses to Dysentery

### 3.3 Cure Implementation

While specific cure items are not fully implemented in the current Items.json, they would likely follow this pattern:

```json
{
  "id": 2,
  "animationId": 41,
  "consumable": true,
  "description": "Medication that relieves diarrhea symptoms. Side effects include dry mouth and corporate compliance.",
  "effects": [
    {
      "code": 22,
      "dataId": 11,
      "value1": 0,
      "value2": 100
    }
  ],
  "iconIndex": 176,
  "itypeId": 1,
  "name": "Anti-Diarrheal",
  "occasion": 0,
  "price": 100,
  "scope": 7,
  "successRate": 100
}
```

This example shows an anti-diarrheal medication that would remove the Diarrhea state (ID 11) with 100% success rate.

### 3.4 Quarantine Mechanic

The game includes a Quarantine state (ID 24) that prevents disease-related actions:

- Prevents skill use (traits with code 42)
- Prevents item use (traits with code 44)
- Restricts movement (restriction: 4)
- Likely used to prevent disease spread or as a treatment method

## 4. Item Implementation Details

### 4.1 YEP_ItemCore Integration

MegaEarth2049 uses the YEP_ItemCore plugin to enhance the item system:

- **Independent Items**: Allows for unique items with custom properties
- **Custom Item Categories**: Supports additional item types beyond the standard categories
- **Visual Enhancements**: Provides more detailed item information in menus
- **Discard Functionality**: Allows players to discard unwanted items (via YEP_X_ItemDiscard)
- **Custom Item Images**: Uses larger images for items instead of icons (via YEP_X_ItemPictureImg)

### 4.2 Item Usage Contexts

Items can be used in different contexts based on their `occasion` property:

- **Always** (0): Can be used in both battle and menu
- **Battle** (1): Can only be used during battle
- **Menu** (2): Can only be used from the menu outside of battle
- **Never** (3): Cannot be used directly (quest items, key items)

### 4.3 Item Acquisition

Items can be acquired through various means:

- **Shops**: Purchased from vendors
- **Enemy Drops**: Obtained after defeating enemies
- **Treasure Chests**: Found in the game world
- **Event Rewards**: Given as rewards for completing quests or events
- **Crafting**: Potentially created by combining other items (not fully implemented)

### 4.4 Custom Item Properties

Items can have custom properties defined in their `note` field:

- **`<Important Quest Item>`**: Marks an item as important for quests
- **`<Cannot Discard>`**: Prevents the item from being discarded
- **`<Item Picture: filename>`**: Specifies a custom image for the item
- **Other plugin-specific tags**: Various tags for specialized functionality

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
- **Crafting System**: Ability to create cures from gathered ingredients

### 5.3 Integration with Other Systems

The item and disease systems could be further integrated with:

- **Quest System**: Quests centered around finding cures or treating diseases
- **Skill System**: Skills that can cure diseases or provide immunity
- **Equipment System**: Equipment that provides disease resistance
- **Shop System**: Specialized medical shops with cure items

## 6. Conclusion

The item system in MegaEarth2049, particularly its disease and cure mechanics, creates a unique gameplay element that fits well with the game's cyberpunk setting. By understanding the structure of the `Items.json` file and how it integrates with the state system, developers can create new items that seamlessly fit into the existing framework.

When creating new items, especially disease cures, consider:
- The specific disease state the item should cure
- The success rate and conditions for the cure
- Any side effects or additional benefits
- How the item fits into the game's narrative and world
- The item's availability and acquisition method

By carefully designing items with these considerations in mind, the disease and cure system can become a compelling and strategic element of gameplay.
