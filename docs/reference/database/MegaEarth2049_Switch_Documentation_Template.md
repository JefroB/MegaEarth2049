> Reference snapshot: verify IDs, effects and enabled-plugin behavior against the live data and current FAQs. This relocation does not certify the older catalog as current.

# MegaEarth2049 Switch Documentation

This document provides a comprehensive list of all switches used in MegaEarth2049 and their purposes. This documentation is essential for understanding and maintaining the game's event logic, especially for quest-related events.

## 1. Introduction

Switches in RPG Maker MV are boolean variables (ON/OFF) that are used to track the state of various game elements, such as quest progress, event completion, and game flags. This document aims to document all switches used in MegaEarth2049 to ensure consistency and avoid conflicts.

## 2. Switch List

| Switch ID | Name | Purpose | Used In | Notes |
|-----------|------|---------|---------|-------|
| 1 | Game Start | Set to ON when the game starts | Common Event 1 | Used to initialize the game |
| 2 | Tutorial Completed | Set to ON when the tutorial is completed | Map001.json | Used to skip the tutorial on subsequent playthroughs |
| ... | ... | ... | ... | ... |
| 7 | Necklace Quest Active | Set to ON when the necklace quest is active | Map015.json | Used to enable necklace piece events |
| ... | ... | ... | ... | ... |
| 9 | Jen's Boss Defeated | Set to ON when the boss in Timbuc Cellar is defeated | Map015.json, Map056.json, Map057.json | Used for the Jen recruitment quest |
| ... | ... | ... | ... | ... |
| 12 | Smelly Key #1 Found | Set to ON when Smelly Key #1 is found | Map015.json | Used for the Smelly Keys quest |
| ... | ... | ... | ... | ... |
| 28 | Cellar Door Key | Used to check if the player has the key for the cellar door | Map015.json | Used for the door in Timbuc Cellar |
| 29 | Cellar Side Room Key | Used to check if the player has the key for the side room | Map015.json | Used for the door in Timbuc Cellar |
| 30 | Cellar East Wing Key | Used to check if the player has the key for the east wing | Map015.json | Used for the door in Timbuc Cellar |
| 31 | Cellar West Wing Key | Used to check if the player has the key for the west wing | Map015.json | Used for the door in Timbuc Cellar |
| 32 | Cellar South Wing Key | Used to check if the player has the key for the south wing | Map015.json | Used for the door in Timbuc Cellar |
| 33 | Smelly Key #3 | Used to check if the player has Smelly Key #3 | Map015.json | Used for the door in Timbuc Cellar |
| ... | ... | ... | ... | ... |

## 3. Switch Categories

Switches can be categorized based on their purpose to make it easier to understand their role in the game:

### 3.1 Quest Switches

These switches are used to track the progress of quests:

- **Switch 7**: Necklace Quest Active
- **Switch 9**: Jen's Boss Defeated
- **Switch 12**: Smelly Key #1 Found
- ...

### 3.2 Door Switches

These switches are used to check if the player has the keys for doors:

- **Switch 28**: Cellar Door Key
- **Switch 29**: Cellar Side Room Key
- **Switch 30**: Cellar East Wing Key
- **Switch 31**: Cellar West Wing Key
- **Switch 32**: Cellar South Wing Key
- **Switch 33**: Smelly Key #3
- ...

### 3.3 Event Switches

These switches are used to track the completion of events:

- **Switch 1**: Game Start
- **Switch 2**: Tutorial Completed
- ...

### 3.4 Game Flags

These switches are used to track various game states:

- ...

## 4. Switch Usage Guidelines

When using switches in MegaEarth2049, follow these guidelines to ensure consistency and avoid conflicts:

1. **Document All Switches**: Add all new switches to this documentation with a clear description of their purpose.
2. **Use Descriptive Names**: Give switches descriptive names that indicate their purpose.
3. **Avoid Reusing Switches**: Do not reuse switches for different purposes. Each switch should have a single, well-defined purpose.
4. **Group Related Switches**: Group related switches together (e.g., all switches related to a specific quest).
5. **Use Self-Switches When Possible**: For event-specific states, use self-switches (A, B, C, D) instead of global switches.
6. **Comment Switch Usage**: Add comments in events to explain the purpose of switch operations.

## 5. Switch Conflicts

The following switch conflicts have been identified and should be resolved:

1. **Switch 7 and Switch 9**: Both are used for the necklace quest, but in different ways. Switch 7 is used to enable necklace piece events, while Switch 9 is used for the Jen recruitment event. These should be consolidated or clearly documented.
2. ...

## 6. Conclusion

This documentation provides a comprehensive list of all switches used in MegaEarth2049 and their purposes. By following the guidelines and resolving the identified conflicts, the game's event logic can be made more consistent and maintainable.

## 7. Appendix: How to Update This Documentation

To update this documentation:

1. Add new switches to the Switch List table.
2. Update the Switch Categories section if necessary.
3. Add any new switch conflicts to the Switch Conflicts section.
4. Update the documentation whenever switches are added, removed, or modified in the game.
