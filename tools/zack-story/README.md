# Weight Bearing production record

A15 first companion story only. Remaining companion arcs stay open. See `GameFAQs/FAQ_04_Characters_and_NPCs.md#zack-weight-bearing` and `manifest.json` for routes, IDs and rewards.

Changes: System switches203–208; welder103/5; all three Socket108/5 pages; cache110/8; inspection light103/17; one read-only Completion Log definition. Native actor EXP command315 targets actor3 directly with level-up dialogue suppressed. No actor/class/stat/skill/weapon/enemy records, new maps, artwork or battle plugins are added.

`before.zip` preserves the original four database files and Completion Log source. `build.py` is an exclusive-snapshot, append-only builder; do not rerun it over the installed content. It calls idempotent `finalize.py` to match the first-aid building seen in the native map review and refine dialogue.

```
node tools/zack-story/test.js
node tools/zack-story/visual.js
node tools/bounded-additions/test.js
node tools/completion-log/test.js
```

All tests use isolated in-memory games. The logic suite executes native map interpreters using the currently valid event page. It also exercises Socket's original acceptance,350-Credit reward and repeat state. The UI suite drives native choices for both material routes, both inscriptions and real event-page graphics. Player map transfers are fixtures; they do not establish an exhaustive overworld walkthrough.

The inspection light uses the existing `!SF_Switch1` sprite: red index0 before switch206, green index2 after. The cache uses existing `!SF_Chest` art. Full map previews in `maps/` are placement-review artifacts; live before/after screenshots establish the conditional page change. Original map tile arrays are unchanged.

The old bounded-additions joke-source test now explicitly selects the welder's Neighborhood service before the original take/leave prompt. Its behavior and reward assertions remain intact. Completion Log fixtures now expect30 entries and17 projects; the new quest's states are checked by this suite.
