> Reference snapshot: verify IDs, effects and enabled-plugin behavior against the live data and current FAQs. This relocation does not certify the older catalog as current.

# MegaEarth2049 Armor System Documentation

This document provides detailed information about the armor system in MegaEarth2049, focusing on the `Armors.json` file structure, armor types, and their integration with game mechanics, with special attention to future enhancement opportunities.

## Table of Contents
- [Armors.json Structure](#armorsjson-structure)
- [Equipment Types](#equipment-types)
- [Armor Types](#armor-types)
- [Armor Categories](#armor-categories)
- [Armor Sets](#armor-sets)
- [Future Enhancement Opportunities](#future-enhancement-opportunities)

## Armors.json Structure

The `Armors.json` file defines all armor pieces in the game. Each armor entry contains:

```json
{
  "id": 5,
  "atypeId": 1,
  "description": "Not quite like the Matrix movies. Wearing this will \nmake anyone look like a creeper.",
  "etypeId": 4,
  "traits": [
    {"code": 23, "dataId": 2, "value": 1.5},
    {"code": 32, "dataId": 8, "value": 0.05}
  ],
  "iconIndex": 1678,
  "name": "Trench Coat",
  "note": "",
  "params": [15, 15, 5, 5, 5, 5, 5, 5],
  "price": 1000
}
```

Where:
- **id**: Unique identifier for the armor
- **atypeId**: Armor type ID (0-4, representing different armor categories)
- **description**: Text description shown in menus
- **etypeId**: Equipment type (2 = shield, 3 = head, 4 = body, etc.)
- **traits**: Array of trait objects that define the armor's effects
- **iconIndex**: Reference to the icon graphic
- **name**: Display name
- **note**: Custom properties (often contains plugin-specific parameters)
- **params**: Array of parameter bonuses [MHP, MMP, ATK, DEF, MAT, MDF, AGI, LUK]
- **price**: Purchase/sell price

### Trait Codes

The `traits` array contains objects that define the armor's effects:

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

### Note Tags

Armors can have custom properties defined in their `note` field:

- **`<Random Variance: X>`**: Adds random variance to the armor's parameters (X = percentage)
- **`<Cannot Discard>`**: Prevents the armor from being discarded
- **`<Armor Image: filename>`**: Specifies a custom image for the armor (with YEP_X_ItemPictureImg)

## Equipment Types

MegaEarth2049 uses the following equipment types (etypeId):

| ID | Type | Description | Examples |
|----|------|-------------|----------|
| 2 | Shield | Defensive items held in the off-hand | Riot Shield, Green Helmet |
| 3 | Head | Headgear | Hat, Nice Hat, Red Helmet |
| 4 | Body | Torso armor | Trench Coat, Red Jacket, Protective Vest |
| 5 | Arms | Hand and arm protection | Red Gloves, Yellow Gloves, Armortech Gloves |
| 6 | Legs | Leg protection | Red Pants, Yellow Pants, Bermuda Shorts |
| 7 | Feet | Footwear | Running Shoes, Red Shoes, Work Boots |
| 8 | Accessory | Miscellaneous equipment | Ring |

## Armor Types

MegaEarth2049 uses the following armor types (atypeId):

| ID | Type | Description | Examples |
|----|------|-------------|----------|
| 0 | General | Standard armor | Most colored armor sets |
| 1 | Light | Lightweight armor | Hat, Ring, Trench Coat |
| 2 | Medium | Medium-weight armor | Armortech Gloves |
| 3 | Heavy | Heavy-duty armor | Nice Hat, Running Shoes, Hard Hat |
| 4 | Special | Special armor types | Heavy Armored Pants, Protective Vest |
| 5 | Shield | Shield-specific type | Riot Shield |

## Armor Categories

The game features diverse armor categories that reflect its cyberpunk setting:

### Protective Gear
- **Shields**: Riot Shield (ID 1)
- **Helmets**: Hard Hat (ID 50), Neat Helmet (ID 55), Killer Helmet (ID 57)
- **Vests**: Protective Vest (ID 59)

### Casual Clothing
- **Headwear**: Hat (ID 2), Nice Hat (ID 6)
- **Outerwear**: Trench Coat (ID 5)
- **Footwear**: Running Shoes (ID 7), Rad Kicks (ID 47)
- **Accessories**: Ring (ID 4)

### Technical Gear
- **Armortech**: Armortech Pants (ID 38), Armortech Gloves (ID 39), Armortech Jacket (ID 40), Armortech Helmet (ID 41)
- **Heavy Armor**: Heavy Armored Pants (ID 42), Heavy Armored Shorts (ID 43)

### Fashion Items
- **Casual**: Bermuda Shorts (ID 37), Nice Pants (ID 36)
- **Stylish**: Tight Orange Pants (ID 46), Killer Orange Jacket (ID 52), Killer White Jacket (ID 53), Killer Blue Jacket (ID 54)
- **Cargo**: Rad Cargo Shorts (ID 44), Kinda Lame Cargo Shorts (ID 45), Tan Cargo Pants (ID 48)

## Armor Sets

The game includes several color-coded armor sets that provide a cohesive look when worn together:

### Red Set
- **Red Helmet** (ID 11): +35 HP/MP, +5 ATK, +7 DEF, +7 MAT, +5 MDF, +5 AGI, +5 LUK
- **Red Jacket** (ID 10): +110 HP/MP, +8 ATK, +10 DEF, +8 MAT, +10 MDF, +8 AGI, +8 LUK
- **Red Gloves** (ID 8): +35 HP/MP, +5 ATK, +7 DEF, +5 MAT, +7 MDF, +5 AGI, +5 LUK
- **Red Pants** (ID 9): +110 HP/MP, +8 ATK, +10 DEF, +8 MAT, +10 MDF, +8 AGI, +8 LUK
- **Red Shoes** (ID 31): +35 HP/MP, +5 ATK, +7 DEF, +5 MAT, +7 MDF, +5 AGI, +5 LUK

### Yellow Set
- **Yellow Helmet** (ID 14): +25 HP/MP, +3 ATK, +4 DEF, +3 MAT, +4 MDF, +3 AGI, +3 LUK
- **Yellow Jacket** (ID 15): +100 HP/MP, +5 ATK, +7 DEF, +5 MAT, +7 MDF, +5 AGI, +5 LUK
- **Yellow Gloves** (ID 12): +25 HP/MP, +3 ATK, +4 DEF, +3 MAT, +4 MDF, +3 AGI, +3 LUK
- **Yellow Pants** (ID 13): +100 HP/MP, +5 ATK, +7 DEF, +5 MAT, +7 MDF, +5 AGI, +5 LUK
- **Yellow Shoes** (ID 32): +25 HP/MP, +3 ATK, +4 DEF, +3 MAT, +4 MDF, +3 AGI, +3 LUK

### Purple Set
- **Purple Helmet** (ID 18): +65 HP/MP, +13 ATK, +16 DEF, +13 MAT, +16 MDF, +13 AGI, +13 LUK
- **Purple Jacket** (ID 19): +165 HP/MP, +16 ATK, +18 DEF, +16 MAT, +18 MDF, +16 AGI, +16 LUK
- **Purple Gloves** (ID 16): +65 HP/MP, +13 ATK, +16 DEF, +13 MAT, +16 MDF, +13 AGI, +13 LUK
- **Purple Pants** (ID 17): +165 HP/MP, +16 ATK, +18 DEF, +16 MAT, +18 MDF, +16 AGI, +16 LUK
- **Purple Shoes** (ID 33): +65 HP/MP, +13 ATK, +16 DEF, +13 MAT, +16 MDF, +13 AGI, +13 LUK

### Blue Set
- **Blue Helmet** (ID 22): +47 HP/MP, +8 ATK, +10 DEF, +8 MAT, +10 MDF, +8 AGI, +8 LUK
- **Blue Jacket** (ID 23): +125 HP/MP, +10 ATK, +13 DEF, +10 MAT, +13 MDF, +10 AGI, +10 LUK
- **Blue Gloves** (ID 20): +47 HP/MP, +8 ATK, +10 DEF, +8 MAT, +10 MDF, +8 AGI, +8 LUK
- **Blue Pants** (ID 21): +125 HP/MP, +11 ATK, +13 DEF, +11 MAT, +13 MDF, +11 AGI, +11 LUK
- **Blue Shoes** (ID 60): +47 HP/MP, +8 ATK, +10 DEF, +8 MAT, +10 MDF, +8 AGI, +8 LUK

### Green Set
- **Green Helmet** (ID 61): +55 HP/MP, +10 ATK, +12 DEF, +10 MAT, +12 MDF, +10 AGI, +10 LUK
- **Green Jacket** (ID 26): +150 HP/MP, +14 ATK, +18 DEF, +14 MAT, +18 MDF, +14 AGI, +14 LUK
- **Green Gloves** (ID 24): +55 HP/MP, +10 ATK, +12 DEF, +10 MAT, +12 MDF, +10 AGI, +10 LUK
- **Green Pants** (ID 25): +150 HP/MP, +14 ATK, +18 DEF, +14 MAT, +18 MDF, +14 AGI, +14 LUK
- **Green Shoes** (ID 34): +55 HP/MP, +10 ATK, +12 DEF, +10 MAT, +12 MDF, +10 AGI, +10 LUK

### Black Set
- **Black Halmet** (ID 30): +80 HP/MP, +16 ATK, +20 DEF, +16 MAT, +20 MDF, +16 AGI, +16 LUK
- **Black Jacket** (ID 29): +180 HP/MP, +21 ATK, +25 DEF, +21 MAT, +25 MDF, +21 AGI, +21 LUK
- **Black Gloves** (ID 27): +80 HP/MP, +16 ATK, +20 DEF, +16 MAT, +20 MDF, +16 AGI, +16 LUK
- **Black Pants** (ID 28): +180 HP/MP, +21 ATK, +25 DEF, +21 MAT, +25 MDF, +21 AGI, +21 LUK
- **Black Shoes** (ID 35): +0 HP/MP, +0 ATK, +0 DEF, +0 MAT, +0 MDF, +0 AGI, +0 LUK (Note: Stats not implemented)

## Future Enhancement Opportunities

### 1. Armor Set Bonuses

The color-coded armor sets provide a cohesive visual look, but they don't currently offer any mechanical bonuses for wearing a complete set. Implementing set bonuses would encourage players to collect and wear matching armor pieces:

- **Red Set Bonus**: "Berserker's Fury" - Increases ATK by 15% when HP is below 50%
- **Yellow Set Bonus**: "Lightning Reflexes" - 10% chance to dodge attacks
- **Purple Set Bonus**: "Arcane Amplification" - Increases magic damage by 20%
- **Blue Set Bonus**: "Tactical Advantage" - Increases critical hit rate by 10%
- **Green Set Bonus**: "Survivalist" - Regenerate 5% HP each turn
- **Black Set Bonus**: "Shadow Walker" - 15% chance to counter-attack

### 2. Corporate-Branded Armor

Following the cyberpunk theme of the game, armor sets could be themed after the five MegaCorps:

- **NeuraTech**: Neural interface helmets, mind-enhancing clothing
  - Set Bonus: Increases MP and magic-related stats
  - Special Effect: Chance to resist mental status effects

- **OmniCorp**: Military-grade armor, tactical gear
  - Set Bonus: Increases DEF and physical damage reduction
  - Special Effect: Damage reflection

- **Vitalix**: Bio-engineered clothing, symbiotic armor
  - Set Bonus: HP regeneration and status effect resistance
  - Special Effect: Absorbs damage to restore HP

- **Armatek**: Industrial-strength armor, hazard protection
  - Set Bonus: Increases maximum HP and elemental resistance
  - Special Effect: Reduces environmental damage

- **Quantum Dynamics**: Experimental phase-shifting armor
  - Set Bonus: Increases AGI and evasion
  - Special Effect: Chance to phase through attacks

### 3. Specialized Armor Types

The armor system could be expanded with specialized types for different situations:

- **Environmental Protection**: Radiation suits, hazmat gear, thermal protection
- **Stealth Gear**: Cloaking devices, sound dampeners, thermal masking
- **Combat Exoskeletons**: Powered armor that enhances physical abilities
- **Cybernetic Interfaces**: Armor that enhances hacking and tech abilities
- **Faction-Specific Gear**: Armor associated with different factions in the game

### 4. Modular Armor System

A modular armor system would allow players to customize their armor with different components:

- **Base Armor**: Provides core stats and appearance
- **Modules**: Attachable components that provide specific bonuses
  - **Defensive Modules**: Shields, armor plating, reactive surfaces
  - **Offensive Modules**: Weapon mounts, targeting systems
  - **Utility Modules**: Storage, medical systems, environmental controls
  - **Tech Modules**: Hacking aids, scanning equipment, communication devices

### 5. Active Defense Systems

Armor could include active defense systems that provide special abilities:

- **Energy Shields**: Temporary barriers that absorb damage
- **Reactive Armor**: Automatically counters physical attacks
- **Adaptive Camouflage**: Changes properties based on environment
- **Emergency Systems**: Activates when health is low
- **Automated Medical Systems**: Applies healing or removes status effects

### 6. Integration with Other Systems

The armor system could be further integrated with other game systems:

- **Skills System**: Armor that unlocks special skills when equipped
- **State System**: Armor that provides immunity to specific states
- **Row Formation**: Armor optimized for specific rows
- **Party Limit Gauge**: Armor that contributes to or consumes the gauge
- **Job Points**: Armor that provides JP bonuses

## Conclusion

The armor system in MegaEarth2049 provides a solid foundation with a diverse range of armor types and color-coded sets. The existing assets and structure offer significant opportunities for enhancement, particularly through the implementation of set bonuses, corporate-themed armor, and specialized armor types.

By leveraging the available assets and implementing the planned enhancements, the armor system could become a more strategic and engaging aspect of gameplay, offering players meaningful choices and surprising them with unique armor effects and abilities.
