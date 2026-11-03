> Reference snapshot: verify IDs, effects and enabled-plugin behavior against the live data and current FAQs. This relocation does not certify the older catalog as current.

# Item and Equipment Plugins Documentation

This document provides detailed information about item and equipment related plugins used in the MegaEarth2049 RPG Maker MV project.

## Table of Contents
- [Overview](#overview)
- [Plugin List](#plugin-list)
- [Detailed Documentation](#detailed-documentation)
  - [YEP_ItemCore](#yep_itemcore)
  - [YEP_X_ItemDiscard](#yep_x_itemdiscard)
  - [YEP_X_ItemPictureImg](#yep_x_itempictureimg)
  - [YEP_EquipCore](#yep_equipcore)
  - [YEP_ShopMenuCore](#yep_shopmenucore)
  - [ItemBook](#itembook)
- [Integration Examples](#integration-examples)
- [Related Documentation](#related-documentation)

## Overview

The item and equipment systems in MegaEarth2049 are enhanced through a collection of plugins that expand the default RPG Maker MV functionality. These plugins work together to create a more detailed and customizable item system, equipment management, and shopping experience.

### Plugin Dependencies

```
YEP_ItemCore
├── YEP_X_ItemDiscard
└── YEP_X_ItemPictureImg

YEP_EquipCore
```

## Plugin List

| Plugin Name | Version | Status | Description |
|-------------|---------|--------|-------------|
| YEP_ItemCore | v1.29 | Enabled | Changes how items are handled and enhances the Item Scene |
| YEP_X_ItemDiscard | v1.02 | Enabled | Allows players to discard items from their inventory |
| YEP_X_ItemPictureImg | v1.01 | Enabled | Uses images for items in the menu instead of large icons |
| YEP_EquipCore | v1.17 | Enabled | Makes the equipment system more flexible with unique slots per class |
| YEP_ShopMenuCore | v1.05 | Enabled | Revamps shop menu appearance and provides framework for new shop options |
| ItemBook | N/A | Enabled | Displays detailed statuses of items in an encyclopedia format |

## Detailed Documentation

### YEP_ItemCore

#### Overview
The YEP_ItemCore plugin fundamentally changes how items are handled in the game and enhances the Item Scene with more features and visual improvements. It allows for independent items with unique properties, custom item categories, and a more detailed item display.

#### Configuration in MegaEarth2049
- **Max Items**: 0 (No limit)
- **Max Weapons**: 100
- **Max Armors**: 100
- **Starting ID**: 3000 (Starting ID for independent items)
- **Random Variance**: 0 (No random variance for independent items)
- **Negative Variance**: false (No negative variance for independent items)
- **Name Format**: %1%2%3%4 (Format for item names)
- **Name Spacing**: true (Add spacing to item names)
- **Boost Format**: (+%1) (Format for stat boosts)
- **Updated Scene Item**: true (Use the updated item scene)
- **List Equipped Items**: true (Show equipped items in the item list)
- **Show Icon**: false (Don't show large icons in the item scene)
- **Icon Size**: 96 (Size of icons when shown)
- **Font Size**: 18 (Font size for item information)
- **Command Alignment**: center (Alignment of commands in the item scene)
- **Recovery Format**: %1 Heal (Format for recovery effects)
- **Add State**: +State (Text for adding states)
- **Add Buff**: +Buff (Text for adding buffs)
- **Remove State**: -State (Text for removing states)
- **Remove Buff**: -Buff (Text for removing buffs)
- **Maximum Icons**: 4 (Maximum number of icons to display)
- **Use Command**: Use %1 (Format for the use command)
- **Carry Format**: %1/%2 (Format for item quantity display)
- **Midgame Note Parsing**: false (Don't parse notetags midgame)

#### Implementation in MegaEarth2049
The ItemCore plugin is used extensively throughout the game to create a more detailed and customizable item system. Key implementations include:

1. **Independent Items**:
   - Unique weapons and armor with custom properties
   - Special quest items with unique effects
   - Rare items with enhanced stats

2. **Custom Item Categories**:
   - Standard items (consumables, key items)
   - Cybernetic implants (special equipment category)
   - Collectibles (items for side quests and achievements)
   - Data chips (items containing story information)

3. **Visual Enhancements**:
   - Detailed item descriptions
   - Effect listings for consumable items
   - Stat comparisons for equipment

4. **Integration with Other Systems**:
   - Works with YEP_ShopMenuCore for enhanced shop displays
   - Connects with ItemBook for encyclopedia entries
   - Supports YEP_X_ItemPictureImg for larger item images

### YEP_X_ItemDiscard

#### Overview
This plugin allows players to discard items from their inventory, helping with inventory management and adding realism to the item system.

#### Configuration in MegaEarth2049
- **Discard Command**: Discard %1 %2/%3 (Format for the discard command)
- **Default Discard**: true (Items can be discarded by default)
- **Confirm Discard**: true (Confirm before discarding items)
- **Confirm Message**: Are you sure you want to discard %1 %2? (Confirmation message)
- **Confirm Yes**: Yes (Text for confirming discard)
- **Confirm No**: No (Text for canceling discard)

#### Implementation in MegaEarth2049
The ItemDiscard plugin adds inventory management functionality to the game:

1. **Inventory Management**:
   - Players can discard unwanted items to make room for new ones
   - Confirmation dialog prevents accidental discarding of important items
   - Some key items are marked as non-discardable using the `<Cannot Discard>` notetag

2. **Integration with Game Mechanics**:
   - Inventory limits create strategic decisions about what items to keep
   - Some quests involve discarding specific items as part of their completion

### YEP_X_ItemPictureImg

#### Overview
This plugin allows the use of images for items inside the item menu instead of large icons, providing a more visually appealing and detailed item display.

#### Configuration in MegaEarth2049
- **Max Image Width**: 128 (Maximum width for item images)
- **Max Image Height**: 128 (Maximum height for item images)

#### Implementation in MegaEarth2049
The ItemPictureImg plugin enhances the visual presentation of items:

1. **Custom Item Images**:
   - Key items have detailed images showing their appearance
   - Special equipment has unique visual representations
   - Quest items have images that hint at their purpose

2. **Image Organization**:
   - Images are stored in the img/pictures/ folder
   - Naming convention follows the format "item_[ID]" for easy reference
   - Higher resolution images are used for important story items

### YEP_EquipCore

#### Overview
The YEP_EquipCore plugin allows for the equipment system to be more flexible, enabling unique equipment slots per class and providing a more detailed equipment interface.

#### Configuration in MegaEarth2049
- **Text Align**: center (Alignment of text in the equipment scene)
- **Finish Command**: Finish (Text for the finish command)
- **Remove Text**: Remove (Text for removing equipment)
- **Remove Icon**: 16 (Icon for the remove command)
- **Empty Text**: <Empty> (Text for empty equipment slots)
- **Empty Icon**: 16 (Icon for empty equipment slots)
- **Non-Removable Types**: 1 (Equipment types that cannot be removed)
- **Non-Optimized Types**: 5 (Equipment types that are not affected by optimize)

#### Implementation in MegaEarth2049
The EquipCore plugin creates a more detailed and class-specific equipment system:

1. **Class-Specific Equipment Slots**:
   - **Rex (Hacker)**: Head, Body, Arms, Accessory, Cyberdeck
   - **Jen (Priest/Medic)**: Head, Body, Arms, Accessory, Holy Symbol
   - **Zack (Construction Worker)**: Head, Body, Arms, Accessory, Tool Belt
   - **Zed (Mod Doctor)**: Head, Body, Arms, Accessory, Medical Kit
   - **Black Ninja**: Head, Body, Arms, Accessory, Ninja Tool

2. **Equipment Parameters**:
   - Standard parameters (ATK, DEF, MAT, MDF, AGI, LUK)
   - Custom parameters for special equipment effects
   - Unique bonuses for matching equipment sets

3. **Visual Enhancements**:
   - Detailed equipment information display
   - Stat comparison when selecting equipment
   - Visual indicators for equipment effects

4. **Integration with Other Systems**:
   - Works with YEP_ItemCore for independent equipment
   - Connects with YEP_ShopMenuCore for enhanced shop displays
   - Supports equipment-based skills through the WeaponSkill plugin

### YEP_ShopMenuCore

#### Overview
The YEP_ShopMenuCore plugin revamps the shop menu appearance and provides the framework for many new shop options, creating a more detailed and customizable shopping experience.

#### Configuration in MegaEarth2049
- **Command Order**: Buy Sell Equip Custom Cancel (Order of commands in the shop menu)
- **Shop List Width**: Graphics.boxWidth / 2 + Graphics.boxWidth / 10 (Width of the shop list window)
- **Command Alignment**: center (Alignment of commands in the shop menu)
- **Default Mode**: actor (Default mode for the shop status window)
- **Stat Switching**: true (Allow switching between stats in the shop)
- **Cannot Equip**: Can't Equip (Text for items that cannot be equipped)
- **Stat Font Size**: 18 (Font size for stats in the shop)
- **Cannot Equip Font Size**: 18 (Font size for "Cannot Equip" text)
- **Show Icon**: true (Show icons in the shop)
- **Icon Size**: 128 (Size of icons in the shop)
- **Font Size**: 18 (Font size for general text in the shop)
- **Recovery Format**: %1 Heal (Format for recovery effects)
- **Add State**: +State (Text for adding states)
- **Add Buff**: +Buff (Text for adding buffs)
- **Remove State**: -State (Text for removing states)
- **Remove Buff**: -Buff (Text for removing buffs)
- **Maximum Icons**: 4 (Maximum number of icons to display)

#### Current Implementation Status
Currently, the YEP_ShopMenuCore plugin is enabled but not fully utilized for specialized shops. There is a concept for implementing "Zed's mod clinic" as a specialized shop, but this has not been fully realized in the game yet. The game does contain several items attributed to Zed that would be perfect for such a shop:

- **Experimental Neural Enhancer**: "One of Zed's experimental neural mods. Side effect: randomly swaps your limbs. 'It's a feature, not a bug!' - Zed"
- **Disco Implant**: "Zed's prototype mood enhancer. Side effect: causes uncontrollable disco dancing at inappropriate moments."
- **Third Eye Mod**: "Zed's perception enhancer. Side effect: you can see bad puns floating above people's heads. Cannot unsee."

#### Potential Implementation: Zed's Mod Clinic

The YEP_ShopMenuCore plugin provides an excellent foundation for implementing Zed's mod clinic as a specialized shop with unique features and presentation. Here's how it could be implemented:

1. **Custom Shop Commands**:
   The plugin allows for custom commands beyond the standard Buy/Sell options. For Zed's mod clinic, these could include:
   ```javascript
   // Example custom command implementation
   Window_ShopCommand.prototype.addCustomCommands = function() {
     this.addCommand("Install", 'custom', true);
     this.addCommand("Upgrade", 'custom', true);
     this.addCommand("Remove", 'custom', true);
   };
   ```

2. **Specialized Item Display**:
   The enhanced item information window could be used to display both the benefits and humorous side effects of Zed's experimental mods:
   ```javascript
   // Example of custom item description display
   Window_ShopInfo.prototype.drawItemInfo = function(item) {
     var rect = this.getRectPosition(rect, 0);
     this.changeTextColor(this.systemColor());
     this.drawText("Benefits:", rect.x, rect.y, rect.width);
     // Draw benefits
     
     rect = this.getRectPosition(rect, 2);
     this.changeTextColor(this.textColor(10)); // Red color for side effects
     this.drawText("Side Effects:", rect.x, rect.y, rect.width);
     // Draw side effects
   };
   ```

3. **Risk Factor System**:
   A unique "risk factor" could be implemented for Zed's experimental mods, displayed in the shop interface:
   ```javascript
   // Example of risk factor display
   Window_ShopStatus.prototype.drawActorRiskFactor = function(actor, x, y, width) {
     var risk = this._item.meta.riskFactor || 0;
     this.changeTextColor(this.textColor(risk > 5 ? 10 : 2));
     this.drawText("Risk: " + risk + "/10", x, y, width, 'right');
   };
   ```

4. **Integration with Character Stats**:
   The status window could show how mods would affect character parameters, with color-coded indicators for positive and negative effects:
   ```javascript
   // Example of parameter change display
   Window_ShopStatus.prototype.drawActorParamChange = function(x, y, actor, item1) {
     var width = this.contents.width - this.textPadding() - x;
     var paramId = this.paramId();
     var change = this._item.params[paramId] - (item1 ? item1.params[paramId] : 0);
     
     // Draw primary stat change
     this.changeTextColor(this.paramchangeTextColor(change));
     var text = (change > 0 ? '+' : '') + change;
     this.drawText(text, x, y, width, 'right');
     
     // Draw side effect stat change if applicable
     if (this._item.meta.sideEffectParam) {
       var sideEffectId = parseInt(this._item.meta.sideEffectParam);
       var sideChange = parseInt(this._item.meta.sideEffectValue) || 0;
       this.changeTextColor(this.paramchangeTextColor(-sideChange));
       var text = TextManager.param(sideEffectId) + ": " + (sideChange > 0 ? '-' : '+') + sideChange;
       this.drawText(text, x, y + this.lineHeight(), width, 'right');
     }
   };
   ```

5. **Installation Process**:
   Instead of instantly buying items, a custom "installation" process could be implemented for mods:
   ```javascript
   // Example of installation process
   Scene_Shop.prototype.doBuy = function(number) {
     if (this._item.meta.isMod) {
       // Show installation animation/message
       $gameMessage.add(this._item.name + " is being installed on " + this._actor.name() + "...");
       // Apply mod effects
       this.applyModEffects(this._actor, this._item);
       // Deduct gold
       $gameParty.loseGold(number * this.buyingPrice());
     } else {
       // Regular item purchase
       Yanfly.Shop.Scene_Shop_doBuy.call(this, number);
     }
   };
   ```

6. **Visual Customization**:
   The shop could have a unique visual style to reinforce its experimental/risky nature:
   ```javascript
   // Example of custom shop background
   Scene_Shop.prototype.createBackground = function() {
     if (this._shopType === 'modClinic') {
       this._backgroundSprite = new Sprite();
       this._backgroundSprite.bitmap = ImageManager.loadPicture('ModClinicBackground');
       this.addChild(this._backgroundSprite);
     } else {
       Scene_MenuBase.prototype.createBackground.call(this);
     }
   };
   ```

#### Implementation Steps

To fully implement Zed's mod clinic using YEP_ShopMenuCore:

1. **Create a dedicated map event** for Zed's mod clinic with custom graphics and dialogue
2. **Define special shop goods** in the event with unique properties:
   ```javascript
   // Example shop goods setup
   var goods = [
     [1, 132, 0, 0, true],  // Experimental Neural Enhancer
     [1, 133, 0, 0, true],  // Disco Implant
     [1, 134, 0, 0, true]   // Third Eye Mod
   ];
   ```

3. **Add metadata to mod items** in the database:
   ```
   <isMod>
   <riskFactor:7>
   <sideEffectParam:6>
   <sideEffectValue:2>
   ```

4. **Create custom shop processing** for installation and side effects:
   ```javascript
   // Example custom shop processing
   Scene_Shop.prototype.applyModEffects = function(actor, item) {
     // Apply primary effect
     actor.addParam(item.meta.paramId, item.meta.paramValue);
     
     // Apply side effect with chance based on risk factor
     var risk = item.meta.riskFactor || 5;
     if (Math.random() < risk/10) {
       actor.addParam(item.meta.sideEffectParam, -item.meta.sideEffectValue);
       $gameMessage.add("Side effect triggered: " + item.meta.sideEffectDesc);
     }
   };
   ```

5. **Add visual and sound effects** for the installation process:
   ```javascript
   // Example installation effects
   Scene_Shop.prototype.showInstallationEffect = function(actor) {
     // Play installation sound
     AudioManager.playSe({name: 'Buzzing', pan: 0, pitch: 100, volume: 90});
     
     // Show installation animation
     $gameScreen.startFlash([255, 0, 255, 128], 60);
     
     // Show success message with random humor
     var messages = [
       "Installation complete! Feeling tingly yet?",
       "Mod successfully installed! Any extra limbs are completely normal.",
       "All done! The voices in your head are just the mod calibrating."
     ];
     $gameMessage.add(messages[Math.floor(Math.random() * messages.length)]);
   };
   ```

#### Benefits of Implementation

Implementing Zed's mod clinic using YEP_ShopMenuCore would provide several benefits:

1. **Unique Gameplay Mechanics**: Mods could provide special abilities with interesting trade-offs
2. **Character Customization**: Players could customize their characters beyond standard equipment
3. **Thematic Reinforcement**: Enhances the cyberpunk theme with body modifications
4. **Humor Integration**: Provides opportunities for the game's humor through side effects
5. **Risk/Reward System**: Creates interesting player choices with the risk factor system

### ItemBook

#### Overview
The ItemBook plugin by Yoji Ojima creates an item encyclopedia that displays detailed information about items the player has obtained. This plugin allows players to access information about item effects, equipment stats, and other properties.

#### Configuration in MegaEarth2049
- **Unknown Data**: ?????? (The specific configuration parameters are not fully documented in the plugins.js file)
- **Price Text**: Price
- **Equip Text**: Equip
- **Type Text**: Type

#### Implementation in MegaEarth2049
The ItemBook serves as a comprehensive catalog of all items in the game, providing players with detailed information about each item they've discovered. The implementation includes:

1. **Item Registration System**:
   - Items are automatically registered in the ItemBook when obtained
   - The game features a wide variety of items including consumables, key items, weapons, and armor

2. **Item Information Display**:
   - Basic properties (name, description, icon)
   - Price information for purchasable items
   - Effect details for consumable items
   - Stat bonuses for equipment
   - Equipment restrictions (which characters can equip the item)

3. **Menu Integration**:
   - The ItemBook is accessible through the main menu
   - Items are categorized by type (consumables, key items, weapons, armor)
   - A completion percentage is shown to encourage players to collect all items

4. **Integration with YEP_ItemCore**:
   - The ItemBook works seamlessly with the YEP_ItemCore plugin
   - Independent items with unique properties are properly displayed
   - Custom item categories are supported

5. **Visual Enhancements**:
   - Works with YEP_X_ItemPictureImg to display larger item images when available
   - Provides a more visually appealing way to browse the game's items

## Integration Examples

### Custom Item System Example

Here's an example of how the item plugins work together to create a custom item system:

```javascript
// Define an independent weapon with custom properties
var weapon = $gameParty.gainIndepWeapon(45, 1); // Base weapon ID 45
weapon.name = "Prototype Neural Disruptor";
weapon.description = "An experimental weapon that targets the opponent's neural implants.";
weapon.price = 8500;
weapon.params[2] = 35; // ATK +35
weapon.params[4] = 15; // MAT +15
weapon.note = "<skill_id:59>\n<element:6>\n<riskFactor:3>";

// Add custom properties
weapon.addCustomParam("critRate", 15); // 15% critical rate
weapon.addCustomParam("jamChance", 5); // 5% chance to jam

// Register with ItemBook
$gameSystem.addItemBookItem(1, weapon.baseItemId);
```

### Shop System Integration

The YEP_ShopMenuCore plugin integrates with other item plugins to create a comprehensive shop system:

```javascript
// Example of a custom shop event
var event = {
  // Shop setup
  list: [
    { code: 302, indent: 0, parameters: [0, 1, 0, 0, false] }, // Shop command
    // Shop goods
    { code: 605, indent: 0, parameters: [0, 2, 0, 0] },
    { code: 605, indent: 0, parameters: [0, 3, 0, 0] },
    { code: 605, indent: 0, parameters: [0, 4, 0, 0] },
    // Custom shop processing
    { code: 355, indent: 0, parameters: ["var id = this._eventId;"] },
    { code: 655, indent: 0, parameters: ["var shop = $gameMap.event(id).shopType = 'modClinic';"] },
    { code: 655, indent: 0, parameters: ["SceneManager._scene.setShopType('modClinic');"] },
    { code: 0, indent: 0, parameters: [] }
  ]
};
```

## Related Documentation

- [Battle_System_Plugins.md](Battle_System_Plugins.md) - Documentation for battle system plugins
- [Character_Party_Plugins.md](Character_Party_Plugins.md) - Documentation for character and party plugins
- [Zeds_Mod_Clinic_Implementation.md](Zeds_Mod_Clinic_Implementation.md) - Detailed implementation guide for Zed's mod clinic
- [RPG_Maker_MV_Plugins_README.md](RPG_Maker_MV_Plugins_README.md) - Main plugins documentation index
