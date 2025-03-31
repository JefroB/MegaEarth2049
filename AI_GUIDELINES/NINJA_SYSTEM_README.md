# Digital Shadow Collective (Ninja System) Implementation

This document provides an overview of the Digital Shadow Collective (ninja) system implementation for MegaEarth 2049. The system adds a comprehensive ninja storyline, recruitment mechanics, items, and quest line to the game.

## Overview

The Digital Shadow Collective represents one of the most organized resistance movements against corporate control in MegaEarth. Once elite corporate security operatives, these ninjas discovered the true nature of A.S.P. and rebelled against the MegaCorps, stealing experimental neural implants that allow them to move between digital and physical space.

The implementation includes:

1. A detailed FAQ document explaining the ninja lore and mechanics
2. Updates to the MegaEarth2049_Story.md file to integrate ninjas into the world
3. A new "Shadows in the Code" quest line that reveals the backstory of the Digital Shadow Collective
4. Updates to the ninja troop encounters to include recruitment mechanics
5. New ninja-themed items and equipment
6. Dictionary, thesaurus, and rhyming dictionary entries for ninja terminology

## Implementation Files

The implementation consists of the following files:

- `GameFAQs/FAQ_12_Ninja_System.md` - Comprehensive FAQ about the ninja system
- `AI_GENERATED_SCRIPTS/shadows_in_code_quest.js` - Script for the "Shadows in the Code" quest line
- `AI_GENERATED_SCRIPTS/update_dictionary_ninja_terms.js` - Script to update dictionaries with ninja terminology
- `AI_GENERATED_SCRIPTS/update_ninja_troops.js` - Script to update ninja troop encounters with recruitment logic
- `AI_GENERATED_SCRIPTS/add_ninja_items.js` - Script to add ninja items to the game
- `AI_GENERATED_SCRIPTS/implement_ninja_system.js` - Master script that integrates all components

## Installation Instructions

To implement the ninja system, follow these steps:

1. Ensure all script files are in the `AI_GENERATED_SCRIPTS` directory
2. Run the master implementation script:

```bash
node AI_GENERATED_SCRIPTS/implement_ninja_system.js
```

This script will:
- Create backups of key files before making changes
- Add the "Shadows in the Code" quest line
- Update dictionaries with ninja terminology
- Update ninja troops with recruitment logic
- Add ninja items to the game

## Required Map Creation

The quest line references two maps that need to be created manually:

1. **Map ID 101: Hidden Dojo**
   - This should be a mystical, digital-themed dojo with Japanese aesthetic elements
   - Include a central area for The Compiler (a glitching, hooded figure)
   - Add training areas, a vendor for ninja equipment, and meditation spaces

2. **Map ID 102: Matrix**
   - This should be a digital realm with code-like visual elements
   - Include glitching terrain, digital artifacts, and flowing data streams
   - Add code fragment paths that the player must follow

## Ninja Types and Recruitment

The system includes seven types of ninjas, each with unique backgrounds and abilities:

1. **Pink Ninja**: Former NeuraTech mind-control specialist. The easiest to recruit.
2. **Blue Ninja**: Former OmniCorp security enforcer. Expert in weapons and tactical combat.
3. **Black Ninja**: Former Quantum Dynamics reality manipulator. Can create small distortions in the physical world.
4. **Green Ninja**: Former Vitalix bio-enhancement expert. Specializes in herbal medicine and toxins.
5. **Red Ninja**: Former Armatek demolitions expert. Master of explosives and structural weaknesses.
6. **Purple Ninja**: Former corporate infiltration specialist. Expert in disguise and stealth.
7. **Brown Ninja**: Former corporate data archivist. Living repository of corporate secrets.

Recruitment mechanics:
- Pink Ninja can be recruited by defeating Troop #15
- Other ninjas can be recruited after completing the "Shadows in the Code" quest line
- Each ninja has a different recruitment chance (from 1/6 to 1/20)
- Recruitment requires having the Pink Ninja in the party and having completed the quest

## Ninja Equipment

The system adds several ninja-themed items:

- **Neural Interface Chip**: Allows access to Neural Access Points
- **Digital Tantō**: Short blade that exists in both physical and digital space
- **Shadow Garb**: Ninja armor that increases evasion and stealth
- **Compiler's Mask**: Allows the wearer to see through digital illusions
- **Neural Shurikens**: Throwing weapons that disrupt enemy neural implants
- **Neural Bandanas**: Color-specific headgear for each ninja type
- **Compiler's Code Blade**: Ultimate ninja weapon (special reward)

## The "Shadows in the Code" Quest Line

The quest line consists of three main parts:

1. **Digital Whispers**
   - Triggered after recruiting the Pink Ninja
   - Leads to first encounter with The Compiler
   - Reveals the origin of the Digital Shadow Collective

2. **Corporate Defectors**
   - Help extract more corporate defectors
   - Infiltrate NeuraTech, Vitalix, and OmniCorp facilities
   - Rescue the Green and Blue Ninjas

3. **The Compiler's Code**
   - Gain access to the Hidden Dojo
   - Learn about Protocol Zero
   - Plant counter-code in corporate servers
   - Unlock the ability to recruit additional ninjas

## Technical Notes

- The implementation uses switch ID 108 to track completion of the "Shadows in the Code" quest line
- Ninja recruitment is handled through troop event pages with conditional logic
- The Pink Ninja is Actor ID 7 in the game
- New items use IDs 45-57
- The quest line references Map IDs 101 and 102, which need to be created manually

## Troubleshooting

If you encounter issues with the implementation:

1. Check the console output for error messages
2. Verify that all required files exist in the correct locations
3. Check that the Map IDs referenced in the quest line match your game's map configuration
4. Restore from backups if necessary (located in the `backups/ninja_system_[timestamp]` directory)

## Credits

The Digital Shadow Collective system was designed and implemented as an enhancement to MegaEarth 2049, expanding the game's lore and mechanics with a comprehensive ninja storyline and recruitment system.
