# Local projects production record

A14/A17/A18/A23 are implemented using native event commands and the existing maps103/106/108/244. See `GameFAQs/FAQ_06_Quests_and_Storylines.md#rivet-local-projects` for player instructions and rewards.

`before.zip` preserves the six original data files. `build.py` is an append-only builder with expected-length assertions and an exclusive snapshot; do not rerun it over the finished project. It invokes the idempotent `finalize.py`, which retains the reviewed sorting-station placement and explains the existing SLF entry route.

```
node tools/local-projects/test.js
node tools/local-projects/visual.js
node tools/bounded-additions/test.js
```

The first suite executes native map/common-event interpreters and game objects. Its shop interception captures prepared goods without changing the scene; the second suite then runs the actual Scene_Shop and purchases a Switchblade for45 Credits at2/3 standing. The live route uses native event windows and isolated map transfers, not a claim of full campaign traversal. No user saves are written.

Standing is derived from existing recycling switch191, completed archive199 and sorting-pass200. It is recalculated rather than incremented by visits, preventing duplicate credits and supporting old saves. The10% price adjustment clones Beryl's goods only; it never changes weapon/item prices, native selling prices, other shops or upgrade recipes.

All three reward transactions check both native item capacity and maximum Credits before paying. Terminal solve, sorting pass and archive records survive deferred claims. The public/private archive choice is made only once the reward can fit. No imported journal commands or nonexistent relationship/network systems are advertised.

No generated art, cropping or new animation production was involved. The sorter uses an existing cabinet sprite; Splice uses an existing NPC sheet. The system skill preregisters flags/variables, preserving historically referenced variable50 and existing named-array values. The additional System.variables padding makes51–53 valid native variables; no existing variable reference is repurposed.
