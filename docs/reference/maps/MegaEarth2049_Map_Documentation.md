> Reference snapshot: verify IDs, effects and enabled-plugin behavior against the live data and current FAQs. This relocation does not certify the older catalog as current.

# MegaEarth2049 Map Documentation

## Overview

This document provides a comprehensive overview of the maps in MegaEarth2049. The game contains a total of 103 maps, organized into various locations and areas. This documentation is designed to help developers understand the map structure, identify incomplete maps, and provide guidance for future map development.

## Map Statistics

- **Total Maps**: 103
- **Complete Maps**: 72
- **Maps Without Names**: 18
- **Maps Without Events**: 9
- **Maps Without Tiles**: 4
- **Maps With Errors**: 0

## Map Structure

Maps in RPG Maker MV are stored as JSON files in the `data` directory, with filenames following the pattern `MapXXX.json` where XXX is the map ID. Each map file contains the following key information:

- **displayName**: The name of the map shown in the game
- **width** and **height**: The dimensions of the map in tiles
- **tilesetId**: The ID of the tileset used for the map
- **events**: An array of event objects that define interactive elements on the map

## Map Categories

### Main Areas

1. **Mega Earth** (Map 001): The main world map, 35x35 tiles with 20 events
2. **Timbuc** (Map 010): A village area, 17x13 tiles with 12 events
3. **Timbuc 2** (Map 002): An extension of Timbuc, 25x30 tiles with 27 events
4. **Cellar** (Map 015): A dungeon area, 70x50 tiles with 29 events
5. **Planet Ork** (Map 028): An alien planet, 40x40 tiles with 4 events
6. **Planet Ting Ting** (Map 039): Another alien planet, 40x40 tiles with 3 events
7. **Dorlund Station** (Map 042): A station area, 50x20 tiles with 7 events
8. **Dorlund Center** (Map 043): The center of Dorlund, 30x25 tiles with 5 events
9. **Newtown** (Map 049): A town area, 41x40 tiles with 9 events
10. **Newtown Lake** (Map 070): A lake area, 80x40 tiles with 5 events
11. **Big Ass Desert** (Map 076): A desert area, 80x80 tiles with 6 events
12. **North D Town** (Map 077): The northern part of D Town, 40x40 tiles with 12 events
13. **South D Town** (Map 097): The southern part of D Town, 38x24 tiles with 6 events

### Shops and Services

1. **Item Shops**: Maps 003, 069, 074
2. **Weapon Shops**: Maps 004, 012, 044, 072, 079
3. **Armor Shops**: Maps 036, 058, 073, 080
4. **Inns**: Maps 013, 014, 034, 066, 071, 082
5. **Body Modification Centers**: Maps 024, 045, 083

### Special Locations

1. **Internet Cafe** (Map 008): 17x8 tiles with 3 events
2. **Matrix** (Map 009): A digital world, 20x20 tiles with 4 events
3. **Jen's House** (Map 056): 17x13 tiles with 8 events
4. **Zack's House** (Map 035): 10x7 tiles with 5 events
5. **Reinforced Tunnel** (Map 046): 100x35 tiles with 3 events
6. **Snowy Village** (Map 047): 40x40 tiles with 8 events
7. **D Town Bar** (Map 084): 20x8 tiles with 5 events
8. **D Town Speak Easy** (Map 101): 20x8 tiles with 3 events

## Incomplete Maps

### Maps Without Names

The following maps do not have display names, which suggests they may be incomplete or placeholder maps:

| Map ID | Dimensions | Events |
|--------|------------|--------|
| 032 | 9 x 7 | 3 |
| 040 | 20 x 16 | 1 |
| 051 | 17 x 13 | 0 |
| 052 | 17 x 13 | 0 |
| 053 | 17 x 13 | 0 |
| 055 | 17 x 13 | 0 |
| 060 | 50 x 50 | 0 |
| 085 | 60 x 48 | 9 |
| 086 | 10 x 8 | 1 |
| 087 | 8 x 10 | 1 |
| 088 | 12 x 6 | 1 |
| 089 | 6 x 10 | 2 |
| 090 | 14 x 10 | 1 |
| 096 | 17 x 13 | 0 |
| 098 | 8 x 6 | 1 |
| 099 | 10 x 8 | 2 |
| 100 | 70 x 60 | 0 |
| 102 | 100 x 100 | 0 |
| Infos | Invalid dimensions | 0 |

### Maps Without Events

The following maps have names but no events, which suggests they may be incomplete or placeholder maps:

| Map ID | Name | Dimensions |
|--------|------|------------|
| 027 | B.M.N.E.C. Waiting Room | 30 x 13 |
| 029 | Bridge | 20 x 20 |
| 031 | Bridge | 20 x 20 |
| 038 | Floating Mansion | 17 x 13 |
| 050 | Marcus Garvey 2.0 | 17 x 13 |
| 054 | MedBay | 17 x 13 |
| 059 | Hall | 6 x 50 |
| 061 | Dorlund Center | 30 x 25 |
| 062 | Lava Fields | 200 x 200 |

### Maps Without Tiles

The following maps have dimensions and structure but no tile data, making them completely empty and unusable:

| Map ID | Name | Dimensions | Events |
|--------|------|------------|--------|
| 063 | Dorlund Inn | 17 x 13 | 0 |
| 064 | General Store | 17 x 13 | 0 |
| 065 | Inn Room | 17 x 13 | 0 |
| 096 | No Name | 17 x 13 | 0 |

## Map Connections

The game world is connected through various maps, with key connections including:

1. **Mega Earth** (Map 001) serves as the main hub, connecting to various locations
2. **Timbuc** (Map 010) connects to shops and services (Maps 011-014)
3. **Timbuc 2** (Map 002) connects to the Cellar (Map 015)
4. **Bridge to Timbuc 2** (Map 037) connects Timbuc to Timbuc 2
5. **Dorlund Station** (Map 042) connects to Dorlund Center (Map 043)
6. **Newtown** (Map 049) connects to Newtown Lake (Map 070) and Upper Newtown Lake (Map 075)
7. **North D Town** (Map 077) connects to South D Town (Map 097)

## Recommendations for Incomplete Maps

### Priority 1: Maps Without Tiles

Maps that have no tile data should be prioritized for completion as they are completely unusable:

- Maps 063 (Dorlund Inn), 064 (General Store), 065 (Inn Room), 096 (No Name)

### Priority 2: Maps Without Names and Events

Maps that have neither names nor events should be prioritized for completion or removal:

- Maps 051, 052, 053, 055, 060, 100, 102

### Priority 3: Maps With Names But No Events

Maps that have names but no events should be populated with appropriate events:

- Maps 027, 029, 031, 038, 050, 054, 059, 061, 062

### Priority 4: Maps Without Names But With Events

Maps that have events but no names should be given appropriate names:

- Maps 032, 040, 085, 086, 087, 088, 089, 090, 098, 099

### Special Attention

The map listed as "Infos" with invalid dimensions appears to be corrupted and should be investigated.

## Conclusion

The MegaEarth2049 game contains a rich world with 103 maps, of which 72 are complete. The remaining 31 maps require various levels of attention, from simple naming to complete tile and event population. This documentation provides a comprehensive overview of the map structure and identifies areas that need improvement.

---

*This documentation was generated on April 18, 2025 using the MegaEarth2049 Map Analysis Tools.*
