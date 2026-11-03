---
name: mapinfos
description: Use when adding maps to the project or navigating the map tree in data/MapInfos.json for MegaEarth2049. Covers the MapInfos.json field reference, parentId tree structure, all 102 named maps organized by planet/area with their IDs and parent relationships, and a checklist for registering a new map. No JavaScript anywhere in MapInfos.json — all fields are data.
---

## ⚠️ JS vs Data — The Critical Distinction

**There is NO JavaScript in MapInfos.json.** All fields are pure data.

| Location | IS JavaScript? | Notes |
|---|---|---|
| `id` | ❌ NOT JS | Integer map ID — must match the Map file number (MapNNN.json) |
| `name` | ❌ NOT JS | Display name in the RPG Maker MV editor tree only |
| `parentId` | ❌ NOT JS | Integer: 0 = root level; N = child of map N |
| `order` | ❌ NOT JS | Integer display order in the editor tree |
| `expanded` | ❌ NOT JS | Boolean: whether tree node is expanded in editor |
| `scrollX` / `scrollY` | ❌ NOT JS | Editor viewport scroll position (float) — editor-managed |

MapInfos.json is **editor metadata only** — it has no effect on gameplay. The actual map content (tiles, events, encounters) lives in `data/MapNNN.json`.

---

## MapInfos.json Field Reference

```json
{
  "id": 1,
  "name": "Mega Earth",
  "parentId": 0,
  "order": 1,
  "expanded": false,
  "scrollX": 1180.666,
  "scrollY": 1023.0
}
```

| Field | Type | Notes |
|---|---|---|
| `id` | integer | Must match the MapNNN.json file number (e.g., id 42 → Map042.json) |
| `name` | string | Shown in the editor map tree; does NOT affect the in-game `displayName` |
| `parentId` | integer | 0 = top-level world map; N = nested under map N in editor tree |
| `order` | integer | Sort order within the same parent level; lower = appears first in editor |
| `expanded` | boolean | Editor UI state only — whether this node is expanded in the map tree |
| `scrollX` / `scrollY` | float | Editor viewport position — automatically updated by the editor |

**Important**: `name` in MapInfos.json ≠ `displayName` in MapNNN.json.
- `MapInfos.name` = editor label (for your reference)
- `MapNNN.displayName` = what appears on-screen when entering the map

---

## Map Tree Structure — All 102 Maps

The map tree uses `parentId` to create a hierarchy. `parentId: 0` = root level.

### Root Level (parentId: 0)
| ID | Name | order | Notes |
|---|---|---|---|
| 1 | Mega Earth | 1 | Main overworld; contains Timbuc, Timbuc 2, B.M.N.E.C., Village, etc. |
| 28 | Planet Ork | 28 | Sci-fi planet; contains Dorlund and dungeon areas |
| 30 | Alien Craft | 30 | Alien ship container; children are 29 and 31 |
| 39 | Planet Ting Ting | 39 | Snowy/desert world; contains Snowy Village, Newtown, D Town |
| 50 | Marcus Garvey 2.0 | 50 | Ship interior; 5 duplicate-named sub-maps (IDs 51–55) |
| 102 | Planet Needsaname | 102 | Placeholder planet; needs development |

### Mega Earth Tree (parentId: 1)
| ID | Name | Parent | order |
|---|---|---|---|
| 2 | Timbuc 2 | 1 | 2 |
| 3 | Item Shop | 2 | 3 |
| 4 | Weapon Shop | 2 | 4 |
| 5 | Church Street | 2 | 5 |
| 6 | Town Park | 2 | 6 |
| 7 | Gnarles Barkley Ave | 2 | 7 |
| 8 | Internet Cafe | 7 | 8 |
| 9 | Matrix | 8 | 9 |
| 10 | Timbuc | 1 | 10 |
| 11 | Timbuc Grocery | 10 | 11 |
| 12 | Timbuc Weapon Shop | 10 | 12 |
| 13 | Timbuc Inn | 56 | 13 |
| 14 | Timbuc Inn Room | 13 | 14 |
| 15 | Timbuc Cellar | 10 | 15 |
| 16 | Boss Room | 15 | 16 |
| 17 | Room A | 15 | 17 |
| 18 | Room D | 15 | 18 |
| 19 | Room B | 15 | 19 |
| 20 | Room C | 15 | 20 |
| 21 | Room E | 15 | 21 |
| 22 | Passageway 1 | 15 | 22 |
| 23 | Passageway 2 | 15 | 23 |
| 24 | B.M.N.E.C. | 1 | 24 |
| 25 | B.M.N.E.C. Floor 1 | 24 | 25 |
| 26 | B.M.N.E.C. Floor 2 | 24 | 26 |
| 27 | B.M.N.E.C. Floor 3 | 24 | 27 |
| 32 | Room F | 15 | 32 |
| 33 | Village | 1 | 33 |
| 34 | Inn | 33 | 34 |
| 35 | Zack's House | 33 | 35 |
| 36 | Armor Shop | 33 | 36 |
| 37 | Bridge to Timbuc 2 | 1 | 37 |
| 38 | Floating Mansion (Outside) | 1 | 38 |
| 40 | Floating Mansion 1st floor | 38 | 40 |
| 41 | B.M.N.E.C. Floor 4 | 24 | 41 |
| 56 | Jen's House (outer) | 10 | 56 |
| 57 | Jen's House | 56 | 57 |
| 91 | Floating Mansion 2nd floor | 38 | 91 |
| 92 | Bedroom 1 | 91 | 92 |
| 93 | Guest Room | 91 | 93 |
| 94 | Study | 91 | 94 |
| 95 | Bedroom 2 | 91 | 95 |
| 96 | MAP096 | 91 | 96 |



### Planet Ork Tree (parentId: 28)
| ID | Name | Parent | order |
|---|---|---|---|
| 29 | Alien Craft | 30 | 29 |
| 31 | Alien Craft | 30 | 31 |
| 42 | Dorlund Station | 28 | 42 |
| 43 | Dorlund Center | 28 | 43 |
| 44 | Weapon Shop | 43 | 44 |
| 45 | Mod Center | 43 | 45 |
| 58 | Armorer | 43 | 58 |
| 59 | Hall | 28 | 59 |
| 60 | Dungeon | 28 | 60 |
| 61 | Dorlund Center | 28 | 61 |
| 62 | Dorlund Lava Fields | 28 | 62 |
| 63 | Dorlund Inn | 61 | 63 |
| 64 | Dorlund Shop | 61 | 64 |
| 65 | Dorlund Inn Room | 63 | 65 |

Note: IDs 43 and 61 share the name "Dorlund Center" — data inconsistency in source.

### Marcus Garvey 2.0 Ship (parentId: 50)
| ID | Name | Parent | order |
|---|---|---|---|
| 51 | Marcus Garvey 2.0 | 50 | 51 |
| 52 | Marcus Garvey 2.0 | 50 | 52 |
| 53 | Marcus Garvey 2.0 | 50 | 53 |
| 54 | Marcus Garvey 2.0 | 50 | 54 |
| 55 | Marcus Garvey 2.0 | 50 | 55 |

All 5 sub-maps share the same name — differentiate by ID when referencing.

### Planet Ting Ting Tree (parentId: 39)
| ID | Name | Parent | order |
|---|---|---|---|
| 46 | Passageway | 39 | 46 |
| 47 | Snowy Village | 39 | 47 |
| 48 | Snowy Pass | 39 | 48 |
| 49 | Newtown | 39 | 49 |
| 66 | Village Inn | 47 | 66 |
| 67 | Village Lounge | 47 | 67 |
| 68 | Village Tools | 47 | 68 |
| 69 | Village Items | 47 | 69 |
| 70 | Newtown Lake | 39 | 70 |
| 71 | Newtown Inn | 49 | 71 |
| 72 | Newtown Weapons | 49 | 72 |
| 73 | Newtown Armor | 49 | 73 |
| 74 | Newtown Items | 49 | 74 |
| 75 | Upper Newtown Lake | 70 | 75 |
| 76 | Big Ass Desert | 39 | 76 |
| 77 | North D Town | 39 | 77 |
| 78 | Mountain Pass | 39 | 78 |
| 79 | D Town Weapon Shop | 77 | 79 |
| 80 | D Town Armor Shop | 77 | 80 |
| 81 | D Town Item Shop | 77 | 81 |
| 82 | D Town Inn | 77 | 82 |
| 83 | D Town Body Mod Center | 77 | 83 |
| 84 | D Town Bar | 77 | 84 |
| 85 | Island Basement | 75 | 85 |
| 86 | Basement room #1 | 85 | 86 |
| 87 | Basement room #2 | 85 | 87 |
| 88 | Basement room #3 | 85 | 88 |
| 89 | Basement room #4 | 85 | 89 |
| 90 | Basement room #5 | 85 | 90 |
| 97 | South D Town | 77 | 97 |
| 98 | Shack | 97 | 98 |
| 99 | Mod Center | 97 | 99 |
| 100 | D Town Cellar | 98 | 100 |
| 101 | D Town Speak Easy | 97 | 101 |

---

## Adding a New Map to MapInfos.json — Checklist

1. **Determine the map ID**: use the next sequential 3-digit zero-padded number (currently max = 102 → use 103)
2. **Create the Map file first**: `data/Map103.json` with all required map fields (see maps skill for full checklist)
3. **Add entry to `data/MapInfos.json`**:
   ```json
   {
     "id": 103,
     "name": "My New Map",
     "parentId": 1,
     "order": 103,
     "expanded": false,
     "scrollX": 0,
     "scrollY": 0
   }
   ```
4. **Set `parentId`**: use the ID of the world/area this map belongs to:
   - Mega Earth area → `1`
   - Planet Ork area → `28`
   - Planet Ting Ting area → `39`
   - Marcus Garvey 2.0 ship → `50`
   - Planet Needsaname → `102`
   - New world map (top-level) → `0`
5. **Set `name`**: descriptive editor label. This is independent of `displayName` in the Map file.
6. **Set `order`**: use the map ID as the order value (convention in this project); controls editor sort order
7. **Set `expanded`: `false`** (default; editor will update it)
8. **Set `scrollX`/`scrollY`: `0`** (editor will update to viewport position when opened)
9. **Verify ID matches**: the `id` in MapInfos.json entry **must exactly match** the NNN in `MapNNN.json`
10. **Do NOT skip IDs**: RPG Maker MV may have issues with gaps; if a gap is needed, insert a null entry at that index position in the JSON array

---

## Quick Reference — Map ID Lookup by Name

| Map Name | ID | Planet/Area |
|---|---|---|
| Mega Earth (overworld) | 1 | Mega Earth |
| Timbuc | 10 | Mega Earth |
| Timbuc 2 | 2 | Mega Earth |
| B.M.N.E.C. | 24 | Mega Earth |
| Village | 33 | Mega Earth |
| Floating Mansion | 38 | Mega Earth |
| Jen's House | 57 | Mega Earth |
| Timbuc Cellar | 15 | Mega Earth |
| Planet Ork (overworld) | 28 | Planet Ork |
| Dorlund Center | 43/61 | Planet Ork |
| Dorlund Dungeon | 60 | Planet Ork |
| Planet Ting Ting (overworld) | 39 | Planet Ting Ting |
| Snowy Village | 47 | Planet Ting Ting |
| Newtown | 49 | Planet Ting Ting |
| North D Town | 77 | Planet Ting Ting |
| South D Town | 97 | Planet Ting Ting |
| Big Ass Desert | 76 | Planet Ting Ting |
| Marcus Garvey 2.0 | 50 | Ship |
| Planet Needsaname | 102 | Placeholder |
