> Reference snapshot: verify IDs, effects and enabled-plugin behavior against the live data and current FAQs. This relocation does not certify the older catalog as current.

# MegaEarth2049 Tileset Flag Documentation

This document provides a comprehensive guide to understanding and using the flag values in MegaEarth2049's tilesets. These flags define tile properties such as passability, terrain tags, and special behaviors.

## 1. Understanding Tileset Structure

MegaEarth2049 uses four primary tilesets:

1. **Tileset ID 1: Overworld** (Mode 0)
   - Used for: World map and outdoor areas
   - Tileset files: World_A1, World_A2, World_B, World_C

2. **Tileset ID 2: Outside** (Mode 1)
   - Used for: Detailed outdoor areas, cities, towns
   - Tileset files: Outside_A1, Outside_A2, Outside_A3, Outside_A4, Outside_A5, Outside_B, Outside_C

3. **Tileset ID 3: Inside** (Mode 1)
   - Used for: Interior locations like buildings, houses
   - Tileset files: Inside_A1, Inside_A2, Inside_A4, Inside_A5, Inside_B, Inside_C

4. **Tileset ID 4: Dungeon** (Mode 1)
   - Used for: Dungeons, caves, and special areas
   - Tileset files: Dungeon_A1, Dungeon_A2, Dungeon_A4, Dungeon_A5, Dungeon_B, Dungeon_C, SciFi_Armory

## 2. Flag Value Structure

In RPG Maker MV, each tile has a flag value that defines its properties. These flag values are stored as decimal numbers but are best understood in hexadecimal format (0xXXXX).

### 2.1 Bit Structure

The flag value is a 16-bit number with the following structure:

```
0xABCD (16 bits total)
```

Where:
- **Bits 0-3 (D)**: Passability flags (direction-based)
  - Bit 0: Down passability (0 = passable, 1 = impassable)
  - Bit 1: Left passability (0 = passable, 1 = impassable)
  - Bit 2: Right passability (0 = passable, 1 = impassable)
  - Bit 3: Up passability (0 = passable, 1 = impassable)

- **Bits 4-11 (B & C)**: Special flags
  - Bit 4 (0x0010): Ladder
  - Bit 5 (0x0020): Bush
  - Bit 6 (0x0040): Counter
  - Bit 7 (0x0080): Damage floor
  - Bit 8 (0x0100): Terrain tag 1
  - Bit 9 (0x0200): Terrain tag 2
  - Bit 10 (0x0400): Terrain tag 3
  - Bit 11 (0x0800): Terrain tag 4

- **Bits 12-15 (A)**: Additional flags
  - Bit 12 (0x1000): Terrain tag 5
  - Bit 13 (0x2000): Terrain tag 6
  - Bit 14 (0x4000): Terrain tag 7
  - Bit 15 (0x8000): Terrain tag 8

## 3. Common Flag Values

Based on analysis of the tilesets in MegaEarth2049, the following flag values are most commonly used:

### 3.1 Most Common Flag Values

| Flag Value | Hex Value | Description | Occurrence |
|------------|-----------|-------------|------------|
| 3599 | 0x0E0F | Impassable from all directions with terrain tags 2, 3, 4 | Very High |
| 1536 | 0x0600 | Fully passable with terrain tags 2, 3 | Very High |
| 3584 | 0x0E00 | Fully passable with terrain tags 2, 3, 4 | High |
| 1551 | 0x060F | Impassable from all directions with terrain tags 2, 3 | Medium |
| 2063 | 0x080F | Impassable from all directions with terrain tag 4 | Medium |
| 3648 | 0x0E40 | Fully passable with counter flag and terrain tags 2, 3, 4 | Medium |
| 3588 | 0x0E04 | Impassable from up direction with terrain tags 2, 3, 4 | Low |
| 3586 | 0x0E02 | Impassable from right direction with terrain tags 2, 3, 4 | Low |
| 3592 | 0x0E08 | Impassable from right and up directions with terrain tags 2, 3, 4 | Low |
| 3904 | 0x0F40 | Fully passable with counter flag and terrain tags 1, 2, 3, 4 | Low |
| 1552 | 0x0610 | Fully passable with ladder flag and terrain tags 2, 3 | Low |

### 3.2 Passability Patterns

The most common passability patterns are:

1. **Fully Passable (0x--00)**
   - Example: 1536 (0x0600), 3584 (0x0E00)
   - Can be entered from all directions

2. **Fully Impassable (0x--0F)**
   - Example: 1551 (0x060F), 3599 (0x0E0F)
   - Cannot be entered from any direction

3. **Directional Passability**
   - Example: 3586 (0x0E02) - Impassable from right
   - Example: 3588 (0x0E04) - Impassable from up
   - Example: 3592 (0x0E08) - Impassable from right and up

### 3.3 Special Tile Properties

1. **Counter Tiles (0x--40)**
   - Example: 3648 (0x0E40), 3904 (0x0F40)
   - Used for shop counters, tables, etc.
   - Players can interact with events across these tiles

2. **Ladder Tiles (0x--10)**
   - Example: 1552 (0x0610)
   - Used for climbing up/down

3. **Bush Tiles (0x--20)**
   - Characters appear partially hidden when standing on these tiles

4. **Damage Floor (0x--80)**
   - Causes damage to characters standing on these tiles

## 4. Tileset-Specific Flag Patterns

### 4.1 Overworld Tileset (ID 1)

The Overworld tileset primarily uses:
- 3599 (0x0E0F): For mountains, walls, and impassable terrain
- 1536 (0x0600): For open areas, fields, and passable terrain
- 3584 (0x0E00): For special passable terrain with additional terrain tags
- 1551 (0x060F): For water, cliffs, and other impassable features

### 4.2 Outside Tileset (ID 2)

The Outside tileset shows more variety in flag values, including:
- More directional passability flags for complex structures
- Counter flags (0x--40) for buildings and structures
- Additional special property flags for detailed outdoor environments

### 4.3 Inside Tileset (ID 3)

The Inside tileset focuses on:
- Counter flags for furniture and interior objects
- Directional passability for walls and doorways
- Special terrain tags for different floor types

### 4.4 Dungeon Tileset (ID 4)

The Dungeon tileset includes:
- Complex passability patterns for maze-like structures
- Special flags for hazardous terrain
- Unique terrain tags for different dungeon environments

## 5. Creating Maps with Proper Tile Properties

When creating maps in MegaEarth2049, follow these guidelines:

### 5.1 Passability Best Practices

1. **Maintain Consistency**: Use the same flag values for similar terrain types across maps
   - Water should always use the same impassable flag (typically 1551 or 3599)
   - Walls should use consistent impassable flags
   - Floors should use consistent passable flags (typically 1536 or 3584)

2. **Use Directional Passability Logically**:
   - One-way passages should use appropriate directional flags
   - Cliffs should be impassable from the higher side but passable from the lower side

### 5.2 Special Properties Guidelines

1. **Counters (0x--40)**:
   - Use for shop counters, tables, desks, and similar furniture
   - Place NPCs behind counters for shop interactions

2. **Ladders (0x--10)**:
   - Use for vertical connections between areas
   - Ensure proper event connections at ladder endpoints

3. **Bush Effects (0x--20)**:
   - Use for tall grass, shallow water, or dense foliage
   - Consider gameplay implications of partially hidden characters

### 5.3 Terrain Tags Usage

Terrain tags (bits 8-15) can be used for:
- Custom movement sounds
- Special movement properties (like slippery ice)
- Encounter rate modifications
- Custom effects via plugins

## 6. Troubleshooting Common Issues

### 6.1 Passability Problems

If characters can pass through what should be solid objects:
- Check that the correct impassable flag (0x--0F) is applied
- Verify that all tiles in the object have proper flags
- Ensure no passable tiles (0x--00) are accidentally used

### 6.2 Event Interaction Issues

If events cannot be triggered across counters:
- Verify the counter flag (0x--40) is properly set
- Check event trigger settings (should be "Player Touch" or "Action Button")
- Ensure the event is directly adjacent to the counter tile

## 7. Advanced Flag Customization

For advanced users who need to modify flag values:

1. Extract the specific tileset using the provided script
2. Modify the flag values as needed
3. Update the tilesets.json file with the modified values

## 8. Conclusion

Understanding and properly using tile flags is essential for creating functional and visually appealing maps in MegaEarth2049. By following the patterns established in the existing tilesets, you can ensure consistency and proper gameplay functionality across all maps in the game.

For any questions or issues related to tile properties, refer to this documentation or consult the RPG Maker MV official resources.
