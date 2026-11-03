> Reference snapshot: verify IDs, effects and enabled-plugin behavior against the live data and current FAQs. This relocation does not certify the older catalog as current.

# MegaEarth2049 Weapons System Documentation

This document provides detailed information about the weapon system in MegaEarth2049, focusing on the `Weapons.json` file structure, weapon types, and their integration with game mechanics, with special attention to future enhancement opportunities.

## Table of Contents
- [Weapons.json Structure](#weaponsjson-structure)
- [Weapon Types](#weapon-types)
- [Weapon Categories](#weapon-categories)
- [Available Assets](#available-assets)
- [WeaponSkill Integration](#weaponskill-integration)
- [Grenade System](#grenade-system)
- [Future Enhancement Opportunities](#future-enhancement-opportunities)

## Weapons.json Structure

The `Weapons.json` file defines all weapons in the game. Each weapon entry contains:

```json
{
  "id": 1,
  "animationId": 6,
  "description": "",
  "etypeId": 1,
  "traits": [
    {"code": 31, "dataId": 1, "value": 0},
    {"code": 22, "dataId": 0, "value": 0.05}
  ],
  "iconIndex": 96,
  "name": "Switchblade",
  "note": "<Weapon Image: 1>\n<Weapon Motion: thrust>",
  "params": [0, 0, 8, 0, 0, 0, 2, 0],
  "price": 50,
  "wtypeId": 1
}
```

Where:
- **id**: Unique identifier for the weapon
- **animationId**: ID of the animation played when the weapon is used
- **description**: Text description shown in menus
- **etypeId**: Equipment type (1 = weapon)
- **traits**: Array of trait objects that define the weapon's effects
- **iconIndex**: Reference to the icon graphic
- **name**: Display name
- **note**: Custom properties (often contains plugin-specific parameters)
- **params**: Array of parameter bonuses [MHP, MMP, ATK, DEF, MAT, MDF, AGI, LUK]
- **price**: Purchase/sell price
- **wtypeId**: Weapon type ID (1 = sword, 2 = spear, etc.)

### Trait Codes

The `traits` array contains objects that define the weapon's effects:

| Code | Description | dataId | value |
|------|-------------|--------|-------|
| 11 | Element Rate | Element ID | Rate (1.0 = 100%) |
| 21 | Parameter | Parameter ID | Multiplier (1.0 = 100%) |
| 22 | Ex-Parameter | Ex-Parameter ID | Value change |
| 23 | Sp-Parameter | Sp-Parameter ID | Value change |
| 31 | Attack Element | Element ID | 1 = add element |
| 32 | Attack State | State ID | Chance (1.0 = 100%) |
| 33 | Attack Speed | - | Value change |
| 34 | Attack Times | - | Number of additional attacks |
| 35 | Attack Skill | Skill ID | Replace with skill |
| 41 | Skill Type Add | Skill Type ID | 1 = add type |
| 42 | Skill Type Seal | Skill Type ID | 1 = seal type |
| 43 | Skill Add | Skill ID | 1 = add skill |
| 44 | Skill Seal | Skill ID | 1 = seal skill |
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

Weapons can have custom properties defined in their `note` field:

- **`<Weapon Image: X>`**: Specifies the weapon image to use (X = image index)
- **`<Weapon Motion: motion>`**: Defines the motion type (swing, thrust, missile, etc.)
- **`<skill_id: X>`**: Used with the WeaponSkill plugin to change the skill used for basic attacks

## Weapon Types

MegaEarth2049 uses the following weapon types (wtypeId):

| ID | Type | Description | Examples |
|----|------|-------------|----------|
| 1 | Knife | Small bladed weapons | Switchblade, Shank, Big Ass Knife |
| 3 | Throwing | Thrown weapons | Throwing Knives |
| 5 | Whip | Flexible striking weapons | Gnarly Whip |
| 6 | Staff | Magical implements | Healing Rod, Taser Stick, Lead Pipe |
| 8 | Bat | Blunt striking weapons | Luisville Slugger |
| 9 | Gun | Firearms | Gun, Shotgun, Rifle |
| 10 | Club | Heavy blunt weapons | Club |
| 11 | Fist | Unarmed combat | Spiked Gloves, Bible, Koran |
| 12 | Misc | Miscellaneous weapons | Yo-Yo, Slingshot |
| 13 | Special | Special weapons | Belt Fed Machine Gun, BFG, various rifles and energy weapons |

## Weapon Categories

The game features diverse weapon types that reflect its cyberpunk setting:

### Melee Weapons
- **Bladed Weapons**: Switchblade (ID 1), Shank (ID 12), Big Ass Knife (ID 18)
- **Blunt Weapons**: Luisville Slugger (ID 8), Club (ID 20), Lead Pipe (ID 17)
- **Powered Melee**: Chainsaw (ID 7), Taser Stick (ID 16)
- **Unarmed**: Spiked Gloves (ID 2)
- **Flexible**: Gnarly Whip (ID 6)

### Firearms
- **Pistols**: Gun (ID 4), Pea Shooter (ID 14), Pee Shooter (ID 22)
- **Shotguns**: Shotgun (ID 3), Gas Powered Shotgun (ID 47)
- **Rifles**: Rifle (ID 13), M1 (ID 25), M16 (ID 26), AK (ID 27)
- **Machine Guns**: Belt Fed Machine Gun (ID 21), S.A.W. (ID 24), Gnarly Machine Gun (ID 31)
- **Sniper Rifles**: Snipetastic (ID 28), Old Fashioned Sniper Rifle (ID 33)
- **Submachine Guns**: UZI (ID 30)

### Energy Weapons
- **Laser Weapons**: Hand Laser (ID 35), Lazer Shotgun (ID 39), Green Lazer Canon (ID 45), Blue Lazer Canon (ID 48), Pink Lazer Canon (ID 49)
- **Elemental Weapons**: Fire Pistol (ID 37), Ice Pistol (ID 38), Fire Shotgun (ID 51), M.I. Ice Pistol (ID 50)
- **Advanced Tech**: Pulse Canon (ID 36), Railgun (ID 41), Alien Lazer Canon (ID 42)

### Special Weapons
- **Religious Texts**: Bible (ID 9), Koran (ID 10)
- **Thrown Weapons**: Throwing Knives (ID 11)
- **Miscellaneous**: Yo-Yo (ID 15), Slingshot (ID 19)
- **Heavy Weapons**: BFG (ID 23)
- **Alien Technology**: Alien Dick's Pistol (ID 43)

## Available Assets

### Weapon Sheet Files
The game includes 29 weapon sheet files in the img/system directory:
- Weapons1.png through Weapons29.png

These sheets contain various weapon images that can be referenced using the `<Weapon Image: X>` note tag, where X is the index of the weapon image.

### Individual Weapon Images
Additionally, there are 14 specific weapon image files in the img/system directory:

| Filename | Description | Potential Use |
|----------|-------------|---------------|
| baretta.png | Beretta pistol | Modern sidearm |
| m4a1.png | M4A1 assault rifle | Military rifle |
| m60.png | M60 machine gun | Heavy machine gun |
| SniperRifle.png | Sniper rifle | Long-range precision weapon |
| w_akm.png | AKM assault rifle | Soviet-style assault rifle |
| w_cheytac.png | CheyTac sniper rifle | High-caliber sniper rifle |
| w_deserteagle.png | Desert Eagle pistol | High-powered handgun |
| w_fmg9.png | FMG-9 submachine gun | Folding submachine gun |
| w_m92fs.png | M92FS pistol | Military sidearm |
| w_m1911.png | M1911 pistol | Classic pistol |
| w_model1887.png | Model 1887 shotgun | Lever-action shotgun |
| w_python.png | Python revolver | Powerful revolver |
| w_ump45.png | UMP-45 submachine gun | Tactical submachine gun |
| w_uts15.png | UTS-15 shotgun | Tactical shotgun |

These assets could be used to create new weapons or replace existing weapon images with more detailed versions.

## WeaponSkill Integration

The game includes the WeaponSkill plugin by Sasuke KANNAZUKI, which allows weapons to use custom skills instead of the default Attack command. This is achieved by adding a note tag to weapons in the database:

```
<skill_id:X>
```

Where X is the ID of the skill to be used when attacking with that weapon.

### Current Implementation Status
The WeaponSkill plugin is enabled but not currently implemented in the existing weapons. A comprehensive implementation plan has been created in the `docs/reference/plugins/WeaponSkill_Implementation_README.md` file, which outlines:

1. **Basic weapon skills** that could be implemented
2. **Character-specific weapons** tailored to each party member's role
3. **Integration with existing systems** like Party Limit Gauge and Row Formation
4. **Cyberpunk-themed weapons** fitting the game's setting
5. **Weapon progression system** for game balance

### Implementation Opportunities
The WeaponSkill plugin offers significant opportunities to enhance the weapon system:

- **Unique Attack Patterns**: Each weapon could have a unique attack pattern or effect
- **Character Specialization**: Weapons could be designed to complement specific character abilities
- **Strategic Depth**: Players could choose weapons based on their skills rather than just stats
- **Visual Variety**: Different weapons could have different animations and visual effects

## Grenade System

The game includes animations for a grenade system, but it's not fully implemented in the current items or skills.

### Current Implementation
- **Animation ID 141**: "Grenade Hit" - Uses "grenade" and "Explosion2" animation files
- **Animation ID 142**: "Toss Grenade" - Uses "grenade" animation file
- **Animation ID 143**: "Flash Grenade Hit" - Uses "grenade" and "30FPS_AC3T026_Nova" animation files
- **Animation ID 144**: "Smoke Grenade Hit" - Uses "grenade" and "Darkness2" animation files
- **Animation ID 145**: "Poison Grenade Hit" - Uses "grenade" and "30FPS_ACQ017_Cure" animation files

There's also a "Demolition" skill (ID 15) that "Blows up enemies with explosives."

### Implementation Opportunities
The existing grenade animations could be expanded into a full item-based system:

- **Regular Grenades**: AoE damage to multiple enemies
- **Flash Grenades**: Cause blind status or reduce accuracy
- **Smoke Grenades**: Increase evasion for allies or decrease hit rate for enemies
- **Poison Grenades**: Apply poison state or damage over time
- **EMP Grenades**: Effective against robotic enemies or disable tech abilities

## Future Enhancement Opportunities

### 1. Expanded Weapon Types

The weapon system could be enhanced with additional weapon types that fit the cyberpunk setting:

- **Cybernetic Implants**: Weapons integrated into character bodies
- **Drone Controllers**: Weapons that deploy autonomous combat drones
- **Nanite Weapons**: Weapons that use programmable nanomachines
- **Hacking Devices**: Weapons that target enemy systems
- **Psionic Amplifiers**: Weapons that enhance mental abilities

### 2. Corporate-Themed Weapons

Following the plan in docs/reference/plugins/WeaponSkill_Implementation_README.md, weapons could be themed after the five MegaCorps:

- **NeuraTech**: Neural disruptors, mind control devices
- **OmniCorp**: Military-grade weapons, crowd control
- **Vitalix**: Biological weapons, genetic modifiers
- **Armatek**: Industrial weapons, heavy machinery
- **Quantum Dynamics**: Experimental physics-based weapons

### 3. Weapon Modification System

A weapon modification system could be implemented to allow players to customize their weapons:

- **Attachments**: Scopes, silencers, extended magazines
- **Elemental Mods**: Fire, ice, electric damage
- **Tech Upgrades**: Smart targeting, auto-reload, energy efficiency
- **Material Upgrades**: Lightweight alloys, reinforced frames
- **Special Ammo**: Armor-piercing, explosive, incendiary

### 4. Weapon Progression System

A tiered weapon system could be implemented to provide clear progression paths:

- **Tier 1**: Basic weapons (early game)
- **Tier 2**: Advanced weapons (mid-game)
- **Tier 3**: Prototype weapons (late-game)
- **Tier 4**: Legendary weapons (end-game/rare)

### 5. Integration with Other Systems

The weapon system could be further integrated with other game systems:

- **Skills System**: Weapons that unlock special skills when equipped
- **State System**: Weapons that can inflict specific states
- **Row Formation**: Weapons optimized for specific rows
- **Party Limit Gauge**: Weapons that contribute to or consume the gauge
- **Job Points**: Weapons that provide JP bonuses

## Conclusion

The weapon system in MegaEarth2049 provides a solid foundation with a diverse range of weapon types that fit the cyberpunk setting. The existing assets and plugins offer significant opportunities for enhancement, particularly through the implementation of the WeaponSkill plugin, expansion of the grenade system, and creation of corporate-themed weapons.

By leveraging the available assets and implementing the planned enhancements, the weapon system could become a more strategic and engaging aspect of gameplay, offering players meaningful choices and surprising them with unique weapon effects and abilities.
