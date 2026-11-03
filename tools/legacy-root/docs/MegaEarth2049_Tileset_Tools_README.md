> Historical document retained for provenance. Its commands, IDs and completion claims may be superseded. Use the current FAQs, roadmap and maintained tools for current behavior.

# MegaEarth2049 Tileset Tools

This package provides tools and documentation for working with tilesets in the MegaEarth2049 RPG Maker MV project. These tools help you understand, analyze, and modify the flag values that define tile properties such as passability, terrain tags, and special behaviors.

## Contents

1. **Documentation**
   - `docs/archive/guides/MegaEarth2049_Tileset_Documentation_Plan.md`: The plan for analyzing and documenting tilesets
   - `docs/reference/maps/MegaEarth2049_Tileset_Flag_Documentation.md`: Comprehensive documentation of tileset flag values

2. **Scripts**
   - `tools/legacy-root/scripts/extract_metadata.ps1.txt`: PowerShell script to extract and analyze tileset data
   - `tools/legacy-root/scripts/update_tileset_flags.ps1.txt`: PowerShell script to update flag values in tilesets

## Getting Started

### Understanding Tileset Flags

Start by reading the `docs/reference/maps/MegaEarth2049_Tileset_Flag_Documentation.md` file, which provides:
- Explanation of the bit structure of flag values
- Common flag values and their meanings
- Tileset-specific patterns
- Best practices for creating maps with proper tile properties

### Analyzing Tilesets

To analyze the tilesets in your project:

1. Run the extraction script:
   ```
   powershell -File tools/legacy-root/scripts/extract_metadata.ps1.txt
   ```

2. This will generate several files for each tileset:
   - `tileset#_metadata.txt`: Basic information about the tileset
   - `tileset#_flags_sample.txt`: Sample of flag values from the tileset
   - `tileset#_flag_frequencies.txt`: Analysis of how often each flag value appears

3. Review these files to understand the patterns in your tilesets.

### Modifying Tileset Flags

If you need to modify flag values (e.g., to fix passability issues):

1. First, extract the tilesets as described above.

2. Use the update script with appropriate parameters:
   ```
   powershell -File tools/legacy-root/scripts/update_tileset_flags.ps1.txt -tilesetNumber 1 -oldFlagValue 1551 -newFlagValue 1536
   ```

3. This will:
   - Create a backup of the original tileset
   - Replace all occurrences of the old flag value with the new one
   - Generate a report of the changes made

4. After verifying the changes, update the main Tilesets.json file:
   ```
   powershell -File tools/legacy-root/scripts/update_tileset_flags.ps1.txt -updateMain -tilesetNumber 1
   ```

## Common Use Cases

### Fixing Passability Issues

If you have tiles that should be impassable but aren't:

1. Identify the current flag value using the extraction script
2. Determine the correct impassable flag value (typically 1551 or 3599)
3. Use the update script to replace the incorrect value with the correct one

Example:
```
powershell -File tools/legacy-root/scripts/update_tileset_flags.ps1.txt -tilesetNumber 2 -oldFlagValue 1536 -newFlagValue 1551
```

### Adding Special Properties

To add special properties like counters or ladders:

1. Identify the current flag value
2. Determine the new flag value by adding the appropriate bit
   - For counters: Add 64 (0x40)
   - For ladders: Add 16 (0x10)
   - For bush effects: Add 32 (0x20)

Example (adding counter property to passable tiles):
```
powershell -File tools/legacy-root/scripts/update_tileset_flags.ps1.txt -tilesetNumber 3 -oldFlagValue 1536 -newFlagValue 1600
```

## Script Parameters

### extract_metadata.ps1

This script doesn't require parameters. It automatically processes all four tilesets.

### update_tileset_flags.ps1

- `-tilesetNumber`: The tileset number to update (1-4)
- `-oldFlagValue`: The flag value to replace
- `-newFlagValue`: The new flag value to use
- `-noBackup`: (Optional) Skip creating a backup of the original file
- `-updateMain`: Update the main Tilesets.json file with a previously modified tileset
- `-help`: Display help information

## Best Practices

1. **Always create backups** before modifying tilesets
2. **Test changes** in a development environment before applying to your main project
3. **Document your changes** to maintain consistency across your project
4. **Use the flag documentation** as a reference when deciding which values to use

## Troubleshooting

### Script Errors

- **"File does not exist"**: Make sure you've extracted the tilesets before trying to update them
- **"Error loading JSON"**: The tileset file may be corrupted; try re-extracting it
- **"No occurrences found"**: The specified flag value doesn't exist in the tileset

### Game Issues After Updates

- **Characters walking through walls**: You may have replaced an impassable flag with a passable one
- **Characters unable to move**: You may have replaced a passable flag with an impassable one
- **Visual glitches**: Restart the game to ensure all changes are properly loaded

## Additional Resources

- RPG Maker MV Documentation: [https://tkool.jp/mv/](https://tkool.jp/mv/)
- RPG Maker Forums: [https://forums.rpgmakerweb.com/](https://forums.rpgmakerweb.com/)

## Support

If you encounter issues or have questions about these tools, please refer to the documentation or contact the project maintainer.
