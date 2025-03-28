# Reducing Cline API Requests for MegaEarth 2049

This guide provides strategies and tools to reduce the number of Cline API requests when updating JSON files for your MegaEarth 2049 RPG Maker project.

## Resources Created

1. **MegaEarth2049_EditingGuide.md** - A comprehensive reference for common JSON structures, event patterns, and map properties
2. **batch-edit-tool.js** - A Node.js script for batch editing multiple JSON files
3. **event-templates.json** - Ready-to-use templates for common game events and dialogues

## Strategies to Reduce API Requests

### 1. Use the Editing Guide as a Reference

Instead of asking Cline to generate common JSON structures, refer to the `MegaEarth2049_EditingGuide.md` file. This guide contains:

- Map file structure
- Event command codes
- Common event patterns (dialogue, choices, conditionals)
- Map property templates
- Common event objects (NPCs, chests, doors)
- Item and enemy definitions

Example: When you need to add a basic dialogue event, copy the pattern from the guide rather than asking Cline to generate it.

### 2. Use the Batch Editing Tool

For making similar changes across multiple files, use the `batch-edit-tool.js` script. This tool can:

- Update map properties across multiple maps
- Find and replace dialogue text
- Add events to multiple maps
- Update item properties

To run the tool:
```
node batch-edit-tool.js
```

Example: If you need to change the encounter rate in all dungeon maps, use the batch tool instead of editing each file individually with Cline.

### 3. Use Event Templates

For common game elements, use the templates in `event-templates.json`. This file contains ready-to-use templates for:

#### NPC Templates
- Basic NPCs with dialogue
- Treasure chests
- Doors/transfer events
- Data terminals
- Enemies
- Item givers
- Dr. Frankie Stein (quirky scientist)
- The Narrator (fourth-wall breaking character)
- Madame Fortuna (fortune teller/quest giver)
- Vending Machine (interactive object with humorous dialogue)

#### Side Quest Templates
- Burlap Pants Conspiracy Quest
- Clown Court Trial
- Vending Machine Uprising
- Dating Sim Virus

#### Other Templates
- Various dialogue patterns
- Map property presets

Example: When adding a new treasure chest, copy the template from this file and modify it as needed. For adding NPCs or side quests to multiple maps, use the batch-edit-tool.js which now supports template-based additions.

### 4. Prepare Batch Changes

Before asking Cline for help, prepare a list of changes you want to make across multiple files. This allows you to make a single request that addresses multiple files, rather than separate requests for each file.

Example: "I need to update all dialogue references to 'Old Earth' to 'Original Earth' across all map files."

### 5. Use Search and Replace for Global Changes

For text changes across multiple files, use search and replace functionality in your editor or the batch tool rather than asking Cline to make each change individually.

### 6. Create Custom Templates

For structures you use frequently, create your own templates in the `event-templates.json` file. This allows you to reuse them without making additional Cline requests.

### 7. Document Your Changes

Keep track of the changes you make to maintain consistency across files. This reduces the need to ask Cline to check for inconsistencies later.

## Workflow Example

1. **Plan your changes** - Identify what needs to be updated across which files
2. **Check the editing guide** - See if there are existing patterns you can use
3. **Use templates** - For new events, use the templates provided
4. **Batch process** - For changes across multiple files, use the batch tool
5. **Ask Cline strategically** - When you do need to ask Cline, batch your requests to minimize API calls

By following these strategies, you can significantly reduce the number of Cline API requests needed for your MegaEarth 2049 project.
