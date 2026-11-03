> Historical document retained for provenance. Its commands, IDs and completion claims may be superseded. Use the current FAQs, roadmap and maintained tools for current behavior.

# MegaEarth2049 Tileset Documentation Plan

## Overview
This document outlines the approach for analyzing and documenting the tileset properties in MegaEarth2049's RPG Maker MV project, with a focus on understanding the flag values in tilesets.json that define tile behaviors.

## Challenges
- The tilesets.json file is too large to read in its entirety at once
- Some tilesets may be incomplete or inconsistent
- Flag values need to be decoded and documented for map creation

## Approach

### Phase 1: Extract and Analyze Individual Tilesets
1. Use command line tools to extract individual tilesets:
   ```
   jq '.[1]' data/Tilesets.json > tools/legacy-root/reports/tilesets/tileset1.json
   jq '.[2]' data/Tilesets.json > tools/legacy-root/reports/tilesets/tileset2.json
   jq '.[3]' data/Tilesets.json > tools/legacy-root/reports/tilesets/tileset3.json
   jq '.[4]' data/Tilesets.json > tools/legacy-root/reports/tilesets/tileset4.json
   ```

2. For each extracted tileset:
   - Analyze the flag array
   - Identify common values and patterns
   - Document the tileset name, mode, and tilesetNames

### Phase 2: Decode Flag Values
1. Create a reference for common flag values:
   - Analyze bit structure (0xFFF format)
   - Determine passability settings (lower 4 bits)
   - Identify special properties (bits 4-11)

2. Document common values observed:
   - 1536 (0x600): Appears frequently, likely fully passable
   - 1551 (0x60F): Appears frequently, likely impassable
   - 1552 (0x610): Needs investigation
   - Other common patterns

### Phase 3: Create Comprehensive Documentation
1. General Flag System Documentation:
   - Explanation of the bit structure
   - How to read and interpret flag values
   - Common patterns and their meanings

2. Tileset-Specific Documentation:
   - For each tileset (starting with 1-4), document:
     - Tileset name and purpose
     - Common flag patterns used
     - Special tiles and their properties

3. Pattern Analysis Across Tilesets:
   - Identify consistent patterns across tilesets
   - Note any variations or special cases
   - Document best practices for maintaining consistency

### Phase 4: Identify and Fix Issues in Later Tilesets
1. Compare later tilesets to established patterns
2. Identify inconsistencies or incomplete sections
3. Create recommendations for fixing incomplete tilesets:
   - Which flag values should be applied to which tiles
   - How to maintain consistency with earlier tilesets

## Implementation Steps

1. **Initial Setup**:
   - Create extraction commands for tilesets 1-4
   - Set up a structure for documenting findings

2. **Tileset 1 (Overworld) Analysis**:
   - Extract and analyze complete flag array
   - Document common values and their likely meanings
   - Create initial reference guide

3. **Comparative Analysis (Tilesets 2-4)**:
   - Extract and analyze tilesets 2-4
   - Compare patterns to Tileset 1
   - Document similarities and differences

4. **Flag Value Reference Creation**:
   - Create comprehensive guide to flag values
   - Include bit-level explanation
   - Document common patterns

5. **Later Tileset Analysis**:
   - Apply knowledge from early tilesets to analyze later ones
   - Identify potential issues or inconsistencies
   - Document recommendations for fixes

6. **Final Documentation Compilation**:
   - Combine all findings into structured documentation
   - Create reference tables for quick lookup
   - Include examples and best practices
