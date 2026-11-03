# Live project inspector

Run from any working directory; all inputs resolve from this script’s project directory. The command reads the current data and prints JSON. It does not change maps, flags, documentation, saves or the working directory.

```powershell
python tools/project-inspect/inspect.py summary
python tools/project-inspect/inspect.py maps --id 10
python tools/project-inspect/inspect.py animations --id 193
python tools/project-inspect/inspect.py tilesets --id 6
```

Omit `--id` to list the selected catalog. Invalid IDs fail without writing files. Actor-record counts include antagonist records; they do not imply recruitability. Map event counts exclude retired events without pages.

This replaces the overlapping basic root counting/listing helpers. For actual collision/placement verification use [the map audit](../map-placement-audit/README.md); for rendered maps use [the world tools](../world/README.md). Existing feature-specific tests remain in their own tools folders. Historical root PowerShell/batch sources are archived as non-executable text under tools/legacy-root/scripts.
