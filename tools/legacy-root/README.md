# Former root toolchain

This folder preserves the older overlapping PowerShell/batch analysis suites and their reports. They are not required by the RPG Maker MV runtime or editor.

- `scripts/`: original `.ps1` and `.bat` files retained byte-for-byte with an added `.txt` suffix. They are deliberately non-executable historical sources, not maintained launchers.
- `docs/`: former tool readmes, with historical-status notices.
- `reports/`: previously generated map/animation reports.
- `reports/tilesets/`: exported tileset JSON, metadata, samples and frequency reports. These are snapshots, not `data/Tilesets.json` and not replacement collision flags.

The old runner imports several root-relative helpers and documentation writers. The tileset updater can rebuild live tileset data from old exports; the readme/index writers can replace newer documentation. Do not rename these sources back and run the full suite blindly. Port an individual routine only after reviewing its inputs, outputs and current equivalents.

Current basic queries use [the read-only inspector](../project-inspect/README.md). Actual collision/rendering checks use the maintained [map audit](../map-placement-audit/README.md) and [world tools](../world/README.md). See [the inventory](../root-cleanup/inventory.md) for the original names and reasons.
