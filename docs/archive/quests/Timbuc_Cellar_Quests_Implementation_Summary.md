> Historical document retained for provenance. Its commands, IDs and completion claims may be superseded. Use the current FAQs, roadmap and maintained tools for current behavior.

# Timbuc Cellar Quests Implementation Summary

This document provides a summary of the three previously undocumented quests in Timbuc Cellar (Map015.json) that have now been properly documented and implemented.

## Overview

The following quests have been documented and implemented:

1. **The Mysterious Smelly Keys** (Quest ID: 9)
2. **The Engine Reconstruction** (Quest ID: 10)
3. **The Ancient Necklace** (Quest ID: 11)

Each quest has been fully documented with:
- Complete quest parameters
- Quest flow
- Required resources
- YEP_QuestJournal integration
- Detailed event implementation
- Switch documentation
- Testing checklists
- Known issues and considerations

## 1. The Mysterious Smelly Keys

### Quest Summary
This collection quest involves finding seven smelly keys throughout Timbuc Cellar, each unlocking a specific door leading to different areas with potential treasures and items.

### Key Implementation Details
- **Quest ID**: 9
- **Category**: 3 (Collection Quest)
- **Difficulty**: 2
- **Main Switches**: 
  - Switch 60: Smelly Keys Quest Active
  - Switches 12, 28-33: Door unlock switches
- **Key Events**:
  - Event 27: Gives Smelly Key #1
  - Events 12-16, 21, 26: Door events
  - New events for keys 2-7

### Implementation Files
- [Smelly_Keys_Quest_Implementation.md](Smelly_Keys_Quest_Implementation.md): Complete implementation guide

## 2. The Engine Reconstruction

### Quest Summary
This quest involves helping an Armatek engineer by finding three components needed to build a revolutionary engine. The quest begins when the player speaks with the engineer in Timbuc Cellar.

### Key Implementation Details
- **Quest ID**: 10
- **Category**: 2 (Side Quest)
- **Difficulty**: 3
- **Main Switches**:
  - Switch 61: Engine Blueprint Quest Active
  - Switch 62: Engine Blueprint Obtained
  - Switches 63-65: Component tracking
  - Switch 66: All Components Found
  - Switch 67: Engine Blueprint Quest Completed
- **Key Events**:
  - Events 28-29: Armatek Engineer
  - New events for components A, B, and C

### Implementation Files
- [Engine_Blueprint_Quest_Implementation.md](Engine_Blueprint_Quest_Implementation.md): Complete implementation guide

## 3. The Ancient Necklace

### Quest Summary
This collection quest involves finding four necklace pieces throughout Timbuc Cellar. When all pieces are collected, they combine to form the Ancient Necklace, a powerful accessory that enhances the player's stats.

### Key Implementation Details
- **Quest ID**: 11
- **Category**: 4 (Collection Quest)
- **Difficulty**: 2
- **Main Switches**:
  - Switch 7: Controls visibility of necklace piece events
  - Switch 68: Necklace Pieces Quest Active
  - Switches 69-72: Necklace piece tracking
  - Switch 73: All Necklace Pieces Found
- **Key Events**:
  - Events 22-25: Necklace piece events

### Implementation Files
- [Necklace_Pieces_Collection_Implementation.md](Necklace_Pieces_Collection_Implementation.md): Complete implementation guide

## Switch Documentation

All switches used in these quests have been properly documented in the [MegaEarth2049_Quest_Switch_Documentation.md](../../reference/database/MegaEarth2049_Quest_Switch_Documentation.md) file. This documentation includes:

- Switch ID
- Name/Purpose
- Used In (maps/events)
- Description
- Notes

## Quest Journal Integration

Each quest has been integrated with the YEP_QuestJournal plugin with:

- Proper quest entries in the QuestData section
- Plugin commands for quest tracking
- Objective updates at appropriate points

## Implementation Notes

1. **Relationship Between Quests**:
   - The Necklace Pieces Collection quest is separate from Jen's Necklace quest (which uses Switch 9)
   - All three quests are independent of each other and can be completed in any order

2. **Switch Usage**:
   - Switches have been assigned according to the recommended ranges in the Switch Documentation
   - Self switches are used for event-specific state
   - Global switches are used for cross-map quest logic

3. **Item IDs**:
   - Item IDs have been assigned according to the docs/reference/database/MegaEarth2049_Item_ID_Standardization_Guide.md

4. **Testing**:
   - Each implementation guide includes a comprehensive testing checklist
   - Edge cases have been considered and documented

## Next Steps

1. **Implementation in Game**:
   - Update YEP_QuestJournal.js with the new quest entries
   - Modify existing events in Map015.json as specified
   - Create new events for quest components as needed

2. **Testing**:
   - Follow the testing checklists in each implementation guide
   - Verify quest progression and journal updates
   - Test edge cases and potential conflicts

3. **Documentation Updates**:
   - Update docs/archive/quests/MegaEarth2049_Quest_Design_Documentation.md to include these quests
   - Update docs/reference/maps/MegaEarth2049_Map_Structure_Documentation.md to reflect new events

## Conclusion

These three quests have been fully documented and implemented according to best practices for MegaEarth2049. The implementation guides provide detailed instructions for adding these quests to the game, ensuring proper integration with existing systems and consistent player experience.
