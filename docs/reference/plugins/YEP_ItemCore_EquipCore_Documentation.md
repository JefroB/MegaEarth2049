> Reference snapshot: verify IDs, effects and enabled-plugin behavior against the live data and current FAQs. This relocation does not certify the older catalog as current.

# YEP_ItemCore and YEP_EquipCore Documentation

## YEP_ItemCore

### Overview
The YEP_ItemCore plugin completely overhauls the item system in RPG Maker MV, providing a more robust framework for item management and customization. It introduces the concept of "independent items" - unique instances of items with their own properties, allowing for equipment upgrading, item customization, and more complex inventory systems.

### Configuration in MegaEarth2049
- **Max Items**: 0 (No limit on regular items)
- **Max Weapons**: 100 (Maximum of 100 weapons)
- **Max Armors**: 100 (Maximum of 100 armors)
- **Starting ID**: 3000 (Independent items start at ID 3000)
- **Random Variance**: 0 (No random variance in item stats)
- **Negative Variance**: false (Prevents negative variance)
- **Name Format**: %1%2%3%4 (Format for item names)
- **Name Spacing**: true (Adds spacing in item names)
- **Boost Format**: (+%1) (Format for stat boosts)
- **Updated Scene Item**: true (Uses the updated item scene)
- **List Equipped Items**: true (Shows equipped items in the item list)
- **Show Icon**: false (Doesn't show large icons in the item scene)
- **Icon Size**: 96 (Size of icons when shown)
- **Font Size**: 18 (Font size for item information)
- **Command Alignment**: center (Centers command text)
- **Recovery Format**: %1 Heal (Format for recovery effects)
- **Add State**: +State (Text for adding states)
- **Add Buff**: +Buff (Text for adding buffs)
- **Remove State**: -State (Text for removing states)
- **Remove Buff**: -Buff (Text for removing buffs)
- **Maximum Icons**: 4 (Maximum number of icons shown for effects)
- **Use Command**: Use %1 (Format for the use command)
- **Carry Format**: %1/%2 (Format for showing item quantity)
- **Midgame Note Parsing**: false (Doesn't parse notetags midgame)

### Implementation in MegaEarth2049
The ItemCore system in MegaEarth2049 is implemented to enhance the item management experience and provide more depth to equipment and consumables. The implementation includes:

1. **Independent Items System**:
   - Weapons and armor can have unique properties, allowing for equipment with varying stats
   - Items can be upgraded or modified, creating a progression system for equipment
   - Each independent item has its own unique ID starting from 3000

2. **Enhanced Item Interface**:
   - The item menu has been redesigned to provide more information about items
   - Item effects are clearly displayed with intuitive icons and text
   - Recovery effects show exact values (e.g., "50 HP Heal")
   - State and buff effects are clearly labeled (e.g., "+Poison", "+ATK")

3. **Integration with YEP_X_ItemPictureImg**:
   - Important items can display larger, more detailed images in the item menu
   - These images provide visual interest and help players identify special items
   - The maximum image size is set to 128x128 pixels

4. **Integration with YEP_X_ItemDiscard**:
   - Players can discard unwanted items to manage inventory space
   - A confirmation dialog prevents accidental discarding of valuable items
   - The discard command shows the current quantity (e.g., "Discard Potion 5/10")

5. **Equipment Management**:
   - Equipment is listed in the item menu when "List Equipped Items" is enabled
   - This allows players to see all their equipment in one place
   - Works seamlessly with YEP_EquipCore for a comprehensive equipment system

6. **Item Categories**:
   - Items are organized into categories for easier navigation
   - The command alignment is set to center for a clean, professional look
   - Font size is set to 18 for good readability

This implementation creates a more engaging and strategic item system, allowing for greater depth in equipment progression and inventory management.

## YEP_EquipCore

### Overview
The YEP_EquipCore plugin enhances the equipment system in RPG Maker MV, allowing for more flexibility and customization. It enables unique equipment slots per class, provides a more intuitive equipment interface, and integrates seamlessly with YEP_ItemCore for a comprehensive item and equipment system.

### Configuration in MegaEarth2049
- **Text Align**: center (Centers text in the equipment menu)
- **Finish Command**: Finish (Text for the finish command)
- **Remove Text**: Remove (Text for removing equipment)
- **Remove Icon**: 16 (Icon used for the remove command)
- **Empty Text**: <Empty> (Text displayed for empty equipment slots)
- **Empty Icon**: 16 (Icon used for empty equipment slots)
- **Non-Removable Types**: 1 (Equipment type that cannot be removed)
- **Non-Optimized Types**: 5 (Equipment type that is not affected by optimize)

### Implementation in MegaEarth2049
The EquipCore system in MegaEarth2049 is implemented to provide a more flexible and intuitive equipment system that enhances character customization. The implementation includes:

1. **Class-Specific Equipment Slots**:
   - Different character classes have unique equipment slot configurations
   - This allows for specialized equipment types for certain classes
   - For example, the Hacker class might have a "Cyberdeck" slot, while the Medic class has a "Medical Kit" slot

2. **Equipment Interface Improvements**:
   - The equipment menu is more intuitive and visually appealing
   - Text is centered for better readability
   - Empty slots are clearly marked with the text "<Empty>" and icon 16
   - The "Remove" command is available for most equipment types

3. **Equipment Restrictions**:
   - Equipment type 1 (likely weapons) cannot be removed, ensuring characters always have a basic means of attack
   - Equipment type 5 is not affected by the "Optimize" command, allowing for strategic equipment choices that might not be optimal for raw stats

4. **Integration with YEP_ItemCore**:
   - Works seamlessly with the independent items system from YEP_ItemCore
   - Allows for unique equipment with varying stats and properties
   - Supports equipment upgrading and customization

5. **Visual Presentation**:
   - Equipment stats and effects are clearly displayed
   - Icons provide visual cues for equipment types and effects
   - The "Finish" command allows players to exit the equipment menu when they're done making changes

6. **Strategic Equipment Management**:
   - Players can customize their characters' equipment based on different combat situations
   - The system supports different equipment strategies for different character builds
   - Equipment choices have meaningful impacts on character performance

This implementation creates a more engaging and strategic equipment system, allowing for greater depth in character customization and combat preparation.

## Integration Between YEP_ItemCore and YEP_EquipCore

The integration between YEP_ItemCore and YEP_EquipCore creates a comprehensive item and equipment system that enhances the gameplay experience in MegaEarth2049:

1. **Independent Equipment**:
   - YEP_ItemCore's independent items system allows for unique equipment with varying stats
   - YEP_EquipCore's flexible equipment slots system allows these unique items to be equipped in class-specific ways
   - Together, they create a deep equipment progression system

2. **Unified Interface**:
   - Both plugins use consistent formatting and visual presentation
   - Text alignment is centered in both systems
   - Icons and formatting are consistent across both systems

3. **Equipment Management**:
   - Players can view their equipment in the item menu (YEP_ItemCore)
   - Players can equip, remove, and optimize their equipment in the equipment menu (YEP_EquipCore)
   - The two systems work together to provide a seamless equipment management experience

4. **Strategic Depth**:
   - The combination of these plugins allows for more strategic depth in equipment choices
   - Players can collect, upgrade, and customize equipment (YEP_ItemCore)
   - Players can equip this customized equipment in class-specific ways (YEP_EquipCore)

5. **Technical Implementation**:
   - Both plugins share data structures for items and equipment
   - YEP_ItemCore handles the creation and management of independent items
   - YEP_EquipCore handles the equipping and unequipping of these items
   - Together, they create a cohesive system that enhances the RPG experience

This integration creates a more engaging and strategic item and equipment system, allowing for greater depth in character customization and progression.
