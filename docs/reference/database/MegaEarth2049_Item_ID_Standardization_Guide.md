> Reference snapshot: verify IDs, effects and enabled-plugin behavior against the live data and current FAQs. This relocation does not certify the older catalog as current.

# MegaEarth2049 Item ID Standardization Guide

This document provides guidelines for standardizing item IDs in MegaEarth2049. Following these guidelines will help avoid conflicts and confusion when creating new items for quests and other game features.

## Current Issues

Our analysis of the MegaEarth2049 item system revealed several issues:

1. **Inconsistent ID Assignment**: Items are assigned IDs without a clear pattern or organization
2. **Overlapping ID Ranges**: Different item types sometimes share the same ID ranges
3. **Confusion Between Similar Items**: Similar items (e.g., necklace pieces vs. Jen's Necklace) have unclear relationships
4. **Undocumented Items**: Many items exist in the game code but lack proper documentation
5. **Missing Quest Integration**: Quest items often lack proper integration with the quest journal

## Item Type Categories

To standardize item IDs, we recommend categorizing items into the following types:

1. **Regular Items**: Consumable items that provide immediate effects
2. **Key Items**: Non-consumable items used for quest progression
3. **Quest Items**: Items specifically tied to quests
4. **Weapons**: Equipment that increases attack power
5. **Armor**: Equipment that increases defense
6. **Accessories**: Equipment that provides special effects

## Recommended ID Ranges

We recommend assigning item IDs according to the following ranges:

| Item Type | ID Range | Description |
|-----------|----------|-------------|
| Regular Items | 1-100 | Consumable items like potions, food, etc. |
| Key Items | 101-200 | Non-consumable items used for progression |
| Quest Items | 201-300 | Items specifically tied to quests |
| Weapons | 301-400 | Equipment that increases attack power |
| Armor | 401-500 | Equipment that increases defense |
| Accessories | 501-600 | Equipment that provides special effects |
| Special Items | 601-700 | Items with unique properties or effects |
| Event Items | 701-800 | Items used in specific events |
| Collectibles | 801-900 | Items collected for achievements or rewards |
| Crafting Materials | 901-1000 | Materials used for crafting |

## Sub-Categories

Within each main category, we recommend further organizing items into sub-categories:

### Regular Items (1-100)

- **1-20**: Healing items (potions, food, etc.)
- **21-40**: Status recovery items (antidotes, awakening, etc.)
- **41-60**: Stat boost items (protein, iron, etc.)
- **61-80**: Battle items (bombs, grenades, etc.)
- **81-100**: Miscellaneous items

### Key Items (101-200)

- **101-120**: Story progression items
- **121-140**: Area access items (keys, passes, etc.)
- **141-160**: Character-specific items
- **161-180**: Special event items
- **181-200**: Miscellaneous key items

### Quest Items (201-300)

- **201-220**: Main quest items
- **221-240**: Character quest items
- **241-260**: Side quest items
- **261-280**: Collection quest items
- **281-300**: Challenge quest items

## Naming Conventions

To further standardize items, we recommend following these naming conventions:

1. **Clear, Descriptive Names**: Use names that clearly indicate the item's purpose
2. **Consistent Capitalization**: Use title case for all item names
3. **Type Indicators**: Include type indicators in the name when appropriate (e.g., "Potion - Small", "Key - Rusty")
4. **Quest Indicators**: For quest items, include the quest name in the item description (e.g., "A key item for the 'Lost Necklace' quest")

## Item Properties

When creating new items, ensure the following properties are set appropriately:

1. **Item Type**: Set the correct item type (regular item, key item, weapon, armor, etc.)
2. **Consumable Flag**: Set to true for consumable items, false for non-consumable items
3. **Price**: Set an appropriate price (0 for quest items that shouldn't be sold)
4. **Icon**: Choose an appropriate icon that clearly represents the item
5. **Description**: Provide a clear, detailed description of the item's purpose and effects
6. **Effects**: Set appropriate effects for consumable items
7. **Equip Traits**: Set appropriate traits for equipment
8. **Note Tags**: Add appropriate note tags for special properties

## Documentation Requirements

For each new item, document the following information:

1. **Item ID**: The unique identifier for the item
2. **Item Name**: The name of the item as it appears in the game
3. **Item Type**: The category of the item (regular, key, weapon, etc.)
4. **Description**: A brief description of the item
5. **Acquisition**: How the player obtains the item
6. **Purpose**: What the item is used for
7. **Related Quests**: Any quests that involve the item
8. **Related Events**: Any events that involve the item
9. **Notes**: Any additional information about the item

## Example: Standardizing Jen's Quest Items

Here's an example of how to standardize the items for Jen's recruitment quest:

### Current Implementation

- **Item ID 10**: Necklace Piece (regular item)
- **Item ID 146**: Jen's Necklace (key item)

### Standardized Implementation

- **Item ID 10**: Moved to ID 241 (Side quest item)
  - **Name**: Necklace Piece
  - **Type**: Quest Item
  - **Description**: "A piece of a broken necklace. Collect all pieces to complete the 'Necklace Collection' quest."
  - **Related Quest**: Necklace Collection Quest

- **Item ID 146**: Moved to ID 221 (Character quest item)
  - **Name**: Jen's Necklace
  - **Type**: Quest Item
  - **Description**: "A beautiful silver necklace with a small crystal pendant. Return it to Jen to complete the 'Jen's Lost Necklace' quest."
  - **Related Quest**: Jen's Recruitment Quest

## Implementation Process

To standardize item IDs in MegaEarth2049, follow these steps:

1. **Document Current Items**: Create a comprehensive list of all existing items and their properties
2. **Assign New IDs**: Assign new IDs to items according to the recommended ranges
3. **Update Item Database**: Update the Items.json file with the new IDs and properties
4. **Update Event References**: Update all event scripts that reference the old item IDs
5. **Update Quest Journal**: Update the YEP_QuestJournal.js file with any changes to quest items
6. **Test Changes**: Test all affected quests and events to ensure they work correctly with the new item IDs

## Handling Existing Items

When standardizing existing items, consider the following approaches:

1. **Direct Replacement**: Replace the old item with a new item at a different ID
2. **Gradual Transition**: Keep the old item but make it unobtainable, and introduce the new item for new playthroughs
3. **Save Compatibility**: Implement a system to convert old item IDs to new IDs when loading saves

## Best Practices

1. **Document All Changes**: Keep detailed records of all item ID changes
2. **Test Thoroughly**: Test all affected quests and events after making changes
3. **Update Documentation**: Update all documentation to reflect the new item IDs
4. **Communicate Changes**: Ensure all team members are aware of the changes
5. **Version Control**: Use version control to track changes to item IDs

## Conclusion

By following these guidelines for standardizing item IDs in MegaEarth2049, the development team can create a more organized, maintainable, and user-friendly item system. This will help avoid conflicts and confusion when creating new items for quests and other game features, and provide a better experience for players.
