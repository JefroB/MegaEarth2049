---
name: tilesets
description: Use when selecting or modifying tilesets in data/Tilesets.json for MegaEarth2049. Covers the Tilesets.json field reference, the 9 tileset slot layout (A1–A5, B, C, D, E), tileset mode (overworld vs area), all 17 named tilesets and which maps use them, passage flags, and a checklist for adding or modifying tilesets.
---

## ⚠️ JS vs Data — The Critical Distinction

**There is NO JavaScript in Tilesets.json.** All fields are pure data.

| Location | IS JavaScript? | Notes |
|---|---|---|
| `tilesetNames[]` | ❌ NOT JS | Array of 9 filename strings (no extension) |
| `mode` | ❌ NOT JS | Integer: 0 = overworld, 1 = area |
| `note` | ❌ NOT JS | Plugin notetag strings — none currently used |
| `flags[]` | ❌ NOT JS | Passage/terrain tag data array — integer bitmask per tile |
| `name` | ❌ NOT JS | Display name in editor only |

**All 17 current tilesets have empty `note` fields** — no tileset-level plugin notetags in use yet.

---

## Tilesets.json Field Reference

```json
{
  "id": 5,
  "mode": 1,
  "name": "SF Outside",
  "note": "",
  "tilesetNames": [
    "Outside_A1",
    "Outside_A2",
    "SF_Outside_A3",
    "SF_Outside_A4",
    "SF_Outside_A5",
    "SF_Outside_B",
    "SF_Outside_C",
    "Futuristic_TileE",
    ""
  ],
  "flags": [...]
}
```

### Field Descriptions

| Field | Type | Notes |
|---|---|---|
| `id` | integer | 1-based ID referenced by `tilesetId` in Map files |
| `name` | string | Editor label only — not shown in game |
| `mode` | integer | 0 = overworld (large tiles, perspective), 1 = area (interior/exterior standard tiles) |
| `note` | string | Plugin notetag string — currently empty in all tilesets |
| `tilesetNames` | array[9] | Filenames for each slot (no extension); `""` = empty slot |
| `flags` | array | Passage and terrain tag data; managed by the editor; do NOT hand-edit |

---

## Passage review for reused scenery

Before placing people near a furnishing or changing shared collision, inspect the exact atlas tiles and their map usage. Normal decorative tiles with open direction bits can turn a wall below them into walkable ground. Wall-mounted upper art should defer passage to the wall (`0x10`); physical furniture footprints should block walking. Preserve the other flag metadata. A counter also needs its counter bit (`0x80`) if interaction must cross it.

Do not equate star/upper rendering with a solid obstacle, or assume all A3/A4-derived terrain has the same role. Doors, ladders, flat authored floor textures and overhead pieces need explicit review. Check all affected maps and transfer landings after shared changes. See `tools/map-placement-audit/repairs.json` for reviewed corrections and exceptions, and run its native test rather than trusting a placement helper alone.

## Tileset Slot Layout — 9 Slots

| Slot | Index | Label | Purpose |
|---|---|---|---|
| A1 | 0 | Animated tiles | Water, lava, waterfalls — auto-animated |
| A2 | 1 | Ground tiles | Main ground/floor layer tiles |
| A3 | 2 | Building walls | Exterior building lower walls |
| A4 | 3 | Building interiors | Interior walls / upper building tiles |
| A5 | 4 | Normal tiles (small) | Objects that use normal passage rules |
| B | 5 | Decorative layer 1 | Furniture, objects, decorations |
| C | 6 | Decorative layer 2 | Additional objects |
| D | 7 | Decorative layer 3 | Tech/equipment/specialty objects |
| E | 8 | Decorative layer 4 | Additional specialty tiles |

Empty slot (`""`) = that slot has no tiles available in this tileset.

---

## All 17 Tilesets

| ID | Name | Mode | A1 | A2 | A3 | A4 | A5 | B | C | D | E |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | Overworld | 0 | World_A1 | World_A2 | — | — | — | World_B | World_C | — | — |
| 2 | Outside | 1 | Outside_A1 | Outside_A2 | Outside_A3 | Outside_A4 | Outside_A5 | Outside_B | Outside_C | — | — |
| 3 | Inside | 1 | Inside_A1 | Inside_A2 | — | Inside_A4 | Inside_A5 | Inside_B | Inside_C | — | — |
| 4 | Dungeon | 1 | Dungeon_A1 | Dungeon_A2 | — | Dungeon_A4 | Dungeon_A5 | Dungeon_B | Dungeon_C | SciFi_Armory | — |
| 5 | SF Outside | 1 | Outside_A1 | Outside_A2 | SF_Outside_A3 | SF_Outside_A4 | SF_Outside_A5 | SF_Outside_B | SF_Outside_C | Futuristic_TileE | — |
| 6 | SF Inside | 1 | Inside_A1 | Inside_A2 | — | SF_Inside_A4 | SF_Outside_A5 | SF_Inside_B | SF_Inside_C | SciFi_Deco_1 | SciFi_Deco_3 |
| 7 | Modern Urban | 1 | A1_SciFi | TileA2-ModernUrban | TileA2-ModernUrban | TileA4-ModernUrban | TileA5-ModernUrban | TileB-ModernUrban | TileC-ModernUrban | — | — |
| 8 | Futuristic | 1 | Futuristic_TileA1 | Futuristic_TileA2 | Futuristic_TileA3 | Futuristic_TileA4 | Futuristic_TileA5 | SF_Outside_B | Futuristic_TileC | Futuristic_TileD | Futuristic_TileE |
| 9 | SciFi | 1 | Sci-Fi-Tiles_A1 | Sci-Fi-Tiles_A2 | — | Sci-Fi-Tiles_A4 | Sci-Fi-Tiles_A5 | Sci-Fi-Tiles_B | Sci-Fi-Tiles_C | Sci-Fi-Tiles_D | Sci-Fi-Tiles_E |
| 10 | SciFi Armory | 1 | A1_SciFi | Sci-Fi-Tiles_A2 | — | A4_SciFi | A5_SciFi | SciFi_Armory | SciFi_Containers | SciFi_Tech_1 | Futuristic_TileD |
| 11 | SciFi Computers | 1 | A1_SciFi | Sci-Fi-Tiles_A2 | Futuristic_TileA3 | A4_SciFi | A5_SciFi | SciFi_Computers_1 | SciFi_Computers_2 | SciFi_Tech_1 | SciFi_Tech_3 |
| 12 | SciFi Medical | 1 | A1_SciFi | Sci-Fi-Tiles_A2 | Futuristic_TileA3 | Futuristic_TileA4 | Futuristic_TileA5 | SciFi_Medical | SciFi_Tech_1 | SciFi_Tech_2 | SciFi_Tech_3 |
| 13 | SciFi Outside | 1 | World_A1 | World_A2 | SF_Outside_A3 | Sci-Fi-Tiles_A4 | A5_SciFi | Sci-Fi-Tiles_B | Sci-Fi-Tiles_C | Sci-Fi-Tiles_D | Sci-Fi-Tiles_E |
| 14 | SciFi 2 | 1 | Sci-Fi-Tiles_A1 | Sci-Fi-Tiles_A2 | Futuristic_TileA3 | A4_SciFi | SF_Outside_A5 | Sci-Fi-Tiles_B | Sci-Fi-Tiles_C | Sci-Fi-Tiles_D | Sci-Fi-Tiles_E |
| 15 | SciFi Desert | 1 | World_A1 | World_A2 | SF_Outside_A3 | Sci-Fi-Tiles_A4 | A5_SciFi | cyanide_desert_outside | Sci-Fi-Tiles_C | Sci-Fi-Tiles_D | Sci-Fi-Tiles_E |
| 16 | SF Desert | 1 | Outside_A1 | Outside_A2 | SF_Outside_A3 | SF_Outside_A4 | SF_Outside_A5 | SF_Outside_B | SF_Outside_C | Futuristic_TileE | cyanide_desert_outside |
| 17 | SciFi Outside | 1 | World_A1 | World_A2 | SF_Outside_A3 | Sci-Fi-Tiles_A4 | A5_SciFi | Sci-Fi-Tiles_B | SF_Outside_B | Sci-Fi-Tiles_D | Sci-Fi-Tiles_E |

Note: Tilesets 13 and 17 share the same name "SciFi Outside" — this is a data inconsistency in the source.



---

## Tileset Selection Guide — Which Tileset for Which Setting?

| Setting type | Best tileset | Notes |
|---|---|---|
| World/overworld map | 1 (Overworld) | Mode 0 — perspective ground view |
| Outdoor town (classic fantasy) | 2 (Outside) | Standard RPG town exterior |
| Indoor building (classic) | 3 (Inside) | Standard RPG interior |
| Cave/dungeon | 4 (Dungeon) | Includes SciFi_Armory in slot D |
| Cyberpunk city street | 5 (SF Outside) or 7 (Modern Urban) | 5 = sci-fi kit; 7 = modern urban tiles |
| Cyberpunk interior / office | 6 (SF Inside) | Has SciFi decorative tiles |
| High-tech facility | 8 (Futuristic) or 9 (SciFi) | 8 = full futuristic kit; 9 = Sci-Fi-Tiles set |
| Armory / weapons storage | 10 (SciFi Armory) | Containers + armory tiles |
| Computer lab / hacking room | 11 (SciFi Computers) | Computer + tech tiles |
| Medical facility / lab | 12 (SciFi Medical) | Medical + tech tiles |
| Alien world exterior | 13 (SciFi Outside) or 17 | World base with sci-fi overlay |
| Desert sci-fi | 15 (SciFi Desert) or 16 (SF Desert) | Cyanide desert tile in B or E slot |

---

## Tileset-to-Map Usage (known assignments)

| Tileset | Maps using it |
|---|---|
| 1 (Overworld) | Map001 (Mega Earth) |
| 6 (SF Inside) | Map003 (Item Shop) |
| Other maps | Tilesets not yet confirmed — check `tilesetId` in each Map file |

Note: To find which tileset a map uses, check `tilesetId` in that map's JSON file.
To find all maps using a specific tileset, search all map files for `"tilesetId": N`.

---

## flags[] — Passage Data

The `flags[]` array is a flat array of 16-bit integers, one per tile. Each integer is a bitmask:

| Bit | Meaning |
|---|---|
| Bit 0 (0x0001) | Passable from below |
| Bit 1 (0x0002) | Passable from left |
| Bit 2 (0x0004) | Passable from right |
| Bit 3 (0x0008) | Passable from above |
| Bits 4–7 | Terrain tag (0–7) |
| Bit 8 (0x0100) | ☆ (star) — draws above characters |
| Bit 9 (0x0200) | Ladder |
| Bit 10 (0x0400) | Bush (half-body) |
| Bit 11 (0x0800) | Damage tile |

**Do NOT edit `flags[]` manually** — use the RPG Maker MV editor to set passage and terrain tags for each tile. Manual edits require exact knowledge of tile indices within each tileset sheet.

---

## ⚠️ Mechanical Constraints for Tilesets

### CAN do (engine-supported)
| Capability | How |
|---|---|
| Mix tileset sheets per slot | Each slot (A1–E) is a separate image file |
| Region-based encounter control | Region tile IDs on map used in `encounterList.regionSet` |
| Terrain tags for gameplay effects | Set via passage editor; read in JS via `$gameMap.terrainTag(x, y)` |
| Custom tileset sheets | Add image to `img/tilesets/` and reference by filename (no extension) |
| Damage floor | Set bit 11 (0x0800) in flags for that tile |

### CANNOT do (not supported)
| Impossible | Why |
|---|---|
| Runtime tileset swap | `tilesetId` is set per map; cannot change during play without plugin |
| More than 9 tileset slots | The A1–E layout is fixed in RPG Maker MV |
| Plugin notetags on tilesets | No tilesets currently use the `note` field; effects would need plugin support |
| Animate specific non-A1 tiles | Only A1 slot tiles are automatically animated |
| Per-region tilesets | One tileset for the whole map; regions only affect encounters |

---

## Adding or Modifying a Tileset — Checklist

### Selecting an existing tileset for a new map
1. Find the best-fit tileset from the table above
2. Set `tilesetId` in the new Map file to that tileset's ID
3. Verify the tileset has the tile types you need (buildings, floors, decorations)

### Adding a new tileset
1. **Add image files** to `img/tilesets/` for each slot you need
2. **Append** to `data/Tilesets.json` with next available ID (currently max is 17 → use 18)
3. **Set `name`**: descriptive label for the editor
4. **Set `mode`**: 0 for overworld, 1 for all other map types
5. **Set `tilesetNames[9]`**: filenames for each slot (no `.png` extension); use `""` for empty slots
6. **Set `note`: `""`** (no notetags needed currently)
7. **Set `flags[]`**: initialize with a valid-length array — use the editor to configure passage/terrain tags
8. **Do NOT hand-edit `flags[]`**: open the tileset in the RPG Maker MV editor and set passage rules there
9. **Verify all referenced image files exist** in `img/tilesets/` before using the tileset in a map
